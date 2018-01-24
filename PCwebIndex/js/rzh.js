var preLink=document.referrer;
console.log(preLink);


$("document").ready(function(){
  if(preLink.indexOf("infoComplete")!=-1){
		$('html, body').animate({
		 scrollTop: $(".content").offset().top
		 }, 1000)
  }
	//图形验证码
	getCaptcha();
	function getCaptcha(){
		$.ajax({
			url:window.global_config.getCaptcha,
			type: "post",
			data: {},
			dataType: "json",
			success: function success(data) {
				if(data.success){
					if(data.code == 0){
						var dataJD = data.jsonData;
						var img = "data:image/jpeg;base64,"+dataJD.captcha;
						$("#captcha").attr("src",img);
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

	$("#captcha").click(function(){
		getCaptcha();
	});
  //点击跳转页面
  $("#i_know").click(function () {
  })

	// 获取手机验证码
	$("#mesCapt").click(function() {
		// verification(name,self)
		if($("#phone").val()==""||$("#phone").val()==null){
			$("#phone").trigger("blur");
		}else if($("#img").val()==""||$("#img").val()==null){
			var self=$("#img");
			onError("*请输入图形验证码",self);
		}else{
			$.ajax({
				url: window.global_config.getSms,
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
							$("#mesCapt").removeAttr("disabled");
							console.log(data.msg);
              onSuccess($("#message"))
						}
					} else{
						onError(data.msg,$("#message"));
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
		$(".jion_fail").show();
		window.location.href="jiacerIndex.html";
	});
	$(".i_know_fail,.i_know_cunzai").click(function(){
		$(".mask").show();
		$(".jion_fail").show();
		window.location.href="rzh.html";
	});
	$(".close").click(function(){
		$(".mask").hide();
		$(".jion_fail").hide();
	});
	//验证

	$("#phone,#img,#message").blur(function(){
		var self = $(this);
		var name = $(this).attr("name");
    verification(name,self);
	});

	$("#login_bt").click(function(){
		$("#phone,#img,#message").trigger("blur");
		if($("#agreement").is(":checked")){
			var self=$("#agreement");
			onSuccess(self);
		}else{
			var self=$("#agreement");
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
			},
			dataType: "json",
			success: function success(data) {
				if(data.success){
          window.location.href="/infoComplete.html"
        }else{
          getCaptcha();
					if(data.code=="100005"){
						onError(data.msg,$("#img"));
					}else if(data.code=="100015"){
						onError(data.msg,$("#phone"));
					}else if(data.code=="100012"){
						onError(data.msg,$("#message"));
					}else if(data.code=="100014"){
						onError(data.msg,$("#message"));
					}else if(data.code=="100017"){
						$(".cunzai").show();
						$(".mask").show();
						$(".jion_fail").hide();
					}else {
            onError(data.msg,$("#phone"));
					}
				}
			},
			error: function(err) {
				$(".mask").show();
				$(".jion_fail").show();
				$(".cunzai").hide();
				console.log(err);
			}
		});
	});
	function onError (msg,self) {
		if(self.nextAll().hasClass('prompt')){
			self.nextAll('.prompt').text(msg);
			return;
		}
		// self.nextAll('.prompt_sp').remove();
		self.parent().append("<span class='prompt'>"+msg+"</span>");
	};
  //验证
  function verification(name,self) {
    var regExp=/^1(3|4|5|7|8)\d{9}$/;;	//手机号码
    switch(name){
      case "phone":
        if(self.val()==""){
          onError('*请输入手机号码',self);
        }else if(!regExp.test(self.val())){
          onError('*请输入正确的手机号码',self);
        }else{
          onSuccess(self);
        }
        break;
      case "imgCode":
        if(self.val()==""){
          // var self=$(this).parent();
          onError('*请输入图形验证码',self);
        }else if(self.val().length!=5){
          // var self=$(this).parent();
          onError('*请输入五位图形验证码',self);
        }else{
          // var self=$(this).parent();
          onSuccess(self);
        }
        break;
      case "message":
        if(self.val()==""){
          // var self=$(this).parent();
          onError('*请输入短信验证码',self);
        }else{
          onSuccess(self);
        }
        break;
      default:
        break;
    }
  }
	function onSuccess(self) {
/*		if(self.nextAll().hasClass('prompt_sp')){
			return;
		}*/
		self.nextAll('.prompt').remove();
		// self.parent().append("<span class='prompt_sp'></span>");
	};
})

	//重发短信按钮
	var countdown = 60;
	function settime() {
		if(countdown == 0) {
			$(".code").removeAttr("disabled");
			$(".code").text("获取验证码");
      $(".code").css('cursor',"pointer")
			countdown = 60;
			return;
		} else {
			$(".code").attr("disabled","disabled");
			$(".code").text("重新发送(" + countdown + ")");
			$(".code").css('cursor',"text")
			countdown--;
		}
		setTimeout(function() {
			settime()
		}, 1000)
	}
