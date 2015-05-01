function GetPositionInitial() {
    try {
        if (navigator.geolocation) {
            var options = { enableHighAccuracy: true, timeout: 3000 };
            var PhoneGapGeolocation_watchID = navigator.geolocation.watchPosition(PhoneGapGeolocation_onSuccess, PhoneGapGeolocation_onError, options);

            /*navigator.geolocation.getCurrentPosition(function (pos) {
	            PosicionInicial = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

	        }, function (error) {
	            switch (error.code) {
	                case error.TIMEOUT:
	                    alert('Request timeout');
	                    break;
	                case error.POSITION_UNAVAILABLE:
	                    alert('Tu posición no está disponible');
	                    break;
	                case error.PERMISSION_DENIED:
	                    alert('Tu navegador ha bloqueado la solicitud de geolocalización');
	                    break;
	                case error.UNKNOWN_ERROR:
	                    alert('Error desconocido');
	                    break;
	            }

	        });*/

        }

    }
    catch (error) {
        //alert(error);
    }

}

function PhoneGapGeolocation_onSuccess(pos) {
    var element = document.getElementById('phonegap_output');

    setLongitud(pos.coords.longitude);
    setLatitud(pos.coords.latitude);

    console.log('Latitude: ' + pos.coords.latitude + ' Longitude: ' + pos.coords.longitude);

    PhoneGapGeolocation_stopWatch();
}

function PhoneGapGeolocation_onError(error) {
    switch (error.code) {
        case error.TIMEOUT:
            //alert('Request timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Tu posición no está disponible.\nVerifica que el GPS y el posicionamiento por WiFi o Red Movil esten activados.');
            break;
        case error.PERMISSION_DENIED:
            alert('Tu navegador ha bloqueado la solicitud de geolocalización');
            break;
        case error.UNKNOWN_ERROR:
            alert('Error desconocido');
            break;
    }
}

function PhoneGapGeolocation_stopWatch() {
    if (PhoneGapGeolocation_watchID != null) {
        navigator.geolocation.clearWatch(PhoneGapGeolocation_watchID);
        PhoneGapGeolocation_watchID = null;
        console.log("whatch has stopped..")
    }
}