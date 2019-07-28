Vue.component( 'modal',
  {
    props:   ['view'],
    computed: {
      html: function() {
        var lines = view.modal.split("\n");
        var title = "<h2>" + lines[0] + "</h2>"
        var msgs  = ""

        for ( var index = 1; index < lines.length; index ++) {
          var line  = lines[index]
          var pos   = line.indexOf(":")

          if ( pos < 0 ) {
            msgs = msgs + line + "<br/>"
          } else {
            var subtitle = line.substr(0, pos)
            var text     = line.substr(pos+1)

            msgs = msgs + "<b>" + subtitle + ":</b> " + text + "<br/>"
          }
          var parts = line.split(":",1)
        }

        return title + msgs
      }
    },
    methods: {
      close: function() {
        view.modal = ""
        if (view.field) {
          var el = document.getElementById(view.field);

          if (el) { el.focus() }
        }
      }
    },
    template: `
    <div id="modal">
      <div class="content">
        <span v-on:click="close" class="close">&times;</span>
        <span v-html="html"></span>
      </div>
    </div>`
  }
)
