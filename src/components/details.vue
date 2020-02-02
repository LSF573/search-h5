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
      console.log('data', res.data)
      this.info = res.data
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
