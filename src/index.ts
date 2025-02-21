import App from './components/app/app';
import './global.css';
import { AppController } from './components/controller/controller';
import { News } from './components/view/news/news';
import { Sources } from './components/view/sources/sources';
import { AppView } from './components/view/appView';

const app = new App(new AppController(), new AppView(new News(), new Sources()));
app.start();
