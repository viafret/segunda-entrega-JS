//*selección y cálculo del valor de los productos a adquirir
let productos = 0; //* Variable para la cantidad de productos
//let cantProd; //*Variable para la cantidad de productos a adquirir
let cantiAcces = 0; //Variable de total de accesorios agregados
let valido; //*variable auxiliar de producto valido
//const valAcc1 = 500;
//const valAcc2 = 1000;
//const valAcc3 = 1500;

//Definición clase objeto mueble que permite identificarlo, darle precio y verificar si dispone de accesorios
class mueble {
  constructor(nombre, accesorios, precio) {
    this.nombre = nombre;
    this.accesorios = accesorios;
    this.precio = precio;
  }
  //método para mostrar el precio del objeto
  mostrarPrec() {
    alert(this.nombre + " cuesta $ " + this.precio + " con IVA incluido");
  }
  //método para mostrar si se puede añadir accesorios
  mostrarAcc() {
    alert(this.nombre + " " + this.accesorios + " puede agregar accesorios: ");
  }
}

//Se agregan los datos de tres tipos de productos
let mueble1 = new mueble("ALACENA", "SI", 9000);
let mueble2 = new mueble("RACKTV", "SI", 10000);
let mueble3 = new mueble("PLACARD", "SI", 20000);

//array de muebles disponibles
let mueblesDisp = [mueble1, mueble2, mueble3];
console.log(mueblesDisp);

//array de cantidad por tipo de mueble agregado al carrito
cantMueblesAgregados = [];

//array carrito de muebles
let carritoMuebles = [];

//funcion para armar lista de Prductos en el HTML
function armarListaProd() {
  let lista = document.getElementById("listaProductos");
  for (const muebles of mueblesDisp) {
    let texto1 = document.createElement("li");
    let texto2 = document.createElement("p");
    let boton = document.createElement("a");
    texto1.innerHTML = `${muebles.nombre}`;
    texto2.innerHTML = `Valor: $  ${muebles.precio}`;
    boton.innerHTML = `Agregar`;
    boton.href = `#`;
    boton.className = `lista__productos--botonAgregar`;
    lista.appendChild(texto1);
    texto1.appendChild(texto2);
    texto1.appendChild(boton);
    console.log(boton);
  }
}

//funcion para armar lista de Productos agregados para compra en el HTML
function listaProdAgregados(_producto) {
  let agregado = document.getElementById("listaProductosAgregados");
  let sinProducto = document.getElementById("sinProducto");
  let producto = document.createElement("p");
  let boton = document.createElement("a"); //eliminar producto seleccionado
  boton.href = `#`;
  boton.className = `lista__productos--botonEliminar`;
  if (productos == 1) {
    agregado.removeChild(sinProducto);
    producto.innerHTML = `${_producto}`;
    boton.innerHTML = `Eliminar`;
    agregado.appendChild(producto);
    producto.appendChild(boton);
  } else {
    producto.innerHTML = _producto;
    boton.innerHTML = `Eliminar`;
    agregado.appendChild(producto);
    producto.appendChild(boton);
  }
  //evento para eliminar producto seleccionado
  let botEliminarProd = document.querySelectorAll(
    ".lista__productos--botonEliminar"
  );
  //agregar eventos al link Eliminar productos
  for (let boton of botEliminarProd) {
    boton.addEventListener("click", eliminarProd);
  }
}

function eliminarProd(e) {
  let hijo = e.target;
  let padre1 = hijo.parentNode;
  let padre2 = hijo.parentNode.parentNode;
  let vacio = padre2.childElementCount;
  console.log(vacio);
  console.log(padre1);
  console.log(padre2);

  if (vacio > 1) {
    console.log("Quiere eliminar el producto!");
    console.log(hijo);
    padre2.removeChild(padre1);
    productos--;
  } else {
    console.log(hijo);
    padre2.removeChild(padre1);
    let agregados = document.getElementById("listaProductosAgregados");
    let sinProducto = document.createElement("p");
    sinProducto.innerHTML = `No agregó productos!`;
    agregados.appendChild(sinProducto);
    productos--;
  }
  console.log(vacio);
}

//clase para accesorios
class accesorio {
  constructor(id, nombre, color, precio) {
    this.id = id;
    this.nombre = nombre;
    this.color = color;
    this.precio = precio;
  }
}

//carga de accesrios disponibles
let accesorio1 = new accesorio(1, "Puerta", "blanco", 1500);
let accesorio2 = new accesorio(2, "Estante", "blanco", 1000);
let accesorio3 = new accesorio(3, "Rueda", "negro", 300);

//definición de array de accesorios disponibles
let accesoriosDisp = [accesorio1, accesorio2, accesorio3];

const aCant = [0, 0, 0]; //array de cantidades seleccionadas de cada accesorio A, B o C

let accesoriosAgregados = []; //array de accesorios a comprar para armar lista en HTML

//funcion para armar lista de Accesorios disponibles en HTML
function armarListaAcce() {
  let lista = document.getElementById("listaAccesorios");
  for (const accesorio of accesoriosDisp) {
    let texto1 = document.createElement("li");
    let texto2 = document.createElement("p");
    let boton = document.createElement("a");
    texto1.innerHTML = `${accesorio.nombre}`;
    texto2.innerHTML = `Color: ${accesorio.color} Valor: $ ${accesorio.precio}`;
    boton.innerHTML = `Agregar`;
    boton.href = `#`;
    boton.className = `lista__accesorios--botonAgregar`;
    lista.appendChild(texto1);
    texto1.appendChild(texto2);
    texto1.appendChild(boton);
  }
}

//funcion para armar lista de accesorios agregados para compra en HTML
function listaAcceAgregados(_tipoAcce) {
  let agregado = document.getElementById("listaAccesoriosAgregados");
  let sinAccesorio = document.getElementById("sinAccesorio");
  let accesorio = document.createElement("p");
  let boton = document.createElement("a");
  boton.href = `#`;
  boton.className = `lista__accesorios--botonEliminar`;
  if (cantiAcces == 1) {
    agregado.removeChild(sinAccesorio);
    accesorio.innerHTML = `${_tipoAcce}`;
    boton.innerHTML = `Eliminar`;
    agregado.appendChild(accesorio);
    accesorio.appendChild(boton);
  } else {
    accesorio.innerHTML = _tipoAcce;
    boton.innerHTML = `Eliminar`;
    agregado.appendChild(accesorio);
    accesorio.appendChild(boton);
  }
  //evento para eliminar producto seleccionado
  let botEliminarAcce = document.querySelectorAll(
    ".lista__accesorios--botonEliminar"
  );
  //agregar eventos al link Eliminar productos
  for (let boton of botEliminarAcce) {
    boton.addEventListener("click", eliminarAcces);
  }
}
function eliminarAcces(e) {
  let hijo = e.target;
  let padre1 = hijo.parentNode;
  let padre2 = hijo.parentNode.parentNode;
  let vacio = padre2.childElementCount;
  console.log(vacio);
  console.log(padre1);
  console.log(padre2);

  if (vacio > 1) {
    console.log("Quiere eliminar el accesorio!");
    console.log(hijo);
    padre2.removeChild(padre1);
    cantiAcces--;
  } else {
    console.log(hijo);
    padre2.removeChild(padre1);
    let agregados = document.getElementById("listaAccesoriosAgregados");
    let sinAccesorio = document.createElement("p");
    sinAccesorio.innerHTML = `No agregó accesorios!`;
    agregados.appendChild(sinAccesorio);
    cantiAcces--;
  }
  console.log(vacio);
}

//Definición clase compra que identifica el tipo y cantidad del producto más la cantidad accesorios
class compra {
  constructor(mueble, cant, cantAcc) {
    this.mueble = mueble;
    this.cantidad = cant;
    this.accesorio = cantAcc;
  }

  showProducto() {
    console.log("Ha seleccionado " + this.cantidad + " " + this.mueble);
  }
  showAccesorio() {
    console.log("Agregó " + this.accesorio + " accesorios");
  }
}

//aramdo de listas en HTML
armarListaProd();
armarListaAcce();

//evento del boton agregr producto
//let botAgregaProd = document.getElementById("addProducto");
let botAgregaProd = document.querySelectorAll(
  ".lista__productos--botonAgregar"
);

//evento del boton agregar accesorio
let botAgregaAcces = document.querySelectorAll(
  ".lista__accesorios--botonAgregar"
);

//agregar eventos al link agregar productos
for (let boton of botAgregaProd) {
  boton.addEventListener("click", seleccion);
}

//agregar eventos al link agregar accesorioss
for (let boton of botAgregaAcces) {
  boton.addEventListener("click", definAcc);
}

//Función para el ingreso del producto a adquirir
function seleccion(e) {
  /*let _producto = prompt(
    "Escriba el producto que desea adquirir: ALACENA, RACKTV, PLACARD"
  );*/
  //e.preventDefault();
  let hijo = e.target;
  let padre = hijo.parentNode;
  console.log(hijo);
  console.log(padre);

  //let _producto = document.getElementById("producto").value;
  let _producto = padre.firstChild.textContent;
  carritoMuebles.push(_producto);
  productos++;
  console.log(carritoMuebles);
  listaProdAgregados(_producto);

  /*if (
    _producto == "ALACENA" ||
    _producto == "RACKTV" ||
    _producto == "PLACARD"
  ) {
    console.log("Ha seleCcionado el producto: " + _producto);
    validacion(_producto);
    return _producto; //*Retorna el producto si la seleección es válida
  } else {
    return (_producto = 0); //*Retorna vacío se la selección no es válida
  }*/
}

//*Función para validar y mostrar el valor del producto
function validacion(_prodIngresa) {
  //*Recibe la variable global producto
  if (_prodIngresa == "ALACENA") {
    //Se utilizan los métodos de clase "mueble"
    mueble1.mostrarPrec();
    mueble1.mostrarAcc();
    //cantidad(1); //se llama a la función para definir cantidades
    listaProdAgregados(_prodIngresa); //función para mostrar en HTML
  } else if (_prodIngresa == "RACKTV") {
    //Se utilizan los métodos de clase "mueble"
    mueble2.mostrarPrec();
    mueble2.mostrarAcc();
    //cantidad(1); //se llama a la función para definir cantidades
    listaProdAgregados(_prodIngresa);
  } else if (_prodIngresa == "PLACARD") {
    //Se utilizan los métodos de clase "mueble"
    mueble3.mostrarPrec();
    mueble3.mostrarAcc();
    //cantidad(1); //se llama a la función para definir cantidades
    listaProdAgregados(_prodIngresa);
  } else {
    return (valido = ""); //*Retorna la variable global valido vacía.
  }
}

//*Función para el ingreso de las cantidades
/*function cantidad(_valido) {
  if (_valido != "") {
    //Si el prodcuto es válido se procede a la selección de cantidades
    /*cantProd = parseInt(
      prompt("Ingrese la cantidad a comprar (máximo 5 unidades): ") //*se alamcena la cantidad en la variale global
    );*/
/*let _cantProducto = parseInt(document.getElementById("cantProducto").value);
    if (_cantProducto <= 5 && _cantProducto > 0) {
      alert("Cantidad de unidades seleccionadas: " + _cantProducto);
    } else {
      alert("La cantidad ingresada es incorrecta");
      return (_cantProducto = 0);
    }
  } else {
    alert("El producto ingresado no existe"); //*Se responde si el producto no es válido
    return (cantProd = 0);
  }
}*/

//*Función para ingresar accesorios
function definAcc(e) {
  //Se recibe la cantidad de unidades
  //if (_cantProd != 0) {
  //Si el producto fue validad y la cantidad no es cero se procede con los accesorios
  //let agregaAcc = prompt("Desea agregar un accesorio? Escriba S ó N");
  //   if (agregaAcc == "S") {
  //     while (agregaAcc == "S") {
  //*bucle para el ingreso de aacesorios
  //let _tipoAcce = prompt("Que accesorio desea agregar? Escriba A, B o C");

  let hijo = e.target;
  let padre = hijo.parentNode;
  console.log(hijo);
  console.log(padre);

  let _tipoAcce = padre.firstChild.textContent;
  if (_tipoAcce == "Puerta") {
    console.log("Ha seleccionado el accesorio A");
    aCant[0] = aCant[0] + 1; //suma cantidad
    accesoriosAgregados.push(accesorio1); //suma al array
    cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == "Estante") {
    console.log("Ha seleccionado el accesorio B");
    aCant[1] = aCant[1] + 1;
    accesoriosAgregados.push(accesorio2);
    cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == "Rueda") {
    console.log("Ha seleccionado el accesorio C");
    aCant[2] = aCant[2] + 1;
    accesoriosAgregados.push(accesorio3);
    cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else {
    alert("Entrada inválida"); //*El accesorio seleccionado no existe
    console.log("Selección de accesorio invalida");
    agregaAcc = ""; //*fuerza la salida del bucle al ingreso de opción incorrecta
  }
  //}
  //tipoAcce(aCant); //determina los tipos de accesorios definidos
  listaAcceAgregados(_tipoAcce); //muestra accesorios seleccionados en HTML

  //} else if (agregaAcc == "N") {
  //*Si no se desea agregar accesorios
  //alert("No agregó accesorios!");
  //  console.log("No agrega accesorios");
  //}
  //Si se ingresa una opción incorrecta
  //else {
  //  alert("Opción incorrecta, no agrega accesorios!"); //*Si la respuesta no es S o N
  //}
  //}
  //*No se puede agregar accesorios porque no hay productos validados
  //else {
  //  alert("No se pueden agregar accesorios!!!");
  //}
  //se muestra por consola la cantidad de cada accesorio seleccionado
  console.log("Accesorios del tipo A seleccionados: " + aCant[0]);
  console.log("Accesorios del tipo B seleccionados: " + aCant[1]);
  console.log("Accesorios del tipo C seleccionados: " + aCant[2]);
}

//Función para definir tipos de accesorios seleccionados
/*function tipoAcce(_aCant) {
  const filtro = _aCant.filter((elemento) => elemento != 0); //Elimina elemento si hay cantidad cero
  let accesCant = filtro.length;
  if (accesCant == 1) {
    alert("Agrego un tipo de accesorio!");
  } else if (accesCant == 2) {
    alert("Agrego un total de dos tipos de accesorios!");
  } else if (accesCant == 3) {
    alert("Agrego un total de tres tipos de accesorios!");
  } else {
    alert("No agrego accesorios!");
  }
}*/

//*Función para calcular el costo total
function costoTotal(_producto) {
  //*
  if (cantProd == 0) {
    //*Producto y cantidad invalidada
    console.log("No ha ingresado productos o cantidades válidas");
  } else if (_producto == "ALACENA") {
    _total =
      cantProd * mueble1.precio +
      accesorio1.precio * aCant[0] +
      accesorio2.precio * aCant[1] +
      accesorio3.precio * aCant[2];
    //se define objeto de compra
    let compra1 = new compra(
      producto,
      cantProd,
      aCant[0] + aCant[1] + aCant[2]
    );
    compra1.showProducto();
    compra1.showAccesorio();
    listaProdAgregados();

    alert("EL valor total a pagar es de: " + _total);
  } else if (_producto == "RACKTV") {
    _total =
      cantProd * mueble2.precio +
      accesorio1.precio * aCant[0] +
      accesorio2.precio * aCant[1] +
      accesorio3.precio * aCant[2];
    //se define objeto de compra
    let compra1 = new compra(
      producto,
      cantProd,
      aCant[0] + aCant[1] + aCant[2]
    );
    compra1.showProducto();
    compra1.showAccesorio();
    listaProdAgregados();

    alert("EL valor total a pagar es de: " + _total);
  } else if (_producto == "PLACARD") {
    _total =
      cantProd * mueble3.precio +
      accesorio1.precio * aCant[0] +
      accesorio2.precio * aCant[1] +
      accesorio3.precio * aCant[2];
    //se define objeto de compra
    let compra1 = new compra(
      producto,
      cantProd,
      aCant[0] + aCant[1] + aCant[2]
    );
    compra1.showProducto();
    compra1.showAccesorio();
    listaProdAgregados();

    alert("El valor total a pagar es de: " + _total);
  } else {
    console.log("Los datos ingresados son incorrectos!"); //*Mensaje final de procedimiento incorrecto
  }
}

//*Ejecución del programa
//armarListaProd();
//armarListaAcce();
//validacion((producto = seleccion()));
//cantidad(valido);
//definAcc(cantProd);
//costoTotal(producto);
