module Spriter {

    export class CharMapStack {

        private _entity: Entity;

        private _stack: CharMap[] = [];
        private _length: number = 0;

        // -------------------------------------------------------------------------
        public constructor(entity: Entity) {
            this._entity = entity;
        }

        // -------------------------------------------------------------------------
        public reset(): void {
            this._length = 0;
        }

        // -------------------------------------------------------------------------
        public push(charMapName: string): void {
            var charMap = this.getCharMap(charMapName);

            this._stack[this._length++] = charMap;
        }

        // -------------------------------------------------------------------------
        public remove(charMapName: string): void {
            var charMap = this.getCharMap(charMapName);
            var index = this.findCharMap(charMap);

            // shift all items down
            if (index !== -1) {
                for (var i = index; i < this._length - 2; i++) {
                    this._stack[i] = this._stack[i + 1];
                }

                this._stack[--this._length] = null;
            }
        }

        // -------------------------------------------------------------------------
        public getFile(file: File): File {
            for (var i = this._length - 1; i >= 0; i--) {
                var value = this._stack[i].value(file.name);
                if (value !== undefined) {
                    return value;
                }
            }

            return file;
        }

        // -------------------------------------------------------------------------
        private getCharMap(charMapName): CharMap {
            var charMap = this._entity.getCharMapByName(charMapName);

            if (charMapName === null) {
                console.error("charmap with name " + charMapName + " does not exist");
            }

            return charMap;
        }

        // -------------------------------------------------------------------------
        private findCharMap(charMap: CharMap): number {
            for (var i = 0; i < this._length; i++) {
                if (this._stack[i] === charMap) {
                    return i;
                }
            }

            return -1;
        }
    }
}
