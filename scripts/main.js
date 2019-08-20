var app

function main() {
  app = new Vue({
    el:   '#app',
    data: {model: model, view: view, templates: templates},
    template: `
      <app
        v-bind:model="model"
        v-bind:current="current"
        v-bind:target="target"
        v-bind:view="view"
        v-bind:templates="templates">
      </app>`
  })
}

window.onload = main;
