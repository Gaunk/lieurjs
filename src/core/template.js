// src/core/template.js
import nunjucks from 'nunjucks';
import path from 'path';

const viewsPath = path.resolve('./views');

export const Template = nunjucks.configure(viewsPath, {
    autoescape: true,
    watch: true,        // hot reload template
    noCache: true       // langsung reload template setiap render
});

export function render(res, templateName, context = {}) {
    res.writeHead(200, {'Content-Type':'text/html'});
    const html = Template.render(templateName, context);
    res.end(html);
}
