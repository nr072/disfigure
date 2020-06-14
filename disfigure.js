"use strict";

const site = location.host;

const dsfg = {
    facebook: {
        targets: [
            {
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
                text: "Page background",
                input_id: "opt_pageBg",
                selector: "#globalContainer",
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
        presets: [
            {
                text: "All",
                input_id: "preset_all",
            },
        ],
    },
};



if (site === "www.facebook.com") {
    disfigure_facebook();
} else if (site === "www.youtube.com") {
    disfigure_youtube();
}



function create_option({input_id, text, label_id}) {

    let row = document.createElement("div");
    row.className = "row";

    if (input_id) {
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = input_id;
        cb.className = "cb";
        row.appendChild(cb);
    }

    let label = document.createElement("label");
    if (label_id) {
        label.id = label_id;
    }
    label.className = "opt";
    label.innerText = text;
    input_id && label.setAttribute("for", input_id);
    row.appendChild(label);

    return row;

}



// For "done" button, and other potential options in future.
function create_special_row(name) {
    const row = document.createElement("div");
    row.id =
        name === "Presets" ? "presets_btn"
        : name === "Home" ? "presets_back_btn"
        : name === "Done" ? "doneBtn"
        : "";
    row.className =
        name === "Presets" ? "row preset-btn"
        : name === "Home" ? "row preset-btn"
        : name === "Done" ? "row done"
        : "row";
    row.innerText = name;
    return row;
}



function create_panel({id, classes, h_text, options, f_text}) {

    const panel = document.createElement("div");
    panel.id = id;
    panel.className = "panel";
    classes.forEach(function (class_name) {
        panel.classList.add(class_name);
    });

    const header = create_special_row(h_text);
    panel.appendChild(header);

    const optCont = document.createElement("div");
    optCont.className = "opt-cont";
    panel.appendChild(optCont);

    // Create the options (removable part/element names). If option is a
    // preset, do not pass input id. The <input> element will not be
    // created.
    for (let i = 0; i < options.length; ++i) {
        optCont.appendChild(create_option({
            text: options[i].text,
            input_id: options[i].input_id,
        }));
    }

    const footer = create_special_row(f_text);
    panel.appendChild(footer);

    return panel;

}



// Create the pop-up, add options, and add CSS to page's HTML.
function make_popup() {

    let logMessage = "";

    const popup = document.createElement("div");
    popup.id = "dsfg_popup";
    popup.className = "dsfg-popup";

    const targets = site === "www.facebook.com"
            ? dsfg.facebook.targets
            : site === "www.youtube.com"
                ? dsfg.youtube.options
                : null;

    if (targets.length < 1) {
        logMessage = "Error: No option found!";
    }

    const home_panel = create_panel({
        id: "home_panel",
        classes: ["home-panel"],
        h_text: "Presets",
        options: targets,
        f_text: "Done"
    });

    const presets = site === "www.facebook.com"
            ? dsfg.facebook.presets
            : null;

    if (presets.length < 1) {
        logMessage = "Error: No option found!";
    }

    const presets_panel = create_panel({
        id: "presets_panel",
        classes: ["presets-panel", "collapsed"],
        h_text: "Home",
        options: presets,
        f_text: "Done",
    });

    popup.appendChild(home_panel);
    popup.appendChild(presets_panel);
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
            .dsfg-popup .panel {
                display: inline-block;
                transition: width 0.3s cubic-bezier(0.5, 0, 0.7, 0.7);
                width: 100%;
            }
            .dsfg-popup .panel.collapsed {
                width: 0;
            }
            .dsfg-popup .row,
            .dsfg-popup .opt {
                color: #777;
                overflow: hidden;
                text-align: center;
            }
            .dsfg-popup .opt {
                display: block;
                height: 1rem;
                margin-top: 2px;
                padding: 0.5em 1em;
            }
            .dsfg-popup .row:hover,
            .dsfg-popup .opt:hover {
                background-color: rgba(230, 230, 230, 0.7);
                cursor: pointer;
            }
            .dsfg-popup .row.preset-btn,
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
            }
            .dsfg-popup input.cb {
                display: none;
            }
            .dsfg-popup .opt {
                font-weight: normal;
                line-height: 1.1rem;
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



function show_panel(name) {

    const home_panel = document.getElementById("home_panel");
    const presets_panel = document.getElementById("presets_panel");
    let next, past;

    if (name === "presets") {
        next = presets_panel;
        past = home_panel;
    } else if (name === "home") {
        next = home_panel;
        past = presets_panel;
    }

    next.classList.remove("collapsed");
    past.classList.add("collapsed");

}



// Remove parts/elements from page based on selected options.
function remove_elements() {

    let logMessage = "";

    let cbList = document.querySelectorAll(".dsfg-popup .home-panel input.cb"),
        sList = dsfg.facebook.targets.map(function (opt) {
            return opt.selector;
        });

    if (!cbList.length) {
        logMessage = "Error: Checkboxes not found!";
        return logMessage;
    }

    // Remove elements corresponding to checkboxes.
    for (let i = 0; i < cbList.length; ++i) {

        // Skip if option not selected.
        if (!cbList[i].checked) {
            continue;
        }

        const el = document.querySelector(sList[i]);
        if (!el) {
            const msg = "Element not found: " + dsfg.facebook.targets[i].text;
            logMessage = logMessage || msg;
        }

        switch (i) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 5:
                el && el.remove();
                break;
            case 2:
                if (el) {
                    el.style.background = "none";
                    el.style.borderBottom = "none";
                }
                const sb = el.querySelector("div[role='search']");
                sb.style.border = "none";
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
    const pres_btn = document.getElementById("presets_btn");
    pres_btn.addEventListener("click", function () {
        show_panel("presets");
    });

    // Select all options if the "all" option is selected.
    const pres_back_btn = document.getElementById("presets_back_btn");
    pres_back_btn.addEventListener("click", function () {
        show_panel("home");
    });

    // Select all options if the "all" preset is selected.
    const preset_all = document.getElementById("preset_all");
    preset_all.addEventListener("change", function (e) {
        let cbList = document.querySelectorAll(".dsfg-popup input.cb");
        for(let i = 0; i < cbList.length; ++i) {
            cbList[i].checked = e.target.checked;
        }
    });

    // Remove if options are selected, and close pop-up.
    const doneBtns = document.querySelectorAll(".row.done");
    doneBtns.forEach(function (doneBtn) {
        doneBtn.addEventListener("click", function () {
            logMessage = remove_elements();
            if (logMessage) {
                console.log(logMessage);
            }
            popup.remove();
        });
    });

}



function disfigure_youtube() {

    // Remove pop-up container
    document.querySelectorAll('ytd-popup-container').style.display = 'none';

}
