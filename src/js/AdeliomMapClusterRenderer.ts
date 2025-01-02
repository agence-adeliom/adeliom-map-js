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
    const markerImg = document.createElement('img');
    markerImg.src = url;
    markerImg.height = size;
    markerImg.width = size;

    return markerImg;
    // if (clusterIconCentered) {
    //     const config = {
    //         url: url,
    //         scaledSize: new google.maps.Size(size, size),
    //         anchor: new google.maps.Point(size / 2, size / 2),
    //     }
// 
    //     return config;
    // } else {
    //     const config = {
    //         url: url,
    //         scaledSize: new google.maps.Size(size, size),
    //     }
// 
    //     return config;
    // }
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

export const clusterBgClass = 'bg';

export const generateElement: Function = (count: number, fontColor: string, iconSize: number = 56, fontSize: number, defaultIconColor: string, background: HTMLImageElement | string | null = null) => {
    const color = count > Math.max(10, count) ? "#ff0000" : "#0000ff";

    const element = document.createElement('div');
    element.textContent = String(count);
    element.style.color = fontColor;
    element.style.height = `${iconSize}px`;
    element.style.width = `${iconSize}px`;
    element.style.fontSize = `${fontSize}px`;
    element.style.display = 'flex';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
    element.style.borderRadius = '50%';
    element.style.position = 'relative';

    element.style.transform = 'translate(-50%, 50%)';
    element.style.top = '50%';
    element.style.left = '50%';

    if (null === background) {
        element.style.backgroundColor = defaultIconColor;
    } else {
        if (typeof background === 'string') {
            const url = background;
            background = document.createElement('img');
            background.src = url;
        }

        background.height = iconSize;
        background.width = iconSize;
        background.style.position = 'absolute';
        background.style.top = '0';
        background.style.left = '0';
        background.style.zIndex = '-1';
        background.classList.add(clusterBgClass);

        element.appendChild(background);
    }

    return element;
}


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
            content: generateElement(count, fontColor, iconSize, fontSize, defaultIconColor, iconData),
        };

        // @ts-ignore
        return new google.maps.marker.AdvancedMarkerElement(options);
    }
}