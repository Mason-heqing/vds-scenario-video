"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

webpackJsonp([8], {
  bLhS: function bLhS(t, e, n) {
    var i = n("zOAw");
    "string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);
    n("rjj0")("d9568d3c", i, !0);
  },
  "e/Dg": function eDg(t, e, n) {
    "use strict";

    function i(t) {
      n("bLhS");
    }

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var o = n("TtmE"),
        r = n("D7x1"),
        a = n("sYY+"),
        c = n.n(a),
        A = {
      name: "home",
      data: function data() {
        return {
          noticeContent: "",
          editor: null,
          imgurl: "",
          addForm: {
            appId: "",
            noticeContent: "",
            noticeTitle: "",
            noticeStatus: 1,
            noticeImage: ""
          },
          rules: {
            noticeTitle: [{
              required: !0,
              message: "请输入标题",
              trigger: "blur"
            }]
          },
          noticeTip: !1,
          isRequst: !1,
          isRequst1: !1
        };
      },
      computed: {
        appId: {
          get: function get() {
            return this.$store.state.project.projectId;
          },
          set: function set(t) {
            this.$store.commit("changeProjectId", t);
          }
        }
      },
      watch: {
        appId: function appId(t, e) {
          this.appId = t, this.addForm.appId = t;
        }
      },
      filters: {},
      created: function created() {
        this.imgurl = this.tools.global.API_URL;
      },
      components: {
        MsgBox: o.a,
        TableCmp: r.a
      },
      mounted: function mounted() {
        this.seteditor(), this.addForm.appId = this.appId, 2 == this.$route.query.type && (this.addForm = JSON.parse(this.utils.getStore("noticeMsg")), this.editor.txt.html(this.addForm.noticeContent));
      },
      methods: {
        consoleSelect: function consoleSelect() {
          console.log(this.$refs.tableChild.selectData);
        },
        gotoEdit: function gotoEdit(t) {
          alert(t);
        },
        addNotice: function addNotice(t, e) {
          var n = this,
              i = void 0;
          1 == this.$route.query.type ? i = "/property/notice/insert" : 2 == this.$route.query.type && (i = "/property/notice/update"), this.addForm.noticeStatus = e, this.noticeTip = !1, this.$refs[t].validate(function (t) {
            if (t && n.addForm.noticeContent) {
              var o = /<img.*?(?:>|\/>)/gi,
                  r = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
                  a = n.addForm.noticeContent.match(o);
              a && (n.addForm.noticeImage = a[0].match(r)[1]), 1 == e ? n.isRequst = !0 : n.isRequst1 = !0, n.utils.http({
                url: i,
                method: "POST",
                data: n.addForm
              }, function (t) {
                1 == e ? n.isRequst = !1 : n.isRequst1 = !1, 200 == t.code && n.$router.push({
                  path: "/notice"
                });
              });
            } else n.addForm.noticeContent || (n.noticeTip = !0);
          });
        },
        cancel: function cancel() {
          this.$router.push({
            path: "/notice"
          });
        },
        seteditor: function seteditor() {
          var t = this;
          this.editor = new c.a(this.$refs.editor), this.editor.customConfig.uploadImgShowBase64 = !1, this.editor.customConfig.uploadImgServer = this.imgurl + "/file/upload", this.editor.customConfig.uploadImgHeaders = {}, this.editor.customConfig.uploadFileName = "file", this.editor.customConfig.uploadImgMaxSize = 5242880, this.editor.customConfig.uploadImgMaxLength = 6, this.editor.customConfig.uploadImgTimeout = 18e4, this.editor.customConfig.uploadImgParams = {
            appId: this.appId
          }, this.editor.customConfig.menus = ["head", "bold", "fontSize", "fontName", "italic", "underline", "strikeThrough", "foreColor", "backColor", "link", "list", "justify", "quote", "emoticon", "image", "table", "code", "undo", "redo", "fullscreen"], this.editor.customConfig.uploadImgHooks = {
            fail: function fail(t, e, n) {},
            success: function success(t, e, n) {},
            timeout: function timeout(t, e) {},
            error: function error(t, e) {},
            customInsert: function customInsert(e, n, i) {
              console.log(n.data), n.data.forEach(function (n, i) {
                var o = t.imgurl + "/file/download?path=" + n;
                e(o);
              });
            }
          }, this.editor.customConfig.onchange = function (e) {
            t.addForm.noticeContent = e, console.log(e);
          }, this.editor.create();
        }
      }
    },
        s = function s() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;
      return n("div", {
        staticClass: "content-wrapper"
      }, [t._m(0), t._v(" "), n("section", {
        staticClass: "content container-fluid"
      }, [n("el-form", {
        ref: "addForm",
        staticClass: "mt-20 add-notice",
        attrs: {
          model: t.addForm,
          rules: t.rules
        },
        nativeOn: {
          submit: function submit(t) {
            t.preventDefault();
          }
        }
      }, [n("el-form-item", {
        attrs: {
          prop: "noticeTitle",
          label: "标题"
        }
      }, [n("el-input", {
        staticStyle: {
          width: "60%"
        },
        attrs: {
          placeholder: "请输入广告标题最大支持40字",
          maxlength: "40"
        },
        model: {
          value: t.addForm.noticeTitle,
          callback: function callback(e) {
            t.$set(t.addForm, "noticeTitle", e);
          },
          expression: "addForm.noticeTitle"
        }
      })], 1), t._v(" "), n("el-form-item", {
        staticClass: "editor-box",
        staticStyle: {
          display: "flex"
        },
        attrs: {
          prop: "noticeContent"
        }
      }, [n("label", {
        staticStyle: {
          width: "100px",
          "text-align": "right",
          "padding-right": "12px"
        },
        attrs: {
          "for": "name"
        }
      }, [n("span", {
        staticStyle: {
          color: "red",
          "line-height": "40px"
        }
      }, [t._v("*")]), t._v("正文  \n                             \n                ")]), t._v(" "), n("div", {
        ref: "editor",
        staticClass: "editor-text"
      })]), t._v(" "), t.noticeTip ? n("span", {
        staticStyle: {
          color: "#F56C6C",
          "margin-left": "100px"
        }
      }, [t._v("请输入通知内容")]) : t._e()], 1), t._v(" "), n("div", {
        staticClass: "row mt-20"
      }, [n("div", {
        staticClass: "form-group",
        staticStyle: {
          "margin-left": "112px"
        }
      }, [t.isRequst ? t._e() : n("button", {
        staticClass: "btn btn-primary",
        attrs: {
          type: "button",
          id: "btn-reset"
        },
        on: {
          click: function click(e) {
            t.addNotice("addForm", 1);
          }
        }
      }, [t._v("发布")]), t._v(" "), t.isRequst ? n("button", {
        staticClass: "btn btn-primary",
        attrs: {
          type: "button",
          id: "btn-reset"
        }
      }, [t._v("发布中")]) : t._e(), t._v(" "), t.isRequst1 ? t._e() : n("button", {
        staticClass: "btn btn-primary",
        attrs: {
          type: "button",
          id: "btn-back"
        },
        on: {
          click: function click(e) {
            t.addNotice("addForm", 0);
          }
        }
      }, [t._v("保存为草稿")]), t._v(" "), t.isRequst1 ? n("button", {
        staticClass: "btn btn-primary",
        attrs: {
          type: "button",
          id: "btn-back"
        }
      }, [t._v("保存中")]) : t._e(), t._v(" "), n("button", {
        staticClass: "btn btn-default",
        attrs: {
          type: "button"
        },
        on: {
          click: t.cancel
        }
      }, [t._v("取消")])])])], 1)]);
    },
        l = [function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;
      return n("section", {
        staticClass: "content-header"
      }, [n("h1", {
        staticClass: "nice"
      }, [t._v("\n      物业服务 - 通知公告\n        ")]), t._v(" "), n("ol", {
        staticClass: "breadcrumb"
      }, [n("li", [n("a", {
        attrs: {
          href: "/"
        }
      }, [n("i", {
        staticClass: "fa fa-home"
      }), t._v(" 首页\n          ")])]), t._v(" "), n("li", [n("i", {
        staticClass: "glyphicon glyphicon-dashboard"
      }), t._v(" 物业服务\n        ")]), t._v(" "), n("li", {
        staticClass: "active"
      }, [n("i", {
        staticClass: "glyphicon glyphicon-adjust"
      }), t._v(" 通知公告\n        ")])])]);
    }],
        d = {
      render: s,
      staticRenderFns: l
    },
        u = d,
        h = n("VU/8"),
        p = i,
        f = h(A, u, !1, p, "data-v-24ce28f1", null);

    e["default"] = f.exports;
  },
  "sYY+": function sYY(t, e, n) {
    !function (e, n) {
      t.exports = n();
    }(0, function () {
      "use strict";

      function t(t) {
        var e = void 0;
        return e = document.createElement("div"), e.innerHTML = t, e.children;
      }

      function e(t) {
        return !!t && (t instanceof HTMLCollection || t instanceof NodeList);
      }

      function n(t) {
        var n = document.querySelectorAll(t);
        return e(n) ? n : [n];
      }

      function i(o) {
        if (o) {
          if (o instanceof i) return o;
          this.selector = o;
          var r = o.nodeType,
              a = [];
          9 === r ? a = [o] : 1 === r ? a = [o] : e(o) || o instanceof Array ? a = o : "string" == typeof o && (o = o.replace("/\n/mg", "").trim(), a = 0 === o.indexOf("<") ? t(o) : n(o));
          var c = a.length;
          if (!c) return this;
          var A = void 0;

          for (A = 0; A < c; A++) {
            this[A] = a[A];
          }

          this.length = c;
        }
      }

      function o(t) {
        return new i(t);
      }

      function r(t, e) {
        var n = void 0;

        for (n in t) {
          if (t.hasOwnProperty(n) && !1 === e.call(t, n, t[n])) break;
        }
      }

      function a(t, e) {
        var n = void 0,
            i = void 0,
            o = t.length || 0;

        for (n = 0; n < o && (i = t[n], !1 !== e.call(t, i, n)); n++) {
          ;
        }
      }

      function c(t) {
        return t + Math.random().toString().slice(2);
      }

      function A(t) {
        return null == t ? "" : t.replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/(\r\n|\r|\n)/g, "<br/>");
      }

      function s(t) {
        return "function" == typeof t;
      }

      function l(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-bold"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function d(t, e) {
        var n = this,
            i = t.editor;
        this.menu = t, this.opt = e;
        var r = o('<div class="w-e-droplist"></div>'),
            a = e.$title,
            c = void 0;
        a && (c = a.html(), c = $(i, c), a.html(c), a.addClass("w-e-dp-title"), r.append(a));
        var A = e.list || [],
            s = e.type || "list",
            l = e.onClick || O,
            d = o('<ul class="' + ("list" === s ? "w-e-list" : "w-e-block") + '"></ul>');
        r.append(d), A.forEach(function (t) {
          var e = t.$elem,
              r = e.html();
          r = $(i, r), e.html(r);
          var a = t.value,
              c = o('<li class="w-e-item"></li>');
          e && (c.append(e), d.append(c), c.on("click", function (t) {
            l(a), n.hideTimeoutId = setTimeout(function () {
              n.hide();
            }, 0);
          }));
        }), r.on("mouseleave", function (t) {
          n.hideTimeoutId = setTimeout(function () {
            n.hide();
          }, 0);
        }), this.$container = r, this._rendered = !1, this._show = !1;
      }

      function u(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-header"></i></div>'), this.type = "droplist", this._active = !1, this.droplist = new d(this, {
          width: 100,
          $title: o("<p>设置标题</p>"),
          type: "list",
          list: [{
            $elem: o("<h1>H1</h1>"),
            value: "<h1>"
          }, {
            $elem: o("<h2>H2</h2>"),
            value: "<h2>"
          }, {
            $elem: o("<h3>H3</h3>"),
            value: "<h3>"
          }, {
            $elem: o("<h4>H4</h4>"),
            value: "<h4>"
          }, {
            $elem: o("<h5>H5</h5>"),
            value: "<h5>"
          }, {
            $elem: o("<p>正文</p>"),
            value: "<p>"
          }],
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function h(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-text-heigh"></i></div>'), this.type = "droplist", this._active = !1, this.droplist = new d(this, {
          width: 160,
          $title: o("<p>字号</p>"),
          type: "list",
          list: [{
            $elem: o('<span style="font-size: x-small;">x-small</span>'),
            value: "1"
          }, {
            $elem: o('<span style="font-size: small;">small</span>'),
            value: "2"
          }, {
            $elem: o("<span>normal</span>"),
            value: "3"
          }, {
            $elem: o('<span style="font-size: large;">large</span>'),
            value: "4"
          }, {
            $elem: o('<span style="font-size: x-large;">x-large</span>'),
            value: "5"
          }, {
            $elem: o('<span style="font-size: xx-large;">xx-large</span>'),
            value: "6"
          }],
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function p(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-font"></i></div>'), this.type = "droplist", this._active = !1;
        var n = t.config,
            i = n.fontNames || [];
        this.droplist = new d(this, {
          width: 100,
          $title: o("<p>字体</p>"),
          type: "list",
          list: i.map(function (t) {
            return {
              $elem: o('<span style="font-family: ' + t + ';">' + t + "</span>"),
              value: t
            };
          }),
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function f(t, e) {
        this.menu = t, this.opt = e;
      }

      function m(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>'), this.type = "panel", this._active = !1;
      }

      function g(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-italic"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function v(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-redo"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function w(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-strikethrough"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function E(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-underline"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function b(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-undo"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function C(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-list2"></i></div>'), this.type = "droplist", this._active = !1, this.droplist = new d(this, {
          width: 120,
          $title: o("<p>设置列表</p>"),
          type: "list",
          list: [{
            $elem: o('<span><i class="w-e-icon-list-numbered"></i> 有序列表</span>'),
            value: "insertOrderedList"
          }, {
            $elem: o('<span><i class="w-e-icon-list2"></i> 无序列表</span>'),
            value: "insertUnorderedList"
          }],
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function y(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-paragraph-left"></i></div>'), this.type = "droplist", this._active = !1, this.droplist = new d(this, {
          width: 100,
          $title: o("<p>对齐方式</p>"),
          type: "list",
          list: [{
            $elem: o('<span><i class="w-e-icon-paragraph-left"></i> 靠左</span>'),
            value: "justifyLeft"
          }, {
            $elem: o('<span><i class="w-e-icon-paragraph-center"></i> 居中</span>'),
            value: "justifyCenter"
          }, {
            $elem: o('<span><i class="w-e-icon-paragraph-right"></i> 靠右</span>'),
            value: "justifyRight"
          }],
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function x(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-pencil2"></i></div>'), this.type = "droplist";
        var n = t.config,
            i = n.colors || [];
        this._active = !1, this.droplist = new d(this, {
          width: 120,
          $title: o("<p>文字颜色</p>"),
          type: "inline-block",
          list: i.map(function (t) {
            return {
              $elem: o('<i style="color:' + t + ';" class="w-e-icon-pencil2"></i>'),
              value: t
            };
          }),
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function B(t) {
        var e = this;
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-paint-brush"></i></div>'), this.type = "droplist";
        var n = t.config,
            i = n.colors || [];
        this._active = !1, this.droplist = new d(this, {
          width: 120,
          $title: o("<p>背景色</p>"),
          type: "inline-block",
          list: i.map(function (t) {
            return {
              $elem: o('<i style="color:' + t + ';" class="w-e-icon-paint-brush"></i>'),
              value: t
            };
          }),
          onClick: function onClick(t) {
            e._command(t);
          }
        });
      }

      function I(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-quotes-left"></i>\n        </div>'), this.type = "click", this._active = !1;
      }

      function Q(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-terminal"></i>\n        </div>'), this.type = "panel", this._active = !1;
      }

      function _(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu">\n            <i class="w-e-icon-happy"></i>\n        </div>'), this.type = "panel", this._active = !1;
      }

      function S(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-table2"></i></div>'), this.type = "panel", this._active = !1;
      }

      function k(t) {
        this.editor = t, this.$elem = o('<div class="w-e-menu"><i class="w-e-icon-play"></i></div>'), this.type = "panel", this._active = !1;
      }

      function M(t) {
        this.editor = t;
        var e = c("w-e-img");
        this.$elem = o('<div class="w-e-menu" id="' + e + '"><i class="w-e-icon-image"></i></div>'), t.imgMenuId = e, this.type = "panel", this._active = !1;
      }

      function F(t) {
        this.editor = t, this.menus = {};
      }

      function D(t) {
        var e = t.clipboardData || t.originalEvent && t.originalEvent.clipboardData,
            n = void 0;
        return n = null == e ? window.clipboardData && window.clipboardData.getData("text") : e.getData("text/plain"), A(n);
      }

      function N(t, e, n) {
        var i = t.clipboardData || t.originalEvent && t.originalEvent.clipboardData,
            o = void 0,
            r = void 0;

        if (null == i ? o = window.clipboardData && window.clipboardData.getData("text") : (o = i.getData("text/plain"), r = i.getData("text/html")), !r && o && (r = "<p>" + A(o) + "</p>"), r) {
          var a = r.split("</html>");
          return 2 === a.length && (r = a[0]), r = r.replace(/<(meta|script|link).+?>/gim, ""), r = r.replace(/<!--.*?-->/gm, ""), r = r.replace(/\s?data-.+?=('|").+?('|")/gim, ""), n && (r = r.replace(/<img.+?>/gim, "")), r = e ? r.replace(/\s?(class|style)=('|").*?('|")/gim, "") : r.replace(/\s?class=('|").*?('|")/gim, "");
        }
      }

      function T(t) {
        var e = [];
        if (D(t)) return e;
        var n = t.clipboardData || t.originalEvent && t.originalEvent.clipboardData || {},
            i = n.items;
        return i ? (r(i, function (t, n) {
          /image/i.test(n.type) && e.push(n.getAsFile());
        }), e) : e;
      }

      function R(t) {
        var e = [];
        return (t.childNodes() || []).forEach(function (t) {
          var n = void 0,
              i = t.nodeType;

          if (3 === i && (n = t.textContent, n = A(n)), 1 === i) {
            n = {}, n.tag = t.nodeName.toLowerCase();

            for (var r = [], a = t.attributes || {}, c = a.length || 0, s = 0; s < c; s++) {
              var l = a[s];
              r.push({
                name: l.name,
                value: l.value
              });
            }

            n.attrs = r, n.children = R(o(t));
          }

          e.push(n);
        }), e;
      }

      function U(t) {
        this.editor = t;
      }

      function Y(t) {
        this.editor = t;
      }

      function P(t) {
        this.editor = t, this._currentRange = null;
      }

      function H(t) {
        this.editor = t, this._time = 0, this._isShow = !1, this._isRender = !1, this._timeoutId = 0, this.$textContainer = t.$textContainerElem, this.$bar = o('<div class="w-e-progress"></div>');
      }

      function L(t) {
        this.editor = t;
      }

      function j(t, e) {
        if (null == t) throw new Error("错误：初始化编辑器时候未传入任何参数，请查阅文档");
        this.id = "wangEditor-" + W++, this.toolbarSelector = t, this.textSelector = e, this.customConfig = {};
      }

      var z = [];
      i.prototype = {
        constructor: i,
        forEach: function forEach(t) {
          var e = void 0;

          for (e = 0; e < this.length; e++) {
            var n = this[e];
            if (!1 === t.call(n, n, e)) break;
          }

          return this;
        },
        clone: function clone(t) {
          var e = [];
          return this.forEach(function (n) {
            e.push(n.cloneNode(!!t));
          }), o(e);
        },
        get: function get(t) {
          var e = this.length;
          return t >= e && (t %= e), o(this[t]);
        },
        first: function first() {
          return this.get(0);
        },
        last: function last() {
          var t = this.length;
          return this.get(t - 1);
        },
        on: function on(t, e, n) {
          n || (n = e, e = null);
          var i = [];
          return i = t.split(/\s+/), this.forEach(function (t) {
            i.forEach(function (i) {
              if (i) {
                if (z.push({
                  elem: t,
                  type: i,
                  fn: n
                }), !e) return void t.addEventListener(i, n);
                t.addEventListener(i, function (t) {
                  var i = t.target;
                  i.matches(e) && n.call(i, t);
                });
              }
            });
          });
        },
        off: function off(t, e) {
          return this.forEach(function (n) {
            n.removeEventListener(t, e);
          });
        },
        attr: function attr(t, e) {
          return null == e ? this[0].getAttribute(t) : this.forEach(function (n) {
            n.setAttribute(t, e);
          });
        },
        addClass: function addClass(t) {
          return t ? this.forEach(function (e) {
            var n = void 0;
            e.className ? (n = e.className.split(/\s/), n = n.filter(function (t) {
              return !!t.trim();
            }), n.indexOf(t) < 0 && n.push(t), e.className = n.join(" ")) : e.className = t;
          }) : this;
        },
        removeClass: function removeClass(t) {
          return t ? this.forEach(function (e) {
            var n = void 0;
            e.className && (n = e.className.split(/\s/), n = n.filter(function (e) {
              return !(!(e = e.trim()) || e === t);
            }), e.className = n.join(" "));
          }) : this;
        },
        css: function css(t, e) {
          var n = t + ":" + e + ";";
          return this.forEach(function (e) {
            var i = (e.getAttribute("style") || "").trim(),
                o = void 0,
                r = [];
            i ? (o = i.split(";"), o.forEach(function (t) {
              var e = t.split(":").map(function (t) {
                return t.trim();
              });
              2 === e.length && r.push(e[0] + ":" + e[1]);
            }), r = r.map(function (e) {
              return 0 === e.indexOf(t) ? n : e;
            }), r.indexOf(n) < 0 && r.push(n), e.setAttribute("style", r.join("; "))) : e.setAttribute("style", n);
          });
        },
        show: function show() {
          return this.css("display", "block");
        },
        hide: function hide() {
          return this.css("display", "none");
        },
        children: function children() {
          var t = this[0];
          return t ? o(t.children) : null;
        },
        childNodes: function childNodes() {
          var t = this[0];
          return t ? o(t.childNodes) : null;
        },
        append: function append(t) {
          return this.forEach(function (e) {
            t.forEach(function (t) {
              e.appendChild(t);
            });
          });
        },
        remove: function remove() {
          return this.forEach(function (t) {
            if (t.remove) t.remove();else {
              var e = t.parentElement;
              e && e.removeChild(t);
            }
          });
        },
        isContain: function isContain(t) {
          var e = this[0],
              n = t[0];
          return e.contains(n);
        },
        getSizeData: function getSizeData() {
          return this[0].getBoundingClientRect();
        },
        getNodeName: function getNodeName() {
          return this[0].nodeName;
        },
        find: function find(t) {
          return o(this[0].querySelectorAll(t));
        },
        text: function text(t) {
          return t ? this.forEach(function (e) {
            e.innerHTML = t;
          }) : this[0].innerHTML.replace(/<.*?>/g, function () {
            return "";
          });
        },
        html: function html(t) {
          var e = this[0];
          return null == t ? e.innerHTML : (e.innerHTML = t, this);
        },
        val: function val() {
          return this[0].value.trim();
        },
        focus: function focus() {
          return this.forEach(function (t) {
            t.focus();
          });
        },
        parent: function parent() {
          return o(this[0].parentElement);
        },
        parentUntil: function parentUntil(t, e) {
          var n = document.querySelectorAll(t),
              i = n.length;
          if (!i) return null;
          var r = e || this[0];
          if ("BODY" === r.nodeName) return null;
          var a = r.parentElement,
              c = void 0;

          for (c = 0; c < i; c++) {
            if (a === n[c]) return o(a);
          }

          return this.parentUntil(t, a);
        },
        equal: function equal(t) {
          return 1 === t.nodeType ? this[0] === t : this[0] === t[0];
        },
        insertBefore: function insertBefore(t) {
          var e = o(t),
              n = e[0];
          return n ? this.forEach(function (t) {
            n.parentNode.insertBefore(t, n);
          }) : this;
        },
        insertAfter: function insertAfter(t) {
          var e = o(t),
              n = e[0];
          return n ? this.forEach(function (t) {
            var e = n.parentNode;
            e.lastChild === n ? e.appendChild(t) : e.insertBefore(t, n.nextSibling);
          }) : this;
        }
      }, o.offAll = function () {
        z.forEach(function (t) {
          var e = t.elem,
              n = t.type,
              i = t.fn;
          e.removeEventListener(n, i);
        });
      };
      var G = {
        menus: ["head", "bold", "fontSize", "fontName", "italic", "underline", "strikeThrough", "foreColor", "backColor", "link", "list", "justify", "quote", "emoticon", "image", "table", "video", "code", "undo", "redo"],
        fontNames: ["宋体", "微软雅黑", "Arial", "Tahoma", "Verdana"],
        colors: ["#000000", "#eeece0", "#1c487f", "#4d80bf", "#c24f4a", "#8baa4a", "#7b5ba1", "#46acc8", "#f9963b", "#ffffff"],
        emotions: [{
          title: "默认",
          type: "image",
          content: [{
            alt: "[坏笑]",
            src: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png"
          }, {
            alt: "[舔屏]",
            src: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png"
          }, {
            alt: "[污]",
            src: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png"
          }]
        }, {
          title: "新浪",
          type: "image",
          content: [{
            src: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",
            alt: "[草泥马]"
          }, {
            src: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif",
            alt: "[神马]"
          }, {
            src: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif",
            alt: "[浮云]"
          }]
        }, {
          title: "emoji",
          type: "emoji",
          content: "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐".split(/\s/)
        }],
        zIndex: 1e4,
        debug: !1,
        linkCheck: function linkCheck(t, e) {
          return !0;
        },
        linkImgCheck: function linkImgCheck(t) {
          return !0;
        },
        pasteFilterStyle: !0,
        pasteIgnoreImg: !1,
        pasteTextHandle: function pasteTextHandle(t) {
          return t;
        },
        showLinkImg: !0,
        linkImgCallback: function linkImgCallback(t) {},
        uploadImgMaxSize: 5242880,
        uploadImgShowBase64: !1,
        uploadFileName: "",
        uploadImgParams: {},
        uploadImgHeaders: {},
        withCredentials: !1,
        uploadImgTimeout: 1e4,
        uploadImgHooks: {
          before: function before(t, e, n) {},
          success: function success(t, e, n) {},
          fail: function fail(t, e, n) {},
          error: function error(t, e) {},
          timeout: function timeout(t, e) {}
        },
        qiniu: !1
      },
          J = {
        _ua: navigator.userAgent,
        isWebkit: function isWebkit() {
          return /webkit/i.test(this._ua);
        },
        isIE: function isIE() {
          return "ActiveXObject" in window;
        }
      };
      l.prototype = {
        constructor: l,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.isSelectionEmpty();
          n && e.selection.createEmptyRange(), e.cmd["do"]("bold"), n && (e.selection.collapseRange(), e.selection.restoreSelection());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e.cmd.queryCommandState("bold") ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      };

      var $ = function $(t, e) {
        var n = t.config.langArgs || [],
            i = e;
        return n.forEach(function (t) {
          var e = t.reg,
              n = t.val;
          e.test(i) && (i = i.replace(e, function () {
            return n;
          }));
        }), i;
      },
          O = function O() {};

      d.prototype = {
        constructor: d,
        show: function show() {
          this.hideTimeoutId && clearTimeout(this.hideTimeoutId);
          var t = this.menu,
              e = t.$elem,
              n = this.$container;

          if (!this._show) {
            if (this._rendered) n.show();else {
              var i = e.getSizeData().height || 0,
                  o = this.opt.width || 100;
              n.css("margin-top", i + "px").css("width", o + "px"), e.append(n), this._rendered = !0;
            }
            this._show = !0;
          }
        },
        hide: function hide() {
          this.showTimeoutId && clearTimeout(this.showTimeoutId);
          var t = this.$container;
          this._show && (t.hide(), this._show = !1);
        }
      }, u.prototype = {
        constructor: u,
        _command: function _command(t) {
          var e = this.editor,
              n = e.selection.getSelectionContainerElem();
          e.$textElem.equal(n) || e.cmd["do"]("formatBlock", t);
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem,
              i = /^h/i,
              o = e.cmd.queryCommandValue("formatBlock");
          i.test(o) ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, h.prototype = {
        constructor: h,
        _command: function _command(t) {
          this.editor.cmd["do"]("fontSize", t);
        }
      }, p.prototype = {
        constructor: p,
        _command: function _command(t) {
          this.editor.cmd["do"]("fontName", t);
        }
      };

      var V = function V() {},
          q = [];

      f.prototype = {
        constructor: f,
        show: function show() {
          var t = this,
              e = this.menu;

          if (!(q.indexOf(e) >= 0)) {
            var n = e.editor,
                i = o("body"),
                r = n.$textContainerElem,
                a = this.opt,
                c = o('<div class="w-e-panel-container"></div>'),
                A = a.width || 300;
            c.css("width", A + "px").css("margin-left", (0 - A) / 2 + "px");
            var s = o('<i class="w-e-icon-close w-e-panel-close"></i>');
            c.append(s), s.on("click", function () {
              t.hide();
            });
            var l = o('<ul class="w-e-panel-tab-title"></ul>'),
                d = o('<div class="w-e-panel-tab-content"></div>');
            c.append(l).append(d);
            var u = a.height;
            u && d.css("height", u + "px").css("overflow-y", "auto");
            var h = a.tabs || [],
                p = [],
                f = [];
            h.forEach(function (t, e) {
              if (t) {
                var i = t.title || "",
                    r = t.tpl || "";
                i = $(n, i), r = $(n, r);
                var a = o('<li class="w-e-item">' + i + "</li>");
                l.append(a);
                var c = o(r);
                d.append(c), a._index = e, p.push(a), f.push(c), 0 === e ? (a._active = !0, a.addClass("w-e-active")) : c.hide(), a.on("click", function (t) {
                  a._active || (p.forEach(function (t) {
                    t._active = !1, t.removeClass("w-e-active");
                  }), f.forEach(function (t) {
                    t.hide();
                  }), a._active = !0, a.addClass("w-e-active"), c.show());
                });
              }
            }), c.on("click", function (t) {
              t.stopPropagation();
            }), i.on("click", function (e) {
              t.hide();
            }), r.append(c), h.forEach(function (e, n) {
              if (e) {
                (e.events || []).forEach(function (e) {
                  var i = e.selector,
                      o = e.type,
                      r = e.fn || V;
                  f[n].find(i).on(o, function (e) {
                    e.stopPropagation(), r(e) && t.hide();
                  });
                });
              }
            });
            var m = c.find("input[type=text],textarea");
            m.length && m.get(0).focus(), this.$container = c, this._hideOtherPanels(), q.push(e);
          }
        },
        hide: function hide() {
          var t = this.menu,
              e = this.$container;
          e && e.remove(), q = q.filter(function (e) {
            return e !== t;
          });
        },
        _hideOtherPanels: function _hideOtherPanels() {
          q.length && q.forEach(function (t) {
            var e = t.panel || {};
            e.hide && e.hide();
          });
        }
      }, m.prototype = {
        constructor: m,
        onClick: function onClick(t) {
          var e = this.editor,
              n = void 0;

          if (this._active) {
            if (!(n = e.selection.getSelectionContainerElem())) return;
            e.selection.createRangeByElem(n), e.selection.restoreSelection(), this._createPanel(n.text(), n.attr("href"));
          } else e.selection.isSelectionEmpty() ? this._createPanel("", "") : this._createPanel(e.selection.getSelectionText(), "");
        },
        _createPanel: function _createPanel(t, e) {
          var n = this,
              i = c("input-link"),
              r = c("input-text"),
              a = c("btn-ok"),
              A = c("btn-del"),
              s = this._active ? "inline-block" : "none",
              l = new f(this, {
            width: 300,
            tabs: [{
              title: "链接",
              tpl: '<div>\n                            <input id="' + r + '" type="text" class="block" value="' + t + '" placeholder="链接文字"/></td>\n                            <input id="' + i + '" type="text" class="block" value="' + e + '" placeholder="http://..."/></td>\n                            <div class="w-e-button-container">\n                                <button id="' + a + '" class="right">插入</button>\n                                <button id="' + A + '" class="gray right" style="display:' + s + '">删除链接</button>\n                            </div>\n                        </div>',
              events: [{
                selector: "#" + a,
                type: "click",
                fn: function fn() {
                  var t = o("#" + i),
                      e = o("#" + r),
                      a = t.val(),
                      c = e.val();
                  return n._insertLink(c, a), !0;
                }
              }, {
                selector: "#" + A,
                type: "click",
                fn: function fn() {
                  return n._delLink(), !0;
                }
              }]
            }]
          });
          l.show(), this.panel = l;
        },
        _delLink: function _delLink() {
          if (this._active) {
            var t = this.editor;

            if (t.selection.getSelectionContainerElem()) {
              var e = t.selection.getSelectionText();
              t.cmd["do"]("insertHTML", "<span>" + e + "</span>");
            }
          }
        },
        _insertLink: function _insertLink(t, e) {
          var n = this.editor,
              i = n.config,
              o = i.linkCheck,
              r = !0;
          o && "function" == typeof o && (r = o(t, e)), !0 === r ? n.cmd["do"]("insertHTML", '<a href="' + e + '" target="_blank">' + t + "</a>") : alert(r);
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem,
              i = e.selection.getSelectionContainerElem();
          i && ("A" === i.getNodeName() ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active")));
        }
      }, g.prototype = {
        constructor: g,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.isSelectionEmpty();
          n && e.selection.createEmptyRange(), e.cmd["do"]("italic"), n && (e.selection.collapseRange(), e.selection.restoreSelection());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e.cmd.queryCommandState("italic") ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, v.prototype = {
        constructor: v,
        onClick: function onClick(t) {
          this.editor.cmd["do"]("redo");
        }
      }, w.prototype = {
        constructor: w,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.isSelectionEmpty();
          n && e.selection.createEmptyRange(), e.cmd["do"]("strikeThrough"), n && (e.selection.collapseRange(), e.selection.restoreSelection());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e.cmd.queryCommandState("strikeThrough") ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, E.prototype = {
        constructor: E,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.isSelectionEmpty();
          n && e.selection.createEmptyRange(), e.cmd["do"]("underline"), n && (e.selection.collapseRange(), e.selection.restoreSelection());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e.cmd.queryCommandState("underline") ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, b.prototype = {
        constructor: b,
        onClick: function onClick(t) {
          this.editor.cmd["do"]("undo");
        }
      }, C.prototype = {
        constructor: C,
        _command: function _command(t) {
          var e = this.editor,
              n = e.$textElem;

          if (e.selection.restoreSelection(), !e.cmd.queryCommandState(t)) {
            e.cmd["do"](t);
            var i = e.selection.getSelectionContainerElem();

            if ("LI" === i.getNodeName() && (i = i.parent()), !1 !== /^ol|ul$/i.test(i.getNodeName()) && !i.equal(n)) {
              var o = i.parent();
              o.equal(n) || (i.insertAfter(o), o.remove());
            }
          }
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e.cmd.queryCommandState("insertUnOrderedList") || e.cmd.queryCommandState("insertOrderedList") ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, y.prototype = {
        constructor: y,
        _command: function _command(t) {
          this.editor.cmd["do"](t);
        }
      }, x.prototype = {
        constructor: x,
        _command: function _command(t) {
          this.editor.cmd["do"]("foreColor", t);
        }
      }, B.prototype = {
        constructor: B,
        _command: function _command(t) {
          this.editor.cmd["do"]("backColor", t);
        }
      }, I.prototype = {
        constructor: I,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.getSelectionContainerElem(),
              i = n.getNodeName();
          if (!J.isIE()) return void ("BLOCKQUOTE" === i ? e.cmd["do"]("formatBlock", "<P>") : e.cmd["do"]("formatBlock", "<BLOCKQUOTE>"));
          var r = void 0,
              a = void 0;
          if ("P" === i) return r = n.text(), a = o("<blockquote>" + r + "</blockquote>"), a.insertAfter(n), void n.remove();
          "BLOCKQUOTE" === i && (r = n.text(), a = o("<p>" + r + "</p>"), a.insertAfter(n), n.remove());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem,
              i = /^BLOCKQUOTE$/i,
              o = e.cmd.queryCommandValue("formatBlock");
          i.test(o) ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      }, Q.prototype = {
        constructor: Q,
        onClick: function onClick(t) {
          var e = this.editor,
              n = e.selection.getSelectionStartElem(),
              i = e.selection.getSelectionEndElem(),
              r = e.selection.isSelectionEmpty(),
              a = e.selection.getSelectionText(),
              c = void 0;
          return n.equal(i) ? r ? void (this._active ? this._createPanel(n.html()) : this._createPanel()) : (c = o("<code>" + a + "</code>"), e.cmd["do"]("insertElem", c), e.selection.createRangeByElem(c, !1), void e.selection.restoreSelection()) : void e.selection.restoreSelection();
        },
        _createPanel: function _createPanel(t) {
          var e = this;
          t = t || "";
          var n = t ? "edit" : "new",
              i = c("texxt"),
              r = c("btn"),
              a = new f(this, {
            width: 500,
            tabs: [{
              title: "插入代码",
              tpl: '<div>\n                        <textarea id="' + i + '" style="height:145px;;">' + t + '</textarea>\n                        <div class="w-e-button-container">\n                            <button id="' + r + '" class="right">插入</button>\n                        </div>\n                    <div>',
              events: [{
                selector: "#" + r,
                type: "click",
                fn: function fn() {
                  var t = o("#" + i),
                      r = t.val() || t.html();
                  return r = A(r), "new" === n ? e._insertCode(r) : e._updateCode(r), !0;
                }
              }]
            }]
          });
          a.show(), this.panel = a;
        },
        _insertCode: function _insertCode(t) {
          this.editor.cmd["do"]("insertHTML", "<pre><code>" + t + "</code></pre><p><br></p>");
        },
        _updateCode: function _updateCode(t) {
          var e = this.editor,
              n = e.selection.getSelectionContainerElem();
          n && (n.html(t), e.selection.restoreSelection());
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem,
              i = e.selection.getSelectionContainerElem();

          if (i) {
            var o = i.parent();
            "CODE" === i.getNodeName() && "PRE" === o.getNodeName() ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
          }
        }
      }, _.prototype = {
        constructor: _,
        onClick: function onClick() {
          this._createPanel();
        },
        _createPanel: function _createPanel() {
          var t = this,
              e = this.editor,
              n = e.config,
              i = n.emotions || [],
              r = [];
          i.forEach(function (e) {
            var n = e.type,
                i = e.content || [],
                a = "";
            "emoji" === n && i.forEach(function (t) {
              t && (a += '<span class="w-e-item">' + t + "</span>");
            }), "image" === n && i.forEach(function (t) {
              var e = t.src,
                  n = t.alt;
              e && (a += '<span class="w-e-item"><img src="' + e + '" alt="' + n + '" data-w-e="1"/></span>');
            }), r.push({
              title: e.title,
              tpl: '<div class="w-e-emoticon-container">' + a + "</div>",
              events: [{
                selector: "span.w-e-item",
                type: "click",
                fn: function fn(e) {
                  var n = e.target,
                      i = o(n),
                      r = i.getNodeName(),
                      a = void 0;
                  return a = "IMG" === r ? i.parent().html() : "<span>" + i.html() + "</span>", t._insert(a), !0;
                }
              }]
            });
          });
          var a = new f(this, {
            width: 300,
            height: 200,
            tabs: r
          });
          a.show(), this.panel = a;
        },
        _insert: function _insert(t) {
          this.editor.cmd["do"]("insertHTML", t);
        }
      }, S.prototype = {
        constructor: S,
        onClick: function onClick() {
          this._active ? this._createEditPanel() : this._createInsertPanel();
        },
        _createInsertPanel: function _createInsertPanel() {
          var t = this,
              e = c("btn"),
              n = c("row"),
              i = c("col"),
              r = new f(this, {
            width: 250,
            tabs: [{
              title: "插入表格",
              tpl: '<div>\n                        <p style="text-align:left; padding:5px 0;">\n                            创建\n                            <input id="' + n + '" type="text" value="5" style="width:40px;text-align:center;"/>\n                            行\n                            <input id="' + i + '" type="text" value="5" style="width:40px;text-align:center;"/>\n                            列的表格\n                        </p>\n                        <div class="w-e-button-container">\n                            <button id="' + e + '" class="right">插入</button>\n                        </div>\n                    </div>',
              events: [{
                selector: "#" + e,
                type: "click",
                fn: function fn() {
                  var e = parseInt(o("#" + n).val()),
                      r = parseInt(o("#" + i).val());
                  return e && r && e > 0 && r > 0 && t._insert(e, r), !0;
                }
              }]
            }]
          });
          r.show(), this.panel = r;
        },
        _insert: function _insert(t, e) {
          var n = void 0,
              i = void 0,
              o = '<table border="0" width="100%" cellpadding="0" cellspacing="0">';

          for (n = 0; n < t; n++) {
            if (o += "<tr>", 0 === n) for (i = 0; i < e; i++) {
              o += "<th>&nbsp;</th>";
            } else for (i = 0; i < e; i++) {
              o += "<td>&nbsp;</td>";
            }
            o += "</tr>";
          }

          o += "</table><p><br></p>";
          var r = this.editor;
          r.cmd["do"]("insertHTML", o), r.cmd["do"]("enableObjectResizing", !1), r.cmd["do"]("enableInlineTableEditing", !1);
        },
        _createEditPanel: function _createEditPanel() {
          var t = this,
              e = c("add-row"),
              n = c("add-col"),
              i = c("del-row"),
              o = c("del-col"),
              r = c("del-table");
          new f(this, {
            width: 320,
            tabs: [{
              title: "编辑表格",
              tpl: '<div>\n                        <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                            <button id="' + e + '" class="left">增加行</button>\n                            <button id="' + i + '" class="red left">删除行</button>\n                            <button id="' + n + '" class="left">增加列</button>\n                            <button id="' + o + '" class="red left">删除列</button>\n                        </div>\n                        <div class="w-e-button-container">\n                            <button id="' + r + '" class="gray left">删除表格</button>\n                        </dv>\n                    </div>',
              events: [{
                selector: "#" + e,
                type: "click",
                fn: function fn() {
                  return t._addRow(), !0;
                }
              }, {
                selector: "#" + n,
                type: "click",
                fn: function fn() {
                  return t._addCol(), !0;
                }
              }, {
                selector: "#" + i,
                type: "click",
                fn: function fn() {
                  return t._delRow(), !0;
                }
              }, {
                selector: "#" + o,
                type: "click",
                fn: function fn() {
                  return t._delCol(), !0;
                }
              }, {
                selector: "#" + r,
                type: "click",
                fn: function fn() {
                  return t._delTable(), !0;
                }
              }]
            }]
          }).show();
        },
        _getLocationData: function _getLocationData() {
          var t = {},
              e = this.editor,
              n = e.selection.getSelectionContainerElem();

          if (n) {
            var i = n.getNodeName();

            if ("TD" === i || "TH" === i) {
              var o = n.parent(),
                  r = o.children(),
                  a = r.length;
              r.forEach(function (e, i) {
                if (e === n[0]) return t.td = {
                  index: i,
                  elem: e,
                  length: a
                }, !1;
              });
              var c = o.parent(),
                  A = c.children(),
                  s = A.length;
              return A.forEach(function (e, n) {
                if (e === o[0]) return t.tr = {
                  index: n,
                  elem: e,
                  length: s
                }, !1;
              }), t;
            }
          }
        },
        _addRow: function _addRow() {
          var t = this._getLocationData();

          if (t) {
            var e = t.tr,
                n = o(e.elem),
                i = t.td,
                r = i.length,
                a = document.createElement("tr"),
                c = "",
                A = void 0;

            for (A = 0; A < r; A++) {
              c += "<td>&nbsp;</td>";
            }

            a.innerHTML = c, o(a).insertAfter(n);
          }
        },
        _addCol: function _addCol() {
          var t = this._getLocationData();

          if (t) {
            var e = t.tr,
                n = t.td,
                i = n.index;
            o(e.elem).parent().children().forEach(function (t) {
              var e = o(t),
                  n = e.children(),
                  r = n.get(i),
                  a = r.getNodeName().toLowerCase();
              o(document.createElement(a)).insertAfter(r);
            });
          }
        },
        _delRow: function _delRow() {
          var t = this._getLocationData();

          if (t) {
            o(t.tr.elem).remove();
          }
        },
        _delCol: function _delCol() {
          var t = this._getLocationData();

          if (t) {
            var e = t.tr,
                n = t.td,
                i = n.index;
            o(e.elem).parent().children().forEach(function (t) {
              o(t).children().get(i).remove();
            });
          }
        },
        _delTable: function _delTable() {
          var t = this.editor,
              e = t.selection.getSelectionContainerElem();

          if (e) {
            var n = e.parentUntil("table");
            n && n.remove();
          }
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem,
              i = e.selection.getSelectionContainerElem();

          if (i) {
            var o = i.getNodeName();
            "TD" === o || "TH" === o ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
          }
        }
      }, k.prototype = {
        constructor: k,
        onClick: function onClick() {
          this._createPanel();
        },
        _createPanel: function _createPanel() {
          var t = this,
              e = c("text-val"),
              n = c("btn"),
              i = new f(this, {
            width: 350,
            tabs: [{
              title: "插入视频",
              tpl: '<div>\n                        <input id="' + e + '" type="text" class="block" placeholder="格式如：<iframe src=... ></iframe>"/>\n                        <div class="w-e-button-container">\n                            <button id="' + n + '" class="right">插入</button>\n                        </div>\n                    </div>',
              events: [{
                selector: "#" + n,
                type: "click",
                fn: function fn() {
                  var n = o("#" + e),
                      i = n.val().trim();
                  return i && t._insert(i), !0;
                }
              }]
            }]
          });
          i.show(), this.panel = i;
        },
        _insert: function _insert(t) {
          this.editor.cmd["do"]("insertHTML", t + "<p><br></p>");
        }
      }, M.prototype = {
        constructor: M,
        onClick: function onClick() {
          this.editor.config.qiniu || (this._active ? this._createEditPanel() : this._createInsertPanel());
        },
        _createEditPanel: function _createEditPanel() {
          var t = this.editor,
              e = c("width-30"),
              n = c("width-50"),
              i = c("width-100"),
              o = c("del-btn"),
              r = [{
            title: "编辑图片",
            tpl: '<div>\n                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">最大宽度：</span>\n                        <button id="' + e + '" class="left">30%</button>\n                        <button id="' + n + '" class="left">50%</button>\n                        <button id="' + i + '" class="left">100%</button>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button id="' + o + '" class="gray left">删除图片</button>\n                    </dv>\n                </div>',
            events: [{
              selector: "#" + e,
              type: "click",
              fn: function fn() {
                var e = t._selectedImg;
                return e && e.css("max-width", "30%"), !0;
              }
            }, {
              selector: "#" + n,
              type: "click",
              fn: function fn() {
                var e = t._selectedImg;
                return e && e.css("max-width", "50%"), !0;
              }
            }, {
              selector: "#" + i,
              type: "click",
              fn: function fn() {
                var e = t._selectedImg;
                return e && e.css("max-width", "100%"), !0;
              }
            }, {
              selector: "#" + o,
              type: "click",
              fn: function fn() {
                var e = t._selectedImg;
                return e && e.remove(), !0;
              }
            }]
          }],
              a = new f(this, {
            width: 300,
            tabs: r
          });
          a.show(), this.panel = a;
        },
        _createInsertPanel: function _createInsertPanel() {
          var t = this.editor,
              e = t.uploadImg,
              n = t.config,
              i = c("up-trigger"),
              r = c("up-file"),
              a = c("link-url"),
              A = c("link-btn"),
              s = [{
            title: "上传图片",
            tpl: '<div class="w-e-up-img-container">\n                    <div id="' + i + '" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="' + r + '" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>',
            events: [{
              selector: "#" + i,
              type: "click",
              fn: function fn() {
                var t = o("#" + r),
                    e = t[0];
                if (!e) return !0;
                e.click();
              }
            }, {
              selector: "#" + r,
              type: "change",
              fn: function fn() {
                var t = o("#" + r),
                    n = t[0];
                if (!n) return !0;
                var i = n.files;
                return i.length && e.uploadImg(i), !0;
              }
            }]
          }, {
            title: "网络图片",
            tpl: '<div>\n                    <input id="' + a + '" type="text" class="block" placeholder="图片链接"/></td>\n                    <div class="w-e-button-container">\n                        <button id="' + A + '" class="right">插入</button>\n                    </div>\n                </div>',
            events: [{
              selector: "#" + A,
              type: "click",
              fn: function fn() {
                var t = o("#" + a),
                    n = t.val().trim();
                return n && e.insertLinkImg(n), !0;
              }
            }]
          }],
              l = [];
          (n.uploadImgShowBase64 || n.uploadImgServer || n.customUploadImg) && window.FileReader && l.push(s[0]), n.showLinkImg && l.push(s[1]);
          var d = new f(this, {
            width: 300,
            tabs: l
          });
          d.show(), this.panel = d;
        },
        tryChangeActive: function tryChangeActive(t) {
          var e = this.editor,
              n = this.$elem;
          e._selectedImg ? (this._active = !0, n.addClass("w-e-active")) : (this._active = !1, n.removeClass("w-e-active"));
        }
      };
      var K = {};
      K.bold = l, K.head = u, K.fontSize = h, K.fontName = p, K.link = m, K.italic = g, K.redo = v, K.strikeThrough = w, K.underline = E, K.undo = b, K.list = C, K.justify = y, K.foreColor = x, K.backColor = B, K.quote = I, K.code = Q, K.emoticon = _, K.table = S, K.video = k, K.image = M, F.prototype = {
        constructor: F,
        init: function init() {
          var t = this,
              e = this.editor;
          ((e.config || {}).menus || []).forEach(function (n) {
            var i = K[n];
            i && "function" == typeof i && (t.menus[n] = new i(e));
          }), this._addToToolbar(), this._bindEvent();
        },
        _addToToolbar: function _addToToolbar() {
          var t = this.editor,
              e = t.$toolbarElem,
              n = this.menus,
              i = t.config,
              o = i.zIndex + 1;
          r(n, function (t, n) {
            var i = n.$elem;
            i && (i.css("z-index", o), e.append(i));
          });
        },
        _bindEvent: function _bindEvent() {
          var t = this.menus,
              e = this.editor;
          r(t, function (t, n) {
            var i = n.type;

            if (i) {
              var o = n.$elem,
                  r = n.droplist;
              n.panel;
              "click" === i && n.onClick && o.on("click", function (t) {
                null != e.selection.getRange() && n.onClick(t);
              }), "droplist" === i && r && o.on("mouseenter", function (t) {
                null != e.selection.getRange() && (r.showTimeoutId = setTimeout(function () {
                  r.show();
                }, 200));
              }).on("mouseleave", function (t) {
                r.hideTimeoutId = setTimeout(function () {
                  r.hide();
                }, 0);
              }), "panel" === i && n.onClick && o.on("click", function (t) {
                t.stopPropagation(), null != e.selection.getRange() && n.onClick(t);
              });
            }
          });
        },
        changeActive: function changeActive() {
          r(this.menus, function (t, e) {
            e.tryChangeActive && setTimeout(function () {
              e.tryChangeActive();
            }, 100);
          });
        }
      }, U.prototype = {
        constructor: U,
        init: function init() {
          this._bindEvent();
        },
        clear: function clear() {
          this.html("<p><br></p>");
        },
        html: function html(t) {
          var e = this.editor,
              n = e.$textElem,
              i = void 0;
          if (null == t) return i = n.html(), i = i.replace(/\u200b/gm, ""), i;
          n.html(t), e.initSelection();
        },
        getJSON: function getJSON() {
          return R(this.editor.$textElem);
        },
        text: function text(t) {
          var e = this.editor,
              n = e.$textElem,
              i = void 0;
          if (null == t) return i = n.text(), i = i.replace(/\u200b/gm, ""), i;
          n.text("<p>" + t + "</p>"), e.initSelection();
        },
        append: function append(t) {
          var e = this.editor;
          e.$textElem.append(o(t)), e.initSelection();
        },
        _bindEvent: function _bindEvent() {
          this._saveRangeRealTime(), this._enterKeyHandle(), this._clearHandle(), this._pasteHandle(), this._tabHandle(), this._imgHandle(), this._dragHandle();
        },
        _saveRangeRealTime: function _saveRangeRealTime() {
          function t(t) {
            e.selection.saveRange(), e.menus.changeActive();
          }

          var e = this.editor,
              n = e.$textElem;
          n.on("keyup", t), n.on("mousedown", function (e) {
            n.on("mouseleave", t);
          }), n.on("mouseup", function (e) {
            t(), n.off("mouseleave", t);
          });
        },
        _enterKeyHandle: function _enterKeyHandle() {
          function t(t) {
            var e = o("<p><br></p>");
            e.insertBefore(t), i.selection.createRangeByElem(e, !0), i.selection.restoreSelection(), t.remove();
          }

          function e(e) {
            var n = i.selection.getSelectionContainerElem(),
                o = n.parent();
            if ("<code><br></code>" === o.html()) return void t(n);

            if (o.equal(r)) {
              "P" !== n.getNodeName() && (n.text() || t(n));
            }
          }

          function n(t) {
            var e = i.selection.getSelectionContainerElem();

            if (e) {
              var n = e.parent(),
                  r = e.getNodeName(),
                  a = n.getNodeName();

              if ("CODE" === r && "PRE" === a && i.cmd.queryCommandSupported("insertHTML")) {
                if (!0 === i._willBreakCode) {
                  var c = o("<p><br></p>");
                  return c.insertAfter(n), i.selection.createRangeByElem(c, !0), i.selection.restoreSelection(), i._willBreakCode = !1, void t.preventDefault();
                }

                var A = i.selection.getRange().startOffset;
                i.cmd["do"]("insertHTML", "\n"), i.selection.saveRange(), i.selection.getRange().startOffset === A && i.cmd["do"]("insertHTML", "\n");
                var s = e.html().length;
                i.selection.getRange().startOffset + 1 === s && (i._willBreakCode = !0), t.preventDefault();
              }
            }
          }

          var i = this.editor,
              r = i.$textElem;
          r.on("keyup", function (t) {
            13 === t.keyCode && e(t);
          }), r.on("keydown", function (t) {
            if (13 !== t.keyCode) return void (i._willBreakCode = !1);
            n(t);
          });
        },
        _clearHandle: function _clearHandle() {
          var t = this.editor,
              e = t.$textElem;
          e.on("keydown", function (t) {
            if (8 === t.keyCode) {
              return "<p><br></p>" === e.html().toLowerCase().trim() ? void t.preventDefault() : void 0;
            }
          }), e.on("keyup", function (n) {
            if (8 === n.keyCode) {
              var i = void 0,
                  r = e.html().toLowerCase().trim();
              r && "<br>" !== r || (i = o("<p><br/></p>"), e.html(""), e.append(i), t.selection.createRangeByElem(i, !1, !0), t.selection.restoreSelection());
            }
          });
        },
        _pasteHandle: function _pasteHandle() {
          function t() {
            var t = Date.now(),
                e = !1;
            return t - A >= 100 && (e = !0), A = t, e;
          }

          function e() {
            A = 0;
          }

          var n = this.editor,
              i = n.config,
              o = i.pasteFilterStyle,
              r = i.pasteTextHandle,
              a = i.pasteIgnoreImg,
              c = n.$textElem,
              A = 0;
          c.on("paste", function (i) {
            if (!J.isIE() && (i.preventDefault(), t())) {
              var c = N(i, o, a),
                  A = D(i);
              A = A.replace(/\n/gm, "<br>");
              var l = n.selection.getSelectionContainerElem();

              if (l) {
                var d = l.getNodeName();
                if ("CODE" === d || "PRE" === d) return r && s(r) && (A = "" + (r(A) || "")), void n.cmd["do"]("insertHTML", "<p>" + A + "</p>");
                if (!c) return void e();

                try {
                  r && s(r) && (c = "" + (r(c) || "")), n.cmd["do"]("insertHTML", c);
                } catch (t) {
                  r && s(r) && (A = "" + (r(A) || "")), n.cmd["do"]("insertHTML", "<p>" + A + "</p>");
                }
              }
            }
          }), c.on("paste", function (e) {
            if (!J.isIE() && (e.preventDefault(), t())) {
              var i = T(e);

              if (i && i.length) {
                var o = n.selection.getSelectionContainerElem();

                if (o) {
                  var r = o.getNodeName();

                  if ("CODE" !== r && "PRE" !== r) {
                    n.uploadImg.uploadImg(i);
                  }
                }
              }
            }
          });
        },
        _tabHandle: function _tabHandle() {
          var t = this.editor;
          t.$textElem.on("keydown", function (e) {
            if (9 === e.keyCode && t.cmd.queryCommandSupported("insertHTML")) {
              var n = t.selection.getSelectionContainerElem();

              if (n) {
                var i = n.parent(),
                    o = n.getNodeName(),
                    r = i.getNodeName();
                "CODE" === o && "PRE" === r ? t.cmd["do"]("insertHTML", "    ") : t.cmd["do"]("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;"), e.preventDefault();
              }
            }
          });
        },
        _imgHandle: function _imgHandle() {
          var t = this.editor,
              e = t.$textElem;
          e.on("click", "img", function (e) {
            var n = this,
                i = o(n);
            "1" !== i.attr("data-w-e") && (t._selectedImg = i, t.selection.createRangeByElem(i), t.selection.restoreSelection());
          }), e.on("click  keyup", function (e) {
            e.target.matches("img") || (t._selectedImg = null);
          });
        },
        _dragHandle: function _dragHandle() {
          var t = this.editor;
          o(document).on("dragleave drop dragenter dragover", function (t) {
            t.preventDefault();
          }), t.$textElem.on("drop", function (e) {
            e.preventDefault();
            var n = e.dataTransfer && e.dataTransfer.files;
            n && n.length && t.uploadImg.uploadImg(n);
          });
        }
      }, Y.prototype = {
        constructor: Y,
        "do": function _do(t, e) {
          var n = this.editor;

          if (n._useStyleWithCSS || (document.execCommand("styleWithCSS", null, !0), n._useStyleWithCSS = !0), n.selection.getRange()) {
            n.selection.restoreSelection();
            var i = "_" + t;
            this[i] ? this[i](e) : this._execCommand(t, e), n.menus.changeActive(), n.selection.saveRange(), n.selection.restoreSelection(), n.change && n.change();
          }
        },
        _insertHTML: function _insertHTML(t) {
          var e = this.editor,
              n = e.selection.getRange();
          this.queryCommandSupported("insertHTML") ? this._execCommand("insertHTML", t) : n.insertNode ? (n.deleteContents(), n.insertNode(o(t)[0])) : n.pasteHTML && n.pasteHTML(t);
        },
        _insertElem: function _insertElem(t) {
          var e = this.editor,
              n = e.selection.getRange();
          n.insertNode && (n.deleteContents(), n.insertNode(t[0]));
        },
        _execCommand: function _execCommand(t, e) {
          document.execCommand(t, !1, e);
        },
        queryCommandValue: function queryCommandValue(t) {
          return document.queryCommandValue(t);
        },
        queryCommandState: function queryCommandState(t) {
          return document.queryCommandState(t);
        },
        queryCommandSupported: function queryCommandSupported(t) {
          return document.queryCommandSupported(t);
        }
      }, P.prototype = {
        constructor: P,
        getRange: function getRange() {
          return this._currentRange;
        },
        saveRange: function saveRange(t) {
          if (t) return void (this._currentRange = t);
          var e = window.getSelection();

          if (0 !== e.rangeCount) {
            var n = e.getRangeAt(0),
                i = this.getSelectionContainerElem(n);

            if (i && "false" !== i.attr("contenteditable") && !i.parentUntil("[contenteditable=false]")) {
              this.editor.$textElem.isContain(i) && (this._currentRange = n);
            }
          }
        },
        collapseRange: function collapseRange(t) {
          null == t && (t = !1);
          var e = this._currentRange;
          e && e.collapse(t);
        },
        getSelectionText: function getSelectionText() {
          return this._currentRange ? this._currentRange.toString() : "";
        },
        getSelectionContainerElem: function getSelectionContainerElem(t) {
          t = t || this._currentRange;
          var e = void 0;
          if (t) return e = t.commonAncestorContainer, o(1 === e.nodeType ? e : e.parentNode);
        },
        getSelectionStartElem: function getSelectionStartElem(t) {
          t = t || this._currentRange;
          var e = void 0;
          if (t) return e = t.startContainer, o(1 === e.nodeType ? e : e.parentNode);
        },
        getSelectionEndElem: function getSelectionEndElem(t) {
          t = t || this._currentRange;
          var e = void 0;
          if (t) return e = t.endContainer, o(1 === e.nodeType ? e : e.parentNode);
        },
        isSelectionEmpty: function isSelectionEmpty() {
          var t = this._currentRange;
          return !(!t || !t.startContainer || t.startContainer !== t.endContainer || t.startOffset !== t.endOffset);
        },
        restoreSelection: function restoreSelection() {
          var t = window.getSelection();
          t.removeAllRanges(), t.addRange(this._currentRange);
        },
        createEmptyRange: function createEmptyRange() {
          var t = this.editor,
              e = this.getRange(),
              n = void 0;
          if (e && this.isSelectionEmpty()) try {
            J.isWebkit() ? (t.cmd["do"]("insertHTML", "&#8203;"), e.setEnd(e.endContainer, e.endOffset + 1), this.saveRange(e)) : (n = o("<strong>&#8203;</strong>"), t.cmd["do"]("insertElem", n), this.createRangeByElem(n, !0));
          } catch (t) {}
        },
        createRangeByElem: function createRangeByElem(t, e, n) {
          if (t.length) {
            var i = t[0],
                o = document.createRange();
            n ? o.selectNodeContents(i) : o.selectNode(i), "boolean" == typeof e && o.collapse(e), this.saveRange(o);
          }
        }
      }, H.prototype = {
        constructor: H,
        show: function show(t) {
          var e = this;

          if (!this._isShow) {
            this._isShow = !0;
            var n = this.$bar;
            if (this._isRender) this._isRender = !0;else {
              this.$textContainer.append(n);
            }
            Date.now() - this._time > 100 && t <= 1 && (n.css("width", 100 * t + "%"), this._time = Date.now());
            var i = this._timeoutId;
            i && clearTimeout(i), i = setTimeout(function () {
              e._hide();
            }, 500);
          }
        },
        _hide: function _hide() {
          this.$bar.remove(), this._time = 0, this._isShow = !1, this._isRender = !1;
        }
      };
      var X = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      };
      L.prototype = {
        constructor: L,
        _alert: function _alert(t, e) {
          var n = this.editor,
              i = n.config.debug,
              o = n.config.customAlert;
          if (i) throw new Error("wangEditor: " + (e || t));
          o && "function" == typeof o ? o(t) : alert(t);
        },
        insertLinkImg: function insertLinkImg(t) {
          var e = this;

          if (t) {
            var n = this.editor,
                i = n.config,
                o = i.linkImgCheck,
                r = void 0;
            if (o && "function" == typeof o && "string" == typeof (r = o(t))) return void alert(r);
            n.cmd["do"]("insertHTML", '<img src="' + t + '" style="max-width:100%;"/>');
            var a = document.createElement("img");
            a.onload = function () {
              var e = i.linkImgCallback;
              e && "function" == typeof e && e(t), a = null;
            }, a.onerror = function () {
              a = null, e._alert("插入图片错误", 'wangEditor: 插入图片出错，图片链接是 "' + t + '"，下载该链接失败');
            }, a.onabort = function () {
              a = null;
            }, a.src = t;
          }
        },
        uploadImg: function uploadImg(t) {
          var e = this;

          if (t && t.length) {
            var n = this.editor,
                i = n.config,
                o = i.uploadImgServer,
                c = i.uploadImgShowBase64,
                A = i.uploadImgMaxSize,
                s = A / 1024 / 1024,
                l = i.uploadImgMaxLength || 1e4,
                d = i.uploadFileName || "",
                u = i.uploadImgParams || {},
                h = i.uploadImgParamsWithUrl,
                p = i.uploadImgHeaders || {},
                f = i.uploadImgHooks || {},
                m = i.uploadImgTimeout || 3e3,
                g = i.withCredentials;
            null == g && (g = !1);
            var v = i.customUploadImg;

            if (v || o || c) {
              var w = [],
                  E = [];
              if (a(t, function (t) {
                var e = t.name,
                    n = t.size;
                if (e && n) return !1 === /\.(jpg|jpeg|png|bmp|gif|webp)$/i.test(e) ? void E.push("【" + e + "】不是图片") : A < n ? void E.push("【" + e + "】大于 " + s + "M") : void w.push(t);
              }), E.length) return void this._alert("图片验证未通过: \n" + E.join("\n"));
              if (w.length > l) return void this._alert("一次最多上传" + l + "张图片");
              if (v && "function" == typeof v) return void v(w, this.insertLinkImg.bind(this));
              var b = new FormData();

              if (a(w, function (t) {
                var e = d || t.name;
                b.append(e, t);
              }), o && "string" == typeof o) {
                var C = o.split("#");
                o = C[0];
                var y = C[1] || "";
                r(u, function (t, e) {
                  h && (o.indexOf("?") > 0 ? o += "&" : o += "?", o = o + t + "=" + e), b.append(t, e);
                }), y && (o += "#" + y);
                var x = new XMLHttpRequest();

                if (x.open("POST", o), x.timeout = m, x.ontimeout = function () {
                  f.timeout && "function" == typeof f.timeout && f.timeout(x, n), e._alert("上传图片超时");
                }, x.upload && (x.upload.onprogress = function (t) {
                  var e = void 0,
                      i = new H(n);
                  t.lengthComputable && (e = t.loaded / t.total, i.show(e));
                }), x.onreadystatechange = function () {
                  var t = void 0;

                  if (4 === x.readyState) {
                    if (x.status < 200 || x.status >= 300) return f.error && "function" == typeof f.error && f.error(x, n), void e._alert("上传图片发生错误", "上传图片发生错误，服务器返回状态是 " + x.status);
                    if (t = x.responseText, "object" !== (void 0 === t ? "undefined" : X(t))) try {
                      t = JSON.parse(t);
                    } catch (i) {
                      return f.fail && "function" == typeof f.fail && f.fail(x, n, t), void e._alert("上传图片失败", "上传图片返回结果错误，返回结果是: " + t);
                    }

                    if (f.customInsert || "0" == t.errno) {
                      if (f.customInsert && "function" == typeof f.customInsert) f.customInsert(e.insertLinkImg.bind(e), t, n);else {
                        (t.data || []).forEach(function (t) {
                          e.insertLinkImg(t);
                        });
                      }
                      f.success && "function" == typeof f.success && f.success(x, n, t);
                    } else f.fail && "function" == typeof f.fail && f.fail(x, n, t), e._alert("上传图片失败", "上传图片返回结果错误，返回结果 errno=" + t.errno);
                  }
                }, f.before && "function" == typeof f.before) {
                  var B = f.before(x, n, w);
                  if (B && "object" === (void 0 === B ? "undefined" : X(B)) && B.prevent) return void this._alert(B.msg);
                }

                return r(p, function (t, e) {
                  x.setRequestHeader(t, e);
                }), x.withCredentials = g, void x.send(b);
              }

              c && a(t, function (t) {
                var n = e,
                    i = new FileReader();
                i.readAsDataURL(t), i.onload = function () {
                  n.insertLinkImg(this.result);
                };
              });
            }
          }
        }
      };
      var W = 1;
      j.prototype = {
        constructor: j,
        _initConfig: function _initConfig() {
          var t = {};
          this.config = Object.assign(t, G, this.customConfig);
          var e = this.config.lang || {},
              n = [];
          r(e, function (t, e) {
            n.push({
              reg: new RegExp(t, "img"),
              val: e
            });
          }), this.config.langArgs = n;
        },
        _initDom: function _initDom() {
          var t = this,
              e = this.toolbarSelector,
              n = o(e),
              i = this.textSelector,
              r = this.config,
              a = r.zIndex,
              A = void 0,
              s = void 0,
              l = void 0,
              d = void 0;
          null == i ? (A = o("<div></div>"), s = o("<div></div>"), d = n.children(), n.append(A).append(s), A.css("backg -color", "#f1f1f1").css("border", "1px solid #ccc"), s.css("border", "1px solid #ccc").css("border-top", "none").css("height", "300px")) : (A = n, s = o(i), d = s.children()), l = o("<div></div>"), l.attr("contenteditable", "true").css("width", "100%").css("height", "100%"), d && d.length ? l.append(d) : l.append(o("<p><br></p>")), s.append(l), A.addClass("w-e-toolbar"), s.addClass("w-e-text-container"), s.css("z-index", a), l.addClass("w-e-text");
          var u = c("toolbar-elem");
          A.attr("id", u);
          var h = c("text-elem");
          l.attr("id", h), this.$toolbarElem = A, this.$textContainerElem = s, this.$textElem = l, this.toolbarElemId = u, this.textElemId = h;
          var p = !0;
          s.on("compositionstart", function () {
            p = !1;
          }), s.on("compositionend", function () {
            p = !0;
          }), s.on("click keyup", function () {
            p && t.change && t.change();
          }), A.on("click", function () {
            this.change && this.change();
          }), (r.onfocus || r.onblur) && (this.isFocus = !1, o(document).on("click", function (e) {
            var n = l.isContain(o(e.target)),
                i = A.isContain(o(e.target)),
                r = A[0] == e.target;
            if (n) t.isFocus || t.onfocus && t.onfocus(), t.isFocus = !0;else {
              if (i && !r) return;
              t.isFocus && t.onblur && t.onblur(), t.isFocus = !1;
            }
          }));
        },
        _initCommand: function _initCommand() {
          this.cmd = new Y(this);
        },
        _initSelectionAPI: function _initSelectionAPI() {
          this.selection = new P(this);
        },
        _initUploadImg: function _initUploadImg() {
          this.uploadImg = new L(this);
        },
        _initMenus: function _initMenus() {
          this.menus = new F(this), this.menus.init();
        },
        _initText: function _initText() {
          this.txt = new U(this), this.txt.init();
        },
        initSelection: function initSelection(t) {
          var e = this.$textElem,
              n = e.children();
          if (!n.length) return e.append(o("<p><br></p>")), void this.initSelection();
          var i = n.last();

          if (t) {
            var r = i.html().toLowerCase(),
                a = i.getNodeName();
            if ("<br>" !== r && "<br/>" !== r || "P" !== a) return e.append(o("<p><br></p>")), void this.initSelection();
          }

          this.selection.createRangeByElem(i, !1, !0), this.selection.restoreSelection();
        },
        _bindEvent: function _bindEvent() {
          var t = 0,
              e = this.txt.html(),
              n = this.config,
              i = n.onchangeTimeout;
          (!(i = parseInt(i, 10)) || i <= 0) && (i = 200);
          var o = n.onchange;
          o && "function" == typeof o && (this.change = function () {
            var n = this.txt.html();
            n.length === e.length && n === e || (t && clearTimeout(t), t = setTimeout(function () {
              o(n), e = n;
            }, i));
          });
          var r = n.onblur;
          r && "function" == typeof r && (this.onblur = function () {
            var t = this.txt.html();
            r(t);
          });
          var a = n.onfocus;
          a && "function" == typeof a && (this.onfocus = function () {
            a();
          });
        },
        create: function create() {
          this._initConfig(), this._initDom(), this._initCommand(), this._initSelectionAPI(), this._initText(), this._initMenus(), this._initUploadImg(), this.initSelection(!0), this._bindEvent();
        },
        _offAllEvent: function _offAllEvent() {
          o.offAll();
        }
      };

      try {
        document;
      } catch (t) {
        throw new Error("请在浏览器环境下运行");
      }

      !function () {
        "function" != typeof Object.assign && (Object.assign = function (t, e) {
          if (null == t) throw new TypeError("Cannot convert undefined or null to object");

          for (var n = Object(t), i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (null != o) for (var r in o) {
              Object.prototype.hasOwnProperty.call(o, r) && (n[r] = o[r]);
            }
          }

          return n;
        }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
          for (var e = (this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;) {
            ;
          }

          return n > -1;
        });
      }();
      var Z = document.createElement("style");
      return Z.type = "text/css", Z.innerHTML = '.w-e-toolbar,.w-e-text-container,.w-e-menu-panel {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-toolbar *,.w-e-text-container *,.w-e-menu-panel * {  padding: 0;  margin: 0;  box-sizing: border-box;}.w-e-clear-fix:after {  content: "";  display: table;  clear: both;}.w-e-toolbar .w-e-droplist {  position: absolute;  left: 0;  top: 0;  backg -color: #fff;  border: 1px solid #f1f1f1;  border-right-color: #ccc;  border-bottom-color: #ccc;}.w-e-toolbar .w-e-droplist .w-e-dp-title {  text-align: center;  color: #999;  line-height: 2;  border-bottom: 1px solid #f1f1f1;  font-size: 13px;}.w-e-toolbar .w-e-droplist ul.w-e-list {  list-style: none;  line-height: 1;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {  color: #333;  padding: 5px 0;}.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item:hover {  backg -color: #f1f1f1;}.w-e-toolbar .w-e-droplist ul.w-e-block {  list-style: none;  text-align: left;  padding: 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {  display: inline-block;  *display: inline;  *zoom: 1;  padding: 3px 5px;}.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {  backg -color: #f1f1f1;}@font-face {  font-family: \'w-e-icon\';  src: url(data:application/x-font-woff;charset=utf-8;base64,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) format(\'truetype\');  font-weight: normal;  font-style: normal;}[class^="w-e-icon-"],[class*=" w-e-icon-"] {  /* use !important to prevent issues with browser extensions that change fonts */  font-family: \'w-e-icon\' !important;  speak: none;  font-style: normal;  font-weight: normal;  font-variant: normal;  text-transform: none;  line-height: 1;  /* Better Font Rendering =========== */  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}.w-e-icon-close:before {  content: "\\f00d";}.w-e-icon-upload2:before {  content: "\\e9c6";}.w-e-icon-trash-o:before {  content: "\\f014";}.w-e-icon-header:before {  content: "\\f1dc";}.w-e-icon-pencil2:before {  content: "\\e906";}.w-e-icon-paint-brush:before {  content: "\\f1fc";}.w-e-icon-image:before {  content: "\\e90d";}.w-e-icon-play:before {  content: "\\e912";}.w-e-icon-location:before {  content: "\\e947";}.w-e-icon-undo:before {  content: "\\e965";}.w-e-icon-redo:before {  content: "\\e966";}.w-e-icon-quotes-left:before {  content: "\\e977";}.w-e-icon-list-numbered:before {  content: "\\e9b9";}.w-e-icon-list2:before {  content: "\\e9bb";}.w-e-icon-link:before {  content: "\\e9cb";}.w-e-icon-happy:before {  content: "\\e9df";}.w-e-icon-bold:before {  content: "\\ea62";}.w-e-icon-underline:before {  content: "\\ea63";}.w-e-icon-italic:before {  content: "\\ea64";}.w-e-icon-strikethrough:before {  content: "\\ea65";}.w-e-icon-table2:before {  content: "\\ea71";}.w-e-icon-paragraph-left:before {  content: "\\ea77";}.w-e-icon-paragraph-center:before {  content: "\\ea78";}.w-e-icon-paragraph-right:before {  content: "\\ea79";}.w-e-icon-terminal:before {  content: "\\f120";}.w-e-icon-page-break:before {  content: "\\ea68";}.w-e-icon-cancel-circle:before {  content: "\\ea0d";}.w-e-icon-font:before {  content: "\\ea5c";}.w-e-icon-text-heigh:before {  content: "\\ea5f";}.w-e-toolbar {  display: -webkit-box;  display: -ms-flexbox;  display: flex;  padding: 0 5px;  /* flex-wrap: wrap; */  /* 单个菜单 */}.w-e-toolbar .w-e-menu {  position: relative;  text-align: center;  padding: 5px 10px;  cursor: pointer;}.w-e-toolbar .w-e-menu i {  color: #999;}.w-e-toolbar .w-e-menu:hover i {  color: #333;}.w-e-toolbar .w-e-active i {  color: #1e88e5;}.w-e-toolbar .w-e-active:hover i {  color: #1e88e5;}.w-e-text-container .w-e-panel-container {  position: absolute;  top: 0;  left: 50%;  border: 1px solid #ccc;  border-top: 0;  box-shadow: 1px 1px 2px #ccc;  color: #333;  backg -color: #fff;  /* 为 emotion panel 定制的样式 */  /* 上传图片的 panel 定制样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-close {  position: absolute;  right: 0;  top: 0;  padding: 5px;  margin: 2px 5px 0 0;  cursor: pointer;  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-close:hover {  color: #333;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title {  list-style: none;  display: -webkit-box;  display: -ms-flexbox;  display: flex;  font-size: 14px;  margin: 2px 10px 0 10px;  border-bottom: 1px solid #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-item {  padding: 3px 5px;  color: #999;  cursor: pointer;  margin: 0 3px;  position: relative;  top: 1px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-title .w-e-active {  color: #333;  border-bottom: 1px solid #333;  cursor: default;  font-weight: 700;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content {  padding: 10px 15px 10px 15px;  font-size: 16px;  /* 输入框的样式 */  /* 按钮的样式 */}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus,.w-e-text-container .w-e-panel-container .w-e-panel-tab-content button:focus {  outline: none;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea {  width: 100%;  border: 1px solid #ccc;  padding: 5px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content textarea:focus {  border-color: #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text] {  border: none;  border-bottom: 1px solid #ccc;  font-size: 14px;  height: 20px;  color: #333;  text-align: left;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].small {  width: 30px;  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].block {  display: block;  width: 100%;  margin: 10px 0;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text]:focus {  border-bottom: 2px solid #1e88e5;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button {  font-size: 14px;  color: #1e88e5;  border: none;  padding: 5px 10px;  backg -color: #fff;  cursor: pointer;  border-radius: 3px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.left {  float: left;  margin-right: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.right {  float: right;  margin-left: 10px;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.gray {  color: #999;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.red {  color: #c24f4a;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button:hover {  backg -color: #f1f1f1;}.w-e-text-container .w-e-panel-container .w-e-panel-tab-content .w-e-button-container:after {  content: "";  display: table;  clear: both;}.w-e-text-container .w-e-panel-container .w-e-emoticon-container .w-e-item {  cursor: pointer;  font-size: 18px;  padding: 0 3px;  display: inline-block;  *display: inline;  *zoom: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container {  text-align: center;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn {  display: inline-block;  *display: inline;  *zoom: 1;  color: #999;  cursor: pointer;  font-size: 60px;  line-height: 1;}.w-e-text-container .w-e-panel-container .w-e-up-img-container .w-e-up-btn:hover {  color: #333;}.w-e-text-container {  position: relative;}.w-e-text-container .w-e-progress {  position: absolute;  backg -color: #1e88e5;  bottom: 0;  left: 0;  height: 1px;}.w-e-text {  padding: 0 10px;  overflow-y: scroll;}.w-e-text p,.w-e-text h1,.w-e-text h2,.w-e-text h3,.w-e-text h4,.w-e-text h5,.w-e-text table,.w-e-text pre {  margin: 10px 0;  line-height: 1.5;}.w-e-text ul,.w-e-text ol {  margin: 10px 0 10px 20px;}.w-e-text blockquote {  display: block;  border-left: 8px solid #d0e5f2;  padding: 5px 10px;  margin: 10px 0;  line-height: 1.4;  font-size: 100%;  backg -color: #f1f1f1;}.w-e-text code {  display: inline-block;  *display: inline;  *zoom: 1;  backg -color: #f1f1f1;  border-radius: 3px;  padding: 3px 5px;  margin: 0 3px;}.w-e-text pre code {  display: block;}.w-e-text table {  border-top: 1px solid #ccc;  border-left: 1px solid #ccc;}.w-e-text table td,.w-e-text table th {  border-bottom: 1px solid #ccc;  border-right: 1px solid #ccc;  padding: 3px 5px;}.w-e-text table th {  border-bottom: 2px solid #ccc;  text-align: center;}.w-e-text:focus {  outline: none;}.w-e-text img {  cursor: pointer;}.w-e-text img:hover {  box-shadow: 0 0 5px #333;}', document.getElementsByTagName("HEAD").item(0).appendChild(Z), window.wangEditor || j;
    });
  },
  zOAw: function zOAw(t, e, n) {
    e = t.exports = n("FZ+f")(!1), e.push([t.i, "\n.add-notice[data-v-24ce28f1] .editor-box .el-form-item__content{margin-left:0 !important\n}\n.add-notice[data-v-24ce28f1] .el-form-item__content{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%\n}\n.add-notice[data-v-24ce28f1] .editor-text{width:80%;height:580px;z-index:2\n}\n.add-notice[data-v-24ce28f1] .w-e-text-container{height:520px !important\n}\n.add-notice[data-v-24ce28f1] .el-form-item__label{width:100px;margin-right:5px\n}\n.add-notice[data-v-24ce28f1] .el-form-item.is-required{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n", ""]);
  }
});