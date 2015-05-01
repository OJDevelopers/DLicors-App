function insertDataArray(objectUser, url) {
    //$.support.corps = true;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(objectUser),
        crossDomain: true,
        async: true,
        success: function (msg) {
            if (msg) {
                console.log("objeto ingresado en BD suscriptores");
                console.log(objectUser);
                if ($.mobile.activePage.is('#Carrito')) {
                    alert("Se ingreso su pedido correctamente.\nEn un lapso de 20 a 30 minutos llegara su pedido.");
                    $.mobile.loading("hide");
                    localStorage["Carrito"] = "";
                    localStorage["TotalPedido"] = 0;
                    $.mobile.changePage('#Pedidos', 'slide');
                }
                else if ($.mobile.activePage.is('#Registro'))
                {
                    alert("Se registro correctamente.");
                    $.mobile.loading("hide");
                    VerificarRegistro1();
                    $.mobile.changePage('#Index', 'slide');
                }
                
            } else {
                console.log("error " + msg);
                alert("No fue posible regitrarlo en el portal!\nPor favor intentelo nuevamente mas tarde.");
                $.mobile.loading("hide");
            }
        },
        error: function (msg) {

            alert(JSON.stringify(msg.error()));
        }
    });

}

function UpdateData(url, objectUser){
    $.ajax({
        type: "PUT",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(objectUser),
        crossDomain: true,
        async: true,
        success: function (msg) {
            if (msg) {
                console.log("objeto ingresado en BD suscriptores");
                console.log(objectUser);
                if ($.mobile.activePage.is('#Pedidos')) {
                    alert("Su pedido fue cancelado correctamente");
                    $.mobile.loading("hide");
                    localStorage["Carrito"] = "";
                    localStorage["TotalPedido"] = 0;
                }
                else if ($.mobile.activePage.is('#Registro'))
                {
                    alert("Se registro correctamente.");
                    $.mobile.loading("hide");
                    VerificarRegistro1();
                    $.mobile.changePage('#Index', 'slide');
                }
                
            } else {
                console.log("error " + msg);
                alert("No fue posible regitrarlo en el portal!\nPor favor intentelo nuevamente mas tarde.");
                $.mobile.loading("hide");
            }
        },
        error: function (msg) {

            alert(JSON.stringify(msg.error()));
        }
    });

}

//url= direccion uri de la consulta
function loadDataArray(url,accion) {

    try {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: true,
            isLocal: true,
            success: function (results) {

                if ($.mobile.activePage.is('#Productos'))
                {
                    CargarProductos(results);
                }
                else if ($.mobile.activePage.is('#Pedidos'))
                {
                    if (accion == "CancelarPedido")
                    {

                    }
                    else
                    {
                        CargarPedidos(results);
                    }
                    
                }
                else if ($.mobile.activePage.is('#Registro')) {
                    CargarCiudadesRegistro(results);
                }

                if (accion == "Registro") {
                    VerificarRegistro2(results);
                }
                
            },
            error: function (msg) {

                ServiceFailed(msg);

            }
        });
    }
    catch (err) {
        //alert(err.message);
    }
}

function ServiceFailed(xhr) {

    /*if (xhr.responseText) {

        var err = xhr.responseText;
    if (err)
    {

        //alert('Error: ' + err);
    }
    else
    {

        //alert("Message: Unknown server error.");
    }
    return;*/
}