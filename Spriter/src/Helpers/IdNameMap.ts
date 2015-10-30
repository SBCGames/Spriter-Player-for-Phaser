module Helper {

    export class IdNameMap<T> {

        private _items: T[] = [];
        private _itemNames: number[] = [];

        // -------------------------------------------------------------------------
        public add(aItem: T, aId?: number, aName?: string) {
            if (aId === undefined) {
                aId = this._items.length;
            }

            if (aName === undefined || aName === null) {
                aName = "item_" + aId;
            }

            this._items[aId] = aItem;
            this._itemNames[aName] = aId;
        }

        // -------------------------------------------------------------------------
        public getById(aId: number): T {
            return this._items[aId];
        }

        // -------------------------------------------------------------------------
        public getByName(aName: string) {
            var id = this._itemNames[aName];

            // TODO remove
            if (typeof id !== "number") {
                console.warn("item " + aName + "  not found!");
            }

            return (typeof id === "number") ? this._items[id] : null;
        }

        // -------------------------------------------------------------------------
        public get length(): number {
            return this._items.length;
        }
    }
}
