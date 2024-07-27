
// ────────────────────────────────────────────────────────────────────────────────
// *                                  Task&Master                                 *
// *                          Created by Pavlo Mytrovtsiy                         *
// *                            Last Update: 27/07/2024                           *
// *                                                                              *
// * Copyright © 2024 Pavlo Mytrovtsiy. All rights reserved.                      *
// * GitHub: https://github.com/NewBumpEr                                         *
// ────────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

// Hi everyone, if you want to modify the Firebase configuration, you need to create a `firebaseConfig.js` file in the `src/script/database` directory and then copy your Firebase configuration into that file.
// If you encounter any issues, feel free to reach out to me, and I will do my best to assist you.
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerUser = async (email, password, nickname) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      nickname: nickname,
      email: email,
      id: user.uid,
    });

    const tasksCollectionRef = collection(db, `users/${user.uid}/tasksMonth`);

    const currentDate = new Date();
    const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000);

    const exampleTask = {
      title: 'Example Task',
      timeStart: currentDate.toISOString(),
      timeEnd: oneHourLater.toISOString(),
      date: currentDate.toISOString().split('T')[0],
      description: 'This is an example task.',
      completed: false,
    };

    await addDoc(tasksCollectionRef, exampleTask);

    return user;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async email => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const saveUserProfile = async (userId, nickname, email) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { nickname, email }, { merge: true });
  } catch (error) {
    throw error;
  }
};

const saveUserDataToSessionStorage = async user => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      sessionStorage.setItem(
        'user-info',
        JSON.stringify({
          isUser: true,
          email: userData.email,
          nickname: userData.nickname,
          ID: userData.id,
        })
      );
      sessionStorage.setItem('user-creds', JSON.stringify(user));
    } else {
      console.error('User data not found in Firestore.');
    }
  } catch (error) {
    console.error('Error saving user data to sessionStorage:', error);
  }
};

const selectDataProfile = async userId => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return {
        nickname: userData.nickname,
        email: userData.email,
        id: userId,
      };
    } else {
      throw new Error('User document not found in Firestore.');
    }
  } catch (error) {
    throw error;
  }
};

const getUserTasks = async userId => {
  try {
    const tasksCollectionRef = collection(db, `users/${userId}/tasksMonth`);
    const q = query(tasksCollectionRef);
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach(doc => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    tasks.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return tasks;
  } catch (error) {
    throw error;
  }
};

const isLoggedIn = () => {
  const userInfo = sessionStorage.getItem('user-info');
  if (!userInfo) {
    return false;
  }

  const { isUser } = JSON.parse(userInfo);

  return !!isUser;
};

const editTask = async (userId, taskId, updatedTaskData) => {
  try {
    const taskDocRef = doc(db, `users/${userId}/tasksMonth`, taskId);
    if (updatedTaskData.timeStart) {
      updatedTaskData.timeStart = new Date(
        updatedTaskData.timeStart
      ).toISOString();
    }
    if (updatedTaskData.timeEnd) {
      updatedTaskData.timeEnd = new Date(updatedTaskData.timeEnd).toISOString();
    }
    await setDoc(taskDocRef, updatedTaskData, { merge: true });
  } catch (error) {
    throw error;
  }
};

const completedTask = async (userId, taskId, completed) => {
  try {
    const taskDocRef = doc(db, `users/${userId}/tasksMonth`, taskId);
    await setDoc(taskDocRef, { completed }, { merge: true });
  } catch (error) {
    throw error;
  }
};

const addTask = async (userId, taskData) => {
  try {
    if (taskData.timeStart instanceof Date) {
      taskData.timeStart = taskData.timeStart.toISOString();
    }
    if (taskData.timeEnd instanceof Date) {
      taskData.timeEnd = taskData.timeEnd.toISOString();
    }

    const tasksCollectionRef = collection(db, `users/${userId}/tasksMonth`);
    await addDoc(tasksCollectionRef, taskData);
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (userId, taskId) => {
  try {
    const taskDocRef = doc(db, `users/${userId}/tasksMonth`, taskId);
    await deleteDoc(taskDocRef);
  } catch (error) {
    throw error;
  }
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  registerUser,
  forgotPassword,
  loginUser,
  saveUserDataToSessionStorage,
  isLoggedIn,
  selectDataProfile,
  saveUserProfile,
  getUserTasks,
  editTask,
  completedTask,
  addTask,
  deleteTask,
};