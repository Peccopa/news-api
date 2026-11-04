import { NewsData, SourceData } from '../../types/types';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView {
    public constructor(
        public news: News,
        public sources: Sources
    ) {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData | undefined): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourceData> | undefined): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}
