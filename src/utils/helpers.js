import firestore from '@react-native-firebase/firestore';
import Crashlytics from '@react-native-firebase/crashlytics';

// register user to firestore
export const saveUserToFirestore = async userData => {
  const {email, contact} = userData;
  try {
    const usersRef = firestore().collection('Users');
    const emailExists = await usersRef.where('email', '==', email).get();
    const contactExists = await usersRef.where('contact', '==', contact).get();
    if (!emailExists.empty || !contactExists.empty) {
      return {type: 'error', message: 'Account already exists!'};
    }
    await usersRef.add(userData);
    return {type: 'success', message: 'Signup Successfully!'};
  } catch (error) {
    Crashlytics().recordError(error);
    return {type: 'error', message: 'Please, try after some time!'};
  }
};

// login user using firestore check
export const loginUser = async credentials => {
  const {email, password} = credentials;

  try {
    const usersRef = firestore().collection('Users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      Crashlytics().log('No user found with this email');
      return {error: 'No user found with this email!'};
    }

    const userDoc = querySnapshot.docs[0];

    const userId = userDoc.id;
    const userData = userDoc.data();

    if (userData.password !== password) {
      Crashlytics().log('Incorrect password');
      return {error: 'Incorrect password!'};
    }

    Crashlytics().log('User logged in successfully!');
    Crashlytics().setAttributes({
      id: userId,
      name: userData.name,
      email: userData.email,
      contact: userData.contact,
    });
    return {data: {...userData, id: userId}}; // return the user data if login is successful
  } catch (error) {
    Crashlytics().recordError(error);
    return {error: error};
  }
};

// generate query to fetch news updates
export const generateQuery = newsTopics => {
  if (newsTopics.length !== 0) {
    const query = newsTopics
      .map(topic => topic.name.replace(/\s+/g, '').replace('&', ''))
      .join(' AND ');

    return query;
  }
};

// Add user reaction to Firestore
export const addUserReactionToFirestore = async (
  reaction,
  userId,
  newsCardId,
) => {
  const reactionRef = firestore()
    .collection('news')
    .doc(newsCardId)
    .collection('reactions')
    .doc(reaction);

  try {
    const doc = await reactionRef.get();
    if (doc.exists) {
      const userData = doc.data().users;
      if (userData && userData[userId]) {
        // User has already reacted with the same reaction, do nothing
        console.log(`User ${userId} has already reacted with ${reaction}`);
        return;
      }
    }

    await reactionRef.set(
      {
        users: {
          [userId]: true,
        },
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Failed to add reaction:', error);
    Crashlytics().recordError(error);
  }
};

// Remove user reaction from Firestore
export const removeUserReactionFromFirestore = async (
  reaction,
  userId,
  newsCardId,
) => {
  const reactionRef = firestore()
    .collection('news')
    .doc(newsCardId)
    .collection('reactions')
    .doc(reaction);

  try {
    const doc = await reactionRef.get();
    if (doc.exists) {
      await reactionRef.update({
        [`users.${userId}`]: firestore.FieldValue.delete(),
      });
    } else {
      console.log(
        `No reaction document found for ${reaction} and user ${userId}`,
      );
    }
  } catch (error) {
    console.error('Failed to remove reaction:', error);
    Crashlytics().recordError(error);
  }
};

// Get user reactions from firestore.
export const getReactionsFromFirestore = async newsCardId => {
  try {
    const reactionsSnapshot = await firestore()
      .collection('news')
      .doc(newsCardId)
      .collection('reactions')
      .get();

    if (!reactionsSnapshot.empty) {
      let reactions = {};
      let totalCount = 0;
      reactionsSnapshot.forEach(doc => {
        reactions[doc.id] = doc.data().users;
        totalCount += Object.keys(doc.data().users).length;
      });
      return {reactions, totalCount};
    }
    return {reactions: {}, totalCount: 0};
  } catch (error) {
    console.error('Failed to get reactions:', error);
    Crashlytics().recordError(error);
    return {reactions: {}, totalCount: 0};
  }
};

export const formatStockMarketData = data => {
  if (!data) {
    return null;
  }

  const {regularMarketPreviousClose, regularMarketDayHigh} = data;
  const price = regularMarketDayHigh.toFixed(2);
  const change = (regularMarketDayHigh - regularMarketPreviousClose).toFixed(2);
  const percentageChange = (
    ((regularMarketDayHigh - regularMarketPreviousClose) /
      regularMarketPreviousClose) *
    100
  ).toFixed(2);
  return {price, change, percentageChange};
};

export const saveUserEnquiry = async data => {
  try {
    // Add a new document with a generated ID
    await firestore()
      .collection('enquiries') // Replace with your collection name
      .add({
        fullName: data.name,
        mobile: data.mobile,
        email: data.email,
        message: data.message,
        createdAt: firestore.FieldValue.serverTimestamp(), // Optional: timestamp
      });

    return {
      message: 'We will get in touch with you shortly!',
      status: 'Success',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Server Error! Try after some time',
      status: 'Error',
    };
  }
};

export const saveUserFeedback = async data => {
  try {
    // Submit feedback to Firestore
    await firestore().collection('feedbacks').add({
      rating: data.rating,
      feedback: data.feedback,
      email: data.email,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return {
      message: 'Feedback Submitted!',
      status: 'Success',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Server Error! Please try again',
      status: 'Error',
    };
  }
};
