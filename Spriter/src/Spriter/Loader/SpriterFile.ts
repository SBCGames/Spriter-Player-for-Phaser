module Spriter {

    export enum eFileType { XML, JSON, BIN }

    export abstract class SpriterFile {

        protected _minimized: boolean;
        private _minDefs: any;
        private _minDefsStack: any[];

        // -------------------------------------------------------------------------
        public abstract getNodes(nodeName: string): ISpriterNodeList;

        // -------------------------------------------------------------------------
        public abstract getType(): eFileType;

        // -------------------------------------------------------------------------
        public processed(): void {
            this.popMinDefsStack();
        }

        // -------------------------------------------------------------------------
        protected setMinimized(minimized: boolean, minDefs: any = null) {
            this._minimized = minimized;
            this._minDefs = minDefs;

            if (minimized) {
                this._minDefsStack = [];

                if (minDefs === null) {
                    console.error("Spriter file is minimized - you must provide object with name definitions");
                    return;
                }
            }
        }

        // -------------------------------------------------------------------------
        protected getFileNameWithoutExtension(path: string): string {
            var name = (path.split('\\').pop().split('/').pop().split('.'))[0];
            return name;
        }

        // -------------------------------------------------------------------------
        protected translateElementName(elementName: string): string {
            if (this._minimized) {
                if (this._minDefs["name"] !== elementName) {
                    console.warn("current definition is " + this._minDefs["name"]);
                    return elementName;
                }

                if (this._minDefs["minName"] !== null) {
                    elementName = this._minDefs["minName"];
                }
            }

            return elementName;
        }

        // -------------------------------------------------------------------------
        protected translateChildElementName(elementName: string): string {
            if (this._minimized && this._minDefs !== null) {
                var elements = this._minDefs["childElements"];
                if (elements !== null) {
                    elementName = elements[elementName] === null ? elementName : elements[elementName]["minName"];
                }
            }
            return elementName;
        }

        // -------------------------------------------------------------------------
        protected translateAttributeName(attributeName: string): string {
            if (this._minimized && this._minDefs !== null) {
                var attributes = this._minDefs["attributes"];
                if (attributes !== null) {
                    attributeName = attributes[attributeName] === null ? attributeName : attributes[attributeName];
                }
            }
            return attributeName;
        }

        // -------------------------------------------------------------------------
        protected setMinDefsToElementName(tagName: string): void {
            if (this._minimized) {
                // save current level of min defs
                this._minDefsStack.push(this._minDefs);
                // get child definition and set it as current
                var minDef = this._minDefs["childElements"][tagName];
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
