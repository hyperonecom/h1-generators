cp _api_test.go ../../clients/go/api_test.go
go test ../../clients/go/... || exit 1
rm ../../clients/go/api_test.go