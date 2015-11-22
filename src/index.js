/**
 * @module natron-vinyl
 */
// export {default as File, isVinyl} from "vinyl";
import File from "vinyl";
let {isVinyl} = File;
export {File, isVinyl};
export {src, dest, symlink} from "vinyl-fs";
export {Transformer, transformer} from "vinyl-transformer";
export {merge, awaitAll, fromPromise} from "./helper";
