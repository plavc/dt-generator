import { IConfig } from './config';
import { readConfig } from './reader';
import { getContainingDir } from './utils';

export class GeneratorOptions {

    public static create(configFilePath: string, outputDirectory?: string): GeneratorOptions | undefined {
        const config = readConfig(configFilePath);
        if (config) {
            return new GeneratorOptions(config, configFilePath, outputDirectory);
        }

        return undefined;
    }

    constructor(
        public config: IConfig,
        public configFilePath?: string,
        public outputDirectory?: string,
    ) { }

    public get templatesDirectory(): string {
        if (this.configFilePath) {
            return getContainingDir(this.configFilePath);
        } else {
            return '';
        }
    }
}
