<?php
#подключение к БД
require_once 'config/config.php';
#подключение классов
require_once DOC_ROOT . '/config/class.config.php';
#обработчик языка
require_once DOC_ROOT . '/application/includes/language/set.cookie.php';
require_once DOC_ROOT . '/application/includes/module/template.module.php';
require_once DOC_ROOT . '/application/includes/immovables/setting.im.print.inc';
#очистка COOKIE - выборки недвижимости	
$ImSiteForm = new ImSiteForm ( '', 'ImFormSearchArray', 'SearchImCode' );
$cl_cache->page_name_end = $_COOKIE ['user_id'];
$ImSiteForm->Clean ();
#кэширование страницы
$cl_cache = new CacheSite ( );
#выборка с БД
$cl_cache->checking_inclusion ();
#проверка на существования кешированной страницы	
$cl_cache->checking_existence ();
//!!!! 	
$_SERVER ['PHP_SELF'] = '/index.php';
$adress_template = 'application/module/index/template.index.YMap.php';
#объявление класса pages, ядра системы !!фишка!! 	
$pages = new pages ( $_SERVER ['PHP_SELF'], $_GET, "pages", "WHERE hide = 'show' AND lang_id = " . $_COOKIE['lang_id'] . "", "ORDER BY pos" );
#селест таблицы, формирование сайта
$pages->select_table ();
#формирование меню сайта 	
list ( $ret_menu_index, $ret_menu_link, $ret_menu_footer, $ret_submenu_index ) = $DateMenuSite = $pages->Return_Menu_Site ();
#переменные заголовков страницы					
$title_web = $pages->active_page_item ( 'title_web' );
$keywords_web = $pages->active_page_item ( 'keywords_web' );
$description_web = $pages->active_page_item ( 'description_web' );
#переменные текстовки страницы	
$title = $pages->active_page_item ( 'title', 'show' );
$description = $pages->active_page_item ( 'description', 'show' );
$summary = $pages->active_page_item ( 'summary', 'show' );
#объявляем класс словаря
$dictionaries = new dictionaries ( );
#формируем массив имени словарей
$dct_list = $dictionaries->buid_dictionaries_list ( $tbl_list_dictionaries );
#формируем массив значений словарей
$dct = $dictionaries->buid_dictionaries ( $tbl_dictionaries, "WHERE lang_id = {$_COOKIE['lang_id']} ORDER BY dict_name" );
#класс модулей сайта		
$cl_Module = new ModuleSite ( $ModuleTemplate );
#класс проверяет параметры для формирования стандарта для страницы
if ($pages->build_default_page ( $ret_submenu_index ))
	$PageInfoReturn = $cl_Module->For_HTML ( $ModuleTemplate ['template_table_standart_center_page'], $pages->active_page );
#подключение HTML шапки сайта
require_once ("application/html/header.index.php");
require_once ("application/includes/menu/ImTypeCatIndex.inc");
echo $PageInfoReturn;
if ($adress_template)
	require_once ("$adress_template");
include ("application/html/footer.php");
#	кэширование страницы создания кешированной страницы
$cl_cache->creation_page ();