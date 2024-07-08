//import { root_api } from "./base";
import { assets, base } from '$app/paths';

export function getRootApi() {
    var rs = '/sales'
    if (location.hostname == 'localhost') {
        rs = 'http://localhost/web/interdogmedia/pubpower_sales/pubpower_sales/sales';
        //rs = 'http://localhost:8000/sales';
    }
    return rs;
}

export function getToken() {
    var rs = localStorage.getItem('user_token');
    if (!rs) rs = '';
    return rs;
}

export function _get (param_name) {
    var url_param = new URLSearchParams(window.location.search);
    return url_param.get(param_name);
}

export function getDomain(url) {
    url = url.trim();
    url = url.replace(/.*\/\/www./, '');
    url = url.replace(/.*:\/\//, '');
    url = url.replace(/#.*$/, '');
    url = url.replace(/\?.*$/, '');
    url = url.replace(/^\./, '');
    url = url.replace(/\.$/, '');
    url = url.replace(/\/.*/, '');
    
    if (!/\./.test(url)) {
        return null;
    }

    const cc_ltd = [".ac",".ad",".ae",".af",".ag",".ai",".al",".am",".ao",".aq",".ar",".as",".at",".au",".aw",".ax",".az",".ba",".bb",".bd",".be",".bf",".bg",".bh",".bi",".bj",".bm",".bn",".bo",".br",".bs",".bt",".bw",".by",".bz",".ca",".cc",".cd",".cf",".cg",".ch",".ci",".ck",".cl",".cm",".cn",".co",".cr",".cu",".cv",".cw",".cx",".cy",".cz",".de",".dj",".dk",".dm",".do",".dz",".ec",".ee",".eg",".er",".es",".et",".eu",".fi",".fj",".fk",".fm",".fo",".fr",".ga",".gd",".ge",".gf",".gg",".gh",".gi",".gl",".gm",".gn",".gp",".gq",".gr",".gs",".gt",".gu",".gw",".gy",".hk",".hm",".hn",".hr",".ht",".hu",".id",".ie",".il",".im",".in",".io",".iq",".ir",".is",".it",".je",".jm",".jo",".jp",".ke",".kg",".kh",".ki",".km",".kn",".kp",".kr",".kw",".ky",".kz",".la",".lb",".lc",".li",".lk",".lr",".ls",".lt",".lu",".lv",".ly",".ma",".mc",".md",".me",".mg",".mh",".mk",".ml",".mm",".mn",".mo",".mp",".mq",".mr",".ms",".mt",".mu",".mv",".mw",".mx",".my",".mz",".na",".nc",".ne",".nf",".ng",".ni",".nl",".no",".np",".nr",".nu",".nz",".om",".pa",".pe",".pf",".pg",".ph",".pk",".pl",".pm",".pn",".pr",".ps",".pt",".pw",".py",".qa",".re",".ro",".rs",".ru",".rw",".sa",".sb",".sc",".sd",".se",".sg",".sh",".si",".sk",".sl",".sm",".sn",".so",".sr",".ss",".st",".sv",".sx",".sy",".sz",".tc",".td",".tf",".tg",".th",".tj",".tk",".tl",".tm",".tn",".to",".tr",".tt",".tv",".tw",".tz",".ua",".ug",".uk",".us",".uy",".uz",".va",".vc",".ve",".vg",".vi",".vn",".vu",".wf",".ws",".ye",".yt",".za",".zm",".zw"];
    
    let arr = url.split('.');
    
    if (arr.length >= 3) {
        url = arr[arr.length - 3] + '.' + arr[arr.length - 2] + '.' + arr[arr.length - 1];
    }
    
    arr = url.split('.');
    
    if (arr.length >= 3) {
        const last_ltd = arr[arr.length - 1];
        if (!cc_ltd.includes('.' + last_ltd)) {
            url = arr[arr.length - 2] + '.' + arr[arr.length - 1];
        }
    }
    
    return url;
}


var lib = {
    web_name: 'S24',
    projects: ['adful', 'kol', 'pubpower', 'vli'],
    languages: ['EN', 'VI', 'FR'],
    pageStart() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    pageEnd() {
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
    }

}
export {lib}