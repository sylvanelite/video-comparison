

function t(t) {
    return t && t.__esModule ? t.default : t
}
var e, A, r, i, n, a = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
    o = {},
    s = {},
    h = a.parcelRequire6ada;
"use strict";
null == h && ((h = function(t) {
    if (t in o) return o[t].exports;
    if (t in s) {
        var e = s[t];
        delete s[t];
        var A = {
            id: t,
            exports: {}
        };
        return o[t] = A, e.call(A.exports, A, A.exports), A.exports
    }
    var r = Error("Cannot find module '" + t + "'");
    throw r.code = "MODULE_NOT_FOUND", r
}).register = function(t, e) {
    s[t] = e
}, a.parcelRequire6ada = h), h.register("4GpYD", function(t, e) {
    var A = arguments[3],
        r = arguments[4],
        i = arguments[5],
        n = JSON.stringify;
    t.exports = function(t, e) {
        for (var a, o = Object.keys(i), s = 0, h = o.length; s < h; s++) {
            var l = o[s],
                g = i[l].exports;
            if (g === t || g && g.default === t) {
                a = l;
                break
            }
        }
        if (!a) {
            a = Math.floor(4294967296 * Math.random()).toString(16);
            for (var u = {}, s = 0, h = o.length; s < h; s++) {
                var l = o[s];
                u[l] = l
            }
            r[a] = ["function(require,module,exports){" + t + "(self); }", u]
        }
        var c = Math.floor(4294967296 * Math.random()).toString(16),
            f = {};
        f[a] = a, r[c] = ["function(require,module,exports){var f = require(" + n(a) + ");(f.default ? f.default : f)(self);}", f];
        var I = {};
        (function t(e) {
            for (var A in I[e] = !0, r[e][1]) {
                var i = r[e][1][A];
                I[i] || t(i)
            }
        })(c);
        var d = "(" + A + ")({" + Object.keys(I).map(function(t) {
                return n(t) + ":[" + r[t][0] + "," + n(r[t][1]) + "]"
            }).join(",") + "},{},[" + n(c) + "])",
            m = window.URL || window.webkitURL || window.mozURL || window.msURL,
            B = new Blob([d], {
                type: "text/javascript"
            });
        if (e && e.bare) return B;
        var w = m.createObjectURL(B),
            p = new Worker(w);
        return p.objectURL = w, p
    }
}), h.register("gmLNO", function(t, e) {
    "use strict";
    var A = h("6jHzd"),
        r = h("HuDHY"),
        i = h("aAalJ");

    function n(t) {
        let e = t || [],
            n = {
                js: e.indexOf("js") >= 0,
                wasm: e.indexOf("wasm") >= 0
            };
        A.call(this, n), this.features = {
            js: n.js,
            wasm: n.wasm && this.has_wasm()
        }, this.use(r), this.use(i)
    }
    n.prototype = Object.create(A.prototype), n.prototype.constructor = n, n.prototype.resizeAndUnsharp = function(t, e) {
        let A = this.resize(t, e);
        return t.unsharpAmount && this.unsharp_mask(A, t.toWidth, t.toHeight, t.unsharpAmount, t.unsharpRadius, t.unsharpThreshold), A
    }, t.exports = n
}), h.register("6jHzd", function(t, e) {
    "use strict";
    var A = h("JNAHZ"),
        r = h("k4cZC"),
        i = h("2aYPS"),
        n = {
            js: !0,
            wasm: !0
        };

    function a(t) {
        if (!(this instanceof a)) return new a(t);
        var e = A({}, n, t || {});
        if (this.options = e, this.__cache = {}, this.__init_promise = null, this.__modules = e.modules || {}, this.__memory = null, this.__wasm = {}, this.__isLE = 1 === new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0], !this.options.js && !this.options.wasm) throw Error('mathlib: at least "js" or "wasm" should be enabled')
    }
    a.prototype.has_wasm = i, a.prototype.use = function(t) {
        return this.__modules[t.name] = t, this.options.wasm && this.has_wasm() && t.wasm_fn ? this[t.name] = t.wasm_fn : this[t.name] = t.fn, this
    }, a.prototype.init = function() {
        if (this.__init_promise) return this.__init_promise;
        if (!this.options.js && this.options.wasm && !this.has_wasm()) return Promise.reject(Error('mathlib: only "wasm" was enabled, but it\'s not supported'));
        var t = this;
        return this.__init_promise = Promise.all(Object.keys(t.__modules).map(function(e) {
            var A = t.__modules[e];
            return t.options.wasm && t.has_wasm() && A.wasm_fn && !t.__wasm[e] ? WebAssembly.compile(t.__base64decode(A.wasm_src)).then(function(A) {
                t.__wasm[e] = A
            }) : null
        })).then(function() {
            return t
        }), this.__init_promise
    }, a.prototype.__base64decode = r, a.prototype.__reallocate = function(t) {
        if (!this.__memory) return this.__memory = new WebAssembly.Memory({
            initial: Math.ceil(t / 65536)
        }), this.__memory;
        var e = this.__memory.buffer.byteLength;
        return e < t && this.__memory.grow(Math.ceil((t - e) / 65536)), this.__memory
    }, a.prototype.__instance = function(t, e, r) {
        if (e && this.__reallocate(e), !this.__wasm[t]) {
            var i = this.__modules[t];
            this.__wasm[t] = new WebAssembly.Module(this.__base64decode(i.wasm_src))
        }
        if (!this.__cache[t]) {
            var n = {
                memoryBase: 0,
                memory: this.__memory,
                tableBase: 0,
                table: new WebAssembly.Table({
                    initial: 0,
                    element: "anyfunc"
                })
            };
            this.__cache[t] = new WebAssembly.Instance(this.__wasm[t], {
                env: A(n, r || {})
            })
        }
        return this.__cache[t]
    }, a.prototype.__align = function(t, e) {
        var A = t % (e = e || 8);
        return t + (A ? e - A : 0)
    }, t.exports = a
}), h.register("JNAHZ", function(t, e) {
    "use strict";
    var A = Object.getOwnPropertySymbols,
        r = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    t.exports = ! function() {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, A = 0; A < 10; A++) e["_" + String.fromCharCode(A)] = A;
            var r = Object.getOwnPropertyNames(e).map(function(t) {
                return e[t]
            });
            if ("0123456789" !== r.join("")) return !1;
            var i = {};
            if ("abcdefghijklmnopqrst".split("").forEach(function(t) {
                    i[t] = t
                }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, i)).join("")) return !1;
            return !0
        } catch (t) {
            return !1
        }
    }() ? function(t, e) {
        for (var n, a, o = function(t) {
                if (null == t) throw TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }(t), s = 1; s < arguments.length; s++) {
            for (var h in n = Object(arguments[s])) r.call(n, h) && (o[h] = n[h]);
            if (A) {
                a = A(n);
                for (var l = 0; l < a.length; l++) i.call(n, a[l]) && (o[a[l]] = n[a[l]])
            }
        }
        return o
    } : Object.assign
}), h.register("k4cZC", function(t, e) {
    "use strict";
    t.exports = function(t) {
        for (var e = t.replace(/[\r\n=]/g, ""), A = e.length, r = new Uint8Array(3 * A >> 2), i = 0, n = 0, a = 0; a < A; a++) a % 4 == 0 && a && (r[n++] = i >> 16 & 255, r[n++] = i >> 8 & 255, r[n++] = 255 & i), i = i << 6 | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(a));
        var o = A % 4 * 6;
        return 0 === o ? (r[n++] = i >> 16 & 255, r[n++] = i >> 8 & 255, r[n++] = 255 & i) : 18 === o ? (r[n++] = i >> 10 & 255, r[n++] = i >> 2 & 255) : 12 === o && (r[n++] = i >> 4 & 255), r
    }
}), h.register("2aYPS", function(t, e) {
    "use strict";
    var A;
    t.exports = function() {
        if (void 0 !== A || (A = !1, "undefined" == typeof WebAssembly)) return A;
        try {
            var t = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11]),
                e = new WebAssembly.Module(t),
                r = new WebAssembly.Instance(e, {});
            0 !== r.exports.test(4) && (A = !0)
        } catch (t) {}
        return A
    }
}), h.register("HuDHY", function(t, e) {
    "use strict";
    t.exports = {
        name: "unsharp_mask",
        fn: h("j7utn"),
        wasm_fn: h("33nEL"),
        wasm_src: h("91xre")
    }
}), h.register("j7utn", function(t, e) {
    "use strict";
    var A = h("6XjtC");
    t.exports = function(t, e, r, i, n, a) {
        if (0 !== i && !(n < .5)) {
            n > 2 && (n = 2);
            var o, s, h, l, g, u = function(t, e, A) {
                    for (var r, i, n, a, o = e * A, s = new Uint16Array(o), h = 0; h < o; h++) r = t[4 * h], i = t[4 * h + 1], n = t[4 * h + 2], a = r >= i && r >= n ? r : i >= n && i >= r ? i : n, s[h] = a << 8;
                    return s
                }(t, e, r),
                c = new Uint16Array(u);
            A(c, e, r, n);
            for (var f = i / 100 * 4096 + .5 | 0, I = a << 8, d = e * r, m = 0; m < d; m++) Math.abs(l = (o = u[m]) - c[m]) >= I && (h = ((s = (s = (s = o + (f * l + 2048 >> 12)) > 65280 ? 65280 : s) < 0 ? 0 : s) << 12) / (o = 0 !== o ? o : 1) | 0, t[g = 4 * m] = t[g] * h + 2048 >> 12, t[g + 1] = t[g + 1] * h + 2048 >> 12, t[g + 2] = t[g + 2] * h + 2048 >> 12)
        }
    }
}), h.register("6XjtC", function(t, e) {
    var A, r, i, n, a, o, s, h;

    function l(t, e, A, r, i, n) {
        var a, o, s, h, l, g, u, c, f, I, d, m, B, w;
        for (f = 0; f < n; f++) {
            for (I = 0, g = f * i, u = f, c = 0, h = l = (a = t[g]) * r[6], d = r[0], m = r[1], B = r[4], w = r[5]; I < i; I++) s = (o = t[g]) * d + a * m + h * B + l * w, l = h, h = s, a = o, A[c] = h, c++, g++;
            for (g--, c--, u += n * (i - 1), h = l = (a = t[g]) * r[7], o = a, d = r[2], m = r[3], I = i - 1; I >= 0; I--) s = o * d + a * m + h * B + l * w, l = h, h = s, a = o, o = t[g], e[u] = A[c] + h, g--, c--, u -= n
        }
    }
    t.exports = function(t, e, g, u) {
        if (u) {
            var c, f, I, d, m, B = new Uint16Array(t.length),
                w = new Float32Array(Math.max(e, g)),
                p = ((c = u) < .5 && (c = .5), I = Math.exp(-(f = Math.exp(.527076) / c)), d = Math.exp(-2 * f), A = m = (1 - I) * (1 - I) / (1 + 2 * f * I - d), r = m * (f - 1) * I, i = m * (f + 1) * I, n = -m * d, s = (A + r) / (1 - (a = 2 * I) - (o = -d)), h = (i + n) / (1 - a - o), new Float32Array([A, r, i, n, a, o, s, h]));
            l(t, B, w, p, e, g, u), l(B, t, w, p, g, e, u)
        }
    }
}), h.register("33nEL", function(t, e) {
    "use strict";
    t.exports = function(t, e, A, r, i, n) {
        if (0 !== r && !(i < .5)) {
            i > 2 && (i = 2);
            var a = e * A,
                o = 4 * a,
                s = 2 * a,
                h = 2 * a,
                l = 4 * Math.max(e, A),
                g = o + s,
                u = g + h,
                c = u + h,
                f = c + l,
                I = this.__instance("unsharp_mask", o + s + 2 * h + l + 32, {
                    exp: Math.exp
                }),
                d = new Uint32Array(t.buffer);
            new Uint32Array(this.__memory.buffer).set(d);
            var m = I.exports.hsv_v16 || I.exports._hsv_v16;
            m(0, o, e, A), (m = I.exports.blurMono16 || I.exports._blurMono16)(o, g, u, c, f, e, A, i), (m = I.exports.unsharp || I.exports._unsharp)(0, 0, o, g, e, A, r, n), d.set(new Uint32Array(this.__memory.buffer, 0, a))
        }
    }
}), h.register("91xre", function(t, e) {
    "use strict";
    t.exports = "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"
}), h.register("aAalJ", function(t, e) {
    "use strict";
    t.exports = {
        name: "resize",
        fn: h("6q2qX"),
        wasm_fn: h("7l0gI"),
        wasm_src: h("jl9YG")
    }
}), h.register("6q2qX", function(t, e) {
    "use strict";
    var A = h("dzit3"),
        r = h("lirwo"),
        i = r.convolveHor,
        n = r.convolveVert,
        a = r.convolveHorWithPre,
        o = r.convolveVertWithPre;
    t.exports = function(t) {
        let e = t.src,
            r = t.width,
            s = t.height,
            h = t.toWidth,
            l = t.toHeight,
            g = t.scaleX || t.toWidth / t.width,
            u = t.scaleY || t.toHeight / t.height,
            c = t.offsetX || 0,
            f = t.offsetY || 0,
            I = t.dest || new Uint8Array(h * l * 4),
            d = void 0 === t.filter ? "mks2013" : t.filter,
            m = A(d, r, h, g, c),
            B = A(d, s, l, u, f),
            w = new Uint16Array(h * s * 4);
        return function(t, e, A) {
            let r = 3,
                i = e * A * 4 | 0;
            for (; r < i;) {
                if (255 !== t[r]) return !0;
                r = r + 4 | 0
            }
            return !1
        }(e, r, s) ? (a(e, w, r, s, h, m), o(w, I, s, h, l, B)) : (i(e, w, r, s, h, m), n(w, I, s, h, l, B), function(t, e, A) {
            let r = 3,
                i = e * A * 4 | 0;
            for (; r < i;) t[r] = 255, r = r + 4 | 0
        }(I, h, l)), I
    }
}), h.register("dzit3", function(t, e) {
    "use strict";
    var A = h("igrUv");

    function r(t) {
        return Math.round(16383 * t)
    }
    t.exports = function(t, e, i, n, a) {
        var o, s, h, l, g, u, c, f, I, d, m, B, w, p, Q, E, C, y = A.filter[t].fn,
            b = 1 / n,
            _ = Math.min(1, n),
            v = A.filter[t].win / _,
            M = new Int16Array((Math.floor((v + 1) * 2) + 2) * i),
            x = 0,
            D = !M.subarray || !M.set;
        for (o = 0; o < i; o++) {
            for (h = Math.max(0, Math.floor((s = (o + .5) * b + a) - v)), g = (l = Math.min(e - 1, Math.ceil(s + v))) - h + 1, u = new Float32Array(g), c = new Int16Array(g), f = 0, I = h, d = 0; I <= l; I++, d++) f += m = y((I + .5 - s) * _), u[d] = m;
            for (d = 0, B = 0; d < u.length; d++) B += w = u[d] / f, c[d] = r(w);
            for (c[i >> 1] += r(1 - B), p = 0; p < c.length && 0 === c[p];) p++;
            if (p < c.length) {
                for (Q = c.length - 1; Q > 0 && 0 === c[Q];) Q--;
                if (E = h + p, C = Q - p + 1, M[x++] = E, M[x++] = C, D)
                    for (d = p; d <= Q; d++) M[x++] = c[d];
                else M.set(c.subarray(p, Q + 1), x), x += C
            } else M[x++] = 0, M[x++] = 0
        }
        return M
    }
}), h.register("igrUv", function(t, e) {
    "use strict";
    t.exports = {
        filter: {
            box: {
                win: .5,
                fn: function(t) {
                    return t < 0 && (t = -t), t < .5 ? 1 : 0
                }
            },
            hamming: {
                win: 1,
                fn: function(t) {
                    if (t < 0 && (t = -t), t >= 1) return 0;
                    if (t < 11920929e-14) return 1;
                    var e = t * Math.PI;
                    return Math.sin(e) / e * (.54 + .46 * Math.cos(e / 1))
                }
            },
            lanczos2: {
                win: 2,
                fn: function(t) {
                    if (t < 0 && (t = -t), t >= 2) return 0;
                    if (t < 11920929e-14) return 1;
                    var e = t * Math.PI;
                    return Math.sin(e) / e * Math.sin(e / 2) / (e / 2)
                }
            },
            lanczos3: {
                win: 3,
                fn: function(t) {
                    if (t < 0 && (t = -t), t >= 3) return 0;
                    if (t < 11920929e-14) return 1;
                    var e = t * Math.PI;
                    return Math.sin(e) / e * Math.sin(e / 3) / (e / 3)
                }
            },
            mks2013: {
                win: 2.5,
                fn: function(t) {
                    return (t < 0 && (t = -t), t >= 2.5) ? 0 : t >= 1.5 ? -.125 * (t - 2.5) * (t - 2.5) : t >= .5 ? .25 * (4 * t * t - 11 * t + 7) : 1.0625 - 1.75 * t * t
                }
            }
        },
        f2q: {
            box: 0,
            hamming: 1,
            lanczos2: 2,
            lanczos3: 3
        },
        q2f: ["box", "hamming", "lanczos2", "lanczos3"]
    }
}), h.register("lirwo", function(t, e) {
    "use strict";

    function A(t) {
        return t < 0 ? 0 : t > 255 ? 255 : t
    }

    function r(t) {
        return t >= 0 ? t : 0
    }
    t.exports = {
        convolveHor: function(t, e, A, i, n, a) {
            var o, s, h, l, g, u, c, f, I, d, m, B = 0,
                w = 0;
            for (I = 0; I < i; I++) {
                for (d = 0, g = 0; d < n; d++) {
                    for (u = a[g++], c = a[g++], f = B + 4 * u | 0, o = s = h = l = 0; c > 0; c--) l = l + (m = a[g++]) * t[f + 3] | 0, h = h + m * t[f + 2] | 0, s = s + m * t[f + 1] | 0, o = o + m * t[f] | 0, f = f + 4 | 0;
                    e[w + 3] = r(l >> 7), e[w + 2] = r(h >> 7), e[w + 1] = r(s >> 7), e[w] = r(o >> 7), w = w + 4 * i | 0
                }
                w = (I + 1) * 4 | 0, B = (I + 1) * A * 4 | 0
            }
        },
        convolveVert: function(t, e, r, i, n, a) {
            var o, s, h, l, g, u, c, f, I, d, m, B = 0,
                w = 0;
            for (I = 0; I < i; I++) {
                for (d = 0, g = 0; d < n; d++) {
                    for (u = a[g++], c = a[g++], f = B + 4 * u | 0, o = s = h = l = 0; c > 0; c--) l = l + (m = a[g++]) * t[f + 3] | 0, h = h + m * t[f + 2] | 0, s = s + m * t[f + 1] | 0, o = o + m * t[f] | 0, f = f + 4 | 0;
                    o >>= 7, s >>= 7, h >>= 7, l >>= 7, e[w + 3] = A(l + 8192 >> 14), e[w + 2] = A(h + 8192 >> 14), e[w + 1] = A(s + 8192 >> 14), e[w] = A(o + 8192 >> 14), w = w + 4 * i | 0
                }
                w = (I + 1) * 4 | 0, B = (I + 1) * r * 4 | 0
            }
        },
        convolveHorWithPre: function(t, e, A, i, n, a) {
            var o, s, h, l, g, u, c, f, I, d, m, B, w = 0,
                p = 0;
            for (d = 0; d < i; d++) {
                for (m = 0, u = 0; m < n; m++) {
                    for (c = a[u++], f = a[u++], I = w + 4 * c | 0, o = s = h = l = 0; f > 0; f--) l = l + (B = a[u++]) * (g = t[I + 3]) | 0, h = h + B * t[I + 2] * g | 0, s = s + B * t[I + 1] * g | 0, o = o + B * t[I] * g | 0, I = I + 4 | 0;
                    h = h / 255 | 0, s = s / 255 | 0, o = o / 255 | 0, e[p + 3] = r(l >> 7), e[p + 2] = r(h >> 7), e[p + 1] = r(s >> 7), e[p] = r(o >> 7), p = p + 4 * i | 0
                }
                p = (d + 1) * 4 | 0, w = (d + 1) * A * 4 | 0
            }
        },
        convolveVertWithPre: function(t, e, r, i, n, a) {
            var o, s, h, l, g, u, c, f, I, d, m, B = 0,
                w = 0;
            for (I = 0; I < i; I++) {
                for (d = 0, g = 0; d < n; d++) {
                    for (u = a[g++], c = a[g++], f = B + 4 * u | 0, o = s = h = l = 0; c > 0; c--) l = l + (m = a[g++]) * t[f + 3] | 0, h = h + m * t[f + 2] | 0, s = s + m * t[f + 1] | 0, o = o + m * t[f] | 0, f = f + 4 | 0;
                    o >>= 7, s >>= 7, h >>= 7, l >>= 7, (l = A(l + 8192 >> 14)) > 0 && (o = 255 * o / l | 0, s = 255 * s / l | 0, h = 255 * h / l | 0), e[w + 3] = l, e[w + 2] = A(h + 8192 >> 14), e[w + 1] = A(s + 8192 >> 14), e[w] = A(o + 8192 >> 14), w = w + 4 * i | 0
                }
                w = (I + 1) * 4 | 0, B = (I + 1) * r * 4 | 0
            }
        }
    }
}), h.register("7l0gI", function(t, e) {
    "use strict";
    var A = h("dzit3");
    let r = !0;
    try {
        r = 1 === new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0]
    } catch (t) {}

    function i(t, e, A) {
        if (r) {
            e.set(new Uint8Array(t.buffer, 0, t.byteLength), A);
            return
        }
        for (let r = A, i = 0; i < t.length; i++) {
            let A = t[i];
            e[r++] = 255 & A, e[r++] = A >> 8 & 255
        }
    }
    t.exports = function(t) {
        let e = t.src,
            r = t.width,
            n = t.height,
            a = t.toWidth,
            o = t.toHeight,
            s = t.scaleX || t.toWidth / t.width,
            h = t.scaleY || t.toHeight / t.height,
            l = t.offsetX || 0,
            g = t.offsetY || 0,
            u = t.dest || new Uint8Array(a * o * 4),
            c = void 0 === t.filter ? "mks2013" : t.filter,
            f = A(c, r, a, s, l),
            I = A(c, n, o, h, g),
            d = Math.max(e.byteLength, u.byteLength),
            m = this.__align(0 + d),
            B = n * a * 8,
            w = this.__align(m + B),
            p = this.__align(w + f.byteLength),
            Q = p + I.byteLength,
            E = this.__instance("resize", Q),
            C = new Uint8Array(this.__memory.buffer),
            y = new Uint32Array(this.__memory.buffer),
            b = new Uint32Array(e.buffer);
        y.set(b), i(f, C, w), i(I, C, p);
        let _ = E.exports.convolveHV || E.exports._convolveHV;
        (function(t, e, A) {
            let r = 3,
                i = e * A * 4 | 0;
            for (; r < i;) {
                if (255 !== t[r]) return !0;
                r = r + 4 | 0
            }
            return !1
        })(e, r, n) ? _(w, p, m, r, n, a, o, 1): (_(w, p, m, r, n, a, o, 0), function(t, e, A) {
            let r = 3,
                i = e * A * 4 | 0;
            for (; r < i;) t[r] = 255, r = r + 4 | 0
        }(u, a, o));
        let v = new Uint32Array(u.buffer);
        return v.set(new Uint32Array(this.__memory.buffer, 0, o * a)), u
    }
}), h.register("jl9YG", function(t, e) {
    "use strict";
    t.exports = "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"
}), Object.defineProperty({}, "createCanvas", {
    get: function() {
        return e
    },
    set: function(t) {
        return e = t
    },
    enumerable: !0,
    configurable: !0
});
const l = "'([^']+)'|\"([^\"]+)\"|[\\w\\s-]+";
"use strict";
"use strict";
RegExp("(bold|bolder|lighter|[1-9]00) +", "i"), RegExp("(italic|oblique) +", "i"), RegExp("(small-caps) +", "i"), RegExp("(ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded) +", "i"), RegExp(`([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q) *((?:${l})( *, *(?:${l}))*)`), e = function(t, e) {
    return Object.assign(document.createElement("canvas"), {
        width: t,
        height: e
    })
};
var g = {},
    u = h("JNAHZ"),
    c = h("gmLNO"),
    f = {};

function I(t, e) {
    this.create = t, this.available = [], this.acquired = {}, this.lastId = 1, this.timeoutId = 0, this.idle = e || 2e3
}
"use strict";

function d(t) {
    return Object.prototype.toString.call(t)
}
"use strict";
I.prototype.acquire = function() {
    let t;
    return 0 !== this.available.length ? t = this.available.pop() : ((t = this.create()).id = this.lastId++, t.release = () => this.release(t)), this.acquired[t.id] = t, t
}, I.prototype.release = function(t) {
    delete this.acquired[t.id], t.lastUsed = Date.now(), this.available.push(t), 0 === this.timeoutId && (this.timeoutId = setTimeout(() => this.gc(), 100))
}, I.prototype.gc = function() {
    let t = Date.now();
    this.available = this.available.filter(e => !(t - e.lastUsed > this.idle) || (e.destroy(), !1)), 0 !== this.available.length ? this.timeoutId = setTimeout(() => this.gc(), 100) : this.timeoutId = 0
}, f = I, A = function(t) {
    let e = d(t);
    return "[object HTMLCanvasElement]" === e || "[object OffscreenCanvas]" === e || "[object Canvas]" === e
}, r = function(t) {
    let e = 0,
        A = [];

    function r() {
        e < t && A.length && (e++, A.shift()())
    }
    return function(t) {
        return new Promise((i, n) => {
            A.push(() => {
                t().then(t => {
                    i(t), e--, r()
                }, t => {
                    n(t), e--, r()
                })
            }), r()
        })
    }
}, i = function(t) {
    switch (t) {
        case 0:
            return "pixelated";
        case 1:
            return "low";
        case 2:
            return "medium"
    }
    return "high"
}, n = function(t) {
    let e = !1;
    try {
        let A = t(2, 1).getContext("2d"),
            r = A.createImageData(2, 1);
        r.data[0] = 12, r.data[1] = 23, r.data[2] = 34, r.data[3] = 255, r.data[4] = 45, r.data[5] = 56, r.data[6] = 67, r.data[7] = 255, A.putImageData(r, 0, 0), r = null, r = A.getImageData(0, 0, 2, 1), 12 === r.data[0] && 23 === r.data[1] && 34 === r.data[2] && 255 === r.data[3] && 45 === r.data[4] && 56 === r.data[5] && 67 === r.data[6] && 255 === r.data[7] && (e = !0)
    } catch (t) {}
    return e
};
var m = {};
"use strict";
m = function() {
    let t;
    let e = h("gmLNO");
    onmessage = function(A) {
        let r = A.data.opts;
        if (!r.src && r.srcBitmap) {
            let t = new OffscreenCanvas(r.width, r.height),
                e = t.getContext("2d");
            e.drawImage(r.srcBitmap, 0, 0), r.src = e.getImageData(0, 0, r.width, r.height).data, t.width = t.height = 0, t = null, r.srcBitmap.close(), r.srcBitmap = null
        }
        t || (t = new e(A.data.features));
        let i = t.resizeAndUnsharp(r);
        postMessage({
            data: i
        }, [i.buffer])
    }
};
var B = {};
"use strict";
B = function(t, e, A, r, i, n) {
    let a = A / t,
        o = r / e,
        s = (2 * n + 2 + 1) / i;
    if (s > .5) return [
        [A, r]
    ];
    let h = Math.ceil(Math.log(Math.min(a, o)) / Math.log(s));
    if (h <= 1) return [
        [A, r]
    ];
    let l = [];
    for (let i = 0; i < h; i++) {
        let n = Math.round(Math.pow(Math.pow(t, h - i - 1) * Math.pow(A, i + 1), 1 / h)),
            a = Math.round(Math.pow(Math.pow(e, h - i - 1) * Math.pow(r, i + 1), 1 / h));
        l.push([n, a])
    }
    return l
};
var w = {};

function p(t) {
    var e = Math.round(t);
    return 1e-5 > Math.abs(t - e) ? e : Math.floor(t)
}

function Q(t) {
    var e = Math.round(t);
    return 1e-5 > Math.abs(t - e) ? e : Math.ceil(t)
}
w = function(t) {
    var e, A, r, i, n, a, o = t.toWidth / t.width,
        s = t.toHeight / t.height,
        h = p(t.srcTileSize * o) - 2 * t.destTileBorder,
        l = p(t.srcTileSize * s) - 2 * t.destTileBorder;
    if (h < 1 || l < 1) throw Error("Internal error in pica: target tile width/height is too small.");
    var g = [];
    for (i = 0; i < t.toHeight; i += l)
        for (r = 0; r < t.toWidth; r += h)(e = r - t.destTileBorder) < 0 && (e = 0), n = r + h + t.destTileBorder - e, e + n >= t.toWidth && (n = t.toWidth - e), (A = i - t.destTileBorder) < 0 && (A = 0), a = i + l + t.destTileBorder - A, A + a >= t.toHeight && (a = t.toHeight - A), g.push({
            toX: e,
            toY: A,
            toWidth: n,
            toHeight: a,
            toInnerX: r,
            toInnerY: i,
            toInnerWidth: h,
            toInnerHeight: l,
            offsetX: e / o - p(e / o),
            offsetY: A / s - p(A / s),
            scaleX: o,
            scaleY: s,
            x: p(e / o),
            y: p(A / s),
            width: Q(n / o),
            height: Q(a / s)
        });
    return g
};
var E = h("igrUv");
const C = {};
let y = !1;
try {
    "undefined" != typeof navigator && navigator.userAgent && (y = navigator.userAgent.indexOf("Safari") >= 0)
} catch (t) {}
let b = 1;
"undefined" != typeof navigator && (b = Math.min(navigator.hardwareConcurrency || 1, 4));
const _ = {
        tile: 1024,
        concurrency: b,
        features: ["js", "wasm", "ww"],
        idle: 2e3,
        createCanvas: function(t, e) {
            let A = document.createElement("canvas");
            return A.width = t, A.height = e, A
        }
    },
    v = {
        filter: "mks2013",
        unsharpAmount: 0,
        unsharpRadius: 0,
        unsharpThreshold: 0
    };
let M = !1,
    x = !1,
    D = !1,
    H = !1,
    G = !1;

function U() {
    return {
        value: h("4GpYD")(m),
        destroy: function() {
            if (this.value.terminate(), "undefined" != typeof window) {
                let t = window.URL || window.webkitURL || window.mozURL || window.msURL;
                t && t.revokeObjectURL && this.value.objectURL && t.revokeObjectURL(this.value.objectURL)
            }
        }
    }
}

function R(t) {
    if (!(this instanceof R)) return new R(t);
    this.options = u({}, _, t || {});
    let e = `lk_${this.options.concurrency}`;
    this.__limit = C[e] || r(this.options.concurrency), C[e] || (C[e] = this.__limit), this.features = {
        js: !1,
        wasm: !1,
        cib: !1,
        ww: !1
    }, this.__workersPool = null, this.__requested_features = [], this.__mathlib = null
}
R.prototype.init = function() {
    let t, e;
    if (this.__initPromise) return this.__initPromise;
    if ("undefined" != typeof ImageData && "undefined" != typeof Uint8ClampedArray) try {
        new ImageData(new Uint8ClampedArray(400), 10, 10), M = !0
    } catch (t) {}
    "undefined" != typeof ImageBitmap && (ImageBitmap.prototype && ImageBitmap.prototype.close ? x = !0 : this.debug("ImageBitmap does not support .close(), disabled"));
    let A = this.options.features.slice();
    if (A.indexOf("all") >= 0 && (A = ["cib", "wasm", "js", "ww"]), this.__requested_features = A, this.__mathlib = new c(A), A.indexOf("ww") >= 0 && "undefined" != typeof window && "Worker" in window) try {
        h("4GpYD")(function() {}).terminate(), this.features.ww = !0;
        let t = `wp_${JSON.stringify(this.options)}`;
        C[t] ? this.__workersPool = C[t] : (this.__workersPool = new f(U, this.options.idle), C[t] = this.__workersPool)
    } catch (t) {}
    let r = this.__mathlib.init().then(t => {
        u(this.features, t.features)
    });
    if (x) {
        var i;
        t = (i = this.options.createCanvas, Promise.resolve().then(() => {
            if ("undefined" == typeof createImageBitmap) return !1;
            let t = i(100, 100);
            return createImageBitmap(t, 0, 0, 100, 100, {
                resizeWidth: 10,
                resizeHeight: 10,
                resizeQuality: "high"
            }).then(e => {
                let A = 10 === e.width;
                return e.close(), t = null, A
            })
        }).catch(() => !1)).then(t => {
            if (this.features.cib && 0 > A.indexOf("cib")) {
                this.debug("createImageBitmap() resize supported, but disabled by config");
                return
            }
            A.indexOf("cib") >= 0 && (this.features.cib = t)
        })
    } else t = Promise.resolve(!1);
    D = n(this.options.createCanvas), e = (e = x && M && -1 !== A.indexOf("ww") ? new Promise((t, e) => {
        if ("undefined" == typeof OffscreenCanvas) {
            t(!1);
            return
        }
        let A = btoa(`(${(function(t){if("undefined"==typeof createImageBitmap){t.postMessage(!1);return}Promise.resolve().then(()=>{let t=new OffscreenCanvas(10,10);return t.getContext("2d").rect(0,0,1,1),createImageBitmap(t,0,0,1,1)}).then(()=>t.postMessage(!0),()=>t.postMessage(!1))}).toString()})(self);`),
            r = new Worker(`data:text/javascript;base64,${A}`);
        r.onmessage = e => t(e.data), r.onerror = e
    }).then(t => t, () => !1) : Promise.resolve(!1)).then(t => {
        H = t
    });
    let a = new Promise(t => {
        if ("undefined" == typeof Image || "undefined" == typeof createImageBitmap) {
            t(!1);
            return
        }
        let e = new Image;
        e.src = "data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z", e.onload = () => {
            createImageBitmap(e, 0, 0, e.width, e.height).then(A => {
                A.width === e.width && A.height === e.height ? t(!0) : t(!1)
            }, () => t(!1))
        }, e.onerror = () => t(!1)
    }).then(t => {
        G = t
    });
    return this.__initPromise = Promise.all([r, t, e, a]).then(() => this), this.__initPromise
}, R.prototype.__invokeResize = function(t, e) {
    return e.__mathCache = e.__mathCache || {}, Promise.resolve().then(() => this.features.ww ? new Promise((A, r) => {
        let i = this.__workersPool.acquire();
        e.cancelToken && e.cancelToken.catch(t => r(t)), i.value.onmessage = t => {
            i.release(), t.data.err ? r(t.data.err) : A(t.data)
        };
        let n = [];
        t.src && n.push(t.src.buffer), t.srcBitmap && n.push(t.srcBitmap), i.value.postMessage({
            opts: t,
            features: this.__requested_features,
            preload: {
                wasm_nodule: this.__mathlib.__
            }
        }, n)
    }) : {
        data: this.__mathlib.resizeAndUnsharp(t, e.__mathCache)
    })
}, R.prototype.__extractTileData = function(t, e, r, i, n) {
    if (this.features.ww && H && (A(e) || G)) return this.debug("Create tile for OffscreenCanvas"), createImageBitmap(i.srcImageBitmap || e, t.x, t.y, t.width, t.height).then(t => (n.srcBitmap = t, n));
    if (A(e)) return i.srcCtx || (i.srcCtx = e.getContext("2d")), this.debug("Get tile pixel data"), n.src = i.srcCtx.getImageData(t.x, t.y, t.width, t.height).data, n;
    this.debug("Draw tile imageBitmap/image to temporary canvas");
    let a = this.options.createCanvas(t.width, t.height),
        o = a.getContext("2d");
    return o.globalCompositeOperation = "copy", o.drawImage(i.srcImageBitmap || e, t.x, t.y, t.width, t.height, 0, 0, t.width, t.height), this.debug("Get tile pixel data"), n.src = o.getImageData(0, 0, t.width, t.height).data, a.width = a.height = 0, n
}, R.prototype.__landTileData = function(t, e, A) {
    let r;
    if (this.debug("Convert raw rgba tile result to ImageData"), e.bitmap) return A.toCtx.drawImage(e.bitmap, t.toX, t.toY), null;
    if (M) r = new ImageData(new Uint8ClampedArray(e.data), t.toWidth, t.toHeight);
    else if ((r = A.toCtx.createImageData(t.toWidth, t.toHeight)).data.set) r.data.set(e.data);
    else
        for (let t = r.data.length - 1; t >= 0; t--) r.data[t] = e.data[t];
    return this.debug("Draw tile"), y ? A.toCtx.putImageData(r, t.toX, t.toY, t.toInnerX - t.toX, t.toInnerY - t.toY, t.toInnerWidth + 1e-5, t.toInnerHeight + 1e-5) : A.toCtx.putImageData(r, t.toX, t.toY, t.toInnerX - t.toX, t.toInnerY - t.toY, t.toInnerWidth, t.toInnerHeight), null
}, R.prototype.__tileAndResize = function(t, e, r) {
    let i = {
            srcCtx: null,
            srcImageBitmap: null,
            isImageBitmapReused: !1,
            toCtx: null
        },
        n = e => this.__limit(() => {
            if (r.canceled) return r.cancelToken;
            let A = {
                width: e.width,
                height: e.height,
                toWidth: e.toWidth,
                toHeight: e.toHeight,
                scaleX: e.scaleX,
                scaleY: e.scaleY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                filter: r.filter,
                unsharpAmount: r.unsharpAmount,
                unsharpRadius: r.unsharpRadius,
                unsharpThreshold: r.unsharpThreshold
            };
            return this.debug("Invoke resize math"), Promise.resolve(A).then(A => this.__extractTileData(e, t, r, i, A)).then(t => (this.debug("Invoke resize math"), this.__invokeResize(t, r))).then(t => r.canceled ? r.cancelToken : (i.srcImageData = null, this.__landTileData(e, t, i)))
        });
    return Promise.resolve().then(() => {
        if (i.toCtx = e.getContext("2d"), A(t)) return null;
        if ("[object ImageBitmap]" === d(t)) return i.srcImageBitmap = t, i.isImageBitmapReused = !0, null;
        if ("[object HTMLImageElement]" === d(t)) return x ? (this.debug("Decode image via createImageBitmap"), createImageBitmap(t).then(t => {
            i.srcImageBitmap = t
        }).catch(t => null)) : null;
        throw Error('Pica: ".from" should be Image, Canvas or ImageBitmap')
    }).then(() => {
        if (r.canceled) return r.cancelToken;
        this.debug("Calculate tiles");
        let t = w({
            width: r.width,
            height: r.height,
            srcTileSize: this.options.tile,
            toWidth: r.toWidth,
            toHeight: r.toHeight,
            destTileBorder: r.__destTileBorder
        }).map(t => n(t));

        function A(t) {
            t.srcImageBitmap && (t.isImageBitmapReused || t.srcImageBitmap.close(), t.srcImageBitmap = null)
        }
        return this.debug("Process tiles"), Promise.all(t).then(() => (this.debug("Finished!"), A(i), e), t => {
            throw A(i), t
        })
    })
}, R.prototype.__processStages = function(t, e, A, r) {
    let i, n;
    if (r.canceled) return r.cancelToken;
    let [a, o] = t.shift(), s = 0 === t.length;
    return i = s || 0 > E.q2f.indexOf(r.filter) ? r.filter : "box" === r.filter ? "box" : "hamming", r = u({}, r, {
        toWidth: a,
        toHeight: o,
        filter: i
    }), s || (n = this.options.createCanvas(a, o)), this.__tileAndResize(e, s ? A : n, r).then(() => s ? A : (r.width = a, r.height = o, this.__processStages(t, n, A, r))).then(t => (n && (n.width = n.height = 0), t))
}, R.prototype.__resizeViaCreateImageBitmap = function(t, e, A) {
    let r = e.getContext("2d");
    return this.debug("Resize via createImageBitmap()"), createImageBitmap(t, {
        resizeWidth: A.toWidth,
        resizeHeight: A.toHeight,
        resizeQuality: i(E.f2q[A.filter])
    }).then(t => {
        if (A.canceled) return A.cancelToken;
        if (!A.unsharpAmount) return r.drawImage(t, 0, 0), t.close(), r = null, this.debug("Finished!"), e;
        this.debug("Unsharp result");
        let i = this.options.createCanvas(A.toWidth, A.toHeight),
            n = i.getContext("2d");
        n.drawImage(t, 0, 0), t.close();
        let a = n.getImageData(0, 0, A.toWidth, A.toHeight);
        return this.__mathlib.unsharp_mask(a.data, A.toWidth, A.toHeight, A.unsharpAmount, A.unsharpRadius, A.unsharpThreshold), r.putImageData(a, 0, 0), i.width = i.height = 0, a = n = i = r = null, this.debug("Finished!"), e
    })
}, R.prototype.resize = function(t, e, A) {
    this.debug("Start resize...");
    let r = u({}, v);
    if (isNaN(A) ? A && (r = u(r, A)) : r = u(r, {
            quality: A
        }), r.toWidth = e.width, r.toHeight = e.height, r.width = t.naturalWidth || t.width, r.height = t.naturalHeight || t.height, Object.prototype.hasOwnProperty.call(r, "quality")) {
        if (r.quality < 0 || r.quality > 3) throw Error(`Pica: .quality should be [0..3], got ${r.quality}`);
        r.filter = E.q2f[r.quality]
    }
    return 0 === e.width || 0 === e.height ? Promise.reject(Error(`Invalid output size: ${e.width}x${e.height}`)) : (r.unsharpRadius > 2 && (r.unsharpRadius = 2), r.canceled = !1, r.cancelToken && (r.cancelToken = r.cancelToken.then(t => {
        throw r.canceled = !0, t
    }, t => {
        throw r.canceled = !0, t
    })), r.__destTileBorder = Math.ceil(Math.max(3, 2.5 * r.unsharpRadius | 0)), this.init().then(() => {
        if (r.canceled) return r.cancelToken;
        if (this.features.cib) {
            if (E.q2f.indexOf(r.filter) >= 0) return this.__resizeViaCreateImageBitmap(t, e, r);
            this.debug("cib is enabled, but not supports provided filter, fallback to manual math")
        }
        if (!D) {
            let t = Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");
            throw t.code = "ERR_GET_IMAGE_DATA", t
        }
        let A = B(r.width, r.height, r.toWidth, r.toHeight, this.options.tile, r.__destTileBorder);
        return this.__processStages(A, t, e, r)
    }))
}, R.prototype.resizeBuffer = function(t) {
    let e = u({}, v, t);
    if (Object.prototype.hasOwnProperty.call(e, "quality")) {
        if (e.quality < 0 || e.quality > 3) throw Error(`Pica: .quality should be [0..3], got ${e.quality}`);
        e.filter = E.q2f[e.quality]
    }
    return this.init().then(() => this.__mathlib.resizeAndUnsharp(e))
}, R.prototype.toBlob = function(t, e, A) {
    return e = e || "image/png", new Promise(r => {
        if (t.toBlob) {
            t.toBlob(t => r(t), e, A);
            return
        }
        if (t.convertToBlob) {
            r(t.convertToBlob({
                type: e,
                quality: A
            }));
            return
        }
        let i = atob(t.toDataURL(e, A).split(",")[1]),
            n = i.length,
            a = new Uint8Array(n);
        for (let t = 0; t < n; t++) a[t] = i.charCodeAt(t);
        r(new Blob([a], {
            type: e
        }))
    })
}, R.prototype.debug = function() {}, g = R;
const k = new class {
        async resizeImageAndGetData(t, e, A, r = {}) {
            let i = await this.resizeImage(t, e, A, r),
                n = i.getContext("2d");
            return n.getImageData(0, 0, e, A).data
        }
        async resizeImage(A, r, i, n) {
            let a, o;
            let {
                sx: s,
                sy: h,
                sw: l,
                sh: u
            } = n;
            "undefined" != typeof window && A.setAttribute("crossOrigin", "Anonymous");
            let c = this.getImageCanvas(A, s, h, l, u);
            if ("undefined" == typeof window)(a = e(r, i)).width = r, a.height = i, c[Symbol.toStringTag] = "HTMLCanvasElement", o = new(t(g))({
                tile: 1024,
                concurrency: 1,
                features: ["js"],
                idle: 2e3,
                createCanvas: e
            });
            else {
                function f(t, e) {
                    let A = document.createElement("canvas");
                    return A.width = t, A.height = e, A
                }
                o = new(t(g))({
                    tile: 1024,
                    concurrency: 1,
                    features: ["js", "wasm"],
                    idle: 2e3,
                    browserCreateCanvas: f
                }), a = f(r, i)
            }
            return await o.resize(c, a), a
        }
        getImageCanvas(t, A, r, i, n) {
            if ("[object HTMLCanvasElement]" === Object.prototype.toString.call(t) && void 0 === A) return t;
            let a = "undefined" == typeof window ? e(i || t.width, n || t.height) : document.createElement("canvas");
            a.width = t.naturalWidth || i, a.height = t.naturalHeight || n;
            let o = a.getContext("2d");
            if (void 0 !== A) {
                let e = t.getContext("2d"),
                    s = e.getImageData(A, r, i, n);
                a[Symbol.toStringTag] = "HTMLCanvasElement", o.putImageData(s, 0, 0)
            } else o.drawImage(t, 0, 0);
            return a
        }
    },
    q = new class {
        convert(t) {
            let e = new Uint8ClampedArray(t.length / 4);
            for (let A = 0; A < t.length; A += 4) e[A >> 2] = Math.round(299 * t[A] / 1e3 + 587 * t[A + 1] / 1e3 + 114 * t[A + 2] / 1e3);
            return e
        }
    };
class S {
    binArray;
    constructor(t) {
        this.binArray = t
    }
    static fromBase64(t) {
        let e = atob(t),
            A = new Uint8ClampedArray(8 * e.length);
        for (let t = 0; t < e.length; t++) {
            let r = e.charCodeAt(t);
            A[8 * t] = 1 & r, A[8 * t + 1] = (2 & r) >> 1, A[8 * t + 2] = (4 & r) >> 2, A[8 * t + 3] = (8 & r) >> 3, A[8 * t + 4] = (16 & r) >> 4, A[8 * t + 5] = (32 & r) >> 5, A[8 * t + 6] = (64 & r) >> 6, A[8 * t + 7] = (128 & r) >> 7
        }
        return new S(A)
    }
    static fromHexStringReversed(t) {
        if (t.length % 2 != 0) throw Error("hex string length must be a multiple of 2");
        let e = new Uint8ClampedArray(4 * t.length);
        for (let A = 0; A < t.length; A += 2) {
            let r = Number.parseInt(t.slice(A, A + 2), 16);
            if (Number.isNaN(r)) throw Error("Invalid hex string");
            e[4 * A] = (128 & r) >> 7, e[4 * A + 1] = (64 & r) >> 6, e[4 * A + 2] = (32 & r) >> 5, e[4 * A + 3] = (16 & r) >> 4, e[4 * A + 4] = (8 & r) >> 3, e[4 * A + 5] = (4 & r) >> 2, e[4 * A + 6] = (2 & r) >> 1, e[4 * A + 7] = 1 & r
        }
        return new S(e)
    }
    static fromHexString(t) {
        if (t.length % 2 != 0) throw Error("hex string length must be a multiple of 2");
        let e = new Uint8ClampedArray(4 * t.length);
        for (let A = 0; A < t.length; A += 2) {
            let r = Number.parseInt(t.slice(A, A + 2), 16);
            if (Number.isNaN(r)) throw Error("Invalid hex string");
            e[4 * A] = 1 & r, e[4 * A + 1] = (2 & r) >> 1, e[4 * A + 2] = (4 & r) >> 2, e[4 * A + 3] = (8 & r) >> 3, e[4 * A + 4] = (16 & r) >> 4, e[4 * A + 5] = (32 & r) >> 5, e[4 * A + 6] = (64 & r) >> 6, e[4 * A + 7] = (128 & r) >> 7
        }
        return new S(e)
    }
    toHexStringReversed() {
        let t = "";
        for (let e = 0; e < this.binArray.length; e += 8) {
            let A = this.binArray[e] << 7 | this.binArray[e + 1] << 6 | this.binArray[e + 2] << 5 | this.binArray[e + 3] << 4 | this.binArray[e + 4] << 3 | this.binArray[e + 5] << 2 | this.binArray[e + 6] << 1 | this.binArray[e + 7];
            t += A.toString(16).padStart(2, "0")
        }
        return t
    }
    toHexString() {
        let t = "";
        for (let e = 0; e < this.binArray.length; e += 8) {
            let A = this.binArray[e] | this.binArray[e + 1] << 1 | this.binArray[e + 2] << 2 | this.binArray[e + 3] << 3 | this.binArray[e + 4] << 4 | this.binArray[e + 5] << 5 | this.binArray[e + 6] << 6 | this.binArray[e + 7] << 7;
            t += A.toString(16).padStart(2, "0")
        }
        return t
    }
    toBase64() {
        let t = [];
        for (let e = 0; e < this.binArray.length; e += 8) t.push(this.binArray[e] | this.binArray[e + 1] << 1 | this.binArray[e + 2] << 2 | this.binArray[e + 3] << 3 | this.binArray[e + 4] << 4 | this.binArray[e + 5] << 5 | this.binArray[e + 6] << 6 | this.binArray[e + 7] << 7);
        return btoa(String.fromCharCode(...new Uint8Array(t)))
    }
    hammingDistance(t) {
        if (t.binArray.length !== this.binArray.length) throw Error("Cannot compare two ImageHash instances of different sizes");
        let e = 0;
        for (let A = 0; A < this.binArray.length; A++) this.binArray[A] !== t.binArray[A] && (e += 1);
        return e
    }
}
class F {
    constructor(t) {
        this.segmentHashes = t
    }
    toJSON() {
        return this.segmentHashes.map(t => t.toHexString())
    }
    static fromJSON(t) {
        return new F(t.map(t => S.fromHexString(t)))
    }
    hashDiff(t, e) {
        let A = 0,
            r = 0;
        for (let i = 0; i < t.segmentHashes.length; i++) {
            let n = [];
            for (let e = 0; e < this.segmentHashes.length; e++) n.push(t.segmentHashes[i].hammingDistance(this.segmentHashes[e]));
            let a = Math.min(...n);
            a <= e && (A += a, r += 1)
        }
        return {
            num: r,
            sum: A
        }
    }
}
async function j(t, e = 8) {
    let A = q.convert(await k.resizeImageAndGetData(t, e, e)),
        r = new Uint8ClampedArray(e * e),
        i = 0;
    for (let t = 0; t < A.length; t++) i += A[t];
    let n = i / A.length;
    for (let t = 0; t < A.length; t++) r[t] = A[t] > n;
    return new S(r)
}
async function O(t, e = 8) {
    let A = q.convert(await k.resizeImageAndGetData(t, e + 1, e)),
        r = new Uint8ClampedArray(e * e),
        i = e + 1,
        n = 0;
    for (let t = 0; t < e; t++)
        for (let e = 1; e < i; e++) r[n++] = A[t * i + e] > A[t * i + e - 1];
    return new S(r)
}
const W = {};
async function Y(t, e = 8, A = 4) {
    let r = e * A,
        i = q.convert(await k.resizeImageAndGetData(t, r, r)),
        n = function(t) {
            let e, A, r;
            let i = Math.round(Math.sqrt(t.length)),
                n = function(t) {
                    if (t in W) return W[t];
                    let e = Math.PI / (2 * t),
                        A = {};
                    for (let r = 0; r < t; r++) {
                        let i = r * e;
                        for (let e = 0; e < t; e++) A[(r << 8) + e] = Math.cos((2 * e + 1) * i)
                    }
                    return W[t] = A, A
                }(i),
                a = Array(i * i);
            for (let o = 0; o < i; o++)
                for (let s = 0; s < i; s++) {
                    r = 0, e = o << 8, A = s << 8;
                    for (let a = 0; a < i; a++)
                        for (let o = 0; o < i; o++) r += t[a * i + o] * n[e + a] * n[A + o];
                    a[o * i + s] = r
                }
            return a
        }(i),
        a = new Float64Array(e * e),
        o = new Float64Array(e * e),
        s = 0,
        h = 0;
    for (let t = 0; t < e; t++) {
        for (let t = 0; t < e; t++) a[s] = n[h], o[s] = n[h], s += 1, h += 1;
        h += r - e
    }
    for (let t = 0; t < a.length; t++) a[t];
    let l = (o.sort((t, e) => t - e), o[Math.floor(o.length / 2)]),
        g = new Uint8ClampedArray(e * e);
    for (let t = 0; t < g.length; ++t) g[t] = a[t] > l;
    return new S(g)
}
const L = function(t) {
    let e = t.slice().reverse().map((t, e) => e % 2 == 0 ? t : -t);
    return {
        dec: {
            low: t.slice(),
            high: e.slice()
        },
        rec: {
            low: t.slice(),
            high: e.slice()
        }
    }
}([1 / Math.SQRT2, 1 / Math.SQRT2]);

function P(t) {
    if ("haar" === t) return L;
    throw Error("Invalid wavelet")
}

function N(t, e) {
    return t.reduce((t, A, r) => t + A * e[r], 0)
}

function T(t, e) {
    return t.map((t, A) => t + e[A])
}

function J(t, e, A) {
    let r = [],
        i = t.slice();
    for (let t = 0; t < A; t++) {
        let t = function(t, e) {
            let A = P(e),
                r = A.dec,
                i = r.low.length,
                n = [],
                a = [];
            for (let e = 0; e + i <= t.length; e += 2) {
                let A = t.slice(e, e + i);
                n.push(N(A, r.low)), a.push(N(A, r.high))
            }
            return [n, a]
        }(i, e);
        i = t[0], r.unshift(t[1].slice())
    }
    return r.unshift(i.slice()), r
}

function z(t, e) {
    e = P(e);
    let A = t[0];
    for (let r = 1; r < t.length; r++) {
        let i = t[r];
        A.length === i.length + 1 && (A = A.slice(0, A.length - 1)), A = function(t, e, A) {
            let r = A.rec,
                i = r.low.length,
                n = t.length,
                a = Array(i + (n - 1) * 2);
            a.fill(0);
            for (let A = 0; A < n; A++) {
                let n = 2 * A,
                    o = a.slice(n, n + i);
                o = T(o, function(t, e) {
                    return e.map(e => t * e)
                }(t[A], r.low)), o = T(o, function(t, e) {
                    return e.map(e => t * e)
                }(e[A], r.high)), a = a.slice(0, n).concat(o).concat(a.slice(n + o.length))
            }
            return a.slice(i - 2, a.length - (i - 2))
        }(A, i, e)
    }
    return A.slice()
}

function Z(t, e, A) {
    let r = Math.round(Math.sqrt(t.length)),
        i = Array(r);
    for (let e = 0; e < r; e++) {
        let A = Array(r);
        for (let i = 0; i < r; i++) A[i] = t[e * r + i];
        i[e] = A
    }
    let n = Array(r);
    for (let t = 0; t < r; t++) n[t] = Array(r);
    for (let t = 0; t < r; t++) {
        let e = J(i[t], "haar", A).flat();
        for (let A = 0; A < r; A++) n[A][t] = e[A]
    }
    let a = Array(r * r);
    for (let t = 0; t < r; t++) {
        let e = J(n[t], "haar", A).flat();
        for (let A = 0; A < r; A++) a[A * r + t] = e[A]
    }
    return a
}

function X(t, e) {
    let A = [],
        r = [],
        i = t.length;
    for (let t = 0; t < e; t++) r.unshift(i /= 2);
    r.unshift(i);
    let n = 0;
    for (let e = 0; e < r.length; e++) A.push(t.slice(n, n + r[e])), n += r[e];
    return A
}
async function K(t, e = 8, A = !0) {
    let r = 2 ** Math.floor(Math.log2(Math.min(t.naturalWidth, t.naturalHeight))),
        i = Math.max(r, e),
        n = Math.floor(Math.log2(i)),
        a = Math.floor(Math.log2(e)),
        o = n - a,
        s = q.convert(await k.resizeImageAndGetData(t, i, i)),
        h = Array(s.length);
    for (let t = 0; t < s.length; t++) h[t] = s[t] / 255;
    if (A) {
        let t = Z(h, "haar", n);
        t[0] = 0, h = function(t, e, A) {
            let r = Math.round(Math.sqrt(t.length)),
                i = Array(r);
            for (let e = 0; e < r; e++) {
                let A = Array(r);
                for (let i = 0; i < r; i++) A[i] = t[i * r + e];
                i[e] = A
            }
            let n = Array(r);
            for (let t = 0; t < r; t++) n[t] = Array(r);
            for (let t = 0; t < r; t++) {
                let e = z(X(i[t], A), "haar");
                for (let A = 0; A < r; A++) n[A][t] = e[A]
            }
            let a = Array(r * r);
            for (let t = 0; t < r; t++) {
                let e = z(X(n[t], A), "haar");
                for (let A = 0; A < r; A++) a[t * r + A] = e[A]
            }
            return a
        }(t, 0, n)
    }
    let l = Z(h, "haar", o),
        g = new Float64Array(e * e),
        u = new Float64Array(e * e),
        c = 0,
        f = 0;
    for (let t = 0; t < e; t++) {
        for (let t = 0; t < e; t++) g[f] = l[c], u[f] = l[c], c += 1, f += 1;
        c += i - e
    }
    let I = new Uint8ClampedArray(e * e),
        d = (u.sort((t, e) => t - e), u[Math.floor(u.length / 2)]);
    for (let t = 0; t < I.length; t++) I[t] = g[t] > d;
    return new S(I)
}
const V = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456],
    $ = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16];
class tt {
    r = 0;
    next = null
}
"use strict";

function te(t, e, A, r) {
    let i, n, a, o, s;
    let h = [],
        l = [];
    for (let A = 0; A < t.length; A++)
        if (t[A] === r && 0 === e[A]) {
            h.push(A), l.push(A), e[A] = 1;
            break
        } for (; l.length > 0;)(i = (s = l.pop()) - A) > 0 && t[i] === r && 0 === e[i] && (h.push(i), l.push(i), e[i] = 1), (n = s + A) < t.length && t[n] === r && 0 === e[n] && (h.push(n), l.push(n), e[n] = 1), a = s - 1, s % A != 0 && t[a] === r && 0 === e[a] && (h.push(a), l.push(a), e[a] = 1), (o = s + 1) % A != 0 && t[o] === r && 0 === e[o] && (h.push(o), l.push(o), e[o] = 1);
    return h
}
async function tA(t, e, A, r = 128, i = 500, n = 300) {
    void 0 === e && (e = O);
    let a = t.naturalWidth || t.width,
        o = t.naturalHeight || t.height;
    n = Math.min(a, o, n);
    let s = k.getImageCanvas(t),
        h = q.convert(await k.resizeImageAndGetData(s, n, n));
    ! function(t, e, A, r) {
        let i, n;
        let a = 2 * r + 1,
            o = e - 1,
            s = A - 1,
            h = r + 1,
            l = h * (h + 1) / 2,
            g = new tt,
            u = g;
        for (let t = 1; t < a; t++) u = u.next = new tt, t === h && (i = u);
        u.next = g;
        let c = null,
            f = null,
            I = V[r],
            d = $[r],
            m = 0,
            B = 0;
        for (let a = 0; a < A; a++) {
            let A = t[B],
                a = h * A,
                s = l * A;
            u = g;
            for (let t = 0; t < h; t++) u.r = A, u = u.next;
            let w = 0;
            for (let e = 1; e < h; e++) s += (u.r = A = t[B + (o < e ? o : e)]) * (h - e), w += A, u = u.next;
            c = g, f = i;
            for (let i = 0; i < e; i++) t[B] = s * I >> d, s -= a, a -= c.r, w += c.r = t[m + ((n = i + r + 1) < o ? n : o)], s += w, c = c.next, a += A = f.r, w -= A, f = f.next, B += 1;
            m += e
        }
        for (let a = 0; a < e; a++) {
            let o = t[B = a],
                u = h * o,
                m = l * o,
                w = g;
            for (let t = 0; t < h; t++) w.r = o, w = w.next;
            let p = 0;
            for (let A = 1, i = e; A <= r; A++) B = i + a, m += (w.r = o = t[B]) * (h - A), p += o, w = w.next, A < s && (i += e);
            B = a, c = g, f = i;
            for (let r = 0; r < A; r++) t[n = B] = m * I >> d, m -= u, u -= c.r, n = a + ((n = r + h) < s ? n : s) * e, m += p += c.r = t[n], c = c.next, u += o = f.r, p -= o, f = f.next, B += e
        }
    }(h, n, n, 4);
    let l = function(t, e, A, r) {
        let i = 0,
            n = new Uint8ClampedArray(t.length);
        for (let e = 0; e < t.length; e++) n[e] = t[e] > A, i += t[e] > A;
        let a = t.length - i,
            o = [],
            s = new Uint8ClampedArray(t.length),
            h = 0;
        for (; h < i;) {
            let t = te(n, s, e, 1);
            t.length > r && o.push(t), h += t.length
        }
        for (h = 0; h < a;) {
            let t = te(n, s, e, 0);
            t.length > r && o.push(t), h += t.length
        }
        return o
    }(h, n, r, i);
    A && l.sort((t, e) => e.length - t.length).splice(A);
    let g = a / n,
        u = o / n,
        c = [];
    for (let A = 0; A < l.length; A++) {
        let r = l[A].map(t => t % n),
            i = l[A].map(t => t / n),
            a = Math.min(...r),
            o = Math.min(...i),
            s = Math.max(...r) + 1 - a,
            h = Math.max(...i) + 1 - o,
            f = k.getImageCanvas(k.getImageCanvas(t), a * g, o * u, s * g, h * u);
        c.push(e(f))
    }
    let f = await Promise.all(c);
    return new F(f)
}
var ahash = j;
var dhash = O;
var phash = Y; 
var whash = K;
var cropResistantHash = tA;
var ImageHash = S;