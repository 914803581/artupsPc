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
			productData:{},//传给插件的编辑数据
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
//				'background':'url('+Api.STATIC_SERVER_HOST+this.$route.query.previewImageUrl+')'
//			})；
	    		}
	    },
	    created(){//只执行一次
	    },
	    mounted(){
	    		this.productData.type = '框画';
	    		this.productData.size = this.$route.query.size;
	    		this.productData.price = this.$route.query.price;
	    		this.productData.frameType = this.$route.query.frameType;
			this.productData.category = this.$route.query.category;
			this.initEditFrameSize();
	    }
  }
</script>
</script>

<style>
</style>