

if (window.location.href.indexOf("www.teepublic.com/t-shirts?query=") > -1) {



    //checkif user has inputted license key before doing this


    const ce_p = document.createElement('h3');
    ce_p.id = 'ce_p';
    ce_p.innerHTML = "Test Sample: "
    const ce_title2 = document.createElement('DIV');
    ce_title2.id = 'ce_title2b';
    ce_title2.appendChild(ce_p);
    document.querySelector("div.m-search__page-nav").appendChild(ce_title2);




};

