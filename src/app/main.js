define([
  'dojo/query',
  'dojo/dom',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/topic',

  './config',
  './mapping/MapControls',
  './layout/NavBar',

  'dojo-bootstrap/Modal',

  'dojo/domReady!'],
function(
  query, dom, domClass, domStyle, topic,
  config, MapControls, NavBar
) {
  'use strict';
  var app = {};

  // start map
  app.mapControls = new MapControls(config.mapControls, 'mapControls');
  app.mapControls.startup();

  // start nav
  app.navBar = new NavBar({}, 'navBar');
  app.navBar.startup();

  // responsive sidebar
  app.sidebar = dom.byId('sidebar');

  // app topics

  // toggle the sidebar
  topic.subscribe('sidebar/toggle', function() {
    if (!app.sidebar) {
      return;
    }
    // make sure sidebar is same height as the map
    domStyle.set(app.sidebar, 'height', app.mapControls.getMapHeight() + 'px');
    domClass.toggle(window.document.body, 'sidebar-open');
  });

  // switch layers when map change is published
  topic.subscribe('map/change', function(layerId) {
    app.mapControls.switchLayers(layerId);
  });

  return app;
});
