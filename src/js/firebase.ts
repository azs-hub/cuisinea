// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getFakeRecipes } from '@/mocks/recipe.mock'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const recipes = getFakeRecipes(2)

async function addRecipesToFirestore() {
  try {
    const batch = collection(db, 'recipes')

    recipes.forEach(async (recipe) => {
      await addDoc(batch, recipe)
      console.log(`Recipe ${recipe.name} added to Firestore`)
    })
  } catch (error) {
    console.error('Error adding recipe:', error)
  }
}

addRecipesToFirestore()
