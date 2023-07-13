import {db} from '../firebase'

const firestore = db.firestore()

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data)
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}