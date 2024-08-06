window.onload = function() {
    const noteArea = document.getElementById('noteArea');
    const canvas = document.getElementById('drawArea');
    const ctx = canvas.getContext('2d');
    const clearCanvasButton = document.getElementById('clearCanvas');
    const emailInput = document.getElementById('email');
    const sendEmailButton = document.getElementById('sendEmail');

    // Drawing functionality
    let drawing = false;

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    clearCanvasButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Email functionality
    sendEmailButton.addEventListener('click', () => {
        const email = emailInput.value;
        const notes = noteArea.value;
        const canvasDataUrl = canvas.toDataURL();

        if (email && notes) {
            const emailContent = `
                Notes: ${notes}
                <br><br>
                <img src="${canvasDataUrl}">
            `;
            window.location.href = `mailto:${email}?subject=Notes and Drawing&body=${encodeURIComponent(emailContent)}`;
        } else {
            alert('Please enter your email and write some notes.');
        }
    });
};
