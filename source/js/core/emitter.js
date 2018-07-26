import EventEmitter from 'eventemitter3';

/**
 *
 * @public
 * @member emitter
 * @memberof core
 * @description A singleton instance of eventemitter3 for use in the app.
 */
const emitter = new EventEmitter();

/******************************************************************************
 * Export
 *******************************************************************************/
export default emitter;
