export function isArray<T>(f: (a: any) => a is T, value: any): value is T[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every(f);
}
