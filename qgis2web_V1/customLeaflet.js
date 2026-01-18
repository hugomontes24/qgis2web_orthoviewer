 

let currentEtatFilter = -1; // means no filter -  ajouté par moi


// **************************
// ****  METHODS  *****
// **************************  

function setEtatFilter(filter_etat) {
    currentEtatFilter = Number(filter_etat);
    layer_Photos_1.clearLayers();
    layer_Photos_1.addData(json_Photos_1);
} 

// **************************
// ****  MAIN EXECUTION  *****
// **************************

document.addEventListener('DOMContentLoaded', function () {
    
    window.addEventListener('message', function(e){
        
        if (e.data.type === "FILTER_PHOTOS"){   
            const filter_etat = e.data.filter_etat;
            console.log(filter_etat);

            setEtatFilter(filter_etat);
        }
    }); 

});

// sitesX.forEach(site => { // 7 - Populate the sidebar list
//     const m = L.marker([site.coordinates[1], site.coordinates[0]]).addTo(map).bindTooltip(site.name); // lat, lng

//     m.on('click', () => {

//         map.flyTo([site.coordinates[1], site.coordinates[0]], MAX_ZOOM, {
//             animate: true,
//             duration: 1.0 // seconds
//         });
        
//         window.parent.postMessage({  // id of the site clicked sent to parent
//             type: "TIMELAPSE_BUTTON_ENABLED",
//             siteId: site.id
//         }, "*");
                
//     });
// });
