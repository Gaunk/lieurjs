# LieurJS 1.0.0

**LieurJS** adalah framework backend ringan berbasis Node.js, terstruktur mirip seperti CodeIgniter namun modern:

- Routing sederhana berbasis URL
- Auto reload seperti React (tanpa refresh manual)
- CLI Generator untuk controller dan model
- Templating HTML dan favicon support
- Struktur folder rapi dan modular

---

## 🚀 Instalasi & Menjalankan

```bash
npm install
npm run dev
```

Akan:
- Menjalankan server di `http://localhost:3000`
- Membuka browser otomatis
- Auto reload saat file diubah (tanpa nodemon)

---

## 📁 Struktur Folder

```
lieurjs/
├── controllers/         # Semua controller
├── models/              # Model ORM mini
├── views/               # File HTML view
├── public/              # Static file (favicon, css, js)
├── core/                # Kernel framework
├── .env                 # Konfigurasi env
├── package.json         # Konfigurasi npm
├── lieurjs              # Entry point (router + server + CLI)
```

---

## ✅ Contoh Controller

```js
// controllers/HomeController.js
export default class HomeController {
  index(req, res) {
    res.end("Halo dari HomeController");
  }
}
```

## ✅ Contoh Model

```js
// models/User.js
import Model from '../core/Model.js';

export default class User extends Model {
  constructor() {
    super('users');
  }
}
```

---

## ⚙️ CLI Generator

Buat controller atau model dengan mudah:

```bash
node lieurjs make:controller NamaController
node lieurjs make:model NamaModel
```
---

## 📄 Lisensi

MIT License © 2025 LieurCoding
