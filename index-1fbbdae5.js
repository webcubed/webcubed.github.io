import {c as clamp, l as lerp, a as clamp01, T as TypedMessenger, M as MapLoadError, B as BufferGeometry, b as BufferAttribute, d as Mesh, O as Object3D, e as Matrix4, p as processedSkinNames, t as traverseObject, V as Vector3, Q as Quaternion, D as DoubleSide, f as BackSide, A as AdditiveBlending, S as Scene, P as PlaneGeometry, C as Color, g as ShaderMaterial, F as FrontSide, h as Box3, i as Sphere, j as Vector2, k as PerspectiveCamera, m as mod, n as teamColors, o as modMinMax, E as Euler, q as mapValue, r as iLerp, L as Line3, s as LineBasicMaterial, u as Line, I as IcosahedronGeometry, v as hsvToRgb, w as rgbToHsv, x as SphereGeometry, y as Texture, N as NearestFilter, z as smoothClamp, W as WebGLRenderer, G as sRGBEncoding} from "./colors-15d54d87.js";
!function() {
    function t(t, e) {
        var i = new XMLHttpRequest;
        i.onreadystatechange = function() {
            4 === i.readyState && e(i.responseText)
        }
        ,
        i.open("GET", t, !0),
        i.send()
    }
    function e(t, e, i) {
        Object.defineProperty ? Object.defineProperty(t, e, i) : t[e] = i.get()
    }
    var i, s = window.CSS;
    s || (window.CSS = s = {}),
    s.supports || (s.supports = function t(e, i) {
        if ("paint" == e)
            return !0;
        if (i) {
            var s = d.contentDocument.body;
            return s.style.cssText = e + ":" + i,
            s.style.cssText.length > 0
        }
        for (var n, a, o, r, l = /(^|not|(or)|(and))\s*\(\s*(.+?)\s*:(.+?)\)\s*|(.)/gi; o = l.exec(e); ) {
            if (o[6])
                return !1;
            r = t(o[4], o[5]),
            a = o[2] ? a || r : o[3] ? a && r : (n = !o[1],
            r)
        }
        return a == n
    }
    ),
    s.escape || (s.escape = function(t) {
        return t.replace(/([^\w-])/g, "\\$1")
    }
    );
    var n = {};
    function a(t, e) {
        var i = parseFloat(t);
        this.value = isNaN(i) ? t : i,
        this.unit = e
    }
    s.registerProperty || (s.registerProperty = function(t) {
        n[t.name] = t
    }
    ),
    a.prototype.toString = function() {
        return this.value + ("number" == this.unit ? "" : this.unit)
    }
    ,
    a.prototype.valueOf = function() {
        return this.value
    }
    ,
    "Hz Q ch cm deg dpcm dpi ddpx em ex fr grad in kHz mm ms number pc percent pt px rad rem s turn vh vmax vmin vw".split(" ").forEach((function(t) {
        s[t] || (s[t] = function(e) {
            return new a(e,t)
        }
        )
    }
    ));
    var o = /(background|mask|cursor|-image|-source)/
      , r = !!s.paintWorklet;
    r || (i = new nt,
    e(s, "paintWorklet", {
        enumerable: !0,
        configurable: !0,
        get: function() {
            return i
        }
    }));
    var l = "css-paint-polyfill"
      , h = document.createElement(l);
    r || document.documentElement.appendChild(h);
    var d = document.createElement("iframe");
    d.style.cssText = "position:absolute; left:0; top:-999px; width:1px; height:1px;",
    h.appendChild(d);
    var c = document.createElement("style");
    c.id = l,
    c.$$isPaint = !0,
    h.appendChild(c);
    var u = c.sheet
      , p = h.style
      , g = !1
      , m = []
      , f = /(paint\(|-moz-element\(#paint-|-webkit-canvas\(paint-|[('"]blob:[^'"#]+#paint=|[('"]data:image\/paint-)/
      , w = "getCSSCanvasContext"in document
      , b = (p.backgroundImage = "-moz-element(#" + l + ")") === p.backgroundImage
      , y = "function" == typeof Promise;
    p.cssText = "display:none !important;";
    var S = window.requestAnimationFrame || setTimeout
      , C = function() {
        return window.devicePixelRatio || 1
    }
      , v = {}
      , M = {}
      , k = 0;
    function P(t) {
        var e = t.bit ^= 1;
        return t.instances[e] || (t.instances[e] = new t.Painter)
    }
    function I(t, e) {
        var i = t.cssText
          , s = f.test(i);
        if (!0 === e.isNew && s && i !== (i = O(i)) && (t = function(t, e) {
            for (var i = t.parentStyleSheet, s = t.parentRule, n = (s || i).cssRules, a = n.length - 1, o = 0; o <= a; o++)
                if (n[o] === t) {
                    (s || i).deleteRule(o),
                    a = o;
                    break
                }
            if (null != e) {
                if (s) {
                    var r = s.appendRule(e);
                    return s.cssRules[r]
                }
                return i.insertRule(e, a),
                i.cssRules[a]
            }
        }(t, i)),
        s) {
            var n, a, o, r = t.selectorText, l = G(t.style);
            if (n = null == e.counters[r] ? e.counters[r] = 1 : ++e.counters[r],
            null != M[a = "sheet" + e.sheetId + "\n" + r + "\n" + n]) {
                if ((o = M[a]).selector === r)
                    return o.rule = t,
                    void (o.cssText !== l && e.toProcess.push(o));
                e.toRemove.push(o)
            } else
                o = M[a] = {
                    key: a,
                    selector: r,
                    cssText: l,
                    properties: {},
                    rule: t
                },
                e.toProcess.push(o.selector)
        }
    }
    function A(t, e) {
        if (!("ownerSVGElement"in t)) {
            e(t);
            for (var i = t.firstElementChild; i; )
                A(i, e),
                i = i.nextElementSibling
        }
    }
    function x() {
        for (var t, e = [].slice.call(document.styleSheets), i = {
            toProcess: [],
            toRemove: [],
            counters: {},
            isNew: !1,
            sheetId: null,
            rules: null
        }, s = 0; s < e.length; s++) {
            var n = e[s].ownerNode;
            if (!n.$$isPaint) {
                try {
                    i.rules = n.sheet.cssRules
                } catch (t) {
                    continue
                }
                if (i.sheetId = n.$$paintid,
                i.isNew = null == i.sheetId,
                i.isNew) {
                    if (i.sheetId = n.$$paintid = ++k,
                    !1 === E(n))
                        continue;
                    t = !0
                }
                L(n.sheet, I, i)
            }
        }
        for (var a = i.toRemove.length; a--; )
            delete M[i.toRemove[a].key];
        i.toProcess.length > 0 && H(i.toProcess.join(", ")),
        t && H("[data-css-paint]", !0)
    }
    function L(e, i, s) {
        var n = [[0, e.cssRules]]
          , a = n[0]
          , o = a[1];
        if (o)
            for (var r = 0; n.length > 0; r++)
                if (r >= o.length) {
                    n.pop();
                    var l = n.length;
                    l > 0 && (o = (a = n[l - 1])[1],
                    r = a[0])
                } else {
                    a[0] = r;
                    var h = o[r];
                    if (3 !== h.type)
                        if (1 === h.type) {
                            var d = i(h, s);
                            void 0 !== d && (s = d)
                        } else
                            h.cssRules && h.cssRules.length > 0 && n.push([0, h.cssRules]);
                    else {
                        if (h.$$isPaint)
                            continue;
                        var c = h.media && h.media.mediaText;
                        if (c && !self.matchMedia(c).matches)
                            continue;
                        if (/ts\.g.{7}is\.com\/css/.test(h.href))
                            continue;
                        h.$$isPaint = !0,
                        t(h.href, T)
                    }
                }
        return s
    }
    function E(e) {
        if (!e.$$isPaint) {
            if (e.href)
                return t(e.href, T),
                !1;
            for (var i = e.childNodes.length; i--; ) {
                var s = e.childNodes[i].nodeValue
                  , n = O(s);
                n !== s && (e.childNodes[i].nodeValue = n)
            }
        }
    }
    function T(t) {
        var e = function(t) {
            var e = d.contentDocument.body
              , i = document.createElement("style");
            return i.media = "print",
            i.$$paintid = ++k,
            i.appendChild(document.createTextNode(t)),
            e.appendChild(i),
            i.sheet.remove = function() {
                return e.removeChild(i)
            }
            ,
            i.sheet
        }(O(t));
        try {
            e._ = e.cssRules.length
        } catch (t) {
            var i = function() {
                e && D(e),
                e = null,
                clearTimeout(s)
            };
            e.ownerNode.onload = e.ownerNode.onerror = i;
            var s = setTimeout(i, 5e3);
            return
        }
        D(e)
    }
    function D(t) {
        var e = "";
        if (L(t, (function(t) {
            if (1 === t.type) {
                for (var i = "", s = 0; s < t.style.length; s++) {
                    var n = t.style.item(s)
                      , a = t.style.getPropertyValue(n);
                    f.test(a) && (i = n + ": " + a + t.style.getPropertyPriority(n) + ";")
                }
                if (i) {
                    i = t.selectorText + "{" + i + "}";
                    for (var o = t; o = o.parentRule; )
                        i = "" + o.cssText.match(/^[\s\S]+?\{/)[0] + i + "}";
                    e += i
                }
            }
        }
        )),
        t.remove(),
        e) {
            var i = document.createElement("style");
            i.appendChild(document.createTextNode(e)),
            h.appendChild(i),
            x()
        }
    }
    function O(t) {
        return t.replace(/( |;|,|\b)paint\s*\(\s*(['"]?)(.+?)\2\s*\)( |;|,|!|\b|$)/g, "$1url(data:image/paint-$3,=)$4")
    }
    var F, V, R, B = [];
    function U(t, e) {
        e && (t.$$paintObservedProperties = null,
        t.$$paintGeometry && !t.$$paintGeometry.live && (t.$$paintGeometry = null)),
        !0 !== t.$$paintPending && (t.$$paintPending = !0,
        -1 === B.indexOf(t) && 1 === B.push(t) && S(N))
    }
    function N() {
        for (var t, e = 0; e < B.length; e++)
            B[e] && "style" === B[e].localName && (t = !0,
            B[e] = null);
        if (t)
            return S(N),
            void x();
        var i = B.length && B.some((function(t) {
            return t && !0 === t.$$needsOverrides
        }
        ));
        for (i && X(); B.length; ) {
            var s = B.pop();
            s && _(s)
        }
        i && Z()
    }
    function H(t, e) {
        try {
            for (var i = document.querySelectorAll(t), s = 0; s < i.length; s++)
                U(i[s], e)
        } catch (t) {}
    }
    function W(t, e, i) {
        for (var s = t.length, n = function() {
            --s || e.apply(null, i || m)
        }, a = 0; a < t.length; a++) {
            var o = new Image;
            o.onload = n,
            o.onerror = onerror,
            o.src = t[a]
        }
    }
    function q(t) {
        var e = t.$$paintId;
        return null == e && (e = t.$$paintId = ++Y),
        e
    }
    function j(t) {
        var e = t.$$paintRule
          , i = q(t);
        if (Number(t.getAttribute("data-css-paint")) !== i && t.setAttribute("data-css-paint", i),
        null == e) {
            var s = u.insertRule('[data-css-paint="' + i + '"] {}', u.cssRules.length);
            e = t.$$paintRule = u.cssRules[s]
        }
        return e
    }
    function G(t) {
        var e = t.cssText;
        if (e)
            return e;
        e = "";
        for (var i = 0, s = void 0; i < t.length; i++)
            0 !== i && (e += " "),
            e += s = t[i],
            e += ":",
            e += t.getPropertyValue(s),
            e += ";";
        return e
    }
    function _(t) {
        var e = getComputedStyle(t);
        if (t.$$paintObservedProperties && !t.$$needsOverrides)
            for (var i = 0; i < t.$$paintObservedProperties.length; i++) {
                var s = t.$$paintObservedProperties[i];
                if (e.getPropertyValue(s).trim() !== t.$$paintedPropertyValues[s]) {
                    K(t, e);
                    break
                }
            }
        else if (t.$$paintId || f.test(G(e)))
            K(t, e);
        else {
            var n = t.getAttribute("style");
            f.test(n) && (t.style.cssText = n.replace(/;\s*$/, "") + "; " + t.style.cssText,
            K(t))
        }
        t.$$paintPending = !1
    }
    function z(t) {
        t.$$paintGeometry && !t.$$paintGeometry.live && (t.$$paintGeometry = null),
        U(t)
    }
    var $ = {
        get: function(t) {
            var e = n[t]
              , i = e && !1 === e.inherits ? V.style.getPropertyValue(t) : $.getRaw(t);
            if (null == i && e)
                i = e.initialValue;
            else if (e && e.syntax) {
                var a = e.syntax.replace(/[<>\s]/g, "");
                "function" == typeof s[a] && (i = s[a](i))
            }
            return "string" == typeof i && (i = i.trim()),
            i
        },
        getRaw: function(t) {
            if (t in R)
                return R[t];
            var e = F.getPropertyValue(t);
            return "string" == typeof e && (e = e.trim()),
            R[t] = e
        }
    }
      , J = window.ResizeObserver && new window.ResizeObserver((function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e]
              , s = i.target.$$paintGeometry;
            s ? s.live = !0 : s = i.target.$$paintGeometry = {
                width: 0,
                height: 0,
                live: !0
            };
            var n = i.borderBoxSize;
            if (n && n.length && (n = n[0]),
            n)
                s.width = 0 | n.inlineSize,
                s.height = 0 | n.blockSize;
            else {
                var a = getComputedStyle(i.target)
                  , o = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight)
                  , r = parseFloat(a.paddingTop) + parseFloat(a.paddingBottom);
                s.width = Math.round((i.contentRect.right - i.contentRect.left || i.contentRect.width) + o),
                s.height = Math.round((i.contentRect.bottom - i.contentRect.top || i.contentRect.height) + r)
            }
            U(i.target, !0)
        }
    }
    ))
      , Y = 0;
    function K(t, e) {
        !0 === t.$$needsOverrides && X();
        var i, s = F = null == e ? getComputedStyle(t) : e;
        V = t,
        R = {};
        var n = [];
        t.$$paintPending = !1;
        var a = function(t) {
            return t.$$paintGeometry || (t.$$paintGeometry = {
                width: t.clientWidth,
                height: t.clientHeight,
                live: !1
            })
        }(t);
        !function(t) {
            J && !t.$$paintGeometry.live && (t.$$paintGeometry.live = !0,
            J.observe(t))
        }(t),
        a = {
            width: a.width,
            height: a.height
        };
        for (var r = C(), l = t.$$paintedProperties, d = 0; d < s.length; d++) {
            var c = s[d]
              , u = $.getRaw(c)
              , p = /(,|\b|^)(?:url\((['"]?))?((?:-moz-element\(#|-webkit-canvas\()paint-\d+-([^;,]+)|(?:data:image\/paint-|blob:[^'"#]+#paint=)([^"';, ]+)(?:[;,].*?)?)\2\)(;|,|\s|\b|$)/g
              , g = ""
              , m = 0
              , f = []
              , y = !1
              , S = !1
              , M = void 0
              , k = void 0
              , I = !1
              , A = a;
            if (o.test(c) && "-webkit-border-image" !== c) {
                if (/border-image/.test(c)) {
                    var x = A.width
                      , L = A.height
                      , E = st($.getRaw("border-image-slice").replace(/\sfill/, "").split(" "))
                      , T = st($.getRaw("border-width").split(" "))
                      , D = st($.getRaw("border-image-outset").split(" "));
                    x += it("0" != E.left && parseFloat(T.left) || 0, D.left || 0, !0),
                    x += it("0" != E.right && parseFloat(T.right) || 0, D.right || 0, !0),
                    L += it("0" != E.top && parseFloat(T.top) || 0, D.top || 0, !0),
                    I = !0,
                    A = {
                        width: x,
                        height: L += it("0" != E.bottom && parseFloat(T.bottom) || 0, D.bottom || 0, !0)
                    }
                }
                for (; k = p.exec(u); ) {
                    !1 === S && (M = q(t)),
                    S = !0,
                    g += u.substring(0, k.index);
                    var O = k[4] || k[5]
                      , B = k[3]
                      , U = v[O]
                      , N = U && U.Painter.contextOptions || {}
                      , H = I || !1 === N.scaling ? 1 : r
                      , G = void 0;
                    U && (U.Painter.inputProperties && n.push.apply(n, U.Painter.inputProperties),
                    G = P(U)),
                    !0 === N.nativePixels && (A.width *= r,
                    A.height *= r,
                    H = 1);
                    var _ = H * A.width
                      , z = H * A.height
                      , Y = t.$$paintContext
                      , K = "paint-" + M + "-" + O
                      , Q = Y && Y.canvas;
                    if (!Q || Q.width != _ || Q.height != z || !0 === w && Y && K !== Y.id) {
                        if (!0 === w)
                            (Y = document.getCSSCanvasContext("2d", K, _, z)).id = K,
                            t.$$paintContext && Y.clearRect(0, 0, _, z);
                        else {
                            var nt = !1;
                            Q || ((Q = document.createElement("canvas")).id = K,
                            nt = b),
                            Q.width = _,
                            Q.height = z,
                            nt && (Q.style.display = "none",
                            h.appendChild(Q)),
                            Y = Q.getContext("2d")
                        }
                        t.$$paintContext = Y,
                        Y.imageSmoothingEnabled = !1,
                        1 !== H && Y.scale(H, H)
                    } else
                        Y.clearRect(0, 0, _, z);
                    if (G && (Y.save(),
                    Y.beginPath(),
                    G.paint(Y, A, $),
                    Y.closePath(),
                    Y.restore(),
                    !1 === w && !b && "resetTransform"in Y && Y.resetTransform()),
                    g += k[1],
                    !0 === w)
                        g += "-webkit-canvas(" + K + ")",
                        (null == k[4] || Q && Q.id !== K) && (y = !0);
                    else if (!0 === b)
                        g += "-moz-element(#" + K + ")",
                        null == k[4] && (y = !0),
                        Q && Q.id !== K && (Q.id = K,
                        y = !0);
                    else {
                        var at = Q.toDataURL("image/png").replace("/png", "/paint-" + O);
                        if ("function" == typeof MSBlobBuilder && (at = tt(at, O)),
                        f.push(at),
                        g += 'url("' + at + '")',
                        at !== B || !i) {
                            var ot = B ? B.indexOf("#") : -1;
                            ~ot && URL.revokeObjectURL(B.substring(0, ot)),
                            y = !0
                        }
                        B = at
                    }
                    g += k[6],
                    m = k.index + k[0].length
                }
                !1 !== S || null == l || null == l[c] ? (g += u.substring(m),
                y && (i || (i = j(t)),
                null == l && (l = t.$$paintedProperties = {}),
                l[c] = !0,
                "background" === c.substring(0, 10) && 1 !== r && et(i.style, "background-size", "100% 100%"),
                /mask/.test(c) && 1 !== r && (et(i.style, "mask-size", "contain"),
                w && et(i.style, "-webkit-mask-size", "contain")),
                /border-image/.test(c) && w && (et(i.style, "border-color", "initial"),
                et(i.style, "image-rendering", "optimizeSpeed")),
                0 === f.length ? et(i.style, c, g) : W(f, et, [i.style, c, g]))) : (i || (i = j(t)),
                i.style.removeProperty(c),
                J && J.unobserve(t),
                t.$$paintGeometry && (t.$$paintGeometry.live = !1))
            }
        }
        t.$$paintObservedProperties = 0 === n.length ? null : n;
        for (var rt = t.$$paintedPropertyValues = {}, lt = 0; lt < n.length; lt++) {
            var ht = n[lt];
            rt[ht] = $.getRaw(ht)
        }
        !0 === t.$$needsOverrides && Z(),
        t.$$needsOverrides = null
    }
    var Q = 0;
    function X() {
        Q++ || (c.disabled = !0)
    }
    function Z() {
        --Q || (c.disabled = !1)
    }
    function tt(t, e) {
        for (var i = atob(t.split(",")[1]), s = new Uint8Array(i.length), n = 0; n < i.length; n++)
            s[n] = i.charCodeAt(n);
        return URL.createObjectURL(new Blob([s])) + "#paint=" + e
    }
    function et(t, e, i) {
        var s = g;
        g = !0,
        t.setProperty(e, i, "important"),
        g = s
    }
    function it(t, e, i) {
        var s = i ? 0 : t
          , n = parseFloat(e);
        return e ? e.match("px") ? s + n : (e.match("%") && (n /= 100),
        t * n) : s
    }
    function st(t) {
        return {
            top: t[0],
            bottom: t[2] || t[0],
            left: t[3] || t[1] || t[0],
            right: t[1] || t[0]
        }
    }
    function nt() {}
    if (nt.prototype.addModule = function(i) {
        var s, n, a = this;
        return y && (s = new Promise((function(t) {
            return n = t
        }
        ))),
        t(i, (function(t) {
            var i = {
                registerPaint: function(t, e) {
                    !function(t, e, i) {
                        v[t] = {
                            worklet: i,
                            Painter: e,
                            properties: e.inputProperties ? [].slice.call(e.inputProperties) : [],
                            bit: 0,
                            instances: []
                        };
                        for (var s = "", n = u.cssRules.length; n--; ) {
                            var a = u.cssRules[n];
                            -1 !== a.style.cssText.indexOf("-" + t) && (s += a.selectorText)
                        }
                        s && H(s, !0)
                    }(t, e, {
                        context: i,
                        realm: s
                    })
                }
            };
            e(i, "devicePixelRatio", {
                get: C
            }),
            i.self = i;
            var s = new function(t, e) {
                var i = document.createElement("iframe");
                i.style.cssText = "position:absolute; left:0; top:-999px; width:1px; height:1px;",
                e.appendChild(i);
                var s = i.contentWindow
                  , n = s.document
                  , a = "var window,$hook";
                for (var o in s)
                    o in t || "eval" === o || (a += ",",
                    a += o);
                for (var r in t)
                    a += ",",
                    a += r,
                    a += "=self.",
                    a += r;
                var l = n.createElement("script");
                l.appendChild(n.createTextNode('function $hook(self,console) {"use strict";\n\t\t' + a + ";return function() {return eval(arguments[0])}}")),
                n.body.appendChild(l),
                this.exec = s.$hook(t, console)
            }
            (i,d.contentDocument && d.contentDocument.body || h);
            t = (a.transpile || String)(t),
            s.exec(t),
            n && n()
        }
        )),
        s
    }
    ,
    !r)
        try {
            !function() {
                var t = !1;
                new MutationObserver((function(e) {
                    if (!0 !== t && !Q) {
                        t = !0;
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i]
                              , n = s.target
                              , a = void 0
                              , o = void 0;
                            if (!n || !("ownerSVGElement"in n))
                                if ("childList" === s.type) {
                                    if (a = s.addedNodes)
                                        for (var r = 0; r < a.length; r++)
                                            1 === a[r].nodeType && A(a[r], U);
                                    if (o = s.removedNodes)
                                        for (var l = 0; l < o.length; l++)
                                            J && o[l].$$paintGeometry && (o[l].$$paintGeometry.live = !1,
                                            J && J.unobserve(o[l]))
                                } else if ("attributes" === s.type && 1 === n.nodeType) {
                                    if ("data-css-paint" === s.attributeName && s.oldValue && null != n.$$paintId && !n.getAttribute("data-css-paint")) {
                                        q(n);
                                        continue
                                    }
                                    A(n, z)
                                }
                        }
                        t = !1
                    }
                }
                )).observe(document.body, {
                    childList: !0,
                    attributes: !0,
                    attributeOldValue: !0,
                    subtree: !0
                });
                var i = Object.getOwnPropertyDescriptor(Element.prototype, "setAttribute")
                  , s = i.value;
                i.value = function(t, e) {
                    return "style" === t && f.test(e) && (e = O(e),
                    q(this),
                    this.$$needsOverrides = !0,
                    z(this)),
                    s.call(this, t, e)
                }
                ,
                e(Element.prototype, "setAttribute", i);
                var n = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute")
                  , a = n.value;
                n.value = function(t) {
                    if ("data-css-paint" !== t)
                        return a.call(this, t)
                }
                ,
                e(Element.prototype, "removeAttribute", n);
                var r = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "style")
                  , l = r.get;
                r.set = function(t) {
                    return r.get.call(this).cssText = t
                }
                ,
                r.get = function() {
                    var t = l.call(this);
                    return t.ownerElement !== this && e(t, "ownerElement", {
                        value: this
                    }),
                    t
                }
                ,
                e(HTMLElement.prototype, "style", r);
                var h = {}
                  , d = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "cssText")
                  , c = d.set;
                d.set = function(t) {
                    if (!Q && f.test(t)) {
                        t = t && O(t);
                        var e = this.ownerElement;
                        e && (q(e),
                        e.$$needsOverrides = !0,
                        z(e))
                    }
                    return c.call(this, t)
                }
                ,
                h.cssText = d,
                Object.keys((window.CSS2Properties || CSSStyleDeclaration).prototype).filter((function(t) {
                    return o.test(t)
                }
                )).forEach((function(t) {
                    var e = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                    h[t] = {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            var t = this.getPropertyPriority(e);
                            return this.getPropertyValue(e) + (t ? " !" + t : "")
                        },
                        set: function(i) {
                            var s = String(i).match(/^(.*?)\s*(?:!\s*(important)\s*)?$/);
                            return this.setProperty(e, s[1], s[2]),
                            this[t]
                        }
                    }
                }
                ));
                var u = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "setProperty")
                  , p = u.value;
                u.value = function(t, e, i) {
                    if (!g && !Q && f.test(e)) {
                        e = e && O(e);
                        var s = this.ownerElement;
                        s && (q(s),
                        s.$$needsOverrides = !0,
                        z(s))
                    }
                    p.call(this, t, e, i)
                }
                ,
                h.setProperty = u,
                Object.defineProperties(CSSStyleDeclaration.prototype, h),
                window.CSS2Properties && Object.defineProperties(window.CSS2Properties.prototype, h),
                addEventListener("resize", (function() {
                    H("[data-css-paint]")
                }
                ));
                var m = {
                    passive: !0
                };
                function w(t) {
                    for (var e = t.target; e; )
                        1 === e.nodeType && U(e),
                        e = e.parentNode
                }
                ["animationiteration", "animationend", "animationstart", "transitionstart", "transitionend", "transitionrun", "transitioncancel", "mouseover", "mouseout", "mousedown", "mouseup", "focus", "blur"].forEach((function(t) {
                    addEventListener(t, w, m)
                }
                )),
                x(),
                H('[style*="paint"]')
            }()
        } catch (t) {}
}(),
function() {
    if ("undefined" != typeof document && !("adoptedStyleSheets"in document)) {
        var t = "ShadyCSS"in window && !ShadyCSS.nativeShadow
          , e = document.implementation.createHTMLDocument("")
          , i = new WeakMap
          , s = "object" == typeof DOMException ? Error : DOMException
          , n = Object.defineProperty
          , a = Array.prototype.forEach
          , o = /@import.+?;?$/gm
          , r = CSSStyleSheet.prototype;
        r.replace = function() {
            return Promise.reject(new s("Can't call replace on non-constructed CSSStyleSheets."))
        }
        ,
        r.replaceSync = function() {
            throw new s("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")
        }
        ;
        var l = new WeakMap
          , h = new WeakMap
          , d = new WeakMap
          , c = new WeakMap
          , u = A.prototype;
        u.replace = function(t) {
            try {
                return this.replaceSync(t),
                Promise.resolve(this)
            } catch (t) {
                return Promise.reject(t)
            }
        }
        ,
        u.replaceSync = function(t) {
            if (I(this),
            "string" == typeof t) {
                var e = this;
                l.get(e).textContent = function(t) {
                    var e = t.replace(o, "");
                    return e !== t && console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),
                    e.trim()
                }(t),
                c.set(e, []),
                h.get(e).forEach((function(t) {
                    t.isConnected() && P(e, k(e, t))
                }
                ))
            }
        }
        ,
        n(u, "cssRules", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return I(this),
                l.get(this).sheet.cssRules
            }
        }),
        n(u, "media", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return I(this),
                l.get(this).sheet.media
            }
        }),
        ["addRule", "deleteRule", "insertRule", "removeRule"].forEach((function(t) {
            u[t] = function() {
                var e = this;
                I(e);
                var i = arguments;
                c.get(e).push({
                    method: t,
                    args: i
                }),
                h.get(e).forEach((function(s) {
                    if (s.isConnected()) {
                        var n = k(e, s).sheet;
                        n[t].apply(n, i)
                    }
                }
                ));
                var s = l.get(e).sheet;
                return s[t].apply(s, i)
            }
        }
        )),
        n(A, Symbol.hasInstance, {
            configurable: !0,
            value: v
        });
        var p = {
            childList: !0,
            subtree: !0
        }
          , g = new WeakMap
          , m = new WeakMap
          , f = new WeakMap
          , w = new WeakMap;
        if (O.prototype = {
            isConnected: function() {
                var t = m.get(this);
                return t instanceof Document ? "loading" !== t.readyState : function(t) {
                    return "isConnected"in t ? t.isConnected : document.contains(t)
                }(t.host)
            },
            connect: function() {
                var t = T(this);
                w.get(this).observe(t, p),
                f.get(this).length > 0 && D(this),
                E(t, (function(t) {
                    x(t).connect()
                }
                ))
            },
            disconnect: function() {
                w.get(this).disconnect()
            },
            update: function(t) {
                var e = this
                  , i = m.get(e) === document ? "Document" : "ShadowRoot";
                if (!Array.isArray(t))
                    throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + i + ": Iterator getter is not callable.");
                if (!t.every(v))
                    throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + i + ": Failed to convert value to 'CSSStyleSheet'");
                if (t.some(M))
                    throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + i + ": Can't adopt non-constructed stylesheets");
                e.sheets = t;
                var s, n, a = f.get(e), o = (s = t).filter((function(t, e) {
                    return s.indexOf(t) === e
                }
                ));
                (n = o,
                a.filter((function(t) {
                    return -1 === n.indexOf(t)
                }
                ))).forEach((function(t) {
                    var i;
                    (i = k(t, e)).parentNode.removeChild(i),
                    function(t, e) {
                        d.get(t).delete(e),
                        h.set(t, h.get(t).filter((function(t) {
                            return t !== e
                        }
                        )))
                    }(t, e)
                }
                )),
                f.set(e, o),
                e.isConnected() && o.length > 0 && D(e)
            }
        },
        window.CSSStyleSheet = A,
        L(Document),
        "ShadowRoot"in window) {
            L(ShadowRoot);
            var b = Element.prototype
              , y = b.attachShadow;
            b.attachShadow = function(t) {
                var e = y.call(this, t);
                return "closed" === t.mode && i.set(this, e),
                e
            }
        }
        var S = x(document);
        S.isConnected() ? S.connect() : document.addEventListener("DOMContentLoaded", S.connect.bind(S))
    }
    function C(t) {
        return t.shadowRoot || i.get(t)
    }
    function v(t) {
        return "object" == typeof t && (u.isPrototypeOf(t) || r.isPrototypeOf(t))
    }
    function M(t) {
        return "object" == typeof t && r.isPrototypeOf(t)
    }
    function k(t, e) {
        return d.get(t).get(e)
    }
    function P(t, e) {
        requestAnimationFrame((function() {
            e.textContent = l.get(t).textContent,
            c.get(t).forEach((function(t) {
                return e.sheet[t.method].apply(e.sheet, t.args)
            }
            ))
        }
        ))
    }
    function I(t) {
        if (!l.has(t))
            throw new TypeError("Illegal invocation")
    }
    function A() {
        var t = this
          , i = document.createElement("style");
        e.body.appendChild(i),
        l.set(t, i),
        h.set(t, []),
        d.set(t, new WeakMap),
        c.set(t, [])
    }
    function x(t) {
        var e = g.get(t);
        return e || (e = new O(t),
        g.set(t, e)),
        e
    }
    function L(t) {
        n(t.prototype, "adoptedStyleSheets", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return x(this).sheets
            },
            set: function(t) {
                x(this).update(t)
            }
        })
    }
    function E(t, e) {
        for (var i = document.createNodeIterator(t, NodeFilter.SHOW_ELEMENT, (function(t) {
            return C(t) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }
        ), null, !1), s = void 0; s = i.nextNode(); )
            e(C(s))
    }
    function T(t) {
        var e = m.get(t);
        return e instanceof Document ? e.body : e
    }
    function D(t) {
        var e = document.createDocumentFragment()
          , i = f.get(t)
          , s = w.get(t)
          , n = T(t);
        s.disconnect(),
        i.forEach((function(i) {
            e.appendChild(k(i, t) || function(t, e) {
                var i = document.createElement("style");
                return d.get(t).set(e, i),
                h.get(t).push(e),
                i
            }(i, t))
        }
        )),
        n.insertBefore(e, null),
        s.observe(n, p),
        i.forEach((function(e) {
            P(e, k(e, t))
        }
        ))
    }
    function O(e) {
        var i = this;
        i.sheets = [],
        m.set(i, e),
        f.set(i, []),
        w.set(i, new MutationObserver((function(e, s) {
            document ? e.forEach((function(e) {
                t || a.call(e.addedNodes, (function(t) {
                    t instanceof Element && E(t, (function(t) {
                        x(t).connect()
                    }
                    ))
                }
                )),
                a.call(e.removedNodes, (function(e) {
                    e instanceof Element && (function(t, e) {
                        return e instanceof HTMLStyleElement && f.get(t).some((function(e) {
                            return k(e, t)
                        }
                        ))
                    }(i, e) && D(i),
                    t || E(e, (function(t) {
                        x(t).disconnect()
                    }
                    )))
                }
                ))
            }
            )) : s.disconnect()
        }
        )))
    }
}();
class IndexedDbUtil {
    constructor(t="keyValuesDb", {objectStoreNames: e=["keyValues"]}={}) {
        this.dbName = t,
        this.objectStoreNames = e;
        const i = indexedDB.open(this.dbName);
        i.onupgradeneeded = ()=>{
            for (const t of this.objectStoreNames)
                i.result.createObjectStore(t)
        }
        ,
        this._dbPromise = this._promisifyRequest(i),
        this._initDb()
    }
    async _initDb() {
        const t = await this._dbPromise;
        t.onversionchange = e=>{
            null == e.newVersion && t.close()
        }
    }
    async closeConnection() {
        (await this._dbPromise).close()
    }
    async _promisifyRequest(t) {
        return "done" == t.readyState ? t.result : await new Promise(((e,i)=>{
            t.onsuccess = ()=>{
                e(t.result)
            }
            ,
            t.onerror = i
        }
        ))
    }
    async deleteDb() {
        await this.closeConnection(),
        await this._promisifyRequest(indexedDB.deleteDatabase(this.dbName))
    }
    async get(t, e=this.objectStoreNames[0]) {
        const i = (await this._dbPromise).transaction(e, "readonly").objectStore(e).get(t);
        return await this._promisifyRequest(i)
    }
    set(t, e, i=this.objectStoreNames[0]) {
        return this.getSet(t, (()=>e), i)
    }
    async getSet(t, e, i=this.objectStoreNames[0], s=!1) {
        const n = (await this._dbPromise).transaction(i, "readwrite").objectStore(i)
          , a = n.openCursor(t)
          , o = await this._promisifyRequest(a);
        if (o)
            if (s) {
                const t = o.delete();
                await this._promisifyRequest(t)
            } else {
                const t = e(o.value)
                  , i = o.update(t);
                await this._promisifyRequest(i)
            }
        else {
            const i = n.put(e(void 0), t);
            await this._promisifyRequest(i)
        }
    }
    async delete(t, e=this.objectStoreNames[0]) {
        await this.getSet(t, (()=>{}
        ), e, !0)
    }
}
class SettingsManager {
    constructor(t) {
        this.indexedDb = t,
        this.defaultValues = {
            sfxVolume: 100,
            musicVolume: 100,
            sfxDistanceCutoff: 30,
            fov: 90,
            quality: 1,
            antialias: !0,
            smoothFiltering: !0,
            mouseAcceleration: !1,
            mouseSensitivity: 1,
            invertMouseY: !1,
            autoShoot: !1,
            walkHeadBob: !0,
            landHeadBob: !0,
            theme: "system",
            hideUi: !1,
            uiScale: 1,
            showStats: !1,
            smoothCam: !1,
            autoSkipStatsScreen: !0,
            chatEnabled: !0,
            crosshairAccuracyOffset: 1,
            crosshairStyle: "three",
            crosshairColor: "#ffffff",
            crosshairOutlineColor: "#000000"
        },
        this.currentValues = new Map,
        this.onValueChangeCbs = new Map;
        for (const [t,e] of Object.entries(this.defaultValues)) {
            const i = t;
            this.currentValues.set(i, e)
        }
        this.onSettingsLoadedCbs = new Set,
        this._settingsLoaded = !1,
        this._isLoadingSettings = !1
    }
    init() {
        this.loadSettings()
    }
    async loadSettings() {
        if (this.settingsLoaded || this._isLoadingSettings)
            return;
        this._isLoadingSettings = !0;
        let t = null;
        try {
            t = await this.indexedDb.get("settings")
        } catch (t) {
            console.warn("Unable to load settings, third party cookies are probably blocked")
        }
        if (t)
            for (const [e,i] of Object.entries(t)) {
                const t = e;
                this.currentValues.set(t, i),
                this.fireValueChange(t, i)
            }
        this._settingsLoaded = !0,
        this.onSettingsLoadedCbs.forEach((t=>t()))
    }
    get settingsLoaded() {
        return this._settingsLoaded
    }
    async saveSettings() {
        if (!this.settingsLoaded)
            return !1;
        const t = {};
        for (const [e,i] of this.currentValues)
            this.defaultValues[e] != i && (t[e] = i);
        try {
            await this.indexedDb.set("settings", t)
        } catch (t) {
            return !1
        }
        return !0
    }
    getValue(t) {
        return this.currentValues.get(t)
    }
    setValue(t, e) {
        this.currentValues.set(t, e),
        this.fireValueChange(t, e),
        this.saveSettings()
    }
    fireValueChange(t, e) {
        const i = this.onValueChangeCbs.get(t);
        if (i)
            for (const t of i)
                t(e)
    }
    onValueChange(t, e) {
        let i = this.onValueChangeCbs.get(t);
        i || (i = new Set,
        this.onValueChangeCbs.set(t, i)),
        i.add(e)
    }
    removeOnValueChange(t, e) {
        const i = this.onValueChangeCbs.get(t);
        i && (i.delete(e),
        i.size <= 0 && this.onValueChangeCbs.delete(t))
    }
    onSettingsLoaded(t) {
        this.onSettingsLoadedCbs.add(t)
    }
}
function randInt(t, e) {
    return Math.floor(randRange(t, e))
}
function randRangeHelper(t, e, i) {
    return i * (e - t) + t
}
function randRange(t, e) {
    return randRangeHelper(t, e, Math.random())
}
function randSeed(t) {
    const e = 1e4 * Math.sin(t);
    return e - Math.floor(e)
}
function randFromArray(t) {
    return randFromArrayHelper(t, Math.random())
}
function randFromArrayHelper(t, e) {
    return t[Math.floor(e * t.length)]
}
function randFromArrayWithProbabilityHelper(t, e) {
    let i = 0;
    for (const e of t)
        i += e.probability;
    const s = randRangeHelper(0, i, e);
    let n = 0;
    for (const e of t)
        if (n += e.probability,
        n > s)
            return e.item;
    return null
}
function randFromArrayWithProbability(t) {
    return randFromArrayWithProbabilityHelper(t, Math.random())
}
function randFromArrayWithProbabilitySeed(t, e) {
    return randFromArrayWithProbabilityHelper(t, randSeed(e))
}
function recalculateStyle(t) {
    window.getComputedStyle(t).getPropertyValue("top")
}
const inMemoryLocalStorage = new Map;
function lsGet(t) {
    try {
        return localStorage.getItem(t)
    } catch (e) {
        return inMemoryLocalStorage.get(t)
    }
}
function searchToDict(t) {
    const e = new URLSearchParams(t)
      , i = {};
    for (const t of e.entries())
        i[t[0]] = t[1];
    return i
}
function parseSearch() {
    return searchToDict(location.search)
}
function requestWithProgress(t, e) {
    return new Promise(((i,s)=>{
        const n = new XMLHttpRequest;
        n.responseType = "blob",
        n.addEventListener("progress", (t=>{
            if (e) {
                let i = 0;
                t.lengthComputable && (i = t.loaded / t.total),
                e(i)
            }
        }
        )),
        n.onload = e=>{
            200 == n.status || 0 == n.status ? i(n.response) : s(new Error(`"${t}" responded with a non ok status code`))
        }
        ,
        n.onerror = t=>{
            s(t)
        }
        ,
        n.open("GET", t, !0),
        n.send()
    }
    ))
}
async function addScript(t) {
    const e = document.createElement("script");
    e.src = t,
    document.head.appendChild(e);
    const i = new Promise(((i,s)=>{
        const n = ()=>{
            i(),
            e.removeEventListener("load", n)
        }
        ;
        e.addEventListener("load", n);
        const a = ()=>{
            s(new Error("unable to load srcipt " + t)),
            e.removeEventListener("error", a)
        }
        ;
        e.addEventListener("error", a)
    }
    ));
    await i
}
async function fetchWithTimeout(t, e={}) {
    const {timeout: i=8e3} = e
      , s = new AbortController
      , n = setTimeout((()=>s.abort()), i);
    e.signal = s.signal;
    const a = await fetch(t, e);
    return clearTimeout(n),
    a
}
function uuidToBinary(t) {
    const e = new ArrayBuffer(16);
    if (!t)
        return e;
    let i = 0
      , s = 0;
    const n = new DataView(e);
    for (; i < t.length; ) {
        "-" == t[i] && i++;
        const e = t.slice(i, i + 2)
          , a = parseInt(e, 16);
        n.setUint8(s++, a),
        i += 2
    }
    return e
}
class MenuButton {
    constructor({text: t="", icon: e="", testLabel: i="", iconSizeMultiplier: s=.9, isUpdateIcon: n=!1, isExitButton: a=!1, onClick: o=null}={}) {
        this.containerEl = document.createElement("div"),
        this.containerEl.classList.add("main-menu-button-container"),
        this.el = document.createElement("button"),
        this.el.classList.add("wrinkledPaper"),
        this.el.classList.toggle("exit-button", a),
        this.containerEl.appendChild(this.el),
        this.el.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        t && (this.el.ariaLabel = t),
        this.el.classList.add("main-menu-button"),
        this.el.addEventListener("click", (t=>{
            o && o()
        }
        )),
        this.textEl = document.createElement("div"),
        this.textEl.classList.add("main-menu-button-text", "whiteBigText", "blueNight"),
        this.textEl.textContent = t,
        this.textEl.ariaHidden = "true",
        this.containerEl.appendChild(this.textEl),
        this.visible = !0,
        e && (this.iconEl = document.createElement("div"),
        this.iconEl.classList.add("buttonImage"),
        this.iconEl.classList.toggle("update-icon", n),
        this.iconEl.style.backgroundImage = `url(${e})`,
        this.iconEl.style.backgroundSize = 100 * s + "%",
        this.el.appendChild(this.iconEl))
    }
    setVisibility(t) {
        this.visible = t,
        this.containerEl.style.display = t ? "" : "none"
    }
    click(t=!1) {
        t && !this.visible || this.el.click()
    }
    setText(t) {
        this.textEl.textContent = t
    }
}
class CurrencyContainer {
    constructor({amount: t=0, testLabel: e=""}={}) {
        this._amount = t,
        this.el = document.createElement("div"),
        this.el.classList.add("currency-container");
        const i = document.createElement("div");
        i.classList.add("coin-icon"),
        this.el.appendChild(i),
        this.textEl = document.createElement("span"),
        this.textEl.classList.add("coin-count-text", "blueNight"),
        this.el.appendChild(this.textEl),
        this.isAnimatingAmount = !1,
        this.animatingStartValue = 0,
        this.animatingTargetValue = 0,
        this.animatingCurrentValue = 0,
        this.animatingDurationMs = 0,
        this.animatingStartTime = 0,
        this.animatingSfxEnabled = !0,
        this.lastIncrementSfxTime = 0,
        this.boundAnimationLoop = this.animationLoop.bind(this),
        this.setAmount(t)
    }
    setAmount(t) {
        this._amount = t,
        this._setAmountText(String(t))
    }
    _setAmountText(t) {
        this.textEl.textContent = t,
        this.textEl.dataset.textContent = t
    }
    get amount() {
        return this._amount
    }
    animateAmount(t, {durationMultiplier: e=1, sfx: i=!0}={}) {
        this.isAnimatingAmount ? this.animatingStartValue = this.animatingCurrentValue : this.animatingStartValue = this._amount,
        this._amount = t,
        this.animatingTargetValue = t;
        const s = Math.abs(this.animatingTargetValue - this.animatingStartValue);
        this.animatingDurationMs = clamp(s, 30, 100) * e * 30,
        this.animatingStartTime = performance.now(),
        this.animatingSfxEnabled = i;
        const n = !this.isAnimatingAmount;
        this.isAnimatingAmount = !0,
        n && this.boundAnimationLoop()
    }
    animationLoop() {
        let t = (performance.now() - this.animatingStartTime) / this.animatingDurationMs;
        t = clamp01(t);
        const e = Math.pow(t, .2);
        let i = lerp(this.animatingStartValue, this.animatingTargetValue, e);
        if (i = Math.round(i),
        this.animatingCurrentValue != i && (this.animatingCurrentValue = i,
        this._setAmountText(String(i)),
        this.animatingSfxEnabled && performance.now() > this.lastIncrementSfxTime + 40)) {
            this.lastIncrementSfxTime = performance.now(),
            getMainInstance().sfx.playSound("ui/coin/pile", {
                volume: .3 * (1 - t)
            });
            const i = lerp(.7, 1, e)
              , s = randInt(0, 4);
            getMainInstance().sfx.playSound("ui/coin/" + s, {
                volume: .5 * t,
                minPitch: i,
                maxPitch: i
            })
        }
        e >= 1 ? this.isAnimatingAmount = !1 : window.requestAnimationFrame(this.boundAnimationLoop)
    }
}
class UiButton {
    constructor({text: t="", ariaLabel: e="", onClick: i=null, showCurrency: s=!1, currency: n=0, extraClasses: a=[], testLabel: o="", isIconButton: r=!1, icon: l=null, iconSize: h=1, iconIsInvertable: d=!0}={}) {
        this.el = document.createElement("button"),
        r ? this.el.classList.add("icon-button", ...a) : this.el.classList.add("dialog-button", "blueNight", "wrinkledPaper", ...a),
        this.el.classList.toggle("currency-button", s),
        this.el.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        e && (this.el.ariaLabel = e),
        this.textEl = document.createElement("span"),
        this.textEl.textContent = t,
        this.el.appendChild(this.textEl),
        this._iconEl = null,
        this._iconSize = h,
        this._iconIsInvertable = d,
        this._currentIcon = null,
        this.setIcon(l),
        this._visible = !0,
        s && (this.currencyContainer = new CurrencyContainer({
            amount: n
        }),
        this.el.appendChild(this.currencyContainer.el)),
        i && this.onClick(i)
    }
    get visible() {
        return this._visible
    }
    set visible(t) {
        this._visible = t,
        this.el.style.display = t ? "" : "none"
    }
    click() {
        this.el.click()
    }
    onClick(t) {
        this.el.addEventListener("click", t)
    }
    set enabled(t) {
        this.el.disabled = !t
    }
    get enabled() {
        return !this.el.disabled
    }
    setIcon(t) {
        const e = !!t;
        !!this._iconEl != e && (e ? (this._iconEl = document.createElement("div"),
        this._iconEl.classList.add("dialog-button-icon"),
        this._iconEl.classList.toggle("no-dark-mode-invert", !this._iconIsInvertable),
        this.el.insertBefore(this._iconEl, this.textEl),
        1 != this._iconSize && (this._iconEl.style.transform = `scale(${this._iconSize})`)) : (this._iconEl && this.el.removeChild(this._iconEl),
        this._iconEl = null)),
        t && this._iconEl && (this._iconEl.style.backgroundImage = `url(${t})`),
        this._currentIcon = t
    }
    get icon() {
        return this._currentIcon
    }
    setText(t) {
        this.textEl.textContent = t
    }
}
class DialogUi {
    constructor({allowCurtainClose: t=!0, customOnCurtainClickCb: e=null, startVisible: i=!0, needsCurtain: s=!0, needsUnlockedPointer: n=!0, extraClasses: a=[], testLabel: o="", indexPriority: r=0, needsWrapper: l=!1, title: h=null}={}) {
        this.allowCurtainClose = t,
        this.customOnCurtainClickCb = e,
        this.needsCurtain = s,
        this.needsUnlockedPointer = n,
        this.indexPriority = r,
        this.zIndex = 0,
        this.wrapperEl = null,
        l && (this.wrapperEl = document.createElement("div"),
        this.wrapperEl.classList.add("dialogWrapper"),
        document.body.appendChild(this.wrapperEl)),
        this.el = document.createElement("div"),
        this.el.classList.add("dialog", "wrinkledPaper", ...a),
        this.el.style.setProperty("--wrinkled-paper-seed", String(randInt(1, 99999))),
        this._transitionVisible = !1,
        this.rootEl.addEventListener("transitionend", (t=>{
            t.target == this.rootEl && "visibility" == t.propertyName && (this.rootEl.classList.contains("hidden") || (this._transitionVisible = !0))
        }
        )),
        this.rootEl.classList.add("hidden"),
        l && this.wrapperEl ? this.wrapperEl.appendChild(this.el) : document.body.appendChild(this.el),
        i && (recalculateStyle(this.el),
        this.rootEl.classList.remove("hidden")),
        h && (this.titleEl = document.createElement("h2"),
        this.titleEl.classList.add("dialogTitle", "blueNight"),
        this.titleEl.textContent = h,
        this.el.appendChild(this.titleEl)),
        this.startVisible = i,
        this._visible = i,
        this._inert = !1,
        this.onVisibilityChangeCbs = new Set,
        this.onInertChangeCbs = new Set,
        this.closed = !1,
        this.onCloseCbs = new Set
    }
    destructor() {
        this.wrapperEl ? document.body.removeChild(this.wrapperEl) : document.body.removeChild(this.el)
    }
    get rootEl() {
        return this.wrapperEl ? this.wrapperEl : this.el
    }
    setZIndex(t) {
        this.zIndex = t,
        this.rootEl.style.zIndex = String(t)
    }
    setInert(t) {
        this._inert = t,
        this.rootEl.inert = t,
        this.onInertChangeCbs.forEach((e=>e(t)))
    }
    get inert() {
        return this._inert
    }
    set visible(t) {
        this._visible = t,
        t || (this._transitionVisible = !1),
        this.rootEl.classList.toggle("hidden", !t);
        for (const e of this.onVisibilityChangeCbs)
            e(t);
        this.onVisibilityChange(t)
    }
    get visible() {
        return this._visible
    }
    get transitionVisible() {
        return this._transitionVisible
    }
    close() {
        if (!this.closed) {
            this.closed = !0,
            this.visible = !1;
            for (const t of this.onCloseCbs)
                t();
            this.onCloseCbs.clear(),
            this.onClose(),
            window.setTimeout((()=>{
                this.destructor()
            }
            ), 500)
        }
    }
    onVisibilityChange(t) {}
    onClose() {}
    addOnVisibilityChangeCb(t) {
        this.onVisibilityChangeCbs.add(t)
    }
    addOnInertChangeCb(t) {
        this.onInertChangeCbs.add(t)
    }
    addOnCloseCb(t) {
        this.onCloseCbs.add(t)
    }
    addButtonsContainer({vertical: t=!1, parent: e=this.el}={}) {
        this.buttonsContainer = document.createElement("div"),
        this.buttonsContainer.classList.add("dialogButtonsContainer"),
        this.buttonsContainer.classList.toggle("vertical", t),
        e.appendChild(this.buttonsContainer)
    }
    addButton(t) {
        const e = new UiButton(t);
        let i = this.el;
        return this.buttonsContainer && (i = this.buttonsContainer),
        i.appendChild(e.el),
        e
    }
    removeButton(t) {
        t.el.parentElement != this.el && t.el.parentElement != this.buttonsContainer || t.el.parentElement.removeChild(t.el)
    }
}
class SettingUiItem {
    constructor(t) {
        const {text: e, type: i, enumValues: s} = t;
        if (this.type = i,
        this.el = document.createElement("div"),
        this.el.classList.add("settings-item"),
        this.textEl = document.createElement("div"),
        this.el.appendChild(this.textEl),
        this.textEl.textContent = e,
        this.textEl.classList.add("settings-item-text"),
        this.onValueChangeCbs = new Set,
        "slider" == this.type) {
            const e = document.createElement("div");
            e.classList.add("settings-item-slider"),
            this.el.appendChild(e),
            this.sliderEl = document.createElement("input"),
            this.sliderEl.classList.add("dialog-range-input"),
            e.appendChild(this.sliderEl),
            this.sliderEl.type = "range",
            this.sliderEl.min = String(t.min),
            this.sliderEl.max = String(t.max),
            this.sliderEl.step = String(t.step || 1),
            this.valueEl = document.createElement("div"),
            this.valueEl.classList.add("settings-item-slider-value"),
            e.appendChild(this.valueEl),
            this.valueEl.textContent = this.sliderEl.value;
            const i = t.triggerOnChange || !1
              , s = this.valueEl
              , n = this.sliderEl
              , a = ()=>{
                const t = Number(n.value);
                this.onValueChangeCbs.forEach((e=>e(t)))
            }
            ;
            i && this.sliderEl.addEventListener("change", a),
            this.sliderEl.addEventListener("input", (()=>{
                s.textContent = n.value,
                i || a()
            }
            ))
        } else if ("toggle" == this.type) {
            this.toggleEl = document.createElement("input"),
            this.toggleEl.type = "checkbox",
            this.toggleEl.classList.add("dialog-checkbox-input", "wrinkledPaper"),
            this.el.appendChild(this.toggleEl);
            const t = this.toggleEl;
            this.toggleEl.addEventListener("input", (()=>{
                this.onValueChangeCbs.forEach((e=>e(t.checked)))
            }
            ))
        } else if ("enum" == i) {
            const t = document.createElement("div");
            if (t.classList.add("dialog-select-wrapper", "wrinkledPaper"),
            this.el.appendChild(t),
            this.dropdownEl = document.createElement("select"),
            this.dropdownEl.classList.add("dialog-select-input", "blueNight"),
            t.appendChild(this.dropdownEl),
            s)
                for (const [t,e] of Object.entries(s)) {
                    const i = document.createElement("option");
                    i.value = t,
                    i.textContent = e,
                    this.dropdownEl.appendChild(i)
                }
            const e = this.dropdownEl;
            this.dropdownEl.addEventListener("input", (()=>{
                this.onValueChangeCbs.forEach((t=>t(e.value)))
            }
            ))
        } else if ("color" == i) {
            const t = document.createElement("input");
            this.colorEl = t,
            t.classList.add("dialog-color-input", "wrinkledPaper"),
            t.type = "color",
            this.el.appendChild(t),
            t.addEventListener("input", (()=>{
                this.onValueChangeCbs.forEach((e=>e(t.value)))
            }
            ))
        }
    }
    setValue(t) {
        if ("slider" == this.type) {
            if (!this.sliderEl)
                throw new Error("Assertion failed, slider element doesn't exist.");
            if ("number" != typeof t)
                throw new Error("Failed to set value of slider setting item: value is not a number");
            if (this.sliderEl.value = String(t),
            !this.valueEl)
                throw new Error("Assertion failed, value element doesn't exist.");
            this.valueEl.textContent = this.sliderEl.value
        } else if ("toggle" == this.type && "boolean" == typeof t) {
            if (!this.toggleEl)
                throw new Error("Assertion failed, toggle element doesn't exist.");
            this.toggleEl.checked = t
        } else if ("enum" == this.type) {
            if (!this.dropdownEl)
                throw new Error("Assertion failed, dropdown element doesn't exist.");
            if ("string" != typeof t)
                throw new Error("Failed to set value of enum setting item: value is not a string");
            this.dropdownEl.value = t
        } else if ("color" == this.type) {
            if (!this.colorEl)
                throw new Error("Assertion failed, no color element");
            if ("string" != typeof t)
                throw new Error("Assertion failed, color value is not a string");
            this.colorEl.value = t
        }
    }
    onValueChange(t) {
        this.onValueChangeCbs.add(t)
    }
    setDisabled(t) {
        this.sliderEl && (this.sliderEl.disabled = t),
        this.toggleEl && (this.toggleEl.disabled = t),
        this.dropdownEl && (this.dropdownEl.disabled = t)
    }
}
class SettingItem extends SettingUiItem {
    constructor(t, e) {
        super(e),
        this.id = t
    }
}
class SettingsDialogUi extends DialogUi {
    constructor(t, e) {
        super(),
        this.settingsManager = t,
        this.dialogManager = e,
        this.titleEl = document.createElement("h2"),
        this.titleEl.classList.add("dialogTitle", "blueNight"),
        this.titleEl.textContent = "Settings",
        this.el.appendChild(this.titleEl);
        const i = [{
            name: "Sound",
            settings: [new SettingItem("sfxVolume",{
                text: "Sound effects volume",
                type: "slider",
                min: 0,
                max: 100
            }), new SettingItem("musicVolume",{
                text: "Music volume",
                type: "slider",
                min: 0,
                max: 100
            }), new SettingItem("sfxDistanceCutoff",{
                text: "Sfx distance cutoff",
                type: "slider",
                min: 0,
                max: 100
            })]
        }, {
            name: "Quality",
            settings: [new SettingItem("quality",{
                text: "Quality",
                type: "slider",
                min: .1,
                max: 3,
                step: .1
            }), new SettingItem("antialias",{
                text: "Anti-Aliasing",
                type: "toggle"
            }), new SettingItem("smoothFiltering",{
                text: "Smooth filtering",
                type: "toggle"
            })]
        }, {
            name: "Controls",
            settings: [new SettingItem("mouseSensitivity",{
                text: "Mouse sensitivity",
                type: "slider",
                min: .1,
                max: 5,
                step: .01
            }), new SettingItem("invertMouseY",{
                text: "Invert vertical mouse",
                type: "toggle"
            }), new SettingItem("mouseAcceleration",{
                text: "Mouse Acceleration",
                type: "toggle"
            }), new SettingItem("autoShoot",{
                text: "Auto shoot",
                type: "toggle"
            })]
        }, {
            name: "Gameplay",
            settings: [new SettingItem("fov",{
                text: "Field of view",
                type: "slider",
                min: 40,
                max: 140
            }), new SettingItem("walkHeadBob",{
                text: "Walk head bob",
                type: "toggle"
            }), new SettingItem("landHeadBob",{
                text: "Land head bob",
                type: "toggle"
            }), new SettingItem("smoothCam",{
                text: "Smooth camera",
                type: "toggle"
            })]
        }, {
            name: "Crosshair",
            settings: [new SettingItem("crosshairStyle",{
                text: "Style",
                type: "enum",
                enumValues: {
                    off: "Off",
                    three: "Tri",
                    four: "Quad",
                    "four-sharp": "Sharp Quad",
                    "three-low": "Horizon",
                    "four-flat": "Whiskers",
                    "three-extra-low": "Soul patch",
                    six: "Wallmart"
                }
            }), new SettingItem("crosshairColor",{
                text: "Color",
                type: "color"
            }), new SettingItem("crosshairOutlineColor",{
                text: "Outline Color",
                type: "color"
            }), new SettingItem("crosshairAccuracyOffset",{
                text: "Accuracy Offset",
                type: "slider",
                min: 0,
                max: 4,
                step: .1
            })]
        }, {
            name: "Interface",
            settings: [new SettingItem("theme",{
                text: "Theme",
                type: "enum",
                enumValues: {
                    system: "Sync with system",
                    light: "Light",
                    dark: "Dark"
                }
            }), new SettingItem("uiScale",{
                text: "UI scale",
                type: "slider",
                step: .1,
                min: .5,
                max: 2,
                triggerOnChange: !0
            }), new SettingItem("chatEnabled",{
                text: "Show chat in squads",
                type: "toggle"
            }), new SettingItem("autoSkipStatsScreen",{
                text: "Auto skip stats screen",
                type: "toggle"
            }), new SettingItem("showStats",{
                text: "Show ping and fps",
                type: "toggle"
            }), new SettingItem("hideUi",{
                text: "Hide in game UI",
                type: "toggle"
            })]
        }]
          , s = document.createElement("div");
        s.classList.add("settings-list"),
        this.el.appendChild(s);
        for (const e of i) {
            const i = document.createElement("div");
            s.appendChild(i);
            const n = document.createElement("h3");
            n.classList.add("settings-group-header"),
            n.textContent = e.name,
            i.appendChild(n);
            for (const s of e.settings) {
                i.appendChild(s.el);
                const e = t.getValue(s.id);
                s.setValue(e),
                s.onValueChange((e=>{
                    t.setValue(s.id, e)
                }
                ))
            }
        }
        this.addButtonsContainer(),
        this.addButton({
            text: "Save",
            onClick: async()=>{
                await this.settingsManager.saveSettings() ? this.close() : this.dialogManager.showAlert({
                    title: "Settings could not be saved.",
                    text: "An error occurred while saving the settings. Are third party cookies disabled?"
                })
            }
        })
    }
}
const classConfigs = [{
    id: "scout",
    uiName: "Scout",
    bowId: "smallBow",
    shopSkeletonLayer: "shootingLoaded",
    bowHandleShopCategories: ["smallBowHandle"],
    bowTipShopCategories: ["smallBowTip"],
    bowShopCamPosition: "smallBow",
    bowHandleShopCamPosition: "smallBowHandle",
    bowTipShopCamPosition: "smallBowTip"
}, {
    id: "assault",
    uiName: "Assault",
    bowId: "mediumBow",
    shopSkeletonLayer: "shootingLoaded",
    bowHandleShopCategories: ["mediumBowHandle"],
    bowTipShopCategories: ["mediumBowTip"],
    bowShopCamPosition: "mediumBow",
    bowHandleShopCamPosition: "mediumBowHandle",
    bowTipShopCamPosition: "mediumBowTip"
}, {
    id: "sharpshooter",
    uiName: "Sharpshooter",
    bowId: "largeBow",
    shopSkeletonLayer: "shootingLoaded",
    bowHandleShopCategories: ["largeBowHandle"],
    bowTipShopCategories: ["largeBowTip"],
    bowShopCamPosition: "largeBow",
    bowHandleShopCamPosition: "largeBowHandle",
    bowTipShopCamPosition: "largeBowTip"
}, {
    id: "runner",
    uiName: "Runner",
    bowId: "smallCrossbow",
    shopSkeletonLayer: "shooting",
    bowHandleShopCategories: ["smallCrossbowHandle"],
    bowTipShopCategories: ["smallCrossbowTip"],
    bowShopCamPosition: "smallCrossbow",
    bowHandleShopCamPosition: "smallCrossbowHandle",
    bowTipShopCamPosition: "smallCrossbowTip"
}, {
    id: "support",
    uiName: "Support",
    bowId: "repeatingCrossbow",
    shopSkeletonLayer: "shootStart",
    bowHandleShopCategories: ["repeatingCrossbowHandle"],
    bowTipShopCategories: ["repeatingCrossbowTip"],
    bowShopCamPosition: "largeCrossbow",
    bowHandleShopCamPosition: "largeCrossbowHandle",
    bowTipShopCamPosition: "largeCrossbowTip"
}, {
    id: "defender",
    uiName: "Defender",
    bowId: "largeCrossbow",
    shopSkeletonLayer: "shooting",
    bowHandleShopCategories: ["largeCrossbowHandle"],
    bowTipShopCategories: ["largeCrossbowTip"],
    bowShopCamPosition: "largeCrossbow",
    bowHandleShopCamPosition: "largeCrossbowHandle",
    bowTipShopCamPosition: "largeCrossbowTip"
}]
  , classConfigsById = new Map;
for (const t of classConfigs)
    classConfigsById.set(t.id, t);
function getClassConfigById(t) {
    const e = classConfigsById.get(t);
    if (!e)
        throw new Error(`No weapon config for class ${t}`);
    return e
}
class AssetPackageLoader {
    constructor(t) {
        this.isDownloading = !1,
        this.loaded = !1,
        this.url = t,
        this.arrayBuffer = null,
        this.fileLocations = [],
        this.onLoadCbs = [],
        this.onProgressCbs = [],
        this.lastProgressValue = 0,
        this.textureCache = {}
    }
    async startDownloading() {
        if (this.loaded)
            return;
        if (this.isDownloading)
            return await this.waitForLoad();
        this.isDownloading = !0;
        const t = await requestWithProgress(this.url, (t=>{
            for (const e of this.onProgressCbs)
                e(t);
            this.lastProgressValue = t
        }
        ));
        this.arrayBuffer = await new Response(t).arrayBuffer(),
        this.parseFilePositions(this.arrayBuffer),
        this.loaded = !0;
        for (const t of this.onLoadCbs)
            t();
        this.onLoadCbs = [],
        this.onProgressCbs = [],
        this.isDownloading = !1
    }
    parseFilePositions(t) {
        let e = 0;
        for (; e < t.byteLength; ) {
            let i = new Uint32Array(t,e,1)[0];
            const s = new Uint8Array(t,e + 4,i)
              , n = new TextDecoder("utf-8").decode(s);
            i % 4 != 0 && (i = 4 * Math.ceil(i / 4));
            let a = new Uint32Array(t,e + 4 + i,1)[0];
            this.fileLocations.push({
                path: n,
                start: e + 4 + i + 4,
                length: a
            }),
            a % 4 != 0 && (a = 4 * Math.ceil(a / 4)),
            e += 4 + i + 4 + a
        }
    }
    onLoad(t) {
        this.loaded ? t() : this.onLoadCbs.push(t)
    }
    onProgress(t) {
        this.loaded ? t(1) : this.onProgressCbs.push(t)
    }
    async waitForLoad() {
        if (this.loaded)
            return;
        const t = new Promise(((t,e)=>{
            this.onLoad((()=>{
                t()
            }
            ))
        }
        ));
        await t
    }
    async hasFile(t) {
        return this.loaded || await this.waitForLoad(),
        this.fileLocations.some((e=>e.path == t))
    }
    async getFileAsBuffer(t) {
        if (this.loaded || await this.waitForLoad(),
        !this.arrayBuffer)
            throw new Error("Assertion failed, arrayBuffer not loaded");
        for (const e of this.fileLocations)
            if (e.path == t)
                return this.arrayBuffer.slice(e.start, e.start + e.length);
        throw new Error(`Trying to load asset at ${t} but it doesn't exist!`)
    }
    async getAsObjectUrl(t, e) {
        const i = await this.getFileAsBuffer(t);
        if (!i)
            return null;
        const s = new Blob([new Uint8Array(i)],{
            type: e
        });
        return URL.createObjectURL(s)
    }
    async getAsSvg(t) {
        return await this.getAsObjectUrl(t, "image/svg+xml")
    }
    async getAsText(t) {
        const e = await this.getFileAsBuffer(t)
          , i = new Uint8Array(e);
        return new TextDecoder("utf-8").decode(i)
    }
    async getAsJSON(t) {
        const e = await this.getAsText(t);
        return JSON.parse(e)
    }
    async blobToArrayBuffer(t) {
        return await new Response(t).arrayBuffer()
    }
}
const messengerResponseHandlers = {
    mapCached(t) {
        getMainInstance().mapLoader.markMapAsCached(t)
    },
    reportMapLoadProgress(t, e) {
        getMainInstance().mapLoader.reportMapLoadProgress(t, e)
    },
    firstMapDownloaded() {
        getMainInstance().mapLoader.reportFirstMapDownloaded()
    },
    mapGameplayObjects(t, e) {
        getMainInstance().mapLoader.setGamplayObjects(t, e)
    }
};
class AssetsManager {
    constructor() {
        const t = ["main"];
        this.onPackageAddCbs = [],
        this.packages = {};
        for (const e of t)
            this.addPackage(e);
        this.lastWorkerRequestId = 0,
        this.onWorkerMessageCbs = new Map,
        this.onWorkerErrorCbs = new Map,
        this.messenger = new TypedMessenger({
            deserializeErrorHook(t) {
                const e = t;
                return e.isAggregateError ? new AggregateError(e.errors,e.message) : e.isMapLoadError ? new MapLoadError(e.message,e.name) : t
            }
        }),
        this.workerPromise = this.loadWorker(),
        this.abortSignalIds = new WeakMap,
        this.lastAbortSignalId = 0
    }
    async loadWorker() {
        const {worker: t} = await import("./assetWorkerPreload-ceea6c02.js");
        this.messenger.initialize(t, messengerResponseHandlers),
        t.addEventListener("error", (t=>{
            throw console.error("error occurred while initializing asset loader worker"),
            t
        }
        ));
        const e = new URL(".",location.href).href;
        return this.messenger.send.setBasePath(e),
        t
    }
    async getMessenger() {
        return await this.workerPromise,
        this.messenger
    }
    async registerAbortSignal(t) {
        await this.workerPromise;
        let e = this.abortSignalIds.get(t);
        void 0 === e && (e = this.lastAbortSignalId++,
        this.abortSignalIds.set(t, e));
        const i = e;
        return t.addEventListener("abort", (()=>{
            this.messenger.send.signalAborted(i)
        }
        )),
        {
            abortSignalId: e,
            messenger: this.messenger,
            unregister: ()=>{
                this.messenger.send.removeAbortSignal(i)
            }
        }
    }
    addPackage(t, {waitForOtherPackages: e=null, expectedOtherPackageCount: i=1, manualDownload: s=!1}={}) {
        let n = null;
        if (t in this.packages)
            n = this.packages[t];
        else {
            n = new AssetPackageLoader("assetPackages" + "/" + t + ".bin?v=1685095066"),
            this.packages[t] = n;
            for (const t of this.onPackageAddCbs)
                t();
            this.onPackageAddCbs = []
        }
        return s || this.waitAndDownloadPack(n, e, i),
        n
    }
    async waitAndDownloadPack(t, e, i) {
        if (e)
            for (; ; ) {
                const s = [];
                for (const [i,n] of Object.entries(this.packages))
                    for (const a of e)
                        i.startsWith(a) && n != t && s.push(n);
                if (!(s.length < i)) {
                    for (const t of s)
                        await t.waitForLoad();
                    break
                }
                await this.waitForPackageAdd()
            }
        t.startDownloading()
    }
    async waitForPackageAdd() {
        const t = new Promise((t=>this.onPackageAddCbs.push(t)));
        await t
    }
    getPackage(t) {
        return this.packages[t]
    }
    async getPackageAsync(t) {
        for (; ; ) {
            const e = this.packages[t];
            if (e)
                return e;
            await this.waitForPackageAdd()
        }
    }
    onWorkerMessage(t, e, i=!1) {
        let s = this.onWorkerMessageCbs.get(t);
        s || (s = new Set,
        this.onWorkerMessageCbs.set(t, s)),
        s.add({
            cb: e,
            endOnly: i
        })
    }
    onWorkerError(t, e) {
        let i = this.onWorkerErrorCbs.get(t);
        i || (i = new Set,
        this.onWorkerErrorCbs.set(t, i)),
        i.add(e)
    }
    static deserializeThreeObject(t) {
        if (!t)
            return null;
        const e = [];
        for (const i of t.geometries) {
            const t = new BufferGeometry;
            for (const e of i.attributes)
                t.setAttribute(e.name, new BufferAttribute(e.array,e.itemSize,e.normalized));
            i.index && t.setIndex(new BufferAttribute(i.index.array,1));
            for (const {start: e, count: s, materialIndex: n} of i.groups)
                t.addGroup(e, s, n);
            e.push(t)
        }
        const i = this.deserializeThreeObjectRecursive(t.object, e);
        return i.updateWorldMatrix(!1, !0),
        i
    }
    static deserializeThreeObjectRecursive(t, e) {
        let i = null;
        const s = getMainInstance().materials;
        if (null != t.geo && t.geo >= 0) {
            let n = null;
            if (Array.isArray(t.material)) {
                n = [];
                for (const e of t.material) {
                    const t = s.getMaterialByName(e);
                    t && n.push(t)
                }
            } else
                t.material && (n = getMainInstance().materials.getMaterialByName(t.material) || null);
            n && (i = new Mesh(e[t.geo],n))
        }
        i || (i = new Object3D),
        i.name = t.name;
        const n = (new Matrix4).fromArray(t.matrix);
        i.applyMatrix4(n);
        for (const s of t.children) {
            const t = this.deserializeThreeObjectRecursive(s, e);
            i.add(t)
        }
        return i
    }
    async loadGlbViaWorker(t, {packageName: e="main", teamId: i=0, keepCustomProperties: s=[], merge: n=!0, signal: a=null}={}) {
        const o = await getMainInstance().assets.getPackage(e).getFileAsBuffer(t);
        if (!a) {
            a = (new AbortController).signal
        }
        const {messenger: r, abortSignalId: l, unregister: h} = await this.registerAbortSignal(a)
          , d = await r.send.loadGlbAsset({
            glbBuffer: o,
            teamId: i,
            keepCustomProperties: s,
            merge: n,
            abortSignalId: l
        });
        return h(),
        AssetsManager.deserializeThreeObject(d)
    }
}
const baseSkins = ["base", "baseClothes", "baseEyes"]
  , genders = ["male", "female"]
  , hairColors = [{
    cssColor: "#fff6ed",
    skinColor: [1, 1, 1]
}, {
    cssColor: "#c05f18",
    skinColor: [.45, .15, 0]
}, {
    cssColor: "#362c29",
    skinColor: [.04, .03, .025]
}, {
    cssColor: "#794b32",
    skinColor: [.15, .08, .05]
}, {
    cssColor: "#feed9a",
    skinColor: [.95, .83, .4]
}];
function parseSkinDataString(t) {
    let e;
    try {
        e = JSON.parse(t)
    } catch {
        e = {}
    }
    return sanitizeSkinData(e)
}
function sanitizeSkinData(t=null) {
    if ("object" != typeof t || Array.isArray(t) || null == t)
        return {
            equippedSkinIds: [],
            hairColorMultiplier: [1, 1, 1],
            eyebrowColorMultiplier: [1, 1, 1],
            beardColorMultiplier: [1, 1, 1]
        };
    t.equippedSkinIds && Array.isArray(t.equippedSkinIds) || (t.equippedSkinIds = []);
    for (const [e,i] of t.equippedSkinIds.entries())
        "string" != typeof i && (t.equippedSkinIds[e] = "");
    return t.equippedSkinIds = t.equippedSkinIds.filter((t=>"" != t)),
    t.hairColorMultiplier && (t.hairColorMultiplier = sanitizeSkinColorMultiplier(t.hairColorMultiplier)),
    t.eyebrowColorMultiplier && (t.eyebrowColorMultiplier = sanitizeSkinColorMultiplier(t.eyebrowColorMultiplier)),
    t.beardColorMultiplier && (t.beardColorMultiplier = sanitizeSkinColorMultiplier(t.beardColorMultiplier)),
    t
}
function sanitizeSkinColorMultiplier(t) {
    if (!Array.isArray(t))
        return [1, 1, 1];
    if (3 != t.length)
        return [1, 1, 1];
    for (const e of t.keys())
        "number" != typeof t[e] && (t[e] = 1),
        t[e] = clamp01(t[e]),
        isNaN(t[e]) && (t[e] = 1);
    return t
}
class SkinManager {
    constructor() {
        this.purchasableItems = new Map,
        this.defaultSkinPresets = [],
        this.skinPresets = [],
        this.classSkins = {},
        this.onSkinConfigChangeCbs = new Set
    }
    init() {
        this.initBaseSkins(),
        getMainInstance().config.shopConfig.onConfigChange((async t=>{
            for (const e of t.purchasableItems)
                if (this.purchasableItems.set(e.id, e),
                !e.slots || !Array.isArray(e.slots)) {
                    if (e.slots = [],
                    e.maleSkin) {
                        if (e.maleSkin.additions)
                            for (const t of Object.keys(e.maleSkin.additions))
                                e.slots.push(t);
                        if (e.maleSkin.removals)
                            for (const t of Object.keys(e.maleSkin.removals))
                                e.slots.push(t)
                    }
                    if (e.femaleSkin) {
                        if (e.femaleSkin.additions)
                            for (const t of Object.keys(e.femaleSkin.additions))
                                e.slots.push(t);
                        if (e.femaleSkin.removals)
                            for (const t of Object.keys(e.femaleSkin.removals))
                                e.slots.push(t)
                    }
                }
            this.defaultSkinPresets = t.skinPresets || [];
            const e = await this.loadSkinPreference("skinPresets");
            e && (this.skinPresets = e);
            const i = await this.loadSkinPreference("classSkins");
            i && (this.classSkins = i),
            0 == this.skinPresets.length && this.addPreset({
                fireConfigChanged: !1
            }),
            this.fireConfigChanged()
        }
        ))
    }
    async loadSkinPreference(t) {
        let e = null;
        try {
            e = await getMainInstance().indexedDb.get(t)
        } catch (t) {}
        return e
    }
    async loadSkinIdsPreference(t) {
        const e = await this.loadSkinPreference(t);
        let i = new Set;
        if (e && "string" == typeof e) {
            const t = e.split(",");
            i = new Set(t)
        }
        return i
    }
    async initBaseSkins() {
        const t = []
          , e = [];
        for (const t of genders)
            for (const i of baseSkins)
                e.push(`baseSkins/${t}/${i}.glb`);
        for (const {bowId: t} of classConfigs)
            e.push(`bows/${t}.glb`);
        e.push("baseSkins/arrow.glb");
        const i = {};
        for (const s of e) {
            const e = (async()=>{
                i[s] = await getMainInstance().assets.getPackage("main").getFileAsBuffer(s)
            }
            )();
            t.push(e)
        }
        await Promise.all(t);
        const s = await getMainInstance().assets.getMessenger();
        await s.send.setBaseSkinBuffers(i)
    }
    skinObjectOptsToCacheKey(t) {
        const e = [];
        e.push(t.teamId),
        t.teamColor ? (e.push(t.teamColor.r),
        e.push(t.teamColor.g),
        e.push(t.teamColor.b)) : e.push("teamColorEmpty"),
        e.push("skinstart");
        const i = t.skin.equippedSkinIds || [];
        e.push(i.join("|")),
        e.push("skinend"),
        e.push(t.skin.gender || "male");
        const s = t.skin.hairColorMultiplier || [1, 1, 1];
        e.push("hairColor" + s.join(","));
        const n = t.skin.eyebrowColorMultiplier || [1, 1, 1];
        e.push("eyebrowColor" + n.join(","));
        const a = t.skin.beardColorMultiplier || [1, 1, 1];
        return e.push("beardColor" + a.join(",")),
        e.join("-")
    }
    async getSkinObject(t, e) {
        let i, s = !1;
        t.rawSkin ? (i = t.rawSkin,
        s = !0) : i = this.skinNetworkDataToSkinConfig(t.skin);
        let n = null;
        const a = []
          , {messenger: o, abortSignalId: r, unregister: l} = await getMainInstance().assets.registerAbortSignal(e);
        try {
            try {
                n = await o.send.buildSkin({
                    skin: i,
                    teamId: t.teamId,
                    teamColor: t.teamColor,
                    allowNetworkErrors: s,
                    abortSignalId: r
                })
            } catch (t) {
                if (t instanceof DOMException && "AbortError" == t.name)
                    throw t;
                a.push(t)
            }
            if (e.aborted)
                throw new DOMException("Request aborted by signal.","AbortError");
            if (!n && !s) {
                const e = this.skinNetworkDataToSkinConfig({
                    gender: t.skin.gender
                });
                try {
                    n = await o.send.buildSkin({
                        skin: e,
                        teamId: t.teamId,
                        teamColor: t.teamColor,
                        allowNetworkErrors: !1,
                        abortSignalId: r
                    })
                } catch (t) {
                    if (t instanceof DOMException && "AbortError" == t.name)
                        throw t;
                    throw a.push(t),
                    new AggregateError(a)
                }
            }
        } finally {
            l()
        }
        if (!n)
            return null;
        return AssetsManager.deserializeThreeObject(n)
    }
    async getBowObject(t, e) {
        const {messenger: i, abortSignalId: s, unregister: n} = await getMainInstance().assets.registerAbortSignal(e)
          , a = await i.send.buildBow({
            ...t,
            abortSignalId: s
        });
        return n(),
        {
            bow: AssetsManager.deserializeThreeObject(a.bow),
            arrowPointIdleMatrix: (new Matrix4).fromArray(a.arrowPointIdleMatrix),
            arrowPointLoadedMatrix: (new Matrix4).fromArray(a.arrowPointLoadedMatrix)
        }
    }
    async buildConfigObject(t, e) {
        const {messenger: i, abortSignalId: s, unregister: n} = await getMainInstance().assets.registerAbortSignal(e)
          , a = await i.send.buildConfigObject({
            ...t,
            abortSignalId: s
        });
        return n(),
        {
            asset: AssetsManager.deserializeThreeObject(a.asset)
        }
    }
    addShopItemToSkinData(t, e) {
        const i = new Set(e.equippedSkinIds)
          , s = this.addItemAndRemoveDuplicateSlots(i, t);
        return e.equippedSkinIds = Array.from(i),
        s
    }
    removeShopItemFromSkinData(t, e) {
        const i = new Set(e.equippedSkinIds);
        i.delete(t),
        e.equippedSkinIds = Array.from(i)
    }
    addPreset({fireConfigChanged: t=!0}={}) {
        let e = randFromArray(this.defaultSkinPresets);
        e || (e = {});
        const i = e.equippedSkinIds || []
          , s = {
            gender: e.gender || "male",
            equippedSkinIds: [...i]
        };
        e.hairColorMultiplier && (s.hairColorMultiplier = [...e.hairColorMultiplier]),
        e.eyebrowColorMultiplier && (s.eyebrowColorMultiplier = [...e.eyebrowColorMultiplier]),
        e.beardColorMultiplier && (s.beardColorMultiplier = [...e.beardColorMultiplier]),
        this.skinPresets.push(s),
        this.savePresets(),
        t && this.fireConfigChanged()
    }
    deletePreset(t) {
        if (t < 0 || t >= this.skinPresets.length)
            throw new Error("Invalid preset index");
        this.skinPresets.splice(t, 1);
        for (const e of Object.values(this.classSkins))
            null != e.presetId && (e.presetId == t ? delete e.presetId : e.presetId > t && e.presetId--);
        this.savePresets(),
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    getPreset(t, e=!0) {
        const i = this.skinPresets[t];
        if (!i) {
            if (e)
                throw new Error(`Preset ${t} does not exist`);
            return {}
        }
        return i
    }
    addShopItemToPreset(t, e) {
        const i = this.getPreset(e)
          , s = this.addShopItemToSkinData(t, i);
        return this.savePresets(),
        this.fireConfigChanged(),
        s
    }
    removeShopItemFromPreset(t, e) {
        const i = this.getPreset(e);
        if (!i)
            throw new Error(`Preset with id ${e} does not exist`);
        this.removeShopItemFromSkinData(t, i),
        this.savePresets(),
        this.fireConfigChanged()
    }
    setPresetGender(t, e) {
        this.getPreset(t).gender = e,
        this.savePresets(),
        this.fireConfigChanged()
    }
    setPresetSkinItemColor(t, e, i) {
        const s = this.getPreset(t);
        "hair" == e ? s.hairColorMultiplier = i : "eyebrows" == e ? s.eyebrowColorMultiplier = i : "beard" == e && (s.beardColorMultiplier = i),
        this.savePresets(),
        this.fireConfigChanged()
    }
    async savePresets() {
        try {
            await getMainInstance().indexedDb.set("skinPresets", this.skinPresets)
        } catch {}
    }
    getClassSkinData(t, e) {
        let i = this.classSkins[t];
        return i || (i = {},
        this.skinPresets.length > 0 && (i.presetId = 0),
        e && (this.classSkins[t] = i)),
        i
    }
    getClassSkinDataWithAppliedPreset(t) {
        const e = this.getClassSkinData(t, !1);
        let i;
        i = null != e.presetId ? this.getPreset(e.presetId, !1) : {};
        const s = new Set(i.equippedSkinIds);
        if (e.equippedSkinIds)
            for (const t of e.equippedSkinIds)
                this.addItemAndRemoveDuplicateSlots(s, t);
        if (e.unequippedSkinIds)
            for (const t of e.unequippedSkinIds)
                s.delete(t);
        return {
            gender: e.gender || i.gender,
            equippedSkinIds: Array.from(s),
            hairColorMultiplier: e.hairColorMultiplier || i.hairColorMultiplier,
            eyebrowColorMultiplier: e.eyebrowColorMultiplier || i.eyebrowColorMultiplier,
            beardColorMultiplier: e.beardColorMultiplier || i.beardColorMultiplier
        }
    }
    setClassPreset(t, e) {
        const i = this.getClassSkinData(t, !0);
        delete i.equippedSkinIds,
        delete i.unequippedSkinIds,
        delete i.gender,
        delete i.hairColorMultiplier,
        delete i.eyebrowColorMultiplier,
        delete i.beardColorMultiplier,
        null == e ? delete i.presetId : i.presetId = e,
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    addShopItemToClass(t, e) {
        const i = this.getClassSkinData(e, !0)
          , s = new Set(i.unequippedSkinIds);
        s.delete(t),
        0 == s.size ? delete i.unequippedSkinIds : i.unequippedSkinIds = Array.from(s);
        let n = !1;
        if (null != i.presetId) {
            const e = this.getPreset(i.presetId, !1);
            e.equippedSkinIds && e.equippedSkinIds.includes(t) && (n = !0)
        }
        this.addShopItemToSkinData(t, i),
        n && this.removeShopItemFromSkinData(t, i),
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    removeShopItemFromClass(t, e) {
        const i = this.getClassSkinData(e, !0);
        let s = !1;
        if (null != i.presetId) {
            const e = this.getPreset(i.presetId, !1);
            e.equippedSkinIds && e.equippedSkinIds.includes(t) && (s = !0)
        }
        if (this.removeShopItemFromSkinData(t, i),
        s) {
            const e = new Set(i.unequippedSkinIds);
            e.add(t),
            i.unequippedSkinIds = Array.from(e)
        }
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    setClassGender(t, e) {
        const i = this.getClassSkinData(t, !0);
        let s = "male";
        if (null != i.presetId) {
            s = this.getPreset(i.presetId, !1).gender || "male"
        }
        e == s ? delete i.gender : i.gender = e,
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    setClassSkinItemColor(t, e, i) {
        const s = this.getClassSkinData(t, !0);
        let n = null;
        null != s.presetId && (n = this.getPreset(s.presetId, !1));
        const a = n;
        function o(t) {
            s[t] = i;
            let e = [1, 1, 1];
            if (a) {
                const i = a[t];
                i && (e = i)
            }
            Math.abs(i[0] - e[0]) < .01 && Math.abs(i[1] - e[1]) < .01 && Math.abs(i[2] - e[2]) < .01 && delete s[t]
        }
        "hair" == e ? o("hairColorMultiplier") : "eyebrows" == e ? o("eyebrowColorMultiplier") : "beard" == e && o("beardColorMultiplier"),
        this.saveClassSkins(),
        this.fireConfigChanged()
    }
    saveClassSkins() {
        try {
            getMainInstance().indexedDb.set("classSkins", this.classSkins)
        } catch {}
    }
    fireConfigChanged() {
        for (const t of this.onSkinConfigChangeCbs)
            t()
    }
    addItemAndRemoveDuplicateSlots(t, e) {
        const i = new Set
          , s = this.purchasableItems.get(e);
        if (s && (e && t.add(e),
        s.slots))
            for (const n of s.slots)
                for (const s of t) {
                    if (s == e)
                        continue;
                    const a = this.purchasableItems.get(s);
                    a && a.slots && a.slots.includes(n) && (t.delete(s),
                    i.add(s))
                }
        return i
    }
    getStatClassValuesFromShopSkinIds(t) {
        const e = new Map;
        for (const i of t) {
            const t = this.purchasableItems.get(i);
            if (t && t.statClasses)
                for (const [i,s] of Object.entries(t.statClasses)) {
                    let t = e.get(i);
                    t || (t = 0),
                    t += s,
                    e.set(i, t)
                }
        }
        return e
    }
    skinNetworkDataToSkinConfig(t) {
        const e = t.gender || "male"
          , i = new Map;
        for (const t of processedSkinNames) {
            let s = i.get(t);
            s || (s = new Set,
            i.set(t, s));
            for (const t of baseSkins)
                s.add(`${e}/${t}`)
        }
        const s = [];
        if (t.equippedSkinIds) {
            for (const n of t.equippedSkinIds) {
                const a = this.purchasableItems.get(n);
                if (!a)
                    continue;
                const o = this.getSkinFromShopItem(a, e);
                if (o && o.additions)
                    for (const [e,n] of Object.entries(o.additions)) {
                        const o = e;
                        if (n && Array.isArray(n)) {
                            let e = i.get(o);
                            e || (e = new Set,
                            i.set(o, e));
                            for (const i of n)
                                if (e.add(i),
                                a.colorizableCategory) {
                                    let e;
                                    "hair" == a.colorizableCategory ? e = t.hairColorMultiplier : "eyebrows" == a.colorizableCategory ? e = t.eyebrowColorMultiplier : "beard" == a.colorizableCategory && (e = t.beardColorMultiplier),
                                    e && s.push({
                                        assetName: i,
                                        colorMultiplier: e,
                                        joints: [o]
                                    })
                                }
                        }
                    }
            }
            for (const s of t.equippedSkinIds) {
                const t = this.purchasableItems.get(s);
                if (!t)
                    continue;
                const n = this.getSkinFromShopItem(t, e);
                if (n && n.removals)
                    for (const [t,s] of Object.entries(n.removals)) {
                        const n = t;
                        if (s && Array.isArray(s)) {
                            const t = i.get(n);
                            if (t)
                                for (const i of s)
                                    baseSkins.includes(i) ? t.delete(`${e}/${i}`) : t.delete(i)
                        }
                    }
            }
            for (const s of t.equippedSkinIds) {
                const t = this.purchasableItems.get(s);
                if (!t)
                    continue;
                const n = this.getSkinFromShopItem(t, e);
                if (n && n.replaceAssets)
                    for (const t of n.replaceAssets)
                        for (const s of i.values()) {
                            const i = [t.asset, `${e}/${t.asset}`];
                            for (const e of i)
                                s.has(e) && (s.delete(e),
                                s.add(t.replaceWith))
                        }
            }
        }
        const n = {};
        for (const [t,e] of i) {
            const i = Array.from(e);
            i.length > 0 && (n[t] = i)
        }
        return {
            equippedItems: n,
            colorizedItems: s
        }
    }
    skinNetworkDataToBowAssetData(t, e) {
        const i = new Set;
        if (e.equippedSkinIds)
            for (const s of e.equippedSkinIds) {
                const e = this.purchasableItems.get(s);
                if (e && e.bowSkin) {
                    if (t && e.bowSkin.bowId != t)
                        continue;
                    for (const t of e.bowSkin.skins)
                        i.add(t)
                }
            }
        return {
            skins: Array.from(i),
            arrowSkin: this.skinNetworkDataToArrowSkinConfig(e)
        }
    }
    skinNetworkDataToMeleeSkinConfig(t) {
        if (t.equippedSkinIds) {
            const e = [];
            for (const i of t.equippedSkinIds) {
                const t = this.purchasableItems.get(i);
                t && (t.meleeSkin && e.push(t.meleeSkin))
            }
            if (1 == e.length)
                return e[0]
        }
        return null
    }
    skinNetworkDataToArrowSkinConfig(t) {
        if (t.equippedSkinIds) {
            const e = [];
            for (const i of t.equippedSkinIds) {
                const t = this.purchasableItems.get(i);
                t && (t.arrowSkin && e.push(t.arrowSkin))
            }
            if (1 == e.length)
                return e[0]
        }
        return "baseSkins/arrow.glb"
    }
    getSkinFromShopItem(t, e) {
        let i;
        return "male" == e ? i = t.maleSkin : "female" == e && (i = t.femaleSkin),
        i || null
    }
    getConfigForPreviewShopItemId(t, {itemId: e, colorCategory: i, colorMultiplier: s}) {
        const n = new Set(t.equippedSkinIds);
        e && this.addItemAndRemoveDuplicateSlots(n, e);
        const a = {
            gender: t.gender,
            equippedSkinIds: Array.from(n),
            beardColorMultiplier: t.beardColorMultiplier,
            hairColorMultiplier: t.hairColorMultiplier,
            eyebrowColorMultiplier: t.eyebrowColorMultiplier
        };
        return i && s && ("hair" == i ? a.hairColorMultiplier = s : "eyebrows" == i ? a.eyebrowColorMultiplier = s : "beard" == i && (a.beardColorMultiplier = s)),
        a
    }
    onSkinConfigChange(t) {
        this.onSkinConfigChangeCbs.add(t)
    }
    removeOnSkinConfigChange(t) {
        this.onSkinConfigChangeCbs.delete(t)
    }
}
class PagedView {
    constructor({extraClasses: t=[]}={}) {
        this.el = document.createElement("div"),
        this.el.classList.add("paged-view-container", ...t),
        this.createdPageEls = [],
        this.rootStructure = null
    }
    setActiveStructure(t) {
        this.rootStructure = t,
        this.createAndPushPage(t)
    }
    createAndPushPage(t) {
        const e = document.createElement("div");
        if (e.classList.add("paged-view-page"),
        t.headerVisible || void 0 === t.headerVisible) {
            const i = document.createElement("div");
            i.classList.add("paged-view-page-header", "blueNight"),
            e.appendChild(i);
            const s = document.createElement("div");
            s.classList.add("paged-view-page-header-line", "wrinkledLine"),
            e.appendChild(s);
            const n = t == this.rootStructure;
            if (!n || t.onBackButtonClick) {
                const e = new UiButton({
                    ariaLabel: "Back",
                    isIconButton: !0,
                    icon: "static/img/arrow.svg",
                    extraClasses: ["header-button", "header-back-button"],
                    onClick: ()=>{
                        t.onBackButtonClick && t.onBackButtonClick(),
                        n || this.popPage()
                    }
                });
                i.appendChild(e.el)
            }
            const a = document.createElement("h2");
            if (a.classList.add("paged-view-page-header-title"),
            a.textContent = t.header || t.itemName || "",
            i.appendChild(a),
            t.rightCorner) {
                const e = document.createElement("div");
                e.classList.add("paged-view-page-header-corner"),
                i.appendChild(e),
                t.rightCorner(e)
            }
        }
        if (t.subPages && t.customSubPage)
            throw new Error("Structures cannot have both subPages and customSubPage");
        if (t.customSubPageDestroyed && !t.customSubPage)
            throw new Error("customSubPageDestroyed is only supported when customSubPage is also provided");
        let i = null;
        const s = [];
        if (t.subPages) {
            const i = document.createElement("div");
            i.classList.add("paged-view-page-items-list"),
            e.appendChild(i);
            for (const e of t.subPages || []) {
                const t = new UiButton({
                    icon: e.buttonIcon,
                    iconSize: e.buttonIconSize
                });
                t.setText(e.itemName || ""),
                t.onClick((()=>{
                    this.createAndPushPage(e)
                }
                )),
                i.appendChild(t.el),
                s.push({
                    button: t,
                    structure: e
                })
            }
        } else
            t.customSubPage && (i = document.createElement("div"),
            i.classList.add("paged-view-page-custom-subpage"),
            e.appendChild(i),
            t.customSubPage(i));
        this.el.appendChild(e),
        this.createdPageEls.push({
            el: e,
            structure: t,
            visible: !1,
            customSubPageEl: i,
            createdButtons: s
        }),
        e.classList.add("hiddenright", "hidden"),
        e.style.transition = "none",
        e.offsetWidth,
        e.style.transition = "",
        this.updatePageVisibilities(),
        this.updateButtonVisibilies()
    }
    popPage() {
        const t = this.createdPageEls.pop();
        t && (t.el.classList.add("hiddenright"),
        t.el.classList.add("hidden"),
        setTimeout((()=>{
            this.el.removeChild(t.el);
            const e = t.structure;
            t.customSubPageEl && e.customSubPageDestroyed && e.customSubPageDestroyed(t.customSubPageEl)
        }
        ), 1e3)),
        this.updatePageVisibilities()
    }
    updateButtonVisibilies() {
        const t = this.createdPageEls[this.createdPageEls.length - 1];
        if (t)
            for (const {button: e, structure: i} of t.createdButtons) {
                let t = !0;
                i.buttonVisible && !i.buttonVisible() && (t = !1),
                e.el.style.display = t ? "" : "none"
            }
    }
    jumpToSubPage(t) {
        if (!this.rootStructure)
            throw new Error("Failed to jump to subpage, no root structure set");
        const e = function t(e, i) {
            if (e === i)
                return [i];
            if (!i.subPages)
                return null;
            for (const s of i.subPages) {
                const n = t(e, s);
                if (n)
                    return [i, ...n]
            }
            return null
        }(t, this.rootStructure);
        if (!e)
            throw new Error("Failed to jump to subpage, structure not found in the current root structure");
        const i = e.slice(1);
        for (; this.createdPageEls.length > 1; )
            this.popPage();
        for (const t of i)
            this.createAndPushPage(t)
    }
    updatePageVisibilities() {
        for (let t = 0; t < this.createdPageEls.length; t++) {
            const e = this.createdPageEls[t]
              , i = e.visible
              , s = t >= this.createdPageEls.length - 1
              , n = e.el;
            if (n.classList.toggle("hiddenleft", !s),
            n.classList.toggle("hidden", !s),
            n.inert = !s,
            n.classList.remove("hiddenright"),
            i != s) {
                const t = e.structure;
                s && t.onBecomeVisible && t.onBecomeVisible()
            }
        }
    }
}
class PlayerSkeletonLayer {
    constructor(t, e) {
        this.skeletonPath = t,
        this.skeletonObject = null,
        this.onSkeletonLoadCbs = new Set,
        this.onObjectLinksBuilt = new Set,
        this._currentGender = e,
        this.weight = 1,
        this.currentlyLoadingPoseAbortController = null,
        this.objectLinksBuilt = !1,
        this.objectLinks = [],
        this.reloadPose()
    }
    setGender(t) {
        this._currentGender = t,
        this.reloadPose()
    }
    async reloadPose() {
        if (this.currentlyLoadingPoseAbortController) {
            this.currentlyLoadingPoseAbortController.abort(),
            this.currentlyLoadingPoseAbortController = null;
            const t = new DOMException("Request aborted by signal.","AbortError");
            for (const {reject: e} of this.onSkeletonLoadCbs)
                e(t);
            this.onSkeletonLoadCbs.clear()
        }
        this.objectLinksBuilt = !1,
        this.skeletonObject = null;
        const t = `${this._currentGender}/${this.skeletonPath}`
          , e = new AbortController;
        this.currentlyLoadingPoseAbortController = e;
        let i = null;
        try {
            this.skeletonObject = await getMainInstance().skeletons.getSkeleton(t, {
                signal: this.currentlyLoadingPoseAbortController.signal
            })
        } catch (t) {
            t instanceof DOMException && t.name,
            i = t
        }
        if (i || this.skeletonObject || (i = new Error("Failed to load skeleton, result is null")),
        i) {
            for (const {reject: t} of this.onSkeletonLoadCbs)
                t(i);
            this.onSkeletonLoadCbs.clear()
        } else if (!e.signal.aborted) {
            for (const {resolve: t} of this.onSkeletonLoadCbs)
                t();
            this.onSkeletonLoadCbs.clear()
        }
    }
    async waitForLoad() {
        if (this.skeletonObject)
            return;
        const t = new Promise(((t,e)=>this.onSkeletonLoadCbs.add({
            resolve: t,
            reject: e
        })));
        await t
    }
    buildObjectLinks(t) {
        if (this.objectLinks = [],
        !this.skeletonObject)
            throw new Error("Cannot build object links before the skeleton object is loaded");
        for (const e of traverseObject(this.skeletonObject)) {
            const i = t.getObjectByName(e.name);
            i && this.objectLinks.push([i, e])
        }
        this.objectLinksBuilt = !0,
        this.onObjectLinksBuilt.forEach((t=>t())),
        this.onObjectLinksBuilt.clear()
    }
    async waitForObjectLinks() {
        if (this.objectLinksBuilt)
            return;
        const t = new Promise((t=>this.onObjectLinksBuilt.add(t)));
        await t
    }
    apply() {
        if (0 != this.weight)
            if (1 == this.weight)
                for (const [t,e] of this.objectLinks)
                    t.position.copy(e.position),
                    t.quaternion.copy(e.quaternion),
                    t.scale.copy(e.scale);
            else
                for (const [t,e] of this.objectLinks)
                    t.position.lerp(e.position, this.weight),
                    t.quaternion.slerp(e.quaternion, this.weight),
                    t.scale.lerp(e.scale, this.weight)
    }
}
class PlayerSkeleton {
    constructor({player: t=null, gender: e="male"}={}) {
        this.player = t,
        this.isInit = !1,
        this.onInitCbs = new Set,
        this.onAllLinkLayerObjectsBuiltCbs = new Set,
        this._currentGender = e,
        this.poseLayers = [],
        this.skeletonMatrixObjects = [],
        this.baseSkeletonObject = null,
        this.headObj = null,
        this.bodyObj = null,
        this.armLObj = null,
        this.armRObj = null,
        this.legLObj = null,
        this.legRObj = null,
        this.initCalled = !1
    }
    async init() {
        if (this.initCalled)
            return await this.waitForLoad();
        this.initCalled = !0,
        this.baseSkeletonObject = await getMainInstance().skeletons.getSkeleton("male/baseRig", {
            clone: !0
        });
        for (const [t,e] of processedSkinNames.entries()) {
            const i = this.baseSkeletonObject.getObjectByName(e);
            if (!i)
                throw new Error(`Assertion failed, skeleton does not have object with name ${e}`);
            this.skeletonMatrixObjects[t] = i
        }
        this.headObj = this.baseSkeletonObject.getObjectByName("head"),
        this.bodyObj = this.baseSkeletonObject.getObjectByName("torso"),
        this.armLObj = this.baseSkeletonObject.getObjectByName("upperArmL"),
        this.armRObj = this.baseSkeletonObject.getObjectByName("upperArmR"),
        this.legLObj = this.baseSkeletonObject.getObjectByName("upperLegL"),
        this.legRObj = this.baseSkeletonObject.getObjectByName("upperLegR"),
        this.isInit = !0;
        for (const t of this.onInitCbs)
            t();
        this.onInitCbs.clear()
    }
    async waitForLoad() {
        if (this.isInit)
            return;
        const t = new Promise((t=>this.onInitCbs.add(t)));
        await t
    }
    assertInit() {
        if (!this.isInit)
            throw new Error("PlayerSkeleton not initialized")
    }
    createPoseLayer(t) {
        const e = new PlayerSkeletonLayer(t,this._currentGender);
        return this.linkLayerObjects(e),
        e
    }
    addPoseLayer(t) {
        const e = this.createPoseLayer(t);
        return this.poseLayers.push(e),
        e
    }
    removePoseLayer(t) {
        const e = this.poseLayers.indexOf(t);
        e >= 0 && this.poseLayers.splice(e, 1)
    }
    get gender() {
        return this._currentGender
    }
    setGender(t) {
        if (this._currentGender != t) {
            this._currentGender = t;
            for (const e of this.poseLayers)
                e.setGender(t),
                this.linkLayerObjects(e)
        }
    }
    async linkLayerObjects(t) {
        await this.waitForLoad();
        try {
            await t.waitForLoad()
        } catch (t) {
            if (t instanceof DOMException && "AbortError" == t.name)
                return;
            throw t
        }
        if (!this.baseSkeletonObject)
            throw new Error("Assertion failed, baseSkeletonObject not set");
        t.buildObjectLinks(this.baseSkeletonObject),
        this.allObjectLinksBuilt && (this.onAllLinkLayerObjectsBuiltCbs.forEach((t=>t())),
        this.onAllLinkLayerObjectsBuiltCbs.clear())
    }
    get allObjectLinksBuilt() {
        for (const t of this.poseLayers)
            if (!t.objectLinksBuilt)
                return !1;
        return !0
    }
    async waitForLinkLayerObjects() {
        if (this.allObjectLinksBuilt)
            return;
        const t = new Promise((t=>this.onAllLinkLayerObjectsBuiltCbs.add(t)));
        await t
    }
    replacePoseLayer(t, e) {
        const i = this.createPoseLayer(e);
        return this.poseLayers[t] = i,
        i
    }
    insertPoseLayer(t, e) {
        const i = this.createPoseLayer(e);
        return this.poseLayers.splice(t, 0, i),
        i
    }
    setLookRotY(t, e) {
        if (this.bodyObj) {
            const i = e.head ?? .3;
            this.applyLookRotation(this.bodyObj, new Vector3(1,0,0), t * i)
        }
        if (this.headObj) {
            const i = e.head ?? .3;
            this.applyLookRotation(this.headObj, new Vector3(1,0,0), t * i)
        }
        if (this.armLObj) {
            const i = e.armL || 0;
            this.applyLookRotation(this.armLObj, new Vector3(1,0,0), t * i)
        }
        if (this.armRObj) {
            const i = e.armR || 0;
            this.applyLookRotation(this.armRObj, new Vector3(1,0,0), t * i)
        }
    }
    applyLookRotation(t, e, i) {
        if (!t)
            return;
        const s = t.getWorldQuaternion(new Quaternion);
        s.invert();
        const n = e;
        n.applyQuaternion(s);
        const a = new Quaternion;
        a.setFromAxisAngle(n, i),
        t.quaternion.multiply(a)
    }
    applyLayers() {
        this.assertInit();
        for (const t of this.poseLayers)
            t.apply()
    }
    updateMatrices() {
        this.assertInit(),
        this.baseSkeletonObject && this.baseSkeletonObject.updateWorldMatrix(!1, !0)
    }
    getMatrices() {
        return this.assertInit(),
        this.skeletonMatrixObjects.map((t=>t.matrixWorld))
    }
}
function isDay(t, e) {
    const i = new Date(Date.now());
    return i.getUTCMonth() == e - 1 && (i.getUTCDate() == t && i.getUTCHours() >= 7 || i.getUTCDate() == t + 1 && i.getUTCHours() < 7)
}
const PLAYER_HIT_FLASH_ARRAY_LENGTH = 5;
class MaterialsManager {
    constructor() {
        this.materialsCache = new Map,
        this.extraMaterials = new Set,
        this.shadersHavePrecompiled = !1,
        this.hashes = "\n\t\t\t// Hash without Sine\n\t\t\t// MIT License...\n\t\t\t// Copyright (c)2014 David Hoskins.\n\t\t\tfloat hash13(vec3 p3)\n\t\t\t{\n\t\t\t\tp3  = fract(p3 * .1031);\n\t\t\t\tp3 += dot(p3, p3.yzx + 33.33);\n\t\t\t\treturn fract((p3.x + p3.y) * p3.z);\n\t\t\t}\n\t\t\tfloat hash12(vec2 p)\n\t\t\t{\n\t\t\t\tvec3 p3  = fract(vec3(p.xyx) * .1031);\n\t\t\t\tp3 += dot(p3, p3.yzx + 33.33);\n\t\t\t\treturn fract((p3.x + p3.y) * p3.z);\n\t\t\t}\n\t\t\tvec3 hash33(vec3 p3)\n\t\t\t{\n\t\t\t\tp3 = fract(p3 * vec3(.1031, .1030, .0973));\n\t\t\t    p3 += dot(p3, p3.yxz+33.33);\n\t\t\t    return fract((p3.xxy + p3.yxx)*p3.zyx);\n\t\t\t}\n\t\t",
        this.saturateColorFn = "\n\t\t\tvec3 saturateColor(vec3 rgb, float adjustment){\n\t\t\t\tconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\n\t\t\t\tvec3 intensity = vec3(dot(rgb, W));\n\t\t\t\treturn mix(intensity, rgb, adjustment);\n\t\t\t}\n\t\t",
        this.gradientNoiseFn = "\n\t\t\t// The MIT License\n\t\t\t// Copyright (c) 2013 Inigo Quilez\n\t\t\tfloat gradientNoise( in vec3 p )\n\t\t\t{\n\t\t\t    vec3 i = floor( p );\n\t\t\t    vec3 f = fract( p );\n\n\t\t\t\tvec3 u = f*f*(3.0-2.0*f);\n\n\t\t\t    return mix( mix( mix( dot( hash33( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),\n\t\t\t                          dot( hash33( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),\n\t\t\t                     mix( dot( hash33( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),\n\t\t\t                          dot( hash33( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),\n\t\t\t                mix( mix( dot( hash33( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),\n\t\t\t                          dot( hash33( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),\n\t\t\t                     mix( dot( hash33( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),\n\t\t\t                          dot( hash33( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );\n\t\t\t}\n\t\t"
    }
    init() {
        const t = {
            vertexShaderOpts: {
                modifyColFn: "\n\t\t\t\t\tfloat upDot = dot(normal, vec3(0.0, 1.0, 0.0));\n\t\t\t\t\tcol += clamp(upDot * lightning, 0.0, 1.0);\n\t\t\t\t",
                extraVariables: "\n\t\t\t\t\tuniform float lightning;\n\t\t\t\t"
            },
            uniforms: {
                lightning: {
                    value: 0
                }
            }
        };
        this.basicUnlitMat = this.createMaterial({
            name: "default",
            ...t
        }),
        this.basicUnlitMatDouble = this.createMaterial({
            name: "defaultDouble",
            side: DoubleSide,
            ...t
        }),
        this.skyDomeMat = this.createMaterial({
            name: "skydome",
            fragmentShaderOpts: {
                modifyColFn: "\n\t\t\t\t\tcol = getFogcolor();\n\t\t\t\t"
            },
            fog: !1,
            needsFogColor: !0,
            needsModelPosVarying: !0,
            depthWrite: !1
        }),
        this.skyDomeMat.side = BackSide,
        this.lightsMat = this.createMaterial({
            name: "lights",
            fog: !1,
            applyWorldColor: !1,
            depthWrite: !1,
            depthTest: !0
        }),
        this.lightsMat.blending = AdditiveBlending,
        this.screenFlashMat = this.createMaterial({
            name: "screenFlash",
            fog: !1,
            applyWorldColor: !1,
            depthWrite: !1,
            depthTest: !1,
            uniforms: {
                vignetteAmount: {
                    value: 0
                },
                hasDirection: {
                    value: 0
                },
                theta: {
                    value: 0
                },
                baseOpacity: {
                    value: 0
                },
                opacity: {
                    value: 0
                },
                color: {
                    value: new Vector3
                }
            },
            vertexShaderOpts: {
                useMvp: !1,
                needsUv: !0
            },
            fragmentShaderOpts: {
                needsUv: !0,
                extraVariables: "\n\t\t\t\t\tuniform float vignetteAmount;\n\t\t\t\t\tuniform float hasDirection;\n\t\t\t\t\tuniform float theta;\n\t\t\t\t\tuniform float baseOpacity;\n\t\t\t\t\tuniform float opacity;\n\t\t\t\t\tuniform vec3 color;\n\t\t\t\t",
                modifyColFn: "\n\t\t\t\t\tcol = color;\n\t\t\t\t\tfloat centerDist = length(vUv.xy - vec2(0.5));\n\t\t\t\t\talpha = mix(1.0, centerDist, vignetteAmount);\n\n\t\t\t\t\tvec2 rotatedUv = vUv.xy;\n\t\t\t\t\trotatedUv -= vec2(0.5);\n\t\t\t\t\trotatedUv = vec2(\n\t\t\t\t\t\trotatedUv.x * cos(theta) - rotatedUv.y * sin(theta),\n\t\t\t\t\t\trotatedUv.x * sin(theta) + rotatedUv.y * cos(theta)\n\t\t\t\t\t);\n\t\t\t\t\trotatedUv += vec2(0.5);\n\t\t\t\t\talpha *= mix(1.0, rotatedUv.y, hasDirection);\n\t\t\t\t\talpha *= opacity;\n\t\t\t\t\talpha = mix(alpha, 1.0, baseOpacity);\n\t\t\t\t"
            }
        }),
        this.screenFlashMat.transparent = !0,
        this.snowMat = this.createMaterial({
            name: "snow",
            vertexShaderOpts: {
                modifyColFn: "\n\t\t\t\t\tvec3 deltaPos = cameraPosition - worldPos.xyz;\n\t\t\t\t\t// edge = 1.0 - dot(normal, normalize(deltaPos));\n\t\t\t\t\tcol = vec3(0.6, 0.7, 0.8);\n\n\t\t\t\t\tfloat edge = pow(1.0 - dot(normal, normalize(deltaPos)), 3.0);\n\t\t\t\t\tedge = clamp(edge, 0.0, 1.0);\n\t\t\t\t\tcol = mix(vec3(0.6, 0.7, 0.8), vec3(1.5,1.5,1.5), edge);\n\t\t\t\t"
            }
        });
        const e = {
            vertexShaderOpts: {
                extraVariables: "\n\t\t\t\t\tattribute float bowMorph;\n\t\t\t\t\tuniform float bowMorphAmount;\n\t\t\t\t",
                modifyWorldPosBeforeModelMatrixFn: "\n\t\t\t\t\tpos.z -= bowMorph * bowMorphAmount;\n\t\t\t\t"
            },
            uniforms: {
                bowMorphAmount: {
                    value: 0
                }
            }
        };
        this.bowMorph = this.createMaterial({
            ...e,
            name: "bowMorph"
        }),
        this.bowMorphDouble = this.createMaterial({
            ...e,
            name: "bowMorphDouble",
            side: DoubleSide
        });
        const i = isDay(11, 5);
        this.arrowTrailMat = this.createMaterial({
            name: "arrowTrail",
            vertexShaderOpts: {
                extraVariables: "\n\t\t\t\t\tattribute float arrowT;\n\t\t\t\t\tvarying float vArrowT;\n\t\t\t\t\tattribute vec3 linePoint;\n\t\t\t\t",
                modifyWorldPosFn: "\n\t\t\t\t\tfloat camDist = length(cameraPosition - pos.xyz);\n\t\t\t\t\tfloat requiredVectorLength = camDist * 0.001;\n\t\t\t\t\tfloat currentNormalLength = length(normal);\n\t\t\t\t\tfloat desiredNormalLength = max(requiredVectorLength, currentNormalLength);\n\t\t\t\t\tvec3 clampedNormal = normal * (desiredNormalLength / currentNormalLength);\n\t\t\t\t\tpos.xyz += clampedNormal;\n\t\t\t\t\tvArrowT = arrowT;\n\t\t\t\t"
            },
            fragmentShaderOpts: {
                extraVariables: "\n\t\t\t\t\tuniform float arrowPosT;\n\t\t\t\t\tuniform float arrowShootT;\n\t\t\t\t\tuniform vec3 shootStartPos;\n\t\t\t\t\tuniform float estimatedXLength;\n\t\t\t\t\tvarying float vArrowT;\n\t\t\t\t",
                modifyColFn: `\n\t\t\t\t\tfloat t = arrowPosT - vArrowT;\n\t\t\t\t\tfloat shootT = arrowShootT - vArrowT;\n\t\t\t\t\talpha = 1.0;\n\n\t\t\t\t\t// fade in at start of trail\n\t\t\t\t\talpha = min(alpha, 0.2 * t - 0.5);\n\n\t\t\t\t\t// fade out at end of trail\n\t\t\t\t\talpha = min(alpha, 1.0 - 3.0 * (shootT / estimatedXLength));\n\n\t\t\t\t\talpha = min(alpha, length(shootStartPos - worldPos.xyz));\n\n\t\t\t\t\talpha = min(alpha, length(cameraPosition - worldPos.xyz) - 0.3);\n\n\t\t\t\t\talpha *= 0.4;\n\n\t\t\t\t\t ${i ? "\n\t\t\t\t\t\tfloat dist = length(cameraPosition - worldPos.xyz);\n\t\t\t\t\t\tfloat rainbowDist = 1.0 - exp(-dist * 0.05);\n\t\t\t\t\t\tvec4 rainbow = .5+.5*cos(6.283185*(rainbowDist +vec4(0,1,-1,0)/3.));\n\t\t\t\t\t\trainbow = min(rainbow,2.-rainbow);\n\t\t\t\t\t\tcol = mix(rainbow.rgb, vec3(1.), 0.0);\n\t\t\t\t\t\talpha *= 3.0;\n\t\t\t\t\t" : ""}\n\t\t\t\t`
            },
            depthWrite: !1,
            uniforms: {
                arrowPosT: {
                    value: 0
                },
                arrowShootT: {
                    value: 0
                },
                shootStartPos: {
                    value: new Vector3
                },
                estimatedXLength: {
                    value: 1
                }
            }
        }),
        this.arrowTrailMat.transparent = !0;
        const s = processedSkinNames.length
          , n = [];
        for (let t = 0; t < s; t++)
            n.push(new Matrix4);
        const a = []
          , o = [];
        for (let t = 0; t < 5; t++)
            a.push(0),
            o.push(new Vector3);
        const r = {
            vertexShaderOpts: {
                extraVariables: `\n\t\t\t\t\tattribute float skinIndex;\n\t\t\t\t\tuniform mat4 skinMatrices[${s}];\n\t\t\t\t\tvarying vec3 vModelPos;\n\t\t\t\t`,
                modifyWorldPosBeforeModelMatrixFn: "\n\t\t\t\t\tpos = skinMatrices[int(skinIndex)] * pos;\n\t\t\t\t\tvModelPos = pos.xyz;\n\t\t\t\t"
            },
            fragmentShaderOpts: {
                extraVariables: "\n\t\t\t\t\tuniform float time;\n\t\t\t\t\tuniform float hitFlashTimes[5];\n\t\t\t\t\tuniform vec3 hitFlashPositions[5];\n\t\t\t\t\tvarying vec3 vModelPos;\n\t\t\t\t",
                modifyColFn: "\n\t\t\t\t\tfloat hitFlashAmount = 0.0;\n\t\t\t\t\tfor (int i = 0; i < 5; i++) {\n\t\t\t\t\t\tfloat t = time - hitFlashTimes[i];\n\t\t\t\t\t\tt *= 0.002;\n\t\t\t\t\t\tfloat centerDist = length(vModelPos - hitFlashPositions[i]);\n\t\t\t\t\t\tfloat flash = 1.0 - (centerDist - t * 6.0) * 50.0;\n\t\t\t\t\t\tflash = clamp(flash, 0.0, 1.0);\n\t\t\t\t\t\tflash *= clamp(1.0 - t, 0.0, 1.0);\n\t\t\t\t\t\thitFlashAmount = mix(hitFlashAmount, 1.0, flash);\n\t\t\t\t\t}\n\t\t\t\t\thitFlashAmount = clamp(hitFlashAmount, 0.0, 1.0);\n\t\t\t\t\tcol = mix(col, vec3(1.0, 0.0, 0.0), hitFlashAmount);\n\t\t\t\t"
            },
            uniforms: {
                skinMatrices: {
                    value: n
                },
                time: {
                    value: 0
                },
                hitFlashTimes: {
                    value: a
                },
                hitFlashPositions: {
                    value: o
                }
            }
        };
        this.defaultMatSkinned = this.createMaterial({
            ...r,
            name: "defaultSkinned"
        }),
        this.defaultDoubleMatSkinned = this.createMaterial({
            ...r,
            name: "defaultDoubleSkinned",
            side: DoubleSide
        })
    }
    async precompileShaders() {
        if (this.shadersHavePrecompiled)
            return;
        const t = new Scene
          , e = new PlaneGeometry;
        e.setAttribute("color", new BufferAttribute(new Float32Array(16),4));
        const i = new Mesh(e);
        t.add(i);
        const s = getMainInstance()
          , n = s.renderer.renderer;
        if (!n)
            return;
        const a = s.cam.cam;
        for (const e of this.materialsCache.values())
            await getMainInstance().renderer.waitForFrameRender(),
            i.material = e,
            n.compile(t, a);
        this.shadersHavePrecompiled = !0
    }
    *allMaterials() {
        for (const t of this.materialsCache.values())
            yield t;
        for (const t of this.extraMaterials)
            yield t
    }
    getMaterialByName(t) {
        return this.materialsCache.has(t) ? this.materialsCache.get(t) : this.basicUnlitMat
    }
    addCachedMaterial(t) {
        t.name ? this.materialsCache.set(t.name, t) : console.warn("material doesn't have a name!")
    }
    addExtraMaterial(t) {
        this.extraMaterials.add(t)
    }
    removeExtraMaterial(t) {
        this.extraMaterials.delete(t)
    }
    applyWeatherParams(t) {
        for (const e of this.allMaterials())
            e.uniforms.colorMultiplier.value.copy(t.colorMultiplier),
            e.uniforms.colorAdder.value.copy(t.colorAdder),
            e.uniforms.saturation.value = t.saturation,
            e.uniforms.skyLowCol.value.copy(t.skyLowColor),
            e.uniforms.skyHighCol.value.copy(t.skyHighColor),
            e.uniforms.skyMidCol.value.copy(t.skyMidColor),
            e.uniforms.skyPower.value = t.skyPower,
            e.uniforms.fogAmount.value = t.fogAmount,
            e.uniforms.fogHeightAmount.value = t.fogHeightAmount,
            e.uniforms.fogHeightOffset.value = t.fogHeightOffset,
            e.uniforms.fogHeightDistFalloff.value = t.fogHeightDistFalloff + 1,
            e.uniforms.fogHeightAmountMin.value = t.fogHeightAmountMin,
            e.uniforms.fogHeightAmountMax.value = t.fogHeightAmountMax
    }
    static resetWeatherUniforms(t) {
        t.uniforms.colorMultiplier.value.set(new Color(1,1,1)),
        t.uniforms.colorAdder.value.set(new Color(0,0,0)),
        t.uniforms.saturation.value = 1,
        t.uniforms.fogAmount.value = 0,
        t.uniforms.fogHeightAmountMin.value = 0,
        t.uniforms.fogHeightAmountMax.value = 0
    }
    setLightningValue(t) {
        this.basicUnlitMat && (this.basicUnlitMat.uniforms.lightning.value = t),
        this.basicUnlitMatDouble && (this.basicUnlitMatDouble.uniforms.lightning.value = t)
    }
    buildVertexShader({name: t="", extraVariables: e="", modifyWorldPosFn: i="", modifyWorldPosAfterColorFn: s="", modifyWorldPosBeforeModelMatrixFn: n="", modifyColFn: a="", extraFunctions: o="", fog: r=!0, needsFogColor: l=!1, applyWorldColor: h=!0, useMvp: d=!0, needsModelPosVarying: c=!1, needsUv: u=!1}={}) {
        return `\n\t\t\t//vertex shader for ${t}\n\n\t\t\t ${r ? "#define FOG" : ""}\n\t\t\t ${l ? "#define NEEDS_FOG_COLOR" : ""}\n\t\t\t ${h ? "#define APPLY_WORLD_COLOR" : ""}\n\t\t\t ${d ? "#define USE_MVP" : ""}\n\t\t\t ${c ? "#define NEEDS_MODEL_POS_VARYING" : ""}\n\t\t\t ${u ? "#define NEEDS_UV" : ""}\n\n\t\t\t#define PI 3.141592653589793\n\n\t\t\tvarying vec3 vColor;\n\t\t\tvarying vec4 worldPos;\n\t\t\t#ifdef FOG\n\t\t\t\t#define NEEDS_FOG_COLOR\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_FOG_COLOR\n\t\t\t\tvarying float skyColorLerpValue;\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_MODEL_POS_VARYING\n\t\t\t\tvarying vec3 vModelPos;\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_UV\n\t\t\t\tvarying vec2 vUv;\n\t\t\t#endif\n\n\t\t\tuniform float saturation;\n\t\t\tuniform vec3 colorMultiplier;\n\t\t\tuniform vec3 colorAdder;\n\n\t\t\tvarying vec2 vHighPrecisionZW;\n\n\t\t\t ${e}\n\n\t\t\t ${o}\n\n\t\t\tvec4 modifyWorldPos(vec4 pos){\n\t\t\t\t ${i}\n\t\t\t\treturn pos;\n\t\t\t}\n\n\t\t\tvec4 modifyWorldPosAfterColor(vec4 pos){\n\t\t\t\t ${s}\n\t\t\t\treturn pos;\n\t\t\t}\n\n\t\t\tvec4 modifyWorldPosBeforeModelMatrix(vec4 pos){\n\t\t\t\t ${n}\n\t\t\t\treturn pos;\n\t\t\t}\n\n\t\t\tvec3 modifyCol(vec3 col){\n\t\t\t\t ${a}\n\t\t\t\treturn col;\n\t\t\t}\n\n\t\t\t ${this.saturateColorFn}\n\n\t\t\tvoid main(){\n\t\t\t\tvec3 modelPosition = vec3(position);\n\t\t\t\tworldPos = vec4(modelPosition, 1.0);\n\t\t\t\t#ifdef USE_INSTANCING\n\t\t\t\t\tworldPos = instanceMatrix * worldPos;\n\t\t\t\t#endif\n\t\t\t\tworldPos = modifyWorldPosBeforeModelMatrix(worldPos);\n\t\t\t\t#ifdef USE_MVP\n\t\t\t\t\tworldPos = modelMatrix * worldPos;\n\t\t\t\t#endif\n\t\t\t\tworldPos = modifyWorldPos(worldPos);\n\t\t\t\t#ifdef NEEDS_UV\n\t\t\t\t\tvUv = uv;\n\t\t\t\t#endif\n\t\t\t\tvec3 col = modifyCol(color.rgb);\n\t\t\t\t#ifdef APPLY_WORLD_COLOR\n\t\t\t\t\tcol = saturateColor(col, saturation);\n\t\t\t\t\tcol *= colorMultiplier;\n\t\t\t\t\tcol += colorAdder;\n\t\t\t\t#endif\n\t\t\t\tvColor = col;\n\n\t\t\t\t#ifdef NEEDS_FOG_COLOR\n\t\t\t\t\tvec3 deltaPos = cameraPosition - vec3(worldPos);\n\t\t\t\t\tfloat angle = dot(vec3(0.0,-1.0,0.0), normalize(deltaPos));\n\t\t\t\t\tangle = clamp(angle, -PI, PI);\n\t\t\t\t\tangle = acos(angle);\n\t\t\t\t\tskyColorLerpValue = 1.0 - angle / 1.57;\n\t\t\t\t#endif\n\t\t\t\t#ifdef NEEDS_MODEL_POS_VARYING\n\t\t\t\t\tvModelPos = position;\n\t\t\t\t#endif\n\t\t\t\t#ifdef FOG\n\t\t\t\t#endif\n\n\t\t\t\tworldPos = modifyWorldPosAfterColor(worldPos);\n\n\t\t\t\t#ifdef USE_MVP\n\t\t\t\t\tvec4 modelViewPosition = viewMatrix * worldPos;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewPosition;\n\t\t\t\t#else\n\t\t\t\t\tgl_Position = worldPos;\n\t\t\t\t#endif\n\t\t\t}\n\t\t`
    }
    buildFragShader({name: t="", extraVariables: e="", modifyColFn: i="", modifyTexColFn: s="", extraFunctions: n="", fog: a=!0, needsFogColor: o=!1, needsModelPosVarying: r=!1, needsUv: l=!1}={}) {
        return `\n\t\t\t//fragment shader for ${t}\n\n\t\t\t ${a ? "#define FOG" : ""}\n\t\t\t ${o ? "#define NEEDS_FOG_COLOR" : ""}\n\t\t\t ${r ? "#define NEEDS_MODEL_POS_VARYING" : ""}\n\t\t\t ${l ? "#define NEEDS_UV" : ""}\n\n\t\t\tvarying vec3 vColor;\n\t\t\tvarying vec4 worldPos;\n\n\t\t\tuniform vec3 skyHighCol;\n\t\t\tuniform vec3 skyMidCol;\n\t\t\tuniform vec3 skyLowCol;\n\t\t\tuniform float skyPower;\n\t\t\t#ifdef FOG\n\t\t\t\tuniform float fogAmount;\n\t\t\t\tuniform float fogHeightAmount;\n\t\t\t\tuniform float fogHeightOffset;\n\t\t\t\tuniform float fogHeightDistFalloff;\n\t\t\t\tuniform float fogHeightAmountMin;\n\t\t\t\tuniform float fogHeightAmountMax;\n\t\t\t\tfloat fogLerpValue;\n\t\t\t\t#define NEEDS_FOG_COLOR\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_FOG_COLOR\n\t\t\t\tvarying float skyColorLerpValue;\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_MODEL_POS_VARYING\n\t\t\t\tvarying vec3 vModelPos;\n\t\t\t#endif\n\t\t\t#ifdef NEEDS_UV\n\t\t\t\tvarying vec2 vUv;\n\t\t\t#endif\n\n\t\t\tfloat alpha = 1.0;\n\n\t\t\t#include <packing>\n\t\t\tvarying vec2 vHighPrecisionZW;\n\n\t\t\t ${e}\n\n\t\t\t#ifdef NEEDS_FOG_COLOR\n\t\t\t\tvec3 getFogcolor(){\n\t\t\t\t\tfloat absLerpValue = abs(skyColorLerpValue);\n\t\t\t\t\tfloat lerpValue = pow(max(0.0, absLerpValue), skyPower);\n\t\t\t\t\tif (skyColorLerpValue < 0.0) {\n\t\t\t\t\t\treturn mix(skyMidCol, skyLowCol, lerpValue);\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn mix(skyMidCol, skyHighCol, lerpValue);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t#endif\n\n\t\t\t#ifdef FOG\n\t\t\tvec3 applyFog(vec3 col){\n\t\t\t\tcol = mix(col, getFogcolor(), fogLerpValue);\n\t\t\t\treturn col;\n\t\t\t}\n\t\t\t#endif\n\n\t\t\t ${n}\n\n\t\t\tvec3 modifyCol(vec3 col){\n\t\t\t\t ${i}\n\t\t\t\treturn col;\n\t\t\t}\n\n\t\t\tvec4 modifyTexCol(vec4 col, vec2 uv){\n\t\t\t\t ${s}\n\t\t\t\treturn col;\n\t\t\t}\n\n\t\t\tfloat computeFog(float dist, float fogAmount) {\n\t\t\t\treturn 1.0 - exp(-dist * fogAmount);\n\t\t\t}\n\n\t\t\tfloat computeHeightFog(float fogAmount, float fogHeightAmount, float dist, float originHeight, float deltaHeight) {\n\t\t\t\tfloat h = fogHeightAmount;\n\t\t\t\tfloat fog = (fogAmount / h) * exp(-originHeight * h) * (1.0 - exp(-dist * deltaHeight * h)) / deltaHeight;\n\t\t\t\treturn clamp(fog, 0.0, 1.0);\n\t\t\t}\n\n\t\t\tvoid main(){\n\t\t\t\t#ifdef FOG\n\t\t\t\t\tvec3 deltaPos = vec3(worldPos) - cameraPosition;\n\t\t\t\t\tfloat fogDistValue = length(deltaPos);\n\t\t\t\t\tif (fogHeightAmount < 0.00001) {\n\t\t\t\t\t\tfogLerpValue = computeFog(fogDistValue, fogAmount);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tfloat min = computeFog(fogDistValue, fogHeightAmountMin);\n\t\t\t\t\t\tfloat max = computeFog(fogDistValue, fogHeightAmountMax);\n\t\t\t\t\t\tfloat distAmount = fogHeightAmount * pow(fogHeightDistFalloff, - fogDistValue);\n\t\t\t\t\t\tfloat heightFog = computeHeightFog(fogAmount, distAmount, fogDistValue, cameraPosition.y - fogHeightOffset, normalize(deltaPos).y);\n\t\t\t\t\t\tfogLerpValue = clamp(heightFog, min, max);\n\t\t\t\t\t}\n\t\t\t\t#endif\n\t\t\t\tvec3 col = modifyCol(vColor);\n\t\t\t\t#ifdef FOG\n\t\t\t\t\tcol = applyFog(col);\n\t\t\t\t#endif\n\t\t\t\tgl_FragColor = LinearTosRGB(vec4(col, alpha));\n\t\t\t}\n\t\t`
    }
    createMaterial({name: t="", vertexShaderOpts: e={}, fragmentShaderOpts: i={}, exactVertShader: s=null, exactFragShader: n=null, uniforms: a={}, defaultAttributeValues: o={}, fog: r=!0, needsFogColor: l=!1, applyWorldColor: h=!0, needsModelPosVarying: d=!1, needsUv: c=!1, depthWrite: u=!0, depthTest: p=!0, side: g=FrontSide}={}) {
        const m = {
            fog: r,
            needsFogColor: l,
            needsModelPosVarying: d,
            needsUv: c,
            applyWorldColor: h
        };
        let f, w;
        e = {
            name: t,
            ...m,
            ...e
        },
        i = {
            name: t,
            ...m,
            ...i
        },
        f = s || this.buildVertexShader(e),
        w = n || this.buildFragShader(i),
        a = {
            saturation: {
                value: 1
            },
            colorMultiplier: {
                value: new Color(1,1,1)
            },
            colorAdder: {
                value: new Color(0,0,0)
            },
            skyHighCol: {
                value: new Color
            },
            skyMidCol: {
                value: new Color
            },
            skyLowCol: {
                value: new Color
            },
            skyPower: {
                value: 1
            },
            fogAmount: {
                value: .002
            },
            fogHeightAmount: {
                value: 0
            },
            fogHeightOffset: {
                value: 0
            },
            fogHeightDistFalloff: {
                value: 0
            },
            fogHeightAmountMin: {
                value: 0
            },
            fogHeightAmountMax: {
                value: 0
            },
            ...a
        };
        const b = new ShaderMaterial({
            name: t,
            vertexShader: f,
            fragmentShader: w,
            uniforms: a,
            side: g,
            vertexColors: !0,
            depthWrite: u,
            depthTest: p
        });
        return b.defaultAttributeValues = {
            ...b.defaultAttributeValues,
            ...o
        },
        this.addCachedMaterial(b),
        b
    }
}
function computeApproximateBoundingSphere(t, {skinMatrices: e=null}={}) {
    let i = null;
    const s = new Vector3;
    for (const n of traverseObject(t))
        if (n instanceof Mesh && n.geometry) {
            const t = n.geometry.attributes.position
              , a = n.geometry.attributes.skinIndex;
            for (let n = 0; n < t.count; n++) {
                if (s.fromBufferAttribute(t, n),
                a && e) {
                    const t = e[a.getX(n)];
                    s.applyMatrix4(t)
                }
                i ? i.expandByPoint(s) : i = new Box3(s.clone(),s.clone())
            }
        }
    if (!i)
        return new Sphere(new Vector3(0,0,0),1);
    const n = i.getCenter(new Vector3);
    let a = 0;
    for (const i of traverseObject(t))
        if (i instanceof Mesh && i.geometry) {
            const t = i.geometry.attributes.position
              , o = i.geometry.attributes.skinIndex;
            for (let i = 0; i < t.count; i++) {
                if (s.fromBufferAttribute(t, i),
                o && e) {
                    const t = e[o.getX(i)];
                    s.applyMatrix4(t)
                }
                const r = n.distanceTo(s);
                a = Math.max(a, r)
            }
        }
    return new Sphere(n,a)
}
class PlayerModel {
    constructor({skinObjectOpts: t, init: e=!0, useWorldWeather: i=!0}) {
        this.skinObjectOpts = t,
        this.isInit = !1,
        this.destructed = !1,
        this.obj = null,
        this.materials = [],
        this.lastSetMatrices = null,
        this.onInitCbs = new Set,
        this.getSkinAbortController = new AbortController,
        this.useWorldWeather = i,
        this.initCalled = !1,
        e && this.init()
    }
    destructor() {
        this.destructed = !0;
        for (const t of this.materials)
            t.dispose();
        if (this.materials = [],
        this.obj) {
            for (const t of traverseObject(this.obj))
                t instanceof Mesh && t.geometry.dispose();
            this.obj = null
        }
        this.getSkinAbortController.abort()
    }
    async init() {
        if (this.initCalled)
            return await this.waitForInit();
        this.initCalled = !0;
        let t = null;
        try {
            t = await getMainInstance().skins.getSkinObject(this.skinObjectOpts, this.getSkinAbortController.signal)
        } catch (t) {
            if (!(this.destructed && t instanceof DOMException && "AbortError" == t.name))
                throw t
        }
        if (t && (t.geometry.boundingSphere = new Sphere(new Vector3(0,1,0),1),
        !this.destructed)) {
            this.obj = t;
            const e = new Map;
            this.obj.traverse((t=>{
                if (t instanceof Mesh)
                    if (Array.isArray(t.material)) {
                        const i = t.material;
                        for (const [s,n] of i.entries()) {
                            let i = e.get(n);
                            i || (i = n.clone(),
                            this.materials.push(i),
                            e.set(n, i)),
                            t.material[s] = i
                        }
                    } else {
                        let i = e.get(t.material);
                        if (!i) {
                            i = t.material.clone(),
                            this.materials.push(i),
                            e.set(t.material, i)
                        }
                        t.material = i
                    }
            }
            ))
        }
        if (!this.useWorldWeather)
            for (const t of this.materials)
                MaterialsManager.resetWeatherUniforms(t);
        this.isInit = !0;
        for (const t of this.onInitCbs)
            t();
        this.onInitCbs.clear()
    }
    async waitForInit() {
        if (this.isInit)
            return;
        const t = new Promise((t=>this.onInitCbs.add(t)));
        await t
    }
    applySkeleton(t) {
        this.lastSetMatrices = t.getMatrices();
        for (const t of this.materials)
            t.uniforms.skinMatrices && (t.uniforms.skinMatrices.value = this.lastSetMatrices)
    }
    setHitFlashMaterialsTime(t) {
        for (const e of this.materials)
            e.uniforms.time.value = t
    }
    setHitFlashMaterialsValue(t, e, i) {
        if (t < 0 || t >= 5)
            throw new Error("Invalid index");
        for (const s of this.materials)
            s.uniforms.hitFlashTimes.value[t] = e,
            s.uniforms.hitFlashPositions.value[t].copy(i)
    }
    computeApproximateBoundingSphere() {
        if (!this.obj)
            throw new Error("No model loaded");
        return computeApproximateBoundingSphere(this.obj, {
            skinMatrices: this.lastSetMatrices
        })
    }
}
class ConfirmItemPurchaseDialogUi extends DialogUi {
    constructor(t, {renderOptions: e}) {
        super({
            title: "Confirm your purchase",
            testLabel: "confirmPurchase"
        }),
        this.onPurchaseSuccessCbs = new Set,
        this.shopItem = new ShopItem(t,{
            usage: "confirmPurchase",
            renderOptions: e,
            dialog: this
        }),
        this.el.appendChild(this.shopItem.el),
        this.addButtonsContainer(),
        this.addButton({
            text: "Cancel",
            testLabel: "cancel",
            onClick: ()=>{
                this.close()
            }
        });
        const i = {
            testLabel: "purchase",
            onClick: async()=>{
                await this.purchaseButtonClick()
            }
        };
        t.price && t.price > 0 ? (i.showCurrency = !0,
        i.currency = t.price) : (i.text = "Get Item",
        t.hasRewardedAd && (i.icon = "static/img/rewardedAdIcon.svg")),
        this.purchaseButton = this.addButton(i),
        getMainInstance().shopState.isPurchasingItem(t.id) && (this.setButtonEnabled(!1),
        (async()=>{
            await getMainInstance().shopState.waitForItemPurchase(t.id),
            this.setButtonEnabled(!0)
        }
        )())
    }
    destructor() {
        this.shopItem.destructor(),
        super.destructor()
    }
    setButtonEnabled(t) {
        this.purchaseButton.enabled = t
    }
    async purchaseButtonClick() {
        this.setButtonEnabled(!1);
        const t = getMainInstance();
        await t.shopState.purchaseItem(this.shopItem.config, t.poki, t.dialogManager, "shop") ? (this.onPurchaseSuccessCbs.forEach((t=>t())),
        this.close()) : this.setButtonEnabled(!0)
    }
    onPurchaseSuccess(t) {
        this.onPurchaseSuccessCbs.add(t)
    }
}
class ConfigObjectAssetLoader {
    constructor({useWorldWeather: t=!0, label: e=""}={}) {
        this.obj = new Object3D,
        this.obj.name = `${e} asset loader`,
        this.label = e,
        this.useWorldWeather = t,
        this.currentlyLoadingAbortController = null,
        this.currentAssetName = "",
        this.currentMeleeAsset = null,
        this.onFirstAssetLoadCbs = new Set,
        this.onNewAssetLoadedCbs = new Set,
        this.currentlyLoadedMaterials = []
    }
    destructor() {
        this.destroyMaterials(),
        this.destroyBowMeshes()
    }
    async setConfig(t) {
        this.currentlyLoadingAbortController && this.currentlyLoadingAbortController.abort();
        const e = new AbortController;
        this.currentlyLoadingAbortController = e;
        const i = getMainInstance();
        let s = null;
        if (t.skinAssetName) {
            const e = t.skinAssetName
              , n = t.fallbackSkinAssetName;
            let a;
            try {
                a = await i.skins.buildConfigObject({
                    ...t,
                    label: this.label,
                    skinAssetName: e,
                    fallbackSkinAssetName: n
                }, this.currentlyLoadingAbortController.signal)
            } catch (t) {
                if (t instanceof DOMException && "AbortError" == t.name)
                    return;
                throw t
            }
            s = a.asset
        }
        this.currentMeleeAsset && this.obj.remove(this.currentMeleeAsset),
        this.currentMeleeAsset = null,
        this.destroyMaterials(),
        this.destroyBowMeshes(),
        s && (this.currentMeleeAsset = s,
        this.obj.add(s)),
        this.currentlyLoadingAbortController = null,
        this.onFirstAssetLoadCbs.forEach((t=>t())),
        this.onFirstAssetLoadCbs.clear(),
        this.onNewAssetLoadedCbs.forEach((t=>t()))
    }
    destroyMaterials() {
        for (const t of this.currentlyLoadedMaterials)
            t.dispose();
        this.currentlyLoadedMaterials = []
    }
    destroyBowMeshes() {
        if (this.currentMeleeAsset)
            for (const t of traverseObject(this.currentMeleeAsset))
                t instanceof Mesh && t.geometry.dispose()
    }
    async waitForLoad() {
        if (!this.isLoadingAsset)
            return;
        const t = new Promise((t=>this.onFirstAssetLoadCbs.add(t)));
        await t
    }
    get isLoadingAsset() {
        return !this.currentMeleeAsset || Boolean(this.currentlyLoadingAbortController)
    }
    onNewAssetLoaded(t) {
        this.onNewAssetLoadedCbs.add(t)
    }
}
const bowMorphOpts = {
    smallBow: {
        stringPullAmountTop: .12,
        stringPullAmountMiddle: .26,
        stringPullAmountBottom: .17
    },
    mediumBow: {
        bendAmount: .2,
        stringDistFar: .7,
        stringPullAmountTop: .045,
        stringPullAmountMiddle: .53,
        stringPullAmountBottom: .135
    },
    largeBow: {
        stringPullAmountTop: .24,
        stringPullAmountMiddle: .53,
        stringPullAmountBottom: .25
    },
    smallCrossbow: {
        stringDistNear: .02,
        stringDistFar: .2,
        stringPullAmountTop: 0,
        stringPullAmountMiddle: .09,
        stringPullAmountBottom: 0
    },
    largeCrossbow: {
        stringDistFar: .7,
        stringPullAmountTop: .12,
        stringPullAmountMiddle: .26,
        stringPullAmountBottom: .12
    },
    repeatingCrossbow: {
        stringDistNear: .1,
        stringDistFar: .2,
        bendAmount: .1,
        stringPullAmountTop: .02,
        stringPullAmountMiddle: .135,
        stringPullAmountBottom: .02
    }
};
class BowAssetLoader {
    constructor({useWorldWeather: t=!0}={}) {
        this.obj = new Object3D,
        this.obj.name = "Bow asset loader",
        this.useWorldWeather = t,
        this.lastFireAmount01 = 0,
        this.lastVisibleCount = 0,
        this.currentBowAsset = null,
        this.onFirstAssetLoadCbs = new Set,
        this.onAssetChangeCbs = new Set,
        this.currentlyLoadingAbortController = null,
        this.currentlyLoadedMaterials = [],
        this.currentArrowObjs = [],
        this.currentArrowOffsets = [],
        this.onArrowDestroyCallbacks = new Set,
        this.arrowAssetLoader = new ConfigObjectAssetLoader({
            useWorldWeather: t,
            label: "Arrow"
        }),
        this.arrowAssetLoader.onNewAssetLoaded((()=>{
            this.rebuildArrowObjects(),
            this.onArrowDestroyCallbacks.forEach((t=>t())),
            this.onArrowDestroyCallbacks.clear()
        }
        )),
        this.arrowObjectsConfig = {
            arrowCount: 0,
            arrowPositions: "stacked"
        },
        this.arrowPointIdle = new Object3D,
        this.arrowPointIdle.name = "Arrow point idle",
        this.obj.add(this.arrowPointIdle),
        this.arrowPointLoaded = new Object3D,
        this.arrowPointLoaded.name = "Arrow point loaded",
        this.obj.add(this.arrowPointLoaded)
    }
    destructor() {
        this.destroyMaterials(),
        this.destroyBowMeshes(),
        this.arrowAssetLoader.setConfig({
            skinAssetName: null
        })
    }
    async setConfig(t) {
        this.arrowAssetLoader.setConfig({
            skinAssetName: t.arrowSkin,
            fallbackSkinAssetName: "baseSkins/arrow.glb",
            teamColor: t.teamColor,
            teamId: t.teamId
        }),
        this.currentlyLoadingAbortController && this.currentlyLoadingAbortController.abort();
        const e = new AbortController;
        this.currentlyLoadingAbortController = e;
        const i = getMainInstance();
        let s, n = {};
        t.bowId && (n = bowMorphOpts[t.bowId] || {});
        try {
            s = await i.skins.getBowObject({
                name: t.bowId,
                teamId: t.teamId,
                teamColor: t.teamColor,
                morphOpts: n,
                skinAssets: t.skins,
                separateObjectNames: t.separateObjectNames || []
            }, this.currentlyLoadingAbortController.signal)
        } catch (t) {
            if (t instanceof DOMException && "AbortError" == t.name)
                return;
            throw t
        }
        const {bow: a, arrowPointIdleMatrix: o, arrowPointLoadedMatrix: r} = s;
        if (this.currentBowAsset && this.obj.remove(this.currentBowAsset),
        this.destroyMaterials(),
        this.destroyBowMeshes(),
        this.currentBowAsset = a,
        this.obj.add(a),
        !(a instanceof Mesh))
            throw new Error("Assertion failed, bow is not a mesh");
        const l = a.material;
        if (!Array.isArray(l))
            throw new Error("Assertion failed, materials is not an array");
        for (let t = 0; t < l.length; t++) {
            const e = l[t].clone();
            l[t] = e,
            e instanceof ShaderMaterial && (this.useWorldWeather || MaterialsManager.resetWeatherUniforms(e)),
            this.currentlyLoadedMaterials.push(e)
        }
        this.arrowPointIdle.position.set(0, 0, 0),
        this.arrowPointIdle.quaternion.identity(),
        this.arrowPointIdle.scale.set(1, 1, 1),
        this.arrowPointIdle.applyMatrix4(o),
        this.arrowPointLoaded.position.set(0, 0, 0),
        this.arrowPointLoaded.quaternion.identity(),
        this.arrowPointLoaded.scale.set(1, 1, 1),
        this.arrowPointLoaded.applyMatrix4(r);
        const h = t.arrowCount ?? 1
          , d = t.arrowPositions ?? "stacked";
        this.arrowObjectsConfig.arrowCount == h && this.arrowObjectsConfig.arrowPositions == d || (this.arrowObjectsConfig = {
            arrowCount: h,
            arrowPositions: d
        },
        this.rebuildArrowObjects()),
        this.internalUpdateFireAmount(),
        this.currentlyLoadingAbortController = null,
        this.onFirstAssetLoadCbs.forEach((t=>t())),
        this.onFirstAssetLoadCbs.clear(),
        this.onAssetChangeCbs.forEach((t=>t(a)))
    }
    rebuildArrowObjects() {
        this.currentArrowOffsets = [];
        for (const t of this.currentArrowObjs)
            this.obj.remove(t);
        this.currentArrowObjs = [];
        const t = this.arrowAssetLoader.obj.children[0];
        if (t) {
            for (let e = 0; e < this.arrowObjectsConfig.arrowCount; e++) {
                const i = t.clone();
                i.position.z = .6,
                this.obj.add(i),
                this.currentArrowObjs.push(i);
                const s = new Vector2;
                "stacked" == this.arrowObjectsConfig.arrowPositions ? s.set(0, .01 * e) : (s.x = Math.cos(e) * e * .01,
                s.y = Math.sin(e) * e * .01),
                this.currentArrowOffsets.push(s)
            }
            this.internalUpdateFireAmount()
        }
    }
    getClonedArrowObject(t) {
        const e = this.arrowAssetLoader.obj.children[0];
        return e ? (this.onArrowDestroyCallbacks.add(t),
        e.clone()) : null
    }
    destroyMaterials() {
        for (const t of this.currentlyLoadedMaterials)
            t.dispose();
        this.currentlyLoadedMaterials = []
    }
    destroyBowMeshes() {
        if (this.currentBowAsset)
            for (const t of traverseObject(this.currentBowAsset))
                t instanceof Mesh && t.geometry.dispose()
    }
    async waitForLoad() {
        if (!this.isLoadingAsset)
            return;
        const t = new Promise((t=>this.onFirstAssetLoadCbs.add(t)));
        await t
    }
    onAssetChange(t) {
        this.onAssetChangeCbs.add(t)
    }
    get isLoadingAsset() {
        return !this.currentBowAsset || Boolean(this.currentlyLoadingAbortController)
    }
    get assetLoaded() {
        return Boolean(this.currentBowAsset)
    }
    getLoadedArrowPointScale() {
        return this.arrowPointLoaded.scale
    }
    updateFireAmount(t, e) {
        this.lastFireAmount01 = t,
        this.lastVisibleCount = e,
        this.internalUpdateFireAmount()
    }
    internalUpdateFireAmount() {
        for (const [t,e] of this.currentArrowObjs.entries()) {
            e.position.lerpVectors(this.arrowPointIdle.position, this.arrowPointLoaded.position, this.lastFireAmount01);
            const i = this.currentArrowOffsets[t];
            e.position.x += i.x,
            e.position.y += i.y,
            e.scale.lerpVectors(this.arrowPointIdle.scale, this.arrowPointLoaded.scale, this.lastFireAmount01),
            e.quaternion.slerpQuaternions(this.arrowPointIdle.quaternion, this.arrowPointLoaded.quaternion, this.lastFireAmount01),
            e.visible = this.lastVisibleCount > t
        }
        for (const t of this.currentlyLoadedMaterials)
            t instanceof ShaderMaterial && (t.uniforms.bowMorphAmount.value = this.lastFireAmount01)
    }
}
const statClassConfigs = new Map;
statClassConfigs.set("movementSpeed", {
    icon: "static/img/menuUI/shop/classIcons/movementSpeed.svg",
    uiName: "Movement Speed",
    defaultValue: 30,
    min: 30,
    max: 30
});
statClassConfigs.set("armorStrength", {
    icon: "static/img/menuUI/shop/classIcons/armorStrength.svg",
    uiName: "Damage Protection",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("healthRegenSpeed", {
    icon: "static/img/menuUI/shop/classIcons/healthRegenSpeed.svg",
    uiName: "Health Regen Speed",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("shootingFocus", {
    icon: "static/img/menuUI/shop/classIcons/shootingFocus.svg",
    uiName: "Focus",
    defaultValue: 10,
    min: 10,
    max: 10
});
statClassConfigs.set("bowAttackStrength", {
    icon: "static/img/menuUI/shop/classIcons/bowAttackStrength.svg",
    uiName: "Attack Strength",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("arrowLoadingSpeed", {
    icon: "static/img/menuUI/shop/classIcons/arrowLoadingSpeed.svg",
    uiName: "Loading Speed",
    defaultValue: 10,
    min: 10,
    max: 10
});
statClassConfigs.set("arrowFlySpeed", {
    icon: "static/img/menuUI/shop/classIcons/arrowFlySpeed.svg",
    uiName: "Travel Speed",
    defaultValue: 5,
    min: 5,
    max: 5
});
statClassConfigs.set("arrowEnemyStun", {
    icon: "static/img/menuUI/shop/classIcons/arrowEnemyStun.svg",
    uiName: "Stun Enemy",
    defaultValue: 5,
    min: 5,
    max: 5
});
statClassConfigs.set("meleeAttackStrength", {
    icon: "static/img/menuUI/shop/classIcons/meleeAttackStrength.svg",
    uiName: "Strength",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("meleeAttackSpeed", {
    icon: "static/img/menuUI/shop/classIcons/meleeAttackSpeed.svg",
    uiName: "Speed",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("meleeAttackReach", {
    icon: "static/img/menuUI/shop/classIcons/meleeAttackReach.svg",
    uiName: "Reach",
    defaultValue: 255,
    min: 255,
    max: 255
});
statClassConfigs.set("bloodlust", {
    icon: "static/img/menuUI/shop/classIcons/bloodlust.svg",
    uiName: "Bloodlust",
    defaultValue: 255,
    min: 255,
    max: 255
});

class StatClassTooltip {
    constructor({zIndex: t, statClasses: e, aboveRect: i, showTotal: s}) {
        this.el = document.createElement("div"),
        this.el.classList.add("stat-class-tooltip", "transitioning", "wrinkledPaper"),
        this.el.style.setProperty("--wrinkled-paper-seed", String(randInt(1, 99999))),
        this.el.style.zIndex = String(t),
        document.body.appendChild(this.el);
        const n = document.createElement("ul");
        this.el.appendChild(n);
        for (const [t,i] of statClassConfigs) {
            const a = e[t] || 0;
            if (!s && 0 == a)
                continue;
            const o = document.createElement("li");
            n.appendChild(o);
            const r = document.createElement("span");
            let l;
            if (r.classList.add("stat-class-icon"),
            r.style.backgroundImage = `url("${i.icon}")`,
            o.appendChild(r),
            s) {
                const t = Math.min(a + i.defaultValue, i.max);
                l = `${i.uiName}: ${t}/${i.max}`
            } else
                l = `+${a} ${i.uiName}`;
            const h = document.createTextNode(l);
            o.appendChild(h)
        }
        this.el.style.left = i.left + i.width / 2 + "px",
        this.el.style.top = i.top + "px",
        getComputedStyle(this.el).left,
        this.el.classList.remove("transitioning")
    }
    destructor() {
        this.el.remove()
    }
}
class ShopItem {
    constructor(t, {configIndex: e=0, usage: i="shop", renderOptions: s, dialog: n, scrollingContainer: a}) {
        if (this.configIndex = e,
        this.config = t,
        this.usage = i,
        this.renderOptions = s,
        this.dialog = n,
        this.destructed = !1,
        "shop" == i)
            this.el = document.createElement("button");
        else {
            if ("confirmPurchase" != i)
                throw new Error(`Unknown usage: ${i}`);
            this.el = document.createElement("div")
        }
        this.el.classList.add("shopItem", "wrinkledPaper", "shopItemUsage-" + i),
        t.preventUnequip && this.el.classList.add("preventUnequip"),
        this.el.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        this.onSelectedChangeRequestCbs = new Set,
        this.statsTooltip = null,
        this.onHoveringChangeCbs = new Set,
        this.selected = !1,
        this.owned = !1,
        this.isHovering = !1,
        this.isLooping = !1,
        this.shouldStopLooping = !1,
        this.prevNow = 0,
        this.boundAnimationLoop = this.animationLoop.bind(this),
        this.el.addEventListener("pointerenter", (()=>{
            this.setIsHovering(!0),
            this.addStatsTooltip()
        }
        )),
        this.el.addEventListener("pointerleave", (()=>{
            this.setIsHovering(!1),
            this.removeStatsTooltip()
        }
        )),
        this.boundRemoveStatsTooltip = this.removeStatsTooltip.bind(this),
        this.scrollingContainer = a,
        a && a.addEventListener("scroll", this.boundRemoveStatsTooltip),
        this.el.addEventListener("click", (()=>{
            "confirmPurchase" != this.usage && (this.owned || this.selected ? this.requestSelectedState(!this.selected) : this.openConfirmPurchaseDialog())
        }
        )),
        this.onConfirmPurchaseDialogOpenCbs = new Set;
        this.renderView = getMainInstance().renderer.createRenderView({
            width: 200,
            height: 200
        }),
        (this.config.meleeSkin || this.config.bowSkin) && this.renderView.canvas.classList.add("needs-mask"),
        this.el.appendChild(this.renderView.canvas),
        this.cam = new PerspectiveCamera,
        this.cam.name = "cam",
        this.cam.far = 10,
        this.camTarget = new Object3D,
        this.camTarget.name = "cam target",
        this.rotY = 0,
        this.defaultRotY = 0,
        this.setDefaultRotY(.2 * Math.PI),
        this.camTarget.add(this.cam),
        this.scene = new Scene,
        this.scene.add(this.camTarget),
        this.renderView.setRenderObjects(this.scene, this.cam, !1),
        this.skeleton = new PlayerSkeleton({
            gender: this.renderOptions.gender
        }),
        this.skeleton.addPoseLayer("shopItem"),
        this.loadingModelSym = null,
        this.loadingModel = null,
        this.visibleModel = null,
        this.skinObject = null,
        this.bowAsset = null,
        this.skinObjectAsset = null,
        this.currencyWrapperEl = null,
        this.currencyContainer = null,
        "shop" == i ? this.setOwned(!this.config.price && !this.config.hasRewardedAd) : this.setOwned(!0),
        this.lockEl = document.createElement("div"),
        this.lockEl.classList.add("shopItemLock"),
        this.lockEl.classList.toggle("rewarded-break-unlockable", this.config.hasRewardedAd || !1),
        this.el.appendChild(this.lockEl),
        this.elementVisible = !1,
        this.skinObjectDirty = !0,
        this.intersectionObserver = new IntersectionObserver((t=>{
            this.elementVisible = !1;
            for (const e of t)
                e.target == this.el && e.isIntersecting && (this.elementVisible = !0);
            this.elementVisible && this.reloadSkinObjectNow()
        }
        )),
        this.intersectionObserver.observe(this.el),
        this.setSelectedState(this.selected),
        this.setOwned(this.owned),
        "confirmPurchase" == this.usage && this.startLooping(),
        this.updateAriaLabel()
    }
    get id() {
        return this.config.id
    }
    destructor() {
        this.destructed = !0,
        getMainInstance().renderer.removeRenderView(this.renderView),
        this.loadingModel && this.loadingModel.destructor(),
        this.visibleModel && this.visibleModel.destructor(),
        this.bowAsset && this.bowAsset.destructor(),
        this.stopLooping(),
        this.intersectionObserver.unobserve(this.el),
        this.intersectionObserver.disconnect(),
        this.removeStatsTooltip(),
        this.scrollingContainer && this.scrollingContainer.removeEventListener("scroll", this.boundRemoveStatsTooltip)
    }
    setRenderOptions(t) {
        this.renderOptions = t,
        this.skinObjectDirty = !0,
        this.elementVisible && this.reloadSkinObjectNow()
    }
    setDefaultRotY(t) {
        this.defaultRotY = t,
        this.camTarget.rotation.set(-.1 * Math.PI, this.defaultRotY, 0, "YZX")
    }
    async reloadSkinObjectNow() {
        if (!this.skinObjectDirty)
            return;
        const t = Symbol("Loading model");
        this.loadingModelSym = t,
        this.loadingModel && (this.loadingModel.destructor(),
        this.loadingModel = null);
        let e = new Sphere;
        if (this.bowAsset && this.bowAsset.destructor(),
        this.skinObjectAsset && this.skinObjectAsset.destructor(),
        this.config.bowSkin) {
            const {skins: i, arrowSkin: s} = getMainInstance().skins.skinNetworkDataToBowAssetData(this.config.bowSkin.bowId, {
                equippedSkinIds: [this.config.id]
            });
            if (this.bowAsset = new BowAssetLoader({
                useWorldWeather: !1
            }),
            this.bowAsset.setConfig({
                bowId: this.config.bowSkin.bowId,
                teamId: 1,
                skins: i,
                arrowSkin: s,
                arrowCount: 0
            }),
            this.config.categories) {
                let t = !1;
                const e = ["smallBowHandle", "mediumBowHandle", "largeBowHandle"];
                for (const i of this.config.categories)
                    if (e.includes(i)) {
                        t = !0;
                        break
                    }
                t && this.bowAsset.obj.rotateZ(-.4)
            }
            if (this.scene.add(this.bowAsset.obj),
            await this.bowAsset.waitForLoad(),
            t != this.loadingModelSym)
                return;
            e = computeApproximateBoundingSphere(this.bowAsset.obj)
        } else if (this.config.meleeSkin) {
            if (getMainInstance().skins.skinNetworkDataToMeleeSkinConfig({
                equippedSkinIds: [this.config.id]
            })) {
                if (this.skinObjectAsset = new ConfigObjectAssetLoader({
                    useWorldWeather: !1,
                    label: "melee"
                }),
                this.skinObjectAsset.setConfig({
                    skinAssetName: this.config.meleeSkin.skin,
                    teamId: 1
                }),
                this.scene.add(this.skinObjectAsset.obj),
                await this.skinObjectAsset.waitForLoad(),
                t != this.loadingModelSym)
                    return;
                e = computeApproximateBoundingSphere(this.skinObjectAsset.obj)
            }
        } else if (this.config.arrowSkin) {
            if (this.skinObjectAsset = new ConfigObjectAssetLoader({
                useWorldWeather: !1,
                label: "arrow"
            }),
            this.skinObjectAsset.setConfig({
                skinAssetName: this.config.arrowSkin,
                teamId: 1
            }),
            this.scene.add(this.skinObjectAsset.obj),
            this.skinObjectAsset.obj.position.add(new Vector3(0,.35,.35)),
            this.skinObjectAsset.obj.rotateX(-.25 * Math.PI),
            await this.skinObjectAsset.waitForLoad(),
            t != this.loadingModelSym)
                return;
            e = new Sphere(new Vector3,.4),
            this.setDefaultRotY(.5 * Math.PI)
        } else {
            const i = []
              , s = this.config.colorizableCategory;
            let n = {};
            if ("male" == this.renderOptions.gender && this.config.maleSkin ? n = this.config.maleSkin : "female" == this.renderOptions.gender && this.config.femaleSkin && (n = this.config.femaleSkin),
            s && n.additions)
                for (const [t,e] of Object.entries(n.additions)) {
                    const s = t;
                    for (const t of e)
                        i.push({
                            assetName: t,
                            colorMultiplier: this.renderOptions.colorMultiplier,
                            joints: [s]
                        })
                }
            let a = {};
            if (n.additions && (a = n.additions),
            this.config.showFullBodyInShopItem) {
                a = getMainInstance().skins.skinNetworkDataToSkinConfig({
                    equippedSkinIds: [this.config.id],
                    gender: this.renderOptions.gender
                }).equippedItems
            }
            if (this.loadingModel = new PlayerModel({
                init: !1,
                skinObjectOpts: {
                    teamId: 1,
                    skin: {},
                    rawSkin: {
                        colorizedItems: i,
                        equippedItems: a
                    }
                },
                useWorldWeather: !1
            }),
            await this.loadingModel.init(),
            await this.skeleton.init(),
            await this.skeleton.waitForLinkLayerObjects(),
            !this.loadingModel.obj)
                return;
            if (t != this.loadingModelSym)
                return;
            this.skinObject && this.scene.remove(this.skinObject),
            this.skinObject = this.loadingModel.obj,
            this.visibleModel && this.visibleModel.destructor(),
            this.visibleModel = this.loadingModel,
            this.loadingModel = null,
            this.skeleton.applyLayers(),
            this.skeleton.updateMatrices(),
            this.visibleModel.applySkeleton(this.skeleton),
            e = this.visibleModel.computeApproximateBoundingSphere(),
            this.scene.add(this.skinObject)
        }
        if (e) {
            let t = 0
              , i = 0
              , s = 1
              , n = !1;
            if (this.config.bowSkin) {
                const e = this.config.categories;
                e && (e.includes("smallBowTip") ? (t = .55,
                s = .3) : e.includes("smallBowHandle") ? (i = .05,
                s = .5) : e.includes("mediumBowTip") ? (t = .7,
                s = .3) : e.includes("mediumBowHandle") ? (i = .08,
                s = .7) : e.includes("largeBowTip") ? (t = 1,
                s = .3) : e.includes("largeBowHandle") ? (i = .1,
                s = .7) : e.includes("repeatingCrossbowTip") ? (i = .3,
                s = .6) : e.includes("repeatingCrossbowHandle") ? (i = .15,
                s = .7) : e.includes("largeCrossbowTip") ? (i = .3,
                s = .7) : e.includes("largeCrossbowHandle") && (s = .7))
            } else if (this.config.meleeSkin) {
                const e = this.config.meleeSkin.meleeId;
                "bluntLight" == e ? (t = .2,
                s = .6) : "bluntHeavy" == e ? (t = .45,
                s = .4) : "pokeLight" == e ? (t = .3,
                s = .4) : "pokeHeavy" == e && (t = .6,
                s = .5),
                n = !0
            }
            this.camTarget.position.copy(e.center),
            this.camTarget.position.y += t,
            this.camTarget.position.z += i,
            this.cam.position.z = 3 * Math.max(e.radius, .05) * s,
            n && this.cam.rotateZ(.25 * -Math.PI)
        }
        this.renderView.markDirty(),
        this.skinObjectDirty = !1
    }
    onSelectedChangeRequest(t) {
        this.onSelectedChangeRequestCbs.add(t)
    }
    setOwned(t) {
        this.owned = t,
        this.el.classList.toggle("shopItemOwned", t),
        this.el.classList.toggle("shopItemLocked", !t),
        t || !this.config.price ? this.currencyWrapperEl && this.currencyWrapperEl.remove() : this.currencyWrapperEl || (this.currencyWrapperEl = document.createElement("div"),
        this.currencyWrapperEl.classList.add("currency-wrapper"),
        this.el.appendChild(this.currencyWrapperEl),
        this.currencyContainer = new CurrencyContainer({
            amount: this.config.price
        }),
        this.currencyWrapperEl.appendChild(this.currencyContainer.el))
    }
    setIsHovering(t) {
        if (t != this.isHovering) {
            this.isHovering = t,
            t && this.startLooping();
            for (const e of this.onHoveringChangeCbs)
                e(t)
        }
    }
    startLooping() {
        this.isLooping || (this.isLooping = !0,
        this.renderView.alwaysDirty = !0,
        this.animationLoop())
    }
    stopLooping() {
        this.shouldStopLooping = !0
    }
    animationLoop() {
        const t = performance.now();
        this.prevNow || (this.prevNow = t);
        const e = t - this.prevNow;
        if (this.prevNow = t,
        this.isHovering || "confirmPurchase" == this.usage ? (this.rotY -= .001 * e,
        this.rotY = mod(this.rotY + Math.PI, 2 * Math.PI) - Math.PI) : (this.rotY = lerp(this.rotY, 0, .1),
        Math.abs(this.rotY) < .001 && this.stopLooping()),
        this.camTarget.rotation.y = this.rotY + this.defaultRotY,
        this.shouldStopLooping)
            return this.isLooping = !1,
            this.shouldStopLooping = !1,
            this.prevNow = 0,
            void (this.renderView && (this.renderView.alwaysDirty = !1));
        window.requestAnimationFrame(this.boundAnimationLoop)
    }
    onHoveringChange(t) {
        this.onHoveringChangeCbs.add(t)
    }
    addStatsTooltip() {
        if (this.statsTooltip)
            return;
        if ("shop" != this.usage)
            return;
        const t = this.dialog.zIndex + 1;
        if (!this.config.statClasses)
            return;
        const e = this.el.getBoundingClientRect();
        this.statsTooltip = new StatClassTooltip({
            zIndex: t,
            statClasses: this.config.statClasses,
            aboveRect: e
        })
    }
    removeStatsTooltip() {
        this.statsTooltip && (this.statsTooltip.destructor(),
        this.statsTooltip = null)
    }
    setSelectedState(t) {
        this.selected = t,
        this.el.classList.toggle("selected", this.selected),
        this.updateAriaLabel()
    }
    updateAriaLabel() {
        let t = "";
        if ("shop" == this.usage) {
            let e = "";
            e = this.selected ? "equipped" : this.owned ? "not equipped" : this.config.hasRewardedAd ? "locked, click to watch rewarded ad and unlock" : this.config.price ? `locked, unlock for ${this.config.price} coins` : "locked",
            t = `Shop item, ${this.config.id}, ${e}`
        } else
            "confirmPurchase" == this.usage && (t = "Shop item preview");
        this.el.setAttribute("aria-label", t)
    }
    *getSkinSlots() {
        this.config.slots && (yield*this.config.slots)
    }
    highlight() {
        this.el.classList.add("highlight"),
        this.el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        })
    }
    openConfirmPurchaseDialog() {
        const t = new ConfirmItemPurchaseDialogUi(this.config,{
            renderOptions: this.renderOptions
        });
        getMainInstance().dialogManager.addDialog(t),
        t.onPurchaseSuccess((()=>{
            this.requestSelectedState(!0)
        }
        )),
        this.onConfirmPurchaseDialogOpenCbs.forEach((e=>e(t)))
    }
    requestSelectedState(t) {
        this.config.preventUnequip && !t || this.onSelectedChangeRequestCbs.forEach((e=>e(t)))
    }
    onConfirmPurchaseDialogOpen(t) {
        this.onConfirmPurchaseDialogOpenCbs.add(t)
    }
}
class ShopItemsGridView {
    constructor() {
        this.el = document.createElement("div"),
        this.el.classList.add("shop-items-grid-view"),
        this.shopItems = new Map,
        this.activeConfirmPurchaseDialogs = new Set,
        this.currentHoveringItem = null,
        this.onHoveringItemChangeCbs = new Set,
        this.onSelectedItemChangeRequestCbs = new Set
    }
    destructor() {
        this.destructShopItems()
    }
    addShopItem(t, e) {
        const i = new ShopItem(t,e);
        this.el.appendChild(i.el),
        i.onHoveringChange((t=>{
            const e = this.currentHoveringItem;
            if (t ? this.currentHoveringItem = i : this.currentHoveringItem == i && (this.currentHoveringItem = null),
            this.currentHoveringItem != e)
                for (const t of this.onHoveringItemChangeCbs)
                    t(this.currentHoveringItem)
        }
        )),
        i.onConfirmPurchaseDialogOpen((t=>{
            this.activeConfirmPurchaseDialogs.add(t),
            t.addOnCloseCb((()=>{
                this.activeConfirmPurchaseDialogs.delete(t)
            }
            ))
        }
        )),
        i.onSelectedChangeRequest((t=>{
            this.onSelectedItemChangeRequestCbs.forEach((e=>e(i.id, t)))
        }
        )),
        this.shopItems.set(i.id, i)
    }
    closeCreatedConfirmPurchaseDialogs() {
        for (const t of this.activeConfirmPurchaseDialogs)
            t.close()
    }
    destructShopItems() {
        for (const t of this.shopItems.values())
            t.destructor();
        for (this.shopItems.clear(); this.el.lastChild; )
            this.el.removeChild(this.el.lastChild)
    }
    loadShopItems(t, e) {
        this.destructShopItems();
        for (const [i,s] of t.entries())
            this.addShopItem(s, {
                configIndex: i,
                ...e
            });
        this.sortShopItems()
    }
    setRenderOptions(t) {
        for (const e of this.shopItems.values())
            e.setRenderOptions(t)
    }
    setSelectedItems(t) {
        for (const e of this.shopItems.values())
            e.setSelectedState(t.has(e.id))
    }
    setSelectedItemState(t, e) {
        const i = this.shopItems.get(t);
        i && i.setSelectedState(e)
    }
    onSelectedItemChangeRequest(t) {
        this.onSelectedItemChangeRequestCbs.add(t)
    }
    setPurchasedItems(t) {
        for (const e of this.shopItems.values())
            (e.config.price && e.config.price > 0 || e.config.hasRewardedAd) && e.setOwned(t.has(e.id));
        this.sortShopItems()
    }
    markItemAsPurchased(t) {
        const e = this.shopItems.get(t);
        e && e.setOwned(!0)
    }
    onHoveringItemChange(t) {
        this.onHoveringItemChangeCbs.add(t)
    }
    sortShopItems() {
        const t = Array.from(this.shopItems.values());
        t.sort(((t,e)=>{
            if (t.owned && !e.owned)
                return -1;
            if (!t.owned && e.owned)
                return 1;
            const i = t.config.price || 0
              , s = e.config.price || 0;
            return i != s ? i - s : t.configIndex - e.configIndex
        }
        ));
        for (const e of t)
            this.el.appendChild(e.el)
    }
    performHighlightShopItemAction(t, e) {
        const i = this.shopItems.get(t);
        i && (i.highlight(),
        "highlight" == e || ("highlight-and-equip" == e ? i.requestSelectedState(!0) : "open" == e && i.openConfirmPurchaseDialog()))
    }
}
class SkinDownloaderDialogUi extends DialogUi {
    constructor(t, e, i) {
        super(),
        this.avatarsManager = t,
        this.contentEl = document.createElement("div"),
        this.contentEl.classList.add("skin-downloader-dialog-content"),
        this.el.appendChild(this.contentEl);
        const s = document.createElement("div");
        s.classList.add("skin-downloader-dialog-controls"),
        this.contentEl.appendChild(s);
        const n = document.createElement("div");
        n.textContent = "Team color ",
        s.appendChild(n),
        this.teamColorInput = document.createElement("input"),
        this.teamColorInput.type = "color",
        this.teamColorInput.value = teamColors[1].cssColor,
        this.teamColorInput.addEventListener("change", (()=>this.reloadPreview())),
        n.appendChild(this.teamColorInput);
        const a = document.createElement("div");
        a.textContent = "Background color ",
        s.appendChild(a),
        this.backgroundColorInput = document.createElement("input"),
        this.backgroundColorInput.type = "color",
        this.backgroundColorInput.value = teamColors[2].cssColor,
        this.backgroundColorInput.addEventListener("change", (()=>this.reloadPreview())),
        a.appendChild(this.backgroundColorInput);
        const o = document.createElement("div");
        o.textContent = "Background opacity ",
        s.appendChild(o),
        this.backgroundOpacityInput = document.createElement("input"),
        this.backgroundOpacityInput.type = "range",
        this.backgroundOpacityInput.min = "0",
        this.backgroundOpacityInput.max = "1",
        this.backgroundOpacityInput.step = "0.01",
        this.backgroundOpacityInput.value = "1",
        this.backgroundOpacityInput.addEventListener("change", (()=>this.reloadPreview())),
        o.appendChild(this.backgroundOpacityInput);
        const r = document.createElement("div");
        r.textContent = "Shape ",
        s.appendChild(r),
        this.shapeInput = document.createElement("select");
        for (const t of ["none", "circle"]) {
            const e = document.createElement("option");
            e.value = t,
            e.textContent = t,
            this.shapeInput.appendChild(e)
        }
        this.shapeInput.value = "circle",
        this.shapeInput.addEventListener("change", (()=>this.reloadPreview())),
        r.appendChild(this.shapeInput);
        const l = document.createElement("div");
        l.textContent = "Camera ",
        s.appendChild(l),
        this.cameraInput = document.createElement("select");
        for (const t of ["face-close", "face", "upper-body", "full-body"]) {
            const e = document.createElement("option");
            e.value = t,
            e.textContent = t.replaceAll("-", " "),
            this.cameraInput.appendChild(e)
        }
        this.cameraInput.value = "face-close",
        this.cameraInput.addEventListener("change", (()=>this.reloadPreview())),
        l.appendChild(this.cameraInput);
        const h = document.createElement("div");
        h.textContent = "Pose ",
        s.appendChild(h),
        this.poseInput = document.createElement("select");
        const d = [];
        d.push(["", "None"]);
        for (const {uiName: t, id: e} of classConfigs)
            d.push([e, t]);
        for (const [t,e] of d) {
            const i = document.createElement("option");
            i.value = t,
            i.textContent = e,
            this.poseInput.appendChild(i)
        }
        this.poseInput.value = "",
        this.poseInput.addEventListener("change", (()=>this.reloadPreview())),
        h.appendChild(this.poseInput);
        const c = document.createElement("div");
        c.textContent = "Size ",
        s.appendChild(c),
        this.widthInput = document.createElement("input"),
        this.widthInput.classList.add("skin-downloader-size-input"),
        this.widthInput.type = "number",
        this.widthInput.value = "1024",
        c.appendChild(this.widthInput),
        c.appendChild(document.createTextNode(" x ")),
        this.heightInput = document.createElement("input"),
        this.heightInput.classList.add("skin-downloader-size-input"),
        this.heightInput.type = "number",
        this.heightInput.value = "1024",
        c.appendChild(this.heightInput);
        const u = document.createElement("div");
        u.classList.add("skin-downloader-download-container"),
        s.appendChild(u);
        const p = new UiButton({
            text: "Download",
            onClick: ()=>this.downloadCurrentAvatar()
        });
        u.appendChild(p.el),
        this.imageEl = document.createElement("div"),
        this.imageEl.classList.add("downloadable-skin-preview"),
        this.contentEl.appendChild(this.imageEl),
        this.currentBlobReference = null,
        this.createdDownloadBlobReferences = [],
        this.skinConfig = i,
        this.reloadPreview()
    }
    destructor() {
        super.destructor(),
        this.currentBlobReference && (this.currentBlobReference.destructor(),
        this.currentBlobReference = null);
        for (const t of this.createdDownloadBlobReferences)
            t.destructor();
        this.createdDownloadBlobReferences = []
    }
    getCurrentAvatarConfig(t, e) {
        const i = this.shapeInput.value ?? "none"
          , s = this.cameraInput.value ?? "face-close"
          , n = this.teamColorInput.value
          , a = {
            r: parseInt(n.substring(1, 3), 16) / 255,
            g: parseInt(n.substring(3, 5), 16) / 255,
            b: parseInt(n.substring(5, 7), 16) / 255
        };
        let o = null
          , r = null;
        if (this.poseInput.value) {
            const t = getClassConfigById(this.poseInput.value);
            o = [`bows/${t.bowId}/shopClassItem`];
            const {skins: e, arrowSkin: i} = getMainInstance().skins.skinNetworkDataToBowAssetData(t.bowId, this.skinConfig);
            r = {
                teamId: 1,
                teamColor: a,
                bowId: t.bowId,
                arrowCount: 1,
                skins: e,
                arrowSkin: i
            }
        }
        const l = {
            backgroundColor: this.backgroundColorInput.value,
            backgroundAlpha: Number(this.backgroundOpacityInput.value),
            width: t,
            height: e,
            cameraType: s,
            clipPathType: i,
            bow: r,
            skinObjectOpts: {
                teamColor: a,
                skin: this.skinConfig
            }
        };
        return o && (l.skeletonPoseLayers = o),
        l
    }
    reloadPreview() {
        if (!this.skinConfig)
            return;
        const t = 250 * globalThis.devicePixelRatio
          , e = this.getCurrentAvatarConfig(t, t)
          , i = this.avatarsManager.getAvatar(e).getBlobUrlReference();
        this.currentBlobReference && this.currentBlobReference.destructor(),
        this.currentBlobReference = i,
        (async()=>{
            if (i != this.currentBlobReference)
                return void i.destructor();
            const t = await i.getBlobUrl();
            this.imageEl.style.backgroundImage = `url("${t}")`
        }
        )()
    }
    downloadCurrentAvatar() {
        if (!this.skinConfig)
            return;
        const t = Number(this.widthInput.value)
          , e = Number(this.heightInput.value)
          , i = this.getCurrentAvatarConfig(t, e)
          , s = this.avatarsManager.getAvatar(i).getBlobUrlReference();
        this.createdDownloadBlobReferences.push(s),
        (async()=>{
            const t = await s.getBlobUrl()
              , e = document.createElement("a");
            e.href = t,
            e.download = "skin.png",
            e.click()
        }
        )()
    }
}
class ShopSkinPreview {
    constructor() {
        this.destructed = !1,
        this.el = document.createElement("div"),
        this.el.classList.add("shopSkinPreview", "wrinkledPaper", "wrinkled-paper-mask"),
        this.currentlyLoadedSkinData = null,
        this.currentTeamId = 1,
        this.el.addEventListener("click", (()=>{
            this.currentTeamId++,
            this.currentTeamId > 2 && (this.currentTeamId = 0),
            this.updateBackgroundColor(),
            this.updateSkinModel()
        }
        )),
        this.statsTooltip = null,
        this.el.addEventListener("pointerenter", (()=>{
            if (this.statsTooltip)
                return;
            if (!this.currentlyLoadedSkinData)
                return;
            const t = this.el.getBoundingClientRect()
              , e = getMainInstance().skins.getStatClassValuesFromShopSkinIds(this.currentlyLoadedSkinData.equippedSkinIds || [])
              , i = {};
            for (const [t,s] of e)
                i[t] = s;
            this.statsTooltip = new StatClassTooltip({
                zIndex: 1e3,
                statClasses: i,
                aboveRect: t,
                showTotal: !0
            })
        }
        )),
        this.el.addEventListener("pointerleave", (()=>{
            this.statsTooltip && (this.statsTooltip.destructor(),
            this.statsTooltip = null)
        }
        )),
        this.renderView = getMainInstance().renderer.createRenderView({
            width: 200,
            height: 300
        }),
        this.renderView.canvas.classList.add("shop-skin-preview-canvas"),
        this.el.appendChild(this.renderView.canvas),
        this.downloadButton = document.createElement("div"),
        this.downloadButton.classList.add("shop-skin-preview-download-button"),
        this.downloadButton.addEventListener("click", (()=>{
            if (this.currentlyLoadedSkinData) {
                const t = new SkinDownloaderDialogUi(getMainInstance().avatars,getMainInstance().skins,this.currentlyLoadedSkinData);
                getMainInstance().dialogManager.addDialog(t)
            }
        }
        )),
        this.el.appendChild(this.downloadButton),
        this.cam = new PerspectiveCamera(45,200 / 300,.1,5),
        this.cam.far = 10,
        this.camTarget = new Object3D,
        this.rotY = 0,
        this.currentMouseYMultiplier = 1,
        this.camTarget.add(this.cam),
        this.scene = new Scene,
        this.scene.add(this.camTarget),
        this.modelRotationContainer = new Object3D,
        this.scene.add(this.modelRotationContainer),
        this.bowParentObj = new Object3D,
        this.modelRotationContainer.add(this.bowParentObj),
        this.bowParentObj.matrixAutoUpdate = !1,
        this.meleeParentObj = new Object3D,
        this.modelRotationContainer.add(this.meleeParentObj),
        this.meleeParentObj.matrixAutoUpdate = !1,
        this.smoothCamPosOffset = new Vector3,
        this.smoothCamTargetRot = 0,
        this.activeCamFollowingTarget = null,
        this.activeSlotPositionId = null,
        this.camPositions = new Map,
        this.camPositions.set("full", {
            pos: new Vector3(0,1,2.8)
        }),
        this.camPositions.set("head", {
            pos: new Vector3(0,1.8,1.3),
            mouseYMultiplier: .2
        }),
        this.camPositions.set("torso", {
            pos: new Vector3(0,1.1,1.7)
        }),
        this.camPositions.set("arms", {
            pos: new Vector3(0,1.3,1.5),
            rot: .3,
            mouseYMultiplier: .5
        }),
        this.camPositions.set("legs", {
            pos: new Vector3(0,.35,1.3)
        }),
        this.camPositions.set("quiver", {
            pos: new Vector3(0,1.1,2),
            rot: -2.5
        }),
        this.camPositions.set("face", {
            pos: new Vector3(0,1.75,.6),
            rot: .2,
            mouseYMultiplier: .1
        }),
        this.camPositions.set("smallBow", {
            pos: new Vector3(-.3,0,1.9),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("smallBowHandle", {
            pos: new Vector3(0,0,1.1),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("smallBowTip", {
            pos: new Vector3(-.3,.4,.8),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("mediumBow", {
            pos: new Vector3(-.3,0,2.2),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("mediumBowHandle", {
            pos: new Vector3(-.1,0,1.5),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("mediumBowTip", {
            pos: new Vector3(-.2,.5,1),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("largeBow", {
            pos: new Vector3(-.3,0,3),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("largeBowHandle", {
            pos: new Vector3(-.1,0,1.8),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("largeBowTip", {
            pos: new Vector3(-.3,.9,1.2),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("smallCrossbow", {
            pos: new Vector3(.1,0,1.9),
            activeFollowingTarget: this.bowParentObj,
            rot: -.3 * Math.PI
        }),
        this.camPositions.set("smallCrossbowHandle", {
            pos: new Vector3(.1,0,1.2),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("smallCrossbowTip", {
            pos: new Vector3(0,0,1.7),
            activeFollowingTarget: this.bowParentObj,
            rot: .3
        }),
        this.camPositions.set("largeCrossbow", {
            pos: new Vector3(0,0,2.7),
            activeFollowingTarget: this.bowParentObj,
            rot: -.3 * Math.PI
        }),
        this.camPositions.set("largeCrossbowHandle", {
            pos: new Vector3(0,0,2.5),
            activeFollowingTarget: this.bowParentObj,
            rot: -.5 * Math.PI
        }),
        this.camPositions.set("largeCrossbowTip", {
            pos: new Vector3(-.1,0,2.2),
            activeFollowingTarget: this.bowParentObj,
            rot: .7
        }),
        this.camPositions.set("melee", {
            pos: new Vector3(.3,.5,2),
            activeFollowingTarget: this.meleeParentObj,
            rot: -1.7
        }),
        this.camPositions.set("arrow", {
            pos: new Vector3(0,0,1),
            activeFollowingTarget: this.bowParentObj,
            rot: .9
        }),
        this.setActiveSlotPosition("full", !0),
        this.renderView.setRenderObjects(this.scene, this.cam),
        this.boundOnMouseMove = this.onMouseMove.bind(this),
        window.addEventListener("mousemove", this.boundOnMouseMove),
        this.lastMouseX = 0,
        this.lastMouseY = 0,
        this.skeleton = new PlayerSkeleton,
        this.skeleton.init(),
        this.activeExtraPoseLayer = null,
        this.bowAssetLoader = new BowAssetLoader({
            useWorldWeather: !1
        }),
        this.bowAssetLoader.updateFireAmount(1, 1),
        this.hoveringBowAssetLoader = new BowAssetLoader({
            useWorldWeather: !1
        }),
        this.hoveringBowAssetLoader.updateFireAmount(1, 1),
        this.bowParentObj.add(this.bowAssetLoader.obj),
        this.bowParentObj.add(this.hoveringBowAssetLoader.obj),
        this.bowSkeletonObj = null,
        this.currentVisibleBowId = null,
        this.currentEquippedSkinIds = [],
        this.hoveringBowVisible = !1,
        this.meleeAssetLoader = new ConfigObjectAssetLoader({
            useWorldWeather: !1,
            label: "melee"
        }),
        this.hoveringMeleeAssetLoader = new ConfigObjectAssetLoader({
            useWorldWeather: !1,
            label: "melee"
        }),
        this.meleeParentObj.add(this.meleeAssetLoader.obj),
        this.meleeParentObj.add(this.hoveringMeleeAssetLoader.obj),
        this.meleeSkeletonObj = null,
        this.currentVisibleMeleeSkinAssetName = null,
        this.hoveringMeleeVisible = !1,
        this.activeModel = null,
        this.loadingModel = null,
        this.hoveringModel = null,
        this.hoveringModelVisible = !1,
        this.lastHoveringModelCacheKey = "",
        this.initSkeleton(),
        this.updateSkinModel(),
        this.updateBackgroundColor()
    }
    destructor() {
        this.destructed = !0,
        this.bowAssetLoader.destructor(),
        this.hoveringBowAssetLoader.destructor(),
        this.meleeAssetLoader.destructor(),
        this.hoveringMeleeAssetLoader.destructor(),
        getMainInstance().renderer.removeRenderView(this.renderView),
        this.removeModel(this.activeModel),
        this.activeModel = null,
        this.removeModel(this.loadingModel),
        this.loadingModel = null,
        this.removeModel(this.hoveringModel),
        this.hoveringModel = null,
        window.removeEventListener("mousemove", this.boundOnMouseMove)
    }
    async initSkeleton() {
        await this.skeleton.waitForLoad();
        const t = this.skeleton.addPoseLayer("shopPreview");
        if (await t.waitForObjectLinks(),
        this.skeleton.applyLayers(),
        this.skeleton.updateMatrices(),
        this.updateModelRotation(),
        !this.skeleton.baseSkeletonObject)
            throw new Error("Assertion failed, skeleton is not initialized");
        const e = this.skeleton.baseSkeletonObject.getObjectByName("bowHoldingPos");
        if (!e)
            throw new Error("Assertion failed, bow holding pos object not found");
        this.bowSkeletonObj = e;
        const i = this.skeleton.baseSkeletonObject.getObjectByName("meleeHoldingPos");
        if (!i)
            throw new Error("Assertion failed, melee holding pos object not found");
        this.meleeSkeletonObj = i
    }
    async addModel(t) {
        t && (await t.waitForInit(),
        t.obj && this.modelRotationContainer.add(t.obj))
    }
    removeModel(t) {
        t && (t.obj && this.modelRotationContainer.remove(t.obj),
        t.destructor())
    }
    loop(t, e) {
        let i = !1;
        this.cam.position.distanceTo(this.smoothCamPosOffset) > .01 && (i = !0),
        this.cam.position.lerp(this.smoothCamPosOffset, .1);
        let s = new Vector3;
        this.activeCamFollowingTarget && (s = this.activeCamFollowingTarget.getWorldPosition(new Vector3));
        this.camTarget.position.distanceTo(s) > .01 && (i = !0),
        this.camTarget.position.lerp(s, .1);
        Math.abs(this.camTarget.rotation.y - this.smoothCamTargetRot) > .01 && (i = !0),
        this.camTarget.rotation.y = lerp(this.camTarget.rotation.y, this.smoothCamTargetRot, .1),
        i && this.renderView.markDirty()
    }
    setHoveringModel(t) {
        if (this.hoveringModelVisible = !1,
        t) {
            this.hoveringModelVisible = !0;
            const e = getMainInstance().skins.skinObjectOptsToCacheKey(t);
            this.lastHoveringModelCacheKey != e && (this.lastHoveringModelCacheKey = e,
            this.removeModel(this.hoveringModel),
            this.hoveringModel = null,
            t && (this.hoveringModel = new PlayerModel({
                skinObjectOpts: t,
                useWorldWeather: !1
            }),
            this.addModel(this.hoveringModel),
            this.updateVisibleModelAfterHoveringInit()))
        }
        if (this.updateVisibleModel(),
        this.hoveringBowVisible = !1,
        this.hoveringMeleeVisible = !1,
        t)
            if (this.currentVisibleBowId) {
                const {skins: e, arrowSkin: i} = getMainInstance().skins.skinNetworkDataToBowAssetData(this.currentVisibleBowId, t.skin);
                e.length > 0 && (this.hoveringBowAssetLoader.setConfig({
                    bowId: this.currentVisibleBowId,
                    arrowCount: 1,
                    skins: e,
                    arrowSkin: i,
                    teamId: this.currentTeamId
                }),
                (async()=>{
                    await this.hoveringBowAssetLoader.waitForLoad(),
                    this.updateVisibleBow()
                }
                )()),
                this.hoveringBowVisible = !0
            } else if (this.currentVisibleMeleeSkinAssetName) {
                const e = getMainInstance().skins.skinNetworkDataToMeleeSkinConfig(t.skin);
                e && (this.hoveringMeleeAssetLoader.setConfig({
                    skinAssetName: e.skin,
                    teamId: this.currentTeamId
                }),
                (async()=>{
                    await this.hoveringMeleeAssetLoader.waitForLoad(),
                    this.updateVisibleMelee()
                }
                )()),
                this.hoveringMeleeVisible = !0
            }
        this.updateVisibleBow(),
        this.updateVisibleMelee()
    }
    setHoveringShopItemId(t) {
        if (!this.currentlyLoadedSkinData)
            return;
        const e = {
            teamId: this.currentTeamId,
            skin: getMainInstance().skins.getConfigForPreviewShopItemId(this.currentlyLoadedSkinData, {
                itemId: t
            })
        };
        this.setHoveringModel(e)
    }
    setTemporaryColorCategory(t, e) {
        this.currentlyLoadedSkinData && this.setHoveringModel({
            teamId: this.currentTeamId,
            skin: getMainInstance().skins.getConfigForPreviewShopItemId(this.currentlyLoadedSkinData, {
                colorCategory: t,
                colorMultiplier: e
            })
        })
    }
    resetHoveringModel() {
        this.setHoveringModel(null)
    }
    async updateVisibleModelAfterHoveringInit() {
        this.hoveringModel && await this.hoveringModel.waitForInit(),
        this.updateVisibleModel()
    }
    updateSkinModel() {
        this.currentlyLoadedSkinData && this.setCurrentSkinConfig(this.currentlyLoadedSkinData)
    }
    setCurrentSkinConfig(t) {
        this.currentlyLoadedSkinData = t,
        this.removeModel(this.loadingModel),
        this.loadingModel = new PlayerModel({
            skinObjectOpts: {
                teamId: this.currentTeamId,
                skin: t
            },
            useWorldWeather: !1
        }),
        this.addModel(this.loadingModel),
        this.replaceLoadingModel(),
        this.currentEquippedSkinIds = t.equippedSkinIds || [],
        this.updateBowConfig(),
        this.updateMeleeConfig()
    }
    updateBackgroundColor() {
        const t = (this.currentTeamId + 1) % teamColors.length
          , e = teamColors[t];
        this.el.style.background = e.cssColor
    }
    async replaceLoadingModel() {
        this.loadingModel && (await this.loadingModel.waitForInit(),
        this.loadingModel && (this.removeModel(this.activeModel),
        this.activeModel = this.loadingModel,
        this.loadingModel = null,
        this.removeModel(this.hoveringModel),
        this.hoveringModel = null,
        this.updateVisibleModel()))
    }
    onMouseMove(t) {
        const e = t.clientX / window.innerWidth * 2 - 1
          , i = t.clientY / window.innerHeight * 2 - 1;
        this.lastMouseX = e,
        this.lastMouseY = i * this.currentMouseYMultiplier,
        this.updateModelRotation()
    }
    getVisibleModel() {
        return this.hoveringModel && this.hoveringModel.obj ? this.hoveringModel : this.activeModel && this.activeModel.obj ? this.activeModel : null
    }
    updateVisibleModel() {
        let t = !1;
        this.hoveringModel && this.hoveringModel.obj && (this.hoveringModel.obj.visible = this.hoveringModelVisible,
        t = this.hoveringModelVisible),
        this.activeModel && this.activeModel.obj && (this.activeModel.obj.visible = !t),
        this.updateSkeletonGender(),
        this.updateModelRotation()
    }
    updateVisibleBow() {
        const t = Boolean(this.currentVisibleBowId)
          , e = this.hoveringBowVisible && !this.hoveringBowAssetLoader.isLoadingAsset;
        this.bowAssetLoader.obj.visible = t && !e,
        this.hoveringBowAssetLoader.obj.visible = t && e
    }
    updateVisibleMelee() {
        const t = Boolean(this.currentVisibleMeleeSkinAssetName)
          , e = this.hoveringMeleeVisible && !this.hoveringMeleeAssetLoader.isLoadingAsset;
        this.meleeAssetLoader.obj.visible = t && !e,
        this.hoveringMeleeAssetLoader.obj.visible = t && e
    }
    async updateSkeletonGender() {
        const t = this.getVisibleModel();
        if (t) {
            const e = t.skinObjectOpts.skin.gender || "male";
            this.skeleton.gender != e && (this.skeleton.setGender(e),
            await this.skeleton.waitForLinkLayerObjects(),
            this.updateModelRotation())
        }
    }
    updateModelRotation() {
        const t = this.getVisibleModel();
        t && t.obj && (this.modelRotationContainer.rotation.y = this.lastMouseX,
        this.skeleton.isInit && this.skeleton.allObjectLinksBuilt && (this.skeleton.applyLayers(),
        this.skeleton.setLookRotY(this.lastMouseY, {}),
        this.skeleton.updateMatrices(),
        t.applySkeleton(this.skeleton),
        this.bowSkeletonObj && this.bowParentObj.matrix.copy(this.bowSkeletonObj.matrixWorld),
        this.meleeSkeletonObj && this.meleeParentObj.matrix.copy(this.meleeSkeletonObj.matrixWorld),
        this.renderView.markDirty()))
    }
    setActiveSlotPosition(t, e=!1) {
        this.activeSlotPositionId = t,
        this.activeCamFollowingTarget = null;
        const i = this.camPositions.get(t);
        i && (i.activeFollowingTarget && (this.activeCamFollowingTarget = i.activeFollowingTarget),
        i.pos && (this.smoothCamPosOffset.copy(i.pos),
        e && this.cam.position.copy(i.pos)),
        this.smoothCamTargetRot = i.rot || 0,
        void 0 !== i.mouseYMultiplier ? this.currentMouseYMultiplier = i.mouseYMultiplier : this.currentMouseYMultiplier = 1)
    }
    async setSkeletonPose(t) {
        let e = !1;
        if (this.activeExtraPoseLayer && (this.skeleton.removePoseLayer(this.activeExtraPoseLayer),
        e = !0),
        t) {
            const i = this.skeleton.addPoseLayer(t);
            if (this.activeExtraPoseLayer = i,
            await this.activeExtraPoseLayer.waitForObjectLinks(),
            this.activeExtraPoseLayer != i)
                return;
            e = !0
        }
        e && (await this.skeleton.waitForLoad(),
        this.skeleton.applyLayers(),
        this.skeleton.updateMatrices(),
        this.updateModelRotation())
    }
    setBow(t) {
        this.currentVisibleBowId = t,
        this.updateBowConfig(),
        this.updateVisibleBow()
    }
    updateBowConfig() {
        if (this.currentVisibleBowId) {
            const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData(this.currentVisibleBowId, {
                equippedSkinIds: this.currentEquippedSkinIds
            });
            this.bowAssetLoader.setConfig({
                bowId: this.currentVisibleBowId,
                arrowCount: 1,
                skins: t,
                arrowSkin: e,
                teamId: this.currentTeamId
            })
        }
    }
    setMelee(t) {
        this.currentVisibleMeleeSkinAssetName = t,
        this.updateMeleeConfig(),
        this.updateVisibleMelee()
    }
    updateMeleeConfig() {
        if (this.currentVisibleMeleeSkinAssetName) {
            const t = getMainInstance().skins.skinNetworkDataToMeleeSkinConfig({
                equippedSkinIds: this.currentEquippedSkinIds
            });
            t && this.meleeAssetLoader.setConfig({
                skinAssetName: t.skin,
                teamId: this.currentTeamId
            })
        }
    }
}
class ShopSkinCustomizationView {
    constructor(t, {id: e, rootHeader: i, dialog: s}) {
        let n;
        this.el = document.createElement("div"),
        this.el.classList.add("shopDialogContent"),
        this.dialog = s,
        this.skinManager = t,
        this.customizationId = e,
        this.onBackButtonClickCbs = new Set,
        this.pagedView = new PagedView({
            extraClasses: ["shop-paged-view-container"]
        }),
        this.el.appendChild(this.pagedView.el),
        this.createdGrids = new Map,
        this.skinPreview = new ShopSkinPreview,
        this.el.appendChild(this.skinPreview.el),
        this.updateSkinPreviewConfig(),
        this.filterSubPages = new Map;
        let a = null;
        if ("class" == e.type) {
            const t = getClassConfigById(e.classId);
            n = {
                itemName: "Bow",
                buttonIcon: "static/img/menuUI/shop/categoryIcons/bow.svg",
                buttonIconSize: 2.2,
                subPages: [this.createGridViewSubPage({
                    itemName: "Handle",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/bowHandle.svg",
                    buttonIconSize: 2.2,
                    ...this.createBowGridViewConfig(t, "handle")
                }), this.createGridViewSubPage({
                    itemName: "Tip",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/bowTip.svg",
                    buttonIconSize: 2.2,
                    ...this.createBowGridViewConfig(t, "tip")
                })],
                onBecomeVisible: ()=>{
                    this.setSkinPreview(this.createBowGridViewConfig(t, "full"))
                }
            },
            a = t.bowId
        } else {
            const t = [];
            for (const e of classConfigs)
                t.push({
                    itemName: e.uiName,
                    subPages: [this.createGridViewSubPage({
                        itemName: "Handle",
                        buttonIcon: "static/img/menuUI/shop/categoryIcons/bowHandle.svg",
                        buttonIconSize: 2.2,
                        ...this.createBowGridViewConfig(e, "handle")
                    }), this.createGridViewSubPage({
                        itemName: "Tip",
                        buttonIcon: "static/img/menuUI/shop/categoryIcons/bowTip.svg",
                        buttonIconSize: 2.2,
                        ...this.createBowGridViewConfig(e, "tip")
                    })],
                    onBecomeVisible: ()=>{
                        this.setSkinPreview(this.createBowGridViewConfig(e, "full"))
                    }
                });
            n = {
                itemName: "Bow",
                buttonIcon: "static/img/menuUI/shop/categoryIcons/bow.svg",
                buttonIconSize: 2.2,
                subPages: t,
                onBecomeVisible: ()=>{
                    this.resetSkinPreview()
                }
            }
        }
        this.pagedView.setActiveStructure({
            header: i,
            onBecomeVisible: ()=>{
                this.resetSkinPreview()
            }
            ,
            onBackButtonClick: ()=>{
                this.onBackButtonClickCbs.forEach((t=>t()))
            }
            ,
            rightCorner: i=>{
                if ("class" == e.type) {
                    const s = e.classId
                      , n = this.skinManager.getClassSkinData(s, !1)
                      , a = document.createElement("div");
                    a.classList.add("dialog-select-wrapper", "wrinkledPaper"),
                    i.appendChild(a);
                    const o = document.createElement("select");
                    o.classList.add("dialog-select-input", "blueNight"),
                    a.appendChild(o);
                    const r = document.createElement("option");
                    r.value = "none",
                    r.textContent = "None",
                    o.appendChild(r);
                    for (const e of t.skinPresets.keys()) {
                        const t = document.createElement("option");
                        t.value = String(e),
                        t.textContent = `Preset ${e + 1}`,
                        o.appendChild(t)
                    }
                    null == n.presetId ? o.value = "none" : o.value = String(n.presetId),
                    o.addEventListener("change", (()=>{
                        let t;
                        t = "none" == o.value ? null : Number(o.value),
                        this.skinManager.setClassPreset(s, t),
                        this.updateSkinPreviewConfig()
                    }
                    ))
                }
            }
            ,
            subPages: [{
                itemName: "Looks",
                buttonIcon: "static/img/menuUI/shop/categoryIcons/face.svg",
                buttonIconSize: 2.2,
                onBecomeVisible: ()=>{
                    this.resetSkinPreview({
                        camPosition: "face"
                    })
                }
                ,
                rightCorner: t=>{
                    const i = document.createElement("div");
                    i.classList.add("shop-gender-toggle-container"),
                    t.appendChild(i);
                    const s = document.createElement("div");
                    s.classList.add("gender-icon", "male"),
                    i.appendChild(s);
                    const n = document.createElement("input");
                    n.type = "checkbox",
                    n.classList.add("dialog-toggle-input", "wrinkledPaper"),
                    n.ariaLabel = "Gender";
                    let a = "male";
                    if ("preset" == e.type) {
                        const t = e.presetId;
                        a = this.skinManager.getPreset(t).gender || "male"
                    } else if ("class" == e.type) {
                        const t = e.classId
                          , i = this.skinManager.getClassSkinData(t, !1);
                        let s;
                        if (null != i.presetId) {
                            s = this.skinManager.getPreset(i.presetId, !1).gender
                        }
                        a = i.gender || s || "male"
                    }
                    n.checked = "female" == a,
                    n.addEventListener("change", (()=>{
                        const t = n.checked ? "female" : "male";
                        "preset" == e.type ? this.skinManager.setPresetGender(e.presetId, t) : "class" == e.type && this.skinManager.setClassGender(e.classId, t),
                        this.updateSkinPreviewConfig(),
                        this.pagedView.updateButtonVisibilies()
                    }
                    )),
                    i.appendChild(n);
                    const o = document.createElement("div");
                    o.classList.add("gender-icon", "female"),
                    i.appendChild(o)
                }
                ,
                subPages: [this.createGridViewSubPage({
                    itemName: "Skin color",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/skinTone.svg",
                    buttonIconSize: 1.2,
                    filterOptions: {
                        shopCategoriesFilter: ["skinTone"]
                    }
                }), this.createGridViewSubPage({
                    itemName: "Hair",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/hair.svg",
                    buttonIconSize: 1.2,
                    filterOptions: {
                        shopCategoriesFilter: ["faceHair"]
                    },
                    colorButtonsCategory: "hair"
                }), this.createGridViewSubPage({
                    itemName: "Eyebrows",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/eyebrows.svg",
                    buttonIconSize: 1.4,
                    filterOptions: {
                        shopCategoriesFilter: ["faceEyebrows"]
                    },
                    colorButtonsCategory: "eyebrows"
                }), this.createGridViewSubPage({
                    itemName: "Eyes",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/eyes.svg",
                    buttonIconSize: 1.4,
                    filterOptions: {
                        shopCategoriesFilter: ["faceEyes"]
                    }
                }), this.createGridViewSubPage({
                    itemName: "Beard",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/face.svg",
                    buttonIconSize: 2.2,
                    filterOptions: {
                        shopCategoriesFilter: ["faceMustache", "faceBeard"]
                    },
                    colorButtonsCategory: "beard"
                }), this.createGridViewSubPage({
                    itemName: "Miscellaneous",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/misc.svg",
                    buttonIconSize: 1.4,
                    filterOptions: {
                        shopCategoriesFilter: ["faceMisc"]
                    }
                })]
            }, {
                itemName: "Gear",
                buttonIcon: "static/img/menuUI/shopChest.svg",
                buttonIconSize: 2,
                onBecomeVisible: ()=>{
                    this.resetSkinPreview()
                }
                ,
                subPages: [this.createGridViewSubPage({
                    itemName: "Head",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/head.svg",
                    buttonIconSize: 1.7,
                    filterOptions: {
                        shopCategoriesFilter: ["head"]
                    },
                    skinPreviewCamPosition: "head"
                }), this.createGridViewSubPage({
                    itemName: "Torso",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/torso.svg",
                    buttonIconSize: 1.7,
                    filterOptions: {
                        shopCategoriesFilter: ["torso"]
                    },
                    skinPreviewCamPosition: "torso"
                }), this.createGridViewSubPage({
                    itemName: "Arms",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/arms.svg",
                    buttonIconSize: 1.7,
                    filterOptions: {
                        shopCategoriesFilter: ["arms", "hands"]
                    },
                    skinPreviewCamPosition: "arms"
                }), this.createGridViewSubPage({
                    itemName: "Legs",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/legs.svg",
                    buttonIconSize: 1.7,
                    filterOptions: {
                        shopCategoriesFilter: ["legs", "feet"]
                    },
                    skinPreviewCamPosition: "legs"
                }), this.createGridViewSubPage({
                    itemName: "Quiver",
                    buttonIcon: "static/img/menuUI/shop/categoryIcons/quiver.svg",
                    buttonIconSize: 1.2,
                    filterOptions: {
                        shopCategoriesFilter: ["quiver"]
                    },
                    skinPreviewCamPosition: "quiver"
                })]
            }, n, this.createGridViewSubPage({
                itemName: "Arrow",
                bowId: "mediumBow",
                skeletonPose: "bows/mediumBow/shootingLoaded",
                buttonIcon: "static/img/menuUI/shop/categoryIcons/arrow.svg",
                buttonIconSize: 1.9,
                skinPreviewCamPosition: "arrow",
                filterOptions: {
                    shopCategoriesFilter: ["arrow"]
                }
            }), this.createGridViewSubPage({
                itemName: "Melee",
                meleeSkinAssetName: "meleePokeHeavySword",
                skeletonPose: "melee/bladedHeavy/idle",
                buttonIcon: "static/img/menuUI/shop/categoryIcons/melee.svg",
                buttonIconSize: 1.9,
                skinPreviewCamPosition: "melee",
                filterOptions: {
                    shopCategoriesFilter: ["meleeBladed", "meleeBlunt", "meleePoke"]
                }
            }), this.createGridViewSubPage({
                itemName: "Rewarded",
                buttonIcon: "static/img/rewardedAdIcon.svg",
                buttonIconSize: 1.4,
                filterOptions: {
                    filterType: "rewarded",
                    useSingleWeaponType: a
                }
            }), this.createGridViewSubPage({
                itemName: "Uncategorized",
                filterOptions: {
                    filterType: "uncategorized"
                }
            }), this.createGridViewSubPage({
                itemName: "Missing",
                filterOptions: {
                    filterType: "missing"
                }
            })]
        })
    }
    destructor() {
        this.closeCreatedDialogs();
        for (const {grid: t} of this.createdGrids.values())
            t.destructor();
        this.createdGrids.clear(),
        this.skinPreview.destructor()
    }
    onBackButtonClick(t) {
        this.onBackButtonClickCbs.add(t)
    }
    closeCreatedDialogs() {
        for (const {grid: t} of this.createdGrids.values())
            t.closeCreatedConfirmPurchaseDialogs()
    }
    loop(t, e) {
        this.skinPreview.loop(t, e)
    }
    updateShopState(t) {
        for (const {grid: e} of this.createdGrids.values())
            e.setPurchasedItems(t)
    }
    highlightOrOpenShopItem(t, e, i) {
        let s, n;
        for (const e of t) {
            s = this.filterSubPages.get(e);
            break
        }
        if (!s)
            throw new Error(`No subpage structure found for shop item "${e}"`);
        this.pagedView.jumpToSubPage(s);
        for (const {grid: t, pagedViewStructure: e} of this.createdGrids.values())
            if (e === s) {
                n = t;
                break
            }
        if (!n)
            throw new Error("Assertion failed, no grid was created for the subpage");
        n.performHighlightShopItemAction(e, i)
    }
    resetSkinPreview({camPosition: t="full"}={}) {
        this.skinPreview.setActiveSlotPosition(t),
        this.skinPreview.setSkeletonPose(null),
        this.skinPreview.setBow(null),
        this.skinPreview.setMelee(null)
    }
    createBowGridViewConfig(t, e) {
        let i = "full"
          , s = [];
        "full" == e ? i = t.bowShopCamPosition : "handle" == e ? (i = t.bowHandleShopCamPosition,
        s = t.bowHandleShopCategories) : "tip" == e && (i = t.bowTipShopCamPosition,
        s = t.bowTipShopCategories);
        const n = {
            useSingleWeaponType: t.bowId,
            hideNonBowSkins: !0,
            shopCategoriesFilter: s
        };
        return {
            skinPreviewCamPosition: i,
            skeletonPose: `bows/${t.bowId}/${t.shopSkeletonLayer}`,
            bowId: t.bowId,
            filterOptions: n
        }
    }
    setSkinPreview({skinPreviewCamPosition: t=null, skeletonPose: e=null, bowId: i=null, meleeSkinAssetName: s=null}) {
        t && this.skinPreview.setActiveSlotPosition(t),
        this.skinPreview.setSkeletonPose(e),
        this.skinPreview.setBow(i),
        this.skinPreview.setMelee(s)
    }
    createGridViewSubPage({itemName: t, buttonIcon: e, buttonIconSize: i, filterOptions: s, skinPreviewCamPosition: n=null, skeletonPose: a=null, bowId: o=null, meleeSkinAssetName: r=null, colorButtonsCategory: l="none"}) {
        const h = {
            itemName: t,
            buttonIcon: e,
            buttonIconSize: i,
            buttonVisible: ()=>{
                const t = getMainInstance().config.shopConfig.loadedConfigData;
                if (!t)
                    return !0;
                const e = this.getCurrentSkinData().gender || "male";
                return this.filterPurchasableItems(t.purchasableItems, e, s).length > 0
            }
            ,
            onBecomeVisible: ()=>{
                this.setSkinPreview({
                    skinPreviewCamPosition: n,
                    skeletonPose: a,
                    bowId: o,
                    meleeSkinAssetName: r
                })
            }
            ,
            customSubPage: t=>{
                this.createShopItemsGrid(t, {
                    filterOptions: s,
                    pagedViewStructure: h,
                    colorButtonsCategory: l
                })
            }
            ,
            customSubPageDestroyed: t=>{
                this.destroyShopItemsGrid(t)
            }
        };
        if ("none" != l && (h.rightCorner = t=>{
            t.classList.add("shop-color-buttons-corner");
            for (const {cssColor: e, skinColor: i} of hairColors) {
                const s = document.createElement("button");
                s.classList.add("shop-color-button"),
                s.style.backgroundColor = e,
                t.appendChild(s),
                s.addEventListener("click", (()=>{
                    const t = getMainInstance().skins;
                    "preset" == this.customizationId.type ? t.setPresetSkinItemColor(this.customizationId.presetId, l, i) : "class" == this.customizationId.type && t.setClassSkinItemColor(this.customizationId.classId, l, i),
                    this.updateSkinPreviewConfig();
                    const e = this.getShopItemRenderOptions(l);
                    for (const t of this.createdGrids.values())
                        t.grid.setRenderOptions(e)
                }
                )),
                s.addEventListener("mouseenter", (()=>{
                    this.skinPreview.setTemporaryColorCategory(l, i)
                }
                )),
                s.addEventListener("mouseleave", (()=>{
                    this.skinPreview.resetHoveringModel()
                }
                ))
            }
        }
        ),
        s.shopCategoriesFilter)
            for (const t of s.shopCategoriesFilter)
                this.filterSubPages.set(t, h);
        return h
    }
    filterPurchasableItems(t, e, {filterType: i="default", shopCategoriesFilter: s, useSingleWeaponType: n, hideNonBowSkins: a}) {
        if ("missing" == i)
            return [];
        if ("uncategorized" == i)
            return t.filter((t=>!t.categories));
        {
            const o = getMainInstance().shopState.purchasedItems;
            return t.filter((t=>{
                if ("rewarded" == i) {
                    if (!t.hasRewardedAd)
                        return !1;
                    if (o.has(t.id))
                        return !1
                }
                if (n && t.bowSkin && n != t.bowSkin.bowId)
                    return !1;
                if (a && !t.bowSkin)
                    return !1;
                if (!(t.showFullBodyInShopItem || t.bowSkin || t.meleeSkin || t.arrowSkin)) {
                    if ("male" == e && !t.maleSkin)
                        return !1;
                    if ("female" == e && !t.femaleSkin)
                        return !1
                }
                if (s) {
                    if (!t.categories)
                        return !1;
                    let e = !1;
                    for (const i of t.categories)
                        if (s.includes(i)) {
                            e = !0;
                            break
                        }
                    if (!e)
                        return !1
                }
                if (!this.showHiddenItems) {
                    if ("hidden" == t.shopVisibility)
                        return !1;
                    if (!("seasonal" != t.shopVisibility || t.price && o.has(t.id))) {
                        const e = t.seasonalRange;
                        if (!e)
                            return !1;
                        if (e.startDay && e.endDay && e.startMonth && e.endMonth) {
                            const t = new Date
                              , i = new Date(t.getFullYear(),e.startMonth - 1,e.startDay)
                              , s = new Date(t.getFullYear(),e.endMonth - 1,e.endDay)
                              , n = new Date(t.getFullYear(),t.getMonth(),t.getDate());
                            if (n < i || n > s)
                                return !1
                        }
                    }
                }
                return !0
            }
            ))
        }
    }
    getShopItemRenderOptions(t) {
        const e = this.getCurrentSkinData()
          , i = e.gender || "male";
        let s = [1, 1, 1];
        "hair" == t && e.hairColorMultiplier ? s = e.hairColorMultiplier : "eyebrows" == t && e.eyebrowColorMultiplier ? s = e.eyebrowColorMultiplier : "beard" == t && e.beardColorMultiplier && (s = e.beardColorMultiplier);
        return {
            colorMultiplier: s,
            gender: i
        }
    }
    createShopItemsGrid(t, {filterOptions: e, pagedViewStructure: i, colorButtonsCategory: s}) {
        const n = new ShopItemsGridView;
        t.appendChild(n.el);
        const a = ()=>{
            const i = this.getShopItemRenderOptions(s)
              , a = getMainInstance().config.shopConfig.loadedConfigData
              , o = a ? a.purchasableItems : []
              , r = this.filterPurchasableItems(o, i.gender, e);
            n.loadShopItems(r, {
                renderOptions: i,
                dialog: this.dialog,
                scrollingContainer: t
            })
        }
          , o = getMainInstance();
        if (o.config.shopConfig.onConfigChange(a),
        n.onHoveringItemChange((t=>{
            let e = null;
            t && t.selected || (t && t.config && t.config.id && (e = t.config.id),
            e ? this.skinPreview.setHoveringShopItemId(e) : this.skinPreview.resetHoveringModel())
        }
        )),
        n.setPurchasedItems(o.shopState.purchasedItems),
        "preset" == this.customizationId.type) {
            const t = this.customizationId.presetId
              , e = this.skinManager.getPreset(t)
              , i = new Set(e.equippedSkinIds);
            n.setSelectedItems(i),
            n.onSelectedItemChangeRequest(((e,i)=>{
                if (i) {
                    const i = this.skinManager.addShopItemToPreset(e, t);
                    for (const t of i)
                        n.setSelectedItemState(t, !1)
                } else
                    this.skinManager.removeShopItemFromPreset(e, t);
                n.setSelectedItemState(e, i),
                this.updateSkinPreviewConfig()
            }
            ))
        } else if ("class" == this.customizationId.type) {
            const t = this.customizationId.classId;
            this.updateSelectedItemsForClass(t, n),
            n.onSelectedItemChangeRequest(((e,i)=>{
                i ? this.skinManager.addShopItemToClass(e, t) : this.skinManager.removeShopItemFromClass(e, t),
                this.updateSelectedItemsForClass(t, n),
                this.updateSkinPreviewConfig()
            }
            ))
        }
        this.createdGrids.set(t, {
            grid: n,
            reloadFilteredItems: a,
            pagedViewStructure: i
        })
    }
    updateSelectedItemsForClass(t, e) {
        const i = this.skinManager.getClassSkinData(t, !1);
        let s = [];
        if (null != i.presetId) {
            const t = this.skinManager.getPreset(i.presetId, !1);
            t.equippedSkinIds && (s = t.equippedSkinIds)
        }
        const n = new Set(s);
        if (i.equippedSkinIds)
            for (const t of i.equippedSkinIds)
                this.skinManager.addItemAndRemoveDuplicateSlots(n, t);
        if (i.unequippedSkinIds)
            for (const t of i.unequippedSkinIds)
                n.delete(t);
        e.setSelectedItems(n)
    }
    getCurrentSkinData() {
        if ("preset" == this.customizationId.type)
            return this.skinManager.getPreset(this.customizationId.presetId);
        if ("class" == this.customizationId.type)
            return this.skinManager.getClassSkinDataWithAppliedPreset(this.customizationId.classId);
        throw new Error("Assertion failed, unknown customization type.")
    }
    updateSkinPreviewConfig() {
        const t = this.getCurrentSkinData();
        this.skinPreview.setCurrentSkinConfig(t)
    }
    destroyShopItemsGrid(t) {
        const e = this.createdGrids.get(t);
        if (!e)
            return;
        const {grid: i, reloadFilteredItems: s} = e;
        i.destructor(),
        this.createdGrids.delete(t),
        getMainInstance().config.shopConfig.removeOnConfigChange(s)
    }
}
class ClassSelectionImage {
    constructor(t, {extraClasses: e=[]}={}) {
        this.el = document.createElement("div"),
        this.el.classList.add("class-selection-image-container", "wrinkledPaper", "wrinkled-paper-mask", ...e),
        this.backgroundEl = document.createElement("div"),
        this.backgroundEl.classList.add("class-selection-image-background", "wrinkledPaper"),
        this.el.appendChild(this.backgroundEl),
        this.imageEl = document.createElement("div"),
        this.imageEl.classList.add("class-selection-image"),
        this.el.appendChild(this.imageEl),
        this.seed = randInt(0, 99999);
        const i = `\n\t\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t`;
        this.el.style.cssText = i,
        this.backgroundEl.style.cssText = i,
        this.classId = t;
        const s = getMainInstance().classSelectionImageManager;
        this.updateReference = s.createUpdateReference(t),
        this.updateReference.onBlobUrlChange((t=>{
            this.imageEl.style.backgroundImage = `url("${t}")`
        }
        )),
        this.updateReference.needsUpdates = !0
    }
    destructor() {
        this.updateReference.destructor()
    }
    set needsUpdates(t) {
        this.updateReference.needsUpdates = t
    }
    setCssColor(t, e) {
        this.backgroundEl.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t\t--wrinkled-paper-color: ${t};\n\t\t\t--wrinkled-paper-border-color: ${e};\n\t\t`
    }
}
class ClassSelectionItem {
    constructor(t) {
        this.el = document.createElement("div"),
        this.el.classList.add("shop-skin-selection-item", "shop-class-selection-item");
        const e = document.createElement("h3");
        e.classList.add("dialogTitle", "blueNight"),
        e.textContent = t.uiName,
        this.el.appendChild(e),
        this.onClickCbs = new Set,
        this.classSelectionImage = new ClassSelectionImage(t.id);
        const {colors: i} = getMainInstance().gameManager.getMyTeamColor();
        this.classSelectionImage.setCssColor(i.cssColor, i.cssColorDark),
        this.el.appendChild(this.classSelectionImage.el);
        const s = new UiButton({
            text: "Edit",
            onClick: ()=>{
                this.onClickCbs.forEach((t=>t()))
            }
            ,
            extraClasses: ["shop-skin-selection-edit-button"]
        });
        this.el.appendChild(s.el)
    }
    set needsAvatarUpdates(t) {
        this.classSelectionImage.needsUpdates = t
    }
    destructor() {
        this.classSelectionImage.destructor()
    }
    onClick(t) {
        this.onClickCbs.add(t)
    }
}
class ShopPresetItem {
    constructor({preset: t, onEditButtonClick: e, showDeleteButton: i, onDeleteButtonClick: s}) {
        this.el = document.createElement("div"),
        this.el.classList.add("shop-skin-selection-item");
        const n = document.createElement("div");
        n.classList.add("shop-skin-selection-image", "wrinkledPaper", "wrinkled-paper-mask"),
        n.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        this.el.appendChild(n);
        const a = new UiButton({
            text: "Edit",
            onClick: e,
            extraClasses: ["shop-skin-selection-edit-button"]
        });
        this.el.appendChild(a.el);
        const o = getMainInstance().avatars.getAvatar({
            skinObjectOpts: {
                skin: t,
                teamId: 1
            },
            width: 200,
            height: 300,
            clipPathType: "none",
            cameraType: "full-body",
            backgroundColor: teamColors[2].cssColor
        });
        if (this.avatarBlobUrlReference = o.getBlobUrlReference(),
        (async()=>{
            const t = await this.avatarBlobUrlReference.getBlobUrl();
            n.style.backgroundImage = `url("${t}")`
        }
        )(),
        i) {
            const t = new UiButton({
                text: "x",
                extraClasses: ["corner-delete-button"],
                onClick: s
            });
            t.el.ariaLabel = "Delete preset",
            this.el.appendChild(t.el)
        }
    }
    destructor() {
        this.avatarBlobUrlReference.destructor()
    }
}
class ShopPresetsView {
    constructor(t) {
        this.skinManager = t,
        this.onPresetOpenClickCbs = new Set,
        this.onBackButtonClickCbs = new Set,
        this.el = document.createElement("div");
        const e = document.createElement("div");
        e.classList.add("dialog-title-header-container"),
        this.el.appendChild(e);
        const i = new UiButton({
            isIconButton: !0,
            ariaLabel: "Back",
            icon: "static/img/arrow.svg",
            extraClasses: ["header-button", "header-back-button"],
            onClick: ()=>{
                this.onBackButtonClickCbs.forEach((t=>t()))
            }
        });
        e.appendChild(i.el);
        const s = document.createElement("h2");
        s.textContent = "Presets",
        s.classList.add("dialogTitle", "blueNight", "shop-presets-title"),
        e.appendChild(s),
        this.presetsList = document.createElement("div"),
        this.presetsList.classList.add("shop-skin-selection-list"),
        this.el.appendChild(this.presetsList),
        this.createdPresetItems = [],
        this.addPresetButton = new UiButton({
            text: "+",
            extraClasses: ["shop-skin-selection-list-add-button"],
            onClick: ()=>{
                t.addPreset(),
                this.updatePresetList(),
                this.presetsList.scroll(this.presetsList.scrollWidth, 0)
            }
        }),
        this.updatePresetList()
    }
    destructor() {
        for (const t of this.createdPresetItems)
            t.destructor()
    }
    updatePresetList() {
        for (; this.presetsList.firstChild; )
            this.presetsList.removeChild(this.presetsList.firstChild);
        const t = this.createdPresetItems;
        this.createdPresetItems = [];
        for (const [t,e] of this.skinManager.skinPresets.entries()) {
            const i = new ShopPresetItem({
                preset: e,
                onEditButtonClick: ()=>{
                    this.onPresetOpenClickCbs.forEach((e=>e(t)))
                }
                ,
                showDeleteButton: this.skinManager.skinPresets.length > 1,
                onDeleteButtonClick: async()=>{
                    getMainInstance().dialogManager.showAlert({
                        text: "Are you sure you want to delete this preset?",
                        buttons: [{
                            text: "Yes",
                            onClick: ()=>{
                                this.skinManager.deletePreset(t),
                                this.updatePresetList()
                            }
                        }, {
                            text: "No"
                        }]
                    })
                }
            });
            this.presetsList.appendChild(i.el),
            this.createdPresetItems.push(i)
        }
        this.presetsList.appendChild(this.addPresetButton.el);
        for (const e of t)
            e.destructor()
    }
    onPresetOpenClick(t) {
        this.onPresetOpenClickCbs.add(t)
    }
    onBackButtonClick(t) {
        this.onBackButtonClickCbs.add(t)
    }
}
class ShopDialogUi extends DialogUi {
    constructor() {
        super({
            testLabel: "shop"
        }),
        this.currentCustomizationView = null,
        this.currentPresetsView = null,
        this.mainViewVisible = !0,
        this.ownedCoinsContainer = document.createElement("div"),
        this.ownedCoinsContainer.classList.add("ownedCoinsContainer", "wrinkledPaper", "allow-select"),
        this.el.appendChild(this.ownedCoinsContainer),
        this.currencyContainer = new CurrencyContainer;
        document.createElement("div").classList.add("currency-container"),
        this.ownedCoinsContainer.appendChild(this.currencyContainer.el),
        this.classSelectionContainer = document.createElement("div"),
        this.classSelectionContainer.classList.add("shop-class-selection-container"),
        this.el.appendChild(this.classSelectionContainer),
        this.presetsButton = new UiButton({
            text: "Presets",
            onClick: ()=>{
                this.showPresetsView()
            }
        }),
        this.classSelectionContainer.appendChild(this.presetsButton.el),
        this.classSelectionListEl = document.createElement("div"),
        this.classSelectionListEl.classList.add("shop-skin-selection-list", "shop-class-selection-list"),
        this.classSelectionContainer.appendChild(this.classSelectionListEl),
        this.createdClassSelectionItems = [];
        for (const t of classConfigs) {
            const e = new ClassSelectionItem(t);
            this.classSelectionListEl.appendChild(e.el),
            e.onClick((()=>{
                this.showCustomizationView({
                    id: {
                        type: "class",
                        classId: t.id
                    },
                    rootHeader: t.uiName,
                    dialog: this
                })
            }
            )),
            this.createdClassSelectionItems.push(e)
        }
        this.boundUpdateShopState = this.updateShopState.bind(this),
        getMainInstance().shopState.onStateChanged(this.boundUpdateShopState),
        getMainInstance().shopState.fetchCurrentData(),
        this.updateShopState()
    }
    destructor() {
        getMainInstance().shopState.removeOnStateChanged(this.boundUpdateShopState),
        this.hideCustomizationView(),
        this.hidePresetsView(),
        super.destructor();
        for (const t of this.createdClassSelectionItems)
            t.destructor();
        this.createdClassSelectionItems = [],
        this.hidePresetsView()
    }
    onClose() {
        this.currentCustomizationView && this.currentCustomizationView.closeCreatedDialogs()
    }
    loop(t, e) {
        this.currentCustomizationView && this.currentCustomizationView.loop(t, e)
    }
    updateShopState() {
        this.currencyContainer.setAmount(getMainInstance().shopState.ownedCoins),
        this.currentCustomizationView && this.currentCustomizationView.updateShopState(getMainInstance().shopState.purchasedItems)
    }
    updateMainViewVisibility() {
        const t = null == this.currentCustomizationView && null == this.currentPresetsView;
        if (t != this.mainViewVisible) {
            this.mainViewVisible = t,
            this.classSelectionContainer.style.display = t ? "" : "none";
            for (const e of this.createdClassSelectionItems)
                e.needsAvatarUpdates = t
        }
    }
    showPresetCustomizationView(t) {
        this.showCustomizationView({
            id: {
                type: "preset",
                presetId: t
            },
            rootHeader: "Preset " + (t + 1),
            dialog: this
        })
    }
    showCustomizationView(t) {
        if (this.currentCustomizationView)
            return;
        const e = getMainInstance().skins;
        this.currentCustomizationView = new ShopSkinCustomizationView(e,t),
        this.el.appendChild(this.currentCustomizationView.el),
        this.currentCustomizationView.onBackButtonClick((()=>{
            this.hideCustomizationView(),
            "preset" == t.id.type && this.showPresetsView(),
            this.updateMainViewVisibility()
        }
        )),
        this.hidePresetsView(),
        this.updateMainViewVisibility()
    }
    hideCustomizationView() {
        this.currentCustomizationView && (this.el.contains(this.currentCustomizationView.el) && this.el.removeChild(this.currentCustomizationView.el),
        this.currentCustomizationView.destructor(),
        this.currentCustomizationView = null)
    }
    showPresetsView() {
        this.currentPresetsView || (this.currentPresetsView = new ShopPresetsView(getMainInstance().skins),
        this.currentPresetsView.onPresetOpenClick((t=>{
            this.showPresetCustomizationView(t)
        }
        )),
        this.currentPresetsView.onBackButtonClick((()=>{
            this.hidePresetsView(),
            this.updateMainViewVisibility()
        }
        )),
        this.el.appendChild(this.currentPresetsView.el),
        this.updateMainViewVisibility())
    }
    hidePresetsView() {
        this.currentPresetsView && (this.el.contains(this.currentPresetsView.el) && this.el.removeChild(this.currentPresetsView.el),
        this.currentPresetsView.destructor(),
        this.currentPresetsView = null)
    }
    openShopItemSubPage(t, e) {
        const i = getMainInstance()
          , s = i.skins
          , n = i.config.shopConfig.loadedConfigData;
        if (!n)
            throw new Error("Assertion failed, the shop config hasn't been loaded");
        const a = new Map;
        for (const t of Object.values(s.classSkins))
            if (null != t.presetId) {
                const e = a.get(t.presetId) || 0;
                a.set(t.presetId, e + 1)
            }
        let o = 0
          , r = 0;
        for (const [t,e] of a)
            e > r && (o = t,
            r = e);
        if (this.showPresetCustomizationView(o),
        !this.currentCustomizationView)
            throw new Error("Assertion failed, customization view not visible");
        const l = n.purchasableItems.find((e=>e.id == t));
        if (!l)
            throw new Error(`The item "${t}" doesn't exist in the currently loaded shop config.`);
        if (l.categories)
            return this.currentCustomizationView.highlightOrOpenShopItem(l.categories, t, e);
        throw new Error("Uncategorized shop items are not supported yet")
    }
    highlightShopItem(t, e) {
        this.openShopItemSubPage(t, e)
    }
    openShopItem(t) {
        this.openShopItemSubPage(t, "open")
    }
}
class UserProfileDialogUi extends DialogUi {
    constructor() {
        super(),
        this.userNameText = document.createElement("input"),
        this.userNameText.placeholder = "Username",
        this.userNameText.maxLength = 20,
        this.userNameText.addEventListener("change", (async()=>{
            await getMainInstance().profileState.setUsername(this.userNameText.value) || this.updateProfileState()
        }
        )),
        this.el.appendChild(this.userNameText),
        this.addButtonsContainer(),
        this.linkAccountButton = this.addButton({
            text: "Link account",
            onClick: async()=>{
                const t = await getMainInstance().auth.showLoginDialog("linknew");
                if (t)
                    if (t.success)
                        getMainInstance().dialogManager.showAlert({
                            title: "Account linked",
                            text: "You can now use this account for logging in as well."
                        });
                    else if ("account-already-exists" == t.error) {
                        const {authTokenData: e, usedNonce: i} = t;
                        getMainInstance().dialogManager.showAlert({
                            title: "Account already exists",
                            text: "Would you like to merge the existing account with this one?",
                            buttons: [{
                                text: "Cancel"
                            }, {
                                text: "Merge Accounts",
                                onClick: async()=>{
                                    await getMainInstance().auth.mergeAccountToCurrent(e, i) ? getMainInstance().dialogManager.showAlert({
                                        title: "Accounts merged",
                                        text: "The accounts have been merged."
                                    }) : getMainInstance().dialogManager.showAlert({
                                        title: "Merge error",
                                        text: "An error occurred while merging the accounts."
                                    })
                                }
                            }]
                        })
                    } else {
                        let e = "An error occurred while trying to link your account.";
                        "already-linked" == t.error ? e = "This account is already linked to you." : console.error("Account link error: " + t.error),
                        getMainInstance().dialogManager.showAlert({
                            title: "Account linking failed",
                            text: e
                        })
                    }
            }
        }),
        this.linkAccountButton.visible = !1,
        this.logoutButton = this.addButton({
            text: "Logout",
            onClick: async()=>{
                await getMainInstance().auth.logout() ? this.close() : getMainInstance().dialogManager.showAlert({
                    title: "Error logging out",
                    text: "An error occurred while logging out everywhere."
                })
            }
        }),
        this.logoutButton.visible = !1,
        this.logoutEverywhereButton = this.addButton({
            text: "Logout everywhere",
            onClick: async()=>{
                await getMainInstance().auth.logoutEverywhere() ? this.close() : getMainInstance().dialogManager.showAlert({
                    title: "Error logging out",
                    text: "An error occurred while logging out everywhere."
                })
            }
        }),
        this.logoutEverywhereButton.visible = !1,
        this.init()
    }
    async init() {
        await getMainInstance().auth.loginIfNotLoggedIn(!0) ? (this.linkAccountButton.visible = !0,
        this.logoutButton.visible = !0,
        this.logoutEverywhereButton.visible = !0) : this.close(),
        this.boundUpdateProfileState = this.updateProfileState.bind(this),
        getMainInstance().profileState.onStateChanged(this.boundUpdateProfileState),
        getMainInstance().profileState.fetchCurrentData(),
        this.updateProfileState()
    }
    updateProfileState() {
        this.userNameText.value = getMainInstance().profileState.username || ""
    }
}
const blueNightGlyphs = " !%*+,-.:;=?0123456789abcdefghijklmnopqrstuvwxyz";
function stringContainsOnlyBlueNightGlyphs(t, e=!0) {
    e && (t = t.toLowerCase());
    for (const e of t)
        if (!blueNightGlyphs.includes(e))
            return !1;
    return !0
}
class CornerProfile {
    constructor() {
        this.el = document.createElement("div"),
        this.el.classList.add("main-menu-corner-profile"),
        this.usernameEl = document.createElement("div"),
        this.usernameEl.classList.add("main-menu-username", "blueNight", "whiteBigText"),
        this.usernameEl.textContent = "Guest",
        this.el.appendChild(this.usernameEl),
        this.ownedCoins = new CurrencyContainer({
            testLabel: "cornerProfile"
        }),
        this.el.appendChild(this.ownedCoins.el)
    }
    init() {
        getMainInstance().shopState.onStateChanged((()=>{
            this.ownedCoins.setAmount(getMainInstance().shopState.ownedCoins)
        }
        )),
        getMainInstance().profileState.onStateChanged((()=>{
            this.setUsername(getMainInstance().profileState.username)
        }
        ))
    }
    setUsername(t) {
        t || (t = "Guest"),
        this.usernameEl.textContent = t,
        this.usernameEl.classList.toggle("blueNight", stringContainsOnlyBlueNightGlyphs(t))
    }
}
class MainMenuPromoBanner {
    constructor(t, e, i, s, n, a, o, r) {
        this.configManager = t,
        this.mainMenu = e,
        this.gameManager = i,
        this.shopStateManager = s,
        this.pokiManager = n,
        this.dialogManager = a,
        this.skinManager = o,
        this.indexedDb = r,
        this.promoViewData = new Map,
        this.activePromo = null,
        this.activePromos = [],
        this.el = document.createElement("div"),
        this.el.classList.add("main-menu-promo-banner-container", "hidden"),
        this.bannerEl = document.createElement("div"),
        this.bannerEl.classList.add("main-menu-promo-banner", "wrinkledPaper", "wrinkled-paper-mask"),
        this.bannerEl.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        this.el.appendChild(this.bannerEl),
        this.bannerEl.addEventListener("click", (()=>{
            this.onPromoClick()
        }
        )),
        this.button = new UiButton({
            text: "",
            extraClasses: ["main-menu-promo-button"],
            onClick: ()=>{
                this.onPromoClick()
            }
        }),
        this.el.appendChild(this.button.el)
    }
    async init() {
        await this.loadPromoViewData(),
        this.configManager.promosConfig.onConfigChange((t=>{
            this.activePromos = t.activePromos,
            this.loadNewBestPromo()
        }
        )),
        this.shopStateManager.onStateChanged((()=>{
            const t = this.activePromo?.actionShopItem;
            t && this.shopStateManager.itemIsPurchased(t) && this.loadNewBestPromo()
        }
        )),
        this.mainMenu.onVisibilityChange((()=>{
            this.updateVisibility()
        }
        )),
        this.gameManager.onIsInGamesLoopChange((()=>{
            this.updateVisibility()
        }
        ))
    }
    loadNewBestPromo() {
        let t = null
          , e = 1 / 0
          , i = this.activePromos;
        const s = new Set(this.promoViewData.keys());
        for (const t of i)
            s.delete(t.id);
        for (const t of s)
            this.promoViewData.delete(t);
        i = i.filter((t=>!!(t && t.id && t.image))),
        i = i.filter((t=>{
            if (t.actionShopItem && this.shopStateManager.itemIsPurchased(t.actionShopItem))
                return !1;
            if (t.seasonalRange) {
                const e = t.seasonalRange;
                if (e.startDay && e.endDay && e.startMonth && e.endMonth) {
                    const t = new Date
                      , i = new Date(t.getFullYear(),e.startMonth - 1,e.startDay)
                      , s = new Date(t.getFullYear(),e.endMonth - 1,e.endDay)
                      , n = new Date(t.getFullYear(),t.getMonth(),t.getDate());
                    if (n < i || n > s)
                        return !1
                }
            }
            const e = this.getPromoViewData(t.id)
              , i = t.maxViewCount || 5;
            return !(-1 != i && e.viewCount >= i)
        }
        ));
        Boolean(i.find((t=>t.seasonalRange))) && (i = i.filter((t=>t.seasonalRange)));
        for (const s of i) {
            const i = this.getPromoViewData(s.id);
            i.viewCount <= e && (t = s,
            e = i.viewCount)
        }
        this.setActivePromo(t)
    }
    async loadPromoViewData() {
        let t = [];
        try {
            t = await this.indexedDb.get("promoViewData")
        } catch {}
        t || (t = []),
        this.promoViewData = new Map;
        for (const e of t)
            e && e.id && this.promoViewData.set(e.id, e)
    }
    async savePromoViewData() {
        const t = [];
        for (const e of this.promoViewData.values())
            t.push(e);
        try {
            await this.indexedDb.set("promoViewData", t)
        } catch {}
    }
    setActivePromo(t) {
        if (this.el.classList.add("hidden"),
        !t || !t.id || !t.image)
            return;
        this.activePromo = t;
        const e = `url("${this.configManager.basePath}promos/${t.image}")`;
        this.bannerEl.style.backgroundImage = `${e}`,
        this.bannerEl.style.backgroundImage = `${e} !important`,
        t.buttonText && this.button.setText(t.buttonText),
        t.buttonIcon ? this.button.setIcon(`static/img/${t.buttonIcon}`) : this.button.setIcon(null),
        this.button.visible = !!t.buttonText,
        this.updateVisibility(),
        this.updatePromoViewdata(t.id, (t=>{
            t.viewCount++
        }
        ))
    }
    async onPromoClick() {
        if (!this.activePromo)
            return;
        let t = "highlightShopItem";
        if (this.activePromo.action && (t = this.activePromo.action),
        "highlightShopItem" == t) {
            if (this.activePromo.actionShopItem) {
                this.mainMenu.openShopDialog().highlightShopItem(this.activePromo.actionShopItem, "highlight")
            }
        } else if ("openShopItem" == t) {
            if (this.activePromo.actionShopItem) {
                this.mainMenu.openShopDialog().openShopItem(this.activePromo.actionShopItem)
            }
        } else if ("purchaseRewardedShopItem" == t) {
            const t = this.activePromo.actionShopItem;
            if (t) {
                const e = this.configManager.shopConfig.getPurchaseableItem(t);
                if (e && !e.price && e.hasRewardedAd) {
                    const i = this.mainMenu.openShopDialog();
                    let s;
                    s = await this.shopStateManager.purchaseItem(e, this.pokiManager, this.dialogManager, "in-menu") ? "highlight-and-equip" : "open",
                    i.highlightShopItem(t, s)
                }
            }
        } else if ("openShop" == t)
            this.mainMenu.openShopDialog();
        else if ("openUrl" == t) {
            const t = this.activePromo.actionOpenUrl;
            t && window.open(t, "_blank", "noopener,noreferrer")
        }
    }
    updateVisibility() {
        this.el.classList.toggle("hidden", !this.activePromo)
    }
    getPromoViewData(t) {
        const e = this.promoViewData.get(t);
        return e || {
            id: t,
            viewCount: 0
        }
    }
    updatePromoViewdata(t, e) {
        let i = this.getPromoViewData(t);
        const s = e(i);
        s && (i = s),
        this.promoViewData.set(t, i),
        this.savePromoViewData()
    }
}
class UiTextInput {
    constructor({value: t="", placeholder: e="", extraClasses: i=[], onInput: s=null, spellCheck: n=!1, maxLength: a=null}={}) {
        this.el = document.createElement("input"),
        this.el.value = t,
        this.el.placeholder = e,
        this.el.classList.add("dialog-text-input", "blueNight", "wrinkledPaper", ...i),
        n || (this.el.autocomplete = "off",
        this.el.setAttribute("autocorrect", "off"),
        this.el.autocapitalize = "off",
        this.el.spellcheck = !1),
        null != a && (this.el.maxLength = a),
        s && this.el.addEventListener("input", s)
    }
    get value() {
        return this.el.value
    }
    set value(t) {
        this.el.value = t
    }
}
class MatchMakeConnectionError extends Error {
    constructor() {
        super("Unable to connect to matchmake server")
    }
}
class SquadSettingsDialogUi extends DialogUi {
    constructor(t) {
        super(),
        this.squadManager = t,
        this.settings = new Map,
        this.settings.set("privateSquad", new SettingUiItem({
            text: "Private squad",
            type: "toggle",
            min: 0,
            max: 100
        })),
        this.leaderOnlyMessage = document.createElement("div"),
        this.leaderOnlyMessage.classList.add("squad-settings-leader-only-message"),
        this.leaderOnlyMessage.textContent = "Only the squad leader can change these settings.",
        this.el.appendChild(this.leaderOnlyMessage);
        for (const [e,i] of this.settings)
            t.currentSquadSettings && i.setValue(t.currentSquadSettings[e]),
            this.el.appendChild(i.el),
            i.onValueChange((i=>{
                t.setSquadSetting(e, i)
            }
            ));
        t.onSquadSettingChange(((t,e)=>{
            const i = this.settings.get(t);
            i && i.setValue(e)
        }
        )),
        t.onMySquadLeaderStateChange((()=>{
            this.updateLeaderState()
        }
        )),
        this.updateLeaderState()
    }
    updateLeaderState() {
        const t = this.squadManager.myClientIsSquadLeader;
        this.leaderOnlyMessage.style.display = t ? "none" : "";
        for (const e of this.settings.values())
            e.setDisabled(!t)
    }
}
class SquadDialogUi extends DialogUi {
    constructor(t, e, i, s, n) {
        super(),
        this.networkManager = t,
        this.squadManager = e,
        this.gameManager = i,
        this.avatarsManager = s,
        this.skinManager = n;
        const a = document.createElement("div");
        a.classList.add("squad-split-container"),
        this.el.appendChild(a);
        const o = document.createElement("div");
        o.classList.add("squad-split-section"),
        a.appendChild(o);
        const r = document.createElement("h3");
        r.classList.add("dialogTitle", "blueNight"),
        r.textContent = "Invite someone",
        o.appendChild(r);
        const l = document.createElement("div");
        l.classList.add("squad-id-block"),
        o.appendChild(l);
        const h = document.createElement("div");
        h.textContent = "Invite Code:",
        l.appendChild(h);
        const d = document.createElement("div");
        d.classList.add("squad-id-container"),
        l.appendChild(d),
        this.currentSquadId = null,
        this.squadIdText = document.createElement("div"),
        this.squadIdText.classList.add("allow-select", "squad-id"),
        d.appendChild(this.squadIdText);
        const c = document.createElement("div");
        c.classList.add("squad-id-copied-text"),
        c.textContent = "Copied!",
        this.copyUrlButton = new UiButton({
            isIconButton: !0,
            ariaLabel: "Copy squad id to clipboard",
            icon: "static/img/menuUI/copy.svg",
            extraClasses: ["squad-id-button"],
            onClick: async()=>{
                null != this.currentSquadId && (await navigator.clipboard.writeText(this.currentSquadId),
                c.classList.remove("animating"),
                c.offsetHeight,
                c.classList.add("animating"))
            }
        }),
        d.appendChild(this.copyUrlButton.el),
        this.copyUrlButton.el.appendChild(c),
        this.clipboardPermissionGranted = !1,
        this.updateCopyUrlButtonVisibility(),
        this.queryClipboardPermission();
        const u = document.createElement("div");
        u.classList.add("squad-split-divider"),
        a.appendChild(u);
        const p = document.createElement("div");
        p.classList.add("squad-split-divider-line", "wrinkledLine"),
        p.style.cssText = "--wrinkled-line-seed: 18",
        u.appendChild(p);
        const g = document.createElement("span");
        g.textContent = "or",
        u.appendChild(g);
        const m = document.createElement("div");
        m.classList.add("squad-split-divider-line", "wrinkledLine"),
        m.style.cssText = "--wrinkled-line-seed: 12",
        u.appendChild(m);
        const f = document.createElement("div");
        f.classList.add("squad-split-section"),
        a.appendChild(f);
        const w = document.createElement("h3");
        w.classList.add("dialogTitle", "blueNight"),
        w.textContent = "Join existing squad",
        f.appendChild(w);
        const b = document.createElement("form");
        b.classList.add("text-with-submit-form"),
        f.appendChild(b),
        b.addEventListener("submit", (async t=>{
            if (t.preventDefault(),
            this.networkManager.hasGameServerConnection) {
                const t = getMainInstance().dialogManager.showAlert({
                    title: "Are you sure?",
                    text: "If you join this squad, you'll leave the current match.",
                    buttons: [{
                        text: "Yes"
                    }, {
                        text: "No"
                    }]
                });
                if (0 != await t.waitForButton())
                    return
            }
            e.joinExistingSquad(this.joinSquadIdInput.value)
        }
        )),
        this.joinSquadIdInput = new UiTextInput({
            placeholder: "Enter a code",
            extraClasses: ["join-squad-input"],
            maxLength: 8,
            onInput: ()=>{
                this.updateJoinButtonVisibility()
            }
        }),
        b.appendChild(this.joinSquadIdInput.el),
        this.joinSquadIdButton = new UiButton({
            text: "Join"
        }),
        b.appendChild(this.joinSquadIdButton.el),
        this.updateJoinButtonVisibility();
        const y = document.createElement("div");
        y.classList.add("in-squad-content"),
        this.el.appendChild(y);
        const S = document.createElement("div");
        S.classList.add("squad-players-list", "wrinkledPaper", "wrinkled-paper-mask"),
        S.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        y.appendChild(S);
        const C = document.createElement("table");
        C.classList.add("itemsTable"),
        S.appendChild(C),
        this.membersTbody = document.createElement("tbody"),
        C.appendChild(this.membersTbody),
        this.inSquadButtonsContainer = document.createElement("div"),
        this.inSquadButtonsContainer.classList.add("in-squad-buttons"),
        y.appendChild(this.inSquadButtonsContainer);
        const v = new UiButton({
            text: "Ready",
            onClick: ()=>{
                i.joinGameWithoutAd()
            }
        });
        this.inSquadButtonsContainer.appendChild(v.el),
        v.enabled = i.readyToJoin,
        this.boundOnReadyToJoinChange = t=>{
            v.enabled = t
        }
        ,
        i.onReadyToJoinChange(this.boundOnReadyToJoinChange),
        this.startButton = new UiButton({
            text: "Start",
            onClick: ()=>{
                e.startSquad()
            }
        }),
        this.inSquadButtonsContainer.appendChild(this.startButton.el),
        this.squadSettingsDialog = null;
        const M = new UiButton({
            isIconButton: !0,
            ariaLabel: "Squad settings",
            icon: "static/img/menuUI/settings.svg",
            extraClasses: ["squad-settings-button"],
            iconSize: 1.5,
            onClick: ()=>{
                this.squadSettingsDialog || (this.squadSettingsDialog = new SquadSettingsDialogUi(this.squadManager),
                getMainInstance().dialogManager.addDialog(this.squadSettingsDialog),
                this.squadSettingsDialog.addOnCloseCb((()=>{
                    this.squadSettingsDialog = null
                }
                )))
            }
        });
        this.el.appendChild(M.el),
        this.currentAvatarBlobUrlReferences = new Set,
        this.boundUpdateSquadId = this.updateSquadId.bind(this),
        this.boundOnSquadIdChange = this.onSquadIdChanged.bind(this),
        e.onUserVisibleSquadIdChange(this.boundOnSquadIdChange),
        e.onIsJoiningSquadChange(this.boundUpdateSquadId),
        this.boundOnSquadMembersChange = ()=>{
            this.updateMembersUi(),
            this.updateReadyStartButtonVisibility()
        }
        ,
        e.onSquadMembersChange(this.boundOnSquadMembersChange),
        this.boundUpdateStartButtonEnabled = this.updateStartButtonEnabled.bind(this),
        e.onServerReadyForStartStateChange(this.boundUpdateStartButtonEnabled),
        this.boundUpdateStartButtonEnabledFromStartClicked = ()=>{
            this.updateStartButtonEnabled(!0)
        }
        ,
        e.onStartClickedChange(this.boundUpdateStartButtonEnabledFromStartClicked),
        this.boundOnInGameChange = ()=>{
            this.updateReadyStartButtonVisibility()
        }
        ,
        i.onActiveGameChange(this.boundOnInGameChange),
        this.updateSquadId(),
        this.updateMembersUi(),
        this.updateReadyStartButtonVisibility(),
        this.handleRequestInitialSquadId()
    }
    destructor() {
        super.destructor(),
        this.squadManager.removeOnUserVisibleSquadIdChange(this.boundOnSquadIdChange),
        this.squadManager.removeOnIsJoiningSquadChange(this.boundUpdateSquadId),
        this.squadManager.removeOnSquadMembersChange(this.boundOnSquadMembersChange),
        this.squadManager.removeOnServerReadyForStartStateChange(this.boundUpdateStartButtonEnabled),
        this.squadManager.removeOnStartClickedChange(this.boundUpdateStartButtonEnabledFromStartClicked),
        this.gameManager.removeOnReadyToJoinChange(this.boundOnReadyToJoinChange),
        this.gameManager.removeOnCurrentGameChange(this.boundOnInGameChange),
        this.squadSettingsDialog && this.squadSettingsDialog.close();
        for (const t of this.currentAvatarBlobUrlReferences)
            t.destructor();
        this.currentAvatarBlobUrlReferences.clear()
    }
    async handleRequestInitialSquadId() {
        try {
            await this.squadManager.requestInitialSquadId()
        } catch (t) {
            console.error(t);
            let e = "An unknown error occurred while requesting the squad id.";
            t instanceof MatchMakeConnectionError && (e = "Could not connect to the server. Please try again later."),
            getMainInstance().dialogManager.showAlert({
                title: "Error getting squad id",
                text: e
            }),
            this.close()
        }
    }
    onSquadIdChanged() {
        let t = this.squadManager.userVisibleSquadId;
        t && (t = t.trim().toUpperCase()),
        this.joinSquadIdInput.value.trim().toUpperCase() == t && (this.joinSquadIdInput.value = ""),
        this.updateSquadId(),
        this.updateReadyStartButtonVisibility()
    }
    updateSquadId() {
        let t = "..."
          , e = null;
        this.squadManager.userVisibleSquadId && !this.squadManager.isJoiningSquad && (t = this.squadManager.userVisibleSquadId,
        e = this.squadManager.userVisibleSquadId),
        this.currentSquadId = e,
        this.squadIdText.textContent = t,
        this.updateCopyUrlButtonVisibility()
    }
    async queryClipboardPermission() {
        let t;
        try {
            t = (await navigator.permissions.query({
                name: "clipboard-write"
            })).state
        } catch {
            this.clipboardPermissionGranted = !1
        }
        "granted" == t && (this.clipboardPermissionGranted = !0),
        this.updateCopyUrlButtonVisibility()
    }
    updateCopyUrlButtonVisibility() {
        const t = this.clipboardPermissionGranted && !!this.currentSquadId;
        this.copyUrlButton.visible = t
    }
    updateMembersUi() {
        for (; this.membersTbody.firstChild; )
            this.membersTbody.removeChild(this.membersTbody.firstChild);
        const t = Array.from(this.squadManager.getSquadMembers())
          , e = t.every((t=>t.ready))
          , i = t.every((t=>t.joined))
          , s = Array.from(this.currentAvatarBlobUrlReferences);
        this.currentAvatarBlobUrlReferences.clear();
        for (const s of t) {
            const t = document.createElement("tr");
            this.membersTbody.appendChild(t),
            t.style.cssText = `\n\t\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t\t`;
            const n = document.createElement("td");
            if (n.classList.add("squad-players-leader-container"),
            t.appendChild(n),
            s.leader) {
                const t = document.createElement("div");
                t.classList.add("squad-leader-icon"),
                n.appendChild(t)
            }
            const a = document.createElement("td");
            a.classList.add("squad-players-avatar-container"),
            t.appendChild(a);
            const o = document.createElement("div");
            o.classList.add("player-avatar"),
            a.appendChild(o);
            const r = 40 * globalThis.devicePixelRatio
              , l = this.avatarsManager.getAvatar({
                backgroundColor: teamColors[s.teamId].cssColor,
                width: r,
                height: r,
                skinObjectOpts: {
                    teamId: s.teamId,
                    skin: s.skinData
                }
            }).getBlobUrlReference();
            this.currentAvatarBlobUrlReferences.add(l),
            (async()=>{
                const t = await l.getBlobUrl();
                o.style.backgroundImage = `url("${t}")`
            }
            )();
            const h = document.createElement("td");
            t.appendChild(h),
            h.textContent = s.name;
            let d = "";
            if (s.joined && !i ? d = "Joined" : s.ready && !e && (d = "Ready"),
            d) {
                const t = document.createElement("span");
                t.classList.add("players-list-label"),
                t.textContent = d,
                h.appendChild(t)
            }
        }
        for (const t of s)
            t.destructor();
        this.updateStartButtonEnabled()
    }
    updateJoinButtonVisibility() {
        const t = this.joinSquadIdInput.value.trim().length > 0;
        this.joinSquadIdButton.el.style.display = t ? "" : "none"
    }
    updateStartButtonEnabled(t=!1) {
        this.startButton.enabled = this.squadManager.startButtonEnabled,
        this.squadManager.startClicked && t && this.close()
    }
    updateReadyStartButtonVisibility() {
        let t = !1;
        for (const e of this.squadManager.getSquadMembers()) {
            t = !0;
            break
        }
        const e = this.gameManager.getOnlineGame()
          , i = (!e || e.gameEnded) && null != this.squadManager.userVisibleSquadId && t;
        this.inSquadButtonsContainer.classList.toggle("hidden", !i)
    }
}
class MapItemUi {
    constructor(t, e) {
        this.onJoinClickedCbs = new Set,
        this.el = document.createElement("div"),
        this.el.classList.add("map-item"),
        this.titleEl = document.createElement("h2"),
        this.titleEl.classList.add("map-item-title", "blueNight"),
        this.titleEl.textContent = e.name,
        this.el.appendChild(this.titleEl),
        this.thumbEl = document.createElement("div"),
        this.thumbEl.classList.add("map-item-thumb", "wrinkled-paper-mask"),
        this.el.appendChild(this.thumbEl);
        const i = `url("${t.basePath}mapThumbs/${e.assetName}.webp")`;
        this.thumbEl.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        this.thumbEl.style.backgroundImage = `${i}`,
        this.thumbEl.style.backgroundImage = `${i} !important`;
        const s = new UiButton({
            text: "Join",
            extraClasses: ["map-item-join-button"],
            onClick: ()=>{
                this.onJoinClickedCbs.forEach((t=>t()))
            }
        });
        this.el.appendChild(s.el)
    }
    onJoinClicked(t) {
        this.onJoinClickedCbs.add(t)
    }
}
class MapsDialogUi extends DialogUi {
    constructor(t, e, i) {
        super(),
        this.configManager = t,
        this.preferredMapManager = e,
        this.gameManager = i,
        this.mapsContainer = document.createElement("div"),
        this.mapsContainer.classList.add("maps-container"),
        this.el.appendChild(this.mapsContainer),
        this.maps = [],
        this.configManager.mapsConfig.onConfigChange((t=>{
            this.updateMaps(t)
        }
        ))
    }
    updateMaps(t) {
        for (this.maps = []; this.mapsContainer.firstChild; )
            this.mapsContainer.removeChild(this.mapsContainer.firstChild);
        for (const e of t.maps) {
            const t = new MapItemUi(this.configManager,e);
            this.maps.push(t),
            this.mapsContainer.appendChild(t.el),
            t.onJoinClicked((async()=>{
                const t = getMainInstance()
                  , i = t.network.squadManager;
                if (!i.isInSquad || i.myClientIsSquadLeader)
                    if (this.preferredMapManager.forceSoloMap(e.hash),
                    i.myClientIsSquadLeader && !t.gameManager.getOnlineGame())
                        i.startSquad(),
                        this.close();
                    else {
                        await this.gameManager.checkExistingGameAndJoin() ? this.close() : this.preferredMapManager.disableForcedSoloMap()
                    }
                else
                    t.dialogManager.showAlert({
                        title: "You are currently in a squad",
                        text: "Only the squad leader may choose a map."
                    })
            }
            ))
        }
    }
}
let supported = "serviceWorker"in navigator;
navigator.userAgent.includes("AppleWebKit/605.1.15") && !parseSearch().serviceWorker && (supported = !1);
let installCalled = !1
  , registration = null;
async function installServiceWorker() {
    if (installCalled)
        throw new Error("install() is already called");
    if (installCalled = !0,
    !supported)
        return;
    if (getMainInstance().poki.isPokiBuild)
        return;
    let t;
    t = "./sw.js";
    const e = new URL("./sw.js",import.meta.url)
      , i = await navigator.serviceWorker.register(e.href, {
        scope: "./"
    });
    registration = i,
    i.addEventListener("updatefound", (t=>{
        const e = i.installing;
        i.active && e && e.addEventListener("statechange", (t=>{
            "installed" == e.state && markUpdateReady()
        }
        ))
    }
    )),
    registration.waiting && markUpdateReady(),
    navigator.serviceWorker.addEventListener("controllerchange", (()=>{
        window.location.reload()
    }
    ))
}
const onUpdateReadyCbs = new Set;
let beforeInstallPromptEvent, updateReady = !1;
function markUpdateReady() {
    updateReady = !0,
    onUpdateReadyCbs.forEach((t=>t()))
}
function getIsInstalled() {
    return !!supported && (!getMainInstance().poki.isPokiBuild && !(!registration || !registration.active))
}
function onUpdateReady(t) {
    onUpdateReadyCbs.add(t)
}
function getUpdateReady() {
    return updateReady
}
function skipWaiting() {
    if (!registration)
        throw new Error("No active service worker registration");
    const t = registration.waiting;
    if (!t)
        throw new Error("No service worker is currently waiting");
    t.postMessage({
        type: "skipWaiting"
    })
}
window.addEventListener("beforeinstallprompt", (t=>{
    onInstallAvailableCbs.forEach((t=>t())),
    beforeInstallPromptEvent = t,
    t.preventDefault()
}
));
const onInstallAvailableCbs = new Set;
function onInstallAvailable(t) {
    onInstallAvailableCbs.add(t)
}
async function promptInstall() {
    if (!beforeInstallPromptEvent)
        throw new Error("Install available event hasn't fired yet");
    return beforeInstallPromptEvent.prompt(),
    await beforeInstallPromptEvent.userChoice
}
class Timeout {
    constructor(t, e, i=!1) {
        this.cb = t,
        this.id = -1,
        this.ms = e,
        this.isDestructed = !1,
        i && this.start()
    }
    destructor() {
        this.stop(),
        this.isDestructed = !0
    }
    get isRunning() {
        return -1 != this.id
    }
    stop() {
        if (!this.isDestructed)
            return this.id >= 0 && (clearTimeout(this.id),
            this.id = -1,
            !0)
    }
    start(t=this.ms) {
        this.isDestructed || (this.stop(),
        this.id = setTimeout(this.execute.bind(this), t))
    }
    execute() {
        this.id = -1,
        this.cb && this.cb()
    }
    static promise(t) {
        return new Promise(((e,i)=>{
            setTimeout((()=>{
                e()
            }
            ), t)
        }
        ))
    }
}
class PhysicsValue {
    constructor({startValue: t=0, springMultiplier: e=.02, maxSpring: i=1 / 0, dampening: s=.6, loopValue: n=!1, loopStart: a=-Math.PI, loopEnd: o=Math.PI}={}) {
        this.value = t,
        this.target = t,
        this.velocity = 0,
        this.springMultiplier = e,
        this.maxSpring = i,
        this.dampening = s,
        this.loopValue = n,
        this.loopStart = a,
        this.loopEnd = o
    }
    loop(t, e) {
        let i = this.target - this.value;
        if (this.loopValue) {
            this.target = this.performValueLoop(this.target);
            const t = this.loopEnd - this.loopStart
              , e = this.target
              , s = this.target - t
              , n = this.target + t
              , a = e - this.value
              , o = s - this.value
              , r = n - this.value;
            i = a,
            Math.abs(o) < Math.abs(i) && (i = o),
            Math.abs(r) < Math.abs(i) && (i = r)
        }
        i *= this.springMultiplier,
        i = clamp(i, -this.maxSpring, this.maxSpring),
        this.velocity += i,
        this.velocity *= this.dampening,
        this.value += this.velocity * e,
        this.loopValue && (this.value = this.performValueLoop(this.value))
    }
    performValueLoop(t) {
        return modMinMax(t, this.loopStart, this.loopEnd)
    }
}
class PhysicsValue3d {
    constructor({startValue: t=new Vector3, springMultiplier: e=.02, maxSpring: i=1 / 0, dampening: s=.6}={}) {
        this.xValue = new PhysicsValue({
            startValue: t.x,
            springMultiplier: e,
            maxSpring: i,
            dampening: s
        }),
        this.yValue = new PhysicsValue({
            startValue: t.y,
            springMultiplier: e,
            maxSpring: i,
            dampening: s
        }),
        this.zValue = new PhysicsValue({
            startValue: t.z,
            springMultiplier: e,
            maxSpring: i,
            dampening: s
        })
    }
    loop(t, e) {
        this.xValue.loop(t, e),
        this.yValue.loop(t, e),
        this.zValue.loop(t, e)
    }
    get value() {
        return new Vector3(this.xValue.value,this.yValue.value,this.zValue.value)
    }
    set value(t) {
        this.xValue.value = t.x,
        this.yValue.value = t.y,
        this.zValue.value = t.z
    }
    get target() {
        return new Vector3(this.xValue.target,this.yValue.target,this.zValue.target)
    }
    set target(t) {
        this.xValue.target = t.x,
        this.yValue.target = t.y,
        this.zValue.target = t.z
    }
    addImpulse(t) {
        this.xValue.velocity += t.x,
        this.yValue.velocity += t.y,
        this.zValue.velocity += t.z
    }
}
const configDefaults = {
    posOffset: new Vector3,
    rotOffset: new Vector3,
    posFovMultiplierX: 0,
    posFovMultiplierY: 0,
    posBaseFovMultiplierX: 0,
    walkBobMultiplier: 1,
    valuesSmoothing: .2,
    pitchHeightMultiplier: .3,
    minFov: 0,
    maxFov: 180
};
class PlayerHoldingHandler {
    constructor(t, {holdingObject: e, thirdPersonParentName: i, secondaryThirdPersonParentName: s, firstPersonConfig: n}) {
        this.player = t,
        this.holdingObject = e,
        this.usePrimaryParent = !0,
        this.thirdPersonParentName = i,
        this.secondaryThirdPersonParentName = s || null,
        this.firstPersonPosOffset = new Vector3,
        this.firstPersonRotOffset = new Quaternion,
        this.smoothFirstPersonPosOffset = new Vector3,
        this.smoothFirstPersonRotOffset = new Quaternion,
        this.smoothFirstPersonPosFovMultiplierX = 0,
        this.smoothFirstPersonPosBaseFovMultiplierX = 0,
        this.smoothFirstPersonPosFovMultiplierY = 0,
        this.smoothFirstPersonWalkBobMultiplier = 0,
        this.smoothFirstPersonPitchHeightMultiplier = 0,
        this.smoothFirstPersonMinFov = 0,
        this.smoothFirstPersonMaxFov = 0,
        this.prevCamPosValid = !1,
        this.prevCamRotValid = !1,
        this.prevCamPos = new Vector3,
        this.prevCamRotForwardVector = new Vector3,
        this.camPosOffsetPhysics = new PhysicsValue3d({
            springMultiplier: .01,
            maxSpring: .001,
            dampening: .6
        }),
        this.camRotOffsetPhysics = new PhysicsValue({
            springMultiplier: .003,
            maxSpring: .001,
            dampening: .8
        }),
        this.renderOverlay = getMainInstance().renderer.createRenderOverlay(),
        this.firstPersonObjContainer = new Object3D,
        this.firstPersonObjContainer.name = "FirstPersonObjContainer",
        this.renderOverlay.scene.add(this.firstPersonObjContainer),
        this.linkedThirdPersonObject = null,
        this.firstPersonConfig = {
            ...configDefaults
        },
        this.setFirstPersonConfig(n || {}, !0),
        this.updateRenderOverlayEnabled(),
        this.updateParent(),
        this.updateFirstPersonPosition(),
        this.firstPersonMoveDown()
    }
    destructor() {
        this.player.removeHoldingHandler(this),
        getMainInstance().renderer.removeRenderOverlay(this.renderOverlay),
        this.firstPersonObjContainer.parent && this.firstPersonObjContainer.parent.remove(this.firstPersonObjContainer),
        this.holdingObject.parent && this.holdingObject.parent.remove(this.holdingObject)
    }
    updateRenderOverlayEnabled() {
        this.renderOverlay.enabled = this.player.useFirstPersonHoldingHandlers
    }
    setUsePrimaryParent(t) {
        this.usePrimaryParent != t && (this.usePrimaryParent = t,
        this.updateParent())
    }
    updateParent() {
        if (this.holdingObject.parent && this.holdingObject.parent.remove(this.holdingObject),
        this.player.useFirstPersonHoldingHandlers)
            this.firstPersonObjContainer.add(this.holdingObject),
            this.holdingObject.position.set(0, 0, 0),
            this.holdingObject.rotation.set(0, 0, 0);
        else if (this.player.obj && this.player.skeleton && this.player.skeleton.isInit) {
            if (!this.player.skeleton.baseSkeletonObject)
                throw new Error("Assertion failed, skeleton is not initialized");
            let t;
            t = this.usePrimaryParent ? this.thirdPersonParentName : this.secondaryThirdPersonParentName,
            t && (this.linkedThirdPersonObject = this.player.skeleton.baseSkeletonObject.getObjectByName(t),
            this.linkedThirdPersonObject && (this.player.obj.add(this.holdingObject),
            this.holdingObject.position.set(0, 0, 0),
            this.holdingObject.rotation.set(0, 0, 0),
            this.holdingObject.scale.setScalar(1)))
        }
    }
    loop(t, e) {
        if (this.player.useFirstPersonHoldingHandlers) {
            this.smoothFirstPersonPosOffset.lerp(this.firstPersonPosOffset, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonRotOffset.slerp(this.firstPersonRotOffset, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonPosFovMultiplierX = lerp(this.smoothFirstPersonPosFovMultiplierX, this.firstPersonConfig.posFovMultiplierX, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonPosBaseFovMultiplierX = lerp(this.smoothFirstPersonPosBaseFovMultiplierX, this.firstPersonConfig.posBaseFovMultiplierX, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonPosFovMultiplierY = lerp(this.smoothFirstPersonPosFovMultiplierY, this.firstPersonConfig.posFovMultiplierY, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonWalkBobMultiplier = lerp(this.smoothFirstPersonWalkBobMultiplier, this.firstPersonConfig.walkBobMultiplier, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonPitchHeightMultiplier = lerp(this.smoothFirstPersonPitchHeightMultiplier, this.firstPersonConfig.pitchHeightMultiplier, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonMinFov = lerp(this.smoothFirstPersonMinFov, this.firstPersonConfig.minFov, this.firstPersonConfig.valuesSmoothing),
            this.smoothFirstPersonMaxFov = lerp(this.smoothFirstPersonMaxFov, this.firstPersonConfig.maxFov, this.firstPersonConfig.valuesSmoothing);
            const i = this.player.getCamPos()
              , s = this.player.getCamRot();
            this.prevCamPosValid || (this.prevCamPos.copy(i),
            this.prevCamPosValid = !0);
            const n = i.clone().sub(this.prevCamPos);
            n.applyQuaternion(s.invert());
            const a = new Vector3(0,0,1).clone().applyQuaternion(s);
            a.y = 0,
            this.prevCamRotValid || (this.prevCamRotForwardVector.copy(a),
            this.prevCamRotValid = !0);
            let o = this.prevCamRotForwardVector.angleTo(a);
            this.prevCamRotForwardVector.clone().cross(a).y > 0 && (o *= -1),
            this.prevCamPos.copy(i),
            this.prevCamRotForwardVector.copy(a);
            const r = n.clone();
            r.clampLength(0, .07),
            this.camPosOffsetPhysics.target = r,
            this.camPosOffsetPhysics.loop(t, e),
            this.camRotOffsetPhysics.target = o,
            this.camRotOffsetPhysics.loop(t, e),
            this.updateFirstPersonPosition()
        } else if (this.player.obj && this.linkedThirdPersonObject) {
            this.holdingObject.matrixWorld.multiplyMatrices(this.player.obj.matrixWorld, this.linkedThirdPersonObject.matrixWorld);
            for (const t of this.holdingObject.children)
                t.updateWorldMatrix(!1, !0)
        }
    }
    setFirstPersonConfig(t, e=!1) {
        const i = t;
        this.firstPersonConfig = {
            ...configDefaults,
            ...i
        },
        this.firstPersonPosOffset.copy(this.firstPersonConfig.posOffset);
        const s = (new Euler).setFromVector3(this.firstPersonConfig.rotOffset, "YXZ");
        this.firstPersonRotOffset.setFromEuler(s),
        this.firstPersonRotOffset.multiply((new Quaternion).setFromAxisAngle(new Vector3(0,1,0), Math.PI)),
        e && (this.smoothFirstPersonPosOffset.copy(this.firstPersonConfig.posOffset),
        this.smoothFirstPersonRotOffset.copy(this.firstPersonRotOffset),
        this.smoothFirstPersonPosFovMultiplierX = this.firstPersonConfig.posFovMultiplierX,
        this.smoothFirstPersonPosBaseFovMultiplierX = this.firstPersonConfig.posBaseFovMultiplierX,
        this.smoothFirstPersonPosFovMultiplierY = this.firstPersonConfig.posFovMultiplierY,
        this.smoothFirstPersonWalkBobMultiplier = this.firstPersonConfig.walkBobMultiplier,
        this.smoothFirstPersonPitchHeightMultiplier = this.firstPersonConfig.pitchHeightMultiplier,
        this.smoothFirstPersonMinFov = this.firstPersonConfig.minFov,
        this.smoothFirstPersonMaxFov = this.firstPersonConfig.maxFov,
        this.updateRenderOverlayFovs(),
        this.renderOverlay.updateProjectionMatrix()),
        this.updateFirstPersonPosition()
    }
    updateFirstPersonPosition() {
        if (!this.player.useFirstPersonHoldingHandlers)
            return;
        const t = getMainInstance()
          , e = this.player.getCamRot()
          , i = new Vector3(0,1,0)
          , s = new Vector3(0,0,1)
          , n = new Vector3(1,0,0)
          , a = i.clone().applyQuaternion(e)
          , o = s.clone().applyQuaternion(e)
          , r = n.clone().applyQuaternion(e)
          , l = o.clone();
        a.y < .1 && (l.copy(a),
        o.y > 0 && l.negate()),
        l.y = 0;
        let h = l.angleTo(s);
        s.clone().cross(l).y > 0 && (h = -h);
        let d = o.angleTo(l);
        o.clone().cross(l).dot(r) > 0 && (d = -d);
        const c = new Quaternion;
        n.applyQuaternion(e),
        c.setFromAxisAngle(n, d);
        (new Quaternion).setFromAxisAngle(new Vector3(0,1,0), -h);
        const u = this.smoothFirstPersonPosOffset.clone()
          , p = Math.min(window.innerWidth / window.innerHeight, 2)
          , g = this.renderOverlay.cam.fov
          , m = Math.tan(g / 115) * p
          , f = Math.tan(g / 115)
          , w = Math.tan(t.cam.baseFov / 115) * p;
        u.x += m * this.smoothFirstPersonPosFovMultiplierX,
        u.x += w * this.smoothFirstPersonPosBaseFovMultiplierX,
        u.y -= f * this.smoothFirstPersonPosFovMultiplierY,
        u.y -= d * this.smoothFirstPersonPitchHeightMultiplier,
        t.settingsManager.getValue("walkHeadBob") && (u.x += .1 * Math.cos(this.player.legsMoveTForCos / 2) * this.smoothFirstPersonWalkBobMultiplier,
        u.y += -.07 * Math.sin(this.player.legsMoveTForCos) * this.smoothFirstPersonWalkBobMultiplier),
        u.sub(this.camPosOffsetPhysics.value),
        u.x += this.camRotOffsetPhysics.value;
        const b = new Quaternion;
        b.multiply(this.smoothFirstPersonRotOffset),
        this.firstPersonObjContainer.position.copy(u),
        this.firstPersonObjContainer.quaternion.copy(b),
        this.updateRenderOverlayFovs(),
        this.firstPersonObjContainer.updateWorldMatrix(!1, !0)
    }
    updateRenderOverlayFovs() {
        this.renderOverlay.minFov = this.smoothFirstPersonMinFov,
        this.renderOverlay.maxFov = this.smoothFirstPersonMaxFov
    }
    useFirstPersonUpdated() {
        this.updateRenderOverlayEnabled(),
        this.updateParent()
    }
    playerObjectChanged() {
        this.updateParent()
    }
    addFirstPersonImpulse(t) {
        this.player.useFirstPersonHoldingHandlers && this.camPosOffsetPhysics.addImpulse(t)
    }
    firstPersonMoveDown() {
        this.camPosOffsetPhysics.yValue.value = .3
    }
}
class SingleInstancePromise {
    constructor(t, {once: e=!1}={}) {
        this.once = e,
        this.promiseFn = t,
        this._queue = [],
        this._isEmptyingQueue = !1,
        this.hasRun = !1,
        this._onceReturnValue = void 0,
        this._onFinishCbs = new Set
    }
    async run(...t) {
        if (this.hasRun && this.once)
            return this._onceReturnValue;
        const e = new Promise((e=>this._queue.push({
            resolve: e,
            args: t
        })));
        return this._emptyQueue(),
        await e
    }
    async _emptyQueue() {
        if (!this._isEmptyingQueue) {
            for (this._isEmptyingQueue = !0; this._queue.length > 0; ) {
                if (this.once && this.hasRun) {
                    const t = this._onceReturnValue;
                    this._queue.forEach((e=>e.resolve(t))),
                    this._queue = [];
                    break
                }
                const t = this._queue;
                this._queue = [];
                const e = t[t.length - 1];
                if (!e)
                    throw new Error("Assertion failed, queue is empty.");
                this._isEmptyingQueue = !0;
                const i = await this.promiseFn(...e.args);
                this._isEmptyingQueue = !1,
                this.hasRun = !0,
                this._onFinishCbs.forEach((t=>t())),
                this._onFinishCbs.clear(),
                this.once && (this._onceReturnValue = i);
                for (const {resolve: e} of t)
                    e(i)
            }
            this._isEmptyingQueue = !1
        }
    }
    async waitForFinish() {
        if (this.hasRun)
            return;
        const t = new Promise((t=>this._onFinishCbs.add(t)));
        await t
    }
    async waitForFinishIfRunning() {
        if (!this._isEmptyingQueue)
            return;
        const t = new Promise((t=>this._onFinishCbs.add(t)));
        await t
    }
}
class MatchMakingManager {
    constructor() {
        this.matchMakingSocketUrl = "",
        this.ws = null,
        this.onJoinServerReceivedCbs = new Set,
        this.nextCloseIsIntentional = !1,
        this.onConnectionCloseCbs = new Set,
        this.onConnectionOpenCbs = new Set,
        this.onConnectionCloseDuringMatchMakingCbs = new Set,
        this.onSquadMessageCbs = new Set,
        this.onIsMatchMakingChangeCbs = new Set,
        this.matchMakingLoadingText = null,
        this.isMatchMaking = !1,
        this.shouldApplyLoadingText = !0,
        this.valuesLoaded = !1,
        this.onValuesLoadCbs = new Set,
        this.elo = 0,
        this.smoothSkillLevel = 0,
        this.smoothSkillLevelGameCount = 0,
        this.isInUnreadyQueue = !1,
        this.initConnectionInstance = new SingleInstancePromise((async()=>{
            if (this.connected)
                return !0;
            for (let t = 0; t < 3; t++) {
                t > 0 && await Timeout.promise(2e3 * t);
                const e = await this.attemptSingleWsConnection();
                if (e)
                    return this.send({
                        op: "myClientVersion",
                        version: "1685095066"
                    }),
                    this.sendDownloadedMapHashes(),
                    this.sendSkillLevel(),
                    this.onConnectionOpenCbs.forEach((t=>t())),
                    e.addEventListener("close", (()=>{
                        e == this.ws && this.fireOnCloseCbs()
                    }
                    )),
                    !0
            }
            return !1
        }
        ))
    }
    init() {
        this.matchMakingLoadingText = getMainInstance().mainInfoTextManager.requestInfoText("Searching for players...");
        const t = parseSearch();
        if ("local" != getMainInstance().env || t.useProductionServers)
            this.matchMakingSocketUrl = "wss://matchmaking.narrow-one.com/";
        else {
            let t = "wss";
            "http:" == location.protocol && (t = "ws"),
            this.matchMakingSocketUrl = `${t}://${window.location.host}/matchmaking`
        }
        getMainInstance().preferredMapManager.onMatchMakeDataChange((()=>{
            this.sendDownloadedMapHashes()
        }
        )),
        getMainInstance().config.mapsConfig.onConfigChange((()=>{
            this.sendDownloadedMapHashes()
        }
        )),
        this.loadValues()
    }
    setIsMatchMaking(t) {
        this.isMatchMaking = t,
        this.onIsMatchMakingChangeCbs.forEach((t=>t())),
        this.updateLoadingText()
    }
    setShouldApplyLoadingText(t) {
        this.shouldApplyLoadingText = t,
        this.updateLoadingText()
    }
    updateLoadingText() {
        this.matchMakingLoadingText && this.matchMakingLoadingText.setIsLoading(this.isMatchMaking && this.shouldApplyLoadingText)
    }
    async loadValues() {
        try {
            const t = await getMainInstance().indexedDb.get("matchMakeSavedValues");
            t && (this.smoothSkillLevel = t.smoothSkillLevel,
            this.smoothSkillLevelGameCount = t.smoothSkillLevelGameCount,
            this.elo = t.elo)
        } catch (t) {}
        (isNaN(this.smoothSkillLevel) || isNaN(this.smoothSkillLevelGameCount) || "number" != typeof this.smoothSkillLevel || "number" != typeof this.smoothSkillLevelGameCount) && (this.smoothSkillLevel = 0,
        this.smoothSkillLevelGameCount = 0),
        (isNaN(this.elo) || "number" != typeof this.elo) && (this.elo = 0),
        this.valuesLoaded = !0,
        this.onValuesLoadCbs.forEach((t=>t())),
        this.sendSkillLevel()
    }
    async waitForValuesLoad() {
        if (this.valuesLoaded)
            return;
        const t = new Promise((t=>{
            this.onValuesLoadCbs.add(t)
        }
        ));
        await t
    }
    async saveValues() {
        const t = {
            elo: this.elo,
            smoothSkillLevel: this.smoothSkillLevel,
            smoothSkillLevelGameCount: this.smoothSkillLevelGameCount
        };
        try {
            await getMainInstance().indexedDb.set("matchMakeSavedValues", t)
        } catch (t) {}
    }
    async initConnection() {
        return this.nextCloseIsIntentional = !1,
        await this.initConnectionInstance.run()
    }
    async assertInitConnection() {
        if (!await this.initConnection())
            throw new MatchMakeConnectionError
    }
    get connected() {
        return this.ws && this.ws.readyState == WebSocket.OPEN
    }
    async attemptSingleWsConnection() {
        const t = new WebSocket(this.matchMakingSocketUrl);
        this.ws = t;
        const e = ["squadId", "squadJoinError", "fullSquadMembersList", "squadMemberUpdated", "squadMemberRemoved", "squadStartedState", "squadSettings", "squadSettingChanged", "yourSquadLeaderState", "squadReadyForStartState"];
        return this.ws.addEventListener("message", (i=>{
            if (t != this.ws)
                return;
            const s = JSON.parse(i.data);
            if ("joinGame" == s.op) {
                this.setIsMatchMaking(!1);
                for (const t of this.onJoinServerReceivedCbs)
                    t(s.game)
            } else
                "reloadMapsConfig" == s.op ? getMainInstance().config.mapsConfig.load() : e.includes(s.op) && this.onSquadMessageCbs.forEach((t=>t(s)))
        }
        )),
        await new Promise((e=>{
            t.addEventListener("close", (t=>{
                e(null)
            }
            )),
            t.addEventListener("open", (i=>{
                e(t)
            }
            ))
        }
        ))
    }
    closeMatchMakingConnection() {
        if (!this.ws)
            return;
        this.markNextCloseAsIntentional();
        const t = this.ws;
        this.ws = null,
        t.close(),
        this.fireOnCloseCbs()
    }
    markNextCloseAsIntentional() {
        this.nextCloseIsIntentional = !0
    }
    fireOnCloseCbs() {
        this.isMatchMaking && (this.onConnectionCloseDuringMatchMakingCbs.forEach((t=>t())),
        this.setIsMatchMaking(!1)),
        this.onConnectionCloseCbs.forEach((t=>t(this.nextCloseIsIntentional)))
    }
    async updateQueueState({isReadyToJoin: t=!0, maxWaitTimeMs: e}={}) {
        this.setIsMatchMaking(!0),
        this.isInUnreadyQueue = !t;
        try {
            await this.assertInitConnection()
        } catch (t) {
            throw this.setIsMatchMaking(!1),
            t
        }
        const i = getMainInstance()
          , s = !i.gameManager.joinedOnce;
        let n;
        n = null == e ? s || i.preferredMapManager.isForcingSoloMap ? 0 : Math.min(5e3, 1e3 * this.smoothSkillLevelGameCount) : e,
        this.send({
            op: "updateQueueState",
            maxWaitTimeMs: n,
            isFirstGame: s,
            isReadyToJoin: t
        })
    }
    async leaveQueue() {
        this.isInUnreadyQueue = !1,
        await this.initConnection(),
        this.connected && (this.setIsMatchMaking(!1),
        this.isInUnreadyQueue = !1,
        this.send({
            op: "leaveQueue"
        }))
    }
    onConnectionOpen(t) {
        this.onConnectionOpenCbs.add(t)
    }
    onConnectionClose(t) {
        this.onConnectionCloseCbs.add(t)
    }
    onConnectionCloseDuringMatchMaking(t) {
        this.onConnectionCloseDuringMatchMakingCbs.add(t)
    }
    onIsMatchMakingChange(t) {
        this.onIsMatchMakingChangeCbs.add(t)
    }
    send(t) {
        if (!this.connected || !this.ws)
            return;
        const e = JSON.stringify(t);
        this.ws.send(e)
    }
    sendDownloadedMapHashes() {
        const t = getMainInstance().preferredMapManager.getMatchMakeData();
        t && this.send(t)
    }
    getMappedSmoothSkillLevel() {
        const t = this.smoothSkillLevel / 100
          , e = -5.7
          , i = -Math.pow(2, 5.7 - 12.8 * t)
          , s = (Math.log10(i * e * Math.log10(2) + 1) + e * Math.log10(2)) / (e * Math.log10(2));
        return Math.max(0, s)
    }
    sendSkillLevel() {
        this.valuesLoaded && (this.send({
            op: "skillLevel",
            skillLevel: this.getMappedSmoothSkillLevel()
        }),
        this.send({
            op: "elo",
            elo: this.elo
        }))
    }
    onJoinServerReceived(t) {
        this.onJoinServerReceivedCbs.add(t)
    }
    updateSmoothSkillLevel(t) {
        this.smoothSkillLevelGameCount++;
        const e = mapValue(0, 5, .7, .4, this.smoothSkillLevelGameCount, !0);
        this.smoothSkillLevel = lerp(this.smoothSkillLevel, t, e),
        this.saveValues()
    }
    updateElo(t) {
        this.valuesLoaded && (this.elo += t,
        this.saveValues())
    }
    async sendRequestSquadId() {
        await this.assertInitConnection(),
        this.send({
            op: "requestSquadId"
        })
    }
    async sendJoinSquad(t, e, i) {
        await this.assertInitConnection(),
        this.send({
            op: "joinSquad",
            squadId: t,
            allowJoinExistingGame: e,
            allowCreate: i
        })
    }
    onSquadMessage(t) {
        this.onSquadMessageCbs.add(t)
    }
    sendSquadSettingChange(t, e) {
        this.send({
            op: "changeSquadSetting",
            setting: t,
            value: e
        })
    }
    sendAllSquadSettings(t) {
        this.send({
            op: "allSquadSettings",
            settings: t
        })
    }
    sendUsername(t) {
        this.send({
            op: "username",
            username: t
        })
    }
    sendStartSquad() {
        this.send({
            op: "startSquad"
        })
    }
    sendAllowAutoStartSquad() {
        this.send({
            op: "allowAutoStartSquad"
        })
    }
    sendRequestSquadLeadership(t) {
        this.send({
            op: "requestSquadLeadership",
            token: t
        })
    }
    sendMySkinData(t) {
        this.send({
            op: "mySkinData",
            skinData: t
        })
    }
}
class SquadManager {
    constructor(t, e, i) {
        this.networkManager = t,
        this.matchMakeManager = e,
        this.gameManager = i,
        this.isJoiningSquad = !1,
        this.matchmakeServerSquadId = null,
        this.gameServerSquadId = null,
        this.onBeforeJoinFired = !1,
        this.lastSentUsername = null,
        this.lastSentSkinDataStr = null,
        this.shouldShowSquadDialogForCurrentSquadId = !1,
        this.matchMakeSquadMembers = new Map,
        this.matchMakeSquadMembersOnGameJoin = new Map,
        this.includeUnjoinedMembers = !1,
        this.includeUnjoinedMembersTimeout = new Timeout((()=>{
            this.includeUnjoinedMembers = !1,
            this.updateSquadMembersData()
        }
        ),3e4),
        this.gameSquadPlayers = [],
        this.mySquadPlayerId = 0,
        this.matchMakeAllReady = !1,
        this.serverReadyForStartState = !1,
        this.onServerReadyForStartStateChangeCbs = new Set,
        this.onServerReadyForStartTrueCbs = new Set,
        this.clientStartClicked = !1,
        this.clientStartClickedTimeout = new Timeout((()=>{
            this.clientStartClicked = !1,
            this.updateStartClicked()
        }
        ),2e3),
        this.serverStartClicked = !1,
        this.startClicked = !1,
        this.onStartClickedChangeCbs = new Set,
        this.prevUserVisibleSquadId = null,
        this.onUserVisibleSquadIdChangeCbs = new Set,
        this.onIsJoiningSquadChangeCbs = new Set,
        this.onSquadMembersChangeCbs = new Set,
        this.currentSquadSettings = null,
        this.beforeMatchmakeConnectSquadSettings = null,
        this.myClientIsSquadLeader = !1,
        this.lastSquadLeaderToken = null,
        this.onSquadSettingChangeCbs = new Set,
        this.onMySquadLeaderStateChangeCbs = new Set,
        this.matchMakeManager.onSquadMessage((t=>{
            if ("squadId" == t.op)
                this.setIsJoiningSquad(!1),
                this.setMatchmakeServerSquadId(t.squadId),
                this.sendCurrentUsername(),
                this.sendMySkinIds(),
                this.setMyClientIsSquadLeader(!1),
                this.shouldShowSquadDialogForCurrentSquadId && (this.shouldShowSquadDialogForCurrentSquadId = !1,
                t.willJoinImmediately || getMainInstance().mainMenu.openSquadDialog()),
                this.lastSquadLeaderToken && this.matchMakeManager.sendRequestSquadLeadership(this.lastSquadLeaderToken);
            else if ("squadJoinError" == t.op)
                this.handleSquadJoinError(t.errorType, t.squadId);
            else if ("squadSettings" == t.op)
                this.currentSquadSettings = t.settings;
            else if ("squadSettingChanged" == t.op)
                this.currentSquadSettings && (this.currentSquadSettings[t.setting] = t.value),
                this.onSquadSettingChangeCbs.forEach((e=>e(t.setting, t.value)));
            else if ("yourSquadLeaderState" == t.op)
                t.token && (this.lastSquadLeaderToken = t.token),
                this.setMyClientIsSquadLeader(t.isLeader);
            else if ("fullSquadMembersList" == t.op) {
                for (const e of t.members)
                    e.myPlayer && (this.mySquadPlayerId = e.id),
                    this.matchMakeSquadMembers.set(e.id, {
                        name: e.name,
                        skinData: parseSkinDataString(e.skinDataStr),
                        ready: e.ready,
                        leader: e.leader
                    });
                this.updateSquadMembersData()
            } else if ("squadMemberUpdated" == t.op) {
                let e = this.matchMakeSquadMembers.get(t.member.id);
                e || (e = {
                    name: "",
                    ready: !1,
                    skinData: sanitizeSkinData(),
                    leader: !1
                },
                this.matchMakeSquadMembers.set(t.member.id, e)),
                e.name = t.member.name,
                e.ready = t.member.ready,
                e.skinData = parseSkinDataString(t.member.skinDataStr),
                e.leader = t.member.leader,
                this.updateSquadMembersData()
            } else
                "squadMemberRemoved" == t.op ? (this.matchMakeSquadMembers.delete(t.id),
                this.updateSquadMembersData()) : "squadReadyForStartState" == t.op ? (this.serverReadyForStartState = t.readyForStart,
                this.onServerReadyForStartStateChangeCbs.forEach((t=>t())),
                t.readyForStart && this.onServerReadyForStartTrueCbs.forEach((t=>t()))) : "squadStartedState" == t.op && (this.serverStartClicked = t.started,
                this.updateStartClicked(),
                this.updateLoadingText())
        }
        )),
        t.onBeforeConnectGameServer((()=>{
            this.onBeforeJoinFired = !0,
            this.gameServerSquadId = this.matchmakeServerSquadId,
            this.matchMakeSquadMembersOnGameJoin = new Map(this.matchMakeSquadMembers),
            this.includeUnjoinedMembers = !0,
            this.includeUnjoinedMembersTimeout.start(),
            this.updateSquadMembersData(),
            this.updateUserVisibleSquadId()
        }
        )),
        t.onConnectionOpen((()=>{
            t.sendSquadData(this.userVisibleSquadId || "", this.mySquadPlayerId, this.lastSquadLeaderToken)
        }
        )),
        t.onConnectionClosed(((t,e)=>{
            this.setIsJoiningSquad(!1),
            !t && this.gameServerSquadId && "afk" != e && this.joinExistingSquad(this.gameServerSquadId, !1),
            this.setGameServerSquadId(null)
        }
        )),
        t.onSquadJoinError((t=>{
            this.handleSquadJoinError(t)
        }
        )),
        this.matchMakeManager.onConnectionOpen((()=>{
            if (this.onBeforeJoinFired = !1,
            this.includeUnjoinedMembersTimeout.stop(),
            this.serverReadyForStartState = !1,
            this.mySquadPlayerId = 0,
            this.currentSquadSettings) {
                const t = {};
                for (const [e,i] of Object.entries(this.currentSquadSettings)) {
                    t[e] = i
                }
                this.beforeMatchmakeConnectSquadSettings = t
            } else
                this.beforeMatchmakeConnectSquadSettings = null;
            if (this.gameServerSquadId) {
                let t = !0;
                const e = i.getOnlineGame();
                e && e.gameEnded && (t = !1),
                this.joinExistingSquad(this.gameServerSquadId, t, t),
                this.matchMakeManager.sendAllowAutoStartSquad()
            }
            this.serverStartClicked = !1,
            this.updateStartClicked()
        }
        )),
        this.matchMakeManager.onConnectionClose((t=>{
            t ? this.setMatchmakeServerSquadId(null) : this.matchmakeServerSquadId && this.joinExistingSquad(this.matchmakeServerSquadId),
            this.lastSentUsername = null,
            this.lastSentSkinDataStr = null,
            this.matchMakeSquadMembers.clear(),
            this.updateSquadMembersData()
        }
        )),
        this.matchMakeManager.onIsMatchMakingChange((()=>{
            this.updateLoadingText()
        }
        )),
        this.boundUpdateGameSquadPlayers = this.updateGameSquadPlayers.bind(this),
        i.onActiveGameChange((t=>{
            t instanceof Game && (t && t.onSquadPlayersChange(this.boundUpdateGameSquadPlayers),
            this.updateGameSquadPlayers())
        }
        )),
        window.addEventListener("hashchange", (()=>{
            this.joinSquadFromCurrentHash()
        }
        ))
    }
    init() {
        this.waitingForSquadLoadingText = getMainInstance().mainInfoTextManager.requestInfoText("Waiting for squad...", {
            shouldBounce: !1
        }),
        this.waitingForSquadStartLoadingText = getMainInstance().mainInfoTextManager.requestInfoText("Waiting for squad to start", {
            shouldBounce: !1
        }),
        getMainInstance().profileState.onStateChanged((()=>{
            this.matchmakeServerSquadId && this.sendCurrentUsername()
        }
        )),
        getMainInstance().skins.onSkinConfigChange((()=>{
            this.sendMySkinIds()
        }
        )),
        this.joinSquadFromCurrentHash(!0)
    }
    get userVisibleSquadId() {
        return this.matchmakeServerSquadId || this.gameServerSquadId
    }
    get isInSquad() {
        return null != this.userVisibleSquadId
    }
    get startButtonEnabled() {
        return this.serverReadyForStartState && !this.startClicked
    }
    updateGameSquadPlayers() {
        this.gameSquadPlayers = [];
        const t = this.gameManager.getOnlineGame();
        if (t)
            for (const e of t.players.values())
                e.sameSquadOrOwned && this.gameSquadPlayers.push({
                    id: e.squadPlayerId,
                    name: e.playerName,
                    teamId: e.teamId,
                    skinData: e.equippedSkinData,
                    leader: e.isSquadLeader
                });
        this.updateSquadMembersData()
    }
    *getSquadMembers() {
        if (this.onBeforeJoinFired) {
            const t = new Map(this.matchMakeSquadMembersOnGameJoin);
            for (const e of this.gameSquadPlayers)
                t.delete(e.id),
                yield{
                    name: e.name,
                    teamId: e.teamId,
                    ready: !0,
                    joined: !0,
                    skinData: e.skinData,
                    leader: e.leader
                };
            for (const e of t.values())
                yield{
                    name: e.name,
                    teamId: 0,
                    ready: e.ready,
                    joined: !1,
                    skinData: sanitizeSkinData(),
                    leader: e.leader
                }
        } else
            for (const t of this.matchMakeSquadMembers.values())
                yield{
                    name: t.name,
                    teamId: 0,
                    ready: t.ready,
                    joined: !1,
                    skinData: t.skinData,
                    leader: t.leader
                }
    }
    get totalSquadMemberCount() {
        let t = 0;
        for (const e of this.getSquadMembers())
            t++;
        return t
    }
    setSquadSetting(t, e) {
        this.currentSquadSettings && "boolean" == typeof e && (this.currentSquadSettings[t] = e),
        this.matchMakeManager.connected && this.matchMakeManager.sendSquadSettingChange(t, e)
    }
    onSquadSettingChange(t) {
        this.onSquadSettingChangeCbs.add(t)
    }
    onMySquadLeaderStateChange(t) {
        this.onMySquadLeaderStateChangeCbs.add(t)
    }
    sendCurrentUsername() {
        if (!this.matchMakeManager.connected)
            return;
        const t = getMainInstance().profileState.username;
        t != this.lastSentUsername && (this.lastSentUsername = t,
        this.matchMakeManager.sendUsername(t))
    }
    sendMySkinIds() {
        if (!this.matchMakeManager.connected)
            return;
        const t = getMainInstance().skins.getClassSkinDataWithAppliedPreset("assault")
          , e = JSON.stringify(t);
        e != this.lastSentSkinDataStr && (this.lastSentSkinDataStr = e,
        this.matchMakeManager.sendMySkinData(e))
    }
    setMyClientIsSquadLeader(t) {
        this.myClientIsSquadLeader = t,
        t && this.beforeMatchmakeConnectSquadSettings && (this.matchMakeManager.sendAllSquadSettings(this.beforeMatchmakeConnectSquadSettings),
        this.beforeMatchmakeConnectSquadSettings = null),
        this.onMySquadLeaderStateChangeCbs.forEach((t=>t()))
    }
    setIsJoiningSquad(t) {
        t != this.isJoiningSquad && (this.isJoiningSquad = t,
        this.onIsJoiningSquadChangeCbs.forEach((t=>t())))
    }
    async requestInitialSquadId() {
        if (!this.isJoiningSquad && !this.isInSquad) {
            if (this.setIsJoiningSquad(!0),
            this.networkManager.hasGameServerConnection)
                this.networkManager.sendRequestSquadId();
            else {
                try {
                    await this.matchMakeManager.sendRequestSquadId()
                } catch (t) {
                    throw this.setIsJoiningSquad(!1),
                    t
                }
                this.setIsJoiningSquad(!1)
            }
            this.sendCurrentUsername(),
            this.sendMySkinIds()
        }
    }
    handleSquadJoinError(t, e) {
        if (this.setIsJoiningSquad(!1),
        "squad-not-found" == t) {
            let t = "The squad you are trying to join does not exist.";
            null != e && (t = `The squad with code "${e}" does not exist.`),
            getMainInstance().dialogManager.showAlert({
                title: "Squad not found",
                text: t
            })
        } else if ("client-version-too-old" == t)
            if (getIsInstalled()) {
                const t = [{
                    text: "Ok"
                }, {
                    text: "Update now",
                    onClick() {
                        skipWaiting()
                    },
                    enabled: getUpdateReady()
                }]
                  , e = getMainInstance().dialogManager.showAlert({
                    title: "Joining squad failed",
                    text: "The version of your game is too old for this squad.",
                    buttons: t
                });
                onUpdateReady((()=>{
                    t[1].enabled = !0,
                    e.setButtons(t)
                }
                ))
            } else
                getMainInstance().dialogManager.showAlert({
                    title: "Joining squad failed",
                    text: "Your version is too old to join this squad. Refresh the page to update to the latest version."
                });
        else
            "client-version-too-new" == t ? getMainInstance().dialogManager.showAlert({
                title: "Joining squad failed",
                text: "Your squadmates have an older version of the game, ask your squadmates to update the game."
            }) : "no-mm-connection" == t ? getMainInstance().dialogManager.showAlert({
                title: "Joining squad failed",
                text: "Could not connect to the matchmake server. Please try again later."
            }) : "proxy-create-timed-out" == t ? getMainInstance().dialogManager.showAlert({
                title: "Failed to create squad id",
                text: "The matchmake server timed out. Please try again later."
            }) : (getMainInstance().dialogManager.showAlert({
                title: "Joining squad failed",
                text: "An unknown error occurred. Please try again later."
            }),
            console.error(`Squad join error: ${t}`));
        this.updateUserVisibleSquadId()
    }
    async joinExistingSquad(t, e=!0, i=!0) {
        if (this.isJoiningSquad)
            return;
        i && this.networkManager.hasGameServerConnection && this.networkManager.closeCurrentConnection(),
        this.setIsJoiningSquad(!0);
        let s = [];
        try {
            s = await getMainInstance().indexedDb.get("recentSquadIds")
        } catch (t) {
            console.error(t)
        }
        let n = !1;
        s && s.includes(t) && (n = !0);
        try {
            await this.matchMakeManager.sendJoinSquad(t, e, n)
        } catch (t) {
            return console.error(t),
            getMainInstance().dialogManager.showAlert({
                title: "Failed to join the squad",
                text: "Couldn't connect to the server. Please try again later."
            }),
            this.setIsJoiningSquad(!1),
            void this.setMatchmakeServerSquadId(null)
        }
        this.sendCurrentUsername(),
        this.sendMySkinIds()
    }
    setMatchmakeServerSquadId(t) {
        this.matchmakeServerSquadId = t,
        this.addRecentSquadId(t),
        this.updateUserVisibleSquadId()
    }
    setGameServerSquadId(t) {
        this.gameServerSquadId = t,
        this.addRecentSquadId(t),
        this.updateUserVisibleSquadId()
    }
    addRecentSquadId(t) {
        if (!t)
            return;
        getMainInstance().indexedDb.getSet("recentSquadIds", (e=>{
            e || (e = []);
            const i = new Set(e);
            return i.delete(t),
            i.add(t),
            (e = Array.from(i)).length > 5 && e.splice(0, e.length - 5),
            e
        }
        ))
    }
    squadIdReceivedFromGameServer(t) {
        this.setIsJoiningSquad(!1),
        this.setGameServerSquadId(t)
    }
    onUserVisibleSquadIdChange(t) {
        this.onUserVisibleSquadIdChangeCbs.add(t)
    }
    removeOnUserVisibleSquadIdChange(t) {
        this.onUserVisibleSquadIdChangeCbs.delete(t)
    }
    updateUserVisibleSquadId() {
        let t = this.userVisibleSquadId || "";
        t && (t = "#" + t),
        t = window.location.pathname + window.location.search + t,
        history.replaceState(null, "", t),
        this.userVisibleSquadId != this.prevUserVisibleSquadId && (this.prevUserVisibleSquadId = this.userVisibleSquadId,
        this.matchmakeServerSquadId && !this.gameServerSquadId && (this.shouldShowSquadDialogForCurrentSquadId = !0),
        this.updateLoadingText(),
        this.onUserVisibleSquadIdChangeCbs.forEach((t=>t(this.userVisibleSquadId))))
    }
    updateLoadingText() {
        if (!this.waitingForSquadLoadingText)
            return;
        if (!this.waitingForSquadStartLoadingText)
            return;
        const t = !this.isInSquad || this.serverStartClicked;
        this.matchMakeManager.setShouldApplyLoadingText(t),
        !t && this.matchMakeManager.isMatchMaking ? this.matchMakeAllReady ? (this.waitingForSquadStartLoadingText.setIsLoading(!0),
        this.waitingForSquadLoadingText.setIsLoading(!1)) : (this.waitingForSquadStartLoadingText.setIsLoading(!1),
        this.waitingForSquadLoadingText.setIsLoading(!0)) : (this.waitingForSquadLoadingText.setIsLoading(!1),
        this.waitingForSquadStartLoadingText.setIsLoading(!1))
    }
    updateStartClicked() {
        const t = this.clientStartClicked || this.serverStartClicked;
        t != this.startClicked && (this.startClicked = t,
        this.onStartClickedChangeCbs.forEach((t=>t())))
    }
    joinSquadFromCurrentHash(t=!1) {
        let e = null;
        const i = window.location.hash;
        if (i.startsWith("#")) {
            const t = i.substring(1);
            t && (e = t)
        }
        t && !e || e != this.matchmakeServerSquadId && e != this.gameServerSquadId && (this.isJoiningSquad || (e && e.length > 7 ? this.updateUserVisibleSquadId() : e && this.joinExistingSquad(e)))
    }
    startSquad() {
        this.matchMakeManager.sendStartSquad(),
        this.clientStartClicked = !0,
        this.updateStartClicked(),
        this.clientStartClickedTimeout.start()
    }
    onIsJoiningSquadChange(t) {
        this.onIsJoiningSquadChangeCbs.add(t)
    }
    removeOnIsJoiningSquadChange(t) {
        this.onIsJoiningSquadChangeCbs.delete(t)
    }
    onSquadMembersChange(t) {
        this.onSquadMembersChangeCbs.add(t)
    }
    removeOnSquadMembersChange(t) {
        this.onSquadMembersChangeCbs.delete(t)
    }
    onServerReadyForStartStateChange(t) {
        this.onServerReadyForStartStateChangeCbs.add(t)
    }
    removeOnServerReadyForStartStateChange(t) {
        this.onServerReadyForStartStateChangeCbs.delete(t)
    }
    async waitForServerReadyForStart() {
        const t = new Promise((t=>{
            this.onServerReadyForStartTrueCbs.add(t)
        }
        ));
        await t
    }
    onStartClickedChange(t) {
        this.onStartClickedChangeCbs.add(t)
    }
    removeOnStartClickedChange(t) {
        this.onStartClickedChangeCbs.delete(t)
    }
    updateSquadMembersData() {
        let t = !0;
        for (const e of this.matchMakeSquadMembers.values())
            e.ready || (t = !1);
        this.matchMakeAllReady != t && (this.matchMakeAllReady = t,
        this.updateLoadingText()),
        this.onSquadMembersChangeCbs.forEach((t=>t()))
    }
}
function normalize(t, e=-1, i=1, s=8) {
    return t = mapValue(e, i, 0, 2 ** s - 1, t, !0),
    t = Math.round(t)
}
function normalizeU32(t, e=1) {
    return normalize(t, 0, e, 32)
}
function normalizeS16(t, e, i) {
    return normalize(t, e, i, 16)
}
function normalizeU16(t, e=1) {
    return normalize(t, 0, e, 16)
}
function normalizeS8(t, e=1) {
    return normalize(t, -e, e, 8)
}
function normalizeU8(t, e=1) {
    return normalize(t, 0, e, 8)
}
function unnormalize(t, e=-1, i=1, s=8) {
    return t = mapValue(0, 2 ** s - 1, e, i, t, !0)
}
function unnormalizeU32(t, e=1) {
    return unnormalize(t, 0, e, 32)
}
function unnormalizeS16(t, e, i) {
    return unnormalize(t, e, i, 16)
}
function unnormalizeU16(t, e=1) {
    return unnormalize(t, 0, e, 16)
}
function unnormalizeS8(t, e=1) {
    return unnormalize(t, -e, e, 8)
}
function unnormalizeU8(t, e=1) {
    return unnormalize(t, 0, e, 8)
}
function parseStringMessage(t, e=4) {
    if (t.byteLength < e + 4)
        return null;
    const i = new Uint32Array(t,e,1)[0];
    try {
        const s = new Uint8Array(t,e + 4,i);
        return (new TextDecoder).decode(s)
    } catch (t) {
        return null
    }
}
function parseJsonMessage(t) {
    const e = parseStringMessage(t);
    if (e)
        try {
            return JSON.parse(e)
        } catch (t) {
            return null
        }
}
function ceilBytesLength(t) {
    return 4 * Math.ceil(t / 4)
}
function createStringMessage(t, e) {
    const i = (new TextEncoder).encode(e)
      , s = ceilBytesLength(i.length)
      , n = new ArrayBuffer(8 + s)
      , a = new Uint32Array(n);
    a[0] = t,
    a[1] = i.length;
    return new Uint8Array(n,8).set(i),
    n
}
const WORLD_BOUNDS_MARGIN = 5;
class NetworkManager {
    constructor(t) {
        this.ws = null,
        this.joiningLoadingText = null,
        this.lastReceiveMessageTime = 0,
        this.connectionOpenedAndDataSent = !1,
        this.onConnectionOpenCbs = new Set,
        this.onNextConnectionOpenCbs = new Set,
        this.onConnectionClosedCbs = new Set,
        this.onSquadJoinErrorCbs = new Set,
        this.onBeforeConnectGameServerCbs = new Set,
        this.lastSentSkinData = "",
        this.lastDisconnectReason = "unknown",
        this.lastDisconnectReasonExtra = [],
        this.nextCloseIsIntentional = !1,
        this.nextJoinGameId = -1,
        this.nextJoinRequestId = null,
        this.matchMaking = new MatchMakingManager,
        this.matchMaking.onJoinServerReceived((t=>{
            let e;
            if (this.joiningLoadingText && this.joiningLoadingText.setIsLoading(!0),
            this.nextJoinGameId = t.gameId,
            this.nextJoinRequestId = t.joinRequestId ?? null,
            t.isLocal)
                e = NetworkManager.getLocalGameServerUrl();
            else {
                e = (t.insecure ? "ws" : "wss") + "://" + t.url4
            }
            this.connect(e),
            this.matchMaking.closeMatchMakingConnection(),
            getMainInstance().preferredMapManager.disableForcedSoloMap()
        }
        )),
        this.matchMaking.onConnectionCloseDuringMatchMaking((()=>{
            this.fireConnectionClosed()
        }
        )),
        this.squadManager = new SquadManager(this,this.matchMaking,t),
        this.isInit = !1,
        this.onInitCbs = new Set
    }
    init() {
        const t = getMainInstance();
        this.joiningLoadingText = t.mainInfoTextManager.requestInfoText("Joining game...");
        const e = parseSearch();
        this.matchMaking.init(),
        t.auth.onLoggedInAccountChange((()=>{
            this.sendCurrentSession()
        }
        )),
        t.auth.onGuestSessionDataChange((()=>{
            this.sendCurrentSession()
        }
        )),
        this.squadManager.init(),
        this.isInit = !0;
        for (const t of this.onInitCbs)
            t();
        this.onInitCbs.clear(),
        e.ip && this.prepareJoinGame()
    }
    async waitForInit() {
        this.isInit || await new Promise((t=>this.onInitCbs.add((()=>t(void 0)))))
    }
    get shouldUseMatchMaking() {
        const t = parseSearch();
        if (t.useProductionServers)
            return !0;
        if (t.ip)
            return !1;
        const e = getMainInstance();
        return "dev" != e.env && "staging" != e.env
    }
    static getLocalGameServerUrl() {
        let t = "ws";
        return "https:" == location.protocol && (t = "wss"),
        `${t}://${location.host}/gameServer`
    }
    async prepareJoinGame() {
        let t = null;
        const e = parseSearch();
        if (this.nextCloseIsIntentional = !1,
        e.ip && !this.squadManager.isInSquad)
            t = e.ip;
        else if (this.shouldUseMatchMaking)
            try {
                await this.matchMaking.updateQueueState()
            } catch (t) {
                return void this.fireConnectionClosed()
            }
        else {
            let e = "ws";
            "https:" == location.protocol && (e = "wss");
            let i = window.location.host;
            getMainInstance().poki.isPokiBuild && (i = getMainInstance().env + ".narrow.one");
            t = e + "://" + i + "/" + ("local" == getMainInstance().env ? "gameServer" : "ws")
        }
        t && (this.joiningLoadingText && this.joiningLoadingText.setIsLoading(!0),
        this.connect(t))
    }
    static get MinusOne() {
        return new Uint32Array([-1])[0]
    }
    static get ReceiveAction() {
        return {
            JOINED_GAME_ID: 0,
            CREATE_PLAYER: 1,
            DESTROY_PLAYER: 2,
            PLAYER_OWNERSHIP: 3,
            PLAYER_DATA: 4,
            CREATE_ARROW: 5,
            CHANGE_FLAG: 6,
            SCOREBOARD: 7,
            FLAG_POSITION: 8,
            PING: 9,
            PLAYER_PING_DATA: 10,
            GAME_END: 11,
            CLAIM_HIT_BY_ARROW: 12,
            DISCONNECT_REASON: 13,
            GAME_MAP_HASH: 14,
            PLAYER_PERFORM_ACTION: 15,
            PLAYER_NAME: 16,
            PLAYER_SCORES: 17,
            CHANGE_SELECTED_CLASS: 18,
            GAME_START: 19,
            SET_AUTOSHOOT_VALUE: 20,
            EQUIPPED_SKIN_DATA: 21,
            OFFSET_PLAYER_SCORE: 22,
            GAME_END_ACCOUNT_STATS: 23,
            GUEST_DATA_CHANGED: 24,
            PLAYER_TEAM_ID: 25,
            SAME_SQUAD_PLAYERS: 26,
            SQUAD_ID_RESPONSE: 27,
            SQUAD_JOIN_ERROR_RESPONSE: 28,
            REQUEST_MAP_HASH: 29,
            GAME_TIME: 30,
            PLAYER_NAME_VERIFIED: 31,
            GAME_SEED: 32,
            SET_PLAYER_HEALTH: 33,
            CHAT_MESSAGE: 34,
            SPAWN: 35,
            SAME_SQUAD_PLAYER_DATA: 36,
            ACTIVE_WEAPON_TYPE: 37,
            HIT_VALIDATION_DATA: 38,
            MELEE_HIT_PLAYER: 39,
            AVG_TEAM_ELO: 40,
            ARROW_HIT_PLAYER: 41,
            PLAYER_KILL_PLAYER: 42
        }
    }
    static get SendAction() {
        return {
            MY_CLIENT_VERSION: 0,
            REQUEST_JOIN_GAME_ID: 1,
            PLAYER_DATA: 2,
            CREATE_ARROW: 3,
            CHANGE_FLAG: 4,
            PONG: 5,
            CURRENT_LOADED_MAP_HASH: 6,
            CLAIM_HIT_BY_ARROW: 7,
            REQUEST_MAP_HASH: 8,
            PLAYER_PERFORM_ACTION: 9,
            CHANGE_SELECTED_CLASS: 10,
            MY_SKILL_LEVEL: 11,
            REQUEST_NEXT_GAME_STATE: 12,
            SET_AUTOSHOOT_VALUE: 13,
            EQUIPPED_SKIN_DATA: 14,
            FLAG_RETURN_PROGRESS: 15,
            ACCOUNT_SESSION_DATA: 16,
            SQUAD_ID: 17,
            REQUEST_SQUAD_ID: 18,
            MAP_BOUNDS: 19,
            DEFAULT_FLAG_POSITIONS: 20,
            REPORT_CHEATER: 21,
            VALID_ARROW_HIT: 22,
            CHAT_MESSAGE: 23,
            SPAWN: 24,
            SQUAD_DATA: 25,
            ACTIVE_WEAPON_TYPE: 26,
            MELEE_HIT_PLAYER: 27
        }
    }
    static get FlagChangeOperation() {
        return {
            GRAB: 0,
            CAPTURE: 1,
            DROP: 2,
            RETURN: 3
        }
    }
    static get DisconnectReason() {
        return {
            UNKNOWN: 0,
            VERSION_OUT_OF_DATE: 1,
            AFK: 2,
            GAME_DOESNT_EXIST: 3,
            PING_TOO_HIGH: 4,
            SUSPECTED_CHEATER: 5,
            TEMPORARILY_BANNED: 6
        }
    }
    static get PlayerScoreOffsetReason() {
        return {
            UNKNOWN: 0,
            KILL: 1,
            ASSIST: 2,
            FLAG_CARRIER_KILL: 3,
            FLAG_GRAB: 4,
            FLAG_CARRY: 5,
            FLAG_CAPTURE: 6,
            FLAG_CARRY_ASSIST: 7,
            WIN_BONUS: 8,
            FLAG_RETURN: 9,
            HEADSHOT: 10,
            LONG_RANGE: 11,
            FLAG_CAPTURE_ASSIST: 12
        }
    }
    closeCurrentConnection(t=!0, e=!0) {
        this.ws && this.ws.readyState == WebSocket.OPEN && (t && this.markNextCloseAsIntentional(),
        this.ws.close()),
        this.ws = null,
        e && (t && this.markNextCloseAsIntentional(),
        this.fireConnectionClosed())
    }
    async connect(t) {
        this.onBeforeConnectGameServerCbs.forEach((t=>t())),
        this.closeCurrentConnection(!0, !1);
        try {
            this.ws = new WebSocket(t)
        } catch (t) {
            console.error("failed to connect to websocket", t),
            this.fireConnectionClosed()
        }
        if (this.ws) {
            const t = this.ws;
            this.ws.binaryType = "arraybuffer",
            this.ws.addEventListener("message", (e=>{
                this.ws == t && this.onMessage(new Uint8Array(e.data))
            }
            )),
            this.ws.addEventListener("close", (e=>{
                this.ws == t && this.fireConnectionClosed()
            }
            )),
            this.ws.addEventListener("open", (e=>{
                this.ws == t && this.onOpen()
            }
            )),
            this.ws.addEventListener("error", (e=>{
                console.error("websocket error: ", e),
                this.ws == t && this.fireConnectionClosed()
            }
            ))
        }
    }
    onMessage(t) {
        const e = t.buffer
          , i = new Float32Array(e,0,Math.floor(e.byteLength / 4))
          , s = new Uint32Array(e,0,Math.floor(e.byteLength / 4))
          , n = new Int32Array(e,0,Math.floor(e.byteLength / 4))
          , a = new Uint16Array(e,0,Math.floor(e.byteLength / 2));
        if (this.lastReceiveMessageTime = performance.now(),
        s[0] == NetworkManager.ReceiveAction.JOINED_GAME_ID)
            getMainInstance().gameManager.joinedGameId(s[1]);
        else if (s[0] == NetworkManager.ReceiveAction.CREATE_PLAYER) {
            const t = s[1]
              , e = s[2]
              , i = getMainInstance().gameManager.getOnlineGame();
            i && i.createPlayer(t, {
                teamId: e
            })
        } else if (s[0] == NetworkManager.ReceiveAction.DESTROY_PLAYER) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            let e = 1;
            for (; e < s.length; )
                t.destroyPlayer(s[e++])
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_OWNERSHIP) {
            const t = s[1]
              , e = !!s[2]
              , i = getMainInstance().gameManager.getOnlineGame();
            i && i.setPlayerOwnership(t, e),
            e && this.joiningLoadingText && this.joiningLoadingText.setIsLoading(!1)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_DATA) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const i = 1 == a[2];
            let s = 6;
            const n = 12;
            for (; s <= e.byteLength - n; ) {
                const a = new Uint8Array(e,s,n)
                  , o = new Uint8Array(n);
                o.set(a);
                const r = new Uint16Array(o.buffer);
                s += n;
                const l = r[0]
                  , [h,d,c] = this.mapNetworkPosToWorldPos(t, r[1], r[2], r[3])
                  , u = unnormalizeU8(r[4], 2 * Math.PI)
                  , p = unnormalizeS8(r[5], .5 * Math.PI);
                t.setPlayerServerData(l, h, d, c, u, p, i)
            }
            t.playerServerDataFrameEnded()
        } else if (s[0] == NetworkManager.ReceiveAction.CREATE_ARROW) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = a[2]
              , i = a[3]
              , [s,n,o] = this.mapNetworkPosToWorldPos(t, a[4], a[5], a[6])
              , r = unnormalizeS16(a[7], -1, 1)
              , l = unnormalizeS16(a[8], -1, 1)
              , h = unnormalizeS16(a[9], -1, 1)
              , d = unnormalizeU16(a[10]);
            t.createServerArrow(e, i, s, n, o, r, l, h, d)
        } else if (s[0] == NetworkManager.ReceiveAction.CHANGE_FLAG) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2]
              , n = s[3];
            t.playerChangeFlag(e, i, n)
        } else if (s[0] == NetworkManager.ReceiveAction.SCOREBOARD) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = [];
            for (let t = 1; t < s.length; t++)
                e.push(s[t]);
            t.updateScoreboard(e)
        } else if (s[0] == NetworkManager.ReceiveAction.FLAG_POSITION) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = a[2]
              , [i,s,n] = this.mapNetworkPosToWorldPos(t, a[3], a[4], a[5])
              , [o,r,l] = this.mapNetworkVelocityToWorldVelocity(a[6], a[7], a[8]);
            t.setFlagDroppedPosition(e, i, s, n, o, r, l)
        } else if (s[0] == NetworkManager.ReceiveAction.PING)
            this.send([NetworkManager.SendAction.PONG]);
        else if (s[0] == NetworkManager.ReceiveAction.PLAYER_PING_DATA) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            let i = 4;
            const s = 4;
            for (; i <= e.byteLength - s; ) {
                const n = new Uint8Array(e,i,s)
                  , a = new Uint8Array(s);
                a.set(n);
                const o = new Uint16Array(a.buffer);
                i += s;
                const r = o[0]
                  , l = o[1];
                t.setPlayerPingData(r, l)
            }
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_END) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            t.notifyGameEnded()
        } else if (s[0] == NetworkManager.ReceiveAction.CLAIM_HIT_BY_ARROW) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2]
              , n = s[3]
              , a = s[4];
            t.playerClaimedHitByArrow(e, i, n, a)
        } else if (s[0] == NetworkManager.ReceiveAction.MELEE_HIT_PLAYER) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.playerHitByMelee(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.ARROW_HIT_PLAYER) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.playerHitByArrow(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.SET_PLAYER_HEALTH) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = unnormalizeU32(s[2]);
            t.forceSetPlayerHealthFromServer(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_KILL_PLAYER) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.verifiedKillByServer(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.DISCONNECT_REASON) {
            const [,t,...e] = s;
            switch (this.lastDisconnectReasonExtra = e,
            t) {
            case NetworkManager.DisconnectReason.VERSION_OUT_OF_DATE:
                this.lastDisconnectReason = "version-out-of-date";
                break;
            case NetworkManager.DisconnectReason.AFK:
                this.lastDisconnectReason = "afk";
                break;
            case NetworkManager.DisconnectReason.GAME_DOESNT_EXIST:
                this.lastDisconnectReason = "game-doesnt-exist";
                break;
            case NetworkManager.DisconnectReason.PING_TOO_HIGH:
                this.lastDisconnectReason = "ping-too-high";
                break;
            case NetworkManager.DisconnectReason.SUSPECTED_CHEATER:
                this.lastDisconnectReason = "suspected-cheater";
                break;
            case NetworkManager.DisconnectReason.TEMPORARILY_BANNED:
                this.lastDisconnectReason = "temporarily-banned";
                break;
            case NetworkManager.DisconnectReason.UNKNOWN:
            default:
                this.lastDisconnectReason = "unknown"
            }
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_MAP_HASH) {
            const t = parseStringMessage(e);
            if (!t)
                return;
            const i = getMainInstance()
              , s = i.gameManager.getOnlineGame();
            s && (s.loadMap(t),
            i.preferredMapManager.markRecentMap(t))
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_PERFORM_ACTION) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.receivedPlayerPerformAction(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.SPAWN) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.receivedPlayerSpawn(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_NAME) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const i = s[1]
              , n = parseStringMessage(e, 8) || "";
            t.setPlayerName(i, n)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_SCORES) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , n = s[2]
              , a = s[3]
              , o = s[4]
              , r = s[5]
              , l = i[6]
              , h = i[7];
            t.setPlayerScores({
                playerId: e,
                flags: n,
                kills: a,
                deaths: o,
                total: r,
                skillLevel: l,
                elo: h
            })
        } else if (s[0] == NetworkManager.ReceiveAction.CHANGE_SELECTED_CLASS) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.receivePlayerChangeClass(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.ACTIVE_WEAPON_TYPE) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = 1 == s[2];
            t.receivePlayerChangeWeaponType(e, i)
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_START) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            t.notifyGameStarted()
        } else if (s[0] == NetworkManager.ReceiveAction.EQUIPPED_SKIN_DATA) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const i = s[1]
              , n = parseSkinDataString(parseStringMessage(e, 8) || "");
            t.setPlayerEquippedSkinData(i, n)
        } else if (s[0] == NetworkManager.ReceiveAction.OFFSET_PLAYER_SCORE) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = n[2]
              , a = s[3];
            t.offsetPlayerScore(e, i, a)
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_END_ACCOUNT_STATS) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = s[1]
              , i = s[2];
            t.receivedGameEndAccountStats({
                receivedCoins: e,
                newCoinCount: i
            })
        } else if (s[0] == NetworkManager.ReceiveAction.GUEST_DATA_CHANGED) {
            const t = parseStringMessage(e);
            t && getMainInstance().auth.setGuestAccountData(t, !1)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_TEAM_ID) {
            const t = s[1]
              , e = s[2]
              , i = getMainInstance().gameManager.getOnlineGame();
            if (!i)
                return;
            i.setPlayerTeamId(t, e)
        } else if (s[0] == NetworkManager.ReceiveAction.SAME_SQUAD_PLAYERS) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = [];
            for (let t = 1; t < s.length; t++)
                e.push({
                    playerId: s[t],
                    squadPlayerId: 0,
                    isLeader: !1
                });
            t.setSameSquadPlayerData(e)
        } else if (s[0] == NetworkManager.ReceiveAction.SAME_SQUAD_PLAYER_DATA) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const i = parseJsonMessage(e);
            t.setSameSquadPlayerData(i.playerDatas)
        } else if (s[0] == NetworkManager.ReceiveAction.SQUAD_ID_RESPONSE) {
            const t = parseStringMessage(e);
            t && this.squadManager.squadIdReceivedFromGameServer(t)
        } else if (s[0] == NetworkManager.ReceiveAction.SQUAD_JOIN_ERROR_RESPONSE) {
            const t = parseStringMessage(e);
            this.onSquadJoinErrorCbs.forEach((e=>e(t)))
        } else if (s[0] == NetworkManager.ReceiveAction.REQUEST_MAP_HASH) {
            const t = getMainInstance()
              , e = t.preferredMapManager.forcingSoloMap || t.preferredMapManager.getRandomPreferredMapHash();
            e && this.sendRequestMapHash(e)
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_TIME) {
            const t = s[1]
              , e = getMainInstance().gameManager.getOnlineGame();
            if (!e)
                return;
            e.setServerGameTime(t)
        } else if (s[0] == NetworkManager.ReceiveAction.GAME_SEED) {
            const t = s[1]
              , e = getMainInstance().gameManager.getOnlineGame();
            if (!e)
                return;
            e.setServerGameSeed(t)
        } else if (s[0] == NetworkManager.ReceiveAction.PLAYER_NAME_VERIFIED) {
            const t = s[1]
              , e = getMainInstance().gameManager.getOnlineGame();
            if (!e)
                return;
            e.setPlayerNameVerified(t)
        } else if (s[0] == NetworkManager.ReceiveAction.CHAT_MESSAGE) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const i = parseStringMessage(e);
            if (i) {
                const e = JSON.parse(i);
                t.chat.receivedChatMessage(e)
            }
        } else if (s[0] == NetworkManager.ReceiveAction.HIT_VALIDATION_DATA) {
            const t = parseJsonMessage(e)
              , i = getMainInstance().gameManager.getOnlineGame();
            if (!i)
                return;
            i.arrowManager.receivedHitValidationData(t)
        } else if (s[0] == NetworkManager.ReceiveAction.AVG_TEAM_ELO) {
            const t = getMainInstance().gameManager.getOnlineGame();
            if (!t)
                return;
            const e = i[1]
              , s = i[2];
            t.updateAvgTeamElo(e, s)
        }
    }
    markNextCloseAsIntentional() {
        this.nextCloseIsIntentional = !0
    }
    fireConnectionClosed() {
        this.ws = null,
        this.joiningLoadingText && this.joiningLoadingText.setIsLoading(!1),
        getMainInstance().gameManager.connectionClosed(),
        this.onConnectionClosedCbs.forEach((t=>t(this.nextCloseIsIntentional, this.lastDisconnectReason)));
        if (!this.nextCloseIsIntentional) {
            getMainInstance().mainMenu.setJoinState("joinable");
            let t, e = null;
            switch (this.lastDisconnectReason) {
            case "version-out-of-date":
                e = "Your version is out of date, update your client in order to play online.",
                getUpdateReady() && (t = [{
                    text: "Update now",
                    onClick: ()=>{
                        skipWaiting()
                    }
                }]);
                break;
            case "afk":
                e = "You have been kicked for being afk for too long";
                break;
            case "game-doesnt-exist":
                e = "Game not found.";
                break;
            case "ping-too-high":
                e = "Your ping is too high, please try again later.";
                break;
            case "suspected-cheater":
                e = `Cheats detected. (code ${this.lastDisconnectReasonExtra[0] || 0})`;
                break;
            case "temporarily-banned":
                e = "You have been temporarily banned, please try again later.";
                break;
            default:
                e = "The connection closed abruptly :("
            }
            e && getMainInstance().dialogManager.showAlert({
                title: "Connection closed",
                text: e,
                buttons: t
            })
        }
    }
    onOpen() {
        this.lastDisconnectReason = "unknown",
        this.lastSentSkinData = "",
        this.nextCloseIsIntentional = !1;
        const t = parseSearch();
        t.gameId ? this.sendJoinGameId(Number(t.gameId)) : (this.sendJoinGameId(this.nextJoinGameId, this.nextJoinRequestId),
        this.nextJoinGameId = -1),
        this.sendCurrentVersion(),
        this.sendCurrentSession(),
        this.sendMySkillLevel(),
        this.connectionOpenedAndDataSent = !0,
        this.onConnectionOpenCbs.forEach((t=>t())),
        this.onNextConnectionOpenCbs.forEach((t=>t())),
        this.onNextConnectionOpenCbs.clear()
    }
    async waitForConnectionOpen() {
        if (!this.connectionOpenedAndDataSent)
            return await new Promise((t=>this.onConnectionOpenCbs.add((()=>t(void 0)))))
    }
    onConnectionOpen(t) {
        this.onConnectionOpenCbs.add(t)
    }
    onNextConnectionOpen(t) {
        this.onNextConnectionOpenCbs.add(t)
    }
    onConnectionClosed(t) {
        this.onConnectionClosedCbs.add(t)
    }
    onSquadJoinError(t) {
        this.onSquadJoinErrorCbs.add(t)
    }
    onBeforeConnectGameServer(t) {
        this.onBeforeConnectGameServerCbs.add(t)
    }
    get hasGameServerConnection() {
        return this.ws && this.ws.readyState == WebSocket.OPEN
    }
    send(t) {
        if (this.ws && this.hasGameServerConnection) {
            t instanceof Array && (t = new Uint32Array(t));
            try {
                return this.ws.send(t),
                !0
            } catch (e) {
                throw console.log("error sending message", t),
                e
            }
        }
    }
    sendStringMessage(t, e) {
        const i = createStringMessage(t, e);
        this.send(i)
    }
    sendJsonMessage(t, e) {
        const i = JSON.stringify(e);
        this.sendStringMessage(t, i)
    }
    sendCurrentVersion() {
        this.sendStringMessage(NetworkManager.SendAction.MY_CLIENT_VERSION, "1685095066")
    }
    sendMySkillLevel() {
        const t = new ArrayBuffer(12)
          , e = new Uint32Array(t)
          , i = new Float32Array(t);
        e[0] = NetworkManager.SendAction.MY_SKILL_LEVEL,
        i[1] = this.matchMaking.getMappedSmoothSkillLevel(),
        i[2] = this.matchMaking.elo,
        this.send(t)
    }
    sendMySkinData(t) {
        const e = JSON.stringify(t);
        e != this.lastSentSkinData && (this.lastSentSkinData = e,
        this.sendStringMessage(NetworkManager.SendAction.EQUIPPED_SKIN_DATA, e))
    }
    sendJoinGameId(t, e=null) {
        let i = 8;
        e && (i += 16);
        const s = new ArrayBuffer(i)
          , n = new Uint32Array(s);
        if (n[0] = NetworkManager.SendAction.REQUEST_JOIN_GAME_ID,
        n[1] = t,
        e) {
            const t = uuidToBinary(e);
            new Uint8Array(s).set(new Uint8Array(t), 8)
        }
        this.send(s)
    }
    sendPlayerData(t, e, {posX: i=0, posY: s=0, posZ: n=0, rotX: a=0, rotY: o=0}={}) {
        if (t != getMainInstance().gameManager.getOnlineGame())
            return;
        const r = new ArrayBuffer(16)
          , l = new Uint32Array(r,0,1)
          , h = new Uint16Array(r,0);
        l[0] = NetworkManager.SendAction.PLAYER_DATA,
        h[2] = e;
        const [d,c,u] = this.mapWorldPosToNetworkPos(t, i, s, n);
        h[3] = d,
        h[4] = c,
        h[5] = u;
        const p = 2 * Math.PI;
        h[6] = normalizeU8(mod(a, p), p),
        h[7] = normalizeS8(o, .5 * Math.PI),
        this.send(r)
    }
    getWorldBounds(t) {
        let e = 0
          , i = 0
          , s = 0
          , n = 0
          , a = 0
          , o = 0;
        if (t) {
            const r = t.physics.mapBounds;
            r && (e = r.min.x - 5,
            i = r.min.y - 5,
            s = r.min.z - 5,
            n = r.max.x + 5,
            a = r.max.y + 5,
            o = r.max.z + 5)
        }
        return {
            minX: e,
            minY: i,
            minZ: s,
            maxX: n,
            maxY: a,
            maxZ: o
        }
    }
    *getDefaultFlagNetworkPositions(t) {
        for (const e of t.flags)
            yield this.mapWorldPosToNetworkPos(t, e.position.x, e.position.y, e.position.z)
    }
    mapWorldPosToNetworkPos(t, e, i, s) {
        const n = this.getWorldBounds(t);
        return [normalizeS16(e, n.minX, n.maxX), normalizeS16(i, n.minY, n.maxY), normalizeS16(s, n.minZ, n.maxZ)]
    }
    mapNetworkPosToWorldPos(t, e, i, s) {
        const n = this.getWorldBounds(t);
        return [unnormalizeS16(e, n.minX, n.maxX), unnormalizeS16(i, n.minY, n.maxY), unnormalizeS16(s, n.minZ, n.maxZ)]
    }
    mapNetworkVelocityToWorldVelocity(t, e, i) {
        return [unnormalizeS16(t, -30, 30), unnormalizeS16(e, -30, 30), unnormalizeS16(i, -30, 30)]
    }
    sendCreateArrow(t, e, {arrowId: i, pos: s, dir: n, fireAmount01: a}) {
        const o = new ArrayBuffer(22)
          , r = new Uint32Array(o,0,4)
          , l = new Uint16Array(o,0);
        r[0] = NetworkManager.SendAction.CREATE_ARROW,
        l[2] = e,
        l[3] = i;
        const [h,d,c] = this.mapWorldPosToNetworkPos(t, s.x, s.y, s.z);
        l[4] = h,
        l[5] = d,
        l[6] = c;
        const [u,p,g] = this.mapNetworkPosToWorldPos(t, h, d, c)
          , m = normalizeS16(n.x, -1, 1)
          , f = normalizeS16(n.y, -1, 1)
          , w = normalizeS16(n.z, -1, 1);
        l[7] = m,
        l[8] = f,
        l[9] = w;
        const b = unnormalizeS16(m, -1, 1)
          , y = unnormalizeS16(f, -1, 1)
          , S = unnormalizeS16(w, -1, 1)
          , C = normalizeU16(a);
        l[10] = C;
        const v = unnormalizeU16(C);
        this.send(o);
        return {
            arrowId: i,
            pos: new Vector3(u,p,g),
            dir: new Vector3(b,y,S),
            fireAmount01: v,
            networkOffsetPos: new Vector3(0,0,0)
        }
    }
    sendChangeFlag(t, e, i) {
        this.send([NetworkManager.SendAction.CHANGE_FLAG, t, e, i])
    }
    sendCurrentLoadedMapHash(t) {
        this.sendStringMessage(NetworkManager.SendAction.CURRENT_LOADED_MAP_HASH, t)
    }
    sendWorldBounds(t) {
        const e = new ArrayBuffer(28);
        new Uint32Array(e,0,1)[0] = NetworkManager.SendAction.MAP_BOUNDS;
        const i = new Float32Array(e,0)
          , s = this.getWorldBounds(t);
        i[1] = s.minX,
        i[2] = s.minY,
        i[3] = s.minZ,
        i[4] = s.maxX,
        i[5] = s.maxY,
        i[6] = s.maxZ,
        this.send(e)
    }
    sendDefaultFlagPositions(t) {
        const e = Array.from(this.getDefaultFlagNetworkPositions(t))
          , i = new ArrayBuffer(4 + 3 * e.length * 2);
        new Uint32Array(i,0,1)[0] = NetworkManager.SendAction.DEFAULT_FLAG_POSITIONS;
        const s = new Uint16Array(i,4);
        for (const [t,i] of e.entries())
            s[3 * t + 0] = i[0],
            s[3 * t + 1] = i[1],
            s[3 * t + 2] = i[2];
        this.send(i)
    }
    sendReportCheater(t, e, i) {
        i = normalizeU16(i),
        this.send([NetworkManager.SendAction.REPORT_CHEATER, t, e, i])
    }
    sendHitByArrow(t, e, i, s, n) {
        this.send([NetworkManager.SendAction.CLAIM_HIT_BY_ARROW, t, e, i, s, n])
    }
    sendValidArrowHit(t, e, i) {
        const s = normalizeU32(i);
        this.send([NetworkManager.SendAction.VALID_ARROW_HIT, t, e, s])
    }
    sendChatMessage(t) {
        this.sendStringMessage(NetworkManager.SendAction.CHAT_MESSAGE, t)
    }
    sendRequestMapHash(t) {
        this.sendStringMessage(NetworkManager.SendAction.REQUEST_MAP_HASH, t)
    }
    sendRequestNextGameState() {
        this.send([NetworkManager.SendAction.REQUEST_NEXT_GAME_STATE])
    }
    sendPlayerPerformAction(t, e) {
        this.send([NetworkManager.SendAction.PLAYER_PERFORM_ACTION, t, e])
    }
    sendPlayerSpawn(t, e) {
        this.send([NetworkManager.SendAction.SPAWN, t, e])
    }
    sendChangeSelectedClass(t, e) {
        this.send([NetworkManager.SendAction.CHANGE_SELECTED_CLASS, t, e])
    }
    sendChangeActiveWeaponType(t, e) {
        const i = e ? 1 : 0;
        this.send([NetworkManager.SendAction.ACTIVE_WEAPON_TYPE, t, i])
    }
    sendMeleeHitPlayer(t, e, i) {
        this.send([NetworkManager.SendAction.MELEE_HIT_PLAYER, t, e, i])
    }
    sendFlagReturnProgress(t, e) {
        const i = normalizeU32(e);
        this.send([NetworkManager.SendAction.FLAG_RETURN_PROGRESS, t, i])
    }
    async sendCurrentSession() {
        const t = await getMainInstance().auth.getSessionDataForGameServer();
        this.sendSession(t)
    }
    sendSession(t) {
        const e = JSON.stringify(t);
        this.sendStringMessage(NetworkManager.SendAction.ACCOUNT_SESSION_DATA, e)
    }
    sendSquadData(t, e, i) {
        const s = {
            squadId: t,
            playerId: e,
            leaderToken: i
        };
        this.sendStringMessage(NetworkManager.SendAction.SQUAD_DATA, JSON.stringify(s))
    }
    sendRequestSquadId() {
        this.send([NetworkManager.SendAction.REQUEST_SQUAD_ID])
    }
}
class PlayerSphereCollider {
    constructor(t, e, i, s, n) {
        this.rigidBody = t,
        this.radius = e,
        this.heightOffset = i,
        this.bodyPart = s,
        this.arrowDamage = n
    }
    get center() {
        const t = this.rigidBody.pos.clone();
        return t.y += this.heightOffset,
        t
    }
    rayCast(t, e) {
        const i = t.x
          , s = t.y
          , n = t.z
          , a = e.x
          , o = e.y
          , r = e.z
          , l = this.center
          , h = l.x
          , d = l.y
          , c = l.z
          , u = 2 * (i * a + s * o + n * r - a * h - o * d - r * c)
          , p = u * u - 4 * (i * i - 2 * i * h + h * h + s * s - 2 * s * d + d * d + n * n - 2 * n * c + c * c - this.radius * this.radius);
        if (p < 0)
            return null;
        const g = (-u - Math.sqrt(p)) / 2;
        if (g < 0)
            return null;
        const m = t.clone().addScaledVector(e, g);
        return {
            dist: m.distanceTo(t),
            pos: m,
            collider: this
        }
    }
}
class MapCollider {
    constructor(t, {ignoreArrows: e=!1, isLadder: i=!1, isLadderAllSides: s=!1, excludeTeamId: n=-1, isDeathTrigger: a=!1, shootSfx: o="", allowJump: r=!0, allowWalk: l=!0, movePlayerUp: h=!0, slippery: d=!1, slowDownPlayerAmount: c=0, airFrictionModifier: u=0, touchDamageAmount: p=0, touchDamageDistance: g=1.5, triggerHingeId: m=-1, triggerAppearingObjectId: f=-1}) {
        this.invWorldMatrix = t.clone().invert(),
        this.invWorldMatrixNoTranslate = this.invWorldMatrix.clone().setPosition(0, 0, 0),
        this.worldMatrix = t,
        this.aabb = null,
        this.ignoreArrows = e,
        this.isLadder = i,
        this.isLadderAllSides = s,
        this.isDeathTrigger = a,
        this.shootSfx = o,
        this.allowJump = r,
        this.allowWalk = l,
        this.movePlayerUp = h,
        this.slippery = d,
        this.slowDownPlayerAmount = c,
        this.airFrictionModifier = u,
        this.touchDamageAmount = p,
        this.touchDamageDistance = g,
        this.triggerHingeId = m,
        this.triggerAppearingObjectId = f,
        this.excludeTeamId = n
    }
    rayCast(t, e) {
        throw new Error("base class")
    }
    getSphereManifold(t, e) {
        throw new Error("base class")
    }
    isTriggerCollider() {
        return this.slowDownPlayerAmount > 0 || this.airFrictionModifier > 0
    }
}
const BoxFace = {
    up: 1,
    down: 2,
    left: 3,
    right: 4,
    front: 5,
    back: 6
};
class BoxMapCollider extends MapCollider {
    constructor(...t) {
        super(...t),
        this.box = new Box3(new Vector3(-1,-1,-1),new Vector3(1,1,1)),
        this.aabb = this.box.clone(),
        this.aabb.applyMatrix4(this.worldMatrix),
        this.cachedUpFaces = null
    }
    getSphereManifold(t, e) {
        const i = t.clone().applyMatrix4(this.invWorldMatrix)
          , s = this.box.clampPoint(i, new Vector3);
        let n = 0;
        (s.x <= -1 || s.x >= 1) && n++,
        (s.y <= -1 || s.y >= 1) && n++,
        (s.z <= -1 || s.z >= 1) && n++;
        const a = n >= 2
          , o = this.getUpFaces()
          , r = this.getIsOnFace(s, o[0])
          , l = this.getIsOnFace(s, o[1]);
        s.applyMatrix4(this.worldMatrix);
        const h = e - t.distanceTo(s);
        return {
            colliderType: "box",
            pos: s,
            isAtEdge: a,
            isAtUpFace: r,
            isAtSecondUpFace: l,
            normal: t.clone().sub(s).normalize(),
            penetration: h
        }
    }
    getUpFaces() {
        if (this.cachedUpFaces)
            return this.cachedUpFaces;
        const t = new Vector3
          , e = new Vector3(1,0,0)
          , i = new Vector3(0,1,0)
          , s = new Vector3(0,0,1);
        t.applyMatrix4(this.worldMatrix),
        e.applyMatrix4(this.worldMatrix),
        i.applyMatrix4(this.worldMatrix),
        s.applyMatrix4(this.worldMatrix),
        e.sub(t),
        i.sub(t),
        s.sub(t),
        e.normalize(),
        i.normalize(),
        s.normalize();
        const n = e.clone().negate()
          , a = i.clone().negate()
          , o = s.clone().negate()
          , r = new Vector3(0,1,0)
          , l = [{
            face: BoxFace.up,
            normal: i,
            dot: 0
        }, {
            face: BoxFace.down,
            normal: a,
            dot: 0
        }, {
            face: BoxFace.left,
            normal: e,
            dot: 0
        }, {
            face: BoxFace.right,
            normal: n,
            dot: 0
        }, {
            face: BoxFace.front,
            normal: s,
            dot: 0
        }, {
            face: BoxFace.back,
            normal: o,
            dot: 0
        }];
        for (const t of l)
            t.dot = t.normal.dot(r);
        return l.sort(((t,e)=>e.dot - t.dot)),
        this.cachedUpFaces = l,
        this.cachedUpFaces
    }
    getIsOnFace(t, e) {
        switch (e.face) {
        case BoxFace.up:
            return t.y >= 1;
        case BoxFace.down:
            return t.y <= -1;
        case BoxFace.left:
            return t.x >= 1;
        case BoxFace.right:
            return t.x <= -1;
        case BoxFace.front:
            return t.z >= 1;
        case BoxFace.back:
            return t.z <= -1
        }
        return !1
    }
    rayCast(t, e) {
        const i = t;
        t = t.clone().applyMatrix4(this.invWorldMatrix),
        e = e.clone().applyMatrix4(this.invWorldMatrixNoTranslate);
        const s = (this.box.min.x - t.x) / e.x
          , n = (this.box.max.x - t.x) / e.x
          , a = (this.box.min.y - t.y) / e.y
          , o = (this.box.max.y - t.y) / e.y
          , r = (this.box.min.z - t.z) / e.z
          , l = (this.box.max.z - t.z) / e.z
          , h = Math.min(Math.max(s, n), Math.max(a, o), Math.max(r, l));
        if (h < 0)
            return null;
        const d = Math.max(Math.min(s, n), Math.min(a, o), Math.min(r, l));
        if (d < h) {
            const s = t.clone().addScaledVector(e, d);
            s.applyMatrix4(this.worldMatrix);
            return {
                dist: s.distanceTo(i),
                pos: s,
                collider: this
            }
        }
        return null
    }
}
class RigidBody {
    constructor() {
        this.enabled = !0
    }
    beginPhysicsSteps() {}
    stepVelocity(t) {}
    resolveMapCollisionsOctree(t) {}
    endPhysicsSteps() {}
}
const MIN_UPDOT_FOR_ISONFLOOR = .3;
class PlayerRigidBody extends RigidBody {
    constructor(t, e) {
        super(),
        this.physicsManager = t,
        this.player = e,
        this.pos = new Vector3,
        this.velocity = new Vector3,
        this.totalForce = new Vector3,
        this.colliders = [new PlayerSphereCollider(this,.4,.4,"feet",1 / 3), new PlayerSphereCollider(this,.5,1.1,"body",.5), new PlayerSphereCollider(this,.3,1.7,"head",1)],
        this.aabb = new Box3;
        for (const t of this.colliders) {
            const e = t.radius
              , i = new Box3(new Vector3(-e,-e,-e),new Vector3(e,e,e));
            i.translate(t.center),
            this.aabb.union(i)
        }
        this.gravity = new Vector3(0,-20,0),
        this.prevLastFloorTouchTime = 0,
        this.lastLandTime = 0,
        this.lastFloorTouchTime = 0,
        this.lastJumpableColliderTouchTime = 0,
        this.isOnFloor = !1,
        this.isOnJumpableCollider = !1,
        this.isOnUnwalkableCollider = !1,
        this.lastJumpTime = 0,
        this.inAirAfterJump = !1,
        this.climbingLadder = null,
        this.climbingLadderNormal = null,
        this.isTouchingDamageCollider = !1,
        this.lastTouchDamageColliderPosition = null,
        this.lastTouchDamageColliderTime = -1 / 0,
        this.wasOnFloorLastFrame = !1,
        this.isOnSlipperyCollider = !1,
        this.slowDownColliderAmount = 0,
        this.airFrictionModifier = 0
    }
    beginPhysicsSteps() {
        this.wasOnFloorLastFrame = this.isOnFloor,
        this.isOnFloor = !1,
        this.isOnSlipperyCollider = !1,
        this.isOnJumpableCollider = !1,
        this.isOnUnwalkableCollider = !1
    }
    stepVelocity(t) {
        this.climbingLadder || this.velocity.addScaledVector(this.gravity, t),
        this.velocity.addScaledVector(this.totalForce, t);
        let e = .9995
          , i = e;
        this.isOnSlipperyCollider ? (e = .2,
        i = .2) : this.climbingLadder ? (e = .9999,
        i = .9999) : this.wasOnFloorLastFrame || (i = .2,
        e = .9),
        e = Math.max(e, this.airFrictionModifier),
        i = Math.max(i, this.airFrictionModifier);
        const s = Math.pow(1 - e, t)
          , n = Math.pow(1 - i, t);
        this.velocity.x *= s,
        this.velocity.y *= n,
        this.velocity.z *= s,
        this.pos.addScaledVector(this.velocity, t)
    }
    updateLastFloorTouchTime() {
        this.lastFloorTouchTime = getMainInstance().now
    }
    endPhysicsSteps() {
        this.isOnFloor && !this.wasOnFloorLastFrame && (this.prevLastFloorTouchTime = this.lastFloorTouchTime,
        this.lastLandTime = getMainInstance().now),
        (this.isOnFloor || this.climbingLadder) && (this.updateLastFloorTouchTime(),
        this.inAirAfterJump = !1),
        this.isOnJumpableCollider && (this.lastJumpableColliderTouchTime = getMainInstance().now),
        this.totalForce.set(0, 0, 0)
    }
    get inAirTime() {
        return this.isOnFloor || this.climbingLadder ? 0 : getMainInstance().now - this.lastFloorTouchTime
    }
    get prevInAirTime() {
        return this.isOnFloor || this.climbingLadder ? this.lastLandTime - this.prevLastFloorTouchTime : this.inAirTime
    }
    get onFloorTime() {
        return this.isOnFloor ? getMainInstance().now - this.lastLandTime : 0
    }
    get onJumpableColliderTime() {
        return this.isOnJumpableCollider || this.climbingLadder ? 0 : getMainInstance().now - this.lastJumpableColliderTouchTime
    }
    getCurrentPlayerAabb() {
        const t = this.aabb.clone();
        return t.translate(this.pos),
        t
    }
    getIntersectingOctreeNodes() {
        const t = this.getCurrentPlayerAabb();
        return this.physicsManager.getOctreeNodesInAabb(t)
    }
    getPlayerManifolds(t) {
        const e = this.getCurrentPlayerAabb();
        return this.getManifoldsHelper(e, this.colliders, t)
    }
    getManifoldsHelper(t, e, i) {
        const s = [];
        for (const n of this.physicsManager.getCollidersForAabbUsingOctree(t))
            if (n.aabb && n.aabb.intersectsBox(t) && n.excludeTeamId != this.player.teamId && (i || !n.isTriggerCollider()))
                for (const t of e) {
                    const e = n.getSphereManifold(t.center, t.radius);
                    e.penetration > 0 && s.push({
                        manifold: e,
                        mapCollider: n,
                        playerCollider: t
                    })
                }
        return s
    }
    isAboveJumpableCollider() {
        let t = null;
        for (const e of this.colliders)
            if ("feet" == e.bodyPart) {
                t = e;
                break
            }
        if (!t)
            return !1;
        const e = []
          , i = t.center;
        for (let s = 0; s < 5; s++) {
            const n = i.clone();
            n.y -= .1 * s,
            e.push({
                center: n,
                radius: t.radius
            })
        }
        const s = new Box3;
        s.expandByPoint(e[0].center),
        s.expandByPoint(e[e.length - 1].center),
        s.expandByScalar(t.radius);
        const n = this.getManifoldsHelper(s, e, !1);
        for (const {manifold: t} of n) {
            const e = t.normal.dot(new Vector3(0,1,0));
            if (e > .3 || this.manifoldShouldMovePlayerUp(t, e))
                return !0
        }
        return !1
    }
    manifoldShouldMovePlayerUp(t, e) {
        return "box" == t.colliderType && t.isAtEdge && t.isAtUpFace && e > .1
    }
    resolveMapCollisionsOctree(t) {
        const e = this.getPlayerManifolds(!1);
        this.slowDownColliderAmount = 0,
        this.airFrictionModifier = 0;
        let i = 0
          , s = 0
          , n = 1 / 0;
        for (const {manifold: t, mapCollider: a, playerCollider: o} of e) {
            const e = t.normal.dot(new Vector3(0,1,0));
            if (a.isDeathTrigger)
                continue;
            if (!a.movePlayerUp)
                continue;
            if (this.needsLadderPhysics(t, a))
                continue;
            let r = !1;
            if ("feet" == o.bodyPart && (e > .6 || this.manifoldShouldMovePlayerUp(t, e)) && (r = !0),
            r && t.penetration > 0) {
                const e = t.normal.clone();
                e.setLength(t.penetration + 1e-7);
                const o = t.normal.clone().cross(new Vector3(0,1,0));
                if (o.lengthSq() > 0) {
                    const i = o.clone().cross(t.normal);
                    let s = 0;
                    0 != i.x ? s = Math.abs(e.x / i.x) : 0 != i.z && (s = Math.abs(e.z / i.z)),
                    i.multiplyScalar(s),
                    e.add(i)
                }
                e.y > 0 && e.y < 1 && (i = Math.max(e.y, i),
                this.isOnFloor = !0,
                s = Math.max(s, a.touchDamageAmount),
                n = Math.min(n, a.touchDamageDistance),
                a.allowJump && (this.isOnJumpableCollider = !0),
                a.allowWalk || (this.isOnUnwalkableCollider = !0),
                a.slippery && (this.isOnSlipperyCollider = !0))
            }
        }
        let a = e;
        const o = this.pos.clone();
        i > 0 && (this.pos.y += i);
        const r = new Map;
        for (const {manifold: t, mapCollider: i} of e) {
            let e = r.get(i) || 0;
            e = Math.max(e, t.penetration),
            r.set(i, e)
        }
        let l = !1;
        const h = this.getPlayerManifolds(!0);
        for (const {manifold: t, mapCollider: e} of h)
            if (!e.isTriggerCollider()) {
                if (!r.has(e)) {
                    l = !0;
                    break
                }
                {
                    const i = r.get(e);
                    if (null != i && t.penetration > i) {
                        l = !0;
                        break
                    }
                }
            }
        l ? this.pos.copy(o) : a = h;
        let d = null;
        for (const {manifold: t, mapCollider: e, playerCollider: i} of a) {
            const a = this.needsLadderPhysics(t, e);
            if (s = Math.max(s, e.touchDamageAmount),
            n = Math.min(n, e.touchDamageDistance),
            e.slowDownPlayerAmount > 0) {
                const i = mapValue(0, .5, 0, e.slowDownPlayerAmount, t.penetration, !0);
                this.slowDownColliderAmount = Math.max(this.slowDownColliderAmount, i);
                continue
            }
            if (e.airFrictionModifier > 0) {
                this.airFrictionModifier = Math.max(this.airFrictionModifier, e.airFrictionModifier);
                continue
            }
            const o = this.velocity.dot(t.normal);
            if (o < 0) {
                const s = t.normal.dot(new Vector3(0,1,0));
                e.isDeathTrigger ? this.player.dieFromFall() : a && (e.isLadderAllSides || "head" != i.bodyPart && s > -.1) && (d = e,
                this.climbingLadderNormal = t.normal.clone()),
                this.velocity.addScaledVector(t.normal, -o);
                const n = .8
                  , r = .001
                  , l = Math.max(t.penetration - r, 0) * n
                  , h = t.normal.clone().multiplyScalar(l);
                this.pos.add(h),
                "feet" == i.bodyPart && s > .3 && !a && (this.isOnFloor = !0,
                e.allowJump && (this.isOnJumpableCollider = !0),
                e.allowWalk || (this.isOnUnwalkableCollider = !0),
                e.slippery && (this.isOnSlipperyCollider = !0))
            }
        }
        if (!d) {
            const t = this.climbingLadder;
            if (t)
                for (const e of this.colliders) {
                    t.getSphereManifold(e.center, e.radius).penetration > -.05 && (d = t)
                }
        }
        !d && this.climbingLadder && getMainInstance().now - this.lastJumpTime > 300 && (this.velocity.y *= .3),
        this.climbingLadder = d;
        {
            const t = getMainInstance().now
              , e = s > 0
              , i = t - this.lastTouchDamageColliderTime < 300;
            let a = !1;
            e && (this.lastTouchDamageColliderTime = t);
            const o = e && !i;
            if (o != this.isTouchingDamageCollider && (this.isTouchingDamageCollider = o,
            o && (a = !0)),
            e && this.lastTouchDamageColliderPosition) {
                this.lastTouchDamageColliderPosition.distanceTo(this.pos) > n && (a = !0)
            }
            a && (this.player.touchedDamageCollider(s),
            this.lastTouchDamageColliderPosition = this.pos.clone())
        }
    }
    needsLadderPhysics(t, e) {
        if (!(e instanceof BoxMapCollider))
            return !1;
        if ("box" != t.colliderType)
            return !1;
        if (!e.isLadder && !e.isLadderAllSides)
            return !1;
        const i = new Vector3(0,1,0)
          , s = t.normal.dot(i);
        if (s > -1e-4 && s < 1e-4) {
            if (e.getUpFaces()[0].normal.dot(i) > .9999)
                return !0
        }
        return !!e.isLadderAllSides || t.isAtSecondUpFace && !t.isAtEdge
    }
    applyForce(t) {
        this.totalForce.add(t)
    }
    getAllowJump() {
        return !(this.onJumpableColliderTime > 200) && (!this.inAirAfterJump && !(this.velocity.y > 5))
    }
    jump(t) {
        this.isOnFloor = !1,
        this.isOnJumpableCollider = !1,
        this.isOnUnwalkableCollider = !1,
        this.isOnSlipperyCollider = !1,
        this.inAirAfterJump = !0,
        this.lastJumpTime = getMainInstance().now;
        const e = Math.max(0, t - this.velocity.y);
        this.velocity.y += e
    }
}
const REPORT_COOLDOWN = 1e3
  , CheatKickReason = {
    UNKNOWN: 0,
    FLY: 1,
    INVULNERABLE: 2,
    INVALID_ARROW: 3,
    INVALID_ARROW_FREQUENCY: 4,
    INVALID_DEATH_OPERATION: 5
};
class AntiCheatManager {
    constructor() {
        this.reportedPlayerTimes = new Map,
        this.onPlayerNeedsReportCbs = new Set
    }
    reportPlayer(t, e, i) {
        const s = this.reportedPlayerTimes.get(t)
          , n = getMainInstance().now;
        s && n < s + 1e3 || (this.reportedPlayerTimes.set(t, n),
        this.onPlayerNeedsReportCbs.forEach((s=>s(t, e, i))))
    }
    onPlayerNeedsReport(t) {
        this.onPlayerNeedsReportCbs.add(t)
    }
}
class ActivityWeight {
    constructor({speed: t=.01}={}) {
        this.weight = 0,
        this.speed = t,
        this.active = !1,
        this.onActiveChangeCbs = new Set
    }
    loop(t, e) {
        t ? this.weight += e * this.speed : this.weight -= e * this.speed,
        t != this.active && (this.active = t,
        this.onActiveChangeCbs.forEach((e=>e(t)))),
        this.weight = clamp01(this.weight)
    }
    onActiveChange(t) {
        this.onActiveChangeCbs.add(t)
    }
}
function getDefaultSkeletonMultipliers(t, e, i) {
    return {
        armR: e * t,
        armL: i * t
    }
}
function makeBowSkeletonWeights(t, e, i) {
    return [{
        name: `bows/${t}/running`,
        weight: 1
    }, {
        name: `bows/${t}/shooting`,
        weight: e.weight
    }, {
        name: `bows/${t}/shootingLoaded`,
        weight: i
    }]
}
function makeMeleeSkeletonWeights(t, e, i) {
    return [{
        name: `melee/${t}/idle`,
        weight: 1
    }, {
        name: `melee/${t}/attackStart`,
        weight: e.weight
    }, {
        name: `melee/${t}/attackEnd`,
        weight: i.weight
    }]
}
class PullingBowSfx {
    constructor(t, {player: e, sfxOptions: i}) {
        this.sfxName = t,
        this.player = e,
        this.sfxOptions = i,
        this.playingState = !1,
        this.currentSfxInstance = null
    }
    setPlayingState(t) {
        t != this.playingState && (t ? this.startPullSfx() : this.stopPullSfx(),
        this.playingState = t)
    }
    async startPullSfx() {
        this.currentPullSfx || (this.currentPullSfx = await getMainInstance().sfx.playSound(this.sfxName, {
            pos: this.player.getSfxPos(),
            ...this.sfxOptions
        }),
        this.playingState || this.stopPullSfx())
    }
    stopPullSfx() {
        this.currentPullSfx && this.currentPullSfx.stop(),
        this.currentPullSfx = null
    }
}
function randomRotateVec(t, e) {
    const i = t.clone();
    i.x += 1,
    i.cross(t).normalize();
    const s = new Quaternion;
    s.setFromAxisAngle(t, Math.random() * Math.PI * 2),
    i.applyQuaternion(s);
    const n = new Quaternion;
    return n.setFromAxisAngle(i, lerp(-e, e, Math.random())),
    t.clone().applyQuaternion(n)
}
class HoldingHandlerManager {
    constructor(t, {upConfig: e, downConfig: i, offscreenConfig: s, minDownVelocity: n=8}) {
        if (this.holdingHandler = t,
        this.upConfig = e,
        this.downConfig = i,
        !s) {
            let t, e;
            i.posOffset ? (t = i.posOffset.clone(),
            t.y -= .5) : t = new Vector3(-.6,-2,-1.3),
            e = i.rotOffset ? i.rotOffset.clone() : new Vector3(-.6,0,-1.3),
            s = {
                posOffset: t,
                rotOffset: e,
                pitchHeightMultiplier: 0,
                maxFov: i.maxFov
            },
            null != i.posBaseFovMultiplierX && (s.posBaseFovMultiplierX = i.posBaseFovMultiplierX),
            null != i.posFovMultiplierX && (s.posFovMultiplierX = i.posFovMultiplierX),
            null != i.posFovMultiplierY && (s.posFovMultiplierY = i.posFovMultiplierY)
        }
        this.offscreenConfig = s,
        this.minDownVelocity = n,
        this.forcedConfig = null,
        this.prevUsePrimaryPosition = !0,
        this.usePrimaryPosition = !0,
        this.holdingHandlerDown = !1,
        this.updateHoldingHandler(!0)
    }
    setUsePrimaryPosition(t) {
        this.usePrimaryPosition = t,
        t && (this.holdingHandlerDown = !1),
        this.updateHoldingHandler()
    }
    loop(t, e, {forceDown: i=!1, forceConfig: s=null}={}) {
        let n = this.holdingHandlerDown;
        if (i)
            n = !0;
        else if (t)
            n = !1;
        else {
            const t = e.rigidBody.velocity.clone();
            t.y = 0,
            t.length() > this.minDownVelocity && (n = !0)
        }
        let a = !1;
        this.usePrimaryPosition != this.prevUsePrimaryPosition && (this.prevUsePrimaryPosition = this.usePrimaryPosition,
        a = !0),
        n != this.holdingHandlerDown && (this.holdingHandlerDown = n,
        a = !0),
        s != this.forcedConfig && (this.forcedConfig = s,
        a = !0),
        a && this.updateHoldingHandler()
    }
    updateHoldingHandler(t=!1) {
        let e;
        e = this.usePrimaryPosition ? this.forcedConfig ? this.forcedConfig : this.holdingHandlerDown ? this.downConfig : this.upConfig : this.offscreenConfig,
        this.holdingHandler.setFirstPersonConfig(e, t)
    }
}
class Weapon {
    constructor(t, e, i) {
        this.player = t,
        this.actionIsDown = !1,
        this.rawActionIsDown = !1,
        this.isPrimaryWeapon = !0,
        this.equipSfxName = "",
        this.holdingHandler = this.player.createHoldingHandler({
            holdingObject: e,
            thirdPersonParentName: i.thirdPersonParentName,
            secondaryThirdPersonParentName: i.secondaryThirdPersonParentName
        }),
        this.holdingHandlerManager = new HoldingHandlerManager(this.holdingHandler,i.holdingHandlerManagerOptions)
    }
    destructor() {
        this.holdingHandler.destructor()
    }
    playerSkinUpdated() {}
    actionDown() {
        this.rawActionIsDown = !0,
        this.actionIsDown || (this.actionIsDown = !0,
        this.onActionDown())
    }
    actionUp() {
        this.rawActionIsDown = !1,
        this.actionIsDown && (this.actionIsDown = !1,
        this.onActionUp())
    }
    onActionDown() {}
    onActionUp() {}
    onPlayerDied() {}
    onPlayerRespawned() {}
    getToggleCooldownValue() {
        return 300
    }
    setIsPrimaryWeapon(t) {
        this.isPrimaryWeapon != t && (this.isPrimaryWeapon = t,
        this.holdingHandler.setUsePrimaryParent(this.isPrimaryWeapon),
        this.holdingHandlerManager.setUsePrimaryPosition(this.isPrimaryWeapon),
        t ? this.equipSfxName && this.playSfx(this.equipSfxName) : this.actionUp())
    }
    playSfx(t, e) {
        getMainInstance().sfx.playSound(t, {
            pos: this.player.getSfxPos(),
            ...e
        })
    }
    loop(t, e) {}
    adjustFov(t) {
        return t
    }
    getWalkSpeedMultiplier() {
        return 1.35
    }
    getAdditionalWalkAcceleration() {
        return null
    }
    getAdditionalWalkAccelerationClampLength() {
        return 1
    }
    getLookInputMultiplier() {
        return 1
    }
    getJumpForceMultiplier() {
        return 1
    }
    getThirdPersonSkeletonLayers() {
        return []
    }
    getThirdPersonSkeletonMultipliers(t) {
        return {}
    }
}
class WeaponBow extends Weapon {
    constructor(t, e, i) {
        const s = new BowAssetLoader;
        super(t, s.obj, i),
        this.bowWeaponId = e,
        this.equipSfxName = "weapon/equipBow",
        this.bowAssetLoader = s
    }
    destructor() {
        super.destructor(),
        this.bowAssetLoader.destructor()
    }
    getAutoShootEnabled() {
        if (!this.player.hasOwnership)
            return !1;
        return getMainInstance().settingsManager.getValue("autoShoot")
    }
    actionDown() {
        if (this.rawActionIsDown = !0,
        this.actionIsDown)
            return;
        const t = this.player.recentlyDestroyedWeapons.get(this.bowWeaponId);
        t && performance.now() - t < 1e3 || (this.actionIsDown = !0,
        this.onActionDown())
    }
    actionUp() {
        this.rawActionIsDown = !1,
        this.actionIsDown && (!this.getAutoShootEnabled() || this.getAutoShootActionUp() || this.player.dead) && (this.actionIsDown = !1,
        this.onActionUp())
    }
    shootArrow(t) {
        if (this.player.hasOwnership) {
            const e = this.player.getCamPos()
              , i = this.player.getShootDirection()
              , s = this.player.game.crosshair.currentAccuracy
              , n = randomRotateVec(i, mapValue(0, 30, 0, .05, s))
              , a = this.player.getSendArrowId()
              , o = getMainInstance().network.sendCreateArrow(this.player.game, this.player.id, {
                arrowId: a,
                pos: e,
                dir: n,
                fireAmount01: t
            });
            this.player.game.arrowManager.createArrow(this.player, o)
        }
    }
    getArrowOpts(t) {
        throw new Error("getArrowOpts is not implemented")
    }
    loop(t, e) {
        super.loop(t, e),
        this.actionIsDown && !this.rawActionIsDown && this.getAutoShootEnabled() && this.getAutoShootActionUp() && (this.actionIsDown = !1,
        this.onActionUp())
    }
    getAutoShootActionUp() {
        return !0
    }
    getAccuracyOffset() {
        return 0
    }
    getClonedArrowObject(t) {
        return this.bowAssetLoader.getClonedArrowObject(t)
    }
    getLoadSpeed(t, e) {
        const i = this.player.getStatClassValue("arrowLoadingSpeed");
        return lerp(t, e, i)
    }
}
const MAX_ARORW_COUNT = 3;
class WeaponSmallBow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "bowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.3,-.1,-1.1),
                    rotOffset: new Vector3(-.6,0,-1.3),
                    posFovMultiplierX: .65,
                    posFovMultiplierY: 1,
                    minFov: 0,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,0,-1.1),
                    rotOffset: new Vector3(0,0,-.2),
                    posFovMultiplierX: .65,
                    valuesSmoothing: .4,
                    minFov: 0,
                    maxFov: 90
                }
            }
        }),
        this.shootingActivity = new ActivityWeight,
        this.shootingMultipleActivity = new ActivityWeight,
        this.fireAmount01 = 0,
        this.arrowCount = 1,
        this.nextArrowTimer = 0,
        this.lastFireUp = 0,
        this.prevArrowReady = !1,
        this.isShootingMultiple = !1,
        this.shootingMultipleVisualLoadState = !1,
        this.shootingMultipleVisualFireAmount = 0,
        this.pullSfx = new PullingBowSfx("weapon/bow/pull",{
            player: this.player,
            sfxOptions: {
                minPitch: 1.3,
                maxPitch: 1.5
            }
        }),
        this.updateBowAsset()
    }
    getAccuracyOffset() {
        return lerp(40, 20, this.fireAmount01)
    }
    adjustFov(t) {
        const e = this.player.getStatClassValue("shootingFocus");
        return lerp(t, t - lerp(10, 30, e), this.fireAmount01)
    }
    getWalkSpeedMultiplier() {
        return this.getIsPullingBow() ? .5 : 1
    }
    getToggleCooldownValue() {
        return 100
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,0,.25),
            damageMultiplier: .6,
            travelDistanceMultiplier: .4,
            scale: e
        }
    }
    onActionUp() {
        this.getFireUpCooldownActive() || (this.shootMultiple(this.arrowCount, this.fireAmount01),
        this.arrowCount = 1,
        this.fireAmount01 = 0,
        this.lastFireUp = getMainInstance().now)
    }
    async shootMultiple(t, e) {
        this.isShootingMultiple = !0;
        for (let i = 0; i < t; i++)
            this.shootArrow(e),
            getMainInstance().sfx.playSound("weapon/bow/shoot", {
                pos: this.player.getSfxPos(),
                minPitch: 1,
                maxPitch: 1.1
            }),
            this.holdingHandler.addFirstPersonImpulse(new Vector3(0,0,.005 * e)),
            i < t - 1 && (await Timeout.promise(50),
            this.shootingMultipleVisualLoadState = !0,
            await Timeout.promise(50),
            this.shootingMultipleVisualLoadState = !1);
        this.isShootingMultiple = !1
    }
    getFireUpCooldownActive() {
        if (this.isShootingMultiple)
            return !0;
        const t = this.getLoadSpeed(350, 250);
        return getMainInstance().now - this.lastFireUp < t
    }
    getIsPullingBow() {
        return this.actionIsDown && !this.getFireUpCooldownActive()
    }
    loop(t, e) {
        super.loop(t, e);
        const i = this.getIsPullingBow();
        if (this.pullSfx.setPlayingState(i),
        i) {
            const t = this.getLoadSpeed(.002, .0035);
            this.fireAmount01 += e * t,
            this.fireAmount01 = clamp01(this.fireAmount01)
        }
        if (this.fireAmount01 >= 1 && this.arrowCount < 3) {
            const t = this.getLoadSpeed(.006, .012);
            this.nextArrowTimer += e * t,
            this.nextArrowTimer > 1 && (this.nextArrowTimer = 0,
            this.arrowCount++,
            this.playArrowReadySfx())
        } else
            this.nextArrowTimer = 0;
        const s = !this.getFireUpCooldownActive();
        s != this.prevArrowReady && (s && this.playArrowReadySfx(),
        this.prevArrowReady = s),
        this.shootingMultipleActivity.loop(this.shootingMultipleVisualLoadState, e);
        const n = s && this.isPrimaryWeapon;
        this.bowAssetLoader.updateFireAmount(this.getVisualFireAmount(), n ? this.arrowCount : 0),
        this.holdingHandlerManager.loop(i, this.player),
        this.shootingActivity.loop(i || this.isShootingMultiple, e)
    }
    getAutoShootActionUp() {
        return this.arrowCount >= 3
    }
    playArrowReadySfx() {
        getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
            pos: this.player.getSfxPos(),
            minPitch: .95,
            maxPitch: 1.05
        })
    }
    getVisualFireAmount() {
        return this.isShootingMultiple ? this.shootingMultipleActivity.weight : this.fireAmount01
    }
    getThirdPersonSkeletonLayers() {
        return makeBowSkeletonWeights("smallBow", this.shootingActivity, this.getVisualFireAmount())
    }
    getThirdPersonSkeletonMultipliers() {
        return getDefaultSkeletonMultipliers(this.shootingActivity.weight, .6, .3)
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("smallBow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "smallBow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e,
            arrowCount: 3
        })
    }
}
class WeaponMediumBow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "bowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.3,-.1,-1.1),
                    rotOffset: new Vector3(-.6,0,-1.3),
                    posFovMultiplierX: .55,
                    posFovMultiplierY: 1,
                    minFov: 0,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,0,-1.1),
                    rotOffset: new Vector3(0,0,-.2),
                    posFovMultiplierX: .55,
                    valuesSmoothing: .4,
                    minFov: 0,
                    maxFov: 90
                }
            }
        }),
        this.shootingActivity = new ActivityWeight,
        this.fireAmount01 = 0,
        this.lastFireUp = 0,
        this.prevArrowReady = !1,
        this.pullSfx = new PullingBowSfx("weapon/bow/pull",{
            player: this.player,
            sfxOptions: {
                minPitch: .7,
                maxPitch: 1
            }
        }),
        this.updateBowAsset()
    }
    getAccuracyOffset() {
        return lerp(30, 0, this.fireAmount01)
    }
    adjustFov(t) {
        const e = this.player.getStatClassValue("shootingFocus");
        return lerp(t, t - lerp(10, 30, e), this.fireAmount01)
    }
    getWalkSpeedMultiplier() {
        return this.getIsPullingBow() ? .3 : 1
    }
    getJumpForceMultiplier() {
        return this.getIsPullingBow() ? .8 : 1
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,0,.25),
            damageMultiplier: 1,
            scale: e
        }
    }
    onActionUp() {
        this.getFireUpCooldownActive() || (this.shootArrow(this.fireAmount01),
        this.holdingHandler.addFirstPersonImpulse(new Vector3(0,0,.005 * this.fireAmount01)),
        getMainInstance().sfx.playSound("weapon/bow/shoot", {
            pos: this.player.getSfxPos(),
            minPitch: .9,
            maxPitch: 1
        }),
        this.fireAmount01 = 0,
        this.lastFireUp = getMainInstance().now)
    }
    getFireUpCooldownActive() {
        const t = this.getLoadSpeed(500, 320);
        return getMainInstance().now - this.lastFireUp < t
    }
    getIsPullingBow() {
        return this.actionIsDown && !this.getFireUpCooldownActive()
    }
    loop(t, e) {
        super.loop(t, e);
        const i = this.getIsPullingBow();
        if (this.pullSfx.setPlayingState(i),
        i) {
            const t = this.getLoadSpeed(.0015, .0025);
            this.fireAmount01 += e * t,
            this.fireAmount01 = clamp01(this.fireAmount01)
        }
        const s = !this.getFireUpCooldownActive();
        s != this.prevArrowReady && (s && getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
            pos: this.player.getSfxPos(),
            minPitch: .95,
            maxPitch: 1.05
        }),
        this.prevArrowReady = s);
        const n = s && this.isPrimaryWeapon;
        this.bowAssetLoader.updateFireAmount(this.fireAmount01, n ? 1 : 0),
        this.holdingHandlerManager.loop(i, this.player),
        this.shootingActivity.loop(i, e)
    }
    getAutoShootActionUp() {
        return this.fireAmount01 >= 1
    }
    getThirdPersonSkeletonLayers() {
        return makeBowSkeletonWeights("mediumBow", this.shootingActivity, this.fireAmount01)
    }
    getThirdPersonSkeletonMultipliers(t) {
        if ("female" == t)
            return getDefaultSkeletonMultipliers(this.shootingActivity.weight, .4, -.2);
        if ("male" == t)
            return getDefaultSkeletonMultipliers(this.shootingActivity.weight, .4, 0);
        throw new Error("Invalid gender")
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("mediumBow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "mediumBow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e
        })
    }
}
class WeaponLargeBow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "bowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.3,-.1,-1.1),
                    rotOffset: new Vector3(-.6,0,-1.3),
                    walkBobMultiplier: .3,
                    valuesSmoothing: .1,
                    posFovMultiplierX: .55,
                    posFovMultiplierY: 1,
                    minFov: 20,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,0,-1.1),
                    rotOffset: new Vector3(0,0,-.2),
                    walkBobMultiplier: .3,
                    valuesSmoothing: .1,
                    posFovMultiplierX: .55,
                    minFov: 20,
                    maxFov: 90
                },
                minDownVelocity: 5
            }
        }),
        this.shootingActivity = new ActivityWeight,
        this.fireAmount01 = 0,
        this.lastFireDown = 0,
        this.lastFireUp = 0,
        this.prevCooldownActive = !1,
        this.isPullingBow = !1,
        this.pullSfx = new PullingBowSfx("weapon/bow/pullHeavy",{
            player: this.player,
            sfxOptions: {
                minPitch: .9,
                maxPitch: 1.1
            }
        }),
        this.updateBowAsset()
    }
    getAccuracyOffset() {
        return lerp(30, 0, this.fireAmount01)
    }
    adjustFov(t) {
        const e = this.player.getStatClassValue("shootingFocus")
          , i = lerp(40, 10, e);
        return lerp(t, i, this.fireAmount01)
    }
    getWalkSpeedMultiplier() {
        return this.getIsPullingBow() ? .1 : .8
    }
    getJumpForceMultiplier() {
        return this.getIsPullingBow() ? .8 : 1
    }
    getToggleCooldownValue() {
        return 500
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,0,.25),
            damageMultiplier: 2,
            travelDistanceMultiplier: 3,
            scale: e,
            trailThicknessMultiplier: 3,
            trailDurationMultiplier: 5
        }
    }
    onActionUp() {
        this.getFireCooldownActive() || (this.shootArrow(this.fireAmount01),
        this.holdingHandler.addFirstPersonImpulse(new Vector3(0,0,.01 * this.fireAmount01)),
        getMainInstance().sfx.playSound("weapon/largeBow/shoot", {
            pos: this.player.getSfxPos(),
            minPitch: .9,
            maxPitch: 1.1
        }),
        this.fireAmount01 = 0,
        this.lastFireUp = getMainInstance().now,
        this.isPullingBow = !1)
    }
    getFireCooldownActive() {
        const t = getMainInstance().now;
        if (!this.isPullingBow) {
            const e = this.getLoadSpeed(1300, 1e3);
            if (t - this.lastFireDown < e)
                return !0
        }
        const e = this.getLoadSpeed(500, 300);
        return t - this.lastFireUp < e
    }
    getIsPullingBow() {
        return this.actionIsDown && !this.getFireCooldownActive()
    }
    loop(t, e) {
        super.loop(t, e);
        const i = this.getIsPullingBow();
        if (i != this.isPullingBow && (i && (this.lastFireDown = t),
        this.isPullingBow = i),
        this.pullSfx.setPlayingState(i),
        i) {
            const t = this.getLoadSpeed(7e-4, .001);
            this.fireAmount01 += e * t,
            this.fireAmount01 = clamp01(this.fireAmount01)
        }
        const s = this.getFireCooldownActive();
        s != this.prevCooldownActive && (s || getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
            pos: this.player.getSfxPos(),
            minPitch: .95,
            maxPitch: 1.05
        }),
        this.prevCooldownActive = s);
        const n = !s && this.isPrimaryWeapon;
        this.bowAssetLoader.updateFireAmount(this.fireAmount01, n ? 1 : 0),
        this.holdingHandlerManager.loop(i, this.player),
        this.shootingActivity.loop(i, e)
    }
    getAutoShootActionUp() {
        return this.fireAmount01 >= 1
    }
    getThirdPersonSkeletonLayers() {
        return makeBowSkeletonWeights("largeBow", this.shootingActivity, this.fireAmount01)
    }
    getThirdPersonSkeletonMultipliers() {
        return getDefaultSkeletonMultipliers(this.shootingActivity.weight, .4, -.2)
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("largeBow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "largeBow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e
        })
    }
}
class WeaponSmallCrossBow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "crossbowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.3,.1,-1.1),
                    rotOffset: new Vector3(-.5,Math.PI / 2,0),
                    posFovMultiplierX: .2,
                    posFovMultiplierY: 1,
                    minFov: 0,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,-.4,-1.1),
                    rotOffset: new Vector3(0,0,.2),
                    posFovMultiplierX: .4,
                    valuesSmoothing: .4,
                    minFov: 0,
                    maxFov: 90
                }
            }
        }),
        this.lastFireTime = 0,
        this.prevArrowVisible = !1,
        this.playNextFirstPersonLoadAnimation = !1,
        this.loadingActivity = new ActivityWeight,
        this.shootingActivity = new ActivityWeight,
        this.updateBowAsset()
    }
    getAccuracyOffset() {
        return 10
    }
    getWalkSpeedMultiplier() {
        return 1.1
    }
    getToggleCooldownValue() {
        return 100
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,-.12,.15),
            damageMultiplier: 1 / 3,
            scale: e
        }
    }
    onActionDown() {
        this.getFireUpCooldownActive() || (this.shootArrow(1),
        this.holdingHandler.addFirstPersonImpulse(new Vector3(0,0,.005)),
        getMainInstance().sfx.playSound("weapon/smallCrossbow/shoot", {
            pos: this.player.getSfxPos(),
            minPitch: .9,
            maxPitch: 1.1
        }),
        this.fireAmount01 = 0,
        this.lastFireTime = getMainInstance().now,
        this.playNextFirstPersonLoadAnimation = !this.holdingHandlerManager.holdingHandlerDown)
    }
    getFireUpCooldownActive() {
        return getMainInstance().now - this.lastFireTime < this.getArrowReadyMs()
    }
    getArrowVisibleMs() {
        return this.getLoadSpeed(300, 180)
    }
    getArrowReadyMs() {
        return this.getLoadSpeed(700, 400)
    }
    loop(t, e) {
        super.loop(t, e);
        const i = t - this.lastFireTime
          , s = i < 3e3
          , n = i < this.getArrowReadyMs()
          , a = n && this.playNextFirstPersonLoadAnimation || this.player.dead
          , o = mapValue(this.getArrowVisibleMs(), this.getArrowReadyMs(), 0, 1, i, !0)
          , r = i > this.getArrowVisibleMs();
        r != this.prevArrowVisible && (r && getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
            pos: this.player.getSfxPos(),
            minPitch: .95,
            maxPitch: 1.05
        }),
        this.prevArrowVisible = r),
        this.bowAssetLoader.updateFireAmount(o, r && this.isPrimaryWeapon ? 1 : 0),
        this.holdingHandlerManager.loop(s, this.player, {
            forceDown: a
        }),
        this.loadingActivity.loop(n, e),
        this.shootingActivity.loop(s, e)
    }
    getThirdPersonSkeletonLayers() {
        return [{
            name: "bows/smallCrossbow/running",
            weight: 1
        }, {
            name: "bows/smallCrossbow/shooting",
            weight: this.shootingActivity.weight
        }, {
            name: "bows/smallCrossbow/loading",
            weight: this.loadingActivity.weight
        }]
    }
    getThirdPersonSkeletonMultipliers(t) {
        const e = this.shootingActivity.weight * (1 - this.loadingActivity.weight);
        if ("female" == t)
            return getDefaultSkeletonMultipliers(e, .4, 0);
        if ("male" == t)
            return getDefaultSkeletonMultipliers(e, .4, -.2);
        throw new Error("invalid gender")
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("smallCrossbow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "smallCrossbow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e
        })
    }
}
const MAX_ARROW_LOAD_COUNT = 10
  , HANDLE_OBJECT_NAME = "handleRotation"
  , ARROW_BOX_OBJECT_NAME = "arrowBoxRotation";
class WeaponRepeatingCrossbow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "crossbowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(0,.2,-.7),
                    rotOffset: new Vector3(-.5,.4,0),
                    valuesSmoothing: .25,
                    pitchHeightMultiplier: .1,
                    posFovMultiplierX: .4,
                    posFovMultiplierY: 1,
                    minFov: 60,
                    maxFov: 110
                },
                upConfig: {
                    posOffset: new Vector3(.2,-.1,-.3),
                    rotOffset: new Vector3(0,0,0),
                    walkBobMultiplier: .1,
                    valuesSmoothing: .25,
                    pitchHeightMultiplier: .02,
                    posFovMultiplierX: .1,
                    posFovMultiplierY: .2,
                    minFov: 70,
                    maxFov: 90
                },
                minDownVelocity: 6
            }
        }),
        this.loadingOrShootingState = !1,
        this.loadedArrowCount = 10,
        this.shootOrLoadTimer = 0,
        this.hasReleasedAction = !0,
        this.loadingActivity = new ActivityWeight,
        this.loadingEndActivity = new ActivityWeight,
        this.shootingActivity = new ActivityWeight,
        this.currentHandleObject = null,
        this.currentArrowBoxObject = null,
        this.bowAssetLoader.onAssetChange((t=>{
            this.currentHandleObject = t.getObjectByName("handleRotation"),
            this.currentArrowBoxObject = t.getObjectByName("arrowBoxRotation")
        }
        )),
        this.emptyFirstPersonConfig = {
            posOffset: new Vector3(.1,-.5,-.2),
            rotOffset: new Vector3(.8,1.2,0),
            valuesSmoothing: .25,
            pitchHeightMultiplier: .2,
            posFovMultiplierX: -.1
        },
        this.loadingFirstPersonConfig = {
            posOffset: new Vector3(.1,-.3,-.2),
            rotOffset: new Vector3(.3,1.1,.5),
            valuesSmoothing: .25,
            pitchHeightMultiplier: 0,
            walkBobMultiplier: 0
        },
        this.updateBowAsset()
    }
    getAccuracyOffset() {
        const t = this.player.rigidBody.velocity.clone();
        return t.y = 0,
        t.length() > 1 ? 40 : 10
    }
    adjustFov(t) {
        if (this.isFiringArrows()) {
            const e = this.player.getStatClassValue("shootingFocus");
            return t - lerp(10, 30, e)
        }
        return t
    }
    getWalkSpeedMultiplier() {
        return this.isFiringArrows() ? .2 : .8
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,-.2,.2),
            damageMultiplier: .4,
            scale: e
        }
    }
    onActionUp() {
        this.hasReleasedAction = !0
    }
    onPlayerRespawned() {
        this.loadingOrShootingState = !1,
        this.loadedArrowCount = 10,
        this.shootOrLoadTimer = 0
    }
    isFiringArrows() {
        return this.hasReleasedAction && this.actionIsDown && !this.loadingOrShootingState
    }
    isLoading() {
        return this.hasReleasedAction && this.actionIsDown && this.loadingOrShootingState
    }
    getShootArrowInterval() {
        return this.getLoadSpeed(300, 200)
    }
    getFireAmount() {
        return this.isFiringArrows() ? this.shootOrLoadTimer / this.getShootArrowInterval() : 0
    }
    loop(t, e) {
        if (super.loop(t, e),
        this.hasReleasedAction && this.actionIsDown)
            if (this.shootOrLoadTimer += e,
            this.loadingOrShootingState) {
                const t = this.getLoadSpeed(150, 80);
                this.shootOrLoadTimer > t && (this.shootOrLoadTimer = 0,
                getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
                    pos: this.player.getSfxPos(),
                    minPitch: .95,
                    maxPitch: 1.05
                }),
                this.loadedArrowCount++,
                this.loadedArrowCount >= 10 && (this.loadingOrShootingState = !1,
                this.hasReleasedAction = !1))
            } else
                this.shootOrLoadTimer > this.getShootArrowInterval() && (this.shootOrLoadTimer = 0,
                this.shootArrow(1),
                getMainInstance().sfx.playSound("weapon/bow/shoot", {
                    pos: this.player.getSfxPos(),
                    minPitch: .9,
                    maxPitch: 1.1
                }),
                this.loadedArrowCount--,
                this.loadedArrowCount <= 0 && (this.loadingOrShootingState = !0,
                this.hasReleasedAction = !1));
        const i = this.getFireAmount();
        this.bowAssetLoader.updateFireAmount(i, this.isPrimaryWeapon ? this.loadedArrowCount : 0);
        const s = this.isLoading();
        let n = null;
        s ? n = this.loadingFirstPersonConfig : this.loadingOrShootingState && (n = this.emptyFirstPersonConfig),
        this.holdingHandlerManager.loop(this.isFiringArrows(), this.player, {
            forceConfig: n
        }),
        this.loadingActivity.loop(s, e),
        this.loadingEndActivity.loop(this.shootOrLoadTimer < this.getShootArrowInterval() / 2, e),
        this.shootingActivity.loop(this.isFiringArrows(), e);
        const a = 1 - i;
        this.currentHandleObject && (this.currentHandleObject.rotation.x = lerp(0, 1, a)),
        this.currentArrowBoxObject && (this.currentArrowBoxObject.rotation.x = lerp(0, .2, a * (1 - this.loadingActivity.weight)))
    }
    getAutoShootActionUp() {
        return !this.hasReleasedAction
    }
    getThirdPersonSkeletonLayers() {
        const t = this.shootingActivity.weight
          , e = this.loadingActivity.weight;
        return [{
            name: "bows/repeatingCrossbow/running",
            weight: 1
        }, {
            name: "bows/repeatingCrossbow/loadingStart",
            weight: e
        }, {
            name: "bows/repeatingCrossbow/loadingEnd",
            weight: e * this.loadingEndActivity.weight
        }, {
            name: "bows/repeatingCrossbow/shootStart",
            weight: t
        }, {
            name: "bows/repeatingCrossbow/shootEnd",
            weight: t * (1 - this.getFireAmount())
        }]
    }
    getThirdPersonSkeletonMultipliers() {
        return getDefaultSkeletonMultipliers(this.shootingActivity.weight, .4, .2)
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("repeatingCrossbow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "repeatingCrossbow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e,
            separateObjectNames: ["handleRotation", "arrowBoxRotation"],
            arrowCount: 10,
            arrowPositions: "stacked"
        })
    }
}
class WeaponLargeCrossbow extends WeaponBow {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "bowHoldingPos",
            secondaryThirdPersonParentName: "crossbowSecondaryPos",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(0,.2,-.7),
                    rotOffset: new Vector3(-.5,.4,0),
                    valuesSmoothing: .25,
                    pitchHeightMultiplier: .1,
                    posFovMultiplierX: .4,
                    posFovMultiplierY: 1,
                    minFov: 60,
                    maxFov: 110
                },
                upConfig: {
                    posOffset: new Vector3(0,-.1,-.5),
                    rotOffset: new Vector3(0,0,0),
                    walkBobMultiplier: .1,
                    valuesSmoothing: .25,
                    pitchHeightMultiplier: .02,
                    posFovMultiplierX: .1,
                    posFovMultiplierY: .2,
                    minFov: 70,
                    maxFov: 90
                },
                minDownVelocity: 6
            }
        }),
        this.loadAmount01 = 1,
        this.lastShootTime = 0,
        this.prevArrowReady = !1,
        this.loadWeightStart = new ActivityWeight,
        this.shootingWeight = new ActivityWeight,
        this.pullSfx = new PullingBowSfx("weapon/bow/pullHeavy",{
            player: this.player,
            sfxOptions: {
                minPitch: 1.3,
                maxPitch: 1.5
            }
        }),
        this.loadingFirstPersonConfig = {
            posOffset: new Vector3(0,.3,-1),
            rotOffset: new Vector3(-.5,.5,.3),
            valuesSmoothing: .25,
            pitchHeightMultiplier: .1,
            posFovMultiplierX: .1,
            posFovMultiplierY: 1,
            minFov: 60,
            maxFov: 110
        },
        this.updateBowAsset()
    }
    adjustFov(t) {
        if (this.weaponIsLoaded()) {
            const e = this.player.getStatClassValue("shootingFocus");
            return t - lerp(10, 30, e)
        }
        return t
    }
    getWalkSpeedMultiplier() {
        return this.isLoadingWeapon() ? .05 : .8
    }
    getJumpForceMultiplier() {
        return this.isLoadingWeapon() ? 0 : 1
    }
    getArrowOpts(t) {
        const e = new Vector3;
        return e.set(1, 1, 1),
        this.bowAssetLoader.assetLoaded && e.copy(this.bowAssetLoader.getLoadedArrowPointScale()),
        {
            visualOffset: new Vector3(0,-.12,.05),
            damageMultiplier: 2,
            scale: e
        }
    }
    onActionDown() {
        this.weaponIsLoaded() && (this.shootArrow(1),
        this.holdingHandler.addFirstPersonImpulse(new Vector3(0,0,.005)),
        getMainInstance().sfx.playSound("weapon/largeCrossbow/shoot", {
            pos: this.player.getSfxPos(),
            minPitch: .9,
            maxPitch: 1.1
        }),
        this.loadAmount01 = 0,
        this.lastShootTime = getMainInstance().now)
    }
    onPlayerRespawned() {
        this.loadAmount01 = 1
    }
    getFireUpCooldownActive() {
        const t = this.getLoadSpeed(500, 300);
        return getMainInstance().now - this.lastShootTime < t
    }
    weaponIsLoaded() {
        return this.loadAmount01 >= 1
    }
    isLoadingWeapon() {
        return !this.getFireUpCooldownActive() && (!this.weaponIsLoaded() && (this.actionIsDown || this.loadAmount01 > .4))
    }
    loop(t, e) {
        super.loop(t, e);
        const i = this.isLoadingWeapon();
        if (this.pullSfx.setPlayingState(i),
        i) {
            const t = this.getLoadSpeed(.001, .0015);
            this.loadAmount01 += e * t,
            this.loadAmount01 = clamp01(this.loadAmount01)
        } else
            this.weaponIsLoaded() || (this.loadAmount01 = 0);
        const s = !this.getFireUpCooldownActive();
        s != this.prevArrowReady && (s && getMainInstance().sfx.playSound("weapon/bow/arrowReady", {
            pos: this.player.getSfxPos(),
            minPitch: .95,
            maxPitch: 1.05
        }),
        this.prevArrowReady = s);
        const n = s && this.isPrimaryWeapon;
        this.bowAssetLoader.updateFireAmount(this.loadAmount01, n ? 1 : 0);
        const a = i ? this.loadingFirstPersonConfig : null;
        this.holdingHandlerManager.loop(i, this.player, {
            forceConfig: a
        }),
        this.loadWeightStart.loop(i, e),
        this.shootingWeight.loop(this.weaponIsLoaded(), e)
    }
    getAutoShootActionUp() {
        return !this.isLoadingWeapon()
    }
    getThirdPersonSkeletonLayers() {
        return [{
            name: "bows/largeCrossbow/running",
            weight: 1
        }, {
            name: "bows/largeCrossbow/loadingStart",
            weight: this.loadWeightStart.weight
        }, {
            name: "bows/largeCrossbow/loadingEnd",
            weight: this.loadAmount01
        }, {
            name: "bows/largeCrossbow/shooting",
            weight: this.shootingWeight.weight
        }]
    }
    getThirdPersonSkeletonMultipliers(t) {
        const e = this.shootingWeight.weight;
        if ("female" == t)
            return getDefaultSkeletonMultipliers(e, .5, .5);
        if ("male" == t)
            return getDefaultSkeletonMultipliers(e, .5, 1);
        throw new Error("Invalid gender")
    }
    playerSkinUpdated() {
        this.updateBowAsset()
    }
    updateBowAsset() {
        const {skins: t, arrowSkin: e} = getMainInstance().skins.skinNetworkDataToBowAssetData("largeCrossbow", this.player.equippedSkinData);
        this.bowAssetLoader.setConfig({
            bowId: "largeCrossbow",
            teamId: this.player.teamId,
            skins: t,
            arrowSkin: e
        })
    }
}
class LongMeleeAttackHelper {
    constructor(t) {
        this.weapon = t,
        this.isAttacking = !1
    }
    startAttacking() {
        this.isAttacking = !0
    }
    stopAttacking() {
        this.isAttacking = !1
    }
    loop() {
        if (this.isAttacking) {
            if (this.weapon.attack())
                return this.isAttacking = !1,
                !0
        }
        return !1
    }
}
class WeaponMelee extends Weapon {
    constructor(t, e) {
        const i = new ConfigObjectAssetLoader({
            label: "melee"
        });
        super(t, i.obj, e),
        this.equipSfxName = "weapon/equipMelee",
        this.hitSfxName = "",
        this.swingSfxName = "",
        this.hitSfxOptions = null,
        this.meleeAssetLoader = i
    }
    destructor() {
        super.destructor(),
        this.meleeAssetLoader.destructor()
    }
    getRequiredHorizontalAngleMultiplier() {
        return 1
    }
    getRequiredVerticalAngleMultiplier() {
        return 1
    }
    attack() {
        if (!this.player.hasOwnership)
            return !1;
        if (this.player.dead)
            return !1;
        const t = this.player.getCamPos()
          , e = this.player.getLookDirection();
        let i = lerp(2, 4, this.player.getStatClassValue("meleeAttackReach"));
        i *= this.getRangeMultiplier();
        let s = null;
        for (const n of this.player.game.physics.getPlayerColliders()) {
            if (n.rigidBody.player.teamId == this.player.teamId)
                continue;
            if (n.rigidBody.player.dead)
                continue;
            const a = t.clone().sub(n.center)
              , o = a.clone();
            o.y = 0;
            const r = e.clone();
            r.y = 0;
            const l = o.angleTo(r)
              , h = o.clone()
              , d = new Quaternion;
            d.setFromAxisAngle(new Vector3(0,1,0), .5 * Math.PI),
            h.applyQuaternion(d);
            const c = e.clone();
            c.projectOnPlane(h);
            const u = a.angleTo(c)
              , p = a.length();
            if (p < i) {
                const t = 1 / p * this.getRequiredHorizontalAngleMultiplier()
                  , i = 1 / p * this.getRequiredVerticalAngleMultiplier();
                if (l < t && u < i) {
                    const t = a.angleTo(e) * p;
                    (!s || t < s.score) && (s = {
                        collider: n,
                        score: t
                    })
                }
            }
        }
        if (s) {
            const e = s.collider
              , i = this.player.game.physics.getRayCastCache(t, e.center);
            if (i) {
                const s = this.player.game.physics.rayCastMapColliders(i, (t=>!t.collider.ignoreArrows && t.collider.excludeTeamId != this.player.teamId));
                if (s) {
                    const i = t.distanceTo(e.center) - e.radius;
                    if (s.dist < i)
                        return !1
                }
            }
            const n = e.rigidBody.player;
            return n.addMeleeHitFlash(),
            getMainInstance().sfx.playSound("feedback/hitPlayer"),
            this.playHitSfx(),
            getMainInstance().network.sendMeleeHitPlayer(n.id, n.currentSpawnId, this.player.id),
            !0
        }
        return !1
    }
    playHitSfx() {
        this.hitSfxName && this.playSfx(this.hitSfxName, this.hitSfxOptions || void 0)
    }
    validateHit(t) {
        return t.pos.distanceTo(this.player.pos) < 5
    }
    getDamageMultiplier() {
        return 0
    }
    getStunData() {
        return {
            amount: .2,
            duration: 300,
            fadeDuration: 500
        }
    }
    getRangeMultiplier() {
        return 1
    }
    getAttackSpeedStat() {
        return this.player.getStatClassValue("meleeAttackSpeed")
    }
    updateMeleeAsset(t) {
        this.meleeAssetLoader.setConfig({
            skinAssetName: t,
            teamId: this.player.teamId
        })
    }
}
class WeaponMeleeBladedLight extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosLight",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(0,0,-.6),
                    rotOffset: new Vector3(-1.9,0,0),
                    posFovMultiplierX: .4,
                    posFovMultiplierY: .7,
                    valuesSmoothing: .4,
                    minFov: 60,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,.2,-.6),
                    rotOffset: new Vector3(-.4,.6,0),
                    posFovMultiplierX: .4,
                    posFovMultiplierY: .7,
                    valuesSmoothing: .4,
                    minFov: 60,
                    maxFov: 90
                }
            }
        }),
        this.hitSfxName = "weapon/melee/bladedHit",
        this.attackT = 0,
        this.stamina = 1,
        this.isAttacking = !1,
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.attackStartPos = new Vector3,
        this.attackEndPos = new Vector3,
        this.attackStartConfig = {
            posOffset: this.attackStartPos,
            rotOffset: new Vector3(-1.9,0,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .3,
            minFov: 60,
            maxFov: 90
        },
        this.attackEndConfig = {
            posOffset: this.attackEndPos,
            rotOffset: new Vector3(-1.5,.3,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .6,
            minFov: 60,
            maxFov: 90
        },
        this.attackStartActivity = new ActivityWeight,
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t ? (this.playSfx("weapon/melee/bladedSwing", {
                minPitch: 1.1,
                maxPitch: 1.3,
                volume: .02
            }),
            this.longAttackHelper.startAttacking()) : (this.attackStartPos.set(randRange(-.1, .1), 0, randRange(-.7, -.5)),
            this.attackEndPos.set(randRange(-.4, -.2), 0, randRange(-1.1, -.8)),
            this.longAttackHelper.stopAttacking())
        }
        ))
    }
    getWalkSpeedMultiplier() {
        return this.isAttacking ? lerp(.7, 1.1, this.stamina) : 1.1
    }
    getDamageMultiplier() {
        return .2
    }
    getToggleCooldownValue() {
        return 100
    }
    loop(t, e) {
        super.loop(t, e);
        let i = null
          , s = !1
          , n = !1;
        if (this.actionIsDown && (this.isAttacking = !0),
        this.isAttacking) {
            this.attackT += e * lerp(.5, 1, this.stamina);
            const t = this.attackT * lerp(.8, 1.4, this.getAttackSpeedStat())
              , a = mod(t, 200);
            a < 100 && !this.actionIsDown && !this.attackEndActivity.active ? this.isAttacking = !1 : a < 100 ? (i = {
                ...this.attackEndConfig
            },
            s = !0,
            n = !0) : (i = {
                ...this.attackStartConfig
            },
            s = !0),
            this.stamina -= 3e-4 * e
        } else
            this.stamina += 3e-4 * e;
        this.stamina = clamp01(this.stamina),
        this.holdingHandlerManager.loop(this.isAttacking, this.player, {
            forceConfig: i
        }),
        this.attackStartActivity.loop(s, e),
        this.attackEndActivity.loop(n, e),
        this.longAttackHelper.loop()
    }
    onActionDown() {
        this.isAttacking || (this.attackT = 0)
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("bladedLight", this.attackStartActivity, this.attackEndActivity)
    }
}
class AttackConfigRandomizer {
    constructor(t) {
        if (0 == t.length)
            throw new Error("zero configs provided");
        this.configs = t,
        this.currentConfig = null,
        this.randomize()
    }
    randomize() {
        this.currentConfig = randFromArray(this.configs)
    }
    getCurrentConfig() {
        if (!this.currentConfig)
            throw new Error("no active config");
        return this.currentConfig
    }
}
class HoldAttackManager {
    constructor({weapon: t, prepareDurationMsLowAttackSpeed: e, prepareDurationMsHighAttackSpeed: i, cooldownDurationMsLowAttackSpeed: s, cooldownDurationMsHighAttackSpeed: n}) {
        this.weapon = t,
        this.prepareDurationMsLowAttackSpeed = e,
        this.prepareDurationMsHighAttackSpeed = i,
        this.cooldownDurationMsLowAttackSpeed = s,
        this.cooldownDurationMsHighAttackSpeed = n,
        this.actionIsDown = !1,
        this.attackTime = 0,
        this.isPreparingAttack = !1,
        this.cooldownIsActive = !1
    }
    onActionDown() {
        this.actionIsDown = !0
    }
    onActionUp() {
        this.actionIsDown = !1,
        this.isPreparingAttack && (this.attackTime = Math.max(this.attackTime, getMainInstance().now))
    }
    get timeSinceAttack() {
        const t = getMainInstance().now - this.attackTime;
        return this.actionIsDown ? Math.min(-1e-6, t) : t
    }
    loop(t, e, i) {
        if (this.actionIsDown && !this.cooldownIsActive && !this.isPreparingAttack) {
            this.isPreparingAttack = !0;
            const t = lerp(this.prepareDurationMsLowAttackSpeed, this.prepareDurationMsHighAttackSpeed, i);
            this.attackTime = getMainInstance().now + t
        }
        if (this.isPreparingAttack)
            t > this.attackTime && !this.actionIsDown && (this.isPreparingAttack = !1,
            this.cooldownIsActive = !0);
        else if (this.cooldownIsActive) {
            const e = lerp(this.cooldownDurationMsLowAttackSpeed, this.cooldownDurationMsHighAttackSpeed, i);
            t > this.attackTime + e && (this.cooldownIsActive = !1)
        }
        return {
            preparing: this.isPreparingAttack,
            cooldownActive: this.cooldownIsActive
        }
    }
}
class WeaponMeleeBladedHeavy extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosBladedHeavy",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.5,-.1,-1.1),
                    rotOffset: new Vector3(.3,0,-1.2),
                    posFovMultiplierX: .55,
                    posFovMultiplierY: 1,
                    valuesSmoothing: .4,
                    minFov: 0,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,-.5,-.7),
                    rotOffset: new Vector3(0,0,-.4),
                    posFovMultiplierX: .3,
                    minFov: 60,
                    maxFov: 90,
                    valuesSmoothing: .2
                }
            }
        }),
        this.hitSfxName = "weapon/melee/bladedHit",
        this.holdAttack = new HoldAttackManager({
            weapon: this,
            prepareDurationMsLowAttackSpeed: 300,
            prepareDurationMsHighAttackSpeed: 150,
            cooldownDurationMsLowAttackSpeed: 400,
            cooldownDurationMsHighAttackSpeed: 200
        }),
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.attackStartActivity = new ActivityWeight,
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t ? (this.longAttackHelper.startAttacking(),
            this.playSfx("weapon/melee/bladedSwing", {
                minPitch: .9,
                maxPitch: 1.1
            })) : this.randomizer.randomize()
        }
        )),
        this.randomizer = new AttackConfigRandomizer([{
            start: {
                posOffset: new Vector3(0,-.3,-.8),
                rotOffset: new Vector3(.3,0,-.4),
                posFovMultiplierX: .3,
                minFov: 60,
                maxFov: 90,
                valuesSmoothing: .1
            },
            end: {
                posOffset: new Vector3(-.5,-.5,-.8),
                rotOffset: new Vector3(-.7,1.9,-1.5),
                posFovMultiplierX: .3,
                minFov: 60,
                maxFov: 90,
                valuesSmoothing: .7
            }
        }, {
            start: {
                posOffset: new Vector3(0,-.3,-.8),
                rotOffset: new Vector3(.3,0,.4),
                posFovMultiplierX: -.3,
                minFov: 60,
                maxFov: 90,
                valuesSmoothing: .2
            },
            end: {
                posOffset: new Vector3(.5,-.5,-.8),
                rotOffset: new Vector3(-2.4,1.4,-1.5),
                posFovMultiplierX: -.3,
                minFov: 60,
                maxFov: 90,
                valuesSmoothing: .7
            }
        }])
    }
    getDamageMultiplier() {
        return .6
    }
    onActionUp() {
        this.holdAttack.onActionUp()
    }
    onActionDown() {
        this.holdAttack.onActionDown()
    }
    getRequiredVerticalAngleMultiplier() {
        return .7
    }
    getRequiredHorizontalAngleMultiplier() {
        return 2
    }
    loop(t, e) {
        super.loop(t, e);
        const {preparing: i, cooldownActive: s} = this.holdAttack.loop(t, e, this.getAttackSpeedStat());
        let n = null
          , a = !1
          , o = !1;
        i ? (n = this.randomizer.getCurrentConfig().start,
        a = !0) : s && (n = this.randomizer.getCurrentConfig().end,
        a = !0,
        o = !0),
        this.longAttackHelper.isAttacking && this.holdAttack.timeSinceAttack > 200 && this.longAttackHelper.stopAttacking(),
        this.holdingHandlerManager.loop(this.actionIsDown, this.player, {
            forceConfig: n
        }),
        this.attackStartActivity.loop(a, e),
        this.attackEndActivity.loop(o, e),
        this.longAttackHelper.loop()
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("bladedHeavy", this.attackStartActivity, this.attackEndActivity)
    }
}
class WeaponMeleeBluntHeavy extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosBluntHeavy",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(-.5,-.7,-.6),
                    rotOffset: new Vector3(0,0,-1),
                    posFovMultiplierX: .55,
                    valuesSmoothing: .1,
                    minFov: 0,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(-.4,-.5,-.6),
                    rotOffset: new Vector3(0,0,-.6),
                    posFovMultiplierX: .55,
                    valuesSmoothing: .1,
                    walkBobMultiplier: .5,
                    maxFov: 70
                }
            }
        }),
        this.hitSfxName = "weapon/melee/bluntHit",
        this.holdAttack = new HoldAttackManager({
            weapon: this,
            prepareDurationMsLowAttackSpeed: 500,
            prepareDurationMsHighAttackSpeed: 200,
            cooldownDurationMsLowAttackSpeed: 700,
            cooldownDurationMsHighAttackSpeed: 200
        }),
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.attackStartTime = 0,
        this.attackStartActivity = new ActivityWeight({
            speed: .003
        }),
        this.attackStartActivity.onActiveChange((t=>{
            t && (this.attackStartTime = getMainInstance().now)
        }
        )),
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t && (this.longAttackHelper.startAttacking(),
            this.playSfx("weapon/melee/bluntSwing", {
                minPitch: .9,
                maxPitch: 1.1
            }))
        }
        )),
        this.attackStartConfig = {
            posOffset: new Vector3(-.1,-.3,-.8),
            rotOffset: new Vector3(.7,0,0),
            posFovMultiplierX: .4,
            valuesSmoothing: .1,
            walkBobMultiplier: 0,
            maxFov: 90
        },
        this.attackEndConfig = {
            posOffset: new Vector3(0,-.3,-.4),
            rotOffset: new Vector3(-2,0,.6),
            posFovMultiplierX: .4,
            valuesSmoothing: .5,
            walkBobMultiplier: 0,
            maxFov: 90
        }
    }
    getWalkSpeedMultiplier() {
        if (this.attackStartActivity.active) {
            const t = getMainInstance().now - this.attackStartTime
              , e = lerp(800, 500, this.getAttackSpeedStat());
            return mapValue(300, e, .3, .9, t, !0)
        }
        return this.attackEndActivity.active ? .7 : .9
    }
    getDamageMultiplier() {
        return 1
    }
    getStunData() {
        return {
            amount: .7,
            duration: 700,
            fadeDuration: 500
        }
    }
    getToggleCooldownValue() {
        return 600
    }
    onActionDown() {
        this.holdAttack.onActionDown()
    }
    onActionUp() {
        this.holdAttack.onActionUp()
    }
    getRequiredVerticalAngleMultiplier() {
        return 2
    }
    getRequiredHorizontalAngleMultiplier() {
        return .7
    }
    loop(t, e) {
        super.loop(t, e);
        const {cooldownActive: i, preparing: s} = this.holdAttack.loop(t, e, this.getAttackSpeedStat());
        let n = null
          , a = !1
          , o = !1;
        s ? (n = this.attackStartConfig,
        a = !0) : i && (n = this.attackEndConfig,
        o = !0),
        this.holdingHandlerManager.loop(this.actionIsDown, this.player, {
            forceConfig: n
        }),
        this.longAttackHelper.isAttacking && this.holdAttack.timeSinceAttack > 400 && this.longAttackHelper.stopAttacking(),
        this.attackStartActivity.loop(a, e),
        this.attackEndActivity.loop(o, e),
        this.longAttackHelper.loop()
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("bluntHeavy", this.attackStartActivity, this.attackEndActivity)
    }
}
class WeaponMeleeBluntLight extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosLight",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(.2,.1,-.5),
                    rotOffset: new Vector3(-1.3,.1,1),
                    posFovMultiplierX: .4,
                    posFovMultiplierY: .9,
                    valuesSmoothing: .2,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(-.2,-.5,-.8),
                    rotOffset: new Vector3(0,0,-.2),
                    posFovMultiplierX: .7,
                    posFovMultiplierY: 0,
                    valuesSmoothing: .1,
                    maxFov: 80
                }
            }
        }),
        this.hitSfxName = "weapon/melee/bluntHit",
        this.hitSfxOptions = {
            minPitch: 1.3,
            maxPitch: 1.4
        },
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.lastActionDownTime = 0,
        this.didHit = !1,
        this.lastHitTime = 0,
        this.attackStartConfig = {
            posOffset: new Vector3(-.2,-.3,-.8),
            rotOffset: new Vector3(.5,0,-.2),
            posFovMultiplierX: .5,
            posFovMultiplierY: 0,
            valuesSmoothing: .3,
            maxFov: 80
        },
        this.attackBounceConfig = {
            posOffset: new Vector3(.1,-.1,-.4),
            rotOffset: new Vector3(-.5,0,0),
            posFovMultiplierX: 0,
            posFovMultiplierY: 0,
            valuesSmoothing: .3,
            maxFov: 80
        },
        this.attackSwingConfig = {
            posOffset: new Vector3(-.1,-.4,-.8),
            rotOffset: new Vector3(-1.5,0,.4),
            posFovMultiplierX: 0,
            posFovMultiplierY: 0,
            valuesSmoothing: .3,
            maxFov: 80
        },
        this.attackStartActivity = new ActivityWeight,
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t && (this.playSfx("weapon/melee/bluntSwing", {
                minPitch: 1.4,
                maxPitch: 1.6,
                volume: .03
            }),
            this.longAttackHelper.startAttacking())
        }
        ))
    }
    getDamageMultiplier() {
        return .6
    }
    getStunData() {
        return {
            amount: .5,
            duration: 200,
            fadeDuration: 1100
        }
    }
    getWalkSpeedMultiplier() {
        return this.attackEndActivity.active && !this.didHit ? .8 : 1
    }
    getCooldownIsActive() {
        const t = this.didHit ? 200 : 600;
        return getMainInstance().now - this.lastActionDownTime < t * this.getAnimationDurationMultiplier()
    }
    getAnimationDurationMultiplier() {
        return lerp(1.5, .8, this.getAttackSpeedStat())
    }
    loop(t, e) {
        super.loop(t, e);
        let i = null
          , s = !1
          , n = !1;
        const a = t - this.lastActionDownTime
          , o = t - this.lastHitTime
          , r = 100 * this.getAnimationDurationMultiplier()
          , l = (this.didHit ? 150 : 500) * this.getAnimationDurationMultiplier();
        a < r ? (i = this.attackStartConfig,
        s = !0,
        this.didHit = !1) : this.didHit ? o < 100 && (i = this.attackBounceConfig,
        n = !0) : a < l && (i = this.attackSwingConfig,
        n = !0),
        this.holdingHandlerManager.loop(a < 1e3, this.player, {
            forceConfig: i
        }),
        this.longAttackHelper.isAttacking && a > 300 && this.longAttackHelper.stopAttacking(),
        this.attackStartActivity.loop(s, e),
        this.attackEndActivity.loop(n, e);
        this.longAttackHelper.loop() && (this.didHit = !0,
        this.lastHitTime = t)
    }
    onActionDown() {
        this.getCooldownIsActive() || (this.lastActionDownTime = getMainInstance().now)
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("bluntLight", this.attackStartActivity, this.attackEndActivity)
    }
}
class WeaponMeleePokeLight extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosPoke",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(.8,-.2,-.6),
                    rotOffset: new Vector3(-1.7,0,1.2),
                    posFovMultiplierX: -.3,
                    posFovMultiplierY: .5,
                    valuesSmoothing: .2,
                    pitchHeightMultiplier: .1,
                    minFov: 60,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,0,-.5),
                    rotOffset: new Vector3(-1.9,0,.2),
                    posFovMultiplierX: .4,
                    posFovMultiplierY: .5,
                    valuesSmoothing: .2,
                    minFov: 60,
                    maxFov: 90
                }
            }
        }),
        this.hitSfxName = "weapon/melee/pokeHit",
        this.lastActionDownTime = 0,
        this.stamina = 1,
        this.isAttacking = !1,
        this.attackEndActiveCountSinceStaminaReset = 0,
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.attackStartPos = new Vector3,
        this.attackEndPos = new Vector3,
        this.attackStartConfig = {
            posOffset: this.attackStartPos,
            rotOffset: new Vector3(-1.9,0,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .1,
            minFov: 60,
            maxFov: 90
        },
        this.attackEndConfig = {
            posOffset: this.attackEndPos,
            rotOffset: new Vector3(-1.6,0,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .8,
            minFov: 60,
            maxFov: 90
        },
        this.attackStartActivity = new ActivityWeight,
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t ? (this.playSfx("weapon/melee/pokeSwing", {
                minPitch: 1.2,
                maxPitch: 1.3,
                volume: .03
            }),
            this.longAttackHelper.startAttacking(),
            this.attackEndActiveCountSinceStaminaReset++) : (this.attackStartPos.set(randRange(-.1, .1), 0, randRange(.1, .3)),
            this.attackEndPos.set(randRange(-.2, .1), -.1, randRange(-1.1, -.9)),
            this.longAttackHelper.stopAttacking())
        }
        ))
    }
    getDamageMultiplier() {
        return .4
    }
    getAdditionalWalkAcceleration() {
        let t = 0;
        return this.isAttacking && this.attackEndActiveCountSinceStaminaReset < 3 && (t = this.attackEndActivity.active ? 3.5 : -1.5,
        2 == this.attackEndActiveCountSinceStaminaReset && (t *= .5)),
        new Vector2(0,-t)
    }
    getAdditionalWalkAccelerationClampLength() {
        return 3.5
    }
    getWalkSpeedMultiplier() {
        return this.actionIsDown ? lerp(.5, 1, this.stamina) : 1
    }
    getLookInputMultiplier() {
        return this.isAttacking ? .8 : 1
    }
    getRangeMultiplier() {
        return 1.3
    }
    getToggleCooldownValue() {
        return 200
    }
    loop(t, e) {
        super.loop(t, e);
        let i = null
          , s = !1
          , n = !1;
        if (this.actionIsDown && (this.isAttacking = !0),
        this.isAttacking) {
            const a = (t - this.lastActionDownTime) * lerp(.8, 1.4, this.getAttackSpeedStat())
              , o = mod(a, 350);
            o < 100 && !this.actionIsDown && !this.attackEndActivity.active ? this.isAttacking = !1 : o < 100 ? (i = {
                ...this.attackEndConfig
            },
            s = !0,
            n = !0) : (i = {
                ...this.attackStartConfig
            },
            s = !0),
            this.stamina -= 5e-4 * e
        } else
            this.stamina += 5e-4 * e;
        this.stamina = clamp01(this.stamina),
        this.stamina >= 1 && (this.attackEndActiveCountSinceStaminaReset = 0),
        this.holdingHandlerManager.loop(this.isAttacking, this.player, {
            forceConfig: i
        }),
        this.attackStartActivity.loop(s, e),
        this.attackEndActivity.loop(n, e),
        this.longAttackHelper.loop()
    }
    onActionDown() {
        this.isAttacking || (this.lastActionDownTime = getMainInstance().now)
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("pokeLight", this.attackStartActivity, this.attackEndActivity)
    }
}
class WeaponMeleePokeHeavy extends WeaponMelee {
    constructor(...t) {
        super(...t, {
            thirdPersonParentName: "meleeHoldingPos",
            secondaryThirdPersonParentName: "meleeSecondaryPosPoke",
            holdingHandlerManagerOptions: {
                downConfig: {
                    posOffset: new Vector3(1.3,.1,-.2),
                    rotOffset: new Vector3(-1.9,0,1.2),
                    posFovMultiplierX: -.3,
                    posFovMultiplierY: .5,
                    valuesSmoothing: .2,
                    pitchHeightMultiplier: .1,
                    minFov: 60,
                    maxFov: 90
                },
                upConfig: {
                    posOffset: new Vector3(0,0,-.5),
                    rotOffset: new Vector3(-1.9,0,.2),
                    posFovMultiplierX: .4,
                    posFovMultiplierY: .5,
                    valuesSmoothing: .2,
                    minFov: 60,
                    maxFov: 90
                }
            }
        }),
        this.hitSfxName = "weapon/melee/pokeHit",
        this.chargeDuration = 0,
        this.lastChargeDuration = 0,
        this.lastActionUpTime = 0,
        this.longAttackHelper = new LongMeleeAttackHelper(this),
        this.attackStartActivity = new ActivityWeight,
        this.attackEndActivity = new ActivityWeight,
        this.attackEndActivity.onActiveChange((t=>{
            t ? (this.playSfx("weapon/melee/pokeSwing", {
                minPitch: .9,
                maxPitch: 1.1
            }),
            this.longAttackHelper.startAttacking()) : (this.didHitCurrentAttack = !1,
            this.longAttackHelper.stopAttacking())
        }
        )),
        this.didHitCurrentAttack = !1,
        this.attackStartConfig = {
            posOffset: new Vector3(0,0,.2),
            rotOffset: new Vector3(-1.9,0,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .1,
            minFov: 60,
            maxFov: 90
        },
        this.attackEndConfig = {
            posOffset: new Vector3(-.1,.2,-1),
            rotOffset: new Vector3(-1.6,0,0),
            posFovMultiplierX: .4,
            posFovMultiplierY: .5,
            valuesSmoothing: .6,
            minFov: 60,
            maxFov: 90,
            walkBobMultiplier: .5
        }
    }
    getDamageMultiplier() {
        return .5
    }
    getWalkSpeedMultiplier() {
        return this.attackStartActivity.active ? .4 : 1
    }
    getJumpForceMultiplier() {
        return this.attackStartActivity.active || this.attackEndActivity.active ? .7 : 1
    }
    getCooldownDuration() {
        return lerp(700, 400, this.getAttackSpeedStat())
    }
    getAdditionalWalkAcceleration() {
        let t = 0;
        getMainInstance().now - this.lastActionUpTime < 200 && (t = 3);
        return t *= mapValue(100, this.getCooldownDuration(), 0, 1, this.lastChargeDuration, !0),
        new Vector2(0,-t)
    }
    getAdditionalWalkAccelerationClampLength() {
        return 3
    }
    getLookInputMultiplier() {
        return mapValue(200, 500, 0, 1, getMainInstance().now - this.lastActionUpTime, !0)
    }
    getAttackCooldownActive() {
        return getMainInstance().now - this.lastActionUpTime < this.getCooldownDuration()
    }
    onActionUp() {
        this.getAttackCooldownActive() || (this.lastActionUpTime = getMainInstance().now,
        this.lastChargeDuration = this.chargeDuration,
        this.chargeDuration = 0)
    }
    getRequiredVerticalAngleMultiplier() {
        return .4
    }
    getRequiredHorizontalAngleMultiplier() {
        return .4
    }
    getIsCharging() {
        return this.actionIsDown && !this.getAttackCooldownActive()
    }
    loop(t, e) {
        super.loop(t, e);
        let i = null
          , s = !1
          , n = !1;
        if (this.getIsCharging())
            this.chargeDuration += e,
            i = this.attackStartConfig,
            s = !0;
        else {
            const e = lerp(400, 200, this.getAttackSpeedStat());
            t - this.lastActionUpTime < e && (i = this.attackEndConfig,
            n = !0)
        }
        this.holdingHandlerManager.loop(this.actionIsDown, this.player, {
            forceConfig: i
        }),
        this.attackStartActivity.loop(s, e),
        this.attackEndActivity.loop(n, e),
        this.longAttackHelper.loop()
    }
    onActionDown() {
        this.lastActionDownTime = getMainInstance().now
    }
    getThirdPersonSkeletonLayers() {
        return makeMeleeSkeletonWeights("pokeHeavy", this.attackStartActivity, this.attackEndActivity)
    }
}
function getConstructor(t) {
    return t
}
const bowWeaponTypes = {
    smallBow: getConstructor(WeaponSmallBow),
    mediumBow: getConstructor(WeaponMediumBow),
    largeBow: getConstructor(WeaponLargeBow),
    smallCrossbow: getConstructor(WeaponSmallCrossBow),
    repeatingCrossbow: getConstructor(WeaponRepeatingCrossbow),
    largeCrossbow: getConstructor(WeaponLargeCrossbow)
}
  , meleeWeaponTypes = {
    bladedLight: getConstructor(WeaponMeleeBladedLight),
    bladedHeavy: getConstructor(WeaponMeleeBladedHeavy),
    bluntLight: getConstructor(WeaponMeleeBluntLight),
    bluntHeavy: getConstructor(WeaponMeleeBluntHeavy),
    pokeLight: getConstructor(WeaponMeleePokeLight),
    pokeHeavy: getConstructor(WeaponMeleePokeHeavy)
};
class WeaponSelectionItemUi {
    constructor({classId: t, keyNumber: e}) {
        this.keyNumber = e,
        this.el = document.createElement("div"),
        this.el.classList.add("weaponSelectionItem"),
        this.classSelectionImage = new ClassSelectionImage(t,{
            extraClasses: ["in-game"]
        }),
        this.el.appendChild(this.classSelectionImage.el),
        this.el.addEventListener("click", (()=>{
            for (const t of this.onClickCbs)
                t()
        }
        )),
        this._selected = !1,
        this.keyEl = document.createElement("div"),
        this.keyEl.classList.add("weaponSelectionItemKeyNumber", "blueNight"),
        this.keyEl.textContent = String(e),
        this.el.appendChild(this.keyEl),
        this.onClickCbs = new Set
    }
    get selected() {
        return this._selected
    }
    set selected(t) {
        this._selected = t,
        this.el.classList.toggle("selected", t)
    }
    set needsAvatarUpdates(t) {
        this.classSelectionImage.needsUpdates = t
    }
    onClick(t) {
        this.onClickCbs.add(t)
    }
    setCssColor(t, e) {
        this.classSelectionImage.setCssColor(t, e)
    }
}
let currentSelectedWeaponIndex = 1;
function getSelectedWeaponIndex() {
    return currentSelectedWeaponIndex
}
const onSelectionChangeCbs = new Set;
function onWeaponSelectionChange(t) {
    onSelectionChangeCbs.add(t)
}
function removeOnWeaponSelectionChange(t) {
    onSelectionChangeCbs.delete(t)
}
function fireSelectionChangeCbs() {
    onSelectionChangeCbs.forEach((t=>t(currentSelectedWeaponIndex)))
}
let loadSelectedWeaponIndexCalled = !1;
async function loadSelectedWeaponIndex() {
    if (loadSelectedWeaponIndexCalled)
        return;
    loadSelectedWeaponIndexCalled = !0;
    let t = await getMainInstance().indexedDb.get("selectedWeaponId");
    t = sanitizeSelectedWeaponId(t),
    isNaN(t) || t == currentSelectedWeaponIndex || (currentSelectedWeaponIndex = t,
    fireSelectionChangeCbs())
}
function sanitizeSelectedWeaponId(t) {
    let e = Number(t);
    return isNaN(e) && (e = 1),
    e = mod(e, classConfigs.length),
    e
}
class WeaponSelectionDialogUi extends DialogUi {
    constructor() {
        super({
            allowCurtainClose: !1,
            needsCurtain: !1,
            needsUnlockedPointer: !1,
            startVisible: !1,
            extraClasses: ["weaponSelectionDialog"]
        }),
        this.selectionItemsContainer = document.createElement("div"),
        this.selectionItemsContainer.classList.add("weaponSelectionContainer"),
        this.el.appendChild(this.selectionItemsContainer),
        this.weaponSelectionItems = [];
        for (const [t,e] of classConfigs.entries()) {
            const i = e.id
              , s = new WeaponSelectionItemUi({
                classId: i,
                keyNumber: t + 1
            });
            s.onClick((()=>{
                this.selectWeapon(t)
            }
            )),
            this.weaponSelectionItems.push(s),
            this.selectionItemsContainer.appendChild(s.el)
        }
        this.updateSelectedUi(),
        this.boundPrevPress = ()=>this.deltaSelectWeapon(-1),
        this.boundNextPress = ()=>this.deltaSelectWeapon(1),
        this.prevKey = getMainInstance().input.getKey("prevWeapon"),
        this.prevKey.onPressedDown(this.boundPrevPress),
        this.nextKey = getMainInstance().input.getKey("nextWeapon"),
        this.nextKey.onPressedDown(this.boundNextPress),
        this.boundKeyDown = this.onKeyDown.bind(this),
        window.addEventListener("keydown", this.boundKeyDown),
        this.addOnVisibilityChangeCb((()=>{
            this.updateNeedsAvatarUpdates()
        }
        )),
        this.addOnInertChangeCb((()=>{
            this.updateNeedsAvatarUpdates()
        }
        )),
        this.boundUpdateSelectedUi = ()=>{
            this.updateSelectedUi()
        }
        ,
        onWeaponSelectionChange(this.boundUpdateSelectedUi),
        loadSelectedWeaponIndex(),
        getMainInstance()
    }
    destructor() {
        super.destructor(),
        this.prevKey.removeCb(this.boundPrevPress),
        this.nextKey.removeCb(this.boundNextPress),
        window.removeEventListener("keydown", this.boundKeyDown),
        removeOnWeaponSelectionChange(this.boundUpdateSelectedUi),
        getMainInstance()
    }
    updateSelectedUi() {
        for (const [t,e] of this.weaponSelectionItems.entries())
            e.selected = t == currentSelectedWeaponIndex
    }
    updateNeedsAvatarUpdates() {
        const t = this.visible && !this.inert;
        for (const e of this.weaponSelectionItems)
            e.needsAvatarUpdates = t
    }
    setCssColor(t, e) {
        for (const i of this.weaponSelectionItems)
            i.setCssColor(t, e)
    }
    onKeyDown(t) {
        for (const [e,i] of this.weaponSelectionItems.entries())
            t.code == "Digit" + i.keyNumber && this.selectWeapon(e)
    }
    selectWeapon(t) {
        return !!this.visible && (currentSelectedWeaponIndex = sanitizeSelectedWeaponId(t),
        getMainInstance().indexedDb.set("selectedWeaponId", currentSelectedWeaponIndex),
        fireSelectionChangeCbs(),
        !0)
    }
    deltaSelectWeapon(t) {
        return this.selectWeapon(currentSelectedWeaponIndex + t)
    }
}
const REQUIRED_MS_FOR_IN_AIR = 200
  , TOGGLE_ACTIVE_WEAPON_ANIMATION_DURATION = 150
  , SPHERE_DEATH_FADE_DURATION = 5e3;
class Player {
    constructor(t, e, i, s, n, a, o, {teamId: r=0, needsPlayerModel: l=!0, needsSkeleton: h=!0}={}) {
        this.game = t,
        this.inputManager = e,
        this.sfxManager = i,
        this.physicsManager = s,
        this.settingsManager = n,
        this.hudIconsManager = a,
        this.id = o,
        this.hasOwnership = !1,
        this.creationTime = performance.now(),
        this.teamId = r,
        this.equippedSkinData = {},
        this.isSameSquadPlayer = !1,
        this.isSquadLeader = !1,
        this.squadPlayerId = 0,
        this.gender = "male",
        this.walkSpeed = 60,
        this.recentStunEvents = new Set,
        this.airWalkSpeedMultiplier = .4,
        this.flagWalkSpeed = 45,
        this.jumpForce = 8.6,
        this.ladderClimbSpeed = 1,
        this.ladderTangentWalkSpeed = .5,
        this.health = 1,
        this.lastHitTime = 0,
        this.damageReceivedHistory = [],
        this.currentHealthRegenSfx = null,
        this.playerName = "",
        this.playerNameVerified = !1,
        this.scoreFlags = 0,
        this.scoreKills = 0,
        this.scoreDeaths = 0,
        this.scoreTotal = 0,
        this.scoreSkillLevel = 0,
        this.elo = 0,
        this.serverPos = new Vector3,
        this.hasValidPosition = !1,
        this.recentForcedServerPositions = new Set,
        this.lastReceivedServerPosTime = 0,
        this.maxPredictedServerPosDistance = 3,
        this.predictedServerPos = new Vector3,
        this.lastPredictedServerVelocity = new Vector3,
        this.predictedServerVelocity = new Vector3,
        this.predictedServerAcceleration = new Vector3,
        this.serverPosSmooth = new Vector3,
        this.velocity = new Vector3,
        this.networkPosIsMovingUp = !1,
        this.antiFlyAccumulator = 0,
        this.antiFlyInAirTimeRaw = 0,
        this.antiFlyInAirTimeAccumulator = 0,
        this.lastAntiFlyRaycastTime = 0,
        this.lastAntiFlyRaycastDist = 0,
        this.lastReceivedActionTime = 0,
        this.pos = new Vector3,
        this.negativeHealthStartTime = 0,
        this.prevHealthIsNegative = !1,
        this.negativeHealthCounter = 0,
        this.cachedCamPos = new Vector3,
        this.cachedCamPosDirty = !0,
        this.cachedCamRot = new Quaternion,
        this.cachedCamRotDirty = !0,
        this.lookRot = new Vector2,
        this.deadLookRot = new Vector2,
        this.frontThirdPersonLookRot = new Vector2,
        this.smoothLookRotTarget = new Vector2,
        this.noSentDataChangeUpdateCount = 0,
        this.lastSentPos = new Vector3,
        this.lastSentRot = new Vector2,
        this.lastPosSentTime = 0,
        this.prevPos = new Vector3,
        this.smoothMovementSpeed = 0,
        this.ping = 0,
        this.positionHistory = [],
        this.rigidBody = new PlayerRigidBody(this.game.physics,this),
        this.physicsManager.registerRigidBody(this.rigidBody),
        this.boundOnJumpPress = this.onJumpPress.bind(this),
        this.boundOnFireDown = this.onFireDown.bind(this),
        this.boundOnFireUp = this.onFireUp.bind(this),
        this.boundToggleActiveWeapon = this.toggleActiveWeapon.bind(this),
        this.boundOnThirdPersonChange = this.onThirdPersonChange.bind(this),
        this.boundUpdateToggleWeaponTouchButtonVisibility = this.updateToggleWeaponTouchButtonVisibility.bind(this),
        this.boundUpdateSmoothCam = this.updateSmoothCam.bind(this),
        this.lastAirJumpPressTime = -1,
        this.prevWasOnFloor = !1,
        this.hasTouchedFloorEver = !1,
        this.lastJumpTime = 0,
        this.lastJumpLandTime = 0,
        this.lastJumpLandAmount = 0,
        this.highestInAirPoint = 0,
        this.currentFallingSfx = null,
        this.hasKeyEvents = !1,
        this.useFirstPersonHoldingHandlers = !1,
        this.noclip = !1,
        this.noclipSpeed = 0,
        this.movementAccuracyOffset = null,
        this.holdingFlag = null,
        this.sentChangeFlagMessages = [],
        this.statClassValues = null,
        this.holdingHandlers = new Set,
        this.needsPlayerModel = l,
        this.loadingModel = null,
        this.activeModel = null,
        this.skeleton = null,
        h && (this.skeleton = new PlayerSkeleton({
            player: this
        })),
        this.mostRecentWeaponSkeletonLayers = [],
        this.weaponActionIsDown = !1,
        this.bowWeapon = null,
        this.meleeWeapon = null,
        this.meleeWeaponId = null,
        this.hasActiveMeleeWeapon = !1,
        this.lastActiveWeaponToggleTime = 0,
        this.didUpdateActiveWeaponAfterToggle = !1,
        this.recentlyDestroyedWeapons = new Map,
        this.lastSentArrowId = 0,
        this.weaponAccuracyOffset = null,
        this.lastWeaponLayersKey = "",
        this.weaponLayers = [],
        this.recentInvalidArrowTimes = [],
        this.dead = !1,
        this.currentSpawnId = 0,
        this.dieTime = 0,
        this.deadAnimationWeight = 0,
        this.deadFallForward = !1,
        this.deadFromFall = !1,
        this.sphereDeathTimer = 0,
        this.sphereDeathScreenFlash = null,
        this.didInitRespawn = !1,
        this.hasWalkedAwayFromSpawn = !1,
        this.lastRespawnPosition = new Vector3,
        this.onWeaponSelectionChangeFromDialog = ()=>{
            this.updateMySelectedWeapon(),
            !this.dead && this.hasOwnership && this.sendMyEquippedSkinData()
        }
        ,
        this.onSkinConfigChange = ()=>{
            this.hasOwnership && this.sendMyEquippedSkinData()
        }
        ,
        getMainInstance().skins.onSkinConfigChange(this.onSkinConfigChange),
        this.smoothCamSetting = !1,
        this.smoothCamDebug = !1,
        this.smoothCam = !1,
        this.nextHitFlashIndex = 0,
        this.obj = null,
        this.legsMoveT = 0,
        this.legsMoveAmount = 0,
        this.walkHeadBobAmount = 0,
        this.legsMoveSpeed = 2,
        this.lastSfxStep = 0,
        this.updateUseFirstPersonHoldingHandlers(),
        this.icon = this.hudIconsManager.createIcon({
            url: "static/img/hudIcons/playerIcon.svg",
            size: .03
        }),
        this.destructed = !1
    }
    init() {
        this.skeleton && (this.skeleton.init(),
        this.skeleton.addPoseLayer("baseRig"),
        this.equippingWeaponLayer = this.skeleton.addPoseLayer("equippingWeapon"),
        this.deadForwardLayer = this.skeleton.addPoseLayer("deadForward"),
        this.deadBackwardLayer = this.skeleton.addPoseLayer("deadBackward"),
        this.waitForSkeletonLoad()),
        this.resetDeadPoseWeights(),
        this.setPlayerEquippedSkinData(this.equippedSkinData),
        this.updateIconVisibility()
    }
    async waitForSkeletonLoad() {
        if (!this.skeleton)
            throw new Error("Player was created without a skeleton");
        await this.skeleton.waitForLoad(),
        this.destructed || this.updateModelVisibility()
    }
    destructor() {
        if (this.destructed)
            return;
        this.destructed = !0;
        const t = getMainInstance();
        this.obj && t.scene.remove(this.obj),
        this.activeModel && this.activeModel.destructor(),
        this.loadingModel && this.loadingModel.destructor(),
        this.physicsManager.removeRigidBody(this.rigidBody),
        t.skins.removeOnSkinConfigChange(this.onSkinConfigChange),
        t.hudIcons.removeIcon(this.icon),
        this.setHasKeyEvents(!1),
        this.stopFallSound(),
        this.stopHealthRegenSound(),
        this.removeActiveBowWeapon(),
        this.removeActiveMeleeWeapon()
    }
    get sameSquadOrOwned() {
        return this.isSameSquadPlayer || this.hasOwnership
    }
    removeActiveBowWeapon() {
        this.bowWeapon && (this.recentlyDestroyedWeapons.set(this.bowWeapon.bowWeaponId, performance.now()),
        this.bowWeapon.destructor()),
        this.bowWeapon = null
    }
    removeActiveMeleeWeapon() {
        this.meleeWeapon && this.meleeWeapon.destructor(),
        this.meleeWeapon = null,
        this.updateToggleWeaponTouchButtonVisibility(),
        this.hasActiveMeleeWeapon && this.toggleActiveWeapon()
    }
    setActiveBowWeapon(t, e=!1) {
        if (this.bowWeapon && t == this.bowWeapon.bowWeaponId && !e)
            return;
        if (this.removeActiveBowWeapon(),
        t < 0 || t >= classConfigs.length)
            return;
        getMainInstance().renderer.renderWorthyEventHappened();
        const i = classConfigs[t]
          , s = new (0,
        bowWeaponTypes[i.bowId])(this,t);
        this.bowWeapon = s,
        this.updateActiveWeapon(),
        this.hasOwnership && getMainInstance().network.sendChangeSelectedClass(this.id, t)
    }
    updateActiveMeleeWeapon() {
        const t = getMainInstance().skins.skinNetworkDataToMeleeSkinConfig(this.equippedSkinData);
        t ? (this.setActiveMeleeWeapon(t.meleeId),
        this.meleeWeapon && this.meleeWeapon.updateMeleeAsset(t.skin)) : this.setActiveMeleeWeapon(null)
    }
    setActiveMeleeWeapon(t) {
        if (t != this.meleeWeaponId) {
            if (this.removeActiveMeleeWeapon(),
            this.meleeWeaponId = t,
            t) {
                const e = meleeWeaponTypes[t];
                if (e) {
                    const t = new e(this);
                    this.meleeWeapon = t,
                    this.updateToggleWeaponTouchButtonVisibility()
                }
            }
            getMainInstance().renderer.renderWorthyEventHappened(),
            this.updateActiveWeapon()
        }
    }
    updateToggleWeaponTouchButtonVisibility() {
        if (!this.hasOwnership)
            return;
        const t = Boolean(this.meleeWeapon)
          , e = getMainInstance().input.touch;
        e.toggleWeaponButton && e.toggleWeaponButton.setVisibility(t)
    }
    get currentToggleWeaponCooldown() {
        let t = 0
          , e = 0;
        return this.bowWeapon && (t = this.bowWeapon.getToggleCooldownValue()),
        this.meleeWeapon && (e = this.meleeWeapon.getToggleCooldownValue()),
        Math.max(t, e)
    }
    get activeWeaponToggleCooldownActive() {
        return getMainInstance().now - this.lastActiveWeaponToggleTime < this.currentToggleWeaponCooldown
    }
    get activeWeapon() {
        return this.activeWeaponToggleCooldownActive ? null : this.hasActiveMeleeWeapon ? this.meleeWeapon : this.bowWeapon
    }
    updateMySelectedWeapon(t=!1) {
        this.hasOwnership && this.setActiveBowWeapon(getSelectedWeaponIndex(), t)
    }
    sendMyEquippedSkinData() {
        const t = getMainInstance()
          , e = classConfigs[getSelectedWeaponIndex()]
          , i = t.skins.getClassSkinDataWithAppliedPreset(e.id);
        t.network.sendMySkinData(i)
    }
    getSendArrowId() {
        return this.lastSentArrowId++,
        this.lastSentArrowId >= 65536 && (this.lastSentArrowId = 0),
        this.lastSentArrowId
    }
    getClonedArrowObject(t) {
        return this.bowWeapon ? this.bowWeapon.getClonedArrowObject(t) : null
    }
    loop(t, e) {
        const i = this.prevPos.clone().sub(this.pos);
        this.prevPos = this.pos.clone();
        const s = getMainInstance();
        this.velocity = i.clone().multiplyScalar(1e3 / -e);
        const n = this.game instanceof Game ? this.game : null;
        if (this.didUpdateActiveWeaponAfterToggle || this.activeWeaponToggleCooldownActive || (this.didUpdateActiveWeaponAfterToggle = !0,
        this.updateActiveWeapon()),
        this.bowWeapon && (this.bowWeapon.loop(t, e),
        this.weaponAccuracyOffset && (this.weaponAccuracyOffset.offset = this.bowWeapon.getAccuracyOffset())),
        this.meleeWeapon && this.meleeWeapon.loop(t, e),
        this.hasOwnership) {
            if (!this.deadFromFall) {
                let t = this.lookRot
                  , e = .5 * Math.PI;
                "front" == s.cam.thirdPersonMode && (t = this.frontThirdPersonLookRot,
                e = 1);
                const i = this.inputManager.lookInput.clone();
                if (this.activeWeapon && i.multiplyScalar(this.activeWeapon.getLookInputMultiplier()),
                this.smoothCam)
                    (n && n.gameEndStepsReachedStatScreens || s.dialogManager.needsUnlockedPointer) && i.multiplyScalar(.1),
                    i.length() > .1 && s.renderer.renderWorthyEventHappened(1e4),
                    this.smoothLookRotTarget.addScaledVector(i, -.002),
                    t.lerp(this.smoothLookRotTarget, .1);
                else {
                    i.length() > .1 && s.renderer.renderWorthyEventHappened();
                    const e = s.cam.fovOffset
                      , n = mapValue(0, 180, 1, .1, e, !0);
                    t.addScaledVector(i, -.002 * n)
                }
                t.y = clamp(t.y, .5 * -Math.PI, e),
                this.cachedCamRotDirty = !0
            }
            let a = new Vector2;
            s.mainMenu.visible || s.dialogManager.needsUnlockedPointer || (a = this.inputManager.walkInput),
            a.length() > .01 && (s.renderer.renderWorthyEventHappened(),
            s.gameManager.joinIfNotJoined());
            const o = new Vector3(a.x,0,a.y);
            if (o.applyQuaternion(this.getClampedCamRot()),
            o.clampLength(0, 1),
            this.activeWeapon) {
                const t = this.activeWeapon.getAdditionalWalkAcceleration();
                if (t) {
                    const e = new Vector3(t.x,0,t.y);
                    e.applyQuaternion(this.getCamRot()),
                    o.add(e),
                    o.clampLength(0, this.activeWeapon.getAdditionalWalkAccelerationClampLength())
                }
            }
            const r = o.length();
            this.noclip || (o.y = 0),
            o.setLength(r);
            let l = this.holdingFlag ? this.flagWalkSpeed : this.walkSpeed;
            this.rigidBody.isOnUnwalkableCollider ? l = 0 : this.rigidBody.isOnSlipperyCollider ? l *= .15 : this.rigidBody.climbingLadder ? l *= this.ladderClimbSpeed : this.rigidBody.isOnFloor || (l *= this.airWalkSpeedMultiplier);
            const h = .8;
            l *= 1 / (this.rigidBody.slowDownColliderAmount * h + 1),
            l *= lerp(.9, 1.1, this.getStatClassValue("movementSpeed")),
            this.activeWeapon && (l *= this.activeWeapon.getWalkSpeedMultiplier());
            for (const e of this.recentStunEvents) {
                const i = t - e.time;
                if (i < e.stun.duration + e.stun.fadeDuration) {
                    const t = e.stun.duration
                      , s = t + e.stun.fadeDuration;
                    l *= 1 - mapValue(t, s, e.stun.amount, 0, i, !0)
                } else
                    this.recentStunEvents.delete(e)
            }
            if (this.rigidBody.climbingLadder && this.rigidBody.climbingLadderNormal) {
                const t = o.dot(this.rigidBody.climbingLadderNormal)
                  , e = s.now - this.lastJumpTime > 500 && !this.rigidBody.isOnFloor;
                let i = !0;
                if (t > 0 && !e && (i = !1),
                i) {
                    const t = new Quaternion;
                    t.setFromUnitVectors(new Vector3(0,1,0), this.rigidBody.climbingLadderNormal),
                    o.applyQuaternion(t)
                }
                const n = this.rigidBody.climbingLadderNormal.clone().cross(new Vector3(0,1,0));
                n.normalize();
                const a = o.dot(n)
                  , r = n.clone().multiplyScalar(a * (1 - this.ladderTangentWalkSpeed));
                o.sub(r)
            }
            if (this.noclip && (this.inputManager.getKey("flyUp").pressed && (o.y += 1,
            s.renderer.renderWorthyEventHappened()),
            this.inputManager.getKey("flyDown").pressed && (o.y -= 1,
            s.renderer.renderWorthyEventHappened())),
            o.multiplyScalar(l),
            this.noclip && this.noclipCamVelocity && this.noclipCamPos) {
                const t = e / 1e3;
                this.noclipCamVelocity.addScaledVector(o, t * 1.001 ** this.noclipSpeed),
                this.noclipCamVelocity.multiplyScalar(.1 ** t),
                this.noclipCamPos.addScaledVector(this.noclipCamVelocity, t)
            } else
                this.dead || this.rigidBody.applyForce(o);
            let d = 0
              , c = 0;
            const u = this.rigidBody.velocity
              , p = new Vector2(u.x,u.z);
            if (c = Math.max(0, u.y),
            d = p.length(),
            this.rigidBody.inAirTime < 200 && !this.rigidBody.climbingLadder && (this.legsMoveT += d * (e / 1e3) * this.physicsManager.timeScale),
            this.legsMoveAmount += .005 * e,
            this.legsMoveAmount = Math.min(this.legsMoveAmount, d),
            this.legsMoveAmount = clamp01(this.legsMoveAmount),
            this.walkHeadBobAmount += 3e-4 * e,
            this.walkHeadBobAmount = Math.min(this.walkHeadBobAmount, d),
            this.walkHeadBobAmount = clamp01(this.walkHeadBobAmount),
            this.movementAccuracyOffset && (this.movementAccuracyOffset.offset = 10 * c + 2 * d),
            !this.dead && n) {
                const t = 1.5;
                if (this.holdingFlag)
                    for (const e of n.getMyFlags(this.teamId)) {
                        e.defaultPosition.distanceTo(this.pos) < t && this.sendChangeFlag(this.holdingFlag.id, NetworkManager.FlagChangeOperation.CAPTURE)
                    }
                else
                    for (const e of n.getEnemyFlags(this.teamId)) {
                        if (e.currentHoldingPlayer)
                            continue;
                        e.position.distanceTo(this.pos) < t && this.sendChangeFlag(e.id, NetworkManager.FlagChangeOperation.GRAB)
                    }
                let i = 1 / 0
                  , s = null;
                for (const e of n.getMyFlags(this.teamId))
                    if (!e.isNearDefaultPos && !e.currentHoldingPlayer) {
                        const n = e.position.distanceTo(this.pos);
                        n < t && n < i && (i = n,
                        s = e)
                    }
                if (s) {
                    const t = n.gameTime / 1e3
                      , i = 1 / mapValue(5, 60, 300, 1e4, t / 60, !0);
                    s.addReturnProgress(e * i),
                    n.crosshair.setFlagReturnProgress(s.returnProgress),
                    s.returnProgress > 1 && this.sendChangeFlag(s.id, NetworkManager.FlagChangeOperation.RETURN)
                }
                n.crosshair.setFlagReturnProgressVisibility(null != s)
            }
            const g = i.length() * e;
            this.smoothMovementSpeed = lerp(this.smoothMovementSpeed, g, .1);
            const m = Math.round(e / s.smoothDt);
            for (let t = 0; t < m; t++)
                this.positionHistory.unshift(this.pos.clone());
            const f = Math.round(2e3 / s.smoothDt);
            this.positionHistory.length > f && this.positionHistory.splice(f);
            const w = s.mapLoader.mapVariablesManager.get("floorDeathHeight");
            "number" == typeof w && this.pos.y < w && this.dieFromFall();
            const b = s.mapLoader.mapVariablesManager.get("sphereDeathRadius");
            if ("number" == typeof b && b > 0 && this.pos.length() > b ? (this.sphereDeathTimer += e,
            this.sphereDeathScreenFlash || (this.sphereDeathScreenFlash = getMainInstance().screenFlash.flash({
                color: new Vector3(1,.9,.6),
                autoFade: !1,
                hasDirection: !1
            })),
            this.sphereDeathTimer > 5e3 && (this.die(),
            this.sphereDeathTimer = 0)) : this.sphereDeathTimer > 0 && (this.sphereDeathTimer -= e,
            this.sphereDeathTimer = Math.max(0, this.sphereDeathTimer),
            this.sphereDeathScreenFlash && this.sphereDeathTimer <= 0 && (this.sphereDeathScreenFlash.shouldBeDestroyed = !0,
            this.sphereDeathScreenFlash = null)),
            this.sphereDeathScreenFlash) {
                const t = this.sphereDeathTimer / 5e3;
                this.sphereDeathScreenFlash.opacity = mapValue(0, .5, 0, 2, t, !0),
                this.sphereDeathScreenFlash.baseOpacity = mapValue(.5, 1, 0, 1, t, !0)
            }
            for (const e of this.recentForcedServerPositions)
                (t > e.time + 1e4 || e.pos.distanceTo(this.pos) > 10) && this.recentForcedServerPositions.delete(e)
        } else {
            const i = s.now - this.lastReceivedServerPosTime
              , n = mapValue(0, 800, 1, 0, i, !0);
            this.predictedServerPos.addScaledVector(this.predictedServerVelocity, e * n);
            const a = this.predictedServerPos.clone().sub(this.serverPos);
            a.clampLength(0, this.maxPredictedServerPosDistance - .01),
            this.predictedServerPos.copy(this.serverPos).add(a),
            i < 100 && this.predictedServerVelocity.addScaledVector(this.predictedServerAcceleration, e);
            const o = .02;
            this.predictedServerVelocity.multiplyScalar((1 - o) ** e);
            const r = this.serverPosSmooth.clone();
            this.serverPosSmooth.lerp(this.predictedServerPos, 1 - .8 ** (e / 16.66));
            const l = this.serverPosSmooth.clone().sub(r)
              , h = new Vector2(l.x,l.z).length();
            this.rigidBody.inAirTime < 200 && (this.legsMoveT += h),
            this.legsMoveAmount += .005 * e,
            this.legsMoveAmount = Math.min(this.legsMoveAmount, 1e3 * h / e),
            this.legsMoveAmount = clamp01(this.legsMoveAmount),
            this.pos.distanceTo(this.serverPos) > this.maxPredictedServerPosDistance ? (this.rigidBody.pos.copy(this.serverPos),
            this.serverPosSmooth.copy(this.serverPos),
            this.rigidBody.velocity.set(0, 0, 0)) : this.rigidBody.pos.copy(this.serverPosSmooth);
            const d = Math.max(this.lastReceivedServerPosTime, this.lastReceivedActionTime);
            if (this.rigidBody.inAirTime > 200 && !this.rigidBody.climbingLadder) {
                if (t - d < 200) {
                    const t = l.clone()
                      , i = t.angleTo(new Vector3(0,1,0));
                    t.multiplyScalar(mapValue(0, Math.PI, 1, 0, i, !0)),
                    this.antiFlyAccumulator += t.length(),
                    this.antiFlyInAirTimeRaw += e,
                    this.antiFlyInAirTimeAccumulator += e * mapValue(2, 10, 0, 10, this.lastAntiFlyRaycastDist, !0)
                }
            } else
                this.antiFlyAccumulator = 0,
                this.antiFlyInAirTimeRaw = 0,
                this.antiFlyInAirTimeAccumulator = 0;
            if (!this.dead && this.hasTouchedFloorEver) {
                const e = mapValue(17, 30, 0, 1, this.antiFlyAccumulator, !0);
                let i = 0;
                if (t - d < 200 && (i = mapValue(0, 1e4, 0, 1, this.antiFlyInAirTimeAccumulator, !0)),
                this.antiFlyInAirTimeRaw > 5e3) {
                    if (t > this.lastAntiFlyRaycastTime + 1e3) {
                        this.lastAntiFlyRaycastTime = t;
                        let e = 1 / 0;
                        const i = this.pos
                          , s = this.pos.clone();
                        s.y -= 10;
                        const n = this.physicsManager.getRayCastCache(i, s);
                        if (n) {
                            const t = this.physicsManager.rayCastMapColliders(n, (t=>!t.collider.ignoreArrows && !(t.collider.slowDownPlayerAmount > 0)));
                            t && t.dist < 5 && (e = t.dist)
                        }
                        this.lastAntiFlyRaycastDist = e
                    }
                } else
                    this.lastAntiFlyRaycastDist = 0;
                const s = Math.max(e, i);
                this.report(CheatKickReason.FLY, s)
            }
        }
        if (this.dead) {
            const e = .004 * (t - this.dieTime);
            this.deadAnimationWeight = 1 - Math.pow(2, -e),
            this.legsMoveAmount = Math.min(this.legsMoveAmount, 1 - this.deadAnimationWeight);
            const i = 1 + Math.pow(2, .05 * -this.rigidBody.onFloorTime)
              , s = Math.min(i, 2 * this.deadAnimationWeight);
            this.deadFallForward ? this.deadForwardLayer && (this.deadForwardLayer.weight = s) : this.deadBackwardLayer && (this.deadBackwardLayer.weight = s)
        }
        if (this.health < 1 && !this.dead) {
            const i = (t - this.lastHitTime) / 1e3
              , s = lerp(8, 0, this.getStatClassValue("healthRegenSpeed"))
              , n = clamp01((.3 * (i - s)) ** 5);
            this.hasOwnership && (n > .1 ? this.startHealthRegenSound() : this.stopHealthRegenSound()),
            this.health += 5e-4 * e * n,
            this.health = Math.min(1, this.health),
            this.hasOwnership && this.updateHealthUi()
        }
        const a = this.health < 0;
        if (a != this.prevHealthIsNegative && (this.prevHealthIsNegative = a,
        a && (this.negativeHealthStartTime = t)),
        a && !this.dead) {
            t - this.negativeHealthStartTime > 1e3 && (this.health = 1,
            this.hasOwnership && this.updateHealthUi(),
            this.negativeHealthCounter++,
            this.negativeHealthCounter >= 2 && (this.report(CheatKickReason.INVULNERABLE, 1),
            this.negativeHealthCounter = 0))
        }
        const o = Math.floor((this.legsMoveTForCos + Math.PI / 2) / Math.PI);
        if (o > this.lastSfxStep) {
            this.lastSfxStep = o;
            const t = o % 2 == 0 ? "L" : "R";
            let e = .9
              , i = 1.1;
            "female" == this.gender && (e = 1.4,
            i = 1.8),
            this.sfxManager.playSound("player/walk" + t, {
                pos: this.getSfxPos(),
                minPitch: e,
                maxPitch: i
            })
        }
        this.activeModel && this.activeModel.setHitFlashMaterialsTime(t),
        this.loadingModel && this.loadingModel.setHitFlashMaterialsTime(t)
    }
    get legsMoveTForCos() {
        return this.legsMoveT * this.legsMoveSpeed
    }
    afterPhysicsLoop(t, e) {
        if (this.prevWasOnFloor != this.rigidBody.isOnFloor) {
            if (this.prevWasOnFloor = this.rigidBody.isOnFloor,
            this.rigidBody.isOnFloor && this.rigidBody.prevInAirTime > 300) {
                t - this.lastAirJumpPressTime < 300 && this.lastAirJumpPressTime >= 0 && this.rigidBody.getAllowJump() && (this.lastAirJumpPressTime = -1,
                this.jump());
                const e = this.highestInAirPoint - this.pos.y;
                if (e > 0) {
                    const i = this.sfxManager.cachedSfx["player/land"]
                      , s = mapValue(.5, 20, 0, i.opts.volume || 0, e, !0);
                    s > 0 && (this.sfxManager.playSound("player/land", {
                        volume: s,
                        pos: this.getSfxPos(),
                        minPitch: "female" == this.gender ? 1.1 : .9,
                        maxPitch: "female" == this.gender ? 1.2 : 1
                    }),
                    this.lastJumpLandTime = t,
                    this.lastJumpLandAmount = s),
                    this.hasTouchedFloorEver = !0
                }
            }
            this.highestInAirPoint = this.pos.y
        }
        if (this.rigidBody.isOnFloor || (this.highestInAirPoint = Math.max(this.highestInAirPoint, this.pos.y)),
        this.hasOwnership && (this.rigidBody.inAirTime > 50 && this.rigidBody.velocity.y < -3 ? this.startFallSound() : this.stopFallSound(),
        !this.hasWalkedAwayFromSpawn && this.game.gameStarted)) {
            this.pos.distanceTo(this.lastRespawnPosition) > 5 && (this.hasWalkedAwayFromSpawn = !0,
            this.setWeaponSelectionDialogVisibility(!1),
            getMainInstance().adBanners.setPageVisibility("respawn", !1))
        }
        if (this.holdingFlag && this.holdingFlag.updateRenderPosition(),
        this.deadFromFall || this.pos.copy(this.rigidBody.pos),
        this.cachedCamPosDirty = !0,
        this.activeModel && this.activeModel.isInit && this.obj) {
            this.obj.position.copy(this.pos);
            let e = this.lookRot;
            if (this.dead && (e = this.deadLookRot),
            this.obj.rotation.y = e.x + Math.PI,
            this.obj.updateWorldMatrix(!1, !0),
            this.skeleton && this.skeleton.isInit) {
                this.activeWeapon && (this.mostRecentWeaponSkeletonLayers = this.activeWeapon.getThirdPersonSkeletonLayers());
                const e = this.mostRecentWeaponSkeletonLayers;
                let i = t - this.lastActiveWeaponToggleTime;
                i -= this.currentToggleWeaponCooldown,
                i /= 150,
                this.equippingWeaponLayer && (this.equippingWeaponLayer.weight = Math.max(0, 1 - Math.abs(i)));
                const s = e.map((t=>t.name.replaceAll(",", "\\,"))).join(",");
                if (s != this.lastWeaponLayersKey) {
                    const t = [...this.weaponLayers];
                    for (const e of t)
                        this.skeleton.removePoseLayer(e);
                    this.weaponLayers = [];
                    for (const [t,i] of e.entries())
                        this.weaponLayers[t] = this.skeleton.insertPoseLayer(t + 1, i.name);
                    this.lastWeaponLayersKey = s
                }
                for (const [t,i] of e.entries()) {
                    this.weaponLayers[t].weight = i.weight
                }
                this.skeleton.applyLayers();
                let n = {};
                this.activeWeapon && (n = this.activeWeapon.getThirdPersonSkeletonMultipliers(this.gender));
                let a = this.lookRot;
                this.dead && (a = this.deadLookRot.clone(),
                a.y = lerp(this.deadLookRot.y, 0, this.deadAnimationWeight)),
                this.skeleton.setLookRotY(-a.y, n),
                this.skeleton.legLObj && (this.skeleton.legLObj.rotation.x = .5 * Math.cos(this.legsMoveTForCos) * this.legsMoveAmount),
                this.skeleton.legRObj && (this.skeleton.legRObj.rotation.x = .5 * -Math.cos(this.legsMoveTForCos) * this.legsMoveAmount),
                this.skeleton.updateMatrices(),
                this.activeModel.applySkeleton(this.skeleton)
            }
        }
        const i = this.pos.clone();
        i.y += 2.2,
        this.icon.setPos(i);
        for (const i of this.holdingHandlers)
            i.loop(t, e);
        this.hasOwnership && t - this.lastPosSentTime > 50 && (this.pos.distanceTo(this.lastSentPos) < .01 && this.lookRot.distanceTo(this.lastSentRot) < .01 ? (this.noSentDataChangeUpdateCount++,
        this.noSentDataChangeUpdateCount < 3 && this.sendPlayerDataToServer()) : (this.noSentDataChangeUpdateCount = 0,
        this.sendPlayerDataToServer()))
    }
    createHoldingHandler(t) {
        const e = new PlayerHoldingHandler(this,t);
        return this.holdingHandlers.add(e),
        e
    }
    removeHoldingHandler(t) {
        this.holdingHandlers.delete(t)
    }
    getSfxPos() {
        return this.hasOwnership ? null : this.serverPos.clone()
    }
    async startFallSound() {
        if (this.currentFallingSfx)
            return;
        if (this.physicsManager.timeScale < .8)
            return;
        const t = await this.sfxManager.playSound("player/fall");
        this.currentFallingSfx ? t && t.stop() : this.currentFallingSfx = t
    }
    stopFallSound() {
        this.currentFallingSfx && (this.currentFallingSfx.stop(),
        this.currentFallingSfx = null)
    }
    async startHealthRegenSound() {
        if (this.currentHealthRegenSfx)
            return;
        const t = await this.sfxManager.playSound("feedback/healthRegen");
        this.currentHealthRegenSfx ? t && t.stop() : this.currentHealthRegenSfx = t
    }
    stopHealthRegenSound() {
        this.currentHealthRegenSfx && (this.currentHealthRegenSfx.stop(),
        this.currentHealthRegenSfx = null)
    }
    sendPlayerDataToServer() {
        getMainInstance().network.sendPlayerData(this.game, this.id, {
            posX: this.pos.x,
            posY: this.pos.y,
            posZ: this.pos.z,
            rotX: this.lookRot.x,
            rotY: this.lookRot.y
        }),
        this.lastPosSentTime = getMainInstance().now,
        this.lastSentPos.copy(this.pos),
        this.lastSentRot.copy(this.lookRot),
        this.holdingFlag && this.holdingFlag.sendFlagReturnProgressToServer(this.pos)
    }
    static get PlayerAction() {
        return {
            JUMP: 0,
            FIRE_DOWN: 1,
            FIRE_UP: 2,
            SPAWN: 3,
            DIE: 4
        }
    }
    sendPerformAction(t) {
        this.hasOwnership && getMainInstance().network.sendPlayerPerformAction(this.id, t)
    }
    receivedPerformAction(t) {
        this.hasOwnership || (this.lastReceivedActionTime = getMainInstance().now,
        t == Player.PlayerAction.JUMP ? this.onJumpPress() : t == Player.PlayerAction.FIRE_DOWN ? this.onFireDown() : t == Player.PlayerAction.FIRE_UP ? this.onFireUp() : t == Player.PlayerAction.DIE && this.die())
    }
    receiveChangeClassFromServer(t) {
        this.hasOwnership || this.setActiveBowWeapon(t)
    }
    setHasOwnership(t) {
        t != this.hasOwnership && (this.hasOwnership = t,
        t ? (this.didInitRespawn || (this.respawn(),
        this.didInitRespawn = !0),
        this.weaponAccuracyOffset = this.game.crosshair.createAccuracyOffset()) : this.weaponAccuracyOffset && (this.game.crosshair.deleteAccuracyOffset(this.weaponAccuracyOffset),
        this.weaponAccuracyOffset = null),
        this.setHasKeyEvents(t),
        this.setHasMovementAccuracyOffset(t),
        this.updateModelVisibility(),
        this.updateUseFirstPersonHoldingHandlers(),
        this.updateToggleWeaponTouchButtonVisibility())
    }
    setPlayerName(t) {
        this.playerName = t
    }
    setNamePlayerVerified() {
        this.playerNameVerified = !0
    }
    setTeamId(t) {
        if (this.teamId != t)
            if (this.teamId = t,
            this.updateMySelectedWeapon(!0),
            this.reloadPlayerModel(),
            this.hasOwnership) {
                if (!(this.game instanceof Game))
                    throw new Error("Setting team id is not supported for offline games");
                this.game.updateMyTeamColor(),
                this.game.updatePlayerIconVisibilities()
            } else
                this.updateIconVisibility()
    }
    setIsSameSquadPlayer(t, e, i) {
        this.isSameSquadPlayer = t,
        this.squadPlayerId = e,
        this.isSquadLeader = i
    }
    setScores({flags: t, kills: e, deaths: i, total: s, skillLevel: n, elo: a}) {
        this.scoreFlags = t,
        this.scoreKills = e,
        this.scoreDeaths = i,
        this.scoreTotal = s,
        this.scoreSkillLevel = n,
        this.elo = a
    }
    getMatchMakeSkillLevel() {
        let t = 0;
        return t += 10 * this.scoreKills,
        t += 30 * this.scoreFlags,
        t
    }
    setHasKeyEvents(t) {
        if (t == this.hasKeyEvents)
            return;
        const e = getMainInstance();
        this.hasKeyEvents = t;
        const i = this.inputManager.getKey("jump")
          , s = this.inputManager.getKey("fire")
          , n = this.inputManager.getKey("toggleWeapon");
        t ? (i.onPressedDown(this.boundOnJumpPress),
        s.onPressedDown(this.boundOnFireDown),
        s.onPressedUp(this.boundOnFireUp),
        n.onPressedDown(this.boundToggleActiveWeapon),
        e.dialogManager.onNeedsUnlockedPointerChange(this.boundUpdateSmoothCam),
        e.cam.onThirdPersonChange(this.boundOnThirdPersonChange),
        e.input.touch.onTouchSupportedChange(this.boundUpdateToggleWeaponTouchButtonVisibility),
        onWeaponSelectionChange(this.onWeaponSelectionChangeFromDialog),
        e.settingsManager.onValueChange("smoothCam", (t=>{
            this.smoothCamSetting = t,
            this.updateSmoothCam()
        }
        )),
        this.smoothCamSetting = e.settingsManager.getValue("smoothCam"),
        this.updateSmoothCam()) : (i.removeCb(this.boundOnJumpPress),
        s.removeCb(this.boundOnFireDown),
        s.removeCb(this.boundOnFireUp),
        e.dialogManager.removeOnNeedsUnlockedPointerChange(this.boundUpdateSmoothCam),
        e.cam.removeOnThirdPersonChange(this.boundOnThirdPersonChange),
        e.input.touch.removeOnTouchSupportedChange(this.boundUpdateToggleWeaponTouchButtonVisibility),
        removeOnWeaponSelectionChange(this.onWeaponSelectionChangeFromDialog))
    }
    updateSmoothCam() {
        const t = this.smoothCamSetting || this.smoothCamDebug || this.game instanceof Game && this.game.gameEndStepsReachedStatScreens || getMainInstance().dialogManager.needsUnlockedPointer;
        this.smoothCam != t && (this.smoothCam = t,
        this.smoothCam && this.resetSmoothLookRot())
    }
    resetSmoothLookRot() {
        this.smoothLookRotTarget.copy(this.lookRot)
    }
    setHasMovementAccuracyOffset(t) {
        t ? this.movementAccuracyOffset || (this.movementAccuracyOffset = this.game.crosshair.createAccuracyOffset()) : this.movementAccuracyOffset && (this.game.crosshair.deleteAccuracyOffset(this.movementAccuracyOffset),
        this.movementAccuracyOffset = null)
    }
    getStatClassValue(t) {
        const e = statClassConfigs.get(t);
        if (!e)
            throw new Error(`No stat class config for '${t}'`);
        if (!this.statClassValues || !this.statClassValues.has(t))
            return e.defaultValue;
        let i = this.statClassValues.get(t) || 0;
        return i += e.defaultValue,
        clamp01(iLerp(e.min, e.max, i))
    }
    reloadPlayerModel() {
        this.setPlayerEquippedSkinData(this.equippedSkinData)
    }
    setPlayerEquippedSkinData(t) {
        this.equippedSkinData = t,
        this.statClassValues = getMainInstance().skins.getStatClassValuesFromShopSkinIds(t.equippedSkinIds || []),
        this.bowWeapon && this.bowWeapon.playerSkinUpdated(),
        this.meleeWeapon && this.meleeWeapon.playerSkinUpdated(),
        this.updateActiveMeleeWeapon(),
        this.needsPlayerModel && (this.loadingModel && this.loadingModel.destructor(),
        this.loadingModel = null,
        this.loadingModel = new PlayerModel({
            skinObjectOpts: {
                teamId: this.teamId,
                skin: t
            }
        }),
        this.gender = t.gender || "male",
        this.skeleton && this.skeleton.setGender(this.gender),
        this.replaceLoadingModel())
    }
    async replaceLoadingModel() {
        if (!this.loadingModel)
            return;
        if (await this.loadingModel.waitForInit(),
        !this.loadingModel)
            return;
        if (!this.loadingModel.obj)
            return;
        this.activeModel && this.activeModel.destructor(),
        this.activeModel = this.loadingModel,
        this.loadingModel = null,
        this.obj && getMainInstance().scene.remove(this.obj);
        const t = this.activeModel.obj;
        this.obj = t,
        t && (t.name = "player",
        getMainInstance().scene.add(t));
        for (const t of this.holdingHandlers)
            t.playerObjectChanged();
        this.updateModelVisibility(),
        getMainInstance().renderer.renderWorthyEventHappened()
    }
    setWeaponSelectionDialogVisibility(t) {
        this.game instanceof Game && (this.game.weaponSelectionDialog.visible = t)
    }
    updateModelVisibility() {
        if (!this.obj)
            return;
        const t = getMainInstance();
        this.obj.visible = this.hasValidPosition && !!this.skeleton && this.skeleton.isInit && (!this.hasOwnership || t.cam.thirdPerson || this.noclip)
    }
    updateUseFirstPersonHoldingHandlers() {
        const t = getMainInstance()
          , e = this.hasOwnership && !t.cam.thirdPerson && !this.noclip;
        if (e != this.useFirstPersonHoldingHandlers) {
            this.useFirstPersonHoldingHandlers = e;
            for (const t of this.holdingHandlers)
                t.useFirstPersonUpdated()
        }
    }
    onJumpPress() {
        if (this.noclip)
            return;
        const t = getMainInstance();
        this.hasOwnership && (t.mainMenu.visible || t.dialogManager.needsUnlockedPointer) || (t.gameManager.joinIfNotJoined(),
        this.rigidBody.getAllowJump() ? this.jump() : this.lastAirJumpPressTime = t.now)
    }
    jump() {
        if (this.dead)
            return;
        let t = 1;
        this.activeWeapon && (t = this.activeWeapon.getJumpForceMultiplier());
        const e = this.jumpForce * t;
        e > 0 && (this.lastJumpTime = getMainInstance().now,
        this.sendPerformAction(Player.PlayerAction.JUMP),
        this.sfxManager.playSound(`player/jump/${this.gender}/${randInt(1, 4)}`, {
            pos: this.getSfxPos()
        }),
        this.rigidBody.jump(e))
    }
    onFireDown() {
        if (!this.dead) {
            if (this.hasOwnership) {
                if (getMainInstance().mainMenu.visible)
                    return;
                getMainInstance().gameManager.joinIfNotJoined()
            }
            this.weaponActionIsDown = !0,
            this.sendPerformAction(Player.PlayerAction.FIRE_DOWN),
            getMainInstance().renderer.renderWorthyEventHappened(),
            this.activeWeapon && this.activeWeapon.actionDown()
        }
    }
    onFireUp() {
        this.weaponActionIsDown = !1,
        this.dead || (this.sendPerformAction(Player.PlayerAction.FIRE_UP),
        getMainInstance().renderer.renderWorthyEventHappened(),
        this.activeWeapon && this.activeWeapon.actionUp())
    }
    startToggleActiveWeaponCooldown() {
        this.lastActiveWeaponToggleTime = getMainInstance().now,
        this.didUpdateActiveWeaponAfterToggle = !1
    }
    toggleActiveWeapon() {
        this.hasOwnership && (this.meleeWeapon || this.hasActiveMeleeWeapon) && (this.hasActiveMeleeWeapon = !this.hasActiveMeleeWeapon,
        this.startToggleActiveWeaponCooldown(),
        this.updateActiveWeapon(),
        getMainInstance().renderer.renderWorthyEventHappened(),
        this.hasOwnership && getMainInstance().network.sendChangeActiveWeaponType(this.id, this.hasActiveMeleeWeapon))
    }
    receiveChangeWeaponTypeFromServer(t) {
        this.hasOwnership || t == this.hasActiveMeleeWeapon || (this.hasActiveMeleeWeapon = t,
        this.startToggleActiveWeaponCooldown(),
        this.updateActiveWeapon(),
        getMainInstance().renderer.renderWorthyEventHappened())
    }
    updateActiveWeapon() {
        this.bowWeapon && this.bowWeapon.setIsPrimaryWeapon(!this.hasActiveMeleeWeapon && !this.activeWeaponToggleCooldownActive),
        this.meleeWeapon && this.meleeWeapon.setIsPrimaryWeapon(this.hasActiveMeleeWeapon && !this.activeWeaponToggleCooldownActive),
        this.activeWeapon && this.weaponActionIsDown && !this.activeWeapon.actionIsDown && this.activeWeapon.actionDown()
    }
    onThirdPersonChange() {
        "front" == getMainInstance().cam.thirdPersonMode && (this.frontThirdPersonLookRot.copy(this.lookRot),
        this.frontThirdPersonLookRot.x += Math.PI),
        this.updateModelVisibility(),
        this.updateUseFirstPersonHoldingHandlers()
    }
    addHitFlash(t) {
        const e = new Vector3;
        0 == t ? e.y = .2 : 1 == t ? e.y = .9 : 2 == t && (e.y = 1.9);
        const i = getMainInstance().now;
        this.activeModel && this.activeModel.setHitFlashMaterialsValue(this.nextHitFlashIndex, i, e),
        this.loadingModel && this.loadingModel.setHitFlashMaterialsValue(this.nextHitFlashIndex, i, e),
        this.nextHitFlashIndex++,
        this.nextHitFlashIndex >= 5 && (this.nextHitFlashIndex = 0)
    }
    addMeleeHitFlash() {
        this.addHitFlash(1)
    }
    playerClaimedHitByArrow(t, e, i) {
        const s = this.rigidBody.colliders[i];
        if (s) {
            const i = this.game.arrowManager.getArrowById(t.id, e);
            if (!i)
                return;
            let n = !0;
            (i.consumed || t.teamId == this.teamId) && (n = !1);
            const a = 3;
            let o = !1;
            if ([].push([s.center.clone(), s.center.clone().add(new Vector3(0,5,0)), 16777215]),
            n) {
                if (i.prevPos) {
                    let t = 1 / 0;
                    for (let e = 0; e < i.travelledPositions.length - 1; e++) {
                        const n = i.travelledPositions[e]
                          , a = i.travelledPositions[e + 1]
                          , o = new Line3(n,a)
                          , r = new Vector3;
                        o.closestPointToPoint(s.center, !0, r);
                        const l = r.distanceTo(s.center);
                        t = Math.min(t, l)
                    }
                    t < a && (o = !0)
                }
                if (o)
                    this.markValidArrowHit(t, i, s);
                else {
                    let e = !1
                      , n = i.travelledPositions[i.travelledPositions.length - 1];
                    i.onTravel((o=>{
                        if (e || i.consumed)
                            return;
                        const r = n;
                        if (n = o,
                        !r)
                            return;
                        const l = new Line3(r,o)
                          , h = new Vector3;
                        l.closestPointToPoint(s.center, !0, h);
                        h.distanceTo(s.center) < a && (e = !0,
                        this.markValidArrowHit(t, i, s))
                    }
                    )),
                    setTimeout((()=>{
                        if (!e) {
                            const e = performance.now();
                            this.recentInvalidArrowTimes.push(e),
                            this.recentInvalidArrowTimes = this.recentInvalidArrowTimes.filter((t=>e - t < 3e3)),
                            this.recentInvalidArrowTimes.length >= 3 && (t.report(CheatKickReason.INVALID_ARROW, 1),
                            this.recentInvalidArrowTimes = [])
                        }
                    }
                    ), 1e3)
                }
            } else
                t.report(CheatKickReason.INVALID_ARROW, 1)
        }
        this.hasOwnership || (t.hasOwnership || this.addHitFlash(i),
        this.sfxManager.playSound(`player/takeDamage/${this.gender}/${randInt(1, 4)}`, {
            pos: this.getSfxPos()
        }))
    }
    markValidArrowHit(t, e, i) {
        e.consume();
        let s = i.arrowDamage;
        e && (s *= e.damageMultiplier);
        let n = null;
        e && (n = e.lookDirection);
        if (this.applyDamage(s, n)) {
            const i = e.getStunData();
            this.applyStun(i),
            getMainInstance().network.sendValidArrowHit(t.id, e.arrowId, this.health)
        }
    }
    hitByMeleeFromServer(t) {
        if (!t.meleeWeapon)
            return;
        if (!t.meleeWeapon.validateHit(this))
            return;
        const e = this.pos.clone().sub(t.pos);
        let i = t.meleeWeapon.getDamageMultiplier();
        if (i *= lerp(.5, 1.5, t.getStatClassValue("meleeAttackStrength")),
        this.applyDamage(i, e),
        this.hasOwnership || t.hasOwnership || (this.addMeleeHitFlash(),
        t.meleeWeapon.playHitSfx()),
        this.hasOwnership) {
            const e = t.meleeWeapon.getStunData();
            e && this.applyStun(e)
        }
    }
    hitByArrowFromServer(t) {}
    verifiedKillByServer(t) {
        const e = this.getStatClassValue("bloodlust");
        e > 0 && (this.health += .1 * e,
        this.health = Math.min(1, this.health))
    }
    applyStun(t) {
        t.amount <= 0 || t.duration <= 0 && t.fadeDuration <= 0 || this.recentStunEvents.add({
            time: getMainInstance().now,
            stun: t
        })
    }
    applyDamage(t, e) {
        const i = performance.now();
        for (let t = this.damageReceivedHistory.length - 1; t >= 0; t--) {
            if (!(i - this.damageReceivedHistory[t].time > 1e3))
                break;
            this.damageReceivedHistory.splice(t, 1)
        }
        let s = 1.1 * t
          , n = t * lerp(1.1, .9, this.getStatClassValue("armorStrength"));
        s = this.computeDamageWithCooldown(s),
        n = this.computeDamageWithCooldown(n);
        const a = {
            damage: n,
            time: i,
            appliedDamage: 0
        };
        if (this.damageReceivedHistory.unshift(a),
        n > .001) {
            a.appliedDamage = n;
            const t = this.health - s;
            return this.game.gameStarted && (this.health -= n),
            this.setHealthFromHit(this.health, e, n, t),
            !0
        }
        return !1
    }
    computeDamageWithCooldown(t) {
        let e = 0;
        for (const t of this.damageReceivedHistory)
            e += t.damage;
        const i = t + e;
        return t -= i - Math.min(i, .9)
    }
    forceSetHealthFromServer(t) {
        if (t < this.health) {
            const e = this.health - t;
            this.setHealthFromHit(t, null, e)
        }
    }
    setHealthFromHit(t, e, i, s) {
        this.health = t,
        this.lastHitTime = getMainInstance().now,
        this.hasOwnership && (getMainInstance().screenFlash.flash({
            arrowHitNormalWorld: e,
            vignetteAmount: 1 - i
        }),
        this.sfxManager.playSound(`player/takeDamage/${this.gender}/${randInt(1, 4)}`),
        this.updateHealthUi(s),
        this.health < .05 && this.die())
    }
    getCamPos() {
        if (this.cachedCamPosDirty) {
            this.cachedCamPos.copy(this.pos),
            this.cachedCamPos.y += 1.6,
            this.noclip && this.noclipCamPos && this.cachedCamPos.add(this.noclipCamPos);
            const t = getMainInstance();
            if (this.hasOwnership && this.settingsManager.getValue("walkHeadBob") && !t.cam.thirdPerson) {
                const t = this.getCamRot()
                  , e = new Vector3(0,1,0);
                e.applyQuaternion(t),
                e.multiplyScalar(.1 * Math.sin(this.legsMoveTForCos - .9) * this.walkHeadBobAmount),
                this.cachedCamPos.add(e);
                const i = new Vector3(1,0,0);
                i.applyQuaternion(t),
                i.multiplyScalar(.05 * Math.cos(this.legsMoveTForCos / 2) * this.walkHeadBobAmount),
                this.cachedCamPos.add(i)
            }
            this.cachedCamPosDirty = !1
        }
        return this.cachedCamPos.clone()
    }
    getCamRot() {
        return this.cachedCamRotDirty && (this.cachedCamRot.copy(this.computeCamRot(this.lookRot)),
        this.cachedCamRotDirty = !1),
        this.cachedCamRot.clone()
    }
    getFrontThirdPersonCamRot() {
        return this.computeCamRot(this.frontThirdPersonLookRot)
    }
    computeCamRot(t) {
        const e = .01 * (this.lastJumpLandTime - getMainInstance().now);
        let i = 0;
        this.hasOwnership && this.settingsManager.getValue("landHeadBob") && this.lastJumpLandAmount > .005 && (i = mapValue(.012, .1, .1, .3, this.lastJumpLandAmount));
        const s = e / (.5 + e ** 2) * i
          , n = new Euler(t.y + s,t.x,0,"YXZ")
          , a = new Quaternion;
        return a.setFromEuler(n),
        a
    }
    getClampedCamRot() {
        let t;
        t = "front" == getMainInstance().cam.thirdPersonMode ? this.frontThirdPersonLookRot : this.lookRot;
        const e = clamp(t.y, -Math.PI / 2, Math.PI / 2)
          , i = new Euler(e,t.x,0,"YXZ")
          , s = new Quaternion;
        return s.setFromEuler(i),
        s
    }
    getShootDirection() {
        const t = getMainInstance();
        if ("back" == t.cam.thirdPersonMode) {
            const e = t.cam.getRayCastCache(t.now, 100);
            if (e) {
                const t = this.physicsManager.rayCastMapColliders(e, (()=>!0));
                if (t) {
                    const e = new Vector3(0,0,-1);
                    e.applyQuaternion(this.getCamRot());
                    const i = t.pos.sub(this.getCamPos())
                      , s = e.clone();
                    s.y = 0;
                    const n = i.clone();
                    n.y = 0;
                    let a = s.angleTo(n);
                    s.clone().cross(n).y < 0 && (a *= -1);
                    const o = new Quaternion;
                    return o.setFromAxisAngle(new Vector3(0,1,0), a),
                    e.applyQuaternion(o),
                    e
                }
            }
        }
        const e = new Vector3(0,0,-1);
        return e.applyQuaternion(this.getCamRot()),
        e
    }
    setServerData(t, e, i, s, n, a=!1) {
        const o = this.serverPos.clone();
        this.serverPos.set(t, e, i),
        this.hasValidPosition || (this.hasValidPosition = !0,
        this.hasOwnership || this.sfxManager.playSound("player/spawn", {
            pos: this.getSfxPos()
        }),
        this.updateModelVisibility()),
        this.predictedServerVelocity.copy(this.serverPos),
        this.predictedServerVelocity.sub(o);
        const r = getMainInstance().now - this.lastReceivedServerPosTime;
        if (this.lastReceivedServerPosTime = getMainInstance().now,
        r <= 0 || this.predictedServerVelocity.length() > 5 ? (this.predictedServerVelocity.set(0, 0, 0),
        this.predictedServerAcceleration.set(0, 0, 0)) : (this.predictedServerVelocity.divideScalar(r),
        this.predictedServerAcceleration.copy(this.predictedServerVelocity),
        this.predictedServerAcceleration.sub(this.lastPredictedServerVelocity),
        this.predictedServerAcceleration.divideScalar(r)),
        this.hasOwnership && a) {
            let t = !1;
            for (const e of this.recentForcedServerPositions)
                if (this.serverPos.distanceTo(e.pos) < .1) {
                    t = !0;
                    break
                }
            t || (this.recentForcedServerPositions.add({
                pos: this.serverPos.clone(),
                time: getMainInstance().now
            }),
            this.setPosition(this.serverPos))
        }
        this.predictedServerPos.set(t, e, i),
        this.lastPredictedServerVelocity.copy(this.predictedServerVelocity),
        this.hasOwnership || (this.lookRot.set(s, n),
        this.resetSmoothLookRot(),
        this.cachedCamRotDirty = !0);
        const l = e > o.y;
        l != this.networkPosIsMovingUp && (this.networkPosIsMovingUp = l,
        l && this.rigidBody.isAboveJumpableCollider() && this.rigidBody.updateLastFloorTouchTime())
    }
    setPingData(t) {
        this.ping = t
    }
    getDeltaPositionMsAgo(t) {
        if (this.positionHistory.length <= 0)
            return this.pos.clone();
        const e = Math.round(t / getMainInstance().smoothDt)
          , i = clamp(e, 0, this.positionHistory.length - 1)
          , s = this.positionHistory[i];
        return this.pos.clone().sub(s)
    }
    updateIconVisibility(t) {
        let e = !this.hasOwnership;
        this.game instanceof Game ? (void 0 === t && (t = this.game.getMyTeamId()),
        t != this.teamId && (e = !1)) : e = !1,
        this.icon.setVisibility(e)
    }
    getSmallAvatar() {
        const t = 40 * globalThis.devicePixelRatio;
        return getMainInstance().avatars.getAvatar({
            backgroundColor: teamColors[this.teamId].cssColor,
            width: t,
            height: t,
            skinObjectOpts: {
                teamId: this.teamId,
                skin: this.equippedSkinData
            }
        })
    }
    touchedDamageCollider(t) {
        this.hasOwnership && this.applyDamage(t, null)
    }
    dieFromFall() {
        this.hasOwnership && (this.deadFromFall = !0,
        this.holdingFlag && this.sendChangeFlag(this.holdingFlag.id, NetworkManager.FlagChangeOperation.RETURN, !1),
        this.die())
    }
    die() {
        if (this.dead)
            return;
        const t = this.game instanceof Game ? this.game : null;
        this.hasOwnership && (this.sfxManager.playSound("feedback/die"),
        t && t.showKilledNotification(),
        this.setWeaponSelectionDialogVisibility(!0),
        this.game.gameStarted && getMainInstance().adBanners.setPageVisibility("respawn", !0),
        this.deadFromFall || getMainInstance().cam.setThirdPersonMode("dead"),
        this.game.crosshair.setDeadVisibility(!1)),
        this.dead = !0,
        this.activeWeapon && this.activeWeapon.actionUp(),
        this.bowWeapon && this.bowWeapon.onPlayerDied(),
        this.meleeWeapon && this.meleeWeapon.onPlayerDied(),
        this.sendPerformAction(Player.PlayerAction.DIE),
        this.dieTime = getMainInstance().now,
        this.deadFallForward = this.computeDeadFallDirection(),
        this.deadLookRot.copy(this.lookRot),
        this.updateMySelectedWeapon(),
        this.stopFallSound(),
        this.updateModelVisibility(),
        this.hasOwnership && setTimeout((()=>{
            this.destructed || this.respawn()
        }
        ), 1e3)
    }
    respawn() {
        if (!this.hasOwnership)
            return;
        const {pos: t, rot: e} = this.game.getSpawnPosition(this.teamId)
          , i = new Vector3(0,0,1);
        i.applyQuaternion(e),
        i.y = 0;
        const s = new Vector3(0,0,1);
        let n = i.angleTo(s);
        s.cross(i).y < 0 && (n *= -1),
        this.dead = !1,
        this.deadFromFall = !1,
        this.currentSpawnId++,
        getMainInstance().network.sendPlayerSpawn(this.id, this.currentSpawnId),
        getMainInstance().renderer.renderWorthyEventHappened(),
        this.setPosition(t),
        this.resetDeadPoseWeights(),
        this.hasOwnership && getMainInstance().cam.setThirdPersonMode("none"),
        this.hasWalkedAwayFromSpawn = !1,
        this.lastRespawnPosition.copy(t),
        this.setWeaponSelectionDialogVisibility(!0),
        this.game.gameStarted && getMainInstance().adBanners.setPageVisibility("respawn", !0),
        this.updateMySelectedWeapon(),
        this.lookRot.set(n, 0),
        this.resetSmoothLookRot(),
        this.updateModelVisibility(),
        getMainInstance().cam.playerRespawned(),
        this.sfxManager.playSound("player/spawn"),
        this.health = 1,
        this.bowWeapon && this.bowWeapon.onPlayerRespawned(),
        this.meleeWeapon && this.meleeWeapon.onPlayerRespawned(),
        this.game.crosshair.setDeadVisibility(!0),
        this.updateHealthUi(),
        this.sendPlayerDataToServer(),
        this.sendMyEquippedSkinData()
    }
    receivedSpawn(t) {
        this.currentSpawnId = t,
        this.dead = !1,
        this.resetDeadPoseWeights(),
        this.health = 1,
        this.hasValidPosition = !1,
        this.activeWeapon && this.activeWeapon.onPlayerRespawned(),
        this.updateModelVisibility()
    }
    resetDeadPoseWeights() {
        this.deadForwardLayer && (this.deadForwardLayer.weight = 0),
        this.deadBackwardLayer && (this.deadBackwardLayer.weight = 0),
        this.deadAnimationWeight = 0
    }
    getLookDirection() {
        const t = new Vector3(0,0,1);
        return t.applyQuaternion(this.getCamRot()),
        t
    }
    computeDeadFallDirection() {
        if (this.lookRot.y < -1)
            return !0;
        if (this.lookRot.y > 1)
            return !1;
        if (this.velocity.length() > 5) {
            const t = this.getLookDirection()
              , e = this.velocity.dot(t);
            if (e > 1)
                return !1;
            if (e < -1)
                return !0
        }
        return !1
    }
    updateHealthUi(t) {
        this.game instanceof Game && (this.game.healthUi.setHealth(this.health),
        void 0 !== t && this.game.healthUi.flashDamageProtection(t))
    }
    setPosition(t) {
        this.pos.copy(t),
        this.rigidBody.pos.copy(t),
        this.rigidBody.velocity.set(0, 0, 0),
        this.cachedCamPosDirty = !0
    }
    sendChangeFlag(t, e, i=!0) {
        if (!this.game.gameEnded && this.game.gameStarted) {
            if (i) {
                for (const [i,s] of this.sentChangeFlagMessages.entries()) {
                    if (getMainInstance().now - s.sendTime > 3e3) {
                        this.sentChangeFlagMessages.splice(i);
                        break
                    }
                    if (s.flagId == t && s.changeOperation == e)
                        return
                }
                this.sentChangeFlagMessages.unshift({
                    flagId: t,
                    changeOperation: e,
                    sendTime: getMainInstance().now
                })
            }
            getMainInstance().network.sendChangeFlag(this.id, t, e)
        }
    }
    changeFlagFromServer(t, e) {
        e == NetworkManager.FlagChangeOperation.GRAB ? (this.holdingFlag = t,
        t.startHoldByPlayer(this),
        this.sfxManager.playSound("flag/grab", {
            pos: this.pos
        })) : e == NetworkManager.FlagChangeOperation.CAPTURE ? (this.holdingFlag = null,
        t.returnToDefaultPos()) : e == NetworkManager.FlagChangeOperation.DROP ? (this.holdingFlag = null,
        t.setDroppedPosition(this.pos.x, this.pos.y, this.pos.z, this.velocity.x, this.velocity.y, this.velocity.z),
        t.removeCurrentHoldingPlayer(),
        this.sfxManager.playSound("flag/drop", {
            pos: this.pos
        })) : e == NetworkManager.FlagChangeOperation.RETURN && (this.holdingFlag == t && (this.holdingFlag = null),
        t.returnToDefaultPos()),
        this.removeChangeFlagFromQueue(t.id, e)
    }
    stopHoldingFlag(t) {
        this.holdingFlag == t && (this.holdingFlag = null)
    }
    removeChangeFlagFromQueue(t, e) {
        for (let i = this.sentChangeFlagMessages.length - 1; i >= 0; i--) {
            const s = this.sentChangeFlagMessages[i];
            if (s.flagId == t && s.changeOperation == e)
                return void this.sentChangeFlagMessages.splice(i, 1)
        }
    }
    report(t, e) {
        if (!(this.game instanceof Game))
            throw new Error("Reporting players is not supported in offline games");
        e <= 0 || this.hasOwnership || this.game.gameEnded || performance.now() < this.creationTime + 15e3 || this.game.antiCheat.reportPlayer(this.id, t, e)
    }
}
const gravity = new Vector3(0,-20,0);
class FlagRigidBody extends RigidBody {
    constructor(t, e) {
        super(),
        this.physicsManager = t,
        this.flag = e,
        this.pos = new Vector3,
        this.velocity = new Vector3,
        this.isOnFloor = !1,
        this.radius = .5;
        const i = this.radius;
        this.aabb = new Box3(new Vector3(-i,-i,-i),new Vector3(i,i,i))
    }
    stepVelocity(t) {
        this.velocity.addScaledVector(gravity, t);
        const e = this.isOnFloor ? 1 : .8
          , i = Math.pow(1 - e, t);
        this.velocity.multiplyScalar(i),
        this.pos.addScaledVector(this.velocity, t)
    }
    resolveMapCollisionsOctree(t) {
        this.isOnFloor = !1;
        const e = this.getManifolds();
        for (const {manifold: t, mapCollider: i} of e) {
            const e = this.velocity.dot(t.normal);
            if (e < 0) {
                i.isDeathTrigger && this.flag.returnToDefaultPosFromFall(),
                this.velocity.addScaledVector(t.normal, -e);
                t.normal.dot(new Vector3(0,1,0)) > .7 && (this.isOnFloor = !0);
                const s = .8
                  , n = .001
                  , a = Math.max(t.penetration - n, 0) * s
                  , o = t.normal.clone().multiplyScalar(a);
                this.pos.add(o)
            }
        }
    }
    getColliderAabb() {
        const t = this.aabb.clone();
        return t.translate(this.pos),
        t
    }
    getManifolds() {
        const t = []
          , e = this.getColliderAabb();
        for (const i of this.physicsManager.getCollidersForAabbUsingOctree(e)) {
            if (!i.aabb)
                continue;
            if (!i.aabb.intersectsBox(e))
                continue;
            const s = i.getSphereManifold(this.pos, this.radius);
            s.penetration > 0 && t.push({
                manifold: s,
                mapCollider: i
            })
        }
        return t
    }
}
class Flag {
    constructor(t, e, i, s, n, a) {
        this.id = t,
        this.teamId = e,
        this.defaultPosition = i,
        this.defaultRotation = s,
        this.position = i.clone(),
        this.game = n,
        this.physicsManager = a,
        this.isOnDefaultPos = !0,
        this.rigidBody = new FlagRigidBody(this.game.physics,this),
        this.rigidBody.enabled = !1,
        a.registerRigidBody(this.rigidBody),
        this.obj = new Object3D,
        this.obj.name = "flag",
        this.obj.position.copy(i),
        this.obj.quaternion.copy(s),
        getMainInstance().scene.add(this.obj),
        this.grabAnimationContainer = new Object3D,
        this.grabAnimationContainer.name = "flagGrabAnimationContainer",
        this.obj.add(this.grabAnimationContainer),
        this.obj.updateWorldMatrix(!1, !0),
        this.grabStartTime = 0,
        this.returnProgress = 0,
        this.onNearDefaultPosChangeCbs = new Set,
        this.isNearDefaultPos = !0,
        this.onCurrentHoldingPlayerChangeCbs = new Set,
        this.currentHoldingPlayer = null,
        this.prevIsBeingHeld = !1,
        this.holdingHandler = null,
        this.icon = getMainInstance().hudIcons.createIcon({
            url: `static/img/hudIcons/flag ${teamColors[e].nameCapitalized}.svg`
        }),
        this.initModel(),
        this.destructed = !1
    }
    destructor() {
        this.destructed = !0,
        getMainInstance().hudIcons.removeIcon(this.icon),
        this.removeCurrentHoldingPlayer(),
        this.destroyHoldingHandler(),
        this.obj.parent == getMainInstance().scene && getMainInstance().scene.remove(this.obj),
        this.physicsManager.removeRigidBody(this.rigidBody)
    }
    async initModel() {
        const t = await getMainInstance().assets.loadGlbViaWorker("flag.glb", {
            teamId: this.teamId
        });
        this.destructed || (t && this.grabAnimationContainer.add(t),
        this.updateRenderState())
    }
    updateRenderState() {
        const t = !!this.currentHoldingPlayer;
        t ? this.holdingHandler && this.holdingHandler.player == this.currentHoldingPlayer || (this.destroyHoldingHandler(),
        this.currentHoldingPlayer && (this.holdingHandler = this.currentHoldingPlayer.createHoldingHandler({
            holdingObject: this.obj,
            thirdPersonParentName: "flagHoldingPos",
            firstPersonConfig: {
                posOffset: new Vector3(.4,-1.4,-1.03),
                rotOffset: new Vector3(-.2,-.1,.4),
                posBaseFovMultiplierX: -.93
            }
        })),
        this.icon.setVisibility(!this.currentHoldingPlayer || !this.currentHoldingPlayer.hasOwnership)) : t != this.prevIsBeingHeld && (this.destroyHoldingHandler(),
        this.icon.setVisibility(!0)),
        this.prevIsBeingHeld = t,
        this.updateRenderPosition()
    }
    updateRenderPosition() {
        let t;
        this.currentHoldingPlayer ? t = this.currentHoldingPlayer.pos.clone() : (this.obj.position.copy(this.position),
        this.obj.quaternion.copy(this.defaultRotation),
        t = this.position.clone()),
        t.y += 2.7,
        this.icon.setPos(t),
        this.obj.updateWorldMatrix(!1, !0)
    }
    loop(t, e) {
        const i = (t - this.grabStartTime) / 1e3
          , s = 2 * Math.PI * 2
          , n = mapValue(0, .8, s, 0, i, !0);
        this.grabAnimationContainer.rotation.y = 1 / (10 * i + 1) * n;
        const a = 1 / (1 + Math.pow(Math.E, -50 * (i - .7)));
        this.grabAnimationContainer.position.y = .3 * (1 - a)
    }
    afterPhysicsLoop(t, e) {
        if (!this.currentHoldingPlayer && !this.isOnDefaultPos) {
            this.position.copy(this.rigidBody.pos),
            this.position.y -= this.rigidBody.radius,
            this.updateRenderPosition(),
            this.updateIsNearDefaultPos();
            const t = getMainInstance().mapLoader.mapVariablesManager.get("floorDeathHeight");
            "number" == typeof t && this.position.y < t && this.returnToDefaultPosFromFall()
        }
    }
    startHoldByPlayer(t) {
        t != this.currentHoldingPlayer && (this.removeCurrentHoldingPlayer(),
        this.currentHoldingPlayer = t,
        this.grabStartTime = getMainInstance().now,
        this.updateRenderState(),
        this.onCurrentHoldingPlayerChangeCbs.forEach((t=>t())))
    }
    destroyHoldingHandler() {
        this.holdingHandler && (this.holdingHandler.destructor(),
        this.holdingHandler = null,
        getMainInstance().scene.add(this.obj))
    }
    returnToDefaultPos() {
        this.isOnDefaultPos = !0,
        this.rigidBody.enabled = !1,
        this.removeCurrentHoldingPlayer(),
        this.position.copy(this.defaultPosition),
        this.updateRenderState(),
        this.updateIsNearDefaultPos()
    }
    returnToDefaultPosFromFall() {
        this.currentHoldingPlayer || this.isOnDefaultPos || this.returnToDefaultPos()
    }
    removeCurrentHoldingPlayer() {
        this.currentHoldingPlayer && this.currentHoldingPlayer.stopHoldingFlag(this),
        this.currentHoldingPlayer = null,
        this.onCurrentHoldingPlayerChangeCbs.forEach((t=>t()))
    }
    onCurrentHoldingPlayerChange(t) {
        this.onCurrentHoldingPlayerChangeCbs.add(t)
    }
    setDroppedPosition(t, e, i, s, n, a) {
        this.isOnDefaultPos = !1,
        this.position.set(t, e + this.rigidBody.radius, i),
        this.updateIsNearDefaultPos(),
        this.currentHoldingPlayer || (this.rigidBody.pos.copy(this.position),
        this.rigidBody.velocity.set(s, n, a),
        this.rigidBody.enabled = !0,
        this.returnProgress = 0,
        this.updateRenderState())
    }
    onNearDefaultPosChange(t) {
        this.onNearDefaultPosChangeCbs.add(t)
    }
    updateIsNearDefaultPos() {
        const t = this.position.distanceTo(this.defaultPosition) < 1;
        t != this.isNearDefaultPos && (this.isNearDefaultPos = t,
        this.onNearDefaultPosChangeCbs.forEach((t=>t())))
    }
    sendFlagReturnProgressToServer(t) {
        let e = 1 / 0;
        for (const i of this.game.getMyFlags()) {
            const s = 1 - t.distanceTo(i.position) / i.defaultPosition.distanceTo(this.defaultPosition);
            s < e && (e = s)
        }
        getMainInstance().network.sendFlagReturnProgress(this.id, e)
    }
    addReturnProgress(t) {
        this.returnProgress += t
    }
}
class Arrow {
    constructor(t, e, i, {arrowId: s, pos: n, networkOffsetPos: a, dir: o, fireAmount01: r}, {arrowManager: l, scene: h}) {
        this.physics = t,
        this.hingeManager = e,
        this.shotBy = i,
        this.arrowId = s,
        this.startPos = n,
        this.consumed = !1,
        this.arrowManager = l,
        this.scene = h,
        this.networkOffsetPos = a,
        this.networkStartPos = n.clone().add(a),
        this.dir = o,
        this.arrowWeaponOpts = {
            visualOffset: new Vector3,
            scale: new Vector3(1,1,1),
            damageMultiplier: 1,
            travelDistanceMultiplier: 1,
            trailThicknessMultiplier: 1,
            trailDurationMultiplier: 1
        },
        this.playerDamageMultiplier = lerp(.8, 1.2, i.getStatClassValue("bowAttackStrength")),
        i.bowWeapon && (this.arrowWeaponOpts = {
            ...this.arrowWeaponOpts,
            ...i.bowWeapon.getArrowOpts(r)
        }),
        this.strength = lerp(10, 500 * this.arrowWeaponOpts.travelDistanceMultiplier, r),
        this.dir.setLength(this.strength),
        this.existingTime = 0;
        const d = this.getParabolaExtremePoint();
        this.parabolaXDist = 2 * d.x;
        const c = this.parabolaXDist + 2 * d.y;
        this.xSpeed = 0 == c ? 1 : Math.abs(this.parabolaXDist / c),
        this.xSpeed *= mapValue(100, 500, .05, .15, this.strength),
        this.xSpeed *= lerp(.82, 1.05, i.getStatClassValue("arrowFlySpeed")),
        this.visualStartPos = this.getParabolaPoint3d(0),
        this.obj = new Object3D,
        this.obj.name = "Arrow container " + this.arrowId,
        this.obj.position.copy(this.networkStartPos),
        this.obj.scale.copy(this.arrowWeaponOpts.scale),
        this.scene.add(this.obj),
        this.prevPos = null,
        this.prevRaycastPos = null,
        this.cachedRays = [],
        this.travelledPositions = [],
        this.onTravelCbs = new Set,
        this.lookDirection = new Vector3,
        this.sphere = null,
        this.trailObj = null,
        this.trailGeo = null,
        this.trailMat = null,
        this.stuckInHingeId = -1,
        this.hingeImpactMatrix = null,
        this.boundUpdateHingePosition = this.updateHingePosition.bind(this),
        this.didHitWorld = !1,
        this.didHitPlayer = !1,
        this.worldHitTime = 0,
        this.worldHitRot = null,
        this.worldHitTangent = null,
        this.worldHitLastRayDistance = 0,
        this.destructed = !1,
        this.initModel(),
        this.initTrail()
    }
    destructor() {
        this.destructed = !0,
        this.scene.remove(this.obj),
        this.trailObj && this.scene.remove(this.trailObj),
        this.trailGeo && this.trailGeo.dispose(),
        this.trailMat && this.trailMat.dispose(),
        this.hingeManager.removeOnHingeMove(this.stuckInHingeId, this.boundUpdateHingePosition)
    }
    get damageMultiplier() {
        return this.arrowWeaponOpts.damageMultiplier * this.playerDamageMultiplier
    }
    getStunData() {
        const t = this.shotBy.getStatClassValue("arrowEnemyStun");
        return {
            amount: lerp(0, .4, t),
            duration: lerp(0, 400, t),
            fadeDuration: 400
        }
    }
    initModel() {
        const t = this.shotBy.getClonedArrowObject((()=>{
            t && this.obj.remove(t)
        }
        ));
        t && this.obj.add(t);
        const e = this.arrowManager.getSphereGeo(this.shotBy.teamId);
        this.sphere = new Mesh(e,getMainInstance().materials.basicUnlitMat),
        this.sphere.name = "Arrow sphere",
        this.sphere.position.z = -1,
        this.obj.add(this.sphere)
    }
    initTrail() {
        const t = .005 * this.arrowWeaponOpts.trailThicknessMultiplier
          , e = 30
          , i = [];
        for (let e = 0; e < 3; e++) {
            const s = e / 3 * Math.PI * 2
              , n = Math.cos(s) * t
              , a = Math.sin(s) * t;
            i.push(new Vector3(n,a,0))
        }
        const s = this.getMaxDistanceT()
          , n = new Float32Array(270)
          , a = new Float32Array(90)
          , o = new Float32Array(270)
          , r = [];
        let l = 0
          , h = new Vector3;
        for (let t = 0; t < e; t++) {
            const d = Math.pow(t / e, 2) * s
              , c = this.getParabolaPoint3d(d, !0);
            let u = null;
            if (t > 0)
                u = h.sub(c);
            else {
                u = this.getParabolaPoint3d(-1e-4, !0).sub(c)
            }
            h = c;
            const p = new Matrix4;
            p.lookAt(new Vector3, u, new Vector3(0,1,0));
            const g = new Quaternion;
            g.setFromRotationMatrix(p);
            for (let t = 0; t < 3; t++) {
                const e = i[t].clone();
                e.applyQuaternion(g);
                const s = e.clone();
                n[3 * l + 0] = c.x,
                n[3 * l + 1] = c.y,
                n[3 * l + 2] = c.z,
                o[3 * l + 0] = s.x,
                o[3 * l + 1] = s.y,
                o[3 * l + 2] = s.z,
                a[l] = d,
                l++
            }
            if (t < 29) {
                const e = 3 * t
                  , i = e + 3;
                for (let t = 0; t < 3; t++) {
                    const s = (t + 1) % 3;
                    r.push(e + t, e + s, i + t),
                    r.push(e + s, i + s, i + t)
                }
            }
        }
        const d = new BufferGeometry;
        d.setAttribute("position", new BufferAttribute(n,3)),
        d.setAttribute("arrowT", new BufferAttribute(a,1)),
        d.setAttribute("normal", new BufferAttribute(o,3)),
        d.setIndex(r),
        this.trailGeo = d;
        const c = getMainInstance().materials.arrowTrailMat;
        if (!c)
            throw new Error("Couldn't find arrow trail material.");
        this.trailMat = c.clone(),
        this.trailMat.uniforms.shootStartPos.value.copy(this.visualStartPos);
        const u = .1 * this.strength
          , p = Math.max(u, Math.abs(this.parabolaXDist)) * this.arrowWeaponOpts.trailDurationMultiplier;
        this.trailMat.uniforms.estimatedXLength.value = p,
        this.trailObj = new Mesh(d,this.trailMat),
        this.trailObj.name = "Arrow trail " + this.arrowId,
        this.scene.add(this.trailObj)
    }
    loop(t, e) {
        if (!this.didHitWorld && !this.didHitPlayer) {
            const e = this.existingTime * this.xSpeed
              , i = this.getParabolaPoint3d(e)
              , s = this.getParabolaPoint3d(e, !1, !1);
            this.prevRaycastPos && this.prevPos || (this.prevRaycastPos = this.getParabolaPoint3d(e - .001, !1, !1),
            this.prevPos = this.getParabolaPoint3d(e - .001)),
            this.travelledPositions.push(s),
            this.onTravelCbs.forEach((t=>t(s))),
            this.lookDirection.copy(i),
            this.lookDirection.sub(this.prevPos),
            this.lookDirection.setLength(1),
            this.trailMat && (this.trailMat.uniforms.arrowPosT.value = e),
            0 == this.lookDirection.length() && this.lookDirection.set(0, 1, 0);
            const n = this.getNearbyStartAmount(i)
              , a = this.lookDirection.clone().multiplyScalar(n)
              , o = i.clone().add(a)
              , r = this.physics.getRayCastCache(this.prevRaycastPos, s);
            if (r) {
                this.cachedRays.push({
                    ray: r,
                    createTime: t
                });
                const e = this.physics.rayCastMapColliders(r, (t=>!t.collider.ignoreArrows && t.collider.excludeTeamId != this.shotBy.teamId));
                if (e) {
                    -1 != e.collider.excludeTeamId && (this.obj.visible = !1),
                    this.didHitWorld = !0,
                    this.worldHitTime = t,
                    this.worldHitLastRayDistance = e.dist,
                    this.obj.position.copy(e.pos),
                    this.obj.position.addScaledVector(this.lookDirection, .15),
                    this.worldHitRot = this.obj.quaternion.clone(),
                    this.worldHitTangent = this.lookDirection.clone().cross(new Vector3(0,1,0)),
                    this.worldHitTangent.normalize(),
                    getMainInstance().sfx.playSound("weapon/bow/environmentImpact/" + randInt(1, 4), {
                        pos: e.pos
                    }),
                    e.collider.shootSfx && getMainInstance().sfx.playSound(e.collider.shootSfx, {
                        pos: e.pos
                    });
                    const i = e.collider.triggerHingeId;
                    if (i >= 0) {
                        const t = this.hingeManager.shootHinge(i, e.pos, this.lookDirection);
                        t && (this.stuckInHingeId = i,
                        this.obj.updateWorldMatrix(!1, !0),
                        this.hingeImpactMatrix = this.obj.matrixWorld.clone(),
                        this.hingeImpactMatrix.premultiply(t.defaultWorldMatrix.clone().invert()),
                        this.obj.matrixAutoUpdate = !1,
                        this.hingeManager.onHingeMove(i, this.boundUpdateHingePosition))
                    }
                }
            }
            this.prevPos.copy(i),
            this.prevRaycastPos.copy(s),
            this.obj.quaternion.setFromUnitVectors(new Vector3(0,0,1), this.lookDirection),
            this.didHitWorld || this.obj.position.copy(o)
        }
        if (!this.didHitPlayer) {
            let e = 0;
            for (const [i,s] of this.cachedRays.entries())
                t - s.createTime > 200 && (e = i + 1);
            this.cachedRays.splice(0, e);
            for (const [t,e] of this.cachedRays.entries()) {
                const i = this.physics.rayCastPlayerColliders(e.ray, (t=>!t.collider.rigidBody.player.dead && t.collider.rigidBody.player.teamId != this.shotBy.teamId));
                if (i) {
                    let e = !1;
                    if (this.didHitWorld) {
                        t == this.cachedRays.length - 1 && i.dist > this.worldHitLastRayDistance && (e = !0)
                    }
                    if (!e) {
                        const t = i.collider.rigidBody.player;
                        if (this.didHitPlayer = !0,
                        this.shotBy.hasOwnership) {
                            const e = i.collider.rigidBody.colliders.indexOf(i.collider);
                            t.addHitFlash(e),
                            getMainInstance().sfx.playSound("feedback/hitPlayer");
                            "head" == i.collider.bodyPart && getMainInstance().sfx.playSound("feedback/headShot"),
                            getMainInstance().network.sendHitByArrow(t.id, t.currentSpawnId, this.shotBy.id, this.arrowId, e)
                        }
                        this.obj.visible = !1
                    }
                }
            }
        }
        if (this.trailMat && (this.trailMat.uniforms.arrowShootT.value = this.existingTime * this.xSpeed),
        this.existingTime += this.physics.timeScale * e,
        this.sphere) {
            const e = getMainInstance().cam.pos.distanceTo(this.obj.position);
            let i = 1;
            if (this.didHitWorld) {
                const s = mapValue(15, 30, 4, 2, e, !0);
                i *= mapValue(0, 100, s, 1, t - this.worldHitTime, !0)
            }
            this.sphere.scale.setScalar(.002 * e * i),
            this.sphere.updateWorldMatrix(!1, !0)
        }
        if (this.didHitWorld && -1 == this.stuckInHingeId) {
            const e = this.getWorldHitRot(t);
            e && this.obj.quaternion.copy(e)
        }
        this.didHitPlayer || this.obj.updateWorldMatrix(!1, !0)
    }
    consume() {
        if (this.consumed)
            throw new Error("Assertion failed, arrow is already consumed.");
        this.consumed = !0
    }
    getWorldHitRot(t=getMainInstance().now) {
        if (!this.worldHitRot || !this.worldHitTangent)
            return null;
        const e = new Quaternion;
        e.setFromAxisAngle(this.worldHitTangent, this.getImpactShake(t));
        const i = this.worldHitRot.clone();
        return i.premultiply(e),
        i
    }
    getImpactShake(t) {
        const e = t - this.worldHitTime;
        return .03 * (Math.cos(.08 * e) * (100 / (e + 100)))
    }
    updateHingePosition(t) {
        if (!this.hingeImpactMatrix)
            return;
        this.obj.matrix.identity();
        const e = this.getImpactShake(getMainInstance().now)
          , i = new Quaternion;
        i.setFromAxisAngle(new Vector3(1,0,0), e),
        this.obj.matrix.makeRotationFromQuaternion(i),
        this.obj.matrix.premultiply(this.hingeImpactMatrix),
        this.obj.matrix.premultiply(t.object.matrixWorld),
        this.obj.updateWorldMatrix(!1, !0)
    }
    onTravel(t) {
        this.onTravelCbs.add(t)
    }
    getParabolaPoint3d(t, e=!1, i=!0) {
        const {newDir: s, inverseSpaceRotation: n} = this.map3dDirTo2d(this.dir)
          , a = this.getParabolaPoint2d(s.x, s.y, t);
        e && 0 == s.x && (a.x = 0);
        const o = new Vector3(a.x,a.y,0);
        o.applyQuaternion(n),
        o.add(this.startPos);
        const r = this.getNearbyStartAmount(o);
        if (i) {
            const t = this.arrowWeaponOpts.visualOffset.clone();
            t.multiplyScalar(r),
            t.applyQuaternion(n),
            o.add(t)
        }
        const l = this.networkOffsetPos.clone().multiplyScalar(1 - r);
        return o.add(l),
        o
    }
    getNearbyStartAmount(t) {
        return 3 / (t.distanceTo(this.startPos) + 3)
    }
    map3dDirTo2d(t) {
        let e = new Vector3(t.x,0,t.z).angleTo(new Vector3(1,0,0));
        t.z < 0 && (e = 2 * Math.PI - e);
        const i = new Quaternion;
        i.setFromAxisAngle(new Vector3(0,1,0), e);
        const s = i.clone().invert();
        return {
            newDir: t.clone().applyQuaternion(i),
            spaceRotation: i,
            inverseSpaceRotation: s
        }
    }
    getParabolaPoint2d(t, e, i) {
        const s = this.sCurve(e / t);
        let n = 0;
        return 0 == s ? n = -Math.pow(i, 2) * (1 / t) : 0 == t ? n = (1 - Math.pow(2 * (i / s - .5), 2)) * e * .5 : (n = (1 - Math.pow((i / s - t) / t, 2)) * e * .5,
        n *= s),
        new Vector2(i,n)
    }
    sCurve(t, e=Math.E) {
        let i = 1 / (1 + Math.pow(e, -t));
        return i -= .5,
        i *= 2,
        i
    }
    getParabolaExtremePoint() {
        const {newDir: t} = this.map3dDirTo2d(this.dir)
          , e = t.y / t.x;
        let i = null;
        return i = 0 == t.x ? .5 : Math.cos(Math.atan(e)) * this.sCurve(e) * this.strength,
        this.getParabolaPoint2d(t.x, t.y, i)
    }
    getMaxDistanceT() {
        let t = getMainInstance().mapLoader.mapVariablesManager.get("floorDeathHeight");
        this.physics.mapBounds && (t = Math.max(this.physics.mapBounds.min.y, t));
        const {newDir: e} = this.map3dDirTo2d(this.dir);
        if (0 == e.x)
            return 1;
        const i = t - this.networkStartPos.y
          , s = this.sCurve(e.y / e.x)
          , n = e.x
          , a = e.y;
        if (0 == s)
            return Math.sqrt(-i * n);
        const o = n * a * s
          , r = Math.pow(n, 2) * a * s * (a * s - 2 * i);
        if (r < 0)
            return 0;
        const l = Math.sqrt(r)
          , h = (o - l) / a
          , d = (o + l) / a;
        return Math.max(h, d)
    }
}
class DebugLine {
    static setCurrentScene(t) {
        this.scene = t,
        this.drawLinesNextFrame = [],
        this.removeLinesNextFrame = [],
        this.material || (this.material = new LineBasicMaterial({
            color: 16777215,
            vertexColors: !0
        }))
    }
    static loop() {
        if (this.drawLinesNextFrame && this.removeLinesNextFrame) {
            for (const t of this.removeLinesNextFrame) {
                const e = t.line;
                e && (e.parent && e.parent.remove(e),
                e.geometry.dispose())
            }
            this.removeLinesNextFrame = [];
            for (const t of this.drawLinesNextFrame) {
                const e = new BufferGeometry
                  , i = new Float32Array([...t.from.toArray(), ...t.to.toArray()]);
                e.setAttribute("position", new BufferAttribute(i,3));
                let s = this.material;
                t.color && (s = new LineBasicMaterial({
                    color: t.color
                }));
                const n = new Line(e,s);
                if (t.line = n,
                !this.scene)
                    throw new Error("Unable to draw debug lines, no scene provided");
                this.scene.add(n),
                this.removeLinesNextFrame.push(t)
            }
            this.drawLinesNextFrame = []
        }
    }
    static drawLine(t, e, i) {
        this.drawLinesNextFrame && this.drawLinesNextFrame.push({
            from: t.clone(),
            to: e.clone(),
            color: i,
            line: null
        })
    }
    static drawRay(t, e, i) {
        const s = (t = t.clone()).clone();
        s.add(e),
        this.drawLine(t, s, i)
    }
}
class ArrowManager {
    constructor(t, e, i) {
        this.physics = t,
        this.hingeManager = e,
        this.teamCount = i,
        this.arrows = new Map,
        this.oldPlayerArrows = new Set,
        this.sphereGeos = [];
        for (let t = 0; t < i; t++) {
            const e = new IcosahedronGeometry
              , i = e.getAttribute("position")
              , s = new Float32Array(3 * i.count);
            let n = 1
              , a = 0
              , o = 0;
            const r = teamColors[t].colorTransform;
            if (r) {
                const [t,e,i] = rgbToHsv(n, a, o)
                  , s = {
                    h: t,
                    s: e,
                    v: i
                };
                r(s),
                [n,a,o] = hsvToRgb(s.h, s.s, s.v)
            }
            const l = [n, a, o];
            for (let t = 0; t < s.byteLength; t += 3)
                for (let e = 0; e < l.length; e++)
                    s[t + e] = .3 * l[e];
            e.setAttribute("color", new BufferAttribute(s,3)),
            this.sphereGeos.push(e)
        }
        getMainInstance(),
        this.destructed = !1
    }
    destructor() {
        this.destructed = !0;
        for (const t of this.arrows.values())
            for (const e of t.values())
                e.destructor();
        this.arrows.clear();
        for (const t of this.sphereGeos)
            t.dispose();
        getMainInstance()
    }
    getSphereGeo(t) {
        return this.sphereGeos[t]
    }
    loop(t, e) {
        for (const [i,s] of this.arrows) {
            for (const [i,n] of s)
                n.loop(t, e),
                n.existingTime > 5e3 && (n.destructor(),
                s.delete(i));
            s.size <= 0 && this.arrows.delete(i)
        }
        for (const i of this.oldPlayerArrows)
            i.loop(t, e),
            i.existingTime > 5e3 && (i.destructor(),
            this.oldPlayerArrows.delete(i))
    }
    createArrow(t, e) {
        const i = new Arrow(this.physics,this.hingeManager,t,e,{
            arrowManager: this,
            scene: getMainInstance().scene
        })
          , s = i.arrowId
          , n = i.shotBy.id;
        let a = this.arrows.get(n);
        a || (a = new Map,
        this.arrows.set(n, a));
        const o = a.get(s);
        o && this.oldPlayerArrows.add(o),
        a.set(s, i),
        getMainInstance().renderer.renderWorthyEventHappened()
    }
    getArrowById(t, e) {
        const i = this.arrows.get(t);
        return i && i.get(e) || null
    }
    receivedHitValidationData(t) {}
}
class CrosshairAccuracyOffset {
    constructor(t) {
        this.crosshair = t,
        this._offset = 0
    }
    get offset() {
        return this._offset
    }
    set offset(t) {
        this._offset = t,
        this.crosshair.updateAccuracyOffset()
    }
}
const FLAG_RETURN_RADIUS = 15
  , FLAG_RETURN_PADDING = 10;
class Crosshair {
    constructor() {
        this.el = document.createElement("div"),
        this.el.classList.add("crosshair-container"),
        document.body.appendChild(this.el),
        this.lines = [];
        const t = "http://www.w3.org/2000/svg";
        this.flagReturnProgressSvg = document.createElementNS(t, "svg"),
        this.flagReturnProgressSvg.classList.add("flagReturnProgressContainer"),
        this.flagReturnProgressSvg.setAttribute("width", String(50)),
        this.flagReturnProgressSvg.setAttribute("height", String(50)),
        this.el.appendChild(this.flagReturnProgressSvg),
        this.flagReturnProgressPath1 = document.createElementNS(t, "path"),
        this.flagReturnProgressPath2 = document.createElementNS(t, "path"),
        this.flagReturnProgressPath1.classList.add("flagReturnProgressPath"),
        this.flagReturnProgressPath2.classList.add("flagReturnProgressPath"),
        this.flagReturnProgressPath1.style.stroke = "black",
        this.flagReturnProgressPath1.style.strokeWidth = "10px",
        this.flagReturnProgressPath2.style.stroke = "white",
        this.flagReturnProgressPath2.style.strokeWidth = "6px",
        this.flagReturnProgressSvg.appendChild(this.flagReturnProgressPath1),
        this.flagReturnProgressSvg.appendChild(this.flagReturnProgressPath2),
        this.accuracyOffsets = new Set,
        this.currentAccuracy = 0,
        this.smoothAccuracy = 0,
        this.gameUiVisibility = !0,
        this.thirdPersonVisibility = !0,
        this.deadVisibility = !0,
        this.boundUpdateThirdPersonVisibility = this.updateThirdPersonVisibility.bind(this),
        getMainInstance().cam.onThirdPersonChange(this.boundUpdateThirdPersonVisibility),
        this.flagReturnAccuracyOffset = this.createAccuracyOffset(),
        this.setFlagReturnProgressVisibility(!1);
        const e = getMainInstance().settingsManager;
        this.boundRebuildLines = this.rebuildLines.bind(this),
        e.onValueChange("crosshairStyle", this.boundRebuildLines),
        this.rebuildLines(),
        this.boundSetLineColors = this.setLineColors.bind(this),
        e.onValueChange("crosshairColor", this.boundSetLineColors),
        e.onValueChange("crosshairOutlineColor", this.boundSetLineColors),
        this.setLineColors()
    }
    destructor() {
        document.body.removeChild(this.el),
        getMainInstance().cam.removeOnThirdPersonChange(this.boundUpdateThirdPersonVisibility);
        getMainInstance().settingsManager.removeOnValueChange("crosshairStyle", this.boundRebuildLines)
    }
    rebuildLines() {
        for (const t of this.lines)
            this.el.removeChild(t.el);
        this.lines = [];
        const t = getMainInstance().settingsManager.getValue("crosshairStyle");
        let e = [];
        if ("three" == t)
            e = [30, 150, 270];
        else if ("three-low" == t)
            e = [0, 90, 180];
        else if ("three-extra-low" == t)
            e = [60, 90, 120];
        else if ("four" == t)
            for (let t = 45; t < 360; t += 90)
                e.push(t);
        else if ("four-flat" == t)
            e = [-30, 30, 150, 210];
        else if ("four-sharp" == t)
            e = [-60, 60, 120, 240];
        else if ("six" == t)
            for (let t = 30; t < 360; t += 60)
                e.push(t);
        for (const t of e) {
            const e = document.createElement("div");
            e.classList.add("crosshair-line"),
            this.el.appendChild(e),
            this.lines.push({
                rotation: t,
                el: e
            })
        }
    }
    setLineColors() {
        const t = getMainInstance().settingsManager
          , e = t.getValue("crosshairColor");
        this.el.style.setProperty("--line-color", e);
        const i = t.getValue("crosshairOutlineColor");
        this.el.style.setProperty("--outline-color", i)
    }
    loop(t, e) {
        this.smoothAccuracy = lerp(this.smoothAccuracy, this.currentAccuracy, .5);
        const i = 7 + this.smoothAccuracy * getMainInstance().settingsManager.getValue("crosshairAccuracyOffset");
        for (const t of this.lines)
            t.el.style.transform = `translateY(-3px) rotate(${t.rotation}deg) translateX(${i}px)`
    }
    createAccuracyOffset() {
        const t = new CrosshairAccuracyOffset(this);
        return this.accuracyOffsets.add(t),
        t
    }
    deleteAccuracyOffset(t) {
        this.accuracyOffsets.delete(t),
        this.updateAccuracyOffset()
    }
    updateAccuracyOffset() {
        let t = 0;
        for (const e of this.accuracyOffsets)
            t += e.offset;
        this.currentAccuracy = t
    }
    setFlagReturnProgress(t) {
        const e = 15
          , i = 2 * (t = clamp(t, 1e-4, .9999)) * Math.PI
          , s = `M25,10 A15,15 ${180 * i / Math.PI} ${t > .5 ? 1 : 0},1 ${e + Math.sin(i) * e + 10},${e - Math.cos(i) * e + 10}`;
        this.flagReturnProgressPath1.setAttribute("d", s),
        this.flagReturnProgressPath2.setAttribute("d", s)
    }
    setFlagReturnProgressVisibility(t) {
        this.flagReturnProgressSvg.classList.toggle("hidden", !t),
        this.flagReturnAccuracyOffset.offset = t ? 20 : 0
    }
    setGameUiVisibility(t) {
        this.gameUiVisibility = t,
        this.updateVisibility()
    }
    setDeadVisibility(t) {
        this.deadVisibility = t,
        this.updateVisibility()
    }
    updateThirdPersonVisibility() {
        this.thirdPersonVisibility = "front" != getMainInstance().cam.thirdPersonMode,
        this.updateVisibility()
    }
    updateVisibility() {
        const t = this.gameUiVisibility && this.thirdPersonVisibility && this.deadVisibility;
        this.el.style.display = t ? "" : "none"
    }
}
class FlagScoreUiItem {
    constructor(t) {
        this.el = document.createElement("div"),
        this.el.classList.add("flagScoreItem"),
        this.iconEl = document.createElement("div"),
        this.iconEl.classList.add("flagScoreIcon"),
        this.teamId = t,
        this.teamName = teamColors[t].nameCapitalized,
        this.iconEl.style.background = `url("static/img/scoreUI/flag ${this.teamName}.svg")`,
        this.el.appendChild(this.iconEl),
        this.onNeedsNotificationCbs = new Set,
        this.hasReceivedScore = !1,
        this.maxScore = 3,
        this.score = 0,
        this.grabbedState = "return",
        this.pointEls = [];
        for (let t = 0; t < this.maxScore; t++) {
            const t = document.createElement("div");
            t.classList.add("flagScorePointEl");
            const e = 90 * randInt(0, 3);
            t.style.transform = `rotate(${e}deg) scale(1.3)`,
            this.el.appendChild(t),
            this.pointEls.push(t)
        }
    }
    setScore(t) {
        t > this.score && this.hasReceivedScore && (this.grabbedState = "return",
        this.fireNeedsNotification("capture")),
        this.score = t,
        this.hasReceivedScore = !0,
        this.updatePointIcons()
    }
    setGrabbedState(t) {
        this.grabbedState != t && (this.grabbedState = t,
        this.fireNeedsNotification(t),
        this.updatePointIcons())
    }
    updatePointIcons() {
        for (const [t,e] of this.pointEls.entries()) {
            let i = "pointEmpty";
            t == this.score && ("grab" == this.grabbedState ? i = "pointGrabbed" : "drop" == this.grabbedState && (i = "pointDropped")),
            t < this.score && (i = "pointCaptured" + this.teamName),
            e.style.background = `url("static/img/scoreUI/${i}.svg")`
        }
    }
    getFinalFlagHeld() {
        return this.score == this.maxScore - 1 && "grab" == this.grabbedState
    }
    get hasFullScore() {
        return this.score >= this.maxScore
    }
    getScoreWithGrabbedState() {
        let t = this.score;
        return "grab" == this.grabbedState ? t += .5 : "drop" == this.grabbedState && (t += .25),
        t
    }
    onNeedsNotification(t) {
        this.onNeedsNotificationCbs.add(t)
    }
    fireNeedsNotification(t) {
        this.onNeedsNotificationCbs.forEach((e=>e({
            type: t,
            teamId: this.teamId
        })))
    }
}
class FlagScoreUi {
    constructor(t) {
        this.el = document.createElement("div"),
        this.el.classList.add("flagScoreContainer"),
        document.body.appendChild(this.el),
        this.onNeedsNotificationCbs = new Set,
        this.scoreItems = [];
        for (let e = 0; e < t; e++) {
            if (0 == e)
                continue;
            const t = new FlagScoreUiItem(e);
            this.el.appendChild(t.el),
            this.scoreItems[e] = t,
            t.onNeedsNotification((t=>{
                this.onNeedsNotificationCbs.forEach((e=>e(t)))
            }
            ))
        }
    }
    destructor() {
        document.body.removeChild(this.el)
    }
    update(t) {
        for (let e = 0; e < this.scoreItems.length; e++)
            0 != e && this.scoreItems[e].setScore(t[e])
    }
    setFlagGrabbedState(t, e) {
        const i = this.scoreItems[t];
        i && i.setGrabbedState(e)
    }
    getFinalFlagHeld() {
        for (const t of this.scoreItems)
            if (t && t.getFinalFlagHeld())
                return !0;
        return !1
    }
    getWinningTeam() {
        for (const t of this.scoreItems)
            if (t && t.hasFullScore)
                return t.teamId;
        return -1
    }
    getFlagsRatio() {
        let t = 1 / 0
          , e = 0;
        for (const i of this.scoreItems) {
            if (!i)
                continue;
            const s = i.getScoreWithGrabbedState();
            t = Math.min(t, s),
            e = Math.max(e, s)
        }
        return 0 == e ? 0 : t / e
    }
    onNeedsNotification(t) {
        this.onNeedsNotificationCbs.add(t)
    }
    setVisible(t) {
        this.el.style.display = t ? "" : "none"
    }
}
class HealthUi {
    constructor() {
        this.seed = randInt(0, 99999),
        this.el = document.createElement("div"),
        this.el.classList.add("health-ui-container", "wrinkledPaper"),
        this.el.style.cssText = `\n\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t`,
        document.body.appendChild(this.el),
        this.barContainerEl = document.createElement("div"),
        this.barContainerEl.classList.add("health-ui-bar-container"),
        this.el.appendChild(this.barContainerEl),
        this.bgBar = document.createElement("div"),
        this.bgBar.classList.add("health-ui-bar", "bg", "wrinkledPaper"),
        this.bgBar.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t`,
        this.barContainerEl.appendChild(this.bgBar),
        this.mainBarContainer = document.createElement("div"),
        this.mainBarContainer.classList.add("health-ui-bar", "clip"),
        this.barContainerEl.appendChild(this.mainBarContainer),
        this.mainBar = document.createElement("div"),
        this.mainBar.classList.add("health-ui-bar", "main", "wrinkledPaper"),
        this.mainBarContainer.appendChild(this.mainBar),
        this.damageProtectionBarContainer1 = document.createElement("div"),
        this.damageProtectionBarContainer1.classList.add("health-ui-bar"),
        this.damageProtectionBarContainer1.style.position = "relative",
        this.mainBarContainer.appendChild(this.damageProtectionBarContainer1),
        this.damageProtectionBarContainer2 = document.createElement("div"),
        this.damageProtectionBarContainer2.classList.add("health-ui-bar", "clip"),
        this.damageProtectionBarContainer1.appendChild(this.damageProtectionBarContainer2),
        this.damageProtectionBar = document.createElement("div"),
        this.damageProtectionBar.classList.add("health-ui-bar", "wrinkledPaper", "damage-protection"),
        this.damageProtectionBarContainer2.appendChild(this.damageProtectionBar),
        this.borderBar = document.createElement("div"),
        this.borderBar.classList.add("health-ui-bar", "border", "wrinkledPaper"),
        this.barContainerEl.appendChild(this.borderBar),
        this.heartContainer = document.createElement("div"),
        this.heartContainer.classList.add("health-ui-heart"),
        this.heartContainer.innerHTML = '\n\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 104">\n\t\t\t<path d="M88.46 29.518c-20.115-17.868-37.426 7.436-37.426 7.436s-17.608-24.235-37.723-6.367c-19.15 17.013-1.536 36.621 6.817 45.585 8.678 9.313 27.586 18.743 30.166 18.743s22.968-9.634 31.646-18.947c8.353-8.968 25.67-29.439 6.52-46.45z" style="fill: var(--default-ui-bg-color)"/>\n\t\t\t<path class="fg" d="M78.92 38.154c-14.928-13.261-28.075 9.169-28.075 9.169s-12.7-21.638-27.622-8.376c-14.212 12.624-.877 25.725 5.322 32.377 6.44 6.911 21.905 13.981 21.905 13.981s15.041-7.183 21.482-14.094c6.197-6.653 21.201-20.432 6.988-33.057z" style="fill: var(--default-text-color)"/>\n\t\t</svg>\n\t\t',
        this.el.appendChild(this.heartContainer),
        this.fgEl = this.heartContainer.getElementsByClassName("fg")[0]
    }
    destructor() {
        document.body.removeChild(this.el)
    }
    setHealth(t) {
        const e = 100 * (t = clamp01(t));
        this.mainBarContainer.style.width = `${e}%`,
        this.fgEl && this.fgEl.classList.toggle("beating", t < .2)
    }
    flashDamageProtection(t) {
        t = 100 * clamp01(t),
        this.damageProtectionBarContainer2.style.left = `${t}%`,
        this.damageProtectionBar.style.transform = `translateX(-${t}%)`,
        this.damageProtectionBar.style.opacity = "1",
        this.damageProtectionBar.style.transition = "none",
        recalculateStyle(this.damageProtectionBar),
        this.damageProtectionBar.style.opacity = "0",
        this.damageProtectionBar.style.transition = ""
    }
    setVisible(t) {
        this.el.style.display = t ? "" : "none"
    }
    setCssColor(t, e) {
        this.borderBar.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t\t--wrinkled-paper-border-color: ${e};\n\t\t`,
        this.mainBar.style.cssText = `\n\t\t\t--wrinkled-paper-seed: ${this.seed};\n\t\t\t--wrinkled-paper-color: ${t};\n\t\t`
    }
}
let prevW = 0
  , prevH = 0;
const listeners = new Set;
function loop() {
    testResized(),
    setTimeout((()=>{
        loop()
    }
    ), 1e3)
}
function testResized() {
    const t = window.innerWidth
      , e = window.innerHeight;
    t == prevW && e == prevH || (prevW = t,
    prevH = e,
    listeners.forEach((t=>t())))
}
function addResizeListener(t) {
    listeners.add(t)
}
window.addEventListener("resize", (()=>{
    testResized()
}
)),
loop();
class SkipDialogText {
    constructor() {
        this.el = document.createElement("div"),
        this.el.classList.add("skipDialogText"),
        this.text = "Press space to skip...",
        this.currentTimerValue = 0,
        this.currentInterval = null,
        this.onTimerEndCbs = new Set,
        this.onSkipActionCbs = new Set,
        this.creationCooldownEnd = 0,
        this.allowSpaceSkip = !0,
        this.keyDownCb = t=>{
            const e = performance.now() < this.creationCooldownEnd;
            "Space" == t.code && this.allowSpaceSkip && !e && this.fireSkipAction()
        }
        ,
        window.addEventListener("keydown", this.keyDownCb),
        this.el.addEventListener("click", (()=>{
            this.fireSkipAction()
        }
        )),
        this.startCreationCooldown(),
        this.updateText()
    }
    destructor() {
        window.removeEventListener("keydown", this.keyDownCb),
        this.fireSkipAction()
    }
    setText(t) {
        this.text = t,
        this.updateText()
    }
    setVisibility(t) {
        this.el.style.display = t ? "" : "none"
    }
    updateText() {
        let t = this.text;
        this.currentTimerValue > 0 && (t += " (" + this.currentTimerValue + ")"),
        this.el.textContent = t
    }
    startTimer(t=this.currentTimerValue) {
        this.stopTimer(),
        this.currentTimerValue = t,
        this.currentInterval = window.setInterval((()=>{
            this.currentTimerValue--,
            this.currentTimerValue <= 0 && (this.stopTimer(),
            this.onTimerEndCbs.forEach((t=>t()))),
            this.updateText()
        }
        ), 1e3)
    }
    stopTimer() {
        this.currentInterval && (window.clearInterval(this.currentInterval),
        this.currentInterval = null,
        this.currentTimerValue = 0,
        this.updateText())
    }
    startCreationCooldown() {
        this.creationCooldownEnd = performance.now() + 1e3
    }
    setAllowSpaceSkip(t) {
        this.allowSpaceSkip = t
    }
    async waitForTimerEnd() {
        const t = new Promise((t=>{
            this.onTimerEndCbs.add(t)
        }
        ));
        await t
    }
    async waitForSkipAction() {
        const t = new Promise((t=>{
            this.onSkipActionCbs.add(t)
        }
        ));
        await t
    }
    fireSkipAction() {
        this.onSkipActionCbs.forEach((t=>t()))
    }
    async waitForSkip() {
        return await Promise.race([this.waitForTimerEnd(), this.waitForSkipAction()])
    }
}
class PlayersListDialogUi extends DialogUi {
    constructor(t, e, i) {
        super({
            customOnCurtainClickCb: i,
            needsUnlockedPointer: !1,
            startVisible: !1
        }),
        this.playersList = t,
        this.skinManager = e,
        this.teamWonTitle = document.createElement("h2"),
        this.teamWonTitle.classList.add("playersListTeamWonTitle", "blueNight"),
        this.teamWonTitle.style.display = "none",
        this.el.appendChild(this.teamWonTitle),
        this.teamsContainer = document.createElement("div"),
        this.teamsContainer.classList.add("playersListContainer"),
        this.el.appendChild(this.teamsContainer),
        this.currentAvatarBlobUrlReferences = new Set,
        this.teamEls = [];
        for (const [t,e] of teamColors.entries()) {
            const i = document.createElement("div");
            i.classList.add("playersListTeam", "wrinkledPaper"),
            i.style.cssText = `\n\t\t\t\tbackground: ${e.cssColorLight};\n\t\t\t\tbackground: paint(wrinkledPaper);\n\t\t\t\t--team-bg-color-light: ${e.cssColorLight};\n\t\t\t\t--team-bg-color-dark: ${e.cssColorDark};\n\t\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t\t`;
            const s = document.createElement("table");
            s.classList.add("playersListTeamTable", "itemsTable"),
            i.appendChild(s);
            const n = document.createElement("colgroup");
            s.appendChild(n);
            const a = document.createElement("thead");
            a.style.cssText = `\n\t\t\t\tbackground: ${e.cssColor};\n\t\t\t\tbackground: paint(wrinkledPaper);\n\t\t\t\t--wrinkled-paper-color: ${e.cssColor};\n\t\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t\t`,
            s.appendChild(a);
            const o = document.createElement("tr");
            o.classList.add("playersListHead"),
            a.appendChild(o);
            const r = [{
                text: "",
                width: 100,
                colOnly: !0
            }, {
                text: "Team " + e.nameCapitalized,
                width: 300,
                colspan: 2
            }, {
                text: "Flags",
                width: 150
            }, {
                text: "Kills",
                width: 150
            }, {
                text: "Deaths",
                width: 150
            }, {
                text: "Score",
                width: 150
            }];
            for (const t of r) {
                const e = document.createElement("col");
                if (e.style.width = t.width + "px",
                n.appendChild(e),
                t.colOnly)
                    continue;
                const i = document.createElement("th");
                i.textContent = t.text,
                t.colspan && (i.colSpan = t.colspan),
                o.appendChild(i)
            }
            const l = document.createElement("tbody");
            s.appendChild(l),
            this.teamEls[t] = {
                containerEl: i,
                tbody: l,
                name: e.name
            }
        }
        this.skipText = new SkipDialogText,
        this.el.appendChild(this.skipText.el),
        this.skipText.setVisibility(!1),
        this.scoresFrozen = !1,
        this.playersListDirty = !0,
        this.updateTeamsOrder(),
        this.boundOnResize = this.onResize.bind(this),
        addResizeListener(this.boundOnResize),
        this.onResize(),
        this.setUnsetTeamVisibility(!0)
    }
    destructor() {
        super.destructor(),
        addResizeListener(this.boundOnResize);
        for (const t of this.currentAvatarBlobUrlReferences)
            t.destructor();
        this.currentAvatarBlobUrlReferences.clear()
    }
    onVisibilityChange() {
        this.playersListDirty && (this.updatePlayersList(),
        this.playersListDirty = !1)
    }
    onResize() {
        const t = clamp(window.innerHeight - 200, 100, 600);
        this.el.classList.toggle("topCenter", window.innerHeight < 790),
        this.teamsContainer.style.maxHeight = t + "px"
    }
    playersListChanged() {
        this.visible ? this.updatePlayersList() : this.playersListDirty = !0
    }
    updateTeamsOrder(t=-1) {
        for (; this.teamsContainer.lastChild; )
            this.teamsContainer.removeChild(this.teamsContainer.lastChild);
        const e = this.teamEls[t];
        e && this.teamsContainer.appendChild(e.containerEl);
        for (const [e,i] of this.teamEls.entries())
            e != t && this.teamsContainer.appendChild(i.containerEl)
    }
    updatePlayersList() {
        if (this.scoresFrozen)
            return;
        const t = new Map;
        for (const {tbody: e} of this.teamEls)
            for (const i of e.children)
                if (i.childElementCount > 0) {
                    const e = i.children[0];
                    if (e) {
                        const i = e.children[0];
                        if (i && i instanceof HTMLDivElement) {
                            const e = i.style.backgroundImage;
                            if (e) {
                                let s = t.get(e);
                                s || (s = [],
                                t.set(e, s)),
                                s.push(i)
                            }
                        }
                    }
                }
        for (const t of this.teamEls) {
            const e = t.tbody;
            for (; e.lastChild; )
                e.removeChild(e.lastChild)
        }
        const e = Array.from(this.currentAvatarBlobUrlReferences);
        this.currentAvatarBlobUrlReferences.clear();
        const i = Array.from(this.playersList.values()).sort(((t,e)=>e.scoreTotal - t.scoreTotal));
        for (const e of i) {
            const i = document.createElement("tr");
            i.classList.add("playersListItem", "tableItem"),
            this.teamEls[e.teamId].tbody.appendChild(i);
            let s = null;
            e.hasOwnership ? s = "You" : e.isSameSquadPlayer && (s = "Squad");
            const n = [{
                text: "",
                isAvatar: !0
            }, {
                text: e.playerName,
                label: s,
                isPlayerName: !0,
                verified: e.playerNameVerified
            }, {
                text: e.scoreFlags,
                isScore: !0
            }, {
                text: e.scoreKills,
                isScore: !0
            }, {
                text: e.scoreDeaths,
                isScore: !0
            }, {
                text: e.scoreTotal,
                isScore: !0
            }];
            for (const s of n) {
                const n = document.createElement("td");
                if (s.isPlayerName || (n.textContent = String(s.text)),
                s.isScore)
                    n.classList.add("playersListItemScore"),
                    n.style.cssText = `\n\t\t\t\t\t\t--wrinkled-paper-seed: ${e.id};\n\t\t\t\t\t`;
                else if (s.isAvatar) {
                    const i = document.createElement("div");
                    i.classList.add("player-avatar"),
                    n.appendChild(i);
                    const s = e.getSmallAvatar().getBlobUrlReference();
                    this.currentAvatarBlobUrlReferences.add(s),
                    (async()=>{
                        const e = await s.getBlobUrl()
                          , a = `url("${e}")`
                          , o = t.get(a);
                        let r = null;
                        o && o.length > 0 && (r = o.pop()),
                        r ? (n.removeChild(i),
                        n.appendChild(r),
                        t.delete(e)) : i.style.backgroundImage = a
                    }
                    )()
                } else if (s.isPlayerName) {
                    const t = document.createElement("span");
                    if (t.classList.add("player-list-username"),
                    t.textContent = s.text,
                    n.appendChild(t),
                    n.classList.add("players-list-item-username"),
                    s.verified) {
                        const t = document.createElement("div");
                        t.classList.add("player-name-verified-icon"),
                        n.appendChild(t)
                    }
                }
                if (s.label) {
                    const t = document.createElement("span");
                    t.textContent = s.label,
                    t.classList.add("players-list-label"),
                    t.style.background = teamColors[e.teamId].cssColor,
                    n.appendChild(t)
                }
                i.appendChild(n)
            }
        }
        for (const t of e)
            t.destructor()
    }
    freezeScores() {
        this.updatePlayersList(),
        this.scoresFrozen = !0
    }
    setUnsetTeamVisibility(t) {
        for (const {containerEl: e, name: i} of this.teamEls) {
            const s = "unset" == i;
            e.style.display = t == s ? "" : "none"
        }
    }
    setGameEndState(t) {
        if (this.allowCurtainClose = !1,
        -1 == t)
            return;
        const e = teamColors[t];
        this.teamWonTitle.textContent = `Team ${e.name} won!`,
        this.teamWonTitle.style.display = "",
        this.teamWonTitle.style.color = e.cssColor
    }
}
class NotificationIconsUi {
    constructor(t="topleft") {
        this.el = document.createElement("div"),
        this.el.classList.add("notificationIconsUiContainer", t),
        document.body.appendChild(this.el),
        this.currentIconEl = null
    }
    destructor() {
        document.body.removeChild(this.el)
    }
    showIcon(t) {
        this.currentIconEl && this.el.removeChild(this.currentIconEl);
        let e = null;
        t && (e = document.createElement("div"),
        e.classList.add("notificationIcon"),
        e.style.backgroundImage = `url(${t})`,
        this.el.appendChild(e)),
        this.currentIconEl = e
    }
    removeIcon() {
        this.showIcon(null)
    }
}
const ScoreOffsetReasonConfigs = new Map;
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.KILL, {
    text: "Kill",
    overviewText: "Kills"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.ASSIST, {
    text: "Assist",
    overviewText: "Assists"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_CARRIER_KILL, {
    text: "Carrier Kill",
    overviewText: "Carrier Kills"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_GRAB, {
    text: "Grab",
    overviewText: "Flag Grabs"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_CARRY, {
    text: "",
    overviewText: "Flag Carry",
    visibilityDuration: .5
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_CARRY_ASSIST, {
    text: "Carrier Assist",
    overviewText: "Carrier Assist",
    visibilityDuration: .5
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_CAPTURE, {
    text: "Capture",
    overviewText: "Flag Captures"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.WIN_BONUS, {
    overviewText: "Win Bonus",
    hideInGame: !0
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_RETURN, {
    text: "Flag Return",
    overviewText: "Flag Return"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.HEADSHOT, {
    text: "Headshot",
    overviewText: "Headshots"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.LONG_RANGE, {
    text: "Long Range",
    overviewText: "Long Range Hits"
}),
ScoreOffsetReasonConfigs.set(NetworkManager.PlayerScoreOffsetReason.FLAG_CAPTURE_ASSIST, {
    text: "Capture Assist",
    overviewText: "Capture Assists"
});
class ScoreOffsetNotificationsUi {
    constructor() {
        this.el = document.createElement("div"),
        this.el.classList.add("score-offset-notifications-container", "fullScreen"),
        document.body.appendChild(this.el),
        this.listEl = document.createElement("div"),
        this.listEl.classList.add("score-offset-notifications-list", "blueNight", "whiteBigText"),
        this.el.appendChild(this.listEl),
        this.createdNotifications = []
    }
    destructor() {
        document.body.removeChild(this.el)
    }
    showOffsetNotification(t, e) {
        const i = ScoreOffsetReasonConfigs.get(e);
        if (!i || i.hideInGame)
            return;
        let s = i.visibilityDuration;
        void 0 === s && (s = 2);
        const n = document.createElement("div");
        n.classList.add("scoreOffsetNotification"),
        this.listEl.appendChild(n),
        this.createdNotifications.unshift({
            el: n,
            destroyTime: Date.now() + 1e3 * s + 1e3
        });
        const a = document.createElement("div");
        if (a.classList.add("scoreOffsetNotificationAnim"),
        a.style.animation = `1s notificationIconFade ${s}s both, 0.2s notificationIconPop`,
        n.appendChild(a),
        i.text) {
            const t = document.createTextNode(i.text + " ");
            a.appendChild(t)
        }
        const o = document.createElement("span");
        o.classList.add("scoreOffsetNotificationScore"),
        o.textContent = `+${t}`,
        a.appendChild(o),
        this.destroyOldNotifications(),
        this.updateNotificationOffsets()
    }
    destroyOldNotifications() {
        let t = -1;
        for (const [e,i] of this.createdNotifications.entries())
            if (i.destroyTime <= Date.now()) {
                t = e;
                break
            }
        if (t >= 0) {
            for (let e = t; e < this.createdNotifications.length; e++) {
                const t = this.createdNotifications[e];
                t.el.parentNode && t.el.parentNode.removeChild(t.el)
            }
            this.createdNotifications.splice(t)
        }
    }
    updateNotificationOffsets() {
        for (const [t,e] of this.createdNotifications.entries())
            e.el.style.transform = `translateY(${-40 * t}px)`
    }
    removeAll() {
        for (; this.listEl.firstChild; )
            this.listEl.removeChild(this.listEl.firstChild)
    }
}
class GameOverStatsDialogUi extends DialogUi {
    constructor({trackedMyPlayerScores: t, totalScore: e, myTeamId: i, receivedCoins: s, autoSkipStatsScreen: n}) {
        super({
            allowCurtainClose: !1
        });
        const a = document.createElement("h2");
        a.classList.add("dialogTitle", "blueNight"),
        a.textContent = "Your Game Stats";
        const o = teamColors[i];
        a.style.color = o.cssColor,
        this.el.appendChild(a),
        this.statsContainer = document.createElement("div"),
        this.statsContainer.classList.add("gameoverStatsContainer", "wrinkledPaper"),
        this.statsContainer.style.cssText = `\n\t\t\tbackground: ${o.cssColorLight};\n\t\t\tbackground: paint(wrinkledPaper);\n\t\t\t--team-bg-color-light: ${o.cssColorLight};\n\t\t\t--team-bg-color-dark: ${o.cssColorDark};\n\t\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        this.el.appendChild(this.statsContainer);
        const r = document.createElement("table");
        r.classList.add("gameOverStatsTable", "itemsTable"),
        this.statsContainer.appendChild(r);
        const l = document.createElement("tbody");
        r.appendChild(l);
        for (const [e,i] of ScoreOffsetReasonConfigs.entries()) {
            const s = t.get(e);
            if (!s)
                continue;
            const n = i.text || i.overviewText
              , a = document.createElement("tr");
            a.classList.add("tableItem"),
            l.appendChild(a);
            const o = document.createElement("td");
            o.textContent = n || "",
            a.appendChild(o);
            const r = document.createElement("td");
            r.textContent = String(s),
            a.appendChild(r)
        }
        const h = document.createElement("tr");
        h.classList.add("tableItem", "totalScoreRow"),
        l.appendChild(h);
        const d = document.createElement("td");
        d.textContent = "Total",
        h.appendChild(d);
        const c = document.createElement("td");
        if (c.textContent = String(e),
        h.appendChild(c),
        this.didWatchRewardedAd = !1,
        this.rewardedAdFailed = !1,
        this.onRewardedAdIsPlayingChangeCbs = new Set,
        s > 0) {
            const t = document.createElement("div");
            t.classList.add("game-over-stats-coins-container"),
            this.el.appendChild(t);
            const e = new CurrencyContainer;
            e.animateAmount(s),
            t.appendChild(e.el);
            const i = new UiButton({
                text: "Claim x2",
                icon: "static/img/rewardedAdIcon.svg",
                iconSize: 1.8,
                extraClasses: ["shake-anim"],
                onClick: async()=>{
                    if (this.skipText.setAllowSpaceSkip(!1),
                    this.skipText.stopTimer(),
                    i.enabled = !1,
                    !this.didWatchRewardedAd) {
                        this.fireRewardedAdIsPlayingChange(!0);
                        const t = await getMainInstance().poki.rewardedBreakWithErrorDialog({
                            category: "multiply-reward",
                            details: "game end double coins",
                            placement: "game-over-screen"
                        });
                        this.fireRewardedAdIsPlayingChange(!1),
                        t ? this.didWatchRewardedAd = !0 : i.enabled = !0
                    }
                    this.skipText.setAllowSpaceSkip(!0);
                    let t = !1;
                    if (this.didWatchRewardedAd) {
                        const a = await getMainInstance().shopState.doubleLastGameCoins();
                        a.success ? (i.visible = !1,
                        e.animateAmount(2 * s),
                        n && this.skipText.startTimer(6),
                        t = !0) : (getMainInstance().dialogManager.showAlert({
                            title: "Server error",
                            text: "An error occurred while doubling your coins."
                        }),
                        console.error(a.error),
                        i.enabled = !0,
                        this.rewardedAdFailed = !0)
                    }
                    t || getMainInstance().network.matchMaking.leaveQueue()
                }
            });
            t.appendChild(i.el)
        }
        this.skipText = new SkipDialogText,
        this.el.appendChild(this.skipText.el),
        this.boundOnResize = this.onResize.bind(this),
        addResizeListener(this.boundOnResize),
        this.onResize()
    }
    onResize() {
        this.el.classList.toggle("topCenter", window.innerHeight < 900);
        const t = clamp(window.innerHeight - 350, 100, 600);
        this.statsContainer.style.maxHeight = t + "px"
    }
    onRewardedAdIsPlayingChange(t) {
        this.onRewardedAdIsPlayingChangeCbs.add(t)
    }
    fireRewardedAdIsPlayingChange(t) {
        this.onRewardedAdIsPlayingChangeCbs.forEach((e=>e(t)))
    }
}
class GameEndWaitTimer {
    constructor(t=0, e="") {
        this.timeSeconds = t,
        this.name = e,
        this.running = !1,
        this.startTime = 0,
        this.onSuddenChangeCbs = new Set
    }
    setTotalTime(t) {
        this.timeSeconds = t
    }
    start() {
        this.running = !0,
        this.startTime = Date.now()
    }
    clear() {
        const t = this.timeRemaining > 1;
        this.cleared = !0,
        t && this.onSuddenChangeCbs.forEach((t=>t()))
    }
    onSuddenChange(t) {
        this.onSuddenChangeCbs.add(t)
    }
    get timeRemaining() {
        if (this.cleared)
            return 0;
        if (this.running) {
            const t = (Date.now() - this.startTime) / 1e3;
            return Math.max(0, this.timeSeconds - t)
        }
        return this.timeSeconds
    }
    toString() {
        let t = this.timeRemaining;
        return t = Math.round(10 * t) / 10,
        `<${this.name} ${t}>`
    }
}
class CornerStat {
    constructor(t, {name: e, redThreshold: i}) {
        this.redThreshold = i,
        this.cornerStatsUi = t,
        this.el = document.createElement("div"),
        this.el.classList.add("corner-stat", "whiteBigText", "blueNight");
        const s = document.createElement("span");
        s.textContent = e + ": ",
        this.el.appendChild(s),
        this.valueEl = document.createElement("span"),
        this.valueEl.textContent = "-",
        this.el.appendChild(this.valueEl)
    }
    setValue(t) {
        this.cornerStatsUi.visible && (this.valueEl.textContent = String(t),
        this.redThreshold && "number" == typeof t && this.valueEl.classList.toggle("red", t > this.redThreshold))
    }
}
class CornerStatsUi {
    constructor(t) {
        this.game = t,
        this.container = document.createElement("div"),
        this.container.classList.add("corner-stats-container", "hidden"),
        document.body.appendChild(this.container),
        this.createdStats = [],
        this.fpsStat = this.createCornerStat({
            name: "FPS"
        }),
        this.pingStat = this.createCornerStat({
            name: "Ping"
        }),
        this.networkStabilityStat = this.createCornerStat({
            name: "Network",
            redThreshold: 5
        }),
        this.visible = !1,
        this._onVisiblityChangeCbs = new Set,
        getMainInstance().settingsManager.onValueChange("showStats", (()=>{
            this.updateVisibility()
        }
        )),
        this.updateVisibility()
    }
    destructor() {
        this.container.parentElement && this.container.parentElement.removeChild(this.container)
    }
    createCornerStat(t) {
        const e = new CornerStat(this,t);
        return this.container.appendChild(e.el),
        this.createdStats.push(e),
        e
    }
    updateVisibility() {
        const t = getMainInstance().settingsManager.getValue("showStats") && this.game.gameStarted && !this.game.gameEnded;
        if (this.visible != t) {
            if (!t)
                for (const t of this.createdStats)
                    t.setValue("-");
            t != this.visible && (this.visible = t,
            this.container.classList.toggle("hidden", !t),
            this._onVisiblityChangeCbs.forEach((t=>t())))
        }
    }
    onVisibilityChange(t) {
        this._onVisiblityChangeCbs.add(t)
    }
}
const bannedWords = ["anal", "anus", "arse", "ballsack", "balls", "bitch", "biatch", "blowjob", "boner", "boob", "butt", "clitoris", "cock", "cunt", "damn", "dick", "dildo", "faggot", "fuck", "homo", "jew", "jizz", "nigger", "nigga", "penis", "piss", "poop", "pussy", "queer", "slut", "twat", "vagina", "whore"];
function containsBadLanguage(t) {
    let e = !1;
    for (const i of bannedWords)
        if (t.toLocaleLowerCase().includes(i)) {
            e = !0;
            break
        }
    return !!e
}
class ChatManager {
    constructor(t) {
        this.game = t,
        this.createdMessages = [],
        this.visible = !1,
        this.toggledVisible = !0,
        this.el = document.createElement("div"),
        this.el.classList.add("chat-container", "wrinkledPaper"),
        this.el.style.cssText = `\n\t\t--wrinkled-paper-seed: ${randInt(1, 99999)};\n\t\t`,
        document.body.appendChild(this.el),
        this.chatLogEl = document.createElement("div"),
        this.chatLogEl.classList.add("chat-log-container"),
        this.el.appendChild(this.chatLogEl),
        this.formEl = document.createElement("form"),
        this.formEl.addEventListener("submit", (t=>{
            this.sendMessage(),
            t.preventDefault()
        }
        )),
        this.el.appendChild(this.formEl),
        this.textBoxEl = document.createElement("input"),
        this.textBoxEl.classList.add("dialog-text-input", "wrinkledPaper", "chat-input"),
        this.textBoxEl.placeholder = "Press T to chat with your squad",
        this.textBoxEl.maxLength = 200,
        this.formEl.appendChild(this.textBoxEl);
        const e = getMainInstance();
        this.chatKey = e.input.getKey("chat"),
        this.boundChatKeyCb = ()=>{
            e.network.squadManager.isInSquad && (e.settingsManager.getValue("chatEnabled") && this.textBoxEl.focus(),
            this.updateVisibility())
        }
        ,
        this.chatKey.onPressedDown(this.boundChatKeyCb),
        this.chatVisibilityKey = e.input.getKey("toggleChatVisibility"),
        this.boundChatVisibilityKeyCb = ()=>{
            this.visible && this.textBoxEl.blur(),
            this.toggledVisible = !this.visible,
            this.updateVisibility(),
            this.visible && this.textBoxEl.focus()
        }
        ,
        this.chatVisibilityKey.onPressedDown(this.boundChatVisibilityKeyCb),
        this.boundUpdateVisibilities = ()=>{
            this.updateVisibility(),
            this.updateTouchButtonVisibility()
        }
        ,
        e.network.squadManager.onUserVisibleSquadIdChange(this.boundUpdateVisibilities),
        this.boundOnTouchSupported = ()=>{
            this.el.classList.toggle("touch", e.input.touch.touchSupported),
            e.input.touch.touchSupported && (this.toggledVisible = !1,
            this.textBoxEl.placeholder = "Type to chat with your squad",
            this.updateVisibility()),
            this.updateTouchButtonVisibility()
        }
        ,
        e.input.touch.onTouchSupportedChange(this.boundOnTouchSupported),
        e.settingsManager.onValueChange("chatEnabled", this.boundUpdateVisibilities),
        e.settingsManager.onValueChange("hideUi", this.boundUpdateVisibilities),
        t.cornerStatsUi.onVisibilityChange((()=>{
            this.updateHeight()
        }
        )),
        t.onGameEndFinish((()=>{
            this.updateVisibility()
        }
        )),
        this.boundOnTouchSupported(),
        this.updateVisibility(),
        this.updateTouchButtonVisibility(),
        this.updateHeight()
    }
    destructor() {
        document.body.removeChild(this.el),
        this.chatKey.removeCb(this.boundChatKeyCb),
        this.chatVisibilityKey.removeCb(this.boundChatVisibilityKeyCb);
        const t = getMainInstance();
        t.network.squadManager.removeOnUserVisibleSquadIdChange(this.boundUpdateVisibilities),
        t.input.touch.removeOnTouchSupportedChange(this.boundOnTouchSupported),
        t.settingsManager.removeOnValueChange("chatEnabled", this.boundUpdateVisibilities),
        t.settingsManager.removeOnValueChange("hideUi", this.boundUpdateVisibilities);
        for (const t of this.createdMessages)
            this.destroyMessage(t);
        this.createdMessages = []
    }
    loop() {
        for (; ; ) {
            const t = this.createdMessages[0];
            if (!t)
                break;
            if (!(performance.now() - t.lastMessageTime > 1e4))
                break;
            this.destroyMessage(t)
        }
    }
    destroyMessage(t) {
        t.avatarBlobReference && t.avatarBlobReference.destructor(),
        this.chatLogEl.removeChild(t.messageEl),
        this.createdMessages = this.createdMessages.filter((e=>e != t)),
        0 == this.createdMessages.length && getMainInstance().input.touch.touchSupported && (this.toggledVisible = !1,
        this.updateVisibility())
    }
    sendMessage() {
        const t = this.textBoxEl.value;
        this.textBoxEl.value = "",
        this.textBoxEl.blur(),
        t && getMainInstance().network.sendChatMessage(t)
    }
    receivedChatMessage(t) {
        let e = this.createdMessages[this.createdMessages.length - 1];
        if ("playerMessage" == t.type) {
            const i = t.data.playerId;
            if (!e || i != e.playerId) {
                const t = document.createElement("div");
                t.classList.add("chat-message-container"),
                this.chatLogEl.appendChild(t);
                let s = null;
                const n = this.game.players.get(i);
                if (n) {
                    const e = n.getSmallAvatar();
                    s = e.getBlobUrlReference();
                    const i = document.createElement("div");
                    i.classList.add("player-avatar"),
                    t.appendChild(i),
                    (async()=>{
                        const t = await s.getBlobUrl();
                        i.style.backgroundImage = `url("${t}")`
                    }
                    )()
                }
                const a = document.createElement("div");
                if (a.classList.add("chat-message-content"),
                t.appendChild(a),
                n) {
                    const t = document.createElement("h3");
                    t.classList.add("chat-message-name"),
                    t.textContent = n.playerName,
                    a.appendChild(t)
                }
                e = {
                    messageEl: t,
                    contentsEl: a,
                    playerId: i,
                    avatarBlobReference: s,
                    lastMessageTime: performance.now()
                },
                this.createdMessages.push(e)
            }
            if (!e)
                throw new Error("Assertion failed, lastMessageData is undefined");
            e.lastMessageTime = performance.now();
            const s = document.createElement("div");
            let n = t.data.message.split(" ");
            n = n.map((t=>containsBadLanguage(t) ? new Array(t.length + 1).join("*") : t)),
            s.textContent = n.join(" "),
            e.contentsEl.appendChild(s),
            s.scrollIntoView({
                behavior: "smooth"
            }),
            this.toggledVisible = !0,
            this.updateVisibility()
        }
    }
    updateVisibility() {
        const t = getMainInstance();
        let e;
        e = !this.game.usedForCameraShotsOnly && (!(!t.settingsManager.getValue("chatEnabled") || t.settingsManager.getValue("hideUi")) && (document.activeElement == this.textBoxEl || !!this.toggledVisible && t.network.squadManager.isInSquad)),
        this.visible = e,
        this.el.classList.toggle("hidden", !e)
    }
    updateTouchButtonVisibility() {
        const t = getMainInstance()
          , e = t.input.touch;
        if (e.chatButton) {
            const i = t.network.squadManager.isInSquad && t.settingsManager.getValue("chatEnabled");
            e.chatButton.setVisibility(i)
        }
    }
    updateHeight() {
        this.el.classList.toggle("up", this.game.cornerStatsUi.visible)
    }
}
class SphereMapCollider extends MapCollider {
    constructor(...t) {
        super(...t),
        this.radius = this.worldMatrix.getMaxScaleOnAxis(),
        this.pos = new Vector3,
        this.pos.setFromMatrixPosition(this.worldMatrix);
        const e = this.pos.clone().subScalar(this.radius)
          , i = this.pos.clone().addScalar(this.radius);
        this.aabb = new Box3(e,i)
    }
    getSphereManifold(t, e) {
        const i = t.clone().sub(this.pos)
          , s = -i.length() + this.radius + e
          , n = i.normalize();
        return {
            colliderType: "sphere",
            pos: this.pos.clone().add(n.clone().multiplyScalar(this.radius)),
            normal: n,
            penetration: s
        }
    }
    rayCast(t, e) {
        const i = this.pos.clone().sub(t)
          , s = i.length();
        if (s < this.radius)
            return {
                dist: 0,
                pos: t.clone(),
                collider: this
            };
        const n = i.clone().projectOnVector(e);
        if (n.dot(e) < 0)
            return null;
        const a = n.length()
          , o = Math.sqrt(s ** 2 - a ** 2);
        if (o > this.radius)
            return null;
        const r = a - Math.sqrt(this.radius ** 2 - o ** 2)
          , l = e.clone();
        l.setLength(r);
        return {
            pos: t.clone().add(l),
            dist: r,
            collider: this
        }
    }
}
class OctreeNode {
    constructor(t, e=0) {
        this.aabb = t,
        this.depth = e,
        this.items = [],
        this.allChildren = [],
        this.children = new Set
    }
    addItems(t) {
        for (const e of t)
            this.items.push(e)
    }
    subdivideRecursive({boundsContainsCb: t, maxDepth: e, itemCountDivideLimit: i}) {
        if (!(this.depth >= e || this.items.length <= i)) {
            this.subdivide();
            for (const s of this.children) {
                for (const e of this.items)
                    t(e, s.aabb) && s.addItems([e]);
                s.items.length <= 0 ? this.children.delete(s) : s.subdivideRecursive({
                    boundsContainsCb: t,
                    maxDepth: e,
                    itemCountDivideLimit: i
                })
            }
            this.items = []
        }
    }
    subdivide() {
        const t = this.aabb.min
          , e = this.aabb.max
          , i = this.aabb.getCenter(new Vector3);
        for (let s = 0; s < 8; s++) {
            const n = new Box3;
            s % 2 < 1 ? (n.min.x = t.x,
            n.max.x = i.x) : (n.min.x = i.x,
            n.max.x = e.x),
            s % 4 < 2 ? (n.min.y = t.y,
            n.max.y = i.y) : (n.min.y = i.y,
            n.max.y = e.y),
            s < 4 ? (n.min.z = t.z,
            n.max.z = i.z) : (n.min.z = i.z,
            n.max.z = e.z);
            const a = new OctreeNode(n,this.depth + 1);
            this.children.add(a),
            this.allChildren[s] = a
        }
    }
    *traverseDown(t=(()=>!0)) {
        if (t(this)) {
            yield this;
            for (const e of this.children)
                for (const i of e.traverseDown(t))
                    yield i
        }
    }
    *findEndNodes(t=(()=>!0)) {
        for (const e of this.traverseDown(t))
            0 != e.items.length && (yield e)
    }
}
class PhysicsManager {
    constructor() {
        this.rigidBodies = new Set,
        this.mapColliders = [],
        this.rootOctreeNode = null,
        this.octreeMaxDepth = 5,
        this.mapBounds = null,
        this.octreeAxisVoxelCount = 0,
        this.worldToOctreeVoxelSpaceMultiplier = new Vector3,
        this.isLoweringTimeScale = !1,
        this.timeScale = 1,
        this.stepCount = 10
    }
    destructor() {}
    loop(t, e) {
        this.isLoweringTimeScale && (this.timeScale -= 3e-4 * e,
        this.timeScale < .01 && (this.timeScale = .01,
        this.isLoweringTimeScale = !1));
        for (const t of this.rigidBodies)
            t.enabled && t.beginPhysicsSteps();
        const i = e * this.timeScale / 1e3 / this.stepCount;
        for (let t = 0; t < this.stepCount; t++) {
            for (const t of this.rigidBodies)
                t.enabled && t.stepVelocity(i);
            for (const t of this.rigidBodies)
                t.enabled && t.resolveMapCollisionsOctree(i)
        }
        for (const t of this.rigidBodies)
            t.enabled && t.endPhysicsSteps()
    }
    startLoweringTimeScale() {
        this.isLoweringTimeScale = !0
    }
    resetTimeScale() {
        this.isLoweringTimeScale = !1,
        this.timeScale = 1
    }
    registerRigidBody(t) {
        return this.rigidBodies.add(t),
        t
    }
    removeRigidBody(t) {
        this.rigidBodies.delete(t)
    }
    addMapCollider(t) {
        const e = (new Matrix4).fromArray(t.matrix);
        let i;
        return i = "sphere" == t.colliderType ? new SphereMapCollider(e,t) : new BoxMapCollider(e,t),
        this.mapColliders.push(i),
        i
    }
    removeMapColliders() {
        this.mapColliders = [],
        this.rootOctreeNode = null
    }
    buildOctree() {
        if (this.mapColliders.length <= 0)
            return;
        const t = new Box3;
        for (const e of this.mapColliders)
            e.aabb && (t.expandByPoint(e.aabb.min),
            t.expandByPoint(e.aabb.max));
        this.mapBounds = t,
        this.octreeAxisVoxelCount = Math.pow(2, this.octreeMaxDepth);
        const e = t.getSize(new Vector3);
        this.worldToOctreeVoxelSpaceMultiplier.set(1, 1, 1),
        this.worldToOctreeVoxelSpaceMultiplier.divide(e),
        this.worldToOctreeVoxelSpaceMultiplier.multiplyScalar(this.octreeAxisVoxelCount),
        this.rootOctreeNode = new OctreeNode(t),
        this.rootOctreeNode.addItems(this.mapColliders),
        this.rootOctreeNode.subdivideRecursive({
            boundsContainsCb: (t,e)=>!!t.aabb && t.aabb.intersectsBox(e),
            maxDepth: this.octreeMaxDepth,
            itemCountDivideLimit: 10
        })
    }
    getOctreeNodesInAabb(t, e=!0) {
        const i = new Set;
        if (!this.rootOctreeNode)
            return i;
        const s = this.worldToOctreeVoxelSpace(t.min)
          , n = this.worldToOctreeVoxelSpace(t.max);
        for (let t = s[0]; t <= n[0]; t++)
            for (let a = s[1]; a <= n[1]; a++)
                for (let o = s[2]; o <= n[2]; o++) {
                    const s = this.octreeVoxelSpaceToNodePath([t, a, o]);
                    if (s) {
                        const t = this.getOctreeNodeForPath(s);
                        t && (t.items.length > 0 || !e) && i.add(t)
                    }
                }
        return i
    }
    getCollidersFromOctreeNodes(t) {
        const e = new Set;
        for (const i of t)
            for (const t of i.items)
                e.add(t);
        return e
    }
    getCollidersForAabbUsingOctree(t) {
        return this.getCollidersFromOctreeNodes(this.getOctreeNodesInAabb(t))
    }
    worldToOctreeVoxelSpace(t) {
        const e = t.clone();
        if (!this.mapBounds)
            throw new Error("Failed to convert coordinate, octree hasn't been built");
        return e.clamp(this.mapBounds.min, this.mapBounds.max),
        e.sub(this.mapBounds.min),
        e.multiply(this.worldToOctreeVoxelSpaceMultiplier),
        [Math.floor(e.x), Math.floor(e.y), Math.floor(e.z)]
    }
    octreeVoxelSpaceToNodePath(t) {
        const e = t[0]
          , i = t[1]
          , s = t[2];
        if (e < 0 || i < 0 || s < 0 || e > this.octreeAxisVoxelCount - 1 || i > this.octreeAxisVoxelCount - 1 || s > this.octreeAxisVoxelCount - 1)
            return null;
        let n = this.octreeAxisVoxelCount
          , a = this.octreeAxisVoxelCount
          , o = this.octreeAxisVoxelCount;
        const r = [];
        for (let t = 0; t < this.octreeMaxDepth; t++) {
            const t = n >> 1
              , l = a >> 1
              , h = o >> 1;
            let d = 0;
            e % n >= t && (d += 1),
            i % a >= l && (d += 2),
            s % o >= h && (d += 4),
            r.push(d),
            n = t,
            a = l,
            o = h
        }
        return r
    }
    getOctreeNodeForPath(t) {
        let e = this.rootOctreeNode;
        for (const i of t) {
            if (!e)
                return null;
            if (e.allChildren.length <= 0)
                return e;
            e = e.allChildren[i]
        }
        return e
    }
    *getColliders() {
        for (const t of this.mapColliders)
            yield t;
        for (const t of this.getPlayerColliders())
            yield t
    }
    *getPlayerColliders() {
        for (const t of this.rigidBodies)
            if (t instanceof PlayerRigidBody)
                for (const e of t.colliders)
                    yield e
    }
    getRayCastCache(t, e) {
        const i = e.clone().sub(t);
        if (i.setLength(1),
        0 == i.length())
            return null;
        const s = new Box3;
        s.expandByPoint(t),
        s.expandByPoint(e);
        const n = this.getOctreeNodesInAabb(s);
        return {
            from: t.clone(),
            to: e.clone(),
            dir: i,
            length: t.distanceTo(e),
            octreeNodes: n
        }
    }
    rayCastMapColliders(t, e=null) {
        return this.rayCastHelper(t, this.getCollidersFromOctreeNodes(t.octreeNodes), e)
    }
    rayCastPlayerColliders(t, e=null) {
        return this.rayCastHelper(t, this.getPlayerColliders(), e)
    }
    rayCastHelper(t, e, i=null) {
        let s = null;
        for (const n of e) {
            const e = n.rayCast(t.from, t.dir);
            if (e && e.dist < t.length && (!s || e.dist < s.dist)) {
                const t = e;
                if (i && !i(t))
                    continue;
                s = t
            }
        }
        return s
    }
}
class MapVariablesManager {
    constructor() {
        this.lastReceivedGlobalVariables = {},
        this.lastReceivedRandomVariablesArray = [],
        this.currentVariablesIndex = -1,
        this.variablesIndexSeed = 123,
        this.defaultValues = {
            floorDeathHeight: -16,
            sphereDeathRadius: 0,
            cloudsHeight: 0,
            waterSfxVolume: 0,
            waterSfxHeight: 0,
            windSfxVolume: .002,
            windSfxBoostVolume: 0,
            windSfxBoostHeight: 0,
            birdsSfxVolume: .003,
            jungleSfxVolume: 0,
            rainSfxVolume: 0,
            insectsSfxVolume: 0,
            skyHighColor: [0, .415, .96],
            skyMidColor: [.807, .89, .933],
            skyLowColor: [.807, .89, .933],
            skyPower: .6,
            fogAmount: .002,
            fogHeightAmount: 0,
            fogHeightOffset: 0,
            fogHeightDistFalloff: 0,
            fogHeightAmountMin: 0,
            fogHeightAmountMax: 1,
            colorMultiplier: [.78, .811, .941],
            colorMultiplierAdjust: .15,
            colorAdder: [.007, .011, .011],
            colorAdderAdjust: -.009,
            saturation: 1.2,
            lightningEnabled: !1
        },
        this.onVariablesChangedCbs = new Set,
        this.currentVariables = {
            ...this.defaultValues
        }
    }
    init() {}
    setVariables(t, e) {
        this.lastReceivedGlobalVariables = t || {},
        this.lastReceivedRandomVariablesArray = e,
        this.updateVariablesIndex(),
        this.updateVariablesFromArray()
    }
    updateVariablesIndex() {
        if (0 == this.lastReceivedRandomVariablesArray.length)
            this.currentVariablesIndex = -1;
        else {
            const t = Array.from(this.lastReceivedRandomVariablesArray.entries()).map((([t,e])=>({
                probability: Math.max(0, e.probability || 1),
                item: t
            })));
            this.currentVariablesIndex = randFromArrayWithProbabilitySeed(t, this.variablesIndexSeed) ?? -1
        }
    }
    setSeed(t) {
        this.variablesIndexSeed = t,
        this.updateVariablesIndex(),
        this.updateVariablesFromArray()
    }
    updateVariablesFromArray() {
        const t = this.lastReceivedRandomVariablesArray[this.currentVariablesIndex];
        this.currentVariables = {
            ...this.defaultValues,
            ...this.lastReceivedGlobalVariables,
            ...t
        },
        this.onVariablesChangedCbs.forEach((t=>t()))
    }
    onVariablesChanged(t) {
        this.onVariablesChangedCbs.add(t)
    }
    get(t) {
        return this.currentVariables[t]
    }
}
class MapLoader {
    constructor(t, e) {
        this.configManager = t,
        this.mapsConfig = e,
        this.onIsLoadingMapChangeCbs = new Set,
        this.isLoadingMap = !1,
        this.loadCloudsCalled = !1,
        this.environmentIsInit = !1,
        this.cachedMapHashes = new Set,
        this.fetchingMapCbs = new Map,
        this.onOneMapAvailableCbs = new Set,
        this.firstMapDownloaded = !1,
        this.onFirstMapDownloadedCbs = new Set,
        this.onMapCachedCbs = new Set,
        this.mapVariablesManager = new MapVariablesManager,
        this.mapVariablesManager.onVariablesChanged((()=>{
            this.updateWeatherParams(),
            this.updateCloudHeight()
        }
        )),
        this.cloudsObj = null,
        this.currentLoadingMapContexts = new Map,
        this.lastMapLoadRequestId = 0
    }
    async init() {
        if (getMainInstance(),
        this.mapsConfig.onConfigChange((async t=>{
            this.cachedMapHashes.clear();
            const e = await this.openCache();
            if (e) {
                const i = [];
                let s = !1;
                for (const n of t.maps) {
                    const t = new URL(this.configManager.basePath + "maps/" + n.assetName + ".glb");
                    t.searchParams.set("hash", n.hash);
                    const a = (async i=>{
                        let a = !1;
                        try {
                            await e.match(t.href) && (a = !0)
                        } catch (t) {
                            console.warn("Couldn't get map (" + n.assetName + ".glb) from cache", t)
                        }
                        a && (s = !0,
                        this.markMapAsCached(n.hash, !1))
                    }
                    )();
                    i.push(a)
                }
                await Promise.all(i),
                s && this.fireOnMapCachedCbs()
            }
            this.cacheRemainingMaps(),
            this.deleteOldMapCaches()
        }
        )),
        await this.mapsConfig.waitForConfigLoad(),
        !this.mapsConfig.loadedConfigData)
            throw new Error("Assertion error, mapsconfig isn't loaded");
        this.deleteLegacyCaches(),
        this.mapVariablesManager.init()
    }
    async cacheRemainingMaps() {
        const t = getMainInstance();
        if (await this.waitForFirstMapDownload(),
        await t.assets.getPackage("main").waitForLoad(),
        !this.mapsConfig.loadedConfigData)
            throw new Error("Assertion error, mapsconfig isn't loaded");
        try {
            const e = await t.assets.getMessenger();
            await e.send.cacheRemainingMaps(Array.from(this.cachedMapHashes), this.mapsConfig.loadedConfigData)
        } catch (t) {
            if (t instanceof AggregateError)
                for (const e of t.errors)
                    e instanceof Error && console.error(e.message)
        }
    }
    async openCache() {
        if ("undefined" == typeof caches)
            return null;
        try {
            return await caches.open("maps")
        } catch (t) {
            return null
        }
    }
    markMapAsCached(t, e=!0) {
        this.cachedMapHashes.has(t) || (this.cachedMapHashes.add(t),
        this.fireFirstMapAvailable(),
        e && this.fireOnMapCachedCbs())
    }
    hasCachedMap(t) {
        return this.cachedMapHashes.has(t)
    }
    async deleteLegacyCaches() {
        if ("undefined" == typeof caches)
            return;
        let t = [];
        try {
            t = await caches.keys()
        } catch (t) {
            console.warn("Unable to delete old map caces", t)
        }
        const e = /^mapsV(\d+)$/;
        for (const i of t) {
            i.match(e) && (async()=>{
                try {
                    caches.delete(i)
                } catch (t) {
                    console.warn(`Unable to delete old map cache "${i}""`, t)
                }
            }
            )()
        }
    }
    async deleteOldMapCaches() {
        const t = this.mapsConfig.loadedConfigData;
        if (!t)
            return;
        const e = await this.openCache();
        if (e)
            for (const i of await e.keys()) {
                let s = !1;
                const n = new URL(i.url).searchParams.get("hash");
                if (n)
                    for (const e of t.maps)
                        if (e.hash == n) {
                            s = !0;
                            break
                        }
                s || await e.delete(i)
            }
    }
    async waitForOneMapAvailable() {
        if (this.cachedMapHashes.size > 0)
            return;
        const t = new Promise((t=>this.onOneMapAvailableCbs.add(t)));
        await t
    }
    fireFirstMapAvailable() {
        for (const t of this.onOneMapAvailableCbs)
            t();
        this.onOneMapAvailableCbs.clear()
    }
    async waitForFirstMapDownload() {
        if (this.firstMapDownloaded)
            return;
        const t = new Promise((t=>this.onFirstMapDownloadedCbs.add(t)));
        await t
    }
    onMapCached(t) {
        this.onMapCachedCbs.add(t)
    }
    fireOnMapCachedCbs() {
        this.onMapCachedCbs.forEach((t=>t()))
    }
    reloadMap() {
        this.lastLoadMapRequest && this.loadMap(this.lastLoadMapRequest.options, this.lastLoadMapRequest.cb)
    }
    async loadDevMap(t) {
        await this.loadMap({
            request: {
                type: "dev"
            },
            computeNormals: !1
        }, t)
    }
    async loadLoadingMap(t) {
        await this.loadMap({
            request: {
                type: "loading"
            },
            computeNormals: !1
        }, t)
    }
    async loadConfigMap(t, e, {retryOnFail: i=!1}={}) {
        const s = this.mapsConfig.getListedMapConfigByHash(t);
        try {
            if (!s)
                throw new MapLoadError(`Failed to load map, "${t}" is not in the mapsConfig.`,"map-not-in-config");
            await this.loadMap({
                request: {
                    type: "config",
                    config: s
                }
            }, e)
        } catch (s) {
            if (!(s instanceof MapLoadError))
                throw s;
            if (!i)
                throw s;
            await this.reloadMapsConfigAndRetryLoadConfigMap(t, e)
        }
    }
    async loadConfigMapWithDialogMessage(t, e) {
        try {
            return await this.loadConfigMap(t, e, {
                retryOnFail: !0
            }),
            !0
        } catch (t) {
            console.error(t);
            const e = getMainInstance()
              , i = e.dialogManager
              , s = "Failed to load map";
            if (t instanceof MapLoadError && "hash-validation-failed" == t.name)
                i.showAlert({
                    title: s,
                    text: "Something went wrong while verifying the map."
                });
            else if (t instanceof MapLoadError && "map-not-in-config" == t.name) {
                const t = "The game you tried to join is using a map that is no longer available"
                  , n = e.network.squadManager.isInSquad ? "please wait until the squad has started a new game" : "please try joining another game";
                i.showAlert({
                    title: s,
                    text: `${t}, ${n}.`
                })
            } else
                i.showAlert({
                    title: s,
                    text: "Something went wrong while loading the map. Please try again."
                });
            return !1
        }
    }
    async loadMap(t, e) {
        const i = getMainInstance().mainInfoTextManager.requestInfoText("Loading map...", {
            showPercentage: !0,
            priority: 1,
            startLoading: !0
        });
        i.setPercentage(0),
        this.initEnvironment();
        const s = this.lastMapLoadRequestId++;
        this.currentLoadingMapContexts.set(s, {
            cb: e,
            loadingText: i
        });
        const n = await getMainInstance().assets.getMessenger();
        try {
            const a = await n.send.loadMap(t, s);
            this.loadMapResponseCbReceived(a, e)
        } finally {
            getMainInstance().mainInfoTextManager.removeInfoText(i),
            this.currentLoadingMapContexts.delete(s)
        }
    }
    async reloadMapsConfigAndRetryLoadConfigMap(t, e) {
        return await this.mapsConfig.load(),
        await this.loadConfigMap(t, e, {
            retryOnFail: !1
        })
    }
    reportFirstMapDownloaded() {
        if (!this.firstMapDownloaded) {
            this.firstMapDownloaded = !0;
            for (const t of this.onFirstMapDownloadedCbs)
                t();
            this.onFirstMapDownloadedCbs.clear()
        }
    }
    reportMapLoadProgress(t, e) {
        const i = this.currentLoadingMapContexts.get(e);
        i && i.loadingText.setPercentage(t)
    }
    setGamplayObjects(t, e) {
        const i = this.currentLoadingMapContexts.get(e);
        if (!i)
            return;
        const s = t.flags.map((t=>({
            flagTeamId: t.flagTeamId,
            pos: (new Vector3).fromArray(t.pos),
            rot: (new Quaternion).fromArray(t.rot)
        })))
          , n = t.spawnPositions.map((t=>t.map((t=>({
            pos: (new Vector3).fromArray(t.pos),
            rot: (new Quaternion).fromArray(t.rot)
        })))));
        i.cb({
            type: "colliders",
            colliders: t.colliders
        });
        const a = {
            flags: s,
            spawnPositions: n,
            mapName: t.mapName
        };
        i.cb({
            type: "gameplay-data",
            gameplayData: a
        })
    }
    loadMapResponseCbReceived(t, e) {
        const i = AssetsManager.deserializeThreeObject(t.scene);
        i.traverse((t=>{
            t.frustumCulled = !1
        }
        ));
        const s = [];
        for (const {object: e, behavior: i} of t.hingeObjects) {
            const t = AssetsManager.deserializeThreeObject(e);
            s.push({
                hinge: t,
                behavior: i
            })
        }
        const n = [];
        for (const {objects: e, triggers: i, behavior: s} of t.appearingObjects) {
            const t = [];
            for (const i of e) {
                const e = AssetsManager.deserializeThreeObject(i.object)
                  , s = (new Vector3).fromArray(i.startOffset);
                t.push({
                    ...i,
                    startOffset: s,
                    object: e
                })
            }
            const a = [];
            for (const t of i)
                a.push({
                    pos: (new Vector3).fromArray(t.pos),
                    radius: t.radius
                });
            n.push({
                objects: t,
                triggers: a,
                behavior: s
            })
        }
        if (e({
            type: "scene",
            scene: i,
            appearingObjects: n,
            hinges: s
        }),
        t.lobbyCamPositions) {
            const e = t.lobbyCamPositions.map((t=>({
                posA: (new Vector3).fromArray(t.posA),
                rotA: (new Quaternion).fromArray(t.rotA),
                posB: (new Vector3).fromArray(t.posB),
                rotB: (new Quaternion).fromArray(t.rotB)
            })));
            getMainInstance().cam.setLobbyCamPositions(e)
        }
        t.mapConfig ? this.mapVariablesManager.setVariables(t.mapConfig.globalMapVariables || null, t.mapConfig.randomMapVariableSets || []) : this.mapVariablesManager.setVariables(null, []),
        this.fireFirstMapAvailable()
    }
    initEnvironment() {
        if (this.environmentIsInit)
            return;
        getMainInstance().materials.precompileShaders(),
        this.updateWeatherParams();
        const t = new SphereGeometry(700,8,6)
          , e = new Mesh(t,getMainInstance().materials.skyDomeMat);
        e.frustumCulled = !1,
        e.name = "skydome",
        e.renderOrder = -1,
        getMainInstance().scene.add(e),
        this.environmentIsInit = !0
    }
    updateWeatherParams() {
        const t = new Color(...this.mapVariablesManager.get("colorMultiplier"));
        t.addScalar(this.mapVariablesManager.get("colorMultiplierAdjust"));
        const e = new Color(...this.mapVariablesManager.get("colorAdder"));
        e.addScalar(this.mapVariablesManager.get("colorAdderAdjust")),
        getMainInstance().materials.applyWeatherParams({
            colorMultiplier: t,
            colorAdder: e,
            fogAmount: this.mapVariablesManager.get("fogAmount"),
            fogHeightAmount: this.mapVariablesManager.get("fogHeightAmount"),
            fogHeightOffset: this.mapVariablesManager.get("fogHeightOffset"),
            fogHeightDistFalloff: this.mapVariablesManager.get("fogHeightDistFalloff"),
            fogHeightAmountMin: this.mapVariablesManager.get("fogHeightAmountMin"),
            fogHeightAmountMax: this.mapVariablesManager.get("fogHeightAmountMax"),
            saturation: this.mapVariablesManager.get("saturation"),
            skyHighColor: new Color(...this.mapVariablesManager.get("skyHighColor")),
            skyMidColor: new Color(...this.mapVariablesManager.get("skyMidColor")),
            skyLowColor: new Color(...this.mapVariablesManager.get("skyLowColor")),
            skyPower: this.mapVariablesManager.get("skyPower")
        })
    }
    updateCloudHeight() {
        this.cloudsObj && (this.cloudsObj.position.y = this.mapVariablesManager.get("cloudsHeight"))
    }
    static disposeMapGeometries(t) {
        t.traverse((t=>{
            t instanceof Mesh && t.geometry.dispose()
        }
        ))
    }
    async loadClouds() {
        if (this.loadCloudsCalled)
            return;
        this.loadCloudsCalled = !0;
        const t = await getMainInstance().assets.getPackage("main").getFileAsBuffer("clouds.glb")
          , e = await getMainInstance().assets.getMessenger()
          , i = await e.send.loadClouds(t);
        this.cloudsObj = AssetsManager.deserializeThreeObject(i),
        this.cloudsObj && getMainInstance().scene.add(this.cloudsObj),
        this.updateCloudHeight()
    }
}
class PreferredMapManager {
    constructor(t, e) {
        this.mapLoader = t,
        this.mapsConfigLoader = e,
        this.votedScores = new Map,
        this._forcingSoloMap = null,
        this.onMatchMakeDataChangeCbs = new Set,
        t.onMapCached((()=>{
            this.onMatchMakeDataChangeCbs.forEach((t=>t()))
        }
        ))
    }
    onMatchMakeDataChange(t) {
        this.onMatchMakeDataChangeCbs.add(t)
    }
    getMatchMakePreferredMapHashes() {
        if (!this.mapsConfigLoader.loadedConfigData)
            return null;
        const t = []
          , e = this.forcingSoloMap;
        e && t.push({
            hash: e,
            preference: 1
        });
        let i = 1 / 0
          , s = -1 / 0;
        for (const n of this.mapsConfigLoader.loadedConfigData.maps) {
            if (e && e !== n.hash)
                continue;
            if (!this.mapLoader.hasCachedMap(n.hash))
                continue;
            let a = 0;
            const o = this.votedScores.get(n.assetName);
            o && (a = o.votedScore,
            o.hasTemporaryBoost && (a += .5),
            a -= mapValue(0, 3, 1, 0, o.lastPlayedCounter, !0)),
            i = Math.min(i, a),
            s = Math.max(s, a),
            t.push({
                hash: n.hash,
                preference: a
            })
        }
        if (i = clamp01(i),
        s = clamp(s, i, 1),
        i == s)
            for (const e of t)
                e.preference = 0;
        else
            for (const e of t)
                e.preference = mapValue(i, s, 0, 1, e.preference, !0);
        return t
    }
    getMatchMakeData() {
        if (!this.mapsConfigLoader.loadedConfigData)
            return null;
        const t = this.getMatchMakePreferredMapHashes();
        if (!t)
            return null;
        return {
            op: "preferredMapHashes",
            mapHashes: t,
            configTimestamp: this.mapsConfigLoader.loadedConfigData.lastUpdatedTimestamp
        }
    }
    getRandomPreferredMapHash() {
        const t = this.getMatchMakePreferredMapHashes();
        if (!t)
            return null;
        const e = randFromArrayWithProbability(t.map((t=>({
            probability: t.preference,
            item: t.hash
        }))));
        if (e)
            return e;
        const i = randFromArray(t);
        return i ? i.hash : null
    }
    getOrCreateMapVoteData(t) {
        let e = this.votedScores.get(t);
        return e || (e = {
            votedScore: 0,
            hasTemporaryBoost: !1,
            lastPlayedCounter: 0
        },
        this.votedScores.set(t, e),
        e)
    }
    voteMap(t) {}
    markRecentMap(t) {
        const e = this.mapsConfigLoader.getListedMapConfigByHash(t);
        if (!e)
            return;
        for (const t of this.votedScores.values())
            t.lastPlayedCounter++;
        this.getOrCreateMapVoteData(e.assetName).lastPlayedCounter = 0
    }
    forceSoloMap(t) {
        this._forcingSoloMap = t,
        this.onMatchMakeDataChangeCbs.forEach((t=>t()))
    }
    disableForcedSoloMap() {
        this._forcingSoloMap = null,
        this.onMatchMakeDataChangeCbs.forEach((t=>t()))
    }
    get isForcingSoloMap() {
        return !!this._forcingSoloMap
    }
    get forcingSoloMap() {
        return this._forcingSoloMap
    }
}
class AppearingObjectsManager {
    constructor() {
        this.appearingObjects = [],
        this.destructed = !1
    }
    destructor() {
        this.destructed = !0,
        this.removeObjects()
    }
    removeObjects() {
        const t = getMainInstance().scene;
        for (const {objects: e} of this.appearingObjects)
            for (const i of e)
                t.remove(i.object);
        this.appearingObjects = []
    }
    setAppearingObjects(t) {
        if (this.destructed)
            return;
        this.removeObjects();
        const e = getMainInstance().scene;
        for (const {objects: i, triggers: s, behavior: n} of t) {
            const t = [];
            for (const s of i)
                s.object.matrixAutoUpdate = !1,
                s.object.visible = !1,
                e.add(s.object),
                t.push({
                    ...s,
                    startPos: s.object.position.clone().add(s.startOffset),
                    endPos: s.object.position.clone(),
                    animationFinished: !1
                });
            this.appearingObjects.push({
                objects: t,
                triggers: s,
                hasBeenTriggered: !1,
                allAnimationsFinished: !1,
                t: 0,
                behavior: n
            })
        }
    }
    updatePlayerPositions(t) {
        for (const e of this.appearingObjects) {
            const i = "appear" == e.behavior || "toggle" == e.behavior
              , s = "toggle" == e.behavior;
            if (e.hasBeenTriggered && !s)
                continue;
            let n = !0;
            for (const i of e.triggers) {
                let e = !1;
                for (const s of t)
                    if (s.distanceTo(i.pos) < i.radius) {
                        e = !0;
                        break
                    }
                if (!e) {
                    n = !1;
                    break
                }
            }
            if (i && n) {
                e.hasBeenTriggered = !0;
                let t = 0;
                for (const {object: i, duration: s} of e.objects)
                    i.visible = !0,
                    t = Math.max(s, t);
                getMainInstance().renderer.renderWorthyEventHappened(1e3 * t)
            }
            if (s && !n) {
                e.hasBeenTriggered = !1,
                e.t = 0,
                e.allAnimationsFinished = !1;
                for (const t of e.objects)
                    t.animationFinished = !1,
                    t.object.visible = !1;
                getMainInstance().renderer.renderWorthyEventHappened()
            }
        }
    }
    loop(t, e) {
        for (const t of this.appearingObjects) {
            if (!t.hasBeenTriggered || t.allAnimationsFinished)
                continue;
            let i = !0;
            t.t += .001 * e;
            for (const e of t.objects) {
                if (e.animationFinished)
                    continue;
                let s = mapValue(0, e.duration, 0, 1, t.t, !0);
                s = -(Math.cos(Math.PI * s) - 1) / 2,
                e.object.position.lerpVectors(e.startPos, e.endPos, s),
                e.object.updateMatrix(),
                e.object.updateWorldMatrix(!1, !0),
                s >= 1 ? e.animationFinished = !0 : i = !1
            }
            i && (t.allAnimationsFinished = !0)
        }
    }
}
class HingeManager {
    constructor() {
        this.hingeObjects = [],
        this.activeHingeObjects = new Map,
        this.onHingeMoveCbs = new Map,
        this.destructed = !1
    }
    destructor() {
        this.setHingeObjects([]),
        this.destructed = !0
    }
    setHingeObjects(t) {
        if (this.destructed)
            return;
        const e = getMainInstance().scene;
        for (const {object: t} of this.hingeObjects)
            e.remove(t);
        this.hingeObjects = [],
        this.activeHingeObjects.clear();
        for (const {hinge: i, behavior: s} of t) {
            i.matrixAutoUpdate = !1;
            (new Quaternion).setFromRotationMatrix(i.matrixWorld),
            this.hingeObjects.push({
                object: i,
                behavior: s,
                defaultWorldMatrix: i.matrixWorld.clone(),
                defaultWorldMatrixInv: i.matrixWorld.clone().invert(),
                worldPos: i.position.clone()
            }),
            e.add(i)
        }
    }
    shootHinge(t, e, i) {
        const s = this.hingeObjects[t];
        if (!s)
            return null;
        let n = .99
          , a = 5e-4
          , o = .001;
        "light-sturdy" == s.behavior && (n = .9,
        a = .01,
        o = .001);
        let r = this.activeHingeObjects.get(t);
        r || (r = {
            physicsValue: new PhysicsValue({
                dampening: n,
                springMultiplier: a
            })
        },
        this.activeHingeObjects.set(t, r));
        const l = e.clone().add(i);
        e = e.clone().applyMatrix4(s.defaultWorldMatrixInv),
        i = l.clone().applyMatrix4(s.defaultWorldMatrixInv),
        e.z = 0,
        i.z = 0;
        const h = e.clone().cross(i);
        return r.physicsValue.velocity += o * h.z,
        s
    }
    onHingeMove(t, e) {
        let i = this.onHingeMoveCbs.get(t);
        i || (i = new Set,
        this.onHingeMoveCbs.set(t, i)),
        i.add(e)
    }
    removeOnHingeMove(t, e) {
        const i = this.onHingeMoveCbs.get(t);
        i && (i.delete(e),
        i.size <= 0 && this.onHingeMoveCbs.delete(t))
    }
    loop(t, e) {
        for (const [i,s] of this.activeHingeObjects) {
            const n = this.hingeObjects[i]
              , {object: a, defaultWorldMatrix: o} = n;
            s.physicsValue.loop(t, e),
            a.matrix.makeRotationZ(s.physicsValue.value),
            a.matrix.premultiply(o),
            a.matrixWorld.copy(a.matrix),
            Math.abs(s.physicsValue.value) < 1e-4 && Math.abs(s.physicsValue.velocity) < 1e-5 && this.activeHingeObjects.delete(i);
            const r = this.onHingeMoveCbs.get(i);
            r && r.forEach((t=>t(n)))
        }
    }
}
function computeExpectedWinChance(t, e) {
    const i = Math.pow(10, t / 400);
    return i / (i + Math.pow(10, e / 400))
}
function computeDeltaElo(t, e, i) {
    return t + 32 * (i - computeExpectedWinChance(t, e)) - t
}
class Game {
    constructor() {
        this.teamCount = 3,
        this.physics = new PhysicsManager,
        this.players = new Map,
        this.hingeManager = new HingeManager,
        this.arrowManager = new ArrowManager(this.physics,this.hingeManager,this.teamCount),
        this.crosshair = new Crosshair,
        this.flags = [],
        this.appearingObjectsManager = new AppearingObjectsManager,
        this.gameIsVisible = !1,
        this.receivedColliders = !1,
        this.scene = null,
        this.onGameIsVisibleCbs = new Set,
        this.onUsedForCamShotsOnlyChangeCbs = new Set,
        this._usedForCameraShotsOnly = !1,
        this.uiVisible = !1,
        this.flagScoreUi = new FlagScoreUi(this.teamCount),
        this.flagScoreUi.onNeedsNotification(this.showFlagNotification.bind(this)),
        this.healthUi = new HealthUi,
        this.weaponSelectionDialog = new WeaponSelectionDialogUi,
        getMainInstance().dialogManager.addDialog(this.weaponSelectionDialog),
        this.playersListDialog = new PlayersListDialogUi(this.players,getMainInstance().skins,(()=>(this.playersListDialog.visible = !1,
        !1))),
        getMainInstance().dialogManager.addDialog(this.playersListDialog),
        this.gameOverStatsDialog = null,
        this.cornerNotificationsUi = new NotificationIconsUi,
        this.gameOverNotificationsUi = new NotificationIconsUi("centerbig"),
        this.crosshairNotificationsUi = new NotificationIconsUi("crosshair"),
        this.scoreOffsetNotificationsUi = new ScoreOffsetNotificationsUi,
        this.cornerStatsUi = new CornerStatsUi(this),
        this.waitingForPlayersInfoText = getMainInstance().mainInfoTextManager.requestInfoText("Waiting for players...", {
            shouldBounce: !1,
            showInMainMenu: !1
        }),
        this.gameEndLoweringTimeScaleDuration = 6,
        this.gameEndTitleDurationWin = 3,
        this.gameEndTitleDurationLose = 2,
        this.gameEndPlayersListDuration = 6,
        this.gameEndShowStatsDuration = 8,
        this.gameEndRewardedAdDuration = 15,
        this.gameEndShowStatsAfterRewardedDuration = 6,
        this.trackedMyPlayerScores = new Map,
        this.avgRedTeamElo = 0,
        this.avgBlueTeamElo = 0,
        this.spawnPositions = [],
        this.lobbypawnPositions = [],
        this.isForegroundGame = !1,
        this.gameStartTime = 0,
        this.gameStarted = !1,
        this.gameEnded = !1,
        this.gameSeed = 0,
        this.onGameSeedChangeCbs = new Set,
        this.finishedGameEndFlow = !1,
        this.destructed = !1,
        this.shouldPlayFinalFlagMusic = !1,
        this.currentFinalFlagMusic = null,
        this.currentGameEndWaitingMusic = null,
        this.onMyPlayerChangeCbs = new Set,
        this.onGameEndCbs = new Set,
        this.onGameEndFinishCbs = new Set,
        this.gameEndWaitTimers = [],
        this.gameEndTimerSuddenChangeDisabled = !1,
        this.onEstimatedMaxGameEndWaitTimeSuddenChangeCbs = new Set,
        this.onSdkGameplayStartedChangeCbs = new Set,
        this.onSquadPlayersChangeCbs = new Set,
        this.onGameEndAccountStatsChangeCbs = new Set,
        this.gameEndStepsReachedStatScreens = !1,
        this.onGameEndStatsScreenCbs = new Set,
        this.isDoingGameEndSteps = !1,
        this.gameEndMyTotalScore = 0,
        this.gameEndReceivedCoins = 0,
        this.gameEndShowStatsScreen = !1,
        this.gameEndStatsShowTimer = null,
        this.gameEndAdBreakTimer = null,
        this.gameEndRewardedAdTimer = null,
        this.gameEndStatsAfterRewardedAdTimer = null,
        this.currentLoadedMapHash = null,
        this.boundUpdateUiVisible = this.updateUiVisible.bind(this),
        getMainInstance().mainMenu.onVisibilityChange(this.boundUpdateUiVisible),
        this.updateUiVisible(),
        this.boundOnPlayerListDown = this.onPlayerListDown.bind(this),
        this.boundOnPlayerListUp = this.onPlayerListUp.bind(this);
        const t = getMainInstance().input.getKey("playerList");
        t.onPressedDown(this.boundOnPlayerListDown),
        t.onPressedUp(this.boundOnPlayerListUp);
        getMainInstance().input.getKey("playerListTouch").onPressedDown(this.boundOnPlayerListDown),
        this.antiCheat = new AntiCheatManager,
        this.antiCheat.onPlayerNeedsReport(((t,e,i)=>{
            getMainInstance().network.sendReportCheater(t, e, i)
        }
        )),
        this.chat = new ChatManager(this),
        getMainInstance().cam.setThirdPersonMode("none")
    }
    destructor() {
        if (this.destructed)
            return;
        this.destructed = !0,
        this.setMapScene(null, null),
        this.fireSdkGameplayStartedChange(),
        this.physics.destructor();
        for (const t of this.players.values())
            t.destructor();
        this.players.clear(),
        this.hingeManager.destructor(),
        this.arrowManager.destructor(),
        this.crosshair.destructor(),
        this.appearingObjectsManager.destructor();
        for (const t of this.flags)
            t.destructor();
        this.flagScoreUi.destructor(),
        this.healthUi.destructor(),
        this.cornerNotificationsUi.destructor(),
        this.gameOverNotificationsUi.destructor(),
        this.crosshairNotificationsUi.destructor(),
        this.scoreOffsetNotificationsUi.destructor(),
        this.cornerStatsUi && this.cornerStatsUi.destructor(),
        getMainInstance().mainInfoTextManager.removeInfoText(this.waitingForPlayersInfoText),
        this.chat.destructor(),
        getMainInstance().mainMenu.removeOnVisibilityChange(this.boundUpdateUiVisible);
        const t = getMainInstance().input.getKey("playerList");
        t.removeCb(this.boundOnPlayerListDown),
        t.removeCb(this.boundOnPlayerListUp);
        getMainInstance().input.getKey("playerListTouch").removeCb(this.boundOnPlayerListDown),
        this.playersListDialog.close(),
        this.closeGameOverStatsDialog(),
        this.weaponSelectionDialog.close(),
        this.gameEndWaitTimers = [],
        getMainInstance().adBanners.setPageVisibility("gameEnd", !1),
        this.currentFinalFlagMusic && (this.currentFinalFlagMusic.stop(),
        this.currentFinalFlagMusic = null),
        this.currentGameEndWaitingMusic && (this.currentGameEndWaitingMusic.stop(),
        this.currentGameEndWaitingMusic = null),
        getMainInstance().classSelectionImageManager.setTeamId(null)
    }
    get sdkGameplayStarted() {
        return !this.gameEnded && !this.isDoingGameEndSteps && !this.destructed
    }
    onSdkGameplayStartedChange(t) {
        this.onSdkGameplayStartedChangeCbs.add(t)
    }
    fireSdkGameplayStartedChange() {
        this.onSdkGameplayStartedChangeCbs.forEach((t=>t()))
    }
    async loadMap(t) {
        const e = e=>{
            if ("gameplay-data" == e.type)
                this.updateMapGameplayData(e.gameplayData);
            else if ("colliders" == e.type) {
                this.physics.removeMapColliders();
                for (const t of e.colliders)
                    this.physics.addMapCollider(t);
                this.physics.buildOctree(),
                this.receivedColliders = !0,
                this.updateGameIsVisible()
            } else
                "scene" == e.type && (this.destructed ? MapLoader.disposeMapGeometries(e.scene) : this.setMapScene(e.scene, t),
                this.hingeManager.setHingeObjects(e.hinges),
                this.appearingObjectsManager.setAppearingObjects(e.appearingObjects))
        }
          , i = getMainInstance()
          , s = i.mapLoader;
        await s.loadConfigMapWithDialogMessage(t, e) || i.network.closeCurrentConnection()
    }
    setMapScene(t, e) {
        this.scene && (MapLoader.disposeMapGeometries(this.scene),
        getMainInstance().scene.remove(this.scene)),
        this.scene = t,
        t && getMainInstance().scene.add(t),
        this.updateSceneVisibility(),
        this.updateGameIsVisible(),
        this.currentLoadedMapHash = e,
        this.notifyServerCurrentMap()
    }
    updateMapGameplayData(t) {
        if (!this.destructed) {
            for (const t of this.flags)
                t.destructor();
            this.flags = [];
            for (const {flagTeamId: e, pos: i, rot: s} of t.flags)
                this.createFlag(e, i, s);
            this.spawnPositions = t.spawnPositions
        }
    }
    setServerGameTime(t) {
        this.gameStartTime = getMainInstance().now - t
    }
    setServerGameSeed(t) {
        this.gameSeed = t,
        this.onGameSeedChangeCbs.forEach((e=>e(t)))
    }
    onGameSeedChange(t) {
        this.onGameSeedChangeCbs.add(t)
    }
    get gameTime() {
        return getMainInstance().now - this.gameStartTime
    }
    notifyServerCurrentMap() {
        const t = getMainInstance();
        if (!this.currentLoadedMapHash)
            return;
        t.network.sendCurrentLoadedMapHash(this.currentLoadedMapHash);
        this.physics.mapBounds && t.network.sendWorldBounds(this),
        t.network.sendDefaultFlagPositions(this)
    }
    createPlayer(t, e) {
        const i = getMainInstance()
          , s = new Player(this,i.input,i.sfx,this.physics,i.settingsManager,i.hudIcons,t,e);
        s.init(),
        this.players.set(t, s),
        this.playersListDialog.playersListChanged(),
        i.renderer.renderWorthyEventHappened()
    }
    destroyPlayer(t) {
        const e = this.players.get(t);
        if (e) {
            const i = e.sameSquadOrOwned;
            e.destructor(),
            this.players.delete(t),
            this.playersListDialog.playersListChanged(),
            getMainInstance().renderer.renderWorthyEventHappened(),
            i && this.fireSquadPlayersChange()
        }
    }
    setPlayerOwnership(t, e) {
        const i = this.players.get(t);
        i && i.setHasOwnership(e),
        this.updateUsedForCameraShotsOnly(),
        getMainInstance().mainMenu.setJoinState("joined"),
        getMainInstance().gameManager.setJoinedOnce(),
        this.updatePlayerIconVisibilities(),
        this.playersListDialog.playersListChanged();
        const s = this.getMyTeamId();
        this.playersListDialog.updateTeamsOrder(s),
        this.updateMyTeamColor(),
        this.updateWaitingForPlayersText(),
        this.fireSquadPlayersChange(),
        this.onMyPlayerChangeCbs.forEach((t=>t()))
    }
    getMyTeamColor() {
        let t = 0;
        const e = this.getMyPlayer();
        e && (t = e.teamId);
        let i = teamColors[t];
        return i || (i = teamColors[0],
        t = 0),
        {
            colors: i,
            myTeamId: t
        }
    }
    updateMyTeamColor() {
        const {colors: t, myTeamId: e} = this.getMyTeamColor();
        this.weaponSelectionDialog.setCssColor(t.cssColor, t.cssColorDark),
        this.healthUi.setCssColor(t.cssColor, t.cssColorDark),
        getMainInstance().classSelectionImageManager.setTeamId(e)
    }
    setPlayerName(t, e) {
        const i = this.players.get(t);
        i && (i.setPlayerName(e),
        this.playersListDialog.playersListChanged(),
        i.sameSquadOrOwned && this.fireSquadPlayersChange())
    }
    setPlayerNameVerified(t) {
        const e = this.players.get(t);
        e && (e.setNamePlayerVerified(),
        this.playersListDialog.playersListChanged())
    }
    setPlayerTeamId(t, e) {
        const i = this.players.get(t);
        i && i.setTeamId(e),
        this.playersListDialog.playersListChanged(),
        i && i.sameSquadOrOwned && this.fireSquadPlayersChange()
    }
    setSameSquadPlayerData(t) {
        let e = !1;
        for (const {playerId: i, squadPlayerId: s, isLeader: n} of t) {
            const t = this.players.get(i);
            t && (t.setIsSameSquadPlayer(!0, s, n),
            e = !0)
        }
        e && (this.fireSquadPlayersChange(),
        this.playersListDialog.playersListChanged())
    }
    onSquadPlayersChange(t) {
        this.onSquadPlayersChangeCbs.add(t)
    }
    fireSquadPlayersChange() {
        this.onSquadPlayersChangeCbs.forEach((t=>t()))
    }
    setPlayerScores(t) {
        const e = this.players.get(t.playerId);
        e && e.setScores(t),
        this.playersListDialog.playersListChanged()
    }
    createFlag(t, e, i) {
        const s = new Flag(this.flags.length,t,e,i,this,this.physics);
        s.onCurrentHoldingPlayerChange((()=>{
            this.updateFlagGrabbedStates()
        }
        )),
        s.onNearDefaultPosChange((()=>{
            this.updateFlagGrabbedStates()
        }
        )),
        this.flags.push(s)
    }
    *getMyFlags(t=-1) {
        if (-1 == t) {
            const e = this.getMyPlayer();
            e && (t = e.teamId)
        }
        for (const e of this.flags)
            e.teamId == t && (yield e)
    }
    *getEnemyFlags(t=-1) {
        for (const e of this.flags)
            e.teamId != t && (yield e)
    }
    playerChangeFlag(t, e, i) {
        const s = this.flags[e];
        if (s) {
            const e = this.players.get(t);
            this.gameEnded || (i == NetworkManager.FlagChangeOperation.GRAB || i == NetworkManager.FlagChangeOperation.CAPTURE ? e && e.dead && e.report(CheatKickReason.INVALID_DEATH_OPERATION, 1) : i == NetworkManager.FlagChangeOperation.RETURN && e && e.dead && e.report(CheatKickReason.INVALID_DEATH_OPERATION, 1)),
            e ? e.changeFlagFromServer(s, i) : i == NetworkManager.FlagChangeOperation.RETURN && s.returnToDefaultPos()
        }
    }
    showFlagNotification(t) {
        const e = t.type;
        let i;
        if (1 == t.teamId ? i = 2 : 2 == t.teamId && (i = 1),
        i) {
            const s = `static/img/notificationIcons/flag/${teamColors[i].name}/${e}.svg`;
            this.uiVisible && this.cornerNotificationsUi.showIcon(s);
            let n = i == this.getMyTeamId();
            "grab" != t.type && "capture" != t.type || (n = !n);
            let a = n ? "positive" : "negative";
            "capture" == t.type && (a += "Important"),
            getMainInstance().sfx.playSound("flag/" + a)
        }
        this.updateFinalFlagMusic()
    }
    setFlagDroppedPosition(t, e, i, s, n, a, o) {
        const r = this.flags[t];
        r && r.setDroppedPosition(e, i, s, n, a, o)
    }
    loop(t, e) {
        for (const i of this.players.values())
            i.loop(t, e);
        for (const i of this.flags)
            i.loop(t, e);
        this.chat.loop(),
        this.hingeManager.loop(t, e),
        this.arrowManager.loop(t, e),
        this.crosshair.loop(t, e),
        this.appearingObjectsManager.loop(t, e);
        const i = getMainInstance()
          , s = i.mapLoader.cloudsObj;
        s && (s.rotation.y = 1e-5 * t,
        s.updateWorldMatrix(!1, !0));
        const n = this.getMyPlayer();
        let a = 0;
        const o = i.mapLoader.mapVariablesManager.get("windSfxVolume");
        "number" == typeof o && (a = o);
        let r = 0
          , l = 0;
        const h = i.mapLoader.mapVariablesManager.get("birdsSfxVolume");
        "number" == typeof h && (l = h);
        let d = 0;
        const c = i.mapLoader.mapVariablesManager.get("jungleSfxVolume");
        "number" == typeof c && (d = c);
        let u = 0;
        const p = i.mapLoader.mapVariablesManager.get("rainSfxVolume");
        "number" == typeof p && (u = p);
        let g = 0;
        const m = i.mapLoader.mapVariablesManager.get("insectsSfxVolume");
        if ("number" == typeof m && (g = m),
        n) {
            const t = n.pos.y
              , e = i.mapLoader.mapVariablesManager.get("windSfxBoostVolume");
            if ("number" == typeof e && e > 0) {
                const s = i.mapLoader.mapVariablesManager.get("windSfxBoostHeight");
                if ("number" == typeof s) {
                    const i = Math.max(0, s - t)
                      , n = clamp01(1 / i - .2) * e;
                    a = Math.max(n, a)
                }
            }
            const s = i.mapLoader.mapVariablesManager.get("waterSfxVolume");
            if ("number" == typeof s && s > 0) {
                const e = i.mapLoader.mapVariablesManager.get("waterSfxHeight");
                if ("number" == typeof e) {
                    const i = Math.max(0, t - e);
                    r = clamp(.07 / i, 0, .05),
                    r *= s
                }
            }
        }
        i.gameManager.setAmbientVolumes(a, r, l, d, u, g);
        const f = Math.round((performance.now() - i.network.lastReceiveMessageTime) / 100);
        this.cornerStatsUi.networkStabilityStat.setValue(f),
        this.physics.loop(t, e);
        for (const i of this.players.values())
            i.afterPhysicsLoop(t, e);
        for (const i of this.flags)
            i.afterPhysicsLoop(t, e)
    }
    getMyPlayer() {
        if (this.finishedGameEndFlow)
            return null;
        for (const t of this.players.values())
            if (t.hasOwnership)
                return t;
        return null
    }
    getMyTeamId() {
        const t = this.getMyPlayer();
        return t ? t.teamId : -1
    }
    updatePlayerIconVisibilities() {
        const t = this.getMyTeamId();
        for (const e of this.players.values())
            e.updateIconVisibility(t)
    }
    updateWaitingForPlayersText() {
        this.waitingForPlayersInfoText.setIsLoading(!this.gameStarted)
    }
    setPlayerServerData(t, e, i, s, n, a, o=!1) {
        const r = this.players.get(t);
        r && r.setServerData(e, i, s, n, a, o),
        getMainInstance().renderer.renderWorthyEventHappened()
    }
    playerServerDataFrameEnded() {
        const t = Array.from(this.players.values()).map((t=>t.serverPos));
        this.appearingObjectsManager.updatePlayerPositions(t)
    }
    setPlayerPingData(t, e) {
        const i = this.players.get(t);
        i && (i.setPingData(e),
        i.hasOwnership && this.cornerStatsUi.pingStat.setValue(e))
    }
    createServerArrow(t, e, i, s, n, a, o, r, l) {
        const h = this.players.get(t);
        h && h.dead && h.report(CheatKickReason.INVALID_DEATH_OPERATION, 1);
        const d = this.getMyPlayer();
        let c = new Vector3(0,0,0);
        if (d && h) {
            const t = d.ping + h.ping;
            c = d.getDeltaPositionMsAgo(t)
        }
        if (h) {
            const t = new Vector3(i,s,n)
              , d = new Vector3(a,o,r)
              , u = h.getCamPos()
              , p = u.clone().add(c);
            t.distanceTo(u) > 3 && t.distanceTo(p) > 3 && (t.copy(u),
            c.set(0, 0, 0)),
            this.arrowManager.createArrow(h, {
                arrowId: e,
                pos: t,
                networkOffsetPos: c,
                dir: d,
                fireAmount01: l
            })
        }
    }
    getSpawnPosition(t) {
        let e;
        const i = this.spawnPositions[t];
        return i && (e = randFromArray(i)),
        e || {
            pos: new Vector3,
            rot: new Quaternion
        }
    }
    playerClaimedHitByArrow(t, e, i, s) {
        const n = this.players.get(t)
          , a = this.players.get(e);
        n && a && n.playerClaimedHitByArrow(a, i, s)
    }
    playerHitByMelee(t, e) {
        const i = this.players.get(t)
          , s = this.players.get(e);
        i && s && i.hitByMeleeFromServer(s)
    }
    playerHitByArrow(t, e) {
        const i = this.players.get(t)
          , s = this.players.get(e);
        i && s && i.hitByArrowFromServer(s)
    }
    verifiedKillByServer(t, e) {
        const i = this.players.get(t)
          , s = this.players.get(e);
        i && s && s.verifiedKillByServer(i)
    }
    forceSetPlayerHealthFromServer(t, e) {
        const i = this.players.get(t);
        i && i.forceSetHealthFromServer(e)
    }
    receivedPlayerPerformAction(t, e) {
        const i = this.players.get(t);
        i && i.receivedPerformAction(e)
    }
    receivedPlayerSpawn(t, e) {
        const i = this.players.get(t);
        i && i.receivedSpawn(e)
    }
    receivePlayerChangeClass(t, e) {
        const i = this.players.get(t);
        i && i.receiveChangeClassFromServer(e)
    }
    receivePlayerChangeWeaponType(t, e) {
        const i = this.players.get(t);
        i && i.receiveChangeWeaponTypeFromServer(e)
    }
    setPlayerEquippedSkinData(t, e) {
        const i = this.players.get(t);
        i && (i.setPlayerEquippedSkinData(e),
        this.playersListDialog.playersListChanged()),
        i && i.sameSquadOrOwned && this.fireSquadPlayersChange()
    }
    updateScoreboard(t) {
        this.flagScoreUi.update(t)
    }
    updateFlagGrabbedStates() {
        const t = new Map;
        for (const e of this.flags) {
            let i;
            if (1 == e.teamId)
                i = 2;
            else {
                if (2 != e.teamId)
                    continue;
                i = 1
            }
            if (e.currentHoldingPlayer)
                t.set(i, "grab");
            else if (!e.isNearDefaultPos)
                for (let i = 0; i < this.teamCount; i++)
                    i != e.teamId && t.set(i, "drop")
        }
        for (const e of this.flags)
            t.has(e.teamId) || t.set(e.teamId, "return");
        for (const [e,i] of t)
            this.flagScoreUi.setFlagGrabbedState(e, i);
        getMainInstance().renderer.renderWorthyEventHappened()
    }
    async updateFinalFlagMusic() {
        this.shouldPlayFinalFlagMusic = this.flagScoreUi.getFinalFlagHeld() && !this.gameEnded;
        const t = !!this.currentFinalFlagMusic;
        if (this.shouldPlayFinalFlagMusic != t)
            if (this.shouldPlayFinalFlagMusic) {
                const t = await getMainInstance().sfx.playSound("music/finalFlag");
                this.currentFinalFlagMusic || !this.shouldPlayFinalFlagMusic ? t && t.stop() : this.currentFinalFlagMusic = t
            } else
                this.currentFinalFlagMusic && (this.currentFinalFlagMusic.stop(),
                this.currentFinalFlagMusic = null)
    }
    showKillNotification() {
        this.uiVisible && this.crosshairNotificationsUi.showIcon("static/img/notificationIcons/crosshair/kill.svg")
    }
    showKilledNotification() {
        this.uiVisible && this.crosshairNotificationsUi.showIcon("static/img/notificationIcons/crosshair/killed.svg")
    }
    offsetPlayerScore(t, e, i) {
        if (this.gameEnded)
            return;
        const s = this.players.get(t);
        if (s && s.hasOwnership) {
            let t = 0;
            const s = this.trackedMyPlayerScores.get(i);
            s && (t = s),
            t += e,
            this.trackedMyPlayerScores.set(i, t),
            this.uiVisible && (this.scoreOffsetNotificationsUi.showOffsetNotification(e, i),
            e > 0 && i == NetworkManager.PlayerScoreOffsetReason.KILL && (this.showKillNotification(),
            getMainInstance().sfx.playSound("feedback/kill")))
        }
    }
    notifyGameStarted() {
        this.gameStarted = !0,
        this.cornerStatsUi.updateVisibility(),
        this.updateWaitingForPlayersText();
        const t = this.getMyPlayer();
        t && t.respawn(),
        this.playersListDialog.setUnsetTeamVisibility(!1),
        getMainInstance().gameStatsTracker.gameStarted()
    }
    receivedGameEndAccountStats(t) {
        this.gameEndReceivedCoins = t.receivedCoins,
        t.receivedCoins > 0 && getMainInstance().shopState.provideNewCoinCount(t.newCoinCount),
        this.updateGameEndShowStatsScreen()
    }
    updateGameEndShowStatsScreen() {
        this.gameEndShowStatsScreen = this.gameEndMyTotalScore > 0 || this.gameEndReceivedCoins > 0,
        this.gameEndStatsShowTimer && this.gameEndStatsShowTimer.setTotalTime(this.gameEndShowStatsScreen ? this.gameEndShowStatsDuration : 0)
    }
    notifyGameEnded() {
        this.gameEnded = !0,
        this.updateFinalFlagMusic(),
        this.updateUsedForCameraShotsOnly(),
        this.cornerStatsUi.updateVisibility(),
        getMainInstance().network.markNextCloseAsIntentional(),
        getMainInstance().gameStatsTracker.gameEnded(),
        this.fireSdkGameplayStartedChange(),
        this.playersListDialog.visible = !1,
        this.playersListDialog.freezeScores(),
        this.updateMyPlayerEloScore();
        const t = this.getMyPlayer();
        if (t) {
            const e = t.getMatchMakeSkillLevel();
            getMainInstance().network.matchMaking.updateSmoothSkillLevel(e)
        }
        for (const t of this.onGameEndCbs)
            t();
        this.doGameEndSteps()
    }
    updateAvgTeamElo(t, e) {
        let i, s;
        this.avgRedTeamElo = t,
        this.avgBlueTeamElo = e;
        const n = this.getMyTeamId();
        if (1 == n)
            i = this.avgRedTeamElo,
            s = this.avgBlueTeamElo;
        else {
            if (2 != n)
                return;
            i = this.avgBlueTeamElo,
            s = this.avgRedTeamElo
        }
        getMainInstance().gameStatsTracker.updateAvgTeamElo(i, s)
    }
    getTeamElos() {
        const t = this.getMyTeamId();
        return 1 == t ? {
            myTeamElo: this.avgRedTeamElo,
            opponentTeamElo: this.avgBlueTeamElo
        } : 2 == t ? {
            myTeamElo: this.avgBlueTeamElo,
            opponentTeamElo: this.avgRedTeamElo
        } : null
    }
    updateMyPlayerEloScore() {
        const t = this.getMyTeamId()
          , e = this.getTeamElos();
        if (!e)
            return;
        const {myTeamElo: i, opponentTeamElo: s} = e
          , n = this.flagScoreUi.getWinningTeam();
        if (-1 == n)
            return;
        let a = (1 - this.flagScoreUi.getFlagsRatio()) / 2 + .5;
        t != n && (a = 1 - a);
        const o = computeDeltaElo(i, s, a)
          , r = this.getMyPlayer();
        if (!r)
            return;
        let l, h, d = 0;
        for (const e of this.players.values())
            e.teamId == t && (d += e.scoreTotal);
        l = d > 0 ? r.scoreTotal / d : 0,
        h = o > 0 ? o * l : o * (1 - l),
        getMainInstance().network.matchMaking.updateElo(h)
    }
    async doGameEndSteps() {
        if (this.isDoingGameEndSteps)
            return;
        this.isDoingGameEndSteps = !0;
        const t = getMainInstance();
        if (t.poki.isShowingRewardedBreak && (await t.poki.waitForRewardedBreakFinish(),
        this.destructed || this.finishedGameEndFlow))
            return;
        this.fireSdkGameplayStartedChange();
        const e = this.flagScoreUi.getWinningTeam()
          , i = this.getMyPlayer()
          , s = i && i.teamId == e;
        s && t.poki.happyTime(1);
        const n = s ? "victory" : "defeated";
        this.updateUiVisible(),
        t.mainMenu.hideUi || this.gameOverNotificationsUi.showIcon(`static/img/notificationIcons/gameOver/${n}.svg`),
        t.cam.setThirdPersonMode("back"),
        t.sfx.playSound("gameEnd/" + (s ? "win" : "lose")),
        this.gameEndMyTotalScore = 0,
        i && (this.gameEndMyTotalScore = i.scoreTotal);
        const a = s ? this.gameEndTitleDurationWin : this.gameEndTitleDurationLose
          , o = this.createGameEndWaitTimer(this.gameEndLoweringTimeScaleDuration + a, "title")
          , r = this.createGameEndWaitTimer(this.gameEndPlayersListDuration, "playerlist");
        if (this.gameEndStatsShowTimer = this.createGameEndWaitTimer(0, "stats"),
        this.gameEndAdBreakTimer = this.createGameEndWaitTimer(10, "adbreak"),
        this.updateGameEndShowStatsScreen(),
        o.start(),
        await Timeout.promise(1e3 * this.gameEndLoweringTimeScaleDuration),
        this.destructed || this.finishedGameEndFlow)
            return;
        if (this.physics.startLoweringTimeScale(),
        await Timeout.promise(1e3 * a),
        this.destructed || this.finishedGameEndFlow)
            return;
        this.currentGameEndWaitingMusic || (this.currentGameEndWaitingMusic = await t.sfx.playSound("music/waiting")),
        o.clear(),
        this.playersListDialog.setGameEndState(e),
        this.playersListDialog.visible = !0,
        this.playersListDialog.skipText.setVisibility(!0);
        const l = t.settingsManager.getValue("autoSkipStatsScreen");
        if (l && this.playersListDialog.skipText.startTimer(this.gameEndPlayersListDuration),
        this.playersListDialog.skipText.startCreationCooldown(),
        t.adBanners.setPageVisibility("gameEnd", !0),
        this.gameEndStepsReachedStatScreens = !0,
        this.onGameEndStatsScreenCbs.forEach((t=>t())),
        i && i.updateSmoothCam(),
        r.start(),
        await this.playersListDialog.skipText.waitForSkip(),
        !this.destructed && !this.finishedGameEndFlow) {
            if (r.clear(),
            this.playersListDialog.visible = !1,
            this.gameEndShowStatsScreen) {
                let e = 0;
                if (i && (e = i.teamId),
                this.gameOverStatsDialog = new GameOverStatsDialogUi({
                    trackedMyPlayerScores: this.trackedMyPlayerScores,
                    totalScore: this.gameEndMyTotalScore,
                    myTeamId: e,
                    receivedCoins: this.gameEndReceivedCoins,
                    autoSkipStatsScreen: l
                }),
                this.gameOverStatsDialog.onRewardedAdIsPlayingChange((t=>{
                    t ? (this.gameEndTimerSuddenChangeDisabled = !0,
                    this.gameEndStatsShowTimer && this.gameEndStatsShowTimer.clear(),
                    this.gameEndRewardedAdTimer || (this.gameEndRewardedAdTimer = this.createGameEndWaitTimer(this.gameEndRewardedAdDuration, "rewarded ad"),
                    this.gameEndRewardedAdTimer.start()),
                    this.gameEndStatsAfterRewardedAdTimer || (this.gameEndStatsAfterRewardedAdTimer = this.createGameEndWaitTimer(this.gameEndShowStatsAfterRewardedDuration, "stats after rewarded")),
                    this.gameEndAdBreakTimer && this.gameEndAdBreakTimer.clear(),
                    this.gameEndTimerSuddenChangeDisabled = !1,
                    this.fireEstimatedMaxGameEndWaitTimeSuddenChange()) : (this.gameEndRewardedAdTimer && (this.gameEndRewardedAdTimer.clear(),
                    this.gameEndRewardedAdTimer = null),
                    this.gameEndStatsAfterRewardedAdTimer && this.gameEndStatsAfterRewardedAdTimer.start())
                }
                )),
                t.dialogManager.addDialog(this.gameOverStatsDialog),
                l && this.gameOverStatsDialog.skipText.startTimer(this.gameEndShowStatsDuration),
                this.gameEndStatsShowTimer.start(),
                await this.gameOverStatsDialog.skipText.waitForSkip(),
                this.destructed || this.finishedGameEndFlow)
                    return;
                this.gameEndStatsShowTimer.clear()
            }
            this.finishGameEndFlow()
        }
    }
    canEstimateGameEndWaitTime() {
        if (!this.isDoingGameEndSteps)
            return !1;
        if (this.gameOverStatsDialog && this.gameOverStatsDialog.rewardedAdFailed)
            return !1;
        return !!getMainInstance().settingsManager.getValue("autoSkipStatsScreen")
    }
    estimateMaxGameEndWaitTimeSeconds() {
        if (!this.gameEnded)
            return 300;
        let t = 0;
        for (const e of this.gameEndWaitTimers)
            t += e.timeRemaining;
        return t
    }
    createGameEndWaitTimer(t=0, e="") {
        const i = new GameEndWaitTimer(t,e);
        return i.onSuddenChange((()=>{
            this.fireEstimatedMaxGameEndWaitTimeSuddenChange()
        }
        )),
        this.gameEndWaitTimers.push(i),
        this.fireEstimatedMaxGameEndWaitTimeSuddenChange(),
        i
    }
    onEstimatedMaxGameEndWaitTimeSuddenChange(t) {
        this.onEstimatedMaxGameEndWaitTimeSuddenChangeCbs.add(t)
    }
    fireEstimatedMaxGameEndWaitTimeSuddenChange() {
        this.gameEndTimerSuddenChangeDisabled || this.onEstimatedMaxGameEndWaitTimeSuddenChangeCbs.forEach((t=>t()))
    }
    onMyPlayerChange(t) {
        this.onMyPlayerChangeCbs.add(t)
    }
    onGameEnd(t) {
        this.onGameEndCbs.add(t)
    }
    onGameEndFinish(t) {
        this.onGameEndFinishCbs.add(t)
    }
    onGameEndStatsScreen(t) {
        this.onGameEndStatsScreenCbs.add(t)
    }
    closeGameOverStatsDialog() {
        this.gameOverStatsDialog && (this.gameOverStatsDialog.close(),
        this.gameOverStatsDialog = null)
    }
    finishGameEndFlow() {
        if (this.isDoingGameEndSteps) {
            for (const t of this.players.values())
                t.setHasOwnership(!1);
            this.onMyPlayerChangeCbs.forEach((t=>t())),
            this.finishedGameEndFlow = !0,
            this.updateUsedForCameraShotsOnly(),
            this.gameOverNotificationsUi.removeIcon(),
            this.playersListDialog.visible = !1,
            this.closeGameOverStatsDialog(),
            getMainInstance().network.closeCurrentConnection(!0),
            this.onGameEndFinishCbs.forEach((t=>t()))
        }
    }
    onPlayerListDown() {
        this.gameEnded || (this.playersListDialog.visible = !0)
    }
    onPlayerListUp() {
        this.gameEnded || (this.playersListDialog.visible = !1)
    }
    get usedForCameraShotsOnly() {
        return this._usedForCameraShotsOnly
    }
    updateUsedForCameraShotsOnly() {
        const t = Boolean(this.isForegroundGame && this.gameEnded && !this.getMyPlayer());
        t != this._usedForCameraShotsOnly && (this._usedForCameraShotsOnly = t,
        this.onUsedForCamShotsOnlyChangeCbs.forEach((t=>t())))
    }
    becameForegroundGame() {
        this.isForegroundGame = !0,
        this.updateUsedForCameraShotsOnly(),
        this.updateGameIsVisible(),
        this.updateUiVisible()
    }
    updateSceneVisibility() {
        this.scene && (this.scene.visible = this.gameIsVisible)
    }
    updateGameIsVisible() {
        const t = Boolean(this.isForegroundGame && this.scene && this.receivedColliders);
        t != this.gameIsVisible && (this.gameIsVisible = t,
        this.updateSceneVisibility(),
        this.onGameIsVisibleCbs.forEach((t=>t())),
        getMainInstance().renderer.renderWorthyEventHappened())
    }
    onGameIsVisible(t) {
        this.onGameIsVisibleCbs.add(t)
    }
    onUsedForCamShotsOnlyChange(t) {
        this.onUsedForCamShotsOnlyChangeCbs.add(t)
    }
    updateUiVisible() {
        const t = this.isForegroundGame && (!getMainInstance().mainMenu.visible || !1) && !this.gameEnded && !getMainInstance().mainMenu.hideUi;
        this.setUiVisible(t),
        getMainInstance().hudIcons.setGlobalVisibility(t)
    }
    setUiVisible(t) {
        this.uiVisible = t,
        this.healthUi.setVisible(t),
        this.flagScoreUi.setVisible(t),
        this.crosshair.setGameUiVisibility(t),
        t || (this.cornerNotificationsUi.removeIcon(),
        this.crosshairNotificationsUi.removeIcon(),
        this.scoreOffsetNotificationsUi.removeAll())
    }
}
class MainMenu {
    constructor() {
        if (this.el = document.getElementById("mainMenu"),
        !this.el)
            throw new Error("Main menu element not found");
        if (this.loadingImageContainer = document.getElementById("loadingImageContainer"),
        !this.loadingImageContainer)
            throw new Error("Loading image container element not found");
        this.el.addEventListener("mousedown", (t=>{
            t.target == this.el && (this.onPointerLockElClick(),
            t.stopImmediatePropagation())
        }
        )),
        this.currentJoinState = "joinable",
        this.loadScreenHidden = !1,
        this.toggledVisibilityState = !1,
        this.toggleMenuButton = new UiButton({
            isIconButton: !0,
            extraClasses: ["toggle-menu-button"],
            icon: "static/img/menuUI/hamburger.svg",
            onClick: ()=>{
                this.makeMainMenuVisibleFromUserGesture()
            }
        }),
        this.toggleMenuButton.visible = !1,
        document.body.appendChild(this.toggleMenuButton.el),
        document.addEventListener("keydown", (t=>{
            "Escape" == t.code && this.makeMainMenuVisibleFromUserGesture()
        }
        )),
        this.visible = !0,
        this.onVisibilityChangeCbs = new Set,
        this.contentVisible = !1;
        const t = document.createElement("div");
        t.classList.add("main-menu-top-left"),
        this.el.appendChild(t),
        this.cornerProfile = new CornerProfile,
        t.appendChild(this.cornerProfile.el),
        this.menuButtonsContainer = document.createElement("div"),
        this.menuButtonsContainer.classList.add("menu-buttons-container", "hidden"),
        t.appendChild(this.menuButtonsContainer),
        this.settingsDialog = null,
        this.settingsButton = new MenuButton({
            text: "Settings",
            icon: "static/img/menuUI/settings.svg",
            iconSizeMultiplier: .6,
            testLabel: "settings",
            onClick: ()=>{
                const t = getMainInstance();
                this.settingsDialog = new SettingsDialogUi(t.settingsManager,t.dialogManager),
                getMainInstance().dialogManager.addDialog(this.settingsDialog)
            }
        }),
        this.menuButtonsContainer.appendChild(this.settingsButton.containerEl),
        this.shopDialog = null,
        this.shopButton = new MenuButton({
            text: "Shop",
            icon: "static/img/menuUI/shopChest.svg",
            testLabel: "shop",
            onClick: ()=>{
                this.openShopDialog()
            }
        }),
        this.menuButtonsContainer.appendChild(this.shopButton.containerEl),
        this.userProfileDialog = null,
        this.loginButton = new MenuButton({
            text: "Account",
            icon: "static/img/menuUI/login.svg",
            testLabel: "account",
            onClick: ()=>{
                this.userProfileDialog || (this.userProfileDialog = new UserProfileDialogUi,
                getMainInstance().dialogManager.addDialog(this.userProfileDialog),
                this.userProfileDialog.addOnCloseCb((()=>{
                    this.userProfileDialog = null
                }
                )))
            }
        }),
        this.menuButtonsContainer.appendChild(this.loginButton.containerEl),
        this.squadDialog = null,
        this.squadButton = new MenuButton({
            text: "Squad",
            icon: "static/img/menuUI/squad.svg",
            iconSizeMultiplier: .8,
            testLabel: "squad",
            onClick: ()=>{
                this.openSquadDialog()
            }
        }),
        this.menuButtonsContainer.appendChild(this.squadButton.containerEl),
        this.mapsDialog = null,
        this.mapsButton = new MenuButton({
            text: "Maps",
            icon: "static/img/menuUI/maps.svg",
            iconSizeMultiplier: .6,
            testLabel: "maps",
            onClick: ()=>{
                this.openMapsDialog()
            }
        }),
        this.menuButtonsContainer.appendChild(this.mapsButton.containerEl),
        this.installButton = new MenuButton({
            text: "Install",
            icon: "static/img/menuUI/download.svg",
            onClick: async()=>{
                const {outcome: t} = await promptInstall();
                "accepted" == t && this.installButton.setVisibility(!1)
            }
        }),
        this.installButton.setVisibility(!1),
        this.menuButtonsContainer.appendChild(this.installButton.containerEl),
        this.installAvailable = !1,
        onInstallAvailable((()=>{
            this.installAvailable = !0,
            this.updateInstallButtonVisibility()
        }
        )),
        this.updateButton = new MenuButton({
            text: "Update",
            icon: "static/img/menuUI/download.svg",
            isUpdateIcon: !0,
            onClick: async()=>{
                const t = getMainInstance();
                if (t.gameManager.getOnlineGame()) {
                    const e = t.dialogManager.showAlert({
                        title: "You are currently in a game",
                        text: "Do you want to leave the current match?",
                        buttons: [{
                            text: "Yes"
                        }, {
                            text: "No"
                        }]
                    });
                    if (0 != await e.waitForButton())
                        return
                }
                skipWaiting()
            }
        }),
        this.updateButton.setVisibility(!1),
        this.menuButtonsContainer.appendChild(this.updateButton.containerEl),
        this.exitButton = new MenuButton({
            text: "Exit Round",
            icon: "static/img/menuUI/exit.svg",
            isExitButton: !0,
            onClick: async()=>{
                const t = getMainInstance()
                  , e = t.gameManager.getOnlineGame();
                if (!e)
                    return;
                const i = e.getTeamElos();
                if (i) {
                    const e = t.dialogManager.showAlert({
                        title: "Are you sure?",
                        text: "You will not earn any coins from this match.",
                        buttons: [{
                            text: "Exit"
                        }, {
                            text: "stay in game"
                        }]
                    });
                    if (0 != await e.waitForButton())
                        return;
                    t.gameStatsTracker.deductLeavingPlayerElo(i.myTeamElo, i.opponentTeamElo)
                }
                t.network.closeCurrentConnection()
            }
        }),
        this.exitButton.setVisibility(!1),
        this.menuButtonsContainer.appendChild(this.exitButton.containerEl),
        onUpdateReady((()=>{
            this.updateButton.setVisibility(!0)
        }
        )),
        this.promoBanner = null;
        const e = document.createElement("ul");
        e.classList.add("bottom-texts", "whiteBigText", "blueNight"),
        this.el.appendChild(e);
        const i = document.createElement("li");
        i.textContent = "v1685095066",
        e.appendChild(i);
        const s = document.createElement("li");
        e.appendChild(s);
        const n = document.createElement("a");
        n.textContent = "Privacy Policy",
        n.href = "https://privacy.pelicanparty.co/",
        n.target = "_blank",
        s.appendChild(n),
        this.currentMusicSfx = null,
        this.hideUi = !1
    }
    init() {
        const t = getMainInstance();
        t.poki.gameLoadingStart(),
        t.input.onPointerLockChange(((t,e)=>{
            !t && e && this.makeMainMenuVisibleFromUserGesture(),
            this.updateVisibility()
        }
        )),
        t.input.onDesiredPointerLockChange((()=>{
            this.updateToggleMenuVisible()
        }
        )),
        t.input.onDesiredPointerLockChange((()=>{
            this.updateVisibility()
        }
        )),
        t.input.touch.onTouchSupportedChange((()=>{
            this.updateToggleMenuVisible()
        }
        )),
        t.gameManager.onActiveGameChange((t=>{
            t && (t.onGameIsVisible((()=>{
                this.updateLoadingImageVisibility(),
                this.updateVisibility()
            }
            )),
            t instanceof Game && t.onUsedForCamShotsOnlyChange((()=>{
                this.updateVisibility()
            }
            ))),
            this.updateVisibility(),
            this.updateLoadingImageVisibility()
        }
        )),
        t.input.touch.onTouchListenerClick((()=>{
            this.onPointerLockElClick()
        }
        )),
        t.gameManager.onGameEnd((()=>{
            this.shopDialog && this.shopDialog.close(),
            this.settingsDialog && this.settingsDialog.close(),
            this.mapsDialog && this.mapsDialog.close(),
            this.updateVisibility()
        }
        )),
        t.gameManager.onActiveGameChange((t=>{
            this.updateInstallButtonVisibility(),
            this.updateExitGameVisibility(),
            t instanceof Game && t.onGameEnd((()=>{
                this.updateExitGameVisibility()
            }
            ))
        }
        )),
        this.updateInstallButtonVisibility(),
        this.updateExitGameVisibility(),
        this.cornerProfile.init(),
        t.network.squadManager.onSquadMembersChange((()=>{
            this.updateSquadButtonText()
        }
        )),
        t.network.squadManager.onUserVisibleSquadIdChange((()=>{
            this.updateSquadButtonText()
        }
        )),
        t.settingsManager.onValueChange("hideUi", (e=>{
            this.hideUi = e;
            const i = t.gameManager.activeGame;
            i && i.updateUiVisible()
        }
        )),
        t.dialogManager.onCurtainVisibilityChange((t=>{
            this.el.inert = t
        }
        )),
        setTimeout((()=>{
            this.makeContentVisible()
        }
        ), 1500)
    }
    loop(t, e) {
        this.shopDialog && this.shopDialog.loop(t, e)
    }
    updateLoadingImageVisibility() {
        const t = getMainInstance()
          , e = t.gameManager.activeGame;
        !this.loadScreenHidden && e && e.gameIsVisible && !t.renderer.webglCreationFailed && (t.poki.gameLoadingFinished(),
        this.loadingImageContainer.classList.add("hidden"),
        setTimeout((()=>{
            this.loadingImageContainer.remove()
        }
        ), 1e3),
        this.loadScreenHidden = !0)
    }
    setJoinState(t) {
        this.currentJoinState = t,
        getMainInstance().mainInfoTextManager.updateText(),
        this.updateVisibility(),
        this.updatePlayingMusic()
    }
    updateSquadButtonText() {
        let t = "Squad";
        getMainInstance().network.squadManager.isInSquad && (t += ` (${getMainInstance().network.squadManager.totalSquadMemberCount})`),
        this.squadButton.setText(t)
    }
    onPointerLockElClick() {
        if (getMainInstance().renderer.webglCreationFailed)
            return;
        const {didShowSquadDialog: t} = getMainInstance().gameManager.joinIfNotJoined(!0);
        t || (this.toggledVisibilityState = !1,
        this.updateVisibility())
    }
    updateInstallButtonVisibility() {
        const t = this.installAvailable && !getMainInstance().gameManager.isInGamesLoop;
        this.installButton.setVisibility(t)
    }
    updateExitGameVisibility() {
        let t = !1;
        const e = getMainInstance().gameManager.activeGame;
        e && e instanceof Game && !e.gameEnded && (t = !0),
        this.exitButton.setVisibility(t)
    }
    makeMainMenuVisibleFromUserGesture() {
        this.toggledVisibilityState = !0,
        this.makeContentVisible(),
        this.updateVisibility()
    }
    makeContentVisible() {
        if (this.contentVisible)
            return;
        this.contentVisible = !0,
        this.menuButtonsContainer.classList.remove("hidden");
        const t = getMainInstance();
        this.promoBanner = new MainMenuPromoBanner(t.config,this,t.gameManager,t.shopState,t.poki,t.dialogManager,t.skins,t.indexedDb),
        this.el.appendChild(this.promoBanner.el),
        this.promoBanner.init()
    }
    updateVisibility() {
        let t = !0;
        const e = getMainInstance().gameManager.activeGame;
        if (getMainInstance().input.pointerLocked ? t = !1 : e instanceof Game && e.usedForCameraShotsOnly ? t = !0 : e && e.gameEnded ? t = !1 : this.toggledVisibilityState ? t = !0 : e && e.gameIsVisible && e.getMyPlayer() && (t = !1),
        t != this.visible) {
            this.visible = t,
            this.el.style.display = t ? "" : "none";
            const e = getMainInstance();
            e.gameManager.updateSdkGameplayStarted(),
            e.mainInfoTextManager.updateText(),
            this.updateToggleMenuVisible();
            for (const e of this.onVisibilityChangeCbs)
                e(t)
        }
    }
    setVisible(t) {}
    updateToggleMenuVisible() {
        const t = getMainInstance();
        this.toggleMenuButton.visible = !this.visible && (t.input.touch.touchSupported || !t.input.desiredPointerLockedState) && !(t.gameManager.activeGame && t.gameManager.activeGame.gameEnded)
    }
    onVisibilityChange(t) {
        this.onVisibilityChangeCbs.add(t)
    }
    removeOnVisibilityChange(t) {
        this.onVisibilityChangeCbs.delete(t)
    }
    get shouldPlayMusic() {
        return "joined" != this.currentJoinState
    }
    async updatePlayingMusic() {
        if (this.shouldPlayMusic != !!this.currentMusicSfx)
            if (this.shouldPlayMusic) {
                const t = await getMainInstance().sfx.playSound("music/mainMenu");
                !t || !this.currentMusicSfx && this.shouldPlayMusic ? this.currentMusicSfx = t || null : t.stop()
            } else
                this.currentMusicSfx && (this.currentMusicSfx.stop(),
                this.currentMusicSfx = null)
    }
    openShopDialog() {
        return this.shopDialog || (this.shopDialog = new ShopDialogUi,
        getMainInstance().dialogManager.addDialog(this.shopDialog),
        this.shopDialog.addOnCloseCb((()=>{
            this.shopDialog = null
        }
        ))),
        this.shopDialog
    }
    openSquadDialog() {
        this.squadDialog || (this.makeMainMenuVisibleFromUserGesture(),
        this.squadDialog = new SquadDialogUi(getMainInstance().network,getMainInstance().network.squadManager,getMainInstance().gameManager,getMainInstance().avatars,getMainInstance().skins),
        getMainInstance().dialogManager.addDialog(this.squadDialog),
        this.squadDialog.addOnCloseCb((()=>{
            this.squadDialog = null
        }
        )))
    }
    openMapsDialog() {
        if (this.mapsDialog)
            return;
        const t = getMainInstance();
        this.mapsDialog = new MapsDialogUi(t.config,t.preferredMapManager,t.gameManager),
        getMainInstance().dialogManager.addDialog(this.mapsDialog),
        this.mapsDialog.addOnCloseCb((()=>{
            this.mapsDialog = null
        }
        ))
    }
}
class AdBannerManager {
    constructor() {
        this.visiblePages = new Set,
        this.desktopBanner = document.createElement("div"),
        this.desktopBanner.classList.add("gameAd", "desktop", "hidden"),
        document.body.appendChild(this.desktopBanner),
        this.mobileBanner = document.createElement("div"),
        this.mobileBanner.classList.add("gameAd", "mobile", "hidden"),
        document.body.appendChild(this.mobileBanner)
    }
    init() {
        getMainInstance().mainMenu.onVisibilityChange((t=>{
            this.setPageVisibility("mainMenu", t && getMainInstance().gameManager.joinedOnce)
        }
        )),
        getMainInstance().dialogManager.onCurtainZIndexChange((t=>{
            const e = Math.max(100, t + 1);
            this.desktopBanner.style.zIndex = String(e),
            this.mobileBanner.style.zIndex = String(e)
        }
        ))
    }
    setPageVisibility(t, e) {
        e ? this.visiblePages.add(t) : this.visiblePages.delete(t);
        const i = this.visiblePages.size > 0;
        this.desktopBanner.classList.toggle("hidden", !i),
        this.mobileBanner.classList.toggle("hidden", !i),
        getMainInstance().poki.updateBannerVisibility()
    }
}
class AlertDialogUi extends DialogUi {
    constructor({title: t="", text: e="", buttons: i=[{
        text: "ok",
        testLabel: "ok",
        onClick: void 0
    }]}={}) {
        super({
            testLabel: "alert"
        }),
        this.indexPriority = 3,
        this.titleEl = document.createElement("h2"),
        this.titleEl.classList.add("dialogTitle", "blueNight"),
        t && (this.titleEl.textContent = t),
        this.el.appendChild(this.titleEl),
        this.textEl = document.createElement("div"),
        this.textEl.classList.add("dialogText"),
        e && (this.textEl.textContent = e),
        this.el.appendChild(this.textEl),
        this.addButtonsContainer(),
        this.createdButtons = [],
        this.setButtons(i)
    }
    setButtons(t) {
        for (const t of this.createdButtons)
            this.removeButton(t);
        this.createdButtons = [];
        for (const e of t) {
            const t = this.addButton({
                text: e.text,
                testLabel: e.testLabel,
                onClick: async()=>{
                    this.setButtonsEnabled(!1),
                    e.onClick && await e.onClick(),
                    this.close()
                }
            });
            t.enabled = e.enabled ?? !0,
            this.createdButtons.push(t)
        }
    }
    setButtonsEnabled(t) {
        for (const e of this.createdButtons)
            e.enabled = t
    }
    async waitForButton() {
        return await new Promise((t=>{
            for (const [e,i] of this.createdButtons.entries())
                i.onClick((()=>{
                    t(e)
                }
                ))
        }
        ))
    }
}
class DialogManager {
    constructor() {
        this.curtainEl = document.createElement("div"),
        this.curtainEl.classList.add("dialogCurtain", "fullScreen", "hidden"),
        document.body.appendChild(this.curtainEl),
        this._curtainElVisible = !1,
        this.onCurtainVisibilityChangeCbs = new Set,
        this.onNeedsUnlockedPointerChangeCbs = new Set,
        this.needsUnlockedPointer = !1,
        this.curtainEl.addEventListener("click", (t=>{
            this.closeTopMostDialog()
        }
        )),
        document.body.addEventListener("keydown", (t=>{
            "Escape" == t.code && this.closeTopMostDialog()
        }
        )),
        this.lastDialogAddTime = 0,
        this.currentDialogStack = [],
        this.onCurtainZIndexChangeCbs = new Set,
        this.onAnyDialogVisibilityChangeCbs = new Set,
        this.onAnyDialogVisibilityChange((()=>{
            this.updateZIndices(),
            this.updateInertDialogs(),
            this.updateFrontDialogProperties()
        }
        ))
    }
    addDialog(t) {
        this.lastDialogAddTime = performance.now(),
        this.currentDialogStack.push(t),
        this.sortStack(),
        t.addOnVisibilityChangeCb((t=>{
            this.fireAnyDialogVisibilityChangeCbs()
        }
        )),
        t.addOnCloseCb((()=>{
            const e = this.currentDialogStack.indexOf(t);
            this.currentDialogStack.splice(e, 1),
            this.fireAnyDialogVisibilityChangeCbs()
        }
        )),
        this.fireAnyDialogVisibilityChangeCbs()
    }
    getDialogForEl(t) {
        for (const e of this.currentDialogStack)
            if (e.el == t || e.wrapperEl == t)
                return e;
        return null
    }
    get frontDialog() {
        if (this.currentDialogStack.length <= 0)
            return null;
        for (let t = this.currentDialogStack.length - 1; t >= 0; t--) {
            const e = this.currentDialogStack[t];
            if (e.visible)
                return e
        }
        return null
    }
    get firstClosableDialog() {
        for (let t = this.currentDialogStack.length - 1; t >= 0; t--) {
            const e = this.currentDialogStack[t];
            if (e.visible && e.allowCurtainClose)
                return e
        }
        return null
    }
    get hasAnyDialogs() {
        return this.currentDialogStack.some((t=>t.visible))
    }
    get curtainElVisible() {
        return this._curtainElVisible
    }
    closeTopMostDialog() {
        if (performance.now() - this.lastDialogAddTime < 300)
            return;
        const t = this.firstClosableDialog;
        if (t) {
            if (t.customOnCurtainClickCb) {
                if (!t.customOnCurtainClickCb())
                    return
            }
            t.close()
        }
    }
    showAlert(t) {
        const e = new AlertDialogUi(t);
        return this.addDialog(e),
        e
    }
    onAnyDialogVisibilityChange(t) {
        this.onAnyDialogVisibilityChangeCbs.add(t)
    }
    fireAnyDialogVisibilityChangeCbs() {
        for (const t of this.onAnyDialogVisibilityChangeCbs)
            t()
    }
    sortStack() {
        this.currentDialogStack.sort(((t,e)=>{
            const i = t.indexPriority
              , s = e.indexPriority;
            if (i > s)
                return 1;
            if (i < s)
                return -1;
            const n = this.currentDialogStack.indexOf(t)
              , a = this.currentDialogStack.indexOf(e);
            return n > a ? 1 : n < a ? -1 : 0
        }
        ))
    }
    updateZIndices() {
        let t = !1
          , e = 0;
        for (const [i,s] of this.currentDialogStack.entries()) {
            const n = 100 + 2 * i;
            s.setZIndex(n),
            s.visible && s.needsCurtain && (t = !0,
            e = n - 1)
        }
        t && this.setCurtainZIndex(e),
        t != this._curtainElVisible && (this._curtainElVisible = t,
        this.curtainEl.classList.toggle("hidden", !t),
        this.onCurtainVisibilityChangeCbs.forEach((e=>e(t))))
    }
    updateInertDialogs() {
        const t = this.currentDialogStack.filter((t=>t.visible));
        let e = null;
        t.length > 0 && (e = t[t.length - 1]);
        for (const t of this.currentDialogStack)
            t.setInert(t != e)
    }
    setCurtainZIndex(t) {
        this.curtainEl.style.zIndex = String(t);
        for (const e of this.onCurtainZIndexChangeCbs)
            e(t)
    }
    onCurtainZIndexChange(t) {
        this.onCurtainZIndexChangeCbs.add(t)
    }
    onCurtainVisibilityChange(t) {
        this.onCurtainVisibilityChangeCbs.add(t)
    }
    removeOnCurtainVisibilityChange(t) {
        this.onCurtainVisibilityChangeCbs.delete(t)
    }
    onNeedsUnlockedPointerChange(t) {
        this.onNeedsUnlockedPointerChangeCbs.add(t)
    }
    removeOnNeedsUnlockedPointerChange(t) {
        this.onNeedsUnlockedPointerChangeCbs.delete(t)
    }
    updateFrontDialogProperties() {
        const t = this.frontDialog;
        let e = !1;
        t && (e = t.needsUnlockedPointer),
        e != this.needsUnlockedPointer && (this.needsUnlockedPointer = e,
        this.onNeedsUnlockedPointerChangeCbs.forEach((t=>t())))
    }
}
class InputKey {
    constructor({keyCodes: t=[], mouseButtons: e=[], gamepadButtons: i=[]}={}) {
        this.keyCodes = t,
        this.mouseButtons = e,
        this.gamepadButtons = i,
        this.pressed = !1,
        this.pressedGamepad = !1,
        this.onPressedChangeCbs = new Set,
        this.onPressedDownCbs = new Set,
        this.onPressedUpCbs = new Set
    }
    setKeyCodePressed(t, e, i) {
        let s = !1
          , n = !1;
        return this.keyCodes.includes(t) && (n = this.setKeyPressed(e, i),
        s = !0),
        {
            needsPreventDefault: s,
            preventOthers: n
        }
    }
    setMouseButtonPressed(t, e, i) {
        return !!this.mouseButtons.includes(t) && this.setKeyPressed(e, i)
    }
    setPressedGamepadButtons(t, e) {
        let i = !1;
        for (const e of this.gamepadButtons)
            if (t.includes(e)) {
                i = !0;
                break
            }
        return this.pressedGamepad != i && (this.pressedGamepad = i,
        this.setKeyPressed(i, e))
    }
    setKeyPressed(t, e=!1) {
        let i = !1;
        if (t != this.pressed && (this.pressed = t,
        !e)) {
            for (const e of this.onPressedChangeCbs) {
                e(t) && (i = !0)
            }
            if (t)
                for (const t of this.onPressedDownCbs) {
                    t() && (i = !0)
                }
            else
                for (const t of this.onPressedUpCbs) {
                    t() && (i = !0)
                }
        }
        return i
    }
    onPressedChange(t) {
        this.onPressedChangeCbs.add(t)
    }
    onPressedDown(t) {
        this.onPressedDownCbs.add(t)
    }
    onPressedUp(t) {
        this.onPressedUpCbs.add(t)
    }
    removeCb(t) {
        const e = t;
        this.onPressedChangeCbs.delete(e),
        this.onPressedDownCbs.delete(e),
        this.onPressedUpCbs.delete(e)
    }
}
class TouchInputElement {
    constructor({responsiveArea: t=null, cancelOthers: e=!0}={}) {
        this.el = document.createElement("div"),
        document.body.appendChild(this.el),
        this.visible = !0,
        this.currentUsingTouchId = null,
        this.didUpdateTouchLastLoop = !1,
        this.responsiveArea = t,
        this.cancelOthers = e
    }
    updateTouch(t) {
        if (this.responsiveArea && (null == this.currentUsingTouchId || this.responsiveArea.cancelWhenLeaving) && !this.responsiveArea.testTouchInResponsiveArea(t))
            return {
                didHit: !1
            };
        const e = this.onUpdateTouch(t);
        return e && (this.currentUsingTouchId = t.identifier,
        this.didUpdateTouchLastLoop = !0),
        {
            didHit: e,
            cancelOthers: e && this.cancelOthers
        }
    }
    onUpdateTouch(t) {
        return !1
    }
    endTouchLoop() {
        this.didUpdateTouchLastLoop || (this.currentUsingTouchId = null,
        this.onEndTouch()),
        this.didUpdateTouchLastLoop = !1
    }
    onEndTouch() {}
    setVisibility(t) {
        this.visible = t,
        this.el.style.display = t ? "" : "none"
    }
}
class TouchResponsiveArea {
    constructor(t=!1) {
        this.cancelWhenLeaving = t
    }
    testTouchInResponsiveArea(t) {
        return !1
    }
}
class TouchResponsiveAreaRadius extends TouchResponsiveArea {
    constructor(t, e, i) {
        super(i),
        this.pos = t || new Vector2,
        this.radius = e
    }
    testTouchInResponsiveArea(t) {
        return new Vector2(t.pageX,t.pageY).distanceTo(this.pos) < this.radius
    }
}
class TouchInputJoyStick extends TouchInputElement {
    constructor({defaultPos: t=new Vector2(0,0), hideWhenUsed: e=!0, responsiveArea: i=null, lockPosAtEnd: s=!0}={}) {
        super({
            responsiveArea: i
        }),
        this.currentValue = new Vector2,
        this.hideWhenUsed = e,
        this.containerPos = new Vector2,
        this.defaultPos = new Vector2,
        this.el.classList.add("touchInputJoyStickContainer", "touchInputWhiteBorder"),
        this.stickEl = document.createElement("div"),
        this.stickEl.classList.add("touchInputJoyStick"),
        this.el.appendChild(this.stickEl),
        this.lastIsTouchingValue = !1,
        this.lastIsTouchingToggleTime = 0,
        this.doubleTapped = !1,
        this.setDefaultPos(t)
    }
    onUpdateTouch(t) {
        const e = new Vector2(t.pageX,t.pageY);
        return null == this.currentUsingTouchId ? (this.onIsTouchingChange(!0),
        this.setPos(e),
        !0) : this.currentUsingTouchId == t.identifier && (this.setStickPos(e),
        this.setOpacity(.1),
        !0)
    }
    onEndTouch() {
        this.onIsTouchingChange(!1),
        this.resetPos(),
        this.setOpacity(1)
    }
    onIsTouchingChange(t) {
        this.doubleTapped = !1,
        t != this.lastIsTouchingValue && (this.lastIsTouchingValue = t,
        getMainInstance().now - this.lastIsTouchingToggleTime < 200 && t && (this.doubleTapped = !0),
        this.lastIsTouchingToggleTime = getMainInstance().now)
    }
    setOpacity(t) {
        this.el.style.opacity = String(t)
    }
    setDefaultPos(t) {
        this.defaultPos = t.clone(),
        this.responsiveArea instanceof TouchResponsiveAreaRadius && this.responsiveArea.pos.copy(this.defaultPos),
        this.resetPos()
    }
    resetPos() {
        this.setPos(this.defaultPos),
        this.setStickPos(this.defaultPos)
    }
    setPos(t) {
        t = t.clone(),
        this.containerPos = t,
        this.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`
    }
    setStickPos(t) {
        const e = t.clone();
        e.sub(this.containerPos);
        const i = e.clone();
        e.clampLength(0, 40),
        this.currentValue = e.clone(),
        this.currentValue.divideScalar(40);
        const s = i.sub(e)
          , n = this.containerPos.clone().add(s);
        n.x = clamp(n.x, 75, window.innerWidth - 75),
        n.y = clamp(n.y, 75, window.innerHeight - 75),
        this.stickEl.style.transform = `translate(${e.x}px, ${e.y}px) translate(-50%, -50%)`
    }
}
class TouchInputLook extends TouchInputElement {
    constructor() {
        super(),
        this.currentTouchId = null,
        this.prevTouchPos = new Vector2,
        this.lastDeltaPos = new Vector2
    }
    onUpdateTouch(t) {
        if (null == this.currentTouchId && (this.currentTouchId = t.identifier),
        this.currentTouchId != t.identifier)
            return !1;
        const e = new Vector2(t.pageX,t.pageY);
        return null == this.currentUsingTouchId && this.prevTouchPos.copy(e),
        this.lastDeltaPos = e.clone().sub(this.prevTouchPos),
        this.prevTouchPos.copy(e),
        !0
    }
    onEndTouch() {
        this.lastDeltaPos = new Vector2,
        this.currentTouchId = null
    }
}
class TouchInputButton extends TouchInputElement {
    constructor({left: t=null, right: e=null, top: i=null, bottom: s=null, radius: n=35, responsiveArea: a=null, img: o=null, cancelOthers: r=!1}={}) {
        super({
            responsiveArea: a,
            cancelOthers: r
        }),
        this.el.classList.add("touchInputButton", "touchInputWhiteBorder"),
        this.el.style.width = 2 * n + "px",
        this.el.style.height = 2 * n + "px",
        this.left = t,
        this.right = e,
        this.top = i,
        this.bottom = s,
        this.radius = n,
        o && (this.el.style.backgroundImage = `url(${o})`),
        this.updatePosition(),
        addResizeListener((()=>{
            this.updatePosition()
        }
        )),
        this.linkedInputKeys = new Set,
        this.pressed = !1
    }
    updatePosition() {
        this.left && (this.el.style.left = this.left + "px"),
        this.right && (this.el.style.right = this.right + "px"),
        this.top && (this.el.style.top = this.top + "px"),
        this.bottom && (this.el.style.bottom = this.bottom + "px"),
        this.updateResponsiveAreaPos()
    }
    updateResponsiveAreaPos() {
        if (this.responsiveArea instanceof TouchResponsiveAreaRadius) {
            let t = 0
              , e = 0;
            this.left && (t = this.left + this.radius),
            this.top && (e = this.top + this.radius),
            this.right && (t = window.innerWidth - this.right - this.radius),
            this.bottom && (e = window.innerHeight - this.bottom - this.radius),
            this.responsiveArea.pos.set(t, e)
        }
    }
    onUpdateTouch(t) {
        return this.setPressed(!0),
        !0
    }
    onEndTouch() {
        this.setPressed(!1)
    }
    setPressed(t) {
        this.pressed = t,
        this.setPressedClass();
        for (const e of this.linkedInputKeys)
            e.setKeyPressed(t)
    }
    setPressedClass() {
        this.el.classList.toggle("touching", this.pressed)
    }
    setVisibility(t) {
        this.el.classList.toggle("hidden", !t)
    }
    addInputKey(t) {
        this.linkedInputKeys.add(t)
    }
}
class TouchResponsiveAreaScreenRect extends TouchResponsiveArea {
    constructor(t, e, i, s, n=!1) {
        super(n),
        this.left = t,
        this.right = e,
        this.top = i,
        this.bottom = s
    }
    testTouchInResponsiveArea(t) {
        const e = t.pageX / window.innerWidth
          , i = t.pageY / window.innerHeight;
        return e > this.left && e < this.right && i > this.top && i < this.bottom
    }
}
class TouchInputManager {
    constructor() {
        this.touchListener = document.createElement("div"),
        this.touchListener.classList.add("touchListener", "fullScreen"),
        document.body.appendChild(this.touchListener),
        this.joyStick = null,
        this.lookInput = null,
        this.jumpButton = null,
        this.fireButton = null,
        this.toggleWeaponButton = null,
        this.chatButton = null,
        this.playerListButton = null,
        this.thirdPersonButton = null,
        this.touchElements = [],
        this.smallCornerButtons = [],
        this.lastDeltaLook = new Vector2,
        this.touchSupported = !1,
        document.body.addEventListener("touchstart", (t=>{
            if (!this.touchSupported) {
                this.touchSupported = !0,
                this.joyStick = new TouchInputJoyStick({
                    responsiveArea: new TouchResponsiveAreaScreenRect(0,.5,0,1)
                }),
                this.lookInput = new TouchInputLook,
                this.jumpButton = new TouchInputButton({
                    right: 150,
                    bottom: 30,
                    responsiveArea: new TouchResponsiveAreaRadius(null,50,!1),
                    img: "static/img/touchUI/jump.svg"
                }),
                this.jumpButton.addInputKey(getMainInstance().input.getKey("jump")),
                this.fireButton = new TouchInputButton({
                    right: 80,
                    bottom: 100,
                    radius: 50,
                    responsiveArea: new TouchResponsiveAreaRadius(null,70,!1),
                    img: "static/img/touchUI/shoot.svg"
                }),
                this.fireButton.addInputKey(getMainInstance().input.getKey("fire")),
                this.toggleWeaponButton = new TouchInputButton({
                    right: 30,
                    bottom: 200,
                    responsiveArea: new TouchResponsiveAreaRadius(null,40,!1),
                    img: "static/img/touchUI/toggleWeapon.svg"
                }),
                this.toggleWeaponButton.addInputKey(getMainInstance().input.getKey("toggleWeapon")),
                this.toggleWeaponButton.setVisibility(!1),
                this.playerListButton = new TouchInputButton({
                    left: 20,
                    top: 100,
                    radius: 15,
                    responsiveArea: new TouchResponsiveAreaRadius(null,20,!1),
                    img: "static/img/touchUI/playerList.svg",
                    cancelOthers: !0
                }),
                this.playerListButton.addInputKey(getMainInstance().input.getKey("playerListTouch")),
                this.thirdPersonButton = new TouchInputButton({
                    left: 60,
                    top: 100,
                    radius: 15,
                    responsiveArea: new TouchResponsiveAreaRadius(null,20,!1),
                    img: "static/img/touchUI/view.svg",
                    cancelOthers: !0
                }),
                this.thirdPersonButton.addInputKey(getMainInstance().input.getKey("toggleThirdPerson")),
                this.chatButton = new TouchInputButton({
                    left: 100,
                    top: 100,
                    radius: 15,
                    responsiveArea: new TouchResponsiveAreaRadius(null,20,!1),
                    img: "static/img/touchUI/chat.svg",
                    cancelOthers: !0
                }),
                this.chatButton.setVisibility(!1),
                this.chatButton.addInputKey(getMainInstance().input.getKey("toggleChatVisibility")),
                this.smallCornerButtons = [this.playerListButton, this.thirdPersonButton, this.chatButton],
                this.touchElements.push(this.playerListButton, this.thirdPersonButton, this.chatButton, this.joyStick, this.jumpButton, this.fireButton, this.toggleWeaponButton, this.lookInput),
                this.onResize();
                for (const t of this.onTouchSupportedChangeCbs)
                    t()
            }
        }
        )),
        this.onTouchSupportedChangeCbs = new Set,
        this.onTouchListenerClickCbs = new Set,
        this.touchListener.addEventListener("click", (()=>{
            for (const t of this.onTouchListenerClickCbs)
                t()
        }
        )),
        this.touchListener.addEventListener("touchstart", (t=>{
            this.updateTouches(t)
        }
        ), {
            passive: !1
        }),
        this.touchListener.addEventListener("touchmove", (t=>{
            this.updateTouches(t)
        }
        ), {
            passive: !1
        }),
        this.touchListener.addEventListener("touchend", (t=>{
            this.updateTouches(t)
        }
        ), {
            passive: !1
        }),
        window.addEventListener("focus", (()=>{
            this.updateCursorVisibility()
        }
        )),
        window.addEventListener("blur", (()=>{
            this.updateCursorVisibility()
        }
        )),
        this.updateCursorVisibility(),
        addResizeListener((()=>{
            this.onResize()
        }
        )),
        this.onResize()
    }
    get joyStickValue() {
        return this.joyStick ? this.joyStick.currentValue.clone() : new Vector2
    }
    onResize() {
        if (!this.touchSupported)
            return;
        if (this.joyStick) {
            const t = new Vector2(100,window.innerHeight - 100);
            this.joyStick.setDefaultPos(t)
        }
        const t = window.innerWidth < 500;
        this.jumpButton && (this.jumpButton.right = t ? 60 : 170,
        this.jumpButton.updatePosition()),
        this.fireButton && (this.fireButton.right = t ? 20 : 80,
        this.fireButton.updatePosition());
        const e = getComputedStyle(document.body).getPropertyValue("--game-ui-state").includes("small");
        for (const t of this.smallCornerButtons)
            t.top = e ? 50 : 100,
            t.updatePosition()
    }
    onTouchSupportedChange(t) {
        this.onTouchSupportedChangeCbs.add(t)
    }
    removeOnTouchSupportedChange(t) {
        this.onTouchSupportedChangeCbs.delete(t)
    }
    *visibileTouchElements() {
        for (const t of this.touchElements)
            t.visible && (yield t)
    }
    updateTouches(t) {
        t.cancelable && t.preventDefault();
        for (const e of t.touches) {
            let t = !1;
            for (const i of this.visibileTouchElements())
                if (i.currentUsingTouchId == e.identifier) {
                    const {didHit: s, cancelOthers: n} = i.updateTouch(e);
                    if (s && (t = !0),
                    n)
                        break
                }
            if (!t)
                for (const t of this.visibileTouchElements()) {
                    const {cancelOthers: i} = t.updateTouch(e);
                    if (i)
                        break
                }
        }
        for (const t of this.touchElements)
            t.endTouchLoop();
        this.lookInput && this.lastDeltaLook.add(this.lookInput.lastDeltaPos)
    }
    loop(t, e) {}
    afterLoop() {
        this.lastDeltaLook.set(0, 0)
    }
    onTouchListenerClick(t) {
        this.onTouchListenerClickCbs.add(t)
    }
    updateCursorVisibility() {
        this.touchListener.classList.toggle("focus", document.hasFocus())
    }
}
class InputManager {
    constructor() {
        this.keys = new Map,
        this.keys.set("left", new InputKey({
            keyCodes: ["KeyA", "ArrowLeft"]
        })),
        this.keys.set("right", new InputKey({
            keyCodes: ["KeyD", "ArrowRight"]
        })),
        this.keys.set("up", new InputKey({
            keyCodes: ["KeyW", "ArrowUp"]
        })),
        this.keys.set("down", new InputKey({
            keyCodes: ["KeyS", "ArrowDown"]
        })),
        this.keys.set("flyUp", new InputKey({
            keyCodes: ["KeyE", "Space"]
        })),
        this.keys.set("flyDown", new InputKey({
            keyCodes: ["KeyQ"]
        })),
        this.keys.set("jump", new InputKey({
            keyCodes: ["Space"],
            gamepadButtons: [0]
        })),
        this.keys.set("fire", new InputKey({
            keyCodes: [],
            gamepadButtons: [7],
            mouseButtons: [0]
        })),
        this.keys.set("prevWeapon", new InputKey({
            keyCodes: ["wheelUp"],
            gamepadButtons: [4]
        })),
        this.keys.set("nextWeapon", new InputKey({
            keyCodes: ["wheelDown"],
            gamepadButtons: [5]
        })),
        this.keys.set("toggleWeapon", new InputKey({
            keyCodes: ["KeyQ", "wheelUp", "wheelDown"],
            gamepadButtons: [4, 5]
        })),
        this.keys.set("playerList", new InputKey({
            keyCodes: ["Tab"],
            gamepadButtons: [9]
        })),
        this.keys.set("playerListTouch", new InputKey),
        this.keys.set("toggleThirdPerson", new InputKey({
            keyCodes: ["KeyY"],
            gamepadButtons: [8]
        })),
        this.keys.set("chat", new InputKey({
            keyCodes: ["KeyT"]
        })),
        this.keys.set("toggleChatVisibility", new InputKey),
        this.desiredPointerLockedState = !1,
        window.addEventListener("keydown", (t=>{
            this.setKeyCodePressed(t, !0),
            this._updatePointerLockedState()
        }
        )),
        window.addEventListener("keyup", (t=>{
            this.setKeyCodePressed(t, !1)
        }
        ));
        const t = t=>t.target == document.body || (t.target == this.touch.touchListener || t.target == getMainInstance().mainMenu.el);
        this.mouseIsOnDocument = !1,
        document.body.addEventListener("mouseenter", (()=>{
            this.mouseIsOnDocument = !0
        }
        )),
        document.body.addEventListener("mouseleave", (()=>{
            this.mouseIsOnDocument = !1
        }
        )),
        window.addEventListener("mousedown", (e=>{
            t(e) && (this.setMouseButtonPressed(e.button, !0),
            this.mouseIsOnDocument = !0,
            this._updatePointerLockedState())
        }
        )),
        window.addEventListener("mouseup", (e=>{
            t(e) && this.setMouseButtonPressed(e.button, !1)
        }
        )),
        window.addEventListener("mousemove", (t=>{
            this.mouseIsOnDocument = !0,
            this.mouseMove.x += t.movementX || 0,
            this.mouseMove.y += t.movementY || 0
        }
        )),
        this.lastWheelEventTime = 0,
        this.wheelMoveAmount = 0,
        this.lastFiredWheelButtonTime = 0,
        this.recentWheelButtonCount = 0,
        window.addEventListener("wheel", (t=>{
            if (getMainInstance().mainMenu.visible)
                return;
            t.preventDefault();
            performance.now() - this.lastWheelEventTime > 200 ? (this.wheelMoveAmount = 0,
            t.deltaY > 0 ? this.fireWheelButton("wheelUp") : this.fireWheelButton("wheelDown")) : (this.wheelMoveAmount += t.deltaY,
            this.wheelMoveAmount > 100 ? (this.fireWheelButton("wheelUp"),
            this.wheelMoveAmount = 0) : this.wheelMoveAmount < -100 && (this.fireWheelButton("wheelDown"),
            this.wheelMoveAmount = 0)),
            this.lastWheelEventTime = performance.now()
        }
        ), {
            passive: !1
        }),
        window.addEventListener("focus", (t=>{
            this.unpressAll()
        }
        )),
        this.onPointerLockChangeCbs = new Set,
        this.onDesiredPointerLockChangeCbs = new Set,
        this._lastPointerLockChangeByApplicationTime = -1 / 0,
        document.addEventListener("pointerlockchange", (t=>{
            const e = this.pointerLocked;
            e || this.unpressAll();
            let i = !0;
            performance.now() - this._lastPointerLockChangeByApplicationTime < 500 && (i = !1,
            this._lastPointerLockChangeByApplicationTime = -1 / 0),
            this.onPointerLockChangeCbs.forEach((t=>t(e, i)))
        }
        )),
        this.stickDeadZone = .1,
        this.gamepadLookSensivity = 1.2,
        this.touch = new TouchInputManager,
        this.mouseMove = new Vector2,
        this.walkInput = new Vector2,
        this.lookInput = new Vector2,
        this.gamepadAxes = []
    }
    init() {
        const t = getMainInstance();
        t.mainMenu.onVisibilityChange((()=>{
            this.updateDesiredPointerLockedState()
        }
        )),
        t.dialogManager.onNeedsUnlockedPointerChange((()=>{
            this.updateDesiredPointerLockedState()
        }
        )),
        t.poki.onIsShowingBreakChange((()=>{
            this.updateDesiredPointerLockedState()
        }
        )),
        t.gameManager.onActiveGameChange((t=>{
            t instanceof Game && (t.onGameEnd((()=>{
                this.updateDesiredPointerLockedState()
            }
            )),
            t.onGameEndFinish((()=>{
                this.updateDesiredPointerLockedState()
            }
            )),
            t.onGameEndStatsScreen((()=>{
                this.updateDesiredPointerLockedState()
            }
            ))),
            this.updateDesiredPointerLockedState()
        }
        ))
    }
    loop(t, e) {
        this.touch.loop(t, e);
        const i = getMainInstance();
        if (i.mainMenu.visible)
            this.lookInput.set(0, 0);
        else {
            this.lookInput.copy(this.mouseMove),
            this.lookInput.addScaledVector(this.touch.lastDeltaLook, 3);
            const t = i.settingsManager;
            this.lookInput.multiplyScalar(t.getValue("mouseSensitivity")),
            t.getValue("invertMouseY") && (this.lookInput.y *= -1)
        }
        this.mouseMove.set(0, 0),
        this.updateGamepadStates(t, e),
        this.touch.touchSupported && this.updateAxisInputs(),
        this.touch.afterLoop()
    }
    updateGamepadStates(t, e) {
        this.gamepadAxes = [];
        let i = [];
        try {
            i = navigator.getGamepads()
        } catch {}
        const s = [];
        let n = !1;
        for (const t of i) {
            if (!t)
                continue;
            if (t.axes) {
                const e = t.axes;
                for (let t = 0; t < e.length - 1; t += 2) {
                    const i = new Vector2(e[t],e[t + 1])
                      , s = mapValue(this.stickDeadZone, 1, 0, 1, i.length(), !0);
                    i.setLength(s),
                    this.gamepadAxes.push(i)
                }
                n = !0
            }
            const e = t.buttons;
            if (e)
                for (let t = 0; t < e.length; t++) {
                    const i = e[t];
                    i && (i.pressed && s.push(t))
                }
        }
        this.setPressedGamepadButtons(s),
        n && this.updateAxisInputs(),
        this.gamepadAxes.length > 1 && this.lookInput.addScaledVector(this.gamepadAxes[1], this.gamepadLookSensivity * e)
    }
    get pointerLocked() {
        return document.pointerLockElement == document.body
    }
    setKeyCodePressed(t, e) {
        if (e && document.activeElement && ["INPUT", "SELECT", "BUTTON"].includes(document.activeElement.tagName))
            return;
        if (getMainInstance().mainMenu.visible)
            return;
        let i = !1
          , s = !1;
        for (const n of this.keys.values()) {
            const {preventOthers: a, needsPreventDefault: o} = n.setKeyCodePressed(t.code, e, i);
            a && (i = !0),
            o && !s && (t.preventDefault(),
            s = !0)
        }
        this.updateAxisInputs()
    }
    setMouseButtonPressed(t, e) {
        let i = !1;
        for (const s of this.keys.values()) {
            s.setMouseButtonPressed(t, e, i) && (i = !0)
        }
        this.updateAxisInputs()
    }
    fireWheelButton(t) {
        const e = performance.now() - this.lastFiredWheelButtonTime;
        if (e < mapValue(4, 10, 0, 300, this.recentWheelButtonCount, !0))
            return;
        this.recentWheelButtonCount += mapValue(50, 2e3, 1, -10, e, !0),
        this.recentWheelButtonCount = Math.max(0, this.recentWheelButtonCount),
        this.lastFiredWheelButtonTime = performance.now();
        let i = !1;
        for (const e of this.keys.values()) {
            const {preventOthers: s} = e.setKeyCodePressed(t, !0, i);
            e.setKeyCodePressed(t, !1, i),
            s && (i = !0)
        }
    }
    setPressedGamepadButtons(t) {
        let e = !1;
        for (const i of this.keys.values()) {
            i.setPressedGamepadButtons(t, e) && (e = !0)
        }
    }
    unpressAll() {
        for (const t of this.keys.values())
            t.setKeyPressed(!1, !1);
        this.updateAxisInputs()
    }
    updateAxisInputs() {
        this.walkInput.set(0, 0),
        this.getKey("left").pressed && (this.walkInput.x = -1),
        this.getKey("right").pressed && (this.walkInput.x = 1),
        this.getKey("up").pressed && (this.walkInput.y = -1),
        this.getKey("down").pressed && (this.walkInput.y = 1),
        this.gamepadAxes.length > 0 && this.walkInput.add(this.gamepadAxes[0]),
        this.walkInput.add(this.touch.joyStickValue),
        this.walkInput.clampLength(0, 1)
    }
    getKey(t) {
        const e = this.keys.get(t);
        if (!e)
            throw new Error(`Key ${t} not found`);
        return e
    }
    onPointerLockChange(t) {
        this.onPointerLockChangeCbs.add(t)
    }
    onDesiredPointerLockChange(t) {
        this.onDesiredPointerLockChangeCbs.add(t)
    }
    updateDesiredPointerLockedState() {
        let t = !0;
        const e = getMainInstance()
          , i = e.gameManager.activeGame;
        (e.mainMenu.visible || e.dialogManager.needsUnlockedPointer || i instanceof Game && (i.gameEndStepsReachedStatScreens || i.finishedGameEndFlow) || e.poki.isShowingBreak) && (t = !1),
        t != this.desiredPointerLockedState && (this.desiredPointerLockedState = t,
        this.onDesiredPointerLockChangeCbs.forEach((t=>t(this.desiredPointerLockedState))),
        this._updatePointerLockedState())
    }
    _updatePointerLockedState() {
        if (this.desiredPointerLockedState != this.pointerLocked)
            if (this.desiredPointerLockedState) {
                if (!document.hasFocus())
                    return;
                if (!document.body.requestPointerLock)
                    return;
                this._lastPointerLockChangeByApplicationTime = performance.now(),
                this._tryLockPointer()
            } else {
                if (!document.exitPointerLock)
                    return;
                this._lastPointerLockChangeByApplicationTime = performance.now(),
                document.exitPointerLock()
            }
    }
    async _tryLockPointer() {
        if (!this.mouseIsOnDocument)
            return;
        const t = !getMainInstance().settingsManager.getValue("mouseAcceleration");
        try {
            try {
                await document.body.requestPointerLock({
                    unadjustedMovement: t
                })
            } catch (t) {
                let e = !1;
                if (t instanceof DOMException && t.message.includes("not supported") && (e = !0),
                !e)
                    throw t;
                await document.body.requestPointerLock()
            }
        } catch (t) {
            if (t instanceof DOMException) {
                if ("SecurityError" == t.name)
                    return;
                if ("InUseAttributeError" == t.name)
                    return;
                if ("NotAllowedError" == t.name)
                    return;
                if ("UnknownError" == t.name && t.message.includes("Please report this bug to chromium"))
                    return;
                if ("NotSupportedError" == t.name && this.touch.touchSupported)
                    return
            }
            throw t
        }
    }
}
class ConfigLoader {
    constructor(t, e) {
        this.configManager = t,
        this.configPath = e,
        this.onConfigChangeCbs = new Set,
        this.loadedConfigData = null
    }
    transformData(t) {
        throw new Error("transformData not implemented")
    }
    async load() {
        const t = await fetch(this.configManager.basePath + this.configPath);
        if (t.ok)
            try {
                this.loadedConfigData = await t.json()
            } catch (t) {
                this.configManager.suppressLogs || console.warn("Failed to load shop config: ", t)
            }
        if (this.loadedConfigData = this.transformData(this.loadedConfigData),
        this.loadedConfigData)
            for (const t of this.onConfigChangeCbs)
                t(this.loadedConfigData)
    }
    onConfigChange(t, e=!0) {
        this.loadedConfigData && e && t(this.loadedConfigData),
        this.onConfigChangeCbs.add(t)
    }
    removeOnConfigChange(t) {
        this.onConfigChangeCbs.delete(t)
    }
    async waitForConfigLoad() {
        this.loadedConfigData || await new Promise((t=>this.onConfigChange(t)))
    }
}
class MapsConfigLoader extends ConfigLoader {
    transformData(t) {
        if (!t)
            return {
                mainMenuMapHash: "",
                maps: [],
                lastUpdatedTimestamp: 0
            };
        if (t.maps) {
            const e = []
              , i = new Set
              , s = new Set;
            for (const n of t.maps)
                n.assetName && n.hash && (i.has(n.hash) || s.has(n.assetName) || (e.push(n),
                i.add(n.hash),
                s.add(n.assetName)));
            t.maps = e;
            for (const e of t.maps)
                Number.isFinite(e.size) || (e.size = 0)
        } else
            t.maps = [];
        return !!t.maps.find((e=>e.hash == t.mainMenuMapHash)) || (t.mainMenuMapHash = t.maps.length ? t.maps[0].hash : ""),
        t.lastUpdatedTimestamp && "number" == typeof t.lastUpdatedTimestamp || (t.lastUpdatedTimestamp = 0),
        t
    }
    getListedMapConfigByHash(t) {
        return this.loadedConfigData && this.loadedConfigData.maps.find((e=>e.hash === t)) || null
    }
    hasListedMapConfigByHash(t) {
        return !!this.loadedConfigData && !!this.loadedConfigData.maps.find((e=>e.hash === t))
    }
}
class PromosConfigLoader extends ConfigLoader {
    transformData(t) {
        return t ? (t.activePromos ? t.activePromos = t.activePromos.filter((t=>t.id && t.image)) : t.activePromos = [],
        t) : {
            activePromos: []
        }
    }
}
class ShopConfigLoader extends ConfigLoader {
    transformData(t) {
        return t ? (t.purchasableItems ? t.purchasableItems = t.purchasableItems.filter((t=>t.id)) : t.purchasableItems = [],
        t.skinPresets && Array.isArray(t.skinPresets) ? t.skinPresets.map((t=>sanitizeSkinData(t))) : t.skinPresets = [],
        t) : {
            purchasableItems: [],
            skinPresets: []
        }
    }
    getPurchaseableItem(t) {
        return this.loadedConfigData && this.loadedConfigData.purchasableItems.find((e=>e.id === t)) || null
    }
}
class ConfigManager {
    constructor() {
        this.basePath = null,
        this.suppressLogs = !1,
        this.shopConfig = new ShopConfigLoader(this,"shopConfig.json"),
        this.promosConfig = new PromosConfigLoader(this,"promosConfig.json"),
        this.mapsConfig = new MapsConfigLoader(this,"mapsConfig.json"),
        this.allConfigs = [this.shopConfig, this.promosConfig, this.mapsConfig]
    }
    init() {
        const t = parseSearch();
        t.configBasePath ? this.basePath = t.configBasePath : "local" == getMainInstance().env || "localhost" == location.hostname && location.pathname.startsWith("/dist/") || "local" == t.configEnv ? this.basePath = `${location.protocol}//${location.host}/config/` : "dev" == t.configEnv || "staging" == t.configEnv || t.pokiDebug || "staging.narrow.one" == location.hostname ? this.basePath = "https://narrow-one.com/stagingconfig/" : (t.configEnv,
        this.basePath = "https://narrow-one.com/config/");
        const e = this.basePath;
        (async()=>{
            (await getMainInstance().assets.getMessenger()).send.setConfigBasePath(e)
        }
        )(),
        this.loadAllConfigs()
    }
    loadAllConfigs() {
        for (const t of this.allConfigs)
            t.load()
    }
}
class OfflineRoamingGame {
    constructor() {
        this.physics = new PhysicsManager,
        this.hingeManager = new HingeManager,
        this.arrowManager = new ArrowManager(this.physics,this.hingeManager,1),
        this.crosshair = new Crosshair,
        this.destructed = !1,
        this.receivedColliders = !1,
        this.scene = null,
        this.gameIsVisible = !1,
        this.onGameIsVisibleCbs = new Set,
        this.onSdkGameplayStartedChangeCbs = new Set,
        this.prevSdkGameplayStarted = !1;
        const t = getMainInstance();
        this.myPlayer = new Player(this,t.input,t.sfx,this.physics,t.settingsManager,t.hudIcons,1,{
            needsPlayerModel: !1,
            needsSkeleton: !1
        }),
        this.myPlayer.init(),
        this.myPlayer.setHasOwnership(!0),
        this.loadMap(),
        this.boundUpdateUiVisible = this.updateUiVisible.bind(this),
        getMainInstance().mainMenu.onVisibilityChange(this.boundUpdateUiVisible),
        this.updateUiVisible()
    }
    destructor() {
        this.destructed = !0,
        this.physics.destructor(),
        this.hingeManager.destructor(),
        this.arrowManager.destructor(),
        this.crosshair.destructor(),
        this.myPlayer.destructor(),
        this.setMapScene(null),
        this.updateSdkGameplayStarted(),
        getMainInstance().mainMenu.removeOnVisibilityChange(this.boundUpdateUiVisible)
    }
    loadMap() {
        const t = t=>{
            if ("colliders" == t.type) {
                this.physics.removeMapColliders();
                for (const e of t.colliders)
                    this.physics.addMapCollider(e);
                this.physics.buildOctree(),
                this.receivedColliders = !0,
                this.updateGameIsVisible()
            } else
                "scene" == t.type && (this.destructed ? MapLoader.disposeMapGeometries(t.scene) : this.setMapScene(t.scene),
                this.hingeManager.setHingeObjects(t.hinges))
        }
        ;
        getMainInstance().mapLoader.loadLoadingMap(t)
    }
    setMapScene(t) {
        this.scene && (MapLoader.disposeMapGeometries(this.scene),
        getMainInstance().scene.remove(this.scene)),
        this.scene = t,
        t && getMainInstance().scene.add(t),
        this.updateGameIsVisible()
    }
    get gameStarted() {
        return !1
    }
    get gameEnded() {
        return !1
    }
    get sdkGameplayStarted() {
        return this.gameIsVisible && !this.destructed
    }
    onSdkGameplayStartedChange(t) {
        this.onSdkGameplayStartedChangeCbs.add(t)
    }
    updateSdkGameplayStarted() {
        this.sdkGameplayStarted != this.prevSdkGameplayStarted && (this.prevSdkGameplayStarted = this.sdkGameplayStarted,
        this.onSdkGameplayStartedChangeCbs.forEach((t=>t())))
    }
    loop(t, e) {
        this.hingeManager.loop(t, e),
        this.arrowManager.loop(t, e),
        this.crosshair.loop(t, e),
        this.myPlayer.loop(t, e),
        this.receivedColliders && this.physics.loop(t, e),
        this.myPlayer.afterPhysicsLoop(t, e)
    }
    onMyPlayerChange(t) {}
    getMyPlayer() {
        return this.myPlayer
    }
    getSpawnPosition() {
        return {
            pos: new Vector3,
            rot: new Quaternion
        }
    }
    getArrowAssetName() {
        return "arrow.glb"
    }
    updateGameIsVisible() {
        const t = Boolean(this.scene && this.receivedColliders);
        t != this.gameIsVisible && (this.gameIsVisible = t,
        this.onGameIsVisibleCbs.forEach((t=>t())),
        this.updateSdkGameplayStarted(),
        getMainInstance().renderer.renderWorthyEventHappened())
    }
    onGameIsVisible(t) {
        this.onGameIsVisibleCbs.add(t)
    }
    updateUiVisible() {
        const t = !getMainInstance().mainMenu.visible && !getMainInstance().mainMenu.hideUi;
        this.setUiVisible(t)
    }
    setUiVisible(t) {
        this.crosshair.setGameUiVisibility(t)
    }
}
class GameManager {
    constructor() {
        this.activeGame = null,
        this.loadingBackgroundGame = null,
        this.joinedOnce = !1,
        this.isInGamesLoop = !1,
        this.onIsInGamesLoopChangeCbs = new Set,
        this.onActiveGameChangeCbs = new Set,
        this.readyToJoin = !1,
        this.onReadyToJoinChangeCbs = new Set,
        this.onGameEndCbs = new Set,
        this.windSfx = null,
        this.waterSfx = null,
        this.birdsSfx = null,
        this.jungleSfx = null,
        this.rainSfx = null,
        this.insectsSfx = null
    }
    async init() {
        this.loadWindSfx(),
        this.loadWaterSfx(),
        this.loadBirdsSfx(),
        this.loadJungleSfx(),
        this.loadRainSfx(),
        this.loadInsectsSfx(),
        this.loadOfflineRoamingGame(),
        await getMainInstance().network.waitForInit(),
        this.setReadyToJoin(!0),
        await this.prepareMatchMaking()
    }
    async loadWindSfx() {
        this.windSfx = await getMainInstance().sfx.playSound("ambient/wind")
    }
    async loadWaterSfx() {
        this.waterSfx = await getMainInstance().sfx.playSound("ambient/water")
    }
    async loadBirdsSfx() {
        this.birdsSfx = await getMainInstance().sfx.playSound("ambient/birds")
    }
    async loadJungleSfx() {
        this.jungleSfx = await getMainInstance().sfx.playSound("ambient/jungle")
    }
    async loadRainSfx() {
        this.rainSfx = await getMainInstance().sfx.playSound("ambient/rain")
    }
    async loadInsectsSfx() {
        this.insectsSfx = await getMainInstance().sfx.playSound("ambient/insects")
    }
    setAmbientVolumes(t, e, i, s, n, a) {
        this.waterSfx && this.waterSfx.setVolume(e),
        this.windSfx && this.windSfx.setVolume(t),
        this.birdsSfx && this.birdsSfx.setVolume(i),
        this.jungleSfx && this.jungleSfx.setVolume(s),
        this.rainSfx && this.rainSfx.setVolume(n),
        this.insectsSfx && this.insectsSfx.setVolume(a)
    }
    onActiveGameChange(t) {
        this.onActiveGameChangeCbs.add(t)
    }
    removeOnCurrentGameChange(t) {
        this.onActiveGameChangeCbs.delete(t)
    }
    fireCurrentGameChangeCbs() {
        this.activeGame && this.activeGame.onGameIsVisible((()=>{
            this.updateSdkGameplayStarted()
        }
        )),
        this.updateSdkGameplayStarted(),
        this.onActiveGameChangeCbs.forEach((t=>t(this.activeGame)))
    }
    onIsInGamesLoopChange(t) {
        this.onIsInGamesLoopChangeCbs.add(t)
    }
    setIsInGamesLoop(t) {
        this.isInGamesLoop != t && (this.isInGamesLoop = t,
        this.onIsInGamesLoopChangeCbs.forEach((e=>e(t))))
    }
    loop(t, e) {
        if (this.activeGame && this.activeGame.loop(t, e),
        this.rainSfx) {
            const e = getMainInstance();
            if (e.mapLoader.mapVariablesManager.get("lightningEnabled")) {
                const i = this.rainSfx.getEstimatedTime()
                  , s = clamp01(1 - 4 * Math.abs(i - 17));
                let n = 0;
                if (s > 0) {
                    let e = 0;
                    e += Math.cos(.02 * t),
                    e += Math.cos(.06 * t),
                    e += Math.cos(.09 * t),
                    n += clamp01(e / 3) * s * 3
                }
                e.materials.setLightningValue(n)
            } else
                e.materials.setLightningValue(0)
        }
    }
    async prepareMatchMaking(t=!1, e=!1) {
        if ((!e || getMainInstance().network.matchMaking.isInUnreadyQueue) && getMainInstance().network.shouldUseMatchMaking && (await getMainInstance().network.matchMaking.initConnection(),
        t)) {
            if (e && !getMainInstance().network.matchMaking.isInUnreadyQueue)
                return;
            const t = this.getOnlineGame();
            if (t && !t.canEstimateGameEndWaitTime())
                return;
            await getMainInstance().network.matchMaking.updateQueueState({
                isReadyToJoin: !1,
                maxWaitTimeMs: this.estimateMaxWaitTimeSeconds()
            })
        }
    }
    loadOfflineRoamingGame() {
        this.destroyCurrentGame();
        const t = new OfflineRoamingGame;
        this.activeGame = t,
        this.fireCurrentGameChangeCbs()
    }
    joinedGameId(t) {
        this.activeGame instanceof Game && !this.activeGame.gameEnded && this.destroyCurrentGame();
        const e = new Game;
        this.activeGame ? (this.loadingBackgroundGame && this.loadingBackgroundGame.destructor(),
        this.loadingBackgroundGame = e,
        e.onMyPlayerChange((()=>{
            e.getMyPlayer() && e == this.loadingBackgroundGame && (this.destroyCurrentGame(),
            this.activeGame = e,
            this.activeGame.becameForegroundGame(),
            this.loadingBackgroundGame = null,
            this.fireCurrentGameChangeCbs())
        }
        ))) : (this.activeGame = e,
        this.activeGame.becameForegroundGame(),
        this.fireCurrentGameChangeCbs()),
        e.onGameEnd((()=>{
            this.prepareMatchMaking(!0);
            for (const t of this.onGameEndCbs)
                t()
        }
        )),
        e.onGameEndFinish((()=>{
            this.activeGame == e && this.joinGameAfterAd()
        }
        )),
        e.onSdkGameplayStartedChange((()=>{
            this.updateSdkGameplayStarted()
        }
        )),
        e.onEstimatedMaxGameEndWaitTimeSuddenChange((()=>{
            this.prepareMatchMaking(!0, !0)
        }
        )),
        e.onGameSeedChange((t=>{
            getMainInstance().mapLoader.mapVariablesManager.setSeed(t)
        }
        )),
        this.fireCurrentGameChangeCbs()
    }
    onGameEnd(t) {
        this.onGameEndCbs.add(t)
    }
    setJoinedOnce() {
        this.joinedOnce = !0,
        this.setIsInGamesLoop(!0)
    }
    getOnlineGame() {
        return this.loadingBackgroundGame ? this.loadingBackgroundGame : this.activeGame instanceof Game ? this.activeGame : null
    }
    connectionClosed() {
        this.activeGame && this.activeGame instanceof Game && (this.activeGame.gameEnded || (this.loadOfflineRoamingGame(),
        this.updateSdkGameplayStarted(),
        this.fireCurrentGameChangeCbs(),
        getMainInstance().mainMenu.setJoinState("joinable"),
        this.setIsInGamesLoop(!1))),
        this.setReadyToJoin(!0)
    }
    destroyCurrentGame() {
        const t = this.activeGame;
        this.activeGame = null,
        t && t.destructor(),
        this.fireCurrentGameChangeCbs()
    }
    joinIfNotJoined(t=!1) {
        const e = getMainInstance()
          , i = e.gameManager.activeGame;
        let s = !1
          , n = !1;
        if (i instanceof Game && !i.usedForCameraShotsOnly && (n = !0),
        !n) {
            const i = e.network.squadManager;
            if (i.isInSquad || i.isJoiningSquad) {
                if (i.isInSquad && 1 == i.totalSquadMemberCount && !i.matchMakeAllReady) {
                    e.gameManager.joinGameWithoutAd();
                    let t = !1;
                    setTimeout((()=>{
                        t = !0
                    }
                    ), 5e3),
                    (async()=>{
                        await i.waitForServerReadyForStart(),
                        t || i.startSquad()
                    }
                    )()
                } else if (t && (this.readyToJoin || i.startButtonEnabled)) {
                    e.gameManager.activeGame instanceof OfflineRoamingGame && (e.mainMenu.openSquadDialog(),
                    s = !0)
                }
            } else
                e.gameManager.joinGameAfterAd()
        }
        return {
            didShowSquadDialog: s
        }
    }
    async checkExistingGameAndJoin() {
        const t = getMainInstance();
        if (t.renderer.webglCreationFailed)
            return !1;
        if (t.network.squadManager.isJoiningSquad)
            return !1;
        if (this.activeGame && this.activeGame instanceof Game) {
            const e = t.dialogManager.showAlert({
                title: "You are currently in a game",
                text: "Do you want to leave the current match?",
                buttons: [{
                    text: "Yes"
                }, {
                    text: "No"
                }]
            });
            if (0 != await e.waitForButton())
                return !1;
            getMainInstance().network.closeCurrentConnection()
        }
        return await this.joinGameAfterAd(),
        !0
    }
    joinGameWithoutAd() {
        this.readyToJoin && (this.setReadyToJoin(!1),
        getMainInstance().network.prepareJoinGame())
    }
    async joinGameAfterAd() {
        this.readyToJoin && (this.setReadyToJoin(!1),
        await getMainInstance().poki.commercialBreak(),
        await getMainInstance().network.prepareJoinGame())
    }
    estimateMaxWaitTimeSeconds() {
        let t = 0;
        const e = this.getOnlineGame();
        return e ? t += e.estimateMaxGameEndWaitTimeSeconds() : t = 10,
        1e3 * t
    }
    getMyTeamColor() {
        return this.activeGame instanceof Game ? this.activeGame.getMyTeamColor() : {
            colors: teamColors[0],
            myTeamId: 0
        }
    }
    updateSdkGameplayStarted() {
        if (!this.activeGame)
            return;
        const t = getMainInstance();
        !t.mainMenu.visible && this.activeGame.sdkGameplayStarted ? (t.poki.gameplayStart(),
        setTimeout((()=>{
            t.mapLoader.loadClouds()
        }
        ), 50)) : t.poki.gameplayStop()
    }
    onReadyToJoinChange(t) {
        this.onReadyToJoinChangeCbs.add(t)
    }
    removeOnReadyToJoinChange(t) {
        this.onReadyToJoinChangeCbs.delete(t)
    }
    setReadyToJoin(t) {
        this.readyToJoin = t,
        this.onReadyToJoinChangeCbs.forEach((e=>e(t)))
    }
}
const DB_KEY = "lastGameStats";
class GameStatsTracker {
    constructor(t) {
        this.indexedDb = t,
        this.isLoadingStats = !0,
        this.stats = {
            gameStarted: !1,
            myTeamElo: 0,
            opponentTeamElo: 0
        }
    }
    async loadStats() {
        const t = {
            gameStarted: !1,
            myTeamElo: 0,
            opponentTeamElo: 0,
            ...await this.indexedDb.get(DB_KEY)
        };
        this.isLoadingStats = !1,
        t.gameStarted && await this.deductLeavingPlayerElo(t.myTeamElo, t.opponentTeamElo)
    }
    async deductLeavingPlayerElo(t, e) {
        const i = computeDeltaElo(t, e, 0) / 4;
        await getMainInstance().network.matchMaking.waitForValuesLoad(),
        getMainInstance().network.matchMaking.updateElo(i),
        this.isLoadingStats = !1,
        this.saveStats()
    }
    gameStarted() {
        this.stats.gameStarted = !0,
        this.saveStats()
    }
    gameEnded() {
        this.stats.gameStarted = !1,
        this.saveStats()
    }
    updateAvgTeamElo(t, e) {
        this.stats.myTeamElo = t,
        this.stats.opponentTeamElo = e,
        this.saveStats()
    }
    saveStats() {
        this.isLoadingStats || this.indexedDb.set(DB_KEY, this.stats)
    }
}
class CameraManager {
    constructor() {
        this.baseFov = 90,
        this.cam = new PerspectiveCamera(65,1,.08,900),
        this.cam.name = "cam",
        this.cam.updateMatrixWorld(),
        this.isDoingLobbyShots = !1,
        this.prevHasPlayer = !1,
        this.lobbyCamPositions = null,
        this.hasDoneFirstLobbyShot = !1,
        this.currentLobbyShot = null,
        this.currentLobbyShotT = 0,
        this.currentLobbyShotDuration = 5e3,
        this.thirdPersonMode = "none",
        this.onThirdPersonChangeCbs = new Set,
        this.thirdPersonPhysicsNeedsReset = !1,
        this.thirdPersonPhysics = new PhysicsValue3d({
            dampening: .1,
            springMultiplier: .08
        }),
        this.thirdPersonOffsetPhysics = new PhysicsValue3d({
            dampening: .1,
            springMultiplier: .08
        }),
        addResizeListener((()=>{
            this.onResize()
        }
        )),
        this.onResize()
    }
    init() {
        const t = getMainInstance();
        t.scene.add(this.cam),
        t.settingsManager.onValueChange("fov", (t=>{
            this.baseFov = t,
            getMainInstance().renderer.renderWorthyEventHappened()
        }
        ));
        t.input.getKey("toggleThirdPerson").onPressedDown((()=>{
            let t = "none";
            t = "none" == this.thirdPersonMode ? "back" : "back" == this.thirdPersonMode ? "front" : "none",
            this.setThirdPersonMode(t)
        }
        ))
    }
    onResize() {
        this.cam.aspect = window.innerWidth / window.innerHeight,
        this.cam.updateProjectionMatrix()
    }
    loop(t, e) {
        let i = null;
        const s = getMainInstance();
        s.gameManager.activeGame && (i = s.gameManager.activeGame.getMyPlayer());
        let n = !1;
        const a = !!i;
        if (a != this.prevHasPlayer && (this.prevHasPlayer = a,
        a || (this.cam.fov = 65,
        this.cam.updateProjectionMatrix())),
        a && i) {
            const n = i.getCamPos();
            let a;
            if (a = "front" == this.thirdPersonMode ? i.getFrontThirdPersonCamRot() : i.getCamRot(),
            this.cam.quaternion.copy(a),
            this.thirdPerson) {
                if (this.thirdPersonPhysicsNeedsReset)
                    this.thirdPersonPhysics.value = n,
                    this.thirdPersonOffsetPhysics.value = new Vector3(0,0,0),
                    this.thirdPersonPhysicsNeedsReset = !1;
                else {
                    const o = n.clone();
                    if ("dead" == this.thirdPersonMode) {
                        const t = s.mapLoader.mapVariablesManager.get("floorDeathHeight");
                        o.y = Math.max(o.y, t + 1)
                    }
                    this.thirdPersonPhysics.target = o,
                    this.thirdPersonPhysics.loop(t, e);
                    let r = 0;
                    "back" == this.thirdPersonMode && (r = mapValue(.5, 2.5, -.8, -.1, i.smoothMovementSpeed, !0));
                    let l = 1;
                    "front" == this.thirdPersonMode && (l = 2);
                    const h = new Vector3(r,0,l)
                      , d = h.clone().multiplyScalar(2);
                    d.applyQuaternion(a);
                    const c = this.thirdPersonPhysics.value
                      , u = this.thirdPersonPhysics.value.add(d)
                      , p = getMainInstance().gameManager.activeGame;
                    if (p) {
                        const t = p.physics.getRayCastCache(c, u);
                        if (t) {
                            const e = p.physics.rayCastMapColliders(t, (t=>!t.collider.ignoreArrows && (!(t.collider.excludeTeamId >= 0) && !t.collider.isTriggerCollider())));
                            if (e) {
                                const t = e.dist - .3;
                                t < h.length() && h.setLength(t)
                            }
                        }
                    }
                    this.thirdPersonOffsetPhysics.target = h,
                    this.thirdPersonOffsetPhysics.loop(t, e)
                }
                const o = this.thirdPersonOffsetPhysics.value;
                o.applyQuaternion(a),
                this.cam.position.copy(this.thirdPersonPhysics.value),
                this.cam.position.add(o)
            } else
                this.cam.position.copy(n);
            let o = this.baseFov;
            i.activeWeapon && (o = i.activeWeapon.adjustFov(o)),
            this.cam.fov = lerp(this.cam.fov, o, .1),
            this.cam.updateProjectionMatrix(),
            this.cam.updateMatrixWorld()
        } else if (this.lobbyCamPositions && (n = !0,
        s.renderer.needsRenderFrame)) {
            if (this.currentLobbyShotT += e / this.currentLobbyShotDuration,
            this.currentLobbyShotT > 1 || !this.currentLobbyShot) {
                if (this.currentLobbyShotT = 0,
                this.hasDoneFirstLobbyShot) {
                    const t = this.lobbyCamPositions.filter((t=>t != this.currentLobbyShot));
                    this.currentLobbyShot = randFromArray(t) || null
                } else
                    this.hasDoneFirstLobbyShot = !0,
                    this.currentLobbyShot = this.lobbyCamPositions[0];
                this.computeLobbyShotDuration()
            }
            if (this.currentLobbyShot) {
                const t = this.currentLobbyShot
                  , e = this.currentLobbyShotT;
                this.cam.position.lerpVectors(t.posA, t.posB, e),
                this.cam.quaternion.slerpQuaternions(t.rotA, t.rotB, e),
                this.cam.updateMatrixWorld()
            }
        }
        n != this.isDoingLobbyShots && (this.isDoingLobbyShots = n,
        getMainInstance().renderer.updateMainCanvasRenderEnabled())
    }
    computeLobbyShotDuration() {
        if (!this.currentLobbyShot)
            return 1e4;
        const t = this.currentLobbyShot.posA.distanceTo(this.currentLobbyShot.posB);
        this.currentLobbyShotDuration = 5e3 * t
    }
    playerRespawned() {
        this.cam.fov = this.baseFov + 20,
        this.thirdPersonPhysicsNeedsReset = !0
    }
    get fov() {
        return this.cam.fov
    }
    get fovOffset() {
        return this.baseFov - this.fov
    }
    get rot() {
        return this.cam.quaternion
    }
    get pos() {
        return this.cam.position
    }
    get thirdPerson() {
        return "none" != this.thirdPersonMode
    }
    setLobbyCamPositions(t) {
        this.lobbyCamPositions = t,
        this.currentLobbyShot = null
    }
    getRayCastCache(t, e) {
        const i = this.pos
          , s = new Vector3(0,0,-e);
        s.applyQuaternion(this.rot);
        const n = i.clone().add(s)
          , a = getMainInstance().gameManager.activeGame;
        return a ? a.physics.getRayCastCache(i, n) : null
    }
    setThirdPersonMode(t) {
        t != this.thirdPersonMode && (this.thirdPersonMode = t,
        this.thirdPersonPhysicsNeedsReset = !0,
        this.onThirdPersonChangeCbs.forEach((t=>t())))
    }
    onThirdPersonChange(t) {
        this.onThirdPersonChangeCbs.add(t)
    }
    removeOnThirdPersonChange(t) {
        this.onThirdPersonChangeCbs.delete(t)
    }
}
class HudIcon {
    constructor(t, {size: e=.05, url: i, nearest: s=!0}) {
        this.manager = t,
        this.size = e,
        this.nearest = s,
        this.visible = !0,
        this.texture = null,
        this.mat = t.mat.clone(),
        this.obj = new Mesh(t.geo,this.mat),
        this.obj.renderOrder = 1,
        this.obj.frustumCulled = !1,
        getMainInstance().scene.add(this.obj),
        this.updateIconSize(window.innerHeight, window.innerWidth),
        this.setUrl(i)
    }
    destructor() {
        this.disposeTexture(),
        this.mat.dispose(),
        getMainInstance().scene.remove(this.obj)
    }
    updateIconSize(t, e) {
        this.mat.uniforms.iconSize.value.set(t / e * this.size, this.size)
    }
    setPos(t) {
        this.obj.position.copy(t),
        this.obj.updateWorldMatrix(!1, !0)
    }
    setVisibility(t) {
        this.visible = t,
        this.updateVisibility()
    }
    updateVisibility() {
        this.obj.visible = this.visible && this.manager.globalVisibility
    }
    disposeTexture() {
        this.texture && (this.texture.dispose(),
        this.texture = null,
        this.mat && (this.mat.uniforms.map.value = null))
    }
    setUrl(t) {
        this.disposeTexture();
        const e = new Image;
        e.src = t,
        e.width = 512,
        e.height = 512,
        this.texture = new Texture(e),
        this.nearest && (this.texture.minFilter = NearestFilter,
        this.texture.magFilter = NearestFilter),
        this.mat.uniforms.map.value = this.texture,
        e.onload = t=>{
            this.texture && e == this.texture.image && (this.texture.needsUpdate = !0)
        }
    }
}
class HudIconsManager {
    constructor() {
        this.globalVisibility = !0,
        this.geo = new PlaneGeometry,
        this.mat = new ShaderMaterial({
            name: "hudIcon",
            vertexShader: "\n\t\t\t\tuniform vec2 iconSize;\n\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tvoid main(){\n\t\t\t\t\tvec4 objPos = modelMatrix[3];\n\t\t\t\t\tgl_Position = (projectionMatrix * viewMatrix) * vec4(objPos.xyz, 1.0);\n\t\t\t\t\tgl_Position /= gl_Position.w;\n\t\t\t\t\tgl_Position.xy += position.xy * iconSize * 2.0;\n\n\t\t\t\t\tvUv = uv;\n\t\t\t\t}\n\t\t\t",
            fragmentShader: "\n\t\t\t\tuniform sampler2D map;\n\t\t\t\tvarying vec2 vUv;\n\n\t\t\t\tvoid main(){\n\t\t\t\t\tgl_FragColor = texture2D(map, vUv);\n\t\t\t\t}\n\t\t\t",
            side: DoubleSide,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0,
            uniforms: {
                map: {
                    value: null
                },
                iconSize: {
                    value: new Vector2(1,1)
                }
            }
        }),
        this.createdIcons = new Set,
        addResizeListener((()=>{
            this.onResize()
        }
        )),
        this.onResize()
    }
    onResize() {
        for (const t of this.createdIcons)
            t.updateIconSize(window.innerHeight, window.innerWidth)
    }
    createIcon(t) {
        const e = new HudIcon(this,t);
        return this.createdIcons.add(e),
        e
    }
    removeIcon(t) {
        this.createdIcons.delete(t),
        t.destructor()
    }
    setGlobalVisibility(t) {
        this.globalVisibility = t;
        for (const t of this.createdIcons)
            t.updateVisibility()
    }
}
class ScreenFlash {
    constructor(t, e, i, s, n, a, o) {
        this.scene = t,
        this.material = e.clone(),
        this.material.uniforms.vignetteAmount.value = i,
        this.material.uniforms.theta.value = s,
        this.material.uniforms.color.value = n,
        this.material.uniforms.hasDirection.value = o ? 1 : 0,
        this.autoFade = a;
        const r = new PlaneGeometry(2,2);
        this.obj = new Mesh(r,this.material),
        this.obj.frustumCulled = !1,
        t.add(this.obj),
        this.creationTime = getMainInstance().now,
        this.shouldBeDestroyed = !1
    }
    destructor() {
        this.scene.remove(this.obj),
        this.material.dispose()
    }
    loop(t) {
        if (!this.autoFade)
            return;
        const e = (t - this.creationTime) / 1e3;
        this.opacity = Math.max(0, .1 / (e + .1)),
        e > 10 && (this.shouldBeDestroyed = !0)
    }
    set opacity(t) {
        this.material.uniforms.opacity.value = t
    }
    set baseOpacity(t) {
        this.material.uniforms.baseOpacity.value = t
    }
}
class ScreenFlashManager {
    constructor(t, e) {
        this.scene = t,
        this.camera = e,
        this.material = null,
        this.createdFlashes = new Set
    }
    setMaterial(t) {
        this.material = t
    }
    flash({arrowHitNormalWorld: t, vignetteAmount: e=1, color: i=new Vector3(1,.05,.05), autoFade: s=!0, hasDirection: n=!0}={}) {
        if (!this.material)
            return;
        const a = this.getThetaFromArrowHitNormal(t)
          , o = new ScreenFlash(this.scene,this.material,e,a,i,s,n);
        return this.createdFlashes.add(o),
        o
    }
    getThetaFromArrowHitNormal(t) {
        if (!t)
            return 0;
        const e = new Vector3(0,0,-1);
        if (e.applyQuaternion(this.camera.quaternion),
        e.y = 0,
        e.length() <= 1e-4)
            return 0;
        const i = t.clone();
        if (i.y = 0,
        i.normalize(),
        i.length() <= 1e-4)
            return 0;
        const s = new Vector3;
        s.crossVectors(e, i);
        const n = e.dot(i);
        let a = Math.acos(n);
        return s.y > 0 && (a *= -1),
        mod(a, 2 * Math.PI) - Math.PI
    }
    loop(t) {
        const e = new Set;
        for (const i of this.createdFlashes)
            i.loop(t),
            i.shouldBeDestroyed && e.add(i);
        for (const t of e)
            t.destructor(),
            this.createdFlashes.delete(t)
    }
}
class RenderView {
    constructor({width: t=100, height: e=100}={}) {
        this.dirty = !1,
        this.alwaysDirty = !1,
        this.canvas = document.createElement("canvas"),
        this.ctx = this.canvas.getContext("2d"),
        this.width = t,
        this.height = e,
        this.onNextFrameRenderCbs = new Set,
        this.scene = null,
        this.cam = null,
        this.setSize(t, e)
    }
    setSize(t, e) {
        this.canvas.width = t,
        this.canvas.height = e,
        this.width = t,
        this.height = e
    }
    setRenderObjects(t, e, i=!0) {
        this.scene = t,
        this.cam = e,
        i && this.markDirty()
    }
    markDirty() {
        this.dirty = !0
    }
    get needsRender() {
        return this.dirty || this.alwaysDirty
    }
    render(t, e, i) {
        this.needsRender && (this.dirty = !1,
        this.scene && this.cam && this.ctx && (t.setClearAlpha(0),
        t.setViewport(0, i - this.canvas.height, this.canvas.width, this.canvas.height),
        t.render(this.scene, this.cam),
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
        this.ctx.drawImage(t.domElement, 0, 0),
        this.onNextFrameRenderCbs.forEach((t=>t())),
        this.onNextFrameRenderCbs.clear()))
    }
    async waitForFrameRender() {
        const t = new Promise((t=>this.onNextFrameRenderCbs.add(t)));
        await t
    }
    async getBlob() {
        const t = new Promise((t=>{
            this.canvas.toBlob(t)
        }
        ));
        return await t
    }
}
class RenderOverlay {
    constructor({minFov: t=0, maxFov: e=180, near: i=.01, far: s=100}={}) {
        this.scene = new Scene,
        this.cam = new PerspectiveCamera,
        this.cam.matrixAutoUpdate = !1,
        this.minFov = t,
        this.maxFov = e,
        this.near = i,
        this.far = s,
        this.enabled = !0
    }
    updateProjectionMatrix() {
        this.cam.near = this.near,
        this.cam.far = this.far;
        const t = getMainInstance().cam;
        this.cam.fov = smoothClamp(t.fov, this.minFov, this.maxFov),
        this.cam.aspect = t.cam.aspect,
        this.cam.updateProjectionMatrix()
    }
}
class Renderer {
    constructor() {
        this.renderer = null,
        this.canvas = null,
        this.freezeFrameCanvas = null,
        this.freezeFrameCtx = null,
        this.freezeFrameDirty = !1,
        this.webglCreationFailed = !1,
        this.afterFrameRenderCbs = [],
        this.onBeforeRenderCbs = new Set,
        this.renderViews = new Set,
        this.renderOverlays = new Set,
        this.mainCanvasRenderEnabled = !0,
        this.renderWorthyEventEndTime = 0,
        this.queriedScreenshotCallbacks = [],
        this.renderWidth = 0,
        this.renderHeight = 0,
        this.rawResolutionMultiplier = 1,
        this.lastFpsStatUpdateTime = 0,
        this.framesPassedSinceLastStatUpdate = 0
    }
    init() {
        const t = getMainInstance();
        t.dialogManager.onAnyDialogVisibilityChange((()=>{
            this.updateMainCanvasRenderEnabled(),
            this.freezeFrameDirty = !0
        }
        )),
        t.settingsManager.onValueChange("quality", (t=>{
            this.rawResolutionMultiplier = t,
            this.onResize()
        }
        )),
        t.settingsManager.onValueChange("antialias", (()=>{
            this.reloadRenderer()
        }
        )),
        t.settingsManager.onValueChange("smoothFiltering", (()=>{
            this.updateSmoothFiltering()
        }
        )),
        addResizeListener((()=>{
            this.onResize()
        }
        )),
        this.reloadRenderer()
    }
    reloadRenderer() {
        this.canvas && (this.canvas.remove(),
        this.canvas = null),
        this.renderer = null;
        const t = getMainInstance().settingsManager.getValue("antialias");
        try {
            this.renderer = new WebGLRenderer({
                antialias: t,
                powerPreference: "high-performance",
                alpha: !0
            })
        } catch (e) {
            try {
                this.renderer = new WebGLRenderer({
                    antialias: t,
                    alpha: !0
                })
            } catch (t) {
                try {
                    this.renderer = new WebGLRenderer({
                        antialias: !1,
                        alpha: !0
                    })
                } catch (t) {
                    try {
                        this.renderer = new WebGLRenderer
                    } catch (t) {
                        console.error("Failed to create WebGLRenderer:", t),
                        this.webglCreationFailed = !0,
                        getMainInstance().mainInfoTextManager.updateText()
                    }
                }
            }
        }
        this.renderer && (this.renderer.outputEncoding = sRGBEncoding,
        this.renderer.autoClear = !1,
        this.canvas = this.renderer.domElement,
        this.canvas.classList.add("fullScreen", "mainCanvas"),
        this.canvas.inert = !0,
        document.body.appendChild(this.canvas)),
        this.updateSmoothFiltering(),
        this.onResize()
    }
    updateSmoothFiltering() {
        if (this.canvas) {
            const t = getMainInstance().settingsManager.getValue("smoothFiltering");
            this.canvas.style.imageRendering = t ? "" : "pixelated"
        }
    }
    get resolutionMultiplier() {
        return Math.min(this.rawResolutionMultiplier, window.devicePixelRatio)
    }
    onResize() {
        const t = this.resolutionMultiplier;
        this.setSize(window.innerWidth * t, window.innerHeight * t),
        this.freezeFrameDirty = !0,
        this.freezeFrameCanvas && this.canvas && (this.freezeFrameCanvas.width = this.canvas.width,
        this.freezeFrameCanvas.height = this.canvas.height)
    }
    setSize(t, e) {
        this.renderWidth = t,
        this.renderHeight = e,
        this.renderer && t > 0 && e > 0 && this.renderer.setSize(t, e, !1)
    }
    createRenderView(...t) {
        const e = new RenderView(...t);
        return this.renderViews.add(e),
        e
    }
    removeRenderView(t) {
        this.renderViews.delete(t)
    }
    createRenderOverlay(...t) {
        const e = new RenderOverlay(...t);
        return this.renderOverlays.add(e),
        e
    }
    removeRenderOverlay(t) {
        this.renderOverlays.delete(t)
    }
    queryScreenshot() {
        return new Promise((t=>{
            this.queriedScreenshotCallbacks.push(t)
        }
        ))
    }
    loop(t, e) {
        this.mainCanvasRenderEnabled && this.updateMainCanvasRenderEnabled(),
        this.renderCameras();
        const i = performance.now();
        this.framesPassedSinceLastStatUpdate++;
        const s = i - this.lastFpsStatUpdateTime
          , n = Math.round(this.framesPassedSinceLastStatUpdate / s * 1e3);
        if (s > 500) {
            this.lastFpsStatUpdateTime = i,
            this.framesPassedSinceLastStatUpdate = 0;
            const t = getMainInstance().gameManager.getOnlineGame();
            t && t.cornerStatsUi.fpsStat.setValue(n)
        }
    }
    renderWorthyEventHappened(t=1e3) {
        this.renderWorthyEventEndTime = Math.max(this.renderWorthyEventEndTime, performance.now() + t),
        this.mainCanvasRenderEnabled || this.updateMainCanvasRenderEnabled()
    }
    updateMainCanvasRenderEnabled() {
        let t = !1;
        const e = getMainInstance();
        if (e.cam.isDoingLobbyShots) {
            let i = !0;
            t = !e.dialogManager.hasAnyDialogs && i
        } else
            e.gameManager.activeGame && (t = this.renderWorthyEventEndTime > performance.now(),
            t = !0);
        this.setMainCanvasRenderEnabled(t)
    }
    setMainCanvasRenderEnabled(t) {
        t != this.mainCanvasRenderEnabled && (this.mainCanvasRenderEnabled = t,
        t ? (this.freezeFrameCanvas && document.body.removeChild(this.freezeFrameCanvas),
        this.freezeFrameCanvas = null,
        this.freezeFrameCtx = null) : (this.freezeFrameCanvas = document.createElement("canvas"),
        this.freezeFrameCanvas.classList.add("fullScreen", "mainCanvas"),
        this.freezeFrameCanvas.inert = !0,
        this.canvas && (this.freezeFrameCanvas.width = this.canvas.width,
        this.freezeFrameCanvas.height = this.canvas.height),
        this.freezeFrameCtx = this.freezeFrameCanvas.getContext("2d"),
        document.body.appendChild(this.freezeFrameCanvas),
        this.freezeFrameDirty = !0),
        this.canvas && (this.canvas.style.display = t ? "" : "none"))
    }
    get needsRenderFrame() {
        return this.mainCanvasRenderEnabled || this.freezeFrameDirty
    }
    renderCameras() {
        if (this.renderer) {
            let t = 0
              , e = 0;
            for (const i of this.renderViews)
                i.needsRender && (t = Math.max(t, i.width),
                e = Math.max(e, i.height));
            t = Math.max(t, this.renderWidth),
            e = Math.max(e, this.renderHeight);
            let i = !1;
            const s = this.renderWidth
              , n = this.renderHeight;
            t == this.renderWidth && e == this.renderHeight || (this.setSize(t, e),
            i = !0);
            for (const t of this.renderViews)
                this.renderer.clear(),
                t.render(this.renderer, this.renderWidth, this.renderHeight);
            if (i && this.setSize(s, n),
            this.needsRenderFrame && this.renderWidth > 0 && this.renderHeight > 0) {
                this.renderer.clear(),
                this.renderer.setViewport(0, 0, window.innerWidth * this.resolutionMultiplier, window.innerHeight * this.resolutionMultiplier),
                this.renderer.render(getMainInstance().scene, getMainInstance().cam.cam);
                const t = Array.from(this.renderOverlays).filter((t=>t.enabled));
                if (t.length > 0) {
                    this.renderer.clearDepth();
                    for (const e of t)
                        e.updateProjectionMatrix(),
                        this.renderer.render(e.scene, e.cam)
                }
            }
            this.queriedScreenshotCallbacks.length > 0 && (async()=>{
                const t = new Promise((t=>{
                    if (!this.renderer)
                        return null;
                    this.renderer.domElement.toBlob(t)
                }
                ))
                  , e = await t;
                for (const t of this.queriedScreenshotCallbacks)
                    t(e);
                this.queriedScreenshotCallbacks = []
            }
            )()
        }
        this.freezeFrameDirty && this.freezeFrameCtx && this.freezeFrameCanvas && this.canvas && (this.freezeFrameDirty = !1,
        this.freezeFrameCtx.clearRect(0, 0, this.freezeFrameCanvas.width, this.freezeFrameCanvas.height),
        this.freezeFrameCtx.drawImage(this.canvas, 0, 0));
        for (let t = this.afterFrameRenderCbs.length - 1; t >= 0; t--) {
            const e = this.afterFrameRenderCbs[t];
            e.waitCount--,
            e.waitCount <= 0 && (e.cb(),
            this.afterFrameRenderCbs.splice(t, 1))
        }
    }
    async waitForFrameRender(t=1) {
        return await new Promise((e=>{
            this.afterFrameRenderCbs.push({
                cb: e,
                waitCount: t
            })
        }
        ))
    }
}
class SkeletonLoader {
    constructor() {
        this.cachedPoses = new Map,
        this.loadingPoseCbs = new Map
    }
    async getSkeleton(t, {clone: e=!1, signal: i=null}={}) {
        let s = this.cachedPoses.get(t);
        if (!s) {
            let e = this.loadingPoseCbs.get(t);
            if (e) {
                const t = e
                  , i = new Promise((e=>t.add(e)));
                s = await i
            } else {
                e = new Set,
                this.loadingPoseCbs.set(t, e);
                const n = await getMainInstance().assets.loadGlbViaWorker(`playerSkeletonPoses/${t}.glb`, {
                    merge: !1,
                    signal: i
                });
                if (!n)
                    throw new Error(`Failed to load skeleton pose ${t}`);
                s = n,
                this.cachedPoses.set(t, s);
                for (const t of e)
                    t(s);
                this.loadingPoseCbs.delete(t)
            }
        }
        return e ? s.clone() : s
    }
}
class CachedSfx {
    constructor(t, e) {
        this.opts = t,
        this.ctx = e,
        this.loaded = !1,
        this.loading = !1,
        this.buffer = null,
        this.onLoadCbs = []
    }
    async init() {
        if (this.loaded)
            return;
        if (this.loading) {
            const t = new Promise((t=>{
                this.onLoadCbs.push(t)
            }
            ));
            return await t
        }
        this.loading = !0;
        const t = getMainInstance().assets.getPackage("sfx" + SfxManager.audioFormatCamelCase)
          , e = await t.getFileAsBuffer(this.opts.name + "." + SfxManager.audioFormat);
        this.buffer = await new Promise((t=>{
            this.ctx.decodeAudioData(e, t)
        }
        )),
        this.loaded = !0;
        for (const t of this.onLoadCbs)
            t();
        this.onLoadCbs = []
    }
    async waitForLoad() {
        if (this.loaded)
            return;
        const t = new Promise((t=>this.onLoadCbs.push(t)));
        return await t
    }
    async getBuffer() {
        return await this.waitForLoad(),
        this.buffer
    }
}
class SfxSound {
    constructor(t, e={}) {
        this.cachedSfx = t,
        this.opts = {
            autoPlay: !0,
            volume: 1,
            minPitch: 1,
            maxPitch: 1,
            volumeFront: 1,
            volumeBack: 0,
            isMusic: !1,
            loop: !1,
            allowWithoutUserEvent: !1,
            overrideMute: !1,
            pos: null,
            connectToDestination: !0,
            ...t.opts,
            ...e
        },
        this.destructed = !1,
        this.sourceNode = null,
        this.gainNode = null,
        this.frontGainNode = null,
        this.frontSplitterNode = null,
        this.backGainNode = null,
        this.backSplitterNode = null,
        this.channelMergerNode = null,
        this.finalNode = null,
        this.pannerNode = null,
        this.preventDestructOnNextStop = !1,
        this.lastSetVolume = 0,
        this.isLoopPlaying = null,
        this.muted = !1,
        this.forceMuted = !1,
        this.startTime = 0;
        const i = this.opts.minPitch || 0
          , s = this.opts.maxPitch || 0;
        this.pitch = randRange(i, s)
    }
    destructor() {
        this.destructed = !0,
        getMainInstance().sfx.sfxDestructed(this)
    }
    async init() {
        if (getMainInstance().sfx.muted && !this.opts.loop && !this.opts.overrideMute)
            return this.destructor(),
            !1;
        if (this.opts.pos) {
            if (getMainInstance().cam.pos.distanceTo(this.opts.pos) > getMainInstance().settingsManager.getValue("sfxDistanceCutoff"))
                return void this.destructor()
        }
        return this.setVolume(this.opts.volume || 0, !0),
        this.opts.autoPlay && await this.start(!0),
        this.setMuted(getMainInstance().sfx.muted),
        !0
    }
    setVolume(t, e=!1) {
        const i = getMainInstance().sfx.ctx;
        if (!i)
            return;
        this.lastSetVolume = t;
        t *= getMainInstance().settingsManager.getValue(this.opts.isMusic ? "musicVolume" : "sfxVolume") / 100,
        this.gainNode && (e ? this.gainNode.gain.value = t : this.gainNode.gain.linearRampToValueAtTime(t, i.currentTime + .1))
    }
    volumeSettingChanged(t) {
        this.setVolume(this.lastSetVolume)
    }
    setMuted(t, e=!1) {
        if (this.muted = t,
        this.forceMuted = e,
        this.opts.overrideMute && !e && (t = !1),
        this.opts.loop)
            if (t) {
                const t = this.isLoopPlaying;
                this.pause(!0),
                this.isLoopPlaying = t
            } else
                this.isLoopPlaying && this.resume(!0);
        else
            t && this.stop()
    }
    async start(t=!1) {
        if (!this.sourceNode) {
            const e = getMainInstance().sfx.ctx;
            if (!e)
                return;
            this.sourceNode = e.createBufferSource(),
            this.sourceNode.buffer = await this.cachedSfx.getBuffer(),
            this.sourceNode.loop = this.opts.loop || !1,
            this.sourceNode.playbackRate.value = this.pitch,
            this.finalNode = this.sourceNode,
            this.gainNode = e.createGain(),
            this.finalNode.connect(this.gainNode),
            this.finalNode = this.gainNode,
            this.opts.pos && (this.pannerNode = e.createPanner(),
            this.pannerNode.panningModel = "HRTF",
            this.pannerNode.distanceModel = "inverse",
            this.pannerNode.refDistance = 1,
            this.pannerNode.maxDistance = 1e3,
            this.pannerNode.rolloffFactor = 1,
            this.pannerNode.positionX ? (this.pannerNode.positionX.value = this.opts.pos.x,
            this.pannerNode.positionY.value = this.opts.pos.y,
            this.pannerNode.positionZ.value = this.opts.pos.z) : this.pannerNode.setPosition(this.opts.pos.x, this.opts.pos.y, this.opts.pos.z),
            this.finalNode.connect(this.pannerNode),
            this.finalNode = this.pannerNode),
            e.destination.maxChannelCount >= 6 && (this.frontGainNode = e.createGain(),
            this.frontGainNode.gain.value = this.opts.volumeFront,
            this.finalNode.connect(this.frontGainNode),
            this.frontSplitterNode = e.createChannelSplitter(2),
            this.frontGainNode.connect(this.frontSplitterNode),
            this.backGainNode = e.createGain(),
            this.backGainNode.gain.value = this.opts.volumeBack,
            this.finalNode.connect(this.backGainNode),
            this.backSplitterNode = e.createChannelSplitter(2),
            this.backGainNode.connect(this.backSplitterNode),
            this.channelMergerNode = e.createChannelMerger(6),
            this.frontSplitterNode.connect(this.channelMergerNode, 0, 0),
            this.frontSplitterNode.connect(this.channelMergerNode, 1, 1),
            this.backSplitterNode.connect(this.channelMergerNode, 0, 4),
            this.backSplitterNode.connect(this.channelMergerNode, 1, 5),
            this.finalNode = this.channelMergerNode),
            this.opts.connectToDestination && this.finalNode.connect(e.destination);
            const i = ()=>{
                this.sourceNode && this.sourceNode.removeEventListener("ended", i),
                this.preventDestructOnNextStop || this.destructor(),
                this.preventDestructOnNextStop = !1
            }
            ;
            this.sourceNode.addEventListener("ended", i),
            this.setVolume(this.lastSetVolume, t),
            this.sourceNode.start(),
            this.startTime = e.currentTime,
            !1 === this.isLoopPlaying && this.pause(!0)
        }
        this.opts.loop && (this.isLoopPlaying = !0)
    }
    stop(t=!0) {
        if (this.destructed)
            return;
        const e = getMainInstance().sfx.ctx;
        e && (this.preventDestructOnNextStop = !t,
        this.sourceNode && (this.sourceNode.stop(),
        this.sourceNode = null,
        this.opts.connectToDestination && this.finalNode && this.finalNode.disconnect(e.destination),
        this.finalNode = null),
        this.opts.loop && (this.isLoopPlaying = !1))
    }
    pause(t=!1) {
        this.isLoopPlaying = !1,
        this.sourceNode && (this.sourceNode.playbackRate.value = 1e-4)
    }
    resume(t=!1) {
        this.isLoopPlaying = !0,
        (!this.muted || !this.opts.loop || this.opts.overrideMute && !this.forceMuted || t) && this.sourceNode && (this.sourceNode.playbackRate.value = this.pitch)
    }
    getEstimatedTime() {
        const t = getMainInstance().sfx.ctx;
        if (!t)
            return 0;
        if (!this.sourceNode)
            return 0;
        if (!this.sourceNode.buffer)
            return 0;
        const e = t.currentTime - this.startTime;
        return mod(e, this.sourceNode.buffer.duration)
    }
}
class SfxManager {
    constructor() {
        if (window.AudioContext = window.AudioContext || window.webkitAudioContext,
        this.supported = !!AudioContext,
        this.packageName = "sfx" + SfxManager.audioFormatCamelCase,
        this.cachedSfx = {},
        this.createdSfx = [],
        this.settingsMuted = !0,
        this.adsMuted = !1,
        this.muted = !0,
        this.supported) {
            this.ctx = new AudioContext,
            this.ctx.destination.maxChannelCount >= 6 && (this.ctx.destination.channelCount = 6),
            this.ctx.onstatechange = ()=>{
                this.onCtxStatechange()
            }
            ,
            this.boundUserEvent = this.userEvent.bind(this),
            this.addedUserEventListeners = !1,
            this.onCtxStatechange(),
            this.soundsConfig = [{
                name: "weapon/bow/pull",
                volume: .04
            }, {
                name: "weapon/bow/pullHeavy",
                volume: .02
            }, {
                name: "weapon/bow/shoot",
                volume: .22
            }, {
                name: "weapon/bow/arrowReady",
                volume: .015
            }, {
                name: "weapon/largeBow/shoot",
                volume: .45
            }, {
                name: "weapon/largeCrossbow/shoot",
                volume: .45
            }, {
                name: "weapon/smallCrossbow/shoot",
                volume: .35
            }, {
                name: "weapon/bow/environmentImpact/1",
                volume: .42,
                minPitch: .8,
                maxPitch: 1.2
            }, {
                name: "weapon/bow/environmentImpact/2",
                volume: .42,
                minPitch: .8,
                maxPitch: 1.2
            }, {
                name: "weapon/bow/environmentImpact/3",
                volume: .42,
                minPitch: .8,
                maxPitch: 1.2
            }, {
                name: "weapon/melee/bladedHit",
                volume: .28,
                minPitch: .9,
                maxPitch: 1.2
            }, {
                name: "weapon/melee/bladedSwing",
                volume: .065
            }, {
                name: "weapon/melee/bluntHit",
                volume: .32,
                minPitch: .95,
                maxPitch: 1.2
            }, {
                name: "weapon/melee/bluntSwing",
                volume: .06
            }, {
                name: "weapon/melee/pokeHit",
                volume: .25,
                minPitch: .9,
                maxPitch: 1.3
            }, {
                name: "weapon/melee/pokeSwing",
                volume: .045
            }, {
                name: "weapon/equipBow",
                volume: .075
            }, {
                name: "weapon/equipMelee",
                volume: .075
            }, {
                name: "gameEnd/win",
                volume: .4,
                isMusic: !0
            }, {
                name: "gameEnd/lose",
                volume: .4,
                isMusic: !0
            }, {
                name: "player/spawn",
                volume: .25
            }, {
                name: "player/takeDamage/male/1",
                volume: .15,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "player/takeDamage/male/2",
                volume: .15,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "player/takeDamage/male/3",
                volume: .15,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "player/takeDamage/female/1",
                volume: .02,
                minPitch: .9,
                maxPitch: 1.05
            }, {
                name: "player/takeDamage/female/2",
                volume: .02,
                minPitch: .9,
                maxPitch: 1.05
            }, {
                name: "player/takeDamage/female/3",
                volume: .02,
                minPitch: .9,
                maxPitch: 1.05
            }, {
                name: "player/walkL",
                volume: .032
            }, {
                name: "player/walkR",
                volume: .032
            }, {
                name: "player/jump/male/1",
                volume: .077,
                minPitch: .8,
                maxPitch: .9
            }, {
                name: "player/jump/male/2",
                volume: .077,
                minPitch: .9,
                maxPitch: 1.1
            }, {
                name: "player/jump/male/3",
                volume: .077,
                minPitch: .9,
                maxPitch: 1
            }, {
                name: "player/jump/female/1",
                volume: .03,
                minPitch: .9,
                maxPitch: 1.1
            }, {
                name: "player/jump/female/2",
                volume: .03,
                minPitch: .9,
                maxPitch: 1.1
            }, {
                name: "player/jump/female/3",
                volume: .03,
                minPitch: .9,
                maxPitch: 1.1
            }, {
                name: "player/land",
                volume: .22,
                minPitch: .9,
                maxPitch: 1
            }, {
                name: "player/fall",
                volume: .14
            }, {
                name: "feedback/hitPlayer",
                volume: .45,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "feedback/headShot",
                volume: .45,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "feedback/die",
                volume: .3
            }, {
                name: "feedback/kill",
                volume: .4
            }, {
                name: "feedback/healthRegen",
                volume: .002
            }, {
                name: "flag/grab",
                volume: .4
            }, {
                name: "flag/drop",
                volume: .4
            }, {
                name: "flag/positive",
                volume: .3
            }, {
                name: "flag/negative",
                volume: .3
            }, {
                name: "flag/positiveImportant",
                volume: .4
            }, {
                name: "flag/negativeImportant",
                volume: .4
            }, {
                name: "ui/coin/0",
                volume: .4
            }, {
                name: "ui/coin/1",
                volume: .4
            }, {
                name: "ui/coin/2",
                volume: .4
            }, {
                name: "ui/coin/3",
                volume: .4
            }, {
                name: "ui/coin/pile",
                volume: .4,
                minPitch: .8,
                maxPitch: 1.1
            }, {
                name: "ui/purchaseShopItem",
                volume: .3,
                minPitch: .95,
                maxPitch: 1.05
            }, {
                name: "music/mainMenu",
                volume: .1,
                loop: !0,
                isMusic: !0
            }, {
                name: "music/finalFlag",
                volume: .1,
                loop: !0,
                isMusic: !0
            }, {
                name: "music/waiting",
                volume: .1,
                loop: !0,
                isMusic: !0
            }, {
                name: "ambient/wind",
                volume: .01,
                loop: !0
            }, {
                name: "ambient/water",
                volume: 0,
                loop: !0
            }, {
                name: "ambient/birds",
                volume: 0,
                loop: !0
            }, {
                name: "ambient/jungle",
                volume: 0,
                loop: !0
            }, {
                name: "ambient/rain",
                volume: 0,
                loop: !0
            }, {
                name: "ambient/insects",
                volume: 0,
                loop: !0
            }, {
                name: "environment/churchBellHit",
                volume: .45,
                minPitch: .98,
                maxPitch: 1.02
            }, {
                name: "environment/gongHit",
                volume: .16,
                minPitch: .96,
                maxPitch: 1.1
            }, {
                name: "environment/chineseWarDrumHit",
                volume: .52,
                minPitch: .9,
                maxPitch: 1.1
            }];
            for (const t of this.soundsConfig)
                this.cachedSfx[t.name] = new CachedSfx(t,this.ctx);
            this.ctxStatePossiblyInvalid = !1,
            document.addEventListener("visibilitychange", (t=>{
                document.hidden ? this.ctx && this.ctx.suspend() : (this.ctxStatePossiblyInvalid = !0,
                window.setTimeout((()=>{
                    this.ctx && this.ctx.resume()
                }
                ), 300))
            }
            ), !1),
            this.setMutedSettings(!1)
        }
    }
    static get audioFormat() {
        if (!this._audioFormatSet) {
            const t = document.createElement("audio");
            t.canPlayType("audio/webm;codecs=opus") ? this._audioFormat = "webm" : t.canPlayType("audio/mp3") ? this._audioFormat = "mp3" : (this._audioFormat = null,
            this.supported = !1),
            this._audioFormatSet = !0
        }
        return this._audioFormat
    }
    static get audioFormatCamelCase() {
        const t = this.audioFormat;
        return t ? t.charAt(0).toUpperCase() + t.substring(1) : null
    }
    init() {
        if (this.supported) {
            this.downloadPackage();
            for (const t of Object.values(this.cachedSfx))
                t.init();
            getMainInstance().settingsManager.onValueChange("musicVolume", (t=>{
                for (const e of this.createdSfx)
                    e.opts.isMusic && e.volumeSettingChanged(t)
            }
            )),
            getMainInstance().settingsManager.onValueChange("sfxVolume", (t=>{
                for (const e of this.createdSfx)
                    e.opts.isMusic || e.volumeSettingChanged(t)
            }
            ))
        }
    }
    async downloadPackage() {
        const t = getMainInstance().assets.addPackage(this.packageName, {
            manualDownload: !0
        });
        await getMainInstance().mapLoader.waitForFirstMapDownload(),
        t.startDownloading()
    }
    loop(t, e) {
        if (this.supported && this.ctx && "running" == this.ctx.state && this.ctx.listener) {
            const t = getMainInstance().cam.pos
              , e = getMainInstance().cam.rot;
            this.ctx.listener.positionX ? (this.ctx.listener.positionX.value = t.x,
            this.ctx.listener.positionY.value = t.y,
            this.ctx.listener.positionZ.value = t.z) : this.ctx.listener.setPosition(t.x, t.y, t.z);
            const i = new Vector3(0,0,-1);
            i.applyQuaternion(e);
            const s = new Vector3(0,1,0);
            s.applyQuaternion(e),
            this.ctx.listener.forwardX ? (this.ctx.listener.forwardX.value = i.x,
            this.ctx.listener.forwardY.value = i.y,
            this.ctx.listener.forwardZ.value = i.z,
            this.ctx.listener.upX.value = s.x,
            this.ctx.listener.upY.value = s.y,
            this.ctx.listener.upZ.value = s.z) : this.ctx.listener.setOrientation(i.x, i.y, i.z, s.x, s.y, s.z)
        }
    }
    onCtxStatechange() {
        this.supported && this.ctx && ("running" != this.ctx.state || this.ctxStatePossiblyInvalid ? this.addUserEventListeners() : this.removeUserEventListeners())
    }
    addUserEventListeners() {
        this.supported && this.boundUserEvent && (this.addedUserEventListeners || (window.addEventListener("touchstart", this.boundUserEvent),
        window.addEventListener("touchend", this.boundUserEvent),
        window.addEventListener("click", this.boundUserEvent),
        window.addEventListener("keydown", this.boundUserEvent),
        this.addedUserEventListeners = !0))
    }
    removeUserEventListeners() {
        this.supported && this.boundUserEvent && this.addedUserEventListeners && (window.removeEventListener("touchstart", this.boundUserEvent),
        window.removeEventListener("touchend", this.boundUserEvent),
        window.removeEventListener("click", this.boundUserEvent),
        window.removeEventListener("keydown", this.boundUserEvent),
        this.addedUserEventListeners = !1)
    }
    async userEvent() {
        this.supported && this.ctx && (this.ctxStatePossiblyInvalid && await this.ctx.suspend(),
        await this.ctx.resume(),
        this.ctxStatePossiblyInvalid = !1)
    }
    async playSound(t, e) {
        const i = this.cachedSfx[t];
        if (!i)
            return void console.warn("attempted to play sound " + t + " but it doesn't exist");
        const s = new SfxSound(i,e);
        return await s.init() ? (this.createdSfx.push(s),
        s) : null
    }
    setMutedSettings(t) {
        this.settingsMuted = t,
        this.updateMuted()
    }
    setMutedAds(t) {
        this.adsMuted = t,
        this.updateMuted()
    }
    updateMuted() {
        this.muted = this.settingsMuted || this.adsMuted;
        for (let t = this.createdSfx.length - 1; t >= 0; t--)
            this.createdSfx[t].setMuted(this.muted, this.adsMuted)
    }
    sfxDestructed(t) {
        const e = this.createdSfx.indexOf(t);
        e >= 0 && this.createdSfx.splice(e, 1)
    }
}
class LoginDialogUi extends DialogUi {
    constructor(t="login") {
        super({
            title: "login" == t ? "Log in and keep your loot safe!" : "Link new account"
        }),
        this.type = t,
        this.didClickAnyButton = !1,
        this.oAuthLoginFinished = !1,
        this.onAuthLoginResult = null,
        this.onOAuthLoginFinishCbs = new Set;
        const e = document.createElement("div");
        if (e.classList.add("dialog-art-buttons-container"),
        this.el.appendChild(e),
        "linknew" == t) {
            const t = document.createElement("p");
            t.textContent = "Link a new account to your current one so you have multiple ways to log in.",
            e.appendChild(t)
        }
        if ("login" == t) {
            const t = document.createElement("div");
            t.classList.add("dialog-art-wrapper"),
            e.appendChild(t),
            e.classList.add("contains-art");
            const i = document.createElement("picture");
            t.appendChild(i);
            const s = [{
                type: "image/avif",
                src: "static/img/loginUI/art.avif"
            }, {
                type: "image/webp",
                src: "static/img/loginUI/art.webp"
            }, {
                type: "image/png",
                src: "static/img/loginUI/art.png"
            }];
            for (const t of s) {
                let e = null;
                t === s[s.length - 1] ? (e = document.createElement("img"),
                e.src = t.src,
                e.classList.add("dialog-art")) : (e = document.createElement("source"),
                e.type = t.type,
                e.srcset = t.src),
                i.appendChild(e)
            }
        }
        this.addButtonsContainer({
            vertical: !0,
            parent: e
        }),
        this.loginButtons = [];
        for (const [t,e] of getMainInstance().auth.oAuthProviderConfigs) {
            const i = this.addButton({
                text: e.loginButtonText,
                icon: e.loginButtonIcon,
                iconIsInvertable: !!e.invertableIcon,
                onClick: ()=>{
                    this.didClickAnyButton = !0,
                    this.setButtonsEnabled(!1),
                    this.handleOAuthLogin(t)
                }
            });
            this.loginButtons.push(i)
        }
    }
    setButtonsEnabled(t) {
        for (const e of this.loginButtons)
            e.enabled = t
    }
    async waitForFlowEnd() {
        const t = new Promise((t=>{
            this.addOnCloseCb((async()=>{
                if (this.didClickAnyButton) {
                    const e = await this.waitForOAuthLoginFinish();
                    t(e)
                } else
                    t(null)
            }
            ))
        }
        ));
        return await t
    }
    async handleOAuthLogin(t) {
        const e = await getMainInstance().auth.oAuthLogin(t);
        if (e) {
            this.oAuthLoginFinished = !0,
            this.onAuthLoginResult = e;
            for (const t of this.onOAuthLoginFinishCbs)
                t(e);
            this.onOAuthLoginFinishCbs.clear(),
            this.close()
        } else
            this.setButtonsEnabled(!0)
    }
    async waitForOAuthLoginFinish() {
        if (this.oAuthLoginFinished && this.onAuthLoginResult)
            return this.onAuthLoginResult;
        const t = new Promise((t=>this.onOAuthLoginFinishCbs.add(t)));
        return await t
    }
}
function getUrl() {
    const t = new URL(location.href);
    return t.searchParams.get("useProductionServers") && (t.href = "https://narrow.one/"),
    getMainInstance().poki.isPokiBuild && (t.searchParams.get("pokiDebug") ? t.href = "https://staging.narrow.one/" : t.href = "https://narrow.one/"),
    t
}
function getBaseUrl(t) {
    const e = getUrl();
    return e.search = "",
    e.hash = "",
    e.pathname = "/api/" + t,
    e
}
function getOrigin() {
    return getUrl().origin
}
class AuthManager {
    constructor() {
        this.oAuthProviderConfigs = new Map,
        this.oAuthProviderConfigs.set("google", {
            loginButtonText: "Login with Google",
            loginButtonIcon: "static/img/loginUI/google.svg",
            issuer: "https://accounts.google.com"
        }),
        this.oAuthProviderConfigs.set("facebook", {
            loginButtonText: "Login with Facebook",
            loginButtonIcon: "static/img/loginUI/facebook.svg",
            issuer: "https://www.facebook.com",
            fallBackAuthorizationEndpoint: "https://facebook.com/dialog/oauth/"
        }),
        this.oAuthProviderConfigs.set("apple", {
            loginButtonText: "Login with Apple",
            loginButtonIcon: "static/img/loginUI/apple.svg",
            issuer: "https://appleid.apple.com",
            invertableIcon: !0
        }),
        this.oAuthProviderConfigs.set("itch", {
            loginButtonText: "Login with itch.io",
            loginButtonIcon: "static/img/loginUI/itch.svg",
            issuer: "https://itch.io",
            invertableIcon: !0
        }),
        this.prevSessionNonce = null,
        this.sessionNonce = null,
        this.currentSessionData = null,
        this.currentGuestSessionData = null,
        this.openOAuthWindows = new Set,
        this.onOAuthWindowCloseCbs = new Set,
        this.isHandlingAuthToken = !1,
        this.onAuthTokenHandleFinishCbs = new Set,
        this.mostRecentAuthTokenHandleResult = null,
        this.onLoggedInAccountChangeCbs = new Set,
        this.onGuestSessionDataChangeCbs = new Set,
        this.guestAccountData = null,
        this.guestAccountDataSetOnce = !1,
        window.addEventListener("message", (t=>{
            if (t.origin == getOrigin() && t.data) {
                const e = t.source;
                if ("requestOpenerOrigin" == t.data.type)
                    t.source && e.postMessage({
                        type: "openerOrigin",
                        openerOrigin: location.origin
                    }, "*");
                else if ("oAuthCallback" == t.data.type) {
                    e && e.postMessage({
                        type: "oAuthTokenReceived"
                    }, "*");
                    let i = null;
                    if (t.data.idToken)
                        i = {
                            type: "idToken",
                            idToken: t.data.idToken
                        };
                    else {
                        if (!t.data.accessToken)
                            throw new Error("Received an oAuth callback with missing data");
                        i = {
                            type: "accessToken",
                            accessToken: t.data.accessToken,
                            issuer: t.data.issuer
                        }
                    }
                    this.handleAuthToken(i),
                    this.closeOpenOAuthWindows()
                }
            }
        }
        )),
        this.syncGuestDataWithRestServiceInstance = new SingleInstancePromise((async()=>await this.syncGuestDataWithRestServiceFn())),
        this.isInit = !1,
        this.onInitCbs = new Set
    }
    async init() {
        try {
            this.currentSessionData = await getMainInstance().indexedDb.get("currentAuthSessionData"),
            this.prevSessionNonce = await getMainInstance().indexedDb.get("prevSessionNonce")
        } catch {}
        this.isInit = !0;
        for (const t of this.onInitCbs)
            t();
        this.onInitCbs.clear();
        let t = null;
        const e = parseSearch();
        if (e.loginIdToken ? t = {
            type: "idToken",
            idToken: e.loginIdToken
        } : e.loginAccessToken && (t = {
            type: "accessToken",
            accessToken: e.loginAccessToken,
            issuer: e.loginIssuer
        }),
        t) {
            this.handleAuthToken(t, !0);
            const e = new URL(window.location.href);
            e.search = "",
            e.hash = "",
            window.history.replaceState(null, "", e.href)
        }
    }
    async waitForInit() {
        if (this.isInit)
            return;
        const t = new Promise((t=>this.onInitCbs.add(t)));
        await t
    }
    onLoggedInAccountChange(t) {
        this.onLoggedInAccountChangeCbs.add(t)
    }
    fireLoggedInAccountChange() {
        this.onLoggedInAccountChangeCbs.forEach((t=>t()))
    }
    onGuestSessionDataChange(t) {
        this.onGuestSessionDataChangeCbs.add(t)
    }
    async showLoginDialog(t="login") {
        const e = new LoginDialogUi(t);
        return getMainInstance().dialogManager.addDialog(e),
        await e.waitForFlowEnd()
    }
    getSessionNonce() {
        if (this.sessionNonce)
            return this.sessionNonce;
        let t = 16;
        const e = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
        let i = "";
        for (; t > 0; ) {
            const s = new Uint8Array(t);
            try {
                window.crypto.getRandomValues(s)
            } catch (t) {
                return i
            }
            for (const n of s)
                n < e.length && (i += e[n],
                t--)
        }
        return this.sessionNonce = i,
        this.setPrevSessionNonce(this.sessionNonce),
        i
    }
    async setPrevSessionNonce(t) {
        try {
            await getMainInstance().indexedDb.set("prevSessionNonce", t)
        } catch {}
    }
    async getOAuthUrl(t) {
        await this.waitForInit();
        const e = this.oAuthProviderConfigs.get(t);
        if (!e)
            return null;
        const i = e.issuer;
        if (!i)
            return null;
        const s = getBaseUrl("auth/getIssuerConfig");
        let n;
        s.searchParams.set("issuer", i);
        try {
            n = await fetchWithTimeout(s.href)
        } catch (t) {
            console.error(t)
        }
        if (!n || !n.ok)
            return null;
        const a = await n.json()
          , o = a.openIdConfig
          , r = new URL(o.authorization_endpoint);
        let l = "code";
        const h = o.response_types_supported;
        h.includes("id_token") && (l = "id_token"),
        !h.includes(l) && h.length > 0 && (l = h[0]),
        r.searchParams.set("response_type", l),
        r.searchParams.set("client_id", a.clientId);
        const d = getBaseUrl("auth/oAuthCallback");
        d.searchParams.set("issuer", i),
        r.searchParams.set("redirect_uri", d.href);
        const c = new Set(["openid", "email"]);
        if (o.scopes_supported) {
            for (const t of c)
                o.scopes_supported.includes(t) || c.delete(t);
            if (0 == c.size)
                for (const t of o.scopes_supported)
                    c.add(t)
        }
        const u = "facebook" == t ? "," : " ";
        return r.searchParams.set("scope", Array.from(c).join(u)),
        "apple" == t && o.response_modes_supported && o.response_modes_supported.includes("form_post") && r.searchParams.set("response_mode", "form_post"),
        r.searchParams.set("nonce", this.getSessionNonce()),
        r.href
    }
    async oAuthLogin(t) {
        let e = null;
        const i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        "apple" == t && i || (e = window.open(),
        e && (e.document.body.innerText = "Loading..."));
        const s = await this.getOAuthUrl(t);
        if (!s)
            return e && e.close(),
            getMainInstance().dialogManager.showAlert({
                text: "An error occurred while getting login url."
            }),
            null;
        if (e) {
            const t = e;
            e.location.href = s,
            this.openOAuthWindows.add(e);
            const i = this.mostRecentAuthTokenHandleResult
              , n = new Promise((e=>{
                const i = setInterval((()=>{
                    this.onOAuthWindowCloseCbs.add((()=>{
                        e(),
                        clearInterval(i)
                    }
                    )),
                    t.closed && (clearInterval(i),
                    this.openOAuthWindows.delete(t),
                    e())
                }
                ), 1e3)
            }
            ));
            return await n,
            this.isHandlingAuthToken || this.mostRecentAuthTokenHandleResult != i ? await this.waitForAuthTokenHandleFinish() : null
        }
        {
            window.location.href = s;
            const t = new Promise((t=>{
                window.addEventListener("focus", (()=>{
                    t()
                }
                ), {
                    once: !0
                })
            }
            ));
            return await t,
            null
        }
    }
    closeOpenOAuthWindows() {
        for (const t of this.openOAuthWindows)
            try {
                t.close()
            } catch (t) {}
        this.openOAuthWindows.clear();
        for (const t of this.onOAuthWindowCloseCbs)
            t();
        this.onOAuthWindowCloseCbs.clear()
    }
    async handleAuthToken(t, e=!1) {
        this.isHandlingAuthToken = !0,
        await this.waitForInit();
        const i = e ? this.prevSessionNonce : this.getSessionNonce();
        let s, n = !1;
        const a = new URLSearchParams;
        if (this.setAuthTokenBody(t, a),
        a.set("nonce", i),
        this.isLoggedIn) {
            const t = getBaseUrl("auth/linkNewAccount");
            let e = null;
            try {
                e = await fetchWithTimeout(t.href, {
                    method: "POST",
                    credentials: "include",
                    body: a
                })
            } catch (t) {
                console.error(t)
            }
            e && (n = e.ok,
            s = await e.text())
        } else {
            const t = getBaseUrl("auth/getSession");
            n = await this.fetchAuthSessionData(t, a),
            n && (this.fireLoggedInAccountChange(),
            await this.mergeGuestDataWithLoggedInAccount())
        }
        this.isHandlingAuthToken = !1,
        this.mostRecentAuthTokenHandleResult = {
            success: n,
            error: s,
            authTokenData: t,
            usedNonce: i
        };
        for (const t of this.onAuthTokenHandleFinishCbs)
            t(this.mostRecentAuthTokenHandleResult);
        this.onAuthTokenHandleFinishCbs.clear()
    }
    async waitForAuthTokenHandleFinish() {
        return !this.isHandlingAuthToken && this.mostRecentAuthTokenHandleResult ? this.mostRecentAuthTokenHandleResult : await new Promise((t=>this.onAuthTokenHandleFinishCbs.add(t)))
    }
    async mergeAccountToCurrent(t, e) {
        if (!this.isLoggedIn)
            return !1;
        const i = getBaseUrl("auth/mergeAccount")
          , s = new URLSearchParams;
        this.setAuthTokenBody(t, s),
        s.set("nonce", e);
        let n = null;
        try {
            n = await fetchWithTimeout(i.href, {
                method: "POST",
                credentials: "include",
                body: s
            })
        } catch (t) {
            console.error(t)
        }
        return !(!n || !n.ok) && (this.fireLoggedInAccountChange(),
        !0)
    }
    setAuthTokenBody(t, e) {
        if ("accessToken" == t.type)
            e.set("accessToken", t.accessToken),
            e.set("issuer", t.issuer);
        else {
            if ("idToken" != t.type) {
                throw new Error(`Unknown type: "${t.type}".`)
            }
            e.set("idToken", t.idToken)
        }
        e.set("authType", t.type)
    }
    async mergeGuestDataWithLoggedInAccount() {
        if (!this.isLoggedIn)
            return !1;
        const t = await this.getGuestAccountData();
        if (!t)
            return !1;
        const e = getBaseUrl("auth/mergeGuestAccount")
          , i = new URLSearchParams;
        i.set("guestData", t);
        let s = null;
        try {
            s = await fetchWithTimeout(e.href, {
                method: "POST",
                credentials: "include",
                body: i
            })
        } catch (t) {
            console.error(t)
        }
        if (!s)
            return !1;
        const n = s.ok;
        let a = !1;
        if (n)
            a = !0;
        else {
            const t = await s.text();
            "invalid-guest-data" == t ? (console.error("Failed to merge guest data with login account. The guest data may already have been merged."),
            a = !0) : console.error("Failed to merge guest data with login account: " + t)
        }
        return a && await this.setGuestAccountData(null),
        n && this.fireLoggedInAccountChange(),
        !0
    }
    async refreshSession() {
        const t = getBaseUrl("auth/refreshSession");
        await this.fetchAuthSessionData(t, null, !0)
    }
    async refreshSessionIfNeeded() {
        this.currentSessionData && (Date.now() < this.currentSessionData.expires - 6e5 || await this.refreshSession())
    }
    async fetchAuthSessionData(t, e=null, i=!1) {
        let s;
        try {
            s = await fetchWithTimeout(t.href, {
                method: "POST",
                credentials: "include",
                body: e
            }),
            s && !s.ok && console.error("session data request error: " + await s.text())
        } catch (t) {
            console.error(t)
        }
        if (s && s.ok) {
            const t = await s.json();
            this.currentSessionData = {
                secureId: t.secureId,
                token: t.token,
                expires: Date.now() + t.expiresIn
            }
        } else
            this.currentSessionData = null,
            this.fireLoggedInAccountChange(),
            this.showLoggedOutNotification(i);
        try {
            await getMainInstance().indexedDb.set("currentAuthSessionData", this.currentSessionData)
        } catch {}
        return !(!s || !s.ok)
    }
    get isLoggedIn() {
        return !!this.currentSessionData
    }
    async loginIfNotLoggedIn(t=!1) {
        return await this.waitForInit(),
        this.currentSessionData ? (Date.now() > this.currentSessionData.expires - 6e5 && await this.refreshSession(),
        !this.currentSessionData && t && await this.showLoginDialog()) : t && await this.showLoginDialog(),
        this.isLoggedIn
    }
    async logoutAfterError() {
        return !!this.isLoggedIn && (await this.refreshSession(),
        this.isLoggedIn)
    }
    showLoggedOutNotification(t=!1) {
        t ? getMainInstance().dialogManager.showAlert({
            title: "Login error",
            text: "You have been logged out."
        }) : getMainInstance().dialogManager.showAlert({
            text: "An error occurred while logging in."
        })
    }
    async logout() {
        if (await this.waitForInit(),
        this.currentSessionData) {
            const t = getBaseUrl("auth/logout")
              , e = new URLSearchParams;
            e.set("tokenId", this.currentSessionData.secureId),
            e.set("token", this.currentSessionData.token);
            const i = await fetchWithTimeout(t.href, {
                method: "POST",
                credentials: "include",
                body: e
            });
            if (!i.ok) {
                const t = await i.text();
                if ("token-not-found" != t)
                    return t && console.error(t),
                    !1
            }
        }
        this.clearCurrentSessionData();
        try {
            await getMainInstance().indexedDb.set("currentAuthSessionData", null)
        } catch {}
        return !0
    }
    async logoutEverywhere() {
        await this.waitForInit();
        const t = getBaseUrl("auth/logoutEverywhere")
          , e = await fetchWithTimeout(t.href, {
            method: "POST",
            credentials: "include"
        });
        if (!e.ok) {
            const t = await e.text();
            return t && console.error(t),
            !1
        }
        this.clearCurrentSessionData();
        try {
            await getMainInstance().indexedDb.set("currentAuthSessionData", null)
        } catch {}
        return !0
    }
    clearCurrentSessionData() {
        this.currentSessionData = null,
        this.mostRecentAuthTokenHandleResult = null,
        this.fireLoggedInAccountChange()
    }
    async getGuestAccountData() {
        if (this.guestAccountDataSetOnce)
            return this.guestAccountData;
        {
            let t;
            try {
                t = await getMainInstance().indexedDb.get("guestAccountData")
            } catch {}
            const e = t || null;
            return this.guestAccountData = e,
            this.guestAccountDataSetOnce = !0,
            e
        }
    }
    async setGuestAccountData(t, e=!0) {
        this.guestAccountData = t,
        this.guestAccountDataSetOnce = !0;
        try {
            await getMainInstance().indexedDb.set("guestAccountData", t)
        } catch {}
        this.onGuestSessionDataChangeCbs.forEach((t=>t())),
        e || await this.deleteGuestAccountDataFromRestService()
    }
    async getSessionDataForGameServer() {
        return await this.waitForInit(),
        this.isLoggedIn && (await this.refreshSessionIfNeeded(),
        this.currentSessionData) ? {
            type: "sessionToken",
            token: this.currentSessionData.token,
            secureId: this.currentSessionData.secureId
        } : {
            type: "guest",
            guestData: await this.getGuestAccountData()
        }
    }
    async refreshGuestSessionIfNeeded() {
        if (!this.isLoggedIn)
            return !(!this.currentGuestSessionData || Date.now() > this.currentGuestSessionData.expires - 6e4) || await this.postGuestAccountDataToRestService()
    }
    async postGuestAccountDataToRestService() {
        const t = await this.getGuestAccountData()
          , e = getBaseUrl("auth/guestAccountData")
          , i = new URLSearchParams;
        i.set("guestData", t ?? "");
        const s = await fetch(e.href, {
            method: "POST",
            body: i
        });
        if (!s.ok)
            return !1;
        const n = await s.json();
        return this.currentGuestSessionData = {
            secureId: n.secureId,
            token: n.token,
            expires: Date.now() + n.expiresIn
        },
        !0
    }
    async syncGuestDataWithRestService() {
        return await this.syncGuestDataWithRestServiceInstance.run()
    }
    async waitForGuestDataSync() {
        await this.syncGuestDataWithRestServiceInstance.waitForFinishIfRunning()
    }
    async syncGuestDataWithRestServiceFn() {
        if (this.isLoggedIn)
            return;
        const t = getBaseUrl("auth/guestAccountData")
          , e = await this.getRestAuthHeader(!1);
        if (!e)
            return !1;
        const i = await fetch(t.href, {
            headers: {
                Authorization: e
            }
        });
        if (!i.ok)
            return !1;
        const s = await i.text();
        this.setGuestAccountData(s, !0)
    }
    async deleteGuestAccountDataFromRestService() {
        const t = getBaseUrl("auth/guestAccountData")
          , e = await this.getRestAuthHeader(!1);
        if (!e)
            return !0;
        const i = await fetch(t.href, {
            method: "DELETE",
            headers: {
                Authorization: e
            }
        });
        return this.currentGuestSessionData = null,
        i.ok
    }
    async getRestAuthHeader(t=!0) {
        await this.waitForInit();
        let e = ""
          , i = null;
        if (this.isLoggedIn)
            t && await this.refreshSessionIfNeeded(),
            e = "st",
            i = this.currentSessionData;
        else {
            if (t) {
                if (!await this.refreshGuestSessionIfNeeded())
                    return null
            }
            e = "g",
            i = this.currentGuestSessionData
        }
        if (!i)
            return null;
        return `Bearer ${[e, i.secureId, i.token].join(".")}`
    }
    async requestWithAuthHeader(t) {
        const e = await this.getRestAuthHeader()
          , i = await t(e);
        if (!i.gotAuthError || this.isLoggedIn)
            return i.returnValue;
        {
            this.currentGuestSessionData = null;
            const e = await this.getRestAuthHeader();
            if (!e)
                return i.returnValue;
            return (await t(e)).returnValue
        }
    }
}
class StateManager {
    constructor(t, e) {
        this.authManager = t,
        this.indexedDb = e,
        this.onStateChangedCbs = new Set,
        this.cachedStateIndexDbKey = "cachedState",
        this.getStateUrl = "",
        this.fetchCurrentDataInstance = new SingleInstancePromise((async()=>await this.fetchCurrentDataFn())),
        this.stateIsStale = !0
    }
    init() {
        this.loadCachedState(),
        this.authManager.onLoggedInAccountChange((()=>{
            this.clearCurrentData(),
            this.markStateAsStale(),
            this.fetchCurrentData()
        }
        ))
    }
    clearCurrentData() {
        this.clearCurrentDataImpl(),
        this.fireStateChanged(),
        this.saveCurrentCachedState()
    }
    async saveCachedState(t) {
        try {
            await this.indexedDb.set(this.cachedStateIndexDbKey, t)
        } catch {}
    }
    async loadCachedState() {
        let t;
        try {
            t = await this.indexedDb.get(this.cachedStateIndexDbKey)
        } catch {}
        this.loadStateData(t),
        this.fireStateChanged()
    }
    async saveCurrentCachedState() {
        const t = this.getCurrentState();
        await this.saveCachedState(t)
    }
    markStateAsStale() {
        this.stateIsStale = !0
    }
    onStateChanged(t) {
        this.onStateChangedCbs.add(t)
    }
    removeOnStateChanged(t) {
        this.onStateChangedCbs.delete(t)
    }
    fireStateChanged() {
        this.saveCurrentCachedState(),
        this.onStateChangedCbs.forEach((t=>t()))
    }
    async fetchCurrentData(t=!1) {
        (this.stateIsStale || t) && await this.fetchCurrentDataInstance.run()
    }
    async waitForCurrentDataFetch() {
        await this.fetchCurrentDataInstance.waitForFinishIfRunning()
    }
    async fetchCurrentDataFn() {
        const t = getBaseUrl(this.getStateUrl)
          , {success: e, authError: i, data: s} = await this.authManager.requestWithAuthHeader((async e=>{
            if (!e)
                return {
                    gotAuthError: !0,
                    returnValue: {
                        success: !1,
                        authError: !0,
                        data: null
                    }
                };
            const i = await fetch(t.href, {
                headers: {
                    Authorization: e
                }
            });
            if (!i.ok) {
                const t = await i.text()
                  , e = "token-not-found" == t || "invalid-token" == t;
                return {
                    gotAuthError: e,
                    returnValue: {
                        success: !1,
                        authError: e,
                        data: null
                    }
                }
            }
            return {
                gotAuthError: !1,
                returnValue: {
                    success: !0,
                    authError: !1,
                    data: await i.json()
                }
            }
        }
        ));
        if (e)
            this.saveCachedState(s),
            this.loadStateData(s),
            this.fireStateChanged(),
            this.stateIsStale = !1;
        else {
            if (i) {
                if (await this.authManager.logoutAfterError())
                    return await this.fetchCurrentDataFn()
            }
            this.clearCurrentData()
        }
    }
    loadStateData(t) {}
    getCurrentState() {
        throw new Error("Base class")
    }
    clearCurrentDataImpl() {}
}
class ProfileStateManager extends StateManager {
    constructor(...t) {
        super(...t),
        this.cachedStateIndexDbKey = "cachedProfileState",
        this.getStateUrl = "profile/getProfile",
        this.username = null
    }
    getCurrentState() {
        return {
            username: this.username
        }
    }
    loadStateData(t) {
        t && (this.username = t.username)
    }
    clearCurrentDataImpl() {
        this.username = null
    }
    async setUsername(t) {
        const e = getBaseUrl("profile/username")
          , i = new URLSearchParams;
        i.set("username", t);
        const s = await this.authManager.requestWithAuthHeader((async t=>{
            if (!t)
                return {
                    gotAuthError: !0,
                    returnValue: !1
                };
            const s = await fetch(e.href, {
                method: "POST",
                headers: {
                    Authorization: t
                },
                body: i
            });
            if (!s.ok) {
                const t = await s.text();
                return t && console.error(t),
                {
                    gotAuthError: 401 == s.status,
                    returnValue: !1
                }
            }
            return {
                gotAuthError: !1,
                returnValue: !0
            }
        }
        ));
        return s && (this.username = t,
        this.fireStateChanged()),
        s
    }
}
class ShopStateManager extends StateManager {
    constructor(...t) {
        super(...t),
        this.cachedStateIndexDbKey = "cachedShopState",
        this.getStateUrl = "shop/getShopState",
        this.ownedCoins = 0,
        this.purchasedItems = new Set,
        this.purchasingItemTasks = new Map
    }
    getCurrentState() {
        return {
            ownedCoins: this.ownedCoins,
            purchasedItems: Array.from(this.purchasedItems)
        }
    }
    loadStateData(t) {
        t && (this.ownedCoins = t.ownedCoins,
        this.purchasedItems = new Set(t.purchasedItems))
    }
    clearCurrentDataImpl() {
        this.ownedCoins = 0,
        this.purchasedItems.clear()
    }
    async sendPurchaseItemRequest(t) {
        const e = t.id;
        let i = this.purchasingItemTasks.get(e);
        i || (i = (async()=>{
            const i = getBaseUrl("shop/purchaseItem");
            return await this.authManager.requestWithAuthHeader((async s=>{
                if (!s)
                    return {
                        gotAuthError: !0,
                        returnValue: {
                            success: !1,
                            errorCode: "not-logged-in"
                        }
                    };
                const n = new URLSearchParams;
                n.set("itemId", e);
                const a = await fetch(i.href, {
                    method: "POST",
                    headers: {
                        Authorization: s
                    },
                    body: n
                });
                return a.ok && (await this.waitForCurrentDataFetch(),
                t.price && t.price > 0 && (this.ownedCoins -= t.price),
                this.purchasedItems.add(e),
                this.fireStateChanged(),
                this.authManager.syncGuestDataWithRestService()),
                {
                    gotAuthError: !a.ok && 401 == a.status,
                    returnValue: {
                        success: a.ok,
                        errorCode: await a.text()
                    }
                }
            }
            ))
        }
        )(),
        this.purchasingItemTasks.set(e, i));
        const s = await i;
        return this.purchasingItemTasks.delete(e),
        s
    }
    async purchasePaidItem(t, e) {
        const {success: i, errorCode: s} = await this.sendPurchaseItemRequest(t);
        return i ? (getMainInstance().sfx.playSound("ui/purchaseShopItem"),
        !0) : ("not-enough-coins" === s ? e.showAlert({
            title: "Not enough coins",
            text: "You don't have enough coins to purchase this item."
        }) : (s && console.error("Purchase failed: " + s),
        e.showAlert({
            title: "Purchase Failed",
            text: "An error occurred while trying to purchase this item. Please try again later."
        })),
        !1)
    }
    async purchaseRewardedItem(t, e, i, s) {
        if (this.purchasedItems.has(t.id))
            return i.showAlert({
                title: "Purchase Failed",
                text: "You already own this item."
            }),
            !1;
        return !!await e.rewardedBreakWithErrorDialog({
            category: "cosmetic",
            details: `shopItem ${t.id}`,
            placement: s
        }) && await this.purchasePaidItem(t, i)
    }
    async purchaseItem(t, e, i, s) {
        let n = !1;
        return t.price ? n = await this.purchasePaidItem(t, i) : t.hasRewardedAd && (n = await this.purchaseRewardedItem(t, e, i, s)),
        n
    }
    provideNewCoinCount(t) {
        this.ownedCoins = t,
        this.fireStateChanged()
    }
    async doubleLastGameCoins() {
        const t = getBaseUrl("shop/doubleLastGameCoins");
        return await this.authManager.requestWithAuthHeader((async e=>{
            if (!e)
                return {
                    gotAuthError: !0,
                    returnValue: {
                        success: !1,
                        error: "not-logged-in"
                    }
                };
            const i = await fetch(t.href, {
                method: "POST",
                headers: {
                    Authorization: e
                }
            });
            if (i.ok) {
                const {newCoinCount: t} = await i.json();
                return this.provideNewCoinCount(t),
                this.authManager.syncGuestDataWithRestService(),
                {
                    gotAuthError: !1,
                    returnValue: {
                        success: !0,
                        error: ""
                    }
                }
            }
            return {
                gotAuthError: 401 == i.status,
                returnValue: {
                    success: !1,
                    error: await i.text()
                }
            }
        }
        ))
    }
    async requestCheatCoins(t) {
        return !1
    }
    isPurchasingItem(t) {
        return this.purchasingItemTasks.has(t)
    }
    itemIsPurchased(t) {
        return this.purchasedItems.has(t)
    }
    async waitForItemPurchase(t) {
        const e = this.purchasingItemTasks.get(t);
        e && await e
    }
}
class PokiManager {
    constructor(t) {
        this.pokiInit = !1,
        this.pokiErrored = !1,
        this.pokiInitErrored = !1,
        this.onPokiInitCbs = [],
        this._usePokiSdk = !1,
        this.gameplayStarted = !1,
        this.loadStartCalled = !1,
        this.loadFinishCalled = !1,
        this.isShowingCommercialBreak = !1,
        this.isShowingRewardedBreak = !1,
        this.onRewardedBreakFinishCbs = new Set,
        this._prevIsShowingBreak = !1,
        this.onIsShowingBreakChangeCbs = new Set,
        this.prevVisiblePokiBanners = new Set,
        t && (this._usePokiSdk = !0),
        this.isPokiBuild = location.origin.includes("poki"),
        addResizeListener((()=>{
            this.updateBannerVisibility()
        }
        ))
    }
    get usePokiSdk() {
        return this._usePokiSdk
    }
    get supported() {
        return !!this._usePokiSdk && !this.pokiErrored
    }
    get isShowingBreak() {
        return this.isShowingCommercialBreak || this.isShowingRewardedBreak
    }
    async init() {
        if (this.usePokiSdk) {
            try {
                await addScript("https://game-cdn.poki.com/scripts/v2/poki-sdk.js")
            } catch (t) {
                this.pokiErrored = !0,
                console.warn("failed to load PokiSDK", t)
            }
            if ("undefined" == typeof PokiSDK && (this.pokiErrored = !0,
            console.warn("failed to load PokiSDK, PokiSDK does not exist")),
            !this.pokiErrored)
                try {
                    await PokiSDK.init({
                        debug: !1
                    })
                } catch (t) {
                    console.warn("Warning! Error during poki initialization: ", t),
                    this.pokiInitErrored = !0
                }
            this.pokiInit = !0;
            for (const t of this.onPokiInitCbs)
                t();
            this.onPokiInitCbs = [],
            this.updateBannerVisibility(),
            getMainInstance().mainMenu.onVisibilityChange((t=>{
                this.updateBannerVisibility()
            }
            ))
        }
    }
    async waitForInit() {
        if (this.pokiInit)
            return;
        const t = new Promise((t=>{
            this.onPokiInitCbs.push(t)
        }
        ));
        await t
    }
    async gameplayStart() {
        if (!this.gameplayStarted && (this.gameplayStarted = !0,
        this.supported)) {
            await this.waitForInit();
            try {
                PokiSDK.gameplayStart()
            } catch (t) {
                console.error(t)
            }
        }
    }
    async gameplayStop() {
        if (this.gameplayStarted && (this.gameplayStarted = !1,
        this.supported)) {
            await this.waitForInit();
            try {
                PokiSDK.gameplayStop()
            } catch (t) {
                console.error(t)
            }
        }
    }
    async gameLoadingStart() {
        if (this.supported && !this.loadStartCalled) {
            this.loadStartCalled = !0,
            await this.waitForInit();
            try {
                PokiSDK.gameLoadingStart()
            } catch (t) {
                console.error(t)
            }
        }
    }
    async gameLoadingProgress(t) {
        if (this.supported && !this.loadFinishCalled) {
            await this.waitForInit();
            try {
                PokiSDK.gameLoadingProgress({
                    percentageDone: t
                })
            } catch (t) {}
        }
    }
    async gameLoadingFinished() {
        if (this.supported && !this.loadFinishCalled) {
            this.loadFinishCalled = !0,
            await this.waitForInit();
            try {
                PokiSDK.gameLoadingFinished()
            } catch (t) {
                console.error(t)
            }
        }
    }
    async rewardedBreak({category: t, details: e, placement: i}) {
        if (!this.supported || !this.pokiInit)
            return {
                success: !1,
                error: "sdk-not-init"
            };
        this.isShowingRewardedBreak = !0,
        this.updateIsShowingBreak(),
        await this.waitForInit(),
        getMainInstance().sfx.setMutedAds(!0);
        let s = !1;
        try {
            s = await PokiSDK.rewardedBreak(t, e, i)
        } catch (t) {
            console.error(t)
        }
        return getMainInstance().sfx.setMutedAds(!1),
        this.isShowingRewardedBreak = !1,
        this.updateIsShowingBreak(),
        this.onRewardedBreakFinishCbs.forEach((t=>t())),
        this.onRewardedBreakFinishCbs.clear(),
        s ? {
            success: !0
        } : {
            success: !1,
            error: this.pokiInitErrored ? "adblocker" : "unknown"
        }
    }
    async rewardedBreakWithErrorDialog(t) {
        const e = await this.rewardedBreak(t);
        if (!e.success) {
            let t = "An error occurred while trying to load the ad.";
            return "adblocker" == e.error && (t = "Please disable your adblocker."),
            getMainInstance().dialogManager.showAlert({
                title: "Ad failed to load",
                text: t
            }),
            !1
        }
        return e.success
    }
    async waitForRewardedBreakFinish() {
        if (!this.isShowingRewardedBreak)
            return;
        const t = new Promise((t=>this.onRewardedBreakFinishCbs.add(t)));
        await t
    }
    async commercialBreak() {
        if (this.supported && this.pokiInit) {
            getMainInstance().sfx.setMutedAds(!0),
            this.isShowingCommercialBreak = !0,
            this.updateIsShowingBreak();
            try {
                await PokiSDK.commercialBreak()
            } catch (t) {
                console.error(t)
            }
            getMainInstance().sfx.setMutedAds(!1),
            this.isShowingCommercialBreak = !1,
            this.updateIsShowingBreak()
        }
    }
    updateIsShowingBreak() {
        this._prevIsShowingBreak != this.isShowingBreak && (this._prevIsShowingBreak = this.isShowingBreak,
        this.onIsShowingBreakChangeCbs.forEach((t=>t())))
    }
    onIsShowingBreakChange(t) {
        this.onIsShowingBreakChangeCbs.add(t)
    }
    updateBannerVisibility() {
        if (!this.supported)
            return;
        if (!this.pokiInit)
            return;
        let t = [];
        t.push({
            el: getMainInstance().adBanners.desktopBanner,
            size: "728x90"
        }),
        t.push({
            el: getMainInstance().adBanners.mobileBanner,
            size: "320x50"
        }),
        t = t.filter((t=>"none" != window.getComputedStyle(t.el).display));
        for (const {el: e, size: i} of t)
            if (!this.prevVisiblePokiBanners.has(e)) {
                this.prevVisiblePokiBanners.add(e);
                try {
                    PokiSDK.displayAd(e, i)
                } catch (t) {
                    console.error(t)
                }
            }
        for (const e of this.prevVisiblePokiBanners)
            if (!t.some((t=>t.el == e))) {
                this.prevVisiblePokiBanners.delete(e);
                try {
                    PokiSDK.destroyAd(e)
                } catch (t) {
                    console.error(t)
                }
            }
    }
    async happyTime(t=.5) {
        if (this.supported) {
            await this.waitForInit();
            try {
                PokiSDK.happyTime(t)
            } catch (t) {
                console.error(t)
            }
        }
    }
    get isHappyDay() {
        const t = new Date;
        return t.getUTCDate() > new Date(t.getUTCFullYear(),t.getUTCMonth() + 1,0).getDate() / 2
    }
}
const quantcastFunction = function() {
    const t = document.createElement("script")
      , e = document.getElementsByTagName("script")[0]
      , i = "https://cmp.quantcast.com".concat("/choice/", "A-YH9MP3vgq7x", "/", "narrow.one", "/choice.js?tag_version=V2");
    let s = 0;
    t.async = !0,
    t.type = "text/javascript",
    t.src = i,
    e.parentNode.insertBefore(t, e),
    function() {
        const t = "__tcfapiLocator"
          , e = [];
        let i, s = window;
        for (; s; ) {
            try {
                if (s.frames.__tcfapiLocator) {
                    i = s;
                    break
                }
            } catch (t) {}
            if (s === window.top)
                break;
            s = s.parent
        }
        i || (!function e() {
            const i = s.document
              , n = !!s.frames.__tcfapiLocator;
            if (!n)
                if (i.body) {
                    const e = i.createElement("iframe");
                    e.style.cssText = "display:none",
                    e.name = t,
                    i.body.appendChild(e)
                } else
                    setTimeout(e, 5);
            return !n
        }(),
        s.__tcfapi = function() {
            let t;
            const i = arguments;
            if (!i.length)
                return e;
            if ("setGdprApplies" === i[0])
                i.length > 3 && 2 === i[2] && "boolean" == typeof i[3] && (t = i[3],
                "function" == typeof i[2] && i[2]("set", !0));
            else if ("ping" === i[0]) {
                const e = {
                    gdprApplies: t,
                    cmpLoaded: !1,
                    cmpStatus: "stub"
                };
                "function" == typeof i[2] && i[2](e)
            } else
                "init" === i[0] && "object" == typeof i[3] && (i[3] = Object.assign(i[3], {
                    tag_version: "V2"
                })),
                e.push(i)
        }
        ,
        s.addEventListener("message", (function(t) {
            const e = "string" == typeof t.data;
            let i = {};
            try {
                i = e ? JSON.parse(t.data) : t.data
            } catch (t) {}
            const s = i.__tcfapiCall;
            s && window.__tcfapi(s.command, s.version, ((i,n)=>{
                let a = {
                    __tcfapiReturn: {
                        returnValue: i,
                        success: n,
                        callId: s.callId
                    }
                };
                e && (a = JSON.stringify(a)),
                t && t.source && t.source.postMessage && t.source.postMessage(a, "*")
            }
            ), s.parameter)
        }
        ), !1))
    }();
    var n = function() {
        const t = arguments;
        typeof window.__uspapi !== n && setTimeout((()=>{
            void 0 !== window.__uspapi && window.__uspapi.apply(window.__uspapi, t)
        }
        ), 500)
    };
    const a = function() {
        s++,
        window.__uspapi === n && s < 3 ? console.warn("USP is not accessible") : clearInterval(o)
    };
    if (void 0 === window.__uspapi) {
        window.__uspapi = n;
        var o = setInterval(a, 6e3)
    }
};
class QuantcastManager {
    init(t) {
        if (t && !getMainInstance().poki.isPokiBuild)
            try {
                quantcastFunction()
            } catch (t) {
                console.error("error occurred while initializing quantcast: ", t)
            }
    }
}
class AvatarBlobUrlReference {
    constructor() {
        this.onDestructedCbs = new Set,
        this.onBlobUrlCreatedCbs = new Set,
        this.blobUrl = null,
        this.destructed = !1
    }
    destructor() {
        this.destructed = !0,
        this.onDestructedCbs.forEach((t=>t()))
    }
    onDestructed(t) {
        this.onDestructedCbs.add(t)
    }
    blobUrlCreated(t) {
        this.blobUrl = t,
        this.onBlobUrlCreatedCbs.forEach((e=>e(t)))
    }
    async getBlobUrl() {
        if (this.destructed)
            throw new Error("Can't get blob urls from destructed references");
        if (this.blobUrl)
            return this.blobUrl;
        const t = new Promise((t=>{
            this.onBlobUrlCreatedCbs.add(t)
        }
        ));
        return await t
    }
}
class Avatar {
    constructor(t, e) {
        this.avatarsManager = t,
        this.config = e,
        this.blobUrlReferences = new Set,
        this.onDestructedCbs = new Set,
        this.blobUrl = null,
        this.createAvatarInstance = new SingleInstancePromise((async()=>{
            const t = await this.avatarsManager.generateAvatarBlob(this.config);
            if (!t)
                return;
            if (this.destructed)
                return;
            const e = URL.createObjectURL(t);
            this.blobUrl = e,
            this.blobUrlReferences.forEach((t=>t.blobUrlCreated(e)))
        }
        ),{
            once: !0
        }),
        this.destructed = !1
    }
    destructor() {
        this.destructed = !0,
        this.blobUrl && URL.revokeObjectURL(this.blobUrl),
        this.onDestructedCbs.forEach((t=>t()))
    }
    getBlobUrlReference() {
        const t = new AvatarBlobUrlReference;
        return t.onDestructed((()=>{
            this.blobUrlReferences.delete(t),
            this.blobUrlReferences.size <= 0 && this.destructor()
        }
        )),
        this.blobUrlReferences.add(t),
        this.blobUrl && t.blobUrlCreated(this.blobUrl),
        this.createAvatarInstance.run(),
        t
    }
    onDestructed(t) {
        this.onDestructedCbs.add(t)
    }
}
class AvatarsManager {
    constructor(t) {
        this.renderer = t,
        this.createdAvatars = new Map
    }
    fillConfigDefaults(t) {
        return {
            ...t,
            cameraType: t.cameraType || "face-close",
            width: t.width || 512,
            height: t.height || 512,
            backgroundColor: t.backgroundColor || "black",
            backgroundAlpha: null != t.backgroundAlpha ? t.backgroundAlpha : 1,
            clipPathType: t.clipPathType || "circle",
            skeletonPoseLayers: t.skeletonPoseLayers || ["shopPreview"],
            bow: t.bow || null,
            skinObjectOpts: t.skinObjectOpts || {
                teamId: 0,
                skin: {}
            }
        }
    }
    async generateAvatarBlob(t) {
        const {cameraType: e, width: i, height: s, backgroundColor: n, backgroundAlpha: a, skinObjectOpts: o, clipPathType: r, skeletonPoseLayers: l} = this.fillConfigDefaults(t)
          , h = new PlayerSkeleton({
            gender: o.skin.gender || "male"
        });
        h.init();
        const d = new PlayerModel({
            skinObjectOpts: o,
            useWorldWeather: !1
        });
        let c = null;
        t.bow && (c = new BowAssetLoader({
            useWorldWeather: !1
        }),
        c.setConfig(t.bow),
        await c.waitForLoad()),
        await d.waitForInit(),
        await h.waitForLoad();
        const u = [];
        for (const t of l) {
            const e = h.addPoseLayer(t);
            u.push((async()=>{
                await e.waitForObjectLinks()
            }
            )())
        }
        await Promise.all(u),
        h.applyLayers(),
        h.updateMatrices(),
        d.applySkeleton(h);
        const p = new Scene;
        if (p.name = "Avatar scene",
        !d.obj)
            return null;
        if (p.add(d.obj),
        c) {
            if (!h.baseSkeletonObject)
                throw new Error("Assertion failed, skeleton is not initialized");
            const t = h.baseSkeletonObject.getObjectByName("bowHoldingPos");
            if (!t)
                throw new Error("Assertion failed, bowHoldingPos is not found");
            p.add(c.obj),
            c.obj.matrixAutoUpdate = !1,
            c.obj.matrix.copy(t.matrixWorld)
        }
        const g = new PerspectiveCamera;
        g.far = 10,
        g.aspect = i / s,
        g.updateProjectionMatrix(),
        "face-close" == e ? g.position.set(0, 1.75, .7) : "face" == e ? g.position.set(0, 1.7, .9) : "upper-body" == e ? g.position.set(0, 1.5, 1.3) : "full-body" == e && g.position.set(0, 1.2, 2.9);
        const m = this.renderer.createRenderView({
            width: i,
            height: s
        });
        m.setRenderObjects(p, g, !0),
        await m.waitForFrameRender();
        const f = await m.getBlob();
        if (this.renderer.removeRenderView(m),
        d.destructor(),
        c && c.destructor(),
        !f)
            return null;
        const w = document.createElement("canvas");
        w.width = i,
        w.height = s;
        const b = w.getContext("2d");
        if (!b)
            return null;
        if ("circle" == r) {
            b.beginPath();
            const t = Math.min(i, s);
            b.arc(i / 2, s / 2, .45 * t, 0, 2 * Math.PI),
            b.clip()
        }
        b.fillStyle = n,
        b.globalAlpha = a,
        b.fillRect(0, 0, i, s),
        b.globalAlpha = 1;
        const y = URL.createObjectURL(f)
          , S = new Image;
        S.src = y,
        await new Promise(((t,e)=>{
            S.onload = t,
            S.onerror = e
        }
        )),
        b.drawImage(S, 0, 0),
        URL.revokeObjectURL(y);
        const C = new Promise((t=>{
            w.toBlob(t)
        }
        ))
          , v = await C;
        return v || null
    }
    configToCacheKey(t) {
        const {cameraType: e, width: i, height: s, backgroundColor: n, backgroundAlpha: a, skinObjectOpts: o, clipPathType: r, skeletonPoseLayers: l} = this.fillConfigDefaults(t)
          , h = [];
        h.push(e),
        h.push(i),
        h.push(s),
        h.push(n),
        h.push(a),
        h.push(r),
        h.push("skeletonStart");
        for (const t of l)
            h.push(t);
        return h.push("skeletonEnd"),
        h.push(getMainInstance().skins.skinObjectOptsToCacheKey(o)),
        h.join("-")
    }
    getAvatar(t) {
        const e = this.configToCacheKey(t);
        let i = this.createdAvatars.get(e);
        return i || (i = new Avatar(this,t),
        i.onDestructed((()=>{
            this.createdAvatars.delete(e)
        }
        )),
        this.createdAvatars.set(e, i),
        i)
    }
}
class ClassSelectionImageUpdateReference {
    constructor(t, e) {
        this.classId = t,
        this.classSelectionImageManager = e,
        this._needsUpdates = !1,
        this.lastBlobUrl = null,
        this.blobUrlChangeCbs = new Set,
        this.onNeedsUpdatesChangeCbs = new Set
    }
    destructor() {
        this.classSelectionImageManager.removeUpdateReference(this.classId, this)
    }
    get needsUpdates() {
        return this._needsUpdates
    }
    set needsUpdates(t) {
        this._needsUpdates = t,
        this.onNeedsUpdatesChangeCbs.forEach((t=>t()))
    }
    onNeedsUpdatesChange(t) {
        this.onNeedsUpdatesChangeCbs.add(t)
    }
    onBlobUrlChange(t, e=!0) {
        this.blobUrlChangeCbs.add(t),
        e && this.lastBlobUrl && t(this.lastBlobUrl)
    }
    fireUrlChangeCbs(t) {
        this.lastBlobUrl = t,
        this.blobUrlChangeCbs.forEach((e=>e(t)))
    }
}
class ClassSelectionImageManager {
    constructor() {
        this.cachedBlobUrlDatas = new Map,
        this.teamId = 1
    }
    init() {
        getMainInstance().skins.onSkinConfigChange((()=>{
            this.markAllAvatarsDirty()
        }
        ))
    }
    markAllAvatarsDirty() {
        for (const [t,e] of this.cachedBlobUrlDatas)
            e.avatarDirty = !0,
            this.loadClassBlobUrl(t)
    }
    async loadClassBlobUrl(t) {
        const e = this.getOrCreateBlobUrlData(t);
        if (!e.avatarDirty)
            return;
        let i = !1;
        for (const t of e.updateReferences)
            if (t.needsUpdates) {
                i = !0;
                break
            }
        if (!i)
            return;
        e.avatarDirty = !1;
        let s = null
          , n = null;
        e.reference && (s = e.reference,
        n = e.url);
        const a = Symbol("Loading avatar");
        e.lastLoadingSym = a;
        const o = this.createClassBlobUrl(t);
        e.reference = o;
        const r = await o.getBlobUrl()
          , l = this.cachedBlobUrlDatas.get(t);
        if (!(l && l.lastLoadingSym != a || (e.url = r,
        s && s.destructor(),
        n && n == r)))
            for (const t of e.updateReferences)
                t.fireUrlChangeCbs(r)
    }
    createClassBlobUrl(t) {
        const e = getClassConfigById(t)
          , i = getMainInstance()
          , s = i.skins.getClassSkinDataWithAppliedPreset(t)
          , {skins: n, arrowSkin: a} = i.skins.skinNetworkDataToBowAssetData(e.bowId, s);
        return i.avatars.getAvatar({
            skinObjectOpts: {
                skin: s,
                teamId: this.teamId
            },
            width: 200,
            height: 200,
            clipPathType: "none",
            cameraType: "upper-body",
            skeletonPoseLayers: [`bows/${e.bowId}/shopClassItem`],
            backgroundAlpha: 0,
            bow: {
                teamId: this.teamId,
                bowId: e.bowId,
                arrowCount: 1,
                skins: n,
                arrowSkin: a
            }
        }).getBlobUrlReference()
    }
    setTeamId(t) {
        null == t && (t = 1),
        this.teamId = t,
        this.markAllAvatarsDirty()
    }
    getOrCreateBlobUrlData(t) {
        let e = this.cachedBlobUrlDatas.get(t);
        return e || (e = {
            updateReferences: new Set,
            reference: null,
            url: null,
            lastLoadingSym: null,
            avatarDirty: !0
        },
        this.cachedBlobUrlDatas.set(t, e)),
        e
    }
    createUpdateReference(t) {
        const e = this.getOrCreateBlobUrlData(t)
          , i = new ClassSelectionImageUpdateReference(t,this);
        return e.updateReferences.add(i),
        e.url && i.fireUrlChangeCbs(e.url),
        i.onNeedsUpdatesChange((()=>{
            this.loadClassBlobUrl(t)
        }
        )),
        i
    }
    removeUpdateReference(t, e) {
        this.getOrCreateBlobUrlData(t).updateReferences.delete(e)
    }
}
class MainInfoText {
    constructor(t, {startLoading: e=!1, showPercentage: i=!1, shouldBounce: s=!0, showInMainMenu: n=!0, priority: a=0}={}) {
        this.text = t,
        this.showPercentage = i,
        this.shouldBounce = s,
        this.showInMainMenu = n,
        this.priority = a,
        this.percentage = 0,
        this.isLoading = e,
        this.onStateChangeCbs = new Set
    }
    setIsLoading(t) {
        this.isLoading != t && (this.isLoading = t,
        this.fireStateChange())
    }
    onStateChange(t) {
        this.onStateChangeCbs.add(t)
    }
    fireStateChange() {
        for (const t of this.onStateChangeCbs)
            t()
    }
    setShowPercentage(t) {
        this.showPercentage = t,
        this.fireStateChange()
    }
    setPercentage(t) {
        this.percentage = t,
        this.fireStateChange()
    }
    getText() {
        let t = this.text;
        return this.showPercentage && this.percentage > 0 && (t += " " + Math.round(100 * this.percentage) + "%"),
        t
    }
}
class MainInfoTextManager {
    constructor() {
        if (this.infoTextEl = document.getElementById("mainInfoText"),
        !this.infoTextEl)
            throw new Error("Main info text element not found");
        this.loadingTexts = new Set
    }
    init() {
        getMainInstance().mainMenu.onVisibilityChange((()=>{
            this.updateText()
        }
        ))
    }
    requestInfoText(...t) {
        const e = new MainInfoText(...t);
        return this.loadingTexts.add(e),
        e.onStateChange((()=>{
            this.updateText()
        }
        )),
        this.updateText(),
        e
    }
    removeInfoText(t) {
        this.loadingTexts.delete(t),
        this.updateText()
    }
    updateText() {
        const t = getMainInstance()
          , e = t.mainMenu
          , i = e.visible;
        let s = !0
          , n = null
          , a = !0;
        if (t.renderer.webglCreationFailed)
            n = "Failed to create WebGl context.",
            s = !1;
        else {
            const t = Array.from(this.loadingTexts);
            t.sort(((t,e)=>e.priority - t.priority));
            for (const e of t)
                if ((e.showInMainMenu || !i) && e.isLoading) {
                    s = e.shouldBounce,
                    n = e.getText();
                    break
                }
        }
        if (!n)
            switch (e.currentJoinState) {
            case "joinable":
                n = "Click to join";
                break;
            case "joined":
                n = "Click to play",
                i || (a = !1)
            }
        const o = t.gameManager.activeGame;
        o && o.gameEnded && o.getMyPlayer() && (a = !1),
        this.infoTextEl.textContent = n || "",
        this.infoTextEl.classList.toggle("scaleBounce", s),
        this.infoTextEl.classList.toggle("bottom", !i),
        this.infoTextEl.classList.toggle("hidden", !a)
    }
}
class Main {
    constructor() {
        this.thirdPartyEnabled = !0;
        const t = parseSearch();
        t.thirdParty && (this.thirdPartyEnabled = "false" != t.thirdParty),
        this.scene = new Scene,
        this.scene.autoUpdate = !1,
        DebugLine.setCurrentScene(this.scene),
        this.indexedDb = new IndexedDbUtil,
        this.settingsManager = new SettingsManager(this.indexedDb),
        this.mainInfoTextManager = new MainInfoTextManager,
        this.mainMenu = new MainMenu,
        this.adBanners = new AdBannerManager,
        this.dialogManager = new DialogManager,
        this.input = new InputManager,
        this.config = new ConfigManager,
        this.mapLoader = new MapLoader(this.config,this.config.mapsConfig),
        this.preferredMapManager = new PreferredMapManager(this.mapLoader,this.config.mapsConfig),
        this.gameManager = new GameManager,
        this.gameStatsTracker = new GameStatsTracker(this.indexedDb),
        this.cam = new CameraManager,
        this.materials = new MaterialsManager,
        this.hudIcons = new HudIconsManager,
        this.screenFlash = new ScreenFlashManager(this.scene,this.cam.cam),
        this.renderer = new Renderer,
        this.assets = new AssetsManager,
        this.skins = new SkinManager,
        this.skeletons = new SkeletonLoader,
        this.avatars = new AvatarsManager(this.renderer),
        this.classSelectionImageManager = new ClassSelectionImageManager,
        this.sfx = new SfxManager,
        this.network = new NetworkManager(this.gameManager),
        this.auth = new AuthManager,
        this.profileState = new ProfileStateManager(this.auth,this.indexedDb),
        this.shopState = new ShopStateManager(this.auth,this.indexedDb),
        this.quantcastManager = new QuantcastManager,
        this.poki = new PokiManager(this.thirdPartyEnabled),
        this.boundLoop = this.vsyncLoop.bind(this),
        this.prevNow = 0,
        this.now = 0,
        this.dt = 0,
        this.smoothDt = 0,
        this.useFakeNow = !1,
        this.fakeNow = 0,
        this.fastLoopCount = 1,
        this.frameCount = 0,
        this.frameCap = 1;
        const e = lsGet("frameCap");
        if (e && (this.frameCap = parseInt(e, 10)),
        this.maxDt = 100,
        this.env = "local",
        this.env = "production",
        "staging.narrow.one" == window.location.hostname && (this.env = "staging"),
        this.poki.isPokiBuild && document.referrer && document.referrer.includes("qa.po.ki") && (this.env = "staging"),
        "paintWorklet"in CSS) {
            const t = new URL(new URL("narrowCssWorklet-9a3a3043.js",import.meta.url).href,import.meta.url);
            CSS.paintWorklet.addModule(t.href)
        }
        this.settingsManager.onValueChange("uiScale", (t=>{
            document.body.style.zoom = String(t)
        }
        )),
        this.darkMedia = window.matchMedia("(prefers-color-scheme: dark)")
    }
    init() {
        this.settingsManager.init(),
        this.mainMenu.init(),
        this.input.init(),
        this.adBanners.init(),
        this.mapLoader.init(),
        this.config.init(),
        this.gameStatsTracker.loadStats(),
        this.materials.init(),
        this.gameManager.init(),
        this.cam.init(),
        this.renderer.init(),
        this.materials.screenFlashMat && this.screenFlash.setMaterial(this.materials.screenFlashMat),
        this.skins.init(),
        this.classSelectionImageManager.init(),
        this.sfx.init(),
        this.network.init(),
        this.auth.init(),
        this.profileState.init(),
        this.shopState.init(),
        this.quantcastManager.init(this.thirdPartyEnabled),
        this.poki.init(),
        window.requestAnimationFrame(this.boundLoop),
        this.settingsManager.onValueChange("theme", (()=>{
            this.updateTheme()
        }
        )),
        this.darkMedia.addEventListener("change", (()=>{
            this.updateTheme()
        }
        )),
        this.updateTheme(),
        installServiceWorker()
    }
    updateTheme() {
        const t = this.settingsManager.getValue("theme");
        let e = !1;
        "dark" == t ? e = !0 : "system" == t && (e = this.darkMedia.matches),
        document.documentElement.classList.toggle("theme-dark", e)
    }
    vsyncLoop() {
        if (this.frameCount++,
        this.frameCount % this.frameCap == 0) {
            for (let t = 0; t < this.fastLoopCount - 1; t++)
                this.loop();
            this.loop()
        }
        window.requestAnimationFrame(this.boundLoop)
    }
    loop() {
        let t = performance.now();
        this.useFakeNow && (t = this.fakeNow,
        this.fakeNow += 30),
        this.prevNow <= 0 && (this.prevNow = t);
        const e = t - this.prevNow;
        if (0 == e)
            return;
        const i = Math.min(e, this.maxDt);
        this.prevNow = t,
        this.now += i,
        t = this.now,
        this.dt = i,
        this.dt16 = this.dt / 16.6666,
        this.smoothDt = lerp(this.smoothDt, this.dt, .1),
        this.mainMenu.loop(t, i),
        this.input.loop(t, i),
        this.gameManager.loop(t, i),
        this.cam.loop(t, i),
        this.screenFlash.loop(t),
        DebugLine.loop(),
        this.renderer.loop(t, i),
        this.sfx.loop(t, i)
    }
}
globalThis.VERSION_TIMESTAMP = "000",
globalThis.DEBUG = !0,
globalThis.ROLLUP_BUILD = !1;
let main = null;
function init() {
    let t = "";
    if (window.Intl && Intl.RelativeTimeFormat) {
        const e = new Intl.RelativeTimeFormat
          , i = Date.now() / 1e3 - Number("1685095066");
        t = i < 60 ? e.format(-Math.floor(i), "second") : i < 3600 ? e.format(-Math.floor(i / 60), "minute") : i < 86400 ? e.format(-Math.floor(i / 60 / 60), "hour") : i < 31536e3 ? e.format(-Math.floor(i / 60 / 60 / 24), "day") : e.format(-Math.floor(i / 60 / 60 / 24 / 365), "year"),
        t = " (" + t + ")"
    }
    console.log("loading v1685095066" + t),
    main = new Main,
    main.init()
}
function getMainInstance() {
    if (!main)
        throw new Error("Main instance is not initialized");
    return main
}
const sheet$c = new CSSStyleSheet;
sheet$c.replaceSync("body, html {\n\t/* Setting overflow to hidden prevents the page from being scrolled by the user.\n\tBut scripts like scrollIntoView() can still cause the page to be scrolled.\n\tTry fixing the element that causet the page to get scrollable rather than setting\n\tthe body to overflow: hidden */\n\t/* overflow: hidden; */\n\tcolor: var(--default-text-color);\n\t--game-ui-state: normal;\n}\n\n.allow-select {\n\tuser-select: text;\n\t-webkit-user-select: text;\n}\n\n@property --wrinkled-paper-color {\n\tsyntax: '<color>';\n\tinherits: false;\n\tinitial-value: blue;\n}\n\n.fullScreen.safeArea{\n\tleft: 0;\n\tright: 0;\n\ttop: 0;\n\tbottom: 0;\n\tleft: env(safe-area-inset-left);\n\tright: env(safe-area-inset-right);\n\ttop: env(safe-area-inset-top);\n\tbottom: env(safe-area-inset-bottom);\n\twidth: initial;\n\theight: initial;\n}\n\n.whiteBigText a {\n\tcolor: white;\n\t-webkit-text-stroke: 1px black;\n\ttext-decoration: none;\n}\n\n#loadingImageContainer {\n\tz-index: 1;\n}\n\n.wrinkledPaper,\ninput.dialog-range-input[type=range],\ninput.dialog-range-input[type=range]::-webkit-slider-thumb {\n\t--wrinkled-paper-wrinkle-size: 6px;\n\t--wrinkled-paper-color: var(--default-ui-bg-color);\n\t--wrinkled-paper-border-segments: 0.016;\n\t--wrinkled-paper-tear-count-min: 0.001;\n\t--wrinkled-paper-tear-count-max: 0.003;\n\t--wrinkled-paper-tear-depth-min: 5px;\n\t--wrinkled-paper-tear-depth-max: 15px;\n\t--wrinkled-paper-tear-width-min: 10px;\n\t--wrinkled-paper-tear-width-max: 20px;\n\t--wrinkled-paper-tear-angle-offset-min: 0.7;\n\t--wrinkled-paper-tear-angle-offset-max: 1.1;\n}\n\n.wrinkledLine {\n\t--wrinkled-line-color: var(--default-text-color);\n\t--wrinkled-line-width: 1px;\n\t--wrinkled-line-wrinkle-size: 6px;\n\t--wrinkled-line-segments: 0.016;\n}\n\n.dialogCurtain{\n\tbackground: rgba(0,0,0,0.3);\n}\n.dialogCurtain.hidden{\n\tvisibility: hidden;\n\topacity: 0;\n}\n\n.dialogWrapper, .dialog {\n\tdisplay: block;\n\tposition: absolute;\n\tmax-width: 100%;\n\tmin-height: 150px;\n\tmax-height: 100%;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\t-webkit-transform: translate3d(-50%,-50%,0);\n\ttransition: transform 0.2s, opacity 0.2s, visibility 0.2s;\n\ttransition-timing-function: cubic-bezier(0.3, -0.8, 0.7, 1.8);\n}\n\n.dialogWrapper > .dialog {\n\tposition: relative;\n\tleft: 0;\n\ttop: 0;\n\ttransform: initial;\n\t-webkit-transform: initial;\n}\n\n.dialog{\n\tfilter: var(--default-drop-shadow);\n\tpadding: 30px;\n\tbox-sizing: border-box;\n\twidth: fit-content;\n}\n.dialog.hidden, .dialogWrapper.hidden{\n\topacity: 0;\n\ttransform: translate(-50%, -50%) scale(0.95);\n\tvisibility: hidden;\n}\n.dialog.topCenter{\n\ttop: 10px;\n\ttransform: translate(-50%, 0);\n}\n\n.dialog-title-header-container {\n\tdisplay: flex;\n\tgap: 20px;\n}\n\nh2.dialogTitle{\n\tmargin: 0px 0px 20px 0px;\n\tfont-size: 42px;\n}\n\nh3.dialogTitle{\n\tmargin: 0px 0px 10px 0px;\n\tfont-size: 30px;\n}\n\n.dialogButtonsContainer {\n\tmargin-top: 10px;\n\ttext-align: center;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n\n.dialogButtonsContainer.vertical {\n\tflex-direction: column;\n\tmax-width: 300px;\n\tmargin: auto;\n}\n\n.dialog-art-wrapper {\n\twidth: 100%;\n\tmargin: auto;\n}\n\n.dialog-art {\n\twidth: 0;\n\tmin-width: 100%;\n\theight: 100%;\n\tmax-height: 50vh;\n\tobject-fit: contain;\n}\n\n.dialog-art-buttons-container {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n@media (max-height: 700px) {\n\t.dialog-art-buttons-container.contains-art {\n\t\tflex-direction: row;\n\t}\n}\n@media (max-height: 700px) {\n\t.dialog-art-buttons-container {\n\t\twidth: 600px;\n\t}\n}\n@media (max-height: 700px) and (max-width: 700px) {\n\t.dialog-art-wrapper {\n\t\tdisplay: none;\n\t}\n\t.dialog-art-buttons-container {\n\t\twidth: initial;\n\t}\n}\n\n.currency-button {\n\tpadding: 0px 30px;\n}\n\n.currency-container {\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 18px;\n\tjustify-content: center;\n}\n\n.coin-icon {\n\twidth: 20px;\n\theight: 20px;\n\tdisplay: inline-block;\n\tbackground-image: url(static/img/coin.svg);\n\tmargin-right: 5px;\n}\n\n.coin-count-text {\n\tcolor: #fbd413;\n\tfont-weight: 900;\n\t-webkit-text-stroke: 2px #766200;\n\tfilter: drop-shadow(0px 1px #766200);\n\tposition: relative;\n\tletter-spacing: 1px;\n\tfont-size: 20pt;\n}\n\n.coin-count-text::after {\n\tcontent: attr(data-text-content);\n\t-webkit-text-stroke: 0;\n\tfilter: none;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0px;\n}\n\n.dialogTabs {\n\tposition: absolute;\n\ttop: -50px;\n\tleft: 5px;\n\tpointer-events: none;\n}\n\n.dialogTab {\n\tdisplay: inline-block;\n\tpointer-events: auto;\n\ttransition: transform 0.1s;\n\theight: 80px;\n}\n\n.dialogTabSpacer {\n\tdisplay: inline-block;\n\twidth: 20px;\n}\n\n.dialogTab.back {\n\t--wrinkled-paper-color: #d1d1d1;\n}\n\n.dialogTab.front:not(.active), .dialogTab.back.active {\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.dialogTab.back:not(.active) {\n\ttransform: translateY(4px);\n\tcursor: pointer;\n}\n\n.dialogTab:not(.active):hover {\n\ttransform: translateY(2px);\n}\n\n.dialogTabIcon {\n\twidth: 60px;\n\theight: 60px;\n\tbackground-size: contain;\n\tbackground-repeat: no-repeat;\n}\n\n.skipDialogText {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 50%;\n\ttransform: translate(-50%, 25px);\n\tcolor: #dddddd;\n\ttext-shadow: 1px 1px #00000073;\n\tfont-size: 16px;\n\tcursor: pointer;\n\twhite-space: nowrap;\n}\n\n.toggle-menu-button {\n\tpadding: 10px;\n\tpadding-top: 30px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 110;\n}\n\n.main-menu-top-left {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmax-height: 100vh;\n\tpointer-events: none;\n}\n\n.menu-buttons-container {\n\tpointer-events: auto;\n}\n\n.main-menu-corner-profile {\n\twidth: 300px;\n\tdisplay: flex;\n\tgap: 10px;\n\tmargin: 10px;\n}\n\n.main-menu-username {\n\tfont-size: 30px;\n}\n\n.main-menu-username:not(.blueNight) {\n\tfont-size: 25px;\n\tfont-weight: bold;\n}\n\n.menu-buttons-container {\n\tmax-width: fit-content;\n\toverflow-y: auto;\n\tmax-height: 100vh;\n}\n.menu-buttons-container.hidden {\n\tdisplay: none;\n}\n.menu-buttons-container::-webkit-scrollbar {\n\twidth: 0px;\n}\n\n.main-menu-button.exit-button {\n\t--wrinkled-paper-color: #6e0000;\n\t--wrinkled-paper-border-color: #3e0000;\n\t--icon-filter: invert(100%);\n}\n\n.main-menu-promo-banner-container {\n\ttop: 20px;\n\tright: 20px;\n\tposition: absolute;\n\twidth: 320px;\n\theight: 210px;\n\tfilter: var(--default-drop-shadow);\n}\n.main-menu-promo-banner-container.hidden {\n\tdisplay: none;\n}\n\n@media (max-width: 1200px), (max-height: 700px) {\n\t.main-menu-promo-banner-container {\n\t\twidth: 220px;\n\t\theight: 140px;\n\t}\n}\n\n@media (max-width: 500px), (max-height: 420px) {\n\t.main-menu-promo-banner-container {\n\t\tdisplay: none;\n\t}\n}\n\n.main-menu-promo-banner {\n\twidth: 100%;\n\theight: 100%;\n\tbackground: center / cover, var(--default-ui-bg-color);\n\t--wrinkled-paper-wrinkle-size: 8px;\n\t--wrinkled-paper-tear-count-min: 0.003;\n\t--wrinkled-paper-tear-count-max: 0.004;\n\tcursor: pointer;\n}\n.main-menu-promo-banner:hover {\n\tfilter: brightness(0.9);\n}\n.main-menu-promo-banner:active {\n\tfilter: brightness(0.85);\n}\n\n#mainMenu > .bottom-texts {\n\tposition: absolute;\n\tbottom: 0;\n\tright: 0;\n\tfont-size: 14pt;\n\tlist-style-type: none;\n\tdisplay: flex;\n\tgap: 10px;\n\tmargin: 3px;\n\tpadding: 0px;\n}\n\n.gameAd{\n\tposition: absolute;\n\tbottom: 0;\n\tmargin-bottom: 20px;\n\tleft: 50%;\n\ttransform: translate(-50%);\n\tbackground: #0000004f;\n\tz-index: 20;\n}\n.gameAd.desktop{\n\twidth: 728px;\n\theight: 90px;\n}\n.gameAd.mobile{\n\twidth: 320px;\n\theight: 50px;\n\tdisplay: none;\n}\n@media(max-width: 1220px){\n\t.gameAd.desktop{\n\t\tdisplay: none;\n\t}\n\t.gameAd.mobile{\n\t\tdisplay: inherit;\n\t}\n}\n.gameAd.hidden{\n\tdisplay: none;\n}\n\n.shake-anim {\n\tanimation: 2.5s linear infinite shake;\n}\n\n@keyframes shake {\n\t0% { transform: rotate(0deg); }\n\t4% { transform: rotate(4deg); }\n\t8% { transform: rotate(-3deg); }\n\t12% { transform: rotate(2deg); }\n\t16% { transform: rotate(1deg); }\n\t20% { transform: rotate(0deg); }\n}\n\n.crosshair-container {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\tz-index: 100;\n\ttransform: translate(-50%, -50%);\n\tpointer-events: none;\n\t--line-color: white;\n\t--outline-color: black;\n}\n.crosshair-line {\n\tposition: absolute;\n\twidth: 15px;\n\theight: 2px;\n\tbackground: var(--line-color);\n\tborder: 2px solid var(--outline-color);\n\tborder-radius: 10px;\n\ttransform-origin: left;\n\twill-change: transform;\n}\n\n.flagReturnProgressContainer {\n\tposition: absolute;\n\ttransform: translate(-50%, -50%);\n\ttransition: opacity 0.2s;\n}\n.flagReturnProgressContainer.hidden{\n\topacity: 0;\n}\n.flagReturnProgressPath {\n\tfill: none;\n\tstroke-width: 10px;\n\tstroke-linecap: round;\n}\n\n.flagScoreContainer{\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\tz-index: 100;\n\tmargin: 30px;\n\tfilter: var(--default-drop-shadow);\n\tpointer-events: none;\n}\n\n.flagScoreItem{\n\tmargin: 3px;\n\tdisplay: flex;\n}\n\n.flagScoreIcon{\n\theight: 50px;\n\twidth: 50px;\n\ttransform: translateY(-5px);\n}\n\n.flagScorePointEl{\n\twidth: 40px;\n\theight: 40px;\n\talign-self: center;\n}\n\n.mainInfoText.bottom{\n\tfont-size: 45px;\n\tleft: 0;\n\ttop: initial;\n\tbottom: 25px;\n}\n.mainInfoText.hidden{\n\tdisplay: none;\n}\n\n.notificationIconsUiContainer{\n\twidth: 200px;\n\theight: 200px;\n\tpointer-events: none;\n\tposition: absolute;\n\tz-index: 1;\n}\n\n.notificationIconsUiContainer.topleft{\n\tleft: 0;\n\ttop: 80px;\n\ttransform-origin: top left;\n}\n\n.notificationIconsUiContainer.centerbig{\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 50vw;\n\theight: min(50vw, 100vh);\n\ttransform: translate(-50%, -50%);\n}\n\n.notificationIconsUiContainer.crosshair{\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 200px;\n\theight: 200px;\n\ttransform: translate(-50%, -50%) translateY(-140px);\n}\n\n.notificationIcon{\n\tfilter: var(--default-drop-shadow);\n\tanimation: 1s notificationIconFade 6s both, 0.2s notificationIconPop;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n}\n\n.crosshair > .notificationIcon{\n\tanimation: 1s notificationIconFade 0.5s both, 0.2s notificationIconPop;\n}\n\n@keyframes notificationIconPop{\n\t0%{\n\t\ttransform: scale(1);\n\t}\n\t50%{\n\t\ttransform: scale(1.2);\n\t}\n\t100%{\n\t\ttransform: scale(1);\n\t}\n}\n@keyframes notificationIconFade{\n\t0%{\n\t\topacity: 1;\n\t}\n\n\t100%{\n\t\topacity: 0;\n\t}\n}\n\n.score-offset-notifications-container {\n\tpointer-events: none;\n\toverflow: hidden;\n}\n\n.score-offset-notifications-list {\n\tfont-size: 30px;\n\ttext-align: center;\n\ttop: 20%;\n\tposition: absolute;\n\tz-index: 1;\n\twidth: 100%;\n}\n\n.scoreOffsetNotification {\n\tposition: absolute;\n\twidth: 100%;\n\ttransition: transform 0.5s;\n}\n\n.scoreOffsetNotificationScore {\n\tcolor: #b0e9b0;\n}\n\n.touchListener {\n\tz-index: 1;\n}\n.touchListener.focus {\n\tcursor: none;\n}\n\n.touchInputWhiteBorder{\n\tbackground: #00000047;\n\tborder-radius: 150px;\n\tbox-sizing: border-box;\n\tborder: solid white;\n\tpointer-events: none;\n}\n\n.touchInputJoyStickContainer{\n\twidth: 150px;\n\theight: 150px;\n\tposition: absolute;\n\ttransition: opacity 0.3s;\n\tz-index: 1;\n}\n\n.touchInputJoyStick{\n\twidth: 60px;\n\theight: 60px;\n\tleft: 50%;\n\ttop: 50%;\n\tbackground: white;\n\tborder-radius: 60px;\n\tposition: absolute;\n\ttransform: translate(-50%, -50%);\n}\n\n.touchInputButton{\n\tposition: absolute;\n\tz-index: 1;\n}\n.touchInputButton.hidden {\n\tdisplay: none;\n}\n\n.touchInputButton.touching{\n\tbackground: #ffffff47;\n}\n\n@media(max-width: 700px), (max-height: 450px){\n\t.flagScoreContainer{\n\t\tmargin: 10px;\n\t\ttransform: scale(0.5);\n\t\ttransform-origin: top right;\n\t}\n\n\t.toggle-menu-button {\n\t\tpadding-top: 10px;\n\t}\n\n\t.notificationIconsUiContainer{\n\t\ttransform: scale(0.5);\n\t}\n\n\t.notificationIconsUiContainer.topleft{\n\t\ttop: 40px;\n\t}\n\n\tbody {\n\t\t--game-ui-state: small;\n\t}\n}\n\n.screenFlash{\n\tpointer-events: none;\n\tbackground: red;\n\topacity: 0;\n}\n\n.playersListTeamWonTitle{\n\ttext-align: center;\n\tfont-size: 34px;\n\tmargin: 0;\n}\n\n.playersListContainer{\n\toverflow: auto;\n\tmax-height: 600px;\n\tdisplay: flex;\n\tgap: 20px;\n\talign-items: flex-start;\n}\n\n@media(max-width: 1000px){\n\t.playersListContainer{\n\t\tflex-direction: column;\n\t}\n}\n\n.playersListTeam{\n\t--wrinkled-paper-wrinkle-size: 4px;\n\twidth: 550px;\n\t--wrinkled-paper-color: var(--team-bg-color-light);\n}\nhtml.theme-dark .playersListTeam {\n\t--wrinkled-paper-color: var(--team-bg-color-dark);\n}\n\n.itemsTable{\n\tborder-collapse: collapse;\n}\n\n.playersListHead{\n\tcolor: white;\n}\n\n.itemsTable > tbody > tr:nth-child(even){\n\t--wrinkled-paper-wrinkle-size: 2px;\n\t--wrinkled-paper-color: var(--items-table-odd-row-color);\n}\n\n.itemsTable > tbody > tr > td:first-child{\n\tpadding-left: 10px;\n}\n.itemsTable > tbody > tr > td:last-child{\n\tpadding-right: 10px;\n}\n\n.itemsTable > tbody > tr > td, .playersListHead > th{\n\tpadding: 10px 0px;\n}\n\n.player-avatar {\n\tmin-width: 40px;\n\tmin-height: 40px;\n\twidth: 40px;\n\theight: 40px;\n\tbackground-size: contain;\n\tbackground-repeat: no-repeat;\n}\n\n.players-list-label{\n\tcolor: white;\n\tbackground: #909090;\n\tpadding: 2px 3px;\n\tfont-size: 13px;\n\tmargin-left: 7px;\n\tborder-radius: 3px;\n}\n\n.players-list-item-username {\n\tdisplay: flex;\n\tmax-width: 200px;\n\talign-items: center;\n}\n\n.player-list-username {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n}\n\n.player-name-verified-icon {\n\tmargin-left: 5px;\n\twidth: 20px;\n\theight: 20px;\n\tbackground-repeat: no-repeat;\n\tbackground-image: url(static/img/menuUI/verified.svg);\n\tfilter: var(--icon-filter)\n}\n\n.playersListItem > td:first-child {\n\tpadding: 0px;\n}\n\n.playersListItemScore{\n\ttext-align: center;\n}\n\n.gameoverStatsContainer {\n\t--team-bg-color-light: var(--items-table-bg-color);\n\t--team-bg-color-dark: var(--items-table-bg-color);\n\twidth: fit-content;\n\tmargin: auto;\n\toverflow: auto;\n\t--wrinkled-paper-color: var(--team-bg-color-light);\n}\nhtml.theme-dark .gameoverStatsContainer {\n\t--wrinkled-paper-color: var(--team-bg-color-dark);\n}\n\n.gameOverStatsTable {\n\twidth: 240px;\n}\n\n.game-over-stats-coins-container {\n\tdisplay: flex;\n\tgap: 10px;\n\tjustify-content: center;\n\tmargin-top: 20px;\n}\n\n.totalScoreRow {\n\tfont-weight: bold;\n}\n\n.ownedCoinsContainer {\n\tposition: absolute;\n\ttop: -20px;\n\tright: -20px;\n\tpadding: 10px;\n\tfilter: var(--default-drop-shadow);\n}\n\n.weaponSelectionDialog{\n\tbottom: 130px;\n\ttop: inherit;\n\ttransform: translate(-50%, 0px);\n\ttransform-origin: bottom;\n}\n.weaponSelectionDialog.hidden{\n\ttransform: translate(-50%, 0px) scale(0.95);\n}\n\n@media(max-width: 1220px){\n\t.weaponSelectionDialog{\n\t\tbottom: 90px;\n\t\ttransform: translate(-50%, 0px) scale(0.5);\n\t}\n\t.weaponSelectionDialog.hidden{\n\t\ttransform: translate(-50%, 0px) scale(0.45);\n\t}\n}\n.weaponSelectionContainer{\n\tdisplay: flex;\n\tgap: 10px;\n}\n\n.weaponSelectionItem{\n\ttransition: transform 0.2s;\n\ttransition-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.8);\n\t--wrinkled-paper-color: #d8d8d8;\n\t--wrinkled-paper-border-segments: 0.02;\n\t--wrinkled-paper-banner-color: #0000001c;\n\t--wrinkled-paper-banner-size: 17px;\n\t--wrinkled-paper-border-size: 8px;\n\t--wrinkled-paper-border-color: #0000002b;\n\tposition: relative;\n\tfilter: var(--default-drop-shadow);\n}\n\n.weaponSelectionItem.selected{\n\ttransform: scale(1.1);\n\t--wrinkled-paper-color: #bfbfbf;\n}\n.weaponSelectionItem:not(.selected){\n\tfilter: brightness(0.8);\n}\n.weaponSelectionItem:not(.selected):hover{\n\tfilter: brightness(0.9);\n}\n\n.weaponSelectionItemKeyNumber{\n\tposition: absolute;\n\tmargin: 9px;\n\tcolor: white;\n\ttop: 0;\n\tright: 0;\n}\n\n.weaponSelectionItemIcon{\n\twidth: 80px;\n\theight: 80px;\n\tmargin: 5px;\n}\n\n.text-with-submit-form {\n\tdisplay: flex;\n\tgap: 5px;\n\twidth: 100%;\n\tpadding: 4px 10px;\n\tbox-sizing: border-box;\n}\n\n.text-with-submit-form > * {\n\tmargin-left: 0;\n\tmargin-right: 0;\n}\n\n.text-with-submit-form > button {\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n}\n\n.skin-downloader-dialog-content {\n\tmax-width: 600px;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n}\n\n.skin-downloader-dialog-controls {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.skin-downloader-dialog-controls > * {\n\theight: 30px;\n}\n\n.skin-downloader-size-input {\n\twidth: 50px;\n}\n\n.skin-downloader-download-container {\n\tpadding: 10px;\n\talign-self: center;\n}\n\n.downloadable-skin-preview {\n\twidth: 250px;\n\theight: 250px;\n\tbackground-size: contain;\n\tbackground-repeat: no-repeat;\n\tflex-shrink: 0;\n}\n\n.shop-paged-view-container {\n\twidth: 340px;\n\theight: 300px;\n\tposition: relative;\n\toverflow: hidden;\n}\n");
const sheet$b = new CSSStyleSheet;
sheet$b.replaceSync("html {\n\t--default-text-color: black;\n\t--disabled-text-color: #5f5f5f;\n\t--default-ui-bg-color: white;\n\t--icon-filter: none;\n\t--default-drop-shadow: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));\n\t--default-wrinkled-paper-border-color: #353535;\n\t/** Used for buttons that appear directly on top of the game rather\n\tthan in a dialog. */\n\t--button-on-clear-bg-wrinkled-paper-border-color: var(--default-wrinkled-paper-border-color);\n\t--disabled-wrinkled-paper-border-color: #919191;\n\t--default-wrinkled-paper-top-color-extra: #e2e2e2;\n\t--shop-item-background-color: #f1f1f1;\n\t--shop-item-background-color-hover: #d8d8d8;\n\t--shop-item-background-color-active: #e5e5e5;\n\t--shop-item-highlight-color: #fdc570;\n\t--blue-highlight-color: #0c5fcc;\n\t--items-table-bg-color: #cdcdcd;\n\t--items-table-odd-row-color: #ffffff6b;\n}\n\nhtml.theme-dark {\n\t--default-text-color: white;\n\t--disabled-text-color: #b6b6b6;\n\t--default-ui-bg-color: #454545;\n\t--icon-filter: invert(100%);\n\t--default-wrinkled-paper-border-color: #a5a5a5;\n\t--button-on-clear-bg-wrinkled-paper-border-color: #242424;\n\t--disabled-wrinkled-paper-border-color: #646464;\n\t--default-wrinkled-paper-top-color-extra: #606060;\n\t--shop-item-background-color: #646464;\n\t--shop-item-background-color-hover: #585858;\n\t--shop-item-background-color-active: #505050;\n\t--shop-item-highlight-color: #9c6f2d;\n\t--blue-highlight-color: #3f92ff;\n\t--items-table-bg-color: #6d6d6d;\n\t--items-table-odd-row-color: #0000002b;\n}\n");
const sheet$a = new CSSStyleSheet;
sheet$a.replaceSync('.dialog-button,\n.icon-button,\n.dialog-color-input {\n\tborder: none;\n\tappearance: none;\n}\n\n.dialog-button,\n.main-menu-button {\n\t-webkit-tap-highlight-color: transparent;\n}\n\n.dialog-button{\n\tpadding: 7px 30px;\n\tmargin: 4px 10px;\n\tfont-size: 24px;\n\theight: 38px;\n\tcolor: var(--default-text-color);\n\tvertical-align: middle;\n\twhite-space: nowrap;\n\t--wrinkled-paper-border-size: 3;\n\t--wrinkled-paper-border-size-bottom: 6;\n\t--wrinkled-paper-border-color: var(--default-wrinkled-paper-border-color);\n\t--wrinkled-paper-seed: 70;\n\t--wrinkled-paper-wrinkle-size: 2px;\n\t--wrinkled-paper-border-segments: 0.02;\n\t--wrinkled-paper-tear-count-min: 0;\n\t--wrinkled-paper-tear-count-max: 0;\n}\n.dialog-button:hover:not(:disabled){\n\tfilter: brightness(0.9);\n}\n.dialog-button:active:not(:disabled),\n.dialog-checkbox-input:active:not(:disabled),\n.dialog-toggle-input:active:not(:disabled),\n.dialog-color-input:active {\n\tfilter: brightness(0.8);\n}\n\n.dialog-button:not(:disabled){\n\tcursor: pointer;\n}\n\n.dialog-button:disabled {\n\tcolor: #959595;\n}\n\n.dialog-button:disabled > .currency-container, .dialog-button:disabled > .dialog-button-icon {\n\topacity: 0.5;\n}\n\n.dialog-button-icon {\n\twidth: 20px;\n\theight: 20px;\n\tdisplay: inline-block;\n\tbackground-size: contain;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tmargin-right: 10px;\n\tvertical-align: middle;\n}\n.dialog-button-icon:not(.no-dark-mode-invert) {\n\tfilter: var(--icon-filter);\n}\n\n.icon-button {\n\tcursor: pointer;\n\tbackground: transparent;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n}\n\n.icon-button:hover {\n\topacity: 0.7;\n}\n.icon-button:active {\n\topacity: 0.6;\n}\n\n.header-button {\n\tpadding: 0;\n}\n\n.icon-button > .dialog-button-icon,\n.header-button > .dialog-button-icon {\n\twidth: 20px;\n\theight: 20px;\n\tmargin: 3px;\n}\n\n.header-back-button > .dialog-button-icon {\n\twidth: 30px;\n}\n\n\n.main-menu-button-container {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.main-menu-button{\n\tborder: none;\n\twidth: 70px;\n\theight: 70px;\n\tcursor: pointer;\n\tmargin: 5px;\n\tpadding: 0;\n\t--wrinkled-paper-border-segments: 0.04;\n\t--wrinkled-paper-wrinkle-size: 5px;\n\t--wrinkled-paper-tear-count-min: 0.003;\n\t--wrinkled-paper-tear-count-max: 0.004;\n\t--wrinkled-paper-border-size: 3;\n\t--wrinkled-paper-border-size-bottom: 6;\n\t--wrinkled-paper-border-color: var(--button-on-clear-bg-wrinkled-paper-border-color);\n\t--wrinkled-paper-tear-count-min: 0;\n\t--wrinkled-paper-tear-count-max: 0;\n\tfilter: var(--default-drop-shadow);\n}\n.main-menu-button:hover{\n\tfilter: var(--default-drop-shadow) brightness(0.9);\n}\n.main-menu-button:active{\n\tfilter: var(--default-drop-shadow) brightness(0.8);\n}\n\n.main-menu-button-text {\n\tcolor: white;\n\tfont-size: 30px;\n}\n\n.main-menu-promo-button {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 50%;\n\ttransform: translate(-50%, 50%);\n\tmargin: 0;\n\t--wrinkled-paper-border-color: var(--button-on-clear-bg-wrinkled-paper-border-color);\n}\n\n.buttonImage{\n\twidth: 100%;\n\theight: 100%;\n\tbackground-size: contain;\n\tbackground-repeat: no-repeat;\n\tbackground-position: center;\n}\n.buttonImage:not(.update-icon) {\n\tfilter: var(--icon-filter);\n}\n.update-icon {\n\tfilter: invert(38%) sepia(99%) saturate(839%) hue-rotate(86deg) brightness(100%) contrast(94%);\n}\n\n.dialog-text-input,\n.dialog-select-wrapper,\n.dialog-checkbox-input,\n.dialog-toggle-input,\ninput.dialog-range-input[type=range],\n.dialog-color-input {\n\t--wrinkled-paper-border-size: 3;\n\t--wrinkled-paper-border-size-bottom: 4;\n\t--wrinkled-paper-border-color: var(--default-wrinkled-paper-border-color);\n\t--wrinkled-paper-seed: 70;\n\t--wrinkled-paper-wrinkle-size: 2px;\n\t--wrinkled-paper-border-segments: 0.02;\n\t--wrinkled-paper-border-color-top-extra: var(--default-wrinkled-paper-top-color-extra);\n\t--wrinkled-paper-border-size-top-extra: 10;\n\t--wrinkled-paper-tear-count-min: 0;\n\t--wrinkled-paper-tear-count-max: 0;\n}\n.dialog-checkbox-input:focus-visible,\n.dialog-toggle-input:focus-visible,\n.dialog-text-input:focus-visible,\n.dialog-button:focus-visible,\n.main-menu-button:focus-visible,\n.dialog-select-wrapper:has(> select:focus-visible),\n.dialog-color-input:focus-visible,\ninput.dialog-range-input[type=range]:focus-visible::-webkit-slider-thumb {\n\toutline: none;\n\t--wrinkled-paper-border-color: var(--blue-highlight-color);\n\t--wrinkled-paper-border-size: 5;\n\t--wrinkled-paper-border-size-bottom: 7;\n}\n.icon-button:focus-visible {\n\toutline: var(--blue-highlight-color) auto 1px;\n}\n\ninput.dialog-range-input[type=range]:focus-visible {\n\toutline: none;\n}\n\n.dialog-button:disabled,\n.dialog-text-input:disabled,\n.dialog-checkbox-input:disabled,\n.dialog-toggle-input:disabled {\n\t--wrinkled-paper-border-color: var(--disabled-wrinkled-paper-border-color);\n\tcolor: var(--disabled-text-color);\n}\n\n.dialog-text-input {\n\tpadding: 7px;\n\tmargin: 4px 10px;\n\tfont-size: 24px;\n\theight: 38px;\n\tborder: none;\n\tbox-sizing: border-box;\n\tcolor: var(--default-text-color);\n}\n\n.dialog-checkbox-input,\n.dialog-toggle-input,\n.dialog-range-input {\n\tappearance: none;\n\twidth: 30px;\n\theight: 30px;\n\tplace-content: center;\n}\n.dialog-checkbox-input,\n.dialog-toggle-input {\n\tdisplay: grid;\n}\n.dialog-toggle-input {\n\twidth: 45px;\n}\n.dialog-checkbox-input:checked::before {\n\tcontent: "";\n\twidth: 20px;\n\theight: 20px;\n\tbackground-image: url(static/img/menuUI/check.svg);\n\tbackground-size: contain;\n\tfilter: var(--icon-filter);\n}\n.dialog-checkbox-input:checked:disabled::before,\n.dialog-toggle-input:checked:disabled::before {\n\topacity: 0.5;\n}\n.dialog-toggle-input {\n\t--wrinkled-paper-extra-box-color: white;\n\t--wrinkled-paper-extra-box-size: 10px;\n\t--wrinkled-paper-extra-box-border-color: var(--default-wrinkled-paper-border-color);\n\t--wrinkled-paper-extra-box-border-size: 2;\n\t--wrinkled-paper-extra-box-side: left;\n}\n.dialog-toggle-input:checked {\n\t--wrinkled-paper-extra-box-side: right;\n}\n\ninput.dialog-range-input[type=range]::-webkit-slider-thumb {\n\tappearance: none;\n\twidth: 10px;\n\theight: 30px;\n\t--wrinkled-paper-color: white;\n\t--wrinkled-paper-wrinkle-size: 2px;\n\t--wrinkled-paper-border-size-top-extra: 0;\n}\n\n.dialog-select-wrapper {\n\tposition: relative;\n}\n.dialog-select-wrapper::after {\n\tcontent: "";\n\tposition: absolute;\n\twidth: 20px;\n\theight: 20px;\n\ttop: 50%;\n\ttransform: translateY(-50%);\n\tright: 3px;\tbackground: url(static/img/downArrowSmall.svg) no-repeat right center;\n\tfilter: var(--icon-filter);\n}\n\n.dialog-select-input {\n\tcolor: var(--default-text-color);\n\tappearance: none;\n\toutline: none;\n\tborder: none;\n\tpadding: 8px 25px 8px 8px;\n\tfont-size: 14pt;\n\tbackground-color: transparent;\n}\n.dialog-select-input > option {\n\tbackground-color: var(--default-ui-bg-color);\n}\n\n.dialog-color-input::-webkit-color-swatch {\n\tborder: none;\n}\n');
const sheet$9 = new CSSStyleSheet;
sheet$9.replaceSync('.paged-view-page {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\ttransition: opacity 0.3s, transform 0.3s;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n.paged-view-page.hidden {\n\topacity: 0;\n\tpointer-events: none;\n}\n.paged-view-page.hiddenleft {\n\ttransform: translateX(-20%);\n}\n\n.paged-view-page.hiddenright {\n\ttransform: translateX(20%);\n}\n\n.paged-view-page-header {\n\tdisplay: grid;\n\twidth: 100%;\n\tgrid-template-columns: 40px 1fr auto;\n\tgrid-template-areas: "back-button header-title header-corner";\n}\n.paged-view-page-header > * {\n\talign-self: center;\n\tjustify-self: center;\n}\n\n.paged-view-page-back-button {\n\twidth: 30px;\n\theight: 30px;\n\tbackground-image: url(static/img/arrow.svg);\n}\n\n.paged-view-page-header-title {\n\tgrid-area: header-title;\n\tfont-size: 24pt;\n\tmargin: 15px;\n}\n\n.paged-view-page-header-corner {\n\tgrid-area: header-corner;\n}\n\n.paged-view-page-header-line {\n\theight: 20px;\n\twidth: 100%;\n}\n\n.paged-view-page-items-list {\n\tdisplay: flex;\n\tflex-direction: column;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\tmax-width: 300px;\n}\n\n.paged-view-page-custom-subpage,\n.paged-view-page-items-list {\n\twidth: 100%;\n\theight: 100%;\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n}\n');
const sheet$8 = new CSSStyleSheet;
sheet$8.replaceSync(".maps-container {\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\trow-gap: 40px;\n\tcolumn-gap: 20px;\n\twidth: 80vw;\n\tmax-width: 660px;\n\toverflow-y: scroll;\n\tmax-height: 80vh;\n}\n\n.map-item {\n\twidth: 200px;\n\tposition: relative;\n}\n\n.map-item-title {\n\tfont-size: 30pt;\n\tmargin: 0;\n\tmargin-bottom: 5px;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n}\n\n.map-item-thumb {\n\twidth: 200px;\n\theight: 100px;\n\tbackground: center / cover, white;\n\t--wrinkled-paper-wrinkle-size: 8px;\n\t--wrinkled-paper-tear-count-min: 0.003;\n\t--wrinkled-paper-tear-count-max: 0.004;\n\tfilter: var(--default-drop-shadow);\n}\n\n.map-item-join-button {\n\tposition: absolute;\n\tleft: 50%;\n\tbottom: 0;\n\ttransform: translate(-50%, 50%);\n\tmargin: 0;\n}\n");
const sheet$7 = new CSSStyleSheet;
sheet$7.replaceSync(".settings-list {\n\toverflow: auto;\n\tmax-height: min(250px, 40vh);\n}\n\n.settings-group-header {\n\tposition: sticky;\n\ttop: -5px;\n\tmargin: 0;\n\tbackground: var(--default-ui-bg-color);\n\tpadding-top: 5px;\n\tpadding-bottom: 10px;\n}\n\n.settings-item {\n\tdisplay: flex;\n\tmargin-bottom: 6px;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tjustify-content: left;\n}\n.settings-item-text {\n\tdisplay: inline;\n\tflex-shrink: 0;\n\twidth: 200px;\n}\n.settings-item-slider {\n\tdisplay: inline-flex;\n\twidth: 220px;\n\tflex-shrink: 0;\n\talign-items: center;\n}\n.settings-item-slider > input {\n\twidth: 170px;\n}\n.settings-item-slider-value {\n\tdisplay: inline-block;\n\twidth: 40px;\n\ttext-align: right;\n}\n");
const sheet$6 = new CSSStyleSheet;
sheet$6.replaceSync(".shopDialogContent{\n\tdisplay: flex;\n\talign-items: stretch;\n\tmax-width: 80vw;\n\twidth: max-content;\n\tgap: 10px;\n}\n\nh2.shop-presets-title {\n\tmargin: 0;\n}\n\n.shop-skin-selection-list {\n\tdisplay: flex;\n\toverflow-x: scroll;\n\tmax-width: 700px;\n\tscroll-behavior: smooth;\n}\n\n@media (min-height: 650px) and (min-width: 800px) {\n\t.shop-class-selection-list {\n\t\toverflow-x: initial;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: center;\n\t\twidth: 700px;\n\t}\n}\n\n.shop-skin-selection-item {\n\tposition: relative;\n\tmin-width: 200px;\n\tmin-height: 320px;\n\tmargin: 10px;\n}\n\n.shop-skin-selection-image {\n\tmin-width: 200px;\n\tmin-height: 300px;\n}\n\n.shop-class-selection-item {\n\tmin-height: 240px;\n}\n\n.shop-skin-selection-list-add-button {\n\talign-self: center;\n}\n\n.shop-skin-selection-edit-button {\n\tposition: absolute;\n    left: 50%;\n    bottom: 0px;\n    transform: translate(-50%, 0);\n    margin: 0px;\n}\n\n.corner-delete-button {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tpadding: 8px;\n\tfont-size: 12pt;\n\theight: auto;\n\tmargin: 0;\n}\n\n.shop-items-grid-view{\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fit, 100px);\n\tgrid-gap: 5px;\n\twidth: 100%;\n\theight: fit-content;\n\tmax-height: 300px;\n\tjustify-content: center;\n}\n\n.shopItem{\n\tborder: none;\n\twidth: 100px;\n\theight: 100px;\n\tposition: relative;\n\t--wrinkled-paper-color: var(--shop-item-background-color);\n}\n\n.shopItemUsage-confirmPurchase {\n\tmargin: auto;\n\twidth: 200px;\n\theight: 200px;\n}\n\n.shopItem.selected{\n\t--wrinkled-paper-border-size: 3;\n\t--wrinkled-paper-border-color: var(--default-wrinkled-paper-border-color);\n}\n.shopItem:focus-visible {\n\toutline: none;\n\t--wrinkled-paper-border-size: 3;\n\t--wrinkled-paper-border-color: var(--blue-highlight-color);\n}\n\n.shopItem:not(.shopItemUsage-confirmPurchase):not(.selected.preventUnequip) {\n\tcursor: pointer;\n}\n.shopItem:hover:not(.shopItemUsage-confirmPurchase):not(.selected.preventUnequip) {\n\t--wrinkled-paper-color: var(--shop-item-background-color-hover);\n}\n.shopItem:active:not(.shopItemUsage-confirmPurchase):not(.selected.preventUnequip) {\n\t--wrinkled-paper-color: var(--shop-item-background-color-active);\n}\n\n.shopItem.highlight:not(.shopItemUsage-confirmPurchase) {\n\tanimation: shop-item-highlight 5s;\n}\n\n@keyframes shop-item-highlight {\n\t0% {\n\t\t--wrinkled-paper-color: var(--shop-item-highlight-color);\n\t}\n\t50% {\n\t\t--wrinkled-paper-color: var(--shop-item-highlight-color);\n\t}\n\t100% {\n\t\t--wrinkled-paper-color: var(--shop-item-background-color);\n\t}\n}\n\n.shopItem > canvas {\n\tpointer-events: none;\n}\n.shopItem > canvas.needs-mask {\n\t--mask: radial-gradient(closest-side, black 50%, transparent);\n\t-webkit-mask-image: var(--mask);\n\tmask-image: var(--mask);\n}\n.shopItemLocked:not(.shopItemUsage-confirmPurchase) > canvas {\n\tfilter: grayscale(100%);\n}\n.shopItem:not(.shopItemUsage-confirmPurchase) > canvas {\n\twidth: 100px;\n\theight: 100px;\n\ttransition: transform 0.2s;\n\tz-index: 101;\n\tposition: relative;\n}\n\n.shopItemLock {\n\twidth: 80px;\n\theight: 80px;\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\tbackground: url(static/img/menuUI/shop/lock.svg);\n\topacity: 0.4;\n\ttransition: opacity 0.2s;\n\tz-index: 102;\n}\n.shopItemLock.rewarded-break-unlockable {\n\twidth: 60px;\n\theight: 60px;\n\tbackground: url(static/img/rewardedAdIcon.svg);\n}\n\n.shopItem:not(.shopItemUsage-confirmPurchase):hover > canvas {\n\tfilter: none;\n\ttransform: scale(1.7);\n}\n.shopItem:hover > .shopItemLock {\n\topacity: 0;\n}\n\n.shopItemOwned > .shopItemLock, .shopItemUsage-confirmPurchase > .shopItemLock {\n\tdisplay: none;\n}\n\n.shopItem > .currency-wrapper {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\toverflow: hidden;\n\tz-index: 103;\n}\n.shopItem:not(.shopItemUsage-confirmPurchase):hover > .currency-wrapper {\n\tz-index: 100;\n}\n.shopItem > .currency-wrapper > .currency-container {\n\ttransition: transform 0.2s;\n}\n.shopItem:hover > .currency-wrapper > .currency-container {\n\ttransform: translateY(100%);\n}\n\n.shopSkinPreview{\n\tdisplay: inline-block;\n\tmin-width: 200px;\n\tbackground: #0088ff;\n\tposition: relative;\n}\n\n.shop-skin-preview-canvas {\n\tdisplay: block;\n}\n\n.shop-skin-preview-download-button {\n\twidth: 50px;\n\theight: 50px;\n\tbackground: url(static/img/menuUI/download.svg);\n\tposition: absolute;\n\tbottom: 0;\n\tright: 0;\n\tcursor: pointer;\n\topacity: 0.4;\n}\n.shop-skin-preview-download-button:hover {\n\topacity: 0.7;\n}\n\n.shop-gender-toggle-container {\n\tdisplay: flex;\n\talign-items: center;\n}\n.gender-icon{\n\twidth: 25px;\n\theight: 25px;\n\tbackground: no-repeat center;\n\tfilter: var(--icon-filter);\n}\n.gender-icon.male {\n\tbackground-image: url(static/img/menuUI/shop/male.svg);\n}\n.gender-icon.female {\n\tbackground-image: url(static/img/menuUI/shop/female.svg);\n}\n\n.shop-color-buttons-corner {\n\tdisplay: flex;\n}\n\n.shop-color-button {\n\twidth: 20px;\n\theight: 20px;\n\tmargin: 0 1px;\n\tappearance: none;\n\tborder-radius: 100px;\n\toutline: none;\n\tborder: 2px solid var(--default-wrinkled-paper-border-color);\n\tpadding: 0;\n\tbox-shadow: 0px 1px var(--default-wrinkled-paper-border-color);\n\tcursor: pointer;\n}\n\n.shop-color-button:hover {\n\tfilter: brightness(120%);\n}\n\n.stat-class-tooltip {\n\tposition: absolute;\n\t--wrinkled-paper-color: var(--shop-item-background-color);\n\tpadding: 10px;\n\tpointer-events: none;\n\ttransition: transform 0.2s, opacity 0.2s;\n\ttransform: translate(-50%, -100%);\n\tfilter: var(--default-drop-shadow);\n}\n.stat-class-tooltip.transitioning {\n\ttransform: translate(-50%, -80%);\n\topacity: 0;\n}\n\n.stat-class-tooltip ul {\n\tlist-style-type: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.stat-class-tooltip li {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 5px;\n}\n\n.stat-class-icon {\n\twidth: 25px;\n\theight: 25px;\n\tdisplay: inline-block;\n}\n");
const sheet$5 = new CSSStyleSheet;
sheet$5.replaceSync(".squad-split-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: stretch;\n\tmargin-bottom: 30px;\n}\n\n.squad-split-divider {\n\tdisplay: flex;\n\tflex-direction: column;\n\ttext-align: center;\n\tmargin: 0px 15px;\n}\n\n.squad-split-divider-line {\n\twidth: 19px;\n\tflex-grow: 1;\n\t--wrinkled-line-direction: vertical;\n\t--wrinkled-line-segments: 0.05;\n\t--wrinkled-line-wrinkle-size: 6px;\n}\n\n.squad-split-section {\n\twidth: 234px;\n\ttext-align: center;\n\tmargin: auto;\n}\n\n.squad-id-container {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 7px;\n}\n\n.squad-id-button {\n\tpadding: 0;\n\tposition: relative;\n}\n\n.squad-id-copied-text {\n\tcolor: var(--default-text-color);\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n\tdisplay: none;\n}\n.squad-id-copied-text.animating {\n\tdisplay: inherit;\n\tanimation-name: copy-squad-url-button-animation;\n\tanimation-duration: 1s;\n\tanimation-fill-mode: both;\n}\n\n@keyframes copy-squad-url-button-animation {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: translate(-50%, -50%);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: translate(-50%, -50%) translateY(-30px);\n\t}\n}\n\n.squad-id {\n\tfont-size: 20pt;\n}\n\n.join-squad-input {\n\twidth: 100%;\n\ttext-align: center;\n}\n\n.in-squad-content {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: flex-start;\n}\n\n.squad-settings-button {\n\twidth: 30px;\n\theight: 30px;\n\tposition: absolute;\n\tright: 20px;\n\tbottom: 20px;\n}\n\n.squad-players-list {\n\tbackground: var(--items-table-bg-color) !important;\n\toverflow: auto;\n\tflex-grow: 1;\n\tmax-width: 250px;\n\tmax-height: min(300px, 30vh);\n}\n\n.squad-players-list > table {\n\twidth: 100%;\n}\n\n.squad-players-list > table > tbody > tr > .squad-players-leader-container {\n\twidth: 20px;\n}\n\n.squad-players-list > table > tbody > tr > .squad-players-avatar-container {\n\twidth: 40px;\n\tpadding: 0px;\n}\n\n.squad-leader-icon {\n\tbackground: url(static/img/menuUI/crown.svg) no-repeat center;\n\twidth: 15px;\n\theight: 15px;\n\tfilter: var(--icon-filter);\n}\n\n.in-squad-buttons {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-self: flex-end;\n}\n\n.in-squad-buttons.hidden {\n\tdisplay: none;\n}\n\n@media (max-width: 520px) {\n\t.squad-split-container {\n\t\tflex-direction: column;\n\t}\n\n\t.squad-split-divider {\n\t\tflex-direction: row;\n\t\tmargin: 15px 0px;\n\t}\n\n\t.squad-split-divider-line {\n\t\t--wrinkled-line-direction: horizontal;\n\t}\n\n\t.in-squad-content {\n\t\tflex-direction: column;\n\t\talign-items: stretch;\n\t}\n\n\t.in-squad-buttons {\n\t\tflex-flow: row wrap;\n\t\talign-self: auto;\n\t}\n\n\t.squad-split-divider-line {\n\t\t--wrinkled-line-wrinkle-size: 3px;\n\t}\n\n\t.squad-split-divider > span {\n\t\tmargin: 0px 10px;\n\t}\n\n\t.squad-players-list {\n\t\tmax-width: 100%;\n\t}\n\n\n\t.squad-settings-button {\n\t\tright: 20px;\n\t\ttop: 20px;\n\t\tbottom: initial;\n\t}\n}\n\n.squad-settings-leader-only-message {\n\tmax-width: 200px;\n\tmargin-bottom: 20px;\n}\n");
const sheet$4 = new CSSStyleSheet;
sheet$4.replaceSync(".class-selection-image-container {\n\tposition: relative;\n\tmin-width: 200px;\n\tmin-height: 200px;\n}\n\n.class-selection-image-container.in-game {\n\tmin-width: 100px;\n\tmin-height: 100px;\n}\n\n.class-selection-image,\n.class-selection-image-background {\n\tposition: absolute;\n\tinset: 0;\n}\n\n.class-selection-image {\n\tbackground-size: contain;\n}\n\n.class-selection-image-background {\n\t--wrinkled-paper-color: #d8d8d8;\n\t--wrinkled-paper-banner-color: #0000001c;\n\t--wrinkled-paper-banner-size: 40px;\n\t--wrinkled-paper-border-size: 20px;\n\t--wrinkled-paper-border-color: #0000002b;\n}\n\n.class-selection-image-container.in-game > .class-selection-image-background {\n\t--wrinkled-paper-banner-size: 20px;\n\t--wrinkled-paper-border-size: 12px;\n}\n\n.class-selection-image-container.in-game > .class-selection-image {\n\tbackground-size: 130%;\n\tbackground-position: 50% 10%;\n}\n");
const sheet$3 = new CSSStyleSheet;
sheet$3.replaceSync(".corner-stats-container {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tmargin: 5px;\n\tz-index: 1;\n}\n.corner-stats-container.hidden {\n\tdisplay: none;\n}\n\n.corner-stat {\n\tfont-size: 20pt;\n}\n\n.corner-stat .red {\n\tcolor: #ff2424;\n}\n");
const sheet$2 = new CSSStyleSheet;
sheet$2.replaceSync(".chat-container {\n\tposition: absolute;\n\tleft: 20px;\n\tbottom: 20px;\n\tpadding: 10px;\n\tfilter: var(--default-drop-shadow);\n\tpadding: 20px;\n\ttransition: transform 0.3s;\n\tz-index: 1;\n}\n.chat-container.up {\n\tbottom: 70px;\n}\n.chat-container.touch {\n\tbottom: 200px;\n}\n\n.chat-container.hidden {\n\ttransform: translateX(-150%);\n}\n\n.chat-log-container {\n\toverflow: hidden;\n\tmax-height: min(150px, 50vh);\n\tmax-width: min(400px, 50vw);\n}\n\n.chat-message-container {\n\tdisplay: flex;\n\tgap: 7px;\n\tmargin-bottom: 10px;\n}\n\n.chat-message-content {\n\toverflow-wrap: anywhere;\n\toverflow: hidden;\n}\n\n.chat-message-name {\n\tmargin: 0;\n}\n\n.chat-input {\n\tfont-size: 16px;\n\theight: 30px;\n\twidth: 300px;\n\tmargin: 0;\n}\n\n.chat-input::placeholder {\n\tfont-family: BlueNight, sans-serif;\n\ttext-transform: lowercase;\n\tfont-weight: lighter;\n\tline-height: 0.7em;\n\tfont-size: 20px;\n}\n");
const sheet$1 = new CSSStyleSheet;
sheet$1.replaceSync(".health-ui-container {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tmargin: 30px;\n\tmargin-left: 60px;\n\tz-index: 100;\n\tpointer-events: none;\n\tfilter: var(--default-drop-shadow);\n\t--wrinkled-paper-wrinkle-size: 3px;\n}\n\n@media(max-width: 700px), (max-height: 450px){\n\t.health-ui-container{\n\t\ttransform: scale(0.5);\n\t\ttransform-origin: top left;\n\t\tmargin-top: 15px;\n\t}\n}\n\n.health-ui-bar-container {\n\tmargin: 8px;\n\tposition: relative;\n}\n\n.health-ui-bar-container, .health-ui-bar {\n\twidth: 270px;\n\theight: 22px;\n}\n\n.health-ui-bar {\n\tposition: absolute;\n\t--wrinkled-paper-wrinkle-size: 3px;\n\t--wrinkled-paper-tear-count-min: 0;\n\t--wrinkled-paper-tear-count-max: 0;\n}\n\n.health-ui-bar.border {\n\t--wrinkled-paper-border-size: 6px;\n\t--wrinkled-paper-color: transparent;\n}\n\n.health-ui-bar.clip {\n\toverflow: hidden;\n}\n\n.health-ui-bar.main {\n\t--wrinkled-paper-banner-color: #0000001c;\n\t--wrinkled-paper-banner-size: 40px;\n}\n\n.health-ui-bar.damage-protection {\n\t--wrinkled-paper-color: white;\n\ttransition: opacity 2s;\n\topacity: 0;\n}\n\n.health-ui-bar.bg {\n\t--wrinkled-paper-color: black;\n}\n\n.health-ui-heart {\n\twidth: 40px;\n\theight: 40px;\n\tposition: absolute;\n\tleft: -18px;\n\ttop: -5px;\n}\n\n.health-ui-heart .fg {\n\ttransform-origin: center;\n\ttransform-style: preserve-3d;\n}\n\n.health-ui-heart .fg.beating {\n\tanimation: 1.5s infinite beat;\n}\n\n@keyframes beat {\n\t0% { transform: none; }\n\t8% { transform: perspective(30px) rotate3d(1,1,0, -10deg) scale3d(1.1, 1.2, 1.1); }\n\t15% { transform: perspective(30px) rotate3d(1,1,0, 00deg) scale3d(1.2, 1.2, 1.2); }\n\t22% { transform: perspective(30px) rotate3d(1,1,0, 10deg) scale3d(1.2, 1.1, 1.1); }\n\t30% { transform: perspective(30px) rotate3d(1,1,0, -5deg) scale3d(0.95, 0.95, 0.95); }\n\t38% { transform: none; }\n\t100% { transform: none; }\n}\n");
const sheet = new CSSStyleSheet;
sheet.replaceSync('#qc-cmp2-ui {\n\tbackground: paint(wrinkledPaper);\n\t--wrinkled-paper-wrinkle-size: 6px;\n\t--wrinkled-paper-color: white;\n\t--wrinkled-paper-border-segments: 0.016;\n\t--wrinkled-paper-tear-count-min: 0.001;\n\t--wrinkled-paper-tear-count-max: 0.003;\n\t--wrinkled-paper-tear-depth-min: 5px;\n\t--wrinkled-paper-tear-depth-max: 15px;\n\t--wrinkled-paper-tear-width-min: 10px;\n\t--wrinkled-paper-tear-width-max: 20px;\n\t--wrinkled-paper-tear-angle-offset-min: 0.7;\n\t--wrinkled-paper-tear-angle-offset-max: 1.1;\n\t--wrinkled-paper-seed: 33;\n}\n\n#qc-cmp2-ui .qc-cmp2-consent-info {\n\tpadding: 30px;\n}\n\n#qc-cmp2-ui h2 {\n\tfont-family: BlueNight, sans-serif;\n\ttext-transform: lowercase;\n\tfont-weight: lighter;\n\tline-height: 0.7em;\n\tfont-size: 26pt;\n}\n\n#qc-cmp2-ui .qc-cmp2-footer {\n\tborder-top: none;\n\tbox-shadow: none;\n}\n\n#qc-cmp2-ui button[mode="primary"] > span,\n#qc-cmp2-ui button[mode="secondary"] > span,\n#qc-cmp2-ui button[mode="primary"],\n#qc-cmp2-ui button[mode="secondary"] {\n\tfont-family: BlueNight, sans-serif;\n\ttext-transform: lowercase;\n\tfont-weight: lighter;\n\tline-height: 0.7em;\n\tfont-size: 18pt;\n\tcursor: pointer;\n}\n\n#qc-cmp2-ui button[mode="primary"],\n#qc-cmp2-ui button[mode="secondary"] {\n\tpadding: 7px 30px;\n    margin: 4px 10px;\n    font-size: 24px;\n    height: 38px;\n    color: var(--default-wrinkled-paper-border-color);\n    white-space: nowrap;\n\n\tborder: none;\n\tappearance: none;\n\tbox-shadow: none;\n\tdisplay: block;\n\ttransition: none;\n\n\tbackground: paint(wrinkledPaper);\n\t--wrinkled-paper-color: white;\n    --wrinkled-paper-border-size: 3;\n    --wrinkled-paper-border-size-bottom: 6;\n    --wrinkled-paper-border-color: var(--default-wrinkled-paper-border-color);\n    --wrinkled-paper-seed: 70;\n    --wrinkled-paper-wrinkle-size: 2px;\n    --wrinkled-paper-border-segments: 0.02;\n    --wrinkled-paper-tear-count-min: 0;\n    --wrinkled-paper-tear-count-max: 0;\n}\n\n#qc-cmp2-ui button[mode="primary"]:hover:not(:disabled),\n#qc-cmp2-ui button[mode="secondary"]:hover:not(:disabled) {\n\tfilter: brightness(0.9);\n}\n#qc-cmp2-ui button[mode="primary"]:active:not(:disabled),\n#qc-cmp2-ui button[mode="secondary"]:active:not(:disabled) {\n\tfilter: brightness(0.8);\n}\n\n@media (min-width: 768px) {\n\t#qc-cmp2-ui button.qc-cmp2-hide-desktop {\n\t\tdisplay: none;\n\t}\n}\n'),
document.adoptedStyleSheets = [sheet$c, sheet$b, sheet$a, sheet$9, sheet$8, sheet$7, sheet$6, sheet$5, sheet$4, sheet$3, sheet$2, sheet$1, sheet],
init();
