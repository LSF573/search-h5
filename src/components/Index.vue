<template>
  <div class="hello">
    <h1>您好，欢迎使用</h1>
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
    <Button type="primary" style="width: 100%;height: 40px;line-height: 40px;font-size: 23px;margin-bottom: 40px;background-color: #6076ff;" to="/search" @click="goSearch()">立即查询</Button>
    <div>
      <p style="color: #6076ff;">温馨提示</p>
      <p style="text-indent: 2em; margin-bottom: 40px;">
        这里是温馨提示温馨提示，是温馨提示温馨提示这里是温馨提示温馨提示这里是温馨提示温馨提示这里是温馨提示温馨提示，这里是温馨提示温馨提示这里是温馨提示温馨提示
      </p>
    </div>
    <div class="company">
      <img src="../assets/logo_longyuan.png" style="width: 20px;height: 20px;"/>
      <span style="color:#6076ff; text-align: center;">郑州龙缘网络科技出品</span>
    </div>
    <!-- 底部tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from'./tabbar'
import api from '../services/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '首页',
      checi: '',
      city: '',
      datePicker: ''
    }
  },
  components: {
    Tabbar
  },
  onLoad() {
  },
  methods: {
    goSearch() {
      var d = new Date(this.datePicker)
      var resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      // console.log('city---', this.city, resDate, this.datePicker,this.checi) 
      api.select({
        tDate: this.resDate,
        tNo: this.checi,
        tPosStart: this.city
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

 .hello{
  padding: 47px 32px 70px;
  background-color: #fff;
  h1,h3 {
    font-weight: 400;
  }
  .company {
    display: flex;
    align-items: center;
    text-align: center;
    width: 50%;
    margin: 0 auto;
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
  
}
/* h2 {
  font-weight: normal;
} */
</style>
