const {
  AsyncSeriesHook,
} = require("tapable")

const AsyncSeriesHook1 = new AsyncSeriesHook(['val1',]); // if not Array ==> []
AsyncSeriesHook1.tapPromise("test", (item)  =>
  new Promise((resolve) => setTimeout(() => resolve(item), 1000)).then(item => {
    console.info(item)
  }));
AsyncSeriesHook1.tapPromise("test", (item)  =>
  new Promise((resolve) => setTimeout(() => resolve(item), 1000)).then(item => {
    console.info(item)
  }));

setTimeout(() => {

  AsyncSeriesHook1.promise("syncHook1");

  /** 发布者   两个promise安顺序执行
   * 将会被编译成以下函数 _x为订阅者
    return new Promise((_resolve, _reject) => {
    var _sync = true;
    function _error(_err) {
    if(_sync)
    _resolve(Promise.resolve().then(() => { throw _err; }));
    else
    _reject(_err);
    };
    var _context;
    var _x = this._x;
    function _next0() {
    var _fn1 = _x[1];
    var _hasResult1 = false;
    var _promise1 = _fn1(val1);
    if (!_promise1 || !_promise1.then)
      throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
    _promise1.then(_result1 => {
    _hasResult1 = true;
    _resolve();
    }, _err1 => {
    if(_hasResult1) throw _err1;
    _error(_err1);
    });
    }
    var _fn0 = _x[0];
    var _hasResult0 = false;
    var _promise0 = _fn0(val1);
    if (!_promise0 || !_promise0.then)
      throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
    _promise0.then(_result0 => {
    _hasResult0 = true;
    _next0();
    }, _err0 => {
    if(_hasResult0) throw _err0;
    _error(_err0);
    });
    _sync = false;
    });
   *
  */

}, 1000);

