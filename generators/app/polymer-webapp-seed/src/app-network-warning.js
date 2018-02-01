import { Element as PolymerElement, html} from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import './app-icons.js';

class AppNetworkWarning extends PolymerElement {
  static get template() {
    return html`
    <style>

      :host {
        display: block;
        padding: 40px 20px;
        text-align: center;
        color: var(--app-secondary-color);
      }

      iron-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
      }

      h1 {
        margin: 50px 0 10px 0;
        font-weight: 300;
      }

      p {
        margin: 0;
      }

    </style>

    <div hidden\$="[[offline]]">
      <h1>Couldn't reach the server</h1>
    </div>
    <div hidden\$="[[!offline]]">
      <iron-icon icon="perm-scan-wifi"></iron-icon>
      <h1>No internet connection</h1>
      <p>Check if your device is connected to a mobile network or WiFi.</p>
    </div>
`;
  }

  static get is() { return 'app-network-warning'; }

  static get properties() { return {
    offline: Boolean
  }}

  _tryReconnect() {
    this.dispatchEvent(new CustomEvent('try-reconnect', {composed: true}));
  }
}

customElements.define(AppNetworkWarning.is, AppNetworkWarning);