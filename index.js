const fs = require('fs');

function AssetsVersioning (options) {
  this.options = options || {}
}

AssetsVersioning.prototype.apply = function apply (compiler) {

  const options = this.options;
  const class_name = this.options.class_name || "AssetsVersion"
  const file_name = this.options.file_name || "./assets.version.php"

    compiler.hooks.done.tap('Assets Version', () => {
        const stamp = Date.now();
        const content =   '<?php\n' +
                        '\n' +
                        'class '+ class_name +' {\n' +
                        '\tpublic $current = '+ stamp +';\n' +
                        '}';

        fs.writeFile(file_name, content, (err) => {
            if (err) throw err;
            console.log('Assets version updated');
        });
    });
};

module.exports = AssetsVersioning;