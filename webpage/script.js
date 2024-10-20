document.addEventListener('DOMContentLoaded', () => {

    function validateAccessCode() {
        const accessCode = document.getElementById('access-code').value;
        const validCodes = ['1234', '5678']; // Example valid codes

        if (validCodes.includes(accessCode)) {
            window.location.href = 'chatvoid.html';
        } else {
            alert('Invalid access code');
        }
    }

    // Make the function available globally
    window.validateAccessCode = validateAccessCode;
    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (!userInput) return;

        // Display user input in chat window
        const chatWindow = document.getElementById('chat-window');
        const userMessage = document.createElement('div');
        userMessage.textContent = `You: ${userInput}`;
        chatWindow.appendChild(userMessage);

        // Clear the input field
        document.getElementById('user-input').value = '';

        // Fetch response from OpenAI's API
        try {
            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_OPENAI_API_KEY`
                },
                body: JSON.stringify({
                    prompt: userInput,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            const botMessage = document.createElement('div');
            botMessage.textContent = `Bot: ${data.choices[0].text.trim()}`;
            chatWindow.appendChild(botMessage);

            // Scroll to the bottom of the chat window
            chatWindow.scrollTop = chatWindow.scrollHeight;
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
        }
    }

    // Add event listener to input field for Enter key
    document.getElementById('user-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Make the function available globally
    window.sendMessage = sendMessage;

    function drawTesseract() {
        // Get the canvas and context
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Define the vertices of a tesseract in 4D space
        const points = [
            [-1, -1, -1, -1],
            [-1, -1, -1,  1],
            [-1, -1,  1, -1],
            [-1, -1,  1,  1],
            [-1,  1, -1, -1],
            [-1,  1, -1,  1],
            [-1,  1,  1, -1],
            [-1,  1,  1,  1],
            [ 1, -1, -1, -1],
            [ 1, -1, -1,  1],
            [ 1, -1,  1, -1],
            [ 1, -1,  1,  1],
            [ 1,  1, -1, -1],
            [ 1,  1, -1,  1],
            [ 1,  1,  1, -1],
            [ 1,  1,  1,  1],
        ];

        // Define edges connecting the vertices
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                let diff = 0;
                for (let k = 0; k < 4; k++) {
                    if (points[i][k] !== points[j][k]) diff++;
                }
                if (diff === 1) {
                    edges.push([i, j]);
                }
            }
        }

        // Rotation angles for the different planes
        let angle = 0;

        function rotate4D(point) {
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            let x = point[0];
            let y = point[1];
            let z = point[2];
            let w = point[3];

            // Rotation in XZ plane
            let x2 = x * cosA - z * sinA;
            let z2 = x * sinA + z * cosA;

            // Rotation in XW plane
            let x3 = x2 * cosA - w * sinA;
            let w2 = x2 * sinA + w * cosA;

            // Rotation in YZ plane
            let y2 = y * cosA - z2 * sinA;
            let z3 = y * sinA + z2 * cosA;

            // Rotation in YW plane
            let y3 = y2 * cosA - w2 * sinA;
            let w3 = y2 * sinA + w2 * cosA;

            // Rotation in ZW plane
            let z4 = z3 * cosA - w3 * sinA;
            let w4 = z3 * sinA + w3 * cosA;

            return [x3, y3, z4, w4];
        }

        function project(point4D) {
            // Project from 4D to 3D
            const distance = 2;
            const w = 1 / (distance - point4D[3]);
            const x = point4D[0] * w;
            const y = point4D[1] * w;
            const z = point4D[2] * w;
            return [x, y, z];
        }

        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Rotate and project points
            const transformed_points = [];
            for (let i = 0; i < points.length; i++) {
                const rotated = rotate4D(points[i]);
                const projected = project(rotated);
                transformed_points.push(projected);
            }

            // Draw edges
            ctx.strokeStyle = '#ffffff';
            for (let i = 0; i < edges.length; i++) {
                const p1 = transformed_points[edges[i][0]];
                const p2 = transformed_points[edges[i][1]];
                ctx.beginPath();
                ctx.moveTo(p1[0] * 200 + canvas.width / 2, p1[1] * 200 + canvas.height / 2);
                ctx.lineTo(p2[0] * 200 + canvas.width / 2, p2[1] * 200 + canvas.height / 2);
                ctx.stroke();
            }
        }

        function animate() {
            angle += 0.01;
            draw();
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Call the function to draw the tesseract
    drawTesseract();
});
