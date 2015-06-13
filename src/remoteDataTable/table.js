angular.module('commons')
	.directive('remoteDataTable', function() {
		return {
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'remoteDataTable/table.html',
			scope: {
				items: '=',
				itemCount: '=',
				columns: '=',
				reloadRemoteData: '=',
				options: '=?'
			},
			restrict: 'E',
			replace: true,

			link: function(scope) {

				// options:

				var defaultOptions = {
					pagination: true,
					indexColumn: true,
					paginationLimit: 10,
					rowColors: [],
					parentScope: false
				};

				scope.options = scope.options || {};

				Object.keys(defaultOptions).forEach(function(option) {
					if (scope.options[option] === undefined) {
						scope.options[option] = defaultOptions[option];
					}
				});

				// init:

				scope.columns.forEach(function(column) {
					column.visibleState = !column.hidden;
				});

				scope.sortBy = null;
				scope.sortAsc = true;

				scope.pagination = {
					offset: 0,
					limit: scope.options.paginationLimit,
					page: 1
				};

				scope.indexColumnVisible = scope.options.indexColumn;
				scope.columnSelectorOpen = false;

				if (scope.options.parentScope) {
					scope.parentScope = scope.$parent;
				}

				// functions:

				scope.sortColumn = function(column) {
					if (column.sortable) {
						if (scope.sortBy === column.property) {
							scope.sortAsc = !scope.sortAsc;
						} else {
							scope.sortBy = column.property;
							scope.sortAsc = true;
						}
						scope.reload();
					}
				};

				scope.getRowIndex = function($index) {
					if (scope.options.pagination) {
						return scope.pagination.offset + $index + 1;
					} else {
						return $index + 1;
					}
				};

				scope.getRowColor = function(item, $index) {
					var color;
					scope.options.rowColors.forEach(function(rowColor) {
						if (rowColor.condition(item, $index)) {
							color = rowColor.color;
						}
					});
					return color;
				};

				scope.getRemoteParameters = function() {
					var params = {};
					if (scope.sortBy) {
						params.sortBy = scope.sortBy;
						params.sortAsc = scope.sortAsc;
					}
					if (scope.options.pagination) {
						params.offset = scope.pagination.offset;
						params.limit = scope.pagination.limit;
					}
					return params;
				};

				scope.reload = function() {
					scope.reloadRemoteData(scope.getRemoteParameters());
				};

				scope.reload();
			}
		};
	});