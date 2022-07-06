import {DefaultRenderer} from "@googlemaps/markerclusterer";
import {AdeliomMapOptionsType} from "./AdeliomMapTypes";

type renderParams = {
    count: number,
    position: any,
}

export default class AdeliomMapClusterRenderer extends DefaultRenderer {
    private icon: any;
    private params: any;
    private options: AdeliomMapOptionsType;

    constructor(params = null, options: AdeliomMapOptionsType) {
        super();

        this.icon = null;
        this.params = this.orderParamsByFromValue(params);
        this.options = options;
    }

    getSvg(color: string) {
        return window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
    }

    /**
     * Re-orders all params objects so that it's ordered by "from" value (ASC)
     * @param params
     * @returns {*}
     */
    orderParamsByFromValue(params: any) {
        if (params) {
            params.sort((a: any, b: any) => {
                return a.from > b.from ? 1 : -1;
            });
        }

        return params;
    };

    /**
     * Returns the corresponding params object from a count value
     * @param count
     * @returns {null}
     */
    getParamsByCount(count: any) {
        let currentParams = null;

        for (let i in this.params) {
            const paramArray = this.params[i];

            if (paramArray?.from <= count) {
                currentParams = paramArray;
            } else {
                break;
            }
        }

        return currentParams;
    };

    getDefaultIconData(svg: string) {
        return `data:image/svg+xml;base64,${svg}`
    }

    render({count, position}: renderParams, stats: any) {
        const params: any = this.getParamsByCount(count);

        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        const defaultIconColor = params?.defaultIconColor ?? color;

        const fontColor = params?.fontColor ?? 'rgba(255,255,255,0.9)';
        const iconSize = params?.size ?? 56;
        const iconData = params?.icon ?? this.getDefaultIconData(this.getSvg(defaultIconColor));
        const fontSize = params?.fontSize ?? '12px';

        const options = {
            position: position,
            label: {
                text: String(count),
                color: fontColor,
                fontSize: fontSize,
            },
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count, icon: undefined

        };

        // @ts-ignore
        options.icon = this.getIconConfig(iconData, iconSize);

        const clusterMarker = new google.maps.Marker(options);

        if (params?.hoverIcon || params?.defaultIconHoverColor) {
            clusterMarker.addListener('mouseover', () => {
                if (params?.hoverIcon) {
                    clusterMarker.setIcon(this.getIconConfig(params.hoverIcon, iconSize));
                } else {
                    clusterMarker.setIcon(this.getIconConfig(this.getDefaultIconData(this.getSvg(params.defaultIconHoverColor)), iconSize));
                }
            });
            clusterMarker.addListener('mouseout', () => {
                clusterMarker.setIcon(this.getIconConfig(iconData, iconSize));
            });
        }

        return clusterMarker;
    }

    getIconConfig(url: string, size: number) {
        if (this.options.clusterIconCentered) {
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
}