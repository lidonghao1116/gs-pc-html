var publicPath = "http://" + window.location.host + "/fbeeWebConsole_web";
$(document).ready(function() {
//工种查询
    $.ajax({
            url: publicPath + "/api/custServer/getServiceType",
            type: "post",
            data: {},
            dataType: "json",
            async: false,
            success: function success(data) {
                if (data.success) {
                    if (data.code == 0) {
                        proObj = data.jsonData;
                        var html="<li class='active' data-sercode=''>不限</li>";
                        $.each(proObj, function(i, item) {
                            html += "<li data-sercode='"+item.code+"'>"+item.serviceType+"</li>";
                        });
                         $("#serviceType").html(html);
                    }
                } else {
                    console.log(data.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    //年龄
    $.ajax({
            url: publicPath + "/api/custServer/getAgeRange",
            type: "post",
            data: {},
            dataType: "json",
            async: false,
            success: function success(data) {
                if (data.success) {
                        proObj = data.jsonData;
                        var html="";
                        $.each(proObj, function(i, item) {
                            if(item.value=="不限"){
                                html += "<li class='active' data-sercode='"+item.id+"'>"+item.value+"</li>";
                            }else{
                            html += "<li data-sercode='"+item.id+"'>"+item.value+"</li>";
                            }
                        });
                         $("#age").html(html);
                } else {
                    console.log(data.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
//薪资
    $.ajax({
            url: publicPath + "/api/custServer/getServiceIncome",
            type: "post",
            data: {},
            dataType: "json",
            async: false,
            success: function success(data) {
                if (data.success) {
                    dataJD=data.jsonData;
                    var html="<li class='active' data-sercode=''>不限</li>";
                    $.each(dataJD,function(i,item){
                        html+="<li data-sercode='"+item.id+"'>"+item.value+"</li>";
                        var dataPrie= item.ceList;
                        var html0="";
                        $.each(dataPrie,function(j,item0){
                            html0+="<li data-sercode='"+item0.id+"'>"+item0.value+"</li>";
                        })
                        $(".tab_content ul").eq(i).html(html0);
                    });
                    $("#salaryType").html(html); 
                } else {
                    console.log(data.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    //省查询

    $.ajax({
        url: publicPath + "/system/api/common/getAreaData/c001",
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if (data.success) {
                if (data.code == 0) {
                    proObj = data.jsonData;
                    $.each(proObj, function(i, item) {
                        $("#area_sp").append("<li data-code='" + item.areaCode + "'>" + item.areaName + "</li>")
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


    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var obj = new GetRequest;

    var pageNumber = 1;
    var pageSize = 10,
    serviceType = "",
    privince = "",
    age="",
    salary="",
    salaryType="",
    city="";

    function pagination(records) {
        $("#pagination").pagination(records, {
            num_edge_entries: 1,
            num_display_entries: 4,
            current_page: pageNumber - 1,
            items_per_page: pageSize,
            prev_text: "上一页",
            next_text: "下一页",
            callback: page_index
        });
    };
    $(function() {
        $.ajax({
            url: publicPath + "/api/custServer/queryJob",
            type: "post",
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                showMore: obj.showMore
            },
            dataType: "json",
            async: false,
            success: function success(data) {
                if (data.success) {
                    if (data.code == 0) {
                        var dataJD = data.jsonData;
                        pagination(dataJD.records);
                        console.log(data.msg);
                    } else {
                        console.log(data.msg);
                    }
                } else {
                    console.log(data.msg);
                }
            }
        });
    })

    function page_index(page_index) {
        var pageNumber = page_index + 1;
        var age = $("#age li.active").attr("data-sercode");
        var salaryType =$("#salaryType li.active").attr("data-sercode");
        var salary="";
        if($(".tab_content ul li.active").length>0){
            salary=$(".tab_content ul li.active").attr("data-sercode");
        }
        var serviceType = $("#serviceType li.active").attr("data-sercode");
        var privince = $("#area_sp li.active").data("code");
        var city="";
        getTenantsJobsListInfo(pageNumber, pageSize, serviceType, age, salaryType, salary, city, privince, obj.showMore);
    };
    //getTenantsJobsListInfo(pageNumber,pageSize,serviceType,privince,obj.showMore);
    function getTenantsJobsListInfo(pageNumber, pageSize, serviceType, age, salaryType, salary, city,privince, showMore) {
        $.ajax({
            url: publicPath + "/api/custServer/queryJob",
            type: "post",
            async: false,
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                serviceType: serviceType,
                age:age,
                salaryType:salaryType,
                salary:salary,
                privince: privince,
                city:city,
                showMore: showMore
            },
            dataType: "json",
            success: function success(data) {
                if (data.success) {
                    if (data.code == 0) {
                        var dataJD = data.jsonData.rows;
                        if (data.jsonData.records == 0) {
                            $("#pagination").css("display", "none");
                        } else {
                            $("#pagination").css("display", "block");
                        }
                        if (dataJD != "" && dataJD != null) {
                            var html = "";
                            $.each(dataJD, function(i, item) {
                                // var age = "";
                                // var ageMin = item.age.split("-")[0];
                                // var ageMax = item.age.split("-")[1];
                                // if (ageMin == "") {
                                //     age = ageMax + "岁以下";
                                // } else if (ageMax == "") {
                                //     age = ageMin + "岁以上";
                                // } else {
                                //     age = item.age + "岁";
                                // }
                                // var salary = "";
                                // var salaryMin = item.salary.split("-")[0];
                                // var salaryMax = item.salary.split("-")[1];
                                // if (salaryMin == "") {
                                //     salary = salaryMax + "元以下";
                                // } else if (salaryMax == "") {
                                //     salary = salaryMin + "元以上";
                                // } else {
                                //     salary = item.salary + "元";
                                // }
                                var address = "";
                                if(item.area==""){
                                    if (item.city != "") {
                                    address = item.privince + "-" + item.city;
                                    } else {
                                        var address = item.privince;
                                    }
                                }else{
                                    address=item.privince + "-" + item.city+"-"+item.area;
                                }
                                
                                 var emsSign="";
                                if(item.emsSign=="01"){
                                    emsSign="<span>急</span>";
                                }
                                var salary = "";
                                if(item.salary != null){
                                   salary = RetainedDecimalPlacesNF(item.salary);
                                }
                                html += "<div class='job_need'>" +
                                    " <div class='job_top'>" +
                                    "<div class='top_left'>" +
                                    "<h2>" + item.positionName + emsSign +"</h2>" +
                                    "<ul>" +
                                    "<li>工资范围：<span class='salary'>" + salary+ item.salaryTypeValue + "</span></li>" +
                                    "<li>年龄要求：<span>" + item.age + "</span></li>" +
                                    "<li>服务区域：<span>" + address + "</span></li>" +
                                    "<li>发布机构：<span class='websiteName'><a href='http://" + window.location.host + "/" + item.domain + "/index.html" + "'>" + item.websiteName + "</a></span></li>" +
                                    "</ul>" +
                                    "</div>" +
                                    "<div class='top_right'>" +
                                    "<span class='phone_bg'>"+item.loginName+"</span>" +
                                    "<div class='phone_num' style='display: none;'>" +
                                    "<span>联系电话：</span>" +
                                    "<p>" + item.telephone + "</p>" +
                                    "<img src='img/sanjiao.png'>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "<div class='job_bottom'>" +
                                    "<p class='demand_tt'>岗位要求：</p>" +
                                    "<div class='demand_box'><div class='demand'>" + item.demand + "</div></div>" +
                                    "</div>" +
                                    "</div>";
                            });
                            $(".jobList").html(html);
                            console.log(data.msg);
                        } else {
                            $(".jobList").html("<div class='no_found'><p>没有找到你想要的职位~</p></div>");
                        }

                    } else {
                        console.log(data.msg);
                    }
                } else {
                    console.log(data.msg);
                }
            }
        });
    };
    $(".choose_list").on("click", "li", function() {
         if($(this).parent().hasClass("choose_ul")){
            if($(this).parents().hasClass("tab_content")){
				$(".tab_content .choose_ul li").removeClass("active");
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			 }else{
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
			 }
         }else if($(this).parent().hasClass("choose_ul_sp")){
            var $div_li = $(".choose_ul_sp li");
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            var index = $div_li.index(this) - 1;
            if (index == -1) {
                $(".tab_content ul").hide();
                $(".tab_content .choose_ul li").removeClass("active");
            } else {
                $(".tab_content ul").eq(index).show().siblings("ul").hide();
                $(".tab_content ul").eq(index).siblings("ul").children("li").removeClass("active");
            }
         }
        
        var age = $("#age li.active").attr("data-sercode");
        var salaryType =$("#salaryType li.active").attr("data-sercode");
        var salary="";
        if($(".tab_content ul li.active").length>0){
            salary=$(".tab_content ul li.active").attr("data-sercode");
        }
        var serviceType = $("#serviceType li.active").attr("data-sercode");
        var privince = $("#area_sp li.active").data("code");
        var city="";
        $.ajax({
            url: publicPath + "/api/custServer/queryJob",
            type: "post",
            data: {
                showMore: obj.showMore,
                pageNumber: pageNumber,
                pageSize: pageSize,
                serviceType: serviceType,
                age:age,
                salaryType:salaryType,
                salary:salary,
                privince: privince,
                city:city
            },
            dataType: "json",
            async: false,
            success: function success(data) {
                if (data.success) {
                    if (data.code == 0) {
                        var dataJD = data.jsonData;
                        pagination(dataJD.records);
                        console.log(data.msg);
                    } else {
                        console.log(data.msg);
                    }
                } else {
                    console.log(data.msg);
                }
            }
        });
    })

    // $(".choose_ul_sp").on("click", "li", function() {
    //     var $div_li = $(".choose_ul_sp li");
    //     $(this).addClass("active");
    //     $(this).siblings().removeClass("active");
    //     var index = $div_li.index(this) - 1;
    //     if (index == -1) {
    //         $(".tab_content ul").hide();
    //         $(".tab_content .choose_ul li").removeClass("active");
    //     } else {
    //         $(".tab_content ul").eq(index).show().siblings("ul").hide();
    //         $(".tab_content ul").eq(index).siblings("ul").children("li").removeClass("active");
    //     }

    // })
    $(".more").click(function() {
        if ($(this).hasClass("more_sp")) {
            $(this).removeClass("more_sp").text("更多");
            $(".choose_list_l").css("height", "46px");
        } else {
            $(this).addClass("more_sp").text("收起");
            $(".choose_list_l").css("height", "auto");

        }

    })

    $(".jobList").on("mouseenter mouseleave", ".phone_bg", function(e) {
        if (e.type == "mouseenter") {
            $(this).addClass("phone_hover");
            $(this).siblings(".phone_num").show();
        } else {
            $(this).removeClass("phone_hover");
            $(this).siblings(".phone_num").hide();
        }
    });
    // $(".choose").on("click",".more",function(){
    // 	if($(this).hasClass("more_sp")){
    // 		$(this).removeClass("more_sp").text("更多");
    // 		$(".choose").addClass("choose_sp");
    // 	}else {
    // 		$(".choose").removeClass("choose_sp");
    // 		$(this).addClass("more_sp").text("收起");
    // 	}
    // });
})