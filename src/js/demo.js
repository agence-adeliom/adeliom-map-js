import AdeliomMap, {AdeliomMapEvents} from "./AdeliomMap";

const API_KEY = 'AIzaSyAzfQjZpxnhBQq-KqK-t_eMoeuSs36Zt1w';

const params = {
    logAllEvents: false,
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
    window.adeliomMap = new AdeliomMap({
        apiKey: API_KEY,
        apiOptions: {
            libraries: ['places'],
        },
        mapSelector: '[js-map]',
        mapListSelector: '[js-map-list]',
        mapCustomZoomMinusSelector: '[js-custom-zoom-minus]',
        mapCustomZoomPlusSelector: '[js-custom-zoom-plus]',
        geolocationSelector: '[js-geolocate-on-map]',
        geolocationOptions: {
            zoomOnGeolocation: 12,
            addMarkerToMap: true,
            icon: '/dist/img/adeliom-logo.png',
            iconSize: 56,
        },
        placesSelector: '[js-places]',
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
                from: 0
            },
            {
                size: 56,
                from: 3,
                defaultIconColor: '#E62A4D',
                defaultIconHoverColor: '#FF00FF',
            }
        ],
        mapMarkerIconUrl: '/dist/img/marker.png',
        mapMarkerHoveredIconUrl: '/dist/img/marker-hovered.png',
        mapMarkerSelectedIconUrl: '/dist/img/marker-selected.png',
        mapMarkerIconSize: 40,
        mapMarkers: [
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
            }
        ],
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
        mapCustomStyles: [
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d3d3d3"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b3b3b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 1.8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d7d7d7"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a7a7a7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#efefef"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#696969"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
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
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d6d6d6"
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
            {},
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            }
        ]
    });

    const disableMapButton = document.querySelector(`[js-disable-map]`);
    const disableClustersButton = document.querySelector(`[js-disable-clusters]`);
    const enableClustersButton = document.querySelector(`[js-enable-clusters]`);
    const removeGeolocationMarkerButton = document.querySelector(`[js-remove-geolocation-marker]`);
    const resetMapButton = document.querySelector(`[js-reset-map]`);
    const clearMapButton = document.querySelector(`[js-clear-map]`);
    const satelliteViewButton = document.querySelector(`[js-satellite-view]`);
    const roadmapViewButton = document.querySelector(`[js-roadmap-view]`);
    const hybridViewButton = document.querySelector(`[js-hybrid-view]`);
    const terrainViewButton = document.querySelector(`[js-terrain-view]`);
    const closeAllMarkersButton = document.querySelector(`[js-close-all-markers]`);
    const addMarkersButton = document.querySelector(`[js-add-markers]`);

    disableClustersButton.addEventListener('click', () => {
        adeliomMap._disableClusters();
    });

    enableClustersButton.addEventListener('click', () => {
        adeliomMap._enableClusters();
    });

    removeGeolocationMarkerButton.addEventListener('click', () => {
        adeliomMap._removeGeolocationMarker();
    });

    resetMapButton.addEventListener('click', () => {
        adeliomMap._resetMap();
    });

    clearMapButton.addEventListener('click', () => {
        adeliomMap._clearMap();
    });

    satelliteViewButton.addEventListener('click', () => {
        adeliomMap._setMapType('satellite');
    });

    roadmapViewButton.addEventListener('click', () => {
        adeliomMap._setMapType('roadmap');
    });

    hybridViewButton.addEventListener('click', () => {
        adeliomMap._setMapType('hybrid');
    });

    terrainViewButton.addEventListener('click', () => {
        adeliomMap._setMapType('terrain');
    });

    closeAllMarkersButton.addEventListener('click', () => {
        adeliomMap._unselectAllMarkers();
    });

    addMarkersButton.addEventListener('click', () => {
        const newMarkers = [
            {
                title: 'Chamonix',
                description: 'Lieu touristique',
                iconSize: 32,
                coordinates: {
                    lat: 45.923697,
                    lng: 6.869433,
                }
            },
            {
                title: 'Sommet du Mont-Blanc',
                description: 'Lieu touristique',
                iconSize: 32,
                coordinates: {
                    lat: 45.8325,
                    lng: 6.865,
                }
            }
        ];

        adeliomMap._addMarkers(newMarkers);
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

    if (disableMapButton) {
        if (adeliomMap.options['mapAskForConsent']) {
            disableMapButton.addEventListener('click', () => {
                adeliomMap._setConsent(false);
            });
        } else {
            disableMapButton.style.display = 'none';
        }
    }

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

    adeliomMap.on(AdeliomMapEvents.listElements.clicked, (data) => {
        if (params.logAllEvents || params.logClickEvents) {
            console.log('List element clicked :', data);
        }
    })

    adeliomMap.on(AdeliomMapEvents.rgpd.consentButtonClicked, (AdeliomMapInstance) => {
        if (params.logAllEvents || params.logClickEvents) {
            console.log('Consent button clicked');
        }

        AdeliomMapInstance._setConsent(true);
    });

    adeliomMap.on(AdeliomMapEvents.map.hasAutoCentered, () => {
        if (params.logAllEvents) {
            console.log('Map just auto-centered');
        }
    });

    adeliomMap.on(AdeliomMapEvents.clusters.disabled, () => {
        if (params.logAllEvents) {
            console.log('Clusters disabled');
        }
    });

    adeliomMap.on(AdeliomMapEvents.clusters.enabled, () => {
        if (params.logAllEvents) {
            console.log('Clusters enabled');
        }
    });

    adeliomMap.on(AdeliomMapEvents.places.selectedPlaceHasBeenFound, () => {
        if (params.logAllEvents) {
            console.log('Selected place has been found');
        }
    });

    adeliomMap.on(AdeliomMapEvents.places.selectedPlaceHasBeenCentered, () => {
        if (params.logAllEvents) {
            console.log('Selected place has been centered');
        }
    });

    adeliomMap.on(AdeliomMapEvents.places.fieldHasBeenFocused, () => {
        if (params.logAllEvents) {
            console.log('Places field has been focused');
        }
    });

    adeliomMap.on(AdeliomMapEvents.places.fieldHasBeenBlurred, () => {
        if (params.logAllEvents) {
            console.log('Places field has been blurred');
        }
    });

    adeliomMap.on(AdeliomMapEvents.geolocation.success, () => {
        if (params.logAllEvents) {
            console.log('Geolocation success');
        }
    });

    adeliomMap.on(AdeliomMapEvents.geolocation.error, () => {
        if (params.logAllEvents) {
            console.log('Geolocation error');
        }
    });

    adeliomMap.on(AdeliomMapEvents.geolocation.centered, () => {
        if (params.logAllEvents) {
            console.log('Geolocation centered on map');
        }
    });

    adeliomMap.on(AdeliomMapEvents.markers.geolocationClicked, () => {
        if (params.logAllEvents) {
            console.log('Geolocation marker clicked');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.reset, () => {
        if (params.logAllEvents) {
            console.log('Map has been reset');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.clear, () => {
        if (params.logAllEvents) {
            console.log('Map has been cleared');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.typeChanged, (type) => {
        if (params.logAllEvents) {
            console.log('Map type changed to :', type);
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.consentNotGiven, () => {
        if (params.logAllEvents) {
            console.log('Map consent not given');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.consentGiven, () => {
        if (params.logAllEvents) {
            console.log('Map consent given');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.customZoom, () => {
        if (params.logAllEvents) {
            console.log('Map custom zoom');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.customMinusZoom, () => {
        if (params.logAllEvents) {
            console.log('Map custom minus zoom');
        }
    });

    adeliomMap.on(AdeliomMapEvents.map.customPlusZoom, () => {
        if (params.logAllEvents) {
            console.log('Map custom plus zoom');
        }
    });

    adeliomMap.on(AdeliomMapEvents.markers.allUnselected, () => {
        if (params.logAllEvents) {
            console.log('All markers unselected');
        }
    });

    adeliomMap.on(AdeliomMapEvents.markers.geolocationRemoved, () => {
        if (params.logAllEvents) {
            console.log('Geolocation marker removed');
        }
    });
});