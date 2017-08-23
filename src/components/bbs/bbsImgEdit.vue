<template>
	<!-- 跟节点 -->
	<div id="">
		<max-img-edit :dataTemp= "dataTemplate"></max-img-edit>
	</div>
</template>
<script>
	// import '' from ''
	 import MaxImgEdit from '../../components/component/maxImgModul/maxImgEdit.vue'
	 export default {
		data() {
			return {
				dataTemplate:{
					"productData":bbsData_template, //产品需要的数据
					'lomoData_template':lomoData_template,   //lomo卡需要的数据
					'templateImgData': [// 模版对应的图片
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc01.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc02.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc03.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc04.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc05.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc06.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc07.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc08.jpg',
				            isTrue: false
				          },
				          {
				            templateImg: 'http://image2.artup.com/resources/static/pc/images/bbs_pc01.jpg',
				            isTrue: true
				          }
				     ]
				}
			}
		},
//		beforeRouteEnter(to,from,next){//路由钩子函数
//			console.log(to)
//			console.log(from)
//			next()
//		},
		components:{ //引入组件

	      "max-img-edit":MaxImgEdit
	   	},
		 methods: { //执行的方法函数
		 	
		 },
		 created(){//只执行一次
		 	
		 },
		 mounted(){//全部渲染完毕
		 	
		 	
			
		 }
	}
</script>

<style>
</style>