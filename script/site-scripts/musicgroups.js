"use strict";
// import {
//     seedGenerator,
//     uniqueId,
//     randomNumber,
//     deepCopy,
//     isEqual,
// } from "../../SeidoHelpers/seido-helpers.js";

import musicService from "../database-script/music-group-services.js";


const _service = new musicService(
    `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
);


let data = [];
let currentPageNr = 0;

async function getMusicGroupsData() {
    data = await _service.readMusicGroupsAsync(currentPageNr, true);
}




await getMusicGroupsData();

(async () => {

    window.onload = showGroups();

    // let data = await _service.readMusicGroupsAsync(currentPageNr, true);

    // const pageSize = 10;

    // const maxPageNr = Math.ceil(data.length / pageSize);

    console.log(data.pageItems?.length || 0);

    // console.log(maxPageNr);

    // let currentPageNr = 0;

    const _list = document.querySelector("#list-of-items");
    const clearBtn = document.querySelector("#clearBtn");
    const allQ = document.querySelector("#allQBtn");
    // // const loveQ = document.querySelector("#loveQBtn");

    const btnPrev = document.querySelector("#prevBtn");
    const btnNext = document.querySelector("#nextBtn");

    clearBtn.addEventListener("click", clickHandlerClear);
    allQ.addEventListener("click", clickHandlerAllQ);
    // loveQ.addEventListener("click", clickHandlerLoveQ);

    btnPrev.addEventListener("click", clickHandlerPrev);
    btnNext.addEventListener("click", clickHandlerNext);

    function clickHandlerAllQ(e) {
        // let _groups = data.name.slice(
        //     currentPageNr * pageSize,
        //     currentPageNr * pageSize + pageSize
        // );

        // fillList(_groups);

        clearList();
        showGroups();
    }

    // function clickHandlerLoveQ(e) {
    //     //filter out all love quotes from _seeder.allQuote
    //     let _groups = data.filter((item) =>
    //         item.group.toLowerCase().includes("love")
    //     );
    //     fillList(_groups);
    // }

    function clickHandlerClear(e) {
        clearList();
    }

    // //Paging
    function clickHandlerNext(e) {
        // if (currentPageNr < maxPageNr - 1) {
            currentPageNr++;
        // }
        clickHandlerAllQ();
    }

    function clickHandlerPrev(e) {
        if (currentPageNr > 0) {
            currentPageNr--;
        }
        clickHandlerAllQ();
    }

    // //Helpers
    // function fillList(_groups) {
    //     //Clear first
    //     clearList();

    //     showGroups
    // //     //creat a row for every quote and append it to _list
    // //     for (const item of groups) {
    // //         const div = createRow();
    // //         div.innerText = item.name;
    // //         _list.appendChild(div);
    // //     }
    // }

    function clearList() {
        while (_list.firstChild) {
            _list.removeChild(_list.firstChild);
        }
    }

    // function createRow() {
    //     const div = document.createElement("div");
    //     div.classList.add("col-md-12", "themed-grid-col");
    //     return div;
    // }




    async function showGroups() {

        await getMusicGroupsData();

        for (const item of data.pageItems) {
            const li = document.createElement("li");
            li.innerText = `${item.name}`;
            _list.appendChild(li);
        }

        console.log(currentPageNr);
    }

    // showGroups();


})();


// alert("hello");