<!--
 * @Author: abc
 * @Date: 2020-11-06 14:33:09
 * @LastEditors: abc
 * @LastEditTime: 2020-12-17 14:19:18
 * @Description: nav 
-->
<template>
  <div class="header">
    <nav
      ref="headerNav"
      :class="{
        'global-fixed': isFixed
      }"
    >
      <a-row type="flex" justify="center" align="top">
        <a-col :span="16">
          <div class="header-nav">
            <router-link
              class="header-nav__logo header-nav__one"
              :to="{ name: 'Index' }"
              ><img src="../assets/image/logo.png" alt="logo"
            /></router-link>
            <router-link
              class="header-nav__link header-nav__first"
              :to="{ name: 'Index' }"
              exact
              >{{ $t('home') }}</router-link
            >
            <router-link
              class="header-nav__link"
              :to="{ name: 'BlockReader' }"
              >{{ $t('block') }}</router-link
            >
            <router-link class="header-nav__link" :to="{ name: 'Database' }">
              {{ $t('database') }}</router-link
            >
            <a class="header-nav__link" href="javascript:;">{{
              $t('wallet')
            }}</a>
          </div>
        </a-col>
      </a-row>
    </nav>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="16">
        <div class="header-content">
          <div class="header-query">
            <label class="header-query-title">{{ $t('home.query') }}:</label>
            <a-input
              v-model="strQuery"
              :placeholder="$t('home.condition')"
              allowClear
            >
              <a-tooltip slot="suffix" title="">
                <a-icon type="search" @click="handleSearch" />
              </a-tooltip>
            </a-input>
          </div>
          <!-- time -->
          <div class="header-time">
            <div class="header-time-utc">UTC</div>
            <vue-flip-time class="header-time-flip"></vue-flip-time>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-back-top :target="handleBackTop" :visibilityHeight="visibilityHeight" />
  </div>
</template>
<script>
export default {
  name: 'SubMenu',
  data() {
    return {
      strQuery: '',
      domGlobal: '',
      isFixed: false,
      visibilityHeight: 100
    };
  },
  mounted() {
    this.domHeaderTop = this.$refs.headerNav;
    this.domGlobal = document.getElementById('global').firstChild;
    // console.log(this.domGlobal);
    // console.log(this.domHeaderTop);
    this.domGlobal.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleBackTop() {
      return document.getElementById('global').firstChild;
    },
    handleScroll() {
      const scrollTop = this.domGlobal.scrollTop;
      //  console.log(scrollTop);
      if (scrollTop > 300) {
        this.back = true;
      } else {
        this.back = false;
      }
      const topHeight = this.domHeaderTop.offsetTop;
      this.isFixed = scrollTop > topHeight;
      this.isInUp = scrollTop === topHeight;
    },
    handleSearch() {
      const strQuery = this.strQuery;
      const hash = /^[a-f0-9]{64}$/;
      const block = /^[0-9]*$/;
      const address = /^\d{4}-\d{4}-\d{4}-\d{4}-\d{4}$/;
      if (strQuery === '') {
        this.$message.warning({
          content: this.$t('home.enter')
        });
        return false;
      } else if (block.test(strQuery)) {
        this.$router.push({
          name: 'BlockHeight',
          params: { block: strQuery }
        });
        return false;
      } else if (hash.test(strQuery)) {
        this.$router.push({
          name: 'Transaction',
          params: { transaction: strQuery }
        });
        return false;
      } else if (address.test(strQuery)) {
        this.$router.push({
          name: 'Account',
          params: { account: strQuery }
        });
        return false;
      } else {
        this.$message.warning({
          content: this.$t('home.enter')
        });
        return false;
      }
    }
  },
  props: {
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
