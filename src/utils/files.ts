import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

export function getContainingDir(filePath: string) {
    return path.dirname(filePath);
}

export function buildPath(...pathSegments: string[]): string {
    return path.resolve(...pathSegments);
}

export function createContainingDir(fileName: string) {
    createDir(path.dirname(fileName));
    return fileName;
}

export function createDir(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    return folderPath;
}

export function readFile(fileName: string): string {
    return fs.readFileSync(fileName, { encoding: 'UTF-8' });
}

export function save(fileName: string, content: string) {
    createContainingDir(fileName);
    fs.writeFileSync(fileName, content);
}

export function writeJson(fileName: string, obj: any): void  {
    createContainingDir(fileName);
    fs.writeFileSync(fileName, JSON.stringify(obj, null, 2), { encoding: 'UTF-8'});
}

export function readJson<T>(filePath: string): T | undefined  {
    if (!fs.existsSync(filePath)) {
        return undefined;
    }
    const content = fs.readFileSync(filePath, { encoding: 'UTF-8' });
    return JSON.parse(content) as T;
}

export function readYaml<T>(filePath: string): T | undefined {
    const content = fs.readFileSync(filePath, { encoding: 'UTF-8' });
    if (content) {
        return YAML.parse(content) as T;
    }

    return undefined;
}

export function fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
}
