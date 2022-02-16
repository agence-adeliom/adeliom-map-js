import {Loader} from 'google-maps';

const keys = {};
keys.apiKey = 'apiKey';
keys.map = {};
keys.map.selector = 'mapSelector';
keys.map.defaultCenter = 'mapDefaultCenter';
keys.map.defaultZoom = 'mapDefaultZoom';
keys.map.provider = 'mapProvider';
keys.map.checkSize = 'checkMapSize';
keys.map.markers = 'mapMarkers';
keys.map.displayMarkers = 'mapDisplayMarkers';
keys.map.allowMultipleInfoWindow = 'mapAllowMultipleInfoWindow';
keys.list = {};
keys.list.selector = 'mapListSelector';
keys.list.eltHtml = 'mapListEltHtml';

const defaultOptions = {};
defaultOptions[keys.map.selector] = null;
defaultOptions[keys.list.selector] = null;
defaultOptions[keys.apiKey] = null;
defaultOptions[keys.map.checkSize] = false;
defaultOptions[keys.map.allowMultipleInfoWindow] = true;
defaultOptions[keys.map.defaultCenter] = {lat: 48.614782, lng: 7.714012};
defaultOptions[keys.map.defaultZoom] = 12;
defaultOptions[keys.map.provider] = 'google';
defaultOptions[keys.map.displayMarkers] = false;

export default class AdeliomMap {

    constructor(options) {
        this.defaultOptions = defaultOptions;

        this.google = null;

        this.mapContainer = null;
        this.map = null;

        this.mapListContainer = null;
        this.mapList = null;
        this.mapListEltHtml = null;

        this.options = Object.assign(this.defaultOptions, options);
        console.log(this.options);

        this.markers = this.options[keys.map.markers] ?? [];
        this.displayMarkers = this.options[keys.map.displayMarkers] ?? false;
        this.markersData = [];

        if (this.options[keys.apiKey]) {
            this._initMap().then(() => {
                if (this.displayMarkers) {
                    this._initMarkers();
                }
            });
        } else {
            console.error(`${keys.apiKey} not provided`);
        }
    };

    async _initMap() {
        if (this.options[keys.map.selector]) {
            this.mapContainer = document.querySelector(this.options[keys.map.selector]);

            if (this.options[keys.list.selector]) {
                this.mapListContainer = document.querySelector(this.options[keys.list.selector]);

                if (this.options[keys.list.eltHtml]) {
                    this.mapListEltHtml = this.options[keys.list.eltHtml];
                }
            }

            if (this.mapContainer) {
                if (!this.options[keys.map.checkSize] || (this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                    switch (this.options[keys.map.provider]) {
                        case 'google':
                        default:
                            await this._initGoogleMap(this.mapContainer);
                    }
                } else {
                    console.error(`${this.options[keys.map.selector]} height and/or width is equal to 0`);
                }
            } else {
                console.error(`${this.options[keys.map.selector]} not found`);
            }
        } else {
            console.error(`Need to provide ${keys.map.selector} option`);
        }
    };

    async _initGoogleMap(container) {
        const loader = new Loader(this.options.apiKey);

        this.google = await loader.load();

        this.map = new this.google.maps.Map(container, {
            center: this.options[keys.map.defaultCenter],
            zoom: this.options[keys.map.defaultZoom],
        });
    };

    _initMarkers() {
        switch (this.options[keys.map.provider]) {
            case 'google':
            default:
                this._initGoogleMapMarkers();
                break;
        }
    };

    _initGoogleMapMarkers() {
        this.markers.forEach(marker => {
            this._createGoogleMapMarker(marker);
        });
    };

    _createGoogleMapMarker(marker) {
        const markerData = {};

        const markerPosition = new this.google.maps.LatLng(marker.coordinates.lat, marker.coordinates.lng);
        const markerTitle = marker.title;

        const markerInstance = new this.google.maps.Marker({
            position: markerPosition,
            title: markerTitle,
            map: this.map,
        });

        markerData.marker = markerInstance;

        const infoWindowInstance = new this.google.maps.InfoWindow({
            content: `<div>${markerTitle}</div>`,
        });

        markerData.infoWindow = infoWindowInstance;

        let listElt = null;

        if (this.mapListContainer) {
            listElt = this._createMapListInstance(marker, markerInstance, infoWindowInstance);
            markerData.listElt = listElt;
        }

        this.google.maps.event.addListener(markerInstance, 'click', () => {
            if (this._isInfoWindowOpened(infoWindowInstance)) {
                infoWindowInstance.close();
            } else {
                if (!this.options[keys.map.allowMultipleInfoWindow]) {
                    this._closeAllInfoWindows();
                }
                infoWindowInstance.open(this.map, markerInstance);
                console.log("Associated infoWindow", this._getInfoWindowByMarker(markerInstance));
                console.log("Associated listEltNode", this._getListEltByMarker(markerInstance));
            }
        });

        this.markersData.push(markerData);
    }

    _createMapListInstance(markerData, mapMarkerInstance, infoWindowInstance) {
        const mapListInstance = document.createElement('div');
        let listInstanceHtml = this.mapListEltHtml;

        Object.keys(markerData).forEach(key => {
            const search = `{{ ${key} }}`;
            listInstanceHtml = listInstanceHtml.replaceAll(search, markerData[key]);
        });

        mapListInstance.innerHTML = listInstanceHtml;

        mapListInstance.addEventListener('click', () => {
            infoWindowInstance.open(this.map, mapMarkerInstance);
            console.log("Associated marker", this._getMarkerByListEltNode(mapListInstance));
            console.log("Associated infoWindow", this._getInfoWindowByListEltNode(mapListInstance));
        });

        this.mapListContainer.appendChild(mapListInstance);

        return mapListInstance;
    }

    /**
     * Returns an existing infoWindow instance by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */
    _getInfoWindowByMarker(marker) {
        return this._returnDataByMarker('infoWindow', marker);
    }

    /**
     * Returns an existing listElt node by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */
    _getListEltByMarker(marker) {
        return this._returnDataByMarker('listElt', marker);
    }

    /**
     * Returns an existing marker node by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    _getMarkerByListEltNode(listEltNode) {
        return this._returnDataByListEltNode('marker', listEltNode);
    }

    /**
     * Returns an existing infoWindow by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    _getInfoWindowByListEltNode(listEltNode) {
        return this._returnDataByListEltNode('infoWindow', listEltNode);
    }

    /**
     * Generic method to retrieve some data by specifying a marker
     * @param data
     * @param marker
     * @returns {null}
     * @private
     */
    _returnDataByMarker(data, marker) {
        let returnedData = null;

        for (let i = 0; i < Object.keys(this.markersData).length; i++) {
            const tempMarker = this.markersData[Object.keys(this.markersData)[i]];
            if (tempMarker?.marker === marker) {
                returnedData = tempMarker[data];
                break;
            }
        }

        return returnedData;
    }

    /**
     * Generic method to retrieve some data by specifying a listEltNode
     * @param data
     * @param marker
     * @returns {null}
     * @private
     */
    _returnDataByListEltNode(data, listEltNode) {
        let returnedData = null;

        for (let i = 0; i < Object.keys(this.markersData).length; i++) {
            const tempMarker = this.markersData[Object.keys(this.markersData)[i]];
            if (tempMarker?.listElt === listEltNode) {
                returnedData = tempMarker[data];
                break;
            }
        }

        return returnedData;
    }

    /**
     * Returns whether an info window is currently opened
     * @param infoWindow
     * @returns {boolean}
     * @private
     */
    _isInfoWindowOpened(infoWindow) {
        return infoWindow.getMap() ? true : false;
    }

    /**
     * Close all loaded infoWindows
     * @private
     */
    _closeAllInfoWindows() {
        this.markersData.forEach(markerData => {
            if (markerData?.infoWindow) {
                if (this._isInfoWindowOpened(markerData.infoWindow)) {
                    markerData.infoWindow.close();
                }
            }
        });
    }

};