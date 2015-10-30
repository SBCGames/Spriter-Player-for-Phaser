module Spriter {

    export class Folder {

        private _id: number;
        private _name: string;

        private _files: Helper.IdNameMap<File>;

        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string) {
            this._id = aId;
            this._name = aName;

            this._files = new Helper.IdNameMap<File>();
        }

        // -------------------------------------------------------------------------
        public addFile(aFile: File): void {
            this._files.add(aFile, aFile.id, aFile.name);
        }

        // -------------------------------------------------------------------------
        public getFileById(aId: number): File {
            return this._files.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getFileByName(aName: string) {
            return this._files.getByName(aName);
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get name(): string {
            return this._name;
        }
    }
}
