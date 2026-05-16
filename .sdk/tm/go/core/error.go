package core

type UnshortenmeError struct {
	IsUnshortenmeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUnshortenmeError(code string, msg string, ctx *Context) *UnshortenmeError {
	return &UnshortenmeError{
		IsUnshortenmeError: true,
		Sdk:              "Unshortenme",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UnshortenmeError) Error() string {
	return e.Msg
}
