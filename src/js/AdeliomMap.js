import AdeliomMapFunctions from "./AdeliomMapFunctions";
import keys from "./optionKeys";
import errors from "./errors";

const mapCustomClass = 'adeliom-map-js';

export const AdeliomMapEvents = {
    map: {
        hasAutoCentered: 'mapHasAutoCentered',
    },
    markers: {
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

    constructor(options) {
        super();

        this.options = Object.assign(this.defaultOptions, options);

        this.hasConsent = this.options[keys.rgpd.defaultConsentValue];

        this.mapContainer = document.querySelector(this.options[keys.map.selector]);
        this.helpers.map._commonInit();
        this.mapListEltTemplate = null;

        if (this.options[keys.list.selector]) {
            this.mapListContainer = document.querySelector(this.options[keys.list.selector]);
            this.helpers.listNodes._commonInit();

            if (this.options[keys.list.eltTemplate]) {
                this.mapListEltTemplate = this.options[keys.list.eltTemplate];
            }
        }


        this.markers = this.options[keys.map.markers] ?? [];
        this.displayMarkers = this.options[keys.map.displayMarkers] ?? false;

        if (this.options[keys.apiKey]) {
            this.helpers.map._setMap();
        } else {
            console.error(errors.apiKey.notProvided);
        }
    };

    async _initMap() {
        if (this.options[keys.map.selector]) {
            if (this.mapContainer) {
                this.helpers.map._addClassesToMapContainer([mapCustomClass]);

                return await this._handleConsent();
            } else {
                console.error(errors.selectors.map.notFound);
            }
        } else {
            console.error(errors.selectors.map.notProvided);
        }

        return false;
    };

    async _handleConsent() {
        if ((this.options[keys.rgpd.askForConsent] && !this.hasConsent)) {
            this.helpers.consentScreen._setConsentScreen();
            return false;
        } else {
            if (!this.options[keys.map.checkSize] || (this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                const provider = this.options[keys.map.provider];
                if (provider) {
                    if (this.helpers.providers._isProviderAvailable(provider)) {
                        switch (this.options[keys.map.provider]) {
                            case 'google':
                            default:
                                await this.helpers.google.map._initMap(this.mapContainer);
                        }

                        return true;
                    } else {
                        console.error(`The provider "${provider}" is not available.`);
                    }
                }

                return false;
            } else {
                console.error(errors.selectors.map.tooSmall);

                return false;
            }
        }
    }

    /**
     * Dynamically sets the consent value to display consent screen or map depending on passed value
     * @param consent
     * @public
     */
    _setConsent(consent) {
        this.hasConsent = consent;

        if (consent) {
            this.helpers.map._setMap();
        } else {
            this.helpers.consentScreen._setConsentScreen();
        }
    }

    _handleClickMarker(marker) {
        if (this.options[keys.map.displayInfoWindows]) {
            if (this.helpers.markers._isMarkerSelected(marker)) {
                this.helpers.markers._setMarkerState(marker, false);
            } else {
                this.helpers.markers._setMarkerState(marker, true);
            }
        }

        const data = this.helpers.markersData._getDataByProperty('marker', marker);

        this.emit(AdeliomMapEvents.markers.clicked, data);
    };

    _handleClickListElt(listElt) {
        const mapMarkerInstance = this.helpers.markers._getMarkerByListEltNode(listElt);

        if (mapMarkerInstance) {
            if (this.options[keys.map.displayInfoWindows]) {
                this.helpers.markers._setMarkerState(mapMarkerInstance, 'toggle');
            }
        }

        const data = this.helpers.markersData._getDataByProperty('listElt', listElt);

        this.emit(AdeliomMapEvents.listElements.clicked, data);
    };

    /**
     * Creates a map list instance (store locator instance)
     * @param markerRawData
     * @param mapMarkerInstance
     * @returns {HTMLDivElement}
     * @private
     */
    _createMapListInstance(markerRawData, mapMarkerInstance) {
        let mapListInstance;

        if (markerRawData?.listEltId) {
            mapListInstance = document.querySelector(`[js-map-list-id='${markerRawData.listEltId}']`);

        } else {
            mapListInstance = document.createElement('div');
            const selectorWithout = this.options[keys.list.selector].replace('[', '').replace(']', '');

            mapListInstance.setAttribute(selectorWithout + '-elt', '');

            let listInstanceHtml;

            // If a list elt template is defined for this specific marker
            if (markerRawData?.listEltTemplate) {
                listInstanceHtml = markerRawData.listEltTemplate;
            } else {
                listInstanceHtml = this.mapListEltTemplate;

                if (this.options[keys.list.replaceWithMarkerData]) {
                    listInstanceHtml = this._replaceMarkerDataInString(markerRawData, listInstanceHtml);
                }
            }

            mapListInstance.innerHTML = listInstanceHtml;

            this.mapListContainer.appendChild(mapListInstance);
        }

        if (mapListInstance) {
            mapListInstance.addEventListener('click', () => {
                this._handleClickListElt(mapListInstance);
            });

            this.emit(AdeliomMapEvents.listElements.created, mapListInstance);
        }

        return mapListInstance;
    };

    _replaceMarkerDataInString(markerData, string) {
        if (string) {
            Object.keys(markerData).forEach(key => {
                const search = `{{ ${key} }}`;
                string = string.replaceAll(search, markerData[key]);
            });
        }

        return string;
    }

};