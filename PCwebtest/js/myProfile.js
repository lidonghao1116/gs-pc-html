	$(document).ready(function(){
		// 编辑
		$(".write").click(function(){
			$(this).hide();
			$(".no_edit").hide();
			$(".edit,.pro_btn input").show();
			$(".in_val").each(function(){
				var pVal = $(this).parent(".edit").siblings("p").text();
				$(this).val(pVal);
			})
		});
		// 取消
		$(".pro_btn_res").click(function(){
			$(".write").show();
			$(".no_edit").show();
			$(".edit,.pro_btn input").hide();
		});
		// 保存
		$(".pro_btn_sub").click(function(){
			$(".edit input").trigger("blur");
			if ($(".validation").length>0) {
						return;
			};
			$(".in_val").each(function(){
				var inputVal = $(this).val();
				$(this).parent(".edit").siblings("p").text(inputVal);
			});
			$(".no_edit").show();
			$(".write").show();
			$(".edit,.pro_btn input").hide();
		});
		// 表单验证
		//var regName=/^$|^[\u4E00-\u9FA5]{1,15}$/;	姓名
		var regQQ=/^$|^[1-9][0-9]{4,15}$/;	        //qq号码
		var regWechat=/^$|^[a-zA-Z\d_]{5,20}$/;	//微信号
		$(".edit input").blur(function(){
			var self = $(this);
			var name = $(this).attr("name");
			switch(name){
				case "qq":
					if(!regQQ.test(self.val())){
						onError("*请输入正确的QQ号码",self);
					}else{
						onSuccess(self);
					}
					break;
				case "wechat":
					if(!regWechat.test(self.val())){
						onError("*请输入正确的QQ号码",self);
					}else{
						onSuccess(self);
					}
					break;
				case "address":
					if(self.val().length>=80){
						onError("*不能超过80个汉字",self);
					}else{
						onSuccess(self);
					}
					break;
				default:
					break;
			}
		});
		function onError (msg,self) {
			if(self.nextAll().hasClass('validation')){
				self.nextAll('.validation').text(msg);
				return;
			}
			self.parent().append("<span class='validation'>"+msg+"</span>");
		}

		function onSuccess(self) {
			self.nextAll('.validation').remove();	
		}
	})