import './sources.css';

export interface Source {
    category: string;
    country: string;
    description: string;
    id: string;
    name: string;
    url: string;
    language: string;
}

export class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        const selectElement = <T extends HTMLElement>(parent: HTMLElement, selector: string): T => {
            const element = parent.querySelector<T>(selector);
            if (!element) throw new Error('');
            return element;
        };

        data.forEach((item) => {
            const sourceClone: Readonly<HTMLElement> = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            selectElement<HTMLTemplateElement>(sourceClone, '.source__item-name').textContent = item.name;
            selectElement<HTMLTemplateElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}
