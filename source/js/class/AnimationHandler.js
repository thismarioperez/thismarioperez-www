import log from '../core/log';
import dom from '../core/dom';

// Private animation functions
const raf = window.requestAnimationFrame,
  caf = window.cancelAnimationFrame;
// Visibility change vars
let hidden,
  visibilityChange;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

/**
 *
 * @public
 * @class AnimationHandler
 * @classdesc Convenience handler for requestAnimationFrame
 *
 */
class AnimationHandler {
  constructor(MODULE_NAME) {
    this._moduleName =
      typeof MODULE_NAME === 'string' ? `${MODULE_NAME}: ` : '';
    this._started = false;
    this._paused = false;
    this._cycle = null;
    this.boundHandleVisiblity = this.handleVisibility.bind(this);

    this.start();
  }

  /**
   *
   *
   * @method handleVisibility
   * @memberof AnimationHandler
   * @description Pauses when user is not viewing page and vise-versa.
   */
  handleVisibility() {
    if (this._started) {
      if (document[hidden]) {
        // Pause if user isn't viewing page
        this.pause();
      } else {
        // Play if user is on page
        this.play();
      }
    }
  }

  /**
   *
   *
   * @method go
   * @param {function} fn
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description go method to kick off animation frames
   */
  go(fn) {
    if (this._started && this._cycle) {
      return this;
    }

    const self = this,
      anim = () => {
        self._cycle = raf(anim);

        if (self._started) {
          if (typeof fn === 'function') {
            fn();
          }
        }
      };

    anim();
  }

  /**
   *
   *
   * @method pause
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Pauses the animation frame cycle
   */
  pause() {
    this._paused = true;
    log(`${this._moduleName}AnimationHandler paused`);
    return this;
  }

  /**
   *
   *
   * @method play
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Plays the animation frame cycle
   */
  play() {
    this._paused = false;
    log(`${this._moduleName}AnimationHandler played`);
    return this;
  }

  /**
   *
   *
   * @method stop
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Stops the animation frame cycle and resets values.
   */
  stop() {
    caf(this._cycle);

    this._paused = false;
    this._started = false;
    this._cycle = null;
    dom.doc.off(`${visibilityChange}`);

    log(`${this._moduleName}AnimationHandler stopped`);
    return this;
  }

  /**
   *
   *
   * @method init
   * @memberof AnimationHandler
   * @description Starts animation handler
   */
  start() {
    this._started = true;
    dom.doc.on(`${visibilityChange}`, this.boundHandleVisiblity);
    log(`${this._moduleName}AnimationHandler started`);
  }
}

/******************************************************************************
 * Export
 *******************************************************************************/
export default AnimationHandler;
