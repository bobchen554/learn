class InjectScript {
    constructor(options) {
        this._options = options
    }
    apply(compiler) {
        if (compiler.hooks) {
            // webpack >=4.0
            compiler.hooks.compilation.tap('test', function (compilation) {
                compilation.hooks.afterOptimizeChunks.tap('test', (module) => {
                    console.info(module)
                });
            });
        }
    }
}

module.exports = InjectScript