import { IConfig, ITemplate } from './config';
import { exists } from './utils/files';
import { Logger } from './utils/logger';
import { renderAndSave } from './utils/mustache';
import { resolveGeneratedPath } from './utils/path-resolver';
import { StringDecorator, stringDecoratorStringifyReplacer } from './utils/string-decorator';

export class Generator {

    public readonly fn: any = { };

    constructor() {
        this.fn.lowerCased = () => {
            return (val: string, render: any) => {
                return render(val).toLowerCase();
            };
        };
    }

    public generate(config: IConfig, data: any): void {

        this.decorateStrings(data);

        config.templates.filter((t: ITemplate) => !t.disabled).forEach((t: ITemplate) => {
            this.evalTemplate(t.selector, data, (_: any, objMap: any) => {
                this._generate(t, objMap);
            });
        });
    }

    public enableObjectStringify() {
        Object.defineProperty(Object.prototype, 'stringify', {
        // tslint:disable-next-line: object-literal-shorthand
            value: function() {
                return JSON.stringify(this, stringDecoratorStringifyReplacer, 2);
            },
        });
    }

    private _generate(template: ITemplate, data: any) {
        const fileOut = resolveGeneratedPath(template, data);

        if (template.skipExisting && exists(fileOut)) {
            Logger.info('Skipped. File: "' + fileOut + '" exists and "skipExisting" flag is enabled.');
        }

        data.fn = this.fn;

        renderAndSave(template.source, data, fileOut);
    }

    private evalTemplate(selector: string, data: any, call: (val: any, objMap: any) => void) {

        if (selector === '.') {
            call(data, { root: data, this: data });
            return;
        }

        const splited = selector.split('.');

        this.visit(splited, splited.length - 1, 0, data, call);
    }

    private visit(properties: string[], depth: number, index: number, data: any,
                  call: (val: any, objMap: any) => void,  objMap?: any): void {
        properties.forEach((propertyName: string, i) => {
            const obj = data[propertyName];
            const last = depth === index;
            const partSplited = properties.slice(i);

            if (!objMap) {
                objMap = { root: data };
            }

            const newIndex = index++;

            if (Array.isArray(obj)) {

                obj.forEach((item: any) => {
                    const objMapCopy = Object.assign({}, objMap);
                    if (last) {
                        objMapCopy.this = item;
                        call(item, objMapCopy);
                    } else {
                        objMapCopy[propertyName] = item;
                        this.visit(partSplited, depth, newIndex, item, call, objMapCopy);
                    }
                });

            } else if (typeof(obj) === 'object') {
                const objMapCopy = Object.assign({}, objMap);

                if (last) {
                    objMapCopy.this = obj;
                    call(obj, objMapCopy);
                } else {
                    objMapCopy[propertyName] = obj;
                    this.visit(partSplited, depth, newIndex, obj, call, objMapCopy);
                }
            }
        });
    }

    private decorateStrings(data: any) {
        Object.keys(data).forEach((key: string) => {
            const item = data[key];
            if (Array.isArray(item)) {
                item.forEach((arrItem: any) => this.decorateStrings(arrItem));
            } else if (typeof item === 'object') {
                this.decorateStrings(item);
            } else if (typeof item === 'string') {
                data[key] = new StringDecorator(item);
            }
        });
    }
}
