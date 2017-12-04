import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import './app-ripple-container.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="app-tab">
  <template strip-whitespace="">
    <style>
      [hidden] {
        display: none !important;
      }

      :host {
        display: inline-block;
        position: relative;
      }

      #overlay {
        pointer-events: none;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        @apply --app-tab-overlay;
      }

      :host(.app-tabs-overlay-static-above) #overlay {
        display: block;
      }
    </style>
    <div id="overlay"></div>
    <app-ripple-container>
      <slot></slot>
    </app-ripple-container>
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer);
class AppTab extends Element {
  static get is() { return 'app-tab'; }
}

customElements.define(AppTab.is, AppTab);