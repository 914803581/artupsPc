<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{
  		
  	}
  },
  created(){ 
   	//编译之前 有vue的生命周期
   	//复用这个组件，这个函数不会在被调用了,只会被调用一次
    	
   },
   methods:{
// 	back(){
// 		this.$router.back()
// 	},
// 	goBack(){
// 		this.$router.forward()
// 	},
// 	goHerf(){
// 		this.$router.go(-2)
// 	},
// 	pushHerf(){
//// 		this.$router.push('/about')
// 		this.$router.push({path:"/about",query:{a:'22'}})
// 	}
   }
}
</script>

<style type="text/css" lang="less">
@import './assets/less/style';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}
</style>
