const basepath = "./orthos/"
const chosenPictureElmt = document.getElementById("chosen_picture");
const spanLng = document.getElementById("lng");
const spanLat = document.getElementById("lat");
const spanPhotoName = document.getElementById("photo_name");


// **************************
// ****  MAIN EXECUTION  *****
// **************************
document.addEventListener('DOMContentLoaded', function () {
    
    window.addEventListener('message', function(e){

        if (e.data.type === "PHOTO_CLICK"){

            chosenPhoto = getPhotoById(e.data.id); // class Photo
            const [lng,lat] = chosenPhoto.coordinates
            
            chosenPictureElmt.src = `${basepath}${chosenPhoto.name}`;
            spanPhotoName.innerHTML= chosenPhoto.name;
            spanLng.innerHTML = lng;
            spanLat.innerHTML = lat;


            
        }

    }); 






});
