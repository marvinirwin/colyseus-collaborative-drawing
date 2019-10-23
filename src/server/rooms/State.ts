import {Schema, type, MapSchema, ArraySchema} from "@colyseus/schema";
/*import {Player} from "./Player";*/
import {Ship, ShipPlayer, ShipRoom} from './Ship';

/*export enum BRUSH {
    SKETCH = 's',
    MARKER = 'm',
    PEN = 'p',
    // ROUNDED = 'r',
}*/

/*export const DEFAULT_BRUSH = BRUSH.SKETCH;*/

/*export class Path extends Schema {
    @type("string") brush;
    @type("number") color: number;
    @type(["number"]) points = new ArraySchema<number>();
}*/

export class State extends Schema {
    @type("string") name: string;
    @type({ map: ShipPlayer }) players = new MapSchema<ShipPlayer>();
    @type({ map: ShipRoom }) rooms = new MapSchema<ShipRoom>();
    // @type({map: Player}) players = new MapSchema<Player>();

    // @type("number") countdown: number;
    // @type([Path]) paths = new ArraySchema<Path>();

    createPlayer(sessionId: string) {
        this.players[sessionId] = new ShipPlayer();
        this.players[sessionId].x = 0;
        this.players[sessionId].y = 0;
        return this.players[sessionId];
    }

    removePlayer(sessionId: string) {
        delete this.players[sessionId];
    }
}
