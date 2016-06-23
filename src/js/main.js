
//==========================================================================
// Isotpe filter for gallery
//==========================================================================
function initIsotope() {

    function getHashFilter() {
        var hash = location.hash;
        // get filter=filterName
        var matches = location.hash.match( /filter=([^&]+)/i );
        var hashFilter = matches && matches[1];
        return hashFilter && decodeURIComponent( hashFilter );
    }

    // init Isotope
    var $gallery = $('.gallery');

    // filter items on button click
    var $filters = $('.filters').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');

        location.hash = 'filter=' + encodeURIComponent( filterValue );
    });

    var isIsotopeInit = false;

    function onHashchange() {
        var hashFilter = getHashFilter();
        if ( !hashFilter && isIsotopeInit ) {
            return;
        }

        console.log('hi');

        isIsotopeInit = true;
        // filter isotope
        $gallery.isotope({
            itemSelector: '.gallery__item',
            percentPosition: true,
            // layout mode options
            masonry: {
                columnWidth: '.gallery__sizer'
            }
        });

        // set selected class on button
        if ( hashFilter ) {
            $filters.find('.is-checked').removeClass('is-checked');
            $filters.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
            $gallery.isotope({ filter: hashFilter });
        }
    }

    $gallery.imagesLoaded(function () {
        $(window).on( 'hashchange', onHashchange );
        // trigger event handler to init Isotope
        onHashchange();
    });
}


//==========================================================================
// Masonry grid for gallery
//==========================================================================
function initMasonry() {
    var $grid = $('.grid').imagesLoaded( function() {

        // init Masonry after all images have loaded
        $grid.masonry({
            itemSelector: '.grid__item',
            columnWidth: '.grid__sizer',
            percentPosition: true
        });
    });
}


//==========================================================================
// Parallax effects for banners
//==========================================================================
function initParallax() {
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}
    });

    // build scenes
    new ScrollMagic.Scene({triggerElement: ".js-parallax"})
                    .setTween(".js-parallax > div", {y: "75%", ease: 'linear'})
                    .addTo(controller);
}


//==========================================================================
// Skill counter
//==========================================================================
function animateSkillBar(distance) {
    // Distance from bottom window and element
    var distance = distance || 0;
    // Amount scrolled from top
    var distanceFromTop = $('body').scrollTop();
    // Element position distance from top
    var distanceToElement = $('#js-skillbar').offset().top;
    // The sum between window height + scroll from top -
    // Bottom of the window
    var windowHeightDistance = $(window).height() + distanceFromTop -
                                                distance;

    if ( windowHeightDistance >= distanceToElement ) {
        $('.js-skillbar').each(function(){
            // Progress bar
            var progress = $(this).find('.js-skillbar-bar').data('progress');
    		$(this).find('.js-skillbar-bar').css({
    			width: progress + '%'
    		});

            // Counter precent animation
            $(this).find('.js-count').prop('Counter',0).animate({
                Counter:progress
            }, {
                duration: 2500,
                step: function (now) {
                    $(this).text(Math.ceil(now) + '%');
                }
            });
    	});

        return true;
    }

    return false;
}


$(document).ready(function() {

    //==========================================================================
    // Loader for background image
    //==========================================================================
    $('.js-bg-wait').imagesLoaded( { background: true }, function() {
        $('#loader').fadeOut();
    });

    //==========================================================================
    // Loader for background image
    //==========================================================================
    $(window).on('scroll', function() {
        if ( $('body').scrollTop() >= 80 ) {
            $("#js-navbar").addClass('is-fixed');
        } else {
            $("#js-navbar").removeClass('is-fixed');
        }
    });

    //==========================================================================
    // Parallax effects for banners
    //==========================================================================
    initParallax();

    //==========================================================================
    // Masonry grid for index page
    //==========================================================================
    initMasonry();

    //==========================================================================
    // Isotope gallery
    //==========================================================================
    initIsotope();

    //==========================================================================
    // Masonry grid for gallery
    //==========================================================================
    $('.js-fluidbox').fluidbox();

    //==========================================================================
    // Skill counter
    //==========================================================================
    // If already scrolled to element don't execute on scroll
    if ( $('#js-skillbar').length > 0 ) {
        if ( !animateSkillBar(100) ) {
            $(window).on('scroll', function() {
                animateSkillBar(100);
            });
        }
    }

    //==========================================================================
    // Tooltips
    //==========================================================================
    $('[data-toggle="tooltip"]').tooltip();

});
