var $ = require('jquery');

var _caches = {};
var ajax = $.ajax;

/**
 * AJAX单例请求，一般用于防止按钮重复点击，tab切换ajax请求处理
 * @param params
 *      在$.ajax参数基础上增加
 *      single: {
 *          name: '请求命名空间'，相同的将进入单例请求规则处理
 *          rule: 'old/new/auto'，
 *                默认是new，放弃之前请求，使用最新的请求；
 *                old是忽略后续请求，使用旧的请求；
 *                auto是自动判断，如果请求（url+data）与之前相同使用old方式，否则使用new方式
 *      }
 * @returns {*}
 */
var single = function (params) {
    var obj = params.single;
    var rule = obj.rule || 'new';
    rule = rule.toLowerCase();
    if ($.inArray(rule, ['new', 'old', 'auto']) === -1) {
        rule = 'new';
    }

    var cache = _caches[obj.name];
    if (cache) {
        if (rule === 'auto') {
            var flag;
            if (typeof params.data === 'object' && typeof params.data === typeof cache.params.data) {
                flag = $.param(params.data) === $.param(cache.params.data);
            } else {
                flag = params.data === cache.params.data;
            }
        }
        if (rule === 'old' || flag === true) { // 请求的URL和参数相同则保留上一个
            return cache.xhr;
        } else if (rule === 'new' || flag === false) { // 不相同则放弃前一个请求
            if (cache.xhr) {
                cache.xhr.abort();
            }
        }
    }
    var completeFn = params.complete;
    params.complete = function (xhr, status) {
        delete _caches[obj.name];// 完成后清理
        if ($.isFunction(completeFn)) {
            completeFn(xhr, status);
        }
    };

    var xhr = ajax(params);
    _caches[obj.name] = {
        xhr: xhr,
        params: params
    };
    return xhr;
};

$.ajax = function (params) {
    return params.single ? single(params) : ajax(params);
};

module.exports = single;