<template>
	<div id="confimOrder">
		<unify-header></unify-header>
    <!--发票-->
    <el-dialog title="发票信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="发票抬头" :label-width="formLabelWidth">
          <el-input v-model="form.invoiceTitle" ></el-input>
        </el-form-item>
        <el-form-item label="产品类型" :label-width="formLabelWidth">
          <el-input disabled="disabled" v-model="form.productCategory" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="padding: 8px 25px;" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="padding: 8px 25px;background: #bb2626;border: 1px solid #bb2626;" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

		<div class="order1 m ng-scope">
			<p class="ord1-tit">填写并核对订单信息</p>
			<div class="rod001">
				<div class="ord1m l">
					<!-- 默认地址 -->
					<div class="dizhi ng-scope" ng-show="selectAddressA" v-model="addressData">
						<div class="ord1m_1">
							<p class="l">收货人：<span class="ng-binding">{{addressData.name}}</span>电话：<span class="ng-binding">{{addressData.mobile}}</span></p>
						</div>
						<div class="ord1m_2">
							<a class="xuanze l" href="javascript:;"><span  class="xz01 ng-scope" href=""></span></a><span class="ng-binding">{{addressData.province}}{{addressData.address}}</span>
						</div>
					</div>
					<div v-show="selectAddressA"@click="MoreAddress()" style="color: #A00912;cursor:pointer;" class="ord1m_3">
						更多地址&gt;&gt;
					</div>

					<!-- 全部地址 -->
					<div v-show="!selectAddressA" style="color: #A00912;cursor:pointer;" class="ord1m_3 ng-hide">
						请选择配送地址&gt;&gt;
					</div>

					<div v-show="!selectAddressA" class="otherAddress">
						<div class="dizhi" v-for="(address,index) in addressDataList">
							<div class="ord1m_1">
								<p class="l">收货人：<span>{{address.name}}</span>电话：<span>{{address.mobile}}</span></p>
							</div>
							<div class="ord1m_2">
								<a class="xuanze l" href="javascript:;" @click="setDefaultAddress(index,address.dbId)"><span  class="xz01" v-show="address.isOK"></span></a><span>{{address.province}}{{address.address}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="ord1m2 r">
					<p class="r"><a href="/center/address/add.html?order=add"><input class="ord1m-btm" type="button" name="" id="" value="新增收货地址"></a></p>
				</div>
			</div>
		</div>

		<div class="order2 m ng-scope">
			<p class="ord2-tit">
				确认订单信息
			</p>
			<p class="ord2-nav">
				<span class="l">产品信息</span>
				<span class="r">小计</span>
				<span class="r">数量</span>
				<span class="r">单价</span>
			</p>
			<div class="ord2-main">
				<div v-for="(itmes,index) in dataList" class="div_order ng-scope">
				<div class="or2m-t m">
					<div class="or2m-t-l l">
						<div class="l img">
							<img class="l" :src="itmes.thumbnailImageUrl" >
						</div>

						<div class="l">
							<p class="p1 ng-binding">{{itmes.sku}}</p>

							<p class="p2"><span class="ng-binding">{{itmes.createdDt}}</span></p>
						</div>
					</div>

					<div class="or2m-t-1 l">
						<!--
						{{product.Attribute |splitBorber}}
						-->
					</div>

					<div class="or2m-t-2 ritdh l">
						<span class="s1"><i class="iconfont">&#xe6e2;</i></span>
						<span class="s2 ng-binding">{{itmes.price}}</span>
						<span class="s1">元</span>
					</div>
					<div class="or2m-t-2 l">
						<span class="s1">x</span>
						<span class="s2 ng-binding">{{itmes.num}}</span>
					</div>
					<div class="or2m-t-2 redd l">
						<span class="s1"><i class="iconfont">&#xe6e2;</i></span>
						<span class="s2 ng-binding">{{itmes.price * itmes.num | toFixedTwo}}</span>
						<span class="s1">元</span>
					</div>
				</div>
				<!--隐藏的优惠卷-->
				<div class="or2m-b m" style="display: none;">

					<div class="or2bm aolectActive">
						<div ng-if="product.ProductID == items.goodsId" ng-click="setCode(productIndex,$index)" ng-repeat="items in product.result.data.couponStrategy" class="ng-scope">

						</div>
					</div>
				</div>
			</div>
			</div>
			<div class="notes m">
				<!--隐藏的优惠卷-->
				<div class="note-top">
					<p class="ntl l">备&nbsp;&nbsp;注&nbsp;&nbsp;<span>(提示：请勿填写有关支付、收货、发票方面的信息)</span></p>
					<p class="ntr r" style="display: none;">
					<input class="ntrtxt ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="exchangeCouponCode" name="" id="exchangeCouponCode" value="" placeholder="请输入优惠码"><input class="ntrbtn" type="button" name="" ng-click="exchangeCode()" id="" value="兑换"></p>
					<!-- <span>{{exchangeCouponCode}}</span>	 -->
				</div>
				<input v-model="form.mark" class="nthbz ng-pristine ng-untouched ng-valid ng-empty" type="" name="" id="" value="" placeholder="添加订单备注，限50个字">
			</div>
			<div class="bill m">
				<span class="billl l">发票信息: {{form.invoiceTitle}}</span>
				<p class="billr r"><span>普通发票 （纸质）</span><span>个 人</span><span>明细</span>
				<a @click="dialogFormVisible=true" href="javascript:void(0)">修改</a><span>&gt;</span></p>
			</div>
			<div class="pay m">
				<div class="pay-tit">
					支付方式
				</div>
				<div class="pay-cont">
					<a :class="{'active_pay':payType==1}" class="a1 l " @click="pay_wx()" >
						<div>
						</div>
						<p>微信支付</p>
					</a>
					<a :class="{'active_pay':payType==2}" class="a2 l" @click="pay_zfb()" >
						<div>
						</div>
						<p>支付宝支付</p>
					</a>
				</div>
			</div>
			<div class="detail m">
				<div class="dtl01 r">
					<p class=""><span id="oNUmber" class="redd ng-binding">{{goodsSize}}</span>件商品，商品总金额：<i class="iconfont">&#xe6e2;</i><span id="oPrice" class="ng-binding">{{allPrice | toFixedTwo}}</span></p>
					<p style="display: none;" class="">
					享受优惠：使用优惠劵抵现 <span id="couponPrefeAmount" class="ng-binding">0.00</span> 元，<span ng-show="!manYuan==0" class="">订单总价满<span id="manYuan" class="ng-binding">0</span>元减<span id="prefePrice" class="ng-binding">0</span>元</span>

					</p>
					<p class="" style="display: none;">合计优惠金额：-<i class="iconfont">&#xe6e2;</i><span id="totalPrefeAmount" class="ng-binding">0.00元</span></p>
					<p class=""><span class="bul">中通快递</span>&nbsp;&nbsp;运费：<i class="iconfont">&#xe6e2;</i><span>0.00</span></p>
				</div>
			</div>
			<div class="detail m" style="clear: both;">
				<div class="money r">
					<p class="l">应付金额：<span><i class="iconfont">&#xe6e2;</i></span><span id="goodsPayAmount" class="ng-binding">{{allPrice | toFixedTwo}}元</span></p>
				</div>
			</div>
			<div class="detail m mt2">
				<div class="btnaa r">
					<p class="l">
					<a class="btna1" href="/user/cart">返回购物车</a> <input class="btnbtn" @click="placeOrder()" type="button" id="" value="提交订单"></p>
				</div>
			</div>
			<div class="detail m">
				<div class="defd r" style="padding-bottom: 100px;">
					<p class="l">寄送至：<span class="ng-binding">{{addressData.province}}{{addressData.address}}</span></p>
					<p class="l">收货人：<span class="ng-binding">{{addressData.name}}</span><span class="ng-binding">{{addressData.mobile}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '@/api.js'
	import { MessageBox } from 'element-ui'
	import Header from '@/components/header/header.vue'
    export default {
        data() {
            return {
              dialogFormVisible: false,
              form: {
                invoiceTitle:"",//发票
                mark: '', //备注
                productCategory: "" //类型
              },
              formLabelWidth: '120px',
              dataList:[],
              addressData:[],
              addressDataList:[],
              addresBool :false,
              car:'',
              total:0,
              goodsSize:'',//商品数量
              allPrice:0,//总金额
              selectAddressA:true,
              payType:1
            }
        },
        components:{
        		'unify-header': Header
        },
        methods: {
        		pay_wx(){
        			this.payType = 1;
        		},
        		pay_zfb(){
        			this.payType = 2;
        		},
        		MoreAddress(){
        			if(this.addressDataList.length > 0){
        				this.selectAddressA = !this.selectAddressA;
        			}else{
        				alert('没有更多地址选择，请新添加地址')
        			}
        			return;
        		},
        		placeOrder(){
        			if(this.addresBool != true){
	        			alert('地址不能为空')
	        			return;
	        		}
        			var jsons = {
                cars:sessionStorage.getItem('cars'),
                client:Api.CLIENT,
                invoiceTitle:this.form.invoiceTitle,//发票
                mark:this.form.mark,//备注
                productCategory:this.form.productCategory, //类型
                userDbId : localStorage.getItem("userDbId"),
                addressDbId:this.addressData.dbId
              }
				Api.car.createOrder(jsons).then(res=>{
            if(res.data.code == 'success'){
                var orderDbId = res.data.orderDbId;
                var payType = 'wx';
                if(this.payType == 2){
                  payType='zfb';
                }
            location.href="/pay/payOrder?addressId="+this.addressData.dbId+"&userDbId="+localStorage.getItem("userDbId")+"&dbId="+res.data.orderDbId+"&paymentType="+payType;
        }
				},err=>{
					alert('请求错误');
				})
				//location.href="/payOrder";
        		},
        		setDefaultAddress(index,dbid){
        			this.addressDataList.forEach(itme=>{
        				itme.isOK = false
        			})
        			this.addressDataList[index].isOK = !this.addressDataList[index].isOK;
        			this.selectAddressA = !this.selectAddressA;
					var jsons = {
								userDbId:localStorage.getItem('userDbId'),
								dbId:dbid
							}
					Api.address.setDefaultAddress(jsons).then(res=>{
						 var addJsons= {
				           		userDbId:localStorage.getItem('userDbId')
				         }
						   Api.address.defaultAddress(addJsons).then(res=>{
				           		if(res.data.length > 0){
				           			console.log(this.addressData)
				           			this.addressData = res.data[0];
				           			this.addresBool = true;
				           		}
				           },err=>{
                					 alert('数据请求错误');
				           })
					},err=>{
           					 alert('数据请求错误');
					})
        		}

        },
        mounted() {
        	 this.car = sessionStorage.getItem('cars');
	        	var jsons = {
	        		dbId:this.car
	        	}
        Api.car.queryCar(jsons).then(res=>{
           	if(res.data.length > 0){
           		this.goodsSize = res.data.length;
              let type = '';
           		this.dataList = res.data;
           		for(var i = 0; i<this.dataList.length; i++){
           		  type+= this.dataList[i].sku.split(".")[0]+'+'
           			this.total += Number(this.dataList[i].total);
           			this.allPrice += Number(this.dataList[i].num * this.dataList[i].price);
           		}
              this.form.productCategory = type.substring(0,type.length-1)
           	}
           },err=>{
          alert('数据请求错误');
           })
          //默认收货地址
           var addJsons= {
           		userDbId:localStorage.getItem('userDbId')
           }
		   Api.address.defaultAddress(addJsons).then(res=>{
           		if(res.data.length > 0){
           			this.addressData = res.data[0];
           			console.log(this.addressData)
           			this.addresBool = true;
           		}
           },err=>{
         alert('数据请求错误');
           })

           //全部收货地址
           var jsons = {
            userDbId:localStorage.getItem('userDbId'),
            status:1,
            pageNum:0,
            pageSize:15,
            sort:'createdDt'
          }
			Api.address.addressList(jsons).then(res=>{
				this.addressDataList = res.data.results;
				console.log(res.data.results)
				for (var i = 0; i < this.addressDataList.length; i++) {
					if(this.addressDataList[i].mainAddr  == '是'){
						this.addressDataList[i].isOK = true;
					}else{
						this.addressDataList[i].isOK = false;
					}
				}

			},err=>{
        alert('数据请求错误');
			})
        }
    }
</script>

<style>
</style>
