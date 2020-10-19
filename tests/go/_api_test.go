package h1

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPassportContext(t *testing.T) {
	cfg := NewConfiguration()
	c := NewAPIClient(cfg)
	p, err := GetPassportContextProvider("")
	require.NoError(t, err)

	_, response, err := c.IamProjectApi.IamProjectList(p.Ctx(), nil)
	require.NoError(t, err)

	if response.StatusCode != 200 {
		t.Errorf("Status code different than 200: %d", response.StatusCode)
	}
}

func TestPassportContextWithError(t *testing.T) {
	cfg := NewConfiguration()
	c := NewAPIClient(cfg)
	p, err := GetPassportContextProvider("")
	require.NoError(t, err)

	ctx, err := p.CtxWithError()
	require.NoError(t, err)

	_, response, err := c.IamProjectApi.IamProjectList(ctx, nil)
	require.NoError(t, err)

	if response.StatusCode != 200 {
		t.Errorf("Status code different than 200: %d", response.StatusCode)
	}
}
