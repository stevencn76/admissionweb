$(function() {
	$('#barcode').keydown(function() {
		if (event.keyCode == 13) {
			 queryBarcode(); 
			 return false;
		}
	});
	
	$('#barcode').on('click', function(){
	    $(this).select();
	});
	
	$('#checkin').click(function() {
		$('#barcode').focus();
	});
	
	$('#submitbtn').click(function() {
		$('#barcode').focus();
		queryBarcode();
	});
	
	focusBarcode();
});

function focusBarcode() {
	$('#barcode').focus();
	$('#barcode').click();
}

function queryBarcode() {
	var checkin = $("#checkin").is(":checked");
	var barcode = $.trim($('#barcode').val());
	if(!barcode || barcode == "") {
		focusBarcode();
		return;
	}
	
	query({
		'barcode': barcode,
		'checkin': checkin
	});
}

function query(params) {
	$.ajax({
		url: '../rest/application/findbc',
		type: 'GET',
		timeout: gAjaxTimeout,//超时时间设定
		data: (params),//参数设置
		error: function(xhr, textStatus, thrownError){
			if(xhr.readyState != 0 && xhr.readyState != 1) {
				showErrorTip("条码查询失败， 错误号:  " + xhr.status + ", 错误信息: " + textStatus);
			}
			else {
				showErrorTip("条码查询失败，错误信息:  " + textStatus);
			}
			focusBarcode();
		},
		success: function(response, textStatus, xhr) {
			if(xhr.status == 200) {
				if(response.result == "ok") {
					$('#t_number').html(response.data.appData.id);
					$('#t_barcode').html(response.data.appData.barcode);
					$('#t_name').html(response.data.appData.name);
					$('#t_gender').html(response.data.appData.gender);
					$('#t_birthday').html(response.data.appData.birthdayStr);
					$('#t_idnumber').html(response.data.appData.pidNumber);
					$('#t_nation').html(response.data.appData.nation);
					$('#t_checkintime').html(response.data.appData.checkinTimeStr);
					$('#t_recheckin').html(response.data.appData.recheckinStr);
					showTip("");
					
					if(params.checkin) {
						if(response.data.recheckin) {
							if(window.confirm("该条码已签到，是否登记为重复签到?")) {
								recheckin(response.data.appData.id);
							} else {
								showTip("签到成功, 报名号:" + response.data.appData.id);
							}
						} else {
							showTip("签到成功, 报名号:" + response.data.appData.id);
						}
					} else {
						showTip("报名表存在, 报名号:" + response.data.appData.id);
					}
				}
				else {
					showErrorTip(response.result);
					$('#t_number').html("");
					$('#t_barcode').html("");
					$('#t_name').html("");
					$('#t_gender').html("");
					$('#t_birthday').html("");
					$('#t_idnumber').html("");
					$('#t_nation').html("");
					$('#t_checkintime').html("");
					$('#t_recheckin').html("");
				}
			} else {
				showErrorTip("条码查询失败，错误号: " + xhr.status);
			}
			
			focusBarcode();
		}
	});
}

function recheckin(appId) {
	$.ajax({
		url: '../rest/application/recheckin/' + appId,
		type: 'GET',
		timeout: gAjaxTimeout,//超时时间设定
		data: ({
		}),//参数设置
		error: function(xhr, textStatus, thrownError){
			if(xhr.readyState != 0 && xhr.readyState != 1) {
				showErrorTip("登记重复签到失败， 错误号:  " + xhr.status + ", 错误信息: " + textStatus);
			}
			else {
				showErrorTip("登记重复签到失败，错误信息:  " + textStatus);
			}
			focusBarcode();
		},
		success: function(response, textStatus, xhr) {
			if(xhr.status == 200) {
				if(response.result == "ok") {
					$('#t_recheckin').html(response.data.recheckinStr);
					showTip("登记重复签到成功");
				}
				else {
					showErrorTip(response.result);
				}
			} else {
				showErrorTip("登记重复签到失败，错误号: " + xhr.status);
			}
			
			focusBarcode();
		}
	});
}

function showTip(tipMsg) {
	$('#errortip').css("color", "black");
	$('#errortip').html(tipMsg);
}

function showErrorTip(tipMsg) {
	$('#errortip').css("color", "red");
	$('#errortip').html(tipMsg);
}
