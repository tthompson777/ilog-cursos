routingApp.component('allCursos',{
    templateUrl:'scripts/components/all-cursos/all-cursos.component.html',
    controller:('allCursosController', allCursosController),
    controllerAs:'ctrl',
    bindings:{
        cursos:'<'
    }
  });
  
  function allCursosController(){
    //   
  }