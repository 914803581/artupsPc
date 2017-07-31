<template>
	<div id="work">
		<div class="workR r ng-scope" ng-if="!countLength==0">
			<div class="worktit m">
				我的作品
			</div>	
			
			<div class="worktop m">
				<span class="l">作品类型</span>
				
				
				<select class="workset l ng-pristine ng-untouched ng-valid ng-not-empty" ng-model="selectModel" ng-init="selectModel = names[0].key" ng-change="queryWorks(this)">
					<option ng-repeat="x in names" value="-1" class="ng-binding ng-scope">所有类型</option><!-- end ngRepeat: x in names --><option ng-repeat="x in names" value="kuanghua" class="ng-binding ng-scope">框画</option><!-- end ngRepeat: x in names --><option ng-repeat="x in names" value="haibao" class="ng-binding ng-scope">海报</option><!-- end ngRepeat: x in names --><option ng-repeat="x in names" value="citiehua" class="ng-binding ng-scope">磁贴画</option><!-- end ngRepeat: x in names --><option ng-repeat="x in names" value="huace" class="ng-binding ng-scope">画册</option><!-- end ngRepeat: x in names -->
				</select>
				<a ng-if="manages" class="workworks r ng-scope" ng-click="manage()" href="">管理</a><!-- end ngIf: manages -->

			</div>
			<div class="workcont m">
				<div class="workbox">
					<!-- ngRepeat: work in workData --><div ng-repeat="work in workData" class="workphoto l ng-scope">
						<!--选中状态-->
						<b ng-show="allSelect" ng-click="SelectCheck($index)" class="ng-hide">
							<i ng-show="work.slectCheck" class="ng-hide"></i>
						</b>
						<a ng-click="workDetails()" class="work_img" href="">
							<img ng-src="http://testpcbuilder.artup.com/upload/475bb8d4c5874f69810c30bdb4733e741494835379.jpg" alt="" src="http://testpcbuilder.artup.com/upload/475bb8d4c5874f69810c30bdb4733e741494835379.jpg">
						</a>
						<p class="workp1">
							<span class="l work_name ng-binding">未命名 2017-05-15 16:02</span>
							<span class="r ng-binding"></span>
						</p>
						<p class="workp2">
							<span class="ng-binding">2017年05月15日</span>
							<br>
							<!--
							<span>{{work.worksTypeName}} {{work.size}} mm</span>
							-->
							<span class="ng-binding">海报 500*400 mm</span>
						</p>
						<p class="workp3">
							<span ng-click="workGoCart(work.id)" class="r"><input type="button" name="" id="" value="购买定制"></span>
						</p>
					</div>	
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>