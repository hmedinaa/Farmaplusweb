document.getElementById("formVenta").addEventListener("submit", function (e) {
    e.preventDefault();

    let producto = document.getElementById("producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;

    if(producto === "" || cantidad <= 0 || precio <= 0){
        document.getElementById("mensaje").innerText = "Completa todos los campos correctamente";
        return;
    }

    let total = cantidad * precio;

    document.getElementById("mensaje").innerText = 
        `Venta registrada: ${cantidad} x ${producto} = S/.${total}`;
});
