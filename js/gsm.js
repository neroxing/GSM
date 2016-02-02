//misc
$(function () {
	// pop over for wechat
	$('.link[data-toggle="popover"]').popover({
		trigger: 'hover',
		placement : 'top',
		content: '<img src="img/wechat-QR.gif" width="100" height="100"><br>G.S.M',
		html:true
	});	
	// prevent default
	$('.link[data-toggle="popover"]').click (function (e) {
		event.preventDefault()
		//event.stopPropagation()
		//$(this).popover ("toggle");
	});

	// selectors of customer service form 
	$('.cs-selectbox .dropdown-menu a').click(function(){
		$(this).parents('.cs-selectbox').find('.selected').text($(this).text());
		$(this).parents('.cs-selectbox').siblings('input').val($(this).text())
	});

	// setting box height on project page
	$('a[data-toggle="tab"][href="#project"]')
	.on('shown.bs.tab', function () {
		$('#project .ordered-box.green').height(
			$('#project #highest-box').height());
	});
});
//TODO re-position navbar underline when resize.
// navigation action
$(function () {
	// navbar underline
	function activePosition (time) {
		time = time? time:10;
		var activLeft = $('.tab.active:visible').position();
		if(activLeft !== undefined){
			$('#underline').animate({left:activLeft.left+15},time);
		}//15 is the left padding
	}
	function hoverPosition (item) {
		$('#underline').animate({left:
			$(item).parent().position().left+15},100);
	}
	$('#navbar').hover(function(){}, function() {
		activePosition (100);
	});
	$('.tab a').hover(function() {
		hoverPosition (this);
	});

	isClicked = false;
	// Change hash wlhen tab shown
	$('a[data-toggle="tab"]').click(function () {
		isClicked = true;
	})
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if(isClicked){
			window.location.hash = e.target.hash;
		}
		isClicked = false;
		$(document).scrollTop(0);
		activePosition (300);
	});
	// Javascript to enable hash to tab
	function hashToTab () {
		if(!isClicked){
			var hash = window.location.hash;
			var splited = hash.split('/')[0]
			if (splited !== ''){
				var parent = $(splited).parents('.tab-pane');

				// if can find parents then show parent tab.
				if(parent.length !== 0 ){
					$('a[href=#'+parent.attr('id')+']')
						.tab('show') ;
				}
				// the child have to be the last to show
				$('a[href='+splited+']').tab('show') ;
			}
		}
	}
	hashToTab();
	if ("onhashchange" in window) {
		window.onhashchange = hashToTab;
	}
});
// ribbon menu
$(function () {
	// toggle ribbon menu class
	var ribbonMenu = 'a[data-toggle="tab"][href="#designer-team"],'+
		'a[data-toggle="tab"][href="#decoration"],'+
		'a[data-toggle="tab"][href="#cases-hotel"],'+
		'a[data-toggle="tab"][href="#cases-business"],'+
		'a[data-toggle="tab"][href="#cases-house"]';
	$(ribbonMenu)
	.on('shown.bs.tab', function (e) {
		var paneId = $(e.target).attr('href');
		$(paneId).parents('.tab-pane').addClass('ribbon-menu');
	})
	.on('hidden.bs.tab', function (e) {
		var paneId = $(e.target).attr('href');
		$(paneId).parents('.tab-pane').removeClass('ribbon-menu');
	});
});
// TODO: replace this plugin or remove mousewheel dependency
// customize scrollbar
$(function () {
	scrollbarSetting={
		scrollInertia: 0, // stop animation 
		scrollButtons:{enable:true},
		theme: "light-3"
	}
	$(".scorlling-box").mCustomScrollbar(scrollbarSetting);
});
// TODO: fix cconfliction ablout setInterval
// jq-carousel
$(function () {
	// jq-carousel init
	isJqCarouselInited = false;
	function jqCarouselInit () {
		if(!isJqCarouselInited){
			var cWidth = $($(this).attr('href')).find('.jq-carousel:visible').parent().width();
			if (cWidth !== null) {
				var jCSetting={
					carouselWidth: cWidth,
					directionNav: true,
					backZoom: 0.6,
					description: true,
					slidesPerScroll: 5,
				}
				var factor = jCSetting.backZoom, sumfactor = 1;
				for (var i = (jCSetting.slidesPerScroll-1)/2; i > 0; i--) {
					sumfactor += factor;
					factor *= factor;
				};
				jCSetting.frontWidth = (cWidth)/sumfactor;
				jCSetting.frontHeight = jCSetting.frontWidth*2/3;
				jCSetting.carouselHeight = jCSetting.frontHeight;
				$(jqCarouselTag).jsCarousel(jCSetting);
				isJqCarouselInited = true;
			}
		}
	}
	var jqCarouselTag = '.jq-carousel';
	// find this parent pane then find its corresponding link
	var jqCarouselParent = $(jqCarouselTag).parents('.tab-pane');
	var i = 0;
	// adding init triger to each parents
	while(jqCarouselParent[i]!==undefined){
		var parentId = $(jqCarouselParent[i]).attr('id');
		$('a[data-toggle="tab"][href=#'+parentId+']')
			.on('shown.bs.tab', jqCarouselInit);
		i++;	
	}
});
// TODO: add hammerjs to support gestures on carousel
// bootstrap carousel
$(function () {
	// designers carousel interaction
	$('#designers .designer-avertar').click(function(){
		// move to a index.
		$('#designer-carousel').carousel(
			$('#designers .designer-avertar').index(this));
		$('#designer-carousel').carousel('pause');
	});

	// change to index when detail page shown
	var detailPageLink = 'a[data-toggle="tab"][href="#cases-hotel"],'+
		'a[data-toggle="tab"][href="#cases-business"],'+
		'a[data-toggle="tab"][href="#cases-hotel"],'+
		'a[data-toggle="tab"][href="#green-corp"]';
	$(detailPageLink)
	.on('shown.bs.tab', function (e) {
		var hash = window.location.hash;
			var splited = hash.split('/')[1]
			if (typeof(splited) !== "undefined"){
				var paneId = $(e.target).attr('href');
				$(paneId).find('.carousel')
					.carousel(parseInt(splited)-1)
					.carousel('pause');
			}
	});
});

