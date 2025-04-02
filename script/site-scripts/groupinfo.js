"use strict";

import musicService from "../database-script/music-group-services.js";

const _service = new musicService(
    `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
);

// const linkString = window.location.href;
// console.log(linkString);

const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
        return searchParams.get(prop);
    },
});

console.log(urlParams.id);

let groupData = [];

let artistData = [];
let albumData = [];

async function getMusicGroupData() {
    // data = await _service.readMusicGroupsAsync(0, true);
    groupData = await _service.readMusicGroupDtoAsync(urlParams.id);
    console.log(groupData);
}

async function getMusicGroupArtists(artistId) {
    artistData = await _service.readArtistDtoAsync(artistId);
    // console.log(artistData);
    // return artistData;
}

async function getMusicGroupAlbums() {
    albumData = await _service.readAlbumDtoAsync(albumId);
}

await getMusicGroupData();

(async () => {
    window.onload = showGroups();

    //Helpers
    async function showGroups() {
        //Clear first

        // await getMusicGroupData();

        const groupInfo = document.querySelector("#group-info");
        groupInfo.classList.add("col-md-12", "themed-grid-col");
        // showGroups
        //creat a row for every quote and append it to _list
        // for (const item of groupData) {
        // const div = createRow();
        const div = document.createElement("div");
        // div.classList.add("col-md-12", "themed-grid-col");

        const h1 = document.createElement("h1");
        h1.classList.add("display-5", "fw-bold", "lh-1", "mb-3");
        h1.innerText = groupData.name;
        div.appendChild(h1);

        const p = document.createElement("p");
        p.classList.add("lead", "fw-bold", "mb-3");
        p.innerText = groupData.establishedYear;
        div.appendChild(p);

        // p.classList.add("lead", "fw-bold", "mb-3");
        // div.innerText = item.name + " " + item.establishedYear + " " + item.musicGroupId ;

        // div.appendChild(link);

        groupInfo.appendChild(div);
        await groupArtists();
        await groupAlbums();

        // }

        async function groupArtists() {
            const artistDiv = document.createElement("div");
            for (const artist of groupData.artistsId) {
                await getMusicGroupArtists(artist);
                const artistsP = document.createElement("p");
                artistsP.classList.add("lead", "fw-bold", "mb-3");
                artistsP.innerText =
                    artistData.firstName + " " + artistData.lastName;
                artistDiv.appendChild(artistsP);
            }
            groupInfo.appendChild(artistDiv);
        }

        async function groupAlbums() {
            const albumDiv = document.createElement("div");
            for (const album of groupData.artistsId) {
                await getMusicGroupAlbums(album);
                const albumP = document.createElement("p");
                albumP.classList.add("lead", "fw-bold", "mb-3");
                albumP.innerText = albumData.name;
                albumDiv.appendChild(albumP);
            }
            groupInfo.appendChild(albumDiv);
        }
    }
})();
