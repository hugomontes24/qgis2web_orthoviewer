// Custom JavaScript code for enhancing the map functionality
// This script populates a sidebar with a list of sites from the GeoJSON data
// CONSTANST AND VARIABLES  ***********************
class Photo {
    constructor(id, name, etat, coordinates) {
        this.id = id;
        this.name = name;     
        this.etat = etat;                      
        this.coordinates = coordinates; // [lng, lat]
    }
}

let photos = []; // Array to hold Photos objects

// const sitesListUl = document.getElementById('sites_list');// 5

const modesArray = ['mode_home', 'mode_timelapse'];

// *****************
// *** FUNCTIONS  ***
// *****************


// **************************
// ****  MAIN EXECUTION  *****
// **************************

document.addEventListener('DOMContentLoaded', function () {
    
    if(!window.json_Photos_1) { console.error('GeoJSON data not found! **');return;} // 3

    photos = photosFromGeoJSON(window.json_Photos_1); // 4 - Convert GeoJSON features to Site objects (list of Site instances )
    
    // sites.forEach(site => { // 7 - Populate the sidebar list
    //     const li = createSiteListUlLi(site);

    //     site.description = `Company: ${site.company} <br> City: ${site.city}`;

    //     // li.addEventListener('click', () => {  *****  TODO *****
    //     //     displaySiteDetails(site);
    //     //     // Optionally, you can also center the map on the site's coordinates here
    //     // });
      
    //     const a = createSiteLink(site);
    //     li.appendChild(a);
    //     sitesListUl.appendChild(li);
    // });







});


    
