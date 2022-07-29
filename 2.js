/*### Constantes de objetos html ###*/
const depositarSaldo = document.getElementById('tagdepositarsaldo');
const retirarSaldo = document.getElementById('tagretirarsaldo');
const contenido = document.getElementById('contenido');
const nameSpan = document.getElementById('namespan');
const balanceSpan = document.getElementById('balancespan');
const btnexit = document.getElementById('btnexit');

/*### Declaracion de variables globales ###*/
let nombre;
let saldo;
let tipoMovimiento;
let monto;

/*### Se cargan datos desde localstorage ###*/
loadDataLocalStorage();

 /*### Se elige hacer un retiro ###*/  
    retirarSaldo.addEventListener('click', () => {
    const cuerpo = `
    <div class= "card my-5 p-5 text-center">
      <form id = "formretiro">
        <h3>Ingresa la cantidad a Retirar:</h3>
        <div class="mb-3"> 
          <label for="inputretiro" class="form-label fs-5 text-white">Cantidad a retirar:</label>
          <input type="number" class="form-control" id="inputretiro" placeholder="$" required>
        </div>
        <button class="btn -btn-success mb-3" type="submit" id="btnretiro">Confirmar</button>
      </form>	
    </div>
    `
    /*### Se renderiza en el contenedor ###*/
    mostrarHTML(cuerpo);
    
    /*### Se obtienen los elementos del html ###*/
    const btnretiro  = document.getElementById('btnretiro');
    const formretiro	= document.getElementById('formretiro');
    const inputretiro = document.getElementById('inputretiro');
    
    /*### Evento para tomar el valor del input y actualizar el saldo ##*/
    btnretiro.addEventListener('click',(e) => {
      e.preventDefault();
      monto = Number(inputretiro.value);
      if (validainput(monto) == true){
        tipoMovimiento = 'retiro';
        movimiento(tipoMovimiento, monto);
      };
      //tipoMovimiento = 'retiro';
      //movimiento(tipoMovimiento, monto);
      formretiro.reset();
      contenido.firstElementChild.remove();
    });  
  });	

 
    /*### Se elige hacer un deposito ###*/ 
    depositarSaldo.addEventListener('click', () => {
    const cuerpo = `
    <div class= "card my-5 p-5 text-center">
      <form id = "formdeposito">
        <h3>Ingresa la cantidad a Depositar:</h3>
        <div class="mb-3"> 
          <label for="inputretiro" class="form-label fs-5 text-white">Cantidad a retirar:</label>
          <input type="number" class="form-control" id="inputdeposito" placeholder="$" required>
        </div>
        <button class="btn -btn-success mb-3" type="submit" id="btndeposito">Confirmar</button>
      </form>	
    </div>
    `
    /*### Se renderiza en el contenedor ###*/
    mostrarHTML(cuerpo);

    /*### Se obtienen los elementos del html ###*/
    const btndeposito  = document.getElementById('btndeposito');
    const frmdeposito	= document.getElementById('frmdeposito');
    const inputdeposito = document.getElementById('inputdeposito');

    /*### Evento para tomar el valor del input y actualizar el saldo ##*/
    btndeposito.addEventListener('click',(e) => {
      e.preventDefault();
      monto = Number(inputdeposito.value);
      if (validainput(monto) == true){
        tipoMovimiento = 'deposito';
        movimiento(tipoMovimiento, monto);
      };
      //tipoMovimiento = 'deposito';
      //movimiento(tipoMovimiento, monto);
      formdeposito.reset();
      contenido.firstElementChild.remove();
    });
  });	

  /*### Al presionar el boton salir redirige a la pagina principal ##*/
  btnexit.addEventListener('click',(e) => {
    e.preventDefault();
    location.href= ("./index.html");
  });

  /*### Funcion quw renderiza en html ###*/
  function mostrarHTML(a){
    const mostrar = document.createElement('div');	
    mostrar.innerHTML = a;
      if(contenido.firstElementChild){
        contenido.firstElementChild.remove();
      }
    contenido.appendChild(mostrar);
    }


    /*### Carga los datos desde localstorage ##*/
    function loadDataLocalStorage(){
      nombre = localStorage.getItem("name");
      nameSpan.innerHTML = `Cliente: ${nombre}`
      saldo = parseFloat(localStorage.getItem("balance"));
      balanceSpan.innerHTML = `Saldo: $ ${saldo}`
    }

    /*### Funcion que realiza el tipo de moviemnto ###*/
    function movimiento(tipoMovimiento, monto){
      let balance = 0
      let tipo = "";
      switch (tipoMovimiento) {
        case "deposito":
          tipo ="suma";
          balance=  operaciones(tipo,saldo,monto);
          /*### Regla de negocio ###*/
          if(balance <= 990){
            localStorage.setItem("balance", balance);
           }else{
            alert('movimiento sobrepasa maximo');
           }
          break;
        case "retiro":
          tipo ="resta";
          balance=  operaciones(tipo,saldo,monto);
          if(balance => 10){
            localStorage.setItem("balance", balance);
           }else{
            alert('movimiento sobrepasa minimo');
           }
          break;
        case "consulta":
          //No es necesario hacer algo...
          break;
      }
      loadDataLocalStorage();
    }
    /*### Sumadora ###*/
    function operaciones(tipo, n1, n2){
      let valor = 0;
      switch (tipo) {
        case "suma":
           valor  = n1 + n2;
          break;
        case "resta":
          valor  = n1 - n2;
          break;
      }
      return valor;
    }

    /*### Valida numeros positivos, null, NaN ###*/
    function validainput(number){
      let valor;
      if(number < 0 || isNaN(number) || number === null || number === undefined){
        valor = false
        return  valor
      }else{
        valor = true
      }
      return  valor
    }
