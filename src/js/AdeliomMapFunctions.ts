// @ts-ignore
import Emitter from "./Emitter";
import keys from "./optionKeys";
import defaultOptions, {mapAnims} from "./defaultOptions";
import {AdeliomMapEvents} from "./AdeliomMap";
import {Loader, LoaderOptions} from "google-maps";
import {Cluster, MarkerClusterer} from "@googlemaps/markerclusterer";
import AdeliomMapClusterRenderer, {
    getDefaultIconData,
    getIconConfig,
    getParamsByCount,
    getSvg, orderParamsByFromValue, generateElement, clusterBgClass
} from "./AdeliomMapClusterRenderer";
import {
    AdeliomMapClusterParams,
    AdeliomMapCoordinatesType,
    AdeliomMapGeolocationOptionsType,
    AdeliomMapGoogleType,
    AdeliomMapMarkerConfigType,
    AdeliomMapMarkerDataType,
    AdeliomMapMarkerParamsType,
    AdeliomMapOptionsType, AdeliomMapPiwikButtonSelectorsType,
    AdeliomMapPlacesMapOptionsType,
    AdeliomMapPlacesOptionsType, AdeliomMapPolyline,
    AdeliomMapStyleElement,
    AdeliomMapTypes
} from "./AdeliomMapTypes";
import errors from "./errors";
import AdeliomMapMarkerClusterer from "./AdeliomMapMarkerClusterer";

const mapAttribute = 'adeliom-map';
const listAttribute = `${mapAttribute}-list`;

const consentScreenContainerAttribute = `${mapAttribute}-consent-screen`;
const consentButtonAttribute = `${mapAttribute}-consent-button`;
const openedMarkerListEltAttribute = `${listAttribute}-elt-opened`;

const notConsentMapAttribute = `${mapAttribute}-no-consent`;
const notConsentListAttribute = `${listAttribute}-no-consent`;

const availableProviders = ['google'];

export default class AdeliomMapFunctions extends Emitter {
    public defaultOptions: AdeliomMapOptionsType;
    private map: google.maps.Map | null;
    public mapContainer: HTMLElement | null;
    public customZoomPlusBtn: HTMLElement | null;
    public customZoomMinusBtn: HTMLElement | null;
    public mapListContainer: HTMLElement | null;
    public placesInput: HTMLInputElement | null;
    public geolocationButton: HTMLElement | null;
    public autocomplete: any;
    public markers: AdeliomMapMarkerParamsType[];
    public polylines: AdeliomMapPolyline[];
    private markersData: AdeliomMapMarkerDataType[];
    private geolocationMarkerData: AdeliomMapMarkerDataType | null;
    public clusterer: MarkerClusterer | null;
    public clusters: any[] = [];
    public displayMarkers: boolean;
    public google: AdeliomMapGoogleType | null = null;
    public options: AdeliomMapOptionsType = defaultOptions;
    public emit: any;
    public on: any;
    public mapListEltTemplate: any;
    public hasConsent: boolean = false;
    public markerIconCentered: boolean = false;
    public clusterIconCentered: boolean = false;
    public mapCustomClass: string = 'adeliom-map-js';
    public usePiwik: boolean = false;
    public ppms: any = null;
    public piwikAcceptAllBtn: any = null;
    public piwikRejectAllBtn: any = null;
    public piwikSaveChoicesBtn: any = null;

    constructor() {
        super();

        this.emit = super.emit;
        this.on = super.on;

        this.defaultOptions = defaultOptions;

        this.map = null;
        this.mapContainer = null;
        this.customZoomPlusBtn = null;
        this.customZoomMinusBtn = null;
        this.mapListContainer = null;
        this.placesInput = null;
        this.geolocationButton = null;

        this.markers = [];
        this.polylines = [];
        this.markersData = [];
        this.geolocationMarkerData = null;
        this.clusterer = null;

        this.displayMarkers = false;
    }

    helpers = {
        providers: {
            /**
             * Returns whether the provided provider is part of the available providers array
             * @param provider
             * @returns {boolean}
             * @private
             */
            _isProviderAvailable: (provider: string) => {
                return availableProviders.findIndex(prov => prov === provider) !== -1;
            },
            /**
             * Returns the currently used provider
             */
            _getProvider: () => {
                return this.options[keys.map.provider as keyof AdeliomMapOptionsType];
            },
        },
        infoWindows: {
            /**
             * Returns whether an info window is currently opened
             * @param infoWindow
             * @returns {boolean}
             * @private
             */
            _isInfoWindowOpened: (infoWindow: any) => {
                return infoWindow.getMap() ? true : false;
            },
            /**
             * Generic method to retrieve some data by specifying an infoWindow
             * @param data
             * @param infoWindow
             * @returns {*}
             * @private
             */
            _returnDataByInfoWindow: (data: any, infoWindow: any) => {
                // @ts-ignore
                return this.helpers.markersData._getDataByProperty('infoWindow', infoWindow)[data];
            },
            /**
             * Returns an existing infoWindow instance by providing a marker
             * @param marker
             * @returns {null}
             * @private
             */
            _getInfoWindowByMarker: (marker: any) => {
                return this.helpers.markersData._returnDataByMarker('infoWindow', marker);
            },
            /**
             * Opens the provided infoWindow
             * @param infoWindow
             * @private
             */
            _openInfoWindow: (infoWindow: any) => {
                if (this.helpers.infoWindows._isInfoWindowOpened(infoWindow)) {
                    infoWindow.close();
                } else {
                    if (!this.options[keys.map.allowMultipleMarkersSelected as keyof AdeliomMapOptionsType]) {
                        this.helpers.markers._unselectAllMarkers();
                    }

                    const marker = this.helpers.markers._getMarkerByInfoWindow(infoWindow);

                    if (marker) {
                        infoWindow.open(this.map, marker);

                        if (this.options[keys.map.centerMarkerOnClick as keyof AdeliomMapOptionsType]) {
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
            _openInfoWindowByMarker: (marker: any) => {
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
            _closeInfoWindowByMarker: (marker: any) => {
                const infoWindow = this.helpers.infoWindows._getInfoWindowByMarker(marker);

                if (infoWindow) {
                    infoWindow.close();
                }
            },
            _closeAllInfoWindows: () => {
                this.helpers.infoWindows._getAllInfoWindows().forEach((infoWindow: any) => {
                    infoWindow.close();
                });
            },
            /**
             * Returns all the infoWindows instances
             */
            _getAllInfoWindows: () => {
                const infoWindows: any[] = [];

                this.helpers.markers._getAllMarkerInstances().forEach((marker: any) => {
                    const infoWindow = this.helpers.infoWindows._getInfoWindowByMarker(marker);

                    if (infoWindow) {
                        infoWindows.push(infoWindow);
                    }
                });

                return infoWindows;
            },
        },
        markers: {
            /**
             * Get the center of all provided markers
             * @param markersRawData
             * @returns {{lng: number, lat: number}|*}
             * @private
             */
            _getMarkersCenterCoordinates: (markersRawData: AdeliomMapMarkerParamsType[]) => {
                if (markersRawData.length === 1) {
                    return markersRawData[0].coordinates;
                }

                let x = 0.0;
                let y = 0.0;
                let z = 0.0;

                for (let markerRawData of markersRawData) {
                    let latitude = markerRawData.coordinates.lat * Math.PI / 180;
                    let longitude = markerRawData.coordinates.lng * Math.PI / 180;

                    x += Math.cos(latitude) * Math.cos(longitude);
                    y += Math.cos(latitude) * Math.sin(longitude);
                    z += Math.sin(latitude);
                }

                let total = markersRawData.length;

                x = x / total;
                y = y / total;
                z = z / total;

                let centralLongitude = Math.atan2(y, x);
                let centralSquareRoot = Math.sqrt(x * x + y * y);
                let centralLatitude = Math.atan2(z, centralSquareRoot);

                return {
                    lat: centralLatitude * 180 / Math.PI,
                    lng: centralLongitude * 180 / Math.PI
                }
            },
            _autoZoomToFitAllMarkers: (markersRawData: AdeliomMapMarkerParamsType[]) => {
                this.helpers.google;
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        this.helpers.google.markers._autoZoomToFitAllMarkers(markersRawData);
                        break;
                    default:
                        break;
                }
            },
            /**
             * Init markers by its map provider (google, ...)
             * @private
             */
            _initMarkers: (markers: any, firstInit: boolean = false) => {
                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                        this.helpers.google.markers._initMapMarkers(markers, firstInit).then(() => {
                            this.helpers.map._autoCenter(markers);
                        });
                        break;
                    default:
                        break;
                }
            },
            /**
             * Returns whether a marker is selected or not
             * @param marker
             * @returns {bool}
             * @private
             */
            _isMarkerSelected: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                return data?.selected;
            },
            /**
             * Returns an existing marker node by providing a listEltNode
             * @param marker
             * @returns {null}
             * @private
             */
            _getMarkerByListEltNode: (listEltNode: any) => {
                return this.helpers.listNodes._returnDataByListEltNode('marker', listEltNode);
            },
            /**
             * Returns all the markers data
             */
            _getMarkersData: () => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        return this.markersData;
                    default:
                        break;
                }

                return [];
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

                this.emit(AdeliomMapEvents.markers.allUnselected);
            },
            /**
             * Returns the lat/lng object of the provided marker
             * @param marker
             * @returns {{lng: *, lat: *}}
             * @private
             */
            _getMarkerCoordinates: (marker: any) => {
                return {
                    lat: marker.position.lat,
                    lng: marker.position.lng,
                };
            },
            /**
             * Returns an existing marker instance by providing an infoWindow
             * @param marker
             * @returns {null}
             * @private
             */
            _getMarkerByInfoWindow: (infoWindow: any) => {
                return this.helpers.infoWindows._returnDataByInfoWindow('marker', infoWindow);
            },
            /**
             * Sets the provided marker as selected (depending on provided second value)
             * @param marker
             * @param isSelected
             * @private
             */
            _setMarkerState: (marker: any, isSelected: null | boolean | string = null) => {
                const markerData: AdeliomMapMarkerDataType = this.helpers.markersData._getDataByProperty('marker', marker);

                if (isSelected == 'toggle') {
                    isSelected = !markerData.selected;
                }

                if (isSelected === null) {
                    isSelected = true;
                }

                if (isSelected === true) {
                    this.helpers.markers._openMarker(marker);
                } else if (isSelected === false) {
                    this.helpers.markers._closeMarker(marker);
                }

                if (markerData.hasInteraction) {
                    this.helpers.markersData._setDataByProperty('marker', marker, 'selected', isSelected);

                    if (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                        if (!isSelected) {
                            switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                                case 'google':
                                    if (!markerData.isFakeCluster) {
                                        this.helpers.google.markers._setIdleIcon(marker);
                                    }
                                    break;
                            }
                        } else {
                            switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                                case 'google':
                                    if (!markerData.isFakeCluster) {
                                        this.helpers.google.markers._setSelectedIcon(marker);
                                    }
                                    break;
                            }
                        }
                    }
                }
            },
            /**
             * Opens the passed marker
             * @param marker
             * @private
             */
            _openMarker: (marker: any) => {
                if (!this.options[keys.map.allowMultipleMarkersSelected as keyof AdeliomMapOptionsType]) {
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
            _closeMarker: (marker: any) => {
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
            _getIdleIconForMarker: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                if (data?.icon) {
                    return data.icon;
                } else if (this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType]) {
                    return this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType];
                }

                return null;
            },
            /**
             * Returns the hovered icon for the provided marker
             * @param marker
             * @returns {null|*}
             * @private
             */
            _getHoveredIconForMarker: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                if (data?.hoveredIcon) {
                    return data.hoveredIcon;
                } else if (this.options[keys.map.markerHoveredIconUrl as keyof AdeliomMapOptionsType]) {
                    return this.options[keys.map.markerHoveredIconUrl as keyof AdeliomMapOptionsType];
                }

                return null;
            },
            /**
             * Returns the selected icon for the provided marker
             * @param marker
             * @returns {null|string|*}
             * @private
             */
            _getSelectedIconForMarker: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                if (data?.selectedIcon) {
                    return data.selectedIcon;
                } else if (this.options[keys.map.markerSelectedIconUrl as keyof AdeliomMapOptionsType]) {
                    return this.options[keys.map.markerSelectedIconUrl as keyof AdeliomMapOptionsType];
                }

                return null;
            },
            /**
             * Returns the icon size for the provided marker
             * @param marker
             * @private
             */
            _getIconSizeForMarker: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                return data?.iconSize ?? this.options[keys.map.markerIconSize as keyof AdeliomMapOptionsType];
            },
            _getIconCenteredForMarker: (marker: any) => {
                const data: any = this.helpers.markersData._getDataByProperty('marker', marker);

                return data?.iconCentered;
            },
            /**
             * Returns all map marker instances already created
             * @returns {marker[]}
             * @private
             */
            _getAllMarkerInstances: () => {
                return this.markersData.map(data => {
                    if (data?.marker) {
                        return data.marker;
                    }
                });
            },
            _getClustersStatus: () => {
                return this.options[keys.map.useClusters as keyof AdeliomMapOptionsType];
            },
            _setClustersStatus: (status: boolean) => {
                // @ts-ignore
                if (this.helpers.markers._getClustersStatus() === status) return false;

                // @ts-ignore
                this.options[keys.map.useClusters as keyof AdeliomMapOptionsType] = status;

                return true;
            },
            _disableClusters: async () => {
                if (this.helpers.markers._getClustersStatus() && this.map) {
                    if (this.clusterer) {
                        this.clusterer?.clearMarkers();
                        this.clusterer = null;

                        this.helpers.markers._setClustersStatus(false);

                        const currentMarkersData: AdeliomMapMarkerParamsType[] = this.helpers.markersData._getAllMarkersRawData();

                        this.helpers.google.markers._clearMap();
                        this.helpers.google.markers._addMapMarkers(currentMarkersData, true);

                        this.emit(AdeliomMapEvents.clusters.disabled);
                    }
                }
            },
            _getClusterableMarkers: () => {
                const availableMarkers = this.helpers.markers._getAllMarkerInstances();
                const clusterableMarkers: any[] = [];

                availableMarkers.forEach((marker: any) => {
                    const markerData: AdeliomMapMarkerDataType = this.helpers.markersData._getDataByProperty('marker', marker);

                    if (!markerData?.isGeolocation) {
                        clusterableMarkers.push(marker);
                    }
                });

                return clusterableMarkers;
            },
            _enableClusters: (firstInit: boolean = false) => {
                if (this.map) {

                    if (!firstInit) {
                        if (this.helpers.markers._getClustersStatus()) {
                            this.helpers.markers._disableClusters();
                        } else {
                            this.helpers.markers._setClustersStatus(true);
                        }
                    }

                    if (this.helpers.markers._getClustersStatus()) {

                        const clusterableMarkers: any[] = this.helpers.markers._getClusterableMarkers();

                        switch (this.helpers.providers._getProvider()) {
                            case 'google':
                                const renderer = this.helpers.google.clusters._getRenderer();

                                if (renderer) {
                                    this.clusterer = new AdeliomMapMarkerClusterer({
                                        markers: clusterableMarkers,
                                        map: this.map,
                                        onClusterClick: this.helpers.google.clusters._handleClusterClick,
                                        renderer: renderer,
                                    }, this);
                                }
                                break;
                            default:
                                break;
                        }

                        this.emit(AdeliomMapEvents.clusters.enabled);
                    }
                }
            },
            _addMarkers: (markersRawData: AdeliomMapMarkerParamsType | AdeliomMapMarkerParamsType[]) => {
                if (markersRawData) {
                    switch (this.helpers.providers._getProvider()) {
                        case 'google':
                            this.helpers.google.markers._addMapMarkers(markersRawData);
                            break;
                        default:
                            break;
                    }
                }
            },
            _removeMarkers: (markers: any) => {
                if (markers) {
                    switch (this.helpers.providers._getProvider()) {
                        case 'google':
                            this.helpers.google.markers._removeMapMarkers(markers);
                            break;
                        default:
                            break;
                    }
                }
            },
        },
        polylines: {
            _initPolylines: () => {
                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                        this.helpers.google.polylines._initPolylines(this.options.mapPolylines ?? []).then(() => {

                        });
                        break;
                    default:
                        break;
                }
            },
            _addPolylines: (polylines: AdeliomMapPolyline | AdeliomMapPolyline[]) => {
                if (!Array.isArray(polylines)) {
                    polylines = [polylines];
                }

                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                        this.helpers.google.polylines._initPolylines(polylines ?? []).then(() => {

                        });
                        break;
                    default:
                        break;
                }
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
            _getDataByProperty: (propertyName: any, property: any) => {
                let returnedData = null;

                for (let i = 0; i < Object.keys(this.markersData).length; i++) {
                    // @ts-ignore
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
            _setDataByProperty: (propertyName: any, property: any, key: any, value: any) => {
                for (let i = 0; i < Object.keys(this.markersData).length; i++) {
                    // @ts-ignore
                    if (this.markersData[Object.keys(this.markersData)[i]][propertyName] === property) {
                        // @ts-ignore
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
            _returnDataByMarker: (data: any, marker: any) => {
                // @ts-ignore
                return this.helpers.markersData._getDataByProperty('marker', marker)[data];
            },
            /**
             * Method that allows to retrieve all existing markers rawData
             */
            _getAllMarkersRawData: () => {
                const markersRawData: AdeliomMapMarkerParamsType[] = [];

                this.helpers.markers._getMarkersData().forEach((markerData: AdeliomMapMarkerDataType) => {
                    const data: AdeliomMapMarkerParamsType = markerData.rawData;
                    markersRawData.push(markerData.rawData);
                });

                return markersRawData;
            },
        },
        listNodes: {
            /**
             * Generic method to retrieve some data by specifying a listEltNode
             * @param data
             * @param marker
             * @returns {null}
             * @private
             */
            _returnDataByListEltNode: (data: any, listEltNode: any) => {
                // @ts-ignore
                return this.helpers.markersData._getDataByProperty('listElt', listEltNode)[data];
            },
            /**
             * Returns a listNode associated to the provided marker
             * @param marker
             * @returns {*}
             * @private
             */
            _getListNodeByMarker: (marker: any) => {
                return this.helpers.markersData._returnDataByMarker('listElt', marker);
            },
            /**
             * Base init of the list
             * @private
             */
            _commonInit: () => {
                if (this.mapListContainer) {
                    this.mapListContainer.setAttribute(listAttribute, '');
                }
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
                    this.mapContainer.removeAttribute(notConsentMapAttribute);

                    if (this.mapListContainer) {
                        this.mapListContainer.innerHTML = '';
                        this.mapListContainer.removeAttribute(notConsentListAttribute);
                    }

                    this.helpers.map._handleCustomZoomBtns();

                    this.helpers.map._initMapAndMarkers();
                }
            },
            _initMapAndMarkers: () => {
                this._initMap().then((isInit: any) => {
                    if (isInit && this.displayMarkers) {
                        this.helpers.markers._initMarkers(this.markers, true);
                        this.emit(AdeliomMapEvents.map.mapLoaded);
                    }

                    this.helpers.polylines._initPolylines();
                });
            },
            _handleCustomZoomBtns: () => {
                let minusBtn: HTMLElement | null = null;
                let plusBtn: HTMLElement | null = null;

                const minus = this.options[keys.map.customZoomMinusSelector as keyof AdeliomMapOptionsType];
                const plus = this.options[keys.map.customZoomPlusSelector as keyof AdeliomMapOptionsType];

                if (minus && typeof minus === 'string') {
                    minusBtn = document.querySelector(minus);
                    if (minusBtn) {
                        minusBtn.addEventListener('click', () => {
                            this.helpers.map._handleMinusZoom();

                            this.emit(AdeliomMapEvents.map.customMinusZoom);
                            this.emit(AdeliomMapEvents.map.customZoom);
                        });
                    }
                }

                if (plus && typeof plus === 'string') {
                    plusBtn = document.querySelector(plus);
                    if (plusBtn) {
                        plusBtn.addEventListener('click', () => {
                            this.helpers.map._handlePlusZoom();

                            this.emit(AdeliomMapEvents.map.customPlusZoom);
                            this.emit(AdeliomMapEvents.map.customZoom);
                        });
                    }
                }

                if (minusBtn && plusBtn) {

                } else if (minus || plus) {
                    if (!minusBtn) {
                        console.error('You must provide a valid selector for the minus button');
                    }

                    if (!plusBtn) {
                        console.error('You must provide a valid selector for the plus button');
                    }
                }
            },
            _handleMinusZoom: () => {
                const currentZoomLevel = this.helpers.map._getCurrentZoomLevel();

                if (currentZoomLevel || currentZoomLevel === 0) {
                    this.helpers.map._setZoom(currentZoomLevel - 1);
                }
            },
            _handlePlusZoom: () => {
                const currentZoomLevel = this.helpers.map._getCurrentZoomLevel();

                if (currentZoomLevel || currentZoomLevel === 0) {
                    this.helpers.map._setZoom(currentZoomLevel + 1);
                }
            },
            _getCurrentZoomLevel: () => {
                let currentZoom: number | undefined;

                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        currentZoom = this.map?.getZoom();
                        break;
                    default:
                        break;
                }

                return currentZoom;
            },
            /**
             * Centers the map on the provided marker
             * @param marker
             * @private
             */
            _centerMapOnMarker: (marker: any) => {
                const coordinates: AdeliomMapCoordinatesType = this.helpers.markers._getMarkerCoordinates(marker);
                const googleMapCoordinates = this.helpers.google.coordinates._getLatLng(coordinates);

                if (this.options[keys.map.animation as keyof AdeliomMapOptionsType] === mapAnims.smooth) {
                    this.helpers.map._panTo(googleMapCoordinates);
                } else {
                    this.helpers.map._setCenter(googleMapCoordinates);
                }

                if (this.options[keys.map.zoomMarkerOnClick as keyof AdeliomMapOptionsType]) {
                    // Only zoom if less zoomed than zoom value
                    let zoomMarkerOnClick = this.options[keys.map.zoomMarkerOnClick as keyof AdeliomMapOptionsType];

                    if (this.map && zoomMarkerOnClick && this.map.getZoom() < zoomMarkerOnClick) {
                        this.helpers.map._setZoom(parseInt(String(zoomMarkerOnClick)));
                    }
                }
            },
            /**
             * Sets the level of zoom on the map
             * @param zoom
             */
            _setZoom: (zoom: number) => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        if (this.map) {
                            this.map.setZoom(zoom);
                        }
                        break;
                    default:
                        break;
                }
            },
            /**
             * Sets the center of the map
             * @param center
             * @private
             */
            _setCenter: (center: any) => {
                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                    default:
                        if (this.map) {
                            this.map.setCenter(center);
                        }
                        break;
                }
            },
            /**
             * Sets the center of the map (smoothly)
             * @param center
             * @private
             */
            _panTo: (center: any) => {
                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                    default:
                        if (this.map) {
                            this.map.panTo(center);
                        }
                        break;
                }
            },
            /**
             * Auto center the map on the markers
             * @param markersRawData
             * @private
             */
            _autoCenter: (markersRawData: AdeliomMapMarkerParamsType[]) => {
                if (this.options[keys.map.autoCenter as keyof AdeliomMapOptionsType]) {
                    const center: AdeliomMapCoordinatesType = this.helpers.markers._getMarkersCenterCoordinates(markersRawData);

                    if (this.options[keys.map.autoZoom as keyof AdeliomMapOptionsType]) {
                        this.helpers.markers._autoZoomToFitAllMarkers(markersRawData);
                    }

                    if (center) {
                        switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                            case 'google':
                            default:
                                this.helpers.map._setCenter(this.helpers.google.coordinates._getLatLng(center));
                                break;
                        }
                    }

                    this.emit(AdeliomMapEvents.map.hasAutoCentered);
                }
            },
            /**
             * Adds classes to the map container
             * @param array classes
             * @private
             */
            _addClassesToMapContainer: (classes: any) => {
                if (this.mapContainer) {
                    for (let singleClass in classes) {
                        this.mapContainer.classList.add(classes[singleClass]);
                    }
                }
            },
            /**
             * Removes classes to the map container
             * @param array classes
             * @private
             */
            _removeClassesToMapContainer: (classes: any) => {
                if (this.mapContainer) {
                    for (let singleClass in classes) {
                        if (this.mapContainer.classList.contains(classes[singleClass])) {
                            this.mapContainer.classList.remove(classes[singleClass]);
                        }
                    }
                }
            },
            /**
             * Base init of the map
             * @private
             */
            _commonInit: () => {
                if (this.mapContainer) {
                    this.mapContainer.setAttribute(mapAttribute, '');
                }
            },
            /**
             * Empty the map from all markers and clusters
             */
            _clearMap: () => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        this.helpers.google.markers._clearMap();
                        break;
                    default:
                        break;
                }

                this.emit(AdeliomMapEvents.map.clear);
            },
            /**
             * Resets the map at its current state
             */
            _resetMap: () => {
                const previousMarkers: AdeliomMapMarkerParamsType[] = this.helpers.markersData._getAllMarkersRawData();
                const newMarkers: AdeliomMapMarkerParamsType[] = [];

                const clusterStatus = this.helpers.markers._getClustersStatus();
                const previousClusterState: boolean = Boolean(clusterStatus);

                previousMarkers.forEach((marker: AdeliomMapMarkerParamsType) => {
                    if (!marker?.isGeolocation) {
                        newMarkers.push(marker);
                    }
                });

                this.helpers.map._clearMap();

                this.helpers.markers._setClustersStatus(previousClusterState);

                setTimeout(() => {
                    this.helpers.markers._initMarkers(newMarkers);
                    this.helpers.polylines._initPolylines();
                    const defaultZoom = Number(this.options[keys.map.defaultZoom as keyof AdeliomMapOptionsType]);

                    if (defaultZoom) {
                        this.helpers.map._setZoom(defaultZoom);
                    }

                    setTimeout(() => {
                        this.emit(AdeliomMapEvents.map.reset);
                    }, 10);
                }, 10);
            },
            _setMapType: (type: AdeliomMapTypes) => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        this.helpers.google.map._setMapType(type);
                        break;
                    default:
                        break;
                }

                this.emit(AdeliomMapEvents.map.typeChanged, type);
            },
            _setMapStyle: (styles: AdeliomMapStyleElement[]) => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        this.helpers.google.map._setMapStyle(styles);
                        break;
                    default:
                        break;
                }
            },
        },
        consentScreen: {
            /**
             * Removes the displayed map and sets the consent screen
             * @private
             */
            _setConsentScreen: (consent: boolean) => {
                this.hasConsent = consent;

                if (consent) {
                    this.helpers.map._setMap();
                } else {
                    if (this.mapContainer) {
                        this.mapContainer.innerHTML = '';
                        this.mapContainer.setAttribute(notConsentMapAttribute, '');
                        this.mapContainer.removeAttribute('style');
                        this.markersData = [];

                        if (this.mapListContainer) {
                            this.mapListContainer.innerHTML = '';
                            this.mapListContainer.setAttribute(notConsentListAttribute, '');
                        }

                        if (this.map) {
                            this.map = null;
                        }

                        const consentScreen = document.createElement('div');
                        consentScreen.setAttribute(consentScreenContainerAttribute, '');

                        const consentButton = document.createElement('button');
                        const consentButtonMessage = this.options[keys.rgpd.buttonMessage as keyof AdeliomMapOptionsType];

                        if (typeof consentButtonMessage === 'string') {
                            consentButton.innerText = consentButtonMessage;
                        }

                        // @ts-ignore
                        const consentButtonClass: string = this.options[keys.rgpd.buttonClass as keyof AdeliomMapOptionsType];
                        // @ts-ignore
                        const consentScreenClass: string = this.options[keys.rgpd.consentScreenClass as keyof AdeliomMapOptionsType];

                        consentButton.setAttribute(consentButtonAttribute, '');

                        if (consentButtonClass) {
                            consentButtonClass.split(' ').forEach(classElt => {
                                consentButton.classList.add(classElt);
                            })
                        }

                        consentButton.addEventListener('click', () => {
                            this._openPiwikConsent();
                            this.emit(AdeliomMapEvents.rgpd.consentButtonClicked, this);
                        });

                        consentScreen.appendChild(consentButton);

                        if (consentScreenClass) {
                            consentScreenClass.split(' ').forEach(classElt => {
                                consentScreen.classList.add(classElt);
                            });
                        }

                        this.mapContainer.appendChild(consentScreen);

                        this.emit(AdeliomMapEvents.map.consentNotGiven);
                    }
                }
            }
        },
        google: {
            coordinates: {
                /**
                 * Returns Google Map LatLng from coordinates {lat,lng}
                 * @param coordinates
                 * @returns {null|google.maps.LatLng}
                 * @private
                 */
                _getLatLng: (coordinates: AdeliomMapCoordinatesType) => {
                    if (coordinates?.lat && coordinates?.lng) {
                        if (this.google) {
                            return new this.google.maps.LatLng(coordinates.lat, coordinates.lng);
                        }
                    }

                    console.error('No lat/lng object provided');

                    return null;
                },
            },
            clusters: {
                _getParams: () => {
                    // @ts-ignore
                    let clusterParams: AdeliomMapClusterParams = this.options[keys.map.clusterParams as keyof AdeliomMapOptionsType]

                    if (clusterParams) {
                        clusterParams = orderParamsByFromValue(clusterParams);
                    }

                    return clusterParams;
                },
                _getParamsByCount: (count: number) => {
                    return getParamsByCount(count, this.helpers.google.clusters._getParams());
                },
                _getHoveredIcon: (count: number) => {
                    const paramsByCount = this.helpers.google.clusters._getParamsByCount(count);

                    return getIconConfig(getDefaultIconData(getSvg(paramsByCount?.defaultIconHoverColor)), paramsByCount.size, this.options.clusterIconCentered);
                },
                _getBasicIcon: (count: number) => {
                    const paramsByCount = this.helpers.google.clusters._getParamsByCount(count);

                    return getIconConfig(getDefaultIconData(getSvg(paramsByCount?.defaultIconColor)), paramsByCount.size, this.options.clusterIconCentered);
                },
                _getFontSize: (count: number) => {
                    const defaultValue: number = 12;

                    return defaultValue + 'px';
                },
                _getFontColor: (count: number) => {
                    return 'rgba(255,255,255,0.9)';
                },
                _getRenderer: () => {
                    // @ts-ignore
                    const clusterParams: AdeliomMapClusterParams = this.helpers.google.clusters._getParams();

                    if (clusterParams) {
                        const renderer = new AdeliomMapClusterRenderer(
                            clusterParams,
                            this
                        );

                        return renderer;
                    }

                    return null;
                },
                _handleClusterClick: (e: any, cluster: any, map: any) => {
                    this.helpers.markers._unselectAllMarkers();
                    map.fitBounds(cluster.bounds);
                },
            },
            markers: {
                /**
                 * Loop to init Google Maps markers
                 * @private
                 */
                _initMapMarkers: async (markers: AdeliomMapMarkerParamsType[], isFirstInit: boolean = false, addingMarkers: boolean = false, isDisablingClusters: boolean = false) => {
                    markers.forEach((marker: any) => {
                        this.helpers.google.markers._initMapMarker(marker);
                    });

                    if (!isDisablingClusters && this.helpers.markers._getClustersStatus()) {
                        if (!addingMarkers) {
                            this.helpers.markers._enableClusters(isFirstInit);
                        } else {
                            this.helpers.markers._disableClusters().then(() => {
                                this.helpers.markers._enableClusters();
                            });
                        }
                    }

                    this.emit(AdeliomMapEvents.markers.allCreated);
                },
                _initMapMarker: async (marker: AdeliomMapMarkerParamsType) => {
                    let markerData = this.helpers.google.markers._createMapMarker(marker);
                    this.emit(AdeliomMapEvents.markers.dataCreated, markerData);

                    return markerData;
                },
                /**
                 * Removes everything from the map and the list
                 */
                _clearMap: () => {
                    const currentClusterStatus = this.helpers.markers._getClustersStatus();

                    this.helpers.markers._disableClusters();

                    if (currentClusterStatus) {
                        this.helpers.markers._setClustersStatus(true);
                    }

                    this.markersData.forEach((markerData: AdeliomMapMarkerDataType) => {
                        markerData.marker?.setMap(null);
                    });

                    this.markersData = [];
                    this.markers = [];

                    if (this.mapListContainer) {
                        this.mapListContainer.innerHTML = '';
                    }
                },
                /**
                 * Returns the icon config object
                 * @param url
                 * @returns {{scaledSize: google.maps.Size, url}}
                 * @private
                 */
                _getIconConfig: (url: any, iconSize?: number, iconCentered?: boolean) => {
                    let size: any;

                    if (iconSize) {
                        size = iconSize;
                    } else {
                        size = this.options[keys.map.markerIconSize as keyof AdeliomMapOptionsType];
                    }

                    if (this.google) {
                        const iconImg: HTMLImageElement = document.createElement('img');
                        iconImg.src = url;
                        iconImg.setAttribute('height', size.toString());
                        iconImg.setAttribute('width', size.toString());

                        return iconImg;
                    }

                    return null;
                },
                /**
                 * Sets the idle icon to the provided marker
                 * @param marker
                 * @private
                 */
                _setIdleIcon: (marker: any) => {
                    const idleIcon = this.helpers.markers._getIdleIconForMarker(marker);

                    if (!this.helpers.markers._isMarkerSelected(marker) && idleIcon) {
                        const iconSize = this.helpers.markers._getIconSizeForMarker(marker);
                        const iconCentered = this.helpers.markers._getIconCenteredForMarker(marker);

                        marker.content.src = this.helpers.google.markers._getIconConfig(idleIcon, iconSize, iconCentered)?.src;
                    }
                },
                /**
                 * Sets the selected icon to the provided marker
                 * @param marker
                 * @private
                 */
                _setSelectedIcon: (marker: any) => {
                    const selectedIcon = this.helpers.markers._getSelectedIconForMarker(marker);

                    if (selectedIcon) {
                        const iconSize = this.helpers.markers._getIconSizeForMarker(marker);
                        const iconCentered = this.helpers.markers._getIconCenteredForMarker(marker);

                        marker.content.src = this.helpers.google.markers._getIconConfig(selectedIcon, iconSize, iconCentered)?.src;
                    }
                },
                /**
                 * Sets the hover icon to the provided marker
                 * @param marker
                 * @private
                 */
                _setHoveredIcon: (marker: any) => {
                    const hoveredIcon: any = this.helpers.markers._getHoveredIconForMarker(marker);

                    if (!this.helpers.markers._isMarkerSelected(marker) && hoveredIcon) {
                        const iconSize = this.helpers.markers._getIconSizeForMarker(marker);
                        const iconCentered = this.helpers.markers._getIconCenteredForMarker(marker);

                        marker.content.src = this.helpers.google.markers._getIconConfig(hoveredIcon, iconSize, iconCentered)?.src;
                    }
                },
                /**
                 * Adds basic Google Markers listeners (click, hover, ...)
                 * @param markerInstance
                 * @private
                 */
                _handleBasicMarkerListeners: (markerInstance: any) => {
                    if (this.google) {
                        const markerData: AdeliomMapMarkerDataType = this.helpers.markersData._getDataByProperty('marker', markerInstance);

                        if (markerData.hasInteraction) {
                            // Listener to handle mouseover (change icon)
                            markerInstance.content.addEventListener('mouseenter', () => {
                                if (!markerData.isFakeCluster) {
                                    this.helpers.google.markers._setHoveredIcon(markerInstance);
                                } else if (markerData.fakeClusterMarkers?.length) {
                                    const newIcon = this.helpers.google.clusters._getHoveredIcon(markerData.fakeClusterMarkers.length);
                                    const currentIcon = markerInstance.content?.querySelector(`.${clusterBgClass}`);

                                    currentIcon.src = newIcon.src;
                                }
                            });

                            // Listener to handle mouseout (change icon)
                            markerInstance.content.addEventListener('mouseout', () => {
                                if (!markerData.isFakeCluster) {
                                    this.helpers.google.markers._setIdleIcon(markerInstance);
                                } else if (markerData.fakeClusterMarkers?.length) {
                                    const newIcon = this.helpers.google.clusters._getBasicIcon(markerData.fakeClusterMarkers.length);
                                    const currentIcon = markerInstance.content?.querySelector(`.${clusterBgClass}`);

                                    currentIcon.src = newIcon.src;
                                }
                            });
                        }

                        // Listener to handle marker click
                        this.google.maps.event.addListener(markerInstance, 'click', () => {
                            this._handleClickMarker(markerInstance)
                        });
                    }
                },
                /**
                 * Allows to dynamically add markers to the Google Map
                 * @param markersRawData
                 */
                _addMapMarkers: (markersRawData: AdeliomMapMarkerParamsType | AdeliomMapMarkerParamsType[], isDisablingCluster: boolean = false) => {
                    let finalArray: AdeliomMapMarkerParamsType[];

                    if (!Array.isArray(markersRawData)) {
                        finalArray = [markersRawData];
                    } else {
                        finalArray = markersRawData;
                    }

                    finalArray.forEach((markerRawData: AdeliomMapMarkerParamsType) => {
                        this.markers.push(markerRawData);
                    });

                    this.helpers.google.markers._initMapMarkers(finalArray, false, true, isDisablingCluster);
                },
                _addMapMarker: async (markerRawData: AdeliomMapMarkerParamsType) => {
                    return await this.helpers.google.markers._initMapMarker(markerRawData);
                },
                _removeMapMarkers: (markers: any) => {
                    if (!Array.isArray(markers)) {
                        markers = [markers];
                    }

                    const alreadyExistingMarkers = this.markers;

                    markers.forEach((marker: any) => {
                        const rawData = this.helpers.markersData._getDataByProperty('marker', marker).rawData;

                        // Remove rawData from alreadyExistingMarkers
                        const index = alreadyExistingMarkers.indexOf(rawData);

                        if (index > -1) {
                            alreadyExistingMarkers.splice(index, 1);
                        }
                    });

                    this.helpers.google.markers._clearMap();
                    this.helpers.google.markers._addMapMarkers(alreadyExistingMarkers);
                },
                _removeMarkerFromMap: (marker: any) => {
                    marker.setMap(null);
                },
                /**
                 * Create a Google Map marker by passing marker raw data
                 * @param markerRawData
                 * @returns {{}}
                 * @private
                 */
                _createMapMarker: (markerRawData: AdeliomMapMarkerParamsType) => {
                    const markerData: AdeliomMapMarkerDataType = {
                        rawData: {
                            coordinates: {
                                lat: 0,
                                lng: 0,
                            },
                        },
                    };
                    markerData.selected = false;
                    markerData.rawData = markerRawData;
                    markerData.hasInteraction = markerRawData.hasInteractions ?? true;
                    markerData.isFakeCluster = markerRawData.isFakeCluster ?? false;

                    if (markerData.isFakeCluster && markerRawData?.fakeClusterMarkers) {
                        markerData.fakeClusterMarkers = markerRawData.fakeClusterMarkers;

                        // Si le faux cluster n'a pas de coordonnées et qu'il a bien des markers
                        if (!markerRawData?.coordinates && Array.isArray(markerData.fakeClusterMarkers)) {
                            markerRawData.coordinates = this.helpers.markers._getMarkersCenterCoordinates(markerData.fakeClusterMarkers);
                        }
                    }

                    let markerPosition = null;

                    if (this.google) {
                        markerPosition = new this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng);
                    }

                    const markerTitle = markerRawData?.title;

                    const markerConfig: AdeliomMapMarkerConfigType = {
                        position: markerPosition,
                        title: markerTitle,
                        map: this.map,
                    };

                    let iconSize: number | undefined = markerRawData?.iconSize;
                    const iconCentered = markerRawData?.iconCentered;

                    if (markerRawData?.isGeolocation) {
                        iconSize = this.helpers.geolocation._getMarkerSize();
                    }

                    if (markerRawData?.icon) {
                        const url: string = markerRawData.isGeolocation && this.helpers.geolocation._getMarkerIcon()
                            ? this.helpers.geolocation._getMarkerIcon()
                            : markerRawData.icon;

                        markerConfig.content = this.helpers.google.markers._getIconConfig(url, iconSize, iconCentered);
                        markerData.icon = markerRawData.icon;
                    } else if (this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType]) {
                        const url: string = markerRawData.isGeolocation && this.helpers.geolocation._getMarkerIcon()
                            ? this.helpers.geolocation._getMarkerIcon()
                            : this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType];
                        if (!markerRawData.isFakeCluster) {
                            markerConfig.content = this.helpers.google.markers._getIconConfig(url, iconSize, iconCentered);
                        } else if (markerData.fakeClusterMarkers?.length) {
                            const markersCount = markerData.fakeClusterMarkers.length
                            const background = this.helpers.google.clusters._getBasicIcon(markersCount);
                            const fontColor = this.helpers.google.clusters._getFontColor(markersCount);
                            const iconSize = markerData.iconSize ?? 56;

                            markerConfig.content = generateElement(markersCount, fontColor, iconSize, null, null, background)
                        }
                    }

                    if (markerRawData.isGeolocation) {
                        markerConfig.zIndex = 9999999999;
                        markerData.isGeolocation = true;
                    }

                    if (markerRawData?.selectedIcon) {
                        markerData.selectedIcon = markerRawData.selectedIcon;
                    }

                    if (markerRawData?.hoveredIcon) {
                        markerData.hoveredIcon = markerRawData.hoveredIcon;
                    }

                    let markerInstance = null;

                    if (this.google) {
                        // Marker instanciation
                        markerInstance = new this.google.maps.marker.AdvancedMarkerElement(markerConfig);
                    }

                    this.emit(AdeliomMapEvents.markers.created, markerInstance);

                    markerData.marker = markerInstance;

                    markerData.infoWindow = markerData.hasInteraction ? this.helpers.google.infoWindows._createMapInfoWindow(markerRawData) : null;

                    const iconSizeVal = markerRawData?.iconSize ? markerRawData.iconSize : this.options[keys.map.markerIconSize as keyof AdeliomMapOptionsType];
                    const iconCenteredVal = markerRawData?.iconCentered !== undefined ? markerRawData.iconCentered : this.options[keys.map.markerIconCentered as keyof AdeliomMapOptionsType];

                    markerData.iconSize = Number(iconSizeVal);
                    markerData.iconCentered = Boolean(iconCenteredVal);

                    let listElt: any = null;

                    if (markerData.hasInteraction && this.mapListContainer) {
                        listElt = this._createMapListInstance(markerRawData, markerInstance);
                        markerData.listElt = listElt;
                    }

                    if (markerData.infoWindow) {
                        this.helpers.google.infoWindows._handleInfoWindowListeners(markerData.infoWindow, markerInstance);
                    }

                    this.markersData.push(markerData);

                    this.helpers.google.markers._handleBasicMarkerListeners(markerInstance);

                    return markerData;
                },
                _autoZoomToFitAllMarkers: (markersRawData: AdeliomMapMarkerParamsType[]) => {
                    if (this.google) {
                        const bounds = new this.google.maps.LatLngBounds();

                        const myPoints: any[] = [];

                        markersRawData.forEach((markerRawData: AdeliomMapMarkerParamsType) => {
                            if (this.google) {
                                myPoints.push(new this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng));
                            }
                        });

                        myPoints.forEach((point: any) => {
                            bounds.extend(point);
                        });

                        this.map?.fitBounds(bounds);

                        this.emit(AdeliomMapEvents.markers.allFit, bounds);
                    }
                },
            },
            polylines: {
                _initPolylines: async (polylines: AdeliomMapPolyline[]) => {
                    polylines.forEach(polyline => {
                        this.helpers.google.polylines._addMapPolyline(polyline);
                    });
                },
                _addMapPolyline: (polyline: AdeliomMapPolyline) => {
                    const coordinates = polyline.coordinates;

                    if (polyline.closeShape) {
                        const firstCoordinate = coordinates[0];
                        const lastCoordinate = coordinates[coordinates.length - 1];

                        if (firstCoordinate.lat !== lastCoordinate.lat || firstCoordinate.lng !== lastCoordinate.lng) {
                            coordinates.push(coordinates[0]);
                        }
                    }

                    if (this.google?.maps) {
                        const newPolyline = new this.google.maps.Polyline({
                            path: coordinates,
                            geodesic: true,
                            strokeColor: polyline.strokeColor ?? '#FF0000',
                            strokeOpacity: polyline.strokeOpacity ?? 1,
                            strokeWeight: polyline.strokeWeight ?? 2,
                        });

                        newPolyline.setMap(this.map);

                        this.polylines.push(newPolyline);
                    }
                },
            },
            infoWindows: {
                /**
                 * Create a Google Map marker infoWindow by passing marker raw data
                 * @param markerRawData
                 * @returns {null|*}
                 * @private
                 */
                _createMapInfoWindow: (markerRawData: any) => {
                    if (this.options[keys.map.displayInfoWindows as keyof AdeliomMapOptionsType]) {

                        let content;

                        // If an infoWindow template is defined for this specific marker
                        if (markerRawData?.infoWindowTemplate) {
                            content = markerRawData.infoWindowTemplate;
                        } else {
                            content = this.options[keys.map.infoWindowTemplate as keyof AdeliomMapOptionsType];

                            if (this.options[keys.map.replaceInfoWindowContentWithMarkerData as keyof AdeliomMapOptionsType]) {
                                content = this._replaceMarkerDataInString(markerRawData, content)
                            }
                        }

                        let infoWindowInstance = null;

                        if (this.google) {
                            infoWindowInstance = new this.google.maps.InfoWindow({
                                content: content,
                            });
                        }

                        this.emit(AdeliomMapEvents.infoWindows.created, infoWindowInstance);

                        return infoWindowInstance;
                    }

                    return null;
                },
                _handleInfoWindowListeners: (infoWindow: any, markerInstance: any) => {
                    if (this.google) {
                        infoWindow.addListener('closeclick', () => {
                            this._handleClickMarker(markerInstance);
                        });
                    }
                },
            },
            map: {
                /**
                 * Init the Google Map instance
                 * @param container
                 * @returns {Promise<void>}
                 * @private
                 */
                _initMap: async (container: any) => {
                    if (!this.google) {
                        let loader;

                        const options: LoaderOptions = Object(this.options[keys.apiOptions as keyof AdeliomMapOptionsType]) ?? {};

                        if (!options.libraries || !options.libraries.includes('marker')) {
                            // Append marker to array option.libraries
                            options.libraries = options.libraries ? [...options.libraries, 'marker'] : ['marker'];
                        }

                        if (options) {
                            loader = new Loader(this.options.apiKey, options);
                        } else {
                            loader = new Loader(this.options.apiKey);
                        }

                        this.google = await loader.load();
                    }


                    this.map = new this.google.maps.Map(container, {
                        center: this.options[keys.map.defaultCenter as keyof AdeliomMapOptionsType],
                        zoom: this.options[keys.map.defaultZoom as keyof AdeliomMapOptionsType],
                        zoomControl: this.options[keys.map.controls.zoomButtons as keyof AdeliomMapOptionsType],
                        streetViewControl: this.options[keys.map.controls.streetViewButton as keyof AdeliomMapOptionsType],
                        fullscreenControl: this.options[keys.map.controls.fullscreenButton as keyof AdeliomMapOptionsType],
                        mapTypeControl: this.options[keys.map.controls.mapTypeButtons as keyof AdeliomMapOptionsType],
                        scaleControl: this.options[keys.map.controls.displayScale as keyof AdeliomMapOptionsType],
                        rotateControl: this.options[keys.map.controls.rotateControl as keyof AdeliomMapOptionsType],
                        styles: this.helpers.google.map._getMapStyles(),
                        mapTypeId: this.options[keys.map.type as keyof AdeliomMapOptionsType],
                        mapId: 'DEMO_MAP_ID',
                    });

                    this.helpers.google.map._handleClickOnMap();
                    this.helpers.google.map._handleMapMove();
                },
                _handleClickOnMap: () => {
                    if (this.map) {
                        if (this.options.mapHideMarkerOnClickOutside) {
                            this.map.addListener('click', () => {
                                this.markersData.forEach(markerData => {
                                    this.helpers.markers._setMarkerState(markerData.marker, false);
                                });
                            });
                        }
                    }
                },
                _handleMapMove: () => {
                    if (this.map) {
                        this.map.addListener('dragend', () => {
                            this.emit(AdeliomMapEvents.map.hasBeenDragged, this.map?.getBounds());
                        });
                    }
                },
                /**
                 * Returns the style array required to define Google Maps style
                 * @returns {[{featureType: string, stylers: [{visibility: string}]}]}
                 * @private
                 */
                _getMapStyles: () => {
                    const mapStyles: AdeliomMapStyleElement[] = Object(this.options[keys.map.customStyles as keyof AdeliomMapOptionsType]);

                    const poiStyle: AdeliomMapStyleElement = {
                        featureType: 'poi',
                        stylers: [
                            {
                                visibility: this.options[keys.map.showPlaces as keyof AdeliomMapOptionsType] ? 'on' : 'off',
                            }
                        ]
                    };

                    if (Object.prototype.toString.call(mapStyles) === '[object Array]') {
                        if (mapStyles && Array.isArray(mapStyles)) {
                            mapStyles.push(poiStyle);
                        }

                        return mapStyles;
                    }

                    console.error(`${keys.map.customStyles} must be an array.`);

                    return [
                        poiStyle
                    ];
                },
                _setMapType: (type: AdeliomMapTypes) => {
                    this.map?.setMapTypeId(type);
                },
                _setMapStyle: (styles: AdeliomMapStyleElement[]) => {
                    if (this.map) {
                        // @ts-ignore
                        this.map.setOptions({styles: styles});
                    }
                },
            },
            places: {
                _initPlacesField: () => {
                    if (this.placesInput) {
                        const placesField: HTMLInputElement = this.placesInput;
                        const placesOptions: AdeliomMapPlacesOptionsType = Object(this.options[keys.places.options as keyof AdeliomMapOptionsType]) ?? {};
                        const placesMapOptions: AdeliomMapPlacesMapOptionsType = Object(this.options[keys.places.mapOptions as keyof AdeliomMapOptionsType]) ?? {};

                        placesField.addEventListener('focus', () => {
                            this.emit(AdeliomMapEvents.places.fieldHasBeenFocused);
                        });

                        placesField.addEventListener('blur', () => {
                            this.emit(AdeliomMapEvents.places.fieldHasBeenBlurred);
                        });

                        this.on(AdeliomMapEvents.map.mapLoaded, () => {
                            if (this.google?.maps?.places) {
                                this.autocomplete = new this.google.maps.places.Autocomplete(placesField, placesOptions);
                                this.google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
                                    const clickedPlace = this.autocomplete.getPlace();

                                    if (clickedPlace?.geometry?.location) {
                                        this.emit(AdeliomMapEvents.places.selectedPlaceHasBeenFound, clickedPlace);

                                        const coordinates: AdeliomMapCoordinatesType = {
                                            lat: clickedPlace.geometry.location.lat(),
                                            lng: clickedPlace.geometry.location.lng(),
                                        };

                                        const latLngCoordinates = this.helpers.google.coordinates._getLatLng(coordinates);

                                        if (latLngCoordinates?.lat() && latLngCoordinates?.lng()) {
                                            this.helpers.map._setCenter(latLngCoordinates);
                                            this.helpers.map._setZoom(placesMapOptions.zoomOnPlace);

                                            this.emit(AdeliomMapEvents.places.selectedPlaceHasBeenCentered, clickedPlace);
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
            }
        },
        places: {
            _commonInit: () => {
                switch (this.helpers.providers._getProvider()) {
                    case 'google':
                        this.helpers.google.places._initPlacesField();
                        break;
                    default:
                        break;
                }
            },
        },
        geolocation: {
            _canGeolocate: () => {
                return window.navigator.geolocation;
            },
            _getCoordinates: (success: PositionCallback, failure?: PositionErrorCallback) => {
                if (this.helpers.geolocation._canGeolocate()) {
                    return window.navigator.geolocation.getCurrentPosition((data) => {
                        this.emit(AdeliomMapEvents.geolocation.success, data);
                        success(data);
                    }, (data) => {
                        this.emit(AdeliomMapEvents.geolocation.error, data);
                        console.error('Erreur lors de la géolocalisation', data);

                        if (failure) {
                            failure(data);
                        }
                    });
                }

                return false;
            },
            _getMarkerIcon: () => {
                return Object(this.options[keys.geolocation.options as keyof AdeliomMapOptionsType])?.icon;
            },
            _getMarkerSize: () => {
                return Object(this.options[keys.geolocation.options as keyof AdeliomMapOptionsType])?.iconSize;
            },
            _handleGeolocationRequest: (forceMarker: boolean = false, withZoom?: number | boolean, showMarker?: boolean) => {
                this.helpers.geolocation._removeGeolocationMarker();
                this.helpers.markers._unselectAllMarkers();

                let zoomValue: undefined | number = undefined;

                if (withZoom) {
                    if (typeof withZoom === "number") {
                        zoomValue = withZoom;
                    } else {
                        const geolocationOptions: AdeliomMapGeolocationOptionsType = Object(this.options[keys.geolocation.options as keyof AdeliomMapOptionsType]) ?? {};
                        zoomValue = geolocationOptions.zoomOnGeolocation;
                    }
                }

                this.helpers.geolocation._getCoordinates((data: GeolocationPosition) => {
                    if (data?.coords?.latitude && data?.coords?.longitude) {
                        const geolocationOptions: AdeliomMapGeolocationOptionsType = Object(this.options[keys.geolocation.options as keyof AdeliomMapOptionsType]) ?? {};

                        if (typeof showMarker === 'undefined') {
                            if (forceMarker) {
                                showMarker = true;
                            } else {
                                showMarker = geolocationOptions.addMarkerToMap ?? false;
                            }
                        }

                        const latLng = this.helpers.google.coordinates._getLatLng({
                            lat: data.coords.latitude,
                            lng: data.coords.longitude,
                        });

                        this.helpers.map._setCenter(latLng);

                        if (withZoom && zoomValue) {
                            this.helpers.map._setZoom(zoomValue);
                        }

                        if (showMarker) {
                            const marker: AdeliomMapMarkerParamsType = {
                                coordinates: {
                                    lat: data.coords.latitude,
                                    lng: data.coords.longitude,
                                },
                                hasInteractions: false,
                                isGeolocation: true,
                            }

                            this.helpers.google.markers._addMapMarker(marker).then((geolocationMarker) => {
                                this.geolocationMarkerData = geolocationMarker;
                            })
                        }

                        this.emit(AdeliomMapEvents.geolocation.centered, latLng);
                    }
                });
            },
            _removeGeolocationMarker: () => {
                if (this.geolocationMarkerData?.marker) {
                    switch (this.helpers.providers._getProvider()) {
                        case 'google':
                            this.helpers.google.markers._removeMarkerFromMap(this.geolocationMarkerData.marker);
                            break;
                        default:
                            break;
                    }

                    this.geolocationMarkerData = null;
                    this.emit(AdeliomMapEvents.markers.geolocationRemoved);
                }
            },
            _commonInit: () => {
                if (this.helpers.geolocation._canGeolocate()) {
                    if (this.geolocationButton) {
                        this.geolocationButton.addEventListener('click', () => {
                            this.helpers.geolocation._handleGeolocationRequest();
                        });
                    }
                }
            },
        }
    };

    _replaceMarkerDataInString(markerData: any, string: any) {
        if (string) {
            Object.keys(markerData).forEach(key => {
                const search = `{{ ${key} }}`;
                string = string.replaceAll(search, markerData[key]);
            });
        }

        return string;
    }

    /**
     * Creates a map list instance (store locator instance)
     * @param markerRawData
     * @param mapMarkerInstance
     * @returns {HTMLDivElement}
     * @private
     */
    _createMapListInstance(markerRawData: any, mapMarkerInstance: any) {
        let mapListInstance: any;

        if (markerRawData?.listEltId) {
            mapListInstance = document.querySelector(`[js-map-list-id='${markerRawData.listEltId}']`);

        } else {
            mapListInstance = document.createElement('div');
            let selectorWithout = this.options[keys.list.selector as keyof AdeliomMapOptionsType];

            if (typeof selectorWithout === 'string') {
                selectorWithout = selectorWithout.replace('[', '').replace(']', '')
            }

            mapListInstance.setAttribute(selectorWithout + '-elt', '');

            let listInstanceHtml;

            // If a list elt template is defined for this specific marker
            if (markerRawData?.listEltTemplate) {
                listInstanceHtml = markerRawData.listEltTemplate;
            } else {
                listInstanceHtml = this.mapListEltTemplate;

                if (this.options[keys.list.replaceWithMarkerData as keyof AdeliomMapOptionsType]) {
                    listInstanceHtml = this._replaceMarkerDataInString(markerRawData, listInstanceHtml);
                }
            }

            mapListInstance.innerHTML = listInstanceHtml;

            if (this.mapListContainer) {
                this.mapListContainer.appendChild(mapListInstance);
            }
        }

        if (mapListInstance) {
            mapListInstance.addEventListener('click', () => {
                this._handleClickListElt(mapListInstance);
            });

            this.emit(AdeliomMapEvents.listElements.created, mapListInstance);
        }

        return mapListInstance;
    };

    _handleClickListElt(listElt: any) {
        const mapMarkerInstance = this.helpers.markers._getMarkerByListEltNode(listElt);

        if (mapMarkerInstance) {
            if (this.options[keys.map.displayInfoWindows as keyof AdeliomMapOptionsType]) {
                this.helpers.markers._setMarkerState(mapMarkerInstance, 'toggle');
            }
        }

        const data = this.helpers.markersData._getDataByProperty('listElt', listElt);

        this.emit(AdeliomMapEvents.listElements.clicked, data);
    };

    _handleClickMarker(marker: any) {
        const markerData: AdeliomMapMarkerDataType = this.helpers.markersData._getDataByProperty('marker', marker);

        if (markerData.hasInteraction) {
            if (this.options[keys.map.displayInfoWindows as keyof AdeliomMapOptionsType]) {
                if (this.helpers.markers._isMarkerSelected(marker)) {
                    this.helpers.markers._setMarkerState(marker, false);
                } else {
                    this.helpers.markers._setMarkerState(marker, true);
                }
            }

            this.emit(AdeliomMapEvents.markers.clicked, markerData);
        } else {
            this.helpers.map._centerMapOnMarker(marker);
            this.emit(AdeliomMapEvents.markers.geolocationClicked, markerData);
        }
    };

    async _initMap() {
        if (this.options[keys.map.selector as keyof AdeliomMapOptionsType]) {
            if (this.mapContainer) {
                this.helpers.map._addClassesToMapContainer([this.mapCustomClass]);

                return await this._handleConsent();
            } else {
                console.error(errors.selectors.map.notFound);
            }
        } else {
            console.error(errors.selectors.map.notProvided);
        }

        return false;
    };

    _getPPMS() {
        if (null === this.ppms) {
            // @ts-ignore
            const ppms: any = window.ppms;

            if (ppms) {
                this.ppms = ppms;
            }
        }

        return this.ppms;
    }

    /**
     * Returns 0 if no consent, 1 if consent
     */
    async _getPiwikConsent() {
        let consent: number = 0;

        if (this._getPPMS()) {
            // Promisify the callback function
            consent = await new Promise<number>((resolve, reject) => {
                this._getPPMS().cm.api('getComplianceSettings', (type: any) => {
                    const key: any = this.options[keys.rgpd.piwikConsentKey as keyof AdeliomMapOptionsType];

                    if (type && type.consents && type.consents[key]) {
                        resolve(type.consents[key].status);
                    } else {
                        reject('Unable to get consent status');
                    }
                });
            });
        }

        return consent;
    }

    _openPiwikConsent() {
        if (this.usePiwik) {
            if (this._getPPMS()) {
                this._getPPMS().cm.api('openConsentForm');
            }
        }
    }

    async _handleInitAfterConsentGiven() {
        const provider = this.options[keys.map.provider as keyof AdeliomMapOptionsType];

        if (provider && typeof provider === 'string') {
            if (this.helpers.providers._isProviderAvailable(provider)) {
                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                    default:
                        await this.helpers.google.map._initMap(this.mapContainer);
                        break;
                }

                return true;
            } else {
                console.error(`The provider "${provider}" is not available.`);
            }
        }

        return false;
    }

    async _handlePiwikEvents() {
        if (this.usePiwik && this._getPPMS()) {
            // @ts-ignore
            const buttonKeys: AdeliomMapPiwikButtonSelectorsType = this.options[keys.rgpd.piwikButtonSelectors as keyof AdeliomMapOptionsType];

            document.body.addEventListener('click', (e) => {
                // @ts-ignore
                if (e.target && e.target.parentNode) {
                    // @ts-ignore
                    const parent = e.target.parentNode;

                    Object.keys(buttonKeys).forEach((key) => {
                        // @ts-ignore
                        const elt = parent.querySelector(buttonKeys[key]);

                        if (elt === e.target) {
                            switch (key) {
                                case 'acceptAll':
                                    this._handlePiwikAcceptAllEvent();
                                    break;
                                case 'rejectAll':
                                    this._handlePiwikRejectAllEvent();
                                    break;
                                case 'saveChoices':
                                    this._handlePiwikSaveChoicesEvent();
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                }
            });
        }
    }

    _handlePiwikAcceptAllEvent() {
        this.emit(AdeliomMapEvents.rgpd.acceptAllClicked);

        this.helpers.map._initMapAndMarkers();
    }

    _handlePiwikRejectAllEvent() {
        this.emit(AdeliomMapEvents.rgpd.rejectAllClicked);

        this._handleConsent();
    }

    _handlePiwikSaveChoicesEvent() {
        this.emit(AdeliomMapEvents.rgpd.saveChoicesClicked);

        this._handleConsent();
    }

    async _handleConsent() {
        const hasToAskForConsent = this.options[keys.rgpd.askForConsent as keyof AdeliomMapOptionsType];

        if (this.usePiwik) {
            const piwikConsent = await this._getPiwikConsent();

            this.hasConsent = piwikConsent === 1;
        }

        if ((hasToAskForConsent && !this.hasConsent)) {
            this.helpers.consentScreen._setConsentScreen(this.hasConsent);

            setTimeout(() => {
                this.emit(AdeliomMapEvents.map.consentNotGiven);
            }, 10);

            return false;
        } else {
            if (hasToAskForConsent && this.hasConsent) {
                setTimeout(() => {
                    this.emit(AdeliomMapEvents.map.consentGiven);
                }, 10);
            }

            if (!this.options[keys.map.checkSize as keyof AdeliomMapOptionsType] || (this.mapContainer && this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                return await this._handleInitAfterConsentGiven();
            } else {
                console.error(errors.selectors.map.tooSmall);

                return false;
            }
        }
    }
}
