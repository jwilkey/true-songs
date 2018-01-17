export default {
  trackScreen (screenname) {
    if (window.location.hostname !== 'localhost') {
      window.ga('set', 'screenName', screenname)
      window.ga('send', 'screenview', {
        'screenName': screenname
      })
    }
  },
  trackEvent (category, action, label, value) {
    if (window.location.hostname !== 'localhost') {
      window.ga('send', 'event', category, action, label, value)
    }
  }
}
