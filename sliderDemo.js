images = ["images/buenosAires.png",
          "images/chichenItza.png",
          "images/machuPichu.png",
          "images/mexicoCity.png",
          "images/newYork.png",
          "images/philadelphia.png",
          "images/santiago.png",
          "images/saucillo.png",
          "images/valparaiso.png",
          "images/washingtonDC.png",
          "images/bolivarWashington.png"];

captions = ["Buenos Aires, Argentina",
            "Chichén Itzá, Mexico",
            "Machu Pichu, Perú",
            "Ciudad de México, México",
            "New York, New York",
            "Philadelphia, Pennsylvania",
            "Santiago, Chile",
            "Los Arcos Saucillo, México",
            "Valparaíso, Chile",
            "Washington, D.C.",
            "Washington, D.C."];

function makeImg(src) {
  //----------------------------------------------------//
  //Returns an <img> element                            //
  //string-> src: is the path to the image file         //
  //string-> arguments[1]: id of the image element      //
  //string-> arguments[2+]: classes of the image element//
  //----------------------------------------------------//

  let img = document.createElement("img");
  img.src = src;
  if (arguments.length > 1) {
    img.id = arguments[1];
  }
  if (arguments.length > 2) {
    for (let i = 2; i < arguments.length; i++) {
      img.classList.add(arguments[i]);
    }
  }
  return img;
}

function makeDiv() {
  //----------------------------------------------------//
  //returns a <div> element. Arguments are optional     //
  //string-> arguments[0]: assigned as the id           //
  //string-> arguments[1+]: assigned as classes         //
  //----------------------------------------------------//

  let div = document.createElement("div");
  if (arguments.length > 0) {div.id = arguments[0]}
  if (arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      div.classList.add(arguments[i]);
    }
  }
  return div;
}

function makeSVG(type) {
  //----------------------------------------------------//
  //Returns an SVG element of the type indicated..      //
  //string-> type: type of SVG element to be created    //
  //string-> arguments[1]: assigned as the id of the    //
  //  new SVG element                                   //
  //----------------------------------------------------//

  let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (arguments.length > 1) {svg.id = arguments[1]};
  return svg;
}

function vw(v) {
  //----------------------------------------------------//
  //I found this online. It finds the pixel value of a  //
  //  CSS vw value.                                     //
  //integer-> v: the vw value to find                   //
  //----------------------------------------------------//

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

function launchSlider() {
  //----------------------------------------------------//
  //Puts all the HTML and SVG elements into the document//
  //----------------------------------------------------//

  let slider = document.querySelector(".slider")

  let index = 0;

  //
  //Makes the SVG container for the left arrow
  let leftArrow = makeSVG("svg", "leftArrow");
  leftArrow.onclick = function() {
    index = (((index + images.length) - 1) % images.length);
    displayImages(index);
  };
  //
  //Defines the polygon of the left arrow
  let leftPoly = makeSVG("polygon");
    let side = vw(10);
    let length = side - (side * .866);
    let points = `${side},0 ${side},${side} ${length},${side / 2} ${side},0`
    leftPoly.setAttribute("points", points);
  leftArrow.appendChild(leftPoly);
  slider.appendChild(leftArrow);

  //
  //Makes the <div> to hold the images and
  //populates it with images from the array
  let imageDiv = makeDiv("imageDiv");
  for (let i = 0; i < images.length; i++) {
    let img = makeImg(images[i], "image" + i, "sliderImages");
    imageDiv.appendChild(img);
  }
  slider.appendChild(imageDiv);

  //
  //Makes the SVG container for the right arrow
  let rightArrow = makeSVG("svg", "rightArrow");
  rightArrow.onclick = function() {
    index = (((index + images.length) + 1) % images.length);
    displayImages(index);
  };
  //
  //Defines the polygon of the right arrow
  let rightPoly = makeSVG("polygon");
     side = vw(10);
     length = side * .866;
     points = `0,0 0,${side} ${length},${side / 2} 0,0`
    rightPoly.setAttribute("points", points);
  rightArrow.appendChild(rightPoly);
  slider.appendChild(rightArrow);

  //
  //Defines the drop shadow for the arrows
  let arrowShadows = makeSVG("defs");
    let filter = makeSVG("filter", "shadow");
      let shadow = makeSVG("feDropShadow");
      shadow.setAttribute("dx", -(side * .05));
      shadow.setAttribute("dy", (side * .05));
      shadow.setAttribute("stdDeviation", "5");
    filter.appendChild(shadow);
  arrowShadows.appendChild(filter);
  leftArrow.appendChild(arrowShadows);
  rightArrow.appendChild(arrowShadows);

  displayImages(index);
}

function displayImages(index) {
  //----------------------------------------------------//
  //Displays the images on the webpage.                 //
  //integer-> index: the index of the image to be       //
  //  to be displayed                                   //
  //----------------------------------------------------//

  let thirdTier = "175%, -225%, -350px";
  let secondTier = "200%, -150%, -280px";
  let firstTier = "150%, -50%, -200px";

  //
  //Hidden image, 3 left
  //This image is positioned but not shown to
  //  make the transitions appear smoother
  let l3 = document.getElementById("image" + (((index + images.length) - 3) % images.length));
    l3.style.transform = `translate3d(-${thirdTier})`;
    l3.style.zIndex = "-3";
    l3.style.filter = "opacity(0)";

  //
  //image, 2 left
  let l2 = document.getElementById("image" + (((index + images.length) - 2) % images.length));
    l2.style.transform = `translate3d(-${secondTier})`;
    l2.style.zIndex = "-2";
    l2.style.filter = "opacity(.25)";

  //
  //image, 1 left
  let l1 = document.getElementById("image" + (((index + images.length) - 1) % images.length));
    l1.onclick = "";
    l1.style.transform = `translate3d(-${firstTier})`;
    l1.style.zIndex = "-1";
    l1.style.filter = "opacity(.5)";

  //
  //primary image
  let primary = document.getElementById("image" + index);
    primary.onclick = function() {
      enlarge(index);
    }
    primary.style.transform = "translate3d(0, 0, 0px)";
    primary.style.zIndex = "1";
    primary.style.filter = "opacity(1)";

  //
  //image, 1 right
  let r1 = document.getElementById("image" + (((index + images.length) + 1) % images.length));
    r1.onclick = "";
    r1.style.transform = `translate3d(${firstTier})`;
    r1.style.zIndex = "-1";
    r1.style.filter = "opacity(.5)";

  //
  //image, 2 right
  let r2 = document.getElementById("image" + (((index + images.length) + 2) % images.length));
    r2.style.transform = `translate3d(${secondTier})`;
    r2.style.zIndex = "-2";
    r2.style.filter = "opacity(.25)";

  //
  //hidden image, 3 right
  //This image is positioned but not shown to
  //  make the transitions appear smoother
  let r3 = document.getElementById("image" + (((index + images.length) + 3) % images.length));
    r3.style.transform = `translate3d(${thirdTier})`;
    r3.style.zIndex = "-3";
    r3.style.filter = "opacity(0)";
}

function enlarge(index) {
  //----------------------------------------------------//
  //Enlarges an image when it is clicked                //
  //integer-> index: index of the image to be enlargd   //
  //----------------------------------------------------//

  let image = makeImg(images[index], "bigger");
  image.onclick = function() {
    //--------------------------------------------------//
    //Restores the image to its normal size when        //
    //  it's clicked                                    //
    //--------------------------------------------------//

    image.style.width = "40vw";
    image.style.border = "1vw solid rgb(255, 255, 255, 0)";
    div.style.top = "-15vh";
    left.style.display = "block";
    right.style.display = "block";
    setTimeout(function() {
      //------------------------------------------------//
      //Restores opacity to the previously hidden       //
      //  left and right arrows                         //
      //------------------------------------------------//

      left.style.opacity = "1";
      right.style.opacity = "1";
    }, 20);
    setTimeout(function() {
      //------------------------------------------------//
      //Once all the animations have run their course,  //
      //  the elements are removed from the DOM         //
      //------------------------------------------------//

      image.parentNode.removeChild(image);
      div.parentNode.removeChild(div);
    }, 510);
  }
  document.body.appendChild(image);
  //
  //Gets the ratio of width to height of the image
  //  to set the max-width
  let imgHeight, imgWidth, ratio;
  let activeImg = document.getElementById("image" + index);
  imgHeight = activeImg.offsetHeight;
  imgWidth = activeImg.offsetWidth;
  ratio = imgWidth / imgHeight;
  image.style.maxWidth = `calc(90vh * ${ratio})`;

  let left = document.getElementById("leftArrow");
  let right = document.getElementById("rightArrow");
  //
  //Creates the <div> that displays the caption
  let div = makeDiv("caption");
  div.innerHTML = captions[index] + "<br /><span>Click to hide</span>";
  div.onclick = function() {
    //--------------------------------------------------//
    //Hides and removes the caption <div> when          //
    //  it's clicked                                    //
    //--------------------------------------------------//

    div.style.top = "-15vh";
    setTimeout(function() {
      //------------------------------------------------//
      //Removes the caption <div> from the DOM after    //
      //  the transition animations have run            //
      //------------------------------------------------//

      div.parentNode.removeChild(div);
    }, 510);
  }
  document.body.appendChild(div);

  setTimeout(function() {
    //--------------------------------------------------//
    //Changes the initial values of the image, caption, //
    //  and buttons to their display values to create   //
    //  a clean transition animation                    //
    //--------------------------------------------------//

    image.style.width = "90vw";
    image.style.border = "1vw solid rgb(255, 255, 255)";
    div.style.top = "5vh";
    left.style.opacity = "0";
    right.style.opacity = "0";
    setTimeout(function() {
      //------------------------------------------------//
      //Hides the left and right buttons so they can't  //
      //  be clicked when the enlarged image is shown   //
      //------------------------------------------------//

      left.style.display = "none";
      right.style.display = "none";
    }, 500);
  }, 20);
}
