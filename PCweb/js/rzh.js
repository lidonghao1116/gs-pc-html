
var publicPath="http://"+window.location.host+"/fbeeWebConsole_web";

$("document").ready(function(){
	//图形验证码
	getCaptcha();
	function getCaptcha(){
		$.ajax({
			url: "/fbeeWebConsole_web"+"/api/member/getCaptcha",
			type: "post",
			data: {},
			dataType: "json",
			success: function success(data) {
				if(data.success){
					if(data.code == 0){
						var dataJD = data.jsonData;
						var img = "data:image/jpeg;base64,"+dataJD.captcha;
						$(".in1_box img").attr("src",img);
						console.log(data.msg);
					}else{
						console.log(data.msg);
					}
				}else{
					console.log(data.msg);
				}
			}
		});
	}
	
	$("#image").click(function(){
		getCaptcha();
	});
	
	//省加载
	$("#proName").html("<option>请选择省</option>");
	$.ajax({
			url: "/fbeeWebConsole_web"+"/api/common/getAreaData/c001",
			type: "post",
			data: {},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						proObj=data.jsonData;
						$.each(proObj, function(i,item) {
							 $("#proName").append("<option value='"+item.areaCode+"'>"+item.areaName+"</option>")
						});
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	//市加载
  $("#proName").change(function(){
  $("#cityName").html("<option>请选择市</option>");
  $.ajax({
			url: "/fbeeWebConsole_web"+"/api/common/getAreaData/c002",
			type: "post",
			data: {
				pcode:$("#proName").val()
			},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						cityObj=data.jsonData;
						$.each(cityObj, function(i,item) {
							 $("#cityName").append("<option value='"+item.areaCode+"'>"+item.areaName+"</option>")
						});
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
		});
	//区加载
	$("#cityName").change(function(){
	  $("#rangName").html("<option>请选择区</option>");
	  $.ajax({
				url: "/fbeeWebConsole_web"+"/api/common/getAreaData/c003",
				type: "post",
				data: {
					pcode:$("#cityName").val()
				},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							proObj=data.jsonData;
							$.each(proObj, function(i,item) {
								 $("#rangName").append("<option value='"+item.areaCode+"'>"+item.areaName+"</option>")
							});
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
	    
	// 获取手机验证码    
	$(".code").click(function() {
		if($("#phone").val()==""||$("#phone").val()==null){
			$("#phone").trigger("blur");
		}else if($("#img").val()==""||$("#img").val()==null){
			var self=$("#img").parent();
			onError("请输入图形验证码",self);
		}else{
			$.ajax({
				url: publicPath+"/api/member/sendSms",
				type: "post",
				data: {
					mobile:$("#phone").val(),
					captcha:$("#img").val()
				},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							settime();
							alert("短信发送成功");
							$("#message").removeAttr("disabled");
							alert(data.jsonData);
							console.log(data.msg);
						}
					} else{
						onError(data.msg,$("#img").parent());
						getCaptcha();
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	})
	// 关闭弹窗
	$(".i_know").click(function(){
		$(".mask").show();
		$(".jion_alert,.jion_fail").show();
		window.location.href="jiacerIndex.html";
	});
	$(".close").click(function(){
		$(".mask").hide();
		$(".jion_alert,.jion_fail").hide();
	});
	//验证
	var regExp=/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;	//手机号码
	$(".in1,.in0").blur(function(){
		var self = $(this);
		var name = $(this).attr("name");
		switch(name){
			case "phone":
				if(self.val()==""){
					onError('请输入手机号码',self);
				}else if(!regExp.test(self.val())){
					onError('请输入正确的手机号码',self);
				}else{
					onSuccess(self);
				}
				break;
			case "captcha":
				if(self.val()==""){
					var self=$(this).parent();
					onError('请输入图形验证码',self);
				}else if(self.val().length!=4){
					var self=$(this).parent();
					onError('请输入四位图形验证码',self);
				}else{
					var self=$(this).parent();
					onSuccess(self);
				}
				break;
			case "message":
				if(self.val()==""){
					var self=$(this).parent();
					onError('请输入短信验证码',self);
				}else{
					$(this).parent().nextAll('.prompt').remove();
				}
				break;
			case "shop":
				if(self.val()==""){
					onError('请输入门店名',self);
				}else{
					$.ajax({
						url: "/fbeeWebConsole_web/api/custServer/getUniqueName",
						type: "post",
						data: {
							storeName:self.val()
						},
						dataType: "json",
						success: function success(data) {
							if(data.success){
								onSuccess(self);
							}else{
								onError(data.msg,self);
							}
						},
						error: function(err) {
							console.log(err);
						}
					});
				}
				break;
			default:
				break;
		}
	});
	
	$(".submmit_bt").click(function(){
		$(".in1,.in0").trigger("blur");
		if($(".address_se option:first-child").is(":selected")){
			var self = $(".address_se");
			onError('*请选择',self);
		}else{
			var self = $(".address_se");
			onSuccess(self);
		};	
		if($(".terms").is(":checked")){
			var self=$(".terms");
			onSuccess(self);
		}else{
			var self=$(".terms");
			onError('*请勾选协议',self);
		};
		if($(".prompt").length>0){
			return;
		};
		$.ajax({
			url: "/fbeeWebConsole_web/api/custServer/tenantsRegist",
			type: "post",
			data: {
				mobile:$("#phone").val(),
				captcha:$("#img").val(),
				smsCode:$("#message").val(),
				storeName:$("#shopName").val(),
				privince:$("#proName").val(),
				city:$("#cityName").val(),
				area:$("#rangName").val()
			},
			dataType: "json",
			success: function success(data) {
				if(data.success){
					$(".jion_alert").show();
				}else{
					if(data.code==100015){
						onError(data.msg,$("#phone"));
					}else if(data.code==100016){
						onError(data.msg,$("#shopName").parent());
					}else if(data.code==100012){
						onError(data.msg,$("#message").parent());
					}else if(data.code==100014){
						onError(data.msg,$("#message").parent());
					}
				}
			},
			error: function(err) {
				$(".jion_fail").show();
				console.log(err);
			}
		});
	});
	function onError (msg,self) {
		if(self.nextAll().hasClass('prompt')){
			self.nextAll('.prompt').text(msg);
			return;
		}
		self.nextAll('.prompt_sp').remove();
		self.parent().append("<span class='prompt'>"+msg+"</span>");
	};
	function onSuccess(self) {
		if(self.nextAll().hasClass('prompt_sp')){
			return;
		}
		self.nextAll('.prompt').remove();	
		self.parent().append("<span class='prompt_sp'></span>");
	};
})
	//重发短信按钮	
	var countdown = 60;
	function settime() {
		if(countdown == 0) {
			$(".code").removeAttr("disabled");
			$(".code").val("获取验证码");
			countdown = 60;
			return;
		} else {
			$(".code").attr("disabled","disabled");
			$(".code").val("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			settime()
		}, 1000)
	}

