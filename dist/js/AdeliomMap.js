/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/@googlemaps/markerclusterer/dist/index.esm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractAlgorithm": () => (/* binding */ AbstractAlgorithm),
/* harmony export */   "AbstractViewportAlgorithm": () => (/* binding */ AbstractViewportAlgorithm),
/* harmony export */   "Cluster": () => (/* binding */ Cluster),
/* harmony export */   "ClusterStats": () => (/* binding */ ClusterStats),
/* harmony export */   "DBScanAlgorithm": () => (/* binding */ DBScanAlgorithm),
/* harmony export */   "DefaultRenderer": () => (/* binding */ DefaultRenderer),
/* harmony export */   "GridAlgorithm": () => (/* binding */ GridAlgorithm),
/* harmony export */   "KmeansAlgorithm": () => (/* binding */ KmeansAlgorithm),
/* harmony export */   "MarkerClusterer": () => (/* binding */ MarkerClusterer),
/* harmony export */   "MarkerClustererEvents": () => (/* binding */ MarkerClustererEvents),
/* harmony export */   "NoopAlgorithm": () => (/* binding */ NoopAlgorithm),
/* harmony export */   "SuperClusterAlgorithm": () => (/* binding */ SuperClusterAlgorithm),
/* harmony export */   "defaultOnClusterClickHandler": () => (/* binding */ defaultOnClusterClickHandler),
/* harmony export */   "distanceBetweenPoints": () => (/* binding */ distanceBetweenPoints),
/* harmony export */   "extendBoundsToPaddedViewport": () => (/* binding */ extendBoundsToPaddedViewport),
/* harmony export */   "extendPixelBounds": () => (/* binding */ extendPixelBounds),
/* harmony export */   "filterMarkersToPaddedViewport": () => (/* binding */ filterMarkersToPaddedViewport),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "pixelBoundsToLatLngBounds": () => (/* binding */ pixelBoundsToLatLngBounds)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_clusters_kmeans__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/clusters-kmeans */ "./node_modules/@turf/clusters-kmeans/dist/es/index.js");
/* harmony import */ var _turf_clusters_dbscan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/clusters-dbscan */ "./node_modules/@turf/clusters-dbscan/dist/es/index.js");
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js");
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fast-deep-equal/es6 */ "./node_modules/fast-deep-equal/es6/index.js");
/* harmony import */ var fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4__);






/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cluster {
    constructor({ markers, position }) {
        this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return undefined;
        }
        return this.markers.reduce((bounds, marker) => {
            return bounds.extend(marker.getPosition());
        }, new google.maps.LatLngBounds(this._position, this._position));
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => m.getVisible())
            .length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            this.marker.setMap(null);
            delete this.marker;
        }
        this.markers.length = 0;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPadding) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPadding);
    return markers.filter((marker) => extendedMapBounds.contains(marker.getPosition()));
};
/**
 * Extends a bounds by a number of pixels in each direction.
 */
const extendBoundsToPaddedViewport = (bounds, projection, pixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, pixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, pixels) => {
    northEast.x += pixels;
    northEast.y -= pixels;
    southWest.x -= pixels;
    southWest.y += pixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(projection.fromDivPixelToLatLng(northEast));
    bounds.extend(projection.fromDivPixelToLatLng(southWest));
    return bounds;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers, map})
     *    }
     * }
     * ```
     */
    noop({ markers }) {
        return noop(markers);
    }
}
/**
 * Abstract viewport algorithm proves a class to filter markers by a padded
 * viewport. This is a common optimization.
 *
 * @hidden
 */
class AbstractViewportAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
        super(options);
        this.viewportPadding = 60;
        this.viewportPadding = viewportPadding;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                    map,
                    mapCanvasProjection,
                }),
                changed: false,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
}
/**
 * @hidden
 */
const noop = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: marker.getPosition(),
        markers: [marker],
    }));
    return clusters;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default Grid algorithm historically used in Google Maps marker
 * clustering.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 */
class GridAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
        super(options);
        this.clusters = [];
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
    }
    cluster({ markers, map, mapCanvasProjection, }) {
        this.clusters = [];
        markers.forEach((marker) => {
            this.addToClosestCluster(marker, map, mapCanvasProjection);
        });
        return this.clusters;
    }
    addToClosestCluster(marker, map, projection) {
        let maxDistance = this.maxDistance; // Some large number
        let cluster = null;
        for (let i = 0; i < this.clusters.length; i++) {
            const candidate = this.clusters[i];
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), marker.getPosition().toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(marker.getPosition())) {
            cluster.push(marker);
        }
        else {
            const cluster = new Cluster({ markers: [marker] });
            this.clusters.push(cluster);
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
 */
class NoopAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var options = __rest(_a, []);
        super(options);
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        return {
            clusters: this.cluster({ markers, map, mapCanvasProjection }),
            changed: false,
        };
    }
    cluster(input) {
        return this.noop(input);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Experimental algorithm using Kmeans.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-kmeans
 */
class KmeansAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { numberOfClusters } = _a, options = __rest(_a, ["numberOfClusters"]);
        super(options);
        this.numberOfClusters = numberOfClusters;
    }
    cluster({ markers, map }) {
        const clusters = [];
        if (markers.length === 0) {
            return clusters;
        }
        const points = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(markers.map((marker) => {
            return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)([marker.getPosition().lng(), marker.getPosition().lat()]);
        }));
        let numberOfClusters;
        if (this.numberOfClusters instanceof Function) {
            numberOfClusters = this.numberOfClusters(markers.length, map.getZoom());
        }
        else {
            numberOfClusters = this.numberOfClusters;
        }
        (0,_turf_clusters_kmeans__WEBPACK_IMPORTED_MODULE_1__["default"])(points, { numberOfClusters }).features.forEach((point, i) => {
            if (!clusters[point.properties.cluster]) {
                clusters[point.properties.cluster] = new Cluster({
                    position: {
                        lng: point.properties.centroid[0],
                        lat: point.properties.centroid[1],
                    },
                    markers: [],
                });
            }
            clusters[point.properties.cluster].push(markers[i]);
        });
        return clusters;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_INTERNAL_DBSCAN_OPTION = {
    units: "kilometers",
    mutate: false,
    minPoints: 1,
};
/**
 *
 * **This algorithm is not yet ready for use!**
 *
 * Experimental algorithm using DBScan.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-dbscan
 */
class DBScanAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 200, minPoints = DEFAULT_INTERNAL_DBSCAN_OPTION.minPoints } = _a, options = __rest(_a, ["maxDistance", "minPoints"]);
        super(options);
        this.maxDistance = maxDistance;
        this.options = Object.assign(Object.assign({}, DEFAULT_INTERNAL_DBSCAN_OPTION), { minPoints });
    }
    cluster({ markers, mapCanvasProjection, }) {
        const points = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(markers.map((marker) => {
            const projectedPoint = mapCanvasProjection.fromLatLngToContainerPixel(marker.getPosition());
            return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)([projectedPoint.x, projectedPoint.y]);
        }));
        const grouped = [];
        (0,_turf_clusters_dbscan__WEBPACK_IMPORTED_MODULE_2__["default"])(points, this.maxDistance, this.options).features.forEach((point, i) => {
            if (!grouped[point.properties.cluster]) {
                grouped[point.properties.cluster] = [];
            }
            grouped[point.properties.cluster].push(markers[i]);
        });
        return grouped.map((markers) => new Cluster({ markers }));
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.superCluster = new supercluster__WEBPACK_IMPORTED_MODULE_3__["default"](Object.assign({ maxZoom: this.maxZoom, radius }, options));
        this.state = { zoom: null };
    }
    calculate(input) {
        let changed = false;
        if (!fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default()(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            marker.getPosition().lng(),
                            marker.getPosition().lat(),
                        ],
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        const state = { zoom: input.map.getZoom() };
        if (!changed) {
            if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
            else {
                changed = changed || !fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_4___default()(this.state, state);
            }
        }
        this.state = state;
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        return this.superCluster
            .getClusters([-180, -90, 180, 90], Math.round(map.getZoom()))
            .map(this.transformCluster.bind(this));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: new google.maps.LatLng({ lat, lng }),
            });
        }
        else {
            const marker = properties.marker;
            return new Cluster({
                markers: [marker],
                position: marker.getPosition(),
            });
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg url with fill color
        const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
        // create marker using svg icon
        return new google.maps.Marker({
            position,
            icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(45, 45),
            },
            label: {
                text: String(count),
                color: "rgba(255,255,255,0.9)",
                fontSize: "12px",
            },
            title: `Cluster of ${count} markers`,
            // adjust zIndex to be above other markers
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && this.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // allow algorithms to return flag on whether the clusters/markers have changed
            if (changed || changed == undefined) {
                // reset visibility of markers and clusters
                this.reset();
                // store new clusters
                this.clusters = clusters;
                this.renderClusters();
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => marker.setMap(null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // generate stats to pass to renderers
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                cluster.marker = this.renderer.render(cluster, stats);
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            cluster.marker.setMap(map);
        });
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./src/js/AdeliomMap.ts":
/*!******************************!*\
  !*** ./src/js/AdeliomMap.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdeliomMapEvents": () => (/* binding */ AdeliomMapEvents),
/* harmony export */   "default": () => (/* binding */ AdeliomMap)
/* harmony export */ });
/* harmony import */ var _AdeliomMapFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdeliomMapFunctions */ "./src/js/AdeliomMapFunctions.ts");
/* harmony import */ var _optionKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optionKeys */ "./src/js/optionKeys.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "./src/js/errors.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}



var AdeliomMapEvents = {
  map: {
    hasAutoCentered: 'mapHasAutoCentered',
    mapLoaded: 'mapLoaded',
    reset: 'mapReset',
    clear: 'mapCleared',
    typeChanged: 'mapTypeChanged',
    consentNotGiven: 'mapConsentNotGiven',
    consentGiven: 'mapConsentGiven',
    customMinusZoom: 'mapCustomMinusZoom',
    customPlusZoom: 'mapCustomPlusZoom',
    customZoom: 'mapCustomZoom',
    hasBeenDragged: 'mapHasBeenDragged'
  },
  places: {
    selectedPlaceHasBeenCentered: 'selectedPlaceHasBeenCentered',
    selectedPlaceHasBeenFound: 'selectedPlaceHasBeenFound',
    fieldHasBeenFocused: 'fieldHasBeenFocused',
    fieldHasBeenBlurred: 'fieldHasBeenBlurred'
  },
  geolocation: {
    success: 'geolocationSuccess',
    error: 'geolocationError',
    centered: 'geolocationCentered'
  },
  clusters: {
    enabled: 'clustersEnabled',
    disabled: 'clustersDisabled'
  },
  markers: {
    allCreated: 'allMarkerCreated',
    created: 'markerCreated',
    dataCreated: 'markerDataCreated',
    clicked: 'markerClicked',
    geolocationClicked: 'markerGeolocationClicked',
    geolocationRemoved: 'markerGeolocationRemoved',
    allUnselected: 'allMarkerUnselected',
    allFit: 'allMarkersFit'
  },
  infoWindows: {
    created: 'infoWindowCreated'
  },
  listElements: {
    created: 'listEltCreated',
    clicked: 'listEltClicked'
  },
  rgpd: {
    consentButtonClicked: 'consentButtonClicked',
    acceptAllClicked: 'acceptAllClicked',
    rejectAllClicked: 'rejectAllClicked',
    saveChoicesClicked: 'saveChoicesClicked'
  }
};
var AdeliomMap = /*#__PURE__*/function (_AdeliomMapFunctions) {
  _inherits(AdeliomMap, _AdeliomMapFunctions);
  var _super = _createSuper(AdeliomMap);
  function AdeliomMap(options) {
    var _this;
    _classCallCheck(this, AdeliomMap);
    var _a, _b;
    _this = _super.call(this);
    _this.options = Object.assign(_this.defaultOptions, options);
    _this.usePiwik = Boolean(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.usePiwik]);
    _this.hasConsent = Boolean(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.defaultConsentValue]);
    var mapSelector = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.selector];
    var mapListSelector = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].list.selector];
    var placesSelector = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].places.selector];
    var geolocationSelector = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].geolocation.selector];
    if (mapSelector && typeof mapSelector === 'string') {
      _this.mapContainer = document.querySelector(mapSelector);
    }
    _this.helpers.map._commonInit();
    _this.mapListEltTemplate = null;
    if (mapListSelector && typeof mapListSelector === 'string') {
      _this.mapListContainer = document.querySelector(mapListSelector);
      _this.helpers.listNodes._commonInit();
      var eltTemplate = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].list.eltTemplate];
      if (eltTemplate) {
        _this.mapListEltTemplate = eltTemplate;
      }
    }
    if (placesSelector && typeof placesSelector === 'string') {
      _this.placesInput = document.querySelector(placesSelector);
      _this.helpers.places._commonInit();
    }
    if (geolocationSelector && typeof geolocationSelector === 'string') {
      _this.geolocationButton = document.querySelector(geolocationSelector);
      _this.helpers.geolocation._commonInit();
    }
    _this._handlePiwikEvents();
    // @ts-ignore
    _this.markers = (_a = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markers]) !== null && _a !== void 0 ? _a : [];
    _this.displayMarkers = (_b = Boolean(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.displayMarkers])) !== null && _b !== void 0 ? _b : false;
    if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].apiKey]) {
      _this.helpers.map._setMap();
    } else {
      console.error(_errors__WEBPACK_IMPORTED_MODULE_2__["default"].apiKey.notProvided);
    }
    return _this;
  }
  _createClass(AdeliomMap, [{
    key: "_setConsent",
    value:
    /**
     * Dynamically sets the consent value to display consent screen or map depending on passed value
     * @param consent
     * @public
     */
    function _setConsent(consent) {
      this.helpers.consentScreen._setConsentScreen(consent);
    }
  }, {
    key: "_addMarkers",
    value: function _addMarkers(markersRawData) {
      this.helpers.markers._addMarkers(markersRawData);
    }
  }, {
    key: "_addPolylines",
    value: function _addPolylines(polylineRawData) {
      this.helpers.polylines._addPolylines(polylineRawData);
    }
  }, {
    key: "_removeMarkers",
    value: function _removeMarkers(markers) {
      this.helpers.markers._removeMarkers(markers);
    }
  }, {
    key: "_getMarkersData",
    value: function _getMarkersData() {
      return this.helpers.markers._getMarkersData();
    }
  }, {
    key: "_getAllCurrentMarkersRawData",
    value: function _getAllCurrentMarkersRawData() {
      return this.helpers.markersData._getAllMarkersRawData();
    }
  }, {
    key: "_disableClusters",
    value: function _disableClusters() {
      return this.helpers.markers._disableClusters();
    }
  }, {
    key: "_enableClusters",
    value: function _enableClusters() {
      return this.helpers.markers._enableClusters();
    }
  }, {
    key: "_geolocateOnMap",
    value: function _geolocateOnMap() {
      var withZoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var displayMarker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.helpers.geolocation._handleGeolocationRequest(false, withZoom, displayMarker);
    }
  }, {
    key: "_removeGeolocationMarker",
    value: function _removeGeolocationMarker() {
      this.helpers.geolocation._removeGeolocationMarker();
    }
  }, {
    key: "_clearMap",
    value: function _clearMap() {
      this.helpers.map._clearMap();
    }
  }, {
    key: "_resetMap",
    value: function _resetMap() {
      this.helpers.map._resetMap();
    }
  }, {
    key: "_setZoom",
    value: function _setZoom(zoom) {
      if (zoom) {
        this.helpers.map._setZoom(zoom);
      }
    }
  }, {
    key: "_setCenter",
    value: function _setCenter(coordinates) {
      if (coordinates) {
        this.helpers.map._setCenter(coordinates);
      }
    }
  }, {
    key: "_setMapType",
    value: function _setMapType(type) {
      this.helpers.map._setMapType(type);
    }
  }, {
    key: "_zoomMinus",
    value: function _zoomMinus() {
      this.helpers.map._handleMinusZoom();
    }
  }, {
    key: "_zoomPlus",
    value: function _zoomPlus() {
      this.helpers.map._handlePlusZoom();
    }
  }, {
    key: "_unselectAllMarkers",
    value: function _unselectAllMarkers() {
      this.helpers.markers._unselectAllMarkers();
    }
  }, {
    key: "_setStyle",
    value: function _setStyle(styles) {
      this.helpers.map._setMapStyle(styles);
    }
  }, {
    key: "_fitAllMarkers",
    value: function _fitAllMarkers() {
      var markersRawData = [];
      this.helpers.markers._getMarkersData().forEach(function (marker) {
        if (marker === null || marker === void 0 ? void 0 : marker.rawData) {
          markersRawData.push(marker.rawData);
        }
      });
      this.helpers.markers._autoZoomToFitAllMarkers(markersRawData);
    }
  }]);
  return AdeliomMap;
}(_AdeliomMapFunctions__WEBPACK_IMPORTED_MODULE_0__["default"]);

;

/***/ }),

/***/ "./src/js/AdeliomMapClusterRenderer.ts":
/*!*********************************************!*\
  !*** ./src/js/AdeliomMapClusterRenderer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdeliomMapClusterRenderer),
/* harmony export */   "getDefaultIconConfig": () => (/* binding */ getDefaultIconConfig),
/* harmony export */   "getDefaultIconData": () => (/* binding */ getDefaultIconData),
/* harmony export */   "getIconConfig": () => (/* binding */ getIconConfig),
/* harmony export */   "getParamsByCount": () => (/* binding */ getParamsByCount),
/* harmony export */   "getSvg": () => (/* binding */ getSvg),
/* harmony export */   "orderParamsByFromValue": () => (/* binding */ orderParamsByFromValue)
/* harmony export */ });
/* harmony import */ var _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/markerclusterer */ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var getSvg = function getSvg(color) {
  return window.btoa("\n  <svg fill=\"".concat(color, "\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\">\n    <circle cx=\"120\" cy=\"120\" opacity=\".6\" r=\"70\" />\n    <circle cx=\"120\" cy=\"120\" opacity=\".3\" r=\"90\" />\n    <circle cx=\"120\" cy=\"120\" opacity=\".2\" r=\"110\" />\n  </svg>"));
};
var getDefaultIconData = function getDefaultIconData(svg) {
  return "data:image/svg+xml;base64,".concat(svg);
};
var getDefaultIconConfig = function getDefaultIconConfig(color, size) {
  return getIconConfig(getDefaultIconData(getSvg(color)), size);
};
var getIconConfig = function getIconConfig(url, size, clusterIconCentered) {
  if (clusterIconCentered) {
    var config = {
      url: url,
      scaledSize: new google.maps.Size(size, size),
      anchor: new google.maps.Point(size / 2, size / 2)
    };
    return config;
  } else {
    var _config = {
      url: url,
      scaledSize: new google.maps.Size(size, size)
    };
    return _config;
  }
};
/**
 * Returns the corresponding params object from a count value
 * @param count
 * @returns {null}
 */
var getParamsByCount = function getParamsByCount(count, params) {
  var currentParams;
  for (var i in params) {
    var paramArray = params[i];
    if ((paramArray === null || paramArray === void 0 ? void 0 : paramArray.from) <= count) {
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
var orderParamsByFromValue = function orderParamsByFromValue(params) {
  if (params) {
    params.sort(function (a, b) {
      return a.from > b.from ? 1 : -1;
    });
  }
  return params;
};
var AdeliomMapClusterRenderer = /*#__PURE__*/function (_DefaultRenderer) {
  _inherits(AdeliomMapClusterRenderer, _DefaultRenderer);
  var _super = _createSuper(AdeliomMapClusterRenderer);
  function AdeliomMapClusterRenderer(params, adeliomMap) {
    var _this;
    _classCallCheck(this, AdeliomMapClusterRenderer);
    _this = _super.call(this);
    _this.icon = null;
    _this.params = orderParamsByFromValue(params);
    _this.adeliomMap = adeliomMap;
    _this.options = _this.adeliomMap.options;
    return _this;
  }
  _createClass(AdeliomMapClusterRenderer, [{
    key: "render",
    value: function render(_ref, stats) {
      var count = _ref.count,
        position = _ref.position;
      var _a, _b, _c, _d, _e;
      var params = getParamsByCount(count, this.params);
      var color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
      var defaultIconColor = (_a = params === null || params === void 0 ? void 0 : params.defaultIconColor) !== null && _a !== void 0 ? _a : color;
      var fontColor = (_b = params === null || params === void 0 ? void 0 : params.fontColor) !== null && _b !== void 0 ? _b : this.adeliomMap.helpers.google.clusters._getFontColor(count);
      var iconSize = (_c = params === null || params === void 0 ? void 0 : params.size) !== null && _c !== void 0 ? _c : 56;
      var iconData = (_d = params === null || params === void 0 ? void 0 : params.icon) !== null && _d !== void 0 ? _d : getDefaultIconData(getSvg(defaultIconColor));
      var fontSize = (_e = params === null || params === void 0 ? void 0 : params.fontSize) !== null && _e !== void 0 ? _e : this.adeliomMap.helpers.google.clusters._getFontSize(count);
      var options = {
        position: position,
        label: {
          text: String(count),
          color: fontColor,
          fontSize: fontSize
        },
        // @ts-ignore
        zIndex: Number(google.maps.marker.AdvancedMarkerElement.MAX_ZINDEX) + count,
        icon: undefined
      };
      // @ts-ignore
      return new google.maps.marker.AdvancedMarkerElement.Marker(options);
    }
  }]);
  return AdeliomMapClusterRenderer;
}(_googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_0__.DefaultRenderer);


/***/ }),

/***/ "./src/js/AdeliomMapFunctions.ts":
/*!***************************************!*\
  !*** ./src/js/AdeliomMapFunctions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdeliomMapFunctions)
/* harmony export */ });
/* harmony import */ var _Emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Emitter */ "./src/js/Emitter.js");
/* harmony import */ var _optionKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optionKeys */ "./src/js/optionKeys.ts");
/* harmony import */ var _defaultOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultOptions */ "./src/js/defaultOptions.ts");
/* harmony import */ var _AdeliomMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdeliomMap */ "./src/js/AdeliomMap.ts");
/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! google-maps */ "./node_modules/google-maps/lib/esm/loader.js");
/* harmony import */ var _AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdeliomMapClusterRenderer */ "./src/js/AdeliomMapClusterRenderer.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors */ "./src/js/errors.ts");
/* harmony import */ var _AdeliomMapMarkerClusterer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AdeliomMapMarkerClusterer */ "./src/js/AdeliomMapMarkerClusterer.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
// @ts-ignore








var mapAttribute = 'adeliom-map';
var listAttribute = "".concat(mapAttribute, "-list");
var consentScreenContainerAttribute = "".concat(mapAttribute, "-consent-screen");
var consentButtonAttribute = "".concat(mapAttribute, "-consent-button");
var openedMarkerListEltAttribute = "".concat(listAttribute, "-elt-opened");
var notConsentMapAttribute = "".concat(mapAttribute, "-no-consent");
var notConsentListAttribute = "".concat(listAttribute, "-no-consent");
var availableProviders = ['google'];
var AdeliomMapFunctions = /*#__PURE__*/function (_Emitter) {
  _inherits(AdeliomMapFunctions, _Emitter);
  var _super = _createSuper(AdeliomMapFunctions);
  function AdeliomMapFunctions() {
    var _thisSuper, _thisSuper2, _this;
    _classCallCheck(this, AdeliomMapFunctions);
    _this = _super.call(this);
    _this.clusters = [];
    _this.google = null;
    _this.options = _defaultOptions__WEBPACK_IMPORTED_MODULE_2__["default"];
    _this.hasConsent = false;
    _this.markerIconCentered = false;
    _this.clusterIconCentered = false;
    _this.mapCustomClass = 'adeliom-map-js';
    _this.usePiwik = false;
    _this.ppms = null;
    _this.piwikAcceptAllBtn = null;
    _this.piwikRejectAllBtn = null;
    _this.piwikSaveChoicesBtn = null;
    _this.helpers = {
      providers: {
        /**
         * Returns whether the provided provider is part of the available providers array
         * @param provider
         * @returns {boolean}
         * @private
         */
        _isProviderAvailable: function _isProviderAvailable(provider) {
          return availableProviders.findIndex(function (prov) {
            return prov === provider;
          }) !== -1;
        },
        /**
         * Returns the currently used provider
         */
        _getProvider: function _getProvider() {
          return _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider];
        }
      },
      infoWindows: {
        /**
         * Returns whether an info window is currently opened
         * @param infoWindow
         * @returns {boolean}
         * @private
         */
        _isInfoWindowOpened: function _isInfoWindowOpened(infoWindow) {
          return infoWindow.getMap() ? true : false;
        },
        /**
         * Generic method to retrieve some data by specifying an infoWindow
         * @param data
         * @param infoWindow
         * @returns {*}
         * @private
         */
        _returnDataByInfoWindow: function _returnDataByInfoWindow(data, infoWindow) {
          // @ts-ignore
          return _this.helpers.markersData._getDataByProperty('infoWindow', infoWindow)[data];
        },
        /**
         * Returns an existing infoWindow instance by providing a marker
         * @param marker
         * @returns {null}
         * @private
         */
        _getInfoWindowByMarker: function _getInfoWindowByMarker(marker) {
          return _this.helpers.markersData._returnDataByMarker('infoWindow', marker);
        },
        /**
         * Opens the provided infoWindow
         * @param infoWindow
         * @private
         */
        _openInfoWindow: function _openInfoWindow(infoWindow) {
          if (_this.helpers.infoWindows._isInfoWindowOpened(infoWindow)) {
            infoWindow.close();
          } else {
            if (!_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.allowMultipleMarkersSelected]) {
              _this.helpers.markers._unselectAllMarkers();
            }
            var marker = _this.helpers.markers._getMarkerByInfoWindow(infoWindow);
            if (marker) {
              infoWindow.open(_this.map, marker);
              if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.centerMarkerOnClick]) {
                _this.helpers.map._centerMapOnMarker(marker);
              }
            }
          }
        },
        /**
         * Opens an infoWindow by its associated marker
         * @param marker
         * @private
         */
        _openInfoWindowByMarker: function _openInfoWindowByMarker(marker) {
          var infoWindow = _this.helpers.infoWindows._getInfoWindowByMarker(marker);
          if (infoWindow) {
            _this.helpers.infoWindows._openInfoWindow(infoWindow);
          }
        },
        /**
         * Closes an infoWindow by specifying its associated marker
         * @param marker
         * @private
         */
        _closeInfoWindowByMarker: function _closeInfoWindowByMarker(marker) {
          var infoWindow = _this.helpers.infoWindows._getInfoWindowByMarker(marker);
          if (infoWindow) {
            infoWindow.close();
          }
        },
        _closeAllInfoWindows: function _closeAllInfoWindows() {
          _this.helpers.infoWindows._getAllInfoWindows().forEach(function (infoWindow) {
            infoWindow.close();
          });
        },
        /**
         * Returns all the infoWindows instances
         */
        _getAllInfoWindows: function _getAllInfoWindows() {
          var infoWindows = [];
          _this.helpers.markers._getAllMarkerInstances().forEach(function (marker) {
            var infoWindow = _this.helpers.infoWindows._getInfoWindowByMarker(marker);
            if (infoWindow) {
              infoWindows.push(infoWindow);
            }
          });
          return infoWindows;
        }
      },
      markers: {
        /**
         * Get the center of all provided markers
         * @param markersRawData
         * @returns {{lng: number, lat: number}|*}
         * @private
         */
        _getMarkersCenterCoordinates: function _getMarkersCenterCoordinates(markersRawData) {
          if (markersRawData.length === 1) {
            return markersRawData[0].coordinates;
          }
          var x = 0.0;
          var y = 0.0;
          var z = 0.0;
          var _iterator = _createForOfIteratorHelper(markersRawData),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var markerRawData = _step.value;
              var latitude = markerRawData.coordinates.lat * Math.PI / 180;
              var longitude = markerRawData.coordinates.lng * Math.PI / 180;
              x += Math.cos(latitude) * Math.cos(longitude);
              y += Math.cos(latitude) * Math.sin(longitude);
              z += Math.sin(latitude);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var total = markersRawData.length;
          x = x / total;
          y = y / total;
          z = z / total;
          var centralLongitude = Math.atan2(y, x);
          var centralSquareRoot = Math.sqrt(x * x + y * y);
          var centralLatitude = Math.atan2(z, centralSquareRoot);
          return {
            lat: centralLatitude * 180 / Math.PI,
            lng: centralLongitude * 180 / Math.PI
          };
        },
        _autoZoomToFitAllMarkers: function _autoZoomToFitAllMarkers(markersRawData) {
          _this.helpers.google;
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              _this.helpers.google.markers._autoZoomToFitAllMarkers(markersRawData);
              break;
            default:
              break;
          }
        },
        /**
         * Init markers by its map provider (google, ...)
         * @private
         */
        _initMarkers: function _initMarkers(markers) {
          var firstInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
            case 'google':
              _this.helpers.google.markers._initMapMarkers(markers, firstInit).then(function () {
                _this.helpers.map._autoCenter(markers);
              });
              break;
            default:
              break;
          }
        },
        /**
         * Returns whether a marker is selected or not
         * @param marker
         * @returns {bool}
         * @private
         */
        _isMarkerSelected: function _isMarkerSelected(marker) {
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          return data === null || data === void 0 ? void 0 : data.selected;
        },
        /**
         * Returns an existing marker node by providing a listEltNode
         * @param marker
         * @returns {null}
         * @private
         */
        _getMarkerByListEltNode: function _getMarkerByListEltNode(listEltNode) {
          return _this.helpers.listNodes._returnDataByListEltNode('marker', listEltNode);
        },
        /**
         * Returns all the markers data
         */
        _getMarkersData: function _getMarkersData() {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              return _this.markersData;
            default:
              break;
          }
          return [];
        },
        /**
         * Un-select all markers and close all infoWindows
         * @private
         */
        _unselectAllMarkers: function _unselectAllMarkers() {
          _this.markersData.forEach(function (markerData) {
            if ((markerData === null || markerData === void 0 ? void 0 : markerData.marker) && (markerData === null || markerData === void 0 ? void 0 : markerData.selected)) {
              _this.helpers.markers._setMarkerState(markerData.marker, false);
            }
            if (markerData === null || markerData === void 0 ? void 0 : markerData.infoWindow) {
              if (_this.helpers.infoWindows._isInfoWindowOpened(markerData.infoWindow)) {
                markerData.infoWindow.close();
              }
            }
          });
          _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.allUnselected);
        },
        /**
         * Returns the lat/lng object of the provided marker
         * @param marker
         * @returns {{lng: *, lat: *}}
         * @private
         */
        _getMarkerCoordinates: function _getMarkerCoordinates(marker) {
          return {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng()
          };
        },
        /**
         * Returns an existing marker instance by providing an infoWindow
         * @param marker
         * @returns {null}
         * @private
         */
        _getMarkerByInfoWindow: function _getMarkerByInfoWindow(infoWindow) {
          return _this.helpers.infoWindows._returnDataByInfoWindow('marker', infoWindow);
        },
        /**
         * Sets the provided marker as selected (depending on provided second value)
         * @param marker
         * @param isSelected
         * @private
         */
        _setMarkerState: function _setMarkerState(marker) {
          var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var markerData = _this.helpers.markersData._getDataByProperty('marker', marker);
          if (isSelected == 'toggle') {
            isSelected = !markerData.selected;
          }
          if (isSelected === null) {
            isSelected = true;
          }
          if (isSelected === true) {
            _this.helpers.markers._openMarker(marker);
          } else if (isSelected === false) {
            _this.helpers.markers._closeMarker(marker);
          }
          if (markerData.hasInteraction) {
            _this.helpers.markersData._setDataByProperty('marker', marker, 'selected', isSelected);
            if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
              if (!isSelected) {
                switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
                  case 'google':
                    if (!markerData.isFakeCluster) {
                      _this.helpers.google.markers._setIdleIcon(marker);
                    }
                    break;
                }
              } else {
                switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
                  case 'google':
                    if (!markerData.isFakeCluster) {
                      _this.helpers.google.markers._setSelectedIcon(marker);
                    }
                    break;
                }
              }
            }
          }
        },
        /**
         * Opens the passed marker
         * @param marker
         * @private
         */
        _openMarker: function _openMarker(marker) {
          if (!_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.allowMultipleMarkersSelected]) {
            _this.helpers.markers._unselectAllMarkers();
          }
          _this.helpers.infoWindows._openInfoWindowByMarker(marker);
          var listNode = _this.helpers.listNodes._getListNodeByMarker(marker);
          if (listNode) {
            listNode.setAttribute(openedMarkerListEltAttribute, '');
          }
        },
        /**
         * Closes the passed marker
         * @param marker
         * @private
         */
        _closeMarker: function _closeMarker(marker) {
          _this.helpers.infoWindows._closeInfoWindowByMarker(marker);
          var listNode = _this.helpers.listNodes._getListNodeByMarker(marker);
          if (listNode) {
            listNode.removeAttribute(openedMarkerListEltAttribute);
          }
        },
        /**
         * Returns the unselected icon for the provided marker
         * @param marker
         * @returns {null|*}
         * @private
         */
        _getIdleIconForMarker: function _getIdleIconForMarker(marker) {
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          if (data === null || data === void 0 ? void 0 : data.icon) {
            return data.icon;
          } else if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl]) {
            return _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl];
          }
          return null;
        },
        /**
         * Returns the hovered icon for the provided marker
         * @param marker
         * @returns {null|*}
         * @private
         */
        _getHoveredIconForMarker: function _getHoveredIconForMarker(marker) {
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          if (data === null || data === void 0 ? void 0 : data.hoveredIcon) {
            return data.hoveredIcon;
          } else if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerHoveredIconUrl]) {
            return _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerHoveredIconUrl];
          }
          return null;
        },
        /**
         * Returns the selected icon for the provided marker
         * @param marker
         * @returns {null|string|*}
         * @private
         */
        _getSelectedIconForMarker: function _getSelectedIconForMarker(marker) {
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          if (data === null || data === void 0 ? void 0 : data.selectedIcon) {
            return data.selectedIcon;
          } else if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerSelectedIconUrl]) {
            return _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerSelectedIconUrl];
          }
          return null;
        },
        /**
         * Returns the icon size for the provided marker
         * @param marker
         * @private
         */
        _getIconSizeForMarker: function _getIconSizeForMarker(marker) {
          var _a;
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          return (_a = data === null || data === void 0 ? void 0 : data.iconSize) !== null && _a !== void 0 ? _a : _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconSize];
        },
        _getIconCenteredForMarker: function _getIconCenteredForMarker(marker) {
          var data = _this.helpers.markersData._getDataByProperty('marker', marker);
          return data === null || data === void 0 ? void 0 : data.iconCentered;
        },
        /**
         * Returns all map marker instances already created
         * @returns {marker[]}
         * @private
         */
        _getAllMarkerInstances: function _getAllMarkerInstances() {
          return _this.markersData.map(function (data) {
            if (data === null || data === void 0 ? void 0 : data.marker) {
              return data.marker;
            }
          });
        },
        _getClustersStatus: function _getClustersStatus() {
          return _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.useClusters];
        },
        _setClustersStatus: function _setClustersStatus(status) {
          // @ts-ignore
          if (_this.helpers.markers._getClustersStatus() === status) return false;
          // @ts-ignore
          _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.useClusters] = status;
          return true;
        },
        _disableClusters: function _disableClusters() {
          return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _a, currentMarkersData;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (this.helpers.markers._getClustersStatus() && this.map) {
                      if (this.clusterer) {
                        (_a = this.clusterer) === null || _a === void 0 ? void 0 : _a.clearMarkers();
                        this.clusterer = null;
                        this.helpers.markers._setClustersStatus(false);
                        currentMarkersData = this.helpers.markersData._getAllMarkersRawData();
                        this.helpers.google.markers._clearMap();
                        this.helpers.google.markers._addMapMarkers(currentMarkersData, true);
                        this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.clusters.disabled);
                      }
                    }
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        },
        _getClusterableMarkers: function _getClusterableMarkers() {
          var availableMarkers = _this.helpers.markers._getAllMarkerInstances();
          var clusterableMarkers = [];
          availableMarkers.forEach(function (marker) {
            var markerData = _this.helpers.markersData._getDataByProperty('marker', marker);
            if (!(markerData === null || markerData === void 0 ? void 0 : markerData.isGeolocation)) {
              clusterableMarkers.push(marker);
            }
          });
          return clusterableMarkers;
        },
        _enableClusters: function _enableClusters() {
          var firstInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          if (_this.map) {
            if (!firstInit) {
              if (_this.helpers.markers._getClustersStatus()) {
                _this.helpers.markers._disableClusters();
              } else {
                _this.helpers.markers._setClustersStatus(true);
              }
            }
            if (_this.helpers.markers._getClustersStatus()) {
              var clusterableMarkers = _this.helpers.markers._getClusterableMarkers();
              switch (_this.helpers.providers._getProvider()) {
                case 'google':
                  var renderer = _this.helpers.google.clusters._getRenderer();
                  if (renderer) {
                    _this.clusterer = new _AdeliomMapMarkerClusterer__WEBPACK_IMPORTED_MODULE_6__["default"]({
                      markers: clusterableMarkers,
                      map: _this.map,
                      onClusterClick: _this.helpers.google.clusters._handleClusterClick,
                      renderer: renderer
                    }, _assertThisInitialized(_this));
                  }
                  break;
                default:
                  break;
              }
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.clusters.enabled);
            }
          }
        },
        _addMarkers: function _addMarkers(markersRawData) {
          if (markersRawData) {
            switch (_this.helpers.providers._getProvider()) {
              case 'google':
                _this.helpers.google.markers._addMapMarkers(markersRawData);
                break;
              default:
                break;
            }
          }
        },
        _removeMarkers: function _removeMarkers(markers) {
          if (markers) {
            switch (_this.helpers.providers._getProvider()) {
              case 'google':
                _this.helpers.google.markers._removeMapMarkers(markers);
                break;
              default:
                break;
            }
          }
        }
      },
      polylines: {
        _initPolylines: function _initPolylines() {
          var _a;
          switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
            case 'google':
              _this.helpers.google.polylines._initPolylines((_a = _this.options.mapPolylines) !== null && _a !== void 0 ? _a : []).then(function () {});
              break;
            default:
              break;
          }
        },
        _addPolylines: function _addPolylines(polylines) {
          if (!Array.isArray(polylines)) {
            polylines = [polylines];
          }
          switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
            case 'google':
              _this.helpers.google.polylines._initPolylines(polylines !== null && polylines !== void 0 ? polylines : []).then(function () {});
              break;
            default:
              break;
          }
        }
      },
      markersData: {
        /**
         * Get datas from markerData by providing a property name and its value
         * @param propertyName
         * @param property
         * @returns {null}
         * @private
         */
        _getDataByProperty: function _getDataByProperty(propertyName, property) {
          var returnedData = null;
          for (var i = 0; i < Object.keys(_this.markersData).length; i++) {
            // @ts-ignore
            var tempMarker = _this.markersData[Object.keys(_this.markersData)[i]];
            if (tempMarker[propertyName] === property) {
              returnedData = tempMarker;
              break;
            }
          }
          return returnedData;
        },
        /**
         * Set specific data to markerData by providing property name, value, key to change and associated value
         * @param propertyName
         * @param property
         * @param key
         * @param value
         * @private
         */
        _setDataByProperty: function _setDataByProperty(propertyName, property, key, value) {
          for (var i = 0; i < Object.keys(_this.markersData).length; i++) {
            // @ts-ignore
            if (_this.markersData[Object.keys(_this.markersData)[i]][propertyName] === property) {
              // @ts-ignore
              _this.markersData[Object.keys(_this.markersData)[i]][key] = value;
            }
          }
          return;
        },
        /**
         * Generic method to retrieve some data by specifying a marker
         * @param data
         * @param marker
         * @returns {null}
         * @private
         */
        _returnDataByMarker: function _returnDataByMarker(data, marker) {
          // @ts-ignore
          return _this.helpers.markersData._getDataByProperty('marker', marker)[data];
        },
        /**
         * Method that allows to retrieve all existing markers rawData
         */
        _getAllMarkersRawData: function _getAllMarkersRawData() {
          var markersRawData = [];
          _this.helpers.markers._getMarkersData().forEach(function (markerData) {
            var data = markerData.rawData;
            markersRawData.push(markerData.rawData);
          });
          return markersRawData;
        }
      },
      listNodes: {
        /**
         * Generic method to retrieve some data by specifying a listEltNode
         * @param data
         * @param marker
         * @returns {null}
         * @private
         */
        _returnDataByListEltNode: function _returnDataByListEltNode(data, listEltNode) {
          // @ts-ignore
          return _this.helpers.markersData._getDataByProperty('listElt', listEltNode)[data];
        },
        /**
         * Returns a listNode associated to the provided marker
         * @param marker
         * @returns {*}
         * @private
         */
        _getListNodeByMarker: function _getListNodeByMarker(marker) {
          return _this.helpers.markersData._returnDataByMarker('listElt', marker);
        },
        /**
         * Base init of the list
         * @private
         */
        _commonInit: function _commonInit() {
          if (_this.mapListContainer) {
            _this.mapListContainer.setAttribute(listAttribute, '');
          }
        }
      },
      map: {
        /**
         *Removes the consent screen and displays the map
         * @private
         */
        _setMap: function _setMap() {
          if (_this.mapContainer) {
            _this.mapContainer.innerHTML = '';
            _this.mapContainer.removeAttribute(notConsentMapAttribute);
            if (_this.mapListContainer) {
              _this.mapListContainer.innerHTML = '';
              _this.mapListContainer.removeAttribute(notConsentListAttribute);
            }
            _this.helpers.map._handleCustomZoomBtns();
            _this.helpers.map._initMapAndMarkers();
          }
        },
        _initMapAndMarkers: function _initMapAndMarkers() {
          _this._initMap().then(function (isInit) {
            if (isInit && _this.displayMarkers) {
              _this.helpers.markers._initMarkers(_this.markers, true);
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.mapLoaded);
            }
            _this.helpers.polylines._initPolylines();
          });
        },
        _handleCustomZoomBtns: function _handleCustomZoomBtns() {
          var minusBtn = null;
          var plusBtn = null;
          var minus = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.customZoomMinusSelector];
          var plus = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.customZoomPlusSelector];
          if (minus && typeof minus === 'string') {
            minusBtn = document.querySelector(minus);
            if (minusBtn) {
              minusBtn.addEventListener('click', function () {
                _this.helpers.map._handleMinusZoom();
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.customMinusZoom);
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.customZoom);
              });
            }
          }
          if (plus && typeof plus === 'string') {
            plusBtn = document.querySelector(plus);
            if (plusBtn) {
              plusBtn.addEventListener('click', function () {
                _this.helpers.map._handlePlusZoom();
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.customPlusZoom);
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.customZoom);
              });
            }
          }
          if (minusBtn && plusBtn) {} else if (minus || plus) {
            if (!minusBtn) {
              console.error('You must provide a valid selector for the minus button');
            }
            if (!plusBtn) {
              console.error('You must provide a valid selector for the plus button');
            }
          }
        },
        _handleMinusZoom: function _handleMinusZoom() {
          var currentZoomLevel = _this.helpers.map._getCurrentZoomLevel();
          if (currentZoomLevel || currentZoomLevel === 0) {
            _this.helpers.map._setZoom(currentZoomLevel - 1);
          }
        },
        _handlePlusZoom: function _handlePlusZoom() {
          var currentZoomLevel = _this.helpers.map._getCurrentZoomLevel();
          if (currentZoomLevel || currentZoomLevel === 0) {
            _this.helpers.map._setZoom(currentZoomLevel + 1);
          }
        },
        _getCurrentZoomLevel: function _getCurrentZoomLevel() {
          var _a;
          var currentZoom;
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              currentZoom = (_a = _this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
              break;
            default:
              break;
          }
          return currentZoom;
        },
        /**
         * Centers the map on the provided marker
         * @param marker
         * @private
         */
        _centerMapOnMarker: function _centerMapOnMarker(marker) {
          var coordinates = _this.helpers.markers._getMarkerCoordinates(marker);
          var googleMapCoordinates = _this.helpers.google.coordinates._getLatLng(coordinates);
          if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.animation] === _defaultOptions__WEBPACK_IMPORTED_MODULE_2__.mapAnims.smooth) {
            _this.helpers.map._panTo(googleMapCoordinates);
          } else {
            _this.helpers.map._setCenter(googleMapCoordinates);
          }
          if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.zoomMarkerOnClick]) {
            // Only zoom if less zoomed than zoom value
            var zoomMarkerOnClick = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.zoomMarkerOnClick];
            if (_this.map && zoomMarkerOnClick && _this.map.getZoom() < zoomMarkerOnClick) {
              _this.helpers.map._setZoom(parseInt(String(zoomMarkerOnClick)));
            }
          }
        },
        /**
         * Sets the level of zoom on the map
         * @param zoom
         */
        _setZoom: function _setZoom(zoom) {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              if (_this.map) {
                _this.map.setZoom(zoom);
              }
              break;
            default:
              break;
          }
        },
        /**
         * Sets the center of the map
         * @param center
         * @private
         */
        _setCenter: function _setCenter(center) {
          switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
            case 'google':
            default:
              if (_this.map) {
                _this.map.setCenter(center);
              }
              break;
          }
        },
        /**
         * Sets the center of the map (smoothly)
         * @param center
         * @private
         */
        _panTo: function _panTo(center) {
          switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
            case 'google':
            default:
              if (_this.map) {
                _this.map.panTo(center);
              }
              break;
          }
        },
        /**
         * Auto center the map on the markers
         * @param markersRawData
         * @private
         */
        _autoCenter: function _autoCenter(markersRawData) {
          if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.autoCenter]) {
            var center = _this.helpers.markers._getMarkersCenterCoordinates(markersRawData);
            if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.autoZoom]) {
              _this.helpers.markers._autoZoomToFitAllMarkers(markersRawData);
            }
            if (center) {
              switch (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider]) {
                case 'google':
                default:
                  _this.helpers.map._setCenter(_this.helpers.google.coordinates._getLatLng(center));
                  break;
              }
            }
            _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.hasAutoCentered);
          }
        },
        /**
         * Adds classes to the map container
         * @param array classes
         * @private
         */
        _addClassesToMapContainer: function _addClassesToMapContainer(classes) {
          if (_this.mapContainer) {
            for (var singleClass in classes) {
              _this.mapContainer.classList.add(classes[singleClass]);
            }
          }
        },
        /**
         * Removes classes to the map container
         * @param array classes
         * @private
         */
        _removeClassesToMapContainer: function _removeClassesToMapContainer(classes) {
          if (_this.mapContainer) {
            for (var singleClass in classes) {
              if (_this.mapContainer.classList.contains(classes[singleClass])) {
                _this.mapContainer.classList.remove(classes[singleClass]);
              }
            }
          }
        },
        /**
         * Base init of the map
         * @private
         */
        _commonInit: function _commonInit() {
          if (_this.mapContainer) {
            _this.mapContainer.setAttribute(mapAttribute, '');
          }
        },
        /**
         * Empty the map from all markers and clusters
         */
        _clearMap: function _clearMap() {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              _this.helpers.google.markers._clearMap();
              break;
            default:
              break;
          }
          _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.clear);
        },
        /**
         * Resets the map at its current state
         */
        _resetMap: function _resetMap() {
          var previousMarkers = _this.helpers.markersData._getAllMarkersRawData();
          var newMarkers = [];
          var clusterStatus = _this.helpers.markers._getClustersStatus();
          var previousClusterState = Boolean(clusterStatus);
          previousMarkers.forEach(function (marker) {
            if (!(marker === null || marker === void 0 ? void 0 : marker.isGeolocation)) {
              newMarkers.push(marker);
            }
          });
          _this.helpers.map._clearMap();
          _this.helpers.markers._setClustersStatus(previousClusterState);
          setTimeout(function () {
            _this.helpers.markers._initMarkers(newMarkers);
            _this.helpers.polylines._initPolylines();
            var defaultZoom = Number(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.defaultZoom]);
            if (defaultZoom) {
              _this.helpers.map._setZoom(defaultZoom);
            }
            setTimeout(function () {
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.reset);
            }, 10);
          }, 10);
        },
        _setMapType: function _setMapType(type) {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              _this.helpers.google.map._setMapType(type);
              break;
            default:
              break;
          }
          _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.typeChanged, type);
        },
        _setMapStyle: function _setMapStyle(styles) {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              _this.helpers.google.map._setMapStyle(styles);
              break;
            default:
              break;
          }
        }
      },
      consentScreen: {
        /**
         * Removes the displayed map and sets the consent screen
         * @private
         */
        _setConsentScreen: function _setConsentScreen(consent) {
          _this.hasConsent = consent;
          if (consent) {
            _this.helpers.map._setMap();
          } else {
            if (_this.mapContainer) {
              _this.mapContainer.innerHTML = '';
              _this.mapContainer.setAttribute(notConsentMapAttribute, '');
              _this.mapContainer.removeAttribute('style');
              _this.markersData = [];
              if (_this.mapListContainer) {
                _this.mapListContainer.innerHTML = '';
                _this.mapListContainer.setAttribute(notConsentListAttribute, '');
              }
              if (_this.map) {
                _this.map = null;
              }
              var consentScreen = document.createElement('div');
              consentScreen.setAttribute(consentScreenContainerAttribute, '');
              var consentButton = document.createElement('button');
              var consentButtonMessage = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.buttonMessage];
              if (typeof consentButtonMessage === 'string') {
                consentButton.innerText = consentButtonMessage;
              }
              // @ts-ignore
              var consentButtonClass = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.buttonClass];
              // @ts-ignore
              var consentScreenClass = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.consentScreenClass];
              consentButton.setAttribute(consentButtonAttribute, '');
              if (consentButtonClass) {
                consentButtonClass.split(' ').forEach(function (classElt) {
                  consentButton.classList.add(classElt);
                });
              }
              consentButton.addEventListener('click', function () {
                _this._openPiwikConsent();
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.rgpd.consentButtonClicked, _assertThisInitialized(_this));
              });
              consentScreen.appendChild(consentButton);
              if (consentScreenClass) {
                consentScreenClass.split(' ').forEach(function (classElt) {
                  consentScreen.classList.add(classElt);
                });
              }
              _this.mapContainer.appendChild(consentScreen);
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.consentNotGiven);
            }
          }
        }
      },
      google: {
        coordinates: {
          /**
           * Returns Google Map LatLng from coordinates {lat,lng}
           * @param coordinates
           * @returns {null|google.maps.LatLng}
           * @private
           */
          _getLatLng: function _getLatLng(coordinates) {
            if ((coordinates === null || coordinates === void 0 ? void 0 : coordinates.lat) && (coordinates === null || coordinates === void 0 ? void 0 : coordinates.lng)) {
              if (_this.google) {
                return new _this.google.maps.LatLng(coordinates.lat, coordinates.lng);
              }
            }
            console.error('No lat/lng object provided');
            return null;
          }
        },
        clusters: {
          _getParams: function _getParams() {
            // @ts-ignore
            var clusterParams = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.clusterParams];
            if (clusterParams) {
              clusterParams = (0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.orderParamsByFromValue)(clusterParams);
            }
            return clusterParams;
          },
          _getParamsByCount: function _getParamsByCount(count) {
            return (0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getParamsByCount)(count, _this.helpers.google.clusters._getParams());
          },
          _getHoveredIcon: function _getHoveredIcon(count) {
            var paramsByCount = _this.helpers.google.clusters._getParamsByCount(count);
            return (0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getIconConfig)((0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getDefaultIconData)((0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getSvg)(paramsByCount === null || paramsByCount === void 0 ? void 0 : paramsByCount.defaultIconHoverColor)), paramsByCount.size, _this.options.clusterIconCentered);
          },
          _getBasicIcon: function _getBasicIcon(count) {
            var paramsByCount = _this.helpers.google.clusters._getParamsByCount(count);
            return (0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getIconConfig)((0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getDefaultIconData)((0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__.getSvg)(paramsByCount === null || paramsByCount === void 0 ? void 0 : paramsByCount.defaultIconColor)), paramsByCount.size, _this.options.clusterIconCentered);
          },
          _getFontSize: function _getFontSize(count) {
            var defaultValue = 12;
            return defaultValue + 'px';
          },
          _getFontColor: function _getFontColor(count) {
            return 'rgba(255,255,255,0.9)';
          },
          _getRenderer: function _getRenderer() {
            // @ts-ignore
            var clusterParams = _this.helpers.google.clusters._getParams();
            if (clusterParams) {
              var renderer = new _AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_4__["default"](clusterParams, _assertThisInitialized(_this));
              return renderer;
            }
            return null;
          },
          _handleClusterClick: function _handleClusterClick(e, cluster, map) {
            _this.helpers.markers._unselectAllMarkers();
            map.fitBounds(cluster.bounds);
          }
        },
        markers: {
          /**
           * Loop to init Google Maps markers
           * @private
           */
          _initMapMarkers: function _initMapMarkers(markers) {
            var isFirstInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var addingMarkers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isDisablingClusters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var _this2 = this;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      markers.forEach(function (marker) {
                        _this2.helpers.google.markers._initMapMarker(marker);
                      });
                      if (!isDisablingClusters && this.helpers.markers._getClustersStatus()) {
                        if (!addingMarkers) {
                          this.helpers.markers._enableClusters(isFirstInit);
                        } else {
                          this.helpers.markers._disableClusters().then(function () {
                            _this2.helpers.markers._enableClusters();
                          });
                        }
                      }
                      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.allCreated);
                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          },
          _initMapMarker: function _initMapMarker(marker) {
            return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var markerData;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      markerData = this.helpers.google.markers._createMapMarker(marker);
                      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.dataCreated, markerData);
                      return _context3.abrupt("return", markerData);
                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          },
          /**
           * Removes everything from the map and the list
           */
          _clearMap: function _clearMap() {
            var currentClusterStatus = _this.helpers.markers._getClustersStatus();
            _this.helpers.markers._disableClusters();
            if (currentClusterStatus) {
              _this.helpers.markers._setClustersStatus(true);
            }
            _this.markersData.forEach(function (markerData) {
              var _a;
              (_a = markerData.marker) === null || _a === void 0 ? void 0 : _a.setMap(null);
            });
            _this.markersData = [];
            _this.markers = [];
            if (_this.mapListContainer) {
              _this.mapListContainer.innerHTML = '';
            }
          },
          /**
           * Returns the icon config object
           * @param url
           * @returns {{scaledSize: google.maps.Size, url}}
           * @private
           */
          _getIconConfig: function _getIconConfig(url, iconSize, iconCentered) {
            var size;
            var isCentered;
            if (iconSize) {
              size = iconSize;
            } else {
              size = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconSize];
            }
            if (iconCentered !== undefined) {
              isCentered = iconCentered;
            } else {
              isCentered = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconCentered];
            }
            if (_this.google) {
              var config = {
                url: url,
                scaledSize: new _this.google.maps.Size(size, size),
                anchor: null
              };
              if (isCentered) {
                if (size) {
                  config.anchor = new _this.google.maps.Point(Number(size) / 2, Number(size) / 2);
                }
              }
              return config;
            }
            return null;
          },
          /**
           * Sets the idle icon to the provided marker
           * @param marker
           * @private
           */
          _setIdleIcon: function _setIdleIcon(marker) {
            var idleIcon = _this.helpers.markers._getIdleIconForMarker(marker);
            if (!_this.helpers.markers._isMarkerSelected(marker) && idleIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.setIcon(_this.helpers.google.markers._getIconConfig(idleIcon, iconSize, iconCentered));
            }
          },
          /**
           * Sets the selected icon to the provided marker
           * @param marker
           * @private
           */
          _setSelectedIcon: function _setSelectedIcon(marker) {
            var selectedIcon = _this.helpers.markers._getSelectedIconForMarker(marker);
            if (selectedIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.setIcon(_this.helpers.google.markers._getIconConfig(selectedIcon, iconSize, iconCentered));
            }
          },
          /**
           * Sets the hover icon to the provided marker
           * @param marker
           * @private
           */
          _setHoveredIcon: function _setHoveredIcon(marker) {
            var hoveredIcon = _this.helpers.markers._getHoveredIconForMarker(marker);
            if (!_this.helpers.markers._isMarkerSelected(marker) && hoveredIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.setIcon(_this.helpers.google.markers._getIconConfig(hoveredIcon, iconSize, iconCentered));
            }
          },
          /**
           * Adds basic Google Markers listeners (click, hover, ...)
           * @param markerInstance
           * @private
           */
          _handleBasicMarkerListeners: function _handleBasicMarkerListeners(markerInstance) {
            if (_this.google) {
              var markerData = _this.helpers.markersData._getDataByProperty('marker', markerInstance);
              // Listener to handle marker click
              _this.google.maps.event.addListener(markerInstance, 'click', function () {
                _this._handleClickMarker(markerInstance);
              });
              if (markerData.hasInteraction) {
                // Listener to handle mouseover (change icon)
                _this.google.maps.event.addListener(markerInstance, 'mouseover', function () {
                  var _a;
                  if (!markerData.isFakeCluster) {
                    _this.helpers.google.markers._setHoveredIcon(markerInstance);
                  } else if ((_a = markerData.fakeClusterMarkers) === null || _a === void 0 ? void 0 : _a.length) {
                    markerInstance.setIcon(_this.helpers.google.clusters._getHoveredIcon(markerData.fakeClusterMarkers.length));
                  }
                });
                // Listener to handle mouseout (change icon)
                _this.google.maps.event.addListener(markerInstance, 'mouseout', function () {
                  var _a;
                  if (!markerData.isFakeCluster) {
                    _this.helpers.google.markers._setIdleIcon(markerInstance);
                  } else if ((_a = markerData.fakeClusterMarkers) === null || _a === void 0 ? void 0 : _a.length) {
                    markerInstance.setIcon(_this.helpers.google.clusters._getBasicIcon(markerData.fakeClusterMarkers.length));
                  }
                });
              }
            }
          },
          /**
           * Allows to dynamically add markers to the Google Map
           * @param markersRawData
           */
          _addMapMarkers: function _addMapMarkers(markersRawData) {
            var isDisablingCluster = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var finalArray;
            if (!Array.isArray(markersRawData)) {
              finalArray = [markersRawData];
            } else {
              finalArray = markersRawData;
            }
            finalArray.forEach(function (markerRawData) {
              _this.markers.push(markerRawData);
            });
            _this.helpers.google.markers._initMapMarkers(finalArray, false, true, isDisablingCluster);
          },
          _addMapMarker: function _addMapMarker(markerRawData) {
            return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.helpers.google.markers._initMapMarker(markerRawData);
                    case 2:
                      return _context4.abrupt("return", _context4.sent);
                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          },
          _removeMapMarkers: function _removeMapMarkers(markers) {
            if (!Array.isArray(markers)) {
              markers = [markers];
            }
            var alreadyExistingMarkers = _this.markers;
            markers.forEach(function (marker) {
              var rawData = _this.helpers.markersData._getDataByProperty('marker', marker).rawData;
              // Remove rawData from alreadyExistingMarkers
              var index = alreadyExistingMarkers.indexOf(rawData);
              if (index > -1) {
                alreadyExistingMarkers.splice(index, 1);
              }
            });
            _this.helpers.google.markers._clearMap();
            _this.helpers.google.markers._addMapMarkers(alreadyExistingMarkers);
          },
          _removeMarkerFromMap: function _removeMarkerFromMap(marker) {
            marker.setMap(null);
          },
          /**
           * Create a Google Map marker by passing marker raw data
           * @param markerRawData
           * @returns {{}}
           * @private
           */
          _createMapMarker: function _createMapMarker(markerRawData) {
            var _a, _b, _c;
            var markerData = {
              rawData: {
                coordinates: {
                  lat: 0,
                  lng: 0
                }
              }
            };
            markerData.selected = false;
            markerData.rawData = markerRawData;
            markerData.hasInteraction = (_a = markerRawData.hasInteractions) !== null && _a !== void 0 ? _a : true;
            markerData.isFakeCluster = (_b = markerRawData.isFakeCluster) !== null && _b !== void 0 ? _b : false;
            if (markerData.isFakeCluster && (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.fakeClusterMarkers)) {
              markerData.fakeClusterMarkers = markerRawData.fakeClusterMarkers;
              // Si le faux cluster n'a pas de coordonnées et qu'il a bien des markers
              if (!(markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.coordinates) && Array.isArray(markerData.fakeClusterMarkers)) {
                markerRawData.coordinates = _this.helpers.markers._getMarkersCenterCoordinates(markerData.fakeClusterMarkers);
              }
            }
            var markerPosition = null;
            if (_this.google) {
              markerPosition = new _this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng);
            }
            var markerTitle = markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.title;
            var markerConfig = {
              position: markerPosition,
              title: markerTitle,
              map: _this.map
            };
            var iconSize = markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.iconSize;
            var iconCentered = markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.iconCentered;
            if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.isGeolocation) {
              iconSize = _this.helpers.geolocation._getMarkerSize();
            }
            if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.icon) {
              var url = markerRawData.isGeolocation && _this.helpers.geolocation._getMarkerIcon() ? _this.helpers.geolocation._getMarkerIcon() : markerRawData.icon;
              markerConfig.icon = _this.helpers.google.markers._getIconConfig(url, iconSize, iconCentered);
              markerData.icon = markerRawData.icon;
            } else if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl]) {
              var _url = markerRawData.isGeolocation && _this.helpers.geolocation._getMarkerIcon() ? _this.helpers.geolocation._getMarkerIcon() : _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl];
              if (!markerRawData.isFakeCluster) {
                markerConfig.icon = _this.helpers.google.markers._getIconConfig(_url, iconSize, iconCentered);
              } else if ((_c = markerData.fakeClusterMarkers) === null || _c === void 0 ? void 0 : _c.length) {
                var markersCount = markerData.fakeClusterMarkers.length;
                markerConfig.icon = _this.helpers.google.clusters._getBasicIcon(markersCount);
                markerConfig.label = {
                  text: markerData.fakeClusterMarkers.length.toString(),
                  color: _this.helpers.google.clusters._getFontColor(markersCount),
                  fontSize: _this.helpers.google.clusters._getFontSize(markersCount)
                };
              }
            }
            if (markerRawData.isGeolocation) {
              markerConfig.zIndex = 9999999999;
              markerData.isGeolocation = true;
            }
            if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.selectedIcon) {
              markerData.selectedIcon = markerRawData.selectedIcon;
            }
            if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.hoveredIcon) {
              markerData.hoveredIcon = markerRawData.hoveredIcon;
            }
            var markerInstance = null;
            if (_this.google) {
              markerInstance = new _this.google.maps.marker.AdvancedMarkerElement(markerConfig);
            }
            _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.created, markerInstance);
            markerData.marker = markerInstance;
            markerData.infoWindow = markerData.hasInteraction ? _this.helpers.google.infoWindows._createMapInfoWindow(markerRawData) : null;
            var iconSizeVal = (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.iconSize) ? markerRawData.iconSize : _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconSize];
            var iconCenteredVal = (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.iconCentered) !== undefined ? markerRawData.iconCentered : _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconCentered];
            markerData.iconSize = Number(iconSizeVal);
            markerData.iconCentered = Boolean(iconCenteredVal);
            var listElt = null;
            if (markerData.hasInteraction && _this.mapListContainer) {
              listElt = _this._createMapListInstance(markerRawData, markerInstance);
              markerData.listElt = listElt;
            }
            if (markerData.infoWindow) {
              _this.helpers.google.infoWindows._handleInfoWindowListeners(markerData.infoWindow, markerInstance);
            }
            _this.markersData.push(markerData);
            _this.helpers.google.markers._handleBasicMarkerListeners(markerInstance);
            return markerData;
          },
          _autoZoomToFitAllMarkers: function _autoZoomToFitAllMarkers(markersRawData) {
            var _a;
            if (_this.google) {
              var bounds = new _this.google.maps.LatLngBounds();
              var myPoints = [];
              markersRawData.forEach(function (markerRawData) {
                if (_this.google) {
                  myPoints.push(new _this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng));
                }
              });
              myPoints.forEach(function (point) {
                bounds.extend(point);
              });
              (_a = _this.map) === null || _a === void 0 ? void 0 : _a.fitBounds(bounds);
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.allFit, bounds);
            }
          }
        },
        polylines: {
          _initPolylines: function _initPolylines(polylines) {
            return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              var _this3 = this;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      polylines.forEach(function (polyline) {
                        _this3.helpers.google.polylines._addMapPolyline(polyline);
                      });
                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));
          },
          _addMapPolyline: function _addMapPolyline(polyline) {
            var _a, _b, _c, _d;
            var coordinates = polyline.coordinates;
            if (polyline.closeShape) {
              var firstCoordinate = coordinates[0];
              var lastCoordinate = coordinates[coordinates.length - 1];
              if (firstCoordinate.lat !== lastCoordinate.lat || firstCoordinate.lng !== lastCoordinate.lng) {
                coordinates.push(coordinates[0]);
              }
            }
            if ((_a = _this.google) === null || _a === void 0 ? void 0 : _a.maps) {
              var newPolyline = new _this.google.maps.Polyline({
                path: coordinates,
                geodesic: true,
                strokeColor: (_b = polyline.strokeColor) !== null && _b !== void 0 ? _b : '#FF0000',
                strokeOpacity: (_c = polyline.strokeOpacity) !== null && _c !== void 0 ? _c : 1,
                strokeWeight: (_d = polyline.strokeWeight) !== null && _d !== void 0 ? _d : 2
              });
              newPolyline.setMap(_this.map);
              _this.polylines.push(newPolyline);
            }
          }
        },
        infoWindows: {
          /**
           * Create a Google Map marker infoWindow by passing marker raw data
           * @param markerRawData
           * @returns {null|*}
           * @private
           */
          _createMapInfoWindow: function _createMapInfoWindow(markerRawData) {
            if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.displayInfoWindows]) {
              var content;
              // If an infoWindow template is defined for this specific marker
              if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.infoWindowTemplate) {
                content = markerRawData.infoWindowTemplate;
              } else {
                content = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.infoWindowTemplate];
                if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.replaceInfoWindowContentWithMarkerData]) {
                  content = _this._replaceMarkerDataInString(markerRawData, content);
                }
              }
              var infoWindowInstance = null;
              if (_this.google) {
                infoWindowInstance = new _this.google.maps.InfoWindow({
                  content: content
                });
              }
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.infoWindows.created, infoWindowInstance);
              return infoWindowInstance;
            }
            return null;
          },
          _handleInfoWindowListeners: function _handleInfoWindowListeners(infoWindow, markerInstance) {
            if (_this.google) {
              infoWindow.addListener('closeclick', function () {
                _this._handleClickMarker(markerInstance);
              });
            }
          }
        },
        map: {
          /**
           * Init the Google Map instance
           * @param container
           * @returns {Promise<void>}
           * @private
           */
          _initMap: function _initMap(container) {
            return __awaiter(_assertThisInitialized(_this), void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
              var _b, loader, options;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (this.google) {
                        _context6.next = 7;
                        break;
                      }
                      options = (_b = Object(this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].apiOptions])) !== null && _b !== void 0 ? _b : {};
                      if (!options.libraries || !options.libraries.includes('marker')) {
                        // Append marker to array option.libraries
                        options.libraries = options.libraries ? [].concat(_toConsumableArray(options.libraries), ['marker']) : ['marker'];
                      }
                      if (options) {
                        loader = new google_maps__WEBPACK_IMPORTED_MODULE_7__.Loader(this.options.apiKey, options);
                      } else {
                        loader = new google_maps__WEBPACK_IMPORTED_MODULE_7__.Loader(this.options.apiKey);
                      }
                      _context6.next = 6;
                      return loader.load();
                    case 6:
                      this.google = _context6.sent;
                    case 7:
                      this.map = new this.google.maps.Map(container, {
                        center: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.defaultCenter],
                        zoom: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.defaultZoom],
                        zoomControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.zoomButtons],
                        streetViewControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.streetViewButton],
                        fullscreenControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.fullscreenButton],
                        mapTypeControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.mapTypeButtons],
                        scaleControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.displayScale],
                        rotateControl: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.controls.rotateControl],
                        styles: this.helpers.google.map._getMapStyles(),
                        mapTypeId: this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.type],
                        mapId: 'DEMO_MAP_ID'
                      });
                      this.helpers.google.map._handleClickOnMap();
                      this.helpers.google.map._handleMapMove();
                    case 10:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          },
          _handleClickOnMap: function _handleClickOnMap() {
            if (_this.map) {
              if (_this.options.mapHideMarkerOnClickOutside) {
                _this.map.addListener('click', function () {
                  _this.markersData.forEach(function (markerData) {
                    _this.helpers.markers._setMarkerState(markerData.marker, false);
                  });
                });
              }
            }
          },
          _handleMapMove: function _handleMapMove() {
            if (_this.map) {
              _this.map.addListener('dragend', function () {
                var _a;
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.hasBeenDragged, (_a = _this.map) === null || _a === void 0 ? void 0 : _a.getBounds());
              });
            }
          },
          /**
           * Returns the style array required to define Google Maps style
           * @returns {[{featureType: string, stylers: [{visibility: string}]}]}
           * @private
           */
          _getMapStyles: function _getMapStyles() {
            var mapStyles = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.customStyles]);
            var poiStyle = {
              featureType: 'poi',
              stylers: [{
                visibility: _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.showPlaces] ? 'on' : 'off'
              }]
            };
            if (Object.prototype.toString.call(mapStyles) === '[object Array]') {
              if (mapStyles && Array.isArray(mapStyles)) {
                mapStyles.push(poiStyle);
              }
              return mapStyles;
            }
            console.error("".concat(_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.customStyles, " must be an array."));
            return [poiStyle];
          },
          _setMapType: function _setMapType(type) {
            var _a;
            (_a = _this.map) === null || _a === void 0 ? void 0 : _a.setMapTypeId(type);
          },
          _setMapStyle: function _setMapStyle(styles) {
            if (_this.map) {
              // @ts-ignore
              _this.map.setOptions({
                styles: styles
              });
            }
          }
        },
        places: {
          _initPlacesField: function _initPlacesField() {
            var _a, _b;
            if (_this.placesInput) {
              var placesField = _this.placesInput;
              var placesOptions = (_a = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].places.options])) !== null && _a !== void 0 ? _a : {};
              var placesMapOptions = (_b = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].places.mapOptions])) !== null && _b !== void 0 ? _b : {};
              placesField.addEventListener('focus', function () {
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.places.fieldHasBeenFocused);
              });
              placesField.addEventListener('blur', function () {
                _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.places.fieldHasBeenBlurred);
              });
              _this.on(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.mapLoaded, function () {
                var _a, _b;
                if ((_b = (_a = _this.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.places) {
                  _this.autocomplete = new _this.google.maps.places.Autocomplete(placesField, placesOptions);
                  _this.google.maps.event.addListener(_this.autocomplete, 'place_changed', function () {
                    var _a;
                    var clickedPlace = _this.autocomplete.getPlace();
                    if ((_a = clickedPlace === null || clickedPlace === void 0 ? void 0 : clickedPlace.geometry) === null || _a === void 0 ? void 0 : _a.location) {
                      _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.places.selectedPlaceHasBeenFound, clickedPlace);
                      var coordinates = {
                        lat: clickedPlace.geometry.location.lat(),
                        lng: clickedPlace.geometry.location.lng()
                      };
                      var latLngCoordinates = _this.helpers.google.coordinates._getLatLng(coordinates);
                      if ((latLngCoordinates === null || latLngCoordinates === void 0 ? void 0 : latLngCoordinates.lat()) && (latLngCoordinates === null || latLngCoordinates === void 0 ? void 0 : latLngCoordinates.lng())) {
                        _this.helpers.map._setCenter(latLngCoordinates);
                        _this.helpers.map._setZoom(placesMapOptions.zoomOnPlace);
                        _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.places.selectedPlaceHasBeenCentered, clickedPlace);
                      }
                    }
                  });
                }
              });
            }
          }
        }
      },
      places: {
        _commonInit: function _commonInit() {
          switch (_this.helpers.providers._getProvider()) {
            case 'google':
              _this.helpers.google.places._initPlacesField();
              break;
            default:
              break;
          }
        }
      },
      geolocation: {
        _canGeolocate: function _canGeolocate() {
          return window.navigator.geolocation;
        },
        _getCoordinates: function _getCoordinates(success, failure) {
          if (_this.helpers.geolocation._canGeolocate()) {
            return window.navigator.geolocation.getCurrentPosition(function (data) {
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.geolocation.success, data);
              success(data);
            }, function (data) {
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.geolocation.error, data);
              console.error('Erreur lors de la géolocalisation', data);
              if (failure) {
                failure(data);
              }
            });
          }
          return false;
        },
        _getMarkerIcon: function _getMarkerIcon() {
          var _a;
          return (_a = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].geolocation.options])) === null || _a === void 0 ? void 0 : _a.icon;
        },
        _getMarkerSize: function _getMarkerSize() {
          var _a;
          return (_a = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].geolocation.options])) === null || _a === void 0 ? void 0 : _a.iconSize;
        },
        _handleGeolocationRequest: function _handleGeolocationRequest() {
          var forceMarker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var withZoom = arguments.length > 1 ? arguments[1] : undefined;
          var showMarker = arguments.length > 2 ? arguments[2] : undefined;
          var _a;
          _this.helpers.geolocation._removeGeolocationMarker();
          _this.helpers.markers._unselectAllMarkers();
          var zoomValue = undefined;
          if (withZoom) {
            if (typeof withZoom === "number") {
              zoomValue = withZoom;
            } else {
              var geolocationOptions = (_a = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].geolocation.options])) !== null && _a !== void 0 ? _a : {};
              zoomValue = geolocationOptions.zoomOnGeolocation;
            }
          }
          _this.helpers.geolocation._getCoordinates(function (data) {
            var _a, _b, _c, _d;
            if (((_a = data === null || data === void 0 ? void 0 : data.coords) === null || _a === void 0 ? void 0 : _a.latitude) && ((_b = data === null || data === void 0 ? void 0 : data.coords) === null || _b === void 0 ? void 0 : _b.longitude)) {
              var _geolocationOptions = (_c = Object(_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].geolocation.options])) !== null && _c !== void 0 ? _c : {};
              if (typeof showMarker === 'undefined') {
                if (forceMarker) {
                  showMarker = true;
                } else {
                  showMarker = (_d = _geolocationOptions.addMarkerToMap) !== null && _d !== void 0 ? _d : false;
                }
              }
              var latLng = _this.helpers.google.coordinates._getLatLng({
                lat: data.coords.latitude,
                lng: data.coords.longitude
              });
              _this.helpers.map._setCenter(latLng);
              if (withZoom && zoomValue) {
                _this.helpers.map._setZoom(zoomValue);
              }
              if (showMarker) {
                var marker = {
                  coordinates: {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                  },
                  hasInteractions: false,
                  isGeolocation: true
                };
                _this.helpers.google.markers._addMapMarker(marker).then(function (geolocationMarker) {
                  _this.geolocationMarkerData = geolocationMarker;
                });
              }
              _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.geolocation.centered, latLng);
            }
          });
        },
        _removeGeolocationMarker: function _removeGeolocationMarker() {
          var _a;
          if ((_a = _this.geolocationMarkerData) === null || _a === void 0 ? void 0 : _a.marker) {
            switch (_this.helpers.providers._getProvider()) {
              case 'google':
                _this.helpers.google.markers._removeMarkerFromMap(_this.geolocationMarkerData.marker);
                break;
              default:
                break;
            }
            _this.geolocationMarkerData = null;
            _this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.geolocationRemoved);
          }
        },
        _commonInit: function _commonInit() {
          if (_this.helpers.geolocation._canGeolocate()) {
            if (_this.geolocationButton) {
              _this.geolocationButton.addEventListener('click', function () {
                _this.helpers.geolocation._handleGeolocationRequest();
              });
            }
          }
        }
      }
    };
    _this.emit = _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(AdeliomMapFunctions.prototype)), "emit", _thisSuper);
    _this.on = _get((_thisSuper2 = _assertThisInitialized(_this), _getPrototypeOf(AdeliomMapFunctions.prototype)), "on", _thisSuper2);
    _this.defaultOptions = _defaultOptions__WEBPACK_IMPORTED_MODULE_2__["default"];
    _this.map = null;
    _this.mapContainer = null;
    _this.customZoomPlusBtn = null;
    _this.customZoomMinusBtn = null;
    _this.mapListContainer = null;
    _this.placesInput = null;
    _this.geolocationButton = null;
    _this.markers = [];
    _this.polylines = [];
    _this.markersData = [];
    _this.geolocationMarkerData = null;
    _this.clusterer = null;
    _this.displayMarkers = false;
    return _this;
  }
  _createClass(AdeliomMapFunctions, [{
    key: "_replaceMarkerDataInString",
    value: function _replaceMarkerDataInString(markerData, string) {
      if (string) {
        Object.keys(markerData).forEach(function (key) {
          var search = "{{ ".concat(key, " }}");
          string = string.replaceAll(search, markerData[key]);
        });
      }
      return string;
    }
    /**
     * Creates a map list instance (store locator instance)
     * @param markerRawData
     * @param mapMarkerInstance
     * @returns {HTMLDivElement}
     * @private
     */
  }, {
    key: "_createMapListInstance",
    value: function _createMapListInstance(markerRawData, mapMarkerInstance) {
      var _this4 = this;
      var mapListInstance;
      if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.listEltId) {
        mapListInstance = document.querySelector("[js-map-list-id='".concat(markerRawData.listEltId, "']"));
      } else {
        mapListInstance = document.createElement('div');
        var selectorWithout = this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].list.selector];
        if (typeof selectorWithout === 'string') {
          selectorWithout = selectorWithout.replace('[', '').replace(']', '');
        }
        mapListInstance.setAttribute(selectorWithout + '-elt', '');
        var listInstanceHtml;
        // If a list elt template is defined for this specific marker
        if (markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.listEltTemplate) {
          listInstanceHtml = markerRawData.listEltTemplate;
        } else {
          listInstanceHtml = this.mapListEltTemplate;
          if (this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].list.replaceWithMarkerData]) {
            listInstanceHtml = this._replaceMarkerDataInString(markerRawData, listInstanceHtml);
          }
        }
        mapListInstance.innerHTML = listInstanceHtml;
        if (this.mapListContainer) {
          this.mapListContainer.appendChild(mapListInstance);
        }
      }
      if (mapListInstance) {
        mapListInstance.addEventListener('click', function () {
          _this4._handleClickListElt(mapListInstance);
        });
        this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.listElements.created, mapListInstance);
      }
      return mapListInstance;
    }
  }, {
    key: "_handleClickListElt",
    value: function _handleClickListElt(listElt) {
      var mapMarkerInstance = this.helpers.markers._getMarkerByListEltNode(listElt);
      if (mapMarkerInstance) {
        if (this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.displayInfoWindows]) {
          this.helpers.markers._setMarkerState(mapMarkerInstance, 'toggle');
        }
      }
      var data = this.helpers.markersData._getDataByProperty('listElt', listElt);
      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.listElements.clicked, data);
    }
  }, {
    key: "_handleClickMarker",
    value: function _handleClickMarker(marker) {
      var markerData = this.helpers.markersData._getDataByProperty('marker', marker);
      if (markerData.hasInteraction) {
        if (this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.displayInfoWindows]) {
          if (this.helpers.markers._isMarkerSelected(marker)) {
            this.helpers.markers._setMarkerState(marker, false);
          } else {
            this.helpers.markers._setMarkerState(marker, true);
          }
        }
        this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.clicked, markerData);
      } else {
        this.helpers.map._centerMapOnMarker(marker);
        this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.markers.geolocationClicked, markerData);
      }
    }
  }, {
    key: "_initMap",
    value: function _initMap() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.selector]) {
                  _context7.next = 11;
                  break;
                }
                if (!this.mapContainer) {
                  _context7.next = 8;
                  break;
                }
                this.helpers.map._addClassesToMapContainer([this.mapCustomClass]);
                _context7.next = 5;
                return this._handleConsent();
              case 5:
                return _context7.abrupt("return", _context7.sent);
              case 8:
                console.error(_errors__WEBPACK_IMPORTED_MODULE_5__["default"].selectors.map.notFound);
              case 9:
                _context7.next = 12;
                break;
              case 11:
                console.error(_errors__WEBPACK_IMPORTED_MODULE_5__["default"].selectors.map.notProvided);
              case 12:
                return _context7.abrupt("return", false);
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
    }
  }, {
    key: "_getPPMS",
    value: function _getPPMS() {
      if (null === this.ppms) {
        // @ts-ignore
        var ppms = window.ppms;
        if (ppms) {
          this.ppms = ppms;
        }
      }
      return this.ppms;
    }
    /**
     * Returns 0 if no consent, 1 if consent
     */
  }, {
    key: "_getPiwikConsent",
    value: function _getPiwikConsent() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var _this5 = this;
        var consent;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                consent = 0;
                if (!this._getPPMS()) {
                  _context8.next = 5;
                  break;
                }
                _context8.next = 4;
                return new Promise(function (resolve, reject) {
                  _this5._getPPMS().cm.api('getComplianceSettings', function (type) {
                    var key = _this5.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.piwikConsentKey];
                    if (type && type.consents && type.consents[key]) {
                      resolve(type.consents[key].status);
                    } else {
                      reject('Unable to get consent status');
                    }
                  });
                });
              case 4:
                consent = _context8.sent;
              case 5:
                return _context8.abrupt("return", consent);
              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
    }
  }, {
    key: "_openPiwikConsent",
    value: function _openPiwikConsent() {
      if (this.usePiwik) {
        if (this._getPPMS()) {
          this._getPPMS().cm.api('openConsentForm');
        }
      }
    }
  }, {
    key: "_handleInitAfterConsentGiven",
    value: function _handleInitAfterConsentGiven() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var provider;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                provider = this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider];
                if (!(provider && typeof provider === 'string')) {
                  _context9.next = 13;
                  break;
                }
                if (!this.helpers.providers._isProviderAvailable(provider)) {
                  _context9.next = 12;
                  break;
                }
                _context9.t0 = this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.provider];
                _context9.next = _context9.t0 === 'google' ? 6 : 6;
                break;
              case 6:
                _context9.next = 8;
                return this.helpers.google.map._initMap(this.mapContainer);
              case 8:
                return _context9.abrupt("break", 9);
              case 9:
                return _context9.abrupt("return", true);
              case 12:
                console.error("The provider \"".concat(provider, "\" is not available."));
              case 13:
                return _context9.abrupt("return", false);
              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
    }
  }, {
    key: "_handlePiwikEvents",
    value: function _handlePiwikEvents() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var _this6 = this;
        var buttonKeys;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.usePiwik && this._getPPMS()) {
                  // @ts-ignore
                  buttonKeys = this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.piwikButtonSelectors];
                  document.body.addEventListener('click', function (e) {
                    // @ts-ignore
                    if (e.target && e.target.parentNode) {
                      // @ts-ignore
                      var parent = e.target.parentNode;
                      Object.keys(buttonKeys).forEach(function (key) {
                        // @ts-ignore
                        var elt = parent.querySelector(buttonKeys[key]);
                        if (elt === e.target) {
                          switch (key) {
                            case 'acceptAll':
                              _this6._handlePiwikAcceptAllEvent();
                              break;
                            case 'rejectAll':
                              _this6._handlePiwikRejectAllEvent();
                              break;
                            case 'saveChoices':
                              _this6._handlePiwikSaveChoicesEvent();
                              break;
                            default:
                              break;
                          }
                        }
                      });
                    }
                  });
                }
              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
    }
  }, {
    key: "_handlePiwikAcceptAllEvent",
    value: function _handlePiwikAcceptAllEvent() {
      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.rgpd.acceptAllClicked);
      this.helpers.map._initMapAndMarkers();
    }
  }, {
    key: "_handlePiwikRejectAllEvent",
    value: function _handlePiwikRejectAllEvent() {
      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.rgpd.rejectAllClicked);
      this._handleConsent();
    }
  }, {
    key: "_handlePiwikSaveChoicesEvent",
    value: function _handlePiwikSaveChoicesEvent() {
      this.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.rgpd.saveChoicesClicked);
      this._handleConsent();
    }
  }, {
    key: "_handleConsent",
    value: function _handleConsent() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var _this7 = this;
        var hasToAskForConsent, piwikConsent;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                hasToAskForConsent = this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].rgpd.askForConsent];
                if (!this.usePiwik) {
                  _context11.next = 6;
                  break;
                }
                _context11.next = 4;
                return this._getPiwikConsent();
              case 4:
                piwikConsent = _context11.sent;
                this.hasConsent = piwikConsent === 1;
              case 6:
                if (!(hasToAskForConsent && !this.hasConsent)) {
                  _context11.next = 12;
                  break;
                }
                this.helpers.consentScreen._setConsentScreen(this.hasConsent);
                setTimeout(function () {
                  _this7.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.consentNotGiven);
                }, 10);
                return _context11.abrupt("return", false);
              case 12:
                if (hasToAskForConsent && this.hasConsent) {
                  setTimeout(function () {
                    _this7.emit(_AdeliomMap__WEBPACK_IMPORTED_MODULE_3__.AdeliomMapEvents.map.consentGiven);
                  }, 10);
                }
                if (!(!this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.checkSize] || this.mapContainer && this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                  _context11.next = 19;
                  break;
                }
                _context11.next = 16;
                return this._handleInitAfterConsentGiven();
              case 16:
                return _context11.abrupt("return", _context11.sent);
              case 19:
                console.error(_errors__WEBPACK_IMPORTED_MODULE_5__["default"].selectors.map.tooSmall);
                return _context11.abrupt("return", false);
              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
    }
  }]);
  return AdeliomMapFunctions;
}(_Emitter__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/js/AdeliomMapMarkerClusterer.ts":
/*!*********************************************!*\
  !*** ./src/js/AdeliomMapMarkerClusterer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdeliomMapMarkerClusterer)
/* harmony export */ });
/* harmony import */ var _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/markerclusterer */ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js");
/* harmony import */ var _AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdeliomMapClusterRenderer */ "./src/js/AdeliomMapClusterRenderer.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}


var AdeliomMapMarkerClusterer = /*#__PURE__*/function (_MarkerClusterer) {
  _inherits(AdeliomMapMarkerClusterer, _MarkerClusterer);
  var _super = _createSuper(AdeliomMapMarkerClusterer);
  function AdeliomMapMarkerClusterer(data, adeliomMap) {
    var _this;
    _classCallCheck(this, AdeliomMapMarkerClusterer);
    _this = _super.call(this, data);
    _this.adeliomMap = adeliomMap;
    return _this;
  }
  _createClass(AdeliomMapMarkerClusterer, [{
    key: "renderClusters",
    value: function renderClusters() {
      var _this2 = this;
      _get(_getPrototypeOf(AdeliomMapMarkerClusterer.prototype), "renderClusters", this).call(this);
      // Cette méthode a pour objectif de dynamiser le compte
      // des markers dans les clusters en prenant en compte
      // les faux clusters (qui ne peuvent pas être ouverts et
      // sont donc représentés par un seul marker).
      if (Array.isArray(this.clusters)) {
        this.clusters.forEach(function (cluster) {
          var _a;
          var currentLabel = (_a = cluster === null || cluster === void 0 ? void 0 : cluster.marker) === null || _a === void 0 ? void 0 : _a.getLabel();
          var markers = cluster === null || cluster === void 0 ? void 0 : cluster.markers;
          if ((currentLabel === null || currentLabel === void 0 ? void 0 : currentLabel.text) && markers) {
            var currentCount = 0;
            if (Array.isArray(markers)) {
              markers.forEach(function (marker) {
                var _a;
                var markerRawDatas = _this2.adeliomMap.helpers.markersData._getDataByProperty('marker', marker);
                if (markerRawDatas) {
                  if (markerRawDatas === null || markerRawDatas === void 0 ? void 0 : markerRawDatas.isFakeCluster) {
                    if ((markerRawDatas === null || markerRawDatas === void 0 ? void 0 : markerRawDatas.fakeClusterMarkers) && Array.isArray(markerRawDatas === null || markerRawDatas === void 0 ? void 0 : markerRawDatas.fakeClusterMarkers)) {
                      currentCount += (_a = markerRawDatas === null || markerRawDatas === void 0 ? void 0 : markerRawDatas.fakeClusterMarkers) === null || _a === void 0 ? void 0 : _a.length;
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
            cluster.marker.setIcon(_this2.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount));
            var clusterParams = _this2.adeliomMap.helpers.google.clusters._getParamsByCount(currentCount);
            if ((clusterParams === null || clusterParams === void 0 ? void 0 : clusterParams.hoverIcon) || (clusterParams === null || clusterParams === void 0 ? void 0 : clusterParams.defaultIconHoverColor)) {
              cluster.marker.addListener('mouseover', function () {
                var _a, _b;
                if (clusterParams === null || clusterParams === void 0 ? void 0 : clusterParams.hoverIcon) {
                  (_a = cluster.marker) === null || _a === void 0 ? void 0 : _a.setIcon((0,_AdeliomMapClusterRenderer__WEBPACK_IMPORTED_MODULE_1__.getIconConfig)(clusterParams.hoverIcon, clusterParams.size, _this2.adeliomMap.options.clusterIconCentered));
                } else {
                  (_b = cluster.marker) === null || _b === void 0 ? void 0 : _b.setIcon(_this2.adeliomMap.helpers.google.clusters._getHoveredIcon(currentCount));
                }
              });
              cluster.marker.addListener('mouseout', function () {
                var _a;
                (_a = cluster.marker) === null || _a === void 0 ? void 0 : _a.setIcon(_this2.adeliomMap.helpers.google.clusters._getBasicIcon(currentCount));
              });
            }
          }
        });
      }
    }
  }]);
  return AdeliomMapMarkerClusterer;
}(_googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_0__.MarkerClusterer);


/***/ }),

/***/ "./src/js/defaultOptions.ts":
/*!**********************************!*\
  !*** ./src/js/defaultOptions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapAnims": () => (/* binding */ mapAnims)
/* harmony export */ });
var mapAnims = {
  smooth: 'smooth',
  "default": 'default'
};
var defaultOptions = {
  checkMapSize: false,
  mapUseClusters: false,
  mapClusterIconSize: 56,
  mapCustomZoomMinusSelector: null,
  mapCustomZoomPlusSelector: null,
  geolocationSelector: undefined,
  geolocationOptions: {
    zoomOnGeolocation: 15,
    addMarkerToMap: false
  },
  placesSelector: undefined,
  placesOptions: {
    componentRestrictions: {
      country: 'fr'
    },
    fields: ['geometry.location', 'formatted_address']
  },
  placesMapOptions: {
    autoCenterOnPlace: true,
    zoomOnPlace: 15
  },
  mapClusterParams: [{
    from: 2,
    defaultIconColor: "#E62A4D",
    size: 56
  }],
  mapMarkers: [{
    title: 'Agence Adeliom',
    description: 'Agence Digitale',
    coordinates: {
      lat: 48.614782,
      lng: 7.714012
    }
  }],
  mapMarkerIconSize: 56,
  allowMultipleMarkersSelected: true,
  mapDefaultCenter: {
    lat: 48.614782,
    lng: 7.714012
  },
  mapAutoCenter: false,
  mapAutoZoom: false,
  mapDefaultZoom: 12,
  mapProvider: 'google',
  mapDisplayMarkers: true,
  mapDisplayInfoWindows: true,
  mapInfoWindowTemplate: '',
  mapCenterMarkerOnClick: true,
  mapZoomMarkerOnClick: 12,
  mapHideMarkerOnClickOutside: false,
  mapShowPlaces: false,
  mapType: 'roadmap',
  mapInfoWindowReplaceWithMarkerData: false,
  mapCustomStyles: [],
  mapEnableZoomButtons: false,
  mapEnableStreetView: false,
  mapEnableFullscreenButton: false,
  mapEnableTypeButtons: false,
  mapDisplayScale: false,
  mapRotate: false,
  mapAskForConsent: false,
  mapUsePiwik: false,
  mapPiwikConsentKey: 'analytics',
  piwikButtonSelectors: {
    acceptAll: '#ppms_cm_agree-to-all',
    rejectAll: '#ppms_cm_reject-all',
    saveChoices: '#ppms_cm_save-choices'
  },
  mapConsentDefaultValue: false,
  mapConsentButtonMessage: 'Activer la carte',
  mapConsentButtonClass: '',
  mapConsentScreenClass: '',
  mapListReplaceWithMarkerData: false,
  mapListCenterMarkerOnClick: true,
  mapListEltTemplate: '',
  mapAnimation: mapAnims.smooth,
  markerIconCentered: false,
  clusterIconCentered: false,
  mapPolylines: []
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultOptions);

/***/ }),

/***/ "./src/js/errors.ts":
/*!**************************!*\
  !*** ./src/js/errors.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _optionKeys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./optionKeys */ "./src/js/optionKeys.ts");

var errors = {
  apiKey: {
    notProvided: "".concat(_optionKeys__WEBPACK_IMPORTED_MODULE_0__["default"].apiKey, " not provided")
  },
  selectors: {
    map: {
      notProvided: "Need to provide ".concat(_optionKeys__WEBPACK_IMPORTED_MODULE_0__["default"].map.selector, " option"),
      notFound: "No element found with matching selector provided in ".concat(_optionKeys__WEBPACK_IMPORTED_MODULE_0__["default"].map.selector),
      tooSmall: "The map container is too small"
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (errors);

/***/ }),

/***/ "./src/js/optionKeys.ts":
/*!******************************!*\
  !*** ./src/js/optionKeys.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var keys = {
  apiKey: 'apiKey',
  apiOptions: 'apiOptions',
  map: {
    selector: 'mapSelector',
    defaultCenter: 'mapDefaultCenter',
    autoCenter: 'mapAutoCenter',
    autoZoom: 'mapAutoZoom',
    defaultZoom: 'mapDefaultZoom',
    provider: 'mapProvider',
    checkSize: 'checkMapSize',
    useClusters: 'mapUseClusters',
    clusterIconUrl: 'mapClusterIconUrl',
    clusterIconSize: 'mapClusterIconSize',
    clusterParams: 'mapClusterParams',
    markers: 'mapMarkers',
    markerIconUrl: 'mapMarkerIconUrl',
    markerHoveredIconUrl: 'mapMarkerHoveredIconUrl',
    markerSelectedIconUrl: 'mapMarkerSelectedIconUrl',
    markerIconSize: 'mapMarkerIconSize',
    markerIconCentered: 'markerIconCentered',
    displayMarkers: 'mapDisplayMarkers',
    displayInfoWindows: 'mapDisplayInfoWindows',
    allowMultipleMarkersSelected: 'mapAllowMultipleMarkersSelected',
    infoWindowTemplate: 'mapInfoWindowTemplate',
    centerMarkerOnClick: 'mapCenterMarkerOnClick',
    zoomMarkerOnClick: 'mapZoomMarkerOnClick',
    animation: 'mapAnimation',
    showPlaces: 'mapShowPlaces',
    type: 'mapType',
    replaceInfoWindowContentWithMarkerData: 'mapInfoWindowReplaceWithMarkerData',
    customStyles: 'mapCustomStyles',
    customZoomPlusSelector: 'mapCustomZoomPlusSelector',
    customZoomMinusSelector: 'mapCustomZoomMinusSelector',
    controls: {
      zoomButtons: 'mapEnableZoomButtons',
      streetViewButton: 'mapEnableStreetView',
      fullscreenButton: 'mapEnableFullscreenButton',
      mapTypeButtons: 'mapEnableTypeButtons',
      displayScale: 'mapDisplayScale',
      rotateControl: 'mapRotate'
    }
  },
  list: {
    selector: 'mapListSelector',
    eltTemplate: 'mapListEltTemplate',
    centerMarkerOnClick: 'mapListCenterMarkerOnClick',
    replaceWithMarkerData: 'mapListReplaceWithMarkerData'
  },
  places: {
    selector: 'placesSelector',
    options: 'placesOptions',
    mapOptions: 'placesMapOptions'
  },
  geolocation: {
    selector: 'geolocationSelector',
    options: 'geolocationOptions'
  },
  rgpd: {
    askForConsent: 'mapAskForConsent',
    usePiwik: 'mapUsePiwik',
    piwikConsentKey: 'mapPiwikConsentKey',
    piwikButtonSelectors: 'piwikButtonSelectors',
    defaultConsentValue: 'mapConsentDefaultValue',
    buttonMessage: 'mapConsentButtonMessage',
    buttonClass: 'mapConsentButtonClass',
    consentScreenClass: 'mapConsentScreenClass'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);

/***/ }),

/***/ "./src/js/Emitter.js":
/*!***************************!*\
  !*** ./src/js/Emitter.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Emitter)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
    this.events = {};
  }
  _createClass(Emitter, [{
    key: "on",
    value: function on(eventName, fn) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(fn);
    }
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      var event = this.events[eventName];
      if (event) {
        event.forEach(function (fn) {
          fn.call(null, data);
        });
      }
    }
  }]);
  return Emitter;
}();


/***/ }),

/***/ "./node_modules/density-clustering/lib/DBSCAN.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/DBSCAN.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * DBSCAN - Density based clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * DBSCAN class construcotr
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {DBSCAN}
 */
function DBSCAN(dataset, epsilon, minPts, distanceFunction) {
  /** @type {Array} */
  this.dataset = [];
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 2;
  /** @type {function} */
  this.distance = this._euclideanDistance;
  /** @type {Array} */
  this.clusters = [];
  /** @type {Array} */
  this.noise = [];

  // temporary variables used during computation

  /** @type {Array} */
  this._visited = [];
  /** @type {Array} */
  this._assigned = [];
  /** @type {number} */
  this._datasetLength = 0;

  this._init(dataset, epsilon, minPts, distanceFunction);
};

/******************************************************************************/
// public functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {undefined}
 * @access public
 */
DBSCAN.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0; pointId < this._datasetLength; pointId++) {
    // if point is not visited, check if it forms a cluster
    if (this._visited[pointId] !== 1) {
      this._visited[pointId] = 1;

      // if closest neighborhood is too small to form a cluster, mark as noise
      var neighbors = this._regionQuery(pointId);

      if (neighbors.length < this.minPts) {
        this.noise.push(pointId);
      } else {
        // create new cluster and add point
        var clusterId = this.clusters.length;
        this.clusters.push([]);
        this._addToCluster(pointId, clusterId);

        this._expandCluster(clusterId, neighbors);
      }
    }
  }

  return this.clusters;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this.noise = [];

    this._datasetLength = dataset.length;
    this._visited = new Array(this._datasetLength);
    this._assigned = new Array(this._datasetLength);
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Expand cluster to closest points of given neighborhood
 *
 * @param {number} clusterId
 * @param {Array} neighbors
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._expandCluster = function(clusterId, neighbors) {

  /**
   * It's very important to calculate length of neighbors array each time,
   * as the number of elements changes over time
   */
  for (var i = 0; i < neighbors.length; i++) {
    var pointId2 = neighbors[i];

    if (this._visited[pointId2] !== 1) {
      this._visited[pointId2] = 1;
      var neighbors2 = this._regionQuery(pointId2);

      if (neighbors2.length >= this.minPts) {
        neighbors = this._mergeArrays(neighbors, neighbors2);
      }
    }

    // add to cluster
    if (this._assigned[pointId2] !== 1) {
      this._addToCluster(pointId2, clusterId);
    }
  }
};

/**
 * Add new point to cluster
 *
 * @param {number} pointId
 * @param {number} clusterId
 */
DBSCAN.prototype._addToCluster = function(pointId, clusterId) {
  this.clusters[clusterId].push(pointId);
  this._assigned[pointId] = 1;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId,
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._regionQuery = function(pointId) {
  var neighbors = [];

  for (var id = 0; id < this._datasetLength; id++) {
    var dist = this.distance(this.dataset[pointId], this.dataset[id]);
    if (dist < this.epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._mergeArrays = function(a, b) {
  var len = b.length;

  for (var i = 0; i < len; i++) {
    var P = b[i];
    if (a.indexOf(P) < 0) {
      a.push(P);
    }
  }

  return a;
};

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
DBSCAN.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = DBSCAN;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/KMEANS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/KMEANS.js ***!
  \*******************************************************/
/***/ ((module) => {

﻿/**
 * KMEANS clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * KMEANS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} k - number of clusters
 * @param {function} distance - distance function
 * @returns {KMEANS}
 */
 function KMEANS(dataset, k, distance) {
  this.k = 3; // number of clusters
  this.dataset = []; // set of feature vectors
  this.assignments = []; // set of associated clusters for each feature vector
  this.centroids = []; // vectors for our clusters

  this.init(dataset, k, distance);
}

/**
 * @returns {undefined}
 */
KMEANS.prototype.init = function(dataset, k, distance) {
  this.assignments = [];
  this.centroids = [];

  if (typeof dataset !== 'undefined') {
    this.dataset = dataset;
  }

  if (typeof k !== 'undefined') {
    this.k = k;
  }

  if (typeof distance !== 'undefined') {
    this.distance = distance;
  }
};

/**
 * @returns {undefined}
 */
KMEANS.prototype.run = function(dataset, k) {
  this.init(dataset, k);

  var len = this.dataset.length;

  // initialize centroids
  for (var i = 0; i < this.k; i++) {
    this.centroids[i] = this.randomCentroid();
	}

  var change = true;
  while(change) {

    // assign feature vectors to clusters
    change = this.assign();

    // adjust location of centroids
    for (var centroidId = 0; centroidId < this.k; centroidId++) {
      var mean = new Array(maxDim);
      var count = 0;

      // init mean vector
      for (var dim = 0; dim < maxDim; dim++) {
        mean[dim] = 0;
      }

      for (var j = 0; j < len; j++) {
        var maxDim = this.dataset[j].length;

        // if current cluster id is assigned to point
        if (centroidId === this.assignments[j]) {
          for (var dim = 0; dim < maxDim; dim++) {
            mean[dim] += this.dataset[j][dim];
          }
          count++;
        }
      }

      if (count > 0) {
        // if cluster contain points, adjust centroid position
        for (var dim = 0; dim < maxDim; dim++) {
          mean[dim] /= count;
        }
        this.centroids[centroidId] = mean;
      } else {
        // if cluster is empty, generate new random centroid
        this.centroids[centroidId] = this.randomCentroid();
        change = true;
      }
    }
  }

  return this.getClusters();
};

/**
 * Generate random centroid
 *
 * @returns {Array}
 */
KMEANS.prototype.randomCentroid = function() {
  var maxId = this.dataset.length -1;
  var centroid;
  var id;

  do {
    id = Math.round(Math.random() * maxId);
    centroid = this.dataset[id];
  } while (this.centroids.indexOf(centroid) >= 0);

  return centroid;
}

/**
 * Assign points to clusters
 *
 * @returns {boolean}
 */
KMEANS.prototype.assign = function() {
  var change = false;
  var len = this.dataset.length;
  var closestCentroid;

  for (var i = 0; i < len; i++) {
    closestCentroid = this.argmin(this.dataset[i], this.centroids, this.distance);

    if (closestCentroid != this.assignments[i]) {
      this.assignments[i] = closestCentroid;
      change = true;
    }
  }

  return change;
}

/**
 * Extract information about clusters
 *
 * @returns {undefined}
 */
KMEANS.prototype.getClusters = function() {
  var clusters = new Array(this.k);
  var centroidId;

  for (var pointId = 0; pointId < this.assignments.length; pointId++) {
    centroidId = this.assignments[pointId];

    // init empty cluster
    if (typeof clusters[centroidId] === 'undefined') {
      clusters[centroidId] = [];
    }

    clusters[centroidId].push(pointId);
  }

  return clusters;
};

// utils

/**
 * @params {Array} point
 * @params {Array.<Array>} set
 * @params {Function} f
 * @returns {number}
 */
KMEANS.prototype.argmin = function(point, set, f) {
  var min = Number.MAX_VALUE;
  var arg = 0;
  var len = set.length;
  var d;

  for (var i = 0; i < len; i++) {
    d = f(point, set[i]);
    if (d < min) {
      min = d;
      arg = i;
    }
  }

  return arg;
};

/**
 * Euclidean distance
 *
 * @params {number} p
 * @params {number} q
 * @returns {number}
 */
KMEANS.prototype.distance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    var diff = p[i] - q[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = KMEANS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/OPTICS.js":
/*!*******************************************************!*\
  !*** ./node_modules/density-clustering/lib/OPTICS.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * @requires ./PriorityQueue.js
 */

if ( true && module.exports) {
      var PriorityQueue = __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js");
}

/**
 * OPTICS - Ordering points to identify the clustering structure
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * OPTICS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {OPTICS}
 */
function OPTICS(dataset, epsilon, minPts, distanceFunction) {
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 1;
  /** @type {function} */
  this.distance = this._euclideanDistance;

  // temporary variables used during computation

  /** @type {Array} */
  this._reachability = [];
  /** @type {Array} */
  this._processed = [];
  /** @type {number} */
  this._coreDistance = 0;
  /** @type {Array} */
  this._orderedList = [];

  this._init(dataset, epsilon, minPts, distanceFunction);
}

/******************************************************************************/
// pulic functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @returns {undefined}
 * @access public
 */
OPTICS.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0, l = this.dataset.length; pointId < l; pointId++) {
    if (this._processed[pointId] !== 1) {
      this._processed[pointId] = 1;
      this.clusters.push([pointId]);
      var clusterId = this.clusters.length - 1;

      this._orderedList.push(pointId);
      var priorityQueue = new PriorityQueue(null, null, 'asc');
      var neighbors = this._regionQuery(pointId);

      // using priority queue assign elements to new cluster
      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, priorityQueue);
        this._expandCluster(clusterId, priorityQueue);
      }
    }
  }

  return this.clusters;
};

/**
 * Generate reachability plot for all points
 *
 * @returns {array}
 * @access public
 */
OPTICS.prototype.getReachabilityPlot = function() {
  var reachabilityPlot = [];

  for (var i = 0, l = this._orderedList.length; i < l; i++) {
    var pointId = this._orderedList[i];
    var distance = this._reachability[pointId];

    reachabilityPlot.push([pointId, distance]);
  }

  return reachabilityPlot;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this._reachability = new Array(this.dataset.length);
    this._processed = new Array(this.dataset.length);
    this._coreDistance = 0;
    this._orderedList = [];
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Update information in queue
 *
 * @param {number} pointId
 * @param {Array} neighbors
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._updateQueue = function(pointId, neighbors, queue) {
  var self = this;

  this._coreDistance = this._distanceToCore(pointId);
  neighbors.forEach(function(pointId2) {
    if (self._processed[pointId2] === undefined) {
      var dist = self.distance(self.dataset[pointId], self.dataset[pointId2]);
      var newReachableDistance = Math.max(self._coreDistance, dist);

      if (self._reachability[pointId2] === undefined) {
        self._reachability[pointId2] = newReachableDistance;
        queue.insert(pointId2, newReachableDistance);
      } else {
        if (newReachableDistance < self._reachability[pointId2]) {
          self._reachability[pointId2] = newReachableDistance;
          queue.remove(pointId2);
          queue.insert(pointId2, newReachableDistance);
        }
      }
    }
  });
};

/**
 * Expand cluster
 *
 * @param {number} clusterId
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._expandCluster = function(clusterId, queue) {
  var queueElements = queue.getElements();

  for (var p = 0, l = queueElements.length; p < l; p++) {
    var pointId = queueElements[p];
    if (this._processed[pointId] === undefined) {
      var neighbors = this._regionQuery(pointId);
      this._processed[pointId] = 1;

      this.clusters[clusterId].push(pointId);
      this._orderedList.push(pointId);

      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, queue);
        this._expandCluster(clusterId, queue);
      }
    }
  }
};

/**
 * Calculating distance to cluster core
 *
 * @param {number} pointId
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._distanceToCore = function(pointId) {
  var l = this.epsilon;
  for (var coreDistCand = 0; coreDistCand < l; coreDistCand++) {
    var neighbors = this._regionQuery(pointId, coreDistCand);
    if (neighbors.length >= this.minPts) {
      return coreDistCand;
    }
  }

  return;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
OPTICS.prototype._regionQuery = function(pointId, epsilon) {
  epsilon = epsilon || this.epsilon;
  var neighbors = [];

  for (var id = 0, l = this.dataset.length; id < l; id++) {
    if (this.distance(this.dataset[pointId], this.dataset[id]) < epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if ( true && module.exports) {
  module.exports = OPTICS;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/PriorityQueue.js":
/*!**************************************************************!*\
  !*** ./node_modules/density-clustering/lib/PriorityQueue.js ***!
  \**************************************************************/
/***/ ((module) => {

/**
 * PriorityQueue
 * Elements in this queue are sorted according to their value
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * PriorityQueue class construcotr
 * @constructor
 *
 * @example
 * queue: [1,2,3,4]
 * priorities: [4,1,2,3]
 * > result = [1,4,2,3]
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @param {string} sorting - asc / desc
 * @returns {PriorityQueue}
 */
function PriorityQueue(elements, priorities, sorting) {
  /** @type {Array} */
  this._queue = [];
  /** @type {Array} */
  this._priorities = [];
  /** @type {string} */
  this._sorting = 'desc';

  this._init(elements, priorities, sorting);
};

/**
 * Insert element
 *
 * @param {Object} ele
 * @param {Object} priority
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.insert = function(ele, priority) {
  var indexToInsert = this._queue.length;
  var index = indexToInsert;

  while (index--) {
    var priority2 = this._priorities[index];
    if (this._sorting === 'desc') {
      if (priority > priority2) {
        indexToInsert = index;
      }
    } else {
      if (priority < priority2) {
        indexToInsert = index;
      }
    }
  }

  this._insertAt(ele, priority, indexToInsert);
};

/**
 * Remove element
 *
 * @param {Object} ele
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.remove = function(ele) {
  var index = this._queue.length;

  while (index--) {
    var ele2 = this._queue[index];
    if (ele === ele2) {
      this._queue.splice(index, 1);
      this._priorities.splice(index, 1);
      break;
    }
  }
};

/**
 * For each loop wrapper
 *
 * @param {function} func
 * @returs {undefined}
 * @access public
 */
PriorityQueue.prototype.forEach = function(func) {
  this._queue.forEach(func);
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElements = function() {
  return this._queue;
};

/**
 * @param {number} index
 * @returns {Object}
 * @access public
 */
PriorityQueue.prototype.getElementPriority = function(index) {
  return this._priorities[index];
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getPriorities = function() {
  return this._priorities;
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElementsWithPriorities = function() {
  var result = [];

  for (var i = 0, l = this._queue.length; i < l; i++) {
    result.push([this._queue[i], this._priorities[i]]);
  }

  return result;
};

/**
 * Set object properties
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._init = function(elements, priorities, sorting) {

  if (elements && priorities) {
    this._queue = [];
    this._priorities = [];

    if (elements.length !== priorities.length) {
      throw new Error('Arrays must have the same length');
    }

    for (var i = 0; i < elements.length; i++) {
      this.insert(elements[i], priorities[i]);
    }
  }

  if (sorting) {
    this._sorting = sorting;
  }
};

/**
 * Insert element at given position
 *
 * @param {Object} ele
 * @param {number} index
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._insertAt = function(ele, priority, index) {
  if (this._queue.length === index) {
    this._queue.push(ele);
    this._priorities.push(priority);
  } else {
    this._queue.splice(index, 0, ele);
    this._priorities.splice(index, 0, priority);
  }
};

if ( true && module.exports) {
  module.exports = PriorityQueue;
}


/***/ }),

/***/ "./node_modules/density-clustering/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/density-clustering/lib/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if ( true && module.exports) {
    module.exports = {
      DBSCAN: __webpack_require__(/*! ./DBSCAN.js */ "./node_modules/density-clustering/lib/DBSCAN.js"),
      KMEANS: __webpack_require__(/*! ./KMEANS.js */ "./node_modules/density-clustering/lib/KMEANS.js"),
      OPTICS: __webpack_require__(/*! ./OPTICS.js */ "./node_modules/density-clustering/lib/OPTICS.js"),
      PriorityQueue: __webpack_require__(/*! ./PriorityQueue.js */ "./node_modules/density-clustering/lib/PriorityQueue.js")
    };
}


/***/ }),

/***/ "./node_modules/fast-deep-equal/es6/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fast-deep-equal/es6/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst


  var envHasBigInt64Array = typeof BigInt64Array !== 'undefined';


module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/google-maps/lib/esm/loader.js":
/*!****************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
class Loader {
    constructor(apiKey = null, options = {}) {
        this.apiKey = apiKey;
        this.options = options;
        if (typeof window === 'undefined') {
            throw new Error('google-maps is supported only in browser environment');
        }
    }
    load() {
        if (typeof this.api !== 'undefined') {
            return Promise.resolve(this.api);
        }
        if (typeof this.loader !== 'undefined') {
            return this.loader;
        }
        window[Loader.CALLBACK_NAME] = () => {
            this.api = window['google'];
            if (typeof this.resolve === 'undefined') {
                throw new Error('Should not happen');
            }
            this.resolve(this.api);
        };
        window['gm_authFailure'] = () => {
            if (typeof this.reject === 'undefined') {
                throw new Error('Should not happen');
            }
            this.reject(new Error('google-maps: authentication error'));
        };
        return this.loader = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            const script = document.createElement('script');
            script.src = this.createUrl();
            script.async = true;
            script.onerror = (e) => reject(e);
            document.head.appendChild(script);
        });
    }
    createUrl() {
        const parameters = [
            `callback=${Loader.CALLBACK_NAME}`,
        ];
        if (this.apiKey) {
            parameters.push(`key=${this.apiKey}`);
        }
        for (let name in this.options) {
            if (this.options.hasOwnProperty(name)) {
                let value = this.options[name];
                if (name === 'version') {
                    name = 'v';
                }
                if (name === 'libraries') {
                    value = value.join(',');
                }
                parameters.push(`${name}=${value}`);
            }
        }
        return `https://maps.googleapis.com/maps/api/js?${parameters.join('&')}`;
    }
}
Loader.CALLBACK_NAME = '_dk_google_maps_loader_cb';
//# sourceMappingURL=loader.js.map

/***/ }),

/***/ "./node_modules/kdbush/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KDBush)
/* harmony export */ });
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort */ "./node_modules/kdbush/src/sort.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range */ "./node_modules/kdbush/src/range.js");
/* harmony import */ var _within__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./within */ "./node_modules/kdbush/src/within.js");





const defaultGetX = p => p[0];
const defaultGetY = p => p[1];

class KDBush {
    constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
        this.nodeSize = nodeSize;
        this.points = points;

        const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

        const ids = this.ids = new IndexArrayType(points.length);
        const coords = this.coords = new ArrayType(points.length * 2);

        for (let i = 0; i < points.length; i++) {
            ids[i] = i;
            coords[2 * i] = getX(points[i]);
            coords[2 * i + 1] = getY(points[i]);
        }

        (0,_sort__WEBPACK_IMPORTED_MODULE_0__["default"])(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }

    range(minX, minY, maxX, maxY) {
        return (0,_range__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }

    within(x, y, r) {
        return (0,_within__WEBPACK_IMPORTED_MODULE_2__["default"])(this.ids, this.coords, x, y, r, this.nodeSize);
    }
}


/***/ }),

/***/ "./node_modules/kdbush/src/range.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/range.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ range)
/* harmony export */ });

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    let x, y;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}


/***/ }),

/***/ "./node_modules/kdbush/src/sort.js":
/*!*****************************************!*\
  !*** ./node_modules/kdbush/src/sort.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sortKD)
/* harmony export */ });

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;

    const m = (left + right) >> 1;

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        const t = coords[2 * k + inc];
        let i = left;
        let j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) i++;
            while (coords[2 * j + inc] > t) j--;
        }

        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}


/***/ }),

/***/ "./node_modules/kdbush/src/within.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/within.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
/* harmony export */ });

function within(ids, coords, qx, qy, r, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    const r2 = r * r;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        const x = coords[2 * m];
        const y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/skmeans/dist/node/distance.js":
/*!****************************************************!*\
  !*** ./node_modules/skmeans/dist/node/distance.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	/**
  * Euclidean distance
  */
	eudist: function eudist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			var d = (v1[i] || 0) - (v2[i] || 0);
			sum += d * d;
		}
		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},
	mandist: function mandist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			sum += Math.abs((v1[i] || 0) - (v2[i] || 0));
		}

		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},


	/**
  * Unidimensional distance
  */
	dist: function dist(v1, v2, sqrt) {
		var d = Math.abs(v1 - v2);
		return sqrt ? d : d * d;
	}
};
//# sourceMappingURL=distance.js.map


/***/ }),

/***/ "./node_modules/skmeans/dist/node/kinit.js":
/*!*************************************************!*\
  !*** ./node_modules/skmeans/dist/node/kinit.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Distance = __webpack_require__(/*! ./distance.js */ "./node_modules/skmeans/dist/node/distance.js"),
    eudist = Distance.eudist,
    dist = Distance.dist;

module.exports = {
	kmrand: function kmrand(data, k) {
		var map = {},
		    ks = [],
		    t = k << 2;
		var len = data.length;
		var multi = data[0].length > 0;

		while (ks.length < k && t-- > 0) {
			var d = data[Math.floor(Math.random() * len)];
			var key = multi ? d.join("_") : "" + d;
			if (!map[key]) {
				map[key] = true;
				ks.push(d);
			}
		}

		if (ks.length < k) throw new Error("Error initializating clusters");else return ks;
	},


	/**
  * K-means++ initial centroid selection
  */
	kmpp: function kmpp(data, k) {
		var distance = data[0].length ? eudist : dist;
		var ks = [],
		    len = data.length;
		var multi = data[0].length > 0;
		var map = {};

		// First random centroid
		var c = data[Math.floor(Math.random() * len)];
		var key = multi ? c.join("_") : "" + c;
		ks.push(c);
		map[key] = true;

		// Retrieve next centroids
		while (ks.length < k) {
			// Min Distances between current centroids and data points
			var dists = [],
			    lk = ks.length;
			var dsum = 0,
			    prs = [];

			for (var i = 0; i < len; i++) {
				var min = Infinity;
				for (var j = 0; j < lk; j++) {
					var _dist = distance(data[i], ks[j]);
					if (_dist <= min) min = _dist;
				}
				dists[i] = min;
			}

			// Sum all min distances
			for (var _i = 0; _i < len; _i++) {
				dsum += dists[_i];
			}

			// Probabilities and cummulative prob (cumsum)
			for (var _i2 = 0; _i2 < len; _i2++) {
				prs[_i2] = { i: _i2, v: data[_i2], pr: dists[_i2] / dsum, cs: 0 };
			}

			// Sort Probabilities
			prs.sort(function (a, b) {
				return a.pr - b.pr;
			});

			// Cummulative Probabilities
			prs[0].cs = prs[0].pr;
			for (var _i3 = 1; _i3 < len; _i3++) {
				prs[_i3].cs = prs[_i3 - 1].cs + prs[_i3].pr;
			}

			// Randomize
			var rnd = Math.random();

			// Gets only the items whose cumsum >= rnd
			var idx = 0;
			while (idx < len - 1 && prs[idx++].cs < rnd) {}
			ks.push(prs[idx - 1].v);
			/*
   let done = false;
   while(!done) {
   	// this is our new centroid
   	c = prs[idx-1].v
   	key = multi? c.join("_") : `${c}`;
   	if(!map[key]) {
   		map[key] = true;
   		ks.push(c);
   		done = true;
   	}
   	else {
   		idx++;
   	}
   }
   */
		}

		return ks;
	}
};
//# sourceMappingURL=kinit.js.map


/***/ }),

/***/ "./node_modules/skmeans/dist/node/main.js":
/*!************************************************!*\
  !*** ./node_modules/skmeans/dist/node/main.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*jshint esversion: 6 */

var Distance = __webpack_require__(/*! ./distance.js */ "./node_modules/skmeans/dist/node/distance.js"),
    ClusterInit = __webpack_require__(/*! ./kinit.js */ "./node_modules/skmeans/dist/node/kinit.js"),
    eudist = Distance.eudist,
    mandist = Distance.mandist,
    dist = Distance.dist,
    kmrand = ClusterInit.kmrand,
    kmpp = ClusterInit.kmpp;

var MAX = 10000;

/**
 * Inits an array with values
 */
function init(len, val, v) {
	v = v || [];
	for (var i = 0; i < len; i++) {
		v[i] = val;
	}return v;
}

function skmeans(data, k, initial, maxit) {
	var ks = [],
	    old = [],
	    idxs = [],
	    dist = [];
	var conv = false,
	    it = maxit || MAX;
	var len = data.length,
	    vlen = data[0].length,
	    multi = vlen > 0;
	var count = [];

	if (!initial) {
		var _idxs = {};
		while (ks.length < k) {
			var idx = Math.floor(Math.random() * len);
			if (!_idxs[idx]) {
				_idxs[idx] = true;
				ks.push(data[idx]);
			}
		}
	} else if (initial == "kmrand") {
		ks = kmrand(data, k);
	} else if (initial == "kmpp") {
		ks = kmpp(data, k);
	} else {
		ks = initial;
	}

	do {
		// Reset k count
		init(k, 0, count);

		// For each value in data, find the nearest centroid
		for (var i = 0; i < len; i++) {
			var min = Infinity,
			    _idx = 0;
			for (var j = 0; j < k; j++) {
				// Multidimensional or unidimensional
				var dist = multi ? eudist(data[i], ks[j]) : Math.abs(data[i] - ks[j]);
				if (dist <= min) {
					min = dist;
					_idx = j;
				}
			}
			idxs[i] = _idx; // Index of the selected centroid for that value
			count[_idx]++; // Number of values for this centroid
		}

		// Recalculate centroids
		var sum = [],
		    old = [],
		    dif = 0;
		for (var _j = 0; _j < k; _j++) {
			// Multidimensional or unidimensional
			sum[_j] = multi ? init(vlen, 0, sum[_j]) : 0;
			old[_j] = ks[_j];
		}

		// If multidimensional
		if (multi) {
			for (var _j2 = 0; _j2 < k; _j2++) {
				ks[_j2] = [];
			} // Sum values and count for each centroid
			for (var _i = 0; _i < len; _i++) {
				var _idx2 = idxs[_i],
				    // Centroid for that item
				vsum = sum[_idx2],
				    // Sum values for this centroid
				vect = data[_i]; // Current vector

				// Accumulate value on the centroid for current vector
				for (var h = 0; h < vlen; h++) {
					vsum[h] += vect[h];
				}
			}
			// Calculate the average for each centroid
			conv = true;
			for (var _j3 = 0; _j3 < k; _j3++) {
				var ksj = ks[_j3],
				    // Current centroid
				sumj = sum[_j3],
				    // Accumulated centroid values
				oldj = old[_j3],
				    // Old centroid value
				cj = count[_j3]; // Number of elements for this centroid

				// New average
				for (var _h = 0; _h < vlen; _h++) {
					ksj[_h] = sumj[_h] / cj || 0; // New centroid
				}

				// Find if centroids have moved
				if (conv) {
					for (var _h2 = 0; _h2 < vlen; _h2++) {
						if (oldj[_h2] != ksj[_h2]) {
							conv = false;
							break;
						}
					}
				}
			}
		}
		// If unidimensional
		else {
				// Sum values and count for each centroid
				for (var _i2 = 0; _i2 < len; _i2++) {
					var _idx3 = idxs[_i2];
					sum[_idx3] += data[_i2];
				}
				// Calculate the average for each centroid
				for (var _j4 = 0; _j4 < k; _j4++) {
					ks[_j4] = sum[_j4] / count[_j4] || 0; // New centroid
				}
				// Find if centroids have moved
				conv = true;
				for (var _j5 = 0; _j5 < k; _j5++) {
					if (old[_j5] != ks[_j5]) {
						conv = false;
						break;
					}
				}
			}

		conv = conv || --it <= 0;
	} while (!conv);

	return {
		it: MAX - it,
		k: k,
		idxs: idxs,
		centroids: ks
	};
}

module.exports = skmeans;
//# sourceMappingURL=main.js.map


/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Supercluster)
/* harmony export */ });
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/src/index.js");



const defaultOptions = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: props => props // props => ({sum: props.my_value})
};

const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));

class Supercluster {
    constructor(options) {
        this.options = extend(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
    }

    load(points) {
        const {log, minZoom, maxZoom, nodeSize} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        let clusters = [];
        for (let i = 0; i < points.length; i++) {
            if (!points[i].geometry) continue;
            clusters.push(createPointCluster(points[i], i));
        }
        this.trees[maxZoom + 1] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            clusters = this._cluster(clusters, z);
            this.trees[z] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    }

    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));

        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
            return easternHem.concat(westernHem);
        }

        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const clusters = [];
        for (const id of ids) {
            const c = tree.points[id];
            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const index = this.trees[originZoom];
        if (!index) throw new Error(errorMsg);

        const origin = index.points[originId];
        if (!origin) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const ids = index.within(origin.x, origin.y, r);
        const children = [];
        for (const id of ids) {
            const c = index.points[id];
            if (c.parentId === clusterId) {
                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    }

    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    }

    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const {extent, radius} = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;

        const tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.points, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.points, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.points, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    }

    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while (expansionZoom <= this.options.maxZoom) {
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }

    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);

        for (const child of children) {
            const props = child.properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }

        return skipped;
    }

    _addTileFeatures(ids, points, x, y, z2, tile) {
        for (const i of ids) {
            const c = points[i];
            const isCluster = c.numPoints;

            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(c);
                px = c.x;
                py = c.y;
            } else {
                const p = this.points[c.index];
                tags = p.properties;
                px = lngX(p.geometry.coordinates[0]);
                py = latY(p.geometry.coordinates[1]);
            }

            const f = {
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (px * z2 - x)),
                    Math.round(this.options.extent * (py * z2 - y))
                ]],
                tags
            };

            // assign id
            let id;
            if (isCluster) {
                id = c.id;
            } else if (this.options.generateId) {
                // optionally generate id
                id = c.index;
            } else if (this.points[c.index].id) {
                // keep id if already assigned
                id = this.points[c.index].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
    }

    _cluster(points, zoom) {
        const clusters = [];
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));

        // loop through each point
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            // if we've already visited the point at this zoom level, skip it
            if (p.zoom <= zoom) continue;
            p.zoom = zoom;

            // find all nearby points
            const tree = this.trees[zoom + 1];
            const neighborIds = tree.within(p.x, p.y, r);

            const numPointsOrigin = p.numPoints || 1;
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const b = tree.points[neighborId];
                // filter out neighbors that are already processed
                if (b.zoom > zoom) numPoints += b.numPoints || 1;
            }

            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = p.x * numPointsOrigin;
                let wy = p.y * numPointsOrigin;

                let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = (i << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const b = tree.points[neighborId];

                    if (b.zoom <= zoom) continue;
                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = b.numPoints || 1;
                    wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += b.y * numPoints2;

                    b.parentId = id;

                    if (reduce) {
                        if (!clusterProperties) clusterProperties = this._map(p, true);
                        reduce(clusterProperties, this._map(b));
                    }
                }

                p.parentId = id;
                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));

            } else { // left points as unclustered
                clusters.push(p);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const b = tree.points[neighborId];
                        if (b.zoom <= zoom) continue;
                        b.zoom = zoom;
                        clusters.push(b);
                    }
                }
            }
        }

        return clusters;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(point, clone) {
        if (point.numPoints) {
            return clone ? extend({}, point.properties) : point.properties;
        }
        const original = this.points[point.index].properties;
        const result = this.options.map(original);
        return clone && result === original ? extend({}, result) : result;
    }
}

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: fround(x), // weighted cluster center; round for consistency with Float32Array index
        y: fround(y),
        zoom: Infinity, // the last zoom the cluster was processed at
        id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints,
        properties
    };
}

function createPointCluster(p, id) {
    const [x, y] = p.geometry.coordinates;
    return {
        x: fround(lngX(x)), // projected point coordinates
        y: fround(latY(y)),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    const count = cluster.numPoints;
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (const id in src) dest[id] = src[id];
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}


/***/ }),

/***/ "./node_modules/@turf/clone/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@turf/clone/dist/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @name clone
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = turf.clone(line);
 */
function clone(geojson) {
    if (!geojson) {
        throw new Error("geojson is required");
    }
    switch (geojson.type) {
        case "Feature":
            return cloneFeature(geojson);
        case "FeatureCollection":
            return cloneFeatureCollection(geojson);
        case "Point":
        case "LineString":
        case "Polygon":
        case "MultiPoint":
        case "MultiLineString":
        case "MultiPolygon":
        case "GeometryCollection":
            return cloneGeometry(geojson);
        default:
            throw new Error("unknown GeoJSON type");
    }
}
/**
 * Clone Feature
 *
 * @private
 * @param {Feature<any>} geojson GeoJSON Feature
 * @returns {Feature<any>} cloned Feature
 */
function cloneFeature(geojson) {
    var cloned = { type: "Feature" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "properties":
            case "geometry":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add properties & geometry last
    cloned.properties = cloneProperties(geojson.properties);
    cloned.geometry = cloneGeometry(geojson.geometry);
    return cloned;
}
/**
 * Clone Properties
 *
 * @private
 * @param {Object} properties GeoJSON Properties
 * @returns {Object} cloned Properties
 */
function cloneProperties(properties) {
    var cloned = {};
    if (!properties) {
        return cloned;
    }
    Object.keys(properties).forEach(function (key) {
        var value = properties[key];
        if (typeof value === "object") {
            if (value === null) {
                // handle null
                cloned[key] = null;
            }
            else if (Array.isArray(value)) {
                // handle Array
                cloned[key] = value.map(function (item) {
                    return item;
                });
            }
            else {
                // handle generic Object
                cloned[key] = cloneProperties(value);
            }
        }
        else {
            cloned[key] = value;
        }
    });
    return cloned;
}
/**
 * Clone Feature Collection
 *
 * @private
 * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
 * @returns {FeatureCollection<any>} cloned Feature Collection
 */
function cloneFeatureCollection(geojson) {
    var cloned = { type: "FeatureCollection" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "features":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add features
    cloned.features = geojson.features.map(function (feature) {
        return cloneFeature(feature);
    });
    return cloned;
}
/**
 * Clone Geometry
 *
 * @private
 * @param {Geometry<any>} geometry GeoJSON Geometry
 * @returns {Geometry<any>} cloned Geometry
 */
function cloneGeometry(geometry) {
    var geom = { type: geometry.type };
    if (geometry.bbox) {
        geom.bbox = geometry.bbox;
    }
    if (geometry.type === "GeometryCollection") {
        geom.geometries = geometry.geometries.map(function (g) {
            return cloneGeometry(g);
        });
        return geom;
    }
    geom.coordinates = deepSlice(geometry.coordinates);
    return geom;
}
/**
 * Deep Slice coordinates
 *
 * @private
 * @param {Coordinates} coords Coordinates
 * @returns {Coordinates} all coordinates sliced
 */
function deepSlice(coords) {
    var cloned = coords;
    if (typeof cloned[0] !== "object") {
        return cloned.slice();
    }
    return cloned.map(function (coord) {
        return deepSlice(coord);
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clone);


/***/ }),

/***/ "./node_modules/@turf/clusters-dbscan/dist/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/clusters-dbscan/dist/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/clone */ "./node_modules/@turf/clone/dist/es/index.js");
/* harmony import */ var _turf_distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/distance */ "./node_modules/@turf/distance/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var density_clustering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! density-clustering */ "./node_modules/density-clustering/lib/index.js");





/**
 * Takes a set of {@link Point|points} and partition them into clusters according to {@link DBSCAN's|https://en.wikipedia.org/wiki/DBSCAN} data clustering algorithm.
 *
 * @name clustersDbscan
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {number} maxDistance Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mutate=false] Allows GeoJSON input to be mutated
 * @param {number} [options.minPoints=3] Minimum number of points to generate a single cluster,
 * points which do not meet this requirement will be classified as an 'edge' or 'noise'.
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersDbscan(points, maxDistance, options) {
    // Input validation being handled by Typescript
    // collectionOf(points, 'Point', 'points must consist of a FeatureCollection of only Points');
    // if (maxDistance === null || maxDistance === undefined) throw new Error('maxDistance is required');
    // if (!(Math.sign(maxDistance) > 0)) throw new Error('maxDistance is invalid');
    // if (!(minPoints === undefined || minPoints === null || Math.sign(minPoints) > 0)) throw new Error('options.minPoints is invalid');
    if (options === void 0) { options = {}; }
    // Clone points to prevent any mutations
    if (options.mutate !== true)
        points = (0,_turf_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(points);
    // Defaults
    options.minPoints = options.minPoints || 3;
    // create clustered ids
    var dbscan = new density_clustering__WEBPACK_IMPORTED_MODULE_4__.DBSCAN();
    var clusteredIds = dbscan.run((0,_turf_meta__WEBPACK_IMPORTED_MODULE_2__.coordAll)(points), (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_3__.convertLength)(maxDistance, options.units), options.minPoints, _turf_distance__WEBPACK_IMPORTED_MODULE_1__["default"]);
    // Tag points to Clusters ID
    var clusterId = -1;
    clusteredIds.forEach(function (clusterIds) {
        clusterId++;
        // assign cluster ids to input points
        clusterIds.forEach(function (idx) {
            var clusterPoint = points.features[idx];
            if (!clusterPoint.properties)
                clusterPoint.properties = {};
            clusterPoint.properties.cluster = clusterId;
            clusterPoint.properties.dbscan = "core";
        });
    });
    // handle noise points, if any
    // edges points are tagged by DBSCAN as both 'noise' and 'cluster' as they can "reach" less than 'minPoints' number of points
    dbscan.noise.forEach(function (noiseId) {
        var noisePoint = points.features[noiseId];
        if (!noisePoint.properties)
            noisePoint.properties = {};
        if (noisePoint.properties.cluster)
            noisePoint.properties.dbscan = "edge";
        else
            noisePoint.properties.dbscan = "noise";
    });
    return points;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clustersDbscan);


/***/ }),

/***/ "./node_modules/@turf/clusters-kmeans/dist/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/clusters-kmeans/dist/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/clone */ "./node_modules/@turf/clone/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var skmeans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! skmeans */ "./node_modules/skmeans/dist/node/main.js");



/**
 * Takes a set of {@link Point|points} and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @name clustersKmeans
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.numberOfClusters=Math.sqrt(numberOfPoints/2)] numberOfClusters that will be generated
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = turf.clustersKmeans(points, options);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersKmeans(points, options) {
    if (options === void 0) { options = {}; }
    // Default Params
    var count = points.features.length;
    options.numberOfClusters =
        options.numberOfClusters || Math.round(Math.sqrt(count / 2));
    // numberOfClusters can't be greater than the number of points
    // fallbacks to count
    if (options.numberOfClusters > count)
        options.numberOfClusters = count;
    // Clone points to prevent any mutations (enabled by default)
    if (options.mutate !== true)
        points = (0,_turf_clone__WEBPACK_IMPORTED_MODULE_0__["default"])(points);
    // collect points coordinates
    var data = (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.coordAll)(points);
    // create seed to avoid skmeans to drift
    var initialCentroids = data.slice(0, options.numberOfClusters);
    // create skmeans clusters
    var skmeansResult = skmeans__WEBPACK_IMPORTED_MODULE_2__(data, options.numberOfClusters, initialCentroids);
    // store centroids {clusterId: [number, number]}
    var centroids = {};
    skmeansResult.centroids.forEach(function (coord, idx) {
        centroids[idx] = coord;
    });
    // add associated cluster number
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.featureEach)(points, function (point, index) {
        var clusterId = skmeansResult.idxs[index];
        point.properties.cluster = clusterId;
        point.properties.centroid = centroids[clusterId];
    });
    return points;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clustersKmeans);


/***/ }),

/***/ "./node_modules/@turf/distance/dist/es/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@turf/distance/dist/es/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");


//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
/**
 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @name distance
 * @param {Coord | Point} from origin point or coordinate
 * @param {Coord | Point} to destination point or coordinate
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.distance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
    if (options === void 0) { options = {}; }
    var coordinates1 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getCoord)(from);
    var coordinates2 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getCoord)(to);
    var dLat = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[1] - coordinates1[1]);
    var dLon = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[0] - coordinates1[0]);
    var lat1 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates1[1]);
    var lat2 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.degreesToRadians)(coordinates2[1]);
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.radiansToLength)(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (distance);


/***/ }),

/***/ "./node_modules/@turf/helpers/dist/es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@turf/helpers/dist/es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areaFactors": () => (/* binding */ areaFactors),
/* harmony export */   "bearingToAzimuth": () => (/* binding */ bearingToAzimuth),
/* harmony export */   "convertArea": () => (/* binding */ convertArea),
/* harmony export */   "convertLength": () => (/* binding */ convertLength),
/* harmony export */   "degreesToRadians": () => (/* binding */ degreesToRadians),
/* harmony export */   "earthRadius": () => (/* binding */ earthRadius),
/* harmony export */   "factors": () => (/* binding */ factors),
/* harmony export */   "feature": () => (/* binding */ feature),
/* harmony export */   "featureCollection": () => (/* binding */ featureCollection),
/* harmony export */   "geometry": () => (/* binding */ geometry),
/* harmony export */   "geometryCollection": () => (/* binding */ geometryCollection),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "lengthToDegrees": () => (/* binding */ lengthToDegrees),
/* harmony export */   "lengthToRadians": () => (/* binding */ lengthToRadians),
/* harmony export */   "lineString": () => (/* binding */ lineString),
/* harmony export */   "lineStrings": () => (/* binding */ lineStrings),
/* harmony export */   "multiLineString": () => (/* binding */ multiLineString),
/* harmony export */   "multiPoint": () => (/* binding */ multiPoint),
/* harmony export */   "multiPolygon": () => (/* binding */ multiPolygon),
/* harmony export */   "point": () => (/* binding */ point),
/* harmony export */   "points": () => (/* binding */ points),
/* harmony export */   "polygon": () => (/* binding */ polygon),
/* harmony export */   "polygons": () => (/* binding */ polygons),
/* harmony export */   "radiansToDegrees": () => (/* binding */ radiansToDegrees),
/* harmony export */   "radiansToLength": () => (/* binding */ radiansToLength),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "unitsFactors": () => (/* binding */ unitsFactors),
/* harmony export */   "validateBBox": () => (/* binding */ validateBBox),
/* harmony export */   "validateId": () => (/* binding */ validateId)
/* harmony export */ });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius * 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / earthRadius,
    yards: 1.0936133,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}


/***/ }),

/***/ "./node_modules/@turf/invariant/dist/es/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@turf/invariant/dist/es/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectionOf": () => (/* binding */ collectionOf),
/* harmony export */   "containsNumber": () => (/* binding */ containsNumber),
/* harmony export */   "featureOf": () => (/* binding */ featureOf),
/* harmony export */   "geojsonType": () => (/* binding */ geojsonType),
/* harmony export */   "getCoord": () => (/* binding */ getCoord),
/* harmony export */   "getCoords": () => (/* binding */ getCoords),
/* harmony export */   "getGeom": () => (/* binding */ getGeom),
/* harmony export */   "getType": () => (/* binding */ getType)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" &&
            coord.geometry !== null &&
            coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) &&
        coord.length >= 2 &&
        !Array.isArray(coord[0]) &&
        !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[0]) &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            value.type);
    }
}
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            feature.geometry.type);
    }
}
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " +
                name +
                ": must be a " +
                type +
                ", given " +
                feature.geometry.type);
        }
    }
}
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message (unused)
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, _name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}


/***/ }),

/***/ "./node_modules/@turf/meta/dist/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/meta/dist/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coordAll": () => (/* binding */ coordAll),
/* harmony export */   "coordEach": () => (/* binding */ coordEach),
/* harmony export */   "coordReduce": () => (/* binding */ coordReduce),
/* harmony export */   "featureEach": () => (/* binding */ featureEach),
/* harmony export */   "featureReduce": () => (/* binding */ featureReduce),
/* harmony export */   "findPoint": () => (/* binding */ findPoint),
/* harmony export */   "findSegment": () => (/* binding */ findSegment),
/* harmony export */   "flattenEach": () => (/* binding */ flattenEach),
/* harmony export */   "flattenReduce": () => (/* binding */ flattenReduce),
/* harmony export */   "geomEach": () => (/* binding */ geomEach),
/* harmony export */   "geomReduce": () => (/* binding */ geomReduce),
/* harmony export */   "lineEach": () => (/* binding */ lineEach),
/* harmony export */   "lineReduce": () => (/* binding */ lineReduce),
/* harmony export */   "propEach": () => (/* binding */ propEach),
/* harmony export */   "propReduce": () => (/* binding */ propReduce),
/* harmony export */   "segmentEach": () => (/* binding */ segmentEach),
/* harmony export */   "segmentReduce": () => (/* binding */ segmentReduce)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");


/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (
          callback(
            (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geometry, properties, { bbox: bbox, id: id }),
            featureIndex,
            0
          ) === false
        )
          return false;
        return;
    }

    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback((0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (
      coordEach(
        feature,
        function (
          currentCoord,
          coordIndex,
          featureIndexCoord,
          multiPartIndexCoord,
          geometryIndex
        ) {
          // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
          if (
            previousCoords === undefined ||
            featureIndex > previousFeatureIndex ||
            multiPartIndexCoord > previousMultiIndex ||
            geometryIndex > prevGeomIndex
          ) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
            [previousCoords, currentCoord],
            feature.properties
          );
          if (
            callback(
              currentSegment,
              featureIndex,
              multiFeatureIndex,
              geometryIndex,
              segmentIndex
            ) === false
          )
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false
    )
      return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function (
      currentSegment,
      featureIndex,
      multiFeatureIndex,
      geometryIndex,
      segmentIndex
    ) {
      if (started === false && initialValue === undefined)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
  // validation
  if (!geojson) throw new Error("geojson is required");

  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    if (feature.geometry === null) return;
    var type = feature.geometry.type;
    var coords = feature.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (
          var geometryIndex = 0;
          geometryIndex < coords.length;
          geometryIndex++
        ) {
          if (
            callback(
              (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(coords[geometryIndex], feature.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
        }
        break;
    }
  });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find SegmentIndex
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex =
          coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find Coord Index
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex =
          coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/AdeliomMap.ts");
/******/ 	
/******/ })()
;