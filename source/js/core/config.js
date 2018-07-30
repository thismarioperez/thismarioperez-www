/**
 *
 * @public
 * @namespace config
 * @memberof core
 * @description Declare app wide config variables
 *
 */
const config = {
  /**
   *
   * @public
   * @member prod
   * @memberof core.config
   * @description The node environment production variable string.
   *
   */
  prod: 'production',

  /**
   *
   * @public
   * @member dev
   * @memberof core.config
   * @description The node environment development variable string.
   *
   */
  dev: 'development',

  /**
   *
   * @public
   * @member gaTrackingId
   * @memberof core.config
   * @description Google analytics tracking id
   *
   */
  gaTrackingId: 'UA-123069095-1',

  /**
   *
   * @public
   * @member animateSelector
   * @memberof core.config
   * @description The string selector used for animateables
   *
   */
  animateSelector:
    '.js-animate',

  /**
   *
   * @public
   * @member offsetSelector
   * @memberof core.config
   * @description The string selector used for elements that need to offset their top or bottom by header/footer.
   *
   */
  offsetSelector: '.js-offset',

  /**
   *
   * @public
   * @member headerSelector
   * @memberof core.config
   * @description The string selector used for <header> node.
   *
   */
  headerSelector: '.js-header',

  /**
   *
   * @public
   * @member mainSelector
   * @memberof core.config
   * @description The string selector used for <main> node.
   *
   */
  mainSelector: '.js-main',

  /**
   *
   * @public
   * @member footerSelector
   * @memberof core.config
   * @description The string selector used for <footer> node.
   *
   */
  footerSelector: '.js-footer',

  /**
   *
   * @public
   * @member introSelector
   * @memberof core.config
   * @description The string selector used for <intro> node.
   *
   */
  introSelector: '.js-intro',

  /**
   *
   * @public
   * @member introSelector
   * @memberof core.config
   * @description The string selector used for <contact> node.
   *
   */
  contactSelector: '.js-contact',

  /**
   *
   * @public
   * @member activeClassname
   * @memberof core.config
   * @description The active classname for <any> node.
   *
   */
  activeClassname: 'is-active',

  /**
   *
   * @public
   * @member loadingClassname
   * @memberof core.config
   * @description Css loading state classname for <any> node.
   *
   */
  loadingClassname: 'is-loading',

  /**
   *
   * @public
   * @member readyClassname
   * @memberof core.config
   * @description Css ready state classname for <any> node.
   *
   */
  readyClassname: 'is-ready',

  /**
   *
   * @public
   * @member scrollJackSelector
   * @memberof core.config
   * @description Selector to select links deemed 'scroll jackable'.
   *
   */
  scrollJackSelector: 'a[href^="#"]'
};

export default config;
