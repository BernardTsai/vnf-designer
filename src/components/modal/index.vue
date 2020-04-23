<template>
    <div id="modal">
      <div class="content">
        <span v-on:click="close" class="close">&times;</span>
        <span v-html="html"></span>
      </div>
    </div>
</template>
<script>
export default {
    props:   ['view'],
    computed: {
      html: function() {
        var lines = this.view.modal.split("\n");
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
        this.view.modal = ""
        if (this.view.field) {
          var el = document.getElementById(this.view.field);

          if (el) { el.focus() }
        }
      }
    }
}
</script>
<style scoped>
#modal {
    position:         fixed;
    left:             0;
    top:              0;
    width:            100%;
    height:           100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition:       visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}

#modal .content {
    position:         absolute;
    top:              25%;
    left:             50%;
    transform:        translate(-50%, -50%);
    background-color: white;
    padding:          1rem 1.5rem;
    width:            24rem;
    border-radius:    0.5rem;
}

#modal .close {
    float:            right;
    width:            1.5rem;
    line-height:      1.5rem;
    text-align:       center;
    cursor:           pointer;
    border-radius:    0.25rem;
    background-color: lightgray;
}

#modal .close:hover {
    background-color: darkgray;
}

</style>