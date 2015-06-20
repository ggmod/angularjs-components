angular.module('commons')
	.directive('dialogHeader', function() {
		return {
			scope: {
				hideClose: "=?"
			},
			require: '^dialog',
			restrict: 'E',
			replace: true,
			transclude: true,
			template: 
				'<div class="modal-header">' +
				'	<button ng-hide="hideClose" type="button" class="close" ng-click="close()">&times;</button>' + 
				'	<div ng-transclude></div>' +
				'</div>',

			link: function(scope, element, attrs, dialogController) {

				scope.close = function() {
					dialogController.close();
				};
			}
		};
	});