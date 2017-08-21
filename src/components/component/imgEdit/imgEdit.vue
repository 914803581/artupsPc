<template>
	<div v-show="imgEdit" id="model">
		<div class="model">
			<div class="upload_box">
				<div class="upload_title">
					<span class="icons return_span"><i  class="iconfont">&#xe601;</i>撤销</span>
					<p>图片编辑</p>
					<div @click="closeModel" class="close icons">
						保存<i class=" iconfont">&#xe639;</i>
					</div>					
				</div>
				 <div id="editImg" ondragstart='return false;'>
				    		<!--dpi校验-->
				    		<!--<div  class="reportNav">		
								！图片像素不足，会导致打印模糊，建议更换图片
						</div>-->			
				        <div id="dropBox"  class="resumable-drop">
				        </div>
				        <div id="image-cropper">
				            <div class="cropit-preview" ></div>
				            <!--大小大滑拉杆儿-->
				            <div class="div_range">
				                <b>缩放</b><input type="range" class="cropit-image-zoom-input">
				                <!--<b>大</b>-->
				            </div>
				        </div>
				    </div>
				<div class="rotate_img">
					<div class="rotate_left_90">		
						<div @click="rotateCcw" class="rotate-ccw">
							<i class="iconfont">&#xe60f;</i>
							<span>逆时针</span>
						</div>
					</div>
					<!--<div class="rotate_left_90">		
						<div @click="checkImg" class="rotate-ccw">
							<i class="iconfont">&#xe60f;</i>
							<span>切换图片</span>
						</div>
					</div>-->
					<div class="rotate_right_90">		
						<div @click="rotateCw" class="rotate-cw">
							<i class="iconfont">&#xe60e;</i>
							<span>顺时针</span>
						</div>
					</div>
				</div>
			</div>
			<!--拖动框-->
			<div id="div_drap"  style="display: none;background: #fff;position: absolute;top: 0;width: 200px;height: 400px;border: 1px solid red;line-height: 400px;text-align: center;">
				我是可以拖拽的内容
			</div>
		</div>
	</div>
</template>

<script>
	let rotationalp = 90,  //旋转度数
        reg = 0, //旋转初始角度
        angu = 0,
        imageCropper //图片编辑器对象

	export default{
		name:'img-edit',
		data () {
		    return {
		      imgEdit: false
		    }
		  },
		 props:["isImgEdit","dataEditJson"],
	    methods:{
//		    	checkImg(){
//		    		imageCropper.cropit('imageSrc', "http://192.168.127.60:8080/vueM/pcArtups/dist/index.html?__hbt=1500891862952#/bbsEdit");
//		    	},
			closeModel(){
				//回传给父级的数据
				var postData = {}
				postData.imgData = imageCropper.cropit('export');
				postData.postData = build();
				postData.postData.cropit = true; //每次都需要编辑
				postData.postData.thumbnailScale = this.dataEditJson.oActions.thumbnailScale
				//获取返回的数据
				this.imgEdit = false;
				this.$emit("postDataImg",postData)
				imageCropper.cropit('imageSrc', "");	
			},
			openModel(){
				var vm = this;
				this.imgEdit = true;
//				&& 
				if(this.dataEditJson){
					console.log(this.dataEditJson)
				   //修改图片src
				  imageCropper.cropit('imageSrc', this.dataEditJson.oSrc);				
				 //修改图片框大小
				  if (this.dataEditJson.oW && this.dataEditJson.oH) {  //重新换算宽度比之后
//                    imageCropper.cropit('previewSize', { width: this.dataEditJson.oW, height: dataEditJson.oH})                 		
                      imageCropper.cropit('previewSize', { width: this.dataEditJson.oW*300/this.dataEditJson.oH, height: 300 })                 		
				  }
				  
				}				 
			},
			rotateCw(){
				angu = reg += rotationalp;
				if (angu == 360) {
					angu = 0;
					reg = 0;
				}
				imageCropper.cropit('rotateCW');
			},
			rotateCcw(){
				$('#image-cropper').cropit('rotateCCW');
				angu = reg -= rotationalp;
				if (angu == -360) {
					angu = 0;
					reg = 0;
				}
			}
	    },
	    watch:{
	    		isImgEdit:"openModel"
	    },
	    mounted(){
	    	var vm = this;
	    	   this.imgEdit = this.isImgEdit;
	    	  
	    	   //让框具有拖动的功能
//		  setTimeout(()=>{
//		  	 $(".model").each(function(){
//		   		console.log($(this))
//				$(this).find("#div_drap").dragging({
//					move : 'both',
//					randomPosition : false
//				});
//			});
//		  },300)
//        setTimeout(()=>{
          	 imageCropper = $('#image-cropper').cropit({
	           freeMove: false,
                exportZoom: 1,
                imageBackground: true,
                imageBackgroundBorderWidth: 0,
                width: 200,
                height: 300,
                onImageLoaded:function(){
              		console.log('图加班..')
                		if(vm.dataEditJson.oActions&&JSON.stringify(vm.dataEditJson.oActions)!="{}" &&vm.dataEditJson.oActions.init=="false"){
						var jsonActions = vm.dataEditJson.oActions;
						console.log(jsonActions)
						
						//设置图像的加载缩放
						imageCropper.cropit('zoom', jsonActions.scale);
						//旋转角度
						for (var i = 0; i < (jsonActions.rotate/90); i++) {
							imageCropper.cropit("rotateCW");
						}
						//再次编辑的位置
						imageCropper.cropit('offset', {
	                        x: -jsonActions.x* jsonActions.scale,
	                        y: -jsonActions.y* jsonActions.scale
	                    });
//						
				  }               		
                }
//		          imageState: {
//		            src: 'http://scottcheng.github.io/cropit/images/2-960.jpg',
//		          },
        		});
//        },100)
	    	   //$('#image-cropper').cropit('previewSize', { width: oWidth, height: oHeight });
//		 $('#image-cropper').cropit('imageSrc', "http://www.jqueryscript.net/images/Simple-jQuery-Image-Zoom-Pan-Crop-Plugin-Cropit.jpg");
		}
	}
</script>

<style>
    #editImg {

        position: relative;
        /*margin-top: 150px;*/
    }
	#editImg .reportNav{
		text-align: center;
		line-height: 40px;
		color: red;
		font-size: 0.6rem;
		background: rgba(0,0,0,0.3);
	    position: absolute;
	    top: -110px;
	    width: 100%;
		display: none;
	}
    .cropit-preview {
        background-color: #f8f8f8;
        background-size: cover;
        border: 2px solid #ccc;
        border-radius: 3px;
    }

    .cropit-preview-image-container {
        cursor: move;
    }

    .cropit-preview-background {
        opacity: .2 !important;
        cursor: auto;
    }

    .image-size-label {
        margin-top: 10px;
    }

    input, .export {
        /* Use relative position to prevent from being covered by image background */
        position: relative;
        z-index: 10;
        display: block;
    }

    button {
        margin-top: 10px;
    }

    input[type="range"] {
        -webkit-box-shadow: 0 1px 0 0px #666, 0 1px 0 #666 inset, 0px 2px 10px 0px #666 inset, 1px 0px 2px rgba(102, 102, 102, 0.4) inset, 0 0px 1px rgba(102, 102, 102, 0.6) inset;
        /*margin-top: 2px;*/
        background-color: #666;
        border-radius: 2px;
        -webkit-appearance: none;
        height: 3px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        cursor: default;
        top: -2px;
        height: 20px;
        width: 20px;
        /*transform: translateY(-1px);*/
        background: none repeat scroll 0 0 #ccc;
        border-radius: 10px;
        -webkit-box-shadow: 0 -1px 1px black inset;
    }

    #image-cropper {
        height:416px;
        overflow: hidden;
        position: relative;
    }
	/*#image-cropper >div:first-child{
		margin-top: 30px;
	}*/
    #image-cropper .div_range {
        height:30px;
        line-height: 30px;
        position: absolute;
        left: 20%;
        bottom:4%;
    }
	/*@-moz-document url-prefix() {   
		 #image-cropper .div_range {bottom:-84%; }
	}*/
    #image-cropper .div_range > b {
        display: inline-block;
        font-size: 12px;
        color: #3d3d3d;
        font-weight: 400;
        position: relative;
        top: 4px;
        left: -30px;
    }

    #image-cropper .div_range > input {
        display: inline-block;
        width: 400px;
    }

    #image-cropper .cropit-preview {
        display: block;
        margin: 40px auto;
    }

</style>