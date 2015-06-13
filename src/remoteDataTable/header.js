angular.module('commons')
	.directive('remoteDataTableHeaderTemplate', function($compile) {
		return {
			restrict: 'A',

			compile: function(tElement) {
				return {
					pre: function(scope, iElement, attrs) {
						var cellElement = $compile(scope.column.headerTemplate)(scope);
						iElement.append(cellElement);
					},
					post: function(scope, iElement, attrs) {

					}
				};
			}
		};
	});