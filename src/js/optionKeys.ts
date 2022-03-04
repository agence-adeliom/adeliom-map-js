import {AdeliomMapKeys} from "./AdeliomMapTypes";

const keys: AdeliomMapKeys = {
    apiKey: 'apiKey',
    map: {
        selector: 'mapSelector',
        defaultCenter: 'mapDefaultCenter',
        autoCenter: 'mapAutoCenter',
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
        displayMarkers: 'mapDisplayMarkers',
        displayInfoWindows: 'mapDisplayInfoWindows',
        allowMultipleMarkersSelected: 'mapAllowMultipleMarkersSelected',
        infoWindowTemplate: 'mapInfoWindowTemplate',
        centerMarkerOnClick: 'mapCenterMarkerOnClick',
        zoomMarkerOnClick: 'mapZoomMarkerOnClick',
        animation: 'mapAnimation',
        showPlaces: 'mapShowPlaces',
        replaceInfoWindowContentWithMarkerData: 'mapInfoWindowReplaceWithMarkerData',
        customStyles: 'mapCustomStyles',
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
    rgpd: {
        askForConsent: 'mapAskForConsent',
        defaultConsentValue: 'mapConsentDefaultValue',
        buttonMessage: 'mapConsentButtonMessage',
    }
};

export default keys;