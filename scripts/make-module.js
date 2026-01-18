// scripts/make-page.js
import fs from 'fs';
import path from 'path';

// Helper capitalize
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// EnableModule line template
function enableLine(pageName) {
    const nameLower = pageName.toLowerCase();
    return `import { ${nameLower}Router } from './src/modules/${nameLower}/${nameLower}.router.js';\nenableModule('/${nameLower}', ${nameLower}Router, [cors]);\n`;
}

// Create page module
function createPageModule(pageName) {
    const nameLower = pageName.toLowerCase();
    const nameCap = capitalize(pageName);
    const folder = path.resolve(`./src/modules/${nameLower}`);

    if (fs.existsSync(folder)) {
        console.log(`⚠️  Module "${pageName}" already exists`);
        return;
    }

    fs.mkdirSync(folder, { recursive: true });

    // Controller
    const controllerContent = `import { render } from '../../core/template.js';
import { ${nameCap}Service } from './${nameLower}.service.js';

export const ${nameCap}Controller = {
    async index(req, res) {
        const data = await ${nameCap}Service.getPageData();
        render(res, '${nameLower}.html', data);
    }
};
`;
    fs.writeFileSync(path.join(folder, `${nameLower}.controller.js`), controllerContent);

    // Service
    const serviceContent = `export const ${nameCap}Service = {
    async getPageData() {
        // Default data, bisa diubah ambil dari DB
        return { title: '${nameCap}', content: 'Content for ${nameCap} page' };
    }
};
`;
    fs.writeFileSync(path.join(folder, `${nameLower}.service.js`), serviceContent);

    // Router
    const routerContent = `import { ${nameCap}Controller } from './${nameLower}.controller.js';

export async function ${nameLower}Router(req, res) {
    const url = req.url.split('?')[0];
    switch(url) {
        case '/':
        case '/${nameLower}':
            return await ${nameCap}Controller.index(req, res);
        default:
            res.writeHead(404, {'Content-Type':'text/html'});
            res.end('<h1>Page not found</h1>');
    }
}
`;
    fs.writeFileSync(path.join(folder, `${nameLower}.router.js`), routerContent);

    // Template Nunjucks
    const viewsFolder = path.resolve('./views');
    if (!fs.existsSync(viewsFolder)) fs.mkdirSync(viewsFolder);
    const templatePath = path.join(viewsFolder, `${nameLower}.html`);
    if (!fs.existsSync(templatePath)) {
        const templateContent = `<html>
<head><title>{{ title }}</title></head>
<body>
<h1>{{ title }}</h1>
<p>{{ content }}</p>
</body>
</html>`;
        fs.writeFileSync(templatePath, templateContent);
    }

    // Update server.js
    const serverFile = path.resolve('./server.js');
    let serverContent = fs.readFileSync(serverFile, 'utf8');

    // Tambahkan enableModule line di akhir
    serverContent += `\n${enableLine(nameLower)}`;

    fs.writeFileSync(serverFile, serverContent);

    console.log(`✅ Module "${pageName}" created and registered in server.js`);
}

// CLI
const pageName = process.argv[2];
if (!pageName) {
    console.log('Usage: node make-page.js PageName');
    process.exit(1);
}

createPageModule(pageName);
