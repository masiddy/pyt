webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var d = __webpack_require__(9)
  , defaultSettings = __webpack_require__(33)
  , EventManager = __webpack_require__(34)
  , guid = __webpack_require__(35)
  , h = __webpack_require__(4);

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = h.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = d.css(element, 'direction') === "rtl";
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  i.scrollbarXRail = d.appendTo(d.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = d.appendTo(d.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = h.toInt(d.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : h.toInt(d.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = h.toInt(d.css(i.scrollbarXRail, 'borderLeftWidth')) + h.toInt(d.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  d.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));
  d.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = d.appendTo(d.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = d.appendTo(d.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = h.toInt(d.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : h.toInt(d.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? h.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = h.toInt(d.css(i.scrollbarYRail, 'borderTopWidth')) + h.toInt(d.css(i.scrollbarYRail, 'borderBottomWidth'));
  d.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));
  d.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  if (typeof element.dataset === 'undefined') {
    return element.getAttribute('data-ps-id');
  } else {
    return element.dataset.psId;
  }
}

function setId(element, id) {
  if (typeof element.dataset === 'undefined') {
    element.setAttribute('data-ps-id', id);
  } else {
    element.dataset.psId = id;
  }
}

function removeId(element) {
  if (typeof element.dataset === 'undefined') {
    element.removeAttribute('data-ps-id');
  } else {
    delete element.dataset.psId;
  }
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var cls = __webpack_require__(12)
  , d = __webpack_require__(9);

exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

exports.clone = function (obj) {
  if (obj === null) {
    return null;
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = this.clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = this.clone(original);
  for (var key in source) {
    result[key] = this.clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return d.matches(el, "input,[contenteditable]") ||
         d.matches(el, "select,[contenteditable]") ||
         d.matches(el, "textarea,[contenteditable]") ||
         d.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return this.toInt(d.css(element, 'width')) +
         this.toInt(d.css(element, 'paddingLeft')) +
         this.toInt(d.css(element, 'paddingRight')) +
         this.toInt(d.css(element, 'borderLeftWidth')) +
         this.toInt(d.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var cls = __webpack_require__(12)
  , d = __webpack_require__(9)
  , h = __webpack_require__(4)
  , instances = __webpack_require__(3);

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  d.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - element.scrollLeft - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  d.css(i.scrollbarYRail, yRailOffset);

  d.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  d.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    d.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    d.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, h.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = h.toInt(element.scrollLeft * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, h.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = h.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  cls[i.scrollbarXActive ? 'add' : 'remove'](element, 'ps-active-x');
  cls[i.scrollbarYActive ? 'add' : 'remove'](element, 'ps-active-y');
};


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


exports.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

exports.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

exports.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

exports.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

exports.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return element.classList;
  } else {
    return element.className.split(' ');
  }
};


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global require, module, window */

var eventemitter = __webpack_require__(20);
var EventEmitter2 = eventemitter.EventEmitter2 || eventemitter;
module.exports = window.events = window.events || new EventEmitter2();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global ga */

var _ = __webpack_require__(2);
var URI = __webpack_require__(8);

var helpers = __webpack_require__(6);

function trackerExists() {
  if (typeof ga !== 'undefined') {
    return true;
  }
}

/* Initialize a non Digital Analytics Program GA tracker
 * This tracker's name is "nonDAP", so all commands will need to be prefixed
*/
function init() {
  if (!trackerExists()) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  }

  ga('create', 'UA-48605964-22', 'auto', 'notDAP');
  ga('notDAP.set', 'forceSSL', true);
  ga('notDAP.set', 'anonymizeIp', true);
}

function pageView() {
  if (typeof ga === 'undefined') { return; }
  var path = document.location.pathname;
  if (document.location.search) {
    var query = helpers.sanitizeQueryParams(URI.parseQuery(document.location.search));
    path += '?' + sortQuery(query);
  }
  ga('notDAP.send', 'pageview', path);
}

function sortQuery(query) {
  return _.chain(query)
    .pairs()
    .map(function(pair) {
      return [pair[0], _.isArray(pair[1]) ? pair[1] : [pair[1]]];
    })
    .reduce(function(memo, pair) {
      return memo.concat(_.map(pair[1], function(value) {
        return [pair[0], value];
      }));
    }, [])
    .sort()
    .map(function(pair) {
      return pair.join('=');
    })
    .join('&')
    .value();
}

module.exports = {
  init: init,
  pageView: pageView,
  sortQuery: sortQuery,
  trackerExists: trackerExists
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var URI = __webpack_require__(8);
var _ = __webpack_require__(2);
var Handlebars = __webpack_require__(68);
var helpers = __webpack_require__(6);

// Hack: Append jQuery to `window` for use by typeahead.js
window.$ = window.jQuery = $;

__webpack_require__(45);
var Bloodhound = __webpack_require__(49);

var events = __webpack_require__(14);

var officeMap = {
  H: 'House',
  S: 'Senate',
  P: 'President'
};

function formatCandidate(result) {
  return {
    name: result.name,
    id: result.id,
    type: 'candidate',
    office: officeMap[result.office_sought]
  };
}

function formatCommittee(result) {
  return {
    name: result.name,
    id: result.id,
    type: 'committee'
  };
}

function getUrl(resource) {
  return URI(window.API_LOCATION)
    .path([window.API_VERSION, 'names', resource, ''].join('/'))
    .query({
      q: '%QUERY',
      api_key: window.API_KEY
    })
    .readable();
}

var engineOpts = {
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 10
};

function createEngine(opts) {
  return new Bloodhound(_.extend({}, engineOpts, opts));
}

var candidateEngine = createEngine({
  remote: {
    url: getUrl('candidates'),
    wildcard: '%QUERY',
    transform: function(response) {
      return _.map(response.results, formatCandidate);
    }
  }
});

var committeeEngine = createEngine({
  remote: {
    url: getUrl('committees'),
    wildcard: '%QUERY',
    transform: function(response) {
      return _.map(response.results, formatCommittee);
    },
  }
});

var candidateDataset = {
  name: 'candidate',
  display: 'name',
  limit: 5,
  source: candidateEngine,
  templates: {
    header: '<span class="tt-suggestion__header">Select a candidate:</span>',
    pending: '<span class="tt-suggestion__loading">Loading candidates...</span>',
    notFound: Handlebars.compile(''), // This has to be empty to not show anything
    suggestion: Handlebars.compile(
      '<span>' +
      '<span class="tt-suggestion__name">{{ name }} ({{ id }})</span>' +
      '<span class="tt-suggestion__office">{{ office }}</span>' +
      '</span>'
    )
  }
};

var committeeDataset = {
  name: 'committee',
  display: 'name',
  limit: 10,
  source: committeeEngine,
  templates: {
    header: '<span class="tt-suggestion__header">Select a committee:</span>',
    pending: '<span class="tt-suggestion__loading">Loading committees...</span>',
    notFound: Handlebars.compile(''), // This has to be empty to not show anything
    suggestion: Handlebars.compile(
      '<span class="tt-suggestion__name">{{ name }} ({{ id }})</span>'
    )
  }
};

/* This is a fake dataset for showing an empty option with the query
 * when clicked, this will load the receipts page,
 * filtered to contributions from this person
 */
var individualDataset = {
  display: 'id',
  source: function(query, syncResults) {
    syncResults([{
      id: helpers.sanitizeValue(query),
      type: 'individual'
    }]);
  },
  templates: {
    suggestion: function(datum) {
      return '<span><strong>Search individual contributions from:</strong> "' + datum.id + '"</span>';
    }
  }
};

/* This is a fake dataset for showing an empty option with the query
 * when clicked, this will submit the form to the DigitalGov search site
 */
var siteDataset = {
  display: 'id',
  source: function(query, syncResults) {
    syncResults([{
      id: helpers.sanitizeValue(query),
      type: 'site'
    }]);
  },
  templates: {
    suggestion: function(datum) {
      return '<span><strong>Search other pages:</strong> "' + datum.id + '"</span>';
    }
  }
};

var datasets = {
  candidates: candidateDataset,
  committees: committeeDataset,
  allData: [candidateDataset, committeeDataset],
  all: [candidateDataset, committeeDataset, individualDataset, siteDataset]
};

var typeaheadOpts = {
  minLength: 3,
  highlight: true,
  hint: false
};

function Typeahead(selector, type, url) {
  this.$input = $(selector);
  this.url = url || '/';
  this.typeahead = null;

  this.dataset = datasets[type];

  this.init();

  events.on('searchTypeChanged', this.handleChangeEvent.bind(this));
}

Typeahead.prototype.init = function() {
  if (this.typeahead) {
    this.$input.typeahead('destroy');
  }
  this.typeahead = this.$input.typeahead(typeaheadOpts, this.dataset);
  this.$element = this.$input.parent('.twitter-typeahead');
  this.$element.css('display', 'block');
  this.$element.find('.tt-menu').attr('aria-live', 'polite');
  this.$input.on('typeahead:select', this.select.bind(this));
};

Typeahead.prototype.handleChangeEvent = function(data) {
  this.init(data.type);
};

Typeahead.prototype.select = function(event, datum) {
  if (datum.type === 'individual') {
    window.location = this.url + 'receipts/individual-contributions/?contributor_name=' + datum.id;
  } else if (datum.type === 'site') {
    this.searchSite(datum.id);
  } else {
    window.location = this.url + datum.type + '/' + datum.id;
  }
};

Typeahead.prototype.searchSite = function(query) {
  /* If the site search option is selected, this function handles submitting
   * a new search on /search
   */

  var $form = this.$input.closest('form');
  var action = $form.attr('action');
  this.$input.val(query);
  $form.attr('action', action);
  $form.submit();
};

module.exports = {
  Typeahead: Typeahead,
  datasets: datasets
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
__webpack_require__(29)($);

var listeners = __webpack_require__(24);

var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;

var defaultOpts = {
  checkboxes: true,
};

/**
 * Dropdown toggles
 * @constructor
 * @param {string} selector - CSS selector for the fieldset that contains everything
 * @param {object} opts - Options
 */
function Dropdown(selector, opts) {
  this.opts = $.extend({}, defaultOpts, opts);

  this.isOpen = false;

  this.$body = $(selector);
  this.$button = this.$body.find('.dropdown__button');
  this.$panel = this.$body.find('.dropdown__panel');

  if (this.opts.checkboxes) {
    this.$selected = this.$body.find('.dropdown__selected');
    this.$panel.on('keyup', 'input[type="checkbox"]', this.handleCheckKeyup.bind(this));
    this.$panel.on('change', 'input[type="checkbox"]', this.handleCheck.bind(this));
    this.$panel.on('click', '.dropdown__item--selected', this.handleDropdownItemClick.bind(this));

    this.$selected.on('click', 'input[type="checkbox"]', this.handleSelectedInputClick.bind(this));
    this.$selected.on('click', '.dropdown__remove', this.handleRemoveClick.bind(this));

    if (this.isEmpty()) {
      this.removePanel();
    }
  }

  $(document.body).on('tag:removeAll', this.handleClearFilters.bind(this));

  this.$button.on('click', this.toggle.bind(this));

  this.events = new listeners.Listeners();
  this.events.on(document.body, 'click', this.handleClickAway.bind(this));
  this.events.on(document.body, 'focusin', this.handleFocusAway.bind(this));
  this.events.on(document.body, 'keyup', this.handleKeyup.bind(this));

  // Set ARIA attributes
  this.$button.attr('aria-haspopup', 'true');
  this.$panel.attr('aria-label','More options');
}

Dropdown.prototype.toggle = function(e) {
  e.preventDefault();
  var method = this.isOpen ? this.hide : this.show;
  method.apply(this);

  return false;
};

Dropdown.prototype.show = function() {
  this.$panel.attr('aria-hidden', 'false');
  this.$panel.perfectScrollbar({suppressScrollX: true});
  this.$panel.find('input[type="checkbox"]:first').focus();
  this.$button.addClass('is-active');
  this.isOpen = true;
};

Dropdown.prototype.hide = function() {
  this.$panel.attr('aria-hidden', 'true');
  this.$button.removeClass('is-active');
  this.isOpen = false;
};

Dropdown.prototype.handleClickAway = function(e) {
  var $target = $(e.target);
  if (!this.$body.has($target).length) {
    this.hide();
  }
};

Dropdown.prototype.handleFocusAway = function(e) {
  var $target = $(e.target);
  if (this.isOpen && !this.$panel.has($target).length &&
      !this.$panel.is($target) && !$target.is(this.$button)) {
    this.hide();
  }
};

Dropdown.prototype.handleKeyup = function(e) {
  if (e.keyCode === KEYCODE_ESC) {
    if (this.isOpen) {
      this.hide();
      this.$button.focus();
    }
  }
};

Dropdown.prototype.handleCheckKeyup = function(e) {
  if (e.keyCode === KEYCODE_ENTER) {
    $(e.target).prop('checked', true).change();
  }
};

Dropdown.prototype.handleCheck = function(e) {
  var $input = $(e.target);
  if ($input.is(':checked')) {
    this.selectItem($input);
  }
};

Dropdown.prototype.handleDropdownItemClick = function(e) {
  var $button = $(e.target);
  var $input = this.$selected.find('#' + $button.data('label'));

  if (!$button.hasClass('is-checked')) {
    $input.click();
  }
};

Dropdown.prototype.handleSelectedInputClick = function(e) {
  var $button = this.$panel.find('button[data-label=' + e.target.id + ']');

  $button.toggleClass('is-checked');
};

Dropdown.prototype.handleCheckboxRemoval = function($input) {
  var $item = $input.parent();
  var $label = $input.parent().find('label');
  var $button = this.$panel.find('button[data-label="' + $input.attr('id') +'"]');

  if ($button.length > 0) {
    $button.parent().append($input);
    $button.parent().append($label);
    $button.remove();

    $item.remove();
  }
};

Dropdown.prototype.handleRemoveClick = function(e, opts) {
  var $input = $(e.target).parent().find('input');

  // tag removal
  if (opts) {
    $input = this.$selected.find('#' + opts.key);
  }

  this.handleCheckboxRemoval($input);
};

// "Clear all filters" will remove unchecked dropdown checkboxes
Dropdown.prototype.handleClearFilters = function() {
  var self = this;
  if (this.$selected) {
    this.$selected.find('input:checkbox:not(:checked)').each(function () {
      self.handleCheckboxRemoval($(this));
    });
  }
};

Dropdown.prototype.selectItem = function($input) {
  var $item = $input.parent('.dropdown__item');
  var $label = $item.find('label');
  var prev = $item.prevAll('.dropdown__item');
  var next = $item.nextAll('.dropdown__item');

  $item.after('<li class="dropdown__item">' +
    '<button class="dropdown__item--selected is-checked"' +
    ' data-label="' + $label.attr('for') + '" >' +
    $label.text() + '</button></li>');

  this.$selected.append($item);

  $item.append('<button class="dropdown__remove">' +
    '<span class="u-visually-hidden">Remove</span></button>');

  if (!this.isEmpty()) {
    if (next.length) {
      $(next[0]).find('input[type="checkbox"]').focus();
    } else if (prev.length) {
      $(prev[0]).find('input[type="checkbox"]').focus();
    }
  } else {
    this.removePanel();
    this.$selected.find('input[type="checkbox"]').focus();
  }
};

Dropdown.prototype.removePanel = function() {
  this.$panel.remove();
  this.$button.remove();
};

Dropdown.prototype.isEmpty = function() {
  return this.$panel.find('input').length === 0;
};

Dropdown.prototype.destroy = function() {
  this.events.clear();
};

module.exports = {Dropdown: Dropdown};


/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var _ = __webpack_require__(2);

function Listeners() {
  this.listeners = [];
}

Listeners.prototype.on = function(elm) {
  var $elm = $(elm);
  var args = _.toArray(arguments).slice(1);
  this.listeners = this._listeners || [];
  this.listeners.push({$elm: $elm, args: args});
  $elm.on.apply($elm, args);
};

Listeners.prototype.clear = function() {
  this.listeners.forEach(function(listener) {
    var $elm = listener.$elm;
    var args = listener.args;
    $elm.off.apply($elm, args);
  });
};

module.exports = {Listeners: Listeners};


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global require, module */

var $ = __webpack_require__(0);

/**
 * Utilities for setting or removing tabindex on all focusable elements
 * in a parent div. Useful for hiding elements off-canvas without setting
 * display:none, while still removing from the tab order
 */

function removeTabindex($elm) {
  $elm
    .find('a, button, :input, [tabindex]')
    .attr('tabindex', '-1');
}

function restoreTabindex($elm) {
  $elm
    .find('a, button, :input, [tabindex]')
    .attr('tabindex', '0');
}

module.exports = {
  removeTabindex: removeTabindex,
  restoreTabindex: restoreTabindex
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


module.exports = __webpack_require__(30);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var ps = __webpack_require__(31)
  , psInstances = __webpack_require__(3);

function mountJQuery(jQuery) {
  jQuery.fn.perfectScrollbar = function (settingOrCommand) {
    return this.each(function () {
      if (typeof settingOrCommand === 'object' ||
          typeof settingOrCommand === 'undefined') {
        // If it's an object or none, initialize.
        var settings = settingOrCommand;

        if (!psInstances.get(this)) {
          ps.initialize(this, settings);
        }
      } else {
        // Unless, it may be a command.
        var command = settingOrCommand;

        if (command === 'update') {
          ps.update(this);
        } else if (command === 'destroy') {
          ps.destroy(this);
        }
      }

      return jQuery(this);
    });
  };
}

if (true) {
  // AMD. Register as an anonymous module.
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (mountJQuery),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  var jq = window.jQuery ? window.jQuery : window.$;
  if (typeof jq !== 'undefined') {
    mountJQuery(jq);
  }
}

module.exports = mountJQuery;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var destroy = __webpack_require__(32)
  , initialize = __webpack_require__(36)
  , update = __webpack_require__(44);

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var d = __webpack_require__(9)
  , h = __webpack_require__(4)
  , instances = __webpack_require__(3);

module.exports = function (element) {
  var i = instances.get(element);

  i.event.unbindAll();
  d.remove(i.scrollbarX);
  d.remove(i.scrollbarY);
  d.remove(i.scrollbarXRail);
  d.remove(i.scrollbarYRail);
  h.removePsClasses(element);

  instances.remove(element);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


module.exports = {
  wheelSpeed: 1,
  wheelPropagation: false,
  swipePropagation: true,
  minScrollbarLength: null,
  maxScrollbarLength: null,
  useBothWheelAxes: false,
  useKeyboard: true,
  suppressScrollX: false,
  suppressScrollY: false,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var cls = __webpack_require__(12)
  , h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

// Handlers
var clickRailHandler = __webpack_require__(37)
  , dragScrollbarHandler = __webpack_require__(38)
  , keyboardHandler = __webpack_require__(39)
  , mouseWheelHandler = __webpack_require__(40)
  , nativeScrollHandler = __webpack_require__(41)
  , selectionHandler = __webpack_require__(42)
  , touchHandler = __webpack_require__(43);

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = h.extend(i.settings, userSettings);

  clickRailHandler(element);
  dragScrollbarHandler(element);
  mouseWheelHandler(element);
  nativeScrollHandler(element);
  selectionHandler(element);

  if (h.env.supportsTouch || h.env.supportsIePointer) {
    touchHandler(element, h.env.supportsTouch, h.env.supportsIePointer);
  }
  if (i.settings.useKeyboard) {
    keyboardHandler(element);
  }

  updateGeometry(element);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = window.Event.prototype.stopPropagation.bind;

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var halfOfScrollbarLength = h.toInt(i.scrollbarYHeight / 2);
    var positionTop = i.railYRatio * (e.pageY - window.scrollY - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);
    var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
    var positionRatio = positionTop / maxPositionTop;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    element.scrollTop = (i.contentHeight - i.containerHeight) * positionRatio;
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var halfOfScrollbarLength = h.toInt(i.scrollbarXWidth / 2);
    var positionLeft = i.railXRatio * (e.pageX - window.scrollX - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);
    var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
    var positionRatio = positionLeft / maxPositionLeft;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    element.scrollLeft = (i.contentWidth - i.containerWidth) * positionRatio;
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var d = __webpack_require__(9)
  , h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = i.scrollbarXRail.getBoundingClientRect().left + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = h.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth)));
    element.scrollLeft = scrollLeft;
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    h.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = h.toInt(d.css(i.scrollbarX, 'left')) * i.railXRatio;
    h.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = i.scrollbarYRail.getBoundingClientRect().top + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = h.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    element.scrollTop = scrollTop;
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    h.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = h.toInt(d.css(i.scrollbarY, 'top')) * i.railYRatio;
    h.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (e.isDefaultPrevented && e.isDefaultPrevented()) {
      return;
    }

    if (!hovered) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      // go deeper if element is a webcomponent
      while (activeElement.shadowRoot) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      if (h.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      deltaX = -30;
      break;
    case 38: // up
      deltaY = 30;
      break;
    case 39: // right
      deltaX = 30;
      break;
    case 40: // down
      deltaY = -30;
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    element.scrollTop = element.scrollTop - deltaY;
    element.scrollLeft = element.scrollLeft + deltaX;
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    return [deltaX, deltaY];
  }

  function shouldBeConsumedByTextarea(deltaX, deltaY) {
    var hoveredTextarea = element.querySelector('textarea:hover');
    if (hoveredTextarea) {
      var maxScrollTop = hoveredTextarea.scrollHeight - hoveredTextarea.clientHeight;
      if (maxScrollTop > 0) {
        if (!(hoveredTextarea.scrollTop === 0 && deltaY > 0) &&
            !(hoveredTextarea.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = hoveredTextarea.scrollLeft - hoveredTextarea.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(hoveredTextarea.scrollLeft === 0 && deltaX < 0) &&
            !(hoveredTextarea.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    // FIXME: this is a quick fix for the select problem in FF and IE.
    // If there comes an effective way to deal with the problem,
    // this lines should be removed.
    if (!h.env.isWebKit && element.querySelector('select:focus')) {
      return;
    }

    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByTextarea(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop = element.scrollTop - (deltaY * i.settings.wheelSpeed);
      element.scrollLeft = element.scrollLeft + (deltaX * i.settings.wheelSpeed);
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop = element.scrollTop - (deltaY * i.settings.wheelSpeed);
      } else {
        element.scrollTop = element.scrollTop + (deltaX * i.settings.wheelSpeed);
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft = element.scrollLeft + (deltaX * i.settings.wheelSpeed);
      } else {
        element.scrollLeft = element.scrollLeft - (deltaY * i.settings.wheelSpeed);
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        element.scrollTop = element.scrollTop + scrollDiff.top;
        element.scrollLeft = element.scrollLeft + scrollDiff.left;
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    h.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        h.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        h.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        h.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        h.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop = element.scrollTop - differenceY;
    element.scrollLeft = element.scrollLeft - differenceX;

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  }

  if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element, supportsTouch, supportsIePointer) {
  var i = instances.get(element);
  bindTouchHandler(element, i, supportsTouch, supportsIePointer);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */


var d = __webpack_require__(9)
  , h = __webpack_require__(4)
  , instances = __webpack_require__(3)
  , updateGeometry = __webpack_require__(5);

module.exports = function (element) {
  var i = instances.get(element);

  // Recalculate rail margins
  d.css(i.scrollbarXRail, 'display', 'block');
  d.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  d.css(i.scrollbarXRail, 'display', 'none');
  d.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  d.css(i.scrollbarXRail, 'display', '');
  d.css(i.scrollbarYRail, 'display', '');
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0) ], __WEBPACK_AMD_DEFINE_RESULT__ = function(a0) {
            return factory(a0);
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46).setImmediate))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(47);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50), __webpack_require__(48)))

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0) ], __WEBPACK_AMD_DEFINE_RESULT__ = function(a0) {
            return root["Bloodhound"] = factory(a0);
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

/***/ }),
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(111)(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(197)()
	? Object.assign
	: __webpack_require__(198);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(211)() ? Symbol : __webpack_require__(212);


/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* Accessible tab interface
/* Courtesy of http://heydonworks.com/practical_aria_examples/
-----------------------------------------------------------------------------------------
*/

var $ = __webpack_require__(0);
var URI = __webpack_require__(8);
var _ = __webpack_require__(2);

var events = __webpack_require__(14);

var analytics = __webpack_require__(15);

// The class for the container div

var $container = '.tab-interface';

function show($target, push) {
  // Toggle tabs
  $('[role="tab"]').attr({
    'aria-selected': null
  });
  $target.attr({
    'aria-selected': 'true',
  });

  // Toggle panels
  $($container + ' [role="tabpanel"]').attr('aria-hidden', 'true');
  var $panel = $('#' + $target.attr('href').substring(1));
  $panel.attr('aria-hidden', null);

  var name = $target.closest('[role="tablist"]').attr('data-name');
  var value = $target.attr('data-name');

  if (push) {
    var query = _.extend(
      URI.parseQuery(window.location.search),
      _.object([[name, value]])
    );
    var search = URI('').query(query).toString();
    window.history.pushState(query, search, search || window.location.pathname);
    analytics.pageView();
  }

  events.emit('tabs.show.' + value, {$tab: $target, $panel: $panel});
}

function refreshTabs() {
  var query = URI.parseQuery(window.location.search);
  $('ul[role="tablist"]').each(function(index, tabs) {
    var $tabs = $(tabs);
    var name = $tabs.attr('data-name');
    var $target = query[name] ?
      $tabs.find('[role="tab"][data-name="' + query[name] + '"]') :
      $tabs.find('[role="tab"]').eq(0);
    if ($target.length) {
      show($target);
    } else {
      $('[role="tabpanel"]').attr('aria-hidden', null);
    }
  });
}

function onShow($elm, callback) {
  var $panel = $elm.closest('[role="tabpanel"]');
  if ($panel.is(':visible')) {
    callback();
  } else {
    var $trigger = $('[href="#' + $panel.attr('id') + '"]');
    var event = 'tabs.show.' + $trigger.attr('data-name');
    events.once(event, callback);
  }
}

function init() {
  // Handle click on tab to show + focus tabpanel
  $('[role="tab"]').on('click', function(e) {
    e.preventDefault();
    show($(this), true);
  });

  $(window).on('popstate', refreshTabs);
  refreshTabs();
}

module.exports = {
  onShow: onShow,
  init: init,
};


/***/ }),
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(202)()
	? String.prototype.contains
	: __webpack_require__(203);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString
  , id = objToString.call(
	(function () {
		return arguments;
	})()
);

module.exports = function (value) {
	return objToString.call(value) === id;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};


/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(108)()
	? Object.setPrototypeOf
	: __webpack_require__(109);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
 return typeof obj === "function";
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(52)
  , normalizeOpts = __webpack_require__(63)
  , isCallable    = __webpack_require__(85)
  , contains      = __webpack_require__(64)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * @module Icicle
 */
module.exports = {
	freeze: lock,
	unfreeze: unlock,
	isFrozen: isLocked
};


/** Set of targets  */
var lockCache = new WeakMap;


/**
 * Set flag on target with the name passed
 *
 * @return {bool} Whether lock succeeded
 */
function lock(target, name){
	var locks = lockCache.get(target);
	if (locks && locks[name]) return false;

	//create lock set for a target, if none
	if (!locks) {
		locks = {};
		lockCache.set(target, locks);
	}

	//set a new lock
	locks[name] = true;

	//return success
	return true;
}


/**
 * Unset flag on the target with the name passed.
 *
 * Note that if to return new value from the lock/unlock,
 * then unlock will always return false and lock will always return true,
 * which is useless for the user, though maybe intuitive.
 *
 * @param {*} target Any object
 * @param {string} name A flag name
 *
 * @return {bool} Whether unlock failed.
 */
function unlock(target, name){
	var locks = lockCache.get(target);
	if (!locks || !locks[name]) return false;

	locks[name] = null;

	return true;
}


/**
 * Return whether flag is set
 *
 * @param {*} target Any object to associate lock with
 * @param {string} name A flag name
 *
 * @return {Boolean} Whether locked or not
 */
function isLocked(target, name){
	var locks = lockCache.get(target);
	return (locks && locks[name]);
}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

/**
 * A storage of per-target callbacks.
 * WeakMap is the most safe solution.
 *
 * @module emmy/listeners
 */


/**
 * Property name to provide on targets.
 *
 * Can’t use global WeakMap -
 * it is impossible to provide singleton global cache of callbacks for targets
 * not polluting global scope. So it is better to pollute target scope than the global.
 *
 * Otherwise, each emmy instance will create it’s own cache, which leads to mess.
 *
 * Also can’t use `._events` property on targets, as it is done in `events` module,
 * because it is incompatible. Emmy targets universal events wrapper, not the native implementation.
 *
 */
//FIXME: new npm forces flat modules structure, so weakmaps are better providing that there’s the one emmy across the project.
var cbPropName = '_callbacks';


/**
 * Get listeners for the target/evt (optionally).
 *
 * @param {object} target a target object
 * @param {string}? evt an evt name, if undefined - return object with events
 *
 * @return {(object|array)} List/set of listeners
 */
function listeners(target, evt, tags){
	var cbs = target[cbPropName];
	var result;

	if (!evt) {
		result = cbs || {};

		//filter cbs by tags
		if (tags) {
			var filteredResult = {};
			for (var evt in result) {
				filteredResult[evt] = result[evt].filter(function (cb) {
					return hasTags(cb, tags);
				});
			}
			result = filteredResult;
		}

		return result;
	}

	if (!cbs || !cbs[evt]) {
		return [];
	}

	result = cbs[evt];

	//if there are evt namespaces specified - filter callbacks
	if (tags && tags.length) {
		result = result.filter(function (cb) {
			return hasTags(cb, tags);
		});
	}

	return result;
}


/**
 * Remove listener, if any
 */
listeners.remove = function(target, evt, cb, tags){
	//get callbacks for the evt
	var evtCallbacks = target[cbPropName];
	if (!evtCallbacks || !evtCallbacks[evt]) return false;

	var callbacks = evtCallbacks[evt];

	//if tags are passed - make sure callback has some tags before removing
	if (tags && tags.length && !hasTags(cb, tags)) return false;

	//remove specific handler
	for (var i = 0; i < callbacks.length; i++) {
		//once method has original callback in .cb
		if (callbacks[i] === cb || callbacks[i].fn === cb) {
			callbacks.splice(i, 1);
			break;
		}
	}
};


/**
 * Add a new listener
 */
listeners.add = function(target, evt, cb, tags){
	if (!cb) return;

	var targetCallbacks = target[cbPropName];

	//ensure set of callbacks for the target exists
	if (!targetCallbacks) {
		targetCallbacks = {};
		Object.defineProperty(target, cbPropName, {
			value: targetCallbacks
		});
	}

	//save a new callback
	(targetCallbacks[evt] = targetCallbacks[evt] || []).push(cb);

	//save ns for a callback, if any
	if (tags && tags.length) {
		cb._ns = tags;
	}
};


/** Detect whether an cb has at least one tag from the list */
function hasTags(cb, tags){
	if (cb._ns) {
		//if cb is tagged with a ns and includes one of the ns passed - keep it
		for (var i = tags.length; i--;){
			if (cb._ns.indexOf(tags[i]) >= 0) return true;
		}
	}
}


module.exports = listeners;

/***/ }),
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject        = __webpack_require__(110)
  , value           = __webpack_require__(16)
  , objIsPrototypOf = Object.prototype.isPrototypeOf
  , defineProperty  = Object.defineProperty
  , nullDesc        = {
	configurable: true,
	enumerable: false,
	writable: true,
	value: undefined
}
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self (obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
}(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
));

__webpack_require__(193);


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

var map = { function: true, object: true };

module.exports = function (value) {
	return (isValue(value) && map[typeof value]) || false;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(65)
  , isString       = __webpack_require__(66)
  , ArrayIterator  = __webpack_require__(204)
  , StringIterator = __webpack_require__(225)
  , iterable       = __webpack_require__(226)
  , iteratorSymbol = __webpack_require__(53).iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear    = __webpack_require__(205)
  , assign   = __webpack_require__(52)
  , callable = __webpack_require__(21)
  , value    = __webpack_require__(16)
  , d        = __webpack_require__(86)
  , autoBind = __webpack_require__(206)
  , Symbol   = __webpack_require__(53)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(230).extend;

var defaultOpts = {
  collapseOthers: false,
  customHiding: false,
  contentPrefix: 'accordion',
  openFirst: false
};

var defaultSelectors = {
  trigger: 'button'
};

/**
 * Creates a new accordion component
 * @constructor
 * @param {Element} elm - The element that contains the entire accordion
 * @param {object} selectors - Selectors for locating DOM elements
 * @param {object} opts - Options for configuring behavior
 */

var Accordion = function(elm, selectors, opts) {
  this.elm = elm;
  this.selectors = extend({}, defaultSelectors, selectors);
  this.opts = extend({}, defaultOpts, opts);

  this.triggers = this.findTriggers();

  this.listeners = [];
  this.addEventListener(this.elm, 'click', this.handleClickElm.bind(this));

  if (this.opts.openFirst) {
    this.expand(this.triggers[0]);
  }
};

Accordion.prototype.handleClickElm = function(e) {
  // If the target is the button, toggle the button
  // Else see if the target is a child of a button
  if (this.triggers.indexOf(e.target) > -1) {
    this.toggle(e.target);
  } else {
    var self = this;
    this.triggers.forEach(function(trigger){
      if (e.target.parentElement === trigger) {
        self.toggle(trigger);
      }
    });
  }
};

Accordion.prototype.findTriggers = function() {
  var self = this;
  var triggers = [].slice.call(this.elm.querySelectorAll(this.selectors.trigger));
  triggers.forEach(function(trigger, index) {
    self.setAria(trigger, index);
  });
  return triggers;
};

Accordion.prototype.setAria = function(trigger, index) {
  var content = trigger.nextElementSibling;
  var contentID;

  if (content.hasAttribute('id')) {
    contentID = content.getAttribute('id');
  } else {
    contentID = this.opts.contentPrefix + '-' + 'content-' + index;
    content.setAttribute('id', contentID);
  }

  trigger.setAttribute('aria-controls', contentID);
  trigger.setAttribute('aria-expanded', 'false');
  content.setAttribute('aria-hidden', 'true');
  this.setStyles(content);
};

Accordion.prototype.toggle = function(elm) {
  var f = elm.getAttribute('aria-expanded') === 'true' ? this.collapse : this.expand;
  f.call(this, elm);
};

Accordion.prototype.expand = function(button) {
  if (this.opts.collapseOthers) {
    this.collapseAll();
  }
  var content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', 'true');
  content.setAttribute('aria-hidden', 'false');
  this.setStyles(content);
};

Accordion.prototype.collapse = function(button) {
  var content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', 'false');
  content.setAttribute('aria-hidden', 'true');
  this.setStyles(content);
};

Accordion.prototype.collapseAll = function() {
  var self = this;
  this.triggers.forEach(function(trigger) {
    self.collapse(trigger);
  });
};

Accordion.prototype.expandAll = function() {
  var self = this;
  this.triggers.forEach(function(trigger) {
    self.expand(trigger);
  });
};

Accordion.prototype.setStyles = function(content) {
  var prop = content.getAttribute('aria-hidden') === 'true' ? 'none' : 'block';

  if (!this.opts.customHiding) {
    content.style.display = prop;
  }
};

Accordion.prototype.addEventListener = function(elm, event, callback) {
  if (elm) {
    elm.addEventListener(event, callback);
    this.listeners.push({
      elm: elm,
      event: event,
      callback: callback
    });
  }
};

Accordion.prototype.destroy = function() {
  this.listeners.forEach(function(listener) {
    listener.elm.removeEventListener(listener.event, listener.callback);
  });
};

module.exports = { Accordion: Accordion };


/***/ }),
/* 115 */
/***/ (function(module, exports) {

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/**
 * Source: https://github.com/timoxley/to-array
 *
 * Convert an array-like object into an `Array`.
 * If `collection` is already an `Array`, then will return a clone of `collection`.
 *
 * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
 * @return {Array} Naive conversion of `collection` to a new `Array`.
 * @api public
 */

module.exports = function toArray(collection) {
  if (typeof collection === 'undefined') return [];
  if (collection === null) return [null];
  if (collection === window) return [window];
  if (typeof collection === 'string') return [collection];
  if (isArray(collection)) return collection;
  if (typeof collection.length != 'number') return [collection];
  if (typeof collection === 'function' && collection instanceof Function) return [collection];

  var arr = [];
  for (var i = 0; i < collection.length; i++) {
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
      arr.push(collection[i]);
    }
  }
  if (!arr.length) return [];
  return arr;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}


/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function(list) {
  return function(initValues, element, notCreate) {
    var item = this;

    this._values = {};

    this.found = false; // Show if list.searched == true and this.found == true
    this.filtered = false;// Show if list.filtered == true and this.filtered == true

    var init = function(initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate);
        } else {
          item.values(initValues);
        }
      } else {
        item.elm = element;
        var values = list.templater.get(item, initValues);
        item.values(values);
      }
    };

    this.values = function(newValues, notCreate) {
      if (newValues !== undefined) {
        for(var name in newValues) {
          item._values[name] = newValues[name];
        }
        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function() {
      list.templater.show(item);
    };

    this.hide = function() {
      list.templater.hide(item);
    };

    this.matching = function() {
      return (
        (list.filtered && list.searched && item.found && item.filtered) ||
        (list.filtered && !list.searched && item.filtered) ||
        (!list.filtered && list.searched && item.found) ||
        (!list.filtered && !list.searched)
      );
    };

    this.visible = function() {
      return (item.elm && (item.elm.parentNode == list.list)) ? true : false;
    };

    init(initValues, element, notCreate);
  };
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {


/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}



/***/ }),
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!__webpack_require__(190)()) {
	Object.defineProperty(__webpack_require__(191), 'WeakMap',
		{ value: __webpack_require__(192), configurable: true, enumerable: false,
			writable: true });
}


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var weakMap, x;
	if (typeof WeakMap !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== '[object WeakMap]') return false;
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	return true;
};


/***/ }),
/* 191 */
/***/ (function(module, exports) {

/* eslint strict: "off" */

module.exports = (function () {
	return this;
}());


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(84)
  , object            = __webpack_require__(194)
  , value             = __webpack_require__(16)
  , randomUniq        = __webpack_require__(195)
  , d                 = __webpack_require__(196)
  , getIterator       = __webpack_require__(112)
  , forOf             = __webpack_require__(228)
  , toStringTagSymbol = __webpack_require__(53).toStringTag
  , isNative          = __webpack_require__(229)

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)) {
		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		value(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(WeakMapPoly)
	});
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () { return '[object WeakMap]'; })
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(108)()) {
	shim = __webpack_require__(109);
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = {
		configurable: false,
		enumerable: false,
		writable: true,
		value: undefined
	};
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
}());


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(110);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generated = Object.create(null)

  , random = Math.random;

module.exports = function () {
	var str;
	do {
 str = random().toString(36).slice(2);
} while (generated[str]);
	return str;
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(52)
  , normalizeOpts = __webpack_require__(63)
  , isCallable    = __webpack_require__(85)
  , contains      = __webpack_require__(64)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(199)
  , value = __webpack_require__(16)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(200)()
	? Object.keys
	: __webpack_require__(201);


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
 return false;
}
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(51);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(84)
  , contains       = __webpack_require__(64)
  , d              = __webpack_require__(86)
  , Iterator       = __webpack_require__(113)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(16);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy             = __webpack_require__(207)
  , normalizeOptions = __webpack_require__(63)
  , ensureCallable   = __webpack_require__(21)
  , map              = __webpack_require__(222)
  , callable         = __webpack_require__(21)
  , validValue       = __webpack_require__(16)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFrom  = __webpack_require__(208)
  , assign = __webpack_require__(52)
  , value  = __webpack_require__(16);

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(209)()
	? Array.from
	: __webpack_require__(210);


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && (result !== arr) && (result[1] === "dwa"));
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iteratorSymbol = __webpack_require__(53).iterator
  , isArguments    = __webpack_require__(65)
  , isFunction     = __webpack_require__(216)
  , toPosInt       = __webpack_require__(217)
  , callable       = __webpack_require__(21)
  , validValue     = __webpack_require__(16)
  , isValue        = __webpack_require__(51)
  , isString       = __webpack_require__(66)
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity
module.exports = function (arrayLike /*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(length = arrayLike.length);
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__(213)
  , validateSymbol = __webpack_require__(214)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(52)
  , normalizeOpts = __webpack_require__(63)
  , isCallable    = __webpack_require__(85)
  , contains      = __webpack_require__(64)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(215);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString, id = objToString.call(__webpack_require__(111));

module.exports = function (value) {
	return typeof value === "function" && objToString.call(value) === id;
};


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(218)

  , max = Math.max;

module.exports = function (value) {
 return max(0, toInteger(value));
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(219)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(220)()
	? Math.sign
	: __webpack_require__(221);


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return (sign(10) === 1) && (sign(-20) === -1);
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return value > 0 ? 1 : -1;
};


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(21)
  , forEach  = __webpack_require__(223)
  , call     = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(224)("forEach");


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable                = __webpack_require__(21)
  , value                   = __webpack_require__(16)
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(84)
  , d              = __webpack_require__(86)
  , Iterator       = __webpack_require__(113)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(227);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(65)
  , isString       = __webpack_require__(66)
  , iteratorSymbol = __webpack_require__(53).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(65)
  , callable    = __webpack_require__(21)
  , isString    = __webpack_require__(66)
  , get         = __webpack_require__(112)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `WeakMap` implementation, whatever that is.



module.exports = (function () {
	if (typeof WeakMap !== 'function') return false;
	return (Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]');
}());


/***/ }),
/* 230 */
/***/ (function(module, exports) {

var extend = function(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = arguments[i][key];
      }
    }
  }
  return out;
};

module.exports = {
  extend: extend
}


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(2);
var List = __webpack_require__(232);
var Accordion = __webpack_require__(114).Accordion;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

// https://davidwalsh.name/element-matches-selector
function selectorMatches(el, selector) {
  var p = Element.prototype;
  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

function forEach(values, callback) {
  return [].forEach.call(values, callback);
}

var itemTemplate = _.template(
  '<li class="{{ glossaryItemClass }}">' +
    '<button class="data-glossary-term {{ termClass }}">{{ term }}' +
    '</button>' +
    '<div class="{{ definitionClass }}">{{ definition }}</div>' +
  '</li>',
  {interpolate: /\{\{(.+?)\}\}/g}
);

var defaultSelectors = {
  glossaryID: '#glossary',
  toggle: '.js-glossary-toggle',
  close: '.js-glossary-close',
  listClass: '.js-glossary-list',
  searchClass: '.js-glossary-search'
};

var defaultClasses = {
  definitionClass: 'glossary__definition',
  glossaryItemClass: 'glossary__item',
  highlightedTerm: 'term--highlight',
  termClass: 'glossary__term'
};

function removeTabindex(elm) {
  var elms = getTabIndex(elm);
  forEach(elms, function(elm) {
    elm.setAttribute('tabIndex', '-1');
  });
}

function restoreTabindex(elm) {
  var elms = getTabIndex(elm);
  forEach(elms, function(elm) {
    elm.setAttribute('tabIndex', '0');
  });
}

function getTabIndex(elm) {
  return elm.querySelectorAll('a, button, input, [tabindex]');
}

/**
 * Glossary widget
 * @constructor
 * @param {Array} terms - Term objects with "glossary-term" and "glossary-definition" keys
 * @param {Object} selectors - CSS selectors for glossary components
 * @param {Object} classes - CSS classes to be applied for styling
 */
function Glossary(terms, selectors, classes) {
  this.terms = terms;
  this.selectors = _.extend({}, defaultSelectors, selectors);
  this.classes = _.extend({}, defaultClasses, classes);

  this.body = document.querySelector(this.selectors.glossaryID);
  this.toggleBtn = document.querySelector(this.selectors.toggle);
  this.closeBtn = document.querySelector(this.selectors.close);
  this.search = this.body.querySelector(this.selectors.searchClass);
  this.listElm = this.body.querySelector(this.selectors.listClass);
  this.selectedTerm = this.toggleBtn;

  // Initialize state
  this.isOpen = false;

  // Update DOM
  this.populate();
  this.initList();
  this.linkTerms();

  // Remove tabindices
  removeTabindex(this.body);

  // Initialize accordions
  this.accordion = new Accordion(this.listElm, null, {contentPrefix: 'glossary'});

  // Bind listeners
  this.listeners = [];
  this.addEventListener(this.toggleBtn, 'click', this.toggle.bind(this));
  this.addEventListener(this.closeBtn, 'click', this.hide.bind(this));
  this.addEventListener(this.search, 'input', this.handleInput.bind(this));
  this.addEventListener(document.body, 'keyup', this.handleKeyup.bind(this));
}

Glossary.prototype.populate = function() {
  this.terms.forEach(function(term) {
    var opts = {
      term: term.term,
      definition: term.definition,
      definitionClass: this.classes.definitionClass,
      glossaryItemClass: this.classes.glossaryItemClass,
      termClass: this.classes.termClass
    };
    this.listElm.insertAdjacentHTML('beforeend', itemTemplate(opts));
  }, this);
};

/** Initialize list.js list of terms */
Glossary.prototype.initList = function() {
  var glossaryId = this.selectors.glossaryID.slice(1);
  var listClass = this.selectors.listClass.slice(1);
  var searchClass = this.selectors.searchClass.slice(1);
  var options = {
    valueNames: ['data-glossary-term'],
    listClass: listClass,
    searchClass: searchClass,
  };
  this.list = new List(glossaryId, options);
  this.list.sort('data-glossary-term', {order: 'asc'});
};

/** Add links to terms in body */
Glossary.prototype.linkTerms = function() {
  var terms = document.querySelectorAll('[data-term]');
  forEach(terms, function(term) {
    term.setAttribute('title', 'Click to define');
    term.setAttribute('tabIndex', 0);
    term.setAttribute('data-term', (term.getAttribute('data-term') || '').toLowerCase());
  });
  document.body.addEventListener('click', this.handleTermTouch.bind(this));
  document.body.addEventListener('keyup', this.handleTermTouch.bind(this));
};

Glossary.prototype.handleTermTouch = function(e) {
  if (e.which === KEYCODE_ENTER || e.type === 'click') {
    if (selectorMatches(e.target, '[data-term]')) {
      this.show(e);
      this.selectedTerm = e.target;
      this.findTerm(e.target.getAttribute('data-term'));
    }
    else {
      this.selectedTerm = this.toggleBtn;
    }
  }
};

/** Highlight a term */
Glossary.prototype.findTerm = function(term) {
  this.search.value = term;
  var highlightClass = this.classes.highlightedTerm;

  // Highlight the term and remove other highlights
  forEach(this.body.querySelectorAll('.' + highlightClass), function(term) {
    term.classList.remove(highlightClass);
  });
  forEach(this.body.querySelectorAll('span[data-term="' + term + '"]'), function(term) {
    term.classList.add(highlightClass);
  });
  this.list.filter(function(item) {
    return item._values['data-glossary-term'].toLowerCase() === term;
  });

  this.list.search();
  var button = this.list.visibleItems[0].elm.querySelector('button');
  this.accordion.expand(button);
};

Glossary.prototype.toggle = function() {
  var method = this.isOpen ? this.hide : this.show;
  method.apply(this);
};

Glossary.prototype.show = function() {
  this.body.setAttribute('aria-hidden', 'false');
  this.toggleBtn.setAttribute('aria-expanded', 'true');
  this.search.focus();
  this.isOpen = true;
  restoreTabindex(this.body);
};

Glossary.prototype.hide = function() {
  this.body.setAttribute('aria-hidden', 'true');
  this.toggleBtn.setAttribute('aria-expanded', 'false');
  this.selectedTerm.focus();
  this.isOpen = false;
  removeTabindex(this.body);
};

/** Remove existing filters on input */
Glossary.prototype.handleInput = function() {
  if (this.list.filtered) {
    this.list.filter();
  }
};

/** Close glossary on escape keypress */
Glossary.prototype.handleKeyup = function(e) {
  if (e.keyCode == KEYCODE_ESC) {
    if (this.isOpen) {
      this.hide();
    }
  }
};

Glossary.prototype.addEventListener = function(elm, event, callback) {
  if (elm) {
    elm.addEventListener(event, callback);
    this.listeners.push({
      elm: elm,
      event: event,
      callback: callback
    });
  }
};

Glossary.prototype.destroy = function() {
  this.accordion.destroy();
  this.listeners.forEach(function(listener) {
    listener.elm.removeEventListener(listener.event, listener.callback);
  });
};

module.exports = Glossary;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function( window, undefined ) {
"use strict";

var document = window.document,
  getByClass = __webpack_require__(233),
  extend = __webpack_require__(234),
  indexOf = __webpack_require__(115),
  events = __webpack_require__(235),
  toString = __webpack_require__(236),
  naturalSort = __webpack_require__(237),
  classes = __webpack_require__(238),
  getAttribute = __webpack_require__(239),
  toArray = __webpack_require__(116);

var List = function(id, options, values) {

  var self = this,
    init,
    Item = __webpack_require__(117)(self),
    addAsync = __webpack_require__(240)(self);

  init = {
    start: function() {
      self.listClass      = "list";
      self.searchClass    = "search";
      self.sortClass      = "sort";
      self.page           = 10000;
      self.i              = 1;
      self.items          = [];
      self.visibleItems   = [];
      self.matchingItems  = [];
      self.searched       = false;
      self.filtered       = false;
      self.searchColumns  = undefined;
      self.handlers       = { 'updated': [] };
      self.plugins        = {};
      self.valueNames     = [];
      self.utils          = {
        getByClass: getByClass,
        extend: extend,
        indexOf: indexOf,
        events: events,
        toString: toString,
        naturalSort: naturalSort,
        classes: classes,
        getAttribute: getAttribute,
        toArray: toArray
      };

      self.utils.extend(self, options);

      self.listContainer = (typeof(id) === 'string') ? document.getElementById(id) : id;
      if (!self.listContainer) { return; }
      self.list       = getByClass(self.listContainer, self.listClass, true);

      self.parse      = __webpack_require__(241)(self);
      self.templater  = __webpack_require__(242)(self);
      self.search     = __webpack_require__(243)(self);
      self.filter     = __webpack_require__(244)(self);
      self.sort       = __webpack_require__(245)(self);

      this.handlers();
      this.items();
      self.update();
      this.plugins();
    },
    handlers: function() {
      for (var handler in self.handlers) {
        if (self[handler]) {
          self.on(handler, self[handler]);
        }
      }
    },
    items: function() {
      self.parse(self.list);
      if (values !== undefined) {
        self.add(values);
      }
    },
    plugins: function() {
      for (var i = 0; i < self.plugins.length; i++) {
        var plugin = self.plugins[i];
        self[plugin.name] = plugin;
        plugin.init(self, List);
      }
    }
  };

  /*
  * Re-parse the List, use if html have changed
  */
  this.reIndex = function() {
    self.items          = [];
    self.visibleItems   = [];
    self.matchingItems  = [];
    self.searched       = false;
    self.filtered       = false;
    self.parse(self.list);
  };

  this.toJSON = function() {
    var json = [];
    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values());
    }
    return json;
  };


  /*
  * Add object to list
  */
  this.add = function(values, callback) {
    if (values.length === 0) {
      return;
    }
    if (callback) {
      addAsync(values, callback);
      return;
    }
    var added = [],
      notCreate = false;
    if (values[0] === undefined){
      values = [values];
    }
    for (var i = 0, il = values.length; i < il; i++) {
      var item = null;
      notCreate = (self.items.length > self.page) ? true : false;
      item = new Item(values[i], undefined, notCreate);
      self.items.push(item);
      added.push(item);
    }
    self.update();
    return added;
  };

	this.show = function(i, page) {
		this.i = i;
		this.page = page;
		self.update();
    return self;
	};

  /* Removes object from list.
  * Loops through the list and removes objects where
  * property "valuename" === value
  */
  this.remove = function(valueName, value, options) {
    var found = 0;
    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options);
        self.items.splice(i,1);
        il--;
        i--;
        found++;
      }
    }
    self.update();
    return found;
  };

  /* Gets the objects in the list which
  * property "valueName" === value
  */
  this.get = function(valueName, value) {
    var matchedItems = [];
    for (var i = 0, il = self.items.length; i < il; i++) {
      var item = self.items[i];
      if (item.values()[valueName] == value) {
        matchedItems.push(item);
      }
    }
    return matchedItems;
  };

  /*
  * Get size of the list
  */
  this.size = function() {
    return self.items.length;
  };

  /*
  * Removes all items from the list
  */
  this.clear = function() {
    self.templater.clear();
    self.items = [];
    return self;
  };

  this.on = function(event, callback) {
    self.handlers[event].push(callback);
    return self;
  };

  this.off = function(event, callback) {
    var e = self.handlers[event];
    var index = indexOf(e, callback);
    if (index > -1) {
      e.splice(index, 1);
    }
    return self;
  };

  this.trigger = function(event) {
    var i = self.handlers[event].length;
    while(i--) {
      self.handlers[event][i](self);
    }
    return self;
  };

  this.reset = {
    filter: function() {
      var is = self.items,
        il = is.length;
      while (il--) {
        is[il].filtered = false;
      }
      return self;
    },
    search: function() {
      var is = self.items,
        il = is.length;
      while (il--) {
        is[il].found = false;
      }
      return self;
    }
  };

  this.update = function() {
    var is = self.items,
			il = is.length;

    self.visibleItems = [];
    self.matchingItems = [];
    self.templater.clear();
    for (var i = 0; i < il; i++) {
      if (is[i].matching() && ((self.matchingItems.length+1) >= self.i && self.visibleItems.length < self.page)) {
        is[i].show();
        self.visibleItems.push(is[i]);
        self.matchingItems.push(is[i]);
      } else if (is[i].matching()) {
        self.matchingItems.push(is[i]);
        is[i].hide();
      } else {
        is[i].hide();
      }
    }
    self.trigger('updated');
    return self;
  };

  init.start();
};


// AMD support
if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return List; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
module.exports = List;
window.List = List;

})(window);


/***/ }),
/* 233 */
/***/ (function(module, exports) {

/**
 * A cross-browser implementation of getElementsByClass.
 * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
 *
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */

module.exports = (function() {
  if (document.getElementsByClassName) {
    return function(container, className, single) {
      if (single) {
        return container.getElementsByClassName(className)[0];
      } else {
        return container.getElementsByClassName(className);
      }
    };
  } else if (document.querySelector) {
    return function(container, className, single) {
      className = '.' + className;
      if (single) {
        return container.querySelector(className);
      } else {
        return container.querySelectorAll(className);
      }
    };
  } else {
    return function(container, className, single) {
      var classElements = [],
        tag = '*';
      if (container === null) {
        container = document;
      }
      var els = container.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
      for (var i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
          if (single) {
            return els[i];
          } else {
            classElements[j] = els[i];
            j++;
          }
        }
      }
      return classElements;
    };
  }
})();


/***/ }),
/* 234 */
/***/ (function(module, exports) {

/*
 * Source: https://github.com/segmentio/extend
 */

module.exports = function extend (object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1);

    // For each extender, copy their properties on our object.
    for (var i = 0, source; source = args[i]; i++) {
        if (!source) continue;
        for (var property in source) {
            object[property] = source[property];
        }
    }

    return object;
};


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '',
    toArray = __webpack_require__(116);

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el = toArray(el);
  for ( var i = 0; i < el.length; i++ ) {
    el[i][bind](prefix + type, fn, capture || false);
  }
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el = toArray(el);
  for ( var i = 0; i < el.length; i++ ) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};


/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = function(s) {
  s = (s === undefined) ? "" : s;
  s = (s === null) ? "" : s;
  s = s.toString();
  return s;
};


/***/ }),
/* 237 */
/***/ (function(module, exports) {

/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
module.exports = function(a, b, opts) {
    var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        options = opts || {},
        i = function(s) {
            return (options.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a),
        y = i(b),
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
           // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
           return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
   // first try and sort Hex codes or Dates
   if (yD) {
       if (xD < yD) { return -1; }
       else if (xD > yD) { return 1; }
   }
   // natural sorting through split numeric strings and default strings
   for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
       oFxNcL = normChunk(xN[cLoc] || '', xNl);
       oFyNcL = normChunk(yN[cLoc] || '', yNl);
       // handle numeric vs string comparison - number < string - (Kyle Adams)
       if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
           return isNaN(oFxNcL) ? 1 : -1;
       }
       // if unicode use locale comparison
       if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
           var comp = oFxNcL.localeCompare(oFyNcL);
           return comp / Math.abs(comp);
       }
       if (oFxNcL < oFyNcL) { return -1; }
       else if (oFxNcL > oFyNcL) { return 1; }
   }
    return 0;
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var index = __webpack_require__(115);

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list ? this.list.contains(name) : !! ~index(this.array(), name);
};


/***/ }),
/* 239 */
/***/ (function(module, exports) {

/**
 * A cross-browser implementation of getAttribute.
 * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
 *
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */

module.exports = function(el, attr) {
  var result = (el.getAttribute && el.getAttribute(attr)) || null;
  if( !result ) {
    var attrs = el.attributes;
    var length = attrs.length;
    for(var i = 0; i < length; i++) {
      if (attr[i] !== undefined) {
        if(attr[i].nodeName === attr) {
          result = attr[i].nodeValue;
        }
      }
    }
  }
  return result;
};


/***/ }),
/* 240 */
/***/ (function(module, exports) {

module.exports = function(list) {
  var addAsync = function(values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));
    if (values.length > 0) {
      setTimeout(function() {
        addAsync(values, callback, items);
      }, 1);
    } else {
      list.update();
      callback(items);
    }
  };
  return addAsync;
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(list) {

  var Item = __webpack_require__(117)(list);

  var getChildren = function(parent) {
    var nodes = parent.childNodes,
      items = [];
    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i]);
      }
    }
    return items;
  };

  var parse = function(itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };
  var parseAsync = function(itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?
    parse(itemsToIndex, valueNames);
    if (itemElements.length > 0) {
      setTimeout(function() {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];

  return function() {
    var itemsToIndex = getChildren(list.list),
      valueNames = list.valueNames;

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames);
    } else {
      parse(itemsToIndex, valueNames);
    }
  };
};


/***/ }),
/* 242 */
/***/ (function(module, exports) {

var Templater = function(list) {
  var itemSource,
    templater = this;

  var init = function() {
    itemSource = templater.getItemSource(list.item);
    if (itemSource) {
      itemSource = templater.clearSourceItem(itemSource, list.valueNames);
    }
  };

  this.clearSourceItem = function(el, valueNames) {
    for(var i = 0, il = valueNames.length; i < il; i++) {
      var elm;
      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          el.setAttribute('data-'+valueNames[i].data[j], '');
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(el, valueNames[i].name, true);
        if (elm) {
          elm.setAttribute(valueNames[i].attr, "");
        }
      } else {
        elm = list.utils.getByClass(el, valueNames[i], true);
        if (elm) {
          elm.innerHTML = "";
        }
      }
      elm = undefined;
    }
    return el;
  };

  this.getItemSource = function(item) {
    if (item === undefined) {
      var nodes = list.list.childNodes,
        items = [];

      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
    } else if (/<tr[\s>]/g.exec(item)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = item;
      return tbody.firstChild;
    } else if (item.indexOf("<") !== -1) {
      var div = document.createElement('div');
      div.innerHTML = item;
      return div.firstChild;
    } else {
      var source = document.getElementById(list.item);
      if (source) {
        return source;
      }
    }
    return undefined;
  };

  this.get = function(item, valueNames) {
    templater.create(item);
    var values = {};
    for(var i = 0, il = valueNames.length; i < il; i++) {
      var elm;
      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-'+valueNames[i].data[j]);
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
        values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
      } else {
        elm = list.utils.getByClass(item.elm, valueNames[i], true);
        values[valueNames[i]] = elm ? elm.innerHTML : "";
      }
      elm = undefined;
    }
    return values;
  };

  this.set = function(item, values) {
    var getValueName = function(name) {
      for (var i = 0, il = list.valueNames.length; i < il; i++) {
        if (list.valueNames[i].data) {
          var data = list.valueNames[i].data;
          for (var j = 0, jl = data.length; j < jl; j++) {
            if (data[j] === name) {
              return { data: name };
            }
          }
        } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
          return list.valueNames[i];
        } else if (list.valueNames[i] === name) {
          return name;
        }
      }
    };
    var setValue = function(name, value) {
      var elm;
      var valueName = getValueName(name);
      if (!valueName)
        return;
      if (valueName.data) {
        item.elm.setAttribute('data-'+valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);
        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);
        if (elm) {
          elm.innerHTML = value;
        }
      }
      elm = undefined;
    };
    if (!templater.create(item)) {
      for(var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(v, values[v]);
        }
      }
    }
  };

  this.create = function(item) {
    if (item.elm !== undefined) {
      return false;
    }
    if (itemSource === undefined) {
      throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
    }
    /* If item source does not exists, use the first item in list as
    source for new items */
    var newItem = itemSource.cloneNode(true);
    newItem.removeAttribute('id');
    item.elm = newItem;
    templater.set(item, item.values());
    return true;
  };
  this.remove = function(item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.show = function(item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };
  this.hide = function(item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.clear = function() {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1)
      {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function(list) {
  return new Templater(list);
};


/***/ }),
/* 243 */
/***/ (function(module, exports) {

module.exports = function(list) {
  var item,
    text,
    columns,
    searchString,
    customSearch;

  var prepare = {
    resetList: function() {
      list.i = 1;
      list.templater.clear();
      customSearch = undefined;
    },
    setOptions: function(args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof(args[1]) == "function") {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function() {
      if (list.items.length === 0) return;
      if (columns === undefined) {
        columns = (list.searchColumns === undefined) ? prepare.toArray(list.items[0].values()) : list.searchColumns;
      }
    },
    setSearchString: function(s) {
      s = list.utils.toString(s).toLowerCase();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters
      searchString = s;
    },
    toArray: function(values) {
      var tmpColumn = [];
      for (var name in values) {
        tmpColumn.push(name);
      }
      return tmpColumn;
    }
  };
  var search = {
    list: function() {
      for (var k = 0, kl = list.items.length; k < kl; k++) {
        search.item(list.items[k]);
      }
    },
    item: function(item) {
      item.found = false;
      for (var j = 0, jl = columns.length; j < jl; j++) {
        if (search.values(item.values(), columns[j])) {
          item.found = true;
          return;
        }
      }
    },
    values: function(values, column) {
      if (values.hasOwnProperty(column)) {
        text = list.utils.toString(values[column]).toLowerCase();
        if ((searchString !== "") && (text.search(searchString) > -1)) {
          return true;
        }
      }
      return false;
    },
    reset: function() {
      list.reset.search();
      list.searched = false;
    }
  };

  var searchMethod = function(str) {
    list.trigger('searchStart');

    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction
    prepare.setColumns();

    if (searchString === "" ) {
      search.reset();
    } else {
      list.searched = true;
      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    list.update();
    list.trigger('searchComplete');
    return list.visibleItems;
  };

  list.handlers.searchStart = list.handlers.searchStart || [];
  list.handlers.searchComplete = list.handlers.searchComplete || [];

  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'keyup', function(e) {
    var target = e.target || e.srcElement, // IE have srcElement
      alreadyCleared = (target.value === "" && !list.searched);
    if (!alreadyCleared) { // If oninput already have resetted the list, do nothing
      searchMethod(target.value);
    }
  });

  // Used to detect click on HTML5 clear button
  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'input', function(e) {
    var target = e.target || e.srcElement;
    if (target.value === "") {
      searchMethod('');
    }
  });

  return searchMethod;
};


/***/ }),
/* 244 */
/***/ (function(module, exports) {

module.exports = function(list) {

  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];

  return function(filterFunction) {
    list.trigger('filterStart');
    list.i = 1; // Reset paging
    list.reset.filter();
    if (filterFunction === undefined) {
      list.filtered = false;
    } else {
      list.filtered = true;
      var is = list.items;
      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i];
        if (filterFunction(item)) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
      }
    }
    list.update();
    list.trigger('filterComplete');
    return list.visibleItems;
  };
};


/***/ }),
/* 245 */
/***/ (function(module, exports) {

module.exports = function(list) {
  list.sortFunction = list.sortFunction || function(itemA, itemB, options) {
    options.desc = options.order == "desc" ? true : false; // Natural sort uses this format
    return list.utils.naturalSort(itemA.values()[options.valueName], itemB.values()[options.valueName], options);
  };

  var buttons = {
    els: undefined,
    clear: function() {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function(btn) {
      var predefinedOrder = list.utils.getAttribute(btn, 'data-order');
      if (predefinedOrder == "asc" || predefinedOrder == "desc") {
        return predefinedOrder;
      } else if (list.utils.classes(btn).has('desc')) {
        return "asc";
      } else if (list.utils.classes(btn).has('asc')) {
        return "desc";
      } else {
        return "asc";
      }
    },
    getInSensitive: function(btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');
      if (insensitive === "false") {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function(options) {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        var btn = buttons.els[i];
        if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
          continue;
        }
        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');
        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          if (predefinedOrder == options.order) {
            list.utils.classes(btn).add(options.order);
          }
        } else {
          list.utils.classes(btn).add(options.order);
        }
      }
    }
  };
  var sort = function() {
    list.trigger('sortStart');
    var options = {};

    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

    if (target) {
      options.valueName = list.utils.getAttribute(target, 'data-sort');
      buttons.getInSensitive(target, options);
      options.order = buttons.getOrder(target);
    } else {
      options = arguments[1] || options;
      options.valueName = arguments[0];
      options.order = options.order || "asc";
      options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
    }
    buttons.clear();
    buttons.setOrder(options);

    options.sortFunction = options.sortFunction || list.sortFunction;
    list.items.sort(function(a, b) {
      var mult = (options.order === 'desc') ? -1 : 1;
      return (options.sortFunction(a, b, options) * mult);
    });
    list.update();
    list.trigger('sortComplete');
  };

  // Add handlers
  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];

  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);

  return sort;
};


/***/ }),
/* 246 */
/***/ (function(module, exports) {

module.exports = [{"term":"Act","definition":"The Federal Election Campaign Act of 1971, as amended (<a href=\"https://www.fec.gov/data/legal/statutes/\">52 U.S.C. §§30101-30146</a>). 11 CFR <a href=\"https://www.fec.gov/regulations/100-18/CURRENT#100-18\">100.18</a>. Prior to September 1, 2014, the Act appeared in Title 2 of the U.S. Code. Sometimes abbreviated FECA."},{"term":"Administrative expense","definition":"For party committees, rent, utilities, office equipment, office supplies, routine building maintenance and other operating costs not attributable to a specific candidate."},{"term":"Advance","definition":"The payment by an individual from his or her personal funds, including a personal credit card, for the costs incurred in providing goods or services to, or obtaining goods or services that are used by or on behalf of, a candidate or a political committee.  See <a href=\"https://www.fec.gov/regulations/116-5/CURRENT#116-5\">11 CFR 116.5</a>."},{"term":"Advisory opinion (AO)","definition":"A formal response from the Commission regarding the legality of a specific activity proposed in an advisory opinion request (AOR). 11 CFR Part <a href=\"https://www.fec.gov/regulations/112\">112</a>."},{"term":"Affiliated committees","definition":"Committees and organizations that are considered one committee for purposes of the contribution limits. <a href=\"https://www.fec.gov/regulations/110-3/CURRENT#110-3\">11 CFR 110.3(a)(1)</a>. Affiliated committees include (1) All committees established or authorized by a candidate as part of his or her campaign for federal or nonfederal office; and (2) All committees established, financed, maintained or controlled by the same person, group or organization. 11 CFR <a href=\"https://www.fec.gov/regulations/100-5/CURRENT#100-5-g\">100.5(g)(1) and (2)</a>; <a href=\"https://www.fec.gov/regulations/110-3/CURRENT#110-3\">11 CFR 110.3(a)(1)</a>."},{"term":"Agent (of a candidate)","definition":"An agent of a federal candidate or officeholder is any person who has actual authority, either express or implied, to engage in any of the following activities on behalf of the candidate or officeholder: <ul class='list-bulleted'> <li>To solicit, receive, direct, transfer or spend funds in connection with any election.</li><li>To request or suggest that a communication be created, produced or distributed; </li><li>To make or authorize a communication that meets one or more of the “content standards” for coordination;</li><li>To request or suggest that any other person create, produce, or distribute any communication;</li><li>To be materially involved in decisions regarding the content, intended audience, means, media outlet, timing, frequency, size, prominence or duration of a communication;</li><li>To provide material or information to assist another person in the creation, production or distribution of any communication; or</li>\n<li>To make or direct a communication that is created, produced or distributed with the use of material or information derived from a substantial discussion about the communication with a different candidate;</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/109-3/CURRENT#109-3-b\">109.3(b)</a> and <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-b-3\">300.2(b)(3)</a>."},{"term":"Agent (of a party)","definition":"An agent is any person who has actual authority, either expressed or implied, to engage in certain activities on behalf of the committee. In the case of state, district and local party committees, these activities are:<ul  class=\"list-bulleted\"><li>Expending or disbursing any funds for federal election activity; </li><li>Transferring or accepting transfers of funds for federal election activity;</li> <li>Engaging in joint fundraising activity if any part of the funds are to be used for federal election activity; or </li><li>Soliciting any funds for, or making or directing any donations to, any tax-exempt 501(c) organization or 527 organization that is not also a political committee, a party committee or an authorized campaign committee. </li>11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-b-2\">300.2(b)(2)</a>.</ul>In the case of the national party committees, these activities are:\n<ul class=\"list-bulleted\"><li>Soliciting, directing or receiving a contribution, donation or transfer of funds; or</li><li>Soliciting any funds for, or making or directing donations to, any tax-exempt 501(c) organization or 527 organization that is not also a political committee, a party committee or an authorized campaign committee.</li> 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-b-1\">300.2(b)(1)</a>.</ul> In the case of communications, for all party committees, the activities include: <ul class=:\"list-bulleted\"><li>Requesting or suggesting that a communication be created, produced or distributed;</li><li>Creating, producing or distributing any communication at the request of a candidate; or</li><li>Being materially involved in the content or distribution of a communication.</li>11 CFR <a href=\"https://www.fec.gov/regulations/109-3/CURRENT#109-3\">109.3(a)</a>.</ul>"},{"term":"Allocation account","definition":"A separate federal account into which funds from either a committee’s federal and nonfederal accounts, or (for party committees) from its federal and Levin accounts, are deposited solely to pay expenses that must be allocated. (A party committee must have separate allocation accounts for its federal/nonfederal allocation and for its federal/Levin allocation). 11 CFR <a href=\"https://www.fec.gov/regulations/106-7/CURRENT#106-7\">106.7(f)</a> and <a href=\"https://www.fec.gov/regulations/300-33/CURRENT#300-33-d\">300.33(d)</a>."},{"term":"Authorized committee","definition":"A political committee that has been authorized by a candidate to accept contributions or make expenditures on his or her behalf, or one that accepts contributions or makes expenditures on behalf of a candidate and has not been disavowed by the candidate."},{"term":"Bundled contribution","definition":"A contribution forwarded to a reporting committee by a lobbyist/registrant or lobbyist/registrant PAC, or received by a reporting committee and credited to a lobbyist/registrant or lobbyist/registrant PAC. See 11 CFR <a href=\"https://www.fec.gov/regulations/104-22/CURRENT#104-22-a-6\">104.22(a)(6)</a>."},{"term":"Campaign traveler","definition":"Any candidate traveling in connection with an election for federal office, or any individual traveling in connection with an election for federal office on behalf of a candidate or political committee; or any member of the news media traveling with a candidate. 11 CFR <a href=\"https://www.fec.gov/regulations/100-93/CURRENT#100-93-a-3\">100.93(a)(3)(i)</a>."},{"term":"Candidate","definition":"An individual seeking nomination for election, or reelection, to a federal office becomes a candidate when he or she (or persons working on his or her behalf) receives contributions or makes expenditures that exceed $5,000."},{"term":"Candidate ID","definition":"A unique identifier assigned to each candidate registered with the FEC. The initial character indicates the office sought. (H)ouse, (S)enate, (P)resident. If a person runs for several offices, they will have separate IDs for each office."},{"term":"Cash-on-hand","definition":"Cash on hand includes funds held in checking and savings accounts, certificates of deposit, petty cash funds, traveler’s checks, treasury bills and other investments valued at cost. <a href=\"https://www.fec.gov/regulations/104-3/CURRENT#104-3-a-1\">11 CFR 104.3(a)(1)</a>."},{"term":"CFR","definition":"Code of Federal Regulations. The annual collection of executive-agency regulations published in the daily Federal Register, combined with previously issued regulations that are still in effect. The sections of the CFR containing federal campaign finance regulations may be found in Title 11 and are <a href=\"https://www.fec.gov/regulations/\">available on the FEC’s website</a> or as a free publication from the FEC."},{"term":"Clearly identified candidate","definition":"A candidate is clearly identified when his or her name, nickname, photograph or drawing appears, or when his or her identity is otherwise apparent through an unambiguous reference such as “the President,” “your Congressman,” or “the incumbent,” or through an unambiguous reference to his or her status as a candidate such as “the Democratic presidential nominee” or “the Republican candidate for Senate in the State of Georgia.” 11 CFR <a href=\"https://www.fec.gov/regulations/100-17/CURRENT#100-17\">100.17</a>."},{"term":"Commercial vendor","definition":"Any person providing goods or services to a candidate or political committee whose usual and normal business involves the sale, rental, lease or provision of those goods or services. 11 CFR <a href=\"https://www.fec.gov/regulations/116-1/CURRENT#116-1-c\">116.1(c)</a>."},{"term":"Committee type","definition":"A definition that categorizes groups organized to receive and spend money in federal elections. The basic committee types are authorized committees, political party committees, separate segregated funds (SSFs) and nonconnected committees."},{"term":"Communications filers","definition":"Form 5, Form 7 and Form 9 filers, whose activity includes: <ul><li>Contributions reported by persons other than political committees</li><li>Independent expenditures reported by persons other than political committees</li><li>Communication costs reported by corporations and membership organizations</li><li>Electioneering communications</li></ul>"},{"term":"Conduit or intermediary","definition":"Any person who receives and forwards an earmarked contribution to a candidate or a candidate’s authorized committee. 11 CFR <a href=\"https://www.fec.gov/regulations/110-6/CURRENT#110-6-b-2\">110.6(b)(2)</a>."},{"term":"Connected organization","definition":"An organization that uses its treasury funds to establish, administer or solicit contributions to a separate segregated fund. 11 CFR <a href=\"https://www.fec.gov/regulations/100-6/CURRENT#100-6\">100.6(a)</a>."},{"term":"Contribution","definition":"A gift, subscription, loan, advance or deposit of money or anything of value given to influence a federal election; or the payment by any person of compensation for the personal services of another person if those services are rendered without charge to a political committee for any purpose. 11 CFR <a href=\"https://www.fec.gov/regulations/100-52/CURRENT#100-52\">100.52(a)</a> and <a href=\"https://www.fec.gov/regulations/100-54/CURRENT#100-54\">100.54</a>."},{"term":"Contribution in the name of another","definition":"Giving money or anything of value, all or part of which was provided to the contributor by another person (the true contributor) without disclosing the source of the money or the thing of value to the recipient candidate or committee at the time the contribution is made; or making a contribution of money or anything of value and attributing as the source another person when in fact the contributor is the source. <a href=\"https://www.fec.gov/regulations/110-4/CURRENT#110-4-b\">11 CFR 110.4(b)</a>."},{"term":"Coordinated","definition":"Made in cooperation, consultation or concert with, or at the request or suggestion of, a candidate, a candidate’s authorized committee or their agents, or a political party committee or its agents. 11 CFR <a href=\"https://www.fec.gov/regulations/109-20/CURRENT#109-20\">109.20(a)</a>."},{"term":"Coordinated communication","definition":"A communication that satisfies a three-pronged test: <ol class='list-bulleted'>><li>The communication must be paid for by a person other than a federal candidate, authorized committee, or a political party committee, or any agents of the aforementioned entities with whom the communication is coordinated.</li><li>One or more of the five content standards set forth in <a href=\"https://www.fec.gov/regulations/109-21/CURRENT#109-21-c\">11 CFR 109.21(c)</a> must be satisfied; and</li><li>One or more of the five conduct standards set forth in <a href=\"https://www.fec.gov/regulations/109-21/CURRENT#109-21-d\">11 CFR 109.21(d)</a> must be satisfied.</li></ol>A payment for a communication satisfying all three prongs is an in-kind contribution to the candidate or political party committee with which it was coordinated. 11 CFR <a href=\"https://www.fec.gov/regulations/109-21/CURRENT#109-21\">109.21</a>."},{"term":"Coordinated party expenditure","definition":"A special type of expenditure that can be made only by a national or state political party committee in connection with the general election of a candidate. These expenditures are subject to a separate set of limits and do not count against the party’s normal contribution limits with respect to each candidate. 11 CFR <a href=\"https://www.fec.gov/regulations/109-30/CURRENT#109-30\">109.30</a> and <a href=\"https://www.fec.gov/regulations/109-32/CURRENT#109-32\">109.32-37</a>."},{"term":"Corporation","definition":"Any separately incorporated entity (other than a political committee that has incorporated for liability purposes only). 11 CFR <a href=\"https://www.fec.gov/regulations/100-134/CURRENT#100-134-l\">100.134(l)</a> and <a href=\"https://www.fec.gov/regulations/114-12/CURRENT#114-12\">114.12(a)</a>. The term corporation covers both for-profit and nonprofit corporations and includes nonstock corporations, incorporated membership organizations, incorporated cooperatives, incorporated trade associations, professional corporations and, under certain circumstances, limited liability companies."},{"term":"Custodian of Records","definition":"The individual or entity holding possession of a political committee’s books and accounts.The Custodian of Records is listed on the committee’s Statement of Organization. 11 CFR <a href=\"https://www.fec.gov/regulations/102-2/CURRENT#102-2-a-1-ii\">102.2(a)(1)(iii)</a>."},{"term":"Date made","definition":"The date the contributor relinquishes control over a contribution. A contribution that is mailed is considered made on the date of the postmark. In the case of an in-kind contribution, a contribution is made on the date the goods or services are provided by the contributor. This date determines the election or calendar year limit against which a contribution counts. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-6\">110.1(b)(6)</a>."},{"term":"Date received","definition":"The date a committee (or a person acting on the committee’s behalf) takes possession of the contribution. 11 CFR <a href=\"https://www.fec.gov/regulations/102-8/CURRENT#102-8\">102.8(a)</a>. This date is used for FEC reporting."},{"term":"Debt","definition":"Debts include unpaid bills. FEC reports show the amount of reportable debt a committee owes to other entities at the end of the filing period."},{"term":"Delegate","definition":"An individual who is or seeks to become a delegate to a national nominating convention or to a state, district or local convention, caucus or primary held to select delegates to a national nominating convention. 11 CFR <a href=\"https://www.fec.gov/regulations/110-14/CURRENT#110-14-b\">110.14(b)(1)</a>."},{"term":"Delegate committee","definition":"A group organized for the purpose of influencing the selection of one or more delegates. The term includes a group of delegates, a group of individuals seeking to become delegates and a group of individuals supporting delegates. 11 CFR <a href=\"https://www.fec.gov/regulations/110-14/CURRENT#110-14-b-2\">110.14(b)(2)</a>."},{"term":"Designated/designation","definition":"A contribution is considered to be designated in writing for a particular election if <ul class='list-bulleted'><li>The contribution is made by check, money order, or other negotiable instrument which clearly indicates the particular election with respect to which the contribution is made;</li><li>The contribution is accompanied by a writing, signed by the contributor, which clearly indicates the particular election with respect to which the contribution is made; or</li>The contribution is redesignated in accordance with <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-4-iii\">11 CFR 110.1(b)(5)</a>.</li></ul> <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-4\">11 CFR 110.1(b)(4)</a>."},{"term":"Direct mail","definition":"Any mailings made by a commercial vendor or made from a commercial list. 11 CFR <a href=\"https://www.fec.gov/regulations/100-87/CURRENT#100-87\">100.87(a)</a>, <a href=\"https://www.fec.gov/regulations/100-89/CURRENT#100-89-a\">100.89(a)</a>, <a href=\"https://www.fec.gov/regulations/100-147/CURRENT#100-147-a\">100.147(a)</a> and <a href=\"https://www.fec.gov/regulations/100-149/CURRENT#100-149\">100.149(a)</a>"},{"term":"Disbursement","definition":"Any purchase or payment made by a political committee or any other person that is subject to the Federal Election Campaign Act. 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-d\">300.2(d)</a>."},{"term":"Disclaimer notice","definition":"A “disclaimer” notice is a statement that identifies the person(s) who paid for a communication and whether the communication was authorized by one or more candidates. 11 CFR <a href=\"https://www.fec.gov/regulations/110-11/CURRENT#110-11\">110.11</a>."},{"term":"District","definition":"A U.S. House of Representatives District. Because Senators represent an entire state, Senate races do not have districts associated with them."},{"term":"Donation","definition":"A payment, gift, subscription, loan, advance, deposit or anything of value given to a person but does not include contributions.11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-d-2\">300.2(e)</a>."},{"term":"Earmarked contribution","definition":"A contribution that the contributor directs (either orally or in writing) to or on behalf of a clearly identified candidate or authorized committee through an intermediary or conduit. Earmarking may take the form of a designation, instruction or encumbrance, and it may be direct or indirect, express or implied. 11 CFR <a href=\"https://www.fec.gov/regulations/110-6/CURRENT#110-6\">110.6</a>."},{"term":"Election","definition":"Any one of several processes by which an individual seeks nomination for election, or election, to federal office. They include: a primary election, including a caucus or convention that has authority to select a nominee; a general election; a runoff election; and a special election held to fill a vacant seat. 11 CFR <a href=\"https://www.fec.gov/regulations/100-2/CURRENT#100-2\">100.2</a>."},{"term":"Election cycle","definition":"The period beginning the day after the previous general election for a given federal office and ending on the date of the general election for that office. The number of years in an election cycle differs according to the federal office sought. The election cycle spans two years for House candidates; four years for presidential candidates; and six years for Senate candidates. See 11 CFR <a href=\"https://www.fec.gov/regulations/100-3/CURRENT#100-3-b\">100.3(b)</a>."},{"term":"Electioneering communication","definition":"Any broadcast, cable or satellite communication that (1) refers to a clearly identified candidate for federal office; (2) is publicly distributed within certain time periods before an election and (3) is targeted to the relevant electorate. 11 CFR <a href=\"https://www.fec.gov/regulations/100-29/CURRENT#100-29\">100.29</a>."},{"term":"Employer","definition":"The organization or person by whom an individual is employed, and not the name of his or her supervisor. <a href=\"https://www.fec.gov/regulations/100-21/CURRENT#100-21\">11 CFR 100.21</a>."},{"term":"Ending cash-on-hand","definition":"The total amount of cash on hand that remains after the amount of cash-on-hand at the beginning of the reporting period is adjusted to add the total receipts for the reporting period and subtract the total disbursements for the reporting period."},{"term":"Executive and administrative personnel","definition":"Individuals employed by a corporation or labor organization who are paid on a salary rather than hourly basis and who have policymaking, managerial, professional, or supervisory responsibilities. The definition does not include professionals who are represented by a labor organization, salaried foremen and lower-level supervisors having direct supervision over hourly employees, former or retired personnel who are not stockholders, and consultants who are not employees under the Internal Revenue Code. 11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-c\">114.1(c)</a>, <a href=\"https://www.ecfr.gov/cgi-bin/text-idx?SID=8fcc28cd0cc7d6262e5dbe3865335df0&mc=true&node=se26.17.31_13401_2c_3_61&rgn=div8\">26 CFR 31.3401(c)-1</a>."},{"term":"Exempt party activities","definition":"Certain candidate support activities that state and local party groups may undertake without making a contribution or expenditure, provided specific rules are followed."},{"term":"Expenditure","definition":"A purchase, payment, distribution, loan, advance, deposit or gift of money or anything of value made for the purpose of influencing a federal election. A written agreement to make an expenditure is also considered an expenditure. 11 CFR <a href=\"https://www.fec.gov/regulations/100-111/CURRENT#100-111\">100.111</a> and <a href=\"https://www.fec.gov/regulations/100-112/CURRENT#100-112\">100.112</a>."},{"term":"Express advocacy","definition":"Unambiguously advocating the election or defeat of a clearly identified federal candidate. There are two ways that a communication can be defined as express advocacy (candidate advocacy): by use of certain “explicit words of advocacy of election or defeat” and by the “only reasonable interpretation” test. See 11 CFR <a href=\"https://www.fec.gov/regulations/100-22/CURRENT#100-22\">100.22</a>."},{"term":"Facilitation","definition":"The use of corporate or labor organization resources or facilities to engage in fundraising activities in connection with any federal election (other than raising funds for the organization’s separate segregated fund). Facilitation results in a prohibited contribution to the committee that benefits from the activity. 11 CFR <a href=\"https://www.fec.gov/regulations/114-2/CURRENT#114-2-f\">114.2(f)</a>."},{"term":"Family","definition":"For purposes of the rules governing fundraising by corporate/labor/trade PACs, the Commission views the term \"family\" to mean the spouses, parents, and children who live in the same household. Spouse is defined by state law. See <a href=\"https://www.fec.gov/data/legal/advisory-opinions/2013-06\">AOs 2013-06</a> and <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1980-102\">1980-102</a>. For purposes of the rules governing the use of campaign funds by candidates, a candidate’s family includes the candidate’s spouse, any child, step-child, parent, grandparent, sibling, half-sibling or step-sibling of the candidate or the candidate's spouse, the spouse of any child, step-child, parent, grandparent, sibling, half-sibling or step-sibling of the candidate; and any person who shares a residence with the candidate. See 11 CFR  <a href=\"https://www.fec.gov/regulations/113-1/CURRENT#113-1-g-7\">113.1(g)(7)</a>. Publicly funded presidential candidates should refer to 11 CFR <a href=\"https://www.fec.gov/regulations/9003-2/CURRENT#9003-2-c-1\">9003.2(c)(1)</a> and <a href=\"https://www.fec.gov/regulations/9035-2/2017-annual-9035#9035-2-b\">9035.2(b)</a>."},{"term":"Federal Election Activity (FEA)","definition":"Activity by state, district and local party committees, which may be paid for with federal or – in the case of the first two types – a combination of federal and Levin funds. The four types of federal election activity are as follows:<ul class=\"list-numbered\"><li>Voter registration activity during the period 120 days before a primary or general election and ending on election day itself;</li><li>Voter identification, get-out-the-vote and generic campaign activity conducted in connection with an election in which a federal candidate appears on the ballot;</li><li>A public communication that refers to a clearly identified candidate for federal office and that promotes, attacks, supports or opposes any candidate for federal office. The communication does not need to expressly advocate the election or defeat of the federal candidate to qualify as federal election activity; and </li><li>Services provided during a month by an employee of a state, district or local party committee who spends more than 25 percent of his or her compensated time during that month on activities in connection with a federal election including FEA.</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/100-24/CURRENT#100-24-b\">100.24(b)</a>."},{"term":"Federal funds","definition":"Funds that comply with the limits, prohibitions and reporting requirements of the Federal Election Campaign Act. 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-g\">300.2(g)</a>."},{"term":"Federal government contractor","definition":"A person who enters into a contract, or is bidding on such a contract, with any agency or department of the United States government and is paid, or is to be paid, for services, material, equipment, supplies, land or buildings with funds appropriated by Congress. 11 CFR <a href=\"https://www.fec.gov/regulations/115-1/CURRENT#115-1\">115.1</a>."},{"term":"Federal officeholder","definition":"An individual elected to or serving in the office of President or Vice President of the United States, or a Senator or Representative in, or a Delegate or Resident Commissioner, to the Congress of the United States. 11 CFR <a href=\"https://www.fec.gov/regulations/113-1/CURRENT#113-1-c\">113.1(c)</a> and <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-o\">300.2(o)</a>."},{"term":"Federally chartered corporation","definition":"A corporation that is organized pursuant to a federal statute and that became a corporation when it received a charter from a federal agency. See <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1988-12\">AOs 1988-12</a> and <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1984-63\">1984-63</a>."},{"term":"Filing","definition":"A report, designation or statement submitted to the FEC or Secretary of the Senate by a candidate, committee or other entity. Required filings include declarations of candidacy and committee reports of the money they receive and spend.  See also \"Reports, designations and statements\"."},{"term":"Foreign national","definition":"<ol><li> An individual who is not a citizen of the United States or a national of the United States and has not been lawfully admitted to the U.S. for permanent residence, as defined in 8 U.S.C. § 1101(a)(20); or</li><li>A foreign principal, as defined in 22 U.S.C. § 611(b).</li></ol> 11 CFR <a href=\"https://www.fec.gov/regulations/110-20/CURRENT#110-20-a\">110.20(a)(3)</a>."},{"term":"Generic campaign activity","definition":"A type of Federal Election Activity, as distinguished from voter drive activity. Generic campaign activity is a public communication that promotes or opposes a political party and does not promote or oppose a clearly identified federal candidate or a nonfederal candidate. 11 CFR <a href=\"https://www.fec.gov/regulations/100-25/CURRENT#100-25\">100.25</a>."},{"term":"Get-Out-The-Vote (GOTV)","definition":"In regard to FEA, GOTV activity encompasses all means of assisting, encouraging or urging potential voters to vote. This activity includes, but is not limited to: <ul><li>Encouraging or urging potential voters to vote, whether by mail (including direct mail), email, in person, by telephone (including prerecorded telephone calls, phone banks and messaging such as SMS and MMS), or by any other means;</li><li>Informing potential voters, whether by mail (including direct mail), email, in person, by telephone (including pre-recorded telephone calls, phone banks and messaging such as SMS and MMS), or by any other means, about the hours or location of polling places, or about early voting or voting by absentee ballot;</li><li>Offering or arranging to transport, or actually transporting voters to the polls;</li><li>Any other activity that assists potential voters in voting.</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/100-24/CURRENT#100-24-a-3\">100.24(a)(3)</a>."},{"term":"Hybrid PAC","definition":"A committee that, in addition to making contributions, establishes a separate bank account to deposit and withdraw funds raised in unlimited amounts from individuals, corporations, labor organizations and/or other political committees, consistent with the stipulated judgment in <i>Carey v. FEC</i>. The funds maintained in this separate account will not be used to make contributions, whether direct, in-kind or via coordinated communications, or coordinated expenditures, to federal candidates or committees."},{"term":"Identification","definition":"For purposes of recordkeeping and reporting, a person’s full name and address and, in the case of an individual, his or her occupation (principal job title or position) and employer (organization or person by whom an individual is employed) as well. 11 CFR <a href=\"https://www.fec.gov/regulations/100-12/CURRENT#100-12\">100.12</a>, <a href=\"https://www.fec.gov/regulations/100-20/CURRENT#100-20\">100.20</a> and <a href=\"https://www.fec.gov/regulations/100-21/CURRENT#100-21\">100.21</a>."},{"term":"In-kind contribution","definition":"A contribution of goods, services or property offered free or at less than the usual and normal charge. The term also includes payments made on behalf of, but not directly to, candidates and political committees (except for independent expenditures or non-coordinated communications). 11 CFR <a href=\"https://www.fec.gov/regulations/100-52/CURRENT#100-52-d\">100.52(d)</a>."},{"term":"Independent expenditure","definition":"An expenditure for a communication <ul><li>That expressly advocates the election or defeat of a clearly identified candidate and</li><li>That is not made in cooperation, consultation or concert with, or at the request or suggestion of, any candidate, or his or her authorized committees or agents, or a political party committee or its agents. 11 CFR <a href=\"https://www.fec.gov/regulations/100-16/CURRENT#100-16\">100.16</a>.</li></ul>"},{"term":"Independent expenditure only committee","definition":"Political committees that make only independent expenditures that may solicit and accept unlimited contributions from individuals, corporations, labor organizations and other political committees. They may not accept contributions from foreign nationals, federal contractors, national banks or federally chartered corporations. See <a href=\"https://www.fec.gov/data/legal/advisory-opinions/2010-11/\">AO 2010-11</a>. Such committees, popularly known as Super PACs, must register with the Commission and comply with all applicable reporting requirements of the Act."},{"term":"Joint contribution","definition":"A contribution made by more than one person on a single check or other written instrument. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-k\">110.1(k)(1)</a>."},{"term":"Joint fundraising","definition":"Fundraising conducted jointly by a political committee and one or more other political committees or unregistered organizations.  Joint fundraising is often conducted between a principal campaign committee and a political party committee."},{"term":"Joint fundraising committee","definition":"A committee that has been set up for the purposes of fundraising for multiple committees at the same time or an existing committee that has been authorized to serve that purpose."},{"term":"Labor organization","definition":"An organization, agency or employee representative committee or plan, in which employees participate and which exists for the purpose of dealing with employers on grievances, labor disputes, wages, hours of employment or working conditions. 11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-d\">114.1(d)</a>."},{"term":"Leadership PAC","definition":"A political committee that is directly or indirectly established, financed, maintained or controlled by a candidate or an individual holding federal office, but is not an authorized committee of the candidate or officeholder and is not affiliated with an authorized committee of a candidate or officeholder."},{"term":"Levin funds","definition":"A category of funds raised by state, district and local party committees that may be spent for certain Federal Election Activities. Levin funds are donations from sources ordinarily prohibited by federal law but permitted by state law. 11 CFR <a href=\"https://www.fec.gov/regulations/300-31/CURRENT#300-31\">300.31</a> and <a href=\"https://www.fec.gov/regulations/300-32/CURRENT#300-32\">300.32</a>."},{"term":"Limited liability company (LLC)","definition":"A business entity that is recognized as a limited liability company under the laws of the state in which it is established. LLCs that are treated as partnerships under the IRS code may make contributions. LLCs that have publicly traded stock or are treated as corporations under the IRS code are prohibited from making contributions. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-g\">110.1(g)</a>."},{"term":"Lobbyist/registrant","definition":"A person who is a current registrant under the Lobbying Disclosure Act, or an individual who is named on a current registration or report filed under the Lobbying Disclosure Act. See 11 CFR <a href=\"https://www.fec.gov/regulations/104-22/CURRENT#104-22\">104.22</a>."},{"term":"Lobbyist/Registrant PAC","definition":"Any political committee established or controlled by a person who is a current registrant under Lobbying Disclosure Act or an individual who is named on a current registration or report filed under the Lobbying Disclosure Act."},{"term":"Local or district party committee","definition":"A political committee that, by virtue of the bylaws of a political party, is responsible for the day-to-day operation of a political party at a level lower than the state level (e.g., city, county, ward). 11 CFR <a href=\"https://www.fec.gov/regulations/100-14/CURRENT#100-14-b\">100.14(b)</a>."},{"term":"Local party organization","definition":"A local party organization is an organization that is responsible for a political party's activities below the state level (such as city, county or district level) but is not registered with the Federal Election Commission as a district or local party committee."},{"term":"Major party","definition":"A political party whose candidate in the preceding presidential election received, as the candidate of such party, 25 percent or more of the popular vote. 11 CFR <a href=\"https://www.fec.gov/regulations/9002-6/CURRENT#9002-6\">9002.6</a> and <a href=\"https://www.fec.gov/regulations/9008-2/CURRENT#9008-2\">9008.2(c)</a>."},{"term":"Matter Under Review (MUR)","definition":"An FEC enforcement action, initiated by a sworn complaint or by an internal administrative action."},{"term":"Member","definition":"With respect to a labor organization, a trade association, a cooperative or other incorporated membership organization, a member is an individual or other entity that: <ul><li>Satisfies the requirements for membership in a membership organization;</li><li> affirmatively accepts the organization’s invitation to become a member; and</li><li>maintains a long-term and continuous bond with the organization by:<ul><li>having a significant financial attachment, such as a significant investment or ownership stake;</li><li>paying annual dues; or</li><li>having direct participatory rights in the governance of the organization.</li></ul></li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-e-2\">114.1(e)(2)</a>."},{"term":"Membership organization","definition":"A labor organization or a trade association, cooperative or other incorporated membership organization that:<ul><li>is composed of members;</li><li>expressly states the qualifications for membership in its articles and by-laws;</li><li>makes its articles, by-laws and other organizational documents available to its members;</li><li>expressly seeks members;</li><li>acknowledges the acceptance of membership, such as by sending membership cards to new members or including them on a membership newsletter list; and</li><li>is not organized primarily for the purpose of influencing a federal election.</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/100-134/CURRENT#100-134-e\">100.134(e)</a> and <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-e\">114.1(e)(1)</a>."},{"term":"Memo entry/memo item","definition":"Supplemental or explanatory information on a reporting schedule. A memo entry is often used to disclose additional information about an itemized transaction that is included in the total receipts or disbursements for the current report or a previous report. The dollar amount in a memo entry is not incorporated into the total figure for the schedule."},{"term":"Memo text","definition":"A field offered in FECFile software and some commercial software to allow a committee to provide additional text to describe a particular transaction it is reporting."},{"term":"Multicandidate committee","definition":"A political action committee or party committee that has been registered at least 6 months, has more than 50 contributors and, with the exception of state party committees, has made contributions to at least 5 candidates for federal office. 11 CFR <a href=\"https://www.fec.gov/regulations/100-5/CURRENT#100-5-e-3\">100.5(e)(3)</a>."},{"term":"National bank","definition":"A bank that is subject to the supervision of the <a href=\"https://www.helpwithmybank.gov/dictionary/index-dictionary.html#N\">Comptroller of the Currency</a>. The Office of the Comptroller of the Currency is a bureau of the U.S. Treasury Department."},{"term":"National committee","definition":"An organization that, by virtue of the bylaws of a political party, is responsible for the day-to-day operation of the political party at the national level, as determined by the Commission. 11 CFR <a href=\"https://www.fec.gov/regulations/100-13/CURRENT#100-13\">100.13</a>."},{"term":"National party committee","definition":"A political committee established and maintained by a national political party. A party’s national committee, House campaign committee and Senate campaign committee are considered national party committees, as determined by the Commission. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-c-2\">110.1(c)(2)</a>; <a href=\"https://www.fec.gov/regulations/110-2/CURRENT#110-2-c-2\">110.2(c)(2)</a>; <a href=\"https://www.fec.gov/regulations/110-3/CURRENT#110-3-b-1-ii\">110.3(b)(2)</a>."},{"term":"Net debts outstanding","definition":"The total of a campaign’s unpaid debts incurred with respect to an election plus estimated costs to liquidate the debts plus costs of terminating political activity (if appropriate) minus cash on hand and receivables. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-3-ii\">110.1(b)(3)(ii)</a>."},{"term":"Nonconnected committee","definition":"Any committee that conducts activities in connection with an election, but that is not a party committee, an authorized committee of any candidate for federal election, or a separate segregated fund. 11 CFR <a href=\"https://www.fec.gov/regulations/100-6/CURRENT#100-6\">106.6(a)</a>."},{"term":"Non-contribution account","definition":"A separate bank account to deposit and withdraw funds raised in unlimited amounts from individuals, corporations, labor organizations and/or other political committees, consistent with the stipulated judgment in <i>Carey v. FEC</i>. The funds maintained in this separate account will not be used to make contributions, whether direct, in-kind or via coordinated communications, or coordinated expenditures, to federal candidates or committees."},{"term":"None","definition":"If data appears as \"None\", it's best to check the source document. Common reasons that the data appears as \"None\" are:<ul><li>Data is not processed yet; often, paper filings cause delays and inconsistent upload times.</li><li>Data is from an amendment that did not properly identify the form it was amending.</li><li>The filer did not fill out the information on the form.</li></ul>If you think there is an error, you can report that via our feedback tool."},{"term":"Nonfederal funds","definition":"Funds that are not subject to the limitations or prohibitions of the Federal Election Campaign Act. 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-k\">300.2(k)</a>."},{"term":"Occupation","definition":"The principal job title or position of an individual and whether or not self-employed. 11 CFR <a href=\"https://www.fec.gov/regulations/100-20/CURRENT#100-20\">100.20</a>."},{"term":"One-third rule","definition":"A formula used to ensure the treasury funds of a connected organization are not traded for voluntary contributions when the organization pays for prizes or entertainment to offer as an incentive to make a contribution to its SSF. Under the one-third rule, the SSF must reimburse the connected organization for costs that exceed one-third of the money raised. See 11 CFR <a href=\"https://www.fec.gov/regulations/114-5/CURRENT#114-5-b-2\">114.5(b)(2)</a>."},{"term":"Ongoing committee","definition":"Any political committee that has not terminated and does not qualify as a terminating committee. 11 CFR <a href=\"https://www.fec.gov/regulations/116-1/CURRENT#116-1-b\">116.1(b)</a>."},{"term":"Operating expenditures","definition":"A committee's day-to-day expenditures for items such as rent, overhead, administration, personnel, equipment, travel, advertising and fundraising."},{"term":"Ordinary course of business","definition":"In determining whether credit was extended in the ordinary course of business, the Commission will consider—<ul class='list-bulleted'><li>Whether the commercial vendor followed its established procedures and its past practice in approving the extension of credit;</li><li>Whether the commercial vendor received prompt payment in full if it previously extended credit to the same candidate or political committee; and</li><li>Whether the extension of credit conformed to the usual and normal practice in the commercial vendor's trade or industry. </li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/116-3/CURRENT#116-3-c\">116.3(c)</a>."},{"term":"Organization type","definition":"Certain filers, like separate segregated funds and communication cost filers, identify the types of organizations they are connected with. These connected organizations can be identified as corporations, trade associations, labor organizations, cooperatives, membership organizations or corporations without capital stock."},{"term":"Overnight delivery service","definition":"A private delivery service business of established reliability that offers an overnight (next business day) delivery option."},{"term":"Party committee","definition":"A political committee that represents a political party and is part of the official party structure at the national, state or local level."},{"term":"PASO","definition":"PASO is an acronym that stands for “Promote, Attack, Support or Oppose.” See, e.g., 11 CFR <a href=\"https://www.fec.gov/regulations/100-24/CURRENT#100-24-b-3\">100.24(b)(3)</a>."},{"term":"Person","definition":"An individual, partnership, political committee, corporation, labor organization or any other organization or group of persons, not including the federal government. 11 CFR <a href=\"https://www.fec.gov/regulations/100-10/CURRENT#100-10\">100.10</a>."},{"term":"Personal funds of a candidate","definition":"The personal funds of a candidate include: <ul class='list-bulleted'><li>Assets which the candidate has a legal right of access to or control over, and which he or she has legal title to or an equitable interest in, at the time of candidacy;</li><li>Income from employment;</li><li>Dividends and interest from, and proceeds from sale or liquidation of, stocks and other investments;</li><li>Income from trusts, if established before the election cycle;</li><li>Income from trusts established by bequests (even after candidacy)</li><li>Bequests to the candidate;</li><li>Personal gifts that had been customarily received by the candidate prior to the beginning of the election cycle; and</li><li>Proceeds from lotteries and similar games of chance.</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/100-33/CURRENT#100-33\">100.33(a) and (b)</a>."},{"term":"Political Action Committee (PAC)","definition":"Popular term for a political committee that is neither a party committee nor an authorized committee of a candidate. PACs directly or indirectly established, administered or financially supported by a corporation or labor organization are called separate segregated funds (SSFs). PACs without such a corporate or labor sponsor are called nonconnected PACs."},{"term":"Political committee","definition":"An entity that meets one of the following conditions:<ul><li>An authorized committee of a candidate (see definition of candidate)</li><li>Any club, association or other group of persons that receives contributions or makes expenditures, either of which aggregate over $1,000 during a calendar year</li><li>A local unit of a political party (except a state party committee) that: (1) receives contributions aggregating over $5,000 during a calendar year; (2) makes contributions or expenditures either of which aggregate over $1,000 during a calendar year or (3) makes payments aggregating over $5,000 during a calendar year for certain activities that are exempt from the definitions of contribution and expenditure (11 CFR <a href=\"https://www.fec.gov/regulations/100-80/CURRENT#100-80\">100.80</a>, <a href=\"https://www.fec.gov/regulations/100-87/CURRENT#100-87\">100.87</a> and <a href=\"https://www.fec.gov/regulations/100-89/CURRENT#100-89\">100.89</a>; 11 CFR <a href=\"https://www.fec.gov/regulations/100-140/CURRENT#100-140\">100.140</a>, <a href=\"https://www.fec.gov/regulations/100-140/CURRENT#100-147>100.147</a> and <a href=\"https://www.fec.gov/regulations/100-149/CURRENT#100-149\">100.149</a>).</li><li>Any separate segregated fund upon its establishment. 11 CFR <a href=\"https://www.fec.gov/regulations/100-5/CURRENT#100-5-b\">100.5</a>.</li></ul>"},{"term":"Political party","definition":"An association, committee or organization that nominates or selects a candidate for election to federal office whose name appears on the election ballot as the candidate of the organization."},{"term":"Postmarked","definition":"A U.S. Postal Service postmark or the verifiable date of deposit with an overnight delivery service."},{"term":"Presidential public funds","definition":"Public funding of presidential elections means that qualified presidential candidates may choose to receive federal government funds to pay for certain expenses of their political campaigns in both the primary and general elections. Prior to the 2016 presidential election, national political parties could also receive federal money for their national nominating conventions."},{"term":"Principal campaign committee","definition":"An authorized committee designated by a candidate as the principal committee to raise contributions and make expenditures for his or her campaign for a federal office."},{"term":"Prior approval","definition":"A written request to a member corporation of a trade association to a member corporation for permission to solicit the member’s restricted class. This request for approval must inform the member corporation that corporate approval is necessary before the trade association or its SSF may conduct a solicitation and the corporation may not approve solicitations by another trade association for the same calendar year. 11 CFR <a href=\"https://www.fec.gov/regulations/114-8/CURRENT#114-8-d-3\">114.8(d)(3)</a>."},{"term":"Public communication","definition":"A communication by means of any broadcast, cable or satellite communication, newspaper, magazine, outdoor advertising facility, mass mailing or telephone bank to the general public, or any other form of general public political advertising. The term general public political advertising does not include communications made over the internet, except for communications placed for a fee on another person’s website. 11 CFR <a href=\"https://www.fec.gov/regulations/100-26/CURRENT#100-26\">100.26</a>, <a href=\"https://www.fec.gov/regulations/100-27/CURRENT#100-27\">100.27</a> (definition of mass mailing) and <a href=\"https://www.fec.gov/regulations/100-28/CURRENT#100-28\">100.28</a> (definition of telephone bank)."},{"term":"Qualified/non-qualified","definition":"In the context of multicandidate political committees identified in FEC data reports and indices, the designation “qualified” or “non-qualified” reflects whether a political committee has satisfied the criteria for multicandidate political committee status (i.e., whether the committee has been registered for at least 6 months, received contributions from more than 50 persons, and made contributions to 5 or more federal candidates). Committees listed as “non-qualified” do not satisfy these requirements. See 11 CFR <a href=\"https://www.fec.gov/regulations/100-5/CURRENT#100-5-e-3\">100.5(e)(3)</a>."},{"term":"Reattributed contribution","definition":"The portion of an excessive contribution that has been attributed in writing to another contributor and signed by both contributors. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-k-3-ii\">110.1(k)(3)(ii)</a>."},{"term":"Receipt","definition":"Anything of value (money, goods, services or property) received by a political committee."},{"term":"Redesignated contribution","definition":"With regard to contributions made to candidates, the portion of a contribution that has been designated by the contributor, in writing, to an election other than the one for which the funds were originally given. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-4-iii\">110.1(b)(5)</a>."},{"term":"Refunded contribution","definition":"A contribution is refunded when the recipient committee deposits the contribution and sends the contributor a check for the amount (or a portion) of the contribution. 11 CFR <a href=\"https://www.fec.gov/regulations/103-3/CURRENT#103-3-b\">103.3(b)</a>."},{"term":"Reports, designations and statements","definition":"All committees registered with the FEC and other persons who make certain expenditures or disbursements are required to file reports, designations and statements that disclose their financial activity. The contents of those reports and statements, as well as the filing schedule, depend on the type of committee or organization, or the type of expenditure or disbursement made.  See also \"Filing.\"."},{"term":"Restricted class/solicitable class","definition":"Those persons, including the executive and administrative personnel, members or stockholders (and the families of each) within a corporation or labor organization, who may be solicited for contributions to the organization’s separate segregated fund at any time and who may receive certain communications from the organization. 11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-j\">114.1(j)</a>; <a href=\"https://www.fec.gov/regulations/114-3/CURRENT#114-3\">114.3(a)</a>; <a href=\"https://www.fec.gov/regulations/114-5/CURRENT#114-5-g\">114.5(g)</a>; <a href=\"https://www.fec.gov/regulations/114-7/CURRENT#114-7\">114.7(a) and (h)</a>; and <a href=\"https://www.fec.gov/regulations/114-8/CURRENT#114-8-c\">114.8(c), (h) and (i)</a>."},{"term":"Separate segregated fund (SSF)","definition":"A political committee established, administered or financially supported by a corporation or labor organization, popularly called a Corporate or Labor Political Action Committee (PAC). See 11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-a-2\">114.1(a)(2)(iii)</a>. The term \"financially supported\" does not include contributions to the SSF, but does include the payment of establishment, administration or solicitation costs. <a href=\"https://www.fec.gov/regulations/100-6/CURRENT#100-6-c\">11 CFR 100.6(c)</a>."},{"term":"Solicitation (SSF)","definition":"A statement that publicizes the SSF’s right to accept unsolicited contributions from any lawful contributor; provides information on how to contribute to the SSF; or encourages support for the SSF. <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1984-55/\">AO 1984–55, n. 2</a>; AOs <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1979-66/\">1979–66</a> and <a href=\"https://www.fec.gov/data/legal/advisory-opinions/1979-13/\">1979–13</a>."},{"term":"Special election","definition":"A primary, general or runoff election that is not a regularly scheduled election and that is held to fill a vacant seat in the House of Representatives or the Senate. <a href=\"https://www.fec.gov/regulations/100-2/CURRENT#100-2-f\">100.2(f)</a>."},{"term":"State party committee","definition":"A committee which, by virtue of the bylaws of a political party or the operation of state law is part of the official party structure and is responsible for the day-to-day operation of the party at the state level, including an entity that is directly or indirectly established, financed, maintained or controlled by that organization, as determined by the Commission. 11 CFR <a href=\"https://www.fec.gov/regulations/100-14/CURRENT#100-14\">100.14(a)</a>."},{"term":"Status","definition":"Refers to whether the candidate is an incumbent, challenger or running unopposed."},{"term":"Stockholder","definition":"A person who has a vested beneficial interest in stock, the power to direct how that stock is voted (if it is voting stock) and the right to receive dividends.11 CFR <a href=\"https://www.fec.gov/regulations/114-1/CURRENT#114-1-h\">114.1(h)</a>."},{"term":"Super PAC","definition":"A committee that intends to make independent expenditures, and — consistent with the U.S. Court of Appeals for the District of Columbia Circuit decision in <i>SpeechNow v. FEC</i> — it therefore intends to raise funds in unlimited amounts. This committee will not use those funds to make contributions, whether direct, in-kind or via coordinated communications, to federal candidates or committees."},{"term":"Terminating committee","definition":"A political committee that is winding down its activities in preparation for filing a termination report. A terminating committee has ceased to make or receive contributions or make expenditures (other than for debt retirement purposes or winding-down costs). 11 CFR <a href=\"https://www.fec.gov/regulations/116-1/CURRENT#116-1\">116.1(a)</a>."},{"term":"to Direct","definition":"For purposes of 11 CFR Part 300, to direct means to guide, directly or indirectly, a person who has expressed an intent to make a contribution, donation, transfer of funds or otherwise provide anything of value, by identifying a candidate, political committee or organization for the receipt of such funds or things of value. The contribution, donation, transfer or thing of value may be provided directly or through an intermediary. Direction does not include merely providing information or guidance as to the applicability of a particular law or regulation. 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/2017-annual-300#300-2-n\">300.2(n)</a>."},{"term":"to Solicit","definition":"For the purposes of 11 CFR <a href=\"https://www.fec.gov/regulations/300\">Part 300</a>, to solicit means to ask, request or recommend, explicitly or implicitly, that another person make a contribution, donation, transfer of funds or otherwise provide anything of value. A solicitation is an oral or written communication that, construed as reasonably understood in the context in which it is made, contains a clear message asking, requesting or recommending that a person make a contribution, donation, transfer of funds or otherwise provide anything of value. A solicitation may be made directly or indirectly. The context includes the conduct of persons involved in the communication. A solicitation does not include mere statements of political support or mere guidance as to the applicability of a particular law or regulation. 11 CFR <a href=\"https://www.fec.gov/regulations/300-2/CURRENT#300-2-l\">300.2(m)</a>."},{"term":"Total disbursements","definition":"The sum of all purchases and payments made during a filing period by a political committee or any other person, including an organization that is not a political committee that is subject to the Federal Election Campaign Act."},{"term":"Total receipts","definition":"The sum of all contributions and other receipts received by a committee during a filing period."},{"term":"Trade association","definition":"A membership organization consisting of persons engaged in a similar or related line of commerce. A trade association is organized to promote and improve business conditions in that line of commerce and not to engage in a regular business for profit. No part of the net earnings of a trade association may inure to the benefit of any member."},{"term":"Treasurer","definition":"Required for every political committee. The treasurer is responsible for filing the committee's registration form, depositing receipts, authorizing expenditures, monitoring contributions, keeping records, signing all reports and statements and filing all reports and statements on time."},{"term":"Treasury funds","definition":"Funds of a corporation or labor organization that are derived from commercial activities or dues payments. Treasury funds may be used for the establishment, administrative and fundraising costs of the organization’s separate segregated fund, as well as for making independent expenditures and contributing to Super PACs and the non-contribution accounts of Hybrid PACs. See 11 CFR <a href=\"https://www.fec.gov/regulations/114-5/CURRENT#114-5-b\">114.5(b)</a> and <a href=\"https://www.fec.gov/regulations/114-10/CURRENT#114-10\">114.10</a>."},{"term":"Undesignated contribution","definition":"Contributors may designate contributions for a particular election by indicating in writing the specific election to which they intend a contribution to apply. A contribution that is not designated by the contributor for a specific election is an undesignated contribution. Undesignated contributions count against the donor’s contribution limits for the candidate’s next election. 11 CFR <a href=\"https://www.fec.gov/regulations/110-1/CURRENT#110-1-b-2-ii\">110.1(b)(2)</a>."},{"term":"Unique identifier","definition":"A unique title or code assigned by a party committee to each program or event for which it reports an allocation ratio. Party committees must use that identifier consistently when reporting the activity. 11 CFR <a href=\"https://www.fec.gov/regulations/104-17/CURRENT#104-17-b-1-iii\">104.17(b)(1)(iii)</a>."},{"term":"U.S.C.","definition":"The United States Code (U.S.C.) contains the federal statutory laws of the United States, arranged into 54 broad titles according to subject matter. The FEC administers the <a href=\"https://www.fec.gov/data/legal/statutes/\">campaign finance laws</a> found in Title 52 and the portions of Title 26 of the United States Code concerning public financing of presidential election campaigns."},{"term":"Usual and normal charge","definition":"With regard to goods provided to a political committee, the term refers to the price of those goods in the market from which they ordinarily would have been purchased at the time they were provided. With regard to services, the term refers to the hourly or piecework charge for the services at a commercially reasonable rate prevailing at the time the services were rendered. 11 CFR <a href=\"https://www.fec.gov/regulations/100-52/CURRENT#100-52-d-2\">100.52(d)(2)</a>."},{"term":"Voter drive activity","definition":"Voter identification, voter registration and get-out-the-vote-drives, or any other activities that urge the general public to register or vote, or that promote or oppose a political party, without promoting any federal or nonfederal candidate, that do not qualify as FEA. This is a category of allocable activity for mixed federal/nonfederal party activity sometimes also referred to as a “generic voter drive.” 11 CFR <a href=\"https://www.fec.gov/regulations/106-7/CURRENT#106-7-c-5\">106.7(c)(5)</a>."},{"term":"Voter identification","definition":"With regard to FEA, this means acquiring information about potential voters, including, but not limited to, obtaining voter lists and creating or enhancing voter lists by verifying or adding information about the voters’ likelihood of voting in an upcoming election or voting for specific candidates. 11 CFR <a href=\"https://www.fec.gov/regulations/100-24/CURRENT#100-24-a-4\">100.24(a)(4)</a>."},{"term":"Voter registration activity","definition":"In regard to FEA, voter registration activity encompasses all means of contacting potential voters to assist, encourage or urge them to register to vote. This activity includes, but is not limited to: <ul><li>Encouraging or urging potential voters to register to vote, whether by mail (including direct mail), email, in person, by telephone (including pre-recorded telephone calls, phone banks and messaging such as SMS and MMS), or by any other means;</li><li>Preparing and distributing information about registration and voting;</li><li>Distributing voter registration forms or instructions to potential voters;</li><li>Answering questions about how to complete or file a voter registration form, or assisting potential voters in completing or filing such forms;</li><li>Submitting or delivering a completed voter registration form on behalf of a potential voter;</li><li>Offering or arranging to transport, or actually transporting potential voters to a board of elections or county clerk’s office for them to fill out voter registration forms; or</li><li>any other activity that assists potential voters to register to vote.</li></ul> 11 CFR <a href=\"https://www.fec.gov/regulations/100-24/CURRENT#100-24-a-2\">100.24(a)(2)</a>."}]

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var _ = __webpack_require__(2);

var accessibility = __webpack_require__(28);

var feedback = __webpack_require__(248);

var statusClasses = {
  success: 'message--success',
  error: 'message--error'
};

/**
 * Feedback widget
 * @constructor
 * @param {String} url - AJAX URL
 * @param {String} parent - Optional parent selector; defaults to 'body'
 */
function Feedback(url, parent) {
  this.url = url;
  this.isOpen = false;
  this.$feedback = $(feedback());

  $(parent || 'body').append(this.$feedback);

  this.$button = this.$feedback.find('.js-feedback');
  this.$reset = this.$feedback.find('.js-reset');
  this.$box = this.$feedback.find('.js-feedback-box');
  this.$status = this.$box.find('.js-status');
  this.$message = this.$box.find('.js-message');
  this.$form = this.$feedback.find('form');

  this.$button.on('click', this.toggle.bind(this));
  this.$reset.on('click', this.reset.bind(this));
  this.$form.on('submit', this.submit.bind(this));

  accessibility.removeTabindex(this.$box);

  $(document.body).on('feedback:open', this.show.bind(this));
}

Feedback.prototype.toggle = function() {
  var method = this.isOpen ? this.hide : this.show;
  method.apply(this);
};

Feedback.prototype.show = function() {
  this.$box.attr('aria-hidden', 'false');
  this.$button.attr('aria-expanded', 'true');
  this.isOpen = true;

  accessibility.restoreTabindex(this.$box);
};

Feedback.prototype.hide = function() {
  this.$box.attr('aria-hidden', 'true');
  this.$button.attr('aria-expanded', 'false');
  this.isOpen = false;

  accessibility.removeTabindex(this.$box);
};

Feedback.prototype.submit = function(e) {
  /**
   * setup JQuery's AJAX methods to setup CSRF token in the request before sending it off.
   * http://stackoverflow.com/questions/5100539/django-csrf-check-failing-with-an-ajax-post-request
   */
  $.ajaxSetup({
     beforeSend: function(xhr, settings) {
       if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
           // Only send the token to relative URLs i.e. locally.
           xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val());
       }
     }
  });

  e.preventDefault();

  var data = _.chain(this.$box.find('textarea'))
    .map(function(elm) {
      var $elm = $(elm);
      return [$elm.attr('name'), $elm.val()];
    })
    .object()
    .value();

  if (!_.some(_.values(data))) {
    var message =
      '<h2 class="feedback__title">Input required</h2>' +
      '<p>Please fill out at least one field.</p>';
    var buttonText = 'Try again';
    this.message(message, buttonText, 'error');
    return;
  }

  var promise = $.ajax({
    method: 'POST',
    url: this.url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json'
  });

  promise.done(this.handleSuccess.bind(this));
  promise.fail(this.handleError.bind(this));
};

Feedback.prototype.handleSuccess = function(response) {
  var message =
    '<h2 class="feedback__title">Thanks for helping us improve</h2>' +
    '<p>This information has been reported on GitHub, where it\'s publicly visible. ' +
    '<a href="' + response.html_url + '">Track the status of your feedback</a>.</p>';
  var buttonText = 'Submit another issue';
  this.$box.find('textarea').val('');
  this.message(message, buttonText, 'success');
};

Feedback.prototype.handleError = function() {
  var message =
    '<h2 class="feedback__title">There was an error</h2>' +
    '<p>Please try submitting your issue again.</p>';
  var buttonText = 'Try again';
  this.message(message, buttonText, 'error');
};

Feedback.prototype.message = function(text, buttonText, style) {
  var self = this;
  this.$form.attr('aria-hidden', true);
  this.$status.attr('aria-hidden', false);
  this.$reset.text(buttonText);
  _.each(statusClasses, function(value) {
    self.$message.removeClass(value);
  });
  this.$message.html(text).addClass(statusClasses[style]);
};

Feedback.prototype.reset = function() {
  this.$form.attr('aria-hidden', false);
  this.$status.attr('aria-hidden', true);
};

module.exports = {Feedback: Feedback};


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n  <button class=\"js-feedback feedback__toggle button--cta-primary\" aria-controls=\"feedback\" aria-expanded=\"false\" type=\"button\">Feedback</button>\n  <div id=\"feedback\" class=\"js-feedback-box feedback\" aria-hidden=\"true\">\n    <button class=\"js-feedback button--down feedback__close\"><span class=\"u-visually-hidden\">Close</span></button>\n    <div class=\"js-status\" aria-hidden=\"true\">\n      <div class=\"message message--inverse js-message\">\n      </div>\n      <ul class=\"list--buttons\">\n        <li><button class=\"js-reset button--cta-primary feedback__button\" type=\"button\">Submit another issue</button></li>\n      </ul>\n    </div>\n    <form id=\"feedback-form\" class=\"container\">\n      <fieldset>\n        <legend class=\"feedback__title\">Help us improve FEC.gov</legend>\n        <p class=\"t-sans\">Don't include sensitive information like your name, contact information or Social Security number.</p>\n        <label for=\"feedback-1\" class=\"label\">What were you trying to do and how can we improve it?*</label>\n        <textarea id=\"feedback-1\" name=\"action\"></textarea>\n        <label for=\"feedback-2\" class=\"label\">General feedback?</label>\n        <textarea id=\"feedback-2\" name=\"feedback\"></textarea>\n        <label for=\"feedback-3\" class=\"label\">Tell us about yourself</label>\n        <span class=\"label--help\">I'm a <span class=\"u-blank-space\"></span> interested in <span class=\"u-blank-space\"></span>.</span>\n        <textarea id=\"feedback-3\" name=\"about\"></textarea>\n        <p class=\"t-sans\">This information will be reported on GitHub where it will be publicly visible. You can review all reported feedback on <a href=\"https://github.com/18f/fec/issues\">our GitHub page</a>.</p>\n        <p class=\"t-sans t-note\">*Required</p>\n        <button type=\"submit\" class=\"button--standard feedback__button\">Submit</button>\n      </fieldset>\n    </form>\n  </div>\n</div>\n";
},"useData":true});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global require, module, document */

var $ = __webpack_require__(0);

/**
  * Skip nav link
  * @constructor
  * @param {string} anchor - CSS selector for the anchor element that will function as the skip nav
  * @param {string} targetBody - CSS selector for the main content area to look for a focusable element in
  */

function Skipnav(anchor, targetBody) {
  this.anchor = anchor;
  this.$targetBody = $(targetBody);
  this.$target = $(this.findTarget());
  $(document.body).on('click keyup', this.anchor, this.focusOnTarget.bind(this));
}

Skipnav.prototype.findTarget = function() {
  return this.$targetBody.find(':first-child')
    .not('div, header, section, article, aside')
    .filter(':visible')[0];
};

Skipnav.prototype.focusOnTarget = function(e) {
  e.preventDefault();
  
  if (e.keyCode === 13 || e.type === 'click') {
    this.$target.attr('tabindex','0');
    this.$target.focus();
  }
};

module.exports = {Skipnav: Skipnav};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var helpers = __webpack_require__(6);

window.$ = window.jQuery = $;

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"accessible-mega-menu\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

/** SiteNav module
 * On mobile: Controls the visibility of the the hamburger menu and sublists
 * On desktop: Controls the visibility of dropdown sublists on hover and focus
 * @constructor
 * @param {object} selector - CSS selector for the nav component
 * @param {object} opts - Options, including base URLs
 */

function SiteNav(selector) {
  this.$body = $('body');
  this.$element = $(selector);
  this.$menu = this.$element.find('#site-menu');
  this.$toggle = this.$element.find('.js-nav-toggle');

  this.assignAria();

  this.initMenu();

  // Open and close the menu on mobile
  this.$toggle.on('click', this.toggleMenu.bind(this));
}

SiteNav.prototype.initMenu = function() {
  this.initMegaMenu();
};

SiteNav.prototype.initMegaMenu = function() {
  this.$element.find('[data-submenu]').each(function() {
    // Remove hrefs and default click behavior for links that have submenus
    $(this).find('.site-nav__link').attr('href', '#0').on('click', function(e) {
      e.preventDefault();
    });
  });

  this.$menu.accessibleMegaMenu({
    uuidPrefix: 'mega-menu',
    menuClass: 'site-nav__panel--main',
    topNavItemClass: 'site-nav__item',
    panelClass: 'mega-container',
    panelGroupClass: 'mega__group',
    hoverClass: 'is-hover',
    focusClass: 'is-focus',
    openClass: 'is-open',
    openDelay: 500,
    openOnClick: true,
    selectors: {
      topNavItems: '[data-submenu]'
    }
  });
};

SiteNav.prototype.assignAria = function() {
  this.$menu.attr('aria-label', 'Site-wide navigation');
  if (helpers.getWindowWidth() < helpers.BREAKPOINTS.LARGE) {
    this.$toggle.attr('aria-haspopup', true);
    this.$menu.attr('aria-hidden', true);
  }
};

SiteNav.prototype.toggleMenu = function() {
  var method = this.isOpen ? this.hideMenu : this.showMenu;
  method.apply(this);
};

SiteNav.prototype.showMenu = function() {
  this.$body.css({
    'overflow': 'hidden'
  });
  this.$element.addClass('is-open');
  this.$toggle.addClass('active');
  this.$menu.attr('aria-hidden', false);
  this.isOpen = true;
};

SiteNav.prototype.hideMenu = function() {
  this.$body.css({
    'overflow': 'auto'
  });
  this.$element.removeClass('is-open');
  this.$toggle.removeClass('active');
  this.$menu.attr('aria-hidden', true);
  this.isOpen = false;
  if (this.isMobile) {
    this.$element.find('[aria-hidden=false]').attr('aria-hidden', true);
  }
};

module.exports = {
  SiteNav: SiteNav
};


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
var scrollMonitor = __webpack_require__(252);
var _ = __webpack_require__(2);

/**
 * Table of Contents widget
 *
 * 1. Takes a list of links and finds all sections with IDs matching their hrefs
 * 2. Adds scrollwatchers to highlight the menu item when the section reaches top of viewport
 * 3. Animates the document to scroll to the section when clicking the link
 *
 * @constructor
 * @param {string} selector - Selector for the navigation menu for the TOC
 */

function TOC(selector) {
  this.$menu = $(selector);
  this.sections = this.getSections();
  this.offset = -1 * window.innerHeight;
  this.watchers = this.addWatchers();
  this.$menu.on('click', 'a', this.scrollTo.bind(this));
  $(window).on('resize', this.updateWatchers.bind(this));
}

TOC.prototype.getSections = function() {
  return this.$menu.find('a').map(function(idx, elm) {
    return $(elm).attr('href');
  });
};

TOC.prototype.addWatchers = function() {
  var self = this;

  return this.sections.map(function(idx, section) {
    var elm = document.querySelector(section);
    var watcher = scrollMonitor.create(elm, {top: self.offset});
    watcher.$menuItem = self.$menu.find('a[href="' + section + '"]');
    watcher.enterViewport(function() {
      self.highlightActiveItem(this);
    });
    return watcher;
  });
};

TOC.prototype.highlightActiveItem = function(watcher) {
  var $currentHighlight = this.$menu.find('a.is-active');
  if (watcher.isInViewport) {
    $currentHighlight.removeClass('is-active');
    watcher.$menuItem.addClass('is-active');
  }
};

TOC.prototype.scrollTo = function(e) {
  e.preventDefault();
  var $link = $(e.target);
  var section = $link.attr('href');
  var sectionTop = $(section).offset().top + 10;
  $('body, html').animate({
    scrollTop: sectionTop
  });
};

TOC.prototype.updateWatchers = function() {
  var newOffset = -1 * window.innerHeight;
  _.each(this.watchers, function(watcher) {
    watcher.offsets.top = newOffset;
    watcher.recalculateLocation();
  });
};

module.exports = { TOC: TOC };


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("scrollMonitor",[],e):"object"==typeof exports?exports.scrollMonitor=e():t.scrollMonitor=e()}(this,function(){return function(t){function e(o){if(i[o])return i[o].exports;var s=i[o]={exports:{},id:o,loaded:!1};return t[o].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var o=i(1),s=o.isInBrowser,n=i(2),r=new n(s?document.body:null);r.setStateFromDOM(null),r.listenToDOM(),s&&(window.scrollMonitor=r),t.exports=r},function(t,e){"use strict";e.VISIBILITYCHANGE="visibilityChange",e.ENTERVIEWPORT="enterViewport",e.FULLYENTERVIEWPORT="fullyEnterViewport",e.EXITVIEWPORT="exitViewport",e.PARTIALLYEXITVIEWPORT="partiallyExitViewport",e.LOCATIONCHANGE="locationChange",e.STATECHANGE="stateChange",e.eventTypes=[e.VISIBILITYCHANGE,e.ENTERVIEWPORT,e.FULLYENTERVIEWPORT,e.EXITVIEWPORT,e.PARTIALLYEXITVIEWPORT,e.LOCATIONCHANGE,e.STATECHANGE],e.isOnServer="undefined"==typeof window,e.isInBrowser=!e.isOnServer,e.defaultOffsets={top:0,bottom:0}},function(t,e,i){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){return c?0:t===document.body?window.innerHeight||document.documentElement.clientHeight:t.clientHeight}function n(t){return c?0:t===document.body?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight):t.scrollHeight}function r(t){return c?0:t===document.body?window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}var h=i(1),c=h.isOnServer,a=h.isInBrowser,l=h.eventTypes,p=i(3),w=function(){function t(e,i){function h(){if(a.viewportTop=r(e),a.viewportBottom=a.viewportTop+a.viewportHeight,a.documentHeight=n(e),a.documentHeight!==p){for(w=a.watchers.length;w--;)a.watchers[w].recalculateLocation();p=a.documentHeight}}function c(){for(u=a.watchers.length;u--;)a.watchers[u].update();for(u=a.watchers.length;u--;)a.watchers[u].triggerCallbacks()}o(this,t);var a=this;this.item=e,this.watchers=[],this.viewportTop=null,this.viewportBottom=null,this.documentHeight=n(e),this.viewportHeight=s(e),this.DOMListener=function(){t.prototype.DOMListener.apply(a,arguments)},this.eventTypes=l,i&&(this.containerWatcher=i.create(e));var p,w,u;this.update=function(){h(),c()},this.recalculateLocations=function(){this.documentHeight=0,this.update()}}return t.prototype.listenToDOM=function(){a&&(window.addEventListener?(this.item===document.body?window.addEventListener("scroll",this.DOMListener):this.item.addEventListener("scroll",this.DOMListener),window.addEventListener("resize",this.DOMListener)):(this.item===document.body?window.attachEvent("onscroll",this.DOMListener):this.item.attachEvent("onscroll",this.DOMListener),window.attachEvent("onresize",this.DOMListener)),this.destroy=function(){window.addEventListener?(this.item===document.body?(window.removeEventListener("scroll",this.DOMListener),this.containerWatcher.destroy()):this.item.removeEventListener("scroll",this.DOMListener),window.removeEventListener("resize",this.DOMListener)):(this.item===document.body?(window.detachEvent("onscroll",this.DOMListener),this.containerWatcher.destroy()):this.item.detachEvent("onscroll",this.DOMListener),window.detachEvent("onresize",this.DOMListener))})},t.prototype.destroy=function(){},t.prototype.DOMListener=function(t){this.setStateFromDOM(t)},t.prototype.setStateFromDOM=function(t){var e=r(this.item),i=s(this.item),o=n(this.item);this.setState(e,i,o,t)},t.prototype.setState=function(t,e,i,o){var s=e!==this.viewportHeight||i!==this.contentHeight;if(this.latestEvent=o,this.viewportTop=t,this.viewportHeight=e,this.viewportBottom=t+e,this.contentHeight=i,s)for(var n=this.watchers.length;n--;)this.watchers[n].recalculateLocation();this.updateAndTriggerWatchers(o)},t.prototype.updateAndTriggerWatchers=function(t){for(var e=this.watchers.length;e--;)this.watchers[e].update();for(e=this.watchers.length;e--;)this.watchers[e].triggerCallbacks(t)},t.prototype.createCustomContainer=function(){return new t},t.prototype.createContainer=function(e){"string"==typeof e?e=document.querySelector(e):e&&e.length>0&&(e=e[0]);var i=new t(e,this);return i.setStateFromDOM(),i.listenToDOM(),i},t.prototype.create=function(t,e){"string"==typeof t?t=document.querySelector(t):t&&t.length>0&&(t=t[0]);var i=new p(this,t,e);return this.watchers.push(i),i},t.prototype.beget=function(t,e){return this.create(t,e)},t}();t.exports=w},function(t,e,i){"use strict";function o(t,e,i){function o(t,e){if(0!==t.length)for(E=t.length;E--;)T=t[E],T.callback.call(s,e,s),T.isOne&&t.splice(E,1)}var s=this;this.watchItem=e,this.container=t,i?i===+i?this.offsets={top:i,bottom:i}:this.offsets={top:i.top||u.top,bottom:i.bottom||u.bottom}:this.offsets=u,this.callbacks={};for(var d=0,f=w.length;d<f;d++)s.callbacks[w[d]]=[];this.locked=!1;var m,v,b,I,E,T;this.triggerCallbacks=function(t){switch(this.isInViewport&&!m&&o(this.callbacks[r],t),this.isFullyInViewport&&!v&&o(this.callbacks[h],t),this.isAboveViewport!==b&&this.isBelowViewport!==I&&(o(this.callbacks[n],t),v||this.isFullyInViewport||(o(this.callbacks[h],t),o(this.callbacks[a],t)),m||this.isInViewport||(o(this.callbacks[r],t),o(this.callbacks[c],t))),!this.isFullyInViewport&&v&&o(this.callbacks[a],t),!this.isInViewport&&m&&o(this.callbacks[c],t),this.isInViewport!==m&&o(this.callbacks[n],t),!0){case m!==this.isInViewport:case v!==this.isFullyInViewport:case b!==this.isAboveViewport:case I!==this.isBelowViewport:o(this.callbacks[p],t)}m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport},this.recalculateLocation=function(){if(!this.locked){var t=this.top,e=this.bottom;if(this.watchItem.nodeName){var i=this.watchItem.style.display;"none"===i&&(this.watchItem.style.display="");for(var s=0,n=this.container;n.containerWatcher;)s+=n.containerWatcher.top-n.containerWatcher.container.viewportTop,n=n.containerWatcher.container;var r=this.watchItem.getBoundingClientRect();this.top=r.top+this.container.viewportTop-s,this.bottom=r.bottom+this.container.viewportTop-s,"none"===i&&(this.watchItem.style.display=i)}else this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=this.container.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom);this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,void 0===t&&void 0===e||this.top===t&&this.bottom===e||o(this.callbacks[l],null)}},this.recalculateLocation(),this.update(),m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport}var s=i(1),n=s.VISIBILITYCHANGE,r=s.ENTERVIEWPORT,h=s.FULLYENTERVIEWPORT,c=s.EXITVIEWPORT,a=s.PARTIALLYEXITVIEWPORT,l=s.LOCATIONCHANGE,p=s.STATECHANGE,w=s.eventTypes,u=s.defaultOffsets;o.prototype={on:function(t,e,i){switch(!0){case t===n&&!this.isInViewport&&this.isAboveViewport:case t===r&&this.isInViewport:case t===h&&this.isFullyInViewport:case t===c&&this.isAboveViewport&&!this.isInViewport:case t===a&&this.isInViewport&&this.isAboveViewport:if(e.call(this,this.container.latestEvent,this),i)return}if(!this.callbacks[t])throw new Error("Tried to add a scroll monitor listener of type "+t+". Your options are: "+w.join(", "));this.callbacks[t].push({callback:e,isOne:i||!1})},off:function(t,e){if(!this.callbacks[t])throw new Error("Tried to remove a scroll monitor listener of type "+t+". Your options are: "+w.join(", "));for(var i,o=0;i=this.callbacks[t][o];o++)if(i.callback===e){this.callbacks[t].splice(o,1);break}},one:function(t,e){this.on(t,e,!0)},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height},update:function(){this.isAboveViewport=this.top<this.container.viewportTop,this.isBelowViewport=this.bottom>this.container.viewportBottom,this.isInViewport=this.top<this.container.viewportBottom&&this.bottom>this.container.viewportTop,this.isFullyInViewport=this.top>=this.container.viewportTop&&this.bottom<=this.container.viewportBottom||this.isAboveViewport&&this.isBelowViewport},destroy:function(){var t=this.container.watchers.indexOf(this),e=this;this.container.watchers.splice(t,1);for(var i=0,o=w.length;i<o;i++)e.callbacks[w[i]].length=0},lock:function(){this.locked=!0},unlock:function(){this.locked=!1}};for(var d=function(t){return function(e,i){this.on.call(this,t,e,i)}},f=0,m=w.length;f<m;f++){var v=w[f];o.prototype[v]=d(v)}t.exports=o}])});
//# sourceMappingURL=scrollMonitor.js.map

/***/ }),
/* 253 */,
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Sticky
 * @module
 */


var extend = __webpack_require__(255);
var on = __webpack_require__(256);
var off = __webpack_require__(258);
var emit = __webpack_require__(259);
var getOffsets = __webpack_require__(261);


module.exports = Sticky;


/**
 * @constructor
 */
function Sticky(el, options){
	if (el.getAttribute('data-sticky-id') === undefined) {
		return console.log('Sticky already exist');
	}

	this.el = el;
	this.parent = this.el.parentNode;

	//recognize attributes
	var dataset = el.dataset;
	if (!dataset){
		dataset = {};
		if (el.getAttribute('data-within')) dataset['within'] = el.getAttribute('data-within');
		if (el.getAttribute('data-offset')) dataset['offset'] = el.getAttribute('data-offset');
		if (el.getAttribute('data-stack')) dataset['stack'] = el.getAttribute('data-stack');
		if (el.getAttribute('data-sticky-class')) dataset['stickyClass'] = el.getAttribute('data-sticky-class');
	}
	this.options = extend({}, this.options, dataset, options);

	//query selector, if passed one
	if ( typeof this.options['within'] === 'string' && this.options['within'].trim() ){
		this.within = document.body.querySelector(this.options['within']);
	} else {
		this.within = this.options['within'];
	}

	//keep list
	this.el.setAttribute('data-sticky-id', Sticky.list.length);
	this.id = Sticky.list.length;
	Sticky.list.push(this);

	//state
	this.isFixed = false;
	this.isBottom = false;
	this.isTop = true;
	this.updateClasses();

	//boundaries to strict within
	this.restrictBox = {
		top: 0,
		bottom: 9999
	};

	//self position & size
	this.height = 0;
	this.isDisabled = false;

	//parent position & size
	this.parentBox = {
		top: 0,
		height: 0
	}

	//mind gap from bottom & top in addition to restrictBox (for stacks)
	this.options.offset = parseFloat(this.options['offset']) || 0;
	this.offset = {
		top: 0,
		bottom: 0
	};

	//additional gap if item being scrolled
	this.scrollOffset = 0;

	//Detect whether stacking is needed
	var prevEl = this.el;
	this.stackId = [];
	this.stack = [];
	if (this.options['stack']) {
		var stack = this.options['stack'].split(',');
		for (var i = stack.length; i--;){
			stack[i] = stack[i].trim();
			if (!Sticky.stack[stack[i]]) Sticky.stack[stack[i]] = [];
			this.stackId[i] = Sticky.stack[stack[i]].length;
			this.stack.push(stack[i]);
			Sticky.stack[stack[i]].push(this)
		}
	} else {
		this.stackId[0] = Sticky.noStack.length;
		Sticky.noStack.push(this);
	}


	//stub is a spacer filling space when element is stuck
	this.stub = this.el.cloneNode();
	this.stub.classList.add(this.options['stubClass']);
	this.stub.style.visibility = 'hidden';
	this.stub.style.display = 'none';
	this.stub.removeAttribute('hidden');

	//save initial inline style
	this.initialStyle = this.el.style.cssText;
	this.initialDisplay = getComputedStyle(this.el)['display'];

	//ensure parent's container relative coordinates
	var pStyle = getComputedStyle(this.parent);
	if (pStyle.position == 'static') this.parent.style.position = 'relative';

	//bind methods
	this.check = this.check.bind(this);
	this.recalc = this.recalc.bind(this);
	this.disable = this.disable.bind(this);
	this.enable = this.enable.bind(this);
	this.bindEvents = this.bindEvents.bind(this);
	this.adjustSizeAndPosition = this.adjustSizeAndPosition.bind(this);
	this.park = this.park.bind(this);
	this.stick = this.stick.bind(this);
	this.parkStack = this.parkStack.bind(this);
	this.stickStack = this.stickStack.bind(this);
	this.captureScrollOffset = this.captureScrollOffset.bind(this);
	this.observeStackScroll = this.observeStackScroll.bind(this);
	this.stopObservingStackScroll = this.stopObservingStackScroll.bind(this);

	if (this.initialDisplay === 'none') {
		this.initialDisplay = 'block';
		this.disable();
	}
	else this.enable();
}

//list of instances
Sticky.list = [];
//mutually exclusive items
Sticky.noStack = [];
//stacks of items
Sticky.stack = {};
//heights of stacks
Sticky.stackHeights = {};


/** Update all sticky instances */
Sticky.recalc = function () {
	Sticky.list.forEach(function (instance) {
		instance.recalc();
	});
};


/** API events */
on(document, 'sticky:recalc', Sticky.recalc);


var proto = Sticky.prototype;


proto.options = {
	'offset': 0,
	'within': null, //element or bounding box
	'stubClass': 'sticky-stub',
	'stickyClass': 'is-stuck',
	'bottomClass': 'is-bottom',
	'topClass': 'is-top',
	'stack': null,
	'collapse': true,
	'recalcInterval': 20
};


/** when element removed or made hidden. */
proto.disable = function(){
	if (this.stub.parentNode) this.parent.removeChild(this.stub);
	this.unbindEvents();
	this.isDisabled = true;
	Sticky.recalc();
};


/** enables previously disabled element */
proto.enable = function(){
	if (!this.stub.parentNode) this.parent.insertBefore(this.stub, this.el);
	this.isDisabled = false;
	this.bindEvents();
	Sticky.recalc();
};


proto.bindEvents = function(){
	on(document, 'scroll', this.check);
	on(window, 'resize', this.recalc);
	on(this.el, 'mouseover', this.observeStackScroll);
	on(this.el, 'mouseout', this.stopObservingStackScroll);
};


proto.unbindEvents = function(){
	off(document, 'scroll', this.check);
	off(window, 'resize', this.recalc);
	off(this.el, 'mouseover', this.observeStackScroll);
	off(this.el, 'mouseout', this.stopObservingStackScroll);
};


/** changing state necessity checker */
proto.check = function(){
	var vpTop = window.pageYOffset || document.documentElement.scrollTop;
	//console.log('check:' + this.el.dataset['stickyId'], 'isFixed:' + this.isFixed, this.restrictBox)
	if (this.isFixed){
		if (!this.isTop && vpTop + this.offset.top + this.options.offset + this.height + this.mt + this.mb + this.scrollOffset >= this.restrictBox.bottom - this.offset.bottom){
			//check bottom parking needed
			this.parkBottom();
		}
		if (!this.isBottom && vpTop + this.offset.top + this.options.offset + this.mt + this.scrollOffset <= this.restrictBox.top){
			//check top parking needed
			this.parkTop();
		}
	} else {
		if (this.isTop || this.isBottom){
			if (vpTop + this.offset.top + this.options.offset + this.mt > this.restrictBox.top){
				//fringe violation from top
				if (vpTop + this.offset.top + this.options.offset + this.height + this.mt + this.mb < this.restrictBox.bottom - this.offset.bottom){
					//fringe violation from top or bottom to the sticking zone
					this.stick();
				} else if (!this.isBottom) {
					//fringe violation from top lower than bottom
					this.stick();
					this.parkBottom();
				}
			} else if(this.isBottom){
				//fringe violation from bottom to higher than top
				this.stick();
				this.parkTop();
			}
		}
	}
};


/**
 * sticking inner routines
 * when park top needed
 */
proto.parkTop = function(){
	//this.el = this.parent.removeChild(this.el);
	this.el.style.cssText = this.initialStyle;
	//this.stub = this.parent.replaceChild(this.el, this.stub);
	this.stub.style.display = 'none';

	this.scrollOffset = 0;

	this.isFixed = false;
	this.isTop = true;
	this.isBottom = false;
	this.updateClasses();

	this.isStackParked = true;

	// console.log('parkTop', this.id)
};


/** when stop needed somewhere in between top and bottom */
proto.park = function(){
	// console.log('parkMiddle', this.id)

	this.isFixed = false;
	this.isTop = false;
	this.isBottom = false;
	this.updateClasses();

	this.isStackParked = true;

	var offset = (window.pageYOffset || document.documentElement.scrollTop) + this.offset.top - this.parentBox.top + this.scrollOffset;
	this.makeParkedStyle(offset);
};

/**
 * to make fixed
 * enhanced replace: faked visual stub is fastly replaced with natural one
 */
proto.stick = function(){
	//this.el = this.parent.replaceChild(this.stub, this.el);
	this.stub.style.display = this.initialDisplay;
	this.makeStickedStyle();
	//this.parent.insertBefore(this.el, this.stub);

	this.isFixed = true;
	this.isTop = false;
	this.isBottom = false;
	this.updateClasses();

	this.isStackParked = false;

	// console.log('stick', this.id)
};


/** when bottom land needed */
proto.parkBottom = function(){
	this.makeParkedBottomStyle();

	this.scrollOffset = 0;

	this.isFixed = false;
	this.isBottom = true;
	this.isTop = false;
	this.updateClasses();

	this.isStackParked = true;

	// console.log('parkBottom', this.id)
};


/**
 * park all items within stack passed/all stacks of this
 * used when item was scrolled on
 */
proto.parkStack = function(){
	var stack = Sticky.stack[this.stack[0]];
	var first = stack[0], last = stack[stack.length - 1];

	for (var i = 0; i < stack.length; i++){
		var item = stack[i]
		item.park();
	}
};


/** unpark all items of stack passed */
proto.stickStack = function(){
	var stack = Sticky.stack[this.stack[0]]
	var first = stack[0], last = stack[stack.length - 1];

	for (var i = 0; i < stack.length; i++){
		var item = stack[i]
		item.stick();
	}
};

/**
 * begin observing scroll to park stack
 */
proto.observeStackScroll = function(){
	var stack = Sticky.stack[this.stack[0]]
	if (!stack) return;

	var first = stack[0], last = stack[stack.length - 1];

	//if stack is parked top or parked bottom - ignore
	if (first.isTop || last.isTop) return;

	//if stack isn’t higher than window height - ignore
	if (Sticky.stackHeights[this.stack[0]] <= window.innerHeight && this.scrollOffset >= 0) return;

	//capture stack’s scroll
	this.scrollStartOffset = (window.pageYOffset || document.documentElement.scrollTop) + this.scrollOffset;

	on(document, 'scroll', this.captureScrollOffset);

	return this;
};

/** stop observing scroll */
proto.stopObservingStackScroll = function(){
	var stack = Sticky.stack[this.stack[0]];
	if (!stack) return;

	var last = stack[stack.length-1], first = stack[0];

	off(document, 'scroll', this.captureScrollOffset);

	if (first.isTop || first.isBottom || last.isTop || last.isBottom) {
		return;
	}
	if (this.isStackParked) this.stickStack();
};

/** when item was scrolled on - capture how much it is scrolled */
proto.captureScrollOffset = function(e){

	var scrollOffset = this.scrollStartOffset - (window.pageYOffset || document.documentElement.scrollTop);
	var stack = Sticky.stack[this.stack[0]];
	var last = stack[stack.length-1], first = stack[0];

	//ignore outside sticking
	if (first.isTop || first.isBottom || last.isTop || last.isBottom) {
		return;
	}

	var stickNeeded = false, parkNeeded = false;

	//if bottom is higher or equal than viewport’s bottom - stick within viewport
	if ( scrollOffset < window.innerHeight - (Sticky.stackHeights[this.stack[0]]) ){
		scrollOffset = window.innerHeight - (Sticky.stackHeights[this.stack[0]]);
		this.scrollStartOffset = (window.pageYOffset || document.documentElement.scrollTop) + scrollOffset;
		stickNeeded = true;
	}

	//if top is lower or equal to the viewport’s top - stick within viewport
	else if ( scrollOffset > 0){
		scrollOffset = 0;
		this.scrollStartOffset = (window.pageYOffset || document.documentElement.scrollTop);
		stickNeeded = true;
	}

	//if stack items is somewhere in between
	else if (!this.isStackParked ){
		parkNeeded = true;
	}

	for (var i = 0; i < stack.length; i++){
		var item = stack[i]
		item.scrollOffset = scrollOffset
	}

	if (stickNeeded && this.isStackParked) return this.stickStack();
	else if (parkNeeded && !this.isStackParked) return this.parkStack();
};

/** set up style of element as if it is parked somewhere / at the bottom */
proto.makeParkedStyle = function(top){
	this.el.style.cssText = this.initialStyle;
	this.el.style.position = 'absolute';
	this.el.style.top = top + 'px';
	mimicStyle(this.el, this.stub);
	this.el.style.left = this.stub.offsetLeft + 'px';
};

proto.makeParkedBottomStyle = function(){
	this.makeParkedStyle(this.restrictBox.bottom - this.offset.bottom - this.parentBox.top - this.height - this.mt - this.mb);
};

proto.makeStickedStyle = function(){
	this.el.style.cssText = this.initialStyle;
	this.el.style.position = 'fixed';
	this.el.style.top = this.offset.top + this.options.offset + this.scrollOffset + 'px';
	mimicStyle(this.el, this.stub);
};

//makes element classes reflecting it's state (this.isTop, this.isBottom, this.isFixed)
proto.updateClasses = function(){
	if (this.isTop){
		this.el.classList.add(this.options['topClass']);
	} else {
		this.el.classList.remove(this.options['topClass']);
	}

	if (this.isFixed){
		this.el.classList.add(this.options['stickyClass']);
	} else {
		this.el.classList.remove(this.options['stickyClass']);
	}

	if (this.isBottom){
		this.el.classList.add(this.options['bottomClass']);
	} else {
		this.el.classList.remove(this.options['bottomClass']);
	}
};


proto.recalc = function(){
	//console.group('recalc:' + this.el.dataset['stickyId'])
	//element to mimic visual properties from
	var measureEl = (this.isTop ? this.el : this.stub);

	//update stub content
	this.stub.innerHTML = this.el.innerHTML;
	cleanNode(this.stub);

	//update parent container size & offsets
	this.parentBox = getOffsets(this.parent);

	//update self size & position
	this.height = this.el.offsetHeight;
	var mStyle = getComputedStyle(measureEl);
	this.ml = ~~mStyle.marginLeft.slice(0,-2);
	this.mr = ~~mStyle.marginRight.slice(0,-2);
	this.mt = ~~mStyle.marginTop.slice(0,-2);
	this.mb = ~~mStyle.marginBottom.slice(0,-2);

	this.scrollOffset = 0;

	//update restrictions
	this.restrictBox = this.getRestrictBox(this.within, measureEl);

	//make restriction up to next sibling within one container
	var prevSticky;
	this.offset.bottom = 0;
	this.offset.top = 0;
	if (this.stack.length){
		for (var i = this.stack.length; i--;){
			if (prevSticky = Sticky.stack[this.stack[i]][this.stackId[i] - 1]){
				//make offsets for stacked mode
				var prevMeasurer = (prevSticky.isTop ? prevSticky.el : prevSticky.stub);
				this.offset.top = prevSticky.offset.top + prevSticky.options.offset;
				if (!(this.options['collapse'] && !isOverlap(measureEl, prevMeasurer))) {
				 	this.offset.top += prevSticky.height + Math.max(prevSticky.mt, prevSticky.mb)//collapsed margin
				 	var nextSticky = Sticky.stack[this.stack[i]][this.stackId[i]];
					//multistacking-way of correcting bottom offsets
					for( var j = this.stackId[i] - 1; (prevSticky = Sticky.stack[this.stack[i]][j]); j--){
						prevSticky.offset.bottom = Math.max(prevSticky.offset.bottom, nextSticky.offset.bottom + nextSticky.height + nextSticky.mt + nextSticky.mb);
						nextSticky = prevSticky;
					}
				}
			}

			//track stack heights;
			Sticky.stackHeights[this.stack[i]] = this.offset.top + this.height + this.mt + this.mb;
		}
	} else if (prevSticky = Sticky.noStack[this.stackId[0] - 1]){
		prevSticky.restrictBox.bottom = this.restrictBox.top - this.mt;
	}

	clearTimeout(this._updTimeout);
	this._updTimeout = setTimeout(this.adjustSizeAndPosition, 0);
};


/**
 * return box with sizes based on any restrictwithin object passed
 */
proto.getRestrictBox = function(within, measureEl){
	var restrictBox = {
		top: 0,
		bottom: 0
	};
	if (within instanceof Element){
		var offsetRect = getOffsets(within)
		restrictBox.top = Math.max(offsetRect.top, getOffsets(measureEl).top);
		//console.log(getOffsets(this.stub))
		restrictBox.bottom = within.offsetHeight + offsetRect.top;
	} else if (within instanceof Object) {
		if (within.top instanceof Element) {
			var offsetRect = getOffsets(within.top)
			restrictBox.top = Math.max(offsetRect.top, getOffsets(measureEl).top);
		} else {
			restrictBox.top = within.top;
		}
		if (within.bottom instanceof Element) {
			var offsetRect = getOffsets(within.bottom)
			restrictBox.bottom = within.bottom.offsetHeight + offsetRect.top;
			//console.log(offsetRect)
		} else {
			restrictBox.bottom = within.bottom;
		}
	} else {
		//case of parent container
		restrictBox.top = getOffsets(measureEl).top;
		restrictBox.bottom = this.parentBox.height + this.parentBox.top;
	}
	//console.log('Restrictbox', restrictBox)
	return restrictBox;
};


proto.adjustSizeAndPosition = function(){
	if (this.isTop){
		this.el.style.cssText = this.initialStyle;
	} else if (this.isBottom){
		this.makeParkedBottomStyle();
	} else {
		this.makeStickedStyle();
	}

	this.check();
};




/** removes iframe, objects etc shit */
var badTags = ['object', 'iframe', 'embed', 'img'];
function cleanNode(node){
	node.removeAttribute('id');
	var idTags = node.querySelectorAll('[id]');
	for (var k = 0; k < idTags.length; k++){
		idTags[k].removeAttribute('id'); //avoid any uniqueness
		idTags[k].removeAttribute('name'); //avoid any uniqueness
	}
	for (var i = 0; i < badTags.length; i++){
		var tags = node.querySelectorAll(badTags[i]);
		for (var j = tags.length; j--; ){
			if (tags[j].tagName === 'SCRIPT') tags[j].parentNode.replaceChild(tags[j])
			tags[j].removeAttribute('src');
			tags[j].removeAttribute('href');
			tags[j].removeAttribute('rel');
			tags[j].removeAttribute('srcdoc');
		}
	}
}


var directions = ['left', 'top', 'right', 'bottom'],
	mimicProperties = ['padding-', 'border-'];


/** copies size-related style of stub */
function mimicStyle(to, from){
	var stubStyle = getComputedStyle(from),
		stubOffset = getOffsets(from),
		pl = 0, pr = 0, ml = 0;
	if (stubStyle['box-sizing'] !== 'border-box'){
		pl = ~~stubStyle.paddingLeft.slice(0,-2)
		pr = ~~stubStyle.paddingRight.slice(0,-2)
	}

	to.style.width = (stubOffset.width - pl - pr) + 'px';
	to.style.left = stubOffset.left + 'px';
	to.style.marginLeft = 0;
	for (var i = 0; i < mimicProperties.length; i++){
		for (var j = 0; j < directions.length; j++){
			var prop = mimicProperties[i] + directions[j];
			to.style[prop] = stubStyle[prop];
		}
	}
}


/** checks overlapping widths */
function isOverlap(left, right){
	var lLeft = left.offsetLeft,
		lRight = left.offsetLeft + left.offsetWidth,
		rLeft = right.offsetLeft,
		rRight = right.offsetWidth + right.offsetLeft;
	if (lRight < rLeft && lLeft < rLeft
		|| lRight > rRight && lLeft > rRight){
		return false;
	}
	return true;
}

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module emmy/on
 */


var icicle = __webpack_require__(87);
var listeners = __webpack_require__(88);
var isObject = __webpack_require__(257);

module.exports = on;


/**
 * Bind fn to a target.
 *
 * @param {*} targte A single target to bind evt
 * @param {string} evt An event name
 * @param {Function} fn A callback
 * @param {Function}? condition An optional filtering fn for a callback
 *                              which accepts an event and returns callback
 *
 * @return {object} A target
 */
function on(target, evt, fn){
	if (!target) return target;

	//consider object of events
	if (isObject(evt)) {
		for(var evtName in evt) {
			on(target, evtName, evt[evtName]);
		}
		return target;
	}

	//get target `on` method, if any
	//prefer native-like method name
	//user may occasionally expose `on` to the global, in case of browserify
	//but it is unlikely one would replace native `addEventListener`
	var onMethod =  target['addEventListener'] || target['addListener'] || target['attachEvent'] || target['on'];

	var cb = fn;

	evt = '' + evt;

	//invoke method for each space-separated event from a list
	evt.split(/\s+/).forEach(function(evt){
		var evtParts = evt.split('.');
		evt = evtParts.shift();

		//use target event system, if possible
		if (onMethod) {
			//avoid self-recursions
			//if it’s frozen - ignore call
			if (icicle.freeze(target, 'on' + evt)){
				onMethod.call(target, evt, cb);
				icicle.unfreeze(target, 'on' + evt);
			}
			else {
				return target;
			}
		}

		//save the callback anyway
		listeners.add(target, evt, cb, evtParts);
	});

	return target;
}


/**
 * Wrap an fn with condition passing
 */
on.wrap = function(target, evt, fn, condition){
	var cb = function() {
		if (condition.apply(target, arguments)) {
			return fn.apply(target, arguments);
		}
	};

	cb.fn = fn;

	return cb;
};


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module emmy/off
 */
module.exports = off;

var icicle = __webpack_require__(87);
var slice = __webpack_require__(118);
var listeners = __webpack_require__(88);


/**
 * Remove listener[s] from the target
 *
 * @param {[type]} evt [description]
 * @param {Function} fn [description]
 *
 * @return {[type]} [description]
 */
function off(target, evt, fn) {
	if (!target) return target;

	var callbacks, i;

	//unbind all listeners if no fn specified
	if (fn === undefined) {
		var args = slice(arguments, 1);

		//try to use target removeAll method, if any
		var allOff = target['removeAll'] || target['removeAllListeners'];

		//call target removeAll
		if (allOff) {
			allOff.apply(target, args);
		}


		//then forget own callbacks, if any

		//unbind all evts
		if (!evt) {
			callbacks = listeners(target);
			for (evt in callbacks) {
				off(target, evt);
			}
		}
		//unbind all callbacks for an evt
		else {
			evt = '' + evt;

			//invoke method for each space-separated event from a list
			evt.split(/\s+/).forEach(function (evt) {
				var evtParts = evt.split('.');
				evt = evtParts.shift();
				callbacks = listeners(target, evt, evtParts);

				//returned array of callbacks (as event is defined)
				if (evt) {
					var obj = {};
					obj[evt] = callbacks;
					callbacks = obj;
				}

				//for each group of callbacks - unbind all
				for (var evtName in callbacks) {
					slice(callbacks[evtName]).forEach(function (cb) {
						off(target, evtName, cb);
					});
				}
			});
		}

		return target;
	}


	//target events (string notation to advanced_optimizations)
	var offMethod = target['removeEventListener'] || target['removeListener'] || target['detachEvent'] || target['off'];

	//invoke method for each space-separated event from a list
	evt.split(/\s+/).forEach(function (evt) {
		var evtParts = evt.split('.');
		evt = evtParts.shift();

		//use target `off`, if possible
		if (offMethod) {
			//avoid self-recursion from the outside
			if (icicle.freeze(target, 'off' + evt)) {
				offMethod.call(target, evt, fn);
				icicle.unfreeze(target, 'off' + evt);
			}

			//if it’s frozen - ignore call
			else {
				return target;
			}
		}

		if (fn.closedCall) fn.closedCall = false;

		//forget callback
		listeners.remove(target, evt, fn, evtParts);
	});


	return target;
}


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module emmy/emit
 */
var icicle = __webpack_require__(87);
var slice = __webpack_require__(118);
var listeners = __webpack_require__(88);
var isBrowser = __webpack_require__(260);


/**
 * A simple wrapper to handle stringy/plain events
 */
module.exports = function(target, evt){
	if (!target) return;

	var args = arguments;
	if (typeof evt === 'string') {
		args = slice(arguments, 2);
		evt.split(/\s+/).forEach(function(evt){
			evt = evt.split('.')[0];

			emit.apply(this, [target, evt].concat(args));
		});
	} else {
		return emit.apply(this, args);
	}
};


/** detect env */
var $ = typeof jQuery === 'undefined' ? undefined : jQuery;
var doc = typeof document === 'undefined' ? undefined : document;
var win = typeof window === 'undefined' ? undefined : window;


/**
 * Emit an event, optionally with data or bubbling
 * Accept only single elements/events
 *
 * @param {string} eventName An event name, e. g. 'click'
 * @param {*} data Any data to pass to event.details (DOM) or event.data (elsewhere)
 * @param {bool} bubbles Whether to trigger bubbling event (DOM)
 *
 *
 * @return {target} a target
 */
function emit(target, eventName, data, bubbles){
	var emitMethod, evt = eventName;

	//Create proper event for DOM objects
	if (isBrowser && (target instanceof Node || target === win)) {
		//NOTE: this doesnot bubble on off-DOM elements

		if (isBrowser && eventName instanceof Event) {
			evt = eventName;
		} else {
			//IE9-compliant constructor
			evt = doc.createEvent('CustomEvent');
			evt.initCustomEvent(eventName, bubbles, true, data);

			//a modern constructor would be:
			// var evt = new CustomEvent(eventName, { detail: data, bubbles: bubbles })
		}

		emitMethod = target.dispatchEvent;
	}

	//create event for jQuery object
	else if ($ && target instanceof $) {
		//TODO: decide how to pass data
		evt = $.Event( eventName, data );
		evt.detail = data;

		//FIXME: reference case where triggerHandler needed (something with multiple calls)
		emitMethod = bubbles ? targte.trigger : target.triggerHandler;
	}

	//detect target events
	else {
		//emit - default
		//trigger - jquery
		//dispatchEvent - DOM
		//raise - node-state
		//fire - ???
		emitMethod = target['dispatchEvent'] || target['emit'] || target['trigger'] || target['fire'] || target['raise'];
	}


	var args = slice(arguments, 2);


	//use locks to avoid self-recursion on objects wrapping this method
	if (emitMethod) {
		if (icicle.freeze(target, 'emit' + eventName)) {
			//use target event system, if possible
			emitMethod.apply(target, [evt].concat(args));
			icicle.unfreeze(target, 'emit' + eventName);

			return target;
		}

		//if event was frozen - probably it is emitter instance
		//so perform normal callback
	}


	//fall back to default event system
	var evtCallbacks = listeners(target, evt);

	//copy callbacks to fire because list can be changed by some callback (like `off`)
	var fireList = slice(evtCallbacks);
	for (var i = 0; i < fireList.length; i++ ) {
		fireList[i] && fireList[i].apply(target, args);
	}

	return target;
}


/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Calculate absolute offsets of an element, relative to the document.
 *
 * @module mucss/offsets
 *
 */
var win = window;
var doc = document;
var Rect = __webpack_require__(262);
var hasScroll = __webpack_require__(263);
var scrollbar = __webpack_require__(264);
var isFixedEl = __webpack_require__(265);

/**
 * Return absolute offsets of any target passed
 *
 * @param    {Element|window}   el   A target. Pass window to calculate viewport offsets
 * @return   {Object}   Offsets object with trbl.
 */
module.exports = offsets;

function offsets (el) {
	if (!el) throw Error('Bad argument');

	//calc client rect
	var cRect, result;

	//return vp offsets
	if (el === win) {
		result = new Rect(
			win.pageXOffset,
			win.pageYOffset
		);

		result.width = win.innerWidth - (hasScroll.y() ? scrollbar : 0),
		result.height = win.innerHeight - (hasScroll.x() ? scrollbar : 0)
		result.right = result.left + result.width;
		result.bottom = result.top + result.height;

		return result;
	}

	//return absolute offsets if document requested
	else if (el === doc) {
		var res = offsets(doc.documentElement);
		res.bottom = Math.max(window.innerHeight, res.bottom);
		res.right = Math.max(window.innerWidth, res.right);
		if (hasScroll.y(doc.documentElement)) res.right -= scrollbar;
		if (hasScroll.x(doc.documentElement)) res.bottom -= scrollbar;
		return res;
	}

	//FIXME: why not every element has getBoundingClientRect method?
	try {
		cRect = el.getBoundingClientRect();
	} catch (e) {
		cRect = new Rect(
			el.clientLeft,
			el.clientTop
		);
	}

	//whether element is or is in fixed
	var isFixed = isFixedEl(el);
	var xOffset = isFixed ? 0 : win.pageXOffset;
	var yOffset = isFixed ? 0 : win.pageYOffset;

	result = new Rect(
		cRect.left + xOffset,
		cRect.top + yOffset,
		cRect.left + xOffset + el.offsetWidth,
		cRect.top + yOffset + el.offsetHeight,
		el.offsetWidth,
		el.offsetHeight
	);

	return result;
};

/***/ }),
/* 262 */
/***/ (function(module, exports) {

/**
 * Simple rect constructor.
 * It is just faster and smaller than constructing an object.
 *
 * @module mucss/Rect
 *
 * @param {number} l left
 * @param {number} t top
 * @param {number} r right
 * @param {number} b bottom
 * @param {number}? w width
 * @param {number}? h height
 *
 * @return {Rect} A rectangle object
 */
module.exports = function Rect (l,t,r,b,w,h) {
	this.top=t||0;
	this.bottom=b||0;
	this.left=l||0;
	this.right=r||0;
	if (w!==undefined) this.width=w||this.right-this.left;
	if (h!==undefined) this.height=h||this.bottom-this.top;
};

/***/ }),
/* 263 */
/***/ (function(module, exports) {

/**
 * Window scrollbar detector.
 *
 * @module mucss/has-scroll
 */
exports.x = function () {
	return window.innerHeight > document.documentElement.clientHeight;
};
exports.y = function () {
	return window.innerWidth > document.documentElement.clientWidth;
};

/***/ }),
/* 264 */
/***/ (function(module, exports) {

/**
 * Calculate scrollbar width.
 *
 * @module mucss/scrollbar
 */

// Create the measurement node
var scrollDiv = document.createElement("div");

var style = scrollDiv.style;

style.width = '100px';
style.height = '100px';
style.overflow = 'scroll';
style.position = 'absolute';
style.top = '-9999px';

document.documentElement.appendChild(scrollDiv);

// the scrollbar width
module.exports = scrollDiv.offsetWidth - scrollDiv.clientWidth;

// Delete fake DIV
document.documentElement.removeChild(scrollDiv);

/***/ }),
/* 265 */
/***/ (function(module, exports) {

/**
 * Detect whether element is placed to fixed container or is fixed itself.
 *
 * @module mucss/is-fixed
 *
 * @param {(Element|Object)} el Element to detect fixedness.
 *
 * @return {boolean} Whether element is nested.
 */
module.exports = function (el) {
	var parentEl = el;

	//window is fixed, btw
	if (el === window) return true;

	//unlike the doc
	if (el === document) return false;

	while (parentEl) {
		if (getComputedStyle(parentEl).position === 'fixed') return true;
		parentEl = parentEl.offsetParent;
	}
	return false;
};

/***/ }),
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(0);
__webpack_require__(61).init();

// Implementing a polyfill for js native WeakMap
// in order to patch functionality in an included library
__webpack_require__(189);

var Accordion = __webpack_require__(114).Accordion;
var Glossary = __webpack_require__(231);

var terms = __webpack_require__(246);
var feedback = __webpack_require__(247);
var skipNav = __webpack_require__(249);
var siteNav = __webpack_require__(250);
var dropdown = __webpack_require__(22);
var toc = __webpack_require__(251);
var typeahead = __webpack_require__(19);
var helpers = __webpack_require__(6);

// Hack: Append jQuery to `window` for use by legacy libraries
window.$ = window.jQuery = $;

var Sticky = __webpack_require__(254);
var FormNav = __webpack_require__(319).FormNav;

$(document).ready(function() {

  // Initialize glossary
  new Glossary(terms, {}, {
    termClass: 'glossary__term accordion__button',
    definitionClass: 'glossary__definition accordion__content'
  });

  // Initialize new accordions
  $('.js-accordion').each(function() {
    var contentPrefix = $(this).data('content-prefix') || 'accordion';
    var openFirst = $(this).data('open-first') || false;
    var selectors = {
      trigger: '.js-accordion-trigger'
    };
    var opts = {
      contentPrefix: contentPrefix,
      openFirst: openFirst
    };
    new Accordion(this, selectors, opts);
  });

  new skipNav.Skipnav('.skip-nav', 'main');
  new siteNav.SiteNav('.js-site-nav');

  // Initialize table of contents
  new toc.TOC('.js-toc');

  // Initialize sticky elements
  $('.js-sticky-side').each(function() {
    var container = $(this).data('sticky-container');
    var opts = {
      within: document.getElementById(container)
    };
    if (helpers.isLargeScreen()) {
      new Sticky(this, opts);
    }
  });

  // Initialize checkbox dropdowns
  $('.js-dropdown').each(function() {
    new dropdown.Dropdown(this);
  });

  // Initialize feedback widget
  new feedback.Feedback('/data/issue/');

  $('.js-form-nav').each(function() {
    new FormNav(this);
  });

  // Initialize header typeaheads (mobile and desktop)
  $('.js-site-search').each(function() {
    new typeahead.Typeahead($(this), 'all', '/data/');
  });

  // For any link that should scroll to a section on the page apply .js-scroll to <a>
  $('.js-scroll').on('click', function(e) {
    e.preventDefault();
    var $link = $(e.target);
    var section = $link.attr('href');
    var sectionTop = $(section).offset().top;
    $('body, html').animate({
      scrollTop: sectionTop
    });
  });

  // Post feed
  // Move the read more links to be inline with the snippet from the post
  $('.js-post-content').each(function() {
    var $p = $(this).find('p:first-of-type');
    var $link = $(this).find('.js-read-more');
    if ($p.text() !== 'PDF') {
      $p.append($link);
    } else {
      $link.remove();
    }
  });
});


/***/ }),
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* FormNav
 * Submits the form on select change and clears out unnecessary params
 */

function FormNav(form) {
  this.form = form;
  this.form.addEventListener('change', this.handleChange.bind(this));
}

FormNav.prototype.handleChange = function() {
  var allSelects = this.form.querySelectorAll('select,input');
  // Remove names from all selects with no values
  for(var i = 0; i < allSelects.length; i++) {
    var select = allSelects[i];
    if(select.getAttribute('name') && !select.value) {
      select.setAttribute('name', '');
    }
  }

  this.form.submit();
};

module.exports = {FormNav: FormNav};


/***/ })
],[290]);