"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Ali Al-ghribawi
      Date: March5,2023  

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; 
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;

      slideBox.appendChild(image);
   }
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }

   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      let favImgs = document.getElementById("favImgs");
         favImgs.id = "favImgs";
         
      let addToFavButton = document.createElement("div");
         addToFavButton.id = "addToFavS";
         addToFavButton.innerHTML = "ADD TO FAVOURITE";
         addToFavButton.onclick =  function () {

            let figureBox = document.createElement("figure");      
            let image2 = modalImage.cloneNode("true");

            image2.setAttribute("class","imageClass");
            let allImgs = document.getElementsByClassName("imageClass")
            let allImgsArry = Array.from(allImgs);
             let overrides = allImgsArry.some(overridesExist)
             function overridesExist (image2){
               return image2.src === modalImage.src;
             }
             if (overrides){
               window.alert("This image is already exists in your favourite images box!")

             } else if (allImgs.length >= 5){
               window.alert("Sorry you can't add more than five images to your favourite images box! please press ok to continue");
               favImgs.removeChild(figureBox)
            } else {
               figureBox.appendChild(image2);
               favImgs.appendChild(figureBox);
            } 

         let removeBox = document.createElement("div");
         removeBox.id = "image2Close";
         
         removeBox.innerHTML = "REMOVE";
         removeBox.onclick = function() {
            favImgs.removeChild(figureBox);
            
         }  
          
               figureBox.onclick = () =>{    
                figureBox.appendChild(removeBox);
               }

               figureBox.addEventListener('mousedown', () => {
                  removeBox.style.display = 'block';
                });
                
                figureBox.addEventListener('mouseleave', () => {
                  removeBox.style.display = 'none';
                });
                
      }
      
      modalWindow.appendChild(addToFavButton);  

      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
    
   }
}
