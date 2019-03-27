<template>
    <div>
        <a class="open-cart" href="#" @click.prevent="showCart">
            <img alt="Winkelwagen" src="@/assets/images/icons/shopping-cart.svg">
            <div class="cart-amount">
                <span class="cart-items-amount"></span>
            </div>
        </a>
        <div class="fixed-container">
            <div ref="overlay" @click.prevent="showCart" class="overlay"></div>
            <div ref="shoppingCartContent" class="shopping-cart-container">
                <div class="wrapper">
                    <div class="shopping-cart-header">
                        <h2>Producten in winkelwagentje</h2>


                    </div>
                </div>
                <div class="wrapper">
                    <div class="cart-items">
                        <!--{{cartItems}}-->
                        <div  v-for="(product,index) in completeProducts" :key="index" class="cart__item">
                            <img class="cart__item__image" :src="product.images[0].thumb" :alt="product.name">
                            <div class="cart__item__left">
                                <h3 class="cart__item__name">{{product.name}}</h3>
                                <div class="control-buttons">
                                    <button class="cart__item__decrease btn-mini" @click="decreaseAmount(product)" data-action="DECREASE_ITEM">&minus;</button>
                                    <span class="cart__item__quantity">{{getAmount(product)}}</span>
                                    <button class="cart__item__increase" @click="increaseAmount(product)">&plus;</button>
                                </div>
                            </div>
                            <div class="cleared"></div>
                            <div class="cart__item__right">
                                <span class="cart__item__price-initial">{{product.price}}</span>
                                <span v-if="product.special_price" class="cart__item__price">{{product.special_price}}</span>
                                <button class="cart__item__delete" data-action="REMOVE_ITEM">&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import db from '@/firebase/init'
	export default {
		name: 'ShoppingCart',
		data() {
			return {
				completeProducts: [],
				cartItems: [],
			}
		},
        methods: {
			getAmount(product){
				let cookieItems = this.$cookies.get('cart').products
				cookieItems.forEach((cvalue) => {
					if (cvalue.sku == product.sku){
						product.amount = cvalue.amount
					}
				})
				return product.amount
            },
			showCart(){
				let cookieItems = this.$cookies.get('cart').products
				this.cartItems = cookieItems
                const shoppingCartDOM = this.$refs.shoppingCartContent
                const overlayDOM = this.$refs.overlay

				shoppingCartDOM.classList.toggle('visible')
				overlayDOM.classList.toggle('visible')
            },
            getCookieProduct(product){
	            let cookieItems = this.$cookies.get('cart').products

	            cookieItems.forEach((cvalue) => {
		            if (cvalue.sku == product.sku){
			            product = cvalue
			            product.amount = cvalue.amount
		            }
	            })
	            return product
            },
            saveToCart(clickedItem){
				// console.log(clickedItem)
                console.log(clickedItem.amount)
				let toFilter = clickedItem
                let newCookieProduct = this.getCookieProduct(clickedItem)

	            newCookieProduct.amount = clickedItem.amount

                console.log(newCookieProduct)

	            let notCurr = this.$cookies.get('cart').products.filter((item) => {
		            return item.sku !== toFilter.sku;
	            })
                let allProds = notCurr;
	            allProds.push(newCookieProduct)
                let prodsObject = {
	            	products: allProds
                }

                // console.log(notCurr)
	            this.$cookies.set('cart',prodsObject)
            },
	        increaseAmount(clickedItem){
				clickedItem.amount++
                this.saveToCart(clickedItem)
                this.getAmount(clickedItem)
            },decreaseAmount(clickedItem){
		        clickedItem.amount--
                if (clickedItem.amount < 1 ){

                }

		        this.saveToCart(clickedItem)
		        this.getAmount(clickedItem)
	        }

        },
        created() {
	        if (this.$cookies.isKey("cart") == false){
		        let cartContent = {
			        products : []
		        }
		        this.$cookies.set('cart',cartContent)
            }else{
		        console.log(this.$cookies.get("cart"))
            }

		},
        mounted(){
	        let ref = db.collection('products')
            let cookieItems = this.$cookies.get('cart').products;



            // Haal de winkelwagen producten van de cookie op uit firebase
	        ref.get().then((products => {
		        products.docs.forEach(doc => {
			        // console.log(doc.data())
			        if(doc.exists){
				        cookieItems.forEach((value) =>{
					        if (doc.data().sku == value.sku){
						        this.completeProducts.push(doc.data())
					        }
				        })
			        }

		        })
	        }))
        }
	}
</script>

<style scoped>

</style>