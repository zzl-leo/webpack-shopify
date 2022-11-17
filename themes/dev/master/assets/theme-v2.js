/**
 * shopify common event, in order to be compatible with lower version browsers, please use ES5 syntax as much as possible
 * anthor: garfield, 10/15/2021
 */

 var $http = {
  cr: "US",

  host: function() {
    return "https://api.myjackery.com";
    // if(location.href.indexOf("myshopify.com") === -1) { // 线上店铺
    //   return "https://api.myjackery.com";
    // }
    // return "https://demo-api.myjackery.com";
  },

  h: function() {
    const _lang = Shopify.locale || ""
    var token = localStorage.getItem('JACKERY_USER_TOKEN') || cookie.get("_jk_user"), headers = { 'Content-Type': 'application/json;charset=utf8', "cr": this.cr, "lang": _lang.toUpperCase() };
    token && (headers.jackeryToken = token);
    return headers
  },

  errorReport: function(uri, data, r) {
    if (uri.indexOf("/v1/com/log") < 0) {
      // shopCommon.toast("Oops, something went wrong, Please try again later. " + (r.readyState === undefined ? -1 : r.readyState), 5000, 'red');
      setTimeout(function() {
        var request = typeof(data) === "object" ? JSON.stringify(data) : data;
        var response = typeof(r) === "object" ? JSON.stringify(r) : r;
        $api.errorLog({
          "uri": uri, "request_data": request, "response_data": response
        })
      }, 1000)
    }
  },

  g: function(url) {
    return fetch(url, { method: 'GET', mode: 'cors' }).then(function(r) {
      return r.json();
    })
  },

  p: function(url, data) {
    return fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(data), mode: 'cors'
    }).then(function(r) {
      return r.json();
    })
  },

  // compatible low version broswer
  request: function(type, u, d, s, e) {
    $.ajax({
      method: type, url: this.host() + "/userapi" + u, dataType: 'json', data: d, timeout: 15000, headers: this.h(),
      success: function(r) {
        switch (r.code) {
          case 0:
            e && e(r);
            shopCommon.toast(r.message, 5000, 'red');
            break;
          case 200: s && s(r.data); break;
          case 10000:
            e && e(r);
            $api.shopifyLogout();
          break;
          default: e && e(r); break;
        }
      },
      error: function(r) {
        e && e(r);
        $http.errorReport(u, d, r)
      }
    })
  },

  ajax: function(t, u, d, s, e) {
    $.ajax({
      method: t, url: u, data: d, contentType: "application/json", dataType: 'json', timeout: 15000,
      header: {'Content-Type': 'application/json; charset=UTF-8'},
      beforeSend: function (XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader("cr", $http.cr);
        XMLHttpRequest.setRequestHeader("lang", (Shopify.locale || "").toUpperCase());
      },
      success: function(r) {
        switch (r.code) {
          case 0:
            e && e(r);
            shopCommon.toast(r.message, 5000, 'red');
            break;
          case 200: s && s(r.data); break;
          case 30001: case 30002:
            e && e(r);
            shopCommon.toast("The Order ID does not exist, please try a different one. ", 5000, 'red');
            break;
          case 50005:
            e && e(r);
            shopCommon.toast("The email provided has been used.", 5000, 'red');
            break;
          case 2005: case 2006: case 61001: case 61002: case 61004:
            e && e(r);
            break;
          default:
            e && e(r);
            shopCommon.toast("Oops, something went wrong, Please try again later. code: " + (r.code || 500), 5000, 'red');
            break;
        }
      },
      error: function(r) {
        e && e(r);
        $http.errorReport(u, d, r)
      }
    })
  },

  post: function(t, d, n, a) {
    $.ajax({
      method: "POST", url: t, data: d, timeout: 15000,
      headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "cr": $http.cr, "lang": (Shopify.locale || "").toUpperCase()},
      success: function(r) {
        switch (r.code) {
          case 0:
            a && a(r);
            shopCommon.toast(r.message, 5000, 'red');
            break;
          case 200: n && n(r.data); break;
          case 50005:
            a && a(r);
            shopCommon.toast("The email provided has been used.", 5000, 'red');
            break;
          default: a && a(r); break;
        }
      },
      error: function(r) {
        a && a(r);
        $http.errorReport(t, d, r)
      }
    })
  }
};

var $api = {
  // in the normal, use USD currency reset checkout page.
  updateCurrency: function(currency) {
    var f = new FormData();
    f.append("form_type", "currency"); f.append("utf8", "✓"); f.append("currency", currency);
    return fetch("/cart/update", { method: "POST", body: f })
  },

  shopifyLogout: function() {
    $http.g("/account/logout").finally(function() {
      localStorage.removeItem("JACKERY_USER_TOKEN");
      cookie.erase("_jk_user");
      location.reload()
    })
  },

  shopifySection: function(section, s, e) {
    $http.ajax("GET", "/?sections=" + section, null, s, e)
  },

  shopifyUserCheck: function() {
    $http.request("GET", "/v1/user/check", null)
  },

  getCouponInfo: function(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-coupon/info", d, s, e)
  },

  batchCouponInfo: function(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-coupon/batch-info", d, s, e)
  },

  orderRegister: function(d, s, e) {
    $http.ajax("POST", $http.host() + "/v1/order/register", d, s, e)
  },

  getGuarantee: function(d, s, e) {
    $http.ajax("POST", $http.host() + "/v1/order/product-guarantee-info", d, s, e)
  },

  updateGuarantee: function(d, s, e) {
    $http.ajax("POST", $http.host() + "/v1/order/product-guarantee-edit", d, s, e)
  },

  shortage: function(d, s, e) {
    $http.post($http.host() + "/v1/notice/add", d, s, e)
  },

  // jackery day collection for answer active email
  jkdCollectEmail: function(d, s, e) {
    $http.ajax("POST", $http.host() + "/v1/notice/collect-email", d, s, e)
  },

  // jackery day answer question
  jkdAddAnswer: function(d, s, e) {
    $http.ajax("POST", $http.host() + "/v1/notice/add-answer", d, s, e)
  },

  // get server time
  getServerTime: function(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/com/get-server-time", d, s, e)
  },

  // error
  errorLog: function(d, s, e) {
    $http.post($http.host() + "/v1/com/log", d, s, e)
  },

  // get notify current info
  notifyInfo: function(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-message/info", d, s, e)
  },

  // notify popup
  notifyPopup: function(d, s, e) {
    $http.post($http.host() + "/v1/app-message/popup", d, s, e)
  }
};


var cookie = {
  set: function(name, value, exDays) {
    let d = new Date(), host = location.host;
    exDays = exDays || 7;
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toGMTString()}`;

    if (host.split('.').length === 1) {
      document.cookie = `${name}=${value}; ${expires}; path=/`
    } else {
      let domainParts = host.split('.');
      domainParts.shift();
      let domain = '.'+domainParts.join('.');
      document.cookie = `${name}=${value}; ${expires}; path=/; domain=${domain}`
    }
  },

  get: function(name) {
    var arr = null;
    var reg = new RegExp('(^| )'+name+'=([^;]*)(;|$)');
    if (document.cookie && (arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  erase: function(name) {
    this.set(name, "", -1)
  }
};

var _$$ = function(entity) {
  return entity ? document.querySelector(entity) : null
};

var $all = function(entity) {
  // return entity ? document.querySelectorAll(entity) : []
  return entity ? $(entity).get() : []
};

// common function, include check product register / email / mobile / date...etc.
var shopCommon = {
  isSiteOrderId: function (site, str) {
    var reg = {
      us: /^#{0,1}[0-9]{4,10}$/,
      ca: /^(ca){0,1}[0-9]{4,10}$/i,
      uk: /^(uk){0,1}[0-9]{4,10}$/i,
      de: /^(de){0,1}[0-9]{4,10}$/i
    };
    return reg[site].test(str)
  },

  isAmazonOrderId: function (str) {
    var amazon_reg = /^[0-9]{3}-[0-9]{7}-[0-9]{7}$/
    return amazon_reg.test(str)
  },

  isWalmartOrderId: function (str) {
    var Walmart_reg = /^(WM-){0,1}[0-9]{13,14}$/i
    return Walmart_reg.test(str)
  },

  checkOrderId: function () {
    var that = 'input[name="out_order_sn"]'
    if ($('input[name="purchase_channel"]').val() === 'jackery.com') {
      $(that).val() ?
        shopCommon.isSiteOrderId('us', $(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else if ($('input[name="purchase_channel"]').val() === 'ca.jackery.com') {
      $(that).val() ?
        shopCommon.isSiteOrderId('ca', $(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else if ($('input[name="purchase_channel"]').val() === 'de.jackery.com') {
      $(that).val() ?
        shopCommon.isSiteOrderId('de', $(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else if ($('input[name="purchase_channel"]').val() === 'uk.jackery.com') {
      $(that).val() ?
        shopCommon.isSiteOrderId('uk', $(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else if ($('input[name="purchase_channel"]').val() === 'Amazon') {
      $(that).val() ?
        shopCommon.isAmazonOrderId($(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else if ($('input[name="purchase_channel"]').val() === 'Walmart') {
      $(that).val() ?
        shopCommon.isWalmartOrderId($(that).val().replace(/\s+/g, '')) ? ($(that).parent().removeClass("input-tips") && $(that).parent().removeClass("order-check")) : ($(that).parent().addClass("input-tips") && $(that).parent().addClass("order-check"))
        : ($(that).parent().addClass("input-tips") && $(that).parent().removeClass("order-check"));
    } else {
      $(that).parent().removeClass("order-check");
      $(that).val() ? $(that).parent().removeClass("input-tips") : $(that).parent().addClass("input-tips");
    }
  },

  verifyEmail: function (str) {
    var reg = /^[A-Za-z0-9._%+!`#$^-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,8}$/;
    return reg.test(str)
  },
  
  isMobile: function() {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS|BlackBerry|webOS)/i)
  },

  isEmpty: function(v) {
    switch (typeof v) {
      case 'undefined':
        return true;
      case 'string':
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
        break;
      case 'boolean':
        if (!v) return true;
        break;
      case 'number':
        if (0 === v || isNaN(v)) return true;
        break;
      case 'object':
        if (null === v || v.length === 0) return true;
        for (var i in v) {
          return false;
        }
        return true;
    }
    return false
  },

  padLeftZero: function(str) { return ('00' + str).substr(str.length) },

  formatDate: function(date, fmt, timestamp) {
    fmt = fmt || 'YYYY/MM/DD';
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return timestamp ? new Date(fmt).getTime() : fmt
  },

  // get browser param, compatible with non-standard url param
  getParam: function(variable) {
    function nonstandard() {
      var v = location.href.split("&");
      v.splice(0, 1);
      return v
    }
    var query = window.location.search.substring(1), vars = query ? query.split("&") : nonstandard();
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) { return decodeURI(pair[1]) }
    }
    return false
  },
  
  toast: function(msg, duration, _class, db) {
    var m = document.createElement('aside');
    m.className = "yToast " + _class;
    m.innerHTML = msg;
    document.body.appendChild(m);
    setTimeout(function() { document.body.removeChild(m); db && db() }, duration || 3000)
  },

  modal: function(title, content, _class, db) {
    var dom = '<i class="mask"></i>' +
    '<div class="y-modal-body">' +
      '<svg class="icon icon-close" viewBox="0 0 64 64"><path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>' +
      '<h3>' + title + '</h3>' + '<p>' + content  + '</p>' +
    '</div>';
    var m = document.createElement('aside');
    m.className = "yModal " + _class || '';
    m.innerHTML = dom;
    document.body.appendChild(m);

    _$$(".yModal .icon-close").onclick = _$$(".yModal .mask").onclick = function () {
      document.body.removeChild(m); db && db()
    }
  },

  isCopy: function(ele, text) {
    var me = this;
    ele.onclick = function(e) {
      e.preventDefault();
      if (window.clipboardData) {
        window.clipboardData.setData('text', text);
      } else {
        (function(s){
        document.oncopy = function(e) {
          e.clipboardData.setData('text', s);
          e.preventDefault();
          document.oncopy = null
        }
        })(text);
        document.execCommand('Copy');
      }
      me.toast('code: '+ text +' Copied!')
    }
  },

  scrollToTop: function(position) {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (cb) {
        return setTimeout(cb, 17)
      }
    }
    
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    
    var step = function() {
      var distance = position - scrollTop;
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, position)
      } else {
        window.scrollTo(0, scrollTop);
        requestAnimationFrame(step)
      }
    };
    step()
  },

  countTime: function(target, current, element, callback) {
		var me = this;
		//time different, d,h,m,s save countdown
		var leftTime = target - current, d, h, m, s;
		if (leftTime >= 0) {
			d = Math.floor(leftTime/1000/60/60/24);
			h = Math.floor(leftTime/1000/60/60%24);
			m = Math.floor(leftTime/1000/60%60);
			s = Math.floor(leftTime/1000%60);
			
      if (element) {
        element.querySelector('._days').innerText = String(d).padStart(2, "0");
        element.querySelector('._hours').innerText = String(h).padStart(2, "0");
        element.querySelector('._mins').innerText = String(m).padStart(2, "0");
        element.querySelector('._secs').innerText = String(s).padStart(2, "0")
      }
			
			setTimeout(function() { me.countTime(target, current + 1000, eleySelectment, callback) }, 1000)
		} else {
			// countdown end
      callback && callback()
		}
	},

  // create y-select element sharing mode
  ySelect: function(name, data) {
    if (!$('.y-select-'+ name +' .y-select-option').length) {
      var ele = '<p class="p ellipsis"></p><svg fill="currentColor" viewBox="64 64 896 896"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg><div class="y-select-option"><ul></ul></div>';
      $('.y-select-'+ name).append(ele);
    }
    
    var container = $('.y-select-'+ name +' .y-select-option'),
      p = $('.y-select-'+ name +' .p'),
      ul = container.find("ul"),
      input = $('input[name="'+ name +'"]');

    // initial value
    p.html('<i>- please select -</i>');
    input.val('');
      
    container.css("height", data.length > 10 ? '270px' : data.length * 30 + 'px');
    
    function load(start, end) {
      var option = data.slice(start, end), li = '';
      option.forEach(function(item) {
        key = typeof item.key === 'number' ? item.name : item.key;
        li += '<li class="ellipsis" data-key="'+ key  +'"> ' + item.name + ' </li>'
      })
      ul.html(li);
      
      ul.find("li").each(function() {
        var that = this;
        $(that).click(function() {
          input.val($(that).data("key"));
          p.html($(that).html());
          setTimeout(function () { input.blur() }, 10);
          
          $('input[name="out_order_sn"]').val() ? shopCommon.checkOrderId() : '';
          
          let text = '';
          switch ($('input[name="purchase_channel"]').val()) {
            case "jackery.com": text = "(e.g: #XXXXX)"; break;
            case "uk.jackery.com": text = "(e.g: UKXXXX)"; break;
            case "de.jackery.com": text = "(e.g: DEXXXX)"; break;
            case "ca.jackery.com": text = "(e.g: CAXXXX)"; break;
            case "Amazon": text = "(e.g: 123-1234567-1234567)"; break;
            case "Walmart": text = "(e.g: WM-XXXXXXXXXXXXX)"; break;
            default: text = ""; break;
          }
          $('.J-tips-text').text(text)
        })
      })
    }
    
    load(0, data.length)
    // if (data.length > 20) {
    //   load(0, 20);
      
    //   var cur = 0;
    //   container.scroll(function() {
    //     var start = container.scrollTop() / 30 | 0;
    //     ul.css("transform", ("translateY(" + container.scrollTop() + "px)"));
    //     if (start !== cur) {
    //       load(start, start + 20);
    //       cur = start
    //     }
    //   });
    // } else {
    //   load(0, data.length)
    // }
  },

  init: function() {
    var jackeryToken = this.getParam('jackery_token') || localStorage.getItem("JACKERY_USER_TOKEN") || cookie.get("_jk_user");
    document.querySelector(".jka") && document.querySelector(".jka").removeAttribute("target");

    if (jackeryToken) {
      !localStorage.getItem("JACKERY_USER_TOKEN") && localStorage.setItem("JACKERY_USER_TOKEN", jackeryToken);
      !cookie.get("_jk_user") && cookie.set("_jk_user", jackeryToken);

      var _url = document.querySelector(".goToJackeryAccount");
      if (_url && _url.href.indexOf("&jackery_token=") < 0) {
        _url.href += ("&jackery_token=" + jackeryToken)
      }
    }
    
    var me = this, navChildNav = $all(".left-nav li"), navChildProduct = $all(".right-product .child-style");
    navChildNav.forEach((item, index, arr) => {
      item.onmouseover = () => {
        arr.forEach((e, i) => {
          e.classList.remove("on");
          navChildProduct[i].classList.remove("on")
        });
        item.classList.add("on");
        navChildProduct[index].classList.add("on")
      }
    })
    
    // global site click
    var mask = _$$(".flag-mask");
    mask && (mask.onclick = () => {
      document.querySelector(".flag input").checked = false
    })
    
    // mobile nav clikc hover
    $(".nav li:not(.left-nav li), .theme-v2-footer .information dl").each(function() {
      var me = this;
      $(me).click(function(e) {
        e.stopPropagation();
        $(me).hasClass("hover") ? $(me).removeClass("hover") : $(me).addClass("hover")
      })
    })
    

    // float layer
    $(".float-layer li").each(function() {
      $(this).click(function() {
        switch ($(this).data("type")) {
          case "top": me.scrollToTop(0); break;
          case "back": window.history.back(-1); break;
          case "home": window.location.href = "/"; break;
          case "support": window.location.href = "/pages/support"; break;
        }
      })
    })

    // sales advantage
    $(".theme-v2-after-sales li").each(function() {
      $(this).click(function() {
        shopCommon.modal($(this).data("title"), $(this).data("content"))
      })
    })

    window.addEventListener("scroll", function() {
      const t_ = _$$(".float-layer li:first-child")
      t_ && (t_.style.display = window.pageYOffset > 300 ? "" : "none")
    })
  },

  homePage: function() {
    console.log("theme new template start, 23/11/2021, garfield");
    
    // blog posts pager
    var blogPager = () => {
      var ul = _$$(".blog-posts ul"), progress = _$$(".blog-posts .progress"),
        arrowLeft = _$$(".blog-posts .arrow.left"), arrowRight = _$$(".blog-posts .arrow.right"), pageSize = window.innerWidth > 780 ? 3 : 2;
		
	  if (!ul) { return }
        
      var item = ul.querySelectorAll("li").length, current = 0, page = Math.ceil(item / pageSize);
      // ul.style = `width: ${464 * item}px; grid-template-columns: repeat(${item}, 1fr);`;
      ul.style = ("--item: " + item);
      
      var _onClick = (n) => {
        current += n;
        ul.style.transform =("translateX(" + -current * (ul.parentNode.offsetWidth + 20) + "px)");
        progress.style = ("--item: " + item + "; --page: " + page + "; --progress: " + current / page * 100 + "%;");
        if (current <= 0) {
          arrowLeft.classList.add("disable");
          arrowRight.classList.remove("disable")
        } else if (current >= (item / pageSize - 1)) {
          arrowLeft.classList.remove("disable");
          arrowRight.classList.add("disable")
        } else {
          arrowLeft.classList.remove("disable");
          arrowRight.classList.remove("disable")
        }
      }
      _onClick(0);
      arrowLeft.onclick = () => _onClick(-1);
      arrowRight.onclick = () => _onClick(1);
    };
    
    blogPager()
    
    window.addEventListener("scroll", function() {
      var top = window.pageYOffset, layers = document.querySelectorAll(".layer"),
        header = document.querySelector(".theme-v2-header"), main = document.querySelector("main");
    
      // // response for navigator
      if (top >= window.innerHeight / 2) {
        header.className.indexOf("start") < 0 && header.classList.add("start")
      } else {
        header.classList.remove("start")
      }
      
      // response for content
      layers.forEach(item => {
        if (top + window.innerHeight / 2 >= main.offsetTop + item.offsetTop) {
          if (item.className.indexOf("start") < 0) {
            item.classList.add("start");
          }
        } else {
          item.classList.remove("start")
        }
      })
    })
  },

  productRegister: function() {
		var category = [
      {"key":"solar-generator","name":"Solar Generator"},
      {"key":"portable-power-stations","name":"Portable Power Station"},
      {"key":"solar-panel","name":"Solar Panel"},
      {"key":"accessories","name":"Accessories"}
    ];
    var products = {
      "solar-generator": [
        "Solar Generator 160 (Explorer 160 + SolarSaga 60W)",
        "Solar Generator 240 (Explorer 240 + SolarSaga 60W)",
        "Solar Generator 290 (Explorer 290 + SolarSaga 100W)",
        "Solar Generator 300 (Explorer 300 + SolarSaga 100W)",
        "Solar Generator 500 (Explorer 500 + SolarSaga 100W)",
        "Solar Generator 550 (Explorer 550 + SolarSaga 100W)",
        "Solar Generator 880 (Explorer 880 + SolarSaga 100W)",
        "Solar Generator 880 (Explorer 880 + 2 x SolarSaga 100W)",
        "Solar Generator 1000 (Explorer 1000 + SolarSaga 100W)",
        "Solar Generator 1000 (Explorer 1000 + 2 x SolarSaga 100W)",
        "Solar Generator 1000 (Explorer 1000 + 2 x SolarSaga 100X)",
        "Solar Generator 1000 Pro (Explorer 1000 Pro + 2 x SolarSaga 80W)",
        "Solar Generator 1000 Pro (Explorer 1000 Pro + 4 x SolarSaga 200W)",
        "Solar Generator 1500 (Explorer 1500 + SolarSaga 100W)",
        "Solar Generator 1500 (Explorer 1500 + 2 x SolarSaga 100X)",
        "Solar Generator 1500 (Explorer 1500 + 4 x SolarSaga 100W)",
        "Solar Generator 2000 (Explorer 2000 + 4 x SolarSaga 200W)",
        "Solar Generator 2000 Pro (Explorer 2000 Pro + 2 x SolarSaga 200W)",
        "Solar Generator 2000 Pro (Explorer 2000 Pro + 4 x SolarSaga 200W)",
        "Solar Generator 2000 Pro (Explorer 2000 Pro + 6 x SolarSaga 200W)",
        "Solar Generator 290880Kit2 (Explorer 290+Explorer 880+2*SolarSaga 100W)",
        "Solar Generator 300880Kit2 (Explorer 300+Explorer 880+2*SolarSaga 100W)"
      ],
      "portable-power-stations": [
        "Explorer 160 Portable Power Station","Explorer 240 Portable Power Station",
        "Explorer 290 Portable Power Station","Explorer 300 Portable Power Station",
        "Explorer 500 Portable Power Station","Explorer 550 Portable Power Station",
        "Explorer 880 Portable Power Station","Explorer 1000 Portable Power Station",
        "Explorer 1000 Portable Power Station",
        "Explorer 1000 Pro Portable Power Station",
        "Explorer 1500 Portable Power Station","Explorer 2000 Portable Power Station",
        "Explorer 2000 Pro Portable Power Station"
      ],
      "solar-panel": [
        "SolarSaga 200W Solar Panel",
        "SolarSaga 100W Solar Panel",
        "SolarSaga 100X Solar Panel",
        "SolarSaga 80W Solar Panel",
        "SolarSaga 60W Solar Panel"
      ],
      "accessories": [
        "Carrying Case Bag for Explorer 2000 Pro",
        "Upgraded Carrying Case Bag for Explorer 1500/1000",
        "Carrying Case Bag for Explorer 1000/880",
        "Carrying Case Bag for Explorer 500/550",
        "Carrying Case Bag for Explorer 240/300",
        "Carrying Case Bag for Explorer 290",
        "Camping Light (1 Pack)",
        "Camping Light (4 Packs)",
        "Solar Panel Connector"
      ]
    };
		var placeList = [
      {"key":252,"dataCode":"jackery.com","name":"jackery.com"},
      {"key":253,"dataCode":"uk.jackery.com","name":"uk.jackery.com"},
      {"key":254,"dataCode":"de.jackery.com","name":"de.jackery.com"},
      {"key":255,"dataCode":"ca.jackery.com","name":"ca.jackery.com"},
      {"key":256,"dataCode":"Amazon","name":"Amazon"},
      {"key":260,"dataCode":"Walmart","name":"Walmart"},
      {"key":261,"dataCode":"Harbor Freight Tools","name":"Harbor Freight Tools"},
      {"key":262,"dataCode":"The Home Depot","name":"The Home Depot"},
      {"key":263,"dataCode":"Costco","name":"Costco"},
      {"key":264,"dataCode":"Lowe's","name":"Lowe's"},
      {"key":265,"dataCode":"BestBuy","name":"BestBuy"},
      {"key":266,"dataCode":"B&H","name":"B&H"},
      {"key":267,"dataCode":"Camping World","name":"Camping World"},
      {"key":268,"dataCode":"Others","name":"Others"}
    ];

    var me = this, form = document.forms.productRegister;
			
    // register component
    me.ySelect('product_category', category);
    me.ySelect('purchase_channel', placeList);

    // date max is today
    var today = me.formatDate(new Date(), 'YYYY-MM-DD');
    form.buy_at.setAttribute("max", today);
    form.buy_at.value = today;
    
    // monitor input-field form.emit.disabled = false
    var must_field = $(".p-r-form .must-field + input");
    must_field.each(function() {
      var that = this;
      function monitor() {
        var disabled = [];

        switch($(that).attr("name")) {
          case "email":
            shopCommon.verifyEmail($(that).val()) ? $(that).parent().removeClass("input-tips") : $(that).parent().addClass("input-tips");
            break;
          case "product_category":
            var _product = form.product_name.parentElement;
            _product.classList.remove("hide");
            _product.classList.add("input-tips");

            var _text = $(that).parent().children().eq(2).text();
            if (_product.children[0].innerText !== _text) {
              _product.children[0].innerText = _text;
              /* 22/02/2022 abolish
              $http.g("/collections/" + $(that).val() + "?view=json").then(function(r) {
                var _data = r.products.map(function(item) {
                  return { "key": $(that).attr("title"), "name": $(that).attr("title") }
                });
                me.ySelect('product_name', _data);
                $('input[name="product_name"]').change()
              })
              */
              var _data = [], _arr = products[$(that).val()];
              for (var i in _arr) {
                _data.push({ "key": _arr[i], "name": _arr[i] })
              }
              me.ySelect('product_name', _data);
              $('input[name="product_name"]').change()
            }
            break;
          case "out_order_sn":
            shopCommon.checkOrderId()
            break;
          default:
            $(that).val() ? $(that).parent().removeClass("input-tips") : $(that).parent().addClass("input-tips");
            break;
        }
        
        must_field.each(function(i) { disabled[i] = !Boolean($(this).val()) })
        form.emit.disabled = !Boolean(disabled.indexOf(true) < 0 && $all(".p-r-form .input-tips").length <= 0)
      }
      $(that).blur(monitor);
      $(that).keyup(monitor);
      $(that).change(monitor)
    });

    function confirm(param) {
      me.scrollToTop(me.isMobile() ? 600 : 900);
      var frame = _$$(".p-r-form-confirm"), edit = _$$(".operate .edit"), ok = _$$(".operate .confirm"), success = _$$(".p-r-success");
      
      form.parentElement.classList.add("hide");
      frame.classList.remove("hide");

      var li = '<li><strong>First Name</strong>'+ param.first_name +'</li>';
      li += '<li><strong>Last Name</strong>'+ param.last_name +'</li>';
      li += '<li><strong>Email Address</strong>'+ param.email +'</li>';
      li += '<li><strong>Phone</strong>'+ param.phone +'</li>';
      // li += '<li><strong>Address</strong>'+ param.street + ', ' + param.address_bak + ', ' + param.state + ', ' + param.postal_code + ', ' + param.country + '</li>';
      
      var category = param.product_category.replace(/\-/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      li += '<li><strong>Jackery Product Category</strong>'+ category +'</li>';
      li += '<li><strong>'+ category +'</strong>'+ param.product_name +'</li>';

      li += '<li><strong>Product Serial Number</strong>'+ param.serial_number +'</li>';
      li += '<li><strong>Date of Purchase</strong>'+ param.buy_at +'</li>';
      li += '<li><strong>Place of Purchase</strong>'+ param.purchase_channel +'</li>';
      li += '<li><strong>Order ID</strong>'+ param.out_order_sn +'</li>';

      frame.querySelector("ul").innerHTML = li;

      edit.onclick = function() {
        form.parentElement.classList.remove("hide");
        frame.classList.add("hide");
      }

      ok.onclick = function() {
        ok.classList.add('btn--loading');
        ok.disabled = true;

        // exists id is update operate, otherwise, add
        var api = param.id ? $api.updateGuarantee : $api.orderRegister;
        param.shopify_shop_id = BOOMR.shopId;
        api(JSON.stringify(param), function() {
          me.scrollToTop(420);
          frame.classList.add("hide");
          _$$(".p-r-info-tips").classList.add("hide");
          success.classList.remove("hide")

          /**********cdp-订阅结果+保修注册**********/
          SubscriptionResult({
            _latest_gclid: '',
            email_used: param.email,
            agree_to_receive_promotion: "默认订阅",
            subscription_source: '延保注册页', // 订阅来源
          })
          ExtendWarranty({
            name: param.first_name + param.last_name,
            order_id: param.out_order_sn,
            receiver_phone: param.phone,
            product_category: category,
            place_of_purchase: param.purchase_channel,
            product_serial_number: param.serial_number,
            purchase_date: param.buy_at,
            is_successful: true,
            fail_reason: '',
            email_used: param.email
          })
          /**********cdp-订阅结果+保修注册**********/
        }, function (err) {
          ok.classList.remove('btn--loading');
          ok.disabled = false

          /**********cdp-订阅结果**********/ 
          ExtendWarranty({
            name: param.first_name + param.last_name,
            order_id: param.out_order_sn,
            receiver_phone: param.phone,
            product_category: category,
            place_of_purchase: param.purchase_channel,
            product_serial_number: param.serial_number,
            purchase_date: param.buy_at,
            is_successful: false,
            fail_reason: err.msg || 'error',
            email_used: param.email
          })
          /**********cdp-订阅结果**********/
        })
      }
    }
    
    form.onsubmit = function() {
      var param = {};
      for (var i = 0; i < form.length; i++) {
        param[form[i].name] = form[i].value.trim()
      }
      param['out_order_sn'] = param['out_order_sn'].replace(/\s+/g, '').toUpperCase()
      if (param['purchase_channel'] === 'jackery.com') {
        let str = param['out_order_sn'].substr(0, 1)
        param['out_order_sn'] = str === '#' ? param['out_order_sn'] : '#' + param['out_order_sn']
      } else if (param['purchase_channel'] === 'ca.jackery.com') {
        let str = param['out_order_sn'].substr(0, 2)
        param['out_order_sn'] = str === 'CA' ? param['out_order_sn'] : 'CA' + param['out_order_sn']
      } else if (param['purchase_channel'] === 'de.jackery.com') {
        let str = param['out_order_sn'].substr(0, 2)
        param['out_order_sn'] = str === 'DE' ? param['out_order_sn'] : 'DE' + param['out_order_sn']
      } else if (param['purchase_channel'] === 'uk.jackery.com') {
        let str = param['out_order_sn'].substr(0, 2)
        param['out_order_sn'] = str === 'UK' ? param['out_order_sn'] : 'UK' + param['out_order_sn']
      } else if (param['purchase_channel'] === 'Walmart') {
        let str = param['out_order_sn'].substr(0, 3)
        param['out_order_sn'] = str === 'WM-' ? param['out_order_sn'] : 'WM-' + param['out_order_sn']
      }
      confirm(param);
      return false
    }

    // edit form
    var id = shopCommon.getParam("id");
    id && (function() {
      form.id.value = id;
      $api.getGuarantee(JSON.stringify({ id: id }), function(r) {
        if (shopCommon.isEmpty(r)) {
          form.id && (form.id.value = "")
        } else {
          form.parentElement.classList.add("edit");
          for (var i = 0; i < form.length; i++) {
            switch(form[i].name) {
              case "product_category":
                form[i].value = r[form[i].name];
                document.querySelector(".y-select-" + form[i].name + " p").innerHTML = r.product_category.replace(/\-/g, ' ').toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
                setTimeout(function() {
                  $('input[name="product_category"]').change()
                }, 1000);
                // monitor child change
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                var element = document.querySelector('.y-select-product_name');
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    console.log("mutation", mutation);
                    if (mutation.type === "childList") {
                      form.product_name.value = document.querySelector(".y-select-product_name p").innerHTML = r.product_name;
                      $('input[name="product_name"]').change()
                    }
                  })
                });
                observer.observe(element, { childList: true });
                break;
              case "purchase_channel":
                 form[i].value = document.querySelector(".y-select-" + form[i].name + " p").innerHTML = r[form[i].name];
                 $('input[name="'+ form[i].name +'"]').change();
                break;
              case "buy_at":
                form[i].value = shopCommon.formatDate(new Date(r[form[i].name].replace(/-/g, "/")), "YYYY-MM-DD");
                break;
              default:
                form[i].value = r[form[i].name];
                break;
            }
          }
        }
      }, function(e) {
        console.log(e)
      })
    })()
  },

  shortage: function(param) {
    console.log('---shortage- --')
    var me = this, a = _$$(".shortage"), b = _$$(".shortage_popup"),
      c = _$$(".shortage_popup .info input"), d = _$$(".shortage_popup .info button"), e = _$$(".shortage_popup .agree input"),
      f = _$$(".shortage_popup .icon-close");
    
    function verify() {
      d.disabled = !(me.verifyEmail(c.value) && e.checked);
    }
    e.onchange = c.onkeyup = function() { verify() }

    d.onclick = function() {
      d.classList.add('btn--loading');
      d.disabled = true;
      var id = me.getParam("variant");
      var variants = id ? param.variants.filter(function(item) { return item.id === +shopCommon.getParam("variant") })[0] : param.variants[0];
      $api.shortage({
        "email": c.value, "sku": variants.sku, "sku_goods_name": variants.public_title || variants.name,
        "goods_category": param.collection, "goods_name": variants.name, "source": "1", "cr": $http.cr,"variant_id": variants.id,
        "goods_url": window.location.pathname.replace("/products/", "")
      }, function() {
        b.classList.add("hide");
        d.classList.remove('btn--loading');
        d.disabled = true;
        c.value = "";
        me.toast(param.success, 5000)

        /**********cdp-订阅结果**********/
        SubscriptionResult({
          _latest_gclid: '',
          email_used: c.value,
          agree_to_receive_promotion: "同意",
          subscription_source: '到货提醒', // 订阅来源
        })
        /**********cdp-订阅结果**********/
      }, function(err) {
        me.toast(err.code === 40000 ? err.message : param.error, 5000, 'red');
        d.classList.remove('btn--loading');
        d.disabled = false
      })
    }
    a.onclick = function() { b.classList.remove("hide") }
    f.onclick = function() { e.checked=false;b.classList.add("hide");}
  },

  warranty: function(text) {
    var a = _$$(".product_warranty"),
        b = _$$(".product_warranty .w_checkbox"),
        c = _$$(".product_warranty .popup_box .icon-close"),
        d = _$$(".product_warranty .popup_box span");
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "properties[AutoWarranty]";
    input.value = text;
    b.onchange = function() {
        b.checked ? a.appendChild(input) : _$$("input[name='properties[AutoWarranty]']").remove()
    }
    c.onclick = d.onclick = function() {
        _$$(".product_warranty .popup").checked = false
    }
  },

  // dynamically insert the element into the dom structure, and mount the style in the head
  powerStationReference: function(param) {
    $.getJSON("/?sections=power-stations-reference", function(r) {
      var dom = new DOMParser().parseFromString(r['power-stations-reference'], 'text/html');
      var style = dom.querySelector("style");

      param.forEach(function(item) {
        var target = document.querySelector(item.id);
        target.innerHTML = '';
        target.appendChild(dom.querySelector(item.class))
      })
      document.querySelector("head").appendChild(style)
    })
  },

  // 保存other_email
  saveOtherEmail: function(val) {
    cookie.set("_other_email", val)
  },

  getOtherEmail: function() {
    return cookie.get("_other_email") || ''
  },

  isLogin: function() { // 实际应该根据customer信息
    // const flag = cookie.get("_jk_id") ? true : false
    return !!theme.settings.customer_id
  },

  // 点击复制到剪贴板
  clickCopy: function(value, cb) {
    const textarea = document.createElement('textarea')
    textarea.readOnly = 'readonly'
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    textarea.value = value
    document.body.appendChild(textarea)
    textarea.select()
    const result = document.execCommand('Copy')
    document.body.removeChild(textarea)
    if(result) {
      cb && cb()
    }
  }
};

// encapsulation web notification
var NotificationHandler = {
  isNotificationSupported: 'Notification' in window,

  getConfig: function(act_type, msg_id, frq_id) {
    return { union_id: cookie.get("_shopify_y"), shopify_shop_id: shopId, msg_id: msg_id || '', frq_id: frq_id || '', act_type: act_type }
  },

  isPermissionGranted: function() {
    return Notification.permission === 'granted'
  },

  requestPermission: function(agree, reject) {
    let me = this;
    if (!this.isNotificationSupported) {
      console.log('the current browser does not support Notification API');
      reject && reject()
      return
    }

    // status是授权状态，如果用户允许显示桌面通知，则status为'granted'
    // permission是只读属性: default 用户没有接收或拒绝授权 不能显示通知, granted 用户接受授权 允许显示通知, denied  用户拒绝授权 不允许显示通知
    Notification.requestPermission(function(status) {
      var permission = Notification.permission;
      console.log('status is ' + status, 'permission is ' + permission);
      
      let act_type = { granted: 1, default: 2, denied: 3 }[permission];
      if (permission === 'granted') {
        cookie.set('_jk_notify_permission', permission)
        agree && agree()
      } else {
        cookie.erase('_jk_notify_permission')
        reject && reject()
      }

      $api.notifyPopup(me.getConfig(act_type))
    })
  },

  showNotification: function(obj) {
    let me = this;
    if (!this.isNotificationSupported) {
      console.log('the current browser does not support Notification API');
      return
    }
    if (!this.isPermissionGranted()) {
      console.log('the current page has not been granted for notification');
      return
    }
    var n = new Notification(obj.title, { icon: obj.image_url, body: obj.describe });

    n.onshow = function() {
      // console.log('notification shows up');
      $api.notifyPopup(me.getConfig(5, obj.msg_id, obj.frq_id))
    };

    n.onclick = function() {
      // opening current view
      window.focus();
      $api.notifyPopup(me.getConfig(4, obj.msg_id, obj.frq_id), function() {
        n.close();
        window.location.href = obj.href_url
      })
    };

    // 当有错误发生时会onerror函数会被调用, 如果没有granted授权，创建Notification对象实例时，也会执行onerror函数
    n.onerror = function() {
      // console.log('notification encounters an error');
      // do something useful
    };

    // 一个消息框关闭时onclose函数会被调用
    n.onclose = function() {
      // console.log('notification is closed');
      // do something useful
    }
  },

  requestNotification: function() {
    let me = this;
    function inquiries() {
      $api.notifyInfo({ union_id: cookie.get("_shopify_y"), shopify_shop_id: shopId }, function(r) {
        r.msg_display === 1 && me.showNotification(r);
        // if authorization status has not been changed, continue request next notification.
        me.isPermissionGranted() && setTimeout(function() {
          me.requestNotification()
        }, 150000)
      })
    }
    if (cookie.get("_jk_notify_permission")) {
      inquiries()
    } else {
      NotificationHandler.requestPermission(function() {
        inquiries()
      })
    }
  }
};

(function() {
  switch (location.pathname) {
    case "/": shopCommon.homePage(); break;
    // case "/pages/product-registration": document.forms.productRegister && shopCommon.productRegister(); break;
    default: break;
  }
  (localStorage.getItem('JACKERY_USER_TOKEN') || cookie.get("_jk_user")) && $api.shopifyUserCheck();
  shopCommon.init();

  Shopify?.theme?.role === "unpublished" && shopCommon.isMobile() && setTimeout(function() { new window.VConsole() }, 1000);

  // notification even
  $api.notifyInfo({ union_id: cookie.get("_shopify_y"), shopify_shop_id: $('.J-shop-id').attr('shop_id') }, function(r) {
    r.msg_display === 1 && NotificationHandler.requestNotification()
  })
})()

// 订阅插件逻辑-start
;(function() {
  let subscribeParams;
  // 记录访问次数-页签打开到页签关闭为1次-start
  let subscribeObj = localStorage.getItem('subscribeObj') || {}
  let subscribeStatus = sessionStorage.getItem('subscribeStatus') || false
  if (JSON.stringify(subscribeObj) === '{}') {
    let obj = {
      access_number: 1
    }
    localStorage.setItem('subscribeObj', JSON.stringify(obj))
    sessionStorage.setItem('subscribeStatus', true)
  } else {
    let data = JSON.parse(subscribeObj)
    if (!subscribeStatus) {
      data.access_number++
      localStorage.setItem('subscribeObj', JSON.stringify(data))
      sessionStorage.setItem('subscribeStatus', true)
    }
  }
  // 记录访问次数-end
  let params = {
    shopify_shop_id: $('.J-shop-id').attr('shop_id') || '',
    url: window.location.href || ''
  }
  console.log(params, 'params');
  // 活动类型
  let avtiveType = 0;
  let myLucky;
  let wheelArr = [];
  getSubscribe(params, function(res) {
    subscribeParams = res;
    console.log(subscribeParams, 'subscribeParams');
    // 订阅插件是否需要弹出显示逻辑-start
    if (subscribeParams.act_display === 1) {
      // show_type 活动展示类型，0：每个访客一次，1：每个访客每次访问都弹出。2：每隔X次弹出，3：在时间段内弹出一次， 4：在第X次访问弹出
      let data = JSON.parse(localStorage.getItem('subscribeObj'))
      console.log(data, 'data');
      console.log(data.show_status_3,'data.show_status_3');
      
      // 判断是否修改了活动类型,若修改了活动类型则重置访问次数
      if (data.show_type !== subscribeParams.show_type || data.sub_token !== subscribeParams.sub_token) {
        data.sub_token = subscribeParams.sub_token
        data.show_type = subscribeParams.show_type
        data.access_number = 1
        data.show_status_0 = 'yes'
        data.show_status_2 = 'yes'
        data.show_status_3 = 'yes'
      }
      // 每隔X次弹出
      if (sessionStorage.getItem('show_status_2') !== 'no') {
        if (Number(subscribeParams.show_type_value) === 0) {
          data.show_status_2 = 'yes'
        } else if (Number(subscribeParams.show_type_value) > 0) {
          if (data.access_number === 1) {
            data.show_status_2 = 'yes'
          } else if (Number(subscribeParams.show_type_value) + 1 === data.access_number - data.last_open) {
            data.show_status_2 = 'yes'
          }
        }
      }
      // 在时间段内弹出一次
      if (data.currentTime) {
        data.show_status_3 = subscribeParams.server_timer - data.currentTime >= subscribeParams.show_type_value ? 'yes' : 'no'
      }
      
      if (subscribeParams.show_type === 0 && data.show_status_0 !== 'no') {
        $('#subscribe-modal').show()
        data.show_status_0 = 'no'
      } else if (subscribeParams.show_type === 1) {
        $('#subscribe-modal').show()
      } else if (subscribeParams.show_type === 2 && data.show_status_2 !== 'no') {
        $('#subscribe-modal').show()
        data.show_status_2 = 'no'
        data.last_open = data.access_number
        sessionStorage.setItem('show_status_2', 'no') // access_number未变，则需要控制弹框不再展示
      } else if (subscribeParams.show_type === 3 && data.show_status_3 !== 'no') {
        $('#subscribe-modal').show()
        data.show_status_3 = 'no'
        data.currentTime = subscribeParams.server_timer
      } else if (subscribeParams.show_type === 4 && data.access_number === Number(subscribeParams.show_type_value)) {
        $('#subscribe-modal').show()
      }
      localStorage.setItem('subscribeObj', JSON.stringify(data))
    }
    // 订阅插件是否需要弹出显示逻辑-end

    // 上报数据
    if ($('#subscribe-modal').is(':visible')) {
      let params = {
        shopify_shop_id: $('.J-shop-id').attr('shop_id') || '',
        sub_id: subscribeParams.sub_id
      }
      subscribePopup(params, function() {
        console.log('上报数据');
      }, function(err) {
        console.log(err);
      })
      // 订阅插件弹框显示则禁用底层页面滚动条
      $('html, body').css({
        overflow: 'hidden'
      })
    }

    // 判断活动类型，显示对应活动
    avtiveType = res.type
    if (avtiveType === 1) {
      $('#subscribe-modal .subscribe-box').addClass('wheel-active')
      // 处理转盘数据
      let items = res.subscribe_items || []
      items.map((item, index) => {
        if (item.type === 0) {
          if (item.discount.is_free === 1) {
            wheelArr.push({
              item_id: item.item_id,
              fonts: [
                { 
                  text: 'Free',
                  top: shopCommon.isMobile() ? '10%' : '15%',
                  fontColor: '#FF5000',
                  fontSize: shopCommon.isMobile() ? '28px' : '32px',
                  fontWeight: 700,
                  lineClamp: 1
                },
                { 
                  text: item.explain_desc,
                  top: '55%',
                  fontColor: '#FF5000',
                  fontSize: shopCommon.isMobile() ? '12px' : '14px',
                  lineClamp: 2,
                  lengthLimit: items.length === 2 ? (shopCommon.isMobile() ? '200px' : '270px') : '75%'
                }
              ],
              background: items.length % 2 === 0 ? (index % 2 === 0 ? '#FFFFFF' : '#FFF8CC') : (index === items.length -1 ? '#DBCF85' : index % 2 === 0 ? '#FFF8CC' : '#EDE29C')
            })
          } else {
            if (item.discount.value_type === 0) {
              wheelArr.push({
                item_id: item.item_id,
                fonts: [
                  { 
                    text: item.discount.currency + item.discount.value,
                    top: shopCommon.isMobile() ? '10%' : '15%',
                    fontColor: '#FF5000',
                    fontSize: shopCommon.isMobile() ? '28px' : '32px',
                    fontWeight: 700,
                    lineClamp: 1
                  }
                ],
                background: items.length % 2 === 0 ? (index % 2 === 0 ? '#FFFFFF' : '#FFF8CC') : (index === items.length -1 ? '#DBCF85' : index % 2 === 0 ? '#FFF8CC' : '#EDE29C')
              })
            } else {
              wheelArr.push({
                item_id: item.item_id,
                fonts: [
                  { 
                    text: item.discount.value + '%',
                    top: shopCommon.isMobile() ? '10%' : '15%',
                    fontColor: '#FF5000',
                    fontSize: shopCommon.isMobile() ? '28px' : '32px',
                    fontWeight: 700,
                    lineClamp: 1
                  },
                  { 
                    text: 'OFF',
                    top: '45%',
                    fontColor: '#FF5000',
                    fontSize: shopCommon.isMobile() ? '12px' : '14px',
                    fontWeight: 700,
                    lineClamp: 1
                  },
                  { 
                    text: 'discount',
                    top: '60%',
                    fontColor: '#FF5000',
                    fontSize: shopCommon.isMobile() ? '12px' : '14px',
                    lineClamp: 1
                  }
                ],
                background: items.length % 2 === 0 ? (index % 2 === 0 ? '#FFFFFF' : '#FFF8CC') : (index === items.length -1 ? '#DBCF85' : index % 2 === 0 ? '#FFF8CC' : '#EDE29C')
              })
            }
          }
        } else {
          wheelArr.push({
            item_id: item.item_id,
            fonts: [{ 
              text: item.title,
              top: shopCommon.isMobile() ? '10%' : '15%',
              fontColor: '#FF5000',
              fontSize: shopCommon.isMobile() ? '15px' : '18px',
              fontWeight: 700,
              lineClamp: 3,
              lengthLimit: '75%'
            }],
            background: items.length % 2 === 0 ? (index % 2 === 0 ? '#FFFFFF' : '#FFF8CC') : (index === items.length -1 ? '#DBCF85' : index % 2 === 0 ? '#FFF8CC' : '#EDE29C')
          })
        }
      })
      // 转盘配置
      if (shopCommon.isMobile()) {
        // 移动端
        myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
          width: '310px',
          height: '310px',
          blocks: [
            { 
              padding: '12px',
              background: '#ffffff',
              imgs: [{
                src: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/1_b0563dfb-7156-4266-9a8c-58bd45ba4d0e.png?v=1658227512',
                width: '100%',
                height: '100%',
                rotate: true
              }]
            }
          ],
          prizes: wheelArr,
          buttons: [
            {
              radius: '30%',
              imgs: [{
                src: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/1_5d63815a-173e-4a2b-86e0-d77ce23f4a61.png?v=1658282408',
                width: '100%',
                top: '-130%'
              }],
              fonts: [
                { 
                  text: 'START',
                  top: '-10px',
                  fontColor: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '800'
                }
              ]
            }
          ],
          defaultConfig: {
            accelerationTime: 1500,
            decelerationTime: 1500
          },
          start: function() {
            $('.J-wheel-btn').click()
          },
          end: function(prize) { // 游戏停止时触发
            setTimeout(function() {
              $('.J-first-step').hide()
              $('.J-third-step').fadeIn()
              $('#subscribe-modal .subscribe-box').removeClass('wheel-active')
            }, 1000)
          }
        })
      } else {
        // PC
        myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
          width: '402px',
          height: '402px',
          blocks: [
            { 
              padding: '18px',
              background: '#ffffff',
              imgs: [{
                src: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/1_b0563dfb-7156-4266-9a8c-58bd45ba4d0e.png?v=1658227512',
                width: '100%',
                height: '100%',
                rotate: true
              }]
            }
          ],
          prizes: wheelArr,
          buttons: [
            {
              radius: '30%',
              imgs: [{
                src: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/1_5d63815a-173e-4a2b-86e0-d77ce23f4a61.png?v=1658282408',
                width: '100%',
                top: '-130%'
              }],
              fonts: [
                { 
                  text: 'START',
                  top: '-10px',
                  fontColor: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '800'
                }
              ]
            }
          ],
          defaultConfig: {
            accelerationTime: 1500,
            decelerationTime: 1500
          },
          start: function() {
            $('.J-wheel-btn').click()
          },
          end: function(prize) { // 游戏停止时触发
            setTimeout(function() {
              $('.J-first-step').hide()
              $('.J-third-step').fadeIn()
              $('#subscribe-modal .subscribe-box').removeClass('wheel-active')
            }, 1000)
          }
        })
      }
    } else {
      $('#subscribe-modal .subscribe-box').removeClass('wheel-active')
    }

    // 处理数据显示
    $('.J-main-title').text(subscribeParams.main_title)
    $('.J-sub-title').text(subscribeParams.sub_title)
    $('.J-email').attr('placeholder', subscribeParams.email_desc)
    if (subscribeParams.first_name_display === 1) {
      $('.J-first-name').show().attr('placeholder', subscribeParams.first_name_desc)
    }
    if (subscribeParams.last_name_display === 1) {
      $('.J-last-name').show().attr('placeholder', subscribeParams.last_name_desc)
    }
  }, function(err) {
    console.log(err);
  })
  $('.J-email').on('input', function() {
    if ($(this).val()) {
      $('.J-choose-title').addClass('change-bgcolor blink-1')
      $('.J-first-step .gift-wrap').addClass('gift-img')
    } else {
      $('.J-choose-title').removeClass('change-bgcolor blink-1')
      $('.J-first-step .gift-wrap').removeClass('gift-img')
    }
  })
  let joinStatus = false; // 防止频繁点击触发接口
  $('.J-gift').click(function() {
    let emailVal = $('#subscribeEmail').val()
    let checkboxVal = $('.J-gift-popup .J-checkbox').is(':checked')
    !checkboxVal ? $('.J-gift-popup .J-checkbox').addClass('red') : emailVal === '' ? $('.J-gift-popup .J-tip').fadeIn().text($('.J-gift-popup .J-tip').data('email-tip')) : !checkEmail(emailVal) ? $('.J-gift-popup .J-tip').fadeIn().text($('.J-tip').data('emailerror-tip')) : ''
    if ($('.J-gift-popup .J-checkbox').hasClass('red')) {
      return false
    }
    if ($('.J-gift-popup .J-tip').is(':hidden')) {
      // 参与活动，获取优惠信息
      let params = {
        shopify_shop_id: $('.J-shop-id').attr('shop_id') || '',
        sub_id: subscribeParams.sub_id,
        email: $('.J-gift-popup .J-email').val()
        // shopify_shop_id : 55005249633,
        // sub_id: 999999,
        // sub_id: 3,
        // email: 'hehehexlu@gmail.com',
      }
      if (subscribeParams.first_name_display === 1) {
        params.first_name = $('.J-gift-popup .J-first-name').val() || ''
      }
      if (subscribeParams.last_name_display === 1) {
        params.last_name = $('.J-gift-popup .J-last-name').val() || ''
      }
      if (!joinStatus) {
        joinStatus = true
        joinSubscribe(params, function(res) {
          console.log(res, '参与活动，获取优惠信息');
          // 参与成功，执行过渡动画-start
          $('.J-first-step').hide()
          $('.J-second-step').fadeIn()
          setTimeout(function() {
            $('.J-choose-gift').addClass('shake-bottom')
          }, 300)
          setTimeout(function() {
            $('.J-second-step').hide()
            $('.J-third-step').fadeIn()
          }, 1000)
          // 参与成功，执行过渡动画-end
  
          // 处理参与成功后数据展示
          let joinParams = res;
          getSuccessData(joinParams)
        }, function(err) {
          console.log(err);
          joinStatus = false
          $('.J-gift-popup .J-tip').fadeIn().text(err.message)
        })
      }
    } else {
      $('#subscribeEmail').addClass('shake-bottom')
    }
  })
  $('#subscribeEmail').focus(function() {
    $('.J-tip').fadeOut()
    $('.J-checkbox').removeClass('red')
    $('#subscribeEmail').removeClass('shake-bottom')
  })
  $('.J-checkbox').click(function() {
    $('.J-tip').fadeOut()
    $('.J-checkbox').removeClass('red')
    $('#subscribeEmail').removeClass('shake-bottom')
  })
  $('.J-button-text').click(function() {
    let url = $('.J-button-text').attr('link') || ''
    let code = $('.J-code-text').text()
    copyText(code)
    // window.location.href = window.location.origin + '/pages/solar-generator'
    if (url !== '') {
      window.location.href = url
    } else {
      $('.J-copy-tips').css('visibility', 'visible')
    }
  })
  $('.close-btn').click(function() {
    $('#subscribe-modal').hide()
    // 订阅插件弹框关闭则开启底层页面滚动条
    $('html, body').css({
      overflow: ''
    })
  })
  // 转盘逻辑-start
  $('.J-wheel-btn').click(function() {
    let emailVal = $('#wheelEmail').val()
    let checkboxVal = $('.J-wheel-popup .J-checkbox').is(':checked')
    !checkboxVal ? $('.J-wheel-popup .J-checkbox').addClass('red') : emailVal === '' ? $('.J-wheel-popup .J-tip').fadeIn().text($('.J-wheel-popup .J-tip').data('email-tip')) : !checkEmail(emailVal) ? $('.J-wheel-popup .J-tip').fadeIn().text($('.J-tip').data('emailerror-tip')) : ''
    if ($('.J-wheel-popup .J-checkbox').hasClass('red')) {
      return false
    }
    if ($('.J-wheel-popup .J-tip').is(':hidden')) {
      // 参与活动，获取优惠信息
      let params = {
        shopify_shop_id: $('.J-shop-id').attr('shop_id') || '',
        sub_id: subscribeParams.sub_id,
        email: $('.J-wheel-popup .J-email').val()
      }
      if (subscribeParams.first_name_display === 1) {
        params.first_name = $('.J-wheel-popup .J-first-name').val() || ''
      }
      if (subscribeParams.last_name_display === 1) {
        params.last_name = $('.J-wheel-popup .J-last-name').val() || ''
      }
      if (!joinStatus) {
        joinStatus = true
        joinSubscribe(params, function(res) {
          console.log(res, '参与活动，获取优惠信息');
          // 参与成功，执行过渡动画-start
          $('.J-first-step .J-wheel-popup .J-form-wrap').hide()
          $('.J-first-step .J-wheel-popup .J-time-wrap').fadeIn()
          $('.J-time-wrap').css('display', 'flex')
          // 启动转盘
          myLucky.play()
          // 计算落点
          let id = res.item_id
          let index = 0
          wheelArr.map((n, i) => {
            if (n.item_id === id) {
              index = i
            }
          })
          let t = 4
          let timer = setInterval(function() {
            $('.J-time-wrap >span').text(t)
            t--
            if (t < 1) {
              clearInterval(timer)
              // 停止转盘，并传入需要停止的下标
              myLucky.stop(index)
            }
          }, 1000)
          // 参与成功，执行过渡动画-end
  
          // 处理参与成功后数据展示
          let joinParams = res;
          getSuccessData(joinParams)
        }, function(err) {
          console.log(err);
          joinStatus = false
          $('.J-wheel-popup .J-tip').fadeIn().text(err.message)
        })
      }
    } else {
      $('#wheelEmail').addClass('shake-bottom')
    }
  })
  $('#wheelEmail').focus(function() {
    $('.J-wheel-popup .J-tip').fadeOut()
    $('.J-wheel-popup .J-checkbox').removeClass('red')
    $('#wheelEmail').removeClass('shake-bottom')
  })
  // 转盘逻辑-end
  // 处理成功参与活动后的数据
  function getSuccessData(joinParams) {
    $('.J-success-main-title').text(joinParams.success_main_title)
    $('.J-success-sub-title').text(joinParams.success_sub_title)
    $('.J-button-text').text(joinParams.button_desc)
    $('.J-button-text').attr('link', joinParams.button_link)
    if (joinParams.item_type === 0) {
      $('.J-third-step .discount-wrap').siblings().hide()
      $('.J-third-step .discount-wrap').show()
      $('.J-code-text').text(joinParams.discount.code)
      $('.J-date-text').text(joinParams.discount.start_at_desc + ' - ' + joinParams.discount.end_at_desc)
      if (joinParams.discount.is_free === 1) {
        // 免费
        $('.J-discount-text .free-wrap').show().siblings().hide()
        $('.J-discount-text .free-wrap').css('display', 'flex')
        $('.J-free-product').text(joinParams.explain_desc)
      } else {
        if (joinParams.discount.type === 1) {
          $('.J-discount-text .percentage-wrap').show().siblings().hide()
        } else {
          $('.J-discount-text .currency-wrap').show().siblings().hide()
          $('.J-discount-currency').text(joinParams.discount.currency)
        }
        $('.J-discount-val').text(joinParams.discount.value)
      }
    } else if (joinParams.item_type === 1) {
      $('.J-third-step .physical-wrap').show().siblings().hide()
      // $('.J-physical-text').text(joinParams.item_title)
      $('.J-physical-desc').text(joinParams.explain_desc)
      // setTimeout(function() {
      //   $('.subscribe-modal .subscribe-box').addClass('subscribe-background')
      // }, 1000)
    } else {
      $('.J-thanks-text').text(joinParams.item_title)
      $('.J-third-step .thanks-wrap').show().siblings().hide()
    }
  }
  function checkEmail(str) {
    var reg = /^[A-Za-z0-9._%+!`#$^-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,8}$/;
    return reg.test(str)
  }
  function copyText(text) {
    var textareaDom = document.createElement('textarea');
    textareaDom.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaDom.value = text;
    document.body.appendChild(textareaDom); //将textarea添加为body子元素
    textareaDom.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaDom);//移除DOM元素
    console.log("复制成功");
    return res;
  }
  // C端：获取订阅活动接口
  function getSubscribe(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-subscribe/info", d, s, e)
  }
  // C端：参与活动接口
  function joinSubscribe(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-subscribe/join", d, s, e)
  }
  // C端：数据统计接口
  function subscribePopup(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/app-subscribe/popup", d, s, e)
  }
})()
// 订阅插件逻辑-end


// 十周年抽奖活动-start
;$(function() {
  // 黑五页面屏蔽十周年活动
  if (location.pathname === '/pages/black-friday') {
    console.log('黑五页面不显示十周年活动');
    $('.J-tenth-button').hide()
  } else {
    // 自动弹出逻辑
    let tenthShowNum = localStorage.getItem('tenthShowNum') || 0
    let tenthShow = localStorage.getItem('tenthShow') || 'yes'
    let tenthPopTimer = null
    if (tenthShowNum < 2 && tenthShow === 'yes') {
      tenthPopTimer = setTimeout(function() {
        $('#tenth-pop').show()
        getTenthPopup('popup')
      }, 2000)
    }
  }

  // 点击悬浮按钮打开弹框
  $('.J-tenth-button').click(function() {
    $('#tenth-pop').show()
    getTenthPopup('popup')
  })

  $('.J-tenth-button-hover').hover(function() {
    $(this).addClass('gift-icon-shake')
  }, function() {
    $(this).removeClass('gift-icon-shake')
  })

  // 关闭弹框
  $('.J-tenth-close').click(function() {
    $('#tenth-pop').hide()
    tenthShowNum++
    localStorage.setItem('tenthShowNum', tenthShowNum)
    console.log($(this).attr('tenth-current-step'));
    let step = $(this).attr('tenth-current-step');
    if (step === 'one') {
      getTenthPopup('close')
    } else if (step === 'two') {
      getTenthPopup('close_two')
    }
  })
  
  // 点击参与活动
  let prizes_result = {}, tenth_params = {};
  let joinStatus = false; // 防止频繁点击触发接口
  $('.J-tenth-submit').click(function() {
    let emailVal = $('.J-tenth-email').val()
    let checkboxVal = $('.J-tenth-checkbox').is(':checked')
    emailVal === '' ? $('.J-tenth-tip').fadeIn().text($('.J-tenth-tip').data('email-tip')) : !checkEmail(emailVal) ? $('.J-tenth-tip').fadeIn().text($('.J-tenth-tip').data('emailerror-tip')) : !checkboxVal ? $('.J-tenth-checkbox').addClass('red') : ''
    if ($('.J-tenth-checkbox').hasClass('red')) {
      return false
    }
    if ($('.J-tenth-tip').is(':hidden')) {
      let params = {
        shopify_shop_id: window.shopId,
        email: emailVal,
        union_id: cookie.get("_shopify_y")
      }
      if (!joinStatus) {
        joinStatus = true
        tenthJoin(params, function(res) {
          $('.J-tenth-icon, .J-tenth-one').addClass('display-none')
          $('.J-tenth-two').removeClass('display-none')
          $('.J-tenth-close').attr('tenth-current-step', 'two')
          setTimeout(function() {
            let obj = {
              ty_token: res.ty_token,
              email: emailVal
            }
            getPrizes(obj)
          }, 2000)
          tenth_params = {
            email: emailVal,
            ty_token: res.ty_token
          }

          /* cdp-十周年订阅 */ 
          SubscriptionResult({
            _latest_gclid: '',
            email_used: params.email,
            agree_to_receive_promotion: "同意",
            subscription_source: '新人欢迎框 - 新'
          })
          /* cdp-十周年订阅 */ 
        }, function(err) {
          joinStatus = false
          if (err.code === 61001) {
            // 重复参与活动
            let obj = {
              ty_token: err.data.ty_token,
              email: emailVal
            }
            getPrizes(obj, 'repeat')
          } else {
            $('.J-tenth-tip').fadeIn().text(err.message)
          }
        })
      }
    } else {
      shopCommon.isMobile() ? $('.J-tenth-email').addClass('shake-bottom') : $('.J-tenth-form').addClass('shake-bottom')
    }
  })

  // 获取中奖信息
  function getPrizes(obj, status) {
    tenthResult(obj, function(r) {
      prizes_result = r;
      if (status === 'repeat') {
        // 重复参与活动
        $('.J-tenth-icon, .J-tenth-one').addClass('display-none')
        $('.J-tenth-joined').removeClass('display-none')
        $('.J-tenth-close').attr('tenth-current-step', 'joined')
        $('.J-tenth-joined .awards-show img').attr('src', r.gift_url)
        $('.J-tenth-joined .J-tenth-code').text(prizes_result.discount.code)
        if (prizes_result.goods_id === 0 && prizes_result.status !== 2 && prizes_result.status !== 3) {
          $('.J-tenth-coupon-text').removeClass('display-none')
          $('.J-tenth-limit').text(prizes_result.discount.currency + prizes_result.discount.limit_amount)
          $('.J-tenth-time').text(prizes_result.discount.start_at_desc + ' ~ ' + prizes_result.discount.end_at_desc)
          $('.J-tenth-joined .awards-show').addClass('awards-coupons-show')
          $('.J-tenth-joined .subtitle').addClass('subtitle-coupons-show')
          $('.J-tenth-joinedText').text($('.J-tenth-joinedText').data('joined-coupon'))
        } else {
          $('.J-tenth-coupon-text').addClass('display-none')
          $('.J-tenth-joined .awards-show').removeClass('awards-coupons-show')
          $('.J-tenth-joined .subtitle').removeClass('subtitle-coupons-show')
          $('.J-tenth-product-url').attr('product_url', prizes_result.goods_url).css('cursor', 'pointer')
          $('.J-tenth-joinedText').text($('.J-tenth-joinedText').data('joined-product'))
        }
      } else {
        setTimeout(function() {
          $('.J-tenth-gift').addClass('shake-bottom')
        }, 300)
        setTimeout(function() {
          $('.J-tenth-gift .lid').addClass('rotate-15-right-cw')
        }, 1000)
        setTimeout(function() {
          $('.J-tenth-two').addClass('display-none')
          $('.J-tenth-three').removeClass('display-none')
          $('.J-tenth-close').attr('tenth-current-step', 'three')
          prizesShow()
        }, 2000)
      }
    }, function(err) {
      if (err.code === 61003) {
        prizesPolling(obj)
      } else {
        joinStatus = false
        $('.J-tenth-icon, .J-tenth-one').removeClass('display-none')
        $('.J-tenth-two').addClass('display-none')
        $('.J-tenth-tip').fadeIn().text(err.message)
        $('.J-tenth-close').attr('tenth-current-step', 'one')
      }
    })
  }

  // 轮询
  function prizesPolling(obj) {
    let timer = null
    timer = setTimeout(function() {
      tenthResult(obj, function(r) {
        prizes_result = r;
        setTimeout(function() {
          $('.J-tenth-gift').addClass('shake-bottom')
        }, 300)
        setTimeout(function() {
          $('.J-tenth-gift .lid').addClass('rotate-15-right-cw')
        }, 1000)
        setTimeout(function() {
          $('.J-tenth-two').addClass('display-none')  
          $('.J-tenth-three').removeClass('display-none')
          $('.J-tenth-close').attr('tenth-current-step', 'three')
          prizesShow()
        }, 2000)
        clearTimeout(timer)
      }, function(err) {
        if (err.code === 61003) {
          prizesPolling(obj)
        } else {
          joinStatus = false
          $('.J-tenth-icon, .J-tenth-one').removeClass('display-none')
          $('.J-tenth-two').addClass('display-none')
          $('.J-tenth-tip').fadeIn().text(err.message)
          $('.J-tenth-close').attr('tenth-current-step', 'one')
          clearTimeout(timer)
        }
      })
    }, 1000)
  }

  // 处理弹框奖品展示 
  function prizesShow() {
    if (prizes_result) {
      $('.J-tenth-prizes-img img').attr('src', prizes_result.gift_url)
      // 优惠券展示文案特殊处理
      if (prizes_result.goods_id === 0 && prizes_result.status !== 2 && prizes_result.status !== 3) {
        $('.J-tenth-coupon-text').removeClass('display-none')
        $('.J-tenth-limit').text(prizes_result.discount.currency + prizes_result.discount.limit_amount)
        $('.J-tenth-time').text(prizes_result.discount.start_at_desc + ' ~ ' + prizes_result.discount.end_at_desc)
      } else {
        $('.J-tenth-coupon-text').addClass('display-none')
      }
      if (prizes_result.status === 2 || prizes_result.status === 3) {
        $('.J-tenth-500-text').removeClass('display-none')
      } else {
        $('.J-tenth-500-text').addClass('display-none')
      }
      // 按钮及提示文案
      if (prizes_result.status !== 2 && prizes_result.status !== 3) {
        $('.J-code-tip').removeClass('display-none')
        $('.J-register-tip').addClass('display-none')
        $('.J-tenth-code').text(prizes_result.discount.code)

        /* CDP-十周年优惠券曝光 */ 
        CouponExposure({
          coupon_code: prizes_result.discount.code
        })
        /* CDP-十周年优惠券曝光 */
        
        // 处理副标题，按钮文本显示
        let subtit = $('.J-tenth-three .subtitle').data('success-text')
        let stroll = $('.J-tenth-stroll').data('success-text')
        let prizes = $('.J-prize-text').data('success-text')
        $('.J-tenth-three .subtitle').text(subtit).css('color', '#222222')
        $('.J-tenth-stroll').text(stroll)
        $('.J-prize-text').text(prizes)
      } else {
        $('.J-code-tip').addClass('display-none')
        $('.J-register-tip').removeClass('display-none')
        // 处理副标题，按钮文本显示
        let subtit = $('.J-tenth-three .subtitle').data('register-text')
        let stroll = $('.J-tenth-stroll').data('register-text')
        let prizes = $('.J-prize-text').data('register-text')
        $('.J-tenth-three .subtitle').text(subtit).css('color', '#ff5000')
        $('.J-tenth-stroll').text(stroll)
        $('.J-prize-text').text(prizes)
      }
      // 完成任务后，不再自动弹框
      if (prizes_result.status === 1) {
        tenthShow = 'no'
        localStorage.setItem('tenthShow', tenthShow)
      }
    }
  }

  // 弹框按钮-去逛逛
  $('.J-tenth-stroll').click(function() {
    window.location.href = '/pages/jackery-10th-anniversary'
  })

  // 弹框按钮-去兑奖
  $('.J-tenth-prizes').click(function() {
    console.log(prizes_result, 'prizes_result');
    if (prizes_result.status === 2 || prizes_result.status === 3) {
      let id_url = '';
      if(location.href.indexOf("demo-us.jackery.com") === -1) { // 线上店铺
        id_url = "https://id.jackery.com/"
      } else {
        id_url = 'http://demo-id.jackery.com/'
      }
      // status 2 表示需要注册（跳转注册）， 3 表示 需要激活（跳转登录）
      id_url = id_url + (prizes_result.status === 2 ?  'register' : 'login')
      let ref = {
        u: window.location.href,
        id: window.shopId,
        back: '',
        original: `${window.location.origin}/pages/jackery-10th-anniversary?task=true&email=${tenth_params.email}&ty_token=${tenth_params.ty_token}`
      }
      let ref_json = JSON.stringify(ref)
      id_url = id_url + '?jackeryRef=' + window.btoa(ref_json) + '&ty_token=' + tenth_params.ty_token
      window.open(id_url)
    } else {
      copyText($('.J-tenth-three .J-tenth-code').text())
      if (prizes_result.goods_id !== 0) {
        window.open(`${window.location.origin}/cart/${prizes_result.goods_id}:1?discount=${prizes_result.discount.code}`)
      } else {
        window.open(`${window.location.origin}/collections/solar-generator`)
      }
    }
  })

  // 输入框交互
  $('.J-tenth-email').focus(function() {
    $('.J-tenth-tip').fadeOut()
    $('.J-tenth-checkbox').removeClass('red')
    shopCommon.isMobile() ? $('.J-tenth-email').removeClass('shake-bottom') : $('.J-tenth-form').removeClass('shake-bottom')
  })

  // checkbox交互
  $('.J-tenth-checkbox').click(function() {
    $('.J-tenth-tip').fadeOut()
    $('.J-tenth-checkbox').removeClass('red')
    shopCommon.isMobile() && window.screen.width < 1025 ? $('.J-tenth-email').removeClass('shake-bottom') : $('.J-tenth-form').removeClass('shake-bottom')
  })

  // 点击复制优惠码
  $('.J-tenth-code').click(function() {
    let code = $(this).text()
    copyText(code)
    $('.J-tenth-code-tip').fadeIn()
    setTimeout(function() {
      $('.J-tenth-code-tip').fadeOut()
    }, 1000)
  })

  // 统计数据
  function getTenthPopup(type) {
    let params = {
      shopify_shop_id: window.shopId,
      type: type
    }
    tenthPopData(params, function(res){
      console.log('数据上报：' + type);
    })
  }

  // 点击实物奖励跳转对应实物详情页
  $('.J-tenth-product-url').click(function() {
    if ($(this).attr('product_url')) {
      window.open($(this).attr('product_url'))
    }
  })

  // 点击分享INS
  $('.J-tenth-ins').click(function() {
    window.open('https://www.instagram.com/p/Cj0DiI9vp5G/')
  })

  // 点击分享FB
  $('.J-tenth-fb').click(function() {
    window.open('https://www.facebook.com/jackery.inc')
  })

  // 复制
  function copyText(text) {
    var textareaDom = document.createElement('textarea');
    textareaDom.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaDom.value = text;
    document.body.appendChild(textareaDom); //将textarea添加为body子元素
    textareaDom.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaDom);//移除DOM元素
    console.log("复制成功");
    return res;
  }

  // 校验邮箱
  function checkEmail(str) {
    var reg = /^[A-Za-z0-9._%+!`#$^-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,8}$/;
    return reg.test(str)
  }

  // C端：参与活动接口
  function tenthJoin(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/ten-year/join", d, s, e)
  }

  // C端：获取参与结果接口
  function tenthResult(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/ten-year/result", d, s, e)
  }

  // C端：弹框展示次数统计接口
  function tenthPopData(d, s, e) {
    $http.ajax("GET", $http.host() + "/v1/ten-year/popup", d, s, e)
  }

  // ========= 落地页相关逻辑 =============
  // 点击展示/收起十周年规则
  $('.J-tenth-rule-btn').click(function() {
    $(this).text() === '+' ? $('.J-tenth-rule-text').slideDown() && $('.J-tenth-rule-btn').text('-') : $('.J-tenth-rule-text').slideUp() && $('.J-tenth-rule-btn').text('+')
  })
  // 点击切换十周年产品
  let tenth_product = [
    {
      title: 'E300',
      id: 'E300',
      detail: '/products/explorer-300-portable-power-station',
      pcImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-product-E300.png?v=1665819663',
      mobImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-mob-product-E300.png?v=1665820267'
    },
    {
      title: 'E500',
      id: 'E500',
      detail: '/products/explorer-500w-portable-power-station',
      pcImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-product-E500.png?v=1665819663',
      mobImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-mob-product-E500.png?v=1665820267'
    },
    {
      title: 'E1000 PRO',
      id: 'E1000PRO',
      detail: '/products/explorer-1000-pro-portable-power-station',
      pcImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-product-E1000pro.png?v=1665819662',
      mobImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-mob-product-E1000pro.png?v=1665820267'
    },
    {
      title: 'E1500',
      id: 'E1500',
      detail: '/products/explorer-1500-portable-power-station',
      pcImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-product-E1500.png?v=1665819663',
      mobImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-mob-product-E1500.png?v=1665820267'
    },
    {
      title: 'E2000 PRO',
      id: 'E2000PRO',
      detail: '/products/explorer-2000-pro-portable-power-station',
      pcImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-product-E2000pro.png?v=1665819663',
      mobImg: 'https://cdn.shopify.com/s/files/1/0550/0524/9633/files/tenth-mob-product-E2000pro.png?v=1665820267'
    }
  ]
  if (location.pathname === '/pages/jackery-10th-anniversary') {
    let index = tenth_product.findIndex(v => v.id === 'E2000PRO')
    shopCommon.isMobile() && window.screen.width < 1025 ?  $('.J-tenth-showProduct img').attr('src', tenth_product[index].mobImg) :  $('.J-tenth-showProduct img').attr('src', tenth_product[index].pcImg)
  }
  $('.J-tenth-tab .button').click(function() {
    $(this).addClass('active').siblings().removeClass('active')
    let id = $(this).data('product-id')
    let index = tenth_product.findIndex(v => v.id === id)
    if (shopCommon.isMobile() && window.screen.width < 1025) {
      $('.J-tenth-showProduct img').attr('src', tenth_product[index].mobImg)
    } else {
      $('.J-tenth-showProduct img').attr('src', tenth_product[index].pcImg)
    }
    $('.J-tenth-showProduct a').attr('href', tenth_product[index].detail)
  })
  $('.J-tenth-mob-tab .button').click(function() {
    let id = $(this).data('product-id')
    let index = tenth_product.findIndex(v => v.id === id)
    // 高亮
    $('.J-tenth-mob-tab .button').each(function(i) {
      if ($(this).data('product-id') === id) {
        $(this).addClass('active')
      } else {
        $(this).removeClass('active')
      }
    })
    $('.J-tenth-showProduct img').attr('src', tenth_product[index].mobImg)
    $('.J-tenth-showProduct a').attr('href', tenth_product[index].detail)
    $('.J-mob-tab').slideUp()
    $('.J-tenth-down .down').show().siblings().hide()
  })
  $('.J-tenth-down').click(function() {
    if ($('.J-tenth-down .down').is(':hidden')) {
      $('.J-tenth-down .down').show().siblings().hide()
      $('.J-mob-tab').slideUp()
    } else {
      $('.J-tenth-down .down').hide().siblings().show()
      $('.J-mob-tab').slideDown()
    }
  })
  // 处理注册or激活完成后落地页展示奖品
  if (location.pathname === '/pages/jackery-10th-anniversary' && shopCommon.getParam("task")) {
    // 落地页先去掉自动弹出逻辑，根据接口返回是否完成任务再判断是否需要弹出
    clearTimeout(tenthPopTimer)
    $('#tenth-pop').hide()

    let params = {
      ty_token: shopCommon.getParam("ty_token"),
      email: shopCommon.getParam("email")
    }
    tenthResult(params, function(res) {
      // $('.J-tenth-page-prizesImg').attr('src', res.gift_url)
      // $('.J-gift-time').text(res.discount.start_at_desc + '-' + res.discount.end_at_desc)
      // $('.J-tenth-page-code').text(res.discount.code)
      // $('.J-prizes-title').text(res.title)
      // $('.J-tenth-prizes-box').show()
      // 处理自动弹框逻辑
      if (res.status === 1) {
        tenthShow = 'no'
        $('.J-prizes-pop').show()
        $('.theme-v2 main').css('z-index', '101')
        $('.J-tenth-button').hide()
        $('.J-prizes-pop .J-tenth-prizes-img img').attr('src', res.gift_url)
        $('.J-prizes-pop .J-tenth-limit').text(res.discount.currency + res.discount.limit_amount)
        $('.J-prizes-pop .J-tenth-time').text(res.discount.start_at_desc + ' ~ ' + res.discount.end_at_desc)
        $('.J-prizes-pop .J-tenth-code').text(res.discount.code)
      } else {
        tenthShow = 'yes'
      }
      console.log(tenthShow, 'tenthShow66666');
      localStorage.setItem('tenthShow', tenthShow)
      if (localStorage.getItem('tenthShowNum') < 2 && localStorage.getItem('tenthShow') === 'yes') {
        tenthPopTimer = setTimeout(function() {
          $('#tenth-pop').show()
          getTenthPopup('popup')
        }, 2000)
      }
    }, function(err) {
      if (err.code === 61003) {
        pagePrizesPolling(params)
      }
    })
  }
  // 落地页轮询
  function pagePrizesPolling(obj) {
    let timer = null
    timer = setTimeout(function() {
      tenthResult(obj, function(res) {
        // 处理自动弹框逻辑
        if (res.status === 1) {
          tenthShow = 'no'
          $('.J-prizes-pop').show()
          $('.theme-v2 main').css('z-index', '101')
          $('.J-tenth-button').hide()
          $('.J-prizes-pop .J-tenth-prizes-img img').attr('src', res.gift_url)
          $('.J-prizes-pop .J-tenth-limit').text(res.discount.currency + res.discount.limit_amount)
          $('.J-prizes-pop .J-tenth-time').text(res.discount.start_at_desc + ' ~ ' + res.discount.end_at_desc)
          $('.J-prizes-pop .J-tenth-code').text(res.discount.code)
        } else {
          tenthShow = 'yes'
        }
        localStorage.setItem('tenthShow', tenthShow)
        if (localStorage.getItem('tenthShowNum') < 2 && localStorage.getItem('tenthShow') === 'yes') {
          $('#tenth-pop').show()
          getTenthPopup('popup')
        }
        clearTimeout(timer)
      }, function(err) {
        if (err.code === 61003) {
          pagePrizesPolling(obj)
        }
      })
    }, 1000)
  }
  // 落地页关闭展示奖品弹框
  $('.J-prizes-pop .J-tenth-prizes-close').click(function() {
    $('.J-prizes-pop').hide()
    $('.theme-v2 main').css('z-index', '2')
    $('.J-tenth-button').show()
  })
  // 落地页复制code
  $('.J-tenth-page-copy').click(function() {
    let code = $('.J-tenth-page-code').text()
    copyText(code)
    $('.J-tenth-page-codeTip').fadeIn()
    setTimeout(function() {
      $('.J-tenth-page-codeTip').fadeOut()
    }, 1000)
  })
})
// 十周年抽奖活动-end

;$(function() {
  let inputArr = document.querySelectorAll(".el-form-item__inner")
	for(let index = 0; index < inputArr.length; index++) {
		inputArr[index].onfocus = function() {
      this.previousElementSibling && this.previousElementSibling.classList.add("el-form-item__inner-active")
		}

		inputArr[index].onblur = function() {
			if(this.value == '') {
        this.previousElementSibling && this.previousElementSibling.classList.remove("el-form-item__inner-active")
			}
		}
	}
})