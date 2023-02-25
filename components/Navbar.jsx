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
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src={logo} alt ="" width="160" height="69"/>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
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