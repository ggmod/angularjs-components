angular.module('commonsDemo')
	.service('Users', function(remoteResourceWrapper) {
		return remoteResourceWrapper({
				items: [
					{ id: 1, name: 'John Smith', email: 'john.smith@mail.com', age: 24, married: false },
					{ id: 2, name: 'James Brown', email: 'james.brown@mail.com', age: 20, married: true },
					{ id: 4, name: 'Mary Smith', email: 'mary.smith@mail.com', age: 30, married: false },
					{ id: 3, name: 'David Jones', email: 'david.jones@mail.com', age: 31, married: true },
					{ id: 5, name: 'X Y', email: 'x.y@mail.com', age: 30, married: false },
				],
				filters: [
					{ 
						name: 'name', 
						func: function (item, filterValue) {
							return item.name.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0; 
						}
					},
					{
						name: 'married',
						func: function (item, filterValue) { return item.married === filterValue; }
					}
				]
			});
	});