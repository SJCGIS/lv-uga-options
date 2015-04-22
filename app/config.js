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
        url: 'http://sjcgis.org/arcgis/rest/services/LandUse/Lopez_Village_UGA_Options/MapServer',
        title: 'Lopez Village Options',
        options: {
          id: 'options',
          opacity: 0.6,
          visible: true,
          infoTemplates: {
            0: {
              infoTemplate: new InfoTemplate()
            },
            1: {
              infoTemplate: new InfoTemplate()
            },
            2: {
              infoTemplate: new InfoTemplate()
            },
            3: {
              infoTemplate: new InfoTemplate()
            }
          }
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
          arcgisGeocoder: false,
          highlightLocation: true,
          geocoders: [{
            url: 'http://sjcgis.org/arcgis/rest/services/Tools/Polaris_Geolocator/GeocodeServer',
            name: 'SJC Geocoder',
            singleLineFieldName: 'SingleLine'
          }],
          'class': 'geocoder'
        }
      }
    }
  };
});
