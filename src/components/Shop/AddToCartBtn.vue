<template>
    <div>
        <button @click.prevent="addItemtoCart" :class="[ isLarge ? 'btn-large' : 'btn-small' ]" class="button-purchase">In mijn winkelwagentje</button>
        <!--{{addedItems}}-->
    </div>
</template>

<script>
	export default {
		name: 'AddToCartBtn',
        props: {
			item: Object,
            isLarge: Boolean,
        },
		data() {
			return {
				addedItems: []
			}
		},
        methods: {
			increaseItem(item){
				let amount = item.amount++
                return amount
            },
			addItemtoCart(){
				//Pak de huidige cookie...

				// this.$cookies.remove('cart')

				// this.$cookies.remove('cart')
                if (this.$cookies.isKey('cart')) {

	                //Maak product object aan obv aangeklikte product..
	                let newItem = {name: this.item.name, sku: this.item.sku, amount: 1}

	                //Test of het aangeklikte product al in het winkelmandje zit en geef dit product terug...
	                let testCurr = this.$cookies.get('cart').products.filter((item) => {
		                return item.sku == newItem.sku;
	                })

	                //aLS PRODUCT AL BESTAAT IN WINKELWAGEN... voeg dan een extra item toe
	                if (testCurr.length > 0) {
		                this.increaseItem(testCurr[0]);
		                newItem = testCurr[0];
	                }

	                //Deze producten zijn niet aangeklikt... dus de andere items in de winkelwagen
	                let notCurr = this.$cookies.get('cart').products.filter((item) => {
		                return newItem.sku !== item.sku;
	                })

	                //Zet de andere producten in een array met het aangeklikte product
	                let updatedCart = [];
	                if (notCurr.length > 0) {
		                notCurr.push(newItem);
		                updatedCart = notCurr;
	                } else {
		                updatedCart.push(newItem)
	                }
	                let cartObject = {
	                	products: updatedCart
                    }

	                this.$cookies.set('cart', cartObject)

                    console.log(this.$cookies.get('cart'));

                }


            }
        },
        created() {




        }
    }
</script>

<style scoped>

</style>