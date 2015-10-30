module Spriter {

    export class SpriterObject extends SpriterBone {

        private _spriter: Spriter;
        private _sprite: Phaser.Sprite;

        // -------------------------------------------------------------------------
        constructor(aSpriter: Spriter, aSprite: Phaser.Sprite) {
            super();

            this._spriter = aSpriter;
            this._sprite = aSprite;
        }

        // -------------------------------------------------------------------------
        public get sprite(): Phaser.Sprite {
            return this._sprite;
        }

        // -------------------------------------------------------------------------
        public setOn(aOn: boolean): void {
            super.setOn(aOn);

            this._sprite.exists = aOn;
            this._sprite.visible = aOn;
        }

        // -------------------------------------------------------------------------
        public setKey(aAnimation: Animation, aTimelineId: number, aKeyId: number): void {
            super.setKey(aAnimation, aTimelineId, aKeyId);

            // set sprite
            var spriteKey = (<ObjectTimelineKey> this.key);
            var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
                
            this._sprite.frameName = file.name;
        }

        // -------------------------------------------------------------------------
        public update(aParent: SpatialInfo): void {
            super.update(aParent);

            this.updateSprite();
        }

        // -------------------------------------------------------------------------
        public updateSprite(): void {
            var t = this.transformed;
            var s = this.sprite;

            s.position.setTo(t.x, t.y);
            s.scale.setTo(t.scaleX, t.scaleY);
            s.anchor.setTo(t.pivotX, t.pivotY);

            s.alpha = t.alpha;
            s.angle = t.angle;
        }
    }
}
