<template>
  <div class="page_details">
    <div class="list_desc">
      <span class="title">交通类型</span>
      <p class="answer">{{info.typeName}}</p>
    </div>
    <div class="list_desc">
      <span class="title">行程日期</span>
      <p class="answer">{{info.tdate}}</p>
    </div>
    <div class="list_desc">
      <span class="title">车次信息</span>
      <p class="answer">{{info.tno}}</p>
    </div>
    <div class="list_desc">
      <span class="title">车厢</span>
      <span class="answer">{{info.tnoSub}}</span>
    </div>
    <div class="list_desc">
      <span class="title">出发站</span>
      <span class="answer">{{info.tposStart}}</span>
    </div>
    <div class="list_desc">
      <span class="title">到达站</span>
      <span class="answer">{{info.tposEnd}}</span>
    </div>
    <div class="list_desc">
      <span class="title">车次附加描述</span>
      <span class="answer tmemo">{{info.tmemo}}</span>
    </div>
    <div class="list_desc">
      <span class="title">开始时间</span>
      <p class="answer">{{info.tstart}}</p>
    </div>
    <div class="list_desc">
      <span class="title">结束时间</span>
      <span class="answer">{{info.tend}}</span>
    </div>
    <div class="list_desc">
      <span class="title">信息来源</span>
      <span class="answer">{{info.who}}</span>
    </div>
    <div class="list_desc">
      <span class="title">线索人</span>
      <a :href="info.source">查看原文</a>
    </div>
    <div class="list_desc">
      <span class="title">提交时间</span>
      <span class="answer">{{info.createdAt}}</span>
    </div>
    <div class="list_desc">
      <span class="title">事件备注</span>
      <span class="answer">{{info.verified === 1 ? '已核实' : '未核实'}}</span>
    </div>
    <Button type="primary" class="btn" @click="back()">点击返回</Button>
  </div>
</template>

<script>
import http from '../http'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      info: {},
      params: {}
    }
  },
  created() {
    this.params = { id: this.$route.query.id }
  },
  mounted() {
    http.fetchPost('/ncov2019/selectMsgById', this.params).then((res) => {
      // console.log('data', res.data)
      this.info = res.data
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
    back() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="less">
  .page_details {
    padding: 0 30px;
    .list_desc {
      padding: 16px 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      border-bottom: 1px solid #DDDDDD;
      .title {
        color: #333333;
      }
      .answer {
        max-width: 56%;
        color:rgba(102,102,102,1);
        text-align: right;
      }
      .tmemo {
        max-width: 56%;
        white-space: pre-wrap;
      }
    }
    .btn {
      display: block;
      margin: 50px auto 50px;
      width: 80%;
      height: 40px;
      font-size: 18px;
    }
  }
</style>
