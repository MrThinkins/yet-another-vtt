/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as creatures from "../creatures.js";
import type * as mapImages from "../mapImages.js";
import type * as maps from "../maps.js";
import type * as messages from "../messages.js";
import type * as migration from "../migration.js";
import type * as myFunctions from "../myFunctions.js";
import type * as rooms from "../rooms.js";
import type * as seversideFunctions_checkMessage from "../seversideFunctions/checkMessage.js";
import type * as seversideFunctions_diceRoll from "../seversideFunctions/diceRoll.js";
import type * as seversideFunctions_trimMessages from "../seversideFunctions/trimMessages.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  creatures: typeof creatures;
  mapImages: typeof mapImages;
  maps: typeof maps;
  messages: typeof messages;
  migration: typeof migration;
  myFunctions: typeof myFunctions;
  rooms: typeof rooms;
  "seversideFunctions/checkMessage": typeof seversideFunctions_checkMessage;
  "seversideFunctions/diceRoll": typeof seversideFunctions_diceRoll;
  "seversideFunctions/trimMessages": typeof seversideFunctions_trimMessages;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
