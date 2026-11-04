import { Callback, NewsData, SourceData } from '../../types/types';
import { AppLoader } from './appLoader';

enum Endpoints {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export class AppController extends AppLoader {
    public getSources(callback: Callback<SourceData>): void {
        super.getResp(
            {
                endpoint: Endpoints.SOURCES,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback<NewsData>): void {
        if (!(e.target instanceof HTMLElement) || !(e.currentTarget instanceof HTMLElement)) {
            return;
        }

        const newsContainer = e.currentTarget;
        let target: HTMLElement | null = e.target;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}
