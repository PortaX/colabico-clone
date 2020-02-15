import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { firebase } from '../firebase/firebase';

const Header = ({userId,setUserId}) => {

    const [redirect, updateRedirect] = useState();

    const [userState, setUserState] = useState('');

    useEffect(() => {
        if(userId){
            setUserState('logout');
        }else{
            setUserState('login');
        }
    },[userId]);

    const handleLogOut = () => {
        firebase.auth().signOut().then(function() {
            setUserId('');
            updateRedirect('/');
          }).catch(function(error) {
            // An error happened.
          });
    }

    // if(redirect){
    //     return <Redirect to={redirect}/>
    // }else{
    return(
        <div className='header'>
            <Link to='/' className='header__button' id='header__colabico'>COLABI.CO</Link>
            <div className='header__right'>
                <button className='header__button' id='header__tweet'>TWEET</button>
                {userState === 'login' ? 
                <Link to='/login' className='header__button' id='header__login'>LOGIN</Link> : 
                <button onClick={handleLogOut} className='header__button' id='header__logout'>LOGOUT</button>}
            </div>
        </div>
    );
    // }
}

const mapStateToProps = state => ({
    userId: state.userId
});

const mapDispatchToProps = dispatch => {
    return {
      setUserId: (userId) => dispatch({ type: 'SET_USER_ID', payload: { userId } }),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Header);