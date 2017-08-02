<template>
	<div v-show="isShowModels" id="model">
		<div  class="model">
			<div  v-loading="isShowModels" element-loading-text="素材库加载中..." style="position: absolute !important;" class="upload_box">
				<div  class="upload_title">
					<!--<span class="color_span">本地</span> |-->
					<span class="color_span">&nbsp;素材库</span>
					<i  @click="closeModel" class="close closes iconfont">&#xe746;</i>
				</div>
				<!--素材库图片-->
				<div class="upload_inbox">					
					<div style="border: 2px solid #ccc;" id="fileLoad" class="imagebox">
						<i class="iconfont">&#xe60b;</i>
					</div>
					<div @click="selectImg(index)" :class="item.isTrue ?'imagebox img_size_border':'imagebox'  " v-for="(item,index) in $store.state.bbs.material">
						<img :src="item.thumbnailUrl"    alt="" />
					</div>
				</div>
				<el-button style="position: relative;left: -45%;" @click.native="slectFile" type="danger">上传图片</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Loading } from 'element-ui';
	 import Api from '../../../API.js'
	export default{
		name:'div-model',
		data () {
		    return {
		      isShowModels: false
		    }
		  },
		props:["isShowModel"],
	    methods:{
			closeModel(){
				this.isShowModels = false;
			},
			openModel(){
				this.isShowModels = true;
				//给vuex提交一个异步请求
				this.$store.dispatch("getMaterial");
//				Loading.service({
////					target:document.querySelector(".upload_box"),
//					"text":'我的'
//				})

			},
			slectFile(){ //选择上传之后选择的图片
				//过滤选中的图片，形成一个图片缓存
				this.$store.commit("slectFile");
				//关闭弹窗
				this.closeModel();
				//抬起下面的拖动框
				this.$emit("footerBurl",true)
				setTimeout(()=>{//延迟去执行此方法避免和vuex内部执行顺利冲突
					this.$store.commit("drapDiv")					
				},200)
			},
			selectImg(index){
				this.$store.state.bbs.material[index].isTrue = !this.$store.state.bbs.material[index].isTrue;
				this.$forceUpdate();
			}
	    },
	    created(){
	   	 	
	    },
	    watch:{
	    		isShowModel:"openModel"
	    },
	    mounted(){
	    	   let vm = this;
	    	   this.isShowModels = this.isShowModel;	
			
			//后端上传需要的数据
			var extraPostData = {};

	    	   //上传的逻辑
	    	   /* 文件上传init URL */
            var uploadUrl = Api.UPLOAD_URL+'&category=baobaoshu';

            uploadInitializer($, uploadUrl, onUploadComplete);
            // //文件上传事件
            function onUploadComplete($, r){				
                var browBtn = $("#fileLoad");
            		console.log(browBtn.size())               
                r.assignBrowse(browBtn, false);
                r.on('filesAdded', function(array) {
                
                    if(array.length > 1){
                        $.each(array, function(idx, file) { 
                            file.chunks = [];
                        });
                        alert('只能上传一张图片');
                        return;

                    }
                    var ok = validateUploadFiles($, array); 
                    if (ok) {
                        //触发uploadStart
                        r.upload();} 
                        else {
                            r.cancel();
                        }
                });
                //开始上传
                r.on('uploadStart', function(){
                    //组装后端需要的数据
//                  console.log(vm.extraPostData)
                    extraPostData  = {
	                    	"userDbId" : '2221214',
	                    "category" : 'baobaoshu', 
	                    "format" : 'json',
	                    "thumbnailWidth":"200",
	                    "client":"pc"
                    }
					
					console.log('开始上传')
                    r.opts.query = extraPostData;
                    //打开进度框
                });
                //上传中
                r.on('progress', function (e) {
                    var progress = Number(r.progress());
                    var progressWidth = progress.toFixed(2)*100;
                    //进度条显示
					console.log('进度条'+progressWidth)
                  
                });
              	r.on('error',function(){
                		
                		 alert('网络错误，上传失败');
                });
              
                //上传成功
                r.on('fileSuccess', function(file, message){
                    var rObj = $.parseJSON(message);
                    vm.$store.dispatch("getMaterial")
                    if(rObj.pictureDbId){ 
                        //给父级的回调
                    } else { 
                        alert('上传图片失败，请重试');
                    }
                });
	    	   
	    	   }
		}
	}
</script>

<style>
</style>