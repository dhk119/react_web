import { NavLink } from "react-router-dom";

const LeftSideMenu = (props) => {
  const menus = props.menus;
  return (
    <div className="side-menu">
      <ul>
        {menus.map((menu, i) => {
          return (
            <li key={"side-menu" + i}>
              <NavLink
                to={menu.url}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <span>{menu.text}</span>
                <span className="material-icons">chevron_right</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideMenu;
