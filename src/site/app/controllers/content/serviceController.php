<?php
class serviceController extends aControllerClass {
	public function index($param) {
		$model = new serviceModelClass ( new serviceProviderClass ( "service_catalog" ) );
		$model->getList ( array(
				"hide" => "show") );
		return $this->View ( array(
				"Data" => $model->list) );
	}
	public function details($param) {
		$model = new serviceModelClass ( new serviceProviderClass ( "service_catalog" ) );
		$model->getItem ( $param["sc_id"] );
		if ($model->item) {
			$this->appDataObj->setTitle ( $model->item["title"] );
			$this->appDataObj->setKeyw ( $model->item["keywords_web"] );
			$this->appDataObj->setDesc ( $model->item["description_web"] );
			$this->appDataObj->setStringNavigation ( $model->item["title"] );
			$this->appDataObj->setPAction ( "index" );
		}
		return $this->View ( array(
				"Data" => $model->item) );
	}
	public function site($param) {
		$ClFlatPropQuery = new mysql_select ();
		$ClFlatPropQuery->select_table_query ( "SELECT * FROM im_properties_list pl 
										LEFT JOIN dictionaries d ON pl.ld_id = d.ld_id  AND d.lang_id={$_COOKIE[lang_id]} AND d.dict_have_image=1
										WHERE pl.catalog_id='4c3ec3ec5e9b5' AND pl.lang_id={$_COOKIE[lang_id]}" );
		$ClComPropQuery = new mysql_select ();
		$ClComPropQuery->select_table_query ( "SELECT * FROM im_properties_list pl 
										LEFT JOIN dictionaries d ON pl.ld_id = d.ld_id AND d.lang_id={$_COOKIE[lang_id]} AND d.dict_have_image=1
										WHERE pl.catalog_id='4c3ec3ec5e9b7' AND pl.lang_id={$_COOKIE[lang_id]} " );
		$ClHomePropQuery = new mysql_select ();
		$ClHomePropQuery->select_table_query ( "SELECT * FROM im_properties_list pl 
										LEFT JOIN dictionaries d ON pl.ld_id = d.ld_id AND d.lang_id={$_COOKIE[lang_id]} AND d.dict_have_image=1
										WHERE pl.catalog_id='4c3ec51d537c0' AND pl.lang_id={$_COOKIE[lang_id]}" );
		$ClBilPropQuery = new mysql_select ();
		$ClBilPropQuery->select_table_query ( "SELECT * FROM im_properties_list pl 
										LEFT JOIN dictionaries d ON pl.ld_id = d.ld_id AND d.lang_id={$_COOKIE[lang_id]} AND d.dict_have_image=1
										WHERE pl.catalog_id='4c3ec51d537c2' AND pl.lang_id={$_COOKIE[lang_id]} " );
		$ClLandPropQuery = new mysql_select ();
		$ClLandPropQuery->select_table_query ( "SELECT * FROM im_properties_list pl 
										LEFT JOIN dictionaries d ON pl.ld_id = d.ld_id  AND d.lang_id={$_COOKIE[lang_id]} AND d.dict_have_image=1
										WHERE pl.catalog_id='4c3ec51d537c3' AND pl.lang_id={$_COOKIE[lang_id]}" );
		
		$modelContent = new structureModelClass ( new structureProviderClass ( "pages" ) );
		$modelContent->getItemId ( "1ssite" );
		$model["page"] = $modelContent->item;
		
		array_splice ( $ClFlatPropQuery->table, 3, 45 ); // Удаляем лишнее метро...
		$ss_list_icon .= PrintListPropToSS ( $ClFlatPropQuery->table );
		$ss_list_icon .= PrintListPropToSS ( $ClComPropQuery->table );
		$ss_list_icon .= PrintListPropToSS ( $ClHomePropQuery->table );
		$ss_list_icon .= PrintListPropToSS ( $ClBilPropQuery->table );
		$ss_list_icon .= PrintListPropToSS ( $ClLandPropQuery->table );
		$model["ss_list_icon"] = $ss_list_icon;
		return $this->View ( array(
				"Model" => $model) );
	}
	/*	sitemap	*/
	public function sitemap($param) {
		$this->isPartial = true;
		if ($param["action"] == "index") {
			$model = new serviceModelClass ( new serviceProviderClass ( "service_catalog" ) );
			$model->getList ( array(
					"hide" => "show") );
			return $this->partialView ( array(
					"Model" => $model,
					"level" => $param["level"]), "service/sitemap/index" );
		}
	}
	public function sitemapxml($param) {
		$this->isPartial = true;
		if ($param["action"] == "index") {
			$model = new serviceModelClass ( new serviceProviderClass ( "service_catalog" ) );
			$model->getList ( array(
					"hide" => "show") );
			$array = null;
			if ($model->list) {
				foreach ( $model->list as $key => $value ) {
					$array[] = array(
							"loc" => sprintf ( "http://%s/ru/service/details/%s", $_SERVER['HTTP_HOST'], $value["sc_id"] ),
							"lastmod" => date ( "Y-m-d H:i:s" ),
							"changefreq" => "weekly",
							"priority" => $param["priority"]);
				}
			}
			return $array;
		}
	}
}
function PrintListPropToSS($Data) {
	global $issetPropName;
	$issetPropId = array();
	for($i = 0; $i < count ( $Data ); $i ++) {
		$issetPropName[$Data[$i]['catalog_id']][translit ( $Data[$i]['im_prop_name'] )] = translit ( $Data[$i]['im_prop_name'] );
		if ((translit ( $Data[$i]['im_prop_name'] ) != 'Vxod')) {
			if (IsPropNameId ( $Data[$i]['catalog_id'], translit ( $Data[$i]['im_prop_name'] ) )) {
				if (! empty ( $Data[$i]['dict_have_image'] )) {
					$return .= "<table class=\"TablaPropListSS\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"TablePropAdvasedTdImg\"><img title=\"{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}\" alt=\"{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}\" src=\"" . getLangString ( "imageDomain" ) . "/files/images/dict/{$Data[$i]['dict_id']}.png\"></td><td class=\"TablePropAdvasedTdTextSS\">{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}</td></tr></table>";
				} elseif (! empty ( $Data[$i]['prop_have_image'] ) && (! in_array ( $Data[$i]['im_prop_id'], $issetPropId ))) {
					$issetPropId[$Data[$i]['im_prop_id']] = $Data[$i]['im_prop_id'];
					$return .= "<table class=\"TablaPropListSS\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"TablePropAdvasedTdImg\"><img title=\"{$Data[$i]['im_prop_name']}\" alt=\"{$Data[$i]['im_prop_name']}\" src=\"" . getLangString ( "imageDomain" ) . "/files/images/prop/{$Data[$i]['im_prop_id']}.png\"></td><td class=\"TablePropAdvasedTdTextSS\">{$Data[$i]['im_prop_name']}</td></tr></table>";
				}
			}
		}
		if ((translit ( $Data[$i]['im_prop_name'] ) == 'Vxod') and ($Data[$i]['catalog_id'] == '4c3ec3ec5e9b7')) {
			if (! empty ( $Data[$i]['dict_have_image'] )) {
				$return .= "<table class=\"TablaPropListSS\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"TablePropAdvasedTdImg\"><img title=\"{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}\" alt=\"{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}\" src=\"" . getLangString ( "imageDomain" ) . "/files/images/dict/{$Data[$i]['dict_id']}.png\"></td><td class=\"TablePropAdvasedTdTextSS\">{$Data[$i]['im_prop_name']} - {$Data[$i]['dict_name']}</td></tr></table>";
			} elseif (! empty ( $Data[$i]['prop_have_image'] ) && (! in_array ( $Data[$i]['im_prop_id'], $issetPropId ))) {
				$issetPropId[$Data[$i]['im_prop_id']] = $Data[$i]['im_prop_id'];
				$return .= "<table class=\"TablaPropListSS\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"TablePropAdvasedTdImg\"><img title=\"{$Data[$i]['im_prop_name']}\" alt=\"{$Data[$i]['im_prop_name']}\" src=\"" . getLangString ( "imageDomain" ) . "/files/images/prop/{$Data[$i]['im_prop_id']}.png\"></td><td class=\"TablePropAdvasedTdTextSS\">{$Data[$i]['im_prop_name']}</td></tr></table>";
			}
		}
	}
	return $return;
}
function IsPropNameId($activeCat, $propName) {
	global $issetPropName;
	foreach ( $issetPropName as $key => $value ) {
		if ($key != $activeCat) {
			if (! empty ( $value )) {
				if (! in_array ( $propName, $issetPropName[$key] ))
					return true;
				else
					return FALSE;
			} else
				return TRUE;
		} else {
			return TRUE;
		}
	}
}