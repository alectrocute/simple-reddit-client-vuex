"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    listing: {},
    loading: false,
    limit: 100,
    type: "hot",
    defaultSub: "pics",
    favoriteSubs: ["pics", "EarthPorn", "wallpapers", "HighQualityGifs"],
    target: {},
    targetId: 0
  },
  mutations: {
    SET_LISTING: function SET_LISTING(state, listing) {
      state.listing = listing;
    },
    SET_LOADING: function SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_TARGET: function SET_TARGET(state, p) {
      state.target = {};
      state.target = p;
    },
    SET_TYPE: function SET_TYPE(state, t) {
      state.type = t;
    },
    SET_TARGET_ID: function SET_TARGET_ID(state, id) {
      state.targetId = id;
    },
    ADD_FAVORITE: function ADD_FAVORITE(state, f) {
      state.favoriteSubs.unshift(f);
    }
  },
  actions: {
    bumpTargetIndex: function bumpTargetIndex(state) {
      var factor,
          obj,
          _args = arguments;
      return regeneratorRuntime.async(function bumpTargetIndex$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              factor = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
              _context.prev = 1;
              obj = state.state.listing.children[state.state.targetId + factor].data;
              state.commit("SET_TARGET", obj);
              state.commit("SET_TARGET_ID", state.state.targetId + factor);
              return _context.abrupt("return", true);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              state.commit("SET_TARGET", {});
              state.commit("SET_TARGET_ID", 0);
              return _context.abrupt("return", false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 8]]);
    },
    getListing: function getListing(state, l) {
      var actualPath, res;
      return regeneratorRuntime.async(function getListing$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state.commit("SET_LOADING", true);
              if (state.state.favoriteSubs.indexOf(l) === -1) state.commit("ADD_FAVORITE", l);
              actualPath = "https://www.reddit.com/r/".concat(l, "/").concat(state.state.type, ".json?limit=").concat(state.state.limit);
              _context2.next = 5;
              return regeneratorRuntime.awrap(_axios["default"].get(actualPath));

            case 5:
              res = _context2.sent;
              state.commit("SET_LISTING", res.data.data);
              state.commit("SET_LOADING", false);
              return _context2.abrupt("return", true);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  modules: {}
});

exports["default"] = _default;