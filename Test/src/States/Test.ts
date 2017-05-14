module SpriterExample {

    export class Test extends Phaser.State {

        private _spriterGroup: Spriter.SpriterGroup;
        private _text: string = "";

        // help item
        private _item: Phaser.Sprite;

        // -------------------------------------------------------------------------
        constructor() {
            super();
        }

        // -------------------------------------------------------------------------
        create() {
            this.stage.backgroundColor = 0x527F68;

            // ===============================================================
            // HELP ITEM (book image)
            // ===============================================================
            this._item = new Phaser.Sprite(this.game, 0, 0, "Item");
            this._item.anchor.set(0.5, 0.95);
            this._item.exists = false;
            this.world.add(this._item);


            // ===============================================================
            // BASIC SETUP
            // ===============================================================

            // create Spriter loader - class that can change Spriter file into internal structure
            var spriterLoader = new Spriter.Loader();

            // create Spriter file object - it wraps XML/JSON loaded with Phaser Loader
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
            var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"), /* optional parameters */ { imageNameType: Spriter.eImageNameType.NAME_ONLY });

            // proces Spriter file (XML/JSON) with Spriter loader - outputs Spriter animation which you can instantiate multiple times with SpriterGroup
            var spriterData = spriterLoader.load(spriterFile);

            // create actual renderable object - it is extension of Phaser.Group
            this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "Hero", 0, 100);
            this._spriterGroup.position.setTo(420, 400);

            // adds SpriterGroup to Phaser.World to appear on screen
            this.world.add(this._spriterGroup);

            // ===============================================================
            // LISTENING TO SIGNALS
            // ===============================================================

            // Spriter animation can send info on when sounds, events, tags, variable - here we are listening to Phaser.Signals when animation variable is set
            this._spriterGroup.onVariableSet.add(function (spriter: Spriter.SpriterGroup, variable: Spriter.Variable) {
                this._text = variable.string;
            }, this);


            // add point update callback
            this._spriterGroup.onPointUpdated.add(function (spriter: Spriter.SpriterGroup, pointObj: Spriter.SpriterObject) {
                if (this._item.exists) {
                    let transformed = pointObj.transformed;

                    // add SpriterGroups position and angle, bacause _item is in world space, but transformed values are in SpriterGroup local space
                    this._item.position.set(spriter.x + transformed.x, spriter.y + transformed.y);
                    // magic number 62.477 is initial angle of hand image in spriter animation. Compensate here to keep _item (book) more or less vertical
                    // if _item was something like gun or sword, it would look good without this compensation
                    this._item.angle = spriter.angle - 62.447 + transformed.angle;
                }
            }, this);


            // ===============================================================
            // REST OF THE EXAMPLE - change animations, change charmaps
            // ===============================================================

            // cycle animations
            var animation = 0;
            var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key.onDown.add(function () {
                animation = (animation + 1) % this._spriterGroup.animationsCount;
                this._spriterGroup.playAnimationById(animation);                
            }, this);
            
            // change char maps
            var charMaps = ["Green", "Brush"];
            var charmapID = 0;

            // on C key cycle through all charmaps
            key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            key.onDown.add(function () {
                if (charmapID >= this._spriterGroup.entity.charMapsLength) {
                    this._spriterGroup.clearCharMaps();
                    charmapID = 0;
                } else {
                    this._spriterGroup.pushCharMap(charMaps[charmapID]);
                    ++charmapID;
                }
            }, this);

            // on I key show / hide item attached to point
            key = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
            key.onDown.add(function () {
                this._item.exists = !this._item.exists;
            }, this);
        }

        // -------------------------------------------------------------------------
        update() {
            this._spriterGroup.updateAnimation();
        }

        // -------------------------------------------------------------------------
        render() {
            this.game.debug.text("Playing animation: " + this._spriterGroup.currentAnimationName + " (Press A to next...)", 50, 30, "rgb(255, 255, 255)");
            this.game.debug.text("Press C to cycle charmaps", 50, 46, "rgb(255, 255, 255)");
            this.game.debug.text("Press I to show / hide attached item (book)", 50, 62, "rgb(255, 255, 255)");
            this.game.debug.text(this._text, 80, 232, "rgb(255, 255, 255)");
        }


        /*

        // =========================================================================
        // ============= UNDER CONSTRUCTION - TOUCH AT YOUR OWN RISK ===============
        // =========================================================================

        // -------------------------------------------------------------------------
        // definitions if using minimized Spriter files
        public minimizedDefinitions: any = {
            "name": "spriter_data",
            "minName": "s",
            "attributes": {
                "scml_version": "v",
                "generator": "g",
                "generator_version": "gv"
            },
            "childElements": {
                "folder": {
                    "name": "folder",
                    "minName": "d",
                    "attributes": {
                        "id": "i",
                        "name": "n"
                    },
                    "childElements": {
                        "file": {
                            "name": "file",
                            "minName": "f",
                            "attributes": {
                                "id": "i",
                                "name": "n",
                                "width": "w",
                                "height": "h",
                                "pivot_x": "px",
                                "pivot_y": "py"
                            }
                        }
                    }
                },
                "entity": {
                    "name": "entity",
                    "minName": "e",
                    "attributes": {
                        "id": "i",
                        "name": "n"
                    },
                    "childElements": {
                        "obj_info": {
                            "name": "obj_info",
                            "minName": "o",
                            "attributes": {
                                "name": "n",
                                "type": "t",
                                "w": "w",
                                "h": "h"
                            },
                            "childElements": {
                                "frames": {
                                    "name": "frames",
                                    "minName": "f",
                                    "childElements": {
                                        "i": {
                                            "name": "i",
                                            "minName": "i",
                                            "attributes": {
                                                "folder": "d",
                                                "file": "f"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "animation": {
                            "name": "animation",
                            "minName": "a",
                            "attributes": {
                                "id": "i",
                                "name": "n",
                                "length": "l",
                                "interval": "t",
                                "looping": "c"
                            },
                            "childElements": {
                                "mainline": {
                                    "name": "mainline",
                                    "minName": "m",
                                    "childElements": {
                                        "key": {
                                            "name": "key",
                                            "minName": "k",
                                            "attributes": {
                                                "id": "i",
                                                "time": "t"
                                            },
                                            "childElements": {
                                                "bone_ref": {
                                                    "name": "bone_ref",
                                                    "minName": "b",
                                                    "attributes": {
                                                        "id": "i",
                                                        "parent": "p",
                                                        "timeline": "t",
                                                        "key": "k"
                                                    }
                                                },
                                                "object_ref": {
                                                    "name": "object_ref",
                                                    "minName": "o",
                                                    "attributes": {
                                                        "id": "i",
                                                        "name": "n",
                                                        "timeline": "t",
                                                        "parent": "p",
                                                        "key": "k",
                                                        "z_index": "z",
                                                        "folder": "d",
                                                        "file": "f",
                                                        "abs_x": "ax",
                                                        "abs_y": "ay",
                                                        "abs_pivot_x": "apx",
                                                        "abs_pivot_y": "apy",
                                                        "abs_scale_x": "asx",
                                                        "abs_scale_y": "asy",
                                                        "abs_angle": "r",
                                                        "abs_a": "a"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "timeline": {
                                    "name": "timeline",
                                    "minName": "t",
                                    "attributes": {
                                        "id": "i",
                                        "name": "n",
                                        "obj": "o",
                                        "object_type": "t"
                                    },
                                    "childElements": {
                                        "key": {
                                            "name": "key",
                                            "minName": "k",
                                            "attributes": {
                                                "id": "i",
                                                "time": "t",
                                                "spin": "s",
                                                "curve_type": "ct",
                                                "c1": "c1",
                                                "c2": "c2"
                                            },
                                            "childElements": {
                                                "bone": {
                                                    "name": "bone",
                                                    "minName": "b",
                                                    "attributes": {
                                                        "x": "x",
                                                        "y": "y",
                                                        "angle": "r",
                                                        "scale_x": "sx",
                                                        "scale_y": "sy"
                                                    }
                                                },
                                                "object": {
                                                    "name": "object",
                                                    "minName": "o",
                                                    "attributes": {
                                                        "folder": "d",
                                                        "file": "f",
                                                        "x": "x",
                                                        "y": "y",
                                                        "scale_x": "sx",
                                                        "scale_y": "sy",
                                                        "pivot_x": "px",
                                                        "pivot_y": "py",
                                                        "angle": "r",
                                                        "a": "a"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // ---- end ----
        */
    }
}
