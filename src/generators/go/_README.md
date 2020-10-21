# h1-client-go

h1-client-go is an automatically generated library used to interact with
[HyperOne API](https://www.hyperone.com/tools/api/).

## Usage

Example library usage:

```go
package somepackage

import "github.com/hyperonecom/h1-client-go"

func main() {
    cfg := h1.NewConfiguration() // create new Configuration struct
    c := h1.NewAPIClient(cfg) // create new client

    p, err := h1.GetPassportContextProvider("") // get authentication helper
    if err != nil {
        // handle error with getting passport provider
    }
    projects, response, err := c.IamProjectApi.IamProjectList(p.Ctx(), nil) // getting IamProjectList using IamProjectApi struct

    if err != nil {
        // handle error with request
    }

    for _, project := range projects {
        // do something with projects
    }
}
```

To use this library import `github.com/hyperonecom/h1-client-go` in your code.
**Important**: the package is named `h1`, so it's not the same as last part of import path.

Then you are able to create it's client.

```go
cfg := h1.NewConfiguration()
c := h1.NewAPIClient(cfg)
```

If you want to pass custom options into configuration object instead of using
`NewConfiguration` function you have to create `Configuration` struct yourself.
Code responsible for its definition can be found in [configuration.go](./configuration.go).

### Auth

There is a built-in auth helper in this library. It utilizes HyperOne passport files
using [h1-credentials-helper-go library](https://github.com/hyperonecom/h1-credentials-helper-go).
To use it in code to create authorization context get passport context provider:

```go
p, err := h1.GetPassportContextProvider(""/* empty string means that passport file is located under ~/.h1 */)
if err != nil {
    log.Panic(err)
}
```

Then use `Ctx`, or `CtxWithError` method.

`Ctx` method usage:

```go
projects, response, err := c.IamProjectApi.IamProjectList(p.Ctx(), nil)
// [...]
```

`CtxWithError` method usage:

```go
ctx, err := p.CtxWithError()
if err != nil {
    log.panic(err)
}

projects, response, err := c.IamProjectApi.IamProjectList(p.Ctx(), nil)
```

The difference between `Ctx` method and `CtxWithError` is that `Ctx` does not
return error, neither checks it. It creates a little risk, however generating
token is already tested when getting passport context provider, so you
should be able to catch misbehaviors on this stage. Also checking HTTP errors
returned as third value with each request may be helpful for debugging this
kind of issues.

**Important**: remember to call context providing function every request-
token generated as result is valid only for 5 minutes.

#### Invalid usage

```go
func main() {
    // [...]
    ctx := provider.Ctx()

    for {
        time.Sleep(5 * time.Minute)
        // this will not work, since token will be invalid after 5 minutes
        projects, _, err := client.IamProjectApi.IamProjectList(ctx, nil)
        // [...]
    }
}
```

#### Valid usage

```go
// [...]
projects, _, err := client.IamProjectApi.IamProjectList(provider.Ctx(), nil)
```

## Documentation

For full documentation of this library check [docs directory](docs/).
