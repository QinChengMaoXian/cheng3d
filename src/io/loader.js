import { Logger } from '../core/base.js'

export class Loader {
    constructor() {

    }

    loadImg(url, callback) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('Could not load image at ' + url));
            image.src = url;
        })
        .then(image => {
            return callback ? callback(image) : image;
        })
        .catch(errMsg => Logger.error(errMsg));
    }

    loadUrl(url, callback, type = 'text') {
        return this._XMLHttpRequest(url, type)
            .then(xmlHttpResponse => {
                return callback ? callback(xmlHttpResponse) : xmlHttpResponse;
            })
            .catch(errMsg => Logger.error(errMsg));
    }

    loadUrls(urls, callback) {
        const promises = urls.map(({url, type}) => {
            return this._XMLHttpRequest(url, type)
            .then(xmlHttpResponse => {
                return xmlHttpResponse;
            })
            .catch(errMsg => Logger.error(errMsg));
        })
        return Promise.all(promises)
            .then(result => {
                return callback ? callback(result): result;
            })
            .catch(errMsg => Logger.error(errMsg));
    }

    _XMLHttpRequest(url, type) {
        return new Promise((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        resolve(xmlHttp);
                    } else {
                        reject(new Error(this.statusText));
                    }
                }
            }
            xmlHttp.responseType = type !== undefined ? type : '';
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        });
    }
}
