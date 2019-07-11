import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

export function createParent(fileName: string) {
    createFolder(path.dirname(fileName));
    return fileName;
}

export function createFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    return folderPath;
}

export function readFile(fileName: string): string {
    return fs.readFileSync(fileName, { encoding: 'UTF-8' });
}

export function save(fileName: string, content: string) {
    createParent(fileName);
    fs.writeFileSync(fileName, content);
}

export function writeJson(fileName: string, obj: any): void  {
    createParent(fileName);
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

export function exists(filePath: string): boolean {
    return fs.existsSync(filePath);
}
