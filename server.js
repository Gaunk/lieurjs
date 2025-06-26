import { exec } from 'child_process';
import os from 'os';

let browserOpened = false;

server.listen(3000, () => {
  console.log('✅ Server berjalan di http://localhost:3000');

  // Hanya buka browser kalau belum pernah dibuka
  if (!browserOpened && process.argv.includes('--open')) {
    const url = 'http://localhost:3000';
    if (os.platform() === 'win32') exec(`start ${url}`);
    else if (os.platform() === 'darwin') exec(`open ${url}`);
    else exec(`xdg-open ${url}`);

    browserOpened = true;
  }
});
