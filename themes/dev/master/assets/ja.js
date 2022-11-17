/*
 * @Date: 2022-10-19 10:37:46
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-19 10:38:48
 * @FilePath: \us-cdp-正式\assets\ja.js
 */
! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : t()
}(this, function () {
    function e(e) {
        if (!e) return !1;
        var t = Object.prototype.toString.call(e);
        return "[object Function]" == t || "[object AsyncFunction]" == t
    }

    function t() {
        return Date.now && e(Date.now) ? Date.now() : (new Date).getTime()
    }

    function r(e) {
        return null != e && "[object Object]" == Object.prototype.toString.call(e)
    }

    function i() {
        if ("function" == typeof Uint32Array) {
            var e = "";
            if ("undefined" != typeof crypto ? e = crypto : "undefined" != typeof msCrypto && (e = msCrypto), r(e) && e.getRandomValues) {
                var t = new Uint32Array(1),
                    i = e.getRandomValues(t)[0],
                    n = Math.pow(2, 32);
                return i / n
            }
        }
        return Pr(1e19) / 1e19
    }

    function n(e) {
        var t = null;
        try {
            t = JSON.parse(e)
        } catch (r) {}
        return t
    }

    function a(e, t) {
        this.lockGetPrefix = e || "lock-get-prefix", this.lockSetPrefix = t || "lock-set-prefix"
    }

    function s(e) {
        return "function" == typeof e || !(!e || "object" != typeof e) && s(e.listener)
    }

    function l() {
        this._events = {}
    }

    function c(e) {
        var t = e;
        try {
            t = decodeURIComponent(e)
        } catch (r) {
            t = e
        }
        return t
    }

    function u(e) {
        e = e || "";
        for (var t = {}, r = e.substring(1), i = r.split("&"), n = 0; n < i.length; n++) {
            var a = i[n].indexOf("=");
            if (a !== -1) {
                var s = i[n].substring(0, a),
                    o = i[n].substring(a + 1);
                s = c(s), o = c(o), t[s] = o
            }
        }
        return t
    }

    function d(e) {
        return "[object String]" == Object.prototype.toString.call(e)
    }

    function p(e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }

    function f(e) {
        var t = function (e) {
            this._fields = {
                Username: 4,
                Password: 5,
                Port: 7,
                Protocol: 2,
                Host: 6,
                Path: 8,
                URL: 0,
                QueryString: 9,
                Fragment: 10
            }, this._values = {}, this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, "undefined" != typeof e && this._parse(e)
        };
        return t.prototype.setUrl = function (e) {
            this._parse(e)
        }, t.prototype._initValues = function () {
            for (var e in this._fields) this._values[e] = ""
        }, t.prototype.addQueryString = function (e) {
            if ("object" != typeof e) return !1;
            var t = this._values.QueryString || "";
            for (var r in e) t = new RegExp(r + "[^&]+").test(t) ? t.replace(new RegExp(r + "[^&]+"), r + "=" + e[r]) : "&" === t.slice(-1) ? t + r + "=" + e[r] : "" === t ? r + "=" + e[r] : t + "&" + r + "=" + e[r];
            this._values.QueryString = t
        }, t.prototype.getUrl = function () {
            var e = "";
            return e += this._values.Origin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : "", e += this._values.Fragment ? "#" + this._values.Fragment : ""
        }, t.prototype._parse = function (e) {
            this._initValues();
            var t = this._regex.exec(e);
            t || wr.log("URLParser::_parse -> Invalid URL");
            var r = e.split("#"),
                i = r[0],
                n = r.slice(1).join("#");
            t = this._regex.exec(i);
            for (var a in this._fields) "undefined" != typeof t[this._fields[a]] && (this._values[a] = t[this._fields[a]]);
            this._values.Hostname = this._values.Host.replace(/:\d+$/, ""), this._values.Origin = this._values.Protocol + "://" + this._values.Hostname, this._values.Fragment = n
        }, new t(e)
    }

    function _(e) {
        var t = {},
            r = function () {
                var e;
                try {
                    return e = new URL("http://modernizr.com/"), "http://modernizr.com/" === e.href
                } catch (t) {
                    return !1
                }
            };
        if ("function" == typeof window.URL && r()) t = new URL(e), t.searchParams || (t.searchParams = function () {
            var e = u(t.search);
            return {
                get: function (t) {
                    return e[t]
                }
            }
        }());
        else {
            d(e) || (e = String(e)), e = p(e);
            var i = /^https?:\/\/.+/;
            if (i.test(e) === !1) return void wr.log("Invalid URL");
            var n = f(e);
            t.hash = n._values.Fragment, t.host = n._values.Host ? n._values.Host + (n._values.Port ? ":" + n._values.Port : "") : "", t.href = n._values.URL, t.password = n._values.Password, t.pathname = n._values.Path, t.port = n._values.Port, t.search = n._values.QueryString ? "?" + n._values.QueryString : "", t.username = n._values.Username, t.hostname = n._values.Hostname, t.protocol = n._values.Protocol ? n._values.Protocol + ":" : "", t.origin = n._values.Origin ? n._values.Origin + (n._values.Port ? ":" + n._values.Port : "") : "", t.searchParams = function () {
                var e = u("?" + n._values.QueryString);
                return {
                    get: function (t) {
                        return e[t]
                    }
                }
            }()
        }
        return t
    }

    function g(e) {
        return !(!e || 1 !== e.nodeType)
    }

    function h(e) {
        return void 0 === e
    }

    function v(t) {
        return Array.isArray && e(v) ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
    }

    function y(e) {
        return new Cr(e)
    }

    function b(e, t, r, i) {
        function n(e) {
            return e && (e.preventDefault = n.preventDefault, e.stopPropagation = n.stopPropagation, e._getPath = n._getPath), e
        }

        function a(e, t, r, i) {
            var a = function (a) {
                if (a = a || n(window.event)) {
                    a.target = a.srcElement;
                    var s, o, l = !0;
                    return "function" == typeof r && (s = r(a)), o = t.call(e, a), "beforeunload" !== i ? (!1 !== s && !1 !== o || (l = !1), l) : void 0
                }
            };
            return a
        }
        n._getPath = function () {
            var e = this;
            return this.path || this.composedPath && this.composedPath() || y(e.target).getParents()
        }, n.preventDefault = function () {
            this.returnValue = !1
        }, n.stopPropagation = function () {
            this.cancelBubble = !0
        };
        var s = function (e, t, r) {
            if (void 0 === i && "click" === t && (i = !0), e && e.addEventListener) e.addEventListener(t, function (e) {
                e._getPath = n._getPath, r.call(this, e)
            }, i);
            else {
                var s = "on" + t,
                    o = e[s];
                e[s] = a(e, r, o, t)
            }
        };
        s.apply(null, arguments)
    }

    function S(e) {
        var t = "pushState" in window.history ? "popstate" : "hashchange";
        b(window, t, e)
    }

    function w(e) {
        if (e) return "undefined" != typeof window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? new XMLHttpRequest : "undefined" != typeof XDomainRequest ? new XDomainRequest : null;
        if ("undefined" != typeof window.XMLHttpRequest) return new XMLHttpRequest;
        if (window.ActiveXObject) try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (t) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
                wr.log(t)
            }
        }
    }

    function k(e, t, r) {
        if (null == e) return !1;
        if (jr && e.forEach === jr) e.forEach(t, r);
        else if (v(e))
            for (var i = 0, n = e.length; i < n; i++) i in e && t.call(r, e[i], i, e);
        else
            for (var a in e) $r.call(e, a) && t.call(r, e[a], a, e)
    }

    function P(e) {
        return k(Array.prototype.slice.call(arguments, 1), function (t) {
            for (var r in t) Nr.call(t, r) && void 0 !== t[r] && (e[r] = t[r])
        }), e
    }

    function D(e) {
        function t(e) {
            if (!e) return "";
            try {
                return JSON.parse(e)
            } catch (t) {
                return {}
            }
        }

        function i() {
            try {
                n && "object" == typeof n && n.abort && n.abort()
            } catch (t) {
                wr.log(t)
            }
            a && (clearTimeout(a), a = null, e.error && e.error(), n.onreadystatechange = null, n.onload = null, n.onerror = null)
        }
        e.timeout = e.timeout || 2e4, e.credentials = "undefined" == typeof e.credentials || e.credentials;
        var n = w(e.cors);
        if (!n) return !1;
        e.type || (e.type = e.data ? "POST" : "GET"), e = P({
            success: function () {},
            error: function () {}
        }, e);
        var a, s = e.success,
            o = e.error;
        e.success = function (e) {
            s(e), a && (clearTimeout(a), a = null)
        }, e.error = function (e) {
            o(e), a && (clearTimeout(a), a = null)
        }, a = setTimeout(function () {
            i()
        }, e.timeout), "undefined" != typeof XDomainRequest && n instanceof XDomainRequest && (n.onload = function () {
            e.success && e.success(t(n.responseText)), n.onreadystatechange = null, n.onload = null, n.onerror = null
        }, n.onerror = function () {
            e.error && e.error(t(n.responseText), n.status), n.onreadystatechange = null, n.onerror = null, n.onload = null
        }), n.onreadystatechange = function () {
            try {
                4 == n.readyState && (n.status >= 200 && n.status < 300 || 304 == n.status ? e.success(t(n.responseText)) : e.error(t(n.responseText), n.status), n.onreadystatechange = null, n.onload = null)
            } catch (r) {
                n.onreadystatechange = null, n.onload = null
            }
        }, n.open(e.type, e.url, !0);
        try {
            e.credentials && (n.withCredentials = !0), r(e.header) && k(e.header, function (e, t) {
                n.setRequestHeader && n.setRequestHeader(t, e)
            }), e.data && (e.cors || n.setRequestHeader && n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "application/json" === e.contentType ? n.setRequestHeader && n.setRequestHeader("Content-type", "application/json; charset=UTF-8") : n.setRequestHeader && n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"))
        } catch (l) {
            wr.log(l)
        }
        n.send(e.data || null)
    }

    function C(e, t) {
        var r = [];
        return null == e ? r : Array.prototype.map && e.map === Array.prototype.map ? e.map(t) : (k(e, function (e, i, n) {
            r.push(t(e, i, n))
        }), r)
    }

    function O(e) {
        var t = [];
        try {
            t = C(atob(e).split(""), function (e) {
                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
            })
        } catch (r) {
            t = []
        }
        try {
            return decodeURIComponent(t.join(""))
        } catch (r) {
            return t.join("")
        }
    }

    function j(e) {
        var t = "";
        try {
            t = btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
                return String.fromCharCode("0x" + t)
            }))
        } catch (r) {
            t = e
        }
        return t
    }

    function $(e, t) {
        t = t || window;
        var r = !1,
            i = !0,
            n = t.document,
            a = n.documentElement,
            s = n.addEventListener,
            o = s ? "addEventListener" : "attachEvent",
            l = s ? "removeEventListener" : "detachEvent",
            c = s ? "" : "on",
            u = function (i) {
                "readystatechange" == i.type && "complete" != n.readyState || (("load" == i.type ? t : n)[l](c + i.type, u, !1), !r && (r = !0) && e.call(t, i.type || i))
            },
            d = function () {
                try {
                    a.doScroll("left")
                } catch (e) {
                    return void setTimeout(d, 50)
                }
                u("poll")
            };
        if ("complete" == n.readyState) e.call(t, "lazy");
        else {
            if (!s && a.doScroll) {
                try {
                    i = !t.frameElement
                } catch (p) {
                    wr.log(p)
                }
                i && d()
            }
            n[o](c + "DOMContentLoaded", u, !1), n[o](c + "readystatechange", u, !1), t[o](c + "load", u, !1)
        }
    }

    function N(e) {
        return k(Array.prototype.slice.call(arguments, 1), function (t) {
            for (var r in t) void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r])
        }), e
    }

    function T(e) {
        var t = e;
        try {
            t = decodeURI(e)
        } catch (r) {
            t = e
        }
        return t
    }

    function I(e) {
        var t = "t6KJCZa5pDdQ9khoEM3Tj70fbP2eLSyc4BrsYugARqFIw1mzlGNVXOHiWvxUn8",
            r = t.length - 1,
            i = {},
            n = 0;
        for (n = 0; n < t.length; n++) i[t.charAt(n)] = t.charAt(r - n);
        var a = "";
        for (n = 0; n < e.length; n++) a += e.charAt(n) in i ? i[e.charAt(n)] : e.charAt(n);
        return a
    }

    function A(e) {
        return "[object Date]" == Object.prototype.toString.call(e)
    }

    function x(e) {
        function t(e) {
            return e < 10 ? "0" + e : e
        }
        return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
    }

    function L(e) {
        return k(e, function (t, i) {
            A(t) ? e[i] = x(t) : r(t) && (e[i] = L(t))
        }), e
    }

    function E(e) {
        return k(Array.prototype.slice.call(arguments, 1), function (t) {
            for (var i in t) void 0 !== t[i] && (r(t[i]) && r(e[i]) ? P(e[i], t[i]) : e[i] = t[i])
        }), e
    }

    function J(e, t, r) {
        var i = Object.prototype.hasOwnProperty;
        if (e.filter) return e.filter(t);
        for (var n = [], a = 0; a < e.length; a++)
            if (i.call(e, a)) {
                var s = e[a];
                t.call(r, s, a, e) && n.push(s)
            } return n
    }

    function U(e) {
        try {
            return JSON.stringify(e, null, "  ")
        } catch (t) {
            return JSON.stringify(e)
        }
    }

    function K(e) {
        return "string" == typeof e && e.match(/^[a-zA-Z0-9\u4e00-\u9fa5\-\.]+$/) ? e : ""
    }

    function R(e, t) {
        e = e || location.hostname, t = t || "domain_test";
        var r = K(e),
            i = r.split(".");
        if (v(i) && i.length >= 2 && !/^(\d+\.)+\d+$/.test(r))
            for (var n = "." + i.splice(i.length - 1, 1); i.length > 0;)
                if (n = "." + i.splice(i.length - 1, 1) + n, document.cookie = t + "=true; path=/; domain=" + n, document.cookie.indexOf(t + "=true") !== -1) {
                    var a = new Date;
                    return a.setTime(a.getTime() - 1e3), document.cookie = t + "=true; expires=" + a.toGMTString() + "; path=/; SameSite=Lax; domain=" + n, n
                } return ""
    }

    function H(e) {
        function t(e, t) {
            e = p(e);
            var r;
            if ("body" === e) return document.getElementsByTagName("body")[0];
            if (0 === e.indexOf("#")) e = e.slice(1), r = document.getElementById(e);
            else if (e.indexOf(":nth-of-type") > -1) {
                var i = e.split(":nth-of-type");
                if (!i[0] || !i[1]) return null;
                var n = i[0],
                    a = i[1].match(/\(([0-9]+)\)/);
                if (!a || !a[1]) return null;
                var s = Number(a[1]);
                if (!(g(t) && t.children && t.children.length > 0)) return null;
                for (var o = t.children, l = 0; l < o.length; l++)
                    if (g(o[l])) {
                        var c = o[l].tagName.toLowerCase();
                        if (c === n && (s--, 0 === s)) {
                            r = o[l];
                            break
                        }
                    } if (s > 0) return null
            }
            return r ? r : null
        }

        function r(e) {
            var n, a = i.shift();
            if (!a) return e;
            try {
                n = t(a, e)
            } catch (s) {
                wr.log(s)
            }
            return n && g(n) ? r(n) : null
        }
        if (!d(e)) return null;
        var i = e.split(">"),
            n = null;
        return n = r(), n && g(n) ? n : null
    }

    function B(e, t) {
        var r = "",
            i = "";
        return e.textContent ? r = p(e.textContent) : e.innerText && (r = p(e.innerText)), r && (r = r.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)), i = r || "", "input" !== t && "INPUT" !== t || (i = e.value || ""), i
    }

    function W(e, t) {
        t && "string" == typeof t || (t = "hostname\u89e3\u6790\u5f02\u5e38");
        var r = null;
        try {
            r = _(e).hostname
        } catch (i) {
            wr.log("getHostname\u4f20\u5165\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01")
        }
        return r || t
    }

    function M() {
        try {
            var e = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
            return e && e[1] ? Number.parseInt(e[1], 10) : ""
        } catch (t) {
            return ""
        }
    }

    function q(e, t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), e = c(e);
        var r = "[\\?&]" + t + "=([^&#]*)",
            i = new RegExp(r),
            n = i.exec(e);
        return null === n || n && "string" != typeof n[1] && n[1].length ? "" : c(n[1])
    }

    function V(e) {
        var t = {},
            r = e.split("?"),
            i = r[1] || "";
        return i && (t = u("?" + i)), t
    }

    function F() {
        return "undefined" != typeof window.matchMedia || "undefined" != typeof window.msMatchMedia
    }

    function z() {
        var e = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type,
            t = "\u672a\u53d6\u5230\u503c";
        if (e) t = e.indexOf("landscape") > -1 ? "landscape" : "portrait";
        else if (F()) {
            var r = window.matchMedia || window.msMatchMedia;
            r("(orientation: landscape)").matches ? t = "landscape" : r("(orientation: portrait)").matches && (t = "portrait")
        }
        return t
    }

    function X() {
        var e, t = {},
            r = navigator.userAgent.toLowerCase();
        return (e = r.match(/ qq\/([\d.]+)/)) ? t.qqBuildinBrowser = Number(e[1].split(".")[0]) : (e = r.match(/mqqbrowser\/([\d.]+)/)) ? t.qqBrowser = Number(e[1].split(".")[0]) : (e = r.match(/opera.([\d.]+)/)) ? t.opera = Number(e[1].split(".")[0]) : (e = r.match(/msie ([\d.]+)/)) ? t.ie = Number(e[1].split(".")[0]) : (e = r.match(/edge.([\d.]+)/)) ? t.edge = Number(e[1].split(".")[0]) : (e = r.match(/firefox\/([\d.]+)/)) ? t.firefox = Number(e[1].split(".")[0]) : (e = r.match(/chrome\/([\d.]+)/)) ? t.chrome = Number(e[1].split(".")[0]) : (e = r.match(/version\/([\d.]+).*safari/)) ? t.safari = Number(e[1].match(/^\d*.\d*/)) : (e = r.match(/trident\/([\d.]+)/)) && (t.ie = 11), t
    }

    function Z(e) {
        return d(e) ? (e = p(e), T(e)) : T(location.href)
    }

    function Y(e) {
        return d(e) ? (e = p(e), T(e)) : T(location.pathname)
    }

    function G(e, t) {
        return e.hasAttribute ? e.hasAttribute(t) : e.attributes ? !(!e.attributes[t] || !e.attributes[t].specified) : void 0
    }

    function Q(e, t) {
        if ("string" == typeof t) return G(e, t);
        if (v(t)) {
            for (var r = !1, i = 0; i < t.length; i++) {
                var n = G(e, t[i]);
                if (n) {
                    r = !0;
                    break
                }
            }
            return r
        }
    }

    function ee(e) {
        if ("string" != typeof e) return 0;
        var t = 0,
            r = null;
        if (0 == e.length) return t;
        for (var i = 0; i < e.length; i++) r = e.charCodeAt(i), t = (t << 5) - t + r, t &= t;
        return t
    }

    function te(e) {
        var t = 9007199254740992,
            r = -9007199254740992,
            i = 31,
            n = 0;
        if (e.length > 0)
            for (var a = e.split(""), s = 0; s < a.length; s++) {
                var o = a[s].charCodeAt(),
                    l = i * n + o;
                if (l > t)
                    for (n = r + n; l = i * n + o, l < r;) n = n / 2 + o;
                if (l < r)
                    for (n = t + n; l = i * n + o, l > t;) n = n / 2 + o;
                n = i * n + o
            }
        return n
    }

    function re(e, t) {
        var r = e.indexOf;
        if (r) return r.call(e, t);
        for (var i = 0; i < e.length; i++)
            if (t === e[i]) return i;
        return -1
    }

    function ie(e, t) {
        return e.prototype = new t, e.prototype.constructor = e, e.superclass = t.prototype, e
    }

    function ne(e) {
        return !(!e || !Ir.call(e, "callee"))
    }

    function ae(e) {
        return "[object Boolean]" == Object.prototype.toString.call(e)
    }

    function se(e) {
        if (r(e)) {
            for (var t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
            return !0
        }
        return !1
    }

    function oe(e) {
        if ("string" != typeof e) return !1;
        var t = /^https?:\/\/.+/;
        return t.test(e) !== !1 || (wr.log("Invalid URL"), !1)
    }

    function le() {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }

    function ce(e) {
        try {
            JSON.parse(e)
        } catch (t) {
            return !1
        }
        return !0
    }

    function ue(e) {
        return "[object Number]" == Object.prototype.toString.call(e) && /[\d\.]+/.test(String(e))
    }

    function de() {
        var e = !1;
        if ("object" != typeof navigator || "function" != typeof navigator.sendBeacon) return e;
        var t = X(),
            r = navigator.userAgent.toLowerCase();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            var i = /os [\d._]*/gi,
                n = r.match(i),
                a = (n + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."),
                s = a.split(".");
            "undefined" == typeof t.safari && (t.safari = s[0]), s[0] && (t.qqBuildinBrowser || t.qqBrowser) ? e = !1 : s[0] && s[0] < 13 ? (t.chrome > 41 || t.firefox > 30 || t.opera > 25 || t.safari > 12) && (e = !0) : (t.chrome > 41 || t.firefox > 30 || t.opera > 25 || t.safari > 11.3) && (e = !0)
        } else(t.chrome > 38 || t.edge > 13 || t.firefox > 30 || t.opera > 25 || t.safari > 11) && (e = !0);
        return e
    }

    function pe() {
        return "undefined" != typeof window.XMLHttpRequest && ("withCredentials" in new XMLHttpRequest || "undefined" != typeof XDomainRequest)
    }

    function fe(t) {
        if (!r(t) || !d(t.callbackName)) return wr.log("JSONP \u8bf7\u6c42\u7f3a\u5c11 callbackName"), !1;
        t.success = e(t.success) ? t.success : function () {}, t.error = e(t.error) ? t.error : function () {}, t.data = t.data || "";
        var i = document.createElement("script"),
            n = document.getElementsByTagName("head")[0],
            a = null,
            s = !1;
        if (n.appendChild(i), ue(t.timeout) && (a = setTimeout(function () {
                return !s && (t.error("timeout"), window[t.callbackName] = function () {
                    wr.log("call jsonp error")
                }, a = null, n.removeChild(i), void(s = !0))
            }, t.timeout)), window[t.callbackName] = function () {
                clearTimeout(a), a = null, t.success.apply(null, arguments), window[t.callbackName] = function () {
                    wr.log("call jsonp error")
                }, n.removeChild(i)
            }, t.url.indexOf("?") > -1 ? t.url += "&callbackName=" + t.callbackName : t.url += "?callbackName=" + t.callbackName, r(t.data)) {
            var o = [];
            k(t.data, function (e, t) {
                o.push(t + "=" + e)
            }), t.data = o.join("&"), t.url += "&" + t.data
        }
        i.onerror = function (e) {
            return !s && (window[t.callbackName] = function () {
                wr.log("call jsonp error")
            }, clearTimeout(a), a = null, n.removeChild(i), t.error(e), void(s = !0))
        }, i.src = t.url
    }

    function _e(t) {
        var r = {
            visibleHandler: e(t.visible) ? t.visible : function () {},
            hiddenHandler: e(t.hidden) ? t.hidden : function () {},
            visibilityChange: null,
            hidden: null,
            isSupport: function () {
                return "undefined" != typeof document[this.hidden]
            },
            init: function () {
                "undefined" != typeof document.hidden ? (this.hidden = "hidden", this.visibilityChange = "visibilitychange") : "undefined" != typeof document.mozHidden ? (this.hidden = "mozHidden", this.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (this.hidden = "msHidden", this.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (this.hidden = "webkitHidden", this.visibilityChange = "webkitvisibilitychange"), this.listen()
            },
            listen: function () {
                if (this.isSupport()) {
                    var e = this;
                    b(document, this.visibilityChange, function () {
                        document[e.hidden] ? e.hiddenHandler() : e.visibleHandler()
                    }, 1)
                } else b(window, "focus", this.visibleHandler), b(window, "blur", this.hiddenHandler)
            }
        };
        r.init()
    }

    function ge(e) {
        e = P({
            success: function () {},
            error: function () {},
            appendCall: function (e) {
                document.getElementsByTagName("head")[0].appendChild(e)
            }
        }, e);
        var t = null;
        "css" === e.type && (t = document.createElement("link"), t.rel = "stylesheet", t.href = e.url), "js" === e.type && (t = document.createElement("script"), t.async = "async", t.setAttribute("charset", "UTF-8"), t.src = e.url, t.type = "text/javascript"), t.onload = t.onreadystatechange = function () {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (e.success(), t.onload = t.onreadystatechange = null)
        }, t.onerror = function () {
            e.error(), t.onerror = null
        }, e.appendCall(t)
    }

    function he(e) {
        if ("string" != typeof e) return "";
        for (var t = /^\s*javascript/i; t.test(e);) e = e.replace(t, "");
        return e
    }

    function me(e, t) {
        e = String(e), t = "number" == typeof t ? t : 13;
        for (var r = 126, i = e.split(""), n = 0, a = i.length; n < a; n++) {
            var s = i[n].charCodeAt(0);
            s < r && (i[n] = String.fromCharCode((i[n].charCodeAt(0) + t) % r))
        }
        return i.join("")
    }

    function ve(e) {
        var t = 13,
            r = 126;
        return e = String(e), me(e, r - t)
    }

    function ye(e) {
        r(e) && k(e, function (t, i) {
            r(t) ? ye(e[i]) : A(t) && (e[i] = x(t))
        })
    }

    function be(e) {
        var t = document.createElement("style");
        t.type = "text/css";
        try {
            t.appendChild(document.createTextNode(e))
        } catch (r) {
            t.styleSheet.cssText = e
        }
        var i = document.getElementsByTagName("head")[0],
            n = document.getElementsByTagName("script")[0];
        i ? i.children.length ? i.insertBefore(t, i.children[0]) : i.appendChild(t) : n.parentNode.insertBefore(t, n)
    }

    function Se(e) {
        if ("string" != typeof e) return wr.log("\u8f6c\u6362unicode\u9519\u8bef", e), e;
        for (var t = "", r = 0; r < e.length; r++) t += "\\" + e.charCodeAt(r).toString(16);
        return t
    }

    function we(e, r, i) {
        var n, a, s, o = null,
            l = 0;
        i || (i = {});
        var c = function () {
            l = i.leading === !1 ? 0 : t(), o = null, s = e.apply(n, a), o || (n = a = null)
        };
        return function () {
            var u = t();
            l || i.leading !== !1 || (l = u);
            var d = r - (u - l);
            return n = this, a = arguments, d <= 0 || d > r ? (o && (clearTimeout(o), o = null), l = u, s = e.apply(n, a), o || (n = a = null)) : o || i.trailing === !1 || (o = setTimeout(c, d)), s
        }
    }

    function ke(e) {
        var t = [];
        return null == e ? t : (k(e, function (e) {
            t[t.length] = e
        }), t)
    }

    function Pe(e) {
        return e ? e.toArray ? e.toArray() : v(e) || ne(e) ? Array.prototype.slice.call(e) : ke(e) : []
    }

    function De(e) {
        for (var t, r = [], i = {}, n = 0; n < e.length; n++) t = e[n], t in i || (i[t] = !0, r.push(t));
        return r
    }

    function Ce() {
        if ((Ar.isSupport() && "true" === sessionStorage.getItem("sensorsdata_jssdk_debug") || Ur.show_log) && (!r(arguments[0]) || Ur.show_log !== !0 && "string" !== Ur.show_log && Ur.show_log !== !1 || (arguments[0] = U(arguments[0])), "object" == typeof console && console.log)) try {
            return console.log.apply(console, arguments)
        } catch (e) {
            console.log(arguments[0])
        }
    }

    function Oe(e) {
        return 0 === e.indexOf(Rr) ? (e = e.substring(Rr.length), e = ve(e)) : 0 === e.indexOf(Hr) && (e = e.substring(Hr.length), e = I(e)), e
    }

    function je(e) {
        return !d(e) || 0 !== e.indexOf(Rr) && 0 !== e.indexOf(Hr) || (e = Oe(e)), e
    }

    function $e(e) {
        return Hr + I(e)
    }

    function Ne(t) {
        var i = t.properties,
            n = JSON.parse(JSON.stringify(t));
        r(i) && k(i, function (t, r) {
            if (e(t)) try {
                i[r] = t(n), e(i[r]) && (Ce("\u60a8\u7684\u5c5e\u6027- " + r + " \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete i[r])
            } catch (a) {
                delete i[r], Ce("\u60a8\u7684\u5c5e\u6027- " + r + " \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
            }
        })
    }

    function Te(e) {
        if ("object" == typeof e && e.$option) {
            var t = e.$option;
            return delete e.$option, t
        }
        return {}
    }

    function Ie(e) {
        var t = {};
        return k(e, function (e, r) {
            null != e && (t[r] = e)
        }), t
    }

    function Ae(e) {
        var t = Ur.current_domain;
        switch (typeof t) {
            case "function":
                var r = t();
                return "" === r || "" === p(r) ? "url\u89e3\u6790\u5931\u8d25" : r.indexOf(".") !== -1 ? r : "url\u89e3\u6790\u5931\u8d25";
            case "string":
                return "" === t || "" === p(t) ? "url\u89e3\u6790\u5931\u8d25" : t.indexOf(".") !== -1 ? t : "url\u89e3\u6790\u5931\u8d25";
            default:
                var i = R(null, qr);
                return "" === e ? "url\u89e3\u6790\u5931\u8d25" : "" === i ? "url\u89e3\u6790\u5931\u8d25" : i
        }
    }

    function xe(e) {
        if (!e.target) return !1;
        var t = e.target,
            r = t.tagName.toLowerCase(),
            i = {};
        return i.$element_type = r, i.$element_name = t.getAttribute("name"), i.$element_id = t.getAttribute("id"), i.$element_class_name = "string" == typeof t.className ? t.className : null, i.$element_target_url = t.getAttribute("href"), i.$element_content = qe(t, r), i = Ie(i), i.$url = Z(), i.$url_path = Y(), i.$title = document.title, i
    }

    function Le() {
        var e = document.referrer,
            t = "baidu.com";
        if (!e) return !1;
        try {
            var r = _(e).hostname;
            return r && r.substring(r.length - t.length) === t
        } catch (i) {
            return !1
        }
    }

    function Ee() {
        var e = V(document.referrer);
        return se(e) || !e.eqid ? Dr().replace(/-/g, "") : e.eqid
    }

    function Je() {
        var e = V(document.referrer);
        if (se(e) || !e.eqid) {
            var t = V(location.href);
            return e.ck || t.utm_source ? "baidu_sem_keyword_id" : "baidu_other_keyword_id"
        }
        return "baidu_seo_keyword_id"
    }

    function Ue(e) {
        return e = e || document.referrer, "" === e || R(W(e), qr) !== R(null, qr)
    }

    function Ke(e, t) {
        return e = e || document.referrer, "string" != typeof e ? "\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_" + String(e) : (e = p(e), e = T(e), 0 !== e.indexOf("https://www.baidu.com/") || t || (e = e.split("?")[0]), e = e.slice(0, Ur.max_referrer_string_length), "string" == typeof e ? e : "")
    }

    function Re(e) {
        var t = W(e);
        if (!t || "hostname\u89e3\u6790\u5f02\u5e38" === t) return "";
        var r = {
            baidu: [/^.*\.baidu\.com$/],
            bing: [/^.*\.bing\.com$/],
            google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
            sm: [/^m\.sm\.cn$/],
            so: [/^.+\.so\.com$/],
            sogou: [/^.*\.sogou\.com$/],
            yahoo: [/^.*\.yahoo\.com$/]
        };
        for (var i in r)
            for (var n = r[i], a = 0, s = n.length; a < s; a++)
                if (n[a].test(t)) return i;
        return "\u672a\u77e5\u641c\u7d22\u5f15\u64ce"
    }

    function He(e, t) {
        e = e || document.referrer;
        var r = Ur.source_type.keyword;
        if (document && "string" == typeof e) {
            if (0 === e.indexOf("http")) {
                var i = Re(e),
                    n = V(e);
                if (se(n)) return Ur.preset_properties.search_keyword_baidu && Le() ? void 0 : "\u672a\u53d6\u5230\u503c";
                var a = null;
                for (var s in r)
                    if (i === s && "object" == typeof n)
                        if (a = r[s], v(a))
                            for (s = 0; s < a.length; s++) {
                                var o = n[a[s]];
                                if (o) return t ? {
                                    active: o
                                } : o
                            } else if (n[a]) return t ? {
                                active: n[a]
                            } : n[a];
                return Ur.preset_properties.search_keyword_baidu && Le() ? void 0 : "\u672a\u53d6\u5230\u503c"
            }
            return "" === e ? "\u672a\u53d6\u5230\u503c_\u76f4\u63a5\u6253\u5f00" : "\u672a\u53d6\u5230\u503c_\u975ehttp\u7684url"
        }
        return "\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_" + String(e)
    }

    function Be(e) {
        var t = q(e, "gdt_vid"),
            r = q(e, "hash_key"),
            i = q(e, "callbacks"),
            n = {
                click_id: "",
                hash_key: "",
                callbacks: ""
            };
        return d(t) && t.length && (n.click_id = 16 == t.length || 18 == t.length ? t : "\u53c2\u6570\u89e3\u6790\u4e0d\u5408\u6cd5", d(r) && r.length && (n.hash_key = r), d(i) && i.length && (n.callbacks = i)), n
    }

    function We() {
        function e(e, t) {
            for (var r = 0; r < e.length; r++)
                if (t.split("?")[0].indexOf(e[r]) !== -1) return !0
        }
        var t = "(" + Ur.source_type.utm.join("|") + ")\\=[^&]+",
            r = Ur.source_type.search,
            i = Ur.source_type.social,
            n = document.referrer || "",
            a = zr.pageProp.url;
        if (a) {
            var s = a.match(new RegExp(t));
            return s && s[0] ? "\u4ed8\u8d39\u5e7f\u544a\u6d41\u91cf" : e(r, n) ? "\u81ea\u7136\u641c\u7d22\u6d41\u91cf" : e(i, n) ? "\u793e\u4ea4\u7f51\u7ad9\u6d41\u91cf" : "" === n ? "\u76f4\u63a5\u6d41\u91cf" : "\u5f15\u8350\u6d41\u91cf"
        }
        return "\u83b7\u53d6url\u5f02\u5e38"
    }

    function Me(e) {
        var t = Ur.heatmap && "function" == typeof Ur.heatmap.collect_input && Ur.heatmap.collect_input(e);
        return "button" === e.type || "submit" === e.type || t ? e.value || "" : ""
    }

    function qe(e, t) {
        return d(t) && "input" === t.toLowerCase() ? Me(e) : B(e, t)
    }

    function Ve(e) {
        return Br.protocol.ajax(e.url), D(e)
    }

    function Fe(e, t, i) {
        var n = !(!r(Ur.heatmap) || !Ur.heatmap.useCapture);
        return r(Ur.heatmap) && "undefined" == typeof Ur.heatmap.useCapture && "click" === t && (n = !0), b(e, t, i, n)
    }

    function ze() {
        var e = location.protocol;
        return "http:" === e || "https:" === e ? e : "http:"
    }

    function Xe(e, t) {
        var r = "";
        if (t = t || location.href, Ur.cross_subdomain === !1) {
            try {
                r = _(t).hostname
            } catch (i) {
                Ce(i)
            }
            r = "string" == typeof r && "" !== r ? "sajssdk_2015_" + Ur.sdk_id + e + "_" + r.replace(/\./g, "_") : "sajssdk_2015_root_" + Ur.sdk_id + e
        } else r = "sajssdk_2015_cross_" + Ur.sdk_id + e;
        return r
    }

    function Ze() {
        var e = "new_user";
        return Xr.isSupport() ? null !== Xr.get("sensorsdata_is_new_user") || null !== Xr.get(Xe(e)) : null !== Zr.get(Zr.getNewUserFlagMemoryKey(e))
    }

    function Ye(e, t) {
        for (var r in e)
            if (Object.prototype.hasOwnProperty.call(e, r) && !ti.check(r, e[r], t)) return !1;
        return !0
    }

    function Ge(e) {
        return ri.stage.process("addCustomProps", e)
    }

    function Qe(e) {
        return ri.stage.process("formatData", e)
    }

    function et(t) {
        var r = location.href,
            i = window.history.pushState,
            n = window.history.replaceState;
        e(window.history.pushState) && (window.history.pushState = function () {
            i.apply(window.history, arguments), t(r), r = location.href
        }), e(window.history.replaceState) && (window.history.replaceState = function () {
            n.apply(window.history, arguments), t(r), r = location.href
        });
        var a;
        a = window.document.documentMode ? "hashchange" : i ? "popstate" : "hashchange", b(window, a, function () {
            t(r), r = location.href
        })
    }

    function tt(e, t) {
        var r = [];
        "string" == typeof e && e in ci.EVENT_LIST && (r = ci.EVENT_LIST[e], ci[r[0]].on(r[1], t))
    }

    function rt(e) {
        var t = !e.type || "profile" !== e.type.slice(0, 7),
            i = "\u53d6\u503c\u5f02\u5e38";
        r(e.properties) && (e.properties.$first_referrer && (e.properties.$first_referrer_host = W(e.properties.$first_referrer, i)), t && ("$referrer" in e.properties && (e.properties.$referrer_host = "" === e.properties.$referrer ? "" : W(e.properties.$referrer, i)), br.para.preset_properties.latest_referrer && br.para.preset_properties.latest_referrer_host && (e.properties.$latest_referrer_host = "" === e.properties.$latest_referrer ? "" : W(e.properties.$latest_referrer, i))))
    }

    function it(e) {
        var t = !e.type || "profile" !== e.type.slice(0, 7),
            r = br.para.preset_properties && t;
        r && br.para.preset_properties.url && "undefined" == typeof e.properties.$url && (e.properties.$url = Z()), r && br.para.preset_properties.title && "undefined" == typeof e.properties.$title && (e.properties.$title = document.title)
    }

    function nt(e) {
        P(Ur, e || br.para || {}), br.para = Ur;
        var t = {};
        if (r(br.para.is_track_latest))
            for (var i in br.para.is_track_latest) t["latest_" + i] = br.para.is_track_latest[i];
        br.para.preset_properties = P({}, br.para_default.preset_properties, t, br.para.preset_properties || {});
        var n;
        for (n in br.para_default) void 0 === br.para[n] && (br.para[n] = br.para_default[n]);
        "string" == typeof br.para.server_url && (br.para.server_url = p(br.para.server_url), br.para.server_url && ("://" === br.para.server_url.slice(0, 3) ? br.para.server_url = location.protocol.slice(0, -1) + br.para.server_url : "//" === br.para.server_url.slice(0, 2) ? br.para.server_url = location.protocol + br.para.server_url : "http" !== br.para.server_url.slice(0, 4) && (br.para.server_url = ""))), "string" != typeof br.para.web_url || "://" !== br.para.web_url.slice(0, 3) && "//" !== br.para.web_url.slice(0, 2) || ("://" === br.para.web_url.slice(0, 3) ? br.para.web_url = location.protocol.slice(0, -1) + br.para.web_url : br.para.web_url = location.protocol + br.para.web_url), "image" !== br.para.send_type && "ajax" !== br.para.send_type && "beacon" !== br.para.send_type && (br.para.send_type = "image"), br.debug.protocol.serverUrl(), br.bridge.initPara();
        var a = {
            datasend_timeout: 6e3,
            send_interval: 6e3
        };
        kr.isSupport() && pe() && "object" == typeof localStorage ? br.para.batch_send === !0 ? br.para.batch_send = P({}, a) : "object" == typeof br.para.batch_send && (br.para.batch_send = P({}, a, br.para.batch_send)) : br.para.batch_send = !1;
        var s = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
            o = ["www.baidu.", "m.baidu.", "m.sm.cn", "so.com", "sogou.com", "youdao.com", "google.", "yahoo.com/", "bing.com/", "ask.com/"],
            l = ["weibo.com", "renren.com", "kaixin001.com", "douban.com", "qzone.qq.com", "zhihu.com", "tieba.baidu.com", "weixin.qq.com"],
            c = {
                baidu: ["wd", "word", "kw", "keyword"],
                google: "q",
                bing: "q",
                yahoo: "p",
                sogou: ["query", "keyword"],
                so: "q",
                sm: "q"
            };
        "object" == typeof br.para.source_type && (br.para.source_type.utm = v(br.para.source_type.utm) ? br.para.source_type.utm.concat(s) : s, br.para.source_type.search = v(br.para.source_type.search) ? br.para.source_type.search.concat(o) : o, br.para.source_type.social = v(br.para.source_type.social) ? br.para.source_type.social.concat(l) : l, br.para.source_type.keyword = r(br.para.source_type.keyword) ? P(c, br.para.source_type.keyword) : c);
        var u = {
                div: !1
            },
            d = ["mark", "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
        if (br.para.heatmap && !r(br.para.heatmap) && (br.para.heatmap = {}), r(br.para.heatmap)) {
            br.para.heatmap.clickmap = br.para.heatmap.clickmap || "default", br.para.heatmap.scroll_notice_map = br.para.heatmap.scroll_notice_map || "default", br.para.heatmap.scroll_delay_time = br.para.heatmap.scroll_delay_time || 4e3, br.para.heatmap.scroll_event_duration = br.para.heatmap.scroll_event_duration || 18e3, br.para.heatmap.renderRefreshTime = br.para.heatmap.renderRefreshTime || 1e3, br.para.heatmap.loadTimeout = br.para.heatmap.loadTimeout || 1e3, br.para.heatmap.get_vtrack_config !== !0 && (br.para.heatmap.get_vtrack_config = !1);
            var f = v(br.para.heatmap.track_attr) ? J(br.para.heatmap.track_attr, function (e) {
                return e && "string" == typeof e
            }) : [];
            if (f.push("data-sensors-click"), br.para.heatmap.track_attr = f, r(br.para.heatmap.collect_tags))
                if (br.para.heatmap.collect_tags.div === !0) br.para.heatmap.collect_tags.div = {
                    ignore_tags: d,
                    max_level: 1
                };
                else if (r(br.para.heatmap.collect_tags.div)) {
                if (br.para.heatmap.collect_tags.div.ignore_tags ? v(br.para.heatmap.collect_tags.div.ignore_tags) || (br.log("ignore_tags \u53c2\u6570\u5fc5\u987b\u662f\u6570\u7ec4\u683c\u5f0f"), br.para.heatmap.collect_tags.div.ignore_tags = d) : br.para.heatmap.collect_tags.div.ignore_tags = d, br.para.heatmap.collect_tags.div.max_level) {
                    var _ = [1, 2, 3];
                    re(_, br.para.heatmap.collect_tags.div.max_level) === -1 && (br.para.heatmap.collect_tags.div.max_level = 1)
                }
            } else br.para.heatmap.collect_tags.div = !1;
            else br.para.heatmap.collect_tags = u
        }
        if (v(br.para.server_url) && br.para.server_url.length)
            for (n = 0; n < br.para.server_url.length; n++) /sa\.gif[^\/]*$/.test(br.para.server_url[n]) || (br.para.server_url[n] = br.para.server_url[n].replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
        else /sa\.gif[^\/]*$/.test(br.para.server_url) || "string" != typeof br.para.server_url || (br.para.server_url = br.para.server_url.replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
        "string" == typeof br.para.server_url && (br.para.debug_mode_url = br.para.debug_mode_url || br.para.server_url.replace("sa.gif", "debug")), br.para.noCache === !0 ? br.para.noCache = "?" + (new Date).getTime() : br.para.noCache = "", br.para.callback_timeout > br.para.datasend_timeout && (br.para.datasend_timeout = br.para.callback_timeout), br.para.heatmap && br.para.heatmap.collect_tags && r(br.para.heatmap.collect_tags) && k(br.para.heatmap.collect_tags, function (e, t) {
            "div" !== t && e && br.heatmap.otherTags.push(t)
        }), br.para.heatmap && "default" === br.para.heatmap.clickmap && br.heatmap.initUnlimitedTags()
    }

    function at(e) {
        var t = {};
        for (var r in e) t[r] = e[r];
        br.store._state.identities = t, br.store.save()
    }

    function st() {
        br._t = br._t || 1 * new Date, br.lib_version = Mr, br.is_first_visitor = !1, br.source_channel_standard = Wr
    }

    function ot() {
        if (Ar.isSupport()) try {
            sessionStorage.setItem("sensorsdata_jssdk_debug", "true")
        } catch (e) {
            br.log("enableLocalLog error: " + e.message)
        }
    }

    function lt() {
        Ar.isSupport() && sessionStorage.removeItem("sensorsdata_jssdk_debug")
    }

    function ct() {
        var e = Array.prototype.slice.call(arguments),
            t = e[0],
            r = e.slice(1);
        return "string" == typeof t && si[t] ? si[t].apply(si, r) : void("function" == typeof t ? t.apply(br, r) : br.log("quick\u65b9\u6cd5\u4e2d\u6ca1\u6709\u8fd9\u4e2a\u529f\u80fd" + e[0]))
    }

    function ut(t, i) {
        return d(t) ? r(window.SensorsDataWebJSSDKPlugin) && r(window.SensorsDataWebJSSDKPlugin[t]) && e(window.SensorsDataWebJSSDKPlugin[t].init) ? (window.SensorsDataWebJSSDKPlugin[t].init(br, i), window.SensorsDataWebJSSDKPlugin[t]) : r(br.modules) && r(br.modules[t]) && e(br.modules[t].init) ? (br.modules[t].init(br, i), br.modules[t]) : void br.log(t + "\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574" + t + "\u7684\u5f15\u5165\u987a\u5e8f\uff01") : (br.log("use\u63d2\u4ef6\u540d\u79f0\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff01"), !1)
    }

    function dt(e, t, r) {
        ii.check({
            event: e,
            properties: t
        }) && ii.send({
            type: "track",
            event: e,
            properties: t
        }, r)
    }

    function pt(e, t) {
        return !!ii.check({
            bindKey: e,
            bindValue: t
        }) && (br.store._state.identities[e] = t, br.store.save(), void ii.send({
            type: "track_id_bind",
            event: "$BindID",
            properties: {}
        }))
    }

    function ft(e, t) {
        if (!ii.check({
                unbindKey: e,
                bindValue: t
            })) return !1;
        if (r(br.store._state.identities) && br.store._state.identities.hasOwnProperty(e) && br.store._state.identities[e] === t) {
            var i = br.store.getUnionId().login_id;
            i && e + "+" + t === i && (br.store._state.distinct_id = br.store._state.first_id, br.store._state.first_id = "", br.store.set("history_login_id", {
                name: "",
                value: ""
            })), "$identity_cookie_id" !== e && (delete br.store._state.identities[e], br.store.save())
        }
        var n = {};
        n[e] = t, ii.send({
            identities: n,
            type: "track_id_unbind",
            event: "$UnbindID",
            properties: {}
        })
    }

    function _t(e, t, r) {
        function i(e, t, r) {
            function i(e) {
                function i() {
                    a || (a = !0, location.href = n.href)
                }
                e.stopPropagation(), e.preventDefault();
                var a = !1;
                setTimeout(i, 1e3), br.track(t, r, i)
            }
            e = e || {};
            var n = null;
            return e.ele && (n = e.ele), e.event && (n = e.target ? e.target : e.event.target), r = r || {}, !(!n || "object" != typeof n) && (!n.href || /^javascript/.test(n.href) || n.target || n.download || n.onclick ? (br.track(t, r), !1) : (e.event && i(e.event), void(e.ele && Fe(e.ele, "click", function (e) {
                i(e)
            }))))
        }
        "object" == typeof e && e.tagName ? i({
            ele: e
        }, t, r) : "object" == typeof e && e.target && e.event && i(e, t, r)
    }

    function gt(e, t, r) {
        return r = r || {}, !(!e || "object" != typeof e) && (!(!e.href || /^javascript/.test(e.href) || e.target) && void Fe(e, "click", function (i) {
            function n() {
                a || (a = !0, location.href = e.href)
            }
            i.preventDefault();
            var a = !1;
            setTimeout(n, 1e3), br.track(t, r, n)
        }))
    }

    function ht(e, t, r) {
        ii.check({
            item_type: e,
            item_id: t,
            properties: r
        }) && ii.sendItem({
            type: "item_set",
            item_type: e,
            item_id: t,
            properties: r || {}
        })
    }

    function mt(e, t) {
        ii.check({
            item_type: e,
            item_id: t
        }) && ii.sendItem({
            type: "item_delete",
            item_type: e,
            item_id: t
        })
    }

    function vt(e, t) {
        ii.check({
            propertiesMust: e
        }) && ii.send({
            type: "profile_set",
            properties: e
        }, t)
    }

    function yt(e, t) {
        ii.check({
            propertiesMust: e
        }) && ii.send({
            type: "profile_set_once",
            properties: e
        }, t)
    }

    function bt(e, t) {
        ii.check({
            propertiesMust: e
        }) && (k(e, function (t, r) {
            d(t) ? e[r] = [t] : v(t) ? e[r] = t : (delete e[r], br.log("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"))
        }), se(e) || ii.send({
            type: "profile_append",
            properties: e
        }, t))
    }

    function St(e, t) {
        function r(e) {
            for (var t in e)
                if (Object.prototype.hasOwnProperty.call(e, t) && !/-*\d+/.test(String(e[t]))) return !1;
            return !0
        }
        var i = e;
        d(e) && (e = {}, e[i] = 1), ii.check({
            propertiesMust: e
        }) && (r(e) ? ii.send({
            type: "profile_increment",
            properties: e
        }, t) : br.log("profile_increment\u7684\u503c\u53ea\u80fd\u662f\u6570\u5b57"))
    }

    function wt(e) {
        ii.send({
            type: "profile_delete"
        }, e), Gr.set("distinct_id", Dr()), Gr.set("first_id", "")
    }

    function kt(e, t) {
        var r = e,
            i = {};
        d(e) && (e = [], e.push(r)), v(e) ? (k(e, function (e) {
            d(e) ? i[e] = !0 : br.log("profile_unset\u7ed9\u7684\u6570\u7ec4\u91cc\u9762\u7684\u503c\u5fc5\u987b\u65f6string,\u5df2\u7ecf\u8fc7\u6ee4\u6389", e)
        }), ii.send({
            type: "profile_unset",
            properties: i
        }, t)) : br.log("profile_unset\u7684\u53c2\u6570\u662f\u6570\u7ec4")
    }

    function Pt(e, t) {
        function r(e) {
            br.store._state.identities.$identity_anonymous_id = e, br.store.save()
        }
        "number" == typeof e && (e = String(e));
        var i = Gr.getFirstId();
        if ("undefined" == typeof e) {
            var n = Dr();
            i ? Gr.set("first_id", n) : Gr.set("distinct_id", n), r(n)
        } else ii.check({
            distinct_id: e
        }) && (t === !0 ? i ? Gr.set("first_id", e) : Gr.set("distinct_id", e) : i ? Gr.change("first_id", e) : Gr.change("distinct_id", e), r(e))
    }

    function Dt(e, t, r, i) {
        var n = Gr.getFirstId() || Gr.getDistinctId();
        Gr.set("distinct_id", e), ii.send({
            original_id: n,
            distinct_id: br.store.getDistinctId(),
            type: "track_signup",
            event: t,
            properties: r
        }, i)
    }

    function Ct(e, t, r, i) {
        "number" == typeof e && (e = String(e)), ii.check({
            distinct_id: e,
            event: t,
            properties: r
        }) && Dt(e, t, r, i)
    }

    function Ot(e) {
        ii.check({
            properties: e
        }) ? P(zr.currentProps, e) : br.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")
    }

    function jt(e) {
        Gr.clearAllProps(e)
    }

    function $t(e) {
        var t;
        if (v(e) && e.length > 0)
            for (t = 0; t < e.length; t++) d(e[t]) && e[t] in zr.currentProps && delete zr.currentProps[e[t]];
        else if (e === !0)
            for (t in zr.currentProps) delete zr.currentProps[t]
    }

    function Nt(e) {
        ii.check({
            properties: e
        }) ? Gr.setProps(e) : br.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")
    }

    function Tt(e) {
        ii.check({
            properties: e
        }) ? Gr.setPropsOnce(e) : br.log("registerOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")
    }

    function It(e) {
        ii.check({
            properties: e
        }) ? Gr.setSessionProps(e) : br.log("registerSession\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")
    }

    function At(e) {
        ii.check({
            properties: e
        }) ? Gr.setSessionPropsOnce(e) : br.log("registerSessionOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")
    }

    function xt(e) {
        var t = e.id,
            i = e.callback,
            n = e.name,
            a = Gr.getFirstId(),
            s = Gr.getOriginDistinctId();
        if (!ii.check({
                distinct_id: t
            })) return br.log("login id is invalid"), !1;
        if (t === br.store.getOriginDistinctId() && !a) return br.log("login id is equal to distinct_id"), !1;
        if (r(br.store._state.identities) && br.store._state.identities.hasOwnProperty(n) && t === br.store._state.first_id) return !1;
        var o = br.store._state.history_login_id.name !== n || t !== br.store._state.history_login_id.value;
        if (o) {
            br.store._state.identities[n] = t, br.store.set("history_login_id", {
                name: n,
                value: t
            }), a || Gr.set("first_id", s), Dt(t, "$SignUp", {}, i);
            var l = {
                $identity_cookie_id: br.store._state.identities.$identity_cookie_id
            };
            return l[n] = t, at(l), !0
        }
        return !1
    }

    function Lt(t, r) {
        "number" == typeof t && (t = String(t));
        var i = xt({
            id: t,
            callback: r,
            name: Vr.LOGIN
        });
        !i && e(r) && r()
    }

    function Et(e, t) {
        return "number" == typeof t && (t = String(t)), "number" == typeof e && (e = String(e)), !!ii.check({
            loginIdKey: e
        }) && (Vr.LOGIN === e ? (Lt(t), !1) : void xt({
            id: t,
            callback: null,
            name: e
        }))
    }

    function Jt(e) {
        var t = Gr.getFirstId();
        if (t)
            if (Gr.set("first_id", ""), e === !0) {
                var r = Dr();
                Gr.set("distinct_id", r)
            } else Gr.set("distinct_id", t);
        at({
            $identity_cookie_id: br.store._state.identities.$identity_cookie_id
        }), br.store.set("history_login_id", {
            name: "",
            value: ""
        })
    }

    function Ut() {
        function e() {
            var e = zr.campaignParams(),
                t = {};
            return k(e, function (e, r, i) {
                (" " + br.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = i[r] : t[r] = i[r]
            }), t
        }
        var t = {
                $is_first_day: Ze(),
                $is_first_time: Yr.is_page_first_visited,
                $referrer: zr.pageProp.referrer || "",
                $referrer_host: zr.pageProp.referrer ? W(zr.pageProp.referrer) : "",
                $url: Z(),
                $url_path: Y(),
                $title: document.title || "",
                _distinct_id: Gr.getDistinctId(),
                identities: JSON.parse(JSON.stringify(Gr._state.identities))
            },
            r = P({}, zr.properties(), br.store.getProps(), e(), t);
        return br.para.preset_properties.latest_referrer && br.para.preset_properties.latest_referrer_host && (r.$latest_referrer_host = "" === r.$latest_referrer ? "" : W(r.$latest_referrer)), r
    }

    function Kt() {
        var e = "",
            t = " { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }";
        br.heatmap && v(br.heatmap.otherTags) && k(br.heatmap.otherTags, function (r) {
            e += r + t
        }), le() && M() && M() < 13 && (br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div && be("div, [data-sensors-click]" + t), br.para.heatmap && br.para.heatmap.track_attr && be("[" + br.para.heatmap.track_attr.join("], [") + "]" + t), "" !== e && be(e))
    }

    function Rt() {
        return _i.stage && _i.stage.process("getUtmData")
    }

    function Ht(e, t) {
        var r = gi.encodeTrackData(t);
        return e.indexOf("?") !== -1 ? e + "&" + r : e + "?" + r
    }

    function Bt(e) {
        return gi.encodeTrackData(e)
    }

    function Wt(e) {
        var t = ["image", "ajax", "beacon"],
            r = t[0];
        return r = e.config && re(t, e.config.send_type) > -1 ? e.config.send_type : br.para.send_type, "beacon" === r && de() === !1 && (r = "image"), "ajax" === r && pe() === !1 && (r = "image"), r
    }

    function Mt(e) {
        var t = Wt(e);
        switch (t) {
            case "image":
                return new hi(e);
            case "ajax":
                return new mi(e);
            case "beacon":
                return new vi(e);
            default:
                return new hi(e)
        }
    }

    function qt(e) {
        var t = Mt(e),
            r = t.start;
        return t.start = function () {
            var e = this;
            r.apply(this, arguments), setTimeout(function () {
                e.isEnd(!0)
            }, br.para.callback_timeout)
        }, t.end = function () {
            this.callback && this.callback();
            var e = this;
            setTimeout(function () {
                e.lastClear && e.lastClear()
            }, br.para.datasend_timeout - br.para.callback_timeout)
        }, t.isEnd = function () {
            this.received || (this.received = !0, this.end())
        }, t
    }

    function Vt() {
        this.sendTimeStamp = 0, this.timer = null, this.serverUrl = "", this.hasTabStorage = !1
    }

    function Ft(e) {
        var t = this;
        this.type = e, this.resultCbs = {}, this.timeoutCbs = {}, this.timerId = null, this.appCallJsCallback = null, window.sensorsdata_app_call_js || (window.sensorsdata_app_call_js = function (e, t) {
            if (e in window.sensorsdata_app_call_js.modules) return window.sensorsdata_app_call_js.modules[e](t)
        }), window.sensorsdata_app_call_js.modules = window.sensorsdata_app_call_js.modules || {}, window.sensorsdata_app_call_js.modules[this.type] = function (e) {
            try {
                var r = O(e) || e;
                try {
                    r = JSON.parse(r)
                } catch (i) {}
                var n = r && r.message_id;
                if (n && t.resultCbs[n]) {
                    if (e = r, t.timeoutCbs[n] && t.timeoutCbs[n].isTimeout) return void(t.resultCbs[n].callbacks.length = 0);
                    if (t.resultCbs[n]) {
                        t.resultCbs[n].result = e, clearTimeout(t.timerId), t.timeoutCbs[n].callbacks.length = 0;
                        for (var a in t.resultCbs[n].callbacks) t.resultCbs[n].callbacks[a].call(null, e), t.resultCbs[n].callbacks.splice(a, 1)
                    }
                    return
                }
                return t.appCallJsCallback && t.appCallJsCallback.call(null, e)
            } catch (s) {
                console.log("app \u56de\u8c03 js \u5f02\u5e38", e)
            }
        }
    }

    function zt(t) {
        try {
            if (br.bridge.activeBridge && e(br.bridge.activeBridge.handleCommand)) return br.bridge.activeBridge.handleCommand(t)
        } catch (r) {
            br.log("Error: handle command exception:" + r)
        }
        return br.log("\u6570\u636e\u53d1\u5f80App\u5931\u8d25\uff0cApp\u6ca1\u6709\u66b4\u9732bridge,type:" + t.callType), !1
    }

    function Xt(e) {
        function t(e) {
            var t = {
                hostname: "",
                project: ""
            };
            try {
                e = _(e), t.hostname = e.hostname, t.project = e.searchParams.get("project") || "default"
            } catch (r) {
                br.log(r)
            }
            return t
        }
        var r = t(e),
            i = t(br.para.server_url);
        if (r.hostname === i.hostname && r.project === i.project) return !0;
        if (v(br.para.app_js_bridge.white_list))
            for (var n = 0; n < br.para.app_js_bridge.white_list.length; n++) {
                var a = t(br.para.app_js_bridge.white_list[n]);
                if (a.hostname === r.hostname && a.project === r.project) return !0
            }
        return !1
    }

    function Zt(e) {
        this.bridge = new Ft(e.type)
    }

    function Yt(e) {
        var t = null;
        try {
            var r = JSON.parse(window.name);
            t = r[e] ? c(r[e]) : null
        } catch (i) {
            t = null
        }
        return null === t && (t = q(location.href, e) || null), t
    }

    function Gt(e) {
        function t() {
            var e = [];
            i.touch_app_bridge || e.push(br.debug.defineMode("1")), r(br.para.app_js_bridge) || (e.push(br.debug.defineMode("2")), i.verify_success = !1), r(br.para.heatmap) && "default" == br.para.heatmap.clickmap || e.push(br.debug.defineMode("3")), "fail" === i.verify_success && e.push(br.debug.defineMode("4")), new br.SDKJSBridge("app_alert").notifyApp({
                data: e
            })
        }
        var i = br.bridge.bridge_info;
        if (br.bridge.hasVisualModeBridge())
            if (r(br.para.heatmap) && "default" == br.para.heatmap.clickmap)
                if (r(br.para.app_js_bridge) && "success" === i.verify_success)
                    if (e) sa_jssdk_app_define_mode(br, e);
                    else {
                        var n = location.protocol,
                            a = ["http:", "https:"];
                        n = re(a, n) > -1 ? n : "https:", ge({
                            success: function () {
                                setTimeout(function () {
                                    "undefined" != typeof sa_jssdk_app_define_mode && sa_jssdk_app_define_mode(br, e)
                                }, 0)
                            },
                            error: function () {},
                            type: "js",
                            url: n + "//static.sensorsdata.cn/sdk/" + br.lib_version + "/vapph5define.min.js"
                        })
                    }
        else t();
        else t()
    }

    function Qt() {
        br.para.is_track_single_page && oi.on("switch", function (e) {
            var t = function (t) {
                t = t || {}, e !== location.href && (zr.pageProp.referrer = Z(e), br.quick("autoTrack", P({
                    $url: Z(),
                    $referrer: Z(e)
                }, t)))
            };
            if ("boolean" == typeof br.para.is_track_single_page) t();
            else if ("function" == typeof br.para.is_track_single_page) {
                var i = br.para.is_track_single_page();
                r(i) ? t(i) : i === !0 && t()
            }
        })
    }

    function er() {
        br._q && v(br._q) && br._q.length > 0 && k(br._q, function (e) {
            br[e[0]].apply(br, Array.prototype.slice.call(e[1]))
        }), r(br.para.heatmap) && (ai.initHeatmap(), ai.initScrollmap())
    }

    function tr() {
        br.readyState.setState(3), new br.SDKJSBridge("visualized").onAppNotify(function () {
            Gt("undefined" != typeof sa_jssdk_app_define_mode ? !0 : !1)
        }), Gt(!1), br.bridge.app_js_bridge_v1(), zr.initPage(), Qt(), !br.para.app_js_bridge && br.para.batch_send && kr.isSupport() && br.batchSend.batchInterval(), br.store.init(), br.vtrackBase.init(), br.readyState.setState(4), er()
    }

    function rr() {
        Ti.isSeachHasKeyword() ? Ti.hasKeywordHandle() : window.parent !== self && Ii.isSearchHasKeyword() ? Ii.verifyVtrackMode() : Ti.isWindowNameHasKeyword() ? Ti.windowNameHasKeywordHandle() : Ti.isStorageHasKeyword() ? Ti.storageHasKeywordHandle() : window.parent !== self && Ii.isStorageHasKeyword() ? Ii.verifyVtrackMode() : (tr(), Ii.notifyUser())
    }

    function ir() {
        k(Ai, function (e) {
            var t = br[e];
            br[e] = function () {
                if (br.readyState.state < 3) return v(br._q) || (br._q = []), br._q.push([e, arguments]), !1; {
                    if (br.readyState.getState()) return t.apply(br, arguments);
                    try {
                        console.error("\u8bf7\u5148\u521d\u59cb\u5316\u795e\u7b56JS SDK")
                    } catch (r) {
                        br.log(r)
                    }
                }
            }
        })
    }

    function nr(e) {
        this.cancel = function () {
            e = !0
        }, this.getCanceled = function () {
            return e || !1
        }
    }

    function ar(e, t, r) {
        var i = null;
        try {
            i = JSON.parse(JSON.stringify(e || null))
        } catch (n) {
            Ce(n)
        }
        this.getOriginalData = function () {
            return i
        }, this.getPosition = function () {
            return t
        }, this.cancellationToken = new nr, this.sensors = r
    }

    function sr(e) {
        if (!r(e)) throw "error: Stage constructor requires arguments.";
        this.processDef = e, this.registeredInterceptors = {}
    }

    function or(e) {
        e && e.dataStage && Ei.registerStageImplementation(e.dataStage), e && e.businessStage && Ri.registerStageImplementation(e.businessStage), e && e.sendStage && Ui.registerStageImplementation(e.sendStage)
    }

    function lr(e, t) {
        Hi[e] && Hi[e](t)
    }

    function cr(e) {
        e.kit = gi, e.saEvent = ii, this.dataStage = ri, this.sendStage = yi, this.businessStage = _i
    }

    function ur(t) {
        return r(t) ? (k(t, function (r, i) {
            if (v(r)) {
                var n = [];
                k(r, function (e) {
                    d(e) ? n.push(e) : Ce("\u60a8\u7684\u6570\u636e-", i, r, "\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")
                }), t[i] = n
            }
            d(r) || ue(r) || A(r) || ae(r) || v(r) || e(r) || "$option" === i || (Ce("\u60a8\u7684\u6570\u636e-", i, r, "-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"), delete t[i])
        }), t) : t
    }

    function dr(e, t) {
        return ue(t) && e.length > t ? (Ce("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--" + e), e.slice(0, t)) : e
    }

    function pr(e) {
        var t = ["distinct_id", "user_id", "id", "date", "datetime", "event", "events", "first_id", "original_id", "device_id", "properties", "second_id", "time", "users"];
        r(e) && k(t, function (t, r) {
            t in e && (r < 3 ? (delete e[t], Ce("\u60a8\u7684\u5c5e\u6027- " + t + "\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")) : Ce("\u60a8\u7684\u5c5e\u6027- " + t + "\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u8bf7\u907f\u514d\u5176\u4f5c\u4e3a\u5c5e\u6027\u540d"))
        })
    }

    function fr(e) {
        var t = ["$element_selector", "$element_path"],
            i = ["sensorsdata_app_visual_properties"];
        r(e) && k(e, function (n, a) {
            if (r(n)) fr(e[a]);
            else if (d(n)) {
                if (re(i, a) > -1) return;
                e[a] = dr(n, re(t, a) > -1 ? 1024 : Ur.max_string_length)
            }
        })
    }

    function _r(e) {
        "undefined" != typeof e.properties.$project && (e.project = e.properties.$project, delete e.properties.$project), "undefined" != typeof e.properties.$token && (e.token = e.properties.$token, delete e.properties.$token)
    }

    function gr(e) {
        if ("item_type" in e) {
            var t = e.item_type,
                r = function (t) {
                    return t || delete e.item_type, !0
                };
            Ye({
                item_type: t
            }, r)
        }
        if ("item_id" in e) {
            var i = e.item_id,
                n = function (t, r, i) {
                    return t || "string" !== i || delete e.item_id, !0
                };
            Ye({
                item_id: i
            }, n)
        }
    }

    function hr(e) {
        k(e, function (t, r) {
            var i = function (t, i, n) {
                return t || "keyLength" === n || delete e[r], !0
            };
            Ye({
                propertyKey: r
            }, i)
        })
    }

    function mr(e) {
        var t = e.properties;
        r(t) ? (ur(t), pr(t), _r(e), hr(t), fr(t)) : "properties" in e && (e.properties = {}), ye(e), gr(e)
    }

    function vr() {
        this.dataStage = Bi
    }

    function yr(e) {
        e && (wr.setup(Ce), br._ = P(Jr, fi), br.ee = ci, br.sendState = bi, br.events = new br._.EventEmitterSa, br.batchSend = ki, br.bridge = Pi, br.SDKJSBridge = Ft, br.JSBridge = Zt, br.store = Gr, br.vtrackBase = Di, br.unlimitedDiv = Ci, br.customProp = Oi, br.vtrackcollect = ji, br.vapph5collect = Ni, br.heatmap = ai, br.detectMode = rr, br.registerFeature = or, br.registerInterceptor = lr, or(new cr(br)), or(new vr(br)));
        var t = e ? di : xi;
        for (var r in t) br[r] = t[r];
        br.on = tt, br.ee = ci, br.use = ut
    }
    var br = {};
    (function () {
        function e(i, n) {
            function a(e, t) {
                try {
                    e()
                } catch (r) {
                    t && t()
                }
            }

            function s(e) {
                if (null != s[e]) return s[e];
                var t;
                if ("bug-string-char-index" == e) t = "a" != "a" [0];
                else if ("json" == e) t = s("json-stringify") && s("date-serialization") && s("json-parse");
                else if ("date-serialization" == e) {
                    if (t = s("json-stringify") && b) {
                        var r = n.stringify;
                        a(function () {
                            t = '"-271821-04-20T00:00:00.000Z"' == r(new d((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == r(new d(864e13)) && '"-000001-01-01T00:00:00.000Z"' == r(new d((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == r(new d((-1)))
                        })
                    }
                } else {
                    var i, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == e) {
                        var r = n.stringify,
                            u = "function" == typeof r;
                        u && ((i = function () {
                            return 1
                        }).toJSON = i, a(function () {
                            u = "0" === r(0) && "0" === r(new l) && '""' == r(new c) && r(v) === h && r(h) === h && r() === h && "1" === r(i) && "[1]" == r([i]) && "[null]" == r([h]) && "null" == r(null) && "[null,null,null]" == r([h, v, null]) && r({
                                a: [i, !0, !1, null, "\0\b\n\f\r\t"]
                            }) == o && "1" === r(null, i) && "[\n 1,\n 2\n]" == r([1, 2], null, 1)
                        }, function () {
                            u = !1
                        })), t = u
                    }
                    if ("json-parse" == e) {
                        var p, f = n.parse;
                        "function" == typeof f && a(function () {
                            0 !== f("0") || f(!1) || (i = f(o), p = 5 == i.a.length && 1 === i.a[0], p && (a(function () {
                                p = !f('"\t"')
                            }), p && a(function () {
                                p = 1 !== f("01")
                            }), p && a(function () {
                                p = 1 !== f("1.")
                            })))
                        }, function () {
                            p = !1
                        }), t = p
                    }
                }
                return s[e] = !!t
            }

            function o(e) {
                return I(this)
            }
            i || (i = r.Object()), n || (n = r.Object());
            var l = i.Number || r.Number,
                c = i.String || r.String,
                u = i.Object || r.Object,
                d = i.Date || r.Date,
                p = i.SyntaxError || r.SyntaxError,
                f = i.TypeError || r.TypeError,
                _ = i.Math || r.Math,
                g = i.JSON || r.JSON;
            if ("object" == typeof g && g) return n.stringify = g.stringify, n.parse = g.parse, n.runInContext = e, n;
            var h, m = u.prototype,
                v = m.toString,
                y = m.hasOwnProperty,
                b = new d((-0xc782b5b800cec));
            if (a(function () {
                    b = b.getUTCFullYear() == -109252 && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds()
                }), s["bug-string-char-index"] = s["date-serialization"] = s.json = s["json-stringify"] = s["json-parse"] = null, !s("json")) {
                var S = "[object Function]",
                    w = "[object Date]",
                    k = "[object Number]",
                    P = "[object String]",
                    D = "[object Array]",
                    C = "[object Boolean]",
                    O = s("bug-string-char-index"),
                    j = function (e, r) {
                        var i, n, a, s = 0;
                        (i = function () {
                            this.valueOf = 0
                        }).prototype.valueOf = 0, n = new i;
                        for (a in n) y.call(n, a) && s++;
                        return i = n = null, s ? j = function (e, t) {
                            var r, i, n = v.call(e) == S;
                            for (r in e) n && "prototype" == r || !y.call(e, r) || (i = "constructor" === r) || t(r);
                            (i || y.call(e, r = "constructor")) && t(r)
                        } : (n = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], j = function (e, r) {
                            var i, a, s = v.call(e) == S,
                                o = !s && "function" != typeof e.constructor && t[typeof e.hasOwnProperty] && e.hasOwnProperty || y;
                            for (i in e) s && "prototype" == i || !o.call(e, i) || r(i);
                            for (a = n.length; i = n[--a];) o.call(e, i) && r(i)
                        }), j(e, r)
                    };
                if (!s("json-stringify") && !s("date-serialization")) {
                    var $ = {
                            92: "\\\\",
                            34: '\\"',
                            8: "\\b",
                            12: "\\f",
                            10: "\\n",
                            13: "\\r",
                            9: "\\t"
                        },
                        N = "000000",
                        T = function (e, t) {
                            return (N + (t || 0)).slice(-e)
                        },
                        I = function (e) {
                            var t, r, i, n, a, s, o, l, c;
                            if (b) t = function (e) {
                                r = e.getUTCFullYear(), i = e.getUTCMonth(), n = e.getUTCDate(), s = e.getUTCHours(), o = e.getUTCMinutes(), l = e.getUTCSeconds(), c = e.getUTCMilliseconds()
                            };
                            else {
                                var u = _.floor,
                                    d = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                                    p = function (e, t) {
                                        return d[t] + 365 * (e - 1970) + u((e - 1969 + (t = +(t > 1))) / 4) - u((e - 1901 + t) / 100) + u((e - 1601 + t) / 400)
                                    };
                                t = function (e) {
                                    for (n = u(e / 864e5), r = u(n / 365.2425) + 1970 - 1; p(r + 1, 0) <= n; r++);
                                    for (i = u((n - p(r, 0)) / 30.42); p(r, i + 1) <= n; i++);
                                    n = 1 + n - p(r, i), a = (e % 864e5 + 864e5) % 864e5, s = u(a / 36e5) % 24, o = u(a / 6e4) % 60, l = u(a / 1e3) % 60, c = a % 1e3
                                }
                            }
                            return (I = function (e) {
                                return e > -1 / 0 && e < 1 / 0 ? (t(e), e = (r <= 0 || r >= 1e4 ? (r < 0 ? "-" : "+") + T(6, r < 0 ? -r : r) : T(4, r)) + "-" + T(2, i + 1) + "-" + T(2, n) + "T" + T(2, s) + ":" + T(2, o) + ":" + T(2, l) + "." + T(3, c) + "Z", r = i = n = s = o = l = c = null) : e = null, e
                            })(e)
                        };
                    if (s("json-stringify") && !s("date-serialization")) {
                        var A = n.stringify;
                        n.stringify = function (e, t, r) {
                            var i = d.prototype.toJSON;
                            d.prototype.toJSON = o;
                            var n = A(e, t, r);
                            return d.prototype.toJSON = i, n
                        }
                    } else {
                        var x = "\\u00",
                            L = function (e) {
                                var t = e.charCodeAt(0),
                                    r = $[t];
                                return r ? r : x + T(2, t.toString(16))
                            },
                            E = /[\x00-\x1f\x22\x5c]/g,
                            J = function (e) {
                                return E.lastIndex = 0, '"' + (E.test(e) ? e.replace(E, L) : e) + '"'
                            },
                            U = function (e, t, r, i, n, s, o) {
                                var l, c, u, p, _, g, m, y, b;
                                if (a(function () {
                                        l = t[e]
                                    }), "object" == typeof l && l && (l.getUTCFullYear && v.call(l) == w && l.toJSON === d.prototype.toJSON ? l = I(l) : "function" == typeof l.toJSON && (l = l.toJSON(e))), r && (l = r.call(t, e, l)), l == h) return l === h ? l : "null";
                                switch (c = typeof l, "object" == c && (u = v.call(l)), u || c) {
                                    case "boolean":
                                    case C:
                                        return "" + l;
                                    case "number":
                                    case k:
                                        return l > -1 / 0 && l < 1 / 0 ? "" + l : "null";
                                    case "string":
                                    case P:
                                        return J("" + l)
                                }
                                if ("object" == typeof l) {
                                    for (m = o.length; m--;)
                                        if (o[m] === l) throw f();
                                    if (o.push(l), p = [], y = s, s += n, u == D) {
                                        for (g = 0, m = l.length; g < m; g++) _ = U(g, l, r, i, n, s, o), p.push(_ === h ? "null" : _);
                                        b = p.length ? n ? "[\n" + s + p.join(",\n" + s) + "\n" + y + "]" : "[" + p.join(",") + "]" : "[]"
                                    } else j(i || l, function (e) {
                                        var t = U(e, l, r, i, n, s, o);
                                        t !== h && p.push(J(e) + ":" + (n ? " " : "") + t)
                                    }), b = p.length ? n ? "{\n" + s + p.join(",\n" + s) + "\n" + y + "}" : "{" + p.join(",") + "}" : "{}";
                                    return o.pop(), b
                                }
                            };
                        n.stringify = function (e, r, i) {
                            var n, a, s, o;
                            if (t[typeof r] && r)
                                if (o = v.call(r), o == S) a = r;
                                else if (o == D) {
                                s = {};
                                for (var l, c = 0, u = r.length; c < u;) l = r[c++], o = v.call(l), "[object String]" != o && "[object Number]" != o || (s[l] = 1)
                            }
                            if (i)
                                if (o = v.call(i), o == k) {
                                    if ((i -= i % 1) > 0)
                                        for (i > 10 && (i = 10), n = ""; n.length < i;) n += " "
                                } else o == P && (n = i.length <= 10 ? i : i.slice(0, 10));
                            return U("", (l = {}, l[""] = e, l), a, s, n, "", [])
                        }
                    }
                }
                if (!s("json-parse")) {
                    var K, R, H = c.fromCharCode,
                        B = {
                            92: "\\",
                            34: '"',
                            47: "/",
                            98: "\b",
                            116: "\t",
                            110: "\n",
                            102: "\f",
                            114: "\r"
                        },
                        W = function () {
                            throw K = R = null, p()
                        },
                        M = function () {
                            for (var e, t, r, i, n, a = R, s = a.length; K < s;) switch (n = a.charCodeAt(K)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    K++;
                                    break;
                                case 123:
                                case 125:
                                case 91:
                                case 93:
                                case 58:
                                case 44:
                                    return e = O ? a.charAt(K) : a[K], K++, e;
                                case 34:
                                    for (e = "@", K++; K < s;)
                                        if (n = a.charCodeAt(K), n < 32) W();
                                        else if (92 == n) switch (n = a.charCodeAt(++K)) {
                                        case 92:
                                        case 34:
                                        case 47:
                                        case 98:
                                        case 116:
                                        case 110:
                                        case 102:
                                        case 114:
                                            e += B[n], K++;
                                            break;
                                        case 117:
                                            for (t = ++K, r = K + 4; K < r; K++) n = a.charCodeAt(K), n >= 48 && n <= 57 || n >= 97 && n <= 102 || n >= 65 && n <= 70 || W();
                                            e += H("0x" + a.slice(t, K));
                                            break;
                                        default:
                                            W()
                                    } else {
                                        if (34 == n) break;
                                        for (n = a.charCodeAt(K), t = K; n >= 32 && 92 != n && 34 != n;) n = a.charCodeAt(++K);
                                        e += a.slice(t, K)
                                    }
                                    if (34 == a.charCodeAt(K)) return K++, e;
                                    W();
                                default:
                                    if (t = K, 45 == n && (i = !0, n = a.charCodeAt(++K)), n >= 48 && n <= 57) {
                                        for (48 == n && (n = a.charCodeAt(K + 1), n >= 48 && n <= 57) && W(), i = !1; K < s && (n = a.charCodeAt(K), n >= 48 && n <= 57); K++);
                                        if (46 == a.charCodeAt(K)) {
                                            for (r = ++K; r < s && (n = a.charCodeAt(r), !(n < 48 || n > 57)); r++);
                                            r == K && W(), K = r
                                        }
                                        if (n = a.charCodeAt(K), 101 == n || 69 == n) {
                                            for (n = a.charCodeAt(++K), 43 != n && 45 != n || K++, r = K; r < s && (n = a.charCodeAt(r), !(n < 48 || n > 57)); r++);
                                            r == K && W(), K = r
                                        }
                                        return +a.slice(t, K)
                                    }
                                    i && W();
                                    var o = a.slice(K, K + 4);
                                    if ("true" == o) return K += 4, !0;
                                    if ("fals" == o && 101 == a.charCodeAt(K + 4)) return K += 5, !1;
                                    if ("null" == o) return K += 4, null;
                                    W()
                            }
                            return "$"
                        },
                        q = function (e) {
                            var t, r;
                            if ("$" == e && W(), "string" == typeof e) {
                                if ("@" == (O ? e.charAt(0) : e[0])) return e.slice(1);
                                if ("[" == e) {
                                    for (t = []; e = M(), "]" != e;) r ? "," == e ? (e = M(), "]" == e && W()) : W() : r = !0, "," == e && W(), t.push(q(e));
                                    return t
                                }
                                if ("{" == e) {
                                    for (t = {}; e = M(), "}" != e;) r ? "," == e ? (e = M(), "}" == e && W()) : W() : r = !0, "," != e && "string" == typeof e && "@" == (O ? e.charAt(0) : e[0]) && ":" == M() || W(), t[e.slice(1)] = q(M());
                                    return t
                                }
                                W()
                            }
                            return e
                        },
                        V = function (e, t, r) {
                            var i = F(e, t, r);
                            i === h ? delete e[t] : e[t] = i
                        },
                        F = function (e, t, r) {
                            var i, n = e[t];
                            if ("object" == typeof n && n)
                                if (v.call(n) == D)
                                    for (i = n.length; i--;) V(v, j, n, i, r);
                                else j(n, function (e) {
                                    V(n, e, r)
                                });
                            return r.call(e, t, n)
                        };
                    n.parse = function (e, t) {
                        var r, i;
                        return K = 0, R = "" + e, r = q(M()), "$" != M() && W(), K = R = null, t && v.call(t) == S ? F((i = {}, i[""] = r, i), "", t) : r
                    }
                }
            }
            return n.runInContext = e, n
        }
        var t = {
                "function": !0,
                object: !0
            },
            r = t[typeof window] && window || this,
            i = r.JSON,
            n = r.JSON3,
            a = !1,
            s = e(r, r.JSON3 = {
                noConflict: function () {
                    return a || (a = !0, r.JSON = i, r.JSON3 = n, i = n = null), s
                }
            });
        r.JSON = {
            parse: s.parse,
            stringify: s.stringify
        }
    }).call(window),
        function (e, t) {
            t(e)
        }(window, function (e) {
            if (e.atob) try {
                e.atob(" ")
            } catch (t) {
                e.atob = function (e) {
                    var t = function (t) {
                        return e(String(t).replace(/[\t\n\f\r ]+/g, ""))
                    };
                    return t.original = e, t
                }(e.atob)
            } else {
                var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    i = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
                e.btoa = function (e) {
                    e = String(e);
                    for (var t, i, n, a, s = "", o = 0, l = e.length % 3; o < e.length;) {
                        if ((i = e.charCodeAt(o++)) > 255 || (n = e.charCodeAt(o++)) > 255 || (a = e.charCodeAt(o++)) > 255) return "";
                        t = i << 16 | n << 8 | a, s += r.charAt(t >> 18 & 63) + r.charAt(t >> 12 & 63) + r.charAt(t >> 6 & 63) + r.charAt(63 & t)
                    }
                    return l ? s.slice(0, l - 3) + "===".substring(l) : s
                }, e.atob = function (e) {
                    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !i.test(e)) return "";
                    e += "==".slice(2 - (3 & e.length));
                    for (var t, n, a, s = "", o = 0; o < e.length;) t = r.indexOf(e.charAt(o++)) << 18 | r.indexOf(e.charAt(o++)) << 12 | (n = r.indexOf(e.charAt(o++))) << 6 | (a = r.indexOf(e.charAt(o++))), s += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === a ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
                    return s
                }
            }
        }),
        function () {
            String.prototype.replaceAll || (String.prototype.replaceAll = function (e, t) {
                return "[object regexp]" === Object.prototype.toString.call(e).toLowerCase() ? this.replace(e, t) : this.replace(new RegExp(e, "g"), t)
            })
        }();
    var Sr, wr = {
            setup: function (e) {
                Sr = e
            },
            log: function () {
                (Sr || console && console.log || function () {}).apply(null, arguments)
            }
        },
        kr = {
            get: function (e) {
                return window.localStorage.getItem(e)
            },
            parse: function (e) {
                var t;
                try {
                    t = JSON.parse(kr.get(e)) || null
                } catch (r) {
                    wr.log(r)
                }
                return t
            },
            set: function (e, t) {
                try {
                    window.localStorage.setItem(e, t)
                } catch (r) {
                    wr.log(r)
                }
            },
            remove: function (e) {
                window.localStorage.removeItem(e)
            },
            isSupport: function () {
                var e = !0;
                try {
                    var t = "__local_store_support__",
                        r = "testIsSupportStorage";
                    kr.set(t, r), kr.get(t) !== r && (e = !1), kr.remove(t)
                } catch (i) {
                    e = !1
                }
                return e
            }
        },
        Pr = function () {
            function e() {
                return r = (9301 * r + 49297) % 233280, r / 233280
            }
            var t = new Date,
                r = t.getTime();
            return function (t) {
                return Math.ceil(e() * t)
            }
        }();
    a.prototype.get = function (e, r, a, s) {
        if (!e) throw new Error("key is must");
        r = r || 1e4, a = a || 1e3, s = s || function () {};
        var o = this.lockGetPrefix + e,
            l = kr.get(o),
            c = String(i());
        return l && (l = n(l) || {
            randomNum: 0,
            expireTime: 0
        }, l.expireTime > t()) ? s(null) : (kr.set(o, JSON.stringify({
            randomNum: c,
            expireTime: t() + r
        })), void setTimeout(function () {
            l = n(kr.get(o)) || {
                randomNum: 0,
                expireTime: 0
            }, l && l.randomNum === c ? (s(kr.get(e)), kr.remove(e), kr.remove(o)) : s(null)
        }, a))
    }, a.prototype.set = function (e, r, a, s, o) {
        if (!e || !r) throw new Error("key and val is must");
        a = a || 1e4, s = s || 1e3, o = o || function () {};
        var l = this.lockSetPrefix + e,
            c = kr.get(l),
            u = String(i());
        return c && (c = n(c) || {
            randomNum: 0,
            expireTime: 0
        }, c.expireTime > t()) ? o({
            status: "fail",
            reason: "This key is locked"
        }) : (kr.set(l, JSON.stringify({
            randomNum: u,
            expireTime: t() + a
        })), void setTimeout(function () {
            c = n(kr.get(l)) || {
                randomNum: 0,
                expireTime: 0
            }, c.randomNum === u ? kr.set(e, r) && o({
                status: "success"
            }) : o({
                status: "fail",
                reason: "This key is locked"
            })
        }, s))
    }, l.prototype.on = function (e, t) {
        if (!e || !t) return !1;
        if (!s(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var r = "object" == typeof t;
        return this._events[e].push(r ? t : {
            listener: t,
            once: !1
        }), this
    }, l.prototype.prepend = function (e, t) {
        if (!e || !t) return !1;
        if (!s(t)) throw new Error("listener must be a function");
        this._events[e] = this._events[e] || [];
        var r = "object" == typeof t;
        return this._events[e].unshift(r ? t : {
            listener: t,
            once: !1
        }), this
    }, l.prototype.prependOnce = function (e, t) {
        return this.prepend(e, {
            listener: t,
            once: !0
        })
    }, l.prototype.once = function (e, t) {
        return this.on(e, {
            listener: t,
            once: !0
        })
    }, l.prototype.off = function (e, t) {
        var r = this._events[e];
        if (!r) return !1;
        if ("number" == typeof t) r.splice(t, 1);
        else if ("function" == typeof t)
            for (var i = 0, n = r.length; i < n; i++) r[i] && r[i].listener === t && r.splice(i, 1);
        return this
    }, l.prototype.emit = function (e, t) {
        var r = this._events[e];
        if (!r) return !1;
        for (var i = 0; i < r.length; i++) {
            var n = r[i];
            n && (n.listener.call(this, t || {}), n.once && this.off(e, i))
        }
        return this
    }, l.prototype.removeAllListeners = function (e) {
        e && this._events[e] ? this._events[e] = [] : this._events = {}
    }, l.prototype.listeners = function (e) {
        return e && "string" == typeof e ? this._events[e] : this._events
    };
    var Dr = function () {
            var e = function () {
                    for (var e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
                    return e.toString(16) + t.toString(16)
                },
                t = function () {
                    return i().toString(16).replace(".", "")
                },
                r = function () {
                    function e(e, t) {
                        var r, i = 0;
                        for (r = 0; r < t.length; r++) i |= n[r] << 8 * r;
                        return e ^ i
                    }
                    var t, r, i = navigator.userAgent,
                        n = [],
                        a = 0;
                    for (t = 0; t < i.length; t++) r = i.charCodeAt(t), n.unshift(255 & r), n.length >= 4 && (a = e(a, n), n = []);
                    return n.length > 0 && (a = e(a, n)), a.toString(16)
                };
            return function () {
                var n = String(screen.height * screen.width);
                n = n && /\d{5,}/.test(n) ? n.toString(16) : String(31242 * i()).replace(".", "").slice(0, 8);
                var a = e() + "-" + t() + "-" + r() + "-" + n + "-" + e();
                return a ? a : (String(i()) + String(i()) + String(i())).slice(2, 15)
            }
        }(),
        Cr = function (e) {
            this.ele = e
        },
        Or = function (e, t) {
            for (var r = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && r.push(e);
            return r
        };
    Cr.prototype = {
        addClass: function (e) {
            var t = " " + this.ele.className + " ";
            return t.indexOf(" " + e + " ") === -1 && (this.ele.className = this.ele.className + ("" === this.ele.className ? "" : " ") + e), this
        },
        removeClass: function (e) {
            var t = " " + this.ele.className + " ";
            return t.indexOf(" " + e + " ") !== -1 && (this.ele.className = t.replace(" " + e + " ", " ").slice(1, -1)), this
        },
        hasClass: function (e) {
            var t = " " + this.ele.className + " ";
            return t.indexOf(" " + e + " ") !== -1
        },
        attr: function (e, t) {
            return "string" == typeof e && h(t) ? this.ele.getAttribute(e) : ("string" == typeof e && (t = String(t), this.ele.setAttribute(e, t)), this)
        },
        offset: function () {
            var e = this.ele.getBoundingClientRect();
            if (e.width || e.height) {
                var t = this.ele.ownerDocument,
                    r = t.documentElement;
                return {
                    top: e.top + window.pageYOffset - r.clientTop,
                    left: e.left + window.pageXOffset - r.clientLeft
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        getSize: function () {
            if (!window.getComputedStyle) return {
                width: this.ele.offsetWidth,
                height: this.ele.offsetHeight
            };
            try {
                var e = this.ele.getBoundingClientRect();
                return {
                    width: e.width,
                    height: e.height
                }
            } catch (t) {
                return {
                    width: 0,
                    height: 0
                }
            }
        },
        getStyle: function (e) {
            return this.ele.currentStyle ? this.ele.currentStyle[e] : this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(e)
        },
        wrap: function (e) {
            var t = document.createElement(e);
            return this.ele.parentNode.insertBefore(t, this.ele), t.appendChild(this.ele), y(t)
        },
        getCssStyle: function (e) {
            var t = this.ele.style.getPropertyValue(e);
            if (t) return t;
            var r = null;
            if ("function" == typeof window.getMatchedCSSRules && (r = window.getMatchedCSSRules(this.ele)), !r || !v(r)) return null;
            for (var i = r.length - 1; i >= 0; i--) {
                var n = r[i];
                if (t = n.style.getPropertyValue(e)) return t
            }
        },
        sibling: function (e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        },
        next: function () {
            return this.sibling(this.ele, "nextSibling")
        },
        prev: function () {
            return this.sibling(this.ele, "previousSibling")
        },
        siblings: function () {
            return Or((this.ele.parentNode || {}).firstChild, this.ele)
        },
        children: function () {
            return Or(this.ele.firstChild)
        },
        parent: function () {
            var e = this.ele.parentNode;
            return e = e && 11 !== e.nodeType ? e : null, y(e)
        },
        previousElementSibling: function () {
            var e = this.ele;
            if ("previousElementSibling" in document.documentElement) return y(e.previousElementSibling);
            for (; e = e.previousSibling;)
                if (1 === e.nodeType) return y(e);
            return y(null)
        },
        getSameTypeSiblings: function () {
            for (var e = this.ele, t = e.parentNode, r = e.tagName.toLowerCase(), i = [], n = 0; n < t.children.length; n++) {
                var a = t.children[n];
                1 === a.nodeType && a.tagName.toLowerCase() === r && i.push(t.children[n])
            }
            return i
        },
        getParents: function () {
            try {
                var e = this.ele;
                if (!g(e)) return [];
                var t = [e];
                if (null === e || null === e.parentElement) return [];
                for (; null !== e.parentElement;) e = e.parentElement, t.push(e);
                return t
            } catch (r) {
                return []
            }
        }
    };
    var jr = Array.prototype.forEach,
        $r = Object.prototype.hasOwnProperty,
        Nr = Object.prototype.hasOwnProperty,
        Tr = {
            get: function (e) {
                for (var t = e + "=", r = document.cookie.split(";"), i = 0; i < r.length; i++) {
                    for (var n = r[i];
                        " " == n.charAt(0);) n = n.substring(1, n.length);
                    if (0 == n.indexOf(t)) return c(n.substring(t.length, n.length))
                }
                return null
            },
            set: function (e, t, r, i, n, a, s) {
                function o(e) {
                    return !!e && e.replaceAll(/\r\n/g, "")
                }
                var l = s,
                    c = "",
                    u = "",
                    p = "";
                if (r = null == r ? 73e3 : r, 0 !== r) {
                    var f = new Date;
                    "s" === String(r).slice(-1) ? f.setTime(f.getTime() + 1e3 * Number(String(r).slice(0, -1))) : f.setTime(f.getTime() + 24 * r * 60 * 60 * 1e3), c = "; expires=" + f.toGMTString()
                }
                d(n) && "" !== n && (p = "; SameSite=" + n), a && (u = "; secure");
                var _ = "",
                    g = "",
                    h = "";
                e && (_ = o(e)), t && (g = o(t)), l && (h = o(l)), _ && g && (document.cookie = _ + "=" + encodeURIComponent(g) + c + "; path=/" + h + p + u)
            },
            remove: function (e, t) {
                this.set(e, "1", -1, t)
            },
            isSupport: function (e, t) {
                function r() {
                    i.set(e, t);
                    var r = i.get(e);
                    return r === t && (i.remove(e), !0)
                }
                e = e || "cookie_support_test", t = t || "1";
                var i = this;
                return navigator.cookieEnabled && r()
            }
        },
        Ir = Object.prototype.hasOwnProperty,
        Ar = {
            isSupport: function () {
                var e = !0,
                    t = "__session_storage_support__",
                    r = "testIsSupportStorage";
                try {
                    sessionStorage && sessionStorage.setItem ? (sessionStorage.setItem(t, r), sessionStorage.removeItem(t, r), e = !0) : e = !1
                } catch (i) {
                    e = !1
                }
                return e
            }
        },
        xr = {
            "+": "-",
            "/": "_",
            "=": "."
        },
        Lr = {
            "-": "+",
            _: "/",
            ".": "="
        },
        Er = {
            encode: function (e) {
                return e.replace(/[+\/=]/g, function (e) {
                    return xr[e]
                })
            },
            decode: function (e) {
                return e.replace(/[-_.]/g, function (e) {
                    return Lr[e]
                })
            },
            trim: function (e) {
                return e.replace(/[.=]{1,2}$/, "")
            },
            isBase64: function (e) {
                return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)
            },
            isUrlSafeBase64: function (e) {
                return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)
            }
        },
        Jr = {
            __proto__: null,
            ConcurrentStorage: a,
            EventEmitter: l,
            URL: _,
            UUID: Dr,
            addEvent: b,
            addHashEvent: S,
            ajax: D,
            base64Decode: O,
            base64Encode: j,
            bindReady: $,
            cookie: Tr,
            coverExtend: N,
            decodeURI: T,
            decodeURIComponent: c,
            dfmapping: I,
            each: k,
            encodeDates: L,
            extend: P,
            extend2Lev: E,
            filter: J,
            formatDate: x,
            formatJsonString: U,
            getCookieTopLevelDomain: R,
            getDomBySelector: H,
            getElementContent: B,
            getHostname: W,
            getIOSVersion: M,
            getQueryParam: q,
            getQueryParamsFromUrl: V,
            getRandom: i,
            getRandomBasic: Pr,
            getScreenOrientation: z,
            getUA: X,
            getURL: Z,
            getURLPath: Y,
            getURLSearchParams: u,
            hasAttribute: G,
            hasAttributes: Q,
            hashCode: ee,
            hashCode53: te,
            indexOf: re,
            inherit: ie,
            isArguments: ne,
            isArray: v,
            isBoolean: ae,
            isDate: A,
            isElement: g,
            isEmptyObject: se,
            isFunction: e,
            isHttpUrl: oe,
            isIOS: le,
            isJSONString: ce,
            isNumber: ue,
            isObject: r,
            isString: d,
            isSupportBeaconSend: de,
            isSupportCors: pe,
            isUndefined: h,
            jsonp: fe,
            listenPageState: _e,
            loadScript: ge,
            localStorage: kr,
            logger: wr,
            map: C,
            mediaQueriesSupported: F,
            now: t,
            removeScriptProtocol: he,
            rot13defs: ve,
            rot13obfs: me,
            ry: y,
            safeJSONParse: n,
            searchObjDate: ye,
            sessionStorage: Ar,
            setCssStyle: be,
            strToUnicode: Se,
            throttle: we,
            toArray: Pe,
            trim: p,
            unique: De,
            urlParse: f,
            urlSafeBase64: Er,
            values: ke,
            xhr: w
        },
        Ur = {},
        Kr = {
            preset_properties: {
                search_keyword_baidu: !1,
                latest_utm: !0,
                latest_traffic_source_type: !0,
                latest_search_keyword: !0,
                latest_referrer: !0,
                latest_referrer_host: !1,
                latest_landing_page: !1,
                latest_wx_ad_click_id: void 0,
                url: !0,
                title: !0
            },
            encrypt_cookie: !1,
            enc_cookie: !1,
            img_use_crossorigin: !1,
            name: "sa",
            max_referrer_string_length: 200,
            max_string_length: 500,
            max_id_length: 255,
            max_key_length: 100,
            cross_subdomain: !0,
            show_log: !1,
            is_debug: !1,
            debug_mode: !1,
            debug_mode_upload: !1,
            source_channel: [],
            sdk_id: "",
            send_type: "image",
            vtrack_ignore: {},
            auto_init: !0,
            is_track_single_page: !1,
            is_single_page: !1,
            batch_send: !1,
            source_type: {},
            callback_timeout: 200,
            datasend_timeout: 8e3,
            is_track_device_id: !1,
            ignore_oom: !0,
            app_js_bridge: !1
        },
        Rr = "data:enc;",
        Hr = "dfm-enc-",
        Br = {
            distinct_id: function () {},
            jssdkDebug: function () {},
            _sendDebug: function (e) {},
            apph5: function (e) {
                var t = "app_h5\u6253\u901a\u5931\u8d25-",
                    i = {
                        1: t + "use_app_track\u4e3afalse",
                        2: t + "Android\u6216\u8005iOS\uff0c\u6ca1\u6709\u66b4\u9732\u76f8\u5e94\u65b9\u6cd5",
                        3.1: t + "Android\u6821\u9a8cserver_url\u5931\u8d25",
                        3.2: t + "iOS\u6821\u9a8cserver_url\u5931\u8d25",
                        4.1: t + "H5 \u6821\u9a8c iOS server_url \u5931\u8d25",
                        4.2: t + "H5 \u6821\u9a8c Android server_url \u5931\u8d25"
                    },
                    n = e.output,
                    a = e.step,
                    s = e.data || "";
                "all" !== n && "console" !== n || Ce(i[a]), ("all" === n || "code" === n) && r(Ur.is_debug) && Ur.is_debug.apph5 && (s.type && "profile" === s.type.slice(0, 7) || (s.properties._jssdk_debug_info = "apph5-" + String(a)))
            },
            defineMode: function (e) {
                var t = {
                    1: {
                        title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
                        message: "App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 App SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
                        link_text: "\u914d\u7f6e\u6587\u6863",
                        link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                    },
                    2: {
                        title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
                        message: "App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 Web JS SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
                        link_text: "\u914d\u7f6e\u6587\u6863",
                        link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                    },
                    3: {
                        title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
                        message: "Web JS SDK \u6ca1\u6709\u5f00\u542f\u5168\u57cb\u70b9\u914d\u7f6e\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
                        link_text: "\u914d\u7f6e\u6587\u6863",
                        link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html"
                    },
                    4: {
                        title: "\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",
                        message: "Web JS SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0e App SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",
                        link_text: "\u914d\u7f6e\u6587\u6863",
                        link_url: "https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"
                    }
                };
                return !(!e || !t[e]) && t[e]
            },
            protocol: {
                protocolIsSame: function (e, t) {
                    try {
                        if (_(e).protocol !== _(t).protocol) return !1
                    } catch (r) {
                        return Ce("\u4e0d\u652f\u6301 _.URL \u65b9\u6cd5"), !1
                    }
                    return !0
                },
                serverUrl: function () {
                    d(Ur.server_url) && "" !== Ur.server_url && !this.protocolIsSame(Ur.server_url, location.href) && Ce("SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\n\u56e0\u4e3a\uff1a1\u3001https \u4e0b\u9762\u53d1\u9001 http \u7684\u56fe\u7247\u8bf7\u6c42\u4f1a\u5931\u8d25\u30022\u3001http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002")
                },
                ajax: function (e) {
                    return e !== Ur.server_url && void(d(e) && "" !== e && !this.protocolIsSame(e, location.href) && Ce("SDK \u68c0\u6d4b\u5230\u60a8\u7684\u6570\u636e\u53d1\u9001\u5730\u5740\u548c\u5f53\u524d\u9875\u9762\u5730\u5740\u7684\u534f\u8bae\u4e0d\u4e00\u81f4\uff0c\u5efa\u8bae\u60a8\u4fee\u6539\u6210\u4e00\u81f4\u7684\u534f\u8bae\u3002\u56e0\u4e3a http \u9875\u9762\u4f7f\u7528 https + ajax \u65b9\u5f0f\u53d1\u6570\u636e\uff0c\u5728 ie9 \u53ca\u4ee5\u4e0b\u4f1a\u4e22\u5931\u6570\u636e\u3002"))
                }
            }
        },
        Wr = "utm_source utm_medium utm_campaign utm_content utm_term",
        Mr = "1.23.3",
        qr = "sensorsdata_domain_test",
        Vr = {
            EMAIL: "$identity_email",
            MOBILE: "$identity_mobile",
            LOGIN: "$identity_login_id"
        },
        Fr = {
            data: {},
            id: function () {
                return this.data.id ? this.data.id : (this.data.id = Ee(), this.data.id)
            },
            type: function () {
                return this.data.type ? this.data.type : (this.data.type = Je(), this.data.type)
            }
        },
        zr = {
            initPage: function () {
                var e = Ke(),
                    t = Z(),
                    r = Ae(t);
                r || Br.jssdkDebug("url_domain\u5f02\u5e38_" + t + "_" + r), this.pageProp = {
                    referrer: e,
                    referrer_host: e ? W(e) : "",
                    url: t,
                    url_host: W(t, "url_host\u53d6\u503c\u5f02\u5e38"),
                    url_domain: r
                }
            },
            pageProp: {},
            campaignParams: function () {
                return br.kit.getUtmData()
            },
            campaignParamsStandard: function (e, t) {
                e = e || "", t = t || "";
                var r = zr.campaignParams(),
                    i = {},
                    n = {};
                return k(r, function (r, a, s) {
                    (" " + Wr + " ").indexOf(" " + a + " ") !== -1 ? i[e + a] = s[a] : n[t + a] = s[a]
                }), {
                    $utms: i,
                    otherUtms: n
                }
            },
            properties: function () {
                var e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
                    t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
                    r = {
                        $timezone_offset: (new Date).getTimezoneOffset(),
                        $screen_height: Number(screen.height) || 0,
                        $screen_width: Number(screen.width) || 0,
                        $viewport_height: e,
                        $viewport_width: t,
                        $lib: "js",
                        $lib_version: Mr
                    };
                return r
            },
            currentProps: {},
            register: function (e) {
                P(zr.currentProps, e)
            }
        },
        Xr = {
            get: function (e) {
                return Tr.get(e)
            },
            set: function (e, t, r, i) {
                var n = "";
                if (i = "undefined" == typeof i ? Ur.cross_subdomain : i) {
                    var a = Ae(location.href);
                    "url\u89e3\u6790\u5931\u8d25" === a && (a = ""), n = a ? "; domain=" + a : ""
                }
                return Tr.set(e, t, r, i, Ur.set_cookie_samesite, Ur.is_secure_cookie, n)
            },
            remove: function (e, t) {
                return t = "undefined" == typeof t ? Ur.cross_subdomain : t, Tr.remove(e, t)
            },
            isSupport: function (e, t) {
                return e = e || "sajssdk_2015_cookie_access_test", t = t || "1", Tr.isSupport(e, t)
            }
        };
    Xr.getNewUser = Ze;
    var Zr = {
            data: {},
            get: function (e) {
                var t = this.data[e];
                return void 0 === t ? null : void 0 !== t._expirationTimestamp_ ? (new Date).getTime() > t._expirationTimestamp_ ? null : t.value : t
            },
            set: function (e, t, r) {
                if (r) {
                    var i, n = new Date;
                    i = "s" === String(r).slice(-1) ? n.getTime() + 1e3 * Number(String(r).slice(0, -1)) : n.getTime() + 24 * r * 60 * 60 * 1e3, t = {
                        value: t,
                        _expirationTimestamp_: i
                    }
                }
                this.data[e] = t
            },
            getNewUserFlagMemoryKey: function (e) {
                return "sajssdk_2015_" + Ur.sdk_id + e
            }
        },
        Yr = {
            checkIsAddSign: function (e) {
                "track" === e.type && (Ze() ? e.properties.$is_first_day = !0 : e.properties.$is_first_day = !1)
            },
            is_first_visit_time: !1,
            is_page_first_visited: !1,
            checkIsFirstTime: function (e) {
                "track" === e.type && "$pageview" === e.event && (this.is_first_visit_time ? (e.properties.$is_first_time = !0, this.is_first_visit_time = !1) : e.properties.$is_first_time = !1)
            },
            setDeviceId: function (e) {
                var t = null,
                    r = Xr.get("sensorsdata2015jssdkcross" + br.para.sdk_id);
                r = je(r);
                var i = {};
                null != r && ce(r) && (i = JSON.parse(r), i.$device_id && (t = i.$device_id)), t = t || e, br.para.cross_subdomain === !0 ? br.store.set("$device_id", t) : (i.$device_id = t, i = JSON.stringify(i), br.para.encrypt_cookie && (i = $e(i)), Xr.set("sensorsdata2015jssdkcross" + br.para.sdk_id, i, null, !0)), br.para.is_track_device_id && (zr.currentProps.$device_id = t)
            },
            storeInitCheck: function () {
                if (br.is_first_visitor) {
                    var e = new Date,
                        t = {
                            h: 23 - e.getHours(),
                            m: 59 - e.getMinutes(),
                            s: 59 - e.getSeconds()
                        };
                    Xr.isSupport() ? Xr.set(Xe("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s") : Zr.set(Zr.getNewUserFlagMemoryKey("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s"), this.is_first_visit_time = !0, this.is_page_first_visited = !0
                } else Ze() || (this.checkIsAddSign = function (e) {
                    "track" === e.type && (e.properties.$is_first_day = !1)
                }), this.checkIsFirstTime = function (e) {
                    "track" === e.type && "$pageview" === e.event && (e.properties.$is_first_time = !1)
                }
            },
            checkIsFirstLatest: function () {
                var e = zr.pageProp.url_domain,
                    t = {};
                "" === e && (e = "url\u89e3\u6790\u5931\u8d25");
                var i = He(document.referrer, !0);
                if (br.para.preset_properties.search_keyword_baidu ? Ue(document.referrer) && (!Le() || r(i) && i.active ? br.store._state && br.store._state.props && (br.store._state.props.$search_keyword_id && delete br.store._state.props.$search_keyword_id, br.store._state.props.$search_keyword_id_type && delete br.store._state.props.$search_keyword_id_type, br.store._state.props.$search_keyword_id_hash && delete br.store._state.props.$search_keyword_id_hash) : (t.$search_keyword_id = Fr.id(), t.$search_keyword_id_type = Fr.type(), t.$search_keyword_id_hash = te(t.$search_keyword_id))) : br.store._state && br.store._state.props && (br.store._state.props.$search_keyword_id && delete br.store._state.props.$search_keyword_id, br.store._state.props.$search_keyword_id_type && delete br.store._state.props.$search_keyword_id_type, br.store._state.props.$search_keyword_id_hash && delete br.store._state.props.$search_keyword_id_hash), br.store.save(), k(br.para.preset_properties, function (i, n) {
                        if (n.indexOf("latest_") === -1) return !1;
                        if (n = n.slice(7), i) {
                            if ("wx_ad_click_id" === n && "not_collect" === i) return !1;
                            if ("utm" !== n && "url\u89e3\u6790\u5931\u8d25" === e) "wx_ad_click_id" === n ? (t._latest_wx_ad_click_id = "url\u7684domain\u89e3\u6790\u5931\u8d25", t._latest_wx_ad_hash_key = "url\u7684domain\u89e3\u6790\u5931\u8d25", t._latest_wx_ad_callbacks = "url\u7684domain\u89e3\u6790\u5931\u8d25") : t["$latest_" + n] = "url\u7684domain\u89e3\u6790\u5931\u8d25";
                            else if (Ue(document.referrer)) switch (n) {
                                case "traffic_source_type":
                                    t.$latest_traffic_source_type = We();
                                    break;
                                case "referrer":
                                    t.$latest_referrer = zr.pageProp.referrer;
                                    break;
                                case "search_keyword":
                                    He() ? t.$latest_search_keyword = He() : r(br.store._state) && r(br.store._state.props) && br.store._state.props.$latest_search_keyword && delete br.store._state.props.$latest_search_keyword;
                                    break;
                                case "landing_page":
                                    t.$latest_landing_page = Z();
                                    break;
                                case "wx_ad_click_id":
                                    var a = Be(location.href);
                                    t._latest_wx_ad_click_id = a.click_id, t._latest_wx_ad_hash_key = a.hash_key, t._latest_wx_ad_callbacks = a.callbacks
                            }
                        } else if ("utm" === n && br.store._state && br.store._state.props)
                            for (var s in br.store._state.props)(0 === s.indexOf("$latest_utm") || 0 === s.indexOf("_latest_") && s.indexOf("_latest_wx_ad_") < 0) && delete br.store._state.props[s];
                        else if (br.store._state && br.store._state.props && "$latest_" + n in br.store._state.props) delete br.store._state.props["$latest_" + n];
                        else if ("wx_ad_click_id" == n && br.store._state && br.store._state.props && i === !1) {
                            var o = ["_latest_wx_ad_click_id", "_latest_wx_ad_hash_key", "_latest_wx_ad_callbacks"];
                            k(o, function (e) {
                                e in br.store._state.props && delete br.store._state.props[e]
                            })
                        }
                    }), br.register(t), br.para.preset_properties.latest_utm) {
                    var n = zr.campaignParamsStandard("$latest_", "_latest_"),
                        a = n.$utms,
                        s = n.otherUtms;
                    se(a) || br.register(a), se(s) || br.register(s)
                }
            }
        },
        Gr = {
            requests: [],
            _sessionState: {},
            _state: {
                distinct_id: "",
                first_id: "",
                props: {},
                identities: {}
            },
            getProps: function () {
                return this._state.props || {}
            },
            getSessionProps: function () {
                return this._sessionState
            },
            getOriginDistinctId: function () {
                return this._state._distinct_id || this._state.distinct_id
            },
            getOriginUnionId: function (e) {
                var t = {};
                e = e || this._state;
                var r = e._first_id || e.first_id,
                    i = e._distinct_id || e.distinct_id;
                return r && i ? (t.login_id = i, t.anonymous_id = r) : t.anonymous_id = i, t
            },
            getDistinctId: function () {
                var e = this.getUnionId();
                return e.login_id || e.anonymous_id
            },
            getUnionId: function (e) {
                var t = this.getOriginUnionId(e);
                return t.login_id && this._state.history_login_id && this._state.history_login_id.name && this._state.history_login_id.name !== br.IDENTITY_KEY.LOGIN && (t.login_id = this._state.history_login_id.name + "+" + t.login_id), t
            },
            getFirstId: function () {
                return this._state._first_id || this._state.first_id
            },
            initSessionState: function () {
                var e = Xr.get("sensorsdata2015session");
                e = je(e);
                var t = null;
                null !== e && "object" == typeof (t = n(e)) && (this._sessionState = t || {})
            },
            setOnce: function (e, t) {
                e in this._state || this.set(e, t)
            },
            set: function (e, t) {
                this._state = this._state || {};
                var r = this._state.distinct_id;
                this._state[e] = t, "first_id" === e ? delete this._state._first_id : "distinct_id" === e && delete this._state._distinct_id, this.save(), "distinct_id" === e && r && br.events.tempAdd("changeDistinctId", t)
            },
            change: function (e, t) {
                this._state["_" + e] = t
            },
            setSessionProps: function (e) {
                var t = this._sessionState;
                P(t, e), this.sessionSave(t)
            },
            setSessionPropsOnce: function (e) {
                var t = this._sessionState;
                N(t, e), this.sessionSave(t)
            },
            setProps: function (e, t) {
                var r = {};
                r = t ? e : P(this._state.props || {}, e);
                for (var i in r) "string" == typeof r[i] && (r[i] = r[i].slice(0, br.para.max_referrer_string_length));
                this.set("props", r)
            },
            setPropsOnce: function (e) {
                var t = this._state.props || {};
                N(t, e), this.set("props", t)
            },
            clearAllProps: function (e) {
                this._sessionState = {};
                var t;
                if (v(e) && e.length > 0)
                    for (t = 0; t < e.length; t++) d(e[t]) && e[t].indexOf("latest_") === -1 && r(this._state.props) && e[t] in this._state.props && delete this._state.props[e[t]];
                else if (r(this._state.props))
                    for (t in this._state.props) 1 !== t.indexOf("latest_") && delete this._state.props[t];
                this.sessionSave({}), this.save()
            },
            sessionSave: function (e) {
                this._sessionState = e;
                var t = JSON.stringify(this._sessionState);
                br.para.encrypt_cookie && (t = $e(t)), Xr.set("sensorsdata2015session", t, 0)
            },
            save: function () {
                var e = JSON.parse(JSON.stringify(this._state));
                delete e._first_id, delete e._distinct_id, e.identities && (e.identities = j(JSON.stringify(e.identities)));
                var t = JSON.stringify(e);
                br.para.encrypt_cookie && (t = $e(t)), Xr.set(this.getCookieName(), t, 73e3, br.para.cross_subdomain)
            },
            getCookieName: function () {
                var e = "";
                if (br.para.cross_subdomain === !1) {
                    try {
                        e = _(location.href).hostname
                    } catch (t) {
                        br.log(t)
                    }
                    e = "string" == typeof e && "" !== e ? "sa_jssdk_2015_" + br.para.sdk_id + e.replace(/\./g, "_") : "sa_jssdk_2015_root" + br.para.sdk_id
                } else e = "sensorsdata2015jssdkcross" + br.para.sdk_id;
                return e
            },
            init: function () {
                function e(e) {
                    var t;
                    e.identities && (0 === e.identities.indexOf("\n/") ? e.identities = n(ve(e.identities)) : e.identities = n(O(e.identities)));
                    var i = Gr.getOriginUnionId(e);
                    e.identities && r(e.identities) && !se(e.identities) ? e.identities.$identity_anonymous_id && e.identities.$identity_anonymous_id !== i.anonymous_id && (e.identities.$identity_anonymous_id = i.anonymous_id) : (e.identities = {}, e.identities.$identity_anonymous_id = i.anonymous_id, e.identities.$identity_cookie_id = Dr()), e.history_login_id = e.history_login_id || {};
                    var a = e.history_login_id,
                        s = a.name;
                    if (i.login_id)
                        if (s && e.identities.hasOwnProperty(s)) {
                            if (e.identities[s] !== i.login_id) {
                                e.identities[s] = i.login_id;
                                for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && t !== s && delete e.identities[t];
                                e.history_login_id.value = i.login_id
                            }
                        } else {
                            var o = s || br.IDENTITY_KEY.LOGIN;
                            e.identities[o] = i.login_id;
                            for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && t !== o && delete e.identities[t];
                            e.history_login_id = {
                                name: o,
                                value: i.login_id
                            }
                        }
                    else {
                        if (e.identities.hasOwnProperty("$identity_login_id") || e.identities.hasOwnProperty(s))
                            for (t in e.identities) e.identities.hasOwnProperty(t) && "$identity_cookie_id" !== t && "$identity_anonymous_id" !== t && delete e.identities[t];
                        e.history_login_id = {
                            name: "",
                            value: ""
                        }
                    }
                    return e
                }

                function t(e) {
                    br.store.set("distinct_id", e), br.store.set("identities", {
                        $identity_cookie_id: e
                    }), br.store.set("history_login_id", {
                        name: "",
                        value: ""
                    })
                }
                this.initSessionState();
                var i, a, s = Dr();
                Xr.isSupport() && (i = Xr.get(this.getCookieName()), i = je(i), a = n(i)), Xr.isSupport() && null !== i && ce(i) && r(a) && (!r(a) || a.distinct_id) ? (br.store._state = P(e(a)), br.store.save()) : (br.is_first_visitor = !0, t(s)), Yr.setDeviceId(s), Yr.storeInitCheck(), Yr.checkIsFirstLatest()
            },
            saveObjectVal: function (e, t) {
                d(t) || (t = JSON.stringify(t)), 1 == br.para.encrypt_cookie && (t = $e(t)), kr.set(e, t)
            },
            readObjectVal: function (e) {
                var t = kr.get(e);
                return t ? (t = je(t), n(t)) : null
            }
        },
        Qr = {
            string: function (e) {
                Ce(e + " must be string")
            },
            emptyString: function (e) {
                Ce(e + "'s is empty")
            },
            regexTest: function (e) {
                Ce(e + " is invalid")
            },
            idLength: function (e) {
                Ce(e + " length is longer than " + Ur.max_id_length)
            },
            keyLength: function (e) {
                Ce(e + " length is longer than " + Ur.max_key_length)
            },
            stringLength: function (e) {
                Ce(e + " length is longer than " + Ur.max_string_length)
            },
            voidZero: function (e) {
                Ce(e + "'s is undefined")
            },
            reservedLoginId: function (e) {
                Ce(e + " is invalid")
            },
            reservedBind: function (e) {
                Ce(e + " is invalid")
            },
            reservedUnbind: function (e) {
                Ce(e + " is invalid")
            }
        },
        ei = {
            regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_tag.*|^user_group.*)[a-zA-Z_$][a-zA-Z\d_$]*)$/i,
            loginIDReservedNames: ["$identity_anonymous_id", "$identity_cookie_id"],
            bindReservedNames: ["$identity_login_id", "$identity_anonymous_id", "$identity_cookie_id"],
            unbindReservedNames: ["$identity_anonymous_id", Vr.LOGIN],
            string: function (e) {
                return !!d(e)
            },
            emptyString: function (e) {
                return !(!d(e) || 0 === p(e).length)
            },
            regexTest: function (e) {
                return !(!d(e) || !this.regName.test(e))
            },
            idLength: function (e) {
                return !(!d(e) || e.length > Ur.max_id_length)
            },
            keyLength: function (e) {
                return !(!d(e) || e.length > Ur.max_key_length)
            },
            stringLength: function (e) {
                return !(!d(e) || e.length > Ur.max_string_length)
            },
            voidZero: function (e) {
                return void 0 !== e
            },
            reservedLoginId: function (e) {
                return !(re(this.loginIDReservedNames, e) > -1)
            },
            reservedUnbind: function (e) {
                return !(re(this.unbindReservedNames, e) > -1)
            },
            reservedBind: function (e) {
                var t = Gr._state.history_login_id;
                return (!t || !t.name || t.name !== e) && !(re(this.bindReservedNames, e) > -1)
            }
        },
        ti = {
            distinct_id: {
                rules: ["string", "emptyString", "idLength"],
                onComplete: function (t, r, i) {
                    return !t && ("emptyString" === i && (r = "Id"), e(Qr[i]) && Qr[i](r), "idLength" === i) || t
                }
            },
            event: {
                rules: ["string", "emptyString", "keyLength", "regexTest"],
                onComplete: function (t, r, i) {
                    return t || ("emptyString" === i && (r = "eventName"), e(Qr[i]) && Qr[i](r)), !0
                }
            },
            propertyKey: {
                rules: ["string", "emptyString", "keyLength", "regexTest"],
                onComplete: function (t, r, i) {
                    return t || ("emptyString" === i && (r = "Property key"), e(Qr[i]) && Qr[i](r)), !0
                }
            },
            propertyValue: {
                rules: ["voidZero"],
                onComplete: function (t, r, i) {
                    return t || (r = "Property Value", e(Qr[i]) && Qr[i](r)), !0
                }
            },
            properties: function (t) {
                return r(t) ? k(t, function (t, r) {
                    Ye({
                        propertyKey: r
                    });
                    var i = function (t, i, n) {
                        return t || (i = r + "'s Value", e(Qr[n]) && Qr[n](i)), !0
                    };
                    Ye({
                        propertyValue: t
                    }, i)
                }) : ei.voidZero(t) && Ce("properties\u53ef\u4ee5\u6ca1\u6709\uff0c\u4f46\u6709\u7684\u8bdd\u5fc5\u987b\u662f\u5bf9\u8c61"), !0
            },
            propertiesMust: function (e) {
                return void 0 !== e && r(e) && !se(e) ? this.properties.call(this, e) : Ce("properties\u5fc5\u987b\u662f\u5bf9\u8c61"), !0
            },
            item_type: {
                rules: ["string", "emptyString", "keyLength", "regexTest"],
                onComplete: function (t, r, i) {
                    return t || ("emptyString" === i && (r = "item_type"), e(Qr[i]) && Qr[i](r)), !0
                }
            },
            item_id: {
                rules: ["string", "emptyString", "stringLength"],
                onComplete: function (t, r, i) {
                    return t || ("emptyString" === i && (r = "item_id"), e(Qr[i]) && Qr[i](r)), !0
                }
            },
            loginIdKey: {
                rules: ["string", "emptyString", "keyLength", "regexTest", "reservedLoginId"],
                onComplete: function (t, r, i) {
                    return !t && ("emptyString" === i && (r = "login_id_key"), e(Qr[i]) && Qr[i](r), "keyLength" === i) || t
                }
            },
            bindKey: {
                rules: ["string", "emptyString", "keyLength", "regexTest", "reservedBind"],
                onComplete: function (t, r, i) {
                    return !t && ("emptyString" === i && (r = "Key"), e(Qr[i]) && Qr[i](r), "keyLength" === i) || t
                }
            },
            unbindKey: {
                rules: ["string", "emptyString", "keyLength", "regexTest", "reservedUnbind"],
                onComplete: function (t, r, i) {
                    return !t && ("emptyString" === i && (r = "Key"), e(Qr[i]) && Qr[i](r), "keyLength" === i) || t
                }
            },
            bindValue: {
                rules: ["string", "emptyString", "idLength"],
                onComplete: function (t, r, i) {
                    return !t && ("emptyString" === i && (r = "Value"), e(Qr[i]) && Qr[i](r), "idLength" === i) || t
                }
            },
            check: function (t, r, i) {
                var n = this[t];
                if (e(n)) return n.call(this, r);
                if (!n) return !1;
                for (var a = 0; a < n.rules.length; a++) {
                    var s = n.rules[a],
                        o = ei[s](r),
                        l = e(i) ? i(o, r, s) : n.onComplete(o, r, s);
                    if (!o) return l
                }
                return !0
            }
        },
        ri = {
            stage: null,
            init: function (e) {
                this.stage = e
            }
        },
        ii = {};
    ii.check = Ye, ii.sendItem = function (e) {
        var t = {
            lib: {
                $lib: "js",
                $lib_method: "code",
                $lib_version: String(br.lib_version)
            },
            time: 1 * new Date
        };
        P(t, e), ri.stage.process("formatData", t), br.sendState.getSendCall(t)
    }, ii.send = function (e, t) {
        var r = br.kit.buildData(e);
        br.kit.sendData(r, t)
    }, ii.debugPath = function (e) {
        var t = e,
            r = "";
        r = br.para.debug_mode_url.indexOf("?") !== -1 ? br.para.debug_mode_url + "&" + br.kit.encodeTrackData(e) : br.para.debug_mode_url + "?" + br.kit.encodeTrackData(e), Ve({
            url: r,
            type: "GET",
            cors: !0,
            header: {
                "Dry-Run": String(br.para.debug_mode_upload)
            },
            success: function (e) {
                se(e) === !0 ? alert("debug\u6570\u636e\u53d1\u9001\u6210\u529f" + t) : alert("debug\u5931\u8d25 \u9519\u8bef\u539f\u56e0" + JSON.stringify(e))
            }
        })
    };
    var ni = {
            label: !1,
            li: !1,
            a: !0,
            button: !0
        },
        ai = {
            otherTags: [],
            initUnlimitedTags: function () {
                k(ai.otherTags, function (e) {
                    e in ni && (ni[e] = !0)
                })
            },
            isUnlimitedTag: function (e) {
                if (!e || 1 !== e.nodeType) return !1;
                var t = e.nodeName.toLowerCase();
                return ni[t] || Q(e, br.para.heatmap.track_attr)
            },
            getTargetElement: function (e, t) {
                var r = this,
                    i = e;
                if ("object" != typeof i) return null;
                if ("string" != typeof i.tagName) return null;
                var n = i.tagName.toLowerCase();
                if ("body" === n.toLowerCase() || "html" === n.toLowerCase()) return null;
                if (!i || !i.parentNode || !i.parentNode.children) return null;
                var a = i.parentNode,
                    s = r.otherTags;
                if ("a" === n || "button" === n || "input" === n || "textarea" === n) return i;
                if (re(s, n) > -1) return i;
                if ("area" === n && "map" === a.tagName.toLowerCase() && y(a).prev().tagName && "img" === y(a).prev().tagName.toLowerCase()) return y(a).prev();
                if ("div" === n && br.para.heatmap.collect_tags.div && r.isDivLevelValid(i)) {
                    var o = br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div && br.para.heatmap.collect_tags.div.max_level || 1;
                    if (o > 1 || r.isCollectableDiv(i)) return i
                }
                if (r.isStyleTag(n) && br.para.heatmap.collect_tags.div) {
                    var l = r.getCollectableParent(i);
                    if (l && r.isDivLevelValid(l)) return l
                }
                var c = r.hasElement({
                    event: t && t.originalEvent || t,
                    element: e
                }, function (e) {
                    return r.isUnlimitedTag(e)
                });
                return c || null
            },
            getDivLevels: function (e, t) {
                var r = ai.getElementPath(e, !0, t),
                    i = r.split(" > "),
                    n = 0;
                return k(i, function (e) {
                    "div" === e && n++
                }), n
            },
            isDivLevelValid: function (e) {
                for (var t = br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div && br.para.heatmap.collect_tags.div.max_level || 1, r = e.getElementsByTagName("div"), i = r.length - 1; i >= 0; i--)
                    if (ai.getDivLevels(r[i], e) > t) return !1;
                return !0
            },
            getElementPath: function (e, t, r) {
                for (var i = []; e.parentNode;) {
                    if (e.id && !t && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.id)) {
                        i.unshift(e.tagName.toLowerCase() + "#" + e.id);
                        break
                    }
                    if (r && e === r) {
                        i.unshift(e.tagName.toLowerCase());
                        break
                    }
                    if (e === document.body) {
                        i.unshift("body");
                        break
                    }
                    i.unshift(e.tagName.toLowerCase()), e = e.parentNode
                }
                return i.join(" > ")
            },
            getClosestLi: function (e) {
                var t = function (e, t) {
                    for (; e && e !== document && 1 === e.nodeType; e = e.parentNode)
                        if (e.tagName.toLowerCase() === t) return e;
                    return null
                };
                return t(e, "li")
            },
            getElementPosition: function (e, t, r) {
                function i(e) {
                    var t = e.parentNode;
                    if (!t) return "";
                    var r = y(e).getSameTypeSiblings(),
                        i = r.length;
                    if (1 === i) return 0;
                    for (var n = 0, a = e; y(a).previousElementSibling().ele; a = y(a).previousElementSibling().ele, n++);
                    return n
                }
                var n = br.heatmap.getClosestLi(e);
                if (!n) return null;
                var a = e.tagName.toLowerCase(),
                    s = n.getElementsByTagName(a),
                    o = s.length,
                    l = [];
                if (o > 1) {
                    for (var c = 0; c < o; c++) {
                        var u = br.heatmap.getElementPath(s[c], r);
                        u === t && l.push(s[c])
                    }
                    if (l.length > 1) return re(l, e)
                }
                return i(n)
            },
            setNotice: function (e) {
                br.is_heatmap_render_mode = !0, br.para.heatmap || (br.errorMsg = "\u60a8SDK\u6ca1\u6709\u914d\u7f6e\u5f00\u542f\u70b9\u51fb\u56fe\uff0c\u53ef\u80fd\u6ca1\u6709\u6570\u636e\uff01"), e && "http:" === e.slice(0, 5) && "https:" === location.protocol && (br.errorMsg = "\u60a8\u7684\u5f53\u524d\u9875\u9762\u662fhttps\u7684\u5730\u5740\uff0c\u795e\u7b56\u5206\u6790\u73af\u5883\u4e5f\u5fc5\u987b\u662fhttps\uff01"), br.para.heatmap_url || (br.para.heatmap_url = ze() + "//static.sensorsdata.cn/sdk/" + br.lib_version + "/heatmap.min.js")
            },
            getDomIndex: function (e) {
                if (!e.parentNode) return -1;
                for (var t = 0, r = e.tagName, i = e.parentNode.children, n = 0; n < i.length; n++)
                    if (i[n].tagName === r) {
                        if (e === i[n]) return t;
                        t++
                    } return -1
            },
            selector: function (e, t) {
                var r = e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
                return e.getAttribute && e.getAttribute("id") && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) && (!br.para.heatmap || br.para.heatmap && "not_use_id" !== br.para.heatmap.element_selector) && !t ? "#" + e.getAttribute("id") : e.tagName.toLowerCase() + (~r ? ":nth-of-type(" + (r + 1) + ")" : "")
            },
            getDomSelector: function (e, t, r) {
                if (!e || !e.parentNode || !e.parentNode.children) return !1;
                t = t && t.join ? t : [];
                var i = e.nodeName.toLowerCase();
                return e && "body" !== i && 1 == e.nodeType ? (t.unshift(this.selector(e, r)), e.getAttribute && e.getAttribute("id") && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(e.getAttribute("id")) && br.para.heatmap && "not_use_id" !== br.para.heatmap.element_selector && !r ? t.join(" > ") : this.getDomSelector(e.parentNode, t, r)) : (t.unshift("body"), t.join(" > "))
            },
            na: function () {
                var e = document.documentElement.scrollLeft || window.pageXOffset;
                return parseInt(isNaN(e) ? 0 : e, 10)
            },
            i: function () {
                var e = 0;
                try {
                    e = o.documentElement && o.documentElement.scrollTop || m.pageYOffset, e = isNaN(e) ? 0 : e
                } catch (t) {
                    e = 0
                }
                return parseInt(e, 10)
            },
            getBrowserWidth: function () {
                var e = window.innerWidth || document.body.clientWidth;
                return isNaN(e) ? 0 : parseInt(e, 10)
            },
            getBrowserHeight: function () {
                var e = window.innerHeight || document.body.clientHeight;
                return isNaN(e) ? 0 : parseInt(e, 10)
            },
            getScrollWidth: function () {
                var e = parseInt(document.body.scrollWidth, 10);
                return isNaN(e) ? 0 : e
            },
            getEleDetail: function (e) {
                var t = this.getDomSelector(e),
                    r = xe({
                        target: e
                    });
                r.$element_selector = t ? t : "", r.$element_path = br.heatmap.getElementPath(e, br.para.heatmap && "not_use_id" === br.para.heatmap.element_selector);
                var i = br.heatmap.getElementPosition(e, r.$element_path, br.para.heatmap && "not_use_id" === br.para.heatmap.element_selector);
                return ue(i) && (r.$element_position = i), r
            },
            getPointerEventProp: function (e, t) {
                function r() {
                    var e = document.body.scrollLeft || document.documentElement.scrollLeft || 0,
                        t = document.body.scrollTop || document.documentElement.scrollTop || 0;
                    return {
                        scrollLeft: e,
                        scrollTop: t
                    }
                }

                function i(e) {
                    if (document.documentElement.getBoundingClientRect) {
                        var t = e.getBoundingClientRect();
                        return {
                            targetEleX: t.left + r().scrollLeft || 0,
                            targetEleY: t.top + r().scrollTop || 0
                        }
                    }
                }

                function n(e) {
                    return Number(Number(e).toFixed(3))
                }

                function a(e) {
                    var a = e.pageX || e.clientX + r().scrollLeft || e.offsetX + i(t).targetEleX || 0,
                        s = e.pageY || e.clientY + r().scrollTop || e.offsetY + i(t).targetEleY || 0;
                    return {
                        $page_x: n(a),
                        $page_y: n(s)
                    }
                }
                return e ? a(e) : {}
            },
            start: function (t, i, n, a, s) {
                var o = r(a) ? a : {},
                    l = e(s) ? s : e(a) ? a : void 0;
                if (br.para.heatmap && br.para.heatmap.collect_element && !br.para.heatmap.collect_element(i)) return !1;
                var c = this.getEleDetail(i);
                if (br.para.heatmap && br.para.heatmap.custom_property) {
                    var u = br.para.heatmap.custom_property(i);
                    r(u) && (c = P(c, u))
                }
                c = P(c, this.getPointerEventProp(t, i), o), "a" === n && br.para.heatmap && br.para.heatmap.isTrackLink === !0 ? br.trackLink({
                    event: t,
                    target: i
                }, "$WebClick", c) : br.track("$WebClick", c, l)
            },
            hasElement: function (e, t) {
                var r;
                if (e.event) {
                    var i = e.event;
                    r = i.path || i._getPath && i._getPath()
                } else e.element && (r = y(e.element).getParents());
                if (r && v(r) && r.length > 0)
                    for (var n = 0; n < r.length; n++)
                        if ("object" == typeof r[n] && 1 === r[n].nodeType && t(r[n])) return r[n]
            },
            isStyleTag: function (e, t) {
                var i = ["a", "div", "input", "button", "textarea"],
                    n = ["mark", "/mark", "strong", "b", "em", "i", "u", "abbr", "ins", "del", "s", "sup"];
                return !(re(i, e) > -1) && (!t || br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div ? !!(r(br.para.heatmap) && r(br.para.heatmap.collect_tags) && r(br.para.heatmap.collect_tags.div) && v(br.para.heatmap.collect_tags.div.ignore_tags) && re(br.para.heatmap.collect_tags.div.ignore_tags, e) > -1) : re(n, e) > -1)
            },
            isCollectableDiv: function (e, t) {
                try {
                    if (0 === e.children.length) return !0;
                    for (var r = 0; r < e.children.length; r++)
                        if (1 === e.children[r].nodeType) {
                            var i = e.children[r].tagName.toLowerCase(),
                                n = br.para && br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div && br.para.heatmap.collect_tags.div.max_level;
                            if (!("div" === i && n > 1 || this.isStyleTag(i, t))) return !1;
                            if (!this.isCollectableDiv(e.children[r], t)) return !1
                        } return !0
                } catch (a) {
                    br.log(a)
                }
                return !1
            },
            getCollectableParent: function (e, t) {
                try {
                    var r = e.parentNode,
                        i = r ? r.tagName.toLowerCase() : "";
                    if ("body" === i) return !1;
                    var n = br.para && br.para.heatmap && br.para.heatmap.collect_tags && br.para.heatmap.collect_tags.div && br.para.heatmap.collect_tags.div.max_level;
                    if (i && "div" === i && (n > 1 || this.isCollectableDiv(r, t))) return r;
                    if (r && this.isStyleTag(i, t)) return this.getCollectableParent(r, t)
                } catch (a) {
                    br.log(a)
                }
                return !1
            },
            listenUrlChange: function (e) {
                e(), br.ee.spa.on("switch", function () {
                    e()
                })
            },
            initScrollmap: function () {
                if (!r(br.para.heatmap) || "default" !== br.para.heatmap.scroll_notice_map) return !1;
                var t = !0;
                br.para.scrollmap && e(br.para.scrollmap.collect_url) && this.listenUrlChange(function () {
                    t = !!br.para.scrollmap.collect_url()
                });
                var i = function (e) {
                        var t = {};
                        return t.timeout = e.timeout || 1e3, t.func = e.func, t.hasInit = !1, t.inter = null, t.main = function (e, t) {
                            this.func(e, t), this.inter = null
                        }, t.go = function (e) {
                            var r = {};
                            this.inter || (r.$viewport_position = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0, r.$viewport_position = Math.round(r.$viewport_position) || 0, e ? t.main(r, !0) : this.inter = setTimeout(function () {
                                t.main(r)
                            }, this.timeout))
                        }, t
                    },
                    n = i({
                        timeout: 1e3,
                        func: function (e, t) {
                            var r = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
                                i = new Date,
                                n = i - this.current_time;
                            (n > br.para.heatmap.scroll_delay_time && r - e.$viewport_position !== 0 || t) && (e.$url = Z(), e.$title = document.title, e.$url_path = Y(), e.event_duration = Math.min(br.para.heatmap.scroll_event_duration, parseInt(n) / 1e3), e.event_duration = e.event_duration < 0 ? 0 : e.event_duration, br.track("$WebStay", e)), this.current_time = i
                        }
                    });
                n.current_time = new Date, Fe(window, "scroll", function () {
                    return !!t && void n.go()
                }), Fe(window, "unload", function () {
                    return !!t && void n.go("notime")
                })
            },
            initHeatmap: function () {
                var t = this,
                    i = !0;
                return !(!r(br.para.heatmap) || "default" !== br.para.heatmap.clickmap) && (e(br.para.heatmap.collect_url) && this.listenUrlChange(function () {
                    i = !!br.para.heatmap.collect_url()
                }), "all" === br.para.heatmap.collect_elements ? br.para.heatmap.collect_elements = "all" : br.para.heatmap.collect_elements = "interact", void("all" === br.para.heatmap.collect_elements ? Fe(document, "click", function (e) {
                    if (!i) return !1;
                    var r = e || window.event;
                    if (!r) return !1;
                    var n = r.target || r.srcElement;
                    if ("object" != typeof n) return !1;
                    if ("string" != typeof n.tagName) return !1;
                    var a = n.tagName.toLowerCase();
                    if ("body" === a || "html" === a) return !1;
                    if (!n || !n.parentNode || !n.parentNode.children) return !1;
                    var s = n.parentNode.tagName.toLowerCase();
                    "a" === s || "button" === s ? t.start(r, n.parentNode, s) : t.start(r, n, a)
                }) : Fe(document, "click", function (e) {
                    if (!i) return !1;
                    var n = e || window.event;
                    if (!n) return !1;
                    var a = n.target || n.srcElement,
                        s = br.heatmap.getTargetElement(a, e);
                    s ? t.start(n, s, s.tagName.toLowerCase()) : g(a) && "div" === a.tagName.toLowerCase() && r(br.para.heatmap) && br.para.heatmap.get_vtrack_config && br.unlimitedDiv.events.length > 0 && br.unlimitedDiv.isTargetEle(a) && t.start(n, a, a.tagName.toLowerCase(), {
                        $lib_method: "vtrack"
                    })
                })))
            }
        },
        si = {
            setOnlineState: function (e) {
                if (e === !0 && r(br.para.jsapp) && "function" == typeof br.para.jsapp.getData) {
                    br.para.jsapp.isOnline = !0;
                    var t = br.para.jsapp.getData();
                    v(t) && t.length > 0 && k(t, function (e) {
                        ce(e) && br.sendState.realtimeSend(JSON.parse(e))
                    })
                } else br.para.jsapp.isOnline = !1
            },
            autoTrackIsUsed: !1,
            isReady: function (e) {
                e()
            },
            getUtm: function () {
                return zr.campaignParams()
            },
            getStayTime: function () {
                return (new Date - br._t) / 1e3
            },
            setProfileLocal: function (e) {
                if (!kr.isSupport()) return br.setProfile(e), !1;
                if (!r(e) || se(e)) return !1;
                var t = br.store.readObjectVal("sensorsdata_2015_jssdk_profile"),
                    i = !1;
                if (r(t) && !se(t)) {
                    for (var n in e) !(n in t && t[n] !== e[n]) && n in t || (t[n] = e[n], i = !0);
                    i && (br.store.saveObjectVal("sensorsdata_2015_jssdk_profile", t), br.setProfile(e))
                } else br.store.saveObjectVal("sensorsdata_2015_jssdk_profile", e), br.setProfile(e)
            },
            setInitReferrer: function () {
                var e = Ke();
                br.setOnceProfile({
                    _init_referrer: e,
                    _init_referrer_host: zr.pageProp.referrer_host
                })
            },
            setSessionReferrer: function () {
                var e = Ke();
                br.store.setSessionPropsOnce({
                    _session_referrer: e,
                    _session_referrer_host: zr.pageProp.referrer_host
                })
            },
            setDefaultAttr: function () {
                zr.register({
                    _current_url: location.href,
                    _referrer: Ke(),
                    _referring_host: zr.pageProp.referrer_host
                })
            },
            trackHeatMap: function (e, t, r) {
                console.log(e)
                console.log(t)
                console.log(r)
                if ("object" == typeof e && e.tagName) {
                    var i = e.tagName.toLowerCase(),
                        n = e.parentNode.tagName.toLowerCase(),
                        a = br.para.heatmap && br.para.heatmap.track_attr ? br.para.heatmap.track_attr : ["data-sensors-click"];
                    "button" === i || "a" === i || "a" === n || "button" === n || "input" === i || "textarea" === i || Q(e, a) || ai.start(null, e, i, t, r)
                }
            },
            trackAllHeatMap: function (e, t, r) {
                if ("object" == typeof e && e.tagName) {
                    var i = e.tagName.toLowerCase();
                    ai.start(null, e, i, t, r)
                }
            },
            autoTrackSinglePage: function (e, t) {
                function i() {
                    var e = zr.campaignParams(),
                        t = {};
                    return k(e, function (e, r, i) {
                        (" " + br.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = i[r] : t[r] = i[r]
                    }), t
                }

                function n(e, t) {
                    br.track("$pageview", P({
                        $referrer: a,
                        $url: Z(),
                        $url_path: Y(),
                        $title: document.title
                    }, e, i()), t), a = Z()
                }
                var a;
                a = this.autoTrackIsUsed ? zr.pageProp.url : zr.pageProp.referrer, e = r(e) ? e : {};
                var s = !e.not_set_profile;
                if (e.not_set_profile && delete e.not_set_profile, n(e, t), this.autoTrackSinglePage = n, br.is_first_visitor && s) {
                    var o = {};
                    br.para.preset_properties.search_keyword_baidu && Ue(document.referrer) && Le() && (o.$search_keyword_id = Fr.id(), o.$search_keyword_id_type = Fr.type(), o.$search_keyword_id_hash = te(o.$search_keyword_id)), br.setOnceProfile(P({
                        $first_visit_time: new Date,
                        $first_referrer: Ke(),
                        $first_browser_language: d(navigator.language) ? navigator.language.toLowerCase() : "\u53d6\u503c\u5f02\u5e38",
                        $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "\u53d6\u503c\u5f02\u5e38",
                        $first_traffic_source_type: We(),
                        $first_search_keyword: He()
                    }, i(), o)), br.is_first_visitor = !1
                }
            },
            autoTrackWithoutProfile: function (e, t) {
                e = r(e) ? e : {}, this.autoTrack(P(e, {
                    not_set_profile: !0
                }), t)
            },
            autoTrack: function (e, t) {
                e = r(e) ? e : {};
                var i = zr.campaignParams(),
                    n = {};
                k(i, function (e, t, r) {
                    (" " + br.source_channel_standard + " ").indexOf(" " + t + " ") !== -1 ? n["$" + t] = r[t] : n[t] = r[t]
                });
                var a = !e.not_set_profile;
                e.not_set_profile && delete e.not_set_profile;
                var s = location.href;
                if (br.para.is_single_page && S(function () {
                        var r = Ke(s, !0);
                        br.track("$pageview", P({
                            $referrer: r,
                            $url: Z(),
                            $url_path: Y(),
                            $title: document.title
                        }, n, e), t), s = Z()
                    }), br.track("$pageview", P({
                        $referrer: Ke(null, !0),
                        $url: Z(),
                        $url_path: Y(),
                        $title: document.title
                    }, n, e), t), br.is_first_visitor && a) {
                    var o = {};
                    br.para.preset_properties.search_keyword_baidu && Ue(document.referrer) && Le() && (o.$search_keyword_id = Fr.id(), o.$search_keyword_id_type = Fr.type(), o.$search_keyword_id_hash = te(o.$search_keyword_id)), br.setOnceProfile(P({
                        $first_visit_time: new Date,
                        $first_referrer: Ke(null, !0),
                        $first_browser_language: d(navigator.language) ? navigator.language.toLowerCase() : "\u53d6\u503c\u5f02\u5e38",
                        $first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "\u53d6\u503c\u5f02\u5e38",
                        $first_traffic_source_type: We(),
                        $first_search_keyword: He()
                    }, n, o)), br.is_first_visitor = !1
                }
                this.autoTrackIsUsed = !0
            },
            getAnonymousID: function () {
                return se(br.store._state) ? "\u8bf7\u5148\u521d\u59cb\u5316SDK" : br.store._state._first_id || br.store._state.first_id || br.store._state._distinct_id || br.store._state.distinct_id
            },
            setPlugin: function (t) {
                return !!r(t) && void k(t, function (t, i) {
                    e(t) && (r(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[i] ? t(window.SensorsDataWebJSSDKPlugin[i]) : br.log(i + "\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574" + i + "\u7684\u5f15\u5165\u987a\u5e8f\uff01"))
                })
            },
            useModulePlugin: function () {
                br.use.apply(br, arguments)
            },
            useAppPlugin: function () {
                this.setPlugin.apply(this, arguments)
            }
        },
        oi = new l,
        li = new l,
        ci = {};
    ci.spa = oi, ci.sdk = li, ci.initSystemEvent = function () {
        et(function (e) {
            oi.emit("switch", e)
        })
    }, ci.EVENT_LIST = {
        spaSwitch: ["spa", "switch"],
        sdkAfterInitPara: ["sdk", "afterInitPara"],
        sdkBeforeInit: ["sdk", "beforeInit"],
        sdkAfterInit: ["sdk", "afterInit"]
    };
    var ui = {
            state: 0,
            historyState: [],
            stateType: {
                1: "1-init\u672a\u5f00\u59cb",
                2: "2-init\u5f00\u59cb",
                3: "3-store\u5b8c\u6210"
            },
            getState: function () {
                return this.historyState.join("\n")
            },
            setState: function (e) {
                String(e) in this.stateType && (this.state = e), this.historyState.push(this.stateType[e])
            }
        },
        di = {
            __proto__: null,
            addReferrerHost: rt,
            addPropsHook: it,
            initPara: nt,
            setInitVar: st,
            enableLocalLog: ot,
            disableLocalLog: lt,
            quick: ct,
            use: ut,
            track: dt,
            bind: pt,
            unbind: ft,
            trackLink: _t,
            trackLinks: gt,
            setItem: ht,
            deleteItem: mt,
            setProfile: vt,
            setOnceProfile: yt,
            appendProfile: bt,
            incrementProfile: St,
            deleteProfile: wt,
            unsetProfile: kt,
            identify: Pt,
            trackSignup: Ct,
            registerPage: Ot,
            clearAllRegister: jt,
            clearPageRegister: $t,
            register: Nt,
            registerOnce: Tt,
            registerSession: It,
            registerSessionOnce: At,
            login: Lt,
            loginWithKey: Et,
            logout: Jt,
            getPresetProperties: Ut,
            iOSWebClickPolyfill: Kt,
            readyState: ui,
            para_default: Kr,
            log: Ce,
            debug: Br,
            IDENTITY_KEY: Vr,
            on: tt
        },
        pi = function () {
            this._events = [], this.pendingEvents = []
        };
    pi.prototype = {
        emit: function (e) {
            var t = [].slice.call(arguments, 1);
            k(this._events, function (r) {
                r.type === e && r.callback.apply(r.context, t)
            }), this.pendingEvents.push({
                type: e,
                data: t
            }), this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null
        },
        on: function (e, t, r, i) {
            "function" == typeof t && (this._events.push({
                type: e,
                callback: t,
                context: r || this
            }), i = i !== !1, this.pendingEvents.length > 0 && i && k(this.pendingEvents, function (i) {
                i.type === e && t.apply(r, i.data)
            }))
        },
        tempAdd: function (e, t) {
            if (t && e) return this.emit(e, t)
        },
        isReady: function () {}
    };
    var fi = {
            __proto__: null,
            parseSuperProperties: Ne,
            searchConfigData: Te,
            strip_empty_properties: Ie,
            getCurrentDomain: Ae,
            getEleInfo: xe,
            isBaiduTraffic: Le,
            getReferrerEqid: Ee,
            getReferrerEqidType: Je,
            getBaiduKeyword: Fr,
            isReferralTraffic: Ue,
            getReferrer: Ke,
            getKeywordFromReferrer: He,
            getWxAdIdFromUrl: Be,
            getReferSearchEngine: Re,
            getSourceFromReferrer: We,
            info: zr,
            ajax: Ve,
            getElementContent: qe,
            cookie: Xr,
            addEvent: Fe,
            EventEmitterSa: pi,
            encrypt: $e,
            decryptIfNeeded: je
        },
        _i = {
            stage: null,
            init: function (e) {
                this.stage = e
            }
        },
        gi = {};
    gi.buildData = function (e) {
        var t = {
            identities: {},
            distinct_id: br.store.getDistinctId(),
            lib: {
                $lib: "js",
                $lib_method: "code",
                $lib_version: String(br.lib_version)
            },
            properties: {}
        };
        return r(e) && r(e.identities) && !se(e.identities) ? P(t.identities, e.identities) : P(t.identities, Gr._state.identities), r(e) && r(e.properties) && !se(e.properties) && (e.properties.$lib_detail && (t.lib.$lib_detail = e.properties.$lib_detail, delete e.properties.$lib_detail), e.properties.$lib_method && (t.lib.$lib_method = e.properties.$lib_method, delete e.properties.$lib_method)), P(t, br.store.getUnionId(), e), Ge(t), r(e.properties) && !se(e.properties) && P(t.properties, e.properties), e.type && "profile" === e.type.slice(0, 7) || (t.properties = P({}, zr.properties(), Gr.getProps(), Gr.getSessionProps(), zr.currentProps, t.properties), br.para.preset_properties.latest_referrer && !d(t.properties.$latest_referrer) && (t.properties.$latest_referrer = "\u53d6\u503c\u5f02\u5e38"), br.para.preset_properties.latest_search_keyword && !d(t.properties.$latest_search_keyword) && (br.para.preset_properties.search_keyword_baidu && d(t.properties.$search_keyword_id) && ue(t.properties.$search_keyword_id_hash) && d(t.properties.$search_keyword_id_type) || (t.properties.$latest_search_keyword = "\u53d6\u503c\u5f02\u5e38")), br.para.preset_properties.latest_traffic_source_type && !d(t.properties.$latest_traffic_source_type) && (t.properties.$latest_traffic_source_type = "\u53d6\u503c\u5f02\u5e38"), br.para.preset_properties.latest_landing_page && !d(t.properties.$latest_landing_page) && (t.properties.$latest_landing_page = "\u53d6\u503c\u5f02\u5e38"), "not_collect" === br.para.preset_properties.latest_wx_ad_click_id ? (delete t.properties._latest_wx_ad_click_id, delete t.properties._latest_wx_ad_hash_key, delete t.properties._latest_wx_ad_callbacks) : br.para.preset_properties.latest_wx_ad_click_id && !d(t.properties._latest_wx_ad_click_id) && (t.properties._latest_wx_ad_click_id = "\u53d6\u503c\u5f02\u5e38", t.properties._latest_wx_ad_hash_key = "\u53d6\u503c\u5f02\u5e38", t.properties._latest_wx_ad_callbacks = "\u53d6\u503c\u5f02\u5e38"), d(t.properties._latest_wx_ad_click_id) && (t.properties.$url = Z())), t.properties.$time && A(t.properties.$time) ? (t.time = 1 * t.properties.$time, delete t.properties.$time) : t.time = 1 * new Date, br.vtrackBase.addCustomProps(t), Ne(t), Yr.checkIsAddSign(t), Yr.checkIsFirstTime(t), br.addReferrerHost(t), br.addPropsHook(t), Qe(t), t
    }, gi.sendData = function (e, t) {
        var r = Te(e.properties);
        br.para.debug_mode === !0 ? (br.log(e), br.saEvent.debugPath(JSON.stringify(e), t)) : br.sendState.getSendCall(e, r, t)
    }, gi.encodeTrackData = function (e) {
        var t = j(e),
            r = "crc=" + ee(t);
        return "data=" + encodeURIComponent(t) + "&ext=" + encodeURIComponent(r)
    }, gi.getUtmData = function () {
        return Rt()
    };
    var hi = function (e) {
        this.callback = e.callback, this.img = document.createElement("img"), this.img.width = 1, this.img.height = 1, br.para.img_use_crossorigin && (this.img.crossOrigin = "anonymous"), this.data = e.data, this.server_url = Ht(e.server_url, e.data)
    };
    hi.prototype.start = function () {
        var e = this;
        br.para.ignore_oom && (this.img.onload = function () {
            this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
        }, this.img.onerror = function () {
            this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
        }, this.img.onabort = function () {
            this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
        }), this.img.src = this.server_url
    }, hi.prototype.lastClear = function () {
        var e = X();
        void 0 !== e.ie ? this.img.src = "about:blank" : this.img.src = ""
    };
    var mi = function (e) {
        this.callback = e.callback, this.server_url = e.server_url, this.data = Bt(e.data)
    };
    mi.prototype.start = function () {
        var e = this;
        Ve({
            url: this.server_url,
            type: "POST",
            data: this.data,
            credentials: !1,
            timeout: br.para.datasend_timeout,
            cors: !0,
            success: function () {
                e.isEnd()
            },
            error: function () {
                e.isEnd()
            }
        })
    };
    var vi = function (e) {
        this.callback = e.callback, this.server_url = e.server_url, this.data = Bt(e.data)
    };
    vi.prototype.start = function () {
        var e = this;
        "object" == typeof navigator && "function" == typeof navigator.sendBeacon && navigator.sendBeacon(this.server_url, this.data), setTimeout(function () {
            e.isEnd()
        }, 40)
    };
    var yi = {
            stage: null,
            init: function (e) {
                this.stage = e
            },
            interceptor: {
                send: {
                    entry: function (e, t) {
                        var r = t.sensors,
                            i = e.callback;
                        return r.para.app_js_bridge ? r.para.app_js_bridge.is_mui ? r.para.app_js_bridge.is_mui ? window.plus && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event ? (window.plus.SDAnalytics.trackH5Event(e), r._.isFunction(i) && i(), e) : r.para.app_js_bridge.is_send === !0 ? (r.sendState.prepareServerUrl(e), e) : (r._.isFunction(i) && i(), e) : void 0 : r.para.app_js_bridge.is_send === !0 ? (r.debug.apph5({
                            data: e.data,
                            step: "2",
                            output: "all"
                        }), r.sendState.prepareServerUrl(e), e) : (r._.isFunction(i) && i(), e) : (r.debug.apph5({
                            data: e.data,
                            step: "1",
                            output: "code"
                        }), r.sendState.prepareServerUrl(e), e)
                    }
                }
            }
        },
        bi = {};
    bi.getSendCall = function (e, t, r) {
        if (br.is_heatmap_render_mode) return !1;
        if (br.readyState.state < 3) return br.log("\u521d\u59cb\u5316\u6ca1\u6709\u5b8c\u6210"), !1;
        e._track_id = Number(String(i()).slice(2, 5) + String(i()).slice(2, 4) + String((new Date).getTime()).slice(-4)), e._flush_time = (new Date).getTime();
        var n = e;
        e = JSON.stringify(e);
        var a = {
            data: n,
            config: t,
            callback: r
        };
        return br.events.tempAdd("send", n), !br.para.app_js_bridge && br.para.batch_send && kr.isSupport() && localStorage.length < 100 ? (br.log(n), br.batchSend.add(a.data), !1) : ("item_set" === n.type || "item_delete" === n.type ? this.prepareServerUrl(a) : yi.stage.process("beforeSend", a), void br.log(n))
    }, bi.prepareServerUrl = function (e) {
        if ("object" == typeof e.config && e.config.server_url) this.sendCall(e, e.config.server_url, e.callback);
        else if (v(br.para.server_url) && br.para.server_url.length)
            for (var t = 0; t < br.para.server_url.length; t++) this.sendCall(e, br.para.server_url[t]);
        else "string" == typeof br.para.server_url && "" !== br.para.server_url ? this.sendCall(e, br.para.server_url, e.callback) : br.log("\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01")
    }, bi.sendCall = function (e, t, i) {
        var n = {
            server_url: t,
            data: JSON.stringify(e.data),
            callback: i,
            config: e.config
        };
        r(br.para.jsapp) && !br.para.jsapp.isOnline && "function" == typeof br.para.jsapp.setData ? (delete n.callback, n = JSON.stringify(n), br.para.jsapp.setData(n)) : this.realtimeSend(n)
    }, bi.realtimeSend = function (e) {
        var t = qt(e);
        t.start()
    };
    var Si = "sawebjssdk-",
        wi = "tab-sawebjssdk-";
    Vt.prototype = {
        batchInterval: function () {
            "" === this.serverUrl && this.getServerUrl(), this.hasTabStorage || (this.generateTabStorage(), this.hasTabStorage = !0);
            var e = this;
            e.timer = setTimeout(function () {
                e.updateExpireTime(), e.recycle(), e.send(), clearTimeout(e.timer), e.batchInterval()
            }, br.para.batch_send.send_interval)
        },
        getServerUrl: function () {
            return d(br.para.server_url) && "" !== br.para.server_url || v(br.para.server_url) && br.para.server_url.length ? void(this.serverUrl = v(br.para.server_url) ? br.para.server_url[0] : br.para.server_url) : br.log("\u5f53\u524d server_url \u4e3a\u7a7a\u6216\u4e0d\u6b63\u786e\uff0c\u53ea\u5728\u63a7\u5236\u53f0\u6253\u5370\u65e5\u5fd7\uff0cnetwork \u4e2d\u4e0d\u4f1a\u53d1\u6570\u636e\uff0c\u8bf7\u914d\u7f6e\u6b63\u786e\u7684 server_url\uff01")
        },
        send: function () {
            if (!(this.sendTimeStamp && t() - this.sendTimeStamp < br.para.batch_send.datasend_timeout)) {
                var e = kr.get(this.tabKey);
                if (e && (this.sendTimeStamp = t(), e = n(e) || this.generateTabStorageVal(), e.data.length)) {
                    for (var r = [], i = 0; i < e.data.length; i++) r.push(br.store.readObjectVal(e.data[i]));
                    this.request(r, e.data)
                }
            }
        },
        updateExpireTime: function () {
            var e = kr.get(this.tabKey);
            e && (e = n(e) || this.generateTabStorageVal(), e.expireTime = t() + 2 * br.para.batch_send.send_interval, e.serverUrl = this.serverUrl, kr.set(this.tabKey, JSON.stringify(e)))
        },
        request: function (e, t) {
            var r = this;
            D({
                url: this.serverUrl,
                type: "POST",
                data: "data_list=" + encodeURIComponent(j(JSON.stringify(e))),
                credentials: !1,
                timeout: br.para.batch_send.datasend_timeout,
                cors: !0,
                success: function () {
                    r.remove(t), r.sendTimeStamp = 0
                },
                error: function () {
                    r.sendTimeStamp = 0
                }
            })
        },
        remove: function (e) {
            var t = kr.get(this.tabKey);
            if (t) {
                for (var r = (n(t) || this.generateTabStorageVal()).data, i = 0; i < e.length; i++) {
                    var a = re(r, e[i]);
                    a > -1 && r.splice(a, 1), kr.remove(e[i])
                }
                kr.set(this.tabKey, JSON.stringify(this.generateTabStorageVal(r)))
            }
        },
        add: function (e) {
            var r = Si + String(i()),
                a = kr.get(this.tabKey);
            null === a ? (this.tabKey = wi + String(i()), a = this.generateTabStorageVal()) : a = n(a) || this.generateTabStorageVal(), a.data.push(r), a.expireTime = t() + 2 * br.para.batch_send.send_interval, kr.set(this.tabKey, JSON.stringify(a)), br.store.saveObjectVal(r, e), "track_signup" !== e.type && "$pageview" !== e.event || this.sendImmediately()
        },
        generateTabStorage: function () {
            this.tabKey = wi + String(i()), kr.set(this.tabKey, JSON.stringify(this.generateTabStorageVal()))
        },
        generateTabStorageVal: function (e) {
            return e = e || [], {
                data: e,
                expireTime: t() + 2 * br.para.batch_send.send_interval,
                serverUrl: this.serverUrl
            }
        },
        sendImmediately: function () {
            this.send()
        },
        recycle: function () {
            for (var e = {}, r = 1e4, i = "sajssdk-lock-get-", s = 0; s < localStorage.length; s++) {
                var o = localStorage.key(s),
                    l = this;
                if (0 === o.indexOf(wi)) {
                    for (var c = n(kr.get(o)) || this.generateTabStorageVal(), u = 0; u < c.data.length; u++) e[c.data[u]] = !0;
                    if (t() > c.expireTime && this.serverUrl === c.serverUrl) {
                        var d = new a(i);
                        d.get(o, r, 1e3, function (e) {
                            if (e) {
                                null === kr.get(l.tabKey) && l.generateTabStorage();
                                var t = n(e) || l.generateTabStorageVal();
                                kr.set(l.tabKey, JSON.stringify(l.generateTabStorageVal((n(kr.get(l.tabKey)) || this.generateTabStorageVal()).data.concat(t.data))))
                            }
                        })
                    }
                } else if (0 === o.indexOf(i)) {
                    var p = n(kr.get(o)) || {
                        expireTime: 0
                    };
                    t() - p.expireTime > r && kr.remove(o)
                }
            }
            for (var f = 0; f < localStorage.length; f++) {
                var _ = localStorage.key(f);
                0 !== _.indexOf(Si) || e[_] || kr.remove(_)
            }
        }
    };
    var ki = new Vt,
        Pi = {
            bridge_info: {
                touch_app_bridge: !1,
                verify_success: !1,
                platform: "",
                support_two_way_call: !1
            },
            is_verify_success: !1,
            initPara: function () {
                var e = {
                    is_send: br.para.use_app_track_is_send !== !1 && "only" !== br.para.use_app_track,
                    white_list: [],
                    is_mui: "mui" === br.para.use_app_track
                };
                "object" == typeof br.para.app_js_bridge ? br.para.app_js_bridge = P({}, e, br.para.app_js_bridge) : br.para.use_app_track !== !0 && br.para.app_js_bridge !== !0 && "only" !== br.para.use_app_track && "mui" !== br.para.use_app_track || (br.para.app_js_bridge = P({}, e)), br.para.app_js_bridge.is_send === !1 && br.log("\u8bbe\u7f6e\u4e86 is_send:false,\u5982\u679c\u6253\u901a\u5931\u8d25\uff0c\u6570\u636e\u5c06\u88ab\u4e22\u5f03!")
            },
            app_js_bridge_v1: function () {
                function e(e) {
                    i = e, ce(i) && (i = JSON.parse(i)), n && (n(i), n = null, i = null)
                }

                function t() {
                    "object" == typeof window.SensorsData_APP_JS_Bridge && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app && (i = SensorsData_APP_JS_Bridge.sensorsdata_call_app(), ce(i) && (i = JSON.parse(i)))
                }

                function r() {
                    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                        var e = document.createElement("iframe");
                        e.setAttribute("src", "sensorsanalytics://getAppInfo"), document.documentElement.appendChild(e), e.parentNode.removeChild(e), e = null
                    }
                }
                var i = null,
                    n = null;
                window.sensorsdata_app_js_bridge_call_js = function (t) {
                    e(t)
                }, br.getAppStatus = function (e) {
                    return r(), t(), e ? void(null === i ? n = e : (e(i), i = null)) : i
                }
            },
            hasVisualModeBridge: function () {
                var e = window.SensorsData_App_Visual_Bridge,
                    t = "sensorsdata_visualized_mode";
                return r(e) && e[t] && (e[t] === !0 || e[t]())
            },
            validateAppUrl: Xt
        };
    Ft.prototype.call = function (e, t) {
        var r = this,
            n = (new Date).getTime().toString(16) + String(i()).replace(".", "").slice(1, 8);
        this.resultCbs[n] = r.resultCbs[n] || {
            result: null,
            callbacks: []
        }, this.timeoutCbs[n] = r.timeoutCbs[n] || {
            isTimeout: !1,
            callbacks: []
        }, e = e.data ? e : {
            data: e
        }, e.data.message_id = n;
        var a = P({
            callType: this.type
        }, e);
        return t && (this.timerId = setTimeout(function () {
            r.timeoutCbs[n].isTimeout = !0;
            for (var e in r.timeoutCbs[n].callbacks) r.timeoutCbs[n].callbacks[e].call(null), r.timeoutCbs[n].callbacks.splice(e, 1)
        }, t)), zt(a), {
            onResult: function (e) {
                return r.resultCbs[n].result ? (e(r.resultCbs[n].result), this) : (!r.timeoutCbs[n].isTimeout && r.resultCbs[n].callbacks.push(e), this)
            },
            onTimeout: function (e) {
                return r.timeoutCbs[n].isTimeout ? (e(), this) : (!r.resultCbs[n].result && r.timeoutCbs[n].callbacks.push(e), this)
            }
        }
    }, Ft.prototype.onAppNotify = function (e) {
        this.appCallJsCallback = e
    }, Ft.prototype.notifyApp = function (e, t) {
        var r = P({
            callType: this.type
        }, e);
        return t && (r.message_id = t), zt(r)
    }, Zt.prototype = {
        "double": function () {},
        getAppData: function () {},
        hasAppBridge: function () {
            return br.bridge.bridge_info.support_two_way_call
        },
        init: function () {},
        jsCallApp: function () {},
        requestToApp: function (t) {
            this.bridge.call(t, t.timeout.time).onResult(function (r) {
                e(t.callback) && t.callback(r)
            }).onTimeout(function () {
                e(t.timeout.callback) && t.timeout.callback()
            })
        }
    };
    var Di = {};
    Di.initUrl = function () {
        var e, t = {
            server_url: {
                project: "",
                host: ""
            },
            page_url: {
                host: "",
                pathname: ""
            }
        };
        if (!d(br.para.server_url)) return br.log("----vcollect---server_url\u5fc5\u987b\u4e3a\u5b57\u7b26\u4e32"), !1;
        try {
            e = _(br.para.server_url), t.server_url.project = e.searchParams.get("project") || "default", t.server_url.host = e.host
        } catch (r) {
            return br.log("----vcollect---server_url\u89e3\u6790\u5f02\u5e38", r), !1
        }
        var i;
        try {
            i = _(location.href), t.page_url.host = i.hostname, t.page_url.pathname = i.pathname
        } catch (r) {
            return br.log("----vcollect---\u9875\u9762\u5730\u5740\u89e3\u6790\u5f02\u5e38", r), !1
        }
        return t
    }, Di.isDiv = function (e) {
        if (e.element_path) {
            var t = e.element_path.split(">"),
                r = p(t.pop());
            if ("div" !== r.slice(0, 3)) return !1
        }
        return !0
    }, Di.configIsMatchNew = function (e, t) {
        if (d(e.$element_selector) && d(t.element_selector)) {
            if ("element_selector" === t.element_field && "equal" === t["function"]) return e.$element_selector === t.element_selector;
            if ("element_selector" === t.element_field && "contain" === t["function"]) return e.$element_selector.indexOf(t.element_selector) > -1
        }
        if (d(e.$element_path) && d(t.element_path)) {
            if ("element_path" === t.element_field && "equal" === t["function"]) return e.$element_path === t.element_path;
            if ("element_path" === t.element_field && "contain" === t["function"]) return e.$element_path.indexOf(t.element_path) > -1
        }
        return !1
    }, Di.configIsMatch = function (e, t) {
        return (!t.limit_element_content || t.element_content === e.$element_content) && ((!t.limit_element_position || t.element_position === String(e.$element_position)) && (t.element_field && t["function"] ? Di.configIsMatchNew(e, t) : Di.configIsMatchOldVersion(e, t)))
    }, Di.configIsMatchOldVersion = function (e, t) {
        if (!t.element_path) return !1;
        if (void 0 !== e.$element_position) {
            if (t.element_path !== e.$element_path) return !1
        } else if (br.vtrackBase.isDiv({
                element_path: t.element_path
            })) {
            if (e.$element_path.indexOf(t.element_path) < 0) return !1
        } else if (t.element_path !== e.$element_path) return !1;
        return !0
    }, Di.filterConfig = function (e, t, i) {
        var n = [];
        if (!i) {
            var a = Di.initUrl();
            if (!a) return [];
            i = a.page_url
        }
        return "$WebClick" === e.event && k(t, function (t) {
            r(t) && ("webclick" === t.event_type || "appclick" === t.event_type) && r(t.event) && t.event.url_host === i.host && t.event.url_path === i.pathname && Di.configIsMatch(e.properties, t.event) && n.push(t)
        }), n
    }, Di.getPropElInLi = function (e, t) {
        if (!(e && g(e) && d(t))) return null;
        if ("li" !== e.tagName.toLowerCase()) return null;
        var r, i = br.heatmap.getDomSelector(e);
        if (i) {
            r = i + t;
            var n = H(r);
            return n ? n : null
        }
        return br.log("----custom---\u83b7\u53d6\u540c\u7ea7\u5c5e\u6027\u5143\u7d20\u5931\u8d25\uff0cselector\u4fe1\u606f\u5f02\u5e38", i, t), null
    }, Di.getProp = function (e, t) {
        if (!r(e)) return !1;
        if (!(d(e.name) && e.name.length > 0)) return br.log("----vcustom----\u5c5e\u6027\u540d\u4e0d\u5408\u6cd5,\u5c5e\u6027\u629b\u5f03", e.name), !1;
        var i, n, a = {};
        if ("content" === e.method) {
            var s;
            if (d(e.element_selector) && e.element_selector.length > 0) s = H(e.element_selector);
            else {
                if (!t || !d(e.list_selector)) return br.log("----vcustom----\u5c5e\u6027\u914d\u7f6e\u5f02\u5e38\uff0c\u5c5e\u6027\u629b\u5f03", e.name), !1;
                var o = H(t.properties.$element_selector);
                if (!o) return br.log("----vcustom----\u70b9\u51fb\u5143\u7d20\u83b7\u53d6\u5f02\u5e38\uff0c\u5c5e\u6027\u629b\u5f03", e.name), !1;
                var l = br.heatmap.getClosestLi(o);
                s = Di.getPropElInLi(l, e.list_selector)
            }
            if (!s || !g(s)) return br.log("----vcustom----\u5c5e\u6027\u5143\u7d20\u83b7\u53d6\u5931\u8d25\uff0c\u5c5e\u6027\u629b\u5f03", e.name), !1;
            if ("input" === s.tagName.toLowerCase()) i = s.value || "";
            else if ("select" === s.tagName.toLowerCase()) {
                var c = s.selectedIndex;
                ue(c) && g(s[c]) && (i = qe(s[c], "select"))
            } else i = qe(s, s.tagName.toLowerCase());
            if (e.regular) {
                try {
                    n = new RegExp(e.regular).exec(i)
                } catch (u) {
                    return br.log("----vcustom----\u6b63\u5219\u5904\u7406\u5931\u8d25\uff0c\u5c5e\u6027\u629b\u5f03", e.name), !1
                }
                if (null === n) return br.log("----vcustom----\u5c5e\u6027\u89c4\u5219\u5904\u7406\uff0c\u672a\u5339\u914d\u5230\u7ed3\u679c,\u5c5e\u6027\u629b\u5f03", e.name), !1;
                if (!v(n) || !d(n[0])) return br.log("----vcustom----\u6b63\u5219\u5904\u7406\u5f02\u5e38\uff0c\u5c5e\u6027\u629b\u5f03", e.name, n), !1;
                i = n[0]
            }
            if ("STRING" === e.type) a[e.name] = i;
            else if ("NUMBER" === e.type) {
                if (i.length < 1) return br.log("----vcustom----\u672a\u83b7\u53d6\u5230\u6570\u5b57\u5185\u5bb9\uff0c\u5c5e\u6027\u629b\u5f03", e.name, i), !1;
                if (isNaN(Number(i))) return br.log("----vcustom----\u6570\u5b57\u7c7b\u578b\u5c5e\u6027\u8f6c\u6362\u5931\u8d25\uff0c\u5c5e\u6027\u629b\u5f03", e.name, i), !1;
                a[e.name] = Number(i)
            }
            return a
        }
        return br.log("----vcustom----\u5c5e\u6027\u4e0d\u652f\u6301\u6b64\u83b7\u53d6\u65b9\u5f0f", e.name, e.method), !1
    }, Di.getAssignConfigs = function (e, t) {
        var i = Di.initUrl();
        if (!i || !i.page_url) return [];
        if (!r(t)) return [];
        var n = [];
        return t.events = t.events || t.eventList, v(t.events) && t.events.length > 0 ? (k(t.events, function (t) {
            r(t) && r(t.event) && t.event.url_host === i.page_url.host && t.event.url_path === i.page_url.pathname && e(t) && n.push(t)
        }), n) : []
    }, Di.addCustomProps = function (e) {
        if ("success" === br.bridge.bridge_info.verify_success) {
            var t = br.vapph5collect.customProp.geth5Props(JSON.parse(JSON.stringify(e)));
            r(t) && !se(t) && (e.properties = P(e.properties, t))
        }
        var i = br.vtrackcollect.customProp.getVtrackProps(JSON.parse(JSON.stringify(e)));
        return r(i) && !se(i) && (e.properties = P(e.properties, i)), e
    }, Di.init = function () {
        br.vtrackcollect.init(), "success" === br.bridge.bridge_info.verify_success && br.vapph5collect.init()
    };
    var Ci = {
            events: [],
            init: function (e) {
                this.filterWebClickEvents(e)
            },
            filterWebClickEvents: function (e) {
                this.events = br.vtrackcollect.getAssignConfigs(function (e) {
                    return !(!r(e) || e.event.unlimited_div !== !0 || "webclick" !== e.event_type)
                }, e)
            },
            isTargetEle: function (e) {
                var t = br.heatmap.getEleDetail(e);
                if (!r(t) || !d(t.$element_path)) return !1;
                for (var i = 0; i < this.events.length; i++)
                    if (r(this.events[i]) && r(this.events[i].event) && br.vtrackcollect.configIsMatch(t, this.events[i].event)) return !0;
                return !1
            }
        },
        Oi = {
            events: [],
            configSwitch: !1,
            collectAble: function () {
                return this.configSwitch && r(br.para.heatmap) && br.para.heatmap.get_vtrack_config
            },
            updateEvents: function (e) {
                this.events = br.vtrackcollect.getAssignConfigs(function (e) {
                    return !!(r(e) && v(e.properties) && e.properties.length > 0)
                }, e), this.events.length ? this.configSwitch = !0 : this.configSwitch = !1
            },
            getVtrackProps: function (e) {
                var t = {};
                return this.collectAble() ? ("$WebClick" === e.event && (t = this.clickCustomPropMaker(e, this.events)), t) : {}
            },
            clickCustomPropMaker: function (e, t, i) {
                var n = this;
                i = i || this.filterConfig(e, t, br.vtrackcollect.url_info.page_url);
                var a = {};
                return i.length ? (k(i, function (t) {
                    v(t.properties) && t.properties.length > 0 && k(t.properties, function (t) {
                        var i = n.getProp(t, e);
                        r(i) && P(a, i)
                    })
                }), a) : {}
            },
            getProp: Di.getProp,
            getPropElInLi: Di.getPropElInLi,
            filterConfig: Di.filterConfig
        },
        ji = {
            unlimitedDiv: Ci,
            config: {},
            storageEnable: !0,
            storage_name: "webjssdkvtrackcollect",
            para: {
                session_time: 18e5,
                timeout: 5e3,
                update_interval: 18e5
            },
            url_info: {},
            timer: null,
            update_time: null,
            customProp: Oi,
            initUrl: function () {
                var e = Di.initUrl();
                if (e) {
                    var t;
                    try {
                        t = new f(br.para.server_url), t._values.Path = "/config/visualized/Web.conf", e.api_url = t.getUrl()
                    } catch (r) {
                        return br.log("----vtrackcollect---API\u5730\u5740\u89e3\u6790\u5f02\u5e38", r), !1
                    }
                    this.url_info = e
                }
                return e
            },
            init: function () {
                if (!r(br.para.heatmap) || !br.para.heatmap.get_vtrack_config) return !1;
                if (kr.isSupport() || (this.storageEnable = !1), !this.initUrl()) return br.log("----vtrackcustom----\u521d\u59cb\u5316\u5931\u8d25\uff0curl\u4fe1\u606f\u89e3\u6790\u5931\u8d25"), !1;
                if (this.storageEnable) {
                    var e = br.store.readObjectVal(this.storage_name);
                    if (r(e) && r(e.data))
                        if (this.serverUrlIsSame(e.serverUrl)) {
                            this.config = e.data, this.update_time = e.updateTime, this.updateConfig(e.data);
                            var t = (new Date).getTime(),
                                i = t - this.update_time;
                            if (ue(i) && i > 0 && i < this.para.session_time) {
                                var n = this.para.update_interval - i;
                                this.setNextFetch(n)
                            } else this.getConfigFromServer()
                        } else this.getConfigFromServer();
                    else this.getConfigFromServer()
                } else this.getConfigFromServer();
                this.pageStateListenner()
            },
            serverUrlIsSame: function (e) {
                return !!r(e) && (e.host === this.url_info.server_url.host && e.project === this.url_info.server_url.project)
            },
            getConfigFromServer: function () {
                var e = this,
                    t = function (t, i) {
                        e.update_time = (new Date).getTime();
                        var n = {};
                        200 === t ? i && r(i) && "Web" === i.os && (n = i, e.updateConfig(n)) : 205 === t ? e.updateConfig(n) : 304 === t ? n = e.config : (br.log("----vtrackcustom----\u6570\u636e\u5f02\u5e38", t), e.updateConfig(n)), e.updateStorage(n), e.setNextFetch()
                    },
                    i = function (t) {
                        e.update_time = (new Date).getTime(), br.log("----vtrackcustom----\u914d\u7f6e\u62c9\u53d6\u5931\u8d25", t), e.setNextFetch()
                    };
                this.sendRequest(t, i)
            },
            setNextFetch: function (e) {
                var t = this;
                this.timer && (clearTimeout(this.timer), this.timer = null), e = e || this.para.update_interval, this.timer = setTimeout(function () {
                    t.getConfigFromServer()
                }, e)
            },
            pageStateListenner: function () {
                var e = this;
                _e({
                    visible: function () {
                        var t = (new Date).getTime(),
                            r = t - e.update_time;
                        if (ue(r) && r > 0 && r < e.para.update_interval) {
                            var i = e.para.update_interval - r;
                            e.setNextFetch(i)
                        } else e.getConfigFromServer()
                    },
                    hidden: function () {
                        e.timer && (clearTimeout(e.timer), e.timer = null)
                    }
                })
            },
            updateConfig: function (e) {
                return !!r(e) && (this.config = e, this.customProp.updateEvents(e), void this.unlimitedDiv.init(e))
            },
            updateStorage: function (e) {
                if (!this.storageEnable) return !1;
                if (!r(e)) return !1;
                var t;
                if (this.url_info.server_url) t = this.url_info.server_url;
                else {
                    var i = br.vtrackcollect.initUrl();
                    if (!i) return !1;
                    t = i.server_url
                }
                var n = {
                    updateTime: (new Date).getTime(),
                    data: e,
                    serverUrl: t
                };
                br.store.saveObjectVal(this.storage_name, n)
            },
            sendRequest: function (e, t) {
                var r = this,
                    i = {
                        app_id: this.url_info.page_url.host
                    };
                this.config.version && (i.v = this.config.version), fe({
                    url: r.url_info.api_url,
                    callbackName: "saJSSDKVtrackCollectConfig",
                    data: i,
                    timeout: r.para.timeout,
                    success: function (t, r) {
                        e(t, r)
                    },
                    error: function (e) {
                        t(e)
                    }
                })
            },
            getAssignConfigs: Di.getAssignConfigs,
            configIsMatch: Di.configIsMatch
        },
        $i = {
            events: [],
            getAssignConfigs: Di.getAssignConfigs,
            filterConfig: Di.filterConfig,
            getProp: Di.getProp,
            initUrl: Di.initUrl,
            updateEvents: function (e) {
                v(e) && (this.events = e)
            },
            init: function () {
                this.initAppGetPropsBridge()
            },
            geth5Props: function (e) {
                var t = {},
                    i = [],
                    n = this;
                if (!this.events.length) return {};
                if ("$WebClick" === e.event) {
                    var a = this.filterConfig(e, this.events);
                    if (!a.length) return {};
                    k(a, function (a) {
                        r(a) && (v(a.properties) && a.properties.length > 0 && k(a.properties, function (i) {
                            if (r(i))
                                if (i.h5 === !1) v(t.sensorsdata_app_visual_properties) || (t.sensorsdata_app_visual_properties = []), t.sensorsdata_app_visual_properties.push(i);
                                else {
                                    var a = n.getProp(i, e);
                                    r(a) && (t = P(t, a))
                                }
                        }), d(a.event_name) && i.push(a.event_name))
                    }), br.bridge.hasVisualModeBridge() && (t.sensorsdata_web_visual_eventName = i)
                }
                return t.sensorsdata_app_visual_properties && (t.sensorsdata_app_visual_properties = j(JSON.stringify(t.sensorsdata_app_visual_properties))), t
            },
            initAppGetPropsBridge: function () {
                var e = this,
                    t = new br.SDKJSBridge("getJSVisualProperties");
                return t.onAppNotify(function (i) {
                    var n = {};
                    try {
                        i = JSON.parse(O(i))
                    } catch (a) {
                        br.log("getJSVisualProperties data parse error!")
                    }
                    if (r(i)) {
                        var s = i.sensorsdata_js_visual_properties,
                            o = e.initUrl();
                        o && (o = o.page_url, v(s) && s.length > 0 && k(s, function (t) {
                            if (r(t) && t.url_host === o.host && t.url_path === o.pathname && t.h5) {
                                var i = e.getProp(t);
                                r(i) && (n = P(n, i))
                            }
                        }))
                    }
                    var l = br.bridge.bridge_info.platform;
                    return "android" === l && t.notifyApp({
                        data: n
                    }, i.message_id), n
                }), t
            }
        },
        Ni = {
            events: [],
            customProp: $i,
            getAssignConfigs: Di.getAssignConfigs,
            initUrl: Di.initUrl,
            init: function () {
                if (this.initUrl()) {
                    var e = this.getConfigFromApp();
                    e && this.updateConfigs(e), this.customProp.init(), this.initAppUpdateConfigBridge()
                }
            },
            initAppUpdateConfigBridge: function () {
                var e = this;
                return new br.SDKJSBridge("updateH5VisualConfig").onAppNotify(function (t) {
                    if (t) {
                        try {
                            t = JSON.parse(O(t))
                        } catch (r) {
                            return void br.log("updateH5VisualConfig result parse error\uff01")
                        }
                        e.updateConfigs(t)
                    }
                })
            },
            getConfigFromApp: function () {
                var e = new br.SDKJSBridge("sensorsdata_get_app_visual_config").notifyApp();
                if (e) try {
                    e = JSON.parse(O(e))
                } catch (t) {
                    e = null, br.log("getAppVisualConfig result parse error\uff01")
                }
                return e
            },
            updateConfigs: function (e) {
                this.events = this.filterConfigs(e), this.customProp.updateEvents(this.events)
            },
            filterConfigs: function (e) {
                return this.getAssignConfigs(function (e) {
                    return !(!r(e) || e.h5 === !1)
                }, e)
            }
        },
        Ti = {
            isSeachHasKeyword: function () {
                return "" !== q(location.href, "sa-request-id") && ("string" == typeof sessionStorage.getItem("sensors-visual-mode") && sessionStorage.removeItem("sensors-visual-mode"), !0)
            },
            hasKeywordHandle: function () {
                var e = location.href,
                    t = q(e, "sa-request-id") || null,
                    r = q(e, "sa-request-type") || null,
                    i = q(e, "sa-request-url") || null;
                if (ai.setNotice(i), Ar.isSupport())
                    if (null !== i && sessionStorage.setItem("sensors_heatmap_url", i), sessionStorage.setItem("sensors_heatmap_id", t), null !== r) "1" === r || "2" === r || "3" === r ? sessionStorage.setItem("sensors_heatmap_type", r) : r = null;
                    else {
                        var n = sessionStorage.getItem("sensors_heatmap_type");
                        r = null !== n ? n : null
                    } this.isReady(t, r)
            },
            isReady: function (e, t, r) {
                br.para.heatmap_url ? ge({
                    success: function () {
                        setTimeout(function () {
                            "undefined" != typeof sa_jssdk_heatmap_render && (sa_jssdk_heatmap_render(br, e, t, r), "object" == typeof console && "function" == typeof console.log && (br.heatmap_version && br.heatmap_version === br.lib_version || console.log("heatmap.js\u4e0esensorsdata.js\u7248\u672c\u53f7\u4e0d\u4e00\u81f4\uff0c\u53ef\u80fd\u5b58\u5728\u98ce\u9669!")))
                        }, 0)
                    },
                    error: function () {},
                    type: "js",
                    url: br.para.heatmap_url
                }) : br.log("\u6ca1\u6709\u6307\u5b9aheatmap_url\u7684\u8def\u5f84")
            },
            isStorageHasKeyword: function () {
                return Ar.isSupport() && "string" == typeof sessionStorage.getItem("sensors_heatmap_id")
            },
            storageHasKeywordHandle: function () {
                ai.setNotice(), Ti.isReady(sessionStorage.getItem("sensors_heatmap_id"), sessionStorage.getItem("sensors_heatmap_type"), location.href)
            },
            isWindowNameHasKeyword: function () {
                try {
                    var e = JSON.parse(window.name),
                        t = d(e["sa-request-page-url"]) ? c(e["sa-request-page-url"]) : null;
                    return e["sa-request-id"] && d(e["sa-request-id"]) && t === location.href
                } catch (r) {
                    return !1
                }
            },
            windowNameHasKeywordHandle: function () {
                function e(e) {
                    var r = t[e];
                    return d(r) ? c(r) : null
                }
                var t = JSON.parse(window.name),
                    r = e("sa-request-id"),
                    i = e("sa-request-type"),
                    n = e("sa-request-url");
                ai.setNotice(n), Ar.isSupport() && (null !== n && sessionStorage.setItem("sensors_heatmap_url", n), sessionStorage.setItem("sensors_heatmap_id", r), null !== i ? "1" === i || "2" === i || "3" === i ? sessionStorage.setItem("sensors_heatmap_type", i) : i = null : i = null !== sessionStorage.getItem("sensors_heatmap_type") ? sessionStorage.getItem("sensors_heatmap_type") : null), Ti.isReady(r, i)
            }
        },
        Ii = {
            isStorageHasKeyword: function () {
                return Ar.isSupport() && "string" == typeof sessionStorage.getItem("sensors-visual-mode")
            },
            isSearchHasKeyword: function () {
                return (Yt("sa-visual-mode") === !0 || "true" === Yt("sa-visual-mode")) && ("string" == typeof sessionStorage.getItem("sensors_heatmap_id") && sessionStorage.removeItem("sensors_heatmap_id"), !0)
            },
            loadVtrack: function () {
                ge({
                    success: function () {},
                    error: function () {},
                    type: "js",
                    url: br.para.vtrack_url ? br.para.vtrack_url : ze() + "//static.sensorsdata.cn/sdk/" + br.lib_version + "/vtrack.min.js"
                })
            },
            messageListener: function (e) {
                function t(e) {
                    return oe(e) ? he(e) : (br.log("\u53ef\u89c6\u5316\u6a21\u5f0f\u68c0\u6d4b URL \u5931\u8d25"), !1)
                }
                if ("sa-fe" !== e.data.source) return !1;
                if ("v-track-mode" === e.data.type) {
                    if (e.data.data && e.data.data.isVtrack)
                        if (Ar.isSupport() && sessionStorage.setItem("sensors-visual-mode", "true"), e.data.data.userURL && location.href.match(/sa-visual-mode=true/)) {
                            var r = t(e.data.data.userURL);
                            r && (window.location.href = r)
                        } else Ii.loadVtrack();
                    window.removeEventListener("message", Ii.messageListener, !1)
                }
            },
            removeMessageHandle: function () {
                window.removeEventListener && window.removeEventListener("message", Ii.messageListener, !1)
            },
            verifyVtrackMode: function () {
                window.addEventListener && window.addEventListener("message", Ii.messageListener, !1), Ii.postMessage()
            },
            postMessage: function () {
                try {
                    window.parent && window.parent.postMessage && window.parent.postMessage({
                        source: "sa-web-sdk",
                        type: "v-is-vtrack",
                        data: {
                            sdkversion: "1.23.3"
                        }
                    }, "*")
                } catch (e) {
                    br.log("\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u4e0d\u652f\u6301 postMessage API")
                }
            },
            notifyUser: function () {
                var e = function (t) {
                    return "sa-fe" === t.data.source && void("v-track-mode" === t.data.type && (t.data.data && t.data.data.isVtrack && alert("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\uff0c\u8bf7\u5347\u7ea7\u90e8\u7f72\u795e\u7b56\u6570\u636e\u6cbb\u7406"), window.removeEventListener("message", e, !1)))
                };
                window.addEventListener && window.addEventListener("message", e, !1), Ii.postMessage()
            }
        },
        Ai = ["setItem", "deleteItem", "getAppStatus", "track", "quick", "register", "registerPage", "registerOnce", "trackSignup", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile", "unsetProfile", "identify", "login", "logout", "trackLink", "clearAllRegister", "clearPageRegister"],
        xi = {
            track: function (e, t, r) {},
            quick: function (e, t, r, i) {},
            register: function (e) {},
            registerPage: function (e) {},
            registerOnce: function (e) {},
            clearAllRegister: function (e) {},
            trackSignup: function (e, t, r, i) {},
            setProfile: function (e, t) {},
            setOnceProfile: function (e, t) {},
            appendProfile: function (e, t) {},
            incrementProfile: function (e, t) {},
            deleteProfile: function (e) {},
            unsetProfile: function (e, t) {},
            identify: function (e, t) {},
            login: function (e, t) {},
            logout: function (e) {},
            trackLink: function (e, t, r) {},
            deleteItem: function (e, t) {},
            setItem: function (e, t, r) {},
            getAppStatus: function (e) {},
            clearPageRegister: function (e) {}
        };
    sr.prototype.process = function (e, t) {
        if (!(e && e in this.processDef)) return void Ce("process [" + e + "] is not supported");
        var r = this.registeredInterceptors[e];
        if (r && v(r) && r.length > 0)
            for (var i = {
                    current: 0,
                    total: r.length
                }, n = new ar(t, i, br), a = 0; a < r.length; a++) try {
                if (i.current = a + 1, t = r[a].call(null, t, n) || t, n.cancellationToken.getCanceled()) break
            } catch (s) {
                Ce("interceptor error:" + s)
            }
        return this.processDef[e] && this.processDef[e] in this.processDef && (t = this.process(this.processDef[e], t)), t
    }, sr.prototype.registerStageImplementation = function (t) {
        t && t.init && e(t.init) && (t.init(this), t.interceptor && this.registerInterceptor(t.interceptor))
    }, sr.prototype.registerInterceptor = function (t) {
        if (t)
            for (var i in t) {
                var n = t[i];
                if (n && r(n) && e(n.entry)) {
                    ue(n.priority) || (n.priority = Number.MAX_VALUE),
                        this.registeredInterceptors[i] || (this.registeredInterceptors[i] = []);
                    var a = this.registeredInterceptors[i];
                    n.entry.priority = n.priority, a.push(n.entry), a.sort(function (e, t) {
                        return e.priority - t.priority
                    })
                }
            }
    };
    var Li = {
            addCustomProps: null,
            formatData: null
        },
        Ei = new sr(Li),
        Ji = {
            beforeSend: "send",
            send: "afterSend",
            afterSend: null
        },
        Ui = new sr(Ji),
        Ki = {
            getUtmData: null
        },
        Ri = new sr(Ki),
        Hi = {
            dataStage: function (e) {
                e && Ei.registerInterceptor(e)
            },
            businessStage: function (e) {
                e && Ri.registerInterceptor(e)
            },
            sendStage: function (e) {
                e && Ui.registerInterceptor(e)
            }
        },
        Bi = {
            init: function () {},
            interceptor: {
                formatData: {
                    priority: 0,
                    entry: function (e) {
                        return mr(e), e
                    }
                }
            }
        },
        Wi = window.sensors_data_pre_config,
        Mi = !!r(Wi) && Wi.is_compliance_enabled;
    br.init = function (e) {
        return ci.sdk.emit("beforeInit"), !(br.readyState && br.readyState.state && br.readyState.state >= 2) && (Mi && yr(!0), ci.initSystemEvent(), br.setInitVar(), br.readyState.setState(2), br.initPara(e), ci.sdk.emit("afterInitPara"), br.detectMode(), br.iOSWebClickPolyfill(), void ci.sdk.emit("afterInit"))
    }, Mi ? yr(!1) : (yr(!0), ir());
    var qi = br;
    try {
        br.modules = {}, br.modules.Amp = function () {
                "use strict";
                var e = {
                    sd: null,
                    init: function (e) {
                        if (this.sd) return !1;
                        if (this.sd = e, !this.sd || !this.sd._) return !1;
                        var t = this.sd._.cookie.get("sensors_amp_id"),
                            r = this.sd.store._state.distinct_id;
                        if (t && t.length > 0) {
                            var i = "amp-" === t.slice(0, 4);
                            if (t !== r) {
                                if (!i) return !1;
                                this.sd.store._state.first_id ? (this.sd.identify(t, !0), this.sd.saEvent.send({
                                    original_id: t,
                                    distinct_id: r,
                                    type: "track_signup",
                                    event: "$SignUp",
                                    properties: {}
                                }, null), this.setAmpId(r)) : this.sd.identify(t, !0)
                            }
                        } else this.setAmpId(r);
                        this.addListener()
                    },
                    addListener: function () {
                        var e = this;
                        this.sd.events.on("changeDistinctId", function (t) {
                            e.setAmpId(t)
                        }), this.sd.events.isReady()
                    },
                    setAmpId: function (e) {
                        this.sd._.cookie.set("sensors_amp_id", e)
                    }
                };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.Amp = window.SensorsDataWebJSSDKPlugin.Amp || e : window.SensorsDataWebJSSDKPlugin = {
                    Amp: e
                }, e
            }(), br.modules.Channel = function () {
                "use strict";
                var e, t, r, i = {
                    event_list: [],
                    latest_event_initial_time: null,
                    max_save_time: 2592e6,
                    init: function (i) {
                        function n() {
                            return e = t._, r = t.store, !!e.localStorage.isSupport() && (t.para.max_string_length = 1024, a.eventList.init(), a.addLatestChannelUrl(), void a.addIsChannelCallbackEvent())
                        }
                        if (t || !i) return !1;
                        t = i;
                        var a = this;
                        t.on && t.readyState.state < 3 ? t.on("sdkAfterInitPara", n) : n()
                    },
                    addIsChannelCallbackEvent: function () {
                        t.registerPage({
                            $is_channel_callback_event: function (e) {
                                if (e.event && "$WebClick" !== e.event && "$pageview" !== e.event && "$WebStay" !== e.event && "$SignUp" !== e.event) return !i.eventList.hasEvent(e.event) && (i.eventList.add(e.event), !0)
                            }
                        })
                    },
                    addLatestChannelUrl: function () {
                        var r = this.getUrlDomain(),
                            n = this.cookie.getChannel();
                        if ("url\u89e3\u6790\u5931\u8d25" === r) this.registerAndSave({
                            _sa_channel_landing_url: "",
                            _sa_channel_landing_url_error: "url\u7684domain\u89e3\u6790\u5931\u8d25"
                        });
                        else if (e.isReferralTraffic(document.referrer)) {
                            var a = e.getQueryParam(location.href, "sat_cf");
                            e.isString(a) && a.length > 0 ? (this.registerAndSave({
                                _sa_channel_landing_url: location.href
                            }), i.channelLinkHandler()) : this.registerAndSave({
                                _sa_channel_landing_url: ""
                            })
                        } else n ? t.registerPage(n) : t.registerPage({
                            _sa_channel_landing_url: "",
                            _sa_channel_landing_url_error: "\u53d6\u503c\u5f02\u5e38"
                        })
                    },
                    registerAndSave: function (e) {
                        t.registerPage(e), this.cookie.saveChannel(e)
                    },
                    cookie: {
                        getChannel: function () {
                            var t = e.decryptIfNeeded(e.cookie.get("sensorsdata2015jssdkchannel"));
                            return t = e.safeJSONParse(t), !(!e.isObject(t) || !t.prop) && t.prop
                        },
                        saveChannel: function (r) {
                            var i = {
                                    prop: r
                                },
                                n = JSON.stringify(i);
                            t.para.encrypt_cookie && (n = e.encrypt(n)), e.cookie.set("sensorsdata2015jssdkchannel", n)
                        }
                    },
                    channelLinkHandler: function () {
                        this.eventList.reset(), t.track("$ChannelLinkReaching")
                    },
                    getUrlDomain: function () {
                        var t = e.info.pageProp.url_domain;
                        return "" === t && (t = "url\u89e3\u6790\u5931\u8d25"), t
                    },
                    eventList: {
                        init: function () {
                            var t = this.get(),
                                r = (new Date).getTime();
                            if (t && e.isNumber(t.latest_event_initial_time) && e.isArray(t.eventList)) {
                                var n = r - t.latest_event_initial_time;
                                n > 0 && n < i.max_save_time ? (i.event_list = t.eventList, i.latest_event_initial_time = t.latest_event_initial_time) : this.reset()
                            } else this.reset()
                        },
                        get: function () {
                            var e = {};
                            try {
                                e = r.readObjectVal("sawebjssdkchannel")
                            } catch (i) {
                                t.log(i)
                            }
                            return e
                        },
                        add: function (e) {
                            i.event_list.push(e), this.save()
                        },
                        save: function () {
                            var e = {
                                latest_event_initial_time: i.latest_event_initial_time,
                                eventList: i.event_list
                            };
                            r.saveObjectVal("sawebjssdkchannel", e)
                        },
                        reset: function () {
                            i.event_list = [], i.latest_event_initial_time = (new Date).getTime(), this.save()
                        },
                        hasEvent: function (t) {
                            var r = !1;
                            return e.each(i.event_list, function (e) {
                                e === t && (r = !0)
                            }), r
                        }
                    }
                };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.SensorsChannel = window.SensorsDataWebJSSDKPlugin.SensorsChannel || i : window.SensorsDataWebJSSDKPlugin = {
                    SensorsChannel: i
                }, i
            }(), br.modules.Deeplink = function () {
                "use strict";

                function e() {
                    return "undefined" != typeof t && document[t]
                }
                var t, r = (/micromessenger\/([\d.]+)/i.test(navigator.userAgent || ""), function () {
                    var e = {};
                    return "undefined" != typeof document.hidden ? (e.hidden = "hidden", e.visibilityChange = "visibilitychange") : "undefined" != typeof document.msHidden ? (e.hidden = "msHidden", e.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e
                });
                t = r().hidden;
                var i = {
                        android: /Android/i,
                        iOS: /iPhone|iPad|iPod/i
                    },
                    n = function () {
                        for (var e in i)
                            if (navigator.userAgent.match(i[e])) return e;
                        return ""
                    },
                    a = n(),
                    s = function () {
                        return i.hasOwnProperty(a)
                    },
                    o = function (e) {
                        return null != e && "[object Object]" == Object.prototype.toString.call(e)
                    },
                    l = function (e) {
                        var t = /\/sd\/(\w+)\/(\w+)$/;
                        return e.match(t)
                    },
                    c = function (e) {
                        var t = e._.URL(e.para.server_url);
                        return {
                            origin: t.origin,
                            project: t.searchParams.get("project") || "default"
                        }
                    },
                    u = function (r, i, n) {
                        r.log("\u5c1d\u8bd5\u5524\u8d77 android app");
                        var a = i;
                        r.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a" + a), window.location = a, r.timer = setTimeout(function () {
                            var i = e();
                            return r.log("hide:" + t + ":" + document[t]), i ? (r.log("The page is hidden, stop navigating to download page"), !1) : (r.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"), void(window.location = n))
                        }, r.timeout)
                    },
                    d = function (t, r, i) {
                        t.log("\u5c1d\u8bd5\u5524\u8d77 iOS app:" + r), window.location.href = r, t.timer = setTimeout(function () {
                            var r = e();
                            return r ? (t.log("The page is hidden, stop navigating to download page"), !1) : (t.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"), void(window.location.href = i))
                        }, t.timeout), t.log("new timer:" + t.timer)
                    },
                    p = {
                        key: null,
                        timer: null,
                        sd: null,
                        data: null,
                        timeout: 2500,
                        apiURL: "{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}",
                        init: function () {
                            if (this.sd) return this.log("deeplink\u5df2\u7ecf\u521d\u59cb\u5316"), !1;
                            if (o(sensorsDataAnalytic201505) && (this.sd = sensorsDataAnalytic201505), this.log("init()"), null === this.sd) return this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165"), !1;
                            var e = {};
                            if (arguments.length > 0 && (1 === arguments.length && o(arguments[0]) ? e = arguments[0] : arguments.length >= 2 && o(arguments[1]) && (e = arguments[1])), !s()) return this.log("\u4e0d\u652f\u6301\u5f53\u524d\u7cfb\u7edf\uff0c\u76ee\u524d\u53ea\u652f\u6301Android\u548ciOS"), !1;
                            if (o(e) && this.sd._.isNumber(e.timeout) && e.timeout >= 2500 && (this.timeout = e.timeout), !this.sd.para.server_url) return this.log("\u795e\u7b56JS SDK\u914d\u7f6e\u9879server_url\u672a\u6b63\u786e\u914d\u7f6e"), !1;
                            var t = c(this.sd);
                            this.apiURL = this.apiURL.replace("{origin}", t.origin).replace("{project}", t.project);
                            var r = this.sd._.getQueryParam(window.location.href, "deeplink");
                            if (!r) return this.log("\u5f53\u524d\u9875\u9762\u7f3a\u5c11deeplink\u53c2\u6570"), !1;
                            r = window.decodeURIComponent(r);
                            var i = l(r);
                            return i ? (this.key = i[2], this.apiURL = this.apiURL.replace("{key}", window.encodeURIComponent(i[2])), this.sd._.ajax({
                                url: this.apiURL,
                                type: "GET",
                                cors: !0,
                                credentials: !1,
                                success: function (e) {
                                    return e.errorMsg ? (p.log("API\u62a5\u9519\uff1a" + e.errorMsg), !1) : (p.data = e, p.log("API\u67e5\u8be2\u6210\u529f\uff0c\u6570\u636e\uff1a" + JSON.stringify(e, null, "  ")), void(this.data.app_key && (this.data.android_info && this.data.android_info.url_schemes && (this.data.android_info.url_schemes += "://sensorsdata/sd/" + this.data.app_key + "/" + this.key), this.data.ios_info && this.data.ios_info.url_schemes && (this.data.ios_info.url_schemes += "://sensorsdata/sd/" + this.data.app_key + "/" + this.key))))
                                }.bind(this),
                                error: function () {
                                    p.log("API\u67e5\u8be2\u51fa\u9519")
                                }
                            }), void this.addListeners()) : (this.log("\u5f53\u524d\u9875\u9762\u7684deeplink\u53c2\u6570\u65e0\u6548"), !1)
                        },
                        openDeepLink: function () {
                            if (this.log("openDeeplink()"), !this.data) return this.log("\u6ca1\u6709Deep link\u6570\u636e!"), !1;
                            if ("iOS" === a) {
                                this.log("\u5f53\u524d\u7cfb\u7edf\u662fiOS");
                                var e = this.sd && this.sd._ && this.sd._.getIOSVersion() >= 9 && this.data.ios_info.ios_wake_url ? this.data.ios_info.ios_wake_url : this.data.ios_info.url_schemes;
                                this.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a" + e), d(this, e, this.data.ios_info.download_url)
                            } else this.log("\u5f53\u524d\u7cfb\u7edf\u662f android"), u(this, this.data.android_info.url_schemes, this.data.android_info.download_url)
                        },
                        log: function (e) {
                            this.sd && this.sd.log(e)
                        },
                        addListeners: function () {
                            var e = r().visibilityChange;
                            e && document.addEventListener(e, function () {
                                clearTimeout(this.timer), this.log("visibilitychange, clear timeout:" + this.timer)
                            }.bind(this), !1), window.addEventListener("pagehide", function () {
                                this.log("page hide, clear timeout:" + this.timer), clearTimeout(this.timer)
                            }.bind(this), !1)
                        }
                    };
                return o(window.SensorsDataWebJSSDKPlugin) ? (window.SensorsDataWebJSSDKPlugin.Deeplink = window.SensorsDataWebJSSDKPlugin.Deeplink || p, window.SensorsDataWebJSSDKPlugin.deeplink = window.SensorsDataWebJSSDKPlugin.deeplink || p) : window.SensorsDataWebJSSDKPlugin = {
                    Deeplink: p,
                    deeplink: p
                }, p
            }(), br.modules.Pageleave = function () {
                "use strict";

                function e() {
                    this.sd = null, this.start_time = +new Date, this.page_show_status = !0, this.page_hidden_status = !1, this._ = {}, this.timer = null, this.current_page_url = document.referrer, this.url = location.href, this.option = {}, this.heartbeat_interval_time = 5e3, this.heartbeat_interval_timer = null, this.page_id = null, this.storage_name = "sawebjssdkpageleave"
                }
                var t = 5e3;
                e.prototype.init = function (e, t) {
                    if (e) {
                        this.sd = e, this._ = this.sd._;
                        var r = this;
                        if (t) {
                            this.option = t;
                            var i = t.heartbeat_interval_time;
                            i && (this._.isNumber(i) || this._.isNumber(1 * i)) && 1 * i > 0 && (this.heartbeat_interval_time = 1e3 * i)
                        }
                        this.page_id = Number(String(this._.getRandom()).slice(2, 5) + String(this._.getRandom()).slice(2, 4) + String((new Date).getTime()).slice(-4)), r.addEventListener(), document.hidden === !0 ? this.page_show_status = !1 : r.addHeartBeatInterval(), this.log("PageLeave\u521d\u59cb\u5316\u5b8c\u6bd5")
                    } else this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")
                }, e.prototype.log = function (e) {
                    this.sd && this.sd.log(e)
                }, e.prototype.refreshPageEndTimer = function () {
                    var e = this;
                    this.timer && (clearTimeout(this.timer), this.timer = null), this.timer = setTimeout(function () {
                        e.page_hidden_status = !1
                    }, t)
                }, e.prototype.hiddenStatusHandler = function () {
                    clearTimeout(this.timer), this.timer = null, this.page_hidden_status = !1
                }, e.prototype.pageStartHandler = function () {
                    this.start_time = +new Date, !document.hidden == !0 ? this.page_show_status = !0 : this.page_show_status = !1, this.url = location.href
                }, e.prototype.pageEndHandler = function () {
                    if (this.page_hidden_status !== !0) {
                        var e = this.getPageLeaveProperties();
                        this.page_show_status === !1 && delete e.event_duration, this.page_show_status = !1, this.page_hidden_status = !0, this.isCollectUrl(this.url) && this.sd.track("$WebPageLeave", e), this.refreshPageEndTimer(), this.delHeartBeatData()
                    }
                }, e.prototype.addEventListener = function () {
                    this.addPageStartListener(), this.addPageSwitchListener(), this.addSinglePageListener(), this.addPageEndListener()
                }, e.prototype.addPageStartListener = function () {
                    var e = this;
                    "onpageshow" in window && this._.addEvent(window, "pageshow", function () {
                        e.pageStartHandler(), e.hiddenStatusHandler()
                    })
                }, e.prototype.isCollectUrl = function (e) {
                    return "function" != typeof this.option.isCollectUrl || ("string" != typeof e || "" === e || this.option.isCollectUrl(e))
                }, e.prototype.addSinglePageListener = function () {
                    var e = this;
                    this.sd.ee && this.sd.ee.spa.prepend("switch", function (t) {
                        t !== location.href && (e.url = t, e.pageEndHandler(), e.stopHeartBeatInterval(), e.current_page_url = e.url, e.pageStartHandler(), e.hiddenStatusHandler(), e.startHeartBeatInterval())
                    })
                }, e.prototype.addPageEndListener = function () {
                    var e = this;
                    this._.each(["pagehide", "beforeunload", "unload"], function (t) {
                        "on" + t in window && e._.addEvent(window, t, function () {
                            e.pageEndHandler(), e.stopHeartBeatInterval()
                        })
                    })
                }, e.prototype.addPageSwitchListener = function () {
                    var e = this;
                    this._.listenPageState({
                        visible: function () {
                            e.pageStartHandler(), e.hiddenStatusHandler(), e.startHeartBeatInterval()
                        },
                        hidden: function () {
                            e.url = location.href, e.pageEndHandler(), e.stopHeartBeatInterval()
                        }
                    })
                }, e.prototype.addHeartBeatInterval = function () {
                    this._.localStorage.isSupport() && this.startHeartBeatInterval()
                }, e.prototype.startHeartBeatInterval = function () {
                    var e = this;
                    this.heartbeat_interval_timer && this.stopHeartBeatInterval();
                    var t = !0;
                    this.isCollectUrl(this.url) || (t = !1), this.heartbeat_interval_timer = setInterval(function () {
                        t && e.saveHeartBeatData()
                    }, this.heartbeat_interval_time), t && this.saveHeartBeatData("is_first_heartbeat"), this.reissueHeartBeatData()
                }, e.prototype.stopHeartBeatInterval = function () {
                    clearInterval(this.heartbeat_interval_timer), this.heartbeat_interval_timer = null
                }, e.prototype.saveHeartBeatData = function (e) {
                    var t = this.getPageLeaveProperties(),
                        r = new Date;
                    t.$time = r, "is_first_heartbeat" === e && (t.event_duration = 3.14);
                    var i = this.sd.kit.buildData({
                        type: "track",
                        event: "$WebPageLeave",
                        properties: t
                    });
                    try {
                        "success" === this.sd.bridge.bridge_info.verify_success && (i.properties.$time = 1 * r)
                    } catch (n) {
                        this.log(n.message)
                    }
                    i.heartbeat_interval_time = this.heartbeat_interval_time, this.sd.store.saveObjectVal(this.storage_name + "-" + this.page_id, i)
                }, e.prototype.delHeartBeatData = function (e) {
                    this._.localStorage.remove(e || this.storage_name + "-" + this.page_id)
                }, e.prototype.reissueHeartBeatData = function () {
                    for (var e = window.localStorage.length, t = e - 1; t >= 0; t--) {
                        var r = window.localStorage.key(t);
                        if (r && r !== this.storage_name + "-" + this.page_id && 0 === r.indexOf(this.storage_name + "-")) {
                            var i = this.sd.store.readObjectVal(r);
                            this._.isObject(i) && 1 * new Date - i.time > i.heartbeat_interval_time + 5e3 && (delete i.heartbeat_interval_time, this.sd.kit.sendData(i), this.delHeartBeatData(r))
                        }
                    }
                }, e.prototype.getPageLeaveProperties = function () {
                    var e = (+new Date - this.start_time) / 1e3;
                    (isNaN(e) || e < 0) && (e = 0), e = Number(e.toFixed(3));
                    var t = this._.getReferrer(this.current_page_url),
                        r = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body && document.body.scrollTop || 0;
                    r = Math.round(r) || 0;
                    var i = {
                        $title: document.title,
                        $url: this._.getURL(this.url),
                        $url_path: this._.getURLPath(),
                        $referrer_host: t ? this._.getHostname(t) : "",
                        $referrer: t,
                        $viewport_position: r
                    };
                    return 0 !== e && (i.event_duration = e), i = this._.extend(i, this.option.custom_props)
                };
                var r = new e;
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.PageLeave = window.SensorsDataWebJSSDKPlugin.PageLeave || r : window.SensorsDataWebJSSDKPlugin = {
                    PageLeave: r
                }, r
            }(), br.modules.Pageload = function () {
                "use strict";
                var e = {
                    init: function (e) {
                        function t(t, r) {
                            if (t.getEntries && "function" == typeof t.getEntries) {
                                for (var i = t.getEntries(), n = null, a = 0; a < i.length; a++) "transferSize" in i[a] && (n += i[a].transferSize);
                                e._.isNumber(n) && n >= 0 && n < 10737418240 && (r.$page_resource_size = Number((n / 1024).toFixed(3)))
                            }
                        }

                        function r() {
                            var i = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance,
                                n = 0,
                                a = {
                                    $url: e._.getURL(),
                                    $title: document.title,
                                    $url_path: e._.getURLPath(),
                                    $referrer: e._.getReferrer(null, !0)
                                };
                            if (i && i.timing) {
                                var s = i.timing;
                                0 === s.fetchStart || 0 === s.domContentLoadedEventEnd ? e.log("performance \u6570\u636e\u83b7\u53d6\u5f02\u5e38") : n = s.domContentLoadedEventEnd - s.fetchStart, t(i, a)
                            } else e.log("\u6d4f\u89c8\u5668\u672a\u652f\u6301 performance API.");
                            n > 0 && (a.event_duration = Number((n / 1e3).toFixed(3))), e.track("$WebPageLoad", a), window.removeEventListener ? window.removeEventListener("load", r) : window.detachEvent && window.detachEvent("onload", r)
                        }
                        "complete" == document.readyState ? r() : window.addEventListener ? window.addEventListener("load", r) : window.attachEvent && window.attachEvent("onload", r)
                    }
                };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.PageLoad = window.SensorsDataWebJSSDKPlugin.PageLoad || e : window.SensorsDataWebJSSDKPlugin = {
                    PageLoad: e
                }, e
            }(), br.modules.RegisterProperties = function () {
                "use strict";

                function e(e, t) {
                    if ("track" !== e.type) return e;
                    var r = t.sd,
                        i = r._,
                        n = r.saEvent.check,
                        a = i.extend2Lev({
                            properties: {}
                        }, e),
                        s = t.currentProps,
                        o = a.properties,
                        l = a.event,
                        c = {};
                    return i.each(s, function (e) {
                        if (i.isObject(e)) e.events.indexOf(l) > -1 && n({
                            properties: e.properties
                        }) && (c = i.extend(c, e.properties));
                        else if (i.isFunction(e)) {
                            var t = e({
                                event: l,
                                properties: o,
                                data: a
                            });
                            i.isObject(t) && !i.isEmptyObject(t) && n({
                                properties: t
                            }) && (c = i.extend(c, t))
                        }
                    }), e.properties = i.extend(o, c), e
                }

                function t(t) {
                    var r = this;
                    this.sd = t.sd, this.currentProps = t.customRegister, this.interceptor = {
                        addCustomProps: {
                            priority: 0,
                            entry: function (t) {
                                return e(t, r), t
                            }
                        }
                    }
                }

                function r(e) {
                    this.dataStage = new t(e)
                }

                function i() {
                    this.sd = null, this.log = window.console && window.console.log || function () {}, this.customRegister = []
                }
                t.prototype.init = function () {}, i.prototype.init = function (e) {
                    e ? (this.sd = e, this._ = e._, this.log = e.log, e.registerFeature(new r(this))) : this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")
                }, i.prototype.register = function (e) {
                    return this.sd ? void(this._.isObject(e) && this._.isArray(e.events) && e.events.length > 0 && this._.isObject(e.properties) && !this._.isEmptyObject(e.properties) ? this.customRegister.push(e) : this.log("RegisterProperties: register \u53c2\u6570\u9519\u8bef")) : void this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")
                }, i.prototype.hookRegister = function (e) {
                    return this.sd ? void(this._.isFunction(e) ? this.customRegister.push(e) : this.log("RegisterProperties: hookRegister \u53c2\u6570\u9519\u8bef")) : void this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165")
                };
                var n = new i;
                return n.__constructor__ = i, window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.RegisterProperties = window.SensorsDataWebJSSDKPlugin.RegisterProperties || n : window.SensorsDataWebJSSDKPlugin = {
                    RegisterProperties: n
                }, n
            }(), br.modules.RegisterPropertyPageHeight = function () {
                "use strict";

                function e(e) {
                    try {
                        if ("$pageview" !== e.event && (!e.type || "profile" !== e.type.slice(0, 7))) {
                            var n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
                                a = document.documentElement.scrollHeight || 0,
                                s = {
                                    $page_height: Math.max(n, a) || 0
                                };
                            e.properties = t._.extend(e.properties || {}, s)
                        }
                    } catch (o) {
                        i("\u9875\u9762\u9ad8\u5ea6\u83b7\u53d6\u5f02\u5e38\u3002")
                    }
                    return r.call(t.kit, e)
                }
                var t, r, i = window.console && window.console.log || function () {},
                    n = {
                        init: function (n) {
                            return t = n, i = t && t.log || i, n && n.kit && n.kit.buildData ? (r = t.kit.buildData, t.kit.buildData = e, void i("RegisterPropertyPageHeight \u63d2\u4ef6\u521d\u59cb\u5316\u5b8c\u6210")) : void i("RegisterPropertyPageHeight \u63d2\u4ef6\u521d\u59cb\u5316\u5931\u8d25,\u5f53\u524d\u4e3bsdk\u4e0d\u652f\u6301 RegisterPropertyPageHeight \u63d2\u4ef6\uff0c\u8bf7\u5347\u7ea7\u4e3bsdk")
                        }
                    };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.RegisterPropertyPageHeight = window.SensorsDataWebJSSDKPlugin.RegisterPropertyPageHeight || n : window.SensorsDataWebJSSDKPlugin = {
                    RegisterPropertyPageHeight: n
                }, n
            }(),
            function () {
                "use strict";
                var e = {};
                e.getPart = function (e) {
                    var t = !1,
                        r = this.option.length;
                    if (r)
                        for (var i = 0; i < r; i++)
                            if (e.indexOf(this.option[i].part_url) > -1) return !0;
                    return t
                }, e.getPartHash = function (e) {
                    var t = this.option.length,
                        r = !1;
                    if (t)
                        for (var i = 0; i < t; i++)
                            if (e.indexOf(this.option[i].part_url) > -1) return this.option[i].after_hash;
                    return !!r
                }, e.getCurrenId = function () {
                    var e = this.store.getDistinctId() || "",
                        t = this.store.getFirstId() || "";
                    this._.urlSafeBase64 && this._.urlSafeBase64.encode ? e = e ? this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(this._.base64Encode(e))) : "" : this._.rot13obfs && (e = e ? this._.rot13obfs(e) : "");
                    var r = t ? "f" + e : "d" + e;
                    return encodeURIComponent(r)
                }, e.rewriteUrl = function (e, t) {
                    var r = /([^?#]+)(\?[^#]*)?(#.*)?/,
                        i = r.exec(e),
                        n = "";
                    if (i) {
                        var a, s = i[1] || "",
                            o = i[2] || "",
                            l = i[3] || "";
                        if (this.getPartHash(e)) {
                            a = l.indexOf("_sasdk");
                            var c = l.indexOf("?");
                            n = c > -1 ? a > -1 ? s + o + "#" + l.substring(1, a) + "_sasdk=" + this.getCurrenId() : s + o + "#" + l.substring(1) + "&_sasdk=" + this.getCurrenId() : s + o + "#" + l.substring(1) + "?_sasdk=" + this.getCurrenId()
                        } else {
                            a = o.indexOf("_sasdk");
                            var u = /^\?(\w)+/.test(o);
                            n = u ? a > -1 ? s + "?" + o.substring(1, a) + "_sasdk=" + this.getCurrenId() + l : s + "?" + o.substring(1) + "&_sasdk=" + this.getCurrenId() + l : s + "?" + o.substring(1) + "_sasdk=" + this.getCurrenId() + l
                        }
                        return t && (t.href = n), n
                    }
                }, e.getUrlId = function () {
                    var e = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
                    if (this._.isArray(e) && e[1]) {
                        var t = decodeURIComponent(e[1]);
                        return !t || "f" !== t.substring(0, 1) && "d" !== t.substring(0, 1) || (this._.urlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64(t) ? t = t.substring(0, 1) + this._.base64Decode(this._.urlSafeBase64.decode(t.substring(1))) : this._.rot13defs && (t = t.substring(0, 1) + this._.rot13defs(t.substring(1)))), t
                    }
                    return ""
                }, e.setRefferId = function () {
                    var e = this.store.getDistinctId(),
                        t = this.getUrlId();
                    if ("" === t) return !1;
                    var r = "a" === t.substring(0, 1) || "d" === t.substring(0, 1);
                    return t = t.substring(1), t !== e && (t && r && this.store.getFirstId() && (this.sd.identify(t, !0), this.sd.saEvent.send({
                        original_id: t,
                        distinct_id: e,
                        type: "track_signup",
                        event: "$SignUp",
                        properties: {}
                    }, null)), t && r && !this.store.getFirstId() && this.sd.identify(t, !0), void(!t || r || this.store.getFirstId() || this.sd.login(t)))
                }, e.addListen = function () {
                    var e = this,
                        t = function (t) {
                            var r, i, n = t.target,
                                a = n.tagName.toLowerCase(),
                                s = n.parentNode;
                            if ("a" === a && n.href || s && s.tagName && "a" === s.tagName.toLowerCase() && s.href) {
                                "a" === a && n.href ? (r = n.href, i = n) : (r = s.href, i = s);
                                var o = e._.URL(r),
                                    l = o.protocol;
                                "http:" !== l && "https:" !== l || e.getPart(r) && e.rewriteUrl(r, i)
                            }
                        };
                    e._.addEvent(document, "mousedown", t), window.PointerEvent && "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints >= 0 && e._.addEvent(document, "pointerdown", t)
                }, e.init = function (e, t) {
                    function r(t) {
                        for (var r = t.length, i = [], n = 0; n < r; n++) /[A-Za-z0-9]+\./.test(t[n].part_url) && "[object Boolean]" == Object.prototype.toString.call(t[n].after_hash) ? i.push(t[n]) : e.log("linker \u914d\u7f6e\u7684\u7b2c " + (n + 1) + " \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01");
                        return i
                    }
                    return this.sd = e, this._ = e._, this.store = e.store, this.para = e.para, this._.isObject(t) && this._.isArray(t.linker) && t.linker.length > 0 ? (this.setRefferId(), this.addListen(), this.option = t.linker, void(this.option = r(this.option))) : void e.log("\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01")
                }, window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.SiteLinker = window.SensorsDataWebJSSDKPlugin.SiteLinker || e : window.SensorsDataWebJSSDKPlugin = {
                    SiteLinker: e
                }
            }(), br.modules.AndroidBridge = function () {
                "use strict";

                function e(e) {
                    return _ && _.call(p, JSON.stringify(e))
                }

                function t(e) {
                    return f.call(p) && g && g.call(p, JSON.stringify(e))
                }

                function r(e, t) {
                    return t && "function" == typeof t[e.callType] && t[e.callType]()
                }

                function i() {
                    if (s = window.SensorsData_APP_New_H5_Bridge, o = s && s.sensorsdata_track, l = o && s.sensorsdata_get_server_url && s.sensorsdata_get_server_url(), c && !c.bridge.activeBridge && l) {
                        if (c.bridge.activeBridge = m, c.para.app_js_bridge && !c.para.app_js_bridge.is_mui && (c.bridge.is_verify_success = l && c.bridge.validateAppUrl(l)), c.bridge.bridge_info = {
                                touch_app_bridge: !0,
                                platform: "android",
                                verify_success: c.bridge.is_verify_success ? "success" : "fail",
                                support_two_way_call: !!s.sensorsdata_js_call_app
                            }, !c.para.app_js_bridge) return void d("app_js_bridge is not configured, data will not be sent by android bridge.");
                        c.registerInterceptor("sendStage", {
                            send: {
                                priority: 0,
                                entry: n
                            }
                        }), d("Android bridge inits succeed.")
                    }
                }

                function n(e, t) {
                    if (c.para.app_js_bridge.is_mui) return e;
                    var r = e.callback;
                    return c.bridge.is_verify_success ? (o && o.call(s, JSON.stringify(u.extend({
                        server_url: c.para.server_url
                    }, e.data))), u.isFunction(r) && r(), t.cancellationToken.cancel(), e) : c.para.app_js_bridge.is_send ? (c.debug.apph5({
                        data: e.data,
                        step: "4.2",
                        output: "all"
                    }), e) : (u.isFunction(r) && r(), t.cancellationToken.cancel(), e)
                }

                function a(e) {
                    var t = e.callType;
                    return t in h.commands ? h.commands[t](e, s) : void(s && u.isFunction(s.sensorsdata_js_call_app) && s.sensorsdata_js_call_app(JSON.stringify(e)))
                }
                var s, o, l, c, u, d, p = window.SensorsData_App_Visual_Bridge,
                    f = p && p.sensorsdata_visualized_mode,
                    _ = p && p.sensorsdata_visualized_alert_info,
                    g = p && p.sensorsdata_hover_web_nodes,
                    h = {
                        isVerify: function () {
                            return f && (f === !0 || f.call(p))
                        },
                        commands: {
                            app_alert: e,
                            visualized_track: t,
                            page_info: t,
                            sensorsdata_get_app_visual_config: r
                        }
                    },
                    m = {
                        init: function (e) {
                            c = e, u = c && c._, d = c && c.log || console && console.log || function () {}, c.on && c.on("sdkAfterInitPara", i)
                        },
                        handleCommand: a
                    };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.AndroidBridge = window.SensorsDataWebJSSDKPlugin.AndroidBridge || m : window.SensorsDataWebJSSDKPlugin = {
                    AndroidBridge: m
                }, m
            }(), br.modules.AndroidObsoleteBridge = function () {
                "use strict";

                function e(e) {
                    return g && g.call(f, JSON.stringify(e))
                }

                function t(e) {
                    return _.call(f) && h && h.call(f, JSON.stringify(e))
                }

                function r(e, t) {
                    return t && "function" == typeof t[e.callType] && t[e.callType]()
                }

                function i() {
                    if (s = window.SensorsData_APP_JS_Bridge, o = s && s.sensorsdata_track, l = s && s.sensorsdata_verify, c = s && s.sensorsdata_visual_verify, u && !u.bridge.activeBridge && (l || o || c)) {
                        u.bridge.activeBridge = v;
                        var e = l || o;
                        if (c && (e = !!c.call(s, JSON.stringify({
                                server_url: u.para.server_url
                            }))), u.bridge.bridge_info = {
                                touch_app_bridge: !0,
                                platform: "android",
                                verify_success: e ? "success" : "fail"
                            }, !u.para.app_js_bridge) return void p("app_js_bridge is not configured, data will not be sent by android obsolete bridge.");
                        u.registerInterceptor("sendStage", {
                            send: {
                                priority: 0,
                                entry: n
                            }
                        }), p("Android obsolete bridge inits succeed.")
                    }
                }

                function n(e, t) {
                    if (u.para.app_js_bridge.is_mui) return e;
                    var r = e.callback;
                    if (l) {
                        var i = l && l.call(s, JSON.stringify(d.extend({
                            server_url: u.para.server_url
                        }, e.data)));
                        return i ? (d.isFunction(r) && r(), t.cancellationToken.cancel(), e) : u.para.app_js_bridge.is_send ? (u.debug.apph5({
                            data: e.data,
                            step: "3.1",
                            output: "all"
                        }), e) : (d.isFunction(r) && r(), t.cancellationToken.cancel(), e)
                    }
                    return o && o.call(s, JSON.stringify(d.extend({
                        server_url: u.para.server_url
                    }, e.data))), d.isFunction(r) && r(), t.cancellationToken.cancel(), e
                }

                function a(e) {
                    var t = e.callType;
                    return t in m.commands ? m.commands[t](e, s) : s && d.isFunction(s.sensorsdata_js_call_app) ? s.sensorsdata_js_call_app(JSON.stringify(e)) : void 0
                }
                var s, o, l, c, u, d, p, f = window.SensorsData_App_Visual_Bridge,
                    _ = f && f.sensorsdata_visualized_mode,
                    g = f && f.sensorsdata_visualized_alert_info,
                    h = f && f.sensorsdata_hover_web_nodes,
                    m = {
                        isVerify: function () {
                            return _ && (_ === !0 || _.call(f))
                        },
                        commands: {
                            app_alert: e,
                            visualized_track: t,
                            page_info: t,
                            sensorsdata_get_app_visual_config: r
                        }
                    },
                    v = {
                        init: function (e) {
                            u = e, d = u && u._, p = u && u.log || console && console.log || function () {}, u.on && u.on("sdkAfterInitPara", i)
                        },
                        handleCommand: a
                    };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.AndroidObsoleteBridge = window.SensorsDataWebJSSDKPlugin.AndroidObsoleteBridge || v : window.SensorsDataWebJSSDKPlugin = {
                    AndroidObsoleteBridge: v
                }, v
            }(), br.modules.IosBridge = function () {
                "use strict";

                function e() {
                    if (i = window.SensorsData_iOS_JS_Bridge, n = i && i.sensorsdata_app_server_url, a = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker, s = a && a.postMessage, o && !o.bridge.activeBridge && s) {
                        if (o.bridge.activeBridge = u, o.para.app_js_bridge && !o.para.app_js_bridge.is_mui && (o.bridge.is_verify_success = n && o.bridge.validateAppUrl(n)), o.bridge.bridge_info = {
                                touch_app_bridge: !0,
                                platform: "ios",
                                verify_success: o.bridge.is_verify_success ? "success" : "fail",
                                support_two_way_call: !0
                            }, !o.para.app_js_bridge) return void c("app_js_bridge is not configured, data will not be sent by iOS bridge.");
                        o.registerInterceptor("sendStage", {
                            send: {
                                priority: 0,
                                entry: t
                            }
                        }), c("IOS bridge inits succeed.")
                    }
                }

                function t(e, t) {
                    if (o.para.app_js_bridge.is_mui) return e;
                    var r = e.callback;
                    return o.bridge.is_verify_success ? (s.call(a, JSON.stringify({
                        callType: "app_h5_track",
                        data: l.extend({
                            server_url: o.para.server_url
                        }, e.data)
                    })), l.isFunction(r) && r(), t.cancellationToken.cancel(), e) : o.para.app_js_bridge.is_send ? (o.debug.apph5({
                        data: e.data,
                        step: "4.1",
                        output: "all"
                    }), e) : (l.isFunction(r) && r(), t.cancellationToken.cancel(), e)
                }

                function r(e) {
                    var t = e.callType;
                    return "page_info" !== t && "visualized_track" !== t || o.bridge.hasVisualModeBridge() ? "sensorsdata_get_app_visual_config" === t ? l.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge[t] : s.call(a, JSON.stringify(e)) : null
                }
                var i, n, a, s, o, l, c, u = {
                    init: function (t) {
                        o = t, l = o && o._, c = o && o.log || console && console.log || function () {}, o.on && o.on("sdkAfterInitPara", e)
                    },
                    handleCommand: r
                };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.IOSBridge = window.SensorsDataWebJSSDKPlugin.IOSBridge || u : window.SensorsDataWebJSSDKPlugin = {
                    IOSBridge: u
                }, u
            }(), br.modules.IosObsoleteBridge = function () {
                "use strict";

                function e() {
                    if (n && !n.bridge.activeBridge && t()) {
                        if (n.bridge.activeBridge = o, n.bridge.bridge_info = {
                                touch_app_bridge: !0,
                                platform: "ios",
                                verify_success: r() ? "success" : "fail"
                            }, !n.para.app_js_bridge) return void s("app_js_bridge is not configured, data will not be sent by iOS obsolete bridge.");
                        n.registerInterceptor("sendStage", {
                            send: {
                                priority: 0,
                                entry: i
                            }
                        }), s("IOS obsolete bridge inits succeed.")
                    }
                }

                function t() {
                    return (/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream
                }

                function r() {
                    if (/sensors-verify/.test(navigator.userAgent)) {
                        var e = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
                        if (e && e[0] && "string" == typeof e[1] && 2 === e[1].split("?").length) {
                            e = e[1].split("?");
                            var t = null,
                                r = null;
                            try {
                                t = a.URL(n.para.server_url).hostname, r = a.URL(n.para.server_url).searchParams.get("project") || "default"
                            } catch (i) {
                                n.log(i)
                            }
                            return !(!t || t !== e[0] || !r || r !== e[1])
                        }
                        return !1
                    }
                    return !!/sa-sdk-ios/.test(navigator.userAgent)
                }

                function i(e, t) {
                    function r(e) {
                        var t = JSON.stringify(a.extend({
                            server_url: n.para.server_url
                        }, e));
                        return t = t.replaceAll(/\r\n/g, ""), t = encodeURIComponent(t), "sensorsanalytics://trackEvent?event=" + t
                    }
                    if (n.para.app_js_bridge.is_mui) return e;
                    var i = e.callback;
                    if (n.bridge.bridge_info.verify_success) {
                        var s = document.createElement("iframe"),
                            o = r(e.data);
                        return s.setAttribute("src", o), document.documentElement.appendChild(s), s.parentNode.removeChild(s), s = null, a.isFunction(i) && i(), t.cancellationToken.cancel(), !0
                    }
                    return n.para.app_js_bridge.is_send ? (n.debug.apph5({
                        data: e.data,
                        step: "3.2",
                        output: "all"
                    }), e) : (a.isFunction(i) && i(), t.cancellationToken.cancel(), e)
                }
                var n, a, s, o = {
                    init: function (t) {
                        n = t, a = n && n._, s = n && n.log || console && console.log || function () {}, n.on && n.on("sdkAfterInitPara", e)
                    }
                };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.IOSObsoleteBridge = window.SensorsDataWebJSSDKPlugin.IOSObsoleteBridge || o : window.SensorsDataWebJSSDKPlugin = {
                    IOSObsoleteBridge: o
                }, o
            }(), br.modules.Utm = function () {
                "use strict";
                var e, t = "utm_source utm_medium utm_campaign utm_content utm_term",
                    r = {
                        init: function (r) {
                            function i() {
                                var r = t.split(" "),
                                    i = "",
                                    n = {};
                                return e._.isArray(e.para.source_channel) && e.para.source_channel.length > 0 && (r = r.concat(e.para.source_channel), r = e._.unique(r)), e._.each(r, function (t) {
                                    i = e._.getQueryParam(location.href, t), i.length && (n[t] = i)
                                }), n
                            }
                            r && !e && (e = r, e.on && e.on("sdkAfterInitPara", function () {
                                e.registerInterceptor("businessStage", {
                                    getUtmData: {
                                        priority: 0,
                                        entry: function () {
                                            return i()
                                        }
                                    }
                                })
                            }))
                        }
                    };
                return window.SensorsDataWebJSSDKPlugin && "[object Object]" === Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) ? window.SensorsDataWebJSSDKPlugin.Utm = window.SensorsDataWebJSSDKPlugin.Utm || r : window.SensorsDataWebJSSDKPlugin = {
                    Utm: r
                }, r
            }(), br.use("AndroidBridge"), br.use("IOSBridge"), br.use("AndroidObsoleteBridge"), br.use("IOSObsoleteBridge"), br.use("Utm"), "string" == typeof window.sensorsDataAnalytic201505 ? (br.para = window[sensorsDataAnalytic201505].para, br._q = window[sensorsDataAnalytic201505]._q, window[sensorsDataAnalytic201505] = br, window.sensorsDataAnalytic201505 = br, br.init()) : "undefined" == typeof window.sensorsDataAnalytic201505 ? window.sensorsDataAnalytic201505 = br : qi = window.sensorsDataAnalytic201505
    } catch (Vi) {
        if ("object" == typeof console && console.log) try {
            console.log(Vi)
        } catch (Fi) {
            br.log(Fi)
        }
    }
    var zi = qi;
    return zi
});