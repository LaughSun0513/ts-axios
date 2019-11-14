import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise // 通过该变量来控制Promise的Pending状态--->Resolve状态
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        // 防止重复提交多次canccel函数
        return
      }
      // this.reason = message; // 根据cancel函数提交取消原因
      this.reason = new Cancel(message)
      resolvePromise(this.reason) // 巧妙利用Promsie来做到取消
    })
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    // token的作用就是触发产生cancel函数
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
  throwIfRequested(): void {
    // 说明这个 token 已经被使用过了，直接抛错
    if (this.reason) {
      throw this.reason
    }
  }
}
