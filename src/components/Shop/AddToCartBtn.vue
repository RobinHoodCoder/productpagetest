<template>
    <div>
        <button @click.prevent="addItemtoCart" :class="[ isLarge ? 'btn-large' : 'btn-small' ]" class="button-purchase">In mijn winkelwagentje</button>
        {{addedItems}}
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
			addItemtoCart(){
				let newItem = this.item
                let currItems = this.addedItems

                console.log(currItems)
                if(currItems){
                    this.addedItems.push(newItem)
	                this.$cookie.set("CartItems", newItem)
                }



            }
        },
        created() {
			console.log(this.$cookie);
			let value = this.addedItems



        }
    }
</script>

<style scoped>

</style>