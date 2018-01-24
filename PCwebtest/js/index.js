$(document).ready(function(){
	
	var cutHeight=$(window).height()/4;
	var offset0=$("#pro_tt0").offset().top;
	//滚动页面时右侧菜单的变化
	var timeout; 
	$(window).scroll(function(){
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				/*if ($("body").scrollTop() > offset0) {
				  $(".left_menu").addClass("left_menu_sp");
				} else {
				  $(".left_menu").removeClass("left_menu_sp");
				};*/
      /*  var a=$("div.menu_cont").eq(2).offset().top;
        // console.log($(window).scrollTop());
        console.log(a);
        if($(window).scrollTop()>=a){
        	console.log("succ")
				}*/
				var p_length=$("div.menu_cont").length-1;
				console.log(p_length)
				for(i=p_length;i>=0;i--){
					var i_top=$("div.menu_cont").eq(i).offset().top-50;
					if($(window).scrollTop()>=i_top){
						$("div.left_menu p").eq(i).addClass("active")
												.siblings().removeClass("active");
												break; 
					}
				}
	   })
	}); 
	 //右边菜单点击滚动
	var $div_p =$("div.left_menu p");
	$div_p.click(function(){
		$(this).addClass("active")            
			   .siblings().removeClass("active");
		var index =  $div_p.index(this);  
		var offset_index=$(".menu_cont").eq(index).offset().top; 
			$('html, body').animate({
				scrollTop: offset_index
			}, 400,function(){
			/*	if ($("body").scrollTop() > offset0){
					 $(".left_menu").addClass("left_menu_sp");
				}
				else{
					$(".left_menu").removeClass("left_menu_sp");
				}*/
			});
	});
		
	//图片hover
	$(".pro_list").on("mouseenter mouseleave","li",function(e){
		if (e.type == "mouseenter") {
			$(this).find(".img_mask").show();
		} else {
			$(this).find(".img_mask").hide();
		}
   });
	
})
