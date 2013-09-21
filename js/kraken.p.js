// Kraken Framework 0.7
;(function ( $, window, document, undefined ) {
console.time("Kraken Load Time");

var pluginName = "Kraken",
			_default = {
			pagesize : { state : true, width: 1024, },
			overflow : { state : true, x : false, y : true },
			bgimg : { state : true, img : '004', size : 'default'},
			bgcolor : { state : true, color : '0fa1e0' },
			largewrap : { state : true, rest : 'default' },
			wrapshadow : { state : true, intense : 'default', size : 'default'},
			slider : { state : true, auto : true, pager : false, nav : true, speed : 500},
			menu : { state : true, submenu: true, },
			span : { state : true, multiply : '10' },
			interval : { state : false, timer : '2000'},
			hide : { state : true, resize : true, size : 700 },
			fonts : {}
	};

var Plugin = function ( _options ){

	this.settings  = $.extend(true, _default, _options);
	//If state     = true
	this._defaults = _default;
	this._name     = pluginName;
	this.init();

	if(this.settings.pagesize.state) 		this.pagesize(this.settings.pagesize);
	if(this.settings.overflow.state) 		this.overflow(this.settings.overflow);
	if(this.settings.bgimg.state) 			this.bgimg(this.settings.bgimg);
	if(this.settings.bgcolor.state) 		this.bgcolor(this.settings.bgcolor);
	if(this.settings.largewrap.state) 		this.largewrap(this.settings.largewrap);
	if(this.settings.wrapshadow.state) 		this.wrapshadow(this.settings.wrapshadow);
	if(this.settings.slider.state) 			this.slider(this.settings.slider);
	if(this.settings.menu.state) 			this.menu(this.settings.hide);
	if(this.settings.span.state) 			this.span(this.settings.span);
	if(this.settings.hide.state) 			this.hide(this.settings.hide);

}

globals = {

	MenuBack : function ( options ){
	if(options){
		$(".nav a").on('click',function(event) {
			if(!$('.menuBack').is(":visible")){
			var altura = $('body').height();
			   	event.preventDefault();
				// $('.nav ul li').addClass('click');
				$('.nav ul li').css({'display' : 'block', 'margin' : '0 0 5px', 'z-index' : '999'});
				$('.menuBack').css({'height' : altura }).animate({ opacity: .8 }).fadeIn();
			}
		});
		$('.menuBack').on('click',function(){
			$('.menuBack').animate({ opacity: 0}).fadeOut();
			$('.nav ul li').removeAttr('style');
		});
	}else{
			$('.menuBack').animate({ opacity: 0}).fadeOut();
			$('.nav ul li').removeAttr('style');
	}}

}

Plugin.prototype = {
		init: function () {
			$('.MenuClose').on('click',function(){
				globals.MenuBack(0);
			});
		},
		pagesize: function (kraken){
			// Page Width size
			$('.grids').css({'max-width' : kraken.width}), $('.wrap').css({'max-width' : kraken.width});
		},
		overflow: function (kraken){
			// Overflow in Short pages
			if(kraken.x) $('html').css('overflow-x','scroll');
			if(kraken.y) $('html').css('overflow-y','scroll');
		},
		bgimg: function (kraken){
			// Background Image in directory img/bg/
			$('html').css({'background' : 'url("./img/bg/'+kraken.img+'.png")' , 'background-size' : kraken.size });
		},
		bgcolor: function (kraken){
			// Background Color
			$('html').css('background-color','#'+kraken.color+'');
		},
		largewrap: function (kraken){
			// Wrap height of the screen
			var RestWarp = ( kraken.rest == 'default' ) ? '20' : kraken.rest;
			setTimeout(function(){
				$('.wrap').css('min-height',$(document).height() - RestWarp);
			},350);
		},
		wrapshadow: function (kraken){
			// BorderShadow on Wrap shadow="on"
			if(kraken.state) $('.wrap').addClass('shadowWrap');
		},
		slider: function (kraken){
			// Slider
			$("#slider").responsiveSlides({
				auto: kraken.auto,
				pager: kraken.pager,
				nav: kraken.nav,
				speed: kraken.speed,
				namespace: "callbacks",
				before: function () {

				},
				after: function () {

				}
			});
		},
		menu: function (kraken){
			//SubMenu
			$('.grids > #menu').css({'position':'relative', 'width':'auto', 'z-index':'8'});
			$('.subMenu').hide();
			var togglesub = true;
			$('#soluciones').on('click',function(event){
				event.preventDefault();
				console.log('click');
				if(togglesub){
					$('.subMenu').show().effect("slide", { direction:'up', times: 5 }, 450);
					$('.subMenu').show().effect("highlight", { color: "#fff", times: 5 }, 450);
					togglesub = false;
				}else{
					$('.subMenu').hide('slow');
					togglesub = true;
				}

			});
			if($(document).width() > kraken.size){
				function openSubMenu() {
					// $(this).find('ul').css({opacity: 0, visibility: "visible"}).animate({opacity: 1, top: 32}, 400);
					 $(this).find('ul').css('visibility', 'visible');
				};
				function closeSubMenu() {
					// $(this).find('ul').css({opacity: 1.0, visibility: "hidden"}).animate({opacity: 0}, 400);
					$(this).find('ul').css('visibility', 'hidden');
				};
				$('.nav > ul > li,a').bind('mouseover', openSubMenu);
				$('.nav > ul > li').bind('mouseout', closeSubMenu);
			}else{
				$(this).find('ul').css('visibility', 'visible');
			}
		},
		span: function (kraken){
			// Span example in html: <div class="span" value="2.5"></div>
			$('.span').each(function(){
				var spanValue = $(this).attr('value');
				sumValue = spanValue * kraken.multiply;
				$(this).css('margin-bottom',sumValue);
			});
		},
		interval: function (kraken){
			// Set interval to responsive js
			setInterval(function () {
				// Functions here:
				console.log('start');
				// End Functions
			}, kraken.timer);
		},
		hide: function (kraken){
			if($(document).width() < kraken.size){
				$('.hide').each(function(){
					$(this).hide();
				});

			globals.MenuBack(1);
			}
			if(kraken.resize){
				$(window).resize(function(){
					if($(document).width() < kraken.size){
						$('.hide').each(function(){
							$(this).hide();
						});

						// MenuBack();
					}else{
						$('.hide').each(function(){
							$(this).show();
						});
					}
				});
			}
		},
};

Triggers = function (func, options, element){
	this.element     = element;
	// this.settings = $.extend(true, t_default, t_options);
	this._defaults   = _default;
	this._name       = PNTrigger;

	switch(func){
	case 'Progress':
		this.Progress(this.element, options);
	break;
	default:
		console.log('Trigger undefined');
	break;
	}

}

Triggers.prototype = {

	Progress : function (element, options){
		if(!isNaN(options.progress)){
			$(element).children().css('width',''+options.progress+'%').html('<span>'+options.progress+'%</span>');
			return this;
		}else{
			console.log('Progress is not a number');
		}
	},
	test : function(){
		console.log('test');
	}

}


// $.fn.KT_Progress = function(options) {
// 	console.log(this);
//         if(!isNaN(options.progress)){
// 			$(this).children().css('width',''+options.progress+'%').html('<span>'+options.progress+'%</span>');
//         	return this;
// 		}else{
// 			console.log('Not Num');
// 		}
//     };


PNTrigger =  pluginName+'Trigger';

$.fn[ PNTrigger ] = function ( func, options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + PNTrigger ) ) {
								$.data( this, "plugin_" + PNTrigger, new Triggers( func, options, this ) );
						}
				});
		};

// var Kraken = new Plugin(_options);


// $.fn[ pluginName ] = function ( _options ) {
// 				return this.each(function() {
// 						if ( !$.data( this, "plugin_" + pluginName ) ) {
// 								$.data( this, "plugin_" + pluginName, new Plugin( this, _options ) );
// 						}
// 				});
// 		};

// $[pluginName] = $.fn[pluginName] = function (_options) {
//     if(!(this instanceof $)) { $.extend(_default, _options) }
//     return this.each(function () {
//         if (!$.data(this, "plugin_" + pluginName)) {
//             $.data(this, "plugin_" + pluginName, new Plugin(this, _options));
//         }
//     });
// };

$[pluginName] = function (_options) {
    if(!(this instanceof $)) { 
    	var settings = $.extend(true, _default, _options);
    	jQuery.pluginName = new Plugin(settings); 
    }
    return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, jQuery.pluginName = new Plugin(this,_options));
        }
    });
};

// Kraken.progress = function(options){
// 	if(!isNaN(options.progress)){
// 		$(options.obj).children().css('width',''+options.progress+'%').html('<span>'+options.progress+'%</span>');
// 	}else{
// 		console.log('Not Num');
// 	}
// }

// // var count = 100;
// // var timerbar = setInterval(function(){
// //   if(count>=50){
// //     progress({
// //       obj: ".Barra",
// //       progress: count
// //     });
// //     count = count - 2;
// //   }else{
// //     clearInterval(timerbar);
// //   }
// // },300);

// // var Plugin = function(option){
// // 	this.init();
// // 	if(option=='hola'){
// // 		this.test();
// // 	}
// // }
// // Plugin.prototype = {
// // 		init: function () {
// // 				console.log("xD");
// // 		},
// // 		test: function () {
// // 				console.log("test");
// // 		}
// // };
// // var tester = Plugin;
// // new tester('hola');

console.timeEnd("Kraken Load Time");


})( jQuery, window, document );	