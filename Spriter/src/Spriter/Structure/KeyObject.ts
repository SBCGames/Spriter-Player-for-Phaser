/// <reference path="KeyTimeline.ts" />

module Spriter {

    export class KeyObject extends KeyTimeline {

        private _folder: number;
        private _file: number;

        // -------------------------------------------------------------------------
        public setFolderAndFile(folder: number, file: number): void {
            this._folder = folder;
            this._file = file;
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
