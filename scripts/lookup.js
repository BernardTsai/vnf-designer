//------------------------------------------------------------------------------
// lookup.js:
// contains lookup information which will be integrated into the view
// (should be included after view.js and jsyaml)
//------------------------------------------------------------------------------

view.lookups = jsyaml.safeLoad(`
---
datacenters:
  - IC-DEFRA1
  - IC-HUBUDB1
  - IC-PLWARB1
  - IC-HRZAGT1
  - IC-HRZAGF1
  - IC-HRVART1
  - IC-HRVARF1
  - IC-GRATHB1
  - IC-SKBRAT1
`)
