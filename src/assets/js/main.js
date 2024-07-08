class ElementCollection extends Array {
    ready(cb) {
        const isReady = this.some(e=>{
            return e.readyState != null && e.readyState != "loading"
        }
        );
        if (isReady) {
            cb()
        } else {
            this.on("DOMContentLoaded", cb)
        }
        return this
    }
    each(cb) {
        this.forEach(cb)
    }
    get(idx) {
        return this[idx]
    }
    find(param) {
        var elms = new ElementCollection(), es, j;
        for (var i = 0; i < this.length; i++) {
            es = this[i].querySelectorAll(param);
            for (var j = 0; j < es.length; j++) {
                elms.push(es[j])
            }
        }
        return elms
    }
    on(event, cbOrSelector, cb) {
        if (typeof cbOrSelector === "function") {
            this.forEach(e=>e.addEventListener(event, cbOrSelector))
        } else {
            this.forEach(elem=>{
                elem.addEventListener(event, e=>{
                    if (e.target.matches(cbOrSelector) || $(e.target).parents(cbOrSelector).length) {
                        cb(e)
                    }
                }
                )
            }
            )
        }
        return this
    }
    html(content) {
        if (typeof content == "undefined")
            return this[0].innerHTML;
        this.forEach(elem=>{
            elem.innerHTML = content
        }
        );
        return this
    }
    text(content) {
        if (typeof content == "undefined")
            return this[0].innerText;
        this.forEach(elem=>{
            elem.innerText = content
        }
        );
        return this
    }
    append(content) {
        this.forEach(elem=>{
            elem.innerHTML += content
        }
        );
        return this
    }
    prepend(content) {
        this.forEach(elem=>{
            elem.innerHTML = content + elem.innerHTML
        }
        );
        return this
    }
    insertBefore(content) {
        var div = document.createElement('div');
        div.innerHTML = content;
        this.forEach(function(el) {
            el.parentNode.insertBefore(div.firstChild, el)
        })
    }
    next() {
        return this.map(e=>e.nextElementSibling).filter(e=>e != null)
    }
    prev() {
        return this.map(e=>e.previousElementSibling).filter(e=>e != null)
    }
    removeClass(className) {
        this.forEach(e=>e.classList.remove(className));
        return this
    }
    addClass(className) {
        this.forEach(e=>e.classList.add(className));
        return this
    }
    hasClass(className) {
        for (var i = 0; i < this.length; i++) {
            if (!this[i].classList.contains(className))
                return false
        }
        return true
    }
    attr(attribute, value) {
        if (typeof value == "undefined")
            return this[0].getAttribute(attribute);
        this.forEach(e=>e.setAttribute(attribute, value));
        return this
    }
    removeAttr(attribute) {
        this.forEach(e=>e.removeAttribute(attribute))
    }
    data(attribute, value) {
        return this.attr('data-' + attribute, value)
    }
    val(value) {
        if (typeof value == "undefined" && typeof this[0] != "undefined")
            return this[0].value;
        this.forEach(e=>e.value = value);
        return this
    }
    remove() {
        this.forEach(e=>e.parentNode.removeChild(e));
        return this
    }
    replaceWith(data) {
        this.forEach(function(e) {
            $(e).insertBefore(data);
            e.parentNode.removeChild(e)
        });
        return this
    }
    css(property, value) {
        if (typeof property == "object") {
            this.forEach(function(e) {
                var camelProp;
                for (var k in property) {
                    camelProp = k.replace(/(-[a-z])/g, g=>{
                        return g.replace("-", "").toUpperCase()
                    }
                    );
                    e.style[camelProp] = property[k]
                }
            });
            return this
        }
        const camelProp = property.replace(/(-[a-z])/, g=>{
            return g.replace("-", "").toUpperCase()
        }
        );
        this.forEach(e=>(e.style[camelProp] = value));
        return this
    }
    height() {
        return this[0].offsetHeight
    }
    width() {
        return this[0].offsetWidth
    }
    offset() {
        const el = this[0];
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            right: rect.right + window.scrollX
        }
    }
    click() {
        this.forEach(e=>e.click())
    }
    prop(prop) {
        return this[0][prop]
    }
    parents(selector) {
        var elms = new ElementCollection(), es, j;
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s)
                  , i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1
            }
        }
        var elem;
        for (var i = 0; i < this.length; i++) {
            elem = this[i];
            for (; elem && elem !== document; elem = elem.parentNode) {
                if (selector) {
                    if (elem.matches(selector)) {
                        elms.push(elem)
                    }
                    continue
                }
                elms.push(elem)
            }
        }
        return elms
    }
}
function $(param) {
    if (typeof param === "string" || param instanceof String) {
        return new ElementCollection(...document.querySelectorAll(param))
    } else {
        return new ElementCollection(param)
    }
}


var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test((navigator.userAgent || navigator.vendor || window.opera)) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
if (isMobile === false && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    isMobile = true
}
window.mobile_tablet = false;
if (typeof window.matchMedia === "function") {
    if (isMobile && window.matchMedia("only screen and (min-width: 600px)").matches)
        window.mobile_tablet = true
}

function slug(str) {
    if (str != "") {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|\“|\”|~|$|_/g, "-");
        str = str.replace(/-+-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        return str
    }
}

var Main = function() {
    var lazyImg = function() {
        var lazyImages = [].slice.call(document.querySelectorAll("div.lazyimg"));
        if ("IntersectionObserver"in window) {
            var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var lazyImage = entry.target;
                        var img = document.createElement('img');
                        img.setAttribute('src', isMobile ? $(lazyImage).data('image') : $(lazyImage).data('desk-image'));
                        img.className = $(lazyImage).data('classname');
                        img.setAttribute('alt', $(lazyImage).data('alt'));
                        lazyImageObserver.unobserve(lazyImage);
                        lazyImage.parentNode.replaceChild(img, lazyImage)
                    }
                })
            }
            );
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage)
            })
        } else {
            var active = false;
            var lazyLoad_fnc = function() {
                if (active === false) {
                    active = true;
                    setTimeout(function() {
                        lazyImages.forEach(function(lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                                var img = document.createElement('img');
                                img.setAttribute('src', isMobile ? $(lazyImage).data('image') : $(lazyImage).getAttribute('desk-image'));
                                img.className = $(lazyImage).data('classname');
                                img.setAttribute('alt', $(lazyImage).data('alt'));
                                lazyImage.parentNode.replaceChild(img, lazyImage);
                                if (lazyImages.length === 0) {
                                    document.removeEventListener("scroll", lazyLoad_fnc, {
                                        passive: true
                                    });
                                    window.removeEventListener("resize", lazyLoad_fnc);
                                    window.removeEventListener("orientationchange", lazyLoad_fnc)
                                }
                            }
                        });
                        active = false
                    }, 200)
                }
            };
            document.addEventListener("scroll", lazyLoad_fnc, {
                passive: true
            });
            window.addEventListener("resize", lazyLoad_fnc);
            window.addEventListener("orientationchange", lazyLoad_fnc);
            lazyLoad_fnc()
        }
    };
    var darkmode = function() {
        $('input[name="dark-switch"]').on('click', function() {
            var answer = this.value;
            //$cookie.get('bgcolor-cookie', function(bgcolor) {
            //    if (answer == 'yes') {
            //        if (bgcolor && bgcolor != '#232323')
            //            $cookie.set('bgcolor-backup-cookie', bgcolor, 365);
            //        bgcolor = '#232323';
            //        $("body").css({
            //            "background-color": bgcolor,
            //            "background-image": "url('//cdn.truyenfull.com/img/bg_dark.gif')",
            //            "background-repeat": "repeat"
            //        }).addClass('dark-theme');
            //        fbcolor = 'dark';
            //        bgcolor = "#232323";
            //        if ($('#truyen-background').length)
            //            $('#truyen-background').val(bgcolor).addClass('disabled').attr('disabled', true);
            //        $cookie.set('bgcolor-cookie', bgcolor, 365)
            //    } else {
            //        $cookie.get('bgcolor-backup-cookie', function(bgcolor_backup) {
            //            if (bgcolor_backup)
            //                bgcolor = bgcolor_backup;
            //            else
            //                bgcolor = '#F4F4F4';
            //            if ($('#truyen-background').length) {
            //                if (bgcolor == 'hatsan') {
            //                    $("body").css({
            //                        "background-color": "#f2f2f2",
            //                        "background-image": "url('//cdn.truyenfull.com/img/bg_op.png')",
            //                        "background-repeat": "repeat"
            //                    }).removeClass('dark-theme');
            //                    fbcolor = 'light'
            //                } else if (bgcolor == 'sachcu') {
            //                    $("body").css({
            //                        "background-color": "#c2b49b",
            //                        "background-image": "url('//cdn.truyenfull.com/img/bg_book_op.png')",
            //                        "background-repeat": "repeat"
            //                    }).removeClass('dark-theme');
            //                    fbcolor = 'light'
            //                } else if (bgcolor == '#232323') {
            //                    $("body").css({
            //                        "background-color": bgcolor,
            //                        "background-image": "url('//cdn.truyenfull.com/img/bg_dark.gif')",
            //                        "background-repeat": "repeat"
            //                    }).addClass('dark-theme');
            //                    fbcolor = 'dark'
            //                } else {
            //                    $("body").css({
            //                        "background-color": bgcolor,
            //                        "background-image": "none"
            //                    }).removeClass('dark-theme');
            //                    fbcolor = 'light'
            //                }
            //            } else {
            //                $("body").css({
            //                    "background-color": '#F4F4F4',
            //                    "background-image": "url('//cdn.truyenfull.com/img/bg.jpg')",
            //                    "background-position-x": "center",
            //                    "background-position-y": "top",
            //                    "background-repeat-x": "repeat",
            //                    "background-repeat-y": "no-repeat"
            //                }).removeClass('dark-theme');
            //                fbcolor = 'light'
            //            }
            //            $cookie.set('bgcolor-cookie', bgcolor, 365);
            //            if ($('#truyen-background').length)
            //                $('#truyen-background').val(bgcolor).removeClass('disabled').removeAttr('disabled')
            //        })
            //    }
            //})
        });
        //$cookie.get('bgcolor-cookie', function(bgcolor) {
        //    if (bgcolor == '#232323') {
        //        $("body").css({
        //            "background-color": bgcolor,
        //            "background-image": "url('//cdn.truyenfull.com/img/bg_dark.gif')",
        //            "background-repeat": "repeat"
        //        }).addClass('dark-theme');
        //        fbcolor = 'dark'
        //    } else if ($('#truyen-background').length) {
        //        if (bgcolor == 'hatsan') {
        //            $("body").css({
        //                "background-color": "#f2f2f2",
        //                "background-image": "url('//cdn.truyenfull.com/img/bg_op.png')",
        //                "background-repeat": "repeat"
        //            }).removeClass('dark-theme');
        //            fbcolor = 'light'
        //        } else if (bgcolor == 'sachcu') {
        //            $("body").css({
        //                "background-color": "#c2b49b",
        //                "background-image": "url('//cdn.truyenfull.com/img/bg_book_op.png')",
        //                "background-repeat": "repeat"
        //            }).removeClass('dark-theme');
        //            fbcolor = 'light'
        //        } else {
        //            $("body").css({
        //                "background-color": bgcolor,
        //                "background-image": "none"
        //            }).removeClass('dark-theme');
        //            fbcolor = 'light'
        //        }
        //    }
        //});
        $('.dark-theme').on('mouseover', '.pagination li', function() {
            if ($(this).next().hasClass('active'))
                $(this).children('a').css({
                    "border-right": "0",
                    "padding-right": "10px"
                })
        })
    };
    var storyLink = function(item) {
        return location.origin + '/' + item.alias + (parseInt(item.dmca) > 0 ? '-f' + item.dmca : '') + '.' + item.storyID + '/'
    };
    var quick_search = function(str) {
        API.get('/ajax/product/', null, {
            searchKey: str,
            t: (new Date).getTime()
        }, function(data) {
            if (data.stories.length == 0) {
                $('.list-search-res').html('<p style="text-align: center;font-style: italic">Không tìm thấy truyện nào</p>').removeClass('hide');
                return
            }
            var html = '';
            for (var i = 0; i < data.stories.length; i++) {
                html += '<a href="' + storyLink(data.stories[i]) + '" class="list-group-item" title="' + escapeHtml(data.stories[i].title) + '">' + data.stories[i].title + '</a>'
            }
            $('.list-search-res').html(html).removeClass('hide')
        })
    };
    return {
        init: function() {
            window.truyen_ascii = $("#truyen-ascii").val();
            window.truyenid = $("#truyen-id").val();
            window.fbcolor = 'light';
            //$cookie.get('bgcolor-cookie', function(val) {
                //window.bgcolor = val;
                window.bgcolor = localStorage.getItem('truyen_bgcolor') ?? '';
                if (bgcolor == "#232323") {
                    fbcolor = 'dark';
                    $('#dark-no').attr('checked', false);
                    $('#dark-yes').attr('checked', true);
                    if ($('#truyen-background').length)
                        $('#truyen-background').addClass('disabled').attr('disabled', true)
                }
                if (bgcolor) {
                    $('#truyen-background').val(bgcolor)
                }
                if (typeof chapterID == "number") {
                    if (bgcolor == 'hatsan') {
                        $("body").css({
                            "background-color": "#f2f2f2",
                            "background-image": "url('//static.trumtruyen.vip/img/bg_op.png')",
                            "background-repeat": "repeat"
                        }).removeClass('dark-theme');
                        fbcolor = 'light'
                    } else if (bgcolor == 'sachcu') {
                        $("body").css({
                            "background-color": "#c2b49b",
                            "background-image": "url('//static.trumtruyen.vip/img/bg_book_op.png')",
                            "background-repeat": "repeat"
                        }).removeClass('dark-theme');
                        fbcolor = 'light'
                    } else if (bgcolor == '#232323') {
                        $("body").css({
                            "background-color": bgcolor,
                            "background-image": "url('//static.trumtruyen.vip/img/bg_dark.gif')",
                            "background-repeat": "repeat"
                        }).addClass('dark-theme');
                        fbcolor = 'dark'
                    } else {
                        $("body").css({
                            "background-color": bgcolor,
                            "background-image": "none"
                        }).removeClass('dark-theme');
                        fbcolor = 'light'
                    }
                }
            //});
            $('.navbar-toggle').on('click', function(e) {
                var $target = $($(this).data('target'));
                if ($target.hasClass('collapse'))
                    $target.removeClass('collapse');
                else
                    $target.addClass('collapse')
            });
            lazyImg();
            $('.dropdown-toggle').on('click', function() {
                if ($(this.parentNode).hasClass('open'))
                    return $(this.parentNode).removeClass('open');
                $('.dropdown').removeClass('open');
                $(this.parentNode).addClass('open')
            });
            $(document).on('click', function(e) {
                if ($(e.target).parents('.settings').length)
                    return;
                if ($(e.target).hasClass('toggle-settings-open') || $(e.target).parents('.toggle-settings-open').length)
                    return;
                if ($(e.target).hasClass('dropdown-toggle'))
                    return;
                $('.dropdown').removeClass('open')
            });
            darkmode();
            var thread = null;
            $('#search-input').on('keyup', function() {
                var str = '';
                clearTimeout(thread);
                str = $(this).val();
                if (str.length == 0) {
                    $('.list-search-res').html("").addClass("hide")
                } else if (str.length >= 3) {
                    $('.list-search-res').html('<img src="//cdn.truyenfull.com/img/loading-search.gif" alt="loading">').removeClass("hide");
                    thread = setTimeout(function() {
                        quick_search(str)
                    }, 500)
                }
            });
            $('#search-input').on("paste", function() {
                var str = '';
                clearTimeout(thread);
                var element = this;
                setTimeout(function() {
                    var str = $(element).val();
                    if (str.length == 0) {
                        $('.list-search-res').html("").addClass("hide")
                    } else if (str.length >= 3) {
                        $('.list-search-res').html('<img src="//cdn.truyenfull.com/img/loading-search.gif" alt="loading">').removeClass("hide");
                        thread = setTimeout(function() {
                            quick_search(str)
                        }, 500)
                    }
                }, 0)
            });
            $('html').click(function(e) {
                if (e.target.id != '#search-input') {
                    $('.list-search-res').html("").addClass("hide")
                }
            });
            $('.dropdown-menu, #list-chapter').on('click', 'form', function(e) {
                e.stopPropagation()
            });
            if (isMobile) {
                $(".col-truyen-main").addClass("no-hover")
            }
        }
    }
}();
window.addEventListener('DOMContentLoaded', function() {
    Main.init()
});
var API = function() {
    var baseUri = '';
    var errorHandler = function(request) {
        if (request.responseText) {
            var data = JSON.parse(request.responseText);
            return alert(data.error)
        }
        var error = request.statusText;
        return alert(error)
    };
    var call = function(url, method, data, type, headers, success, error_callback) {
        var xhr = new XMLHttpRequest();
        if (url.substr(0, 1) != '/')
            url = '/' + url;
        var requestUrl = baseUri + url;
        if (method == 'GET' && data) {
            var prs = [];
            for (var p in data) {
                if (data.hasOwnProperty(p)) {
                    prs.push(p + '=' + data[p])
                }
            }
            if (requestUrl.indexOf('?') != -1)
                requestUrl += '&' + prs.join('&');
            else
                requestUrl += '?' + prs.join('&')
        }
        xhr.open(method, requestUrl, true);
        xhr.onload = function() {
            if (xhr.readyState == 4) {
                if (parseInt(xhr.status) > 299) {
                    if (typeof error_callback == 'function')
                        return error_callback(xhr);
                    return errorHandler(xhr)
                }
                if (typeof success != 'function')
                    return;
                if (xhr.responseText == '')
                    return success({});
                return success(JSON.parse(xhr.responseText))
            }
        }
        ;
        if (!headers)
            headers = {
                'Content-Language': document.documentElement.lang
            };
        var sendData = null;
        if (type == 'json') {
            sendData = JSON.stringify(data);
            headers['Content-Type'] = 'application/json; charset=utf-8'
        } else if (data && method != 'GET') {
            sendData = new FormData();
            for (var k in data) {
                if (data.hasOwnProperty(k))
                    sendData.append(k, data[k])
            }
        }
        for (var h in headers) {
            if (headers.hasOwnProperty(h))
                xhr.setRequestHeader(h, headers[h])
        }
        xhr.send(sendData)
    };
    return {
        setBaseUri: function(url) {
            baseUri = url
        },
        get: function(url, headers, data, success, error) {
            return call(url, 'GET', data, null, headers, success, error)
        },
        post: function(url, headers, data, is_json, success, error) {
            if (is_json)
                return call(url, 'POST', data, 'json', headers, success, error);
            return call(url, 'POST', data, null, headers, success, error)
        },
        patch: function(url, headers, data, success, error) {
            return call(url, 'PATCH', data, 'json', headers, success, error)
        },
        put: function(url, headers, data, is_json, success, error) {
            if (typeof is_json == "function") {
                error = success;
                success = is_json;
                is_json = true
            }
            if (is_json)
                return call(url, 'PUT', data, 'json', headers, success, error);
            return call(url, 'PUT', data, null, headers, success, error)
        },
        delete: function(url, header, data, success, error) {
            return call(url, 'DELETE', data, 'json', header, success, error)
        }
    }
}();
API.setBaseUri('/');