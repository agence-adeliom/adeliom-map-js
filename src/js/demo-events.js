import {AdeliomMapEvents} from "./AdeliomMap";

const DemoEvents = {};

DemoEvents.init = (adeliomMap, params) => {
    adeliomMap.on(AdeliomMapEvents.map.mapLoaded, () => {
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

        adeliomMap.on(AdeliomMapEvents.markers.allFit, (bounds) => {
            if (params.logAllEvents) {
                console.log('All markers fit in map view', bounds);
            }
        });

        adeliomMap.on(AdeliomMapEvents.map.hasBeenDragged, (bounds) => {
            if (params.logAllEvents) {
                console.log('Map has been dragged', bounds);
            }
        });
    });
};

export default DemoEvents;