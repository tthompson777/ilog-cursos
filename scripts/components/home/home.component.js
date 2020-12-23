routingApp.component('home',{
    templateUrl:'scripts/components/home/home.component.html',
    controller:('homeController', homeController),
    controllerAs:'ctrl',
    bindings:{
        users:'<'
    }
  });
  
  function homeController(){
    //   
  }