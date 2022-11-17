/*
 * @Author: Leo
 * @Date: 2022-03-28 11:31:00
 * @LastEditTime: 2022-11-17 09:55:21
 * @LastEditors: Leo
 * @Description: 设置: 
 */

 (function(window, undefined) {
	"use strict";
    var modal = function() {
    	this.el = null; //挂载
    	this.backClose = false; //是否开启背景开启关闭。
    	this.fixed = false; //为true弹窗固定在头部，不会随着滚动下拉而移动，为false会随着滚动下拉而移动。
    	this.animation = 'none'; //打开动画效果
    	this.animationClose = 'close'; //关闭动画效果
		this.content = ''; //显示内容
    };
    
    modal.prototype = {
	    /**
	     * 初始化
	     * @param {object} option [对象]
	     * open          			打开或关闭弹窗  show | hide  
	     * el          				挂载元素ID    
	     * fixed        			弹窗随滚动条而上下移动  true | false   
	     * animation        		弹窗从上到下出现动画，soak-弹窗从小到大出现动画  up | soak | none   
	     * backClose        		点击背景关闭  true | false
	     */
    	init: function(option) {
    		this.el = option.el;
			this.content = option.content

    		if (this.el.indexOf('#') >= 0) {
    			document.querySelector(this.el).setAttribute('class', document.querySelector(this.el).getAttribute('class'));
    		} else {
    			throw new Error('参数错误，请正确填写#id');
    		}
    		
    		//是否开启背景开启关闭
    		if (option.backClose === undefined) {
    			var dataDackdropClose = document.querySelector(this.el).getAttribute('data-backClose');
    			
    			if (dataDackdropClose !== null && dataDackdropClose === 'static') {
					this.backClose = false;
    			} else if (dataDackdropClose !== null && dataDackdropClose !== 'static') {
    				throw new Error('参数错误，请正确填写data-backClose="static"');
    			} else {
    				this.backClose = false;
    			}
    		} else {
    			this.backClose = option.backClose;
    		}

    		//是否设置了动画
    		this.animation = 'none';
    		this.animation = option.animation === undefined ? this.animation : option.animation; //打开动画效果
			document.querySelector(this.el).querySelector('.modal-content').innerText = this.content
    		
    		if (option.animation === undefined) {
    			this._addIndexOf();
    			var divClass = document.querySelector(this.el).getAttribute('class');
    			
    			if (divClass !== null) {
    				var divClassArr = divClass.split(' ');

    				if (divClassArr.indexOf('up') >= 0) {
    					this.animation = divClassArr[divClassArr.indexOf('up')];
    				} else if (divClassArr.indexOf('soak') >= 0) {
    					this.animation = divClassArr[divClassArr.indexOf('soak')];
    				} else {
    					this.animation = 'none';
    				}
    			}   			
    		}
    		
			document.querySelector(this.el).setAttribute('data-animation', this.animation);
    		this.animationClose = 'close';
    		this.animationClose = this.animation + '-' + this.animationClose;
    		this.fixed = option.fixed === undefined ? this.fixed : option.fixed;

    		if (option.open === 'show') {
    			this._getFadeKeyframes(this.el);
    			var divDocument = document.querySelector(this.el);
    			divDocument.style.display = 'block';

				//根据动画效果初始化弹窗的默认定位高度
				if (this.animation === 'up') {
					document.querySelector('.'+this.animation+'' + ' .modal-dialog').style.top = this._isUserAgentIE() ? '180px' : '0px';
				} else if (this.animation === 'soak') {
					document.querySelector('.'+this.animation+'' + ' .modal-dialog').style.top = '180px';
				}	    		
	    		
	    		//弹窗是否因滚动下拉而移动
	    		if (this.fixed) {
	    			divDocument.style.position = 'absolute';
	    		} else {
	    			divDocument.style.position = 'fixed';
	    		}

				//插入data状态到关闭按钮
				var dataClose = document.querySelectorAll(this.el+'' + ' [data-close="modal"]');
				
				if (dataClose.length) {
					for (var i = 0; i < dataClose.length; i++) {
						dataClose[i].setAttribute('data-parentId', this.el);
					}					
				}
				
				//插入关闭动画状态
				divDocument.setAttribute('data-closeStatus', this.animationClose);
	    		
    			this._mask('create');			
    		} else if (option.open === 'hide') {
				this._getFadeKeyframes(this.el);
    			this._getInKeyframes(this.el, 'hide');		
    		} else {
    			 throw new Error('参数错误');
    		}
    	},
	    /**
	     * 遮罩层
	     * @param {string} params [create-创建，remove-删除]
	     * @param {string} el [遮罩层domId]
	     */
    	_mask: function(params, el) {		   		
    		if (params === 'create') {
    			if (document.querySelector('[data-id="'+ this.el +'"]') === null) {
		    		var div = document.createElement('div');
		    		div.setAttribute('class', 'el-modal-mask');
		    		div.setAttribute('data-id', this.el);
		    		div.setAttribute('data-class', 'modal-container ' + this.animation);
						div.innerHTML = ' '
		    		// document.body.appendChild(div);
					document.querySelector('.main-content').appendChild(div);
		    		
		    		//添加背景关闭事件
		    		
		    		if (this.backClose === false) {
						//
		    		} else if (this.backClose === true) {
		    			//兼容IE
		    			if (this._isUserAgentIE()) {
		    				document.querySelector(this.el).detachEvent('onclick', this._dataDackdropClose);
		    				document.querySelector(this.el).attachEvent('onclick', this._dataDackdropClose);
		    			} else {
				    		document.querySelector(this.el).removeEventListener('click', this._dataDackdropClose, false);				    					    		
				    		document.querySelector(this.el).addEventListener('click', this._dataDackdropClose, false);				    					    		
						}
		    		} else {
		    			throw new Error('参数错误');
		    		}

	    			//添加快捷键退出事件，兼容IE
	    			if (this._isUserAgentIE()) {
	    				document.detachEvent('onkeydown', this._keypress);
	    				document.attachEvent('onkeydown', this._keypress);
	    			} else {
	    				document.removeEventListener('keydown', this._keypress, false);
			    		document.addEventListener('keydown', this._keypress, false);				    		
	    			}
		    			
    				//添加属性关闭事件
		    		var dataClose = document.querySelectorAll(this.el + ' [data-close="modal"]');
					
		    		if (dataClose.length > 0) {
		    			for (var i = 0; i < dataClose.length; i++) {
			    			//兼容IE
			    			if (this._isUserAgentIE()) {
			    				document.querySelectorAll(this.el + ' [data-close="modal"]')[i].attachEvent('onclick', this._dataClose);
			    			} else {
			    				document.querySelectorAll(this.el + ' [data-close="modal"]')[i].removeEventListener('click', this._dataClose, false);
		    					document.querySelectorAll(this.el + ' [data-close="modal"]')[i].addEventListener('click', this._dataClose, false);		    					
			    			}		    				
		    			}
		    		}    				
    			}
    		} else if (params === 'remove') {
    			var modalMaskSelectArr = document.querySelectorAll('.el-modal-mask');
				
    			if (modalMaskSelectArr.length > 0) {
    				if (document.querySelector('[data-id="'+ el +'"]') != null && el) {   					
						// document.body.removeChild(document.querySelector('[data-id="'+ el +'"]'));
						document.querySelector('.main-content').removeChild(document.querySelector('[data-id="'+ el +'"]'));
    				}				     			  				
    			}
    		} else {
    			throw new Error('参数错误');
    		}
    	},
    	_keypress: function(e) {
    		if (e.keyCode === 27) {
				var modalMaskSelectArr = document.querySelectorAll('.el-modal-mask');
	
				if (modalMaskSelectArr.length > 0) {
					var el = modalMaskSelectArr[modalMaskSelectArr.length - 1].getAttribute('data-id');
					window.modal.prototype._getInKeyframes(el, 'keypress');		 				
				}				  			
    		}
    	},
	    //属性关闭事件   	
    	_dataClose: function(e) {
    		var e = e || window.event;
    		var target = e.srcElement ? e.srcElement: e.target;
    		window.modal.prototype._getInKeyframes(target.getAttribute('data-parentId'), 'dataClose');
    	},    
	    //背景关闭事件
    	_dataDackdropClose: function(e) {
    		var e = e || window.event;
    		var target = e.srcElement ? e.srcElement: e.target;
    		var currentTarget = e.srcElement ? e.srcElement: e.currentTarget;
			if (target !== currentTarget) return;
			window.modal.prototype._getInKeyframes('#' + target.id, 'dataDackdropClose');		
    	},
	    /**
	     * 生成打开弹窗特效
	     * @param {string} el [遮罩层domId]
	     */    	
    	_getFadeKeyframes: function(el) {
			if (document.querySelector('[data-id="'+ el +'"]') === null) {
				document.querySelector(el).setAttribute('class', 'modal-container ' + this.animation);
			} else {
				document.querySelector(el).setAttribute('class', document.querySelector('[data-id="'+ el +'"]').getAttribute('data-class'));
			}				
    	},    	
	    /**
	     * 关闭弹窗特效
	     * @param {string} el [遮罩层domId]
	     * @param {string} params [来自那个事件]
	     */      	
    	_getInKeyframes: function(el, params) {
    		var that = this;
    		var didvDocument = el === '#' ? '' : document.querySelector(el);
    		if (didvDocument === '') return;    		
    		
			//判断是否开启了背景关闭，没有就设置动画
			var animationClose = document.querySelector(el).getAttribute('data-closeStatus');

			if (document.querySelector('[data-id="'+ el +'"]') === null) {
				didvDocument.setAttribute('class', 'modal-container');
			} else {
				didvDocument.setAttribute('class', 'modal-container ' + animationClose);					
			}
			
			//根据弹窗动画设置关闭等待时间
			var animation = document.querySelector(el).getAttribute('data-animation');

			if (animation === 'none') {
				var time = 0;
			} else if (animation === 'up') {
				var time = 50;
			} else if (animation === 'soak') {
				var time = 180;
			}

			setTimeout(function() {
				didvDocument.style.display = 'none';			
				that._getFadeKeyframes(el, 'getInKeyframes');
				that._mask('remove', el);
			}, time);			
    	},
    	//判断是否是IE浏览器
    	_isUserAgentIE: function() {
    		var userAgent = navigator.userAgent;
    		
		    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
		        return true;
		    } else {
		    	return false;
		    }
    	},
    	//添加数组IndexOf方法
    	_addIndexOf: function() {    		
			if(!Array.prototype.indexOf) {
				Array.prototype.indexOf = function(elt) {
					var len = this.length >>> 0;			
					var from = Number(arguments[1]) || 0;
					
					from = (from < 0) ? Math.ceil(from) : Math.floor(from);
					
					if (from < 0)
						from += len;
			
					for (; from < len; from++) {
						if (from in this && this[from] === elt) return from;
					}
					
					return -1;
				};
			}    		
    	}
    }
    
    // window.modal = new modal();

	window.modal = modal
	return modal
})(window);