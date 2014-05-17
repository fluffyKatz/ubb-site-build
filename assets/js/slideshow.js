(function () {
    var things = document.getElementById('slideshow');
    var firstThing = null;
    var i;
    var curDiv = {};
    for (i = 0; i < things.childNodes.length; i += 1) {
        if (things.childNodes[i].nodeType !== 3) {
            firstThing = things.childNodes[i];
            break;
        }
    }
    function hideDivs() {
        var i;
        var items = things.childNodes;
        for (i = 0; i < items.length; i++) {
            if (items[i].nodeType !== 3) {
                items[i].style.display = 'none';
            }
        }
    }
    function nextDiv (div) {
        return div.nextSibling && (
            div.nextSibling.nodeType === 3 ?
            nextDiv(div.nextSibling) :
            div.nextSibling
        );
    }
    (function showDiv() {
        hideDivs(); //hide them all before we show the next one.
        curDiv = nextDiv(curDiv) || firstThing;
        curDiv.style.display = 'block';
        setTimeout(showDiv, 4500); //set a delay before showing the next div
    }());
}());