$(document).on("pageshow", "#Registro", function () {
    $.mobile.loading("show", {
        text: "Cargando Ciudades...",
        textVisible: true,
        theme: "b",
        html: ""
    });
    setTimeout(function () {
        var Ciudad = getCiudad();
        var url = getWebApi() + "geography";
        loadDataArray(url);
        //CargarFooter("#ComerciosxCategoriasMall");

    }, 2000);
});

var Country = {
    Code: "",
    Name: ""
}

var State = {
    Code: "",
    Name: ""
}

var City = {
    Code: "",
    Name: ""
}

function OnChangeCiudad(Select)
{
    var option = Select.selectedOptions;
    var Selected = $(option[0]);

    Country.Code = Selected.attr("data-codecountry");
    Country.Name = Selected.attr("data-namecountry");

    State.Code = Selected.attr("data-codeprovince");
    State.Name = Selected.attr("data-nameprovince");

    City.Code = Selected.attr("value");
    City.Name = Selected.html();
}

function CargarCiudadesRegistro(ACiudades)
{
    var htmlCiudades = "<option></option>";
    $.each(ACiudades, function (index, item) {
        htmlCiudades += "<option value='" + item.CodeCity + "' data-codeprovince='" + item.CodeStateProvince + "' data-nameprovince='" + item.NameStateProvince + "' data-namecountry='" + item.nameCountry + "' data-codecountry='" + item.CodeCountry + "'>" + item.NameCity + "</option>"
    });

    $("#SelectCiudades").html(htmlCiudades);
    $.mobile.loading("hide");
}

function MostrarDomiciliosNuevo()
{
    $("#ContenedorNuevoDomicilio").attr('style', 'display:block !important;');
}

function OcultarDomiciliosNuevo() {
    $("#ContenedorNuevoDomicilio").attr('style', 'display:none !important;');
}

function AgregarNuevoDomicilio()
{
    var Domicilios = localStorage["DomiciliosRegistro"];
    var ADomicilios = [];

    var modelo = {
        Nombre: "",
        Direccion: "",
        Barrio: ""
    }

    if(Domicilios == "" || Domicilios == undefined)
    {
        modelo.Nombre = $("#NombreDomicilio").val();
        modelo.Direccion = $("#DireccionDomicilio").val();
        modelo.Barrio = $("#BarrioDomicilio").val();

        ADomicilios.push(modelo);
    }
    else
    {
        ADomicilios = JSON.parse(Domicilios);

        modelo.Nombre = $("#NombreDomicilio").val();
        modelo.Direccion = $("#DireccionDomicilio").val();
        modelo.Barrio = $("#BarrioDomicilio").val();

        ADomicilios.push(modelo);
    }

    localStorage["DomiciliosRegistro"] = JSON.stringify(ADomicilios);
    OcultarDomiciliosNuevo();
    PintarDomiciliosTemp(ADomicilios);
}

function PintarDomiciliosTemp(ADom)
{
    var pintar = false;
    var htmlDom = "<tr><th>Domicilio</th> <th>Direccion</th><th>Barrio</th></tr>";

    $.each(ADom, function (index, item) {
        htmlDom += "<tr><td>" + item.Nombre + "</td><td>" + item.Direccion + "</td><td>" + item.Barrio + "</td></tr>";
        pintar = true;
    });

    if(!pintar)
    {
        htmlDom = "No has agregado domicilios todavia. Agrega uno para poder realizar tus pedidos.";
    }

    $("#ContentDomTemp").html(htmlDom);
}

function GuardarRegistro() {

    var hola = $("#FechaNacimientoRegis").val();
    var edad = calcularEdad($("#FechaNacimientoRegis").val());

    var Modelo = {
        BasicInfo:
            {
                Name: $("#NombreRegis").val(),
                LastName: $("#ApellidoRegis").val(),
                IdPersonal: $("#IdentificaionRegis").val(),
                Telephone: "",
                Age: edad,
                DateBirth:$("#FechaNacimientoRegis").val()
            },
        Credentials:
            {
                NomUsu: "",
                PassWord: ""
            },
        Geo:
            {
                Country:
                    {
                        code: Country.Code,
                        name: Country.Name
                    },
                City:
                    {
                        code: City.Code,
                        name: City.Name
                    },
                State:
                    {
                        code: State.Code,
                        name: State.Name
                    }
            },
        Places: [],
        Payment: [],
        InfoControl:[],
        IdCelular: localStorage["IdCelular"]
    }



    if(parseInt(edad) >= 18)
    {
        var Domicilios = localStorage["DomiciliosRegistro"];

        if(Domicilios == "" || Domicilios == undefined)
        {
            alert("Debes de tener por lo menos 1 domicilio.")
        }
        else
        {
            var ADomicilio = JSON.parse(Domicilios);
            var Places = [];

            $.each(ADomicilio, function (index, item) {
                var ModelPlaces = {
                    name: "",
                    Direction: "",
                    Barrio: "",
                    geo: {
                        Lat: "",
                        Long: ""
                    }
                }

                ModelPlaces.name = item.Nombre;
                ModelPlaces.Direction = item.Direccion;
                ModelPlaces.Barrio = item.Barrio;

                Places.push(ModelPlaces);
            });

            Modelo.Places = Places;

            var url = getWebApi() + "User";
            var j = JSON.stringify(Modelo);
            console.log(j);
            insertDataArray(Modelo, url);
        }
    }
    else
    {
        alert("Para Usar esta aplicacion debes de ser mayor de edad.");
    }
}

function isValidDate(day, month, year) {
    var dteDate;

    // En javascript, el mes empieza en la posicion 0 y termina en la 11 
    //   siendo 0 el mes de enero
    // Por esta razon, tenemos que restar 1 al mes
    month = month - 1;
    // Establecemos un objeto Data con los valore recibidos
    // Los parametros son: año, mes, dia, hora, minuto y segundos
    // getDate(); devuelve el dia como un entero entre 1 y 31
    // getDay(); devuelve un num del 0 al 6 indicando siel dia es lunes,
    //   martes, miercoles ...
    // getHours(); Devuelve la hora
    // getMinutes(); Devuelve los minutos
    // getMonth(); devuelve el mes como un numero de 0 a 11
    // getTime(); Devuelve el tiempo transcurrido en milisegundos desde el 1
    //   de enero de 1970 hasta el momento definido en el objeto date
    // setTime(); Establece una fecha pasandole en milisegundos el valor de esta.
    // getYear(); devuelve el año
    // getFullYear(); devuelve el año
    dteDate = new Date(year, month, day);

    //Devuelva true o false...
    return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
}

/**
 * Funcion para validar una fecha
 * Tiene que recibir:
 *  La fecha en formato ingles yyyy-mm-dd
 * Devuelve:
 *  true-Fecha correcta
 *  false-Fecha Incorrecta
 */
function validate_fecha(fecha) {
    var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

    if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
            return true;
        }
    }
    return false;
}

/**
 * Esta función calcula la edad de una persona y los meses
 * La fecha la tiene que tener el formato yyyy-mm-dd que es
 * metodo que por defecto lo devuelve el <input type="date">
 */
function calcularEdad(fecha) {
    //var fecha = document.getElementById("user_date").value;
    if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
            edad--;
        }
        if (edad > 1900) {
            edad -= 1900;
        }

        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
            meses = ahora_mes - mes;
        if (ahora_mes < mes)
            meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
            meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
            dias = ahora_dia - dia;
        if (ahora_dia < dia) {
            ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
            dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }

        return edad;
    } else {
       alert("La fecha " + fecha + " es incorrecta");
    }
}