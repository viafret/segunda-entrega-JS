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
  /*getStock = function () {
    if (this.stock > 0) {
      this.stock--;
      return true;
    } else {
      return false;
    }
  }*/

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
let mueble2 = new mueble(2, "RACKTV", 10000, 0, 20, "N");
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
    //console.log(boton);
  }
  //determinamos si hay productos en la sesion
  productoAlmacenado();
}

//funcion para determinar datos cargados en el sesión
function productoAlmacenado() {
  if (sessionStorage.productosLocal == undefined) {
    actualizarProductos();
  } else {
    /* Si existe un carrito, entonces lo sacasmo del Storage*/
    //Obtenemos el listado de productos almacenado
    const almacenados = JSON.parse(localStorage.getItem("productosLocal"));
    //Iteramos almacenados con for...of para transformar todos sus objetos a tipo producto.
    //for (const objeto of almacenados)

    mueble1.cantidad = almacenados[0].cantidad;
    mueble2.cantidad = almacenados[1].cantidad;
    mueble3.cantidad = almacenados[2].cantidad;

    //se crea la lista de productos almacenados
    for (const cantidades of mueblesDisp) {
      if ((cantidades.cantidad = !0)) {
        for (i = 0; i < cantidades.cantidad; i++) {
          listaProdAgregados(cantidades.nombre);
        }
      } else {
        return;
      }

      //productos.push(new Producto(objeto));
      //Ahora tenemos objetos productos y podemos
    }
  }
}

//actualizamos con JSON los datos y guardamos en la sesión
function actualizarProductos() {
  const productosLocal = (clave1, valor1) => {
    sessionStorage.setItem(clave1, valor1);
  };
  //Almacenar producto por producto
  for (const producto of mueblesDisp) {
    productosLocal(producto.id, JSON.stringify(producto));
  }
  productosLocal(accesorio1.nombre, JSON.stringify(aCant[0]));
  productosLocal(accesorio2.nombre, JSON.stringify(aCant[1]));
  productosLocal(accesorio3.nombre, JSON.stringify(aCant[2]));
}

//funcion para armar lista de Productos agregados para compra en el HTML
function listaProdAgregados(_producto) {
  let agregado = document.getElementById("listaProductosAgregados");
  let sinProducto = document.getElementById("sinProducto");
  let producto = document.createElement("p");
  let boton = document.createElement("a"); //eliminar producto seleccionado
  boton.href = `#`;
  boton.className = `lista__productos--botonEliminar`;
  let prodAdd = mueble1.cantidad + mueble2.cantidad + mueble3.cantidad;
  if (prodAdd == 1) {
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
  for (let boton of botEliminarProd) {
    boton.addEventListener("click", eliminarProd);
  }
}

//eliminar producto seleccionados de la lista
function eliminarProd(e) {
  let hijo = e.target;
  let padre1 = hijo.parentNode;
  let padre2 = hijo.parentNode.parentNode;
  let vacio = padre2.childElementCount; //número de elementos agregados

  //si en la lista ya hay un producto agregado
  if (vacio > 1) {
    console.log("Quiere eliminar el producto!");
    padre2.removeChild(padre1);
  }
  //si en la lista hay solo un producto agregado
  //se vuelve a colocar el páarafo "No agregó productos!
  //al eliminarlo
  else {
    console.log(hijo);
    padre2.removeChild(padre1);
    let agregados = document.getElementById("listaProductosAgregados");
    let sinProducto = document.createElement("p");
    sinProducto.innerHTML = `No agregó productos!`; //al eliminar el unico producto se agrega el texto original
    sinProducto.id = `sinProducto`;
    agregados.appendChild(sinProducto);
    console.log(padre1.firstChild.data);
  }
  //función para modificar cantidades
  descartar(padre1.firstChild.data);
  //se hace el nuevo cálculo y actualiza valor total
  sumar();
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
    let texto1 = document.createElement("h4"); //nombre accesorio
    let texto2 = document.createElement("p"); //precio
    let boton = document.createElement("a"); //link agregar
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
  //determinamos si hay accesorios en la sesion
  accesorioAlmacenado();
}
//funcion para determinar accesorios cargados en el sesión
function accesorioAlmacenado() {
  if (sessionStorage.accesoriosLocal == undefined) {
    actualizarProductos();
  } else {
    /* Si existe, entonces lo sacasmo del Storage*/
    //Obtenemos el listado de productos almacenado
    const almacenados = JSON.parse(localStorage.getItem("productosLocal"));

    aCant[0] = almacenados[4];
    aCant[1] = almacenados[5];
    aCant[2] = almacenados[6];
    //productos.push(new Producto(objeto));
    //se crea la lista de accesorios almacenados
    for (index = 0; index < 3; index++) {
      if ((aCant[index] = !0)) {
        for (i = 0; i < aCant[index]; i++);
        listaAcceAgregados(accesoriosDisp[index].nombre);
      } else {
        return;
      }
    }
  }
  //for (i= cantidades of aCant) {
}

//funcion para armar lista de accesorios agregados para compra en HTML
function listaAcceAgregados(_tipoAcce) {
  let agregado = document.getElementById("listaAccesoriosAgregados");
  let sinAccesorio = document.getElementById("sinAccesorio");
  let accesorio = document.createElement("p");
  let boton = document.createElement("a"); //eliminar accesorio seleccionado
  boton.href = `#`;
  boton.className = `lista__accesorios--botonEliminar`;
  let accesAdd = aCant[0] + aCant[1] + aCant[2];
  if (accesAdd == 1) {
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

    //cantiAcces--;
  } else {
    console.log(hijo);
    padre2.removeChild(padre1);
    let agregados = document.getElementById("listaAccesoriosAgregados");
    let sinAccesorio = document.createElement("p");
    sinAccesorio.innerHTML = `No agregó accesorios!`;
    sinAccesorio.id = `sinAccesorio`;
    agregados.appendChild(sinAccesorio);
    //cantiAcces--;
  }
  console.log(vacio);
  descartarAcce(padre1.firstChild.data);
  sumar();
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
    //productos++;
    mueble1.cantidad++;
    //compra.addItem(mueble1);
  } else if (_producto == mueblesDisp[1].nombre) {
    carritoMuebles.push(mueble2); //suma al array
    //productos++;
    mueble2.cantidad++;
    //compra.addItem(mueble2);
  } else if (_producto == mueblesDisp[2].nombre) {
    carritoMuebles.push(mueble3); //suma al array
    //productos++;
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
}

//función para descartar el producto
function descartar(_producto) {
  if (_producto == mueblesDisp[0].nombre) {
    //productos--;
    mueble1.cantidad--;
    //compra.addItem(mueble1);
  } else if (_producto == mueblesDisp[1].nombre) {
    //productos--;
    mueble2.cantidad--;
    //compra.addItem(mueble2);
  } else if (_producto == mueblesDisp[2].nombre) {
    //productos--;
    mueble3.cantidad--;
    //compra.addItem(mueble3);
  } else {
    alert("Entrada inválida"); //* no existe
    console.log("Selección invalida");
  }
}

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
    //cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == accesoriosDisp[1].nombre) {
    //console.log("Ha seleccionado el accesorio B");
    aCant[1] = aCant[1] + 1;
    accesoriosAgregados.push(accesorio2);
    //cantiAcces++;
    //agregaAcc = prompt("Desea agregar otro accesorio? Escriba S ó N");
  } else if (_tipoAcce == accesoriosDisp[2].nombre) {
    //console.log("Ha seleccionado el accesorio C");
    aCant[2] = aCant[2] + 1;
    accesoriosAgregados.push(accesorio3);
    //cantiAcces++;
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

//función para descartar el accesorio
function descartarAcce(_accesorio) {
  if (_accesorio == accesoriosDisp[0].nombre) {
    cantiAcces--;
    aCant[0]--;
    //compra.addItem(mueble1);
  } else if (_accesorio == accesoriosDisp[1].nombre) {
    cantiAcces--;
    aCant[1]--;
    //compra.addItem(mueble2);
  } else if (_accesorio == accesoriosDisp[2].nombre) {
    cantiAcces--;
    aCant[2]--;
    //compra.addItem(mueble3);
  } else {
    alert("Entrada inválida"); //* no existe
    console.log("Selección invalida");
  }
}

//funcion para calcular el monto total
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
  actualizarProductos();
  //actualizarAccesorios();
}

// console.log(carrito.total);
// console.log(carrito);

//sessionStorage.cart = JSON.stringify(carrito);

// Para actualizar el precio del total

//armarListaProd();
//armarListaAcce();
