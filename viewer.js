const basepath = "./orthos/"
const mapIframe = document.getElementById("map_iframe");

let chosenPhoto = null; // instance of Photo class
const chosenPictureElmt = document.getElementById("chosen_picture");
const spanPhotoName = document.getElementById("photo_name");
const spanLng = document.getElementById("lng");
const spanLat = document.getElementById("lat");
const pDescription = document.getElementById("p_description");

const btnMicro = document.getElementById("btn_micro");
const btn2D = document.getElementById("btn-2d");
const btn3D = document.getElementById("btn-3d");

const btnFilter = document.getElementById("btn_filter");
    const displayFilter = document.getElementById("display_filter");
    const selectEtat = document.getElementById("select_etat");

const btnFullscreen = document.getElementById("btn_fullscreen");
const mapDiv = document.getElementById("map_div");
const sidebarDiv =  document.getElementById("sidebar_div");

const spanNormal = document.getElementById("span_normal");
const spanAttention = document.getElementById("span_attention");
const spanDanger = document.getElementById("span_danger");

let normalCount = 0;
const spanNormalCount = document.getElementById("span_normal_count");
const spanAttentionCount = document.getElementById("span_attention_count");
const spanDangerCount = document.getElementById("span_danger_count");
let attentionCount = 0;
let dangerCount = 0;

// **************************
// ****  MAIN EXECUTION  *****
// **************************
document.addEventListener('DOMContentLoaded', function () {

    normalCount = getPhotosCountByEtat(0); // photos with etat = 0
    spanNormal.style.width = `${ getPourcentagePhotos(normalCount)}%`;
    spanNormalCount.innerHTML = getPourcentagePhotos(normalCount) ;

    attentionCount = getPhotosCountByEtat(1); // photos with etat = 1
    spanAttention.style.width = `${getPourcentagePhotos(attentionCount)}%`;
    spanAttentionCount.innerHTML = getPourcentagePhotos(attentionCount) ;

    dangerCount = getPhotosCountByEtat(2); // photos with etat = 2
    spanDanger.style.width = `${getPourcentagePhotos(dangerCount)}%`;
    spanDangerCount.innerHTML = getPourcentagePhotos(dangerCount) ;

    btnFilter.addEventListener("click", () => {
        displayFilter.classList.toggle("active");
        btnFilter.classList.toggle("active");
    });

    selectEtat.addEventListener("change", function(){ 
        filter_etat_function(this.value);
        // mapIframe.contentWindow.postMessage({ 
        //             type: "FILTER_PHOTOS", filter_etat: this.value }, // this.value = selected etat
        //         "*");
    });

    window.addEventListener('message', function(e){

        if (e.data.type === "PHOTO_CLICK"){

            chosenPhoto = getPhotoById(e.data.id); // class Photo
            const [lng,lat] = chosenPhoto.coordinates
            
            chosenPictureElmt.src = `${basepath}${chosenPhoto.name}`;
            spanPhotoName.innerHTML= chosenPhoto.name;
            spanLng.innerHTML = lng;
            spanLat.innerHTML = lat;
            pDescription.innerHTML = chosenPhoto.description;           

            chosenPictureElmt.className = ""; // reset class
    
            if(chosenPhoto.etat === 1){
                chosenPictureElmt.className = "warning";
            }else if(chosenPhoto.etat === 2){
                chosenPictureElmt.className = "danger";
            }
        }
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

   

    






});
