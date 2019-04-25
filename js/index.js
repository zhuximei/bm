// 点击切换轮播图
 var mySwiper = new Swiper ('.swiper-container', {
    
     autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })