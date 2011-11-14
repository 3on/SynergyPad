function __$__ () {
  var h = $(window).height() - $("#header").first().outerHeight(true) - $(".infos").first().outerHeight(true)
  $(".left .newsFeed").height(h - 40)
  
  h -= $(".right .tabs-head").outerHeight(true)
  $(".right .tabs-body").height(h - 20)
}

$(function() {
  $(window).resize(__$__)
  $(document.body).change(__$__)
  __$__()
})