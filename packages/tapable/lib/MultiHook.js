const {
  SyncHook,
  MultiHook,
} = require("tapable")

const syncHook1 = new SyncHook(['val1',]); // if not Array ==> []
const syncHook2 = new SyncHook(['val1',]);


const allHooks = new MultiHook([syncHook1, syncHook2,])
allHooks.tap("test", (val) => console.log(val));

setTimeout(() => {

  syncHook1.call("syncHook1");
  console.info(allHooks.isUsed())
}, 1000);

