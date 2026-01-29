let chosenPhoto = null; // instance of Photo class

const btnEtatNormal = document.getElementById("btn_etat_normal");
const spanNormal = document.getElementById("span_normal");
const spanNormalCount = document.getElementById("span_normal_count");
let normalCount = 0;

const btnEtatAttention = document.getElementById("btn_etat_attention");
const spanAttention = document.getElementById("span_attention");
const spanAttentionCount = document.getElementById("span_attention_count");
let attentionCount = 0;

const btnEtatDanger = document.getElementById("btn_etat_danger");
const spanDanger = document.getElementById("span_danger");
const spanDangerCount = document.getElementById("span_danger_count");
let dangerCount = 0;
// *****************
// *** FUNCTIONS  ***
// *****************


function updateStats() {
    normalCount = getPhotosCountByEtat(0);
    spanNormal.style.width = `${ getPourcentagePhotos(normalCount)}%`;
    spanNormalCount.innerHTML = getPourcentagePhotos(normalCount) ; 
    attentionCount = getPhotosCountByEtat(1);
    spanAttention.style.width = `${getPourcentagePhotos(attentionCount)}%`;
    spanAttentionCount.innerHTML = getPourcentagePhotos(attentionCount) ;
    dangerCount = getPhotosCountByEtat(2);
    spanDanger.style.width = `${getPourcentagePhotos(dangerCount)}%`;
    spanDangerCount.innerHTML = getPourcentagePhotos(dangerCount) ;
}

function sauvegarderModifications(photoId) {  // sur une photo
    const photo = getPhotoById(photoId);    

    const newEtat = parseInt(document.getElementById('edit_etat').value);
    const newDescription = document.getElementById('edit_description').value; 

    photo.etat = newEtat;
    photo.description = newDescription;
    alert(`Modifications sauvegardées pour la photo ${photo.name}.`);

    // Fermer la popup
    map.closePopup();

    patchPhoto(photo);
}


function refreshPhotos(currentEtatFilter) {
    photoLayerGroup.clearLayers();
    const filteredArray = getFilteredArrayByEtat(currentEtatFilter);  
    
    filteredArray.forEach(photo => {
        const point = L.circleMarker(photo.getLatLng(), photo.getStyle());
        point.addTo(photoLayerGroup);

        point.addEventListener('click', function() {
            displayAsideChosenPhoto(photo);
            
            if (mode === appMode.EDIT) {
                // Créer le contenu du formulaire
                const formContent = `
                <div class="popup-edit" style="min-width: 200px;">
                    <strong style="color: #333;">Édition : ${photo.name}</strong><br><br>
                    <label>État de la photo :</label><br>
                    <select id="edit_etat" style="width: 100%; margin-bottom: 10px; padding: 5px;">
                        <option value="0" ${photo.etat === 0 ? 'selected' : ''}>🟢 Normal</option>
                        <option value="1" ${photo.etat === 1 ? 'selected' : ''}>🟡 A controller</option>
                        <option value="2" ${photo.etat === 2 ? 'selected' : ''}>🔴 A risque</option>
                    </select><br>

                    <label>Description :</label><br>
                    <textarea id="edit_description" style="width: 100%; height: 60px; margin-bottom: 10px;">${photo.description}</textarea><br>
                    
                    <button onclick="sauvegarderModifications(${photo.id})" 
                            style="width: 100%; background: #28a745; color: white; border: none; padding: 8px; cursor: pointer; border-radius: 4px;">
                        Enregistrer
                    </button>
                </div>
                `;
                // Ouvrir la popup uniquement en mode EDIT
                point.bindPopup(formContent).openPopup();
            } else {
                // En mode NORMAL, on s'assure que la popup est désactivée
                point.unbindPopup();
            }
        });

    });    
    
}

function getFilteredArrayByEtat(etatCible) {
    if (etatCible === -1) {
        return photos;  // Retourne toutes les photos   
    } else {
        return photos.filter(p => p.etat === Number(etatCible));
    }   
}

function getPhotosCountByEtat(etat){ // retourne le nombre de photos avec etat = 0
    return photos.filter(p => p.etat === Number(etat)).length;
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


// retourne la photo par id
function getPhotoById(photoId){ 
    return photos.find(p => p.id == photoId);
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
    refreshPhotos(filter_etat);
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

function displayAsideChosenPhoto(photo) {
    chosenPictureElmt.src = `${basepath}${photo.name}`;
        spanPhotoName.innerHTML= photo.name;
        spanLng.innerHTML = photo.getLng();
        spanLat.innerHTML = photo.getLat();
        pDescription.innerHTML = photo.description;           
        chosenPictureElmt.className = ""; // reset class
        if(photo.etat === 1){
            chosenPictureElmt.className = "warning";
        }else if(photo.etat === 2){
            chosenPictureElmt.className = "danger";
        }   
}

// initApp();



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

// // Convert GeoJSON features to Site objects (list of Site instances)
// function photosFromGeoJSON(geojson) {
//     return geojson.features.map(f => {
//         const p = f.properties;        
//         return new Photo(p.fid, 
//                         p.photo_web, 
//                         p.etat, 
//                         p.description, 
//                         f.geometry.coordinates);
//     });
// }
