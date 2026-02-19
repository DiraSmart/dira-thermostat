!function(){"use strict";function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",_=f.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,C=w.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+O,P=`<${T}>`,k=document,N=()=>k.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,z="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,I=/>/g,R=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),Y=new WeakMap,G=k.createTreeWalker(k,129);function q(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===H?"!--"===c[1]?r=D:void 0!==c[1]?r=I:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=R):void 0!==c[3]&&(r=R):r===R?">"===c[0]?(r=o??H,d=-1):void 0===c[1]?d=-2:(d=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?R:'"'===c[3]?L:j):r===L||r===j?r=R:r===D||r===I?r=H:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+P:d>=0?(s.push(a),i.slice(0,d)+S+i.slice(d)+O+h):i+O+(-2===d?e:h)}return[q(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,d]=K(t,e);if(this.el=J.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[n++],i=s.getAttribute(t).split(O),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(O)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(O),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(O,t+1));)a.push({type:7,index:o}),t+=O.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),n||=!M(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(N(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},lt=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return function(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}({...t,state:!0,attribute:!1})}const pt=r`
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
    padding: 10px 8px;
    border-radius: calc(var(--dira-radius-button) - 2px);
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 13px;
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
    --mdc-icon-size: 18px;
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

  .compact-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
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
`,ut={en:{"card.target":"Target","card.current":"Current","card.state":"State","card.hvac_modes":"Mode","card.fan_modes":"Fan","card.swing_modes":"Swing","card.preset_modes":"Preset","card.unavailable":"Unavailable","card.not_found":"Entity not found","card.low":"Low","card.high":"High","mode.off":"Off","mode.heat":"Heat","mode.cool":"Cool","mode.auto":"Auto","mode.dry":"Dry","mode.fan_only":"Fan","mode.heat_cool":"Auto","action.off":"Off","action.heating":"Heating","action.cooling":"Cooling","action.drying":"Drying","action.idle":"Idle","action.fan":"Fan","editor.entity":"Entity","editor.name":"Name (optional)","editor.icon":"Icon (optional)","editor.step_size":"Step size","editor.decimals":"Decimals","editor.popup":"Popup mode","editor.show_header":"Show header"},es:{"card.target":"Objetivo","card.current":"Actual","card.state":"Estado","card.hvac_modes":"Modo","card.fan_modes":"Ventilador","card.swing_modes":"Oscilacion","card.preset_modes":"Preajuste","card.unavailable":"No disponible","card.not_found":"Entidad no encontrada","card.low":"Min","card.high":"Max","mode.off":"Apagado","mode.heat":"Calor","mode.cool":"Frio","mode.auto":"Auto","mode.dry":"Seco","mode.fan_only":"Ventilador","mode.heat_cool":"Auto","action.off":"Apagado","action.heating":"Calentando","action.cooling":"Enfriando","action.drying":"Secando","action.idle":"Inactivo","action.fan":"Ventilando","editor.entity":"Entidad","editor.name":"Nombre (opcional)","editor.icon":"Icono (opcional)","editor.step_size":"Incremento","editor.decimals":"Decimales","editor.popup":"Modo popup","editor.show_header":"Mostrar encabezado"}};function ft(t,e="en"){const i=e.substring(0,2);return ut[i]?.[t]??ut.en?.[t]??t}var mt,gt;!function(t){t.OFF="off",t.HEAT="heat",t.COOL="cool",t.HEAT_COOL="heat_cool",t.AUTO="auto",t.DRY="dry",t.FAN_ONLY="fan_only"}(mt||(mt={})),function(t){t.OFF="off",t.HEATING="heating",t.COOLING="cooling",t.DRYING="drying",t.IDLE="idle",t.FAN="fan"}(gt||(gt={}));const _t={[mt.HEAT]:"#ff8100",[mt.COOL]:"#2b9af9",[mt.AUTO]:"#4caf50",[mt.HEAT_COOL]:"#4caf50",[mt.DRY]:"#efbd07",[mt.FAN_ONLY]:"#8a8a8a",[mt.OFF]:"#8a8a8a"};function $t(t,e){return e?.[t]??_t[t]??"#8a8a8a"}function vt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?`${parseInt(e[1],16)}, ${parseInt(e[2],16)}, ${parseInt(e[3],16)}`:"138, 138, 138"}gt.HEATING,gt.COOLING,gt.DRYING,gt.IDLE,gt.FAN,gt.OFF;const yt={[mt.OFF]:"mdi:power",[mt.HEAT]:"mdi:fire",[mt.COOL]:"mdi:snowflake",[mt.HEAT_COOL]:"mdi:autorenew",[mt.AUTO]:"mdi:autorenew",[mt.DRY]:"mdi:water-percent",[mt.FAN_ONLY]:"mdi:fan"};gt.HEATING,gt.COOLING,gt.DRYING,gt.IDLE,gt.FAN,gt.OFF;const bt={auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2","medium-low":"mdi:fan-speed-1","medium-high":"mdi:fan-speed-2",high:"mdi:fan-speed-3",on:"mdi:fan",off:"mdi:fan-off",diffuse:"mdi:weather-windy"},xt={on:"mdi:arrow-oscillating",off:"mdi:arrow-oscillating-off",both:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down",horizontal:"mdi:arrow-left-right"},wt={none:"mdi:cancel",home:"mdi:home",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",sleep:"mdi:bed",activity:"mdi:motion-sensor"};function At(t){return yt[t]??"mdi:thermostat"}function Ct(t,e=1,i="N/A"){return null==t||isNaN(t)?i:Number(t).toFixed(e)}function Et(t,e,i,s){const o=new CustomEvent(e,{bubbles:!0,composed:!0,cancelable:!1,detail:i});t.dispatchEvent(o)}function St(t,e="light"){Et(t,"haptic",e)}function Ot(t,e){Et(t,"hass-more-info",{entityId:e})}const Tt={hvac:{type:"hvac",attributeModes:"hvac_modes",attributeActive:"__state__",headingKey:"card.hvac_modes",getIcon:At,getColor:$t},fan:{type:"fan",attributeModes:"fan_modes",attributeActive:"fan_mode",headingKey:"card.fan_modes",getIcon:function(t){return bt[t.toLowerCase()]??"mdi:fan"},getColor:()=>"#4dd0e1"},preset:{type:"preset",attributeModes:"preset_modes",attributeActive:"preset_mode",headingKey:"card.preset_modes",getIcon:function(t){return wt[t.toLowerCase()]??"mdi:tune"},getColor:()=>"#b39ddb"},swing:{type:"swing",attributeModes:"swing_modes",attributeActive:"swing_mode",headingKey:"card.swing_modes",getIcon:function(t){return xt[t.toLowerCase()]??"mdi:arrow-oscillating"},getColor:()=>"#ffb74d"}},Pt=["off","heat","cool","heat_cool","auto","dry","fan_only"];function kt(t,e,i,s,o){if(!1===s)return W;const n=t.language??"en",r=i.layout?.mode??{},a=!1!==r.names,c=!1!==r.icons,d=!0===r.headings,l=[];for(const r of["hvac","fan","preset","swing"]){const h=s[r];if(!1===h||void 0===h)continue;const p=Nt(t,e,i,Tt[r],h,n,a,c,d,t=>o(r,t));p!==W&&l.push(p)}return 0===l.length?W:V`${l}`}function Nt(t,e,i,s,o,n,r,a,c,d){const l=e.attributes[s.attributeModes]??[];if(0===l.length)return W;if(("object"==typeof o&&void 0!==o._hide_when_off?o._hide_when_off:"hvac"!==s.type)&&("off"===e.state||"unavailable"===e.state))return W;const h="__state__"===s.attributeActive?e.state:e.attributes[s.attributeActive]??"",p="object"==typeof o&&o._name?o._name:ft(s.headingKey,n);let u;const f="object"==typeof o&&Object.keys(o).some(t=>!t.startsWith("_"));if(f){const t=Object.keys(o).filter(t=>!t.startsWith("_")),e=t.filter(t=>l.includes(t)),i=l.filter(e=>!t.includes(e));u=[...e,...i]}else u=[...l],"hvac"===s.type&&u.sort((t,e)=>(-1!==Pt.indexOf(t)?Pt.indexOf(t):99)-(-1!==Pt.indexOf(e)?Pt.indexOf(e):99));const m=[];for(const t of u){let e;if("object"==typeof o){const i=o[t];if(!1===i||"object"==typeof i&&!1===i?.include)continue;"object"==typeof i&&(e=i)}const r=void 0!==e?.name&&!1!==e.name?e.name:ft(`mode.${t}`,n)!==`mode.${t}`?ft(`mode.${t}`,n):t.replace(/_/g," "),a=void 0!==e?.icon&&!1!==e.icon?e.icon:s.getIcon(t),c=s.getColor(t,i.colors);m.push({value:t,name:r,icon:a,color:c})}return 0===m.length?W:V`
    <div class="mode-section">
      ${c?V`<div class="mode-heading">${p}</div>`:W}
      <div class="segmented-control">
        ${m.map(t=>{const e=t.value===h,i=vt(t.color),s=e?`background-color: rgba(${i}, 0.2); color: ${t.color};`:"";return V`
            <button
              class="segment ${e?"active":""}"
              style="${s}"
              @click=${()=>d(t.value)}
              title=${t.name}
            >
              ${a?V`<ha-icon .icon=${t.icon}></ha-icon>`:W}
              ${r?V`<span class="segment-label">${t.name}</span>`:W}
            </button>
          `})}
      </div>
    </div>
  `}function Mt(t,e,i,s){if(!1===s.sensors||!s.sensors||0===s.sensors.length)return W;const o=s.layout?.sensors??{},n="table"===o.type,r=!1!==o.labels,a=s.sensors.map(s=>function(t,e,i,s,o){const n=s.entity??i.entity_id,r=e.states[n];if(!r)return W;let a,c;if(s.attribute)a=r.attributes[s.attribute];else{if(!s.entity)return W;a=r.state}if(null==a)return W;if("relativetime"===s.type){c=function(t){const e=Date.now(),i=Math.floor((e-t.getTime())/1e3);return i<60?`${i}s`:i<3600?`${Math.floor(i/60)}m`:i<86400?`${Math.floor(i/3600)}h`:`${Math.floor(i/86400)}d`}(new Date(a))}else c=void 0!==s.decimals&&"number"==typeof a?Ct(a,s.decimals):String(a);const d=s.unit??(s.attribute?"":r.attributes.unit_of_measurement??""),l=s.name??(s.attribute?s.attribute.replace(/_/g," "):r.attributes.friendly_name??n);return V`
    <div
      class="sensor-item"
      @click=${()=>Ot(t,n)}
    >
      ${s.icon?V`<ha-icon .icon=${s.icon}></ha-icon>`:W}
      ${o&&!s.icon?V`<span class="sensor-label">${l}:</span>`:W}
      <span class="sensor-value">${c}${d?` ${d}`:""}</span>
    </div>
  `}(t,e,i,s,r)).filter(t=>t!==W);return 0===a.length?W:V`
    <div class="sensors ${n?"table":""}">
      ${a}
    </div>
  `}class Ut extends at{constructor(){super(...arguments),this._expanded=!1,this._pendingValues={},this._longPressFired=!1,this._debouncedCallService=function(t,e){let i;const s=(...s)=>{void 0!==i&&clearTimeout(i),i=setTimeout(()=>{i=void 0,t(...s)},e)};return s.cancel=()=>{void 0!==i&&(clearTimeout(i),i=void 0)},s}(t=>{const e=this._config.service,i=e?.domain??"climate",s=e?.service??"set_temperature";this._hass.callService(i,s,{entity_id:this._config.entity,...t,...e?.data??{}}).then(()=>{this._pendingValues={}}).catch(()=>{this._pendingValues={}})},500),this._normalizedControl="auto",this._onPointerDown=()=>{this._longPressFired=!1,this._longPressTimer=setTimeout(()=>{this._longPressFired=!0,St(this,"light")},500)},this._onPointerUp=()=>{clearTimeout(this._longPressTimer),this._longPressFired?Ot(this,this._config.entity):this._config.popup&&(this._expanded?this._collapse():this._expand())},this._onPointerCancel=()=>{clearTimeout(this._longPressTimer)}}static get styles(){return pt}static getConfigElement(){return document.createElement("dira-thermostat-editor")}static getStubConfig(){return{entity:""}}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t.entity)throw new Error("You must define an entity");this._normalizedControl=this._normalizeControl(t.control),this._config=t}getCardSize(){return this._config?.popup?2:4}_normalizeControl(t){if(!1===t)return!1;if(null==t)return"auto";if(Array.isArray(t)){const e={};return t.forEach(t=>{e[t]=!0}),e}return t}_getEffectiveControl(t){const e=this._normalizedControl;if(!1===e)return!1;if("auto"===e){const e={hvac:!0};return t.attributes.fan_modes?.length>0&&(e.fan=!0),t.attributes.preset_modes?.length>0&&(e.preset=!0),t.attributes.swing_modes?.length>0&&(e.swing=!0),e}return e}_getTemperatureCallbacks(){const t=this._hass.states[this._config.entity];if(!t)return{onIncrement:()=>{},onDecrement:()=>{}};const e=this._config.step_size??t.attributes.target_temp_step??.5;return{onIncrement:i=>{const s=this._pendingValues[i]??t.attributes[i];if(void 0===s)return;const o=Math.round(10*(Number(s)+e))/10;this._setPendingTemperature(i,o,t)},onDecrement:i=>{const s=this._pendingValues[i]??t.attributes[i];if(void 0===s)return;const o=Math.round(10*(Number(s)-e))/10;this._setPendingTemperature(i,o,t)}}}_setPendingTemperature(t,e,i){const s=i.attributes.min_temp??7,o=i.attributes.max_temp??35,n=Math.max(s,Math.min(o,e));if(this._pendingValues={...this._pendingValues,[t]:n},function(t){const e=t.attributes;return"number"==typeof e.target_temp_low&&"number"==typeof e.target_temp_high}(i)){const t={target_temp_low:this._pendingValues.target_temp_low??i.attributes.target_temp_low,target_temp_high:this._pendingValues.target_temp_high??i.attributes.target_temp_high};this._debouncedCallService(t)}else this._debouncedCallService({[t]:n});St(this,"light"),this._resetCollapseTimer()}_expand(){this._expanded=!0,this._resetCollapseTimer()}_collapse(){this._expanded=!1,this._clearCollapseTimer()}_resetCollapseTimer(){this._clearCollapseTimer(),this._collapseTimer=setTimeout(()=>{this._expanded=!1},1e4)}_clearCollapseTimer(){void 0!==this._collapseTimer&&(clearTimeout(this._collapseTimer),this._collapseTimer=void 0)}disconnectedCallback(){super.disconnectedCallback(),this._clearCollapseTimer(),clearTimeout(this._longPressTimer)}_onModeSelect(t,e){this._resetCollapseTimer();const[i,s,o]={hvac:["climate","set_hvac_mode","hvac_mode"],fan:["climate","set_fan_mode","fan_mode"],preset:["climate","set_preset_mode","preset_mode"],swing:["climate","set_swing_mode","swing_mode"]}[t];this._hass.callService(i,s,{entity_id:this._config.entity,[o]:e}).then(()=>St(this,"light")).catch(()=>St(this,"failure"))}render(){if(!this._hass||!this._config)return W;const t=this._hass.states[this._config.entity];if(!t)return V`
        <ha-card>
          <div class="not-found">
            ${ft("card.not_found",this._hass.language)}: ${this._config.entity}
          </div>
        </ha-card>
      `;if(this._config.popup){const e=this._getEffectiveControl(t);return V`
        <ha-card>
          ${this._renderCompact(t)}
          ${this._expanded?V`
                <div class="expand-section">
                  ${kt(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
                  ${!0!==this._config.hide?.state?Mt(this,this._hass,t,this._config):W}
                </div>
              `:W}
        </ha-card>
      `}const e=this._getEffectiveControl(t);return V`
      <ha-card>
        ${!1!==this._config.header?this._renderCompact(t):W}
        ${kt(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
        ${!0!==this._config.hide?.state?Mt(this,this._hass,t,this._config):W}
      </ha-card>
    `}_renderCompact(t){const e="object"==typeof this._config.header?this._config.header:{},i=function(t,e){return e||(t.attributes.friendly_name??t.entity_id)}(t,(!1!==e.name?e.name:void 0)??this._config.name),s=t.state,o=this._hass.language??"en",n=$t(s,this._config.colors),r=vt(n),a="off"===s||"unavailable"===s,c=a||"fan_only"===s||!0===this._config.hide?.temperature,d=this._config.icon??e.icon??At(s),l=ft(`mode.${s}`,o),h=t.attributes.hvac_action,p=h?ft(`action.${h}`,o):"";let u=l;this._config.show_action&&p&&"off"!==h&&(u=`${l} · ${p}`);const f=t.attributes.fan_mode;this._config.show_fan_speed&&f&&!a&&(u=`${u} · ${f}`);const m=t.attributes.current_temperature,g=t.attributes.current_humidity,_=function(t,e){return!1===e?"":"string"==typeof e?e:t.attributes.unit_of_measurement??"°C"}(t,this._config.unit),$=this._config.decimals??1,v=[];null!=m&&v.push(`${Ct(m,$)} ${_}`),null!=g&&v.push(`${Math.round(g)}%`);const y=this._pendingValues.temperature??t.attributes.temperature,b=void 0!==this._pendingValues.temperature,x=t.attributes.min_temp??7,w=t.attributes.max_temp??35,A=this._getTemperatureCallbacks(),C=!1!==d&&!1!==e.icon,E=a||!C?"":`background-color: rgba(${r}, 0.2)`,S=a?"":`color: ${n}`,O=!c&&void 0!==y;return V`
      <div class="compact">
        <div
          class="compact-left"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
        >
          ${C?V`
                <div class="icon-shape" style="${E}">
                  <ha-icon .icon=${d} style="${S}"></ha-icon>
                </div>
              `:W}
          <div class="info">
            ${!1!==e.name?V`<div class="name">${i}</div>`:W}
            <div class="secondary">
              ${u}
              ${v.length>0?V` <span class="stats">\u00b7 ${v.join(" · ")}</span>`:W}
            </div>
          </div>
        </div>
        <div class="compact-right">
          ${this._renderFaults(e)}
          ${this._renderToggle(e)}
          ${O?V`
                <div class="compact-controls">
                  <button
                    class="temp-button"
                    @click=${t=>{t.stopPropagation(),A.onDecrement("temperature")}}
                    ?disabled=${y<=x}
                  >
                    <ha-icon .icon=${"mdi:minus"}></ha-icon>
                  </button>
                  <div class="compact-temp ${b?"updating":""}">
                    ${Ct(y,$)}
                    <span class="unit">${_}</span>
                  </div>
                  <button
                    class="temp-button"
                    @click=${t=>{t.stopPropagation(),A.onIncrement("temperature")}}
                    ?disabled=${y>=w}
                  >
                    <ha-icon .icon=${"mdi:plus"}></ha-icon>
                  </button>
                </div>
              `:W}
        </div>
      </div>
    `}_renderToggle(t){const e=t.toggle;if(!e?.entity)return W;const i=this._hass.states[e.entity];if(!i)return W;const s="on"===i.state;return V`
      <ha-switch
        .checked=${s}
        @change=${t=>{t.stopPropagation(),this._hass.callService("homeassistant",s?"turn_off":"turn_on",{entity_id:e.entity})}}
      ></ha-switch>
    `}_renderFaults(t){const e=t.faults;if(!e||0===e.length)return W;const i=e.map(t=>{const e=this._hass.states[t.entity];if(!e)return W;const i="on"===e.state;if(!i&&t.hide_inactive)return W;const s=t.icon??e.attributes.icon??"mdi:alert-circle";return V`
          <ha-icon
            class="fault-icon ${i?"active":"inactive"}"
            .icon=${s}
            @click=${e=>{e.stopPropagation(),Ot(this,t.entity)}}
          ></ha-icon>
        `}).filter(t=>t!==W);return 0===i.length?W:V`${i}`}updated(t){if(super.updated(t),t.has("_hass")&&Object.keys(this._pendingValues).length>0){const e=t.get("_hass");if(e){const t=e.states[this._config.entity],i=this._hass.states[this._config.entity];t&&i&&t.attributes.temperature!==i.attributes.temperature&&(this._pendingValues={})}}}}t([ht()],Ut.prototype,"_hass",void 0),t([ht()],Ut.prototype,"_config",void 0),t([ht()],Ut.prototype,"_expanded",void 0),t([ht()],Ut.prototype,"_pendingValues",void 0);class zt extends at{set hass(t){this._hass=t}setConfig(t){this._config={...t}}get _lang(){return this._hass?.language??"en"}_updateConfig(t){this._config={...this._config,...t},Et(this,"config-changed",{config:this._config})}render(){return this._hass&&this._config?V`
      <div class="editor">
        <ha-entity-picker
          .hass=${this._hass}
          .value=${this._config.entity??""}
          .includeDomains=${["climate"]}
          .label=${ft("editor.entity",this._lang)}
          @value-changed=${t=>this._updateConfig({entity:t.detail.value})}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-textfield
          .label=${ft("editor.name",this._lang)}
          .value=${this._config.name??""}
          @input=${t=>this._updateConfig({name:t.target.value||void 0})}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this._hass}
          .value=${this._config.icon??""}
          .label=${ft("editor.icon",this._lang)}
          @value-changed=${t=>this._updateConfig({icon:t.detail.value||void 0})}
        ></ha-icon-picker>

        <div class="row">
          <ha-textfield
            .label=${ft("editor.step_size",this._lang)}
            type="number"
            .value=${String(this._config.step_size??.5)}
            @input=${t=>{const e=parseFloat(t.target.value);!isNaN(e)&&e>0&&this._updateConfig({step_size:e})}}
          ></ha-textfield>

          <ha-textfield
            .label=${ft("editor.decimals",this._lang)}
            type="number"
            .value=${String(this._config.decimals??1)}
            @input=${t=>{const e=parseInt(t.target.value,10);!isNaN(e)&&e>=0&&e<=3&&this._updateConfig({decimals:e})}}
          ></ha-textfield>
        </div>

        <ha-formfield .label=${ft("editor.popup",this._lang)}>
          <ha-switch
            .checked=${this._config.popup??!1}
            @change=${t=>this._updateConfig({popup:t.target.checked})}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${ft("editor.show_header",this._lang)}>
          <ha-switch
            .checked=${!1!==this._config.header}
            @change=${t=>this._updateConfig({header:!!t.target.checked&&{}})}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:V``}static get styles(){return r`
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
    `}}t([ht()],zt.prototype,"_hass",void 0),t([ht()],zt.prototype,"_config",void 0),customElements.define("dira-thermostat",Ut),customElements.define("dira-thermostat-editor",zt),window.customCards=window.customCards||[],window.customCards.push({type:"dira-thermostat",name:"Dira Thermostat",description:"A modern thermostat card with Mushroom-style design and full climate control",preview:!0,documentationURL:"https://github.com/DiraSmart/dira-thermostat"}),console.info("%c DIRA-THERMOSTAT %c v1.0.0 ","color: white; background: #ff8100; font-weight: 700; padding: 2px 8px; border-radius: 4px 0 0 4px;","color: #ff8100; background: #fff3e0; font-weight: 700; padding: 2px 8px; border-radius: 0 4px 4px 0;")}();
