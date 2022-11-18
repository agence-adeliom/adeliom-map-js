// @ts-ignore
import Emitter from "./Emitter";
import keys from "./optionKeys";
import defaultOptions, {mapAnims} from "./defaultOptions";
import {AdeliomMapEvents} from "./AdeliomMap";
import {Loader, LoaderOptions} from "google-maps";
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import AdeliomMapClusterRenderer from "./AdeliomMapClusterRenderer";
import {
    AdeliomMapCoordinatesType, AdeliomMapGoogleType,
    AdeliomMapMarkerConfigType,
    AdeliomMapMarkerDataType, AdeliomMapMarkerParamsType,
    AdeliomMapOptionsType, AdeliomMapPlacesMapOptionsType, AdeliomMapPlacesOptionsType
} from "./AdeliomMapTypes";
import errors from "./errors";

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
    public mapListContainer: HTMLElement | null;
    public placesInput: HTMLInputElement | null;
    public autocomplete: any;
    public markers: AdeliomMapMarkerParamsType[];
    private markersData: AdeliomMapMarkerDataType[];
    public clusterer: MarkerClusterer | null;
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


    constructor() {
        super();

        this.emit = super.emit;
        this.on = super.on;

        this.defaultOptions = defaultOptions;

        this.map = null;
        this.mapContainer = null;
        this.mapListContainer = null;
        this.placesInput = null;

        this.markers = [];
        this.markersData = [];
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
        },
        markers: {
            /**
             * Get the center of all provided markers
             * @param markersRawData
             * @returns {{lng: number, lat: number}|*}
             * @private
             */
            _getMarkersCenterCoordinates: (markersRawData: any) => {
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
            /**
             * Init markers by its map provider (google, ...)
             * @private
             */
            _initMarkers: (markers: any) => {
                let center = null;

                switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    case 'google':
                    default:
                        this.helpers.google.markers._initMapMarkers(markers).then(() => {
                            this.helpers.map._autoCenter(markers);
                        });
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
                return this.markersData;
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
            _getMarkerCoordinates: (marker: any) => {
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
                if (isSelected == 'toggle') {
                    // @ts-ignore
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

                if (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                    if (!isSelected) {
                        switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                            case 'google':
                                this.helpers.google.markers._setIdleIcon(marker);
                                break;
                        }
                    } else {
                        switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
                            case 'google':
                                this.helpers.google.markers._setSelectedIcon(marker);
                                break;
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
            _disableClusters: () => {
                if (this.helpers.markers._getClustersStatus() && this.map) {
                    if (this.clusterer) {
                        this.clusterer?.clearMarkers();
                        this.clusterer = null;

                        this.helpers.markers._setClustersStatus(false);

                        const currentMarkersData = this.helpers.markersData._getAllMarkersRawData();

                        this.helpers.google.markers._clearMap();
                        this.helpers.google.markers._addMapMarkers(currentMarkersData);

                        this.emit(AdeliomMapEvents.clusters.disabled);
                    }
                }
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
                        switch (this.helpers.providers._getProvider()) {
                            case 'google':
                                this.clusterer = new MarkerClusterer({
                                    markers: this.helpers.markers._getAllMarkerInstances(),
                                    map: this.map,
                                    onClusterClick: this.helpers.google.clusters._handleClusterClick,
                                    renderer: this.helpers.google.clusters._getRenderer()
                                });
                                break;
                            default:
                                break;
                        }

                        this.emit(AdeliomMapEvents.clusters.enabled);
                    }
                }
            },
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
                const markersRawData: (AdeliomMapMarkerParamsType | undefined)[] = [];

                this.helpers.markers._getMarkersData().forEach((markerData: AdeliomMapMarkerDataType) => {
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

                    this._initMap().then((isInit: any) => {
                        if (isInit && this.displayMarkers) {
                            this.helpers.markers._initMarkers(this.markers);
                            this.emit(AdeliomMapEvents.map.mapLoaded);
                        }
                    });
                }
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
                    if (this.map && this.map.getZoom() < this.options[keys.map.zoomMarkerOnClick as keyof AdeliomMapOptionsType]) {
                        this.helpers.map._setZoom(this.options[keys.map.zoomMarkerOnClick as keyof AdeliomMapOptionsType]);
                    }
                }
            },
            /**
             * Sets the level of zoom on the map
             * @param zoom
             */
            _setZoom: (zoom: number) => {
                if (this.map) {
                    this.map.setZoom(zoom);
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
             * @param markers
             * @private
             */
            _autoCenter: (markers: any) => {
                if (this.options[keys.map.autoCenter as keyof AdeliomMapOptionsType]) {
                    const center: AdeliomMapCoordinatesType = this.helpers.markers._getMarkersCenterCoordinates(markers);

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
        },
        consentScreen: {
            /**
             * Removes the displayed map and sets the consent screen
             * @private
             */
            _setConsentScreen: () => {
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
                    consentButton.innerText = this.options[keys.rgpd.buttonMessage as keyof AdeliomMapOptionsType];
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
                _getRenderer: () => {
                    const renderer = new AdeliomMapClusterRenderer(
                        this.options[keys.map.clusterParams as keyof AdeliomMapOptionsType],
                        this.options
                    );

                    return renderer;
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
                _initMapMarkers: async (markers: any) => {
                    markers.forEach((marker: any) => {
                        let markerData = this.helpers.google.markers._createMapMarker(marker);
                        this.emit(AdeliomMapEvents.markers.dataCreated, markerData);
                    });

                    this.helpers.markers._enableClusters(true);
                    this.emit(AdeliomMapEvents.markers.allCreated);
                },
                /**
                 * Removes everything from the map and the list
                 */
                _clearMap: () => {
                    this.helpers.markers._disableClusters();

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
                    let size;
                    let isCentered;

                    if (iconSize) {
                        size = iconSize;
                    } else {
                        size = this.options[keys.map.markerIconSize as keyof AdeliomMapOptionsType];
                    }

                    if (iconCentered !== undefined) {
                        isCentered = iconCentered;
                    } else {
                        isCentered = this.options[keys.map.markerIconCentered as keyof AdeliomMapOptionsType];
                    }

                    if (this.google) {
                        const config = {
                            url: url,
                            scaledSize: new this.google.maps.Size(size, size),
                            anchor: null,
                        };

                        if (isCentered) {
                            config.anchor = new this.google.maps.Point(size / 2, size / 2);
                        }

                        return config;
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

                        marker.setIcon(this.helpers.google.markers._getIconConfig(idleIcon, iconSize, iconCentered));
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

                        marker.setIcon(this.helpers.google.markers._getIconConfig(selectedIcon, iconSize, iconCentered));
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

                        marker.setIcon(this.helpers.google.markers._getIconConfig(hoveredIcon, iconSize, iconCentered));
                    }
                },
                /**
                 * Adds basic Google Markers listeners (click, hover, ...)
                 * @param markerInstance
                 * @private
                 */
                _handleBasicMarkerListeners: (markerInstance: any) => {
                    if (this.google) {
                        // Listener to handle marker click
                        this.google.maps.event.addListener(markerInstance, 'click', () => {
                            this._handleClickMarker(markerInstance)
                        });

                        // Listener to handle mouseover (change icon)
                        this.google.maps.event.addListener(markerInstance, 'mouseover', () => {
                            this.helpers.google.markers._setHoveredIcon(markerInstance);
                        });

                        // Listener to handle mouseout (change icon)
                        this.google.maps.event.addListener(markerInstance, 'mouseout', () => {
                            this.helpers.google.markers._setIdleIcon(markerInstance);
                        });
                    }
                },
                /**
                 * Allows to dynamically add markers to the Google Map
                 * @param markersRawData
                 */
                _addMapMarkers: (markersRawData: any) => {
                    if (!Array.isArray(markersRawData)) {
                        markersRawData = [markersRawData];
                    }

                    markersRawData.forEach((markerRawData: AdeliomMapMarkerParamsType) => {
                        this.markers.push(markerRawData);
                    });

                    this.helpers.google.markers._initMapMarkers(markersRawData);
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
                /**
                 * Create a Google Map marker by passing marker raw data
                 * @param markerRawData
                 * @returns {{}}
                 * @private
                 */
                _createMapMarker: (markerRawData: AdeliomMapMarkerParamsType) => {
                    const markerData: AdeliomMapMarkerDataType = {};
                    markerData.selected = false;
                    markerData.rawData = markerRawData;

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

                    const iconSize = markerRawData?.iconSize;
                    const iconCentered = markerRawData?.iconCentered;

                    if (markerRawData?.icon) {
                        markerConfig.icon = this.helpers.google.markers._getIconConfig(markerRawData.icon, iconSize, iconCentered);
                        markerData.icon = markerRawData.icon;
                    } else if (this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType]) {
                        markerConfig.icon = this.helpers.google.markers._getIconConfig(this.options[keys.map.markerIconUrl as keyof AdeliomMapOptionsType], iconSize, iconCentered);
                    }

                    if (markerRawData?.selectedIcon) {
                        markerData.selectedIcon = markerRawData.selectedIcon;
                    }

                    if (markerRawData?.hoveredIcon) {
                        markerData.hoveredIcon = markerRawData.hoveredIcon;
                    }

                    let markerInstance = null;

                    if (this.google) {
                        markerInstance = new this.google.maps.Marker(markerConfig);
                    }

                    this.emit(AdeliomMapEvents.markers.created, markerInstance);

                    markerData.marker = markerInstance;

                    markerData.infoWindow = this.helpers.google.infoWindows._createMapInfoWindow(markerRawData);
                    markerData.iconSize = markerRawData?.iconSize ? markerRawData.iconSize : this.options[keys.map.markerIconSize as keyof AdeliomMapOptionsType];
                    markerData.iconCentered = markerRawData?.iconCentered !== undefined ? markerRawData.iconCentered : this.options[keys.map.markerIconCentered as keyof AdeliomMapOptionsType];

                    let listElt: any = null;

                    if (this.mapListContainer) {
                        listElt = this._createMapListInstance(markerRawData, markerInstance);
                        markerData.listElt = listElt;
                    }

                    this.helpers.google.markers._handleBasicMarkerListeners(markerInstance);
                    this.helpers.google.infoWindows._handleInfoWindowListeners(markerData.infoWindow, markerInstance);

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

                        if (this.options[keys.apiOptions as keyof AdeliomMapOptionsType]) {
                            const options: LoaderOptions = this.options[keys.apiOptions as keyof AdeliomMapOptionsType];
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
                    });

                    this.helpers.google.map._handleClickOnMap();
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
                /**
                 * Returns the style array required to define Google Maps style
                 * @returns {[{featureType: string, stylers: [{visibility: string}]}]}
                 * @private
                 */
                _getMapStyles: () => {
                    const mapStyles = this.options[keys.map.customStyles as keyof AdeliomMapOptionsType];

                    const poiStyle = {
                        featureType: 'poi',
                        stylers: [
                            {
                                visibility: this.options[keys.map.showPlaces as keyof AdeliomMapOptionsType] ? 'on' : 'off',
                            }
                        ]
                    };

                    if (Object.prototype.toString.call(mapStyles) === '[object Array]') {
                        if (mapStyles) {
                            mapStyles.push(poiStyle);
                        }

                        return mapStyles;
                    }

                    console.error(`${keys.map.customStyles} must be an array.`);

                    return [
                        poiStyle
                    ];
                }
            },
            places: {
                _initPlacesField: () => {
                    if (this.placesInput) {
                        const placesField: HTMLInputElement = this.placesInput;
                        const placesOptions: AdeliomMapPlacesOptionsType = this.options[keys.places.options as keyof AdeliomMapOptionsType] ?? {};
                        const placesMapOptions: AdeliomMapPlacesMapOptionsType = this.options[keys.places.mapOptions as keyof AdeliomMapOptionsType] ?? {};

                        this.on(AdeliomMapEvents.map.mapLoaded, () => {
                            if (this.google?.maps?.places) {
                                this.autocomplete = new this.google.maps.places.Autocomplete(placesField, placesOptions);
                                this.google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
                                    const clickedPlace = this.autocomplete.getPlace();

                                    if (clickedPlace?.geometry?.location) {
                                        const coordinates: AdeliomMapCoordinatesType = {
                                            lat: clickedPlace.geometry.location.lat(),
                                            lng: clickedPlace.geometry.location.lng(),
                                        };

                                        const latLngCoordinates = this.helpers.google.coordinates._getLatLng(coordinates);

                                        if (latLngCoordinates?.lat() && latLngCoordinates?.lng()) {
                                            this.helpers.map._setCenter(latLngCoordinates);
                                            this.helpers.map._setZoom(placesMapOptions.zoomOnPlace);
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
            const selectorWithout = this.options[keys.list.selector as keyof AdeliomMapOptionsType].replace('[', '').replace(']', '');

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
        if (this.options[keys.map.displayInfoWindows as keyof AdeliomMapOptionsType]) {
            if (this.helpers.markers._isMarkerSelected(marker)) {
                this.helpers.markers._setMarkerState(marker, false);
            } else {
                this.helpers.markers._setMarkerState(marker, true);
            }
        }

        const data = this.helpers.markersData._getDataByProperty('marker', marker);

        this.emit(AdeliomMapEvents.markers.clicked, data);
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

    async _handleConsent() {
        if ((this.options[keys.rgpd.askForConsent as keyof AdeliomMapOptionsType] && !this.hasConsent)) {
            this.helpers.consentScreen._setConsentScreen();
            return false;
        } else {
            if (!this.options[keys.map.checkSize as keyof AdeliomMapOptionsType] || (this.mapContainer && this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                const provider = this.options[keys.map.provider as keyof AdeliomMapOptionsType];
                if (provider) {
                    if (this.helpers.providers._isProviderAvailable(provider)) {
                        switch (this.options[keys.map.provider as keyof AdeliomMapOptionsType]) {
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
}
