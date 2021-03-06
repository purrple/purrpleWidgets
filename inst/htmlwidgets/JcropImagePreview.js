HTMLWidgets.widget({

  name: 'JcropImagePreview',

  type: 'output',

  factory: function(el, width, height) {

    var ready = false ;
    var id = el.id ;
    var image_id = null;
    var $img = null ;
    var $source ;
    var aspect_ratio = null ;

    return {

      renderValue: function(x) {
        image_id = x.image ;
        if( !ready ){
          var node =
            '<div id="' + id + '-preview-pane" class="jcrop-preview-pane">' +
            '  <div class="preview-container">' +
            '    <img class="jcrop-preview" />' +
            '  </div>' +
            '</div>'
          ;

          $(el).append(node) ;
          $(el).css( { margin: "auto" }) ;

          ready = true ;
        }

        if( x.event ){
          var event = x.event ;
          aspect_ratio = event.w / event.h ;

          $img = $("#" + id + " div div img") ;
          $container = $("#" + id ) ;
          $preview_pane = $("#" + id  + " div:first") ;

          $source= $("#" + image_id + " div img:first");

          $img.attr("src", $source.attr("src") ) ;

          var boundx = $source.width() ;
          var boundy = $source.height() ;

          var width  = $container.width() ;
          var height = $container.height() ;
          var xsize  = width ;
          var ysize  = height ;
          if( width / aspect_ratio > height){
            ysize = height ;
            xsize = height * aspect_ratio ;
          } else {
            xsize = width ;
            ysize = width / aspect_ratio ;
          }
          $preview_pane.width( xsize ) ;
          $preview_pane.height( ysize ) ;

          var rx = xsize / event.w;
          var ry = ysize / event.h;

          $img.css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * event.x) + 'px',
            marginTop: '-' + Math.round(ry * event.y) + 'px'
          }) ;

        } else if( $img ){
          $img.attr("src", null ) ;
        }

      },

      resize: function(width, height) {}

    };
  }
});
