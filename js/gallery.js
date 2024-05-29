const gallerySection = document.querySelector(".gallery-images");

window.addEventListener("load", async () => {
  try {
    const response = await fetch("software/api.php?name=gallery");
    const data = await response.json();
    console.log(data);

    if (data.success === true) {
      const gallery = data.data;
      let galleryArea = "";
      gallery.forEach((image) => {
        console.log(image);

        //     galleryArea += `
        //   <div class="col-12 col-md-4 gallery-img-block">
        //   <div class="gallery-block">
        //     <img src="software/uploads/${image.img}" alt="Hall Images" />
        //     <div class="gallery-block-overlay">
        //       <p> ${image.heading}</p>
        //     </div>
        //   </div>
        // </div>
        //   `;

        galleryArea += `
             <div
          class="gallery-content"
          data-responsive="software/uploads/${image.img}"
          data-src="software/uploads/${image.img}"
          style="border:2px solid black;
        >
          <a href="index.html">
            <img
            
              src="software/uploads/${image.img}"
              alt="Gallery Image"
            />
          </a>
        </div>
      `;
      });
      gallerySection.innerHTML = galleryArea;
    } else {
      gallerySection.innerHTML =
        "<h2 class='text-danger'> No Images For Now </h2>";
    }
  } catch (error) {
    return error;
  }
});

// <div class="gallery-block-overlay">
{
  /* <p> ${image.heading} </p> */
}
// </div>
