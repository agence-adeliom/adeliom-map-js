import AdeliomMapFunctions from "./AdeliomMapFunctions";
import keys from "./optionKeys";
import errors from "./errors";
import {
    AdeliomMapCoordinatesType,
    AdeliomMapMarkerParamsType,
    AdeliomMapOptionsType, AdeliomMapStyleElement, AdeliomMapTypes
} from "./AdeliomMapTypes";

export const AdeliomMapEvents = {
    map: {
        hasAutoCentered: 'mapHasAutoCentered',
        mapLoaded: 'mapLoaded',
        reset: 'mapReset',
        clear: 'mapCleared',
        typeChanged: 'mapTypeChanged',
        consentNotGiven: 'mapConsentNotGiven',
        consentGiven: 'mapConsentGiven',
        customMinusZoom: 'mapCustomMinusZoom',
        customPlusZoom: 'mapCustomPlusZoom',
        customZoom: 'mapCustomZoom',
        hasBeenDragged: 'mapHasBeenDragged',
    },
    places: {
        selectedPlaceHasBeenCentered: 'selectedPlaceHasBeenCentered',
        selectedPlaceHasBeenFound: 'selectedPlaceHasBeenFound',
        fieldHasBeenFocused: 'fieldHasBeenFocused',
        fieldHasBeenBlurred: 'fieldHasBeenBlurred',
    },
    geolocation: {
        success: 'geolocationSuccess',
        error: 'geolocationError',
        centered: 'geolocationCentered',
    },
    clusters: {
        enabled: 'clustersEnabled',
        disabled: 'clustersDisabled',
    },
    markers: {
        allCreated: 'allMarkerCreated',
        created: 'markerCreated',
        dataCreated: 'markerDataCreated',
        clicked: 'markerClicked',
        geolocationClicked: 'markerGeolocationClicked',
        geolocationRemoved: 'markerGeolocationRemoved',
        allUnselected: 'allMarkerUnselected',
        allFit: 'allMarkersFit',
    },
    infoWindows: {
        created: 'infoWindowCreated',
    },
    listElements: {
        created: 'listEltCreated',
        clicked: 'listEltClicked',
    },
    rgpd: {
        consentButtonClicked: 'consentButtonClicked',
        acceptAllClicked: 'acceptAllClicked',
        rejectAllClicked: 'rejectAllClicked',
        saveChoicesClicked: 'saveChoicesClicked',
    }
};

export default class AdeliomMap extends AdeliomMapFunctions {

    constructor(options: AdeliomMapOptionsType) {
        super();

        this.options = Object.assign(this.defaultOptions, options);

        this.usePiwik = Boolean(this.options[keys.rgpd.usePiwik as keyof AdeliomMapOptionsType]);
        this.hasConsent = Boolean(this.options[keys.rgpd.defaultConsentValue as keyof AdeliomMapOptionsType]);

        const mapSelector = this.options[keys.map.selector as keyof AdeliomMapOptionsType];
        const mapListSelector = this.options[keys.list.selector as keyof AdeliomMapOptionsType];
        const placesSelector = this.options[keys.places.selector as keyof AdeliomMapOptionsType];
        const geolocationSelector = this.options[keys.geolocation.selector as keyof AdeliomMapOptionsType];

        if (mapSelector && typeof mapSelector === 'string') {
            this.mapContainer = document.querySelector(mapSelector);
        }

        this.helpers.map._commonInit();
        this.mapListEltTemplate = null;

        if (mapListSelector && typeof mapListSelector === 'string') {
            this.mapListContainer = document.querySelector(mapListSelector);
            this.helpers.listNodes._commonInit();

            const eltTemplate = this.options[keys.list.eltTemplate as keyof AdeliomMapOptionsType];

            if (eltTemplate) {
                this.mapListEltTemplate = eltTemplate;
            }
        }

        if (placesSelector && typeof placesSelector === 'string') {
            this.placesInput = document.querySelector(placesSelector);

            this.helpers.places._commonInit();
        }

        if (geolocationSelector && typeof geolocationSelector === 'string') {
            this.geolocationButton = document.querySelector(geolocationSelector);

            this.helpers.geolocation._commonInit();
        }

        this._handlePiwikEvents();

        // @ts-ignore
        this.markers = this.options[keys.map.markers as keyof AdeliomMapOptionsType] ?? [];
        this.displayMarkers = Boolean(this.options[keys.map.displayMarkers as keyof AdeliomMapOptionsType]) ?? false;

        if (this.options[keys.apiKey as keyof AdeliomMapOptionsType]) {
            this.helpers.map._setMap();
        } else {
            console.error(errors.apiKey.notProvided);
        }
    };


    /**
     * Dynamically sets the consent value to display consent screen or map depending on passed value
     * @param consent
     * @public
     */
    _setConsent(consent: boolean) {
        this.helpers.consentScreen._setConsentScreen(consent);
    };

    _addMarkers(markersRawData: AdeliomMapMarkerParamsType | AdeliomMapMarkerParamsType[]) {
        this.helpers.markers._addMarkers(markersRawData);
    };

    _removeMarkers(markers: any) {
        this.helpers.markers._removeMarkers(markers);
    }

    _getMarkersData() {
        return this.helpers.markers._getMarkersData();
    }

    _getAllCurrentMarkersRawData() {
        return this.helpers.markersData._getAllMarkersRawData();
    }

    _disableClusters() {
        return this.helpers.markers._disableClusters();
    }

    _enableClusters() {
        return this.helpers.markers._enableClusters();
    }

    _geolocateOnMap(withZoom: number | boolean = false, displayMarker: boolean = false) {
        this.helpers.geolocation._handleGeolocationRequest(false, withZoom, displayMarker);
    }

    _removeGeolocationMarker() {
        this.helpers.geolocation._removeGeolocationMarker();
    }

    _clearMap() {
        this.helpers.map._clearMap();
    }

    _resetMap() {
        this.helpers.map._resetMap();
    }

    _setZoom(zoom?: number) {
        if (zoom) {
            this.helpers.map._setZoom(zoom);
        }
    }

    _setCenter(coordinates: AdeliomMapCoordinatesType) {
        if (coordinates) {
            this.helpers.map._setCenter(coordinates);
        }
    }

    _setMapType(type: AdeliomMapTypes) {
        this.helpers.map._setMapType(type);
    }

    _zoomMinus() {
        this.helpers.map._handleMinusZoom();
    }

    _zoomPlus() {
        this.helpers.map._handlePlusZoom();
    }

    _unselectAllMarkers() {
        this.helpers.markers._unselectAllMarkers();
    }

    _setStyle(styles: AdeliomMapStyleElement[]) {
        this.helpers.map._setMapStyle(styles);
    }

    _fitAllMarkers() {
        const markersRawData: AdeliomMapMarkerParamsType[] = [];

        this.helpers.markers._getMarkersData().forEach((marker: any) => {
            if (marker?.rawData) {
                markersRawData.push(marker.rawData);
            }
        });

        this.helpers.markers._autoZoomToFitAllMarkers(markersRawData);
    }
};
