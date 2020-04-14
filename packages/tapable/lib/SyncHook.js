const {
  SyncHook,
} = require("tapable")

const syncHook1 = new SyncHook(['val1',]); // if not Array ==> []

syncHook1.tap("test", (val, val2) => console.log(val, val2));
syncHook1.tap("test", (val) => console.log(val));

setTimeout(() => {

  syncHook1.call("syncHook1", "syncHook");

  /** 发布者
   * 将会被编译成以下函数 _x为订阅者
   *function(val1) {
   *  var _context;
   *  var _x = this._x;
   *  var _fn0 = _x[0];
   *  _fn0(val1);
   *  var _fn1 = _x[1];
   *  _fn1(val1);
   *}
   *
  */

}, 1000);


