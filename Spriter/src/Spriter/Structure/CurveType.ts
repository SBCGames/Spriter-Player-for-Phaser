module Spriter {

    export enum eCurveType { LINEAR, INSTANT, QUADRATIC, CUBIC };

    export class CurveType {
        // -------------------------------------------------------------------------
        public static getCurveTypeForName(aCurveTypeName: string): eCurveType {
            if (aCurveTypeName === "linear") {
                return eCurveType.LINEAR;
            } else if (aCurveTypeName === "instant") {
                return eCurveType.INSTANT;
            } else if (aCurveTypeName === "quadratic") {
                return eCurveType.QUADRATIC;
            } else if (aCurveTypeName === "cubic") {
                return eCurveType.CUBIC;
            } else {
                console.warn("Unknown curve type: " + aCurveTypeName);
            }
        }
    }
}
