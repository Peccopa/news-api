export type Callback<T> = (data?: T) => void;

export interface NewsData {
    articles: Array<Article>;
    totalResults: number;
    status: string;
}

export interface SourceData {
    sources: Array<Source>;
    status: string;
}

export interface Source {
    category: string;
    country: string;
    description: string;
    id: string;
    name: string;
    url: string;
    language: string;
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    content: string | null;
    description: string | null;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string | null;
}
