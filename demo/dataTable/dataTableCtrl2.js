angular.module('commonsDemo')
	.factory('Cars', function(remoteResourceWrapper) {
		return remoteResourceWrapper([
			{ year: 1997, maker: 'Ford', model: 'E350', desc: 'ac, abs, moon', price: 3000.00 },
			{ year: 1999, maker: 'Chevy', model: 'Venture "Extended Edition"', price: 4900.00 },
			{ year: 1999, maker: 'Checy', model: 'Venture "Extended Edition, Very Large"', price: 5000.00 },
			{ year: 1996, maker: 'Jeep', model: 'Grand Cherokee', desc: 'air, moon roof, loaded', price: 4799.00 }
		]);
	})

	.controller('CarsCtrl', function($scope, Cars) {

		$scope.cars = [];
		$scope.carCount = 0;

		$scope.carsTable = {};

		$scope.carColumns = [{
			property: 'year',
			displayName: 'Year',
			cellTemplate: '<input type="number" ng-model="item.year" style="width: 50px"/>',
			sortable: true
		}, {
			property: 'maker',
			displayName: 'Maker',
		}, {
			property: 'model',
			displayName: 'Model',
		}, {
			property: 'price',
			displayName: "Price ($)"
		}, {
			displayName: 'Actions',
			headerTemplate: '<i>Actions</i>',
			cellTemplate: '<button ng-click="parentScope.carClicked(item)">Buy</button>'
		}];

		$scope.carOptions = {
			pagination: false,
			indexColumn: false,
			rowColors: [{
				color: 'rgb(255, 255, 128)',
				condition: function(car, $index) {
					return car.year >= $scope.yearLimit;
				}
			}],
			selectColumn: true,
			multiSelect: true
		};

		$scope.yearLimit = 1999;

		$scope.carClicked = function(car) {
			alert(car.model);
		};

		$scope.reloadCars = function(params) {
			$scope.cars = Cars.query(params);
			$scope.carCount = Cars.count().count;
		};

	});