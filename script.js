class Producto {
    constructor(id, nombre, precio, cantidad,img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.img=img
    }

    aumentarCantidad() {
        this.cantidad += 1;
    }

    calcularSubtotal() {
        return this.cantidad * this.precio;
    }
}
class ProductoFisico extends Producto{
    constructor(id, nombre, precio, cantidad, img, peso){
        super(id, nombre, precio, cantidad,img)
       this.peso=peso
       
    }
    infoEspecifica(){
        return `PESO:${this.peso} g`
        }
}
class ProductoDigital extends Producto{
    constructor(id, nombre, precio, cantidad, img, formato){
        super(id,nombre, precio, cantidad,img)
        this.formato=formato
    }
    infoEspecifica(){
    return `FORMATO:${this.formato} `
    }
}

let productos = [
    new ProductoFisico(0, "Ariculares Smartlife", 20000, 1, "img/x1.png",300),
    new ProductoFisico(1, "Mouse Rap9", 140000, 1, "img/x2.png",100),
    new ProductoFisico(2, "Mouse Logitech", 40000, 1, "img/x3.png",150),
    new ProductoFisico(3, "Teclado gamer", 50000, 1, "img/x4.png",200),
    new ProductoFisico(4, "Monitor LG Generación Z", 799999, 1, "img/x5.png",1000),
    new ProductoFisico(5, "Teclado Evga Z12", 240000, 1, "img/x6.png",250),
    new ProductoFisico(6, "Auriculares JBL", 61000, 1, "img/x7.png",250),
    new ProductoFisico(7, "Monitor LG UltraGear", 1999999, 1, "img/x8.png",800),
    new ProductoDigital(8,"Plantilla De Diseño Web",10000,1,"img/plantilla.png","PSD"),
    new ProductoDigital(9,"Curso Javascript",30000,1,"img/javascript.png","MP4"),
    new ProductoDigital(10,"Ebook",15000,1,"img/Ebook.png","PDF")
];


class Carrito {
    constructor() {
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        this.productos.forEach((producto) => {
            total += producto.calcularSubtotal();
        });
        return total;
    }

    agregarProducto(id) {
        const producto = productos.find((producto) => producto.id === id);
        if (producto) {
            const productoEnCarrito = this.productos.find((p) => p.id === id);
            if (productoEnCarrito) {
                productoEnCarrito.aumentarCantidad();
            } else {
                this.productos.push(producto);
            }
            mostrarProductosCarrito(); 
        } else {
            console.log("No se encontró el producto");
        }
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }

    vaciarCarrito() {
        this.productos = [];
        productos.forEach((producto)=>{
            producto.cantidad=1
        }
    )
    }
}


const carrito = new Carrito();

function mostrarProductos() {
   
    const htmlProductos = document.getElementById("cajitaconProductos");
    htmlProductos.innerHTML = '';
    productos.forEach((producto) => {
        htmlProductos.innerHTML += `
        <div class="producto">
            <span class="titulo-producto">${producto.nombre}</span>
            <img src="${producto.img}" alt="Imagen de ${producto.nombre}" class="imagen-producto">
            <p class="informacion">${producto.infoEspecifica()}</p>
            <span class="precio-producto">$${producto.precio}</span>
            <button class="boton-item" data-id="${producto.id}">Comprar</button>
        </div>`;
        
    });

    const botonesComprar = document.querySelectorAll('.boton-item');//esto devuele un nodolist  que en este caso esta almacenando 
                                                                // todos los elementos que tengan la clase boton-item,este nodolist se manekar como si fuera un array 
                                                                 //por eso despues lo itero con un foreach 
    botonesComprar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const idProducto = parseInt(boton.getAttribute('data-id'));//obtengo el valor del atributo data-id del boton y 
                                                                            //lo convierto en numero(parseInt) y el atributo 10 es la base decimal para que no haya complicaciones 
                                                                             //al momento de convertir el string en number
            carrito.agregarProducto(idProducto);
            mostrarProductosCarrito();
            mostrarTotalCarrito();
        });
    });
}

function mostrarTotalCarrito(){
    let HTMLTotalCarrito=document.getElementById("totalCarrito")
    HTMLTotalCarrito.innerHTML=`<h3>TOTAL:$${carrito.calcularTotal()} </h3>`
}

function mostrarProductosCarrito() {
    const htmlCarrito = document.getElementById("tablaProductosCarrito");
    htmlCarrito.innerHTML = '';
    
    carrito.productos.forEach((producto) => {
        htmlCarrito.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.calcularSubtotal()}</td>
            <td><button class="boton-eliminar" data-id="${producto.id}">x</button></td>
        </tr>`;
    });


    const botonesEliminar = document.querySelectorAll('.boton-eliminar');//esto devuele un nodolist  que en este caso esta almacenando 
                                                                            // todos los elementos que tengan la clase boton-eliminar,este nodolist se manejar como si fuera un array 
                                                                            //por eso depues lo itero con un foreach 
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const idProducto = parseInt(boton.getAttribute('data-id'));//obtengo el valor del atributo data-id del boton y 
                                                                          
            carrito.eliminarProducto(idProducto);
            mostrarProductosCarrito();
            mostrarTotalCarrito();
        });
    });

    mostrarTotalCarrito(); 
}

const btn_comprar=document.getElementById("comprar")
const btn_vaciarCarrito=document.getElementById("vaciarCarrito")
btn_comprar.addEventListener('click',()=>{
    btnComprar()
    carrito.vaciarCarrito()
    mostrarProductosCarrito()
    mostrarTotalCarrito()
})
btn_vaciarCarrito.addEventListener('click',()=>{
    carrito.vaciarCarrito() 
    mostrarProductosCarrito()
    mostrarTotalCarrito()
    
})
function btnComprar(){
    return alert(`FELICIADADES SU COMPRA DE $${carrito.calcularTotal()} FUE HECHA CON EXITO`)
}
mostrarProductos(); 
mostrarProductosCarrito(); 