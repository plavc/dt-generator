import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as path from 'path';
import { readFile, save } from './files';

export function render(templateFile: string, data: any): string {
    return Mustache.render(
        readFile(templateFile),
        data,
        loadPartials(path.dirname(templateFile)));
}

export function renderAndSave(templateFile: string, data: any, fileOut: string, templateSource?: string): void {
    if (!templateSource) {
        templateSource = readFile(templateFile);
    }
    const rendered = Mustache.render(
        templateSource,
        data,
        loadPartials(path.dirname(templateFile)));
    save(fileOut, rendered);
}

function loadPartials(folder: string) {
    const partials: any = {};

    const files = fs.readdirSync(folder);

    for (let i = 0, l = files.length; i < l; i++) {
        const file = files[i];

        if (file.match(/\.partial\.mustache$/)) {
            const name = path.basename(file, '.partial.mustache');
            partials[name] = fs.readFileSync(folder + '/' + file, { encoding: 'utf8' });
        }
    }

    return partials;
}
