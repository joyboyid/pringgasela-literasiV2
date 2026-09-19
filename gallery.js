const albums = window.galleryAlbums || [];
const albumList = document.querySelector('#album-list');
const content = document.querySelector('#gallery-content');
const image = document.querySelector('#gallery-image');
const stage = document.querySelector('#gallery-stage');
const thumbnails = document.querySelector('#gallery-thumbnails');
const playButton = document.querySelector('#slideshow-toggle');
const counter = document.querySelector('#photo-counter');
let albumIndex = 0;
let photoIndex = 0;
let timer = null;

function stopSlideshow() {
  clearInterval(timer);
  timer = null;
  playButton.setAttribute('aria-pressed', 'false');
  playButton.innerHTML = 'Putar slideshow <span aria-hidden="true">▶</span>';
  counter.setAttribute('aria-live', 'polite');
}
function showPhoto(index) {
  const album = albums[albumIndex];
  photoIndex = (index + album.photos.length) % album.photos.length;
  const photo = album.photos[photoIndex];
  document.querySelector('#gallery-error').hidden = true;
  image.hidden = false;
  image.alt = `${album.name} — foto ${photoIndex + 1} dari ${album.photos.length}`;
  image.src = photo.src;
  document.querySelector('#photo-caption').textContent = `${album.name} · ${photo.name}`;
  document.querySelector('#photo-original').href = photo.src;
  counter.textContent = `Foto ${photoIndex + 1} dari ${album.photos.length}`;
  [...thumbnails.children].forEach((button, index) => {
    button.setAttribute('aria-pressed', String(index === photoIndex));
  });
}
function selectAlbum(index) {
  stopSlideshow();
  albumIndex = index;
  const album = albums[index];
  document.querySelector('#album-title').textContent = album.name;
  [...albumList.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  thumbnails.replaceChildren();
  album.photos.forEach((photo, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Lihat foto ${i + 1}: ${album.name}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = photo.src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    thumbnail.decoding = 'async';
    button.append(thumbnail);
    button.addEventListener('click', () => { stopSlideshow(); showPhoto(i); });
    thumbnails.append(button);
  });
  playButton.disabled = album.photos.length < 2;
  document.querySelector('#photo-prev').disabled = album.photos.length < 2;
  document.querySelector('#photo-next').disabled = album.photos.length < 2;
  showPhoto(0);
}
function movePhoto(step) { stopSlideshow(); showPhoto(photoIndex + step); }
image.addEventListener('error', () => { image.hidden = true; document.querySelector('#gallery-error').hidden = false; stopSlideshow(); });
document.querySelector('#photo-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('#photo-next').addEventListener('click', () => movePhoto(1));
stage.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
playButton.addEventListener('click', () => {
  if (timer) { stopSlideshow(); return; }
  playButton.setAttribute('aria-pressed', 'true');
  playButton.innerHTML = 'Jeda slideshow <span aria-hidden="true">Ⅱ</span>';
  counter.setAttribute('aria-live', 'off');
  timer = setInterval(() => showPhoto(photoIndex + 1), 5000);
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stopSlideshow(); });
window.addEventListener('pagehide', stopSlideshow);
if (albums.length) {
  albums.forEach((album, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'album-choice';
    const label = document.createElement('span');
    label.textContent = album.name;
    const count = document.createElement('small');
    count.textContent = `${album.photos.length} foto`;
    button.append(label, count);
    button.addEventListener('click', () => selectAlbum(index));
    albumList.append(button);
  });
  content.hidden = false;
  selectAlbum(0);
} else {
  document.querySelector('#gallery-empty').hidden = false;
}
