angular.module('commons')
	.directive('remoteDataTableCellTemplate', function($compile) {
		return {
			restrict: 'A',

			compile: function(tElement) {
				return {
					pre: function(scope, iElement, attrs) {
						var cellElement = $compile(scope.column.cellTemplate)(scope);
						iElement.append(cellElement);
					},
					post: function(scope, iElement, attrs) {

					}
				};
			}
		};
	});