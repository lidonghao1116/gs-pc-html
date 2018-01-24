//	路径
    var domain_name=window.location.pathname;
    var domain=domain_name.split("/")[1];
	var publicPath="http://"+window.location.host+"/fbeeWebConsole_web/"+domain;
	var publicPathCmn="http://"+window.location.host+"/fbeeWebConsole_web";
	var publicIndex="http://"+window.location.host
	//金额千位分隔
	function RetainedDecimalPlaces(num) {
	　　num = parseFloat(num).toFixed(2);
	　　var source = String(num).split(".");
	　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
	　　return source.join(".");
	};
  //金额千位分隔2
  function RetainedDecimalPlacesNF(num) {
  　　var source = String(num).split(".");
  　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
  　　return source[0];
  };
function toast_tip(msg){
	$(document.body).append("<div class='toast'>"+msg+"</div>");
        setTimeout(function(){
            $('.toast').remove();	
        },2000);
};
Date.prototype.Format = function (fmt) { //author: meizz
var o = {
	"M+": this.getMonth() + 1, //月份
	"d+": this.getDate(), //日
	"h+": this.getHours(), //小时
	"m+": this.getMinutes(), //分
	"s+": this.getSeconds(), //秒
	"q+": Math.floor((this.getMonth() + 3) / 3), //季度
	"S": this.getMilliseconds() //毫秒
};
if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
for (var k in o)
if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
}
	function formatCurrency(num){
        if(num)
        {
           num = num.toString().replace(/\$|\,/g,'');
           if(''==num || isNaN(num)){return 'Not a Number ! ';}
           var sign = num.indexOf("-")> 0 ? '-' : '';
           var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
            cents = cents.length>1 ? cents : '' ;
           num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
           if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
           else{if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
           for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            {
                num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
            }
            return (sign + num + cents);
        }

    }

	function Encrypt(str, pwd) {
	    if(str=="")return "";
	    str = escape(str);
	    if(!pwd || pwd==""){ var pwd="1234"; }
	    pwd = escape(pwd);
	      if(pwd == null || pwd.length <= 0) {
	        alert("Please enter a password with which to encrypt the message.");
	          return null;
	      }
	      var prand = "";
	      for(var I=0; I<pwd.length; I++) {
	        prand += pwd.charCodeAt(I).toString();
	      }
	      var sPos = Math.floor(prand.length / 5);
	      var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
	      var incr = Math.ceil(pwd.length / 2);
	      var modu = Math.pow(2, 31) - 1;
	      if(mult < 2) {
	        alert("Algorithm cannot find a suitable hash. Please choose a different password. /nPossible considerations are to choose a more complex or longer password.");
	        return null;
	      }
	      var salt = Math.round(Math.random() * 1000000000) % 100000000;
	      prand += salt;
	      while(prand.length > 10) {
	        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
	      }
	      prand = (mult * prand + incr) % modu;
	    var enc_chr = "";
	    var enc_str = "";
	    for(var I=0; I<str.length; I++) {
	        enc_chr = parseInt(str.charCodeAt(I) ^ Math.floor((prand / modu) * 255));
	        if(enc_chr < 16) {
	            enc_str += "0" + enc_chr.toString(16);
	        }else
	            enc_str += enc_chr.toString(16);
	        prand = (mult * prand + incr) % modu;
	    }
	      salt = salt.toString(16);
	      while(salt.length < 8)salt = "0" + salt;
	    enc_str += salt;
	    return enc_str;
	}
	function Decrypt(str, pwd) {
	    if(str=="")return "";
	    if(!pwd || pwd==""){ var pwd="1234"; }
	    pwd = escape(pwd);
	      if(str == null || str.length < 8) {
	        alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
	        return;
	      }
	      if(pwd == null || pwd.length <= 0) {
	        alert("Please enter a password with which to decrypt the message.");
	        return;
	      }
	      var prand = "";
	      for(var I=0; I<pwd.length; I++) {
	        prand += pwd.charCodeAt(I).toString();
	      }
	      var sPos = Math.floor(prand.length / 5);
	      var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
	      var incr = Math.round(pwd.length / 2);
	      var modu = Math.pow(2, 31) - 1;
	      var salt = parseInt(str.substring(str.length - 8, str.length), 16);
	      str = str.substring(0, str.length - 8);
	      prand += salt;
	      while(prand.length > 10) {
	        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
	      }
	      prand = (mult * prand + incr) % modu;
	      var enc_chr = "";
	      var enc_str = "";
	    for(var I=0; I<str.length; I+=2) {
	        enc_chr = parseInt(parseInt(str.substring(I, I+2), 16) ^ Math.floor((prand / modu) * 255));
	        enc_str += String.fromCharCode(enc_chr);
	        prand = (mult * prand + incr) % modu;
	    }
	    return unescape(enc_str);
	}

//	判断设备
	function browserRedirect(domain) {
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
	    		location.href="http://wxcs.jiacer.com/"+domain;
	    	} else if (window.location.host=="ysc-home.jiacer.com") {
	    		location.href="http://ysc-wx.jiacer.com/"+domain;
	    	} else {
	    		location.href="http://wx.jiacer.com/"+domain;
	    	}
	    }
	}

$(document).ready(function(){
	browserRedirect(domain)
	// select样式
	$("select").each(function(){
		if($(this).val()==""){
			$(this).css("color","#808080");
		}else{
			$(this).css("color","#333");
		}
	});
	$("select").change(function(){
		if($(this).val()==""){
			$(this).css("color","#808080");
		}else{
			$(this).css("color","#333");
		}
	});
	// 返回顶部
	var timeout;
	var halfHeight=$(window).height()/2;
	$(window).scroll(function(){
			clearTimeout(timeout);
			timeout = setTimeout(function(){
			if ($("body").scrollTop() > halfHeight) {
				  $("#goTopBtn").show();
				} else {
				  $("#goTopBtn").hide();
				};
	        })
	});
	//服务热线
	//租户站点信息
	$.ajax({
		    url: publicPath+"/api/index/info",
		        type: "post",
		        data: {},
		        dataType: "json",
		        success: function success(data) {
		            if(data.success){
		                if(data.code == 0){
		                	var dataJD = data.jsonData;
		                	var url=dataJD.bannerUrl;
		            //     	var i=url.lastIndexOf("_");
                    //   console.log(i);
                    //   if(i!=-1){
                    //     url=url.slice(0,i)+"_1100x380";
                    //   }else {
                    //   	url="/images"+url;
					// 						}
                      console.log(url);
                      var html="";
		                	$(".first_word").html(dataJD.wesiteName.substring(0,1));
		                	$(".banner").css("background-image","url("+url+")");
							$(".top_com_l h1").html(dataJD.wesiteName);
							$(".title").html(dataJD.wesiteName);
		                	$(".phone").text(dataJD.contactPhone);
		                	$(".top_com_l p").text(dataJD.contactAddress);

		                	//服务热线
		                	if(dataJD.contactPhone1==null){
		                		$(".link_phone").hide();
		                	}else{
		                		$(".link_phone p:eq(1)").text(dataJD.contactPhone1);
		                		$(".link_phone").show();
		                	}

		                    if(dataJD.qqThree!=null){
		                    	html+="<a  target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin="+dataJD.qqThree+"&site=qq&menu=yes'><p data-qq='"+dataJD.qqThree+"'>"+"QQ交谈"+"</p ></a>";
		                    }if(dataJD.qqTwo!=null){
		                    	html+="<a  target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin="+dataJD.qqTwo+"&site=qq&menu=yes'><p data-qq='"+dataJD.qqTwo+"'>"+"QQ交谈"+"</p ></a>";
		                    }
		                    if(dataJD.qqOne!=null){
		                    	html+="<a  target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin="+dataJD.qqOne+"&site=qq&menu=yes'><p data-qq='"+dataJD.qqOne+"'>"+"QQ交谈"+"</p ></a>";
		                    }
		                    if(html==""){
		                    	$(".qq_link").hide();
		                    }else{
		                    	$(".qq_link").html(html);
			                    $(".qq_link").show();
		                    }
		                	if(html==""&&dataJD.contactPhone1==null&&dataJD.qrCode==null){
		                		$(".bottom_fixed_link").hide();
		                	}
		                	if(dataJD.qrCode!=null){
		                		$(".lin_wechat").css("backgroundImage","url('"+dataJD.qrCode+"')");
		                	}else{
		                		$(".lin_wechat").hide();
		                	}

		                	console.log(data.msg);
		                }else{
		                    console.log(data.msg);
		                }
		            }else{
		                console.log(data.msg);
		            }
		        }
		    });
	//登录点击
	$(".head_r ul li:eq(0)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/api/common/isLogin",
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
	$(".head_r ul li:eq(1)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/api/member/logout",
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
	})
	//跳转首页
	$(".logo").click(function(){
		window.location.href=publicIndex;
	})
	//我的预约点击
    $(".head_r ul li:eq(2)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/api/common/isLogin",
				type: "post",
				data: {},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							window.location.href="myReservation.html";
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
	//我的账户点击
	$(".head_r ul li:eq(3)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/api/common/isLogin",
				type: "post",
				data: {},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							window.location.href="myOrder.html";
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
	//用户登录信息
	   $.ajax({
		    url: publicPath+"/api/common/isLogin",
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
							$(".head_r ul li:eq(0) a").html("你好，"+dataJD.name);
						}else{
//							html="<a href='myProfile.html' target='_self'>"+dataJD.mobile+"</a>";
							$(".head_r ul li:eq(0) a").html("你好，"+dataJD.mobile);
						}
						$(".head_r ul li:eq(1)").show();
					}
				} else {
					$(".head_r ul li:eq(1)").hide();
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
	   });
	//头部微信展示
	$(".wechat").hover(
	  function () {
		$(this).children(".wechat_b").show();
	  },
	  function () {
		$(this).children(".wechat_b").hide();
	  }
	);
	//返回顶部
	 $("#goTopBtn").click(function(){
	$('body,html').animate({ scrollTop: 0 }, 500);
 });
 $('.nav ul li a').each(function(){
		if($($(this))[0].href==String(window.location))
			$(this).parent().addClass('active');
	});
})
