 sitesX.forEach(site => { // 7 - Populate the sidebar list
        const m = L.marker([site.coordinates[1], site.coordinates[0]]).addTo(map).bindTooltip(site.name); // lat, lng

        m.on('click', () => {

            map.flyTo([site.coordinates[1], site.coordinates[0]], MAX_ZOOM, {
                animate: true,
                duration: 1.0 // seconds
            });
            
            window.parent.postMessage({  // id of the site clicked sent to parent
                type: "TIMELAPSE_BUTTON_ENABLED",
                siteId: site.id
            }, "*");
                   
        });
    });