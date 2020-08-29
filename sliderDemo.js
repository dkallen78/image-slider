images = ["images/buenosAires.png",
          "images/chichenItza.png",
          "images/machuPichu.png",
          "images/mexicoCity.png",
          "images/newYork.png",
          "images/philadelphia.png",
          "images/santiago.png",
          "images/saucillo.png",
          "images/valparaiso.png",
          "images/washingtonDC.png"];

captions = ["Buenos Aires, Argentina",
            "Chichén Itzá, Mexico",
            "Machu Pichu, Perú",
            "Ciudad de México, México",
            "New York, New York",
            "Philadelphia, Pennsylvania",
            "Santiago, Chile",
            "Los Arcos Saucillo, México",
            "Valparaíso, Chile",
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

function launchSlider() {
  let slider = document.querySelector(".slider")

  let index = 0;

  let leftArrow = makeImg("leftArrow.svg", "leftArrow", "arrows");
  leftArrow.onclick = function() {
    index = (((index + images.length) - 1) % images.length);
    displayImages(index);
  };
  slider.appendChild(leftArrow);

  let imageDiv = makeDiv("imageDiv");
  for (let i = 0; i < images.length; i++) {
    let img = makeImg(images[i], "image" + i, "sliderImages");
    imageDiv.appendChild(img);
  }
  slider.appendChild(imageDiv);

  let sliderHeight = 0;
  setTimeout(function() {
    for (let i = 0; i < images.length; i++) {
      let img = document.getElementById("image" + i);
      if (img.offsetHeight > sliderHeight) {
        sliderHeight = img.offsetHeight;
      }
    }
    imageDiv.style.height = sliderHeight + "px";
    slider.style.height = sliderHeight + "px";
  }, 20);

  let rightArrow = makeImg("rightArrow.svg", "rightArrow", "arrows");
  rightArrow.onclick = function() {
    index = (((index + images.length) + 1) % images.length);
    displayImages(index);
  };
  slider.appendChild(rightArrow);

  displayImages(index);
}

function displayImages(index) {

  let thirdTier = "175%, -225%, -350px";
  let secondTier = "200%, -150%, -280px";
  let firstTier = "150%, -50%, -200px";

  //
  //Hidden image, 3 left
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
  let r3 = document.getElementById("image" + (((index + images.length) + 3) % images.length));
    r3.style.transform = `translate3d(${thirdTier})`;
    r3.style.zIndex = "-3";
    r3.style.filter = "opacity(0)";

}

function enlarge(index) {

  let image = makeImg(images[index], "bigger");
  let imgHeight, imgWidth, ratio;
  let activeImg = document.getElementById("image" + index);
  imgHeight = activeImg.offsetHeight;
  imgWidth = activeImg.offsetWidth;
  if (imgWidth > imgHeight) {
    ratio = imgWidth / imgHeight;
    image.style.maxWidth = `calc(90vh * ${ratio})`;
  }

  let left = document.getElementById("leftArrow");
  let right = document.getElementById("rightArrow");


  document.body.appendChild(image);

  let div = makeDiv("caption");
  div.innerHTML = captions[index] + "<br /><span>Click to hide</span>";
  div.onclick = function() {
    div.style.top = "-15vh";
    setTimeout(function() {
      div.parentNode.removeChild(div);
    }, 510);
  }
  document.body.appendChild(div);


  setTimeout(function() {
    image.style.width = "90vw";
    image.style.border = "1vw solid rgb(255, 255, 255)";
    div.style.top = "5vh";
    left.style.filter = "opacity(0)";
    right.style.filter = "opacity(0)";
    setTimeout(function() {
      left.style.display = "none";
      right.style.display = "none";
    }, 500);
  }, 20);

  image.onclick = function() {
    image.style.width = "40vw";
    image.style.border = "1vw solid rgb(255, 255, 255, 0)";
    div.style.top = "-15vh";
    left.style.display = "block";
    right.style.display = "block";
    setTimeout(function() {
      left.style.filter = "opacity(1)";
      right.style.filter = "opacity(1)";
    }, 20);

    setTimeout(function() {
      image.parentNode.removeChild(image);
      div.parentNode.removeChild(div);
    }, 510);
  }
}
