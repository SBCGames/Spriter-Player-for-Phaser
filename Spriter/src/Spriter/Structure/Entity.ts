module Spriter {

    export class Entity {

        private _id: number;
        private _name: string;

        private _objectInfos: Helper.IdNameMap<ObjectInfo>;
        private _animations: Helper.IdNameMap<Animation>;
        
        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string) {
            this._id = aId;
            this._name = aName;

            this._objectInfos = new Helper.IdNameMap<ObjectInfo>();
            this._animations = new Helper.IdNameMap<Animation>();
        }

        // -------------------------------------------------------------------------
        public addObjectInfo(aObjectInfo: ObjectInfo): void {
            this._objectInfos.add(aObjectInfo, aObjectInfo.id, aObjectInfo.name);
        }

        // -------------------------------------------------------------------------
        public getObjectInfoById(aId: number): ObjectInfo {
            return this._objectInfos.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getObjectInfoByName(aName: string): ObjectInfo {
            return this._objectInfos.getByName(aName);
        }

        // -------------------------------------------------------------------------
        public addAnimation(aAnimation: Animation): void {
            this._animations.add(aAnimation, aAnimation.id, aAnimation.name);
        }

        // -------------------------------------------------------------------------
        public getAnimationById(aId: number): Animation {
            return this._animations.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getAnimationByName(aName: string): Animation {
            return this._animations.getByName(aName);
        }

        // -------------------------------------------------------------------------
        public get animationsCount(): number {
            return this._animations.length;
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
