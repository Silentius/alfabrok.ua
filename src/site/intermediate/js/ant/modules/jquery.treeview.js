(function(c){c.extend(c.fn,{swapClass:function(b,a){var c=this.filter("."+b);this.filter("."+a).removeClass(a).addClass(b);c.removeClass(b).addClass(a);return this},replaceClass:function(b,a){return this.filter("."+b).removeClass(b).addClass(a).end()},hoverClass:function(b){b=b||"hover";return this.hover(function(){c(this).addClass(b)},function(){c(this).removeClass(b)})},heightToggle:function(b,a){b?this.animate({height:"toggle"},b,a):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?
"show":"hide"]();a&&a.apply(this,arguments)})},heightHide:function(b,a){b?this.animate({height:"hide"},b,a):(this.hide(),a&&this.each(a))},prepareBranches:function(b){b.prerendered||(this.filter(":last-child:not(ul)").addClass(a.last),this.filter((b.collapsed?"":"."+a.closed)+":not(."+a.open+")").find(">ul").hide());return this.filter(":has(>ul)")},applyClasses:function(b,e){this.filter(":has(>ul):not(:has(>a))").find(">span").click(function(){e.apply(c(this).next())}).add(c("a",this)).hoverClass();
b.prerendered||(this.filter(":has(>ul:hidden)").addClass(a.expandable).replaceClass(a.last,a.lastExpandable),this.not(":has(>ul:hidden)").addClass(a.collapsable).replaceClass(a.last,a.lastCollapsable),this.prepend('<div class="'+a.hitarea+'"/>').find("div."+a.hitarea).each(function(){var a="";c.each(c(this).parent().attr("class").split(" "),function(){a+=this+"-hitarea "});c(this).addClass(a)}));this.find("div."+a.hitarea).click(e)},treeview:function(b){function e(b,d){function f(d){return function(){g.apply(c("div."+
a.hitarea,b).filter(function(){return d?c(this).parent("."+d).length:!0}));return!1}}c("a:eq(0)",d).click(f(a.collapsable));c("a:eq(1)",d).click(f(a.expandable));c("a:eq(2)",d).click(f())}function g(){c(this).parent().find(">.hitarea").swapClass(a.collapsableHitarea,a.expandableHitarea).swapClass(a.lastCollapsableHitarea,a.lastExpandableHitarea).end().swapClass(a.collapsable,a.expandable).swapClass(a.lastCollapsable,a.lastExpandable).find(">ul").heightToggle(b.animated,b.toggle);b.unique&&c(this).parent().siblings().find(">.hitarea").replaceClass(a.collapsableHitarea,
a.expandableHitarea).replaceClass(a.lastCollapsableHitarea,a.lastExpandableHitarea).end().replaceClass(a.collapsable,a.expandable).replaceClass(a.lastCollapsable,a.lastExpandable).find(">ul").heightHide(b.animated,b.toggle)}function k(){var a=[];h.each(function(b,f){a[b]=c(f).is(":has(>ul:visible)")?1:0});c.cookie(b.cookieId,a.join(""))}function l(){var a=c.cookie(b.cookieId);if(a){var d=a.split("");h.each(function(a,b){c(b).find(">ul")[parseInt(d[a])?"show":"hide"]()})}}b=c.extend({cookieId:"treeview"},
b);if(b.add)return this.trigger("add",[b.add]);if(b.toggle){var m=b.toggle;b.toggle=function(){return m.apply(c(this).parent()[0],arguments)}}this.addClass("treeview");var h=this.find("li").prepareBranches(b);switch(b.persist){case "cookie":var j=b.toggle;b.toggle=function(){k();j&&j.apply(this,arguments)};l();break;case "location":var i=this.find("a").filter(function(){return this.href.toLowerCase()==b.activelink});i.length&&i.addClass("selected").parents("ul, li").add(i.next()).show()}h.applyClasses(b,
g);b.control&&(e(this,b.control),c(b.control).show());return this.bind("add",function(e,d){c(d).prev().removeClass(a.last).removeClass(a.lastCollapsable).removeClass(a.lastExpandable).find(">.hitarea").removeClass(a.lastCollapsableHitarea).removeClass(a.lastExpandableHitarea);c(d).find("li").andSelf().prepareBranches(b).applyClasses(b,g)})}});var a=c.fn.treeview.classes={open:"open",closed:"closed",expandable:"expandable",expandableHitarea:"expandable-hitarea",lastExpandableHitarea:"lastExpandable-hitarea",
collapsable:"collapsable",collapsableHitarea:"collapsable-hitarea",lastCollapsableHitarea:"lastCollapsable-hitarea",lastCollapsable:"lastCollapsable",lastExpandable:"lastExpandable",last:"last",hitarea:"hitarea"};c.fn.Treeview=c.fn.treeview})(jQuery);
