import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import cart from '../public/img/cart.png'
import logo from '../public/img/logo.png'
import phone from '../public/img/telephone.png'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src={phone} alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 239 348 123</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
        <Link href="/" >
          <li className={styles.listItem}>Homepage</li>
        </Link>
           <Link href={`/#order_online`} className={styles.listItem}>Order online</Link>
          <Image src={logo} alt ="" width="218" height="50"/>
          <Link href={`#footer`} className={styles.listItem}> Come to our units</Link>
          <Link href='/cart' className={styles.listItem}> Go to cart </Link>
        </ul>
      </div>
      <Link href="/cart" >
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src={cart} alt="" width="30" height="30" />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Navbar