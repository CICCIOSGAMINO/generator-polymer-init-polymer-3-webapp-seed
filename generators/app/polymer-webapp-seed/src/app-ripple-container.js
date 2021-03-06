import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import { PaperRippleBehavior } from '../node_modules/@polymer/paper-behaviors/paper-ripple-behavior.js';
import { addListener } from '../node_modules/@polymer/polymer/lib/utils/gestures.js';
import { mixinBehaviors } from '../node_modules/@polymer/polymer/lib/legacy/class.js';

const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = `<dom-module id="app-ripple-container">
  <template strip-whitespace="">
    <style>
      :host {
        display: inline-block;
        position: relative;
      }

      paper-ripple {
        color: var(--app-accent-color);
      }
    </style>
    <slot></slot>
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer);

class AppRippleContainer extends mixinBehaviors(
  [PaperRippleBehavior], Element) {

  static get is() { return 'app-ripple-container'; }

  constructor() {
    super();
    this._isDown = false;
  }

  ready() {
    super.ready();
    this.addEventListener('focus', (e)=>this._onFocus(e), true);
    this.addEventListener('blur', (e)=>this._onBlur(e), true);
    addListener(this, 'down', this._rippleDown);
    addListener(this, 'up', this._rippleUp);
  }

  _onFocus(event) {
    // Prevent second ripple when clicking causes both focus and down.
    if (!this._isDown) {
      this._rippleDown(event);
    }
  }

  _onBlur(event) {
    this._rippleUp(event);
  }

  _rippleDown(event) {
    this._isDown = true;
    this.getRipple().downAction(event);
  }

  _rippleUp(event) {
    this._isDown = false;
    this.getRipple().upAction(event);
  }

}

customElements.define(AppRippleContainer.is, AppRippleContainer);