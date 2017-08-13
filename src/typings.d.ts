/// <reference path="../node_modules/@types/parse/index.d.ts" />
/* SystemJS module definition */
declare var require: NodeRequire;
/* SystemJS module definition */
declare var module: NodeModule;

/* Declare a module for importing json documents with import keyword */
declare module "*.json" {
    const value: any;
    export default value;
}

declare var jquery: any;

interface NodeModule {
  id: string;
}