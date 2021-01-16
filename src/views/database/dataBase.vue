<!--
 * @Author: abc
 * @Date: 2020-11-05 18:45:50
 * @LastEditors: abc
 * @LastEditTime: 2020-12-30 09:57:05
 * @Description: data base
-->
<template>
  <div class="base">
    <a-spin :spinning="spinning">
      <div class="base-node">
        <div
          class="base-node-item"
          v-for="item in arrDataNode"
          :key="item.id"
          @click="handleDataName(item.id)"
        >
          <img :src="item.icon_url" alt="logo" />
          <div class="base-node-item-content">
            <span class="base-node-item-text">{{ item.nodename }}</span>
            <span class="base-node-item-text base-node-item-text-color">
              {{ item.engine }}&nbsp;({{ item.backend_version }})
            </span>
          </div>
        </div>
      </div>
    </a-spin>
    <div class="base-page">
      <a-pagination
        v-model="dataNode.current_page"
        :total="dataNode.total"
        :pageSize="dataNode.page_size"
        show-less-items
        @change="handleChangeNode"
      />
    </div>
    <div class="base-put">
      {{ $t('data.put') }}
    </div>
    <div class="base-query">
      <a-input v-model="queryName" :placeholder="$t('data.query')" allowClear>
        <a-tooltip slot="suffix" title="">
          <a-icon type="search" @click="handleSearch(queryName)" />
        </a-tooltip>
      </a-input>
    </div>
    <div class="base-box" v-if="isShow">
      <a-spin :spinning="spinningName">
        <div class="base-content">
          <div
            class="base-content-item"
            v-for="(item, index) in arrDataName"
            :key="index"
          >
            <a-tooltip
              slot="suffix"
              placement="bottomLeft"
              :title="item.tablename"
            >
              <router-link
                :to="{
                  name: 'DataDetails',
                  params: {
                    name: item.tablename,
                    node: dataName.nodeposition
                  }
                }"
              >
                {{ item.tablename }}
              </router-link>
            </a-tooltip>
          </div>
        </div>
        <div class="base-page">
          <a-pagination
            v-model="dataName.current_page"
            :total="dataName.total"
            :pageSize="dataName.page_size"
            show-less-items
            @change="handleChangePage"
          />
        </div>
      </a-spin>
    </div>
    <no-data v-else></no-data>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      arrDataNode: [],
      arrDataName: [],
      defaultCurrent: 1,
      isShow: false,
      spinning: true,
      spinningName: true,
      queryName: '',
      // Database node
      dataNode: {
        cmd: '001', // node
        page_size: 6,
        current_page: 1,
        order: 'id desc'
      },
      // Database table name
      dataName: {
        cmd: '002',
        nodeposition: 1,
        page_size: 40,
        current_page: 1,
        order: 'tablename asc',
        table_name: ''
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    const dataNode = this.dataNode;
    const dataName = this.dataName;
    this.databaseNode(dataNode);
    this.databaseName(dataName);
  },
  mounted() {},
  methods: {
    // get database node
    async databaseNode(data) {
      this.spinning = true;
      const res = await this.$http.post('/database', data);
      console.log(JSON.stringify(res));
      if (res.code === 0) {
        this.arrDataNode = res.data.data;
        this.dataNode.current_page = res.data.current_page;
        this.dataNode.total = res.data.total || 6;
      }
      this.spinning = false;
    },
    // get database name
    async databaseName(data) {
      this.spinningName = true;
      const res = await this.$http.post('/database', data);
      console.log(JSON.stringify(res));
      if (!res.data.data) {
        this.isShow = false;
        this.arrDataName = [];
        // this.dataName.page_size = res.data.page_size;
      } else {
        this.arrDataName = res.data.data;
        this.dataName.current_page = res.data.current_page;
        this.dataName.total = res.data.total;
        this.dataName.nodeposition = res.data.nodeposition;
        this.isShow = true;
      }
      this.spinningName = false;
    },
    handleChangeNode(current) {
      this.dataNode.current_page = current;
      this.databaseNode(this.dataName);
    },
    handleChangePage(current) {
      console.log(current);
      this.dataName.current_page = current;
      this.databaseName(this.dataName);
    },
    handleDataName(id) {
      // console.log(id);
      this.dataName.current_page = 1;
      this.dataName.nodeposition = parseInt(id);
      this.databaseName(this.dataName);
    },
    handleSearch(queryName) {
      this.dataName.current_page = 1;
      this.dataName.table_name = queryName;
      this.databaseName(this.dataName);
    }
  }
};
</script>
