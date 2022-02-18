import AdeliomMap, {AdeliomMapEvents} from "./AdeliomMap";
import {env} from "../../env";

const params = {
    logAllEvents: false,
    logClickEvents: false,
};

const mapListEltTemplate = '<div class="map-list-elt">' +
    '<div>' +
    '{{ title }}' +
    '</div>' +
    '<div>' +
    '{{ description }}' +
    '</div>' +
    '</div>';

const mapInfoWindowTemplate = '<div class="map-infowindow-elt">' +
    '<div>' +
    '{{ title }}' +
    '</div>' +
    '<div>' +
    '{{ description }}' +
    '</div>' +
    '</div>';

document.addEventListener("DOMContentLoaded", () => {
    const adeliomMap = new AdeliomMap({
        apiKey: env.apiKey,
        mapSelector: '[js-map]',
        mapListSelector: '[js-map-list]',
        mapAllowMultipleMarkersSelected: false,
        mapInfoWindowTemplate: mapInfoWindowTemplate,
        mapListEltTemplate: mapListEltTemplate,
        mapInfoWindowReplaceWithMarkerData: true,
        mapListReplaceWithMarkerData: true,
        checkMapSize: false,
        mapDefaultCenter: {
            lat: 48.614782,
            lng: 7.714012
        },
        mapCenterMarkerOnClick: true,
        mapDefaultZoom: 12,
        mapProvider: 'google',
        mapAnimation: 'smooth',
        mapShowPlaces: false,
        mapMarkerIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
        mapMarkerSelectedIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
        mapMarkers: [
            {
                title: 'Agence Adeliom',
                description: 'Agence Digitale',
                coordinates: {
                    lat: 48.614782,
                    lng: 7.714012,
                },
                icon: 'http://127.0.0.1:8080/dist/img/adeliom-logo.png',
                selectedIcon: 'http://127.0.0.1:8080/dist/img/adeliom-logo-blue.png',
                infoWindowTemplate: '<div class="map-infowindow-elt">Test template</div>',
                listEltTemplate: 'Test 2',
            },
            {
                title: 'Cathédrale de Strasbourg',
                description: 'Lieu touristique',
                coordinates: {
                    lat: 48.581825,
                    lng: 7.75093,
                }
            }
        ],
        mapDisplayMarkers: true,
        mapDisplayInfoWindows: true,
        mapEnableZoomButtons: true, // Displays the + and - zoom buttons
        mapEnableStreetView: true, // Displays the interactive StreetView button
        mapEnableFullscreenButton: true, // Displays a button that allows the user to put the map in fullscreen
        mapEnableTypeButtons: true, // Displays the buttons that allow the user to switch between map types
        mapDisplayScale: false, // Displays a scale at the bottom of the map
    });

    adeliomMap.on(AdeliomMapEvents.markers.created, (data) => {
        if (params.logAllEvents) {
            console.log('Marker instance created :', data);
        }
    });

    adeliomMap.on(AdeliomMapEvents.infoWindows.created, (data) => {
        if (params.logAllEvents) {
            console.log('Marker infoWindow created :', data);
        }
    });

    adeliomMap.on(AdeliomMapEvents.listElements.created, (data) => {
        if (params.logAllEvents) {
            console.log('Marker listElt created :', data);
        }
    });

    adeliomMap.on(AdeliomMapEvents.markers.dataCreated, (data) => {
        if (params.logAllEvents) {
            console.log('Marker data created :', data);
        }
    });

    adeliomMap.on(AdeliomMapEvents.markers.clicked, (data) => {
        if (params.logAllEvents || params.logClickEvents) {
            console.log('Marker clicked :', data);
        }
    });
});