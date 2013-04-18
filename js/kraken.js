$(document).ready(function(){
// Kraken Framework 0.4
var kraken = {
	overflow : { state : true, x : false, y : true },
	bgimg : { state : true, img : '004' },
	bgcolor : { state : true, color : '0fa1e0' },
	largewrap : { state : true, rest : 'default' },
	wrapshadow : { state : true, intense : 'default', size : 'default'},
	slider : true,
	submenu : true,
	span : { state : true, multiply : '10' },
	interval : { state : false, timer : '2000'},
	hide : { state : true, resize : true, size : '700' },
}
///////////////////////
//Overflow in Short pages
if(kraken.overflow.state){
	if(kraken.overflow.x) $('html').css('overflow-x','scroll');	
	if(kraken.overflow.y) $('html').css('overflow-y','scroll');
}
//Background Image in directory img/bg/
if(kraken.bgimg.state) $('html').css('background','url("./img/bg/'+kraken.bgimg.img+'.png")');
//Background Color
if(kraken.bgcolor.state) $('html').css('background-color','#'+kraken.bgcolor.color+'');
//Wrap height of the screen
if(kraken.largewrap.state){
	var RestWarp = ( kraken.largewrap.rest == 'default' ) ? '20' : kraken.largewrap.rest;
	$('.wrap').css('min-height',$(document).height() - RestWarp);
}
//BorderShadow on Wrap shadow="on"
if(kraken.wrapshadow.state) $('.wrap').addClass('shadowWrap');
//Slider
if(kraken.slider){
$("#slider").responsiveSlides({
	auto: true,
	pager: false,
	nav: true,
	speed: 500,
	namespace: "callbacks",
	before: function () {

	},
	after: function () {

	}
});
}
//SubMenu
if(kraken.submenu){
	$('.subMenu').hide();
	var togglesub = true;
	$('#soluciones').on('click',function(event){
		event.preventDefault();
		
		if(togglesub){
			$('.subMenu').show().effect("slide", { direction:'up', times:5 }, 450);
			$('.subMenu').show().effect("highlight", { color: "#fff", times:5 }, 450);
			togglesub = false;
		}else{
			$('.subMenu').hide('slow');
			togglesub = true;
		}
	});
}
// Span example in html: <div class="span" value="2.5"></div>
if(kraken.span.state){
	$('.span').each(function(){
		var spanValue = $(this).attr('value');
		sumValue = spanValue * kraken.span.multiply;
		$(this).css('margin-bottom',sumValue);
	});
}
//set interval to responsive js
if(kraken.interval.state){
	setInterval(function () {
		//Functions here:
		console.log('start');
		//End Functions
	}, kraken.interval.timer);
}

if(kraken.hide.state){
	if($(document).width() < kraken.hide.size){
		$('.hide').each(function(){
			$(this).hide();
		});
	}

	if(kraken.hide.resize){
		$(window).resize(function(){
			if($(document).width() < kraken.hide.size){
				$('.hide').each(function(){
					$(this).hide();
				});
			}else{
				$('.hide').each(function(){
					$(this).show();
				});
			}
		});
	}
}

$('.cta').on('click',function(){
	$('.cta').removeClass('ActiveScrollTo');
	$('.cta').removeClass('W');
	$(this).addClass('ActiveScrollTo');
	$(this).addClass('W');

	setTimeout(function(){
		$.scrollTo('.ActiveScrollTo',500);
	}, 500);
	
});



});
