import WebFont from 'webfontloader';
import * as core from './core';

/**
 *
 * @private
 * @function fontLoadingDone
 * @description Fires an event when font loading is over.
 *
 */
const fontLoadingDone = () => {
  core.emitter.emit('app--fonts-loaded');
};

/**
 *
 * @private
 * @function handleActive
 * @description Gives the client a hint that the font is cached.
 *              Only runs when a font is active
 *
 */
const handleActive = () => {
  // manipulate session storage to detect if font is cached
  sessionStorage.setItem('fonts', 'true');
  fontLoadingDone();
};

/**
 *
 * @private
 * @function handleInActive
 * @description Logs that the font failed to load
 *
 */
const handleInActive = (family, fvd) => {
  fontLoadingDone();
  console.log(`fonts: failed to load ${family} family`);
};

/**
 *
 * @private
 * @description Configuration object for WebFont
 * @member config
 * @memberof fonts
 *
 */
const config = {
  google: {
    families: ['Source Code Pro:200,400,700']
  },
  active: handleActive,
  fontInactive: handleInActive
};

/**
 *
 * @public
 * @method init
 * @memberof fonts
 * @description Kicks off WebFont
 *
 */
const init = () => {
  if (sessionStorage.fonts) {
    core.dom.html.addClass('wf-active');
  }
  WebFont.load(config);
  core.log('fonts: initialized');
};

/**
 *
 * @public
 * @member fonts
 * @memberof App
 * @description Single instance of webfontloader.
 *              Loads app fonts from Typekit CDN with local fallbacks.
 *              Uses a sessionStorage item to load cached fonts.
 *
 */
const fonts = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default fonts;
