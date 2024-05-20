import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function EntryList({entries}) {


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
                    <Link to="/new_entry">
                        <button>Create Your First Entry</button>
                    </Link>
                    
                </>
            )}

        </div>

    )

}

export default EntryList