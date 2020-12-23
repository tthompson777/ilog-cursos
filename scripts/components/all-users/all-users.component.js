routingApp.component('allUsers', {
    templateUrl: 'scripts/components/all-users/all-users.component.html',
    controller: ('allUsersController', allUsersController),
    controllerAs: 'ctrl',
    bindings: {
        users: '<'
    }
});

function allUsersController($scope) {
    // 
}