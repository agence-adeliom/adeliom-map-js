/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/@googlemaps/markerclusterer/dist/index.esm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractAlgorithm": () => (/* binding */ AbstractAlgorithm),
/* harmony export */   "AbstractViewportAlgorithm": () => (/* binding */ AbstractViewportAlgorithm),
/* harmony export */   "Cluster": () => (/* binding */ Cluster),
/* harmony export */   "ClusterStats": () => (/* binding */ ClusterStats),
/* harmony export */   "DefaultRenderer": () => (/* binding */ DefaultRenderer),
/* harmony export */   "GridAlgorithm": () => (/* binding */ GridAlgorithm),
/* harmony export */   "MarkerClusterer": () => (/* binding */ MarkerClusterer),
/* harmony export */   "MarkerClustererEvents": () => (/* binding */ MarkerClustererEvents),
/* harmony export */   "MarkerUtils": () => (/* binding */ MarkerUtils),
/* harmony export */   "NoopAlgorithm": () => (/* binding */ NoopAlgorithm),
/* harmony export */   "SuperClusterAlgorithm": () => (/* binding */ SuperClusterAlgorithm),
/* harmony export */   "SuperClusterViewportAlgorithm": () => (/* binding */ SuperClusterViewportAlgorithm),
/* harmony export */   "defaultOnClusterClickHandler": () => (/* binding */ defaultOnClusterClickHandler),
/* harmony export */   "distanceBetweenPoints": () => (/* binding */ distanceBetweenPoints),
/* harmony export */   "extendBoundsToPaddedViewport": () => (/* binding */ extendBoundsToPaddedViewport),
/* harmony export */   "extendPixelBounds": () => (/* binding */ extendPixelBounds),
/* harmony export */   "filterMarkersToPaddedViewport": () => (/* binding */ filterMarkersToPaddedViewport),
/* harmony export */   "getPaddedViewport": () => (/* binding */ getPaddedViewport),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "pixelBoundsToLatLngBounds": () => (/* binding */ pixelBoundsToLatLngBounds)
/* harmony export */ });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js");



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
 * Copyright 2023 Google LLC
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
 * util class that creates a common set of convenience functions to wrap
 * shared behavior of Advanced Markers and Markers.
 */
class MarkerUtils {
    static isAdvancedMarkerAvailable(map) {
        return (google.maps.marker &&
            map.getMapCapabilities().isAdvancedMarkersAvailable === true);
    }
    static isAdvancedMarker(marker) {
        return (google.maps.marker &&
            marker instanceof google.maps.marker.AdvancedMarkerElement);
    }
    static setMap(marker, map) {
        if (this.isAdvancedMarker(marker)) {
            marker.map = map;
        }
        else {
            marker.setMap(map);
        }
    }
    static getPosition(marker) {
        // SuperClusterAlgorithm.calculate expects a LatLng instance so we fake it for Adv Markers
        if (this.isAdvancedMarker(marker)) {
            if (marker.position) {
                if (marker.position instanceof google.maps.LatLng) {
                    return marker.position;
                }
                // since we can't cast to LatLngLiteral for reasons =(
                if (marker.position.lat && marker.position.lng) {
                    return new google.maps.LatLng(marker.position.lat, marker.position.lng);
                }
            }
            return new google.maps.LatLng(null);
        }
        return marker.getPosition();
    }
    static getVisible(marker) {
        if (this.isAdvancedMarker(marker)) {
            /**
             * Always return true for Advanced Markers because the clusterer
             * uses getVisible as a way to count legacy markers not as an actual
             * indicator of visibility for some reason. Even when markers are hidden
             * Marker.getVisible returns `true` and this is used to set the marker count
             * on the cluster. See the behavior of Cluster.count
             */
            return true;
        }
        return marker.getVisible();
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
            return;
        }
        const bounds = new google.maps.LatLngBounds(this._position, this._position);
        for (const marker of this.markers) {
            bounds.extend(MarkerUtils.getPosition(marker));
        }
        return bounds;
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
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
            MarkerUtils.setMap(this.marker, null);
            this.marker = undefined;
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
/**
 * Returns the markers visible in a padded map viewport
 *
 * @param map
 * @param mapCanvasProjection
 * @param markers The list of marker to filter
 * @param viewportPaddingPixels The padding in pixel
 * @returns The list of markers in the padded viewport
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPaddingPixels) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPaddingPixels);
    return markers.filter((marker) => extendedMapBounds.contains(MarkerUtils.getPosition(marker)));
};
/**
 * Extends a bounds by a number of pixels in each direction
 */
const extendBoundsToPaddedViewport = (bounds, projection, numPixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, numPixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * Gets the extended bounds as a bbox [westLng, southLat, eastLng, northLat]
 */
const getPaddedViewport = (bounds, projection, pixels) => {
    const extended = extendBoundsToPaddedViewport(bounds, projection, pixels);
    const ne = extended.getNorthEast();
    const sw = extended.getSouthWest();
    return [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
};
/**
 * Returns the distance between 2 positions.
 *
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const a = sinDLat * sinDLat +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            sinDLon *
            sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * Converts a LatLng bound to pixels.
 *
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * Extends a pixel bounds by numPixels in all directions.
 *
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, numPixels) => {
    northEast.x += numPixels;
    northEast.y -= numPixels;
    southWest.x -= numPixels;
    southWest.y += numPixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const sw = projection.fromDivPixelToLatLng(southWest);
    const ne = projection.fromDivPixelToLatLng(northEast);
    return new google.maps.LatLngBounds(sw, ne);
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
     *      return this.noop({markers})
     *    }
     * }
     * ```
     */
    noop({ markers, }) {
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
        position: MarkerUtils.getPosition(marker),
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
        this.state = { zoom: -1 };
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        const state = { zoom: map.getZoom() };
        let changed = false;
        if (this.state.zoom >= this.maxZoom && state.zoom >= this.maxZoom) ;
        else {
            changed = !fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(this.state, state);
        }
        this.state = state;
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                }),
                changed,
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
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), MarkerUtils.getPosition(marker).toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(MarkerUtils.getPosition(marker))) {
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
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.state = { zoom: -1 };
        this.superCluster = new supercluster__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({ maxZoom: this.maxZoom, radius }, options));
    }
    calculate(input) {
        let changed = false;
        const state = { zoom: input.map.getZoom() };
        if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                const position = MarkerUtils.getPosition(marker);
                const coordinates = [position.lng(), position.lat()];
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates,
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        if (!changed) {
            if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
                changed = !fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(this.state, state);
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
            .map((feature) => this.transformCluster(feature));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: { lat, lng },
            });
        }
        const marker = properties.marker;
        return new Cluster({
            markers: [marker],
            position: MarkerUtils.getPosition(marker),
        });
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
class SuperClusterViewportAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60, viewportPadding = 60 } = _a, options = __rest(_a, ["maxZoom", "radius", "viewportPadding"]);
        super({ maxZoom, viewportPadding });
        this.superCluster = new supercluster__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({ maxZoom: this.maxZoom, radius }, options));
        this.state = { zoom: -1, view: [0, 0, 0, 0] };
    }
    calculate(input) {
        const state = {
            zoom: Math.round(input.map.getZoom()),
            view: getPaddedViewport(input.map.getBounds(), input.mapCanvasProjection, this.viewportPadding),
        };
        let changed = !fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(this.state, state);
        if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                const position = MarkerUtils.getPosition(marker);
                const coordinates = [position.lng(), position.lat()];
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates,
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        if (changed) {
            this.clusters = this.cluster(input);
            this.state = state;
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map, mapCanvasProjection }) {
        /* recalculate new state because we can't use the cached version. */
        const state = {
            zoom: Math.round(map.getZoom()),
            view: getPaddedViewport(map.getBounds(), mapCanvasProjection, this.viewportPadding),
        };
        return this.superCluster
            .getClusters(state.view, state.zoom)
            .map((feature) => this.transformCluster(feature));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: { lat, lng },
            });
        }
        const marker = properties.marker;
        return new Cluster({
            markers: [marker],
            position: MarkerUtils.getPosition(marker),
        });
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
    render({ count, position }, stats, map) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg literal with fill color
        const svg = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
</svg>`;
        const title = `Cluster of ${count} markers`, 
        // adjust zIndex to be above other markers
        zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
        if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
            // create cluster SVG element
            const parser = new DOMParser();
            const svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
            svgEl.setAttribute("transform", "translate(0 25)");
            const clusterOptions = {
                map,
                position,
                zIndex,
                title,
                content: svgEl,
            };
            return new google.maps.marker.AdvancedMarkerElement(clusterOptions);
        }
        const clusterOptions = {
            position,
            zIndex,
            title,
            icon: {
                url: `data:image/svg+xml;base64,${btoa(svg)}`,
                anchor: new google.maps.Point(25, 25),
            },
        };
        return new google.maps.Marker(clusterOptions);
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
    constructor({ map, markers = [], algorithmOptions = {}, algorithm = new SuperClusterAlgorithm(algorithmOptions), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
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
        MarkerUtils.setMap(marker, null);
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
        if (map instanceof google.maps.Map && map.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // Allow algorithms to return flag on whether the clusters/markers have changed.
            if (changed || changed == undefined) {
                // Accumulate the markers of the clusters composed of a single marker.
                // Those clusters directly use the marker.
                // Clusters with more than one markers use a group marker generated by a renderer.
                const singleMarker = new Set();
                for (const cluster of clusters) {
                    if (cluster.markers.length == 1) {
                        singleMarker.add(cluster.markers[0]);
                    }
                }
                const groupMarkers = [];
                // Iterate the clusters that are currently rendered.
                for (const cluster of this.clusters) {
                    if (cluster.marker == null) {
                        continue;
                    }
                    if (cluster.markers.length == 1) {
                        if (!singleMarker.has(cluster.marker)) {
                            // The marker:
                            // - was previously rendered because it is from a cluster with 1 marker,
                            // - should no more be rendered as it is not in singleMarker.
                            MarkerUtils.setMap(cluster.marker, null);
                        }
                    }
                    else {
                        // Delay the removal of old group markers to avoid flickering.
                        groupMarkers.push(cluster.marker);
                    }
                }
                this.clusters = clusters;
                this.renderClusters();
                // Delayed removal of the markers of the former groups.
                requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
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
        this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // Generate stats to pass to renderers.
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                // Generate the marker to represent the group.
                cluster.marker = this.renderer.render(cluster, stats, map);
                // Make sure all individual markers are removed from the map.
                cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            MarkerUtils.setMap(cluster.marker, map);
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
  var markerImg = document.createElement('img');
  markerImg.src = url;
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
      var element = document.createElement('div');
      element.textContent = String(count);
      element.style.color = fontColor;
      element.style.height = "".concat(iconSize, "px");
      element.style.width = "".concat(iconSize, "px");
      element.style.fontSize = "".concat(fontSize, "px");
      element.style.display = 'flex';
      element.style.justifyContent = 'center';
      element.style.alignItems = 'center';
      element.style.backgroundColor = defaultIconColor;
      element.style.borderRadius = '50%';
      var options = {
        position: position,
        content: element
      };
      // @ts-ignore
      console.log(google.maps.marker.AdvancedMarkerElement);
      // @ts-ignore
      return new google.maps.marker.AdvancedMarkerElement(options);
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
            lat: marker.position.lat,
            lng: marker.position.lng
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
            if (iconSize) {
              size = iconSize;
            } else {
              size = _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconSize];
            }
            if (_this.google) {
              var iconImg = document.createElement('img');
              iconImg.src = url;
              iconImg.setAttribute('height', size.toString());
              iconImg.setAttribute('width', size.toString());
              return iconImg;
            }
            return null;
          },
          /**
           * Sets the idle icon to the provided marker
           * @param marker
           * @private
           */
          _setIdleIcon: function _setIdleIcon(marker) {
            var _a;
            var idleIcon = _this.helpers.markers._getIdleIconForMarker(marker);
            if (!_this.helpers.markers._isMarkerSelected(marker) && idleIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.content.src = (_a = _this.helpers.google.markers._getIconConfig(idleIcon, iconSize, iconCentered)) === null || _a === void 0 ? void 0 : _a.src;
            }
          },
          /**
           * Sets the selected icon to the provided marker
           * @param marker
           * @private
           */
          _setSelectedIcon: function _setSelectedIcon(marker) {
            var _a;
            var selectedIcon = _this.helpers.markers._getSelectedIconForMarker(marker);
            if (selectedIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.content.src = (_a = _this.helpers.google.markers._getIconConfig(selectedIcon, iconSize, iconCentered)) === null || _a === void 0 ? void 0 : _a.src;
            }
          },
          /**
           * Sets the hover icon to the provided marker
           * @param marker
           * @private
           */
          _setHoveredIcon: function _setHoveredIcon(marker) {
            var _a;
            var hoveredIcon = _this.helpers.markers._getHoveredIconForMarker(marker);
            if (!_this.helpers.markers._isMarkerSelected(marker) && hoveredIcon) {
              var iconSize = _this.helpers.markers._getIconSizeForMarker(marker);
              var iconCentered = _this.helpers.markers._getIconCenteredForMarker(marker);
              marker.content.src = (_a = _this.helpers.google.markers._getIconConfig(hoveredIcon, iconSize, iconCentered)) === null || _a === void 0 ? void 0 : _a.src;
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
              if (markerData.hasInteraction) {
                // Listener to handle mouseover (change icon)
                markerInstance.content.addEventListener('mouseenter', function () {
                  var _a;
                  if (!markerData.isFakeCluster) {
                    _this.helpers.google.markers._setHoveredIcon(markerInstance);
                  } else if ((_a = markerData.fakeClusterMarkers) === null || _a === void 0 ? void 0 : _a.length) {
                    markerInstance.setIcon(_this.helpers.google.clusters._getHoveredIcon(markerData.fakeClusterMarkers.length));
                  }
                });
                // Listener to handle mouseout (change icon)
                markerInstance.content.addEventListener('mouseout', function () {
                  var _a;
                  if (!markerData.isFakeCluster) {
                    _this.helpers.google.markers._setIdleIcon(markerInstance);
                  } else if ((_a = markerData.fakeClusterMarkers) === null || _a === void 0 ? void 0 : _a.length) {
                    markerInstance.setIcon(_this.helpers.google.clusters._getBasicIcon(markerData.fakeClusterMarkers.length));
                  }
                });
              }
              // Listener to handle marker click
              _this.google.maps.event.addListener(markerInstance, 'click', function () {
                _this._handleClickMarker(markerInstance);
              });
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
              markerConfig.content = _this.helpers.google.markers._getIconConfig(url, iconSize, iconCentered);
              markerData.icon = markerRawData.icon;
            } else if (_this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl]) {
              var _url = markerRawData.isGeolocation && _this.helpers.geolocation._getMarkerIcon() ? _this.helpers.geolocation._getMarkerIcon() : _this.options[_optionKeys__WEBPACK_IMPORTED_MODULE_1__["default"].map.markerIconUrl];
              if (!markerRawData.isFakeCluster) {
                markerConfig.content = _this.helpers.google.markers._getIconConfig(_url, iconSize, iconCentered);
              } else if ((_c = markerData.fakeClusterMarkers) === null || _c === void 0 ? void 0 : _c.length) {
                var markersCount = markerData.fakeClusterMarkers.length;
                markerConfig.content = _this.helpers.google.clusters._getBasicIcon(markersCount);
                // markerConfig.label = {
                //     text: markerData.fakeClusterMarkers.length.toString(),
                //     color: this.helpers.google.clusters._getFontColor(markersCount),
                //     fontSize: this.helpers.google.clusters._getFontSize(markersCount),
                // }
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
              // Marker instanciation
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
          var _a, _b;
          var currentLabel = (_b = (_a = cluster === null || cluster === void 0 ? void 0 : cluster.marker) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.textContent;
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

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {



// do not edit .js files directly - edit src/index.jst



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

/***/ "./node_modules/kdbush/index.js":
/*!**************************************!*\
  !*** ./node_modules/kdbush/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KDBush)
/* harmony export */ });

const ARRAY_TYPES = [
    Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array,
    Int32Array, Uint32Array, Float32Array, Float64Array
];

/** @typedef {Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor} TypedArrayConstructor */

const VERSION = 1; // serialized format version
const HEADER_SIZE = 8;

class KDBush {

    /**
     * Creates an index from raw `ArrayBuffer` data.
     * @param {ArrayBuffer} data
     */
    static from(data) {
        if (!(data instanceof ArrayBuffer)) {
            throw new Error('Data must be an instance of ArrayBuffer.');
        }
        const [magic, versionAndType] = new Uint8Array(data, 0, 2);
        if (magic !== 0xdb) {
            throw new Error('Data does not appear to be in a KDBush format.');
        }
        const version = versionAndType >> 4;
        if (version !== VERSION) {
            throw new Error(`Got v${version} data when expected v${VERSION}.`);
        }
        const ArrayType = ARRAY_TYPES[versionAndType & 0x0f];
        if (!ArrayType) {
            throw new Error('Unrecognized array type.');
        }
        const [nodeSize] = new Uint16Array(data, 2, 1);
        const [numItems] = new Uint32Array(data, 4, 1);

        return new KDBush(numItems, nodeSize, ArrayType, data);
    }

    /**
     * Creates an index that will hold a given number of items.
     * @param {number} numItems
     * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
     * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
     * @param {ArrayBuffer} [data] (For internal use only)
     */
    constructor(numItems, nodeSize = 64, ArrayType = Float64Array, data) {
        if (isNaN(numItems) || numItems < 0) throw new Error(`Unpexpected numItems value: ${numItems}.`);

        this.numItems = +numItems;
        this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
        this.ArrayType = ArrayType;
        this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;

        const arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
        const coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
        const idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
        const padCoords = (8 - idsByteSize % 8) % 8;

        if (arrayTypeIndex < 0) {
            throw new Error(`Unexpected typed array class: ${ArrayType}.`);
        }

        if (data && (data instanceof ArrayBuffer)) { // reconstruct an index from a buffer
            this.data = data;
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = numItems * 2;
            this._finished = true;
        } else { // initialize a new index
            this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = 0;
            this._finished = false;

            // set header
            new Uint8Array(this.data, 0, 2).set([0xdb, (VERSION << 4) + arrayTypeIndex]);
            new Uint16Array(this.data, 2, 1)[0] = nodeSize;
            new Uint32Array(this.data, 4, 1)[0] = numItems;
        }
    }

    /**
     * Add a point to the index.
     * @param {number} x
     * @param {number} y
     * @returns {number} An incremental index associated with the added item (starting from `0`).
     */
    add(x, y) {
        const index = this._pos >> 1;
        this.ids[index] = index;
        this.coords[this._pos++] = x;
        this.coords[this._pos++] = y;
        return index;
    }

    /**
     * Perform indexing of the added points.
     */
    finish() {
        const numAdded = this._pos >> 1;
        if (numAdded !== this.numItems) {
            throw new Error(`Added ${numAdded} items when expected ${this.numItems}.`);
        }
        // kd-sort both arrays for efficient search
        sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);

        this._finished = true;
        return this;
    }

    /**
     * Search the index for items within a given bounding box.
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @returns {number[]} An array of indices correponding to the found items.
     */
    range(minX, minY, maxX, maxY) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');

        const {ids, coords, nodeSize} = this;
        const stack = [0, ids.length - 1, 0];
        const result = [];

        // recursively search for items in range in the kd-sorted arrays
        while (stack.length) {
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;

            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for (let i = left; i <= right; i++) {
                    const x = coords[2 * i];
                    const y = coords[2 * i + 1];
                    if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
                }
                continue;
            }

            // otherwise find the middle index
            const m = (left + right) >> 1;

            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

            // queue search in halves that intersect the query
            if (axis === 0 ? minX <= x : minY <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? maxX >= x : maxY >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }

        return result;
    }

    /**
     * Search the index for items within a given radius.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @returns {number[]} An array of indices correponding to the found items.
     */
    within(qx, qy, r) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');

        const {ids, coords, nodeSize} = this;
        const stack = [0, ids.length - 1, 0];
        const result = [];
        const r2 = r * r;

        // recursively search for items within radius in the kd-sorted arrays
        while (stack.length) {
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;

            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for (let i = left; i <= right; i++) {
                    if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
                }
                continue;
            }

            // otherwise find the middle index
            const m = (left + right) >> 1;

            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

            // queue search in halves that intersect the query
            if (axis === 0 ? qx - r <= x : qy - r <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? qx + r >= x : qy + r >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }

        return result;
    }
}

/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} nodeSize
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */
function sort(ids, coords, nodeSize, left, right, axis) {
    if (right - left <= nodeSize) return;

    const m = (left + right) >> 1; // middle index

    // sort ids and coords around the middle index so that the halves lie
    // either left/right or top/bottom correspondingly (taking turns)
    select(ids, coords, m, left, right, axis);

    // recursively kd-sort first half and second half on the opposite axis
    sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
    sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}

/**
 * Custom Floyd-Rivest selection algorithm: sort ids and coords so that
 * [left..k-1] items are smaller than k-th item (on either x or y axis)
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} k
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */
function select(ids, coords, k, left, right, axis) {

    while (right > left) {
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, axis);
        }

        const t = coords[2 * k + axis];
        let i = left;
        let j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + axis] < t) i++;
            while (coords[2 * j + axis] > t) j--;
        }

        if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} i
 * @param {number} j
 */
function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

/**
 * @param {InstanceType<TypedArrayConstructor>} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

/**
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 */
function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Supercluster)
/* harmony export */ });
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/index.js");



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

const OFFSET_ZOOM = 2;
const OFFSET_ID = 3;
const OFFSET_PARENT = 4;
const OFFSET_NUM = 5;
const OFFSET_PROP = 6;

class Supercluster {
    constructor(options) {
        this.options = Object.assign(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
        this.stride = this.options.reduce ? 7 : 6;
        this.clusterProps = [];
    }

    load(points) {
        const {log, minZoom, maxZoom} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        const data = [];

        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (!p.geometry) continue;

            const [lng, lat] = p.geometry.coordinates;
            const x = fround(lngX(lng));
            const y = fround(latY(lat));
            // store internal point/cluster data in flat numeric arrays for performance
            data.push(
                x, y, // projected point coordinates
                Infinity, // the last zoom the point was processed at
                i, // index of the source feature in the original input array
                -1, // parent cluster id
                1 // number of points in a cluster
            );
            if (this.options.reduce) data.push(0); // noop
        }
        let tree = this.trees[maxZoom + 1] = this._createTree(data);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            tree = this.trees[z] = this._createTree(this._cluster(tree, z));

            if (log) console.log('z%d: %d clusters in %dms', z, tree.numItems, +Date.now() - now);
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
        const data = tree.data;
        const clusters = [];
        for (const id of ids) {
            const k = this.stride * id;
            clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const tree = this.trees[originZoom];
        if (!tree) throw new Error(errorMsg);

        const data = tree.data;
        if (originId * this.stride >= data.length) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const x = data[originId * this.stride];
        const y = data[originId * this.stride + 1];
        const ids = tree.within(x, y, r);
        const children = [];
        for (const id of ids) {
            const k = id * this.stride;
            if (data[k + OFFSET_PARENT] === clusterId) {
                children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
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
            tree.data, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.data, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.data, -1, y, z2, tile);
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

    _createTree(data) {
        const tree = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](data.length / this.stride | 0, this.options.nodeSize, Float32Array);
        for (let i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
        tree.finish();
        tree.data = data;
        return tree;
    }

    _addTileFeatures(ids, data, x, y, z2, tile) {
        for (const i of ids) {
            const k = i * this.stride;
            const isCluster = data[k + OFFSET_NUM] > 1;

            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(data, k, this.clusterProps);
                px = data[k];
                py = data[k + 1];
            } else {
                const p = this.points[data[k + OFFSET_ID]];
                tags = p.properties;
                const [lng, lat] = p.geometry.coordinates;
                px = lngX(lng);
                py = latY(lat);
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
            if (isCluster || this.options.generateId) {
                // optionally generate id for points
                id = data[k + OFFSET_ID];
            } else {
                // keep id if already assigned
                id = this.points[data[k + OFFSET_ID]].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
    }

    _cluster(tree, zoom) {
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));
        const data = tree.data;
        const nextData = [];
        const stride = this.stride;

        // loop through each point
        for (let i = 0; i < data.length; i += stride) {
            // if we've already visited the point at this zoom level, skip it
            if (data[i + OFFSET_ZOOM] <= zoom) continue;
            data[i + OFFSET_ZOOM] = zoom;

            // find all nearby points
            const x = data[i];
            const y = data[i + 1];
            const neighborIds = tree.within(data[i], data[i + 1], r);

            const numPointsOrigin = data[i + OFFSET_NUM];
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const k = neighborId * stride;
                // filter out neighbors that are already processed
                if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
            }

            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = x * numPointsOrigin;
                let wy = y * numPointsOrigin;

                let clusterProperties;
                let clusterPropIndex = -1;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const k = neighborId * stride;

                    if (data[k + OFFSET_ZOOM] <= zoom) continue;
                    data[k + OFFSET_ZOOM] = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = data[k + OFFSET_NUM];
                    wx += data[k] * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += data[k + 1] * numPoints2;

                    data[k + OFFSET_PARENT] = id;

                    if (reduce) {
                        if (!clusterProperties) {
                            clusterProperties = this._map(data, i, true);
                            clusterPropIndex = this.clusterProps.length;
                            this.clusterProps.push(clusterProperties);
                        }
                        reduce(clusterProperties, this._map(data, k));
                    }
                }

                data[i + OFFSET_PARENT] = id;
                nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
                if (reduce) nextData.push(clusterPropIndex);

            } else { // left points as unclustered
                for (let j = 0; j < stride; j++) nextData.push(data[i + j]);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const k = neighborId * stride;
                        if (data[k + OFFSET_ZOOM] <= zoom) continue;
                        data[k + OFFSET_ZOOM] = zoom;
                        for (let j = 0; j < stride; j++) nextData.push(data[k + j]);
                    }
                }
            }
        }

        return nextData;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(data, i, clone) {
        if (data[i + OFFSET_NUM] > 1) {
            const props = this.clusterProps[data[i + OFFSET_PROP]];
            return clone ? Object.assign({}, props) : props;
        }
        const original = this.points[data[i + OFFSET_ID]].properties;
        const result = this.options.map(original);
        return clone && result === original ? Object.assign({}, result) : result;
    }
}

function getClusterJSON(data, i, clusterProps) {
    return {
        type: 'Feature',
        id: data[i + OFFSET_ID],
        properties: getClusterProperties(data, i, clusterProps),
        geometry: {
            type: 'Point',
            coordinates: [xLng(data[i]), yLat(data[i + 1])]
        }
    };
}

function getClusterProperties(data, i, clusterProps) {
    const count = data[i + OFFSET_NUM];
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    const propIndex = data[i + OFFSET_PROP];
    const properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
    return Object.assign(properties, {
        cluster: true,
        cluster_id: data[i + OFFSET_ID],
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