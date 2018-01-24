$(document).ready(function(){
	$(".img_box").hover(
		function(){
			$("#detail_tt").append("<img class='img_s' src=''/>");
			var back = $(this).css('backgroundImage');
			back = back.slice(back.lastIndexOf("/")+1,-2);
			imgsrc = "img/"+back;
			$(".img_s").attr("src",imgsrc);
			
		},
		function(){
			 $(".img_s").remove();
		}
		);
	//滚动页面顶部菜单的变化

	var timeout = false; 
	var height = $(".menu_li").height();
	$(window).scroll(function(){
		if (timeout){
			clearTimeout(timeout);
		} 
		timeout = setTimeout(function(){
			var offset0=$(".basic").offset().top-height;
			if ($("body").scrollTop() > offset0) {
			   $(".menu_li").addClass("fix");
			   $(".yuyue").addClass("yuyue_fix");
			} else {
			   $(".menu_li").removeClass("fix");
			   $(".yuyue").removeClass("yuyue_fix");
			}
			
			var p_length=$("div.tab_content").length-1;
			for(i=p_length;i>=0;i--){
				var i_top=$("div.tab_content").eq(i).offset().top-height;
				if($("body").scrollTop()>=i_top){
					$(".menu_li li").eq(i).addClass("active")
											.siblings().removeClass("active");
											break; 
				}
			}
		})
	}); 	
	// 单选
	$(".select0 ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});	
	//筛选
	$(".select_sp ul li").click(function(){
		$(this).toggleClass("active");
	});
	//宠物
	$(".radio").click(function(){
		if($("#yes").is(":checked")){
			$(".check_box").show();
			if($("#others").is(":checked")){
				$(".other").show();
			}
			else{
				$(".other").hide();
			}
		}
		else{
			$(".check_box,.other").hide();
		}
	 });

	$(".check").click(function(){
		if($("#others").is(":checked")){
			$(".other").show();
		}
		else{
			$(".other").hide();
		}
	});
	// 语言要求
	var $div_li=$(".yuyan .yuyan_li");
	$div_li.click(function(){
		var $this_li=$(this).parent("ul").children(".yuyan_li");
		var index = $this_li.index(this);
		if(index==$this_li.length-1){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$("#yuyan_other").hide();
				self=$("#yuyan_other");
				onSuccess(self);
				
			}else{
				$(this).addClass("active");
				$("#yuyan_other").show();
			}
		}else{
			$(this).toggleClass("active");
		}
	});
	 //预产期
	 $("#baby").click(function(){
		if($("#baby").is(':checked')){
			$(this).siblings("#xdt").attr("disabled","disabled");
			$(this).siblings("#xdt").val('');
			self=$("#xdt");
			onSuccess(self);
		}
		else{
			$(this).siblings("#xdt").removeAttr("disabled");
		}
	});
	
	// 提交验证
	$("#submit").click(function(){
		$("#info_enter input,#info_enter textarea,#per_info input").trigger("blur");
		// 下拉筛选
		$(".rselect option:first-child").each(function(){
			if($(this).is(":selected")){
			self = $(this).parent();
			onError('*请选择',self);
			}else{
				self = $(this).parent();
				onSuccess(self);
			}
		})		
		//地址
		if($(".ad_se").is(":selected")){
			onError('*请选择地址',$(".ad_se").parent());
		}else{
			onSuccess($(".ad_se").parent());
		}
		
		// 宠物选择
		if($("#yes").is(":checked") && $("#check_box input:checked").length==""){
			var self = $("#check_box");
			onError('*请选择宠物',self);
		}else if($("#yes").is(":checked") && $("#others").is(":checked") && $("#other").val()=="" ){
			var self = $("#check_box");
			onError('*请填写宠物',self);
		}else{
			var self = $("#check_box");
			onSuccess(self);
		}
		
		if ($(".prompt").length>0) {
			return;
		};
	});
	
	
	// 表单验证
	var regName=/^[\u4E00-\u9FA5]{1,15}$/;	//姓名
	
	$("#info_enter input,#info_enter textarea,#per_info input").blur(function(){
		var self = $(this);
		var name = $(this).attr("name");
		switch (name){
			case "xdt":
				if (self.val()==""&& $("#baby:checked").length=="") {
					onError('*请填写预产期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "dpd1":
				if (self.val() == ""||self.siblings("#dpd2").val() == "") {
					onError('*请填写日期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "dpd2":
				if (self.val() == ""||self.siblings("#dpd1").val() == "") {
					onError('*请填写日期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "datesecond3":
				if (self.val()=="") {
					onError('*请填写日期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "datesecond1":
				if (self.val() == ""||self.siblings("#datesecond2").val() == "") {
					onError('*请填写日期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "datesecond2":
				if (self.val() == ""||self.siblings("#datesecond1").val() == "") {
					onError('*请填写日期',self);
				} else {
					onSuccess(self);
				}
				break;
			case "other":
				if ($("#yes").is(":checked") && $("#others").is(":checked")){
					if(self.val()==""){
						onError('*请填写宠物',self);
					}else if(self.val().length>=20){
						onError('*不能超过20个汉字',self);
					}else{
						onSuccess(self);
					}
				} else{
					onSuccess(self);
				}
				break;
			case "special":
				if (self.val().length>=200){
					onError('*不能超过200个汉字',self);
				} else {
					onSuccess(self);
				}
				break;
			case "name":
				if (self.val() == ""){
					onError('*请填写姓名',self);
				}else {
					onSuccess(self);
				}
				break;
			case "address":
				if (self.val() == "") {
					onError('*请填写地址',self);
				} else if(self.val().length>=80){
					onError('*不能超过80个汉字',self);
				}else{
					onSuccess(self);
				}
				break;
			case "yuyanOther":
				if($(".yuyan_li:last").hasClass("active")){
					if(self.val() == ""){
						onError('*请填写其他语言',self);
					}else if(self.val().length>=15){
						onError('*不能超过15个汉字',self);
					}else{
						onSuccess(self);
					}
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
	//菜单点击滚动
	var $div_li =$(".menu_li li");
		$div_li.click(function(){
		$(this).addClass("active")            
			   .siblings().removeClass("active");
		var index =  $div_li.index(this);  
		var offset_index=$(".tab_content").eq(index).offset().top-height; 
		$('html, body').animate({
			scrollTop: offset_index
		}, 400);
	}); 
})