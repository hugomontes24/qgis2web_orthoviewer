async function loadZones() {
    try {
        const response = await fetch(`${api_url}zones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // On transforme le tableau d'objets JSON en tableau d'objets Photo
        zones = data.map(z =>{
                // 1. SÉCURITÉ : Vérifier si coordinates existe et n'est pas vide
                if (!z.coordinates || z.coordinates.length === 0) {
                    console.warn(`Zone ID ${z.id} ignorée : Géométrie vide.`);
                    return null;
                }
                const pointsGeoJSON = z.coordinates[0];
                
                const pointsL = L.GeoJSON.coordsToLatLngs(pointsGeoJSON,0)
                return new Zone(
                        z.id, 
                        z.name, 
                        z.classification, 
                        z.description, 
                        z.aire,
                        pointsL
                ) 
            });

        displayZones();
            
        return zones;
        
    } catch (error) {
        console.error("Erreur de chargement :", error);
    }
}

// parameters: zone Zone object
async function patchZone( zone ) {  
    try {
        const response = await fetch(`${api_url}zones/${zone.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: zone.id,
                classification: parseInt(zone.classification),
                description: zone.description
            })
        }); 
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const updatedZone = await response.json();
        console.log("Zone mise à jour :", updatedZone);
        // Puisque tout est OK, on rafraîchit la carte
        refreshPhotos(-1); // Afficher tous les points
        displayAsideChosenPhoto(photo);
        
        // Optionnel : tu peux aussi recalculer tes stats ici
        updateStats();

    } catch (error) {
        console.error("Erreur de mise à jour de la photo :", error);
    }   


}

async function addZone(zone) {
    try {      
        const response = await fetch(`${api_url}zones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                name: zone.name,
                classification: zone.classification,
                description: zone.description,
                aire: zone.aire,
                coordinates: zone.coordinates
            })
        }); 

        if (response.ok) {
            alert("Zone sauvegardée dans SQL !");
        }else{
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const updatedPhoto = await response.json();
        console.log("Photo mise à jour :", updatedPhoto);
        loadZones();

    } catch (error) {
        console.error("Erreur de mise à jour de la zone :", error);
    }          
}

