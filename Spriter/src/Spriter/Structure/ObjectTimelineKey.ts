/// <reference path="SpatialTimelineKey.ts" />
module Spriter {

    export class ObjectTimelineKey extends SpatialTimelineKey {

        private _folder: number;
        private _file: number;

        // -------------------------------------------------------------------------
        public setFolderAndFile(aFolder: number, aFile: number): void {
            this._folder = aFolder;
            this._file = aFile;
        }

        // -------------------------------------------------------------------------
        public get folder(): number {
            return this._folder;
        }

        // -------------------------------------------------------------------------
        public get file(): number {
            return this._file;
        }
    }
}
