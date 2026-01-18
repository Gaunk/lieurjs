import { render } from '../../core/template.js';
import { HomeService } from './home.service.js';

export const HomeController = {
    async index(req, res) {
        render(res, 'home.html', {
            title: 'Lieur Framework',
            content: 'Welcome to Lieur Framework'
        });
    }
};
