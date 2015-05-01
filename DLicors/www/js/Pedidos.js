$(document).on("pageshow", "#Pedidos", function () {
    $.mobile.loading("show", {
        text: "Cargando tus pedidos...",
        textVisible: true,
        theme: "b",
        html: ""
    });
    setTimeout(function () {
        var Ciudad = getCiudad();
        var url = getWebApi() + "Orders";
        loadDataArray(url);
        //CargarFooter("#ComerciosxCategoriasMall");

    }, 2000);
});

function CargarPedidos(APedidos)
{
    var iduser = getIdUsuario();
    var HtmlPedidosPendientes = "<tr><th>Orden</th><th>Cant. Productos</th><th>Precio</th><th></th></tr>";
    var HtmlPedidosDespachados = "<tr><th>Orden</th><th>Cant. Productos</th><th>Precio</th><th></th></tr>";
    var HtmlPedidosFinalizados = "<tr><th>Orden</th><th>Cant. Productos</th><th>Precio</th><th></th></tr>";
    var CargoPendiente = false;
    var CargoDespachados = false;
    var CargoEntregados = false;

    var APedidos = $.grep(APedidos, function (n, i) {
                        return n.User.Id == iduser;
                    });


    $.each(APedidos, function (index, item) {

        if(item.State == "1")
        {
            var Total = 0;
            $.each(item.Products, function (index, Producto) {
                Total += (Producto.UnitValue * Producto.Amount);
            });
            HtmlPedidosPendientes += "<tr><td>" + item.OrdenNumber + "</td><td>" + item.Products.length + "</td><td>" + Total + "</td><td><button id='" + item._id + "' style='padding: 6px;border-radius: 10px;background: #fff;' onclick='OnCancelarPed(this)'>Cancelar</button></td></tr>";
            CargoPendiente = true;

            
        }
        else if(item.State == "2")
        {
            var Total = 0;
            $.each(item.Products, function (index, Producto) {
                Total += (Producto.UnitValue * Producto.Amount);
            });
            HtmlPedidosDespachados += "<tr><td>" + item.OrdenNumber + "</td><td>" + item.Products.length + "</td><td>" + Total + "</td></tr>";
            CargoDespachados = true;
        }
        else if(item.State == "3")
        {
            var Total = 0;
            $.each(item.Products, function (index, Producto) {
                Total += (Producto.UnitValue * Producto.Amount);
            });
            HtmlPedidosFinalizados += "<tr><td>" + item.OrdenNumber + "</td><td>" + item.Products.length + "</td><td>" + Total + "</td></tr>";
            CargoEntregados = true;
        }
    });

    if (!CargoPendiente)
    {
        HtmlPedidosPendientes = "<tr><td>No tienes pedidos pendientes!</td></tr>";
    }

    if (!CargoDespachados)
    {
        HtmlPedidosDespachados = "<tr><td>No tiene pedidos despachados!</td></tr>";
    }                          
                               
    if(!CargoEntregados)       
    {                          
        HtmlPedidosFinalizados = "<tr><td>No tiene pedidos entregados!</td></tr>";
    }

    $("#TBPendientes").html(HtmlPedidosPendientes);
    $("#TBDespachados").html(HtmlPedidosDespachados);
    $("#TBEntregados").html(HtmlPedidosFinalizados);

    $.mobile.loading("hide");
}

function OnCancelarPed(button)
{
    jAlert("Deja de hacer esas bromas.\n!Pringao", "No es gracioso.");
    jConfirm("¿Estas seguro que deseas cancelar el pedido?", "Cancelar Pedido", function (r) {
        if (r)
        {
            $.mobile.loading("show", {
                text: "Cancelando Pedido...",
                textVisible: true,
                theme: "b",
                html: ""
            });

            var id = $(button).attr("id");

            var Ciudad = getCiudad();
            var url = getWebApi() + "Orders/"+ id;
            loadDataArray(url, "CancelarPedido");
        }
        else
        {
            jAlert("Deja de hacer esas bromas.\n!Pringao", "No es gracioso.");
        }
    });
}

function CancelarPedido(Pedido)
{
    Pedido[0].State = "4";
    jPrompt("Dinos porque quieres cancelar el pedido:", "", "Cancelar Pedido", function (r) {
        if(r)
        {
            Pedido[0].Observation = r;

            var url = getWebApi() + "Orders/" + Pedido[0]._id;
            UpdateData(url, Pedido[0]);
        }
        else
        {
            jAlert("Debes de suministrarnos el porque quieres cacelar el pedido.", "Cancelar Pedido");
        }
    });
}
