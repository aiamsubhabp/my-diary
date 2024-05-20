import { useEffect, useState } from "react"

function EntryList() {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        fetch("/api/entries")
            .then((r) => r.json())
            .then(data => setEntries(data))
    }, [])

    return (
        <div>
            {entries.length > 0 ? (
                entries.map((entry) => (
                    <div key={entry.id}>
                         <h2>{entry.title}</h2>
                         {entry.post}
                    </div>
                ))
            ) : (
                <>
                    <h2>No Entries Found...</h2>
                    <button>Create Your First Entry</button>
                </>
            )}

        </div>

    )

}

export default EntryList