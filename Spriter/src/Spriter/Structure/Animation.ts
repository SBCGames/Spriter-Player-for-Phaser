/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />

module Spriter {

    export enum eAnimationLooping { NO_LOOPING, LOOPING };

    export class Animation extends Item {
        
        private _length: number;
        private _loopType: eAnimationLooping;

        private _mainline: Baseline;
        private _timelines: IdNameMap<Timeline>;
        // other timelines for sound, events, tags, variables
        private _lines: IdNameMap<Baseline>;

        // -------------------------------------------------------------------------
        constructor(id: number, name: string, length: number, loopType: eAnimationLooping) {
            super(id, name);

            this._length = length;
            this._loopType = loopType;

            this._timelines = new IdNameMap<Timeline>();
            this._lines = new IdNameMap<Baseline>();
        }

        // -------------------------------------------------------------------------
        public get mainline(): Baseline {
            return this._mainline;
        }

        // -------------------------------------------------------------------------
        public set mainline(mainline: Baseline) {
            this._mainline = mainline;
        }

        // -------------------------------------------------------------------------
        public addTimeline(timeline: Timeline): void {
            this._timelines.add(timeline, timeline.id, timeline.name);
        }

        // -------------------------------------------------------------------------
        public getTimelineById(id: number): Timeline {
            return this._timelines.getById(id);
        }

        // -------------------------------------------------------------------------
        public getTimelineByName(name: string): Timeline {
            return this._timelines.getByName(name);
        }

        // -------------------------------------------------------------------------
        public addLine(line: Baseline): void {
            this._lines.add(line, this._lines.length, line.name);
        }

        // -------------------------------------------------------------------------
        public getLineById(id: number): Baseline {
            return this._lines.getById(id);
        }

        // -------------------------------------------------------------------------
        public getLineByName(name: string): Baseline {
            return this._lines.getByName(name);
        }

        // -------------------------------------------------------------------------
        public get linesLength(): number {
            return this._lines.length;
        }

        // -------------------------------------------------------------------------
        public resetLines(): void {
            for (var i = 0; i < this._lines.length; i++) {
                this._lines.getById(i).reset();
            }
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
