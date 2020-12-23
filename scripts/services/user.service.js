routingApp.service('userService', userService);

function userService() {
  let service = {
    getAllUsers: getAllUsers
  }
  return service;

  function getAllUsers($scope) {
    $scope.getAllUsersList = {};
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios", true);
    xhr.onload = function () {
      // console.log(xhr.responseText);
      $scope.getAllUsersList = xhr.responseText;
    };
    xhr.send();
  }

}