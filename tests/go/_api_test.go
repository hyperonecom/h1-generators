package h1

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPassportContext(t *testing.T) {
	cfg := NewConfiguration()
	c := NewAPIClient(cfg)
	p, err := GetPassportContextProvider("", context.Background())
	require.NoError(t, err)

	_, response, err := c.IamProjectApi.IamProjectList(p.Ctx()).Execute()
	require.NoError(t, err)

	if response.StatusCode != 200 {
		t.Errorf("Status code different than 200: %d", response.StatusCode)
	}
}

func TestPassportContextWithError(t *testing.T) {
	cfg := NewConfiguration()
	c := NewAPIClient(cfg)
	p, err := GetPassportContextProvider("", nil)
	require.NoError(t, err)

	ctx, err := p.CtxWithError()
	require.NoError(t, err)

	_, response, err := c.IamProjectApi.IamProjectList(ctx).Execute()
	require.NoError(t, err)

	if response.StatusCode != 200 {
		t.Errorf("Status code different than 200: %d", response.StatusCode)
	}
}
