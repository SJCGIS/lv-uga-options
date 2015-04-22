define([
  'app/layout/NavBar',
  'dojo/dom-construct',
  'dojo/query',
  'dojo/on',
  'dojo/topic'
], function(WidgetUnderTest, domConstruct, query, on, topic){
  describe('NavBar', function(){
    var widget;
    var destroy = function(widget) {
      if (widget && widget.destroyRecursive) {
        widget.destroyRecursive();
        widget = null;
      }
    };

    beforeEach(function(){
      widget = new WidgetUnderTest(null, domConstruct.create('div', null, document.body));
    });

    afterEach(function(){
      destroy(widget);
    });

    describe('Sanity', function(){
      it('should create a NavBar', function() {
        expect(widget).to.exist;
      });
    });
  });
});
