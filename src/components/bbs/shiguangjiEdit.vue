<template>
	<!-- 跟节点 -->
	<div id="">
		<max-img-edit :dataTemp="dataTemplate"></max-img-edit>
	</div>
</template>
<script>
	import MaxImgEdit from '../../components/component/maxImgModul/maxImgEdit.vue'
	export default {
		data() {
			return {
				dataTemplate: {
					'templateSource':shiguangjiTemplateData,
					"productData": [
						[{
							"template": shiguangjiTemplateData.bbs1,
							"only": false,
							"firstPage": true, //第一页必须有的属性
							"lastPage": false,
              "type":"bbs1"
						}],
						[{
								"template": shiguangjiTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							},
							{
								"template": shiguangjiTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							}
						],
						[{
								"template": shiguangjiTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							},
							{
								"template": shiguangjiTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],
//						[{
//							"template": bbsTemplateData.bbs9,
//							"only": true,
//							"firstPage": false,
//							"lastPage": false,
//              "type":"bbs9"
//						}],
						[{
							"template": shiguangjiTemplateData.bbs5,
							"only": false,
							"firstPage": false,
							"lastPage": true, //最后一页必须有的属性
              "type":"bbs5"
						}]
					], //产品需要的数据
					'lomoData_template': [], //lomo卡需要的数据
					'templateImgData': [ // 模版对应的图片
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_shiguangji/template_shiguangji_pc_01.jpg',
							isTrue: false
						},{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_shiguangji/template_shiguangji_pc_02.jpg',
							isTrue: false
						},{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_shiguangji/template_shiguangji_pc_03.jpg',
							isTrue: false
						},{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_shiguangji/template_shiguangji_pc_04.jpg',
							isTrue: false
						},{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_shiguangji/template_shiguangji_pc_05.jpg',
							isTrue: false
						}
//						,
//						{
//							templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc09.jpg',
//							isTrue: true
//						}
					]
				}
			}
		},
		//		beforeRouteEnter(to,from,next){//路由钩子函数
		//			console.log(to)
		//			console.log(from)
		//			next()
		//		},
		components: { //引入组件

			"max-img-edit": MaxImgEdit
		},
		methods: { //执行的方法函数

		},
		created() { //只执行一次

		},
		mounted() { //全部渲染完毕

		}
	}
</script>

<style>

</style>
