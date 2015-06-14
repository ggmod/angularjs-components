angular.module('commons')
	.directive('remoteDataTable', function() {
		return {
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'remoteDataTable/table.html',
			scope: {
				items: '=',
				itemCount: '=',
				columns: '=',
				reloadRemoteData: '=',
				options: '=?',
				publicScope: '=?'
			},
			restrict: 'E',
			replace: true,

			link: function(scope) {

				// options:

				var defaultOptions = {
					pagination: true,
					indexColumn: true,
					indexColumnHeader: '#',
					paginationLimit: 10,
					rowColors: [],
					selectColumn: false,
					multiSelect: true,
					substituteRows: true,
					expandableRows: false,
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

				scope.expandColumnVisible = scope.options.expandableRows;
				scope.indexColumnVisible = scope.options.indexColumn;
				scope.selectColumnVisible = scope.options.selectColumn;
				scope.columnSelectorOpen = false;

				if (scope.options.parentScope) {
					scope.parentScope = scope.$parent;
				}

				scope.publicScope = scope.options.publicScope || {};
				scope.publicScope.selected = scope.options.multiSelect ? [] : null;

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

				scope.getColumnCount = function() {
					var count = 0;
					count += scope.indexColumnVisible ? 1 : 0;
					count += scope.selectColumnVisible ? 1 : 0;
					count += scope.expandColumnVisible ? 1 : 0;
					scope.columns.forEach(function(column) {
						count += column.visibleState ? 1 : 0;
					});
					return count;
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

				scope.selectAllToggle = function() {
					scope.publicScope.selected = [];

					if (scope.selectAllCheckbox) {
						scope.items.forEach(function(item) {
							scope.publicScope.selected.push(item);
							item._selected = true;
						});
					} else {
						scope.items.forEach(function(item) {
							item._selected = false;
						});
					}
				};

				scope.selectRowToggle = function(item) {
					if (!item._selected) {
						if (scope.options.multiSelect) {
							scope.publicScope.selected.splice(
								scope.publicScope.selected.indexOf(item), 1);
						} else {
							scope.publicScope.selected = null;
						}
					} else {
						if (scope.options.multiSelect) {
							scope.publicScope.selected.push(item);
						} else {
							scope.publicScope.selected = item;
							scope.items.forEach(function(otherItem) {
								if (item !== otherItem) {
									otherItem._selected = false;
								}
							});
						}
					}
				};

				scope.clearSelection = function() {
					scope.publicScope.selected = scope.options.multiSelect ? [] : null;
					scope.items.forEach(function(item) {
						delete item._selected;
					});
				};

				scope.clearRowExpansions = function() {
					scope.items.forEach(function(item) {
						delete item._expanded;
					});	
				};

				scope.getSubstitudeRows = function() {
					return new Array(scope.pagination.limit - scope.items.length);
				};

				scope.rowClicked = function(item, $index, $event) {
					if (scope.options.rowClicked) {
						scope.options.rowClicked(item, $index, $event);
					}
				};

				scope.rowExpandToggle = function(item) {
					item._expanded = !item._expanded;
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
					scope.clearSelection();
					scope.clearRowExpansions();
					scope.reloadRemoteData(scope.getRemoteParameters());
				};

				scope.reload();
			}
		};
	});