angular.module('commons')
	.factory('dialog', function($compile, $rootScope) {
		
		function buildStaticDialog(element, initScope) {

			element.setAttribute('visible', 'dialog.visible');

			var scope = $rootScope.$new();
			scope.dialog = {
				visible: true // open immediately
			};
			if (initScope) {
				Object.keys(initScope).forEach(function(key) {
					scope[key] = initScope[key];
				});
			}

			var compiledElement = $compile(element.outerHTML)(scope);
			// TODO if I add it as document.body.appendChild without jQuery, then it can't be removed later!
			$(document.body).append(compiledElement);

			scope.$watch('dialog.visible', function(newValue, oldValue) {
				if (newValue === false) {
					setTimeout(function() {
						compiledElement.remove();
					}, 100); // wait for the animation to finish
				}
			});

			return {
				scope: scope,
				element: compiledElement
			};
		}

		return {
			alert: function(spec) {
				
				var element = document.createElement('alert-dialog');
				if (typeof spec === 'string') {
					element.setAttribute('message', spec);
				} else {
					if (spec.title) {
						element.setAttribute('title', spec.title);
					}
					if (spec.message) {
						element.setAttribute('message', spec.message);
					}
				}

				var dialog = buildStaticDialog(element);

				return {
					close: function() {
						dialog.scope.visible = false;
					}
				};
			},
			confirm: function(spec, callback) {
				
				var element = document.createElement('confirm-dialog');
				if (typeof spec === 'string') {
					element.setAttribute('item', spec);
				} else {
					if (spec.title) {
						element.setAttribute('title', spec.title);
					}
					if (spec.message) {
						element.setAttribute('message', spec.message);
					}
					element.setAttribute('item', spec.item);
				}
				element.setAttribute('callback', 'callback');

				var dialog = buildStaticDialog(element);
				dialog.scope.callback = callback;

				return {
					close: function() {
						dialog.scope.visible = false;
					}
				};
			},
			editor: function(spec) {

				var element = document.createElement('edit-dialog');
				element.setAttribute('options', 'options');
				var dialog = buildStaticDialog(element, { options: spec });

				return {
					close: function() {
						dialog.scope.visible = false;
					}	
				};
			}
		};
	});