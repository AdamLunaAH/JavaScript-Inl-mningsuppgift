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

    console.log(data.pageItems?.length || 0);



    const _list = document.querySelector("#list-of-items");


    const btnPrev = document.querySelector("#prevBtn");
    const btnNext = document.querySelector("#nextBtn");



    btnPrev.addEventListener("click", clickHandlerPrev);
    btnNext.addEventListener("click", clickHandlerNext);

    function clickHandlerAllQ(e) {

        clearList();
        showGroups();
    }



    function clickHandlerClear(e) {
        clearList();
    }

    // //Paging
    function clickHandlerNext(e) {
            currentPageNr++;
        clickHandlerAllQ();
    }

    function clickHandlerPrev(e) {
        if (currentPageNr > 0) {
            currentPageNr--;
        }
        clickHandlerAllQ();
    }

    //Helpers
    async function showGroups() {


        await getMusicGroupsData();


        // showGroups
        //creat a row for every quote and append it to _list
        for (const item of data.pageItems) {
            // const div = createRow();
            const div = document.createElement("div");
            div.classList.add("col-md-12", "themed-grid-col");




            div.innerText = item.name + " " + item.establishedYear;
            // div.innerText = item.establishedYear;
            const link = document.createElement("a");
            link.href = `groupinfo.html?id=${item.musicGroupId}`;
            link.innerText = "Go to group info";
            link.classList.add("btn", "btn-primary", "btn-sm", "btn-block");
            link.setAttribute("role", "button");
            link.setAttribute("aria-pressed", "true");


            div.appendChild(link);

            _list.appendChild(div);
        }
    }


    // async function showGroups() {
    //     await getMusicGroupsData();

    //     for (const item of data.pageItems) {
    //         const li = document.createElement("li");
    //         li.innerText = `${item.name}`;
    //         _list.appendChild(li);
    //     }

    //     console.log(currentPageNr);
    // }


    function clearList() {
        while (_list.firstChild) {
            _list.removeChild(_list.firstChild);
        }
    }

    function createRow() {
        const div = document.createElement("div");
        div.classList.add("col-md-12", "themed-grid-col");
        return div;
    }











})();


// alert("hello");