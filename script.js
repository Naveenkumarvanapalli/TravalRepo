// Unsplash API
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photoArray = [];
const count = 30;
const apiKey = "k0Fcg5Pv6ISxnVrD6V8EL4nyuVbsH9Tf422K9s8cIj0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=travel`;


function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper Function for setig Attributees on COM Elements
function _setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}
// Create Img Elements
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length
    photoArray.forEach(element => {
        // Creatinh <a> Tag
        const item = document.createElement('a');
        _setAttributes(item,{
            href:element.links.html,
            target:'_blank'
        })
        // Create <img> tag
        const img = document.createElement('img');
        _setAttributes(img,{
            src:element.urls.regular,
            alt:element.alt_description,
            title:element.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoaded)
        // Put <img> inside <a>, then put both inside image-container Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get Photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}
// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready =false;
        getPhotos();
    }
});
getPhotos();