


function displayZones() {
    // 1. On nettoie les zones actuelles
    zoneLayerGroup.clearLayers();

    zones.forEach(zone => {
        // 3. Création du polygone avec un style
        const polygone = L.polygon(zone.coordinates, {
            color: zone.getStatusColor(),       // Contour bleu
            fillColor: zone.getStatusColor(),   // Remplissage bleu
            fillOpacity: 0.3,       // Transparence
            weight: 2               // Épaisseur du trait
        });
        // 4. Ajout d'une popup avec les infos (nom, aire, etc.)
      polygone.bindPopup(`
            <div id="popup-view-${zone.id}">
                <h4 style="margin:0">Zone : ${zone.name || 'Zone sans nom'}</h4>
                <b>Classification : ${zone.classification || 'Indéfini'}<br>
                <b>Description :</b> ${zone.description || 'Aucune'}<br>
                <b>Surface :</b> ${zone.aire.toFixed(2)} m²<br><br>
                <button onclick="toggleEditMode(${zone.id}, true)" style="min-width: 200px;">Modifier propriétés</button>
            </div>

            <div id="popup-edit-${zone.id}" style="display:none; min-width: 200px;">
                <strong style="color: #333;">Édition : ${zone.name}</strong><br><br>
                <label>Classification :</label><br>
                <select id="edit_class_${zone.id}" style="width: 100%; margin-bottom: 10px;">
                    <option value="0" ${zone.classification == 0 ? 'selected' : ''}>🟢 Bois</option>
                    <option value="1" ${zone.classification == 1 ? 'selected' : ''}>🟡 Metal</option>
                    <option value="2" ${zone.classification == 2 ? 'selected' : ''}>🔴 Tout venant</option>
                </select><br>

                <label>Description :</label><br>
                <textarea id="edit_desc_${zone.id}" style="width: 100%; height: 60px;">${zone.description || ''}</textarea><br>
                
                <button onclick="saveModifyZone(${zone.id})" style="width: 100%; background: #28a745; color: white; margin-top:5px;">Enregistrer</button>
                <button onclick="toggleEditMode(${zone.id}, false)" style="width: 100%; background: #ccc; margin-top:5px;">Annuler</button>
            </div>
        `);

        

        // 5. On l'ajoute au groupe
        polygone.addTo(zoneLayerGroup);
    });
}

function toggleEditMode(zoneId, isEdit) {
    const viewDiv = document.getElementById(`popup-view-${zoneId}`);
    const editDiv = document.getElementById(`popup-edit-${zoneId}`);

    if (isEdit) {
        viewDiv.style.display = 'none';
        editDiv.style.display = 'block';
    } else {
        viewDiv.style.display = 'block';
        editDiv.style.display = 'none';
    }
}

function getZoneById(zoneId){ 
    return zones.find(z => z.id == zoneId);
}

function saveModifyZone(zoneId) {  // sur une photo
    const zone = getZoneById(zoneId);    

    zone.classification = parseInt(document.getElementById(`edit_class_${zone.id}`).value);
    zone.description = document.getElementById(`edit_desc_${zone.id}`).value; 

    alert(`Modifications sauvegardées pour la photo ${zone.name}.`);

    // Fermer la popup
    map.closePopup();

    patchZone(zone);
}


// function getFilteredArrayByEtat(etatCible) {
//     if (etatCible === -1) {
//         return photos;  // Retourne toutes les photos   
//     } else {
//         return photos.filter(p => p.etat === Number(etatCible));
//     }   
// }

// function getPhotosCountByEtat(etat){ // retourne le nombre de photos avec etat = 0
//     return photos.filter(p => p.etat === Number(etat)).length;
// }

// function getPourcentagePhotos(partialPhotos){ // retourne le pourcentage de photos par etat
//     const total = photos.length;
//     if (total === 0) return 0;
//     return Math.round(partialPhotos / total * 100);
// }



// function toggleActiveBtn(activeBtn) {  // highlight the active button
//     activeBtn.classList.toggle("active");
// }

// function createSiteLink(site) {   
//     const a = document.createElement('a');
//     a.textContent = site.name;
//     a.href = site.url || '#';
//     return a;
// }


// // retourne la photo par id

// function toggleFullscreen() {
//     toggleActiveBtn(btnFullscreen);
//     mapDiv.classList.toggle("fullscreen_mode");
//     sidebarDiv.classList.toggle("fullscreen_mode");  
// }

// function normalScreen() {
//     btnFullscreen.classList.remove("active");
//     mapDiv.classList.remove("fullscreen_mode");
//     sidebarDiv.classList.remove("fullscreen_mode");  
// }

// function filter_etat_function(filter_etat) {
//     refreshPhotos(filter_etat);
// }

// // Start voice recognition. SpeechRecognition instance passed as argument
// function startVoiceRecognition(recognition) {
//     recognition.start();
//     console.log('Voice recognition started. Speak now.');
// }

// // Handle voice command
// function handleVoiceCommand(text) {
//     console.log('Handling voice command: ' + text);
//     // Add your command handling logic here
//     if (text.includes('plein écran')) {
//         toggleFullscreen();
//     } else if (text.includes('écran normal')) {
//         normalScreen();
//     } else if (text.includes('filtrer point rouge')) {
//         filter_etat_function(2);
//     } else if (text.includes('filtrer point jaune')) {
//         filter_etat_function(1);
//     } else if (text.includes('filtrer point marron')) {
//         filter_etat_function(0);
//     } else if (text.includes('afficher tous les points')) {
//         filter_etat_function(-1);
//     }
// }

// function displayAsideChosenPhoto(photo) {
//     chosenPictureElmt.src = `${basepath}${photo.name}`;
//         spanPhotoName.innerHTML= photo.name;
//         spanLng.innerHTML = photo.getLng();
//         spanLat.innerHTML = photo.getLat();
//         pDescription.innerHTML = photo.description;           
//         chosenPictureElmt.className = ""; // reset class
//         if(photo.etat === 1){
//             chosenPictureElmt.className = "warning";
//         }else if(photo.etat === 2){
//             chosenPictureElmt.className = "danger";
//         }   
// }

// // initApp();



// // function setActiveBtn(activeBtn) {  // highlight the active button
// //     document.querySelectorAll(".map-btn").forEach(btn =>
// //         btn.classList.remove("active")
// //     );
// //     activeBtn.classList.add("active");
// // }


// // function createSiteListUlLi(site) {
// //     const li = document.createElement('li');
// //     li.dataset.id = site.id;
// //     li.style.cursor = 'pointer';
// //     return li;
// // }

// // // Convert GeoJSON features to Site objects (list of Site instances)
// // function photosFromGeoJSON(geojson) {
// //     return geojson.features.map(f => {
// //         const p = f.properties;        
// //         return new Photo(p.fid, 
// //                         p.photo_web, 
// //                         p.etat, 
// //                         p.description, 
// //                         f.geometry.coordinates);
// //     });
// // }
