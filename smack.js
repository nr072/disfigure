if(document.getElementById('smack_popup')){
    console.log('Same "id" in use!');
    return;
}
let pop=document.createElement('div');
pop.id="smack_popup";
pop.innerHTML=`
    <label class="opt" name="all"><input type="checkbox">all</label>
    <label class="opt" name="jewel"><input type="checkbox">notif_jewel</label>
    <label class="opt" name="card"><input type="checkbox">notif_card</label>
    <label class="opt" name="bar"><input type="checkbox">bluebar</label>
    <label class="opt" name="search"><input type="checkbox">search bar</label>
    <label class="opt" name="tab"><input type="checkbox">chat tab</label>
    <button class="done">done</button>
`;
let s=document.createElement('style');
s.innerHTML=`
    #smack_popup{
        width:150px;
        background-color:#fff;
        box-shadow:0 0 7px 2px #aaa;
        padding:20px;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:99
    }
    #smack_popup>*{
        padding:0.25rem 1rem;
        display:block;
        width:100%;
    }
    #smack_popup input[type="checkbox"]{
        vertical-align:middle;
    }
    #smack_popup button.done{
        margin:1rem auto .5rem;
    }
`;
document.body.appendChild(s);
document.body.appendChild(pop);
document.querySelector('#smack_popup label[name="all"]>input[type="checkbox"]').onchange=function(e){
    let cb=document.querySelectorAll('#smack_popup label>input[type="checkbox"]');
    for(let c=1;c<cb.length;++c){
        cb[c].checked=e.target.checked;
    }
};
document.querySelector('#smack_popup button.done').onclick=function(){
    let v=document.querySelectorAll('#smack_popup input[type="checkbox"]');
    let css=[
        "",
        "#fbNotificationsJewel",
        "#pagelet_dock>._2xwp",
        "#bluebarRoot>div[role='banner']",
        "div[role='search'][data-testid='facebar_root']",
        "#pagelet_dock>.fbDockWrapperRight"
    ];
    if(!v.length)
        return;
    if(v[1].checked){
        let nj=document.querySelector(css[1]);
        if(nj)
            nj.remove();
    }
    if(v[2].checked){
        let nc=document.querySelector(css[2]);
        if(nc)
            nc.remove();
    }
    if(v[3].checked){
        let bb=document.querySelector(css[3]);
        if(bb){
            bb.style.background="none";
            bb.style.borderBottom="none";
        }
    }
    if(v[4].checked){
        let sb=document.querySelector(css[4]);
        if(sb)
            sb.remove();
    }
    if(v[5].checked){
        let ct=document.querySelector(css[5]);
        if(ct)
            ct.remove();
    }
    pop.remove();
};
