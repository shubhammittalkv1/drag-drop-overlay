// Below is the interface for the card Object
export interface CardValue {
    type: string;
    title: string;
    thumbnailImageUrl: string;
    imageUrl: string;
    position: number;
}
// End of the above code

// Below is the interface for the card component props
export interface CardProps {
    cardData: CardValue;
    indexValue: number;
    openImageOverLay: (imageUrl: string) => void;
}
// End of the above code

// Below is the interface for the Overlay Component Props
export interface OverlayComponentProps {
    imageUrl: string;
    hideOverlay: () => void;
}
// End of the above code

// Below code is the interface for the timer component
export interface TimerComponentProps {
    lastTime: number | null;
    isLoader: boolean
}
// End of the above code
