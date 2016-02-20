/// <reference path="SpriterBone.ts" />
module Spriter {

    export class SpriterObject extends SpriterBone {

        private _spriter: Spriter;
        private _charMapStack: CharMapStack;
        private _sprite: Phaser.Sprite;

        private _file: File;
        private _hide; boolean;

        // -------------------------------------------------------------------------
        constructor(parent: SpriterGroup, sprite: Phaser.Sprite) {
            super();

            this._spriter = parent.spriter;
            this._charMapStack = parent.charMapStack;
            this._sprite = sprite;
        }

        // -------------------------------------------------------------------------
        public get sprite(): Phaser.Sprite {
            return this._sprite;
        }

        // -------------------------------------------------------------------------
        public setOn(on: boolean): void {
            super.setOn(on);

            this._sprite.exists = on;
            this._sprite.visible = (on && !this._hide);
        }

        // -------------------------------------------------------------------------
        public setKey(entity: Entity, animation: Animation, timelineId: number, keyId: number): void {
            super.setKey(entity, animation, timelineId, keyId);

            // set sprite - skip invisible objects - boxes, points
            if (this.type === eObjectType.SPRITE) {
                var spriteKey = (<KeyObject>this.key);
                var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
                this._file = file;
                this.setFile(file);
            } else {
                this._file = null;
            }
        }

        // -------------------------------------------------------------------------
        public resetFile(): void {
            if (this.type === eObjectType.SPRITE) {
                this.setFile(this._file);
            }
        }

        // -------------------------------------------------------------------------
        private setFile(file: File): void {
            file = this._charMapStack.getFile(file);

            if (file !== null) {
                this._hide = false;
                this._sprite.frameName = file.name;
            } else {
                this._hide = true;
                this._sprite.visible = false;
            }
        }

        // -------------------------------------------------------------------------
        public update(parent: SpatialInfo): void {
            super.update(parent);

            this.updateSprite();
        }

        // -------------------------------------------------------------------------
        public updateSprite(): void {
            var t = this.transformed;
            var s = this.sprite;

            s.position.set(t.x, t.y);
            s.scale.set(t.scaleX, t.scaleY);
            s.anchor.set(t.pivotX, t.pivotY);

            s.alpha = t.alpha;
            s.angle = t.angle;
        }
    }
}
