angular.module('commons')
	.directive('tabHeaders', function() {
		return {
			scope: {
				justified: "@"
			},
			require: '^tabContainer',
			restrict: 'E',
			replace: true,
			transclude: true,
			template: 
				'<div class="tab-headers">' +
				'	<ul class="nav nav-tabs" ng-class="{\'nav-justified\': justified}" ng-transclude>' +
				'	</ul>' +
				'</div>',

			link: function () { }
		};
	});