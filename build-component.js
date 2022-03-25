const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
    const js = [
        './dist/angular-app/runtime.js',
        './dist/angular-app/polyfills.js',
        './dist/angular-app/main.js',
        './dist/angular-app/113.js',
        './dist/angular-app/932.js',
        './dist/angular-app/953.js',
    ];
    const css = [
        './dist/angular-app/styles.css',
    ]
    
    await fs.ensureDir('widget');
    await concat(js, 'widget/angular-app.js');
    await concat(css, 'widget/angular-app.css');
}
build();