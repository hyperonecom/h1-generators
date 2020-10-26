# h1-client-ts

h1-client-ts is an automatically generated library used to interact with
[HyperOne API](https://www.hyperone.com/tools/api/).

## Installation

You are able to get this library using [npm](https://www.npmjs.com/get-npm),
or [yarn](https://classic.yarnpkg.com/en/docs/install/).

### Installation using yarn

```shell
yarn add h1-client-ts
```

### Installation using npm

```shell
npm i h1-client-ts
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
import { Credentials } from "h1-client-ts";

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
import { Configuration, IamProjectApi } from "h1-client-ts";

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

## Documentation

For full documentation of this library check [docs directory](docs/).
