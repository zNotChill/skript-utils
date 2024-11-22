# Skript Docs
## Color_hexToRGB
Converts a hex color to RGB
Should either start with "##" or nothing at all. A single "#" will not function properly.
### Parameters
- **hex** (string) - The hex color to convert
### Returns
- **numbers** - The RGB values
### Example
```vb
No example provided.
```
## Direction_reverse
Reverses a direction
### Parameters
- **dir** (direction) - The direction to reverse
### Returns
- **direction** - The reversed direction
### Example
```vb
Direction_reverse(north)
  # -> south
```
## Direction_getFromVector
Gets a direction from a cardinal vector
### Parameters
- **vec** (vector) - The vector, that will be getting turned into a direction
### Returns
- **direction** - The direction
### Example
```vb
Direction_getFromVector(vector(0,0,-1))
  # -> north
```
## File_preventBacktracking
Prevents backtracking in a file path
### Parameters
- **path** (string) - The path to prevent backtracking in
### Returns
- **string** - The path without backtracking
### Example
```vb
No example provided.
```
## File_formatFileList
Formats a file list
### Parameters
- **fileList** (string) - The file list to format
### Returns
- **strings** - The formatted file list
### Dependencies (skript-reflect)
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.util.ArrayList
### Example
```vb
No example provided.
```
## File_getFilesInDir
Gets the files in a directory
### Parameters
- **path** (string) - The path of the directory
### Returns
- **strings** - The files in the directory
### Dependencies (skript-reflect)
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.io.File
### Example
```vb
No example provided.
```
## File_recGetFilesInDir
Recursively gets the files in a directory
### Parameters
- **path** (string) - The path of the directory
### Returns
- **strings** - The files in the directory
### Dependencies (skript-reflect)
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.io.File
### Example
```vb
No example provided.
```
## File_getRelativePath
Gets the relative path of a file
### Parameters
- **path** (string) - The path of the file
### Returns
- **string** - The relative path of the file
### Example
```vb
No example provided.
```
## File_getRelativeFileContent
Gets the content of a file relative to the server path
### Parameters
- **relative_path** (string) - The relative path of the file
### Returns
- **string** - The content of the file
### Dependencies (skript-reflect)
- java.nio.file.Files
- java.nio.file.Paths
### Example
```vb
No example provided.
```
## File_fixPath
Fixes slashes in a file path
### Parameters
- **path** (string) - The path to fix slashes in
### Returns
- **string** - The path with fixed slashes
### Example
```vb
No example provided.
```
## File_fixBackslashes
Fixes backslashes in a file path
### Parameters
- **path** (string) - The path to fix backslashes in
### Returns
- **string** - The path with fixed backslashes
### Example
```vb
No example provided.
```
## List_removeEmptyEntries
Removes empty entries from a list
### Parameters
- **list** (strings) - The list to remove empty entries from
### Returns
- **strings** - The list without empty entries
### Dependencies (skript-reflect)
- java.util.ArrayList
### Example
```vb
List_removeEmptyEntries("a", "", "b")
  # -> "a", "b"
```
## List_getDuplicates
Gets the duplicates in a list
### Parameters
- **list** (objects) - The list to get duplicates from
### Returns
- **objects** - The duplicates in the list
### Example
```vb
No example provided.
```
## List_cap
Caps a list
### Parameters
- **list** (objects) - The list to cap
- **cap** (number) - The cap of the list
### Returns
- **objects** - The capped list
### Example
```vb
No example provided.
```
## List_isEmpty
Checks if a list is empty
### Parameters
- **list** (objects) - The list to check
### Returns
- **boolean** - Whether the list is empty
### Example
```vb
No example provided.
```
## Location_getExtremes
Gets the extremes of two locations
### Parameters
- **pos1** (location) - The first position
- **pos2** (location) - The second position
### Returns
- **locations** - The lowest and highest corners
### Example
```vb
No example provided.
```
## Location_checkAABB
Checks if a location is within an AABB
### Parameters
- **loc** (location) - The location to check
- **corner1** (location) - The first corner of the AABB
- **corner2** (location) - The second corner of the AABB
### Returns
- **boolean** - Whether the location is within the AABB
### Example
```vb
No example provided.
```
## Location_parseChunk
Parses a chunk from a string Vector2 location
### Parameters
- **chunk** (string) - The chunk to parse
### Returns
- **location** - The parsed chunk coordinates
### Example
```vb
Location_parseChunk("world:0,0")
  # -> chunk (0,0) of world
```
## Location_vectorDistance
Gets the distance between two locations as a vector
### Parameters
- **loc1** (location) - The first location
- **loc2** (location) - The second location
### Returns
- **vector** - The vector distance between the two locations
### Example
```vb
No example provided.
```
## Number_parse
Parses a number into a string formatted by commas (e.g. 1,000,000)
### Parameters
- **val** (number) - The number to parse
### Returns
- **text** - The parsed number
### Example
```vb
No example provided.
```
## Number_format
Formats a number into a string with a suffix (e.g. 1,000 -> 1k)
### Parameters
- **n** (number) - The number to format
### Returns
- **text** - The formatted number
### Example
```vb
No example provided.
```
## Server_getPath
Returns the path of the server
### Parameters
### Returns
- **string** - The path of the server
### Dependencies (skript-reflect)
- java.io.File
### Example
```vb
No example provided.
```
## Test_announce
Announces the result of a test
### Parameters
- **test_id** (string) - The ID of the test
- **success** (boolean) - Whether the test succeeded
### Returns
- No return value.
### Example
```vb
No example provided.
```
## Test_assert
Compares a value to an expected value
### Parameters
- **test_id** (string) - The ID of the test
- **value** (object) - The value to assert
- **expected** (object) - The expected value
### Returns
- No return value.
### Example
```vb
No example provided.
```
## Test_assertNotEqual
Compares a value to an expected value, but asserts that they are not equal
### Parameters
- **test_id** (string) - The ID of the test
- **value** (object) - The value to assert
- **expected** (object) - The expected value
### Returns
- No return value.
### Example
```vb
No example provided.
```
## Test_assertArray
Compares an array to an expected array
### Parameters
- **test_id** (string) - The ID of the test
- **value** (objects) - The array to assert
- **expected** (objects) - The expected array
### Returns
- No return value.
### Example
```vb
No example provided.
```
## Test_assertArrayNotEqual
Compares an array to an expected array, but asserts that they are not equal
### Parameters
- **test_id** (string) - The ID of the test
- **value** (objects) - The array to assert
- **expected** (objects) - The expected array
### Returns
- No return value.
### Example
```vb
No example provided.
```
## Test_runInternalTests
Runs an internal test for each utility
### Parameters
### Returns
- No return value.
### Dependencies (skript-reflect)
- java.io.File
### Example
```vb
No example provided.
```
## Text_format
Formats a string with multiple values
### Parameters
- **str** (string) - The string to format
- **val1** (string) - The first value
- **val2** (string) - The second value
- **val3** (string) - The third value
- **val4** (string) - The fourth value
- **val5** (string) - The fifth value
- **val6** (string) - The sixth value
- **val7** (string) - The seventh value
- **val8** (string) - The eighth value
- **val9** (string) - The ninth value
- **val10** (string) - The tenth value
### Returns
- **string** - The formatted string
### Example
```vb
No example provided.
```
## Text_coloredBoolean
Returns a colored string based on a boolean value
### Parameters
- **value** (boolean) - The boolean value
### Returns
- **string** - The colored string
### Example
```vb
No example provided.
```
## Text_toSmallFont
Converts text to small font
### Parameters
- **text** (string) - The text to convert
### Returns
- **string** - The converted text
### Example
```vb
No example provided.
```
## Text_removeColorCodes
Removes color codes from a string
### Parameters
- **text** (string) - The text to remove color codes from
### Returns
- **string** - The text without color codes
### Example
```vb
No example provided.
```
## Text_formatText
Formats text
### Parameters
- **text** (string) - The text to format
### Returns
- **string** - The formatted text
### Example
```vb
No example provided.
```
## Text_toNumber
Converts a string to a number
### Parameters
- **text** (string) - The text to convert
### Returns
- **number** - The converted number
### Example
```vb
No example provided.
```
## Time_ago
Returns a string representing the time elapsed since the given time
### Parameters
- **timeStr** (string): 0 - The time to compare
- **from** (string) - The time to compare from
### Returns
- **string** - The time elapsed since the given time
### Dependencies (skript-reflect)
- java.time.Instant
- java.time.Duration
### Example
```vb
No example provided.
```
## Time_agoUnix
Returns a string representing the time elapsed since the given time
### Parameters
- **time** (integer) - The time to compare
- **from** (string) - The time to compare from
### Returns
- **string** - The time elapsed since the given time
### Dependencies (skript-reflect)
- java.time.Instant
- java.time.Duration
### Example
```vb
No example provided.
```
## Time_durationBetween
Returns a string representing the duration between two times
### Parameters
- **timeStr1** (string) - The first time
- **timeStr2** (string) - The second time
### Returns
- No return value.
### Dependencies (skript-reflect)
- java.time.Instant
- java.time.Duration
### Example
```vb
No example provided.
```
## Time_durationBetweenUnix
Returns a string representing the duration between two times
### Parameters
- **time1** (integer) - The first time
- **time2** (integer) - The second time
### Returns
- No return value.
### Dependencies (skript-reflect)
- java.time.Instant
- java.time.Duration
### Example
```vb
No example provided.
```
## Time_getUnixFromStr
Returns the Unix time from a string
### Parameters
- **timeStr** (string) - The time string
### Returns
- **integer** - The Unix time
### Dependencies (skript-reflect)
- java.time.Instant
### Example
```vb
No example provided.
```
## Time_getStrFromUnix
Returns the string from a Unix time
### Parameters
- **time** (integer) - The Unix time
### Returns
- **string** - The time string
### Dependencies (skript-reflect)
- java.time.Instant
### Example
```vb
No example provided.
```
## Vector_parseFromString
Parses a string into a vector
### Parameters
- **str** (string) - The string to parse
### Returns
- **vector** - The vector
### Example
```vb
No example provided.
```
## Vector_getLookVector
Gets the look vector of a location
### Parameters
- **loc** (location) - The location to get the look vector of
### Returns
- **vector** - The look vector
### Example
```vb
No example provided.
```
## Vector_random
Generates a random vector between -1 and 1
### Parameters
### Returns
- **vector** - The random vector
### Example
```vb
No example provided.
```