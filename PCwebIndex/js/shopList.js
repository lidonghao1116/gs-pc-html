var publicPath="http://"+window.location.host+"/fbeeWebConsole_web";
$(document).ready(function(){
	// 地区
	$(".sel").click(function(){
		$(this).siblings().show();
		$(this).parent(".sel_box").addClass("city_active");
		$(this).parent(".sel_box").siblings(".sel_box").children(".sel_con").hide();
		$(this).parent(".sel_box").siblings(".sel_box").removeClass("city_active");
	});
	$(".sel_con ul li").click(function(){
		if($(this).parents(".sel_con").hasClass("hot_city")){
		  $(".area_in").text("所有区域");
		};
		$(this).parents(".sel_con").hide();
		var text = $(this).text();
		var privince = $(this).attr("privince-code");
		//发送ajax
		
		var privinceName = "";
		if(privince==undefined){
			privince = "2";//上海
			privinceName = "上海";
		}else{
			privinceName = text;
		}
		var areaName = "";
		var area = $(this).attr("area-code");
		if(area==undefined){
			area="";
		}else{
			areaName = text;
		}
//		alert("privince"+privince);
//		alert("area"+area);
		queryNearbyCompany(1,12,"01",privince,area)
		$(this).parents(".sel_box").children(".sel").text(text);
		$(this).parents(".sel_box").children(".sel").attr("data-areacode",area);
		$(this).parents(".sel_box").removeClass("city_active");
	 });
	$(document).click(function(){
		$(".sel_con").hide();
		$(".sel_box").removeClass("city_active");
	});
	$(".sel_box,.sel_con").click(function(event){
		event.stopPropagation();
	});
	$(".inquire_bt").click(function(){
		var privince = "2";//上海
		var area =$("#area").attr("data-areacode");
		queryNearbyCompany(1,12,"01",privince,area)
	})
	function GetRequest(){
		   var url = location.search; //获取url中"?"符后的字串   
		   url = decodeURI(url);
		   var theRequest = new Object();   
		   if (url.indexOf("?") != -1) {   
		      var str = url.substr(1);   
		      strs = str.split("&");   
		      for(var i = 0; i < strs.length; i ++) {   
		         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
		      }   
		   }   
		   return theRequest;   
	}
	var obj = new GetRequest;
//	alert(obj.privince);
//	alert(obj.privinceName);
//	alert(obj.area);
//	alert(obj.areaName);
	
	$("#privince").html(obj.privinceName);
	if(obj.areaName!=""){
		$("#area").html(obj.areaName);
	}
	var pageNumber = 1;
	var pageSize = 12;
	function pagination(records){
		$("#pagination").pagination(records, {
		    num_edge_entries: 1,
		    num_display_entries: 4,
		    current_page:pageNumber-1,
		    items_per_page:pageSize,
		    prev_text:"上一页",
		    next_text:"下一页",
		    callback: page_index
		});
	};
	
	
	$(function(){
		if(obj.more=="01"){
			$.ajax({
				url:publicPath+"/api/custServer/queryNearbyCompany",
				type:"post",
				data: {
					pageNumber:pageNumber,
					pageSize:pageSize,
					more:"01",
					privince:"2",
					area:""
				},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							var dataJD = data.jsonData;
							pagination(dataJD.records);
							console.log(data.msg);
						}
					}else{
						console.log(data.msg);
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}else{
			$.ajax({
				url:publicPath+"/api/custServer/queryNearbyCompany",
				type:"post",
				data: {
					more:"01",
					privince:obj.privince,
					area:obj.area
				},
				dataType: "json",
				success: function success(data) {
					if(data.success) {
						if(data.code==0){
							var dataJD = data.jsonData;
							pagination(dataJD.records);
							console.log(data.msg);
						}
					}else{
						console.log(data.msg);
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	})
	
	function page_index(page_index){
		var pageNumber = page_index+1;
		queryNearbyCompany(pageNumber,pageSize,obj.more,obj.privince,obj.area);
	};
	function queryNearbyCompany(pageNumber,pageSize,showMore,privince,area){
		
		$.ajax({
			url:publicPath+"/api/custServer/queryNearbyCompany",
			type:"post",
			data: {
				pageNumber:pageNumber,
				pageSize:pageSize,
				more:showMore,
				privince:privince,
				city:area
			},
			dataType: "json",
			success: function success(data) {
				if(data.success) {
					if(data.code==0){
						var dataJD = data.jsonData;
						if(dataJD.records==0){
							var nofund="<div class='no_found'>"+
											"<h1>抱歉！</h1>"+
											"<p>您搜索的区域还没有家政公司入驻/未查找到该区域的家政公司</p>"+
										"</div>";
							 $(".tab_list ul").html(nofund);
							 return ;
						}
						proObj=data.jsonData;
						console.info(proObj);
						var html = '';
						//判断是否是数组
						if(proObj instanceof Array == false){
							var result = "";
							for(var i=0;i<proObj.rows.length;i++){
								var array = proObj.rows[i].serviceCode.split(",");
								var websiteUrl = proObj.rows[i].websiteUrl;
								var websiteName = proObj.rows[i].websiteName;
								var privince = proObj.rows[i].privince;
								var city = proObj.rows[i].area;
								var domain=proObj.rows[i].domain;
								for(var j=0;j<array.length;j++){
									result+="<span>"+array[j]+"</span>"
								}
								html+="<li>"+
										"<a href='http://"+window.location.host+"/"+domain+"/index.html"+"'>"+
											"<div class='company_info'>"+
												"<div class='com_top'>"+
													"<img src='img/mendianlogo.png'/>"+
													"<div class='top_right'>"+
														"<h2>"+websiteName+"</h2>"+
														"<p>"+privince+"-"+city+"</p>"+
														"</div>"+
														"</div>"+
													"<div class='type'>"+
														"<p>"+
														result
														"</p>"+
													"</div>"+
											"</div>"+
										"</a>"+
									 "</li>";
								result = "";
							}
							$(".tab_list ul").html(html);
							return ;
						}
						$.each(proObj, function(i,item) {
							var serviceCode = item.serviceCode;
							var array = serviceCode.split(",");
							var result = "";
							for(var i=0;i<array.length;i++){
								result+="<span>"+array[i]+"</span>"
							}
							html+="<li>"+
										"<a href='http://"+window.location.host+"/"+item.domain+"/index.html"+"'>"+
										"<div class='company_info'>"+
											"<div class='com_top'>"+
												"<img src='img/mendianlogo.png'/>"+
												"<div class='top_right'>"+
													"<h2>"+item.websiteName+"</h2>"+
													"<p>"+item.privince+"-"+item.area+"</p>"+
												"</div>"+
											"</div>"+
											"<div class='type'>"+
												"<p>"+
												result
												"</p>"+
											"</div>"+
										"</div>"+
									"</a>"+
								"</li>";
						});
						 $(".tab_list ul").html(html);
					}
				} else {
					console.log(data.msg);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
};
	
})