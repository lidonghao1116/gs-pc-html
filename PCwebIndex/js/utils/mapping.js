
var publicPath = "http://" + window.location.host + "/fbeeWebConsole_web";
var  publicPathSP = "";
var local = window.location.host;
	if(local.indexOf("139.224.49.192")!=-1||local.indexOf("ysc-home.jiacer.com")!=-1){
		publicPathSP = "http://test.jiacersxy.com:8000";
	}else if(local.indexOf("home.jiacer.com")!=-1){
		publicPathSP = "http://common.jiacedu.com";
	}
window.global_config = {
  getCaptcha: publicPath + "/api/custServer/getCaptcha",
  getSms: publicPath + "/api/custServer/getMsgCaptcha",
  proSel: publicPath + "/ttjz/api/common/getAreaData/c001",
  citySel: publicPath + "/ttjz/api/common/getAreaData/c002",
  rangSel: publicPath + "/ttjz/api/common/getAreaData/c003",
  Registinfo: publicPath + "/api/custServer/tenantsRegistinfo",
  bankName: publicPath + "/api/custServer/bankCode",
}