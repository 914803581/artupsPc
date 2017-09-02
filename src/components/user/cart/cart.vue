<template>
	<div id="cart">
    <Loading :loadingText="'模版加载中...'" :showLoading="sLoading"></Loading>
		<nav-header></nav-header>
		<div class="p_cat ng-scope">
		<dl ng-if="!items.length==0" class="ng-scope">
		<div class="cat_hander" style="width: 1136px;">
			<i class="iconfont">&#xe603;</i> 购物车
		</div>
		<dt>
			 <div class="cat_hander">
			 	 <div class="tab01">
				  </div>
				  <div class="tab02">
				  	商品信息
				  </div>
				  <div class="tab03">
				  	单价
				  </div>
				  <div class="tab04">
				  	数量
				  </div>
				  <div class="tab05">
				  	小计
				  </div>
				  <div class="tab06">
				  	操作
				  </div>

			 </div>
		</dt>
		<dd  class="ng-scope" v-for="(itmes,indexs) in dataList">
			<div class="cat_hander">
			 	 <div class="tab01" @click="updateCheck(indexs)">
			  		<p><b><i v-if="itmes.isOK == true" class="ng-hide"></i></b>选择</p>
				  </div>
				  <div class="tab02">
				  	<div class="img_cat">
				  		<img v-bind:src="itmes.thumbnailImageUrl"alt="">
				  	</div>
				  	<div class="cp_msg">
				  		<span class="ng-binding">{{itmes.sku}} </span>
				  		<p class="ng-binding">{{itmes.createdDt}}</p>
				  	</div>
				  </div>
				  <div class="tab03">
				  	<p class="ng-binding"><b>¥</b>{{itmes.price}}<i>元</i></p>
				  </div>
				  <div class="tab04">
				  	<div class="cat_num">
				  		<a href="Javascript: void(0)" @click= "add(itmes.num,indexs)" class="cat_num_first">+</a>
				  		<b class="ng-binding">{{itmes.num}}</b>
				  		<a href="Javascript: void(0)" @click="reduce(itmes.num,indexs)" class="cat_num_last">-</a>
				  	</div>
				  </div>
				  <div class="tab05">
				  	<p class="ng-binding"><b>¥</b>{{itmes.price * itmes.num | toFixedTwo}}<i>元</i></p>
				  </div>
				  <div class="tab06">
				  	<b @click="deleteCar(indexs,itmes.dbId)"></b>
				  </div>
			</div>
		</dd>


		</dl>
		<ol class="pay_cat ng-scope" ng-if="!items.length==0">
			<li class="cat_pay01">
				<p @click="checkAll()"><b><i v-if="checkAllBtn == true" class="ng-hide"></i></b>全选</p>
			</li>
			<li @click="allDelect()" class="cat_pay02">
				全部删除
			</li>
			<li class="cat_pay03">
				已选商品 <i class="ng-binding">{{productNum}}</i> 件合计（不含运费）：¥<b class="ng-binding">{{allPic}}</b>
				<a @click="gotoPayOrder()" >结算</a>
			</li>
			<li></li>
		</ol>
	</div>

	<Footers></Footers>
</div>

</template>

<script>
	import Api from '@/api.js'
	import { MessageBox } from 'element-ui';
	import Hander from '../../header/header.vue'
		export default{
			data(){
//			  loading 的字段
				return{
					dataList:[],
					allPic:'',
					checkAllBtn:false,
					productNum: 0
				}
			},
			components:{ //在再这里要注入我的组件
		      'nav-header':Hander
		    },
			methods:{//单条记录删除
				deleteCar(index,dbId){
					 this.$confirm('您确定要删除此条订单吗?', '购物车', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
                  customClass:'artup_MessageBox',
				          type: 'warning'
				        }).then(() => {
				        var userDbId = '2221214';
						Api.car.deleteCarCorde({dbId:dbId,userDbId:userDbId}).then(res=>{
							if(res.data.code == 'success'){
								if(this.dataList.length < 1){
									//购物车为空
								}
								this.dataList.splice(index,1)
								this.$message({
						            type: 'success',
                        iconClass:"atrup_Message",
						            message: '删除成功!'
						          });
							}
						},err=>{
							Toast('请求错误');
						})

				        }).catch(() => {
				          this.$message({
				            type: 'info',
                    iconClass:"atrup_Message",
				            message: '已取消删除'
				          });
				        });

				},//多选删除
				allDelect(){
					var arr = '';
					for (var i = 0; i < this.dataList.length; i++) {
						if (this.dataList[i].isOK) {
							arr+= this.dataList[i].dbId+',';
							//this.dataList.splice(i,1);
							// i--;
						}
					}
					if(arr.length < 1){
						this.$alert('请选择要删除的内容', '删除', {
				          confirmButtonText: '确定',
				          callback: action => {
				          }
				        });
					}else{
					   this.$confirm('您确定要删除吗?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				        	for (var i = 0; i < this.dataList.length; i++) {
							if (this.dataList[i].isOK) {
								 this.dataList.splice(i,1);
								 i--;
							}
						}
				        var userDbId = '2221214';
						Api.car.deleteCarCorde({dbId:arr,userDbId:userDbId}).then(res=>{
							if(res.data.code == 'success'){
								if(this.dataList.length < 1){
									//购物车为空
								}
								this.$message({
                        iconClass:"atrup_Message",
						            type: 'success',
						            message: '删除成功!'
						          });
							}
						},err=>{
							Toast('请求错误');
						})

				        }).catch(() => {
				          this.$message({
                    iconClass:"atrup_Message",
				            type: 'info',
				            message: '已取消删除'
				          });
				        });
					}

				},
				/*添加数量*/
				add(num,index){
					++this.dataList[index].num;
					this.oPrice();

				},
				/*减少数量*/
				reduce(num,index){
					if( num > 1){
						--this.dataList[index].num;
						this.oPrice();
					}
				},
				oPrice(){//计算价格
					var arr = 0;
					var arrNum = 0;
					for (var i = 0; i < this.dataList.length; i++) {
						if (this.dataList[i].isOK) {
							arr+=this.dataList[i].price * this.dataList[i].num;
							arrNum += this.dataList[i].num
						}
					}
					this.allPic = arr.toFixed(2);
					this.productNum = arrNum.toFixed(0)
				},
				/*设置选中状态*/
				updateCheck(index){
					this.dataList[index].isOK = !this.dataList[index].isOK;
					var arr = [];
					for (var i = 0; i < this.dataList.length; i++) {
						if (this.dataList[i].isOK == true) {
							arr.push(this.dataList[i]);
						}
					}
					if(this.dataList.length == arr.length){
						this.checkAllBtn = true;
					}else{
						this.checkAllBtn = false;
					}
					this.oPrice();
				},
				/*全选*/
				checkAll(){
					this.checkAllBtn  = !this.checkAllBtn;
					if(this.checkAllBtn == true){
						this.dataList.forEach(function(el,n){
							el.isOK = true;
						})
					}else{
						this.dataList.forEach(function(el,n){
							el.isOK = false;
						})
					}
					this.oPrice();

				},
				/*跳转到结算页面*/
				gotoPayOrder(){
					var cars = [];
					var carsArry = [];
					var switchBool = false;
					this.dataList.forEach(function(el,n){
						if(el.isOK){
							var carJson = {
								dbId : el.dbId,
								price : el.price,
								num : el.num
							};

							carsArry.push(carJson);
							cars.push(el.dbId);
							switchBool = true;
						}
					})
					if(cars.length < 1){
						this.$message({iconClass:"atrup_Message",message: '请选择结算产品!' });
					}

					if(switchBool == true){
						sessionStorage.setItem('cars', cars.join(','));

						var jsons = {
							//userDbId:localStorage.getItem("userDbId"),
							userDbId:'2221214',
							cars: JSON.stringify(carsArry)
						}
						Api.car.submitCars(jsons).then(res=>{
							if(res.data.code == 'success'){

								location.href="/order/confim";
							} else{
								this.$message({iconClass:"atrup_Message",message: '请求错误!' });

							}
						},err=>{
							this.$message({iconClass:"atrup_Message",

                message: '请求错误!' });
						})

					}else{
						return
					}
				}
			},
			mounted(){
			  var vm = this;
        setTimeout(function () {
          vm.sLoading= false
          console.log(vm.sLoading)
        },4000)

				var jsons = {
	  			//userDbId:localStorage.getItem("userDbId"),
	  			userDbId:'2221214',
	  			status:1,
	  			pageNum:0,
	  			pageSize:15,
	  			sort:"createdDt",
	  			order:'desc',
	  			carDbId:this.$route.query.carDbId
			}
			//alert(localStorage.getItem("userDbId"));
			Api.car.carList(jsons).then(res=>{

				this.dataList = res.data.results;

//				if(this.dataList.length < 1){
//					MessageBox.alert('购物车为空，请去首页添加购买的产品').then(action => {
//      				location.href=""
//					});
//				}
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].isOK = false;
				}
				console.log(this.dataList)

				this.oPrice();
			},err=>{
				Toast('数据请求错误');
			})
			}

		}

</script>

<style>
</style>
