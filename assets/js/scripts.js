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

    // Tempory Order Steps show/hide
    function OrderSteps() {
        var decrLine = $('[data-role="decor-line"]');
        var decorDisk = decrLine.find('[data-role^="decor-disk-"]');
        var orderForm = $('[data-role="order-form"]');
        var formSteps = orderForm.find('[data-role^="order-step-"]');
        var next = $('[data-trigger="next"]');
        var prev = $('[data-trigger="prev"]');
        var finish = $('[data-trigger="finish"]');
        var index = 0;

        finish.hide();
        prev.hide();

        function setCurrentItems(itemsArray, decorArray, action) {

            for (i = 0; i < itemsArray.length; i++) {
                var item = itemsArray.eq(i);
                var decorItem = decorArray.eq(i)
                if (item.hasClass('active')) {
                    item.removeClass('active');
                    item.hide();
                    if (action == 'next') {
                        index = itemsArray.index(item) + 1;
                    } else if (action == 'prev') {
                        index = itemsArray.index(item) - 1;
                        decorItem.removeClass('active');
                    }
                }
            }

            // item active
            newItem = itemsArray.eq(index);
            newItem.fadeIn().addClass('active');

            // decor item active
            newDecorArray = decorArray.eq(index);
            newDecorArray.addClass('active');

            if (itemsArray.eq(0).hasClass('active')) {
                prev.hide();
            } else {
                prev.show();
            }
            if (itemsArray.eq(itemsArray.length-1).hasClass('active')) {
                next.hide();
                finish.show();
            } else {
                next.show();
                finish.hide();
            }
        }

        // next function
        next.click(function() {
            setCurrentItems(formSteps, decorDisk, 'next');
        });

        // prev function
        prev.click(function() {
            setCurrentItems(formSteps, decorDisk, 'prev');
        });

    }

    // document ready
    $(window).on('load', function() {
        ProductsViewType();
        OrderSteps();
    });

    // all initial on window resize
    $(window).on('resize', function() {});


})(jQuery);
