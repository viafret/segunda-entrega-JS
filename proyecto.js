//*selección y cálculo del valor de los productos a adquirir
let productos = 0; //* Variable para la cantidad de productos
//let cantProd; //*Variable para la cantidad de productos a adquirir
let cantiAcces = 0; //Variable de total de accesorios agregados

//Definición clase objeto mueble que permite identificarlo, darle precio y verificar si dispone de accesorios
class mueble {
  constructor(id, nombre, precio, cantidad, stock, accesorios) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.accesorios = accesorios;
    this.precio = precio;
    this.stock = stock;
  }
  //método para mostrar el stock del objeto
  getStock = function () {
    if (this.stock > 0) {
      this.stock--;
      return true;
    } else {
      return false;
    }
  };

  mostrarPrec() {
    alert(this.nombre + " cuesta $ " + this.precio + " con IVA incluido");
  }
  //método para mostrar si se puede añadir accesorios
  mostrarAcc() {
    alert(this.nombre + " " + this.accesorios + " puede agregar accesorios: ");
  }
}

//Se agregan los datos de tres tipos de productos
let mueble1 = new mueble(1, "ALACENA", 9000, 0, 20, "S");
let mueble2 = new mueble(2, "RACKTV", 1000, 0, 20, "N");
let mueble3 = new mueble(3, "PLACARD", 20000, 0, 20, "S");

//array de muebles disponibles
let mueblesDisp = [mueble1, mueble2, mueble3];
//console.log(mueblesDisp);

//array carrito de muebles
let carritoMuebles = [];

//funcion para armar lista de Prductos en el HTML
function armarListaProd() {
  let lista = document.querySelector(".seccionProductos");
  console.log(lista);
  for (const muebles of mueblesDisp) {
    let bloque = document.createElement("div");
    let texto1 = document.createElement("h4");
    let texto2 = document.createElement("p");
    let boton = document.createElement("a");
    texto1.innerHTML = `${muebles.nombre}`;
    texto2.innerHTML = `Valor: $  ${muebles.precio}`;
    boton.innerHTML = `Agregar`;
    boton.href = `#`;
    boton.className = `lista__productos--botonAgregar`;
    lista.appendChild(bloque);
    bloque.appendChild(texto1);
    bloque.appendChild(texto2);
    bloque.appendChild(boton);
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

//eliminar producto seleccionado
function eliminarProd(e) {
  let hijo = e.target;
  let padre1 = hijo.parentNode;
  let padre2 = hijo.parentNode.parentNode;
  let vacio = padre2.childElementCount; //número de elementos agregados
  //console.log(vacio);
  //console.log(padre1);
  //console.log(padre2);

  //si en la lista hay más de un producto agregado
  if (vacio > 1) {
    console.log("Quiere eliminar el producto!");
    console.log(hijo);
    padre2.removeChild(padre1);
    productos--;
  }
  //si en la lista hay solo un producto agregado
  else {
    console.log(hijo);
    padre2.removeChild(padre1);
    let agregados = document.getElementById("listaProductosAgregados");
    let sinProducto = document.createElement("p");
    sinProducto.innerHTML = `No agregó productos!`; //al eliminar el unico producto se agrega el texto original
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
  let lista = document.querySelector(".seccionAccesorios");
  for (const accesorio of accesoriosDisp) {
    let bloque = document.createElement("div");
    let texto1 = document.createElement("h4");
    let texto2 = document.createElement("p");
    let boton = document.createElement("a");
    texto1.innerHTML = `${accesorio.nombre}`;
    texto2.innerHTML = `Color: ${accesorio.color} Valor: $ ${accesorio.precio}`;
    boton.innerHTML = `Agregar`;
    boton.href = `#`;
    boton.className = `lista__accesorios--botonAgregar`;
    lista.appendChild(bloque);
    bloque.appendChild(texto1);
    bloque.appendChild(texto2);
    bloque.appendChild(boton);
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

//Definición clase compra que identifica el tipo y cantidad del producto
class compra {
  constructor(muebles, cantidad, total) {
    this.muebles = muebles;
    this.cantidad = cantidad;
    this.total = total;
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
  let hijo = e.target;
  let padre = hijo.parentNode;
  console.log(hijo);
  console.log(padre);

  //let _producto = document.getElementById("producto").value;
  let _producto = padre.firstChild.textContent;

  if (_producto == mueblesDisp[0].nombre) {
    carritoMuebles.push(mueble1); //suma al array
    productos++;
    mueble1.cantidad++;
    //compra.addItem(mueble1);
  } else if (_producto == mueblesDisp[1].nombre) {
    carritoMuebles.push(mueble2); //suma al array
    productos++;
    mueble2.cantidad++;
    //compra.addItem(mueble2);
  } else if (_producto == mueblesDisp[2].nombre) {
    carritoMuebles.push(mueble3); //suma al array
    productos++;
    mueble3.cantidad++;
    //compra.addItem(mueble3);
  } else {
    alert("Entrada inválida"); //* no existe
    console.log("Selección invalida");
  }

  //carritoMuebles.push(_producto);
  //productos++;
  console.log(carritoMuebles);

  listaProdAgregados(_producto);
  sumar();

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

/*Función para validar y mostrar el valor del producto
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
}*/

//Función para ingresar accesorios
function definAcc(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;
  console.log(hijo);
  console.log(padre);

  let _tipoAcce = padre.firstChild.textContent;

  if (_tipoAcce == accesoriosDisp[0].nombre) {
    //console.log("Ha seleccionado el accesorio A");
    aCant[0] = aCant[0] + 1; //suma cantidad
    accesoriosAgregados.push(accesorio1); //suma al array
    cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == accesoriosDisp[1].nombre) {
    //console.log("Ha seleccionado el accesorio B");
    aCant[1] = aCant[1] + 1;
    accesoriosAgregados.push(accesorio2);
    cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == accesoriosDisp[2].nombre) {
    //console.log("Ha seleccionado el accesorio C");
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
  sumar();

  console.log("Accesorios del tipo A seleccionados: " + aCant[0]);
  console.log("Accesorios del tipo B seleccionados: " + aCant[1]);
  console.log("Accesorios del tipo C seleccionados: " + aCant[2]);
}

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

//Ejecución del programa
let carrito;

/* Revisamos que no haya un carrito guardado en storage*/
if (sessionStorage.cart == undefined) {
  carrito = new compra();
} else {
  /* Si existe un carrito, entonces lo sacasmo del Storage*/
  carritoSS = JSON.parse(sessionStorage.cart);
  carrito = new Cart(carritoSS.name, carritoSS.items, carritoSS.total);
  actualizar();
}

//
function sumar() {
  let total = document.getElementById("total");
  let sumaMuebles =
    mueble1.cantidad * mueble1.precio +
    mueble2.cantidad * mueble2.precio +
    mueble3.cantidad * mueble3.precio;
  let sumAccesorios =
    aCant[0] * accesorio1.precio +
    aCant[1] * accesorio2.precio +
    aCant[2] * accesorio3.precio;
  let totalSuma = sumAccesorios + sumaMuebles;
  console.log(totalSuma);
  total.textContent = `Total: ${totalSuma}$`;
}
// console.log(carrito.total);
// console.log(carrito);

//sessionStorage.cart = JSON.stringify(carrito);

// Para actualizar el precio del total

//armarListaProd();
//armarListaAcce();
//validacion((producto = seleccion()));
//cantidad(valido);
//definAcc(cantProd);
//costoTotal(producto);
