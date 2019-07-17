import * as program from 'commander';
import { Generator } from './generator';
import { GeneratorOptions } from './options';
import { readModel } from './reader';

class Cli {

    public configFile?: string;
    public modelFile?: string;

    public run() {

        program
            .name('pl-generator')
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

        const test = readModel(instance.modelFile);

        const options = GeneratorOptions.create(instance.configFile);

        if (options && test) {
            const g = new Generator(options);
            g.enableObjectStringify();
            g.generate(test);
        }
    }
}

new Cli().run();
