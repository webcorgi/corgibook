yepnope({
    test: Modernizr.csstransforms,
    yep: ['./js/turn.js'],
    nope: ['./js/turn.html4.min.js'],
    both: ['./css/basic.css'],
    complete: loadApp
});

const flipbook = $('#flipbook')
let lastPage = flipbook.children().length
let menuList = document.querySelector('.menu-list');

function hideMenu() {
    menuList.style.display = 'none';
}
function showMenu() {
    menuList.style.display = 'block';
}

function movePrev() {
    flipbook.turn("previous")
    updatePageInfo()
    removeInfo()

}
function moveNext() {
    flipbook.turn("next")
    updatePageInfo()
    removeInfo()

}
function goToFirstPage() {
    flipbook.turn("page", 1)
    updatePageInfo()
    removeInfo()

}
function goToLastPage() {
    flipbook.turn("page", lastPage)
    updatePageInfo()
    removeInfo()

}
function updatePageInfo() {
    const current = flipbook.turn("page")
    const total = lastPage
    $(".current-page").text(current)
    $(".total-pages").text(total)
}

function loadApp() {
    // pc 930x530
    let displayMode;
    let pageWidth = window.innerWidth;
    let pageHeight = (pageWidth/2) / 1.75;
    if (window.innerWidth <= 991) { // mobile
        displayMode = 'single';
        pageWidth = window.innerWidth;
        pageHeight = pageWidth / 1.75;
        $('#flipbook').css({ top: `calc(50% - ${pageHeight / 2})`, left: `calc(50% - ${pageWidth / 2})` })
    } else { // pc
        displayMode = 'double';
    }

    $('#flipbook').turn({
        display: displayMode,
        autoCenter: false,
        width: pageWidth, // PC 화면에서 2장씩 보이도록 설정 (원하는 너비로 조정)
        height: pageHeight,
        elevation: 50,
        gradients: true,
        pages: 2 // PC 화면에서 2장씩 보이도록 설정
    });
    updatePageInfo();
}

function activeResize(){
    // 리사이즈 새로고침
    let chkWidth = window.innerWidth
    $(window).resize(function () {
        if (window.innerWidth >= 991) {
            if (window.innerWidth < chkWidth) location.reload()
        }
        if (window.innerWidth <= 991) {
            if (window.innerWidth > chkWidth) location.reload()
        }
    })
} activeResize()



let isScrolling = false; // 연속 스크롤링 방지
function moveMousewheel(event){
    if (isScrolling) return;
    isScrolling = true;

    setTimeout(() => {
        isScrolling = false;
    }, 600);

    if (event.deltaY > 0) {
        // down
        moveNext()
    }else{
        // up
        movePrev()
    }
    removeInfo()
}
document.addEventListener('wheel',  moveMousewheel)

function removeInfo(){
    $('.mouseinfo').css({top:'100%'})
}