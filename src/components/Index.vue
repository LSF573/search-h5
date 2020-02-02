<template>
  <div class="hello">
    <div class="top">
      <h1>您好，欢迎使用</h1>
      <div size="large" class="share" @click="showPop()">分享给关心的人</div>
      <!-- <Tag size="large">Large Tag</Tag> -->
    </div>

    <h3>2019-nCoV患者相同行程查询工具</h3>
    <div class="form_data">
      <Row class="list_item">
        <Col span="3">
          <!-- <Icon type="md-calendar" color='#6076ff' size="26"/> -->
          <img src="../assets/rili.png" alt="" class="icon_img">
        </Col>
        <Col span='3'>
          <div class="line"></div>
        </Col>
        <Col span="16">
          <!-- <input type="date" placeholder="请点击选择日期" > -->
          <DatePicker v-model="datePicker" type="date" format="yyyy-MM-dd" placeholder="请点击选择日期" style="border: none;"></DatePicker>
        </Col>
      </Row>
      <Row class="list_item">
        <Col span="3">
          <img src="../assets/cheliang.png" alt="" class="icon_img">
        </Col>
        <Col span='3'>
          <div class="line"></div>
        </Col>
        <Col span="16">
          <input v-model="checi" placeholder="请输入：车次/航班/车牌/x路" class="input_form"/>
        </Col>
      </Row>
      <Row class="list_item">
        <Col span="3">
          <img src="../assets/diqu.png" alt="" class="icon_img">
        </Col>
        <Col span='3'>
          <div class="line"></div>
        </Col>
        <Col span="16">
          <input v-model="city" placeholder="例如：武汉或成都（可不填）" class="input_form"/>
        </Col>
      </Row>
    </div>
    <Button type="primary" style="width: 100%;height: 40px;line-height: 40px;font-size: 18px;margin-bottom: 20px;background-color: #6076ff;" @click="goSearch()">立即查询</Button>
    <div style="text-align: center;">
      <Tag color="geekblue" style="margin-bottom: 20px;">{{selectnum}}人次已使用</Tag>
    </div>
    <div style="font-size: 13px; color: #888;">
      <p style="color: #6076ff;">温馨提示</p>
      <p style="text-indent: 2em;">
        * 同乘人员、可能接触人员返家后，暂不要外出，居家封闭隔离观察。如有发热症状请就近到网上公布的指定医院发热门诊救治。</p>
      <p style="text-indent: 2em;">* 第一时间到所在社区进行登记，并与所在县（市）区疾病预防控制部门取得联系。</p>
      <p style="text-indent: 2em;">* 就诊过程中，要全程佩戴口罩，尽量不要乘坐公共交通工具。</p>
      <p style="text-indent: 2em;">* 您只能查询到经由官方媒体发布的新型冠状病毒感染的肺炎患者的行程，如未查询到行程信息并不代表一定没有与新型冠状病毒感染的肺炎患者同程，如出现症状请就近到指定发热门诊救治。</p>
      <p style="text-indent: 2em; margin-bottom: 40px;">* 若各地官方机构希望增补行程数据、寻人信息，可联系：18336336975（电话微信）
      </p>
    </div>
    <div class="company">
      <img src="../assets/logo_longyuan.png" style="width: 20px;height: 20px; vertical-align: middle;"/>
      <span style="color:#6076ff; text-align: center;">郑州龙缘网络科技出品</span>
    </div>
    <!-- 分享弹窗 -->
    <div class="popup" v-show="isShowPopup" @touchmove.prevent>
      <div class="mask" @click="close"/>
      <div class="popup_cont center">
        <img src="http://shiwanjia.zzgcyun.com/ssm_admin/ncov/fenxiang.png" alt="" class="tipimg">
      </div>
    </div>
    <!-- 底部tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from'./tabbar'
import http from '../http'
import wx from 'weixin-js-sdk'
export default {
  name: 'HelloWorld',
  data () {
    return {
      isShowPopup: false,
      selected: '首页',
      checi: '',
      city: '',
      datePicker: '',
      selectnum: 0
    }
  },
  components: {
    Tabbar
  },
  mounted() {
    http.fetchPost('ncovselectnum/selectNum').then((res) => {
      console.log('data', res.data)
      this.selectnum = res.data.selectnum
    })
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
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  },
  methods: {
    goSearch() {
      console.log('this.datePicke',this.datePicker)
      if (this.datePicker) {
        let d = new Date(this.datePicker)
        var myyear = d.getFullYear()
        var mymonth = d.getMonth() + 1
        var myweekday = d.getDate()
        if (mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        let resDate = myyear + "-" + mymonth + "-" + myweekday
        this.datePicker = resDate
      }
      console.log('city---', this.city, this.datePicker, this.checi) 
      this.$router.push({
        path: '/search',
        query: { 
          tDate: this.datePicker, tNo: this.checi, tPosStart: this.city
        }
      })
    },
    close() {
      this.isShowPopup = false
    },
    showPop() {
      console.log('wertyuio')
      this.isShowPopup = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    padding: 47px 32px 70px;
    background-color: #fff;
    h1{
      font-size: 20px;
    }
    h1,h3 {
      font-weight: 400;
    }
    .top {
      display: flex;
      align-items: center;
      .share {
        width: 45%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #6076FF;
        font-size: 13px;
        border: 1px solid rgba(96,118,255,1);
        line-height: 30px;
        border-radius: 20px;
        margin-left: 3px;
      }
    }
    .company {
      text-align: center;
      font-size: 12px;
    }
    .tabBar {
      width: 20px;
      height: 20px;
    }
    .form_data {
      margin: 40px 0;
      .list_item {
        // display: flex;
        // align-items: center;
        background-color: #fff;
        border-radius: 8px;
        box-shadow:2px 2px 10px #eee;
        padding: 12px 12px 10px;
        margin-bottom: 12px;
        .icon_img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        .line {
          width: 1px;
          height: 23px;
          background:rgba(204,204,204,1);
        }
        .input_form {
          width: 100%;
          outline: none;
          border: none;
        }
      }
    }
    .popup {
      .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.7);
        overflow-y: hidden;
      }
      .popup_cont {
        box-sizing: border-box;
        position: fixed;
        z-index: 1001;
        width: 80%;
        opacity: 1;
        &.center{
          top: 20%;
          left: 50%;
          transform: translate(-45%, -50%)!important;
        }
        .tipimg {
          width: 100%;
          height: 30%;
        }
      }
    }
  }
</style>
