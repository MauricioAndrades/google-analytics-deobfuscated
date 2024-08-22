// https://www.google-analytics.com/analytics.js
// deobfuscated version of analytics.js
(function() {
    const globalScope = this || self;

    /**
     * @param {string} path
     * @param {} value
     */
    function registerNamespace(path, value) {
        path = path.split(".");
        let c = globalScope;
        path[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + path[0]);
        for (let d; path.length && (d = path.shift());) {
            path.length || void 0 === value ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {})) : (c[d] = value);
        }
    }

    function createCharIndexMapping() {
        for (var a = base64CharSet, b = {}, c = 0; c < a.length; ++c) {
            b[a[c]] = c;
        }
        return b;
    }

    function generateCharacterSet() {
        let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        a += a.toLowerCase() + "0123456789-_";
        return a + ".";
    }

    var base64CharSet;
    var charToIndexMap;

    function decodeBase64(a) {
        function b(k) {
            for (; d < a.length;) {
                const m = a.charAt(d++);
                const l = charToIndexMap[m];
                if (null != l) {
                    return l;
                }
                if (!/^[\s\xa0]*$/.test(m)) {
                    throw Error("Unknown base64 encoding at char: " + m);
                }
            }
            return k;
        }
        base64CharSet = base64CharSet || generateCharacterSet();
        charToIndexMap = charToIndexMap || createCharIndexMapping();
        for (var c = "", d = 0;;) {
            const e = b(-1);
            const f = b(0);
            const h = b(64);
            const g = b(64);
            if (64 === g && -1 === e) {
                return c;
            }
            c += String.fromCharCode((e << 2) | (f >> 4));
            64 != h && ((c += String.fromCharCode(((f << 4) & 240) | (h >> 2))), 64 != g && (c += String.fromCharCode(((h << 6) & 192) | g)));
        }
    }

    const EventTagging = {};

    // Original: y
    function tagEvent(a) {
        EventTagging.TAGGING = EventTagging.TAGGING || [];
        EventTagging.TAGGING[a] = !0;
    }

    const isArray = Array.isArray;

    // Original: ca
    function findInArray(arr, predicate) {
        if (arr && isArray(arr)) {
            for (let c = 0; c < arr.length; c++) {
                if (arr[c] && predicate(arr[c])) {
                    return arr[c];
                }
            }
        }
    }

    // Z
    function extendTarget(target, source) {
        for (const c in source) {
            source.hasOwnProperty(c) && (target[c] = source[c]);
        }
    }

    function isEmptyObject(obj) {
        for (const b in obj) {
            if (obj.hasOwnProperty(b)) {
                return !0;
            }
        }
        return !1;
    }

    class SimpleObject {
        value;
        constructor(value) {
            this.value = value;
        }
        toString() {
            return this.value.toString();
        }
    }
    // C
    const URL_REGEX = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    new SimpleObject("about:invalid#zClosurez");
    new SimpleObject("about:blank");

    class StringWrapper {
        value;
        constructor() {
            this.value = "";
        }
        toString() {
            return this.value.toString();
        }
    }
    // D
    new StringWrapper();
    // E
    class StringWrapper2 {
        value;
        constructor() {
            this.value = "";
        }
        toString() {
            return this.value.toString();
        }
    }

    new StringWrapper2();

    // F
    class TrustedHTML {
        trustedTypesHTML;
        constructor() {
            this.trustedTypesHTML = (globalScope.trustedTypes && globalScope.trustedTypes.emptyHTML) || "";
        }
        toString() {
            return this.trustedTypesHTML.toString();
        }
    }
    new TrustedHTML();
    const win = window;
    const history = window.history;
    const doc = document;
    const nav = navigator;

    function getSharedData() {
        const a = {};
        const b = win.google_tag_data;
        win.google_tag_data = void 0 === b ? a : b;
        return win.google_tag_data;
    }

    // L
    function addEventListener(a, b) {
        doc.addEventListener ? doc.addEventListener(a, b, !1) : doc.attachEvent && doc.attachEvent("on" + a, b);
    }

    function registerClickEvent(a) {
        const b = getOrCreateSharedData();
        b.pending || (b.pending = []);
        findInArray(b.pending, (c) => c.target.ctid === a.ctid && c.target.isDestination === a.isDestination) || b.pending.push({ target: a, onLoad: void 0 });
    }

    function SharedDataContainer() {
        this.container = {};
        this.destination = {};
        this.canonical = {};
        this.pending = [];
    }

    function getOrCreateSharedData() {
        const a = getSharedData();
        let b = a.tidr;
        b || ((b = new SharedDataContainer()), (a.tidr = b));
        return b;
    }

    const portPattern = /:[0-9]+$/;

    function manipulateUrl(url, component) {
        component && (component = String(component).toLowerCase());
        if ("protocol" === component || "port" === component) {
            url.protocol = normalizeProtocol(url.protocol) || normalizeProtocol(win.location.protocol);
        }
        "port" === component ? (url.port = String(Number(url.hostname ? url.port : win.location.port) || ("http" === url.protocol ? 80 : "https" === url.protocol ? 443 : ""))) : "host" === component && (url.hostname = (url.hostname || win.location.hostname).replace(portPattern, "").toLowerCase());
        return processUrl(url, component);
    }

    function processUrl(url, component, useAltHost) {
        const d = normalizeProtocol(url.protocol);
        component && (component = String(component).toLowerCase());
        switch (component) {
            case "url_no_fragment":
                useAltHost = "";
                url && url.href && ((useAltHost = url.href.indexOf("#")), (useAltHost = 0 > useAltHost ? url.href : url.href.substr(0, useAltHost)));
                url = useAltHost;
                break;
            case "protocol":
                url = d;
                break;
            case "host":
                url = url.hostname.replace(portPattern, "").toLowerCase();
                useAltHost && (useAltHost = /^www\d*\./.exec(url)) && useAltHost[0] && (url = url.substr(useAltHost[0].length));
                break;
            case "port":
                url = String(Number(url.port) || ("http" === d ? 80 : "https" === d ? 443 : ""));
                break;
            case "path":
                url.pathname || url.hostname || tagEvent(1);
                url = "/" === url.pathname.substr(0, 1) ? url.pathname : "/" + url.pathname;
                url = url.split("/");
                0 <= [].indexOf(url[url.length - 1]) && (url[url.length - 1] = "");
                url = url.join("/");
                break;
            case "query":
                url = url.search.replace("?", "");
                break;
            case "extension":
                url = url.pathname.split(".");
                url = 1 < url.length ? url[url.length - 1] : "";
                url = url.split("/")[0];
                break;
            case "fragment":
                url = url.hash.replace("#", "");
                break;
            default:
                url = url && url.href;
        }
        return url;
    }

    function normalizeProtocol(a) {
        return a ? a.replace(":", "").toLowerCase() : "";
    }

    function parseUrl(a) {
        const b = doc.createElement("a");
        a && (b.href = a);
        let c = b.pathname;
        "/" !== c[0] && (a || tagEvent(1), (c = "/" + c));
        a = b.hostname.replace(portPattern, "");
        return { href: b.href, protocol: b.protocol, host: b.host, hostname: a, pathname: c, search: b.search, hash: b.hash, port: b.port };
    }

    let S;

    function initializeEventTracking() {
        const a = handleClick;
        const b = handleSubmit;
        const c = getEventTrackingState();

        const d = function(h) {
            a(h.target || h.srcElement || {});
        };

        const e = function(h) {
            b(h.target || h.srcElement || {});
        };

        if (!c.init) {
            addEventListener("mousedown", d);
            addEventListener("keyup", d);
            addEventListener("submit", e);
            const f = HTMLFormElement.prototype.submit;
            HTMLFormElement.prototype.submit = function() {
                b(this);
                f.call(this);
            };
            c.init = !0;
        }
    }

    function registerDecorator(a, b, c, d, e) {
        a = { callback: a, domains: b, fragment: 2 === c, placement: c, forms: d, sameHost: e };
        getEventTrackingState().decorators.push(a);
    }

    function applyDecorators(a, b, c) {
        for (var d = getEventTrackingState().decorators, e = {}, f = 0; f < d.length; ++f) {
            const h = d[f];
            let g;
            if ((g = !c || h.forms)) {
                a: {
                    g = h.domains;
                    const k = a;
                    const m = !!h.sameHost;
                    if (g && (m || k !== doc.location.hostname)) {
                        for (let l = 0; l < g.length; l++) {
                            if (g[l] instanceof RegExp) {
                                if (g[l].test(k)) {
                                    g = !0;
                                    break a;
                                }
                            } else if (0 <= k.indexOf(g[l]) || (m && 0 <= g[l].indexOf(k))) {
                                g = !0;
                                break a;
                            }
                        }
                    }
                    g = !1;
                }
            }
            g && ((g = h.placement), void 0 == g && (g = h.fragment ? 2 : 1), g === b && extendTarget(e, h.callback()));
        }
        return e;
    }

    function getEventTrackingState() {
        const a = getSharedData();
        let b = a.gl;
        (b && b.decorators) || ((b = { decorators: [] }), (a.gl = b));
        return b;
    }
    const ja = /(.*?)\*(.*?)\*(.*)/;
    const ka = /([^?#]+)(\?[^#]*)?(#.*)?/;
    // W
    function createParamRegex(a) {
        return new RegExp("(.*?)(^|&)" + a + "=([^&]*)&?(.*)");
    }
    // X
    function encodeParams(a) {
        const b = [];
        let c;
        for (c in a) {
            if (a.hasOwnProperty(c)) {
                let d = a[c];
                if (void 0 !== d && d === d && null !== d && "[object Object]" !== d.toString()) {
                    b.push(c);
                    const e = b;
                    const f = e.push;
                    d = String(d);
                    base64CharSet = base64CharSet || generateCharacterSet();
                    charToIndexMap = charToIndexMap || createCharIndexMapping();
                    for (var h = [], g = 0; g < d.length; g += 3) {
                        const k = g + 1 < d.length;
                        const m = g + 2 < d.length;
                        let l = d.charCodeAt(g);
                        let t = k ? d.charCodeAt(g + 1) : 0;
                        let x = m ? d.charCodeAt(g + 2) : 0;
                        const ra = l >> 2;
                        l = ((l & 3) << 4) | (t >> 4);
                        t = ((t & 15) << 2) | (x >> 6);
                        x &= 63;
                        m || ((x = 64), k || (t = 64));
                        h.push(base64CharSet[ra], base64CharSet[l], base64CharSet[t], base64CharSet[x]);
                    }
                    f.call(e, h.join(""));
                }
            }
        }
        a = b.join("*");
        return ["1", calculateChecksum(a), a].join("*");
    }
    // la
    function calculateChecksum(a, b) {
        a = [nav.userAgent, new Date().getTimezoneOffset(), nav.userLanguage || nav.language, Math.floor(new Date(Date.now()).getTime() / 60 / 1e3) - (void 0 === b ? 0 : b), a].join("*");
        if (!(b = S)) {
            b = Array(256);
            for (var c = 0; 256 > c; c++) {
                for (var d = c, e = 0; 8 > e; e++) {
                    d = d & 1 ? (d >>> 1) ^ 3988292384 : d >>> 1;
                }
                b[c] = d;
            }
        }
        S = b;
        b = 4294967295;
        for (c = 0; c < a.length; c++) {
            b = (b >>> 8) ^ S[(b ^ a.charCodeAt(c)) & 255];
        }
        return ((b ^ -1) >>> 0).toString(36);
    }
    // ma
    function decorateUrl(a) {
        return function(b) {
            const c = parseUrl(win.location.href);
            const d = c.search.replace("?", "");
            a: {
                var e = d.split("&");
                for (var f = 0; f < e.length; f++) {
                    const h = e[f].split("=");
                    if ("_gl" === decodeURIComponent(h[0]).replace(/\+/g, " ")) {
                        e = h.slice(1).join("=");
                        break a;
                    }
                }
                e = void 0;
            }
            b.query = decodeQueryParam(e || "") || {};
            e = manipulateUrl(c, "fragment");
            f = e.match(createParamRegex("_gl"));
            b.fragment = decodeQueryParam((f && f[3]) || "") || {};
            a && updateUrl(c, d, e);
        };
    }
    // pa
    function removeParamFromString(a, b) {
        if ((a = createParamRegex(a).exec(b))) {
            const c = a[2];
            const d = a[4];
            b = a[1];
            d && (b = b + c + d);
        }
        return b;
    }
    // oa
    function updateUrl(a, b, c) {
        function d(f, h) {
            f = removeParamFromString("_gl", f);
            f.length && (f = h + f);
            return f;
        }
        if (history && history.replaceState) {
            const e = createParamRegex("_gl");
            if (e.test(b) || e.test(c)) {
                (a = manipulateUrl(a, "path")), (b = d(b, "?")), (c = d(c, "#")), history.replaceState({}, void 0, "" + a + b + c);
            }
        }
    }
    // na
    function decodeQueryParam(a) {
        try {
            a: {
                if (a) {
                    b: {
                        for (var b = 0; 3 > b; ++b) {
                            const c = ja.exec(a);
                            if (c) {
                                var d = c;
                                break b;
                            }
                            a = decodeURIComponent(a);
                        }
                        d = void 0;
                    }
                    if (d && "1" === d[1]) {
                        var e = d[2];
                        const f = d[3];
                        b: {
                            for (d = 0; 3 > d; ++d) {
                                if (e === calculateChecksum(f, d)) {
                                    var h = !0;
                                    break b;
                                }
                            }
                            h = !1;
                        }
                        if (h) {
                            var g = f;
                            break a;
                        }
                        tagEvent(7);
                    }
                }
                g = void 0;
            }
            e = g;
            if (void 0 !== e) {
                g = {};
                const k = e ? e.split("*") : [];
                for (e = 0; e + 1 < k.length; e += 2) {
                    const m = k[e];
                    const l = decodeBase64(k[e + 1]);
                    g[m] = l;
                }
                tagEvent(6);
                return g;
            }
        } catch (t) {
            tagEvent(8);
        }
    }
    // Y
    function addParamToUrl(a, b, c, d) {
        function e(k) {
            k = removeParamFromString(a, k);
            const m = k.charAt(k.length - 1);
            k && "&" !== m && (k += "&");
            return k + g;
        }
        d = void 0 === d ? !1 : d;
        let f = ka.exec(c);
        if (!f) {
            return "";
        }
        c = f[1];
        let h = f[2] || "";
        f = f[3] || "";
        var g = a + "=" + b;
        d ? (f = "#" + e(f.substring(1))) : (h = "?" + e(h.substring(1)));
        return "" + c + h + f;
    }
    // qa
    function processLinkOrForm(a, b) {
        let c = "FORM" === (a.tagName || "").toUpperCase();
        let d = applyDecorators(b, 1, c);
        const e = applyDecorators(b, 2, c);
        b = applyDecorators(b, 3, c);
        isEmptyObject(d) && ((d = encodeParams(d)), c ? appendHiddenInput("_gl", d, a) : addParamToAnchor("_gl", d, a, !1));
        !c && isEmptyObject(e) && ((c = encodeParams(e)), addParamToAnchor("_gl", c, a, !0));
        for (const f in b) {
            b.hasOwnProperty(f) && setUrlParam(f, b[f], a);
        }
    }
    // ta
    function setUrlParam(a, b, c, d) {
        if (c.tagName) {
            if ("a" === c.tagName.toLowerCase()) {
                return addParamToAnchor(a, b, c, d);
            }
            if ("form" === c.tagName.toLowerCase()) {
                return appendHiddenInput(a, b, c);
            }
        }
        if ("string" == typeof c) {
            return addParamToUrl(a, b, c, d);
        }
    }
    // Z
    function addParamToAnchor(a, b, c, d) {
        c.href && ((a = addParamToUrl(a, b, c.href, void 0 === d ? !1 : d)), URL_REGEX.test(a) && (c.href = a));
    }
    // sa
    function appendHiddenInput(a, b, c) {
        if (c && c.action) {
            let d = (c.method || "").toLowerCase();
            if ("get" === d) {
                d = c.childNodes || [];
                for (var e = !1, f = 0; f < d.length; f++) {
                    const h = d[f];
                    if (h.name === a) {
                        h.setAttribute("value", b);
                        e = !0;
                        break;
                    }
                }
                e || ((d = doc.createElement("input")), d.setAttribute("type", "hidden"), d.setAttribute("name", a), d.setAttribute("value", b), c.appendChild(d));
            } else {
                "post" === d && ((a = addParamToUrl(a, b, c.action)), URL_REGEX.test(a) && (c.action = a));
            }
        }
    }
    // fa
    function handleClick(a) {
        try {
            a: {
                for (let b = 100; a && 0 < b;) {
                    if (a.href && a.nodeName.match(/^a(?:rea)?$/i)) {
                        var c = a;
                        break a;
                    }
                    a = a.parentNode;
                    b--;
                }
                c = null;
            }
            if (c) {
                const d = c.protocol;
                ("http:" !== d && "https:" !== d) || processLinkOrForm(c, c.hostname);
            }
        } catch (e) {}
    }
    // ha
    function handleSubmit(a) {
        try {
            if (a.action) {
                const b = manipulateUrl(parseUrl(a.action), "host");
                processLinkOrForm(a, b);
            }
        } catch (c) {}
    }
    registerNamespace("google_tag_data.glBridge.auto", function(a, b, c, d) {
        initializeEventTracking();
        registerDecorator(a, b, "fragment" === c ? 2 : 1, !!d, !1);
    });
    registerNamespace("google_tag_data.glBridge.passthrough", function(a, b, c) {
        initializeEventTracking();
        registerDecorator(a, [processUrl(win.location, "host", !0)], b, !!c, !0);
    });
    registerNamespace("google_tag_data.glBridge.decorate", function(a, b, c) {
        a = encodeParams(a);
        return setUrlParam("_gl", a, b, !!c);
    });
    registerNamespace("google_tag_data.glBridge.generate", encodeParams);
    registerNamespace("google_tag_data.glBridge.get", function(a, b) {
        let c = decorateUrl(!!b);
        b = getEventTrackingState();
        b.data || ((b.data = { query: {}, fragment: {} }), c(b.data));
        c = {};
        if ((b = b.data)) {
            extendTarget(c, b.query), a && extendTarget(c, b.fragment);
        }
        return c;
    });
    registerNamespace("google_tag_data.tcBridge.registerUa", function(a, b) {
        a = a + "_" + b;
        const c = getOrCreateSharedData();
        const d = c.destination[a];
        d ? ((d.state = 2), (d.containers = []), (d.destinations = [b])) : (c.destination[a] = { state: 2, containers: [], destinations: [b] });
    });
    registerNamespace("google_tag_data.tcBridge.setSideload", function(a, b, c) {
        a = { ctid: a + "_" + c, isDestination: !0 };
        getOrCreateSharedData().container[b] = { state: 1, context: { source: 5, fromContainerExecution: !0 }, parent: a };
        registerClickEvent({ ctid: b, isDestination: !1 });
    });
})(window);
(function() {
    function generateHash(a) {
        let b = 1;
        let c;
        if (a) {
            for (b = 0, c = a.length - 1; 0 <= c; c--) {
                let d = a.charCodeAt(c);
                b = ((b << 6) & 268435455) + d + (d << 14);
                d = b & 266338304;
                b = 0 != d ? b ^ (d >> 21) : b;
            }
        }
        return b;
    }
    class BitSet {
        value;
        /** @param {[]|undefined} [a] */
        constructor(a) {
            this.value = a || [];
        }
        set(a) {
            this.value[a] = !0;
        }
        get(a) {
            return this.value[a];
        }
        encode() {
            for (var a = [], b = 0; b < this.value.length; b++) {
                this.value[b] && (a[Math.floor(b / 6)] ^= 1 << b % 6);
            }
            for (b = 0; b < a.length; b++) {
                a[b] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b] || 0);
            }
            return a.join("") + "~";
        }
    }
    const _GoogleAnalyticsObject = window.GoogleAnalyticsObject;
    let isGoogleAnalyticsInitialized;
    if ((isGoogleAnalyticsInitialized = void 0 != _GoogleAnalyticsObject)) {
        isGoogleAnalyticsInitialized = -1 < (_GoogleAnalyticsObject.constructor + "").indexOf("String");
    }
    let googleAnalyticsObjectName;
    if ((googleAnalyticsObjectName = isGoogleAnalyticsInitialized)) {
        const gaObject = window.GoogleAnalyticsObject;
        googleAnalyticsObjectName = gaObject ? gaObject.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : "";
    }
    /** @type {string} */
    const gaObjectName = googleAnalyticsObjectName || "ga";
    const clientIdPattern = /^(?:utma\.)?\d+\.\d+$/;
    const ampClientIdPattern = /^amp-[\w.-]{22,64}$/;
    let forceSSL = !1;
    const bitSetInstance = new BitSet();
    // J
    function setBitSetFlag(a) {
        bitSetInstance.set(a);
    }
    // Td
    function encodeBits(a) {
        a = getBitSet(a);
        a = new BitSet(a);
        for (var b = bitSetInstance.value.slice(), c = 0; c < a.C.length; c++) {
            b[c] = b[c] || a.C[c];
        }
        return new BitSet(b).encode();
    }
    // Dd
    function getBitSet(a) {
        a = a.get(_umProperty);
        isArray(a) || (a = []);
        return a;
    }
    // ea
    function isFunction(a) {
        return "function" == typeof a;
    }
    // ka
    function isArray(a) {
        return "[object Array]" == Object.prototype.toString.call(Object(a));
    }
    // qa
    function isString(a) {
        return void 0 != a && -1 < (a.constructor + "").indexOf("String");
    }
    // D
    function startsWith(a, b) {
        return 0 == a.indexOf(b);
    }
    // sa
    function trimString(a) {
        return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : "";
    }
    // ra
    function generateUniqueClientId() {
        for (var a = window.navigator.userAgent + (document.cookie ? document.cookie : "") + (document.referrer ? document.referrer : ""), b = a.length, c = window.history.length; 0 < c;) {
            a += c-- ^ b++;
        }
        return [generateRandomID() ^ (generateHash(a) & 2147483647), Math.round(new Date().getTime() / 1e3)].join(".");
    }
    // ta
    function createImagePixel(src) {
        const b = document.createElement("img");
        b.width = 1;
        b.height = 1;
        b.src = src;
        return b;
    }

    const noop = function() {};
    // K
    function safeEncodeURIComponent(a) {
        if (encodeURIComponent instanceof Function) {
            return encodeURIComponent(a);
        }
        setBitSetFlag(28);
        return a;
    }
    // L
    function addEventListenerSafe(a, b, c, d) {
        try {
            a.addEventListener ? a.addEventListener(b, c, !!d) : a.attachEvent && a.attachEvent("on" + b, c);
        } catch (e) {
            setBitSetFlag(27);
        }
    }
    // f
    const safeUrlPattern = /^[\w\-:/.?=&%!\[\]]+$/;
    // Nd
    const noncePattern = /^[\w+/_-]+[=]{0,2}$/;
    // ff
    let trustedTypesPolicy = null;
    // Id
    function loadScript(a, b, c, d, e) {
        if (!trustedTypesPolicy) {
            trustedTypesPolicy = {
                createScriptURL(ca) {
                    return ca;
                },
                createHTML(ca) {
                    return ca;
                }
            };
            try {
                trustedTypesPolicy = window.trustedTypes.createPolicy("google-analytics", trustedTypesPolicy);
            } catch (ca) {}
        }
        if (a) {
            let g = (document.querySelector && document.querySelector("script[nonce]")) || null;
            g = g ? g.nonce || (g.getAttribute && g.getAttribute("nonce")) || "" : "";
            c ? ((e = d = ""), b && safeUrlPattern.test(b) && (d = " id=\"" + b + "\""), g && noncePattern.test(g) && (e = " nonce=\"" + g + "\""), safeUrlPattern.test(a) && document.write(trustedTypesPolicy.createHTML("<script" + d + e + " src=\"" + a + "\">\x3c/script>"))) : ((c = document.createElement("script")), (c.type = "text/javascript"), (c.async = !0), (c.src = trustedTypesPolicy.createScriptURL(a)), d && (c.onload = d), e && (c.onerror = e), b && (c.id = b), g && c.setAttribute("nonce", g), (a = document.getElementsByTagName("script")[0]), a.parentNode.insertBefore(c, a));
        }
    }
    // be
    function getUrlParameter(a, b) {
        return extractQueryStringValue(document.location[b ? "href" : "search"], a);
    }
    // E
    function extractQueryStringValue(a, b) {
        return (a = a.match("(?:&|#|\\?)" + safeEncodeURIComponent(b).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == a.length ? a[1] : "";
    }
    // xa
    function getDomainName() {
        const a = "" + document.location.hostname;
        return 0 == a.indexOf("www.") ? a.substring(4) : a;
    }
    // de
    function matchesUrlPattern(a, b) {
        const c = a.indexOf(b);
        if (5 == c || 6 == c) {
            if (((a = a.charAt(c + b.length)), "/" == a || "?" == a || "" == a || ":" == a)) {
                return !0;
            }
        }
        return !1;
    }
    // of
    function getReferrer(a, b) {
        const c = document.referrer;
        if (/^(https?|android-app):\/\//i.test(c)) {
            if (a) {
                return c;
            }
            a = "//" + document.location.hostname;
            if (!matchesUrlPattern(c, a)) {
                return b && ((b = a.replace(/\./g, "-") + ".cdn.ampproject.org"), matchesUrlPattern(c, b)) ? void 0 : c;
            }
        }
    }
    // za
    function combineArgumentsToObject(a, b) {
        if (1 == b.length && null != b[0] && "object" === typeof b[0]) {
            return b[0];
        }
        for (var c = {}, d = Math.min(a.length + 1, b.length), e = 0; e < d; e++) {
            if ("object" === typeof b[e]) {
                for (const g in b[e]) {
                    b[e].hasOwnProperty(g) && (c[g] = b[e][g]);
                }
                break;
            } else {
                e < a.length && (c[a[e]] = b[e]);
            }
        }
        return c;
    }
    // Ee
    function containsValue(a, b) {
        for (let c = 0; c < a.length; c++) {
            if (b == a[c]) {
                return !0;
            }
        }
        return !1;
    }
    // ee
    class SimpleStorage {
        constructor() {
            this.oa = [];
            this.ea = {};
            this.m = {};
        }
        /** @param {string} key @param {any} value @param {undefined} [isCustom] */
        set(key, value, isCustom) {
            this.oa.push(key);
            isCustom ? (this.m[":" + key] = value) : (this.ea[":" + key] = value);
        }
        get(a) {
            return this.m.hasOwnProperty(":" + a) ? this.m[":" + a] : this.ea[":" + a];
        }
        map(a) {
            for (var b = 0; b < this.oa.length; b++) {
                var c = this.oa[b];
                var d = this.get(c);
                d && a(c, d);
            }
        }
    }
    // var window = window;
    // var document = document;
    const currentScriptSrc = document.currentScript ? document.currentScript.src : "";
    // va
    function setTimeoutWrapper(callback, delay) {
        return setTimeout(callback, delay);
    }
    // Qa
    // var window = window;
    // Za
    // var document = document;
    // G
    function isOptOut(trackingId) {
        let b = window._gaUserPrefs;
        if ((b && b.ioo && b.ioo()) || document.documentElement.hasAttribute("data-google-analytics-opt-out") || (trackingId && !0 === window["ga-disable-" + trackingId])) {
            return !0;
        }
        try {
            var c = window.external;
            if (c && c._gaUserPrefs && "oo" == c._gaUserPrefs) {
                return !0;
            }
        } catch (g) {}
        trackingId = [];
        b = String(document.cookie).split(";");
        for (c = 0; c < b.length; c++) {
            let d = b[c].split("=");
            const e = d[0].replace(/^\s*|\s*$/g, "");
            e && "AMP_TOKEN" == e && ((d = d.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && (d = decodeURIComponent(d)), trackingId.push(d));
        }
        for (b = 0; b < trackingId.length; b++) {
            if ("$OPT_OUT" == trackingId[b]) {
                return !0;
            }
        }
        return document.getElementById("__gaOptOutExtension") ? !0 : !1;
    }
    // Ca
    function getCookieValues(cookieName) {
        const b = [];
        const c = document.cookie.split(";");
        cookieName = new RegExp("^\\s*" + cookieName + "=\\s*(.*?)\\s*$");
        for (let d = 0; d < c.length; d++) {
            const e = c[d].match(cookieName);
            e && b.push(e[1]);
        }
        return b;
    }
    // zc
    function setCookie(name, value, path, domain, expires, g, ca) {
        expires = isOptOut(expires) ? !1 : doubleClickDomainPattern.test(document.location.hostname) || ("/" == path && googleDomainPattern.test(domain)) ? !1 : !0;
        if (!expires) {
            return !1;
        }
        value && 1200 < value.length && (value = value.substring(0, 1200));
        path = name + "=" + value + "; path=" + path + "; ";
        g && (path += "expires=" + new Date(new Date().getTime() + g).toGMTString() + "; ");
        domain && "none" !== domain && (path += "domain=" + domain + ";");
        ca && (path += ca + ";");
        domain = document.cookie;
        document.cookie = path;
        if (!(domain = domain != document.cookie)) {
            a: {
                name = getCookieValues(name);
                for (domain = 0; domain < name.length; domain++) {
                    if (value == name[domain]) {
                        domain = !0;
                        break a;
                    }
                }
                domain = !1;
            }
        }
        return domain;
    }
    // Cc
    function safeUrlEncode(a) {
        return encodeURIComponent ? encodeURIComponent(a).replace(/\(/g, "%28").replace(/\)/g, "%29") : a;
    }
    // vc
    var googleDomainPattern = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/;
    // eb
    var doubleClickDomainPattern = /(^|\.)doubleclick\.net$/i;
    // Oe
    function getGACCookieValues(cookieName) {
        const b = [];
        const c = document.cookie.split(";");
        cookieName = new RegExp("^\\s*" + (cookieName || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
        for (let d = 0; d < c.length; d++) {
            const e = c[d].match(cookieName);
            e && b.push({ ja: e[1], value: e[2], timestamp: Number(e[2].split(".")[1]) || 0 });
        }
        b.sort(function(g, ca) {
            return ca.timestamp - g.timestamp;
        });
        return b;
    }
    // df
    function extractGAValues(storage, cookieName, isAdStorage) {
        cookieName = getGACCookieValues(cookieName);
        const d = {};
        if (!cookieName || !cookieName.length) {
            return d;
        }
        for (let e = 0; e < cookieName.length; e++) {
            const g = cookieName[e].value.split(".");
            if ("1" !== g[0] || (isAdStorage && 3 > g.length) || (!isAdStorage && 3 !== g.length)) {
                storage && (storage.na = !0);
            } else if (Number(g[1])) {
                d[cookieName[e].ja] ? storage && (storage.pa = !0) : (d[cookieName[e].ja] = []);
                const ca = { version: g[0], timestamp: 1e3 * Number(g[1]), qa: g[2] };
                isAdStorage && 3 < g.length && (ca.labels = g.slice(3));
                d[cookieName[e].ja].push(ca);
            }
        }
        return d;
    }
    // Fa
    let Fa;
    // Ga
    let Ga;
    // fb
    let fb;
    // Ab
    let Ab;
    // ja
    const isAmpReferrer = /^https?:\/\/[^/]*cdn\.ampproject\.org\//;
    // Ue
    const ampDomainPattern = /^(?:www\.|m\.|amp\.)+/;
    // Ub
    let ampClientIdCallbacks = [];

    function addTargetToPending(a) {
        if (isValidAMPRequest(a[useAmpClientIdProperty])) {
            if (void 0 === Ab) {
                var b;
                if ((b = ((b = tagDataBridge.get()) && b._ga) || void 0)) {
                    (Ab = b), setBitSetFlag(81);
                }
            }
            if (void 0 !== Ab) {
                return a[clientIdProperty] || (a[clientIdProperty] = Ab), !1;
            }
        }
        if (a[useAmpClientIdProperty]) {
            setBitSetFlag(67);
            if (a[storageProperty] && "cookie" != a[storageProperty]) {
                return !1;
            }
            if (void 0 !== Ab) {
                a[clientIdProperty] || (a[clientIdProperty] = Ab);
            } else {
                a: {
                    b = String(a[cookieDomainProperty] || getDomainName());
                    const c = String(a[cookiePathProperty] || "/");
                    const d = getCookieValues(String(a[cookieNameProperty] || "_ga"));
                    b = getSessionIdFromValuesOrCookies(d, b, c);
                    if (!b || clientIdPattern.test(b)) {
                        b = !0;
                    } else if (((b = getCookieValues("AMP_TOKEN")), 0 == b.length)) {
                        b = !0;
                    } else {
                        if (1 == b.length && ((b = decodeURIComponent(b[0])), "$RETRIEVING" == b || "$OPT_OUT" == b || "$ERROR" == b || "$NOT_FOUND" == b)) {
                            b = !0;
                            break a;
                        }
                        b = !1;
                    }
                }
                if (b && isClientIdRetrievable(initiateClientIdRetrieval, String(a[trackingIdProperty]))) {
                    return !0;
                }
            }
        }
        return !1;
    }
    // ic
    function initiateClientIdRetrieval() {
        CommandQueue.executeCommands([noop]);
    }
    // tc
    function isClientIdRetrievable(a, b) {
        let c = getCookieValues("AMP_TOKEN");
        if (1 < c.length) {
            return setBitSetFlag(55), !1;
        }
        c = decodeURIComponent(c[0] || "");
        if ("$OPT_OUT" == c || "$ERROR" == c || isOptOut(b)) {
            return setBitSetFlag(62), !1;
        }
        if (!isAmpReferrer.test(document.referrer) && "$NOT_FOUND" == c) {
            return setBitSetFlag(68), !1;
        }
        if (void 0 !== Ab) {
            return (setBitSetFlag(56),
                setTimeoutWrapper(function() {
                    a(Ab);
                }, 0),
                !0);
        }
        if (Fa) {
            return ampClientIdCallbacks.push(a), !0;
        }
        if ("$RETRIEVING" == c) {
            return (setBitSetFlag(57),
                setTimeoutWrapper(function() {
                    isClientIdRetrievable(a, b);
                }, 1e4),
                !0);
        }
        Fa = !0;
        (c && "$" != c[0]) || (setAmpTokenCookieForDomain("$RETRIEVING", 3e4), setTimeout(Mc, 3e4), (c = ""));
        return sendAmpClientIdRequest(c, b) ? (ampClientIdCallbacks.push(a), !0) : !1;
    }
    // Pc
    function sendAmpClientIdRequest(a, b, c) {
        if (!window.JSON) {
            return setBitSetFlag(58), !1;
        }
        let d = window.XMLHttpRequest;
        if (!d) {
            return setBitSetFlag(59), !1;
        }
        let e = new d();
        if (!("withCredentials" in e)) {
            return setBitSetFlag(60), !1;
        }
        e.open("POST", (c || "https://ampcid.google.com/v1/publisher:getClientId") + "?key=AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM", !0);
        e.withCredentials = !0;
        e.setRequestHeader("Content-Type", "text/plain");
        e.onload = function() {
            Fa = !1;
            if (4 == e.readyState) {
                try {
                    200 != e.status && (setBitSetFlag(61), updateAMPClientId("", "$ERROR", 3e4));
                    const g = JSON.parse(e.responseText);
                    g.optOut ? (setBitSetFlag(63), updateAMPClientId("", "$OPT_OUT", 31536e6)) : g.clientId ? updateAMPClientId(g.clientId, g.securityToken, 31536e6) : !c && g.alternateUrl ? (Ga && clearTimeout(Ga), (Fa = !0), sendAmpClientIdRequest(a, b, g.alternateUrl)) : (setBitSetFlag(64), updateAMPClientId("", "$NOT_FOUND", 36e5));
                } catch (ca) {
                    setBitSetFlag(65), updateAMPClientId("", "$ERROR", 3e4);
                }
                e = null;
            }
        };
        d = { originScope: "AMP_ECID_GOOGLE" };
        a && (d.securityToken = a);
        e.send(JSON.stringify(d));
        Ga = setTimeoutWrapper(function() {
            setBitSetFlag(66);
            updateAMPClientId("", "$ERROR", 3e4);
        }, 1e4);
        return !0;
    }

    function Mc() {
        Fa = !1;
    }

    function setAmpTokenCookieForDomain(a, b) {
        if (void 0 === fb) {
            fb = "";
            for (let c = getSubdomainHierarchy(), d = 0; d < c.length; d++) {
                const e = c[d];
                if (setCookie("AMP_TOKEN", encodeURIComponent(a), "/", e, "", b)) {
                    fb = e;
                    return;
                }
            }
        }
        setCookie("AMP_TOKEN", encodeURIComponent(a), "/", fb, "", b);
    }
    // Qc
    function updateAMPClientId(a, b, c) {
        Ga && clearTimeout(Ga);
        b && setAmpTokenCookieForDomain(b, c);
        Ab = a;
        b = ampClientIdCallbacks;
        ampClientIdCallbacks = [];
        for (c = 0; c < b.length; c++) {
            b[c](a);
        }
    }
    // ye
    function isValidAMPRequest(a) {
        a: {
            if (isAmpReferrer.test(document.referrer)) {
                var b = document.location.hostname.replace(ampDomainPattern, "");
                b: {
                    var c = document.referrer;
                    c = c.replace(/^https?:\/\//, "");
                    var d = c.replace(/^[^/]+/, "").split("/");
                    const e = d[2];
                    d = (d = "s" == e ? d[3] : e) ? decodeURIComponent(d) : d;
                    if (!d) {
                        if (0 == c.indexOf("xn--")) {
                            c = "";
                            break b;
                        }
                        (c = c.match(/(.*)\.cdn\.ampproject\.org\/?$/)) && 2 == c.length && (d = c[1].replace(/-/g, ".").replace(/\.\./g, "-"));
                    }
                    c = d ? d.replace(ampDomainPattern, "") : "";
                }
                (d = b === c) || ((c = "." + c), (d = b.substring(b.length - c.length, b.length) === c));
                if (d) {
                    b = !0;
                    break a;
                } else {
                    setBitSetFlag(78);
                }
            }
            b = !1;
        }
        return b && !1 !== a;
    }
    // bd
    function getAnalyticsURL(a) {
        return ((a ? "https:" : forceSSL || "https:" == document.location.protocol ? "https:" : "http:") + "//www.google-analytics.com");
    }
    // Ge
    function getGTagScriptURL(a) {
        switch (a) {
            default:
            case 1:
                return "https://www.google-analytics.com/gtm/js?id=";
            case 2:
                return "https://www.googletagmanager.com/gtag/js?id=";
        }
    }
    // Da
    function LenError(a) {
        this.name = "len";
        this.message = a + "-8192";
    }
    // ba
    function sendAnalyticsData(a, b, c) {
        c = c || noop;
        if (2036 >= b.length) {
            sendDataUsingImage(a, b, c);
        } else if (8192 >= b.length) {
            sendDataUsingBeacon(a, b, c) || sendDataUsingXHR(a, b, c) || sendDataUsingImage(a, b, c);
        } else {
            throw (logError("len", b.length), new LenError(b.length));
        }
    }
    // pe
    function sendDataWithQueryString(a, b, c, d) {
        d = d || noop;
        sendDataUsingXHR(a + "?" + b, "", d, c);
    }
    // wc
    function sendDataUsingImage(endpoint, data, callback) {
        const d = createImagePixel(endpoint + "?" + data);
        d.onload = d.onerror = function() {
            d.onload = null;
            d.onerror = null;
            callback();
        };
    }
    // wd
    function sendDataUsingXHR(endpoint, data, callback, errCallback) {
        const e = window.XMLHttpRequest;
        if (!e) {
            return !1;
        }
        let g = new e();
        if (!("withCredentials" in g)) {
            return !1;
        }
        endpoint = endpoint.replace(/^http:/, "https:");
        g.open("POST", endpoint, !0);
        g.withCredentials = !0;
        g.setRequestHeader("Content-Type", "text/plain");
        g.onreadystatechange = function() {
            if (4 == g.readyState) {
                if (errCallback && "text/plain" === g.getResponseHeader("Content-Type")) {
                    try {
                        handleXHRResponse(errCallback, g.responseText, callback);
                    } catch (ca) {
                        logError("xhr", "rsp"), callback();
                    }
                } else {
                    callback();
                }
                g = null;
            }
        };
        g.send(data);
        return !0;
    }
    // Ea
    function handleXHRResponse(a, b, c) {
        if (1 > b.length) {
            logError("xhr", "ver", "0"), c();
        } else if (3 < a.count++) {
            logError("xhr", "tmr", "" + a.count), c();
        } else {
            let d = b.charAt(0);
            if ("1" === d) {
                executeTaskForSingleResponse(a, b.substring(1), c);
            } else if (a.V && "2" === d) {
                const e = b.substring(1).split(",");
                let g = 0;
                b = function() {
                    ++g === e.length && c();
                };
                for (d = 0; d < e.length; d++) {
                    executeTaskForSingleResponse(a, e[d], b);
                }
            } else {
                logError("xhr", "ver", String(b.length)), c();
            }
        }
    }
    // oc
    function executeTaskForSingleResponse(errCallback, taskId, callback) {
        if (0 === taskId.length) {
            callback();
        } else {
            const d = taskId.charAt(0);
            switch (d) {
                case "d":
                    sendDataWithQueryString("https://stats.g.doubleclick.net/j/collect", errCallback.U, errCallback, callback);
                    break;
                case "g":
                    sendDataUsingImage("https://www.google.com/ads/ga-audiences", errCallback.google, callback);
                    (taskId = taskId.substring(1)) && (/^[a-z.]{1,6}$/.test(taskId) ? sendDataUsingImage("https://www.google.%/ads/ga-audiences".replace("%", taskId), errCallback.google, noop) : logError("tld", "bcc", taskId));
                    break;
                case "G":
                    if (errCallback.V) {
                        errCallback.V("G-" + taskId.substring(1));
                        callback();
                        break;
                    }
                case "x":
                    if (errCallback.V) {
                        errCallback.V();
                        callback();
                        break;
                    }
                case "c":
                    if (errCallback.V) {
                        errCallback.V(taskId.substring(1));
                        callback();
                        break;
                    }
                default:
                    logError("xhr", "brc", d), callback();
            }
        }
    }
    // x
    function sendDataUsingBeacon(endpoint, data, callback) {
        return window.navigator.sendBeacon ? (window.navigator.sendBeacon(endpoint, data) ? (callback(), !0) : !1) : !1;
    }
    // ge
    function logError(category, code, msg) {
        1 <= 100 * Math.random() || isOptOut("?") || ((category = ["t=error", "_e=" + category, "_v=j101", "sr=1"]), code && category.push("_f=" + code), msg && category.push("_m=" + safeEncodeURIComponent(msg.substring(0, 100))), category.push("aip=1"), category.push("z=" + generateRandomID()), sendDataUsingImage(getAnalyticsURL(!0) + "/u/d", category.join("&"), noop));
    }
    // qc
    function getGaData() {
        return (window.gaData = window.gaData || {});
    }
    // h
    function getTrackerData(name) {
        const b = getGaData();
        return (b[name] = b[name] || {});
    }
    // Ha
    class TaskQueue {
        tasks;
        constructor() {
            this.tasks = [];
        }
        add(task) {
            this.tasks.push(task);
        }
        D(a) {
            try {
                for (var b = 0; b < this.tasks.length; b++) {
                    var c = a.get(this.tasks[b]);
                    c && isFunction(c) && c.call(window, a);
                }
            } catch (d) {}
            b = a.get(hitCallbackProp);
            b != noop && isFunction(b) && (a.set(hitCallbackProp, noop, !0), setTimeout(b, 10));
        }
    }
    // Ja
    function sampleData(tracker) {
        if (100 != tracker.get(sampleRateProperty) && generateHash(getStringValue(tracker, clientIdProperty)) % 1e4 >= 100 * getNumber(tracker, sampleRateProperty)) {
            throw "abort";
        }
    }
    // Ma
    function checkOptOut(tracker) {
        if (isOptOut(getStringValue(tracker, trackingIdProperty))) {
            throw "abort";
        }
    }
    // Oa
    function checkProtocol() {
        const a = document.location.protocol;
        if ("http:" != a && "https:" != a) {
            throw "abort";
        }
    }
    // pf
    function isValidDataTransmission(tracker) {
        let b = !1;
        let c = !1;
        if (bitSetInstance.get(89)) {
            c = !0;
            var d = tracker.get(locationProp);
            var e = document.location;
            if (e) {
                let g = e.pathname || "";
                "/" != g.charAt(0) && (g = "/" + g);
                e = e.protocol + "//" + e.hostname + g + e.search;
                (d && 0 === d.indexOf(e)) || (b = !0);
            }
        }
        !c && bitSetInstance.get(90) && ((c = !0), (d = tracker.get(referrerProperty)), (e = getReferrer(!!tracker.get(alwaysSendReferrerProperty), !!tracker.get(useAmpClientIdProperty))), d !== e && (b = !0));
        !c && bitSetInstance.get(91) && ((c = !0), tracker.get(titleProp) !== document.title && (b = !0));
        return c && !b;
    }
    // Pa
    function trackHit(tracker) {
        try {
            window.navigator.sendBeacon ? setBitSetFlag(42) : window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest() && setBitSetFlag(40);
        } catch (c) {}
        tracker.set(usageProperty, encodeBits(tracker), !0);
        tracker.set(_sProp, getNumber(tracker, _sProp) + 1);
        const b = [];
        analyticsStorage.map(function(c, d) {
            d.F && ((c = tracker.get(c)), void 0 != c && c != d.defaultValue && ("boolean" == typeof c && (c *= 1), b.push(d.F + "=" + safeEncodeURIComponent("" + c))));
        });
        !1 === tracker.get(allowAdPersonalizationSignalsProperty) && b.push("npa=1");
        b.push("z=" + generateUniqueID());
        isValidDataTransmission(tracker) && setBitSetFlag(109);
        tracker.set(hitPayloadProp, b.join("&"), !0);
    }
    // Sa
    function sendHit(tracker) {
        let b = getStringValue(tracker, transportProp);
        !b && tracker.get(useBeaconProp) && (b = "beacon");
        const c = getStringValue(tracker, transportUrlProperty);
        const d = getStringValue(tracker, _x_19Property);
        let e = c || (d || getAnalyticsURL(!1) + "") + "/collect";
        let g = tracker.Z(hitCallbackProp);
        let ca = getStringValue(tracker, hitPayloadProp);
        let l = getStringValue(tracker, trackingIdProperty);
        switch (getStringValue(tracker, _jtProperty)) {
            case "d":
                e = c || (d || getAnalyticsURL(!1) + "") + "/j/collect";
                b = tracker.get(_dpProperty) || void 0;
                sendDataWithQueryString(e, ca, b, g);
                break;
            default:
                b ? ((g = g || noop), "image" == b ? sendDataUsingImage(e, ca, g) : ("xhr" == b && sendDataUsingXHR(e, ca, g)) || ("beacon" == b && sendDataUsingBeacon(e, ca, g)) || sendAnalyticsData(e, ca, g)) : sendAnalyticsData(e, ca, g);
        }
        ca = getTrackerData(l);
        g = ca.hitcount;
        ca.hitcount = g ? g + 1 : 1;
        ca.first_hit || (ca.first_hit = new Date().getTime());
        delete getTrackerData(l).pending_experiments;
        tracker.set(hitCallbackProp, noop, !0);
        if (shouldSendSecureTransport(tracker)) {
            if (((ca = getStringValue(tracker, trackingIdProperty)), (l = sf[ca]))) {
                for (ca = 0; ca < l.length; ++ca) {
                    (g = getOrCreateSlot(l[ca]).q) && 30 > g.length && g.push && g.push(getCookieConfiguration(tracker));
                }
            } else {
                (vf[ca] = vf[ca] || []), 30 > vf[ca].length && vf[ca].push(getCookieConfiguration(tracker));
            }
        }
    }
    // Hc
    function addExperimentData(tracker) {
        getGaData().expId && tracker.set(expIdProp, getGaData().expId);
        getGaData().expVar && tracker.set(expVarProp, getGaData().expVar);
        let b = getStringValue(tracker, trackingIdProperty);
        if ((b = getTrackerData(b).pending_experiments)) {
            const c = [];
            for (d in b) {
                b.hasOwnProperty(d) && b[d] && c.push(encodeURIComponent(d) + "." + encodeURIComponent(b[d]));
            }
            var d = c.join("!");
        } else {
            d = void 0;
        }
        d && ((b = tracker.get(expProp)) && (d = b + "!" + d), tracker.set(expProp, d, !0));
    }
    // cd
    function checkLoadPurpose() {
        if (window.navigator && "preview" == window.navigator.loadPurpose) {
            throw "abort";
        }
    }
    // yd
    function addDeveloperIDs(tracker) {
        let b = window.gaDevIds || [];
        if (isArray(b)) {
            let c = tracker.get("&did");
            isString(c) && 0 < c.length && (b = b.concat(c.split(",")));
            c = [];
            for (let d = 0; d < b.length; d++) {
                containsValue(c, b[d]) || c.push(b[d]);
            }
            0 != c.length && tracker.set("&did", c.join(","), !0);
        }
    }
    // vb
    function checkTrackingId(tracker) {
        if (!tracker.get(trackingIdProperty)) {
            throw "abort";
        }
    }
    // Pe
    function checkForTagAssistant(tracker) {
        try {
            if (!tracker.get(_tacProperty) && (tracker.set(_tacProperty, !0), !tracker.get("&gtm"))) {
                let b = void 0;
                let c = void 0;
                isNumeric(getUrlParameter("gtm_debug")) && (b = 2);
                !b && startsWith(document.referrer, "https://tagassistant.google.com/") && (b = 3);
                !b && containsValue(document.cookie.split("; "), "__TAG_ASSISTANT=x") && (b = 4);
                b || ((c = document.documentElement.getAttribute("data-tag-assistant-present")), isNumeric(c) && (b = 5));
                if (b) {
                    window["google.tagmanager.debugui2.queue"] || ((window["google.tagmanager.debugui2.queue"] = []), loadScript("https://www.google-analytics.com/debug/bootstrap?id=" + tracker.get(trackingIdProperty) + "&src=LEGACY&cond=" + b));
                    const d = document.currentScript;
                    window["google.tagmanager.debugui2.queue"].push({ messageType: "LEGACY_CONTAINER_STARTING", data: { id: tracker.get(trackingIdProperty), scriptSource: (d && d.src) || "" } });
                }
            }
        } catch (e) {}
    }
    // lf
    function isNumeric(a) {
        if (null == a || 0 === a.length) {
            return !1;
        }
        a = Number(a);
        const b = Date.now();
        return a < b + 3e5 && a > b - 9e5;
    }
    // hd
    function generateRandomID() {
        return Math.round(2147483647 * Math.random());
    }
    // Bd
    function generateUniqueID() {
        try {
            const a = new Uint32Array(1);
            window.crypto.getRandomValues(a);
            return a[0] & 2147483647;
        } catch (b) {
            return generateRandomID();
        }
    }
    // Ta
    function validateSession(tracker) {
        let b = getNumber(tracker, _hcProp);
        500 <= b && setBitSetFlag(15);
        let c = getStringValue(tracker, hitTypeProp);
        if ("transaction" != c && "item" != c) {
            c = getNumber(tracker, _toProp);
            const d = new Date().getTime();
            let e = getNumber(tracker, _tiProp);
            0 == e && tracker.set(_tiProp, d);
            e = Math.round((2 * (d - e)) / 1e3);
            0 < e && ((c = Math.min(c + e, 20)), tracker.set(_tiProp, d));
            if (0 >= c) {
                throw "abort";
            }
            tracker.set(_toProp, --c);
        }
        tracker.set(_hcProp, ++b);
    }
    // Ya
    class TrackerModel {
        /** @type {SimpleStorage} */
        data;
        constructor() {
            this.data = new SimpleStorage();
        }
        /** @param {string} key */
        get(key) {
            var b = $resolveAnalyticsTask(key);
            var c = this.data.get(key);
            b && void 0 == c && (c = isFunction(b.defaultValue) ? b.defaultValue() : b.defaultValue);
            return b && b.Z ? b.Z(this, key, c) : c;
        }
        Z(a) {
            return (a = this.get(a)) && isFunction(a) ? a : noop;
        }
        /**
         * @param {string|Record<string, any>} keyOrObject
         * @param {any} [value]
         * @param {boolean} [useDefault]
         */
        set(keyOrObject, value, useDefault) {
            if (keyOrObject) {
                if ("object" === typeof keyOrObject) {
                    for (var d in keyOrObject) {
                        keyOrObject.hasOwnProperty(d) && updateTrackingId(this, d, keyOrObject[d], useDefault);
                    }
                } else {
                    updateTrackingId(this, keyOrObject, value, useDefault);
                }
            }
        }
    }
    // P
    /** @param {Tracker} tracker @param {string} key */
    function getStringValue(tracker, key) {
        tracker = tracker.get(key);
        return void 0 == tracker ? "" : "" + tracker;
    }
    // R
    function getNumber(a, b) {
        a = a.get(b);
        return void 0 == a || "" === a ? 0 : Number(a);
    }

    function updateTrackingId(a, b, c, d) {
        if (void 0 != c) {
            switch (b) {
                case trackingIdProperty:
                    trackingIdPattern.test(c);
            }
        }
        const e = $resolveAnalyticsTask(b);
        e && e.o ? e.o(a, b, c, d) : a.data.set(b, c, d);
    }

    // gf
    var taskIds = { hitPayload: 88, location: 89, referrer: 90, title: 91, buildHitTask: 93, sendHitTask: 94, displayFeaturesTask: 95, customTask: 97, cookieName: 98, cookieDomain: 99, cookiePath: 100, cookieExpires: 101, cookieUpdate: 102, cookieFlags: 103, storage: 104, _x_19: 105, transportUrl: 106, allowAdFeatures: 107, sampleRate: 108 };
    // hf
    function setBitSetFlag(a, b) {
        const c = taskIds[a];
        c && setBitSetFlag(c);
        "displayFeaturesTask" === a && void 0 == b && setBitSetFlag(96);
        /.*Task$/.test(a) && setBitSetFlag(92);
    }
    // mf
    function setBitSetFlagValue(a, b) {
        if (a) {
            if ("object" === typeof a) {
                for (const c in a) {
                    a.hasOwnProperty(c) && setBitSetFlag(c, b);
                }
            } else {
                setBitSetFlag(a, b);
            }
        }
    }
    // ue
    var analyticsStorage = new SimpleStorage();
    // ve
    var taskQueue = [];

    var propertyMap = new Map();

    class Property {
        name;
        F;
        Z;
        o;
        defaultValue;
        /**
         * @param {string} name
         * @param {string} [protocolId]
         * @param {any} [defaultValue]
         * @param {*} [d]
         * @param {*} [e]
         */
        constructor(name, protocolId, defaultValue, d, e) {
            this.name = name;
            this.F = protocolId;
            this.Z = d;
            this.o = e;
            this.defaultValue = defaultValue;

            propertyMap.set(name, this);

            if (protocolId) {
                propertyMap.set(protocolId, this);
            }
        }
    }

    function $resolveAnalyticsTask(a) {
        let b = analyticsStorage.get(a);
        if (!b) {
            for (let c = 0; c < taskQueue.length; c++) {
                const d = taskQueue[c];
                const e = d[0].exec(a);
                if (e) {
                    b = d[1](e);
                    analyticsStorage.set(b.name, b);
                    break;
                }
            }
        }
        return b;
    }
    function getAnalyticsName(a) {
        let b;
        analyticsStorage.map(function(c, d) {
            d.F == a && (b = d);
        });
        return b && b.name;
    }
    /**
     * @param {string} id
     * @param {string} [protocolId]
     * @param {*} [defaultValue]
     * @param {*} [d]
     * @param {*} [e]
     * @returns {string}
     */
    function registerProperty(id, protocolId, defaultValue, d, e) {
        const property = new Property(id, protocolId, defaultValue, d, e);
        analyticsStorage.set(property.name, property);
        return property.name;
    }
    function addPropertyToQueue(a, b) {
        taskQueue.push([new RegExp("^" + a + "$"), b]);
    }
    /** @param {string} name @param {string | undefined} [id] @param {string | number | boolean | undefined} [value] */
    function defineProperty(name, id, value) {
        return registerProperty(name, id, value, void 0, db);
    }
    function db() {}
    const apiVersionProperty = defineProperty("apiVersion", "v");
    const clientVersionProperty = defineProperty("clientVersion", "_v");
    registerProperty("anonymizeIp", "aip");
    const adSenseIdProp = registerProperty("adSenseId", "a");
    var hitTypeProp = registerProperty("hitType", "t");
    var hitCallbackProp = registerProperty("hitCallback");
    var hitPayloadProp = registerProperty("hitPayload");
    registerProperty("nonInteraction", "ni");
    registerProperty("currencyCode", "cu");
    registerProperty("dataSource", "ds");
    var useBeaconProp = registerProperty("useBeacon", void 0, !1);
    var transportProp = registerProperty("transport");
    registerProperty("sessionControl", "sc", "");
    registerProperty("sessionGroup", "sg");
    registerProperty("queueTime", "qt");
    var _sProp = registerProperty("_s", "_s");
    var _no_slcProp = registerProperty("_no_slc");
    registerProperty("screenName", "cd");
    var locationProp = registerProperty("location", "dl", "");
    var referrerProperty = registerProperty("referrer", "dr");
    const pageProperty = registerProperty("page", "dp", "");
    registerProperty("hostname", "dh");
    const languageProp = registerProperty("language", "ul");
    const oencodingProp = registerProperty("encoding", "de");

    var titleProp = registerProperty("title", "dt", () => document.title || void 0);

    addPropertyToQueue("contentGroup([0-9]+)", a => new Property(a[0], "cg" + a[1]));
    const pb = registerProperty("screenColors", "sd");
    const qb = registerProperty("screenResolution", "sr");
    const rb = registerProperty("viewportSize", "vp");
    const sb = registerProperty("javaEnabled", "je");
    const tb = registerProperty("flashVersion", "fl");
    registerProperty("campaignId", "ci");
    registerProperty("campaignName", "cn");
    registerProperty("campaignSource", "cs");
    registerProperty("campaignMedium", "cm");
    registerProperty("campaignKeyword", "ck");
    registerProperty("campaignContent", "cc");
    const eventCategoryProperty = registerProperty("eventCategory", "ec");
    const eventActionProperty = registerProperty("eventAction", "ea");
    const eventLabelProperty = registerProperty("eventLabel", "el");
    const eventValueProperty = registerProperty("eventValue", "ev");
    const socialNetworkProp = registerProperty("socialNetwork", "sn");
    const socialActionProp = registerProperty("socialAction", "sa");
    const socialTargetProp = registerProperty("socialTarget", "st");
    const l1Property = registerProperty("l1", "plt");
    const l2Property = registerProperty("l2", "pdt");
    const l3Property = registerProperty("l3", "dns");
    const l4Property = registerProperty("l4", "rrt");
    const l5Property = registerProperty("l5", "srt");
    const l6Property = registerProperty("l6", "tcp");
    const l7Property = registerProperty("l7", "dit");
    const l8Property = registerProperty("l8", "clt");
    const Ve = registerProperty("l9", "_gst");
    const We = registerProperty("l10", "_gbt");
    const l11Property = registerProperty("l11", "_cst");
    const Ye = registerProperty("l12", "_cbt");
    const Mb = registerProperty("timingCategory", "utc");
    const timingVarProp = registerProperty("timingVar", "utv");
    const timingLabelProp = registerProperty("timingLabel", "utl");
    // Pb
    const timingValueProp = registerProperty("timingValue", "utt");
    registerProperty("appName", "an");
    registerProperty("appVersion", "av", "");
    registerProperty("appId", "aid", "");
    registerProperty("appInstallerId", "aiid", "");
    registerProperty("exDescription", "exd");
    registerProperty("exFatal", "exf");
    var expIdProp = registerProperty("expId", "xid");
    var expVarProp = registerProperty("expVar", "xvar");
    var expProp = registerProperty("exp", "exp");
    const _utmaProp = registerProperty("_utma", "_utma");
    const _utmzProp = registerProperty("_utmz", "_utmz");
    const _utmhtProp = registerProperty("_utmht", "_utmht");
    var _hcProp = registerProperty("_hc", void 0, 0);
    var _tiProp = registerProperty("_ti", void 0, 0);
    var _toProp = registerProperty("_to", void 0, 20);
    addPropertyToQueue("dimension([0-9]+)", a => new Property(a[0], "cd" + a[1]));
    addPropertyToQueue("metric([0-9]+)", a => new Property(a[0], "cm" + a[1]));
    registerProperty("linkerParam", void 0, void 0, generateLinkerParam, db);
    var _cd2lProperty = defineProperty("_cd2l", void 0, !1);
    var usageProperty = registerProperty("usage", "_u");
    var _umProperty = registerProperty("_um");
    registerProperty("forceSSL", void 0, void 0, () => forceSSL, (a, b, c) => {
        setBitSetFlag(34);
        forceSSL = !!c;
    });
    const _j1Property = registerProperty("_j1", "jid");
    const _j2Property = registerProperty("_j2", "gjid");
    addPropertyToQueue("\\&(.*)", a => {
        const b = new Property(a[0], a[1]);
        const c = getAnalyticsName(a[0].substring(1));
        c && ((b.Z = d => d.get(c)),
            (b.o = (d, e, g, ca) => {
                d.set(c, g, ca);
            }),
            (b.F = void 0));
        return b;
    });
    const _ootProperty = defineProperty("_oot");
    const previewProperty = registerProperty("previewTask");
    const checkProtocolProperty = registerProperty("checkProtocolTask");
    const validationProperty = registerProperty("validationTask");
    const checkStorageProperty = registerProperty("checkStorageTask");
    const historyImportProperty = registerProperty("historyImportTask");
    const samplerProperty = registerProperty("samplerTask");
    const _rltTask = registerProperty("_rlt");
    var buildHitTask = registerProperty("buildHitTask");
    const sendHitProperty = registerProperty("sendHitTask");
    const ceTask = registerProperty("ceTask");
    const devIdTask = registerProperty("devIdTask");
    const timingProperty = registerProperty("timingTask");
    const displayFeaturesProperty = registerProperty("displayFeaturesTask");
    const customProperty = registerProperty("customTask");
    const fpsCrossDomainProperty = registerProperty("fpsCrossDomainTask");
    const _ctaProperty = defineProperty("_cta");
    const nameProperty = defineProperty("name");
    var clientIdProperty = defineProperty("clientId", "cid");
    const clientIdTimeProperty = defineProperty("clientIdTime");
    const storedClientIdProperty = defineProperty("storedClientId");
    const userIdTask = registerProperty("userId", "uid");
    var trackingIdProperty = defineProperty("trackingId", "tid");
    var cookieNameProperty = defineProperty("cookieName", void 0, "_ga");
    var cookieDomainProperty = defineProperty("cookieDomain");
    var cookiePathProperty = defineProperty("cookiePath", void 0, "/");
    var cookieExpiresProperty = defineProperty("cookieExpires", void 0, 63072e3);
    var cookieUpdateProperty = defineProperty("cookieUpdate", void 0, !0);
    var cookieFlagsProperty = defineProperty("cookieFlags", void 0, "");
    const legacyCookieDomainProperty = defineProperty("legacyCookieDomain");
    const legacyHistoryImportProperty = defineProperty("legacyHistoryImport", void 0, !0);
    var storageProperty = defineProperty("storage", void 0, "cookie");
    const allowLinkerProperty = defineProperty("allowLinker", void 0, !1);
    const allowAnchorProperty = defineProperty("allowAnchor", void 0, !0);
    var sampleRateProperty = defineProperty("sampleRate", "sf", 100);
    const siteSpeedSampleRateProperty = defineProperty("siteSpeedSampleRate", void 0, 1);
    var alwaysSendReferrerProperty = defineProperty("alwaysSendReferrer", void 0, !1);
    var _gidProperty = defineProperty("_gid", "_gid");
    const _gcnProperty = defineProperty("_gcn");
    var useAmpClientIdProperty = defineProperty("useAmpClientId");
    const _gclidProperty = defineProperty("_gclid");
    const _gtProperty = defineProperty("_gt");
    const _geProperty = defineProperty("_ge", void 0, 7776e6);
    const _gclsrcProperty = defineProperty("_gclsrc");
    const storeGacProperty = defineProperty("storeGac", void 0, !0);
    var _x_19Property = registerProperty("_x_19");
    const _fplcProperty = registerProperty("_fplc", "_fplc");
    const _csProperty = defineProperty("_cs");
    const _useUpProperty = defineProperty("_useUp", void 0, !1);
    const upProperty = registerProperty("up", "up");
    var _tacProperty = registerProperty("_tac", void 0, !1);
    const _gbraidProperty = defineProperty("_gbraid");
    const _gbtProperty = defineProperty("_gbt");
    const _gbeProperty = defineProperty("_gbe", void 0, 7776e6);
    var transportUrlProperty = registerProperty("transportUrl");
    const _rProperty = registerProperty("_r", "_r");
    const _slcProperty = registerProperty("_slc", "_slc");
    var _dpProperty = registerProperty("_dp");
    var _jtProperty = registerProperty("_jt", void 0, "n");
    var allowAdFeaturesProperty = registerProperty("allowAdFeatures", void 0, !0);
    var allowAdPersonalizationSignalsProperty = registerProperty("allowAdPersonalizationSignals", void 0, !0);
    /**
     * @param {string} methodName
     * @param {{ [x: string]: (...args: any[]) => any; }} target
     * @param {{ apply: (arg0: any, arg1: IArguments) => any; }} callback
     * @param {number | undefined} [bitSetFlag]
     */
    function wrapMethodWithExceptionHandling(methodName, target, callback, bitSetFlag) {
        target[methodName] = function() {
            try {
                return bitSetFlag && setBitSetFlag(bitSetFlag), callback.apply(this, arguments);
            } catch (e) {
                throw (logError("exc", methodName, e && e.name), e);
            }
        };
    }
    // Ed
    function getFplcCookie(tracker) {
        if ("cookie" == tracker.get(storageProperty)) {
            return (tracker = getCookieValues("FPLC")), 0 < tracker.length ? tracker[0] : void 0;
        }
    }
    // Fe
    function manageFplcCookie(tracker) {
        let b;
        if ((b = getStringValue(tracker, _x_19Property) && tracker.get(_cd2lProperty))) {
            (b = tagDataBridge.get(tracker.get(allowAnchorProperty))), (b = !(b && b._fplc));
        }
        b && !getFplcCookie(tracker) && tracker.set(_fplcProperty, "0");
    }
    // aa
    function shouldSampleHit(tracker) {
        const b = Math.min(getNumber(tracker, siteSpeedSampleRateProperty), 100);
        return generateHash(getStringValue(tracker, clientIdProperty)) % 100 >= b ? !1 : !0;
    }
    // gc
    function collectSiteSpeedData(callback) {
        const b = {};
        if (collectNavigationTimingData(b) || collectLoadTimeData(b)) {
            const c = b[l1Property];
            void 0 == c || Infinity == c || isNaN(c) || (0 < c ?
                (removeInvalidDataPoints(b, l3Property),
                    removeInvalidDataPoints(b, l6Property),
                    removeInvalidDataPoints(b, l5Property),
                    removeInvalidDataPoints(b, l2Property),
                    removeInvalidDataPoints(b, l4Property),
                    removeInvalidDataPoints(b, l7Property),
                    removeInvalidDataPoints(b, l8Property),
                    removeInvalidDataPoints(b, Ve),
                    removeInvalidDataPoints(b, We),
                    removeInvalidDataPoints(b, l11Property),
                    removeInvalidDataPoints(b, Ye),
                    setTimeoutWrapper(function() {
                        callback(b);
                    }, 10)) :
                addEventListenerSafe(window, "load", function() {
                    collectSiteSpeedData(callback);
                }, !1));
        }
    }
    // Ec
    function collectNavigationTimingData(data) {
        let b = window.performance || window.webkitPerformance;
        b = b && b.timing;
        if (!b) {
            return !1;
        }
        const c = b.navigationStart;
        if (0 == c) {
            return !1;
        }
        data[l1Property] = b.loadEventStart - c;
        data[l3Property] = b.domainLookupEnd - b.domainLookupStart;
        data[l6Property] = b.connectEnd - b.connectStart;
        data[l5Property] = b.responseStart - b.requestStart;
        data[l2Property] = b.responseEnd - b.responseStart;
        data[l4Property] = b.fetchStart - c;
        data[l7Property] = b.domInteractive - c;
        data[l8Property] = b.domContentLoadedEventStart - c;
        data[Ve] = GoogleAnalyticsTracker.L - c;
        data[We] = GoogleAnalyticsTracker.ya - c;
        window.google_tag_manager && window.google_tag_manager._li && ((b = window.google_tag_manager._li), (data[l11Property] = b.cst), (data[Ye] = b.cbt));
        return !0;
    }
    // Fc
    function collectLoadTimeData(a) {
        if (window.top != window) {
            return !1;
        }
        const b = window.external;
        let c = b && b.onloadT;
        b && !b.isValidLoadTime && (c = void 0);
        2147483648 < c && (c = void 0);
        0 < c && b.setPageReadyTime();
        if (void 0 == c) {
            return !1;
        }
        a[l1Property] = c;
        return !0;
    }
    // Y
    function removeInvalidDataPoints(data, key) {
        const c = data[key];
        if (isNaN(c) || Infinity == c || 0 > c) {
            data[key] = void 0;
        }
    }
    // Fd
    function timingHitCallback(a) {
        return function(b) {
            if ("pageview" == b.get(hitTypeProp) && !a.I) {
                a.I = !0;
                const c = shouldSampleHit(b);
                const d = 0 < extractQueryStringValue(getStringValue(b, locationProp), "gclid").length;
                const e = 0 < extractQueryStringValue(getStringValue(b, locationProp), "wbraid").length;
                (c || d || e) && collectSiteSpeedData(function(g) {
                    c && a.send("timing", g);
                    (d || e) && a.send("adtiming", g);
                });
            }
        };
    }
    // hc
    let cookiesConfigured = !1;

    /** @desc mc @param {Tracker} tracker */
    function handleCookies(tracker) {
        if ("cookie" == getStringValue(tracker, storageProperty)) {
            if (tracker.get(cookieUpdateProperty) || getStringValue(tracker, storedClientIdProperty) != getStringValue(tracker, clientIdProperty)) {
                var b = 1e3 * getNumber(tracker, cookieExpiresProperty);
                configureCookies(tracker, clientIdProperty, cookieNameProperty, b);
                tracker.data.set(storedClientIdProperty, getStringValue(tracker, clientIdProperty));
            }
            (tracker.get(cookieUpdateProperty) || getSessionId(tracker) != getStringValue(tracker, _gidProperty)) && configureCookies(tracker, _gidProperty, _gcnProperty, 864e5);
            if (tracker.get(storeGacProperty)) {
                if ((b = getStringValue(tracker, _gclidProperty))) {
                    var c = Math.min(getNumber(tracker, _geProperty), 1e3 * getNumber(tracker, cookieExpiresProperty));
                    c = 0 === c ? 0 : Math.min(c, 1e3 * getNumber(tracker, _gtProperty) + c - new Date().getTime());
                    tracker.data.set(_geProperty, c);
                    var d = {};
                    const e = getStringValue(tracker, _gtProperty);
                    const g = getStringValue(tracker, _gclsrcProperty);
                    var ca = normalizePath(getStringValue(tracker, cookiePathProperty));
                    var l = getCookiePath(getStringValue(tracker, cookieDomainProperty));
                    var k = getStringValue(tracker, trackingIdProperty);
                    var w = getStringValue(tracker, cookieFlagsProperty);
                    g && "aw.ds" != g ? d && (d.ua = !0) : ((b = ["1", e, safeUrlEncode(b)].join(".")), 0 <= c && (d && (d.ta = !0), setCookie("_gac_" + safeUrlEncode(k), b, ca, l, k, c, w)));
                    logGacEvent(d);
                }
            } else {
                setBitSetFlag(75);
            }
            tracker.get(storeGacProperty) && (b = getStringValue(tracker, _gbraidProperty)) && ((c = Math.min(getNumber(tracker, _gbeProperty), 1e3 * getNumber(tracker, cookieExpiresProperty))), (c = 0 === c ? 0 : Math.min(c, 1e3 * getNumber(tracker, _gbtProperty) + c - new Date().getTime())), tracker.data.set(_gbeProperty, c), (d = {}), (w = getStringValue(tracker, _gbtProperty)), (ca = normalizePath(getStringValue(tracker, cookiePathProperty))), (l = getCookiePath(getStringValue(tracker, cookieDomainProperty))), (k = getStringValue(tracker, trackingIdProperty)), (tracker = getStringValue(tracker, cookieFlagsProperty)), (b = ["1", w, safeUrlEncode(b)].join(".")), 0 <= c && (d && (d.ta = !0), setCookie("_gac_gb_" + safeUrlEncode(k), b, ca, l, k, c, tracker)), logGbEvent(d));
        }
    }
    /** ma @param {string} sessionIdValues @param {string} cookieName @param {number} domainFallback */
    function configureCookies(a, sessionIdValues, cookieName, domainFallback) {
        let e = getSessionIdFromValues(a, sessionIdValues);
        if (e) {
            cookieName = getStringValue(a, cookieName);
            const g = normalizePath(getStringValue(a, cookiePathProperty));
            let ca = getCookiePath(getStringValue(a, cookieDomainProperty));
            const l = getStringValue(a, cookieFlagsProperty);
            const k = getStringValue(a, trackingIdProperty);
            if ("auto" != ca) {
                setCookie(cookieName, e, g, ca, k, domainFallback, l) && (cookiesConfigured = !0);
            } else {
                setBitSetFlag(32);
                for (let w = getSubdomainHierarchy(), Ce = 0; Ce < w.length; Ce++) {
                    if (((ca = w[Ce]), a.data.set(cookieDomainProperty, ca), (e = getSessionIdFromValues(a, sessionIdValues)), setCookie(cookieName, e, g, ca, k, domainFallback, l))) {
                        cookiesConfigured = !0;
                        return;
                    }
                }
                a.data.set(cookieDomainProperty, "auto");
            }
        }
    }
    // uc
    function getSessionId(tracker) {
        const b = getCookieValues(getStringValue(tracker, _gcnProperty));
        return getSessionIdFromCookies(tracker, b);
    }
    // nc
    function validateCookieSetup(tracker) {
        if ("cookie" == getStringValue(tracker, storageProperty) && !cookiesConfigured && (handleCookies(tracker), !cookiesConfigured)) {
            throw "abort";
        }
    }
    // Yc
    function importLegacyCookies(tracker) {
        if (tracker.get(legacyHistoryImportProperty)) {
            let b = getStringValue(tracker, cookieDomainProperty);
            const c = getStringValue(tracker, legacyCookieDomainProperty) || getDomainName();
            const d = parseLegacyCookie("__utma", c, b);
            d && (setBitSetFlag(19), tracker.set(_utmhtProp, new Date().getTime(), !0), tracker.set(_utmaProp, d.R), (b = parseLegacyCookie("__utmz", c, b)) && d.hash == b.hash && tracker.set(_utmzProp, b.R));
        }
    }
    // nd
    function getSessionIdFromValues(tracker, key) {
        key = safeUrlEncode(getStringValue(tracker, key));
        let c = getCookiePath(getStringValue(tracker, cookieDomainProperty)).split(".").length;
        tracker = getCookiePathLength(getStringValue(tracker, cookiePathProperty));
        1 < tracker && (c += "-" + tracker);
        return key ? ["GA1", c, key].join(".") : "";
    }
    // Xd
    function getSessionIdFromCookies(tracker, values) {
        return getSessionIdFromValuesOrCookies(values, getStringValue(tracker, cookieDomainProperty), getStringValue(tracker, cookiePathProperty));
    }
    // na
    function getSessionIdFromValuesOrCookies(a, b, c) {
        if (!a || 1 > a.length) {
            setBitSetFlag(12);
        } else {
            for (var d = [], e = 0; e < a.length; e++) {
                let g = a[e];
                let ca = g.split(".");
                const l = ca.shift();
                ("GA1" == l || "1" == l) && 1 < ca.length ? ((g = ca.shift().split("-")), 1 == g.length && (g[1] = "1"), (g[0] *= 1), (g[1] *= 1), (ca = { H: g, s: ca.join(".") })) : (ca = ampClientIdPattern.test(g) ? { H: [0, 0], s: g } : void 0);
                ca && d.push(ca);
            }
            if (1 == d.length) {
                return setBitSetFlag(13), d[0].s;
            }
            if (0 == d.length) {
                setBitSetFlag(12);
            } else {
                setBitSetFlag(14);
                d = getCookieDomain(d, getCookiePath(b).split(".").length, 0);
                if (1 == d.length) {
                    return d[0].s;
                }
                d = getCookieDomain(d, getCookiePathLength(c), 1);
                1 < d.length && setBitSetFlag(41);
                return d[0] && d[0].s;
            }
        }
    }
    // Gc
    function getCookieDomain(a, b, c) {
        for (var d = [], e = [], g, ca = 0; ca < a.length; ca++) {
            const l = a[ca];
            l.H[c] == b ? d.push(l) : void 0 == g || l.H[c] < g ? ((e = [l]), (g = l.H[c])) : l.H[c] == g && e.push(l);
        }
        return 0 < d.length ? d : e;
    }
    // lc
    var getCookiePath = function getCookiePath(a) {
        return 0 == a.indexOf(".") ? a.substr(1) : a;
    };

    var getSubdomainHierarchy = function getSubdomainHierarchy() {
        const a = [];
        let b = getDomainName().split(".");
        if (4 == b.length) {
            var c = b[b.length - 1];
            if (parseInt(c, 10) == c) {
                return ["none"];
            }
        }
        for (c = b.length - 2; 0 <= c; c--) {
            a.push(b.slice(c).join("."));
        }
        b = document.location.hostname;
        doubleClickDomainPattern.test(b) || googleDomainPattern.test(b) || a.push("none");
        return a;
    };

    var normalizePath = function normalizePath(a) {
        if (!a) {
            return "/";
        }
        1 < a.length && a.lastIndexOf("/") == a.length - 1 && (a = a.substr(0, a.length - 1));
        0 != a.indexOf("/") && (a = "/" + a);
        return a;
    };
    // jc
    function getCookiePathLength(a) {
        a = normalizePath(a);
        return "/" == a ? 1 : a.split("/").length;
    }

    function logGacEvent(data) {
        data.ta && setBitSetFlag(77);
        data.na && setBitSetFlag(74);
        data.pa && setBitSetFlag(73);
        data.ua && setBitSetFlag(69);
    }
    // ef
    function logGbEvent(data) {
        data.ta && setBitSetFlag(85);
        data.na && setBitSetFlag(86);
        data.pa && setBitSetFlag(87);
    }
    // Xc
    function parseLegacyCookie(name, domain, cookieDomain) {
        "none" == domain && (domain = "");
        const d = [];
        const e = getCookieValues(name);
        name = "__utma" == name ? 6 : 2;
        for (let g = 0; g < e.length; g++) {
            const ca = ("" + e[g]).split(".");
            ca.length >= name && d.push({ hash: ca[0], R: e[g], O: ca });
        }
        if (0 != d.length) {
            return 1 == d.length ? d[0] : findBestLegacyCookie(domain, d) || findBestLegacyCookie(cookieDomain, d) || findBestLegacyCookie(null, d) || d[0];
        }
    }
    function findBestLegacyCookie(domain, cookies) {
        if (null == domain) {
            var c = (domain = 1);
        } else {
            (c = generateHash(domain)), (domain = generateHash(startsWith(domain, ".") ? domain.substring(1) : "." + domain));
        }
        for (let d = 0; d < cookies.length; d++) {
            if (cookies[d].hash == c || cookies[d].hash == domain) {
                return cookies[d];
            }
        }
    }

    // Jc
    const legacyCookieRegExp = new RegExp(/^https?:\/\/([^\/:]+)/);
    // De
    var tagDataBridge = window.google_tag_data.glBridge;
    // Kc
    const gaQueryParamRegex = RegExp("(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)");
    // od
    const gacQueryParamRegex = RegExp("(.*)([?&#])(?:_gac=[^&#]*)(?:&?)(.*)");

    // Bc
    function generateLinkerParam(a) {
        if (a.get(_cd2lProperty)) {
            return setBitSetFlag(35), tagDataBridge.generate(getLinkerParam(a));
        }
        let b = getStringValue(a, clientIdProperty);
        const c = getStringValue(a, _gidProperty) || "";
        b = "_ga=2." + safeEncodeURIComponent(computeHash(c + b, 0) + "." + c + "-" + b);
        (a = getGacParam(a)) ? (setBitSetFlag(44), (a = "&_gac=1." + safeEncodeURIComponent([computeHash(a.qa, 0), a.timestamp, a.qa].join(".")))) : (a = "");
        return b + a;
    }

    // Ic
    function generateLegacyHash(a, b) {
        const c = new Date();
        const d = window.navigator;
        const e = d.plugins || [];
        a = [a, d.userAgent, c.getTimezoneOffset(), c.getYear(), c.getDate(), c.getHours(), c.getMinutes() + b];
        for (b = 0; b < e.length; ++b) {
            a.push(e[b].description);
        }
        return generateHash(a.join("."));
    }

    // pa
    function computeHash(value, inc) {
        const c = new Date();
        const d = window.navigator;
        const e = c.getHours() + Math.floor((c.getMinutes() + inc) / 60);
        return generateHash([value, d.userAgent, d.language || "", c.getTimezoneOffset(), c.getYear(), c.getDate() + Math.floor(e / 24), (24 + e) % 24, (60 + c.getMinutes() + inc) % 60].join("."));
    }

    // Dc
    class TrackerLinker {
        constructor(a) {
            setBitSetFlag(48);
            this.target = a;
            this.T = !1;
        }
        ca(a, b) {
            if (a) {
                if (this.target.get(_cd2lProperty)) {
                    return tagDataBridge.decorate(getLinkerParam(this.target), a, b);
                }
                if (a.tagName) {
                    if ("a" == a.tagName.toLowerCase()) {
                        a.href && (a.href = appendLinkerParam(this, a.href, b));
                        return;
                    }
                    if ("form" == a.tagName.toLowerCase()) {
                        return addLinkerParamsToForm(this, a);
                    }
                }
                if ("string" == typeof a) {
                    return appendLinkerParam(this, a, b);
                }
            }
        }
        S(a, b, c) {
            function d(g) {
                try {
                    g = g || window.event;
                    a: {
                        let ca = g.target || g.srcElement;
                        for (g = 100; ca && 0 < g;) {
                            if (ca.href && ca.nodeName.match(/^a(?:rea)?$/i)) {
                                var l = ca;
                                break a;
                            }
                            ca = ca.parentNode;
                            g--;
                        }
                        l = {};
                    }
                    ("http:" == l.protocol || "https:" == l.protocol) && isCrossDomain(a, l.hostname || "") && l.href && (l.href = appendLinkerParam(e, l.href, b));
                } catch (k) {
                    setBitSetFlag(26);
                }
            }
            var e = this;
            this.target.get(_cd2lProperty) ?
                tagDataBridge.auto(
                    function() {
                        return getLinkerParam(e.target);
                    },
                    a,
                    b ? "fragment" : "",
                    c
                ) :
                (this.T || ((this.T = !0), addEventListenerSafe(document, "mousedown", d, !1), addEventListenerSafe(document, "keyup", d, !1)),
                    c && addEventListenerSafe(document, "submit", function(g) {
                        g = g || window.event;
                        if ((g = g.target || g.srcElement) && g.action) {
                            const ca = g.action.match(legacyCookieRegExp);
                            ca && isCrossDomain(a, ca[1]) && addLinkerParamsToForm(e, g);
                        }
                    }));
        }
        addCrossDomainParams(a) {
            if (a) {
                var b = this;
                var c = b.target.get(_csProperty);
                void 0 !== c && tagDataBridge.passthrough(
                    function() {
                        if (c("analytics_storage")) {
                            return {};
                        }
                        const d = {};
                        return (d._ga = b.target.get(clientIdProperty)), (d._up = "1"), d;
                    },
                    1,
                    !0
                );
            }
        }
    }

    function appendLinkerParam(linker, url, fragment) {
        let d = gaQueryParamRegex.exec(url);
        d && 3 <= d.length && (url = d[1] + (d[3] ? d[2] + d[3] : ""));
        (d = gacQueryParamRegex.exec(url)) && 3 <= d.length && (url = d[1] + (d[3] ? d[2] + d[3] : ""));
        linker = linker.target.get("linkerParam");
        d = url.indexOf("?");
        const e = url.indexOf("#");
        url = fragment ? url + ((-1 == e ? "#" : "&") + linker) : -1 == e ? url + ((-1 === d ? "?" : "&") + linker) : url.substring(0, e) + (-1 === d || d > e ? "?" : "&") + linker + url.substring(e);
        url = url.replace(/&+_ga=/, "&_ga=");
        return (url = url.replace(RegExp("&+_gac="), "&_gac="));
    }

    function addLinkerParamsToForm(linker, form) {
        if (form && form.action) {
            if ("get" == form.method.toLowerCase()) {
                linker = linker.target.get("linkerParam").split("&");
                for (let c = 0; c < linker.length; c++) {
                    let d = linker[c].split("=");
                    const e = d[1];
                    d = d[0];
                    for (var g = form.childNodes || [], ca = !1, l = 0; l < g.length; l++) {
                        if (g[l].name == d) {
                            g[l].setAttribute("value", e);
                            ca = !0;
                            break;
                        }
                    }
                    ca || ((g = document.createElement("input")), g.setAttribute("type", "hidden"), g.setAttribute("name", d), g.setAttribute("value", e), form.appendChild(g));
                }
            } else {
                "post" == form.method.toLowerCase() && (form.action = appendLinkerParam(linker, form.action));
            }
        }
    }

    // sd
    function isCrossDomain(a, b) {
        if (b == document.location.hostname) {
            return !1;
        }
        for (let c = 0; c < a.length; c++) {
            if (a[c] instanceof RegExp) {
                if (a[c].test(b)) {
                    return !0;
                }
            } else if (0 <= b.indexOf(a[c])) {
                return !0;
            }
        }
        return !1;
    }

    function isLegacyOrComputedHashMismatch(a, b) {
        return b != generateLegacyHash(a, 0) && b != generateLegacyHash(a, -1) && b != generateLegacyHash(a, -2) && b != computeHash(a, 0) && b != computeHash(a, -1) && b != computeHash(a, -2);
    }

    function getLinkerParam(tracker) {
        let b = getGacParam(tracker);
        const c = {};
        c._ga = tracker.get(clientIdProperty);
        c._gid = tracker.get(_gidProperty) || void 0;
        c._gac = b ? [b.qa, b.timestamp].join(".") : void 0;
        b = tracker.get(_fplcProperty);
        tracker = getFplcCookie(tracker);
        return (c._fplc = b && "0" !== b ? b : tracker), c;
    }

    function getGacParam(tracker) {
        function b(e) {
            return void 0 == e || "" === e ? 0 : Number(e);
        }
        const c = tracker.get(_gclidProperty);
        if (c && tracker.get(storeGacProperty)) {
            const d = b(tracker.get(_gtProperty));
            if (1e3 * d + b(tracker.get(_geProperty)) <= new Date().getTime()) {
                setBitSetFlag(76);
            } else {
                return { timestamp: d, qa: c };
            }
        }
    }

    const gtmOrOptRegex = /^(GTM|OPT)-[A-Z0-9]+$/;
    var expParamRegex = /;_gaexp=[^;]*/g;
    const trackingCookieRegex = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g;
    const googleLaunchUrlRegex = /^https?:\/\/[\w\-.]+\.google.com(:\d+)?\/optimize\/opt-launch\.html\?.*$/;
    let numberOfFailures = 0;
    const analyticsModule = {};

    // t
    function generateGTagUrl(config) {
        function b(d, e) {
            e && (c += "&" + d + "=" + safeEncodeURIComponent(e));
        }
        var c = getGTagScriptURL(config.type) + safeEncodeURIComponent(config.id);
        "dataLayer" != config.B && b("l", config.B);
        b("cx", config.context);
        b("t", config.target);
        b("cid", config.clientId);
        b("cidt", config.ka);
        b("gac", config.la);
        b("aip", config.ia);
        config.sa && b("_slc", "1");
        config.sync && b("m", "sync");
        b("cycle", config.G);
        config.qa && b("gclid", config.qa);
        googleLaunchUrlRegex.test(document.referrer) && b("cb", String(generateRandomID()));
        return c;
    }

    function initializeAnalytics(a, b) {
        let c = new Date().getTime();
        window[a.B] = window[a.B] || [];
        analyticsModule[a.B] || ((analyticsModule[a.B] = !0), (c = { "gtm.start": c }), a.sync || (c.event = "gtm.js"), window[a.B].push(c));
        2 === a.type && (function(d, e, g) {
            window[a.B].push(arguments);
        })("config", a.id, b);
    }
    // Ke
    function initializeGTag(a, tagid, configParams, sync) {
        configParams = configParams || {};
        const e = window.google_tag_data.tcBridge;
        if (gtmOrOptRegex.test(tagid)) {
            var g = 1;
        } else {
            var ca = tagid.split("-");
            1 < ca.length && "GTM" !== ca[0] && "UA" !== ca[0] && (g = 2);
        }
        if (g) {
            ca = { id: tagid, type: g, B: configParams.dataLayer || "dataLayer", G: !1 };
            let l = void 0;
            a.get("&gtm") == tagid && (ca.G = !0);
            switch (g) {
                case 1:
                    ca.ia = !!a.get("anonymizeIp");
                    ca.sync = sync;
                    tagid = String(a.get("name"));
                    "t0" != tagid && (ca.target = tagid);
                    isOptOut(String(a.get("trackingId"))) || ((ca.clientId = String(a.get(clientIdProperty))), (ca.ka = Number(a.get(clientIdTimeProperty))), (tagid = configParams.palindrome ? trackingCookieRegex : expParamRegex), (tagid = (tagid = document.cookie.replace(/^|(; +)/g, ";").match(tagid)) ? tagid.sort().join("").substring(1) : void 0), (ca.la = tagid), (ca.qa = extractQueryStringValue(getStringValue(a, locationProp), "gclid")));
                    break;
                case 2:
                    if (20 <= numberOfFailures) {
                        return;
                    }
                    numberOfFailures++;
                    ca.context = "c";
                    l = {};
                    l = ((l.is_legacy_loaded = !0), l);
                    ca.sa = !0;
                    e.registerUa(a.get("name"), a.get("trackingId"));
                    e.setSideload(a.get("name"), tagid, a.get("trackingId"));
            }
            initializeAnalytics(ca, l);
            return generateGTagUrl(ca);
        }
    }
    // Jd
    function GACookieManager(a, cookieName) {
        cookieName || (cookieName = (cookieName = getStringValue(a, nameProperty)) && "t0" != cookieName ? gtmPattern.test(cookieName) ? "_gat_" + safeUrlEncode(getStringValue(a, trackingIdProperty)) : "_gat_" + safeUrlEncode(cookieName) : "_gat");
        this.Y = cookieName;
    }

    // Rd
    function manageGACookies(a, tracker) {
        const c = tracker.get(buildHitTask);
        tracker.set(buildHitTask, function(e) {
            setOrGenerateCookie(a, e, _j1Property);
            setOrGenerateCookie(a, e, _j2Property);
            const g = c(e);
            setGACookie(a, e);
            return g;
        });
        const d = tracker.get(sendHitProperty);
        tracker.set(sendHitProperty, function(e) {
            const g = d(e);
            if (shouldSendDoubleClick(e)) {
                setBitSetFlag(80);
                const ca = { U: generatePayload(e, 1), google: generatePayload(e, 2), count: 0 };
                sendDataWithQueryString("https://stats.g.doubleclick.net/j/collect", ca.U, ca);
                e.set(_j1Property, "", !0);
            }
            return g;
        });
    }
    // Pd
    function setOrGenerateCookie(manager, tracker, property) {
        !1 === tracker.get(allowAdFeaturesProperty) || tracker.get(property) || ("1" == getCookieValues(manager.Y)[0] ? tracker.set(property, "", !0) : tracker.set(property, "" + generateRandomID(), !0));
    }
    // Qd
    function setGACookie(a, b) {
        shouldSendDoubleClick(b) && setCookie(a.Y, "1", getStringValue(b, cookiePathProperty), getStringValue(b, cookieDomainProperty), getStringValue(b, trackingIdProperty), 6e4, getStringValue(b, cookieFlagsProperty));
    }
    // se
    function shouldSendDoubleClick(tracker) {
        return !!tracker.get(_j1Property) && !1 !== tracker.get(allowAdFeaturesProperty);
    }
    // Ne
    function shouldLoadDoubleClick(a) {
        return !analyticsStore[getStringValue(a, trackingIdProperty)] && shouldSendSecureTransport(a);
    }
    // re
    function generatePayload(tracker, type) {
        const storageInstance = new SimpleStorage();

        function updateTrackerData(g) {
            $resolveAnalyticsTask(g).F && storageInstance.set($resolveAnalyticsTask(g).F, tracker.get(g));
        }

        updateTrackerData(apiVersionProperty);
        updateTrackerData(clientVersionProperty);
        updateTrackerData(trackingIdProperty);
        updateTrackerData(clientIdProperty);
        updateTrackerData(_j1Property);
        1 == type && (updateTrackerData(userIdTask), updateTrackerData(_j2Property), updateTrackerData(_gidProperty));
        !1 === tracker.get(allowAdPersonalizationSignalsProperty) && storageInstance.set("npa", "1");
        storageInstance.set($resolveAnalyticsTask(usageProperty).F, encodeBits(tracker));
        let e = "";
        storageInstance.map(function(g, ca) {
            e += safeEncodeURIComponent(g) + "=";
            e += safeEncodeURIComponent("" + ca) + "&";
        });
        e += "z=" + generateRandomID();
        1 == type ? (e = "t=dc&aip=1&_r=3&" + e) : 2 == type && (e = "t=sr&aip=1&_r=4&slf_rd=1&" + e);
        return e;
    }
    // Me
    function loadDoubleClick(tracker) {
        if (shouldLoadDoubleClick(tracker)) {
            const b = getStringValue(tracker, trackingIdProperty);
            analyticsStore[b] = !0;
            return function(c) {
                if (c && !analyticsStore[c]) {
                    const d = initializeGTag(tracker, c);
                    if (d) {
                        const e = 0 < d.indexOf("&_slc=1");
                        analyticsStore[c] = !0;
                        sf[b] || (sf[b] = []);
                        e && (sf[b].push(c), getOrCreateSlot(c, vf[b]));
                        loadScript(d);
                    }
                }
            };
        }
    }
    // Wd
    var gtmPattern = /^gtm\d+$/;
    // fd
    function initializeDisplayFeaturesPlugin(a, b) {
        a = a.model;
        if (!a.get("dcLoaded")) {
            const c = new BitSet(getBitSet(a));
            c.set(29);
            a.set(_umProperty, c.value);
            b = b || {};
            let d;
            b[cookieNameProperty] && (d = safeUrlEncode(b[cookieNameProperty]));
            b = new GACookieManager(a, d);
            manageGACookies(b, a);
            a.set("dcLoaded", !0);
        }
    }

    function initializeTracking(a) {
        let b = "cookie" != a.get(storageProperty) ? !1 : !0;
        if (b) {
            b = new GACookieManager(a);
            let c = a.get("dcLoaded");
            c || (setOrGenerateCookie(b, a, _j1Property), setOrGenerateCookie(b, a, _j2Property), setGACookie(b, a));
            b = !c && shouldSendDoubleClick(a);
            c = shouldLoadDoubleClick(a);
            b && a.set(_rProperty, 1, !0);
            c && a.set(_slcProperty, 1, !0);
            if (b || c) {
                a.set(_jtProperty, "d", !0), setBitSetFlag(79), a.set(_dpProperty, { U: generatePayload(a, 1), google: generatePayload(a, 2), V: loadDoubleClick(a), count: 0 }, !0);
            }
        }
    }

    function generateOrGetRandomId() {
        const a = (window.gaGlobal = window.gaGlobal || {});
        return (a.hid = a.hid || generateRandomID());
    }

    // wb
    const trackingIdPattern = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/;

    // pc
    class Tracker {
        /** @type {TrackerModel} */
        model;
        constructor(config) {
            var _this = this;
            function set(e, g) {
                _this.model.data.set(e, g);
                config.hasOwnProperty(e) && setBitSetFlag(e, g);
            }
            function addFilter(e, g) {
                _this.model.data.set(e, g);
                _this.filters.add(e);
            }
            this.model = new TrackerModel();
            this.filters = new TaskQueue();
            set(nameProperty, config[nameProperty]);
            set(trackingIdProperty, trimString(config[trackingIdProperty]));
            set(cookieNameProperty, config[cookieNameProperty]);
            set(cookieDomainProperty, config[cookieDomainProperty] || getDomainName());
            set(cookiePathProperty, config[cookiePathProperty]);
            set(cookieExpiresProperty, config[cookieExpiresProperty]);
            set(cookieUpdateProperty, config[cookieUpdateProperty]);
            set(cookieFlagsProperty, config[cookieFlagsProperty]);
            set(legacyCookieDomainProperty, config[legacyCookieDomainProperty]);
            set(legacyHistoryImportProperty, config[legacyHistoryImportProperty]);
            set(allowLinkerProperty, config[allowLinkerProperty]);
            set(allowAnchorProperty, config[allowAnchorProperty]);
            set(sampleRateProperty, config[sampleRateProperty]);
            set(siteSpeedSampleRateProperty, config[siteSpeedSampleRateProperty]);
            set(alwaysSendReferrerProperty, config[alwaysSendReferrerProperty]);
            set(storageProperty, config[storageProperty]);
            set(userIdTask, config[userIdTask]);
            set(clientIdTimeProperty, config[clientIdTimeProperty]);
            set(useAmpClientIdProperty, config[useAmpClientIdProperty]);
            set(storeGacProperty, config[storeGacProperty]);
            set(_cd2lProperty, config[_cd2lProperty]);
            set(_x_19Property, config[_x_19Property]);
            set(_useUpProperty, config[_useUpProperty]);
            set(_csProperty, config[_csProperty]);
            set(apiVersionProperty, 1);
            set(clientVersionProperty, "j101");
            addFilter(_ctaProperty, checkForTagAssistant);
            addFilter(_ootProperty, checkOptOut);
            addFilter(customProperty, noop);
            addFilter(previewProperty, checkLoadPurpose);
            addFilter(checkProtocolProperty, checkProtocol);
            addFilter(validationProperty, checkTrackingId);
            addFilter(checkStorageProperty, validateCookieSetup);
            addFilter(historyImportProperty, importLegacyCookies);
            addFilter(samplerProperty, sampleData);
            addFilter(_rltTask, validateSession);
            addFilter(ceTask, addExperimentData);
            addFilter(devIdTask, addDeveloperIDs);
            addFilter(displayFeaturesProperty, initializeTracking);
            addFilter(fpsCrossDomainProperty, manageFplcCookie);
            addFilter(buildHitTask, trackHit);
            addFilter(sendHitProperty, sendHit);
            addFilter(timingProperty, timingHitCallback(this));
            populateTrackerModel(this.model);
            initializeSessionId(this.model, config[clientIdProperty]);
            this.model.set(adSenseIdProp, generateOrGetRandomId());
        }
        /** @param {string} key @returns {string|number|undefined} */
        get(key) {
            return this.model.get(key);
        }
        set(a, b) {
            this.model.set(a, b);
            setBitSetFlagValue(a, b);
        }
        send(hitType) {
            if (!(1 > arguments.length)) {
                if ("string" === typeof arguments[0]) {
                    var b = arguments[0];
                    var c = [].slice.call(arguments, 1);
                } else {
                    (b = arguments[0] && arguments[0][hitTypeProp]), (c = arguments);
                }
                b && ((c = combineArgumentsToObject(hitTypesPropertiesMap[b] || [], c)), (c[hitTypeProp] = b), setBitSetFlagValue(c), this.model.set(c, void 0, !0), this.filters.D(this.model), (this.model.data.m = {}));
            }
        }
        requirePlugin(name, options) {
            var c = this;
            loadPlugin(name, c, options) || (addCommandToStore(name, function() {
                loadPlugin(name, c, options);
            }),
                providePlugin(String(c.get(nameProperty)), name, void 0, options, !0));
        }
    }

    // td
    function initializeSessionId(model, clientId) {
        let cookieName = getStringValue(model, cookieNameProperty);
        model.data.set(_gcnProperty, "_ga" == cookieName ? "_gid" : cookieName + "_gid");
        if ("cookie" == getStringValue(model, storageProperty)) {
            cookiesConfigured = !1;
            cookieName = getCookieValues(getStringValue(model, cookieNameProperty));
            cookieName = getSessionIdFromCookies(model, cookieName);
            if (!cookieName) {
                cookieName = getStringValue(model, cookieDomainProperty);
                var d = getStringValue(model, legacyCookieDomainProperty) || getDomainName();
                cookieName = parseLegacyCookie("__utma", d, cookieName);
                void 0 != cookieName ? (setBitSetFlag(10), (cookieName = cookieName.O[1] + "." + cookieName.O[2])) : (cookieName = void 0);
            }
            cookieName && (cookiesConfigured = !0);
            if ((d = cookieName && !model.get(cookieUpdateProperty))) {
                if (((d = cookieName.split(".")), 2 != d.length)) {
                    d = !1;
                } else if ((d = Number(d[1]))) {
                    var e = getNumber(model, cookieExpiresProperty);
                    d = d + e < new Date().getTime() / 1e3;
                } else {
                    d = !1;
                }
            }
            d && (cookieName = void 0);
            cookieName && (model.data.set(storedClientIdProperty, cookieName), model.data.set(clientIdProperty, cookieName), (cookieName = getSessionId(model)) && model.data.set(_gidProperty, cookieName));
            model.get(storeGacProperty) && ((cookieName = model.get(_gclidProperty)), (d = model.get(_gclsrcProperty)), !cookieName || (d && "aw.ds" != d)) && ((cookieName = {}), (d = (document ? extractGAValues(cookieName) : {})[getStringValue(model, trackingIdProperty)]), logGacEvent(cookieName), d && 0 != d.length && ((cookieName = d[0]), model.data.set(_gtProperty, cookieName.timestamp / 1e3), model.data.set(_gclidProperty, cookieName.qa)));
            model.get(storeGacProperty) && ((cookieName = model.get(_gbraidProperty)), (d = {}), (e = (document ? extractGAValues(d, "_gac_gb", !0) : {})[getStringValue(model, trackingIdProperty)]), logGbEvent(d), e && 0 != e.length && ((d = e[0]), (e = d.qa), (cookieName && cookieName !== e) || (d.labels && d.labels.length && (e += "." + d.labels.join(".")), model.data.set(_gbtProperty, d.timestamp / 1e3), model.data.set(_gbraidProperty, e))));
        }
        if (model.get(cookieUpdateProperty)) {
            cookieName = getUrlParameter("_ga", !!model.get(allowAnchorProperty));
            let g = getUrlParameter("_gl", !!model.get(allowAnchorProperty));
            d = tagDataBridge.get(model.get(allowAnchorProperty));
            e = d._ga;
            g && 0 < g.indexOf("_ga*") && !e && setBitSetFlag(30);
            if (clientId || !model.get(_useUpProperty)) {
                g = !1;
            } else if (((g = model.get(_csProperty)), void 0 === g || g("analytics_storage"))) {
                g = !1;
            } else {
                setBitSetFlag(84);
                model.data.set(upProperty, 1);
                if ((g = d._up)) {
                    if ((g = legacyCookieRegExp.exec(document.referrer))) {
                        g = g[1];
                        var ca = document.location.hostname;
                        g = ca === g || 0 <= ca.indexOf("." + g) || 0 <= g.indexOf("." + ca) ? !0 : !1;
                    } else {
                        g = !1;
                    }
                }
                g = g ? !0 : !1;
            }
            ca = d.gclid;
            const l = d._gac;
            if (cookieName || e || ca || l) {
                if ((cookieName && e && setBitSetFlag(36), model.get(allowLinkerProperty) || isValidAMPRequest(model.get(useAmpClientIdProperty)) || g)) {
                    if ((e && (setBitSetFlag(38), model.data.set(clientIdProperty, e), d._gid && (setBitSetFlag(51), model.data.set(_gidProperty, d._gid))), ca ? (setBitSetFlag(82), model.data.set(_gclidProperty, ca), d.gclsrc && model.data.set(_gclsrcProperty, d.gclsrc)) : l && (e = l.split(".")) && 2 === e.length && (setBitSetFlag(37), model.data.set(_gclidProperty, e[0]), model.data.set(_gtProperty, e[1])), (d = d._fplc) && getStringValue(model, _x_19Property) && (setBitSetFlag(83), model.data.set(_fplcProperty, d)), cookieName)) {
                        b: if (((d = cookieName.indexOf(".")), -1 == d)) {
                            setBitSetFlag(22);
                        } else {
                            e = cookieName.substring(0, d);
                            g = cookieName.substring(d + 1);
                            d = g.indexOf(".");
                            cookieName = g.substring(0, d);
                            g = g.substring(d + 1);
                            if ("1" == e) {
                                if (((d = g), isLegacyOrComputedHashMismatch(d, cookieName))) {
                                    setBitSetFlag(23);
                                    break b;
                                }
                            } else if ("2" == e) {
                                d = g.indexOf("-");
                                e = "";
                                0 < d ? ((e = g.substring(0, d)), (d = g.substring(d + 1))) : (d = g.substring(1));
                                if (isLegacyOrComputedHashMismatch(e + d, cookieName)) {
                                    setBitSetFlag(53);
                                    break b;
                                }
                                e && (setBitSetFlag(2), model.data.set(_gidProperty, e));
                            } else {
                                setBitSetFlag(22);
                                break b;
                            }
                            setBitSetFlag(11);
                            model.data.set(clientIdProperty, d);
                            if ((cookieName = getUrlParameter("_gac", !!model.get(allowAnchorProperty)))) {
                                (cookieName = cookieName.split(".")), "1" != cookieName[0] || 4 != cookieName.length ? setBitSetFlag(72) : isLegacyOrComputedHashMismatch(cookieName[3], cookieName[1]) ? setBitSetFlag(71) : (model.data.set(_gclidProperty, cookieName[3]), model.data.set(_gtProperty, cookieName[2]), setBitSetFlag(70));
                            }
                        }
                    }
                } else {
                    setBitSetFlag(21);
                }
            }
        }
        clientId && (setBitSetFlag(9), model.data.set(clientIdProperty, safeEncodeURIComponent(clientId)));
        model.get(clientIdProperty) || ((clientId = (clientId = window.gaGlobal) && clientId.from_cookie && "cookie" !== getStringValue(model, storageProperty) ? void 0 : (clientId = clientId && clientId.vid) && -1 !== clientId.search(clientIdPattern) ? clientId : void 0), clientId ? (setBitSetFlag(17), model.data.set(clientIdProperty, clientId)) : (setBitSetFlag(8), model.data.set(clientIdProperty, generateUniqueClientId())));
        model.get(_gidProperty) || (setBitSetFlag(3), model.data.set(_gidProperty, generateUniqueClientId()));
        handleCookies(model);
        clientId = window.gaGlobal = window.gaGlobal || {};
        cookieName = getStringValue(model, clientIdProperty);
        model = cookieName === getStringValue(model, storedClientIdProperty);
        if (void 0 == clientId.vid || (model && !clientId.from_cookie)) {
            (clientId.vid = cookieName), (clientId.from_cookie = model);
        }
    }

    /** @desc pd @param {TrackerModel} model */
    function populateTrackerModel(model) {
        let b = window.navigator;
        let c = window.screen;
        let d = document.location;
        model.set(referrerProperty, getReferrer(!!model.get(alwaysSendReferrerProperty), !!model.get(useAmpClientIdProperty)));
        if (d) {
            var e = d.pathname || "";
            "/" != e.charAt(0) && (setBitSetFlag(31), (e = "/" + e));
            model.set(locationProp, d.protocol + "//" + d.hostname + e + d.search);
        }
        c && model.set(qb, c.width + "x" + c.height);
        c && model.set(pb, c.colorDepth + "-bit");
        c = document.documentElement;
        let g = (e = document.body) && e.clientWidth && e.clientHeight;
        let ca = [];
        c && c.clientWidth && c.clientHeight && ("CSS1Compat" === document.compatMode || !g) ? (ca = [c.clientWidth, c.clientHeight]) : g && (ca = [e.clientWidth, e.clientHeight]);
        c = 0 >= ca[0] || 0 >= ca[1] ? "" : ca.join("x");
        model.set(rb, c);
        c = model.set;
        let l;
        if ((e = (e = window.navigator) ? e.plugins : null) && e.length) {
            for (g = 0; g < e.length && !l; g++) {
                (ca = e[g]), -1 < ca.name.indexOf("Shockwave Flash") && (l = ca.description);
            }
        }
        if (!l) {
            try {
                var k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                l = k.GetVariable("$version");
            } catch (w) {}
        }
        if (!l) {
            try {
                (k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")), (l = "WIN 6,0,21,0"), (k.AllowScriptAccess = "always"), (l = k.GetVariable("$version"));
            } catch (w) {}
        }
        if (!l) {
            try {
                (k = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")), (l = k.GetVariable("$version"));
            } catch (w) {}
        }
        l && (k = l.match(/[\d]+/g)) && 3 <= k.length && (l = k[0] + "." + k[1] + " r" + k[2]);
        c.call(model, tb, l || void 0);
        model.set(oencodingProp, document.characterSet || document.charset);
        model.set(sb, (b && "function" === typeof b.javaEnabled && b.javaEnabled()) || !1);
        model.set(languageProp, ((b && (b.language || b.browserLanguage)) || "").toLowerCase());
        model.data.set(_gclidProperty, getUrlParameter("gclid", !0));
        model.data.set(_gclsrcProperty, getUrlParameter("gclsrc", !0));
        model.data.set(_gtProperty, Math.round(new Date().getTime() / 1e3));
        model.get(_gclidProperty) || (model.data.set(_gbraidProperty, getUrlParameter("wbraid", !0)), model.data.set(_gbtProperty, Math.round(new Date().getTime() / 1e3)));
        if (d && model.get(allowAnchorProperty) && (b = document.location.hash)) {
            b = b.split(/[?&#]+/);
            d = [];
            for (l = 0; l < b.length; ++l) {
                (startsWith(b[l], "utm_id") || startsWith(b[l], "utm_campaign") || startsWith(b[l], "utm_source") || startsWith(b[l], "utm_medium") || startsWith(b[l], "utm_term") || startsWith(b[l], "utm_content") || startsWith(b[l], "gclid") || startsWith(b[l], "dclid") || startsWith(b[l], "gclsrc") || startsWith(b[l], "wbraid")) && d.push(b[l]);
            }
            0 < d.length && ((b = "#" + d.join("&")), model.set(locationProp, model.get(locationProp) + b));
        }
    }

    // me
    var hitTypesPropertiesMap = { pageview: [pageProperty], event: [eventCategoryProperty, eventActionProperty, eventLabelProperty, eventValueProperty], social: [socialNetworkProp, socialActionProp, socialTargetProp], timing: [Mb, timingVarProp, timingValueProp, timingLabelProp] };

    // rc
    function handleVisibilityState(callback) {
        if ("prerender" == document.visibilityState) {
            return !1;
        }
        callback();
        return !0;
    }

    function executeWhenDocumentVisible(callback) {
        if (!handleVisibilityState(callback)) {
            setBitSetFlag(16);
            let b = !1;

            const c = function() {
                if (!b && handleVisibilityState(callback)) {
                    b = !0;
                    const d = document;
                    d.removeEventListener ? d.removeEventListener("visibilitychange", c, !1) : d.detachEvent && d.detachEvent("onvisibilitychange", c);
                }
            };

            addEventListenerSafe(document, "visibilitychange", c);
        }
    }

    // te
    const commandPattern = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/;

    // sc
    class Command {
        constructor(a) {
            if (isFunction(a[0])) {
                this.u = a[0];
            } else {
                var b = commandPattern.exec(a[0]);
                null != b && 4 == b.length && ((this.da = b[1] || "t0"), (this.K = b[2] || ""), (this.methodName = b[3]), (this.aa = [].slice.call(a, 1)), this.K || ((this.A = "create" == this.methodName), (this.i = "require" == this.methodName), (this.g = "provide" == this.methodName), (this.ba = "remove" == this.methodName)), this.i && (3 <= this.aa.length ? ((this.X = this.aa[1]), (this.W = this.aa[2])) : this.aa[1] && (isString(this.aa[1]) ? (this.X = this.aa[1]) : (this.W = this.aa[1]))));
                b = a[1];
                a = a[2];
                if (!this.methodName) {
                    throw "abort";
                }
                if (this.i && (!isString(b) || "" == b)) {
                    throw "abort";
                }
                if (this.g && (!isString(b) || "" == b || !isFunction(a))) {
                    throw "abort";
                }
                if (containsSeparatorOrDelimiter(this.da) || containsSeparatorOrDelimiter(this.K)) {
                    throw "abort";
                }
                if (this.g && "t0" != this.da) {
                    throw "abort";
                }
            }
        }
    }

    function containsSeparatorOrDelimiter(a) {
        return 0 <= a.indexOf(".") || 0 <= a.indexOf(":");
    }

    // Yd
    var globalPluginStore;
    // Zd
    var pluginBitSetFlags;
    // $d
    var pluginLoadStatusStore;
    // A
    let deferredCommandStore;
    globalPluginStore = new SimpleStorage();
    pluginLoadStatusStore = new SimpleStorage();
    deferredCommandStore = new SimpleStorage();
    pluginBitSetFlags = { ec: 45, ecommerce: 46, linkid: 47 };

    function loadPlugin(name, tracker, options) {
        tracker == GoogleAnalyticsTracker || tracker.get(nameProperty);
        const d = globalPluginStore.get(name);
        if (!isFunction(d)) {
            return !1;
        }
        tracker.plugins_ = tracker.plugins_ || new SimpleStorage();
        if (tracker.plugins_.get(name)) {
            return !0;
        }
        tracker.plugins_.set(name, new d(tracker, options || {}));
        return !0;
    }

    function providePlugin(a, b, c, d, e) {
        if (!isFunction(globalPluginStore.get(b)) && !pluginLoadStatusStore.get(b)) {
            pluginBitSetFlags.hasOwnProperty(b) && setBitSetFlag(pluginBitSetFlags[b]);
            let g = void 0;
            if (gtmOrOptRegex.test(b)) {
                setBitSetFlag(52);
                a = GoogleAnalyticsTracker.getTracker(a);
                if (!a) {
                    return !0;
                }
                c = initializeGTag(a.model, b, d, e);
                g = function() {
                    CommandQueue.executeCommands(["provide", b, function() {}]);
                    const l = window[(d && d.dataLayer) || "dataLayer"];
                    l && l.hide && isFunction(l.hide.end) && l.hide[b] && (l.hide.end(), (l.hide.end = void 0));
                };
            }
            !c && pluginBitSetFlags.hasOwnProperty(b) ? (setBitSetFlag(39), (c = b + ".js")) : setBitSetFlag(43);
            if (c) {
                let ca;
                d && (ca = d[_x_19Property]);
                isString(ca) || (ca = void 0);
                a = parseUrl(constructPluginUrl(c, ca));
                !ca || (isProtocolValid(a.protocol) && isValidPluginUrl(a)) || (a = parseUrl(constructPluginUrl(c)));
                isProtocolValid(a.protocol) && isValidPluginUrl(a) && (loadScript(a.url, void 0, e, void 0, g), pluginLoadStatusStore.set(b, !0));
            }
        }
    }

    function addCommandToStore(a, b) {
        const c = deferredCommandStore.get(a) || [];
        c.push(b);
        deferredCommandStore.set(a, c);
    }

    function addToDeferredCommandStore(a, b) {
        globalPluginStore.set(a, b);
        b = deferredCommandStore.get(a) || [];
        for (let c = 0; c < b.length; c++) {
            b[c]();
        }
        deferredCommandStore.set(a, []);
    }

    function isValidPluginUrl(url) {
        let b = parseUrl(document.location.href);
        if (startsWith(url.url, getGTagScriptURL(1)) || startsWith(url.url, getGTagScriptURL(2))) {
            return !0;
        }
        if (url.query || 0 <= url.url.indexOf("?") || 0 <= url.path.indexOf("://")) {
            return !1;
        }
        if ((url.host == b.host && url.port == b.port) || (currentScriptSrc && ((b = document.createElement("a")), (b.href = currentScriptSrc), (b = parseUrlComponents(b)), url.host === b[0] && url.port === b[1]))) {
            return !0;
        }
        b = "http:" == url.protocol ? 80 : 443;
        return "www.google-analytics.com" == url.host && (url.port || b) == b && startsWith(url.path, "/plugins/") ? !0 : !1;
    }

    function isProtocolValid(a) {
        const b = document.location.protocol;
        return "https:" == a || a == b ? !0 : "http:" != a ? !1 : "http:" == b;
    }
    // kf
    function parseUrlComponents(aElement) {
        let b = aElement.hostname || "";
        let c = 0 <= b.indexOf("]");
        b = b.split(c ? "]" : ":")[0].toLowerCase();
        c && (b += "]");
        c = (aElement.protocol || "").toLowerCase();
        c = 1 * aElement.port || ("http:" == c ? 80 : "https:" == c ? 443 : "");
        aElement = aElement.pathname || "";
        startsWith(aElement, "/") || (aElement = "/" + aElement);
        return [b, "" + c, aElement];
    }

    function parseUrl(url) {
        const b = document.createElement("a");
        b.href = document.location.href;
        let c = (b.protocol || "").toLowerCase();
        const d = parseUrlComponents(b);
        const e = b.search || "";
        const g = c + "//" + d[0] + (d[1] ? ":" + d[1] : "");
        startsWith(url, "//") ? (url = c + url) : startsWith(url, "/") ? (url = g + url) : !url || startsWith(url, "?") ? (url = g + d[2] + (url || e)) : 0 > url.split("/")[0].indexOf(":") && (url = g + d[2].substring(0, d[2].lastIndexOf("/")) + "/" + url);
        b.href = url;
        c = parseUrlComponents(b);
        return { protocol: (b.protocol || "").toLowerCase(), host: c[0], port: c[1], path: c[2], query: b.search || "", url: url || "" };
    }

    function constructPluginUrl(path, baseUrl) {
        return path && 0 <= path.indexOf("/") ? path : (baseUrl || getAnalyticsURL(!1)) + "/plugins/ua/" + path;
    }

    var CommandQueue = {
        ga() {
            CommandQueue.commands = [];
        }
    };
    CommandQueue.ga();
    CommandQueue.executeCommands = function executeCommands(a) {
        let b = CommandQueue.processArguments.apply(CommandQueue, arguments);
        b = CommandQueue.commands.concat(b);
        for (CommandQueue.commands = []; 0 < b.length && !CommandQueue.executeCommand(b[0]) && !(b.shift(), 0 < CommandQueue.commands.length););
        CommandQueue.commands = CommandQueue.commands.concat(b);
    };
    CommandQueue.addToHistory = function addToHistory(a) {
        GoogleAnalyticsTracker.q && (300 === GoogleAnalyticsTracker.q.length && (GoogleAnalyticsTracker.q.shift(), GoogleAnalyticsTracker.qd++), GoogleAnalyticsTracker.q.push(a));
    };
    CommandQueue.processArguments = function processArguments(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            let d = void 0;
            try {
                (d = new Command(arguments[c])), d.g ? addToDeferredCommandStore(d.aa[0], d.aa[1]) : (d.i && (d.ha = providePlugin(d.da, d.aa[0], d.X, d.W)), b.push(d)), CommandQueue.addToHistory(arguments[c]);
            } catch (e) {}
        }
        return b;
    };
    CommandQueue.executeCommand = function executeCommand(a) {
        try {
            if (a.u) {
                a.u.call(window, GoogleAnalyticsTracker.getTracker("t0"));
            } else {
                let b = a.da == gaObjectName ? GoogleAnalyticsTracker : GoogleAnalyticsTracker.getTracker(a.da);
                if (a.A) {
                    if ("t0" == a.da && ((b = GoogleAnalyticsTracker.create.apply(GoogleAnalyticsTracker, a.aa)), null === b)) {
                        return !0;
                    }
                } else if (a.ba) {
                    GoogleAnalyticsTracker.remove(a.da);
                } else if (b) {
                    if (a.i) {
                        if ((a.ha && (a.ha = providePlugin(a.da, a.aa[0], a.X, a.W)), !loadPlugin(a.aa[0], b, a.W))) {
                            return !0;
                        }
                    } else if (a.K) {
                        const c = a.methodName;
                        const d = a.aa;
                        const e = b.plugins_.get(a.K);
                        e[c].apply(e, d);
                    } else {
                        b[a.methodName].apply(b, a.aa);
                    }
                }
            }
        } catch (g) {}
    };
    // H
    var analyticsStore = {};
    var sf = {};
    var vf = {};
    function getOrCreateSlot(a, b) {
        let c = window.google_tag_data;
        c || (c = window.google_tag_data = {});
        let d = c.slq;
        d || (d = c.slq = {});
        c = d[a];
        c || ((c = {}), (c = d[a] = ((c.q = b ? b.slice() : []), c)));
        return c;
    }
    function getCookieConfiguration(tracker) {
        return { allowAdFeatures: tracker.get(allowAdFeaturesProperty), allowAdPersonalizationSignals: tracker.get(allowAdPersonalizationSignalsProperty), cookieDomain: getStringValue(tracker, cookieDomainProperty), cookieExpires: tracker.get(cookieExpiresProperty), cookieFlags: getStringValue(tracker, cookieFlagsProperty), cookieName: getStringValue(tracker, cookieNameProperty), cookiePath: getStringValue(tracker, cookiePathProperty), cookieUpdate: tracker.get(cookieUpdateProperty), hitPayload: getStringValue(tracker, hitPayloadProp) };
    }
    function shouldSendSecureTransport(a) {
        return (void 0 === a.get(_no_slcProp) && void 0 === a.get(transportProp) && void 0 === a.get(transportUrlProperty) && void 0 === a.get(_x_19Property));
    }

    var GoogleAnalyticsTracker = function(a) {
        setBitSetFlag(1);
        CommandQueue.executeCommands.apply(CommandQueue, [arguments]);
    };

    // Static properties
    GoogleAnalyticsTracker.h = {};
    GoogleAnalyticsTracker.P = [];
    GoogleAnalyticsTracker.L = 0;
    GoogleAnalyticsTracker.ya = 0;
    GoogleAnalyticsTracker.answer = 42;

    var trackingProperties = [trackingIdProperty, cookieDomainProperty, nameProperty];

    // GoogleAnalyticsTracker.create (Static Method)
    GoogleAnalyticsTracker.create = function(a) {
        let b = combineArgumentsToObject(trackingProperties, [].slice.call(arguments));
        b[nameProperty] || (b[nameProperty] = "t0");
        let c = "" + b[nameProperty];
        if (GoogleAnalyticsTracker.h[c]) {
            return GoogleAnalyticsTracker.h[c];
        }
        if (addTargetToPending(b)) {
            return null;
        }
        b = new Tracker(b);
        GoogleAnalyticsTracker.h[c] = b;
        GoogleAnalyticsTracker.P.push(b);
        c = getGaData().tracker_created;
        if (isFunction(c)) {
            try {
                c(b);
            } catch (d) {}
        }
        return b;
    };

    // GoogleAnalyticsTracker.remove (Static Method)
    GoogleAnalyticsTracker.remove = function(a) {
        for (let b = 0; b < GoogleAnalyticsTracker.P.length; b++) {
            if (GoogleAnalyticsTracker.P[b].get(nameProperty) == a) {
                GoogleAnalyticsTracker.P.splice(b, 1);
                GoogleAnalyticsTracker.h[a] = null;
                break;
            }
        }
    };

    // GoogleAnalyticsTracker.getTracker (Static Method)
    GoogleAnalyticsTracker.getTracker = function(a) {
        return GoogleAnalyticsTracker.h[a];
    };

    // GoogleAnalyticsTracker.getAll (Static Method)
    GoogleAnalyticsTracker.getAll = function() {
        return GoogleAnalyticsTracker.P.slice(0);
    };

    // GoogleAnalyticsTracker.initialize (Static Method)
    GoogleAnalyticsTracker.initialize = function() {
        "ga" != gaObjectName && setBitSetFlag(49);
        let a = window[gaObjectName];
        if (!a || 42 != a.answer) {
            GoogleAnalyticsTracker.L = a && a.l;
            GoogleAnalyticsTracker.ya = 1 * new Date();
            GoogleAnalyticsTracker.loaded = !0;
            let b = a && a.q;
            let c = isArray(b);
            a = [];
            c ? (a = b.slice(0)) : setBitSetFlag(50);
            GoogleAnalyticsTracker.q = c ? b : [];
            GoogleAnalyticsTracker.q.splice(0);
            GoogleAnalyticsTracker.qd = 0;
            b = window[gaObjectName] = GoogleAnalyticsTracker;
            wrapMethodWithExceptionHandling("create", b, b.create);
            wrapMethodWithExceptionHandling("remove", b, b.remove);
            wrapMethodWithExceptionHandling("getByName", b, b.getTracker, 5);
            wrapMethodWithExceptionHandling("getAll", b, b.getAll, 6);
            b = Tracker.prototype;
            wrapMethodWithExceptionHandling("get", b, b.get, 7);
            wrapMethodWithExceptionHandling("set", b, b.set, 4);
            wrapMethodWithExceptionHandling("send", b, b.send);
            wrapMethodWithExceptionHandling("requireSync", b, b.ma);
            b = TrackerModel.prototype;
            wrapMethodWithExceptionHandling("get", b, b.get);
            wrapMethodWithExceptionHandling("set", b, b.set);
            if ("https:" != document.location.protocol && !forceSSL) {
                a: {
                    b = document.getElementsByTagName("script");
                    for (c = 0; c < b.length && 100 > c; c++) {
                        const d = b[c].src;
                        if (d && 0 == d.indexOf(getAnalyticsURL(!0) + "/analytics")) {
                            b = !0;
                            break a;
                        }
                    }
                    b = !1;
                }
                b && (forceSSL = !0);
            }
            (window.gaplugins = window.gaplugins || {}).Linker = TrackerLinker;
            b = TrackerLinker.prototype;
            addToDeferredCommandStore("linker", TrackerLinker);
            wrapMethodWithExceptionHandling("decorate", b, b.ca, 20);
            wrapMethodWithExceptionHandling("autoLink", b, b.S, 25);
            wrapMethodWithExceptionHandling("passthrough", b, b.$, 25);
            addToDeferredCommandStore("displayfeatures", initializeDisplayFeaturesPlugin);
            addToDeferredCommandStore("adfeatures", initializeDisplayFeaturesPlugin);
            CommandQueue.executeCommands.apply(GoogleAnalyticsTracker, a);
        }
    };
    GoogleAnalyticsTracker.h = {};
    GoogleAnalyticsTracker.P = [];
    GoogleAnalyticsTracker.L = 0;
    GoogleAnalyticsTracker.ya = 0;
    GoogleAnalyticsTracker.answer = 42;
    var trackingProperties = [trackingIdProperty, cookieDomainProperty, nameProperty];
    const initialize = GoogleAnalyticsTracker.initialize;
    /** @type {GoogleAnalyticsTracker} */
    const googleAnalyticsObject = window[gaObjectName];
    googleAnalyticsObject && googleAnalyticsObject.r ? initialize() : executeWhenDocumentVisible(initialize);
    executeWhenDocumentVisible(() => {
        CommandQueue.executeCommands(["provide", "render", noop]);
    });
})(window);
