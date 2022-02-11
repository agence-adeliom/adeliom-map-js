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

const defaultOptions = {};
defaultOptions[keys.map.selector] = null;
defaultOptions[keys.apiKey] = null;
defaultOptions[keys.map.checkSize] = false;
defaultOptions[keys.map.defaultCenter] = {lat: 48.614782, lng: 7.714012};
defaultOptions[keys.map.defaultZoom] = 12;
defaultOptions[keys.map.provider] = 'google';
defaultOptions[keys.map.displayMarkers] = false;

export default class AdeliomMap {

    constructor(options) {
        this.defaultOptions = defaultOptions;

        this.google = null;
        this.map = null;

        this.options = Object.assign(this.defaultOptions, options);

        this.markers = this.options[keys.map.markers] ?? [];
        this.displayMarkers = this.options[keys.map.displayMarkers] ?? false;

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
            const mapContainer = document.querySelector(this.options[keys.map.selector]);

            if (mapContainer) {
                if (!this.options[keys.map.checkSize] || (mapContainer.clientHeight !== 0 && mapContainer.clientWidth !== 0)) {
                    switch (this.options[keys.map.provider]) {
                        case 'google':
                        default:
                            await this._initGoogleMap(mapContainer);
                    }
                } else {
                    console.error(`${this.options[keys.map.selector]} height and/or width is equal to 0`);
                }
            } else {
                console.error(`${this.options[keys.map.selector]} not found`);
            }
        } else {
            console.error('Need to provide mapSelector option');
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
        const markerPosition = new this.google.maps.LatLng(marker.coordinates.lat, marker.coordinates.lng);
        const markerTitle = marker.title;

        const markerInstance = new this.google.maps.Marker({
            position: markerPosition,
            title: markerTitle,
            map: this.map,
        });

        const infoWindowInstance = new this.google.maps.InfoWindow({
            content: `<div>${markerTitle}</div>`,
        });

        this.google.maps.event.addListener(markerInstance, 'click', () => {
            infoWindowInstance.open(this.map, markerInstance);
        });
    }
};