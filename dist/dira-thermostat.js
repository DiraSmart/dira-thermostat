!function(){"use strict";function t(t,e,i,o){var n,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",_=f.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const s=n.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,n){if(void 0!==t){const s=this.constructor;if(!1===o&&(n=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,C=x.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+T,O=`<${k}>`,M=document,P=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,j=/>/g,D=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,F=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),W=new WeakMap,Y=M.createTreeWalker(M,129);function q(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===U?"!--"===c[1]?r=I:void 0!==c[1]?r=j:void 0!==c[2]?(F.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=D):void 0!==c[3]&&(r=D):r===D?">"===c[0]?(r=n??U,d=-1):void 0===c[1]?d=-2:(d=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?D:'"'===c[3]?L:R):r===L||r===R?r=D:r===I||r===j?r=U:(r=D,n=void 0);const h=r===D&&t[e+1].startsWith("/>")?" ":"";s+=r===U?i+O:d>=0?(o.push(a),i.slice(0,d)+S+i.slice(d)+T+h):i+T+(-2===d?e:h)}return[q(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[c,d]=K(t,e);if(this.el=J.createElement(c,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=d[s++],i=o.getAttribute(t).split(T),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:n}),o.removeAttribute(t));if(F.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],P()),Y.nextNode(),a.push({type:2,index:++n});o.append(t[e],P())}}}else if(8===o.nodeType)if(o.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)a.push({type:7,index:n}),t+=T.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,o){if(e===B)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=N(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);Y.currentNode=o;let n=Y.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(n=Y.nextNode(),s++)}return Y.currentNode=M,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Z(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Z(this,o[i+r],e,r),a===B&&(a=this._$AH[r]),s||=!N(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends tt{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??G)===B)return;const i=this._$AH,o=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==G&&(i===G||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(J,X),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new X(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},lt=(t=dt,e,i)=>{const{kind:o,metadata:n}=i;let s=globalThis.litPropertyMetadata.get(n);if(void 0===s&&globalThis.litPropertyMetadata.set(n,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,n,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];e.call(this,i),this.requestUpdate(o,n,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ht(t){return function(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}({...t,state:!0,attribute:!1})}const pt=r`
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

  .icon-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .icon-wrapper.toggleable {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .toggle-badge {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--card-background-color, #1c1c1c);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .toggle-badge ha-icon {
    --mdc-icon-size: 14px;
  }

  .toggle-badge.on {
    color: var(--primary-color, #03a9f4);
  }

  .toggle-badge.off {
    color: rgba(var(--dira-rgb-text), 0.3);
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
    padding: 0;
    gap: 0;
    overflow-x: auto;
    overflow: hidden;
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
    border-radius: var(--dira-radius-button);
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
    --mdc-icon-size: 20px;
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

  /* Secondary controls (fan, preset, swing) — smaller than HVAC */
  .segmented-control.secondary .segment {
    padding: 7px 6px;
    font-size: 12px;
    min-height: 34px;
    box-sizing: border-box;
  }

  .segmented-control.secondary .segment ha-icon {
    --mdc-icon-size: 18px;
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
`,ut={en:{"card.target":"Target","card.current":"Current","card.state":"State","card.hvac_modes":"Mode","card.fan_modes":"Fan","card.swing_modes":"Swing","card.preset_modes":"Preset","card.unavailable":"Unavailable","card.not_found":"Entity not found","card.low":"Low","card.high":"High","mode.off":"Off","mode.heat":"Heat","mode.cool":"Cool","mode.auto":"Auto","mode.dry":"Dry","mode.fan_only":"Fan","mode.heat_cool":"Auto","mode.unavailable":"Unavailable","action.off":"Off","action.heating":"Heating","action.cooling":"Cooling","action.drying":"Drying","action.idle":"Idle","action.fan":"Fan","editor.entity":"Entity","editor.name":"Name (optional)","editor.icon":"Icon (optional)","editor.step_size":"Step size","editor.min_temp":"Min temperature (optional)","editor.max_temp":"Max temperature (optional)","editor.decimals":"Decimals","editor.unit":"Unit","editor.unit_auto":"Auto (from entity)","editor.compact":"Compact mode (expand on click)","editor.show_header":"Show header","editor.show_fan":"Show fan mode","editor.show_fan_icons":"Show fan mode icons","editor.show_preset":"Show preset mode","editor.show_swing":"Show swing mode","editor.show_fan_speed":"Show fan speed in header","editor.show_action":"Show current action","editor.hide_temp":"Hide temperature","editor.hide_state":"Hide sensors","editor.toggle_entity":"Toggle entity (optional)"},es:{"card.target":"Objetivo","card.current":"Actual","card.state":"Estado","card.hvac_modes":"Modo","card.fan_modes":"Ventilador","card.swing_modes":"Oscilacion","card.preset_modes":"Preajuste","card.unavailable":"No disponible","card.not_found":"Entidad no encontrada","card.low":"Min","card.high":"Max","mode.off":"Apagado","mode.heat":"Calor","mode.cool":"Frio","mode.auto":"Auto","mode.dry":"Seco","mode.fan_only":"Ventilador","mode.heat_cool":"Auto","mode.unavailable":"No disponible","action.off":"Apagado","action.heating":"Calentando","action.cooling":"Enfriando","action.drying":"Secando","action.idle":"Inactivo","action.fan":"Ventilando","editor.entity":"Entidad","editor.name":"Nombre (opcional)","editor.icon":"Icono (opcional)","editor.step_size":"Incremento","editor.min_temp":"Temperatura minima (opcional)","editor.max_temp":"Temperatura maxima (opcional)","editor.decimals":"Decimales","editor.unit":"Unidad","editor.unit_auto":"Auto (segun entidad)","editor.compact":"Modo compacto (expandir al tocar)","editor.show_header":"Mostrar encabezado","editor.show_fan":"Mostrar modo ventilador","editor.show_fan_icons":"Mostrar iconos del ventilador","editor.show_preset":"Mostrar preajuste","editor.show_swing":"Mostrar oscilacion","editor.show_fan_speed":"Mostrar velocidad en encabezado","editor.show_action":"Mostrar accion actual","editor.hide_temp":"Ocultar temperatura","editor.hide_state":"Ocultar sensores","editor.toggle_entity":"Entidad toggle (opcional)"}};function ft(t,e="en"){const i=e.substring(0,2);return ut[i]?.[t]??ut.en?.[t]??t}var gt,mt;!function(t){t.OFF="off",t.HEAT="heat",t.COOL="cool",t.HEAT_COOL="heat_cool",t.AUTO="auto",t.DRY="dry",t.FAN_ONLY="fan_only"}(gt||(gt={})),function(t){t.OFF="off",t.HEATING="heating",t.COOLING="cooling",t.DRYING="drying",t.IDLE="idle",t.FAN="fan"}(mt||(mt={}));const _t={[gt.HEAT]:"#ff8100",[gt.COOL]:"#2b9af9",[gt.AUTO]:"#4caf50",[gt.HEAT_COOL]:"#4caf50",[gt.DRY]:"#efbd07",[gt.FAN_ONLY]:"#8a8a8a",[gt.OFF]:"#8a8a8a"};function vt(t,e){return e?.[t]??_t[t]??"#8a8a8a"}function $t(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?`${parseInt(e[1],16)}, ${parseInt(e[2],16)}, ${parseInt(e[3],16)}`:"138, 138, 138"}mt.HEATING,mt.COOLING,mt.DRYING,mt.IDLE,mt.FAN,mt.OFF;const yt={[gt.OFF]:"mdi:power",[gt.HEAT]:"mdi:fire",[gt.COOL]:"mdi:snowflake",[gt.HEAT_COOL]:"mdi:autorenew",[gt.AUTO]:"mdi:autorenew",[gt.DRY]:"mdi:water-percent",[gt.FAN_ONLY]:"mdi:fan"};mt.HEATING,mt.COOLING,mt.DRYING,mt.IDLE,mt.FAN,mt.OFF;const bt={auto:"mdi:fan-auto",low:"mdi:fan-speed-1",medium:"mdi:fan-speed-2","medium-low":"mdi:fan-speed-1","medium-high":"mdi:fan-speed-2",high:"mdi:fan-speed-3",on:"mdi:fan",off:"mdi:fan-off",diffuse:"mdi:weather-windy"},wt={on:"mdi:arrow-oscillating",off:"mdi:arrow-oscillating-off",both:"mdi:arrow-oscillating",vertical:"mdi:arrow-up-down",horizontal:"mdi:arrow-left-right"},xt={none:"mdi:cancel",home:"mdi:home",away:"mdi:account-arrow-right",boost:"mdi:rocket-launch",comfort:"mdi:sofa",eco:"mdi:leaf",sleep:"mdi:bed",activity:"mdi:motion-sensor"};function At(t){return yt[t]??"mdi:thermostat"}function Ct(t,e=1,i="N/A"){return null==t||isNaN(t)?i:Number(t).toFixed(e)}function Et(t,e,i,o){const n=new CustomEvent(e,{bubbles:!0,composed:!0,cancelable:!1,detail:i});t.dispatchEvent(n)}function St(t,e="light"){Et(t,"haptic",e)}function Tt(t,e){Et(t,"hass-more-info",{entityId:e})}const kt={hvac:{type:"hvac",attributeModes:"hvac_modes",attributeActive:"__state__",headingKey:"card.hvac_modes",getIcon:At,getColor:vt},fan:{type:"fan",attributeModes:"fan_modes",attributeActive:"fan_mode",headingKey:"card.fan_modes",getIcon:function(t){return bt[t.toLowerCase()]??"mdi:fan"},getColor:(t,e)=>e?.fan??"var(--primary-color)"},preset:{type:"preset",attributeModes:"preset_modes",attributeActive:"preset_mode",headingKey:"card.preset_modes",getIcon:function(t){return xt[t.toLowerCase()]??"mdi:tune"},getColor:(t,e)=>e?.preset??"#b39ddb"},swing:{type:"swing",attributeModes:"swing_modes",attributeActive:"swing_mode",headingKey:"card.swing_modes",getIcon:function(t){return wt[t.toLowerCase()]??"mdi:arrow-oscillating"},getColor:(t,e)=>e?.swing??"#ffb74d"}},Ot=["off","heat","cool","heat_cool","auto","dry","fan_only"];function Mt(t,e,i,o,n){if(!1===o)return G;const s=t.language??"en",r=[];for(const a of["hvac","fan","preset","swing"]){const c=o[a];if(!1===c||void 0===c)continue;const d=kt[a],l="hvac"===a?i.layout?.hvac??i.layout?.mode:i.layout?.[a],h=Pt(t,e,i,d,c,s,!1!==l?.names,!1!==l?.icons,!0===l?.headings,t=>n(a,t));h!==G&&r.push(h)}return 0===r.length?G:V`${r}`}function Pt(t,e,i,o,n,s,r,a,c,d){const l=e.attributes[o.attributeModes]??[];if(0===l.length)return G;if(("object"==typeof n&&void 0!==n._hide_when_off?n._hide_when_off:"hvac"!==o.type)&&("off"===e.state||"unavailable"===e.state))return G;const h="__state__"===o.attributeActive?e.state:e.attributes[o.attributeActive]??"",p="object"==typeof n&&n._name?n._name:ft(o.headingKey,s);let u;const f="object"==typeof n&&Object.keys(n).some(t=>!t.startsWith("_"));if(f){const t=Object.keys(n).filter(t=>!t.startsWith("_")),e=t.filter(t=>l.includes(t)),i=l.filter(e=>!t.includes(e));u=[...e,...i]}else u=[...l],"hvac"===o.type&&u.sort((t,e)=>(-1!==Ot.indexOf(t)?Ot.indexOf(t):99)-(-1!==Ot.indexOf(e)?Ot.indexOf(e):99));const g=[];for(const t of u){let e;if("object"==typeof n){const i=n[t];if(!1===i||"object"==typeof i&&!1===i?.include)continue;"object"==typeof i&&(e=i)}const r=void 0!==e?.name&&!1!==e.name?e.name:ft(`mode.${t}`,s)!==`mode.${t}`?ft(`mode.${t}`,s):t.replace(/_/g," "),a=void 0!==e?.icon&&!1!==e.icon?e.icon:o.getIcon(t),c=o.getColor(t,i.colors);g.push({value:t,name:r,icon:a,color:c})}return 0===g.length?G:V`
    <div class="mode-section">
      ${c?V`<div class="mode-heading">${p}</div>`:G}
      <div class="segmented-control ${"hvac"!==o.type?"secondary":""}">
        ${g.map(t=>{const e=t.value===h;$t(t.color);const i=e?`background-color: ${t.color}; color: var(--text-primary-color, #fff);`:"";return V`
            <button
              class="segment ${e?"active":""}"
              style="${i}"
              @click=${()=>d(t.value)}
              title=${t.name}
            >
              ${a?V`<ha-icon .icon=${t.icon}></ha-icon>`:G}
              ${r?V`<span class="segment-label">${t.name}</span>`:G}
            </button>
          `})}
      </div>
    </div>
  `}function Nt(t,e,i,o){if(!1===o.sensors||!o.sensors||0===o.sensors.length)return G;const n=o.layout?.sensors??{},s="table"===n.type,r=!1!==n.labels,a=o.sensors.map(o=>function(t,e,i,o,n){const s=o.entity??i.entity_id,r=e.states[s];if(!r)return G;let a,c;if(o.attribute)a=r.attributes[o.attribute];else{if(!o.entity)return G;a=r.state}if(null==a)return G;if("relativetime"===o.type){c=function(t){const e=Date.now(),i=Math.floor((e-t.getTime())/1e3);return i<60?`${i}s`:i<3600?`${Math.floor(i/60)}m`:i<86400?`${Math.floor(i/3600)}h`:`${Math.floor(i/86400)}d`}(new Date(a))}else c=void 0!==o.decimals&&"number"==typeof a?Ct(a,o.decimals):String(a);const d=o.unit??(o.attribute?"":r.attributes.unit_of_measurement??""),l=o.name??(o.attribute?o.attribute.replace(/_/g," "):r.attributes.friendly_name??s);return V`
    <div
      class="sensor-item"
      @click=${()=>Tt(t,s)}
    >
      ${o.icon?V`<ha-icon .icon=${o.icon}></ha-icon>`:G}
      ${n&&!o.icon?V`<span class="sensor-label">${l}:</span>`:G}
      <span class="sensor-value">${c}${d?` ${d}`:""}</span>
    </div>
  `}(t,e,i,o,r)).filter(t=>t!==G);return 0===a.length?G:V`
    <div class="sensors ${s?"table":""}">
      ${a}
    </div>
  `}class Ht extends at{constructor(){super(...arguments),this._expanded=!1,this._pendingValues={},this._longPressFired=!1,this._debouncedCallService=function(t,e){let i;const o=(...o)=>{void 0!==i&&clearTimeout(i),i=setTimeout(()=>{i=void 0,t(...o)},e)};return o.cancel=()=>{void 0!==i&&(clearTimeout(i),i=void 0)},o}(t=>{const e=this._config.service,i=e?.domain??"climate",o=e?.service??"set_temperature";this._hass.callService(i,o,{entity_id:this._config.entity,...t,...e?.data??{}}).then(()=>{this._pendingValues={}}).catch(()=>{this._pendingValues={}})},500),this._normalizedControl="auto",this._onPointerDown=()=>{this._longPressFired=!1,this._longPressTimer=setTimeout(()=>{this._longPressFired=!0,St(this,"light")},500)},this._onPointerUp=()=>{clearTimeout(this._longPressTimer),this._longPressFired?Tt(this,this._config.entity):this._config.popup&&(this._expanded?this._collapse():this._expand())},this._onPointerCancel=()=>{clearTimeout(this._longPressTimer)}}static get styles(){return pt}static getConfigElement(){return document.createElement("dira-thermostat-editor")}static getStubConfig(){return{entity:""}}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t.entity)throw new Error("You must define an entity");this._normalizedControl=this._normalizeControl(t.control),this._config=t}getCardSize(){return this._config?.popup?2:4}_normalizeControl(t){if(!1===t)return!1;if(null==t)return"auto";if(Array.isArray(t)){const e={};return t.forEach(t=>{e[t]=!0}),e}return t}_getEffectiveControl(t){const e=this._normalizedControl;if(!1===e)return!1;const i={hvac:!0};return t.attributes.fan_modes?.length>0&&(i.fan=!0),t.attributes.preset_modes?.length>0&&(i.preset=!0),t.attributes.swing_modes?.length>0&&(i.swing=!0),"auto"===e?i:{...i,...e}}_getMinMax(t){return[this._config.min_temp??t.attributes.min_temp??7,this._config.max_temp??t.attributes.max_temp??35]}_snapToGrid(t,e,i,o){const n=(t-i)/e,s=(o>0?Math.floor(n+1e-6):Math.ceil(n-1e-6))+o;return Math.round(100*(i+s*e))/100}_getTemperatureCallbacks(){const t=this._hass.states[this._config.entity];if(!t)return{onIncrement:()=>{},onDecrement:()=>{}};const e=this._config.step_size??t.attributes.target_temp_step??.5,[i]=this._getMinMax(t);return{onIncrement:o=>{const n=this._pendingValues[o]??t.attributes[o];if(void 0===n)return;const s=this._snapToGrid(Number(n),e,i,1);this._setPendingTemperature(o,s,t)},onDecrement:o=>{const n=this._pendingValues[o]??t.attributes[o];if(void 0===n)return;const s=this._snapToGrid(Number(n),e,i,-1);this._setPendingTemperature(o,s,t)}}}_setPendingTemperature(t,e,i){const[o,n]=this._getMinMax(i),s=Math.max(o,Math.min(n,e));if(this._pendingValues={...this._pendingValues,[t]:s},function(t){const e=t.attributes;return"number"==typeof e.target_temp_low&&"number"==typeof e.target_temp_high}(i)){const t={target_temp_low:this._pendingValues.target_temp_low??i.attributes.target_temp_low,target_temp_high:this._pendingValues.target_temp_high??i.attributes.target_temp_high};this._debouncedCallService(t)}else this._debouncedCallService({[t]:s});St(this,"light"),this._resetCollapseTimer()}_expand(){this._expanded=!0,this._resetCollapseTimer()}_collapse(){this._expanded=!1,this._clearCollapseTimer()}_resetCollapseTimer(){this._clearCollapseTimer(),this._collapseTimer=setTimeout(()=>{this._expanded=!1},1e4)}_clearCollapseTimer(){void 0!==this._collapseTimer&&(clearTimeout(this._collapseTimer),this._collapseTimer=void 0)}disconnectedCallback(){super.disconnectedCallback(),this._clearCollapseTimer(),clearTimeout(this._longPressTimer),this._expanded=!1}_onModeSelect(t,e){this._resetCollapseTimer();const[i,o,n]={hvac:["climate","set_hvac_mode","hvac_mode"],fan:["climate","set_fan_mode","fan_mode"],preset:["climate","set_preset_mode","preset_mode"],swing:["climate","set_swing_mode","swing_mode"]}[t];this._hass.callService(i,o,{entity_id:this._config.entity,[n]:e}).then(()=>St(this,"light")).catch(()=>St(this,"failure"))}_resolveStatValue(t,e){let i;if(e.entity){const t=this._hass.states[e.entity];if(!t)return null;i=e.attribute?t.attributes[e.attribute]:t.state}else{if(!e.attribute)return null;i=t.attributes[e.attribute]}if(null==i)return null;const o=Number(i);return isNaN(o)||void 0===e.decimals?`${i}${e.unit?` ${e.unit}`:""}`:`${Ct(o,e.decimals)}${e.unit?` ${e.unit}`:""}`}render(){if(!this._hass||!this._config)return G;const t=this._hass.states[this._config.entity];if(!t)return V`
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
                  ${Mt(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
                  ${Nt(this,this._hass,t,this._config)}
                </div>
              `:G}
        </ha-card>
      `}const e=this._getEffectiveControl(t);return V`
      <ha-card>
        ${!1!==this._config.header?this._renderCompact(t):G}
        ${Mt(this._hass,t,this._config,e,(t,e)=>this._onModeSelect(t,e))}
        ${Nt(this,this._hass,t,this._config)}
      </ha-card>
    `}_renderCompact(t){const e="object"==typeof this._config.header?this._config.header:{},i=function(t,e){return e||(t.attributes.friendly_name??t.entity_id)}(t,(!1!==e.name?e.name:void 0)??this._config.name),o=t.state,n=this._hass.language??"en",s=vt(o,this._config.colors),r=$t(s),a="off"===o||"unavailable"===o,c=a||"fan_only"===o||!0===this._config.hide?.temperature,d=this._config.icon??e.icon??At(o),l=ft(`mode.${o}`,n),h=t.attributes.hvac_action,p=h?ft(`action.${h}`,n):"";let u=l;this._config.show_action&&p&&"off"!==h&&(u=`${l} · ${p}`);const f=t.attributes.fan_mode;this._config.show_fan_speed&&f&&!a&&(u=`${u} · ${f}`);const g=function(t,e){return!1===e?"":"string"==typeof e?e:t.attributes.unit_of_measurement??"°C"}(t,this._config.unit),m=this._config.decimals??1,_=[];if(!0!==this._config.hide?.state&&!1!==e.stats)if(e.stats&&e.stats.length>0)for(const i of e.stats){const e=this._resolveStatValue(t,i);null!==e&&_.push(e)}else{const e=t.attributes.current_temperature,i=t.attributes.current_humidity;null!=e&&_.push(`${Ct(e,m)} ${g}`),null!=i&&_.push(`${Math.round(i)}%`)}const v=this._pendingValues.temperature??t.attributes.temperature,$=void 0!==this._pendingValues.temperature,[y,b]=this._getMinMax(t),w=this._getTemperatureCallbacks(),x=!1!==d&&!1!==e.icon,A=a||!x?"":`background-color: rgba(${r}, 0.2)`,C=a?"":`color: ${s}`,E=!c&&void 0!==v;return V`
      <div class="compact">
        <div
          class="compact-left"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
        >
          ${x?V`
                <div
                  class="icon-wrapper ${e.toggle?.entity?"toggleable":""}"
                  @click=${e.toggle?.entity?t=>{t.stopPropagation(),this._handleToggle(e)}:G}
                >
                  <div class="icon-shape" style="${A}">
                    <ha-icon .icon=${d} style="${C}"></ha-icon>
                  </div>
                  ${this._renderToggleBadge(e)}
                </div>
              `:G}
          <div class="info">
            ${!1!==e.name?V`<div class="name">${i}</div>`:G}
            <div class="secondary">
              ${u}
              ${_.length>0?V` <span class="stats">\u00b7 ${_.join(" · ")}</span>`:G}
            </div>
          </div>
        </div>
        <div class="compact-right">
          ${this._renderFaults(e)}
          ${E?V`
                <div class="compact-controls">
                  <button
                    class="temp-button"
                    @click=${t=>{t.stopPropagation(),w.onDecrement("temperature")}}
                    ?disabled=${v<=y}
                  >
                    <ha-icon .icon=${"mdi:minus"}></ha-icon>
                  </button>
                  <div class="compact-temp ${$?"updating":""}">
                    ${Ct(v,m)}
                    <span class="unit">${g}</span>
                  </div>
                  <button
                    class="temp-button"
                    @click=${t=>{t.stopPropagation(),w.onIncrement("temperature")}}
                    ?disabled=${v>=b}
                  >
                    <ha-icon .icon=${"mdi:plus"}></ha-icon>
                  </button>
                </div>
              `:G}
        </div>
      </div>
    `}_handleToggle(t){const e=t.toggle;if(!e?.entity)return;const i=this._hass.states[e.entity];if(!i)return;const o="on"===i.state;this._hass.callService("homeassistant",o?"turn_off":"turn_on",{entity_id:e.entity}),St(this,"light")}_renderToggleBadge(t){const e=t.toggle;if(!e?.entity)return G;const i=this._hass.states[e.entity];if(!i)return G;const o="on"===i.state,n=o?e.icon_on??"mdi:numeric":e.icon_off??"mdi:numeric-off";return V`
      <div class="toggle-badge ${o?"on":"off"}">
        <ha-icon .icon=${n}></ha-icon>
      </div>
    `}_renderFaults(t){const e=t.faults;if(!e||0===e.length)return G;const i=e.map(t=>{const e=this._hass.states[t.entity];if(!e)return G;const i="on"===e.state;if(!i&&t.hide_inactive)return G;const o=t.icon??e.attributes.icon??"mdi:alert-circle";return V`
          <ha-icon
            class="fault-icon ${i?"active":"inactive"}"
            .icon=${o}
            @click=${e=>{e.stopPropagation(),Tt(this,t.entity)}}
          ></ha-icon>
        `}).filter(t=>t!==G);return 0===i.length?G:V`${i}`}updated(t){if(super.updated(t),t.has("_hass")&&Object.keys(this._pendingValues).length>0){const e=t.get("_hass");if(e){const t=e.states[this._config.entity],i=this._hass.states[this._config.entity];t&&i&&t.attributes.temperature!==i.attributes.temperature&&(this._pendingValues={})}}}}t([ht()],Ht.prototype,"_hass",void 0),t([ht()],Ht.prototype,"_config",void 0),t([ht()],Ht.prototype,"_expanded",void 0),t([ht()],Ht.prototype,"_pendingValues",void 0);class zt extends at{set hass(t){this._hass=t}setConfig(t){this._config={...t}}get _lang(){return this._hass?.language??"en"}_updateConfig(t){this._config={...this._config,...t},Et(this,"config-changed",{config:this._config})}_getControlBool(t){const e=this._config.control;return!1!==e&&(null==e||(Array.isArray(e)?e.includes(t):"object"!=typeof e||!1!==e[t]))}_setControlBool(t,e){let i=this._config.control,o={};"object"!=typeof i||null===i||Array.isArray(i)||(o={...i}),o[t]=!!e,this._updateConfig({control:o})}_getLayoutIcons(t){const e=this._config.layout?.[t];return!1!==e?.icons}_setLayoutIcons(t,e){const i={...this._config.layout??{}},o={...i[t]??{}};e?delete o.icons:o.icons=!1,Object.keys(o).length>0?i[t]=o:delete i[t],this._updateConfig({layout:Object.keys(i).length>0?i:void 0})}_getHeaderConfig(){return"object"==typeof this._config.header?this._config.header:{}}_updateHeader(t){const e=this._getHeaderConfig();this._updateConfig({header:{...e,...t}})}render(){if(!this._hass||!this._config)return V``;const t=this._lang,e=this._getHeaderConfig();return V`
      <div class="editor">
        <!-- Entity picker -->
        <ha-entity-picker
          .hass=${this._hass}
          .value=${this._config.entity??""}
          .includeDomains=${["climate"]}
          .label=${ft("editor.entity",t)}
          @value-changed=${t=>this._updateConfig({entity:t.detail.value})}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Name + Icon -->
        <div class="row">
          <ha-input
            .label=${ft("editor.name",t)}
            .value=${this._config.name??""}
            @input=${t=>this._updateConfig({name:t.target.value||void 0})}
          ></ha-input>

          <ha-icon-picker
            .hass=${this._hass}
            .value=${this._config.icon??""}
            .label=${ft("editor.icon",t)}
            @value-changed=${t=>this._updateConfig({icon:t.detail.value||void 0})}
          ></ha-icon-picker>
        </div>

        <!-- Step size + Decimals -->
        <div class="row">
          <ha-input
            .label=${ft("editor.step_size",t)}
            .type=${"number"}
            .value=${String(this._config.step_size??.5)}
            @input=${t=>{const e=parseFloat(t.target.value);!isNaN(e)&&e>0&&this._updateConfig({step_size:e})}}
          ></ha-input>

          <ha-input
            .label=${ft("editor.decimals",t)}
            .type=${"number"}
            .value=${String(this._config.decimals??1)}
            @input=${t=>{const e=parseInt(t.target.value,10);!isNaN(e)&&e>=0&&e<=3&&this._updateConfig({decimals:e})}}
          ></ha-input>
        </div>

        <!-- Unit override -->
        <div class="field">
          <label class="field-label">${ft("editor.unit",t)}</label>
          <select
            class="native-select"
            .value=${"string"==typeof this._config.unit?this._config.unit:"auto"}
            @change=${t=>{const e=t.target.value;this._updateConfig({unit:"auto"===e?void 0:e})}}
          >
            <option value="auto">${ft("editor.unit_auto",t)}</option>
            <option value="°C">°C</option>
            <option value="°F">°F</option>
          </select>
        </div>

        <!-- Min / Max temperature overrides -->
        <div class="row">
          <ha-input
            .label=${ft("editor.min_temp",t)}
            .type=${"number"}
            .value=${String(this._config.min_temp??"")}
            @input=${t=>{const e=t.target.value,i=parseFloat(e);this._updateConfig({min_temp:""===e||isNaN(i)?void 0:i})}}
          ></ha-input>

          <ha-input
            .label=${ft("editor.max_temp",t)}
            .type=${"number"}
            .value=${String(this._config.max_temp??"")}
            @input=${t=>{const e=t.target.value,i=parseFloat(e);this._updateConfig({max_temp:""===e||isNaN(i)?void 0:i})}}
          ></ha-input>
        </div>

        <!-- Toggle entity -->
        <ha-entity-picker
          .hass=${this._hass}
          .value=${e.toggle?.entity??""}
          .includeDomains=${["switch","light","input_boolean"]}
          .label=${ft("editor.toggle_entity",t)}
          @value-changed=${t=>{const i=t.detail.value;if(i)this._updateHeader({toggle:{...e.toggle,entity:i}});else{const{toggle:t,...e}=this._getHeaderConfig();this._updateConfig({header:Object.keys(e).length>0?e:void 0})}}}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Switches section -->
        <div class="switches">
          <ha-formfield .label=${ft("editor.compact",t)}>
            <ha-switch
              .checked=${this._config.popup??!1}
              @change=${t=>this._updateConfig({popup:t.target.checked||void 0})}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_header",t)}>
            <ha-switch
              .checked=${!1!==this._config.header}
              @change=${t=>this._updateConfig({header:!!t.target.checked&&{}})}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_fan",t)}>
            <ha-switch
              .checked=${this._getControlBool("fan")}
              @change=${t=>this._setControlBool("fan",t.target.checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_fan_icons",t)}>
            <ha-switch
              .checked=${this._getLayoutIcons("fan")}
              @change=${t=>this._setLayoutIcons("fan",t.target.checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_preset",t)}>
            <ha-switch
              .checked=${this._getControlBool("preset")}
              @change=${t=>this._setControlBool("preset",t.target.checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_swing",t)}>
            <ha-switch
              .checked=${this._getControlBool("swing")}
              @change=${t=>this._setControlBool("swing",t.target.checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_fan_speed",t)}>
            <ha-switch
              .checked=${this._config.show_fan_speed??!1}
              @change=${t=>this._updateConfig({show_fan_speed:t.target.checked||void 0})}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.show_action",t)}>
            <ha-switch
              .checked=${this._config.show_action??!1}
              @change=${t=>this._updateConfig({show_action:t.target.checked||void 0})}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.hide_temp",t)}>
            <ha-switch
              .checked=${this._config.hide?.temperature??!1}
              @change=${t=>this._updateConfig({hide:{...this._config.hide,temperature:t.target.checked||void 0}})}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${ft("editor.hide_state",t)}>
            <ha-switch
              .checked=${this._config.hide?.state??!1}
              @change=${t=>this._updateConfig({hide:{...this._config.hide,state:t.target.checked||void 0}})}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `}static get styles(){return r`
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
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .native-select {
        font: inherit;
        color: var(--primary-text-color);
        background: transparent;
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.2));
        border-radius: 4px;
        padding: 8px;
        height: 40px;
      }
      .native-select option {
        color: initial;
      }
      .switches {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }
      ha-formfield {
        display: flex;
        align-items: center;
        --mdc-theme-secondary: var(--primary-color);
      }
    `}}t([ht()],zt.prototype,"_hass",void 0),t([ht()],zt.prototype,"_config",void 0),customElements.define("dira-thermostat",Ht),customElements.define("dira-thermostat-editor",zt),window.customCards=window.customCards||[],window.customCards.push({type:"dira-thermostat",name:"Dira Thermostat",description:"A modern thermostat card with Mushroom-style design and full climate control",preview:!0,documentationURL:"https://github.com/DiraSmart/dira-thermostat"}),console.info("%c DIRA-THERMOSTAT %c v1.0.0 ","color: white; background: #ff8100; font-weight: 700; padding: 2px 8px; border-radius: 4px 0 0 4px;","color: #ff8100; background: #fff3e0; font-weight: 700; padding: 2px 8px; border-radius: 0 4px 4px 0;")}();
