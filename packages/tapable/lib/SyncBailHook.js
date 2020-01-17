const {
  SyncBailHook,
} = require("tapable")

const syncBailHook = new SyncBailHook(['arg1',]); // if not Array ==> []

syncBailHook.tap('SyncBailHook', (arg1) => {console.info(arg1);return 1111})

setTimeout(() => {
  console.info(syncBailHook.call('SyncBailHook'))
  /*  Promise.race()
    var _context;
    var _x = this._x;

    var _fn0 = _x[0];
    var _result0 = _fn0(arg1);
    if(_result0 !== undefined) {
    return _result0;
    ;
    } else {}
  */
}, 1000);

