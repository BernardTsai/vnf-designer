<template>
<div class="wrapper">
  <div class="content">
    <div :is="currentDoc" @swapDoc="swapDoc"></div>
  </div>
</div>
</template>
<script>
import dynamic_import from '@/services/dynamic_imports'
let file_names = [
  'readme','introduction','installation','ui','usage','example','model','templates','credits','architecture','flavors','images','networks','components','tenant','validation','artefacts','imports','exports']
let components = dynamic_import({
  path: 'components/docs',
  file_names: file_names ,
  component_names: file_names
})
export default {
  data() {
    return {
      currentDoc: 'readme'
    }
  },
  components: components,
  methods: {
    swapDoc(docname){
      this.currentDoc = docname
    }
  },
}
</script>
<style>
a{
  text-decoration: none;
  text-transform: capitalize;
  color: #f36d33;
  border-bottom: 2px solid;
}
img {
  max-width: 100%;
  height: auto; /* default */
}
.content{
    grid-area: content;
}

.wrapper {
          display: grid;
    grid-gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
                grid-template-areas:
               ". content .";
}
.nav-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 10px;
      box-sizing: border-box;
}
.nav-grid-h4 {
    grid-area: 1 / 8 / auto / -1;
    margin: auto;
}
pre {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
}
/* pre {
	box-sizing: border-box;
	width: 100%;
	padding: 0;
	margin: 0;
	overflow: auto;
	overflow-y: hidden;
	font-size: 12px;
    line-height: 20px;
    background: #f4f4f4;
	border: 1px solid #777;
	padding: 10px;
	color: #333;
} */
</style>