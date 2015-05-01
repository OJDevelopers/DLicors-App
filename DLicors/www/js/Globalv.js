var WebApi = "http://dlicorssa.azurewebsites.net/api/";
//var WebApi = "http://localhost:3350/api/Orders";
var Recursos = "http://dlicorsres.azurewebsites.net/Resources/DLicorsApp/";
var Ciudad = "CO-ANT-MED";
var idUsuario = "123456789";
var IdentificacionUsuario = "1035427760";
var NombreUsuario = "Luis Eduardo Oquendo Perez";
var Telefono = "3194923767"
var Latitud = "";
var Longitud = "";
var Domicilios = [];

function setDomicilios(pDomicilios)
{
    Domicilios = pDomicilios;
}

function getDomicilios()
{
    return Domicilios;
}

function getWebApi()
{
    return WebApi;
}

function setWebApi(pWebApi)
{
    WebApi = pWebApi;
}

function getCiudad() {
    return Ciudad;
}

function setCiudad(pCiudad) {
    Ciudad = pCiudad;
}

function getRecursos() {
    return Recursos;
}

function setRecursos(pRecursos) {
    Recursos = pRecursos;
}

function getIdUsuario() {
    return idUsuario;
}

function setIdUsuario(pIdUsuario) {
    idUsuario = pIdUsuario;
}

function getIdentificacionUsuario() {
    return IdentificacionUsuario;
}

function setIdentificacionUsuario(pIdentificacionUsuario) {
    IdentificacionUsuario = pIdentificacionUsuario;
}

function getLatitud() {
    return Latitud;
}

function setLatitud(pLatitud) {
    Latitud = pLatitud;
}

function getLongitud() {
    return Longitud;
}

function setLongitud(pLongitud) {
    Longitud = pLongitud;
}

window.getWebApi = getWebApi;
window.setWebApi = setWebApi;
window.getCiudad = getCiudad;
window.setCiudad = setCiudad;
window.getRecursos = getRecursos;
window.setRecursos = setRecursos;
window.getIdUsuario = getIdUsuario;
window.setIdUsuario = setIdUsuario;
window.getIdentificacionUsuario = getIdentificacionUsuario;
window.setIdentificacionUsuario = setIdentificacionUsuario;
window.getLatitud = getLatitud;
window.setLatitud = setLatitud;
window.getLongitud = getLongitud;
window.setLongitud = setLongitud;
window.getDomicilios = getDomicilios;
window.setDomicilios = setDomicilios;
