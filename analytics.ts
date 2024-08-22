// https://www.google-analytics.com/analytics.js
// wip: typedversion of analytics.js
(function() {
    var globalScope: Window = this || self;

    function registerNamespace(path: string, value: any): void {
        path = path.split(".");
        let global = globalScope as any;
        path[0] in global || typeof global.execScript === "undefined" || global.execScript("var " + path[0]);
        let d: string | undefined;
        while (path.length && (d = path.shift())) {
            global = path.length || value === undefined ? (global[d] && global[d] !== Object.prototype[d] ? global[d] : (global[d] = {})) : (global[d] = value);
        }
    }

    function createCharIndexMapping(): Record<string, number> {
        const a = base64CharSet;
        const b: Record<string, number> = {};
        for (let c = 0; c < a.length; ++c) {
            b[a[c]] = c;
        }
        return b;
    }

    function generateCharacterSet(): string {
        let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        a += a.toLowerCase() + "0123456789-_";
        return a + ".";
    }

    let base64CharSet: string;
    let charToIndexMap: Record<string, number>;

    function decodeBase64(a: string): string {
        function b(k: number): number {
            while (d < a.length) {
                const m = a.charAt(d++);
                const l = charToIndexMap[m];
                if (l != null) {
                    return l;
                }
                if (!/^[\s\xa0]*$/.test(m)) {
                    throw new Error("Unknown base64 encoding at char: " + m);
                }
            }
            return k;
        }

        base64CharSet = base64CharSet || generateCharacterSet();
        charToIndexMap = charToIndexMap || createCharIndexMapping();
        let c = "", d = 0;
        while (true) {
            const e = b(-1);
            const f = b(0);
            const h = b(64);
            const g = b(64);
            if (g === 64 && e === -1) {
                return c;
            }
            c += String.fromCharCode((e << 2) | (f >> 4));
            if (h !== 64) {
                c += String.fromCharCode(((f << 4) & 240) | (h >> 2));
                if (g !== 64) {
                    c += String.fromCharCode(((h << 6) & 192) | g);
                }
            }
        }
    }

    var EventTagging: Record<string, any> = {};

    function tagEvent(a: string | number): void {
        EventTagging.TAGGING = EventTagging.TAGGING || [];
        EventTagging.TAGGING[a] = true;
    }

    const isArray = Array.isArray;

    function findInArray<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
        if (arr && isArray(arr)) {
            for (let c = 0; c < arr.length; c++) {
                if (arr[c] && predicate(arr[c])) {
                    return arr[c];
                }
            }
        }
    }

    function extendTarget<T extends Record<string, any>>(target: T, source: Partial<T>): void {
        for (const c in source) {
            if (source.hasOwnProperty(c)) {
                target[c] = source[c];
            }
        }
    }

    function isEmptyObject(obj: Record<string, any>): boolean {
        for (const b in obj) {
            if (obj.hasOwnProperty(b)) {
                return true;
            }
        }
        return false;
    }

    class SimpleObject {
        value: string;
        constructor(value: string) {
            this.value = value;
        }
        toString() {
            return this.value.toString();
        }
    }

    const URL_REGEX = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    new SimpleObject("about:invalid#zClosurez");
    new SimpleObject("about:blank");

    class StringWrapper {
        value: string;
        constructor() {
            this.value = "";
        }
        toString() {
            return this.value.toString();
        }
    }
    new StringWrapper();

    class StringWrapper2 {
        value: string;
        constructor() {
            this.value = "";
        }
        toString() {
            return this.value.toString();
        }
    }

    new StringWrapper2();

    class TrustedHTML {
        g: string;
        constructor() {
            this.g = (globalScope.trustedTypes && globalScope.trustedTypes.emptyHTML) || "";
        }
        toString() {
            return this.g.toString();
        }
    }
    new TrustedHTML();

    const win = window;
    const history = window.history;
    const doc = document;
    const nav = navigator;

    function getSharedData(): Record<string, any> {
        const a: Record<string, any> = {};
        const b = win.google_tag_data;
        win.google_tag_data = b === undefined ? a : b;
        return win.google_tag_data;
    }

    function addEventListener(a: string, b: EventListenerOrEventListenerObject): void {
        doc.addEventListener ? doc.addEventListener(a, b, false) : doc.attachEvent && doc.attachEvent("on" + a, b);
    }

    function registerClickEvent(a: { ctid: string; isDestination: boolean }): void {
        const b = getOrCreateSharedData();
        b.pending || (b.pending = []);
        findInArray(b.pending, (c) => c.target.ctid === a.ctid && c.target.isDestination === a.isDestination) || b.pending.push({ target: a, onLoad: undefined });
    }

    class SharedDataContainer {
        container: Record<string, any>;
        destination: Record<string, any>;
        canonical: Record<string, any>;
        pending: any[];
        constructor() {
            this.container = {};
            this.destination = {};
            this.canonical = {};
            this.pending = [];
        }
    }

    function getOrCreateSharedData(): SharedDataContainer {
        const a = getSharedData();
        let b = a.tidr;
        if (!b) {
            b = new SharedDataContainer();
            a.tidr = b;
        }
        return b;
    }

    const portPattern = /:[0-9]+$/;

    function manipulateUrl(url: URL, component: string): string {
        component && (component = String(component).toLowerCase());
        if (component === "protocol" || component === "port") {
            url.protocol = normalizeProtocol(url.protocol) || normalizeProtocol(win.location.protocol);
        }
        if (component === "port") {
            url.port = String(Number(url.hostname ? url.port : win.location.port) || (url.protocol === "http" ? 80 : url.protocol === "https" ? 443 : ""));
        } else if (component === "host") {
            url.hostname = (url.hostname || win.location.hostname).replace(portPattern, "").toLowerCase();
        }
        return processUrl(url, component);
    }

    function processUrl(url: URL | string, component: string, useAltHost?: boolean): string {
        const d = normalizeProtocol(url.protocol);
        component && (component = String(component).toLowerCase());
        switch (component) {
            case "url_no_fragment":
                useAltHost = "";
                url && url.href && ((useAltHost = url.href.indexOf("#")), (useAltHost = useAltHost < 0 ? url.href : url.href.substr(0, useAltHost)));
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
                url = String(Number(url.port) || (d === "http" ? 80 : d === "https" ? 443 : ""));
                break;
            case "path":
                url.pathname || url.hostname || tagEvent(1);
                url = url.pathname.startsWith("/") ? url.pathname : "/" + url.pathname;
                url = url.split("/");
                if ([].indexOf(url[url.length - 1]) >= 0) {
                    url[url.length - 1] = "";
                }
                url = url.join("/");
                break;
            case "query":
                url = url.search.replace("?", "");
                break;
            case "extension":
                url = url.pathname.split(".");
                url = url.length > 1 ? url[url.length - 1] : "";
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

    function normalizeProtocol(a: string): string {
        return a ? a.replace(":", "").toLowerCase() : "";
    }

    function parseUrl(a: string): URL {
        const b = doc.createElement("a") as HTMLAnchorElement;
        if (a) { b.href = a; }
        let c = b.pathname;
        if (c[0] !== "/") {
            if (!a) { tagEvent(1); }
            c = "/" + c;
        }
        const hostname = b.hostname.replace(portPattern, "");
        return { href: b.href, protocol: b.protocol, host: b.host, hostname: hostname, pathname: c, search: b.search, hash: b.hash, port: b.port } as unknown as URL;
    }

    let S: number[];

    function initializeEventTracking(): void {
        const a = handleClick;
        const b = handleSubmit;
        const c = getEventTrackingState();

        const d = (h: Event) => {
            a(h.target || (h.srcElement as HTMLElement) || {});
        };

        const e = (h: Event) => {
            b(h.target || (h.srcElement as HTMLElement) || {});
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
            c.init = true;
        }
    }

    function registerDecorator(a: () => void, b: string[], c: number, d: boolean, e: boolean): void {
        const decorator = { callback: a, domains: b, fragment: c === 2, placement: c, forms: d, sameHost: e };
        getEventTrackingState().decorators.push(decorator);
    }

    function applyDecorators(a: string, b: number, c: boolean): Record<string, any> {
        const d = getEventTrackingState().decorators;
        let e: Record<string, any> = {};
        for (let f = 0; f < d.length; ++f) {
            const h = d[f];
            let g = !c || h.forms;
            if (g) {
                g = h.domains;
                const k = a;
                const m = !!h.sameHost;
                if (g && (m || k !== doc.location.hostname)) {
                    for (let l = 0; l < g.length; l++) {
                        if (g[l] instanceof RegExp) {
                            if (g[l].test(k)) {
                                g = true;
                                break;
                            }
                        } else if (k.indexOf(g[l]) >= 0 || (m && g[l].indexOf(k) >= 0)) {
                            g = true;
                            break;
                        }
                    }
                }
            }
            if (g) {
                const placement = h.placement === undefined ? (h.fragment ? 2 : 1) : h.placement;
                if (placement === b) {
                    extendTarget(e, h.callback());
                }
            }
        }
        return e;
    }

    function getEventTrackingState(): { decorators: any[]; init?: boolean } {
        const a = getSharedData();
        let b = a.gl;
        if (!b || !b.decorators) {
            b = { decorators: [] };
            a.gl = b;
        }
        return b;
    }

    const ja = /(.*?)\*(.*?)\*(.*)/;
    const ka = /([^?#]+)(\?[^#]*)?(#.*)?/;

    function createParamRegex(a: string): RegExp {
        return new RegExp("(.*?)(^|&)" + a + "=([^&]*)&?(.*)");
    }

    function encodeParams(a: Record<string, any>): string {
        const b: string[] = [];
        for (const c in a) {
            if (a.hasOwnProperty(c)) {
                const d = a[c];
                if (d !== undefined && d === d && d !== null && d.toString() !== "[object Object]") {
                    b.push(c);
                    const e = b;
                    const f = e.push;
                    let h: string[] = [];
                    const str = String(d);
                    base64CharSet = base64CharSet || generateCharacterSet();
                    charToIndexMap = charToIndexMap || createCharIndexMapping();
                    for (let g = 0; g < str.length; g += 3) {
                        const k = g + 1 < str.length;
                        const m = g + 2 < str.length;
                        const l = str.charCodeAt(g);
                        const t = k ? str.charCodeAt(g + 1) : 0;
                        const x = m ? str.charCodeAt(g + 2) : 0;
                        const ra = l >> 2;
                        const la = ((l & 3) << 4) | (t >> 4);
                        const ta = ((t & 15) << 2) | (x >> 6);
                        const xa = x & 63;
                        h.push(base64CharSet[ra], base64CharSet[la], base64CharSet[ta], base64CharSet[xa]);
                    }
                    f.call(e, h.join(""));
                }
            }
        }
        const result = b.join("*");
        return ["1", calculateChecksum(result), result].join("*");
    }

    function calculateChecksum(a: string, b?: number): string {
        const str = [nav.userAgent, new Date().getTimezoneOffset(), nav.userLanguage || nav.language, Math.floor(new Date(Date.now()).getTime() / 60 / 1e3) - (b === undefined ? 0 : b), a].join("*");
        if (!S) {
            S = Array(256);
            for (let c = 0; c < 256; c++) {
                let d = c;
                for (let e = 0; e < 8; e++) {
                    d = d & 1 ? (d >>> 1) ^ 3988292384 : d >>> 1;
                }
                S[c] = d;
            }
        }
        let bNum = 4294967295;
        for (let c = 0; c < str.length; c++) {
            bNum = (bNum >>> 8) ^ S[(bNum ^ str.charCodeAt(c)) & 255];
        }
        return ((bNum ^ -1) >>> 0).toString(36);
    }

    function decorateUrl(a: (b: Record<string, any>) => void): (b: Record<string, any>) => void {
        return function(b: Record<string, any>) {
            const c = parseUrl(win.location.href);
            const d = c.search.replace("?", "");
            let e: string | undefined;
            const eSplit = d.split("&");
            for (let f = 0; f < eSplit.length; f++) {
                const h = eSplit[f].split("=");
                if ("_gl" === decodeURIComponent(h[0]).replace(/\+/g, " ")) {
                    e = h.slice(1).join("=");
                    break;
                }
            }
            b.query = decodeQueryParam(e || "") || {};
            const frag = manipulateUrl(c, "fragment");
            const fMatch = frag.match(createParamRegex("_gl"));
            b.fragment = decodeQueryParam((fMatch && fMatch[3]) || "") || {};
            a && updateUrl(c, d, frag);
        };
    }

    function removeParamFromString(a: string, b: string): string {
        const match = createParamRegex(a).exec(b);
        if (match) {
            const c = match[2];
            const d = match[4];
            b = match[1];
            if (d) { b = b + c + d; }
        }
        return b;
    }

    function updateUrl(a: URL, b: string, c: string): void {
        if (history && history.replaceState) {
            const e = createParamRegex("_gl");
            if (e.test(b) || e.test(c)) {
                const path = manipulateUrl(a, "path");
                const bMod = removeParamFromString("_gl", b);
                const cMod = removeParamFromString("_gl", c);
                history.replaceState({}, undefined, `${path}${bMod ? "?" + bMod : ""}${cMod ? "#" + cMod : ""}`);
            }
        }
    }

    function decodeQueryParam(a: string): Record<string, any> | undefined {
        try {
            let g: string | undefined;
            if (a) {
                for (let b = 0; b < 3; b++) {
                    const c = ja.exec(a);
                    if (c) {
                        if (c && "1" === c[1]) {
                            const e = c[2];
                            const f = c[3];
                            let h = false;
                            for (let d = 0; d < 3; d++) {
                                if (e === calculateChecksum(f, d)) {
                                    h = true;
                                    break;
                                }
                            }
                            if (h) {
                                g = f;
                                break;
                            }
                            tagEvent(7);
                        }
                    }
                    a = decodeURIComponent(a);
                }
            }
            if (g !== undefined) {
                const result: Record<string, any> = {};
                const k = g.split("*");
                for (let e = 0; e + 1 < k.length; e += 2) {
                    const m = k[e];
                    const l = decodeBase64(k[e + 1]);
                    result[m] = l;
                }
                tagEvent(6);
                return result;
            }
        } catch (t) {
            tagEvent(8);
        }
    }

    function addParamToUrl(a: string, b: string, c: string, d: boolean = false): string {
        const match = ka.exec(c);
        if (!match) {
            return "";
        }
        const url = match[1];
        const search = match[2] || "";
        const hash = match[3] || "";
        const param = `${a}=${b}`;
        if (d) {
            return `${url}${search}${hash ? "#" + removeParamFromString(a, hash.substring(1)) : ""}`;
        }
        return `${url}${removeParamFromString(a, search.substring(1)) ? "?" + removeParamFromString(a, search.substring(1)) : ""}${hash}`;
    }

    function processLinkOrForm(a: HTMLElement, b: string): void {
        const c = a.tagName.toUpperCase() === "FORM";
        const d = applyDecorators(b, 1, c);
        const e = applyDecorators(b, 2, c);
        const f = applyDecorators(b, 3, c);
        if (isEmptyObject(d)) {
            const encodedParams = encodeParams(d);
            if (c) {
                appendHiddenInput("_gl", encodedParams, a as HTMLFormElement);
            } else {
                addParamToAnchor("_gl", encodedParams, a as HTMLAnchorElement, false);
            }
        }
        if (!c && isEmptyObject(e)) {
            const encodedParams = encodeParams(e);
            addParamToAnchor("_gl", encodedParams, a as HTMLAnchorElement, true);
        }
        for (const g in f) {
            if (f.hasOwnProperty(g)) {
                setUrlParam(g, f[g], a);
            }
        }
    }

    function setUrlParam(a: string, b: string, c: HTMLElement, d: boolean = false): void | string {
        if (c.tagName) {
            if (c.tagName.toLowerCase() === "a") {
                return addParamToAnchor(a, b, c as HTMLAnchorElement, d);
            }
            if (c.tagName.toLowerCase() === "form") {
                return appendHiddenInput(a, b, c as HTMLFormElement);
            }
        }
        if (typeof c === "string") {
            return addParamToUrl(a, b, c, d);
        }
    }

    function addParamToAnchor(a: string, b: string, c: HTMLAnchorElement, d: boolean = false): void {
        if (c.href) {
            const newHref = addParamToUrl(a, b, c.href, d);
            if (URL_REGEX.test(newHref)) {
                c.href = newHref;
            }
        }
    }

    function appendHiddenInput(a: string, b: string, c: HTMLFormElement): void {
        if (c && c.action) {
            const method = c.method.toLowerCase();
            if (method === "get") {
                const children = c.childNodes;
                let exists = false;
                for (let i = 0; i < children.length; i++) {
                    const input = children[i] as HTMLInputElement;
                    if (input.name === a) {
                        input.setAttribute("value", b);
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    const input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", a);
                    input.setAttribute("value", b);
                    c.appendChild(input);
                }
            } else if (method === "post") {
                const newAction = addParamToUrl(a, b, c.action);
                if (URL_REGEX.test(newAction)) {
                    c.action = newAction;
                }
            }
        }
    }

    function handleClick(a: EventTarget | null): void {
        try {
            let link: HTMLAnchorElement | null = null;
            for (let b = 100; a && b > 0;) {
                if ((a as HTMLElement).href && (a as HTMLElement).nodeName.match(/^a(?:rea)?$/i)) {
                    link = a as HTMLAnchorElement;
                    break;
                }
                a = (a as HTMLElement).parentNode;
                b--;
            }
            if (link) {
                const d = link.protocol;
                if (d === "http:" || d === "https:") {
                    processLinkOrForm(link, link.hostname);
                }
            }
        } catch (e) {}
    }

    function handleSubmit(a: HTMLFormElement): void {
        try {
            if (a.action) {
                const b = manipulateUrl(parseUrl(a.action), "host");
                processLinkOrForm(a, b);
            }
        } catch (c) {}
    }

    registerNamespace("google_tag_data.glBridge.auto", function(a, b, c, d) {
        initializeEventTracking();
        registerDecorator(a, b, c === "fragment" ? 2 : 1, !!d, false);
    });

    registerNamespace("google_tag_data.glBridge.passthrough", (a: () => void, b: number, c: any) => {
        initializeEventTracking();
        registerDecorator(a, [processUrl(win.location, "host", true)], b, !!c, true);
    });

    registerNamespace("google_tag_data.glBridge.decorate", function(a, b, c) {
        a = encodeParams(a);
        return setUrlParam("_gl", a, b, !!c);
    });

    registerNamespace("google_tag_data.glBridge.generate", encodeParams);

    registerNamespace("google_tag_data.glBridge.get", function(a, b) {
        const c = decorateUrl(!!b);
        const dataState = getEventTrackingState();
        if (!dataState.data) {
            dataState.data = { query: {}, fragment: {} };
            c(dataState.data);
        }
        let result: Record<string, any> = {};
        const data = dataState.data;
        if (data) {
            extendTarget(result, data.query);
            if (a) { extendTarget(result, data.fragment); }
        }
        return result;
    });

    registerNamespace("google_tag_data.tcBridge.registerUa", function(a: string, b: string) {
        const key = a + "_" + b;
        const c = getOrCreateSharedData();
        let d = c.destination[key];
        if (d) {
            d.state = 2;
            d.containers = [];
            d.destinations = [b];
        } else {
            c.destination[key] = { state: 2, containers: [], destinations: [b] };
        }
    });

    registerNamespace("google_tag_data.tcBridge.setSideload", function(a: string, b: string, c: string) {
        const target = { ctid: a + "_" + c, isDestination: true };
        getOrCreateSharedData().container[b] = { state: 1, context: { source: 5, fromContainerExecution: true }, parent: target };
        registerClickEvent({ ctid: b, isDestination: false });
    });
})();
