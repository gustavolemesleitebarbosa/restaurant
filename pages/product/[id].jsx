import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import styles from '../../styles/Product.module.css'

const Product = ({ pizza }) => {

  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(pizza.prices[0])
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState([])
  const dispatch = useDispatch()
  console.log('pizza image', pizza.img)

  const changePrice =(number) => {
    setPrice(prevPrice =>prevPrice+number)
  }

  const handleSize = (sizeIndex) =>{
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange =(e,option) =>{
    const checked = e.target.checked
    if(checked){
      changePrice(option.price)
      setExtras(prevExtras=>[...prevExtras,option])
    }
    else{
      changePrice(-option.price)
      setExtras(extras.filter(extra =>extra._id !== option._id))
    }
  }
  
  const handleClick =() =>{
    dispatch(addProduct({...pizza, extras, price, quantity}))
    toast("Product added successfully")
  }

  return (<>
    <Toaster  />
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image style ={{ objectFit:"fit"}} src={pizza.img} fill alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}> Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size}>
            <Image src="/img/size.png" fill alt="" onClick={() => handleSize(2)} />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}> Choose additional ingredient</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (<div key={option._id} className={styles.option}>
            <input className={styles.checkbox} type='checkbox' id={option.text} onChange={(e)=>handleChange(e,option)}/>
            <label htmlFor={option.text}>{option.text}</label>
          </div>))}
        </div>
        <div className={styles.add}>
          <input onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}  />
          <button className={styles.button} onClick={handleClick} > Add to cart</button>
        </div>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`)
  return {
    props: {
      pizza: res.data
    }
  }
}

export default Product