import { IConfig } from './config';
import { readJson, readYaml } from './utils';

export enum FileFormat {
    Yaml = 'yaml',
    Json = 'json',
}

export function readConfig(filePath: string, format?: FileFormat): IConfig | undefined {
    return read<IConfig>(filePath, format);
}

export function readModel(filePath: string, format?: FileFormat): any | undefined {
    return read(filePath, format);
}

function read<T>(filePath: string, format?: FileFormat): T | undefined {
    if (!format) {
        format = resolveFormat(filePath);
    }

    if (format === FileFormat.Json) {
        return readJson<any>(filePath);
    } else if (format === FileFormat.Yaml) {
        return readYaml<any>(filePath);
    } else {
        throw new Error('File format not spported. Supported file formats: json, yaml');
    }
}

function resolveFormat(filePath: string): FileFormat | undefined {
    if (filePath.endsWith('.json')) {
        return FileFormat.Json;
    } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        return FileFormat.Yaml;
    } else {
        return undefined;
    }
}
