// Adding 500 Data Points
var map, pointarray, heatmap;

// theme var
var color_theme =
[
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "stylers": [
            {
                "hue": "#00aaff"
            },
            {
                "saturation": -100
            },
            {
                "gamma": 2.15
            },
            {
                "lightness": 12
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 24
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 57
            }
        ]
    }
];




var map;
var mapOptions = {
    center: new google.maps.LatLng(37.741020, -8.242188),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    draggable: false,disableDefaultUI: true,
    styles: color_theme
  };
var marker;

function initialize() {
	
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  map.setZoom(3);
    
}

function zoomOut()
{
	marker.setMap(null);
	smoothZoomOut(map,3,map.getZoom());
}

function zoomIn()
{
	var position = new google.maps.LatLng(32.0704075,34.88765);
	map.panTo( position );
	
	marker_info = {
        position: position,
        animations: google.maps.Animation.DROP,
        map:map,
        draggable: false,
        clickable:false,
        icon: 'http://wscont1.apps.microsoft.com/winstore/1x/bddc2931-335e-4430-adc5-5d9c61d2f61e/Icon.21534.png'
    };

               
	smoothZoomIn(map,9,map.getZoom(),marker_info);
}

// the smooth zoom function
function smoothZoomIn (map, max, cnt,marker_info) {
    if (cnt >= max) {
    		marker = new google.maps.Marker(marker_info);
            return;
        }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoomIn(map, max, cnt + 1,marker_info);
        });
        setTimeout(function(){ map.setZoom(cnt); }, 200); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}  

function smoothZoomOut (map, min, cnt) {
    if (cnt <= min) {
    		map.setOptions(mapOptions);
            return;
        }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoomOut(map, min, cnt - 1);
        });
        setTimeout(function(){ map.setZoom(cnt); }, 200); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}  


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}



google.maps.event.addDomListener(window, 'load', initialize);