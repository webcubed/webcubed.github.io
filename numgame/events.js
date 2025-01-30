document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("optionscontainer").addEventListener("click", () => {
        updateConfig();
        if (!configValues?.twoPlayer) {
            document.getElementById("customnumberselection").style.display = "none";
        } else {
            document.getElementById("customnumberselection").style.display = "block";
        }
    });
});
