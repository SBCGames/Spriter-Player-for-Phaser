module Spriter {

    export const enum eObjectType {
        SPRITE, BONE, BOX, POINT, SOUND
    }

    export const enum eCurveType {
        LINEAR, INSTANT, QUADRATIC, CUBIC, QUARTIC, QUINTIC, BEZIER
    }

    export const enum eVariableType {
        INT, FLOAT, STRING
    }

    export class Types {

        private static nameToObjectType = {
            "sprite":   eObjectType.SPRITE,
            "bone":     eObjectType.BONE,
            "box":      eObjectType.BOX,
            "point":    eObjectType.POINT,
            "sound":    eObjectType.SOUND
        }

        private static nameToCurveType = {
            "instant":     eCurveType.INSTANT,
            "linear":       eCurveType.LINEAR,
            "quadratic":    eCurveType.QUADRATIC,
            "cubic":        eCurveType.CUBIC,
            "quartic":      eCurveType.QUARTIC,
            "quintic":      eCurveType.QUINTIC,
            "bezier":       eCurveType.BEZIER
        }

        private static nameToVariableType = {
            "int":      eVariableType.INT,
            "float":    eVariableType.FLOAT,
            "string":   eVariableType.STRING
        }

        // -------------------------------------------------------------------------
        public static getObjectTypeForName(typeName: string): eObjectType {

            var type: eObjectType = Types.nameToObjectType[typeName];

            if (type === undefined) {
                console.error("Unknown type of object: " + typeName);
            }

            return type;
        }

        // -------------------------------------------------------------------------
        public static getCurveTypeForName(typeName: string): eCurveType {

            var type: eCurveType = Types.nameToCurveType[typeName];

            if (type === undefined) {
                console.error("Unknown type of curve: " + typeName);
            }

            return type;
        }

        // -------------------------------------------------------------------------
        public static getVariableTypeForName(typeName: string): eVariableType {

            var type: eVariableType = Types.nameToVariableType[typeName];

            if (type === undefined) {
                console.error("Unknown type of variable: " + typeName);
            }

            return type;
        }
    }
}
