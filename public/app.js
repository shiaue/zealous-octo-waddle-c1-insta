
$(document).ready(function() {

  var mapTiles = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
  var mapAttrib = "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors";

  var map = L.map("map").setView([0, 0], 2);
  map.addLayer(L.tileLayer(mapTiles, {attribution: mapAttrib}));

  var template = Handlebars.compile($("#cat-template").html());
  var markers = [];

  $("#map").hide();

  $("#toggle").click(function(e) {
    $("#toggle .button").removeClass("selected");
    $(e.target).addClass("selected");
    
    if (e.target.id == "grid-button") $("#map").hide();
    else $("#map").show();
  });

  function addCap(cap) {
    cap.date = moment.unix(cap.created_time).format("MMM DD, h:mm a");
    $("#cats").prepend(template(cap));

    if (cap.place) {
      var count = markers.unshift(L.marker(L.latLng(
          cap.place.coordinates[1],
          cap.place.coordinates[0])));

      map.addLayer(markers[0]);
      markers[0].bindPopup(
          "<img src=\"" + cap.images.thumbnail.url + "\">",
          {minWidth: 150, minHeight: 150});
      
      markers[0].openPopup();

      if (count > 100)
        map.removeLayer(markers.pop());
    }
  }

  var socket = io.connect();
  
  socket.on("c1", addCap);
  socket.on("recent", function(data) {
    data.reverse().forEach(addCap);
  });

});
