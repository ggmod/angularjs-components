angular.module('commons')
	.directive('collapsible', function () {
		return {
			scope: {
				collapsed: '=?'
			},
			restrict: 'A',
			link: function (scope, element) {

				scope.collapsed = scope.collapsed !== undefined ? scope.collapsed : false;

				element.bind('click', function() {
					scope.collapsed = !scope.collapsed;
					scope.$apply();
				});

				scope.$watch('collapsed', function() {
					if (scope.collapsed) {
						$(element).find('.collapsible-sign').first()
							.removeClass('glyphicon-chevron-down')
							.addClass('glyphicon-chevron-up');
						$(element).next('.collapsible-body').slideUp({duration: 200});
					} else {
						$(element).find('.collapsible-sign').first()
							.removeClass('glyphicon-chevron-up')
							.addClass('glyphicon-chevron-down');
						$(element).next('.collapsible-body').slideDown({duration: 200});
					}
				});
			}
		};
	});