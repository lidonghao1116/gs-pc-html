$(document).ready(function(){
	$(".up").click(function(){
		
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".select_list:gt(2)").hide();
			$(".up span").text("展开");
		}
		else{
			$(this).addClass("active");
			$(".select_list:gt(2)").show();
			$(".up span").text("收起");
		}
		})
		
	
})



	
	
	