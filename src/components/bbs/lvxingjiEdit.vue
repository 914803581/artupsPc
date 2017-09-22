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
					'templateSource':travelTemplateData,
					"productData": [
            [{
              "template": travelTemplateData.bbs0,
              "only": false,
              "firstPage": false,
              "lastPage": true, //最后一页必须有的属性
              "type":"bbs0"
            }],
						[{
							"template": travelTemplateData.bbs1,
							"only": false,
							"firstPage": true, //第一页必须有的属性
							"lastPage": false,
              "type":"bbs1"
						}],
            [{
              "template": travelTemplateData.bbs4,
              "only": false,
              "firstPage": false,
              "lastPage": false,
              "type":"bbs4"
            },
              {
                "template": travelTemplateData.bbs4,
                "only": false,
                "firstPage": false,
                "lastPage": false,
                "type":"bbs4"
              }
            ],
            [{
              "template": travelTemplateData.bbs2,
              "only": false,
              "firstPage": false,
              "lastPage": false,
              "type":"bbs2"
            },
              {
                "template": travelTemplateData.bbs2,
                "only": false,
                "firstPage": false,
                "lastPage": false,
                "type":"bbs2"
              }
            ],
						[{
								"template": travelTemplateData.bbs6,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs6"
							},
							{
								"template": travelTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							}
						],[{
								"template": travelTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							},
							{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],[{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							},
							{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],[{
								"template": travelTemplateData.bbs7,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs7"
							},
							{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],
						[{
								"template": travelTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							},
							{
								"template": travelTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							}
						],[{
								"template": travelTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							},
							{
								"template": travelTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							}
						],[{
								"template": travelTemplateData.bbs6,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs6"
							},
							{
								"template": travelTemplateData.bbs6,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs6"
							}
						],[{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							},
							{
								"template": travelTemplateData.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],[{
								"template": travelTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							},
							{
								"template": travelTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							}
						],[{
								"template": travelTemplateData.bbs7,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs7"
							},
							{
								"template": travelTemplateData.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs2"
							}
						],[{
								"template": travelTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							},
							{
								"template": travelTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							}
						],[{
								"template": travelTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							},
							{
								"template": travelTemplateData.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs4"
							}
						],[{
								"template": travelTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							},
							{
								"template": travelTemplateData.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							}
						],
            [{
              "template": travelTemplateData.bbs4,
              "only": false,
              "firstPage": false,
              "lastPage": false,
              "type":"bbs4"
            },
              {
                "template": travelTemplateData.bbs100,
                "only": false,
                "firstPage": false,
                "lastPage": false,
                "type":"bbs100"
              }
            ]
//						[{
//							"template": travelTemplateData.bbs100,
//							"only": false,
//							"firstPage": false,
//							"lastPage": true, //最后一页必须有的属性
//              "type":"bbs5"
//						}]
					], //产品需要的数据
					'lomoData_template': [], //lomo卡需要的数据
					'templateImgData': [ // 模版对应的图片
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj01.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj02.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj03.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj04.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj05.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj06.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_lxj_template/template_lxj07.jpg',
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
