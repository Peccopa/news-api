import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';
import { News } from '../view/news/news';
import { Sources } from '../view/sources/sources';

class App {
    constructor(
        private controller: AppController,
        private view: AppView
    ) {
        this.controller = new AppController();
        this.view = new AppView(new News(), new Sources());
    }

    start() {
        const element = document.querySelector('.sources') as HTMLElement;
        element.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
