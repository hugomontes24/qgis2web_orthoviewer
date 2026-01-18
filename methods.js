// *****************
// *** FUNCTIONS  ***
// *****************

function getPhotosCountByEtat(etat){ // retourne le nombre de photos avec etat = 0
    return photos.filter(p => p.etat === etat).length;
}

function getPourcentagePhotos(partialPhotos){ // retourne le pourcentage de photos par etat
    const total = photos.length;
    if (total === 0) return 0;
    return Math.round(partialPhotos / total * 100);
}

function toggleActiveBtn(activeBtn) {  // highlight the active button
    activeBtn.classList.toggle("active");
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
        return new Photo(p.fid, 
                        p.photo_web, 
                        p.etat, 
                        p.description, 
                        f.geometry.coordinates);
    });
}

function toggleFullscreen() {
    toggleActiveBtn(btnFullscreen);
    mapDiv.classList.toggle("fullscreen_mode");
    sidebarDiv.classList.toggle("fullscreen_mode");  
}

function normalScreen() {
    btnFullscreen.classList.remove("active");
    mapDiv.classList.remove("fullscreen_mode");
    sidebarDiv.classList.remove("fullscreen_mode");  
}

function filter_etat_function(filter_etat) {
    mapIframe.contentWindow.postMessage({ 
                type: "FILTER_PHOTOS", 
                filter_etat: filter_etat }, // filter_etat = selected etat
            "*");
}

// Start voice recognition. SpeechRecognition instance passed as argument
function startVoiceRecognition(recognition) {
    recognition.start();
    console.log('Voice recognition started. Speak now.');
}

// Handle voice command
function handleVoiceCommand(text) {
    console.log('Handling voice command: ' + text);
    // Add your command handling logic here
    if (text.includes('plein écran')) {
        toggleFullscreen();
    } else if (text.includes('écran normal')) {
        normalScreen();
    } else if (text.includes('filtrer point rouge')) {
        filter_etat_function(2);
    } else if (text.includes('filtrer point jaune')) {
        filter_etat_function(1);
    } else if (text.includes('filtrer point marron')) {
        filter_etat_function(0);
    } else if (text.includes('afficher tous les points')) {
        filter_etat_function(-1);
    }
}



// function setActiveBtn(activeBtn) {  // highlight the active button
//     document.querySelectorAll(".map-btn").forEach(btn =>
//         btn.classList.remove("active")
//     );
//     activeBtn.classList.add("active");
// }


// function createSiteListUlLi(site) {
//     const li = document.createElement('li');
//     li.dataset.id = site.id;
//     li.style.cursor = 'pointer';
//     return li;
// }
