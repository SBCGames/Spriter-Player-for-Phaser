module Spriter {

    export class Loader {

        private _spriter: Spriter;

        // -------------------------------------------------------------------------
        public load(aFile: SpriterFile): Spriter {

            this._spriter = new Spriter();

            // folders and files
            var folders = aFile.getNodes("folder");
            this.loadFolders(this._spriter, folders);
            folders.processed();

            // entity
            var entities = aFile.getNodes("entity");
            this.loadEntities(this._spriter, entities);
            entities.processed();

            return this._spriter;
        }

        // -------------------------------------------------------------------------
        private loadFolders(aSpriter: Spriter, aFolders: ISpriterNodeList): void {
            // through all folders
            for (var i = 0; i < aFolders.length(); i++) {
                var folder = aFolders.getFolder(i);

                // images in folder
                var files = aFolders.getChildNodes(i, "file");
                this.loadFiles(folder, files);
                files.processed();

                // add folder to spriter object
                aSpriter.addFolder(folder);
            }
        }

        // -------------------------------------------------------------------------
        private loadFiles(aFolder: Folder, aFiles: ISpriterNodeList): void {
            for (var f = 0; f < aFiles.length(); f++) {
                var file = aFiles.getFile(f);
                aFolder.addFile(file);
            }
        }

        // -------------------------------------------------------------------------
        private loadEntities(aSpriter: Spriter, aEntities: ISpriterNodeList): void {
            for (var i = 0; i < aEntities.length(); i++) {
                var entity = aEntities.getEntity(i);

                var bones = aEntities.getChildNodes(i, "obj_info");
                this.loadBones(entity, bones);
                bones.processed();

                var animations = aEntities.getChildNodes(i, "animation");
                this.loadAnimations(entity, animations);
                animations.processed();

                aSpriter.addEntity(entity);
            }
        }

        // -------------------------------------------------------------------------
        private loadBones(aEntity: Entity, aBones: ISpriterNodeList): void {
            for (var i = 0; i < aBones.length(); i++) {
                var bone = aBones.getObjectInfo(i);
                aEntity.addObjectInfo(bone);
            }
        }

        // -------------------------------------------------------------------------
        private loadAnimations(aEntity: Entity, aAnimations: ISpriterNodeList): void {
            for (var i = 0; i < aAnimations.length(); i++) {
                var animation = aAnimations.getAnimation(i);

                // main line keys
                var mainline = aAnimations.getChildNodes(i, "mainline");
                var mainlineKeys = mainline.getChildNodes(0, "key");
                this.loadMainlineKeys(animation, mainlineKeys);
                mainlineKeys.processed();
                mainline.processed();

                // timelines
                var timelines = aAnimations.getChildNodes(i, "timeline");
                this.loadTimelines(animation, timelines);
                timelines.processed();

                aEntity.addAnimation(animation);
            }
        }

        // -------------------------------------------------------------------------
        private loadMainlineKeys(aAnimation: Animation, aMainLineKeys: ISpriterNodeList): void {
            for (var i = 0; i < aMainLineKeys.length(); i++) {
                var mainLineKey = aMainLineKeys.getMainLineKey(i);

                // load bone refs
                var boneRefs = aMainLineKeys.getChildNodes(i, "bone_ref");
                for (var b = 0; b < boneRefs.length(); b++) {
                    mainLineKey.addBoneRef(boneRefs.getRef(b));
                }
                boneRefs.processed();
                
                // load sprite refs (object refs)
                var spriteRefs = aMainLineKeys.getChildNodes(i, "object_ref");
                for (var s = 0; s < spriteRefs.length(); s++) {
                    mainLineKey.addObjectRef(spriteRefs.getRef(s));
                }
                spriteRefs.processed();

                aAnimation.addMainLineKey(mainLineKey);
            }
        }

        // -------------------------------------------------------------------------
        private loadTimelines(aAnimation: Animation, aTimelines: ISpriterNodeList): void {
            for (var i = 0; i < aTimelines.length(); i++) {
                var timeline = aTimelines.getTimeline(i);

                var keys = aTimelines.getChildNodes(i, "key");
                this.loadTimelineKeys(timeline, keys);
                keys.processed();

                aAnimation.addTimeline(timeline);
            }
        }

        // -------------------------------------------------------------------------
        private loadTimelineKeys(aTimeline: Timeline, aKeys: ISpriterNodeList): void {
            for (var i = 0; i < aKeys.length(); i++) {
                var key = aKeys.getTimelineKey(i, this._spriter);
                aTimeline.addKey(key);
            }
        }
    }
}
