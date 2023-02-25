import Image from 'next/image'
import React, { useState } from 'react'
import arrowl from '../public/img/arrowl.png'
import arrowr from '../public/img/arrowr.png'
import styles from '../styles/Featured.module.css'



const Featured = () => {

  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png"
  ]
  const [index, setIndex] = useState(0)
  const handleArrow = (direction) =>{
    if(direction === 'left'){
      setIndex(index!== 0? index - 1: images.length-1)
    }
    else if(direction === 'right'){
      setIndex(index!== images.length-1 ?index + 1: 0)
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer}  style={{left:0}} >
          <Image src={arrowl} alt="arrow left" fill  onClick={()=>handleArrow('left')} />
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}} >
          {images.map((image, index) => 
          ( <div className={styles.imgContainer} key={index}> <div className={styles.imgContainerMobile} ><Image  src={image} alt="" fill style={{objectFit:'contain'}} /> </div></div>  ))}
        </div>
        <div className={styles.arrowContainer} style={{right:0}}>
          <Image src={arrowr} alt="arrow right" onClick={()=>handleArrow('right')} fill />
        </div>
    </div>
  )
}

export default Featured