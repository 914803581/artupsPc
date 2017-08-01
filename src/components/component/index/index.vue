<template>
	<div id="index">
<!--		<handerNav></handerNav>-->
		<Handers	></Handers>
		 <div class="block">
		    <el-carousel height="460px">
		      <el-carousel-item v-for="item in CarouselImgUrlList" >
		      	<img :src="item" alt="" />
		      </el-carousel-item>
		    </el-carousel>
		  </div>
		 <!--主题-->
		<div class="main">
			<div class="cont cont_jiashu">
				<p class="intro m">家族记忆，百年传承</p>
				<p class="tit m">家丶书</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>
		
			<div class="cont cont_hc">
				<p class="intro m">让您的展览永不落寞</p>
				<p class="tit m">艺术画册</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>	
			<div class="cont cont_cth">
				<p class="intro m">随时更换，永远新鲜</p>
				<p class="tit m">艺术磁贴画</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>	
			<div class="cont cont_kh">
				<p class="intro m">您专属的影像画廊</p>
				<p class="tit m">艺术框画</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>
			<div class="cont cont_hb">
				<p class="intro m">您专属的影像画廊</p>
				<p class="tit m">艺术海报</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>
			<div class="cont cont_tl">
				<p class="intro m">您专属的影像画廊</p>
				<p class="tit m">艺术台历</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>
			<div class="cont cont_gl">
				<p class="intro m">您专属的影像画廊</p>
				<p class="tit m">艺术挂历</p>
				<p class="price m"><span class="s1">起始价格</span><span class="s2">￥&nbsp;<span>499</span>&nbsp;CNY</span></p>
				<p class="come m"><input type="button" name="" id="" value="开始定制" /></p>
			</div>			
			<div class="cont cont_video">
				<p class="intro m">为专业摄影师服务二十余载，雅昌建立行业标准</p>
				<p class="tit m">匠心工艺</p>
				<p class="pvideo m">
					<input class="vbtn" type="button" name="" id="" value="" />
				</p>
				<p class="ptext m">
					雅昌艺术印刷，作为世界艺术印刷的引领者， 在与国际顶级的技术和材料供应商建立战略合作的过程中，独创了一套满足艺术印刷标准的技术和管理体系，曾先后斩获各类国际印刷大奖700多项，十次问鼎被誉为全球印刷界“奥斯卡”的美国印刷大奖，让东方的雅艺之道，成就世界之最的印艺之美。
				</p>
			</div>
		</div>
		<Footers></Footers>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				CarouselImgUrlList:['http://test.artup.com/img/index_03.jpg','http://test.artup.com/img/index_04.jpg','http://test.artup.com/img/index_05.jpg','http://test.artup.com/img/index_06.jpg','http://test.artup.com/img/index_07.jpg']

			}
		}
		
	}
</script>

<style>
</style>