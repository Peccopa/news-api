import { Article, News } from './news/news';
import { Source, Sources } from './sources/sources';

export interface NewsData {
    articles: Array<Article>;
    totalResults: number;
    status: string;
}

export interface SourceData {
    sources: Array<Source>;
    status: string;
}

export class AppView {
    constructor(
        public news: News,
        public sources: Sources
    ) {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData | undefined) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Partial<SourceData> | undefined) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
