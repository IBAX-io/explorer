<!--
 * @Author: abc
 * @Date: 2020-11-06 10:51:35
 * @LastEditors: abc
 * @LastEditTime: 2021-01-12 15:13:56
 * @Description: 
-->
<template>
  <div class="footer">
    <div class="footer-top">
      <img src="../assets/image/logo.png" alt="logo" />
      <span>{{ $t('footer.chain') }}</span>
    </div>
    <div class="footer-middle">
      <!-- <div class="footer-middle-item">
        <div class="footer-middle-item-left">
          <a-icon type="mobile" />
        </div>
        <div class="footer-middle-item-right">
          <span>+168-18688-888888</span>
          <span>{{ $t('footer.give') }}</span>
        </div>
      </div> -->
      <div class="footer-middle-item">
        <div class="footer-middle-item-left">
          <a-icon type="mail" />
        </div>
        <div class="footer-middle-item-right">
          <span>{{ $t('footer.mail') }}</span>
          <span>{{ $t('footer.send') }}</span>
        </div>
      </div>
      <div class="footer-middle-item">
        <div class="footer-middle-item-left">
          <a-icon type="message" />
        </div>
        <div class="footer-middle-item-right">
          <a
            href="https://github.com/IBAX-io/go-ibax/issues"
            target="_blank"
            style="color:#fff;"
          >
            <span>{{ $t('footer.live') }}</span>
          </a>
          <span>{{ $t('footer.get') }}</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-item">
        {{ $t('footer.reserved') }}
      </div>
      <div class="footer-bottom-item">
        <a href=" https://www.facebook.com/ibaxNetwork/" target="_blank">
          <a-icon type="facebook" />
        </a>
        <a href="https://twitter.com/IbaxNetwork" target="_blank">
          <a-icon type="twitter" />
        </a>
        <a
          href="https://www.linkedin.com/company/ibaxio/"
          target="_blank"
          style="display: none;"
        >
          <a-icon type="google-plus" />
        </a>
        <a href="https://www.linkedin.com/company/ibaxio/" target="_blank">
          <a-icon type="linkedin" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      open: ['4'],
      open1: ['3']
    };
  },
  updated() {},
  created() {
    // console.log(this.open);
  },
  watch: {},
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
  computed: {
    showList() {
      // console.log(this.$store);
      return this.$store.getters.postFilterRouter;
    }
  }
};
</script>
