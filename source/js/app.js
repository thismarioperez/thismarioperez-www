/*******************************************************************************
 * Main Stylesheet
 ******************************************************************************/
require('../sass/app.scss');

/*******************************************************************************
 * Polyfills
 ******************************************************************************/
require('./polyfill');

/*******************************************************************************
 * Font Awesome
 ******************************************************************************/
require('@fortawesome/fontawesome-free/js/fontawesome');
require('@fortawesome/fontawesome-free/js/brands');
require('@fortawesome/fontawesome-free/js/solid');

/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
import * as core from './core';
import fonts from './fonts';
import intro from './intro';
import contact from './contact';
import analytics from './analytics';
import page from './page';

class App {
  constructor() {
    this.core = core;
    this.fonts = fonts;
    this.intro = intro;
    this.contact = contact;
    this.analytics = analytics;
    this.page = page;

    this.init();

  }

  /**
   *
   * @public
   * @instance
   * @method init
   * @memberof App
   * @description Initialize modules.
   *
   */
  init() {
    // Log environment
    this.core.log(`App: environment is ${this.core.env.ENV}`);

    // core
    this.core.detect.init(this);

    // utility
    this.fonts.init(this);

    // modules
    this.intro.init(this);
    this.contact.init(this);
    this.analytics.init(this);
    this.page.init(this);

    // fire start of intro on init
    this.core.emitter.emit('app--intro-exec');
    this.core.log('App: initialized');
  }
}

/*******************************************************************************
 * Expose
 ******************************************************************************/
window.app = new App();

/*******************************************************************************
 * Export
 ******************************************************************************/
export default window.app;