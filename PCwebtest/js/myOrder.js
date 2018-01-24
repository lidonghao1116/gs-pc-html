$(document).ready(function(){
	/*//取消订单
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
	});*/

	//阿姨详情弹窗
/*	$(".card").click(function(){
		$(".mask0,.card_detail").show();
	});*/
	//更换阿姨
	
})
