import Screen from './class/Screen';
import * as core from './core';


class IntroScreen extends Screen {
  constructor() {
    super( core.dom.intro, { moduleName: 'intro' });
  }

  exec() {
    this.duration = 400;
    this.delay = 50;
    this.ids = [
      { id: 'welcome', el: core.dom.intro.find( '.welcome' ) },
      { id: 'iam', el: core.dom.intro.find( '.iam' ) },
      { id: 'thismarioperez', el: core.dom.intro.find( '.thismarioperez' ) },
    ];

    return new Promise(( resolve, reject ) => {
      this.resolve = resolve;
      this.reject = reject;
      core.dom.intro.addClass( 'is-animated' );
      core.dom.intro.find('.js-intro-skip').one('click', this.skip.bind(this));
      this.anim();
    });
  }

  anim () {
    const obj = this.ids.shift();
    const len = obj.el.find( 'path' ).length;
    const last = obj.el.find( 'path').last();

    setTimeout(() => {
      obj.el.addClass( 'is-animated' );
    }, this.duration );

    last.one( 'transitionend', () => {
      setTimeout(() => {
        obj.el.addClass( 'is-done' );

        if ( !this.ids.length ) {
          this.done();

        } else {
          this.anim();
        }

      }, (this.duration + (this.delay * len)) );
    });

  }

  done () {
    setTimeout(() => {
      core.dom.intro.find( '.js-intro-logo' ).one( 'transitionend', () => {
        core.emitter.emit( 'app--intro-teardown' );
        this.resolve();
      });
      core.dom.intro.addClass( 'is-done' );
      core.dom.intro.find('.js-intro-skip').off();
    }, this.duration * 2 );
  }

  skip (e) {
    e.preventDefault();
    core.dom.intro.find('.js-intro-welcome svg path').off();
    core.dom.intro.addClass( 'is-skipped' );
    setTimeout(() => {
      core.emitter.emit( 'app--intro-teardown' );
    }, this.duration );
  }


}

/**
 *
 * @private
 * @member Intro
 * @memberof intro
 * @description Instance of Screen class with intro as target element.
 *
 */
let Intro = new IntroScreen();

/**
 *
 * @private
 * @method exec
 * @memberof intro
 * @description Hides intro and removes it from DOM.
 *
 */
const exec = () => {
  setTimeout(() => {
    Intro.exec();
  }, 800 );
};

/**
 *
 * @private
 * @method teardown
 * @memberof intro
 * @description Hides intro and removes it from DOM.
 *
 */
const teardown = () => {
  Intro.teardown().then(() => {
    Intro = null; // null out the Intro once the element is removed from DOM.
  });
};

/**
 *
 * @public
 * @method init
 * @memberof intro
 * @description Kicks off intro
 *
 */
const init = () => {
  core.emitter.once('app--intro-exec', exec);
  core.emitter.once('app--intro-teardown', teardown);

  core.log('intro: initialized');
};


/**
 *
 * @public
 * @name intro
 * @description Controls the website intro
 *
 */
const intro = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default intro;