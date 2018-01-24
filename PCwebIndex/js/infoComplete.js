
var unSelected="#bdbdbd";
var selected="#333";
$("document").ready(function () {
  $("select").css("color", unSelected);
  $("option").css("color", selected);
  $("#submit").click(function () {
    checkInfo();
  })
  $("#i_know").click(function () {
    window.location.href = "rzh.html";
  })
  $(".notification i").click(function () {
    $(".mask,.notification").hide();
  })
  bankShow();
  //省加载
  $("#proName").html("<option  disabled selected>请选择省</option>");
  $("#cityName").html("<option disabled selected>请选择市</option>");
  $("#rangName").html("<option disabled selected>请选择区</option>");
  $("#bankName").html("<option disabled selected>请选择所属银行</option>");
  $.ajax({
    url: window.global_config.proSel,
    type: "post",
    data: {},
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          proObj = data.jsonData;
          $.each(proObj, function (i, item) {
            $("#proName").append("<option value='" + item.areaCode + "'>" + item.areaName + "</option>")
          });
        }
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
  //市加载
  $("#proName").change(function () {
    var selItem = $(this).val();
    if (selItem == $(this).find('option:first').val()) {
      $(this).css("color", unSelected);
    } else {
      $(this).css("color", selected);
    }
    $("#cityName").html("<option disabled selected>请选择市</option>");
    $.ajax({
      url: window.global_config.citySel,
      type: "post",
      data: {
        pcode: $("#proName").val()
      },
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          if (data.code == 0) {
            cityObj = data.jsonData;
            $.each(cityObj, function (i, item) {
              $("#cityName").append("<option value='" + item.areaCode + "'>" + item.areaName + "</option>")
            });
          }
        } else {
          console.log(data.msg);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
  //区加载
  $("#cityName").change(function () {
    var selItem = $(this).val();
    if (selItem == $(this).find('option:first').val()) {
      $(this).css("color", unSelected);
    } else {
      $(this).css("color", selected);
    }
    $("#rangName").html("<option disabled selected>请选择区</option>");
    $.ajax({
      url: window.global_config.rangSel,
      type: "post",
      data: {
        pcode: $("#cityName").val()
      },
      dataType: "json",
      success: function success(data) {
        if (data.success) {
          if (data.code == 0) {
            proObj = data.jsonData;
            $.each(proObj, function (i, item) {
              $("#rangName").append("<option value='" + item.areaCode + "'>" + item.areaName + "</option>")
            });
          }
        } else {
          console.log(data.msg);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  })
//  区选择：
  $("#rangName").change(function () {
    var selItem = $(this).val();
    if (selItem == $(this).find('option:first').val()) {
      $(this).css("color", unSelected);
    } else {
      $(this).css("color", selected);
    }
  })

  $(".certBox").mouseenter(function () {
    var src=$(this).children("img").attr("src");
    console.log(src)
    if (src.length!=0){
      $(this).children(".imgLayer").show();
    }
  })
  $(".certBox").mouseleave(function () {
    var src=$(this).children("img").attr("src");
    console.log(src)
    if (src.length!=0){
      $(this).children(".imgLayer").hide();
    }
  })

//  选择银行
  $("#bankName").change(function () {
    var selItem = $(this).val();
    if (selItem == $(this).find('option:first').val()) {
      $(this).css("color", unSelected);
    } else {
      $(this).css("color", selected);
    }
  })
//  上传图片
  $(".certUpload").change(function () {
    var file = this.files[0];
    var objUrl = getObjectURL(this.files[0]);
    var fileSize = this.files[0].size;
    var size = fileSize / (1024 * 1024);
    var filepath = $(this).val();
    if (size > 2) {
      alert("上传的图片大小不能超过2M！");
      $(this).val("");
      return;
    }
    ;
    if (objUrl) {
      var that = $(this).siblings('img');
      that.attr("src","img/loading.gif")
      var formData = new FormData();
      formData.append('file', file);
      uploadImage(formData, that);
    }
    ;
  })
// 打开诚信通知
  $(".linkTxt").click(function () {
    $(".mask,.notification").show();
  })
})
//获取路径
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
//上传图片
function uploadImage(formData, that) {
  $.ajax({
    url: publicPathSP+"/image/upload",
    type: "post",
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      if (data.status == 0) {
        console.log(data)
        var url = data.result.url;
        setTimeout(function () {
          that.attr('src', url)
        },4000)
      } else {
        console.log(data.message);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

var isidPhotopositive = false;
var isidPhotonegative = false;
var isbusinessLicensePhoto = false;
function checkInfo() {
  var data = [];
  var val = $('#form').serializeArray();
  var obj = {
    name: "idPhotopositive",
    value: $("#idPhotopositive").attr('src')
  }
  var obj02 = {
    name: "idPhotonegative",
    value: $("#idPhotonegative").attr('src')
  }
  var obj03 = {
    name: "businessLicensePhoto",
    value: $("#businessLicensePhoto").attr('src')
  }
  val.push(obj, obj02, obj03);
  var totalList = 0;
  for (var i = 0; i < val.length; i++) {
    if (val[i].value == null || val[i].value == "") {
      var intName = val[i].name;
      if (intName == "idPhotopositive" || intName == "idPhotonegative" || intName == "businessLicensePhoto") {
        var self = $("#" + intName).parents(".certBox");
        onError('请选择图片', self);
        switch (intName) {
          case "idPhotopositive":
            isidPhotopositive = false;
            break;
          case "idPhotonegative":
            isidPhotonegative = false;
            break;
          case "businessLicensePhoto":
            isbusinessLicensePhoto = false;
            break;
          default:
            break;
        }
      } else {
        var self = $("[name='" + intName + "']")
        var tipName = self.data("name")
        onError("请输入" + tipName, self);
      }

    } else {
      var intName = val[i].name;
      var intValue = val[i].value;
      var self = $("[name='" + intName + "']");
      if (intName == "idPhotopositive" || intName == "idPhotonegative" || intName == "businessLicensePhoto") {
        var self = $("#" + intName).parents(".certBox");
        switch (intName) {
          case "idPhotopositive":
            isidPhotopositive = true;
            break;
          case "idPhotonegative":
            isidPhotonegative = true;
            break;
          case "businessLicensePhoto":
            isbusinessLicensePhoto = true;
            break;
          default:
            break;
        }
        totalList++;
        onSuccess(self);
      }
      else if (intName == "idCardNo") {
        if (isCertNo(intValue)){
          var self = $("[name='" + intName + "']")
          totalList++;
          onSuccess(self);
        }else {
          onError("身份证输入不合法", self);
        }
      }else if (intName=="socialInformationCode"){
        var self = $("[name='" + intName + "']")
        var l=intValue.length;
        console.log(l)
        if(l==18){
          totalList++;
          onSuccess(self);
        }else {
          onError("社会信用代码输入不合法", self);
        }
      }
      else {
        var self = $("[name='" + intName + "']")
        totalList++;
        onSuccess(self);
      }
    }
  }

  if ($(".address_se option:first-child").is(":selected")) {
    var self = $(".address_se");
    onError('请选择城市', self);
  } else {
    var self = $(".address_se");
    totalList++;
    onSuccess(self);
  }
  if ($("#bankName option:first-child").is(":selected")) {
    var self = $("#bankName");
    onError('请选择银行', self);
  }
  console.log(val);
  console.log(totalList)


  if (val.length == 18 && totalList == 19) {
    if (!$(".address_se option:first-child,#bankName option:first-child").is(":selected") && isbusinessLicensePhoto && isidPhotonegative && isidPhotopositive) {
      $("#submit").unbind("click");
      submitInfo(val);
    }
  }
}
//银行加载
function bankShow() {
  $.ajax({
    url: window.global_config.bankName,
    type: "get",
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          var bankObj = data.jsonData;
          $.each(bankObj, function (i, item) {
            $("#bankName").append("<option value='" + item.BANK_CODE + "'>" + item.BANK_NAME + "</option>")
          });
        }
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}


//验证身份证号是否正确
function isCertNo(card) {
  console.log(card);
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  } else {
    return true;
  }
}

function onError(msg, self) {
  if (self.nextAll().hasClass('prompt')) {
    self.nextAll('.prompt').text(msg);
    return;
  }
  self.nextAll('.prompt_sp').remove();
  self.parent().append("<span class='prompt'>" + msg + "</span>");
  return;
};
function onSuccess(self) {
  if (self.nextAll().hasClass('prompt_sp')) {
    return;
  }
  self.nextAll('.prompt').remove();
  self.parent().append("<span class='prompt_sp'></span>");
};

function submitInfo(val) {
  console.log(val)
  var data = {}
  for (var i in val) {
    var name = val[i].name;
    var value = val[i].value;
    data[name] = value;
  }
  $.ajax({
    url: window.global_config.Registinfo,
    type: "post",
    data: data,
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          $(".jion_alert").show();
          $(".mask").show();
          $(".jion_fail").hide();
          $(".cunzai").hide();
        }
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}