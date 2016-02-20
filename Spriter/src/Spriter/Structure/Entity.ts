/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />

module Spriter {

    export class Entity extends Item {

        private _objectInfos: IdNameMap<ObjectInfo>;
        private _charMaps: IdNameMap<CharMap>
        private _variables: IdNameMap<Variable>;
        private _animations: IdNameMap<Animation>;
        
        // -------------------------------------------------------------------------
        constructor(id: number, name: string) {
            super(id, name);

            this._objectInfos = new IdNameMap<ObjectInfo>();
            this._charMaps = new IdNameMap<CharMap>();
            this._variables = new IdNameMap<Variable>();
            this._animations = new IdNameMap<Animation>();
        }

        // -------------------------------------------------------------------------
        public addObjectInfo(objectInfo: ObjectInfo): void {
            this._objectInfos.add(objectInfo, objectInfo.id, objectInfo.name);
        }

        // -------------------------------------------------------------------------
        public getObjectInfoById(id: number): ObjectInfo {
            return this._objectInfos.getById(id);
        }

        // -------------------------------------------------------------------------
        public getObjectInfoByName(name: string): ObjectInfo {
            return this._objectInfos.getByName(name);
        }

        // -------------------------------------------------------------------------
        public addCharMap(charMap: CharMap): void {
            this._charMaps.add(charMap, charMap.id, charMap.name);
        }

        // -------------------------------------------------------------------------
        public getCharMapById(id: number): CharMap {
            return this._charMaps.getById(id);
        }

        // -------------------------------------------------------------------------
        public getCharMapByName(name: string): CharMap {
            return this._charMaps.getByName(name);
        }

        // -------------------------------------------------------------------------
        public get charMapsLength(): number {
            return this._charMaps.length;
        }

        // -------------------------------------------------------------------------
        public addVariable(variable: Variable): void {
            this._variables.add(variable, variable.id, variable.name);
        }

        // -------------------------------------------------------------------------
        public getVariableById(id: number): Variable {
            return this._variables.getById(id);
        }

        // -------------------------------------------------------------------------
        public getVariableByName(name: string): Variable {
            return this._variables.getByName(name);
        }

        // -------------------------------------------------------------------------
        public get variablesLength(): number {
            return this._variables.length;
        }

        // -------------------------------------------------------------------------
        public addAnimation(animation: Animation): void {
            this._animations.add(animation, animation.id, animation.name);
        }

        // -------------------------------------------------------------------------
        public getAnimationById(id: number): Animation {
            return this._animations.getById(id);
        }

        // -------------------------------------------------------------------------
        public getAnimationByName(name: string): Animation {
            return this._animations.getByName(name);
        }

        // -------------------------------------------------------------------------
        public get animationsLength(): number {
            return this._animations.length;
        }
    }
}
