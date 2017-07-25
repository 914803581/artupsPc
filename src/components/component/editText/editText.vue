<template>
	<div v-show="isEditTexts" id="model">
		<div class="model">
			<div style="height: 400px;" class="upload_box">
				<div class="upload_title">
					<span style="margin-left: 54px;" class="color_span">文字编辑</span>
					<!--<i  @click="closeModels"  class="close iconfont">&#xe746;</i>-->
				</div>
				<!--文字输入框-->
				<textarea class="textBox" maxlength="40" placeholder="输入字体应保存在40字之内">
					
				</textarea>
				<div class="btn_box">
					<el-button  @click.native="closeModels">取消输入</el-button>
					<el-button type="danger">确认输入</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'editText',
		data () {
		    return {
		      isEditTexts: false
		    }
		  },
		 props:["isEditText"],
	     methods:{
			closeModels(){
				this.isEditTexts = false
			},
			openModel(){
				this.isEditTexts = true;
			}
	    },
	    watch:{
	    		isEditText:"openModel"
	    },
	    mounted(){
	    	   this.isEditTexts = this.isEditText;
		}
	}
</script>

<style>
</style>