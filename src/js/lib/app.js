/*
 *全局app
 * 
 */
var App = (function(){
		
	//设置全局对象
	var golbal ={
		winW:$(window).width(),
		winH:$(window).height(),
		maskDom:$('<div class="layout_mask"></div>'),
		rootDom:$('body') || window.document.body
	}
	
	
	/*
	 * 跨域请求 S
	 * url:请求地址
	 * param:提交参数
	 * fun:数据处理
	 * App.handleJSONP("http://www.kunyujie.com/jie/test/getJsonp.action",{id:1000},function(data){...})
	 */
	var setJOSNP = function(url, param, fun){		    	
	    	//jsonp方式
	    $.ajax({  
	        type : "get",  
	        async:false, 
	        data: param,
	        url : url,  
	        dataType : "jsonp",//数据类型为jsonp  
	        jsonp:"callback",
		    jsonpCallback:'jsonp_success',
	        success:function(data){  
	        		if(fun && typeof fun === 'function') fun(data);
	        },  
	        error:function(){  
	           new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }  
	    }); 
	}
	//E
	
	
	/*
	 * 异步提交任务 S
	 * url:请求地址
	 * param:提交参数
	 * fun:数据处理
	 */
	var setAsyncTask = function(url, param, fun) {
	    $.ajax({
	        type: "post",
	        url: url,
	        async: false,
	        data: param,
	        cache: false,
	        dataType: "json",
	        success: function(data) {   	
	            if (data != null) {
	               if(fun && typeof fun === 'function') fun(data);
	               //fun ? fun() : null;
	            }
	        },
	        error: function() {
	            new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }
	    });
	};
	//E

	
	/*
	 * tab选项卡 S
	 */
	var setSwitchDoor = function(navItem,tabBd,events,clazz){
		var _navItem = $(navItem), _tabBd = $(tabBd);
		$.each(_navItem, function(_i, _obj){
			$(_obj).off().on(events, function(){
			  	$(_navItem).removeClass(clazz);
				$(_navItem[_i]).addClass(clazz)
				$(_tabBd).hide();
				$(_tabBd[_i]).show();
			});
		});
	}
	// E
	
	
	/**本网站需要的方法***/
	
	/**
	 * 遮罩层
	 */
	var setOpenMask = function(){
		golbal.maskDom.css({
			width:"100%",
			height:"100%",
			position:"absolute",
			left:"0",
			top:"0",
			zIndex:"100",
			background:"#000",
			opacity:".4",
			display:"block"
			});
		golbal.maskDom.appendTo(golbal.rootDom);  
	}
	/**
	 * 移除遮罩层
	 */
	var setRemoveMask = function(){
		golbal.maskDom.remove();
	}
	// E
	
	/**
	 * 搜索框
	 * @param {Object} form
	 * @param {Object} input
	 * @param {Object} fun
	 */
	var search = function(form,input,fun){
		var self = this;
		$(form).off().on("submit",function(event){
			var keywords = $(this).find(input).val();
			if(fun && typeof fun === 'function') fun(keywords);
			event.preventDefault();
		})
	}
	/**
	 * 底部按钮点击打开二级菜单
	 */
	var handleShowMenu = function(obj,target){
		$(obj).on("click",function(){
			var $target = $(this).children(target),
				_hide = $target.css("display");
			return _hide==='none' ? $target.show() : $target.hide(); 
		})
	}

	
	
	
	
	//类似接口调用方式
	return{
		init:function(){	
			$('body').append('<p>app</p>')
		},
		handleAsyncTask:function(url, param, fun){//异步提交
			setAsyncTask(url, param, fun);
		},
		handleJSONP:function(url, param, fun){ //  跨域请求
			setJOSNP(url, param, fun);
		},
		handleTab:function(tabItem,tabBox,events,clazz){//选项卡 滑动门
			setSwitchDoor(tabItem,tabBox,events,clazz)
		},
		handleOpenMask:function(){
			setOpenMask(); //显示遮罩
		},
		handleRemoveMask:function(){
			setRemoveMask();//移除遮罩层
		}
	}
})();

module.exports = App;

//load
$(function(){
	//首页菜单显示
	App.init();
})

