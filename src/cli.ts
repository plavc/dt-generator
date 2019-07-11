import * as program from 'commander';
import { Generator } from './generator';
import { readConfig, readModel } from './reader';

class Cli {

    public configFile?: string;
    public modelFile?: string;

    public run() {

        program
            .name('generator')
            .version(require('../package.json').version, '-v, --version')
            .description(require('../package.json').description)
            .arguments('<configFile> <modelFile>')
            .action((sourceDir, modelFile, _) => this.action(sourceDir, modelFile, this))
            .parse(process.argv);

        if (!this.configFile || !this.modelFile) {
            program.help();
        }
    }

    private action(configFile: string, modelFile: string, instance: Cli) {
        instance.configFile = configFile;
        instance.modelFile = modelFile;

        const config = readConfig(instance.configFile);
        const test = readModel(instance.modelFile);

        const g = new Generator();
        g.enableObjectStringify();

        if (config && test) {
            g.generate(config, test);
        }
    }
}

new Cli().run();
