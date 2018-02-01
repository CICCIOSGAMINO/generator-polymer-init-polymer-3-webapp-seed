import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import './app-image.js';

class AppHome extends PolymerElement {
  static get template() {
    return html`
    <style>

      :host {
        width: 250px;
        height: 250px;
        background-color: red;
      }

    </style>

    <h1>App Home </h1>
`;
  }

  static get is() { return 'app-home'; }

  static get properties() { 
    return {}
  }

}

customElements.define(AppHome.is, AppHome);