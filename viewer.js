const basepath = "./orthos/"
const chosenPictureElmt = document.getElementById("chosen_picture");
const spanLng = document.getElementById("lng");
const spanLat = document.getElementById("lat");
const spanPhotoName = document.getElementById("photo_name");

const btn2D = document.getElementById("btn-2d");
const btn3D = document.getElementById("btn-3d");

const btnFullscreen = document.getElementById("btn_fullscreen");
const mapDiv = document.getElementById("map_div");
const sidebarDiv =  document.getElementById("sidebar_div");



// **************************
// ****  MAIN EXECUTION  *****
// **************************
document.addEventListener('DOMContentLoaded', function () {
    
    window.addEventListener('message', function(e){

        if (e.data.type === "PHOTO_CLICK"){

            chosenPhoto = getPhotoById(e.data.id); // class Photo
            const [lng,lat] = chosenPhoto.coordinates

            console.log(lng,lat);
            
            
            chosenPictureElmt.src = `${basepath}${chosenPhoto.name}`;
            spanPhotoName.innerHTML= chosenPhoto.name;
            spanLng.innerHTML = lng;
            spanLat.innerHTML = lat;


            
        }

    }); 

    ['click','mousedown','wheel','touchstart'].forEach(evt => {
        btnFullscreen.addEventListener(evt, e => e.stopPropagation());
    });

    btnFullscreen.addEventListener("click", () => {
        toggleActiveBtn(btnFullscreen);
        mapDiv.classList.toggle("fullscreen_mode");
        sidebarDiv.classList.toggle("fullscreen_mode");
    });


    






});
