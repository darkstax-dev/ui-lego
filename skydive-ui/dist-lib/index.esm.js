import * as Yr from "react";
import Ie from "react";
function Hr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Kt = { exports: {} }, Mt = {};
var fn;
function qr() {
  if (fn) return Mt;
  fn = 1;
  var t = Ie, e = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, l, u) {
    var h, d = {}, v = null, p = null;
    u !== void 0 && (v = "" + u), l.key !== void 0 && (v = "" + l.key), l.ref !== void 0 && (p = l.ref);
    for (h in l) r.call(l, h) && !s.hasOwnProperty(h) && (d[h] = l[h]);
    if (o && o.defaultProps) for (h in l = o.defaultProps, l) d[h] === void 0 && (d[h] = l[h]);
    return { $$typeof: e, type: o, key: v, ref: p, props: d, _owner: i.current };
  }
  return Mt.Fragment = n, Mt.jsx = a, Mt.jsxs = a, Mt;
}
var Lt = {};
var dn;
function Xr() {
  return dn || (dn = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Ie, e = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), a = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), l = /* @__PURE__ */ Symbol.for("react.forward_ref"), u = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.suspense_list"), d = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), E = Symbol.iterator, w = "@@iterator";
    function m(c) {
      if (c === null || typeof c != "object")
        return null;
      var b = E && c[E] || c[w];
      return typeof b == "function" ? b : null;
    }
    var k = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(c) {
      {
        for (var b = arguments.length, R = new Array(b > 1 ? b - 1 : 0), M = 1; M < b; M++)
          R[M - 1] = arguments[M];
        y("error", c, R);
      }
    }
    function y(c, b, R) {
      {
        var M = k.ReactDebugCurrentFrame, B = M.getStackAddendum();
        B !== "" && (b += "%s", R = R.concat([B]));
        var V = R.map(function(F) {
          return String(F);
        });
        V.unshift("Warning: " + b), Function.prototype.apply.call(console[c], console, V);
      }
    }
    var x = !1, S = !1, _ = !1, L = !1, O = !1, q;
    q = /* @__PURE__ */ Symbol.for("react.module.reference");
    function A(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === r || c === s || O || c === i || c === u || c === h || L || c === p || x || S || _ || typeof c == "object" && c !== null && (c.$$typeof === v || c.$$typeof === d || c.$$typeof === a || c.$$typeof === o || c.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === q || c.getModuleId !== void 0));
    }
    function nt(c, b, R) {
      var M = c.displayName;
      if (M)
        return M;
      var B = b.displayName || b.name || "";
      return B !== "" ? R + "(" + B + ")" : R;
    }
    function Z(c) {
      return c.displayName || "Context";
    }
    function st(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case s:
          return "Profiler";
        case i:
          return "StrictMode";
        case u:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case o:
            var b = c;
            return Z(b) + ".Consumer";
          case a:
            var R = c;
            return Z(R._context) + ".Provider";
          case l:
            return nt(c, c.render, "ForwardRef");
          case d:
            var M = c.displayName || null;
            return M !== null ? M : st(c.type) || "Memo";
          case v: {
            var B = c, V = B._payload, F = B._init;
            try {
              return st(F(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var g = Object.assign, C = 0, T, N, $, z, P, W, Y;
    function rt() {
    }
    rt.__reactDisabledLog = !0;
    function G() {
      {
        if (C === 0) {
          T = console.log, N = console.info, $ = console.warn, z = console.error, P = console.group, W = console.groupCollapsed, Y = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: rt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        C++;
      }
    }
    function it() {
      {
        if (C--, C === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: g({}, c, {
              value: T
            }),
            info: g({}, c, {
              value: N
            }),
            warn: g({}, c, {
              value: $
            }),
            error: g({}, c, {
              value: z
            }),
            group: g({}, c, {
              value: P
            }),
            groupCollapsed: g({}, c, {
              value: W
            }),
            groupEnd: g({}, c, {
              value: Y
            })
          });
        }
        C < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var at = k.ReactCurrentDispatcher, j;
    function Q(c, b, R) {
      {
        if (j === void 0)
          try {
            throw Error();
          } catch (B) {
            var M = B.stack.trim().match(/\n( *(at )?)/);
            j = M && M[1] || "";
          }
        return `
` + j + c;
      }
    }
    var yt = !1, Gt;
    {
      var yr = typeof WeakMap == "function" ? WeakMap : Map;
      Gt = new yr();
    }
    function Ke(c, b) {
      if (!c || yt)
        return "";
      {
        var R = Gt.get(c);
        if (R !== void 0)
          return R;
      }
      var M;
      yt = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = at.current, at.current = null, G();
      try {
        if (b) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (tt) {
              M = tt;
            }
            Reflect.construct(c, [], F);
          } else {
            try {
              F.call();
            } catch (tt) {
              M = tt;
            }
            c.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (tt) {
            M = tt;
          }
          c();
        }
      } catch (tt) {
        if (tt && M && typeof tt.stack == "string") {
          for (var I = tt.stack.split(`
`), K = M.stack.split(`
`), H = I.length - 1, X = K.length - 1; H >= 1 && X >= 0 && I[H] !== K[X]; )
            X--;
          for (; H >= 1 && X >= 0; H--, X--)
            if (I[H] !== K[X]) {
              if (H !== 1 || X !== 1)
                do
                  if (H--, X--, X < 0 || I[H] !== K[X]) {
                    var ot = `
` + I[H].replace(" at new ", " at ");
                    return c.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", c.displayName)), typeof c == "function" && Gt.set(c, ot), ot;
                  }
                while (H >= 1 && X >= 0);
              break;
            }
        }
      } finally {
        yt = !1, at.current = V, it(), Error.prepareStackTrace = B;
      }
      var St = c ? c.displayName || c.name : "", mt = St ? Q(St) : "";
      return typeof c == "function" && Gt.set(c, mt), mt;
    }
    function mr(c, b, R) {
      return Ke(c, !1);
    }
    function wr(c) {
      var b = c.prototype;
      return !!(b && b.isReactComponent);
    }
    function Ut(c, b, R) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return Ke(c, wr(c));
      if (typeof c == "string")
        return Q(c);
      switch (c) {
        case u:
          return Q("Suspense");
        case h:
          return Q("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case l:
            return mr(c.render);
          case d:
            return Ut(c.type, b, R);
          case v: {
            var M = c, B = M._payload, V = M._init;
            try {
              return Ut(V(B), b, R);
            } catch {
            }
          }
        }
      return "";
    }
    var Nt = Object.prototype.hasOwnProperty, Je = {}, Ze = k.ReactDebugCurrentFrame;
    function jt(c) {
      if (c) {
        var b = c._owner, R = Ut(c.type, c._source, b ? b.type : null);
        Ze.setExtraStackFrame(R);
      } else
        Ze.setExtraStackFrame(null);
    }
    function xr(c, b, R, M, B) {
      {
        var V = Function.call.bind(Nt);
        for (var F in c)
          if (V(c, F)) {
            var I = void 0;
            try {
              if (typeof c[F] != "function") {
                var K = Error((M || "React class") + ": " + R + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              I = c[F](b, F, M, R, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              I = H;
            }
            I && !(I instanceof Error) && (jt(B), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", M || "React class", R, F, typeof I), jt(null)), I instanceof Error && !(I.message in Je) && (Je[I.message] = !0, jt(B), f("Failed %s type: %s", R, I.message), jt(null));
          }
      }
    }
    var br = Array.isArray;
    function _e(c) {
      return br(c);
    }
    function kr(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, R = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return R;
      }
    }
    function Tr(c) {
      try {
        return Qe(c), !1;
      } catch {
        return !0;
      }
    }
    function Qe(c) {
      return "" + c;
    }
    function tn(c) {
      if (Tr(c))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kr(c)), Qe(c);
    }
    var en = k.ReactCurrentOwner, Er = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, nn, rn;
    function Sr(c) {
      if (Nt.call(c, "ref")) {
        var b = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Rr(c) {
      if (Nt.call(c, "key")) {
        var b = Object.getOwnPropertyDescriptor(c, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function Cr(c, b) {
      typeof c.ref == "string" && en.current;
    }
    function Ar(c, b) {
      {
        var R = function() {
          nn || (nn = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        R.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: R,
          configurable: !0
        });
      }
    }
    function Nr(c, b) {
      {
        var R = function() {
          rn || (rn = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
        };
        R.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: R,
          configurable: !0
        });
      }
    }
    var Mr = function(c, b, R, M, B, V, F) {
      var I = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: c,
        key: b,
        ref: R,
        props: F,
        // Record the component responsible for creating this element.
        _owner: V
      };
      return I._store = {}, Object.defineProperty(I._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(I, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.defineProperty(I, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    };
    function Lr(c, b, R, M, B) {
      {
        var V, F = {}, I = null, K = null;
        R !== void 0 && (tn(R), I = "" + R), Rr(b) && (tn(b.key), I = "" + b.key), Sr(b) && (K = b.ref, Cr(b, B));
        for (V in b)
          Nt.call(b, V) && !Er.hasOwnProperty(V) && (F[V] = b[V]);
        if (c && c.defaultProps) {
          var H = c.defaultProps;
          for (V in H)
            F[V] === void 0 && (F[V] = H[V]);
        }
        if (I || K) {
          var X = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          I && Ar(F, X), K && Nr(F, X);
        }
        return Mr(c, I, K, B, M, en.current, F);
      }
    }
    var ye = k.ReactCurrentOwner, an = k.ReactDebugCurrentFrame;
    function Et(c) {
      if (c) {
        var b = c._owner, R = Ut(c.type, c._source, b ? b.type : null);
        an.setExtraStackFrame(R);
      } else
        an.setExtraStackFrame(null);
    }
    var me;
    me = !1;
    function we(c) {
      return typeof c == "object" && c !== null && c.$$typeof === e;
    }
    function sn() {
      {
        if (ye.current) {
          var c = st(ye.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function $r(c) {
      return "";
    }
    var on = {};
    function Or(c) {
      {
        var b = sn();
        if (!b) {
          var R = typeof c == "string" ? c : c.displayName || c.name;
          R && (b = `

Check the top-level render call using <` + R + ">.");
        }
        return b;
      }
    }
    function ln(c, b) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var R = Or(b);
        if (on[R])
          return;
        on[R] = !0;
        var M = "";
        c && c._owner && c._owner !== ye.current && (M = " It was passed a child from " + st(c._owner.type) + "."), Et(c), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', R, M), Et(null);
      }
    }
    function un(c, b) {
      {
        if (typeof c != "object")
          return;
        if (_e(c))
          for (var R = 0; R < c.length; R++) {
            var M = c[R];
            we(M) && ln(M, b);
          }
        else if (we(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var B = m(c);
          if (typeof B == "function" && B !== c.entries)
            for (var V = B.call(c), F; !(F = V.next()).done; )
              we(F.value) && ln(F.value, b);
        }
      }
    }
    function zr(c) {
      {
        var b = c.type;
        if (b == null || typeof b == "string")
          return;
        var R;
        if (typeof b == "function")
          R = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === d))
          R = b.propTypes;
        else
          return;
        if (R) {
          var M = st(b);
          xr(R, c.props, "prop", M, c);
        } else if (b.PropTypes !== void 0 && !me) {
          me = !0;
          var B = st(b);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Pr(c) {
      {
        for (var b = Object.keys(c.props), R = 0; R < b.length; R++) {
          var M = b[R];
          if (M !== "children" && M !== "key") {
            Et(c), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", M), Et(null);
            break;
          }
        }
        c.ref !== null && (Et(c), f("Invalid attribute `ref` supplied to `React.Fragment`."), Et(null));
      }
    }
    var cn = {};
    function hn(c, b, R, M, B, V) {
      {
        var F = A(c);
        if (!F) {
          var I = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (I += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = $r();
          K ? I += K : I += sn();
          var H;
          c === null ? H = "null" : _e(c) ? H = "array" : c !== void 0 && c.$$typeof === e ? (H = "<" + (st(c.type) || "Unknown") + " />", I = " Did you accidentally export a JSX literal instead of a component?") : H = typeof c, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, I);
        }
        var X = Lr(c, b, R, B, V);
        if (X == null)
          return X;
        if (F) {
          var ot = b.children;
          if (ot !== void 0)
            if (M)
              if (_e(ot)) {
                for (var St = 0; St < ot.length; St++)
                  un(ot[St], c);
                Object.freeze && Object.freeze(ot);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              un(ot, c);
        }
        if (Nt.call(b, "key")) {
          var mt = st(c), tt = Object.keys(b).filter(function(Vr) {
            return Vr !== "key";
          }), xe = tt.length > 0 ? "{key: someKey, " + tt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!cn[mt + xe]) {
            var Wr = tt.length > 0 ? "{" + tt.join(": ..., ") + ": ...}" : "{}";
            f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, xe, mt, Wr, mt), cn[mt + xe] = !0;
          }
        }
        return c === r ? Pr(X) : zr(X), X;
      }
    }
    function Dr(c, b, R) {
      return hn(c, b, R, !0);
    }
    function Ir(c, b, R) {
      return hn(c, b, R, !1);
    }
    var Fr = Ir, Br = Dr;
    Lt.Fragment = r, Lt.jsx = Fr, Lt.jsxs = Br;
  })()), Lt;
}
var pn;
function Gr() {
  return pn || (pn = 1, process.env.NODE_ENV === "production" ? Kt.exports = qr() : Kt.exports = Xr()), Kt.exports;
}
var gn = Gr();
function Ur(t) {
  var e = 0, n = t.children, r = n && n.length;
  if (!r) e = 1;
  else for (; --r >= 0; ) e += n[r].value;
  t.value = e;
}
function jr() {
  return this.eachAfter(Ur);
}
function Kr(t, e) {
  let n = -1;
  for (const r of this)
    t.call(e, r, ++n, this);
  return this;
}
function Jr(t, e) {
  for (var n = this, r = [n], i, s, a = -1; n = r.pop(); )
    if (t.call(e, n, ++a, this), i = n.children)
      for (s = i.length - 1; s >= 0; --s)
        r.push(i[s]);
  return this;
}
function Zr(t, e) {
  for (var n = this, r = [n], i = [], s, a, o, l = -1; n = r.pop(); )
    if (i.push(n), s = n.children)
      for (a = 0, o = s.length; a < o; ++a)
        r.push(s[a]);
  for (; n = i.pop(); )
    t.call(e, n, ++l, this);
  return this;
}
function Qr(t, e) {
  let n = -1;
  for (const r of this)
    if (t.call(e, r, ++n, this))
      return r;
}
function ti(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0; ) n += r[i].value;
    e.value = n;
  });
}
function ei(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function ni(t) {
  for (var e = this, n = ri(e, t), r = [e]; e !== n; )
    e = e.parent, r.push(e);
  for (var i = r.length; t !== n; )
    r.splice(i, 0, t), t = t.parent;
  return r;
}
function ri(t, e) {
  if (t === e) return t;
  var n = t.ancestors(), r = e.ancestors(), i = null;
  for (t = n.pop(), e = r.pop(); t === e; )
    i = t, t = n.pop(), e = r.pop();
  return i;
}
function ii() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function ai() {
  return Array.from(this);
}
function si() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function oi() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* li() {
  var t = this, e, n = [t], r, i, s;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, r = t.children)
        for (i = 0, s = r.length; i < s; ++i)
          n.push(r[i]);
  while (n.length);
}
function Fe(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = hi)) : e === void 0 && (e = ci);
  for (var n = new se(t), r, i = [n], s, a, o, l; r = i.pop(); )
    if ((a = e(r.data)) && (l = (a = Array.from(a)).length))
      for (r.children = a, o = l - 1; o >= 0; --o)
        i.push(s = a[o] = new se(a[o])), s.parent = r, s.depth = r.depth + 1;
  return n.eachBefore(di);
}
function ui() {
  return Fe(this).eachBefore(fi);
}
function ci(t) {
  return t.children;
}
function hi(t) {
  return Array.isArray(t) ? t[1] : null;
}
function fi(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function di(t) {
  var e = 0;
  do
    t.height = e;
  while ((t = t.parent) && t.height < ++e);
}
function se(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
se.prototype = Fe.prototype = {
  constructor: se,
  count: jr,
  each: Kr,
  eachAfter: Zr,
  eachBefore: Jr,
  find: Qr,
  sum: ti,
  sort: ei,
  path: ni,
  ancestors: ii,
  descendants: ai,
  leaves: si,
  links: oi,
  copy: ui,
  [Symbol.iterator]: li
};
var Se = "http://www.w3.org/1999/xhtml";
const vn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Se,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pe(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), vn.hasOwnProperty(e) ? { space: vn[e], local: t } : t;
}
function pi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Se && e.documentElement.namespaceURI === Se ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function gi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Bn(t) {
  var e = pe(t);
  return (e.local ? gi : pi)(e);
}
function vi() {
}
function Be(t) {
  return t == null ? vi : function() {
    return this.querySelector(t);
  };
}
function _i(t) {
  typeof t != "function" && (t = Be(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = new Array(a), l, u, h = 0; h < a; ++h)
      (l = s[h]) && (u = t.call(l, l.__data__, h, s)) && ("__data__" in l && (u.__data__ = l.__data__), o[h] = u);
  return new J(r, this._parents);
}
function Wn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function yi() {
  return [];
}
function Vn(t) {
  return t == null ? yi : function() {
    return this.querySelectorAll(t);
  };
}
function mi(t) {
  return function() {
    return Wn(t.apply(this, arguments));
  };
}
function wi(t) {
  typeof t == "function" ? t = mi(t) : t = Vn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var a = e[s], o = a.length, l, u = 0; u < o; ++u)
      (l = a[u]) && (r.push(t.call(l, l.__data__, u, a)), i.push(l));
  return new J(r, i);
}
function Yn(t) {
  return function() {
    return this.matches(t);
  };
}
function Hn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var xi = Array.prototype.find;
function bi(t) {
  return function() {
    return xi.call(this.children, t);
  };
}
function ki() {
  return this.firstElementChild;
}
function Ti(t) {
  return this.select(t == null ? ki : bi(typeof t == "function" ? t : Hn(t)));
}
var Ei = Array.prototype.filter;
function Si() {
  return Array.from(this.children);
}
function Ri(t) {
  return function() {
    return Ei.call(this.children, t);
  };
}
function Ci(t) {
  return this.selectAll(t == null ? Si : Ri(typeof t == "function" ? t : Hn(t)));
}
function Ai(t) {
  typeof t != "function" && (t = Yn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && t.call(l, l.__data__, u, s) && o.push(l);
  return new J(r, this._parents);
}
function qn(t) {
  return new Array(t.length);
}
function Ni() {
  return new J(this._enter || this._groups.map(qn), this._parents);
}
function oe(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
oe.prototype = {
  constructor: oe,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Mi(t) {
  return function() {
    return t;
  };
}
function Li(t, e, n, r, i, s) {
  for (var a = 0, o, l = e.length, u = s.length; a < u; ++a)
    (o = e[a]) ? (o.__data__ = s[a], r[a] = o) : n[a] = new oe(t, s[a]);
  for (; a < l; ++a)
    (o = e[a]) && (i[a] = o);
}
function $i(t, e, n, r, i, s, a) {
  var o, l, u = /* @__PURE__ */ new Map(), h = e.length, d = s.length, v = new Array(h), p;
  for (o = 0; o < h; ++o)
    (l = e[o]) && (v[o] = p = a.call(l, l.__data__, o, e) + "", u.has(p) ? i[o] = l : u.set(p, l));
  for (o = 0; o < d; ++o)
    p = a.call(t, s[o], o, s) + "", (l = u.get(p)) ? (r[o] = l, l.__data__ = s[o], u.delete(p)) : n[o] = new oe(t, s[o]);
  for (o = 0; o < h; ++o)
    (l = e[o]) && u.get(v[o]) === l && (i[o] = l);
}
function Oi(t) {
  return t.__data__;
}
function zi(t, e) {
  if (!arguments.length) return Array.from(this, Oi);
  var n = e ? $i : Li, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Mi(t));
  for (var s = i.length, a = new Array(s), o = new Array(s), l = new Array(s), u = 0; u < s; ++u) {
    var h = r[u], d = i[u], v = d.length, p = Pi(t.call(h, h && h.__data__, u, r)), E = p.length, w = o[u] = new Array(E), m = a[u] = new Array(E), k = l[u] = new Array(v);
    n(h, d, w, m, k, p, e);
    for (var f = 0, y = 0, x, S; f < E; ++f)
      if (x = w[f]) {
        for (f >= y && (y = f + 1); !(S = m[y]) && ++y < E; ) ;
        x._next = S || null;
      }
  }
  return a = new J(a, r), a._enter = o, a._exit = l, a;
}
function Pi(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Di() {
  return new J(this._exit || this._groups.map(qn), this._parents);
}
function Ii(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Fi(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, a = Math.min(i, s), o = new Array(i), l = 0; l < a; ++l)
    for (var u = n[l], h = r[l], d = u.length, v = o[l] = new Array(d), p, E = 0; E < d; ++E)
      (p = u[E] || h[E]) && (v[E] = p);
  for (; l < i; ++l)
    o[l] = n[l];
  return new J(o, this._parents);
}
function Bi() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], a; --i >= 0; )
      (a = r[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Wi(t) {
  t || (t = Vi);
  function e(d, v) {
    return d && v ? t(d.__data__, v.__data__) : !d - !v;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var a = n[s], o = a.length, l = i[s] = new Array(o), u, h = 0; h < o; ++h)
      (u = a[h]) && (l[h] = u);
    l.sort(e);
  }
  return new J(i, this._parents).order();
}
function Vi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Yi() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Hi() {
  return Array.from(this);
}
function qi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function Xi() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Gi() {
  return !this.node();
}
function Ui(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && t.call(o, o.__data__, s, i);
  return this;
}
function ji(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ki(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ji(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Zi(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Qi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ta(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ea(t, e) {
  var n = pe(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ki : ji : typeof e == "function" ? n.local ? ta : Qi : n.local ? Zi : Ji)(n, e));
}
function Xn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function na(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ra(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ia(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function aa(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? na : typeof e == "function" ? ia : ra)(t, e, n ?? "")) : Ct(this.node(), t);
}
function Ct(t, e) {
  return t.style.getPropertyValue(e) || Xn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function sa(t) {
  return function() {
    delete this[t];
  };
}
function oa(t, e) {
  return function() {
    this[t] = e;
  };
}
function la(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ua(t, e) {
  return arguments.length > 1 ? this.each((e == null ? sa : typeof e == "function" ? la : oa)(t, e)) : this.node()[t];
}
function Gn(t) {
  return t.trim().split(/^|\s+/);
}
function We(t) {
  return t.classList || new Un(t);
}
function Un(t) {
  this._node = t, this._names = Gn(t.getAttribute("class") || "");
}
Un.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function jn(t, e) {
  for (var n = We(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Kn(t, e) {
  for (var n = We(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function ca(t) {
  return function() {
    jn(this, t);
  };
}
function ha(t) {
  return function() {
    Kn(this, t);
  };
}
function fa(t, e) {
  return function() {
    (e.apply(this, arguments) ? jn : Kn)(this, t);
  };
}
function da(t, e) {
  var n = Gn(t + "");
  if (arguments.length < 2) {
    for (var r = We(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? fa : e ? ca : ha)(n, e));
}
function pa() {
  this.textContent = "";
}
function ga(t) {
  return function() {
    this.textContent = t;
  };
}
function va(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function _a(t) {
  return arguments.length ? this.each(t == null ? pa : (typeof t == "function" ? va : ga)(t)) : this.node().textContent;
}
function ya() {
  this.innerHTML = "";
}
function ma(t) {
  return function() {
    this.innerHTML = t;
  };
}
function wa(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function xa(t) {
  return arguments.length ? this.each(t == null ? ya : (typeof t == "function" ? wa : ma)(t)) : this.node().innerHTML;
}
function ba() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ka() {
  return this.each(ba);
}
function Ta() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ea() {
  return this.each(Ta);
}
function Sa(t) {
  var e = typeof t == "function" ? t : Bn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ra() {
  return null;
}
function Ca(t, e) {
  var n = typeof t == "function" ? t : Bn(t), r = e == null ? Ra : typeof e == "function" ? e : Be(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Aa() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Na() {
  return this.each(Aa);
}
function Ma() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function La() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function $a(t) {
  return this.select(t ? La : Ma);
}
function Oa(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function za(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Pa(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Da(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Ia(t, e, n) {
  return function() {
    var r = this.__on, i, s = za(e);
    if (r) {
      for (var a = 0, o = r.length; a < o; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Fa(t, e, n) {
  var r = Pa(t + ""), i, s = r.length, a;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var l = 0, u = o.length, h; l < u; ++l)
        for (i = 0, h = o[l]; i < s; ++i)
          if ((a = r[i]).type === h.type && a.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? Ia : Da, i = 0; i < s; ++i) this.each(o(r[i], e, n));
  return this;
}
function Jn(t, e, n) {
  var r = Xn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Ba(t, e) {
  return function() {
    return Jn(this, t, e);
  };
}
function Wa(t, e) {
  return function() {
    return Jn(this, t, e.apply(this, arguments));
  };
}
function Va(t, e) {
  return this.each((typeof e == "function" ? Wa : Ba)(t, e));
}
function* Ya() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, a; i < s; ++i)
      (a = r[i]) && (yield a);
}
var Ve = [null];
function J(t, e) {
  this._groups = t, this._parents = e;
}
function qt() {
  return new J([[document.documentElement]], Ve);
}
function Ha() {
  return this;
}
J.prototype = qt.prototype = {
  constructor: J,
  select: _i,
  selectAll: wi,
  selectChild: Ti,
  selectChildren: Ci,
  filter: Ai,
  data: zi,
  enter: Ni,
  exit: Di,
  join: Ii,
  merge: Fi,
  selection: Ha,
  order: Bi,
  sort: Wi,
  call: Yi,
  nodes: Hi,
  node: qi,
  size: Xi,
  empty: Gi,
  each: Ui,
  attr: ea,
  style: aa,
  property: ua,
  classed: da,
  text: _a,
  html: xa,
  raise: ka,
  lower: Ea,
  append: Sa,
  insert: Ca,
  remove: Na,
  clone: $a,
  datum: Oa,
  on: Fa,
  dispatch: Va,
  [Symbol.iterator]: Ya
};
function D(t) {
  return typeof t == "string" ? new J([[document.querySelector(t)]], [document.documentElement]) : new J([[t]], Ve);
}
function qa(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function wt(t, e) {
  if (t = qa(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function $t(t) {
  return typeof t == "string" ? new J([document.querySelectorAll(t)], [document.documentElement]) : new J([Wn(t)], Ve);
}
function vt(t) {
  return function() {
    return t;
  };
}
const _n = 1e-12, Re = Math.PI, Ce = 2 * Re, xt = 1e-6, Xa = Ce - xt;
function Zn(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Ga(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Zn;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Ua {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Zn : Ga(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, s, a) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +s},${this._y1 = +a}`;
  }
  arcTo(e, n, r, i, s) {
    if (e = +e, n = +n, r = +r, i = +i, s = +s, s < 0) throw new Error(`negative radius: ${s}`);
    let a = this._x1, o = this._y1, l = r - e, u = i - n, h = a - e, d = o - n, v = h * h + d * d;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (v > xt) if (!(Math.abs(d * l - u * h) > xt) || !s)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = r - a, E = i - o, w = l * l + u * u, m = p * p + E * E, k = Math.sqrt(w), f = Math.sqrt(v), y = s * Math.tan((Re - Math.acos((w + v - m) / (2 * k * f))) / 2), x = y / f, S = y / k;
      Math.abs(x - 1) > xt && this._append`L${e + x * h},${n + x * d}`, this._append`A${s},${s},0,0,${+(d * p > h * E)},${this._x1 = e + S * l},${this._y1 = n + S * u}`;
    }
  }
  arc(e, n, r, i, s, a) {
    if (e = +e, n = +n, r = +r, a = !!a, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), l = r * Math.sin(i), u = e + o, h = n + l, d = 1 ^ a, v = a ? i - s : s - i;
    this._x1 === null ? this._append`M${u},${h}` : (Math.abs(this._x1 - u) > xt || Math.abs(this._y1 - h) > xt) && this._append`L${u},${h}`, r && (v < 0 && (v = v % Ce + Ce), v > Xa ? this._append`A${r},${r},0,1,${d},${e - o},${n - l}A${r},${r},0,1,${d},${this._x1 = u},${this._y1 = h}` : v > xt && this._append`A${r},${r},0,${+(v >= Re)},${d},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Qn(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new Ua(e);
}
var ja = Array.prototype.slice;
function Ka(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function tr(t) {
  this._context = t;
}
tr.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function Ja(t) {
  return new tr(t);
}
function er(t) {
  return t[0];
}
function nr(t) {
  return t[1];
}
function yn(t, e) {
  var n = vt(!0), r = null, i = Ja, s = null, a = Qn(o);
  t = typeof t == "function" ? t : t === void 0 ? er : vt(t), e = typeof e == "function" ? e : e === void 0 ? nr : vt(e);
  function o(l) {
    var u, h = (l = Ka(l)).length, d, v = !1, p;
    for (r == null && (s = i(p = a())), u = 0; u <= h; ++u)
      !(u < h && n(d = l[u], u, l)) === v && ((v = !v) ? s.lineStart() : s.lineEnd()), v && s.point(+t(d, u, l), +e(d, u, l));
    if (p) return s = null, p + "" || null;
  }
  return o.x = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : vt(+l), o) : t;
  }, o.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : vt(+l), o) : e;
  }, o.defined = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : vt(!!l), o) : n;
  }, o.curve = function(l) {
    return arguments.length ? (i = l, r != null && (s = i(r)), o) : i;
  }, o.context = function(l) {
    return arguments.length ? (l == null ? r = s = null : s = i(r = l), o) : r;
  }, o;
}
class Za {
  constructor(e, n) {
    this._context = e, this._x = n;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(e, n) {
    switch (e = +e, n = +n, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, n) : this._context.moveTo(e, n);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, n, e, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, e, this._y0, e, n);
        break;
      }
    }
    this._x0 = e, this._y0 = n;
  }
}
function Qa(t) {
  return new Za(t, !1);
}
function ts(t) {
  return t.source;
}
function es(t) {
  return t.target;
}
function ns(t) {
  let e = ts, n = es, r = er, i = nr, s = null, a = null, o = Qn(l);
  function l() {
    let u;
    const h = ja.call(arguments), d = e.apply(this, h), v = n.apply(this, h);
    if (s == null && (a = t(u = o())), a.lineStart(), h[0] = d, a.point(+r.apply(this, h), +i.apply(this, h)), h[0] = v, a.point(+r.apply(this, h), +i.apply(this, h)), a.lineEnd(), u) return a = null, u + "" || null;
  }
  return l.source = function(u) {
    return arguments.length ? (e = u, l) : e;
  }, l.target = function(u) {
    return arguments.length ? (n = u, l) : n;
  }, l.x = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : vt(+u), l) : r;
  }, l.y = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : vt(+u), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? s = a = null : a = t(s = u), l) : s;
  }, l;
}
function mn() {
  return ns(Qa);
}
function wn() {
}
function Ae(t, e, n) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - n),
    t._x2,
    t._y2
  );
}
function Ye(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
Ye.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        Ae(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2, this._x1 = t, this._y1 = e;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        Ae(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
(function t(e) {
  function n(r) {
    return new Ye(r, e);
  }
  return n.tension = function(r) {
    return t(+r);
  }, n;
})(0);
function rr(t, e) {
  this._context = t, this._k = (1 - e) / 6;
}
rr.prototype = {
  areaStart: wn,
  areaEnd: wn,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._x3 = t, this._y3 = e;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
        break;
      case 2:
        this._point = 3, this._x5 = t, this._y5 = e;
        break;
      default:
        Ae(this, t, e);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const rs = (function t(e) {
  function n(r) {
    return new rr(r, e);
  }
  return n.tension = function(r) {
    return t(+r);
  }, n;
})(0);
function is(t, e, n) {
  var r = t._x1, i = t._y1, s = t._x2, a = t._y2;
  if (t._l01_a > _n) {
    var o = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    r = (r * o - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, i = (i * o - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l;
  }
  if (t._l23_a > _n) {
    var u = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, h = 3 * t._l23_a * (t._l23_a + t._l12_a);
    s = (s * u + t._x1 * t._l23_2a - e * t._l12_2a) / h, a = (a * u + t._y1 * t._l23_2a - n * t._l12_2a) / h;
  }
  t._context.bezierCurveTo(r, i, s, a, t._x2, t._y2);
}
function ir(t, e) {
  this._context = t, this._alpha = e;
}
ir.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    if (t = +t, e = +e, this._point) {
      var n = this._x2 - t, r = this._y2 - e;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        is(this, t, e);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
  }
};
const as = (function t(e) {
  function n(r) {
    return e ? new ir(r, e) : new Ye(r, 0);
  }
  return n.alpha = function(r) {
    return t(+r);
  }, n;
})(0.5);
var ss = { value: function() {
} };
function He() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new ne(n);
}
function ne(t) {
  this._ = t;
}
function os(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
ne.prototype = He.prototype = {
  constructor: ne,
  on: function(t, e) {
    var n = this._, r = os(t + "", n), i, s = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (t = r[s]).type) && (i = ls(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < a; )
      if (i = (t = r[s]).type) n[i] = xn(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = xn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ne(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  }
};
function ls(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function xn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ss, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var At = 0, It = 0, Ot = 0, ar = 1e3, le, Ft, ue = 0, Tt = 0, ge = 0, Wt = typeof performance == "object" && performance.now ? performance : Date, sr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function qe() {
  return Tt || (sr(us), Tt = Wt.now() + ge);
}
function us() {
  Tt = 0;
}
function ce() {
  this._call = this._time = this._next = null;
}
ce.prototype = or.prototype = {
  constructor: ce,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? qe() : +n) + (e == null ? 0 : +e), !this._next && Ft !== this && (Ft ? Ft._next = this : le = this, Ft = this), this._call = t, this._time = n, Ne();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ne());
  }
};
function or(t, e, n) {
  var r = new ce();
  return r.restart(t, e, n), r;
}
function cs() {
  qe(), ++At;
  for (var t = le, e; t; )
    (e = Tt - t._time) >= 0 && t._call.call(null, e), t = t._next;
  --At;
}
function bn() {
  Tt = (ue = Wt.now()) + ge, At = It = 0;
  try {
    cs();
  } finally {
    At = 0, fs(), Tt = 0;
  }
}
function hs() {
  var t = Wt.now(), e = t - ue;
  e > ar && (ge -= e, ue = t);
}
function fs() {
  for (var t, e = le, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : le = n);
  Ft = t, Ne(r);
}
function Ne(t) {
  if (!At) {
    It && (It = clearTimeout(It));
    var e = t - Tt;
    e > 24 ? (t < 1 / 0 && (It = setTimeout(bn, t - Wt.now() - ge)), Ot && (Ot = clearInterval(Ot))) : (Ot || (ue = Wt.now(), Ot = setInterval(hs, ar)), At = 1, sr(bn));
  }
}
function kn(t, e, n) {
  var r = new ce();
  return e = e == null ? 0 : +e, r.restart(function(i) {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ds = He("start", "end", "cancel", "interrupt"), ps = [], lr = 0, Tn = 1, Me = 2, re = 3, En = 4, Le = 5, ie = 6;
function ve(t, e, n, r, i, s) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  gs(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ds,
    tween: ps,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: lr
  });
}
function Xe(t, e) {
  var n = ut(t, e);
  if (n.state > lr) throw new Error("too late; already scheduled");
  return n;
}
function ft(t, e) {
  var n = ut(t, e);
  if (n.state > re) throw new Error("too late; already running");
  return n;
}
function ut(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function gs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = or(s, 0, n.time);
  function s(u) {
    n.state = Tn, n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
  }
  function a(u) {
    var h, d, v, p;
    if (n.state !== Tn) return l();
    for (h in r)
      if (p = r[h], p.name === n.name) {
        if (p.state === re) return kn(a);
        p.state === En ? (p.state = ie, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[h]) : +h < e && (p.state = ie, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[h]);
      }
    if (kn(function() {
      n.state === re && (n.state = En, n.timer.restart(o, n.delay, n.time), o(u));
    }), n.state = Me, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Me) {
      for (n.state = re, i = new Array(v = n.tween.length), h = 0, d = -1; h < v; ++h)
        (p = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = p);
      i.length = d + 1;
    }
  }
  function o(u) {
    for (var h = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(l), n.state = Le, 1), d = -1, v = i.length; ++d < v; )
      i[d].call(t, h);
    n.state === Le && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = ie, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function ae(t, e) {
  var n = t.__transition, r, i, s = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > Me && r.state < Le, r.state = ie, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    s && delete t.__transition;
  }
}
function vs(t) {
  return this.each(function() {
    ae(this, t);
  });
}
function Ge(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function ur(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Xt() {
}
var Vt = 0.7, he = 1 / Vt, Rt = "\\s*([+-]?\\d+)\\s*", Yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _s = /^#([0-9a-f]{3,8})$/, ys = new RegExp(`^rgb\\(${Rt},${Rt},${Rt}\\)$`), ms = new RegExp(`^rgb\\(${ht},${ht},${ht}\\)$`), ws = new RegExp(`^rgba\\(${Rt},${Rt},${Rt},${Yt}\\)$`), xs = new RegExp(`^rgba\\(${ht},${ht},${ht},${Yt}\\)$`), bs = new RegExp(`^hsl\\(${Yt},${ht},${ht}\\)$`), ks = new RegExp(`^hsla\\(${Yt},${ht},${ht},${Yt}\\)$`), Sn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ge(Xt, Ht, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Rn,
  // Deprecated! Use color.formatHex.
  formatHex: Rn,
  formatHex8: Ts,
  formatHsl: Es,
  formatRgb: Cn,
  toString: Cn
});
function Rn() {
  return this.rgb().formatHex();
}
function Ts() {
  return this.rgb().formatHex8();
}
function Es() {
  return cr(this).formatHsl();
}
function Cn() {
  return this.rgb().formatRgb();
}
function Ht(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = _s.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? An(e) : n === 3 ? new et(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Jt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Jt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ys.exec(t)) ? new et(e[1], e[2], e[3], 1) : (e = ms.exec(t)) ? new et(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ws.exec(t)) ? Jt(e[1], e[2], e[3], e[4]) : (e = xs.exec(t)) ? Jt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = bs.exec(t)) ? Ln(e[1], e[2] / 100, e[3] / 100, 1) : (e = ks.exec(t)) ? Ln(e[1], e[2] / 100, e[3] / 100, e[4]) : Sn.hasOwnProperty(t) ? An(Sn[t]) : t === "transparent" ? new et(NaN, NaN, NaN, 0) : null;
}
function An(t) {
  return new et(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Jt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new et(t, e, n, r);
}
function Ss(t) {
  return t instanceof Xt || (t = Ht(t)), t ? (t = t.rgb(), new et(t.r, t.g, t.b, t.opacity)) : new et();
}
function $e(t, e, n, r) {
  return arguments.length === 1 ? Ss(t) : new et(t, e, n, r ?? 1);
}
function et(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Ge(et, $e, ur(Xt, {
  brighter(t) {
    return t = t == null ? he : Math.pow(he, t), new et(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Vt : Math.pow(Vt, t), new et(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new et(kt(this.r), kt(this.g), kt(this.b), fe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Nn,
  // Deprecated! Use color.formatHex.
  formatHex: Nn,
  formatHex8: Rs,
  formatRgb: Mn,
  toString: Mn
}));
function Nn() {
  return `#${bt(this.r)}${bt(this.g)}${bt(this.b)}`;
}
function Rs() {
  return `#${bt(this.r)}${bt(this.g)}${bt(this.b)}${bt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mn() {
  const t = fe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${kt(this.r)}, ${kt(this.g)}, ${kt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function fe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function kt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function bt(t) {
  return t = kt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ln(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new lt(t, e, n, r);
}
function cr(t) {
  if (t instanceof lt) return new lt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Xt || (t = Ht(t)), !t) return new lt();
  if (t instanceof lt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), a = NaN, o = s - i, l = (s + i) / 2;
  return o ? (e === s ? a = (n - r) / o + (n < r) * 6 : n === s ? a = (r - e) / o + 2 : a = (e - n) / o + 4, o /= l < 0.5 ? s + i : 2 - s - i, a *= 60) : o = l > 0 && l < 1 ? 0 : a, new lt(a, o, l, t.opacity);
}
function Cs(t, e, n, r) {
  return arguments.length === 1 ? cr(t) : new lt(t, e, n, r ?? 1);
}
function lt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Ge(lt, Cs, ur(Xt, {
  brighter(t) {
    return t = t == null ? he : Math.pow(he, t), new lt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Vt : Math.pow(Vt, t), new lt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new et(
      be(t >= 240 ? t - 240 : t + 120, i, r),
      be(t, i, r),
      be(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new lt($n(this.h), Zt(this.s), Zt(this.l), fe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = fe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${$n(this.h)}, ${Zt(this.s) * 100}%, ${Zt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function $n(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Zt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function be(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const hr = (t) => () => t;
function As(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ns(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ms(t) {
  return (t = +t) == 1 ? fr : function(e, n) {
    return n - e ? Ns(e, n, t) : hr(isNaN(e) ? n : e);
  };
}
function fr(t, e) {
  var n = e - t;
  return n ? As(t, n) : hr(isNaN(t) ? e : t);
}
const On = (function t(e) {
  var n = Ms(e);
  function r(i, s) {
    var a = n((i = $e(i)).r, (s = $e(s)).r), o = n(i.g, s.g), l = n(i.b, s.b), u = fr(i.opacity, s.opacity);
    return function(h) {
      return i.r = a(h), i.g = o(h), i.b = l(h), i.opacity = u(h), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function _t(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Oe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ke = new RegExp(Oe.source, "g");
function Ls(t) {
  return function() {
    return t;
  };
}
function $s(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Os(t, e) {
  var n = Oe.lastIndex = ke.lastIndex = 0, r, i, s, a = -1, o = [], l = [];
  for (t = t + "", e = e + ""; (r = Oe.exec(t)) && (i = ke.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), o[a] ? o[a] += s : o[++a] = s), (r = r[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, l.push({ i: a, x: _t(r, i) })), n = ke.lastIndex;
  return n < e.length && (s = e.slice(n), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? l[0] ? $s(l[0].x) : Ls(e) : (e = l.length, function(u) {
    for (var h = 0, d; h < e; ++h) o[(d = l[h]).i] = d.x(u);
    return o.join("");
  });
}
var zn = 180 / Math.PI, ze = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function dr(t, e, n, r, i, s) {
  var a, o, l;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (l = t * n + e * r) && (n -= t * l, r -= e * l), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, l /= o), t * r < e * n && (t = -t, e = -e, l = -l, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * zn,
    skewX: Math.atan(l) * zn,
    scaleX: a,
    scaleY: o
  };
}
var Qt;
function zs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ze : dr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ps(t) {
  return t == null || (Qt || (Qt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Qt.setAttribute("transform", t), !(t = Qt.transform.baseVal.consolidate())) ? ze : (t = t.matrix, dr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function pr(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, h, d, v, p, E) {
    if (u !== d || h !== v) {
      var w = p.push("translate(", null, e, null, n);
      E.push({ i: w - 4, x: _t(u, d) }, { i: w - 2, x: _t(h, v) });
    } else (d || v) && p.push("translate(" + d + e + v + n);
  }
  function a(u, h, d, v) {
    u !== h ? (u - h > 180 ? h += 360 : h - u > 180 && (u += 360), v.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: _t(u, h) })) : h && d.push(i(d) + "rotate(" + h + r);
  }
  function o(u, h, d, v) {
    u !== h ? v.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: _t(u, h) }) : h && d.push(i(d) + "skewX(" + h + r);
  }
  function l(u, h, d, v, p, E) {
    if (u !== d || h !== v) {
      var w = p.push(i(p) + "scale(", null, ",", null, ")");
      E.push({ i: w - 4, x: _t(u, d) }, { i: w - 2, x: _t(h, v) });
    } else (d !== 1 || v !== 1) && p.push(i(p) + "scale(" + d + "," + v + ")");
  }
  return function(u, h) {
    var d = [], v = [];
    return u = t(u), h = t(h), s(u.translateX, u.translateY, h.translateX, h.translateY, d, v), a(u.rotate, h.rotate, d, v), o(u.skewX, h.skewX, d, v), l(u.scaleX, u.scaleY, h.scaleX, h.scaleY, d, v), u = h = null, function(p) {
      for (var E = -1, w = v.length, m; ++E < w; ) d[(m = v[E]).i] = m.x(p);
      return d.join("");
    };
  };
}
var Ds = pr(zs, "px, ", "px)", "deg)"), Is = pr(Ps, ", ", ")", ")"), Fs = 1e-12;
function Pn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Bs(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ws(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Vs = (function t(e, n, r) {
  function i(s, a) {
    var o = s[0], l = s[1], u = s[2], h = a[0], d = a[1], v = a[2], p = h - o, E = d - l, w = p * p + E * E, m, k;
    if (w < Fs)
      k = Math.log(v / u) / e, m = function(L) {
        return [
          o + L * p,
          l + L * E,
          u * Math.exp(e * L * k)
        ];
      };
    else {
      var f = Math.sqrt(w), y = (v * v - u * u + r * w) / (2 * u * n * f), x = (v * v - u * u - r * w) / (2 * v * n * f), S = Math.log(Math.sqrt(y * y + 1) - y), _ = Math.log(Math.sqrt(x * x + 1) - x);
      k = (_ - S) / e, m = function(L) {
        var O = L * k, q = Pn(S), A = u / (n * f) * (q * Ws(e * O + S) - Bs(S));
        return [
          o + A * p,
          l + A * E,
          u * q / Pn(e * O + S)
        ];
      };
    }
    return m.duration = k * 1e3 * e / Math.SQRT2, m;
  }
  return i.rho = function(s) {
    var a = Math.max(1e-3, +s), o = a * a, l = o * o;
    return t(a, o, l);
  }, i;
})(Math.SQRT2, 2, 4);
function Ys(t, e) {
  var n, r;
  return function() {
    var i = ft(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var a = 0, o = r.length; a < o; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Hs(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = ft(this, t), a = s.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var o = { name: e, value: n }, l = 0, u = i.length; l < u; ++l)
        if (i[l].name === e) {
          i[l] = o;
          break;
        }
      l === u && i.push(o);
    }
    s.tween = i;
  };
}
function qs(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = ut(this.node(), n).tween, i = 0, s = r.length, a; i < s; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Ys : Hs)(n, t, e));
}
function Ue(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ft(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return ut(i, r).value[e];
  };
}
function gr(t, e) {
  var n;
  return (typeof e == "number" ? _t : e instanceof Ht ? On : (n = Ht(e)) ? (e = n, On) : Os)(t, e);
}
function Xs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Gs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Us(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function js(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function Ks(t, e, n) {
  var r, i, s;
  return function() {
    var a, o = n(this), l;
    return o == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), l = o + "", a === l ? null : a === r && l === i ? s : (i = l, s = e(r = a, o)));
  };
}
function Js(t, e, n) {
  var r, i, s;
  return function() {
    var a, o = n(this), l;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), l = o + "", a === l ? null : a === r && l === i ? s : (i = l, s = e(r = a, o)));
  };
}
function Zs(t, e) {
  var n = pe(t), r = n === "transform" ? Is : gr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Js : Ks)(n, r, Ue(this, "attr." + t, e)) : e == null ? (n.local ? Gs : Xs)(n) : (n.local ? js : Us)(n, r, e));
}
function Qs(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function to(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function eo(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && to(t, s)), n;
  }
  return i._value = e, i;
}
function no(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Qs(t, s)), n;
  }
  return i._value = e, i;
}
function ro(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = pe(t);
  return this.tween(n, (r.local ? eo : no)(r, e));
}
function io(t, e) {
  return function() {
    Xe(this, t).delay = +e.apply(this, arguments);
  };
}
function ao(t, e) {
  return e = +e, function() {
    Xe(this, t).delay = e;
  };
}
function so(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? io : ao)(e, t)) : ut(this.node(), e).delay;
}
function oo(t, e) {
  return function() {
    ft(this, t).duration = +e.apply(this, arguments);
  };
}
function lo(t, e) {
  return e = +e, function() {
    ft(this, t).duration = e;
  };
}
function uo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? oo : lo)(e, t)) : ut(this.node(), e).duration;
}
function co(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ft(this, t).ease = e;
  };
}
function ho(t) {
  var e = this._id;
  return arguments.length ? this.each(co(e, t)) : ut(this.node(), e).ease;
}
function fo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ft(this, t).ease = n;
  };
}
function po(t) {
  if (typeof t != "function") throw new Error();
  return this.each(fo(this._id, t));
}
function go(t) {
  typeof t != "function" && (t = Yn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && t.call(l, l.__data__, u, s) && o.push(l);
  return new gt(r, this._parents, this._name, this._id);
}
function vo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), a = new Array(r), o = 0; o < s; ++o)
    for (var l = e[o], u = n[o], h = l.length, d = a[o] = new Array(h), v, p = 0; p < h; ++p)
      (v = l[p] || u[p]) && (d[p] = v);
  for (; o < r; ++o)
    a[o] = e[o];
  return new gt(a, this._parents, this._name, this._id);
}
function _o(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function yo(t, e, n) {
  var r, i, s = _o(e) ? Xe : ft;
  return function() {
    var a = s(this, t), o = a.on;
    o !== r && (i = (r = o).copy()).on(e, n), a.on = i;
  };
}
function mo(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ut(this.node(), n).on.on(t) : this.each(yo(n, t, e));
}
function wo(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function xo() {
  return this.on("end.remove", wo(this._id));
}
function bo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Be(t));
  for (var r = this._groups, i = r.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = r[a], l = o.length, u = s[a] = new Array(l), h, d, v = 0; v < l; ++v)
      (h = o[v]) && (d = t.call(h, h.__data__, v, o)) && ("__data__" in h && (d.__data__ = h.__data__), u[v] = d, ve(u[v], e, n, v, u, ut(h, n)));
  return new gt(s, this._parents, e, n);
}
function ko(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Vn(t));
  for (var r = this._groups, i = r.length, s = [], a = [], o = 0; o < i; ++o)
    for (var l = r[o], u = l.length, h, d = 0; d < u; ++d)
      if (h = l[d]) {
        for (var v = t.call(h, h.__data__, d, l), p, E = ut(h, n), w = 0, m = v.length; w < m; ++w)
          (p = v[w]) && ve(p, e, n, w, v, E);
        s.push(v), a.push(h);
      }
  return new gt(s, a, e, n);
}
var To = qt.prototype.constructor;
function Eo() {
  return new To(this._groups, this._parents);
}
function So(t, e) {
  var n, r, i;
  return function() {
    var s = Ct(this, t), a = (this.style.removeProperty(t), Ct(this, t));
    return s === a ? null : s === n && a === r ? i : i = e(n = s, r = a);
  };
}
function vr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ro(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = Ct(this, t);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function Co(t, e, n) {
  var r, i, s;
  return function() {
    var a = Ct(this, t), o = n(this), l = o + "";
    return o == null && (l = o = (this.style.removeProperty(t), Ct(this, t))), a === l ? null : a === r && l === i ? s : (i = l, s = e(r = a, o));
  };
}
function Ao(t, e) {
  var n, r, i, s = "style." + e, a = "end." + s, o;
  return function() {
    var l = ft(this, t), u = l.on, h = l.value[s] == null ? o || (o = vr(e)) : void 0;
    (u !== n || i !== h) && (r = (n = u).copy()).on(a, i = h), l.on = r;
  };
}
function No(t, e, n) {
  var r = (t += "") == "transform" ? Ds : gr;
  return e == null ? this.styleTween(t, So(t, r)).on("end.style." + t, vr(t)) : typeof e == "function" ? this.styleTween(t, Co(t, r, Ue(this, "style." + t, e))).each(Ao(this._id, t)) : this.styleTween(t, Ro(t, r, e), n).on("end.style." + t, null);
}
function Mo(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Lo(t, e, n) {
  var r, i;
  function s() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && Mo(t, a, n)), r;
  }
  return s._value = e, s;
}
function $o(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Lo(t, e, n ?? ""));
}
function Oo(t) {
  return function() {
    this.textContent = t;
  };
}
function zo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Po(t) {
  return this.tween("text", typeof t == "function" ? zo(Ue(this, "text", t)) : Oo(t == null ? "" : t + ""));
}
function Do(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Io(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Do(i)), e;
  }
  return r._value = t, r;
}
function Fo(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Io(t));
}
function Bo() {
  for (var t = this._name, e = this._id, n = _r(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, l, u = 0; u < o; ++u)
      if (l = a[u]) {
        var h = ut(l, e);
        ve(l, t, n, u, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new gt(r, this._parents, t, n);
}
function Wo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, a) {
    var o = { value: a }, l = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var u = ft(this, r), h = u.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(l)), u.on = e;
    }), i === 0 && s();
  });
}
var Vo = 0;
function gt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function _r() {
  return ++Vo;
}
var dt = qt.prototype;
gt.prototype = {
  constructor: gt,
  select: bo,
  selectAll: ko,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: go,
  merge: vo,
  selection: Eo,
  transition: Bo,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: mo,
  attr: Zs,
  attrTween: ro,
  style: No,
  styleTween: $o,
  text: Po,
  textTween: Fo,
  remove: xo,
  tween: qs,
  delay: so,
  duration: uo,
  ease: ho,
  easeVarying: po,
  end: Wo,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function Yo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ho = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Yo
};
function qo(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Xo(t) {
  var e, n;
  t instanceof gt ? (e = t._id, t = t._name) : (e = _r(), (n = Ho).time = qe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, l, u = 0; u < o; ++u)
      (l = a[u]) && ve(l, t, e, u, a, n || qo(l, e));
  return new gt(r, this._parents, t, e);
}
qt.prototype.interrupt = vs;
qt.prototype.transition = Xo;
const Pe = { capture: !0, passive: !1 };
function De(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Go(t) {
  var e = t.document.documentElement, n = D(t).on("dragstart.drag", De, Pe);
  "onselectstart" in e ? n.on("selectstart.drag", De, Pe) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Uo(t, e) {
  var n = t.document.documentElement, r = D(t).on("dragstart.drag", null);
  e && (r.on("click.drag", De, Pe), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const te = (t) => () => t;
function jo(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function pt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
pt.prototype = {
  constructor: pt,
  scale: function(t) {
    return t === 1 ? this : new pt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new pt(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var de = new pt(1, 0, 0);
pt.prototype;
function Te(t) {
  t.stopImmediatePropagation();
}
function zt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ko(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Jo() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Dn() {
  return this.__zoom || de;
}
function Zo(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Qo() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tl(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], a = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function el() {
  var t = Ko, e = Jo, n = tl, r = Zo, i = Qo, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, l = Vs, u = He("start", "zoom", "end"), h, d, v, p = 500, E = 150, w = 0, m = 10;
  function k(g) {
    g.property("__zoom", Dn).on("wheel.zoom", O, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", A).filter(i).on("touchstart.zoom", nt).on("touchmove.zoom", Z).on("touchend.zoom touchcancel.zoom", st).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  k.transform = function(g, C, T, N) {
    var $ = g.selection ? g.selection() : g;
    $.property("__zoom", Dn), g !== $ ? S(g, C, T, N) : $.interrupt().each(function() {
      _(this, arguments).event(N).start().zoom(null, typeof C == "function" ? C.apply(this, arguments) : C).end();
    });
  }, k.scaleBy = function(g, C, T, N) {
    k.scaleTo(g, function() {
      var $ = this.__zoom.k, z = typeof C == "function" ? C.apply(this, arguments) : C;
      return $ * z;
    }, T, N);
  }, k.scaleTo = function(g, C, T, N) {
    k.transform(g, function() {
      var $ = e.apply(this, arguments), z = this.__zoom, P = T == null ? x($) : typeof T == "function" ? T.apply(this, arguments) : T, W = z.invert(P), Y = typeof C == "function" ? C.apply(this, arguments) : C;
      return n(y(f(z, Y), P, W), $, a);
    }, T, N);
  }, k.translateBy = function(g, C, T, N) {
    k.transform(g, function() {
      return n(this.__zoom.translate(
        typeof C == "function" ? C.apply(this, arguments) : C,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), e.apply(this, arguments), a);
    }, null, N);
  }, k.translateTo = function(g, C, T, N, $) {
    k.transform(g, function() {
      var z = e.apply(this, arguments), P = this.__zoom, W = N == null ? x(z) : typeof N == "function" ? N.apply(this, arguments) : N;
      return n(de.translate(W[0], W[1]).scale(P.k).translate(
        typeof C == "function" ? -C.apply(this, arguments) : -C,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), z, a);
    }, N, $);
  };
  function f(g, C) {
    return C = Math.max(s[0], Math.min(s[1], C)), C === g.k ? g : new pt(C, g.x, g.y);
  }
  function y(g, C, T) {
    var N = C[0] - T[0] * g.k, $ = C[1] - T[1] * g.k;
    return N === g.x && $ === g.y ? g : new pt(g.k, N, $);
  }
  function x(g) {
    return [(+g[0][0] + +g[1][0]) / 2, (+g[0][1] + +g[1][1]) / 2];
  }
  function S(g, C, T, N) {
    g.on("start.zoom", function() {
      _(this, arguments).event(N).start();
    }).on("interrupt.zoom end.zoom", function() {
      _(this, arguments).event(N).end();
    }).tween("zoom", function() {
      var $ = this, z = arguments, P = _($, z).event(N), W = e.apply($, z), Y = T == null ? x(W) : typeof T == "function" ? T.apply($, z) : T, rt = Math.max(W[1][0] - W[0][0], W[1][1] - W[0][1]), G = $.__zoom, it = typeof C == "function" ? C.apply($, z) : C, at = l(G.invert(Y).concat(rt / G.k), it.invert(Y).concat(rt / it.k));
      return function(j) {
        if (j === 1) j = it;
        else {
          var Q = at(j), yt = rt / Q[2];
          j = new pt(yt, Y[0] - Q[0] * yt, Y[1] - Q[1] * yt);
        }
        P.zoom(null, j);
      };
    });
  }
  function _(g, C, T) {
    return !T && g.__zooming || new L(g, C);
  }
  function L(g, C) {
    this.that = g, this.args = C, this.active = 0, this.sourceEvent = null, this.extent = e.apply(g, C), this.taps = 0;
  }
  L.prototype = {
    event: function(g) {
      return g && (this.sourceEvent = g), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(g, C) {
      return this.mouse && g !== "mouse" && (this.mouse[1] = C.invert(this.mouse[0])), this.touch0 && g !== "touch" && (this.touch0[1] = C.invert(this.touch0[0])), this.touch1 && g !== "touch" && (this.touch1[1] = C.invert(this.touch1[0])), this.that.__zoom = C, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(g) {
      var C = D(this.that).datum();
      u.call(
        g,
        this.that,
        new jo(g, {
          sourceEvent: this.sourceEvent,
          target: k,
          transform: this.that.__zoom,
          dispatch: u
        }),
        C
      );
    }
  };
  function O(g, ...C) {
    if (!t.apply(this, arguments)) return;
    var T = _(this, C).event(g), N = this.__zoom, $ = Math.max(s[0], Math.min(s[1], N.k * Math.pow(2, r.apply(this, arguments)))), z = wt(g);
    if (T.wheel)
      (T.mouse[0][0] !== z[0] || T.mouse[0][1] !== z[1]) && (T.mouse[1] = N.invert(T.mouse[0] = z)), clearTimeout(T.wheel);
    else {
      if (N.k === $) return;
      T.mouse = [z, N.invert(z)], ae(this), T.start();
    }
    zt(g), T.wheel = setTimeout(P, E), T.zoom("mouse", n(y(f(N, $), T.mouse[0], T.mouse[1]), T.extent, a));
    function P() {
      T.wheel = null, T.end();
    }
  }
  function q(g, ...C) {
    if (v || !t.apply(this, arguments)) return;
    var T = g.currentTarget, N = _(this, C, !0).event(g), $ = D(g.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", rt, !0), z = wt(g, T), P = g.clientX, W = g.clientY;
    Go(g.view), Te(g), N.mouse = [z, this.__zoom.invert(z)], ae(this), N.start();
    function Y(G) {
      if (zt(G), !N.moved) {
        var it = G.clientX - P, at = G.clientY - W;
        N.moved = it * it + at * at > w;
      }
      N.event(G).zoom("mouse", n(y(N.that.__zoom, N.mouse[0] = wt(G, T), N.mouse[1]), N.extent, a));
    }
    function rt(G) {
      $.on("mousemove.zoom mouseup.zoom", null), Uo(G.view, N.moved), zt(G), N.event(G).end();
    }
  }
  function A(g, ...C) {
    if (t.apply(this, arguments)) {
      var T = this.__zoom, N = wt(g.changedTouches ? g.changedTouches[0] : g, this), $ = T.invert(N), z = T.k * (g.shiftKey ? 0.5 : 2), P = n(y(f(T, z), N, $), e.apply(this, C), a);
      zt(g), o > 0 ? D(this).transition().duration(o).call(S, P, N, g) : D(this).call(k.transform, P, N, g);
    }
  }
  function nt(g, ...C) {
    if (t.apply(this, arguments)) {
      var T = g.touches, N = T.length, $ = _(this, C, g.changedTouches.length === N).event(g), z, P, W, Y;
      for (Te(g), P = 0; P < N; ++P)
        W = T[P], Y = wt(W, this), Y = [Y, this.__zoom.invert(Y), W.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== Y[2] && ($.touch1 = Y, $.taps = 0) : ($.touch0 = Y, z = !0, $.taps = 1 + !!h);
      h && (h = clearTimeout(h)), z && ($.taps < 2 && (d = Y[0], h = setTimeout(function() {
        h = null;
      }, p)), ae(this), $.start());
    }
  }
  function Z(g, ...C) {
    if (this.__zooming) {
      var T = _(this, C).event(g), N = g.changedTouches, $ = N.length, z, P, W, Y;
      for (zt(g), z = 0; z < $; ++z)
        P = N[z], W = wt(P, this), T.touch0 && T.touch0[2] === P.identifier ? T.touch0[0] = W : T.touch1 && T.touch1[2] === P.identifier && (T.touch1[0] = W);
      if (P = T.that.__zoom, T.touch1) {
        var rt = T.touch0[0], G = T.touch0[1], it = T.touch1[0], at = T.touch1[1], j = (j = it[0] - rt[0]) * j + (j = it[1] - rt[1]) * j, Q = (Q = at[0] - G[0]) * Q + (Q = at[1] - G[1]) * Q;
        P = f(P, Math.sqrt(j / Q)), W = [(rt[0] + it[0]) / 2, (rt[1] + it[1]) / 2], Y = [(G[0] + at[0]) / 2, (G[1] + at[1]) / 2];
      } else if (T.touch0) W = T.touch0[0], Y = T.touch0[1];
      else return;
      T.zoom("touch", n(y(P, W, Y), T.extent, a));
    }
  }
  function st(g, ...C) {
    if (this.__zooming) {
      var T = _(this, C).event(g), N = g.changedTouches, $ = N.length, z, P;
      for (Te(g), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, p), z = 0; z < $; ++z)
        P = N[z], T.touch0 && T.touch0[2] === P.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === P.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (P = wt(P, this), Math.hypot(d[0] - P[0], d[1] - P[1]) < m)) {
        var W = D(this).on("dblclick.zoom");
        W && W.apply(this, arguments);
      }
    }
  }
  return k.wheelDelta = function(g) {
    return arguments.length ? (r = typeof g == "function" ? g : te(+g), k) : r;
  }, k.filter = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : te(!!g), k) : t;
  }, k.touchable = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : te(!!g), k) : i;
  }, k.extent = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : te([[+g[0][0], +g[0][1]], [+g[1][0], +g[1][1]]]), k) : e;
  }, k.scaleExtent = function(g) {
    return arguments.length ? (s[0] = +g[0], s[1] = +g[1], k) : [s[0], s[1]];
  }, k.translateExtent = function(g) {
    return arguments.length ? (a[0][0] = +g[0][0], a[1][0] = +g[1][0], a[0][1] = +g[0][1], a[1][1] = +g[1][1], k) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, k.constrain = function(g) {
    return arguments.length ? (n = g, k) : n;
  }, k.duration = function(g) {
    return arguments.length ? (o = +g, k) : o;
  }, k.interpolate = function(g) {
    return arguments.length ? (l = g, k) : l;
  }, k.on = function() {
    var g = u.on.apply(u, arguments);
    return g === u ? k : g;
  }, k.clickDistance = function(g) {
    return arguments.length ? (w = (g = +g) * g, k) : Math.sqrt(w);
  }, k.tapDistance = function(g) {
    return arguments.length ? (m = +g, k) : m;
  }, k;
}
var Pt = {}, In;
function nl() {
  if (In) return Pt;
  In = 1, Object.defineProperty(Pt, "__esModule", {
    value: !0
  }), Pt.default = void 0;
  var t = e(Ie);
  function e(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function n(f) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? n = function(x) {
      return typeof x;
    } : n = function(x) {
      return x && typeof Symbol == "function" && x.constructor === Symbol && x !== Symbol.prototype ? "symbol" : typeof x;
    }, n(f);
  }
  function r(f) {
    for (var y = 1; y < arguments.length; y++) {
      var x = arguments[y] != null ? arguments[y] : {}, S = Object.keys(x);
      typeof Object.getOwnPropertySymbols == "function" && (S = S.concat(Object.getOwnPropertySymbols(x).filter(function(_) {
        return Object.getOwnPropertyDescriptor(x, _).enumerable;
      }))), S.forEach(function(_) {
        v(f, _, x[_]);
      });
    }
    return f;
  }
  function i(f, y) {
    if (!(f instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function s(f, y) {
    if (typeof y != "function" && y !== null)
      throw new TypeError("Super expression must either be null or a function");
    a(f.prototype, y && y.prototype), y && a(f, y);
  }
  function a(f, y) {
    return a = Object.setPrototypeOf || function(S, _) {
      return S.__proto__ = _, S;
    }, a(f, y);
  }
  function o(f, y) {
    for (var x = 0; x < y.length; x++) {
      var S = y[x];
      S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(f, S.key, S);
    }
  }
  function l(f, y, x) {
    return y && o(f.prototype, y), f;
  }
  function u(f, y) {
    return y && (n(y) === "object" || typeof y == "function") ? y : d(f);
  }
  function h(f) {
    return h = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    }, h(f);
  }
  function d(f) {
    if (f === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return f;
  }
  function v(f, y, x) {
    return y in f ? Object.defineProperty(f, y, { value: x, enumerable: !0, configurable: !0, writable: !0 }) : f[y] = x, f;
  }
  var p = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: -1,
    visibility: "hidden",
    pointerEvents: "none"
  }, E = {
    position: "absolute",
    left: 0,
    top: 0,
    transition: "0s"
  };
  function w(f, y) {
    for (var x = f.parentNode; x; ) {
      if (x === y)
        return !0;
      x = x.parentNode;
    }
    return !1;
  }
  var m = /* @__PURE__ */ (function(f) {
    function y() {
      var x, S, _;
      i(this, y);
      for (var L = arguments.length, O = new Array(L), q = 0; q < L; q++)
        O[q] = arguments[q];
      return u(_, (S = _ = u(this, (x = h(y)).call.apply(x, [this].concat(O))), v(d(d(_)), "_expandRef", null), v(d(d(_)), "_shrinkRef", null), v(d(d(_)), "_node", null), v(d(d(_)), "_lastWidth", void 0), v(d(d(_)), "_lastHeight", void 0), v(d(d(_)), "_lastRect", void 0), v(d(d(_)), "_hasResize", !1), v(d(d(_)), "_handleScroll", function(A) {
        (_.props.onPosition || _.props.onReflow || _.props.onResize) && (_._globalScollTarget(A.target) || _._refScrollTarget(A.target) || _._ancestorScollTarget(A.target)) && _._reflow();
      }), v(d(d(_)), "_globalScollTarget", function(A) {
        return A instanceof Node && (_.props.onPosition || _.props.onReflow) && (A === document || A === document.documentElement || A === document.body);
      }), v(d(d(_)), "_refScrollTarget", function(A) {
        if (A instanceof HTMLElement && (A === _._expandRef || A === _._shrinkRef)) {
          var nt = A.offsetWidth, Z = A.offsetHeight;
          if (nt !== _._lastWidth || Z !== _._lastHeight)
            return _._lastWidth = nt, _._lastHeight = Z, _._reset(_._expandRef), _._reset(_._shrinkRef), !0;
        }
        return !1;
      }), v(d(d(_)), "_ancestorScollTarget", function(A) {
        return A instanceof Node && (_.props.onPosition || _.props.onReflow) && _._node && w(_._node, A);
      }), v(d(d(_)), "_reflow", function() {
        if (!(!_._node || !(_._node.parentNode instanceof Element))) {
          var A = _._node.parentNode.getBoundingClientRect(), nt = !0, Z = !0;
          _._lastRect && (nt = A.width !== _._lastRect.width || A.height !== _._lastRect.height, Z = A.top !== _._lastRect.top || A.left !== _._lastRect.left), _._lastRect = A, nt && _.props.onResize && _.props.onResize(A), Z && _.props.onPosition && _.props.onPosition(A), (nt || Z) && _.props.onReflow && _.props.onReflow(A);
        }
      }), v(d(d(_)), "_handleRef", function(A) {
        _._node = A;
      }), v(d(d(_)), "_handleExpandRef", function(A) {
        _._reset(A), _._expandRef = A;
      }), v(d(d(_)), "_handleShrinkRef", function(A) {
        _._reset(A), _._shrinkRef = A;
      }), S));
    }
    return l(y, [{
      key: "componentDidMount",
      value: function() {
        this._reflow(), window.addEventListener("scroll", this._handleScroll, !0), (this.props.onPosition || this.props.onReflow) && (window.addEventListener("resize", this._reflow, !0), this._hasResize = !0);
      }
    }, {
      key: "componentDidUpdate",
      value: function() {
        (this.props.onPosition || this.props.onReflow) && !this._hasResize ? (window.addEventListener("resize", this._reflow, !0), this._hasResize = !0) : !(this.props.onPosition || this.props.onReflow) && this._hasResize && (window.removeEventListener("resize", this._reflow, !0), this._hasResize = !1);
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        window.removeEventListener("scroll", this._handleScroll, !0), this._hasResize && window.removeEventListener("resize", this._reflow, !0);
      }
    }, {
      key: "_reset",
      value: function(S) {
        S && (S.scrollLeft = 1e5, S.scrollTop = 1e5);
      }
    }, {
      key: "render",
      value: function() {
        return this.props.onResize || this.props.onReflow ? t.default.createElement("div", {
          style: p,
          ref: this._handleRef
        }, t.default.createElement("div", {
          ref: this._handleExpandRef,
          style: p
        }, t.default.createElement("div", {
          style: r({}, E, {
            width: 1e5,
            height: 1e5
          })
        })), t.default.createElement("div", {
          ref: this._handleShrinkRef,
          style: p
        }, t.default.createElement("div", {
          style: r({}, E, {
            width: "200%",
            height: "200%"
          })
        }))) : t.default.createElement("noscript", {
          ref: this._handleRef
        });
      }
    }]), s(y, f), y;
  })(t.default.Component);
  v(m, "displayName", "ResizeObserver");
  var k = m;
  return Pt.default = k, Pt;
}
var rl = nl();
const il = /* @__PURE__ */ Hr(rl), al = require("d3-flextree").flextree, U = 500, Dt = 4, sl = 8, ct = 150, Bt = 280;
var ol = /* @__PURE__ */ ((t) => (t[t.Hidden = 1] = "Hidden", t[t.EventBased = 2] = "EventBased", t[t.Visible = 3] = "Visible", t))(ol || {});
let Ee = class {
  constructor(e, n, r, i, s) {
    this.id = e, this.tags = n, this.data = r, this.weight = s || 0, this.children = new Array(), this.state = i || je.defaultState(), this.type = "node";
  }
  getWeight() {
    var e = typeof this.weight == "function" ? this.weight(this) : this.weight, n = this.parent ? this.parent.getWeight() : 0;
    return (!e || e < n) && (e = n), e;
  }
};
class Fn {
  constructor(e, n, r, i, s, a) {
    this.id = e, this.tags = n, this.source = r, this.target = i, this.data = s, this.type = "link", this.state = a;
  }
}
class ee {
  constructor(e, n, r, i) {
    this.id = e, this.wrapped = r, this.parent = i, this.children = new Array(), this.type = n, n === 2 ? this.size = [50, Bt] : this.size = [ct, Bt];
  }
}
class je extends Yr.Component {
  constructor(e) {
    super(e), this.props.weightTitles ? this.weightTitles = this.props.weightTitles : this.weightTitles = /* @__PURE__ */ new Map(), this.tree = al(), this.initTree(), this.isCtrlPressed = !1;
  }
  componentDidMount() {
    D("body").on("keydown", (e) => {
      e.keyCode === 17 && (this.isCtrlPressed = !0);
    }).on("keyup", (e) => {
      e.keyCode === 17 && (this.isCtrlPressed = !1);
    }), this.createSVG();
  }
  onResize(e) {
    this.svg && this.svg.attr("width", e.width).attr("height", e.height);
  }
  createSVG() {
    if (!this.svgDiv)
      return;
    var e = this.svgDiv.clientWidth, n = this.svgDiv.clientHeight;
    this.svg = D(this.svgDiv).append("svg").attr("width", e).attr("height", n).on("click", (o) => {
      this.hideNodeContextMenu(), this.props.onClick();
    });
    var r = this.svg.append("defs");
    r.append("marker").attr("id", "link-marker").attr("viewBox", "-5 -5 10 10").attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("class", "link-marker").attr("d", "M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z"), r.append("marker").attr("id", "link-directed-marker").attr("viewBox", "-5 -5 10 10").attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto-start-reverse").append("path").attr("class", "link-marker link-directed-marker").attr("d", "M 0,0 m -5,-5 L 5,0 L -5,5 Z");
    const i = (o) => {
      r.append("marker").attr("id", o).attr("viewBox", "-5 -5 10 10").attr("markerWidth", 1).attr("markerHeight", 1).attr("orient", "auto").append("path").attr("class", o).attr("d", "M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z");
    };
    i("link-overlay-marker"), i("link-overlay-selected-marker");
    var s = r.append("filter").attr("id", "drop-shadow").attr("height", "150%");
    s.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 5).attr("result", "blur"), s.append("feOffset").attr("in", "blur").attr("dx", 0).attr("dy", 0).attr("result", "offsetBlur");
    var a = s.append("feMerge");
    a.append("feMergeNode").attr("in", "offsetBlur"), a.append("feMergeNode").attr("in", "SourceGraphic"), this.absTransformX = this.absTransformY = 0, this.zoom = el().scaleExtent([0.1, 1.5]).on("zoom", (o) => {
      this.hideAllLevelLabels(), this.hideNodeContextMenu(), this.g.attr("transform", o.transform.toString()), this.absTransformX = o.transform.x * 1 / o.transform.k, this.absTransformY = o.transform.y * 1 / o.transform.k;
    }).on("end", (o) => {
      window.setTimeout(this.showAllLevelLabels.bind(this), 200);
    }), this.svg.call(this.zoom).on("dblclick.zoom", null), this.g = this.svg.append("g"), this.gLevels = this.g.append("g").attr("class", "levels"), this.gGroups = this.g.append("g").attr("class", "groups"), this.gHieraLinks = this.g.append("g").attr("class", "hiera-links"), this.gLinkOverlays = this.g.append("g").attr("class", "link-overlays"), this.gLinks = this.g.append("g").attr("class", "links"), this.gLinkLabels = this.g.append("g").attr("class", "link-labels"), this.gLinkWraps = this.g.append("g").attr("class", "link-wraps"), this.gGroupButtons = this.g.append("g").attr("class", "group-buttons"), this.gNodes = this.g.append("g").attr("class", "nodes"), this.gLevelLabels = this.g.append("g").attr("class", "level-labels"), this.gContextMenu = this.svg.append("g").attr("class", "context-menu"), this.liner = yn().x((o) => o.x).y((o) => o.y).curve(rs.tension(0.7));
  }
  static defaultState() {
    return { expanded: !1, selected: !1, mouseover: !1, groupOffset: 0, groupFullSize: !1 };
  }
  resetTree() {
    this.unpinNodes(), this.unselectAllNodes(), this.unselectAllLinks(), this.initTree(), this.renderTree();
  }
  initTree() {
    var e = { expanded: !0, selected: !1, mouseover: !1, groupOffset: 0, groupFullSize: !1 };
    this.root = new Ee("root", ["root"], { Name: "root", Type: "root" }, e, 0), this.nodes = /* @__PURE__ */ new Map(), this.nodeTagStates = /* @__PURE__ */ new Map(), this.nodeTagCount = /* @__PURE__ */ new Map(), this.nodeTagActive = "", this.links = /* @__PURE__ */ new Map(), this.linkTagStates = /* @__PURE__ */ new Map(), this.linkTagCount = /* @__PURE__ */ new Map(), this.levelRects = new Array(), this.groups = /* @__PURE__ */ new Map(), this.groupStates = /* @__PURE__ */ new Map(), this.nodeGroup = /* @__PURE__ */ new Map(), this.weights = new Array(), this.invalidated = !0;
  }
  setLinkTagState(e, n) {
    this.linkTagStates.set(e, n), this.resetCacheAndRenderTree();
  }
  activeNodeTag(e) {
    for (const [n, r] of this.nodeTagStates.entries())
      this.nodeTagStates.set(n, !1);
    this.nodeTagStates.has(e) ? (this.nodeTagStates.set(e, !0), this.nodeTagActive = e) : this.nodeTagStates.set(this.nodeTagActive, !0), this.invalidate();
  }
  resetCacheAndRenderTree() {
    this.visibleLinksCache = void 0, this.renderTree();
  }
  invalidate() {
    this.invalidated = !0, this.resetCacheAndRenderTree();
  }
  updateWeighs(e) {
    var n = e.getWeight();
    this.weights.includes(n) || (this.weights.push(n), this.weights = this.weights.sort((r, i) => r - i));
  }
  addNode(e, n, r, i) {
    var s = new Ee(e, n, r, je.defaultState(), i);
    return this.nodes.set(e, s), n.forEach((a) => {
      this.nodeTagActive || (this.nodeTagActive = a);
      var o = this.nodeTagCount.get(a) || 0;
      this.nodeTagCount.set(a, o + 1), this.nodeTagStates.has(a) || this.nodeTagStates.set(a, this.nodeTagActive == a);
    }), this.updateWeighs(s), this.invalidated = !0, s;
  }
  updateNode(e, n) {
    var r = this.nodes.get(e);
    if (!r)
      return null;
    var i = r.getWeight();
    return r.data = n, i !== r.getWeight() && (this.updateWeighs(r), this.invalidated = !0), r.revision++, r;
  }
  getRandKey(e) {
    let n = Array.from(e.keys());
    return n[Math.floor(Math.random() * n.length)];
  }
  delNode(e) {
    var n = this.nodes.get(e);
    if (n) {
      n.parent && (n.parent.children = n.parent.children.filter((r) => n && r.id !== n.id));
      for (const [r, i] of this.links.entries())
        (i.source === n || i.target === n) && this.links.delete(r);
      n.tags.forEach((r) => {
        var i = this.nodeTagCount.get(r) || 0;
        if (i)
          this.nodeTagCount.set(r, i - 1);
        else if (this.nodeTagCount.delete(r), this.nodeTagStates.delete(r), this.nodeTagActive == r) {
          let s = this.getRandKey(this.nodeTagStates);
          this.nodeTagStates.set(s, !0);
        }
      }), this.nodes.delete(n.id), this.invalidated = !0;
    }
  }
  setParent(e, n) {
    e.parent && (e.parent.children = e.parent.children.filter((r) => r.id !== e.id)), n.children.push(e), e.parent = n, this.invalidated = !0;
  }
  addLink(e, n, r, i, s) {
    this.links.set(e, new Fn(e, i, n, r, s, { selected: !1 })), i.forEach((a) => {
      var o = this.linkTagCount.get(a) || 0;
      if (this.linkTagCount.set(a, o + 1), !this.linkTagStates.has(a)) {
        let l = this.props.defaultLinkTagMode ? this.props.defaultLinkTagMode(a) : 2;
        this.linkTagStates.set(a, l);
      }
    }), this.visibleLinksCache = void 0;
  }
  updateLink(e, n) {
    var r = this.links.get(e);
    return r ? (r.data = n, r.revision++, this.visibleLinksCache = void 0, !0) : !1;
  }
  delLink(e) {
    var n = this.links.get(e);
    n && (this.links.delete(e), n.tags.forEach((r) => {
      var i = this.linkTagCount.get(r) || 0;
      i ? this.linkTagCount.set(r, i - 1) : (this.linkTagCount.delete(r), this.linkTagStates.delete(r));
    }));
  }
  // group nodes
  groupify(e) {
    var n = /* @__PURE__ */ new Map(), r = (a, o) => {
      var l = this.props.groupType ? this.props.groupType(o) : o.data.Type;
      if (l) {
        var u = a.id + "_" + l + "_" + o.getWeight();
        return [l, u];
      }
    };
    e.children.forEach((a) => {
      var o = r(e.wrapped, a.wrapped);
      if (o) {
        var [l, u] = o, h = n.get(u);
        if (!h) {
          var d = this.groupStates.get(u) || { expanded: !1, selected: !1, mouseover: !1, groupOffset: 0, groupFullSize: !1 };
          this.groupStates.set(u, d);
          var v = this.props.groupName ? this.props.groupName(a.wrapped) : l + "(s)", p = new Ee(u, [], { Name: v, Type: l }, d, () => a.wrapped.getWeight());
          h = new ee(u, 3, p, e);
        }
        a.wrapped.tags.forEach((E) => {
          h && !h.wrapped.tags.includes(E) && h.wrapped.tags.push(E);
        }), h.wrapped.children.push(a.wrapped), h.children.push(a), n.set(u, h);
      }
    });
    var i = /* @__PURE__ */ new Set(), s = new Array();
    return e.children.forEach((a) => {
      var o = r(e.wrapped, a.wrapped);
      if (o) {
        var [l, u] = o;
        if (!i.has(u)) {
          var h = n.get(u), d = this.props.groupSize || Dt;
          h && h.wrapped.children.length > d ? (s.push(h), h.wrapped.state.expanded && (h.wrapped.state.groupFullSize ? s = s.concat(h.children) : s = s.concat(
            h.children.splice(h.wrapped.state.groupOffset, d)
          )), h.wrapped.children.forEach((v) => {
            h && this.nodeGroup.set(v.id, h);
          }), h.children = [], i.add(u)) : (n.delete(u), s.push(a));
        }
      }
    }), e.children = s, n;
  }
  // clone using wrapped node
  cloneTree(e, n) {
    var r = new ee(e.id, 1, e, n), i = e.tags.some((s) => this.nodeTagStates.get(s));
    if (i && !e.state.expanded)
      return [r, null];
    if (e.children.forEach((s) => {
      let [a, o] = this.cloneTree(s, r);
      a ? r.children.push(a) : o && o.forEach((l) => {
        l.parent = r, r.children.push(l);
      });
    }), this.props.sortNodesFnc && r.children.sort((s, a) => this.props.sortNodesFnc(s.wrapped, a.wrapped)), e.id === "root" || i) {
      for (const [s, a] of this.groupify(r).entries())
        this.groups.set(s, a);
      return [r, null];
    }
    return [null, r.children];
  }
  normalizeTree(e) {
    let n = (a, o, l) => {
      if (a.wrapped.getWeight() > o)
        return 0;
      var u = l;
      return a.children.forEach((h) => {
        let d = n(h, o, l + 1);
        d > u && (u = d);
      }), u;
    }, r = (a, o, l, u, h) => {
      var d = o.wrapped.getWeight();
      if (!(d > l)) {
        if (d === l && o.parent && o.parent.wrapped.getWeight() !== l) {
          let v = n(a, o.wrapped.getWeight() - 1, 0);
          if (u > v)
            return;
          let p = o.parent.wrapped.id + "/" + d, E, w, m = h.chains.get(p);
          if (m)
            E = m.first, o.parent.children = o.parent.children.filter((k) => k !== o), w = m.last;
          else {
            E = new ee(o.id + "_" + u, 2, o.wrapped, o.parent);
            let k = o.parent.children, f = k.indexOf(o);
            for (k[f] = E, w = E; u++ < v; ) {
              let y = new ee(o.id + "_" + u, 2, o.wrapped, o.parent);
              w.children = [y], w = y;
            }
            h.chains.set(p, { first: E, last: w });
          }
          w.children.push(o);
          return;
        }
        o.children.forEach((v) => {
          r(a, v, l, u + 1, h);
        });
      }
    };
    this.groups.clear(), this.nodeGroup.clear();
    var [i, s] = this.cloneTree(e, null);
    if (!i)
      return null;
    for (let a of this.weights)
      r(i, i, a, 0, { chains: /* @__PURE__ */ new Map() });
    return i;
  }
  collapse(e) {
    e.state && (e.state.expanded = !1), e.children.forEach((n) => this.collapse(n));
  }
  expand(e) {
    e.state.expanded ? this.collapse(e) : e.state.expanded = !0, this.invalidated = !0, this.resetCacheAndRenderTree();
  }
  hexagon(e, n) {
    var r = Math.sqrt(3) / 2;
    return n || (n = 20), [
      { x: n, y: 0 },
      { x: n / 2, y: n * r },
      { x: -n / 2, y: n * r },
      { x: -n, y: 0 },
      { x: -n / 2, y: -n * r },
      { x: n / 2, y: -n * r }
    ];
  }
  visibleLinks() {
    if (this.visibleLinksCache)
      return this.visibleLinksCache;
    var e = new Array(), n = (s) => {
      for (; s; ) {
        if (this.d3nodes.get(s.id))
          return s;
        var a = this.nodeGroup.get(s.id);
        if (a) {
          for (let o of a.wrapped.children)
            if (o.id === s.id && this.d3nodes.get(a.id))
              return a.wrapped;
        }
        s = s.parent;
      }
    }, r = /* @__PURE__ */ new Map();
    this.links.forEach((s) => {
      var a = n(s.source), o = n(s.target);
      if (a && o && a.id !== "root" && o.id !== "root" && a !== o) {
        for (let l of s.tags)
          r.set(l, !0);
        s.tags.some(
          (l) => this.linkTagStates.get(l) !== 1
          /* Hidden */
        ) && e.push(new Fn(s.id, s.tags, a, o, s.data, s.state));
      }
    });
    var i = /* @__PURE__ */ new Map();
    return this.linkTagStates.forEach((s, a) => {
      r.get(a) && i.set(a, s);
    }), this.props.onLinkTagChange(i), this.visibleLinksCache = e, e;
  }
  sceneSizeX() {
    var e = Array(), n = !0;
    return Array.from(this.d3nodes.values()).forEach((r) => {
      (n == !0 || e[0] > r.x) && (e[0] = r.x), (n == !0 || e[1] < r.x) && (e[1] = r.x), n = !1;
    }), e;
  }
  nodesBB(e) {
    if (e.length === 0)
      return null;
    var n = e[0], r = n.x, i = n.x, s = n.y, a = n.y;
    for (let o of e)
      r > o.x && (r = o.x), i < o.x && (i = o.x), s > o.y && (s = o.y), a < o.y && (a = o.y);
    return {
      x: r - ct / 2,
      y: s - Bt / 2,
      width: i - r + ct,
      height: a - s + Bt
    };
  }
  levelRect(e) {
    if (!this.svgDiv)
      return null;
    var n = e.nodes[0], r = n.y, i = n.y;
    for (let l of e.nodes)
      r > l.y && (r = l.y), i < l.y && (i = l.y);
    var s = this.sceneSizeX();
    const a = Bt / 2;
    var o = this.svgDiv.clientWidth * 10;
    return {
      weight: e.weight,
      bb: {
        x: s[0] - o,
        y: r - a,
        width: s[1] - s[0] + o * 2,
        height: i - r + a * 2
      }
    };
  }
  updateLevelRects(e) {
    this.levelRects = new Array();
    var n = 0;
    e.reverse().forEach((r) => {
      var i = this.levelRect(r);
      i && (n && i.bb.y + i.bb.height > n && (i.bb.height = n - i.bb.y), this.levelRects.push(i), n = i.bb.y);
    });
  }
  levelNodes() {
    var e = /* @__PURE__ */ new Map();
    Array.from(this.d3nodes.values()).forEach((r) => {
      if (r.data.wrapped !== this.root && r.data.type !== 2) {
        var i = e.get(r.data.wrapped.getWeight());
        i ? i.nodes.push(r) : (i = { weight: r.data.wrapped.getWeight(), nodes: [r] }, e.set(r.data.wrapped.getWeight(), i));
      }
    });
    var n = Array.from(e.values());
    return n.sort(function(r, i) {
      return r.weight - i.weight;
    }), n;
  }
  nodeByID(e) {
    let n = this.nodes.get(e);
    if (!n) {
      let r = this.groups.get(e);
      if (!r)
        return r;
      n = r.wrapped;
    }
    return n;
  }
  unselectAllNodes() {
    var e = this;
    this.gNodes.selectAll(".node-selected").each(function() {
      var n = D(this);
      if (!n)
        return;
      n.classed("node-selected", !1);
      var r = n.attr("id");
      if (!r)
        return;
      r = r.replace(/^node-/, "");
      let i = e.nodeByID(r);
      i && (i.state.selected = !1, e.props.onNodeSelected && e.props.onNodeSelected(i, !1));
    }), this.hideLinks();
  }
  hideLinks() {
    var e = this;
    $t("path.link-overlay").each(function(n) {
      D(this).style("opacity", e.isLinkVisible(n) ? 1 : 0);
    }), $t("path.link").each(function(n) {
      D(this).style("opacity", e.isLinkVisible(n) ? 1 : 0);
    }), $t("text.link-label").each(function(n) {
      D(this).style("opacity", e.isLinkVisible(n) ? 1 : 0);
    });
  }
  selectNode(e, n = !0) {
    !this.isCtrlPressed && n && (this.unselectAllNodes(), this.unselectAllLinks());
    let r = this.nodeByID(e);
    if (r) {
      if (r.state.selected = n, D("#node-" + e).classed("node-selected", n), this.props.onNodeSelected) {
        let s = this.nodes.get(e);
        s && this.props.onNodeSelected(s, n);
      }
      var i = this.d3nodes.get(e);
      i && this.highlightNeighborLinks(i, n);
    }
  }
  toggleNode(e) {
    D("#node-" + e).classed("node-selected") ? this.selectNode(e, !1) : this.selectNode(e, !0);
  }
  unselectAllLinks() {
    var e = this;
    this.gLinkOverlays.selectAll(".link-overlay-selected").each(function() {
      var n = D(this);
      if (!n)
        return;
      n.classed("link-overlay-selected", !1);
      var r = n.attr("id");
      if (!r)
        return;
      r = r.replace(/^link-overlay-/, "");
      let i = e.links.get(r);
      i && (i.state.selected = !1, D("#link-overlay-" + r).style("opacity", e.isLinkVisible(i) ? 1 : 0), D("#link-" + r).style("opacity", e.isLinkVisible(i) ? 1 : 0), e.props.onLinkSelected && e.props.onLinkSelected(i, !1));
    });
  }
  selectLink(e, n) {
    let r = this.links.get(e);
    r && (r.state.selected = n, !this.isCtrlPressed && n && (this.unselectAllNodes(), this.unselectAllLinks()), n || this.hideLinks(), D("#link-overlay-" + e).classed("link-overlay-selected", n), this.props.onLinkSelected && this.props.onLinkSelected(r, n));
  }
  viewSize() {
    var e = this.g.node();
    if (!e)
      return { width: 0, height: 0 };
    var n = e.parentElement;
    return n ? { width: n.clientWidth || n.parentNode.clientWidth, height: n.clientHeight || n.parentNode.clientHeight } : { width: 0, height: 0 };
  }
  zoomFit() {
    if (this.gNodes) {
      var e = this.gNodes.node();
      if (e) {
        var n = e.getBBox(), r = this.viewSize(), i = n.width, s = n.height;
        if (!(i === 0 || s === 0)) {
          var a = n.x + i / 2, o = n.y + s / 2, l = 0.65 / Math.max(i / r.width, s / r.height);
          l > 1 && (l = 1), this.absTransformX = r.width / 2 - a * l, this.absTransformY = r.height / 2 - o * l;
          var u = de.translate(this.absTransformX, this.absTransformY).scale(l);
          this.svg.transition().duration(U).call(this.zoom.transform, u);
        }
      }
    }
  }
  showNodeContextMenu(e, n) {
    if (this.svgDiv && (this.hideNodeContextMenu(), this.props.onShowNodeContextMenu)) {
      var r = this.props.onShowNodeContextMenu(n.data.wrapped), i = this.svgDiv.getBoundingClientRect(), s = e.x - i.left, a = e.y - i.top, o = this.gContextMenu.append("g").style("opacity", 0);
      o.transition().duration(300).style("opacity", 1);
      var l = o.append("rect").attr("filter", "url(#drop-shadow)"), u = 20, h = 10, d = 30, v = 0, p = new Array();
      for (let m of r) {
        let k = o.append("g").attr("class", "context-menu-item " + m.class), f = k.append("rect"), x = k.append("text").classed("disabled", m.disabled).attr("x", s).attr("y", a + d).attr("dy", v).text((_) => m.text).node();
        if (!x)
          continue;
        let S = x.getBBox();
        f.attr("x", S.x - u + 1).attr("y", S.y - d / 4).attr("height", S.height + d / 2).style("opacity", 0), p.push(f), m.disabled || (k.on("click", () => {
          m.callback(n);
        }), k.on("mouseover", () => {
          f.style("opacity", 1);
        }), k.on("mouseout", () => f.style("opacity", 0))), v += d;
      }
      var E = o.node();
      if (!E)
        return;
      var w = E.getBBox();
      l.attr("x", w.x - u).attr("y", w.y - h).attr("width", w.width + u * 2).attr("height", w.height + h * 2);
      for (let m of p)
        m.attr("width", w.width + u * 2 - 2);
    }
  }
  hideNodeContextMenu() {
    this.gContextMenu.select("g").remove();
  }
  nodeClicked(e, n) {
    e.stopPropagation(), !this.nodeClickedID && (this.nodeClickedID = window.setTimeout(() => {
      this.nodeClickedID = 0, this.hideNodeContextMenu(), this.props.onNodeClicked && this.props.onNodeClicked(n.data.wrapped);
    }, 170));
  }
  nodeDoubleClicked(e, n) {
    e.stopPropagation(), this.nodeClickedID && (clearTimeout(this.nodeClickedID), this.nodeClickedID = 0), this.props.onNodeDblClicked && this.props.onNodeDblClicked(n.data.wrapped);
  }
  neighborLinks(e, n) {
    var r = new Array();
    for (let i of n)
      (i.source.id === e.wrapped.id || i.target.id === e.wrapped.id) && r.push(i);
    return r;
  }
  showNode(e) {
    const n = () => {
      for (var a = "", o = "", l = e; l; ) {
        var u = this.nodeGroup.get(l.id);
        u && !u.wrapped.state.expanded && (o = u.id), l.state.expanded || (a = l.id), l = l.parent;
      }
      return o || a;
    };
    for (var r = n(); r; ) {
      var i = this.d3nodes.get(r);
      if (i)
        this.expand(i.data.wrapped);
      else {
        var s = this.nodeGroup.get(r);
        if (s) {
          let a = s.wrapped.children.findIndex((o) => o.id === r);
          if (a >= 0) {
            let o = this.props.groupSize || Dt;
            a + o > s.wrapped.children.length && (a = s.wrapped.children.length - o);
          }
          s.wrapped.state.groupOffset = a, this.renderTree();
        } else
          break;
      }
      r = n();
    }
  }
  moveTo(e, n) {
    var r = 0.8, i = this.viewSize(), s = de.translate(i.width / 2 - r * e, i.height / 2 - r * n).scale(r);
    this.svg.transition().duration(800).call(this.zoom.transform, s);
  }
  centerLink(e) {
    var n = D("#link-" + e.id).node(), r = n.getBBox(), i = r.x + r.width / 2, s = r.y + r.height / 2;
    this.moveTo(i, s);
  }
  pinNode(e, n) {
    n && this.showNode(e);
    var r = this.d3nodes.get(e.id);
    r && (D("#node-pinned-" + e.id).style("opacity", n ? 1 : 0), n && this.moveTo(r.x, r.y));
  }
  unpinNodes() {
    $t("g.node-pinned").style("opacity", 0);
  }
  isLinkNodeSelected(e) {
    return e.source.state.selected || e.target.state.selected;
  }
  isLinkNodeMouseOver(e) {
    return e.source.state.mouseover || e.target.state.mouseover;
  }
  highlightNeighborLinks(e, n) {
    var r = n ? 1 : 0;
    const i = (a) => this.isLinkVisible(a) ? 1 : r;
    var s = this.neighborLinks(e.data, this.visibleLinks());
    for (let a of s)
      (n || !this.isLinkNodeSelected(a)) && (D("#link-" + a.id).attr("class", (o) => i(o) ? this.linkClass(o) : "link").style("opacity", i), D("#link-label-" + a.id).style("opacity", i), D("#link-overlay-" + a.id).style("opacity", a.state.selected || r));
  }
  overNode(e, n) {
    var r = this.d3nodes.get(e);
    if (!r)
      return !1;
    r.data.wrapped.state.mouseover = n;
    var i = n ? 1 : 0;
    D("#node-overlay-" + e).style("opacity", i), r.data.wrapped.state.selected || this.highlightNeighborLinks(r, n);
  }
  isLinkVisible(e) {
    return e.state.selected ? !0 : e.tags.some((n) => this.linkTagStates.get(n) === 3 || this.linkTagStates.get(n) === 2 && (e.source.state.selected || e.target.state.selected || e.source.state.mouseover || e.target.state.mouseover));
  }
  searchMetadata(e, n, r) {
    for (let i in e)
      if (typeof e[i] == "object") {
        if (this.searchMetadata(e[i], n, r))
          return !0;
      } else {
        let s = e[i];
        for (const [a, o] of n.entries())
          if (a === s && !o && (n.set(a, !0), r--), !r)
            return !0;
      }
    return !1;
  }
  searchNodes(e) {
    var n = /* @__PURE__ */ new Map(), r = new Array();
    return Array.from(this.nodes.values()).forEach((i) => {
      e.forEach((s) => n.set(s, !1)), this.searchMetadata(i.data, n, e.length) && r.push(i);
    }), r;
  }
  showLevelLabel(e) {
    var n = D("#level-label-" + e.weight);
    n.attr("transform", `translate(${-this.absTransformX},${e.bb.y + 2})`).select("rect").attr("height", e.bb.height - 4);
    var r = n.select("text").attr("style", ""), i = r.node();
    i && r.attr("dy", (e.bb.height - i.getComputedTextLength()) / 2).attr("style", "writing-mode: tb; glyph-orientation-vertical: 0"), n.transition().duration(U).style("opacity", 1);
  }
  hideAllLevelLabels() {
    this.gLevelLabels.selectAll("g.level-label").style("opacity", 0).interrupt();
  }
  showAllLevelLabels() {
    $t("g.level-label").each((e) => this.showLevelLabel(e));
  }
  groupBB(e) {
    var n = new Array();
    let r = this.d3nodes.get(e.id);
    return r && n.push(r), e.wrapped.state.expanded && e.wrapped.children.forEach((i) => {
      let s = this.d3nodes.get(i.id);
      s && n.push(s);
    }), this.nodesBB(n);
  }
  linkClicked(e, n) {
    e.stopPropagation(), this.hideNodeContextMenu(), this.selectLink(n.id, !0);
  }
  renderLevels() {
    var e = this;
    this.invalidated && this.updateLevelRects(this.levelNodes());
    var n = this.gLevelLabels.selectAll("g.level-label").data(this.levelRects, (a) => "level-label-" + a.weight), r = n.enter().append("g").attr("id", (a) => "level-label-" + a.weight).attr("class", "level-label").style("opacity", 0).attr("transform", (a) => `translate(${-e.absTransformX},${a.bb.y})`);
    r.append("rect").attr("width", 40).attr("height", (a) => a.bb.height), r.append("text").attr("font-size", 26).attr("dx", 18).text((a) => e.weightTitles.get(a.weight) || "Level " + a.weight), n.exit().remove();
    var i = this.gLevels.selectAll("g.level").data(this.levelRects, (a) => "level-" + a.weight).interrupt(), s = i.enter().append("g").attr("id", (a) => "level-" + a.weight).attr("class", "level").style("opacity", 0).attr("transform", (a) => `translate(${a.bb.x},${a.bb.y})`);
    s.append("rect").attr("id", (a) => "level-zone-" + a.weight).attr("class", "level-zone").attr("width", (a) => a.bb.width).attr("height", (a) => a.bb.height), i.exit().remove(), s.transition().duration(U).style("opacity", 1).on("end", (a, o) => this.showLevelLabel(o)), i.transition().duration(U).style("opacity", 1).on("end", (a, o) => this.showLevelLabel(o)).attr("transform", (a) => `translate(${a.bb.x},${a.bb.y})`).select("rect.level-zone").attr("height", (a) => a.bb.height);
  }
  renderHieraLinks(e) {
    const n = mn().x((s) => s.x).y((s) => s.y);
    var r = this.gHieraLinks.selectAll("path.hiera-link").data(e.links(), (s) => s.source.data.id + s.target.data.id).interrupt(), i = r.enter().filter((s) => s.target.data.parent.wrapped !== this.root).append("path").attr("class", "hiera-link").style("opacity", 0).attr("d", n);
    r.exit().remove(), i.transition().duration(U).style("opacity", 1), r.transition().attr("d", n);
  }
  renderGroups() {
    var e = this, n = this.gGroups.selectAll("g.group").interrupt().data(Array.from(this.groups.values()), (w) => w.id), r = n.enter().append("g").attr("class", "group").attr("id", (w) => w.id).style("opacity", 0);
    n.exit().remove();
    const i = (w, m, k, f, y) => "M " + (w - y) + " " + m + " L " + (k - y) + " " + f, s = (w, m, k) => {
      var f = this.groupBB(m);
      if (!f)
        return;
      var y = f.x + 15, x = f.y + 70, S = f.x + f.width - 15, _ = f.y + f.height - 70, L = 12, O = i(y, x, y, _, L), q = i(S, _, S, x, -L), A = w.select("path.group-brace-left");
      k && (A = A.transition().duration(U)), A.attr("d", "M " + y + " " + x + " " + O), A = w.select("path.group-brace-right"), k && (A = A.transition().duration(U)), A.attr("d", "M " + S + " " + _ + " " + q), A = w.select("path.group-brace-bg"), k && (A = A.transition().duration(U)), A.attr(
        "d",
        "M " + (y - L) + " " + x + " " + O + " L " + (S + L) + " " + _ + " " + q + " L " + (y - L) + " " + x + " "
      ), A = w.select("path.group-brace-owner-bg"), k && m.wrapped.state.expanded ? A = A.transition().duration(U).style("opacity", m.wrapped.state.expanded ? 1 : 0) : A.style("opacity", m.wrapped.state.expanded ? 1 : 0);
      let nt = this.d3nodes.get(m.id);
      if (nt) {
        let Z = m.wrapped.state.expanded ? nt.x + ct / 2 : S, st = m.wrapped.state.expanded ? " L " + Z + " " + x + " " : q;
        A.attr(
          "d",
          "M " + (y - L) + " " + x + " " + O + " L " + Z + " " + _ + " " + st + " L " + (y - L) + " " + x + " "
        );
      }
    };
    r.transition().duration(U).style("opacity", 1), r.append("path").attr("class", "group-brace-bg"), r.append("path").attr("class", "group-brace-owner-bg").style("opacity", 1), r.append("path").attr("class", "group-brace group-brace-left"), r.append("path").attr("class", "group-brace group-brace-right"), r.each(function(w) {
      s(D(this), w, !1);
    }), n.each(function(w) {
      s(D(this), w, !0);
    });
    const a = (w, m, k, f) => {
      let y = this.d3nodes.get(m.id);
      if (y) {
        var x = y.y - ct / 2, S = w.select("text"), _ = S.node().getBBox();
        w.select("rect").attr("x", _.x + 2).attr("y", _.y + 2).attr("width", _.width - 4).attr("height", _.height - 4), w = w.transition().duration(U);
        var L = 0;
        m.wrapped.state.expanded && (L = f ? 0.5 : 1), w.style("opacity", L).attr("transform", (O) => y ? `translate(${y.x + ct / 2},${x + k})` : "");
      }
    }, o = (w, m, k, f, y) => {
      let x = this.d3nodes.get(m.id);
      if (x) {
        var S = x.y - ct / 2, _ = w.select("text");
        _.text(f);
        var L = _.node().getBBox();
        _.attr("dx", 6).attr("dy", 1), w.select("rect").attr("x", L.x - 6).attr("y", L.y - 1).attr("width", L.width + 12).attr("height", 21);
        var O = 0;
        m.wrapped.state.expanded && (O = y ? 0.5 : 1), w = w.transition().duration(U).style("opacity", O).attr("transform", (q) => x ? `translate(${x.x + ct / 2},${S + k})` : "");
      }
    };
    var l = this.gGroupButtons.selectAll("g.group-button").interrupt().data(Array.from(this.groups.values()), (w) => w.id), u = l.enter().append("g").attr("class", "group-button").attr("id", (w) => w.id);
    l.exit().remove();
    var h = u.append("g").attr("class", "brace-offset").style("opacity", 1);
    h.append("rect").attr("rx", 2).attr("ry", 2), h.append("text");
    var d = u.append("g").attr("class", "brace-icon brace-left-icon").style("opacity", 0);
    d.append("rect").attr("rx", 5).attr("ry", 5), d.append("text").text("").on("click", (w, m) => {
      w.stopPropagation(), m.wrapped.state.expanded && m.wrapped.state.groupOffset > 0 && (m.wrapped.state.groupOffset--, e.resetCacheAndRenderTree());
    });
    var v = u.append("g").attr("class", "brace-icon brace-right-icon").style("opacity", 0);
    v.append("rect").attr("rx", 5).attr("ry", 5), v.append("text").text("").on("click", (w, m) => {
      if (w.stopPropagation(), !!m.wrapped.state.expanded) {
        var k = this.props.groupSize || Dt;
        m.wrapped.state.groupOffset + k < m.wrapped.children.length && (m.wrapped.state.groupOffset++, e.resetCacheAndRenderTree());
      }
    });
    var p = u.append("g").attr("class", "brace-icon brace-full-icon").style("opacity", 0);
    p.append("rect").attr("rx", 5).attr("ry", 5), p.append("text").text("").on("click", function(w, m) {
      w.stopPropagation(), m.wrapped.state.groupFullSize ? (m.wrapped.state.groupFullSize = !1, D(this).text("")) : (m.wrapped.state.groupFullSize = !0, D(this).text("")), e.resetCacheAndRenderTree();
    });
    const E = (w, m) => {
      var k = this.props.groupSize || Dt;
      o(w.select("g.brace-offset"), m, 25, m.wrapped.state.groupOffset, m.wrapped.state.groupFullSize), a(w.select("g.brace-left-icon"), m, 80, m.wrapped.state.groupFullSize || m.wrapped.state.groupOffset === 0), a(w.select("g.brace-right-icon"), m, 55, m.wrapped.state.groupFullSize || m.wrapped.state.groupOffset + k >= m.wrapped.children.length), m.wrapped.children.length <= sl && a(w.select("g.brace-full-icon"), m, 105, !1);
    };
    u.each(function(w) {
      E(D(this), w);
    }), l.each(function(w) {
      E(D(this), w);
    });
  }
  renderNodes(e) {
    var n = this, r = this.gNodes.selectAll("g.node").interrupt().data(e.descendants(), (p) => p.data.id);
    const i = (p) => new Array().concat(
      "node",
      this.props.nodeAttrs(p.data.wrapped).classes,
      p.data.wrapped.state.selected ? "node-selected" : ""
    ).join(" ");
    var s = r.enter().filter((p) => p.data.type !== 2 && p.data.wrapped !== this.root).append("g").attr("id", (p) => "node-" + p.data.id).attr("class", i).style("opacity", 0).attr("transform", (p) => `translate(${p.x},${p.y})`).on("dblclick", (p, E) => this.nodeDoubleClicked(p, E)).on("click", (p, E) => this.nodeClicked(p, E)).on("contextmenu", (p, E) => {
      p.preventDefault(), this.showNodeContextMenu(p, E);
    }).on("mouseover", (p, E) => {
      this.overNode(E.data.id, !0);
    }).on("mouseout", (p, E) => {
      this.overNode(E.data.id, !1);
    });
    r.exit().transition().duration(U).style("opacity", 0).remove(), s.transition().duration(U).style("opacity", 1);
    const a = 30;
    s.append("circle").attr("id", (p) => "node-overlay-" + p.data.id).attr("class", "node-overlay").attr("r", a + 16).style("opacity", 0).attr("pointer-events", "none");
    var o = s.append("g").attr("id", (p) => "node-pinned-" + p.data.id).attr("class", "node-pinned").style("opacity", 0).attr("pointer-events", "none");
    o.append("circle").attr("r", a + 16), o.append("text").text("").attr("dy", -60), s.append("circle").attr("class", "node-circle").attr("r", a + 16), s.append("circle").attr("class", "node-disc").attr("r", a + 8).attr("pointer-events", "none"), s.append("path").attr("class", "node-hexagon").attr("d", (p) => this.liner(this.hexagon(p, a))).attr("pointer-events", "none");
    const l = (p) => !!this.props.nodeAttrs(p.data.wrapped).href;
    s.each(function(p) {
      var E = D(this), w = n.props.nodeAttrs(p.data.wrapped);
      l(p) ? E.append("image").attr("class", (m) => "node-icon " + w.iconClass).attr("transform", "translate(-16,-16)").attr("width", 32).attr("heigh", 32).attr("xlink:href", (m) => w.href).attr("pointer-events", "none") : E.append("text").attr("class", (m) => "node-icon " + w.iconClass).attr("dy", 9).text((m) => w.icon).attr("pointer-events", "none");
    });
    var u = (p, E, w) => {
      p.each(function() {
        for (var m = D(this), k = m.attr("y"), f = parseFloat(m.attr("dy")), y = m.text().match(/.{1,10}/g).reverse(), x = new Array(), S = m.text(null).append("tspan").attr("x", 0).attr("y", k).attr("dy", f + "em"), _ = 0, L = y.pop(); L; ) {
          x.push(L), S.text(x.join(""));
          let q = S.node();
          q && (q.getComputedTextLength() > w && (x.pop(), x.length && (S.text(x.join("")), x = [L], S = m.append("tspan").attr("x", 0).attr("y", k).attr("dy", ++_ * E + f + "em").text(L))), L = y.pop());
        }
        var O = this.getBBox();
        D(this.parentNode).insert("rect", "text").attr("class", "node-name-wrap").attr("x", O.x - 5).attr("y", O.y - 5).attr("width", O.width + 10).attr("height", O.height + 10).attr("rx", 10).attr("ry", 10);
      });
    };
    s.append("g").append("text").attr("class", "node-name").attr("dy", ".35em").attr("y", 85).text((p) => this.props.nodeAttrs(p.data.wrapped).name).attr("pointer-events", "none").call(u, 1.1, ct - 10);
    const h = function(p) {
      var E = D(this).selectAll("g.node-badge").data(n.props.nodeAttrs(p.data.wrapped).badges), w = E.enter().append("g").attr("class", "node-badge");
      E.exit().remove(), w.append("rect").attr("x", (m, k) => 38 - k * 28).attr("y", -60).attr("width", 24).attr("height", 24).attr("rx", 5).attr("ry", 5).attr("fill", (m) => m.fill ? m.fill : "#6975a9"), w.append("text").attr("class", (m) => m.iconClass ? m.iconClass : "").attr("dx", (m, k) => 50 - k * 28).attr("dy", -41).text((m) => m.text).attr("pointer-events", "none").attr("fill", (m) => m.stroke ? m.stroke : "#fff");
    };
    s.append("g").attr("class", "node-badges").attr("pointer-events", "none").each(h), r.each(h);
    var d = s.append("g").attr("class", "node-exco").attr("pointer-events", "none").style("opacity", ((p) => p.data.wrapped.children.length > 0 ? 1 : 0));
    d.append("circle").attr("class", "node-exco-circle").attr("cx", a + 10).attr("cy", a).attr("r", 18);
    const v = (p) => {
      var E = 0;
      if (p.type == 3 && p.wrapped.state.expanded) {
        if (!p.wrapped.state.groupFullSize) {
          var w = this.props.groupSize || Dt;
          E = p.wrapped.children.length - w;
        }
      } else
        E = p.wrapped.children.length;
      return E > 99 ? "+99" : E;
    };
    d.append("text").attr("id", (p) => "exco-" + p.data.id).attr("class", "node-exco-children").attr("x", a + 10).attr("y", a + 6).text((p) => v(p.data)), r.select("g.node-exco").filter((p) => p.data.wrapped.children.length > 0).style("opacity", 1), r.select("text.node-exco-children").filter((p) => p.data.wrapped.children.length > 0).text((p) => v(p.data)), r.transition().duration(U).style("opacity", 1).attr("transform", (p) => `translate(${p.x},${p.y})`).attr("class", i);
  }
  linkClass(e) {
    const n = (s) => {
      var a = this.d3nodes.get(s.source.id), o = this.d3nodes.get(s.target.id);
      return !a || !o ? "" : a.y === o.y ? a.x > o.x ? "directed-inv" : "directed" : a.y > o.y || a.x > o.x ? "directed-inv" : "directed";
    };
    var r = new Array(), i = this.props.linkAttrs(e);
    return r.concat("link", i.classes, i.directed ? n(e) : "").join(" ");
  }
  renderLinks() {
    var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    const r = (f) => {
      if (n.has(f.id))
        return n.get(f.id);
      let x = this.isLinkVisible(f);
      return n.set(f.id, x), x;
    }, i = mn().x((f) => f.x).y((f) => f.y), s = (f) => {
      var y = f.source.x, x = f.target.x, S = f.source.y;
      if (Math.abs(y - x) > ct) {
        let O = x - y;
        var _ = [
          { x: y - 13, y: S + 35 },
          { x: y + O / 4, y: S + 50 + 0.05 * O },
          { x: x - O / 4, y: S + 50 + 0.05 * O },
          { x: x + 13, y: S + 35 }
        ];
      } else
        var _ = [
          { x: y, y: S },
          { x, y: S }
        ];
      return yn().x((O) => O.x).y((O) => O.y).curve(as.alpha(0.01))(_);
    };
    var a = (f, y) => {
      var x = this.d3nodes.get(f.source.id), S = this.d3nodes.get(f.target.id);
      if (!x || !S)
        return;
      var _ = e.get(f.id);
      if (_)
        return _;
      let L = x, O = S;
      return x.y === S.y ? (x.x > S.x && (L = S, O = x), _ = s({
        source: { x: L.x + y, y: L.y, node: f.source },
        target: { x: O.x - y, y: O.y, node: f.target }
      }), e.set(f.id, _), _) : ((x.y > S.y || x.x > S.x) && (L = S, O = x), L.y > O.y && (y *= -1), _ = i({
        source: { x: L.x, y: L.y + y, node: f.source },
        target: { x: O.x, y: O.y - y, node: f.target }
      }), e.set(f.id, _), _);
    };
    const o = (f) => a(f, 55);
    var l = this.visibleLinks();
    const u = (f) => new Array().concat(
      "link-overlay",
      f.state.selected ? "link-overlay-selected" : ""
    ).join(" ");
    var h = this.gLinkOverlays.selectAll("path.link-overlay").interrupt().data(l, (f) => f.id), d = h.enter().append("path").attr("id", (f) => "link-overlay-" + f.id).attr("class", u).style("opacity", 0);
    h.exit().remove(), h = h.merge(d), h.transition().duration(U).style("opacity", (f) => f.state.selected || this.isLinkNodeSelected(f) || this.isLinkNodeMouseOver(f) ? 1 : 0).attr("d", o);
    var v = this.gLinks.selectAll("path.link").interrupt().data(l, (f) => f.id), p = v.enter().append("path").attr("id", (f) => "link-" + f.id).attr("class", "link").style("opacity", 0);
    v.exit().remove(), v = v.merge(p), v.attr("class", (f) => r(f) ? this.linkClass(f) : "link").transition().duration(U).style("opacity", (f) => r(f) ? 1 : 0).attr("d", o);
    var E = this.gLinkLabels.selectAll("text.link-label").interrupt().data(l.filter((f) => this.props.linkAttrs(f).label), (f) => f.id), w = E.enter().append("text").attr("class", "link-label").attr("id", (f) => "link-label-" + f.id).attr("dy", -8).style("opacity", (f) => r(f) ? 1 : 0);
    w.append("textPath").attr("xlink:href", (f) => "#link-" + f.id).attr("text-anchor", "middle").attr("startOffset", "50%").text((f) => this.props.linkAttrs(f).label), E.exit().remove(), E = E.merge(w), E.style("opacity", (f) => r(f) ? 1 : 0), E.select("textPath").text((f) => this.props.linkAttrs(f).label);
    var m = this.gLinkWraps.selectAll("path.link-wrap").interrupt().data(l, (f) => f.id), k = m.enter().append("path").attr("class", "link-wrap").on("click", (f, y) => this.linkClicked(f, y)).on("mouseover", (f, y) => {
      r(y) && D("#link-overlay-" + y.id).style("opacity", 1);
    }).on("mouseout", (f, y) => {
      !y.source.state.selected && !y.target.state.selected && D("#link-overlay-" + y.id).style("opacity", (x) => x.state.selected ? 1 : 0);
    });
    m.exit().remove(), m = m.merge(k), m.transition().duration(U).attr("d", o);
  }
  renderTree() {
    var e = this.normalizeTree(this.root), n = Fe(e);
    this.tree(n), this.d3nodes = /* @__PURE__ */ new Map(), n.each((r) => {
      this.d3nodes.set(r.data.id, r);
    }), this.renderLevels(), this.renderHieraLinks(n), this.renderNodes(n), this.renderGroups(), this.renderLinks(), this.invalidated = !1;
  }
  render() {
    return /* @__PURE__ */ gn.jsx("div", { className: this.props.className, ref: (e) => this.svgDiv = e, style: { position: "relative" }, children: /* @__PURE__ */ gn.jsx(
      il,
      {
        onResize: (e) => {
          this.onResize(e);
        }
      }
    ) });
  }
}
export {
  Fn as Link,
  ol as LinkTagState,
  Ee as Node,
  je as Topology
};
