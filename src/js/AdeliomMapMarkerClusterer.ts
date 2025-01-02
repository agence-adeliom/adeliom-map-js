import {Cluster, MarkerClusterer} from "@googlemaps/markerclusterer";
import AdeliomMapFunctions from "./AdeliomMapFunctions";
import {clusterBgClass, generateElement, getIconConfig} from "./AdeliomMapClusterRenderer";

export default class AdeliomMapMarkerClusterer extends MarkerClusterer {

    protected adeliomMap: AdeliomMapFunctions;

    constructor(data: object, adeliomMap: AdeliomMapFunctions) {
        super(data);

        this.adeliomMap = adeliomMap;
    }

    protected renderClusters() {
        super.renderClusters();

        // Cette méthode a pour objectif de dynamiser le compte
        // des markers dans les clusters en prenant en compte
        // les faux clusters (qui ne peuvent pas être ouverts et
        // sont donc représentés par un seul marker).
        if (Array.isArray(this.clusters)) {
            this.clusters.forEach((cluster: Cluster) => {
                let currentLabel = cluster?.marker?.content?.textContent;
                const markers = cluster?.markers;

                if (currentLabel && markers) {
                    let currentCount = 0;

                    if (Array.isArray(markers)) {
                        markers.forEach((marker) => {
                            const markerRawDatas = this.adeliomMap.helpers.markersData._getDataByProperty('marker', marker);

                            if (markerRawDatas) {
                                if (markerRawDatas?.isFakeCluster) {
                                    if (markerRawDatas?.fakeClusterMarkers && Array.isArray(markerRawDatas?.fakeClusterMarkers)) {
                                        currentCount += markerRawDatas?.fakeClusterMarkers?.length;
                                    } else {
                                        currentCount++;
                                    }
                                } else {
                                    currentCount++;
                                }
                            }
                        });
                    }

                    currentLabel = String(currentCount);
                    const fontColor = this.adeliomMap.helpers.google.clusters._getFontColor(currentCount);
                    const background = this.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount);
                    const iconSize = this.adeliomMap.options.mapClusterIconSize;

                    cluster.marker.content = generateElement(currentCount, fontColor, iconSize, null, null, background)

                    const clusterParams = this.adeliomMap.helpers.google.clusters._getParamsByCount(currentCount);


                    if (clusterParams?.hoverIcon || clusterParams?.defaultIconHoverColor) {
                        cluster.marker.content.addEventListener('mouseover', () => {
                            let icon = null;

                            if (clusterParams?.hoverIcon) {
                                icon = getIconConfig(clusterParams.hoverIcon, clusterParams.size, this.adeliomMap.options.clusterIconCentered);
                            } else {
                                icon = this.adeliomMap.helpers.google.clusters._getHoveredIcon(currentCount);
                            }

                            if (null !== icon) {
                                const currentIcon = cluster.marker.content.querySelector(`.${clusterBgClass}`);

                                if (currentIcon) {
                                    currentIcon.src = icon.src;
                                }
                            }
                        });
                        cluster.marker.content.addEventListener('mouseout', () => {
                            const icon = this.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount);

                            const currentIcon = cluster.marker.content.querySelector(`.${clusterBgClass}`);

                            if (currentIcon) {
                                currentIcon.src = icon.src;
                            }
                        });
                    }
                }
            });
        }
    }
}