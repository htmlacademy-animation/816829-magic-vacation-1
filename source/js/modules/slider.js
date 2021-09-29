import Swiper from 'swiper';

const SLIDES = [
  {
    image: `url("img/slide1.jpg")`,
    gradient: `linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523e75 16.85%)`,
    themeColor: `#a67ee5`,
  },
  {
    image: `url("img/slide2.jpg")`,
    gradient: `linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2a34b0 16.85%)`,
    themeColor: `#5468ff`,
  },
  {
    image: `url("img/slide3.jpg")`,
    gradient: `linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183c4 16.85%)`,
    themeColor: `#a2ffff`,
  },
  {
    image: `url("img/slide4.jpg")`,
    gradient: `linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2f2a42 16.85%)`,
    themeColor: `#5e5484`,
  },
];

/** @enum */
const SwiperProps = {
  DEFAULT: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    pagination: {
      el: `.swiper-pagination`,
      type: `fraction`,
    },
    navigation: {
      nextEl: `.js-control-next`,
      prevEl: `.js-control-prev`,
    },
    keyboard: {
      enabled: true,
    },
    observer: true,
    observeParents: true,
  },
  MOBILE_PORTRAIT: {
    pagination: {
      el: `.swiper-pagination`,
      type: `bullets`,
    },
    keyboard: {
      enabled: true,
    },
    observer: true,
    observeParents: true,
  },
};

export default () => {
  let storySlider = null;
  const sliderContainer = document.getElementById(`story`);

  const renderSlide = ({image, gradient, themeColor}) => {
    sliderContainer.style.backgroundImage = `${image}, ${gradient}`;
    document.body.style.setProperty(`--theme-color`, themeColor);
  };

  const handlers = {
    slideChange: () => {
      renderSlide(SLIDES[Math.floor(storySlider.activeIndex / 2)]);
    },
    resize: () => {
      storySlider.update();
    },
    destroy: () => {
      document.body.style.removeProperty(`--theme-color`);
    },
  };

  const renderSlider = () => {
    if (storySlider) {
      storySlider.destroy();
    }

    if (((window.innerWidth / window.innerHeight) <= 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        ...SwiperProps.MOBILE_PORTRAIT,
        on: handlers,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        ...SwiperProps.DEFAULT,
        on: handlers,
      });
    }
  };

  renderSlide(SLIDES[0]);

  window.addEventListener(`resize`, renderSlider);
  renderSlider();
};
