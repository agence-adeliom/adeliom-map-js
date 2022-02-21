import Emitter from "dauphine-js/dist/emitter";
import keys from "./optionKeys";
import defaultOptions, {mapAnims} from "./defaultOptions";

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
        },
        markers: {
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
                        this.helpers.markers._setMarkerAsSelected(markerData.marker, false);
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
            _setMarkerAsSelected: (marker, isSelected = null) => {
                if (isSelected == 'toggle') {
                    isSelected = !this.helpers.markersData._getDataByProperty('marker', marker).selected;
                }

                if (isSelected === null) {
                    isSelected = true;
                }

                if (isSelected === true) {
                    if (!this.options[keys.map.allowMultipleMarkersSelected]) {
                        this.helpers.markers._unselectAllMarkers();
                    }

                    this.helpers.infoWindows._openInfoWindowByMarker(marker);
                } else if (isSelected === false) {
                    this._closeInfoWindowByMarker(marker);
                }


                this.helpers.markersData._setDataByProperty('marker', marker, 'selected', isSelected);

                if (!isSelected) {
                    marker.setIcon(this.helpers.markers._getIdleIconForMarker(marker));
                } else {
                    marker.setIcon(this.helpers.markers._getSelectedIconForMarker(marker));
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
        },
        map: {
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
        }
    };
}