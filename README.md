# Dynamic Template Generator

A generic tool for generating various outputs based on a dynamic input model and mustache templates.

## Template definitions

### Yaml

```
---
templates:
    - selector: "."
      source: "templates/test.mustache"
      target: "out/root.json"
      skipExisting: true,
      disabled: false
        
    - selector: "components.classes"
      source: "templates/test.mustache"
      target: "out/${components.name.kebabCased}/${this.name.kebabCased}.json"
      disabled: false
```

### Json

```
{
    "templates": [
        {
            "selector": ".",
            "source": "templates/test.mustache",
            "target": "out/root.json",
            "skipExisting": true,
            "disabled": false
        },
        {
            "selector": "components.classes",
            "source": "templates/test.mustache",
            "target": "out/${components.name.kebabCased}/${this.name.kebabCased}.json",
            "disabled": false
        }
    ]
}
```

## Input model (example)

### Yaml

```
---
name: Test
components:
- name: Component 1
  classes:
  - name: Class 1
  - name: Class 2
- name: Component 2
  classes:
  - name: Class 3
  - name: Class 4
params: {}
```

### Json

```
{
    "name": "Test",
    "components": [
        {
            "name": "Component 1",
            "classes": [
                {
                    "name": "Class 1"
                },
                {
                    "name": "Class 2"
                }
            ]
        },
        {
            "name": "Component 2",
            "classes": [
                {
                    "name": "Class 3"
                },
                {
                    "name": "Class 4"
                }
            ]
        }
    ],
    "params": {

    }
}
```