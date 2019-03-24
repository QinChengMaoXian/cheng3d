import { Logger } from '../core/Logger'
import { EventDispatcher } from '../core/EventDispatcher';
import { Texture2D } from '../graphics/Texture2D';

const events: EventDispatcher = new EventDispatcher();

interface Image2D {
    count: number;
    image: HTMLImageElement;
}

export class Loader {
    private static _baseUrl: string = '';

    private static _imgsMap: Map<string, Image2D> = new Map();
    private static _loadedMap: Map<string, any> = new Map();

    private static _loadList: Map<string, XMLHttpRequestResponseType> = new Map();
    private static _xmlRequests = [new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest()];

    static setBaseUrl(url: string) {
        Loader._baseUrl = url
    }

    static join(url: string) {
        if (url.indexOf(Loader._baseUrl) === 0) {
            return url;
        }
        return Loader._baseUrl + url;
    }

    static loadImage(url: string, func?): HTMLImageElement {
        let path = Loader.join(url);
        let obj = this._imgsMap.get(url);
        if (obj) {
            obj.count++;
            func && func();
            return obj.image;
        }

        let img = new Image();
        this._imgsMap.set(path, {count: 1, image: img});
        img.onload = () => {
            func && func();
        };
        img.onerror = () => {
            Logger.error(img.baseURI, 'can not loaded');
        }
        img.src = path;
        return img;
    }

    static removeImage(url: string) {
        let path = Loader.join(url);
        let obj = this._imgsMap.get(path);
        if (obj) {
            obj.count--;
            if (obj.count === 0) {
                this._imgsMap.delete(path);
            }
        }
    }

    static loadUrl(url: string, type: XMLHttpRequestResponseType = 'text') {
        return this._XMLHttpRequest(Loader.join(url), type)
            .then(xmlHttpResponse => {
                return xmlHttpResponse;
            })
            .catch(errMsg => Logger.error(errMsg));
    }

    static loadUrls(urls, callback) {
        const promises = urls.map(({url, type}) => {
            return this._XMLHttpRequest(Loader.join(url), type)
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
    
    protected static _disposeLoad() {
        let itr = this._loadList.entries().next();
        if (itr.done || this._xmlRequests.length === 0) {
            return;
        }
        this._loadList.delete(itr.value[0]);
        const url = itr.value[0];
        const type = itr.value[1];
        const xmlHttp = this._xmlRequests.pop();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                this._xmlRequests.push(xmlHttp);
                this._disposeLoad();
                if (xmlHttp.status == 200) {
                    this._loadedMap.set(url, xmlHttp.response);
                    events.event(url, [xmlHttp.response]);
                } else {
                    Logger.error(xmlHttp);
                }
            }
        }
        
        xmlHttp.open('GET', url, true);
        xmlHttp.responseType = !type ? '' : type;
        xmlHttp.send(null);
    }

    protected static _XMLHttpRequest(url: string, type: XMLHttpRequestResponseType) {
        let path = Loader.join(url);
        let data = this._loadedMap.get(path);
        if (data) {
            return Promise.resolve(data);
        }

        this._loadList.set(path, type);

        return new Promise((resolve, reject) => {
            events.once(path, this, resolve);
            this._disposeLoad();
        });        
    }
}
