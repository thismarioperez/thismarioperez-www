/**
 * @public
 * @module util
 * @description App-wide utility functions
 */
import $ from 'properjs-hobo';
import dom from './dom';
import config from './config';

/**
 *
 * @public
 * @method px
 * @memberof core.util
 * @param {string} str The value to pixel-ify
 * @returns {string}
 * @description Add pixel units when inline styling
 *
 */
const px = str => {
  return `${str}px`;
};

/**
 *
 * @public
 * @method getHeight
 * @memberof core.util
 * @param {Object} elem The DOMElement to check the offsets of
 * @returns {string} pixel value of element's height
 * @description Get the natural height of an element including margins.
 *
 */
const getHeight = elem => {
  let ret;
  elem.style.display = 'block';
  const styles = window.getComputedStyle(elem);
  const height = Math.ceil(
    elem.scrollHeight +
      parseFloat(styles.marginBottom) +
      parseFloat(styles.marginTop)
  );

  ret = px(height); // Get it's height in pixels. Includes margins

  elem.style.display = '';

  return ret;
};

/**
 *
 * @public
 * @method isElementVisible
 * @memberof core.util
 * @param {Object} el The DOMElement to check the offsets of
 * @returns {boolean}
 * @description Module isElementVisible method, handles element boundaries
 *
 */
const isElementVisible = el => {
  if (el) {
    const bounds = el.getBoundingClientRect();

    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }
};

/**
 *
 * @public
 * @method getElementsInView
 * @memberof core.util
 * @param {Hobo} $nodes The selected nodes to check if they're in view.
 * @returns {Hobo} object of elements in view
 * @return {bool} returns false if no elements are in view.
 * @description Filters out visible elements from a selected hobo list.
 *
 */
const getElementsInView = $nodes => {
  const $ret = $([]);

  $nodes.forEach(node => {
    if (isElementVisible(node)) {
      $ret.push(node);
      return true;
    }
  });

  return $ret;
};

/**
 *
 * @public
 * @method getScrollPos
 * @memberof core.util
 * @returns {num} value of window's scroll offset
 * @description Get the current scroll position value
 *
 */
const getScrollPos = () => {
  let scrollTop = Math.max(
    window.pageYOffset,
    dom.html[0].scrollTop,
    dom.body[0].scrollTop
  );
  return scrollTop;
};

/**
 *
 * @public
 * @method noop
 * @memberof util
 * @returns {boolean}
 * @description All true all the time
 *
 */
const noop = () => {
  return true;
};

/**
 *
 * @public
 * @method screenShow
 * @memberof util
 * @param {hobo} $screen a hobo selected element array
 * @param {string} animation the animation modifier
 * @returns {object} promise
 * @description Returns a promise that resolves when a screen is
 *              done animating in.
 *
 */
const screenShow = ($screen, animation = 'slide-in-up') => {
  return new Promise(resolve => {
    $screen
      .one('animationend', () => {
        $screen.removeClass(`screen--${animation}`);
        resolve();
      })
      .addClass(`${config.activeClassname} screen--${animation}`);
  });
};

/**
 *
 * @public
 * @method screenHide
 * @memberof util
 * @param {hobo} $screen a hobo selected element array
 * @param {string} animation the animation modifier
 * @returns {object} promise
 * @description Returns a promise that resolves when a screen is
 *              done animating out.
 *
 */
const screenHide = ($screen, animation = 'slide-out-up') => {
  return new Promise(resolve => {
    $screen
      .one('animationend', () => {
        $screen.removeClass(`screen--${animation}`);
        resolve();
      })
      .removeClass(`${config.activeClassname}`)
      .addClass(`screen--${animation}`);
  });
};

/******************************************************************************
 * Export
 *******************************************************************************/
export {
  getHeight,
  getElementsInView,
  getScrollPos,
  isElementVisible,
  noop,
  px,
  screenHide,
  screenShow
};
