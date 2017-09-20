<template>
	<div v-show="isEditTexts" id="model">
		<div class="model">
			<div style="height: 400px;" class="upload_box">
				<div class="upload_title">
					<span style="margin-left: 54px;" class="color_span">文字编辑</span>
					<!--<i  @click="closeModels"  class="close iconfont">&#xe746;</i>-->
				</div>
				<!--文字输入框-->
				<textarea @keydown="keyupShow($event)" class="textBox" v-model="$store.state.bbs.textData" :maxlength="textNumbers" :placeholder="placeholder">

				</textarea>
				<div class="btn_box">
					<el-button  @click.native="closeModels">取消输入</el-button>
					<el-button @click.native="okModels" type="danger">确认输入</el-button>
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
          placeholder:'',
		      isEditTexts: false,
          textNumbers:'40'
//		      textData:''
		    }
		  },
		 props:["isEditText","textNumber"],
	     methods:{
         keyupShow($event){
           if($event.keyCode==13){
              $event.preventDefault();
           }
         },
			closeModels(){
				this.isEditTexts = false
			},
			openModel(){
				this.isEditTexts = true;
        this.textNumbers = this.textNumber
        this.placeholder = '限制输入（' + this.textNumbers + '字）';
			},
			okModels(){ //确认输入
				console.log(this.$store.state.bbs.textData)
				this.isEditTexts = false;
//        $(".editText_one").find(".text_span").text(this.$store.state.bbs.textData)
        $(".editText_one").text(this.$store.state.bbs.textData)
				var oPage = $(".editText_one").parents(".pubilc_div").find(".page .pageleft span").eq(0).text();

				var oTextsort =$(".editText_one").attr("textsort")
				var oTypestyle =$(".editText_one").attr("typestyle")
				//提交vuex去做数据组装
				this.$store.commit("setTextHashMap",{
					txt:this.$store.state.bbs.textData,
					page:oPage,
					textsort:oTextsort,
					typestyle:oTypestyle
				})
			}
	    },
	    watch:{
	    		isEditText:"openModel"
	    },
	    mounted(){
	    	   this.isEditTexts = this.isEditText;
            this.textNumbers = this.textNum
		}
	}
</script>

<style>
</style>
