import { Element as PolymerElement, html} from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import './menu-items.js';

class PageTwo extends PolymerElement {
  static get template() {
    return `
    <style>

      :host {
        display: block;
        text-align: center;
        color: var(--app-secondary-color);
      }

      iron-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
      }

      h1 {
        margin: 50px 0 50px 0;
        font-weight: 300;
      }

    </style>

    <menu-items items="{{items}}"></menu-items>

    <div>
      <iron-icon icon="home"></iron-icon>
      <h1>Page TWO - [[menuItem.title]]</h1>
      <img src="[[menuItem.image]]" alt="menuItem.title">
    </div>
`;
  }

  static get is() { return 'page-two'; }
  
  static get properties() {
    return {
      menuItem: {
        computed: '_computeMenuObject(items)'
      }
    }
  }

  _computeMenuObject(items) {
    return items[2] || {}
  }

}

customElements.define(PageTwo.is, PageTwo);