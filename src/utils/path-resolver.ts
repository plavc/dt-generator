import { ITemplate } from '../config';

const VAR_REGEX = /(\$\{[A-Za-z0-9-._]*\})/gm;

export function resolveGeneratedPath(template: ITemplate, objMap: any): string {
    const vars = findVarables(template.target);
    const varsValues = resolveVariables(vars, objMap);
    const out = replaceVariables(template.target, varsValues);
    return out;
}

function replaceVariables(input: string, variables: Map<string, any>) {
    variables.forEach((value: any, key: string) => {
        input = input.replace('${' + key + '}', value);
    });

    return input;
}

function resolveVariables(variables: string[], objMap: any): Map<string, any> {
    const map = new Map<string, any>();

    variables.forEach((variable: string) => {
        const value = variable.split('.').reduce((o, i) => o[i], objMap);
        map.set(variable, value);
    });

    return map;
}

function findVarables(source: string): string[] {
    const arr: string[] = [];
    let m;

    do {
        m = VAR_REGEX.exec(source);
        if (m) {
            if (m.index === VAR_REGEX.lastIndex) {
                VAR_REGEX.lastIndex++;
            }

            m.forEach((match, _) => {
                arr.push(match.slice(2, match.length - 1));
            });
        }
    } while (m);

    return arr;
}

