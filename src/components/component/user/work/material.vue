<template>
	<div id="material">
		<div class="workR r ng-scope" >
			<div class="worktit m">
				我的素材
			</div>	
			<div class="worktop m">
				<a ng-if="manages" class="workworks r ng-scope" ng-click="manage()" href="">管理</a><!-- end ngIf: manages -->
			</div>
			<div class="workcont m">
				<div class="workbox">
					<div ng-repeat="material in materialData" class="workphoto l ng-scope">
						<!--选中状态-->
						<b ng-show="allSelect" ng-click="SelectCheck($index)" class="ng-hide">
							<i ng-show="material.slectCheck" class="ng-hide"></i>
						</b>
						<a ng-click="workDetails()" class="work_img" href="">
							<img ng-src="http://testboss.artup.com//material/thumb/2017/07/19/c539130fc0294412b02c98c17d43fee4_360-240.jpg" alt="" ng-model="material_modal" ng-click="materialPreview(material.showPath);" class="ng-pristine ng-untouched ng-valid ng-empty" src="http://testboss.artup.com//material/thumb/2017/07/19/c539130fc0294412b02c98c17d43fee4_360-240.jpg">
						</a>
						<p class="workp1">
							<span class="l ng-binding"></span>
							
						</p>
						<p class="workp2">
							<span class="ng-binding">2017年07月19日</span>
						</p>
						<p class="workp3">
							
						</p>
					</div>
				</div>
			</div>
			<el-pagination
				    layout="total, sizes, prev, pager, next, jumper"
				    :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>