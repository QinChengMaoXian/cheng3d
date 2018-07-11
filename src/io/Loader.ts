import { Logger } from '../core/Logger'
import { Texture2D } from '../graphics/Texture2D';

export class Loader {
    private static _imgMap: Map<string, Texture2D> = new Map();

    constructor() {

    }

    static loadImg(url) {

        let texture = this._imgMap.get(url);
        if (texture) {
            return texture;
        }

        texture = new Texture2D();
        texture.setImageUrl(url);
        this._imgMap.set(url, texture);

        return texture;
    }

    static loadUrl(url, callback?, type = 'text') {
        return this._XMLHttpRequest(url, type)
            .then(xmlHttpResponse => {
                return callback ? callback(xmlHttpResponse) : xmlHttpResponse;
            })
            .catch(errMsg => Logger.error(errMsg));
    }

    static loadUrls(urls, callback) {
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

    protected static _XMLHttpRequest(url, type) {
        return new Promise((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        resolve(xmlHttp);
                    } else {
                        reject(new Error(xmlHttp.statusText));
                    }
                }
            }
            xmlHttp.responseType = type !== undefined ? type : '';
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        });
    }
}
