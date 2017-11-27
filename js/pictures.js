'use strict';

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createPhotos = function () {
  var photoArray = [];
  var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  for (var i = 0; i < 25; i++) {
    var commentsLength = getRandom(1, 2);
    var commentsAr = [];
    for (var j = 0; j < commentsLength; j++) {
      commentsAr[j] = commentsArray[getRandom(0, 7)];
    }
    var k = i + 1;
    photoArray[i] = {};
    photoArray[i].url = 'photos/' + k + '.jpg';
    photoArray[i].likes = getRandom(15, 200);
    photoArray[i].comments = commentsAr;
  }
  return photoArray;
};

var renderPhoto = function (photoNode) {
  var templateContent = document.querySelector('#picture-template').content;
  var element = templateContent.cloneNode(true);
  element.querySelector('img').src = photoNode.url;
  element.querySelector('.picture-likes').textContent = photoNode.likes;
  element.querySelector('.picture-comments').textContent = photoNode.comments.length;
  return element;
};

var fillPhotos = function (photoData) {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoData.length; i++) {
    var newPhotoElement = renderPhoto(photoData[i]);
    fragment.appendChild(newPhotoElement);
  }
  picturesContainer.appendChild(fragment);
};

var displayGalleryOverlay = function (dataArray) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').src = dataArray[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = dataArray[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = dataArray[0].comments.length;
  galleryOverlay.classList.remove('hidden');
};

var renderGallery = function () {
  var photoGallery = createPhotos();
  fillPhotos(photoGallery);
  displayGalleryOverlay(photoGallery);
};

renderGallery();
