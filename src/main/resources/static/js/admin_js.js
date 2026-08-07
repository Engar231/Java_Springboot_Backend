function verificaRecinti() {
    // URL della GIF di Nedry
    const gifUrl = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTJrZ3J6NmV3OGd0NmtpdTU3dGltNngwY3lvYWpmOG85NWxzbDhxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QH9uCg7gS6EPm/giphy.gif";

    // Crea il contenitore overlay per lo sfondo scuro
    const overlay = document.createElement("div");
    overlay.id = "magic-word-modal";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    // Contenuto con GIF e testo
    overlay.innerHTML = `
        <div style="text-align: center; background-color: #121913; border: 2px solid #ff3333; padding: 20px; border-radius: 8px; max-width: 400px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
                <span style="color: #ff3333; font-weight: bold; font-family: monospace;">
                    Ah ah ah! Non hai detto la parolina magica!
                </span>
                <img src="${gifUrl}" alt="Nedry" style="width: 45px; height: auto; vertical-align: middle;">
            </div>
            <button onclick="document.getElementById('magic-word-modal').remove()" 
                    style="background-color: #ff3333; color: white; border: none; padding: 8px 16px; font-weight: bold; font-family: monospace; cursor: pointer; border-radius: 4px;">
                CHIUDI
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
}