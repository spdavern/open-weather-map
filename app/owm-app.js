angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
    .value('owmCities', 
        ['New York', 'Dallas', 'Chicago'])
    .config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : './home.html',
            controller : 'HomeCtrl'
        }).when('/cities/:city', {
            templateUrl : './city.html',
            controller : 'CityCtrl',
		    resolve : {
		    	//Replace this city resolve function with the one commented out below
		    	//when the owmFindCity function is available.
		        city: function(owmCities, $route, $q, $location) {
		            var city = $route.current.params.city;
		            if(owmCities.indexOf(city) == -1 ) {
		            	return $q.reject("Undefined city");
		            };
		            return city;
		        }
   		        // city : function(owmFindCity, $route) {
		        //     var city = $route.current.params.city;
		        //     return owmFindCity(city);
		        // }
		    }
        }).when('/error', {
		    template : '<p>Error Page Not Found</p>'
		})
    })
	.run(function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path('/error');
	    });
		$rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 1000);
	    });
	})
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })
    .controller('CityCtrl', function($scope, city) {
	    $scope.city = city;
    })