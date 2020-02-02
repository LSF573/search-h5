<template>
  <div class="page_aboutUs">
    <div class="adv"></div>
    <!-- 底部tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from'./tabbar'
export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="less">
  .page_aboutUs {
    width: 100%;
    height: 100%;
    .adv {
      width: 100%;
      height: 100%;
      background: url('http://shiwanjia.zzgcyun.com/ssm_admin/ncov/about.jpg') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 50px;
    }
  }
</style>
