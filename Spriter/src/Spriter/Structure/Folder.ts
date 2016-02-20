/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />

module Spriter {

    export class Folder extends Item {

        private _files: IdNameMap<File>;

        // -------------------------------------------------------------------------
        constructor(id: number, name: string) {
            super(id, name);

            this._files = new IdNameMap<File>();
        }

        // -------------------------------------------------------------------------
        public addFile(file: File): void {
            this._files.add(file, file.id, file.name);
        }

        // -------------------------------------------------------------------------
        public getFileById(id: number): File {
            return this._files.getById(id);
        }

        // -------------------------------------------------------------------------
        public getFileByName(name: string) {
            return this._files.getByName(name);
        }
    }
}
