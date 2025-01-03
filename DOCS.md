# Skript Docs
> [!WARNING]
> This file was automatically generated and should not be edited manually.
> This file can be generated using `skutils update-docs-md`.
## Table of Contents
- [Color_hexToRGB](#Color_hexToRGB)
- [Color_rgbToHex](#Color_rgbToHex)
- [Color_hslToHex](#Color_hslToHex)
- [hsl](#hsl)
- [Direction_reverse](#Direction_reverse)
- [Direction_getFromVector](#Direction_getFromVector)
- [File_preventBacktracking](#File_preventBacktracking)
- [File_formatFileList](#File_formatFileList)
- [File_getFilesInDir](#File_getFilesInDir)
- [File_recGetFilesInDir](#File_recGetFilesInDir)
- [File_getRelativePath](#File_getRelativePath)
- [File_getRelativeFileContent](#File_getRelativeFileContent)
- [File_fixPath](#File_fixPath)
- [File_fixBackslashes](#File_fixBackslashes)
- [List_removeEmptyEntries](#List_removeEmptyEntries)
- [List_getDuplicates](#List_getDuplicates)
- [List_cap](#List_cap)
- [List_isEmpty](#List_isEmpty)
- [Location_getExtremes](#Location_getExtremes)
- [Location_checkAABB](#Location_checkAABB)
- [Location_parseChunk](#Location_parseChunk)
- [Location_vectorDistance](#Location_vectorDistance)
- [Number_parse](#Number_parse)
- [Number_format](#Number_format)
- [Server_getPath](#Server_getPath)
- [Test_announce](#Test_announce)
- [Test_assert](#Test_assert)
- [Test_assertNotEqual](#Test_assertNotEqual)
- [Test_assertArray](#Test_assertArray)
- [Test_assertArrayNotEqual](#Test_assertArrayNotEqual)
- [Test_runInternalTests](#Test_runInternalTests)
- [Text_format](#Text_format)
- [Text_coloredBoolean](#Text_coloredBoolean)
- [Text_toSmallFont](#Text_toSmallFont)
- [Text_removeColorCodes](#Text_removeColorCodes)
- [Text_formatText](#Text_formatText)
- [Text_toNumber](#Text_toNumber)
- [Time_ago](#Time_ago)
- [Time_agoUnix](#Time_agoUnix)
- [Time_durationBetween](#Time_durationBetween)
- [Time_durationBetweenUnix](#Time_durationBetweenUnix)
- [Time_getUnixFromStr](#Time_getUnixFromStr)
- [Time_getStrFromUnix](#Time_getStrFromUnix)
- [Time_getDurationString](#Time_getDurationString)
- [Vector_parseFromString](#Vector_parseFromString)
- [Vector_getLookVector](#Vector_getLookVector)
- [Vector_random](#Vector_random)
## Color_hexToRGB
Converts a hex color to RGB
Should either start with "##" or nothing at all. A single "#" will not function properly.
### Authors
- Sorbon
### Parameters
- **hex** (string) - The hex color to convert
### Returns
- **numbers** - The RGB values
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Color_hexToRGB("##ff00ff")
#   -> rgb(255, 0, 255)
```
```vb
# This example shows correct usage.
Color_hexToRGB("66ff66")
#   -> rgb(102, 255, 102)
```
```vb
# This example shows wrong usage.
! Color_hexToRGB("#66ff66")
#   -> rgb(0, 111, 246)
```
## Color_rgbToHex
Converts RGB color to HEX color (hashtag excluded)
### Authors
- Sorbon
### Parameters
- **red** (integer) - The red value of the color
- **green** (integer) - The green value of the color
- **blue** (integer) - The blue value of the color
### Returns
- **** - 
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Color_rgbToHex(255, 0, 0)
#   -> "FF0000"
```
```vb
# This example shows correct usage.
Color_rgbToHex(0, 255, 0)
#   -> "00FF00"
```
```vb
# This example shows correct usage.
Color_rgbToHex(0, 0, 255)
#   -> "0000FF"
```
## Color_hslToHex
Converts HSL color to HEX color (hashtag excluded)
### Authors
- zNotChill
### Parameters
- **hue** (integer) - The hue of the color
- **saturation** (integer) - The saturation of the color
- **lightness** (integer) - The lightness of the color
### Returns
- **** - 
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Color_hslToHex(0, 100, 50)
#   -> "FF0000"
```
```vb
# This example shows correct usage.
Color_hslToHex(120, 100, 50)
#   -> "00FF00"
```
```vb
# This example shows correct usage.
Color_hslToHex(240, 100, 50)
#   -> "0000FF"
```
## hsl
A shorthand to Color_hexToRGB
Converts HSL color to HEX color (hashtag excluded)
### Authors
- zNotChill
### Parameters
- **hue** (integer) - The hue of the color
- **saturation** (integer) - The saturation of the color
- **lightness** (integer) - The lightness of the color
### Returns
- **** - 
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
hsl(0, 100, 50)
#   -> "FF0000"
```
```vb
# This example shows correct usage.
hsl(120, 100, 50)
#   -> "00FF00"
```
```vb
# This example shows correct usage.
hsl(240, 100, 50)
#   -> "0000FF"
```
## Direction_reverse
Reverses a direction
### Authors
- miberss
### Parameters
- **dir** (direction) - The direction to reverse
### Returns
- **direction** - The reversed direction
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Direction_reverse(north)
#   -> south
```
## Direction_getFromVector
Gets a direction from a cardinal vector
### Authors
- miberss
### Parameters
- **vec** (vector) - The vector, that will be getting turned into a direction
### Returns
- **direction** - The direction
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Direction_getFromVector(vector(0,0,-1))
#   -> north
```
## File_preventBacktracking
Prevents backtracking in a file path
### Authors
- zNotChill
### Parameters
- **path** (string) - The path to prevent backtracking in
### Returns
- **string** - The path without backtracking
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
File_preventBacktracking("/.././test")
#   -> "./test"
```
## File_formatFileList
Formats a file list
### Authors
- zNotChill
### Parameters
- **fileList** (string) - The file list to format
### Returns
- **strings** - The formatted file list
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.util.ArrayList
### Example(s)
```vb
# This example shows correct usage.
File_formatFileList("[plugins\Skript.jar, plugins\skript-reflect.jar]")
#   -> ["plugins\Skript.jar", "plugins\skript-reflect.jar"]
```
## File_getFilesInDir
Gets the files in a directory
### Authors
- zNotChill
### Parameters
- **path** (string) - The path of the directory
### Returns
- **strings** - The files in the directory
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.io.File
### Example(s)
```vb
# This example shows correct usage.
File_getFilesInDir("plugins")
#   -> ["plugins\Skript.jar", "plugins\skript-reflect.jar"]
```
## File_recGetFilesInDir
Recursively gets the files in a directory
### Authors
- zNotChill
### Parameters
- **path** (string) - The path of the directory
### Returns
- **strings** - The files in the directory
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.nio.file.DirectoryStream
- java.nio.file.Files
- java.io.File
### Example(s)
```vb
# This example shows correct usage.
File_recGetFilesInDir("plugins")
#   -> ["plugins\Example.jar", "plugins\Example2.jar", "plugins\Example\config.yml"]
```
## File_getRelativePath
Gets the relative path of a file
### Authors
- zNotChill
### Parameters
- **path** (string) - The path of the file
### Returns
- **string** - The relative path of the file
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
File_getRelativePath("plugins")
#   -> "plugins"
```
## File_getRelativeFileContent
Gets the content of a file relative to the server path
### Authors
- zNotChill
### Parameters
- **relative_path** (string) - The relative path of the file
### Returns
- **string** - The content of the file
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.nio.file.Files
- java.nio.file.Paths
### Example(s)
```vb
# This example shows correct usage.
File_getRelativeFileContent("eula.txt")
#   -> "eula=true"
```
## File_fixPath
Fixes slashes in a file path
### Authors
- zNotChill
### Parameters
- **path** (string) - The path to fix slashes in
### Returns
- **string** - The path with fixed slashes
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
File_fixPath("/plugins/")
#   -> "\\plugins\\"
```
## File_fixBackslashes
Fixes backslashes in a file path
### Authors
- zNotChill
### Parameters
- **path** (string) - The path to fix backslashes in
### Returns
- **string** - The path with fixed backslashes
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
File_fixBackslashes("\\plugins\\")
#   -> "/plugins/"
```
## List_removeEmptyEntries
Removes empty entries from a list
### Authors
- zNotChill
### Parameters
- **list** (strings) - The list to remove empty entries from
### Returns
- **strings** - The list without empty entries
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.util.ArrayList
### Example(s)
```vb
# This example shows correct usage.
List_removeEmptyEntries("a", "", "b")
#   -> "a", "b"
```
## List_getDuplicates
Gets the duplicates in a list
### Authors
- zNotChill
### Parameters
- **list** (objects) - The list to get duplicates from
### Returns
- **objects** - The duplicates in the list
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
*No examples provided. Maybe you can help by providing one?*
## List_cap
Caps a list
### Authors
- zNotChill
### Parameters
- **list** (objects) - The list to cap
- **cap** (number) - The cap of the list
### Returns
- **objects** - The capped list
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
List_cap("a", "b", "c", 2)
#   -> "a", "b"
```
## List_isEmpty
Checks if a list is empty
### Authors
- zNotChill
### Parameters
- **list** (objects) - The list to check
### Returns
- **boolean** - Whether the list is empty
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
List_isEmpty("a", "b", "c")
#   -> false
```
## Location_getExtremes
Gets the extremes of two locations
Lowest corner is always the first in the returned list
### Authors
- zNotChill
### Parameters
- **pos1** (location) - The first position
- **pos2** (location) - The second position
### Returns
- **locations** - The lowest and highest corners
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Location_getExtremes(location(10, 10, 10), location(5, 5, 5))
#   -> location(5, 5, 5), location(10, 10, 10)
```
## Location_checkAABB
Checks if a location is within an AABB
### Authors
- zNotChill
### Parameters
- **loc** (location) - The location to check
- **corner1** (location) - The first corner of the AABB
- **corner2** (location) - The second corner of the AABB
### Returns
- **boolean** - Whether the location is within the AABB
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Location_checkAABB(location(5, 5, 5), location(10, 10, 10), location(0, 0, 0))
#   -> true
```
## Location_parseChunk
Parses a chunk from a string Vector2 location
### Authors
- miberss
### Parameters
- **chunk** (string) - The chunk to parse
### Returns
- **location** - The parsed chunk coordinates
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Location_parseChunk("world:0,0")
#   -> chunk (0,0) of world
```
## Location_vectorDistance
Gets the distance between two locations as a vector
### Authors
- zNotChill
### Parameters
- **loc1** (location) - The first location
- **loc2** (location) - The second location
### Returns
- **vector** - The vector distance between the two locations
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Location_vectorDistance(location(10, 10, 10), location(20, 20, 20))
#   -> vector(10, 10, 10)
```
## Number_parse
Parses a number into a string formatted by commas (e.g. 1,000,000)
### Authors
- Unknown
### Parameters
- **val** (number) - The number to parse
### Returns
- **text** - The parsed number
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Number_parse(1000000)
#   -> "1,000,000"
```
## Number_format
Formats a number into a string with a suffix (e.g. 1,000 -> 1k)
### Authors
- Unknown
### Parameters
- **n** (number) - The number to format
### Returns
- **text** - The formatted number
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Number_format(1000)
#   -> "1k"
```
## Server_getPath
Returns the path of the server
### Authors
- zNotChill
### Parameters
### Returns
- **string** - The path of the server
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.io.File
### Example(s)
```vb
# This example shows correct usage.
Server_getPath()
#   -> "D:\Server\"
```
## Test_announce
Announces the result of a test
### Authors
- zNotChill
### Parameters
- **test_id** (string) - The ID of the test
- **success** (boolean) - Whether the test succeeded
- **is_not_equal_test** (boolean) - Whether the test is a "not equal" assertion
### Returns
- **** - 
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
*No examples provided. Maybe you can help by providing one?*
## Test_assert
Compares a value to an expected value
### Authors
- zNotChill
### Parameters
- **test_id** (string) - The ID of the test
- **value** (object) - The value to assert
- **expected** (object) - The expected value
### Returns
- **boolean** - Whether the assertion succeeded
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Test_assert("Color_hexToRGB", Color_hexToRGB("##ff0000"), rgb(255, 0, 0))
#   -> true
```
## Test_assertNotEqual
Compares a value to an expected value, but asserts that they are not equal
### Authors
- zNotChill
### Parameters
- **test_id** (string) - The ID of the test
- **value** (object) - The value to assert
- **expected** (object) - The expected value
### Returns
- **boolean** - Whether the assertion succeeded
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Test_assertNotEqual("Color_hexToRGB", Color_hexToRGB("##ff0000"), rgb(255, 0, 0))
#   -> false
```
## Test_assertArray
Compares an array to an expected array
### Authors
- zNotChill
### Parameters
- **test_id** (string) - The ID of the test
- **value** (objects) - The array to assert
- **expected** (objects) - The expected array
### Returns
- **boolean** - Whether the assertion succeeded
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Test_assertArray("List_removeEmptyEntries", List_removeEmptyEntries("a", "", "b"), ("a", "b"))
#   -> true
```
## Test_assertArrayNotEqual
Compares an array to an expected array, but asserts that they are not equal
### Authors
- zNotChill
### Parameters
- **test_id** (string) - The ID of the test
- **value** (objects) - The array to assert
- **expected** (objects) - The expected array
### Returns
- **boolean** - Whether the assertion succeeded
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Test_assertArrayNotEqual("List_removeEmptyEntries", List_removeEmptyEntries("a", "", "b"), ("a", "b"))
#   -> false
```
## Test_runInternalTests
Runs an internal test for each utility
### Authors
- zNotChill
### Parameters
### Returns
- **** - 
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.io.File
### Example(s)
*No examples provided. Maybe you can help by providing one?*
## Text_format
Formats a string with multiple values
### Authors
- zNotChill
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
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_format("Hello, %%s!", "world")
#   -> "Hello, world!"
```
## Text_coloredBoolean
Returns a colored string based on a boolean value
### Authors
### Parameters
- **value** (boolean) - The boolean value
### Returns
- **string** - The colored string
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_coloredBoolean(true)
#   -> "&aTrue"
```
## Text_toSmallFont
Converts text to small font
### Authors
- zNotChill
### Parameters
- **text** (string) - The text to convert
### Returns
- **string** - The converted text
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_toSmallFont("Hello, world!")
#   -> "ʜᴇʟʟᴏ, ᴡᴏʀʟᴅ!"
```
## Text_removeColorCodes
Removes color codes from a string
### Authors
- zNotChill
### Parameters
- **text** (string) - The text to remove color codes from
### Returns
- **string** - The text without color codes
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_removeColorCodes("&aHello, &cworld!")
#   -> "Hello, world!"
```
## Text_formatText
Formats text
### Authors
- zNotChill
### Parameters
- **text** (string) - The text to format
### Returns
- **string** - The formatted text
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_formatText("st:Hello, world!")
#   -> "ʜᴇʟʟᴏ, ᴡᴏʀʟᴅ!"
```
## Text_toNumber
Converts a string to a number
### Authors
- zNotChill
### Parameters
- **text** (string) - The text to convert
### Returns
- **number** - The converted number
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Text_toNumber("5")
#   -> 5
```
## Time_ago
Returns a string representing the time elapsed since the given time
Parameter "from" is optional but can be used to compare the time to a different time than the current system time
### Authors
- zNotChill
### Parameters
- **timeStr** (string): 0 - The time to compare
- **from** (string) - The time to compare from
### Returns
- **string** - The time elapsed since the given time
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
- java.time.Duration
### Example(s)
```vb
# This example shows correct usage.
Time_ago("2021-01-01T00:00:00Z")
#   -> "1421 days ago"
```
## Time_agoUnix
Returns a string representing the time elapsed since the given time
Parameter "from" is optional but can be used to compare the time to a different time than the current system time
### Authors
- zNotChill
### Parameters
- **time** (integer) - The time to compare
- **from** (string) - The time to compare from
### Returns
- **string** - The time elapsed since the given time
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
- java.time.Duration
### Example(s)
```vb
# This example shows correct usage.
Time_agoUnix(1612137600)
#   -> "1390 days ago"
```
## Time_durationBetween
Returns a string representing the duration between two times
### Authors
- zNotChill
### Parameters
- **timeStr1** (string) - The first time
- **timeStr2** (string) - The second time
### Returns
- **string** - The duration between the two times
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
- java.time.Duration
### Example(s)
```vb
# This example shows correct usage.
Time_durationBetween("2024-01-01T00:00:00Z", "2025-01-01T00:00:00Z")
#   -> "366 days"
```
## Time_durationBetweenUnix
Returns a string representing the duration between two times
### Authors
- zNotChill
### Parameters
- **time1** (integer) - The first time
- **time2** (integer) - The second time
### Returns
- **string** - The duration between the two times
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
- java.time.Duration
### Example(s)
```vb
# This example shows correct usage.
Time_durationBetweenUnix(1612137600, 1612139000)
#   -> "23 minutes"
```
## Time_getUnixFromStr
Returns the Unix time from a string
### Authors
- zNotChill
### Parameters
- **timeStr** (string) - The time string
### Returns
- **integer** - The Unix time
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
### Example(s)
```vb
# This example shows correct usage.
Time_getUnixFromStr("2024-01-01T00:00:00Z")
#   -> 1704067200
```
## Time_getStrFromUnix
Returns the string from a Unix time
### Authors
- zNotChill
### Parameters
- **time** (integer) - The Unix time
### Returns
- **string** - The time string
### Dependencies (skript-reflect)
*Dependencies can be ignored if you are using the auto packager since this is done automatically.*
- java.time.Instant
### Example(s)
```vb
# This example shows correct usage.
Time_getStrFromUnix(1704067200)
#   -> "2024-01-01T00:00:00Z"
```
## Time_getDurationString
Returns a string representing the duration
### Authors
- zNotChill
### Parameters
- **duration** (integer) - The duration
### Returns
- **string** - The duration string
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Time_getDurationString(3661)
#   -> "1h 1m"
```
## Vector_parseFromString
Parses a string into a vector
### Authors
- zNotChill
### Parameters
- **str** (string) - The string to parse
### Returns
- **vector** - The vector
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Vector_parseFromString("x: 1, y: 2, z: 3")
#   -> vector(1, 2, 3)
```
## Vector_getLookVector
Gets the look vector of a location
### Authors
- zNotChill
### Parameters
- **loc** (location) - The location to get the look vector of
### Returns
- **vector** - The look vector
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Vector_getLookVector(location(0, 0, 0, world "", 10, 10))
#   -> vector(-0.17, -0.17, 0.97)
```
## Vector_random
Generates a random vector between -1 and 1
### Authors
- zNotChill
### Parameters
### Returns
- **vector** - The random vector
### Dependencies (skript-reflect)
No dependencies.
### Example(s)
```vb
# This example shows correct usage.
Vector_random()
#   -> vector(-0.86, 0.93, -0.36)
```