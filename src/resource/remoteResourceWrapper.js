angular.module('commons')
	
	// Mimics a remote resource with sorting and pagination
	.factory('remoteResourceWrapper', function() {

		return function(items) {

			return {
				query: function(params, callback) {
					if (typeof params === 'function') {
						callback = params;
					}

					var result = items.slice(0, items.length); // to make a copy
					if (params) {
						if (params.sortBy) {
							result.sort(function(a, b) {
								if (typeof a[params.sortBy] === 'string') {
									return a[params.sortBy].localeCompare(b[params.sortBy]);
								} else {
									return a[params.sortBy] - b[params.sortBy];
								}
							});
							if (params.sortAsc === false) {
								result.reverse();
							}
						}
						if (params.offset !== undefined) {
							if (params.limit === undefined) {
								result = result.slice(params.offset, result.length);
							} else {
								result = result.slice(params.offset, params.offset + params.limit);
							}
						}
					}

					if (callback) {
						callback(result);
					}
					return result;
				},
				count: function() {
					return { // because $resource can only return objects, not single values
						count: items.length
					};
				}
			};
		};
	});