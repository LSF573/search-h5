<template>
  <div class="page_opinion">
    <p class="tip">请留下您宝贵的建议：</p>
    <Input v-model="textarea" maxlength="200" show-word-limit type="textarea" placeholder="感谢您提出的宝贵意见，我们将不断完善！" style="width: 100%;" />
    <p class="name">姓名</p>
    <input type="text" placeholder="请输入您的姓名（选填）" v-model="userName" class="input_name" style="width: 100%;height: 45px;">
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
  methods: {
    submit() {
      console.log(this.textarea,this.userName,this.phone)
      this.params = { message: this.textarea, username: this.userName, phone: this.phone }
      http.fetchPost('/ncovmessages/addNcovMessages', this.params).then((res) => {
        console.log('data', res.data)
        this.textarea = ''
        this.userName = ''
        this.phone = ''
        alert('提交成功!')
      })
    }
  }
}
</script>

<style lang="less">
  .page_opinion {
    padding: 24px 15px;
    background-color: #F5F5F5;
    height: 100%;
    min-height: 100%;
    font-size: 16px;
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
