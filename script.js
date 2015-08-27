window.initMap = function() {

	var mapTypeIds = [];
    for(var type in google.maps.MapTypeId) {
        mapTypeIds.push(google.maps.MapTypeId[type]);
    }
    mapTypeIds.push('OSM');
	mapTypeIds.push('TomTom');
	mapTypeIds.push('Bing');
	mapTypeIds.push('Waze');
	mapTypeIds.push('HereMap');
	mapTypeIds.push('HereSatellite');

	var mapEl = document.getElementById('map');
	var map = new google.maps.Map(mapEl, {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8,
		mapTypeControl: true,
        streetViewControl: true,
		scaleControl: true,
		zoomControl: true,
		mapTypeControlOptions: {
            mapTypeIds: mapTypeIds
        }
	});

	map.mapTypes.set('OSM', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'http://tile.openstreetmap.org/' + zoom + '/' + x + '/' + coord.y + '.png';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'OpenStreetMap',
        maxZoom: 18
    }));

	map.mapTypes.set('TomTom', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
			this.index = this.index || 0;
			var subdomain = ['a', 'b', 'c', 'd'][this.index++ % 4];
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'http://'+subdomain+'.api.tomtom.com/map/1/tile/basic/main/' + zoom + '/' + x + '/' + coord.y + '.png?key=hd4myuk2vtaq2zx5c2ab22se';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'TomTom',
        maxZoom: 18
    }));

	map.mapTypes.set('Waze', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'https://worldtiles2.waze.com/tiles/' + zoom + '/' + x + '/' + coord.y + '.png?key=hd4myuk2vtaq2zx5c2ab22se';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'Waze',
        maxZoom: 18
    }));

	var tile2quad = function(x, y, z) {
		var quad = '';
		for (var i = z; i > 0; i--) {
			var digit = 0;
			var mask = 1 << (i - 1);
			if ((x & mask) !== 0) digit += 1;
			if ((y & mask) !== 0) digit += 2;
			quad = quad + digit;
		}
		return quad;
	};

	map.mapTypes.set('Bing', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
			this.index = this.index || 0;
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'http://ecn.t'+this.index++ % 4+'.tiles.virtualearth.net/tiles/r'+tile2quad(x, coord.y, zoom)+'.jpeg?g=3791&mkt=&shading=hill';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'Bing Maps',
        maxZoom: 18
    }));

	map.mapTypes.set('HereMap', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
			this.index = this.index || 0;
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'https://'+(1 + this.index++ % 4)+'.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/' + zoom + '/' + x + '/' + coord.y + '/256/png8?app_id=hkKB3LEiCR45PHeS9E7T&app_code=bCEjWIvzBIRBtF5vk2R0Wg';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'Here Map',
        maxZoom: 18
    }));

	map.mapTypes.set('HereSatellite', new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
			this.index = this.index || 0;
            // "Wrap" x (logitude) at 180th meridian properly
            // NB: Don't touch coord.x because coord param is by reference, and changing its x property breakes something in Google's lib
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;
            }
            // Wrap y (latitude) in a like manner if you want to enable vertical infinite scroll
            return 'https://'+(1 + this.index++ % 4)+'.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/' + zoom + '/' + x + '/' + coord.y + '/256/png8?app_id=hkKB3LEiCR45PHeS9E7T&app_code=bCEjWIvzBIRBtF5vk2R0Wg';
        },
        tileSize: new google.maps.Size(256, 256),
        name: 'Here Satellite',
        maxZoom: 18
    }));

}
