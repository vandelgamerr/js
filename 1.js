/*### Constantes ###*/
const inputAccount = document.getElementById('account');
const inputPassword = document.getElementById('pin');
const formLogin = document.getElementById('formlogin');
const btnLogin = document.getElementById('btnlogin');
const alertLogin = document.getElementById('alertlogin');

/*### Se oculata la alerta de login ###*/
alertLogin.style.visibility = "hidden";

/*### Se almacena la informacion de los clientes en el arreglo accounts ###*/
const accounts =[
  { 
    nombre: 'Mali', 
    saldo: 200, 
    cuenta: 1123, 
    pass: 1123
  },
  { nombre: 'Gera', 
    saldo: 90, 
    cuenta: 1456, 
    pass: 1456 
  },
  { nombre: 'Maui', 
    saldo: 700, 
    cuenta: 1789, 
    pass: 1789
   }
];

/*### Arreglo arrCustomer almacenara los datos del cliente que haga un login valido ###*/
let arrCustomer = {};
btnLogin.addEventListener('click', (e) => {
  e.preventDefault()
  let customerAccount = parseInt(inputAccount.value);
  let customerPassword = inputPassword.value
  /*### Se obtienen datos del arreglo accounts que cumplan con la condicion ###*/
  arrCustomer = accounts.filter(account => account.cuenta == customerAccount && account.pass == customerPassword );
  /*### Si arrCustomer vacio, los datos de login son incorrectos ###*/
  arrVerify(arrCustomer);
});

/* ### Verifica si el arreglo esta vacio, caso contrario, Login exitoso */
function arrVerify(arr){
  if (Object.entries(arrCustomer).length === 0){
    /* ### Si el arr esta vacio, se muestra el alert y se limpian los controles ###*/
    alertLogin.style.visibility = "visible";
    formLogin.reset();
  }else{
    /*### Registro valido, se almacena informacion en localStorage y se envia a la url de movimientos ###*/
    saveDataLocalStorage(arrCustomer[0].cuenta, arrCustomer[0].nombre, arrCustomer[0].saldo);
    alertLogin.style.visibility = "hidden";
    formLogin.reset();
    window.open('app.html',"_self")
  }
}

/*### Funcion que almacena informacion en localStorage ###*/
function saveDataLocalStorage(account, name, balance){
  if(localStorage.getItem('account') != account){
    localStorage.setItem("account",account);
    localStorage.setItem("name",name);
    localStorage.setItem("balance",balance);
  }
}

