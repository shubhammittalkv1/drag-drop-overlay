
import React, { useEffect, useState } from 'react';
import { TimerComponentProps } from '../core/dictionary/types';
import { ClipLoader } from 'react-spinners';
import { convertToDesiredTime } from '../core/utils/convertToDesiredTime';

const TimerComponent: React.FC<TimerComponentProps> = ({ lastTime, isLoader }) => {
    // Defining local State
    const [timeDiff, setTimeDiff] = useState<string>('');
    // End of the above code

    // Below code is used when lastTime is updated from the parent component
    useEffect(() => {
        let timeInterval: NodeJS.Timeout | null = null;
        if (!!lastTime) {
            setTimeDiff('');
            setTimeDiff(convertToDesiredTime(lastTime))
            timeInterval = setInterval(() => {
                setTimeDiff(convertToDesiredTime(lastTime));
            }, 1000);
        }
        return () => {
            if (timeInterval !== null) {
                clearInterval(timeInterval);
            }
        }
    }, [lastTime]);
    // End of the above code

    return (
        <div className="timer-container alert alert-primary">
            {isLoader === true ? <p className="m-0 d-flex justify-content-center align-items-center gap-2">Loading <ClipLoader size={24} /></p> : <p className="m-0">Last Save {timeDiff} Ago</p>}
        </div>
    );
};

export default TimerComponent;
