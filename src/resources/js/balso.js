'use strict';

/* iphone scroll bug */
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const UI = {};

/**
 * 형제요소
 * @param {Element} node
 */
function siblings(node) {
    var children = node.parentElement.children;
    var tempArr = [];

    for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }

    return tempArr.filter(function (e) {
        return e != node;
    });
}

/**
 * ios version check
 * @returns {number}
 */
function checkVersion() {
    var agent = window.navigator.userAgent,
        start = agent.indexOf('OS');
    if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
        return window.Number(agent.substr(start + 3, 3).replace('_', '.'));
    }
    return 0;
}

// layout setting
UI.layoutSet = {
    init: function () {
        this.wrap = document.querySelector('#wrap');
        this.fixTop = document.querySelector('[data-ui-fixed="top"]');
        this.fixBtm = document.querySelector('[data-ui-fixed="bottom"]');
        this.addEvents();
    },
    addEvents: function () {
        if(this.fixTop) {
            const topH = this.fixTop.clientHeight;
            this.wrap.style.paddingTop = topH + 'px';
        }
        if(this.fixBtm) {
            const btmH = this.fixBtm.clientHeight;
            this.wrap.style.paddingBottom = btmH + 'px';
        }
    }
};

// 바디 스크롤 제어
let scrollTop = 0;
UI.scrollSet = {
    init: function (mode) {
        this.wrap = document.querySelector('#wrap');
        if (mode == "off") { //body scroll 제거
            scrollTop = window.scrollY || document.documentElement.scrollTop;
            this.wrap.style.position = "fixed";
            this.wrap.style.top = -scrollTop + 'px';
            this.wrap.style.width = 100 + '%'; // 바닥 화면 넓이 늘어짐 추가 이현우
            return scrollTop;
        } else if (mode == "on") { //body scroll 제거 해제
            this.wrap.style.position = "relative";
            this.wrap.style.top = 0;
            this.wrap.style.width = ''; // 바닥 화면 넓이 늘어짐 추가 이현우
            window.scrollTo({
                top: scrollTop
            });
        }
    }
};

// 팝업 열기
UI.popupOpen = {
    init: function (obj, callback) {
        const popTarget = document.querySelector('#modal-' + obj);
   
        popTarget.style.display = 'block';
        popTarget.classList.add('show');

        if(popTarget.classList.contains('ndim')) {
            popTarget.style.left = 0;
        }
        
        UI.scrollSet.init("off"); // 바디스크롤 제거

        // 영역 외 클릭 닫기
        popTarget.addEventListener('click', function(e){
            // e.preventDefault(); 체크버튼 작동안함 이현우
            e.stopPropagation();
            if (!popTarget.classList.contains('ndim')) {
                const target = e.target;
                if (!popTarget.querySelector(".wrap").contains(e.target)) {
                    UI.popupClose.init(obj);
                }
            }
        });

        // 토스트 팝업
        if (popTarget.classList.contains('ly-toast')) {
            setTimeout(function () {
                if (callback && typeof (callback) === "function") {
                    callback();
                }
            }, 1500);
        }

    }
};

// 팝업 닫기
UI.popupClose = {
    init: function (obj) {
        const popTarget = document.querySelector('#modal-' + obj);
        
        if (popTarget.classList.contains('ly-btm')) {
           popTarget.classList.remove('show');
        } else {
            popTarget.classList.remove('show');
            popTarget.style.display = 'none';
        }

        //팝업 2중으로 띄웠을때
        if(document.querySelector('[data-modal]').classList.contains('show')) {
            UI.scrollSet.init("off");
        } else {
            UI.scrollSet.init("on");
        }
    }
};

// 아코디언 추가 이현우
UI.accordion = {
    init: () => {
        const accordionHeading = document.querySelectorAll('.accordion__trigger');

		accordionHeading.forEach(item => {
			item.addEventListener('click', () => { 
				item.classList.contains('accordion__trigger--expanded') ? 
				item.classList.remove('accordion__trigger--expanded') :            
				item.classList.add('accordion__trigger--expanded');
			});
		});
    }
};

window.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('[data-ui-fixed]').length) UI.layoutSet.init();
    if (document.querySelectorAll('.accordion__trigger').length) UI.accordion.init(); // 아코디언 추가 이현우
});
