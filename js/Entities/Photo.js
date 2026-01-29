class Photo {
    constructor(id, name, etat, description='', coordinates) {
        this.id = id;
        this.name = name;     
        this.etat = parseInt(etat); // -1=undefined, 0=normal, 1=attention, 2=danger 
        this.description = description;                    
        this.coordinates = coordinates; // [lng, lat]
    }
    // Cette méthode remplace ton ancienne fonction style_Photos_1_0
    getStyle() {
        let fillColorPoint = 'rgba(145,82,45,1.0)'; // Brun par défaut (etat 0)
        
        if (this.etat === 1) {
            fillColorPoint = 'rgba(218, 165, 32,1.0)'; // Jaune
        } else if (this.etat === 2) {
            fillColorPoint = 'rgba(178, 34, 34,1.0)';  // Rouge
        }

        return {
            radius: 8.0,
            fillColor: fillColorPoint,
            color: 'white', // Bordure blanche
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }
    // Exemple de méthode très utile pour ta carte
    getLatLng() {
        // Inversion pour Leaflet qui attend [lat, lng] alors que ton objet stocke [lng, lat]
        return [this.coordinates[1], this.coordinates[0]];
    }
    getLat() {
        return this.coordinates[1];
    }
    getLng() {
        return this.coordinates[0];
    }

    // Pour obtenir la couleur selon l'état
    getStatusColor() {
        const colors = { '-1': 'gray', '0': 'green', '1': 'orange', '2': 'red' };
        return colors[this.etat] || 'black';
    }
}