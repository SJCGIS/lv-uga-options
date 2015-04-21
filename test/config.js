(function(window) {
  'use strict';

  var allTestFiles = [];
  var TEST_REGEXP = /test\/spec.*\.js$/;

  for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
      allTestFiles.push(file);
    }
  }

  window.dojoConfig = {
    packages: [
      {
        name: 'app',
        location: '/base/src/app'
      },

      // esri/dojo packages
      {
        name: 'dgrid',
        location: 'http://js.arcgis.com/3.13/dgrid'
      }, {
        name: 'dijit',
        location: 'http://js.arcgis.com/3.13/dijit'
      }, {
        name: 'esri',
        location: 'http://js.arcgis.com/3.13/esri'
      }, {
        name: 'dojo',
        location: 'http://js.arcgis.com/3.13/dojo'
      }, {
        name: 'dojox',
        location: 'http://js.arcgis.com/3.13/dojox'
      }, {
        name: 'put-selector',
        location: 'http://js.arcgis.com/3.13/put-selector'
      }, {
        name: 'util',
        location: 'http://js.arcgis.com/3.13/util'
      }, {
        name: 'xstyle',
        location: 'http://js.arcgis.com/3.13/xstyle'
      },  {
        name: 'dojo-bootstrap',
        location: '/base/src/dojo-bootstrap'
      }, {
        name: 'bootstrap-map-js',
        location: '/base/src/bootstrap-map-js/src'
      }, {
        name: 'spin-js',
        location: '/base/src/spinjs'
      }
    ],
    async: true
    };


    /**
     * This function must be defined and is called back by the dojo adapter
     * @returns {string} a list of dojo spec/test modules to register with your testing framework
     */
    window.__karma__.dojoStart = function() {
      return allTestFiles;
    };
  })(window);
