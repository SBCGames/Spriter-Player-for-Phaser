module Spriter {

    export class KeyTag extends Key {

        // bit arary with tag indices
        private _tagsOn: number;

        // -------------------------------------------------------------------------
        public get tagsOn(): number {
            return this._tagsOn;
        }

        // -------------------------------------------------------------------------
        public set tagsOn(tagsOn: number) {
            this._tagsOn = tagsOn;
        }
    }
}
