module Spriter {

    export enum eAnimationLooping { NO_LOOPING, LOOPING };

    export class Animation {
        
        private _id: number;
        private _name: string;

        private _length: number;
        private _loopType: eAnimationLooping;

        private _mainLineKeys: MainLineKey[] = [];
        private _timelines: Helper.IdNameMap<Timeline>;

        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string, aLength: number, aLoopType: eAnimationLooping) {
            this._id = aId;
            this._name = aName;

            this._length = aLength;
            this._loopType = aLoopType;

            this._timelines = new Helper.IdNameMap<Timeline>();
        }

        // -------------------------------------------------------------------------
        public get mainLineKeys(): MainLineKey[] {
            return this._mainLineKeys;
        }

        // -------------------------------------------------------------------------
        public addMainLineKey(aMainLineKey: MainLineKey): void {
            this._mainLineKeys.push(aMainLineKey);
        }

        // -------------------------------------------------------------------------
        public addTimeline(aTimeline: Timeline): void {
            this._timelines.add(aTimeline, aTimeline.id, aTimeline.name);
        }

        // -------------------------------------------------------------------------
        public getTimelineById(aId: number): Timeline {
            return this._timelines.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getTimelineByName(aName: string): Timeline {
            return this._timelines.getByName(aName);
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get name(): string {
            return this._name;
        }

        // -------------------------------------------------------------------------
        public get length(): number {
            return this._length;
        }

        // -------------------------------------------------------------------------
        public get loopType(): eAnimationLooping {
            return this._loopType;
        }
    }
}
