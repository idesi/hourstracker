import firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

export default firebase;

export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const ref = db.ref('server/wagetracker');
const timeEntryRef = ref.child('timeEntry');

const push = ref => data => ref.push(data);

const timeEntryPush = async data => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return;
  }

  data.userID = currentUser.uid;

  return push(timeEntryRef)(data);
};

export { timeEntryPush };
