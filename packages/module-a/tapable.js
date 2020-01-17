const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

const syncHook1 = new SyncHook()

syncHook1.tap('syncHook1', val => console.info(1111))

setTimeout(() => {
  syncHook1.call('syncHook1')
}, 1000);
