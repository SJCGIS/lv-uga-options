define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/topic',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  'esri/map',
  'esri/dijit/Scalebar',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'esri/dijit/HomeButton',
  'esri/dijit/LocateButton',
  'esri/dijit/Geocoder',
  'esri/arcgis/utils',
  'esri/dijit/Legend',

  'bootstrap-map-js/js/bootstrapmap',

  'spin-js/spin',

  'dojo/text!./templates/Map.html'
], function(
  declare, array, lang, domClass, topic,
  _WidgetBase, _TemplatedMixin,
  Map, Scalebar, AGSDynamicMapServiceLayer, HomeButton, LocateButton, Geocoder,
  arcgisUtils, Legend, BootstrapMap, Spinner,
  template) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    postCreate: function() {
      this.inherited(arguments);
      // NOTE: BootstrapMap needs to work off an id
      this.mapNode.id = this.id + 'Map';
      this._initMap();
    },

    _wireEvents: function() {
        // summary:
        // wire events
        //
        this.map.on('update-start', lang.hitch(this, 'showSpinner'));
        this.map.on('update-end', lang.hitch(this, 'hideSpinner'));
    },

    showSpinner: function() {
        // summary:
        // sets up and shows the spinner
        //
        var opts = {
            lines: 9, // The number of lines to draw
            length: 4, // The length of each line
            width: 3, // The line thickness
            radius: 4, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 100, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent in px
            left: '50%' // Left position relative to parent in px
        };

        if(!this.spinner) {
            this.spinner = new Spinner(opts).spin(this.spinnerNode);
        } else {
            if(!this.spinner.el) {
                // only start spinner if not already started
                this.spinner.spin(this.spinnerNode);
            }
        }
    },

    hideSpinner: function() {
        // summary:
        // hides the spinner
        //
        if( this.spinner ) {
          this.spinner.stop();
        }
    },

    // initalize map from configuration parameters
    _initMap: function() {
      if (!this.options) {
        this.options = {};
      }

      this.showSpinner();

      this.map = BootstrapMap.create(this.mapNode.id, this.options);
      this._wireEvents();
      this._initLayers();
      this._initWidgets();
    },

    // init map layers from options instead of a web map
    _initLayers: function() {
      if (!this.operationalLayers) {
        return;
      }
      var layers = [];
      var layerInfos = [];
      array.forEach(this.operationalLayers, lang.hitch(this, function(operationalLayer) {
        this._initLayer(operationalLayer, layers, layerInfos);
      }));
      this.map.addLayers(layers);
      this._initLegend(layerInfos);
    },

    _initLayer: function(operationalLayer, layers, layerInfos) {

      console.log('app.mapping.MapControls::_initLayer', arguments);

      var l = new AGSDynamicMapServiceLayer(operationalLayer.url, operationalLayer.options);
      // unshift instead of push to keep layer ordering on map intact
      layers.unshift(l);
      layerInfos.unshift({
        layer: l,
        title: operationalLayer.title || l.name
      });
    },

    _initLegend: function(layerInfos) {
      if (!this.legendNodeId) {
        return;
      }
      this.legend = new Legend({
          map: this.map,
          layerInfos: layerInfos
        }, this.legendNodeId);
      this.legend.startup();
    },

    // init map widgets if they are in config
    _initWidgets: function() {
      var self = this;
      if (!this.widgets) {
        return;
      }

      // scalebar
      if (this.widgets.scalebar) {
        this.scalebar = new Scalebar(lang.mixin({
          map: this.map,
          scalebarUnit: 'dual'
        }, this.widgets.scalebar));
      }

      // home button
      if (this.widgets.homeButton) {
        this.homeButton = new HomeButton(lang.mixin({
          map: this.map
        }, this.widgets.homeButton), this.homeNode);
        this.homeButton.startup();
      }

      // locate button
      if (this.widgets.locateButton) {
        this.locateButton = new LocateButton(lang.mixin({
          map: this.map,
          'class': 'locate-button'
        }, this.widgets.locateButton), this.locateNode);
        this.locateButton.startup();
      }

      // geocoder
      if (this.widgets.geocoder) {
        this.geocoder = new Geocoder(lang.mixin({
          map: this.map,
          'class': 'geocoder'
        }, this.widgets.geocoder), this.searchNode);
        this.geocoder.startup();
        this.own(this.geocoder.on('select', function(e) {
          domClass.remove(self.geocoder.domNode, 'shown');
        }));
      }
    },

    getMapHeight: function() {
      if(this.map) {
        return this.map.height;
      } else {
        return 0;
      }
    },

    clearBaseMap: function() {
      var map = this.map;
      if (map.basemapLayerIds && map.basemapLayerIds.length > 0) {
        array.forEach(map.basemapLayerIds, function(lid) {
          map.removeLayer(map.getLayer(lid));
        });
        map.basemapLayerIds = [];
      } else {
        map.removeLayer(map.getLayer(map.layerIds[0]));
      }
    },

    switchLayers: function(layerId) {
      // summary:
      //    switch currently displayed operational layer. only one layer
      //    can be displayed at one time, so other layers are turned off
      // layerId: id of layer to be displayed, all others get turned off

      console.log('app.mapping.MapControls::switchLayers', arguments);

      var layer = this.map.getLayer(this.operationalLayers[0].options.id);
      var layerIds = [];

      switch(layerId) {
      case 'option1':
        layerIds.push(0);
        break;
      case 'option2':
        layerIds.push(1);
        break;
      case 'option3':
        layerIds.push(2);
        break;
      case 'option4':
        layerIds.push(3);
        break;
      }
      layer.setVisibleLayers(layerIds);
      if(this.legend) {
        this.legend.refresh();
      }
    }
  });
});
