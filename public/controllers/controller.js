(function(){

function GetAllService($http){
	
	function GetAll(){
      return $http.get('/films/');
    }
	
    var factory = {
      GetAll: GetAll
    };

    return factory;	
  }
  
  function GetByIdService($http){
	
	function GetById(id){
      return $http.get('/films/' + id);
    }

    var factory = {
      GetById: GetById
    };

    return factory;
  }
  
  function CreateService($http){
	
	function Create(data){
      return $http.post('/films', data);
    }

    var factory = {
      Create: Create
    };

    return factory;

  }
  
  function UpdateService($http){
	
	function Update(id,recept){
      return $http.put('/films/' + id, recept)
    }

    var factory = {
      Update: Update
    };

    return factory;

  }
  
  function DeleteService($http){
	
    function Delete(id){
      return $http.delete('/films/' + id);
    }

    var factory = {
      Delete: Delete
    };
	
    return factory;

  }
  
function Controller($scope, GetAllService,GetByIdService,CreateService,UpdateService,DeleteService) {

console.log("I am in controller");
	$scope.filteredTodos = [];
	
   
	var refresh = function() {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
		$scope.films = response.data;
		$scope.contact = "";
		$scope.filteredTodos = $scope.films;
		});
	};
	refresh();
	//панинация
	/*
	$scope.numPages = function () {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
			$scope.films = response.data;
			$scope.numPages= Math.ceil($scope.films.length / $scope.numPerPage);
		}); 
	};
	  
	var pagin = function() {
		$scope.$watch('currentPage + numPerPage', function() {
			var promise = GetAllService.GetAll();
			promise.then(function(response){
				$scope.films = response.data;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
				var end = begin + $scope.numPerPage; 
				$scope.filteredTodos = $scope.films.slice(begin, end);
			});
		});
	};
	pagin(); 
	*/	
	//конец пагинации
	$scope.addContact = function() {
		$scope.contact.comment=[];
		var promise = CreateService.Create($scope.contact);
		promise.then(function(){		  
			refresh();
		}); 
	};
	
	$scope.addComent = function(id) {
		var promise = GetByIdService.GetById(id);
		promise.then(function(response){
			
			$scope.contact = response.data;
			$('.coment').each(function(index) {
				if ($(this)[0].value!==''){
					$scope.contact.comment.push($(this)[0].value); 
					
				}
			});

			var promise = UpdateService.Update($scope.contact._id, $scope.contact);
			promise.then(function(response){
				refresh();
			});
			refresh();
		}); 
	};

	$scope.remove = function(id) {
	  var promise = DeleteService.Delete(id);
		promise.then(function(){		  
			refresh();
		});  
	};

	$scope.edit = function(id) {
		var promise = GetByIdService.GetById(id);
		promise.then(function(response){
			$scope.contact = response.data;
		});
	};  

	$scope.update = function() {
		var promise = UpdateService.Update($scope.contact._id, $scope.contact);
		promise.then(function(response){
			refresh();
		});
	};
	$scope.deselect = function() {
		$scope.contact = "";
	}

};//Controller

angular
.module('myApp', [])
.factory('GetAllService', GetAllService)
.factory('GetByIdService', GetByIdService)
.factory('CreateService', CreateService)
.factory('UpdateService', UpdateService)
.factory('DeleteService', DeleteService)
.controller('AppCtrl', Controller);

})();