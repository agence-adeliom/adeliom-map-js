import {Cluster, MarkerClusterer} from "@googlemaps/markerclusterer";
import AdeliomMapFunctions from "./AdeliomMapFunctions";
import {getIconConfig} from "./AdeliomMapClusterRenderer";

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
                const currentLabel = cluster?.marker?.getLabel();
                const markers = cluster?.markers;

                if (currentLabel?.text && markers) {
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

                    currentLabel.text = String(currentCount);

                    cluster.marker.setLabel(currentLabel);
                    cluster.marker.setIcon(this.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount));

                    const clusterParams = this.adeliomMap.helpers.google.clusters._getParamsByCount(currentCount);

                    if (clusterParams?.hoverIcon || clusterParams?.defaultIconHoverColor) {
                        cluster.marker.addListener('mouseover', () => {
                            if (clusterParams?.hoverIcon) {
                                cluster.marker?.setIcon(getIconConfig(clusterParams.hoverIcon, clusterParams.size, this.adeliomMap.options.clusterIconCentered));
                            } else {
                                cluster.marker?.setIcon(this.adeliomMap.helpers.google.clusters._getHoveredIcon(currentCount));
                            }
                        });
                        cluster.marker.addListener('mouseout', () => {
                            cluster.marker?.setIcon(this.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount));
                        });
                    }
                }
            });
        }
    }
}