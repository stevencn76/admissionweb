<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/admissionweb/tags" prefix="at" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><at:param name="school.name" /> - 参数管理</title>
<link rel="stylesheet" type="text/css" href="../plugins/easyui/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/easyui/themes/icon.css">
<link rel="stylesheet" type="text/css" href="../css/admin.css">
<script type="text/javascript" src="../plugins/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="../plugins/json2.js"></script>
<script type="text/javascript" src="../plugins/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../plugins/easyui/datagrid-detailview.js"></script>
<script type="text/javascript" src="../plugins/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="../js/global.js"></script>
<script type="text/javascript" src="../plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="../plugins/ckeditor/lang/zh-cn.js"></script>
<script type="text/javascript" src="../plugins/ckeditor/adapters/jquery.js"></script>
<script type="text/javascript" src="../js/pages/admin/paramlist.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',border:false">
<table id="paramTable" style="width:990px;height:480px">
</table>
</div>
<div id="paramdlg">
	<input id="paramid" type="hidden" /><input id="actiontype" type="hidden" />
	<table>
		<tr>
			<th>名字</th>
			<td><input id="paramname" class="easyui-validatebox" type="text" style="width: 640px;"
			data-options="required:true"></td>
		</tr>
		<tr>
			<th>描述</th>
			<td><input id="paramdesc" class="easyui-validatebox" type="text" style="width: 640px;"
			data-options="required:false"></td>
		</tr>
		<tr>
			<th>内容</th>
			<td><textarea id="paramvalue" rows="20" cols="30" style="width: 640px; height: 280px;"></textarea></td>
		</tr>
	</table>
</div>
</body>
</html>