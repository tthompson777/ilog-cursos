var routingApp = angular.module('routingApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

routingApp.controller('geralController', function ($scope, $http, $uibModal, $uibModalStack) {

  // Broadcast Para Exportação da Tabela
  $scope.exportAction = function (option) {
    switch (option) {
      case 'pdf':
        $scope.$broadcast('export-pdf', {});
        break;
      case 'excel':
        $scope.$broadcast('export-excel', {});
        break;
      case 'doc':
        $scope.$broadcast('export-doc', {});
        break;
      case 'csv':
        $scope.$broadcast('export-csv', {});
        break;
      default:
        console.log('Formato Desconhecido!');
    }
  }

  // Fechar Modal
  $scope.closeModal = function () {
    $uibModalStack.dismissAll();
  }

  // Métodos para Funcionário
  // GetList para todos os Funcionário
  function _getAllUsers() {
    $http.get('https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios').then(function (response) {
      $scope.getAllUsersList = response.data;
      $scope.getCountUsersList = response.data.length;
    });
  }
  _getAllUsers();

  // Modal edição de Funcionário
  $scope.editUserModal = function (row) {
    var modalInstance = $uibModal.open({
      templateUrl: 'formEditUser.html',
      scope: $scope,
      size: 'lg',
    });

    modalInstance.rendered.then(function () {
      // Obtendo Funcionário da linha selecionada
      function _getUniqueUser() {
        $http.get(`https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios/${row.id}`).then(function (response) {
          $scope.getUniqueUsersList = response.data;
        });
      }
      _getUniqueUser();
    });

  };

  // Modal Adcicionar Funcionário
  $scope.modalAddUser = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'formAddUser.html',
      scope: $scope,
      size: 'lg',
    });

    modalInstance.rendered.then(function () {
      $scope.modelAddUser = {};
    });

  };

  // Método para adicionar Funcionário
  $scope.addUserConfirm = (dadosAdicao) => {
    $http.post(`https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios`, dadosAdicao)
      .then(function () {
        $scope.closeModal();
        $scope.refreshPage();
      });
  }

  // Editar Funcionário
  $scope.editarUserSave = () => {
    $http.put(`https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios/${$scope.getUniqueUsersList.id}`, $scope.getUniqueUsersList)
      .then(function () {
        $scope.closeModal();
        $scope.refreshPage();
      });
  }

  // Modal confirmar exclusão
  $scope.modalConfirmarExclusao = function (row) {
    var modalInstance = $uibModal.open({
      templateUrl: 'modalConfirmarExclusao.html',
      scope: $scope,
      size: 'md',
    });

    modalInstance.rendered.then(function () {
      $scope.dataUserDelete = row;
    });

  };

  // Executar exclusão do Funcionário
  $scope.executeDelete = (row) => {
    $http.delete(`https://5fe1ea217a94870017681bf6.mockapi.io/Usuarios/${row.id}`).then(function () {
      $scope.closeModal();
      $scope.refreshPage();
    });
  }
  // Fim dos métodos para Funcionários

  // Métodos para Cursos
  // GetList para todos os Cursos
  function _getAllCursos() {
    $http.get('https://5fe1ea217a94870017681bf6.mockapi.io/Cursos').then(function (response) {
      $scope.getAllCursosList = response.data;
      $scope.getCountCursosList = response.data.length;
    });
  }
  _getAllCursos();

  // Modal edição de Cursos
  $scope.editCursoModal = function (row) {
    var modalInstance = $uibModal.open({
      templateUrl: 'formEditCursos.html',
      scope: $scope,
      size: 'lg',
    });

    modalInstance.rendered.then(function () {
      // Obtendo dados do Curso da linha selecionada
      function _getUniqueCurso() {
        $http.get(`https://5fe1ea217a94870017681bf6.mockapi.io/Cursos/${row.id}`).then(function (response) {
          $scope.getUniqueCursoList = response.data;
        });
      }
      _getUniqueCurso();
    });

  };

  // Modal Adcicionar Curso
  $scope.modalAddCurso = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'formAddCurso.html',
      scope: $scope,
      size: 'lg',
    });

    modalInstance.rendered.then(function () {
      $scope.modelAddCurso = {};
    });

  };

  // Método para adicionar Curso
  $scope.addCursoConfirm = (dadosAdicao) => {
    $http.post(`https://5fe1ea217a94870017681bf6.mockapi.io/Cursos`, dadosAdicao)
      .then(function () {
        $scope.closeModal();
        $scope.refreshPage();
      });
  }

  // Editar Curso
  $scope.editarCursoSave = () => {
    $http.put(`https://5fe1ea217a94870017681bf6.mockapi.io/Cursos/${$scope.getUniqueCursoList.id}`, $scope.getUniqueCursoList)
      .then(function () {
        $scope.closeModal();
        $scope.refreshPage();
      });
  }

  // Modal confirmar exclusão - Curso
  $scope.modalConfirmarExclusaoCurso = function (row) {
    var modalInstance = $uibModal.open({
      templateUrl: 'modalConfirmarExclusaoCurso.html',
      scope: $scope,
      size: 'md',
    });

    modalInstance.rendered.then(function () {
      $scope.dataCursoDelete = row;
    });

  };

  // Executar exclusão do Cursos
  $scope.executeDeleteCurso = (row) => {
    $http.delete(`https://5fe1ea217a94870017681bf6.mockapi.io/Cursos/${row.id}`).then(function () {
      $scope.closeModal();
      $scope.refreshPage();
    });
  }
  // Fim dos métodos para Cursos

  // Recarregar Página
  $scope.refreshPage = () => {
    window.location.reload();
  }

});

// Config
routingApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  // Rotas
  var states = [{
      name: 'home',
      url: '/home',
      component: 'home',
      resolve: {
        users: function () {
          //
        }
      }
    },
    {
      name: 'users',
      url: '/users',
      component: 'allUsers',
      resolve: {
        users: function () {
          //
        }
      }
    },
    {
      name: 'cursos',
      url: '/cursos',
      component: 'allCursos',
      resolve: {
        cursos: function () {
          // 
        }
      }
    }
  ]

  states.forEach(function (state) {
    $stateProvider.state(state);
  });
});

// Diretiva Para Exportação da Tabela
routingApp.directive('exportTable', function () {
  var link = function ($scope, elm, attr) {
    $scope.$on('export-pdf', function (e, d) {
      elm.tableExport({
        type: 'pdf',
        escape: false
      });
    });
    $scope.$on('export-excel', function (e, d) {
      elm.tableExport({
        type: 'excel',
        escape: false
      });
    });
    $scope.$on('export-doc', function (e, d) {
      elm.tableExport({
        type: 'doc',
        escape: false
      });
    });
    $scope.$on('export-csv', function (e, d) {
      elm.tableExport({
        type: 'csv',
        escape: false
      });
    });
  }
  return {
    restrict: 'C',
    link: link
  }
});