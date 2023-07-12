import React, { useEffect, useRef, useState } from "react";
import styles from './viewProfile.module.scss'
import { Button } from "react-bootstrap";
import { Center } from "@chakra-ui/react";
import {IoCloseSharp} from 'react-icons/io5'
const Edit = () => {

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
    const [skills, setSkills] = useState([])
    const fileInputRef = useRef(null);
    let file = '/user.png'
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handlePhotoUpload = (event) => {
        file = event.target.files[0];
        console.log(`/${file.name}`)
    };
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
  
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
    return (
        <div className={styles.profile}>
            <div className={styles.cardNoBg}>
                <div className={styles.space}>
                    <div className={styles.userInfoEdit}>
                        <img className={styles.image} src={`${file}`} />
                        <div className={styles.col}>
                            <div className={styles.title}>Profile Photo</div>
                            <div className={styles.location}>Upload your photo for others to get to know you better.</div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <Button className={styles.saveBtn} onClick={handleButtonClick}>Upload Your Photo</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.title}>Summary</div>
                <br />
                <textarea
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
                        type="phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                <br />
                <br />

                    <label className={styles.label}>Email</label>
                    <br />
                    

                    <input
                        placeholder="your email address"
                        className={styles.input}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
            {items.map((i) => (
              <div className={styles.allAdd}>
                <div className={styles.addGroup}>

                  {i}&nbsp;&nbsp;
                  <button
                    onClick={() => {
                      deleteItem(i);
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
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                    /></div>
                <br />
                <div className={styles.spaceevenly}>
                    <label className={styles.label}>Github</label>

                    <input
                        placeholder="github.com/username"
                        className={styles.input}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    /></div>
                <br />
                <div className={styles.spaceevenly}>
                    <label className={styles.label}>Stack Overflow</label>

                    <input
                        placeholder="stackoverflow.com/username"
                        className={styles.input}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    /></div>
                <br />
                <div className={styles.spaceevenly}>
                    <label className={styles.label}>Portfolio</label>

                    <input
                        placeholder="your personal website"
                        className={styles.input}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    /></div>

            </div>
            <div className={styles.btn}>
                <Button className={styles.saveBtn}>Save Changes</Button>
            </div>
        </div>
    )
}

export default Edit
