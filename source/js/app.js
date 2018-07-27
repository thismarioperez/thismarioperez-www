/*******************************************************************************
 * Main Stylesheet
 ******************************************************************************/
require('../sass/app.scss');

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

class App {
  constructor() {
    this.core = core;
    this.fonts = fonts;
    this.intro = intro;

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

    // fire teardown of intro on init
    this.core.emitter.emit('app--intro-teardown');
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