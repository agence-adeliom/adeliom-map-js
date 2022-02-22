import {DefaultRenderer} from "@googlemaps/markerclusterer";

export default class AdeliomMapClusterRenderer extends DefaultRenderer {
    constructor(icon = null, size = 75) {
        super();

        this.icon = icon;
        this.size = size;
    }

    getSvg(color) {
        return window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
    }

    render({count, position}, stats) {
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        const svg = this.getSvg(color);

        const options = {
            position: position,
            label: {
                text: String(count),
                color: "rgba(255,255,255,0.9)",
                fontSize: "12px",
            },
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        };

        if (this.icon) {
            options.icon = {
                url: `${this.icon}`,
                scaledSize: new google.maps.Size(this.size, this.size),
            }
        } else {
            options.icon = {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(this.size, this.size),
            };
        }

        return new google.maps.Marker(options);
    }
}