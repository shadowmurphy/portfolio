document.addEventListener("DOMContentLoaded", () => {
    $.ajax({
        type: "GET",
        url: "/list",
        success: function(res) {
            populateButtons(res);
        },
        error: function(res) {
            console.log(res);
        }
    });
});


function populateButtons(data) {
    const form = document.querySelector('form');
    for (let i = 0; i < data.length; i++) {
        createButton(form, data[i], i);
    }
}

function createButton(form, item, index) {
    const { title } = item;
    const button = document.createElement('button');
    button.textContent = title;
    button.id = `work-${index}`;
    form.appendChild(button);
    button.addEventListener("click", function(event) {
        fetchWorkDetails(event);
    });
}

function fetchWorkDetails(event) {
    event.preventDefault();
    const match = event.target.id.match(/^work-(\d+)$/);
    if (!match) return;
    const [, id] = match;
    $.ajax({
        type: "GET",
        url: "/work",
        data: { id: id },
        success: function(res) {
            displayWorkInfo(res);
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function displayWorkInfo(data) {
    const main = document.getElementById("info");
    main.innerHTML = '';
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    const p = document.createElement("p");
    p.textContent = new Date().toLocaleString();
    p.style.color = "#3E4046";
    header.appendChild(h1);
    header.appendChild(p);
    const info = document.createElement("div");
    info.innerHTML = data.text;
    main.appendChild(header);
    main.appendChild(info);
}