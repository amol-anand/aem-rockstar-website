/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// import {
//  buildIcon,
// } from '../../scripts/scripts.js';

function scrollToStart(block) {
  if (block.scrollLeft !== 0) {
    block.scrollLeft = 0;
  }
}

function buildNav(dir) {
  const btn = document.createElement('aside');
  btn.classList.add('carousel-nav', `carousel-nav-${dir}`);
  const arrow = document.createElement('span');
  arrow.innerHTML = '>';
  if (dir === 'left') {
    arrow.innerHTML = '<';
  }

  btn.append(arrow);
  btn.addEventListener('click', (e) => {
    const carousel = e.target.closest('.winners-carousel');
    const slideCount = carousel.querySelectorAll('.carousel-slide').length;
    const scrollEnd = (carousel.offsetWidth * (slideCount - 1));
    if (dir === 'left') {
      if (carousel.scrollLeft === 0) {
        carousel.scrollLeft = scrollEnd;
      } else {
        carousel.scrollLeft -= carousel.offsetWidth;
      }
    } else if (carousel.scrollLeft === scrollEnd) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft += carousel.offsetWidth;
    }
  });
  return btn;
}

/**
 * loads and decorates the carousel block
 * @param {Element} block The carousel block element
 */
export default async function decorate(block) {
  const slides = [...block.children];
  slides.forEach((slide) => {
    slide.classList.add('carousel-slide');

    slide.classList.add('carousel-slide-card');
    const slideContent = document.createElement('div');
    slideContent.classList.add('carousel-slide-card-content');

    [...slide.children].forEach((child) => {
      if (child.querySelector('picture')) {
        child.classList.add('carousel-slide-card-image');
      } else {
        // strip out unwanted p tags
        child.innerHTML = child.innerHTML.replace(/(<p[^>]+?>|<p>|<\/p>)/img, '');
        slideContent.appendChild(child);
      }
    });

    slide.appendChild(slideContent);
  });

  // remove button classes from links
  document.querySelectorAll('.carousel-slide-card-content div > a').forEach((btn) => {
    btn.classList.remove('button');
    btn.classList.remove('primary');

    btn.parentElement.classList.remove('button-container');
  });

  // setup for multiple slides
  if (slides.length > 1) {
    const leftBtn = buildNav('left');
    const rightBtn = buildNav('right');
    block.prepend(leftBtn, rightBtn);
    window.addEventListener('resize', () => {
      scrollToStart(block);
    });
  }
}
