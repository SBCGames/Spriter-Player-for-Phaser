module Spriter {

    export class Spriter {

        private _folders: IdNameMap<Folder>;
        private _tags: IdNameMap<Item>;
        private _entities: IdNameMap<Entity>;

        // -------------------------------------------------------------------------
        constructor() {
            this._folders = new IdNameMap<Folder>();
            this._tags = new IdNameMap<Item>();
            this._entities = new IdNameMap<Entity>();
        }

        // -------------------------------------------------------------------------
        public addFolder(folder: Folder): void {
            this._folders.add(folder, folder.id, folder.name);
        }

        // -------------------------------------------------------------------------
        public getFolderById(id: number): Folder {
            return this._folders.getById(id);
        }

        // -------------------------------------------------------------------------
        public getFolderByName(name: string): Folder {
            return this._folders.getByName(name);
        }

        // -------------------------------------------------------------------------
        public addEntity(entity: Entity): void {
            this._entities.add(entity, entity.id, entity.name);
        }

        // -------------------------------------------------------------------------
        public getEntityById(id: number): Entity {
            return this._entities.getById(id);
        }

        // -------------------------------------------------------------------------
        public getEntityByName(name: string): Entity {
            return this._entities.getByName(name);
        }

        // -------------------------------------------------------------------------
        public addTag(tag: Item): void {
            this._tags.add(tag, tag.id, tag.name);
        }

        // -------------------------------------------------------------------------
        public getTagById(id: number): Item {
            return this._tags.getById(id);
        }

        // -------------------------------------------------------------------------
        public getTagByName(name: string): Item {
            return this._tags.getByName(name);
        }

        // -------------------------------------------------------------------------
        public get tagsLength(): number {
            return this._tags.length;
        }
    }
}
