import App from './components/app/app';
import './global.css';
import { AppController } from './components/controller/controller';
import { News } from './components/view/news/news';
import { Sources } from './components/view/sources/sources';
import { AppView } from './components/view/appView';

const app = new App(new AppController(), new AppView(new News(), new Sources()));
app.start();

// Slider

const slider = document.querySelector('.slider');
const sliderClip = document.querySelector('.slider__clip');
const sliderBtns = document.querySelector('.slider__btns');

if (!(slider instanceof HTMLElement) || !(sliderClip instanceof HTMLElement) || !(sliderBtns instanceof HTMLElement)) {
    throw new Error('Slider elements not found');
}

sliderBtns.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    clickSlider(e.target);
});

window.addEventListener('resize', () => {
    sliderClip.style.left = '0px';
});

const clickSlider = function (target: HTMLElement): void {
    const position = sliderClip.style.left || '0px';
    const secWidth = parseFloat(getComputedStyle(slider).width);
    const clipWidth = sliderClip.offsetWidth;

    if (target.classList.contains('left')) {
        if (parseFloat(position) >= 0) return;
        sliderClip.style.left = String(parseFloat(position) + secWidth) + 'px';
    }

    if (target.classList.contains('right')) {
        const absPosition = Math.abs(parseFloat(position));
        if (absPosition >= clipWidth - secWidth * 1.5) return;
        sliderClip.style.left = String(parseFloat(position) - secWidth) + 'px';
    }
};
