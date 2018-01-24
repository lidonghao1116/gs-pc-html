$(document).ready(function(){
	//取消预约
	/*$("#pay").click(function(){
			$(".mask").show();
			$(".pay_alert").show();
		
	});*/
	//关闭弹窗
	$(".alert_bt input").click(function(){
		$(".mask,.pay_alert").hide();
	});
	//支付
	$(".pay_way input").click(function(){
			$(this).siblings("label").addClass("active");
			$(this).parent().siblings().children("label").removeClass("active");
	});
})


