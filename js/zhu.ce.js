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
    var pDoms=$("#sever").children;
    for(let i=0;i<pDoms.length;i++){
      pDoms[i].style.opacity = 0;
    }
    //2）、让当前图片的的z-index为2
    pDoms[currIndex].style.opacity = 1;
  },3000);
}
function regest(){
	$("#userName").onblur = function(){
		//姓名的规则：姓名只能使用字母或者中文
		var r =/^[a-zA-Z\u4e00-\u9fa5]+$/;
		if(r.test(this.value)){
			this.nextElementSibling.innerHTML = "√";
		}else{
			this.nextElementSibling.innerHTML = "×";
		}
	}
	$("#password").onblur = function(){
		//密码的规则：输入6-20位的数字加字母组合的密码
		var r = /^[A-Za-z0-9]{6,20}$/;
		if(r.test(this.value)){
			this.nextElementSibling.innerHTML = "√";
		}else{
			this.nextElementSibling.innerHTML = "×";
		}
	}
	$("#emailId").onblur = function(){
		//电子邮箱的规则：至少3个数字字母下划线@至少2个数字字母下划线.(com|cn|net|com.cn)
		var r = /^\w{3,}@\w{2,}\.(com|cn|net|com\.cn)$/;

		if(r.test(this.value)){
			this.nextElementSibling.innerHTML = "√";
		}else{
			this.nextElementSibling.innerHTML = "×";
		}

	}

	$("#phoneId").onblur = function(){
		//手机的规则：11位数字，1开头
		var r = /^1[1-9]\d{9}$/;

		if(r.test(this.value)){
			this.nextElementSibling.innerHTML = "√";
		}else{
			this.nextElementSibling.innerHTML = "×";
		}
	}
}
//ajax请求
// -----------------------------------------------------------------------------------------
//功能：ajax交互
//参数：
//请求地址
//请求方式
//请求参数（前端发给后端的数据，键值对的字符串形式，如：username=jzm&userpass=123）
//是否异步

//返回值：无
//
//
function regestAjax(){
$("#Choose").onclick = function(){
	ajax1811ByObjAndDefault({
		url:"regSave02.php",
		method:"post",
		param:`userName=${$("#userName").value}&phoneId=${$("#phoneId").value}&password=${$("#password").value}&emailId=${$("#emailId").value}`,
		func:function(num){
			if(num == 1){
				alert("注册成功！")
				window.location.href="denglu.html";
			}else{
				alert("注册失败！")
			}
		}
	});
}
}
function ajax1811ByObjAndDefault(obj){
	//默认值
	let defaultObj = {
		url:"regSave02.php",
		method:"post",
		param:`userName=${$("#userName").value}&phoneId=${$("#phoneId").value}&password=${$("#password").value}&emailId=${$("#emailId").value}`,
		isAsync:true,
		func:"null"
	};
	let endObj = {};
	for(let key in defaultObj){//循环json对象
		if(obj[key]==undefined){
			endObj[key]=defaultObj[key];
		}else{
			endObj[key]= obj[key];
		}
	}
	//1、创建对象
	let xhr = new XMLHttpRequest();

	//2、设置请求参数
	let urlAndParam = endObj.url;
	if(endObj.method.toLowerCase()=="get"){
		urlAndParam += "?"+endObj.param;
	}
	xhr.open(endObj.method,urlAndParam,endObj.isAsync);

	//3、设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			endObj.func&&endObj.func(xhr.responseText);
		}
	}
	//4、发送请求
	if(endObj.method.toLowerCase()=="post"){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(endObj.param);
	}else{
		xhr.send();	
	}
}
window.onload = function () {
	//顶部悬浮
	 testf();
	 //字幕自动播放
	autoPlay();
	//注册
	regest();
	//ajax请求
	regestAjax();
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

