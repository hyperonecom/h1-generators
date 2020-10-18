package h1

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPassportContext(t *testing.T) {
	p := GetPassportContextProvider("")

	projects, response, err := IamProjectList(p.Ctx())
	require.NoError(t, err)

	if response.statusCode != 200 {
		t.Errorf("Status code different than 200: %s", response.statusCode)
	}
}
