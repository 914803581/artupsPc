<template>
	<div id="frame">
		<nav-hander></nav-hander>
		<add-edit :productData="productData"></add-edit>
	</div>
</template>

<script>
	import oddPrictureEdit from '@/components/component/oddPrictureEdit/oddPrictureEdit.vue'
	import navHander from '../header/header.vue'
 	import Api from '../../api.js'
	
	export default {
	    data () {
	      return {
	      	productData:{//传给插件的编辑数据
				type : '海报',
				size : this.$route.query.size,
				price : this.$route.query.price,
				frameType : this.$route.query.frameType,
			    category : this.$route.query.category,
			    editImgUrl : Api.STATIC_SERVER_HOST+this.$route.query.editImageUrl,
			    skuCode : this.$route.query.skuCode,
			    skuId : this.$route.query.skuId,
			    sku : ''
			}

	      }	
	   	},
	    components:{ //在再这里要注入我的组件
	      'add-edit':oddPrictureEdit,
	      'nav-hander':navHander
	    },
	    methods: {
	    	/*初始化编辑框的宽高*/
    		initEditFrameSize (){
    			var size = this.$route.query.size;//框画尺寸
    			var arr = size.split('X');
    			/*设置外框的框高*/
    			$('#waikuang').css({
				width:+(Number(arr[0])+100)+'px',
				height:+(Number(arr[1])+100)+'px'
			});
    			/*设置画心的宽高*/
			$('.drapBox').css({
				width:arr[0]+'px',
				height:arr[1]+'px'
			});	
			/*设置外框*/
//			$('#waikuang').css({
//				'background':'url('+Api.STATIC_SERVER_HOST+this.$route.query.editImageUrl+')'
//			});
	    		}
	    },
	    created(){//只执行一次
	    },
	    mounted(){
	    		this.productData.sku = '海报.'+this.$route.query.size;
		    	this.productData.defDbId = 'd6e44ca4-511f-41d5-87df-d8d75a491c09';
		    	this.productData.templateCode = this.$route.query.templateCode;
		    	this.productData.editCnfName = this.$route.query.templateCode;
	    		this.initEditFrameSize();

	    }
  }
</script>
</script>

<style>
</style>