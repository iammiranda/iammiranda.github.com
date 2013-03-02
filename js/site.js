/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3-vsdoc.js" />
/// <reference path="underscore-min.js" />
"use strict";
(function ($, _) {
    $.fn.reverse = function () {
        return this.pushStack(this.get().reverse(), arguments);
    };
    var SCROLL_TO_SECONDS = 1,
        ACTIVE_SECTION_CSS_CLASS = 'active';
    $(function () {
        var $body = $('body'),
            $sidebar = $('header section'),
            $content = $('#content'),
            $sidebarLinks = $sidebar.find('a'),
            $sections = $content.children('section'),

            setCurrentSidebarLink = function () {
                var bodyTop = $body.scrollTop(),
                    contentTop = $content.offset().top;
                $sidebarLinks.removeClass(ACTIVE_SECTION_CSS_CLASS);
                $sections.removeClass(ACTIVE_SECTION_CSS_CLASS);
                $sidebarLinks.reverse().each(function () {
                    var $this = $(this),
                        $target = $($this.attr('href'));
                    if (!$target.length) return;

                    var targetTop = $target.position().top,
                        shouldBeActive = (targetTop - bodyTop - contentTop) <= 0;

                    $this.toggleClass(ACTIVE_SECTION_CSS_CLASS, shouldBeActive);
                    $target.toggleClass(ACTIVE_SECTION_CSS_CLASS, shouldBeActive);
                    return !shouldBeActive;
                });
            };

        $sidebarLinks.click(function () {
            var $this = $(this),
                $target = $($this.attr('href'));
            $('html, body').animate({
                scrollTop: $target.offset().top - $content.offset().top
            }, SCROLL_TO_SECONDS * 1000, 'linear', function () {
                $sidebarLinks.removeClass(ACTIVE_SECTION_CSS_CLASS);
                $sections.removeClass(ACTIVE_SECTION_CSS_CLASS);
                $this.addClass(ACTIVE_SECTION_CSS_CLASS);
                $target.addClass(ACTIVE_SECTION_CSS_CLASS);
            });
            return false;
        });

        $(window).scroll(function () {
            setCurrentSidebarLink();

        });

        $('.samples a').fancybox({
            padding: 8,
            openEffect: 'elastic',
            closeEffect: 'elastic',
            nextEffect: 'fade',
            prevEffect: 'fade',
            helpers: {
                title: {
                    type: 'inside'
                }
            }
        });
    });
})(jQuery, _.noConflict());