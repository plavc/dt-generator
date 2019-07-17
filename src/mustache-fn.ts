export class MustacheFn {

    public lowerCased = () => {
        return (val: string, render: any) => {
            return render(val).toLowerCase();
        };
    }
}
