//my$函数
 function my$(str){
  if(str.charAt(0)=="#"){
    return document.getElementById(str.substring(1));
  }else if(str.charAt(0)=="."){
    return document.getElementsByClassName(str.substring(1));
  }else{
    return document.getElementsByTagName(str);
  }
} 
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
//参数：
//滑入入的dom对象
//滑出的dom对象
//时长；

function slideInOut(domInObj,domOutObj,timeLong,func){
	
	let timeSpace = 10 ;//时间间隔 = 总时间/步子数
	let stepCount = timeLong/timeSpace; //步子数 = 总时间/时间间隔
	let step = domInObj.offsetWidth/stepCount ;//步长 = 路程/步子数


	let currLeft = 0;
	let myTimer = setInterval(()=>{

		currLeft -= step;

		if(currLeft<=-1*domInObj.offsetWidth){
			currLeft=-1*domInObj.offsetWidth;
			clearInterval(myTimer);
			func&&func();
		}

		domInObj.style.left =(currLeft+domInObj.offsetWidth)+"px";
		domOutObj.style.left = currLeft+"px";
	},timeSpace);
}
//轮播图
class BannerPic{
	constructor(obj){
		let defaultObj = {
			"boxDom":null,//轮播图的容器
			"imgDoms":[],//存放所有图片dom的数组(img标签)
			"width":"500",
			"height":"300",
			"imgs":[],
			"douSize":12,//豆豆的大小
			"douSizeBottom":63,
			"doudouHoverBottom":61,
			"doudouHover":16,
			"douSpace" : 10,//豆豆的间距
			"douColor" : "greenyellow",//豆豆的颜色
			"douHighColor":"orange",//高亮颜色
			"douIsCircle":true,//是否是圆的
			"doudouDirection":"上",//"上"，"右"，"下"，"左"，
            // "margin":0 "auto";
			"currIndex":0,//当前显示的图片序号
			"myTimer":null,
			"timeSpace":2000
		};

		//属性
		for(let key in defaultObj){
			if(obj[key]==undefined){
				this[key] = defaultObj[key];
			}else{
				this[key] = obj[key];
			}
		}

		this.width = this.boxDom.offsetWidth;
		this.height = this.boxDom.offsetHeight;

		this.initUI();
		this.createUI();
		this.addEvent();
		this.autoPlay();
	}

	initUI(){
		this.boxDom.style.position = "relative";
		this.boxDom.style.overflow = "hidden";
	}

	createUI(){

		//1、创建所有的img标签
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `position: absolute;
					left:${this.width}px;
					top:0px;
					width: 1280px;
					height:502px;
					`;
			if(i==0){
				imgDom.style.left = "0px";
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}

		//2、创建UL（豆豆的容器）
		let ulDom = document.createElement("ul");
		ulDom.style.cssText=`position: absolute;
					list-style: none;				
					z-index: 3;`;

		switch(this.doudouDirection){
			case "上":
						ulDom.style.top="20px";
						ulDom.style.left= (this.width-this.douSize*2*this.imgs.length)/2 +"px";
						break;
			case "下":
						ulDom.style.bottom="63px";
						ulDom.style.left= (this.width-this.douSize*2*this.imgs.length)/2 +"px";
						break;
		}
		this.boxDom.appendChild(ulDom);
		//3、创建li（豆豆）
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText =`
					float:left;
					width:${this.douSize}px;
					height: ${this.douSize}px;
					margin-right: ${this.douSpace}px;
					background-color: ${this.douColor};
				`;
			if(this.douIsCircle){
				liDom.style.borderRadius = "50%";
			}
			if(i==0){
				liDom.style.backgroundColor = this.douHighColor;
			}
			ulDom.appendChild(liDom);
		}
	}


	addEvent(){
		//2、停止播放（给box绑定事件）
		this.boxDom.onmouseenter = ()=>{
			this.stopPlay();
		}

		//3、继续播放（给box绑定事件）
		this.boxDom.onmouseleave = ()=> {
			this.autoPlay();
		}

		//4、跳转(给li)
		let liDoms = this.boxDom.lastElementChild.children;
		for(let i=0;i<liDoms.length;i++){
			let obj = this;

			liDoms[i].onclick = function(){
				obj.goImg(this.getAttribute("index"));
			}
			
		}
	}

	autoPlay(){
			this.myTimer = setInterval(()=>{
				//一、数据处理
				//1、改变数据
				let outIndex = this.currIndex;
				 this.currIndex++;

				//2、边界处理
				if( this.currIndex>this.imgs.length-1){
					 this.currIndex=0;
				}

				//二、改变外观
				 this.showImg( this.currIndex,outIndex);

			},this.timeSpace);

	}

	stopPlay(){
		window.clearInterval(this.myTimer);
	}

	goImg(index){
		//一、数据处理
		//1、改变数据
		let outIndex = this.currIndex;
		this.currIndex = index;
		
		//2、边界处理
		if(this.currIndex<0 || this.currIndex>this.imgs.length-1){
			this.currIndex = 0;
		}

		//二、改变外观
		this.showImg(this.currIndex,outIndex);

	}

	//显示指定的图片
	//参数：
	//进入的图片的下标
	//出去的图片的下标
	showImg(inIndex,outIndex){
		if(inIndex==outIndex){
			return;
		}

		if(inIndex<0 || inIndex>4){
			return;
		}

		if(outIndex<0 || outIndex>4){
			return;
		}

		this.imgDoms[inIndex].style.left = this.width+"px";
		//1、改图片
		slideInOut(this.imgDoms[inIndex],this.imgDoms[outIndex],200);

		//2、改豆豆		
		//1）、让所有的li的background-color是pink
		let liDoms = this.boxDom.lastElementChild.children;
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].style.backgroundColor = this.douColor;
			liDoms[i].style.width = this.douSize+"px";
			liDoms[i].style.height = this.douSize+"px";
			liDoms[i].style.marginTop = this.douSizeBottom+"px";
		}
		//2）、让当前li的background-color是red
		liDoms[inIndex].style.backgroundColor = this.douHighColor;
		liDoms[inIndex].style.width = this.doudouHover+"px";
		liDoms[inIndex].style.height = this.doudouHover+"px";
		liDoms[inIndex].style.marginTop = this.doudouHoverBottom+"px";
	}

}
window.onload=function(){
	 //轮播图
    new BannerPic({
			"boxDom":my$("#place"),//轮播图的容器
			"imgs":["img/01.jpg","img/02.jpg","img/03.jpg","img/04.jpg","img/05.jpg"],
			"doudouDirection":"下"
		});
    //顶部悬浮
    testf();
    //字幕播放
    autoPlay();
}