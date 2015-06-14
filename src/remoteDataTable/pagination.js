angular.module('commons')
	.directive('remoteDataTablePagination', function() {
		return {
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'remoteDataTable/pagination.html',
			restrict: 'E',
			replace: true,

			link: function(scope) {

				scope.pageBack = function() {
					scope.pagination.offset -= Math.min(scope.pagination.limit, scope.pagination.offset);
					scope.reload();
				};

				scope.pageForward = function() {
					scope.pagination.offset += scope.pagination.limit;
					scope.reload();
				};

				scope.pageFirst = function() {
					scope.pagination.offset = 0;
					scope.reload();
				};

				scope.pageLast = function() {
					scope.pagination.offset = (Math.ceil(scope.itemCount / scope.pagination.limit) - 1) * scope.pagination.limit;
					scope.reload();
				};

				scope.pageSelected = function() {
					var maxPage = Math.ceil(scope.itemCount / scope.pagination.limit);
					if (scope.pagination.page > maxPage) {
						scope.pagination.page = maxPage;
						return;
					}
					scope.pagination.offset = (scope.pagination.page - 1) * scope.pagination.limit;
					scope.reload();
				};

				scope.getMaxPage = function() {
					return Math.ceil(scope.itemCount / scope.pagination.limit);
				};

				scope.pageLimitChanged = function() {
					scope.reload();
				};

				scope.$watchGroup(['pagination.limit', 'pagination.offset'], function() {
					scope.pagination.page = Math.floor(scope.pagination.offset / scope.pagination.limit) + 1;
				});

			}
		};
	});