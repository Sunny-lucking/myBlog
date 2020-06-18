// export const BASE_URL = 'http://101.37.32.66:5001'
export const BASE_URL = 'http://localhost:5001'

// 节流函数
export function throttle(fn,_this){
    let timer = null;
    return function () {
        if (!timer){
            timer = setTimeout(function () {
                fn();
                timer = null;
            },1000)
        }
    }
}

// 防抖函数
export function deBounce () {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}
