import { Callback } from '../../types/types';

type Options<T> = Record<string, T>;

enum Status {
    Unauthorized = 401,
    NotFound = 404,
}

type HttpMethod = 'GET';

interface ResponseData {
    endpoint: string;
    options?: Options<string>;
}

export class Loader {
    constructor(
        readonly baseLink: string,
        readonly options: Options<string>
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>({ endpoint, options = {} }: ResponseData, callback: Callback<T>): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Status.Unauthorized || res.status === Status.NotFound)
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

    load<T>(method: HttpMethod, endpoint: string, callback: Callback<T>, options: Options<string> = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}
