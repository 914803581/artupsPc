<template>
	<div id="frame">
		<nav-hander></nav-hander>
		<add-edit></add-edit>
	</div>
</template>

<script>
	import oddPrictureEdit from '@/components/component/oddPrictureEdit/oddPrictureEdit.vue'
	import navHander from '../header/header.vue'
	
	export default {
	    data () {
	      return {
	      	
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
		    		}
	    },
	    created(){//只执行一次
	    },
	    mounted(){
	   
			this.initEditFrameSize();
	    }
  }
</script>
</script>

<style>
</style>