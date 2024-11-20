# skript-utils

An ever-expanding library of Skript utilities, all packaged into one file with only the utilities you use.

# Install (Deno 2.0.5)

```
$    deno install -n skutils --allow-read --allow-write --allow-env --allow-sys ./cli.ts -f --global
```

# TODO

- make the packager ignore commented lines in the utils scripts

# Reviews
![hi](https://i.gyazo.com/049422ae73d4b84dfc1cf226c2390fbc.png)
![hi](https://i.gyazo.com/d44585b71be2c4c3026700208f440dd9.png)

# SkDoc formatting

```
# @name List_removeEmptyEntries
# @description Removes empty entries from a list
#
# @authors zNotChill
# @param {strings} list - The list to remove empty entries from
# @returns {strings} - The list without empty entries
# @dependencies java.util.ArrayList
# @example List_removeEmptyEntries("a", "", "b") -> "a", "b"
```

##### as JSON:

```json
{
  "parameters": [
    {
      "unchangedName": "list",
      "type": "strings",
      "description": "The list to remove empty entries from"
    }
  ],
  "dependencies": [
    {
      "class": "java.util.ArrayList"
    }
  ],
  "name": "List_removeEmptyEntries",
  "description": "Removes empty entries from a list",
  "authors": [
    "zNotChill"
  ],
  "returns": {
    "type": "strings",
    "description": "The list without empty entries"
  },
  "example": {
    "function": "List_removeEmptyEntries(\"a\", \"\", \"b\")",
    "returnedExample": "\"a\", \"b\""
  }
}
```