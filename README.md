# github-action-json-file-properties

Read JSON file and set properties to `output` of github action `steps`.

## Usage

Examples:

Get properties

```yaml
---
- name: get properties
  id: json_properties
  uses: zoexx/github-action-json-file-properties@release
  with:
    file_path: "package.json"

- run: |
    echo ${{steps.json_properties.outputs.name}}
    echo ${{steps.json_properties.outputs.version}}
```

Get a specified property **value** with `prop_path`

```yaml
---
- name: get specified property
  id: repository_type
  uses: zoexx/github-action-json-file-properties@release
  with:
    file_path: "package.json"
    prop_path: "repository.type"

- run: |
    echo ${{steps.repository_type.outputs.value}}
```
