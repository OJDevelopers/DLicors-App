$(document).on("pageshow", "#Carrito", function () {
    $.mobile.loading("show", {
        text: "Cargando Carrito...",
        textVisible: true,
        theme: "b",
        html: ""
    });
    setTimeout(function () {
        CargarInfoCarrito();
        //CargarFooter("#ComerciosxCategoriasMall");

    }, 2000);
});

function CargarInfoCarrito()
{
    var Carrito = JSON.parse(localStorage["Carrito"]);
    var ValorPedido = localStorage["TotalPedido"];
    var htmlCarrito = "";

    if(Carrito.length == 0)
    {
        htmlCarrito = "No tienes productos en el carrito.";
    }
    else
    {
        htmlCarrito = "<tr><th>Producto</th> <th>Cantidad</th><th>Precio</th></tr>";
        $.each(Carrito, function (index, item) {
            htmlCarrito += "<tr><td>" + item.Name + "</td> <td>" + item.Cantidad + "</td><td>" + item.ValorProducto + "</td></tr>";
        });
    }

    $("#ContendorProductosCarrito").html(htmlCarrito);
    var hola = $("#ContenedorPrecioFinal");
    $("#ContenedorPrecioFinal").html(ValorPedido);

    var Domicilios = getDomicilios();
    var options = "<option value=''></option>";

    $.each(Domicilios, function (index, item) {
        options += "<option value='"+ item._id +"'>"+ item.name +"</option>"
    });

    $("#SelectDomicilio").html(options);

    $.mobile.loading("hide");
}

function ConfirmarOrden()
{
    $.mobile.loading("show", {
        text: "Generando Pedido...",
        textVisible: true,
        theme: "b",
        html: ""
    });

    var f = new Date();
    var OrdenNumbers = getIdUsuario() + f.getDate() + (f.getMonth() + 1) + f.getFullYear();
    var Objeto = {
        "OrdenNumber": OrdenNumbers,
        "User": {
            "Id": getIdUsuario(),
            "Name": "",
            "PersonalId": "",
            "TelephoneNumber": ""
        },
        "Products": [],
        "Geo": {
            "Lat": getLatitud(),
            "Long": getLongitud(),
            "Country": "",
            "Province": "",
            "City": getCiudad()
        },
        "PaymentType": "1",
        "Place": $("#SelectDomicilio").val(),
        "InfoControl":
        [{
            "UserCreated": getIdUsuario(),
            "userModified": getIdUsuario()
        }],
        "State": "1"
    }

    var Carrito = JSON.parse(localStorage["Carrito"]);
    if (Carrito.length == 0)
    {
        alert('No tienes productos en el carrito.');
    }
    else
    {
        $.each(Carrito, function (index, item) {
            var obj = {
                "Id": item.idProducto,
                "Name": item.Name,
                "Amount": item.Cantidad,
                "UnitValue": item.ValorProducto
            }
            Objeto.Products.push(obj)
        });

        var Domicilio = $("#SelectDomicilio").val();

        if (Domicilio == "")
        {
            alert('Para generar el pedido debes seleccionar el domicilio.');
            $.mobile.loading("hide");
        }
        else
        {
            var url = getWebApi() + "Orders";
            var j = JSON.stringify(Objeto);
            console.log(Objeto);
            insertDataArray(Objeto, url);
        }
    }
}