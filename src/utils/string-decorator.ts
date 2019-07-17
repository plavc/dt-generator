
export class StringDecorator {
    constructor(
        public readonly value: string,
        public params: any = {},
    ) { }

    get lowerCased(): StringDecorator {
        return new StringDecorator(this.value.toLowerCase());
    }

    get upperCased(): StringDecorator {
        return new StringDecorator(this.value.toUpperCase());
    }

    get capitalized(): StringDecorator {
        return new StringDecorator(this.value[0].toUpperCase() + this.value.slice(1));
    }

    get kebabCased(): StringDecorator {
        const source = this.value.charAt(0).toLowerCase() +  this.value.slice(1);
        return new StringDecorator(
            source.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase());
    }

    get kebabToCamelCased(): StringDecorator {
        return new StringDecorator(this.value.replace(/(-\w)/g, (m) => m[1].toUpperCase()));
    }

    get snakeToCamelCased(): StringDecorator {
        return new StringDecorator(this.value.replace(/(_\w)/g, (m) => m[1].toUpperCase()));
    }

    get varName(): StringDecorator {
        if (/^\d*/.test(this.value)) {
            return new StringDecorator('_' + this.value);
        }

        return this;
    }
}

export function stringDecoratorStringifyReplacer(_: string, value: any) {
    if (value instanceof StringDecorator) {
        return value.value;
    }
    return value;
}

StringDecorator.prototype.toString = function decoratoToString() {
    return this.value;
};
