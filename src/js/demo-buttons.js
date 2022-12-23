import {getBaseStyleParams} from "./AdeliomMapStyleBase";

const DemoButtons = {};

DemoButtons.init = () => {
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
    const printStylesToConsoleButton = document.querySelector(`[js-print-params-in-console]`);
    const updateStylesButton = document.querySelector(`[js-set-custom-styles]`);
    const copyStylesButton = document.querySelector(`[js-copy-custom-styles]`);
    const fitAllMarkersButton = document.querySelector(`[js-fit-all-markers]`);
    const centerOnPositionButton = document.querySelector(`[js-center-on-position]`);

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

    printStylesToConsoleButton.addEventListener('click', () => {
        console.log(getBaseStyleParams());
    });

    updateStylesButton.addEventListener('click', () => {
        adeliomMap._setStyle(getBaseStyleParams());
    });

    copyStylesButton.addEventListener('click', () => {
        navigator.clipboard.writeText(getBaseStyleParams(true));
    });

    centerOnPositionButton.addEventListener('click', () => {
        adeliomMap._geolocateOnMap();
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

        setTimeout(() => {
            console.log(adeliomMap._getMarkersData());
        }, 1000);
    });

    fitAllMarkersButton.addEventListener('click', () => {
        adeliomMap._fitAllMarkers();
    });

    if (disableMapButton) {
        if (adeliomMap.options['mapAskForConsent']) {
            disableMapButton.addEventListener('click', () => {
                adeliomMap._setConsent(false);
            });
        } else {
            disableMapButton.style.display = 'none';
        }
    }
};

export default DemoButtons;