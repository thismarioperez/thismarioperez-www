import config from '../core/config';
import log from '../core/log';

const $MODULE_DEFAULTS = {
  moduleName: 'Screen',
  teardownDelay: 400,
  activeClassname: config.activeClassname,
  openAnimation: 'slide-in-left',
  closeAnimation: 'slide-out-left',
};


class Screen {
  constructor( $element, options = {} ) {
    this.element = $element;
    this.options = Object.assign({}, $MODULE_DEFAULTS, options );
  }

  /**
   *
   *
   * @method open
   * @memberof Screen
   * @param {string} animation the animation modifier
   * @returns {object} promise
   * @description Returns a promise that resolves when a screen is
   *              done animating in.
   */
  open( animation = this.options.openAnimation ) {
    return new Promise(resolve => {
      this.element
        .one( 'animationend', () => {
          this.element.removeClass(`screen--${animation}`);
          resolve();
        })
        .addClass(`${config.activeClassname} screen--${animation}`);
    });
  }

  /**
   *
   *
   * @method close
   * @memberof Screen
   * @param {string} animation the animation modifier
   * @returns {object} promise
   * @description Returns a promise that resolves when a screen is
   *              done animating out.
   */
  close( animation = this.options.closeAnimation ) {
    return new Promise(resolve => {
      this.element
        .one('animationend', () => {
          this.element.removeClass(`screen--${animation}`);
          resolve();
        })
        .removeClass(`${config.activeClassname}`)
        .addClass(`screen--${animation}`);
    });
  }

  /**
   *
   *
   * @method teardown
   * @memberof Screen
   * @description Hides the screen then removes it from the DOM
   */
  teardown() {
    return new Promise( resolve => {
      this.close().then(() => {
        this.element.remove();
        log(`${this.options.moduleName}: teardown`);
      });
    });
  }
}

/*******************************************************************************
 * Export
 ******************************************************************************/
export default Screen;