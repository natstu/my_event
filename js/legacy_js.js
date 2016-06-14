jQuery(document).ready(function(){
  
  	// NAVBAR TOGGLE
  	jQuery('.navbar-toggle').click(function() {
		var el = jQuery(this);
		el.parents('#header').toggleClass('nav-open');
	});

    jQuery('#slide_menu_wrap').click(function() {
        var el = jQuery(this);
        el.parents('#header').toggleClass('nav-open');
    });

    jQuery('#slide_menu_wrap #primary-nav').click(function(e) {
        e.stopPropagation();
    });

    if (jQuery('.slider .item').length > 1) {
        jQuery('.slider').bxSlider({
            easing: 'ease-in-out',
            nextText: '',
            prevText: '',
            pagerSelector: '.slider_pager',
            touchEnabled: false
        });
    }

    if (jQuery('.team_slider .item').length > 1) {
        jQuery('.team_slider').bxSlider({
            easing: 'ease-in-out',
            nextText: '',
            prevText: '',
            pagerSelector: '.team_slider_pager',
            touchEnabled: false,
            moveSlides: 1,
            pager: false,
            autoReload: true,
            slideMargin: 4,
            breaks: [{screen:0, slides:2},{screen:560, slides:3}]
        });
    }

    if (jQuery('.quote_slider .slide').length > 1) {
        jQuery('.quote_slider').bxSlider({
            easing: 'ease-in-out',
            nextText: '',
            prevText: '',
            controls: false,
            pager: false,
            touchEnabled: true,
            auto: true,
            pause: 7000
        });
    }

    if (jQuery('#tpl_hotel_single .gallery_slider .slide').length > 1) {
        var this_slider_wrap = jQuery('#tpl_hotel_single .gallery_slider_wrap');
        var this_slider = this_slider_wrap.find('.gallery_slider').bxSlider({
            easing: 'ease-in-out',
            nextText: '',
            prevText: '',
            pager: false,
            touchEnabled: true,
            slideMargin: 0,
            autoReload: true,
            moveSlides: 1,
            controls: false,
            onSliderLoad: function() {
                this_slider_wrap.addClass('loaded');
            },
            breaks: [{screen:0, slides:1, pager:false},{screen:560, slides:2},{screen:768, slides:2}]
        });

        var prev_btn = this_slider_wrap.find('.bxPrev');
        var next_btn = this_slider_wrap.find('.bxNext');

        jQuery('body').on('click', prev_btn.selector, function() {
            this_slider.goToPrevSlide();
            return false;
        });

        jQuery('body').on('click', next_btn.selector, function() {
            this_slider.goToNextSlide();
            return false;
        });
        
    }

    jQuery('#tpl_gallery .gallery_slider_wrap').each(function() {
        if (jQuery(this).find('.slide').length > 1) {
            var this_slider_wrap = jQuery(this);
            var this_slider = this_slider_wrap.find('.gallery_slider').bxSlider({
                easing: 'ease-in-out',
                nextText: '',
                prevText: '',
                pager: false,
                touchEnabled: true,
                slideMargin: 4,
                autoReload: true,
                moveSlides: 1,
                onSliderLoad: function() {
                    this_slider_wrap.addClass('loaded');
                },
                breaks: [{screen:0, slides:2},{screen:560, slides:3}]
            });

            var prev_btn = this_slider_wrap.find('.bxPrev');
            var next_btn = this_slider_wrap.find('.bxNext');

            jQuery('body').on('click', prev_btn.selector, function() {
                this_slider.goToPrevSlide();
                return false;
            });

            jQuery('body').on('click', next_btn.selector, function() {
                this_slider.goToNextSlide();
                return false;
            });
            
        }
    });

    var other_hotel_slider = jQuery('.other_hotel_slider').bxSlider({
        easing: 'ease-in-out',
        nextText: '',
        prevText: '',
        pager: true,
        touchEnabled: true,
        slideMargin: 0,
        autoReload: true,
        moveSlides: 1,
        pagerSelector: '.other_hotel_slider_wrap .controls_wrap .pager',
        breaks: [{screen:0, slides:2, pager:true},{screen:460, slides:2},{screen:768, slides:5}]
    });

    jQuery('body').on('click', '.other_hotel_slider_wrap .bxPrev', function() {
        other_hotel_slider.goToPrevSlide();
        return false;
    });

    jQuery('body').on('click', '.other_hotel_slider_wrap .bxNext', function() {
        other_hotel_slider.goToNextSlide();
        return false;
    });

    // TPL_GALLERY TABS FUNCTIONALITY
    jQuery('body').on('click', '#tpl_gallery .tabs .tab', function() {
        jQuery('#tpl_gallery .tabs .tab').removeClass('active');
        jQuery(this).addClass('active');
        var ind = jQuery(this).index();
        jQuery('#tpl_gallery .tabs_content_wrap .tab').removeClass('in');
        setTimeout(function() {
            jQuery('#tpl_gallery .tabs_content_wrap .tab').removeClass('active');
            jQuery('#tpl_gallery .tabs_content_wrap .tab').eq(ind).addClass('active in')
        }, 300);
        return false;
    });

    // TPL_GALLERY TABS FUNCTIONALITY MOBILE
    jQuery('body').on('click', '#tpl_gallery .tabs_content .tab .tab_head', function() {
        var par = jQuery(this).parents('.tab');
        jQuery('#tpl_gallery .tabs_content .tab').removeClass('active in');
        par.addClass('active in');
        setTimeout(function() {
            var tab_top = par.find('.tab_head').offset().top;
            // TAKE AWAY HEADER HEIGHT
            var tab_top = tab_top - jQuery('header#header').outerHeight();
            jQuery('html,body').animate({scrollTop: tab_top});
        }, 100);
        jQuery(window).resize();
        return false;
    });

	// CLICK SCROLL BUTTON IN HERO 
    jQuery('.scroll-content').click(function() {
    	var main_top = jQuery('#main').offset().top;
    	if (main_top) {
    		jQuery('html, body').animate({scrollTop: main_top - jQuery('#header').outerHeight(true)});
    	}
    	return false;
    })

    // ON DROPDOWN CLICKS, RETURN FALSE ON FIRST CLICK
    jQuery('.hasDropdown').on('click', function() {
        jQuery(this).toggleClass('active');
        if (jQuery(this).hasClass('active')) {
            return false;
        }
    });

    // HOTEL SINGLE, TABS
    jQuery('#features .tabs > .col').click(function() {
        var ind = jQuery('#features .tabs > .col').index(this);
        var this_tab = jQuery(this);

        if (!jQuery('#features .tabs-content .tab').eq(ind).hasClass('active')) {
            jQuery('#features .tabs .col').removeClass('active');
            this_tab.addClass('active');
            jQuery('#features .tabs-content .tab').removeClass('in');
            setTimeout(function() {
                jQuery('.tab').removeClass('active');
            }, 300);

            setTimeout(function() {
                jQuery('#features .tabs-content .tab').eq(ind).addClass('active');
                setTimeout(function() {
                    jQuery('.tab').addClass('in');
                }, 300);
            }, 300);

        }

    });

    // HOTEL SINGLE, TABS, MOBILE
    jQuery('#features .tabs .col').click(function() {
        var this_tab = jQuery(this);
        var ind = jQuery('#features .tabs > .col').index(this_tab);

        if (jQuery('#features .tabs > .mob_tab').eq(ind).is(":visible") == false) {
            jQuery('#features .tabs > .mob_tab').stop().slideUp(300);
            
            //setTimeout(function() {
                var content = jQuery('#features .tabs-content .tab').eq(ind).html();
                jQuery('#features .tabs > .mob_tab').eq(ind).html(content).slideToggle();
            //}, 300);

        }
    });

    jQuery(window).resize(function() {
        jQuery('#features .mob_tab').slideUp();
        jQuery('#features .active').removeClass('active in');
        setTimeout(function() {
            jQuery('#features .tabs-content .tab').removeClass('in');
            setTimeout(function() {
                jQuery('#features .tabs-content .tab').removeClass('active');
            }, 300);
        }, 300);
    })

    jQuery('body').on('click', '#features .close', function() {
        jQuery('#features .mob_tab').slideUp();
        jQuery('#features .active').removeClass('active in');
        setTimeout(function() {
            jQuery('#features .tabs-content .tab').removeClass('in');
            setTimeout(function() {
                jQuery('#features .tabs-content .tab').removeClass('active');
            }, 300);
        }, 300);

    });

    // MASONARY INIT
    if (jQuery('.masonary-grid').length > 0) {
        jQuery('.masonary-grid').masonry({
          itemSelector: '.item',
          percentPosition: true
        });
    }

});

jQuery(window).resize(function() {
    
})

jQuery(window).load(function() {
    // animate first accordian on tpl_gallery
    jQuery('#tpl_gallery .tab').removeClass('active');
    jQuery('#tpl_gallery .tab').eq(0).addClass('active');

    jQuery('#tpl_gallery .tabs_content .tab').removeClass('active in');
    jQuery('#tpl_gallery .tabs_content .tab').eq(0).addClass('active in');
    
    // REFRESH MASONARY GRID ON LOAD..
    setTimeout(function() {
        jQuery('.masonary-grid').masonry();
    }, 1);
})

function col_resizer() {
    if (jQuery(window).width() >= 740) {
        jQuery('.row_r').each(function() {
            var par_row = jQuery(this);
            var row_height = 0;
            jQuery(this).find('.col').each(function() {
                jQuery(this).css({'height': 'auto'});
                if (jQuery(this).height() > row_height) {
                    row_height = jQuery(this).height();
                }
            });

            par_row.find('.col').height(row_height);

        });
    } else {
        jQuery('.row_r .col').css({'height': 'auto'});
    }
}

function initMap() {
    jQuery(window).load(function() {
    if (jQuery('#map').length > 0) {
        createMap();
    } 
    });
}