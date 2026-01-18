import { render } from '../../core/template.js';
import { HomeService } from './home.service.js';

export const HomeController = {
    async index(req, res) {
        render(res, 'home.html', {
            title: 'LieurJS',
            content: 'Welcome to LieurJS Jangan Lupa Minum Kopi Biar Tidak LieurCoding'
        });
    }
};
