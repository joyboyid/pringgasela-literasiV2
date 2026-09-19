import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function generateGallery() {
  const root = 'img/gallery';
  const folders = (await readdir(root, { withFileTypes: true })).filter(entry => entry.isDirectory());
  const labels = { 'PameranVIrtual': 'Pameran Virtual' };
  const albums = [];
  for (const folder of folders.sort((a, b) => a.name.localeCompare(b.name, 'id'))) {
    const files = (await readdir(join(root, folder.name))).filter(name => /\.(jpe?g|png|webp|gif|avif)$/i.test(name)).sort((a, b) => a.localeCompare(b, 'id', { numeric: true }));
    if (!files.length) continue;
    albums.push({ name: labels[folder.name.trim()] || folder.name.trim(), photos: files.map(name => ({ src: [root, folder.name, name].map((part, i) => i === 0 ? part : encodeURIComponent(part)).join('/'), name })) });
  }
  await writeFile('gallery-data.js', `// Generated from img/gallery by gallery-data.mjs.\nwindow.galleryAlbums = ${JSON.stringify(albums, null, 2)};\n`);
  return albums;
}
