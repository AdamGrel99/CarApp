import { Dropdown, Header, Icon, Segment } from "semantic-ui-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../Features/Auth/authSlice";
import "./Header.css";

export default function CustomHeader() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, displayName } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Segment inverted textAlign="center" style={{ padding: "1em 0" }}>
      <Header as="h1" inverted>
        Samochodowo
      </Header>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/cars"
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        Samochody
      </NavLink>
      <NavLink
        to="/info"
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        Info
      </NavLink>
      {isLoggedIn ? (
        <div className="user-layout">
          <Dropdown
            item
            trigger={
              <span className="user-text">
                <Icon name="user circle" size="large" className="user-icon" />
                {displayName}
              </span>
            }
          >
            <Dropdown.Menu style={{ marginTop: "10px" }}>
              <Dropdown.Item
                text="Wyloguj się"
                icon="sign-out"
                onClick={handleLogout}
                style={{ color: "#d32f2f" }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <div className="user-layout">
          <span className="user-text">
            <Icon name="user outline" size="large" className="user-icon" />
            Użytkownik
          </span>
        </div>
      )}
    </Segment>
  );
}
