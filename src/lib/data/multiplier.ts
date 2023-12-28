export default interface Multiplier {
    readonly name: string;
    readonly factor: number;
}

export function isMultiplier(value: any): value is Multiplier {
    if (typeof value !== 'object') {
        return false;
    }

    if (typeof value.name !== 'string') {
        return false;
    }

    if (typeof value.factor !== 'number') {
        return false;
    }

    return true;
}

export function readMultiplier(value: any): Multiplier {
    const multiplier: Partial<Multiplier> = typeof value === 'object' ? value : {};

    const name = typeof multiplier.name === 'string' ? multiplier.name : '';
    const factor = typeof multiplier.factor === 'number' ? multiplier.factor : 1;

    return {
        ...multiplier,
        name,
        factor,
    };
}
