import * as core from '../core';
import debounce from 'lodash/debounce';

let elements = null;
let started = false;
let topValue = '0px';
let bottomValue = '0px';

/**
 *
 * @private
 * @function renderOffset
 * @description Loops through elements and adds top/bottom padding value
 *
 */
const renderOffset = () => {
  const oldTopValue = topValue;
  const newTopValue = core.util.getHeight(core.dom.header[0]);
  const oldBottomValue = bottomValue;
  const newBottomValue = core.util.getHeight(core.dom.footer[0]);
  if (oldTopValue === newTopValue && oldBottomValue === newBottomValue) {
    return false;
  }
  topValue = newTopValue;
  bottomValue = newBottomValue;
  elements.forEach(target => {
    if (target.hasAttribute('data-offset-top')) {
      target.style.paddingTop = topValue;
    }
    if (target.hasAttribute('data-offset-bottom')) {
      target.style.paddingBottom = bottomValue;
    }
  });
  core.log('offsetController: renderOffset run');
};

/**
 *
 * @private
 * @function onResize
 * @description Handler for window resize event
 *
 */
const onResize = debounce(renderOffset, 200);

/**
 *
 * @private
 * @function bind
 * @description Binds window event listener
 *
 */
const bind = () => {
  window.addEventListener('resize', onResize);
};

/**
 *
 * @private
 * @function unbind
 * @description Unbinds window event listener
 *
 */
const unbind = () => {
  window.removeEventListener('resize', onResize);
};

/**
 *
 * @public
 * @method init
 * @memberof offsetController
 * @description Teardown controller
 *
 */
const init = () => {
  elements = core.dom.doc.find(core.config.offsetSelector);
  if (elements.length > 0) {
    bind();
    renderOffset();
    started = true;
    core.log('offsetController: initialized');
  }
};

/**
 *
 * @public
 * @method destroy
 * @memberof offsetController
 * @description Teardown controller
 *
 */
const destroy = () => {
  if (started) {
    unbind();
    topValue = '0px';
    bottomValue = '0px';
    elements = null;
    started = false;
  }
};

/**
 *
 * @public
 * @name offsetController
 * @description Controller for offsetting elements by header/footer height
 *
 */
const offsetController = {
  init,
  destroy
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default offsetController;
