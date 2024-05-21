import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {Button} from '../styles'

function NavBar({user, setUser}) {
    function handleLogoutClick() {
        fetch('/api/logout', {method:'DELETE'}).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }
    return (
        <Wrapper>
            <Logo>
                <Link to='/'>
                    {user.username}'s Diary
                </Link>
            </Logo>
            <Nav>
                <Button as={Link} to='new_entry'>
                    New Entry
                </Button>
                <Button variant='outline' onClick = {handleLogoutClick}>
                    Logout
                </Button>
            </Nav>
        </Wrapper>

    )
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: #20C997;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar