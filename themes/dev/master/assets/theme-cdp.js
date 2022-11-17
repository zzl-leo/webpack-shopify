/*
 * @Date: 2022-10-19 10:44:30
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-14 15:04:53
 * @FilePath: \us-cdp-正式\assets\theme-cdp.js
 * @description: cdp埋点脚本
 */
/*----------工具函数----------*/
/**
 * url query参数转对象
 *
 * @param {string} url 地址链接
 * @returns {Object}
 */
const urlQueryToObject = (url = window.location.href) => {
    const querys = url.split('?')[1] || []
    if (querys.length > 0) {
        return JSON.parse('{"' + decodeURI(querys).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }
    return {}
}

var cdpCommon = {
    /**
     * 优惠券页面判断
     *
     * @param {string} url 页面地址
     * @returns {Boolean}
     */
    isCouponPages: function () {
        const arr = ["/products"]
        const url = location.pathname
        const res = arr.findIndex(item => {
            return url.indexOf(item) !== -1
        })

        return res !== -1 ? arr[res] : ''
    },

    pageTypeFilter_: function (url) {
        const types = [{
                name: "品牌文章",
                reg: "/pages"
            },
            {
                name: "商品详情页",
                reg: "/products"
            },
            {
                name: "博客文章",
                reg: "/blogs"
            },
            {
                name: "产品聚合页",
                reg: "/collections"
            },
            {
                name: "政策页面",
                reg: "/policy"
            },
        ]
        const res = types.find(item => url.indexOf(item.reg) !== -1) || {}
        return res.name || ''
    },

    savePageInfo: function () {
        let origin_info = cookie.get("_referer_page_info") || '{}'
        origin_info = JSON.parse(origin_info)
        if (origin_info.url !== location.href) {
            const info = JSON.stringify({
                url: location.href,
                title: document.title
            })
            cookie.set('_referer_page_info', info)
        }
    },

    getRefererPage: function () {
        let info = {
            url: "",
            title: ""
        }
        try {
            info = JSON.parse(cookie.get("_referer_page_info"))
        } catch (error) {
            info = info
        }
        return info
    },

    getCustomerFirstTime: function () {
        return {
            show: !!theme.settings.customer_id,
            val: (Number(theme.settings.customer_order_count) || 0) >= 1 ? false : true
        }
    },
    getWarrantyYear: function () {
        const warranty_flag = $(".product_warranty .w_checkbox").is(':checked') || false // 延保是否勾选
        const warranty_year = Number($(".product_warranty .info").attr("warranty_year")) || 0 // 延保时间
        return warranty_flag ? warranty_year : 0
    },
    warrantyYearByTitle: function (title) { // 根据延保properties信息获取延保时间
        const year = Number(title.substring(2).split("-year")[0]) || 0
        return year
    },
    /**
     * 判断首次进入还是刷新
     */
    noFresh: function () {
        if (window.performance.navigation.type == 0) { // 首次
            return true
        } else {
            return false
        }
    },
    /**
     * 根据sku分类
     * @param {string} sku
     */
    categoryBySku: function (sku) {
        const res = {
            commodity_first_category: "",
            commodity_second_category: ""
        }
        if (sku.startsWith("70")) {
            res.commodity_first_category = "储能"
            const joinStr = sku.indexOf("-") !== -1 ? "-" : "."
            let type_str = sku.split(joinStr)[1] || ""
            type_str = type_str.replace(/^(0)+/g, '');
            type_str && (res.commodity_second_category = 'E' + type_str)
        } else if (sku.startsWith("G")) {
            res.commodity_first_category = "储能"
            let operate_str = sku.slice(1)
            let slice_index = operate_str.length - 1
            for (let index = 0; index < operate_str.length; index++) {
                if (!/\d/.test(operate_str[index])) {
                    slice_index = index
                    break
                }
            }
            operate_str = operate_str.substring(0, slice_index)
            operate_str = operate_str.replace(/^(0)+/g, '');
            operate_str && (res.commodity_second_category = 'E' + operate_str)
        } else if (sku.startsWith("60")) {
            res.commodity_first_category = "套件"
            const joinStr_ = sku.indexOf("-") !== -1 ? "-" : "."
            let type_str_ = Number((sku.split(joinStr_)[1] || "").substring(0, 2))
            if (type_str_) {
                res.commodity_second_category = 'SG' + type_str_ * 100
            }
        } else if (sku.startsWith("80")) {
            res.commodity_first_category = "太阳能板"
            let joinStr__ = sku.indexOf("-") !== -1 ? "-" : "."
            let operate_str__ = sku.split(joinStr__)[1] || ""
            operate_str__ = operate_str__.replace(/^(0)+/g, '');
            if (operate_str__) {
                res.commodity_second_category = operate_str__ + 'W'
            }
        } else if (sku.startsWith("N-P-")) {
            res.commodity_first_category = "储能"
            const n_p_str = sku.match(/N-P-(\d*)-/) ? sku.match(/N-P-(\d*)-/)[1] : ""
            res.commodity_second_category = "E" + n_p_str
        } else if (sku.startsWith("N-P")) {
            res.commodity_first_category = "套件"
            const n_p_str = sku.replace("N-P")
            const n_p_str_sec = n_p_str.split("-")[0].match(/\d+/g) ? n_p_str.split("-")[0].match(/\d+/g)[0] : n_p_str.split("-")[0]
            res.commodity_second_category = "SG" + n_p_str_sec
        } else if (sku.startsWith("T1G")) {
            res.commodity_first_category = "套件"
            const t1g_str_sec = sku.match(/SP(\d*)G/) ? sku.match(/SP(\d*)G/)[1] : ""
            res.commodity_second_category = "SG" + t1g_str_sec
        } else if (sku.startsWith("N-S-")) {
            res.commodity_first_category = "太阳能板"
            const n_s_sec = sku.match(/N-S-(\d*)-/) ? sku.match(/N-S-(\d*)-/)[1] : ""
            res.commodity_second_category = n_s_sec + "W"
        } else {
            res.commodity_first_category = "配件"
            res.commodity_second_category = "配件"
        }
        return res
    },
    /**
     * 动态结算按钮事件绑定
     */
    initPaymentDom: (obj, cb) => {
        const targets = $("[data-shopify=payment-button]") 
        if(targets[0]) {
            targets[0].addEventListener("click", () => {
                obj.warranty_year =  cdpCommon.getWarrantyYear()
                cb(obj)
            })
        } else {
            setTimeout(() => {
                initPaymentDom(obj, cb)
            }, 100);
        }
    },

    /**
     * 缓存事件触发标志-与sensors cookieid同步
     */
    cacheEvent: (eventName) => {
        let is_first = true
        const cookie_id = jackerySensors?.quick('getAnonymousID') || ""
        const cacheName = `_jk_sensors_${eventName}`
        const _cache = localStorage.getItem(cacheName)

        if(_cache) { // 存在缓存标志
            is_first = false
            if(_cache !== cookie_id) {
                localStorage.setItem(cacheName, cookie_id)
                is_first = true
            }
        }
        localStorage.setItem(cacheName, cookie_id)
        return is_first
    }
}
/*----------工具函数----------*/



/*----------数据全局设置函数----------*/
window.addEventListener('unload', () => { // 保存当前页面信息(记录referer page)
    cdpCommon.savePageInfo()
})
/*----------数据全局设置函数----------*/


/*----------属性&identities----------*/
const SetOtherEmail = (params) => { // 用户属性设置 - 联系邮箱
    jackerySensors.setProfile({
        contact_email: [params.contact_email]
    })
    shopCommon.saveOtherEmail(params.contact_email || '')
}

/**
* 自定义事件使用
* @param {Object} 传了 subscribe_email 则设置other_email并存cookie
*/
const BindIdentities = (params = {}) => { // 自定义事件使用
    if (shopCommon.isLogin()) {
        cookie.get("_jk_user_id") && jackerySensors.bind("identity_jackery_id", cookie.get("_jk_user_id"))
        cookie.get("_jk_user_email") && jackerySensors.bind("identity_register_email", cookie.get("_jk_user_email"))
    }
    if (params.subscribe_email) {
        jackerySensors.bind("identity_other_email", params.subscribe_email)
        SetOtherEmail({contact_email: params.subscribe_email})
        return
    }
    if (!shopCommon.isLogin() && !params.subscribe_email) {
        shopCommon.getOtherEmail() && jackerySensors.bind("identity_other_email", shopCommon.getOtherEmail())
    }
}
/*----------属性&identities----------*/



/*----------自定义事件----------*/
// SubscriptionResult - 订阅结果
const SubscriptionResult = async (params = {
    _latest_gclid: '',
    email_used: '',
    agree_to_receive_promotion: "默认订阅",
    subscription_source: '底层订阅框',
}) => {
    BindIdentities({
        subscribe_email: params.email_used
    })

    jackerySensors.setProfile({ // 用户属性设置 - 订阅
        subscribe_email: params.email_used,
        is_subscribed_user: params.email_used && (params.agree_to_receive_promotion !== '不同意')
    })

    jackerySensors.track("SubscriptionResult", {
        _latest_gclid: params._latest_gclid,
        email_used: params.email_used,
        agree_to_receive_promotion: params.agree_to_receive_promotion,
        subscription_source: params.subscription_source
    })
}

// footer 官网底部订阅
const FooterSubscriptionResult = () => {
    $("#newsletter-footer [name='commit']").click(function () {
        const email = $("#newsletter-footer [name='contact[email]']")[0].value
        if (shopCommon.verifyEmail(email)) {
            SubscriptionResult({
                _latest_gclid: '',
                email_used: email,
                agree_to_receive_promotion: "默认订阅",
                subscription_source: '底层订阅框', // 订阅来源
            })
        }
    })
}

// ReturnSearchResults - 搜索结果
const ReturnSearchResults = async (params = {
    key_word: '',
    result_number: 0,
    result_sku_number: 0
}) => {
    await BindIdentities()
    await jackerySensors.track("ReturnSearchResults", {
        ...params
    })
}

// ClickSearchResult - 点击搜索结果
const ClickSearchResult = async (params = {
    key_word: '',
    result_number: 0,
    result_sku_number: 0,
    position_number: 0,
    page_number: 1,
    click_content_type: '商品详情页',
    click_page_title: '',
    click_page_url: '',
    commodity_first_category: '',
    commodity_second_category: '',
    spu_id: '',
    spu_name: '',
    sku_id: '',
    sku_name: '',
    sku_unit_price: 0,
    sku_sale_price: 0,
    commodity_tag: ['']
}) => {
    await BindIdentities()
    jackerySensors.track("ClickSearchResult", {
        ...params
    })
}

// ExtendWarranty - 提交延保注册
const ExtendWarranty = async (params = {
    name: '',
    order_id: '',
    receiver_phone: '',
    product_category: '',
    place_of_purchase: '',
    product_serial_number: '',
    purchase_date: '2022-10-12',
    is_successful: true,
    fail_reason: ''
}) => {
    await BindIdentities()
    jackerySensors.track("ExtendWarranty", {
        ...params
    })
}

// SilentHeartBeat - 静默心跳(300s)
const SilentHeartBeat = (time = 300) => {
    ifvisible.setIdleDuration(time);
    ifvisible.idle(async () => {
        // console.log("byebye -------", shopCommon.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"))
        await BindIdentities()
        jackerySensors.track("SilentHeartBeat", {
            start_time: shopCommon.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
            referer_page: cdpCommon.getRefererPage().url
        })
    });
    ifvisible.wakeup(function () {
        // console.log("wakeup -------", shopCommon.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"))
    });
}

/**
 * CouponExposure - 优惠券曝光
 * @param {Object}
 * @description: 优惠券容器 dom-type=coupon
 */
const CouponExposure = (params) => {
    const coupons = $("[dom-type=coupon]")
    if (window.CouponObserver) window.CouponObserver.disconnect();
    const options = {
        threshold: 0.8
    }
    window.CouponObserver = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
            if (entry.intersectionRatio === 1) { // 完全展示的时候
                await BindIdentities()
                jackerySensors.track("CouponExposure", params)
                // window.CouponObserver.unobserve(entry.target)
            }
        })
    }, options)

    for (let index = 0; index < coupons.length; index++) {
        window.CouponObserver.observe(coupons[index])
    }
}

// ReceiveCoupon - 获取优惠码(商品详情页、老带新)
const ReceiveCoupon = (obj = {}) => {
    $("[dom-type='coupon']").click(async function (e) {
        await BindIdentities()
        const dom = e.currentTarget
        const params = JSON.parse(e.currentTarget.getAttribute("coupon-data")) || {}
        jackerySensors.track("ReceiveCoupon", {
            ...params,
            ...obj
        })
    })
}

// CommodityDetailView - 商品详情页浏览
const CommodityDetailView = async (params) => {
    await BindIdentities()
    jackerySensors.track("CommodityDetailView", {
        ...params
    })
}

// BuyNow - 立即购买
const CDPBuyNow = async (params) => {
    await BindIdentities()
    jackerySensors.track("BuyNow", {
        ...params
    })
}

// 加购/移除
const AddOrRemoveToCart = async (params, type) => {
    console.log(params)
    await BindIdentities()
    const obj = {
        referer_page: cdpCommon.getRefererPage().url,
        referer_page_title: cdpCommon.getRefererPage().title,
        commodity_first_category: cdpCommon ?.categoryBySku(params.sku_id) ?.commodity_first_category || "",
        commodity_second_category: cdpCommon ?.categoryBySku(params.sku_id) ?.commodity_second_category || "",
    }
    const evtName = type === 'minus' ? 'RemoveFromCart' : 'AddToCart'
    obj.is_first_time = cdpCommon.cacheEvent(evtName)
    jackerySensors.track(evtName, {
        ...params,
        ...obj
    })
}

// 老带新活动点击复制链接 - ReferSharingCopyLink
const ReferSharingCopyLink = async (params) => {
    await BindIdentities()
    await SetOtherEmail({contact_email: params.email_address})

    jackerySensors.track("ReferSharingCopyLink", {
        ...params,
        sharer_id_2: jackerySensors.quick('getAnonymousID')
    })
}

// 老带新活动提交信息结果 - ReferSharingSubmitResult
const ReferSharingSubmitResult = async (params) => {
    await BindIdentities()
    await SetOtherEmail({contact_email: params.email_address})
    jackerySensors.track("ReferSharingSubmitResult", {
        ...params
    })
}

// 老带新活动点击分享按钮 - ReferSharingButtonClick
const ReferSharingButtonClick = async (params) => {
    await BindIdentities()
    await SetOtherEmail({contact_email: params.email_address})
    const obj = {
        sharer_id_2: jackerySensors.quick('getAnonymousID')
    }

    jackerySensors.track("ReferSharingButtonClick", {
        ...params,
        ...obj
    })
}

// 运营位点击 - mktClick
const mktClick = async (params) => {
    await BindIdentities()
    jackerySensors.track("mktClick", {
        ...params
    })
}

/**
 * 运营位点击事件绑定 - mktClick
 * @param {Object} mkt-data: {mkt_area: ''}
 * @description: 运营位容器 dom-type=mkt  
 */
const InitmktClick = () => {
    $("[dom-type=mkt]").click(function (e) {
        const mkt_dom = e.currentTarget
        const mkt_area = (mkt_dom.getAttribute("mkt-area") || '').split("-")
        const mkt_link = mkt_dom.getAttribute("href") || (mkt_dom.querySelector("a") ?.getAttribute("href") || '')
        const mkt_link_type = cdpCommon.pageTypeFilter_(mkt_link)
        const mkt_material_id = mkt_dom.getAttribute("mkt-materialID") || ''
        const mkt_material_name = mkt_dom.getAttribute("mkt-materialname") || ''
        const sku_unit_price = mkt_dom.getAttribute("mkt-skuprice") || 0
        const commodity_tag = mkt_dom.getAttribute("mkt-commodity_tag")
        const mkt_page = mkt_dom.getAttribute("mkt-page")
        const params = {
            mkt_position_number: Number(mkt_area[1]) || 0,
            mkt_area: mkt_area[0],
            hyper_page_url: mkt_link,
            hyper_page_type: mkt_link_type,
            mkt_material_id,
            mkt_page
        }
        mkt_material_name && (params.mkt_material_name = mkt_material_name)
        sku_unit_price && (params.sku_unit_price = Number(sku_unit_price) / 100)
        commodity_tag && (params.commodity_tag = commodity_tag.split(','))
        mktClick(params)
    })
}

// 结账 - Checkout
const CheckoutGA = async (params) => {
    await BindIdentities()
    jackerySensors.track("Checkout", {
        ...params
    })
}

// 结账详情 - CheckoutDetail
const CheckoutDetail = async (params) => {
    await BindIdentities()
    jackerySensors.track("CheckoutDetail", {
        ...params
    })
}

// 填写配送信息 - FulfillDeliveryInfo
const FulfillDeliveryInfo = async (params) => {
    await BindIdentities()
    await SetOtherEmail({contact_email: params.receiver_email})
    jackerySensors.track("FulfillDeliveryInfo", {
        ...params
    })
}

// 填写配送信息详情 - FulfillDeliveryInfoDetail
const FulfillDeliveryInfoDetail = async (params) => {
    await BindIdentities()
    jackerySensors.track("FulfillDeliveryInfoDetail", {
        ...params
    })
}

// 选择配送方式 - SelectShippingMethod
const SelectShippingMethod = async (params) => {
    await BindIdentities()
    jackerySensors.track("SelectShippingMethod", {
        ...params
    })
}

// 选择配送方式详情 - SelectShippingMethodDetail
const SelectShippingMethodDetail = async (params) => {
    await BindIdentities()
    jackerySensors.track("SelectShippingMethodDetail", {
        ...params
    })
}

// 提交订单详情 - SubmitOrderDetail
const SubmitOrderDetail = async (params) => {
    await BindIdentities()
    jackerySensors.track("SubmitOrderDetail", {
        ...params
    })
}

// 提交订单 - SubmitOrder
const SubmitOrder = async (params) => {
    await BindIdentities()
    jackerySensors.track("SubmitOrder", {
        ...params
    })
}

// 支付订单 - PayOrder
const PayOrder = async (params) => {
    await BindIdentities({
        subscribe_email: params.receiver_email
    })
    jackerySensors.setProfile({
        is_paid_user: true,
        latest_pay_time: shopCommon.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")
    })
    jackerySensors.track("PayOrder", {
        ...params
    })
}

// 支付订单详情 - PayOrderDetail
const PayOrderDetail = async (params) => {
    await BindIdentities()
    jackerySensors.track("PayOrderDetail", {
        ...params
    })
}
/*----------自定义事件----------*/

(function () {
    /* init - sensers sdk */
    window.jackerySensors = window['sensorsDataAnalytic201505'];
    window.jackerySensors.init({
        // server_url: 'https://cdpdata.myjackery.com/sa',
        server_url: 'https://cdpdata.myjackery.com/sa?project=production',
        heatmap: {
            clickmap: 'default',
            scroll_notice_map: 'default'
        },
        use_client_time: true,
        send_type: 'beacon',
        show_log: false,
        source_channel: ["Facebook", "Google", "Bing", "Tiktok", "DuckDuckGo", "Ecosia"],
        preset_properties: {
            latest_landing_page: true
        }
    });

    // 设置公共属性
    const register_params = {
        platform_type: shopCommon.isMobile() ? 'Mobile' : 'PC',
        country_site: $http.cr,
        is_login: shopCommon.isLogin(),
        currency: Shopify?.currency?.active || Shopify?.Checkout?.currency || ""
    }
    register_params.is_login && (register_params.is_paid_user)
    if(register_params.is_login) {
        const customer_f = cdpCommon.getCustomerFirstTime()
        customer_f.show && (register_params.is_paid_user = !customer_f.val)
    }
    window.jackerySensors.registerPage(register_params);

    window.jackerySensors.quick('autoTrack');
    window.jackerySensors.use('PageLeave'); // 页面浏览时长
    window.jackerySensors.use('PageLoad'); // 页面加载时长

    jackerySensors.setProfile({ // 最近一次访问时间
        latest_visit_time: shopCommon.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"),
        country_site: $http.cr
    })

    const urlParams = urlQueryToObject()

    $(document).ready(function () {
        // 搜索
        if (location.pathname === '/search') {
            const _p = Number(urlParams.page) || 1
            const searchParams = urlQueryToObject()
            const dom = $("div[data-section-type=collection-template]").length > 0 ? $("div[data-section-type=collection-template]")[0] : null
            const result_sku_number = dom ? dom.querySelectorAll('.grid-product').length : 0
            let resDom = dom.querySelector("h2") ? dom.querySelector("h2") ?.innerText : ''
            // resDom = Number(resDom.replace('results', '')) || 0 // 搜索结果
            resDom = Number(resDom.split(" ")[0]) || 0
            const key_word = searchParams.q || ''
            if(_p === 1) {
                ReturnSearchResults({
                    key_word: key_word.replace(/\+/g, " "),
                    result_number: Number(resDom) || 0,
                    result_sku_number
                })
            }

            // 保存搜索记录
            const searchInfo = {
                key_word,
                result_number: Number(resDom) || 0,
                result_sku_number,
                page_number: searchParams.page || 1
            }
            cookie.set('_referer_key_word', JSON.stringify(searchInfo))
        }
        // 点击搜索(搜索页点击访问的)
        if (urlParams._pos && urlParams._sid && urlParams._ss === 'r') {
            if (cdpCommon.getRefererPage().url.indexOf('/search') !== -1) {
                const searchParams = cookie.get("_referer_key_word") ? JSON.parse(cookie.get("_referer_key_word")) : {}
                const params = {
                    key_word: (searchParams.key_word || '').replace(/\+/g, " "),
                    result_number: Number(searchParams.result_number) || 0,
                    result_sku_number: Number(searchParams.result_sku_number) || 0,
                    position_number: (Number(urlParams._pos) || 1) % 12 || 12,
                    page_number: Number(searchParams.page_number) || 1,
                    click_content_type: cdpCommon.pageTypeFilter_(location.href),
                    click_page_title: document.title,
                    click_page_url: location.href,
                    commodity_first_category: '',
                    commodity_second_category: '',
                    spu_id: '',
                    spu_name: '',
                    sku_id: '',
                    sku_name: '',
                    sku_unit_price: 0,
                    sku_sale_price: 0,
                    commodity_tag: ['']
                }

                if (cdpCommon.pageTypeFilter_(location.href) === '商品详情页') {
                    const tags = theme.settings.product_tags
                    const p_id = theme.settings.product_id
                    const p_name = theme.settings.product_name
                    const sku_name = theme.settings.product_sku_title || p_name
                    const variants_len = Number(theme.settings.variants_num) || 1
                    const price_min = Number(theme.settings.product_price_min) || 0
                    const sku_unit_price = Number(theme.settings.product_compare_at_price_min) || price_min || 0

                    params.commodity_tag = JSON.parse(tags)
                    params.spu_id = variants_len > 1 ? p_id : theme.settings.product_sku || p_id
                    params.spu_name = variants_len > 1 ? p_name : sku_name
                    params.sku_name = variants_len > 1 ? '' : sku_name
                    params.sku_id = variants_len > 1 ? '' : theme.settings.product_sku || p_id
                    params.sku_unit_price = sku_unit_price / 100
                    params.sku_sale_price = price_min / 100
                    params.commodity_first_category = cdpCommon.categoryBySku(theme.settings.product_sku) ?.commodity_first_category || ""
                    params.commodity_second_category = cdpCommon.categoryBySku(theme.settings.product_sku).commodity_second_category || ""
                }
                ClickSearchResult(params)
            }
        }
        // 商品详情
        if (location.pathname.indexOf('/products') !== -1) {
            const variants_len = Number(theme.settings.variants_num) || 1
            const c_variant = theme.Variants.currentVariant // 当前变体商品
            const c_variant_title = c_variant.title === 'Default Title' ? c_variant.name : c_variant.title
            const sku_name = theme.settings.product_sku_title || theme.settings.product_name

            const params = {
                referer_page: cdpCommon.getRefererPage().url,
                referer_page_title: cdpCommon.getRefererPage().title,
                commodity_first_category: '',
                commodity_second_category: '',
                spu_id: variants_len > 1 ? theme.settings.product_id : theme.settings.product_sku,
                spu_name: variants_len > 1 ? theme.settings.product_name : sku_name,
                sku_id: variants_len > 1 ? '' : theme.settings.product_sku,
                sku_name: variants_len > 1 ? '' : sku_name,
                sku_unit_price: (Number(theme.settings.product_compare_at_price_min) || 0) / 100 || (Number(theme.settings.product_price_min) || 0) / 100,
                sku_sale_price: (Number(theme.settings.product_price_min) || 0) / 100,
                commodity_tag: JSON.parse(theme.settings.product_tags || '[]')
            }
            params.is_first_time = cdpCommon.cacheEvent("CommodityDetailView")

            params.commodity_first_category = cdpCommon.categoryBySku(theme.settings.product_sku) ?.commodity_first_category || ""
            params.commodity_second_category = cdpCommon.categoryBySku(theme.settings.product_sku).commodity_second_category || ""
            CommodityDetailView(params)

            const b_obj = { ...params }
            b_obj.sku_id = c_variant.sku
            b_obj.sku_name = c_variant_title
            b_obj.sku_sale_price = c_variant.price / 100
            b_obj.sku_unit_price = c_variant.compare_at_price ? c_variant.compare_at_price / 100 : c_variant.price / 100
            b_obj.warranty_year = cdpCommon.getWarrantyYear()
            b_obj.sku_quantity = 1
            cdpCommon.initPaymentDom(b_obj, CDPBuyNow)
        }

        // collections - 运营位
        if (location.pathname.indexOf('/collections/portable-power-stations') !== -1) {
            $(".grid__item").click(function (e) {
                const mkt_dom = e.currentTarget
                const mkt_area = (mkt_dom.getAttribute("data-index")) || 0
                const mkt_link = mkt_dom.getAttribute("href") || (mkt_dom.querySelector("a") ?.getAttribute("href") || '')
                const mkt_link_type = cdpCommon.pageTypeFilter_(mkt_link)
                const mkt_material_id = mkt_dom.getAttribute("data-img") || ''
                const mkt_material_name = mkt_dom.getAttribute("data-sku") || ''
                const sku_unit_price = mkt_dom.getAttribute("data-price") || 0
                const commodity_tag = mkt_dom.getAttribute("data-tags")
                // const mkt_page = mkt_dom.getAttribute("mkt-page")
                const params = {
                    mkt_position_number: Number(mkt_area) || 1,
                    mkt_area: "产品位",
                    hyper_page_url: mkt_link,
                    hyper_page_type: mkt_link_type,
                    mkt_material_id,
                    mkt_page: "产品聚合页2 - Portable Power Stations",
                }
                mkt_material_name && (params.mkt_material_name = mkt_material_name)
                sku_unit_price && (params.sku_unit_price = Number(sku_unit_price) / 100)
                commodity_tag && (params.commodity_tag = JSON.parse(commodity_tag))
                mktClick(params)
            })
        }
        // 静默心跳
        SilentHeartBeat(300)

        // 订阅
        // 1.底部订阅√ 
        // 2.保修注册订阅√ 
        // 3.ID系统注册订阅√
        // 4.老带新页面订阅√
        // 5.到货提醒订阅√
        // 4.结算checkout订阅
        FooterSubscriptionResult()
        InitmktClick()
    })
})()