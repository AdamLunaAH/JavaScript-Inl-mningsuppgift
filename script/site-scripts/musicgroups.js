"use strict";

import musicService from "../database-script/music-group-services.js";

const _service = new musicService(
    `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
);

let data = [];
let currentPageNr = 0;
let searchInput = "";

// async function getMusicGroupsData() {
//     data = await _service.readMusicGroupsAsync(currentPageNr, true);
// }

async function isNullOrWhiteSpace(str) {
    return str == null || str.trim().length === 0;
}

async function getMusicGroupsData() {
    await isNullOrWhiteSpace(searchInput).then(async (result) => {
        if (result) {
            data = await _service.readMusicGroupsAsync(currentPageNr, true);
            console.log("nullOrWhiteSpaceTrue=", searchInput);
        } else {
            data = await _service.readMusicGroupsAsync(
                currentPageNr,
                true,
                searchInput
            );

            console.log("nullOrWhiteSpaceFalse=", searchInput);
        }
    });

    // if (searchInput) {
    //     data = await _service.readMusicGroupsAsync(currentPageNr, true, searchInput);
    // } else {
    //     data = await _service.readMusicGroupsAsync(currentPageNr, true,);
    // }
}

// let amountCount = await _service.readInfoAsync();
// let amountCount = await _service.readMusicGroupAsync();'

// const groupCount = document.querySelector("#music-group-count");
// // groupCount.innerText = `${amountCount.pageItems.length} music groups`;
// groupCount.innerText = `${amountCount.db.nrSeededMusicGroups} music groups`;

// await getMusicGroupsData();

(async () => {
    window.onload = showGroups();

    console.log(data.pageItems?.length || 0);

    const _list = document.querySelector("#list-of-items");

    const btnPrev = document.querySelector("#prevBtn");
    const btnNext = document.querySelector("#nextBtn");

    btnPrev.addEventListener("click", clickHandlerPrev);
    btnNext.addEventListener("click", clickHandlerNext);

    const btnClear = document.querySelector("#clear-btn");
    btnClear.addEventListener("click", clickHandlerClear);

    const searchBtn = document.querySelector("#search-btn");
    searchBtn.addEventListener("click", clickHandlerSearch);

    function clickHandlerAll(e) {
        clearSearch();
        showGroups();
    }

    function clickHandlerClear(e) {
        searchInput = "";
        document.querySelector("#search-input").value = "";
        clearSearch();
        showGroups();
        musicGroupCount();
    }

    function clickHandlerSearch(e) {
        searchInput = document.querySelector("#search-input").value;
        clearSearch();
        showGroups();
        musicGroupCount();
    }

    // //Paging
    function clickHandlerNext(e) {
        if (currentPageNr < data.pageCount - 1) {
            currentPageNr++;
        }
        clickHandlerAll();
    }

    function clickHandlerPrev(e) {
        if (currentPageNr > 0) {
            currentPageNr--;
        }
        clickHandlerAll();
    }

    function pageButtonCheck() {
        if (currentPageNr === 0 && data.pageCount === 1) {
            document.querySelector("#prevBtn").disabled = true;
            document.querySelector("#nextBtn").disabled = true;
        } else if (currentPageNr === 0) {
            document.querySelector("#prevBtn").disabled = true;
        } else if (currentPageNr === data.pageCount - 1) {
            document.querySelector("#nextBtn").disabled = true;
        } else {
            document.querySelector("#prevBtn").disabled = false;
            document.querySelector("#nextBtn").disabled = false;
        }
    }

    function musicGroupCount() {
        const groupCount = document.querySelector("#music-group-count");
        groupCount.innerText = `${data.dbItemsCount} music groups found`;
    }

    //Helpers
    async function showGroups() {
        // clearSearch();

        // Check if search input is empty

        await getMusicGroupsData();

        await pageButtonCheck();
        await musicGroupCount();

        for (const item of data.pageItems) {
            const div = document.createElement("div");
            div.classList.add(
                "col-md-12",
                "themed-grid-col",
                "d-flex",
                "justify-content-evenly"
            );

            const mgName = document.createElement("p");
            mgName.classList.add("music-group-name");
            mgName.innerText = item.name;

            div.appendChild(mgName);

            const mgYear = document.createElement("p");
            mgYear.classList.add("music-group-year");
            mgYear.innerText = item.establishedYear;
            div.appendChild(mgYear)
            // div.innerText = item.name + " " + item.establishedYear;
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

    function clearSearch() {
        while (_list.firstChild) {
            _list.removeChild(_list.firstChild);
        }
    }

    function createRow() {
        const div = document.createElement("div");
        div.classList.add("col-md-12", "themed-grid-col");
        return div;
    }

    // function search() {
    //     const searchInput = document.querySelector("#search-input").value;
    //     console.log(searchInput);

    //     _service.readMusicGroupsAsync(0, true, searchInput).then((result) => {
    //         data = result;
    //         clearSearch();
    //         showGroups();

    //         // Update the music group count
    //         const groupCount = document.querySelector("#music-group-count");
    //         groupCount.innerText = `${data.pageItems.length} music groups found`;
    //     });
    // }
})();
