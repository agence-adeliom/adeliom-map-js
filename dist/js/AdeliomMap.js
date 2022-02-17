/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/js/AdeliomMap.js":
/*!******************************!*\
  !*** ./src/js/AdeliomMap.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdeliomMap)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! google-maps */ "./node_modules/google-maps/lib/esm/loader.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var mapCustomClass = 'adeliom-map-js';
var smoothAnim = 'smooth';
var defaultAnim = 'default';
var keys = {};
keys.apiKey = 'apiKey';
keys.map = {};
keys.map.selector = 'mapSelector';
keys.map.defaultCenter = 'mapDefaultCenter';
keys.map.defaultZoom = 'mapDefaultZoom';
keys.map.provider = 'mapProvider';
keys.map.checkSize = 'checkMapSize';
keys.map.markers = 'mapMarkers';
keys.map.displayMarkers = 'mapDisplayMarkers';
keys.map.displayInfoWindows = 'mapDisplayInfoWindows';
keys.map.allowMultipleInfoWindow = 'mapAllowMultipleInfoWindow';
keys.map.infoWindowTemplate = 'mapInfoWindowTemplate';
keys.map.centerMarkerOnClick = 'mapCenterMarkerOnClick';
keys.map.animation = 'mapAnimation';
keys.map.controls = {};
keys.map.controls.zoomButtons = 'mapEnableZoomButtons';
keys.map.controls.streetViewButton = 'mapEnableStreetView';
keys.map.controls.fullscreenButton = 'mapEnableFullscreenButton';
keys.map.controls.mapTypeButtons = 'mapEnableTypeButtons';
keys.map.controls.displayScale = 'mapDisplayScale';
keys.map.controls.rotateControl = 'mapRotate';
keys.list = {};
keys.list.selector = 'mapListSelector';
keys.list.eltTemplate = 'mapListEltTemplate';
keys.list.centerMarkerOnClick = 'mapListCenterMarkerOnClick';
var defaultOptions = {};
defaultOptions[keys.map.selector] = null;
defaultOptions[keys.list.selector] = null;
defaultOptions[keys.apiKey] = null;
defaultOptions[keys.map.checkSize] = false;
defaultOptions[keys.map.allowMultipleInfoWindow] = true;
defaultOptions[keys.map.defaultCenter] = {
  lat: 48.614782,
  lng: 7.714012
};
defaultOptions[keys.map.defaultZoom] = 12;
defaultOptions[keys.map.provider] = 'google';
defaultOptions[keys.map.displayMarkers] = true;
defaultOptions[keys.map.displayInfoWindows] = true;
defaultOptions[keys.map.infoWindowTemplate] = '';
defaultOptions[keys.map.centerMarkerOnClick] = true;
defaultOptions[keys.map.animation] = smoothAnim;
defaultOptions[keys.map.controls.zoomButtons] = false;
defaultOptions[keys.map.controls.streetViewButton] = false;
defaultOptions[keys.map.controls.fullscreenButton] = false;
defaultOptions[keys.map.controls.mapTypeButtons] = false;
defaultOptions[keys.map.controls.displayScale] = false;
defaultOptions[keys.map.controls.rotateControl] = false;
defaultOptions[keys.list.eltTemplate] = '';
defaultOptions[keys.list.centerMarkerOnClick] = true;

var AdeliomMap = /*#__PURE__*/function () {
  function AdeliomMap(options) {
    var _this$options$keys$ma,
        _this$options$keys$ma2,
        _this = this;

    _classCallCheck(this, AdeliomMap);

    this.defaultOptions = defaultOptions;
    this.google = null;
    this.mapContainer = null;
    this.map = null;
    this.mapListContainer = null;
    this.mapList = null;
    this.mapListEltTemplate = null;
    this.options = Object.assign(this.defaultOptions, options);
    this.markers = (_this$options$keys$ma = this.options[keys.map.markers]) !== null && _this$options$keys$ma !== void 0 ? _this$options$keys$ma : [];
    this.displayMarkers = (_this$options$keys$ma2 = this.options[keys.map.displayMarkers]) !== null && _this$options$keys$ma2 !== void 0 ? _this$options$keys$ma2 : false;
    this.markersData = [];

    if (this.options[keys.apiKey]) {
      this._initMap().then(function () {
        if (_this.displayMarkers) {
          _this._initMarkers();
        }
      });
    } else {
      console.error("".concat(keys.apiKey, " not provided"));
    }
  }

  _createClass(AdeliomMap, [{
    key: "_initMap",
    value: function () {
      var _initMap2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.options[keys.map.selector]) {
                  _context.next = 19;
                  break;
                }

                this.mapContainer = document.querySelector(this.options[keys.map.selector]);

                if (this.options[keys.list.selector]) {
                  this.mapListContainer = document.querySelector(this.options[keys.list.selector]);

                  if (this.options[keys.list.eltTemplate]) {
                    this.mapListEltTemplate = this.options[keys.list.eltTemplate];
                  }
                }

                if (!this.mapContainer) {
                  _context.next = 16;
                  break;
                }

                this._addMapCustomClass();

                if (!(!this.options[keys.map.checkSize] || this.mapContainer.clientHeight !== 0 && this.mapContainer.clientWidth !== 0)) {
                  _context.next = 13;
                  break;
                }

                _context.t0 = this.options[keys.map.provider];
                _context.next = _context.t0 === 'google' ? 9 : 9;
                break;

              case 9:
                _context.next = 11;
                return this._initGoogleMap(this.mapContainer);

              case 11:
                _context.next = 14;
                break;

              case 13:
                console.error("".concat(this.options[keys.map.selector], " height and/or width is equal to 0"));

              case 14:
                _context.next = 17;
                break;

              case 16:
                console.error("".concat(this.options[keys.map.selector], " not found"));

              case 17:
                _context.next = 20;
                break;

              case 19:
                console.error("Need to provide ".concat(keys.map.selector, " option"));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _initMap() {
        return _initMap2.apply(this, arguments);
      }

      return _initMap;
    }()
  }, {
    key: "_initGoogleMap",
    value: function () {
      var _initGoogleMap2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(container) {
        var loader;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                loader = new google_maps__WEBPACK_IMPORTED_MODULE_1__.Loader(this.options.apiKey);
                _context2.next = 3;
                return loader.load();

              case 3:
                this.google = _context2.sent;
                this.map = new this.google.maps.Map(container, {
                  center: this.options[keys.map.defaultCenter],
                  zoom: this.options[keys.map.defaultZoom],
                  zoomControl: this.options[keys.map.controls.zoomButtons],
                  streetViewControl: this.options[keys.map.controls.streetViewButton],
                  fullscreenControl: this.options[keys.map.controls.fullscreenButton],
                  mapTypeControl: this.options[keys.map.controls.mapTypeButtons],
                  scaleControl: this.options[keys.map.controls.displayScale],
                  rotateControl: this.options[keys.map.controls.rotateControl]
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _initGoogleMap(_x) {
        return _initGoogleMap2.apply(this, arguments);
      }

      return _initGoogleMap;
    }()
  }, {
    key: "_addMapCustomClass",
    value: function _addMapCustomClass() {
      if (this.mapContainer) {
        this.mapContainer.classList.add(mapCustomClass);
      }
    }
    /**
     * Init markers by its map provider (google, ...)
     * @private
     */

  }, {
    key: "_initMarkers",
    value: function _initMarkers() {
      switch (this.options[keys.map.provider]) {
        case 'google':
        default:
          this._initGoogleMapMarkers();

          break;
      }
    }
  }, {
    key: "_initGoogleMapMarkers",
    value:
    /**
     * Loop to init Google Maps markers
     * @private
     */
    function _initGoogleMapMarkers() {
      var _this2 = this;

      this.markers.forEach(function (marker) {
        _this2._createGoogleMapMarker(marker);
      });
    }
  }, {
    key: "_createGoogleMapMarker",
    value: function _createGoogleMapMarker(markerRawData) {
      var _this3 = this;

      var markerData = {};
      var markerPosition = new this.google.maps.LatLng(markerRawData.coordinates.lat, markerRawData.coordinates.lng);
      var markerTitle = markerRawData === null || markerRawData === void 0 ? void 0 : markerRawData.title;
      var markerInstance = new this.google.maps.Marker({
        position: markerPosition,
        title: markerTitle,
        map: this.map
      });
      markerData.marker = markerInstance;
      markerData.infoWindow = this._createGoogleMapInfoWindow(markerRawData);
      var listElt = null;

      if (this.mapListContainer) {
        listElt = this._createMapListInstance(markerRawData, markerInstance);
        markerData.listElt = listElt;
      }

      this.google.maps.event.addListener(markerInstance, 'click', function () {
        _this3._handleClickMarker(markerInstance);
      });
      this.markersData.push(markerData);
    }
  }, {
    key: "_createGoogleMapInfoWindow",
    value: function _createGoogleMapInfoWindow(markerRawData) {
      if (this.options[keys.map.displayInfoWindows]) {
        var infoWindowInstance = new this.google.maps.InfoWindow({
          content: this._replaceMarkerDataInString(markerRawData, this.options[keys.map.infoWindowTemplate])
        });
        return infoWindowInstance;
      }

      return null;
    }
  }, {
    key: "_handleClickMarker",
    value: function _handleClickMarker(marker) {
      if (this.options[keys.map.displayInfoWindows]) {
        if (this._isInfoWindowOpenedByMarker(marker)) {
          this._closeInfoWindowByMarker(marker);
        } else {
          this._openInfoWindowByMarker(marker);
        }
      }
    }
  }, {
    key: "_handleClickListElt",
    value: function _handleClickListElt(listElt) {
      var mapMarkerInstance = this._getMarkerByListEltNode(listElt);

      if (mapMarkerInstance) {
        if (this.options[keys.map.displayInfoWindows]) {
          this._openInfoWindowByMarker(mapMarkerInstance);
        }
      }
    }
  }, {
    key: "_createMapListInstance",
    value:
    /**
     * Creates a map list instance (store locator instance)
     * @param markerRawData
     * @param mapMarkerInstance
     * @returns {HTMLDivElement}
     * @private
     */
    function _createMapListInstance(markerRawData, mapMarkerInstance) {
      var _this4 = this;

      var mapListInstance = document.createElement('div');

      var listInstanceHtml = this._replaceMarkerDataInString(markerRawData, this.mapListEltTemplate);

      mapListInstance.innerHTML = listInstanceHtml;
      mapListInstance.addEventListener('click', function () {
        _this4._handleClickListElt(mapListInstance);
      });
      this.mapListContainer.appendChild(mapListInstance);
      return mapListInstance;
    }
  }, {
    key: "_replaceMarkerDataInString",
    value: function _replaceMarkerDataInString(markerData, string) {
      Object.keys(markerData).forEach(function (key) {
        var search = "{{ ".concat(key, " }}");
        string = string.replaceAll(search, markerData[key]);
      });
      return string;
    }
    /**
     * Closes an infoWindow by specifying its associated marker
     * @param marker
     * @private
     */

  }, {
    key: "_closeInfoWindowByMarker",
    value: function _closeInfoWindowByMarker(marker) {
      var infoWindow = this._getInfoWindowByMarker(marker);

      if (infoWindow) {
        infoWindow.close();
      }
    }
  }, {
    key: "_openInfoWindowByMarker",
    value:
    /**
     * Opens an infoWindow by its associated marker
     * @param marker
     * @private
     */
    function _openInfoWindowByMarker(marker) {
      var infoWindow = this._getInfoWindowByMarker(marker);

      if (infoWindow) {
        this._openInfoWindow(infoWindow);
      }
    }
  }, {
    key: "_openInfoWindow",
    value: function _openInfoWindow(infoWindow) {
      if (this._isInfoWindowOpened(infoWindow)) {
        infoWindow.close();
      } else {
        if (!this.options[keys.map.allowMultipleInfoWindow]) {
          this._closeAllInfoWindows();
        }

        var marker = this._getMarkerByInfoWindow(infoWindow);

        if (marker) {
          infoWindow.open(this.map, marker);

          if (this.options[keys.map.centerMarkerOnClick]) {
            this._centerMapOnMarker(marker);
          }
        }
      }
    }
  }, {
    key: "_getMarkerCoordinates",
    value: function _getMarkerCoordinates(marker) {
      return {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      };
    }
  }, {
    key: "_centerMapOnMarker",
    value: function _centerMapOnMarker(marker) {
      var coordinates = this._getMarkerCoordinates(marker);

      var googleMapCoordinates = new this.google.maps.LatLng(coordinates.lat, coordinates.lng);

      if (this.options[keys.map.animation] === smoothAnim) {
        this.map.panTo(googleMapCoordinates);
      } else {
        this.map.setCenter(googleMapCoordinates);
      }
    }
  }, {
    key: "_getMarkerByInfoWindow",
    value: function _getMarkerByInfoWindow(infoWindow) {
      return this._returnDataByInfoWindow('marker', infoWindow);
    }
    /**
     * Returns an existing infoWindow instance by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */

  }, {
    key: "_getInfoWindowByMarker",
    value: function _getInfoWindowByMarker(marker) {
      return this._returnDataByMarker('infoWindow', marker);
    }
  }, {
    key: "_getListEltByMarker",
    value:
    /**
     * Returns an existing listElt node by providing a marker
     * @param marker
     * @returns {null}
     * @private
     */
    function _getListEltByMarker(marker) {
      return this._returnDataByMarker('listElt', marker);
    }
  }, {
    key: "_getMarkerByListEltNode",
    value:
    /**
     * Returns an existing marker node by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    function _getMarkerByListEltNode(listEltNode) {
      return this._returnDataByListEltNode('marker', listEltNode);
    }
  }, {
    key: "_getInfoWindowByListEltNode",
    value:
    /**
     * Returns an existing infoWindow by providing a listEltNode
     * @param marker
     * @returns {null}
     * @private
     */
    function _getInfoWindowByListEltNode(listEltNode) {
      return this._returnDataByListEltNode('infoWindow', listEltNode);
    }
  }, {
    key: "_returnDataByMarker",
    value:
    /**
     * Generic method to retrieve some data by specifying a marker
     * @param data
     * @param marker
     * @returns {null}
     * @private
     */
    function _returnDataByMarker(data, marker) {
      var returnedData = null;

      for (var i = 0; i < Object.keys(this.markersData).length; i++) {
        var tempMarker = this.markersData[Object.keys(this.markersData)[i]];

        if ((tempMarker === null || tempMarker === void 0 ? void 0 : tempMarker.marker) === marker) {
          returnedData = tempMarker[data];
          break;
        }
      }

      return returnedData;
    }
  }, {
    key: "_returnDataByInfoWindow",
    value: function _returnDataByInfoWindow(data, infoWindow) {
      var returnedData = null;

      if (this.options[keys.map.displayInfoWindows]) {
        for (var i = 0; i < Object.keys(this.markersData).length; i++) {
          var tempMarker = this.markersData[Object.keys(this.markersData)[i]];

          if ((tempMarker === null || tempMarker === void 0 ? void 0 : tempMarker.infoWindow) === infoWindow) {
            returnedData = tempMarker[data];
            break;
          }
        }
      }

      return returnedData;
    }
    /**
     * Generic method to retrieve some data by specifying a listEltNode
     * @param data
     * @param marker
     * @returns {null}
     * @private
     */

  }, {
    key: "_returnDataByListEltNode",
    value: function _returnDataByListEltNode(data, listEltNode) {
      var returnedData = null;

      for (var i = 0; i < Object.keys(this.markersData).length; i++) {
        var tempMarker = this.markersData[Object.keys(this.markersData)[i]];

        if ((tempMarker === null || tempMarker === void 0 ? void 0 : tempMarker.listElt) === listEltNode) {
          returnedData = tempMarker[data];
          break;
        }
      }

      return returnedData;
    }
  }, {
    key: "_isInfoWindowOpened",
    value:
    /**
     * Returns whether an info window is currently opened
     * @param infoWindow
     * @returns {boolean}
     * @private
     */
    function _isInfoWindowOpened(infoWindow) {
      return infoWindow.getMap() ? true : false;
    }
  }, {
    key: "_isInfoWindowOpenedByMarker",
    value:
    /**
     * Returns whether an info window is currently opened by specifying its associated marker
     * @param marker
     * @returns {null|boolean}
     * @private
     */
    function _isInfoWindowOpenedByMarker(marker) {
      var infoWindow = this._getInfoWindowByMarker(marker);

      if (infoWindow) {
        return this._isInfoWindowOpened(infoWindow);
      }

      return null;
    }
    /**
     * Close all loaded infoWindows
     * @private
     */

  }, {
    key: "_closeAllInfoWindows",
    value: function _closeAllInfoWindows() {
      var _this5 = this;

      this.markersData.forEach(function (markerData) {
        if (markerData !== null && markerData !== void 0 && markerData.infoWindow) {
          if (_this5._isInfoWindowOpened(markerData.infoWindow)) {
            markerData.infoWindow.close();
          }
        }
      });
    }
  }]);

  return AdeliomMap;
}();


;

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

/***/ "./src/scss/AdeliomMap.scss":
/*!**********************************!*\
  !*** ./src/scss/AdeliomMap.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/demo.scss":
/*!****************************!*\
  !*** ./src/scss/demo.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/AdeliomMap": 0,
/******/ 			"css/demo": 0,
/******/ 			"css/AdeliomMap": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkadeliom_map_js"] = self["webpackChunkadeliom_map_js"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/demo","css/AdeliomMap"], () => (__webpack_require__("./src/js/AdeliomMap.js")))
/******/ 	__webpack_require__.O(undefined, ["css/demo","css/AdeliomMap"], () => (__webpack_require__("./src/scss/AdeliomMap.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/demo","css/AdeliomMap"], () => (__webpack_require__("./src/scss/demo.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;