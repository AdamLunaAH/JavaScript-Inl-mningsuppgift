"use strict";

import musicService from "../database-script/music-group-services.js";

(async () => {
    //Initialize the service
    const _service = new musicService(
        `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
    );

    //Read Database info async
    let data = await _service.readInfoAsync();

    const groupCount = document.querySelector("#count-groups");
    groupCount.innerText = `${data.db.nrSeededMusicGroups} music groups`;

    const albumCount = document.querySelector("#count-albums");
    albumCount.innerText = `${data.db.nrSeededAlbums} albums`;

    const artistCount = document.querySelector("#count-artists");
    artistCount.innerText = `${data.db.nrSeededArtists} artists`;

    //Some querySelectors (not all though) to help out
    // const artistList = document.querySelector("#artists");
    // artistList.innerText = data.db.nrSeededArtists;
    // const albumList = document.querySelector("#albums");
    // const albumDetail = document.querySelector("#albumDetail");

    // const artistList = document.querySelector("#artists");

    // let artistsList = await _service.readArtistsAsync(0);

    const artistList = document.querySelector("#artists");
    let _data = await _service.readArtistsAsync(0);
    // let _data = await _service.readMusicGroupsAsync(0, true);

    console.log(_data);
    for (const item of _data.pageItems) {
        const li = document.createElement("li");
        li.innerText = `${item.firstName}`;
        artistList.appendChild(li);
    };

    console.log(artistList);

    console.log("sup");
})();

/* Exercise

1. Fill in the WebApi info with correct values from the WebApi, Music groups, Albums, Artists, read from  _service.readInfoAsync()
2. Make a list of page0 of the albums containing the word "love" - fill in as <li> in tag <ul id="albums"></ul>
3. Make a list of page0 of artists, with pagesize 10 - fill in as <li> in tag <ul id="artists"></ul>
4. Read all the details of the 1st album above (ex 3)
   <Album name> was made by the group <Musicgroup Name>
   fill it in the tag <p id="albumDetail"></p>
*/
