var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function noop() {
}
function assign$2(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign$2($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && root.host) {
    return root;
  }
  return node.ownerDocument;
}
function append_stylesheet(node, style) {
  append(node.head || node, style);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1;
}
function select_value(select) {
  const selected_option = select.querySelector(":checked") || select.options[0];
  return selected_option && selected_option.__value;
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var utcToZonedTime$1 = { exports: {} };
var tzParseTimezone = { exports: {} };
var tzTokenizeDate = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tzTokenizeDate2;
  function tzTokenizeDate2(date2, timeZone) {
    var dtf = getDateTimeFormat(timeZone);
    return dtf.formatToParts ? partsOffset(dtf, date2) : hackyOffset(dtf, date2);
  }
  var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
  };
  function partsOffset(dtf, date2) {
    try {
      var formatted = dtf.formatToParts(date2);
      var filled = [];
      for (var i = 0; i < formatted.length; i++) {
        var pos = typeToPos[formatted[i].type];
        if (pos >= 0) {
          filled[pos] = parseInt(formatted[i].value, 10);
        }
      }
      return filled;
    } catch (error) {
      if (error instanceof RangeError) {
        return [NaN];
      }
      throw error;
    }
  }
  function hackyOffset(dtf, date2) {
    var formatted = dtf.format(date2).replace(/\u200E/g, "");
    var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
    return [parsed[3], parsed[1], parsed[2], parsed[4], parsed[5], parsed[6]];
  }
  var dtfCache = {};
  function getDateTimeFormat(timeZone) {
    if (!dtfCache[timeZone]) {
      var testDateFormatted = new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date("2014-06-25T04:00:00.123Z"));
      var hourCycleSupported = testDateFormatted === "06/25/2014, 00:00:00" || testDateFormatted === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
      dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }) : new Intl.DateTimeFormat("en-US", {
        hourCycle: "h23",
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
    return dtfCache[timeZone];
  }
  module.exports = exports.default;
})(tzTokenizeDate, tzTokenizeDate.exports);
var newDateUTC = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = newDateUTC2;
  function newDateUTC2(fullYear, month, day, hour, minute, second, millisecond) {
    var utcDate = new Date(0);
    utcDate.setUTCFullYear(fullYear, month, day);
    utcDate.setUTCHours(hour, minute, second, millisecond);
    return utcDate;
  }
  module.exports = exports.default;
})(newDateUTC, newDateUTC.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tzParseTimezone2;
  var _index = _interopRequireDefault(tzTokenizeDate.exports);
  var _index2 = _interopRequireDefault(newDateUTC.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_HOUR2 = 36e5;
  var MILLISECONDS_IN_MINUTE2 = 6e4;
  var patterns = {
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-]\d{2})$/,
    timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
  };
  function tzParseTimezone2(timezoneString, date2, isUtcDate) {
    var token;
    var absoluteOffset;
    if (timezoneString === "") {
      return 0;
    }
    token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
      return 0;
    }
    var hours;
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      if (!validateTimezone(hours)) {
        return NaN;
      }
      return -(hours * MILLISECONDS_IN_HOUR2);
    }
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      var minutes = parseInt(token[2], 10);
      if (!validateTimezone(hours, minutes)) {
        return NaN;
      }
      absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR2 + minutes * MILLISECONDS_IN_MINUTE2;
      return hours > 0 ? -absoluteOffset : absoluteOffset;
    }
    if (isValidTimezoneIANAString(timezoneString)) {
      date2 = new Date(date2 || Date.now());
      var utcDate = isUtcDate ? date2 : toUtcDate(date2);
      var offset = calcOffset(utcDate, timezoneString);
      var fixedOffset = isUtcDate ? offset : fixOffset(date2, offset, timezoneString);
      return -fixedOffset;
    }
    return NaN;
  }
  function toUtcDate(date2) {
    return (0, _index2.default)(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds());
  }
  function calcOffset(date2, timezoneString) {
    var tokens = (0, _index.default)(date2, timezoneString);
    var asUTC = (0, _index2.default)(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
    var asTS = date2.getTime();
    var over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return asUTC - asTS;
  }
  function fixOffset(date2, offset, timezoneString) {
    var localTS = date2.getTime();
    var utcGuess = localTS - offset;
    var o2 = calcOffset(new Date(utcGuess), timezoneString);
    if (offset === o2) {
      return offset;
    }
    utcGuess -= o2 - offset;
    var o3 = calcOffset(new Date(utcGuess), timezoneString);
    if (o2 === o3) {
      return o2;
    }
    return Math.max(o2, o3);
  }
  function validateTimezone(hours, minutes) {
    return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
  }
  var validIANATimezoneCache = {};
  function isValidTimezoneIANAString(timeZoneString) {
    if (validIANATimezoneCache[timeZoneString])
      return true;
    try {
      new Intl.DateTimeFormat(void 0, {
        timeZone: timeZoneString
      });
      validIANATimezoneCache[timeZoneString] = true;
      return true;
    } catch (error) {
      return false;
    }
  }
  module.exports = exports.default;
})(tzParseTimezone, tzParseTimezone.exports);
var toDate$2 = { exports: {} };
var toInteger$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toInteger2;
  function toInteger2(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  module.exports = exports.default;
})(toInteger$1, toInteger$1.exports);
var getTimezoneOffsetInMilliseconds$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getTimezoneOffsetInMilliseconds2;
  function getTimezoneOffsetInMilliseconds2(date2) {
    var utcDate = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds()));
    utcDate.setUTCFullYear(date2.getFullYear());
    return date2.getTime() - utcDate.getTime();
  }
  module.exports = exports.default;
})(getTimezoneOffsetInMilliseconds$1, getTimezoneOffsetInMilliseconds$1.exports);
var tzPattern = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var tzPattern2 = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
  var _default = tzPattern2;
  exports.default = _default;
  module.exports = exports.default;
})(tzPattern, tzPattern.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate2;
  var _index = _interopRequireDefault(toInteger$1.exports);
  var _index2 = _interopRequireDefault(getTimezoneOffsetInMilliseconds$1.exports);
  var _index3 = _interopRequireDefault(tzParseTimezone.exports);
  var _index4 = _interopRequireDefault(tzPattern.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_HOUR2 = 36e5;
  var MILLISECONDS_IN_MINUTE2 = 6e4;
  var DEFAULT_ADDITIONAL_DIGITS = 2;
  var patterns = {
    dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
    datePattern: /^([0-9W+-]+)(.*)/,
    plainTime: /:/,
    YY: /^(\d{2})$/,
    YYY: [
      /^([+-]\d{2})$/,
      /^([+-]\d{3})$/,
      /^([+-]\d{4})$/
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
      /^([+-]\d{4})/,
      /^([+-]\d{5})/,
      /^([+-]\d{6})/
    ],
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,
    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
    timeZone: _index4.default
  };
  function toDate2(argument, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    if (argument === null) {
      return new Date(NaN);
    }
    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0, _index.default)(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    }
    if (argument instanceof Date || typeof argument === "object" && Object.prototype.toString.call(argument) === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || Object.prototype.toString.call(argument) === "[object Number]") {
      return new Date(argument);
    } else if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
      return new Date(NaN);
    }
    var dateStrings = splitDateString(argument);
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;
    var date2 = parseDate2(restDateString, year);
    if (isNaN(date2)) {
      return new Date(NaN);
    }
    if (date2) {
      var timestamp = date2.getTime();
      var time = 0;
      var offset;
      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
        if (isNaN(time)) {
          return new Date(NaN);
        }
      }
      if (dateStrings.timeZone || options.timeZone) {
        offset = (0, _index3.default)(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
        if (isNaN(offset)) {
          return new Date(NaN);
        }
      } else {
        offset = (0, _index2.default)(new Date(timestamp + time));
        offset = (0, _index2.default)(new Date(timestamp + time + offset));
      }
      return new Date(timestamp + time + offset);
    } else {
      return new Date(NaN);
    }
  }
  function splitDateString(dateString) {
    var dateStrings = {};
    var parts = patterns.dateTimePattern.exec(dateString);
    var timeString;
    if (!parts) {
      parts = patterns.datePattern.exec(dateString);
      if (parts) {
        dateStrings.date = parts[1];
        timeString = parts[2];
      } else {
        dateStrings.date = null;
        timeString = dateString;
      }
    } else {
      dateStrings.date = parts[1];
      timeString = parts[3];
    }
    if (timeString) {
      var token = patterns.timeZone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], "");
        dateStrings.timeZone = token[1].trim();
      } else {
        dateStrings.time = timeString;
      }
    }
    return dateStrings;
  }
  function parseYear(dateString, additionalDigits) {
    var patternYYY = patterns.YYY[additionalDigits];
    var patternYYYYY = patterns.YYYYY[additionalDigits];
    var token;
    token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
    if (token) {
      var yearString = token[1];
      return {
        year: parseInt(yearString, 10),
        restDateString: dateString.slice(yearString.length)
      };
    }
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
    if (token) {
      var centuryString = token[1];
      return {
        year: parseInt(centuryString, 10) * 100,
        restDateString: dateString.slice(centuryString.length)
      };
    }
    return {
      year: null
    };
  }
  function parseDate2(dateString, year) {
    if (year === null) {
      return null;
    }
    var token;
    var date2;
    var month;
    var week;
    if (dateString.length === 0) {
      date2 = new Date(0);
      date2.setUTCFullYear(year);
      return date2;
    }
    token = patterns.MM.exec(dateString);
    if (token) {
      date2 = new Date(0);
      month = parseInt(token[1], 10) - 1;
      if (!validateDate(year, month)) {
        return new Date(NaN);
      }
      date2.setUTCFullYear(year, month);
      return date2;
    }
    token = patterns.DDD.exec(dateString);
    if (token) {
      date2 = new Date(0);
      var dayOfYear = parseInt(token[1], 10);
      if (!validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN);
      }
      date2.setUTCFullYear(year, 0, dayOfYear);
      return date2;
    }
    token = patterns.MMDD.exec(dateString);
    if (token) {
      date2 = new Date(0);
      month = parseInt(token[1], 10) - 1;
      var day = parseInt(token[2], 10);
      if (!validateDate(year, month, day)) {
        return new Date(NaN);
      }
      date2.setUTCFullYear(year, month, day);
      return date2;
    }
    token = patterns.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      if (!validateWeekDate(year, week)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week);
    }
    token = patterns.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      var dayOfWeek = parseInt(token[2], 10) - 1;
      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week, dayOfWeek);
    }
    return null;
  }
  function parseTime(timeString) {
    var token;
    var hours;
    var minutes;
    token = patterns.HH.exec(timeString);
    if (token) {
      hours = parseFloat(token[1].replace(",", "."));
      if (!validateTime(hours)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2;
    }
    token = patterns.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(",", "."));
      if (!validateTime(hours, minutes)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2 + minutes * MILLISECONDS_IN_MINUTE2;
    }
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      var seconds = parseFloat(token[3].replace(",", "."));
      if (!validateTime(hours, minutes, seconds)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR2 + minutes * MILLISECONDS_IN_MINUTE2 + seconds * 1e3;
    }
    return null;
  }
  function dayOfISOWeekYear(isoWeekYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date2 = new Date(0);
    date2.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date2.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date2.setUTCDate(date2.getUTCDate() + diff);
    return date2;
  }
  var DAYS_IN_MONTH2 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex2(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  function validateDate(year, month, date2) {
    if (month < 0 || month > 11) {
      return false;
    }
    if (date2 != null) {
      if (date2 < 1) {
        return false;
      }
      var isLeapYear = isLeapYearIndex2(year);
      if (isLeapYear && date2 > DAYS_IN_MONTH_LEAP_YEAR2[month]) {
        return false;
      }
      if (!isLeapYear && date2 > DAYS_IN_MONTH2[month]) {
        return false;
      }
    }
    return true;
  }
  function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
      return false;
    }
    var isLeapYear = isLeapYearIndex2(year);
    if (isLeapYear && dayOfYear > 366) {
      return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
      return false;
    }
    return true;
  }
  function validateWeekDate(year, week, day) {
    if (week < 0 || week > 52) {
      return false;
    }
    if (day != null && (day < 0 || day > 6)) {
      return false;
    }
    return true;
  }
  function validateTime(hours, minutes, seconds) {
    if (hours != null && (hours < 0 || hours >= 25)) {
      return false;
    }
    if (minutes != null && (minutes < 0 || minutes >= 60)) {
      return false;
    }
    if (seconds != null && (seconds < 0 || seconds >= 60)) {
      return false;
    }
    return true;
  }
  module.exports = exports.default;
})(toDate$2, toDate$2.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = utcToZonedTime2;
  var _index = _interopRequireDefault(tzParseTimezone.exports);
  var _index2 = _interopRequireDefault(toDate$2.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function utcToZonedTime2(dirtyDate, timeZone, options) {
    var date2 = (0, _index2.default)(dirtyDate, options);
    var offsetMilliseconds = (0, _index.default)(timeZone, date2, true);
    var d = new Date(date2.getTime() - offsetMilliseconds);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
  }
  module.exports = exports.default;
})(utcToZonedTime$1, utcToZonedTime$1.exports);
var _utcToZonedTime = /* @__PURE__ */ getDefaultExportFromCjs(utcToZonedTime$1.exports);
var zonedTimeToUtc$1 = { exports: {} };
var cloneObject$1 = { exports: {} };
var assign$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assign2;
  function assign2(target, dirtyObject) {
    if (target == null) {
      throw new TypeError("assign requires that input parameter not be null or undefined");
    }
    dirtyObject = dirtyObject || {};
    for (var property in dirtyObject) {
      if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
        target[property] = dirtyObject[property];
      }
    }
    return target;
  }
  module.exports = exports.default;
})(assign$1, assign$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cloneObject2;
  var _index = _interopRequireDefault(assign$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function cloneObject2(dirtyObject) {
    return (0, _index.default)({}, dirtyObject);
  }
  module.exports = exports.default;
})(cloneObject$1, cloneObject$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = zonedTimeToUtc2;
  var _index = _interopRequireDefault(cloneObject$1.exports);
  var _index2 = _interopRequireDefault(toDate$2.exports);
  var _index3 = _interopRequireDefault(tzPattern.exports);
  var _index4 = _interopRequireDefault(tzParseTimezone.exports);
  var _index5 = _interopRequireDefault(newDateUTC.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function zonedTimeToUtc2(date2, timeZone, options) {
    if (typeof date2 === "string" && !date2.match(_index3.default)) {
      var extendedOptions = (0, _index.default)(options);
      extendedOptions.timeZone = timeZone;
      return (0, _index2.default)(date2, extendedOptions);
    }
    var d = (0, _index2.default)(date2, options);
    var utc = (0, _index5.default)(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()).getTime();
    var offsetMilliseconds = (0, _index4.default)(timeZone, new Date(utc));
    return new Date(utc + offsetMilliseconds);
  }
  module.exports = exports.default;
})(zonedTimeToUtc$1, zonedTimeToUtc$1.exports);
var _zonedTimeToUtc = /* @__PURE__ */ getDefaultExportFromCjs(zonedTimeToUtc$1.exports);
var ru$1 = { exports: {} };
var formatDistance$3 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formatDistance2;
  function declension(scheme, count) {
    if (scheme.one !== void 0 && count === 1) {
      return scheme.one;
    }
    var rem10 = count % 10;
    var rem100 = count % 100;
    if (rem10 === 1 && rem100 !== 11) {
      return scheme.singularNominative.replace("{{count}}", count);
    } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
      return scheme.singularGenitive.replace("{{count}}", count);
    } else {
      return scheme.pluralGenitive.replace("{{count}}", count);
    }
  }
  function buildLocalizeTokenFn(scheme) {
    return function(count, options) {
      if (options.addSuffix) {
        if (options.comparison > 0) {
          if (scheme.future) {
            return declension(scheme.future, count);
          } else {
            return "\u0447\u0435\u0440\u0435\u0437 " + declension(scheme.regular, count);
          }
        } else {
          if (scheme.past) {
            return declension(scheme.past, count);
          } else {
            return declension(scheme.regular, count) + " \u043D\u0430\u0437\u0430\u0434";
          }
        }
      } else {
        return declension(scheme.regular, count);
      }
    };
  }
  var formatDistanceLocale2 = {
    lessThanXSeconds: buildLocalizeTokenFn({
      regular: {
        one: "\u043C\u0435\u043D\u044C\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
        singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
        singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434",
        pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
      },
      future: {
        one: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
        singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
        singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
        pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
      }
    }),
    xSeconds: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0430",
        singularGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
        pluralGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
      },
      past: {
        singularNominative: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443 \u043D\u0430\u0437\u0430\u0434",
        singularGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u043D\u0430\u0437\u0430\u0434",
        pluralGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434 \u043D\u0430\u0437\u0430\u0434"
      },
      future: {
        singularNominative: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
        singularGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
        pluralGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
      }
    }),
    halfAMinute: function(_, options) {
      if (options.addSuffix) {
        if (options.comparison > 0) {
          return "\u0447\u0435\u0440\u0435\u0437 \u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B";
        } else {
          return "\u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B \u043D\u0430\u0437\u0430\u0434";
        }
      }
      return "\u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B";
    },
    lessThanXMinutes: buildLocalizeTokenFn({
      regular: {
        one: "\u043C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B",
        singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
        singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442",
        pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442"
      },
      future: {
        one: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443",
        singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u0443",
        singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
        pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442"
      }
    }),
    xMinutes: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u043C\u0438\u043D\u0443\u0442\u0430",
        singularGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
        pluralGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442"
      },
      past: {
        singularNominative: "{{count}} \u043C\u0438\u043D\u0443\u0442\u0443 \u043D\u0430\u0437\u0430\u0434",
        singularGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442\u044B \u043D\u0430\u0437\u0430\u0434",
        pluralGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434"
      },
      future: {
        singularNominative: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u0443",
        singularGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
        pluralGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442"
      }
    }),
    aboutXHours: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u0430",
        singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u043E\u0432",
        pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u043E\u0432"
      },
      future: {
        singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441",
        singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441\u0430",
        pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441\u043E\u0432"
      }
    }),
    xHours: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u0447\u0430\u0441",
        singularGenitive: "{{count}} \u0447\u0430\u0441\u0430",
        pluralGenitive: "{{count}} \u0447\u0430\u0441\u043E\u0432"
      }
    }),
    xDays: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u0434\u0435\u043D\u044C",
        singularGenitive: "{{count}} \u0434\u043D\u044F",
        pluralGenitive: "{{count}} \u0434\u043D\u0435\u0439"
      }
    }),
    aboutXWeeks: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
        singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u044C",
        pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
      },
      future: {
        singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u044E",
        singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
        pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
      }
    }),
    xWeeks: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044F",
        singularGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
        pluralGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
      }
    }),
    aboutXMonths: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
        singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
        pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
      },
      future: {
        singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446",
        singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
        pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
      }
    }),
    xMonths: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u043C\u0435\u0441\u044F\u0446",
        singularGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
        pluralGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
      }
    }),
    aboutXYears: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0433\u043E\u0434\u0430",
        singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043B\u0435\u0442",
        pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043B\u0435\u0442"
      },
      future: {
        singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
        singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
        pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
      }
    }),
    xYears: buildLocalizeTokenFn({
      regular: {
        singularNominative: "{{count}} \u0433\u043E\u0434",
        singularGenitive: "{{count}} \u0433\u043E\u0434\u0430",
        pluralGenitive: "{{count}} \u043B\u0435\u0442"
      }
    }),
    overXYears: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u0433\u043E\u0434\u0430",
        singularGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u043B\u0435\u0442",
        pluralGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u043B\u0435\u0442"
      },
      future: {
        singularNominative: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
        singularGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
        pluralGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
      }
    }),
    almostXYears: buildLocalizeTokenFn({
      regular: {
        singularNominative: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u0433\u043E\u0434",
        singularGenitive: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u0433\u043E\u0434\u0430",
        pluralGenitive: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u043B\u0435\u0442"
      },
      future: {
        singularNominative: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
        singularGenitive: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
        pluralGenitive: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
      }
    })
  };
  function formatDistance2(token, count, options) {
    options = options || {};
    return formatDistanceLocale2[token](count, options);
  }
  module.exports = exports.default;
})(formatDistance$3, formatDistance$3.exports);
var formatLong$2 = { exports: {} };
var buildFormatLongFn$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildFormatLongFn2;
  function buildFormatLongFn2(args) {
    return function() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format4 = args.formats[width] || args.formats[args.defaultWidth];
      return format4;
    };
  }
  module.exports = exports.default;
})(buildFormatLongFn$1, buildFormatLongFn$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildFormatLongFn$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var dateFormats2 = {
    full: "EEEE, d MMMM y '\u0433.'",
    long: "d MMMM y '\u0433.'",
    medium: "d MMM y '\u0433.'",
    short: "dd.MM.y"
  };
  var timeFormats2 = {
    full: "H:mm:ss zzzz",
    long: "H:mm:ss z",
    medium: "H:mm:ss",
    short: "H:mm"
  };
  var dateTimeFormats2 = {
    any: "{{date}}, {{time}}"
  };
  var formatLong2 = {
    date: (0, _index.default)({
      formats: dateFormats2,
      defaultWidth: "full"
    }),
    time: (0, _index.default)({
      formats: timeFormats2,
      defaultWidth: "full"
    }),
    dateTime: (0, _index.default)({
      formats: dateTimeFormats2,
      defaultWidth: "any"
    })
  };
  var _default = formatLong2;
  exports.default = _default;
  module.exports = exports.default;
})(formatLong$2, formatLong$2.exports);
var formatRelative$2 = { exports: {} };
var isSameUTCWeek = { exports: {} };
var requiredArgs$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = requiredArgs2;
  function requiredArgs2(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }
  module.exports = exports.default;
})(requiredArgs$1, requiredArgs$1.exports);
var startOfUTCWeek$1 = { exports: {} };
var toDate$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate2;
  var _index = _interopRequireDefault(requiredArgs$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function toDate2(argument) {
    (0, _index.default)(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  module.exports = exports.default;
})(toDate$1, toDate$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCWeek2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs$1.exports);
  var _index3 = _interopRequireDefault(toInteger$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function startOfUTCWeek2(dirtyDate, dirtyOptions) {
    (0, _index2.default)(1, arguments);
    var options = dirtyOptions || {};
    var locale2 = options.locale;
    var localeWeekStartsOn = locale2 && locale2.options && locale2.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index3.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index3.default)(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date2 = (0, _index.default)(dirtyDate);
    var day = date2.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date2.setUTCDate(date2.getUTCDate() - diff);
    date2.setUTCHours(0, 0, 0, 0);
    return date2;
  }
  module.exports = exports.default;
})(startOfUTCWeek$1, startOfUTCWeek$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSameUTCWeek2;
  var _index = _interopRequireDefault(requiredArgs$1.exports);
  var _index2 = _interopRequireDefault(startOfUTCWeek$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function isSameUTCWeek2(dirtyDateLeft, dirtyDateRight, options) {
    (0, _index.default)(2, arguments);
    var dateLeftStartOfWeek = (0, _index2.default)(dirtyDateLeft, options);
    var dateRightStartOfWeek = (0, _index2.default)(dirtyDateRight, options);
    return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
  }
  module.exports = exports.default;
})(isSameUTCWeek, isSameUTCWeek.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formatRelative2;
  var _index = _interopRequireDefault(isSameUTCWeek.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var accusativeWeekdays = ["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0443", "\u0447\u0435\u0442\u0432\u0435\u0440\u0433", "\u043F\u044F\u0442\u043D\u0438\u0446\u0443", "\u0441\u0443\u0431\u0431\u043E\u0442\u0443"];
  function lastWeek(day) {
    var weekday = accusativeWeekdays[day];
    switch (day) {
      case 0:
        return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u043E\u0435 " + weekday + " \u0432' p";
      case 1:
      case 2:
      case 4:
        return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 " + weekday + " \u0432' p";
      case 3:
      case 5:
      case 6:
        return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u0443\u044E " + weekday + " \u0432' p";
    }
  }
  function thisWeek(day) {
    var weekday = accusativeWeekdays[day];
    if (day === 2) {
      return "'\u0432\u043E " + weekday + " \u0432' p";
    } else {
      return "'\u0432 " + weekday + " \u0432' p";
    }
  }
  function nextWeek(day) {
    var weekday = accusativeWeekdays[day];
    switch (day) {
      case 0:
        return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 " + weekday + " \u0432' p";
      case 1:
      case 2:
      case 4:
        return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 " + weekday + " \u0432' p";
      case 3:
      case 5:
      case 6:
        return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E " + weekday + " \u0432' p";
    }
  }
  var formatRelativeLocale2 = {
    lastWeek: function(date2, baseDate, options) {
      var day = date2.getUTCDay();
      if ((0, _index.default)(date2, baseDate, options)) {
        return thisWeek(day);
      } else {
        return lastWeek(day);
      }
    },
    yesterday: "'\u0432\u0447\u0435\u0440\u0430 \u0432' p",
    today: "'\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432' p",
    tomorrow: "'\u0437\u0430\u0432\u0442\u0440\u0430 \u0432' p",
    nextWeek: function(date2, baseDate, options) {
      var day = date2.getUTCDay();
      if ((0, _index.default)(date2, baseDate, options)) {
        return thisWeek(day);
      } else {
        return nextWeek(day);
      }
    },
    other: "P"
  };
  function formatRelative2(token, date2, baseDate, options) {
    var format4 = formatRelativeLocale2[token];
    if (typeof format4 === "function") {
      return format4(date2, baseDate, options);
    }
    return format4;
  }
  module.exports = exports.default;
})(formatRelative$2, formatRelative$2.exports);
var localize$2 = { exports: {} };
var buildLocalizeFn$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildLocalizeFn2;
  function buildLocalizeFn2(args) {
    return function(dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }
  module.exports = exports.default;
})(buildLocalizeFn$1, buildLocalizeFn$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildLocalizeFn$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var eraValues2 = {
    narrow: ["\u0434\u043E \u043D.\u044D.", "\u043D.\u044D."],
    abbreviated: ["\u0434\u043E \u043D. \u044D.", "\u043D. \u044D."],
    wide: ["\u0434\u043E \u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B", "\u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B"]
  };
  var quarterValues2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["1-\u0439 \u043A\u0432.", "2-\u0439 \u043A\u0432.", "3-\u0439 \u043A\u0432.", "4-\u0439 \u043A\u0432."],
    wide: ["1-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "2-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "3-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "4-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B"]
  };
  var monthValues2 = {
    narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
    abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440.", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
    wide: ["\u044F\u043D\u0432\u0430\u0440\u044C", "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0435\u043B\u044C", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", "\u043D\u043E\u044F\u0431\u0440\u044C", "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"]
  };
  var formattingMonthValues = {
    narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
    abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440.", "\u0430\u043F\u0440.", "\u043C\u0430\u044F", "\u0438\u044E\u043D.", "\u0438\u044E\u043B.", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
    wide: ["\u044F\u043D\u0432\u0430\u0440\u044F", "\u0444\u0435\u0432\u0440\u0430\u043B\u044F", "\u043C\u0430\u0440\u0442\u0430", "\u0430\u043F\u0440\u0435\u043B\u044F", "\u043C\u0430\u044F", "\u0438\u044E\u043D\u044F", "\u0438\u044E\u043B\u044F", "\u0430\u0432\u0433\u0443\u0441\u0442\u0430", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u043E\u043A\u0442\u044F\u0431\u0440\u044F", "\u043D\u043E\u044F\u0431\u0440\u044F", "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"]
  };
  var dayValues2 = {
    narrow: ["\u0412", "\u041F", "\u0412", "\u0421", "\u0427", "\u041F", "\u0421"],
    short: ["\u0432\u0441", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"],
    abbreviated: ["\u0432\u0441\u043A", "\u043F\u043D\u0434", "\u0432\u0442\u0440", "\u0441\u0440\u0434", "\u0447\u0442\u0432", "\u043F\u0442\u043D", "\u0441\u0443\u0431"],
    wide: ["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0435\u0440\u0433", "\u043F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0441\u0443\u0431\u0431\u043E\u0442\u0430"]
  };
  var dayPeriodValues2 = {
    narrow: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D.",
      noon: "\u043F\u043E\u043B\u0434.",
      morning: "\u0443\u0442\u0440\u043E",
      afternoon: "\u0434\u0435\u043D\u044C",
      evening: "\u0432\u0435\u0447.",
      night: "\u043D\u043E\u0447\u044C"
    },
    abbreviated: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D.",
      noon: "\u043F\u043E\u043B\u0434.",
      morning: "\u0443\u0442\u0440\u043E",
      afternoon: "\u0434\u0435\u043D\u044C",
      evening: "\u0432\u0435\u0447.",
      night: "\u043D\u043E\u0447\u044C"
    },
    wide: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D\u043E\u0447\u044C",
      noon: "\u043F\u043E\u043B\u0434\u0435\u043D\u044C",
      morning: "\u0443\u0442\u0440\u043E",
      afternoon: "\u0434\u0435\u043D\u044C",
      evening: "\u0432\u0435\u0447\u0435\u0440",
      night: "\u043D\u043E\u0447\u044C"
    }
  };
  var formattingDayPeriodValues2 = {
    narrow: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D.",
      noon: "\u043F\u043E\u043B\u0434.",
      morning: "\u0443\u0442\u0440\u0430",
      afternoon: "\u0434\u043D\u044F",
      evening: "\u0432\u0435\u0447.",
      night: "\u043D\u043E\u0447\u0438"
    },
    abbreviated: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D.",
      noon: "\u043F\u043E\u043B\u0434.",
      morning: "\u0443\u0442\u0440\u0430",
      afternoon: "\u0434\u043D\u044F",
      evening: "\u0432\u0435\u0447.",
      night: "\u043D\u043E\u0447\u0438"
    },
    wide: {
      am: "\u0414\u041F",
      pm: "\u041F\u041F",
      midnight: "\u043F\u043E\u043B\u043D\u043E\u0447\u044C",
      noon: "\u043F\u043E\u043B\u0434\u0435\u043D\u044C",
      morning: "\u0443\u0442\u0440\u0430",
      afternoon: "\u0434\u043D\u044F",
      evening: "\u0432\u0435\u0447\u0435\u0440\u0430",
      night: "\u043D\u043E\u0447\u0438"
    }
  };
  function ordinalNumber2(dirtyNumber, dirtyOptions) {
    var options = dirtyOptions || {};
    var unit = String(options.unit);
    var suffix;
    if (unit === "date") {
      suffix = "-\u0435";
    } else if (unit === "week" || unit === "minute" || unit === "second") {
      suffix = "-\u044F";
    } else {
      suffix = "-\u0439";
    }
    return dirtyNumber + suffix;
  }
  var localize2 = {
    ordinalNumber: ordinalNumber2,
    era: (0, _index.default)({
      values: eraValues2,
      defaultWidth: "wide"
    }),
    quarter: (0, _index.default)({
      values: quarterValues2,
      defaultWidth: "wide",
      argumentCallback: function(quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: (0, _index.default)({
      values: monthValues2,
      defaultWidth: "wide",
      formattingValues: formattingMonthValues,
      defaultFormattingWidth: "wide"
    }),
    day: (0, _index.default)({
      values: dayValues2,
      defaultWidth: "wide"
    }),
    dayPeriod: (0, _index.default)({
      values: dayPeriodValues2,
      defaultWidth: "any",
      formattingValues: formattingDayPeriodValues2,
      defaultFormattingWidth: "wide"
    })
  };
  var _default = localize2;
  exports.default = _default;
  module.exports = exports.default;
})(localize$2, localize$2.exports);
var match$2 = { exports: {} };
var buildMatchPatternFn$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchPatternFn2;
  function buildMatchPatternFn2(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  module.exports = exports.default;
})(buildMatchPatternFn$1, buildMatchPatternFn$1.exports);
var buildMatchFn$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchFn2;
  function buildMatchFn2(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex2(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      }) : findKey2(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function findKey2(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex2(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  module.exports = exports.default;
})(buildMatchFn$1, buildMatchFn$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildMatchPatternFn$1.exports);
  var _index2 = _interopRequireDefault(buildMatchFn$1.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var matchOrdinalNumberPattern2 = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i;
  var parseOrdinalNumberPattern2 = /\d+/i;
  var matchEraPatterns2 = {
    narrow: /^((до )?н\.?\s?э\.?)/i,
    abbreviated: /^((до )?н\.?\s?э\.?)/i,
    wide: /^(до нашей эры|нашей эры|наша эра)/i
  };
  var parseEraPatterns2 = {
    any: [/^д/i, /^н/i]
  };
  var matchQuarterPatterns2 = {
    narrow: /^[1234]/i,
    abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
    wide: /^[1234](-?[ыои]?й?)? квартал/i
  };
  var parseQuarterPatterns2 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns2 = {
    narrow: /^[яфмаисонд]/i,
    abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
    wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
  };
  var parseMonthPatterns2 = {
    narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^я/i],
    any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
  };
  var matchDayPatterns2 = {
    narrow: /^[впсч]/i,
    short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
    abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
    wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
  };
  var parseDayPatterns2 = {
    narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
    any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
  };
  var matchDayPeriodPatterns2 = {
    narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
    abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
    wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
  };
  var parseDayPeriodPatterns2 = {
    any: {
      am: /^дп/i,
      pm: /^пп/i,
      midnight: /^полн/i,
      noon: /^полд/i,
      morning: /^у/i,
      afternoon: /^д[ен]/i,
      evening: /^в/i,
      night: /^н/i
    }
  };
  var match2 = {
    ordinalNumber: (0, _index.default)({
      matchPattern: matchOrdinalNumberPattern2,
      parsePattern: parseOrdinalNumberPattern2,
      valueCallback: function(value) {
        return parseInt(value, 10);
      }
    }),
    era: (0, _index2.default)({
      matchPatterns: matchEraPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns2,
      defaultParseWidth: "any"
    }),
    quarter: (0, _index2.default)({
      matchPatterns: matchQuarterPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns2,
      defaultParseWidth: "any",
      valueCallback: function(index) {
        return index + 1;
      }
    }),
    month: (0, _index2.default)({
      matchPatterns: matchMonthPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns2,
      defaultParseWidth: "any"
    }),
    day: (0, _index2.default)({
      matchPatterns: matchDayPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns2,
      defaultParseWidth: "any"
    }),
    dayPeriod: (0, _index2.default)({
      matchPatterns: matchDayPeriodPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPeriodPatterns2,
      defaultParseWidth: "any"
    })
  };
  var _default = match2;
  exports.default = _default;
  module.exports = exports.default;
})(match$2, match$2.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(formatDistance$3.exports);
  var _index2 = _interopRequireDefault(formatLong$2.exports);
  var _index3 = _interopRequireDefault(formatRelative$2.exports);
  var _index4 = _interopRequireDefault(localize$2.exports);
  var _index5 = _interopRequireDefault(match$2.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var locale2 = {
    code: "ru",
    formatDistance: _index.default,
    formatLong: _index2.default,
    formatRelative: _index3.default,
    localize: _index4.default,
    match: _index5.default,
    options: {
      weekStartsOn: 1,
      firstWeekContainsDate: 1
    }
  };
  var _default = locale2;
  exports.default = _default;
  module.exports = exports.default;
})(ru$1, ru$1.exports);
var ru = /* @__PURE__ */ getDefaultExportFromCjs(ru$1.exports);
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date2;
  }
  date2.setDate(date2.getDate() + amount);
  return date2;
}
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date2;
  }
  var dayOfMonth = date2.getDate();
  var endOfDesiredMonth = new Date(date2.getTime());
  endOfDesiredMonth.setMonth(date2.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date2.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date2;
  }
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
var MILLISECONDS_IN_HOUR$1 = 36e5;
function addHours(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR$1);
}
function getTimezoneOffsetInMilliseconds(date2) {
  var utcDate = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds(), date2.getMilliseconds()));
  utcDate.setUTCFullYear(date2.getFullYear());
  return date2.getTime() - utcDate.getTime();
}
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  date2.setHours(0, 0, 0, 0);
  return date2;
}
var MILLISECONDS_IN_MINUTE$1 = 6e4;
function addMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE$1);
}
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date2 = toDate(dirtyDate);
  return !isNaN(Number(date2));
}
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
function differenceInMilliseconds(dateLeft, dateRight) {
  requiredArgs(2, arguments);
  return toDate(dateLeft).getTime() - toDate(dateRight).getTime();
}
var roundingMap = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function(value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  }
};
var defaultRoundingMethod = "trunc";
function getRoundingMethod(method) {
  return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
}
function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  date2.setHours(23, 59, 59, 999);
  return date2;
}
function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var month = date2.getMonth();
  date2.setFullYear(date2.getFullYear(), month + 1, 0);
  date2.setHours(23, 59, 59, 999);
  return date2;
}
function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  return endOfDay(date2).getTime() === endOfMonth(date2).getTime();
}
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result;
  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      dateLeft.setDate(30);
    }
    dateLeft.setMonth(dateLeft.getMonth() - sign * difference);
    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign;
    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
}
function differenceInSeconds(dateLeft, dateRight, options) {
  requiredArgs(2, arguments);
  var diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
  return getRoundingMethod(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
var formatDistanceLocale$1 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance$1 = function(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$1[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance$2 = formatDistance$1;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format4 = args.formats[width] || args.formats[args.defaultWidth];
    return format4;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative$1 = formatRelative;
function buildLocalizeFn(args) {
  return function(dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize$1 = localize;
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$2,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var defaultLocale = locale;
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var timestamp = date2.getTime();
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date2.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date2 = toDate(dirtyDate);
  var day = date2.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date2.setUTCDate(date2.getUTCDate() - diff);
  date2.setUTCHours(0, 0, 0, 0);
  return date2;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var year = date2.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date2.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date2.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date2 = startOfUTCISOWeek(fourthOfJanuary);
  return date2;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date2).getTime() - startOfUTCISOWeekYear(date2).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
function startOfUTCWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale2 = options.locale;
  var localeWeekStartsOn = locale2 && locale2.options && locale2.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date2 = toDate(dirtyDate);
  var day = date2.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date2.setUTCDate(date2.getUTCDate() - diff);
  date2.setUTCHours(0, 0, 0, 0);
  return date2;
}
function getUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var year = date2.getUTCFullYear();
  var options = dirtyOptions || {};
  var locale2 = options.locale;
  var localeFirstWeekContainsDate = locale2 && locale2.options && locale2.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);
  if (date2.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date2.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale2 = options.locale;
  var localeFirstWeekContainsDate = locale2 && locale2.options && locale2.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  var year = getUTCWeekYear(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date2 = startOfUTCWeek(firstWeek, dirtyOptions);
  return date2;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var diff = startOfUTCWeek(date2, options).getTime() - startOfUTCWeekYear(date2, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$2 = {
  y: function(date2, token) {
    var signedYear = date2.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  M: function(date2, token) {
    var month = date2.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  d: function(date2, token) {
    return addLeadingZeros(date2.getUTCDate(), token.length);
  },
  a: function(date2, token) {
    var dayPeriodEnumValue = date2.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  h: function(date2, token) {
    return addLeadingZeros(date2.getUTCHours() % 12 || 12, token.length);
  },
  H: function(date2, token) {
    return addLeadingZeros(date2.getUTCHours(), token.length);
  },
  m: function(date2, token) {
    return addLeadingZeros(date2.getUTCMinutes(), token.length);
  },
  s: function(date2, token) {
    return addLeadingZeros(date2.getUTCSeconds(), token.length);
  },
  S: function(date2, token) {
    var numberOfDigits = token.length;
    var milliseconds = date2.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var formatters$3 = formatters$2;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  G: function(date2, token, localize2) {
    var era = date2.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  y: function(date2, token, localize2) {
    if (token === "yo") {
      var signedYear = date2.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$3.y(date2, token);
  },
  Y: function(date2, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date2, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  R: function(date2, token) {
    var isoWeekYear = getUTCISOWeekYear(date2);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  u: function(date2, token) {
    var year = date2.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  Q: function(date2, token, localize2) {
    var quarter = Math.ceil((date2.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function(date2, token, localize2) {
    var quarter = Math.ceil((date2.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function(date2, token, localize2) {
    var month = date2.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$3.M(date2, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function(date2, token, localize2) {
    var month = date2.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function(date2, token, localize2, options) {
    var week = getUTCWeek(date2, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  I: function(date2, token, localize2) {
    var isoWeek = getUTCISOWeek(date2);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  d: function(date2, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date2.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$3.d(date2, token);
  },
  D: function(date2, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date2);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  E: function(date2, token, localize2) {
    var dayOfWeek = date2.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function(date2, token, localize2, options) {
    var dayOfWeek = date2.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function(date2, token, localize2, options) {
    var dayOfWeek = date2.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function(date2, token, localize2) {
    var dayOfWeek = date2.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function(date2, token, localize2) {
    var hours = date2.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function(date2, token, localize2) {
    var hours = date2.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function(date2, token, localize2) {
    var hours = date2.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function(date2, token, localize2) {
    if (token === "ho") {
      var hours = date2.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$3.h(date2, token);
  },
  H: function(date2, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date2.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$3.H(date2, token);
  },
  K: function(date2, token, localize2) {
    var hours = date2.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  k: function(date2, token, localize2) {
    var hours = date2.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  m: function(date2, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date2.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$3.m(date2, token);
  },
  s: function(date2, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date2.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$3.s(date2, token);
  },
  S: function(date2, token) {
    return formatters$3.S(date2, token);
  },
  X: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  x: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  O: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  z: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  t: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  T: function(date2, token, _localize, options) {
    var originalDate = options._originalDate || date2;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters$1 = formatters;
function dateLongFormatter(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
}
function timeLongFormatter(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
}
function dateTimeLongFormatter(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
}
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters$1 = longFormatters;
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format4, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format4, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format4, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format4, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format4, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}
var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp$1 = /^'([^]*?)'?$/;
var doubleQuoteRegExp$1 = /''/g;
var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var locale2 = options.locale || defaultLocale;
  var localeFirstWeekContainsDate = locale2.options && locale2.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var localeWeekStartsOn = locale2.options && locale2.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp$1).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale2.formatLong, formatterOptions);
    }
    return substring;
  }).join("").match(formattingTokensRegExp$1).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString$1(substring);
    }
    var formatter = formatters$1[firstCharacter];
    if (formatter) {
      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }
      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString$1(input) {
  return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
}
function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  dirtyObject = dirtyObject || {};
  for (var property in dirtyObject) {
    if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
      target[property] = dirtyObject[property];
    }
  }
  return target;
}
function cloneObject(dirtyObject) {
  return assign({}, dirtyObject);
}
var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
function formatDistance(dirtyDate, dirtyBaseDate) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  requiredArgs(2, arguments);
  var locale2 = options.locale || defaultLocale;
  if (!locale2.formatDistance) {
    throw new RangeError("locale must contain formatDistance property");
  }
  var comparison = compareAsc(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  var localizeOptions = cloneObject(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months;
  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return locale2.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale2.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale2.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale2.formatDistance("halfAMinute", null, localizeOptions);
      } else if (seconds < 60) {
        return locale2.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale2.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale2.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale2.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale2.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale2.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale2.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale2.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale2.formatDistance("xDays", days, localizeOptions);
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale2.formatDistance("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale2.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale2.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale2.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale2.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}
var defaultFormat = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"];
function formatDuration(duration) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }
  var format4 = (options === null || options === void 0 ? void 0 : options.format) || defaultFormat;
  var locale2 = (options === null || options === void 0 ? void 0 : options.locale) || defaultLocale;
  var zero = (options === null || options === void 0 ? void 0 : options.zero) || false;
  var delimiter = (options === null || options === void 0 ? void 0 : options.delimiter) || " ";
  var result = format4.reduce(function(acc, unit) {
    var token = "x".concat(unit.replace(/(^.)/, function(m) {
      return m.toUpperCase();
    }));
    var addChunk = typeof duration[unit] === "number" && (zero || duration[unit]);
    return addChunk && locale2.formatDistance ? acc.concat(locale2.formatDistance(token, duration[unit])) : acc;
  }, []).join(delimiter);
  return result;
}
function getDate(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var dayOfMonth = date2.getDate();
  return dayOfMonth;
}
function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var hours = date2.getHours();
  return hours;
}
function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var minutes = date2.getMinutes();
  return minutes;
}
function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date2 = toDate(dirtyDate);
  var month = date2.getMonth();
  return month;
}
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}
function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
  requiredArgs(2, arguments);
  var options = dirtyOptions || {};
  var locale2 = options.locale;
  var localeWeekStartsOn = locale2 && locale2.options && locale2.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date2 = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date2.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date2.setUTCDate(date2.getUTCDate() + diff);
  return date2;
}
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date2 = toDate(dirtyDate);
  var currentDay = date2.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date2.setUTCDate(date2.getUTCDate() + diff);
  return date2;
}
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date2) - isoWeek;
  date2.setUTCDate(date2.getUTCDate() - diff * 7);
  return date2;
}
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date2, options) - week;
  date2.setUTCDate(date2.getUTCDate() - diff * 7);
  return date2;
}
var MILLISECONDS_IN_HOUR = 36e5;
var MILLISECONDS_IN_MINUTE = 6e4;
var MILLISECONDS_IN_SECOND = 1e3;
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  date: /^(3[0-1]|[0-2]?\d)/,
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  week: /^(5[0-3]|[0-4]?\d)/,
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  hour11h: /^(1[0-1]|0?\d)/,
  hour12h: /^(1[0-2]|0?\d)/,
  minute: /^[0-5]?\d/,
  second: /^[0-5]?\d/,
  singleDigit: /^\d/,
  twoDigits: /^\d{1,2}/,
  threeDigits: /^\d{1,3}/,
  fourDigits: /^\d{1,4}/,
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  twoDigitsSigned: /^-?\d{1,2}/,
  threeDigitsSigned: /^-?\d{1,3}/,
  fourDigitsSigned: /^-?\d{1,4}/
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function parseNumericPattern(pattern, string, valueCallback) {
  var matchResult = string.match(pattern);
  if (!matchResult) {
    return null;
  }
  var value = parseInt(matchResult[0], 10);
  return {
    value: valueCallback ? valueCallback(value) : value,
    rest: string.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, string) {
  var matchResult = string.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: string.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * MILLISECONDS_IN_SECOND),
    rest: string.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(string, valueCallback) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
}
function parseNDigits(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), string, valueCallback);
  }
}
function parseNDigitsSigned(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), string, valueCallback);
  }
}
function dayPeriodEnumToHours(enumValue) {
  switch (enumValue) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
var parsers = {
  G: {
    priority: 140,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(string, {
            width: "abbreviated"
          }) || match2.era(string, {
            width: "narrow"
          });
        case "GGGGG":
          return match2.era(string, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return match2.era(string, {
            width: "wide"
          }) || match2.era(string, {
            width: "abbreviated"
          }) || match2.era(string, {
            width: "narrow"
          });
      }
    },
    set: function(date2, flags, value, _options) {
      flags.era = value;
      date2.setUTCFullYear(value, 0, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["R", "u", "t", "T"]
  },
  y: {
    priority: 130,
    parse: function(string, token, match2, _options) {
      var valueCallback = function(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return parseNDigits(4, string, valueCallback);
        case "yo":
          return match2.ordinalNumber(string, {
            unit: "year",
            valueCallback
          });
        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function(_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function(date2, flags, value, _options) {
      var currentYear = date2.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date2.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date2.setUTCHours(0, 0, 0, 0);
        return date2;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date2.setUTCFullYear(year, 0, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]
  },
  Y: {
    priority: 130,
    parse: function(string, token, match2, _options) {
      var valueCallback = function(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return parseNDigits(4, string, valueCallback);
        case "Yo":
          return match2.ordinalNumber(string, {
            unit: "year",
            valueCallback
          });
        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function(_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function(date2, flags, value, options) {
      var currentYear = getUTCWeekYear(date2, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date2.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date2.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date2, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date2.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date2.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date2, options);
    },
    incompatibleTokens: ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]
  },
  R: {
    priority: 130,
    parse: function(string, token, _match, _options) {
      if (token === "R") {
        return parseNDigitsSigned(4, string);
      }
      return parseNDigitsSigned(token.length, string);
    },
    set: function(_date, _flags, value, _options) {
      var firstWeekOfYear = new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    },
    incompatibleTokens: ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
  },
  u: {
    priority: 130,
    parse: function(string, token, _match, _options) {
      if (token === "u") {
        return parseNDigitsSigned(4, string);
      }
      return parseNDigitsSigned(token.length, string);
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCFullYear(value, 0, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]
  },
  Q: {
    priority: 120,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, string);
        case "Qo":
          return match2.ordinalNumber(string, {
            unit: "quarter"
          });
        case "QQQ":
          return match2.quarter(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(string, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(string, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(string, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMonth((value - 1) * 3, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
  },
  q: {
    priority: 120,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, string);
        case "qo":
          return match2.ordinalNumber(string, {
            unit: "quarter"
          });
        case "qqq":
          return match2.quarter(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(string, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(string, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(string, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(string, {
            width: "narrow",
            context: "standalone"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMonth((value - 1) * 3, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]
  },
  M: {
    priority: 110,
    parse: function(string, token, match2, _options) {
      var valueCallback = function(value) {
        return value - 1;
      };
      switch (token) {
        case "M":
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        case "MM":
          return parseNDigits(2, string, valueCallback);
        case "Mo":
          return match2.ordinalNumber(string, {
            unit: "month",
            valueCallback
          });
        case "MMM":
          return match2.month(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(string, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return match2.month(string, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(string, {
            width: "wide",
            context: "formatting"
          }) || match2.month(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMonth(value, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]
  },
  L: {
    priority: 110,
    parse: function(string, token, match2, _options) {
      var valueCallback = function(value) {
        return value - 1;
      };
      switch (token) {
        case "L":
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        case "LL":
          return parseNDigits(2, string, valueCallback);
        case "Lo":
          return match2.ordinalNumber(string, {
            unit: "month",
            valueCallback
          });
        case "LLL":
          return match2.month(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(string, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return match2.month(string, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(string, {
            width: "wide",
            context: "standalone"
          }) || match2.month(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(string, {
            width: "narrow",
            context: "standalone"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMonth(value, 1);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]
  },
  w: {
    priority: 100,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, string);
        case "wo":
          return match2.ordinalNumber(string, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function(date2, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date2, value, options), options);
    },
    incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]
  },
  I: {
    priority: 100,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, string);
        case "Io":
          return match2.ordinalNumber(string, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function(date2, _flags, value, options) {
      return startOfUTCISOWeek(setUTCISOWeek(date2, value, options), options);
    },
    incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]
  },
  d: {
    priority: 90,
    subPriority: 1,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, string);
        case "do":
          return match2.ordinalNumber(string, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(date2, value, _options) {
      var year = date2.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      var month = date2.getUTCMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCDate(value);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]
  },
  D: {
    priority: 90,
    subPriority: 1,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, string);
        case "Do":
          return match2.ordinalNumber(string, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(date2, value, _options) {
      var year = date2.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMonth(0, value);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]
  },
  E: {
    priority: 90,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return match2.day(string, {
            width: "wide",
            context: "formatting"
          }) || match2.day(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function(date2, _flags, value, options) {
      date2 = setUTCDay(date2, value, options);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["D", "i", "e", "c", "t", "T"]
  },
  e: {
    priority: 90,
    parse: function(string, token, match2, options) {
      var valueCallback = function(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return parseNDigits(token.length, string, valueCallback);
        case "eo":
          return match2.ordinalNumber(string, {
            unit: "day",
            valueCallback
          });
        case "eee":
          return match2.day(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return match2.day(string, {
            width: "wide",
            context: "formatting"
          }) || match2.day(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(string, {
            width: "short",
            context: "formatting"
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function(date2, _flags, value, options) {
      date2 = setUTCDay(date2, value, options);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]
  },
  c: {
    priority: 90,
    parse: function(string, token, match2, options) {
      var valueCallback = function(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return parseNDigits(token.length, string, valueCallback);
        case "co":
          return match2.ordinalNumber(string, {
            unit: "day",
            valueCallback
          });
        case "ccc":
          return match2.day(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(string, {
            width: "short",
            context: "standalone"
          }) || match2.day(string, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return match2.day(string, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(string, {
            width: "short",
            context: "standalone"
          }) || match2.day(string, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return match2.day(string, {
            width: "wide",
            context: "standalone"
          }) || match2.day(string, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(string, {
            width: "short",
            context: "standalone"
          }) || match2.day(string, {
            width: "narrow",
            context: "standalone"
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function(date2, _flags, value, options) {
      date2 = setUTCDay(date2, value, options);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]
  },
  i: {
    priority: 90,
    parse: function(string, token, match2, _options) {
      var valueCallback = function(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, string);
        case "io":
          return match2.ordinalNumber(string, {
            unit: "day"
          });
        case "iii":
          return match2.day(string, {
            width: "abbreviated",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "short",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting",
            valueCallback
          });
        case "iiiii":
          return match2.day(string, {
            width: "narrow",
            context: "formatting",
            valueCallback
          });
        case "iiiiii":
          return match2.day(string, {
            width: "short",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting",
            valueCallback
          });
        case "iiii":
        default:
          return match2.day(string, {
            width: "wide",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "abbreviated",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "short",
            context: "formatting",
            valueCallback
          }) || match2.day(string, {
            width: "narrow",
            context: "formatting",
            valueCallback
          });
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 7;
    },
    set: function(date2, _flags, value, options) {
      date2 = setUTCISODay(date2, value, options);
      date2.setUTCHours(0, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]
  },
  a: {
    priority: 80,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(string, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["b", "B", "H", "k", "t", "T"]
  },
  b: {
    priority: 80,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(string, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["a", "B", "H", "k", "t", "T"]
  },
  B: {
    priority: 80,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(string, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(string, {
            width: "narrow",
            context: "formatting"
          });
      }
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["a", "b", "t", "T"]
  },
  h: {
    priority: 70,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, string);
        case "ho":
          return match2.ordinalNumber(string, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 12;
    },
    set: function(date2, _flags, value, _options) {
      var isPM = date2.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date2.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date2.setUTCHours(0, 0, 0, 0);
      } else {
        date2.setUTCHours(value, 0, 0, 0);
      }
      return date2;
    },
    incompatibleTokens: ["H", "K", "k", "t", "T"]
  },
  H: {
    priority: 70,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, string);
        case "Ho":
          return match2.ordinalNumber(string, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 23;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCHours(value, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["a", "b", "h", "K", "k", "t", "T"]
  },
  K: {
    priority: 70,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, string);
        case "Ko":
          return match2.ordinalNumber(string, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function(date2, _flags, value, _options) {
      var isPM = date2.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date2.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date2.setUTCHours(value, 0, 0, 0);
      }
      return date2;
    },
    incompatibleTokens: ["h", "H", "k", "t", "T"]
  },
  k: {
    priority: 70,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, string);
        case "ko":
          return match2.ordinalNumber(string, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 1 && value <= 24;
    },
    set: function(date2, _flags, value, _options) {
      var hours = value <= 24 ? value % 24 : value;
      date2.setUTCHours(hours, 0, 0, 0);
      return date2;
    },
    incompatibleTokens: ["a", "b", "h", "H", "K", "t", "T"]
  },
  m: {
    priority: 60,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, string);
        case "mo":
          return match2.ordinalNumber(string, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMinutes(value, 0, 0);
      return date2;
    },
    incompatibleTokens: ["t", "T"]
  },
  s: {
    priority: 50,
    parse: function(string, token, match2, _options) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, string);
        case "so":
          return match2.ordinalNumber(string, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function(_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCSeconds(value, 0);
      return date2;
    },
    incompatibleTokens: ["t", "T"]
  },
  S: {
    priority: 30,
    parse: function(string, token, _match, _options) {
      var valueCallback = function(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return parseNDigits(token.length, string, valueCallback);
    },
    set: function(date2, _flags, value, _options) {
      date2.setUTCMilliseconds(value);
      return date2;
    },
    incompatibleTokens: ["t", "T"]
  },
  X: {
    priority: 10,
    parse: function(string, token, _match, _options) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, string);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function(date2, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date2;
      }
      return new Date(date2.getTime() - value);
    },
    incompatibleTokens: ["t", "T", "x"]
  },
  x: {
    priority: 10,
    parse: function(string, token, _match, _options) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, string);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function(date2, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date2;
      }
      return new Date(date2.getTime() - value);
    },
    incompatibleTokens: ["t", "T", "X"]
  },
  t: {
    priority: 40,
    parse: function(string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function(_date, _flags, value, _options) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: "*"
  },
  T: {
    priority: 20,
    parse: function(string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function(_date, _flags, value, _options) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: "*"
  }
};
var parsers$1 = parsers;
var TIMEZONE_UNIT_PRIORITY = 10;
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var options = dirtyOptions || {};
  var locale2 = options.locale || defaultLocale;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var localeFirstWeekContainsDate = locale2.options && locale2.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var localeWeekStartsOn = locale2.options && locale2.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [{
    priority: TIMEZONE_UNIT_PRIORITY,
    subPriority: -1,
    set: dateToSystemTimezone,
    index: 0
  }];
  var i;
  var tokens = formatString.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter2 = substring[0];
    if (firstCharacter2 === "p" || firstCharacter2 === "P") {
      var longFormatter = longFormatters$1[firstCharacter2];
      return longFormatter(substring, locale2.formatLong, subFnOptions);
    }
    return substring;
  }).join("").match(formattingTokensRegExp);
  var usedTokens = [];
  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
      throwProtectedError(token, formatString, dirtyDateString);
    }
    if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      throwProtectedError(token, formatString, dirtyDateString);
    }
    var firstCharacter = token[0];
    var parser = parsers$1[firstCharacter];
    if (parser) {
      var incompatibleTokens = parser.incompatibleTokens;
      if (Array.isArray(incompatibleTokens)) {
        var incompatibleToken = void 0;
        for (var _i = 0; _i < usedTokens.length; _i++) {
          var usedToken = usedTokens[_i].token;
          if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
            incompatibleToken = usedTokens[_i];
            break;
          }
        }
        if (incompatibleToken) {
          throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length) {
        throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
      }
      usedTokens.push({
        token: firstCharacter,
        fullToken: token
      });
      var parseResult = parser.parse(dateString, token, locale2.match, subFnOptions);
      if (!parseResult) {
        return new Date(NaN);
      }
      setters.push({
        priority: parser.priority,
        subPriority: parser.subPriority || 0,
        set: parser.set,
        validate: parser.validate,
        value: parseResult.value,
        index: setters.length
      });
      dateString = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      }
      if (dateString.indexOf(token) === 0) {
        dateString = dateString.slice(token.length);
      } else {
        return new Date(NaN);
      }
    }
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a, b) {
    return b - a;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a, b) {
      return b.subPriority - a.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date2 = toDate(dirtyReferenceDate);
  if (isNaN(date2)) {
    return new Date(NaN);
  }
  var utcDate = subMilliseconds(date2, getTimezoneOffsetInMilliseconds(date2));
  var flags = {};
  for (i = 0; i < uniquePrioritySetters.length; i++) {
    var setter = uniquePrioritySetters[i];
    if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
      return new Date(NaN);
    }
    var result = setter.set(utcDate, flags, setter.value, subFnOptions);
    if (result[0]) {
      utcDate = result[0];
      assign(flags, result[1]);
    } else {
      utcDate = result;
    }
  }
  return utcDate;
}
function dateToSystemTimezone(date2, flags) {
  if (flags.timestampIsSet) {
    return date2;
  }
  var convertedDate = new Date(0);
  convertedDate.setFullYear(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
  convertedDate.setHours(date2.getUTCHours(), date2.getUTCMinutes(), date2.getUTCSeconds(), date2.getUTCMilliseconds());
  return convertedDate;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}
function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date2.setHours(hours);
  return date2;
}
function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date2 = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date2.setMinutes(minutes);
  return date2;
}
const parseDate = parse;
function formatDate(date2, fmt, tz) {
  if (tz) {
    date2 = utcToZonedTime(date2, tz);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }
  return format(date2, fmt, { locale: ru });
}
function formatDateDistance(date2, baseDate, options) {
  return formatDistance(date2, baseDate, __spreadProps(__spreadValues({}, options || {}), {
    locale: ru
  }));
}
const formatDistanceLocale = { xSeconds: "{{count}} \u0441\u0435\u043A", xMinutes: "{{count}} \u043C\u0438\u043D", xHours: "{{count}} \u0447", xDays: "{{count}} \u0434\u043D" };
const shortRuLocale = { formatDistance: (token, count) => formatDistanceLocale[token].replace("{{count}}", count) };
function formatDateDuration(duration, options) {
  return formatDuration(duration, __spreadProps(__spreadValues({}, options || {}), {
    locale: (options == null ? void 0 : options.short) ? shortRuLocale : ru
  }));
}
function zonedTimeToUtc(date2, timeZone) {
  return _zonedTimeToUtc(date2, timeZone);
}
function utcToZonedTime(date2, timeZone) {
  return _utcToZonedTime(date2, timeZone);
}
function isToday(date2) {
  const now = Date.now();
  return getYear(date2) === getYear(now) && getMonth(date2) === getMonth(now) && getDate(date2) === getDate(now);
}
function dateToISO(date2) {
  date2 = date2 instanceof Date ? date2 : new Date(date2);
  return date2.toISOString();
}
var date = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseDate,
  formatDate,
  formatDateDistance,
  formatDateDuration,
  zonedTimeToUtc,
  utcToZonedTime,
  isToday,
  dateToISO,
  addDays,
  startOfDay,
  subDays,
  setHours,
  setMinutes,
  addMonths,
  getHours,
  getMinutes,
  addHours,
  addMinutes
}, Symbol.toStringTag, { value: "Module" }));
function debounce(fn, ms) {
  let to;
  return (...args) => {
    to && clearTimeout(to);
    to = setTimeout(() => fn(...args), ms);
  };
}
const fmtCurrency = (node, value) => {
  node.textContent = currencyFormat(value);
  return {
    update(params) {
      node.textContent = currencyFormat(params);
    }
  };
};
function currencyFormat(value) {
  return Number(value).toLocaleString(getCurrentLocale(), {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });
}
function getCurrentLocale() {
  return "ru-RU";
}
var svelteImask = { exports: {} };
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance2, Constructor) {
  if (!(instance2 instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
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
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set2(target2, property2, value2, receiver2) {
      var base = _superPropBase(target2, property2);
      var desc;
      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property2);
        if (desc.set) {
          desc.set.call(receiver2, value2);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }
      desc = Object.getOwnPropertyDescriptor(receiver2, property2);
      if (desc) {
        if (!desc.writable) {
          return false;
        }
        desc.value = value2;
        Object.defineProperty(receiver2, property2, desc);
      } else {
        _defineProperty(receiver2, property2, value2);
      }
      return true;
    };
  }
  return set(target, property, value, receiver);
}
function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);
  if (!s && isStrict) {
    throw new Error("failed to set property");
  }
  return value;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var ChangeDetails = /* @__PURE__ */ function() {
  function ChangeDetails2(details) {
    _classCallCheck(this, ChangeDetails2);
    Object.assign(this, {
      inserted: "",
      rawInserted: "",
      skip: false,
      tailShift: 0
    }, details);
  }
  _createClass(ChangeDetails2, [{
    key: "aggregate",
    value: function aggregate(details) {
      this.rawInserted += details.rawInserted;
      this.skip = this.skip || details.skip;
      this.inserted += details.inserted;
      this.tailShift += details.tailShift;
      return this;
    }
  }, {
    key: "offset",
    get: function get() {
      return this.tailShift + this.inserted.length;
    }
  }]);
  return ChangeDetails2;
}();
function isString(str) {
  return typeof str === "string" || str instanceof String;
}
var DIRECTION = {
  NONE: "NONE",
  LEFT: "LEFT",
  FORCE_LEFT: "FORCE_LEFT",
  RIGHT: "RIGHT",
  FORCE_RIGHT: "FORCE_RIGHT"
};
function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;
    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;
    default:
      return direction;
  }
}
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}
function normalizePrepare(prep) {
  return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
}
function objectIncludes(b, a) {
  if (a === b)
    return true;
  var arrA = Array.isArray(a), arrB = Array.isArray(b), i;
  if (arrA && arrB) {
    if (a.length != b.length)
      return false;
    for (i = 0; i < a.length; i++) {
      if (!objectIncludes(a[i], b[i]))
        return false;
    }
    return true;
  }
  if (arrA != arrB)
    return false;
  if (a && b && _typeof(a) === "object" && _typeof(b) === "object") {
    var dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA && dateB)
      return a.getTime() == b.getTime();
    if (dateA != dateB)
      return false;
    var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA && regexpB)
      return a.toString() == b.toString();
    if (regexpA != regexpB)
      return false;
    var keys = Object.keys(a);
    for (i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    }
    for (i = 0; i < keys.length; i++) {
      if (!objectIncludes(b[keys[i]], a[keys[i]]))
        return false;
    }
    return true;
  } else if (a && b && typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  return false;
}
var ActionDetails = /* @__PURE__ */ function() {
  function ActionDetails2(value, cursorPos, oldValue, oldSelection) {
    _classCallCheck(this, ActionDetails2);
    this.value = value;
    this.cursorPos = cursorPos;
    this.oldValue = oldValue;
    this.oldSelection = oldSelection;
    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
  }
  _createClass(ActionDetails2, [{
    key: "startChangePos",
    get: function get() {
      return Math.min(this.cursorPos, this.oldSelection.start);
    }
  }, {
    key: "insertedCount",
    get: function get() {
      return this.cursorPos - this.startChangePos;
    }
  }, {
    key: "inserted",
    get: function get() {
      return this.value.substr(this.startChangePos, this.insertedCount);
    }
  }, {
    key: "removedCount",
    get: function get() {
      return Math.max(this.oldSelection.end - this.startChangePos || this.oldValue.length - this.value.length, 0);
    }
  }, {
    key: "removed",
    get: function get() {
      return this.oldValue.substr(this.startChangePos, this.removedCount);
    }
  }, {
    key: "head",
    get: function get() {
      return this.value.substring(0, this.startChangePos);
    }
  }, {
    key: "tail",
    get: function get() {
      return this.value.substring(this.startChangePos + this.insertedCount);
    }
  }, {
    key: "removeDirection",
    get: function get() {
      if (!this.removedCount || this.insertedCount)
        return DIRECTION.NONE;
      return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) && this.oldSelection.end === this.oldSelection.start ? DIRECTION.RIGHT : DIRECTION.LEFT;
    }
  }]);
  return ActionDetails2;
}();
var ContinuousTailDetails = /* @__PURE__ */ function() {
  function ContinuousTailDetails2() {
    var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var stop = arguments.length > 2 ? arguments[2] : void 0;
    _classCallCheck(this, ContinuousTailDetails2);
    this.value = value;
    this.from = from;
    this.stop = stop;
  }
  _createClass(ContinuousTailDetails2, [{
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "extend",
    value: function extend(tail) {
      this.value += String(tail);
    }
  }, {
    key: "appendTo",
    value: function appendTo(masked) {
      return masked.append(this.toString(), {
        tail: true
      }).aggregate(masked._appendPlaceholder());
    }
  }, {
    key: "state",
    get: function get() {
      return {
        value: this.value,
        from: this.from,
        stop: this.stop
      };
    },
    set: function set2(state) {
      Object.assign(this, state);
    }
  }, {
    key: "unshift",
    value: function unshift(beforePos) {
      if (!this.value.length || beforePos != null && this.from >= beforePos)
        return "";
      var shiftChar = this.value[0];
      this.value = this.value.slice(1);
      return shiftChar;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (!this.value.length)
        return "";
      var shiftChar = this.value[this.value.length - 1];
      this.value = this.value.slice(0, -1);
      return shiftChar;
    }
  }]);
  return ContinuousTailDetails2;
}();
function IMask(el) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new IMask.InputMask(el, opts);
}
var Masked = /* @__PURE__ */ function() {
  function Masked2(opts) {
    _classCallCheck(this, Masked2);
    this._value = "";
    this._update(Object.assign({}, Masked2.DEFAULTS, opts));
    this.isInitialized = true;
  }
  _createClass(Masked2, [{
    key: "updateOptions",
    value: function updateOptions(opts) {
      if (!Object.keys(opts).length)
        return;
      this.withValueRefresh(this._update.bind(this, opts));
    }
  }, {
    key: "_update",
    value: function _update(opts) {
      Object.assign(this, opts);
    }
  }, {
    key: "state",
    get: function get() {
      return {
        _value: this.value
      };
    },
    set: function set2(state) {
      this._value = state._value;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._value = "";
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set2(value) {
      this.resolve(value);
    }
  }, {
    key: "resolve",
    value: function resolve(value) {
      this.reset();
      this.append(value, {
        input: true
      }, "");
      this.doCommit();
      return this.value;
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.value;
    },
    set: function set2(value) {
      this.reset();
      this.append(value, {}, "");
      this.doCommit();
    }
  }, {
    key: "typedValue",
    get: function get() {
      return this.doParse(this.value);
    },
    set: function set2(value) {
      this.value = this.doFormat(value);
    }
  }, {
    key: "rawInputValue",
    get: function get() {
      return this.extractInput(0, this.value.length, {
        raw: true
      });
    },
    set: function set2(value) {
      this.reset();
      this.append(value, {
        raw: true
      }, "");
      this.doCommit();
    }
  }, {
    key: "isComplete",
    get: function get() {
      return true;
    }
  }, {
    key: "isFilled",
    get: function get() {
      return this.isComplete;
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos, direction) {
      return cursorPos;
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      return this.value.slice(fromPos, toPos);
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
    }
  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      if (isString(tail))
        tail = new ContinuousTailDetails(String(tail));
      return tail.appendTo(this);
    }
  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      if (!ch)
        return new ChangeDetails();
      this._value += ch;
      return new ChangeDetails({
        inserted: ch,
        rawInserted: ch
      });
    }
  }, {
    key: "_appendChar",
    value: function _appendChar(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var checkTail = arguments.length > 2 ? arguments[2] : void 0;
      var consistentState = this.state;
      var details;
      var _normalizePrepare = normalizePrepare(this.doPrepare(ch, flags));
      var _normalizePrepare2 = _slicedToArray(_normalizePrepare, 2);
      ch = _normalizePrepare2[0];
      details = _normalizePrepare2[1];
      details = details.aggregate(this._appendCharRaw(ch, flags));
      if (details.inserted) {
        var consistentTail;
        var appended = this.doValidate(flags) !== false;
        if (appended && checkTail != null) {
          var beforeTailState = this.state;
          if (this.overwrite === true) {
            consistentTail = checkTail.state;
            checkTail.unshift(this.value.length);
          }
          var tailDetails = this.appendTail(checkTail);
          appended = tailDetails.rawInserted === checkTail.toString();
          if (!(appended && tailDetails.inserted) && this.overwrite === "shift") {
            this.state = beforeTailState;
            consistentTail = checkTail.state;
            checkTail.shift();
            tailDetails = this.appendTail(checkTail);
            appended = tailDetails.rawInserted === checkTail.toString();
          }
          if (appended && tailDetails.inserted)
            this.state = beforeTailState;
        }
        if (!appended) {
          details = new ChangeDetails();
          this.state = consistentState;
          if (checkTail && consistentTail)
            checkTail.state = consistentTail;
        }
      }
      return details;
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      return new ChangeDetails();
    }
  }, {
    key: "_appendEager",
    value: function _appendEager() {
      return new ChangeDetails();
    }
  }, {
    key: "append",
    value: function append2(str, flags, tail) {
      if (!isString(str))
        throw new Error("value should be string");
      var details = new ChangeDetails();
      var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
      if (flags && flags.tail)
        flags._beforeTailState = this.state;
      for (var ci = 0; ci < str.length; ++ci) {
        details.aggregate(this._appendChar(str[ci], flags, checkTail));
      }
      if (checkTail != null) {
        details.tailShift += this.appendTail(checkTail).tailShift;
      }
      if (this.eager && flags !== null && flags !== void 0 && flags.input && str) {
        details.aggregate(this._appendEager());
      }
      return details;
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
      return new ChangeDetails();
    }
  }, {
    key: "withValueRefresh",
    value: function withValueRefresh(fn) {
      if (this._refreshing || !this.isInitialized)
        return fn();
      this._refreshing = true;
      var rawInput = this.rawInputValue;
      var value = this.value;
      var ret = fn();
      this.rawInputValue = rawInput;
      if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
        this.append(value.slice(this.value.length), {}, "");
      }
      delete this._refreshing;
      return ret;
    }
  }, {
    key: "runIsolated",
    value: function runIsolated(fn) {
      if (this._isolated || !this.isInitialized)
        return fn(this);
      this._isolated = true;
      var state = this.state;
      var ret = fn(this);
      this.state = state;
      delete this._isolated;
      return ret;
    }
  }, {
    key: "doPrepare",
    value: function doPrepare(str) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.prepare ? this.prepare(str, this, flags) : str;
    }
  }, {
    key: "doValidate",
    value: function doValidate(flags) {
      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.commit)
        this.commit(this.value, this);
    }
  }, {
    key: "doFormat",
    value: function doFormat(value) {
      return this.format ? this.format(value, this) : value;
    }
  }, {
    key: "doParse",
    value: function doParse(str) {
      return this.parse ? this.parse(str, this) : str;
    }
  }, {
    key: "splice",
    value: function splice(start, deleteCount, inserted, removeDirection) {
      var tailPos = start + deleteCount;
      var tail = this.extractTail(tailPos);
      var oldRawValue;
      if (this.eager) {
        removeDirection = forceDirection(removeDirection);
        oldRawValue = this.extractInput(0, tailPos, {
          raw: true
        });
      }
      var startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !this.eager ? DIRECTION.NONE : removeDirection);
      var details = new ChangeDetails({
        tailShift: startChangePos - start
      }).aggregate(this.remove(startChangePos));
      if (this.eager && removeDirection !== DIRECTION.NONE && oldRawValue === this.rawInputValue) {
        if (removeDirection === DIRECTION.FORCE_LEFT) {
          var valLength;
          while (oldRawValue === this.rawInputValue && (valLength = this.value.length)) {
            details.aggregate(new ChangeDetails({
              tailShift: -1
            })).aggregate(this.remove(valLength - 1));
          }
        } else if (removeDirection === DIRECTION.FORCE_RIGHT) {
          tail.unshift();
        }
      }
      return details.aggregate(this.append(inserted, {
        input: true
      }, tail));
    }
  }, {
    key: "maskEquals",
    value: function maskEquals(mask) {
      return this.mask === mask;
    }
  }]);
  return Masked2;
}();
Masked.DEFAULTS = {
  format: function format2(v) {
    return v;
  },
  parse: function parse2(v) {
    return v;
  }
};
IMask.Masked = Masked;
function maskedClass(mask) {
  if (mask == null) {
    throw new Error("mask property should be defined");
  }
  if (mask instanceof RegExp)
    return IMask.MaskedRegExp;
  if (isString(mask))
    return IMask.MaskedPattern;
  if (mask instanceof Date || mask === Date)
    return IMask.MaskedDate;
  if (mask instanceof Number || typeof mask === "number" || mask === Number)
    return IMask.MaskedNumber;
  if (Array.isArray(mask) || mask === Array)
    return IMask.MaskedDynamic;
  if (IMask.Masked && mask.prototype instanceof IMask.Masked)
    return mask;
  if (mask instanceof IMask.Masked)
    return mask.constructor;
  if (mask instanceof Function)
    return IMask.MaskedFunction;
  console.warn("Mask not found for mask", mask);
  return IMask.Masked;
}
function createMask(opts) {
  if (IMask.Masked && opts instanceof IMask.Masked)
    return opts;
  opts = Object.assign({}, opts);
  var mask = opts.mask;
  if (IMask.Masked && mask instanceof IMask.Masked)
    return mask;
  var MaskedClass = maskedClass(mask);
  if (!MaskedClass)
    throw new Error("Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.");
  return new MaskedClass(opts);
}
IMask.createMask = createMask;
var _excluded$4 = ["mask"];
var DEFAULT_INPUT_DEFINITIONS = {
  "0": /\d/,
  "a": /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  "*": /./
};
var PatternInputDefinition = /* @__PURE__ */ function() {
  function PatternInputDefinition2(opts) {
    _classCallCheck(this, PatternInputDefinition2);
    var mask = opts.mask, blockOpts = _objectWithoutProperties(opts, _excluded$4);
    this.masked = createMask({
      mask
    });
    Object.assign(this, blockOpts);
  }
  _createClass(PatternInputDefinition2, [{
    key: "reset",
    value: function reset() {
      this.isFilled = false;
      this.masked.reset();
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      if (fromPos === 0 && toPos >= 1) {
        this.isFilled = false;
        return this.masked.remove(fromPos, toPos);
      }
      return new ChangeDetails();
    }
  }, {
    key: "value",
    get: function get() {
      return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.masked.unmaskedValue;
    }
  }, {
    key: "isComplete",
    get: function get() {
      return Boolean(this.masked.value) || this.isOptional;
    }
  }, {
    key: "_appendChar",
    value: function _appendChar(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (this.isFilled)
        return new ChangeDetails();
      var state = this.masked.state;
      var details = this.masked._appendChar(ch, flags);
      if (details.inserted && this.doValidate(flags) === false) {
        details.inserted = details.rawInserted = "";
        this.masked.state = state;
      }
      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
        details.inserted = this.placeholderChar;
      }
      details.skip = !details.inserted && !this.isOptional;
      this.isFilled = Boolean(details.inserted);
      return details;
    }
  }, {
    key: "append",
    value: function append2() {
      var _this$masked;
      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = new ChangeDetails();
      if (this.isFilled || this.isOptional)
        return details;
      this.isFilled = true;
      details.inserted = this.placeholderChar;
      return details;
    }
  }, {
    key: "_appendEager",
    value: function _appendEager() {
      return new ChangeDetails();
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this$masked2;
      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
    }
  }, {
    key: "appendTail",
    value: function appendTail() {
      var _this$masked3;
      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 ? arguments[2] : void 0;
      return this.masked.extractInput(fromPos, toPos, flags);
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DIRECTION.NONE;
      var minPos = 0;
      var maxPos = this.value.length;
      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
      switch (direction) {
        case DIRECTION.LEFT:
        case DIRECTION.FORCE_LEFT:
          return this.isComplete ? boundPos : minPos;
        case DIRECTION.RIGHT:
        case DIRECTION.FORCE_RIGHT:
          return this.isComplete ? boundPos : maxPos;
        case DIRECTION.NONE:
        default:
          return boundPos;
      }
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _this$masked4, _this$parent;
      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      this.masked.doCommit();
    }
  }, {
    key: "state",
    get: function get() {
      return {
        masked: this.masked.state,
        isFilled: this.isFilled
      };
    },
    set: function set2(state) {
      this.masked.state = state.masked;
      this.isFilled = state.isFilled;
    }
  }]);
  return PatternInputDefinition2;
}();
var PatternFixedDefinition = /* @__PURE__ */ function() {
  function PatternFixedDefinition2(opts) {
    _classCallCheck(this, PatternFixedDefinition2);
    Object.assign(this, opts);
    this._value = "";
    this.isFixed = true;
  }
  _createClass(PatternFixedDefinition2, [{
    key: "value",
    get: function get() {
      return this._value;
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.isUnmasking ? this.value : "";
    }
  }, {
    key: "reset",
    value: function reset() {
      this._isRawInput = false;
      this._value = "";
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._value.length;
      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
      if (!this._value)
        this._isRawInput = false;
      return new ChangeDetails();
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DIRECTION.NONE;
      var minPos = 0;
      var maxPos = this._value.length;
      switch (direction) {
        case DIRECTION.LEFT:
        case DIRECTION.FORCE_LEFT:
          return minPos;
        case DIRECTION.NONE:
        case DIRECTION.RIGHT:
        case DIRECTION.FORCE_RIGHT:
        default:
          return maxPos;
      }
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._value.length;
      var flags = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || "";
    }
  }, {
    key: "isComplete",
    get: function get() {
      return true;
    }
  }, {
    key: "isFilled",
    get: function get() {
      return Boolean(this._value);
    }
  }, {
    key: "_appendChar",
    value: function _appendChar(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var details = new ChangeDetails();
      if (this._value)
        return details;
      var appended = this.char === ch;
      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !this.eager && !flags.tail;
      if (isResolved)
        details.rawInserted = this.char;
      this._value = details.inserted = this.char;
      this._isRawInput = isResolved && (flags.raw || flags.input);
      return details;
    }
  }, {
    key: "_appendEager",
    value: function _appendEager() {
      return this._appendChar(this.char);
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = new ChangeDetails();
      if (this._value)
        return details;
      this._value = details.inserted = this.char;
      return details;
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      return new ContinuousTailDetails("");
    }
  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      if (isString(tail))
        tail = new ContinuousTailDetails(String(tail));
      return tail.appendTo(this);
    }
  }, {
    key: "append",
    value: function append2(str, flags, tail) {
      var details = this._appendChar(str[0], flags);
      if (tail != null) {
        details.tailShift += this.appendTail(tail).tailShift;
      }
      return details;
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
    }
  }, {
    key: "state",
    get: function get() {
      return {
        _value: this._value,
        _isRawInput: this._isRawInput
      };
    },
    set: function set2(state) {
      Object.assign(this, state);
    }
  }]);
  return PatternFixedDefinition2;
}();
var _excluded$3 = ["chunks"];
var ChunksTailDetails = /* @__PURE__ */ function() {
  function ChunksTailDetails2() {
    var chunks = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    _classCallCheck(this, ChunksTailDetails2);
    this.chunks = chunks;
    this.from = from;
  }
  _createClass(ChunksTailDetails2, [{
    key: "toString",
    value: function toString() {
      return this.chunks.map(String).join("");
    }
  }, {
    key: "extend",
    value: function extend(tailChunk) {
      if (!String(tailChunk))
        return;
      if (isString(tailChunk))
        tailChunk = new ContinuousTailDetails(String(tailChunk));
      var lastChunk = this.chunks[this.chunks.length - 1];
      var extendLast = lastChunk && (lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && tailChunk.from === lastChunk.from + lastChunk.toString().length;
      if (tailChunk instanceof ContinuousTailDetails) {
        if (extendLast) {
          lastChunk.extend(tailChunk.toString());
        } else {
          this.chunks.push(tailChunk);
        }
      } else if (tailChunk instanceof ChunksTailDetails2) {
        if (tailChunk.stop == null) {
          var firstTailChunk;
          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
            firstTailChunk = tailChunk.chunks.shift();
            firstTailChunk.from += tailChunk.from;
            this.extend(firstTailChunk);
          }
        }
        if (tailChunk.toString()) {
          tailChunk.stop = tailChunk.blockIndex;
          this.chunks.push(tailChunk);
        }
      }
    }
  }, {
    key: "appendTo",
    value: function appendTo(masked) {
      if (!(masked instanceof IMask.MaskedPattern)) {
        var tail = new ContinuousTailDetails(this.toString());
        return tail.appendTo(masked);
      }
      var details = new ChangeDetails();
      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
        var chunk = this.chunks[ci];
        var lastBlockIter = masked._mapPosToBlock(masked.value.length);
        var stop = chunk.stop;
        var chunkBlock = void 0;
        if (stop != null && (!lastBlockIter || lastBlockIter.index <= stop)) {
          if (chunk instanceof ChunksTailDetails2 || masked._stops.indexOf(stop) >= 0) {
            details.aggregate(masked._appendPlaceholder(stop));
          }
          chunkBlock = chunk instanceof ChunksTailDetails2 && masked._blocks[stop];
        }
        if (chunkBlock) {
          var tailDetails = chunkBlock.appendTail(chunk);
          tailDetails.skip = false;
          details.aggregate(tailDetails);
          masked._value += tailDetails.inserted;
          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
          if (remainChars)
            details.aggregate(masked.append(remainChars, {
              tail: true
            }));
        } else {
          details.aggregate(masked.append(chunk.toString(), {
            tail: true
          }));
        }
      }
      return details;
    }
  }, {
    key: "state",
    get: function get() {
      return {
        chunks: this.chunks.map(function(c) {
          return c.state;
        }),
        from: this.from,
        stop: this.stop,
        blockIndex: this.blockIndex
      };
    },
    set: function set2(state) {
      var chunks = state.chunks, props = _objectWithoutProperties(state, _excluded$3);
      Object.assign(this, props);
      this.chunks = chunks.map(function(cstate) {
        var chunk = "chunks" in cstate ? new ChunksTailDetails2() : new ContinuousTailDetails();
        chunk.state = cstate;
        return chunk;
      });
    }
  }, {
    key: "unshift",
    value: function unshift(beforePos) {
      if (!this.chunks.length || beforePos != null && this.from >= beforePos)
        return "";
      var chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
      var ci = 0;
      while (ci < this.chunks.length) {
        var chunk = this.chunks[ci];
        var shiftChar = chunk.unshift(chunkShiftPos);
        if (chunk.toString()) {
          if (!shiftChar)
            break;
          ++ci;
        } else {
          this.chunks.splice(ci, 1);
        }
        if (shiftChar)
          return shiftChar;
      }
      return "";
    }
  }, {
    key: "shift",
    value: function shift() {
      if (!this.chunks.length)
        return "";
      var ci = this.chunks.length - 1;
      while (0 <= ci) {
        var chunk = this.chunks[ci];
        var shiftChar = chunk.shift();
        if (chunk.toString()) {
          if (!shiftChar)
            break;
          --ci;
        } else {
          this.chunks.splice(ci, 1);
        }
        if (shiftChar)
          return shiftChar;
      }
      return "";
    }
  }]);
  return ChunksTailDetails2;
}();
var PatternCursor = /* @__PURE__ */ function() {
  function PatternCursor2(masked, pos) {
    _classCallCheck(this, PatternCursor2);
    this.masked = masked;
    this._log = [];
    var _ref = masked._mapPosToBlock(pos) || (pos < 0 ? {
      index: 0,
      offset: 0
    } : {
      index: this.masked._blocks.length,
      offset: 0
    }), offset = _ref.offset, index = _ref.index;
    this.offset = offset;
    this.index = index;
    this.ok = false;
  }
  _createClass(PatternCursor2, [{
    key: "block",
    get: function get() {
      return this.masked._blocks[this.index];
    }
  }, {
    key: "pos",
    get: function get() {
      return this.masked._blockStartPos(this.index) + this.offset;
    }
  }, {
    key: "state",
    get: function get() {
      return {
        index: this.index,
        offset: this.offset,
        ok: this.ok
      };
    },
    set: function set2(s) {
      Object.assign(this, s);
    }
  }, {
    key: "pushState",
    value: function pushState() {
      this._log.push(this.state);
    }
  }, {
    key: "popState",
    value: function popState() {
      var s = this._log.pop();
      this.state = s;
      return s;
    }
  }, {
    key: "bindBlock",
    value: function bindBlock() {
      if (this.block)
        return;
      if (this.index < 0) {
        this.index = 0;
        this.offset = 0;
      }
      if (this.index >= this.masked._blocks.length) {
        this.index = this.masked._blocks.length - 1;
        this.offset = this.block.value.length;
      }
    }
  }, {
    key: "_pushLeft",
    value: function _pushLeft(fn) {
      this.pushState();
      for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) === null || _this$block === void 0 ? void 0 : _this$block.value.length) || 0) {
        var _this$block;
        if (fn())
          return this.ok = true;
      }
      return this.ok = false;
    }
  }, {
    key: "_pushRight",
    value: function _pushRight(fn) {
      this.pushState();
      for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
        if (fn())
          return this.ok = true;
      }
      return this.ok = false;
    }
  }, {
    key: "pushLeftBeforeFilled",
    value: function pushLeftBeforeFilled() {
      var _this = this;
      return this._pushLeft(function() {
        if (_this.block.isFixed || !_this.block.value)
          return;
        _this.offset = _this.block.nearestInputPos(_this.offset, DIRECTION.FORCE_LEFT);
        if (_this.offset !== 0)
          return true;
      });
    }
  }, {
    key: "pushLeftBeforeInput",
    value: function pushLeftBeforeInput() {
      var _this2 = this;
      return this._pushLeft(function() {
        if (_this2.block.isFixed)
          return;
        _this2.offset = _this2.block.nearestInputPos(_this2.offset, DIRECTION.LEFT);
        return true;
      });
    }
  }, {
    key: "pushLeftBeforeRequired",
    value: function pushLeftBeforeRequired() {
      var _this3 = this;
      return this._pushLeft(function() {
        if (_this3.block.isFixed || _this3.block.isOptional && !_this3.block.value)
          return;
        _this3.offset = _this3.block.nearestInputPos(_this3.offset, DIRECTION.LEFT);
        return true;
      });
    }
  }, {
    key: "pushRightBeforeFilled",
    value: function pushRightBeforeFilled() {
      var _this4 = this;
      return this._pushRight(function() {
        if (_this4.block.isFixed || !_this4.block.value)
          return;
        _this4.offset = _this4.block.nearestInputPos(_this4.offset, DIRECTION.FORCE_RIGHT);
        if (_this4.offset !== _this4.block.value.length)
          return true;
      });
    }
  }, {
    key: "pushRightBeforeInput",
    value: function pushRightBeforeInput() {
      var _this5 = this;
      return this._pushRight(function() {
        if (_this5.block.isFixed)
          return;
        _this5.offset = _this5.block.nearestInputPos(_this5.offset, DIRECTION.NONE);
        return true;
      });
    }
  }, {
    key: "pushRightBeforeRequired",
    value: function pushRightBeforeRequired() {
      var _this6 = this;
      return this._pushRight(function() {
        if (_this6.block.isFixed || _this6.block.isOptional && !_this6.block.value)
          return;
        _this6.offset = _this6.block.nearestInputPos(_this6.offset, DIRECTION.NONE);
        return true;
      });
    }
  }]);
  return PatternCursor2;
}();
var MaskedRegExp = /* @__PURE__ */ function(_Masked) {
  _inherits(MaskedRegExp2, _Masked);
  var _super = _createSuper(MaskedRegExp2);
  function MaskedRegExp2() {
    _classCallCheck(this, MaskedRegExp2);
    return _super.apply(this, arguments);
  }
  _createClass(MaskedRegExp2, [{
    key: "_update",
    value: function _update(opts) {
      if (opts.mask)
        opts.validate = function(value) {
          return value.search(opts.mask) >= 0;
        };
      _get(_getPrototypeOf(MaskedRegExp2.prototype), "_update", this).call(this, opts);
    }
  }]);
  return MaskedRegExp2;
}(Masked);
IMask.MaskedRegExp = MaskedRegExp;
var _excluded$2 = ["_blocks"];
var MaskedPattern = /* @__PURE__ */ function(_Masked) {
  _inherits(MaskedPattern2, _Masked);
  var _super = _createSuper(MaskedPattern2);
  function MaskedPattern2() {
    var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, MaskedPattern2);
    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
    return _super.call(this, Object.assign({}, MaskedPattern2.DEFAULTS, opts));
  }
  _createClass(MaskedPattern2, [{
    key: "_update",
    value: function _update() {
      var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      opts.definitions = Object.assign({}, this.definitions, opts.definitions);
      _get(_getPrototypeOf(MaskedPattern2.prototype), "_update", this).call(this, opts);
      this._rebuildMask();
    }
  }, {
    key: "_rebuildMask",
    value: function _rebuildMask() {
      var _this = this;
      var defs = this.definitions;
      this._blocks = [];
      this._stops = [];
      this._maskedBlocks = {};
      var pattern = this.mask;
      if (!pattern || !defs)
        return;
      var unmaskingBlock = false;
      var optionalBlock = false;
      for (var i = 0; i < pattern.length; ++i) {
        if (this.blocks) {
          var _ret = function() {
            var p = pattern.slice(i);
            var bNames = Object.keys(_this.blocks).filter(function(bName2) {
              return p.indexOf(bName2) === 0;
            });
            bNames.sort(function(a, b) {
              return b.length - a.length;
            });
            var bName = bNames[0];
            if (bName) {
              var maskedBlock = createMask(Object.assign({
                parent: _this,
                lazy: _this.lazy,
                eager: _this.eager,
                placeholderChar: _this.placeholderChar,
                overwrite: _this.overwrite
              }, _this.blocks[bName]));
              if (maskedBlock) {
                _this._blocks.push(maskedBlock);
                if (!_this._maskedBlocks[bName])
                  _this._maskedBlocks[bName] = [];
                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
              }
              i += bName.length - 1;
              return "continue";
            }
          }();
          if (_ret === "continue")
            continue;
        }
        var char = pattern[i];
        var isInput = char in defs;
        if (char === MaskedPattern2.STOP_CHAR) {
          this._stops.push(this._blocks.length);
          continue;
        }
        if (char === "{" || char === "}") {
          unmaskingBlock = !unmaskingBlock;
          continue;
        }
        if (char === "[" || char === "]") {
          optionalBlock = !optionalBlock;
          continue;
        }
        if (char === MaskedPattern2.ESCAPE_CHAR) {
          ++i;
          char = pattern[i];
          if (!char)
            break;
          isInput = false;
        }
        var def = isInput ? new PatternInputDefinition({
          parent: this,
          lazy: this.lazy,
          eager: this.eager,
          placeholderChar: this.placeholderChar,
          mask: defs[char],
          isOptional: optionalBlock
        }) : new PatternFixedDefinition({
          char,
          eager: this.eager,
          isUnmasking: unmaskingBlock
        });
        this._blocks.push(def);
      }
    }
  }, {
    key: "state",
    get: function get() {
      return Object.assign({}, _get(_getPrototypeOf(MaskedPattern2.prototype), "state", this), {
        _blocks: this._blocks.map(function(b) {
          return b.state;
        })
      });
    },
    set: function set2(state) {
      var _blocks = state._blocks, maskedState = _objectWithoutProperties(state, _excluded$2);
      this._blocks.forEach(function(b, bi) {
        return b.state = _blocks[bi];
      });
      _set(_getPrototypeOf(MaskedPattern2.prototype), "state", maskedState, this, true);
    }
  }, {
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(MaskedPattern2.prototype), "reset", this).call(this);
      this._blocks.forEach(function(b) {
        return b.reset();
      });
    }
  }, {
    key: "isComplete",
    get: function get() {
      return this._blocks.every(function(b) {
        return b.isComplete;
      });
    }
  }, {
    key: "isFilled",
    get: function get() {
      return this._blocks.every(function(b) {
        return b.isFilled;
      });
    }
  }, {
    key: "isFixed",
    get: function get() {
      return this._blocks.every(function(b) {
        return b.isFixed;
      });
    }
  }, {
    key: "isOptional",
    get: function get() {
      return this._blocks.every(function(b) {
        return b.isOptional;
      });
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      this._blocks.forEach(function(b) {
        return b.doCommit();
      });
      _get(_getPrototypeOf(MaskedPattern2.prototype), "doCommit", this).call(this);
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._blocks.reduce(function(str, b) {
        return str += b.unmaskedValue;
      }, "");
    },
    set: function set2(unmaskedValue) {
      _set(_getPrototypeOf(MaskedPattern2.prototype), "unmaskedValue", unmaskedValue, this, true);
    }
  }, {
    key: "value",
    get: function get() {
      return this._blocks.reduce(function(str, b) {
        return str += b.value;
      }, "");
    },
    set: function set2(value) {
      _set(_getPrototypeOf(MaskedPattern2.prototype), "value", value, this, true);
    }
  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      return _get(_getPrototypeOf(MaskedPattern2.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
    }
  }, {
    key: "_appendEager",
    value: function _appendEager() {
      var _this$_mapPosToBlock;
      var details = new ChangeDetails();
      var startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.value.length)) === null || _this$_mapPosToBlock === void 0 ? void 0 : _this$_mapPosToBlock.index;
      if (startBlockIndex == null)
        return details;
      if (this._blocks[startBlockIndex].isFilled)
        ++startBlockIndex;
      for (var bi = startBlockIndex; bi < this._blocks.length; ++bi) {
        var d = this._blocks[bi]._appendEager();
        if (!d.inserted)
          break;
        details.aggregate(d);
      }
      return details;
    }
  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var blockIter = this._mapPosToBlock(this.value.length);
      var details = new ChangeDetails();
      if (!blockIter)
        return details;
      for (var bi = blockIter.index; ; ++bi) {
        var _flags$_beforeTailSta;
        var _block = this._blocks[bi];
        if (!_block)
          break;
        var blockDetails = _block._appendChar(ch, Object.assign({}, flags, {
          _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) === null || _flags$_beforeTailSta === void 0 ? void 0 : _flags$_beforeTailSta._blocks[bi]
        }));
        var skip = blockDetails.skip;
        details.aggregate(blockDetails);
        if (skip || blockDetails.rawInserted)
          break;
      }
      return details;
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this2 = this;
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var chunkTail = new ChunksTailDetails();
      if (fromPos === toPos)
        return chunkTail;
      this._forEachBlocksInRange(fromPos, toPos, function(b, bi, bFromPos, bToPos) {
        var blockChunk = b.extractTail(bFromPos, bToPos);
        blockChunk.stop = _this2._findStopBefore(bi);
        blockChunk.from = _this2._blockStartPos(bi);
        if (blockChunk instanceof ChunksTailDetails)
          blockChunk.blockIndex = bi;
        chunkTail.extend(blockChunk);
      });
      return chunkTail;
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (fromPos === toPos)
        return "";
      var input = "";
      this._forEachBlocksInRange(fromPos, toPos, function(b, _, fromPos2, toPos2) {
        input += b.extractInput(fromPos2, toPos2, flags);
      });
      return input;
    }
  }, {
    key: "_findStopBefore",
    value: function _findStopBefore(blockIndex) {
      var stopBefore;
      for (var si = 0; si < this._stops.length; ++si) {
        var stop = this._stops[si];
        if (stop <= blockIndex)
          stopBefore = stop;
        else
          break;
      }
      return stopBefore;
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder(toBlockIndex) {
      var _this3 = this;
      var details = new ChangeDetails();
      if (this.lazy && toBlockIndex == null)
        return details;
      var startBlockIter = this._mapPosToBlock(this.value.length);
      if (!startBlockIter)
        return details;
      var startBlockIndex = startBlockIter.index;
      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function(b) {
        if (!b.lazy || toBlockIndex != null) {
          var args = b._blocks != null ? [b._blocks.length] : [];
          var bDetails = b._appendPlaceholder.apply(b, args);
          _this3._value += bDetails.inserted;
          details.aggregate(bDetails);
        }
      });
      return details;
    }
  }, {
    key: "_mapPosToBlock",
    value: function _mapPosToBlock(pos) {
      var accVal = "";
      for (var bi = 0; bi < this._blocks.length; ++bi) {
        var _block2 = this._blocks[bi];
        var blockStartPos = accVal.length;
        accVal += _block2.value;
        if (pos <= accVal.length) {
          return {
            index: bi,
            offset: pos - blockStartPos
          };
        }
      }
    }
  }, {
    key: "_blockStartPos",
    value: function _blockStartPos(blockIndex) {
      return this._blocks.slice(0, blockIndex).reduce(function(pos, b) {
        return pos += b.value.length;
      }, 0);
    }
  }, {
    key: "_forEachBlocksInRange",
    value: function _forEachBlocksInRange(fromPos) {
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var fn = arguments.length > 2 ? arguments[2] : void 0;
      var fromBlockIter = this._mapPosToBlock(fromPos);
      if (fromBlockIter) {
        var toBlockIter = this._mapPosToBlock(toPos);
        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
        var fromBlockStartPos = fromBlockIter.offset;
        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
        if (toBlockIter && !isSameBlock) {
          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
          }
          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var removeDetails = _get(_getPrototypeOf(MaskedPattern2.prototype), "remove", this).call(this, fromPos, toPos);
      this._forEachBlocksInRange(fromPos, toPos, function(b, _, bFromPos, bToPos) {
        removeDetails.aggregate(b.remove(bFromPos, bToPos));
      });
      return removeDetails;
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DIRECTION.NONE;
      if (!this._blocks.length)
        return 0;
      var cursor = new PatternCursor(this, cursorPos);
      if (direction === DIRECTION.NONE) {
        if (cursor.pushRightBeforeInput())
          return cursor.pos;
        cursor.popState();
        if (cursor.pushLeftBeforeInput())
          return cursor.pos;
        return this.value.length;
      }
      if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
        if (direction === DIRECTION.LEFT) {
          cursor.pushRightBeforeFilled();
          if (cursor.ok && cursor.pos === cursorPos)
            return cursorPos;
          cursor.popState();
        }
        cursor.pushLeftBeforeInput();
        cursor.pushLeftBeforeRequired();
        cursor.pushLeftBeforeFilled();
        if (direction === DIRECTION.LEFT) {
          cursor.pushRightBeforeInput();
          cursor.pushRightBeforeRequired();
          if (cursor.ok && cursor.pos <= cursorPos)
            return cursor.pos;
          cursor.popState();
          if (cursor.ok && cursor.pos <= cursorPos)
            return cursor.pos;
          cursor.popState();
        }
        if (cursor.ok)
          return cursor.pos;
        if (direction === DIRECTION.FORCE_LEFT)
          return 0;
        cursor.popState();
        if (cursor.ok)
          return cursor.pos;
        cursor.popState();
        if (cursor.ok)
          return cursor.pos;
        return 0;
      }
      if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
        cursor.pushRightBeforeInput();
        cursor.pushRightBeforeRequired();
        if (cursor.pushRightBeforeFilled())
          return cursor.pos;
        if (direction === DIRECTION.FORCE_RIGHT)
          return this.value.length;
        cursor.popState();
        if (cursor.ok)
          return cursor.pos;
        cursor.popState();
        if (cursor.ok)
          return cursor.pos;
        return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
      }
      return cursorPos;
    }
  }, {
    key: "maskedBlock",
    value: function maskedBlock(name) {
      return this.maskedBlocks(name)[0];
    }
  }, {
    key: "maskedBlocks",
    value: function maskedBlocks(name) {
      var _this4 = this;
      var indices = this._maskedBlocks[name];
      if (!indices)
        return [];
      return indices.map(function(gi) {
        return _this4._blocks[gi];
      });
    }
  }]);
  return MaskedPattern2;
}(Masked);
MaskedPattern.DEFAULTS = {
  lazy: true,
  placeholderChar: "_"
};
MaskedPattern.STOP_CHAR = "`";
MaskedPattern.ESCAPE_CHAR = "\\";
MaskedPattern.InputDefinition = PatternInputDefinition;
MaskedPattern.FixedDefinition = PatternFixedDefinition;
IMask.MaskedPattern = MaskedPattern;
var MaskedRange = /* @__PURE__ */ function(_MaskedPattern) {
  _inherits(MaskedRange2, _MaskedPattern);
  var _super = _createSuper(MaskedRange2);
  function MaskedRange2() {
    _classCallCheck(this, MaskedRange2);
    return _super.apply(this, arguments);
  }
  _createClass(MaskedRange2, [{
    key: "_matchFrom",
    get: function get() {
      return this.maxLength - String(this.from).length;
    }
  }, {
    key: "_update",
    value: function _update(opts) {
      opts = Object.assign({
        to: this.to || 0,
        from: this.from || 0,
        maxLength: this.maxLength || 0
      }, opts);
      var maxLength = String(opts.to).length;
      if (opts.maxLength != null)
        maxLength = Math.max(maxLength, opts.maxLength);
      opts.maxLength = maxLength;
      var fromStr = String(opts.from).padStart(maxLength, "0");
      var toStr = String(opts.to).padStart(maxLength, "0");
      var sameCharsCount = 0;
      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
        ++sameCharsCount;
      }
      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, "\\0") + "0".repeat(maxLength - sameCharsCount);
      _get(_getPrototypeOf(MaskedRange2.prototype), "_update", this).call(this, opts);
    }
  }, {
    key: "isComplete",
    get: function get() {
      return _get(_getPrototypeOf(MaskedRange2.prototype), "isComplete", this) && Boolean(this.value);
    }
  }, {
    key: "boundaries",
    value: function boundaries(str) {
      var minstr = "";
      var maxstr = "";
      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [], _ref2 = _slicedToArray(_ref, 3), placeholder = _ref2[1], num = _ref2[2];
      if (num) {
        minstr = "0".repeat(placeholder.length) + num;
        maxstr = "9".repeat(placeholder.length) + num;
      }
      minstr = minstr.padEnd(this.maxLength, "0");
      maxstr = maxstr.padEnd(this.maxLength, "9");
      return [minstr, maxstr];
    }
  }, {
    key: "doPrepare",
    value: function doPrepare(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var details;
      var _normalizePrepare = normalizePrepare(_get(_getPrototypeOf(MaskedRange2.prototype), "doPrepare", this).call(this, ch.replace(/\D/g, ""), flags));
      var _normalizePrepare2 = _slicedToArray(_normalizePrepare, 2);
      ch = _normalizePrepare2[0];
      details = _normalizePrepare2[1];
      if (!this.autofix || !ch)
        return ch;
      var fromStr = String(this.from).padStart(this.maxLength, "0");
      var toStr = String(this.to).padStart(this.maxLength, "0");
      var nextVal = this.value + ch;
      if (nextVal.length > this.maxLength)
        return "";
      var _this$boundaries = this.boundaries(nextVal), _this$boundaries2 = _slicedToArray(_this$boundaries, 2), minstr = _this$boundaries2[0], maxstr = _this$boundaries2[1];
      if (Number(maxstr) < this.from)
        return fromStr[nextVal.length - 1];
      if (Number(minstr) > this.to) {
        if (this.autofix === "pad" && nextVal.length < this.maxLength) {
          return ["", details.aggregate(this.append(fromStr[nextVal.length - 1] + ch, flags))];
        }
        return toStr[nextVal.length - 1];
      }
      return ch;
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2;
      var str = this.value;
      var firstNonZero = str.search(/[^0]/);
      if (firstNonZero === -1 && str.length <= this._matchFrom)
        return true;
      var _this$boundaries3 = this.boundaries(str), _this$boundaries4 = _slicedToArray(_this$boundaries3, 2), minstr = _this$boundaries4[0], maxstr = _this$boundaries4[1];
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange2.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
    }
  }]);
  return MaskedRange2;
}(MaskedPattern);
IMask.MaskedRange = MaskedRange;
var MaskedDate = /* @__PURE__ */ function(_MaskedPattern) {
  _inherits(MaskedDate2, _MaskedPattern);
  var _super = _createSuper(MaskedDate2);
  function MaskedDate2(opts) {
    _classCallCheck(this, MaskedDate2);
    return _super.call(this, Object.assign({}, MaskedDate2.DEFAULTS, opts));
  }
  _createClass(MaskedDate2, [{
    key: "_update",
    value: function _update(opts) {
      if (opts.mask === Date)
        delete opts.mask;
      if (opts.pattern)
        opts.mask = opts.pattern;
      var blocks = opts.blocks;
      opts.blocks = Object.assign({}, MaskedDate2.GET_DEFAULT_BLOCKS());
      if (opts.min)
        opts.blocks.Y.from = opts.min.getFullYear();
      if (opts.max)
        opts.blocks.Y.to = opts.max.getFullYear();
      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
        opts.blocks.m.from = opts.min.getMonth() + 1;
        opts.blocks.m.to = opts.max.getMonth() + 1;
        if (opts.blocks.m.from === opts.blocks.m.to) {
          opts.blocks.d.from = opts.min.getDate();
          opts.blocks.d.to = opts.max.getDate();
        }
      }
      Object.assign(opts.blocks, this.blocks, blocks);
      Object.keys(opts.blocks).forEach(function(bk) {
        var b = opts.blocks[bk];
        if (!("autofix" in b) && "autofix" in opts)
          b.autofix = opts.autofix;
      });
      _get(_getPrototypeOf(MaskedDate2.prototype), "_update", this).call(this, opts);
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2;
      var date2 = this.date;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_get2 = _get(_getPrototypeOf(MaskedDate2.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date2 != null && (this.min == null || this.min <= date2) && (this.max == null || date2 <= this.max));
    }
  }, {
    key: "isDateExist",
    value: function isDateExist(str) {
      return this.format(this.parse(str, this), this).indexOf(str) >= 0;
    }
  }, {
    key: "date",
    get: function get() {
      return this.typedValue;
    },
    set: function set2(date2) {
      this.typedValue = date2;
    }
  }, {
    key: "typedValue",
    get: function get() {
      return this.isComplete ? _get(_getPrototypeOf(MaskedDate2.prototype), "typedValue", this) : null;
    },
    set: function set2(value) {
      _set(_getPrototypeOf(MaskedDate2.prototype), "typedValue", value, this, true);
    }
  }, {
    key: "maskEquals",
    value: function maskEquals(mask) {
      return mask === Date || _get(_getPrototypeOf(MaskedDate2.prototype), "maskEquals", this).call(this, mask);
    }
  }]);
  return MaskedDate2;
}(MaskedPattern);
MaskedDate.DEFAULTS = {
  pattern: "d{.}`m{.}`Y",
  format: function format3(date2) {
    if (!date2)
      return "";
    var day = String(date2.getDate()).padStart(2, "0");
    var month = String(date2.getMonth() + 1).padStart(2, "0");
    var year = date2.getFullYear();
    return [day, month, year].join(".");
  },
  parse: function parse3(str) {
    var _str$split = str.split("."), _str$split2 = _slicedToArray(_str$split, 3), day = _str$split2[0], month = _str$split2[1], year = _str$split2[2];
    return new Date(year, month - 1, day);
  }
};
MaskedDate.GET_DEFAULT_BLOCKS = function() {
  return {
    d: {
      mask: MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2
    },
    m: {
      mask: MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2
    },
    Y: {
      mask: MaskedRange,
      from: 1900,
      to: 9999
    }
  };
};
IMask.MaskedDate = MaskedDate;
var MaskElement = /* @__PURE__ */ function() {
  function MaskElement2() {
    _classCallCheck(this, MaskElement2);
  }
  _createClass(MaskElement2, [{
    key: "selectionStart",
    get: function get() {
      var start;
      try {
        start = this._unsafeSelectionStart;
      } catch (e) {
      }
      return start != null ? start : this.value.length;
    }
  }, {
    key: "selectionEnd",
    get: function get() {
      var end;
      try {
        end = this._unsafeSelectionEnd;
      } catch (e) {
      }
      return end != null ? end : this.value.length;
    }
  }, {
    key: "select",
    value: function select(start, end) {
      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd)
        return;
      try {
        this._unsafeSelect(start, end);
      } catch (e) {
      }
    }
  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {
    }
  }, {
    key: "isActive",
    get: function get() {
      return false;
    }
  }, {
    key: "bindEvents",
    value: function bindEvents(handlers) {
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
    }
  }]);
  return MaskElement2;
}();
IMask.MaskElement = MaskElement;
var HTMLMaskElement = /* @__PURE__ */ function(_MaskElement) {
  _inherits(HTMLMaskElement2, _MaskElement);
  var _super = _createSuper(HTMLMaskElement2);
  function HTMLMaskElement2(input) {
    var _this;
    _classCallCheck(this, HTMLMaskElement2);
    _this = _super.call(this);
    _this.input = input;
    _this._handlers = {};
    return _this;
  }
  _createClass(HTMLMaskElement2, [{
    key: "rootElement",
    get: function get() {
      var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
      return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) === null || _this$input$getRootNo2 === void 0 ? void 0 : _this$input$getRootNo2.call(_this$input)) !== null && _this$input$getRootNo !== void 0 ? _this$input$getRootNo : document;
    }
  }, {
    key: "isActive",
    get: function get() {
      return this.input === this.rootElement.activeElement;
    }
  }, {
    key: "_unsafeSelectionStart",
    get: function get() {
      return this.input.selectionStart;
    }
  }, {
    key: "_unsafeSelectionEnd",
    get: function get() {
      return this.input.selectionEnd;
    }
  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {
      this.input.setSelectionRange(start, end);
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    },
    set: function set2(value) {
      this.input.value = value;
    }
  }, {
    key: "bindEvents",
    value: function bindEvents(handlers) {
      var _this2 = this;
      Object.keys(handlers).forEach(function(event) {
        return _this2._toggleEventHandler(HTMLMaskElement2.EVENTS_MAP[event], handlers[event]);
      });
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      var _this3 = this;
      Object.keys(this._handlers).forEach(function(event) {
        return _this3._toggleEventHandler(event);
      });
    }
  }, {
    key: "_toggleEventHandler",
    value: function _toggleEventHandler(event, handler) {
      if (this._handlers[event]) {
        this.input.removeEventListener(event, this._handlers[event]);
        delete this._handlers[event];
      }
      if (handler) {
        this.input.addEventListener(event, handler);
        this._handlers[event] = handler;
      }
    }
  }]);
  return HTMLMaskElement2;
}(MaskElement);
HTMLMaskElement.EVENTS_MAP = {
  selectionChange: "keydown",
  input: "input",
  drop: "drop",
  click: "click",
  focus: "focus",
  commit: "blur"
};
IMask.HTMLMaskElement = HTMLMaskElement;
var HTMLContenteditableMaskElement = /* @__PURE__ */ function(_HTMLMaskElement) {
  _inherits(HTMLContenteditableMaskElement2, _HTMLMaskElement);
  var _super = _createSuper(HTMLContenteditableMaskElement2);
  function HTMLContenteditableMaskElement2() {
    _classCallCheck(this, HTMLContenteditableMaskElement2);
    return _super.apply(this, arguments);
  }
  _createClass(HTMLContenteditableMaskElement2, [{
    key: "_unsafeSelectionStart",
    get: function get() {
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();
      var anchorOffset = selection && selection.anchorOffset;
      var focusOffset = selection && selection.focusOffset;
      if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
        return anchorOffset;
      }
      return focusOffset;
    }
  }, {
    key: "_unsafeSelectionEnd",
    get: function get() {
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();
      var anchorOffset = selection && selection.anchorOffset;
      var focusOffset = selection && selection.focusOffset;
      if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
        return anchorOffset;
      }
      return focusOffset;
    }
  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {
      if (!this.rootElement.createRange)
        return;
      var range = this.rootElement.createRange();
      range.setStart(this.input.firstChild || this.input, start);
      range.setEnd(this.input.lastChild || this.input, end);
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.textContent;
    },
    set: function set2(value) {
      this.input.textContent = value;
    }
  }]);
  return HTMLContenteditableMaskElement2;
}(HTMLMaskElement);
IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
var _excluded$1 = ["mask"];
var InputMask = /* @__PURE__ */ function() {
  function InputMask2(el, opts) {
    _classCallCheck(this, InputMask2);
    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== "INPUT" && el.tagName !== "TEXTAREA" ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
    this.masked = createMask(opts);
    this._listeners = {};
    this._value = "";
    this._unmaskedValue = "";
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onClick = this._onClick.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
    this._bindEvents();
    this.updateValue();
    this._onChange();
  }
  _createClass(InputMask2, [{
    key: "mask",
    get: function get() {
      return this.masked.mask;
    },
    set: function set2(mask) {
      if (this.maskEquals(mask))
        return;
      if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
        this.masked.updateOptions({
          mask
        });
        return;
      }
      var masked = createMask({
        mask
      });
      masked.unmaskedValue = this.masked.unmaskedValue;
      this.masked = masked;
    }
  }, {
    key: "maskEquals",
    value: function maskEquals(mask) {
      var _this$masked;
      return mask == null || ((_this$masked = this.masked) === null || _this$masked === void 0 ? void 0 : _this$masked.maskEquals(mask));
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set2(str) {
      this.masked.value = str;
      this.updateControl();
      this.alignCursor();
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._unmaskedValue;
    },
    set: function set2(str) {
      this.masked.unmaskedValue = str;
      this.updateControl();
      this.alignCursor();
    }
  }, {
    key: "typedValue",
    get: function get() {
      return this.masked.typedValue;
    },
    set: function set2(val) {
      this.masked.typedValue = val;
      this.updateControl();
      this.alignCursor();
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      this.el.bindEvents({
        selectionChange: this._saveSelection,
        input: this._onInput,
        drop: this._onDrop,
        click: this._onClick,
        focus: this._onFocus,
        commit: this._onChange
      });
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (this.el)
        this.el.unbindEvents();
    }
  }, {
    key: "_fireEvent",
    value: function _fireEvent(ev) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var listeners = this._listeners[ev];
      if (!listeners)
        return;
      listeners.forEach(function(l) {
        return l.apply(void 0, args);
      });
    }
  }, {
    key: "selectionStart",
    get: function get() {
      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
    }
  }, {
    key: "cursorPos",
    get: function get() {
      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
    },
    set: function set2(pos) {
      if (!this.el || !this.el.isActive)
        return;
      this.el.select(pos, pos);
      this._saveSelection();
    }
  }, {
    key: "_saveSelection",
    value: function _saveSelection() {
      if (this.value !== this.el.value) {
        console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.");
      }
      this._selection = {
        start: this.selectionStart,
        end: this.cursorPos
      };
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      this.masked.value = this.el.value;
      this._value = this.masked.value;
    }
  }, {
    key: "updateControl",
    value: function updateControl() {
      var newUnmaskedValue = this.masked.unmaskedValue;
      var newValue = this.masked.value;
      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
      this._unmaskedValue = newUnmaskedValue;
      this._value = newValue;
      if (this.el.value !== newValue)
        this.el.value = newValue;
      if (isChanged)
        this._fireChangeEvents();
    }
  }, {
    key: "updateOptions",
    value: function updateOptions(opts) {
      var mask = opts.mask, restOpts = _objectWithoutProperties(opts, _excluded$1);
      var updateMask = !this.maskEquals(mask);
      var updateOpts = !objectIncludes(this.masked, restOpts);
      if (updateMask)
        this.mask = mask;
      if (updateOpts)
        this.masked.updateOptions(restOpts);
      if (updateMask || updateOpts)
        this.updateControl();
    }
  }, {
    key: "updateCursor",
    value: function updateCursor(cursorPos) {
      if (cursorPos == null)
        return;
      this.cursorPos = cursorPos;
      this._delayUpdateCursor(cursorPos);
    }
  }, {
    key: "_delayUpdateCursor",
    value: function _delayUpdateCursor(cursorPos) {
      var _this = this;
      this._abortUpdateCursor();
      this._changingCursorPos = cursorPos;
      this._cursorChanging = setTimeout(function() {
        if (!_this.el)
          return;
        _this.cursorPos = _this._changingCursorPos;
        _this._abortUpdateCursor();
      }, 10);
    }
  }, {
    key: "_fireChangeEvents",
    value: function _fireChangeEvents() {
      this._fireEvent("accept", this._inputEvent);
      if (this.masked.isComplete)
        this._fireEvent("complete", this._inputEvent);
    }
  }, {
    key: "_abortUpdateCursor",
    value: function _abortUpdateCursor() {
      if (this._cursorChanging) {
        clearTimeout(this._cursorChanging);
        delete this._cursorChanging;
      }
    }
  }, {
    key: "alignCursor",
    value: function alignCursor() {
      this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT));
    }
  }, {
    key: "alignCursorFriendly",
    value: function alignCursorFriendly() {
      if (this.selectionStart !== this.cursorPos)
        return;
      this.alignCursor();
    }
  }, {
    key: "on",
    value: function on(ev, handler) {
      if (!this._listeners[ev])
        this._listeners[ev] = [];
      this._listeners[ev].push(handler);
      return this;
    }
  }, {
    key: "off",
    value: function off(ev, handler) {
      if (!this._listeners[ev])
        return this;
      if (!handler) {
        delete this._listeners[ev];
        return this;
      }
      var hIndex = this._listeners[ev].indexOf(handler);
      if (hIndex >= 0)
        this._listeners[ev].splice(hIndex, 1);
      return this;
    }
  }, {
    key: "_onInput",
    value: function _onInput(e) {
      this._inputEvent = e;
      this._abortUpdateCursor();
      if (!this._selection)
        return this.updateValue();
      var details = new ActionDetails(this.el.value, this.cursorPos, this.value, this._selection);
      var oldRawValue = this.masked.rawInputValue;
      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset;
      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
      if (removeDirection !== DIRECTION.NONE)
        cursorPos = this.masked.nearestInputPos(cursorPos, DIRECTION.NONE);
      this.updateControl();
      this.updateCursor(cursorPos);
      delete this._inputEvent;
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      if (this.value !== this.el.value) {
        this.updateValue();
      }
      this.masked.doCommit();
      this.updateControl();
      this._saveSelection();
    }
  }, {
    key: "_onDrop",
    value: function _onDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, {
    key: "_onFocus",
    value: function _onFocus(ev) {
      this.alignCursorFriendly();
    }
  }, {
    key: "_onClick",
    value: function _onClick(ev) {
      this.alignCursorFriendly();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._unbindEvents();
      this._listeners.length = 0;
      delete this.el;
    }
  }]);
  return InputMask2;
}();
IMask.InputMask = InputMask;
var MaskedEnum = /* @__PURE__ */ function(_MaskedPattern) {
  _inherits(MaskedEnum2, _MaskedPattern);
  var _super = _createSuper(MaskedEnum2);
  function MaskedEnum2() {
    _classCallCheck(this, MaskedEnum2);
    return _super.apply(this, arguments);
  }
  _createClass(MaskedEnum2, [{
    key: "_update",
    value: function _update(opts) {
      if (opts.enum)
        opts.mask = "*".repeat(opts.enum[0].length);
      _get(_getPrototypeOf(MaskedEnum2.prototype), "_update", this).call(this, opts);
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _this = this, _get2;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.enum.some(function(e) {
        return e.indexOf(_this.unmaskedValue) >= 0;
      }) && (_get2 = _get(_getPrototypeOf(MaskedEnum2.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
    }
  }]);
  return MaskedEnum2;
}(MaskedPattern);
IMask.MaskedEnum = MaskedEnum;
var MaskedNumber = /* @__PURE__ */ function(_Masked) {
  _inherits(MaskedNumber2, _Masked);
  var _super = _createSuper(MaskedNumber2);
  function MaskedNumber2(opts) {
    _classCallCheck(this, MaskedNumber2);
    return _super.call(this, Object.assign({}, MaskedNumber2.DEFAULTS, opts));
  }
  _createClass(MaskedNumber2, [{
    key: "_update",
    value: function _update(opts) {
      _get(_getPrototypeOf(MaskedNumber2.prototype), "_update", this).call(this, opts);
      this._updateRegExps();
    }
  }, {
    key: "_updateRegExps",
    value: function _updateRegExps() {
      var start = "^" + (this.allowNegative ? "[+|\\-]?" : "");
      var midInput = "(0|([1-9]+\\d*))?";
      var mid = "\\d*";
      var end = (this.scale ? "(" + escapeRegExp(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
      this._numberRegExpInput = new RegExp(start + midInput + end);
      this._numberRegExp = new RegExp(start + mid + end);
      this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(escapeRegExp).join("") + "]", "g");
      this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), "g");
    }
  }, {
    key: "_removeThousandsSeparators",
    value: function _removeThousandsSeparators(value) {
      return value.replace(this._thousandsSeparatorRegExp, "");
    }
  }, {
    key: "_insertThousandsSeparators",
    value: function _insertThousandsSeparators(value) {
      var parts = value.split(this.radix);
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
      return parts.join(this.radix);
    }
  }, {
    key: "doPrepare",
    value: function doPrepare(ch) {
      var _get2;
      ch = ch.replace(this._mapToRadixRegExp, this.radix);
      var noSepCh = this._removeThousandsSeparators(ch);
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var _normalizePrepare = normalizePrepare((_get2 = _get(_getPrototypeOf(MaskedNumber2.prototype), "doPrepare", this)).call.apply(_get2, [this, noSepCh].concat(args))), _normalizePrepare2 = _slicedToArray(_normalizePrepare, 2), prepCh = _normalizePrepare2[0], details = _normalizePrepare2[1];
      if (ch && !noSepCh)
        details.skip = true;
      return [prepCh, details];
    }
  }, {
    key: "_separatorsCount",
    value: function _separatorsCount(to) {
      var extendOnSeparators = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var count = 0;
      for (var pos = 0; pos < to; ++pos) {
        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
          ++count;
          if (extendOnSeparators)
            to += this.thousandsSeparator.length;
        }
      }
      return count;
    }
  }, {
    key: "_separatorsCountFromSlice",
    value: function _separatorsCountFromSlice() {
      var slice = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._value;
      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 ? arguments[2] : void 0;
      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);
      var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);
      fromPos = _this$_adjustRangeWit2[0];
      toPos = _this$_adjustRangeWit2[1];
      return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber2.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
    }
  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (!this.thousandsSeparator)
        return _get(_getPrototypeOf(MaskedNumber2.prototype), "_appendCharRaw", this).call(this, ch, flags);
      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
      this._value = this._removeThousandsSeparators(this.value);
      var appendDetails = _get(_getPrototypeOf(MaskedNumber2.prototype), "_appendCharRaw", this).call(this, ch, flags);
      this._value = this._insertThousandsSeparators(this._value);
      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
      appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
      return appendDetails;
    }
  }, {
    key: "_findSeparatorAround",
    value: function _findSeparatorAround(pos) {
      if (this.thousandsSeparator) {
        var searchFrom = pos - this.thousandsSeparator.length + 1;
        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
        if (separatorPos <= pos)
          return separatorPos;
      }
      return -1;
    }
  }, {
    key: "_adjustRangeWithSeparators",
    value: function _adjustRangeWithSeparators(from, to) {
      var separatorAroundFromPos = this._findSeparatorAround(from);
      if (separatorAroundFromPos >= 0)
        from = separatorAroundFromPos;
      var separatorAroundToPos = this._findSeparatorAround(to);
      if (separatorAroundToPos >= 0)
        to = separatorAroundToPos + this.thousandsSeparator.length;
      return [from, to];
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.value.length;
      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);
      var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);
      fromPos = _this$_adjustRangeWit4[0];
      toPos = _this$_adjustRangeWit4[1];
      var valueBeforePos = this.value.slice(0, fromPos);
      var valueAfterPos = this.value.slice(toPos);
      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
      return new ChangeDetails({
        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
      });
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos, direction) {
      if (!this.thousandsSeparator)
        return cursorPos;
      switch (direction) {
        case DIRECTION.NONE:
        case DIRECTION.LEFT:
        case DIRECTION.FORCE_LEFT: {
          var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
          if (separatorAtLeftPos >= 0) {
            var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
              return separatorAtLeftPos;
            }
          }
          break;
        }
        case DIRECTION.RIGHT:
        case DIRECTION.FORCE_RIGHT: {
          var separatorAtRightPos = this._findSeparatorAround(cursorPos);
          if (separatorAtRightPos >= 0) {
            return separatorAtRightPos + this.thousandsSeparator.length;
          }
        }
      }
      return cursorPos;
    }
  }, {
    key: "doValidate",
    value: function doValidate(flags) {
      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp;
      var valid = regexp.test(this._removeThousandsSeparators(this.value));
      if (valid) {
        var number = this.number;
        valid = valid && !isNaN(number) && (this.min == null || this.min >= 0 || this.min <= this.number) && (this.max == null || this.max <= 0 || this.number <= this.max);
      }
      return valid && _get(_getPrototypeOf(MaskedNumber2.prototype), "doValidate", this).call(this, flags);
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.value) {
        var number = this.number;
        var validnum = number;
        if (this.min != null)
          validnum = Math.max(validnum, this.min);
        if (this.max != null)
          validnum = Math.min(validnum, this.max);
        if (validnum !== number)
          this.unmaskedValue = String(validnum);
        var formatted = this.value;
        if (this.normalizeZeros)
          formatted = this._normalizeZeros(formatted);
        if (this.padFractionalZeros && this.scale > 0)
          formatted = this._padFractionalZeros(formatted);
        this._value = formatted;
      }
      _get(_getPrototypeOf(MaskedNumber2.prototype), "doCommit", this).call(this);
    }
  }, {
    key: "_normalizeZeros",
    value: function _normalizeZeros(value) {
      var parts = this._removeThousandsSeparators(value).split(this.radix);
      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function(match2, sign, zeros, num) {
        return sign + num;
      });
      if (value.length && !/\d$/.test(parts[0]))
        parts[0] = parts[0] + "0";
      if (parts.length > 1) {
        parts[1] = parts[1].replace(/0*$/, "");
        if (!parts[1].length)
          parts.length = 1;
      }
      return this._insertThousandsSeparators(parts.join(this.radix));
    }
  }, {
    key: "_padFractionalZeros",
    value: function _padFractionalZeros(value) {
      if (!value)
        return value;
      var parts = value.split(this.radix);
      if (parts.length < 2)
        parts.push("");
      parts[1] = parts[1].padEnd(this.scale, "0");
      return parts.join(this.radix);
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, ".");
    },
    set: function set2(unmaskedValue) {
      _set(_getPrototypeOf(MaskedNumber2.prototype), "unmaskedValue", unmaskedValue.replace(".", this.radix), this, true);
    }
  }, {
    key: "typedValue",
    get: function get() {
      return Number(this.unmaskedValue);
    },
    set: function set2(n) {
      _set(_getPrototypeOf(MaskedNumber2.prototype), "unmaskedValue", String(n), this, true);
    }
  }, {
    key: "number",
    get: function get() {
      return this.typedValue;
    },
    set: function set2(number) {
      this.typedValue = number;
    }
  }, {
    key: "allowNegative",
    get: function get() {
      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
    }
  }]);
  return MaskedNumber2;
}(Masked);
MaskedNumber.DEFAULTS = {
  radix: ",",
  thousandsSeparator: "",
  mapToRadix: ["."],
  scale: 2,
  signed: false,
  normalizeZeros: true,
  padFractionalZeros: false
};
IMask.MaskedNumber = MaskedNumber;
var MaskedFunction = /* @__PURE__ */ function(_Masked) {
  _inherits(MaskedFunction2, _Masked);
  var _super = _createSuper(MaskedFunction2);
  function MaskedFunction2() {
    _classCallCheck(this, MaskedFunction2);
    return _super.apply(this, arguments);
  }
  _createClass(MaskedFunction2, [{
    key: "_update",
    value: function _update(opts) {
      if (opts.mask)
        opts.validate = opts.mask;
      _get(_getPrototypeOf(MaskedFunction2.prototype), "_update", this).call(this, opts);
    }
  }]);
  return MaskedFunction2;
}(Masked);
IMask.MaskedFunction = MaskedFunction;
var _excluded = ["compiledMasks", "currentMaskRef", "currentMask"];
var MaskedDynamic = /* @__PURE__ */ function(_Masked) {
  _inherits(MaskedDynamic2, _Masked);
  var _super = _createSuper(MaskedDynamic2);
  function MaskedDynamic2(opts) {
    var _this;
    _classCallCheck(this, MaskedDynamic2);
    _this = _super.call(this, Object.assign({}, MaskedDynamic2.DEFAULTS, opts));
    _this.currentMask = null;
    return _this;
  }
  _createClass(MaskedDynamic2, [{
    key: "_update",
    value: function _update(opts) {
      _get(_getPrototypeOf(MaskedDynamic2.prototype), "_update", this).call(this, opts);
      if ("mask" in opts) {
        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function(m) {
          return createMask(m);
        }) : [];
      }
    }
  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var details = this._applyDispatch(ch, flags);
      if (this.currentMask) {
        details.aggregate(this.currentMask._appendChar(ch, flags));
      }
      return details;
    }
  }, {
    key: "_applyDispatch",
    value: function _applyDispatch() {
      var appended = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
      var inputValue = this.rawInputValue;
      var insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
      var tailValue = inputValue.slice(insertValue.length);
      var prevMask = this.currentMask;
      var details = new ChangeDetails();
      var prevMaskState = prevMask && prevMask.state;
      this.currentMask = this.doDispatch(appended, Object.assign({}, flags));
      if (this.currentMask) {
        if (this.currentMask !== prevMask) {
          this.currentMask.reset();
          if (insertValue) {
            var d = this.currentMask.append(insertValue, {
              raw: true
            });
            details.tailShift = d.inserted.length - prevValueBeforeTail.length;
          }
          if (tailValue) {
            details.tailShift += this.currentMask.append(tailValue, {
              raw: true,
              tail: true
            }).tailShift;
          }
        } else {
          this.currentMask.state = prevMaskState;
        }
      }
      return details;
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = this._applyDispatch.apply(this, arguments);
      if (this.currentMask) {
        details.aggregate(this.currentMask._appendPlaceholder());
      }
      return details;
    }
  }, {
    key: "_appendEager",
    value: function _appendEager() {
      var details = this._applyDispatch.apply(this, arguments);
      if (this.currentMask) {
        details.aggregate(this.currentMask._appendEager());
      }
      return details;
    }
  }, {
    key: "doDispatch",
    value: function doDispatch(appended) {
      var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.dispatch(appended, this, flags);
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2, _this$currentMask;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_get2 = _get(_getPrototypeOf(MaskedDynamic2.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask = this.currentMask).doValidate.apply(_this$currentMask, args));
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$currentMask2;
      (_this$currentMask2 = this.currentMask) === null || _this$currentMask2 === void 0 ? void 0 : _this$currentMask2.reset();
      this.compiledMasks.forEach(function(m) {
        return m.reset();
      });
    }
  }, {
    key: "value",
    get: function get() {
      return this.currentMask ? this.currentMask.value : "";
    },
    set: function set2(value) {
      _set(_getPrototypeOf(MaskedDynamic2.prototype), "value", value, this, true);
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.currentMask ? this.currentMask.unmaskedValue : "";
    },
    set: function set2(unmaskedValue) {
      _set(_getPrototypeOf(MaskedDynamic2.prototype), "unmaskedValue", unmaskedValue, this, true);
    }
  }, {
    key: "typedValue",
    get: function get() {
      return this.currentMask ? this.currentMask.typedValue : "";
    },
    set: function set2(value) {
      var unmaskedValue = String(value);
      if (this.currentMask) {
        this.currentMask.typedValue = value;
        unmaskedValue = this.currentMask.unmaskedValue;
      }
      this.unmaskedValue = unmaskedValue;
    }
  }, {
    key: "isComplete",
    get: function get() {
      var _this$currentMask3;
      return Boolean((_this$currentMask3 = this.currentMask) === null || _this$currentMask3 === void 0 ? void 0 : _this$currentMask3.isComplete);
    }
  }, {
    key: "isFilled",
    get: function get() {
      var _this$currentMask4;
      return Boolean((_this$currentMask4 = this.currentMask) === null || _this$currentMask4 === void 0 ? void 0 : _this$currentMask4.isFilled);
    }
  }, {
    key: "remove",
    value: function remove() {
      var details = new ChangeDetails();
      if (this.currentMask) {
        var _this$currentMask5;
        details.aggregate((_this$currentMask5 = this.currentMask).remove.apply(_this$currentMask5, arguments)).aggregate(this._applyDispatch());
      }
      return details;
    }
  }, {
    key: "state",
    get: function get() {
      return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic2.prototype), "state", this), {
        _rawInputValue: this.rawInputValue,
        compiledMasks: this.compiledMasks.map(function(m) {
          return m.state;
        }),
        currentMaskRef: this.currentMask,
        currentMask: this.currentMask && this.currentMask.state
      });
    },
    set: function set2(state) {
      var compiledMasks = state.compiledMasks, currentMaskRef = state.currentMaskRef, currentMask = state.currentMask, maskedState = _objectWithoutProperties(state, _excluded);
      this.compiledMasks.forEach(function(m, mi) {
        return m.state = compiledMasks[mi];
      });
      if (currentMaskRef != null) {
        this.currentMask = currentMaskRef;
        this.currentMask.state = currentMask;
      }
      _set(_getPrototypeOf(MaskedDynamic2.prototype), "state", maskedState, this, true);
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var _this$currentMask6;
      return this.currentMask ? (_this$currentMask6 = this.currentMask).extractInput.apply(_this$currentMask6, arguments) : "";
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this$currentMask7, _get3;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.currentMask ? (_this$currentMask7 = this.currentMask).extractTail.apply(_this$currentMask7, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic2.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.currentMask)
        this.currentMask.doCommit();
      _get(_getPrototypeOf(MaskedDynamic2.prototype), "doCommit", this).call(this);
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos() {
      var _this$currentMask8, _get4;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.currentMask ? (_this$currentMask8 = this.currentMask).nearestInputPos.apply(_this$currentMask8, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic2.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
    }
  }, {
    key: "overwrite",
    get: function get() {
      return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic2.prototype), "overwrite", this);
    },
    set: function set2(overwrite) {
      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
    }
  }, {
    key: "eager",
    get: function get() {
      return this.currentMask ? this.currentMask.eager : _get(_getPrototypeOf(MaskedDynamic2.prototype), "eager", this);
    },
    set: function set2(eager) {
      console.warn('"eager" option is not available in dynamic mask, use this option in siblings');
    }
  }, {
    key: "maskEquals",
    value: function maskEquals(mask) {
      return Array.isArray(mask) && this.compiledMasks.every(function(m, mi) {
        var _mask$mi;
        return m.maskEquals((_mask$mi = mask[mi]) === null || _mask$mi === void 0 ? void 0 : _mask$mi.mask);
      });
    }
  }]);
  return MaskedDynamic2;
}(Masked);
MaskedDynamic.DEFAULTS = {
  dispatch: function dispatch(appended, masked, flags) {
    if (!masked.compiledMasks.length)
      return;
    var inputValue = masked.rawInputValue;
    var inputs = masked.compiledMasks.map(function(m, index) {
      m.reset();
      m.append(inputValue, {
        raw: true
      });
      m.append(appended, flags);
      var weight = m.rawInputValue.length;
      return {
        weight,
        index
      };
    });
    inputs.sort(function(i1, i2) {
      return i2.weight - i1.weight;
    });
    return masked.compiledMasks[inputs[0].index];
  }
};
IMask.MaskedDynamic = MaskedDynamic;
var PIPE_TYPE = {
  MASKED: "value",
  UNMASKED: "unmaskedValue",
  TYPED: "typedValue"
};
function createPipe(mask) {
  var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : PIPE_TYPE.MASKED;
  var to = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : PIPE_TYPE.MASKED;
  var masked = createMask(mask);
  return function(value) {
    return masked.runIsolated(function(m) {
      m[from] = value;
      return m[to];
    });
  };
}
function pipe(value) {
  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    pipeArgs[_key - 1] = arguments[_key];
  }
  return createPipe.apply(void 0, pipeArgs)(value);
}
IMask.PIPE_TYPE = PIPE_TYPE;
IMask.createPipe = createPipe;
IMask.pipe = pipe;
try {
  globalThis.IMask = IMask;
} catch (e) {
}
var esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InputMask,
  "default": IMask,
  Masked,
  MaskedPattern,
  MaskedEnum,
  MaskedRange,
  MaskedNumber,
  MaskedDate,
  MaskedRegExp,
  MaskedFunction,
  MaskedDynamic,
  createMask,
  MaskElement,
  HTMLMaskElement,
  HTMLContenteditableMaskElement,
  PIPE_TYPE,
  createPipe,
  pipe
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(esm);
(function(module, exports) {
  (function(global2, factory) {
    factory(exports, require$$0);
  })(commonjsGlobal, function(exports2, IMask2) {
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var IMask__default = /* @__PURE__ */ _interopDefaultLegacy(IMask2);
    function fireEvent(el, eventName, data) {
      var e = document.createEvent("CustomEvent");
      e.initCustomEvent(eventName, true, true, data);
      el.dispatchEvent(e);
    }
    function initMask(el, opts) {
      var maskRef = opts instanceof IMask__default["default"].InputMask ? opts : IMask__default["default"](el, opts);
      return maskRef.on("accept", function() {
        return fireEvent(el, "accept", maskRef);
      }).on("complete", function() {
        return fireEvent(el, "complete", maskRef);
      });
    }
    function IMaskAction(el, options) {
      var maskRef = options && initMask(el, options);
      function destroy() {
        if (maskRef) {
          maskRef.destroy();
          maskRef = void 0;
        }
      }
      function update2(options2) {
        if (options2) {
          if (maskRef) {
            if (options2 instanceof IMask__default["default"].InputMask)
              maskRef = options2;
            else
              maskRef.updateOptions(options2);
          } else
            maskRef = initMask(el, options2);
        } else {
          destroy();
        }
      }
      return {
        update: update2,
        destroy
      };
    }
    exports2.imask = IMaskAction;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(svelteImask, svelteImask.exports);
var BookingConfirm_svelte_svelte_type_style_lang = "";
function add_css$3(target) {
  append_styles(target, "bit-j3u39s", ".form-field.bit-j3u39s.bit-j3u39s{display:flex;flex-direction:column;margin-top:10px}.form-field.bit-j3u39s label.bit-j3u39s{margin-bottom:5px}.fio.bit-j3u39s.bit-j3u39s{margin-top:5px}.input.bit-j3u39s.bit-j3u39s{padding:10px 10px;border-color:var(--bit-ca-border-color);border-style:solid;border-width:1px;border-radius:var(--border-radius-base)}.input.bit-j3u39s.bit-j3u39s:focus,.input.bit-j3u39s.bit-j3u39s:focus-visible{outline-width:1px;outline-style:solid;outline-color:var(--bit-ca-accent-lighter-color)}.booking-confirm.bit-j3u39s.bit-j3u39s{display:flex;color:#464646}.summary.bit-j3u39s.bit-j3u39s{flex:1 1 auto;padding:16px;background-color:var(--bit-ca-bg);border-radius:var(--border-radius-base);border:1px solid #ddd}.summ.bit-j3u39s.bit-j3u39s{display:flex;justify-content:space-between;padding-right:13px;font-size:1.15rem;font-weight:600}.place-name.bit-j3u39s.bit-j3u39s{font-weight:500}.contact.bit-j3u39s.bit-j3u39s{flex:1 1 auto;padding:0 16px}.confirm-btn.bit-j3u39s.bit-j3u39s{width:100%;padding:12px 20px;margin-top:20px;background-color:var(--bit-ca-accent-color);color:white;font-weight:700;border:none;border-radius:var(--border-radius-base);cursor:pointer}.confirm-btn.bit-j3u39s.bit-j3u39s:disabled{background-color:var(--bit-ca-accent-lighter-color)}.section.bit-j3u39s.bit-j3u39s{margin-top:1rem}.products.bit-j3u39s.bit-j3u39s{margin-top:1rem}.product.bit-j3u39s.bit-j3u39s{display:flex;padding:2px 0;margin-bottom:6px;border-radius:var(--border-radius-base)}.product.bit-j3u39s>div.bit-j3u39s{padding:4px 12px}.product.bit-j3u39s>div.bit-j3u39s:first-child{padding-left:0}.product-day.bit-j3u39s.bit-j3u39s{min-width:70px}.product-amount.bit-j3u39s.bit-j3u39s{min-width:80px;text-align:right}.product-duration.bit-j3u39s.bit-j3u39s{min-width:100px;text-align:right}@media(max-width: 640px){.booking-confirm.bit-j3u39s.bit-j3u39s{flex-direction:column}.contact.bit-j3u39s.bit-j3u39s{margin-top:1rem}.fio.bit-j3u39s.bit-j3u39s{display:flex;flex-direction:column}.fio.bit-j3u39s input.bit-j3u39s:first-child{margin-bottom:10px}}.mobile-view .products.bit-j3u39s.bit-j3u39s{max-height:300px;overflow:auto}.mobile-view .product.bit-j3u39s>div.bit-j3u39s{padding:4px 6px}.mobile-view .product.bit-j3u39s .product-amount.bit-j3u39s{min-width:40px;flex:1}.mobile-view .product.bit-j3u39s .product-duration.bit-j3u39s{min-width:80px}.select.bit-j3u39s.bit-j3u39s{padding:10px 10px;border-color:var(--bit-ca-border-color);border-style:solid;border-width:1px;border-radius:var(--border-radius-base)}.select.bit-j3u39s.bit-j3u39s:focus,.select.bit-j3u39s.bit-j3u39s:focus-visible{outline-width:1px;outline-style:solid;outline-color:var(--bit-ca-accent-lighter-color)}");
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  return child_ctx;
}
function create_if_block_2$2(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(ctx[2]);
      attr(div, "class", "place-name bit-j3u39s");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_1$2(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(ctx[3]);
      attr(div, "class", "place-addr");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8)
        set_data(t, ctx2[3]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$2(ctx) {
  let div;
  let t_value = ctx[1].name + "";
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "section bit-j3u39s");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t_value !== (t_value = ctx2[1].name + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_each_block_1$1(ctx) {
  let div4;
  let div0;
  let t0_value = ctx[24].day + "";
  let t0;
  let t1;
  let div1;
  let t2_value = ctx[24].fromToName + "";
  let t2;
  let t3;
  let div2;
  let t4_value = ctx[24].duration + "";
  let t4;
  let t5;
  let div3;
  let fmtCurrency_action;
  let t6;
  let mounted;
  let dispose;
  return {
    c() {
      div4 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      div2 = element("div");
      t4 = text(t4_value);
      t5 = space();
      div3 = element("div");
      t6 = space();
      attr(div0, "class", "product-day bit-j3u39s");
      attr(div1, "class", "product-time bit-j3u39s");
      attr(div2, "class", "product-duration bit-j3u39s");
      attr(div3, "class", "product-amount bit-j3u39s");
      attr(div4, "class", "product bit-j3u39s");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div0);
      append(div0, t0);
      append(div4, t1);
      append(div4, div1);
      append(div1, t2);
      append(div4, t3);
      append(div4, div2);
      append(div2, t4);
      append(div4, t5);
      append(div4, div3);
      append(div4, t6);
      if (!mounted) {
        dispose = action_destroyer(fmtCurrency_action = fmtCurrency.call(null, div3, ctx[24].amount));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 128 && t0_value !== (t0_value = ctx[24].day + ""))
        set_data(t0, t0_value);
      if (dirty & 128 && t2_value !== (t2_value = ctx[24].fromToName + ""))
        set_data(t2, t2_value);
      if (dirty & 128 && t4_value !== (t4_value = ctx[24].duration + ""))
        set_data(t4, t4_value);
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty & 128)
        fmtCurrency_action.update.call(null, ctx[24].amount);
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$1(ctx) {
  let option;
  let t0_value = ctx[8].name + "";
  let t0;
  let t1;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t0 = text(t0_value);
      t1 = space();
      option.__value = option_value_value = ctx[8];
      option.value = option.__value;
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t0);
      append(option, t1);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(option);
    }
  };
}
function create_fragment$3(ctx) {
  let div11;
  let div4;
  let t0;
  let t1;
  let t2;
  let div0;
  let t3;
  let hr;
  let t4;
  let div3;
  let div1;
  let t6;
  let div2;
  let fmtCurrency_action;
  let t7;
  let div10;
  let div5;
  let t9;
  let div6;
  let input0;
  let t10;
  let input1;
  let t11;
  let div7;
  let label0;
  let t13;
  let input2;
  let t14;
  let div8;
  let label1;
  let t16;
  let input3;
  let t17;
  let div9;
  let label2;
  let t19;
  let select;
  let option;
  let t21;
  let button;
  let t22_value = ctx[6] ? "\u0411\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435..." : "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
  let t22;
  let mounted;
  let dispose;
  let if_block0 = ctx[2] && create_if_block_2$2(ctx);
  let if_block1 = ctx[3] && create_if_block_1$2(ctx);
  let if_block2 = ctx[1] && create_if_block$2(ctx);
  let each_value_1 = ctx[7].bookingsArray;
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }
  let each_value = ctx[13];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      div11 = element("div");
      div4 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      div0 = element("div");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t3 = space();
      hr = element("hr");
      t4 = space();
      div3 = element("div");
      div1 = element("div");
      div1.textContent = "\u0418\u0442\u043E\u0433\u043E";
      t6 = space();
      div2 = element("div");
      t7 = space();
      div10 = element("div");
      div5 = element("div");
      div5.textContent = "\u041A\u043E\u043D\u0442\u0430\u043A\u0442";
      t9 = space();
      div6 = element("div");
      input0 = element("input");
      t10 = space();
      input1 = element("input");
      t11 = space();
      div7 = element("div");
      label0 = element("label");
      label0.textContent = "\u0422\u0435\u043B\u0435\u0444\u043E\u043D";
      t13 = space();
      input2 = element("input");
      t14 = space();
      div8 = element("div");
      label1 = element("label");
      label1.textContent = "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430";
      t16 = space();
      input3 = element("input");
      t17 = space();
      div9 = element("div");
      label2 = element("label");
      label2.textContent = "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C";
      t19 = space();
      select = element("select");
      option = element("option");
      option.textContent = "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E";
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t21 = space();
      button = element("button");
      t22 = text(t22_value);
      attr(div0, "class", "products bit-j3u39s");
      attr(hr, "class", "line");
      attr(div3, "class", "summ fg-primary bit-j3u39s");
      attr(div4, "class", "summary bit-j3u39s");
      attr(input0, "class", "input bit-j3u39s");
      attr(input0, "type", "text");
      attr(input0, "name", "name");
      attr(input0, "placeholder", "\u0418\u043C\u044F");
      attr(input1, "class", "input bit-j3u39s");
      attr(input1, "type", "text");
      attr(input1, "name", "surname");
      attr(input1, "placeholder", "\u0424\u0430\u043C\u0438\u043B\u0438\u044F");
      attr(div6, "class", "fio bit-j3u39s");
      attr(label0, "for", "");
      attr(label0, "class", "bit-j3u39s");
      attr(input2, "class", "input bit-j3u39s");
      attr(input2, "type", "tel");
      attr(input2, "name", "phone");
      attr(div7, "class", "form-field bit-j3u39s");
      attr(label1, "for", "");
      attr(label1, "class", "bit-j3u39s");
      attr(input3, "class", "input bit-j3u39s");
      attr(input3, "type", "email");
      attr(input3, "name", "email");
      attr(input3, "placeholder", "e-mail");
      attr(div8, "class", "form-field bit-j3u39s");
      attr(label2, "for", "");
      attr(label2, "class", "bit-j3u39s");
      option.__value = null;
      option.value = option.__value;
      attr(select, "class", "select bit-j3u39s");
      if (ctx[8] === void 0)
        add_render_callback(() => ctx[19].call(select));
      attr(div9, "class", "form-field bit-j3u39s");
      attr(button, "class", "confirm-btn bit-j3u39s");
      attr(button, "type", "button");
      button.disabled = ctx[6];
      attr(div10, "class", "contact bit-j3u39s");
      attr(div11, "class", "booking-confirm bit-j3u39s");
    },
    m(target, anchor) {
      insert(target, div11, anchor);
      append(div11, div4);
      if (if_block0)
        if_block0.m(div4, null);
      append(div4, t0);
      if (if_block1)
        if_block1.m(div4, null);
      append(div4, t1);
      if (if_block2)
        if_block2.m(div4, null);
      append(div4, t2);
      append(div4, div0);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(div0, null);
      }
      append(div4, t3);
      append(div4, hr);
      append(div4, t4);
      append(div4, div3);
      append(div3, div1);
      append(div3, t6);
      append(div3, div2);
      append(div11, t7);
      append(div11, div10);
      append(div10, div5);
      append(div10, t9);
      append(div10, div6);
      append(div6, input0);
      set_input_value(input0, ctx[4].name);
      append(div6, t10);
      append(div6, input1);
      set_input_value(input1, ctx[4].surname);
      append(div10, t11);
      append(div10, div7);
      append(div7, label0);
      append(div7, t13);
      append(div7, input2);
      set_input_value(input2, ctx[5]);
      append(div10, t14);
      append(div10, div8);
      append(div8, label1);
      append(div8, t16);
      append(div8, input3);
      set_input_value(input3, ctx[4].email);
      append(div10, t17);
      append(div10, div9);
      append(div9, label2);
      append(div9, t19);
      append(div9, select);
      append(select, option);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }
      select_option(select, ctx[8]);
      append(div10, t21);
      append(div10, button);
      append(button, t22);
      if (!mounted) {
        dispose = [
          action_destroyer(fmtCurrency_action = fmtCurrency.call(null, div2, ctx[7].totalAmount)),
          listen(input0, "input", ctx[15]),
          listen(input1, "input", ctx[16]),
          listen(input2, "input", ctx[17]),
          action_destroyer(svelteImask.exports.imask.call(null, input2, ctx[9])),
          listen(input2, "accept", ctx[11]),
          listen(input2, "complete", ctx[12]),
          listen(input3, "input", ctx[18]),
          listen(select, "change", ctx[19]),
          listen(button, "click", ctx[10])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[2]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2$2(ctx2);
          if_block0.c();
          if_block0.m(div4, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1$2(ctx2);
          if_block1.c();
          if_block1.m(div4, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (ctx2[1]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block$2(ctx2);
          if_block2.c();
          if_block2.m(div4, t2);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & 128) {
        each_value_1 = ctx2[7].bookingsArray;
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$1(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_1$1(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(div0, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty & 128)
        fmtCurrency_action.update.call(null, ctx2[7].totalAmount);
      if (dirty & 16 && input0.value !== ctx2[4].name) {
        set_input_value(input0, ctx2[4].name);
      }
      if (dirty & 16 && input1.value !== ctx2[4].surname) {
        set_input_value(input1, ctx2[4].surname);
      }
      if (dirty & 32) {
        set_input_value(input2, ctx2[5]);
      }
      if (dirty & 16 && input3.value !== ctx2[4].email) {
        set_input_value(input3, ctx2[4].email);
      }
      if (dirty & 8192) {
        each_value = ctx2[13];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & 8448) {
        select_option(select, ctx2[8]);
      }
      if (dirty & 64 && t22_value !== (t22_value = ctx2[6] ? "\u0411\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435..." : "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C"))
        set_data(t22, t22_value);
      if (dirty & 64) {
        button.disabled = ctx2[6];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div11);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let $selectedSlotsStore, $$unsubscribe_selectedSlotsStore = noop, $$subscribe_selectedSlotsStore = () => ($$unsubscribe_selectedSlotsStore(), $$unsubscribe_selectedSlotsStore = subscribe(selectedSlotsStore, ($$value) => $$invalidate(7, $selectedSlotsStore = $$value)), selectedSlotsStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_selectedSlotsStore());
  let { selectedSlotsStore } = $$props;
  $$subscribe_selectedSlotsStore();
  let { activeSection = null } = $$props;
  let { placeName = "" } = $$props;
  let { placeAddress = "" } = $$props;
  let { postBooking } = $$props;
  const contact = {
    name: "",
    surname: "",
    email: "",
    phone: ""
  };
  let phoneValue = "";
  let loading = false;
  const dispatch2 = createEventDispatcher();
  const options = {
    mask: "{+7} (000) 000 00 00",
    lazy: false
  };
  let activity = null;
  async function onBooking() {
    const resultValid = valid();
    if (resultValid !== true) {
      return alert(resultValid);
    }
    try {
      $$invalidate(6, loading = true);
      const result = await postBooking(contact, { activity });
      dispatch2("ok", result);
    } catch (error) {
      dispatch2("error", error);
    } finally {
      $$invalidate(6, loading = false);
    }
  }
  function accept({ detail: maskRef }) {
    $$invalidate(5, phoneValue = maskRef.value);
  }
  function complete({ detail: maskRef }) {
    $$invalidate(4, contact.phone = String(Number.parseInt(maskRef.unmaskedValue)), contact);
  }
  function valid() {
    if (contact.name.trim().length < 3) {
      return "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0438\u043C\u044F";
    }
    if (contact.surname.trim().length < 3) {
      return "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u0430\u043C\u0438\u043B\u0438\u044E";
    }
    if (contact.phone.length !== 11) {
      return "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D";
    }
    if (contact.email.length < 3) {
      return "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u043E\u0447\u0442\u0443";
    }
    if (!activity) {
      return "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C";
    }
    return true;
  }
  const activities = [
    {
      name: "\u0411\u0430\u0441\u043A\u0435\u0442\u0431\u043E\u043B",
      fs_id: 8,
      is_sport: true,
      id: 3,
      created_at: "2022-11-13T20:38:06.823707+00:00",
      updated_at: "2022-11-13T20:38:06.823707+00:00"
    },
    {
      name: "\u0412\u043E\u043B\u0435\u0439\u0431\u043E\u043B",
      fs_id: 16,
      is_sport: true,
      id: 4,
      created_at: "2022-11-13T20:38:07.150054+00:00",
      updated_at: "2022-11-13T20:38:07.150054+00:00"
    },
    {
      name: "\u0422\u0430\u043D\u0446\u044B",
      fs_id: 128,
      is_sport: false,
      id: 5,
      created_at: "2022-11-13T20:38:07.267753+00:00",
      updated_at: "2022-11-13T20:38:07.267753+00:00"
    },
    {
      name: "\u0415\u0434\u0438\u043D\u043E\u0431\u043E\u0440\u0441\u0442\u0432\u043E",
      fs_id: 64,
      is_sport: true,
      id: 6,
      created_at: "2022-11-13T20:38:07.367926+00:00",
      updated_at: "2022-11-13T20:38:07.367926+00:00"
    },
    {
      name: "\u0414\u0440\u0443\u0433\u043E\u0435",
      fs_id: 0,
      is_sport: true,
      id: 7,
      created_at: "2022-11-13T20:38:07.467955+00:00",
      updated_at: "2022-11-13T20:38:07.467955+00:00"
    },
    {
      name: "\u0419\u043E\u0433\u0430",
      fs_id: 2048,
      is_sport: false,
      id: 8,
      created_at: "2022-11-13T20:38:07.586913+00:00",
      updated_at: "2022-11-13T20:38:07.586913+00:00"
    },
    {
      name: "\u0424\u0443\u0442\u0431\u043E\u043B",
      fs_id: 4,
      is_sport: true,
      id: 1,
      created_at: "2021-10-10T16:20:22.670969+00:00",
      updated_at: "2021-10-10T16:20:22.670969+00:00"
    }
  ];
  function input0_input_handler() {
    contact.name = this.value;
    $$invalidate(4, contact);
  }
  function input1_input_handler() {
    contact.surname = this.value;
    $$invalidate(4, contact);
  }
  function input2_input_handler() {
    phoneValue = this.value;
    $$invalidate(5, phoneValue);
  }
  function input3_input_handler() {
    contact.email = this.value;
    $$invalidate(4, contact);
  }
  function select_change_handler() {
    activity = select_value(this);
    $$invalidate(8, activity);
    $$invalidate(13, activities);
  }
  $$self.$$set = ($$props2) => {
    if ("selectedSlotsStore" in $$props2)
      $$subscribe_selectedSlotsStore($$invalidate(0, selectedSlotsStore = $$props2.selectedSlotsStore));
    if ("activeSection" in $$props2)
      $$invalidate(1, activeSection = $$props2.activeSection);
    if ("placeName" in $$props2)
      $$invalidate(2, placeName = $$props2.placeName);
    if ("placeAddress" in $$props2)
      $$invalidate(3, placeAddress = $$props2.placeAddress);
    if ("postBooking" in $$props2)
      $$invalidate(14, postBooking = $$props2.postBooking);
  };
  return [
    selectedSlotsStore,
    activeSection,
    placeName,
    placeAddress,
    contact,
    phoneValue,
    loading,
    $selectedSlotsStore,
    activity,
    options,
    onBooking,
    accept,
    complete,
    activities,
    postBooking,
    input0_input_handler,
    input1_input_handler,
    input2_input_handler,
    input3_input_handler,
    select_change_handler
  ];
}
class BookingConfirm extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      selectedSlotsStore: 0,
      activeSection: 1,
      placeName: 2,
      placeAddress: 3,
      postBooking: 14
    }, add_css$3);
  }
}
var Icon_svelte_svelte_type_style_lang = "";
function add_css$2(target) {
  append_styles(target, "bit-jmrrtm", ".icon.bit-jmrrtm{display:inline-flex}");
}
function create_if_block_7$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "stroke-width", ctx[3]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_6$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "stroke-width", ctx[3]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_5$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M6 18L18 6M6 6l12 12");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "stroke-width", ctx[3]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_4$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "stroke-width", ctx[3]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_3$1(ctx) {
  let svg;
  let path0;
  let path1;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path0, "d", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z");
      attr(path1, "stroke-linecap", "round");
      attr(path1, "stroke-linejoin", "round");
      attr(path1, "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "stroke-width", ctx[3]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path0);
      append(svg, path1);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_2$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M15 19l-7-7 7-7");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", ctx[3]);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block_1$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M9 5l7 7-7 7");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", ctx[3]);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_if_block$1(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "d", "M5 13l4 4L19 7");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", svg_class_value = null_to_empty(ctx[4].class) + " bit-jmrrtm");
      set_style(svg, "height", ctx[0]);
      set_style(svg, "width", ctx[1]);
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", ctx[3]);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && svg_class_value !== (svg_class_value = null_to_empty(ctx2[4].class) + " bit-jmrrtm")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & 1) {
        set_style(svg, "height", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(svg, "width", ctx2[1]);
      }
      if (dirty & 8) {
        attr(svg, "stroke-width", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function create_fragment$2(ctx) {
  let span;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let t5;
  let t6;
  let mounted;
  let dispose;
  let if_block0 = ctx[2] === "clipboard-check" && create_if_block_7$1(ctx);
  let if_block1 = ctx[2] === "exclamation-circle" && create_if_block_6$1(ctx);
  let if_block2 = ctx[2] === "x" && create_if_block_5$1(ctx);
  let if_block3 = ctx[2] === "x-circle" && create_if_block_4$1(ctx);
  let if_block4 = ctx[2] === "cog" && create_if_block_3$1(ctx);
  let if_block5 = ctx[2] === "chevron-left" && create_if_block_2$1(ctx);
  let if_block6 = ctx[2] === "chevron-right" && create_if_block_1$1(ctx);
  let if_block7 = ctx[2] === "check" && create_if_block$1(ctx);
  return {
    c() {
      span = element("span");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      if (if_block3)
        if_block3.c();
      t3 = space();
      if (if_block4)
        if_block4.c();
      t4 = space();
      if (if_block5)
        if_block5.c();
      t5 = space();
      if (if_block6)
        if_block6.c();
      t6 = space();
      if (if_block7)
        if_block7.c();
      attr(span, "class", "icon bit-jmrrtm");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if (if_block0)
        if_block0.m(span, null);
      append(span, t0);
      if (if_block1)
        if_block1.m(span, null);
      append(span, t1);
      if (if_block2)
        if_block2.m(span, null);
      append(span, t2);
      if (if_block3)
        if_block3.m(span, null);
      append(span, t3);
      if (if_block4)
        if_block4.m(span, null);
      append(span, t4);
      if (if_block5)
        if_block5.m(span, null);
      append(span, t5);
      if (if_block6)
        if_block6.m(span, null);
      append(span, t6);
      if (if_block7)
        if_block7.m(span, null);
      if (!mounted) {
        dispose = listen(span, "click", ctx[6]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[2] === "clipboard-check") {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_7$1(ctx2);
          if_block0.c();
          if_block0.m(span, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[2] === "exclamation-circle") {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_6$1(ctx2);
          if_block1.c();
          if_block1.m(span, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (ctx2[2] === "x") {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_5$1(ctx2);
          if_block2.c();
          if_block2.m(span, t2);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (ctx2[2] === "x-circle") {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_4$1(ctx2);
          if_block3.c();
          if_block3.m(span, t3);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (ctx2[2] === "cog") {
        if (if_block4) {
          if_block4.p(ctx2, dirty);
        } else {
          if_block4 = create_if_block_3$1(ctx2);
          if_block4.c();
          if_block4.m(span, t4);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      if (ctx2[2] === "chevron-left") {
        if (if_block5) {
          if_block5.p(ctx2, dirty);
        } else {
          if_block5 = create_if_block_2$1(ctx2);
          if_block5.c();
          if_block5.m(span, t5);
        }
      } else if (if_block5) {
        if_block5.d(1);
        if_block5 = null;
      }
      if (ctx2[2] === "chevron-right") {
        if (if_block6) {
          if_block6.p(ctx2, dirty);
        } else {
          if_block6 = create_if_block_1$1(ctx2);
          if_block6.c();
          if_block6.m(span, t6);
        }
      } else if (if_block6) {
        if_block6.d(1);
        if_block6 = null;
      }
      if (ctx2[2] === "check") {
        if (if_block7) {
          if_block7.p(ctx2, dirty);
        } else {
          if_block7 = create_if_block$1(ctx2);
          if_block7.c();
          if_block7.m(span, null);
        }
      } else if (if_block7) {
        if_block7.d(1);
        if_block7 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(span);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      if (if_block4)
        if_block4.d();
      if (if_block5)
        if_block5.d();
      if (if_block6)
        if_block6.d();
      if (if_block7)
        if_block7.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { name } = $$props;
  let { h = "1.5rem" } = $$props;
  let { w = "1.5rem" } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { size = null } = $$props;
  onMount(() => {
    if (size) {
      $$invalidate(0, h = $$invalidate(1, w = size));
    }
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign$2(assign$2({}, $$props), exclude_internal_props($$new_props)));
    if ("name" in $$new_props)
      $$invalidate(2, name = $$new_props.name);
    if ("h" in $$new_props)
      $$invalidate(0, h = $$new_props.h);
    if ("w" in $$new_props)
      $$invalidate(1, w = $$new_props.w);
    if ("strokeWidth" in $$new_props)
      $$invalidate(3, strokeWidth = $$new_props.strokeWidth);
    if ("size" in $$new_props)
      $$invalidate(5, size = $$new_props.size);
  };
  $$props = exclude_internal_props($$props);
  return [h, w, name, strokeWidth, $$props, size, click_handler];
}
class Icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      name: 2,
      h: 0,
      w: 1,
      strokeWidth: 3,
      size: 5
    }, add_css$2);
  }
}
var BookingModal_svelte_svelte_type_style_lang = "";
function add_css$1(target) {
  append_styles(target, "bit-1jgz48w", ".ellipsis.bit-1jgz48w.bit-1jgz48w{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.mobile-view .overlay.bit-1jgz48w.bit-1jgz48w{position:fixed;padding:0}.mobile-view .overlay.bit-1jgz48w .content.bit-1jgz48w{height:100%;min-width:280px !important;border-radius:0;width:100%}.overlay.bit-1jgz48w.bit-1jgz48w{position:absolute;top:0;bottom:0;right:0;left:0;padding:1rem;background-color:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;z-index:10}.overlay[data-position=center].bit-1jgz48w.bit-1jgz48w{align-items:center}.overlay[data-position=top].bit-1jgz48w.bit-1jgz48w{align-items:flex-start}.overlay[data-position=bottom].bit-1jgz48w.bit-1jgz48w{align-items:flex-end}.overlay.bit-1jgz48w .content.bit-1jgz48w{background-color:white;border-radius:var(--border-radius-base);padding:10px;min-width:480px}.overlay.bit-1jgz48w .header.bit-1jgz48w{display:flex;font-size:1.2rem;font-weight:500;align-items:center;justify-content:space-between;margin-bottom:0.8rem}.overlay.bit-1jgz48w .close-icon{cursor:pointer;color:rgba(0, 0, 0, 0.5)}.overlay.bit-1jgz48w .close-icon:hover{color:currentColor}");
}
const get_header_slot_changes = (dirty) => ({});
const get_header_slot_context = (ctx) => ({});
function create_fragment$1(ctx) {
  let div4;
  let div3;
  let div1;
  let div0;
  let t0;
  let t1;
  let t2;
  let icon;
  let t3;
  let div2;
  let current;
  let mounted;
  let dispose;
  const header_slot_template = ctx[6].header;
  const header_slot = create_slot(header_slot_template, ctx, ctx[5], get_header_slot_context);
  icon = new Icon({
    props: { name: "x", class: "close-icon" }
  });
  icon.$on("click", ctx[7]);
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      t0 = text(ctx[0]);
      t1 = space();
      if (header_slot)
        header_slot.c();
      t2 = space();
      create_component(icon.$$.fragment);
      t3 = space();
      div2 = element("div");
      if (default_slot)
        default_slot.c();
      attr(div0, "class", "ellipsis bit-1jgz48w");
      attr(div1, "class", "header bit-1jgz48w");
      set_style(div2, "height", "calc(100% - 60px)");
      set_style(div2, "overflow", "auto");
      attr(div3, "class", "content bit-1jgz48w");
      attr(div4, "class", "overlay bit-1jgz48w");
      attr(div4, "data-position", ctx[1]);
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div3);
      append(div3, div1);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      if (header_slot) {
        header_slot.m(div0, null);
      }
      append(div1, t2);
      mount_component(icon, div1, null);
      append(div3, t3);
      append(div3, div2);
      if (default_slot) {
        default_slot.m(div2, null);
      }
      ctx[8](div3);
      current = true;
      if (!mounted) {
        dispose = listen(div4, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (header_slot) {
        if (header_slot.p && (!current || dirty & 32)) {
          update_slot_base(header_slot, header_slot_template, ctx2, ctx2[5], !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(header_slot_template, ctx2[5], dirty, get_header_slot_changes), get_header_slot_context);
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[5], !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        attr(div4, "data-position", ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(header_slot, local);
      transition_in(icon.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header_slot, local);
      transition_out(icon.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      if (header_slot)
        header_slot.d(detaching);
      destroy_component(icon);
      if (default_slot)
        default_slot.d(detaching);
      ctx[8](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { title = "" } = $$props;
  let { position = "top" } = $$props;
  const dispatch2 = createEventDispatcher();
  let contentEl;
  function onOverlayClick(e) {
    const target = e.target;
    if (contentEl.contains(target)) {
      return;
    }
    dispatch2("overlayClick", e);
  }
  const click_handler = (e) => dispatch2("close", e);
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contentEl = $$value;
      $$invalidate(2, contentEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(0, title = $$props2.title);
    if ("position" in $$props2)
      $$invalidate(1, position = $$props2.position);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [
    title,
    position,
    contentEl,
    dispatch2,
    onOverlayClick,
    $$scope,
    slots,
    click_handler,
    div3_binding
  ];
}
class BookingModal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { title: 0, position: 1 }, add_css$1);
  }
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set2(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set2) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2);
      if (auto) {
        set2(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
const isMobile = isMobileCheck();
function isMobileCheck() {
  if (typeof window === "undefined") {
    return false;
  }
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
      check = true;
  })(navigator.userAgent || navigator.vendor || window["opera"]);
  return check;
}
function createSlotsStore() {
  const storeSlots = writable({});
  const selectedSlots = selectedSlotsFromStore(storeSlots);
  function clearStore() {
    storeSlots.set({});
  }
  function storeUpdateSlot(id, val) {
    storeSlots.update((currentValue) => {
      currentValue[id] = __spreadValues(__spreadValues({}, currentValue[id] || {}), val);
      return currentValue;
    });
  }
  function storeUpdate(value) {
    storeSlots.update((currentValue) => {
      Object.entries(value).forEach(([id, val]) => {
        currentValue[+id] = __spreadValues(__spreadValues({}, currentValue[+id] || {}), val || {});
      });
      return currentValue;
    });
  }
  function loadSlots(slots, deltaHour = 0.5) {
    const storeVal = {};
    const getNextDt = (l) => addMinutes(l, deltaHour * 60);
    let lastDt, nextDt, lastSlot;
    const availableFrom = Date.now() + 5 * 60 * 1e3;
    slots.forEach((s) => {
      const dt = new Date(s.dt);
      const id = +dt;
      s.is_available = s.is_available && id > availableFrom;
      if (lastDt && id >= nextDt) {
        lastDt = null;
      }
      if (!lastDt) {
        lastDt = id;
        nextDt = getNextDt(lastDt);
        lastSlot = __spreadProps(__spreadValues({}, s), {
          dt: id,
          nextDt: +nextDt
        });
        storeVal[id] = lastSlot;
      }
      if (id > lastDt && id < nextDt) {
        lastSlot.amount += s.amount;
        lastSlot.is_available = lastSlot.is_available && s.is_available;
      }
    });
    storeUpdate(storeVal);
  }
  return {
    clearStore,
    storeSlots,
    selectedSlots,
    storeUpdateSlot,
    storeUpdate,
    loadSlots
  };
}
function selectedSlotsFromStore(storeSlots) {
  return derived(storeSlots, ($slots, set2) => {
    const selected = Object.values($slots).filter((s) => s.selected);
    const totalAmount = selected.reduce((acc, cur) => {
      acc += cur.amount;
      return acc;
    }, 0);
    const selectedRecords = selected.reduce((acc, cur) => {
      acc[cur.dt] = cur;
      return acc;
    }, {});
    selected.sort((a, b) => a.dt - b.dt);
    const bookings = {};
    let bookingIdx = 0;
    for (const slot of selected) {
      if (!bookings[bookingIdx]) {
        bookings[bookingIdx] = {
          slots: [slot]
        };
      } else {
        bookings[bookingIdx].slots.push(slot);
      }
      bookings[bookingIdx].from = bookings[bookingIdx].slots[0].dt;
      bookings[bookingIdx].to = bookings[bookingIdx].slots[bookings[bookingIdx].slots.length - 1].nextDt;
      bookings[bookingIdx].day = formatDate(bookings[bookingIdx].from, "d MMM, EEEEEE");
      if (isMobile) {
        bookings[bookingIdx].fromToName = `${formatDate(bookings[bookingIdx].from, "HH:mm")} \u2014 ${formatDate(bookings[bookingIdx].to, "HH:mm")}`;
      } else {
        bookings[bookingIdx].fromToName = `\u0441 ${formatDate(bookings[bookingIdx].from, "HH:mm")} \u043F\u043E ${formatDate(bookings[bookingIdx].to, "HH:mm")}`;
      }
      const durationHours = (bookings[bookingIdx].to - bookings[bookingIdx].from) / (3600 * 1e3);
      bookings[bookingIdx].durationHours = durationHours;
      bookings[bookingIdx].duration = formatDateDuration({
        hours: Math.floor(durationHours),
        minutes: (durationHours - Math.floor(durationHours)) * 60 || void 0
      }, {
        short: isMobile
      });
      bookings[bookingIdx].amount = bookings[bookingIdx].slots.reduce((acc, cur) => {
        acc += cur.amount;
        return acc;
      }, 0);
      if (!selectedRecords[slot.nextDt]) {
        bookingIdx++;
      }
    }
    const bookingsArray = Object.values(bookings);
    set2({
      selected,
      selectedRecords,
      bookings,
      totalAmount,
      bookingsArray
    });
  });
}
var BookingCalendar_svelte_svelte_type_style_lang = "";
function add_css(target) {
  append_styles(target, "bit-yolhwc", ':root{--bit-ca-bg:#fafafa;--bit-ca-bg2:#f5f5f5;--bit-ca-secondary-color:#999999;--bit-ca-secondary-color2:#767676;--bit-ca-border-color:#ddd;--bit-ca-accent-color:#13985f;--bit-ca-accent-lighter-color:#15b670c9;--border-radius-base:8px}.fg-primary{color:var(--bit-ca-accent-color)}.calendar.bit-yolhwc.bit-yolhwc.bit-yolhwc{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;font-size:14px;width:var(--calendarWidth, 980px);margin:0 auto;padding:10px;background-color:var(--bit-ca-bg, #fafafa);position:relative;height:calc(100vh - 16px);overflow-y:auto;overflow-x:hidden;--sideWidth:60px}.calendar.bit-yolhwc .basket-panel__mobile-price.bit-yolhwc.bit-yolhwc{display:none}.calendar.mobile-view.bit-yolhwc.bit-yolhwc.bit-yolhwc{padding:0;--sideWidth:40px}.calendar.mobile-view.bit-yolhwc .basket-panel.bit-yolhwc.bit-yolhwc{padding-left:0;padding-right:0;padding-bottom:16px;position:sticky;top:0}.calendar.mobile-view.bit-yolhwc .basket-panel .basket-panel__section-tabs.bit-yolhwc.bit-yolhwc{margin-bottom:8px}.calendar.mobile-view.bit-yolhwc .basket-panel .basket-panel__basket.bit-yolhwc.bit-yolhwc{display:none}.calendar.mobile-view.bit-yolhwc .calendar__header.bit-yolhwc.bit-yolhwc{position:sticky;top:147px;height:40px;padding-bottom:4px}.calendar.mobile-view.bit-yolhwc .calendar__row-slots .calendar__slot.bit-yolhwc.bit-yolhwc{padding:0 4px}.calendar.mobile-view.bit-yolhwc .basket-panel__mobile-price.bit-yolhwc.bit-yolhwc{display:flex;align-items:center;justify-content:center}.calendar.mobile-view.bit-yolhwc .btn--mobile-full.bit-yolhwc.bit-yolhwc{width:100%}.calendar.mobile-view.bit-yolhwc .basket-panel__booking-btn.bit-yolhwc>button.bit-yolhwc{width:140px}.calendar.no-sections.bit-yolhwc .calendar__header.bit-yolhwc.bit-yolhwc{top:104px}.calendar.bit-yolhwc .basket-panel.bit-yolhwc.bit-yolhwc{background-color:var(--bit-ca-bg, #fafafa);padding:0 1rem 2rem 1rem}.calendar.bit-yolhwc .basket-panel__section-tabs.bit-yolhwc.bit-yolhwc{height:35px;display:flex;width:fit-content;margin-bottom:2rem}.calendar.bit-yolhwc .basket-panel__section-tab.bit-yolhwc.bit-yolhwc{height:35px;padding:0 0.5rem;display:flex;align-items:center;justify-content:center;background-color:white;border-radius:var(--border-radius-base);margin-right:10px;border:1px solid transparent}.calendar.bit-yolhwc .basket-panel__section-tab.tab-active.bit-yolhwc.bit-yolhwc{background-color:var(--bit-ca-hover-slot-button-color, #13985f);color:var(--bit-ca-accent-contrast-color, white);font-weight:500}.calendar.bit-yolhwc .basket-panel__section-tab.bit-yolhwc.bit-yolhwc:not(.tab-active){cursor:pointer;border:1px solid #eee}.calendar.bit-yolhwc .basket-panel__section-tab.bit-yolhwc.bit-yolhwc:not(.tab-active):hover{background-color:var(--bit-ca-hover-color, #ddd)}.calendar.bit-yolhwc .basket-panel__summary.bit-yolhwc.bit-yolhwc{height:fit-content;display:flex;justify-content:space-between;align-items:center}.calendar.bit-yolhwc .basket-panel__basket.bit-yolhwc.bit-yolhwc{display:flex;flex:1 1 auto;height:100%;min-height:120px}.calendar.bit-yolhwc .basket-panel__products.bit-yolhwc.bit-yolhwc{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;padding-right:8px}.calendar.bit-yolhwc .basket-panel__product.bit-yolhwc.bit-yolhwc{display:flex;padding:2px;background-color:white;margin-bottom:6px;border-radius:var(--border-radius-base);border:1px solid #eee}.calendar.bit-yolhwc .basket-panel__product.bit-yolhwc>div.bit-yolhwc{padding:4px 12px}.calendar.bit-yolhwc .basket-panel__product.bit-yolhwc>div.bit-yolhwc:first-child{padding-left:8px}.calendar.bit-yolhwc .basket-panel__product-day.bit-yolhwc.bit-yolhwc{min-width:70px}.calendar.bit-yolhwc .basket-panel__product-amount.bit-yolhwc.bit-yolhwc{min-width:80px;text-align:right}.calendar.bit-yolhwc .basket-panel__product-duration.bit-yolhwc.bit-yolhwc{min-width:100px;text-align:right}.calendar.bit-yolhwc .basket-panel__product-actions.bit-yolhwc.bit-yolhwc{display:flex;align-items:center;margin-left:auto;color:var(--bit-ca-secondary-color, #999999)}.calendar.bit-yolhwc .basket-panel__product-actions.bit-yolhwc.bit-yolhwc:hover{color:currentColor;cursor:pointer}.calendar.bit-yolhwc .basket-panel__booking-btn.bit-yolhwc>button.bit-yolhwc{width:220px;height:40px;background-color:var(--bit-ca-accent-color, #5b21b6);color:white;font-weight:700;border:none;border-radius:var(--border-radius-base);cursor:pointer}.calendar.bit-yolhwc .basket-panel__booking-btn.bit-yolhwc>button.bit-yolhwc:active{transform:scale(1.01)}.calendar.bit-yolhwc .basket-panel__booking-btn.bit-yolhwc>button.bit-yolhwc:disabled:active{transform:none}.calendar.bit-yolhwc .basket-panel__booking-btn.bit-yolhwc>button.bit-yolhwc:disabled{background-color:#a8a29e;cursor:not-allowed}.calendar.bit-yolhwc .basket-panel__total-price.bit-yolhwc.bit-yolhwc{display:flex;align-items:center;justify-content:center;border-left:1px solid #ccc;width:156px}.calendar.bit-yolhwc .basket-panel__total-price.bit-yolhwc>span.bit-yolhwc{padding:0 2rem;font-size:1.5rem}.calendar__header.bit-yolhwc.bit-yolhwc.bit-yolhwc{background-color:var(--bit-ca-bg, #fafafa);display:flex;align-items:center}.calendar__day-nav.bit-yolhwc.bit-yolhwc.bit-yolhwc{width:var(--sideWidth, 60px);display:flex;justify-content:center}.calendar__day-nav-right.bit-yolhwc.bit-yolhwc.bit-yolhwc{text-align:right}.calendar__days.bit-yolhwc.bit-yolhwc.bit-yolhwc{display:flex;align-items:center;flex:1 1 auto}.calendar__day.bit-yolhwc.bit-yolhwc.bit-yolhwc{width:calc(100% / var(--viewDaysCount, 7));text-align:center}.calendar__day.weekend.bit-yolhwc .calendar__day-name.bit-yolhwc.bit-yolhwc,.calendar__day.weekend.bit-yolhwc .calendar__day-day.bit-yolhwc.bit-yolhwc{color:var(--bit-ca-weekend-day-color, rgb(167, 0, 0))}.calendar__rows.bit-yolhwc.bit-yolhwc.bit-yolhwc{margin-top:8px}.calendar__row.bit-yolhwc.bit-yolhwc.bit-yolhwc{display:flex;height:32px}.calendar__row.bit-yolhwc:hover .calendar__row-hour.bit-yolhwc.bit-yolhwc{font-weight:700;color:var(--bit-ca-bold-color, rgb(70, 70, 70)) !important}.calendar__row.bit-yolhwc:not(.zero-hour) .calendar__row-hour.bit-yolhwc.bit-yolhwc{color:var(--bit-ca-secondary-color, #999999);font-size:11px}.calendar__row-hour.bit-yolhwc.bit-yolhwc.bit-yolhwc{width:var(--sideWidth, 60px);display:flex;align-items:center;justify-content:center}.calendar__row-slots.bit-yolhwc.bit-yolhwc.bit-yolhwc{display:flex;align-items:center;flex:1 1 auto}.calendar__slot.bit-yolhwc.bit-yolhwc.bit-yolhwc{width:calc(100% / var(--viewDaysCount, 7));display:flex;align-items:center;justify-content:center;padding:0 10px}.calendar__slot.bit-yolhwc .slot-btn.bit-yolhwc.bit-yolhwc{background-color:#fff;border:1px solid #bbb;width:100%;line-height:1.2rem;border-radius:var(--border-radius-base);cursor:pointer;display:flex;align-items:center;justify-content:center}.calendar__slot.bit-yolhwc .slot-btn.bit-yolhwc.bit-yolhwc:hover{border-color:var(--bit-ca-hover-slot-button-border-color, #108150);background-color:var(--bit-ca-hover-slot-button-color, #13985f);color:white}.calendar__slot.bit-yolhwc .slot-btn--selected.bit-yolhwc.bit-yolhwc{border-color:var(--bit-ca-hover-slot-button-border-color, #108150);background-color:var(--bit-ca-hover-slot-button-color, #13985f);color:white}.calendar__slot.bit-yolhwc .slot-btn .slot-btn-icon{margin-right:0.3rem}.calendar__slot--busy.bit-yolhwc.bit-yolhwc.bit-yolhwc{color:var(--bit-ca-secondary-color, #999999);font-size:12px}.calendar.bit-yolhwc .bold{font-weight:700;color:var(--bit-ca-bold-color, rgb(70, 70, 70))}.calendar.bit-yolhwc .h1{font-size:1.5rem;font-weight:500}.calendar.bit-yolhwc .h2{font-size:1.25rem;font-weight:500}.calendar.bit-yolhwc .h3{font-size:1.15rem;font-weight:500}.calendar.bit-yolhwc .rounded{border-radius:var(--border-radius-base)}.calendar.bit-yolhwc .pointer{cursor:pointer}.calendar.bit-yolhwc .hover:hover{background-color:var(--bit-ca-hover-color, #ddd)}.calendar.bit-yolhwc .inline-block{display:inline-block}.calendar.bit-yolhwc .btn-icon{display:inline-flex;border-radius:var(--border-radius-base);cursor:pointer;padding:0.3rem;color:var(--bit-ca-secondary-color, #999999)}.calendar.bit-yolhwc .btn-icon:hover{background-color:var(--bit-ca-hover-color, #ddd);color:currentColor}.calendar.bit-yolhwc .btn-icon:active{transform:scale(1.1)}.calendar.bit-yolhwc .btn{padding:12px 20px;background-color:var(--bit-ca-accent-color);color:white;font-weight:700;border:none;border-radius:var(--border-radius-base);cursor:pointer}.calendar.bit-yolhwc .btn:disabled{background-color:var(--bit-ca-accent-lighter-color)}.calendar.bit-yolhwc .flex{display:flex}.calendar.bit-yolhwc .flex.center{align-items:center;justify-content:center}.calendar.bit-yolhwc .flex-col{display:flex;flex-direction:column}.calendar.bit-yolhwc .flex-row{display:flex;flex-direction:row}.calendar.bit-yolhwc .items-end{align-items:flex-end}.calendar.bit-yolhwc .items-center{align-items:center}.calendar.bit-yolhwc .content-center{justify-content:center}.calendar.bit-yolhwc .content-end{justify-content:end;justify-content:flex-end}.calendar.bit-yolhwc .error{color:#f87171}.calendar.bit-yolhwc .success{color:#4ade80}');
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[65] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[68] = list[i];
  const constants_0 = child_ctx[23](child_ctx[68].date, child_ctx[65].hh, child_ctx[65].mm);
  child_ctx[69] = constants_0;
  const constants_1 = child_ctx[16][child_ctx[69]];
  child_ctx[70] = constants_1;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[68] = list[i];
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[75] = list[i];
  return child_ctx;
}
function get_each_context_4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[78] = list[i];
  return child_ctx;
}
function create_if_block_8(ctx) {
  let bookingmodal;
  let current;
  bookingmodal = new BookingModal({
    props: {
      title: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  bookingmodal.$on("close", ctx[40]);
  bookingmodal.$on("overlayClick", ctx[41]);
  return {
    c() {
      create_component(bookingmodal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bookingmodal, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bookingmodal_changes = {};
      if (dirty[0] & 22 | dirty[2] & 524288) {
        bookingmodal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      bookingmodal.$set(bookingmodal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(bookingmodal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bookingmodal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bookingmodal, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let bookingconfirm;
  let current;
  bookingconfirm = new BookingConfirm({
    props: {
      selectedSlotsStore: ctx[18],
      activeSection: ctx[4],
      placeName: ctx[1],
      placeAddress: ctx[2],
      postBooking: ctx[20]
    }
  });
  bookingconfirm.$on("ok", ctx[26]);
  bookingconfirm.$on("error", ctx[27]);
  return {
    c() {
      create_component(bookingconfirm.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bookingconfirm, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bookingconfirm_changes = {};
      if (dirty[0] & 16)
        bookingconfirm_changes.activeSection = ctx2[4];
      if (dirty[0] & 2)
        bookingconfirm_changes.placeName = ctx2[1];
      if (dirty[0] & 4)
        bookingconfirm_changes.placeAddress = ctx2[2];
      bookingconfirm.$set(bookingconfirm_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(bookingconfirm.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bookingconfirm.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bookingconfirm, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let bookingmodal;
  let current;
  bookingmodal = new BookingModal({
    props: {
      title: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  bookingmodal.$on("close", ctx[43]);
  bookingmodal.$on("overlayClick", ctx[44]);
  return {
    c() {
      create_component(bookingmodal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bookingmodal, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bookingmodal_changes = {};
      if (dirty[0] & 128 | dirty[2] & 524288) {
        bookingmodal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      bookingmodal.$set(bookingmodal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(bookingmodal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bookingmodal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bookingmodal, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let div1;
  let icon;
  let t0;
  let div0;
  let t2;
  let div2;
  let button;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({
    props: {
      name: "clipboard-check",
      size: "2rem",
      class: "success"
    }
  });
  return {
    c() {
      div1 = element("div");
      create_component(icon.$$.fragment);
      t0 = space();
      div0 = element("div");
      div0.textContent = "\u0411\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E.";
      t2 = space();
      div2 = element("div");
      button = element("button");
      button.textContent = "\u041E\u041A";
      attr(div1, "class", "flex-row items-center");
      set_style(div1, "margin-top", "1rem");
      attr(button, "type", "button");
      attr(button, "class", "btn btn--mobile-full bit-yolhwc");
      attr(div2, "class", "flex-row content-end");
      set_style(div2, "margin-top", "2rem");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      mount_component(icon, div1, null);
      append(div1, t0);
      append(div1, div0);
      insert(target, t2, anchor);
      insert(target, div2, anchor);
      append(div2, button);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[42]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(icon);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div2);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_6(ctx) {
  let bookingmodal;
  let current;
  bookingmodal = new BookingModal({
    props: {
      title: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  bookingmodal.$on("close", ctx[46]);
  bookingmodal.$on("overlayClick", ctx[47]);
  return {
    c() {
      create_component(bookingmodal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bookingmodal, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bookingmodal_changes = {};
      if (dirty[0] & 256 | dirty[2] & 524288) {
        bookingmodal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      bookingmodal.$set(bookingmodal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(bookingmodal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bookingmodal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bookingmodal, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let div1;
  let icon;
  let t0;
  let div0;
  let t2;
  let div2;
  let button;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({
    props: {
      name: "exclamation-circle",
      size: "2rem",
      class: "error"
    }
  });
  return {
    c() {
      div1 = element("div");
      create_component(icon.$$.fragment);
      t0 = space();
      div0 = element("div");
      div0.textContent = "\u041E\u0448\u0438\u0431\u043A\u0430 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432 \u0442\u0435\u0445.\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443.";
      t2 = space();
      div2 = element("div");
      button = element("button");
      button.textContent = "\u041E\u041A";
      set_style(div0, "margin-left", "0.5rem");
      attr(div1, "class", "flex-row items-center");
      set_style(div1, "margin-top", "1rem");
      attr(button, "type", "button");
      attr(button, "class", "btn btn--mobile-full bit-yolhwc");
      attr(div2, "class", "flex-row content-end");
      set_style(div2, "margin-top", "2rem");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      mount_component(icon, div1, null);
      append(div1, t0);
      append(div1, div0);
      insert(target, t2, anchor);
      insert(target, div2, anchor);
      append(div2, button);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[45]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(icon);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div2);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5(ctx) {
  let div;
  let each_value_4 = ctx[5];
  let each_blocks = [];
  for (let i = 0; i < each_value_4.length; i += 1) {
    each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "basket-panel__section-tabs bit-yolhwc");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & 2097200) {
        each_value_4 = ctx2[5];
        let i;
        for (i = 0; i < each_value_4.length; i += 1) {
          const child_ctx = get_each_context_4(ctx2, each_value_4, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_4.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_4(ctx) {
  let div;
  let t0_value = ctx[78].name + "";
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler_2() {
    return ctx[48](ctx[78]);
  }
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      attr(div, "class", "basket-panel__section-tab bit-yolhwc");
      toggle_class(div, "tab-active", ctx[4] === ctx[78]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & 32 && t0_value !== (t0_value = ctx[78].name + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 48) {
        toggle_class(div, "tab-active", ctx[4] === ctx[78]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_3(ctx) {
  let div5;
  let div0;
  let t0_value = ctx[75].day + "";
  let t0;
  let t1;
  let div1;
  let t2_value = ctx[75].fromToName + "";
  let t2;
  let t3;
  let div2;
  let t4_value = ctx[75].duration + "";
  let t4;
  let t5;
  let div3;
  let fmtCurrency_action;
  let t6;
  let div4;
  let icon;
  let current;
  let mounted;
  let dispose;
  function click_handler_3() {
    return ctx[49](ctx[75]);
  }
  icon = new Icon({
    props: { name: "x-circle", size: "1.2rem" }
  });
  icon.$on("click", click_handler_3);
  return {
    c() {
      div5 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      div2 = element("div");
      t4 = text(t4_value);
      t5 = space();
      div3 = element("div");
      t6 = space();
      div4 = element("div");
      create_component(icon.$$.fragment);
      attr(div0, "class", "basket-panel__product-day bit-yolhwc");
      attr(div1, "class", "basket-panel__product-time bit-yolhwc");
      attr(div2, "class", "basket-panel__product-duration bit-yolhwc");
      attr(div3, "class", "basket-panel__product-amount bit-yolhwc");
      attr(div4, "class", "basket-panel__product-actions bit-yolhwc");
      attr(div5, "class", "basket-panel__product bit-yolhwc");
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div0);
      append(div0, t0);
      append(div5, t1);
      append(div5, div1);
      append(div1, t2);
      append(div5, t3);
      append(div5, div2);
      append(div2, t4);
      append(div5, t5);
      append(div5, div3);
      append(div5, t6);
      append(div5, div4);
      mount_component(icon, div4, null);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(fmtCurrency_action = fmtCurrency.call(null, div3, ctx[75].amount));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty[0] & 32768) && t0_value !== (t0_value = ctx[75].day + ""))
        set_data(t0, t0_value);
      if ((!current || dirty[0] & 32768) && t2_value !== (t2_value = ctx[75].fromToName + ""))
        set_data(t2, t2_value);
      if ((!current || dirty[0] & 32768) && t4_value !== (t4_value = ctx[75].duration + ""))
        set_data(t4, t4_value);
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty[0] & 32768)
        fmtCurrency_action.update.call(null, ctx[75].amount);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div5);
      destroy_component(icon);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB";
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let icon;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({ props: { name: "chevron-left" } });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "btn-icon");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
      if (!mounted) {
        dispose = listen(div, "click", ctx[25]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(icon);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_2(ctx) {
  let div2;
  let div0;
  let t0_value = ctx[68].name + "";
  let t0;
  let t1;
  let div1;
  let t2_value = ctx[68].day + "";
  let t2;
  let t3;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      attr(div0, "class", "calendar__day-name bold bit-yolhwc");
      attr(div1, "class", "calendar__day-day bit-yolhwc");
      attr(div2, "class", "calendar__day bit-yolhwc");
      toggle_class(div2, "weekend", ctx[68].weekend);
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, t0);
      append(div2, t1);
      append(div2, div1);
      append(div1, t2);
      append(div2, t3);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8 && t0_value !== (t0_value = ctx2[68].name + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 8 && t2_value !== (t2_value = ctx2[68].day + ""))
        set_data(t2, t2_value);
      if (dirty[0] & 8) {
        toggle_class(div2, "weekend", ctx2[68].weekend);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div2);
    }
  };
}
function create_if_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[70].is_available)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let div;
  let span;
  let fmtCurrency_action;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      span = element("span");
      t = space();
      attr(div, "class", "calendar__slot calendar__slot--busy bit-yolhwc");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(div, t);
      if (!mounted) {
        dispose = action_destroyer(fmtCurrency_action = fmtCurrency.call(null, span, ctx[70].amount));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty[0] & 81928)
        fmtCurrency_action.update.call(null, ctx[70].amount);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let button;
  let t0;
  let span;
  let fmtCurrency_action;
  let t1;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[70].selected && create_if_block_2();
  function click_handler_4() {
    return ctx[50](ctx[70]);
  }
  return {
    c() {
      div = element("div");
      button = element("button");
      if (if_block)
        if_block.c();
      t0 = space();
      span = element("span");
      t1 = space();
      attr(button, "type", "button");
      attr(button, "class", "slot-btn bit-yolhwc");
      toggle_class(button, "slot-btn--selected", ctx[70].selected);
      attr(div, "class", "calendar__slot bit-yolhwc");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      if (if_block)
        if_block.m(button, null);
      append(button, t0);
      append(button, span);
      append(div, t1);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(fmtCurrency_action = fmtCurrency.call(null, span, ctx[70].amount)),
          listen(button, "click", click_handler_4)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (ctx[70].selected) {
        if (if_block) {
          if (dirty[0] & 81928) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(button, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty[0] & 81928)
        fmtCurrency_action.update.call(null, ctx[70].amount);
      if (dirty[0] & 8470536) {
        toggle_class(button, "slot-btn--selected", ctx[70].selected);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2(ctx) {
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: "check",
      class: "slot-btn-icon",
      w: "1rem",
      h: "1rem",
      strokeWidth: 4
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[70] && create_if_block(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[70]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 81928) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_each_block(ctx) {
  let div3;
  let div0;
  let t0_value = ctx[65].displayHour + "";
  let t0;
  let t1;
  let div1;
  let t2;
  let div2;
  let t3_value = ctx[65].displayHour + "";
  let t3;
  let t4;
  let current;
  let each_value_1 = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      div2 = element("div");
      t3 = text(t3_value);
      t4 = space();
      attr(div0, "class", "calendar__row-hour calendar__row-hour-left bit-yolhwc");
      attr(div1, "class", "calendar__row-slots bit-yolhwc");
      attr(div2, "class", "calendar__row-hour calendar__row-hour-right bit-yolhwc");
      attr(div3, "class", "calendar__row bit-yolhwc");
      toggle_class(div3, "zero-hour", ctx[65].zero);
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, t0);
      append(div3, t1);
      append(div3, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
      append(div3, t2);
      append(div3, div2);
      append(div2, t3);
      append(div3, t4);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty[0] & 16384) && t0_value !== (t0_value = ctx2[65].displayHour + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 8994824) {
        each_value_1 = ctx2[3];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div1, null);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if ((!current || dirty[0] & 16384) && t3_value !== (t3_value = ctx2[65].displayHour + ""))
        set_data(t3, t3_value);
      if (dirty[0] & 16384) {
        toggle_class(div3, "zero-hour", ctx2[65].zero);
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div15;
  let t0;
  let t1;
  let t2;
  let div8;
  let div0;
  let t3;
  let span0;
  let t4;
  let t5;
  let t6;
  let t7;
  let t8;
  let div7;
  let div3;
  let div1;
  let t9;
  let t10;
  let div2;
  let span1;
  let fmtCurrency_action;
  let t11;
  let div4;
  let button;
  let t12;
  let button_disabled_value;
  let t13;
  let div6;
  let div5;
  let span2;
  let fmtCurrency_action_1;
  let t14;
  let div13;
  let div9;
  let t15;
  let div10;
  let t16;
  let div12;
  let div11;
  let icon;
  let t17;
  let div14;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[6] && create_if_block_8(ctx);
  let if_block1 = ctx[7] && create_if_block_7(ctx);
  let if_block2 = ctx[8] && create_if_block_6(ctx);
  let if_block3 = ctx[12] && create_if_block_5(ctx);
  let each_value_3 = ctx[15].bookingsArray;
  let each_blocks_2 = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks_2[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  const out = (i) => transition_out(each_blocks_2[i], 1, 1, () => {
    each_blocks_2[i] = null;
  });
  let if_block4 = !ctx[15].bookingsArray.length && create_if_block_4();
  let if_block5 = ctx[13] && create_if_block_3(ctx);
  let each_value_2 = ctx[3];
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  icon = new Icon({ props: { name: "chevron-right" } });
  let each_value = ctx[14];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div15 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      div8 = element("div");
      div0 = element("div");
      t3 = text("\u0412\u044B \u0431\u0440\u043E\u043D\u0438\u0440\u0443\u0435\u0442\u0435 ");
      span0 = element("span");
      t4 = text(ctx[1]);
      t5 = text(", ");
      t6 = text(ctx[2]);
      t7 = space();
      if (if_block3)
        if_block3.c();
      t8 = space();
      div7 = element("div");
      div3 = element("div");
      div1 = element("div");
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].c();
      }
      t9 = space();
      if (if_block4)
        if_block4.c();
      t10 = space();
      div2 = element("div");
      span1 = element("span");
      t11 = space();
      div4 = element("div");
      button = element("button");
      t12 = text("\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C");
      t13 = space();
      div6 = element("div");
      div5 = element("div");
      span2 = element("span");
      t14 = space();
      div13 = element("div");
      div9 = element("div");
      if (if_block5)
        if_block5.c();
      t15 = space();
      div10 = element("div");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t16 = space();
      div12 = element("div");
      div11 = element("div");
      create_component(icon.$$.fragment);
      t17 = space();
      div14 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span0, "class", "fg-primary");
      set_style(span0, "font-weight", "600");
      set_style(div0, "height", "48px");
      set_style(div0, "overflow", "hidden");
      attr(div1, "class", "basket-panel__products bit-yolhwc");
      attr(span1, "class", "bit-yolhwc");
      attr(div2, "class", "basket-panel__total-price bit-yolhwc");
      attr(div3, "class", "basket-panel__basket bit-yolhwc");
      attr(button, "type", "button");
      button.disabled = button_disabled_value = ctx[15].totalAmount <= 0;
      attr(button, "class", "bit-yolhwc");
      attr(div4, "class", "basket-panel__booking-btn bit-yolhwc");
      attr(span2, "class", "bit-yolhwc");
      attr(div5, "class", "basket-panel__total-price bit-yolhwc");
      attr(div6, "class", "basket-panel__mobile-price bit-yolhwc");
      attr(div7, "class", "basket-panel__summary bit-yolhwc");
      attr(div8, "class", "basket-panel bit-yolhwc");
      attr(div9, "class", "calendar__day-nav calendar__day-nav-left bit-yolhwc");
      attr(div10, "class", "calendar__days bit-yolhwc");
      attr(div11, "class", "btn-icon");
      attr(div12, "class", "calendar__day-nav calendar__day-nav-right bit-yolhwc");
      attr(div13, "class", "calendar__header bit-yolhwc");
      attr(div14, "class", "calendar__rows bit-yolhwc");
      attr(div15, "class", "calendar bit-yolhwc");
      set_style(div15, "--viewDaysCount", ctx[0]);
      set_style(div15, "--calendarWidth", ctx[11] + "px");
      toggle_class(div15, "mobile-view", ctx[10]);
      toggle_class(div15, "no-sections", !ctx[12]);
    },
    m(target, anchor) {
      insert(target, div15, anchor);
      if (if_block0)
        if_block0.m(div15, null);
      append(div15, t0);
      if (if_block1)
        if_block1.m(div15, null);
      append(div15, t1);
      if (if_block2)
        if_block2.m(div15, null);
      append(div15, t2);
      append(div15, div8);
      append(div8, div0);
      append(div0, t3);
      append(div0, span0);
      append(span0, t4);
      append(div0, t5);
      append(div0, t6);
      append(div8, t7);
      if (if_block3)
        if_block3.m(div8, null);
      append(div8, t8);
      append(div8, div7);
      append(div7, div3);
      append(div3, div1);
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].m(div1, null);
      }
      append(div1, t9);
      if (if_block4)
        if_block4.m(div1, null);
      append(div3, t10);
      append(div3, div2);
      append(div2, span1);
      append(div7, t11);
      append(div7, div4);
      append(div4, button);
      append(button, t12);
      append(div7, t13);
      append(div7, div6);
      append(div6, div5);
      append(div5, span2);
      append(div15, t14);
      append(div15, div13);
      append(div13, div9);
      if (if_block5)
        if_block5.m(div9, null);
      append(div13, t15);
      append(div13, div10);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(div10, null);
      }
      append(div13, t16);
      append(div13, div12);
      append(div12, div11);
      mount_component(icon, div11, null);
      append(div15, t17);
      append(div15, div14);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div14, null);
      }
      ctx[51](div15);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(fmtCurrency_action = fmtCurrency.call(null, span1, ctx[15].totalAmount)),
          listen(button, "click", ctx[28]),
          action_destroyer(fmtCurrency_action_1 = fmtCurrency.call(null, span2, ctx[15].totalAmount)),
          listen(div11, "click", ctx[24])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (ctx2[6]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & 64) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_8(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div15, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[7]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 128) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_7(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div15, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (ctx2[8]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & 256) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_6(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div15, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & 2)
        set_data(t4, ctx2[1]);
      if (!current || dirty[0] & 4)
        set_data(t6, ctx2[2]);
      if (ctx2[12]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_5(ctx2);
          if_block3.c();
          if_block3.m(div8, t8);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty[0] & 4227072) {
        each_value_3 = ctx2[15].bookingsArray;
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks_2[i]) {
            each_blocks_2[i].p(child_ctx, dirty);
            transition_in(each_blocks_2[i], 1);
          } else {
            each_blocks_2[i] = create_each_block_3(child_ctx);
            each_blocks_2[i].c();
            transition_in(each_blocks_2[i], 1);
            each_blocks_2[i].m(div1, t9);
          }
        }
        group_outros();
        for (i = each_value_3.length; i < each_blocks_2.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!ctx2[15].bookingsArray.length) {
        if (if_block4)
          ;
        else {
          if_block4 = create_if_block_4();
          if_block4.c();
          if_block4.m(div1, null);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      if (fmtCurrency_action && is_function(fmtCurrency_action.update) && dirty[0] & 32768)
        fmtCurrency_action.update.call(null, ctx2[15].totalAmount);
      if (!current || dirty[0] & 32768 && button_disabled_value !== (button_disabled_value = ctx2[15].totalAmount <= 0)) {
        button.disabled = button_disabled_value;
      }
      if (fmtCurrency_action_1 && is_function(fmtCurrency_action_1.update) && dirty[0] & 32768)
        fmtCurrency_action_1.update.call(null, ctx2[15].totalAmount);
      if (ctx2[13]) {
        if (if_block5) {
          if_block5.p(ctx2, dirty);
          if (dirty[0] & 8192) {
            transition_in(if_block5, 1);
          }
        } else {
          if_block5 = create_if_block_3(ctx2);
          if_block5.c();
          transition_in(if_block5, 1);
          if_block5.m(div9, null);
        }
      } else if (if_block5) {
        group_outros();
        transition_out(if_block5, 1, 1, () => {
          if_block5 = null;
        });
        check_outros();
      }
      if (dirty[0] & 8) {
        each_value_2 = ctx2[3];
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_2(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(div10, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty[0] & 8994824) {
        each_value = ctx2[14];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div14, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out_1(i);
        }
        check_outros();
      }
      if (!current || dirty[0] & 1) {
        set_style(div15, "--viewDaysCount", ctx2[0]);
      }
      if (!current || dirty[0] & 2048) {
        set_style(div15, "--calendarWidth", ctx2[11] + "px");
      }
      if (dirty[0] & 1024) {
        toggle_class(div15, "mobile-view", ctx2[10]);
      }
      if (dirty[0] & 4096) {
        toggle_class(div15, "no-sections", !ctx2[12]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      for (let i = 0; i < each_value_3.length; i += 1) {
        transition_in(each_blocks_2[i]);
      }
      transition_in(if_block5);
      transition_in(icon.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      each_blocks_2 = each_blocks_2.filter(Boolean);
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        transition_out(each_blocks_2[i]);
      }
      transition_out(if_block5);
      transition_out(icon.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div15);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      destroy_each(each_blocks_2, detaching);
      if (if_block4)
        if_block4.d();
      if (if_block5)
        if_block5.d();
      destroy_each(each_blocks_1, detaching);
      destroy_component(icon);
      destroy_each(each_blocks, detaching);
      ctx[51](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function generateHours(from, delta) {
  const hours = [];
  let hour = from;
  while (hour < 24) {
    const mm = String(Math.abs(hour - Math.floor(hour)) * 60).padEnd(2, "0");
    const hh = Math.floor(hour);
    hours.push({
      hour,
      displayHour: `${hh}:${mm}`,
      zero: hour % 1 === 0,
      hh,
      mm: Math.abs(hour - Math.floor(hour))
    });
    hour += delta;
  }
  return hours;
}
function getSlotKey(dt) {
  return dt.getTime();
}
function instance($$self, $$props, $$invalidate) {
  let mobile;
  let calendarWidth;
  let viewDays;
  let viewHours;
  let showPrevBtn;
  let slotsFromDate;
  let slotsToDate;
  let sectionsTab;
  let hasSections;
  let activeSection;
  let $selectedSlots;
  let $storeSlots;
  let { placeName = "" } = $$props;
  let { placeAddress = "" } = $$props;
  let { startDate = new Date() } = $$props;
  let { startHour = 7 } = $$props;
  let { deltaHour = 0.5 } = $$props;
  let { viewDaysCount = 7 } = $$props;
  let { getSlots = () => Promise.resolve([]) } = $$props;
  let { getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone } = $$props;
  let { getSections = () => [] } = $$props;
  let { postBooking } = $$props;
  let { minOrderHour = 1 } = $$props;
  let { source_id = 3 } = $$props;
  const minDate = startOfDay(new Date());
  const timeZone = getTimeZone();
  const { storeSlots, storeUpdateSlot, storeUpdate, selectedSlots, loadSlots, clearStore } = createSlotsStore();
  component_subscribe($$self, storeSlots, (value) => $$invalidate(16, $storeSlots = value));
  component_subscribe($$self, selectedSlots, (value) => $$invalidate(15, $selectedSlots = value));
  let showConfirmBooking = false;
  let showSuccessBooking = false;
  let showErrorBooking = false;
  let containerEl = null;
  onMount(() => {
    setupScreen();
    const debounceResize = debounce(() => {
      requestAnimationFrame(setupScreen);
    }, 100);
    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  });
  function setupScreen() {
    const vw = window.outerWidth;
    $$invalidate(10, mobile = window.outerWidth < 980);
    const nav = mobile ? 40 : 60;
    const slot = mobile ? 80 : 120;
    $$invalidate(0, viewDaysCount = Math.min(7, Math.floor((vw - 2 * nav) / slot)));
    $$invalidate(11, calendarWidth = mobile ? viewDaysCount * slot + 2 * nav : viewDaysCount * slot + 2 * nav);
  }
  async function refreshSlots() {
    await updateSlots(slotsFromDate, slotsToDate, activeSection);
  }
  async function updateSlots(from, to, section) {
    try {
      const slots = await getSlots(from, to, section);
      loadSlots(slots, deltaHour);
    } catch (error) {
      console.error(error);
    }
  }
  function onSlotClick(slot) {
    const key = slot.dt;
    slot.selected = !slot.selected;
    storeUpdateSlot(key, slot);
  }
  async function onPostBooking(contact, data) {
    await postBooking(contact, $selectedSlots.bookingsArray, activeSection, data);
  }
  function setActiveSectionTab(tab) {
    $$invalidate(4, activeSection = tab);
    clearStore();
  }
  function removeSelectedBooking(book) {
    const slots = book.slots || [];
    const change = slots.reduce((acc, cur) => {
      cur.selected = false;
      acc[cur.dt] = cur;
      return acc;
    }, {});
    storeUpdate(change);
  }
  function generateViewDays(from, viewDaysCount2) {
    from = startOfDay(from);
    from = from < minDate ? minDate : from;
    const days = [];
    let lastDate = from;
    for (let i = 0; i < viewDaysCount2; i++) {
      days.push({
        date: lastDate,
        name: formatDate(lastDate, "d MMM", timeZone),
        day: isToday(lastDate) ? "\u0441\u0435\u0433\u043E\u0434\u043D\u044F" : formatDate(lastDate, "EEEEEE", timeZone),
        weekend: [0, 6].includes(lastDate.getDay())
      });
      lastDate = addDays(lastDate, 1);
    }
    return days;
  }
  function getSlotStoreKey(day, hh, mm) {
    const key = getSlotKey(dateTimeForSlot(day, hh, mm));
    return key;
  }
  function dateTimeForSlot(day, hh, mm) {
    return addMinutes(addHours(day, hh), mm * 60);
  }
  function loadNextWeek() {
    const { date: date2 } = viewDays[viewDays.length - 1];
    $$invalidate(3, viewDays = generateViewDays(addDays(date2, 1), viewDaysCount));
  }
  function loadPrevWeek() {
    const { date: date2 } = viewDays[0];
    $$invalidate(3, viewDays = generateViewDays(addDays(date2, -1 * viewDaysCount), viewDaysCount));
  }
  function successBooking() {
    $$invalidate(6, showConfirmBooking = false);
    $$invalidate(7, showSuccessBooking = true);
    refreshSlots();
    clearStore();
  }
  function errorBooking(e) {
    $$invalidate(6, showConfirmBooking = false);
    $$invalidate(8, showErrorBooking = true);
    refreshSlots();
    clearStore();
  }
  function onBookingClick() {
    const validResult = validBooking();
    if (validResult === true) {
      $$invalidate(6, showConfirmBooking = true);
    } else {
      alert(validResult);
    }
  }
  function validBooking() {
    const minBookings = Object.values($selectedSlots.bookings || {}).filter((b) => {
      return b.durationHours < minOrderHour;
    });
    if (minBookings.length > 0) {
      const times = minBookings.map((b) => b.fromToName).join(", ");
      return `\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C ${minOrderHour} \u0447\u0430\u0441. \u0423\u0432\u0435\u043B\u0438\u0447\u044C\u0442\u0435 \u0432\u0440\u0435\u043C\u044F: ${times}`;
    }
    return true;
  }
  const close_handler = () => $$invalidate(6, showConfirmBooking = false);
  const overlayClick_handler = () => $$invalidate(6, showConfirmBooking = false);
  const click_handler = () => $$invalidate(7, showSuccessBooking = false);
  const close_handler_1 = () => $$invalidate(7, showSuccessBooking = false);
  const overlayClick_handler_1 = () => $$invalidate(7, showSuccessBooking = false);
  const click_handler_1 = () => $$invalidate(8, showErrorBooking = false);
  const close_handler_2 = () => $$invalidate(8, showErrorBooking = false);
  const overlayClick_handler_2 = () => $$invalidate(8, showErrorBooking = false);
  const click_handler_2 = (tab) => setActiveSectionTab(tab);
  const click_handler_3 = (book) => removeSelectedBooking(book);
  const click_handler_4 = (slot) => onSlotClick(slot);
  function div15_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      containerEl = $$value;
      $$invalidate(9, containerEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("placeName" in $$props2)
      $$invalidate(1, placeName = $$props2.placeName);
    if ("placeAddress" in $$props2)
      $$invalidate(2, placeAddress = $$props2.placeAddress);
    if ("startDate" in $$props2)
      $$invalidate(29, startDate = $$props2.startDate);
    if ("startHour" in $$props2)
      $$invalidate(30, startHour = $$props2.startHour);
    if ("deltaHour" in $$props2)
      $$invalidate(31, deltaHour = $$props2.deltaHour);
    if ("viewDaysCount" in $$props2)
      $$invalidate(0, viewDaysCount = $$props2.viewDaysCount);
    if ("getSlots" in $$props2)
      $$invalidate(32, getSlots = $$props2.getSlots);
    if ("getTimeZone" in $$props2)
      $$invalidate(33, getTimeZone = $$props2.getTimeZone);
    if ("getSections" in $$props2)
      $$invalidate(34, getSections = $$props2.getSections);
    if ("postBooking" in $$props2)
      $$invalidate(35, postBooking = $$props2.postBooking);
    if ("minOrderHour" in $$props2)
      $$invalidate(36, minOrderHour = $$props2.minOrderHour);
    if ("source_id" in $$props2)
      $$invalidate(37, source_id = $$props2.source_id);
  };
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty[0] & 536870913) {
      $$invalidate(3, viewDays = generateViewDays(new Date(startDate), viewDaysCount));
    }
    if ($$self.$$.dirty[0] & 1073741824 | $$self.$$.dirty[1] & 1) {
      $$invalidate(14, viewHours = generateHours(startHour, deltaHour));
    }
    if ($$self.$$.dirty[0] & 8) {
      $$invalidate(13, showPrevBtn = ((_a = viewDays[0]) == null ? void 0 : _a.date) > minDate);
    }
    if ($$self.$$.dirty[0] & 8) {
      $$invalidate(39, slotsFromDate = viewDays[0].date);
    }
    if ($$self.$$.dirty[0] & 8) {
      $$invalidate(38, slotsToDate = addDays(viewDays[viewDays.length - 1].date, 1));
    }
    if ($$self.$$.dirty[1] & 8) {
      $$invalidate(5, sectionsTab = getSections());
    }
    if ($$self.$$.dirty[0] & 32) {
      $$invalidate(12, hasSections = (sectionsTab == null ? void 0 : sectionsTab.length) > 0);
    }
    if ($$self.$$.dirty[0] & 32) {
      $$invalidate(4, activeSection = sectionsTab[0]);
    }
    if ($$self.$$.dirty[0] & 16 | $$self.$$.dirty[1] & 384) {
      updateSlots(slotsFromDate, slotsToDate, activeSection);
    }
  };
  $$invalidate(10, mobile = false);
  $$invalidate(11, calendarWidth = 980);
  return [
    viewDaysCount,
    placeName,
    placeAddress,
    viewDays,
    activeSection,
    sectionsTab,
    showConfirmBooking,
    showSuccessBooking,
    showErrorBooking,
    containerEl,
    mobile,
    calendarWidth,
    hasSections,
    showPrevBtn,
    viewHours,
    $selectedSlots,
    $storeSlots,
    storeSlots,
    selectedSlots,
    onSlotClick,
    onPostBooking,
    setActiveSectionTab,
    removeSelectedBooking,
    getSlotStoreKey,
    loadNextWeek,
    loadPrevWeek,
    successBooking,
    errorBooking,
    onBookingClick,
    startDate,
    startHour,
    deltaHour,
    getSlots,
    getTimeZone,
    getSections,
    postBooking,
    minOrderHour,
    source_id,
    slotsToDate,
    slotsFromDate,
    close_handler,
    overlayClick_handler,
    click_handler,
    close_handler_1,
    overlayClick_handler_1,
    click_handler_1,
    close_handler_2,
    overlayClick_handler_2,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    div15_binding
  ];
}
class BookingCalendar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      placeName: 1,
      placeAddress: 2,
      startDate: 29,
      startHour: 30,
      deltaHour: 31,
      viewDaysCount: 0,
      getSlots: 32,
      getTimeZone: 33,
      getSections: 34,
      postBooking: 35,
      minOrderHour: 36,
      source_id: 37
    }, add_css, [-1, -1, -1]);
  }
}
function defaultOptions() {
  return {
    postBookingUrl: "https://api.beinteam.ru/public/orders",
    source_id: 3
  };
}
function createCalendar(el, options) {
  options = __spreadValues(__spreadValues({}, defaultOptions()), options || {});
  async function serverSlots(dateFrom, dateTo, section) {
    const df = encodeURIComponent(dateToISO(dateFrom));
    const dt = encodeURIComponent(dateToISO(dateTo));
    let url = `${options.getSlotsUrl}?date_from=${df}&date_to=${dt}`;
    if (section) {
      url += `&section_id=${section.id}`;
    }
    return fetch(url, { mode: "cors" }).then((r) => r.json());
  }
  async function postBooking(contact, bookings, section, meta) {
    console.log({ contact, bookings, section, meta });
    const products = bookings.map((b) => {
      return {
        product_id: 1,
        quantity: 1,
        amount: b.amount,
        place_booking: {
          date_from: dateToISO(b.from),
          date_to: dateToISO(b.to),
          place_id: options.placeId,
          section_id: (section == null ? void 0 : section.id) || void 0,
          activity_id: meta.activity.id
        }
      };
    });
    const data = {
      object_id: options.objectId,
      company_id: options.companyId,
      customer_type: "person",
      customer_contact: {
        email: contact.email,
        first_name: contact.name,
        last_name: contact.surname,
        phone: contact.phone
      },
      products,
      source_id: options.source_id
    };
    console.log(data);
    const response = await fetch(options.postBookingUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    });
    if (!String(response.status).startsWith("2")) {
      throw new Error("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430, \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443.");
    }
    return await response.json();
  }
  return new BookingCalendar({
    target: el,
    props: {
      placeName: options == null ? void 0 : options.placeName,
      placeAddress: options == null ? void 0 : options.placeAddress,
      startDate: (options == null ? void 0 : options.startDate) || new Date(),
      startHour: typeof (options == null ? void 0 : options.startHour) === "number" ? options == null ? void 0 : options.startHour : 7,
      deltaHour: (options == null ? void 0 : options.deltaHour) || 0.5,
      getTimeZone: () => options == null ? void 0 : options.timeZone,
      getSections: () => (options == null ? void 0 : options.sections) || [],
      getSlots: serverSlots,
      postBooking,
      minOrderHour: options.minOrderHour
    }
  });
}
export { BookingCalendar as BookingCalendarSvelte, date as DateHelpers, createCalendar };
