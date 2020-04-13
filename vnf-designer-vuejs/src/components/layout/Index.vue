<template>
    <div>
        <AppTopbar :model="model" :view="view" />
        <AppSidebarContent :model="model" :view="view" />
        <AppContent :model="model" :current="current" :target="target" :view="view" :templates="templates" />
        <!-- <AppContent :model="model" :current="current" :target="target" :view="view" :templates="templates" /> -->
        <!-- <modal v-if="view.modal !== ''" v-bind:view="view"></modal> -->
    </div>
</template>
<script>
import AppTopbar from './AppTopbar'
import AppContent from './AppContent'
import AppSidebarContent from './AppSidebarContent'
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
        AppTopbar, AppContent, AppSidebarContent
    }
}
</script>