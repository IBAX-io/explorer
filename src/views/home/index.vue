<!--
 * @Author: abc
 * @Date: 2020-11-03 10:54:28
 * @LastEditors: abc
 * @LastEditTime: 2021-01-15 12:27:46
 * @Description: home
-->
<template>
  <div class="home">
    <div class="home-first">
      <a-skeleton active :loading="loading">
        <div class="home-number">
          <div class="home-number-block">
            <div class="home-number-num">{{ numBlock }}</div>
            <div class="home-number-text">{{ $t('home.block') }}</div>
          </div>
          <div class="home-number-power">
            <div class="home-number-long">
              <span
                class="home-num"
                v-for="(item, index) in arrNum"
                :key="index"
              >
                {{ item }}
              </span>
            </div>
            <div class="home-number-text">{{ $t('home.computing') }}</div>
          </div>
          <div class="home-number-total">
            <div class="home-number-num" v-if="totalCapacitys">
              {{ totalCapacitys.substring(0, totalCapacitys.length - 1) }}
              <span class="home-number-g">
                {{ totalCapacitys.substr(totalCapacitys.length - 1, 1) }}
              </span>
            </div>
            <div class="home-number-num" v-else>0</div>
            <div class="home-number-text">{{ $t('home.total') }}</div>
          </div>
        </div>
      </a-skeleton>
      <!-- charts -->
      <a-skeleton active :loading="loading">
        <div class="home-charts">
          <div class="home-queue">
            <span>{{ $t('home.transaction') }}</span>
            <span class="home-queue-num"
              >{{ block_transcations }}/{{ queue_transcations }}</span
            >
            <span class="home-queue-right">{{ $t('home.execute') }}</span>
            <span class="home-queue-num">{{ block_transcations }}</span>
          </div>
          <!-- echarts -->
          <show-echarts></show-echarts>
          <div class="home-queue">
            <div>
              <div class="home-queue-num">
                {{ circulations_amount
                }}<span class="home-number-g">{{ $t('money') }}</span>
              </div>
              <div class="home-queue-num">{{ $t('home.circulating') }}</div>
            </div>
            <div class="home-queue-right">
              <div class="home-queue-num">
                {{ total_amount }}
                <span class="home-number-g">{{ $t('money') }}</span>
              </div>
              <div class="home-queue-num">{{ $t('home.supply') }}</div>
            </div>
          </div>
        </div>
      </a-skeleton>
    </div>
    <!--  home-second-->
    <a-skeleton active :loading="loading">
      <div class="home-second">
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ guardian_nodes
              }}<!-- <span class="home-number-g">(A)</span> -->
            </div>
            <div class="home-number-text">
              {{ $t('home.guardian') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ storage_capacitys }}<span class="home-number-g">(T)</span>
            </div>
            <div class="home-number-text">
              {{ $t('home.storage') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ cast_nodes }}
            </div>
            <div class="home-number-text">
              {{ $t('home.cast') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ mint_amount
              }}<span class="home-number-g">{{ $t('money') }}</span>
            </div>
            <div class="home-number-text">
              {{ $t('home.minted') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ stake_amount
              }}<span class="home-number-g">{{ $t('money') }}</span>
            </div>
            <div class="home-number-text">
              {{ $t('home.staked') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ ecosystems
              }}<!-- <span class="home-number-g">(A)</span> -->
            </div>
            <div class="home-number-text">
              {{ $t('home.ecological') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ sub_nodes
              }}<!-- <span class="home-number-g">(A)</span> -->
            </div>
            <div class="home-number-text">
              {{ $t('home.child') }}
            </div>
          </div>
        </div>
        <div class="home-second-item">
          <div class="home-number-block">
            <div class="home-number-num">
              {{ clb_nodes
              }}<!-- <span class="home-number-g">(A)</span> -->
            </div>
            <div class="home-number-text">
              {{ $t('home.clb') }}
            </div>
          </div>
        </div>
        <div class="home-second-item"></div>
      </div>
    </a-skeleton>
    <a-skeleton active :loading="loading">
      <!-- honor node -->
      <echarts-map :objNode="objNode"></echarts-map>
      <!-- block table -->
      <query-table></query-table>
    </a-skeleton>
  </div>
</template>

<script>
import {
  handleThousandFormat,
  handleMoneyFormat
} from '../../assets/js/common.js';
import ShowEcharts from './components/showEcharts';
import EchartsMap from './components/echartsMap';
import QueryTable from './components/queryTable';
export default {
  name: 'Home',
  components: {
    ShowEcharts,
    EchartsMap,
    QueryTable
  },
  data() {
    return {
      num: '',
      numBlock: '',
      arrNum: [],
      showBlock: false,
      timer: null,
      arrBlock: [],
      dashboard: {},
      block_transcations: 0,
      queue_transcations: 0,
      totalCapacitys: 0,
      guardian_nodes: 0,
      storage_capacitys: 0,
      cast_nodes: 0,
      mint_amount: 0,
      stake_amount: 0,
      ecosystems: 0,
      sub_nodes: 0,
      clb_nodes: 0,
      circulations_amount: 0,
      total_amount: 0,
      node_position: 1,
      objNode: {},
      isNode: false,
      loading: true
    };
  },
  created() {
    console.log(this.echartsLoading);
    this.$store.dispatch('websocketToken').then(() => {
      const websocketData = this.$store.getters.postWebsocket;
      //  console.log(JSON.stringify(websocketData));
      this.getSocket(websocketData, this.handleDashboard, 'dashboard');
    });
  },
  computed: {},
  mounted() {
    this.arrNum = this.num.split('');
    this.isNode = true;
  },
  beforeDestroy() {
    this.loadMapDestroy();
  },
  methods: {
    loadMapDestroy() {
      this.isNode = false;
      const bingUesrKey =
        'ApN1XkT2A0xYVCMN0mihGQWzQ4btN3v171jSV0BvrBRmsFDWe7pVnKu3o-tgXjox';
      const lang = this.$store.state.lang;
      console.log(lang);
      const BingMap_URL = `http://www.bing.com/api/maps/mapcontrol?setLang=${lang}&key=${bingUesrKey}&callback=loadMapScenario`;
      // As an instance method inside a component
      this.$unloadScript(BingMap_URL)
        .then(() => {
          // Script was unloaded successfully
          window.loadMapScenario = null;
        })
        .catch(() => {
          // Script couldn't be found to unload; make sure it was loaded and that you passed the same URL
        });
    },
    /* get  dashboard*/
    handleDashboard(data) {
      console.log(JSON.stringify(data));
      this.loading = false;
      const dashboard = (this.dashboard = data.data);
      this.objNode = {
        node_position: parseInt(dashboard.node_position),
        block_id: parseInt(dashboard.block_id),
        node_blocks: parseInt(dashboard.node_blocks)
      };
      this.numBlock = handleThousandFormat(dashboard.block_id);
      this.arrNum = handleThousandFormat(dashboard.total_counts).split('');
      this.circulations_amount = handleMoneyFormat(
        dashboard.circulations_amount
      );
      //  console.log(JSON.stringify(dashboard));
      this.total_amount = handleMoneyFormat(dashboard.total_amount);
      this.totalCapacitys = handleThousandFormat(dashboard.total_capacitys);
      this.guardian_nodes = handleThousandFormat(dashboard.guardian_nodes);
      this.storage_capacitys = handleThousandFormat(
        dashboard.storage_capacitys
      );

      this.cast_nodes = handleThousandFormat(dashboard.cast_nodes);
      this.mint_amount = handleMoneyFormat(dashboard.mint_amount);
      this.stake_amount = handleMoneyFormat(dashboard.stake_amount);
      this.ecosystems = handleThousandFormat(dashboard.ecosystems);
      this.sub_nodes = handleThousandFormat(dashboard.sub_nodes);
      this.clb_nodes = handleThousandFormat(dashboard.clb_nodes);
      this.block_transcations = handleThousandFormat(
        dashboard.block_transcations
      );
      this.queue_transcations = handleThousandFormat(
        dashboard.queue_transcations
      );
      // console.log(JSON.stringify(this.dashboard));
    }
  }
};
</script>
