
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
  //登录ajax请求
  function ajaxRequert(){
	$("#choose").onclick = function(){
		//1、
		let xhr = new XMLHttpRequest();
		//2、
		xhr.open("post","loginCheck.php",true);
		//3、
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4 && xhr.status==200){
				if(xhr.responseText=="1"){
					//存cookie
					addCookie("phoneId",$("#phoneId").value,30);
					location.href="bm.html";
				}else{
					alert("登陆失败");
				}
			}
		}

		// 4、
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		let str=`phoneId=${$("#phoneId").value}&password=${$("#password").value}`;
		xhr.send(str);
	}
}
	//登录验证
function xh(){
  var txtDom=$("#login");
  var spanDom=$("#span_Box");
   txtDom.onblur=function(){
      if(txtDom.value==""){
        txtDom.style.background="pink";
        spanDom.style.display="block";
      }else{
        spanDom.style.display="none";
      }
    }
}
function login(){
  var textId=$("#automatic");
  var spanDom=$("#mandatory");
  textId.onblur=function(){
      if(textId.value==""){
        textId.style.background="pink";
        mandatory.style.display="block";
      }else{
        mandatory.style.display="none";
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
    var pDoms=$("#sever").children;
    for(let i=0;i<pDoms.length;i++){
      pDoms[i].style.opacity = 0;
    }
    //2）、让当前图片的的z-index为2
    pDoms[currIndex].style.opacity = 1;
  },3000);
}
window.onload = function () {
	//顶部悬浮
	 testf();
	 //登录ajax请求
	ajaxRequert();
	//登录验证
	xh();
	login();
	//字幕自动播放
	autoPlay();
}	
function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	