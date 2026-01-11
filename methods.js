// *****************
// *** FUNCTIONS  ***
// *****************

function setActiveBtn(activeBtn) {  // highlight the active button
    document.querySelectorAll(".map-btn").forEach(btn =>
        btn.classList.remove("active")
    );
    activeBtn.classList.add("active");
}

function toggleActiveBtn(activeBtn) {  // highlight the active button
    activeBtn.classList.toggle("active");
}

function createSiteListUlLi(site) {
    const li = document.createElement('li');
    li.dataset.id = site.id;
    li.style.cursor = 'pointer';
    return li;
}

function createSiteLink(site) {   
    const a = document.createElement('a');
    a.textContent = site.name;
    a.href = site.url || '#';
    return a;
}

function displayPhotoDetails(photo) {
    // Function to display site details in the sidebar or a popup
    // Implementation depends on the desired UI/UX
}

// retourne la photo par id
function getPhotoById(photoId){ 
    return photos.find(p => p.id == photoId);
}

// Convert GeoJSON features to Site objects (list of Site instances)
function photosFromGeoJSON(geojson) {
    return geojson.features.map(f => {
        const p = f.properties;        
        return new Photo(p.fid, p.photo_web, f.geometry.coordinates);
    });
}

