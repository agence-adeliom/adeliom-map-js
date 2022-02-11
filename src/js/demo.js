import AdeliomMap from "./AdeliomMap";
import {env} from "../../env";

document.addEventListener("DOMContentLoaded", () => {
    new AdeliomMap({
        apiKey: env.apiKey,
        mapSelector: '[js-map]',
        checkMapSize: false,
        mapDefaultCenter: {
            lat: 48.614782,
            lng: 7.714012
        },
        mapDefaultZoom: 12,
        mapProvider: 'google',
        mapMarkers: [
            {
                title: 'Agence Adeliom',
                coordinates: {
                    lat: 48.614782,
                    lng: 7.714012,
                }
            },
            {
                title: 'Cathédrale de Strasbourg',
                coordinates: {
                    lat: 48.581825,
                    lng: 7.75093,
                }
            }
        ],
        mapDisplayMarkers: true,
    });
});