// scripts.js
const canvas = document.getElementById('hypercubeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

function createHypercube() {
    const vertices = [];
    for (let i = 0; i < 16; i++) {
        vertices.push([
            (i & 1) ? 1 : -1,
            (i & 2) ? 1 : -1,
            (i & 4) ? 1 : -1,
            (i & 8) ? 1 : -1
        ]);
    }
    return vertices;
}

function connectEdges(vertices) {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            if (vertices[i].reduce((acc, val, idx) => acc + (val !== vertices[j][idx]), 0) === 1) {
                edges.push([i, j]);
            }
        }
    }
    return edges;
}

function rotationMatrix4D(theta, axis1, axis2) {
    const rm = Array.from({ length: 4 }, () => Array(4).fill(0));
    for (let i = 0; i < 4; i++) rm[i][i] = 1;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    rm[axis1][axis1] = c;
    rm[axis1][axis2] = -s;
    rm[axis2][axis1] = s;
    rm[axis2][axis2] = c;
    return rm;
}

function projectTo3D(vertices4D, distance = 5) {
    return vertices4D.map(v => {
        const w = distance / (distance - v[3]);
        return [v[0] * w, v[1] * w, v[2] * w];
    });
}

function drawHypercube(vertices, edges) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const projected = projectTo3D(vertices);
    const scale = 100;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2;

    edges.forEach(([i, j]) => {
        const [x1, y1] = projected[i];
        const [x2, y2] = projected[j];
        ctx.beginPath();
        ctx.moveTo(x1 * scale + offsetX, y1 * scale + offsetY);
        ctx.lineTo(x2 * scale + offsetX, y2 * scale + offsetY);
        ctx.strokeStyle = '#e50914';
        ctx.stroke();
    });
}

const vertices = createHypercube();
const edges = connectEdges(vertices);
let angle = 0;

function animate() {
    const rm = rotationMatrix4D(angle, 0, 1);
    const rotatedVertices = vertices.map(v => {
        const nv = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                nv[i] += v[j] * rm[j][i];
            }
        }
        return nv;
    });
    drawHypercube(rotatedVertices, edges);
    angle += 0.01;
    requestAnimationFrame(animate);
}

animate();