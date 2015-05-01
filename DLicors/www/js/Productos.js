var Carrito = [];

$(document).on("pageshow", "#Productos", function () {
    $.mobile.loading("show", {
        text: "Cargando Productos...",
        textVisible: true,
        theme: "b",
        html: ""
    });
    setTimeout(function () {
        var Ciudad = getCiudad();
        var url = getWebApi() + "productsByCity/"+Ciudad;
        loadDataArray(url);
        //CargarFooter("#ComerciosxCategoriasMall");
        
    }, 2000);
});

function CargarProductos(AProductos)
{
    
    var htmlProductos = ""
    var Carrito = localStorage["Carrito"];
    var TotalPedido = localStorage["TotalPedido"];

    if (TotalPedido == "" || TotalPedido == undefined)
    {
        $("#TotalPedidoPar").html("0");
    }
    else
    {
        $("#TotalPedidoPar").html(TotalPedido);
    }

    $.each(AProductos, function (index, item) {

        if (Carrito == "" || Carrito == undefined)
        {
            htmlProductos += '<div id="' + item._id + '" onclick="SeleccionoImagen(this)" class="productos" data-select="false" data-nombre="' + item.Name + '" data-valor="' + item.UnitValue + '"><img src="' + getRecursos() + 'Productos/' + item._id + '.jpg"><p>' + item.Name + '</p><h3>' + item.UnitValue + '</h3></div>';
        }
        else
        {
            var seleccionado = false;
            var ACarrito = JSON.parse(Carrito);
            $.each(ACarrito, function (index, itemCarrito) {
                if(itemCarrito.idProducto == item._id)
                {
                    htmlProductos += '<div id="' + item._id + '" onclick="SeleccionoImagen(this)" class="productos" data-select="true" data-nombre="' + item.Name + '" style="border-color: yellow;border-collapse: inherit;border-style: inset;box-shadow: 0px 0px 20px 5px !important; width: auto;display: inline-block !important;" data-valor="' + item.UnitValue + '"><img src="' + getRecursos() + 'Productos/' + item._id + '.jpg"><p>' + item.Name + '</p><h3>' + item.UnitValue + '</h3></div>';
                    seleccionado = true;
                }
            });

            if(!seleccionado)
            {
                htmlProductos += '<div id="' + item._id + '" onclick="SeleccionoImagen(this)" class="productos" data-select="false" data-nombre="'+ item.Name +'" data-valor="' + item.UnitValue + '"><img src="' + getRecursos() + 'Productos/' + item._id + '.jpg"><p>' + item.Name + '</p><h3>' + item.UnitValue + '</h3></div>';
            }
        }
        
    });

    $('#ContenedorProductos').html(htmlProductos);
    $.mobile.loading("hide");
}

function SeleccionoImagen(div)
{
    var Divcito = $(div);
    var Seleccionado = Divcito.attr("data-select");

    if(Seleccionado == "true")
    {
        var id = Divcito.attr("id");
        Divcito.attr("data-select","false");
        Divcito.attr("style","");
        var Productos = JSON.parse(localStorage["Carrito"]);
        var TotalActual = $("#TotalPedidoPar").html();
        $.each(Productos, function(index, item){
            if(item.idProducto == id)
            {
                var ValorRestar = item.ValorProducto * item.Cantidad;
                var ValorFinal = parseInt(TotalActual) - ValorRestar;
                $("#TotalPedidoPar").html(ValorFinal);
                localStorage["TotalPedido"] = ValorFinal;
                delete Productos[index];
            }
        });

        if(Productos.length == 0)
        {
            localStorage["Carrito"] = "";
        }
        else
        {
            var String = JSON.stringify(Productos);
            String = String.replace(",null", "");
            String = String.replace("[null]", "");
            String = String.replace("null,", "");
            localStorage["Carrito"] = String;
        }
    }
    else
    {
        Divcito.attr("data-select","true");
        Divcito.attr("style", "border-color: yellow;border-collapse: inherit;border-style: inset;-moz-box-shadow: 0px 0px 20px 5px !important;-webkit-box-shadow: 0px 0px 20px 5px !important;box-shadow: 0px 0px 20px 5px !important; width: auto;display: inline-block !important;");
        var Cantidad = prompt("Introduzca la cantidad. Solo Numeros", "");

        while (parseFloat(Cantidad) != Cantidad) {
            alert('Por favor introducir solo numeros.')
            Cantidad = prompt('Introduzca la cantidad. Solo Numeros', '');
        }

        var Obj = {
            idProducto: Divcito.attr("id"),
            Name: Divcito.attr("data-nombre"),
            ValorProducto: parseInt(Divcito.attr("data-valor")),
            Cantidad: parseInt(Cantidad)
        };

        var Productos = localStorage["Carrito"];

        if(Productos == "" || Productos == undefined)
        {
            Carrito = [];
            Carrito.push(Obj);	
        }
        else
        {
            Carrito = JSON.parse(Productos);
            Carrito.push(Obj);
        }
        var ValorTotal = 0;
        $.each(Carrito, function (index, item) {
            var ValorParcial = item.ValorProducto * item.Cantidad;
            ValorTotal += ValorParcial;
        });

        $("#TotalPedidoPar").html(ValorTotal);
        localStorage["Carrito"] = JSON.stringify(Carrito);
        localStorage["TotalPedido"] = ValorTotal;
    }
}
