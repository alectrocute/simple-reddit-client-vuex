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
    limit: 80,
    type: "top",
    defaultSub: "pics",
    target: {}
  },
  mutations: {
    SET_LISTING: function SET_LISTING(state, listing) {
      state.listing = listing;
    },
    SET_LOADING: function SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_TARGET: function SET_TARGET(state, target) {
      state.target = {};
      state.target = target;
    }
  },
  actions: {
    getListing: function getListing(state, l) {
      var actualPath, res;
      return regeneratorRuntime.async(function getListing$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state.commit("SET_LOADING", true);
              actualPath = "https://www.reddit.com/r/".concat(l, "/").concat(state.state.type, ".json?limit=").concat(state.state.limit);
              _context.next = 4;
              return regeneratorRuntime.awrap(_axios["default"].get(actualPath));

            case 4:
              res = _context.sent;
              state.commit("SET_LISTING", res.data.data);
              state.commit("SET_LOADING", false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  modules: {}
});

exports["default"] = _default;