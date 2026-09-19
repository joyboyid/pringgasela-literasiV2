import { generateGallery } from './gallery-data.mjs';
import { mkdir,copyFile,cp } from 'node:fs/promises';
await generateGallery();
await mkdir('dist',{recursive:true});
for(const file of ['index.html','kegiatan.html','galeri.html','style.css','script.js','gallery.js','gallery-data.js']) await copyFile(file,`dist/${file}`);
await cp('public','dist/public',{recursive:true});
await cp('img','dist/img',{recursive:true});
console.log('Build selesai: dist/');
