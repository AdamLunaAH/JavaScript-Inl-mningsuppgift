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

    const artistList = document.querySelector("#artists");
    let _data = await _service.readArtistsAsync(0);

    console.log(_data);
    for (const item of _data.pageItems) {
        const li = document.createElement("li");
        li.innerText = `${item.firstName}`;
        artistList.appendChild(li);
    };

    console.log(artistList);

    console.log("sup");
})();

