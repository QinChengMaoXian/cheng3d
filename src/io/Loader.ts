import { Logger } from '../core/Logger'
import { Texture2D } from '../graphics/Texture2D';
import { EventDispatcher } from '../core/EventDispatcher';

const events: EventDispatcher = new EventDispatcher();

export class Loader {
    private static _imgsMap: Map<string, HTMLImageElement> = new Map();
    private static _loadedMap: Map<string, any> = new Map();

    private static _loadList: Map<string, XMLHttpRequestResponseType> = new Map();
    private static _xmlRequests = [new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest()];

    static loadImage(url: string) {
        let img = this._imgsMap.get(url);
        if (img) {
            return Promise.resolve(img);
        }

        return new Promise<HTMLImageElement>((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(img);
            }
            img.src = url;
        }).catch((error)=> {
            Logger.error(error);
        })
    }

    static loadUrl(url: string, type: XMLHttpRequestResponseType = 'text') {
        return this._XMLHttpRequest(url, type)
            .then(xmlHttpResponse => {
                return xmlHttpResponse;
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
                    events.emit(url, [xmlHttp.response]);
                    this._xmlRequests.push(xmlHttp);
                } else {
                    Logger.error(xmlHttp);
                }
            }
        }
        xmlHttp.responseType = type !== undefined ? type : '';
        xmlHttp.open('GET', url, true);
        xmlHttp.send(null);
    }

    protected static _XMLHttpRequest(url: string, type: XMLHttpRequestResponseType) {
        let data = this._loadedMap.get(url);
        if (data) {
            return Promise.resolve(data);
        }

        this._loadList.set(url, type);

        return new Promise((resolve, reject) => {
            events.once(url, this, resolve);
            this._disposeLoad();
        });        
    }
}
