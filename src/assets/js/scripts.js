(function($) {

    // functions
    function classCheck(elem, classname) {
        if (!elem.hasClass(classname)) {
            elem.addClass(classname);
        } else {
            elem.removeClass(classname);
        }
    }

    // Tabs
    function Tabs() {
        var tabContainer = $('[data-role="tab"]');
        tabContainer.hide().filter(':first').show();

        $('[data-role="tab-trigger"]').click(function () {
            tabContainer.hide();
            tabContainer.filter(this.hash).show();
            $('[data-role="tab-trigger"]').removeClass('active');
            $(this).addClass('active');
            return false;
        }).filter(':first').click();
    }

    function classCheckByTrigger(elem, trigger, classname) {
        trigger.click(function() {
            classCheck(elem, classname);
        });
    }

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

    function productFiltersShow() {
        var viewContainer = $('[data-role="filters-block"]');
        var viewTrigger = $('[data-role="filters-trigger"]');

        viewTrigger.click(function() {
            classCheck($(this) ,'active')
            classCheck(viewContainer, 'state');
        });
    }

    function filtersItems() {
        var filterItem = $('[data-role="filter-item"]');
        filterItem.click(function() {
            $(this).toggleClass('active');
        });
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
        var cartTriggerMobile = $('[data-role="cart-display-trigger-mobile"]');
        var cartTriggerCount = $('[data-role="cart-display-trigger-count"]');
        var mainHeader = $('[data-role="main-header"]');

        triggerHeight = cartTrigger.height();
        triggerWidth = cartTrigger.width();

        triggerPosition = cartTrigger.position();

        cartDisplayWidth = cartDisplay.width();

        // position & styles
        if (window.matchMedia('(min-width : 768px)').matches) {

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
            cartDisplay.css({
                'top': mainHeader.outerHeight()
            });
        }

        // Behavior
        cartTrigger.click(function() {
            classCheck(cartDisplay, 'opened');
            classCheck(cartTriggerMobile, 'active');
            classCheck($(this), 'active');
        });

        cartTriggerMobile.click(function() {
            classCheck(cartDisplay, 'opened');
            classCheck(cartTrigger, 'active');
            classCheck($(this), 'active');
        });
    }

    // Cart behavior
    // Count items
    function cartItemCountUpdate() {
        var item = $('[data-role="cart-item"]')

        item.each(function() {
            var input = $(this).find('[data-role="cart-item-count"]');
            var plus = $(this).find('[data-role="cart-item-count-plus"]');
            var minus = $(this).find('[data-role="cart-item-count-minus"]');
            var itemDelete = $(this).find('[data-role="cart-item-count-delete"]');

            minus.hide();
            itemDelete.show();

            plus.click(function() {
                var inputValue = parseInt(input.val());
                function update() {
                    inputValueUpdated = parseInt((inputValue + 1))
                    if (inputValueUpdated > 1) {
                        console.log('aaaaa');
                        minus.show();
                        itemDelete.hide();
                    }
                }
                update();
                input.val(inputValueUpdated);
            });
            minus.click(function() {
                inputValue = parseInt(input.val());
                function update() {
                    inputValueUpdated = parseInt((inputValue - 1))
                    if (inputValueUpdated === 1) {
                        console.log('minus');
                        minus.hide();
                        itemDelete.show();
                    }
                }
                update();
                input.val(inputValueUpdated);
            });
        });
    }
    // Show/hide oneclick install
    function oneClickOrder() {
        var cartDisplay = $('[data-role="cart-items"]');
        var orderDisplay = $('[data-role="cart-order"]');
        var trigger = $('[data-role="trigger-one-click"]');
        var triggerHide = $('[data-role="trigger-one-click-hide"]');

        trigger.click(function() {
            cartDisplay.hide();
            orderDisplay.fadeIn();
        });
        triggerHide.click(function() {
            orderDisplay.hide();
            cartDisplay.fadeIn();
        });
    }

    // phone mask
    function phoneMask() {
        var phoneInput = $('[data-role="phone-mask"]');
        phoneInput.mask("(000) 000-00-00", {placeholder: "(099) 999-99-99"});
    }

    // popup menu
    function popupSearch() {
        var search = $('[data-role="popup-search"]');
        var searchTrigger = $('[data-role="popup-search-trigger"]');
        var productMenu = $('[data-role="product-menu"]');

        productPosition = productMenu.position();
        popupTop = productPosition.top + productMenu.outerHeight();

        search.css('top', popupTop);
        classCheckByTrigger(search, searchTrigger, 'active');
    }

    // popup menu
    function popupMenu() {
        var menu = $('[data-role="popup-menu"]');
        var menuTrigger = $('[data-role="popup-menu-trigger"]');
        var productMenu = $('[data-role="product-menu"]');

        productPosition = productMenu.position();
        popupTop = productPosition.top + productMenu.outerHeight();

        menu.css('top', popupTop);
        classCheckByTrigger(menu, menuTrigger, 'active');
    }

    function popupMobileMenu() {
        var menu = $('[data-role="popup-mobile-menu"]');
        var menuTrigger = $('[data-role="popup-mobile-menu-trigger"]');
        var header = $('[data-role="main-header"]');

        headerPosition = header.position();
        popupTop = headerPosition.top + header.outerHeight();

        console.log('menu');
        menu.css('top', popupTop);
        classCheckByTrigger(menu, menuTrigger, 'active');
    }

    function disabledElement() {
        var elem = $('[data-role="disabled"]');
        elem.off();
    }

    // document ready
    $(window).on('load', function() {
        ProductsViewType();
        OrderSteps();
        ProductChars();
        ProductImage();
        cartItemCountUpdate();
        oneClickOrder();
        phoneMask();
        CartDisplay();
        productFiltersShow();
        filtersItems()
        Tabs();
        popupSearch();
        popupMenu();
        popupMobileMenu();
        disabledElement()
    });

    // all initial on window resize
    $(window).on('resize', function() {
        CartDisplay();
    });


})(jQuery);