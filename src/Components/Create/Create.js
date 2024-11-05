import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase/config'; // Import auth instance from config.js

import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const Create = () => {
  const { storage } = useContext(FirebaseContext); // Access storage from FirebaseContext
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (image && storage) { // Ensure storage is available
      const imageRef = ref(storage, `/images/${image.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        console.log("Uploaded Image URL:", url);
        
        // Use the Firestore instance to add a document
        await addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: new Date().toISOString(), // Use new Date() for current timestamp
        });
        
        history.push('/');
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <input
          className="input"
          type="text"
          id="fname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="Name"
        />
        
        <label htmlFor="category">Category</label>
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        />
        
        <label htmlFor="price">Price</label>
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
        />
        
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
