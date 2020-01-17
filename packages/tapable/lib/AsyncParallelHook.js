const {
  AsyncParallelHook,
} = require("tapable")

const asyncParallelHook = new AsyncParallelHook(['item', 'itemArr',]); // if not Array ==> []


const itemArr = []


// asyncParallelHook.tap('tap', (item, itemArr) => {
//   itemArr.push(item)
// })
asyncParallelHook.tapAsync('tapAsync', (item, callBack)  => {
  setTimeout(() => {
    itemArr.push(item)
    callBack()
  }, 1000)
});

// asyncParallelHook.tapPromise('tapPromise', (item)  =>
//   Promise.resolve(item).then(item => itemArr.push(item)));

setTimeout(() => {

  //  asyncParallelHook.call("tap", itemArr); // 该方法在1.1.3版本中被禁用

  // 注意tapAsync和promise最好不要混用
  asyncParallelHook.callAsync('tapAsync', () => console.info(itemArr))

  // asyncParallelHook.promise("promise", itemArr).then(() => console.info(itemArr, '122112'))
  // console.info(itemArr, '1')
  /*
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
      var _fn0 = _x[0];
      var _hasResult0 = false;
      var _promise0 = _fn0(item, itemArr);
      if (!_promise0 || !_promise0.then)
        throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
      _promise0.then(_result0 => {
        _hasResult0 = true;
        _resolve();
      }, _err0 => {
        if(_hasResult0) throw _err0;
        _error(_err0);
      });
    _sync = false;
  });
  */

}, 1000);