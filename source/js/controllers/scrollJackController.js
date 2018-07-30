import * as core from '../core';
import scroll2 from 'properjs-scroll2';
import easing from 'properjs-easing';

// vars
let els = null;
let started = false;

/**
 *
 * @private
 * @function handleClick
 * @desc Handles clicking on scroll to element
 *
 */
const handleClick = e => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href');
  const toEl = core.dom.doc.find(id);
  if (toEl.length <= 0) {
    // If target element doesn't exist, stop here
    core.log(`scrollJackController: target element '${id}' doesn't exist!`);
    return false;
  }
  const offset = toEl[0].offsetTop - core.dom.header[0].offsetHeight;
  const ease = easing.easeOutCubic;
  const duration = 800;
  scroll2({
    y: offset,
    ease,
    duration
  });
};

/**
 *
 * @private
 * @function bind
 * @desc Binds click handler
 *
 */
const bind = () => {
  els.on('click', handleClick);
};

/**
 *
 * @private
 * @function unbind
 * @desc Unbinds click handler
 *
 */
const unbind = () => {
  els.off('click');
};

/**
 *
 * @public
 * @desc Kick things off
 * @method init
 * @memberof scrollJackController
 *
 */
const init = () => {
  els = core.dom.doc.find(core.config.scrollJackSelector);
  if (els.length > 0) {
    bind();
  }
};

/**
 *
 * @public
 * @desc Tear things down
 * @method destroy
 * @memberof scrollJackController
 *
 */
const destroy = () => {
  if (started) {
    unbind();
    els = null;
  }
};

/**
 *
 * @public
 * @name scrollJackController
 * @desc Controls scroll to elements
 */
const scrollJackController = {
  init,
  destroy
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default scrollJackController;
