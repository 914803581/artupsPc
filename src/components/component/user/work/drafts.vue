<template>
	<div id="drafts">
		<div class="workR r ng-scope" ng-if="!drafts.length==0">
			<div class="worktit m">
				草稿箱
			</div>
			<div class="worktop m">
				<a class="workworks r ng-scope" ng-if="edits" ng-click="manage()" href="">管理</a><!-- end ngIf: edits -->
				<a class="workworks r ng-hide" ng-show="allSelect" ng-click="delectDrafts()" href="">删除</a>
				<a class="workworks r ng-hide" ng-show="allSelect" href="" ng-click="SelectAll()">全选</a>
			</div>
			<div class="workcont m">
				<div class="workbox">
					<!-- ngRepeat: item in drafts --><div ng-repeat="item in drafts" class="workphoto l ng-scope">
						<!--选中状态-->
						<b ng-show="allSelect" ng-click="SelectCheck($index)" class="ng-hide">
							<i ng-show="item.slectCheck" class="ng-hide"></i>
						</b>
						<a ng-click="workDetails()" class="work_img" href="">
							<img ng-src="http://testpcbuilder.artup.com/upload/20170728/336b9e13ed9f4e919b8d918e898b6c9b1501225333.jpg" alt="" src="http://testpcbuilder.artup.com/upload/20170728/336b9e13ed9f4e919b8d918e898b6c9b1501225333.jpg">
						</a>
						<p class="workp1">
							<!--
							<span class="l">{{item.name}}</span>
							-->
							<span class="l ng-binding">未命名 2017-07-28 11:46</span>
							<span style="font-weight: normal; color: #aaa;" class="ng-binding"></span>
						</p>
						<p class="workp2">
							<span class="ng-binding">2017-07-28 15:02:10</span>
							<br>
							<span class="ng-binding">画册 255*355 mm</span>
						</p>
						<p class="workp3">
							
							<span class="r">
								
								<a ng-click="continueEdit(item.loginFrom, item.url);" href="javascript:void(0);"><input type="button" name="" id="" value="继续编辑"></a>
							</span>
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