import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

export class ShipPlayer extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("string") name: string;
}
export class ShipRoom extends Schema {
  @type("number") x1: number;
  @type("number") y1: number;
  @type("number") x2: number;
  @type("number") y2: number;
}

export class Ship extends Schema {
}
