(function(b){b.prompt=function(c,a){a=b.extend({},b.prompt.defaults,a);b.prompt.currentPrefix=a.prefix;var f=b.browser.msie&&b.browser.version<7,p=b(document.body),j=b(window),h='<div class="'+a.prefix+'box" id="'+a.prefix+'box">';a.useiframe&&(b("object, applet").length>0||f)?h+='<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+a.prefix+'fade" id="'+a.prefix+'fade"></iframe>':(f&&b("select").css("visibility","hidden"),h+='<div class="'+a.prefix+'fade" id="'+
a.prefix+'fade"></div>');h+='<div class="'+a.prefix+'" id="'+a.prefix+'"><div class="'+a.prefix+'container"><div class="';h+=a.prefix+'close">X</div><div id="'+a.prefix+'states"></div>';h+="</div></div></div>";var e=b(h).appendTo(p),d=e.children("#"+a.prefix),k=e.children("#"+a.prefix+"fade");c.constructor==String&&(c={state0:{html:c,buttons:a.buttons,focus:a.focus,submit:a.submit}});var m="";b.each(c,function(l,g){g=b.extend({},b.prompt.defaults.state,g);c[l]=g;m+='<div id="'+a.prefix+"_state_"+
l+'" class="'+a.prefix+'_state" style="display:none;"><div class="'+a.prefix+'message">'+g.html+'</div><div class="'+a.prefix+'buttons">';b.each(g.buttons,function(b,c){m+='<button name="'+a.prefix+"_"+l+"_button"+b+'" id="'+a.prefix+"_"+l+"_button"+b+'" value="'+c+'">'+b+"</button>"});m+="</div></div>"});d.find("#"+a.prefix+"states").html(m).children("."+a.prefix+"_state:first").css("display","block");d.find("."+a.prefix+"buttons:empty").css("display","none");b.each(c,function(c,g){var e=d.find("#"+
a.prefix+"_state_"+c);e.children("."+a.prefix+"buttons").children("button").click(function(){var c=e.children("."+a.prefix+"message"),l=g.buttons[b(this).text()],i={};b.each(d.find("#"+a.prefix+"states :input").serializeArray(),function(b,a){i[a.name]===void 0?i[a.name]=a.value:typeof i[a.name]==Array?i[a.name].push(a.value):i[a.name]=[i[a.name],a.value]});var f=g.submit(l,c,i);(f===void 0||f)&&n(!0,l,c,i)});e.find("."+a.prefix+"buttons button:eq("+g.focus+")").addClass(a.prefix+"defaultbutton")});
var q=function(){e.css({top:j.scrollTop()})},r=function(){if(a.persistent){var b=0;e.addClass(a.prefix+"warning");var c=setInterval(function(){e.toggleClass(a.prefix+"warning");b++>1&&(clearInterval(c),e.removeClass(a.prefix+"warning"))},100)}else n()},s=function(a){var c=window.event?event.keyCode:a.keyCode;c==27&&n();if(c==9){var d=b(":input:enabled:visible",e),f=a.shiftKey&&a.target==d[0];if(!a.shiftKey&&a.target==d[d.length-1]||f)return setTimeout(function(){if(d){var a=d[f===!0?d.length-1:0];
a&&a.focus()}},10),!1}},o=function(){e.css({position:f?"absolute":"fixed",height:j.height(),width:"100%",top:f?j.scrollTop():0,left:0,right:0,bottom:0});k.css({position:"absolute",height:j.height(),width:"100%",top:0,left:0,right:0,bottom:0});d.css({position:"absolute",top:a.top,left:"50%",marginLeft:d.outerWidth()/2*-1})},n=function(c,g,h,m){d.remove();f&&p.unbind("scroll",q);j.unbind("resize",o);k.fadeOut(a.overlayspeed,function(){k.unbind("click",r);k.remove();c&&a.callback(g,h,m);e.unbind("keypress",
s);e.remove();f&&!a.useiframe&&b("select").css("visibility","visible")})};o();k.css({zIndex:a.zIndex,display:"none",opacity:a.opacity});d.css({zIndex:a.zIndex+1,display:"none"});e.css({zIndex:a.zIndex});f&&j.scroll(q);k.click(r);j.resize(o);e.bind("keydown keypress",s);d.find("."+a.prefix+"close").click(n);k.fadeIn(a.overlayspeed);d[a.show](a.promptspeed,a.loaded);d.find("#"+a.prefix+"states ."+a.prefix+"_state:first ."+a.prefix+"defaultbutton").focus();a.timeout>0&&setTimeout(b.prompt.close,a.timeout);
return e};b.prompt.defaults={prefix:"jqi",buttons:{Ok:!0},loaded:function(){},submit:function(){return!0},callback:function(){},opacity:0.6,zIndex:999,overlayspeed:"slow",promptspeed:"fast",show:"fadeIn",focus:0,useiframe:!1,top:"15%",persistent:!0,timeout:0,state:{html:"",buttons:{Ok:!0},focus:0,submit:function(){return!0}}};b.prompt.currentPrefix=b.prompt.defaults.prefix;b.prompt.setDefaults=function(c){b.prompt.defaults=b.extend({},b.prompt.defaults,c)};b.prompt.setStateDefaults=function(c){b.prompt.defaults.state=
b.extend({},b.prompt.defaults.state,c)};b.prompt.getStateContent=function(c){return b("#"+b.prompt.currentPrefix+"_state_"+c)};b.prompt.getCurrentState=function(){return b("."+b.prompt.currentPrefix+"_state:visible")};b.prompt.getCurrentStateName=function(){return b.prompt.getCurrentState().attr("id").replace(b.prompt.currentPrefix+"_state_","")};b.prompt.goToState=function(c){b("."+b.prompt.currentPrefix+"_state").slideUp("slow");b("#"+b.prompt.currentPrefix+"_state_"+c).slideDown("slow",function(){b(this).find("."+
b.prompt.currentPrefix+"defaultbutton").focus()})};b.prompt.nextState=function(){var c=b("."+b.prompt.currentPrefix+"_state:visible").next();b("."+b.prompt.currentPrefix+"_state").slideUp("slow");c.slideDown("slow",function(){c.find("."+b.prompt.currentPrefix+"defaultbutton").focus()})};b.prompt.prevState=function(){var c=b("."+b.prompt.currentPrefix+"_state:visible").prev();b("."+b.prompt.currentPrefix+"_state").slideUp("slow");c.slideDown("slow",function(){c.find("."+b.prompt.currentPrefix+"defaultbutton").focus()})};
b.prompt.close=function(){b("#"+b.prompt.currentPrefix+"box").fadeOut("fast",function(){b(this).remove()})}})(jQuery);
