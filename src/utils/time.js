angular.module('commons')
	.filter('time', function() {
		return function(input) {
			if (isNaN(input) || !isFinite(input)) {
				return undefined;
			}
			input = input / 1000;
			var hours   = Math.floor(input / 3600);
			var minutes = Math.floor((input - (hours * 3600)) / 60);
			var seconds = Math.floor(input - (hours * 3600) - (minutes * 60));

			if (hours   < 10) { hours   = '0' + hours;}
			if (minutes < 10) { minutes = '0' + minutes;}
			if (seconds < 10) { seconds = '0' + seconds;}
			return hours + ':' + minutes + ':' + seconds;
		};
	});