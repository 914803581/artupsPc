<template>
	<!-- 跟节点 -->
	<div id="">
		<max-img-edit :dataTemp="dataTemplate"></max-img-edit>
	</div>
</template>
<script>
	// import '' from ''
	import MaxImgEdit from '../../components/component/maxImgModul/maxImgEdit.vue'
	export default {
		data() {
			return {
				dataTemplate: {
					"productData": [], //产品需要的数据
					'lomoData_template': [], //lomo卡需要的数据
					'templateImgData': [],// 模版对应的图片
					'templateSource':[] //切换的板式源(定义最开始版式的数组)
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
			setBanshi(size){
				let obj = {
					hcTemplate255X355:hcTemplate255X355,
					hcTemplate355X255:hcTemplate355X255,
					hcTemplate360X510:hcTemplate360X510
				}
				var hcTemplate = obj['hcTemplate'+size];
				console.log(hcTemplate)
				var dataP = {};
				dataP.productData = [
						[{
              "template": hcTemplate.bbs1,
							"only": false,
							"firstPage": true, //第一页必须有的属性
							"lastPage": false,
              "type":"bbs1"
						}],
						[{
								"template": hcTemplate.bbs2,
								"only": false,
								"firstPage": false,
								"lastPage": false,
              "type":"bbs2"
							},
							{
								"template": hcTemplate.bbs3,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs3"
							}
						],
						[{
								"template": hcTemplate.bbs4,
								"only": false,
								"firstPage": false,
								"lastPage": false,
              "type":"bbs4"
							},
							{
								"template": hcTemplate.bbs5,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs5"
							}
						],
						[{
								"template": hcTemplate.bbs6,
								"only": false,
								"firstPage": false,
								"lastPage": false,
              "type":"bbs6"
							},
							{
								"template": hcTemplate.bbs7,
								"only": false,
								"firstPage": false,
								"lastPage": false,
                "type":"bbs7"
							}
						],

						[{
							"template": hcTemplate.bbs9,
							"only": true,
							"firstPage": false,
							"lastPage": false,
              "type":"bbs9"
						}],
						[{
							"template": hcTemplate.bbs1,
							"only": false,
							"firstPage": false,
							"lastPage": true, //最后一页必须有的属性
              "type":"bbs1"
						}]
					]
				dataP.templateImgData =
          [{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_01.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_02.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_03.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_04.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_05.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_06.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_07.jpg',
							isTrue: false
						},
						{
							templateImg: 'http://image2.artup.com/resources/static/pc/images/pc_huace_template/hc_template_255_355_09.jpg',
							isTrue: true
						}]
				return	dataP;
			  }
		},
		created() { //只执行一次

		},
		mounted() { //全部渲染完毕

			var SlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
			console.log(SlsectDate.size)
			if (SlsectDate.size=="255X355") {
				this.dataTemplate.templateSource = hcTemplate255X355
			}
      if(SlsectDate.size=="360X510"){
        this.dataTemplate.templateSource = hcTemplate360X510;
      }
			var str = "风景方版";

			if (str =="风景方版") { //SlsectDate.size==""
				 this.dataTemplate.productData = this.setBanshi(SlsectDate.size).productData;
				 this.dataTemplate.templateImgData = this.setBanshi(SlsectDate.size).templateImgData;
			}
		}
	}
</script>

<style>

</style>
