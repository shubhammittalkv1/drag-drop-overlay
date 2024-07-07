import { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Card from './components/card';
import LocalStorageService from './core/services/localStorageService';
import OverlayComponent from './components/overlayComponent';
import { CardValue } from './core/dictionary/types';

function App() {
  // Defining state variables
  const localStorageService = LocalStorageService;
  const [data, setData] = useState<CardValue[]>([]);
  const dataRef = useRef<CardValue[]>([]);
  const [sourceDraggedId, setSourceDraggedId] = useState<number | null>(null);
  const [destinationDraggedId, setDestinationDraggedId] = useState<number | null>(null);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const isDataChangedRef = useRef<boolean>(false);
  // End of the above code

  // Below code is used when data and isDataChanged Variable is updated
  useEffect(() => {
    dataRef.current = data;
    isDataChangedRef.current = isDataChanged;
  }, [data, isDataChanged]);
  // End of the above code

  // Below code is used at the mounting stage of the component
  useEffect(() => {
    let timeInterval: NodeJS.Timeout | null = null;

    const currentData = localStorageService.getCurrentStateData();
    if (Object.keys(currentData).length === 0) {
      getStaticJSONData();
    } else {
      setData(currentData);
    }

    timeInterval = setInterval(() => {
      if (isDataChangedRef.current) {
        localStorageService.setCurrentStateData(dataRef.current);
        setIsDataChanged(false);
      }
    }, 5000);

    // Clearing the interval variable at the unmounting stage of the component
    return () => {
      if (timeInterval !== null) {
        clearInterval(timeInterval);
      }
    };
  }, []);
  // End of the above code

  // Below code is used to fetch the data from the Mock API
  const getStaticJSONData = async () => {
    try {
      const response = await fetch("/api/get-static-data");
      if (!response.ok) {
        console.error(response);
      }
      const data = await response.json();
      setData(data.data);
      localStorageService.setCurrentStateData(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  // End of the above code

  // Below code is used to mapped the changed data when user drag and drop the card
  const mapChangedData = (sourceID: number | null, destinationID: number | null) => {
    if (sourceID === null || destinationID === null) {
      return;
    }
    let currentState = [...data];
    const [removed] = currentState.splice(sourceID, 1);
    currentState.splice(destinationID, 0, removed);
    setData(currentState);
    setIsDataChanged(true);
  };
  // End of the above code

  // Below code is used for the drag and drop functionality
  const drop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Getting the Destination Card Details 
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>, indexValue: number) => {
    event.preventDefault();
    setDestinationDraggedId(indexValue);
  };
  
  // Mapping the new data when drop is done
  const onDragEnd = (event: React.DragEvent<HTMLDivElement>, indexValue: number) => {
    event.preventDefault();
    mapChangedData(sourceDraggedId, destinationDraggedId);
    setIsDataChanged(true);
  };
  
  // Getting the Source Card Details 
  const onDrag = (event: React.DragEvent<HTMLDivElement>, indexValue: number) => {
    event.preventDefault();
    setSourceDraggedId(indexValue);
  };
  // End of the above code

  // Below code is used for overlay component

  // setting the required variables information at the time of Clicking on the Image
  const openImageOverLay = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setTimeout(() => {
      setShowOverlay(true);
    }, 100);
  };
  // Closing the Overlay
  const hideOverlay = () => {
    setShowOverlay(false);
  };
  // End of the above code

  return (
    <div className="container">
      <div
        onDrop={drop}
        onDragOver={allowDrop}
        className="layout-container"
      > 
      {/* Below code is for iterating the cards in the grid format */}
        {!!data && data.map((item, index) => (
          <div
            className="card-container"
            key={index}
            onDragEnd={(e) => onDragEnd(e, index)}
            onDragOver={(e) => onDragLeave(e, index)}
            onDrag={(e) => onDrag(e, index)}
            draggable="true"
          >
            <Card cardData={item} indexValue={index} openImageOverLay={openImageOverLay} />
          </div>
        ))}
      {/* End of the above code */}
      </div>
      {/* Below code is for the Overlay Functionality */}
      {showOverlay && 
        <OverlayComponent hideOverlay={hideOverlay} imageUrl={selectedImageUrl}></OverlayComponent>
      }
      {/* End of the above code */}
    </div>
  );
}

export default App;
