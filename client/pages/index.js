import { useState } from "react";

function HomePage() {
    const [compoundStatus, setCompoundStatus] = useState('Search for a compound...');
    const [compoundInfo, setCompoundInfo] = useState(null);

    const handleNameSubmit = (event) => {
        event.preventDefault();
        const compoundName = event.target[0].value;

        if(compoundName) getCompoundByName(`/compound/name/${compoundName}`);
    };

    const getCompoundByName = async (url = '') => {
        fetch(url).then(res => {
            if(res.status !== 404) {
                res.json().then(data => {
                    setCompoundStatus('Found the compound you were looking for!');
                    setCompoundInfo(data['PC_Compounds'][0]);
                });
            }
            else setCompoundStatus('Cannot find compound...');
        }).catch(err => console.error(err));
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
                <input type="text" id="compoundSearch" placeholder="methane"/>
                <button type="submit" onSubmit={handleNameSubmit}>Search</button>
            </form>

            <br/>
            <div>{compoundStatus}</div>
            <Log value={compoundInfo}/>
        </>
    );
}

export default HomePage;