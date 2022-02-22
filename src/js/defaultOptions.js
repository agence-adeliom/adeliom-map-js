import keys from "./optionKeys";

export const mapAnims = {
    smooth: 'smooth',
    default: 'default',
}

const defaultOptions = {};
defaultOptions[keys.map.selector] = null;
defaultOptions[keys.list.selector] = null;
defaultOptions[keys.apiKey] = null;
defaultOptions[keys.map.checkSize] = false;
defaultOptions[keys.map.useClusters] = false;
defaultOptions[keys.map.clusterIconUrl] = null;
defaultOptions[keys.map.clusterIconSize] = 56;
defaultOptions[keys.map.markers] = [];
defaultOptions[keys.map.markerIconSize] = 56;
defaultOptions[keys.map.markerIconUrl] = null;
defaultOptions[keys.map.markerSelectedIconUrl] = null;
defaultOptions[keys.map.allowMultipleMarkersSelected] = true;
defaultOptions[keys.map.defaultCenter] = {lat: 48.614782, lng: 7.714012};
defaultOptions[keys.map.defaultZoom] = 12;
defaultOptions[keys.map.provider] = 'google';
defaultOptions[keys.map.displayMarkers] = true;
defaultOptions[keys.map.displayInfoWindows] = true;
defaultOptions[keys.map.infoWindowTemplate] = '';
defaultOptions[keys.map.centerMarkerOnClick] = true;
defaultOptions[keys.map.zoomMarkerOnClick] = 12;
defaultOptions[keys.map.animation] = mapAnims.smooth;
defaultOptions[keys.map.showPlaces] = false;
defaultOptions[keys.map.replaceInfoWindowContentWithMarkerData] = false;
defaultOptions[keys.map.controls.zoomButtons] = false;
defaultOptions[keys.map.controls.streetViewButton] = false;
defaultOptions[keys.map.controls.fullscreenButton] = false;
defaultOptions[keys.map.controls.mapTypeButtons] = false;
defaultOptions[keys.map.controls.displayScale] = false;
defaultOptions[keys.map.controls.rotateControl] = false;
defaultOptions[keys.list.eltTemplate] = '';
defaultOptions[keys.list.centerMarkerOnClick] = true;
defaultOptions[keys.list.replaceWithMarkerData] = false;
defaultOptions[keys.rgpd.askForConsent] = false;
defaultOptions[keys.rgpd.defaultConsentValue] = false;
defaultOptions[keys.rgpd.buttonMessage] = 'Activer la carte';

export default defaultOptions;