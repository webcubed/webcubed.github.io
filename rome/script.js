window.onload=function() {
document
    .getElementsByClassName('popupbg')[0]
    .style
    .animation = 'fadein 0.5s linear forwards';
document
    .getElementsByClassName('popupbg')[0]
    .style
    .display = "block";
document
    .getElementsByClassName('popupbg')[0]
    .addEventListener("click", function (event) {
        if (event.target == document.getElementsByClassName('popupbg')[0]) {
            document
                .getElementsByClassName('popupbg')[0]
                .style
                .animation = 'fadeout 0.5s linear forwards';
            setTimeout(() => {
                document
                    .getElementsByClassName('popupbg')[0]
                    .style
                    .display = "none";
            }, 500);
        }
    });
document
    .getElementsByClassName('close')[0]
    .addEventListener('click', function () {
        document
            .getElementsByClassName('popupbg')[0]
            .style
            .animation = 'fadeout 0.5s linear forwards';
        setTimeout(() => {
            document
                .getElementsByClassName('popupbg')[0]
                .style
                .display = "none";
        }, 500);
    });
}