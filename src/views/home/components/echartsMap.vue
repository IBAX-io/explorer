<!--
 * @Author: abc
 * @Date: 2020-12-04 14:57:19
 * @LastEditors: abc
 * @LastEditTime: 2021-11-15 18:34:04
 * @Description: honor node 
-->
<template>
  <div class="home-node">
    <div class="home-node-left">
      <h2 class="home-node-title">
        {{ $t('home.honor')
        }}<span class="home-node-title-num">({{ long }})</span>
      </h2>

      <div class="home-node-left-box">
        <div
          class="home-node-left-item"
          v-for="item in nodeList"
          :key="item.key_id"
          :class="{ active: item.active }"
        >
          <div class="home-node-left-img">
            <img :src="item.icon_url" alt="icon" />
          </div>
          <div class="home-node-left-content">
            <a-tooltip placement="bottomLeft">
              <template slot="title">
                <span>{{ item.nodename }}</span>
              </template>
              <div class="home-node-left-text">{{ item.nodename }}</div>
            </a-tooltip>
            <a-tooltip placement="bottomLeft">
              <template slot="title">
                <span>{{ item.api_address }}</span>
              </template>
              <a
                class="home-node-left-address home-node-left-text"
                :href="item.api_address"
                target="_blank"
                >{{ item.api_address }}</a
              >
            </a-tooltip>
            <div class="home-node-left-status">
              <span class="home-node-left-status-lime"></span>
              <span class="home-node-left-status-text">Normal</span>
            </div>
            <div class="home-node-left-status" v-if="0">
              <span class="home-node-left-status-yellow"></span>
              <span class="home-node-left-status-text">Normal</span>
            </div>
          </div>
        </div>
      </div>
      <div class="home-node-page" v-if="long > 4">
        <a-pagination
          v-model="current"
          :total="long"
          :pageSize="pageSize"
          :defaultCurrent="defaultCurrent"
          show-less-items
          @change="handleChangePage($event, arrNodeList)"
        />
      </div>
    </div>
    <div class="home-node-right">
      <div id="myMap" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>
<script>
// const initBingMap = require('@/plugins/bingMap');
import echarts from '@/plugins/echarts';
import '../../../../node_modules/echarts/map/js/world.js';
export default {
  props: {
    objNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      arrNode: [],
      current: 1,
      total: 10,
      pageSize: 4,
      defaultCurrent: 1,
      isShow: false,
      page: 1,
      nodeList: [],
      long: 0,
      loading: true,
      dataSeries: []
    };
  },
  watch: {
    'objNode.block_id': {
      handler() {
        const postNodeList = this.$store.getters.postNodeList;
        //   console.log(JSON.stringify(postNodeList));
        this.handlePostNodeList(postNodeList);
      },
      immediate: false
    }
  },
  created() {
    this.$store.dispatch('honorNode').then(() => {
      const postNodeList = this.$store.getters.postNodeList;
      // this.initNodeList(postNodeList);
      this.handlePostNodeList(postNodeList);
      // console.log(JSON.stringify(this.$store.getters.postNodeList));
      this.long = this.$store.getters.postNodeList.length;
    });
  },
  mounted() {
    this.echartsMap([], echarts, 'myMap');
  },
  methods: {
    initNodeList(data) {
      console.log(data);
      if (data.length < 4) {
        this.nodeList = [...data];
      } else {
        const partData = data.slice(0, 4);
        this.nodeList = [...partData];
      }
    },
    handleChangePage($event = 1, data) {
      const pageSize = parseInt(this.pageSize);
      let page = $event;
      //  const data = this.$store.getters.postNodeList;
      const long = data.length;
      let min = this.pageSize * (page - 1);
      let max = this.pageSize * page;
      const arr = [];
      if (long <= page * pageSize) {
        console.log(long);
        for (var i = min; i < long; i++) {
          arr.push(data[i]);
        }
        this.nodeList = [...arr];
      } else {
        for (let i = min; i < max; i++) {
          arr.push(data[i]);
        }
        this.nodeList = [...arr];
      }
    },
    handlePostNodeList(postNodeList) {
      if (postNodeList) {
        this.objNode.pack = this.$t('home.packages');
        this.objNode.latest = this.$t('home.latest');
        let arr = [],
          index;
        const {
          node_position,
          block_id,
          node_blocks,
          pack,
          latest
        } = this.objNode;
        postNodeList.map((item, i) => {
          let obj = {};
          if (parseInt(item.node_position) === parseInt(node_position)) {
            item.active = true;
            if (i === 0) {
              index = 1;
            } else {
              index = Math.ceil((i + 1) / this.pageSize);
            }
            this.current = index;
            console.log(index);
            obj = {
              name: item.city,
              value: [
                Number(item.longitude),
                Number(item.latitude),
                {
                  info: { node_position, block_id, node_blocks, pack, latest }
                }
              ]
            };
            this.objNode.latitude = item.latitude;
            this.objNode.longitude = item.longitude;
            this.objNode.city = item.city;
            arr.push(obj);
            //console.log(item.longitude);
            this.dataSeries.push(arr);
            return item;
          }
          item.active = false;
          return item;
        });
        //  console.log(JSON.stringify(postNodeList));
        this.handleChangePage(index, postNodeList);
        if (this.dataSeries.length > 2) {
          this.dataSeries.splice(0, 1);
        }
        if (this.dataSeries.length === 2) {
          let value1 = this.dataSeries[0][0].value;
          let value2 = this.dataSeries[1][0].value;
          if (value1[0] === value2[0] && value1[1] === value2[1]) {
            this.dataSeries = [this.dataSeries[1]];
            console.log(JSON.stringify(this.dataSeries));
          }
        }
        //  console.log(JSON.stringify(this.dataSeries));
        this.$nextTick(() => {
          this.echartsMap(this.dataSeries, echarts, 'myMap');
        });
      }
    }
  },
  computed: {
    arrNodeList() {
      return this.$store.getters.postNodeList;
    }
  }
};
</script>
