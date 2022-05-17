import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface ImageCarouselProp {
  images: string[];
  showCarousel: boolean;
  handleClose: () => void;
}

const modalStyle = {
  overlay: {
    zIndex: 1500,
  },
};

export const ImageCarousel: React.FC<ImageCarouselProp> = ({
  images,
  showCarousel,
  handleClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      {showCarousel && (
        <Lightbox
          reactModalStyle={modalStyle}
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={handleClose}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          clickOutsideToClose={false}
        />
      )}
    </>
  );
};
