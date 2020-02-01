<template>
  <div class="page_details">
    <div class="list_desc">
      <span class="title">交通类型</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">行程日期</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">车次信息</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">车厢</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">出发站</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">到达站</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">车次附加描述</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">开始时间</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">结束时间</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">信息来源</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">线索人</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">提交时间</span>
      <span class="answer">飞机</span>
    </div>
    <div class="list_desc">
      <span class="title">事件备注</span>
      <span class="answer">飞机</span>
    </div>
    <Button type="primary" class="btn" @click="back()">点击返回</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: '交通类型',
          answer: '飞机'
        },{
          title: '行程日期',
          answer: '2020年01月25日'
        },{
          title: '车次信息',
          answer: '8L9564'
        },{
          title: '车厢',
          answer: '暂无'
        },{
          title: '交通类型',
          answer: '飞机'
        },{
          title: '行程日期',
          answer: '2020年01月25日'
        },{
          title: '车次信息',
          answer: '8L9564'
        },{
          title: '车厢',
          answer: '暂无'
        }
      ]
    }
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
      font-size: 16px;
      border-bottom: 1px solid #DDDDDD;
      .title {
        color: #333333;
      }
      .answer {
        color:rgba(102,102,102,1);
      }
    }
    .btn {
      display: block;
      margin: 50px auto 20px;
      width: 80%;
      height: 45px;
      font-size: 23px;
    }
  }
</style>
