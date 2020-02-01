<template>
	<div class="tabberWarp">
		<div class="warp">
			<Item :txt='item.txt' :page.sync='item.page' @change='getVal' v-for='(item, index) in tabbarDes' :key="index" :sel.sync='selected'>
				<img :src="item.normalImg" slot='normalImg'>
				<img :src="item.activeImg" slot='activeImg'>
			</Item>
		</div>
	</div>
</template>
<script>
	import Item from './Item.vue'
	export default {
		components: {
			Item
		},
		data() {
			return{
				selected:'index',
				tabbarDes:[
					{
						txt:'立即查询',
						page:'index',
						normalImg:require('../assets/chaxun1.png'),
						activeImg:require('../assets/chaxun2.png')
					},				
					{
						txt:'全部信息',
						page:'Info',
						normalImg:require('../assets/quanbu1.png'),
						activeImg:require('../assets/quanbu2.png')
					},
					{
						txt:'意见反馈',
						page:'opinion',
						normalImg:require('../assets/fankui1.png'),
						activeImg:require('../assets/fankui2.png')
          },
          {
						txt:'关于我们',
						page:'aboutAs',
						normalImg:require('../assets/guanyu1.png'),
						activeImg:require('../assets/guanyu2.png')
					},
				]
			}
		},
		methods: {
			getVal(res) {
        this.selected = res
        console.log('父组件中的sel----', this.selected)
			}
		}
	}
</script>
<style>
	.warp{
		width: 100%;
		border-top: 1px solid #eee;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 0;
	}
	.warp img{
		width: 20px;
		height: 20px;
	}
	.tabberWarp img{
		margin-top: 10px;
		margin-bottom: 5px;
 
	}
	.tabberWarp{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 5px;
		background: #fff;
	}
</style>