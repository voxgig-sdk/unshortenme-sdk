
import { Context } from './Context'


class UnshortenmeError extends Error {

  isUnshortenmeError = true

  sdk = 'Unshortenme'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UnshortenmeError
}

