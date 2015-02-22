(function($) {

    // ProductsViewType
    function ProductsViewType() {
        var viewContainer = $('[data-role="products-view"]');
        var viewTrigger = $('[data-role="products-view-trigger"]');

        viewContainer.hide();
        viewContainer.filter(':first').show();

        viewTrigger.click(function() {
            typeView = $(this).data('view');
            viewContainer.hide();
            viewContainer.filter(function() {
                return $(this).data('view') === typeView;
            }).fadeIn();
            viewTrigger.find('.filter').removeClass('active');
            $(this).find('.filter').addClass('active');
            return false;
        }).filter(':first').click();
    }

    // ProductChars
    function ProductChars() {
        var viewContainer = $('[data-role="products-chars"]');
        var viewTrigger = $('[data-role="products-chars-trigger"]');

        viewContainer.hide();
        viewContainer.filter(':first').show();

        viewTrigger.click(function() {
            typeView = $(this).data('view');
            viewContainer.hide();
            viewContainer.filter(function() {
                return $(this).data('view') === typeView;
            }).fadeIn();
            viewTrigger.removeClass('active');
            $(this).addClass('active');
            return false;
        }).filter(':first').click();
    }

    // ProductImage
    function ProductImage() {
        var viewImage = $('[data-role="product-image"]');
        var viewTrigger = $('[data-role="product-image-trigger"]');

        viewImage.hide();
        viewImage.filter(':first').show();

        viewTrigger.click(function() {
            typeView = $(this).data('image');
            viewImage.hide();
            viewImage.filter(function() {
                return $(this).data('image') === typeView;
            }).fadeIn();
            viewTrigger.removeClass('active');
            $(this).addClass('active');
            return false;
        }).filter(':first').click();
    }

    function CartDisplay() {

        var cartDisplay = $('[data-role="cart-display"]');
        var cartTrigger = $('[data-role="cart-display-trigger"]');

        if (window.matchMedia('(min-width : 768px)').matches) {
            triggerHeight = cartTrigger.height();
            triggerWidth = cartTrigger.width();

            triggerPosition = cartTrigger.position();

            cartDisplayWidth = cartDisplay.width();

            topForCartDisplay = (triggerHeight + triggerPosition.top + 20);
            leftForCartDisplay = (triggerPosition.left + triggerWidth)
            cartDisplay.removeAttr('style');
            cartDisplay.css({
                'top': topForCartDisplay,
                'left': leftForCartDisplay,
                'margin-left': -(cartDisplayWidth),
            });
        } else {
            cartDisplay.removeAttr('style');
            // cartDisplay.css({});
        }
    }

    // document ready
    $(window).on('load', function() {
        ProductsViewType();
        ProductChars();
        ProductImage();
        CartDisplay();
    });

    // all initial on window resize
    $(window).on('resize', function() {
        CartDisplay();
    });


})(jQuery);
