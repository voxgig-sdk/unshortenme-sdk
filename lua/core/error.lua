-- Unshortenme SDK error

local UnshortenmeError = {}
UnshortenmeError.__index = UnshortenmeError


function UnshortenmeError.new(code, msg, ctx)
  local self = setmetatable({}, UnshortenmeError)
  self.is_sdk_error = true
  self.sdk = "Unshortenme"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UnshortenmeError:error()
  return self.msg
end


function UnshortenmeError:__tostring()
  return self.msg
end


return UnshortenmeError
