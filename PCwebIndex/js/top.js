//	路径
//  var domain_name=window.location.pathname;
//  var domain=domain_name.split("/")[1];
//	var publicPath="http://"+window.location.host+"/fbeeWebConsole_web/"+domain;
	var publicPath="http://"+window.location.host+"/fbeeWebConsole_web";

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
    //跳转首页
	$(".logo").click(function(){
		window.location.href="jiacerIndex.html";
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
							$(".head_r ul li:eq(0) a").html("你好，"+dataJD.name);
						}else{
//							html="<a href='myProfile.html' target='_self'>"+dataJD.mobile+"</a>";
							$(".head_r ul li:eq(0) a").html("你好，"+dataJD.mobile);
						}
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
	   });

	//登录点击
	$(".head_r ul li:eq(0)").click(function(){
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
	$(".head_r ul li:eq(1)").click(function(){
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
	})
	//我的预约点击
    $(".head_r ul li:eq(2)").click(function(){
		//用户登录信息
		   $.ajax({
			    url: publicPath+"/login/api/common/isLogin",
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
			    url: publicPath+"/login/api/common/isLogin",
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
