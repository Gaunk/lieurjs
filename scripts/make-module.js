import fs from 'fs';
import path from 'path';

// Helper: Capitalize
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create page module
function createPageModule(pageName) {
    const nameLower = pageName.toLowerCase();
    const nameCap = capitalize(pageName);
    const folder = path.resolve(`./src/modules/${nameLower}`);

    if (fs.existsSync(folder)) {
        console.log(`⚠️ Module "${pageName}" sudah ada`);
        return;
    }
    fs.mkdirSync(folder, { recursive: true });

    // ===== Controller =====
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

    // ===== Service =====
    const serviceContent = `export const ${nameCap}Service = {
    async getPageData() {
        return {
            title: '${nameCap}',
            content: 'Ini halaman ${nameCap} otomatis generate!'
        };
    }
};
`;
    fs.writeFileSync(path.join(folder, `${nameLower}.service.js`), serviceContent);

    // ===== Router =====
    const routerContent = `import { ${nameCap}Controller } from './${nameLower}.controller.js';

export async function ${nameLower}Router(req, res) {
    const url = req.url.split('?')[0];
    switch(url) {
        case '/${nameLower}':
        case '/':
            return await ${nameCap}Controller.index(req, res);
        default:
            res.writeHead(404, {'Content-Type':'text/html'});
            res.end('<h1>Page not found</h1>');
    }
}
`;
    fs.writeFileSync(path.join(folder, `${nameLower}.router.js`), routerContent);

    // ===== Template HTML =====
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

    // ===== Update server.js =====
    const serverFile = path.resolve('./server.js');
    let serverContent = fs.readFileSync(serverFile, 'utf8');

    // ===== Sisipkan import module =====
    const importMarker = '// ===== MODULE IMPORTS =====';
    if (!serverContent.includes(`${nameLower}Router`)) {
        serverContent = serverContent.replace(
            importMarker,
            `${importMarker}\nimport { ${nameLower}Router } from './src/modules/${nameLower}/${nameLower}.router.js';`
        );
    }

    // ===== Sisipkan enableModule =====
    const enableMarker = '// ===== ENABLE MODULES =====';
    const enableLine = `enableModule('/${nameLower}', ${nameLower}Router, [cors]);`;
    if (!serverContent.includes(enableLine)) {
        serverContent = serverContent.replace(
            enableMarker,
            `${enableMarker}\n${enableLine}`
        );
    }

    fs.writeFileSync(serverFile, serverContent);

    console.log(`✅ Module "${pageName}" berhasil dibuat dan otomatis masuk server.js!`);
    console.log(`Bisa diakses di: http://localhost:3000/${nameLower}`);
}

// ===== CLI =====
const pageName = process.argv[2];
if (!pageName) {
    console.log('Usage: node make-page.js PageName');
    process.exit(1);
}

createPageModule(pageName);
