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
          url: 'http://fake.com/arcgis/rest/services/Something/MapServer',
          options: {
            id: 'opLayer1',
            visible: true
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
        var layerIds = widget.map.layerIds;
        expect(layerIds).to.include('opLayer1');
      });
    });

    describe('switching layers', function() {
      it('should turn on the layer with the id given', function() {
        widget.switchLayers('option2');
        var layer = widget.map.getLayer('opLayer1');
        expect(layer.visibleLayers).to.eql([1]);
      });

      it('should turn off all other layers', function() {
        widget.switchLayers('option4');
        var layer = widget.map.getLayer('opLayer1');
        expect(layer.visibleLayers).to.not.include.any([0,1,2]);
      });
    });
  });
});
