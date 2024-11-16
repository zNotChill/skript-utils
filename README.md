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
# @name File_formatFileList
# @description Formats a file list
#
# @param {string} fileList - The file list to format
# @returns {strings} - The formatted file list
# @dependencies: java.nio.file.DirectoryStream, java.nio.file.Files, java.util.ArrayList
```