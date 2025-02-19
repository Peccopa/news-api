export interface NewsData {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface SourcesData {
    category: string;
    country: string;
    description: string;
    id: string;
    name: string;
    url: string;
    language: string;
}
