<template>
  <div class="tabberWarp">
    <div class="warp">
      <div
        class="itemWarp flex_mid"
        v-for='(item, index) in tabbarDes'
        :key="index"
        @click="getVal(item)"
      >
        <img :src="item.page === $route.path ? item.activeImg : item.normalImg" alt="" />
        <p :class="['font', {color: item.page === $route.path}]">{{item.txt}}</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      selected: 'index',
      tabbarDes: [
        {
          txt: '立即查询',
          page: '/index',
          normalImg: require('../assets/chaxun1.png'),
          activeImg: require('../assets/chaxun2.png')
        },
        {
          txt: '全部信息',
          page: '/Info',
          normalImg: require('../assets/quanbu1.png'),
          activeImg: require('../assets/quanbu2.png')
        },
        {
          txt: '意见反馈',
          page: '/opinion',
          normalImg: require('../assets/fankui1.png'),
          activeImg: require('../assets/fankui2.png')
        },
        {
          txt: '关于我们',
          page: '/aboutAs',
          normalImg: require('../assets/guanyu1.png'),
          activeImg: require('../assets/guanyu2.png')
        }
      ]
    }
  },
  methods: {
    getVal (res) {
      console.log(this.$route.path)
      this.selected = res.page
      console.log('selselsel', this.selected, res.page)
      this.$router.push(res.page)
    }
  }
}
</script>
<style lang="less">
.warp {
  width: 100%;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
  .itemWarp {
    text-align: center;
    .font {
      font-size: 12px;
      &.color {
        color: #6076FF;
      }
    }
  }
}
.warp img {
  width: 20px;
  height: 20px;
}
.tabberWarp img {
  margin-top: 10px;
  margin-bottom: 5px;
}
.tabberWarp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 5px;
  background: #fff;
}
</style>
