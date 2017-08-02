<template>
	<div id="footers">
		<div class="ftnav">
			<div class="ftnaver m">
				<ul class="oul m">
					<li><a href="javascript:void(0);">关于我们</a></li>
					<li><a href="javascript:void(0);">帮助中心</a></li>
					<li><a href="javascript:void(0);">商务合作</a></li>
					<li><a href="javascript:void(0);">服务条款</a></li>
					<li style="margin-right: 0;"><a href="javascript:void(0);">站点地图</a></li>
				</ul>
			</div>
		</div>	
		<div class="foot">
			<div class="footer m">
				<ul class="aul">
					<li><a href="javascript:void(0);">Copyright ©2002-2016 www.artup.com. All rights reserved. - </a></li>
					<li><a href="javascript:void(0);">京ICP备13034505号-1 </a></li>
					<li style="margin-right:0;"><a href="javascript:void(0);">京公网安备11011302000949</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
		    return {
		      msg: ''
		    }
		  },
	    methods:{
			
	    },
	    mounted(){
	    	   
		}
	}
</script>

<style lang="less">
	#footers{
		.ftnav{height: 64px;background: #e5e5e5;clear: both;}
		.ftnaver{height: 64px;width: 1152px;background: #e5e5e5;}
		.oul{width: 590px;height: 64px;}
		.oul li{margin-right: 65px;font-size: 16px;font-family: "å¾®è½¯é›…é»‘";float: left;line-height: 64px;}
		.oul li a{color:#2d2d2d;}
		
		.foot{height: 68px;background: #333333;clear: both;}
		.footer{height: 68px;width: 1000px;background: #333333;}
		
		.aul{height: 68px;}
		.aul li{margin-right: 68px;font-size: 16px;font-family: "å¾®è½¯é›…é»‘";float: left;line-height: 64px;display: inline-block;text-align: center;}
		.aul li a{color:#a6a6a6;}
	}	
</style>