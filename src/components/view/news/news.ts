import { NewsData } from '../../../types/index';
import './news.css';

class News {
    draw(data: NewsData[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        const selectElement = <T extends HTMLElement>(parent: HTMLElement, selector: string): T => {
            const element = parent.querySelector<T>(selector);
            if (!element) throw new Error();
            return element;
        };

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;
            if (idx % 2) selectElement<HTMLTemplateElement>(newsClone, '.news__item').classList.add('alt');
            selectElement<HTMLTemplateElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            selectElement<HTMLTemplateElement>(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            selectElement<HTMLTemplateElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            selectElement<HTMLTemplateElement>(newsClone, '.news__description-title').textContent = item.title;
            selectElement<HTMLTemplateElement>(newsClone, '.news__description-source').textContent = item.source.name;
            selectElement<HTMLTemplateElement>(newsClone, '.news__description-content').textContent = item.description;
            selectElement<HTMLTemplateElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const element = document.querySelector('.news');
        if (element) {
            element.innerHTML = '';
            element.appendChild(fragment);
        }
    }
}

export default News;
