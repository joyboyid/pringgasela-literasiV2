import { generateGallery } from './gallery-data.mjs';
await generateGallery();
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.gif':'image/gif','.png':'image/png','.svg':'image/svg+xml'};
createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=resolve(root,'.'+(path==='/'?'/index.html':path));if(!file.startsWith(root+'/')){res.writeHead(403);res.end();return;}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file).toLowerCase()]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Tidak ditemukan');}}).listen(Number(process.env.PORT)||5173,'0.0.0.0',()=>console.log('Pringgasela Literasi: http://localhost:5173'));
