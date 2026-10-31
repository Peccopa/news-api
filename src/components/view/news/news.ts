import { Article } from '../../../types/types';
import './news.css';

export class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('News template not found');
        }

        const selectElement = <T extends HTMLElement>(parent: ParentNode, selector: string): T => {
            const element = parent.querySelector<T>(selector);
            if (!element) throw new Error(`Element not found: ${selector}`);
            return element;
        };

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error('Failed to clone news template');
            }
            if (idx % 2) selectElement<HTMLElement>(newsClone, '.news__item').classList.add('alt');
            selectElement<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            selectElement<HTMLElement>(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            selectElement<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            selectElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            selectElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            selectElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
            selectElement<HTMLElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const element = document.querySelector('.news');
        if (element) {
            element.innerHTML = '';
            element.appendChild(fragment);
        }
    }
}
