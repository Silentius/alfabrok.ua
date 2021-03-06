/*
 *
 * Copyright (c) 2004-2009 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 *
 *
 */
Zapatec.formPath = Zapatec.getPath("Zapatec.Form");

Zapatec.Utils.createNestedHash(Zapatec,["Langs","Zapatec.Form","en"],
										{   'initializeError': 'Форма уже инициализирована!',
	'loadingForm': 'загрузка формы',
	'noFormError': "Невозможно найти форму",

	'submitOneError': 'Одна помилка.',
	'submitManyErrors': 'Загальна кількість помилок: %1.',

	'isRequiredError': 'Це поле є обов\'язковим для заповнення',
	'maskNotFilledError': 'Значення не відповідає масці %1',
	'noSuchAutoCompleteValueError': 'Нет такого значения',
	'invalidURLError': 'Неправильний URL',
	'invalidEmailError': 'Неправильний email',
	'invalidCreditCardError': 'Неправильный номер кредитной карты',
	'invalidUSPhoneError': 'Неправильный телефонный номер США',
	'invalidInternationalPhoneError': 'Неправильный международный номер телефона',
	'invalidUSZipError': 'Неправильный почтовый код США',
	'invalidDateError': 'Неправильная дата',
	'invalidIntError': 'Не целое число',
	'invalidFloatError': 'Не дробное число',
	'maxLengthError': 'Введите не больше чем %1 символов',
	'minLengthError': 'Введите хотя бы %1 символов',

	'ajaxDebugSeparator': '-----------------------',
	'ajaxDebugSubmitTitle': 'Посылается AJAX запрос для отсылки данных формы.',
	'ajaxDebugValidateTitle': 'Посылается AJAX запрос для проверки значения поля %1.',
	'ajaxDebugFillTitle': 'Посылается AJAX запрос для заполнения поля %1.',
	'ajaxDebugQuery': 'Запрос: %1',
	'ajaxDebugResponse': 'Ответ получе: %1',
	'ajaxDebugResponseError': 'Получен некорректный ответ: %1',

	'ajaxSubmitCantParseError': "Не получается разобрать полученный JSON: %1",
	'ajaxSubmitNoResponseError': 'Получен пустой ответ.',

	'ajaxValidateCantParseError': "Не получается разобрать полученный JSON: %1",
	'ajaxValidateNoResponseError': 'Получен пустой ответ.',
	'ajaxValidateValidationError': 'Поле имеет некорректное значение',

	'ajaxFillCantParseError': "Не получается разобрать полученный JSON: %1",
	'ajaxFillNoResponseError': 'Получен пустой ответ.',
	'ajaxFillGeneralError': "Не получилось найти значения для заполнения.",

	'ajaxSuggestCantParseError': "Не получается разобрать полученный JSON: %1",
	'ajaxSuggestNoResponseError': 'Получен пустой ответ.',
	'ajaxSuggestGeneralError': "Не получилось найти значения."});Zapatec.Form=function(){var objArgs={};switch(arguments.length){case 1:objArgs=arguments[0];break;case 2:objArgs=arguments[1];objArgs.form=arguments[0];break;}
Zapatec.Form.SUPERconstructor.call(this,objArgs);};Zapatec.Form.id="Zapatec.Form";Zapatec.inherit(Zapatec.Form,Zapatec.Widget);Zapatec.Form.prototype.init=function(objArgs){this.container=null;Zapatec.Form.SUPERclass.init.call(this,objArgs);if(this.config.form.zpForm!=null){Zapatec.Log({description:this.getMessage('initializeError')});return null;}
this.container=this.config.form;this.createProperty(this.container,"zpForm",this);this.addCircularRef("container");this.container.className=this.container.className.replace(/\bzpForm.*?\b/,"")+" "+this.getClassName({prefix:"zpForm"});var self=this;var oldOnSubmit=this.container.onsubmit||function(){return true;};if(typeof(this.config.asyncSubmitFunc)=='function'){if(this.config.serverCallback){var targetName="form-iframe-"+this.id;var tmp=document.createElement("span");tmp.innerHTML='<iframe name="'+targetName+'" style="display: none"></iframe>';var iframe=tmp.firstChild;this.container.parentNode.insertBefore(iframe,this.container);this.container.setAttribute("target",targetName);var hidden=document.createElement("input");hidden.setAttribute("type","hidden");hidden.setAttribute("name",this.config.serverCallback);hidden.setAttribute("value","window.parent.Zapatec.Widget.getWidgetById("+this.id+").processAsyncResponse");this.container.appendChild(hidden);}
this.container.onsubmit=function(ev){var retVal=oldOnSubmit(ev);return self.asyncSubmit(ev)&&retVal;};}else{this.container.onsubmit=function(ev){return self.submit(ev)&&oldOnSubmit(ev);};}
this.addCircularRef(this.container,"onsubmit");this.container.onreset=function(ev){setTimeout(function(ev){self.reset(ev);},1);};this.addCircularRef(this.container,"onreset");var focusedFlag=false;var els=[];for(var ii=0;ii<this.container.elements.length;ii++){els.push(this.container.elements[ii]);}
for(var ii=0;ii<els.length;ii++){var el=els[ii];if(!Zapatec.Form.Utils.ignoreField(el)){var zpField=new Zapatec.Form.Field({form:this,field:el,langId:this.config.langId,lang:this.config.lang,langCountryCode:this.config.langCountryCode,langEncoding:this.config.langEncoding,formConfig:this.config});if(this.config.startupFocusPosition){if(el.zpFormField!=null&&focusedFlag==false&&typeof(el.focus)!='undefined'&&(typeof(el.type)=='undefined'||typeof(el.type)!='undefined'&&el.type.toLowerCase()!='hidden')&&!el.disabled&&!el.readOnly){if(this.config.startupFocusPosition=="firstField"||(this.config.startupFocusPosition=="firstRequiredField"&&zpField.hasFeature("zpFormRequired"))||(this.config.startupFocusPosition=="firstIncorrectField"&&zpField.validate(true)!=null&&zpField.validate(true).length>0)){var tmp=el.getAttribute("autocomplete");try{el.setAttribute('autocomplete','off');el.focus();focusedFlag=true;}catch(e){}
el.setAttribute('autocomplete',tmp);}}}}}
var childElements=this.container.all?this.container.all:this.container.getElementsByTagName("*");for(var ii=childElements.length-1;ii>=0;ii--){var el=childElements[ii];Zapatec.Form.Utils.initMultipleField(el,true,this);this.initConditionalField(el);}
if(Zapatec.windowLoaded){this.formLoaded();}else{Zapatec.Utils.addEvent(window,"load",new Function("Zapatec.Widget.callMethod("+this.id+", 'formLoaded')"));}};Zapatec.Form.prototype.configure=function(objArgs){this.defineConfigOption('langId',Zapatec.Form.id);this.defineConfigOption('lang',"en");this.defineConfigOption('form',null);this.defineConfigOption('statusImgPos','beforeField');this.defineConfigOption('showErrors',null);this.defineConfigOption('showErrorsOnSubmit',true);this.defineConfigOption('submitErrorFunc',Zapatec.Form.submitErrorFunc);this.defineConfigOption('submitValidFunc',null);this.defineConfigOption('asyncSubmitFunc',null);this.defineConfigOption('strict',false);this.defineConfigOption('asyncTheme',true);this.defineConfigOption('theme',"alternate");this.defineConfigOption('ajaxDebugFunc',null);this.defineConfigOption('dropDownTheme',"default");this.defineConfigOption('hideUntilThemeLoaded',false);this.defineConfigOption('putTabIndexesOnError',true);this.defineConfigOption('startupFocusPosition',"firstField");this.defineConfigOption('displayErrorWhileTyping',true);this.defineConfigOption('multipleCallback',Zapatec.Form.Utils.generateMultipleId);this.defineConfigOption('serverCallback');this.defineConfigOption('disableButtonsWhenAsyncSubmit',true);this.defineConfigOption('conditionalEvents');this.defineConfigOption('busyConfig');this.defineConfigOption('autoCompleteConfig');this.defineConfigOption('maskPlaceholder','_');Zapatec.Form.SUPERclass.configure.call(this,objArgs);this.config.form=Zapatec.Widget.getElementById(this.config.form);if(this.config.form==null||!this.config.form.nodeName||this.config.form.nodeName.toLowerCase()!="form"){Zapatec.Log({description:this.getMessage('noFormError')});throw this.getMessage('noFormError');}
if(typeof(this.config.conditionalEvents)=='string'){this.config.conditionalEvents=[this.config.conditionalEvents];}};Zapatec.Form.prototype.reconfigure=function(objArgs){if(objArgs.theme){Zapatec.Utils.removeClass(this.container,this.getClassName({prefix:"zpForm"}));}
Zapatec.Form.SUPERclass.reconfigure.call(this,objArgs);Zapatec.Utils.addClass(this.container,this.getClassName({prefix:"zpForm"}));};Zapatec.Form.prototype.addStandardEventListeners=function(){if(this.config.multipleCallback==Zapatec.Form.Utils.generateMultipleId){this.addEventListener("beforeDeleteMultiple",Zapatec.Form.Utils.beforeDeleteMultiple);}}
Zapatec.Form.prototype.asyncSubmit=function(){var self=this;if(this.processing==true){return false;}
if(this.config.showErrorsOnSubmit&&typeof(this.config.submitErrorFunc)=='function'&&!this.submit()){return false;}
var strUrl=this.container.getAttribute("action");if(Zapatec.is_ie){strUrl=this.container.attributes["action"];if(strUrl){strUrl=strUrl.nodeValue;}}
if(!strUrl){return false;}
if(this.config.disableButtonsWhenAsyncSubmit){this.toggleSubmits(true);this.processing=true;}
if(this.config.busyConfig){Zapatec.Transport.showBusy(this.config.busyConfig);}
if(this.config.serverCallback){return true;}
var arrContent=[];var objFormElements=this.container.elements;for(var iElm=0;iElm<objFormElements.length;iElm++){var formEl=objFormElements[iElm];if(!formEl.name||formEl.disabled){continue;}
if(formEl.nodeName.toLowerCase()=='input'&&(formEl.type.toLowerCase()=='radio'||formEl.type.toLowerCase()=='checkbox')&&!formEl.checked){continue;}
var val=Zapatec.Form.Utils.getValue(formEl);if(val&&val instanceof Array){for(var ii=0;ii<val.length;ii++){arrContent.push(formEl.name+'='+encodeURIComponent(val[ii]));}}else{arrContent.push(formEl.name+'='+encodeURIComponent(val));}}
var strMethod=this.container.getAttribute("method");if(Zapatec.is_ie){strMethod=this.container.attributes["method"];if(strMethod){strMethod=strMethod.nodeValue;}}
if(strMethod){strMethod=strMethod.toUpperCase();}
var strContent=arrContent.join('&');if(strMethod!='POST'){if(strMethod===''){strMethod="GET";}
strUrl+='?'+strContent;strContent=null;}
if(this.config.ajaxDebugFunc){this.config.ajaxDebugFunc(this.getMessage('ajaxDebugSeparator'));this.config.ajaxDebugFunc(this.getMessage('ajaxDebugSubmitTitle'));this.config.ajaxDebugFunc(strMethod+" "+strUrl);this.config.ajaxDebugFunc(this.getMessage('ajaxDebugQuery',strContent));}
var strEncoding=this.container.getAttribute("encoding");if(Zapatec.is_ie){strEncoding=this.container.attributes["encoding"];if(strEncoding){strEncoding=strEncoding.nodeValue;}}
Zapatec.Transport.fetch({url:strUrl,method:strMethod,contentType:strEncoding,content:strContent,onLoad:function(objText){if(self.config.ajaxDebugFunc){self.config.ajaxDebugFunc(self.getMessage('ajaxDebugResponse',objText.responseText));}
if(self.config.disableButtonsWhenAsyncSubmit){self.processing=false;self.toggleSubmits(false);}
if(objText.responseText==null){Zapatec.Log({description:self.getMessage('ajaxSubmitNoResponseError',objText.responseText)});return null;}
var objResponse=Zapatec.Transport.parseJson({strJson:objText.responseText});if(objResponse==null){Zapatec.Log({description:self.getMessage('ajaxSubmitCantParseError',objText.responseText)});return null;}
return self.processAsyncResponse(objResponse);},onError:function(objError){if(self.config.disableButtonsWhenAsyncSubmit){self.processing=false;self.toggleSubmits(false);}
var strError='';if(objError.errorCode){strError=objError.errorCode+' ';}
strError+=objError.errorDescription;if(self.config.ajaxDebugFunc){self.config.ajaxDebugFunc(self.getMessage('ajaxDebugResponseError',strError));}
if(self.config.showErrorsOnSubmit&&typeof(self.config.submitErrorFunc)=='function'){self.config.submitErrorFunc({serverSide:true,generalError:strError});}}});return false;};Zapatec.Form.prototype.processAsyncResponse=function(objResponse){if(this.config.disableButtonsWhenAsyncSubmit){this.processing=false;this.toggleSubmits(false);}
if(this.config.busyConfig){Zapatec.Transport.removeBusy(this.config.busyConfig);}
if(objResponse){if(objResponse.success){this.config.asyncSubmitFunc(objResponse.callbackArgs);}else if(this.config.showErrorsOnSubmit){var arrFieldErrors=[];var boolFocusSet=false;if(objResponse.fieldErrors){for(var strFieldName in objResponse.fieldErrors){for(var iElm=0;iElm<this.container.elements.length;iElm++){var objField=this.container.elements[iElm];if(objField.name&&objField.name==strFieldName){arrFieldErrors.push({field:objField,errorMessage:objResponse.fieldErrors[strFieldName],validator:''});if(objField.zpFormField!=null){objField.zpFormField.setImageStatus(objResponse.fieldErrors[strFieldName]);}
break;}}}}
if(typeof(this.config.submitErrorFunc)=='function'){this.config.submitErrorFunc({serverSide:true,generalError:objResponse.generalError||'',fieldErrors:arrFieldErrors});}}}else if(this.config.showErrorsOnSubmit&&typeof(this.config.submitErrorFunc)=='function'){this.config.submitErrorFunc({serverSide:true,generalError:this.getMessage('ajaxSubmitNoResponseError')});}};Zapatec.Form.prototype.toggleSubmits=function(disable){var inputs=this.container.getElementsByTagName("input");for(var ii=0;ii<inputs.length;ii++){if(inputs[ii].type=="submit"){inputs[ii].disabled=disable==true;}}};Zapatec.Form.prototype.reset=function(ev){for(var ii=0;ii<this.container.elements.length;ii++){var field=this.container.elements[ii].zpFormField;if(field!=null){field.setValueFromField();field.firstRun=true;field.blur();}}
if(!ev){ev=window.event;}
this.fireEvent("reset",ev);this.fireEvent("all",ev,"reset");};Zapatec.Form.prototype.submit=function(ev){var errors=this.validate(false);if(errors!=null&&errors.length>0&&this.config.showErrorsOnSubmit&&typeof(this.config.submitErrorFunc)=='function'){this.config.submitErrorFunc({serverSide:false,generalError:errors.length==1?this.getMessage('submitOneError'):this.getMessage('submitManyErrors',errors.length),fieldErrors:errors});try{errors[0].field.focus();}catch(e){}
return false;}
if(typeof(this.config.submitValidFunc)=='function'){this.config.submitValidFunc();}
if(!ev){ev=window.event;}
this.fireEvent("submit",ev);this.fireEvent("all",ev,"submit");return true;};Zapatec.Form.prototype.validate=function(onlyValidate){if(typeof(onlyValidate)=="undefined"){onlyValidate=true;}
var valid=true;var tabIndex=1;var errors=[];for(var ii=0;ii<this.container.elements.length;ii++){var el=this.container.elements[ii];if(el.zpFormField==null){continue;}
if(!onlyValidate){el.zpFormField.firstRun=false;}
var validate=el.zpFormField.validate(onlyValidate);var fieldValid=(validate==null||validate.length==0);if(this.config.putTabIndexesOnError){if(fieldValid){el.tabIndex=100+tabIndex++;if(!Zapatec.is_ie){delete(el.tabIndex);}}else{el.tabIndex=tabIndex;}}
if(!fieldValid){for(var jj=0;jj<validate.length;jj++){errors.push(validate[jj]);}}
valid=valid&&fieldValid;}
if(errors.length==0){errors=null;}
return errors;};Zapatec.Form.prototype.initConditionalField=function(field){var md=null;if(field.className&&(md=field.className.match(/zpForm(Display|Visible)When=([^\s]+)/))){var func=eval(md[2]);if(typeof(func)!="function"){return null;}
var handler=null;var self=this;if(md[1]=='Display'){handler=function(){var tmp=func();Zapatec.Form.Utils.toggleFormElements(field,tmp,false);if(field.zpFormField){Zapatec.Form.Utils.toggleFormElements(field.zpFormField.errorText,tmp,false);Zapatec.Form.Utils.toggleFormElements(field.zpFormField.requiredMark,tmp,false);}
if(field.zpMultipleButton){Zapatec.Form.Utils.toggleFormElements(field.zpFormField.requiredMark,tmp,false);}
if(self.config.strict){self.toggleSubmits(self.validate()!=null);}};}else if(md[1]=='Visible'){handler=function(){var tmp=func();Zapatec.Form.Utils.toggleFormElements(field,tmp,true);if(field.zpFormField){Zapatec.Form.Utils.toggleFormElements(field.zpFormField.errorText,tmp,true);Zapatec.Form.Utils.toggleFormElements(field.zpFormField.requiredMark,tmp,true);}
if(field.zpMultipleButton){Zapatec.Form.Utils.toggleFormElements(field.zpFormField.requiredMark,tmp,true);}
if(self.config.strict){self.toggleSubmits(self.validate()!=null);}};}
handler();var eventTypes=this.config.conditionalEvents;if(!eventTypes||eventTypes.length==0){eventTypes=["all"];}
for(var ii=0;ii<eventTypes.length;ii++){this.addEventListener(eventTypes[ii],handler);}}};Zapatec.Form.prototype.addEvent=Zapatec.Form.prototype.addChangeHandler=function(func,eventTypes){if(typeof(func)=='string'){func=eval(func);}
if(typeof(func)!='function'){return false;}
if(!eventTypes||eventTypes.length==0){eventTypes=["all"];}
if(typeof(eventTypes)=='string'){eventTypes=[eventTypes];}
for(var ii=0;ii<eventTypes.length;ii++){this.addEventListener(eventTypes[ii],func);}
func(null,"addEvent");if(this.config.strict){this.toggleSubmits(this.validate()!=null);}
return true;};Zapatec.Form.prototype.runChangeHandlers=function(){this.fireEvent("all",null,"runChangeHandlers");};Zapatec.Form.prototype.formLoaded=function(){for(var ii=0;ii<this.container.elements.length;ii++){var zpField=this.container.elements[ii].zpFormField;if(zpField!=null){zpField.setValueFromField(true);}}
this.fireEvent("formLoaded");this.fireEvent("all",null,"formLoaded");};Zapatec.Form.prototype.destroy=function(){for(var ii=0;ii<this.container.elements.length;ii++){var field=this.container.elements[ii];if(field.zpFormField){field.zpFormField.destroy();}}
this.discard();};Zapatec.Form.setupAll=function(params){var forms=document.getElementsByTagName('form');if(!params){params={};}
if(!params.startupFocusPosition){params.startupFocusPosition=null;}
if(forms&&forms.length){for(var ff=forms.length-1;ff>=0;ff--){if(forms[ff].zpForm){continue;}
var arrMatch=forms[ff].className.match(/zpForm(\S*)/);if(arrMatch){var strThemeName=arrMatch[1];var objConfig=Zapatec.Utils.clone(params);if((objConfig.theme==null||objConfig.theme=="")&&strThemeName){objConfig.theme=strThemeName;}
objConfig.form=forms[ff];new Zapatec.Form(objConfig);}}}};Zapatec.Form.submitErrorFunc=function(objErrors){var message=objErrors.generalError+'\n';if(objErrors.fieldErrors&&objErrors.fieldErrors.length){for(var ii=0;ii<objErrors.fieldErrors.length;ii++){message+=(ii+1)+': Field '+objErrors.fieldErrors[ii].field.name+' '+objErrors.fieldErrors[ii].errorMessage+"\n";}
message=message.substr(0,message.length-1);}
alert(message);};Zapatec.Form.IGNORE_CLASSNAME="zpFormInternalEl";Zapatec.Form.Field=function(objArgs){Zapatec.Form.SUPERconstructor.call(this,objArgs);};Zapatec.Form.Field.id="Zapatec.Form.Field";Zapatec.inherit(Zapatec.Form.Field,Zapatec.Widget);Zapatec.Form.Field.prototype.configure=function(objArgs){this.defineConfigOption('theme',objArgs.formConfig&&objArgs.formConfig.theme?objArgs.formConfig.theme:"");this.defineConfigOption('themePath',objArgs.formConfig&&objArgs.formConfig.themePath?objArgs.formConfig.themePath:Zapatec.Form.path+"../themes/");if(!objArgs.lang&&objArgs.formConfig.lang){objArgs.lang=objArgs.formConfig.lang;}
if(!objArgs.langCountryCode&&objArgs.formConfig.langCountryCode){objArgs.langCountryCode=objArgs.formConfig.langCountryCode;}
if(!objArgs.langEncoding&&objArgs.formConfig.langEncoding){objArgs.langEncoding=objArgs.formConfig.langEncoding;}
this.defineConfigOption('form');this.defineConfigOption('formConfig',{});this.defineConfigOption('field');this.defineConfigOption('langId',"Zapatec.Form");this.defineConfigOption('inheritFrom',{});Zapatec.Form.SUPERclass.configure.call(this,objArgs);if(!this.config.inheritFrom){this.config.inheritFrom={};}
this.config.form=Zapatec.Widget.getElementById(this.config.form);this.config.field=Zapatec.Widget.getElementById(this.config.field);};Zapatec.Form.Field.prototype.reconfigure=function(objArgs){Zapatec.Form.SUPERclass.reconfigure.call(this,objArgs);};Zapatec.Form.Field.prototype.init=function(objArgs){if(Zapatec.Form.Utils.ignoreField(objArgs.field)||objArgs.field.zpFormField){return null;}
this.form=null;this.state={};this.features={};this.keyPressCounter=0;this.firstRun=true;this.chars=null;this.enteredValue=null;this.dropDown=null;this.isBooleanField=false;this.isEditing=false;Zapatec.Form.SUPERclass.init.call(this,objArgs);this.autoCompleteOptions=this.config.inheritFrom.autoCompleteOptions?this.config.inheritFrom.autoCompleteOptions:[];this.field=this.config.field;this.features=this.config.inheritFrom.features?this.config.inheritFrom.features:Zapatec.Form.Utils.getTokens(this.field.className," ");if(this.hasFeature("zpFormRequired")){this.setFeature("zpFormRequired",true);}
this.isBooleanField=(this.field.nodeName.toLowerCase()=='input'&&(this.field.type.toLowerCase()=='radio'||this.field.type.toLowerCase()=='checkbox'));var md=null;if(md=this.field.className.match(/zpFormAllowed-(\S+)/)){if(!this.features['zpFormAllowedChars']){this.features['zpFormAllowedChars']="";}
this.features['zpFormAllowedChars']+='\\'+md[1].split('').join('\\');}
if(typeof(this.features['zpFormAllowedChars'])!='undefined'&&this.getFeature('zpFormAllowedChars')==null){var undef;this.features['zpFormAllowedChars']=undef;}
if((this.hasFeature("zpFormAutoComplete")||this.hasFeature("zpFormAutoCompleteStrict"))&&this.field.nodeName.toUpperCase()=="SELECT"){var input=document.createElement('input');for(var ii=0;ii<this.field.attributes.length;ii++){var attr=this.field.attributes[ii];if(attr.name=='class'){input.className=this.field.getAttribute(attr.name);}else{input.setAttribute(attr.name,this.field.getAttribute(attr.name));}}
for(var ii=0;ii<this.field.options.length;ii++){this.autoCompleteOptions.push(this.field.options[ii].innerHTML);}
if(this.field.selectedIndex!=null){var val=null;if(this.field.options[this.field.selectedIndex].value!=null&&this.field.options[this.field.selectedIndex].value!=""){val=this.field.options[this.field.selectedIndex].value;}else{val=this.field.options[this.field.selectedIndex].innerHTML;}
input.value=val;input.setAttribute("value",val);}
Zapatec.Utils.insertAfter(this.field,input);Zapatec.Utils.destroy(this.field);input.type='text';this.field=input;}
if(this.hasFeature("zpFormAutoComplete")||this.hasFeature("zpFormAutoCompleteStrict")||this.hasFeature("zpFormSuggest")){this.field.setAttribute("autocomplete","off");this.field.autoComplete="off";}
var self=this;this.form=this.config.form;if(!this.form){this.form={container:{elements:[this.field]},fireEvent:function(){},validate:function(){return self.validate()},toggleSubmits:function(){},container:this.field.parentNode};if(this.field.parentNode){Zapatec.Utils.addClass(this.field.parentNode,this.getClassName({prefix:"zpForm"}));}}
if(this.hasFeature("zpFormMask")){if(this.field.hasAttribute&&this.field.hasAttribute("maxlength")){this.field.setAttribute("maxlength",null);}
var mask=this.getFeature("zpFormMask");var maskChars=mask.split('');this.chars=[];this.enteredValue=[];for(var ii=0;ii<maskChars.length;ii++){var tmp=null;switch(maskChars[ii]){case"0":tmp="[0-9]";break;case"L":tmp="[a-zA-Z]";break;case"A":tmp="[0-9a-zA-Z]";break;case"&":tmp=".";break;case'\\':ii++;if(ii>=maskChars.length)
break;default:this.chars.push(maskChars[ii]);this.enteredValue.push(maskChars[ii]);}
if(tmp!=null){var re=new RegExp("^"+tmp+"$");this.chars.push(re);this.enteredValue.push(null);}}}
this.createProperty(this.field,"zpFormField",this);var oldOnKeyDown=this.field.onkeydown||function(){return true;};Zapatec.Utils.createProperty(this.field,"onkeydown",function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;var res=oldOnKeyDown();return zpField.keydown(ev)&&res;});var oldOnKeyPress=this.field.onkeypress||function(){return true;};Zapatec.Utils.createProperty(this.field,"onkeypress",function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;var res=oldOnKeyPress();return zpField.keypress(ev)&&res;});Zapatec.Utils.addEvent(this.field,'keyup',function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.keyup(ev);},false,false);Zapatec.Utils.addEvent(this.field,'focus',function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.focus(ev);},false,false);Zapatec.Utils.addEvent(this.field,'blur',function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.blur(ev);});if(this.field.nodeName.toLowerCase()=='select'){Zapatec.Utils.addEvent(this.field,'change',function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.valueChanged(ev);},false,false);}
var onChangeFunc=function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.valueChanged(ev);};Zapatec.Utils.addEvent(this.field,'keyup',onChangeFunc);if(Zapatec.is_ie){Zapatec.Utils.addEvent(this.field,'paste',onChangeFunc,false,false);}else if(Zapatec.is_gecko){Zapatec.Utils.addEvent(this.field,'input',onChangeFunc,false,false);}else{Zapatec.Utils.addEvent(this.field,'change',onChangeFunc,false,false);}
if(this.isBooleanField){this.otherFields=[];if(this.field.name){this.otherFields=this.config.form.container[this.field.name];if(!this.otherFields instanceof Array){this.otherFields=[this.otherFields];}}
onChangeFunc=function(ev){var zpField=Zapatec.Utils.getTargetElement(ev).zpFormField;return zpField.booleanChanged();};Zapatec.Utils.addEvent(this.field,'change',onChangeFunc,false,false);Zapatec.Utils.addEvent(this.field,'click',onChangeFunc,false,false);}
this.requiredMark=Zapatec.Utils.createElement('span');this.requiredMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.requiredMark.id="zpFormField"+this.id+"StatusImg1";this.editingMark=this.requiredMark.appendChild(Zapatec.Utils.createElement('span'));this.editingMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.editingMark.id="zpFormField"+this.id+"StatusImg2";this.emptyMark=this.editingMark.appendChild(Zapatec.Utils.createElement('span'));this.emptyMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.emptyMark.id="zpFormField"+this.id+"StatusImg3";this.validMark=this.emptyMark.appendChild(Zapatec.Utils.createElement('span'));this.validMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.validMark.id="zpFormField"+this.id+"StatusImg4";this.fetchingMark=this.validMark.appendChild(Zapatec.Utils.createElement('span'));this.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.fetchingMark.id="zpFormField"+this.id+"StatusImg5";this.statusImg=this.fetchingMark.appendChild(Zapatec.Utils.createElement('span'));this.statusImg.className=Zapatec.Form.IGNORE_CLASSNAME+' zpStatusImg';this.statusImg.id="zpFormField"+this.id+"StatusImg";this.addCircularRef(this,"statusImg");this.addCircularRef(this,"fetchingMark");this.addCircularRef(this,"validMark");this.addCircularRef(this,"emptyMark");this.addCircularRef(this,"editingMark");this.addCircularRef(this,"requiredMark");this.errorText=Zapatec.Utils.createElement('span');this.errorText.id="zpFormField"+this.id+"ErrorText";this.errorText.className=Zapatec.Form.IGNORE_CLASSNAME+' zpFormError';if(this.field.type&&(this.field.type.toLowerCase()=="hidden"||this.field.getAttribute('type')=="hidden")){this.errorText.style.display='none';this.requiredMark.style.display='none';}
if(this.isBooleanField){if(this.field.type.toLowerCase()=="checkbox"){this.field.className+=" zpFormCheckbox";this.statusImg.className+=" zpCheckboxStatusImg";}else if(this.field.type.toLowerCase()=="radio"){this.field.className+=" zpFormRadio";this.statusImg.className+=" zpRadioStatusImg";}else{this.statusImg.className+=" zpCommonStatusImg";}}else{this.statusImg.className+=" zpCommonStatusImg";}
var lastNode=this.field;if(this.config.formConfig.statusImgPos=='afterField'){Zapatec.Utils.insertAfter(this.field,this.requiredMark);lastNode=this.requiredMark;}else if(this.config.formConfig.statusImgPos=='beforeField'){this.field.parentNode.insertBefore(this.requiredMark,this.field);}else if(this.config.formConfig.statusImgPos=='last'){this.field.parentNode.appendChild(this.requiredMark);}
if(this.config.formConfig.showErrors=='afterField'){Zapatec.Utils.insertAfter(this.field,this.errorText);lastNode=this.errorText;}else if(this.config.formConfig.showErrors=='beforeField'){this.field.parentNode.insertBefore(this.errorText,this.field);}else if(this.config.formConfig.showErrors=='last'){this.field.parentNode.appendChild(this.errorText);}
if(this.hasFeature("zpFormMultiple")){this.createProperty(this.field,"zpLastNode",lastNode);}
if(this.hasFeature("zpFormSuggest")||this.hasFeature("zpFormAutoComplete")||this.hasFeature("zpFormAutoCompleteStrict")){if(typeof(Zapatec.AutoComplete)=='undefined'){Zapatec.Transport.loadJS({url:Zapatec.zapatecPath+'../zpautocomplete/src/zpautocomplete-core.js',async:true,onLoad:function(){self.initDropDown();}});}else{this.initDropDown();}}
var value=this.getValue();if(value&&value.length>0){this.ajaxValidate();this.suggestValue();this.ajaxFill();}
this.setValueFromField(true);};Zapatec.Form.Field.DELAYED_INTERVAL=1000;Zapatec.Form.Field.prototype.initDropDown=function(){var self=this;var arrow=Zapatec.Utils.createElement("span");arrow.className=Zapatec.Form.IGNORE_CLASSNAME+" dropDownArrow";arrow.id="zpFormField"+this.id+"DropDownArrow";this.createProperty(arrow,"onclick",function(ev){self.field.focus(ev);self.autoCompleteValue(self.getAutoCompleteOptions(true));self.suggestValue(true);});Zapatec.Utils.insertAfter(this.field,arrow);var tmpConfig=Zapatec.Utils.clone(this.config.formConfig.autoCompleteConfig);if(!tmpConfig){tmpConfig={};}
tmpConfig.fields=[this.field];tmpConfig.width="auto";tmpConfig.dataOnDemand=false;tmpConfig.convertTip=function(tipObj){return tipObj.title;}
tmpConfig.selectTip=function(tipObj){self.setValue(tipObj.title)
self.valueChanged();if(self.field.onchange){self.field.onchange();}}
this.dropDown=new Zapatec.AutoComplete(tmpConfig);this.dropDown.field=this.field;};Zapatec.Form.Field.prototype.valueChanged=function(ev){if(this.hasFeature("zpFormAllowedChars")||this.hasFeature("zpFormMask")){this.setValueFromField();}else{this.validate();}
if(!ev){ev=window.event;}
this.fireEvent("valueChanged",ev);this.fireEvent("all",ev,"valueChanged");this.form.fireEvent("valueChanged",ev);this.form.fireEvent("all",ev,"valueChanged");return true;};Zapatec.Form.Field.prototype.booleanChanged=function(ev){if(!this.isBooleanField){return;}
for(var ii=0;ii<this.otherFields.length;ii++){var el=this.otherFields[ii];if(!el||!el.zpFormField){continue;}
if(!this.firstRun){el.zpFormField.firstRun=false;}
el.zpFormField.validate();}
if(!ev){ev=window.event;}
this.fireEvent("valueChanged",ev);this.fireEvent("booleanValueChanged",ev);this.fireEvent("all",ev,"booleanValueChanged");this.form.fireEvent("valueChanged",ev);this.form.fireEvent("booleanValueChanged",ev);this.form.fireEvent("all",ev,"booleanValueChanged");return true;};Zapatec.Form.Field.prototype.keydown=function(evt){if(!this.isEditing){return false;}
if(!evt){evt=window.event;}
this.fireEvent("keydown",evt);this.fireEvent("all",evt,"keydown");this.form.fireEvent("keydown",evt);this.form.fireEvent("all",evt,"keydown");this.state.lastSelectionStart=this.getSelectionStart();this.state.lastSelectionEnd=this.getSelectionEnd();if(Zapatec.is_ie&&(this.hasFeature('zpFormAllowedChars')||this.hasFeature("zpFormMask"))){var tmpArr=Zapatec.Utils.getCharFromEvent(evt);var charCode=tmpArr.charCode;var newChar=tmpArr.chr;if(Zapatec.Form.Utils.isSpecialKey(charCode,newChar)||this.processFunctionalKeys(evt)==true){return true;}
if(this.hasFeature("zpFormMask")){if(this.processCustomKeys(charCode)==true){return true;}
return false;}
if(this.hasFeature('zpFormAllowedChars')){this.setValueFromField();}}
if(this.dropDown){this.dropDown.hide();}
return true;};Zapatec.Form.Field.prototype.keypress=function(evt){if(!this.isEditing){return false;}
if(!evt){evt=window.event;}
this.fireEvent("keypress",evt);this.fireEvent("all",evt,"keypress");this.form.fireEvent("keypress",evt);this.form.fireEvent("all",evt,"keypress");if(this.hasFeature('zpFormAllowedChars')){if(this.processFunctionalKeys(evt)==true){return true;}
var tmpArr=Zapatec.Utils.getCharFromEvent(evt)
var charCode=tmpArr.charCode;var newChar=tmpArr.chr;if((Zapatec.Form.Utils.isSpecialKey(charCode,newChar)||charCode==8||charCode==46)){return true;}
var allowed=new RegExp('['+this.getFeature('zpFormAllowedChars')+']');this.setValueFromField();if(!(allowed.test(newChar))){Zapatec.Utils.addClass(this.field,"zpWrongValue");this.field.readonly=true;var self=this;setTimeout(function(){Zapatec.Utils.removeClass(self.field,"zpWrongValue");self.field.readonly=false;},100);return false;}
return true;}
if(this.hasFeature("zpFormMask")){var self=this;var tmpArr=Zapatec.Utils.getCharFromEvent(evt)
var charCode=tmpArr.charCode;var newChar=tmpArr.chr;if(this.processFunctionalKeys(evt)==true){return true;}
this.setValueFromField();var pos=this.getSelectionStart();if(charCode==null&&newChar==null){return false;}
if(!Zapatec.is_ie){if(Zapatec.Form.Utils.isSpecialKey(charCode,newChar)){return true;}
if(this.processCustomKeys(charCode)==false){return false;}}
if(typeof(this.chars[pos])=='string'){var newPos=this.getNextAvailablePosition(pos);if(newPos==null||newPos==pos)
return false;this.setCaretPosition(newPos);pos=newPos;}
if(pos>=this.chars.length||typeof(this.chars[pos])!='string'&&!newChar.match(this.chars[pos])||typeof(this.chars[pos])=='string'&&newChar!=this.chars[pos]){Zapatec.Utils.addClass(this.field,"zpWrongValue");this.field.readonly=true;setTimeout(function(){Zapatec.Utils.removeClass(self.field,"zpWrongValue");self.field.readonly=false;},100);this.setValue();this.setCaretPosition(pos);}else{this.enteredValue[pos]=newChar;this.setValue();var newPos=this.getNextAvailablePosition(pos);if(newPos==null){newPos=pos+1;}
this.setCaretPosition(newPos);}
if(evt&&evt.preventDefault){evt.preventDefault();}
return false;}
return true;};Zapatec.Form.Field.prototype.keyup=function(evt){if(!this.isEditing){return false;}
if(!evt){evt=window.event;}
this.fireEvent("keyUp",evt);this.fireEvent("all",evt,"keyup");this.form.fireEvent("keyUp",evt);this.form.fireEvent("all",evt,"keyup");if(evt){var tmp=Zapatec.Utils.getCharFromEvent(evt);if(Zapatec.Form.Utils.isSpecialKey(tmp.charCode,tmp.chr)||((tmp.charCode==8||tmp.charCode==46)&&this.state.lastSelectionStart!=this.state.lastSelectionEnd)){return true;}}
this.validate();if(this.hasFeature("zpFormAutoComplete")||this.hasFeature("zpFormAutoCompleteStrict")){this.autoCompleteValue(this.getAutoCompleteOptions());}
this.keyPressCounter++;var self=this;setTimeout(function(){self.runDelayedActions()},Zapatec.Form.Field.DELAYED_INTERVAL);return true;};Zapatec.Form.Field.prototype.focus=function(evt){if(!evt){evt=window.event;}
if(this.field.readOnly){return;}
this.isEditing=true;this.firstRun=false;if(this.hasFeature("zpFormMask")){if(this.isEmpty()){this.setValue();this.setCaretPosition(0);}}
if(this.isBooleanField){this.booleanChanged(evt);}
this.fireEvent("focus",evt);this.fireEvent("all",evt,"focus");this.form.fireEvent("focus",evt);this.form.fireEvent("all",evt,"focus");this.validate();};Zapatec.Form.Field.prototype.blur=function(evt){if(!evt){evt=window.event;}
if(this.hasFeature("zpFormMask")&&!this.isFilled()){Zapatec.Form.Utils.setValue(this.field,"");}
if(!this.isEditing){return;}
this.isEditing=false;if(this.hasFeature("zpFormAllowedChars")){this.setValueFromField(true);}
this.fireEvent("blur",evt);this.fireEvent("all",evt,"blur");this.form.fireEvent("blur",evt);this.form.fireEvent("all",evt,"blur");this.validate();};Zapatec.Form.Field.prototype.validate=function(onlyValidate){if(!this.field.className||this.field.disabled){return null;}
var message=null;var errors=[];var isRequired=this.isRequired();var isEmpty=this.isEmpty();if(this.isBooleanField&&!isRequired){isEmpty=this.field.checked;}
if(this.firstRun&&!isEmpty||this.field.disabled){this.firstRun=false;}
var validatorUsed=isRequired;var validatorName=null;var l10nMessage=null;var messageArgument=null;function addError(self,errors,validatorName,l10nMessage,messageArgument){if(!validatorName){return null}
var message=self.hasFeature(validatorName+"Error")?self.getFeature(validatorName+"Error"):self.getMessage(l10nMessage,messageArgument);if(!message){message=self.getMessage(l10nMessage,messageArgument);}
message=message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\>/g,'&gt;');errors.push({field:self.field,errorMessage:message,validator:validatorName});return message;}
if(isEmpty){validatorUsed=true;if(isRequired){validatorName="zpFormRequired";l10nMessage="isRequiredError";}}else{for(var vName in this.features){if(vName=='zpFormMask'){validatorUsed=true;if(!this.isMaskFullyFilled()){validatorName="zpFormMask";l10nMessage='maskNotFilledError';messageArgument=this.getFeature("zpFormMask");break;}}
if(vName=='zpFormAutoCompleteStrict'){validatorUsed=true;var found=false;var currVal=this.getValue();for(var ii=this.autoCompleteOptions.length-1;ii>=0;ii--){if(currVal==this.autoCompleteOptions[ii]){found=true;break;}}
if(!found){validatorName="zpFormAutoCompleteStrict";l10nMessage="noSuchAutoCompleteValueError";}}
if(typeof(Zapatec.Form.dataTypes[vName])!='undefined'){validatorUsed=true;var validator=Zapatec.Form.dataTypes[vName];var validatorPassed=true;messageArgument=this.getFeature(vName);if(validator.regex){validatorPassed=validator.regex.test(this.getValue());}else if(validator.func){validatorPassed=validator.func(this.getValue(),this.getFeature(vName));}
if(!validatorPassed){validatorName=vName;l10nMessage=validator.error;}}
if(validatorName){message=addError(this,errors,validatorName,l10nMessage,messageArgument)||message;validatorName=null;}}
if(this.ajaxError!=null){validatorUsed=true;validatorName="zpFormValidate";l10nMessage=this.ajaxError;}}
message=addError(this,errors,validatorName,l10nMessage,messageArgument)||message;if(!onlyValidate&&validatorUsed){this.setImageStatus(message,isEmpty);}
return errors;};Zapatec.Form.Field.prototype.setImageStatus=function(status,isEmpty){var isRequired=this.isRequired();if(typeof(isEmpty)=='undefined'){isEmpty=this.isEmpty();}
this.requiredMark.className=Zapatec.Form.IGNORE_CLASSNAME+(isRequired?' zpIsRequired':' zpNotRequired');this.editingMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.emptyMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.validMark.className=Zapatec.Form.IGNORE_CLASSNAME;this.errorText.innerHTML="";if(this.config.formConfig.strict){if(status==null){this.form.toggleSubmits(this.form.validate()!=null);}else{this.form.toggleSubmits(true);}}
if(!this.firstRun&&(isRequired&&isEmpty||!isEmpty)){this.editingMark.className=Zapatec.Form.IGNORE_CLASSNAME+(this.isEditing?' zpIsEditing':' zpNotEditing');this.emptyMark.className=Zapatec.Form.IGNORE_CLASSNAME+(isEmpty?' zpIsEmpty':' zpNotEmpty');this.validMark.className=Zapatec.Form.IGNORE_CLASSNAME+(!status?' zpIsValid':' zpNotValid');if((isRequired&&isEmpty&&this.isEditing)||(this.isEditing&&!this.config.formConfig.displayErrorWhileTyping)){if(!(this.config.formConfig.showErrors=='tooltip'&&Zapatec.Tooltip)&&!this.isBooleanField){status=null;}}
if(!status){if(typeof(this.config.formConfig.showErrors)=='function'){this.config.formConfig.showErrors(this.field);}else if(this.tooltip){this.tooltip.hide();}else if(this.errorText){this.errorText.style.display="none";}}else if(status){if(this.config.formConfig.showErrors=='beforeField'||this.config.formConfig.showErrors=='afterField'||this.config.formConfig.showErrors=='last'){this.errorText.style.display="";this.errorText.innerHTML=status;}else if(typeof(this.config.formConfig.showErrors)=='function'){this.config.formConfig.showErrors(this.field,status);}else if(this.config.formConfig.showErrors=='tooltip'&&Zapatec.Tooltip){if(!this.tooltip){this.tooltip=new Zapatec.Tooltip({target:this.requiredMark,content:status,parent:this.form.container});}
this.tooltip.setContent(status);if(this.isEditing){var offs=Zapatec.Utils.getElementOffset(this.requiredMark);this.tooltip.show(offs.left,offs.top+offs.height);}else{this.tooltip.hide();}}else{this.statusImg.title=status;}}}};Zapatec.Form.Field.prototype.isEmpty=function(){if(!this.hasFeature("zpFormMask")){if(this.isBooleanField){if(this.field.checked){return false;}
for(var ii=this.otherFields.length-1;ii>=0;ii--){var element=this.otherFields[ii];if(element.checked){return false;}}
return true;}else{var currVal=this.getValue();return(currVal==null||currVal.length==0);}}else{for(ii=0;ii<this.enteredValue.length;ii++){if(typeof(this.chars[ii])!='string'&&this.enteredValue[ii]!=null){return false;}}
return true;}};Zapatec.Form.Field.prototype.isFilled=function(){if(this.hasFeature("zpFormMask")){for(ii=0;ii<this.enteredValue.length;ii++){if(typeof(this.chars[ii])!='string'&&this.enteredValue[ii]!=null){return true;}}
return false;}else{var currVal=this.getValue();return(currVal!=null&&currVal.length>0);}};Zapatec.Form.Field.prototype.isMaskFullyFilled=function(){if(this.hasFeature("zpFormMask")){for(ii=0;ii<this.enteredValue.length;ii++){if(typeof(this.chars[ii])!='string'&&this.enteredValue[ii]==null){return false;}}
return true;}else{return this.isFilled();}};Zapatec.Form.Field.prototype.hasFeature=function(feature){if(!feature||typeof(this.features[feature])=='undefined'){return false;}
return true;};Zapatec.Form.Field.prototype.getFeature=function(feature){return this.features[feature];};Zapatec.Form.Field.prototype.setFeature=function(feature,value){this.features[feature]=value;};Zapatec.Form.Field.prototype.isRequired=function(){var isRequired=this.getFeature("zpFormRequired");return isRequired;}
Zapatec.Form.Field.prototype.getNextAvailablePosition=function(pos){if(pos+1>=this.enteredValue.length){return null;}
if(typeof(this.chars[pos+1])=='string'){return this.getNextAvailablePosition(pos+1);}
return pos+1;};Zapatec.Form.Field.prototype.getPrevAvailablePosition=function(pos){if(pos-1<0){return null;}
if(typeof(this.chars[pos-1])=='string'){return this.getPrevAvailablePosition(pos-1);}
return pos-1;};Zapatec.Form.Field.prototype.setCaretPosition=function(startPos,endPos){var valLength=this.getValue().length;if(!this.isSelectionAppliable()||!this.isEditing){return null;}
if(isNaN(parseInt(startPos))){return false;}else{startPos=parseInt(startPos);if(startPos<0){startPos=0;}else if(startPos>valLength){startPos=valLength;}}
if(endPos==null||isNaN(parseInt(endPos))||parseInt(endPos)<startPos){endPos=startPos;}else{endPos=parseInt(endPos);if(endPos<0){endPos=0;}else if(endPos>valLength){endPos=valLength;}}
try{if(typeof(this.field.createTextRange)=="object"){var range=this.field.createTextRange();range.moveEnd("character",endPos-this.getValue().length);range.moveStart("character",startPos);range.select();return true;}else if(typeof(this.field.setSelectionRange)=='function'){this.field.setSelectionRange(startPos,endPos);return true;}}catch(e){}
return false;};Zapatec.Form.Field.prototype.getSelectionStart=function(){if(this.field.disabled||!this.isSelectionAppliable()||!this.isEditing){return 0;}
try{if(document.selection){return Math.abs(document.selection.createRange().moveStart("character",-1000000));}else if(typeof(this.field.selectionStart)!="undefined"){var selStart=this.field.selectionStart;if(selStart==2147483647){selStart=0;}
return selStart;}}catch(e){}
return 0;};Zapatec.Form.Field.prototype.getSelectionEnd=function(){if(this.field.disabled||!this.isSelectionAppliable()||!this.isEditing){return 0;}
try{if(document.selection){return this.field.value.length-Math.abs(document.selection.createRange().moveEnd("character",1000000));}else if(typeof(this.field.selectionEnd)!="undefined"){return this.field.selectionEnd;}}catch(e){}
return 0;};Zapatec.Form.Field.prototype.processCustomKeys=function(charCode){var selStart=this.getSelectionStart();var selEnd=this.getSelectionEnd();if(selStart==selEnd){if(charCode==8){var newPos=this.getPrevAvailablePosition(selStart);if(newPos==null||newPos==selStart){return false;}
this.enteredValue[newPos]=null;this.setValue();this.setCaretPosition(newPos+(Zapatec.is_opera?1:0));return false;}
if(charCode==46){if(typeof(this.chars[selStart])=='string'){return false;}
this.enteredValue[selStart]=null;this.setValue();this.setCaretPosition(selStart)
return false;}}else{if(charCode==8||charCode==46){for(var ii=selStart;ii<selEnd;ii++){if(typeof(this.chars[ii])!='string'){this.enteredValue[ii]=null;}}
this.setValue();this.setCaretPosition(selStart+(Zapatec.is_opera?1:0));return false;}}
return true;};Zapatec.Form.Field.prototype.processFunctionalKeys=function(evt){var tmpArr=Zapatec.Utils.getCharFromEvent(evt)
var charCode=tmpArr.charCode;var newChar=tmpArr.chr;if(evt.ctrlKey||(typeof(evt.metaKey)!='undefined'&&evt.metaKey)){if(charCode==8){this.setCaretPosition(0,this.getSelectionStart());return false;}else if(charCode==46){this.setCaretPosition(this.getSelectionStart(),this.getValue().length);return false;}else if(newChar=='v'||newChar=='V'){this.setValueFromField();return true;}
return true;}else if(evt.shiftKey){if(charCode==37||charCode==39){return true;}else if(charCode==45){this.setValueFromField();return true;}}else if(evt.altKey){return true;}
return false;};Zapatec.Form.Field.prototype.setValueFromField=function(runImmediately){if(!runImmediately){var self=this;setTimeout(function(){self.setValueFromField(true);},1);return;}
var selStart=this.getSelectionStart();var selEnd=this.getSelectionEnd();var editMode=this.isEditing;this.isEditing=true;this.setValue(Zapatec.Form.Utils.getValue(this.field));if(this.isBooleanField){this.booleanChanged();}
this.isEditing=editMode;this.validate();if(!this.isEditing){this.blur();}else{this.setCaretPosition(selStart,selEnd);}};Zapatec.Form.Field.prototype.getValue=function(){return Zapatec.Form.Utils.getValue(this.field);}
Zapatec.Form.Field.prototype.setValue=function(value){if(value==null){value="";}
if(this.hasFeature('zpFormAllowedChars')){var notallowed=new RegExp('[^'+this.getFeature('zpFormAllowedChars')+']','g');value=value.replace(notallowed,"");}
if(this.hasFeature('zpFormMask')){var val="";if(this.isEditing||this.isFilled()){for(ii=0;ii<this.chars.length;ii++){if(ii<value.length){if(typeof(this.chars[ii])!="string"){if(this.chars[ii].test(value.charAt(ii))){this.enteredValue[ii]=value.charAt(ii);val+=value.charAt(ii);}else{this.enteredValue[ii]=null;if(this.config.formConfig.maskPlaceholder){val+=this.config.formConfig.maskPlaceholder;}}}else{this.enteredValue[ii]=this.chars[ii];val+=this.chars[ii];}}else if(arguments.length>0){if(typeof(this.chars[ii])=='string'){val+=this.chars[ii];}else{this.enteredValue[ii]=null;if(this.config.formConfig.maskPlaceholder){val+=this.config.formConfig.maskPlaceholder;}}}else{if(typeof(this.chars[ii])=='string'){val+=this.chars[ii];}else{var tempHolderString;if(this.config.formConfig.maskPlaceholder){tempHolderString=this.config.formConfig.maskPlaceholder;}else{tempHolderString="";}
val+=this.enteredValue[ii]==null?tempHolderString:this.enteredValue[ii];}}}}
value=val;}
var oldScrollTop=null;var oldScrollLeft=null;if(this.field.nodeName.toLowerCase()=='textarea'&&typeof(this.field.scrollTop)!='undefined'){oldScrollTop=this.field.scrollTop;oldScrollLeft=this.field.scrollLeft;}
var retVal=Zapatec.Form.Utils.setValue(this.field,value);if(this.field.nodeName.toLowerCase()=='textarea'&&oldScrollTop!=null){this.field.scrollTop=oldScrollTop;this.field.scrollLeft=oldScrollLeft;}
return retVal;};Zapatec.Form.Field.prototype.runDelayedActions=function(){this.keyPressCounter--;if(this.keyPressCounter!=0){return null;}
this.ajaxValidate();this.suggestValue();this.ajaxFill();};Zapatec.Form.Field.prototype.ajaxValidate=function(){if(!this.hasFeature("zpFormValidate")){return null;}
var valid=this.validate();if(!(valid==null||valid!=null&&(valid.length==0||valid.length==1&&valid[0].validator=="zpFormValidate"))){return null;}
var submitUrl=this.getFeature("zpFormValidate");var submitMethod=this.getFeature("zpFormValidateMethod");var submitParam=this.getFeature("zpFormValidateParam");var submitQuery=this.getFeature("zpFormValidateQuery");if(typeof(submitMethod)!='string'){submitMethod="GET"}
if(typeof(submitParam)!='string'){submitParam=this.field.name;}
if(typeof(submitQuery)!='string'){submitQuery="";}
submitQuery+="&"+encodeURIComponent(submitParam)+"="+encodeURIComponent(this.getValue());if(submitUrl.indexOf("?")<0){submitUrl+="?";}
submitUrl+="&"+Math.random();if(submitMethod=='GET'){submitUrl+="&"+submitQuery;}
this.fetchingMark.className="zpIsFetching "+Zapatec.Form.IGNORE_CLASSNAME;var self=this;if(this.config.formConfig.ajaxDebugFunc){this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugSeparator'));this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugValidateTitle',this.field.name));this.config.formConfig.ajaxDebugFunc(submitMethod+" "+submitUrl);this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugQuery',("GET"?"":submitQuery)));}
Zapatec.Transport.fetch({url:submitUrl,content:submitMethod=="GET"?null:submitQuery,method:submitMethod,onLoad:function(objText){if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponse',objText.responseText));}
self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+"zpNotFetching";if(objText.responseText==null){Zapatec.Log({description:self.getMessage('ajaxValidateNoResponseError',objText.responseText)});return null;}
var objResponse=Zapatec.Transport.parseJson({strJson:objText.responseText});if(objResponse==null){Zapatec.Log({description:self.getMessage('ajaxValidateCantParseError',objText.responseText)});return null;}
if(!objResponse.success){self.ajaxError=typeof(objResponse.generalError)!='string'||objResponse.generalError.length==0?self.getMessage('ajaxValidateValidationError'):objResponse.generalError;}else{self.ajaxError=null;}
self.validate();},onError:function(objError){var strError='';if(objError.errorCode){strError+=objError.errorCode+' ';}
strError+=objError.errorDescription;self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+" zpNotFetching";alert(strError);self.ajaxError=null;if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponseError',strError));}}});};Zapatec.Form.Field.prototype.ajaxFill=function(){if(!this.hasFeature("zpFormFillUrl")){return null;}
var submitUrl=this.getFeature("zpFormFillUrl");var submitMethod=this.getFeature("zpFormFillMethod");var submitParam=this.getFeature("zpFormFillParam");var submitQuery=this.getFeature("zpFormFillQuery");if(typeof(submitMethod)!='string'){submitMethod="GET";}
if(typeof(submitParam)!='string'){submitParam=this.field.name;}
if(typeof(submitQuery)!='string'){submitQuery="";}
submitQuery+="&"+encodeURIComponent(submitParam)+"="+encodeURIComponent(this.getValue());if(submitUrl.indexOf("?")<0){submitUrl+="?";}
submitUrl+="&"+Math.random();if(submitMethod=='GET'){submitUrl+="&"+submitQuery;}
this.fetchingMark.className="zpIsFetching "+Zapatec.Form.IGNORE_CLASSNAME;var self=this;if(this.config.formConfig.ajaxDebugFunc){this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugSeparator'));this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugFillTitle',this.field.name));this.config.formConfig.ajaxDebugFunc(submitMethod+" "+submitUrl);this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugQuery',("GET"?"":submitQuery)));}
Zapatec.Transport.fetch({url:submitUrl,content:submitMethod=="GET"?null:submitQuery,method:submitMethod,onLoad:function(objText){if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponse',objText.responseText));}
self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+" zpNotFetching";if(objText.responseText==null){Zapatec.Log({description:self.getMessage('ajaxFillNoResponseError',objText.responseText)});return null;}
var objResponse=Zapatec.Transport.parseJson({strJson:objText.responseText});if(objResponse==null){Zapatec.Log({description:self.getMessage('ajaxFillCantParseError',objText.responseText)});return null;}
if(!objResponse.success){self.ajaxError=typeof(objResponse.generalError)!='string'||objResponse.generalError.length==0?self.getMessage('ajaxFillGeneralError'):objResponse.generalError;}else{self.ajaxError=null;var formObject=self.form;var fillData=objResponse.fillData;if(fillData.length==0){return null;}else{var fields=fillData[0];for(var ii=0;ii<fields.length;ii++){var field=formObject.container.elements[fields[ii]['fieldName']];if(!field){continue;}
Zapatec.Form.Utils.setValue(field,fields[ii]['fieldValue']);if(field.zpFormField){field.zpFormField.setValueFromField(true);}}}}
self.validate();},onError:function(objError){var strError='';if(objError.errorCode){strError+=objError.errorCode+' ';}
strError+=objError.errorDescription;self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+" zpNotFetching";alert(strError);self.ajaxError=null;if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponseError',strError));}}});};Zapatec.Form.Field.prototype.suggestValue=function(showAll){if(!this.hasFeature("zpFormSuggest")||!showAll&&this.isEmpty()){return null;}
var suggestUrl=this.getFeature("zpFormSuggest");var suggestMethod=this.getFeature("zpFormSuggestMethod");var suggestParam=this.getFeature("zpFormSuggestParam");var suggestQuery=this.getFeature("zpFormSuggestQuery");if(typeof(suggestMethod)!='string'){suggestMethod="GET";}
if(typeof(suggestParam)!='string'){suggestParam=this.field.name;}
if(typeof(suggestQuery)!='string'){suggestQuery="";}
suggestQuery+="&"+encodeURIComponent(suggestParam)+"="+(showAll?"":encodeURIComponent(this.getValue()));if(suggestUrl.indexOf("?")<0){suggestUrl+="?";}
suggestUrl+="&"+Math.random();if(suggestMethod=='GET'){suggestUrl+="&"+suggestQuery;}
this.fetchingMark.className="zpIsFetching "+Zapatec.Form.IGNORE_CLASSNAME;var self=this;if(this.config.formConfig.ajaxDebugFunc){this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugSeparator'));this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugSuggestTitle',this.field.name));this.config.formConfig.ajaxDebugFunc(suggestMethod+" "+suggestUrl);this.config.formConfig.ajaxDebugFunc(this.getMessage('ajaxDebugQuery',("GET"?"":suggestQuery)));}
Zapatec.Transport.fetch({url:suggestUrl,content:suggestMethod=="GET"?null:suggestQuery,method:suggestMethod,onLoad:function(objText){if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponse',objText.responseText));}
self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+" zpNotFetching";if(objText.responseText==null){Zapatec.Log({description:self.getMessage('ajaxSuggestNoResponseError',objText.responseText)});return null;}
var objResponse=Zapatec.Transport.parseJson({strJson:objText.responseText});if(objResponse==null){Zapatec.Log({description:self.getMessage('ajaxSuggestCantParseError',objText.responseText)});return null;}
if(!objResponse.success){alert(typeof(objResponse.generalError)!='string'||objResponse.generalError.length==0?self.getMessage('ajaxSuggestGeneralError'):objResponse.generalError);}else{self.autoCompleteValue(objResponse);}
self.validate();},onError:function(objError){var strError='';if(objError.errorCode){strError+=objError.errorCode+' ';}
strError+=objError.errorDescription;self.fetchingMark.className=Zapatec.Form.IGNORE_CLASSNAME+" zpNotFetching";Zapatec.Log({description:strError});if(self.config.formConfig.ajaxDebugFunc){self.config.formConfig.ajaxDebugFunc(self.getMessage('ajaxDebugResponseError',strError));}}});};Zapatec.Form.Field.prototype.getAutoCompleteOptions=function(showAll){var opts={body:[]};var currVal=this.getValue();if(this.hasFeature("zpFormAutoComplete")||this.hasFeature("zpFormAutoCompleteStrict")){for(var ii=0;ii<this.autoCompleteOptions.length;ii++){if((this.hasFeature("zpFormAutoCompleteStrict")?this.autoCompleteOptions[ii].substring(0,currVal.length):this.autoCompleteOptions[ii].substring(0,currVal.length).toLowerCase())==(this.hasFeature("zpFormAutoCompleteStrict")?currVal:currVal.toLowerCase())||showAll){opts.body.push([this.autoCompleteOptions[ii]]);}}}
return opts;};Zapatec.Form.Field.prototype.autoCompleteValue=function(opts){if(typeof(opts)=='undefined'||opts.body==null||opts.body.length==0||(opts.body.length==1&&opts.body[0][0]=="")){if(this.dropDown){this.dropDown.config.source={tips:[]};this.dropDown.loadData();this.dropDown.hide();}
return;}
var currValue=this.getValue();var retrValue=null;var firstValue=opts.body[0][0];if(firstValue.substring(0,currValue.length).toLowerCase()==currValue.toLowerCase()){retrValue=firstValue.substring(currValue.length);this.setValue(currValue+retrValue);this.setCaretPosition(currValue.length,this.getValue().length);}
this.validate();if(this.dropDown){if(opts.body.length==1){this.dropDown.config.source={tips:[]};this.dropDown.loadData();this.dropDown.hide();}else{this.dropDown.config.sourceType="json";var tips=[];for(var ii=0;ii<opts.body.length;ii++){var option=opts.body[ii];var tmp={};tmp.title=option.join(" ");tips.push(tmp);}
this.dropDown.config.source={tips:tips};this.dropDown.loadData();this.dropDown.show();}}};Zapatec.Form.Field.prototype.isSelectionAppliable=function(){var nodeName=this.field.nodeName.toLowerCase();var inputType=nodeName=='input'?this.field.type.toLowerCase():null;return(nodeName=="body"||nodeName=="button"||nodeName==="textarea"||nodeName=="input"&&(inputType=="button"||inputType=="hidden"||inputType=="password"||inputType=="reset"||inputType=="submit"||inputType=="text"))};Zapatec.Form.Field.prototype.destroy=function(){this.discard();};Zapatec.Form.dataTypes={};Zapatec.Form.Validator=[];Zapatec.Form.Validator.addDataType=function(zpName,name,regex,error,help,func){Zapatec.Form.dataTypes[zpName]={zpName:zpName,name:name,regex:regex,error:error,help:help,func:func};};Zapatec.Form.addDataType=Zapatec.Form.Validator.addDataType;Zapatec.Form.Validator.isDomainValid=function(domain){if(typeof(domain)!='string'){return false;}
for(i=0;i<domain.length;i++){if(domain.charCodeAt(i)>127){return false;}}
var ipDigit="(0?0?\\d|[01]?\\d\\d|2[0-4]\\d|25[0-6])";var ipRE=new RegExp("^"+ipDigit+"\\."+ipDigit+"\\."+ipDigit+"\\."+ipDigit+"$");if(ipRE.test(domain)){return true;}
var domains=domain.split(".");if(domains.length<2){return false;}
for(i=0;i<domains.length-1;i++){if(!(/^[a-zA-Z0-9\-]+$/).test(domains[i])){return false;}}
if(domains[domains.length-2].length<2){return false;}
if(!(/^[a-zA-Z]{2,}$/).test(domains[domains.length-1])){return false;}
return true;};Zapatec.Form.Validator.isUrlValid=function(url){if(typeof(url)!='string'){return false;}
var domain=url;var protocolSeparatorPos=url.indexOf("://");var domainSeparatorPos=url.indexOf("/",protocolSeparatorPos+3);if(protocolSeparatorPos==0){return false;}
domain=url.substring((protocolSeparatorPos>0?protocolSeparatorPos+3:0),(domainSeparatorPos>0?domainSeparatorPos:url.length));var portSeparatorPos=domain.indexOf(":");if(portSeparatorPos>0){var port=domain.substring(portSeparatorPos+1);if(!port.match(/\d+/)){return false;}
domain=domain.substring(0,portSeparatorPos);}
return Zapatec.Form.Validator.isDomainValid(domain);};Zapatec.Form.Validator.isEmailValid=function(email){if(email==null){return false;}
var atPos=email.indexOf("@");if(atPos<1||email.indexOf(".",atPos)==-1){return false;}
var login=email.substring(0,atPos);var domain=email.substring(atPos+1,email.length);var atom="\[^\\s\\(\\)><@,;:\\\\\\\"\\.\\[\\]\]+";var word="("+atom+"|(\"[^\"]*\"))";var loginRE=new RegExp("^"+word+"(\\."+word+")*$");for(i=0;i<login.length;i++){if(login.charCodeAt(i)>127){return false;}}
if(!login.match(loginRE)){return false;}
return Zapatec.Form.Validator.isDomainValid(domain);};Zapatec.Form.Validator.isCreditCardValid=function(cardNumber){if(cardNumber==null){return false;}
var cardDigits=cardNumber.replace(/\D/g,"");var parity=cardDigits.length%2;var sum=0;for(var ii=0;ii<cardDigits.length;ii++){var digit=cardDigits.charAt(ii);if(ii%2==parity)
digit=digit*2;if(digit>9)
digit=digit-9;sum+=parseInt(digit);}
return((sum!=0)&&(sum%10==0));};Zapatec.Form.Validator.isDateValid=function(str,fmt){if(fmt==null||fmt==""){fmt="%m/%d/%y";}
var separator=" ";var nums=fmt.split(separator);if(nums.length<3){separator="/";nums=fmt.split(separator);if(nums.length<3){separator=".";nums=fmt.split(separator);if(nums.length<3){separator="-";nums=fmt.split(separator);if(nums.length<3){separator=null;}}}}
if(separator==null){return false;}
var y=null;var m=null;var d=null;var a=str.split(separator);if(a.length!=3){return false;}
var b=fmt.match(/%./g);var nlDays=[31,28,31,30,31,30,31,31,30,31,30,31];var lDays=[31,29,31,30,31,30,31,31,30,31,30,31];for(var i=0;i<a.length;++i){if(!a[i])
continue;switch(b[i]){case"%d":case"%e":d=parseInt(a[i],10);if(d<=0||d>31)
d=-1;break;case"%m":m=parseInt(a[i],10)-1;if(m>11||m<0)
m=-1;break;case"%Y":case"%y":y=parseInt(a[i],10);(y<100)&&(y+=(y>29)?1900:2000);break;}}
if(y==null||m==null||d==null||isNaN(y)||isNaN(m)||isNaN(d)){return false;}
if(m!=-1){if((y%4)==0){if((y%100)==0&&(y%400)!=0){if(d>nlDays[m]){d=-1;}}
if(d>lDays[m]){d=-1;}}else{if(d>nlDays[m]){d=-1;}}}
if(y!=0&&m!=-1&&d!=-1){return true;}
return false;};Zapatec.Form.Validator.hasMinLength=function(str,length){return(str+"").length>=parseInt(length);}
Zapatec.Form.Validator.hasMaxLength=function(str,length){return(str+"").length<=parseInt(length);}
Zapatec.Form.Validator.addDataType('zpFormUrl','A URL -- web address',null,'invalidURLError',"Valid URL needs to be in the form http://www.yahoo.com:80/index.html or just www.yahoo.com",Zapatec.Form.Validator.isUrlValid);Zapatec.Form.Validator.addDataType('zpFormEmail','An Email Address',null,'invalidEmailError',"Valid email address need to be in the form of nobody@example.com",Zapatec.Form.Validator.isEmailValid);Zapatec.Form.Validator.addDataType('zpFormCreditCard','Credit card number',null,'invalidCreditCardError',"Please enter valid credit card number",Zapatec.Form.Validator.isCreditCardValid);Zapatec.Form.Validator.addDataType('zpFormUSPhone','A USA Phone Number',/^((\([1-9][0-9]{2}\) *)|([1-9][0-9]{2}[\-. ]?))(\d[ -]?){6}\d *(ex[t]? *[0-9]+)?$/,'invalidUSPhoneError',"Valid US Phone number needs to be in the form of 'xxx xxx-xxxx' For instance 312 123-1234. An extention can be added as ext xxxx. For instance 312 123-1234 ext 1234",null);Zapatec.Form.Validator.addDataType('zpFormInternationalPhone','An international Phone Number',/^\+\d{1,3}[ -]\d{2,3}[ -](\d[ -]?){6}\d *(ex[t]? *[0-9]+)?$/,'invalidInternationalPhoneError',"Valid internation phone number needs to be in the form of '+x xxx xxx-xxxx' For instance +1 234 567-9012. An extention can be added as ext xxxx. For instance +1 234 567-9012 ext 1234",null);Zapatec.Form.Validator.addDataType('zpFormUSZip','A USA Zip Number',/(^\d{5}$)|(^\d{5}-\d{4}$)/,'invalidUSZipError',"Valid US Zip number needs to be either in the form of '99999', for instance 94132 or '99999-9999' for instance 94132-3213",null);Zapatec.Form.Validator.addDataType('zpFormDate','A Valid Date',null,'invalidDateError',"Please enter a valid date",Zapatec.Form.Validator.isDateValid);Zapatec.Form.Validator.addDataType('zpFormInt','An Integer',null,'invalidIntError',"Please enter an integer",function(number){return/^\d+$/.test(number);});Zapatec.Form.Validator.addDataType('zpFormFloat','A Floating Point Number',null,'invalidFloatError',"Please enter a Floating Point Number",function(number){var parsed=parseFloat(number);return(parsed==number);});Zapatec.Form.Validator.addDataType('zpFormMinLength','Min length',null,'minLengthError',"Value is too short",Zapatec.Form.Validator.hasMinLength);Zapatec.Form.Validator.addDataType('zpFormMaxLength','Max length',null,'maxLengthError',"Value is too long",Zapatec.Form.Validator.hasMaxLength);Zapatec.Form.Utils=[];Zapatec.Form.Utils.getTokens=function(className,separator){if(typeof(separator)!='string'||separator.length==0){separator=" ";}
var arr={};if(className!=null&&className.length>0){var isInQuotes=false;var quoteChar=null;var key="";var value="";var isInValue=false;for(var ii=0;ii<className.length;ii++){var currChar=className.charAt(ii);if(currChar=="\\"){ii++;currChar=className.charAt(ii);}else if(!isInValue&&currChar=="="){isInValue=true;var nextChar=className.charAt(ii+1);if(nextChar=="'"||nextChar=='"'){quoteChar=nextChar;ii++;}
continue;}else if(currChar==" "){if(key.length==0){continue;}
if(quoteChar!=null){if(quoteChar==value.charAt(value.length-1)){quoteChar=null;value=value.substr(0,value.length-1);}else{value=quoteChar+value;}}
arr[key]=value.length==0?null:value;isInValue=false;key="";value="";quoteChar=null;continue;}
if(ii<className.length){if(isInValue){value+=currChar;}else{key+=currChar;}}}
if(key.length>0){if(quoteChar!=null){if(quoteChar==value.charAt(value.length-1)){quoteChar=null;value=value.substr(0,value.length-1);}else{value=quoteChar+value;}}
arr[key]=(value.length==0?null:value);}}
return arr;};Zapatec.Form.Utils.toggleFormElements=function(field,show,useVisibility){field=Zapatec.Widget.getElementById(field);if(field==null){return null;}
var inputs=Zapatec.Form.Utils.getFormElements(field);for(var ii=0;ii<inputs.length;ii++){var input=inputs[ii];if(show){if(typeof(input.zpOrigDisabled)!='undefined'){input.disabled=input.zpOrigDisabled;var undef;input.zpOrigDisabled=undef;}}else{if(typeof(input.zpOrigDisabled)=='undefined'){input.zpOrigDisabled=input.attributes["disabled"]&&input.getAttribute("disabled")!=""?input.getAttribute("disabled"):false;input.disabled=true;}}
if(show&&input.zpFormField!=null){input.zpFormField.validate();}}
if(useVisibility){field.style.visibility=(show?'visible':'hidden');}else{field.style.display=(show?'':'none');}};Zapatec.Form.Utils.getFormElements=function(el){el=Zapatec.Widget.getElementById(el);if(el==null){return null;}
var inputs=[];var children=el.all?el.all:el.getElementsByTagName("*");for(var ii=0;ii<children.length;ii++){if(Zapatec.Form.Utils.isInputField(children[ii])){inputs.push(children[ii]);}}
return inputs;};Zapatec.Form.Utils.getValue=function(element){element=Zapatec.Widget.getElementById(element);if(element==null||typeof(element.tagName)=='undefined'){return null;}
switch(element.tagName.toLowerCase()){case"select":if(!Zapatec.is_ie&&element.hasAttribute("multiple")||Zapatec.is_ie&&element.attributes['multiple']&&element.attributes['multiple'].nodeValue){var res=[];for(var ii=0;ii<element.options.length;ii++){var oOption=element.options[ii];if(oOption.selected){res.push(oOption.value)}}
return res;}else{if(element.selectedIndex<0){return"";}
var option=element.options[element.selectedIndex];if(option!=null){return option.value;}else{return"";}}
case"input":return element.value;case"textarea":return element.value;}
return null;};Zapatec.Form.Utils.setValue=function(element,value){element=Zapatec.Widget.getElementById(element);if(element==null||typeof(element.tagName)=='undefined'){return null;}
switch(element.tagName.toLowerCase()){case"input":var elType=element.type.toLowerCase();if(elType!="file"&&elType!="button"){element.value=value;}
break;case"textarea":element.value=value;break;case"select":if((!Zapatec.is_ie&&element.hasAttribute("multiple")||element.attributes['multiple'])&&value.length){for(var ii=element.options.length-1;ii>=0;ii--){var oOption=element.options[ii];for(var jj=value.length;jj>=0;jj--){if(oOption.value==value[jj]){oOption.selected=true;break;}}}}else{for(var i=0;i<element.options.length;i++){if(element.options[i].value==value){element.selectedIndex=i;break;}}}}
return value;};Zapatec.Form.Utils.isInputField=function(el){if(el.nodeType!=1){return false;}
var nodeName=el.nodeName.toLowerCase();return(nodeName=='input'||nodeName=='textarea'||nodeName=='select');};Zapatec.Form.Utils.ignoreField=function(field){field=Zapatec.Widget.getElementById(field);if(!field||field.nodeType!=1||(field.className&&/\bzpIgnoreField\b/.test(field.className))||!Zapatec.Form.Utils.isInputField(field)||(field.nodeType==1&&field.nodeName.toLowerCase()=='fieldset')){return true;}
var type=field.type.toLowerCase();var ignoreList=['submit','reset','button'];for(var ii=0;ii<ignoreList.length;ii++){if(type.toLowerCase()==ignoreList[ii]){return true;}}
return false;};Zapatec.Form.Utils.isSpecialKey=function(charCode,newChar){return((newChar==null&&charCode!=8&&charCode!=46)||charCode==9||charCode==13||charCode==16||charCode==17||charCode==18||charCode==20||charCode==27||charCode==33||charCode==34||charCode==35||charCode==36||charCode==37||charCode==38||charCode==39||charCode==40||charCode==45||charCode==144||charCode>256);};Zapatec.Form.Utils.initMultipleField=function(currEl,firstRun,form){var md=null;if(!currEl||!currEl.className||!(md=currEl.className.match(/zpFormMultiple(Inside|Outside)?/))||currEl.zpRelatedElements!=null){return null;}
var outside=true;if(md[1]=="Inside"||currEl.nodeName.toLowerCase()=="td"||currEl.nodeName.toLowerCase()=="th"||currEl.nodeName.toLowerCase()=="tr"){outside=false;}
if(currEl.nodeName.toLowerCase()=="input"||currEl.nodeName.toLowerCase()=="textarea"||currEl.nodeName.toLowerCase()=="select"||currEl.nodeName.toLowerCase()=="image"){outside=true;}
var appendEl=currEl;if(currEl.nodeName.toLowerCase()=="tr"){function findParentTable(el){if(el.parentNode!=null&&el.parentNode.nodeType==1&&el.parentNode.tagName.toLowerCase()!="table"){return findParentTable(el.parentNode);}
return el.parentNode;}
var table=findParentTable(currEl);for(var jj=table.rows.length-1;jj>=0;jj--){var td=document.createElement('td');td.className=Zapatec.Form.IGNORE_CLASSNAME;td.innerHTML="&nbsp;";if(jj==currEl.rowIndex||table.rows[jj]==currEl){appendEl=td;}
if(firstRun||jj==currEl.rowIndex){table.rows[jj].appendChild(td);}}}
var button=Zapatec.Utils.createElement('input');button.type="button";button.className=Zapatec.Form.IGNORE_CLASSNAME+" multipleButton";Zapatec.Utils.createProperty(button,"zpMultipleElement",currEl);if(currEl.zpOriginalNode==null){Zapatec.Utils.createProperty(currEl,"zpMultipleChildren",[]);Zapatec.Utils.createProperty(currEl,"zpMultipleChilds",[]);button.value="+";button.onclick=function(){if(!this.disabled){Zapatec.Form.Utils.cloneElement(currEl,form);}}}else{button.value="-";var parent=currEl.zpOriginalNode;parent.zpMultipleChilds.push(currEl);parent.zpMultipleChildren.push(currEl);button.onclick=function(){if(!this.disabled){Zapatec.Form.Utils.removeClonedElement(currEl,form);}}}
if(outside){Zapatec.Utils.insertAfter(appendEl,button);}else{if(form.config.showErrors=='last'){var childrenCount=appendEl.childNodes.length;appendEl=appendEl.childNodes[childrenCount-1];while(appendEl.nodeType!=1||(appendEl.id&&appendEl.id.match(/ErrorText$/))){appendEl=appendEl.previousSibling;}
appendEl=appendEl.nextSibling;appendEl.parentNode.insertBefore(button,appendEl);}
else{appendEl.appendChild(button);}}
Zapatec.Utils.createProperty(currEl,"zpRelatedElements",[button,currEl]);Zapatec.Utils.createProperty(currEl,"zpMultipleButton",button);var tokens=Zapatec.Form.Utils.getTokens(currEl.className);if(typeof(tokens['zpFormMultipleLimit'])!='undefined'&&!isNaN(parseInt(tokens['zpFormMultipleLimit']))){Zapatec.Utils.createProperty(currEl,"zpFormMultipleLimit",parseInt(tokens['zpFormMultipleLimit'])-2);if(isNaN(currEl.zpFormMultipleLimit)){currEl.zpFormMultipleLimit=-1;}}else{Zapatec.Utils.createProperty(currEl,"zpFormMultipleLimit",-1);}
if(currEl.zpFormField!=null){currEl.zpRelatedElements=[currEl.zpFormField.statusImg1,currEl.zpFormField.statusImg2,currEl.zpFormField.statusImg3,currEl.zpFormField.statusImg4,currEl.zpFormField.statusImg,currEl.zpFormField.errorText].concat(currEl.zpRelatedElements);}else{Zapatec.Utils.createProperty(currEl,"zpLastNode",(outside?button:currEl));}};Zapatec.Form.Utils.cloneElement=function(field,form){if(field.zpFormMultipleLimit>=0&&field.zpMultipleChildren!=null&&field.zpMultipleChildren.length>field.zpFormMultipleLimit){return false;}
var insertAfterNode=field.zpLastNode;if(field.zpMultipleChildren!=null&&field.zpMultipleChildren.length>0){insertAfterNode=field.zpMultipleChildren[field.zpMultipleChildren.length-1].zpLastNode;}
var clone=field.cloneNode(true);Zapatec.Utils.createProperty(clone,"zpOriginalNode",field);Zapatec.Utils.insertAfter(insertAfterNode,clone);var childElements=[clone];var originalElements=[field];var tmpArr=clone.all?clone.all:clone.getElementsByTagName("*");var originalArr=field.all?field.all:field.getElementsByTagName("*");for(var ii=0;ii<tmpArr.length;ii++){childElements.push(tmpArr[ii]);originalElements.push(originalArr[ii]);}
for(var ii=0;ii<childElements.length;ii++){var currEl=childElements[ii];if(currEl.className.indexOf(Zapatec.Form.IGNORE_CLASSNAME)>=0){Zapatec.Utils.destroy(currEl);continue;}
if(Zapatec.Form.Utils.isInputField(currEl)){Zapatec.Form.Utils.setValue(currEl,"");if(currEl.form&&currEl.form.zpForm){var zpForm=currEl.form.zpForm;var zpField=originalElements[ii].zpFormField;currEl.zpFormField=null;new Zapatec.Form.Field({form:zpForm,field:currEl,langId:zpForm.config.langId,lang:zpForm.config.lang,langCountryCode:zpForm.config.langCountryCode,langEncoding:zpForm.config.langEncoding,formConfig:(zpForm?zpForm.config:{}),inheritFrom:zpField});}}
currEl.zpMultipleElement=null;currEl.zpMultipleChilds=null;currEl.zpMultipleChildren=null;currEl.zpRelatedElements=null;currEl.zpMultipleButton=null;currEl.zpFormMultipleLimit=null;Zapatec.Form.Utils.initMultipleField(currEl,false,form);if(form&&typeof(form.config.multipleCallback)=='function'){form.config.multipleCallback(field,clone,currEl,field.zpMultipleChildren);}}
if(field.zpFormMultipleLimit>=0&&field.zpMultipleChildren!=null&&field.zpMultipleChildren.length>field.zpFormMultipleLimit){field.zpMultipleButton.style.visibility='hidden';field.zpMultipleButton.disabled=true;}
if(form){form.fireEvent("afterCloneMultiple",field,clone);}
return clone;};Zapatec.Form.Utils.removeClonedElement=function(field,form){if(field==null||field.zpOriginalNode==null){return false;}
var children=field.zpOriginalNode.zpMultipleChildren;if(form){form.fireEvent("beforeDeleteMultiple",field,field.zpOriginalNode);}
for(var ii=0;ii<children.length;ii++){if(children[ii]==field){var original=field.zpOriginalNode;original.zpMultipleChilds=children.slice(0,ii).concat(children.slice(ii+1));original.zpMultipleChildren=children.slice(0,ii).concat(children.slice(ii+1));if(original.zpFormMultipleLimit>=0&&original.zpMultipleChildren.length<=original.zpFormMultipleLimit){original.zpMultipleButton.style.visibility='visible';original.zpMultipleButton.disabled=false;}
break;}}
if(field.zpRelatedElements!=null&&field.zpRelatedElements.length>0){for(var ii=0;ii<field.zpRelatedElements.length;ii++){if(typeof(field.zpRelatedElements[ii])!='undefined'&&field.zpRelatedElements[ii]!=null){Zapatec.Utils.destroy(field.zpRelatedElements[ii]);}}}};Zapatec.Form.Utils.generateMultipleId=function(original,cloneParent,cloned,children){if(!cloneParent.zpIsCloned){cloneParent.zpIsCloned=true;}
if(typeof(cloned.id)!='undefined'&&cloned.id!=null&&cloned.id!=""){cloned.id+="-"+original.zpMultipleChildren.length;}
if(typeof(cloned.name)!='undefined'&&cloned.name!=null&&cloned.name!=""){cloned.name+="-"+original.zpMultipleChildren.length;}};Zapatec.Form.Utils.beforeDeleteMultiple=function(el,original){if(!el||!original||!original.zpMultipleChildren){return;}
var cc=1;for(var ii=0;ii<original.zpMultipleChildren.length;ii++){var node=original.zpMultipleChildren[ii];if(node===el){continue;}
var childElements=[node];var tmpArr=node.all?node.all:node.getElementsByTagName("*");for(var jj=0;jj<tmpArr.length;jj++){childElements.push(tmpArr[jj]);}
for(var jj=0;jj<childElements.length;jj++){var currEl=childElements[jj];if(currEl.id){currEl.id=currEl.id.replace(/-\d+$/,"-"+cc);}
if(currEl.name){currEl.name=currEl.name.replace(/-\d+$/,"-"+cc);}}
cc++;}}
Zapatec.Utils.addEvent(window, 'load', Zapatec.Utils.checkActivation);
