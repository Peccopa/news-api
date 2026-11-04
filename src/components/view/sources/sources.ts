import { Source } from '../../../types/types';
import './sources.css';

export class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('Source template not found');
        }

        const selectElement = <T extends HTMLElement>(parent: ParentNode, selector: string): T => {
            const element = parent.querySelector<T>(selector);
            if (!element) throw new Error(`Element not found: ${selector}`);
            return element;
        };

        data.forEach((item) => {
            if (item.id === null) return;

            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('Failed to clone source template');
            }

            selectElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            selectElement<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}
