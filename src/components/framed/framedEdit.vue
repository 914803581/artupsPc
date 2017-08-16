<template>
	<div id="frame">
		<nav-hander></nav-hander>
		<add-edit></add-edit>
	</div>
</template>

<script>
	import oddPrictureEdit from '@/components/component/oddPrictureEdit/oddPrictureEdit.vue'
	import navHander from '../../components/component/hander/hander.vue'
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
	    
	    },
	    created(){//只执行一次
	    },
	    mounted(){
	
	    }
  }
</script>
</script>

<style>
</style>