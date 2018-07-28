import * as core from '../core';
import { debounce, throttle } from 'lodash';


// Vars
let isBeingScrolled = false;
let lastScrollTop = 0;


/**
 *
 * @private
 * @description Adds is-scrolling className
 * @member {function} isScrolling
 * @memberof scrollController
 *
 */
const isScrolling = () => {
  if ( isBeingScrolled === true ) {
    return;
  }

  isBeingScrolled = true;
  core.dom.html.addClass( 'is-scrolling' );
};


/**
 *
 * @private
 * @description Debounced version of isScrolling.
 *              Runs at the leading edge of the timeout.
 *              Is not run at trailing edge. The goal is
 *              for this to run immediately before toggleScrollClassNames.
 * @member {function} debouncedIsScrolling
 * @memberof scrollController
 *
 */
let debouncedIsScrolling = debounce( isScrolling, 0, { leading: true, trailing: false } );


/**
 *
 * @private
 * @description Toggles scroll classNames
 * @member {function} toggleScrollClassNames
 * @memberof scrollController
 *
 */
const toggleScrollClassNames = () => {
  core.dom.html.removeClass( 'is-scrolling' );
  let scrollTop = core.util.getScrollPos();
  if ( scrollTop <= 0 ) {
    core.dom.html.removeClass( 'is-scrolled-up is-scrolled-down');
  } else if ( scrollTop > lastScrollTop ) {
    core.dom.html.removeClass( 'is-scrolled-up' );
    core.dom.html.addClass( 'is-scrolled-down' );
  } else {
    core.dom.html.removeClass( 'is-scrolled-down' );
    core.dom.html.addClass( 'is-scrolled-up' );
  }
  lastScrollTop = scrollTop;
  isBeingScrolled = false;
};


/**
 *
 * @private
 * @description Throttled scroll handler
 * @member {function} handleScroll
 * @memberof scrollController
 *
 */
const handleScroll = throttle( toggleScrollClassNames, 400 );


/**
 *
 * @private
 * @description Listeners to handlers
 * @member {function} bindListeners
 * @memberof scrollController
 *
 */
const bindListeners = () => {
  window.addEventListener( 'scroll', debouncedIsScrolling );
  window.addEventListener( 'scroll', handleScroll );
};


/**
 *
 * @public
 * @description Kick off logic and bind listeners
 * @member {function} init
 * @memberof scrollController
 *
 */
const init = () => {
  bindListeners();
  toggleScrollClassNames();

  core.log('scrollController: initialized');
};


/**
 *
 * @public
 * @description Toggles appropriate classNames
 *              given the window's scroll position.
 *              Listens to scroll event and updates
 *              class names accordingly.
 * @member {object} scrollController
 *
 */
const scrollController = {
  init,
  toggleScrollClassNames
};


/******************************************************************************
 * Export
*******************************************************************************/
export default scrollController;