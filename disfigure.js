"use strict";

const site = location.host;

const dsfg = function () {

    const facebook = {

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
                text: "Sneaky",
                input_id: "preset_sneaky",
            },
        ],

    };

    return {

        // Returns targets of specified indexes.
        fb_t_list: function (indexes) {
            if (indexes && indexes.length > 0) {
                return facebook.targets.filter((t, i) => indexes.indexOf(i) > -1 );
            } else {
                return facebook.targets;
            }
        },

        // Returns presets of specified indexes.
        fb_p_list: function (indexes) {
            if (indexes && indexes.length > 0) {
                return facebook.presets.filter((t, i) => { indexes.indexOf(i) > -1 });
            } else {
                return facebook.presets;
            }
        },

    };

}();



if (site === "www.facebook.com") {
    disfigure_facebook();
} else if (site === "www.youtube.com") {
    disfigure_youtube();
}



// Create the clickable options that correspond to different parts of the
// webpage (excluding the top ("Presets", "Home") and the bottom ("Done")
// buttons).
function create_option({input_id, text, label_id}) {

    let row = document.createElement("div");
    row.className = "row";

    // Create a checkbox <input> and add it before the <label> element.
    if (input_id) {
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = input_id;
        cb.className = "cb";
        row.appendChild(cb);
    }

    // The <label> element comes after the <input> so that a checked <input>
    // can easily affect the appearance of its corresponding <label>.
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



// Create the top and the bottom buttons.
function create_special_row(name) {
    const row = document.createElement("div");
    row.id = name === "Presets" ? "presets_btn"
        : name === "Home" ? "presets_back_btn"
        : name === "Done" ? "doneBtn"
        : "";
    row.className = name === "Presets" ? "row preset-btn"
        : name === "Home" ? "row preset-btn"
        : name === "Done" ? "row done"
        : "row";
    row.innerText = name;
    return row;
}



// Create the sliding panels.
function create_panel({id, classes, h_text, options, f_text}) {

    const panel = document.createElement("div");
    panel.id = id;
    panel.className = "panel";

    // Add the panel-specific class names.
    classes.forEach(function (class_name) {
        panel.classList.add(class_name);
    });

    // the top button ("Presets", "Home").
    const header = create_special_row(h_text);
    panel.appendChild(header);

    // The container for the main options - the ones that correspond to
    // different parts of the webpage.
    const optCont = document.createElement("div");
    optCont.className = "opt-cont";
    panel.appendChild(optCont);

    // Create the main options.
    for (let i = 0; i < options.length; ++i) {
        optCont.appendChild(create_option({
            text: options[i].text,
            input_id: options[i].input_id,
        }));
    }

    // The bottom ("Done") button.
    const footer = create_special_row(f_text);
    panel.appendChild(footer);

    return panel;

}



// Create the pop-up, add options, and add CSS to page's HTML.
function make_popup() {

    let status = "";

    const popup = document.createElement("div");
    popup.id = "dsfg_popup";
    popup.className = "dsfg-popup";

    const targets = site === "www.facebook.com" ? dsfg.fb_t_list() : null;

    if (!targets || targets.length) {
        status = "Error: No option found!";
    }


    // Create the panel with the main options.
    const home_panel = create_panel({
        id: "home_panel",
        classes: ["home-panel"],
        h_text: "Presets",
        options: targets,
        f_text: "Done",
    });

    const presets = site === "www.facebook.com" ? dsfg.fb_p_list() : null;

    if (!presets || presets.length) {
        status = status || "Error: No preset found!";
    }

    // Create the panel with the presets, hidden by default.
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

    return status;

}



// Reveal the target panel and hide the others.
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



// Remove parts of the webpage based on selected options (checkboxes).
function remove_elements() {

    let status = "";

    let cbList = document.querySelectorAll(".dsfg-popup .home-panel .cb"),
        sList = dsfg.fb_t_list().map(function (opt) {
            return opt.selector;
        });

    if (!cbList || !cbList.length) {
        status = "Error: Checkboxes not found!";
        return status;
    }

    // Check which checkboxes are checked, and remove corresponding parts.
    for (let i = 0; i < cbList.length; ++i) {

        if (!cbList[i].checked) {
            continue;
        }

        const target = document.querySelector(sList[i]);
        if (!target) {
            status = status || ("Element not found: " + dsfg.fb_t_list()[i].text);
        }

        // Mostly remove target parts. Otherwise, modify some CSS.
        switch (i) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 5:
                target && target.remove();
                break;
            case 2:
                if (target) {
                    target.style.background = "none";
                    target.style.borderBottom = "none";
                }
                const sb = target.querySelector("div[role='search']");
                sb.style.border = "none";
                break;
        }

    }

    return status;

}



// Main function to run on a Facebook page.
function disfigure_facebook() {

    let status = "";

    if (document.getElementById("dsfg_popup")) {
        status = 'Pop-up exists or same element "id" in use!';
        console.log(status);
        return;
    }

    // Create pop-up and fill with site-specific options.
    status = make_popup();
    status && console.log(status);

    const popup = document.getElementById("dsfg_popup");
    if (!popup) {
        console.log(status || "Error: Something unexpected happened!");
        return;
    }

    // Hide the Home panel and open the Presets panel when the "Presets"
    // button is clicked.
    const pres_btn = document.getElementById("presets_btn");
    pres_btn.addEventListener("click", function () {
        show_panel("presets");
    });

    // Hide the Presets panel and open the Home panel when the "Home"
    // button is clicked.
    const pres_back_btn = document.getElementById("presets_back_btn");
    pres_back_btn.addEventListener("click", function () {
        show_panel("home");
    });

    const preset_sneaky = document.getElementById("preset_sneaky");
    preset_sneaky.addEventListener("change", function (e) {
        const id_list = dsfg.fb_t_list().map(p => p.input_id);
        id_list.forEach(id => {
            const input = document.getElementById(id);
            input.checked = e.target.checked;
        });
    });

    // Remove if options are selected, and close pop-up.
    const doneBtns = popup.querySelectorAll(".row.done");
    doneBtns.forEach(function (doneBtn) {
        doneBtn.addEventListener("click", function () {
            status = remove_elements();
            status && console.log(status);
            popup.remove();
        });
    });

}



function disfigure_youtube() {

    // Remove pop-up container
    document.querySelectorAll('ytd-popup-container').style.display = 'none';

}
