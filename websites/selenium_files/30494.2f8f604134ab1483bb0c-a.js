"use strict";(self.webpackChunkpublic_pages=self.webpackChunkpublic_pages||[]).push([[30494],{84061:function(t,e,n){n.d(e,{Cp:function(){return a},RR:function(){return l},cv:function(){return d},dp:function(){return m},dr:function(){return h},oo:function(){return i},uY:function(){return p},x7:function(){return u}});var o=n(4029);function r(t,e,n){let{reference:r,floating:i}=t;const c=(0,o.Qq)(e),u=(0,o.Wh)(e),l=(0,o.I4)(u),s=(0,o.k3)(e),f="y"===c,a=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,p=r[l]/2-i[l]/2;let h;switch(s){case"top":h={x:a,y:r.y-i.height};break;case"bottom":h={x:a,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:d};break;case"left":h={x:r.x-i.width,y:d};break;default:h={x:r.x,y:r.y}}switch((0,o.hp)(e)){case"start":h[u]-=p*(n&&f?-1:1);break;case"end":h[u]+=p*(n&&f?-1:1)}return h}const i=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:c=[],platform:u}=n,l=c.filter(Boolean),s=await(null==u.isRTL?void 0:u.isRTL(e));let f=await u.getElementRects({reference:t,floating:e,strategy:i}),{x:a,y:d}=r(f,o,s),p=o,h={},m=0;for(let n=0;n<l.length;n++){const{name:c,fn:g}=l[n],{x:y,y:v,data:w,reset:x}=await g({x:a,y:d,initialPlacement:o,placement:p,strategy:i,middlewareData:h,rects:f,platform:u,elements:{reference:t,floating:e}});a=null!=y?y:a,d=null!=v?v:d,h={...h,[c]:{...h[c],...w}},x&&m<=50&&(m++,"object"==typeof x&&(x.placement&&(p=x.placement),x.rects&&(f=!0===x.rects?await u.getElementRects({reference:t,floating:e,strategy:i}):x.rects),({x:a,y:d}=r(f,p,s))),n=-1)}return{x:a,y:d,placement:p,strategy:i,middlewareData:h}};async function c(t,e){var n;void 0===e&&(e={});const{x:r,y:i,platform:c,rects:u,elements:l,strategy:s}=t,{boundary:f="clippingAncestors",rootBoundary:a="viewport",elementContext:d="floating",altBoundary:p=!1,padding:h=0}=(0,o.ku)(e,t),m=(0,o.yd)(h),g=l[p?"floating"===d?"reference":"floating":d],y=(0,o.JB)(await c.getClippingRect({element:null==(n=await(null==c.isElement?void 0:c.isElement(g)))||n?g:g.contextElement||await(null==c.getDocumentElement?void 0:c.getDocumentElement(l.floating)),boundary:f,rootBoundary:a,strategy:s})),v="floating"===d?{...u.floating,x:r,y:i}:u.reference,w=await(null==c.getOffsetParent?void 0:c.getOffsetParent(l.floating)),x=await(null==c.isElement?void 0:c.isElement(w))&&await(null==c.getScale?void 0:c.getScale(w))||{x:1,y:1},b=(0,o.JB)(c.convertOffsetParentRelativeRectToViewportRelativeRect?await c.convertOffsetParentRelativeRectToViewportRelativeRect({rect:v,offsetParent:w,strategy:s}):v);return{top:(y.top-b.top+m.top)/x.y,bottom:(b.bottom-y.bottom+m.bottom)/x.y,left:(y.left-b.left+m.left)/x.x,right:(b.right-y.right+m.right)/x.x}}const u=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:r,placement:i,rects:c,platform:u,elements:l,middlewareData:s}=e,{element:f,padding:a=0}=(0,o.ku)(t,e)||{};if(null==f)return{};const d=(0,o.yd)(a),p={x:n,y:r},h=(0,o.Wh)(i),m=(0,o.I4)(h),g=await u.getDimensions(f),y="y"===h,v=y?"top":"left",w=y?"bottom":"right",x=y?"clientHeight":"clientWidth",b=c.reference[m]+c.reference[h]-p[h]-c.floating[m],R=p[h]-c.reference[h],k=await(null==u.getOffsetParent?void 0:u.getOffsetParent(f));let E=k?k[x]:0;E&&await(null==u.isElement?void 0:u.isElement(k))||(E=l.floating[x]||c.floating[m]);const O=b/2-R/2,A=E/2-g[m]/2-1,T=(0,o.VV)(d[v],A),S=(0,o.VV)(d[w],A),L=T,P=E-g[m]-S,F=E/2-g[m]/2+O,C=(0,o.uZ)(L,F,P),V=!s.arrow&&null!=(0,o.hp)(i)&&F!=C&&c.reference[m]/2-(F<L?T:S)-g[m]/2<0,W=V?F<L?F-L:F-P:0;return{[h]:p[h]+W,data:{[h]:C,centerOffset:F-C-W,...V&&{alignmentOffset:W}},reset:V}}}),l=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,r;const{placement:i,middlewareData:u,rects:l,initialPlacement:s,platform:f,elements:a}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:h,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...v}=(0,o.ku)(t,e);if(null!=(n=u.arrow)&&n.alignmentOffset)return{};const w=(0,o.k3)(i),x=(0,o.k3)(s)===s,b=await(null==f.isRTL?void 0:f.isRTL(a.floating)),R=h||(x||!y?[(0,o.pw)(s)]:(0,o.gy)(s));h||"none"===g||R.push(...(0,o.KX)(s,y,g,b));const k=[s,...R],E=await c(e,v),O=[];let A=(null==(r=u.flip)?void 0:r.overflows)||[];if(d&&O.push(E[w]),p){const t=(0,o.i8)(i,l,b);O.push(E[t[0]],E[t[1]])}if(A=[...A,{placement:i,overflows:O}],!O.every((t=>t<=0))){var T,S;const t=((null==(T=u.flip)?void 0:T.index)||0)+1,e=k[t];if(e)return{data:{index:t,overflows:A},reset:{placement:e}};let n=null==(S=A.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:S.placement;if(!n)switch(m){case"bestFit":{var L;const t=null==(L=A.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:L[0];t&&(n=t);break}case"initialPlacement":n=s}if(i!==n)return{reset:{placement:n}}}return{}}}};function s(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function f(t){return o.mA.some((e=>t[e]>=0))}const a=function(t){return void 0===t&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:r="referenceHidden",...i}=(0,o.ku)(t,e);switch(r){case"referenceHidden":{const t=s(await c(e,{...i,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:t,referenceHidden:f(t)}}}case"escaped":{const t=s(await c(e,{...i,altBoundary:!0}),n.floating);return{data:{escapedOffsets:t,escaped:f(t)}}}default:return{}}}}},d=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){const{x:n,y:r}=e,i=await async function(t,e){const{placement:n,platform:r,elements:i}=t,c=await(null==r.isRTL?void 0:r.isRTL(i.floating)),u=(0,o.k3)(n),l=(0,o.hp)(n),s="y"===(0,o.Qq)(n),f=["left","top"].includes(u)?-1:1,a=c&&s?-1:1,d=(0,o.ku)(e,t);let{mainAxis:p,crossAxis:h,alignmentAxis:m}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return l&&"number"==typeof m&&(h="end"===l?-1*m:m),s?{x:h*a,y:p*f}:{x:p*f,y:h*a}}(e,t);return{x:n+i.x,y:r+i.y,data:i}}}},p=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:i}=e,{mainAxis:u=!0,crossAxis:l=!1,limiter:s={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...f}=(0,o.ku)(t,e),a={x:n,y:r},d=await c(e,f),p=(0,o.Qq)((0,o.k3)(i)),h=(0,o.Rn)(p);let m=a[h],g=a[p];if(u){const t="y"===h?"bottom":"right",e=m+d["y"===h?"top":"left"],n=m-d[t];m=(0,o.uZ)(e,m,n)}if(l){const t="y"===p?"bottom":"right",e=g+d["y"===p?"top":"left"],n=g-d[t];g=(0,o.uZ)(e,g,n)}const y=s.fn({...e,[h]:m,[p]:g});return{...y,data:{x:y.x-n,y:y.y-r}}}}},h=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:r,placement:i,rects:c,middlewareData:u}=e,{offset:l=0,mainAxis:s=!0,crossAxis:f=!0}=(0,o.ku)(t,e),a={x:n,y:r},d=(0,o.Qq)(i),p=(0,o.Rn)(d);let h=a[p],m=a[d];const g=(0,o.ku)(l,e),y="number"==typeof g?{mainAxis:g,crossAxis:0}:{mainAxis:0,crossAxis:0,...g};if(s){const t="y"===p?"height":"width",e=c.reference[p]-c.floating[t]+y.mainAxis,n=c.reference[p]+c.reference[t]-y.mainAxis;h<e?h=e:h>n&&(h=n)}if(f){var v,w;const t="y"===p?"width":"height",e=["top","left"].includes((0,o.k3)(i)),n=c.reference[d]-c.floating[t]+(e&&(null==(v=u.offset)?void 0:v[d])||0)+(e?0:y.crossAxis),r=c.reference[d]+c.reference[t]+(e?0:(null==(w=u.offset)?void 0:w[d])||0)-(e?y.crossAxis:0);m<n?m=n:m>r&&(m=r)}return{[p]:h,[d]:m}}}},m=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){const{placement:n,rects:r,platform:i,elements:u}=e,{apply:l=(()=>{}),...s}=(0,o.ku)(t,e),f=await c(e,s),a=(0,o.k3)(n),d=(0,o.hp)(n),p="y"===(0,o.Qq)(n),{width:h,height:m}=r.floating;let g,y;"top"===a||"bottom"===a?(g=a,y=d===(await(null==i.isRTL?void 0:i.isRTL(u.floating))?"start":"end")?"left":"right"):(y=a,g="end"===d?"top":"bottom");const v=m-f[g],w=h-f[y],x=!e.middlewareData.shift;let b=v,R=w;if(p){const t=h-f.left-f.right;R=d||x?(0,o.VV)(w,t):t}else{const t=m-f.top-f.bottom;b=d||x?(0,o.VV)(v,t):t}if(x&&!d){const t=(0,o.Fp)(f.left,0),e=(0,o.Fp)(f.right,0),n=(0,o.Fp)(f.top,0),r=(0,o.Fp)(f.bottom,0);p?R=h-2*(0!==t||0!==e?t+e:(0,o.Fp)(f.left,f.right)):b=m-2*(0!==n||0!==r?n+r:(0,o.Fp)(f.top,f.bottom))}await l({...e,availableWidth:R,availableHeight:b});const k=await i.getDimensions(u.floating);return h!==k.width||m!==k.height?{reset:{rects:!0}}:{}}}}},9389:function(t,e,n){n.d(e,{Me:function(){return D},oo:function(){return M}});var o=n(4029),r=n(84061);function i(t){return l(t)?(t.nodeName||"").toLowerCase():"#document"}function c(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function u(t){var e;return null==(e=(l(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function l(t){return t instanceof Node||t instanceof c(t).Node}function s(t){return t instanceof Element||t instanceof c(t).Element}function f(t){return t instanceof HTMLElement||t instanceof c(t).HTMLElement}function a(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof c(t).ShadowRoot)}function d(t){const{overflow:e,overflowX:n,overflowY:o,display:r}=y(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(r)}function p(t){return["table","td","th"].includes(i(t))}function h(t){const e=m(),n=y(t);return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function m(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function g(t){return["html","body","#document"].includes(i(t))}function y(t){return c(t).getComputedStyle(t)}function v(t){return s(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function w(t){if("html"===i(t))return t;const e=t.assignedSlot||t.parentNode||a(t)&&t.host||u(t);return a(e)?e.host:e}function x(t){const e=w(t);return g(e)?t.ownerDocument?t.ownerDocument.body:t.body:f(e)&&d(e)?e:x(e)}function b(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const r=x(t),i=r===(null==(o=t.ownerDocument)?void 0:o.body),u=c(r);return i?e.concat(u,u.visualViewport||[],d(r)?r:[],u.frameElement&&n?b(u.frameElement):[]):e.concat(r,b(r,[],n))}function R(t){const e=y(t);let n=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const i=f(t),c=i?t.offsetWidth:n,u=i?t.offsetHeight:r,l=(0,o.NM)(n)!==c||(0,o.NM)(r)!==u;return l&&(n=c,r=u),{width:n,height:r,$:l}}function k(t){return s(t)?t:t.contextElement}function E(t){const e=k(t);if(!f(e))return(0,o.ze)(1);const n=e.getBoundingClientRect(),{width:r,height:i,$:c}=R(e);let u=(c?(0,o.NM)(n.width):n.width)/r,l=(c?(0,o.NM)(n.height):n.height)/i;return u&&Number.isFinite(u)||(u=1),l&&Number.isFinite(l)||(l=1),{x:u,y:l}}const O=(0,o.ze)(0);function A(t){const e=c(t);return m()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:O}function T(t,e,n,r){void 0===e&&(e=!1),void 0===n&&(n=!1);const i=t.getBoundingClientRect(),u=k(t);let l=(0,o.ze)(1);e&&(r?s(r)&&(l=E(r)):l=E(t));const f=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==c(t))&&e}(u,n,r)?A(u):(0,o.ze)(0);let a=(i.left+f.x)/l.x,d=(i.top+f.y)/l.y,p=i.width/l.x,h=i.height/l.y;if(u){const t=c(u),e=r&&s(r)?c(r):r;let n=t.frameElement;for(;n&&r&&e!==t;){const t=E(n),e=n.getBoundingClientRect(),o=y(n),r=e.left+(n.clientLeft+parseFloat(o.paddingLeft))*t.x,i=e.top+(n.clientTop+parseFloat(o.paddingTop))*t.y;a*=t.x,d*=t.y,p*=t.x,h*=t.y,a+=r,d+=i,n=c(n).frameElement}}return(0,o.JB)({width:p,height:h,x:a,y:d})}function S(t){return T(u(t)).left+v(t).scrollLeft}function L(t,e,n){let r;if("viewport"===e)r=function(t,e){const n=c(t),o=u(t),r=n.visualViewport;let i=o.clientWidth,l=o.clientHeight,s=0,f=0;if(r){i=r.width,l=r.height;const t=m();(!t||t&&"fixed"===e)&&(s=r.offsetLeft,f=r.offsetTop)}return{width:i,height:l,x:s,y:f}}(t,n);else if("document"===e)r=function(t){const e=u(t),n=v(t),r=t.ownerDocument.body,i=(0,o.Fp)(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),c=(0,o.Fp)(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let l=-n.scrollLeft+S(t);const s=-n.scrollTop;return"rtl"===y(r).direction&&(l+=(0,o.Fp)(e.clientWidth,r.clientWidth)-i),{width:i,height:c,x:l,y:s}}(u(t));else if(s(e))r=function(t,e){const n=T(t,!0,"fixed"===e),r=n.top+t.clientTop,i=n.left+t.clientLeft,c=f(t)?E(t):(0,o.ze)(1);return{width:t.clientWidth*c.x,height:t.clientHeight*c.y,x:i*c.x,y:r*c.y}}(e,n);else{const n=A(t);r={...e,x:e.x-n.x,y:e.y-n.y}}return(0,o.JB)(r)}function P(t,e){const n=w(t);return!(n===e||!s(n)||g(n))&&("fixed"===y(n).position||P(n,e))}function F(t,e,n){const r=f(e),c=u(e),l="fixed"===n,s=T(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const p=(0,o.ze)(0);if(r||!r&&!l)if(("body"!==i(e)||d(c))&&(a=v(e)),r){const t=T(e,!0,l,e);p.x=t.x+e.clientLeft,p.y=t.y+e.clientTop}else c&&(p.x=S(c));return{x:s.left+a.scrollLeft-p.x,y:s.top+a.scrollTop-p.y,width:s.width,height:s.height}}function C(t,e){return f(t)&&"fixed"!==y(t).position?e?e(t):t.offsetParent:null}function V(t,e){const n=c(t);if(!f(t))return n;let o=C(t,e);for(;o&&p(o)&&"static"===y(o).position;)o=C(o,e);return o&&("html"===i(o)||"body"===i(o)&&"static"===y(o).position&&!h(o))?n:o||function(t){let e=w(t);for(;f(e)&&!g(e);){if(h(e))return e;e=w(e)}return null}(t)||n}const W={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:r}=t;const c=f(n),l=u(n);if(n===l)return e;let s={scrollLeft:0,scrollTop:0},a=(0,o.ze)(1);const p=(0,o.ze)(0);if((c||!c&&"fixed"!==r)&&(("body"!==i(n)||d(l))&&(s=v(n)),f(n))){const t=T(n);a=E(n),p.x=t.x+n.clientLeft,p.y=t.y+n.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-s.scrollLeft*a.x+p.x,y:e.y*a.y-s.scrollTop*a.y+p.y}},getDocumentElement:u,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:r,strategy:c}=t;const u="clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let o=b(t,[],!1).filter((t=>s(t)&&"body"!==i(t))),r=null;const c="fixed"===y(t).position;let u=c?w(t):t;for(;s(u)&&!g(u);){const e=y(u),n=h(u);n||"fixed"!==e.position||(r=null),(c?!n&&!r:!n&&"static"===e.position&&r&&["absolute","fixed"].includes(r.position)||d(u)&&!n&&P(t,u))?o=o.filter((t=>t!==u)):r=e,u=w(u)}return e.set(t,o),o}(e,this._c):[].concat(n),l=[...u,r],f=l[0],a=l.reduce(((t,n)=>{const r=L(e,n,c);return t.top=(0,o.Fp)(r.top,t.top),t.right=(0,o.VV)(r.right,t.right),t.bottom=(0,o.VV)(r.bottom,t.bottom),t.left=(0,o.Fp)(r.left,t.left),t}),L(e,f,c));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:V,getElementRects:async function(t){let{reference:e,floating:n,strategy:o}=t;const r=this.getOffsetParent||V,i=this.getDimensions;return{reference:F(e,await r(n),o),floating:{x:0,y:0,...await i(n)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){return R(t)},getScale:E,isElement:s,isRTL:function(t){return"rtl"===y(t).direction}};function D(t,e,n,r){void 0===r&&(r={});const{ancestorScroll:i=!0,ancestorResize:c=!0,elementResize:l="function"==typeof ResizeObserver,layoutShift:s="function"==typeof IntersectionObserver,animationFrame:f=!1}=r,a=k(t),d=i||c?[...a?b(a):[],...b(e)]:[];d.forEach((t=>{i&&t.addEventListener("scroll",n,{passive:!0}),c&&t.addEventListener("resize",n)}));const p=a&&s?function(t,e){let n,r=null;const i=u(t);function c(){clearTimeout(n),r&&r.disconnect(),r=null}return function u(l,s){void 0===l&&(l=!1),void 0===s&&(s=1),c();const{left:f,top:a,width:d,height:p}=t.getBoundingClientRect();if(l||e(),!d||!p)return;const h={rootMargin:-(0,o.GW)(a)+"px "+-(0,o.GW)(i.clientWidth-(f+d))+"px "+-(0,o.GW)(i.clientHeight-(a+p))+"px "+-(0,o.GW)(f)+"px",threshold:(0,o.Fp)(0,(0,o.VV)(1,s))||1};let m=!0;function g(t){const e=t[0].intersectionRatio;if(e!==s){if(!m)return u();e?u(!1,e):n=setTimeout((()=>{u(!1,1e-7)}),100)}m=!1}try{r=new IntersectionObserver(g,{...h,root:i.ownerDocument})}catch(t){r=new IntersectionObserver(g,h)}r.observe(t)}(!0),c}(a,n):null;let h,m=-1,g=null;l&&(g=new ResizeObserver((t=>{let[o]=t;o&&o.target===a&&g&&(g.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame((()=>{g&&g.observe(e)}))),n()})),a&&!f&&g.observe(a),g.observe(e));let y=f?T(t):null;return f&&function e(){const o=T(t);!y||o.x===y.x&&o.y===y.y&&o.width===y.width&&o.height===y.height||n(),y=o,h=requestAnimationFrame(e)}(),n(),()=>{d.forEach((t=>{i&&t.removeEventListener("scroll",n),c&&t.removeEventListener("resize",n)})),p&&p(),g&&g.disconnect(),g=null,f&&cancelAnimationFrame(h)}}const M=(t,e,n)=>{const o=new Map,i={platform:W,...n},c={...i.platform,_c:o};return(0,r.oo)(t,e,{...i,platform:c})}},92416:function(t,e,n){n.d(e,{YF:function(){return p},x7:function(){return u}});var o=n(84061),r=n(9389),i=n(2784),c=n(28316);const u=t=>({name:"arrow",options:t,fn(e){const{element:n,padding:r}="function"==typeof t?t(e):t;return n&&(i=n,{}.hasOwnProperty.call(i,"current"))?null!=n.current?(0,o.x7)({element:n.current,padding:r}).fn(e):{}:n?(0,o.x7)({element:n,padding:r}).fn(e):{};var i}});var l="undefined"!=typeof document?i.useLayoutEffect:i.useEffect;function s(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if("function"==typeof t&&t.toString()===e.toString())return!0;let n,o,r;if(t&&e&&"object"==typeof t){if(Array.isArray(t)){if(n=t.length,n!=e.length)return!1;for(o=n;0!=o--;)if(!s(t[o],e[o]))return!1;return!0}if(r=Object.keys(t),n=r.length,n!==Object.keys(e).length)return!1;for(o=n;0!=o--;)if(!{}.hasOwnProperty.call(e,r[o]))return!1;for(o=n;0!=o--;){const n=r[o];if(!("_owner"===n&&t.$$typeof||s(t[n],e[n])))return!1}return!0}return t!=t&&e!=e}function f(t){return"undefined"==typeof window?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function a(t,e){const n=f(t);return Math.round(e*n)/n}function d(t){const e=i.useRef(t);return l((()=>{e.current=t})),e}function p(t){void 0===t&&(t={});const{placement:e="bottom",strategy:n="absolute",middleware:o=[],platform:u,elements:{reference:p,floating:h}={},transform:m=!0,whileElementsMounted:g,open:y}=t,[v,w]=i.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[x,b]=i.useState(o);s(x,o)||b(o);const[R,k]=i.useState(null),[E,O]=i.useState(null),A=i.useCallback((t=>{t!=P.current&&(P.current=t,k(t))}),[k]),T=i.useCallback((t=>{t!==F.current&&(F.current=t,O(t))}),[O]),S=p||R,L=h||E,P=i.useRef(null),F=i.useRef(null),C=i.useRef(v),V=d(g),W=d(u),D=i.useCallback((()=>{if(!P.current||!F.current)return;const t={placement:e,strategy:n,middleware:x};W.current&&(t.platform=W.current),(0,r.oo)(P.current,F.current,t).then((t=>{const e={...t,isPositioned:!0};M.current&&!s(C.current,e)&&(C.current=e,c.flushSync((()=>{w(e)})))}))}),[x,e,n,W]);l((()=>{!1===y&&C.current.isPositioned&&(C.current.isPositioned=!1,w((t=>({...t,isPositioned:!1}))))}),[y]);const M=i.useRef(!1);l((()=>(M.current=!0,()=>{M.current=!1})),[]),l((()=>{if(S&&(P.current=S),L&&(F.current=L),S&&L){if(V.current)return V.current(S,L,D);D()}}),[S,L,D,V]);const z=i.useMemo((()=>({reference:P,floating:F,setReference:A,setFloating:T})),[A,T]),B=i.useMemo((()=>({reference:S,floating:L})),[S,L]),H=i.useMemo((()=>{const t={position:n,left:0,top:0};if(!B.floating)return t;const e=a(B.floating,v.x),o=a(B.floating,v.y);return m?{...t,transform:"translate("+e+"px, "+o+"px)",...f(B.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:e,top:o}}),[n,m,B.floating,v.x,v.y]);return i.useMemo((()=>({...v,update:D,refs:z,elements:B,floatingStyles:H})),[v,D,z,B,H])}},4029:function(t,e,n){n.d(e,{Fp:function(){return i},GW:function(){return u},I4:function(){return g},JB:function(){return O},KX:function(){return R},NM:function(){return c},Qq:function(){return y},Rn:function(){return m},VV:function(){return r},Wh:function(){return v},gy:function(){return x},hp:function(){return h},i8:function(){return w},k3:function(){return p},ku:function(){return d},mA:function(){return o},pw:function(){return k},uZ:function(){return a},yd:function(){return E},ze:function(){return l}});const o=["top","right","bottom","left"],r=Math.min,i=Math.max,c=Math.round,u=Math.floor,l=t=>({x:t,y:t}),s={left:"right",right:"left",bottom:"top",top:"bottom"},f={start:"end",end:"start"};function a(t,e,n){return i(t,r(e,n))}function d(t,e){return"function"==typeof t?t(e):t}function p(t){return t.split("-")[0]}function h(t){return t.split("-")[1]}function m(t){return"x"===t?"y":"x"}function g(t){return"y"===t?"height":"width"}function y(t){return["top","bottom"].includes(p(t))?"y":"x"}function v(t){return m(y(t))}function w(t,e,n){void 0===n&&(n=!1);const o=h(t),r=v(t),i=g(r);let c="x"===r?o===(n?"end":"start")?"right":"left":"start"===o?"bottom":"top";return e.reference[i]>e.floating[i]&&(c=k(c)),[c,k(c)]}function x(t){const e=k(t);return[b(t),e,b(e)]}function b(t){return t.replace(/start|end/g,(t=>f[t]))}function R(t,e,n,o){const r=h(t);let i=function(t,e,n){const o=["left","right"],r=["right","left"],i=["top","bottom"],c=["bottom","top"];switch(t){case"top":case"bottom":return n?e?r:o:e?o:r;case"left":case"right":return e?i:c;default:return[]}}(p(t),"start"===n,o);return r&&(i=i.map((t=>t+"-"+r)),e&&(i=i.concat(i.map(b)))),i}function k(t){return t.replace(/left|right|bottom|top/g,(t=>s[t]))}function E(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function O(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}},17998:function(t,e,n){function o(t,e,{checkForDefaultPrevented:n=!0}={}){return function(o){if(null==t||t(o),!1===n||!o.defaultPrevented)return null==e?void 0:e(o)}}n.d(e,{M:function(){return o}})},54642:function(t,e,n){function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},o.apply(this,arguments)}n.d(e,{f:function(){return c}});var r=n(2784),i=n(5985);const c=(0,r.forwardRef)(((t,e)=>{const{children:n,width:c=10,height:u=5,...l}=t;return(0,r.createElement)(i.WV.svg,o({},l,{ref:e,width:c,height:u,viewBox:"0 0 30 10",preserveAspectRatio:"none"}),t.asChild?n:(0,r.createElement)("polygon",{points:"0,0 30,0 15,10"}))}))},62656:function(t,e,n){n.d(e,{F:function(){return r},e:function(){return i}});var o=n(2784);function r(...t){return e=>t.forEach((t=>function(t,e){"function"==typeof t?t(e):null!=t&&(t.current=e)}(t,e)))}function i(...t){return(0,o.useCallback)(r(...t),t)}},23372:function(t,e,n){var o;n.d(e,{M:function(){return l}});var r=n(2784),i=n(61644);const c=(o||(o=n.t(r,2)))["useId".toString()]||(()=>{});let u=0;function l(t){const[e,n]=r.useState(c());return(0,i.b)((()=>{t||n((t=>null!=t?t:String(u++)))}),[t]),t||(e?`radix-${e}`:"")}},5985:function(t,e,n){function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},o.apply(this,arguments)}n.d(e,{WV:function(){return u},jH:function(){return l}});var r=n(2784),i=n(28316),c=n(49815);const u=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce(((t,e)=>{const n=(0,r.forwardRef)(((t,n)=>{const{asChild:i,...u}=t,l=i?c.g7:e;return(0,r.useEffect)((()=>{window[Symbol.for("radix-ui")]=!0}),[]),(0,r.createElement)(l,o({},u,{ref:n}))}));return n.displayName=`Primitive.${e}`,{...t,[e]:n}}),{});function l(t,e){t&&(0,i.flushSync)((()=>t.dispatchEvent(e)))}},27260:function(t,e,n){function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},o.apply(this,arguments)}n.d(e,{Z:function(){return o}})},27757:function(t,e,n){n.d(e,{W:function(){return r}});var o=n(2784);function r(t){const e=(0,o.useRef)(t);return(0,o.useEffect)((()=>{e.current=t})),(0,o.useMemo)((()=>(...t)=>{var n;return null===(n=e.current)||void 0===n?void 0:n.call(e,...t)}),[])}},87695:function(t,e,n){n.d(e,{T:function(){return i}});var o=n(2784),r=n(27757);function i({prop:t,defaultProp:e,onChange:n=(()=>{})}){const[i,c]=function({defaultProp:t,onChange:e}){const n=(0,o.useState)(t),[i]=n,c=(0,o.useRef)(i),u=(0,r.W)(e);return(0,o.useEffect)((()=>{c.current!==i&&(u(i),c.current=i)}),[i,c,u]),n}({defaultProp:e,onChange:n}),u=void 0!==t,l=u?t:i,s=(0,r.W)(n);return[l,(0,o.useCallback)((e=>{if(u){const n=e,o="function"==typeof e?n(t):e;o!==t&&s(o)}else c(e)}),[u,t,c,s])]}},86796:function(t,e,n){n.d(e,{e:function(){return i}});var o=n(2784),r=n(27757);function i(t,e=(null===globalThis||void 0===globalThis?void 0:globalThis.document)){const n=(0,r.W)(t);(0,o.useEffect)((()=>{const t=t=>{"Escape"===t.key&&n(t)};return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t)}),[n,e])}},61644:function(t,e,n){n.d(e,{b:function(){return r}});var o=n(2784);const r=Boolean(null===globalThis||void 0===globalThis?void 0:globalThis.document)?o.useLayoutEffect:()=>{}},35019:function(t,e,n){n.d(e,{t:function(){return i}});var o=n(2784),r=n(61644);function i(t){const[e,n]=(0,o.useState)(void 0);return(0,r.b)((()=>{if(t){n({width:t.offsetWidth,height:t.offsetHeight});const e=new ResizeObserver((e=>{if(!Array.isArray(e))return;if(!e.length)return;const o=e[0];let r,i;if("borderBoxSize"in o){const t=o.borderBoxSize,e=Array.isArray(t)?t[0]:t;r=e.inlineSize,i=e.blockSize}else r=t.offsetWidth,i=t.offsetHeight;n({width:r,height:i})}));return e.observe(t,{box:"border-box"}),()=>e.unobserve(t)}n(void 0)}),[t]),e}},76086:function(t,e,n){function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},o.apply(this,arguments)}n.d(e,{Z:function(){return o}})}}]);