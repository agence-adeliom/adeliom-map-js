import AdeliomMapFunctions from "./AdeliomMapFunctions";
import keys from "./optionKeys";
import errors from "./errors";
import {AdeliomMapOptionsType} from "./AdeliomMapTypes";

export const AdeliomMapEvents = {
    map: {
        hasAutoCentered: 'mapHasAutoCentered',
        mapLoaded: 'mapLoaded',
    },
    places: {
        selectedPlaceHasBeenCentered: 'selectedPlaceHasBeenCentered',
        selectedPlaceHasBeenFound: 'selectedPlaceHasBeenFound',
        fieldHasBeenFocused: 'fieldHasBeenFocused',
        fieldHasBeenBlurred: 'fieldHasBeenBlurred',
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
    }
};

export default class AdeliomMap extends AdeliomMapFunctions {

    constructor(options: AdeliomMapOptionsType) {
        super();

        this.options = Object.assign(this.defaultOptions, options);

        this.hasConsent = this.options[keys.rgpd.defaultConsentValue as keyof AdeliomMapOptionsType];

        const mapSelector = this.options[keys.map.selector as keyof AdeliomMapOptionsType];
        const mapListSelector = this.options[keys.list.selector as keyof AdeliomMapOptionsType];
        const placesSelector = this.options[keys.places.selector as keyof AdeliomMapOptionsType];

        this.mapContainer = document.querySelector(mapSelector);
        this.helpers.map._commonInit();
        this.mapListEltTemplate = null;

        if (mapListSelector) {
            this.mapListContainer = document.querySelector(mapListSelector);
            this.helpers.listNodes._commonInit();

            const eltTemplate = this.options[keys.list.eltTemplate as keyof AdeliomMapOptionsType];

            if (eltTemplate) {
                this.mapListEltTemplate = eltTemplate;
            }
        }

        if (placesSelector) {
            this.placesInput = document.querySelector(placesSelector);

            this.helpers.places._commonInit();
        }

        this.markers = this.options[keys.map.markers as keyof AdeliomMapOptionsType] ?? [];
        this.displayMarkers = this.options[keys.map.displayMarkers as keyof AdeliomMapOptionsType] ?? false;

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
        this.hasConsent = consent;

        if (consent) {
            this.helpers.map._setMap();
        } else {
            this.helpers.consentScreen._setConsentScreen();
        }
    };

    _addMarkers(markersRawData: any) {
        switch (this.helpers.providers._getProvider()) {
            case 'google':
            default:
                this.helpers.google.markers._addMapMarkers(markersRawData);
                break;
        }
    };

    _removeMarkers(markers: any) {
        switch (this.helpers.providers._getProvider()) {
            case 'google':
            default:
                this.helpers.google.markers._removeMapMarkers(markers);
                break;
        }
    }

    _getMarkersData() {
        switch (this.helpers.providers._getProvider()) {
            case 'google':
            default:
                return this.helpers.markers._getMarkersData();
                break;
        }
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
};