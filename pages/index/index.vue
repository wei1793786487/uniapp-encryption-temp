<template>
	<view class="wrap">
		<u-swiper :list="list" height="400" mode="dot"></u-swiper>
		<view class="title" style="background-color: #F8F8F8; height:50rpx;margin-top: auto;">实习管理</view>
		<u-grid :col="4">
			<!-- <u-grid-item v-for="item in icon_list" >
				<image :src="/static/icons/${item.icon}" style="width: 50rpx;height: 50rpx;" class="badge-icon"></image>
				<view class="grid-text">锁头</view>
			</u-grid-item> -->

		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: '/static/banner_01.jpg',
					},
					{
						image: '/static/banner_02.jpg',
					},
					{
						image: '/static/banner_03.jpg',
					}
				],
				icon_list: []
			}
		},
		onLoad() {
			this.get_icon_list()
		},
		methods: {
			get_icon_list() {
		
				this.$u.post('info', {
					"user_id": "000001",
					"shixiTypes": "020409",
				}).then(res => {
					this.icon_list=res.practice
					console.log(this.icon_list)
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-top: 5px;
	}

	.title {
		padding: 10rpx;

	}
</style>
