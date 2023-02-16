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
        <h1>Home</h1>
        
        <button onClick={handleOnClick}>Show me the last random value</button>
        
        {showPulse && result?.data !== null && (
            <div className="pulse-container">
                <p className='para'>Le pulse est : {result?.data?.pulse?.outputValue}</p>
                <p>La date du pulse est : {result?.data?.pulse?.timeStamp.toString()}</p>
            </div>
        )}

        {
            result?.status === "error" && (
                <div className="error">
                    <h1>Un problème est survenu :</h1>
                    <h2>{result.error?.message}</h2>
                </div>
            )
        }
    </div>
  );
}
