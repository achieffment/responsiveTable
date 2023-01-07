$(document).ready(function() {
    var containerArray = $(".scroll-table");
    if (containerArray.length > 0) {
        for (var i = 0; i < containerArray.length; i++) {
            var container = $(containerArray[i]);
            var containerWidth = Math.round(container.width());
            var tbody = container.find("tbody");
            var tableWidth = Math.round($(tbody).width());
            var tableHeight = Math.round($(tbody).height());
            if (tableWidth > containerWidth) {
                var widthDifference = (tableWidth - containerWidth) + 50;
                var transparentBlockContainer = document.createElement("div");
                $(transparentBlockContainer).addClass("transparent-block-container");
                $(transparentBlockContainer).width(tableWidth);
                var transparentBlock = document.createElement("div");
                $(transparentBlock).addClass("transparent-block");
                $(transparentBlock).width(widthDifference);
                $(transparentBlock).height(tableHeight);
                transparentBlockContainer.append(transparentBlock);
                container.prepend(transparentBlockContainer);
                container[0].addEventListener(
                    'wheel',
                    function() {
                        event.preventDefault();
                        if (event.deltaY > 0)
                            this.scrollLeft += 100;
                        else
                            this.scrollLeft -= 100;
                        var maxScrollLeft = this.scrollWidth - this.clientWidth;
                        var transparentBlock = $(this).find(".transparent-block-container");
                        if (transparentBlock.length != 0) {
                            if (this.scrollLeft >= maxScrollLeft) {
                                if (transparentBlock.css("opacity") == "1")
                                    transparentBlock.css("opacity", "0");
                            } else {
                                if (!transparentBlock.css("opacity") == "0")
                                    transparentBlock.css("opacity", "1");
                            }
                        }
                    }, {
                        passive: false
                    }
                );
                container.on("mousedown", function() {
                    var startX = this.scrollLeft + event.pageX;
                    var startY = this.scrollTop + event.pageY;
                    $(this).mousemove(function () {
                        this.scrollLeft = startX - event.pageX;
                        this.scrollTop = startY - event.pageY;
                        return false;
                    });
                });
                container.on("mouseup", function() {
                    $(this).off("mousemove");
                    var transparentBlock = $(this).find(".transparent-block-container");
                    if (transparentBlock.length != 0) {
                        var maxScrollLeft = $(".scroll-table")[0].scrollWidth - $(".scroll-table")[0].clientWidth;
                        if ($(this).scrollLeft() >= maxScrollLeft) {
                            if (transparentBlock.css("opacity") == "1")
                                transparentBlock.css("opacity", "0");
                        } else {
                            if (!transparentBlock.css("opacity") == "0")
                                transparentBlock.css("opacity", "1");
                        }
                    }
                });
            }
        }
    }
});