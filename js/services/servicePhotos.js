// 3. Charger tes données depuis ton API PHP
async function loadPhotos() {
    try {
        const response = await fetch(`${api_url}photos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // On transforme le tableau d'objets JSON en tableau d'objets Photo
        photos = data.map(p => new Photo(
            p.id, 
            p.name, 
            p.etat, 
            p.description, 
            [parseFloat(p.coordinates[0]), parseFloat(p.coordinates[1])]// [lng, lat] 
            ) );

        // initApp(); // Initialiser l'application après le chargement des photos

        return photos;

    } catch (error) {
        console.error("Erreur de chargement :", error);
    }
}

async function patchPhoto(photo ) {
    try {
        const response = await fetch(`${api_url}photos/${photo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: photo.id,
                etat: parseInt(photo.etat),
                description: photo.description
            })
        }); 
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const updatedPhoto = await response.json();
        console.log("Photo mise à jour :", updatedPhoto);
        // Puisque tout est OK, on rafraîchit la carte
        refreshPhotos(-1); // Afficher tous les points
        displayAsideChosenPhoto(photo);
        
        // Optionnel : tu peux aussi recalculer tes stats ici
        updateStats();


    } catch (error) {
        console.error("Erreur de mise à jour de la photo :", error);
    }   


}

async function initApp() {
    photos = await loadPhotos();
    updateStats();
    zones = await loadZones();

    console.log(zones);
    
    // On rafraîchit la carte pour afficher les points
    refreshPhotos(-1); // -1 = afficher tous les points

    // displayZones();



}





   
        // photos.forEach(photo => {
        //     // Création du marqueur pour chaque photo
        //     const marker = L.circleMarker(photo.getLatLng(), photo.getStyle()).addTo(map); // [lat, lng]
           
        // });


// async function fetchPhotos() {
    
//     try {
//         // 1. Appel à l'API
//         const response = await fetch(`${url}photos`);

//         // 2. Vérification du statut HTTP (200, 404, 500, etc.)
//         if (!response.ok) {
//             throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         // 3. Conversion du JSON en objet JavaScript
//         const photos = await response.json();

//         // 4. Utilisation des données
//         console.log("Photos reçues :", photos);
        
//         // C'est ici que tu pourras appeler une fonction pour afficher les images
//         // exemple : afficherGalerie(photos);

//     } catch (error) {
//         console.error("Impossible de récupérer les photos :", error);
//     }








// }

// Lancer l'appel
// fetchPhotos();

 // // Popup personnalisée avec l'image !
            // const popupContent = `
            //     <div style="width:200px">
            //         <b>${photo.name}</b><br>
            //         <p>Etat : ${photo.etat}</p>
            //         <img src="./orthos/${photo.name}" style="width:100%">
            //         <br>
            //         <small>${photo.description}</small>
            //     </div>
            // `;
            // marker.bindPopup(popupContent);