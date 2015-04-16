/**
 *  @file 放大图片列表。
 *  @name showbigimgs
 *  @import zepto.js
 *  功能：触屏环境下，触摸放大图片，多张图片可以左右滑动。
 *  by wcc 2014-04-22
 */



!(function( $ ) {
	$.fn.showbigimgs = function( options ) {
		var defaults = {
			data_attribute: "data-bigsrc",  //真正地址后缀
			waitimg: 'http://g.taocaiku.com/gmucss/images/loading.gif'				//等待的图片（转菊花）
		};
		var settings = $.extend( {}, defaults, options );
		/**
		 * 获取可视窗口的宽高
		 */
		function GetWinSize(){
			return { height : $(window).height() , width : $(window).width() };
		}
		/**
		 * 获取html
		 * @param  {object array} imgarray 图片对象数组
		 * @param  {number} width    页面宽度
		 * @return {string}          组装好的html
		 */
		function Gethtml(imgarray,width){
			var html = '';
			imgarray.each(function(index){
				//获取大图路径
				var _src = ($(this).attr('data-bigsrc') == null) ? $(this).attr('src') : $(this).attr('data-bigsrc') ;
				var _li = '<li class="content-imgpop-li" style="left:'+index*width+'px;"><img src="'+settings.waitimg+'" data-'+settings.data_attribute+'="'+_src+'"></li>';
				html += _li;
			})
			html = '<ul style="width:'+(imgarray.length)*width+'px;">'+html+'</ul>';
			return html;
		}
		//显示图片 传入图片 对象
		//
		function loadimg($img){
			if($img.attr('src') == settings.waitimg){
				$img.bind("load", function() {
					//var original = $img.attr("data-" + settings.data_attribute);
					//console.log('加载完成');
					$(this).attr("src", $img.attr("data-" + settings.data_attribute));
				})
			}else{
				return
			}
		}

		//遍历所有的img 标记
		return this.each(function(index) {
			//当前img对应的弹出框
			var _thispop;
			//所有的图片
			var _imgs = $(this).find('img');
			//document.body.scrollTop
			var _bodyscrolltop;
			//可视窗口高度
			var _showheight;
			//可视窗口宽度
			var _showwidth;
			/**
			 * [getval description]
			 * @return {[type]} [description]
			 */
			function getval(){
				//可视窗口高度
				_showheight = $(window).height();
				//可视窗口宽度
				_showwidth = $(window).width();
			}
			//传入图片对象数组、页面宽度，返回html
			function generatedlist(imgarray,width){
				var _item='';
				imgarray.each(function(index){
					var _src = ($(this).attr('data-bigsrc') == null) ? $(this).attr('src') : $(this).attr('data-bigsrc') ;
					//判断是否有大图
					//console.log($(this).attr('data-bigsrc')==null);
					var _li = '<li class="content-imgpop-li" style="left:'+index*width+'px;"><img src="'+settings.waitimg+'" data-'+settings.data_attribute+'="'+_src+'"></li>';
					_item += _li;
				})
				_item = '<ul style="width:'+(imgarray.length)*width+'px;">'+_item+'</ul>';
				return _item;
			}



			function onloadimg(obj, fn) {
				var img = new Image();
				img.src = obj.src;
				if (img.complete) {
					fn();
					return;
				}
				//如果图片不存在
				img.onerror = function() {
					obj.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAACRBAMAAAAx9kcQAAAAMFBMVEWqqqqwsLC3t7e9vb3Dw8PJycnPz8/U1NTa2trf39/l5eXq6urw8PD19fX6+vr///81FxhHAAACFUlEQVR4Xu3VsW7TUBQG4OM0MhekEs+oQlnLkleIkMtKBgYWRN6geQNuJYYrqioUMZTJvAFIDACnrenMwIrEEPYMphIqbZP2cO51Ldcu5oJUMZ3f8pEH+7POL0sGuqR8/2+SSCKJJJJIIokkkkgiiSSSSCKJJNLXnQLA4mqG2Snu/rOkVSFBcfURJkdw3QI/4Cx3ifrKng3SPI7jbotHWpFGC8Xjfy3NIE+LKlKkciBlKZ0i3+eVTowx/bYx6xXpGBZxFCAiWWkQIn6oSv6eXHp0AB3qh5T39BY4yr8dIg5DHrullNA+dGKw7Y1ZeryCm7DsJMizWpUK9Sw9J1kTM/oCnbKn9/Gd6Mr0vDT5o5RUGoeOhvtcoevpDQRp3niILg09Tbe1+sS71aSX7s1OWgN4cE7abmp8qDQfF6RBy3Dsds/h1gielNu1G6TT6KZW34ILErjYxl9tmYRmfukQxlodQFKXYk7XSelRv5WU2w2bpH3ItDqBXl3iMY8WMpZ28N29FSy+J9JN0tOQtKLBtbo0j4JNWHKNP4Nlmvml7qKVXrfrEu0BBJ+dREz5pWN4yJK7/9AYaBvOhpPmEVwlK60jGrMFjzySJfQNBlcrnztLtAdLTnJh1SPZtV5kdslSGhOFE1u43e5nnCdl5HbCY22jIvmS0e8ycUP+d5chiSSSSCKJJJJIIokkkkgiiSSSSCKJJNIvm4x39w9PKVAAAAAASUVORK5CYII=';
					console.log('图片加载失败');
					fn();
					return;
				}
				img.onload = function() {
					fn();
				};
			}

			//显示图片 传入图片 对象
			function showimg($img){
				console.log($img[0].src);
				if($img.attr('src') == settings.waitimg){

					$img.bind("load", function() {
						//var original = $img.attr("data-" + settings.data_attribute);
						console.log('加载完成'+$img);
						$img.attr("src", $img.attr("data-" + settings.data_attribute));
					})
				}
			}

			//初始化弹出框，生成HTML并绑定事件，参数第几张图片
			//index 是索引
			function initpop(index){
				//获取数据
				getval();
				//当前的位置索引
				var _thisindex = index;
				//console.log(_thisindex);
				//调用生成 图片列表
				var imagesitem = generatedlist(_imgs,_showwidth);
				//完整的HTML内容
				var _html = '<div class="enlargeshow" style="display:none"><div class="content-imgpop"><div class="imgpopslider" style="overflow:hidden">'+imagesitem+'</div></div><div class="footer-imgpop"><a href="javascript:" class="close-imgpop">关闭</a><div class="count-imgpop">'+(index+1)+'/'+_imgs.length+'</div></div></div>';
				//插入弹出框到页面中
				$('body').append(_html);
				//获取弹出框
				_thispop = $('.enlargeshow');
				//缓存当前显示图片的索引
				_thispop.data('theindex',_thisindex);
				//显示当前位置的图片
				var _indexshowbox= _thispop.find('.count-imgpop');
				//只有一个内容的话删除页码
				if(_imgs.length == 1 ){_indexshowbox.remove()}
				//内容高度,41 是底部菜单的高度
				var _contentheight = _showheight - 41;
				//定义弹出框大小
				_thispop.find('.content-imgpop').css({'min-height':_contentheight});
				var _def3d = 'translate3d(-'+index*_showwidth+'px, 0px, 0px)';
				_thispop.find('.content-imgpop ul').css({'min-height':_contentheight,'transition': '300ms','-webkit-transform':_def3d});
				_thispop.find('.content-imgpop ul li').css({'min-height':_contentheight,'height':_contentheight,'line-height':_contentheight+'px','width':_showwidth});
				_thispop.find('.content-imgpop ul li img').css({
					'-webkit-transition':'-webkit-transform 200ms',
					'transition':'-webkit-transform 200ms',
					'-webkit-transform':'scale(1)'
				});
				//调用显示图片方法
				showimg(_thispop.find('img').eq(index));
				//li的左右滑动事件
				_thispop.find('.content-imgpop ul li').swipeLeft(function(){
					if(_thispop.data('big') != true){
						//console.log('向左滑动');
						var index = _thispop.data('theindex');
						if(index < _imgs.length - 1){	index++};
						var _def3d = 'translate3d(-'+index*_showwidth+'px, 0px, 0px)';
						//执行效果
						_thispop.find('.content-imgpop ul').css({'-webkit-transform':_def3d});
						//写入当前位置
						_thispop.data('theindex',index);
						//显示当前位置
						_indexshowbox.html((index+1)+'/'+_imgs.length);
						//显示第n张图片
						showimg(_thispop.find('img').eq(index));
						//console.log('向左滑动后的index:'+index);
					}
				}).swipeRight(function(){
					if(_thispop.data('big') != true){
						//console.log('向右滑动');
						var index = _thispop.data('theindex');
						if(index > 0){index--};
						var _def3d = 'translate3d(-'+index*_showwidth+'px, 0px, 0px)';
						//执行效果
						_thispop.find('.content-imgpop ul').css({'-webkit-transform':_def3d});
						//写入当前位置
						_thispop.data('theindex',index);
						//显示当前位置
						_indexshowbox.html((index+1)+'/'+_imgs.length);
						//显示第n张图片
						showimg(_thispop.find('img').eq(index));
						//console.log('向右滑动后的index:'+index);
					}
				})
				//两次触摸事件
				_thispop.find('.content-imgpop ul li').doubleTap(function(){
					var hisimg = $(this).find('img');
					hisimg.data('tranX',0);
					hisimg.data('tranY',0);
					if(_thispop.data('big') != true){
						hisimg.css({'-webkit-transform':'translate(0,0) scale(2)'});
						_thispop.data('big',true);
					}else{
						hisimg.css({'-webkit-transform':'translate(0,0) scale(1)'});
						_thispop.data('big',false);
					}
				});
				//开始拖动
				_thispop.find('.content-imgpop ul li img').bind('touchstart',function(e){
					//缓存初始坐标
					var $img = $(this);
					$img.data('weizhiX',e.touches[0].pageX);
					$img.data('weizhiY',e.touches[0].pageY);
				}).bind('touchmove',function(e){
					//阻止冒泡
					event.preventDefault();
					var $img = $(this);
					//当前移动的坐标
					var weizhiendX = e.touches[0].pageX;
					var weizhiendY = e.touches[0].pageY;
					var weizhiX = $img.data('weizhiX');
					var weizhiY = $img.data('weizhiY');
					//图片的坐标
					var teX = (typeof($img.data('tranX')) == 'undefined') ? 0 : $img.data('tranX');
					var teY = (typeof($img.data('tranY')) == 'undefined') ? 0 : $img.data('tranY');
					//计算新坐标
					var newX = weizhiendX - weizhiX + teX;
					var newY = weizhiendY - weizhiY + teY;
					//缓存新坐标
					$img.data('newX',newX);
					$img.data('newY',newY);
					//console.log(newY);
					if(_thispop.data('big')){
						//当是放大状态的时候
						$img.css({'-webkit-transition': '-webkit-transform 0ms','transition': '-webkit-transform 0ms'});
						$img.css({'-webkit-transform':'translate('+newX+'px,'+newY+'px) scale(2)'});
					}else if((_thispop.data('big') != true) && ($img.height() > _contentheight)){
						//当他不是放大状态，并且图片超长的时候，可以拖动图片上下查看
						$img.css({'-webkit-transition': '-webkit-transform 0ms','transition': '-webkit-transform 0ms'});
						$img.css({'-webkit-transform':'translateY('+newY+'px) scale(1)'});
						//console.log(newY);
					};
					//兼容部分自带浏览器动态菜单留白问题
					$('body').css('background','#000');
				}).bind('touchend',function(e){
					//兼容部分自带浏览器动态菜单留白问题
					$('body').removeAttr('style');
					var $img = $(this);
					//获取缓存上的新坐标
					var newX = $img.data('newX');
					var newY = $img.data('newY');
					//缓存新坐标
					$img.data('tranX',newX);
					$img.data('tranY',newY);
					//console.log(newY);
					//还原动画效果
					$img.css({'-webkit-transition':'-webkit-transform 200ms','transition':'-webkit-transform 200ms'});
					//校正位置1
					//两倍原始图片的大小超过了可视区域的大小才需要校正
					if(_thispop.data('big') && ($img.width() > _showwidth || $img.height() > _contentheight)){
						var moveimgwidth = $img.width()/4;
						var moveimgheight = $img.height()/4;
						//横向需要校正
						if(newX >= moveimgwidth){
							newX = moveimgwidth;
						}else if(newX <= - moveimgwidth){
							newX = - moveimgwidth;
						};
						//纵向需要校正
						//实际图片尺寸小于显示高度的时候
						if(( $img.height() / 2) < _contentheight ){
							if(newY >= moveimgheight){
								newY = moveimgheight;
							}else if(newY <= - moveimgheight){
								newY = - moveimgheight;
							};
						}else{
							if( newY >= ($img.height() / 4 )){
								newY = $img.height()/4;
							}else if(newY <= -($img.height() / 2 + _contentheight)){
								newY = -($img.height() / 2 + _contentheight);
							}
						};
						//执行校正
						$img.css({'-webkit-transform':'translate('+newX+'px,'+newY+'px) scale(2)'});
						//校正后缓存值
						$img.data('tranX',newX);
						$img.data('tranY',newY);
					};
					//校正位置2
					//不放大并且高度超过可视区域的时候
					if((_thispop.data('big') != true) && ($img.height() > _contentheight)){
						if(newY>=1){
							newY = 0;
						}else if(newY <= - ( $img.height() - _contentheight)){
							newY = - ( $img.height() - _contentheight);
						}
						$img.css({'-webkit-transform':'translateY('+newY+'px) scale(1)'});
						$img.data('tranY',newY);
					};
				});
				//关闭按钮
				_thispop.find('.close-imgpop').on('click',function(event){
					//console.log('触发关闭');
					event.preventDefault();
					//alert(e.target)
					_thispop.remove();
					$('.page').show();
					$('body').css('background','none');
					//指定窗口位置
					//document.documentElement.scrollTop = _bodyscrolltop;
					document.body.scrollTop = _bodyscrolltop;
					//防止冒泡
					return false;
				})
				/*.on('click',function(){
					return false;
				});
				*/
			};
			//图片点击事件
			_imgs.each(function(index, element) {
				var tindex = index;
				$(this).on('tap',function(){
					//console.log(tindex);
					//保存当前该页面的scrollTop值
					_bodyscrolltop = $(window).scrollTop();
					//隐藏页面
					$('.page').hide();
					//调用初始化
					initpop(tindex);
					//显示弹出框
					_thispop.show();
				});
      		});
		});
	};
})( Zepto );
