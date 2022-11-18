(()=>{var t={317:t=>{function e(t,e,r,i){this.dataset=[],this.epsilon=1,this.minPts=2,this.distance=this._euclideanDistance,this.clusters=[],this.noise=[],this._visited=[],this._assigned=[],this._datasetLength=0,this._init(t,e,r,i)}e.prototype.run=function(t,e,r,i){this._init(t,e,r,i);for(var s=0;s<this._datasetLength;s++)if(1!==this._visited[s]){this._visited[s]=1;var n=this._regionQuery(s);if(n.length<this.minPts)this.noise.push(s);else{var o=this.clusters.length;this.clusters.push([]),this._addToCluster(s,o),this._expandCluster(o,n)}}return this.clusters},e.prototype._init=function(t,e,r,i){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this.noise=[],this._datasetLength=t.length,this._visited=new Array(this._datasetLength),this._assigned=new Array(this._datasetLength)}e&&(this.epsilon=e),r&&(this.minPts=r),i&&(this.distance=i)},e.prototype._expandCluster=function(t,e){for(var r=0;r<e.length;r++){var i=e[r];if(1!==this._visited[i]){this._visited[i]=1;var s=this._regionQuery(i);s.length>=this.minPts&&(e=this._mergeArrays(e,s))}1!==this._assigned[i]&&this._addToCluster(i,t)}},e.prototype._addToCluster=function(t,e){this.clusters[e].push(t),this._assigned[t]=1},e.prototype._regionQuery=function(t){for(var e=[],r=0;r<this._datasetLength;r++){this.distance(this.dataset[t],this.dataset[r])<this.epsilon&&e.push(r)}return e},e.prototype._mergeArrays=function(t,e){for(var r=e.length,i=0;i<r;i++){var s=e[i];t.indexOf(s)<0&&t.push(s)}return t},e.prototype._euclideanDistance=function(t,e){for(var r=0,i=Math.min(t.length,e.length);i--;)r+=(t[i]-e[i])*(t[i]-e[i]);return Math.sqrt(r)},t.exports&&(t.exports=e)},781:t=>{function e(t,e,r){this.k=3,this.dataset=[],this.assignments=[],this.centroids=[],this.init(t,e,r)}e.prototype.init=function(t,e,r){this.assignments=[],this.centroids=[],void 0!==t&&(this.dataset=t),void 0!==e&&(this.k=e),void 0!==r&&(this.distance=r)},e.prototype.run=function(t,e){this.init(t,e);for(var r=this.dataset.length,i=0;i<this.k;i++)this.centroids[i]=this.randomCentroid();for(var s=!0;s;){s=this.assign();for(var n=0;n<this.k;n++){for(var o=new Array(p),a=0,h=0;h<p;h++)o[h]=0;for(var u=0;u<r;u++){var p=this.dataset[u].length;if(n===this.assignments[u]){for(h=0;h<p;h++)o[h]+=this.dataset[u][h];a++}}if(a>0){for(h=0;h<p;h++)o[h]/=a;this.centroids[n]=o}else this.centroids[n]=this.randomCentroid(),s=!0}}return this.getClusters()},e.prototype.randomCentroid=function(){var t,e,r=this.dataset.length-1;do{e=Math.round(Math.random()*r),t=this.dataset[e]}while(this.centroids.indexOf(t)>=0);return t},e.prototype.assign=function(){for(var t,e=!1,r=this.dataset.length,i=0;i<r;i++)(t=this.argmin(this.dataset[i],this.centroids,this.distance))!=this.assignments[i]&&(this.assignments[i]=t,e=!0);return e},e.prototype.getClusters=function(){for(var t,e=new Array(this.k),r=0;r<this.assignments.length;r++)void 0===e[t=this.assignments[r]]&&(e[t]=[]),e[t].push(r);return e},e.prototype.argmin=function(t,e,r){for(var i,s=Number.MAX_VALUE,n=0,o=e.length,a=0;a<o;a++)(i=r(t,e[a]))<s&&(s=i,n=a);return n},e.prototype.distance=function(t,e){for(var r=0,i=Math.min(t.length,e.length);i--;){var s=t[i]-e[i];r+=s*s}return Math.sqrt(r)},t.exports&&(t.exports=e)},763:(t,e,r)=>{if(t.exports)var i=r(985);function s(t,e,r,i){this.epsilon=1,this.minPts=1,this.distance=this._euclideanDistance,this._reachability=[],this._processed=[],this._coreDistance=0,this._orderedList=[],this._init(t,e,r,i)}s.prototype.run=function(t,e,r,s){this._init(t,e,r,s);for(var n=0,o=this.dataset.length;n<o;n++)if(1!==this._processed[n]){this._processed[n]=1,this.clusters.push([n]);var a=this.clusters.length-1;this._orderedList.push(n);var h=new i(null,null,"asc"),u=this._regionQuery(n);void 0!==this._distanceToCore(n)&&(this._updateQueue(n,u,h),this._expandCluster(a,h))}return this.clusters},s.prototype.getReachabilityPlot=function(){for(var t=[],e=0,r=this._orderedList.length;e<r;e++){var i=this._orderedList[e],s=this._reachability[i];t.push([i,s])}return t},s.prototype._init=function(t,e,r,i){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this._reachability=new Array(this.dataset.length),this._processed=new Array(this.dataset.length),this._coreDistance=0,this._orderedList=[]}e&&(this.epsilon=e),r&&(this.minPts=r),i&&(this.distance=i)},s.prototype._updateQueue=function(t,e,r){var i=this;this._coreDistance=this._distanceToCore(t),e.forEach((function(e){if(void 0===i._processed[e]){var s=i.distance(i.dataset[t],i.dataset[e]),n=Math.max(i._coreDistance,s);void 0===i._reachability[e]?(i._reachability[e]=n,r.insert(e,n)):n<i._reachability[e]&&(i._reachability[e]=n,r.remove(e),r.insert(e,n))}}))},s.prototype._expandCluster=function(t,e){for(var r=e.getElements(),i=0,s=r.length;i<s;i++){var n=r[i];if(void 0===this._processed[n]){var o=this._regionQuery(n);this._processed[n]=1,this.clusters[t].push(n),this._orderedList.push(n),void 0!==this._distanceToCore(n)&&(this._updateQueue(n,o,e),this._expandCluster(t,e))}}},s.prototype._distanceToCore=function(t){for(var e=this.epsilon,r=0;r<e;r++){if(this._regionQuery(t,r).length>=this.minPts)return r}},s.prototype._regionQuery=function(t,e){e=e||this.epsilon;for(var r=[],i=0,s=this.dataset.length;i<s;i++)this.distance(this.dataset[t],this.dataset[i])<e&&r.push(i);return r},s.prototype._euclideanDistance=function(t,e){for(var r=0,i=Math.min(t.length,e.length);i--;)r+=(t[i]-e[i])*(t[i]-e[i]);return Math.sqrt(r)},t.exports&&(t.exports=s)},985:t=>{function e(t,e,r){this._queue=[],this._priorities=[],this._sorting="desc",this._init(t,e,r)}e.prototype.insert=function(t,e){for(var r=this._queue.length,i=r;i--;){var s=this._priorities[i];"desc"===this._sorting?e>s&&(r=i):e<s&&(r=i)}this._insertAt(t,e,r)},e.prototype.remove=function(t){for(var e=this._queue.length;e--;){if(t===this._queue[e]){this._queue.splice(e,1),this._priorities.splice(e,1);break}}},e.prototype.forEach=function(t){this._queue.forEach(t)},e.prototype.getElements=function(){return this._queue},e.prototype.getElementPriority=function(t){return this._priorities[t]},e.prototype.getPriorities=function(){return this._priorities},e.prototype.getElementsWithPriorities=function(){for(var t=[],e=0,r=this._queue.length;e<r;e++)t.push([this._queue[e],this._priorities[e]]);return t},e.prototype._init=function(t,e,r){if(t&&e){if(this._queue=[],this._priorities=[],t.length!==e.length)throw new Error("Arrays must have the same length");for(var i=0;i<t.length;i++)this.insert(t[i],e[i])}r&&(this._sorting=r)},e.prototype._insertAt=function(t,e,r){this._queue.length===r?(this._queue.push(t),this._priorities.push(e)):(this._queue.splice(r,0,t),this._priorities.splice(r,0,e))},t.exports&&(t.exports=e)},606:(t,e,r)=>{t.exports&&(t.exports={DBSCAN:r(317),KMEANS:r(781),OPTICS:r(763),PriorityQueue:r(985)})},991:t=>{"use strict";t.exports=function t(e,r){if(e===r)return!0;if(e&&r&&"object"==typeof e&&"object"==typeof r){if(e.constructor!==r.constructor)return!1;var i,s,n;if(Array.isArray(e)){if((i=e.length)!=r.length)return!1;for(s=i;0!=s--;)if(!t(e[s],r[s]))return!1;return!0}if(e instanceof Map&&r instanceof Map){if(e.size!==r.size)return!1;for(s of e.entries())if(!r.has(s[0]))return!1;for(s of e.entries())if(!t(s[1],r.get(s[0])))return!1;return!0}if(e instanceof Set&&r instanceof Set){if(e.size!==r.size)return!1;for(s of e.entries())if(!r.has(s[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(r)){if((i=e.length)!=r.length)return!1;for(s=i;0!=s--;)if(e[s]!==r[s])return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();if((i=(n=Object.keys(e)).length)!==Object.keys(r).length)return!1;for(s=i;0!=s--;)if(!Object.prototype.hasOwnProperty.call(r,n[s]))return!1;for(s=i;0!=s--;){var o=n[s];if(!t(e[o],r[o]))return!1}return!0}return e!=e&&r!=r}},697:t=>{"use strict";t.exports={eudist:function(t,e,r){for(var i=t.length,s=0,n=0;n<i;n++){var o=(t[n]||0)-(e[n]||0);s+=o*o}return r?Math.sqrt(s):s},mandist:function(t,e,r){for(var i=t.length,s=0,n=0;n<i;n++)s+=Math.abs((t[n]||0)-(e[n]||0));return r?Math.sqrt(s):s},dist:function(t,e,r){var i=Math.abs(t-e);return r?i:i*i}}},35:(t,e,r)=>{"use strict";var i=r(697),s=i.eudist,n=i.dist;t.exports={kmrand:function(t,e){for(var r={},i=[],s=e<<2,n=t.length,o=t[0].length>0;i.length<e&&s-- >0;){var a=t[Math.floor(Math.random()*n)],h=o?a.join("_"):""+a;r[h]||(r[h]=!0,i.push(a))}if(i.length<e)throw new Error("Error initializating clusters");return i},kmpp:function(t,e){var r=t[0].length?s:n,i=[],o=t.length,a=t[0].length>0,h=t[Math.floor(Math.random()*o)];a&&h.join("_");for(i.push(h);i.length<e;){for(var u=[],p=i.length,l=0,c=[],d=0;d<o;d++){for(var f=1/0,m=0;m<p;m++){var v=r(t[d],i[m]);v<=f&&(f=v)}u[d]=f}for(var g=0;g<o;g++)l+=u[g];for(var _=0;_<o;_++)c[_]={i:_,v:t[_],pr:u[_]/l,cs:0};c.sort((function(t,e){return t.pr-e.pr})),c[0].cs=c[0].pr;for(var y=1;y<o;y++)c[y].cs=c[y-1].cs+c[y].pr;for(var C=Math.random(),k=0;k<o-1&&c[k++].cs<C;);i.push(c[k-1].v)}return i}}},160:(t,e,r)=>{"use strict";var i=r(697),s=r(35),n=i.eudist,o=(i.mandist,i.dist,s.kmrand),a=s.kmpp;function h(t,e,r){r=r||[];for(var i=0;i<t;i++)r[i]=e;return r}t.exports=function(t,e,r,i){var s=[],u=[],p=[],l=[],c=!1,d=i||1e4,f=t.length,m=t[0].length,v=m>0,g=[];if(r)s="kmrand"==r?o(t,e):"kmpp"==r?a(t,e):r;else for(var _={};s.length<e;){var y=Math.floor(Math.random()*f);_[y]||(_[y]=!0,s.push(t[y]))}do{h(e,0,g);for(var C=0;C<f;C++){for(var k=1/0,M=0,w=0;w<e;w++){(l=v?n(t[C],s[w]):Math.abs(t[C]-s[w]))<=k&&(k=l,M=w)}p[C]=M,g[M]++}for(var b=[],A=(u=[],0);A<e;A++)b[A]=v?h(m,0,b[A]):0,u[A]=s[A];if(v){for(var E=0;E<e;E++)s[E]=[];for(var S=0;S<f;S++)for(var x=b[p[S]],L=t[S],O=0;O<m;O++)x[O]+=L[O];c=!0;for(var D=0;D<e;D++){for(var P=s[D],I=b[D],q=u[D],j=g[D],B=0;B<m;B++)P[B]=I[B]/j||0;if(c)for(var T=0;T<m;T++)if(q[T]!=P[T]){c=!1;break}}}else{for(var U=0;U<f;U++){b[p[U]]+=t[U]}for(var z=0;z<e;z++)s[z]=b[z]/g[z]||0;c=!0;for(var W=0;W<e;W++)if(u[W]!=s[W]){c=!1;break}}c=c||--d<=0}while(!c);return{it:1e4-d,k:e,idxs:p,centroids:s}}}},e={};function r(i){var s=e[i];if(void 0!==s)return s.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};(()=>{"use strict";r.d(i,{I:()=>h});const t={apiKey:"apiKey",apiOptions:"apiOptions",map:{selector:"mapSelector",defaultCenter:"mapDefaultCenter",autoCenter:"mapAutoCenter",defaultZoom:"mapDefaultZoom",provider:"mapProvider",checkSize:"checkMapSize",useClusters:"mapUseClusters",clusterIconUrl:"mapClusterIconUrl",clusterIconSize:"mapClusterIconSize",clusterParams:"mapClusterParams",markers:"mapMarkers",markerIconUrl:"mapMarkerIconUrl",markerHoveredIconUrl:"mapMarkerHoveredIconUrl",markerSelectedIconUrl:"mapMarkerSelectedIconUrl",markerIconSize:"mapMarkerIconSize",displayMarkers:"mapDisplayMarkers",displayInfoWindows:"mapDisplayInfoWindows",allowMultipleMarkersSelected:"mapAllowMultipleMarkersSelected",infoWindowTemplate:"mapInfoWindowTemplate",centerMarkerOnClick:"mapCenterMarkerOnClick",zoomMarkerOnClick:"mapZoomMarkerOnClick",animation:"mapAnimation",showPlaces:"mapShowPlaces",replaceInfoWindowContentWithMarkerData:"mapInfoWindowReplaceWithMarkerData",customStyles:"mapCustomStyles",controls:{zoomButtons:"mapEnableZoomButtons",streetViewButton:"mapEnableStreetView",fullscreenButton:"mapEnableFullscreenButton",mapTypeButtons:"mapEnableTypeButtons",displayScale:"mapDisplayScale",rotateControl:"mapRotate"}},list:{selector:"mapListSelector",eltTemplate:"mapListEltTemplate",centerMarkerOnClick:"mapListCenterMarkerOnClick",replaceWithMarkerData:"mapListReplaceWithMarkerData"},rgpd:{askForConsent:"mapAskForConsent",defaultConsentValue:"mapConsentDefaultValue",buttonMessage:"mapConsentButtonMessage"}};class e{constructor(t=null,e={}){if(this.apiKey=t,this.options=e,"undefined"==typeof window)throw new Error("google-maps is supported only in browser environment")}load(){return void 0!==this.api?Promise.resolve(this.api):void 0!==this.loader?this.loader:(window[e.CALLBACK_NAME]=()=>{if(this.api=window.google,void 0===this.resolve)throw new Error("Should not happen");this.resolve(this.api)},window.gm_authFailure=()=>{if(void 0===this.reject)throw new Error("Should not happen");this.reject(new Error("google-maps: authentication error"))},this.loader=new Promise(((t,e)=>{this.resolve=t,this.reject=e;const r=document.createElement("script");r.src=this.createUrl(),r.async=!0,r.onerror=t=>e(t),document.head.appendChild(r)})))}createUrl(){const t=[`callback=${e.CALLBACK_NAME}`];this.apiKey&&t.push(`key=${this.apiKey}`);for(let e in this.options)if(this.options.hasOwnProperty(e)){let r=this.options[e];"version"===e&&(e="v"),"libraries"===e&&(r=r.join(",")),t.push(`${e}=${r}`)}return`https://maps.googleapis.com/maps/api/js?${t.join("&")}`}}e.CALLBACK_NAME="_dk_google_maps_loader_cb";r(160);r(606);Math.fround||(s=new Float32Array(1));var s;r(991);var n;!function(t){t.CLUSTERING_BEGIN="clusteringbegin",t.CLUSTERING_END="clusteringend",t.CLUSTER_CLICK="click"}(n||(n={}));"".concat(t.apiKey," not provided"),"Need to provide ".concat(t.map.selector," option"),"No element found with matching selector provided in ".concat(t.map.selector);var o="adeliom-map",a="".concat(o,"-list");"".concat(o,"-consent-screen"),"".concat(o,"-consent-button"),"".concat(a,"-elt-opened"),"".concat(o,"-no-consent"),"".concat(a,"-no-consent");var h={map:{hasAutoCentered:"mapHasAutoCentered",mapLoaded:"mapLoaded"},clusters:{enabled:"clustersEnabled",disabled:"clustersDisabled"},markers:{allCreated:"allMarkerCreated",created:"markerCreated",dataCreated:"markerDataCreated",clicked:"markerClicked"},infoWindows:{created:"infoWindowCreated"},listElements:{created:"listEltCreated",clicked:"listEltClicked"},rgpd:{consentButtonClicked:"consentButtonClicked"}}})()})();