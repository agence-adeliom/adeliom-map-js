import {Loader} from 'google-maps';

const mapSelectorKey = 'mapSelector';
const apiKeyKey = 'apiKey';
const checkMapSizeKey = 'checkMapSize';
const mapDefaultCenterKey = 'mapDefaultCenter';
const mapDefaultZoomKey = 'mapDefaultZoom';
const mapProviderKey = 'mapProvider';

const defaultOptions = {};
defaultOptions[mapSelectorKey] = null;
defaultOptions[apiKeyKey] = null;
defaultOptions[checkMapSizeKey] = false;
defaultOptions[mapDefaultCenterKey] = {lat: 48.614782, lng: 7.714012};
defaultOptions[mapDefaultZoomKey] = 12;
defaultOptions[mapProviderKey] = 'google';

const mapOptions = {};


export default class AdeliomMap {

    constructor(options) {
        this.defaultOptions = defaultOptions;

        this.mapOptions = mapOptions;

        this.google = null;
        this.map = null;

        this.options = Object.assign(this.defaultOptions, options);

        if (this.options[apiKeyKey]) {
            this._initMap();
        } else {
            console.error(`${apiKeyKey} not provided`);
        }
    }

    async _initMap() {
        if (this.options[mapSelectorKey]) {
            const mapContainer = document.querySelector(this.options[mapSelectorKey]);

            if (mapContainer) {
                if (!this.options[checkMapSizeKey] || (mapContainer.clientHeight !== 0 && mapContainer.clientWidth !== 0)) {
                    switch (this.options[mapProviderKey]) {
                        case 'google':
                        default:
                            await this._initGoogleMap(mapContainer);
                    }
                } else {
                    console.error(`${this.options[mapSelectorKey]} height and/or width is equal to 0`);
                }
            } else {
                console.error(`${this.options[mapSelectorKey]} not found`);
            }
        } else {
            console.error('Need to provide mapSelector option');
        }
    }

    async _initGoogleMap(container) {
        const loader = new Loader(this.options.apiKey);

        this.google = await loader.load();

        this.map = new this.google.maps.Map(container, {
            center: this.options[mapDefaultCenterKey],
            zoom: this.options[mapDefaultZoomKey],
        });
    }


};