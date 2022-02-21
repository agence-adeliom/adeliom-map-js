import {Loader} from 'google-maps';
import AdeliomMapFunctions from "./AdeliomMapFunctions";
import keys from "./optionKeys";
import errors from "./errors";

const mapCustomClass = 'adeliom-map-js';
const consentScreenContainerAttribute = 'adeliom-map-js-consent-screen';
const consentButtonAttribute = 'adeliom-map-js-consent-button';

const smoothAnim = 'smooth';

export const AdeliomMapEvents = {
    markers: {
        created: 'markerCreated',
        dataCreated: 'markerDataCreated',
        clicked: 'markerClicked',
    },
    infoWindows: {
        created: 'markerInfoWindowCreated',
    },
    listElements: {
        created: 'markerListEltCreated',
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
        this.mapListEltTemplate = null;

        this.markers = this.options[keys.map.markers] ?? [];
        this.displayMarkers = this.options[keys.map.displayMarkers] ?? false;

        if (this.options[keys.apiKey]) {
            this._setMap();
        } else {
            console.error(errors.apiKey.notProvided);
        }
    };

    async _initMap() {
        if (this.options[keys.map.selector]) {
            if (this.options[keys.list.selector]) {
                this.mapListContainer = document.querySelector(this.options[keys.list.selector]);

                if (this.options[keys.list.eltTemplate]) {
                    this.mapListEltTemplate = this.options[keys.list.eltTemplate];
                }
            }

            if (this.mapContainer) {
                this._addMapCustomClass();

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
            this._setConsentScreen();
            return false;
        } else {
            if (!this.options[keys.map.checkSize] || (this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                switch (this.options[keys.map.provider]) {
                    case 'google':
                    default:
                        await this._initGoogleMap(this.mapContainer);
                }

                return true;
            } else {
                console.error(errors.selectors.map.tooSmall);

                return false;
            }
        }
    }

    /**
     *Removes the consent screen and displays the map
     * @private
     */
    _setMap() {
        if (this.mapContainer) {
            this.mapContainer.innerHTML = '';

            this._initMap().then((isInit) => {
                if (isInit && this.displayMarkers) {
                    this._initMarkers();
                }
            });
        }
    }

    /**
     * Removes the displayed map and sets the consent screen
     * @private
     */
    _setConsentScreen() {
        if (this.mapContainer) {
            this.mapContainer.innerHTML = '';

            if (this.mapListContainer) {
                this.mapListContainer.innerHTML = '';
            }

            if (this.map) {
                this.map = null;
            }

            const consentScreen = document.createElement('div');
            consentScreen.setAttribute(consentScreenContainerAttribute, '');

            const consentButton = document.createElement('button');
            consentButton.innerText = this.options[keys.rgpd.buttonMessage];
            consentButton.setAttribute(consentButtonAttribute, '');

            consentButton.addEventListener('click', () => {
                this.emit(AdeliomMapEvents.rgpd.consentButtonClicked, this);
            });

            consentScreen.appendChild(consentButton);

            this.mapContainer.appendChild(consentScreen);
        }
    }

    /**
     * Dynamically sets the consent value to display consent screen or map depending on passed value
     * @param consent
     * @private
     */
    _setConsent(consent) {
        this.hasConsent = consent;

        if (consent) {
            this._setMap();
        } else {
            this._setConsentScreen();
        }
    }

    async _initGoogleMap(container) {
        if (!this.google) {
            const loader = new Loader(this.options.apiKey);

            this.google = await loader.load();
        }

        this.map = new this.google.maps.Map(container, {
            center: this.options[keys.map.defaultCenter],
            zoom: this.options[keys.map.defaultZoom],
            zoomControl: this.options[keys.map.controls.zoomButtons],
            streetViewControl: this.options[keys.map.controls.streetViewButton],
            fullscreenControl: this.options[keys.map.controls.fullscreenButton],
            mapTypeControl: this.options[keys.map.controls.mapTypeButtons],
            scaleControl: this.options[keys.map.controls.displayScale],
            rotateControl: this.options[keys.map.controls.rotateControl],
            styles: this._getGoogleMapStyles(),
        });
    };

    _getGoogleMapStyles() {
        const poiStyle = {
            featureType: 'poi',
            stylers: [
                {
                    visibility: this.options[keys.map.showPlaces] ? 'on' : 'off',
                }
            ]
        };

        return [
            poiStyle,
        ];
    }

    _addMapCustomClass() {
        if (this.mapContainer) {
            this.mapContainer.classList.add(mapCustomClass);
        }
    }

    /**
     * Init markers by its map provider (google, ...)
     * @private
     */
    _initMarkers() {
        switch (this.options[keys.map.provider]) {
            case 'google':
            default:
                this._initGoogleMapMarkers();
                break;
        }
    };

    /**
     * Loop to init Google Maps markers
     * @private
     */
    _initGoogleMapMarkers() {
        this.markers.forEach(marker => {
            let markerData = this._createGoogleMapMarker(marker);
            this.emit(AdeliomMapEvents.markers.dataCreated, markerData);
        });
    };

    _createGoogleMapMarker(markerRawData) {
        const markerData = {};
        markerData.selected = false;

        const markerPosition = new this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng);
        const markerTitle = markerRawData?.title;

        const markerConfig = {
            position: markerPosition,
            title: markerTitle,
            map: this.map,
        };

        if (markerRawData?.icon) {
            markerConfig.icon = markerRawData.icon;
            markerData.icon = markerRawData.icon;
        } else if (this.options[keys.map.markerIcon]) {
            markerConfig.icon = this.options[keys.map.markerIcon];
        }

        if (markerRawData?.selectedIcon) {
            markerData.selectedIcon = markerRawData.selectedIcon;
        }

        const markerInstance = new this.google.maps.Marker(markerConfig);
        this.emit(AdeliomMapEvents.markers.created, markerInstance);

        markerData.marker = markerInstance;

        markerData.infoWindow = this._createGoogleMapInfoWindow(markerRawData);

        let listElt = null;

        if (this.mapListContainer) {
            listElt = this._createMapListInstance(markerRawData, markerInstance);
            markerData.listElt = listElt;
        }

        this.google.maps.event.addListener(markerInstance, 'click', () => {
            this._handleClickMarker(markerInstance)
        });

        this.markersData.push(markerData);

        return markerData;
    };

    _createGoogleMapInfoWindow(markerRawData) {
        if (this.options[keys.map.displayInfoWindows]) {

            let content;

            // If an infoWindow template is defined for this specific marker
            if (markerRawData?.infoWindowTemplate) {
                content = markerRawData.infoWindowTemplate;
            } else {
                content = this.options[keys.map.infoWindowTemplate];

                if (this.options[keys.map.replaceInfoWindowContentWithMarkerData]) {
                    content = this._replaceMarkerDataInString(markerRawData, content)
                }
            }

            const infoWindowInstance = new this.google.maps.InfoWindow({
                content: content,
            });

            this.emit(AdeliomMapEvents.infoWindows.created, infoWindowInstance);

            return infoWindowInstance;
        }

        return null;
    }

    _handleClickMarker(marker) {
        if (this.options[keys.map.displayInfoWindows]) {
            if (this.helpers.markers._isMarkerSelected(marker)) {
                this.helpers.markers._setMarkerAsSelected(marker, false);
            } else {
                this.helpers.markers._setMarkerAsSelected(marker, true);
            }
        }

        const data = this.helpers.markersData._getDataByProperty('marker', marker);

        this.emit(AdeliomMapEvents.markers.clicked, data);
    };

    _handleClickListElt(listElt) {
        const mapMarkerInstance = this.helpers.markers._getMarkerByListEltNode(listElt);

        if (mapMarkerInstance) {
            if (this.options[keys.map.displayInfoWindows]) {
                this.helpers.markers._setMarkerAsSelected(mapMarkerInstance, 'toggle');
            }
        }
    };

    /**
     * Creates a map list instance (store locator instance)
     * @param markerRawData
     * @param mapMarkerInstance
     * @returns {HTMLDivElement}
     * @private
     */
    _createMapListInstance(markerRawData, mapMarkerInstance) {
        const mapListInstance = document.createElement('div');
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

        mapListInstance.addEventListener('click', () => {
            this._handleClickListElt(mapListInstance);
        });

        this.mapListContainer.appendChild(mapListInstance);

        if (mapListInstance) {
            this.emit(AdeliomMapEvents.listElements.created, mapListInstance);
        }

        return mapListInstance;
    };

    _replaceMarkerDataInString(markerData, string) {
        Object.keys(markerData).forEach(key => {
            const search = `{{ ${key} }}`;
            string = string.replaceAll(search, markerData[key]);
        });

        return string;
    }

    /**
     * Closes an infoWindow by specifying its associated marker
     * @param marker
     * @private
     */
    _closeInfoWindowByMarker(marker) {
        const infoWindow = this.helpers.infoWindows._getInfoWindowByMarker(marker);

        if (infoWindow) {
            infoWindow.close();
        }
    };

};