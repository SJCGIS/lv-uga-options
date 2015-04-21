define([
  'app/mapping/MapControls',
  'dojo/dom-construct',
  'esri/layers/FeatureLayer',
  'dojo/_base/lang',
  'dojo/_base/array'

], function(WidgetUnderTest, domConstruct, FeatureLayer, lang, array){
  describe('MapControls', function() {
    var widget;
    var mapControls;
    var destroy = function(widget) {
      if (widget && widget.destroyRecursive) {
        widget.destroyRecursive();
        widget = null;
      }
    };

    beforeEach(function() {
      mapControls = {
        options: {
          basemap: 'gray',
          center: [-122.913, 48.523],
          zoom: 15
        },
        operationalLayers: [{
          url: 'http://fake.com/arcgis/rest/services/FeatureLayer/0',
          options: {
            id: 'opLayer1',
            visible: true
          }
        }, {
          url: 'http://fake.com/arcgis/rest/services/FeatureLayer/1',
          options: {
            id: 'opLayer2',
            visible: false
          }
        }, {
          url: 'http://fake.com/arcgis/rest/services/FeatureLayer/2',
          options: {
            id: 'opLayer3',
            visible: false
          }
        }, {
          url: 'http://fake.com/arcgis/rest/services/FeatureLayer/3',
          options: {
            id: 'opLayer4',
            visible: false
          }
        }]
      };

      widget = new WidgetUnderTest(mapControls, domConstruct.create('div', null, document.body));
    });

    afterEach(function() {
      destroy(widget);
    });

    describe('Sanity', function() {
      it('should create a MapControls', function() {
        expect(widget).to.exist;
      });
    });

    describe('map initialization',function() {
      it('should have layers with given ids', function() {
        var layerIds = widget.map.graphicsLayerIds;
        expect(layerIds).to.include.members(['opLayer1', 'opLayer2', 'opLayer3', 'opLayer4']);
      });
    });

    describe('switching layers', function() {
      it('should turn on the layer with the id given', function() {
        widget.switchLayers('opLayer2');
        var layer = widget.map.getLayer('opLayer2');
        expect(layer.visible).to.be.true;
      });

      it('should turn off all other layers', function() {
        var disabledLayers = [];
        widget.switchLayers('opLayer4');
        array.forEach(widget.map.graphicsLayerIds, lang.hitch(widget, function(lyr) {
          var layer = widget.map.getLayer(lyr);
          if(!layer.visible) {
            disabledLayers.push(lyr);
          }
        }));
        expect(disabledLayers).to.include.members(['opLayer1','opLayer2', 'opLayer3']);
      });
    });
  });
});
