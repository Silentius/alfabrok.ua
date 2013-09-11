<?php
  error_reporting(E_ALL & ~E_NOTICE);

  // Перехватываем исключение, если осуществляется
  // попытка обратиться к несуществующему элементу
  // управления

  // Включаем заголовок страницы
  require_once("../utils/top.php");

  echo "<p class=help>Произошла исключительная 
        ситуация (ExceptionMember) - попытка 
        обращения к несуществующему члену класса.
        {$exc->getMessage()}.</p>";
  echo "<p class=help>Ошибка в файле {$exc->getFile()}
        в строке {$exc->getLine()}.</p>";

  // Включаем завершение страницы
  require_once("../utils/bottom.php");
  exit();
?>