define([
  'dojo/_base/declare',
  'dojo/query',
  'dojo/topic',
  'dojo/on',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  'dojo/text!./templates/NavBar.html',
  'dojo/i18n!./nls/strings',

  'dojo-bootstrap/Collapse',
  'dojo-bootstrap/Dropdown',
  'dojo-bootstrap/Tab'
], function(
  declare, query, topic, on,
  _WidgetBase, _TemplatedMixin,
  template, strings) {

  return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,
      strings: strings,

      _setTitleAttr: function(newTitle) {
        this.title = newTitle;
        this.titleNode.innerHTML = this.title;
        window.document.title = this.title;
      },

      postCreate: function() {
        this.inherited(arguments);
        this.set('title', strings.appTitle);
        this._attachEventHandlers();
      },

      _attachEventHandlers: function() {
        var self = this;
        // toggle sidebar
        this.own(on(this.sidebarToggleButton, 'click', function(e) {
          topic.publish('sidebar/toggle');
          self._hideDropdownNav(e);
        }));
        // change map
        query('#mapTabs > li a').on('show.bs.tab', function(e){
          topic.publish('map/change', e.target.parentElement.id);
        });
      },

      _hideDropdownNav: function(e) {
        // hide nav dropdown on mobile
        if (query('.navbar-collapse.in', this.domNode).length > 0) {
          e.stopPropagation();
          this.collapseMenuToggleButton.click();
        }
      }
   });
});
