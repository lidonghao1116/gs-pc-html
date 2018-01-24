
var publicPath="http://"+window.location.host+"/fbeeWebConsole_web";
function browserRedirect() {
	    var sUserAgent = navigator.userAgent.toLowerCase();
	    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	    var bIsAndroid = sUserAgent.match(/android/i) == "android";
	    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	    	if (window.location.host=="139.224.49.192") {
	    		location.href="http://wxcs.jiacer.com";
	    	} else if (window.location.host=="ysc-home.jiacer.com") {
	    		location.href="http://ysc-wx.jiacer.com";
	    	} else {
	    		location.href="http://wx.jiacer.com";
	    	}

	    }
	}
$(document).ready(function(){
	browserRedirect()
	//登录点击
	$(".registered a:eq(0)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/login/api/common/isLogin",
				type: "post",
				data: {},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							window.location.href="myProfile.html";
						}
					} else {
						window.location.href="login.html";
						console.log(data.msg);
					}
				},
				error: function(err) {
					console.log(err);
				}
		   });
	})
	//退出登录
	$(".registered a:eq(1)").click(function(){
		if($(".registered a:eq(1)").html()=="注册"){
			window.location.href="login.html";
		}else{
			//用户登录信息
		   $.ajax({
			    url: publicPath+"/logout/api/member/logout",
				type: "post",
				data: {},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							window.location.href="login.html";
						}
					} else {
						console.log(data.msg);
					}
				},
				error: function(err) {
					console.log(err);
				}
		   });
		}

	})

	//用户登录信息
	   $.ajax({
		    url: publicPath+"/login/api/common/isLogin",
			type: "post",
			data: {},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						var dataJD=data.jsonData;
						var html="";
						if(dataJD.name != null&&dataJD.name != ""){
//							html="<a href='myProfile.html' target='_self'>"+dataJD.name+"</a>";
							$(".registered a:eq(0)").html("你好，"+dataJD.name);
						}else{
//							html="<a href='myProfile.html' target='_self'>"+dataJD.mobile+"</a>";
							$(".registered a:eq(0)").html("你好，"+dataJD.mobile);
						}
						$(".registered a:eq(1)").html("退出")
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
	   });
	// $(".buss_list").children("a:first").trigger("mouseleave");
	$(".buss_list").children("a:first").one("mouseleave");

	//滚动页面顶部菜单的变化
	var timeout = false;
	$(window).scroll(function(){
		var hheight = $(".fix_head").height();
		if (timeout){
			clearTimeout(timeout);
		}
		timeout = setTimeout(function(){
			var p_length=$("div.index_li").length-1;
			for(i=p_length;i>=0;i--){
				var i_top=$("div.index_li").eq(i).offset().top-hheight;
				if($("body").scrollTop()>=i_top){
					$(".head_content ul li").eq(i).addClass("active")
											.siblings().removeClass("active");
											break;
				}
			}
		})
	});
	// 地区
	$(".sel").click(function(){
		$(this).siblings().show();
		$(this).parent(".sel_box").addClass("city_active");
		$(this).parent(".sel_box").siblings(".sel_box").children(".sel_con").hide();
		$(this).parent(".sel_box").siblings(".sel_box").removeClass("city_active");
	});

	$(".sel_con ul li").click(function(){
		if($(this).parents(".sel_con").hasClass("hot_city")){
		  $(".area_in").text("所有区域");
		};
		$(this).parents(".sel_con").hide();
		var text = $(this).text();
		var privince = $(this).attr("privince-code");
		var privinceName = "";
		if(privince==undefined){
			privince = 2;//上海
			privinceName = "上海";
		}else{
			privinceName = text;
		}

		var areaName = "";
		var area = $(this).attr("area-code");
		if(area==undefined){
			area="";
		}else{
			areaName = text;
		}
//		alert(privinceName);
//		alert(areaName);
//		alert(privince);
//		alert(area);
		$(this).parents(".sel_box").children(".sel").text(text);
		$(this).parents(".sel_box").removeClass("city_active");
		//encodeURI(URI)
		//encodeURIComponent(encodedURI)
//		privinceName = encodeURIComponent(privinceName);
//		areaName = encodeURIComponent(areaName);
		var Url = "shopList.html?privince="+privince+"&privinceName="+privinceName+"&area="+area+"&areaName="+areaName+"&more=02";
		location.assign(encodeURI(Url));
		//window.location.href=
	});
	$(document).click(function(){
		$(".sel_con").hide();
		$(".sel_box").removeClass("city_active");
	});
	$(".sel_box,.sel_con").click(function(event){
		event.stopPropagation();

	});
	//公司列表
	// var $div_li =$(".tab li");
  //   $div_li.click(function(){
	// 	$(this).addClass("active")
	// 		   .siblings().removeClass("active");
  //       var index =  $div_li.index(this);
	// 	$(".tab_list")
	// 			.eq(index).show()
	// 			.siblings().hide();
	// });
	//定位
	var $head_li = $(".head_content ul li");
	$head_li.click(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		var hheight = $(".fix_head").height();
		var index= $head_li.index(this);
		var height = $(".index_li").eq(index).offset().top - hheight;
		$('html, body').animate({
			scrollTop: height
		}, 400);
	});
	//附近的家政公司
	getNearbyCompany();

	//最近业务
	getLatelyBusiness();

	$(".tab").on("click","li",function(){
		$(this).addClass("active");
	$(this).siblings().removeClass("active");
	var num=$(this).attr("data-num");
	if(num==1){
		$(".tab_list ul li:lt(6)").each(function(){
			$(this).show();
		})
		$(".tab_list ul li:gt(5)").each(function(){
			$(this).hide();
		})
	}
	if(num==2){
		$(".tab_list ul li").each(function(){
			$(this).show();
		})
		$(".tab_list ul li:lt(6)").each(function(){
			$(this).hide();
		})
		$(".tab_list ul li:gt(11)").each(function(){
			$(this).hide();
		})
	}
	if(num==3){
		$(".tab_list ul li").each(function(){
			$(this).show();
		})
		$(".tab_list ul li:lt(12)").each(function(){
			$(this).hide();
		})
		$(".tab_list ul li:gt(17)").each(function(){
			$(this).hide();
		})
	}
	if(num==4){
		$(".tab_list ul li").each(function(){
			$(this).show();
		})
		$(".tab_list ul li:lt(18)").each(function(){
			$(this).hide();
		})
		$(".tab_list ul li:gt(23)").each(function(){
			$(this).hide();
		})
	}
	if(num==5){
		$(".tab_list ul li").each(function(){
			$(this).show();
		})
		$(".tab_list ul li:lt(24)").each(function(){
			$(this).hide();
		})
	}
	})

})

function getNearbyCompany(){
	$.ajax({
		url:publicPath+"/api/custServer/queryNearbyCompany",
		type:"post",
		data: {
			more:"",
		},
		dataType: "json",
		success: function success(data) {
			if(data.success) {
				if(data.code==0){
					proObj=data.jsonData;
					var n=1;
					html1="";
					for(i=0;i<Math.ceil(proObj.length/6);i++){
						html1+="<li data-num='"+n+"'>"+"</li>";
						n++;
					}
					$(".tab").html(html1);

					var html = '';
					$.each(proObj, function(i,item) {
						var serviceCode = item.serviceCode;
						var array = serviceCode.split(",");
						var result = "";
						for(var i=0;i<array.length;i++){
							result+="<span>"+array[i]+"</span>"
						}
						$(".tab li:first-child").addClass("active");
						html+="<li>"+
									"<a href='http://"+window.location.host+"/"+item.domain+"/index.html"+"'>"+
									"<div class='company_info'>"+
										"<div class='com_top'>"+
											"<img src='img/mendianlogo.png'/>"+
											"<div class='top_right'>"+
												"<h2>"+item.websiteName+"</h2>"+
												"<p>"+item.privince+"-"+item.area+"</p>"+
											"</div>"+
										"</div>"+
										"<div class='type'>"+
											"<p>"+
											result
											"</p>"+
										"</div>"+
									"</div>"+
								"</a>"+
							"</li>";
					});
					 $(".tab_list ul").html(html);
					 $(".tab_list ul li:gt(5)").each(function(){
					 	$(this).hide();
					 })
				}
			} else {
				console.log(data.msg);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function getLatelyBusiness(){
	$.ajax({
		url:publicPath+"/api/custServer/queryJob",
		type:"post",
		data: {
			showMore:"",
			serverType:""
		},
		dataType: "json",
		success: function success(data) {
			if(data.success) {
				if(data.code==0){
					proObj=data.jsonData;
					console.info(proObj);
					var html = '';
					$.each(proObj, function(i,item) {
						
						var address ="";
						if(item.city==""){
							address =item.privince;
						}else {
							address=item.privince+"-"+item.city;
						}
						var salary = "";
						if(item.salary != null){
							salary = RetainedDecimalPlacesNF(item.salary);
						}
						html+="<li class='buss_list'>"+
								"<a href='http://"+window.location.host+"/"+item.domain+"/job.html"+"'><span class='first'>["+item.websiteName+"]</span><span class='second'>"+item.positionName+"</span>"+address+"&nbsp;&nbsp;<span class='test'>"+item.demand+"</span></a>"+
								"<p><span>"+salary + item.salaryTypeValue +"</span>"+item.modifyTime+"</p>"+
							  "</li>";

					});
					 $(".ul_box ul").html(html);
					  $(".buss_list a .test").each(function(){
						  var text = $(this).text();
						$(this).html(text);
					  });
					 $(".ul_box").find("a:first").trigger("mouseleave");
				}
			} else {
				console.log(data.msg);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});


	var scrollTimer;
	$(".ul_box").on("mouseenter mouseleave","a",function(e){
		var $this=$(this);
        if (e.type == "mouseenter") {
        	clearInterval(scrollTimer);
    		$(this).css("color","#ff9900");
          } else {
        	  $(this).css("color","#545454");
        		scrollTimer = setInterval(function() {

        			scrollNews($this);
        		}, 2000);
          }
      });

	function scrollNews(obj) {
	var $self = obj.parent("li").parent("ul");
	var lineHeight = $self.find("li:first").height();
	$self.animate({
		"marginTop": -lineHeight + "px"
	}, 600, function() {
	$self.css({
	marginTop: 0
	}).find("li:first").appendTo($self);
	})
	};


}
