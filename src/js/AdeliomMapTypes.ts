export type AdeliomMapKeys = {
    apiKey: string,
    apiOptions: string,
    map: AdeliomMapKeys_Map,
    list: AdeliomMapKeys_List,
    rgpd: AdeliomMapKeys_Rgpd,
    places: AdeliomMapKeys_Places,
}

export type AdeliomMapKeys_Map = {
    selector: string,
    defaultCenter: string,
    autoCenter: string,
    defaultZoom: string,
    provider: string,
    checkSize: string,
    useClusters: string,
    clusterIconUrl: string,
    clusterIconSize: string,
    clusterParams: string,
    markers: string,
    markerIconUrl: string,
    markerHoveredIconUrl: string,
    markerSelectedIconUrl: string,
    markerIconSize: string,
    markerIconCentered: string,
    displayMarkers: string,
    displayInfoWindows: string,
    allowMultipleMarkersSelected: string,
    infoWindowTemplate: string,
    centerMarkerOnClick: string,
    zoomMarkerOnClick: string,
    animation: string,
    showPlaces: string,
    replaceInfoWindowContentWithMarkerData: string,
    customStyles: string,
    controls: AdeliomMapKeys_MapControls,
}

export type AdeliomMapKeys_MapControls = {
    zoomButtons: string,
    streetViewButton: string,
    fullscreenButton: string,
    mapTypeButtons: string,
    displayScale: string,
    rotateControl: string,
}

export type AdeliomMapKeys_List = {
    selector: string,
    eltTemplate: string,
    centerMarkerOnClick: string,
    replaceWithMarkerData: string,
}

export type AdeliomMapKeys_Places = {
    selector: string,
    options: string,
    mapOptions: string,
}

export type AdeliomMapKeys_Rgpd = {
    askForConsent: string,
    defaultConsentValue: string,
    buttonMessage: string,
}

export type AdeliomMapAnimsType = {
    smooth: string,
    default: string,
}

export type AdeliomMapClusterParamsType = {
    from: number,
    defaultIconColor?: string,
    icon?: string,
    size?: number,
}

export type AdeliomMapMarkerParamsType = {
    title?: string,
    description?: string,
    coordinates: AdeliomMapCoordinatesType,
    icon?: string,
    iconSize?: number,
    iconCentered?: boolean,
    selectedIcon?: string,
    hoveredIcon?: string,
    infoWindowTemplate?: string,
    listEltTemplate?: string,
    listEltId?: any,
}

export type AdeliomMapCoordinatesType = {
    lat: number,
    lng: number,
};

export type AdeliomMapApiOptionsType = {
    version?: string,
    client?: string,
    language?: string,
    region?: string,
    libraries?: object,
};

export type AdeliomMapPlacesOptionsType = {
    types?: string[],
    componentRestrictions?: {
        country: string | string[],
    },
    fields?: string[],
};

export type AdeliomMapPlacesMapOptionsType = {
    autoCenterOnPlace?: boolean,
    zoomOnPlace: number,
};

export type AdeliomMapOptionsType = {
    apiKey?: string
    apiOptions?: AdeliomMapApiOptionsType,
    mapSelector?: string,
    mapListSelector?: string,
    placesSelector?: string,
    placesOptions?: AdeliomMapPlacesOptionsType,
    placesMapOptions?: AdeliomMapPlacesMapOptionsType,
    checkMapSize: boolean,
    mapUseClusters: boolean,
    mapClusterIconUrl?: string,
    mapClusterIconSize: number,
    mapClusterParams: AdeliomMapClusterParamsType[],
    mapMarkers: AdeliomMapMarkerParamsType[],
    mapMarkerIconSize?: number,
    mapMarkerIconUrl?: string,
    mapMarkerHoveredIconUrl?: string,
    mapMarkerSelectedIconUrl?: string,
    allowMultipleMarkersSelected?: boolean,
    mapDefaultCenter?: AdeliomMapCoordinatesType,
    mapAutoCenter?: boolean,
    mapDefaultZoom?: number,
    mapProvider?: string,
    mapDisplayMarkers?: boolean,
    mapDisplayInfoWindows?: boolean,
    mapInfoWindowTemplate?: string,
    mapCenterMarkerOnClick?: boolean,
    mapZoomMarkerOnClick?: number,
    mapHideMarkerOnClickOutside?: boolean,
    mapShowPlaces?: boolean,
    mapInfoWindowReplaceWithMarkerData?: boolean,
    mapCustomStyles?: any,
    mapEnableZoomButtons?: boolean,
    mapEnableStreetView?: boolean,
    mapEnableFullscreenButton?: boolean,
    mapEnableTypeButtons?: boolean,
    mapDisplayScale?: boolean,
    mapRotate?: boolean,
    mapAskForConsent?: boolean,
    mapConsentButtonMessage?: string,
    mapConsentDefaultValue?: boolean,
    mapListReplaceWithMarkerData?: boolean,
    mapListCenterMarkerOnClick?: boolean,
    mapListEltTemplate?: string,
    mapAnimation?: string,
    markerIconCentered?: boolean,
    clusterIconCentered?: boolean,
}

export type AdeliomMapMarkerDataType = {
    selected?: boolean,
    icon?: string,
    iconSize?: number,
    iconCentered?: boolean,
    hoveredIcon?: string,
    selectedIcon?: string,
    marker?: any,
    infoWindow?: any,
    listElt?: any,
    rawData?: AdeliomMapMarkerParamsType,
}

export type AdeliomMapMarkerConfigType = {
    position?: any,
    title?: any,
    map?: any,
    icon?: any
}

export type AdeliomMapErrorsType = {
    apiKey: any,
    selectors: any,
}

export type AdeliomMapGoogleType = {
    maps: any,
}