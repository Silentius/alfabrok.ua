(function(b){b.fn.easySlider=function(a){a=b.extend({prevId:"prevBtn",prevText:"Previous",nextId:"nextBtn",nextText:"Next",controlsShow:!0,controlsBefore:"",controlsAfter:"",controlsFade:!0,firstId:"firstBtn",firstText:"First",firstShow:!1,lastId:"lastBtn",lastText:"Last",lastShow:!1,vertical:!1,speed:800,auto:!1,pause:2E3,continuous:!1,numeric:!1,numericId:"controls"},a);this.each(function(){function j(c){c=parseInt(c)+1;b("li","#"+a.numericId).removeClass("current");b("li#"+a.numericId+c).addClass("current")}
function o(){c>h&&(c=0);c<0&&(c=h);a.vertical?b("ul",d).css("margin-left",c*l*-1):b("ul",d).css("margin-left",c*i*-1);m=!0;a.numeric&&j(c)}function f(e,g){if(m){m=!1;var k=c;switch(e){case "next":c=k>=h?a.continuous?c+1:h:c+1;break;case "prev":c=c<=0?a.continuous?c-1:0:c-1;break;case "first":c=0;break;case "last":c=h;break;default:c=e}var k=Math.abs(k-c),j=k*a.speed;a.vertical?(p=c*l*-1,b("ul",d).animate({marginTop:p},{queue:!1,duration:j,complete:o})):(p=c*i*-1,b("ul",d).animate({marginLeft:p},{queue:!1,
duration:j,complete:o}));!a.continuous&&a.controlsFade&&(c==h?(b("a","#"+a.nextId).hide(),b("a","#"+a.lastId).hide()):(b("a","#"+a.nextId).show(),b("a","#"+a.lastId).show()),c==0?(b("a","#"+a.prevId).hide(),b("a","#"+a.firstId).hide()):(b("a","#"+a.prevId).show(),b("a","#"+a.firstId).show()));g&&clearTimeout(n);a.auto&&e=="next"&&!g&&(n=setTimeout(function(){f("next",!1)},k*a.speed+a.pause))}}var d=b(this),g=b("li",d).length,i=b("li",d).width(),l=b("li",d).height(),m=!0;d.width(i);d.height(l);d.css("overflow",
"hidden");var h=g-1,c=0;b("ul",d).css("width",g*i);a.continuous&&(b("ul",d).prepend(b("ul li:last-child",d).clone().css("margin-left","-"+i+"px")),b("ul",d).append(b("ul li:nth-child(2)",d).clone()),b("ul",d).css("width",(g+1)*i));a.vertical||b("li",d).css("float","left");if(a.controlsShow){var e=a.controlsBefore;a.numeric?e+='<ol id="'+a.numericId+'"></ol>':(a.firstShow&&(e+='<span id="'+a.firstId+'"><a href="javascript:void(0);">'+a.firstText+"</a></span>"),e+=' <span id="'+a.prevId+'"><a href="javascript:void(0);">'+
a.prevText+"</a></span>",e+=' <span id="'+a.nextId+'"><a href="javascript:void(0);">'+a.nextText+"</a></span>",a.lastShow&&(e+=' <span id="'+a.lastId+'"><a href="javascript:void(0);">'+a.lastText+"</a></span>"));e+=a.controlsAfter;b(d).after(e)}if(a.numeric)for(e=0;e<g;e++)b(document.createElement("li")).attr("id",a.numericId+(e+1)).html("<a rel="+e+' href="javascript:void(0);">'+(e+1)+"</a>").appendTo(b("#"+a.numericId)).click(function(){f(b("a",b(this)).attr("rel"),!0)});else b("a","#"+a.nextId).click(function(){f("next",
!0)}),b("a","#"+a.prevId).click(function(){f("prev",!0)}),b("a","#"+a.firstId).click(function(){f("first",!0)}),b("a","#"+a.lastId).click(function(){f("last",!0)});var n;a.auto&&(n=setTimeout(function(){f("next",!1)},a.pause));a.numeric&&j(0);!a.continuous&&a.controlsFade&&(b("a","#"+a.prevId).hide(),b("a","#"+a.firstId).hide())})}})(jQuery);
