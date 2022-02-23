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
        mapZoomMarkerOnClick: 12,
        mapDefaultZoom: 6,
        mapProvider: 'google',
        mapAnimation: 'smooth',
        mapShowPlaces: false,
        mapUseClusters: true,
        mapClusterParams: [
            {
                icon: '/dist/img/cluster.png',
                size: 40,
                from: 0,
            },
            {
                size: 56,
                from: 3,
                defaultIconColor: '#E62A4D',
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
                selectedIcon: '/dist/img/adeliom-logo-blue.png',
                hoveredIcon: '/dist/img/marker-selected.png',
                infoWindowTemplate: '<div class="map-infowindow-elt">Test template</div>',
                listEltTemplate: 'Test de template personnalisé pour le marqueur',
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
                coordinates: {
                    lat: 48.858370,
                    lng: 2.294481
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
        mapAskForConsent: true,
        mapConsentDefaultValue: true,
    });

    const disableMapButton = document.querySelector(`[js-disable-map]`);

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
});