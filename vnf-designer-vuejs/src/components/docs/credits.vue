<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h1>Credits</h1>
    <p >
      This project is based on the wonderful work of following projects:
    </p>
    <ul>
      <li>
        <strong>AJV</strong>: a JSON Schema Validator by Evgeny Poberezkin (<a
          href="https://github.com/epoberezkin/ajv"
          >https://github.com/epoberezkin/ajv</a
        >)
      </li>
      <li>
        <strong>Font Awesome</strong>: great free fonts provided by Font Awesome
        (<a href="https://fontawesome.com">https://fontawesome.com</a>)
      </li>
      <li>
        <strong>js-yaml</strong>: a YAML parser by Vitaly Puzrin (<a
          href="https://github.com/nodeca/js-yaml"
          >https://github.com/nodeca/js-yaml</a
        >)
      </li>
      <li>
        <strong>jszip</strong>: a tool for managing ZIP files by Stuart
        Knightley, David Duponchel, Franz Buchinger and António Afonso (<a
          href="https://stuk.github.io/jszip"
          >https://stuk.github.io/jszip</a
        >)
      </li>
      <li>
        <strong>marked</strong>: a tool to convert markdown into HTML by
        Christopher Jeffrey (<a href="https://github.com/markedjs/marked"
          >https://github.com/markedjs/marked</a
        >)
      </li>
      <li>
        <strong>nunjucks</strong>: a templating tool by James Long (<a
          href="https://github.com/mozilla/nunjucks"
          >https://github.com/mozilla/nunjucks</a
        >)
      </li>
      <li>
        <strong>vue</strong>: a UI framework by Yuxi (Evan) You (<a
          href="https://github.com/vuejs/vue"
          >https://github.com/vuejs/vue</a
        >)
      </li>
    </ul>
    <p >
      and the support of my dear family.
    </p>
    <hr />
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
