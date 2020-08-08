$(function () {

  function slider() {

    //変数の設定
    const $slides = $(".slides");
    const $slide = $(".slide");
    const $indicator = $(".indicator");
    let currentIndex=0;
    let slideLength = $slide.length;
    var cancelFlag = 0;

    //インジケーターの生成
    function addIndicator(){
      let indicatorHTML = "";
      indicatorHTML += "<li class=item>" + "</li>";

      for (let i=0; i<=slideLength-1; i++){
        console.log(slideLength);
        $indicator.append(indicatorHTML);
        $(".item").eq(currentIndex).addClass("is-active");
      }
    }

    //最初と最後のスライドをクローン
    function cloneSlide() {
      const $lastSlide = $slides.find("li:last-child");
      const $firstSlide = $slides.find("li:first-child");
      $lastSlide.clone(true).prependTo($slides);
      $firstSlide.clone(true).appendTo($slides);
    }
// .is isanimate アニメーション中は発火しないメソッドをいれる

    //スライドアニメーション
    function changeSlide() {
      const duration = 1000;
      $slides.animate({
        left: (currentIndex+1) * -100 + "%"
      },duration);
      console.log(currentIndex);

      if(currentIndex == slideLength){
        currentIndex = 1;
        $(".slides").animate({
          left: currentIndex * -100 + "%"
        },0);
        currentIndex -= 1;
      }else if(currentIndex == -1) {
        currentIndex = slideLength -1;
        console.log(currentIndex);
        $(".slides").animate({
          left: currentIndex * -100 + "%"
        },0);
        // currentIndex = slideLength;
      }
      updateNav(currentIndex);
    }

    //タイマースタート
    function startTimer() {
      const interval = 2000;
      timer = setInterval(function(){
        currentIndex++;
        changeSlide(currentIndex);
      },interval);
    }

    //タイマーの一時停止
    function stopTimer() {
      clearInterval(timer);
    }

    //現在のスライド位置をインジケーターに表示
    function updateNav() {
      if(currentIndex == slideLength){
        currentIndex = 0;
      }
      $(".item").removeClass("is-active");
      $(".item").eq(currentIndex).addClass("is-active");
    }

    //インジケータークリック処理
    function goSomewhere() {
      currentIndex = $(this).index();
      changeSlide(currentIndex);
    }

    //prevボタンの処理
    function prevSlide() {
      if( cancelFlag == 0 ){
        currentIndex--;
        cancelFlag = 1; 
        changeSlide(currentIndex);
        setTimeout(function(){
          cancelFlag = 0;
        },1000);
      }
    }

    //nextボタンの処理
    function nextSlide() {
      if( cancelFlag == 0 ){
        currentIndex++;
        cancelFlag = 1; 
        changeSlide(currentIndex);
        setTimeout(function(){
          cancelFlag = 0;
        },1000);
      }
    }

    function init() {
      cloneSlide();
      addIndicator();
      setEvent();
      startTimer();
    }

    //クリックで実行
    function setEvent() {
      const $slider = $(".slider");
      $slider.add($indicator).on({
        mouseenter: stopTimer,
        mouseleave: startTimer
      });
      $(".prev").on("click", prevSlide);
      $(".next").on("click", nextSlide);
      $(".item").on("click", goSomewhere);
    }

    init();

  }

  slider();

});