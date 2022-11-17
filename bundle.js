/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return response
    })
}

function fetchAll(urls) {
  return Promise.all([fetchData(urls[0]), fetchData(urls[1]), fetchData(urls[2])])
}

module.exports = {
  fetchData,
  fetchAll
}

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Room = __webpack_require__(3)
const Booking = __webpack_require__(4)
const Customer = __webpack_require__(5)

class Hotel {
  constructor(bookingsData, customersData, roomsData) {
    this.rooms = this.instantiateRooms(roomsData)
    this.bookings = this.instantiateBookings(bookingsData)
    this.customers = this.instantiateCustomers(customersData)
    this.date = this.getCurrentDate()
    this.availableRooms = this.getAvailableRooms()
    this.todaysRevenue = this.getTodaysRevenue()
    this.percentOccupation = this.calculatePercentOccupation()
    this.searchResult
    this.usernames = this.loadUsernames()
  }

  instantiateRooms(rooms) {
    let allRooms = rooms.map(room => new Room(room))
    allRooms.forEach(room => {
      room.image = './images/single.jpg'
      switch (room['roomType']) {
        case 'single room': room.image = './images/single.jpg'
          break
        case 'suite': room.image = './images/suite.jpg'
          break
        case 'junior suite': room.image = './images/junior-suite.jpg'
          break
        case 'residential suite': room.image = './images/queen.jpg'
          break
        default:
          room['image'] = './images/king.jpg'
      }
    })
    return allRooms
  }

  instantiateBookings(bookings) {
    return bookings.map(booking => new Booking(booking, this.rooms))
      .sort((a, b) => this.convertDateToNum(a.date) - this.convertDateToNum(b.date))
  }

  instantiateCustomers(customers) {
    return customers.map(customer => new Customer(customer, this.bookings))
  }

  loadUsernames() {
    return this.customers.map(customer => `customer${customer.id}`)
  }

  getCurrentDate() {
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    return `${year}/${month}/${day}`
  }

  makeBooking(userID, roomNumber, date) {
    return { "userID": userID, "date": date, "roomNumber": roomNumber }
  }

  getOccupiedRooms() {
    return this.bookings.filter(booking => booking.date === this.date)
      .map(booking => booking.roomNumber)
  }

  getAvailableRooms() {
    let occupiedRooms = this.getOccupiedRooms()
    return this.rooms.filter(room => !occupiedRooms.includes(room.number))
      .map(room => room.number)
  }

  calculatePercentOccupation() {
    let occupiedRooms = this.getOccupiedRooms().length
    let percent = ((occupiedRooms / this.rooms.length) * 100).toFixed(2)
    return `${percent}%`
  }

  getTodaysRevenue() {
    let occupiedRooms = this.getOccupiedRooms()
    return this.rooms.reduce((total, room) => {
      if (occupiedRooms.includes(room.number)) {
        total += room.costPerNight
      }
      return total
    }, 0)
  }

  searchByDate(date) {
    if (!this.validateSearch(date)) {
      return 'Selected date is in the past or not in mm/dd/yyyy format.'
    }
    let unavailable = this.bookings.filter(booking => booking.date === date)
      .map(booking => booking.roomNumber)
    let available = this.rooms.filter(room => !unavailable.includes(room.number))
    if (this.rooms.length === unavailable.length) {
      return 'Sorry, there are no rooms available for the selected date'
    }
    this.searchResult = available
    return available
  }

  filterByType(type) {
    type = type.toLowerCase()
    let filtered = this.searchResult.filter(room => room.roomType === type)
    if (!filtered.length) {
      return 'Sorry, there are no rooms available for the selected type'
    }
    return filtered
  }

  convertDateToNum(date) {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8)
    let newDate = new Date(`${year}-${month}-${day}`)
    return newDate.getTime()
  }

  validateSearch(date) {
    let isDate = date.length === 10
    let isNotPast = this.convertDateToNum(this.date) <= this.convertDateToNum(date)
    return isDate && isNotPast
  }
}

module.exports = Hotel

/***/ }),
/* 3 */
/***/ ((module) => {

class Room {
  constructor(roomData) {
    this.number = roomData.number
    this.roomType = roomData.roomType
    this.bidet = roomData.bidet
    this.costPerNight = roomData.costPerNight
    this.bedSize = roomData.bedSize
    this.numBeds = roomData.numBeds
  }
}

module.exports = Room

/***/ }),
/* 4 */
/***/ ((module) => {

class Booking {
  constructor(bookingData, roomData) {
    this.id = bookingData.id
    this.userID = bookingData.userID
    this.date = bookingData.date
    this.roomNumber = bookingData.roomNumber
    this.amount = this.getCostOfRoom(roomData)
  }

  getCostOfRoom(data) {
    let room = data.find(room => room.number === this.roomNumber)
    return room.costPerNight
  }
}

module.exports = Booking

/***/ }),
/* 5 */
/***/ ((module) => {

class Customer {
  constructor(customer, bookingsData) {
    this.id = customer.id
    this.name = customer.name
    this.date = new Date()
    this.formatedDate = this.getFormatedDate()
    this.bookings = this.getBookings(bookingsData) || []
    this.pastBookings = this.getPastBookings(bookingsData)
    this.amountSpent = this.calculateAmountSpent()
    this.getFormatedDate()
  }

  getBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
       this.convertToMillis(booking.date) >= this.getFormatedDate()
    })
  }

  getPastBookings(data) {
    return data.filter(booking => {
      return booking.userID === this.id &&
        this.convertToMillis(booking.date) < this.getFormatedDate()
    }).reverse()
  }

  calculateAmountSpent() {
    let upcoming = this.bookings.reduce((total, booking) => {
      total += booking.amount
      return total
    }, 0)
    let past = this.pastBookings.reduce((total, booking) => {
      total += booking.amount
      return total
    }, 0)
    let total = Number((upcoming + past).toFixed(2))
    if (total < 0) {
      return 0
    }
    return total
  }

  convertToMillis(date) {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8)
    let newDate = new Date(`${year}-${month}-${day}`)
    return newDate.getTime()
  }

  getFormatedDate() {
    let newDate = new Date()
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    let formated = `${year}/${month}/${day}`
    return this.convertToMillis(formated)
  }
}

module.exports = Customer

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nfigure,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\nul[role='list'],\nol[role='list'] {\n  list-style: none;\n}\n\n/* Set core root defaults */\nhtml:focus-within {\n  scroll-behavior: smooth;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg,\npicture {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\n@media (prefers-reduced-motion: reduce) {\n  html:focus-within {\n   scroll-behavior: auto;\n  }\n  \n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/reset.css"],"names":[],"mappings":"AAAA,qBAAqB;AACrB;;;EAGE,sBAAsB;AACxB;;AAEA,0BAA0B;AAC1B;;;;;;;;;;EAUE,SAAS;AACX;;AAEA,2GAA2G;AAC3G;;EAEE,gBAAgB;AAClB;;AAEA,2BAA2B;AAC3B;EACE,uBAAuB;AACzB;;AAEA,2BAA2B;AAC3B;EACE,iBAAiB;EACjB,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA,0DAA0D;AAC1D;EACE,8BAA8B;AAChC;;AAEA,oCAAoC;AACpC;;EAEE,eAAe;EACf,cAAc;AAChB;;AAEA,yCAAyC;AACzC;;;;EAIE,aAAa;AACf;;AAEA,gGAAgG;AAChG;EACE;GACC,qBAAqB;EACtB;;EAEA;;;IAGE,qCAAqC;IACrC,uCAAuC;IACvC,sCAAsC;IACtC,gCAAgC;EAClC;AACF","sourcesContent":["/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nfigure,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\nul[role='list'],\nol[role='list'] {\n  list-style: none;\n}\n\n/* Set core root defaults */\nhtml:focus-within {\n  scroll-behavior: smooth;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg,\npicture {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\n@media (prefers-reduced-motion: reduce) {\n  html:focus-within {\n   scroll-behavior: auto;\n  }\n  \n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_overlook_banner4_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_overlook_banner4_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Lato', sans-serif;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  background-color: black;\n  color: white;\n  font-weight: 300;\n}\n\nlabel {\n  margin-right: 10px\n}\n\n.login-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.login-logo {\n  width: 800px;\n  margin-bottom: 20px;\n}\n\n.login-section input {\n  width: 20%;\n  font-size: 20px;\n}\n\n.login-section label {\n  font-size: 18px;\n  margin: 10px;\n}\n\n.sign-in {\n  margin-top: 20px;\n  font-size: 18px;\n  padding: 0 15px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.sign-in:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.main-header {\n  display: flex;\n  height: 200px;\n  border-bottom: 1px solid rgb(237, 201, 119);\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.header-content {\n  display: flex;\n  width: 50%;\n  justify-content: space-around;\n  background-color: none;\n}\n\n#logo {\n  height: 200px;\n  margin: 0;\n  padding: 0\n}\n\nmain {\n  display: flex;\n}\n\n.my-bookings {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 50%;\n  min-height: 100vh;\n  border-right: 1px solid rgb(237, 201, 119);\n  padding: 0\n}\n\n.search-section {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  min-height: 100vh;\n}\n\n.my-bookings-header {\n  display: flex;\n  width: 100%;\n  height: 50px;\n  align-items: center;\n}\n\n.div1 {\n  display: flex;\n  justify-content: flex-end;\n  width: 60%\n}\n\n.div2 {\n  display: flex;\n  justify-content: flex-end;\n  width: 40%\n}\n\n.bookings-section {\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  width: 100%;\n  min-height: 400px;\n  max-height: 700px;\n}\n\n.booking-tile {\n  display: flex;\n  height: 150px;\n  width: 80%;\n  margin: 10px 20px;\n  border: rgb(237, 201, 119) 1px solid;\n  border-radius: 15px;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.booking-tile button {\n  height: auto;\n  width: 30%;\n  margin-right: 15px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.booking-tile button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.snapshot {\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.snapshot span {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 75%;\n  padding: 0 10px\n}\n\n.snapshot p {\n  margin-right: 5px;\n  font-size: 13px;\n}\n\n.snapshot h1 {\n  color:rgb(237, 201, 119)\n}\n\n.booking-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  font-weight: 400;\n  padding: 10px;\n  margin: 10px;\n}\n\n.booking-detail {\n  font-weight: 300;\n  color: rgb(237, 201, 119);\n  margin-left: 10px;\n}\n\n.room-image {\n  height: 95%;\n  margin-right: 20px;\n}\n\n.my-bookings-header button {\n  height: 50%;\n  width: 50%;\n  margin-right: 10px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.my-bookings-header button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.amount-spent-section {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 40px;\n}\n\n.tell-amount {\n  margin-right: 20px\n}\n\n#total-amount {\n  color: rgb(237, 201, 119);\n}\n\n.search-section-header {\n  display: flex;\n  width: 100%;\n  height: 125px;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.go-back {\n  height: auto;\n  width: 20%;\n  font-size: 14px;\n  margin-top: 10px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.go-back:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.search-inputs {\n  display: flex;\n  width: 100%;\n  justify-content: space-around;\n}\n\n.search-inputs div {\n  display: flex;\n  width: 50%;\n  justify-content: center;\n}\n\n.search-inputs div button {\n  height: 100%;\n  width: 30%;\n  margin-left: 10px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.search-inputs div button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.room-tile {\n  display: flex;\n  height: 150px;\n  width: 80%;\n  margin: 10px 20px;\n  border: rgb(237, 201, 119) 1px solid;\n  border-radius: 15px;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.room-tile button {\n  height: auto;\n  width: 20%;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.room-tile button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.room-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  font-weight: 400;\n  font-size: 14px;\n  padding: 10px;\n  margin: 10px;\n}\n\n.hidden {\n  display: none;\n}\n\n.disabled {\n  opacity: 65%;\n  pointer-events: none;\n}\n\n.warning {\n  color: red\n}\n\n@media (max-width: 1200px) {\n  .room-image {\n    width: 150px;\n    height: auto;\n  }\n\n  .room-info,\n  .booking-info {\n    font-size: 13px;\n  }\n\n  .my-bookings-header button {\n    width: 60%\n  }\n}\n\n@media (max-width: 1060px) {\n\n  .my-bookings-header button {\n    width: 80%\n  }\n\n  .room-image {\n    display: none;\n  }\n\n  .room-tile button {\n    width: 30%;\n    margin-right: 20px;\n  }\n\n  .room-filter,\n  .date-select {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  #filter-room-type,\n  #date-select {\n    width: 50%\n  }\n\n  #clear-filter,\n  #search-button {\n    width: 50%;\n    height: 50%\n  }\n\n  .header-content {\n    width: 100%\n  }\n}\n\n@media (max-width: 700px) {\n  .my-bookings-header {\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 12%;\n  }\n\n  .my-bookings-header div {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .my-bookings-header button {\n    width: 40%;\n    height: 100%\n  }\n\n  #logo {\n    height: 150px\n  }\n\n\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  font-family: 'Lato', sans-serif;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  background-color: black;\n  color: white;\n  font-weight: 300;\n}\n\nlabel {\n  margin-right: 10px\n}\n\n.login-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.login-logo {\n  width: 800px;\n  margin-bottom: 20px;\n}\n\n.login-section input {\n  width: 20%;\n  font-size: 20px;\n}\n\n.login-section label {\n  font-size: 18px;\n  margin: 10px;\n}\n\n.sign-in {\n  margin-top: 20px;\n  font-size: 18px;\n  padding: 0 15px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.sign-in:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.main-header {\n  display: flex;\n  height: 200px;\n  border-bottom: 1px solid rgb(237, 201, 119);\n  background-image: url('/src/images/overlook-banner4.jpg');\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.header-content {\n  display: flex;\n  width: 50%;\n  justify-content: space-around;\n  background-color: none;\n}\n\n#logo {\n  height: 200px;\n  margin: 0;\n  padding: 0\n}\n\nmain {\n  display: flex;\n}\n\n.my-bookings {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 50%;\n  min-height: 100vh;\n  border-right: 1px solid rgb(237, 201, 119);\n  padding: 0\n}\n\n.search-section {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  min-height: 100vh;\n}\n\n.my-bookings-header {\n  display: flex;\n  width: 100%;\n  height: 50px;\n  align-items: center;\n}\n\n.div1 {\n  display: flex;\n  justify-content: flex-end;\n  width: 60%\n}\n\n.div2 {\n  display: flex;\n  justify-content: flex-end;\n  width: 40%\n}\n\n.bookings-section {\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  width: 100%;\n  min-height: 400px;\n  max-height: 700px;\n}\n\n.booking-tile {\n  display: flex;\n  height: 150px;\n  width: 80%;\n  margin: 10px 20px;\n  border: rgb(237, 201, 119) 1px solid;\n  border-radius: 15px;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.booking-tile button {\n  height: auto;\n  width: 30%;\n  margin-right: 15px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.booking-tile button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.snapshot {\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.snapshot span {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 75%;\n  padding: 0 10px\n}\n\n.snapshot p {\n  margin-right: 5px;\n  font-size: 13px;\n}\n\n.snapshot h1 {\n  color:rgb(237, 201, 119)\n}\n\n.booking-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  font-weight: 400;\n  padding: 10px;\n  margin: 10px;\n}\n\n.booking-detail {\n  font-weight: 300;\n  color: rgb(237, 201, 119);\n  margin-left: 10px;\n}\n\n.room-image {\n  height: 95%;\n  margin-right: 20px;\n}\n\n.my-bookings-header button {\n  height: 50%;\n  width: 50%;\n  margin-right: 10px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.my-bookings-header button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.amount-spent-section {\n  display: flex;\n  justify-content: flex-end;\n  font-size: 40px;\n}\n\n.tell-amount {\n  margin-right: 20px\n}\n\n#total-amount {\n  color: rgb(237, 201, 119);\n}\n\n.search-section-header {\n  display: flex;\n  width: 100%;\n  height: 125px;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.go-back {\n  height: auto;\n  width: 20%;\n  font-size: 14px;\n  margin-top: 10px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.go-back:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.search-inputs {\n  display: flex;\n  width: 100%;\n  justify-content: space-around;\n}\n\n.search-inputs div {\n  display: flex;\n  width: 50%;\n  justify-content: center;\n}\n\n.search-inputs div button {\n  height: 100%;\n  width: 30%;\n  margin-left: 10px;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.search-inputs div button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.room-tile {\n  display: flex;\n  height: 150px;\n  width: 80%;\n  margin: 10px 20px;\n  border: rgb(237, 201, 119) 1px solid;\n  border-radius: 15px;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.room-tile button {\n  height: auto;\n  width: 20%;\n  font-size: 14px;\n  color: white;\n  background-color: black;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  transition-duration: 300ms;\n}\n\n.room-tile button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  color: rgb(237, 201, 119);\n  border: 1px solid rgb(237, 201, 119);\n}\n\n.room-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  font-weight: 400;\n  font-size: 14px;\n  padding: 10px;\n  margin: 10px;\n}\n\n.hidden {\n  display: none;\n}\n\n.disabled {\n  opacity: 65%;\n  pointer-events: none;\n}\n\n.warning {\n  color: red\n}\n\n@media (max-width: 1200px) {\n  .room-image {\n    width: 150px;\n    height: auto;\n  }\n\n  .room-info,\n  .booking-info {\n    font-size: 13px;\n  }\n\n  .my-bookings-header button {\n    width: 60%\n  }\n}\n\n@media (max-width: 1060px) {\n\n  .my-bookings-header button {\n    width: 80%\n  }\n\n  .room-image {\n    display: none;\n  }\n\n  .room-tile button {\n    width: 30%;\n    margin-right: 20px;\n  }\n\n  .room-filter,\n  .date-select {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  #filter-room-type,\n  #date-select {\n    width: 50%\n  }\n\n  #clear-filter,\n  #search-button {\n    width: 50%;\n    height: 50%\n  }\n\n  .header-content {\n    width: 100%\n  }\n}\n\n@media (max-width: 700px) {\n  .my-bookings-header {\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 12%;\n  }\n\n  .my-bookings-header div {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .my-bookings-header button {\n    width: 40%;\n    height: 100%\n  }\n\n  #logo {\n    height: 150px\n  }\n\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-banner4.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/king.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/junior-suite.jpg");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/suite.jpg");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single.jpg");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/queen.jpg");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook2.png");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook_black.png");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook_white.png");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-banner-1.jpg");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-banner2.jpg");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-banner3.jpg");

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apiCalls__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_hotel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _classes_hotel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_classes_hotel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _classes_customer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _classes_customer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_classes_customer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_reset_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _images_king_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _images_junior_suite_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var _images_suite_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _images_single_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _images_queen_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _images_overlook2_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _images_overlook_black_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(21);
/* harmony import */ var _images_overlook_white_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(22);
/* harmony import */ var _images_overlook_banner_1_jpg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(23);
/* harmony import */ var _images_overlook_banner2_jpg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(24);
/* harmony import */ var _images_overlook_banner3_jpg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(25);
/* harmony import */ var _images_overlook_banner4_jpg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(14);


















//<<<<---------------------------------------Global Variables--------------------------------------->>>>
let allURL = ['http://localhost:3001/api/v1/customers', 'http://localhost:3001/api/v1/bookings', 'http://localhost:3001/api/v1/rooms']
let allCustomers
let allBookings
let allRooms
let hotel
let currentCustomer
let searchedDate
let searchedCustomer

//<<<<---------------------------------------Query Selectors--------------------------------------->>>>
let loginSection = document.getElementById('login-section')
let mainHeader = document.getElementById('main-header')
let main = document.getElementById('main')
let bookingSection = document.getElementById('bookings-section')
let searchSection = document.getElementById('search-content')
let searchButton = document.getElementById('search-button')
let selectDate = document.getElementById('select-date')
let filterRoomType = document.getElementById('filter-room-type')
let historyButton = document.getElementById('history-button')
let totalAmount = document.getElementById('total-amount')
let backToBookingsButton = document.getElementById('back-to-bookings')
let clearFilterButton = document.getElementById('clear-filter')
let name = document.getElementById('name')
let username = document.getElementById('username')
let password = document.getElementById('password')
let signInButton = document.getElementById('sign-in')
let loginWarning = document.getElementById('login-warning')
let amountSpent = document.getElementById('amount-spent')
let dashboardH2 = document.getElementById('dashboard-h2')
let searchH2 = document.getElementById('search-h2')
let customerSearchSection = document.getElementById('customer-search-section')
let customerSearch = document.getElementById('customer-search')
let searchInputs = document.getElementById('search-inputs')
let backToSearchButton = document.getElementById('back-to-search')
let roomsAvailable


//<<<<------------------------------------------Event Listeners------------------------------------------>>>>
addEventListener('load', () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchAll)(allURL)
    .then(data => {
      allCustomers = data[0].customers
      allBookings = data[1].bookings
      allRooms = data[2].rooms
    })
    .then(() => {
      hotel = new (_classes_hotel__WEBPACK_IMPORTED_MODULE_1___default())(allBookings, allCustomers, allRooms)
      selectDate.value = formatTodaysDate()
      selectDate.min = formatTodaysDate()
    })
    .catch(error => {
      errorResponse(error, loginSection)
    })
})

document.addEventListener('keypress', event => {
  if (event.key === "Enter") {
    event.preventDefault()
    event.target.click()
  }
})

signInButton.addEventListener('click', () => {
  if (!validateUser(username.value, password.value)) {
    show(loginWarning)
    username.value = ''
    password.value = ''
  } else if (username.value === 'manager') {
    loadManagerDashboard()
    return
  } else {
    fetchUser(username.value)
    hide(loginSection)
    show(main)
    show(mainHeader)
  }
})

customerSearch.addEventListener('keyup', (e) => {
  let entry = e.target.value
  showCustomers(findCustomer(entry))
})

historyButton.addEventListener('click', () => {
  showBookings(currentCustomer.pastBookings)
  hide(historyButton)
  show(backToBookingsButton)
})

backToBookingsButton.addEventListener('click', () => {
  showBookings(currentCustomer.bookings)
  hide(backToBookingsButton)
  show(historyButton)
})

searchButton.addEventListener('click', () => {
  searchedDate = selectDate.value.replaceAll('-', '/')
  let searchResult = hotel.searchByDate(searchedDate)
  showSearchResult(searchResult)
})

searchSection.addEventListener('click', (e) => {
  let target = e.target
  if (target.classList.contains('show-customer-bookings')) {
    searchedCustomer = findCustomer(target.id)
    showCustomerBookings(searchedCustomer.bookings)
    hide(customerSearchSection)
    show(backToSearchButton)
  } else if (target.classList.contains('manager-book')) {
    searchedCustomer = findCustomer(target.id)
    searchSection.innerHTML = ''
    show(searchInputs, backToSearchButton)
    hide(customerSearchSection)
  } else if (target.classList.contains('delete')) {
    let bookingID = target.id
    deleteBooking(bookingID)
  } else if (!currentCustomer) {
    let roomNum = Number(target.id)
    clearFilterButton.classList.add('disabled')
    clearFilterButton.disabled = true
    hide(searchInputs)
    show(backToSearchButton)
    let dataToPost = hotel.makeBooking(searchedCustomer.id, roomNum, searchedDate)
    postNewBooking(dataToPost)
  } else if (target.classList.contains('book-it')) {
    let roomNum = Number(target.id)
    clearFilterButton.classList.add('disabled')
    clearFilterButton.disabled = true
    let dataToPost = hotel.makeBooking(currentCustomer.id, roomNum, searchedDate)
    postNewBooking(dataToPost)
  }
})

function successfulPost(date) {
  if (!!searchedCustomer) {
    searchSection.innerHTML = `<h1>Room successfully booked for
     ${searchedCustomer.name} on ${date}!</h1>`
    setTimeout(() => {
      loadManagerDashboard()
    }, 3000)
  } else {
    searchSection.innerHTML = `<h1>Your room was successfully booked for ${date}!</h1>`
    setTimeout(() => {
      resetDOM()
      updateData()
      showBookings(currentCustomer.bookings)
    }, 3000)
  }
}

backToSearchButton.addEventListener('click', () => {
  showCustomers(findCustomer(customerSearch.value))
  hide(backToSearchButton, searchInputs)
  show(customerSearchSection)
})

filterRoomType.addEventListener('input', (e) => {
  if (filterRoomType.value !== 'Filter Rooms') {
    clearFilterButton.classList.remove('disabled')
    clearFilterButton.disabled = false
  }
  let roomType = e.target.value
  if (roomType) {
    let filteredResults = hotel.filterByType(roomType)
    showSearchResult(filteredResults)
  } else {
    return
  }
})

clearFilterButton.addEventListener('click', () => {
  filterRoomType.value = 'Filter Rooms'
  searchedDate = selectDate.value.replaceAll('-', '/')
  let searchResult = hotel.searchByDate(searchedDate)
  showSearchResult(searchResult)
})

//<<<<------------------------------------------Fetch API------------------------------------------>>>>
function postNewBooking(body) {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok === false) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(() => (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchAll)(allURL))
    .then(data => {
      if (data.ok === false) {
        throw Error(data.statusText)
      }
      allBookings = data[1].bookings
      allCustomers = data[0].customers
    })
    .then(() => {
      hotel = new (_classes_hotel__WEBPACK_IMPORTED_MODULE_1___default())(allBookings, allCustomers, allRooms)
      successfulPost(searchedDate)
    })
    .catch(error => errorResponse(error, searchSection))

}

function deleteBooking(id) {
  fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok === false) {
        throw Error(response.statusText)
      }
    })
    .then(() => (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchAll)(allURL))
    .then(data => {
      if (data.ok === false) {
        throw Error(data.statusText)
      }
      allBookings = data[1].bookings
      allCustomers = data[0].customers
    })
    .then(() => {
      hotel = new (_classes_hotel__WEBPACK_IMPORTED_MODULE_1___default())(allBookings, allCustomers, allRooms)
      searchSection.innerHTML = `<h1>Booking successfully deleted for ${searchedCustomer.name}!</h1>`
      setTimeout(() => {
        loadManagerDashboard()
        showCustomers(findCustomer(customerSearch.value))
        hide(backToSearchButton)
        show(customerSearchSection)
      }, 3000)
    })
    .catch(error => errorResponse(error, searchSection))
}

function fetchUser(user) {
  let id = user.slice(8)
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`http://localhost:3001/api/v1/customers/${id}`)
    .then(data => {
      currentCustomer = new (_classes_customer__WEBPACK_IMPORTED_MODULE_2___default())(data, hotel.bookings)
    })
    .then(() => loadUserDashboard())
    .catch(error => errorResponse(error, bookingSection))
}

function errorResponse(error, section) {
  if (error instanceof TypeError) {
    warning(section, 'There was a problem on our end...?')
    return
  } else if (error instanceof ReferenceError) {
    warning(section, 'There was a problem somewhere else... I think.')
    return
  } else if (error instanceof SyntaxError) {
    warning(section, 'Something was spelled wrong?')
    return
  } else {
    warning(section, 'There appears to be a bit of a problem.')
  }
}

//<<<<------------------------------------------Utility Functions------------------------------------------>>>>
function hide(...elements) {
  elements.forEach(element => {
    element.classList.add('hidden')
  })
}

function show(...elements) {
  elements.forEach(element => {
    element.classList.remove('hidden')
  })
}

function warning(section, string) {
  section.innerHTML = `<p class="warning">${string}</p>`
}

function updateData() {
  hotel = new (_classes_hotel__WEBPACK_IMPORTED_MODULE_1___default())(allBookings, allCustomers, allRooms)
  currentCustomer = hotel.customers.find(customer => customer.id === currentCustomer.id)
}

function resetDOM() {
  searchSection.innerHTML = ''
  bookingSection.innerHTML = ''
}

function formatTodaysDate() {
  let formatedDate = hotel.date.replaceAll('/', '-')
  return formatedDate
}

function validateUser(username, password) {
  return (hotel.usernames.includes(username) || username === 'manager')
    && password === 'overlook2021'
}

//<<<<------------------------------------------Customer Dashboard------------------------------------------>>>>
function loadUserDashboard() {
  name.innerText = currentCustomer.name.split(' ')[0]
  totalAmount.innerText = `$${currentCustomer.amountSpent}`
  showBookings(currentCustomer.bookings)
}

function showBookings(data) {
  if (data.length === 0) {
    warning(bookingSection, 'There\'s nothing to see here!')
    return
  }
  bookingSection.innerHTML = ''
  data.forEach(booking => {
    let room = hotel.rooms.find(room => room.number === booking.roomNumber)
    bookingSection.innerHTML +=
      `<div class="booking-tile">
      <div class="booking-info">
        <p>DATE: <span class="booking-detail">${booking.date}</span></p>
        <p>ROOM: <span class="booking-detail">${booking.roomNumber}</span></p>
        <p>AMOUNT: <span class="booking-detail">$${booking.amount}</span></p>
        <p>BED: <span class="booking-detail">${room.bedSize}</span></p>
        <p># OF BEDS: <span class="booking-detail">${room.numBeds}</span></p>
      </div>
      <img class="room-image" src=${room.image} alt="${room.roomType} image">
    </div>`
  })
}

function showSearchResult(result) {
  searchSection.innerHTML = ''
  if (typeof result === 'string') {
    warning(searchSection, result)
    return
  }
  result.forEach(room => {
    searchSection.innerHTML +=
      `<div id="${room.number}" class="room-tile">
      <div class="room-info">
        <p>TYPE: <span class="booking-detail">${room.roomType}</span></p>
        <p>BIDET? <span class="booking-detail">${room.bidet}</span></p>
        <p>PER NIGHT: <span class="booking-detail">$${room.costPerNight}</span></p>
        <p>BED(S): <span class="booking-detail">${room.numBeds} ${room.bedSize}</span></p>
        <p>ROOM: <span class="booking-detail">#${room.number}</span></p>
      </div>
      <button class="book-it" id="${room.number}">Book Room</button>
      <img class="room-image" src=${room.image} alt="${room.roomType}">
    </div>`
  })
}

//<<<<------------------------------------------Manager Dashboard------------------------------------------>>>>
function loadManagerDashboard() {
  resetDOM()
  mainHeader.style.backgroundImage = "url('./images/overlook-banner2.jpg')"
  mainHeader.style.backgroundPosition = "50% 60%"
  hide(loginSection, historyButton, amountSpent, searchInputs)
  show(main, mainHeader, customerSearchSection)
  showCustomers(hotel.customers)
  dashboardH2.innerText = 'Today\'s Snapshot'
  searchH2.innerText = 'Customer Search'
  name.innerText = 'Manager'
  populateTodaysSnapshot()
}

function populateTodaysSnapshot() {
  bookingSection.innerHTML = ''
  bookingSection.innerHTML +=
    `<div class="booking-tile snapshot">
    <h3>Rooms Available</h3>
    <span id="rooms-available"></span>
    </div>
    <div class="booking-tile snapshot">
    <h3>Today's Total Revenue</h3>
  <h1>$${hotel.todaysRevenue}</h1>
  </div>
  <div class="booking-tile snapshot">
  <h3>Room % Occupied</h3>
  <h1>${hotel.percentOccupation}</h1>
  </div>
  `
  populateRoomsAvailable()
}

function populateRoomsAvailable() {
  let roomsAvailable = document.getElementById('rooms-available')
  hotel.availableRooms.forEach(roomNum => {
    roomsAvailable.innerHTML += `<p>Room ${roomNum} |</p>`
  })
}

function findCustomer(idOrName) {
  let customer = hotel.customers.find(customer => customer.id === Number(idOrName))
  if (!customer) {
    let name = idOrName.toLowerCase()
    return hotel.customers.filter(customer => customer.name.toLowerCase().includes(name))
  }
  return customer
}

function showCustomers(customers) {
  if (!customers.length) {
    customers = hotel.customers
  }
  searchSection.innerHTML = ''
  customers.forEach(customer => {
    searchSection.innerHTML +=
      `<div id="${customer.id}" class="room-tile">
      <div class="room-info">
        <p>NAME: <span class="booking-detail">${customer.name}</span></p>
        <p>AMOUNT SPENT? <span class="booking-detail">$${customer.amountSpent}</span></p>
      </div>
      <button class="show-customer-bookings" id="${customer.id}">Show Bookings</button>
      <button class="manager-book" id="${customer.id}">New Booking</button>
    </div>`
  })
}

function showCustomerBookings(data) {
  if (data.length === 0) {
    warning(searchSection, 'There\'s nothing to see here!')
    return
  }
  searchSection.innerHTML = ''
  data.forEach(booking => {
    let room = hotel.rooms.find(room => room.number === booking.roomNumber)
    searchSection.innerHTML +=
      `<div class="booking-tile">
      <div class="booking-info">
        <p>DATE: <span class="booking-detail">${booking.date}</span></p>
        <p>ROOM: <span class="booking-detail">${booking.roomNumber}</span></p>
        <p>AMOUNT: <span class="booking-detail">$${booking.amount}</span></p>
        <p>BED: <span class="booking-detail">${room.bedSize}</span></p>
        <p># OF BEDS: <span class="booking-detail">${room.numBeds}</span></p>
      </div>
      <button id="${booking.id}" class="delete">Delete this booking</button>
    </div>`
  })
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map