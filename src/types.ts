export interface GeneratorFunctionInput {
  clientsLocation: string;
  openapiLocation: string;
  testsLocation: string;
  token: string;
}

export type GeneratorFunction = (arg: GeneratorFunctionInput) => Promise<void>;
