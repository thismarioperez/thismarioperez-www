import Screen from './class/Screen';
import * as core from './core';


/**
 *
 * @private
 * @member Intro
 * @memberof intro
 * @description Instance of Screen class with intro as target element.
 *
 */
let Intro = new Screen( core.dom.intro, { moduleName: 'intro' } );

/**
 *
 * @private
 * @method teardown
 * @memberof intro
 * @description Hides intro and removes it from DOM.
 *
 */
const teardown = () => {
  setTimeout(() => {
    Intro.teardown().then(() => {
      Intro = null; // null out the Intro once the element is removed from DOM.
    });
  }, 800 );
};

/**
 *
 * @public
 * @method init
 * @memberof intro
 * @description Kicks off intro
 *
 */
const init = () => {
  core.emitter.once('app--intro-teardown', teardown);

  core.log('intro: initialized');
};


/**
 *
 * @public
 * @name intro
 * @description Controls the website intro
 *
 */
const intro = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default intro;