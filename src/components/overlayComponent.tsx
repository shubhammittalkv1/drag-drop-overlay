import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { OverlayComponentProps } from "../core/dictionary/types";

const OverlayComponent: React.FC<OverlayComponentProps> = ({ imageUrl, hideOverlay }) => {
    const [isLoading, setIsLoading] = useState(true);

    const escFunction = useCallback((event: KeyboardEvent) => {
        // Below Method is called only when user click Escape button
        if (event.key === "Escape") {
            hideOverlay();
        }
        // End of the above code
    }, [hideOverlay]);

    // Below code is to track the user key down event for pressing the Escape Button
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
    // End of the above code

    // Below code is used for tracking the image loading cycle for Spinner Loader
    useEffect(() => {
        const currentImage = new Image();
        currentImage.onload = () => {
            setIsLoading(false);
        };
        currentImage.src = imageUrl;
    }, [imageUrl]);
    // End of the above code

    return (
        <div className="overlay-container">
            <div className="overlay-image-container">
                {isLoading ? (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <ClipLoader color="white" size={60} />
                    </div>
                ) : (
                    <>
                        <img
                            className="w-100 h-100 object-fit-contain"
                            width={"100vw"}
                            height={"100%"}
                            src={imageUrl}
                            alt={imageUrl+ "Overlay Content Image"} // We can change this later
                            draggable="false"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default OverlayComponent;
