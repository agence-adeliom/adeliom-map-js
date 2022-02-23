import {DefaultRenderer} from "@googlemaps/markerclusterer";

export default class AdeliomMapClusterRenderer extends DefaultRenderer {
    constructor(params = null) {
        super();

        this.icon = null;
        this.params = this.orderParamsByFromValue(params);
    }

    getSvg(color) {
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
    orderParamsByFromValue(params) {
        if (params) {
            params.sort((a, b) => {
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
    getParamsByCount(count) {
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

    getDefaultIconData(svg) {
        return `data:image/svg+xml;base64,${svg}`
    }

    render({count, position}, stats) {
        const params = this.getParamsByCount(count);

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
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        };

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

    getIconConfig(url, size) {
        return {
            url: url,
            scaledSize: new google.maps.Size(size, size),
        }
    }
}