const homeGallerySection = document.querySelector(".home-gallery");

window.addEventListener("load", async () => {
  try {
    const response = await fetch("software/api.php?name=gallery");
    const data = await response.json();

    if (data.success === true) {
      const gallery = data.data;
      let galleryArea = "";
      gallery.forEach((image) => {
        galleryArea += `
        <div class="col-12 col-md-4 gallery-img-block">
        <div class="gallery-block">
          <img src="software/uploads/${image.img}" alt="Hall Images" />
          <div class="gallery-block-overlay">
            <p> ${image.heading}</p>
          </div>
        </div>
      </div>
      `;
      });
      homeGallerySection.innerHTML = galleryArea;
    } else {
      gallerySection.innerHTML =
        "<h2 class='text-danger'> No Images For Now </h2>";
    }
  } catch (error) {
    return error;
  }
});
