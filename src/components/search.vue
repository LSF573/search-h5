<template>
  <div class="page_info">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="vehicle" v-for="(item,index) in infoList" :key="index" :item='item'>
        <div class="date">
          <Badge status="processing" />
          <p class="">行程日期：<span>{{item.tdate}}</span></p>
        </div>
        <div class="date">
          <Badge status="processing" />
          <p>车次信息：<span>{{item.tno}}</span></p>
        </div>
        <div class="from_to">
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
        <Button type="primary" class="btn" @click="goDetails(item)">点击查看详情</Button>
        <div :class="['aircraft', item.ttype == 1 ? 'pink':'']">
          <div class="icon">
            <img :src="item.iconUrl" alt="" class="air_icon">
            <p class="font_desc">{{item.typeName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      infoList: [],
      busy: false,
      pageNo: 1,
      params: {}
    }
  },
  created() {
    this.params = { tDate: this.$route.query.tDate, tNo: this.$route.query.tNo, tPosStart: this.$route.query.tPosStart}
  },
  mounted() {
    document.title = '信息查询'
    http.fetchPost('/ncov2019/selectMsgByCondition', this.params).then((res) => {
      // console.log('data', res.data)
      this.infoList = res.data
    })
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
  methods: {
    goDetails(item) {
      this.$router.push({
        path: '/details',
        query: { 
          id: item.id
        }
      })
    },
    loadMore() {
      this.busy = true;
      // 分页数据请求
      setTimeout(() => {
        // if(this.pageNo!==1){
        //   this.requestApi()
        // }
        this.pageNo++;
        this.busy = false
        // console.log(this.pageNo)
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.page_info {
  padding: 15px 15px 70px;
  .vehicle {
    padding: 22px 16px 22px;
    background: rgba(255,255,255,1);
    border-radius: 10px;
    box-shadow:2px 2px 10px #eee;
    margin-bottom: 16px;
    position: relative;
    .date {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      font-size: 16px;
    }
    .from_to {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .from_city, .to_city {
        text-align: center;
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
}
</style>
