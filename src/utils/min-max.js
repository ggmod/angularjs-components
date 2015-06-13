angular.module('commons')
	.filter('min', function() {
		return function(input) {
            var min;
            for (var i = 0; i < input.length; i++) {
                if (min === undefined || input[i] < min) {
                    min = input[i];
                }
            }
            return min;
        };
	})
	.filter('max', function() {
		return function(input) {
            var max;
            for (var i = 0; i < input.length; i++) {
                if (max === undefined || input[i] > max) {
                    max = input[i];
                }
            }
            return max;
        };
	});
