/* Author: Tim Sommer
 Load all dependencies for the GoL engine.
 Usage:  just include in script tag, Pyramid takes care of the rest.
 */

Pyramid.rootPath = './';

//note that no template was defined?  This means that the code will be inserted directly into the page
Pyramid.setTypeRenderer(
    { name: 'view',
        isExtension: true
    });


//Set up file dependencies
Pyramid.newDependency({
    name: 'main',
    files: [
        'js/libs/propulsionjs.js'
    ]
});

Pyramid.newDependency({
    name: 'engine',
    files: [
        'js/libs/blackbird.js',
        'js/engine/utils/messenger.js',
        'js/engine/core/core.js'
    ],
    dependencies: ['main']
});

Pyramid.newDependency({
    name:'physics',
    files: [
        'js/physics/settings.js',
        'js/physics/castle.js',
        'js/physics/game.js'
    ],
    dependencies: ['main', 'engine']
});




