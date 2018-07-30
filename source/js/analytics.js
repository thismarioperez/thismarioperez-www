import 'autotrack/lib/plugins/outbound-link-tracker';
import * as core from './core';

/*eslint-disable*/
/**
 *
 * @private
 * @description Sends a pageview to google analytics
 * @param {string} path The current path
 * @param {string} title The title of the new page
 * @function track
 *
 */
const track = (path, title) => {
  ga('set', { page: path, title: title });
  ga('send', 'pageview');
};

/**
 *
 * @private
 * @description Sends a pageview for the current page to google anayltics
 * @function trackPage
 * @memberof analytics
 *
 */
const trackPage = () => {
  let path = window.location.pathname;
  let title = document.title;
  track(path, title);
  core.log(path, title);
};

/**
 *
 * @public
 * @description Kick off analytics. Loads ga script if not in dev mode.
 * @method trackPage
 * @memberof analytics
 *
 */
const init = () => {
  // if (core.env.isDev()) {
  //   return false;
  // }
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  );
  ga('create', core.config.gaTrackingId, 'auto');
  ga('require', 'outboundLinkTracker');
  ga('send', 'pageview');

  core.emitter.on('app--analytics-pageview', trackPage);
};
/* eslint-enable*/

/**
 *
 * @public
 * @description Handles app-wide google analytics tracking
 * @name analytics
 *
 */
const analytics = {
  init
};

/******************************************************************************
 * Export
 *******************************************************************************/
export default analytics;
