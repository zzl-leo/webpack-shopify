
(function (win, undefined) {

	var regItem = {
		// 是否为必填
		required: function (field) {
			var value = field.value;

			//判断是不是单选框，多选框的可能
			if (field.type === 'checkbox' || field.type === 'radio') {
				return field.checked === true;
			}
			return value !== null && value !== '';
		},
		maxLength: function (field, length) {
			var value = field.value;
			return value.length <= length;
		},
		minLength: function (field, length) {
			var value = field.value;
			return value.length >= length;
		}

	};

	var Mvalidate = function (form) {
		this.form = document.forms[form];
		this.options = []
		this.formItems = this.form.querySelectorAll('.el-form-item__inner') // input
		this.checkBoxs = this.form.querySelectorAll('.el-checkbox__inner') // check
	};

	Mvalidate.prototype = {
		add: function (opts) {
			var self = this;
			self.options.push(opts);
			return self;
		},
		remove: function (elem) {
			var self = this,
				i = 0,
				j, len = self.options.length;

			for (; i < len; i++) {
				if (elem.trim() === self.options[i].name.trim()) {
					j = i;
				}
			}
			self.options.splice(j, 1);
			return self;
		},
		valid: function () {
			var self = this,
				i = 0,
				len = self.options.length,
				res = true;
			for (; i < len; i++) {
				console.log(self.options[i])
				if (validate.call(self, self.options[i]) === false) {
					// return false;
					res = false
				}
			}
			// return true;
			return res
		},
		init: function () {
			bindMethod.call(this, this.formItems, this.checkBoxs, this.options)
		}
	};
	win.Mvalidate = Mvalidate;

	/*******私有方法**************************************/

	// 表单校验
	function validate(opts) {
		let el = this.form[opts.name],
			i = 0;
		if (opts.rules) {
			for (; i < opts.rules.length; i++) {
				var valiReg = true,
					valiStr = true;
				if (typeof opts.rules[i] != 'string') {
					valiReg = validateReg(el, opts.rules[i])
				} else {
					valiStr = validateString(el, opts.rules[i])
				}

				if (!valiReg || !valiStr) {
					alertMessage.call(this, opts, opts.message[i]);
					tipsMessage.call(this, opts, opts.message[i], el.parentNode)
					return false;
				}
			}
		} else if (opts.sameTo) {
			var selfValue = el.value;
			var targetValue = this.form[opts.sameTo].value;
			if (selfValue !== targetValue) {
				alertMessage.call(this, opts, opts.message[i]);
				tipsMessage.call(this, opts, opts.message[i], el.parentNode)

				return false;
			}
		}

		return true;
	}

	function alertMessage(opts, message) {
		var errorEle = document.createElement('div');
		errorEle.className = 'errorMessage';
		var nodeEles = document.getElementsByClassName('errorMessage');

		if (nodeEles.length === 0) {
			document.getElementsByTagName('body')[0].appendChild(errorEle);
		}
		var errEl = document.getElementsByClassName('errorMessage')[0];
		errEl.innerHTML = message;
		errorMessageStyle(errEl);
		if (opts.callback) {
			opts.callback(this.form[opts.name], errEl)
		}
	}

	function errorMessageStyle(errEl) {

		errEl.style.display = 'block';

		if (!/animated fadeOut/.test(errEl.className)) {
			errEl.className += ' animated fadeOut';
		}

		errEl.addEventListener('webkitAnimationEnd', endAnime);
		errEl.addEventListener('animationend', endAnime);

		function endAnime() {
			removeClass(errEl, 'animated');
			removeClass(errEl, 'fadeOut');
			errEl.style.display = 'none'
		}

	}

	function validateReg(el, rule) {
		return rule.test(el.value)
	}

	function validateString(el, rule) {

		var result;
		var ruleArr = /(\w+)/ig.exec(rule);

		//不带参数的规则处理
		if (ruleArr[1] === ruleArr.input) {
			result = regItem[ruleArr.input](el);

		} else {
			//带参数的规则处理，如：maxLength
			ruleArr = /(\w+)\((\d+)/ig.exec(rule);
			result = regItem[ruleArr[1]](el, ruleArr[2]);
		}
		return result
	}

	function removeClass(ele, oldClass) {
		var classNames = ele.className.trim();
		classNames = classNames.replace(/\s+/g, ' ');
		var classNameArr = classNames.split(' ');
		for (var j = 0; j < classNameArr.length; j++) {
			if (oldClass === classNameArr[j]) {
				classNameArr.splice(j, 1)
			}
		}
		return ele.className = classNameArr.join(' ');
	}

	function addClass(ele, newClass) {
		if(!ele) {
			return
		}
		let classNames = ele.className.trim();
		classNames = classNames.replace(/\s+/g, ' ');
		let classNameArr = classNames.split(' ');
		const flag = classNameArr.every(name => {
			return name !== newClass
		})
		flag && classNameArr.push(newClass)
		return ele.className = classNameArr.join(' ');
	}

	function hasClass(ele, className) {
		let classNames = ele.className.trim()
		return classNames.indexOf(className) > -1
	}

	function cssStyle() {
		var cssStyle = document.createElement('style');
		cssStyle.type = 'text/css';
		cssStyle.innerHTML = '.errorMessage{display: none;}@media screen and (max-width: 750px) {.errorMessage{position:fixed;top:30%;right:0;left:0;display:block;margin:auto;padding:5%;width:60%;-webkit-border-radius:4px;background-color:rgba(0,0,0,.7);color:#fff;text-align:center;font-size:16px;transform:translateY(-50%);-ms-transform:translateY(-50%)}.animated{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeOut{50%{opacity:1}to{opacity:0}}@keyframes fadeOut{50%{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}}';

		document.head.appendChild(cssStyle);
	}

	function tipsMessage(opts, message, el) {
		var nodeEles = el.getElementsByClassName('el-form-item__error');
		if (nodeEles.length === 0) {
			var errorEle = document.createElement('div');
			errorEle.className = 'el-form-item__error el-zoom-in-top-enter-active';
			el.appendChild(errorEle);
		}
		var errEl = el.getElementsByClassName('el-form-item__error')[0];
		errEl.innerHTML = message;
		if (opts.callback) {
			opts.callback(this.form[opts.name], errEl)
		}
	}

	function removeErrMsg(el) {
		removeClass(el, 'is-error')
		addClass(el.querySelector('.el-form-item__error'), 'el-zoom-in-top-leave-active')
		setTimeout(() => {
			el.querySelector('.el-form-item__error') && el.removeChild(el.querySelector('.el-form-item__error'))
		}, 300);
	}

	function errTipsMessage(rule, el) {
		let hasError = false
		let i;
		if (rule.rules) {
			for(let a = 0; a < rule.rules.length; a++) {
				let valiReg = true,
					valiStr = true;
				if (typeof rule.rules[a] != 'string') {
					valiReg = validateReg(el.querySelector('.el-form-item__inner'), rule.rules[a])
				} else {
					valiStr = validateString(el.querySelector('.el-form-item__inner'), rule.rules[a])
				}
				if (!valiReg || !valiStr) { // 校验规则错误项匹配
					console.log(rule.rules[a])
					hasError = true
					tipsMessage.call(this, rule, rule.message[a], el)
					addClass(el, 'is-error')
					return false
				}
			}

			if(!hasError) { // 校验全部通过
				console.log('ok')
				removeErrMsg(el)
			}

		} else if (rule.sameTo) {
			const selfValue = el.querySelector('.el-form-item__inner').value;
			const targetValue = this.form[rule.sameTo].value;

			if (selfValue !== targetValue) {
				tipsMessage.call(this, rule, rule.message[0], el);
				return false;
			} else {
				removeErrMsg(el)
			}
		}
		return true;
	}

	function bindMethod(opts, checkBoxs, rules) {
		for (let i = 0; i < opts.length; i++) { // input
			const parentNode = opts[i].parentNode
			const attrName = opts[i].getAttribute('name')

			const needRule = rules.find((item) => {
				return item.name === attrName
			})

			// focus
			opts[i].addEventListener('focus', () => {
				parentNode.getAttribute('class').indexOf('is-focused') === -1 && addClass(parentNode, 'is-focused')
			});

			// blur
			opts[i].addEventListener('blur', () => {
				removeClass(parentNode, 'is-focused')
				errTipsMessage.call(this, needRule, parentNode)
			});
		}

		for (let i = 0; i < checkBoxs.length; i++) { // checkbox
			const parentNode = checkBoxs[i].parentNode
			const attrName = checkBoxs[i].getAttribute('name')
			const needRule = rules.find((item) => {
				return item.name === attrName
			})

			checkBoxs[i].addEventListener('change', (e) => {
				if(!checkBoxs[i].checked) {
					tipsMessage.call(this, opts, needRule.message[0], parentNode)
				} else {
					removeErrMsg(parentNode)
				}
			})
		}
	}
	cssStyle();
}(window));