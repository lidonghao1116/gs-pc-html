$(document).ready(function(){
	// 提交验证
	$("#login_bt").click(function(){
		$(".login div input").trigger("blur");
		if ($(".prompt").length>0) {		
			return;
		};
		//登录提交
		$.ajax({
			url: "/fbeeWebConsole_web/api/member/login",
			type: "post",
			data: {
				mobile:$("#phone").val(),
		 		code:$("#message").val(),
		 		captcha:$("#imgCode").val()
			},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						location.href="index.html";
						console.log(data.msg);
					}	
					else {
						getCaptcha();
						alert(data.msg);
					}
				} 
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
	
	// 表单验证
	var regExp=/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;	//手机号码
	var regNum= /^[0-9]*$/;
	var regCode= /^[A-Za-z0-9]+$/;
	$(".login div input").blur(function(){
		var self = $(this);
		var name = $(this).attr("name");
		switch (name){
			case "phone":
				if (self.val()=="") {
					onError('*请填写手机号码',self);
				} else if(!regExp.test(self.val())){
					onError('*请填写正确的手机号码',self);
				}else{
					onSuccess(self);
				}
				break;
			case "imgCode":
				if (self.val() == "") {
					onError('*请填图片验证码',self);
				} else if(!regCode.test(self.val())){
					onError('*验证码不正确',self);
				}else {
					onSuccess(self);
				}
				break;
			case "message":
				if (self.val() == "") {
					onError('*请填写短信验证码',self);
				} else if(!regNum.test(self.val())){
					onError('*验证码不正确',self);
				}else{
					onSuccess(self);
				}
				break;
			default:
				break;
		}
	});
	

	function onError (msg,self) {
		if(self.nextAll().hasClass('prompt')){
			self.nextAll('.prompt').text(msg);
			return;
		}
		self.parent().append("<span class='prompt'>"+msg+"</span>");
	}

	function onSuccess(self) {
		self.nextAll('.prompt').remove();	
	}
})