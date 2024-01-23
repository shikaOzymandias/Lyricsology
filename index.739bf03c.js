// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gRY1p":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ba60c367739bf03c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ebWYT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    async fetch (request1, env1, ctx) {
        return `API host: ${env1.GENIUS_API_KEY}`;
    }
};
addEventListener("fetch", (event)=>{
    event.respondWith(handleRequest(event.request));
});
const API_URL = "https://api.musixmatch.com/ws/1.1/";
const apiKey = secrets.MUSIX_API_KEY;
const apiKeyGen = GENIUS_API_KEY;
const apiKeyGen2 = request.GENIUS_API_KEY;
const apiKeyGen3 = "b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ";
const apiKeyGen4 = env.GENIUS_API_KEY;
const errorMessage = "We couldn't find lyrics. try something else ...";
// Search Selector
const searchForm = document.querySelector(".search");
const searchInputText = document.querySelector(".search__field");
const searchResultView = document.querySelector(".results");
let numResults = 50; // numbers of results - range is 0 - 100
const trackContainer = document.querySelector(".music");
const headEl = document.getElementsByTagName("head")[0];
// pagination selector
const paginationContainer = document.querySelector(".pagination");
// modal selectors
const modal = document.querySelector(".modal");
const showAboutUs = document.querySelector(".nav__btn--about-us");
const closeBtn = document.querySelector(".modal__btn-close");
console.log(apiKey);
console.log(apiKeyGen);
console.log(apiKeyGen2);
console.log(apiKeyGen3);
console.log(apiKeyGen4);
let state = {
    music: {},
    search: {
        query: "",
        results: [],
        resultsView: [],
        perPage: 10,
        page: 1
    }
};
const getJSON = async function(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        // first: for when api authentication is wrong, second: for when no track found.
        if (data.message.body.length === 0) throw new Error(`Status Code: ${data.message.header.status_code}`);
        else if (data.message.header.available === 0) throw new Error(`Not found Any Track!`);
        return data;
    } catch (err) {
        throw err;
    }
};
const getQuery = function() {
    const query = searchInputText.value;
    searchInputText.value = "";
    return query;
};
const renderSpinner = function(parentElement) {
    const markup = `
  <div class="u-margin-top-big spinner"></div>
  `;
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
};
const renderError = function(parentElement, message = errorMessage) {
    if (message.includes("is not valid JSON")) message = "There is some problem with Genius Api. Try again later.";
    const markup = `
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${message}</p>
          </div>
  `;
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
};
const loadLyrics = async function() {
    try {
        let markup;
        // Taking id track and putting in id
        const id = window.location.hash.slice(1);
        if (!id) return;
        console.log(id);
        // 1) Loading Lyrics and Music data
        // Spinner
        renderSpinner(trackContainer);
        // taking lyrics data
        const lyricsData = await getJSON(`${API_URL}track.lyrics.get?commontrack_id=${id}&apikey=${apiKey}`);
        // taking track data
        const data = await getJSON(`${API_URL}track.get?commontrack_id=${id}&apikey=${apiKey}`);
        const dataRes = state.search.results;
        // Reformating lyricsData
        let { lyrics } = lyricsData.message.body;
        console.log(lyrics);
        lyrics = {
            id: lyrics.lyrics_id,
            body: lyrics.lyrics_body,
            script: lyrics.script_tracking_url,
            imagePixel: lyrics.pixel_tracking_url,
            copyright: lyrics.lyrics_copyright,
            updatedTime: lyrics.updated_time
        };
        // pushing lyrics.script into <head>
        const lyricsScript = `<script type="text/javascript" src="${lyrics.script}">`;
        headEl.insertAdjacentHTML("beforeend", lyricsScript);
        // Reformating track data
        let { track } = data.message.body;
        console.log(track);
        track = {
            id: track.track_id,
            title: track.track_name,
            commontrackId: track.commontrack_id,
            hasLyrics: track.has_lyrics,
            explicit: track.explicit,
            favourite: track.num_favourite,
            albumId: track.album_id,
            albumName: track.album_name,
            artistId: track.artist_id,
            artistName: track.artist_name,
            updatedTime: track.updated_time,
            ...track.primary_genres.music_genre_list.length !== 0 && {
                genre: track.primary_genres.music_genre_list[0].music_genre.music_genre_name
            },
            // genre:
            //   track.primary_genres.music_genre_list[0].music_genre.music_genre_name,
            genres: track.primary_genres.music_genre_list
        };
        // genuis api
        const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(track.artistName + " " + track.title)}&access_token=${apiKeyGen}`;
        const resGen = await fetch(searchUrl);
        const dataGen = await resGen.json();
        console.log(resGen);
        console.log(dataGen);
        let result = {};
        if (dataGen.response.hits.length !== 0) {
            result = dataGen.response.hits[0].result;
            console.log(result);
            result = {
                headerThumbnail: result.header_image_thumbnail_url,
                headerImage: result.song_art_image_url,
                ...result.release_date_components && {
                    releaseDate: result.release_date_components.year
                },
                artistImageHeader: result.primary_artist.header_image_url
            };
        }
        // 2) Rendering Lyrics and Music info
        markup = `
        <figure class="artist">
            <img
              src="${result.artistImageHeader ? result.artistImageHeader : "src/img/404.png"}"
              alt="${track.artistName ? result.artistName : "not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${result.headerImage ? result.headerImage : "src/img/404.png"}"
              alt="${track.title ? result.title : "not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${track.title}</span></p>
              <p>
                <span>${track.artistName}</span> &#9679 <span>${track.albumName}</span>${result.releaseDate ? ` &#9679 <span>${result.releaseDate}</span>` : ""}
                ${track.genre ? ` &#9679 <span>${track.genre}</span>` : ""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${!track.hasLyrics ? `<p class="paragraph">"There is no lyrics for this song or Maybe It's is a instrumental :)"</p>` : `
                    <p class="music__lyrics--body paragraph">${lyrics.body}</p>
               
                    <img class="music__image-pixel" src="${lyrics.imagePixel}" alt="image pixel" />
                    <div class="music__copyright">
                    <span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="https://www.azlyrics.com/images/mxm.png" width="184" height="54" alt="MusixMatch">
                    </div>
                    `}
        </div>
    `;
        trackContainer.innerHTML = "";
        trackContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (err) {
        console.error(`${err} \u{1F3C0}\u{1F3C0}\u{1F3C0}`);
        renderError(trackContainer, `${err}`);
    }
};
const markupPagination = function() {
    const numPages = numResults / state.search.perPage;
    const curPage = state.search.page;
    // Created Button based on condition
    const createButton = (classModifier, pathData)=>`

    <button
      data-goto="${classModifier === "prev" ? curPage - 1 : curPage + 1}"
      class="pagination__btn btn--inline pagination__btn--${classModifier}">

      ${classModifier === "next" ? `<span>Page ${curPage + 1}</span>` : ""}
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="${pathData}" />
      </svg>

      ${classModifier === "prev" ? `<span>Page ${curPage - 1}</span>` : ""}
    </button>
  `;
    // Page 1, there are other Pages
    if (curPage === 1 && numPages > 1) return createButton("next", "M8.25 4.5l7.5 7.5-7.5 7.5");
    // Last Page
    if (curPage === numPages && numPages > 1) return createButton("prev", "M15.75 19.5L8.25 12l7.5-7.5");
    // Other Pages (no first, no last)
    if (numPages > curPage) {
        const prevButton = createButton("prev", "M15.75 19.5L8.25 12l7.5-7.5");
        const nextButton = createButton("next", "M8.25 4.5l7.5 7.5-7.5 7.5");
        return prevButton + nextButton;
    }
    // Page 1, there are no other Pages
    return "";
};
const renderPagination = function() {
    const paginationMarkup = markupPagination();
    // Emptying pagination
    paginationContainer.innerHTML = "";
    // Render pagination
    paginationContainer.insertAdjacentHTML("afterbegin", paginationMarkup);
};
const renderSearchResult = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.perPage; // if page is 1 it will be 0
    const end = page * state.search.perPage; // // if page is 1 it will be 9
    state.search.resultsView = state.search.results.slice(start, end);
    const resultMarkup = state.search.resultsView.map((track)=>`
      <li class="preview">
        <a href="#${track.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${track.title}</h3>
          <p class="preview__artist-album">${track.artistName}<span> &#9679 </span>${track.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");
    // Emptying result history
    searchResultView.innerHTML = "";
    // Render results
    searchResultView.insertAdjacentHTML("afterbegin", resultMarkup);
};
const loadPagination = function() {
    paginationContainer.addEventListener("click", function(e) {
        const btn = e.target.closest(".pagination__btn");
        if (!btn) return;
        const goToPage = +btn.dataset.goto;
        // render SearchResult
        renderSearchResult(goToPage);
        // render Pagination
        renderPagination();
    });
};
const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.perPage; // if page is 1 it will be 0
    const end = page * state.search.perPage; // // if page is 1 it will be 9
    state.search.resultsView = state.search.results.slice(start, end);
    return state.search.resultsView;
};
const loadSearchResults = async function() {
    try {
        renderSpinner(searchResultView);
        // 1) Get search query
        const query = await getQuery();
        if (!query) return;
        // 2) Load Search Results
        state.search.query = query;
        const data = await getJSON(`${API_URL}track.search?q_track_artist=${encodeURIComponent(query)}&page_size=${numResults}&apikey=${apiKey}&s_track_rating=DESC
      `);
        if (!data) return renderError(searchResultView);
        // Refactoring search result and pushing in state
        state.search.results = data.message.body.track_list.map(({ track })=>{
            return {
                title: track.track_name,
                commontrackId: track.commontrack_id,
                albumName: track.album_name,
                artistName: track.artist_name
            };
        });
        // 3. Render Search Results
        renderSearchResult();
    } catch (err) {
        console.error(err);
        renderError(searchResultView, `${err}`);
    }
};
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // bringing value of page to 1
    state.search.page = 1;
    // Loading saerch result
    loadSearchResults();
    // state.search.page;
    renderPagination();
    // Loading Pagination
    loadPagination();
});
window.addEventListener("hashchange", loadLyrics);
window.addEventListener("load", loadLyrics);
showAboutUs.addEventListener("click", ()=>{
    modal.showModal();
});
closeBtn.addEventListener("click", ()=>{
    modal.close();
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["gRY1p","ebWYT"], "ebWYT", "parcelRequire5dde")

//# sourceMappingURL=index.739bf03c.js.map
