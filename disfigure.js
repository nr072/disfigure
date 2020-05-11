"use strict";

const site = location.host;

const dsfg = {
    facebook: {
        options: [
            {
                text: "All",
                input_id: "opt_all",
                selector: "",
            }, {
                text: "Notification jewel",
                input_id: "opt_jewel",
                selector: "#fbNotificationsJewel",
            }, {
                text: "Notification card",
                input_id: "opt_card",
                selector: "#pagelet_dock > ._2xwp",
            }, {
                text: "Bluebar",
                input_id: "opt_bar",
                selector: "#bluebarRoot > div[role='banner']",
            }, {
                text: "Bluebar search box",
                input_id: "opt_search",
                selector: "div[role='search'][data-testid='facebar_root']",
            }, {
                text: "Chat tabs",
                input_id: "opt_chTabs",
                selector: "#pagelet_dock > .fbDockWrapperRight",
            }, {
                text: "Sidebar",
                input_id: "opt_sidebar",
                selector: "#pagelet_sidebar",
            },
        ],
    },
};



if (site === "www.facebook.com") {
    disfigure_facebook();
} else if (site === "www.youtube.com") {
    disfigure_youtube();
}



function create_option({input_id, text}) {

    let row = document.createElement("div"),
        label = document.createElement("label"),
        cb = document.createElement("input");

    label.className = "opt";
    label.innerText = text;
    label.setAttribute("for", input_id);

    cb.type = "checkbox";
    cb.id = input_id;
    cb.className = "cb";

    row.className = "row";
    row.appendChild(cb);
    row.appendChild(label);

    return row;

}



// For "done" button, and other potential options in future.
function create_special_row(name, text) {
    const row = document.createElement("div");
    if (name === "done") {
        row.id = "doneBtn";
    }
    row.className =
        name === "done" ? "row done"
        : "row";
    row.innerText = text;
    return row;
}



// Create the pop-up, add options, and add CSS to page's HTML.
function make_popup() {

    let logMessage = "";

    const popup = document.createElement("div");
    popup.id = "dsfg_popup";
    popup.className = "dsfg-popup";

    const optCont = document.createElement("div");
    optCont.className = "opt-cont";
    popup.appendChild(optCont);

    const doneButton = create_special_row("done", "Done");
    popup.appendChild(doneButton);

    const options = site === "www.facebook.com"
            ? dsfg.facebook.options
            : site === "www.youtube.com"
                ? dsfg.youtube.options
                : null;

    if (options.length < 1) {
        logMessage = "Error: No option found!";
    }

    // Create the options (removable part/element names).
    for (let i = 0; i < options.length; ++i) {
        optCont.appendChild(create_option({
            text: options[i].text,
            input_id: options[i].input_id,
        }));
    }

    document.body.appendChild(popup);

    const css = document.createElement("style");
    if (site === "www.facebook.com") {
        css.innerHTML = `
            .dsfg-popup {
                background-color: #fff;
                box-shadow: 0 0 1px 1px #ccc;
                height: 280px;
                left: 50%;
                position: fixed;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 180px;
                z-index: 9999;
            }
            .dsfg-popup .row,
            .dsfg-popup .opt {
                color: #777;
                text-align: center;
            }
            .dsfg-popup .opt {
                display: block;
                padding: 0.5em 1em;
            }
            .dsfg-popup .row:hover,
            .dsfg-popup .opt:hover {
                background-color: rgba(230, 230, 230, 0.7);
                cursor: pointer;
            }
            .dsfg-popup .row.done {
                font-variant: all-small-caps;
                font-weight: bold;
                height: 40px;
                line-height: 40px;
                padding: 0;
            }
            .dsfg-popup .opt-cont {
                height: 200px;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 20px 0;
            }
            .dsfg-popup input.cb {
                display: none;
            }
            .dsfg-popup .opt {
                font-weight: normal;
                padding: 0.5em 1em;
                text-align: center;
            }
            .dsfg-popup input.cb:checked + .opt {
                background-color: rgba(230, 230, 230, 0.7);
            }
        `;
    }
    document.head.appendChild(css);

    return logMessage;

}



// Remove parts/elements from page based on selected options.
function remove_elements() {

    let logMessage = "";

    let cbList = document.querySelectorAll(".dsfg-popup input.cb"),
        sList = dsfg.facebook.options.map(function (opt) {
            return opt.selector;
        });

    if (!cbList.length) {
        logMessage = "Error: Checkboxes not found!";
        return logMessage;
    }

    // Remove elements corresponding to checkboxes, but skipping the "all".
    for (let i = 1; i < cbList.length; ++i) {

        // Skip if option not selected.
        if (!cbList[i].checked) {
            continue;
        }

        const el = document.querySelector(sList[i]);
        if (!el) {
            logMessage = "Element not found: " + dsfg.facebook.options[i].text;
        }

        switch (i) {
            case 1:
            case 2:
            case 4:
            case 5:
            case 6:
                el && el.remove();
                break;
            case 3:
                if (el) {
                    el.style.background = "none";
                    el.style.borderBottom = "none";
                }
                break;
        }

    }

    return logMessage;

}



function disfigure_facebook() {

    // To show error or log-like messages to user in console.
    let logMessage = "";

    if (document.getElementById('dsfg_popup')) {
        console.log('Pop-up exists or same "id" in use!');
        return;
    }

    // Create pop-up and fill with site-specific options.
    logMessage = make_popup();

    const popup = document.getElementById("dsfg_popup");
    if (!popup) {
        console.log(logMessage || "Error: Something unexpected happened!");
        return;
    }

    // Select all options if the "all" option is selected.
    const allOpt = document.getElementById("opt_all");
    allOpt.addEventListener("change", function (e) {
        let cbList = document.querySelectorAll(".dsfg-popup input.cb");
        for(let i = 1; i < cbList.length; ++i) {
            cbList[i].checked = e.target.checked;
        }
    });

    // Remove if options are selected, and close pop-up.
    const doneBtn = document.getElementById("doneBtn");
    doneBtn.addEventListener("click", function () {
        logMessage = remove_elements();
        if (logMessage) {
            console.log(logMessage);
        }
        popup.remove();
    });

}



function disfigure_youtube() {

    // Remove pop-up container
    document.querySelectorAll('ytd-popup-container').style.display = 'none';

}
