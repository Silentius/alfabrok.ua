function startYSearchProcess(){yLoading.start();imDataS=[];imDataSY=[];startYSearch();$("#CountSearchIm").show();$("#YHelp").hide();$("#showHelp").show();$("#hideHelp").hide()}function setHelpSearch(a,c){setActiveTypeIm(a);$("#blck-"+a+" input:checkbox").attr("checked","checked");$("#accYMapSearchTypeIm").accordion("activate",c);startYSearchProcess()}
function setActiveTypeIm(a){var c=$("#accYMapSearchTypeIm input:checkbox:enabled");c.not(":checked");c.removeAttr("checked");imTypeActive=a;imTypeActive!="4c3ec3ec5e9b5"&&$("#blck-4c3ec3ec5e9b5").children(".fDiv").children("input").val("");logs("\u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u043b\u0438 \u0443\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c \u0442\u0438\u043f\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438 setActiveTypeIm ",a)}
function startYSearch(){setSearchParam();getImmovablesList();logs("startYSearch ",logData)}function getImmovablesList(){var a="",c;for(c in searchParamsSort)a+="&"+c+"="+searchParamsSort[c];$.ajax({type:"GET",success:function(a){imDataS=$.parseJSON(a);initImImYMap()},url:"/ru/immovables/getimmovableslistymap/?cashe=true&im_catalog_id="+(imTypeActive?imTypeActive:"4c3ec3ec5e9b5")+a})}
function initImImYMap(){logData=null;geocoderImList.cleanGeocoderImList();geocoderImList.imDataSCount=imDataS.length-1;if(imDataS.length!=0)for(var a=0;a<imDataS.length;a++)geocoder=new YMaps.Geocoder((imDataS[a].im_city_name!=""?imDataS[a].im_city_name+", ":"")+(imDataS[a].im_area_name!=""?imDataS[a].im_area_name+", ":"")+(imDataS[a].im_adress_name!=""?imDataS[a].im_adress_name+", ":"")+(imDataS[a].im_adress_house!=""?imDataS[a].im_adress_house+", ":""),{results:1,id:a}),geocoder.id=a,imDataS[a].im_geopos!=
""?(setGeopointerResult(a,imDataS[a].im_geopos.substr(0,imDataS[a].im_geopos.indexOf(",")),imDataS[a].im_geopos.substr(imDataS[a].im_geopos.indexOf(",")+1,imDataS[a].im_geopos.lenght)),setGeopointerId(a)):(YMaps.Events.observe(geocoder,geocoder.Events.Load,function(){this.length()&&setGeopointerResult(this.id,this.get(0).getGeoPoint().__lng,this.get(0).getGeoPoint().__lat);setGeopointerId(this.id)}),YMaps.Events.observe(geocoder,geocoder.Events.Fault,function(){return!1}));else geocoderImList.isDone=
!0,geocoderImList.imDataSCount=0;doWhileYCallBack();logs("initImImYMap ",logData)}
function setgCollection(){gCollection.removeAll();gCollection=new YMaps.GeoObjectCollection(iconStyle[imTypeActive]);var a,c;for(c in geocoderImList.arrGeocoderImList){var b=geocoderImList.arrGeocoderImList[c];a=imTypeActive;geocoderImList.arrGeocoderImList[c].length>1&&(a=imTypeActive+"-l");a=new YMaps.Placemark(new YMaps.GeoPoint(b[0]._lng,b[0]._lat),{hasHint:!0,style:iconStyleTitle[a]});a.name="";a.description=geocoderImList.getPlacemarkTemplate(_templateContent,c,imDataS,searchParams);a.metaDataProperty.count=
geocoderImList.arrGeocoderImList[c].length;gCollection.add(a)}iMap.addOverlay(gCollection);logs("gCollection ",geocoderImList.countImList)}function setGeopointerResult(a,c,b){geocoderImList.setElementGeocoder(a,c,b)}function setGeopointerId(a){geocoderImList.setIsDone(a)}
function searchInImData(){logData=null;imDataS=[];for(var a=0;a<imData.length;a++)if(imData[a].im_catalog_id==imTypeActive){var c=imDataS.length==0?0:imDataS.length,b=!0,e;for(e in searchParamsSort){var d=searchParamsSort[e];switch(e){case "im_roomb":d>parseInt(imData[a].im_room)&&(b=!1);break;case "im_roome":d<parseInt(imData[a].im_room)&&(b=!1);break;case "im_priceb":searchParamsSort.im_is_sale&&d>parseInt(imData[a].im_prace)&&(b=!1);searchParamsSort.im_is_rent&&d>parseInt(imData[a].im_prace_manth)&&
(b=!1);break;case "im_pricee":searchParamsSort.im_is_sale&&imData[a].im_is_sale==1&&d<parseInt(imData[a].im_prace)&&(b=!1);searchParamsSort.im_is_rent&&imData[a].im_is_rent==1&&d<parseInt(imData[a].im_prace_manth)&&(b=!1);break;case "im_spaceb":d>parseInt(imData[a].im_space)&&(b=!1);break;case "im_spacee":d<parseInt(imData[a].im_space)&&(b=!1);break;case "im_is_sale":imData[a].im_is_sale!=1&&(searchParamsSort.im_is_rent?imData[a].im_is_rent!=1&&(b=!1):b=!1);break;case "im_is_rent":imData[a].im_is_rent!=
1&&(searchParamsSort.im_is_sale?imData[a].im_is_sale!=1&&(b=!1):b=!1);break;default:imData[a][e]!=d&&(b=!1)}}b==!0&&(logData+="!!!!im_id:"+imData[a].im_id+" im_catalog_id:"+imData[a].im_catalog_id+" key:"+e+" val:"+d+" code:"+imData[a].im_code+";</br>",imDataS[c]=imData[a])}logs("searchInImData ",logData)}
function setSearchParam(){searchParams=[];searchParamsSort=[];logData=null;var a=-1;$("#formYMapSearch input").each(function(c,b){if($(b).attr("rel")==imTypeActive||$(b).attr("rel")==null){switch($(b).attr("type")){case "text":if($(b).val()=="")break;a++;searchParams[a]=[];searchParams[a][$(b).attr("name")]=$(b).val();searchParamsSort[$(b).attr("name")]=[];searchParamsSort[$(b).attr("name")]=$(b).val();break;case "checkbox":if($(b).attr("checked")!="checked")break;a++;searchParams[a]=[];searchParams[a][$(b).attr("name")]=
$(b).val();searchParamsSort[$(b).attr("name")]=[];searchParamsSort[$(b).attr("name")]=$(b).val()}logData+=$(b).attr("name")+"' '"+$(b).val()+" ->"+$(b).attr("type")+";"}});logs("setSearchParam ",logData)}
function setYMapIconStyle(a){iconStyle[a]=new YMaps.Style;iconStyle[a].iconStyle=new YMaps.IconStyle;iconStyle[a].iconStyle.href="http://alfabrok.ua/files/images/YMap/typeIm/"+a+".gif";iconStyle[a].iconStyle.size=new YMaps.Point(27,26);iconStyle[a].iconStyle.offset=new YMaps.Point(-9,-26);iconStyleTitle[a].iconStyle=new YMaps.IconStyle;iconStyleTitle[a].iconStyle.href="http://alfabrok.ua/files/images/YMap/typeIm/"+a+".gif";iconStyleTitle[a].iconStyle.size=new YMaps.Point(27,26);iconStyleTitle[a].iconStyle.offset=
new YMaps.Point(-9,-26);iconStyleTitle[a].hintContentStyle=new YMaps.HintContentStyle(new YMaps.Template('<div style="">\u041a\u043e\u043b-\u0432\u043e \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432: <b>$[metaDataProperty.count]</b></div>'))}function logs(){}function doWhileYCallBack(){geocoderImList.isDone==!0?(setgCollection(),setImCount(),yLoading.complete(),logs("doWhileYCallBack ","t")):(setTimeout(doWhileYCallBack,500),logs("doWhileYCallBack ","f"))}
function setImCount(){var a=geocoderImList.countImList;$("#CountSearchIm span").text(a);$("#CountSearchIm").show()};
