(()=>{var t={317:t=>{function e(t,e,r,s){this.dataset=[],this.epsilon=1,this.minPts=2,this.distance=this._euclideanDistance,this.clusters=[],this.noise=[],this._visited=[],this._assigned=[],this._datasetLength=0,this._init(t,e,r,s)}e.prototype.run=function(t,e,r,s){this._init(t,e,r,s);for(var i=0;i<this._datasetLength;i++)if(1!==this._visited[i]){this._visited[i]=1;var o=this._regionQuery(i);if(o.length<this.minPts)this.noise.push(i);else{var n=this.clusters.length;this.clusters.push([]),this._addToCluster(i,n),this._expandCluster(n,o)}}return this.clusters},e.prototype._init=function(t,e,r,s){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this.noise=[],this._datasetLength=t.length,this._visited=new Array(this._datasetLength),this._assigned=new Array(this._datasetLength)}e&&(this.epsilon=e),r&&(this.minPts=r),s&&(this.distance=s)},e.prototype._expandCluster=function(t,e){for(var r=0;r<e.length;r++){var s=e[r];if(1!==this._visited[s]){this._visited[s]=1;var i=this._regionQuery(s);i.length>=this.minPts&&(e=this._mergeArrays(e,i))}1!==this._assigned[s]&&this._addToCluster(s,t)}},e.prototype._addToCluster=function(t,e){this.clusters[e].push(t),this._assigned[t]=1},e.prototype._regionQuery=function(t){for(var e=[],r=0;r<this._datasetLength;r++){this.distance(this.dataset[t],this.dataset[r])<this.epsilon&&e.push(r)}return e},e.prototype._mergeArrays=function(t,e){for(var r=e.length,s=0;s<r;s++){var i=e[s];t.indexOf(i)<0&&t.push(i)}return t},e.prototype._euclideanDistance=function(t,e){for(var r=0,s=Math.min(t.length,e.length);s--;)r+=(t[s]-e[s])*(t[s]-e[s]);return Math.sqrt(r)},t.exports&&(t.exports=e)},781:t=>{function e(t,e,r){this.k=3,this.dataset=[],this.assignments=[],this.centroids=[],this.init(t,e,r)}e.prototype.init=function(t,e,r){this.assignments=[],this.centroids=[],void 0!==t&&(this.dataset=t),void 0!==e&&(this.k=e),void 0!==r&&(this.distance=r)},e.prototype.run=function(t,e){this.init(t,e);for(var r=this.dataset.length,s=0;s<this.k;s++)this.centroids[s]=this.randomCentroid();for(var i=!0;i;){i=this.assign();for(var o=0;o<this.k;o++){for(var n=new Array(l),a=0,h=0;h<l;h++)n[h]=0;for(var c=0;c<r;c++){var l=this.dataset[c].length;if(o===this.assignments[c]){for(h=0;h<l;h++)n[h]+=this.dataset[c][h];a++}}if(a>0){for(h=0;h<l;h++)n[h]/=a;this.centroids[o]=n}else this.centroids[o]=this.randomCentroid(),i=!0}}return this.getClusters()},e.prototype.randomCentroid=function(){var t,e,r=this.dataset.length-1;do{e=Math.round(Math.random()*r),t=this.dataset[e]}while(this.centroids.indexOf(t)>=0);return t},e.prototype.assign=function(){for(var t,e=!1,r=this.dataset.length,s=0;s<r;s++)(t=this.argmin(this.dataset[s],this.centroids,this.distance))!=this.assignments[s]&&(this.assignments[s]=t,e=!0);return e},e.prototype.getClusters=function(){for(var t,e=new Array(this.k),r=0;r<this.assignments.length;r++)void 0===e[t=this.assignments[r]]&&(e[t]=[]),e[t].push(r);return e},e.prototype.argmin=function(t,e,r){for(var s,i=Number.MAX_VALUE,o=0,n=e.length,a=0;a<n;a++)(s=r(t,e[a]))<i&&(i=s,o=a);return o},e.prototype.distance=function(t,e){for(var r=0,s=Math.min(t.length,e.length);s--;){var i=t[s]-e[s];r+=i*i}return Math.sqrt(r)},t.exports&&(t.exports=e)},763:(t,e,r)=>{if(t.exports)var s=r(985);function i(t,e,r,s){this.epsilon=1,this.minPts=1,this.distance=this._euclideanDistance,this._reachability=[],this._processed=[],this._coreDistance=0,this._orderedList=[],this._init(t,e,r,s)}i.prototype.run=function(t,e,r,i){this._init(t,e,r,i);for(var o=0,n=this.dataset.length;o<n;o++)if(1!==this._processed[o]){this._processed[o]=1,this.clusters.push([o]);var a=this.clusters.length-1;this._orderedList.push(o);var h=new s(null,null,"asc"),c=this._regionQuery(o);void 0!==this._distanceToCore(o)&&(this._updateQueue(o,c,h),this._expandCluster(a,h))}return this.clusters},i.prototype.getReachabilityPlot=function(){for(var t=[],e=0,r=this._orderedList.length;e<r;e++){var s=this._orderedList[e],i=this._reachability[s];t.push([s,i])}return t},i.prototype._init=function(t,e,r,s){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this._reachability=new Array(this.dataset.length),this._processed=new Array(this.dataset.length),this._coreDistance=0,this._orderedList=[]}e&&(this.epsilon=e),r&&(this.minPts=r),s&&(this.distance=s)},i.prototype._updateQueue=function(t,e,r){var s=this;this._coreDistance=this._distanceToCore(t),e.forEach((function(e){if(void 0===s._processed[e]){var i=s.distance(s.dataset[t],s.dataset[e]),o=Math.max(s._coreDistance,i);void 0===s._reachability[e]?(s._reachability[e]=o,r.insert(e,o)):o<s._reachability[e]&&(s._reachability[e]=o,r.remove(e),r.insert(e,o))}}))},i.prototype._expandCluster=function(t,e){for(var r=e.getElements(),s=0,i=r.length;s<i;s++){var o=r[s];if(void 0===this._processed[o]){var n=this._regionQuery(o);this._processed[o]=1,this.clusters[t].push(o),this._orderedList.push(o),void 0!==this._distanceToCore(o)&&(this._updateQueue(o,n,e),this._expandCluster(t,e))}}},i.prototype._distanceToCore=function(t){for(var e=this.epsilon,r=0;r<e;r++){if(this._regionQuery(t,r).length>=this.minPts)return r}},i.prototype._regionQuery=function(t,e){e=e||this.epsilon;for(var r=[],s=0,i=this.dataset.length;s<i;s++)this.distance(this.dataset[t],this.dataset[s])<e&&r.push(s);return r},i.prototype._euclideanDistance=function(t,e){for(var r=0,s=Math.min(t.length,e.length);s--;)r+=(t[s]-e[s])*(t[s]-e[s]);return Math.sqrt(r)},t.exports&&(t.exports=i)},985:t=>{function e(t,e,r){this._queue=[],this._priorities=[],this._sorting="desc",this._init(t,e,r)}e.prototype.insert=function(t,e){for(var r=this._queue.length,s=r;s--;){var i=this._priorities[s];"desc"===this._sorting?e>i&&(r=s):e<i&&(r=s)}this._insertAt(t,e,r)},e.prototype.remove=function(t){for(var e=this._queue.length;e--;){if(t===this._queue[e]){this._queue.splice(e,1),this._priorities.splice(e,1);break}}},e.prototype.forEach=function(t){this._queue.forEach(t)},e.prototype.getElements=function(){return this._queue},e.prototype.getElementPriority=function(t){return this._priorities[t]},e.prototype.getPriorities=function(){return this._priorities},e.prototype.getElementsWithPriorities=function(){for(var t=[],e=0,r=this._queue.length;e<r;e++)t.push([this._queue[e],this._priorities[e]]);return t},e.prototype._init=function(t,e,r){if(t&&e){if(this._queue=[],this._priorities=[],t.length!==e.length)throw new Error("Arrays must have the same length");for(var s=0;s<t.length;s++)this.insert(t[s],e[s])}r&&(this._sorting=r)},e.prototype._insertAt=function(t,e,r){this._queue.length===r?(this._queue.push(t),this._priorities.push(e)):(this._queue.splice(r,0,t),this._priorities.splice(r,0,e))},t.exports&&(t.exports=e)},606:(t,e,r)=>{t.exports&&(t.exports={DBSCAN:r(317),KMEANS:r(781),OPTICS:r(763),PriorityQueue:r(985)})},991:t=>{"use strict";t.exports=function t(e,r){if(e===r)return!0;if(e&&r&&"object"==typeof e&&"object"==typeof r){if(e.constructor!==r.constructor)return!1;var s,i,o;if(Array.isArray(e)){if((s=e.length)!=r.length)return!1;for(i=s;0!=i--;)if(!t(e[i],r[i]))return!1;return!0}if(e instanceof Map&&r instanceof Map){if(e.size!==r.size)return!1;for(i of e.entries())if(!r.has(i[0]))return!1;for(i of e.entries())if(!t(i[1],r.get(i[0])))return!1;return!0}if(e instanceof Set&&r instanceof Set){if(e.size!==r.size)return!1;for(i of e.entries())if(!r.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(r)){if((s=e.length)!=r.length)return!1;for(i=s;0!=i--;)if(e[i]!==r[i])return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();if((s=(o=Object.keys(e)).length)!==Object.keys(r).length)return!1;for(i=s;0!=i--;)if(!Object.prototype.hasOwnProperty.call(r,o[i]))return!1;for(i=s;0!=i--;){var n=o[i];if(!t(e[n],r[n]))return!1}return!0}return e!=e&&r!=r}},697:t=>{"use strict";t.exports={eudist:function(t,e,r){for(var s=t.length,i=0,o=0;o<s;o++){var n=(t[o]||0)-(e[o]||0);i+=n*n}return r?Math.sqrt(i):i},mandist:function(t,e,r){for(var s=t.length,i=0,o=0;o<s;o++)i+=Math.abs((t[o]||0)-(e[o]||0));return r?Math.sqrt(i):i},dist:function(t,e,r){var s=Math.abs(t-e);return r?s:s*s}}},35:(t,e,r)=>{"use strict";var s=r(697),i=s.eudist,o=s.dist;t.exports={kmrand:function(t,e){for(var r={},s=[],i=e<<2,o=t.length,n=t[0].length>0;s.length<e&&i-- >0;){var a=t[Math.floor(Math.random()*o)],h=n?a.join("_"):""+a;r[h]||(r[h]=!0,s.push(a))}if(s.length<e)throw new Error("Error initializating clusters");return s},kmpp:function(t,e){var r=t[0].length?i:o,s=[],n=t.length,a=t[0].length>0,h=t[Math.floor(Math.random()*n)];a&&h.join("_");for(s.push(h);s.length<e;){for(var c=[],l=s.length,u=0,p=[],d=0;d<n;d++){for(var f=1/0,m=0;m<l;m++){var g=r(t[d],s[m]);g<=f&&(f=g)}c[d]=f}for(var v=0;v<n;v++)u+=c[v];for(var _=0;_<n;_++)p[_]={i:_,v:t[_],pr:c[_]/u,cs:0};p.sort((function(t,e){return t.pr-e.pr})),p[0].cs=p[0].pr;for(var y=1;y<n;y++)p[y].cs=p[y-1].cs+p[y].pr;for(var C=Math.random(),k=0;k<n-1&&p[k++].cs<C;);s.push(p[k-1].v)}return s}}},160:(t,e,r)=>{"use strict";var s=r(697),i=r(35),o=s.eudist,n=(s.mandist,s.dist,i.kmrand),a=i.kmpp;function h(t,e,r){r=r||[];for(var s=0;s<t;s++)r[s]=e;return r}t.exports=function(t,e,r,s){var i=[],c=[],l=[],u=[],p=!1,d=s||1e4,f=t.length,m=t[0].length,g=m>0,v=[];if(r)i="kmrand"==r?n(t,e):"kmpp"==r?a(t,e):r;else for(var _={};i.length<e;){var y=Math.floor(Math.random()*f);_[y]||(_[y]=!0,i.push(t[y]))}do{h(e,0,v);for(var C=0;C<f;C++){for(var k=1/0,M=0,w=0;w<e;w++){(u=g?o(t[C],i[w]):Math.abs(t[C]-i[w]))<=k&&(k=u,M=w)}l[C]=M,v[M]++}for(var b=[],S=(c=[],0);S<e;S++)b[S]=g?h(m,0,b[S]):0,c[S]=i[S];if(g){for(var E=0;E<e;E++)i[E]=[];for(var A=0;A<f;A++)for(var P=b[l[A]],x=t[A],L=0;L<m;L++)P[L]+=x[L];p=!0;for(var O=0;O<e;O++){for(var B=i[O],I=b[O],D=c[O],T=v[O],q=0;q<m;q++)B[q]=I[q]/T||0;if(p)for(var j=0;j<m;j++)if(D[j]!=B[j]){p=!1;break}}}else{for(var U=0;U<f;U++){b[l[U]]+=t[U]}for(var N=0;N<e;N++)i[N]=b[N]/v[N]||0;p=!0;for(var Z=0;Z<e;Z++)if(c[Z]!=i[Z]){p=!1;break}}p=p||--d<=0}while(!p);return{it:1e4-d,k:e,idxs:l,centroids:i}}}},e={};function r(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var s={};(()=>{"use strict";r.d(s,{I:()=>h});const t={apiKey:"apiKey",apiOptions:"apiOptions",map:{selector:"mapSelector",defaultCenter:"mapDefaultCenter",autoCenter:"mapAutoCenter",defaultZoom:"mapDefaultZoom",provider:"mapProvider",checkSize:"checkMapSize",useClusters:"mapUseClusters",clusterIconUrl:"mapClusterIconUrl",clusterIconSize:"mapClusterIconSize",clusterParams:"mapClusterParams",markers:"mapMarkers",markerIconUrl:"mapMarkerIconUrl",markerHoveredIconUrl:"mapMarkerHoveredIconUrl",markerSelectedIconUrl:"mapMarkerSelectedIconUrl",markerIconSize:"mapMarkerIconSize",markerIconCentered:"markerIconCentered",displayMarkers:"mapDisplayMarkers",displayInfoWindows:"mapDisplayInfoWindows",allowMultipleMarkersSelected:"mapAllowMultipleMarkersSelected",infoWindowTemplate:"mapInfoWindowTemplate",centerMarkerOnClick:"mapCenterMarkerOnClick",zoomMarkerOnClick:"mapZoomMarkerOnClick",animation:"mapAnimation",showPlaces:"mapShowPlaces",type:"mapType",replaceInfoWindowContentWithMarkerData:"mapInfoWindowReplaceWithMarkerData",customStyles:"mapCustomStyles",customZoomPlusSelector:"mapCustomZoomPlusSelector",customZoomMinusSelector:"mapCustomZoomMinusSelector",controls:{zoomButtons:"mapEnableZoomButtons",streetViewButton:"mapEnableStreetView",fullscreenButton:"mapEnableFullscreenButton",mapTypeButtons:"mapEnableTypeButtons",displayScale:"mapDisplayScale",rotateControl:"mapRotate"}},list:{selector:"mapListSelector",eltTemplate:"mapListEltTemplate",centerMarkerOnClick:"mapListCenterMarkerOnClick",replaceWithMarkerData:"mapListReplaceWithMarkerData"},places:{selector:"placesSelector",options:"placesOptions",mapOptions:"placesMapOptions"},geolocation:{selector:"geolocationSelector",options:"geolocationOptions"},rgpd:{askForConsent:"mapAskForConsent",defaultConsentValue:"mapConsentDefaultValue",buttonMessage:"mapConsentButtonMessage"}};class e{constructor(t=null,e={}){if(this.apiKey=t,this.options=e,"undefined"==typeof window)throw new Error("google-maps is supported only in browser environment")}load(){return void 0!==this.api?Promise.resolve(this.api):void 0!==this.loader?this.loader:(window[e.CALLBACK_NAME]=()=>{if(this.api=window.google,void 0===this.resolve)throw new Error("Should not happen");this.resolve(this.api)},window.gm_authFailure=()=>{if(void 0===this.reject)throw new Error("Should not happen");this.reject(new Error("google-maps: authentication error"))},this.loader=new Promise(((t,e)=>{this.resolve=t,this.reject=e;const r=document.createElement("script");r.src=this.createUrl(),r.async=!0,r.onerror=t=>e(t),document.head.appendChild(r)})))}createUrl(){const t=[`callback=${e.CALLBACK_NAME}`];this.apiKey&&t.push(`key=${this.apiKey}`);for(let e in this.options)if(this.options.hasOwnProperty(e)){let r=this.options[e];"version"===e&&(e="v"),"libraries"===e&&(r=r.join(",")),t.push(`${e}=${r}`)}return`https://maps.googleapis.com/maps/api/js?${t.join("&")}`}}e.CALLBACK_NAME="_dk_google_maps_loader_cb";r(160);r(606);Math.fround||(i=new Float32Array(1));var i;r(991);var o;!function(t){t.CLUSTERING_BEGIN="clusteringbegin",t.CLUSTERING_END="clusteringend",t.CLUSTER_CLICK="click"}(o||(o={}));"".concat(t.apiKey," not provided"),"Need to provide ".concat(t.map.selector," option"),"No element found with matching selector provided in ".concat(t.map.selector);var n="adeliom-map",a="".concat(n,"-list");"".concat(n,"-consent-screen"),"".concat(n,"-consent-button"),"".concat(a,"-elt-opened"),"".concat(n,"-no-consent"),"".concat(a,"-no-consent");var h={map:{hasAutoCentered:"mapHasAutoCentered",mapLoaded:"mapLoaded",reset:"mapReset",clear:"mapCleared",typeChanged:"mapTypeChanged",consentNotGiven:"mapConsentNotGiven",consentGiven:"mapConsentGiven",customMinusZoom:"mapCustomMinusZoom",customPlusZoom:"mapCustomPlusZoom",customZoom:"mapCustomZoom"},places:{selectedPlaceHasBeenCentered:"selectedPlaceHasBeenCentered",selectedPlaceHasBeenFound:"selectedPlaceHasBeenFound",fieldHasBeenFocused:"fieldHasBeenFocused",fieldHasBeenBlurred:"fieldHasBeenBlurred"},geolocation:{success:"geolocationSuccess",error:"geolocationError",centered:"geolocationCentered"},clusters:{enabled:"clustersEnabled",disabled:"clustersDisabled"},markers:{allCreated:"allMarkerCreated",created:"markerCreated",dataCreated:"markerDataCreated",clicked:"markerClicked",geolocationClicked:"markerGeolocationClicked"},infoWindows:{created:"infoWindowCreated"},listElements:{created:"listEltCreated",clicked:"listEltClicked"},rgpd:{consentButtonClicked:"consentButtonClicked"}}})()})();