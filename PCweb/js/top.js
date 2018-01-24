//	路径
//    var domain_name=window.location.pathname;
//    var url=domain_name.split("/")[1];
//	var publicPath="http://"+window.location.host+"/fbeeWebConsole_web"+url;
	var publicPath="http://"+window.location.host+"/fbeeWebConsole_web";

$(document).ready(function(){
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