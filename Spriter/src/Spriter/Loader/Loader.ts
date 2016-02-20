module Spriter {

    export class Loader {

        private _spriter: Spriter;
        private _fileType: eFileType;

        // -------------------------------------------------------------------------
        public load(file: SpriterFile): Spriter {

            this._spriter = new Spriter();
            this._fileType = file.getType();

            // folders and files
            var folders = file.getNodes("folder");
            this.loadFolders(this._spriter, folders);
            folders.processed();

            // tags
            var tags = file.getNodes("tag_list");
            this.loadTags(this._spriter, tags);
            tags.processed();

            // entity
            var entities = file.getNodes("entity");
            this.loadEntities(this._spriter, entities);
            entities.processed();

            return this._spriter;
        }

        // -------------------------------------------------------------------------
        private loadFolders(spriter: Spriter, folders: ISpriterNodeList): void {
            // through all folders
            for (var i = 0; i < folders.length(); i++) {
                var folder = folders.getFolder(i);

                // images in folder - ignore sounds
                var files = folders.getChildNodes(i, "file");
                this.loadFiles(folder, files);
                files.processed();

                // add folder to spriter object
                spriter.addFolder(folder);
            }
        }

        // -------------------------------------------------------------------------
        private loadFiles(folder: Folder, files: ISpriterNodeList): void {
            for (var f = 0; f < files.length(); f++) {
                var file = files.getFile(f);

                // null is returned if file is not image but sound
                if (file !== null) {
                    folder.addFile(file);
                }
            }
        }

        // -------------------------------------------------------------------------
        private loadTags(spriter: Spriter, tags: ISpriterNodeList): void {
            // no tags
            if (tags.length() === 0) {
                return;
            }

            var tagDefs = tags.getChildNodes(0, "i");

            for (var i = 0; i < tagDefs.length(); i++) {
                var tag = tagDefs.getTag(i);
                spriter.addTag(tag);
            }

            tagDefs.processed();
        }

        // -------------------------------------------------------------------------
        private loadEntities(spriter: Spriter, entities: ISpriterNodeList): void {
            for (var i = 0; i < entities.length(); i++) {
                var entity = entities.getEntity(i);

                // bones, boxes, ...
                var objInfos = entities.getChildNodes(i, "obj_info");
                this.loadObjInfo(entity, objInfos);
                objInfos.processed();

                // character maps
                var charMaps = entities.getChildNodes(i, "character_map");
                this.loadCharMaps(entity, charMaps);
                charMaps.processed();

                // variable definitions
                var variables = entities.getChildNodes(i, "var_defs");
                this.loadVariables(entity, variables);
                variables.processed();

                // animations
                var animations = entities.getChildNodes(i, "animation");
                this.loadAnimations(entity, animations);
                animations.processed();

                spriter.addEntity(entity);
            }
        }

        // -------------------------------------------------------------------------
        private loadObjInfo(entity: Entity, objInfos: ISpriterNodeList): void {
            for (var i = 0; i < objInfos.length(); i++) {
                var objInfo = objInfos.getObjectInfo(i);
                entity.addObjectInfo(objInfo);
            }
        }

        // -------------------------------------------------------------------------
        private loadCharMaps(entity: Entity, charMaps: ISpriterNodeList): void {
            for (var i = 0; i < charMaps.length(); i++) {
                var charMap = charMaps.getCharMap(i);

                var charMapEntries = charMaps.getChildNodes(i, "map");
                this.loadCharMapEntries(charMap, charMapEntries);
                charMapEntries.processed();

                entity.addCharMap(charMap);
            }
        }

        // -------------------------------------------------------------------------
        private loadCharMapEntries(charMap: CharMap, charMapEntries: ISpriterNodeList): void {
            for (var i = 0; i < charMapEntries.length(); i++) {
                charMapEntries.getCharMapEntry(i, charMap, this._spriter);
            }
        }

        // -------------------------------------------------------------------------
        private loadVariables(entity: Entity, variables: ISpriterNodeList): void {
            // no variables
            if (variables.length() === 0) {
                return;
            }

            // different structure for json than for xml
            var varDefs: ISpriterNodeList;
            if (this._fileType !== eFileType.JSON) {
                varDefs = variables.getChildNodes(0, "i");
            } else {
                varDefs = variables;
            }

            for (var i = 0; i < varDefs.length(); i++) {
                var varDef = varDefs.getVariable(i);
                entity.addVariable(varDef);
            }

            // different structure for json than for xml
            if (this._fileType !== eFileType.JSON) {
                varDefs.processed();
            } 
        }

        // -------------------------------------------------------------------------
        private loadAnimations(entity: Entity, animations: ISpriterNodeList): void {
            for (var i = 0; i < animations.length(); i++) {
                var animation = animations.getAnimation(i);

                // main line keys
                var mainlines = animations.getChildNodes(i, "mainline");
                this.loadMainline(animation, mainlines);
                mainlines.processed();

                // timelines
                var timelines = animations.getChildNodes(i, "timeline");
                this.loadTimelines(animation, timelines);
                timelines.processed();

                // sound lines
                var soundlines = animations.getChildNodes(i, "soundline");
                this.loadSoundlines(animation, soundlines);
                soundlines.processed();

                // event lines
                var eventlines = animations.getChildNodes(i, "eventline");
                this.loadEventlines(animation, eventlines);
                eventlines.processed();

                // get meta tag
                var meta = animations.getChildNodes(i, "meta");
                if (meta.length() > 0) {
                    // var lines
                    // OMG - typo in attribute name in JSOUN export... what the hell! TODO - remove when corrected
                    var varlines = meta.getChildNodes(0, (this._fileType !== eFileType.JSON) ? "varline" : "valline");
                    this.loadVarlines(entity, animation, varlines);
                    varlines.processed();

                    // tag lines
                    var taglines = meta.getChildNodes(0, "tagline");
                    this.loadTaglines(animation, taglines);
                    taglines.processed();
                }
                meta.processed();

                // add completely built animation to entity
                entity.addAnimation(animation);
            }
        }

        // -------------------------------------------------------------------------
        private loadMainline(animation: Animation, mainlines: ISpriterNodeList): void {
            var mainline = mainlines.getMainline(0);
            mainline.type = eTimelineType.MAIN_LINE;

            var mainlineKeys = mainlines.getChildNodes(0, "key");
            this.loadMainlineKeys(mainline, mainlineKeys);
            mainlineKeys.processed();

            animation.mainline = mainline;
        }

        // -------------------------------------------------------------------------
        private loadMainlineKeys(mainline: Baseline, mainlineKeys: ISpriterNodeList): void {
            for (var i = 0; i < mainlineKeys.length(); i++) {
                var mainLineKey = mainlineKeys.getMainlineKey(i);

                // load bone refs
                var boneRefs = mainlineKeys.getChildNodes(i, "bone_ref");
                for (var b = 0; b < boneRefs.length(); b++) {
                    mainLineKey.addBoneRef(boneRefs.getRef(b));
                }
                boneRefs.processed();
                
                // load sprite refs (object refs)
                var spriteRefs = mainlineKeys.getChildNodes(i, "object_ref");
                for (var s = 0; s < spriteRefs.length(); s++) {
                    mainLineKey.addObjectRef(spriteRefs.getRef(s));
                }
                spriteRefs.processed();

                mainline.add(mainLineKey);
            }
        }

        // -------------------------------------------------------------------------
        private loadTimelines(animation: Animation, aTimelines: ISpriterNodeList): void {
            for (var i = 0; i < aTimelines.length(); i++) {
                var timeline = aTimelines.getTimeline(i);

                var keys = aTimelines.getChildNodes(i, "key");
                this.loadTimelineKeys(timeline, keys);
                keys.processed();

                animation.addTimeline(timeline);
            }
        }

        // -------------------------------------------------------------------------
        private loadTimelineKeys(aTimeline: Timeline, aKeys: ISpriterNodeList): void {
            for (var i = 0; i < aKeys.length(); i++) {
                var key = aKeys.getTimelineKey(i, this._spriter);
                aTimeline.add(key);
            }
        }

        // -------------------------------------------------------------------------
        private loadSoundlines(animation: Animation, soundlines: ISpriterNodeList): void {
            for (var i = 0; i < soundlines.length(); i++) {
                var soundline = soundlines.getSoundline(i);
                soundline.type = eTimelineType.SOUND_LINE;

                var keys = soundlines.getChildNodes(i, "key");
                this.loadKeys(soundline, keys);
                keys.processed();

                animation.addLine(soundline);
            }
        }

        // -------------------------------------------------------------------------
        private loadKeys(timeline: Baseline, keys: ISpriterNodeList): void {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getKey(i);
                timeline.add(key);
            }
        }

        // -------------------------------------------------------------------------
        private loadEventlines(animation: Animation, eventlines: ISpriterNodeList): void {
            for (var i = 0; i < eventlines.length(); i++) {
                var eventline = eventlines.getEventline(i);
                eventline.type = eTimelineType.EVENT_LINE;

                var keys = eventlines.getChildNodes(i, "key");
                this.loadKeys(eventline, keys);
                keys.processed();

                animation.addLine(eventline);
            }
        }

        // -------------------------------------------------------------------------
        private loadTaglines(animation: Animation, taglines: ISpriterNodeList): void {
            for (var i = 0; i < taglines.length(); i++) {
                var tagline = taglines.getTagline(i);
                tagline.type = eTimelineType.TAG_LINE;

                var keys = taglines.getChildNodes(i, "key");
                this.loadTagKeys(tagline, keys);
                keys.processed();

                animation.addLine(tagline);
            }
        }

        // -------------------------------------------------------------------------
        private loadTagKeys(tagline: Baseline, keys: ISpriterNodeList): void {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getTagKey(i);

                var tagChangeElements = keys.getChildNodes(i, "tag");
                var tagChanges = tagChangeElements.getTagChanges(this._spriter);
                tagChangeElements.processed();

                key.tagsOn = tagChanges;

                tagline.add(key);
            }
        }

        // -------------------------------------------------------------------------
        private loadVarlines(entity: Entity, animation: Animation, varlines: ISpriterNodeList): void {
            for (var i = 0; i < varlines.length(); i++) {
                var varline = varlines.getVarline(i);

                var type = entity.getVariableById(varline.varDefId).type;

                var keys = varlines.getChildNodes(i, "key");
                this.loadVariableKeys(varline, keys, type);
                keys.processed();

                animation.addLine(varline);
            }
        }

        // -------------------------------------------------------------------------
        private loadVariableKeys(varline: Varline, keys: ISpriterNodeList, type: eVariableType): void {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getVariableKey(i, type);
                varline.add(key);
            }
        }
    }
}
