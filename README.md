# 🚀 LieurJS Framework

LieurJS adalah **framework JavaScript berbasis Node.js murni** (tanpa Express, Fastify, atau framework pihak ketiga lain)
yang dibangun dari nol oleh LieurCoding dengan tujuan edukasi, eksperimen arsitektur, dan fondasi aplikasi web modular.

Framework ini mengadopsi pendekatan **modular seperti Laravel**, namun tetap ringan, transparan,
dan mudah dipahami untuk pengembang JavaScript.

---

## 🎯 Tujuan LieurJS

- Membuat framework Node.js **tanpa Express**
- Memahami cara kerja HTTP server, router, middleware secara internal
- Menyediakan struktur aplikasi yang rapi & scalable
- Mendukung aplikasi berbasis **page (HTML)** dan **API**
- Mendukung multi-database dengan ORM

---
```
## ✨ Fitur Utama

- ✅ Pure Node.js (tanpa Express / Fastify)
- ✅ Modular architecture (modules-based)
- ✅ Custom router engine
- ✅ Middleware system
- ✅ Page modules (Home, About, Contact, dll)
- ✅ Templating engine (Nunjucks)
- ✅ Static file serving (`/public`)
- ✅ ORM-ready (Objection.js + Knex)
- ✅ Multi-database support
- ✅ Environment-based config
- ✅ Hot reload (Nodemon)
- ✅ CLI-ready (roadmap)

---

## 🧱 Arsitektur Framework

LieurJS memisahkan antara **core framework** dan **application modules**.

- `core` → engine utama (server, router, middleware, template)
- `modules` → fitur aplikasi
- `config` → konfigurasi environment & database
- `middlewares` → middleware reusable
- `views` → template HTML
- `public` → static assets

---

## 🗂️ Struktur Folder

lieurjs/
├── src/
│ ├── core/
│ │ ├── app.js # Bootstrap server
│ │ ├── router.js # Router engine
│ │ ├── template.js # Template engine
│ │ └── errorHandler.js # Global error handler
│ │
│ ├── config/
│ │ ├── app.config.js # App config
│ │ ├── db.config.js # Database config
│ │ └── env.js # Env loader
│ │
│ ├── middlewares/
│ │ ├── cors.js
│ │ ├── auth.js
│ │ ├── rateLimiter.js
│ │ ├── serveStatic.js
│ │ └── index.js
│ │
│ ├── modules/
│ │ └── home/
│ │ ├── home.controller.js
│ │ ├── home.router.js
│ │ └── home.service.js
│ │
│ └── utils/
│ ├── logger.js
│ └── response.js
│
├── views/
│ └── home.html
│
├── public/
│ └── README.md
│
├── scripts/
│ └── make-page.js
│
├── tests/
│ ├── unit/
│ └── integration/
│
├── server.js
├── package.json
├── .env
├── LICENSE
└── README.md

---

## 🛠️ Instalasi

### 1️⃣ Clone Repository


git clone https://github.com/Gaunk/lieurjs.git
cd lieurjs
2️⃣ Install Dependency
bash
Copy code
npm install
⚙️ Konfigurasi Environment
Buat file .env di root project:

=============================================
env
APP_PORT=3000

DB_CLIENT=mysql2
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=lieur

=============================================

▶️ Menjalankan Aplikasi
Mode Development
npm run dev
Mode Production
npm start
=============================================

Akses browser:
=============================================
http://localhost:3000/
🧩 Sistem Module
Setiap fitur aplikasi adalah module terpisah.

Contoh module Home:
=============================================
src/modules/home/
├── home.controller.js   # Logic halaman
├── home.router.js       # Routing
└── home.service.js      # Business logic

Module dapat berupa:
=============================================
Public page

Admin page

REST API

CMS

Auth system

=============================================
🖼️ Templating Engine
LieurJS menggunakan Nunjucks sebagai template engine.

Contoh render:

import { render } from '../../core/template.js';

render(res, 'home.html', {
  title: 'LieurJS Framework',
  content: 'Welcome to LieurJS'
});
🗄️ Database & ORM
LieurJS mendukung multi-database melalui Knex + Objection.js.

Database yang Didukung
Database	Status
MySQL	✅
PostgreSQL	✅
SQLite	⚠️ Opsional
MSSQL	⚠️ Opsional

Ganti Database Tanpa Ubah Kode
env
DB_CLIENT=pg
DB_PORT=5432
🔗 Objection.js ORM
Contoh model:

js
Copy code
import { BaseModel } from '../../core/base.model.js';

export class User extends BaseModel {
  static tableName = 'users';
}
🔐 Middleware
Middleware bawaan:

cors

auth

rateLimiter

serveStatic

Contoh penggunaan:

js
Copy code
enableModule('/', homeRouter, [cors]);
🧪 Testing
Struktur testing sudah tersedia:

bash

npm test
🚧 Roadmap
 CLI Generator (node scripts/make-module.js Home dst)

 AdminLTE integration

 Authentication & Authorization

 REST API mode

 Config caching

 Documentation website

 Plugin system

🤝 Contributing
Kontribusi sangat terbuka.

Langkah singkat:

Fork repository

Buat branch fitur

Commit perubahan

Pull request 