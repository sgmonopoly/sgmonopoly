function _addParams(url = '', params = {}) {
    let keys = Object.keys(params);
    return keys.reduce((url, key, index) => {
        if(index === 0){
           return `${url}?${key}=${params[key]}`;
        }else {
           return `${url}&${key}=${params[key]}`;
        }
    }, url)
}

export function open(url, params) {
    window.location.href = _addParams(url, params);
}