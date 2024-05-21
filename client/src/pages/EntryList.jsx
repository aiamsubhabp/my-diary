import { Link } from "react-router-dom"
import styled from 'styled-components'
import {Box, Button} from '../styles'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EntryList({entries, setEntries}) {
    const handleDeleteClick = (id) => {
        fetch(`/api/entries/${id}`, {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id))
            }
        })
    }

    return (
        <Wrapper>
            {entries.length > 0 ? (
                entries.map((entry) => (
                    <Entry key={entry.id}>
                        <Box>
                         <h2>{entry.title}</h2>
                         {entry.post}
                         <br />
                         <Button onClick = {(() => handleDeleteClick(entry.id))} >
                            <FontAwesomeIcon icon = {faTrash} />
                         </Button>
                         <Link to={`/edit_entry/${entry.id}`}>
                            <Button>
                                <FontAwesomeIcon icon = {faEdit} />
                            </Button>
                         </Link>

                        </Box>
                    </Entry>
                ))
            ) : (
                <>
                    <h2>No Entries Found...</h2>
                    <Button as={Link} to="/new_entry">
                        Publish Your First Entry
                    </Button>
                    
                </>
            )}
        </Wrapper>

    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Entry = styled.article`
  margin-bottom: 24px;
`;

export default EntryList