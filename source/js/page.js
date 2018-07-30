import * as core from './core';
import offsetController from './controllers/offsetController';
import scrollController from './controllers/scrollController';
import scrollJackController from './controllers/scrollJackController';
import animateController from './controllers/animateController';

/**
 *
 * @private
 * @function onPageUnload
 * @description wrapper to destroy controllers on page unload
 *
 */
const onPageUnload = () => {
  offsetController.destroy();
  scrollJackController.destroy();
  animateController.destroy();
};

/**
 *
 * @private
 * @function onPageLoad
 * @description wrapper to init controllers on page load
 *
 */
const onPageLoad = () => {
  offsetController.init();
  scrollJackController.init();
  animateController.init();
  // track pageview
  core.emitter.emit('app--analytics-pageview');
};

/**
 *
 * @private
 * @function initControllers
 * @description wrapper to init controllers on initial page load
 *
 */
const initControllers = () => {
  onPageLoad();
  scrollController.init();
};

/**
 *
 * @public
 * @method init
 * @memberof page
 * @description kick things off
 *
 */
const init = () => {
  initControllers();
  core.emitter.on('app--page-unload', onPageUnload);
  core.emitter.on('app--page-load', onPageLoad);
  core.log( 'page: initialized' );
};

/**
 *
 * @public
 * @member page
 * @memberof App
 * @description Container for controller modules
 *
 */
const page = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default page;