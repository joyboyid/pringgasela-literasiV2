# Pringgasela Literasi

Landing page responsif berbahasa Indonesia, menggunakan HTML, CSS, dan JavaScript tanpa dependensi.

## Menjalankan

```sh
npm run dev
```

Buka http://localhost:5173. Variabel `PORT` dapat digunakan untuk mengganti port.

```sh
npm run build
```

Unggah isi folder `dist` ke hosting statis.

## Konten dan aset

- Instagram tujuan: https://www.instagram.com/pringgasela_literasi/
- Sumber sejarah dan arsip Samana Serasi: https://sinar5news.com/samana-serasi-first-anniversarry-pringgasela-literasi/ (7 Juni 2021).
- Instagram tidak dapat diakses saat pembuatan. Teks ajakan dan bagian semangat merupakan usulan editorial, bukan daftar program resmi. Konfirmasi isi dengan organisasi sebelum publikasi.
- Foto perpustakaan lama (tidak lagi ditampilkan) dari Unsplash: https://unsplash.com/photos/1507842217343-583bb7270b66 (aset: images.unsplash.com/photo-1507842217343-583bb7270b66). Bukan dokumentasi organisasi.
- Tipografi: DM Sans dan Libre Caslon Display dari Google Fonts, dengan font fallback lokal.
- Logo dari pengguna: `img/logo/logo-literasi.png`, digunakan di header, footer, emblem hero, dan favicon.
- Palet mengikuti logo: biru tua, merah, oranye, dan kuning emas dengan latar putih hangat.

## Dokumentasi ulang tahun

- Sumber dari pengguna: https://www.facebook.com/share/v/1Dr4CYnoar/
- Tautan video: https://www.facebook.com/pringgaselaliterasi0606/videos/808728764230492/
- Sampul publik video disimpan di `public/samana-serasi-iii.jpg`, digunakan pada hero dan kartu video.
- Judul Samana Serasi III dan kredit lagu mengikuti metadata publik unggahan. Video lengkap tidak diunduh; tombol membuka video asli di Facebook.

## Arsip kegiatan

- Nobar Pig Feast: https://www.facebook.com/share/p/1CvcwtAFZn/ — poster publik disimpan di `public/nobar.jpg`. Tanggal 16 Mei 2026 dan lokasi La Vida Cafe mengikuti poster.
- Diskusi terbuka: https://www.facebook.com/share/p/1WojevuBaB/ — poster publik disimpan di `public/diskusi.jpg`. Tanggal 18 September 2021 dan lokasi Showroom Desa Pringgasela mengikuti poster.
- Keduanya ditampilkan sebagai arsip kegiatan, bukan agenda mendatang. Poster ditampilkan utuh tanpa pemotongan.

## Halaman dan galeri

- `index.html`: beranda dan pengenalan komunitas.
- `kegiatan.html`: arsip nobar, diskusi, video ulang tahun, dan cerita komunitas.
- `galeri.html`: pilihan album berdasarkan subfolder `img/gallery` dan slideshow manual/otomatis (5 detik).
- Foto pengguna yang semula berada di `dist/img/gallery` disalin ke `img/gallery` sebagai sumber. Edit atau tambah foto di folder sumber, bukan di `dist`.
- Jalankan ulang `npm run dev` atau `npm run build` setelah menambahkan folder/foto. `gallery-data.mjs` membuat daftar album otomatis; nama file dengan spasi dan ekstensi huruf besar didukung.
- Berkas foto asli dipertahankan. Total aset galeri sekitar 200 MB; gambar dimuat secara lazy pada thumbnail dan sesuai pilihan pada viewer.
