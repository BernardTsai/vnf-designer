<template>
    <div>
        <AppTopbar :model="model" :view="view" />
        <AppSidebarContent :model="model" :view="view" />
        <AppContent :model="model" :current="current" :target="target" :view="view" :templates="templates" />
        <modal v-if="view.modal !== ''" v-bind:view="view"></modal>
    </div>
</template>
<script>
import AppTopbar from './AppTopbar'
import AppContent from './AppContent'
import AppSidebarContent from './AppSidebarContent'
import modal from '../modal/index'
import { model, current, target } from '../../vnf_modules/model'
import { view } from '../../vnf_modules/view'
import { templates } from '../../vnf_modules/templates'

export default {
    data() {
        return {
            model: model,
            current: current,
            target: target,
            view: view,
            templates: templates
        }
    },
    components: {
        AppTopbar, AppContent, AppSidebarContent, modal
    }
}
</script>
<style>
div, input, select, textarea {
  box-sizing: border-box;
}

input, select {
  -webkit-appearance: none;
  -moz-appearance: none;
  /* appearance: none; */
  border-radius: 0px;
}

input, select {
  border: none;
  border-bottom: 1px solid darkgrey;
}

input:required, select:required {
  border-bottom: 1px solid red;
}

input[readonly] {
  border-bottom: none;
}

select {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA3XAAAN1wFCKJt4AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAAe0lEQVQYGWWNQQqAIBBFm6K1eBbpAOomWhQUXiaKgg7mtlNJ81PEaEDm+b7jVFUsSr1s0Sml2mTrIn0ZWS2lHLTWM4fBOdfggNktQogeQ2SMOViMuKCYJ3YbI+XdLE4iuvEghNB57y8wKu/myd1au0b9zfJPRfhzpcj8ABbkF5o44buYAAAAAElFTkSuQmCC') no-repeat 188px 4px;
}

select.valid {
  background-color: white;
}

textare:focus, select:focus, input:focus {
  border-color: green;
}
</style>