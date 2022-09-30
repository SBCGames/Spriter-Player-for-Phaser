# Spriter-Player-for-Phaser

## Installing from npm

```
npm install phaser-ce-spriter
```

The npm package contains the following outputs:

* Basic UMD bundle that works in browsers in `dist/spriter.js`
* Same, but minified & optimized in	`dist/spriter.min.js`
* CJS module, for use with `require` in `dist/cjs`
* ESM module, for use with `import` in `dist/esm`
* Source maps
* TypeScript definitions

(Note from package maintainer:
The setup follows roughly the guidelines from https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/)

## Changelog

**2022-09-30**

- Released to NPM as phaser-ce-spriter v1.0.0

</br>
</br>

**2022-03-19**

- fixed for Phaser 2.19.2

**2017-01-29**

- adjustments to allow proper work with BOX and POINT Spriter objects
- changed Test example - character now holds book in his hand if "I" key was pressed. This book is attached to Spriter POINT object, which is part of animation. Book is separate Phaser.Sprite image.

</br>
</br>

**2017-01-26**

- small bugfix. Objects of type BOX and POINT are processed now (their processing was accidentally commented out).
- added two new signals into Spriter.SpriterGroup: onBoxUpdated, onPointUpdated to listen for updates of BOX and POINT Spriter objects.

</br>
</br>

**2016-09-16**

- added optional parameter in Spriter.SpriterJSON and Spriter.SpriterXml of type IFileOptions. This parameter is object with some optional keys. Currently important is <b>imageNameType</b> of type Spriter.eImageNameType. It converts and returns name of image taken from Spriter animation file in this way (let's assume name in animation file is path/image_name.png):

NAME_ONLY (default): image_name</br>
NAME_AND_EXTENSION: image_name.png</br>
FULL_PATH_NO_EXTENSION: path/image_name</br>
ORIGINAL: path/image_name.png</br>

 So you can strip path, extension or both or keep original name.

</br>
</br>

**2016-07-08**

- added rest of easing functions - quartic, quintic, bezier,
- corrected loading tag from JSON files.

</br>
</br>

**2016-04-17**

Code is split into Spriter Player and Test example of usage.</br>
Newly, there are both Spriter Player and minimized version of player in Build directory.</br>
In Build directory you can also find Typescript definitions in spriter.d.ts file.

</br>
</br>

**2016-03-25**

Fixed bug when creating multiple instances of SpriterGroup pointing to the same Spriter animation (instances shared some variables with each other).

</br>
</br>

**2016-02-20**

Added Pro features:
 - character maps
 - tags
 - variables (int and float variables are not interpolated)
 - events
 - sound events (instead of playing sound directly, the player fires event with name of sound to be played)

Most of the code is rewritten.
 
Currently only loading of .scml (.xml) and .scon (.json) produced by Spriter export works. Loading of minimized versions and loading of binary will be added later.

</br>
</br>

**2015-10-30**

Play animations made with Spriter in Phaser engine. Load .xml, .json or special compact binary format.

Supports only features in free version of Spriter.

Can load .xml/.scml and .json/.scon exported directly from Spriter or files minimized with [SpriterMinimizer] (https://github.com/SBCGames/SpriterMinimizer) as well as compact binary output created with SpriterMinimizer.

In [src/States/Test.ts] (https://github.com/SBCGames/Spriter-Player-for-Phaser/blob/master/Spriter/src/States/Test.ts) play with loading .xml, .json, .bin.

