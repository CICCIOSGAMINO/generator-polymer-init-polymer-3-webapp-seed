/* 
@license
Copyright (c) 2017 @cicciosgamino Author. All rights reserved.
This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt

Attention  > Polymer 3.0 Preview in USE ! */ 

import {Element as PolymerElement} 
from "../node_modules/@polymer/polymer/polymer-element.js";
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import { scroll } from '../node_modules/@polymer/app-layout/helpers/helpers.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import '../node_modules/@polymer/iron-media-query/iron-media-query.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-selector/iron-selector.js';

import { afterNextRender } from '../node_modules/@polymer/polymer/lib/utils/render-status.js';
import { timeOut } from '../node_modules/@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '../node_modules/@polymer/polymer/lib/utils/debounce.js';

// performance logging
window.performance && performance.mark && performance.mark('<%= appNameTag %> - before register');

export class <%= className %> extends PolymerElement {

  static get is() { return '<%= appNameTag %>' }

  static get template() {
    return `
    <style>

      :host {
        display: block;
        position: relative;
        padding-top: 130px;
        padding-bottom: 64px;
        min-height: 100vh;
        --app-primary-color: #202020;
        --app-secondary-color: #757575;
        --app-accent-color: #172C50;
        --paper-button-ink-color: var(--app-accent-color);
        --paper-icon-button-ink-color: var(--app-accent-color);
        --paper-spinner-color: var(--app-accent-color);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: var(--app-primary-color);
      }

      app-header {
        @apply --layout-fixed-top;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.95);
        --app-header-shadow: {
          box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.2);
          height: 10px;
          bottom: -10px;
        };
      }

      paper-icon-button {
        color: var(--app-primary-color);
      }

      .logo {
        text-align: center;
      }

      .logo a {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.3em;
        color: var(--app-primary-color);
        text-decoration: none;
        /* required for IE 11, so this <a> can receive pointer events */
        display: inline-block;
        pointer-events: auto;
      }

      .left-bar-item {
        width: 40px;
      }

      .menu-btn {
        display: none;
      }

      .cart-btn-container {
        position: relative;
        width: 40px;
      }

      .announcer {
        position: fixed;
        height: 0;
        overflow: hidden;
      }

      :host(:not([page=detail])) .back-btn {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      #tabContainer {
        position: relative;
        height: 66px;
      }

      app-tabs, app-tab {
        --app-tab-overlay: {
          border-bottom: 2px solid var(--app-accent-color);
        };
      }

      app-tabs {
        height: 100%;
      }

      app-tab {
        margin: 0 10px;
      }

      app-tab a {
        display: inline-block;
        outline: none;
        padding: 9px 5px;
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        color: var(--app-primary-color);
      }

      .cart-badge {
        position: absolute;
        top: -2px;
        right: 0;
        width: 20px;
        height: 20px;
        background-color: var(--app-accent-color);
        border-radius: 50%;
        color: white;
        font-size: 12px;
        font-weight: 500;
        pointer-events: none;
        @apply --layout-vertical;
        @apply --layout-center-center;
      }

      .drawer-list {
        margin: 0 20px;
      }

      .drawer-list a {
        display: block;
        padding: 0 16px;
        line-height: 40px;
        text-decoration: none;
        color: var(--app-secondary-color);
      }

      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }

      shop-cart-modal {
        z-index: 2;
      }

      app-drawer {
        z-index: 3;
      }

      iron-pages {
        max-width: 1440px;
        margin: 0 auto;
      }

      footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        margin-top: 20px;
        line-height: 24px;
      }

      footer > a {
        color: var(--app-secondary-color);
        text-decoration: none;
      }

      footer > a:hover {
        text-decoration: underline;
      }

      .demo-label {
        box-sizing: border-box;
        width: 120px;
        padding: 6px;
        margin: 8px auto 0;
        background-color: var(--app-primary-color);
        color: white;
        text-transform: uppercase;
      }

      /* small screen */
      @media (max-width: 767px) {
        :host {
          padding-top: 64px;
        }

        .menu-btn {
          display: block;
        }

        :host([page=detail]) .menu-btn {
          display: none;
        }
      }

    </style>

    <shop-analytics key="UA-39334307-16"></shop-analytics>
    <!--
      app-location and app-route elements provide the state of the URL for the app.
    -->
    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <iron-media-query query="max-width: 767px" query-matches="{{smallScreen}}"></iron-media-query>

    <!--
      shop-category-data provides the list of categories.
    -->
    <shop-category-data categories="{{categories}}"></shop-category-data>

    <!--
      shop-cart-data maintains the state of the user's shopping cart (in localstorage) and
      calculates the total amount.
    -->
    <shop-cart-data id="cart" cart="{{cart}}" num-items="{{numItems}}" total="{{total}}"></shop-cart-data>

    <app-header role="navigation" id="header" effects="waterfall" condenses="" reveals="">
      <app-toolbar>
        <div class="left-bar-item">
          <paper-icon-button class="menu-btn" icon="menu" on-click="_toggleDrawer" aria-label="Categories">
          </paper-icon-button>
          <a class="back-btn" href="/list/[[categoryName]]" tabindex="-1">
            <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>
          </a>
        </div>
        <div class="logo" main-title=""><a href="/" aria-label="SHOP Home">SHOP</a></div>
        <div class="cart-btn-container">
          <a href="/cart" tabindex="-1">
            <paper-icon-button icon="shopping-cart" aria-label\$="Shopping cart: [[_computePluralizedQuantity(numItems)]]"></paper-icon-button>
          </a>
          <div class="cart-badge" aria-hidden="true" hidden\$="[[!numItems]]">[[numItems]]</div>
        </div>
      </app-toolbar>

      <!-- Lazy-create the tabs for larger screen sizes. -->
      <div id="tabContainer" sticky\$="[[_shouldShowTabs]]" hidden\$="[[!_shouldShowTabs]]">
        <dom-if if="[[_shouldRenderTabs]]">
          <template>
            <app-tabs selected="[[categoryName]]" attr-for-selected="name">
              <dom-repeat items="[[categories]]" as="category" initial-count="4">
                <template>
                <app-tab name="[[category.name]]">
                  <a href="/list/[[category.name]]">[[category.title]]</a>
                </app-tab>
                </template>
              </dom-repeat>
            </app-tabs>
          </template>
        </dom-if>
      </div>
    </app-header>

    <!-- Lazy-create the drawer for small screen sizes. -->
    <dom-if if="[[_shouldRenderDrawer]]">
      <template>
      <!-- Two-way bind \`drawerOpened\` since app-drawer can update \`opened\` itself. -->
      <app-drawer opened="{{drawerOpened}}" swipe-open="" tabindex="0">
        <iron-selector role="navigation" class="drawer-list" selected="[[categoryName]]" attr-for-selected="name">
          <dom-repeat items="[[categories]]" as="category" initial-count="4">
            <template>
              <a name="[[category.name]]" href="/list/[[category.name]]">[[category.title]]</a>
            </template>
          </dom-repeat>
        </iron-selector>
      </app-drawer>
      </template>
    </dom-if>

    <iron-pages role="main" selected="[[page]]" attr-for-selected="name" selected-attribute="visible" fallback-selection="404">
      <!-- home view -->
      <shop-home name="home" categories="[[categories]]"></shop-home>
      <!-- list view of items in a category -->
      <shop-list name="list" route="[[subroute]]" offline="[[offline]]"></shop-list>
      <!-- detail view of one item -->
      <shop-detail name="detail" route="[[subroute]]" offline="[[offline]]"></shop-detail>
      <!-- cart view -->
      <shop-cart name="cart" cart="[[cart]]" total="[[total]]"></shop-cart>
      <!-- checkout view -->
      <shop-checkout name="checkout" cart="[[cart]]" total="[[total]]" route="{{subroute}}"></shop-checkout>

      <app-404-warning name="404"></app-404-warning>
    </iron-pages>

    <footer>
      <a href="https://www.polymer-project.org/1.0/toolbox/">Made by Polymer</a>
      <div class="demo-label">Demo Only</div>
    </footer>

    <!-- a11y announcer -->
    <div class="announcer" aria-live="assertive">[[_a11yLabel]]</div>
    `;
  }

  // properties, observers, are identical to 2.x 
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },

      numItems: {
        type: Number,
        value: 0
      },

      _shouldShowTabs: {
        computed: '_computeShouldShowTabs(page,smallScreen)'
      },

      _shouldRenderTabs: {
        computed: '_computeShouldRenderTabs(_shouldShowTabs, loadComplete)'
      },

      _shouldRenderDrawer: {
        computed: '_computeShouldRenderDrawer(smallScreen, loadComplete)'
      }
  }}

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ]
  }

  constructor() {
    super();
    window.performance && performance.mark && performance.mark('ciccio-app.created');
  }

  ready() {
    super.ready();
    // Custom elements polyfill safe way to indicate an element has been upgraded.
    this.removeAttribute('unresolved');
    /*  listen for custom events */ 
    this.addEventListener('add-cart-item', (e)=>this._consoleEvent(e));
    this.addEventListener('set-cart-item', (e)=>this._consoleEvent(e));
    this.addEventListener('clear-cart', (e)=>this._consoleEvent(e));
    this.addEventListener('change-section', (e)=>this._consoleEvent(e));
    this.addEventListener('announce', (e)=>this._consoleEvent(e));
    this.addEventListener('dom-change', (e)=>this._consoleEvent(e));
    this.addEventListener('show-invalid-url-warning', (e)=>this._consoleEvent(e)); 
    // listen for online/offline
    afterNextRender(this, () => {
      window.addEventListener('online', (e)=>this._notifyNetworkStatus(e));
      window.addEventListener('offline', (e)=>this._notifyNetworkStatus(e));
    });
    
  }

  _routePageChanged(page) {
    this.page = page || 'home'
    // Close the drawer - in case the *route* change came from a link in the drawer.
    this.drawerOpened = false;
  }

  _pageChanged(page, oldPage) {
    if(page != null) {
      // home route is eagerly loaded 
      if(page == 'home') {
        this._pageLoaded(Boolean(oldPage))
      } else {
        // When a load failed, it triggered a 404 which means we need to 
        // eagerly load the 404 page definition 
        let cb = this._pageLoaded.bind(this, Boolean(oldPage))
        import('./page-' + page + '.js').then(cb)
      }
    }
  }

  _pageLoaded(shouldResetLayout) {
    this._ensureLazyLoaded();
    if (shouldResetLayout) {
      // The size of the header depends on the page (e.g. on some pages the tabs
      // do not appear), so reset the header's layout only when switching pages.
      timeOut.run(() => {
        this.$.header.resetLayout();
      }, 1);
    }
  }

  _ensureLazyLoaded() {
    // load lazy resources after render and set `loadComplete` when done.
    if (!this.loadComplete) {
      afterNextRender(this, () => {
        import('./lazy-resources.js').then(() => {
          // Register service worker if supported.
          if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('service-worker.js', {scope: '/'});
          }
          this._notifyNetworkStatus();
          this.loadComplete = true;
        });
      });
    }
  }

  _notifyNetworkStatus() {
    let oldOffline = this.offline;
    this.offline =  !navigator.onLine;
    // Show the snackbar if the user is offline when starting a new session
    // or if the network status changed.
    if (this.offline || (!this.offline && oldOffline === true)) {
      if (!this._networkSnackbar) {
        this._networkSnackbar = document.createElement('app-snackbar');
        this.root.appendChild(this._networkSnackbar);
      }
      this._networkSnackbar.innerHTML = this.offline ?
          'You are offline' : 'You are online';
      this._networkSnackbar.open();
    }
  }

  _toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  _onFallbackSelectionTriggered() {
    this.page = '404';
  }

  _computeShouldShowTabs(page, smallScreen) {
    return (page === 'home' || page === 'list' || page === 'detail') && !smallScreen;
  }

  _computeShouldRenderTabs(_shouldShowTabs, loadComplete) {
    return _shouldShowTabs && loadComplete;
  }

  _computeShouldRenderDrawer(smallScreen, loadComplete) {
    return smallScreen && loadComplete;
  }

  _computePluralizedQuantity(quantity) {
    return quantity + ' ' + (quantity === 1 ? 'item' : 'items');
  }

  _consoleEvent(e) {
    console.log(e)
  }


}
// Register custom element definition using standard platform API
customElements.define('<%= appNameTag %>', <%= className %>);

