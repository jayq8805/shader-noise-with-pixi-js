"use strict";

import DrawCanvas from "./drawCanvas"

//VanilaなのでGetElementしていますが、Reactなら UseRefで応用
const canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0]

const App = new DrawCanvas(canvas)


