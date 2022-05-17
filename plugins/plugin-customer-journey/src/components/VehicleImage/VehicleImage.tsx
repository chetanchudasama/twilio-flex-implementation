import { ImageCarousel, CarNotFoundIcon } from "@common/components";
import React, { useState, useEffect } from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { VehicleImageStyles } from "./VehicleImage.Styles";

export interface VehicleImageProps {
  image: string;
  imageList?: string[];
  imagesCount?: number;
  showImageCount?: boolean;
}

export const VehicleImage: React.FC<VehicleImageProps> = ({
  image,
  imageList,
  imagesCount,
  showImageCount,
}) => {
  const [isImageUrlValid, setIsImageUrlValid] = useState(true);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);

  const hasImages = imageList && imageList.length > 0;

  useEffect(() => {
    const imageExists = (
      url: string,
      callback: (isImageExists: boolean) => void
    ) => {
      const img: HTMLImageElement = new Image();
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
      img.src = url;
    };

    if (image) {
      imageExists(image, (isImageExists) => {
        setIsImageUrlValid(isImageExists);
      });
    } else {
      setIsImageUrlValid(false);
    }
  }, [image]);

  return (
    <>
      <VehicleImageStyles
        onClick={() =>
          isImageUrlValid && hasImages ? setShowCarousel(true) : {}
        }
      >
        {image && isImageUrlValid ? (
          <>
            <img src={image} className="vehicle-img" alt="" />
            {isImageUrlValid && showImageCount && (
              <div className="image-count">
                <CameraAltIcon className="icon" />
                {imagesCount ?? 0}
              </div>
            )}
          </>
        ) : (
          <div className="image-missing">
            <CarNotFoundIcon />
          </div>
        )}
      </VehicleImageStyles>
      {showCarousel && hasImages && (
        <ImageCarousel
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          images={imageList!}
          showCarousel={showCarousel}
          handleClose={() => setShowCarousel(false)}
        />
      )}
    </>
  );
};
