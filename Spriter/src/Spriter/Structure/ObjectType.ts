module Spriter {

    export enum eObjectType {
        SPRITE, BONE /*, BOX, POINT, SOUND, ENTITY, VARIABLE */
    };

    export class ObjectType {
        // -------------------------------------------------------------------------
        public static getObjectTypeForName(aTypeName: string): eObjectType {
            if (aTypeName === "sprite") {
                return eObjectType.SPRITE;
            } else if (aTypeName === "bone") {
                return eObjectType.BONE;
            }
        }
    }
}
