<?php
	require_once '../utils/template.ajax/js.css.php';
	#	�������� ������� �������
   		$cl_sel_pages = new mysql_select($tbl_im);
		$active_id = $cl_sel_pages -> select_table_id("WHERE im_id='{$_POST[im_id]}'");
?>
<script src="http://api-maps.yandex.ru/1.1/index.xml?key=AClnakwBAAAACI7GfgIABsUZ_ZGh4cxSuN2lRkclVs3B3PAAAAAAAAAAAAB6Tfj4eS4BXxpBcsMrwOAqQh3hmg==" type="text/javascript"></script>
<script type="text/javascript">
		// JavaScript Document
		// �������� ����������� ��� ������� window.onLoad
		function GetYMapsGeoPointer(value) {
		var geocoder = new YMaps.Geocoder(value, {results: 1});
		// �������� ����������� ��� ��������� ���������� ��������������
		YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {
			// ���� ������ ��� ������, �� ��������� ��� �� �����
			// � ���������� ����� �� ������� ������ ���������� �������
			if (this.length()) {
				geoResult = this.get(0);
				alert(this.get(0).getGeoPoint());
				document.write(this.get(0).getGeoPoint());
			} else return false; 
		});
		// ������� �������������� �������� ��������
		YMaps.Events.observe(geocoder, geocoder.Events.Fault, function (geocoder, error) {
			alert("��������� ������: " + error);
		})
}	
</script>
