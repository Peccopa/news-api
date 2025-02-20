import { NewsData, SourceData } from '../view/appView';

type Options<T> = Record<string, T>;
type Callback<T> = (data?: T) => void;

export class Loader {
    constructor(
        readonly baseLink: string,
        readonly options: Options<string>
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        {
            endpoint,
            options = {},
        }: {
            endpoint: string;
            options: Options<string>;
        },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options<string>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<NewsData> | Callback<SourceData>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
