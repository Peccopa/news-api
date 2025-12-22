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
    source: Pick<SourceArticle, 'id' | 'name'>;
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
}

type SourceArticle = {
    id: string;
    name: string;
};
