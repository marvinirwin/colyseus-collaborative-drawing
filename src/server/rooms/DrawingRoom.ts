import { Room, Client } from "colyseus";
import { State} from "./State";
import { generateName } from "../utils/name_generator";
import Drawing from "../db/Drawing";
import {Ship, ShipPlayer, ShipRoom} from "./Ship";
import {MapSchema} from "@colyseus/schema/lib/types/MapSchema";


function createRooms(): MapSchema<ShipRoom> {
  const rooms = new MapSchema<ShipRoom>();
  const maxRooms = 10;
  const r = Math.random();
  const roomCount = Math.floor(maxRooms * r);
  // Should I make them contiguous?  I mean shapesips are contiguous, but walls may separate
  // Yeah let's make them contiguous for now
  // Should also add onChange to the name element
  for (let i = 0; i < roomCount; i++) {
      rooms[i] = new ShipRoom();
  }
  return rooms;
}
export class DrawingRoom extends Room<State> {
  autoDispose = false;
  lastChatMessages: string[] = [];

  onCreate(options) {
    this.setState(new State());
    this.state.rooms = createRooms()
/*    this.setSimulationInterval(() => this.countdown(), 1000);*/
  }

  onJoin(client: Client, options: any) {
    const player = this.state.createPlayer(client.sessionId);
    player.name = options.nickname || generateName();
    // this.lastChatMessages.forEach(chatMsg => this.send(client, ['chat', chatMsg]));
  }

  onMessage(client: Client, charCode: string) {
/*      console.log(client.sessionId);*/
      const player: ShipPlayer = this.state.players[client.sessionId];
/*    const [command, data] = message;*/

    switch(charCode) {
      case "a":
        player.x -= 1;
        break;
      case "s":
        player.y += 1;
        break;
      case "d":
          player.x += 1;
        break;
      case "w":
        player.y -= 1;
        break;

    }
    // Let's just test this out by moving forward
/*    player.x += 1;
    player.y += 1;*/

    // Wait will the decorator handle the broadcast for me?
    // It handles the players paths
    // We'll see
    // this.broadcast(['ship', this.state.ship]);
    return;
/*    const command = '';
    const data = '';
    // change angle
    if (command === "chat") {
      const chatMsg = `${player.name}: ${data}`;
      this.broadcast(['chat', chatMsg]);
      this.lastChatMessages.push(chatMsg);

      // prevent history from being 50+ messages long.
      if (this.lastChatMessages.length > 50) {
        this.lastChatMessages.shift();
      }

    } else if (this.state.countdown > 0) {
      if (command === "s") {
        //
        // start new path.
        //
        // store it in the `player` instance temporarily,
        // and assign it to the state.paths once it's complete!
        //
        player.lastPath = new Path();
        player.lastPath.points.push(...data);
        player.lastPath.color = message[2];
        player.lastPath.brush = message[3] || DEFAULT_BRUSH;

      } else if (command === "p") {
        // add point to the path
        player.lastPath.points.push(...data);

      } else if (command === "e") {
        //
        // end the path
        // this is now going to synchronize with all clients
        //
        this.state.paths.push(player.lastPath);
      }
    }*/
  }

/*  countdown() {
    if (this.state.countdown > 0) {
      this.state.countdown--;

    } else if (!this.autoDispose) {
      this.autoDispose = true;
      this.resetAutoDisposeTimeout(5);
    }
  }*/

  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId);
  }

  async onDispose() {
    console.log("Disposing room, let's persist its result!");

/*    if (this.state.paths.length > 0) {
      await Drawing.create({
        paths: this.state.paths,
        mode: this.roomName,
        votes: 0,
      });
    }*/
  }

}
