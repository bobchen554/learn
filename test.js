const compose = fns => {
  if (fns.length === 1) return fns[0]
  return fns.reduce((pre, next) => (...args) => next(pre(...args)))
}
class MyPromise {
  constructor(fn) {
    this.successFnCallback = []
    this.errorFnCallback = []
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(successFn, errorFn) {
    this.successFnCallback.push(successFn)
    this.errorFnCallback.push(errorFn)
    return this
  }

  resolve(res) {
    compose(this.successFnCallback)(res)
  }

  reject(error) {
    compose(this.errorFnCallback)(error)
  }


}

(new MyPromise(resolve => {

  setTimeout(() => {
      resolve(12)
  }, 1000)

})).then(res => console.log(res))