angular.module('commons')
	.directive('focusMe', function($timeout, $parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				if (attrs.focusMe !== undefined && attrs.focusMe !== '') {
					var model = $parse(attrs.focusMe);
					scope.$watch(model, function(value) {
						if(value === true) { 
							$timeout(function() {
								element[0].focus(); 
							});
						} else {
							$timeout(function() {
								element[0].blur(); 
							});
						}
					});
				} else {
					$timeout(function() {
						element[0].focus();
					});
				}
			}
		};
	});