<template>
	<div style="margin: 40px auto;" id="demo">
		<h3>简单的假发计算器</h3>
		<div>
			<button @click="delect">-</button>
			<span>{{num}}</span>
			<button @click="add">+</button>
			<button @click="snsyAdd">点这个触发异步的状态</button>
			
			<p>getter获取的数据{{num2}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		computed:{ //计算属性
			num(){
				return this.$store.state.count
			},
			num2(){
				return this.$store.getters.filterCount
			}
		},
		methods:{
			add(){ //改变状态的时候需要提交1个方法，后面可以传递一个对象
				this.$store.commit("addIncrement",{
					n:5
				})
			},
			delect(){
				//页可以有第2种方式传递,传递一个对象type对应方法名，对象传递
				this.$store.commit({
					type:"deIncrement",
					de:10
				})
				
			},
			snsyAdd(){//异步的状态 不能使用commit提交了
				//提交到actions处理  actions是vuex 处理异步的函数,所有的异步操作都是在这里面处理的，
				//但是他仅仅只是处理异步处理完毕之后也是需要像mutations commit方法让mutations去改变状态的
				this.$store.dispatch("addAction")
			}
		}
	}
</script>

<style>
</style>