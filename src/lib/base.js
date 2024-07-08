import { assets, base, resolveRoute } from '$app/paths';
import { goto } from '$app/navigation';


var asset = '/sales';
if (location.hostname == 'localhost') {
    // asset = '/sales/.svelte-kit';
    asset = '/sales/src';
    // for view
    if (location.port == '8000' || location.port == '8001' || location.port == '4173') {
        asset = '';
    }
}
export {asset}

export function getRootApi() {
    var rs = '/sales'
    if (location.hostname == 'localhost') {
        rs = 'http://localhost/web/interdogmedia/pubpower_sales/pubpower_sales/sales';
        //rs = 'http://localhost:8000/sales';
    }
    return rs;
}
var root_api = getRootApi();

export {root_api};

export const S = document.querySelector.bind(document)
export const SS = document.querySelectorAll.bind(document)


export function ajax(options) {
    var config = {
        async: true,
        method: 'get',
        data: {},
        success: function(res) {},
        error: function(status) {},
        complete: function(xhr) {}
    }
    Object.assign(config, options)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                config.success(xhr.responseText);
            } else {
                config.error(xhr.status);
            }
        }
    };
    xhr.onloadend = function() {
        config.complete(xhr)
    }
    xhr.open(config.method, config.url, config.async);
    if (config.method.toLowerCase() == 'post') {
        if (config.data instanceof FormData) {
            xhr.processData = false;
            xhr.contentType = false;
        } else {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let formData = new URLSearchParams();
            for (let key in config.data) {
                formData.append(key, config.data[key]);
            }
            config.data = formData.toString();
        }
    }
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(config.data);
}

export var userToken = function() {
    var a = localStorage.getItem('user_token');
    if (!a && !(/\/login/.test(location.pathname))) {
        //location.href = base + '/login';
        return '';
    }
    return a;
}

export function getToken() {
    var rs = localStorage.getItem('user_token');
    if (!rs) rs = '';
    return rs;
}

export function removeToken() {
    localStorage.removeItem('user_token')
}

var token = localStorage.getItem('user_token');
if (!token) {
    token = '';
}
export {token}

export function checkLogin(res) {
    if (res && (res.trim() == 'error_login' || res.trim() == 'error login')) {
        if (location.hostname == 'localhost') {
            console.error('error login');
            //location.href = base + '/login';
        }
        else {
            location.href = base + '/login';
        }
    }
}

export function _get (param_name) {
    var url_param = new URLSearchParams(window.location.search);
    return url_param.get(param_name);
}


var lib = {
    web_name: 'S24',
    projects: ['adful', 'kol', 'pubpower', 'vli'],
    languages: ['EN', 'VI', 'FR'],
    send_statuses: ['clicked', 'fail', 'opened', 'other', 'pause', 'ready', 'sending', 'sent', 'skip', 'waiting'],
    goto_site(domain) {
        domain = getDomain(domain)
        goto(`${base}/empty?url=${base}/site/${domain}`)
    },
    pageStart() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    pageEnd() {
        if (S('.app')) S('.app').removeClass('page-loading');
    },
    startLoadingPage() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    endLoadingPage() {
        if (S('.app')) S('.app').removeClass('page-loading');
    },
    isLocal() {
        return location.hostname == 'localhost';
    },
    removeHtmlTag(input) {
        return input.replace(/<[^>]*>?/gm, '');
    },
    truncate(str, length=100) {
        if (str.length <= length) {
            return str;
        } else {
            return str.substring(0, length) + "...";
        }
    },
    isJSON(text) {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    },

}

export {lib}
