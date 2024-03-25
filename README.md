<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->
# AST Parser

A parser that converts `.ts` files into human readable objects.  

---
Example usage of `parse` function from `./parser.ts`:

1) [Example file to parse](#1)
2) [Calling the `parse` function](#2)
3) [Example output from `parse`](#3)
---

# 1.

**Example file to parse.**

Given the following file `path/to/my-component.ts`

```ts
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgFor, NgIf} from "@angular/common";
import {Observable} from "rxjs";


@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html',
  styleUrls: ['my-component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ]
})
class MyComponent {

  @Input({required: true}) myRequiredInput?: string;
  @Input('alias') myAliasedInput?: string;

  @Output() myOutput = new EventEmitter<string>();

  public someValue?: Observable<boolean>;

  public myMethod() {
    return 'myMethod';
  }
}
```

# 2.

**Calling the `parse` function**

```ts
import {
  CommonPathHandler,
  JBRPathHandler,
  NgPathHandler,
  NodeModulesPathHandler,
  RxjsPathHandler,
  AngularMaterialPathHandler,
  parseDeclaration,
  parse
} from "@jamesbenrobb/ts";


const pathHandlers = [
  new CommonPathHandler(),
  new NodeModulesPathHandler(),
  new AngularMaterialPathHandler(),
  new NgPathHandler(),
  new RxjsPathHandler(),
  new JBRPathHandler()
]

const sourcePath = 'path/to/my-component.ts';

const source = parse({
  debug: false,
  lazy: false,
  walk: false,
  nodeParseFn: parseDeclaration,
  sourcePath,
  pathHandlers
});

console.log(source);
```

# 3.

**Example output from `parse`**

```json
{
  "kind": "sourceFile",
  "fileName": "my-component.ts",
  "path": "/path/to/",
  "imports": [
    {
      "name": "Component",
      "module": "@angular/core",
      "resolvedModulePath": "@angular/core",
      "convertedModulePath": "https://angular.io/api/core/Component"
    },
    {
      "name": "EventEmitter",
      "module": "@angular/core",
      "resolvedModulePath": "@angular/core",
      "convertedModulePath": "https://angular.io/api/core/EventEmitter"
    },
    {
      "name": "Input",
      "module": "@angular/core",
      "resolvedModulePath": "@angular/core",
      "convertedModulePath": "https://angular.io/api/core/Input"
    },
    {
      "name": "Output",
      "module": "@angular/core",
      "resolvedModulePath": "@angular/core",
      "convertedModulePath": "https://angular.io/api/core/Output"
    },
    {
      "name": "NgFor",
      "module": "@angular/common",
      "resolvedModulePath": "@angular/common",
      "convertedModulePath": "https://angular.io/api/common/NgFor"
    },
    {
      "name": "NgIf",
      "module": "@angular/common",
      "resolvedModulePath": "@angular/common",
      "convertedModulePath": "https://angular.io/api/common/NgIf"
    },
    {
      "name": "Observable",
      "module": "rxjs",
      "resolvedModulePath": "rxjs",
      "convertedModulePath": "https://rxjs.dev/api/index/class/Observable"
    }
  ],
  "exports": [
    {
      "kind": "class",
      "name": "MyComponent",
      "children": [
        {
          "kind": "decorator",
          "type": "Component",
          "metadata": {
            "selector": "my-component",
            "templateUrl": "my-component.html",
            "styleUrls": ["my-component.css"],
            "standalone": true,
            "imports": ["NgIf", "NgFor"]
          },
          "signature": "@Component({selector: my-component, templateUrl: my-component.html, styleUrls: [my-component.css], standalone: true, imports: [\n    NgIf,\n    NgFor\n  ]})",
          "raw": "@Component({\n  selector: 'my-component',\n  templateUrl: 'my-component.html',\n  styleUrls: ['my-component.css'],\n  standalone: true,\n  imports: [\n    NgIf,\n    NgFor\n  ]\n})"
        },
        {
          "kind": "property",
          "name": "myRequiredInput",
          "type": "string",
          "optional": true,
          "exclamation": false,
          "signature": "@Input({required: true})\nmyRequiredInput?: string",
          "raw": "@Input({required: true}) myRequiredInput?: string;",
          "decorators": [
            {
              "kind": "decorator",
              "type": "Input",
              "metadata": {
                "required": "true"
              },
              "signature": "@Input({required: true})",
              "raw": "@Input({required: true})"
            }
          ]
        },
        {
          "kind": "property",
          "name": "myAliasedInput",
          "type": "string",
          "optional": true,
          "exclamation": false,
          "signature": "@Input('alias')\nmyAliasedInput?: string",
          "raw": "@Input('alias') myAliasedInput?: string;",
          "decorators": [
            {
              "kind": "decorator",
              "type": "Input",
              "metadata": "alias",
              "signature": "@Input('alias')",
              "raw": "@Input('alias')"
            }
          ]
        },
        {
          "kind": "property",
          "name": "myOutput",
          "optional": false,
          "exclamation": false,
          "initializedValue": "new EventEmitter<string>()",
          "signature": "@Output()\nmyOutput = new EventEmitter<string>()",
          "raw": "@Output() myOutput = new EventEmitter<string>();",
          "decorators": [
            {
              "kind": "decorator",
              "type": "Output",
              "signature": "@Output()",
              "raw": "@Output()"
            }
          ]
        },
        {
          "kind": "property",
          "name": "someValue",
          "type": "Observable<boolean>",
          "optional": true,
          "exclamation": false,
          "signature": "public someValue?: Observable<boolean>",
          "raw": "public someValue?: Observable<boolean>;"
        },
        {
          "kind": "method",
          "name": "myMethod",
          "parameters": [],
          "signature": "public myMethod(): void"
        }
      ]
    }
  ]
}
```
