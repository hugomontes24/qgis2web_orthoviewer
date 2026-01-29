class ZoneDTO {
    constructor(id, name, classification, description='', aire, coordinates) {
        this.id = id;
        this.name = name;     
        this.classification = parseInt(classification); // -1=undefined, 0=normal, 1=attention, 2=danger 
        this.description = description;   
        this.aire = aire; // en m²                
        this.coordinates = coordinates; // [ [[lng, lat], [lng, lat]]  ]  3niveaux
    }

    
    getLeafletLatLngs() {
        return this.coordinates.map(coord => [coord[1], coord[0]]); // [lat, lng]
    }

    
   
}