package h1

import (
	"context"
	"errors"

	credentials "github.com/hyperonecom/h1-credentials-helper-go"
	"github.com/hyperonecom/h1-credentials-helper-go/providers"
)

// APIAudience is the default audience used with HyperOne v2 API
const APIAudience = "https://api.hyperone.com/v2"

// PassportContextProvider is a struct used to generate
// contexts to sign requests from passport file
type PassportContextProvider struct {
	TokenProvider   providers.TokenAuthProvider
	PassportContext context.Context
}

// GetPassportContextProvider returns struct using HyperOne
// passport file to generate context for signing requests
func GetPassportContextProvider(passportLocation string, ctx context.Context) (*PassportContextProvider, error) {
	if ctx == nil {
		ctx = context.Background()
	}

	passport, err := credentials.GetPassportCredentialsHelper(passportLocation)

	if err != nil {
		return nil, err
	}

	_, err = passport.GetToken(APIAudience)

	if err != nil {
		return nil, errors.New("Error when generating JWT. Check if your passport file is valid")
	}

	contextProvider := &PassportContextProvider{
		TokenProvider:   passport,
		PassportContext: ctx,
	}

	return contextProvider, nil
}

// CtxWithError generates context to sign requests made to HyperOne API
func (provider *PassportContextProvider) CtxWithError() (context.Context, error) {
	token, err := provider.TokenProvider.GetToken(APIAudience)

	if err != nil {
		return nil, err
	}

	ctx := context.WithValue(provider.PassportContext, ContextAccessToken, token)

	return ctx, nil
}

// Ctx generates context to sign request but does not return error
func (provider *PassportContextProvider) Ctx() context.Context {
	ctx, _ := provider.CtxWithError()
	return ctx
}
