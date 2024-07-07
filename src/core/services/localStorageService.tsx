// This service is used for getting and setting the data on the localstorage
import { CardValue } from "../dictionary/types";
const LocalStorageService = (function () {
    // Below method is used to set the current state data to the localstorage 
    function _setCurrentStateData(value: CardValue[]): void {
        localStorage.setItem('displayData', JSON.stringify(value));
    }
    // End of the above code

    // Below code is used for getting the current state data from the localstorage
    function _getCurrentStateData(): CardValue[] {
        let currentStateData: CardValue[] = [];
        const storedData = localStorage.getItem("displayData");
        if (storedData) {
            currentStateData = JSON.parse(storedData);
        }
        return currentStateData;
    }
    // End of the above code

    return {
        setCurrentStateData: _setCurrentStateData,
        getCurrentStateData: _getCurrentStateData
    };
})();

export default LocalStorageService;
