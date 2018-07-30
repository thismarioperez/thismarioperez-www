import AnimationHandler from '../class/AnimationHandler';
import * as core from '../core';

// vars
const MODULE_NAME = 'animateController';
let $els,
  handler = null,
  lastPos = -1,
  started = false;

/**
 *
 * @private
 * @description Resets global vars to intial values.
 *              Use during destroy().
 * @function reset
 *
 */
const reset = () => {
  $els = null;
  started = false;
  handler = null;
  lastPos = -1;
  core.dom.html.removeClass('is-animate-ready');
};

/**
 *
 * @private
 * @description Loops through controller els and toggles their visible state
 * @function toggleVisible
 *
 */
const toggleVisible = () => {
  $els.forEach(el => {
    const $el = core.dom.doc.find(el);
    if (core.util.isElementVisible(el)) {
      $el.addClass('is-visible');
    } else {
      $el.removeClass('is-visible');
    }
  });
};

/**
 *
 * @private
 * @description The loop to run using AnimationHandler
 * @function loop
 *
 */
const loop = () => {
  const newPos = core.util.getScrollPos();

  if (newPos === lastPos) {
    return false;
  }

  // update last position and run calculations
  lastPos = newPos;
  toggleVisible();
};

/**
 *
 * @private
 * @description starts raf handler
 * @function start
 *
 */
const start = () => {
  $els = core.dom.doc.find(core.config.animateSelector);
  if ($els.length > 0) {
    handler = new AnimationHandler(MODULE_NAME);
    handler.go(loop);
    started = true;
  }
};

/**
 *
 * @private
 * @description stops raf handler
 * @function stop
 *
 */
const stop = () => {
  handler.stop();
  reset();
};

/**
 *
 * @public
 * @description syncs raf handler
 * @method sync
 * @memberof animateController
 * @return {promise}
 *
 */
const sync = () => {
  return new Promise(resolve => {
    if (started) {
      stop();
    }
    start();
    resolve();
  });
};

/**
 *
 * @public
 * @description initializes controller
 * @method init
 * @memberof animateController
 *
 */
const init = () => {
  start();
  core.dom.html.addClass('is-animate-ready');

  core.log('animateController: initialized');
};

/**
 *
 * @public
 * @description destroys controller
 * @method destroy
 * @memberof animateController
 *
 */
const destroy = () => {
  if (started) {
    stop();
  }

  core.log('animateController: destroyed');
};

/**
 *
 * @public
 * @description controller that toggles visible state of animated
 *              elements when they are in the viewport.
 * @name animateController
 *
 */
const animateController = {
  init,
  destroy,
  sync
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default animateController;
