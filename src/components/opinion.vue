<template>
  <div class="page_opinion">
    <p class="tip">请留下您宝贵的建议：</p>
    <Input v-model="textarea" maxlength="200" :rows="4" show-word-limit type="textarea" placeholder="感谢您提出的宝贵意见，我们将不断完善！" style="width: 100%;" />
    <p class="name">姓名</p>
    <input type="text" placeholder="请输入您的姓名（选填）" v-model="userName" class="input_name" style="">
    <p class="name">电话/微信</p>
    <input type="text" placeholder="请输入您的手机号或微信号（选填）" v-model="phone" class="input_name" style="width: 100%;height: 45px;">
    <Button type="primary" class="btn" @click="submit()">立即提交</Button>
    <!-- 底部tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from'./tabbar'
import http from '../http'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      textarea: '',
      userName: '',
      phone: ''
    }
  },
  components: {
    Tabbar
  },
  mounted() {
    window.scrollTo(0, 0)
    let href = window.location.href.split('#')[0]
    let params = {
      webUrl: href
    }
    http.fetchPost('/ncov2019/wxForward', params).then((res) => {
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
    submit() {
      // console.log(this.textarea,this.userName,this.phone)
      this.params = { message: this.textarea, username: this.userName, phone: this.phone }
      if(this.textarea&&this.userName&&this.phone) {
        http.fetchPost('/ncovmessages/addNcovMessages', this.params).then((res) => {
        // console.log('data', res.data)
          this.textarea = ''
          this.userName = ''
          this.phone = ''
          alert('提交成功!')
        })
      } else {
        alert('请输入您要反馈的内容')
      }
    }
  }
}
</script>

<style lang="less">
  input::-webkit-input-placeholder {
    color: rgb(193, 196, 202);
  }
  .page_opinion {
    padding: 24px 15px;
    background-color: #F5F5F5;
    height: 100%;
    min-height: 100%;
    font-size: 16px;
    .input_name {
      width: 100%;
      height: 45px;
      padding: 0 7px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .tip {
      font-size: 16px;
      color:rgba(51,51,51,1);
      margin-bottom: 15px;
    }
    .name {
      margin: 16px 0;
    }
    .btn {
      display: block;
      margin: 50px auto 20px;
      width: 80%;
      height: 45px;
      font-size: 18px;
      background:rgba(96,118,255,1);
    }
  }
</style>
