import {AdeliomMapKeys} from "./AdeliomMapTypes";

const keys: AdeliomMapKeys = {
    apiKey: 'apiKey',
    apiOptions: 'apiOptions',
    map: {
        selector: 'mapSelector',
        defaultCenter: 'mapDefaultCenter',
        autoCenter: 'mapAutoCenter',
        autoZoom: 'mapAutoZoom',
        defaultZoom: 'mapDefaultZoom',
        provider: 'mapProvider',
        checkSize: 'checkMapSize',
        useClusters: 'mapUseClusters',
        clusterIconUrl: 'mapClusterIconUrl',
        clusterIconSize: 'mapClusterIconSize',
        clusterParams: 'mapClusterParams',
        markers: 'mapMarkers',
        markerIconUrl: 'mapMarkerIconUrl',
        markerHoveredIconUrl: 'mapMarkerHoveredIconUrl',
        markerSelectedIconUrl: 'mapMarkerSelectedIconUrl',
        markerIconSize: 'mapMarkerIconSize',
        markerIconCentered: 'markerIconCentered',
        displayMarkers: 'mapDisplayMarkers',
        displayInfoWindows: 'mapDisplayInfoWindows',
        allowMultipleMarkersSelected: 'mapAllowMultipleMarkersSelected',
        infoWindowTemplate: 'mapInfoWindowTemplate',
        centerMarkerOnClick: 'mapCenterMarkerOnClick',
        zoomMarkerOnClick: 'mapZoomMarkerOnClick',
        animation: 'mapAnimation',
        showPlaces: 'mapShowPlaces',
        type: 'mapType',
        replaceInfoWindowContentWithMarkerData: 'mapInfoWindowReplaceWithMarkerData',
        customStyles: 'mapCustomStyles',
        customZoomPlusSelector: 'mapCustomZoomPlusSelector',
        customZoomMinusSelector: 'mapCustomZoomMinusSelector',
        controls: {
            zoomButtons: 'mapEnableZoomButtons',
            streetViewButton: 'mapEnableStreetView',
            fullscreenButton: 'mapEnableFullscreenButton',
            mapTypeButtons: 'mapEnableTypeButtons',
            displayScale: 'mapDisplayScale',
            rotateControl: 'mapRotate',
        }
    },
    list: {
        selector: 'mapListSelector',
        eltTemplate: 'mapListEltTemplate',
        centerMarkerOnClick: 'mapListCenterMarkerOnClick',
        replaceWithMarkerData: 'mapListReplaceWithMarkerData',
    },
    places: {
        selector: 'placesSelector',
        options: 'placesOptions',
        mapOptions: 'placesMapOptions',
    },
    geolocation: {
        selector: 'geolocationSelector',
        options: 'geolocationOptions',
    },
    rgpd: {
        askForConsent: 'mapAskForConsent',
        usePiwik: 'mapUsePiwik',
        piwikConsentKey: 'mapPiwikConsentKey',
        piwikButtonSelectors: 'piwikButtonSelectors',
        defaultConsentValue: 'mapConsentDefaultValue',
        buttonMessage: 'mapConsentButtonMessage',
        buttonClass: 'mapConsentButtonClass',
        consentScreenClass: 'mapConsentScreenClass',
    }
};

export default keys;
