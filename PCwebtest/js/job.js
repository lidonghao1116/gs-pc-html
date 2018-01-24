$(document).ready(function(){
	$(".choose ul li").click(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
})