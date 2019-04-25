
//顶部悬浮
 function testf(){
      window.onscroll = function(){
        var container_Middle = document.getElementById("container_Middle");
        var _scroll = document.body.scrollTop || document.documentElement.scrollTop;
        // document.title = _scroll;
        if(_scroll >=52){
          container_Middle.style.position = "fixed";
          container_Middle.style.top = 0;
          container_Middle.style.zIndex =4;
        } else {
          container_Middle.style.position = "";
          container_Middle.style.top = "52px";
        }
      }
  }
  
//字幕自动播放
function autoPlay() {
  	var myTimer;
	var currIndex=0;//当前图片的下标  1 
  myTimer = setInterval(()=>{
    //一、数据处理
    //1、改变数据
    currIndex++;
// 
    //2、边界处理
    if(currIndex>3){
      currIndex=0;
    }

    //二、改变外观
    //1、改图片
    //1）、让所有的图片的z-index为1
    var pDoms=my$("#sever").children;
    for(let i=0;i<pDoms.length;i++){
      pDoms[i].style.opacity = 0;
    }
    //2）、让当前图片的的z-index为2
    pDoms[currIndex].style.opacity = 1;
  },3000);
}

//添加商品
$(function(){
  //用get获取数据
  $.get("getGoodsList.php",showDate,"json")
  
  //回调函数
  function showDate(obj){
    let htmlStr = "";
    for(let i=0;i<obj.length;i++){
      data = obj[i];
      // console.log(data);
  htmlStr +=`
    <div class="shoppBox1">
      <div class="shoppBox11">
      <div class="shoppBox2">
        <a href="#"><img src="${data.goodsImg}"/></a>
        <div class="shoppBox21">
          <a href="spxq.html?goodsId=${data.goodsId}"><img src="${data.beiyong1}"/></a>
        </div>
      </div>
      <div class="shoppBox3">
        <a href="#"><img src="${data.beiyong2}"/></a>
        <div class="shoppBox31">
          <a href="#"><img src="${data.beiyong3}"/></a></div>
      </div>
      </div>
    <div class="shoppBox4">
      <div class="shoppBox4_Top">
        <p>PUMA X SESAME STREET<br/>${data.goodsName}</p>
      </div>
      <div class="shoppBox4_Bottom">
        <span>￥${data.goodsPrice}</span>
      </div>
    </div>
    <div class="shoppBox5">
      <a href="#">快速浏览&nbsp;&nbsp;+</a>
    </div>
  </div>

  `
    }
    $(".shoppoing_cell").html(htmlStr);
  }
})


window.onload = function () {
	//顶部悬浮
	 testf();
	//字幕自动播放
	autoPlay();
}	
function my$(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	