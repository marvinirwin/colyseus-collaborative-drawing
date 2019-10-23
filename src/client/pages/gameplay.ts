import {client} from "../utils/networking";
import {Room} from "colyseus.js";
import {State} from "../../server/rooms/State";
import {ChangeTree} from "@colyseus/schema/lib/ChangeTree";
import {ShipPlayer, ShipRoom} from "../../server/rooms/Ship";

let room: Room<State>;

const gameEl = document.getElementById('game') as HTMLCanvasElement;
const gameContext = gameEl.getContext('2d');
const debug = document.getElementById('debug') as HTMLDivElement;



export async function showGameplay() {
    room = await client.joinOrCreate("default", {
        nickname: (document.getElementById('username') as HTMLInputElement).value
    });
    function render() {
        // clear
        // gameContext.clearRect(0, 0, gameEl.width, gameEl.height);
        gameContext.fillStyle = 'rgb(0, 0, 200)';
        // Fill in the background
        gameContext.fillRect(0, 0, gameEl.width, gameEl.height);
        gameContext.font = '24px serif';
        gameContext.fillStyle = 'rgb(0, 0, 0)';
        // Fill in the rooms
        for (let id in room.state.rooms) {
            const shipRoom: ShipRoom = room.state.rooms[id];
            gameContext.fillStyle = 'rgb(255, 255, 0)';
            gameContext.fillRect(
                shipRoom.x1,
                shipRoom.y1,
                shipRoom.x2 - shipRoom.x1,
                shipRoom.y2 - shipRoom.y1
            );
        }

        for (let id in room.state.players) {
            const p: ShipPlayer = room.state.players[id];
            gameContext.fillRect(p.x, p.y, 25, 25);
        }
        gameContext.fillStyle = 'rgb(256, 256, 256)';
        for (let id in room.state.players) {
            const p: ShipPlayer = room.state.players[id];
            gameContext.fillText(p.name, p.x, p.y + 50);
        }

    }
    room.state.players.onChange = (player: ShipPlayer, key: string) => {
        render();
    };


    room.state.onChange = (changes) => {

    };

/*    room.state.paths.onAdd = function (path, index) {
    };*/

    room.onMessage((message) => {
    });
    // room.onStateChange.once(() => gameplay.classList.remove('loading'));

    // So this is where I put my events and stuff, in my case it will be real time position updates
    // Is this library performant enough?

    // Only one way to find out
    // Let's just have a person walk around
    // Should we have the players be separate from the room?
    // No I don't think so?  Each frame should be delivered with full coordinates, cause im lazy
}
function checkRoom() {
    return (room);
}


export function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
setInterval(() => {
    let anies = Object.entries(keys).filter(([k, v]) => v);
    anies.map(([k, v]) => {
        room.send(k);
    })
}, 100);
let keys = {};
gameEl.addEventListener("keyup", (e: KeyboardEvent) => {
    if (!checkRoom()) return;
    keys[e.key] = 0;
});
gameEl.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!checkRoom()) return;

    keys[e.key] = 1;



    // room.send(['s', point, color, brush]);
    // The first element is the command
    // All the rest is data?
    // Yeah it's all hardcoded
    // So I'll just send buttons
    // How come i can't insert KeyboardEvent
/*    room.send(e.key);*/

    /*    clearCanvas(prevCtx);*/
    return;

    /*    isDrawing = true;
        points = [];
        points.push(...point);*/
});

/*export function hideGameplay() {
    gameplay.classList.add('hidden');
}*/

/*
ctx.lineWidth = 1;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, color = 0x000000, brush = DEFAULT_BRUSH, points = [];
*/


/*prevCanvas.addEventListener("mousedown", (e) => startPath(e.offsetX, e.offsetY));
prevCanvas.addEventListener("mousemove", (e) => movePath(e.offsetX, e.offsetY));
prevCanvas.addEventListener("mouseup", (e) => endPath());

prevCanvas.addEventListener("touchstart", (e) => {
    var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    var x = e.touches[0].pageX - (rect.left - bodyRect.left);
    var y = e.touches[0].pageY - (rect.top - bodyRect.top);
    return startPath(x, y);
});
prevCanvas.addEventListener("touchmove", (e) => {
    var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    var x = e.touches[0].pageX - (rect.left - bodyRect.left);
    var y = e.touches[0].pageY - (rect.top - bodyRect.top);
    movePath(x, y)
});
prevCanvas.addEventListener("touchend", (e) => endPath());*/

/**
 * Tools: colorpicker
 */
/*gameplay.querySelector('.colorpicker').addEventListener("change", (e) => {
    color = parseInt("0x" + (e.target as HTMLInputElement).value);
});*/

/**
 * Tools: brush
 */
/*Array.from(document.querySelectorAll('input[type=radio][name="brush"]')).forEach(radioButton => {
    radioButton.addEventListener('change', (e) => {
        brush = (e.target as HTMLInputElement).value as BRUSH;
    });
});*/

/*function startPath(x, y) {
    if (!checkRoom()) {
        return;
    }

    const point = [x, y];
    room.send(['s', point, color, brush]);

    clearCanvas(prevCtx);

    isDrawing = true;
    points = [];
    points.push(...point);
}*/

/*function movePath(x, y) {
    if (!checkRoom()) {
        return;
    }
    if (!isDrawing) {
        return;
    }

    const point = [x, y];
    room.send(['p', point]);

    points.push(...point);
    brushFunctions[brush](prevCtx, color, points, true);
}*/

/*function endPath() {
    room.send(['e']);

    isDrawing = false;
    points.length = 0;

    clearCanvas(prevCtx);
}*/


/*function millisecondsToStr(_seconds) {
    let temp = _seconds;
    const years = Math.floor(temp / 31536000),
        days = Math.floor((temp %= 31536000) / 86400),
        hours = Math.floor((temp %= 86400) / 3600),
        minutes = Math.floor((temp %= 3600) / 60),
        seconds = temp % 60;

    if (days || hours || seconds || minutes) {
        return (years ? years + "y " : "") +
            (days ? days + "d " : "") +
            (hours ? hours + "h " : "") +
            (minutes ? minutes + "m " : "") +
            seconds + "s";
    }

    return "< 1s";
}*/
/*chatEl.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = chatEl.querySelector('input[type=text]') as HTMLInputElement;
    room.send(['chat', input.value]);
    input.value = "";
});*/

/*gameplay.querySelector('.info a').addEventListener("click", (e) => {
    e.preventDefault();

    if (room) {
        room.leave();
    }

    location.hash = "#";
});*/

/*  room.state.players.onAdd = (player, sessionId) => {
    const playerEl = document.createElement("li");

/!*    if (sessionId === room.sessionId) { playerEl.classList.add('you'); }*!/

    playerEl.innerText = player.name;
    playerEl.id = `p${sessionId}`;
    peopleEl.appendChild(playerEl);
  }*/
/*    room.state.players.onRemove = (player, sessionId) => {
        const playerEl = peopleEl.querySelector(`#p${sessionId}`);
        peopleEl.removeChild(playerEl);
    };*/
/*        changes.forEach(change => {
            if (change.field === "countdown") {
/!*                countdownEl.innerHTML = (change.value > 0)
                    ? millisecondsToStr(change.value)
                    : "Time is up!";*!/
            }
        });*/
/*        brushFunctions[path.brush](ctx, path.color, path.points, false);*/
/*        const [cmd, data] = message;
        if (cmd === "chat") {
            const message = document.createElement("li");
            message.innerText = data;
            chatMessagesEl.appendChild(message);
            chatEl.scrollTop = chatEl.scrollHeight;
        }*/
