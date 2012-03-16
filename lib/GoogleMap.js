/**
 * The maps api is loaded using the Google Loader. Include
 * <script type="text/javascript" src="https://www.google.com/jsapi"></script>
 * in your index.html to use this component.
 */

enyo.kind({
  name: 'GoogleMap',
  kind: 'Control',
  published: {
    apiVersion: '3.8',
    otherMapParams: 'sensor=true&libraries=geometry,places',
    zoom: 16,
    center: null
  },
  events: {
    onMapCreated: ''
  },
  constructor: function() {
    this.inherited(arguments);
    this.center = {
      lat: 37.787186,
      lng: -122.401037
    };
  },
  components: [
    {name: 'map', classes: 'enyo-google-map-map'},
    {name: 'client'}
  ],
  //* @protected
  create: function() {
    this.inherited(arguments);
    this.load();
  },
  load: function() {
    google.load('maps', this.apiVersion, {
      callback: enyo.bind(this, 'apiLoadHandler'),
      other_params: this.otherMapParams});
  },
  apiLoadHandler: function() {
    this.apiLoaded = true;
    if (this.hasNode()) {
      this.createMap();
    }
  },
  createMap: function() {
    if (this.map) {
      this.destroyMap();
    }
    if (this.$.map.hasNode()) {
      this.map = new google.maps.Map(this.$.map.node, {
        center: new google.maps.LatLng(this.center.lat, this.center.lng),
        zoom: this.zoom,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        modeDiagnostics: false
      });
      this.doMapCreated();
    }
  },
  destroyMap: function() {
    this.map = null;
  },
  updateCenter: function() {
    var latlng = new google.maps.LatLng(this.center.lat, this.center.lng);
    this.map.panTo(latlng);
  },
  setCenter: function(inLat, inLng) {
    this.center.lat = inLat;
    this.center.lng = inLng;
    this.updateCenter();
  }
});
