# H1-Generators

This repository contains code responsible for automatically generating
client libraries for [HyperOne API](https://www.hyperone.com/)
using [OpenAPI generator](https://openapi-generator.tech/)
and [GitHub Actions](https://github.com/features/actions).

## Usage

This library is designed to work using GitHub Actions on
Linux based operating system. To run it under your own namespace
[fork this repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo),
replace repositories containing generated code in [generate.yaml](.github/workflows/generate.yaml)
and add required environment variables:

`PUSH_TOKEN`- [Personal Access Token (PAT)](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
allowing you to push code to other repositories

`PASSPORT_FILE`- HyperOne passport file content, used to perform
end-to-end tests with [HyperOne v2 API](https://api.hyperone.com/v2/docs) using [@hyperone/credentials](https://www.npmjs.com/package/@hyperone/credentials)
library.

### Generating client on personal machine

You are able to generate client library using any PC with
Linux based operating system with installed bash and yarn.
To do that install all dependencies:

```shell
yarn
```

and start generator for choosen language:

```shell
yarn start $LANG
```

for example:

```shell
yarn start ts
```

**Important:** building the application and running it with
`node` binary is **not** the recommended way to use this application,
since it may lead to errors caused by incorrect paths from `__dirname` resolving.
