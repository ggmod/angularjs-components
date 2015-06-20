angular.module('commons')
	.directive('dialog', function($timeout) {
		return {
			scope: {
				visible: '='
			},
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'dialog/dialog.html',

			controller: function($scope) {
				this.close = function() {
					$scope.close();
				};
			},
			link: function(scope, element) {

				var bodyOverflowed = false;
				var originalPadding = null;
				var scrollbarWidth = null;

				function measureScrollbar() { // http://davidwalsh.name/detect-scrollbar-width
					var tempDiv = document.createElement('div');
					tempDiv.classList.add('scrollbar-measure');
					document.body.appendChild(tempDiv);
					var width = tempDiv.offsetWidth - tempDiv.clientWidth;
					document.body.removeChild(tempDiv);
					return width;
				}

				function handleScrollbarAtOpen() {
					bodyOverflowed = document.body.clientWidth < window.innerWidth;
					originalPadding = document.body.style.paddingRight ? 
						parseInt(document.body.style.paddingRight) : 0;
					scrollbarWidth = measureScrollbar();

					if (bodyOverflowed) {
						document.body.style.paddingRight = originalPadding + scrollbarWidth + 'px';
					};
				}

				function handleScrollbarAtClose() {
					if (bodyOverflowed) {
						document.body.style.paddingRight = originalPadding + 'px';
						bodyOverflowed = false;
					};
				}

				scope.$watch('visible', function() {
					if (scope.visible) {
						handleScrollbarAtOpen();
						document.body.classList.add('modal-open');
					} else {
						handleScrollbarAtClose();
						document.body.classList.remove('modal-open');
					}
				});

				scope.clicked = function(event) {
					if (event.target.classList.contains('fade')) {
						scope.close();
					}
				};

				scope.close = function() {
					scope.visible = false;
				};
			}
		};
	});