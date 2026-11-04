import { Loader } from './loader';

const url = process.env.API_URL || `https://newsapi.org/v2/`;
const key = process.env.API_KEY || `You need to get key from ${url}`;

export class AppLoader extends Loader {
    public constructor() {
        super(url, {
            apiKey: key,
        });
    }
}
