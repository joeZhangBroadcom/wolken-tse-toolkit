! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).chatWidget = t()
}(this, function() {
    function e() {
        return e = Object.assign ? Object.assign.bind() : function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, e.apply(this, arguments)
    }
    const t = Math.min,
        n = Math.max,
        i = Math.round,
        r = Math.floor,
        o = e => ({
            x: e,
            y: e
        }),
        s = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        a = {
            start: "end",
            end: "start"
        };

    function l(e, i, r) {
        return n(e, t(i, r))
    }

    function c(e, t) {
        return "function" == typeof e ? e(t) : e
    }

    function u(e) {
        return e.split("-")[0]
    }

    function d(e) {
        return e.split("-")[1]
    }

    function h(e) {
        return "x" === e ? "y" : "x"
    }

    function p(e) {
        return "y" === e ? "height" : "width"
    }

    function f(e) {
        return ["top", "bottom"].includes(u(e)) ? "y" : "x"
    }

    function g(e) {
        return h(f(e))
    }

    function b(e) {
        return e.replace(/start|end/g, e => a[e])
    }

    function m(e) {
        return e.replace(/left|right|bottom|top/g, e => s[e])
    }

    function w(e) {
        return {
            ...e,
            top: e.y,
            left: e.x,
            right: e.x + e.width,
            bottom: e.y + e.height
        }
    }

    function x(e, t, n) {
        let {
            reference: i,
            floating: r
        } = e;
        const o = f(t),
            s = g(t),
            a = p(s),
            l = u(t),
            c = "y" === o,
            h = i.x + i.width / 2 - r.width / 2,
            b = i.y + i.height / 2 - r.height / 2,
            m = i[a] / 2 - r[a] / 2;
        let w;
        switch (l) {
            case "top":
                w = {
                    x: h,
                    y: i.y - r.height
                };
                break;
            case "bottom":
                w = {
                    x: h,
                    y: i.y + i.height
                };
                break;
            case "right":
                w = {
                    x: i.x + i.width,
                    y: b
                };
                break;
            case "left":
                w = {
                    x: i.x - r.width,
                    y: b
                };
                break;
            default:
                w = {
                    x: i.x,
                    y: i.y
                }
        }
        switch (d(t)) {
            case "start":
                w[s] -= m * (n && c ? -1 : 1);
                break;
            case "end":
                w[s] += m * (n && c ? -1 : 1)
        }
        return w
    }
    async function v(e, t) {
        var n;
        void 0 === t && (t = {});
        const {
            x: i,
            y: r,
            platform: o,
            rects: s,
            elements: a,
            strategy: l
        } = e, {
            boundary: u = "clippingAncestors",
            rootBoundary: d = "viewport",
            elementContext: h = "floating",
            altBoundary: p = !1,
            padding: f = 0
        } = c(t, e), g = function(e) {
            return "number" != typeof e ? function(e) {
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    ...e
                }
            }(e) : {
                top: e,
                right: e,
                bottom: e,
                left: e
            }
        }(f), b = a[p ? "floating" === h ? "reference" : "floating" : h], m = w(await o.getClippingRect({
            element: null == (n = await (null == o.isElement ? void 0 : o.isElement(b))) || n ? b : b.contextElement || await (null == o.getDocumentElement ? void 0 : o.getDocumentElement(a.floating)),
            boundary: u,
            rootBoundary: d,
            strategy: l
        })), x = "floating" === h ? {
            ...s.floating,
            x: i,
            y: r
        } : s.reference, v = await (null == o.getOffsetParent ? void 0 : o.getOffsetParent(a.floating)), y = await (null == o.isElement ? void 0 : o.isElement(v)) && await (null == o.getScale ? void 0 : o.getScale(v)) || {
            x: 1,
            y: 1
        }, k = w(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: x,
            offsetParent: v,
            strategy: l
        }) : x);
        return {
            top: (m.top - k.top + g.top) / y.y,
            bottom: (k.bottom - m.bottom + g.bottom) / y.y,
            left: (m.left - k.left + g.left) / y.x,
            right: (k.right - m.right + g.right) / y.x
        }
    }

    function y(e) {
        return T(e) ? (e.nodeName || "").toLowerCase() : "#document"
    }

    function k(e) {
        var t;
        return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window
    }

    function _(e) {
        var t;
        return null == (t = (T(e) ? e.ownerDocument : e.document) || window.document) ? void 0 : t.documentElement
    }

    function T(e) {
        return e instanceof Node || e instanceof k(e).Node
    }

    function E(e) {
        return e instanceof Element || e instanceof k(e).Element
    }

    function R(e) {
        return e instanceof HTMLElement || e instanceof k(e).HTMLElement
    }

    function S(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof ShadowRoot || e instanceof k(e).ShadowRoot)
    }

    function $(e) {
        const {
            overflow: t,
            overflowX: n,
            overflowY: i,
            display: r
        } = I(e);
        return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(r)
    }

    function C(e) {
        return ["table", "td", "th"].includes(y(e))
    }

    function A(e) {
        const t = P(),
            n = I(e);
        return "none" !== n.transform || "none" !== n.perspective || !!n.containerType && "normal" !== n.containerType || !t && !!n.backdropFilter && "none" !== n.backdropFilter || !t && !!n.filter && "none" !== n.filter || ["transform", "perspective", "filter"].some(e => (n.willChange || "").includes(e)) || ["paint", "layout", "strict", "content"].some(e => (n.contain || "").includes(e))
    }

    function P() {
        return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none")
    }

    function z(e) {
        return ["html", "body", "#document"].includes(y(e))
    }

    function I(e) {
        return k(e).getComputedStyle(e)
    }

    function O(e) {
        return E(e) ? {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop
        } : {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function L(e) {
        if ("html" === y(e)) return e;
        const t = e.assignedSlot || e.parentNode || S(e) && e.host || _(e);
        return S(t) ? t.host : t
    }

    function N(e) {
        const t = L(e);
        return z(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : R(t) && $(t) ? t : N(t)
    }

    function D(e, t, n) {
        var i;
        void 0 === t && (t = []), void 0 === n && (n = !0);
        const r = N(e),
            o = r === (null == (i = e.ownerDocument) ? void 0 : i.body),
            s = k(r);
        return o ? t.concat(s, s.visualViewport || [], $(r) ? r : [], s.frameElement && n ? D(s.frameElement) : []) : t.concat(r, D(r, [], n))
    }

    function F(e) {
        const t = I(e);
        let n = parseFloat(t.width) || 0,
            r = parseFloat(t.height) || 0;
        const o = R(e),
            s = o ? e.offsetWidth : n,
            a = o ? e.offsetHeight : r,
            l = i(n) !== s || i(r) !== a;
        return l && (n = s, r = a), {
            width: n,
            height: r,
            $: l
        }
    }

    function B(e) {
        return E(e) ? e : e.contextElement
    }

    function M(e) {
        const t = B(e);
        if (!R(t)) return o(1);
        const n = t.getBoundingClientRect(),
            {
                width: r,
                height: s,
                $: a
            } = F(t);
        let l = (a ? i(n.width) : n.width) / r,
            c = (a ? i(n.height) : n.height) / s;
        return l && Number.isFinite(l) || (l = 1), c && Number.isFinite(c) || (c = 1), {
            x: l,
            y: c
        }
    }
    const j = /*#__PURE__*/ o(0);

    function q(e) {
        const t = k(e);
        return P() && t.visualViewport ? {
            x: t.visualViewport.offsetLeft,
            y: t.visualViewport.offsetTop
        } : j
    }

    function Z(e, t, n, i) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        const r = e.getBoundingClientRect(),
            s = B(e);
        let a = o(1);
        t && (i ? E(i) && (a = M(i)) : a = M(e));
        const l = function(e, t, n) {
            return void 0 === t && (t = !1), !(!n || t && n !== k(e)) && t
        }(s, n, i) ? q(s) : o(0);
        let c = (r.left + l.x) / a.x,
            u = (r.top + l.y) / a.y,
            d = r.width / a.x,
            h = r.height / a.y;
        if (s) {
            const e = k(s),
                t = i && E(i) ? k(i) : i;
            let n = e,
                r = n.frameElement;
            for (; r && i && t !== n;) {
                const e = M(r),
                    t = r.getBoundingClientRect(),
                    i = I(r),
                    o = t.left + (r.clientLeft + parseFloat(i.paddingLeft)) * e.x,
                    s = t.top + (r.clientTop + parseFloat(i.paddingTop)) * e.y;
                c *= e.x, u *= e.y, d *= e.x, h *= e.y, c += o, u += s, n = k(r), r = n.frameElement
            }
        }
        return w({
            width: d,
            height: h,
            x: c,
            y: u
        })
    }
    const H = [":popover-open", ":modal"];

    function G(e) {
        return H.some(t => {
            try {
                return e.matches(t)
            } catch (e) {
                return !1
            }
        })
    }

    function V(e) {
        return Z(_(e)).left + O(e).scrollLeft
    }

    function W(e, t, i) {
        let r;
        if ("viewport" === t) r = function(e, t) {
            const n = k(e),
                i = _(e),
                r = n.visualViewport;
            let o = i.clientWidth,
                s = i.clientHeight,
                a = 0,
                l = 0;
            if (r) {
                o = r.width, s = r.height;
                const e = P();
                (!e || e && "fixed" === t) && (a = r.offsetLeft, l = r.offsetTop)
            }
            return {
                width: o,
                height: s,
                x: a,
                y: l
            }
        }(e, i);
        else if ("document" === t) r = function(e) {
            const t = _(e),
                i = O(e),
                r = e.ownerDocument.body,
                o = n(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
                s = n(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
            let a = -i.scrollLeft + V(e);
            const l = -i.scrollTop;
            return "rtl" === I(r).direction && (a += n(t.clientWidth, r.clientWidth) - o), {
                width: o,
                height: s,
                x: a,
                y: l
            }
        }(_(e));
        else if (E(t)) r = function(e, t) {
            const n = Z(e, !0, "fixed" === t),
                i = n.top + e.clientTop,
                r = n.left + e.clientLeft,
                s = R(e) ? M(e) : o(1);
            return {
                width: e.clientWidth * s.x,
                height: e.clientHeight * s.y,
                x: r * s.x,
                y: i * s.y
            }
        }(t, i);
        else {
            const n = q(e);
            r = {
                ...t,
                x: t.x - n.x,
                y: t.y - n.y
            }
        }
        return w(r)
    }

    function Q(e, t) {
        const n = L(e);
        return !(n === t || !E(n) || z(n)) && ("fixed" === I(n).position || Q(n, t))
    }

    function K(e, t, n) {
        const i = R(t),
            r = _(t),
            s = "fixed" === n,
            a = Z(e, !0, s, t);
        let l = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const c = o(0);
        if (i || !i && !s)
            if (("body" !== y(t) || $(r)) && (l = O(t)), i) {
                const e = Z(t, !0, s, t);
                c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop
            } else r && (c.x = V(r));
        return {
            x: a.left + l.scrollLeft - c.x,
            y: a.top + l.scrollTop - c.y,
            width: a.width,
            height: a.height
        }
    }

    function U(e, t) {
        return R(e) && "fixed" !== I(e).position ? t ? t(e) : e.offsetParent : null
    }

    function Y(e, t) {
        const n = k(e);
        if (!R(e) || G(e)) return n;
        let i = U(e, t);
        for (; i && C(i) && "static" === I(i).position;) i = U(i, t);
        return i && ("html" === y(i) || "body" === y(i) && "static" === I(i).position && !A(i)) ? n : i || function(e) {
            let t = L(e);
            for (; R(t) && !z(t);) {
                if (A(t)) return t;
                t = L(t)
            }
            return null
        }(e) || n
    }
    const X = {
            convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
                let {
                    elements: t,
                    rect: n,
                    offsetParent: i,
                    strategy: r
                } = e;
                const s = "fixed" === r,
                    a = _(i),
                    l = !!t && G(t.floating);
                if (i === a || l && s) return n;
                let c = {
                        scrollLeft: 0,
                        scrollTop: 0
                    },
                    u = o(1);
                const d = o(0),
                    h = R(i);
                if ((h || !h && !s) && (("body" !== y(i) || $(a)) && (c = O(i)), R(i))) {
                    const e = Z(i);
                    u = M(i), d.x = e.x + i.clientLeft, d.y = e.y + i.clientTop
                }
                return {
                    width: n.width * u.x,
                    height: n.height * u.y,
                    x: n.x * u.x - c.scrollLeft * u.x + d.x,
                    y: n.y * u.y - c.scrollTop * u.y + d.y
                }
            },
            getDocumentElement: _,
            getClippingRect: function(e) {
                let {
                    element: i,
                    boundary: r,
                    rootBoundary: o,
                    strategy: s
                } = e;
                const a = [..."clippingAncestors" === r ? function(e, t) {
                        const n = t.get(e);
                        if (n) return n;
                        let i = D(e, [], !1).filter(e => E(e) && "body" !== y(e)),
                            r = null;
                        const o = "fixed" === I(e).position;
                        let s = o ? L(e) : e;
                        for (; E(s) && !z(s);) {
                            const t = I(s),
                                n = A(s);
                            n || "fixed" !== t.position || (r = null), (o ? !n && !r : !n && "static" === t.position && r && ["absolute", "fixed"].includes(r.position) || $(s) && !n && Q(e, s)) ? i = i.filter(e => e !== s) : r = t, s = L(s)
                        }
                        return t.set(e, i), i
                    }(i, this._c) : [].concat(r), o],
                    l = a.reduce((e, r) => {
                        const o = W(i, r, s);
                        return e.top = n(o.top, e.top), e.right = t(o.right, e.right), e.bottom = t(o.bottom, e.bottom), e.left = n(o.left, e.left), e
                    }, W(i, a[0], s));
                return {
                    width: l.right - l.left,
                    height: l.bottom - l.top,
                    x: l.left,
                    y: l.top
                }
            },
            getOffsetParent: Y,
            getElementRects: async function(e) {
                const t = this.getOffsetParent || Y,
                    n = this.getDimensions;
                return {
                    reference: K(e.reference, await t(e.floating), e.strategy),
                    floating: {
                        x: 0,
                        y: 0,
                        ...await n(e.floating)
                    }
                }
            },
            getClientRects: function(e) {
                return Array.from(e.getClientRects())
            },
            getDimensions: function(e) {
                const {
                    width: t,
                    height: n
                } = F(e);
                return {
                    width: t,
                    height: n
                }
            },
            getScale: M,
            isElement: E,
            isRTL: function(e) {
                return "rtl" === I(e).direction
            }
        },
        J = function(e) {
            return void 0 === e && (e = {}), {
                name: "flip",
                options: e,
                async fn(t) {
                    var n, i;
                    const {
                        placement: r,
                        middlewareData: o,
                        rects: s,
                        initialPlacement: a,
                        platform: l,
                        elements: h
                    } = t, {
                        mainAxis: f = !0,
                        crossAxis: w = !0,
                        fallbackPlacements: x,
                        fallbackStrategy: y = "bestFit",
                        fallbackAxisSideDirection: k = "none",
                        flipAlignment: _ = !0,
                        ...T
                    } = c(e, t);
                    if (null != (n = o.arrow) && n.alignmentOffset) return {};
                    const E = u(r),
                        R = u(a) === a,
                        S = await (null == l.isRTL ? void 0 : l.isRTL(h.floating)),
                        $ = x || (R || !_ ? [m(a)] : function(e) {
                            const t = m(e);
                            return [b(e), t, b(t)]
                        }(a));
                    x || "none" === k || $.push(... function(e, t, n, i) {
                        const r = d(e);
                        let o = function(e, t, n) {
                            const i = ["left", "right"],
                                r = ["right", "left"],
                                o = ["top", "bottom"],
                                s = ["bottom", "top"];
                            switch (e) {
                                case "top":
                                case "bottom":
                                    return n ? t ? r : i : t ? i : r;
                                case "left":
                                case "right":
                                    return t ? o : s;
                                default:
                                    return []
                            }
                        }(u(e), "start" === n, i);
                        return r && (o = o.map(e => e + "-" + r), t && (o = o.concat(o.map(b)))), o
                    }(a, _, k, S));
                    const C = [a, ...$],
                        A = await v(t, T),
                        P = [];
                    let z = (null == (i = o.flip) ? void 0 : i.overflows) || [];
                    if (f && P.push(A[E]), w) {
                        const e = function(e, t, n) {
                            void 0 === n && (n = !1);
                            const i = d(e),
                                r = g(e),
                                o = p(r);
                            let s = "x" === r ? i === (n ? "end" : "start") ? "right" : "left" : "start" === i ? "bottom" : "top";
                            return t.reference[o] > t.floating[o] && (s = m(s)), [s, m(s)]
                        }(r, s, S);
                        P.push(A[e[0]], A[e[1]])
                    }
                    if (z = [...z, {
                            placement: r,
                            overflows: P
                        }], !P.every(e => e <= 0)) {
                        var I, O;
                        const e = ((null == (I = o.flip) ? void 0 : I.index) || 0) + 1,
                            t = C[e];
                        if (t) return {
                            data: {
                                index: e,
                                overflows: z
                            },
                            reset: {
                                placement: t
                            }
                        };
                        let n = null == (O = z.filter(e => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]) ? void 0 : O.placement;
                        if (!n) switch (y) {
                            case "bestFit": {
                                var L;
                                const e = null == (L = z.map(e => [e.placement, e.overflows.filter(e => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]) ? void 0 : L[0];
                                e && (n = e);
                                break
                            }
                            case "initialPlacement":
                                n = a
                        }
                        if (r !== n) return {
                            reset: {
                                placement: n
                            }
                        }
                    }
                    return {}
                }
            }
        };
    var ee = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"],
        te = /* #__PURE__ */ ee.join(","),
        ne = "undefined" == typeof Element,
        ie = ne ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        re = !ne && Element.prototype.getRootNode ? function(e) {
            var t;
            return null == e || null === (t = e.getRootNode) || void 0 === t ? void 0 : t.call(e)
        } : function(e) {
            return null == e ? void 0 : e.ownerDocument
        },
        oe = function e(t, n) {
            var i;
            void 0 === n && (n = !0);
            var r = null == t || null === (i = t.getAttribute) || void 0 === i ? void 0 : i.call(t, "inert");
            return "" === r || "true" === r || n && t && e(t.parentNode)
        },
        se = function(e, t, n) {
            if (oe(e)) return [];
            var i = Array.prototype.slice.apply(e.querySelectorAll(te));
            return t && ie.call(e, te) && i.unshift(e), i.filter(n)
        },
        ae = function e(t, n, i) {
            for (var r = [], o = Array.from(t); o.length;) {
                var s = o.shift();
                if (!oe(s, !1))
                    if ("SLOT" === s.tagName) {
                        var a = s.assignedElements(),
                            l = e(a.length ? a : s.children, !0, i);
                        i.flatten ? r.push.apply(r, l) : r.push({
                            scopeParent: s,
                            candidates: l
                        })
                    } else {
                        ie.call(s, te) && i.filter(s) && (n || !t.includes(s)) && r.push(s);
                        var c = s.shadowRoot || "function" == typeof i.getShadowRoot && i.getShadowRoot(s),
                            u = !oe(c, !1) && (!i.shadowRootFilter || i.shadowRootFilter(s));
                        if (c && u) {
                            var d = e(!0 === c ? s.children : c.children, !0, i);
                            i.flatten ? r.push.apply(r, d) : r.push({
                                scopeParent: s,
                                candidates: d
                            })
                        } else o.unshift.apply(o, s.children)
                    }
            }
            return r
        },
        le = function(e) {
            return !isNaN(parseInt(e.getAttribute("tabindex"), 10))
        },
        ce = function(e) {
            if (!e) throw new Error("No node provided");
            return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || function(e) {
                var t, n = null == e || null === (t = e.getAttribute) || void 0 === t ? void 0 : t.call(e, "contenteditable");
                return "" === n || "true" === n
            }(e)) && !le(e) ? 0 : e.tabIndex
        },
        ue = function(e, t) {
            return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex
        },
        de = function(e) {
            return "INPUT" === e.tagName
        },
        he = function(e) {
            var t = e.getBoundingClientRect();
            return 0 === t.width && 0 === t.height
        },
        pe = function(e, t) {
            return !(t.disabled || oe(t) || function(e) {
                return de(e) && "hidden" === e.type
            }(t) || function(e, t) {
                var n = t.displayCheck,
                    i = t.getShadowRoot;
                if ("hidden" === getComputedStyle(e).visibility) return !0;
                var r = ie.call(e, "details>summary:first-of-type");
                if (ie.call(r ? e.parentElement : e, "details:not([open]) *")) return !0;
                if (n && "full" !== n && "legacy-full" !== n) {
                    if ("non-zero-area" === n) return he(e)
                } else {
                    if ("function" == typeof i) {
                        for (var o = e; e;) {
                            var s = e.parentElement,
                                a = re(e);
                            if (s && !s.shadowRoot && !0 === i(s)) return he(e);
                            e = e.assignedSlot ? e.assignedSlot : s || a === e.ownerDocument ? s : a.host
                        }
                        e = o
                    }
                    if (function(e) {
                            var t, n, i, r, o = e && re(e),
                                s = null === (t = o) || void 0 === t ? void 0 : t.host,
                                a = !1;
                            if (o && o !== e)
                                for (a = !!(null !== (n = s) && void 0 !== n && null !== (i = n.ownerDocument) && void 0 !== i && i.contains(s) || null != e && null !== (r = e.ownerDocument) && void 0 !== r && r.contains(e)); !a && s;) {
                                    var l, c, u;
                                    a = !(null === (c = s = null === (l = o = re(s)) || void 0 === l ? void 0 : l.host) || void 0 === c || null === (u = c.ownerDocument) || void 0 === u || !u.contains(s))
                                }
                            return a
                        }(e)) return !e.getClientRects().length;
                    if ("legacy-full" !== n) return !0
                }
                return !1
            }(t, e) || function(e) {
                return "DETAILS" === e.tagName && Array.prototype.slice.apply(e.children).some(function(e) {
                    return "SUMMARY" === e.tagName
                })
            }(t) || function(e) {
                if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
                    for (var t = e.parentElement; t;) {
                        if ("FIELDSET" === t.tagName && t.disabled) {
                            for (var n = 0; n < t.children.length; n++) {
                                var i = t.children.item(n);
                                if ("LEGEND" === i.tagName) return !!ie.call(t, "fieldset[disabled] *") || !i.contains(e)
                            }
                            return !0
                        }
                        t = t.parentElement
                    }
                return !1
            }(t))
        },
        fe = function(e, t) {
            return !(function(e) {
                return function(e) {
                    return de(e) && "radio" === e.type
                }(e) && ! function(e) {
                    if (!e.name) return !0;
                    var t, n = e.form || re(e),
                        i = function(e) {
                            return n.querySelectorAll('input[type="radio"][name="' + e + '"]')
                        };
                    if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape) t = i(window.CSS.escape(e.name));
                    else try {
                        t = i(e.name)
                    } catch (e) {
                        return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1
                    }
                    var r = function(e, t) {
                        for (var n = 0; n < e.length; n++)
                            if (e[n].checked && e[n].form === t) return e[n]
                    }(t, e.form);
                    return !r || r === e
                }(e)
            }(t) || ce(t) < 0 || !pe(e, t))
        },
        ge = function(e) {
            var t = parseInt(e.getAttribute("tabindex"), 10);
            return !!(isNaN(t) || t >= 0)
        },
        be = function e(t) {
            var n = [],
                i = [];
            return t.forEach(function(t, r) {
                var o = !!t.scopeParent,
                    s = o ? t.scopeParent : t,
                    a = function(e, t) {
                        var n = ce(e);
                        return n < 0 && t && !le(e) ? 0 : n
                    }(s, o),
                    l = o ? e(t.candidates) : s;
                0 === a ? o ? n.push.apply(n, l) : n.push(s) : i.push({
                    documentOrder: r,
                    tabIndex: a,
                    item: t,
                    isScope: o,
                    content: l
                })
            }), i.sort(ue).reduce(function(e, t) {
                return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
            }, []).concat(n)
        },
        me = function(e, t) {
            if (t = t || {}, !e) throw new Error("No node provided");
            return !1 !== ie.call(e, te) && fe(t, e)
        },
        we = /* #__PURE__ */ ee.concat("iframe").join(","),
        xe = function(e, t) {
            if (t = t || {}, !e) throw new Error("No node provided");
            return !1 !== ie.call(e, we) && pe(t, e)
        };

    function ve(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), n.push.apply(n, i)
        }
        return n
    }

    function ye(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ve(Object(n), !0).forEach(function(t) {
                var i, r, o;
                i = e, o = n[t], (r = function(e) {
                    var t = function(e, t) {
                        if ("object" != typeof e || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var i = n.call(e, "string");
                            if ("object" != typeof i) return i;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == typeof t ? t : String(t)
                }(r = t)) in i ? Object.defineProperty(i, r, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : i[r] = o
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ve(Object(n)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            })
        }
        return e
    }
    var ke = function(e) {
            return "Tab" === (null == e ? void 0 : e.key) || 9 === (null == e ? void 0 : e.keyCode)
        },
        _e = function(e) {
            return ke(e) && !e.shiftKey
        },
        Te = function(e) {
            return ke(e) && e.shiftKey
        },
        Ee = function(e) {
            return setTimeout(e, 0)
        },
        Re = function(e, t) {
            var n = -1;
            return e.every(function(e, i) {
                return !t(e) || (n = i, !1)
            }), n
        },
        Se = function(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
            return "function" == typeof e ? e.apply(void 0, n) : e
        },
        $e = function(e) {
            return e.target.shadowRoot && "function" == typeof e.composedPath ? e.composedPath()[0] : e.target
        },
        Ce = [];
    let Ae = {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    };

    function Pe(e) {
        Ae = e
    }
    const ze = /[&<>"']/,
        Ie = new RegExp(ze.source, "g"),
        Oe = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        Le = new RegExp(Oe.source, "g"),
        Ne = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        De = e => Ne[e];

    function Fe(e, t) {
        if (t) {
            if (ze.test(e)) return e.replace(Ie, De)
        } else if (Oe.test(e)) return e.replace(Le, De);
        return e
    }
    const Be = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

    function Me(e) {
        return e.replace(Be, (e, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "")
    }
    const je = /(^|[^\[])\^/g;

    function qe(e, t) {
        let n = "string" == typeof e ? e : e.source;
        t = t || "";
        const i = {
            replace: (e, t) => {
                let r = "string" == typeof t ? t : t.source;
                return r = r.replace(je, "$1"), n = n.replace(e, r), i
            },
            getRegex: () => new RegExp(n, t)
        };
        return i
    }

    function Ze(e) {
        try {
            e = encodeURI(e).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return e
    }
    const He = {
        exec: () => null
    };

    function Ge(e, t) {
        const n = e.replace(/\|/g, (e, t, n) => {
            let i = !1,
                r = t;
            for (; --r >= 0 && "\\" === n[r];) i = !i;
            return i ? "|" : " |"
        }).split(/ \|/);
        let i = 0;
        if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t)
            if (n.length > t) n.splice(t);
            else
                for (; n.length < t;) n.push("");
        for (; i < n.length; i++) n[i] = n[i].trim().replace(/\\\|/g, "|");
        return n
    }

    function Ve(e, t, n) {
        const i = e.length;
        if (0 === i) return "";
        let r = 0;
        for (; r < i;) {
            const o = e.charAt(i - r - 1);
            if (o !== t || n) {
                if (o === t || !n) break;
                r++
            } else r++
        }
        return e.slice(0, i - r)
    }

    function We(e, t, n, i) {
        const r = t.href,
            o = t.title ? Fe(t.title) : null,
            s = e[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== e[0].charAt(0)) {
            i.state.inLink = !0;
            const e = {
                type: "link",
                raw: n,
                href: r,
                title: o,
                text: s,
                tokens: i.inlineTokens(s)
            };
            return i.state.inLink = !1, e
        }
        return {
            type: "image",
            raw: n,
            href: r,
            title: o,
            text: Fe(s)
        }
    }
    class Qe {
        options;
        rules;
        lexer;
        constructor(e) {
            this.options = e || Ae
        }
        space(e) {
            const t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return {
                type: "space",
                raw: t[0]
            }
        }
        code(e) {
            const t = this.rules.block.code.exec(e);
            if (t) {
                const e = t[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? e : Ve(e, "\n")
                }
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e);
            if (t) {
                const e = t[0],
                    n = function(e, t) {
                        const n = e.match(/^(\s+)(?:```)/);
                        if (null === n) return t;
                        const i = n[1];
                        return t.split("\n").map(e => {
                            const t = e.match(/^\s+/);
                            if (null === t) return e;
                            const [n] = t;
                            return n.length >= i.length ? e.slice(i.length) : e
                        }).join("\n")
                    }(e, t[3] || "");
                return {
                    type: "code",
                    raw: e,
                    lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
                    text: n
                }
            }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e);
            if (t) {
                let e = t[2].trim();
                if (/#$/.test(e)) {
                    const t = Ve(e, "#");
                    this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim())
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e);
            if (t) return {
                type: "hr",
                raw: t[0]
            }
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e);
            if (t) {
                const e = Ve(t[0].replace(/^ *>[ \t]?/gm, ""), "\n"),
                    n = this.lexer.state.top;
                this.lexer.state.top = !0;
                const i = this.lexer.blockTokens(e);
                return this.lexer.state.top = n, {
                    type: "blockquote",
                    raw: t[0],
                    tokens: i,
                    text: e
                }
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n = t[1].trim();
                const i = n.length > 1,
                    r = {
                        type: "list",
                        raw: "",
                        ordered: i,
                        start: i ? +n.slice(0, -1) : "",
                        loose: !1,
                        items: []
                    };
                n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
                const o = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                let s = "",
                    a = "",
                    l = !1;
                for (; e;) {
                    let n = !1;
                    if (!(t = o.exec(e))) break;
                    if (this.rules.block.hr.test(e)) break;
                    s = t[0], e = e.substring(s.length);
                    let i = t[2].split("\n", 1)[0].replace(/^\t+/, e => " ".repeat(3 * e.length)),
                        c = e.split("\n", 1)[0],
                        u = 0;
                    this.options.pedantic ? (u = 2, a = i.trimStart()) : (u = t[2].search(/[^ ]/), u = u > 4 ? 1 : u, a = i.slice(u), u += t[1].length);
                    let d = !1;
                    if (!i && /^ *$/.test(c) && (s += c + "\n", e = e.substring(c.length + 1), n = !0), !n) {
                        const t = new RegExp(`^ {0,${Math.min(3,u-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
                            n = new RegExp(`^ {0,${Math.min(3,u-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                            r = new RegExp(`^ {0,${Math.min(3,u-1)}}(?:\`\`\`|~~~)`),
                            o = new RegExp(`^ {0,${Math.min(3,u-1)}}#`);
                        for (; e;) {
                            const l = e.split("\n", 1)[0];
                            if (c = l, this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), r.test(c)) break;
                            if (o.test(c)) break;
                            if (t.test(c)) break;
                            if (n.test(e)) break;
                            if (c.search(/[^ ]/) >= u || !c.trim()) a += "\n" + c.slice(u);
                            else {
                                if (d) break;
                                if (i.search(/[^ ]/) >= 4) break;
                                if (r.test(i)) break;
                                if (o.test(i)) break;
                                if (n.test(i)) break;
                                a += "\n" + c
                            }
                            d || c.trim() || (d = !0), s += l + "\n", e = e.substring(l.length + 1), i = c.slice(u)
                        }
                    }
                    r.loose || (l ? r.loose = !0 : /\n *\n *$/.test(s) && (l = !0));
                    let h, p = null;
                    this.options.gfm && (p = /^\[[ xX]\] /.exec(a), p && (h = "[ ] " !== p[0], a = a.replace(/^\[[ xX]\] +/, ""))), r.items.push({
                        type: "list_item",
                        raw: s,
                        task: !!p,
                        checked: h,
                        loose: !1,
                        text: a,
                        tokens: []
                    }), r.raw += s
                }
                r.items[r.items.length - 1].raw = s.trimEnd(), r.items[r.items.length - 1].text = a.trimEnd(), r.raw = r.raw.trimEnd();
                for (let e = 0; e < r.items.length; e++)
                    if (this.lexer.state.top = !1, r.items[e].tokens = this.lexer.blockTokens(r.items[e].text, []), !r.loose) {
                        const t = r.items[e].tokens.filter(e => "space" === e.type),
                            n = t.length > 0 && t.some(e => /\n.*\n/.test(e.raw));
                        r.loose = n
                    } if (r.loose)
                    for (let e = 0; e < r.items.length; e++) r.items[e].loose = !0;
                return r
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e);
            if (t) return {
                type: "html",
                block: !0,
                raw: t[0],
                pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
                text: t[0]
            }
        }
        def(e) {
            const t = this.rules.block.def.exec(e);
            if (t) {
                const e = t[1].toLowerCase().replace(/\s+/g, " "),
                    n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                    i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
                return {
                    type: "def",
                    tag: e,
                    raw: t[0],
                    href: n,
                    title: i
                }
            }
        }
        table(e) {
            const t = this.rules.block.table.exec(e);
            if (!t) return;
            if (!/[:|]/.test(t[2])) return;
            const n = Ge(t[1]),
                i = t[2].replace(/^\||\| *$/g, "").split("|"),
                r = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
                o = {
                    type: "table",
                    raw: t[0],
                    header: [],
                    align: [],
                    rows: []
                };
            if (n.length === i.length) {
                for (const e of i) /^ *-+: *$/.test(e) ? o.align.push("right") : /^ *:-+: *$/.test(e) ? o.align.push("center") : /^ *:-+ *$/.test(e) ? o.align.push("left") : o.align.push(null);
                for (const e of n) o.header.push({
                    text: e,
                    tokens: this.lexer.inline(e)
                });
                for (const e of r) o.rows.push(Ge(e, o.header.length).map(e => ({
                    text: e,
                    tokens: this.lexer.inline(e)
                })));
                return o
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e);
            if (t) return {
                type: "heading",
                raw: t[0],
                depth: "=" === t[2].charAt(0) ? 1 : 2,
                text: t[1],
                tokens: this.lexer.inline(t[1])
            }
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e);
            if (t) {
                const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        text(e) {
            const t = this.rules.block.text.exec(e);
            if (t) return {
                type: "text",
                raw: t[0],
                text: t[0],
                tokens: this.lexer.inline(t[0])
            }
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e);
            if (t) return {
                type: "escape",
                raw: t[0],
                text: Fe(t[1])
            }
        }
        tag(e) {
            const t = this.rules.inline.tag.exec(e);
            if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
                type: "html",
                raw: t[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: !1,
                text: t[0]
            }
        }
        link(e) {
            const t = this.rules.inline.link.exec(e);
            if (t) {
                const e = t[2].trim();
                if (!this.options.pedantic && /^</.test(e)) {
                    if (!/>$/.test(e)) return;
                    const t = Ve(e.slice(0, -1), "\\");
                    if ((e.length - t.length) % 2 == 0) return
                } else {
                    const e = function(e, t) {
                        if (-1 === e.indexOf(t[1])) return -1;
                        let n = 0;
                        for (let i = 0; i < e.length; i++)
                            if ("\\" === e[i]) i++;
                            else if (e[i] === t[0]) n++;
                        else if (e[i] === t[1] && (n--, n < 0)) return i;
                        return -1
                    }(t[2], "()");
                    if (e > -1) {
                        const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                        t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = ""
                    }
                }
                let n = t[2],
                    i = "";
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                    e && (n = e[1], i = e[3])
                } else i = t[3] ? t[3].slice(1, -1) : "";
                return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), We(t, {
                    href: n ? n.replace(this.rules.inline.anyPunctuation, "$1") : n,
                    title: i ? i.replace(this.rules.inline.anyPunctuation, "$1") : i
                }, t[0], this.lexer)
            }
        }
        reflink(e, t) {
            let n;
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                const e = t[(n[2] || n[1]).replace(/\s+/g, " ").toLowerCase()];
                if (!e) {
                    const e = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: e,
                        text: e
                    }
                }
                return We(n, e, n[0], this.lexer)
            }
        }
        emStrong(e, t, n = "") {
            let i = this.rules.inline.emStrongLDelim.exec(e);
            if (i && (!i[3] || !n.match(/[\p{L}\p{N}]/u)) && (!i[1] && !i[2] || !n || this.rules.inline.punctuation.exec(n))) {
                const n = [...i[0]].length - 1;
                let r, o, s = n,
                    a = 0;
                const l = "*" === i[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                for (l.lastIndex = 0, t = t.slice(-1 * e.length + n); null != (i = l.exec(t));) {
                    if (r = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !r) continue;
                    if (o = [...r].length, i[3] || i[4]) {
                        s += o;
                        continue
                    }
                    if ((i[5] || i[6]) && n % 3 && !((n + o) % 3)) {
                        a += o;
                        continue
                    }
                    if (s -= o, s > 0) continue;
                    o = Math.min(o, o + s + a);
                    const t = [...i[0]][0].length,
                        l = e.slice(0, n + i.index + t + o);
                    if (Math.min(n, o) % 2) {
                        const e = l.slice(1, -1);
                        return {
                            type: "em",
                            raw: l,
                            text: e,
                            tokens: this.lexer.inlineTokens(e)
                        }
                    }
                    const c = l.slice(2, -2);
                    return {
                        type: "strong",
                        raw: l,
                        text: c,
                        tokens: this.lexer.inlineTokens(c)
                    }
                }
            }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e);
            if (t) {
                let e = t[2].replace(/\n/g, " ");
                const n = /[^ ]/.test(e),
                    i = /^ /.test(e) && / $/.test(e);
                return n && i && (e = e.substring(1, e.length - 1)), e = Fe(e, !0), {
                    type: "codespan",
                    raw: t[0],
                    text: e
                }
            }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e);
            if (t) return {
                type: "br",
                raw: t[0]
            }
        }
        del(e) {
            const t = this.rules.inline.del.exec(e);
            if (t) return {
                type: "del",
                raw: t[0],
                text: t[2],
                tokens: this.lexer.inlineTokens(t[2])
            }
        }
        autolink(e) {
            const t = this.rules.inline.autolink.exec(e);
            if (t) {
                let e, n;
                return "@" === t[2] ? (e = Fe(t[1]), n = "mailto:" + e) : (e = Fe(t[1]), n = e), {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        url(e) {
            let t;
            if (t = this.rules.inline.url.exec(e)) {
                let e, n;
                if ("@" === t[2]) e = Fe(t[0]), n = "mailto:" + e;
                else {
                    let i;
                    do {
                        i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? ""
                    } while (i !== t[0]);
                    e = Fe(t[0]), n = "www." === t[1] ? "http://" + t[0] : t[0]
                }
                return {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        inlineText(e) {
            const t = this.rules.inline.text.exec(e);
            if (t) {
                let e;
                return e = this.lexer.state.inRawBlock ? t[0] : Fe(t[0]), {
                    type: "text",
                    raw: t[0],
                    text: e
                }
            }
        }
    }
    const Ke = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        Ue = /(?:[*+-]|\d{1,9}[.)])/,
        Ye = qe(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Ue).getRegex(),
        Xe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        Je = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        et = qe(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", Je).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
        tt = qe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Ue).getRegex(),
        nt = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
        it = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
        rt = qe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", it).replace("tag", nt).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
        ot = qe(Xe).replace("hr", Ke).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", nt).getRegex(),
        st = {
            blockquote: qe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ot).getRegex(),
            code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
            def: et,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            hr: Ke,
            html: rt,
            lheading: Ye,
            list: tt,
            newline: /^(?: *(?:\n|$))+/,
            paragraph: ot,
            table: He,
            text: /^[^\n]+/
        },
        at = qe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ke).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", nt).getRegex(),
        lt = {
            ...st,
            table: at,
            paragraph: qe(Xe).replace("hr", Ke).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", at).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", nt).getRegex()
        },
        ct = {
            ...st,
            html: qe("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", it).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: He,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: qe(Xe).replace("hr", Ke).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Ye).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
        },
        ut = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        dt = /^( {2,}|\\)\n(?!\s*$)/,
        ht = "\\p{P}\\p{S}",
        pt = qe(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, ht).getRegex(),
        ft = qe(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, ht).getRegex(),
        gt = qe("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, ht).getRegex(),
        bt = qe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, ht).getRegex(),
        mt = qe(/\\([punct])/, "gu").replace(/punct/g, ht).getRegex(),
        wt = qe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
        xt = qe(it).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
        vt = qe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", xt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
        yt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
        kt = qe(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", yt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
        _t = qe(/^!?\[(label)\]\[(ref)\]/).replace("label", yt).replace("ref", Je).getRegex(),
        Tt = qe(/^!?\[(ref)\](?:\[\])?/).replace("ref", Je).getRegex(),
        Et = {
            _backpedal: He,
            anyPunctuation: mt,
            autolink: wt,
            blockSkip: /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
            br: dt,
            code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
            del: He,
            emStrongLDelim: ft,
            emStrongRDelimAst: gt,
            emStrongRDelimUnd: bt,
            escape: ut,
            link: kt,
            nolink: Tt,
            punctuation: pt,
            reflink: _t,
            reflinkSearch: qe("reflink|nolink(?!\\()", "g").replace("reflink", _t).replace("nolink", Tt).getRegex(),
            tag: vt,
            text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
            url: He
        },
        Rt = {
            ...Et,
            link: qe(/^!?\[(label)\]\((.*?)\)/).replace("label", yt).getRegex(),
            reflink: qe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", yt).getRegex()
        },
        St = {
            ...Et,
            escape: qe(ut).replace("])", "~|])").getRegex(),
            url: qe(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
            _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
        },
        $t = {
            ...St,
            br: qe(dt).replace("{2,}", "*").getRegex(),
            text: qe(St.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
        },
        Ct = {
            normal: st,
            gfm: lt,
            pedantic: ct
        },
        At = {
            normal: Et,
            gfm: St,
            breaks: $t,
            pedantic: Rt
        };
    class Pt {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Ae, this.options.tokenizer = this.options.tokenizer || new Qe, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            const t = {
                block: Ct.normal,
                inline: At.normal
            };
            this.options.pedantic ? (t.block = Ct.pedantic, t.inline = At.pedantic) : this.options.gfm && (t.block = Ct.gfm, t.inline = this.options.breaks ? At.breaks : At.gfm), this.tokenizer.rules = t
        }
        static get rules() {
            return {
                block: Ct,
                inline: At
            }
        }
        static lex(e, t) {
            return new Pt(t).lex(e)
        }
        static lexInline(e, t) {
            return new Pt(t).inlineTokens(e)
        }
        lex(e) {
            e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
            for (let e = 0; e < this.inlineQueue.length; e++) {
                const t = this.inlineQueue[e];
                this.inlineTokens(t.src, t.tokens)
            }
            return this.inlineQueue = [], this.tokens
        }
        blockTokens(e, t = []) {
            let n, i, r, o;
            for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + "    ".repeat(n.length)); e;)
                if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(i => !!(n = i.call({
                        lexer: this
                    }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0))))
                    if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), 1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);
                    else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), i = t[t.length - 1], !i || "paragraph" !== i.type && "text" !== i.type ? t.push(n) : (i.raw += "\n" + n.raw, i.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = i.text);
            else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), i = t[t.length - 1], !i || "paragraph" !== i.type && "text" !== i.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
                href: n.href,
                title: n.title
            }) : (i.raw += "\n" + n.raw, i.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = i.text);
            else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);
            else {
                if (r = e, this.options.extensions && this.options.extensions.startBlock) {
                    let t = Infinity;
                    const n = e.slice(1);
                    let i;
                    this.options.extensions.startBlock.forEach(e => {
                        i = e.call({
                            lexer: this
                        }, n), "number" == typeof i && i >= 0 && (t = Math.min(t, i))
                    }), t < Infinity && t >= 0 && (r = e.substring(0, t + 1))
                }
                if (this.state.top && (n = this.tokenizer.paragraph(r))) i = t[t.length - 1], o && "paragraph" === i.type ? (i.raw += "\n" + n.raw, i.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : t.push(n), o = r.length !== e.length, e = e.substring(n.raw.length);
                else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), i = t[t.length - 1], i && "text" === i.type ? (i.raw += "\n" + n.raw, i.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : t.push(n);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            }
            return this.state.top = !0, t
        }
        inline(e, t = []) {
            return this.inlineQueue.push({
                src: e,
                tokens: t
            }), t
        }
        inlineTokens(e, t = []) {
            let n, i, r, o, s, a, l = e;
            if (this.tokens.links) {
                const e = Object.keys(this.tokens.links);
                if (e.length > 0)
                    for (; null != (o = this.tokenizer.rules.inline.reflinkSearch.exec(l));) e.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (o = this.tokenizer.rules.inline.blockSkip.exec(l));) l = l.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (o = this.tokenizer.rules.inline.anyPunctuation.exec(l));) l = l.slice(0, o.index) + "++" + l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            for (; e;)
                if (s || (a = ""), s = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(i => !!(n = i.call({
                        lexer: this
                    }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0))))
                    if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);
                    else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), i = t[t.length - 1], i && "text" === n.type && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);
            else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), i = t[t.length - 1], i && "text" === n.type && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);
            else if (n = this.tokenizer.emStrong(e, l, a)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n);
            else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
                if (r = e, this.options.extensions && this.options.extensions.startInline) {
                    let t = Infinity;
                    const n = e.slice(1);
                    let i;
                    this.options.extensions.startInline.forEach(e => {
                        i = e.call({
                            lexer: this
                        }, n), "number" == typeof i && i >= 0 && (t = Math.min(t, i))
                    }), t < Infinity && t >= 0 && (r = e.substring(0, t + 1))
                }
                if (n = this.tokenizer.inlineText(r)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (a = n.raw.slice(-1)), s = !0, i = t[t.length - 1], i && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            } else e = e.substring(n.raw.length), t.push(n);
            return t
        }
    }
    class zt {
        options;
        constructor(e) {
            this.options = e || Ae
        }
        code(e, t, n) {
            const i = (t || "").match(/^\S*/)?.[0];
            return e = e.replace(/\n$/, "") + "\n", i ? '<pre><code class="language-' + Fe(i) + '">' + (n ? e : Fe(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : Fe(e, !0)) + "</code></pre>\n"
        }
        blockquote(e) {
            return `<blockquote>\n${e}</blockquote>\n`
        }
        html(e, t) {
            return e
        }
        heading(e, t, n) {
            return `<h${t}>${e}</h${t}>\n`
        }
        hr() {
            return "<hr>\n"
        }
        list(e, t, n) {
            const i = t ? "ol" : "ul";
            return "<" + i + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + i + ">\n"
        }
        listitem(e, t, n) {
            return `<li>${e}</li>\n`
        }
        checkbox(e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
        }
        paragraph(e) {
            return `<p>${e}</p>\n`
        }
        table(e, t) {
            return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        }
        tablerow(e) {
            return `<tr>\n${e}</tr>\n`
        }
        tablecell(e, t) {
            const n = t.header ? "th" : "td";
            return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
        }
        strong(e) {
            return `<strong>${e}</strong>`
        }
        em(e) {
            return `<em>${e}</em>`
        }
        codespan(e) {
            return `<code>${e}</code>`
        }
        br() {
            return "<br>"
        }
        del(e) {
            return `<del>${e}</del>`
        }
        link(e, t, n) {
            const i = Ze(e);
            if (null === i) return n;
            let r = '<a href="' + (e = i) + '"';
            return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r
        }
        image(e, t, n) {
            const i = Ze(e);
            if (null === i) return n;
            let r = `<img src="${e=i}" alt="${n}"`;
            return t && (r += ` title="${t}"`), r += ">", r
        }
        text(e) {
            return e
        }
    }
    class It {
        strong(e) {
            return e
        }
        em(e) {
            return e
        }
        codespan(e) {
            return e
        }
        del(e) {
            return e
        }
        html(e) {
            return e
        }
        text(e) {
            return e
        }
        link(e, t, n) {
            return "" + n
        }
        image(e, t, n) {
            return "" + n
        }
        br() {
            return ""
        }
    }
    class Ot {
        options;
        renderer;
        textRenderer;
        constructor(e) {
            this.options = e || Ae, this.options.renderer = this.options.renderer || new zt, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new It
        }
        static parse(e, t) {
            return new Ot(t).parse(e)
        }
        static parseInline(e, t) {
            return new Ot(t).parseInline(e)
        }
        parse(e, t = !0) {
            let n = "";
            for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
                    const e = r,
                        t = this.options.extensions.renderers[e.type].call({
                            parser: this
                        }, e);
                    if (!1 !== t || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e.type)) {
                        n += t || "";
                        continue
                    }
                }
                switch (r.type) {
                    case "space":
                        continue;
                    case "hr":
                        n += this.renderer.hr();
                        continue;
                    case "heading": {
                        const e = r;
                        n += this.renderer.heading(this.parseInline(e.tokens), e.depth, Me(this.parseInline(e.tokens, this.textRenderer)));
                        continue
                    }
                    case "code":
                        n += this.renderer.code(r.text, r.lang, !!r.escaped);
                        continue;
                    case "table": {
                        const e = r;
                        let t = "",
                            i = "";
                        for (let t = 0; t < e.header.length; t++) i += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
                            header: !0,
                            align: e.align[t]
                        });
                        t += this.renderer.tablerow(i);
                        let o = "";
                        for (let t = 0; t < e.rows.length; t++) {
                            const n = e.rows[t];
                            i = "";
                            for (let t = 0; t < n.length; t++) i += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                                header: !1,
                                align: e.align[t]
                            });
                            o += this.renderer.tablerow(i)
                        }
                        n += this.renderer.table(t, o);
                        continue
                    }
                    case "blockquote": {
                        const e = this.parse(r.tokens);
                        n += this.renderer.blockquote(e);
                        continue
                    }
                    case "list": {
                        const e = r,
                            t = e.ordered,
                            i = e.start,
                            o = e.loose;
                        let s = "";
                        for (let t = 0; t < e.items.length; t++) {
                            const n = e.items[t],
                                i = n.checked,
                                r = n.task;
                            let a = "";
                            if (n.task) {
                                const e = this.renderer.checkbox(!!i);
                                o ? n.tokens.length > 0 && "paragraph" === n.tokens[0].type ? (n.tokens[0].text = e + " " + n.tokens[0].text, n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && "text" === n.tokens[0].tokens[0].type && (n.tokens[0].tokens[0].text = e + " " + n.tokens[0].tokens[0].text)) : n.tokens.unshift({
                                    type: "text",
                                    text: e + " "
                                }) : a += e + " "
                            }
                            a += this.parse(n.tokens, o), s += this.renderer.listitem(a, r, !!i)
                        }
                        n += this.renderer.list(s, t, i);
                        continue
                    }
                    case "html":
                        n += this.renderer.html(r.text, r.block);
                        continue;
                    case "paragraph":
                        n += this.renderer.paragraph(this.parseInline(r.tokens));
                        continue;
                    case "text": {
                        let o = r,
                            s = o.tokens ? this.parseInline(o.tokens) : o.text;
                        for (; i + 1 < e.length && "text" === e[i + 1].type;) o = e[++i], s += "\n" + (o.tokens ? this.parseInline(o.tokens) : o.text);
                        n += t ? this.renderer.paragraph(s) : s;
                        continue
                    }
                    default: {
                        const e = 'Token with "' + r.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
        parseInline(e, t) {
            t = t || this.renderer;
            let n = "";
            for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
                    const e = this.options.extensions.renderers[r.type].call({
                        parser: this
                    }, r);
                    if (!1 !== e || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
                        n += e || "";
                        continue
                    }
                }
                switch (r.type) {
                    case "escape":
                    case "text":
                        n += t.text(r.text);
                        break;
                    case "html":
                        n += t.html(r.text);
                        break;
                    case "link":
                        n += t.link(r.href, r.title, this.parseInline(r.tokens, t));
                        break;
                    case "image":
                        n += t.image(r.href, r.title, r.text);
                        break;
                    case "strong":
                        n += t.strong(this.parseInline(r.tokens, t));
                        break;
                    case "em":
                        n += t.em(this.parseInline(r.tokens, t));
                        break;
                    case "codespan":
                        n += t.codespan(r.text);
                        break;
                    case "br":
                        n += t.br();
                        break;
                    case "del":
                        n += t.del(this.parseInline(r.tokens, t));
                        break;
                    default: {
                        const e = 'Token with "' + r.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
    }
    class Lt {
        options;
        constructor(e) {
            this.options = e || Ae
        }
        static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]);
        preprocess(e) {
            return e
        }
        postprocess(e) {
            return e
        }
        processAllTokens(e) {
            return e
        }
    }
    const Nt = new class {
        defaults = {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        };
        options = this.setOptions;
        parse = this.#e(Pt.lex, Ot.parse);
        parseInline = this.#e(Pt.lexInline, Ot.parseInline);
        Parser = Ot;
        Renderer = zt;
        TextRenderer = It;
        Lexer = Pt;
        Tokenizer = Qe;
        Hooks = Lt;
        constructor(...e) {
            this.use(...e)
        }
        walkTokens(e, t) {
            let n = [];
            for (const i of e) switch (n = n.concat(t.call(this, i)), i.type) {
                case "table": {
                    const e = i;
                    for (const i of e.header) n = n.concat(this.walkTokens(i.tokens, t));
                    for (const i of e.rows)
                        for (const e of i) n = n.concat(this.walkTokens(e.tokens, t));
                    break
                }
                case "list":
                    n = n.concat(this.walkTokens(i.items, t));
                    break;
                default: {
                    const e = i;
                    this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach(i => {
                        const r = e[i].flat(Infinity);
                        n = n.concat(this.walkTokens(r, t))
                    }) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)))
                }
            }
            return n
        }
        use(...e) {
            const t = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            return e.forEach(e => {
                const n = {
                    ...e
                };
                if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach(e => {
                        if (!e.name) throw new Error("extension name required");
                        if ("renderer" in e) {
                            const n = t.renderers[e.name];
                            t.renderers[e.name] = n ? function(...t) {
                                let i = e.renderer.apply(this, t);
                                return !1 === i && (i = n.apply(this, t)), i
                            } : e.renderer
                        }
                        if ("tokenizer" in e) {
                            if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
                            const n = t[e.level];
                            n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]))
                        }
                        "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens)
                    }), n.extensions = t), e.renderer) {
                    const t = this.defaults.renderer || new zt(this.defaults);
                    for (const n in e.renderer) {
                        if (!(n in t)) throw new Error(`renderer '${n}' does not exist`);
                        if ("options" === n) continue;
                        const i = e.renderer[n],
                            r = t[n];
                        t[n] = (...e) => {
                            let n = i.apply(t, e);
                            return !1 === n && (n = r.apply(t, e)), n || ""
                        }
                    }
                    n.renderer = t
                }
                if (e.tokenizer) {
                    const t = this.defaults.tokenizer || new Qe(this.defaults);
                    for (const n in e.tokenizer) {
                        if (!(n in t)) throw new Error(`tokenizer '${n}' does not exist`);
                        if (["options", "rules", "lexer"].includes(n)) continue;
                        const i = e.tokenizer[n],
                            r = t[n];
                        t[n] = (...e) => {
                            let n = i.apply(t, e);
                            return !1 === n && (n = r.apply(t, e)), n
                        }
                    }
                    n.tokenizer = t
                }
                if (e.hooks) {
                    const t = this.defaults.hooks || new Lt;
                    for (const n in e.hooks) {
                        if (!(n in t)) throw new Error(`hook '${n}' does not exist`);
                        if ("options" === n) continue;
                        const i = e.hooks[n],
                            r = t[n];
                        t[n] = Lt.passThroughHooks.has(n) ? e => {
                            if (this.defaults.async) return Promise.resolve(i.call(t, e)).then(e => r.call(t, e));
                            const n = i.call(t, e);
                            return r.call(t, n)
                        } : (...e) => {
                            let n = i.apply(t, e);
                            return !1 === n && (n = r.apply(t, e)), n
                        }
                    }
                    n.hooks = t
                }
                if (e.walkTokens) {
                    const t = this.defaults.walkTokens,
                        i = e.walkTokens;
                    n.walkTokens = function(e) {
                        let n = [];
                        return n.push(i.call(this, e)), t && (n = n.concat(t.call(this, e))), n
                    }
                }
                this.defaults = {
                    ...this.defaults,
                    ...n
                }
            }), this
        }
        setOptions(e) {
            return this.defaults = {
                ...this.defaults,
                ...e
            }, this
        }
        lexer(e, t) {
            return Pt.lex(e, t ?? this.defaults)
        }
        parser(e, t) {
            return Ot.parse(e, t ?? this.defaults)
        }
        #e(e, t) {
            return (n, i) => {
                const r = {
                        ...i
                    },
                    o = {
                        ...this.defaults,
                        ...r
                    };
                !0 === this.defaults.async && !1 === r.async && (o.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), o.async = !0);
                const s = this.#t(!!o.silent, !!o.async);
                if (null == n) return s(new Error("marked(): input parameter is undefined or null"));
                if ("string" != typeof n) return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
                if (o.hooks && (o.hooks.options = o), o.async) return Promise.resolve(o.hooks ? o.hooks.preprocess(n) : n).then(t => e(t, o)).then(e => o.hooks ? o.hooks.processAllTokens(e) : e).then(e => o.walkTokens ? Promise.all(this.walkTokens(e, o.walkTokens)).then(() => e) : e).then(e => t(e, o)).then(e => o.hooks ? o.hooks.postprocess(e) : e).catch(s);
                try {
                    o.hooks && (n = o.hooks.preprocess(n));
                    let i = e(n, o);
                    o.hooks && (i = o.hooks.processAllTokens(i)), o.walkTokens && this.walkTokens(i, o.walkTokens);
                    let r = t(i, o);
                    return o.hooks && (r = o.hooks.postprocess(r)), r
                } catch (e) {
                    return s(e)
                }
            }
        }
        #t(e, t) {
            return n => {
                if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
                    const e = "<p>An error occurred:</p><pre>" + Fe(n.message + "", !0) + "</pre>";
                    return t ? Promise.resolve(e) : e
                }
                if (t) return Promise.reject(n);
                throw n
            }
        }
    };

    function Dt(e, t) {
        return Nt.parse(e, t)
    }
    var Ft;

    function Bt(e, t, n) {
        if (!e.s) {
            if (n instanceof jt) {
                if (!n.s) return void(n.o = Bt.bind(null, e, t));
                1 & t && (t = n.s), n = n.v
            }
            if (n && n.then) return void n.then(Bt.bind(null, e, t), Bt.bind(null, e, 2));
            e.s = t, e.v = n;
            var i = e.o;
            i && i(e)
        }
    }
    Dt.options = Dt.setOptions = function(e) {
        return Nt.setOptions(e), Pe(Dt.defaults = Nt.defaults), Dt
    }, Dt.getDefaults = function() {
        return {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        }
    }, Dt.defaults = Ae, Dt.use = function(...e) {
        return Nt.use(...e), Pe(Dt.defaults = Nt.defaults), Dt
    }, Dt.walkTokens = function(e, t) {
        return Nt.walkTokens(e, t)
    }, Dt.parseInline = Nt.parseInline, Dt.Parser = Ot, Dt.parser = Ot.parse, Dt.Renderer = zt, Dt.TextRenderer = It, Dt.Lexer = Pt, Dt.lexer = Pt.lex, Dt.Tokenizer = Qe, Dt.Hooks = Lt, Dt.parse = Dt;
    //needs help here
    var Mt = function(t) {
            try {
                t.preventDefault();
                var n = t.target;
                if (!Qt.url) return console.error("Chat Widget: No URL provided"), Qt.disableErrorAlert || alert("Could not send chat message: No URL provided"), Promise.resolve();
                var i = document.getElementById("buildship-chat-widget__submit");
                i.setAttribute("disabled", "");
                var r = new Headers;
                r.append("Content-Type", "application/json");
                r.append("Authorization", "Bearer "+Qt.apiKey);

                var o = ({
                    prompt: n.elements.message.value,
                    model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
                    "max_tokens" : 10000,
                    "temperature": 0.5,
                    stream : Qt.stream
                });
                function e() {
                    return i.removeAttribute("disabled"), !1
                }
                n.reset(), Yt.prepend(Jt);
                var t = function(e, t) {
                    try {
                        var n = Promise.resolve(fetch(Qt.url, {
                            method: "POST",
                            headers: r,
                            body: JSON.stringify(o)
                        })).then(function(e) {
                            Jt.remove();
                            var t = Qt.stream ? Promise.resolve(on(e)).then(function() {}) : Promise.resolve(rn(e)).then(function() {});
                            if (t && t.then) return t.then(function() {})
                        })
                    } catch (e) {
                        return t(e)
                    }
                    return n && n.then ? n.then(void 0, t) : n
                }(0, function(e) {
                    Jt.remove(), console.error("Chat Widget:", e), Qt.disableErrorAlert || alert("Could not send message: " + e.message)
                });
                return t && t.then ? t.then(e) : e()
            } catch (t) {
                return Promise.reject(t)
            }
        },
        jt = /*#__PURE__*/ function() {
            function e() {}
            return e.prototype.then = function(t, n) {
                var i = new e,
                    r = this.s;
                if (r) {
                    var o = 1 & r ? t : n;
                    if (o) {
                        try {
                            Bt(i, 1, o(this.v))
                        } catch (e) {
                            Bt(i, 2, e)
                        }
                        return i
                    }
                    return this
                }
                return this.o = function(e) {
                    try {
                        var r = e.v;
                        1 & e.s ? Bt(i, 1, t ? t(r) : r) : n ? Bt(i, 1, n(r)) : Bt(i, 2, r)
                    } catch (e) {
                        Bt(i, 2, e)
                    }
                }, i
            }, e
        }();

    function qt(e) {
        return e instanceof jt && 1 & e.s
    }
    var Zt = function(e, t, n, update) {
        try {
            var i = document.getElementById("buildship-chat-widget__message--" + n + "--" + t);
            if (update && i) {
                var r = i.querySelector("p");
                r.innerHTML = e;
            } else {
                var i = document.createElement("div");
                i.classList.add("buildship-chat-widget__message"), i.classList.add("buildship-chat-widget__message--" + n), i.id = "buildship-chat-widget__message--" + n + "--" + t;
                var r = document.createElement("p");
                r.innerHTML = e, i.appendChild(r);
                var n = document.createElement("p");
                n.classList.add("buildship-chat-widget__message-timestamp"), n.textContent = ("0" + new Date(t).getHours()).slice(-2) + ":" + ("0" + new Date(t).getMinutes()).slice(-2), i.appendChild(n), Yt.prepend(i)
            }
            return Promise.resolve(); // Add this line
        } catch (e) {
            return Promise.reject(e)
        }
    },
    Ht = function() {
        try {
            var e = document.createElement("style");
            return e.innerHTML = ":root{--buildship-chat-widget-bg-color:#fff;--buildship-chat-widget-border-color:#e2e2e2;--buildship-chat-widget-shadow:rgba(7,0,20,.06) 0px 0px 0px 1px,rgba(7,0,20,.1) 0px 10px 15px -3px,rgba(7,0,20,.05) 0px 4px 6px,rgba(7,0,20,.05) 0px 30px 40px;--buildship-chat-widget-primary-color-text:#000;--buildship-chat-widget-secondary-color-text:#979797;--buildship-chat-widget-user-message-text-color:#fff;--buildship-chat-widget-user-message-bg-color:#2c91ed;--buildship-chat-widget-system-message-text-color:#000;--buildship-chat-widget-system-message-bg-color:#e4e4e4;--buildship-chat-widget-primary-color:#2c91ed;--buildship-chat-widget-header-height:4rem;--buildship-chat-widget-button-transition:background-color 0.2s ease-in-out,opacity 0.2s ease-in-out,transform 0.2s ease-in-out;--buildship-chat-widget-title-weight:600;--buildship-chat-widget-button-weight:500;--buildship-chat-widget-border-radius:1rem}@media (prefers-color-scheme:dark){:root{--buildship-chat-widget-bg-color:#2d2d30;--buildship-chat-widget-border-color:#424244;--buildship-chat-widget-shadow:rgba(0,0,5,.24) 0px 0px 0px 1px,rgba(0,0,5,.4) 0px 10px 15px -3px,rgba(0,0,5,.2) 0px 4px 6px,rgba(0,0,5,.2) 0px 30px 40px;--buildship-chat-widget-primary-color-text:#fff;--buildship-chat-widget-secondary-color-text:#818183;--buildship-chat-widget-user-message-text-color:#fff;--buildship-chat-widget-user-message-bg-color:#2c91ed;--buildship-chat-widget-system-message-text-color:#fff;--buildship-chat-widget-system-message-bg-color:#424244}}[data-theme=light]{--buildship-chat-widget-bg-color:#fff;--buildship-chat-widget-border-color:#e2e2e2;--buildship-chat-widget-shadow:rgba(7,0,20,.06) 0px 0px 0px 1px,rgba(7,0,20,.1) 0px 10px 15px -3px,rgba(7,0,20,.05) 0px 4px 6px,rgba(7,0,20,.05) 0px 30px 40px;--buildship-chat-widget-primary-color-text:#000;--buildship-chat-widget-secondary-color-text:#979797;--buildship-chat-widget-user-message-text-color:#fff;--buildship-chat-widget-user-message-bg-color:#2c91ed;--buildship-chat-widget-system-message-text-color:#000;--buildship-chat-widget-system-message-bg-color:#e4e4e4}[data-theme=dark]{--buildship-chat-widget-bg-color:#2d2d30;--buildship-chat-widget-border-color:#424244;--buildship-chat-widget-shadow:rgba(0,0,5,.24) 0px 0px 0px 1px,rgba(0,0,5,.4) 0px 10px 15px -3px,rgba(0,0,5,.2) 0px 4px 6px,rgba(0,0,5,.2) 0px 30px 40px;--buildship-chat-widget-primary-color-text:#fff;--buildship-chat-widget-secondary-color-text:#818183;--buildship-chat-widget-user-message-text-color:#fff;--buildship-chat-widget-user-message-bg-color:#2c91ed;--buildship-chat-widget-system-message-text-color:#fff;--buildship-chat-widget-system-message-bg-color:#424244}#buildship-chat-widget__container{background-color:var(--buildship-chat-widget-bg-color);border-radius:var(--buildship-chat-widget-border-radius);box-shadow:var(--buildship-chat-widget-shadow);box-sizing:border-box;color:var(--buildship-chat-widget-primary-color-text);font-family:Open Sans;font-size:1rem;height:40rem;position:fixed;width:25rem;z-index:9999}#buildship-chat-widget__container *{box-sizing:border-box}#buildship-chat-widget__container :focus{outline:none}#buildship-chat-widget__backdrop{background-color:transparent;box-sizing:border-box;height:100vh;left:0;position:fixed;top:0;width:100vw;z-index:9998}#buildship-chat-widget__header{align-items:center;border-bottom:2px solid var(--buildship-chat-widget-border-color);display:flex;height:var(--buildship-chat-widget-header-height);justify-content:space-between;padding:1rem}#buildship-chat-widget__title{align-items:center;display:flex;font-weight:var(--buildship-chat-widget-title-weight);width:60%}#buildship-chat-widget__title_icon{margin-right:.5rem}#buildship-chat-widget__title_icon path{fill:var(--buildship-chat-widget-primary-color-text)}#buildship-chat-widget__title_text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}#buildship-chat-widget__branding{color:var(--buildship-chat-widget-secondary-color-text);font-size:.75rem;text-decoration:none}#buildship-chat-widget__branding>span{color:var(--buildship-chat-widget-primary-color-text)}#buildship-chat-widget__body{display:flex;flex-direction:column;height:calc(100% - var(--buildship-chat-widget-header-height));padding:1rem;position:relative;width:100%}#buildship-chat-widget__messages_history{-ms-overflow-style:none;display:flex;flex-direction:column-reverse;flex-grow:1;overflow-y:auto;scrollbar-width:none}#buildship-chat-widget__messages_history::-webkit-scrollbar{display:none}#buildship-chat-widget__messages_history .buildship-chat-widget__message{animation:fade-in .75s;border-radius:var(--buildship-chat-widget-border-radius);margin-bottom:.5rem;max-width:85%;padding:1rem}#buildship-chat-widget__messages_history p{word-wrap:break-word;margin:0}#buildship-chat-widget__messages_history img{max-width:100%;-o-object-fit:cover;object-fit:cover}#buildship-chat-widget__messages_history code{display:inline-block;max-width:100%;overflow-x:auto;vertical-align:bottom}#buildship-chat-widget__messages_history .buildship-chat-widget__message .buildship-chat-widget__message-timestamp{font-size:.8rem;margin-top:.5rem;opacity:.5}#buildship-chat-widget__messages_history .buildship-chat-widget__message.buildship-chat-widget__message--system{align-self:flex-start;background-color:var(--buildship-chat-widget-system-message-bg-color)}#buildship-chat-widget__messages_history .buildship-chat-widget__message.buildship-chat-widget__message--system p{color:var(--buildship-chat-widget-system-message-text-color)}#buildship-chat-widget__messages_history .buildship-chat-widget__message.buildship-chat-widget__message--user{align-self:flex-end;background-color:var(--buildship-chat-widget-user-message-bg-color)}#buildship-chat-widget__messages_history .buildship-chat-widget__message.buildship-chat-widget__message--user p{color:var(--buildship-chat-widget-user-message-text-color)}#buildship-chat-widget__messages_history .buildship-chat-widget__message.buildship-chat-widget__message--user .buildship-chat-widget__message-timestamp{text-align:right}@keyframes fade-in{0%{opacity:0}to{opacity:1}}#buildship-chat-widget__thinking_bubble{align-items:center;animation:fade-in .75s;background-color:var(--buildship-chat-widget-system-message-bg-color);border-radius:var(--buildship-chat-widget-border-radius);display:flex;justify-content:space-between;margin-bottom:.5rem;padding:1rem;width:80px}#buildship-chat-widget__thinking_bubble .circle{animation:bounce 1.5s infinite;background-color:var(--buildship-chat-widget-system-message-text-color);border-radius:50%;height:12px;opacity:.5;width:12px}#buildship-chat-widget__thinking_bubble .circle:first-child{animation-delay:1s}#buildship-chat-widget__thinking_bubble .circle:nth-child(2){animation-delay:1.1s}#buildship-chat-widget__thinking_bubble .circle:nth-child(3){animation-delay:1.2s}@keyframes bounce{0%{transform:translateY(0)}20%{transform:translateY(-.5rem)}40%{transform:translateY(0)}to{transform:translateY(0)}}#buildship-chat-widget__form{display:flex;gap:.5rem;margin-bottom:0;margin-top:1rem;position:relative;width:100%}#buildship-chat-widget__input{background:none;border:2px solid var(--buildship-chat-widget-border-color);border-radius:23px;color:inherit;flex-grow:1;font:Open Sans;padding:.5rem 1rem;resize:none}#buildship-chat-widget__input:focus{border-color:var(--buildship-chat-widget-primary-color);box-shadow:none}#buildship-chat-widget__submit{align-items:center;background-color:var(--buildship-chat-widget-primary-color);border:none;border-radius:50%;color:inherit;color:var(--buildship-chat-widget-primary-color-text);cursor:pointer;display:flex;justify-content:center;line-height:2rem;min-height:2rem;padding:1rem;position:relative;transition:var(--buildship-chat-widget-button-transition)}#buildship-chat-widget__submit:hover{transform:scale(1.05);transition-duration:0s}#buildship-chat-widget__submit:active{transform:scale(.95);transition-duration:0s}#buildship-chat-widget__submit[disabled]{background-color:var(--buildship-chat-widget-border-color);cursor:default;opacity:.5}", document.head.insertBefore(e, document.head.firstChild), Promise.resolve(new Promise(function(e) {
                return setTimeout(e, 500)
            })).then(function() {
                var e;
                null == (e = document.querySelector("[data-buildship-chat-widget-button]")) || e.addEventListener("click", tn), Qt.openOnLoad && tn({
                    target: document.querySelector("[data-buildship-chat-widget-button]")
                })
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },
    Gt = "buildship-chat-widget__backdrop",
    Vt = new Dt.Renderer,
    Wt = Vt.link;
    Vt.link = function(e, t, n) {
        return Wt.call(Vt, e, t, n).replace(/^<a /, '<a target="_blank" rel="nofollow" ')
    };
    var Qt = e({
            url: "",
            apiKey: "",
            sysPrompt: "",
            threadId: null,
            max_tokens : 10000,
            temperature: 0,
            stream: "True",
            responseIsAStream: !1,
            user: {},
            widgetTitle: "Chatbot",
            greetingMessage: null,
            disableErrorAlert: !1,
            closeOnOutsideClick: !0,
            openOnLoad: !1
        }, null == (Ft = window.buildShipChatWidget) ? void 0 : Ft.config),
        Kt = function() {};
    window.addEventListener("load", Ht);
    var Ut = document.createElement("div");
    Ut.id = "buildship-chat-widget__container";
    var Yt = document.createElement("div");
    Yt.id = "buildship-chat-widget__messages_history";
    var Xt = document.createElement("div");
    Xt.id = Gt;
    var Jt = document.createElement("div");
    Jt.id = "buildship-chat-widget__thinking_bubble", Jt.innerHTML = '\n    <span class="circle"></span>\n    <span class="circle"></span>\n    <span class="circle"></span>\n  ';
    var en = function(e, t) {
        var n, i = (null == t ? void 0 : t.document) || document,
            r = (null == t ? void 0 : t.trapStack) || Ce,
            o = ye({
                returnFocusOnDeactivate: !0,
                escapeDeactivates: !0,
                delayInitialFocus: !0,
                isKeyForward: _e,
                isKeyBackward: Te
            }, t),
            s = {
                containers: [],
                containerGroups: [],
                tabbableGroups: [],
                nodeFocusedBeforeActivation: null,
                mostRecentlyFocusedNode: null,
                active: !1,
                paused: !1,
                delayInitialFocusTimer: void 0,
                recentNavEvent: void 0
            },
            a = function(e, t, n) {
                return e && void 0 !== e[t] ? e[t] : o[n || t]
            },
            l = function(e, t) {
                var n = "function" == typeof(null == t ? void 0 : t.composedPath) ? t.composedPath() : void 0;
                return s.containerGroups.findIndex(function(t) {
                    var i = t.container,
                        r = t.tabbableNodes;
                    return i.contains(e) || (null == n ? void 0 : n.includes(i)) || r.find(function(t) {
                        return t === e
                    })
                })
            },
            c = function(e) {
                var t = o[e];
                if ("function" == typeof t) {
                    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
                    t = t.apply(void 0, r)
                }
                if (!0 === t && (t = void 0), !t) {
                    if (void 0 === t || !1 === t) return t;
                    throw new Error("`".concat(e, "` was specified but was not a node, or did not return a node"))
                }
                var a = t;
                if ("string" == typeof t && !(a = i.querySelector(t))) throw new Error("`".concat(e, "` as selector refers to no known node"));
                return a
            },
            u = function() {
                var e = c("initialFocus");
                if (!1 === e) return !1;
                if (void 0 === e || !xe(e, o.tabbableOptions))
                    if (l(i.activeElement) >= 0) e = i.activeElement;
                    else {
                        var t = s.tabbableGroups[0];
                        e = t && t.firstTabbableNode || c("fallbackFocus")
                    } if (!e) throw new Error("Your focus-trap needs to have at least one focusable element");
                return e
            },
            d = function() {
                if (s.containerGroups = s.containers.map(function(e) {
                        var t = function(e, t) {
                                var n;
                                return n = (t = t || {}).getShadowRoot ? ae([e], t.includeContainer, {
                                    filter: fe.bind(null, t),
                                    flatten: !1,
                                    getShadowRoot: t.getShadowRoot,
                                    shadowRootFilter: ge
                                }) : se(e, t.includeContainer, fe.bind(null, t)), be(n)
                            }(e, o.tabbableOptions),
                            n = function(e, t) {
                                return (t = t || {}).getShadowRoot ? ae([e], t.includeContainer, {
                                    filter: pe.bind(null, t),
                                    flatten: !0,
                                    getShadowRoot: t.getShadowRoot
                                }) : se(e, t.includeContainer, pe.bind(null, t))
                            }(e, o.tabbableOptions),
                            i = t.length > 0 ? t[0] : void 0,
                            r = t.length > 0 ? t[t.length - 1] : void 0,
                            s = n.find(function(e) {
                                return me(e)
                            }),
                            a = n.slice().reverse().find(function(e) {
                                return me(e)
                            }),
                            l = !!t.find(function(e) {
                                return ce(e) > 0
                            });
                        return {
                            container: e,
                            tabbableNodes: t,
                            focusableNodes: n,
                            posTabIndexesFound: l,
                            firstTabbableNode: i,
                            lastTabbableNode: r,
                            firstDomTabbableNode: s,
                            lastDomTabbableNode: a,
                            nextTabbableNode: function(e) {
                                var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                                    r = t.indexOf(e);
                                return r < 0 ? i ? n.slice(n.indexOf(e) + 1).find(function(e) {
                                    return me(e)
                                }) : n.slice(0, n.indexOf(e)).reverse().find(function(e) {
                                    return me(e)
                                }) : t[r + (i ? 1 : -1)]
                            }
                        }
                    }), s.tabbableGroups = s.containerGroups.filter(function(e) {
                        return e.tabbableNodes.length > 0
                    }), s.tabbableGroups.length <= 0 && !c("fallbackFocus")) throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
                if (s.containerGroups.find(function(e) {
                        return e.posTabIndexesFound
                    }) && s.containerGroups.length > 1) throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.")
            },
            h = function e(t) {
                var n = t.activeElement;
                if (n) return n.shadowRoot && null !== n.shadowRoot.activeElement ? e(n.shadowRoot) : n
            },
            p = function e(t) {
                !1 !== t && t !== h(document) && (t && t.focus ? (t.focus({
                    preventScroll: !!o.preventScroll
                }), s.mostRecentlyFocusedNode = t, function(e) {
                    return e.tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select
                }(t) && t.select()) : e(u()))
            },
            f = function(e) {
                var t = c("setReturnFocus", e);
                return t || !1 !== t && e
            },
            g = function(e) {
                var t = e.target,
                    n = e.event,
                    i = e.isBackward,
                    r = void 0 !== i && i;
                t = t || $e(n), d();
                var a = null;
                if (s.tabbableGroups.length > 0) {
                    var u = l(t, n),
                        h = u >= 0 ? s.containerGroups[u] : void 0;
                    if (u < 0) a = r ? s.tabbableGroups[s.tabbableGroups.length - 1].lastTabbableNode : s.tabbableGroups[0].firstTabbableNode;
                    else if (r) {
                        var p = Re(s.tabbableGroups, function(e) {
                            return t === e.firstTabbableNode
                        });
                        if (p < 0 && (h.container === t || xe(t, o.tabbableOptions) && !me(t, o.tabbableOptions) && !h.nextTabbableNode(t, !1)) && (p = u), p >= 0) {
                            var f = s.tabbableGroups[0 === p ? s.tabbableGroups.length - 1 : p - 1];
                            a = ce(t) >= 0 ? f.lastTabbableNode : f.lastDomTabbableNode
                        } else ke(n) || (a = h.nextTabbableNode(t, !1))
                    } else {
                        var g = Re(s.tabbableGroups, function(e) {
                            return t === e.lastTabbableNode
                        });
                        if (g < 0 && (h.container === t || xe(t, o.tabbableOptions) && !me(t, o.tabbableOptions) && !h.nextTabbableNode(t)) && (g = u), g >= 0) {
                            var b = s.tabbableGroups[g === s.tabbableGroups.length - 1 ? 0 : g + 1];
                            a = ce(t) >= 0 ? b.firstTabbableNode : b.firstDomTabbableNode
                        } else ke(n) || (a = h.nextTabbableNode(t))
                    }
                } else a = c("fallbackFocus");
                return a
            },
            b = function(e) {
                var t = $e(e);
                l(t, e) >= 0 || (Se(o.clickOutsideDeactivates, e) ? n.deactivate({
                    returnFocus: o.returnFocusOnDeactivate
                }) : Se(o.allowOutsideClick, e) || e.preventDefault())
            },
            m = function(e) {
                var t = $e(e),
                    n = l(t, e) >= 0;
                if (n || t instanceof Document) n && (s.mostRecentlyFocusedNode = t);
                else {
                    var i;
                    e.stopImmediatePropagation();
                    var r = !0;
                    if (s.mostRecentlyFocusedNode)
                        if (ce(s.mostRecentlyFocusedNode) > 0) {
                            var a = l(s.mostRecentlyFocusedNode),
                                c = s.containerGroups[a].tabbableNodes;
                            if (c.length > 0) {
                                var d = c.findIndex(function(e) {
                                    return e === s.mostRecentlyFocusedNode
                                });
                                d >= 0 && (o.isKeyForward(s.recentNavEvent) ? d + 1 < c.length && (i = c[d + 1], r = !1) : d - 1 >= 0 && (i = c[d - 1], r = !1))
                            }
                        } else s.containerGroups.some(function(e) {
                            return e.tabbableNodes.some(function(e) {
                                return ce(e) > 0
                            })
                        }) || (r = !1);
                    else r = !1;
                    r && (i = g({
                        target: s.mostRecentlyFocusedNode,
                        isBackward: o.isKeyBackward(s.recentNavEvent)
                    })), p(i || s.mostRecentlyFocusedNode || u())
                }
                s.recentNavEvent = void 0
            },
            w = function(e) {
                if (("Escape" === (null == (t = e) ? void 0 : t.key) || "Esc" === (null == t ? void 0 : t.key) || 27 === (null == t ? void 0 : t.keyCode)) && !1 !== Se(o.escapeDeactivates, e)) return e.preventDefault(), void n.deactivate();
                var t;
                (o.isKeyForward(e) || o.isKeyBackward(e)) && function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    s.recentNavEvent = e;
                    var n = g({
                        event: e,
                        isBackward: t
                    });
                    n && (ke(e) && e.preventDefault(), p(n))
                }(e, o.isKeyBackward(e))
            },
            x = function(e) {
                var t = $e(e);
                l(t, e) >= 0 || Se(o.clickOutsideDeactivates, e) || Se(o.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation())
            },
            v = function() {
                if (s.active) return function(e, t) {
                    if (e.length > 0) {
                        var n = e[e.length - 1];
                        n !== t && n.pause()
                    }
                    var i = e.indexOf(t); - 1 === i || e.splice(i, 1), e.push(t)
                }(r, n), s.delayInitialFocusTimer = o.delayInitialFocus ? Ee(function() {
                    p(u())
                }) : p(u()), i.addEventListener("focusin", m, !0), i.addEventListener("mousedown", b, {
                    capture: !0,
                    passive: !1
                }), i.addEventListener("touchstart", b, {
                    capture: !0,
                    passive: !1
                }), i.addEventListener("click", x, {
                    capture: !0,
                    passive: !1
                }), i.addEventListener("keydown", w, {
                    capture: !0,
                    passive: !1
                }), n
            },
            y = function() {
                if (s.active) return i.removeEventListener("focusin", m, !0), i.removeEventListener("mousedown", b, !0), i.removeEventListener("touchstart", b, !0), i.removeEventListener("click", x, !0), i.removeEventListener("keydown", w, !0), n
            },
            k = "undefined" != typeof window && "MutationObserver" in window ? new MutationObserver(function(e) {
                e.some(function(e) {
                    return Array.from(e.removedNodes).some(function(e) {
                        return e === s.mostRecentlyFocusedNode
                    })
                }) && p(u())
            }) : void 0,
            _ = function() {
                k && (k.disconnect(), s.active && !s.paused && s.containers.map(function(e) {
                    k.observe(e, {
                        subtree: !0,
                        childList: !0
                    })
                }))
            };
        return (n = {
            get active() {
                return s.active
            },
            get paused() {
                return s.paused
            },
            activate: function(e) {
                if (s.active) return this;
                var t = a(e, "onActivate"),
                    n = a(e, "onPostActivate"),
                    r = a(e, "checkCanFocusTrap");
                r || d(), s.active = !0, s.paused = !1, s.nodeFocusedBeforeActivation = i.activeElement, null == t || t();
                var o = function() {
                    r && d(), v(), _(), null == n || n()
                };
                return r ? (r(s.containers.concat()).then(o, o), this) : (o(), this)
            },
            deactivate: function(e) {
                if (!s.active) return this;
                var t = ye({
                    onDeactivate: o.onDeactivate,
                    onPostDeactivate: o.onPostDeactivate,
                    checkCanReturnFocus: o.checkCanReturnFocus
                }, e);
                clearTimeout(s.delayInitialFocusTimer), s.delayInitialFocusTimer = void 0, y(), s.active = !1, s.paused = !1, _(),
                    function(e, t) {
                        var n = e.indexOf(t); - 1 !== n && e.splice(n, 1), e.length > 0 && e[e.length - 1].unpause()
                    }(r, n);
                var i = a(t, "onDeactivate"),
                    l = a(t, "onPostDeactivate"),
                    c = a(t, "checkCanReturnFocus"),
                    u = a(t, "returnFocus", "returnFocusOnDeactivate");
                null == i || i();
                var d = function() {
                    Ee(function() {
                        u && p(f(s.nodeFocusedBeforeActivation)), null == l || l()
                    })
                };
                return u && c ? (c(f(s.nodeFocusedBeforeActivation)).then(d, d), this) : (d(), this)
            },
            pause: function(e) {
                if (s.paused || !s.active) return this;
                var t = a(e, "onPause"),
                    n = a(e, "onPostPause");
                return s.paused = !0, null == t || t(), y(), _(), null == n || n(), this
            },
            unpause: function(e) {
                if (!s.paused || !s.active) return this;
                var t = a(e, "onUnpause"),
                    n = a(e, "onPostUnpause");
                return s.paused = !1, null == t || t(), d(), v(), _(), null == n || n(), this
            },
            updateContainerElements: function(e) {
                var t = [].concat(e).filter(Boolean);
                return s.containers = t.map(function(e) {
                    return "string" == typeof e ? i.querySelector(e) : e
                }), s.active && d(), _(), this
            }
        }).updateContainerElements(e), n
    }(Ut, {
        initialFocus: "#buildship-chat-widget__input",
        allowOutsideClick: !0
    });

    function tn(e) {
        Qt.closeOnOutsideClick && document.body.appendChild(Xt), document.body.appendChild(Ut), Ut.innerHTML = '<div id="buildship-chat-widget__header"><div id="buildship-chat-widget__title"><svg id="buildship-chat-widget__title_icon" width="24" height="19" viewBox="0 0 24 19"><path d="M9 6C9.55229 6 10 6.44772 10 7V9C10 9.55228 9.55229 10 9 10C8.44771 10 8 9.55228 8 9V7C8 6.44772 8.44771 6 9 6Z"/><path d="M16 7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7V9C14 9.55228 14.4477 10 15 10C15.5523 10 16 9.55228 16 9V7Z"/><path d="M19.2099 16C19.0086 16 18.815 16.0768 18.6684 16.2147L16.4858 18.269C15.2525 19.4298 13.2248 18.6278 13.1191 16.9374C13.0862 16.4105 12.6493 16 12.1213 16H5C3.34315 16 2 14.6569 2 13V9C2 9.55228 1.55228 10 1 10C0.447715 10 0 9.55228 0 9V6C0 5.44772 0.447715 5 1 5C1.55228 5 2 5.44772 2 6V3C2 1.34315 3.34315 0 5 0H19C20.6569 0 22 1.34315 22 3V6C22 5.44772 22.4477 5 23 5C23.5523 5 24 5.44772 24 6V9C24 9.55228 23.5523 10 23 10C22.4477 10 22 9.55228 22 9V13.2099C22 14.7508 20.7508 16 19.2099 16ZM5 2C4.44772 2 4 2.44772 4 3V13C4 13.5523 4.44772 14 5 14H12.1213C13.7053 14 15.0163 15.2315 15.1152 16.8124L17.2977 14.7583C17.8152 14.2712 18.4992 14 19.2099 14C19.6463 14 20 13.6463 20 13.2099V3C20 2.44772 19.5523 2 19 2H5Z"/></svg></div><div><a id="buildship-chat-widget__branding" href="https://llm.eng.vmware.com" target="_blank">Powered by <span>LLM.eng.vmware.com</span></a></div></div><div id="buildship-chat-widget__body"><form id="buildship-chat-widget__form"><input autocomplete="off" id="buildship-chat-widget__input" name="message" type="text" placeholder="Ask me a question…" required aria-label="Message"><button id="buildship-chat-widget__submit" type="submit"><svg width="14" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 7L15 7M15 7L9 13M15 7L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form></div>', Ut.style.display = "block";
        var i = document.createElement("span");
        i.id = "buildship-chat-widget__title_text", i.textContent = Qt.widgetTitle, document.getElementById("buildship-chat-widget__title").appendChild(i), document.getElementById("buildship-chat-widget__body").prepend(Yt), Qt.greetingMessage && 0 === Yt.children.length && Zt(Qt.greetingMessage, Date.now(), "system");
        var o = (null == e ? void 0 : e.target) || document.body;
        Kt = function(e, i, o, s) {
            void 0 === s && (s = {});
            const {
                ancestorScroll: a = !0,
                ancestorResize: l = !0,
                elementResize: c = "function" == typeof ResizeObserver,
                layoutShift: u = "function" == typeof IntersectionObserver,
                animationFrame: d = !1
            } = s, h = B(e), p = a || l ? [...h ? D(h) : [], ...D(i)] : [];
            p.forEach(e => {
                a && e.addEventListener("scroll", o, {
                    passive: !0
                }), l && e.addEventListener("resize", o)
            });
            const f = h && u ? function(e, i) {
                let o, s = null;
                const a = _(e);

                function l() {
                    var e;
                    clearTimeout(o), null == (e = s) || e.disconnect(), s = null
                }
                return function c(u, d) {
                    void 0 === u && (u = !1), void 0 === d && (d = 1), l();
                    const {
                        left: h,
                        top: p,
                        width: f,
                        height: g
                    } = e.getBoundingClientRect();
                    if (u || i(), !f || !g) return;
                    const b = {
                        rootMargin: -r(p) + "px " + -r(a.clientWidth - (h + f)) + "px " + -r(a.clientHeight - (p + g)) + "px " + -r(h) + "px",
                        threshold: n(0, t(1, d)) || 1
                    };
                    let m = !0;

                    function w(e) {
                        const t = e[0].intersectionRatio;
                        if (t !== d) {
                            if (!m) return c();
                            t ? c(!1, t) : o = setTimeout(() => {
                                c(!1, 1e-7)
                            }, 100)
                        }
                        m = !1
                    }
                    try {
                        s = new IntersectionObserver(w, {
                            ...b,
                            root: a.ownerDocument
                        })
                    } catch (e) {
                        s = new IntersectionObserver(w, b)
                    }
                    s.observe(e)
                }(!0), l
            }(h, o) : null;
            let g, b = -1,
                m = null;
            c && (m = new ResizeObserver(e => {
                let [t] = e;
                t && t.target === h && m && (m.unobserve(i), cancelAnimationFrame(b), b = requestAnimationFrame(() => {
                    var e;
                    null == (e = m) || e.observe(i)
                })), o()
            }), h && !d && m.observe(h), m.observe(i));
            let w = d ? Z(e) : null;
            return d && function t() {
                const n = Z(e);
                !w || n.x === w.x && n.y === w.y && n.width === w.width && n.height === w.height || o(), w = n, g = requestAnimationFrame(t)
            }(), o(), () => {
                var e;
                p.forEach(e => {
                    a && e.removeEventListener("scroll", o), l && e.removeEventListener("resize", o)
                }), null == f || f(), null == (e = m) || e.disconnect(), m = null, d && cancelAnimationFrame(g)
            }
        }(o, Ut, function() {
            var e;
            ((e, t, n) => {
                const i = new Map,
                    r = {
                        platform: X,
                        ...n
                    },
                    o = {
                        ...r.platform,
                        _c: i
                    };
                return (async (e, t, n) => {
                    const {
                        placement: i = "bottom",
                        strategy: r = "absolute",
                        middleware: o = [],
                        platform: s
                    } = n, a = o.filter(Boolean), l = await (null == s.isRTL ? void 0 : s.isRTL(t));
                    let c = await s.getElementRects({
                            reference: e,
                            floating: t,
                            strategy: r
                        }),
                        {
                            x: u,
                            y: d
                        } = x(c, i, l),
                        h = i,
                        p = {},
                        f = 0;
                    for (let n = 0; n < a.length; n++) {
                        const {
                            name: o,
                            fn: g
                        } = a[n], {
                            x: b,
                            y: m,
                            data: w,
                            reset: v
                        } = await g({
                            x: u,
                            y: d,
                            initialPlacement: i,
                            placement: h,
                            strategy: r,
                            middlewareData: p,
                            rects: c,
                            platform: s,
                            elements: {
                                reference: e,
                                floating: t
                            }
                        });
                        u = null != b ? b : u, d = null != m ? m : d, p = {
                            ...p,
                            [o]: {
                                ...p[o],
                                ...w
                            }
                        }, v && f <= 50 && (f++, "object" == typeof v && (v.placement && (h = v.placement), v.rects && (c = !0 === v.rects ? await s.getElementRects({
                            reference: e,
                            floating: t,
                            strategy: r
                        }) : v.rects), ({
                            x: u,
                            y: d
                        } = x(c, h, l))), n = -1)
                    }
                    return {
                        x: u,
                        y: d,
                        placement: h,
                        strategy: r,
                        middlewareData: p
                    }
                })(e, t, {
                    ...r,
                    platform: o
                })
            })(o, Ut, {
                placement: "top-start",
                middleware: [J(), (e = {
                    crossAxis: !0,
                    padding: 8
                }, void 0 === e && (e = {}), {
                    name: "shift",
                    options: e,
                    async fn(t) {
                        const {
                            x: n,
                            y: i,
                            placement: r
                        } = t, {
                            mainAxis: o = !0,
                            crossAxis: s = !1,
                            limiter: a = {
                                fn: e => {
                                    let {
                                        x: t,
                                        y: n
                                    } = e;
                                    return {
                                        x: t,
                                        y: n
                                    }
                                }
                            },
                            ...d
                        } = c(e, t), p = {
                            x: n,
                            y: i
                        }, g = await v(t, d), b = f(u(r)), m = h(b);
                        let w = p[m],
                            x = p[b];
                        o && (w = l(w + g["y" === m ? "top" : "left"], w, w - g["y" === m ? "bottom" : "right"])), s && (x = l(x + g["y" === b ? "top" : "left"], x, x - g["y" === b ? "bottom" : "right"]));
                        const y = a.fn({
                            ...t,
                            [m]: w,
                            [b]: x
                        });
                        return {
                            ...y,
                            data: {
                                x: y.x - n,
                                y: y.y - i
                            }
                        }
                    }
                })],
                strategy: "fixed"
            }).then(function(e) {
                Object.assign(Ut.style, {
                    left: e.x + "px",
                    top: e.y + "px"
                })
            })
        }), en.activate(), Qt.closeOnOutsideClick && document.getElementById(Gt).addEventListener("click", nn), document.getElementById("buildship-chat-widget__form").addEventListener("submit", Mt)
    }

    function nn() {
        en.deactivate(), Ut.innerHTML = "", Ut.remove(), Xt.remove(), Kt(), Kt = function() {}
    }
    var rn = function(e) {
        try {
            return Promise.resolve(function() {
                if (e.ok) return Promise.resolve(e.json()).then(function(t) {
                    var n = t.choices[0].text;
                    return n || "" === n ? Promise.resolve(Zt(n, Date.now(), "system")).then(function() {}) : (console.error("Chat Widget: Server error", e), void(Qt.disableErrorAlert || alert("Received an OK response but no message was found. Please make sure the API response is configured correctly.")))
                });
                console.error("Chat Widget: Server error", e), Qt.disableErrorAlert || alert("Could not send message: " + e.statusText)
            }())
        } catch (e) {
            return Promise.reject(e)
        }
    },
    on = function(e) {
        try {
            var r = e.body.getReader(),
                l = Date.now(),
                message = "",
                i = document.getElementById("buildship-chat-widget__submit");
            i.setAttribute("disabled", "");
            return new Promise(function(resolve, reject) {
                function read() {
                    r.read().then(function(e) {
                        if (e.done) {
                            i.removeAttribute("disabled");
                        } else {
                            var n = (new TextDecoder).decode(e.value);
                            //console.log("raw line: "+n)
                            var lines = n.split("\n");
                            //console.log("Lines :" + lines);
                            lines.forEach(function(line) {
                                if (line.startsWith("data: ")) {
                                    line = line.substring(6);
                                    try {
                                        if (line.includes("\[DONE\]")){
                                            i.removeAttribute("disabled");
                                        } else if (line.trim()) {
                                            var t = JSON.parse(line.trim());
                                            if (t.choices && t.choices[0] && t.choices[0].text) {
                                                message += t.choices[0].text;
                                                Zt(message, l, "system", true).then(function() {
                                                    // do nothing, continue to the next line
                                                });
                                            } else if (t.choices && t.choices[0] && t.choices[0].text === "") {
                                                message += "";
                                                Zt(message, l, "system", true).then(function() {
                                                    // do nothing, continue to the next line
                                                });
                                            } else {
                                                console.error("Chat Widget: Invalid response format", line);
                                                reject(new Error("Invalid response format"));
                                            }
                                        } 
                                    } catch (e) {
                                        console.error("Chat Widget: Error parsing response", e);
                                        reject(e);
                                    }
                                }
                            });
                            read();
                        }
                    }).catch(function(e) {
                        reject(e);
                    });
                }
                read();
            })
        } catch (e) {
            return Promise.reject(e);
        }
    },
    sn = {
        open: tn,
        close: nn,
        config: Qt,
        init: Ht
    };
    return window.buildShipChatWidget = sn, sn
});
