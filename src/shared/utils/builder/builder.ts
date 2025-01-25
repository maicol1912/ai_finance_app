/**
 * BuilderPrototype es una clase utilitaria para construir objetos de tipo `T` de manera fluida.
 * Permite asignar valores a las propiedades del objeto de forma encadenada y construir el objeto final.
 *
 * @template T - El tipo de objeto que se construirá. Debe ser un objeto.
 */
export class BuilderPrototype<T extends object> {
    private instance: T;

    /**
     * Crea una instancia de BuilderPrototype.
     *
     * @param constructor - Una función constructora que devuelve una instancia de `T`.
     */
    constructor(constructor: new () => T) {
        this.instance = new constructor();
    }

    /**
     * Asigna un valor a una propiedad específica del objeto en construcción.
     *
     * @param key - La clave de la propiedad a asignar.
     * @param value - El valor a asignar a la propiedad.
     * @returns La instancia actual del builder para permitir el encadenamiento.
     *
     * @example
     * const user = new BuilderPrototype(UserDomainEntity)
     *     .set('name', 'John Doe')
     *     .set('age', 30)
     *     .build();
     */
    set<K extends keyof T>(key: K, value: T[K]): this {
        this.instance[key] = value;
        return this;
    }

    /**
     * Asigna múltiples propiedades al objeto en construcción.
     * Sobrescribe todas las propiedades proporcionadas en el objeto `values`.
     *
     * @param values - Un objeto parcial con las propiedades a asignar.
     * @returns La instancia actual del builder para permitir el encadenamiento.
     *
     * @example
     * const user = new BuilderPrototype(UserDomainEntity)
     *     .assign({ name: 'John Doe', age: 30 })
     *     .build();
     */
    assign(values: Partial<T>): this {
        Object.assign(this.instance, values);
        return this;
    }

    /**
     * Asigna solo las propiedades que coinciden con las del objeto en construcción.
     * Útil cuando se quiere evitar asignar propiedades no deseadas.
     *
     * @param values - Un objeto parcial con las propiedades a asignar.
     * @returns La instancia actual del builder para permitir el encadenamiento.
     *
     * @example
     * const user = new BuilderPrototype(UserDomainEntity)
     *     .assignMatching({ name: 'John Doe', age: 30, unknownProp: 'value' }) // 'unknownProp' no se asignará
     *     .build();
     */
    assignMatching(values: Partial<T>): this {
        Object.keys(values).forEach((key) => {
            if (key in this.instance) {
                this.instance[key as keyof T] = values[key as keyof T]!;
            }
        });
        return this;
    }

    /**
     * Construye y devuelve el objeto final de tipo `T`.
     *
     * @returns La instancia construida del objeto.
     *
     * @example
     * const user = new BuilderPrototype(UserDomainEntity)
     *     .set('name', 'John Doe')
     *     .assign({ age: 30 })
     *     .build();
     */
    build(): T {
        return this.instance;
    }
}