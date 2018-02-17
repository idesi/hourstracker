import React from 'react';
import firebase from './firebase';

const UserProfile = () => {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    return <div>User not found</div>;
  } else
    return (
      <div className="text-large">
        Hello, <span className="emphasize-foreground">{currentUser.displayName}</span>
      </div>
    );
};

export default UserProfile;
