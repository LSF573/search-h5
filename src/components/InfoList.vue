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
        <div :class="['aircraft', {pink:item.ttype==1},{skyblue:item.ttype==3},{orange:item.ttype==4},{FF3EFF:item.ttype==5},{FF66:item.ttype==6},{E90FF:item.ttype==7},{FFD700:item.ttype==8}]">
          <div class="icon">
            <img :src="item.iconUrl" alt="" class="air_icon">
            <p class="font_desc">{{item.typeName}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import http from '../http'
import Tabbar from'./tabbar'
export default {
  data() {
    return {
      infoList: [],
      busy: false,
      pageNo: 1,
      params: {},
      loading: true
    }
  },
  components: {
    Tabbar
  },
  mounted() {
    document.title = '信息查询'
    this.getData()
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
    getData() {
      this.params = { pageNow: this.pageNo }
      http.fetchPost('/ncov2019/selectAllMsgByPage', this.params).then((res) => {
        console.log('data', res.data)
        if(this.pageNo == 1) {
          this.infoList = res.data
          if(res.data.length < 1) {
            this.loading = false
          }
        } else {
          this.infoList = this.infoList.concat(res.data)
          if(res.data.length < 1) {
            this.loading = false
          }
        }
      })
    },
    loadMore() {
      this.busy = true;
      if(this.loading) {
        // 分页数据请求
        setTimeout(() => {
          // if(this.pageNo!==1){
          //   this.requestApi()
          // }
          this.pageNo++
          this.getData()
          this.busy = false
          console.log(this.pageNo)
        }, 1000)
      }
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
    &.skyblue {
      border-color: transparent skyblue;
    }
    &.orange {
      border-color: transparent orange;
    }
    &.FF66 {
      border-color: transparent #66CDAA ;
    }
    &.FF3EFF {
      border-color: transparent #FF3EFF;
    }
    &.E90FF {
      border-color: transparent #1E90FF;
    }
    &.FFD700 {
      border-color: transparent#FFD700;
    }
  }
}
</style>
