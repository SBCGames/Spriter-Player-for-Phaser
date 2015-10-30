module Spriter {

    export class Spriter {

        private _folders: Helper.IdNameMap<Folder>;
        private _entities: Helper.IdNameMap<Entity>;

        // -------------------------------------------------------------------------
        constructor() {
            this._folders = new Helper.IdNameMap<Folder>();
            this._entities = new Helper.IdNameMap<Entity>();
        }

        // -------------------------------------------------------------------------
        public addFolder(aFolder: Folder): void {
            this._folders.add(aFolder, aFolder.id, aFolder.name);
        }

        // -------------------------------------------------------------------------
        public getFolderById(aId: number): Folder {
            return this._folders.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getFolderByName(aName: string): Folder {
            return this._folders.getByName(aName);
        }

        // -------------------------------------------------------------------------
        public addEntity(aEntitiy: Entity): void {
            this._entities.add(aEntitiy, aEntitiy.id, aEntitiy.name);
        }

        // -------------------------------------------------------------------------
        public getEntityById(aId: number): Entity {
            return this._entities.getById(aId);
        }

        // -------------------------------------------------------------------------
        public getEntityByName(aName: string): Entity {
            return this._entities.getByName(aName);
        }
    }
}
