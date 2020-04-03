<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Credits_0"></a>Credits
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      This project is based on the wonderful work of following projects:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="5" data-line-end="6">
        <strong>AJV</strong>: a JSON Schema Validator by Evgeny Poberezkin (<a
          href="https://github.com/epoberezkin/ajv"
          >https://github.com/epoberezkin/ajv</a
        >)
      </li>
      <li class="has-line-data" data-line-start="6" data-line-end="7">
        <strong>Font Awesome</strong>: great free fonts provided by Font Awesome
        (<a href="https://fontawesome.com">https://fontawesome.com</a>)
      </li>
      <li class="has-line-data" data-line-start="7" data-line-end="8">
        <strong>js-yaml</strong>: a YAML parser by Vitaly Puzrin (<a
          href="https://github.com/nodeca/js-yaml"
          >https://github.com/nodeca/js-yaml</a
        >)
      </li>
      <li class="has-line-data" data-line-start="8" data-line-end="9">
        <strong>jszip</strong>: a tool for managing ZIP files by Stuart
        Knightley, David Duponchel, Franz Buchinger and António Afonso (<a
          href="https://stuk.github.io/jszip"
          >https://stuk.github.io/jszip</a
        >)
      </li>
      <li class="has-line-data" data-line-start="9" data-line-end="10">
        <strong>marked</strong>: a tool to convert markdown into HTML by
        Christopher Jeffrey (<a href="https://github.com/markedjs/marked"
          >https://github.com/markedjs/marked</a
        >)
      </li>
      <li class="has-line-data" data-line-start="10" data-line-end="11">
        <strong>nunjucks</strong>: a templating tool by James Long (<a
          href="https://github.com/mozilla/nunjucks"
          >https://github.com/mozilla/nunjucks</a
        >)
      </li>
      <li class="has-line-data" data-line-start="11" data-line-end="13">
        <strong>vue</strong>: a UI framework by Yuxi (Evan) You (<a
          href="https://github.com/vuejs/vue"
          >https://github.com/vuejs/vue</a
        >)
      </li>
    </ul>
    <p class="has-line-data" data-line-start="13" data-line-end="14">
      and the support of my dear family.
    </p>
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a style="text-decoration: none;" href @click.prevent="swapDoc('readme')"
        >overview</a
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    swapDoc(docname) {
      this.$emit("swapDoc", docname);
    }
  }
};
</script>
