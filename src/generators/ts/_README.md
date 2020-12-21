# @hyperone/client

@hyperone/client is an automatically generated library used to interact with
[HyperOne API](https://www.hyperone.com/tools/api/).

## Installation

You are able to get this library using [npm](https://www.npmjs.com/get-npm),
or [yarn](https://classic.yarnpkg.com/en/docs/install/).

### Installation using yarn

```shell
yarn add @hyperone/client
```

### Installation using npm

```shell
npm i @hyperone/client
```

## Usage

The recommended way to use this package is to use it along with [@hyperone/credentials](https://www.npmjs.com/package/@hyperone/credentials) library.
To to that install _@hyperone/credentials_ using your package manager:

**yarn:**

```shell
yarn add @hyperone/credentials
```

**npm:**

```shell
npm i @hyperone/credentials
```

Then import use it as a token provider in your code:

```typescript
import { getPassportCredentialsHelper } from "@hyperone/credentials";
import { Credentials } from "@hyperone/client";

const helper = getPassportCredentialsHelper();
const config = new Configuration({
  accessToken: () => helper.getToken("https://api.hyperone.com/v2"), // token audience
});
```

You can acquire more knoweledge about [@hyperone/credentials](https://www.npmjs.com/package/@hyperone/credentials)
library on [its GitHub page](https://github.com/hyperonecom/h1-credentials-helper-ts).

Configuration object allows you to use choosen API client.

Example:

```typescript
import { getPassportCredentialsHelper } from "@hyperone/credentials";
import { Configuration, IamProjectApi } from "@hyperone/client";

const helper = getPassportCredentialsHelper();
const config = new Configuration({
  accessToken: () => helper.getToken("https://api.hyperone.com/v2"), // token audience
});

const getProjects = async () => {
  const projectApiClient = new IamProjectApi(config);
  const response = await projectApiClient.iamProjectList();
  console.log(response);
};

getProjects();
```

### "Prefer" header

Some operations on API may be time-consuming. In this case server
may return [HTTP Status 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
with `x-event-id` header containing request ID, and handle the operation asynchronously.
If you want to avoid this behavior, you can send `prefer` header [RFC7240](https://tools.ietf.org/html/rfc7240)
with your request, which will cause returning the operation result as response to this request.

To use this header from sdk simply add `baseOptions` object to your configuration:

```typescript
const config = new Configuration({
  accessToken: () => helper.getToken("https://api.hyperone.com/v2"),
  baseOptions: {
    headers: {
      Prefer: `respond-async,wait=${60 * 60 * 24}`,
    },
  },
});
```

You can get more information about `prefer` usage in HyperOne API
[in its documentation](https://www.hyperone.com/tools/api/concepts/headers.html#naglowek-prefer).

## Documentation

For full documentation of this library check [docs directory](docs/).
