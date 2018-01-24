$(document).ready(function(){
	// 预产期
	$("#baby").click(function(){
		if($("#baby").is(':checked')){
			$(this).siblings("#dt").attr("disabled","disabled");
			$(this).siblings("#dt").val('');
			self=$("#dt");
			onSuccess(self);
		}
		else{
			$(this).siblings("#dt").removeAttr("disabled");
		}
	});
	
	//筛选
	$(".select0 ul li").click(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	
	$(".select_sp ul li").click(function(){
		$(this).toggleClass("active");
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
	 //宠物选择
	if($("#yes").is(":checked")){
		$(".check_box").show();
		if($("#others").is(":checked")){
			$(".other").show();
		}
		else{
			$(".other").hide();
		}
	};
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

	// 提交验证
	$("#submit").click(function(){
		$("#info_enter input,#info_enter textarea,#per_info input").trigger("blur");
		//地址
		if($(".ad_se").is(":selected")){
			onError('*请选择地址',$(".ad_se").parent());
		}else{
			onSuccess($(".ad_se").parent());
		}
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
	//姓名var regName=/^[\u4E00-\u9FA5]{1,15}$/;	
	
	$("#info_enter input,#info_enter textarea,#per_info input").blur(function(){
		var self = $(this);
		var name = $(this).attr("name");
		switch (name){
			case "dt":
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
				}else{
					onSuccess(self);
				}
				break;
			case "address":
				if (self.val() == "") {
					onError('*请填写地址',self);
				}else if(self.val().length>=80){
					onError('*不能超过80个汉字',self);
				} else {
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
})
