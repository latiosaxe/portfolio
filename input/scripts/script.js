var LTX = {};

LTX.main = (function(){
    var _coords = [],
        _mexicoCoords = [19.3887369, -98.9586001],
        _$welcome_bg,
        _$noGeo,
        _$bringWork,
        _$fancy_work,
        _$work_here,
        _$loading_work,
        _$closeFancy,

        _$noPosition,
        _$hereKM;


    var _initVars = function _initVars(){
        _$welcome_bg = $(".welcome_bg");
        _$noGeo = $("#noGeo");
        _$bringWork = $(".bringWork");
        _$fancy_work = $(".fancy_work");
        _$work_here = $("#work-here");
        _$loading_work = $("#loading-work");
        _$closeFancy = $("#closeFancy");

        _$noPosition = $("#noPosition");
        _$hereKM = $("#hereKM");
    };

    var _initEvents = function _initEvents(){
        Ps.initialize(document.getElementById('site'));

        var random = Math.floor(Math.random() * 3) + 1;
        _$welcome_bg.css({
            'background-image': 'url("images/home/me-'+random+'.jpg")'
        });

        _$bringWork.click(function(event){
            event.preventDefault();
            var _this = $(this),
                _url = _this.attr('data-url');
                _$work_here.html('');

            $.ajax({
                type       : "GET",
                dataType   : "html",
                url        : "work/"+_url,
                beforeSend : function() {
                    _$fancy_work.addClass('active');
                }
            })
            .done(function(data) {
                console.log(data);
                    //setTimeout(function(){
                        _$work_here.html(data);
                        _$work_here.addClass('active');
                        _$loading_work.addClass('byebye');
                    //},2000);

            })
            .fail(function() {
                console.log("Error");
            });
        });

        _$closeFancy.click(function(){
            _$fancy_work.removeClass('active');
            _$work_here.removeClass('active');
            _$loading_work.removeClass('byebye');
        });
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
            _coords.push(position.coords.latitude);
            _coords.push(position.coords.longitude);
            console.log(_coords);
            //_coords = [34.6783987,135.4775975];

            _calculateDistance(_mexicoCoords[0], _mexicoCoords[1], _coords[0], _coords[1]);
            _$noGeo.hide();
        }, function() {
            _$noPosition.hide();
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
            _$noPosition.text('Just like you');
        }else{
            _$hereKM.text(parseInt(d)+'KM');
        }

        _$noPosition.show();
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


    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

