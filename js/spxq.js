function shoppingMinute(str){
	let Imgs;
	$("#glass_List").on("mouseenter","li",function(){
		// $(this).children().css({"border":"1px solid black"});
		Imgs=$(this).children("img").attr("src");
		$("#small").children("img").attr({src:Imgs});
	});	
	$("#small").mousemove(function(e){
		//一、数据处理
		//1、改变数据（放大镜子的left和top）		
		let left1 =  e.pageX-$(this).offset().left-$("#mask").width()/2;
		let top1 =  e.pageY-$(this).offset().top-$("#mask").height()/2;
		
		//2.边界处理
		if(left1<0){
			left1=0;
		}else if(left1>$(this).width()-$("#mask").width()){
			left1=$(this).width()-$("#mask").width();
		}

		if(top1<0){
			top1=0;
		}else if(top1>$(this).height()-$("#mask").height()){
			top1=$(this).height()-$("#mask").height();
		}

		//二外观呈现
		$("#mask").css({"left":left1,"top":top1});
		$("#big").css({"background-position":`${-1*3*left1}px ${-1*3*top1}px`})
	})

	$("#small").mouseenter(function(){
		$("#mask").css("display","block");
		$("#big").css("display","block");
		if(Imgs==undefined){
			Imgs=str;
		}
		$("#big").css({"background-image":`url(${Imgs})`});

	});
	$("#mask").mouseleave(function(){
		$("#big").css("display","none");
		$("#mask").css("display","none");
	});
};


 $(function neibox(){
		
		$(".img_Right").on("click",function(){
			$('.glass_Box').stop(true,true)
			let curr = parseInt($(".glass_Box").css("left"))
			 curr-=114;
			if(Math.abs(parseInt($(".glass_Box").css("left"))) >= 114){
				// curr = -114;
				return
			}else{
				$('.glass_Box').animate({
					"left":curr,
				},500)
			}		
		})
		$(".img_Left").on("click",function(){
			$('.glass_Box').stop(true,true)
			let curr = parseInt($(".glass_Box").css("left"))
			curr+=114;
			if(parseInt($(".glass_Box").css("left")) >=0 ){
				return
			}else{
				$('.glass_Box').animate({
					"left":curr,
				},500)
			}
	})
});
 //商品详情
$(function(){
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
	 
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
}
	let goodsid = getUrlParam("goodsId");
	let datas = null;
	$.ajax({
		type:"GET",
		url:"getGoodsInfo.php",
		dataType:"JSON",
			data:{"goodsId":goodsid},
			success:function(data){
				datas = data;
				showgoodsDetail(data);
				shoppingMinute(data.beiyong4);
			}
		});

		function showgoodsDetail(str){
			let htmlStr = "";
		htmlStr+=`
			<div class="content_Middle">
	          		    <div class="content_Left">
	          		    	<div class="magnifying ">
	          		    	   <div id="small">
	          		    	   	 <img  class="small_Box" src="${str.beiyong4}"/>
				                 <div id="mask"></div>
			                   </div>
			                    <div id="big"></div>
	          		    	</div>		                  
			                    <div class="glass">
			                    	<img  class="img_Left" src="img/120.png"/>
			                   	 	<img class="img_Right" src="img/121.png"/>
			                   	 <div class="glass_Box">
			                   	 	<ul class="glass_List" id="glass_List">
			                   	 		<li class="list_bottom"><img src="${str.beiyong5}"></li>
			                   	 		<li class="list_bottom"><img src="${str.beiyong6}"></li>
			                   	 		<li class="list_bottom"><img src="${str.beiyong7}"></li>
			                   	 		<li class="list_bottom"><img src="${str.beiyong8}"></li>
			                   	 		<li class="list_bottom"><img src="${str.beiyong9}"></li>
			                   	 	</ul>
			                   	 </div>
			                    </div>
	          		    </div>
	          		    <div class="content_zj">
	          		    	<div class="zj_Top">
	          		    		<p class="knitting">Ess<br/>${str.goodsName}</p>
	          		    	    <span class="span_One">￥${str.goodsPrice}</span><span class="money_Span">￥249.00</span>
	          		    	    <p class="Serial ">产品编号:83873142</p>
	          		    	</div>
	          		    	<div class="zj_Next">
	          		    		<div class="Next_coat">
	          		    			<a href="#"><img src="img/115.png"/></a>
	          		    			<span>红</span>
	          		    		</div>
	          		    	</div>
	          		    	<div class="size_International">
	          		    		<div class="size_Top">
	          		    			<span>尺码[国际码]</span>
	          		    			<a href="#"><span class="size_table">查看尺码表</span></a>
	          		    		</div>
	          		    		<div class="size_num">
	          		    			<div class="size_nums">116</div>
	          		    		</div>
	          		    	</div>
	          		    	<div class="number_Box">
	          		    		<span>数量</span>
	          		    		<div class="select_Box">
	          		    			<select>
	          		    				<option>1</option>
	          		    				<option>2</option>
	          		    				<option>3</option>
	          		    				<option>4</option>
	          		    				<option>5</option>
	          		    			</select>
	          		    			<p><img src="img/122.png"/><span>有货</span></p>
	          		    		</div>
	          		    	</div>
	          		    	<div class="add_Car">
	          		    		<div id="Choose" class="choose">加入购物车<img class="triangle" src="img/8.png"></div>
	          		    	</div>
	          		    	<div class="share_Bottom">
	          		    		<p>分享到:<span><img src="img/38.png"/><img src="img/39.png"/></span></p>
	          		    	</div>
	          		    </div>
	          		    <div class="conten_Right">
	          		    	<div class="right_Top">
	          		    		<img src="img/127.png"/>
	          		    	</div>
	          		    	<div class="right_Content">
	          		    		<div class="cocur">
	          		    			<div class="cocur_coat">
	          		    				<a href="#"><img src="img/128.png"></a>
	          		    			</div>
	          		    			<div class="cocur_word">
	          		    				<p>AC MILAN 米兰青<br/>少年短袖T恤</p>
	          		    				<span>￥419.00</span>
	          		    			</div>
	          		    		</div>

	          		    		<div class="cocur">
	          		    			<div class="cocur_coat">
	          		    				<a href="#"><img src="img/129.png"></a>
	          		    			</div>
	          		    			<div class="cocur_word">
	          		    				<p>AC MILAN 米兰青<br/>短袖T恤</p>
	          		    				<span>￥269.00</span>
	          		    			</div>
	          		    		</div>

	          		    		<div class="cocur">
	          		    			<div class="cocur_coat">
	          		    				<a href="#"><img src="img/130.png"></a>
	          		    			</div>
	          		    			<div class="cocur_word">
	          		    				<p>Ess青少年拼色LOG<br/>O针织卫衣</p>
	          		    				<span>￥199.00</span>
	          		    			</div>
	          		    		</div>

	          		    		<div class="cocur">
	          		    			<div class="cocur_coat">
	          		    				<a href="#"><img src="img/131.png"></a>
	          		    			</div>
	          		    			<div class="cocur_word">
	          		    				<p>AC MILAN 米兰青<br/>少年短袖T恤</p>
	          		    				<span>￥249.00</span>
	          		    			</div>
	          		    		</div>
	          		    	</div>
	          		    </div>
	          		</div>
		`
			$(".content_Middles").html(htmlStr);
		}	
    })


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
    // 1、改变数据
    currIndex++;

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
window.onload=function(){
// 	 //字幕自动播放
	 autoPlay();
// 	 //顶部悬浮
     testf();
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