
export class Logger {

    public static info(message?: any, ...optionalParams: any[]) {
        // tslint:disable-next-line: no-console
        console.info(message, ...optionalParams);
    }
}
