import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'


const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        THE BEST PIZZA IN TOWN
      </h1>
      <p className={styles.desc}>
      Welcome to Gustavo Dev Pizza Shop, where we serve the tastiest and freshest pizzas in town! Our handcrafted pizzas are made with the finest ingredients, from our homemade tomato sauce to our freshly grated mozzarella cheese. Each pizza is baked to perfection in our wood-fired oven, creating a crispy crust that perfectly complements our flavorful toppings.
      <br/> <br/>So what are you waiting for? Come and visit <b>Gustavo Dev Pizza Shop today </b>, and taste the difference in every slice. Or Just click on a pizza bellow to start ordering online!
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza)=>(<PizzaCard key={pizza._id} pizza={pizza}/>))}
      </div>
    </div>
  )
}

export default PizzaList