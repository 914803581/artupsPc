<template>
	<div style="margin: 40px auto;" id="demo">
		<h3>简单的加发计算器</h3>
		<div>
			<button @click="delects({n:10})" >-</button>
			<span>{{count}}</span>
			<button @click="add({n:5})">+</button>
			<button @click="snsyAdd">点这个触发异步的状态</button>			
			<p>getter获取的数据{{num2}}</p>
			<p>普通的计算属性:{{abc}}</p>
		</div>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapActions,mapMutations} from "vuex"   //mapState vuex 里面state直接取值  mapGetters 在vuex getters函数里面取值
	//mapActions 简化异步提交的方法  this.$store.dispatch("xxx方法") 
	//mapMutations 简化同步的提交方法 this.$store.commit("xxx方法")
	export default {
		computed:{ //计算属性
			abc(){ //普通的属性
				return 123
			},
			...mapGetters({    //这里也可以写成下面的那种数组形式，但是这样可以修改个显示名称
				num2:"filterCount"
			}),
			...mapState(["count"]) //vuex过来的属性
		},
		methods:{
//			add(){ //改变状态的时候需要提交1个方法，后面可以传递一个对象
//				this.$store.commit("addIncrement",{
//					n:5
//				})
//			},
//			delect(){
//				//页可以有第2种方式传递,传递一个对象type对应方法名，对象传递
//				this.$store.commit({
//					type:"deIncrement",
//					n:10
//				})				
//			},
			...mapMutations( //mapMutations 同步提交简写  this.$store.commit("xxx方法") 注意如果有参数，需要到触发方法的函数里面传参
					{
					add:"addIncrement",  //多个就这样传递
					delects:"deIncrement"
					}
			),
			...mapActions( //mapActions 异步提交简写  this.$store.dispatch("addAction")
				{snsyAdd:'addAction'}
				)
//			snsyAdd(){//异步的状态 不能使用commit提交了
//				//提交到actions处理  actions是vuex 处理异步的函数,所有的异步操作都是在这里面处理的，
//				//但是他仅仅只是处理异步处理完毕之后也是需要像mutations commit方法让mutations去改变状态的
//				this.$store.dispatch("addAction")
//			}
		}
	}
</script>

<style>
</style>