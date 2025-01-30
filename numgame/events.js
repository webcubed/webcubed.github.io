document.addEventListener("DOMContentLoaded", () => {
    updateConfig();
    document.getElementById("optionscontainer").addEventListener("click", () => {
        if (!configValues?.twoPlayer) {
            document.getElementById("customnumberselection").style.display = "none";
        } else {
            document.getElementById("customnumberselection").style.display = "block";
        }
    });
});
