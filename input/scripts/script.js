var LTX = {};

LTX.main = (function(){
    var _coords = [],
        _mexicoCoords = [19.3887369, -99.1086001],
        _windowPosition,
        _$noGeo,
        _$bringWork;


    var _initVars = function _initVars(){
        _$noGeo = $("#noGeo");
        _$bringWork = $(".bringWork");
    };

    var _initEvents = function _initEvents(){

    };

    var _windowListeners = function _windowListeners(){
        $(window).scroll(function () {
            var _windowPosition = $(window).scrollTop();

            if(_windowPosition <= 100){
                _$noGeo.removeClass("byebye");
            }else{
                _$noGeo.addClass("byebye");
            }
        });

    };

    var _geoposition = function _geoposition(){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Allow");
            console.log(position);
            _coords.push(position.coords.latitude);
            _coords.push(position.coords.longitude);
            console.log(_coords);
            _coords = [34.6783987,135.4775975];

            _calculateDistance(_mexicoCoords[0], _mexicoCoords[1], _coords[0], _coords[1]);
        }, function() {
            console.log("Nop");
        });
    };

    var _map = function _map(){
        _geoposition();

        var styles = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#ff528f"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#ff528f"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ff528f"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#ff528f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
        var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(_mexicoCoords[0], _mexicoCoords[1]),
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };
        var map = new google.maps.Map(document.getElementById('blueMap'),
            mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    };

    var _calculateDistance = function _calculateDistance(lat1,lon1,lat2,lon2) {
        var R = 6371;
        var dLat = _deg2rad(lat2-lat1);
        var dLon = _deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(_deg2rad(lat1)) * Math.cos(_deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;


        console.log(d);

        if(d<=30){

        }else{

        }

        return d;
    };

    var _deg2rad = function _deg2rad(deg) {
        return deg * (Math.PI/180)
    };

    return {
        init: function init(){
            _initVars();
            _initEvents();
            _windowListeners();
        },
        load: function load(){
            _map();
        }

    }
})();

