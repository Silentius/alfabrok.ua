$(document).ready(function(){$(".regionalBlock .reginalTree").hover(function(){},function(){$(this).hide()});$(".form-span-exchange").html("("+$("#exchange_select_id option:selected").val()+")");$("#exchange_select_id").change(function(){$(".form-span-exchange").html("("+$("#exchange_select_id option:selected").val()+")")});$(".regionalTextInput").click(function(){$(".reginalTree").toggle()});$(".rlist").each(function(){$(this).hasClass("rListItem-0")});$(".rlist .plus").click(function(){var a=$(this).attr("id").substring(10,
23);$(".checkbox-item-"+a).attr("checked")?($("#plus-item-"+a).html("+"),$(".parent-element-"+a).hide(),removeFromRegionalTextInput(a),$(".checkbox-item-"+a).attr({checked:""})):($("#plus-item-"+a).html("-"),$(".parent-element-"+a).show(),appendToRegionalTextInput(a),$(".checkbox-item-"+a).attr({checked:"checked"}))});$(".rlist input").click(function(){var a=$(this).attr("name").substring(0,13);$(this).attr("checked")?($("#plus-item-"+a).html("-"),$(".parent-element-"+a).show(),appendToRegionalTextInput(a)):
($("#plus-item-"+a).html("+"),$(".parent-element-"+a).hide(),removeFromRegionalTextInput(a))})});
$(document).ready(function(){$("#4c496bd58da0d_f").hide();$("#0_d").hide();$("#1_d").hide();$("#2_d").hide();$("#3_d").hide();$("#4_d").hide();$("#DivImPropForm").hide();$("#FormSearchNameRegion").bind("click",function(){FieldsetClickHideShow("#0_d")});$("#FormSearchNameRRegion").bind("click",function(){FieldsetClickHideShow("#1_d")});$("#FormSearchNameCity").bind("click",function(){FieldsetClickHideShow("#2_d")});$("#FormSearchNameRCIty").bind("click",function(){FieldsetClickHideShow("#3_d")});$("#FormSearchNameACity").bind("click",
function(){FieldsetClickHideShow("#4_d")});$("#SearchPropImAdviceHS").bind("click",function(){FieldsetClickHideShow("#DivImPropForm")})});
