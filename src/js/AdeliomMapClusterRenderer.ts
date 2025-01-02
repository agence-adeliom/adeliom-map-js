import {DefaultRenderer} from "@googlemaps/markerclusterer";
import {
    AdeliomMapClusterParams,
    AdeliomMapOptionsType,
} from "./AdeliomMapTypes";
import AdeliomMapFunctions from "./AdeliomMapFunctions";

type renderParams = {
    count: number,
    position: any,
}

export const getSvg: Function = (color: string) => {
    return window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
}

export const getDefaultIconData: Function = (svg: string) => {
    return `data:image/svg+xml;base64,${svg}`
}

export const getDefaultIconConfig: Function = (color: string, size: number) => {
    return getIconConfig(getDefaultIconData(getSvg(color)), size);
}

export const getIconConfig: Function = (url: string, size: number, clusterIconCentered: boolean) => {
    if (clusterIconCentered) {
        const config = {
            url: url,
            scaledSize: new google.maps.Size(size, size),
            anchor: new google.maps.Point(size / 2, size / 2),
        }

        return config;
    } else {
        const config = {
            url: url,
            scaledSize: new google.maps.Size(size, size),
        }

        return config;
    }
}

/**
 * Returns the corresponding params object from a count value
 * @param count
 * @returns {null}
 */
export const getParamsByCount: Function = (count: any, params: any) => {
    let currentParams: AdeliomMapClusterParams;

    for (let i in params) {
        const paramArray = params[i];

        if (paramArray?.from <= count) {
            currentParams = paramArray;
        } else {
            break;
        }
    }

    // @ts-ignore
    return currentParams;
};

/**
 * Re-orders all params objects so that it's ordered by "from" value (ASC)
 * @param params
 * @returns {*}
 */
export const orderParamsByFromValue: Function = (params: any) => {
    if (params) {
        params.sort((a: any, b: any) => {
            return a.from > b.from ? 1 : -1;
        });
    }

    return params;
};


export default class AdeliomMapClusterRenderer extends DefaultRenderer {
    private icon: any;
    private params: any;
    private options: AdeliomMapOptionsType;
    private adeliomMap: AdeliomMapFunctions;

    constructor(params: AdeliomMapClusterParams, adeliomMap: AdeliomMapFunctions) {
        super();

        this.icon = null;
        this.params = orderParamsByFromValue(params);
        this.adeliomMap = adeliomMap;
        this.options = this.adeliomMap.options;
    }

    render({count, position}: renderParams, stats: any) {
        let params: AdeliomMapClusterParams = getParamsByCount(count, this.params);

        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        const defaultIconColor = params?.defaultIconColor ?? color;

        const fontColor = params?.fontColor ?? this.adeliomMap.helpers.google.clusters._getFontColor(count);
        const iconSize = params?.size ?? 56;
        const iconData = params?.icon ?? getDefaultIconData(getSvg(defaultIconColor));
        const fontSize = params?.fontSize ?? this.adeliomMap.helpers.google.clusters._getFontSize(count);

        const options = {
            position: position,
            label: {
                text: String(count),
                color: fontColor,
                fontSize: fontSize,
            },
            // @ts-ignore
            zIndex: Number(google.maps.marker.AdvancedMarkerElement.MAX_ZINDEX) + count, icon: undefined
        };

        // @ts-ignore
        return new google.maps.marker.AdvancedMarkerElement.Marker(options);
    }
}