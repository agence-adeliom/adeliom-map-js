// Pour utiliser la démo, il est nécessaire d'avoir un
// fichier env.js dans le dossier racine, contenant la
// même structure que le fichier default.env.js

import AdeliomMap, {AdeliomMapEvents} from "./AdeliomMap";
import {getAllStyleParams, getBaseStyleParams, initStyleBuilderFields} from "./AdeliomMapStyleBase";
import DemoEvents from "./demo-events";
import DemoButtons from "./demo-buttons";
import env from '../../env';

const params = {
    logAllEvents: true,
    logClickEvents: false,
    testRemoveMarkers: false,
    testDisableClusters: false,
    testReEnableClusters: false,
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
    const markers = [
        {
            title: 'Agence Adeliom',
            description: 'Agence Digitale',
            coordinates: {
                lat: 48.614782,
                lng: 7.714012,
            },
            icon: '/dist/img/adeliom-logo.png',
            iconSize: 32,
            selectedIcon: '/dist/img/adeliom-logo-blue.png',
            hoveredIcon: '/dist/img/marker-selected.png',
            infoWindowTemplate: '<div class="map-infowindow-elt">Test template</div>',
            listEltTemplate: 'Test de template personnalisé pour le marqueur',
            listEltId: 1,
        },
        {
            title: 'Cathédrale de Strasbourg',
            description: 'Lieu touristique',
            coordinates: {
                lat: 48.581825,
                lng: 7.75093,
            }
        },
        {
            title: 'Tour Eiffel',
            description: 'Monument',
            iconCentered: false,
            coordinates: {
                lat: 48.858370,
                lng: 2.294481
            }
        },
        {
            title: 'Gorges de la Diosaz',
            description: 'Lieu touristique',
            coordinates: {
                lat: 45.999,
                lng: 6.5,
            }
        },
        {
            title: 'Faux cluster',
            description: 'Description du faux cluster',
            iconSize: 32,
            isFakeCluster: true,
            fakeClusterMarkers: [
                {
                    title: 'Lyon',
                    description: 'Ville de Lyon',
                    coordinates: {
                        lat: 45.764043,
                        lng: 4.835659,
                    }
                },
                {
                    title: 'Dijon',
                    description: 'Ville de Dijon',
                    coordinates: {
                        lat: 47.322047,
                        lng: 5.04148,
                    }
                },
                {
                    title: 'Montpellier',
                    description: 'Ville de Montpellier',
                    coordinates: {
                        lat: 43.610769,
                        lng: 3.876716,
                    }
                }
            ]
        }
    ];

    window.adeliomMap = new AdeliomMap({
        apiKey: env.apiKey,
        apiOptions: {
            libraries: ['places'],
        },
        mapSelector: '[js-map]',
        mapListSelector: '[js-map-list]',
        mapCustomZoomMinusSelector: '[js-custom-zoom-minus]',
        mapCustomZoomPlusSelector: '[js-custom-zoom-plus]',
        placesSelector: '[js-places]',
        geolocationSelector: '[js-geolocate-on-map]',
        geolocationOptions: {
            zoomOnGeolocation: 12,
            addMarkerToMap: true,
            icon: '/dist/img/adeliom-logo.png',
            iconSize: 56,
        },
        placesOptions: {
            componentRestrictions: {
                country: ['fr']
            },
            fields: ['geometry.location', 'formatted_address'],
        },
        placesMapOptions: {
            autoCenterOnPlace: true,
            zoomOnPlace: 12,
        },
        mapAllowMultipleMarkersSelected: false,
        mapInfoWindowTemplate: mapInfoWindowTemplate,
        mapListEltTemplate: mapListEltTemplate,
        mapInfoWindowReplaceWithMarkerData: true,
        mapListReplaceWithMarkerData: true,
        checkMapSize: false,
        mapAutoCenter: true,
        mapAutoZoom: true,
        mapDefaultCenter: {
            lat: 48.614782,
            lng: 7.714012
        },
        mapCenterMarkerOnClick: true,
        mapHideMarkerOnClickOutside: true,
        mapZoomMarkerOnClick: 12,
        mapDefaultZoom: 6,
        mapProvider: 'google',
        mapAnimation: 'smooth',
        mapShowPlaces: false,
        mapUseClusters: true,
        mapClusterParams: [
            {
                icon: '/dist/img/cluster.png',
                hoverIcon: '/dist/img/adeliom-logo.png',
                size: 40,
                from: 0,
                defaultIconColor: '#30b702',
            },
            {
                size: 56,
                from: 3,
                defaultIconColor: '#ea8906',
                defaultIconHoverColor: '#d35800',
            },
            {
                size: 56,
                from: 5,
                defaultIconColor: '#980000',
                defaultIconHoverColor: '#d70000',
            }
        ],
        mapMarkerIconUrl: '/dist/img/marker.png',
        mapMarkerHoveredIconUrl: '/dist/img/marker-hovered.png',
        mapMarkerSelectedIconUrl: '/dist/img/marker-selected.png',
        mapMarkerIconSize: 40,
        mapMarkers: markers,
        mapDisplayMarkers: true,
        mapDisplayInfoWindows: true,
        mapEnableZoomButtons: false, // Displays the + and - zoom buttons
        mapEnableStreetView: false, // Displays the interactive StreetView button
        mapEnableFullscreenButton: false, // Displays a button that allows the user to put the map in fullscreen
        mapEnableTypeButtons: false, // Displays the buttons that allow the user to switch between map types
        mapDisplayScale: false, // Displays a scale at the bottom of the map
        mapAskForConsent: true,
        mapConsentDefaultValue: true,
        markerIconCentered: true,
        clusterIconCentered: true,
        //mapType: 'satellite',
        mapCustomStyles: getAllStyleParams(),
    });

    if (params.testRemoveMarkers) {
        setTimeout(() => {
            const markersToRemove = [
                adeliomMap._getMarkersData()[1]?.marker,
            ];

            adeliomMap._removeMarkers(markersToRemove);
        }, 3000);
    }

    if (params.testDisableClusters) {
        setTimeout(() => {
            adeliomMap._disableClusters();

            if (params.testReEnableClusters) {
                setTimeout(() => {
                    adeliomMap._enableClusters();
                }, 3000);
            }
        }, 1000);
    }

    const textareaStyleContainer = document.querySelector(`[js-style-text-container]`);

    const fillTextareaStyle = (text) => {
        if (typeof text === 'string') {
            textareaStyleContainer.innerHTML = text;
        }
    };

    adeliomMap.on(AdeliomMapEvents.map.mapLoaded, () => {
        fillTextareaStyle(getBaseStyleParams(true));
    });

    initStyleBuilderFields(() => {
        fillTextareaStyle(getBaseStyleParams(true));
    });

    // Sélection automatique du code au click sur le conteneur
    textareaStyleContainer.addEventListener('click', () => {
        textareaStyleContainer.select();
    });

    DemoEvents.init(adeliomMap, params);
    DemoButtons.init();
});