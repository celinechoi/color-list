/*!
 * iScroll v4.2 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(i, F) {
	var v = Math,
		n = F.createElement('div').style,
		A = (function() {
			var I = 't,webkitT,MozT,msT,OT'.split(','),
				H,
				G = 0,
				m = I.length;
			for (; G < m; G++) {
				H = I[G] + 'ransform';
				if (H in n) {
					return I[G].substr(0, I[G].length - 1);
				}
			}
			return false;
		})(),
		E = A ? '-' + A.toLowerCase() + '-' : '',
		l = s('transform'),
		y = s('transitionProperty'),
		k = s('transitionDuration'),
		o = s('transformOrigin'),
		C = s('transitionTimingFunction'),
		e = s('transitionDelay'),
		B = /android/gi.test(navigator.appVersion),
		h = /iphone|ipad/gi.test(navigator.appVersion),
		r = /hp-tablet/gi.test(navigator.appVersion),
		j = s('perspective') in n,
		z = 'ontouchstart' in i && !r,
		d = !!A,
		f = s('transition') in n,
		g = 'onorientationchange' in i ? 'orientationchange' : 'resize',
		b = z ? 'touchstart' : 'mousedown',
		t = z ? 'touchmove' : 'mousemove',
		c = z ? 'touchend' : 'mouseup',
		x = z ? 'touchcancel' : 'mouseup',
		u = A == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
		a = (function() {
			if (A === false) {
				return false;
			}
			var m = {
				'': 'transitionend',
				webkit: 'webkitTransitionEnd',
				Moz: 'transitionend',
				O: 'oTransitionEnd',
				ms: 'MSTransitionEnd',
			};
			return m[A];
		})(),
		q = (function() {
			return (
				i.requestAnimationFrame ||
				i.webkitRequestAnimationFrame ||
				i.mozRequestAnimationFrame ||
				i.oRequestAnimationFrame ||
				i.msRequestAnimationFrame ||
				function(m) {
					return setTimeout(m, 1);
				}
			);
		})(),
		p = (function() {
			return (
				i.cancelRequestAnimationFrame ||
				i.webkitCancelAnimationFrame ||
				i.webkitCancelRequestAnimationFrame ||
				i.mozCancelRequestAnimationFrame ||
				i.oCancelRequestAnimationFrame ||
				i.msCancelRequestAnimationFrame ||
				clearTimeout
			);
		})(),
		D = j ? ' translateZ(0)' : '',
		w = function(H, m) {
			var I = this,
				G;
			I.wrapper = typeof H == 'object' ? H : F.getElementById(H);
			I.wrapper.style.overflow = 'hidden';
			I.scroller = I.wrapper.children[0];
			I.options = {
				hScroll: true,
				vScroll: true,
				x: 0,
				y: 0,
				bounce: true,
				bounceLock: false,
				momentum: true,
				lockDirection: true,
				useTransform: true,
				useTransition: false,
				topOffset: 0,
				checkDOMChanges: false,
				handleClick: true,
				hScrollbar: true,
				vScrollbar: true,
				fixedScrollbar: B,
				hideScrollbar: h,
				fadeScrollbar: h && j,
				scrollbarClass: '',
				zoom: false,
				zoomMin: 1,
				zoomMax: 4,
				doubleTapZoom: 2,
				wheelAction: 'scroll',
				snap: false,
				snapThreshold: 1,
				onRefresh: null,
				onBeforeScrollStart: function(J) {
					J.preventDefault();
				},
				onScrollStart: null,
				onBeforeScrollMove: null,
				onScrollMove: null,
				onBeforeScrollEnd: null,
				onScrollEnd: null,
				onTouchEnd: null,
				onDestroy: null,
				onZoomStart: null,
				onZoom: null,
				onZoomEnd: null,
			};
			for (G in m) {
				I.options[G] = m[G];
			}
			I.x = I.options.x;
			I.y = I.options.y;
			I.options.useTransform = d && I.options.useTransform;
			I.options.hScrollbar = I.options.hScroll && I.options.hScrollbar;
			I.options.vScrollbar = I.options.vScroll && I.options.vScrollbar;
			I.options.zoom = I.options.useTransform && I.options.zoom;
			I.options.useTransition = f && I.options.useTransition;
			if (I.options.zoom && B) {
				D = '';
			}
			I.scroller.style[y] = I.options.useTransform
				? E + 'transform'
				: 'top left';
			I.scroller.style[k] = '0';
			I.scroller.style[o] = '0 0';
			if (I.options.useTransition) {
				I.scroller.style[C] = 'cubic-bezier(0.33,0.66,0.66,1)';
			}
			if (I.options.useTransform) {
				I.scroller.style[l] = 'translate(' + I.x + 'px,' + I.y + 'px)' + D;
			} else {
				I.scroller.style.cssText +=
					';position:absolute;top:' + I.y + 'px;left:' + I.x + 'px';
			}
			if (I.options.useTransition) {
				I.options.fixedScrollbar = true;
			}
			I.refresh();
			I._bind(g, i);
			I._bind(b);
			if (!z) {
				I._bind('mouseout', I.wrapper);
				if (I.options.wheelAction != 'none') {
					I._bind(u);
				}
			}
			if (I.options.checkDOMChanges) {
				I.checkDOMTime = setInterval(function() {
					I._checkDOMChanges();
				}, 500);
			}
		};
	w.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		currPageX: 0,
		currPageY: 0,
		pagesX: [],
		pagesY: [],
		aniTime: null,
		wheelZoomCount: 0,
		handleEvent: function(G) {
			var m = this;
			switch (G.type) {
				case b:
					if (!z && G.button !== 0) {
						return;
					}
					m._start(G);
					break;
				case t:
					m._move(G);
					break;
				case c:
				case x:
					m._end(G);
					break;
				case g:
					m._resize();
					break;
				case u:
					m._wheel(G);
					break;
				case 'mouseout':
					m._mouseout(G);
					break;
				case a:
					m._transitionEnd(G);
					break;
			}
		},
		_checkDOMChanges: function() {
			if (
				this.moved ||
				this.zoomed ||
				this.animating ||
				(this.scrollerW == this.scroller.offsetWidth * this.scale &&
					this.scrollerH == this.scroller.offsetHeight * this.scale)
			) {
				return;
			}
			this.refresh();
		},
		_scrollbar: function(m) {
			var H = this,
				G;
			if (!H[m + 'Scrollbar']) {
				if (H[m + 'ScrollbarWrapper']) {
					if (d) {
						H[m + 'ScrollbarIndicator'].style[l] = '';
					}
					H[m + 'ScrollbarWrapper'].parentNode.removeChild(
						H[m + 'ScrollbarWrapper'],
					);
					H[m + 'ScrollbarWrapper'] = null;
					H[m + 'ScrollbarIndicator'] = null;
				}
				return;
			}
			if (!H[m + 'ScrollbarWrapper']) {
				G = F.createElement('div');
				if (H.options.scrollbarClass) {
					G.className = H.options.scrollbarClass + m.toUpperCase();
				} else {
					G.style.cssText =
						'position:absolute;z-index:100;' +
						(m == 'h'
							? 'height:7px;bottom:1px;left:2px;right:' +
							  (H.vScrollbar ? '7' : '2') +
							  'px'
							: 'width:7px;bottom:' +
							  (H.hScrollbar ? '7' : '2') +
							  'px;top:2px;right:1px');
				}
				G.style.cssText +=
					';pointer-events:none;' +
					E +
					'transition-property:opacity;' +
					E +
					'transition-duration:' +
					(H.options.fadeScrollbar ? '350ms' : '0') +
					';overflow:hidden;opacity:' +
					(H.options.hideScrollbar ? '0' : '1');
				H.wrapper.appendChild(G);
				H[m + 'ScrollbarWrapper'] = G;
				G = F.createElement('div');
				if (!H.options.scrollbarClass) {
					G.style.cssText =
						'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' +
						E +
						'background-clip:padding-box;' +
						E +
						'box-sizing:border-box;' +
						(m == 'h' ? 'height:100%' : 'width:100%') +
						';' +
						E +
						'border-radius:3px;border-radius:3px';
				}
				G.style.cssText +=
					';pointer-events:none;' +
					E +
					'transition-property:' +
					E +
					'transform;' +
					E +
					'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' +
					E +
					'transition-duration:0;' +
					E +
					'transform: translate(0,0)' +
					D;
				if (H.options.useTransition) {
					G.style.cssText +=
						';' +
						E +
						'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
				}
				H[m + 'ScrollbarWrapper'].appendChild(G);
				H[m + 'ScrollbarIndicator'] = G;
			}
			if (m == 'h') {
				H.hScrollbarSize = H.hScrollbarWrapper.clientWidth;
				H.hScrollbarIndicatorSize = v.max(
					v.round((H.hScrollbarSize * H.hScrollbarSize) / H.scrollerW),
					8,
				);
				H.hScrollbarIndicator.style.width = H.hScrollbarIndicatorSize + 'px';
				H.hScrollbarMaxScroll = H.hScrollbarSize - H.hScrollbarIndicatorSize;
				H.hScrollbarProp = H.hScrollbarMaxScroll / H.maxScrollX;
			} else {
				H.vScrollbarSize = H.vScrollbarWrapper.clientHeight;
				H.vScrollbarIndicatorSize = v.max(
					v.round((H.vScrollbarSize * H.vScrollbarSize) / H.scrollerH),
					8,
				);
				H.vScrollbarIndicator.style.height = H.vScrollbarIndicatorSize + 'px';
				H.vScrollbarMaxScroll = H.vScrollbarSize - H.vScrollbarIndicatorSize;
				H.vScrollbarProp = H.vScrollbarMaxScroll / H.maxScrollY;
			}
			H._scrollbarPos(m, true);
		},
		_resize: function() {
			var m = this;
			setTimeout(
				function() {
					m.refresh();
				},
				B ? 200 : 0,
			);
		},
		_pos: function(m, G) {
			if (this.zoomed) {
				return;
			}
			m = this.hScroll ? m : 0;
			G = this.vScroll ? G : 0;
			if (this.options.useTransform) {
				this.scroller.style[l] =
					'translate(' + m + 'px,' + G + 'px) scale(' + this.scale + ')' + D;
			} else {
				m = v.round(m);
				G = v.round(G);
				this.scroller.style.left = m + 'px';
				this.scroller.style.top = G + 'px';
			}
			this.x = m;
			this.y = G;
			this._scrollbarPos('h');
			this._scrollbarPos('v');
		},
		_scrollbarPos: function(m, I) {
			var H = this,
				J = m == 'h' ? H.x : H.y,
				G;
			if (!H[m + 'Scrollbar']) {
				return;
			}
			J = H[m + 'ScrollbarProp'] * J;
			if (J < 0) {
				if (!H.options.fixedScrollbar) {
					G = H[m + 'ScrollbarIndicatorSize'] + v.round(J * 3);
					if (G < 8) {
						G = 8;
					}
					H[m + 'ScrollbarIndicator'].style[m == 'h' ? 'width' : 'height'] =
						G + 'px';
				}
				J = 0;
			} else {
				if (J > H[m + 'ScrollbarMaxScroll']) {
					if (!H.options.fixedScrollbar) {
						G =
							H[m + 'ScrollbarIndicatorSize'] -
							v.round((J - H[m + 'ScrollbarMaxScroll']) * 3);
						if (G < 8) {
							G = 8;
						}
						H[m + 'ScrollbarIndicator'].style[m == 'h' ? 'width' : 'height'] =
							G + 'px';
						J =
							H[m + 'ScrollbarMaxScroll'] +
							(H[m + 'ScrollbarIndicatorSize'] - G);
					} else {
						J = H[m + 'ScrollbarMaxScroll'];
					}
				}
			}
			H[m + 'ScrollbarWrapper'].style[e] = '0';
			H[m + 'ScrollbarWrapper'].style.opacity =
				I && H.options.hideScrollbar ? '0' : '1';
			H[m + 'ScrollbarIndicator'].style[l] =
				'translate(' + (m == 'h' ? J + 'px,0)' : '0,' + J + 'px)') + D;
		},
		_start: function(L) {
			var K = this,
				G = z ? L.touches[0] : L,
				H,
				m,
				M,
				J,
				I;
			if (!K.enabled) {
				return;
			}
			if (K.options.onBeforeScrollStart) {
				K.options.onBeforeScrollStart.call(K, L);
			}
			if (K.options.useTransition || K.options.zoom) {
				K._transitionTime(0);
			}
			K.moved = false;
			K.animating = false;
			K.zoomed = false;
			K.distX = 0;
			K.distY = 0;
			K.absDistX = 0;
			K.absDistY = 0;
			K.dirX = 0;
			K.dirY = 0;
			if (K.options.zoom && z && L.touches.length > 1) {
				J = v.abs(L.touches[0].pageX - L.touches[1].pageX);
				I = v.abs(L.touches[0].pageY - L.touches[1].pageY);
				K.touchesDistStart = v.sqrt(J * J + I * I);
				K.originX =
					v.abs(
						L.touches[0].pageX + L.touches[1].pageX - K.wrapperOffsetLeft * 2,
					) /
						2 -
					K.x;
				K.originY =
					v.abs(
						L.touches[0].pageY + L.touches[1].pageY - K.wrapperOffsetTop * 2,
					) /
						2 -
					K.y;
				if (K.options.onZoomStart) {
					K.options.onZoomStart.call(K, L);
				}
			}
			if (K.options.momentum) {
				if (K.options.useTransform) {
					H = getComputedStyle(K.scroller, null)
						[l].replace(/[^0-9\-.,]/g, '')
						.split(',');
					m = H[4] * 1;
					M = H[5] * 1;
				} else {
					m =
						getComputedStyle(K.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
					M =
						getComputedStyle(K.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
				}
				if (m != K.x || M != K.y) {
					if (K.options.useTransition) {
						K._unbind(a);
					} else {
						p(K.aniTime);
					}
					K.steps = [];
					K._pos(m, M);
				}
			}
			K.absStartX = K.x;
			K.absStartY = K.y;
			K.startX = K.x;
			K.startY = K.y;
			K.pointX = G.pageX;
			K.pointY = G.pageY;
			K.startTime = L.timeStamp || Date.now();
			if (K.options.onScrollStart) {
				K.options.onScrollStart.call(K, L);
			}
			K._bind(t);
			K._bind(c);
			K._bind(x);
		},
		_move: function(N) {
			var L = this,
				O = z ? N.touches[0] : N,
				J = O.pageX - L.pointX,
				H = O.pageY - L.pointY,
				m = L.x + J,
				P = L.y + H,
				K,
				I,
				G,
				M = N.timeStamp || Date.now();
			if (L.options.onBeforeScrollMove) {
				L.options.onBeforeScrollMove.call(L, N);
			}
			if (L.options.zoom && z && N.touches.length > 1) {
				K = v.abs(N.touches[0].pageX - N.touches[1].pageX);
				I = v.abs(N.touches[0].pageY - N.touches[1].pageY);
				L.touchesDist = v.sqrt(K * K + I * I);
				L.zoomed = true;
				G = (1 / L.touchesDistStart) * L.touchesDist * this.scale;
				if (G < L.options.zoomMin) {
					G = 0.5 * L.options.zoomMin * Math.pow(2, G / L.options.zoomMin);
				} else {
					if (G > L.options.zoomMax) {
						G = 2 * L.options.zoomMax * Math.pow(0.5, L.options.zoomMax / G);
					}
				}
				L.lastScale = G / this.scale;
				(m = this.originX - this.originX * L.lastScale + this.x),
					(P = this.originY - this.originY * L.lastScale + this.y);
				this.scroller.style[l] =
					'translate(' + m + 'px,' + P + 'px) scale(' + G + ')' + D;
				if (L.options.onZoom) {
					L.options.onZoom.call(L, N);
				}
				return;
			}
			L.pointX = O.pageX;
			L.pointY = O.pageY;
			if (m > 0 || m < L.maxScrollX) {
				m = L.options.bounce
					? L.x + J / 2
					: m >= 0 || L.maxScrollX >= 0
					? 0
					: L.maxScrollX;
			}
			if (P > L.minScrollY || P < L.maxScrollY) {
				P = L.options.bounce
					? L.y + H / 2
					: P >= L.minScrollY || L.maxScrollY >= 0
					? L.minScrollY
					: L.maxScrollY;
			}
			L.distX += J;
			L.distY += H;
			L.absDistX = v.abs(L.distX);
			L.absDistY = v.abs(L.distY);
			if (L.absDistX < 6 && L.absDistY < 6) {
				return;
			}
			if (L.options.lockDirection) {
				if (L.absDistX > L.absDistY + 5) {
					P = L.y;
					H = 0;
				} else {
					if (L.absDistY > L.absDistX + 5) {
						m = L.x;
						J = 0;
					}
				}
			}
			L.moved = true;
			L._pos(m, P);
			L.dirX = J > 0 ? -1 : J < 0 ? 1 : 0;
			L.dirY = H > 0 ? -1 : H < 0 ? 1 : 0;
			if (M - L.startTime > 300) {
				L.startTime = M;
				L.startX = L.x;
				L.startY = L.y;
			}
			if (L.options.onScrollMove) {
				L.options.onScrollMove.call(L, N);
			}
		},
		_end: function(N) {
			if (z && N.touches.length !== 0) {
				return;
			}
			var L = this,
				T = z ? N.changedTouches[0] : N,
				O,
				S,
				H = { dist: 0, time: 0 },
				m = { dist: 0, time: 0 },
				K = (N.timeStamp || Date.now()) - L.startTime,
				P = L.x,
				M = L.y,
				R,
				Q,
				G,
				J,
				I;
			L._unbind(t);
			L._unbind(c);
			L._unbind(x);
			if (L.options.onBeforeScrollEnd) {
				L.options.onBeforeScrollEnd.call(L, N);
			}
			if (L.zoomed) {
				I = L.scale * L.lastScale;
				I = Math.max(L.options.zoomMin, I);
				I = Math.min(L.options.zoomMax, I);
				L.lastScale = I / L.scale;
				L.scale = I;
				L.x = L.originX - L.originX * L.lastScale + L.x;
				L.y = L.originY - L.originY * L.lastScale + L.y;
				L.scroller.style[k] = '200ms';
				L.scroller.style[l] =
					'translate(' + L.x + 'px,' + L.y + 'px) scale(' + L.scale + ')' + D;
				L.zoomed = false;
				L.refresh();
				if (L.options.onZoomEnd) {
					L.options.onZoomEnd.call(L, N);
				}
				return;
			}
			if (!L.moved) {
				if (z) {
					if (L.doubleTapTimer && L.options.zoom) {
						clearTimeout(L.doubleTapTimer);
						L.doubleTapTimer = null;
						if (L.options.onZoomStart) {
							L.options.onZoomStart.call(L, N);
						}
						L.zoom(
							L.pointX,
							L.pointY,
							L.scale == 1 ? L.options.doubleTapZoom : 1,
						);
						if (L.options.onZoomEnd) {
							setTimeout(function() {
								L.options.onZoomEnd.call(L, N);
							}, 200);
						}
					} else {
						if (this.options.handleClick) {
							L.doubleTapTimer = setTimeout(
								function() {
									L.doubleTapTimer = null;
									O = T.target;
									while (O.nodeType != 1) {
										O = O.parentNode;
									}
									if (
										O.tagName != 'SELECT' &&
										O.tagName != 'INPUT' &&
										O.tagName != 'TEXTAREA'
									) {
										S = F.createEvent('MouseEvents');
										S.initMouseEvent(
											'click',
											true,
											true,
											N.view,
											1,
											T.screenX,
											T.screenY,
											T.clientX,
											T.clientY,
											N.ctrlKey,
											N.altKey,
											N.shiftKey,
											N.metaKey,
											0,
											null,
										);
										S._fake = true;
										O.dispatchEvent(S);
									}
								},
								L.options.zoom ? 250 : 0,
							);
						}
					}
				}
				L._resetPos(200);
				if (L.options.onTouchEnd) {
					L.options.onTouchEnd.call(L, N);
				}
				return;
			}
			if (K < 300 && L.options.momentum) {
				H = P
					? L._momentum(
							P - L.startX,
							K,
							-L.x,
							L.scrollerW - L.wrapperW + L.x,
							L.options.bounce ? L.wrapperW : 0,
					  )
					: H;
				m = M
					? L._momentum(
							M - L.startY,
							K,
							-L.y,
							L.maxScrollY < 0
								? L.scrollerH - L.wrapperH + L.y - L.minScrollY
								: 0,
							L.options.bounce ? L.wrapperH : 0,
					  )
					: m;
				P = L.x + H.dist;
				M = L.y + m.dist;
				if ((L.x > 0 && P > 0) || (L.x < L.maxScrollX && P < L.maxScrollX)) {
					H = { dist: 0, time: 0 };
				}
				if (
					(L.y > L.minScrollY && M > L.minScrollY) ||
					(L.y < L.maxScrollY && M < L.maxScrollY)
				) {
					m = { dist: 0, time: 0 };
				}
			}
			if (H.dist || m.dist) {
				G = v.max(v.max(H.time, m.time), 10);
				if (L.options.snap) {
					R = P - L.absStartX;
					Q = M - L.absStartY;
					if (
						v.abs(R) < L.options.snapThreshold &&
						v.abs(Q) < L.options.snapThreshold
					) {
						L.scrollTo(L.absStartX, L.absStartY, 200);
					} else {
						J = L._snap(P, M);
						P = J.x;
						M = J.y;
						G = v.max(J.time, G);
					}
				}
				L.scrollTo(v.round(P), v.round(M), G);
				if (L.options.onTouchEnd) {
					L.options.onTouchEnd.call(L, N);
				}
				return;
			}
			if (L.options.snap) {
				R = P - L.absStartX;
				Q = M - L.absStartY;
				if (
					v.abs(R) < L.options.snapThreshold &&
					v.abs(Q) < L.options.snapThreshold
				) {
					L.scrollTo(L.absStartX, L.absStartY, 200);
				} else {
					J = L._snap(L.x, L.y);
					if (J.x != L.x || J.y != L.y) {
						L.scrollTo(J.x, J.y, J.time);
					}
				}
				if (L.options.onTouchEnd) {
					L.options.onTouchEnd.call(L, N);
				}
				return;
			}
			L._resetPos(200);
			if (L.options.onTouchEnd) {
				L.options.onTouchEnd.call(L, N);
			}
		},
		_resetPos: function(H) {
			var m = this,
				I = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x,
				G =
					m.y >= m.minScrollY || m.maxScrollY > 0
						? m.minScrollY
						: m.y < m.maxScrollY
						? m.maxScrollY
						: m.y;
			if (I == m.x && G == m.y) {
				if (m.moved) {
					m.moved = false;
					if (m.options.onScrollEnd) {
						m.options.onScrollEnd.call(m);
					}
				}
				if (m.hScrollbar && m.options.hideScrollbar) {
					if (A == 'webkit') {
						m.hScrollbarWrapper.style[e] = '300ms';
					}
					m.hScrollbarWrapper.style.opacity = '0';
				}
				if (m.vScrollbar && m.options.hideScrollbar) {
					if (A == 'webkit') {
						m.vScrollbarWrapper.style[e] = '300ms';
					}
					m.vScrollbarWrapper.style.opacity = '0';
				}
				return;
			}
			m.scrollTo(I, G, H || 0);
		},
		_wheel: function(K) {
			var I = this,
				J,
				H,
				G,
				m,
				L;
			if ('wheelDeltaX' in K) {
				J = K.wheelDeltaX / 12;
				H = K.wheelDeltaY / 12;
			} else {
				if ('wheelDelta' in K) {
					J = H = K.wheelDelta / 12;
				} else {
					if ('detail' in K) {
						J = H = -K.detail * 3;
					} else {
						return;
					}
				}
			}
			if (I.options.wheelAction == 'zoom') {
				L = I.scale * Math.pow(2, (1 / 3) * (H ? H / Math.abs(H) : 0));
				if (L < I.options.zoomMin) {
					L = I.options.zoomMin;
				}
				if (L > I.options.zoomMax) {
					L = I.options.zoomMax;
				}
				if (L != I.scale) {
					if (!I.wheelZoomCount && I.options.onZoomStart) {
						I.options.onZoomStart.call(I, K);
					}
					I.wheelZoomCount++;
					I.zoom(K.pageX, K.pageY, L, 400);
					setTimeout(function() {
						I.wheelZoomCount--;
						if (!I.wheelZoomCount && I.options.onZoomEnd) {
							I.options.onZoomEnd.call(I, K);
						}
					}, 400);
				}
				return;
			}
			G = I.x + J;
			m = I.y + H;
			if (G > 0) {
				G = 0;
			} else {
				if (G < I.maxScrollX) {
					G = I.maxScrollX;
				}
			}
			if (m > I.minScrollY) {
				m = I.minScrollY;
			} else {
				if (m < I.maxScrollY) {
					m = I.maxScrollY;
				}
			}
			if (I.maxScrollY < 0) {
				I.scrollTo(G, m, 0);
			}
		},
		_mouseout: function(G) {
			var m = G.relatedTarget;
			if (!m) {
				this._end(G);
				return;
			}
			while ((m = m.parentNode)) {
				if (m == this.wrapper) {
					return;
				}
			}
			this._end(G);
		},
		_transitionEnd: function(G) {
			var m = this;
			if (G.target != m.scroller) {
				return;
			}
			m._unbind(a);
			m._startAni();
		},
		_startAni: function() {
			var L = this,
				G = L.x,
				m = L.y,
				J = Date.now(),
				K,
				I,
				H;
			if (L.animating) {
				return;
			}
			if (!L.steps.length) {
				L._resetPos(400);
				return;
			}
			K = L.steps.shift();
			if (K.x == G && K.y == m) {
				K.time = 0;
			}
			L.animating = true;
			L.moved = true;
			if (L.options.useTransition) {
				L._transitionTime(K.time);
				L._pos(K.x, K.y);
				L.animating = false;
				if (K.time) {
					L._bind(a);
				} else {
					L._resetPos(0);
				}
				return;
			}
			H = function() {
				var M = Date.now(),
					O,
					N;
				if (M >= J + K.time) {
					L._pos(K.x, K.y);
					L.animating = false;
					if (L.options.onAnimationEnd) {
						L.options.onAnimationEnd.call(L);
					}
					L._startAni();
					return;
				}
				M = (M - J) / K.time - 1;
				I = v.sqrt(1 - M * M);
				O = (K.x - G) * I + G;
				N = (K.y - m) * I + m;
				L._pos(O, N);
				if (L.animating) {
					L.aniTime = q(H);
				}
			};
			H();
		},
		_transitionTime: function(m) {
			m += 'ms';
			this.scroller.style[k] = m;
			if (this.hScrollbar) {
				this.hScrollbarIndicator.style[k] = m;
			}
			if (this.vScrollbar) {
				this.vScrollbarIndicator.style[k] = m;
			}
		},
		_momentum: function(M, G, K, m, O) {
			var L = 0.0006,
				H = v.abs(M) / G,
				I = (H * H) / (2 * L),
				N = 0,
				J = 0;
			if (M > 0 && I > K) {
				J = O / (6 / ((I / H) * L));
				K = K + J;
				H = (H * K) / I;
				I = K;
			} else {
				if (M < 0 && I > m) {
					J = O / (6 / ((I / H) * L));
					m = m + J;
					H = (H * m) / I;
					I = m;
				}
			}
			I = I * (M < 0 ? -1 : 1);
			N = H / L;
			return { dist: I, time: v.round(N) };
		},
		_offset: function(m) {
			var H = -m.offsetLeft,
				G = -m.offsetTop;
			while ((m = m.offsetParent)) {
				H -= m.offsetLeft;
				G -= m.offsetTop;
			}
			if (m != this.wrapper) {
				H *= this.scale;
				G *= this.scale;
			}
			return { left: H, top: G };
		},
		_snap: function(N, M) {
			var K = this,
				J,
				I,
				L,
				H,
				G,
				m;
			L = K.pagesX.length - 1;
			for (J = 0, I = K.pagesX.length; J < I; J++) {
				if (N >= K.pagesX[J]) {
					L = J;
					break;
				}
			}
			if (L == K.currPageX && L > 0 && K.dirX < 0) {
				L--;
			}
			N = K.pagesX[L];
			G = v.abs(N - K.pagesX[K.currPageX]);
			G = G ? (v.abs(K.x - N) / G) * 500 : 0;
			K.currPageX = L;
			L = K.pagesY.length - 1;
			for (J = 0; J < L; J++) {
				if (M >= K.pagesY[J]) {
					L = J;
					break;
				}
			}
			if (L == K.currPageY && L > 0 && K.dirY < 0) {
				L--;
			}
			M = K.pagesY[L];
			m = v.abs(M - K.pagesY[K.currPageY]);
			m = m ? (v.abs(K.y - M) / m) * 500 : 0;
			K.currPageY = L;
			H = v.round(v.max(G, m)) || 200;
			return { x: N, y: M, time: H };
		},
		_bind: function(H, G, m) {
			(G || this.scroller).addEventListener(H, this, !!m);
		},
		_unbind: function(H, G, m) {
			(G || this.scroller).removeEventListener(H, this, !!m);
		},
		destroy: function() {
			var m = this;
			m.scroller.style[l] = '';
			m.hScrollbar = false;
			m.vScrollbar = false;
			m._scrollbar('h');
			m._scrollbar('v');
			m._unbind(g, i);
			m._unbind(b);
			m._unbind(t);
			m._unbind(c);
			m._unbind(x);
			if (!m.options.hasTouch) {
				m._unbind('mouseout', m.wrapper);
				m._unbind(u);
			}
			if (m.options.useTransition) {
				m._unbind(a);
			}
			if (m.options.checkDOMChanges) {
				clearInterval(m.checkDOMTime);
			}
			if (m.options.onDestroy) {
				m.options.onDestroy.call(m);
			}
		},
		refresh: function() {
			var I = this,
				K,
				H,
				m,
				G,
				L = 0,
				J = 0;
			if (I.scale < I.options.zoomMin) {
				I.scale = I.options.zoomMin;
			}
			I.wrapperW = I.wrapper.clientWidth || 1;
			I.wrapperH = I.wrapper.clientHeight || 1;
			I.minScrollY = -I.options.topOffset || 0;
			I.scrollerW = v.round(I.scroller.offsetWidth * I.scale);
			I.scrollerH = v.round((I.scroller.offsetHeight + I.minScrollY) * I.scale);
			I.maxScrollX = I.wrapperW - I.scrollerW;
			I.maxScrollY = I.wrapperH - I.scrollerH + I.minScrollY;
			I.dirX = 0;
			I.dirY = 0;
			if (I.options.onRefresh) {
				I.options.onRefresh.call(I);
			}
			I.hScroll = I.options.hScroll && I.maxScrollX < 0;
			I.vScroll =
				I.options.vScroll &&
				((!I.options.bounceLock && !I.hScroll) || I.scrollerH > I.wrapperH);
			I.hScrollbar = I.hScroll && I.options.hScrollbar;
			I.vScrollbar =
				I.vScroll && I.options.vScrollbar && I.scrollerH > I.wrapperH;
			K = I._offset(I.wrapper);
			I.wrapperOffsetLeft = -K.left;
			I.wrapperOffsetTop = -K.top;
			if (typeof I.options.snap == 'string') {
				I.pagesX = [];
				I.pagesY = [];
				G = I.scroller.querySelectorAll(I.options.snap);
				for (H = 0, m = G.length; H < m; H++) {
					L = I._offset(G[H]);
					L.left += I.wrapperOffsetLeft;
					L.top += I.wrapperOffsetTop;
					I.pagesX[H] = L.left < I.maxScrollX ? I.maxScrollX : L.left * I.scale;
					I.pagesY[H] = L.top < I.maxScrollY ? I.maxScrollY : L.top * I.scale;
				}
			} else {
				if (I.options.snap) {
					I.pagesX = [];
					while (L >= I.maxScrollX) {
						I.pagesX[J] = L;
						L = L - I.wrapperW;
						J++;
					}
					if (I.maxScrollX % I.wrapperW) {
						I.pagesX[I.pagesX.length] =
							I.maxScrollX -
							I.pagesX[I.pagesX.length - 1] +
							I.pagesX[I.pagesX.length - 1];
					}
					L = 0;
					J = 0;
					I.pagesY = [];
					while (L >= I.maxScrollY) {
						I.pagesY[J] = L;
						L = L - I.wrapperH;
						J++;
					}
					if (I.maxScrollY % I.wrapperH) {
						I.pagesY[I.pagesY.length] =
							I.maxScrollY -
							I.pagesY[I.pagesY.length - 1] +
							I.pagesY[I.pagesY.length - 1];
					}
				}
			}
			I._scrollbar('h');
			I._scrollbar('v');
			if (!I.zoomed) {
				I.scroller.style[k] = '0';
				I._resetPos(200);
			}
		},
		scrollTo: function(m, M, L, K) {
			var J = this,
				I = m,
				H,
				G;
			J.stop();
			if (!I.length) {
				I = [{ x: m, y: M, time: L, relative: K }];
			}
			for (H = 0, G = I.length; H < G; H++) {
				if (I[H].relative) {
					I[H].x = J.x - I[H].x;
					I[H].y = J.y - I[H].y;
				}
				J.steps.push({ x: I[H].x, y: I[H].y, time: I[H].time || 0 });
			}
			J._startAni();
		},
		scrollToElement: function(m, H) {
			var G = this,
				I;
			m = m.nodeType ? m : G.scroller.querySelector(m);
			if (!m) {
				return;
			}
			I = G._offset(m);
			I.left += G.wrapperOffsetLeft;
			I.top += G.wrapperOffsetTop;
			I.left = I.left > 0 ? 0 : I.left < G.maxScrollX ? G.maxScrollX : I.left;
			I.top =
				I.top > G.minScrollY
					? G.minScrollY
					: I.top < G.maxScrollY
					? G.maxScrollY
					: I.top;
			H = H === undefined ? v.max(v.abs(I.left) * 2, v.abs(I.top) * 2) : H;
			G.scrollTo(I.left, I.top, H);
		},
		scrollToPage: function(H, G, J) {
			var I = this,
				m,
				K;
			J = J === undefined ? 400 : J;
			if (I.options.onScrollStart) {
				I.options.onScrollStart.call(I);
			}
			if (I.options.snap) {
				H = H == 'next' ? I.currPageX + 1 : H == 'prev' ? I.currPageX - 1 : H;
				G = G == 'next' ? I.currPageY + 1 : G == 'prev' ? I.currPageY - 1 : G;
				H = H < 0 ? 0 : H > I.pagesX.length - 1 ? I.pagesX.length - 1 : H;
				G = G < 0 ? 0 : G > I.pagesY.length - 1 ? I.pagesY.length - 1 : G;
				I.currPageX = H;
				I.currPageY = G;
				m = I.pagesX[H];
				K = I.pagesY[G];
			} else {
				m = -I.wrapperW * H;
				K = -I.wrapperH * G;
				if (m < I.maxScrollX) {
					m = I.maxScrollX;
				}
				if (K < I.maxScrollY) {
					K = I.maxScrollY;
				}
			}
			I.scrollTo(m, K, J);
		},
		disable: function() {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
			this._unbind(t);
			this._unbind(c);
			this._unbind(x);
		},
		enable: function() {
			this.enabled = true;
		},
		stop: function() {
			if (this.options.useTransition) {
				this._unbind(a);
			} else {
				p(this.aniTime);
			}
			this.steps = [];
			this.moved = false;
			this.animating = false;
		},
		zoom: function(m, K, J, I) {
			var G = this,
				H = J / G.scale;
			if (!G.options.useTransform) {
				return;
			}
			G.zoomed = true;
			I = I === undefined ? 200 : I;
			m = m - G.wrapperOffsetLeft - G.x;
			K = K - G.wrapperOffsetTop - G.y;
			G.x = m - m * H + G.x;
			G.y = K - K * H + G.y;
			G.scale = J;
			G.refresh();
			G.x = G.x > 0 ? 0 : G.x < G.maxScrollX ? G.maxScrollX : G.x;
			G.y =
				G.y > G.minScrollY
					? G.minScrollY
					: G.y < G.maxScrollY
					? G.maxScrollY
					: G.y;
			G.scroller.style[k] = I + 'ms';
			G.scroller.style[l] =
				'translate(' + G.x + 'px,' + G.y + 'px) scale(' + J + ')' + D;
			G.zoomed = false;
		},
		isReady: function() {
			return !this.moved && !this.zoomed && !this.animating;
		},
	};
	function s(m) {
		if (A === '') {
			return m;
		}
		m = m.charAt(0).toUpperCase() + m.substr(1);
		return A + m;
	}
	n = null;
	if (typeof exports !== 'undefined') {
		exports.iScroll = w;
	} else {
		i.iScroll = w;
	}
})(this, document);
