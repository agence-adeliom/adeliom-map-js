import AdeliomMapFunctions from "./AdeliomMapFunctions";
import keys from "./optionKeys";
import errors from "./errors";
import {AdeliomMapOptionsType} from "./AdeliomMapTypes";

export const AdeliomMapEvents = {
    map: {
        hasAutoCentered: 'mapHasAutoCentered',
        mapLoaded: 'mapLoaded',
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

        this.mapContainer = document.querySelector(this.options[keys.map.selector as keyof AdeliomMapOptionsType]);
        this.helpers.map._commonInit();
        this.mapListEltTemplate = null;

        if (this.options[keys.list.selector as keyof AdeliomMapOptionsType]) {
            this.mapListContainer = document.querySelector(this.options[keys.list.selector as keyof AdeliomMapOptionsType]);
            this.helpers.listNodes._commonInit();

            if (this.options[keys.list.eltTemplate as keyof AdeliomMapOptionsType]) {
                this.mapListEltTemplate = this.options[keys.list.eltTemplate as keyof AdeliomMapOptionsType];
            }
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
    }
};