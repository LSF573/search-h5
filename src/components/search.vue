<template>
  <div :class="['page_info', {nulldata:infoList.length < 1}]">
    <div :class="['page_info', {nulldata:infoList.length < 1}]" v-show="isShow">
      <div v-show='infoList.length > 0'>
        <div class="vehicle" v-for="(item,index) in infoList" :key="index" :item='item'>
          <div class="date">
            <div class="badge">
              <Badge status="processing"/>
            </div>
            <div class="title">行程日期：</div>
            <div class="tdate">{{item.tdate}}</div>
          </div>
          <div class="date">
            <div class="badge">
              <Badge status="processing"/>
            </div>
            <div v-if="item.ttype != 8" class="title"> 车次信息：</div>
            <div class="tdate" v-if="item.ttype != 8">{{item.tno}} {{item.tnoSub}}</div>
            <div v-if="item.ttype == 8" class="title">疫情位置：</div>
            <div class="tdate" v-if="item.ttype == 8">{{item.tno}}</div>
          </div>
          <div class="from_to" v-if="item.ttype!=8">
            <div class="from_city">
              <p>(出发站)</p>
              <p class="city">{{item.tposStart}}</p>
              <p>{{item.tstart}}</p>
            </div>
            <div class="jiantou">
              <p>去往</p>
              <img src="../assets/jiantou.png" alt="" style="width: 90px;height: 14px;">
            </div>
            <div class="to_city">
              <p>(到达站)</p>
              <p class="city">{{item.tposEnd}}</p>
              <p>{{item.tend}}</p>
            </div>
          </div>
          <div class="date" v-if="item.ttype==8">
            <Badge status="processing" />
            <p class="title">发生时间：</p>
            <div class="tdate tend">
              <p>{{item.tstart}}（起）</p>
              <p>{{item.tend}}（止）</p>
            </div>
          </div>
          <Button type="primary" class="btn" @click="goDetails(item)">点击查看详情</Button>
          <div :class="['aircraft', item.ttype == 1 ? 'pink':'']">
            <div class="icon">
              <img :src="item.iconUrl" alt="" class="air_icon">
              <p class="font_desc">{{item.typeName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="null" v-show="infoList.length == 0"></div>
      <div style="color:#888;font-size: 13px;text-align:center;" v-show="infoList.length>0">没有更多了~</div>
    </div>
    <Spin v-show="!isShow" class="spin">
      <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import http from '../http'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      infoList: [],
      pageNo: 1,
      params: {},
      isShow: false,
      loading: true,
      scroll: 0
    }
  },
  created() {
    this.params = { tDate: this.$route.query.tDate, tNo: this.$route.query.tNo, tPosStart: this.$route.query.tPosStart}
  },
  mounted() {
    http.fetchPost('/ncov2019/selectMsgByCondition', this.params).then((res) => {
      this.infoList = res.data
      this.isShow = true
    })
    // 监听页面滑动
    window.addEventListener('scroll', this.handleScroll)
    // 分享
    let href = window.location.href.split('#')[0]
    let params = {
      webUrl: href
    }
    http.fetchPost('/ncov2019/wxForward', params).then((res) => {
      console.log('data', res.data)
      const { WXparams, imgUrl, link, title, desc } = res.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: WXparams.appId, // 必填，公众号的唯一标识
        timestamp: WXparams.timestamp, // 必填，生成签名的时间戳
        nonceStr: WXparams.noncestr, // 必填，生成签名的随机串
        signature: WXparams.signature,// 必填，签名
        jsApiList: [
          "updateAppMessageShareData", // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
          "updateTimelineShareData", // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
          "onMenuShareWeibo" // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口] 必填，需要使用的JS接口列表
        ]
      })

      wx.ready(function(){
        wx.checkJsApi({
          jsApiList: [
            "updateAppMessageShareData", // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            "updateTimelineShareData", // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            "onMenuShareWeibo" // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口] 必填，需要使用的JS接口列表
          ]
        })
        wx.updateAppMessageShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: () => {
          },
          cancel: () => {
            alert('您已取消分享！')
          }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: () => {
          },
          cancel: () => {
            alert('您已取消分享！')
          }
        })
      })
    })
  },
  // 页面滑动
  activated() {
    if(this.scroll > 0){
      window.scrollTo(0, this.scroll);
      this.scroll = 0;
      window.addEventListener('scroll', this.handleScroll);
     }
  },
  // 页面滑动
  deactivated(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 页面滑动
    handleScroll () {
      this.scroll  = document.documentElement && document.documentElement.scrollTop
      // console.log(this.scroll)
    },
    goDetails(item) {
      this.$router.push({
        path: '/details',
        query: { 
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less">
.page_info {
  padding: 8px 8px 35px;
  &.nulldata {
    width: 100%;
    height: 100%;
  }
  .vehicle {
    padding: 22px 16px 22px;
    background: rgba(255,255,255,1);
    border-radius: 10px;
    box-shadow:2px 2px 10px #eee;
    margin-bottom: 16px;
    position: relative;
    .date {
      display: flex;
      line-height: 1;
      font-size: 16px;
      .badge {
        width: 13px;
      }
      .title {
        width: 90px;
      }
      .tdate {
        width: 70%;
        font-size: 16px;
        line-height: 1.5;
        margin-top: -4px;
        color: #666;
        &.tend {
          font-size: 14px;
        }
      }
    }
    .from_to {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .from_city, .to_city {
        text-align: center;
        color: #666;
        .city {
          font-size: 20px;
          font-weight:500;
          color:rgba(96,118,255,1);
        }
      }
      .jiantou {
        text-align: center;
        font-size: 16px;
      }
    }
  }
  .btn {
    display: block;
    width: 50%;
    font-size: 15px;
    margin-bottom: 40px;
    background-color: #6076ff;
    margin: 22px auto 10px;
  }
  .aircraft {
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 115px 70px 0;
    // border-radius: 0 10px 0 0;
    border-style: solid;
    border-color: transparent #6076FF;
    .icon {
      position: absolute;
      top: 10px;
      left: 65px;
      display: flex;
      align-items: center;
      .air_icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      .font_desc {
        font-size: 13px;
        width: 14px;
        color: #fff;
      }
    }
    &.pink {
      border-color: transparent #FF7888;
    }
  }
  .null {
    width: 70%;
    height: 100%;
    background: url('http://shiwanjia.zzgcyun.com/ssm_admin/ncov/none.png') no-repeat;
    background-size: 100%;
    margin: 80px auto 0;
  }
  .spin {
    color: #6076ff;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%)!important;
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
}
</style>
