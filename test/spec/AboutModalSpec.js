define([
  'app/layout/AboutModal',
  'dojo/dom-construct'
], function(WidgetUnderTest, domConstruct){
  describe('AboutModal', function() {
    var widget;
    var destroy = function(widget){
      if (widget && widget.destroyRecursive){
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
      it('should create an AboutModal', function(){
        expect(widget).to.be.ok;
      });
    });
  });
});
