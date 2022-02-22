import Emitter from "dauphine-js/dist/emitter";
import keys from "./optionKeys";
import defaultOptions, {mapAnims} from "./defaultOptions";
import {AdeliomMapEvents} from "./AdeliomMap";
import {Loader} from "google-maps";

const consentScreenContainerAttribute = 'adeliom-map-js-consent-screen';
const consentButtonAttribute = 'adeliom-map-js-consent-button';
const openedMarkerListEltAttribute = 'js-map-list-elt-opened';

export default class AdeliomMapFunctions extends Emitter {
    constructor() {
        super();

        this.defaultOptions = defaultOptions;

        this.map = null;
        this.mapContainer = null;
        this.mapListContainer = null;

        this.markers = [];
        this.markersData = [];

        this.displayMarkers = false;

        this.google = null;
    }

    helpers = {
        infoWindows: {
            /**
             * Returns whether an info window is currently opened
             * @param infoWindow
             * @returns {boolean}
             * @private
             */
            _isInfoWindowOpened: (infoWindow) => {
                return infoWindow.getMap() ? true : false;
            },
            /**
             * Generic method to retrieve some data by specifying an infoWindow
             * @param data
             * @param infoWindow
             * @returns {*}
             * @private
             */
            _returnDataByInfoWindow: (data, infoWindow) => {
                return this.helpers.markersData._getDataByProperty('infoWindow', infoWindow)[data];
            },
            /**
             * Returns an existing infoWindow instance by providing a marker
             * @param marker
             * @returns {null}
             * @private
             */
            _getInfoWindowByMarker: (marker) => {
                return this.helpers.markersData._returnDataByMarker('infoWindow', marker);
            },
            /**
             * Opens the provided infoWindow
             * @param infoWindow
             * @private
             */
            _openInfoWindow: (infoWindow) => {
                if (this.helpers.infoWindows._isInfoWindowOpened(infoWindow)) {
                    infoWindow.close();
                } else {
                    if (!this.options[keys.map.allowMultipleMarkersSelected]) {
                        this.helpers.markers._unselectAllMarkers();
                    }

                    const marker = this.helpers.markers._getMarkerByInfoWindow(infoWindow);

                    if (marker) {
                        infoWindow.open(this.map, marker);

                        if (this.options[keys.map.centerMarkerOnClick]) {
                            this.helpers.map._centerMapOnMarker(marker);
                        }
                    }
                }
            },
            /**
             * Opens an infoWindow by its associated marker
             * @param marker
             * @private
             */
            _openInfoWindowByMarker: (marker) => {
                const infoWindow = this.helpers.infoWindows._getInfoWindowByMarker(marker);

                if (infoWindow) {
                    this.helpers.infoWindows._openInfoWindow(infoWindow);
                }
            },
            /**
             * Closes an infoWindow by specifying its associated marker
             * @param marker
             * @private
             */
            _closeInfoWindowByMarker: (marker) => {
                const infoWindow = this.helpers.infoWindows._getInfoWindowByMarker(marker);

                if (infoWindow) {
                    infoWindow.close();
                }
            },
        },
        markers: {
            /**
             * Init markers by its map provider (google, ...)
             * @private
             */
            _initMarkers: (markers) => {
                switch (this.options[keys.map.provider]) {
                    case 'google':
                    default:
                        this.helpers.google.markers._initMapMarkers(markers);
                        break;
                }
            },
            /**
             * Returns whether a marker is selected or not
             * @param marker
             * @returns {bool}
             * @private
             */
            _isMarkerSelected: (marker) => {
                const data = this.helpers.markersData._getDataByProperty('marker', marker);

                return data?.selected;
            },
            /**
             * Returns an existing marker node by providing a listEltNode
             * @param marker
             * @returns {null}
             * @private
             */
            _getMarkerByListEltNode: (listEltNode) => {
                return this.helpers.listNodes._returnDataByListEltNode('marker', listEltNode);
            },
            /**
             * Un-select all markers and close all infoWindows
             * @private
             */
            _unselectAllMarkers: () => {
                this.markersData.forEach(markerData => {
                    if (markerData?.marker && markerData?.selected) {
                        this.helpers.markers._setMarkerState(markerData.marker, false);
                    }

                    if (markerData?.infoWindow) {
                        if (this.helpers.infoWindows._isInfoWindowOpened(markerData.infoWindow)) {
                            markerData.infoWindow.close();
                        }
                    }
                });
            },
            /**
             * Returns the lat/lng object of the provided marker
             * @param marker
             * @returns {{lng: *, lat: *}}
             * @private
             */
            _getMarkerCoordinates: (marker) => {
                return {
                    lat: marker.getPosition().lat(),
                    lng: marker.getPosition().lng(),
                };
            },
            /**
             * Returns an existing marker instance by providing an infoWindow
             * @param marker
             * @returns {null}
             * @private
             */
            _getMarkerByInfoWindow: (infoWindow) => {
                return this.helpers.infoWindows._returnDataByInfoWindow('marker', infoWindow);
            },
            /**
             * Sets the provided marker as selected (depending on provided second value)
             * @param marker
             * @param isSelected
             * @private
             */
            _setMarkerState: (marker, isSelected = null) => {
                if (isSelected == 'toggle') {
                    isSelected = !this.helpers.markersData._getDataByProperty('marker', marker).selected;
                }

                if (isSelected === null) {
                    isSelected = true;
                }

                if (isSelected === true) {
                    this.helpers.markers._openMarker(marker);
                } else if (isSelected === false) {
                    this.helpers.markers._closeMarker(marker);
                }

                this.helpers.markersData._setDataByProperty('marker', marker, 'selected', isSelected);

                if (!isSelected) {
                    marker.setIcon(this.helpers.markers._getIdleIconForMarker(marker));
                } else {
                    marker.setIcon(this.helpers.markers._getSelectedIconForMarker(marker));
                }
            },
            /**
             * Opens the passed marker
             * @param marker
             * @private
             */
            _openMarker: (marker) => {
                if (!this.options[keys.map.allowMultipleMarkersSelected]) {
                    this.helpers.markers._unselectAllMarkers();
                }

                this.helpers.infoWindows._openInfoWindowByMarker(marker);

                const listNode = this.helpers.listNodes._getListNodeByMarker(marker);

                if (listNode) {
                    listNode.setAttribute(openedMarkerListEltAttribute, '');
                }
            },
            /**
             * Closes the passed marker
             * @param marker
             * @private
             */
            _closeMarker: (marker) => {
                this.helpers.infoWindows._closeInfoWindowByMarker(marker);

                const listNode = this.helpers.listNodes._getListNodeByMarker(marker);

                if (listNode) {
                    listNode.removeAttribute(openedMarkerListEltAttribute);
                }
            },
            /**
             * Returns the unselected icon for the provided marker
             * @param marker
             * @returns {null|*}
             * @private
             */
            _getIdleIconForMarker: (marker) => {
                const data = this.helpers.markersData._getDataByProperty('marker', marker);

                if (data?.icon) {
                    return data.icon;
                } else if (this.options[keys.map.markerIcon]) {
                    return this.options[keys.map.markerIcon];
                }

                return null;
            },
            /**
             * Returns the selected icon for the provided marker
             * @param marker
             * @returns {null|string|*}
             * @private
             */
            _getSelectedIconForMarker: (marker) => {
                const data = this.helpers.markersData._getDataByProperty('marker', marker);

                if (data?.selectedIcon) {
                    return data.selectedIcon;
                } else if (this.options[keys.map.markerSelectedIcon]) {
                    return this.options[keys.map.markerSelectedIcon];
                }

                return null;
            }
        },
        markersData: {
            /**
             * Get datas from markerData by providing a property name and its value
             * @param propertyName
             * @param property
             * @returns {null}
             * @private
             */
            _getDataByProperty: (propertyName, property) => {
                let returnedData = null;

                for (let i = 0; i < Object.keys(this.markersData).length; i++) {
                    const tempMarker = this.markersData[Object.keys(this.markersData)[i]];
                    if (tempMarker[propertyName] === property) {
                        returnedData = tempMarker;
                        break;
                    }
                }

                return returnedData;
            },
            /**
             * Set specific data to markerData by providing property name, value, key to change and associated value
             * @param propertyName
             * @param property
             * @param key
             * @param value
             * @private
             */
            _setDataByProperty: (propertyName, property, key, value) => {
                for (let i = 0; i < Object.keys(this.markersData).length; i++) {
                    if (this.markersData[Object.keys(this.markersData)[i]][propertyName] === property) {
                        this.markersData[Object.keys(this.markersData)[i]][key] = value;
                    }
                }

                return;
            },
            /**
             * Generic method to retrieve some data by specifying a marker
             * @param data
             * @param marker
             * @returns {null}
             * @private
             */
            _returnDataByMarker: (data, marker) => {
                return this.helpers.markersData._getDataByProperty('marker', marker)[data];
            }
        },
        listNodes: {
            /**
             * Generic method to retrieve some data by specifying a listEltNode
             * @param data
             * @param marker
             * @returns {null}
             * @private
             */
            _returnDataByListEltNode: (data, listEltNode) => {
                return this.helpers.markersData._getDataByProperty('listElt', listEltNode)[data];
            },
            /**
             * Returns a listNode associated to the provided marker
             * @param marker
             * @returns {*}
             * @private
             */
            _getListNodeByMarker: (marker) => {
                return this.helpers.markersData._returnDataByMarker('listElt', marker);
            },
        },
        map: {
            /**
             *Removes the consent screen and displays the map
             * @private
             */
            _setMap: () => {
                if (this.mapContainer) {
                    this.mapContainer.innerHTML = '';

                    this._initMap().then((isInit) => {
                        if (isInit && this.displayMarkers) {
                            this.helpers.markers._initMarkers(this.markers);
                        }
                    });
                }
            },
            /**
             * Centers the map on the provided marker
             * @param marker
             * @private
             */
            _centerMapOnMarker: (marker) => {
                const coordinates = this.helpers.markers._getMarkerCoordinates(marker);
                const googleMapCoordinates = new this.google.maps.LatLng(coordinates.lat, coordinates.lng);

                if (this.options[keys.map.animation] === mapAnims.smooth) {
                    this.map.panTo(googleMapCoordinates);
                } else {
                    this.map.setCenter(googleMapCoordinates);
                }

                if (this.options[keys.map.zoomMarkerOnClick]) {
                    this.map.setZoom(this.options[keys.map.zoomMarkerOnClick]);
                }
            },
        },
        consentScreen: {
            /**
             * Removes the displayed map and sets the consent screen
             * @private
             */
            _setConsentScreen: () => {
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
        },
        google: {
            markers: {
                /**
                 * Loop to init Google Maps markers
                 * @private
                 */
                _initMapMarkers: (markers) => {
                    markers.forEach(marker => {
                        let markerData = this.helpers.google.markers._createMapMarker(marker);
                        this.emit(AdeliomMapEvents.markers.dataCreated, markerData);
                    });
                },
                /**
                 * Create a Google Map marker by passing marker raw data
                 * @param markerRawData
                 * @returns {{}}
                 * @private
                 */
                _createMapMarker: (markerRawData) => {
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

                    markerData.infoWindow = this.helpers.google.infoWindows._createMapInfoWindow(markerRawData);

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
                }
            },
            infoWindows: {
                /**
                 * Create a Google Map marker infoWindow by passing marker raw data
                 * @param markerRawData
                 * @returns {null|*}
                 * @private
                 */
                _createMapInfoWindow: (markerRawData) => {
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
            },
            map: {
                _initMap: async (container) => {
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
                        styles: this.helpers.google.map._getMapStyles(),
                    });
                },
                /**
                 * Returns the style array required to define Google Maps style
                 * @returns {[{featureType: string, stylers: [{visibility: string}]}]}
                 * @private
                 */
                _getMapStyles: () => {
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
            }
        }
    };
}