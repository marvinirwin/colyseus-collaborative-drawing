import "./css/index.css";
import "./thirdparty/jscolor";
import { showGameplay } from "./pages/gameplay";

document.getElementById('join').onclick = e => {
    showGameplay();
};

