 (function(a) {
    a.slider = {
        _init: function(e, c) {
            var d = {},
            b = {};
            b.ui = d;
            b.settings = c;
            this._initUi(e, d, c, b);
            this._create(d, c, b);
            this.auto(d, c, b);
            this._bindEvents(d, c, b)
        },
        _initUi: function(d, c, b) {
            c.$this = d;
            c.pictureContainer = a(b.picture, d);
            c.picturesContainer = a(b.effect.containerSelector, c.pictureContainer);
            c.pictures = a(b.effect.pictureSelector, c.picturesContainer);
            c.pictureWidth = c.pictures.eq(0).outerWidth();
            if (b.link) {
                c.links = a(b.link, d)
            } else {
                c.links = c.pictures.children("a")
            }
            c.thumbPictureContainer = a(b.thumbPicture, d);
            c.titleContainer = a(b.title, d);
            c.prev = a(b.prev, d);
            c.next = a(b.next, d);
            c.stop = a(b.stop, d);
            c.start = a(b.start, d);
            c.maxTime = Math.max(b.thumbEffect.speed, b.titleEffect.speed, b.effect.speed);
            c.pictureLength = c.pictures.length;
            c.current = b.current;
            c.previous = c.current;
            c._previous = c.current;
            c.finished = true
        },
        _create: function(f, d) {
            var c = '<ul class="' + (d.thumbEffect.className || "") + '">',
            e = f.pictureLength;
            if (d.picture) {
                switch (d.effect.type) {
                case "fade":
                    f.pictures.eq(d.current).show().siblings().hide();
                    f.picturesContainer.css("position", "relative");
                    f.pictures.css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    });
                    break;
                case "fadein":
                    f.pictures.eq(d.current).show().siblings().hide();
                    f.pictures.eq(d.current).show().siblings().hide();
                    f.picturesContainer.css("position", "relative");
                    f.pictures.css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    });
                    break;
                case "slide":
                    f.pictureContainer.css("position", "relative");
                    f.picturesContainer.css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    });
                    break;
                case "sameDirectionSlide":
                    f.picturesContainer.css("position", "relative");
                    f.pictures.css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        "z-index": 1
                    });
                    f.pictures.eq(d.current).css("z-index", 2);
                    break
                }
            }
            if (d.thumbPicture) {
                switch (d.thumbEffect.style) {
                case "image":
                    for (var b = 0; b < e; b++) {
                        if (b === d.current && d.thumbEffect.selectedClass) {
                            c += '<li class="' + d.thumbEffect.selectedClass + '">' + f.pictures.eq(b).html() + "</li>"
                        } else {
                            c += "<li>" + f.pictures.eq(b).html() + "</li>"
                        }
                    }
                    c += "</ul>";
                    f.thumbPictureContainer.append(c);
                    break;
                case "icon":
                    for (var b = 0; b < e; b++) {
                        if (b === d.current && d.thumbEffect.selectedClass) {
                            c += '<li class="' + d.thumbEffect.selectedClass + '"></li>'
                        } else {
                            c += "<li></li>"
                        }
                    }
                    c += "</ul>";
                    f.thumbPictureContainer.append(c);
                    break;
                case "number":
                    for (var b = 0; b < e; b++) {
                        if (b === d.current && d.thumbEffect.selectedClass) {
                            c += '<li class="' + d.thumbEffect.selectedClass + '">' + (b + 1) + "</li>"
                        } else {
                            c += "<li>" + (b + 1) + "</li>"
                        }
                    }
                    c += "</ul>";
                    f.thumbPictureContainer.append(c);
                    break
                }
                f.thumbPictures = a("li", f.thumbPictureContainer);
                f.thumbLinks = a("a", f.thumbPictures);
                if (d.thumbEffect.style === "image" && d.thumbEffect.type === "fade") {
                    f.thumbPictures.eq(d.current).show().siblings().css("opacity", d.thumbEffect.opacity)
                }
            }
            if (d.title) {
                f.title = a('<a href="" title=""  target="_blank"></a>');
                f.title.appendTo(f.titleContainer).addClass(d.titleEffect.className);
                this.titleEffect(d.current, f, d)
            }
        },
        change: function(e, d, c, b) {
            if (d._previous == e || !d.finished) {
                return
            }
            d._previous = e;
            d.current = e;
            if (a.isFunction(c.before) && c.before.call(this, b) === false) {
                return false
            }
            this.pictureEffect(e, d, c);
            this.titleEffect(e, d, c);
            this.thumbPictureEffect(e, d, c);
            setTimeout(function() {
                d.previous = e;
                if (a.isFunction(c.after)) {
                    c.after.call(this, b)
                }
            },
            d.maxTime)
        },
        titleEffect: function(f, e, d) {
            if (!d.title) {
                return
            }
            var c = e.links.eq(f),
            g = c.attr("title") || "",
            b = c.attr("href") || "";
            switch (d.titleEffect.type) {
            case "fade":
                e.title.stop(true, true).fadeOut(d.titleEffect.speed,
                function() {
                    e.title.attr("href", b).attr("title", g).html(g.substr(0, d.titleEffect.cut))
                }).stop(true, true).fadeIn(d.titleEffect.speed);
                break;
            case "default":
                e.title.attr("href", b).attr("title", g).html(g.substr(0, d.titleEffect.cut));
                break;
            default:
                if (a.isFunction(d.titleEffect.typeFunction)) {
                    d.titleEffect.typeFunction(f, e, d)
                }
                break
            }
        },
        pictureEffect: function(g, e, b) {
            var d = e.pictures.eq(g);
            switch (b.effect.type) {
            case "fade":
                d.stop(true, true).fadeIn(b.effect.speed, b.effect.easing);
                d.siblings().stop(true).fadeOut(b.effect.speed);
                break;
            case "fadein":
                e.pictures.stop(true, true).fadeOut(0);
                d.stop(true, true).fadeIn(b.effect.speed, b.effect.easing);
                break;
            case "slide":
                e.picturesContainer.stop().animate({
                    left:
                    -g * e.pictureWidth
                },
                b.effect.speed, b.effect.easing || null);
                break;
            case "sameDirectionSlide":
                e.finished = false;
                var c = e.pictures.eq(e.previous),
                f = e.pictureWidth;
                if (e.previous < g || (e.previous == e.pictureLength - 1 && g == 0)) {
                    f = -f
                }
                d.css({
                    left: -f,
                    "z-index": 2
                });
                e.picturesContainer.stop(true, true).animate({
                    left: f
                },
                b.effect.speed, b.effect.easing,
                function(h) {
                    e.finished = true;
                    a(this).stop(true, true).css("left", 0);
                    d.css("left", 0).siblings().css("z-index", 1)
                });
                break;
            case "default":
                d.stop(true, true).show().siblings().stop(true, true).hide();
                break;
            default:
                if (a.isFunction(b.effect.typeFunction)) {
                    b.effect.typeFunction(g, e, b)
                }
                break
            }
        },
        thumbPictureEffect: function(e, d, c) {
            if (!c.thumbPicture) {
                return
            }
            var b = d.thumbPictures.eq(e);
            b.addClass(c.thumbEffect.selectedClass).siblings().removeClass(c.thumbEffect.selectedClass);
            switch (c.thumbEffect.type) {
            case "fade":
                if (c.thumbEffect.style === "image") {
                    b.stop(true, true).animate({
                        opacity: 1
                    },
                    c.thumbEffect.speed).siblings().stop(true, true).animate({
                        opacity: c.thumbEffect.opacity
                    },
                    c.effect.speed)
                }
                break;
            default:
                if (a.isFunction(c.thumbEffect.typeFunction)) {
                    c.thumbEffect.typeFunction(e, d, c)
                }
                break
            }
        },
        auto: function(d, c, b) {
            d.timer = setInterval(function() {
                var e = a.slider.getCurrent(d.current + 1, d, c);
                a.slider.change(e, d, c, b)
            },
            d.maxTime + c.delay + 5)
        },
        getCurrent: function(d, c, b) {
            if (!b.loop && d == c.pictureLength) {
                d = d - 1
            } else {
                d = d % c.pictureLength
            }
            if (d === -1) {
                d = c.pictureLength - 1
            }
            return d
        },
        _bindEvents: function(d, c, b) {
            if (c.thumbPicture) {
                d.thumbPictures.bind(c.thumbEffect.event,
                function(g) {
                    var f = d.thumbPictures.index(a(this));
                    a.slider.change(f, d, c, b)
                });
                d.thumbLinks.click(function(f) {
                    f.preventDefault()
                })
            }
            d.prev.bind("click",
            function() {
                var e = a.slider.getCurrent(d.current - 1, d, c);
                a.slider.change(e, d, c, b)
            });
            d.next.bind("click",
            function() {
                var e = a.slider.getCurrent(d.current + 1, d, c);
                a.slider.change(e, d, c, b)
            });
            d.start.bind("click",
            function(f) {
                if (a.isFunction(a.startHandler)) {
                    a.startHandler.call(this, f, b)
                }
            });
            d.stop.bind("click",
            function(f) {
                if (a.isFunction(a.startHandler)) {
                    a.stopHandler.call(this, f, b)
                }
            });
            d.$this.mouseover(function() {
                clearInterval(d.timer)
            }).mouseleave(function() {
                clearInterval(d.timer);
                a.slider.auto(d, c, b)
            })
        }
    };
    a.fn.slider = function(b) {
        var c = a.extend(true, {},
        {
            picture: null,
            thumbPicture: null,
            title: null,
            link: null,
            prev: null,
            next: null,
            stop: null,
            start: null,
            stopHandler: function(f, d) {
                d.ui.stop.hide();
                d.ui.start.show()
            },
            startHandler: function(f, d) {
                d.ui.start.hide();
                d.ui.stop.show()
            },
            disabledClass: null,
            current: 0,
            loop: true,
            effect: {
                containerSelector: "ul",
                pictureSelector: "li",
                type: "fade",
                speed: 300,
                easing: null,
                typeFunction: null,
                mouseover: null,
                mouseout: null
            },
            thumbEffect: {
                className: "thumb-title",
                style: "image",
                type: "fade",
                opacity: 0.6,
                speed: 200,
                typeFunction: null,
                selectedClass: null,
                event: "mouseover",
                mouseover: null,
                mouseout: null
            },
            titleEffect: {
                className: "title-link",
                type: "fade",
                speed: 400,
                cut: 40,
                typeFunction: null
            },
            delay: 2500,
            before: null,
            after: null
        },
        b);
        return this.each(function() {
            a.slider._init(a(this), c)
        })
    }
})(jQuery);