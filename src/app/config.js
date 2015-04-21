define(['esri/InfoTemplate'], function(InfoTemplate) {
  return {

    mapControls: {
      options: {
        basemap: 'gray',
        center: [-122.913, 48.523],
        zoom: 15,
        minZoom: 14,
        sliderPosition: 'bottom-right'
      },

      operationalLayers: [{
        url: 'http://sjcgis.org/arcgis/rest/services/LandUse/Lopez_Village_UGA_Options/MapServer/0',
        title: 'Option 1',
        options: {
          id: 'option1',
          opacity: 0.6,
          visible: true,
          outFields: ['*'],
          infoTemplate: new InfoTemplate('Atrributes', '${*}'),
          mode: 0
        }
      }, {
        url: 'http://sjcgis.org/arcgis/rest/services/LandUse/Lopez_Village_UGA_Options/MapServer/1',
        title: 'Option 2',
        options: {
          id: 'option2',
          opacity: 0.6,
          visible: false,
          outFields: ['*'],
          infoTemplate: new InfoTemplate('Atrributes', '${*}'),
          mode: 0
        }
      }, {
        url: 'http://sjcgis.org/arcgis/rest/services/LandUse/Lopez_Village_UGA_Options/MapServer/2',
        title: 'Option 3',
        options: {
          id: 'option3',
          opacity: 0.6,
          visible: false,
          outFields: ['*'],
          infoTemplate: new InfoTemplate('Atrributes', '${*}'),
          mode: 0
        }
      }, {
        url: 'http://sjcgis.org/arcgis/rest/services/LandUse/Lopez_Village_UGA_Options/MapServer/3',
        title: 'Option 4',
        options: {
          id: 'option4',
          opacity: 0.6,
          visible: false,
          outFields: ['*'],
          infoTemplate: new InfoTemplate('Atrributes', '${*}'),
          mode: 0
        }
      }],

      // TODO: add basemaps
      // basemaps: {},

      // set the id of a node to place the legend
      // comment this out if you don't want to show legend
      legendNodeId: 'mapLegend',

      // Add config parameters for each map widget you want to include
      // The map reference will get appended to the options
      // To accept default options just pass empty object {}
      // NOTE: to change the position of these widgets, make changes in map.css
      widgets: {
        scalebar: {
          // see https://developers.arcgis.com/javascript/jsapi/scalebar-amd.html#scalebar1
        },
        homeButton: {
          // see: https://developers.arcgis.com/javascript/jsapi/homebutton-amd.html#homebutton1
        },
        locateButton: {
          // see: https://developers.arcgis.com/javascript/jsapi/locatebutton-amd.html#locatebutton1
        },
        geocoder: {
          // see https://developers.arcgis.com/javascript/jsapi/geocoder-amd.html#geocoder1
          autoComplete: true,
          arcgisGeocoder: {
            placeholder: 'Address or Location'
          },
          'class': 'geocoder'
        }
      }
    }
  };
});
