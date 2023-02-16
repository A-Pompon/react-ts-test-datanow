import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import {HandleResult} from "../interfaces"

export const Home: React.FC = () => {

    const [showPulse, setShowPulse] = useState(false);
    const [newPulse, setNewPulse] = useState(false);
    const [result, setResult] = useState<HandleResult | null>(null);
    

    useEffect(() => {
        const getPulse = () => {
            fetch(
                "https://beacon.nist.gov/beacon/2.0/chain/last/pulse/last", 
                {
                method: 'GET',
                mode: 'cors'
                }
                )
                .then(
                    response => response.json()
                )
                .then(
                    data => setResult({status: "ok", data: data, error: null})
                )
                .catch(
                    error => setResult({status: "error", data: null, error: error})
                )
        }
        getPulse();
    }, [newPulse])
    

    const handleNewPulse = () => {
        newPulse === false ? setNewPulse(true) : setNewPulse(false);
    }

    const handleOnClick = () => {
        setShowPulse(true);
        handleNewPulse();
    }

  return (
    <div className='home-container'>
        <h1>Randomness Beacon</h1>
        
        <button onClick={handleOnClick}>Show me the last random value</button>
        
        {showPulse && result?.data !== null && (
            <div className="pulse-container">
                <p className='para'>Output value is : </p>
                <p className='para'>{result?.data?.pulse?.outputValue}</p>
                <p className='para'>Date of output value : </p>
                <p className='para'>{result?.data?.pulse?.timeStamp.toString()}</p>
            </div>
        )}

        {
            result?.status === "error" && (
                <div className="error">
                    <h2>A problem has occurred :</h2>
                    <p>{result.error?.message}</p>
                </div>
            )
        }
    </div>
  );
}
