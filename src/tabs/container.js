angular.module('commons')
	.directive('tabContainer', function() {
		return {
			scope: {
				selected: "=?"
			},
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="tabbable" ng-transclude></div>',

			controller: function($scope) {

				var tabHeaders = []; // list of scopes
				var tabPanes = []; // list of scopes
				var initialtabHeader = null;

				this.addTabHeader = function(tabHeader) {
					tabHeaders.push(tabHeader);
					if (tabHeader.selected) {
						initialtabHeader = tabHeader;
					}
				};

				this.addTabPane = function(tabPane) {
					tabPanes.push(tabPane);
					// when adding the last pane:
					if (tabPanes.length === tabHeaders.length) {
						this.tabHeaderSelected(initialtabHeader);
					}
				};

				this.tabHeaderSelected = function(tabHeader) {
					tabHeaders.forEach(function(tabHeader) {
						tabHeader.selected = false;
					});

					tabHeader.selected = true;
					$scope.selected = tabHeader.tabId;

					var index = tabHeaders.indexOf(tabHeader);
					tabPanes.forEach(function(tabPane) {
						tabPane.selected = false;
					});
					if (tabPanes.length > 0) {
						tabPanes[index].selected = true;
					}
				};

				if ($scope.selected !== undefined) {
					$scope.$watch('selected', function() {
						var selectedTabHeader = null;

						tabHeaders.forEach(function(tabHeader) {
							if (tabHeader.tabId === $scope.selected) {
								selectedTabHeader = tabHeader;
							}
						});

						this.tabHeaderSelected(selectedTabHeader);
					}.bind(this));
				}
			}
		};
	});