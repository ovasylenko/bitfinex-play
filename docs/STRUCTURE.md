# Project structure
## General File/Folder structure
* __*_build*__ - build css from Sass project
* __*app*__ - main aplication folder
* __*build*__ - folder for dumb html page
* __*.babelrc*__ - settings for babel tranformation, support for __ES6__, __ES7__ festure
* __*.eslintrc*__ - default lint settings for the project
* __*run.bat*__ - script to run watcher for styles and cem
* __*package.json*__ - list of used js packages
* __*webpack.config.js*__ - development config of webpack, runs dev server and watches file changes to rerender it in browser
* __*webpack.core.config.js*__ - development config of webpack, core config, compile, bundles and copy js file to the CEM .NET Core application. Used in CI TFS 
[Go To TFS Build Definition (VPN access required)](http://asctfsappsvr:8080/tfs/UnifiedPlatform/CEM.APP/_build/index?context=Mine&path=%5C&definitionId=4&_a=completed)
* __*webpack.production.config.js*__ -  suppose to be production config

## Application structure
* __*assets*__
    *  __*images*__ - image assets, being copied during bundling
    *  __*scss*__ - sass which being compiled during bundling
* __*components*__ - folders for UI components, represents only UI and UI changes
  * __*common*__ - folder for common reusable components
  * __*contact-lists*__ - folder for contact list upload/mapping components
  * __*master*__ - Folder for master pages. Contains only authorised master page  as authorisatino done through UPF
  * __*template-manager*__ - Components related to tempaltes manager view, editor
  * __*workflow*__ - Components related to workflow manager view, editor
  * __*contact-lists*__ - folder for contact list upload/mapping components

* __*config*__ - Base level components with configurations
  * __*i18n.js*__ - Configuratino for localisatino and internalisation
  * __*root.js*__ - Container for application which contains Routes and decides which component to render. All Anonymour and Auth separation goes here
  * __*startup.js*__ - Wrapper for root, which decide to render components if usre authorized. If no authrozid user - no render
* __*locales*__ - folder which  locales
* __*redux*__ - folder with data layer settings and reducers. All state update, data fetch gores from here
* __*main.js*__ - entry point to application
* __*manifest.json*__ - manifest file for PWA


[go back ](../README.md)
