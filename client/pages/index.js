import { useState } from "react";

function HomePage() {
    const [compoundStatus, setCompoundStatus] = useState('Search for a compound...');
    const [compoundInfo, setCompoundInfo] = useState(null);
    const [compoundName, setCompoundName] = useState('');
    const [isAlkylHalide, setAlkylHalide] = useState(false);

    const handleChange = (event) => {
        setCompoundName(event.target.value);
    };

    const handleNameSubmit = (event) => {
        event.preventDefault();
        const name = event.target[0].value;

        if(name) {
            setCompoundName(name);
            getCompoundByName(`/compound/name/${name}`);
        }
    };

    const getCompoundByName = async (url = '') => {
        fetch(url).then(res => {
            if(res.status !== 404) {
                res.json().then(data => {
                    if(data['PC_Compounds']) {
                        setCompoundStatus(`Compound '${compoundName}' has been found`);
                        verifyAlkylHalide(compoundName);
                        setCompoundInfo(data['PC_Compounds'][0]);
                    }
                    else {
                        setCompoundStatus(`There is no valid CID for compound '${compoundName}'`);
                        setCompoundInfo(null);
                    }
                });
            }
            else {
                setCompoundStatus(`Cannot find compound '${compoundName}'`);
                setCompoundInfo(null);
            }
        }).catch(err => console.error(err));
    };

    const verifyAlkylHalide = (name) => {
        // Compounds that contain halogens (F, Cl, Br, I)
        // fluoro-, chloro-, bromo-, iodo-
        const regex = /fluoro|chloro|bromo|iodo/gmi;
        console.log(name.search(regex));
        if(name.search(regex) < 0)
            setAlkylHalide(false);
        else
            setAlkylHalide(true);
    };

    const Log = ({ value, replacer = null, space = 2 }) => (
        <pre
            style={{
                backgroundColor: '#eee',
                padding: '1em'
            }}
        >
            <code>
                {JSON.stringify(value, replacer, space)}
            </code>
        </pre>
    );

    return (
        <>
            <h1>Welcome to OWERT (OChem We Even Remember This)</h1>

            <form onSubmit={handleNameSubmit}>
                <label htmlFor="compoundSearch">Search Compounds By Name:</label><br/>
                <input type="text" onChange={handleChange} id="compoundSearch" placeholder="methane"/>
                <button type="submit" onSubmit={handleNameSubmit}>Search</button>
            </form>

            <br/>
            <div>{compoundStatus}</div>
            <div>{isAlkylHalide ? 'Compound is alkyl halide' : 'Compound is NOT alkyl halide'}</div>
            <Log value={compoundInfo}/>
        </>
    );
}

export default HomePage;