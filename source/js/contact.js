import * as core from './core';
import Screen from './class/Screen';

let ContactScreen = new Screen( core.dom.contact, { moduleName: 'contact' } );

const bind = () => {
  core.dom.contact.find( '.js-contact-close' ).on( 'click', ( e ) => {
    e.preventDefault();
    core.emitter.emit( 'app--contact-toggle' );
  });
  core.dom.doc.find( '.js-contact-button' ).on( 'click', ( e ) => {
    e.preventDefault();
    core.emitter.emit( 'app--contact-toggle' );
  });
};

const toggle = () => {
  if ( core.dom.html.is( '.is-contact-open' ) ) {
    ContactScreen.close();
    core.dom.html.removeClass( 'is-contact-open' );
  } else {
    ContactScreen.open();
    core.dom.html.addClass( 'is-contact-open' );
  }
};

/**
 *
 * @public
 * @method init
 * @memberof contact
 * @description Kicks off contact
 *
 */
const init = () => {
  bind();
  core.emitter.on('app--contact-toggle', toggle );
};

/**
 *
 * @public
 * @name contact
 * @description Controls the contact screen
 *
 */
const contact = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default contact;