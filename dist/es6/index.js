/*
 * natron-vinyl
 */
"use strict";

export { default as File, isVinyl } from "vinyl";
export { src, dest, symlink } from "vinyl-fs";
export { Transformer } from "vinyl-transformer";
export { piper } from "./piper";