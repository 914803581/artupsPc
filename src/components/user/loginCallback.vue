<template>
	<!-- 跟节点 -->
	<div id="">
		登录
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
//		beforeRouteEnter(to,from,next){//路由钩子函数
//			console.log(to)
//			console.log(from)
//			next()
//		},
		components:{ //引入组件
	     
	   	},
		 methods: { //执行的方法函数
		 	
		 },
		 created(){//只执行一次
			//存入id和用户名
		 	localStorage.setItem("userDbId",this.$route.query.userDbId);
		 	localStorage.setItem("userName",this.$route.query.userName);	
			this.$router.push({path:"/"})
		 },
		 mounted(){//全部渲染完毕
		 	
			
		 }
	}
</script>

<style>
</style>