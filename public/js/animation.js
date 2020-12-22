!(function(t) {
  function n(r) {
    if (e[r]) return e[r].exports;
    var a = (e[r] = { exports: {}, id: r, loaded: !1 });
    return t[r].call(a.exports, a, a.exports, n), (a.loaded = !0), a.exports;
  }
  var e = {};
  return (n.m = t), (n.c = e), (n.p = ""), n(0);
})([
  function(t, n, e) {
    function r(t, n, e) {
      var r = n.from || s(t, n.property);
      return AFRAME.utils.extend({}, e, {
        targets: [{ aframeProperty: r }],
        aframeProperty: n.to,
        update: function() {
          c(t, n.property, this.targets[0].aframeProperty);
        }
      });
    }
    function a(t, n, e) {
      var r = s(t, n.property);
      n.from && (r = AFRAME.utils.coordinates.parse(n.from));
      var a = AFRAME.utils.coordinates.parse(n.to);
      return AFRAME.utils.extend(
        {},
        e,
        {
          targets: [r],
          update: function() {
            c(t, n.property, this.targets[0]);
          }
        },
        a
      );
    }
    function i(t, n) {
      var e = n.split("."),
        r = e[0],
        a = e[1],
        i = t.components[r] || AFRAME.components[r];
      return i ? (a ? i.schema[a].type : i.schema.type) : null;
    }
    var o = e(1);
    if ("undefined" == typeof AFRAME)
      throw new Error(
        "Component attempted to register before AFRAME was available."
      );
    var u = AFRAME.utils,
      s = u.entity.getComponentProperty,
      c = u.entity.setComponentProperty;
    u.styleParser.parse;
    AFRAME.registerComponent("animation", {
      schema: {
        delay: { default: 0 },
        dir: { default: "" },
        dur: { default: 1e3 },
        easing: { default: "easeInQuad" },
        elasticity: { default: 400 },
        from: { default: "" },
        loop: { default: !1 },
        property: { default: "" },
        repeat: { default: 0 },
        startEvents: { type: "array" },
        pauseEvents: { type: "array" },
        resumeEvents: { type: "array" },
        restartEvents: { type: "array" },
        to: { default: "" }
      },
      multiple: !0,
      init: function() {
        (this.animation = null),
          (this.animationIsPlaying = !1),
          (this.config = null),
          (this.playAnimationBound = this.playAnimation.bind(this)),
          (this.pauseAnimationBound = this.pauseAnimation.bind(this)),
          (this.resumeAnimationBound = this.resumeAnimation.bind(this)),
          (this.restartAnimationBound = this.restartAnimation.bind(this)),
          (this.repeat = 0);
      },
      update: function() {
        var t = this.attrName,
          n = this.data,
          e = this.el,
          u = i(e, n.property),
          s = this;
        if (n.property) {
          this.repeat = n.repeat;
          var c = {
              autoplay: !1,
              begin: function() {
                e.emit("animationbegin"), e.emit(t + "-begin");
              },
              complete: function() {
                e.emit("animationcomplete"),
                  e.emit(t + "-complete"),
                  --s.repeat > 0 && s.animation.play();
              },
              direction: n.dir,
              duration: n.dur,
              easing: n.easing,
              elasticity: n.elasticity,
              loop: n.loop
            },
            f = r;
          ("vec2" !== u && "vec3" !== u && "vec4" !== u) || (f = a),
            (this.config = f(e, n, c)),
            (this.animation = o(this.config)),
            this.pauseAnimation(),
            this.data.startEvents.length || (this.animationIsPlaying = !0),
            this.removeEventListeners(),
            this.addEventListeners();
        }
      },
      remove: function() {
        this.pauseAnimation(), this.removeEventListeners();
      },
      pause: function() {
        this.pauseAnimation(), this.removeEventListeners();
      },
      play: function() {
        function t() {
          e.playAnimation(), e.addEventListeners();
        }
        var n = this.data,
          e = this;
        this.animation &&
          this.animationIsPlaying &&
          (n.delay ? setTimeout(t, n.delay) : t());
      },
      addEventListeners: function() {
        var t = this,
          n = this.data,
          e = this.el;
        n.startEvents.map(function(n) {
          e.addEventListener(n, t.playAnimationBound);
        }),
          n.pauseEvents.map(function(n) {
            e.addEventListener(n, t.pauseAnimationBound);
          }),
          n.resumeEvents.map(function(n) {
            e.addEventListener(n, t.resumeAnimationBound);
          }),
          n.restartEvents.map(function(n) {
            e.addEventListener(n, t.restartAnimationBound);
          });
      },
      removeEventListeners: function() {
        var t = this,
          n = this.data,
          e = this.el;
        n.startEvents.map(function(n) {
          e.removeEventListener(n, t.playAnimationBound);
        }),
          n.pauseEvents.map(function(n) {
            e.removeEventListener(n, t.pauseAnimationBound);
          }),
          n.resumeEvents.map(function(n) {
            e.removeEventListener(n, t.resumeAnimationBound);
          }),
          n.restartEvents.map(function(n) {
            e.removeEventListener(n, t.restartAnimationBound);
          });
      },
      playAnimation: function() {
        (this.animation = o(this.config)), this.animation.play();
      },
      pauseAnimation: function() {
        this.animation.pause();
      },
      resumeAnimation: function() {
        this.animation.play();
      },
      restartAnimation: function() {
        this.animation.restart();
      }
    });
  },
  function(t, n, e) {
    var r, a, i;
    !(function(e, o) {
      (a = []),
        (r = o),
        (i = "function" == typeof r ? r.apply(n, a) : r),
        !(void 0 !== i && (t.exports = i));
    })(this, function() {
      var t,
        n = "1.1.3",
        e = {
          duration: 1e3,
          delay: 0,
          loop: !1,
          autoplay: !0,
          direction: "normal",
          easing: "easeOutElastic",
          elasticity: 400,
          round: !1,
          begin: void 0,
          update: void 0,
          complete: void 0
        },
        r = [
          "translateX",
          "translateY",
          "translateZ",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "scale",
          "scaleX",
          "scaleY",
          "scaleZ",
          "skewX",
          "skewY"
        ],
        a = "transform",
        i = {
          arr: function(t) {
            return Array.isArray(t);
          },
          obj: function(t) {
            return Object.prototype.toString.call(t).indexOf("Object") > -1;
          },
          svg: function(t) {
            return t instanceof SVGElement;
          },
          dom: function(t) {
            return t.nodeType || i.svg(t);
          },
          num: function(t) {
            return !isNaN(parseInt(t));
          },
          str: function(t) {
            return "string" == typeof t;
          },
          fnc: function(t) {
            return "function" == typeof t;
          },
          und: function(t) {
            return "undefined" == typeof t;
          },
          nul: function(t) {
            return "null" == typeof t;
          },
          hex: function(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
          },
          rgb: function(t) {
            return /^rgb/.test(t);
          },
          hsl: function(t) {
            return /^hsl/.test(t);
          },
          col: function(t) {
            return i.hex(t) || i.rgb(t) || i.hsl(t);
          }
        },
        o = (function() {
          var t = {},
            n = ["Quad", "Cubic", "Quart", "Quint", "Expo"],
            e = {
              Sine: function(t) {
                return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
              },
              Circ: function(t) {
                return 1 - Math.sqrt(1 - t * t);
              },
              Elastic: function(t, n) {
                if (0 === t || 1 === t) return t;
                var e = 1 - Math.min(n, 998) / 1e3,
                  r = t / 1,
                  a = r - 1,
                  i = (e / (2 * Math.PI)) * Math.asin(1);
                return -(
                  Math.pow(2, 10 * a) * Math.sin(((a - i) * (2 * Math.PI)) / e)
                );
              },
              Back: function(t) {
                return t * t * (3 * t - 2);
              },
              Bounce: function(t) {
                for (var n, e = 4; t < ((n = Math.pow(2, --e)) - 1) / 11; );
                return (
                  1 / Math.pow(4, 3 - e) -
                  7.5625 * Math.pow((3 * n - 2) / 22 - t, 2)
                );
              }
            };
          return (
            n.forEach(function(t, n) {
              e[t] = function(t) {
                return Math.pow(t, n + 2);
              };
            }),
            Object.keys(e).forEach(function(n) {
              var r = e[n];
              (t["easeIn" + n] = r),
                (t["easeOut" + n] = function(t, n) {
                  return 1 - r(1 - t, n);
                }),
                (t["easeInOut" + n] = function(t, n) {
                  return t < 0.5 ? r(2 * t, n) / 2 : 1 - r(t * -2 + 2, n) / 2;
                }),
                (t["easeOutIn" + n] = function(t, n) {
                  return t < 0.5
                    ? (1 - r(1 - 2 * t, n)) / 2
                    : (r(2 * t - 1, n) + 1) / 2;
                });
            }),
            (t.linear = function(t) {
              return t;
            }),
            t
          );
        })(),
        u = function(t) {
          return i.str(t) ? t : t + "";
        },
        s = function(t) {
          return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        },
        c = function(t) {
          if (i.col(t)) return !1;
          try {
            var n = document.querySelectorAll(t);
            return n;
          } catch (t) {
            return !1;
          }
        },
        f = function(t, n) {
          return Math.floor(Math.random() * (n - t + 1)) + t;
        },
        l = function(t) {
          return t.reduce(function(t, n) {
            return t.concat(i.arr(n) ? l(n) : n);
          }, []);
        },
        p = function(t) {
          return i.arr(t)
            ? t
            : (i.str(t) && (t = c(t) || t),
              t instanceof NodeList || t instanceof HTMLCollection
                ? [].slice.call(t)
                : [t]);
        },
        m = function(t, n) {
          return t.some(function(t) {
            return t === n;
          });
        },
        d = function(t, n) {
          var e = {};
          return (
            t.forEach(function(t) {
              var r = JSON.stringify(
                n.map(function(n) {
                  return t[n];
                })
              );
              (e[r] = e[r] || []), e[r].push(t);
            }),
            Object.keys(e).map(function(t) {
              return e[t];
            })
          );
        },
        h = function(t) {
          return t.filter(function(t, n, e) {
            return e.indexOf(t) === n;
          });
        },
        v = function(t) {
          var n = {};
          for (var e in t) n[e] = t[e];
          return n;
        },
        y = function(t, n) {
          for (var e in n) t[e] = i.und(t[e]) ? n[e] : t[e];
          return t;
        },
        g = function(t) {
          var n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            t = t.replace(n, function(t, n, e, r) {
              return n + n + e + e + r + r;
            }),
            e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),
            r = parseInt(e[1], 16),
            a = parseInt(e[2], 16),
            i = parseInt(e[3], 16);
          return "rgb(" + r + "," + a + "," + i + ")";
        },
        A = function(t) {
          var n,
            e,
            r,
            t = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),
            a = parseInt(t[1]) / 360,
            i = parseInt(t[2]) / 100,
            o = parseInt(t[3]) / 100,
            u = function(t, n, e) {
              return (
                e < 0 && (e += 1),
                e > 1 && (e -= 1),
                e < 1 / 6
                  ? t + 6 * (n - t) * e
                  : e < 0.5
                  ? n
                  : e < 2 / 3
                  ? t + (n - t) * (2 / 3 - e) * 6
                  : t
              );
            };
          if (0 == i) n = e = r = o;
          else {
            var s = o < 0.5 ? o * (1 + i) : o + i - o * i,
              c = 2 * o - s;
            (n = u(c, s, a + 1 / 3)),
              (e = u(c, s, a)),
              (r = u(c, s, a - 1 / 3));
          }
          return "rgb(" + 255 * n + "," + 255 * e + "," + 255 * r + ")";
        },
        b = function(t) {
          return i.rgb(t) ? t : i.hex(t) ? g(t) : i.hsl(t) ? A(t) : void 0;
        },
        E = function(t) {
          return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(
            t
          )[2];
        },
        M = function(t, n, e) {
          return E(n)
            ? n
            : t.indexOf("translate") > -1
            ? E(e)
              ? n + E(e)
              : n + "px"
            : t.indexOf("rotate") > -1 || t.indexOf("skew") > -1
            ? n + "deg"
            : n;
        },
        x = function(t, n) {
          if (n in t.style)
            return getComputedStyle(t).getPropertyValue(s(n)) || "0";
        },
        w = function(t, n) {
          var e = n.indexOf("scale") > -1 ? 1 : 0,
            r = t.style.transform;
          if (!r) return e;
          for (
            var a = /(\w+)\((.+?)\)/g, i = [], o = [], u = [];
            (i = a.exec(r));

          )
            o.push(i[1]), u.push(i[2]);
          var s = u.filter(function(t, e) {
            return o[e] === n;
          });
          return s.length ? s[0] : e;
        },
        L = function(t, n) {
          return i.dom(t) && m(r, n)
            ? "transform"
            : i.dom(t) && (t.getAttribute(n) || (i.svg(t) && t[n]))
            ? "attribute"
            : i.dom(t) && "transform" !== n && x(t, n)
            ? "css"
            : i.nul(t[n]) || i.und(t[n])
            ? void 0
            : "object";
        },
        I = function(t, n) {
          switch (L(t, n)) {
            case "transform":
              return w(t, n);
            case "css":
              return x(t, n);
            case "attribute":
              return t.getAttribute(n);
          }
          return t[n] || 0;
        },
        P = function(t, n, e) {
          if (i.col(n)) return b(n);
          if (E(n)) return n;
          var r = E(E(t.to) ? t.to : t.from);
          return !r && e && (r = E(e)), r ? n + r : n;
        },
        O = function(t) {
          var n = /-?\d*\.?\d+/g;
          return {
            original: t,
            numbers: u(t).match(n)
              ? u(t)
                  .match(n)
                  .map(Number)
              : [0],
            strings: u(t).split(n)
          };
        },
        k = function(t, n, e) {
          return n.reduce(function(n, r, a) {
            var r = r ? r : e[a - 1];
            return n + t[a - 1] + r;
          });
        },
        B = function(t) {
          var t = t ? l(i.arr(t) ? t.map(p) : p(t)) : [];
          return t.map(function(t, n) {
            return { target: t, id: n };
          });
        },
        F = function(t, n) {
          var r = [];
          for (var a in t)
            if (!e.hasOwnProperty(a) && "targets" !== a) {
              var o = i.obj(t[a]) ? v(t[a]) : { value: t[a] };
              (o.name = a), r.push(y(o, n));
            }
          return r;
        },
        j = function(t, n, e, r) {
          var a = p(i.fnc(e) ? e(t, r) : e);
          return {
            from: a.length > 1 ? a[0] : I(t, n),
            to: a.length > 1 ? a[1] : a[0]
          };
        },
        C = function(t, n, e, r) {
          var a = {};
          if ("transform" === e)
            (a.from = t + "(" + M(t, n.from, n.to) + ")"),
              (a.to = t + "(" + M(t, n.to) + ")");
          else {
            var i = "css" === e ? x(r, t) : void 0;
            (a.from = P(n, n.from, i)), (a.to = P(n, n.to, i));
          }
          return { from: O(a.from), to: O(a.to) };
        },
        R = function(t, n) {
          var e = [];
          return (
            t.forEach(function(r, a) {
              var o = r.target;
              return n.forEach(function(n) {
                var u = L(o, n.name);
                if (u) {
                  var s = j(o, n.name, n.value, a),
                    c = v(n);
                  (c.animatables = r),
                    (c.type = u),
                    (c.from = C(n.name, s, c.type, o).from),
                    (c.to = C(n.name, s, c.type, o).to),
                    (c.round = i.col(s.from) || c.round ? 1 : 0),
                    (c.delay =
                      (i.fnc(c.delay) ? c.delay(o, a, t.length) : c.delay) /
                      K.speed),
                    (c.duration =
                      (i.fnc(c.duration)
                        ? c.duration(o, a, t.length)
                        : c.duration) / K.speed),
                    e.push(c);
                }
              });
            }),
            e
          );
        },
        T = function(t, n) {
          var e = R(t, n),
            r = d(e, ["name", "from", "to", "delay", "duration"]);
          return r.map(function(t) {
            var n = v(t[0]);
            return (
              (n.animatables = t.map(function(t) {
                return t.animatables;
              })),
              (n.totalDuration = n.delay + n.duration),
              n
            );
          });
        },
        N = function(t, n) {
          t.tweens.forEach(function(e) {
            var r = e.to,
              a = e.from,
              i = t.duration - (e.delay + e.duration);
            (e.from = r), (e.to = a), n && (e.delay = i);
          }),
            (t.reversed = !t.reversed);
        },
        S = function(t) {
          return Math.max.apply(
            Math,
            t.map(function(t) {
              return t.totalDuration;
            })
          );
        },
        $ = function(t) {
          return Math.min.apply(
            Math,
            t.map(function(t) {
              return t.delay;
            })
          );
        },
        V = function(t) {
          var n = [],
            e = [];
          return (
            t.tweens.forEach(function(t) {
              ("css" !== t.type && "transform" !== t.type) ||
                (n.push("css" === t.type ? s(t.name) : "transform"),
                t.animatables.forEach(function(t) {
                  e.push(t.target);
                }));
            }),
            { properties: h(n).join(", "), elements: h(e) }
          );
        },
        X = function(t) {
          var n = V(t);
          n.elements.forEach(function(t) {
            t.style.willChange = n.properties;
          });
        },
        Y = function(t) {
          var n = V(t);
          n.elements.forEach(function(t) {
            t.style.removeProperty("will-change");
          });
        },
        Q = function(t) {
          var n = i.str(t) ? c(t)[0] : t;
          return { path: n, value: n.getTotalLength() };
        },
        Z = function(t, n) {
          var e = t.path,
            r = t.value * n,
            a = function(a) {
              var i = a || 0,
                o = n > 1 ? t.value + i : r + i;
              return e.getPointAtLength(o);
            },
            i = a(),
            o = a(-1),
            u = a(1);
          switch (t.name) {
            case "translateX":
              return i.x;
            case "translateY":
              return i.y;
            case "rotate":
              return (180 * Math.atan2(u.y - o.y, u.x - o.x)) / Math.PI;
          }
        },
        q = function(t, n) {
          var e = Math.min(Math.max(n - t.delay, 0), t.duration),
            r = e / t.duration,
            a = t.to.numbers.map(function(n, e) {
              var a = t.from.numbers[e],
                i = o[t.easing](r, t.elasticity),
                u = t.path ? Z(t, i) : a + i * (n - a);
              return (u = t.round ? Math.round(u * t.round) / t.round : u);
            });
          return k(a, t.to.strings, t.from.strings);
        },
        D = function(n, e) {
          var r;
          (n.currentTime = e), (n.progress = (e / n.duration) * 100);
          for (var i = 0; i < n.tweens.length; i++) {
            var o = n.tweens[i];
            o.currentValue = q(o, e);
            for (var u = o.currentValue, s = 0; s < o.animatables.length; s++) {
              var c = o.animatables[s],
                f = c.id,
                l = c.target,
                p = o.name;
              switch (o.type) {
                case "css":
                  l.style[p] = u;
                  break;
                case "attribute":
                  l.setAttribute(p, u);
                  break;
                case "object":
                  l[p] = u;
                  break;
                case "transform":
                  r || (r = {}), r[f] || (r[f] = []), r[f].push(u);
              }
            }
          }
          if (r) {
            t || (t = (x(document.body, a) ? "" : "-webkit-") + a);
            for (var i in r) n.animatables[i].target.style[t] = r[i].join(" ");
          }
        },
        z = function(t) {
          var n = {};
          return (
            (n.animatables = B(t.targets)),
            (n.settings = y(t, e)),
            (n.properties = F(t, n.settings)),
            (n.tweens = T(n.animatables, n.properties)),
            (n.duration = n.tweens.length ? S(n.tweens) : t.duration),
            (n.delay = n.tweens.length ? $(n.tweens) : t.delay),
            (n.currentTime = 0),
            (n.progress = 0),
            (n.ended = !1),
            n
          );
        },
        G = [],
        H = 0,
        J = (function() {
          var t = function() {
              H = requestAnimationFrame(n);
            },
            n = function(n) {
              if (G.length) {
                for (var e = 0; e < G.length; e++) G[e].tick(n);
                t();
              } else cancelAnimationFrame(H), (H = 0);
            };
          return t;
        })(),
        K = function(t) {
          var n = z(t),
            e = {};
          return (
            (n.tick = function(t) {
              (n.ended = !1),
                e.start || (e.start = t),
                (e.current = Math.min(
                  Math.max(e.last + t - e.start, 0),
                  n.duration
                )),
                D(n, e.current);
              var r = n.settings;
              e.current >= n.delay &&
                (r.begin && r.begin(n),
                (r.begin = void 0),
                r.update && r.update(n)),
                e.current >= n.duration &&
                  (r.loop
                    ? ((e.start = t),
                      "alternate" === r.direction && N(n, !0),
                      i.num(r.loop) && r.loop--)
                    : ((n.ended = !0), n.pause(), r.complete && r.complete(n)),
                  (e.last = 0));
            }),
            (n.seek = function(t) {
              D(n, (t / 100) * n.duration);
            }),
            (n.pause = function() {
              Y(n);
              var t = G.indexOf(n);
              t > -1 && G.splice(t, 1);
            }),
            (n.play = function(t) {
              n.pause(),
                t && (n = y(z(y(t, n.settings)), n)),
                (e.start = 0),
                (e.last = n.ended ? 0 : n.currentTime);
              var r = n.settings;
              "reverse" === r.direction && N(n),
                "alternate" !== r.direction || r.loop || (r.loop = 1),
                X(n),
                G.push(n),
                H || J();
            }),
            (n.restart = function() {
              n.reversed && N(n), n.pause(), n.seek(0), n.play();
            }),
            n.settings.autoplay && n.play(),
            n
          );
        },
        U = function(t) {
          for (
            var n = l(i.arr(t) ? t.map(p) : p(t)), e = G.length - 1;
            e >= 0;
            e--
          )
            for (var r = G[e], a = r.tweens, o = a.length - 1; o >= 0; o--)
              for (var u = a[o].animatables, s = u.length - 1; s >= 0; s--)
                m(n, u[s].target) &&
                  (u.splice(s, 1),
                  u.length || a.splice(o, 1),
                  a.length || r.pause());
        };
      return (
        (K.version = n),
        (K.speed = 1),
        (K.list = G),
        (K.remove = U),
        (K.easings = o),
        (K.getValue = I),
        (K.path = Q),
        (K.random = f),
        K
      );
    });
  }
]);
