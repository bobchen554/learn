class InjectScript {
    constructor (options) {
        this._options = options
    }
    apply (compiler) {
        const self = this
        var processer = function (data, callback) {
            if (!self._options.content) throw new Error('html no content')
            data.html = data.html.replace('<script type',`${self._options.content}\n<script type`)
            callback(null, data);
        };
      
        if (compiler.hooks) {
          // webpack >=4.0
          compiler.hooks.compilation.tap('ScriptsInjectorWebpackPlugin', function (compilation) {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('ScriptsInjectorWebpackPlugin', processer);
          });
        } else {
          // webpack < 4.0:
          compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-before-html-processing', processer);
          });
        }
    }
}

module.exports = InjectScript