// Custom JavaScript code for enhancing the map functionality
// This script populates a sidebar with a list of sites from the GeoJSON data
// CONSTANST AND VARIABLES  ***********************
class Photo {
    constructor(id, name, etat, description='', coordinates) {
        this.id = id;
        this.name = name;     
        this.etat = etat; // -1=undefined, 0=normal, 1=attention, 2=danger 
        this.description = description;                    
        this.coordinates = coordinates; // [lng, lat]
    }
}

let photos = []; // Array to hold Photos objects


const modesArray = ['mode_home', 'mode_timelapse'];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



// **************************
// ****  MAIN EXECUTION  *****
// **************************

document.addEventListener('DOMContentLoaded', function () {

    if(!SpeechRecognition) { console.log('Speech Recognition API not supported in this browser.');}
    
    if(!window.json_Photos_1) { console.error('GeoJSON data not found! **');return;} // 3

    photos = photosFromGeoJSON(window.json_Photos_1); // 4 - Convert GeoJSON features to Site objects (list of Site instances )
    
    // const recognition = new SpeechRecognition();
    // recognition.lang = 'fr-FR';
    // recognition.continuous = false;
    // recognition.interimResults = false;
    // // recognition.maxAlternatives = 1;

    







});


    
