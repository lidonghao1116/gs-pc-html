$(document).ready(function(){
	//订单状态筛选
	$(".content_tab li").click(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	//取消预约
	$(".cancel_order").click(function(){ 
		var orderNo=$(this).attr("data-orderNo");
		if($(this).parent().siblings("p").children(".pay_bt").text()=="支付定金"){
			$(".mask").show();
			$(".order_alert0").show();
			$(".ok").click(function(){
				 $.ajax({
					url: publicPath + "/api/reserveorders/reserveorders",
					type: "post",
					data: {
						orderNo: orderNo
					},
					dataType: "json",
					success: function success(data) {
						if(data.success) {
							if(data.code == 0) {
								console.log(data.msg);
							} else {
								console.log(data.msg);
							}
						} else {
							console.log(data.msg);
						}
					}
				});
		})
		}
		else{
			$(".mask").show();
			$(".order_alert").show();
		}
	});
	//关闭弹窗
	$(".alert_bt input").click(function(){
		$(".mask,.order_alert0,.order_alert").hide();
	});
	$(".close,.mask0").click(function(){
		$(".mask0,.card_detail").hide();
	});
	//阿姨详情弹窗
	$(".card").click(function(){
		$(".mask0,.card_detail").show();
	});
	//更换阿姨
	$(".change").click(function(){
		$(".mask").show();
	});
	$(".cancel_change,.ok_change").click(function(){
		$(".mask").hide();
	});
})


