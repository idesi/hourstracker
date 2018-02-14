import React from 'react';
import firebase from './firebase';

const UserProfile = () => {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    return <div>User not found</div>;
  } else
    return (
      <div>
        Hello, {currentUser.displayName}
      </div>
    );
};

export default UserProfile;
