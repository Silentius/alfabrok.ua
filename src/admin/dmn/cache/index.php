<?php
  error_reporting(E_ALL & ~E_NOTICE); // Устанавливаем соединение с базой данных
  require_once("../../config/config.php");
  // Подключаем SoftTime FrameWork
require_once DOC_ROOT . '/config/class.config.php';

  // Подключаем блок авторизации
  require_once("../utils/security_mod.php");
 
  $title = 'Управление кэшированием сайта';
  $pageinfo = '<p class=help>Здесь можно включить/отключить кэширование или удалить кэшированные страници.</p>';
 
 
  // Включаем заголовок страницы
  require_once("../utils/top.php");

  try
  {
	
	?>
<!-- AJAX-ответ от сервера заменит этот текст. -->
	<div id="output"></div>  
   
<form  id="myForm" action="" method="post"> 
      <div class="eventForm">
     	<a href="#" class="ui-state-default ui-corner-all bottom-padding" title="редактировать настройки" id="submitEdit"><span class="ui-icon ui-icon-pencil"></span>редактировать настройки</a>
		<a href="#" class="ui-state-default ui-corner-all bottom-padding" title="удалить прокэшированные страницы" id="submitDell"><span class="ui-icon ui-icon-trash"></span>удалить прокэшированные страницы</a>
	 </div>

    <!--	Подгрузка списка позиций таблицы с помощью аякс запроса-->
        <div id="DivRequest">
        </div>  
</form>


<script type="text/javascript">
$(document).ready(function(){
	//	подгрузка аяксом списка страниц,(таблица)	
		$("#loading").ajaxStart(function(){
  		$(this).show();});
		$('#DivRequest').load('template.load.php?print=list_page');
		$("#loading").ajaxComplete(function(){
  		$(this).hide();});
	//	подгрузка дополнительных пунктов подменю в гланое меню	 
		 //$("#pages").append('<a href="pages">pages</a><a href="pages">pages2</a>');
	// ---- Форма -----
	//	опции для добавления нового пункта
		  var optionsAdd = { 
			target: "#output",
			url:'template.add.item.php'
		  };
	//  опции для редактирования пункта
		  var optionsEdit = { 
			target: "#output",
			beforeSubmit: valideEdit,
			url:'template.edit.item.php'
		  };
	//  опции для удаления пункта
		  var optionsDell = { 
			target: "#output",
			url:'template.dell.item.php'
			//url:'template.event.hadler.php'
		  };
		  
	//  запуск аякса для добавления   
		$('#submitAdd').bind("click", function(){
		  $('#myForm').ajaxSubmit(optionsAdd); 
		return false;
		});
	//  запуск аякса для редактирования
		$('#submitEdit').bind("click", function(){
		  $('#myForm').ajaxSubmit(optionsEdit); 
		return false;
		});
	//  запуск аякса для удаления
		$('#submitDell').bind("click", function(){
		  $('#myForm').ajaxSubmit(optionsDell); 
		return false;
	  });
			
	// ---- Форма -----
});

//	функция проверки выбран ли пункт для редактирования
function valideEdit(formData, jqForm, options)
{
	var queryString = $.param(formData); 
	if(queryString == '')
	{
		$.prompt('Не выбран пункт для редактирования!');
		return false;
	}
	else
		return true; 
}
//	функция проверки выбран ли пункт для удаления
function valideDell(formData, jqForm, options)
{
	var queryString = $.param(formData); 
	if(queryString == '')
	{
		$.prompt('Не выбран пункт для удаления!');
		return false;
	}
	else
	{
		$.prompt('Вы действительно хотите удалить позицию?',{ callback: mycallbackform, buttons: { Ok: 'dell', Отмена: false  } });
		return false;
	}
}
//функция отменяет либо производит удаление позиции
function mycallbackform(v,m,f){
	if(v == 'dell')
	{
		//  опции для удаления пункта
		  var optionsDellOk = { 
			target: "#output",
			//success: showResponse,
			url:'template.dell.item.php'
		  };
		  
		$('#myForm').ajaxSubmit(optionsDellOk); 
		//	подгрузка аяксом списка страниц,(таблица)
		$('#DivRequest').load('template.load.php?print=list_page');
		return true;
	}
	else
		return false;
}
</script>
<?
  }
  catch(ExceptionMySQL $exc)
  {
    require("../utils/exception_mysql.php"); 
  }

  // Включаем завершение страницы
  require_once("../utils/bottom.php");
?>