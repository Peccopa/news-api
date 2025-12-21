import { NewsData, SourceData } from '../view/appView';
import { AppLoader } from './appLoader';
import { Callback } from './loader';

enum Endpoints {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export class AppController extends AppLoader {
    getSources(callback: Callback<SourceData>) {
        super.getResp(
            {
                endpoint: Endpoints.SOURCES,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Callback<NewsData>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
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
            target = target.parentNode as HTMLElement;
        }
    }
}
