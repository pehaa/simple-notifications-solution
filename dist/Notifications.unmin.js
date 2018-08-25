(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Notifications"] = factory();
	else
		root["Notifications"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1);

var _notifications = __webpack_require__(3);

exports.default = _notifications.Notifications;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notifications = exports.Notifications = function () {
    function Notifications() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.notification';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Notifications);

        this.selector = selector;
        this.options = {
            animationInName: 'slidein',
            animationOutSelf: 'slideout 1s',
            animationOutClose: 'fadeout 1s',
            closeButtonSelector: '.delete',
            closeSelfOnClick: true,
            gap: 8,
            delayFunction: function delayFunction(i) {
                return 3 + 2 * i;
            },
            topTransition: 'top .75s ease-in-out'
        };
        this.extendDefaults(options);
    }

    _createClass(Notifications, [{
        key: 'extendDefaults',
        value: function extendDefaults(properties) {
            var _this = this;

            Object.keys(properties).forEach(function (el) {
                if (_this.options.hasOwnProperty(el)) {
                    _this.options[el] = properties[el];
                }
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.onload();
            document.addEventListener('animationstart', function (e) {
                _this2.onStartHandler(e);
            });
        }
    }, {
        key: 'onload',
        value: function onload() {
            var _this3 = this;

            this.setTopPositions();
            this.allNotifications().forEach(function (el, i) {
                _this3.setNotification(el, 0.5 + i + 's');
            });
        }
    }, {
        key: 'isSelfClosing',
        value: function isSelfClosing(el) {
            return el.getAttribute('data-close') === 'self';
        }
    }, {
        key: 'onStartHandler',
        value: function onStartHandler(e) {
            if (this.needsActivation(e.target)) {
                this.setTopPositions();
                this.setNotification(e.target);
            }
        }
    }, {
        key: 'allNotifications',
        value: function allNotifications() {
            return Array.prototype.slice.call(document.querySelectorAll(this.selector));
        }
    }, {
        key: 'setTopPositions',
        value: function setTopPositions() {
            var _this4 = this;

            var startHeight = this.options.gap;
            this.allNotifications().forEach(function (el) {
                el.style.top = startHeight + 'px';
                startHeight += el.offsetHeight + _this4.options.gap;
                if (_this4.needsResume(el)) {
                    _this4.addExitAnimation(el);
                }
            });
        }
    }, {
        key: 'inView',
        value: function inView(el) {
            return parseInt(getComputedStyle(el)['top']) < window.innerHeight;
        }
    }, {
        key: 'isPaused',
        value: function isPaused(el) {
            return el.getAttribute('data-paused') === 'true';
        }
    }, {
        key: 'needsResume',
        value: function needsResume(el) {
            return this.isPaused(el) && this.inView(el);
        }
    }, {
        key: 'isNotification',
        value: function isNotification(el) {
            return this.allNotifications().indexOf(el) > -1;
        }
    }, {
        key: 'needsActivation',
        value: function needsActivation(el) {
            return el.getAttribute('data-notification') !== 'active' && this.isNotification(el);
        }
    }, {
        key: 'setNotification',
        value: function setNotification(el) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (delay) {
                el.style.animationDelay = delay;
            }
            this.setListeners(el);
            el.setAttribute('data-notification', 'active');
            el.style.transition = this.options.topTransition;
        }
    }, {
        key: 'setListeners',
        value: function setListeners(el) {
            var _this5 = this;

            el.addEventListener('animationend', function (e) {
                _this5.removeMe(e);
            });
            var willClose = el.querySelector(this.options.closeButtonSelector);
            if (this.options.closeSelfOnClick && this.isSelfClosing(el)) {
                willClose = willClose || el;
            }
            if (willClose) {
                willClose.addEventListener('click', function (e) {
                    _this5.close(e);
                });
            }
        }
    }, {
        key: 'close',
        value: function close(e) {
            var el = this.isNotification(e.currentTarget) ? e.currentTarget : e.currentTarget.parentNode;
            el.style.animation = this.options.animationOutClose;
        }
    }, {
        key: 'removeMe',
        value: function removeMe(e) {
            var el = e.currentTarget;
            if (this.options.animationInName === e.animationName && this.isSelfClosing(el)) {
                this.addExitAnimation(el);
            } else if (this.options.animationOutClose.split(' ').indexOf(e.animationName) > -1 || this.options.animationOutSelf.split(' ').indexOf(e.animationName) > -1) {
                el.parentNode.removeChild(el);
                this.setTopPositions();
            }
        }
    }, {
        key: 'addExitAnimation',
        value: function addExitAnimation(el) {
            if (this.inView(el)) {
                el.setAttribute('data-paused', false);
                var delay = this.options.delayFunction(this.allNotifications().indexOf(el), el);
                el.style.animation = this.options.animationOutSelf;
                el.style.animationDelay = delay + 's';
            } else {
                el.setAttribute('data-paused', true);
            }
        }
    }]);

    return Notifications;
}();

/***/ })
/******/ ])["default"];
});