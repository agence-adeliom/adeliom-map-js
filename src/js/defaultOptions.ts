import {AdeliomMapAnimsType, AdeliomMapOptionsType} from "./AdeliomMapTypes";

export const mapAnims: AdeliomMapAnimsType = {
    smooth: 'smooth',
    default: 'default',
}

const defaultOptions: AdeliomMapOptionsType = {
    checkMapSize: false,
    mapUseClusters: false,
    mapClusterIconSize: 56,
    placesSelector: undefined,
    placesOptions: {
        componentRestrictions: {
            country: 'fr',
        },
        fields: ['geometry.location', 'formatted_address'],
    },
    placesMapOptions: {
        autoCenterOnPlace: true,
        zoomOnPlace: 15,
    },
    mapClusterParams: [
        {
            from: 2,
            defaultIconColor: "#E62A4D",
            size: 56,
        },
    ],
    mapMarkers: [
        {
            title: 'Agence Adeliom',
            description: 'Agence Digitale',
            coordinates: {
                lat: 48.614782,
                lng: 7.714012,
            },
        },
    ],
    mapMarkerIconSize: 56,
    allowMultipleMarkersSelected: true,
    mapDefaultCenter: {lat: 48.614782, lng: 7.714012},
    mapAutoCenter: false,
    mapDefaultZoom: 12,
    mapProvider: 'google',
    mapDisplayMarkers: true,
    mapDisplayInfoWindows: true,
    mapInfoWindowTemplate: '',
    mapCenterMarkerOnClick: true,
    mapZoomMarkerOnClick: 12,
    mapHideMarkerOnClickOutside: false,
    mapShowPlaces: false,
    mapInfoWindowReplaceWithMarkerData: false,
    mapCustomStyles: [],
    mapEnableZoomButtons: false,
    mapEnableStreetView: false,
    mapEnableFullscreenButton: false,
    mapEnableTypeButtons: false,
    mapDisplayScale: false,
    mapRotate: false,
    mapAskForConsent: false,
    mapConsentDefaultValue: false,
    mapConsentButtonMessage: 'Activer la carte',
    mapListReplaceWithMarkerData: false,
    mapListCenterMarkerOnClick: true,
    mapListEltTemplate: '',
    mapAnimation: mapAnims.smooth,
    markerIconCentered: false,
    clusterIconCentered: false,
};

export default defaultOptions;