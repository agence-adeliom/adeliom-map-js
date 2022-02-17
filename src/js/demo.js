import AdeliomMap from "./AdeliomMap";
import {env} from "../../env";

const mapListEltTemplate = '<div style="cursor: pointer;">' +
    '<div>' +
    '{{ title }}' +
    '</div>' +
    '<div>' +
    '{{ description }}' +
    '</div>' +
    '</div>';

document.addEventListener("DOMContentLoaded", () => {
    new AdeliomMap({
        apiKey: env.apiKey,
        mapSelector: '[js-map]',
        mapListSelector: '[js-map-list]',
        mapAllowMultipleInfoWindow: false,
        mapInfoWindowTemplate: mapListEltTemplate,
        mapListEltTemplate: mapListEltTemplate,
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
                description: 'Test de description',
                coordinates: {
                    lat: 48.614782,
                    lng: 7.714012,
                }
            },
            {
                title: 'Cathédrale de Strasbourg',
                description: 'Second test de description',
                coordinates: {
                    lat: 48.581825,
                    lng: 7.75093,
                }
            }
        ],
        mapDisplayMarkers: true,
    });
});