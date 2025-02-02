import React,{useContext} from 'react';
import{useHistory} from 'react-router-dom'
import './Header.css';
import { useNavigate } from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext,FirebaseContext } from '../../store/Context';
import { auth } from '../../firebase/config';  // Import auth instance from config.js
import { signOut } from 'firebase/auth';


function Header() {
  const history=useHistory()
  const {user}=useContext(AuthContext);
  const {firebase}=useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user?`welcome ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
         {user && (
          <span
            onClick={() => {
              signOut(auth).then(() => {
                history.push('/login');
              }).catch(error => {
                console.error("Error signing out: ", error);
              });
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
