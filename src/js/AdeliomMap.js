import {Loader} from 'google-maps';

const mapCustomClass = 'adeliom-map-js';

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
keys.map.infoWindowTemplate = 'mapInfoWindowTemplate';
keys.map.centerMarkerOnClick = 'mapCenterMarkerOnClick';
keys.list = {};
keys.list.selector = 'mapListSelector';
keys.list.eltTemplate = 'mapListEltTemplate';
keys.list.centerMarkerOnClick = 'mapListCenterMarkerOnClick';

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
defaultOptions[keys.map.infoWindowTemplate] = '';
defaultOptions[keys.map.centerMarkerOnClick] = true;
defaultOptions[keys.list.eltTemplate] = '';
defaultOptions[keys.list.centerMarkerOnClick] = true;

export default class AdeliomMap {

    constructor(options) {
        this.defaultOptions = defaultOptions;

        this.google = null;

        this.mapContainer = null;
        this.map = null;

        this.mapListContainer = null;
        this.mapList = null;
        this.mapListEltTemplate = null;

        this.options = Object.assign(this.defaultOptions, options);

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

                if (this.options[keys.list.eltTemplate]) {
                    this.mapListEltTemplate = this.options[keys.list.eltTemplate];
                }
            }

            if (this.mapContainer) {
                this._addMapCustomClass();

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
            this._createGoogleMapMarker(marker);
        });
    };

    _createGoogleMapMarker(markerRawData) {
        const markerData = {};

        const markerPosition = new this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng);
        const markerTitle = markerRawData?.title;

        const markerInstance = new this.google.maps.Marker({
            position: markerPosition,
            title: markerTitle,
            map: this.map,
        });

        markerData.marker = markerInstance;

        const infoWindowInstance = new this.google.maps.InfoWindow({
            content: this._replaceMarkerDataInString(markerRawData, this.options[keys.map.infoWindowTemplate]),
        });

        markerData.infoWindow = infoWindowInstance;

        let listElt = null;

        if (this.mapListContainer) {
            listElt = this._createMapListInstance(markerRawData, markerInstance);
            markerData.listElt = listElt;
        }

        this.google.maps.event.addListener(markerInstance, 'click', () => {
            this._handleClickMarker(markerInstance)
        });

        this.markersData.push(markerData);
    };

    _handleClickMarker(marker) {
        if (this._isInfoWindowOpenedByMarker(marker)) {
            this._closeInfoWindowByMarker(marker);
        } else {
            this._openInfoWindowByMarker(marker);
        }
    };

    _handleClickListElt(listElt) {
        const mapMarkerInstance = this._getMarkerByListEltNode(listElt);

        if (mapMarkerInstance) {
            this._openInfoWindowByMarker(mapMarkerInstance);
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

        let listInstanceHtml = this._replaceMarkerDataInString(markerRawData, this.mapListEltTemplate);

        mapListInstance.innerHTML = listInstanceHtml;

        mapListInstance.addEventListener('click', () => {
            this._handleClickListElt(mapListInstance);
        });

        this.mapListContainer.appendChild(mapListInstance);

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
        const infoWindow = this._getInfoWindowByMarker(marker);

        if (infoWindow) {
            infoWindow.close();
        }
    };

    /**
     * Opens an infoWindow by its associated marker
     * @param marker
     * @private
     */
    _openInfoWindowByMarker(marker) {
        const infoWindow = this._getInfoWindowByMarker(marker);

        if (infoWindow) {
            if (this._isInfoWindowOpened(infoWindow)) {
                infoWindow.close();
            } else {
                if (!this.options[keys.map.allowMultipleInfoWindow]) {
                    this._closeAllInfoWindows();
                }

                infoWindow.open(this.map, marker);
            }
        }
    };

    /**
     * Returns an existing infoWindow instance by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */
    _getInfoWindowByMarker(marker) {
        return this._returnDataByMarker('infoWindow', marker);
    };

    /**
     * Returns an existing listElt node by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */
    _getListEltByMarker(marker) {
        return this._returnDataByMarker('listElt', marker);
    };

    /**
     * Returns an existing marker node by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    _getMarkerByListEltNode(listEltNode) {
        return this._returnDataByListEltNode('marker', listEltNode);
    };

    /**
     * Returns an existing infoWindow by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    _getInfoWindowByListEltNode(listEltNode) {
        return this._returnDataByListEltNode('infoWindow', listEltNode);
    };

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
    };

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
    };

    /**
     * Returns whether an info window is currently opened
     * @param infoWindow
     * @returns {boolean}
     * @private
     */
    _isInfoWindowOpened(infoWindow) {
        return infoWindow.getMap() ? true : false;
    };

    /**
     * Returns whether an info window is currently opened by specifying its associated marker
     * @param marker
     * @returns {null|boolean}
     * @private
     */
    _isInfoWindowOpenedByMarker(marker) {
        const infoWindow = this._getInfoWindowByMarker(marker);

        if (infoWindow) {
            return this._isInfoWindowOpened(infoWindow);
        }

        return null;
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
    };

};