const basepath = "./orthos/";
const api_url = 'http://localhost/orthophotos/api_viewer/';   

const chosenPictureElmt = document.getElementById("chosen_picture");
const spanPhotoName = document.getElementById("photo_name");
const spanLng = document.getElementById("lng");
const spanLat = document.getElementById("lat");
const pDescription = document.getElementById("p_description");

const btnEdit = document.getElementById("btn_edit");

const btnMicro = document.getElementById("btn_micro");
const btn2D = document.getElementById("btn_2d");
const btn3D = document.getElementById("btn_3d");

const btnFilter = document.getElementById("btn_filter");
const displayFilter = document.getElementById("display_filter");
const selectEtat = document.getElementById("select_etat");

const btnFullscreen = document.getElementById("btn_fullscreen");
const mapDiv = document.getElementById("map_div");
const sidebarDiv =  document.getElementById("sidebar_div");

// **************************
// ****  MAIN EXECUTION  *****
// **************************
document.addEventListener('DOMContentLoaded', function () {
    
    initApp();
    
    btnEdit.addEventListener("click", () => {
        toggleActiveBtn(btnEdit);
        mode = mode === appMode.EDIT ? appMode.NORMAL : appMode.EDIT;
        // Changer l'apparence de la carte
        
        if (mode === appMode.EDIT) {
            mapContainer.style.cursor = "crosshair"; // Curseur de précision
        
        } else {
            mapContainer.style.cursor = ""; // Retour au curseur normal
        }
    });

    btnFilter.addEventListener("click", () => {
        displayFilter.classList.toggle("active");
        btnFilter.classList.toggle("active");
    });
    selectEtat.addEventListener("change", function(){         
        refreshPhotos(Number(this.value));
    });

        btnEtatNormal.addEventListener("click", function(){
            refreshPhotos(0);
        });
        btnEtatAttention.addEventListener("click", function(){
            refreshPhotos(1);
        });
        btnEtatDanger.addEventListener("click", function(){
            refreshPhotos(2);
        });

    ['click','mousedown','wheel','touchstart'].forEach(evt => {
        btnFullscreen.addEventListener(evt, e => e.stopPropagation());
        btnFilter.addEventListener(evt, e => e.stopPropagation());
    });

    btnFullscreen.addEventListener("click", () => {
        toggleFullscreen();
    });

    btnMicro.addEventListener("click", () => {
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.continuous = true;
        recognition.interimResults = false;
        startVoiceRecognition(recognition); 

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            console.log('Voice input received: ' + transcript);
            // Here you can add code to handle the voice command   
            handleVoiceCommand(transcript);         
        }   
    });

     map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        // On ajoute le dessin sur la carte pour qu'il reste visible
        zoneLayerGroup.addLayer(layer);
        const geojson = layer.toGeoJSON(); // Convertit le dessin en format GeoJSON      

        // 1. On récupère le contour (le premier tableau)
        const coords = geojson.geometry.coordinates[0];
 
        const nomZone = prompt("Nom de la zone ?");
         if (nomZone) {
            const zone = new Zone(null,nomZone,0,'',0,coords ); // objet Zone.php
            console.log(zone);
            
            addZone(zone); // objet Zone.php
        }
       
        
    });
   

    






});



 // window.addEventListener('message', function(e){

    //     if (e.data.type === "PHOTO_CLICK"){

    //         chosenPhoto = getPhotoById(e.data.id); // class Photo
    //         const [lng,lat] = chosenPhoto.coordinates
            
    //         chosenPictureElmt.src = `${basepath}${chosenPhoto.name}`;
    //         spanPhotoName.innerHTML= chosenPhoto.name;
    //         spanLng.innerHTML = lng;
    //         spanLat.innerHTML = lat;
    //         pDescription.innerHTML = chosenPhoto.description;           

    //         chosenPictureElmt.className = ""; // reset class
    
    //         if(chosenPhoto.etat === 1){
    //             chosenPictureElmt.className = "warning";
    //         }else if(chosenPhoto.etat === 2){
    //             chosenPictureElmt.className = "danger";
    //         }
    //     }
    // }); 
