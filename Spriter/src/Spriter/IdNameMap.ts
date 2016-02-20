module Spriter {

    export class IdNameMap<T> {

        private _items: T[] = [];
        private _itemNames: number[] = [];  // keys are names and returned value is index into _tems array

        // -------------------------------------------------------------------------
        public add(item: T, id?: number, name?: string) {
            if (id === undefined) {
                id = this._items.length;
            }

            if (name === undefined || name === null) {
                name = "item_" + id;
            }

            this._items[id] = item;
            this._itemNames[name] = id;
        }

        // -------------------------------------------------------------------------
        public getById(id: number): T {
            return this._items[id];
        }

        // -------------------------------------------------------------------------
        public getByName(name: string) {
            var id = this._itemNames[name];

            // TODO remove
            if (typeof id !== "number") {
                console.warn("item " + name + "  not found!");
            }

            return (typeof id === "number") ? this._items[id] : null;
        }

        // -------------------------------------------------------------------------
        public get length(): number {
            return this._items.length;
        }
    }
}
