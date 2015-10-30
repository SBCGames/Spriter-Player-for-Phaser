module Spriter {

    export abstract class SpriterFile {

        protected _minimized: boolean;
        private _minDefs: any;
        private _minDefsStack: any[];

        // -------------------------------------------------------------------------
        public abstract getNodes(aNodeName: string): ISpriterNodeList;

        // -------------------------------------------------------------------------
        public processed(): void {
            this.popMinDefsStack();
        }

        // -------------------------------------------------------------------------
        protected setMinimized(aMinimized: boolean, aMinDefs: any = null) {
            this._minimized = aMinimized;
            this._minDefs = aMinDefs;

            if (aMinimized) {
                this._minDefsStack = [];

                if (aMinDefs === null) {
                    console.error("Spriter file is minimized - you must provide object with name definitions");
                    return;
                }
            }
        }

        // -------------------------------------------------------------------------
        protected getFileNameWithoutExtension(aPath: string): string {
            var name = (aPath.split('\\').pop().split('/').pop().split('.'))[0];
            return name;
        }

        // -------------------------------------------------------------------------
        protected translateElementName(aElementName: string): string {
            if (this._minimized) {
                if (this._minDefs["name"] !== aElementName) {
                    console.warn("current definition is " + this._minDefs["name"]);
                    return aElementName;
                }

                if (this._minDefs["minName"] !== null) {
                    aElementName = this._minDefs["minName"];
                }
            }

            return aElementName;
        }

        // -------------------------------------------------------------------------
        protected translateChildElementName(aElementName: string): string {
            if (this._minimized && this._minDefs !== null) {
                var elements = this._minDefs["childElements"];
                if (elements !== null) {
                    aElementName = elements[aElementName] === null ? aElementName : elements[aElementName]["minName"];
                }
            }
            return aElementName;
        }

        // -------------------------------------------------------------------------
        protected translateAttributeName(aAttributeName: string): string {
            if (this._minimized && this._minDefs !== null) {
                var attributes = this._minDefs["attributes"];
                if (attributes !== null) {
                    aAttributeName = attributes[aAttributeName] === null ? aAttributeName : attributes[aAttributeName];
                }
            }
            return aAttributeName;
        }

        // -------------------------------------------------------------------------
        protected setMinDefsToElementName(aTagName: string): void {
            if (this._minimized) {
                // save current level of min defs
                this._minDefsStack.push(this._minDefs);
                // get child definition and set it as current
                var minDef = this._minDefs["childElements"][aTagName];
                this._minDefs = minDef;
            }
        }

        // -------------------------------------------------------------------------
        protected popMinDefsStack(): void {
            if (this._minimized) {
                this._minDefs = this._minDefsStack.pop();
            }
        }
    }
}
