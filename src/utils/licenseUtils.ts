import { join } from "path"
import { execute } from "./shellUtils"

export type License = 'MIT'

export const copyLicense = async (license: License, destination: string) => {
    const licenseLocation = join(__dirname, '..', '..', 'licenses', license);
    await execute(`cp ${licenseLocation} LICENSE`, destination);
};
