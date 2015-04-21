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

    describe('clicking on the sidebar toggle', function() {
      it('should publish the toggle topic');
    });

    describe('clicking on a nav link', function() {
      var links;
      beforeEach(function() {
        links = query('#mapTabs > li a');
      });

      it('should show correct tab', function() {
        var result;
        var link = links[0];
        query(links).on('show.bs.tab', function(e) {
          result = e.target.innerHTML;
        });
        query(link).tab('show');
        expect(result).to.be.equal(link.innerHTML);
      });

      it('should publish a map change topic', function(){
        var map;
        topic.subscribe('map/change', function(mapName) {
          map = mapName;
        });
        var link = links[0];
        query(link).tab('show');
        expect(map).to.be.equal(link.parentElement.id);
      });
    });
  });
});
