import React, { useEffect, useRef, useState } from "react";
import styles from './viewProfile.module.scss'
import { Button } from "react-bootstrap";
import { IoCloseSharp } from 'react-icons/io5'
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Edit = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem('uid')
  const { user, upload } = useAuth()
  const [summary, setSummary] = useState()
  const [image, setImage] = useState()
  const [username, setUsername] = useState()
  const [job, setJob] = useState()
  const [country, setCountry] = useState()
  const [linked, setLinked] = useState()
  const [github, setGithub] = useState()
  const [stack, setStack] = useState()
  const [portfolio, setPortfolio] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [imageStatus, setImageStatus] = useState('nothing')
  const [photoURL, setPhotoURL] = useState('https://imgtr.ee/image/UWQIm')
  const [err, setErr] = useState('loading')
  const fileInputRef = useRef(null);



  const showPhoto = async (uid) => {
    const storageRef = ref(storage, `${uid}.png`);

    try {
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      setPhotoURL(downloadURL)
      console.log(photoURL)

    } catch (error) {
      console.error("Error retrieving download URL:", error);
    }
  };
  const handleButtonClick = async () => {
    if (image && id) {
      setImageStatus('loading')
      await upload(id, image);
      await showPhoto(id);
    }
    setImageStatus('nothing')

  };

  const handlePhotoUpload = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      console.log(image)
    }

  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newItem.trim()) {
        setItems([...items, newItem]);
        setNewItem('');
      }
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const handleChange = (event) => {
    setNewItem(event.target.value);
  };


  const showDataById = async (userId) => {
    const userRef = doc(db, "users", userId);
    console.log(userRef)

    try {
      const docSnapshot = await getDoc(userRef);
      console.log(docSnapshot)
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        setUsername(data.displayName)
        setEmail(data.email)
        setPhone(data.phone)
        setSummary(data.summary)
        setItems(data.skills)
        setLinked(data.linkedin)
        setGithub(data.github)
        setStack(data.stackoverflow)
        setPortfolio(data.portfolio)
        setCountry(data.country)
        setJob(data.job)
        setPhotoURL(data.image)


      } else {
        console.log("Document does not exist");
      }
    }
    catch (error) {
      console.error("Error retrieving documents:", error);
    }
  };

  const updateDataById = async (userId, updatedData) => {
    const userRef = doc(db, "users", userId);

    try {
      await updateDoc(userRef, updatedData);
      console.log("Document updated successfully!");
      setErr('success')
    } catch (error) {
      console.error("Error updating document:", error);
      setErr('error')
    }
  };


  useEffect(() => {
    showDataById(id);
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.cardNoBg}>
        <div className={styles.space}>
          <div className={styles.userInfoEdit}>
          {photoURL ? <img className={styles.image} src={photoURL} /> : <img className={styles.image} src="https://imgtr.ee/image/UWQIm" />}
            <div className={styles.col}>
              <div className={styles.title}>Profile Photo</div>
              <div className={styles.location}>Upload your photo for others to get to know you better.</div>
              
              <input
                type="file"
                onChange={(e) => handlePhotoUpload(e)}
                accept="image/*"
              />
              {console.log(imageStatus)}
              {imageStatus === 'nothing' ? <Button className={styles.saveBtn} onClick={handleButtonClick}>Upload Your Photo</Button> : imageStatus === 'loading' ? <Button disabled={true} className={styles.saveBtn} onClick={handleButtonClick}>Loading</Button> : <Button className={styles.saveBtn} onClick={handleButtonClick}>Upload Your Photo</Button> }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>General Info</div>
        <br />
        <label className={styles.label}>Username</label>
        <br />

        <input
          placeholder="your name"
          className={styles.input}
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label className={styles.label}>Job Title</label>
        <br />

        <input
          placeholder="your job title"
          className={styles.input}
          value={job}
          type="text"
          onChange={(e) => setJob(e.target.value)}
        />
        <br />
        <br />

        <label className={styles.label}>Country</label>
        <br />

        <input
          placeholder="your country/city"
          className={styles.input}
          value={country}
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />

      </div>
      <div className={styles.card}>
        <div className={styles.title}>Summary</div>
        <br />
        <textarea
          value={summary}
          className={styles.summaryInput}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>

      </div>
      <div className={styles.card}>
        <div className={styles.title}>Contact Info</div>
        <br />

        <label className={styles.label}>Mobile Number</label>
        <br />

        <input
          placeholder="your mobile number"
          className={styles.input}
          value={phone}
          type="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />

      </div>

      <div className={styles.card}>
        <div className={styles.title}>Skills and Tools</div>
        <br />
        <input
          className={styles.skills}
          type="text"
          placeholder="Press enter after typing each skill"
          value={newItem}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />

        <br />
        <br />

        <div className={styles.body}>
          {items.map((item, index) => (
            <div className={styles.allAdd}>
              <div className={styles.addGroup}>

                {item}&nbsp;&nbsp;
                <button
                  onClick={() => {
                    deleteItem(index);
                  }}
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className={styles.card}>
        <div className={styles.title}>Online Presense</div>
        <br />
        <div className={styles.spaceevenly}>
          <label className={styles.label}>Linkedin</label>

          <input
            placeholder="linkedin.com/in/username"
            className={styles.input}
            value={linked}
            type="text"
            onChange={(e) => setLinked(e.target.value)}
          /></div>
        <br />
        <div className={styles.spaceevenly}>
          <label className={styles.label}>Github</label>

          <input
            value={github}
            placeholder="github.com/username"
            className={styles.input}
            type="text"
            onChange={(e) => setGithub(e.target.value)}
          /></div>
        <br />
        <div className={styles.spaceevenly}>
          <label className={styles.label}>Stack Overflow</label>

          <input
            value={stack}
            placeholder="stackoverflow.com/username"
            className={styles.input}
            type="text"
            onChange={(e) => setStack(e.target.value)}
          /></div>
        <br />
        <div className={styles.spaceevenly}>
          <label className={styles.label}>Portfolio</label>

          <input
            value={portfolio}
            placeholder="your personal website"
            className={styles.input}
            type="text"
            onChange={(e) => setPortfolio(e.target.value)}
          /></div>

      </div>

      <div className={styles.btn}>
          <Button onClick={() => updateDataById(id, { displayName: username, summary: summary, linkedin: linked, skills: items, linkedin: linked, github: github, stackoverflow: stack, portfolio: portfolio, phone: phone, country: country, job: job, image: photoURL })} className={styles.saveBtn}>Save Changes</Button>
         </div>
         {err==='loading' ? "" : err==='success' ?  navigate(`/profile/${id}`) : "error"}
    </div>
  )
}

export default Edit
