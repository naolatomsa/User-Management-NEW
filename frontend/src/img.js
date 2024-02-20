import React, { useEffect } from 'react';
import { useState } from 'react';

function IMG(props) {
  const [photoUrl, setPhotoUrl] = useState('');
    const imgName=props.imgName;
    const stylefro = props.stylefro
    const imageUrl = `http://127.0.0.1:8000/${imgName}`
    useEffect(() => {
      setPhotoUrl(imageUrl);
    }, []);

    const size=props.size;
  return (
    <>
    {
      imgName!=null? <img style={stylefro} src={photoUrl} width={size} height={size} className="card__image"/>:<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' width={size} height={size} className="card__image" alt='nopro'/>
    }
    
    </>
  );
}
export default IMG;
