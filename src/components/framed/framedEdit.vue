<template>
	<div id="frame">
		<add-edit></add-edit>
	</div>
</template>

<script>
	import oddPrictureEdit from '@/components/oddPrictureEdit/oddPrictureEdit.vue'
	export default {
	    data () {
	      return {
	      	
	      }	
	   	},
	    components:{ //在再这里要注入我的组件
	      'add-edit':oddPrictureEdit
	     
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