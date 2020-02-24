# Library App


### Quick start
**Make sure you have Node version >= 6.0 and NPM >= 3**

```bash

# install the repo with npm
npm install
# or yarn
yarn

#build markup
npm run build

# start the server with watcher
npm run start
# go to http://localhost:3000 in your browser

```

## File Structure
```
markup-gulp-static/
 ├──dist/                           * build folder
 |   ├──css
 |   ├──fonts
 |   ├──img
 |   ├──js
 │   ├──index.html
 │
 ├──sources/                       * our source files
 |   ├──favicons                   * put all files for favicons
 |   ├──fonts                      * fonts
 |   ├──img                        * all images
 |   ├──js                         * js modules
 |   ├──libs                       * put js libs
 |   ├──styles                     * scss structure
 |      ├──001-kickstart           * helpers feat mixins
 |      ├──002-base                * main ui, all variables, fonts, grid, utilities
 |      ├──003-patterns            * patterns for modules
 |      ├──004-globals             * global blocks
 |      ├──005-pages               * common feat all pages
 |      ├──006-third-party         * wp styles if need
 |      ├──008-libs                * libs styles
 |      ├──core.scss               * import all files
 |   ├──svgs                       * put svg for sprite css/html 
 |   ├──views                      * simple example for jade structure
 |   
 ├──.gitignore                     * ignored files
 ├──gulpfile.js                    * tasks for build project
 ├──package.json                   * what npm uses to manage it's dependencies
 ├──webpack.config.js              * config for javascript modules
