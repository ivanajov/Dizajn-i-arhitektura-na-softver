let prevoz = "driving";

// Ja iscrtuva mapata, cita dali ima apteka vo localStorage za koja ke pokaze navigacija
function navigacija(start) {
    let aptekaString = localStorage.getItem("odbranaApteka"),
        apteka, aptekaCoords;
    if (aptekaString) {
        apteka = JSON.parse(aptekaString);
        aptekaCoords = [apteka.lon, apteka.lat];
        document.getElementById("map").insertAdjacentHTML('beforebegin', `
        <div id="odbrana-apteka-info">
            Избрана аптека: 
            <div>${apteka.Ime}</div>
            <div>${apteka.Adresa}</div>
            <div>0${apteka.TelBroj}</div>
            <div>Рејтинг: ${apteka.Rating}</div>
        </div>
    `);
        document.getElementById('instructions').style.display = "block";
        document.getElementById('map').insertAdjacentHTML('beforebegin', `
        <div id="izb-nova-apt"> Изберете нова аптека </div>
    `);
        document.getElementById('izb-nova-apt').onclick = () => {
            localStorage.removeItem('odbranaApteka');
            window.location.href = "apteki4.html";
        }
        document.getElementById('izb-nova-apt').onmouseover = function () {
            this.style.cursor = "pointer";
        }
    } else {
        document.querySelector("#map").insertAdjacentHTML('afterend', `
        <div id="odb-apteka"> Одберете аптека </div>`);
        document.getElementById('odb-apteka').onclick = () => window.location.href = "/apteki4.html";
        document.getElementById('odb-apteka').onmouseover = function () {
            this.style.cursor = "pointer";
        }
    }

    mapboxgl.accessToken = `${ACCESS_TOKEN}`;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: start,
        zoom: 12
    });

    var bounds = [
        [start[0] - 2, start[1] - 2],
        [start[0] + 2, start[1] + 2]
    ];
    map.setMaxBounds(bounds);

    var canvas = map.getCanvasContainer();

    // Funkcija za iscrtuvanje na ruta od lokacijata na korisnikot do aptekata
    function getRoute(end) {
        var url = `https://api.mapbox.com/directions/v5/mapbox/${prevoz}/` + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function () {
            var json = JSON.parse(req.response);
            var data = json.routes[0];
            var route = data.geometry.coordinates;
            var geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            } else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: geojson
                            }
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }
            var instructions = document.getElementById('instructions');
            var steps = data.legs[0].steps;

            var tripInstructions = [];
            for (var i = 0; i < steps.length; i++) {
                tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
                instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
            }

        };
        req.send();
    }

    map.on('load', function () {
        getRoute(start);
        map.addLayer({
            id: 'point',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: start
                        }
                    }]
                }
            },
            paint: {
                'circle-radius': 10,
                'circle-color': 'green'
            }
        });
        // Za sekoja od aptekite stava tocka na mapata na soodvetnata lokacija
        fetch('/apteki')
            .then(response => response.json())
            .then(apteki => {
                apteki.forEach(apteka => {
                    map.addLayer({
                        id: `${apteka.id}`,
                        type: 'circle',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [{
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [apteka.lon, apteka.lat]
                                    }
                                }]
                            }
                        },
                        paint: {
                            'circle-radius': 8,
                            'circle-color': '#3887be'
                        }
                    });
                });
            });
        if (apteka) {
            getRoute(aptekaCoords);
        }
    });
}
