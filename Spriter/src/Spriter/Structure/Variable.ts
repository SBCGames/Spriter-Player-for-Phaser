/// <reference path="Item.ts" />

module Spriter {

    export class Variable extends Item {

        private _type: eVariableType;
        private _default: string | number;
        private _value: string | number;

        // -------------------------------------------------------------------------
        public constructor(id: number, name: string, type: eVariableType, defaultValue: string | number) {
            super(id, name);

            this._type = type;
            this._default = defaultValue;

            this.reset();
        }

        // -------------------------------------------------------------------------
        public clone(): Variable {
            return new Variable(this.id, this.name, this.type, this._default);
        }

        // -------------------------------------------------------------------------
        public reset(): void {
            this.value = this._default;
        }

        // -------------------------------------------------------------------------
        public get type(): eVariableType {
            return this._type;
        }

        // -------------------------------------------------------------------------
        public get value(): string | number {
            return this._value;
        }

        // -------------------------------------------------------------------------
        public set value(value: string | number) {
            if (this._type === eVariableType.INT) {
                this._value = Math.floor(<number>value);
            } else {
                this._value = value;
            }
        }

        // -------------------------------------------------------------------------
        public get int(): number {
            return <number>this._value;
        }

        // -------------------------------------------------------------------------
        public get float(): number {
            return <number>this._value;
        }

        // -------------------------------------------------------------------------
        public get string(): string {
            return <string>this._value;
        }
    }
}
