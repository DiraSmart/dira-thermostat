!function(){"use strict";function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&d(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const o=s.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const o=this.constructor;if(!1===n&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,C=w.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+T,k=`<${O}>`,P=document,N=()=>P.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,D=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),G=new WeakMap,q=P.createTreeWalker(P,129);function W(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===H?"!--"===c[1]?r=I:void 0!==c[1]?r=D:void 0!==c[2]?(V.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=R):void 0!==c[3]&&(r=R):r===R?">"===c[0]?(r=s??H,d=-1):void 0===c[1]?d=-2:(d=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?R:'"'===c[3]?L:j):r===L||r===j?r=R:r===I||r===D?r=H:(r=R,s=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===H?i+k:d>=0?(n.push(a),i.slice(0,d)+S+i.slice(d)+T+h):i+T+(-2===d?e:h)}return[W(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[c,d]=K(t,e);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=q.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=n.getAttribute(t).split(T),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(V.test(n.tagName)){const t=n.textContent.split(T),e=t.length-1;if(e>0){n.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],N()),q.nextNode(),a.push({type:2,index:++s});n.append(t[e],N())}}}else if(8===n.nodeType)if(n.data===O)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(T,t+1));)a.push({type:7,index:s}),t+=T.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){if(e===B)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,n)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??P).importNode(e,!0);q.currentNode=n;let s=q.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(s=q.nextNode(),o++)}return q.currentNode=P,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Q(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Z(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Z(this,n[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!M(a)||a!==this._$AH[r],a===Y?t=Y:t!==Y&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class nt extends tt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??Y)===B)return;const i=this._$AH,n=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==Y&&(i===Y||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new X(e.insertBefore(N(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},lt=(t=dt,e,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function ht(t){return function(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}({...t,state:!0,attribute:!1})}const pt=r`
  :host {
    --dira-spacing: 12px;
    --dira-radius-card: var(--ha-card-border-radius, 12px);
    --dira-radius-icon: 50%;
    --dira-radius-button: 12px;
    --dira-transition: 280ms ease-in-out;
    --dira-icon-size: 42px;
    --dira-font-title: 14px;
    --dira-font-secondary: 12px;
    --dira-font-temp: 28px;
    --dira-rgb-text: var(--rgb-primary-text-color, 33, 33, 33);
    --dira-rgb-disabled: var(--rgb-disabled-color, 189, 189, 189);
  }

  ha-card {
    padding: var(--dira-spacing);
    overflow: hidden;
  }

  /* ---- Header ---- */
  .header {
    display: flex;
    align-items: center;
    gap: var(--dira-spacing);
    cursor: pointer;
  }

  .icon-shape {
    position: relative;
    width: var(--dira-icon-size);
    height: var(--dira-icon-size);
    flex-shrink: 0;
    border-radius: var(--dira-radius-icon);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--dira-transition);
    background-color: rgba(var(--dira-rgb-text), 0.05);
  }

  .icon-shape ha-icon,
  .icon-shape ha-state-icon {
    --mdc-icon-size: 24px;
    transition: color var(--dira-transition);
    color: var(--primary-text-color);
  }

  .info {
    flex: 1;
    min-width: 0;
  }

  .info .name {
    font-size: var(--dira-font-title);
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  .info .secondary {
    font-size: var(--dira-font-secondary);
    color: var(--secondary-text-color);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .fault-icon {
    --mdc-icon-size: 16px;
    cursor: pointer;
  }

  .fault-icon.active {
    color: var(--error-color, #db4437);
  }

  .fault-icon.inactive {
    color: rgba(var(--dira-rgb-text), 0.2);
  }

  /* ---- Temperature Control ---- */
  .temperature-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--dira-spacing);
    padding: 16px 0 8px;
  }

  .temp-button {
    width: 36px;
    height: 36px;
    border-radius: var(--dira-radius-button);
    border: none;
    background: rgba(var(--dira-rgb-text), 0.05);
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--dira-transition);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    padding: 0;
    line-height: 0;
  }

  .temp-button:hover {
    background: rgba(var(--dira-rgb-text), 0.1);
  }

  .temp-button:active {
    background: rgba(var(--dira-rgb-text), 0.15);
    transform: scale(0.95);
  }

  .temp-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .temp-button ha-icon {
    --mdc-icon-size: 20px;
  }

  .temp-display {
    font-size: var(--dira-font-temp);
    font-weight: 600;
    color: var(--primary-text-color);
    min-width: 90px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    line-height: 1;
  }

  .temp-display .unit {
    font-size: 14px;
    font-weight: 400;
    color: var(--secondary-text-color);
    margin-left: 2px;
  }

  .temp-display.updating {
    color: var(--error-color, #db4437);
  }

  /* Dual setpoint */
  .dual-setpoints {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 0 8px;
    width: 100%;
  }

  .setpoint-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .setpoint-row .setpoint-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--secondary-text-color);
    min-width: 28px;
    text-align: right;
  }

  .setpoint-row .temp-display {
    font-size: 20px;
    min-width: 70px;
  }

  .setpoint-row .temp-button {
    width: 32px;
    height: 32px;
  }

  /* ---- Mode Controls (Segmented) ---- */
  .mode-section {
    margin-top: var(--dira-spacing);
  }

  .mode-heading {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
    padding: 0 2px;
  }

  .segmented-control {
    display: flex;
    background: rgba(var(--dira-rgb-text), 0.05);
    border-radius: var(--dira-radius-button);
    padding: 3px;
    gap: 2px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .segmented-control::-webkit-scrollbar {
    display: none;
  }

  .segment {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 7px 8px;
    border-radius: calc(var(--dira-radius-button) - 2px);
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 11px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--dira-transition);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    user-select: none;
    line-height: 1;
    white-space: nowrap;
  }

  .segment:hover {
    background: rgba(var(--dira-rgb-text), 0.06);
  }

  .segment:active {
    transform: scale(0.97);
  }

  .segment ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  .segment-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .segment.active {
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  /* ---- Sensors ---- */
  .sensors {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: var(--dira-spacing);
    padding-top: var(--dira-spacing);
    border-top: 1px solid rgba(var(--dira-rgb-text), 0.06);
  }

  .sensor-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--dira-font-secondary);
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .sensor-item ha-icon {
    --mdc-icon-size: 16px;
  }

  .sensor-item .sensor-label {
    opacity: 0.7;
  }

  .sensor-item .sensor-value {
    font-weight: 500;
    color: var(--primary-text-color);
  }

  /* Sensors table layout */
  .sensors.table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }

  .sensors.table .sensor-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  /* ---- Compact Mode (popup) ---- */
  .compact {
    display: flex;
    align-items: center;
    gap: var(--dira-spacing);
    padding: 0;
  }

  .compact-left {
    display: flex;
    align-items: center;
    gap: var(--dira-spacing);
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }

  .compact-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .compact-controls .temp-button {
    width: 32px;
    height: 32px;
  }

  .compact-controls .temp-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .compact-temp {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
    min-width: 50px;
    text-align: center;
    user-select: none;
    line-height: 1;
  }

  .compact-temp .unit {
    font-size: 11px;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .compact-temp.updating {
    color: var(--error-color, #db4437);
  }

  .info .secondary .stats {
    opacity: 0.8;
  }

  /* ---- Expand Section (compact mode) ---- */
  .expand-section {
    overflow: hidden;
    animation: dira-expand 280ms ease-out;
    border-top: 1px solid rgba(var(--dira-rgb-text), 0.06);
    margin-top: var(--dira-spacing);
    padding-top: 4px;
  }

  @keyframes dira-expand {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 500px;
      opacity: 1;
    }
  }

  /* ---- Not found ---- */
  .not-found {
    padding: 16px;
    color: var(--error-color, #db4437);
    text-align: center;
    font-size: 14px;
  }

  /* ---- Animations ---- */
`,ut={en:{"card.target":"Target","card.current":"Current","card.state":"State","card.hvac_modes":"Mode","card.fan_modes":"Fan","card.swing_modes":"Swing","card.preset_modes":"Preset","card.unavailable":"Unavailable","card.not_found":"Entity not found","card.low":"Low","card.high":"High","mode.off":"Off","mode.heat":"Heat","mode.cool":"Cool","mode.auto":"Auto","mode.dry":"Dry","mode.fan_only":"Fan","mode.heat_cool":"Auto","action.off":"Off","action.heating":"Heating","action.cooling":"Cooling","action.drying":"Drying","action.idle":"Idle","action.fan":"Fan","editor.entity":"Entity","editor.name":"Name (optional)","editor.icon":"Icon (optional)","editor.step_size":"Step size","editor.decimals":"Decimals","editor.popup":"Popup mode","editor.show_header":"Show header"},es:{"card.target":"Objetivo","card.current":"Actual","card.state":"Estado","card.hvac_modes":"Modo","card.fan_modes":"Ventilador","card.swing_modes":"Oscilacion","card.preset_modes":"Preajuste","card.unavailable":"No disponible","card.not_found":"Entidad no encontrada","card.low":"Min","card.high":"Max","mode.off":"Apagado","mode.heat":"Calor","mode.cool":"Frio","mode.auto":"Auto","mode.dry":"Seco","mode.fan_only":"Ventilador","mode.heat_cool":"Auto","action.off":"Apagado","action.heating":"Calentando","action.cooling":"Enfriando","action.drying":"Secando","action.idle":"Inactivo","action.fan":"Ventilando","editor.entity":"Entidad","editor.name":"Nombre (opcional)","editor.icon":"Icono (opcional)","editor.step_size":"Incremento","editor.decimals":"Decimales","editor.popup":"Modo popup","editor.show_header":"Mostrar encabezado"}};function mt(t,e="en"){const i=e.substring(0,2);return ut[i]?.[t]??ut.en?.[t]??t}var ft,gt;!function(t){t.OFF="off",t.HEAT="heat",t.COOL="cool",t.HEAT_COOL="heat_cool",t.AUTO="auto",t.DRY="dry",t.FAN_ONLY="fan_only"}(ft||(ft={})),function(t){t.OFF="off",t.HEATING="heating",t.COOLING="cooling",t.DRYING="drying",t.IDLE="idle",t.FAN="fan"}(gt||(gt={}));const _t={[ft.HEAT]:"#ff8100",[ft.COOL]:"#2b9af9",[ft.AUTO]:"#4caf50",[ft.HEAT_COOL]:"#4caf50",[ft.DRY]:"#efbd07",[ft.FAN_ONLY]:"#8a8a8a",[ft.OFF]:"#8a8a8a"};function $t(t,e){return e?.[t]??_t[t]??"#8a8a8a"}function vt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?`${parseInt(e[1],16)}, ${parseInt(e[2],16)}, ${parseInt(e[3],16)}`:"138, 138, 138"}gt.HEATING,gt.COOLING,gt.DRYING,gt.IDLE,gt.FAN,gt.OFF;const bt={[ft.OFF]:"mdi:power",[ft.HEAT]:"mdi:fire",[ft.COOL]:"mdi:snowflake",[ft.HEAT_COOL]:"mdi:autorenew",[ft.AUTO]:"mdi:autorenew",[ft.DRY]:"mdi:water-percent",[ft.FAN_ONLY]:"mdi:fan"};gt.HEATING,gt.COOLING,gt.DRYING,gt.IDLE,gt.FAN,gt.OFF;const yt={auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2","medium-low":"mdi:fan-speed-1","medium-high":"mdi:fan-speed-2",high:"mdi:fan-speed-3",on:"mdi:fan",off:"mdi:fan-off",diffuse:"mdi:weather-windy"},xt={on:"mdi:arrow-oscillating",off:"mdi:arrow-oscillating-off",both:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down",horizontal:"mdi:arrow-left-right"},wt={none:"mdi:cancel",home:"mdi:home",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",sleep:"mdi:bed",activity:"mdi:motion-sensor"};function At(t){return bt[t]??"mdi:thermostat"}function Ct(t){const e=t.attributes;return"number"==typeof e.target_temp_low&&"number"==typeof e.target_temp_high}function Et(t,e=1,i="N/A"){return null==t||isNaN(t)?i:Number(t).toFixed(e)}function St(t,e){return!1===e?"":"string"==typeof e?e:t.attributes.unit_of_measurement??"°C"}function Tt(t,e){return e||(t.attributes.friendly_name??t.entity_id)}function Ot(t,e,i,n){const s=new CustomEvent(e,{bubbles:!0,composed:!0,cancelable:!1,detail:i});t.dispatchEvent(s)}function kt(t,e="light"){Ot(t,"haptic",e)}function Pt(t,e){Ot(t,"hass-more-info",{entityId:e})}function Nt(t,e,i,n,s){if(!1===n.header)return Y;const o="object"==typeof n.header?n.header:{};if(!1===o.name&&!1===o.icon)return Y;const r=e.language??"en",a=Tt(i,n.name),c=i.state,d=$t(c,n.colors),l=vt(d),h="off"===c||"unavailable"===c,p=n.icon??o.icon??At(c),u=mt(`mode.${c}`,r),m=i.attributes.hvac_action,f=m?mt(`action.${m}`,r):"";let g=u;n.show_action&&f&&"off"!==m&&(g=`${u} · ${f}`);const _=i.attributes.fan_mode;n.show_fan_speed&&_&&!h&&(g=`${g} · ${_}`);const $=i.attributes.current_temperature,v=i.attributes.current_humidity,b=i.attributes.unit_of_measurement??"°C",y=[];null!=$&&y.push(`${Et($,n.decimals??1)} ${b}`),null!=v&&y.push(`${Math.round(v)}%`);const x=h||!1===p?"":`background-color: rgba(${l}, 0.2)`,w=h?"":`color: ${d}`,A=s,C=A&&void 0!==A.targetValue;return F`
    <div
      class="header"
      @click=${e=>{const i=e.target;i.closest("ha-switch")||i.closest(".fault-icon")||i.closest(".temp-button")||i.closest(".compact-controls")||Pt(t,n.entity)}}
    >
      ${!1!==p?F`
            <div class="icon-shape" style="${x}">
              <ha-icon
                .icon=${p}
                style="${w}"
              ></ha-icon>
            </div>
          `:Y}
      <div class="info">
        ${!1!==o.name?F`<div class="name">${a}</div>`:Y}
        <div class="secondary">
          ${g}
          ${y.length>0?F` <span class="stats">\u00b7 ${y.join(" · ")}</span>`:Y}
        </div>
      </div>
      ${C?F`
            <div class="compact-controls">
              <button
                class="temp-button"
                @click=${t=>{t.stopPropagation(),A.onDecrement()}}
                ?disabled=${A.targetValue<=A.minTemp}
              >
                <ha-icon .icon=${"mdi:minus"}></ha-icon>
              </button>
              <div class="compact-temp ${A.isUpdating?"updating":""}">
                ${Et(A.targetValue,A.decimals)}
                <span class="unit">${A.unit}</span>
              </div>
              <button
                class="temp-button"
                @click=${t=>{t.stopPropagation(),A.onIncrement()}}
                ?disabled=${A.targetValue>=A.maxTemp}
              >
                <ha-icon .icon=${"mdi:plus"}></ha-icon>
              </button>
            </div>
          `:F`
            <div class="header-actions">
              ${function(t,e,i){if(!i||0===i.length)return Y;const n=i.map(i=>{const n=e.states[i.entity];if(!n)return Y;const s="on"===n.state;if(!s&&i.hide_inactive)return Y;const o=i.icon??n.attributes.icon??"mdi:alert-circle";return F`
        <ha-icon
          class="fault-icon ${s?"active":"inactive"}"
          .icon=${o}
          @click=${e=>{e.stopPropagation(),Pt(t,i.entity)}}
        ></ha-icon>
      `}).filter(t=>t!==Y);return 0===n.length?Y:F`${n}`}(t,e,o.faults)}
              ${function(t,e,i){if(!i?.entity)return Y;const n=e.states[i.entity];if(!n)return Y;const s="on"===n.state;return F`
    <ha-switch
      .checked=${s}
      @change=${t=>{t.stopPropagation(),e.callService("homeassistant",s?"turn_off":"turn_on",{entity_id:i.entity})}}
    ></ha-switch>
  `}(0,e,o.toggle)}
            </div>
          `}
    </div>
  `}function Mt(t,e,i,n,s,o){if(!1===n.setpoints)return Y;const r=i.attributes,a=n.decimals??1,c=n.fallback??"N/A",d=St(i,n.unit),l=r.min_temp??7,h=r.max_temp??35;return Ct(i)?function(t,e,i,n,s,o,r,a,c,d,l){const h=e.language??"en";n.step_size??i.attributes.target_temp_step;const p=[{key:"target_temp_low",label:mt("card.low",h),rawValue:i.attributes.target_temp_low},{key:"target_temp_high",label:mt("card.high",h),rawValue:i.attributes.target_temp_high}],u=p.filter(t=>!n.setpoints||"object"!=typeof n.setpoints||!n.setpoints[t.key]?.hide).map(e=>{const n=s[e.key]??e.rawValue,h=void 0!==s[e.key];return F`
        <div class="setpoint-row">
          <span class="setpoint-label">${e.label}</span>
          <button
            class="temp-button"
            @click=${()=>o.onDecrement(e.key)}
            ?disabled=${void 0!==n&&n<=d}
          >
            <ha-icon .icon=${"mdi:minus"}></ha-icon>
          </button>
          <div
            class="temp-display ${h?"updating":""}"
            @click=${()=>Pt(t,i.entity_id)}
          >
            ${Et(n,r,a)}
            <span class="unit">${c}</span>
          </div>
          <button
            class="temp-button"
            @click=${()=>o.onIncrement(e.key)}
            ?disabled=${void 0!==n&&n>=l}
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
          </button>
        </div>
      `});return F`<div class="dual-setpoints">${u}</div>`}(t,e,i,n,s,o,a,c,d,l,h):function(t,e,i,n,s,o,r,a,c,d){const l=e.attributes.temperature,h=n.temperature??l,p=void 0!==n.temperature;if(i.step_size??e.attributes.target_temp_step,i.setpoints&&"object"==typeof i.setpoints&&i.setpoints.temperature?.hide)return F``;return F`
    <div class="temperature-control">
      <button
        class="temp-button"
        @click=${()=>s.onDecrement("temperature")}
        ?disabled=${void 0!==h&&h<=c}
      >
        <ha-icon .icon=${"mdi:minus"}></ha-icon>
      </button>
      <div
        class="temp-display ${p?"updating":""}"
        @click=${()=>Pt(t,e.entity_id)}
      >
        ${Et(h,o,r)}
        <span class="unit">${a}</span>
      </div>
      <button
        class="temp-button"
        @click=${()=>s.onIncrement("temperature")}
        ?disabled=${void 0!==h&&h>=d}
      >
        <ha-icon .icon=${"mdi:plus"}></ha-icon>
      </button>
    </div>
  `}(t,i,n,s,o,a,c,d,l,h)}const zt={hvac:{type:"hvac",attributeModes:"hvac_modes",attributeActive:"__state__",headingKey:"card.hvac_modes",getIcon:At,getColor:$t},fan:{type:"fan",attributeModes:"fan_modes",attributeActive:"fan_mode",headingKey:"card.fan_modes",getIcon:function(t){return yt[t.toLowerCase()]??"mdi:fan"},getColor:()=>"#8a8a8a"},preset:{type:"preset",attributeModes:"preset_modes",attributeActive:"preset_mode",headingKey:"card.preset_modes",getIcon:function(t){return wt[t.toLowerCase()]??"mdi:tune"},getColor:()=>"#8a8a8a"},swing:{type:"swing",attributeModes:"swing_modes",attributeActive:"swing_mode",headingKey:"card.swing_modes",getIcon:function(t){return xt[t.toLowerCase()]??"mdi:arrow-oscillating"},getColor:()=>"#8a8a8a"}},Ut=["off","heat","cool","heat_cool","auto","dry","fan_only"];function Ht(t,e,i,n,s){if(!1===n)return Y;const o=t.language??"en",r=i.layout?.mode??{},a=!1!==r.names,c=!1!==r.icons,d=!0===r.headings,l=[];for(const r of["hvac","fan","preset","swing"]){const h=n[r];if(!1===h||void 0===h)continue;const p=It(t,e,i,zt[r],h,o,a,c,d,t=>s(r,t));p!==Y&&l.push(p)}return 0===l.length?Y:F`${l}`}function It(t,e,i,n,s,o,r,a,c,d){const l=e.attributes[n.attributeModes]??[];if(0===l.length)return Y;if(("object"==typeof s&&void 0!==s._hide_when_off?s._hide_when_off:"hvac"!==n.type)&&("off"===e.state||"unavailable"===e.state))return Y;const h="__state__"===n.attributeActive?e.state:e.attributes[n.attributeActive]??"",p="object"==typeof s&&s._name?s._name:mt(n.headingKey,o);let u=[...l];"hvac"===n.type&&u.sort((t,e)=>(-1!==Ut.indexOf(t)?Ut.indexOf(t):99)-(-1!==Ut.indexOf(e)?Ut.indexOf(e):99));const m=[];for(const t of u){let e;if("object"==typeof s){const i=s[t];if(!1===i||"object"==typeof i&&!1===i?.include)continue;"object"==typeof i&&(e=i)}const r=void 0!==e?.name&&!1!==e.name?e.name:mt(`mode.${t}`,o)!==`mode.${t}`?mt(`mode.${t}`,o):t.replace(/_/g," "),a=void 0!==e?.icon&&!1!==e.icon?e.icon:n.getIcon(t),c=n.getColor(t,i.colors);m.push({value:t,name:r,icon:a,color:c})}return 0===m.length?Y:F`
    <div class="mode-section">
      ${c?F`<div class="mode-heading">${p}</div>`:Y}
      <div class="segmented-control">
        ${m.map(t=>{const e=t.value===h,i=vt(t.color),n=e?`background-color: rgba(${i}, 0.2); color: ${t.color};`:"";return F`
            <button
              class="segment ${e?"active":""}"
              style="${n}"
              @click=${()=>d(t.value)}
              title=${t.name}
            >
              ${a?F`<ha-icon .icon=${t.icon}></ha-icon>`:Y}
              ${r?F`<span class="segment-label">${t.name}</span>`:Y}
            </button>
          `})}
      </div>
    </div>
  `}function Dt(t,e,i,n){if(!1===n.sensors||!n.sensors||0===n.sensors.length)return Y;const s=n.layout?.sensors??{},o="table"===s.type,r=!1!==s.labels,a=n.sensors.map(n=>function(t,e,i,n,s){const o=n.entity??i.entity_id,r=e.states[o];if(!r)return Y;let a,c;if(n.attribute)a=r.attributes[n.attribute];else{if(!n.entity)return Y;a=r.state}if(null==a)return Y;if("relativetime"===n.type){c=function(t){const e=Date.now(),i=Math.floor((e-t.getTime())/1e3);return i<60?`${i}s`:i<3600?`${Math.floor(i/60)}m`:i<86400?`${Math.floor(i/3600)}h`:`${Math.floor(i/86400)}d`}(new Date(a))}else c=void 0!==n.decimals&&"number"==typeof a?Et(a,n.decimals):String(a);const d=n.unit??(n.attribute?"":r.attributes.unit_of_measurement??""),l=n.name??(n.attribute?n.attribute.replace(/_/g," "):r.attributes.friendly_name??o);return F`
    <div
      class="sensor-item"
      @click=${()=>Pt(t,o)}
    >
      ${n.icon?F`<ha-icon .icon=${n.icon}></ha-icon>`:Y}
      ${s&&!n.icon?F`<span class="sensor-label">${l}:</span>`:Y}
      <span class="sensor-value">${c}${d?` ${d}`:""}</span>
    </div>
  `}(t,e,i,n,r)).filter(t=>t!==Y);return 0===a.length?Y:F`
    <div class="sensors ${o?"table":""}">
      ${a}
    </div>
  `}class Rt extends at{constructor(){super(...arguments),this._expanded=!1,this._pendingValues={},this._debouncedCallService=function(t,e){let i;const n=(...n)=>{void 0!==i&&clearTimeout(i),i=setTimeout(()=>{i=void 0,t(...n)},e)};return n.cancel=()=>{void 0!==i&&(clearTimeout(i),i=void 0)},n}(t=>{const e=this._config.service,i=e?.domain??"climate",n=e?.service??"set_temperature";this._hass.callService(i,n,{entity_id:this._config.entity,...t,...e?.data??{}}).then(()=>{this._pendingValues={}}).catch(()=>{this._pendingValues={}})},500),this._normalizedControl="auto"}static get styles(){return pt}static getConfigElement(){return document.createElement("dira-thermostat-editor")}static getStubConfig(){return{entity:""}}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t.entity)throw new Error("You must define an entity");this._normalizedControl=this._normalizeControl(t.control),this._config=t}getCardSize(){return this._config?.popup?2:4}_normalizeControl(t){if(!1===t)return!1;if(null==t)return"auto";if(Array.isArray(t)){const e={};return t.forEach(t=>{e[t]=!0}),e}return t}_getEffectiveControl(t){const e=this._normalizedControl;if(!1===e)return!1;if("auto"===e){const e={hvac:!0};return t.attributes.fan_modes?.length>0&&(e.fan=!0),t.attributes.preset_modes?.length>0&&(e.preset=!0),t.attributes.swing_modes?.length>0&&(e.swing=!0),e}return e}_getTemperatureCallbacks(){const t=this._hass.states[this._config.entity];if(!t)return{onIncrement:()=>{},onDecrement:()=>{}};const e=this._config.step_size??t.attributes.target_temp_step??.5;return{onIncrement:i=>{const n=this._pendingValues[i]??t.attributes[i];if(void 0===n)return;const s=Math.round(10*(Number(n)+e))/10;this._setPendingTemperature(i,s,t)},onDecrement:i=>{const n=this._pendingValues[i]??t.attributes[i];if(void 0===n)return;const s=Math.round(10*(Number(n)-e))/10;this._setPendingTemperature(i,s,t)}}}_setPendingTemperature(t,e,i){const n=i.attributes.min_temp??7,s=i.attributes.max_temp??35,o=Math.max(n,Math.min(s,e));if(this._pendingValues={...this._pendingValues,[t]:o},Ct(i)){const t={target_temp_low:this._pendingValues.target_temp_low??i.attributes.target_temp_low,target_temp_high:this._pendingValues.target_temp_high??i.attributes.target_temp_high};this._debouncedCallService(t)}else this._debouncedCallService({[t]:o});kt(this,"light"),this._resetCollapseTimer()}_expand(){this._expanded=!0,this._resetCollapseTimer()}_collapse(){this._expanded=!1,this._clearCollapseTimer()}_resetCollapseTimer(){this._clearCollapseTimer(),this._collapseTimer=setTimeout(()=>{this._expanded=!1},1e4)}_clearCollapseTimer(){void 0!==this._collapseTimer&&(clearTimeout(this._collapseTimer),this._collapseTimer=void 0)}disconnectedCallback(){super.disconnectedCallback(),this._clearCollapseTimer()}_onModeSelect(t,e){this._resetCollapseTimer();const[i,n,s]={hvac:["climate","set_hvac_mode","hvac_mode"],fan:["climate","set_fan_mode","fan_mode"],preset:["climate","set_preset_mode","preset_mode"],swing:["climate","set_swing_mode","swing_mode"]}[t];this._hass.callService(i,n,{entity_id:this._config.entity,[s]:e}).then(()=>kt(this,"light")).catch(()=>kt(this,"failure"))}_getHeaderTempControls(t){if(!0===this._config.hide?.temperature)return;const e=t.state;if("off"===e||"unavailable"===e||"fan_only"===e)return;if(Ct(t))return;const i=this._pendingValues.temperature??t.attributes.temperature;if(void 0===i)return;const n=this._getTemperatureCallbacks();return{targetValue:i,isUpdating:void 0!==this._pendingValues.temperature,minTemp:t.attributes.min_temp??7,maxTemp:t.attributes.max_temp??35,decimals:this._config.decimals??1,unit:St(t,this._config.unit),onIncrement:()=>n.onIncrement("temperature"),onDecrement:()=>n.onDecrement("temperature")}}_shouldShowTemperature(t){if(!0===this._config.hide?.temperature)return!1;const e=t.state;return"off"!==e&&"unavailable"!==e&&"fan_only"!==e}render(){if(!this._hass||!this._config)return Y;const t=this._hass.states[this._config.entity];if(!t)return F`
        <ha-card>
          <div class="not-found">
            ${mt("card.not_found",this._hass.language)}: ${this._config.entity}
          </div>
        </ha-card>
      `;if(this._config.popup){const e=this._getEffectiveControl(t);return F`
        <ha-card>
          ${this._renderCompact(t)}
          ${this._expanded?F`
                <div class="expand-section">
                  ${Ht(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
                  ${!0!==this._config.hide?.state?Dt(this,this._hass,t,this._config):Y}
                </div>
              `:Y}
        </ha-card>
      `}const e=this._getEffectiveControl(t),i=this._getHeaderTempControls(t);return F`
      <ha-card>
        ${Nt(this,this._hass,t,this._config,i)}
        ${this._shouldShowTemperature(t)&&Ct(t)?Mt(this,this._hass,t,this._config,this._pendingValues,this._getTemperatureCallbacks()):Y}
        ${Ht(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
        ${!0!==this._config.hide?.state?Dt(this,this._hass,t,this._config):Y}
      </ha-card>
    `}_renderCompact(t){const e=Tt(t,this._config.name),i=t.state,n=this._hass.language??"en",s=$t(i,this._config.colors),o=vt(s),r="off"===i||"unavailable"===i,a=r||"fan_only"===i,c=this._config.icon??At(i),d=mt(`mode.${i}`,n),l=t.attributes.fan_mode;let h=d;this._config.show_fan_speed&&l&&!r&&(h=`${d} · ${l}`);const p=t.attributes.current_temperature,u=t.attributes.current_humidity,m=St(t,this._config.unit),f=this._config.decimals??1,g=[];null!=p&&g.push(`${Et(p,f)} ${m}`),null!=u&&g.push(`${Math.round(u)}%`);const _=this._pendingValues.temperature??t.attributes.temperature,$=void 0!==this._pendingValues.temperature,v=t.attributes.min_temp??7,b=t.attributes.max_temp??35,y=this._getTemperatureCallbacks();return F`
      <div class="compact">
        <div
          class="compact-left"
          @click=${()=>this._expand()}
        >
          <div class="icon-shape" style="${r?"":`background-color: rgba(${o}, 0.2)`}">
            <ha-icon .icon=${c} style="${r?"":`color: ${s}`}"></ha-icon>
          </div>
          <div class="info">
            <div class="name">${e}</div>
            <div class="secondary">
              ${h}
              ${g.length>0?F` <span class="stats">\u00b7 ${g.join(" · ")}</span>`:Y}
            </div>
          </div>
        </div>
        ${a||void 0===_?Y:F`
              <div class="compact-controls">
                <button
                  class="temp-button"
                  @click=${t=>{t.stopPropagation(),y.onDecrement("temperature")}}
                  ?disabled=${_<=v}
                >
                  <ha-icon .icon=${"mdi:minus"}></ha-icon>
                </button>
                <div class="compact-temp ${$?"updating":""}">
                  ${Et(_,f)}
                  <span class="unit">${m}</span>
                </div>
                <button
                  class="temp-button"
                  @click=${t=>{t.stopPropagation(),y.onIncrement("temperature")}}
                  ?disabled=${_>=b}
                >
                  <ha-icon .icon=${"mdi:plus"}></ha-icon>
                </button>
              </div>
            `}
      </div>
    `}updated(t){if(super.updated(t),t.has("_hass")&&Object.keys(this._pendingValues).length>0){const e=t.get("_hass");if(e){const t=e.states[this._config.entity],i=this._hass.states[this._config.entity];t&&i&&t.attributes.temperature!==i.attributes.temperature&&(this._pendingValues={})}}}}t([ht()],Rt.prototype,"_hass",void 0),t([ht()],Rt.prototype,"_config",void 0),t([ht()],Rt.prototype,"_expanded",void 0),t([ht()],Rt.prototype,"_pendingValues",void 0);class jt extends at{set hass(t){this._hass=t}setConfig(t){this._config={...t}}get _lang(){return this._hass?.language??"en"}_updateConfig(t){this._config={...this._config,...t},Ot(this,"config-changed",{config:this._config})}render(){return this._hass&&this._config?F`
      <div class="editor">
        <ha-entity-picker
          .hass=${this._hass}
          .value=${this._config.entity??""}
          .includeDomains=${["climate"]}
          .label=${mt("editor.entity",this._lang)}
          @value-changed=${t=>this._updateConfig({entity:t.detail.value})}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-textfield
          .label=${mt("editor.name",this._lang)}
          .value=${this._config.name??""}
          @input=${t=>this._updateConfig({name:t.target.value||void 0})}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this._hass}
          .value=${this._config.icon??""}
          .label=${mt("editor.icon",this._lang)}
          @value-changed=${t=>this._updateConfig({icon:t.detail.value||void 0})}
        ></ha-icon-picker>

        <div class="row">
          <ha-textfield
            .label=${mt("editor.step_size",this._lang)}
            type="number"
            .value=${String(this._config.step_size??.5)}
            @input=${t=>{const e=parseFloat(t.target.value);!isNaN(e)&&e>0&&this._updateConfig({step_size:e})}}
          ></ha-textfield>

          <ha-textfield
            .label=${mt("editor.decimals",this._lang)}
            type="number"
            .value=${String(this._config.decimals??1)}
            @input=${t=>{const e=parseInt(t.target.value,10);!isNaN(e)&&e>=0&&e<=3&&this._updateConfig({decimals:e})}}
          ></ha-textfield>
        </div>

        <ha-formfield .label=${mt("editor.popup",this._lang)}>
          <ha-switch
            .checked=${this._config.popup??!1}
            @change=${t=>this._updateConfig({popup:t.target.checked})}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${mt("editor.show_header",this._lang)}>
          <ha-switch
            .checked=${!1!==this._config.header}
            @change=${t=>this._updateConfig({header:!!t.target.checked&&{}})}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:F``}static get styles(){return r`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .row {
        display: flex;
        gap: 16px;
      }
      .row > * {
        flex: 1;
      }
      ha-formfield {
        display: flex;
        align-items: center;
        --mdc-theme-secondary: var(--primary-color);
      }
    `}}t([ht()],jt.prototype,"_hass",void 0),t([ht()],jt.prototype,"_config",void 0),customElements.define("dira-thermostat",Rt),customElements.define("dira-thermostat-editor",jt),window.customCards=window.customCards||[],window.customCards.push({type:"dira-thermostat",name:"Dira Thermostat",description:"A modern thermostat card with Mushroom-style design and full climate control",preview:!0,documentationURL:"https://github.com/DiraSmart/dira-thermostat"}),console.info("%c DIRA-THERMOSTAT %c v1.0.0 ","color: white; background: #ff8100; font-weight: 700; padding: 2px 8px; border-radius: 4px 0 0 4px;","color: #ff8100; background: #fff3e0; font-weight: 700; padding: 2px 8px; border-radius: 0 4px 4px 0;")}();
