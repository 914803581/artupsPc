<template>
	<div id="bbsMsg">
		<nav-hander></nav-hander>
		宝宝书介绍页面
	</div>
</template>

<script>
	import Api from '../../api.js'
	import filter from '../../filter.js'
	import navHander from '../../components/component/hander/hander.vue'
	export default {
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				number2:''
			}
		},
		components:{  
	       navHander
	   },
		 methods: {},
		 mounted(){
		 	
		 }
	}
</script>

<style>
</style>