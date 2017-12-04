import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import { IronSelectableBehavior } from '../node_modules/@polymer/iron-selector/iron-selectable.js';
import './app-tabs-overlay.js';
import { mixinBehaviors } from '../node_modules/@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="app-tabs">
  <template strip-whitespace="">
    <style>
      :host {
        @apply --layout;
        @apply --layout-center-center;
      }

      #container {
        position: relative;
      }

      app-tabs-overlay {
        @apply --app-tab-overlay;
      }
    </style>
    <div id="container">
      <app-tabs-overlay id="overlay"></app-tabs-overlay>
      <slot></slot>
    </div>
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer);

class AppTabs extends mixinBehaviors(
  [IronSelectableBehavior], Element) {

  static get is() { return 'app-tabs'; }

  static get observers() { return [
    '_onSelectedItemChanged(selectedItem)'
  ]}

  _onSelectedItemChanged(selectedItem) {
    if (selectedItem === undefined && this.selected) return;

    this.$.overlay.target = selectedItem;
  }
}

customElements.define(AppTabs.is, AppTabs);