class InjectScript {
    constructor(options) {
        this._options = options
    }
    apply(compiler) {
        if (compiler.hooks) {
            // webpack >=4.0
            compiler.hooks.compilation.tap('ScriptsInjectorWebpackPlugin', function (compilation) {
                compilation.hooks.buildModule.tapAsync('ScriptsInjectorWebpackPlugin', (module) => {
                    console.info(module)
                });
            });
        }
    }
}

module.exports = InjectScript