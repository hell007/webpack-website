/*  
 * @FormValidate组件
 * @auther kunyujie.com
 * @method  FormValidate  
 * @cfg 默认配置参数   
 * @param {String} tag -提示文字属性标签      
 * @param {Object} container -父容器
 * @note:注意此组件需要 jquery.poshytip.js的支持
 * @example   
 * new FormValidate({tag:"title",container:'formmodify'});
 * FormValidate.checked();
*/  
! function(){
	function FormValidate(cfg){ 
		this.defaults = {                
	        tag:'title',       
	        container:'formId'  
	    }  
		$.extend(this.defaults,cfg);
		//初始化    
		this.defaults.$container = $('#' + this.defaults.container);
		return this;
	}
	
	/**
	 * checked fun:对form的 input isRquired必须参数的验证
	 */
	FormValidate.prototype.checked = function(){
		var self = this, flag = true, msg = "",
			$container = self.defaults.$container;
		$.each($container.find("input[isRequired],textarea[isRequired],select[isRequired]"), function (i, o) {
			$(o).poshytip('destroy');//先销毁
			//如果未填入值，提示
			if($.trim($(o).val())==""){
				self.tip($(o),$(o).attr(self.defaults.tag));
				return flag = false;
			}
			//如果填入值，进行类型验证
			msg = $.trim($(o).attr(self.defaults.tag));
	        switch ($(o).attr("validatetype")) {
	            case "String": //字符串
	                flag = self.validate(o, "String");
	                if(!msg) msg = "请输入2个以上字符！";
	                break;
	            case "Int": //整数
	                flag = self.validate(o, "Int");
	                msg = "请输入整数！";
	                break;
	            case "Float":
	                flag = self.validate(o, "Float");
	                msg = "请输入浮点数！";
	                break;
	            case "Date":
	                flag = self.validate(o, "Date");
	                msg = "请输入日期型！";
	                break;
	            case "Email":
	                flag = self.validate(o, "Email");
	                msg = "请输入正确的邮箱格式！";
	                break;
	            case "PID":
	                flag = self.validate(o, "PID");
	                msg = "请正确的身份证格式！";
	                break;
	            case "Tell":
	                flag = self.validate(o, "Tell");
	                msg = "请正确的固定电话格式！";
	                break;
				 case "Phone":
	                flag = self.validate(o, "Phone");
	                msg = "请正确的手机号码！";
	                break;
	            default: break;
	        }
	        if (!flag) {
	            self.tip($(o), msg);
	            return flag;
	        }
		});
		if (!flag) {
	        return flag;
	    }
	    return true;
	}
	
	/**
	 * tip fun:对poshytip方法的封装
	 * @param {Object} o
	 * @param {String} msg
	 **/
	FormValidate.prototype.tip = function(o,msg){
		$(o).poshytip('destroy');
	    $(o).poshytip({
	        className: 'tip-yellowsimple',
	        content: msg,
	        showOn: 'none',
	        alignTo: 'target',
	        alignX: 'inner-left',
	        offsetX: 0,  
	        offsetY: 5   
	    });
	    $(o).poshytip('show');
	    $(o).focus();
	    $(o).bind('blur', function () {
	        $(this).poshytip('hide');
	        $(this).poshytip('destroy');
	    });
	}
	
	/**
	 * validate fun:对类型的验证
	 * @param {Object} o
	 * @param {String} validatetype
	 **/
	FormValidate.prototype.validate = function(o,validatetype){
		var reg, res;
	    switch (validatetype) {
	        case "String": //用户名,可以为中文
	            reg = /[\w\u4e00-\u9fa5]{2,255}$/;
	            break;
	        case "Pwd": //密码
	            reg = /^\w{4,20}$/;
	            break;
	        case "Tell": //电话号码
	            reg = /^[0-9,-]{5,30}$/;
	            break;
	        case "FN": //传真号码
	            reg = /^[0-9,-]{7,30}$/;
	            break;
	        case "Phone": //手机
	            reg = /^((\(\d{3}\))|(\d{3}\-))?0?1[358][0-9]\d{8}([,]((\(\d{3}\))|(\d{3}\-))?0?1[358][0-9]\d{8}){0,2}$/;
	            break;
	        case "Zip": //邮编
	            reg = /^\d{6}$/;
	            break;
	        case "Email": //电子邮箱
	            reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	            break;
	        case "Url": //网址
	            reg = /([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; //不包括"http://"
	            //re = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	            break;
	        case "Num": //数字
	            reg = /^\d{1,10}$/;
	            break;
	        case "QQ": // QQ号码           
	            reg = /^\d{5,10}$/;
	            break;
	        case "Money"://金额
	            reg = /^[0-9]+(.[0-9]{1,2})?$/;
	            break;
	        case "Int": //整形
	            reg = /^-?\\d+$/;
	            break;
	        case "Float": //浮点型
	            reg = /^[0-9]+(.[0-9]{1,10})?$/;
	            break;
	        case "Date": //日期型
	            reg = /^((\\d{4})|(\\d{2}))-(\\d{1,2})-(\\d{1,2})$/;
	            break;
	        case "PID": //身份证
	            reg = /^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
	            break;
	        default:
	            alert("出错啦!");
	            return;
	    }
	    return res = reg.test($.trim($(o).val()));
	}
	window.FormValidate = FormValidate;
}();

/*
 *全局app
 * 
 */
var App = function(){
		
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
}();

module.exports = App;

//load
$(function(){
	//首页菜单显示
	App.init();
})

