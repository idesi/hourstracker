import firebase from 'firebase';
import config from './config.js';
import utils from './utils';

firebase.initializeApp(config);

export default firebase;

export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const ref = db.ref('server/wagetracker');
const timeEntryRef = ref.child('timeEntry');

const push = ref => data => ref.push(data);

//For a given reference, it will return the first record ordered by the give key
const getOneByValue = ref => key => ref.orderByChild(key).limitToLast(1).once('value');

const timeEntryPush = async data => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return;
  }

  data.date = utils.getCurrentDate();
  data.userID = currentUser.uid;

  //Add a field which combines date & userID.
  //In most cases we want to query for both of these fields, this is a hacky way to add our own
  //multi-column index
  data.date_userID = data.date + data.userID;

  //Confirm that a data entry for this day doesn't already exist
  let existingData = await getOneByValue(timeEntryRef)('date_userID');
  existingData = existingData.val();

  if (existingData) {
    //We get back key : { data... }
    //By calling Object.values we get an array [0] : { data... }
    existingData = Object.values(existingData)[0];
  }

  //Seems redundant but firebase returns the last record if it doesn't find a match.
  //Therefore, ensure the result actually contains the field data that we care about
  if (existingData && existingData.date_userID === data.date_userID) {
    throw new Error('Another record for today already exists');
  }

  // console.log('we done?');
  return push(timeEntryRef)(data);
  // console.log('done!!!');
};

export { timeEntryPush };
