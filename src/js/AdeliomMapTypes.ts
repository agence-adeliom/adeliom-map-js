export type AdeliomMapKeys = {
    apiKey: string,
    map: AdeliomMapKeys_Map,
    list: AdeliomMapKeys_List,
    rgpd: AdeliomMapKeys_Rgpd,
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
    selectedIcon?: string,
    hoveredIcon?: string,
    infoWindowTemplate?: string,
    listEltTemplate?: string,
    listEltId?: any,
}

export type AdeliomMapCoordinatesType = {
    lat: number,
    lng: number,
}

export type AdeliomMapOptionsType = {
    apiKey?: string
    mapSelector?: string,
    mapListSelector?: string,
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
}

export type AdeliomMapMarkerDataType = {
    selected?: boolean,
    icon?: string,
    hoveredIcon?: string,
    selectedIcon?: string,
    marker?: any,
    infoWindow?: any,
    listElt?: any
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