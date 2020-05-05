"use strict";

let site = location.host;

if (site === "www.facebook.com") {

    if (document.getElementById('disfg_popup')) {
        console.log('Pop-up exists or same "id" in use!');
        return;
    }

    let popup = document.createElement('div');
    popup.id = "disfg_popup";
    popup.innerHTML = `
        <label class="opt" name="all"><input type="checkbox">all</label>
        <label class="opt" name="jewel"><input type="checkbox">notif_jewel</label>
        <label class="opt" name="card"><input type="checkbox">notif_card</label>
        <label class="opt" name="bar"><input type="checkbox">bluebar</label>
        <label class="opt" name="search"><input type="checkbox">search bar</label>
        <label class="opt" name="tab"><input type="checkbox">chat tab</label>
        <label class="opt" name="sidebar"><input type="checkbox">sidebar</label>
        <button class="done">done</button>
    `;

    let css = document.createElement('style');
    css.innerHTML = `
        #disfg_popup {
            width: 150px;
            background-color: #fff;
            box-shadow: 0 0 7px 2px #aaa;
            padding: 20px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 9999
        }
        #disfg_popup > * {
            padding: 0.25rem 1rem;
            display: block;
            width: 100%;
        }
        #disfg_popup input[type="checkbox"] {
            vertical-align: middle;
        }
        #disfg_popup button.done {
            margin: 1rem auto .5rem;
        }
    `;

    document.body.appendChild(css);
    document.body.appendChild(popup);

    const slct_allOption = "#disfg_popup label[name='all'] > input[type='checkbox']";
    const slct_checkbox = "#disfg_popup label > input[type='checkbox']";

    // Check all options if the "all" option is checked. Uncheck all if "all"
    // is unchecked.
    document.querySelector(slct_allOption).onchange = function (e) {
        let cb = document.querySelectorAll(slct_checkbox);
        for(let i = 1; i < cb.length; ++i) {
            cb[i].checked = e.target.checked;
        }
    };

    // When the "done" button is clicked, remove selected elements/parts of
    // the page, and close pop-up.
    document.querySelector('#disfg_popup button.done').onclick = function () {

        let checks = document.querySelectorAll(slct_checkbox);
        let selectors = [
            "",
            "#fbNotificationsJewel",
            "#pagelet_dock>._2xwp",
            "#bluebarRoot>div[role='banner']",
            "div[role='search'][data-testid='facebar_root']",
            "#pagelet_dock>.fbDockWrapperRight",
            "#pagelet_sidebar",
        ];

        if (!checks.length) {
            return;
        }

        if (checks[1].checked) {
            let nj = document.querySelector(selectors[1]);
            nj && nj.remove();
        }
        if (checks[2].checked) {
            let nc = document.querySelector(selectors[2]);
            nc && nc.remove();
        }
        if (checks[3].checked) {
            let bb = document.querySelector(selectors[3]);
            if (bb) {
                bb.style.background = "none";
                bb.style.borderBottom = "none";
            }
        }
        if (checks[4].checked) {
            let sb = document.querySelector(selectors[4]);
            sb && sb.remove();
        }
        if (checks[5].checked) {
            let ct = document.querySelector(selectors[5]);
            ct && ct.remove();
        }
        if (checks[6].checked) {
            let sb = document.querySelector(selectors[6]);
            sb && sb.remove();
        }

        popup.remove();

    };

}

else if (site === "www.youtube.com") {

    // Remove pop-up container
    document.querySelectorAll('ytd-popup-container').style.display = 'none';

}