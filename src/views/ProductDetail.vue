<template>
        <main class="product-detail">
            <div class="wrapper">
                <h1 class="product__name">{{product.name}}</h1>
                <section class="main-cols row">
                    <div class="col-12 col-sm-6">
                        <div class="content-box" >
                            <Lightbox :item="product"/>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div class="content-box">
                            <div class="price-box" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                                <div class="prices left-floated">
                                    <span :class="initialPriceClass(product)" class="price product__price-initial" data-initial-price="2499">{{product.price}}</span>
                                    <span v-if="product.special_price" class="price special-price product__price-special" itemprop="price" data-price="2299">{{product.special_price}}</span>
                                    <meta itemprop="priceCurrency" content="EUR"/>
                                </div>
                                <div class="delivery-usp available left-floated" :class="initialPriceClass(product)">
                                    <img src="@/assets/images/icons/check-circle.svg" alt="check icon">
                                    <span>Morgen in huis</span>
                                </div>
                                <div class="cleared"></div>
                            </div>
                            <AddToCartBtn :isLarge="true" :item="product"/>
                            <!--<button data-action="ADD_PRODUCT_TO_CART" class="button-purchase btn-large">In mijn winkelwagentje</button>-->
                            <span class="status-message warning">Nog {{product.qty}} op voorraad!</span>
                            <div class="usps-box">
                                <ul class="usp-list">
                                    <li>Gratis bezorging</li>
                                    <li>22:00 besteld = morgen in huis</li>
                                    <li>Altijd 2 jaar garantie</li>
                                    <li>30 dagen bedenktijd</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--<div class="cleared"></div>-->
                    <div class="col-12">
                        <div class="content-box">
                            <ul class="product-detail-navigation">
                                <li><a href="#products-related" v-smooth-scroll="{duration: 500}">Gerelateerd</a></li>
                                <li><a href="#product-info" v-smooth-scroll>Productinformatie</a></li>
                                <li class="cleared"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="content-box">
                            <aside>
                                <div id="products-related" class="related-products-box">
                                    <h2>Gerelateerd</h2>
                                    <div class="grid">
                                        <ul class="related-products-list">
                                            <li class="related-product-item" v-for="(relItem,index) in related" :key="index">
                                                <router-link :title="relItem.name" :to="relItem.slug">
                                                    <img :src="relItem.images[0].thumb" :alt="relItem.name">
                                                    <div class="related-product-text">
                                                        <span class="title">{{relItem.name}}</span>
                                                        <span :class="initialPriceClass(relItem)" class="price">{{relItem.price}}</span>
                                                        <span v-if="relItem.special_price" class="price special-price">{{relItem.special_price}}</span>
                                                    </div>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div class="cleared"></div>
                    <div id="product-info" class="col col-product-detail-info">
                        <div class="content-box">
                            <article class="product-detail-text">
                                <h2>Productinformatie</h2>
                                <h3>Omschrijving</h3>
                                <div v-html="product.description"></div>
                                <h2>Meer informatie</h2>
                                <div class="detail-table">
                                    <div class="row" v-if="product.brand">
                                        <div class="col-6">
                                            <span>Merk:</span>
                                        </div>
                                        <div class="col-6">
                                            <span>{{product.brand}}</span>
                                        </div>
                                    </div>
                                    <div class="row"  v-if="product.color">
                                        <div class="col-6">
                                            <span>Kleur:</span>
                                        </div>
                                        <div class="col-6">
                                            <span>{{product.color}}</span>
                                        </div>
                                    </div>
                                    <div class="row"  v-if="product.sku">
                                        <div class="col-6">
                                            <span>SKU:</span>
                                        </div>
                                        <div class="col-6">
                                            <span>{{product.sku}}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </main>
</template>

<script>
	import slugify from 'slugify'
	import firebase from 'firebase'
	import db from '@/firebase/init'
    import jsonProducts from '@/assets/json/product-db.json'
	import vueSmoothScroll from 'vue2-smooth-scroll'

	import AddToCartBtn from "@/components/Shop/AddToCartBtn"

    import Lightbox from '@/components/Lightbox'

    // import firebase from

	export default {


		name: "ProductDetail",
        directives:{
	        vueSmoothScroll
        },
		components: {
			AddToCartBtn,
			Lightbox
		},
        data(){
			return{
				product: {},
                related: []
            }
        },
        methods :{
	        initialPriceClass(item){
		        return {
			        'initial-price': item.special_price,
			        'single-price': !item.special_price}
	        },
	        goToProduct(id){
		        let productSlug = slugify(id,{
			        replacement: '',
			        remove: /[$*_+~.()'"!\-:@]/g,
			        lower: true
		        })
		        this.$router.push({name: 'ProductDetail', params: {id: productSlug} })
	        },
	        getRelated(relatedItems){
		        let ref = db.collection('products')
	        	this.related = []
	        	relatedItems.forEach((relItem) => {
			        ref.doc(relItem).get().then(doc => {
				        this.related.push(doc.data())
			        })
                })
	        },

            setProduct(slug){
	        	let ref = db.collection('products')
	            ref.where('slug','==',slug).get().then(snapshot => {
		            snapshot.forEach(doc => {
			            this.product = doc.data()
                        let relatedArray = doc.data().related
			            this.getRelated(relatedArray)
		            })
	            })
            },

        },
        created() {

        },
		watch: {
			'$route.params.id': function (id) {
				// this.product = ''
				this.setProduct(id)

			}
		},
        mounted() {
	        let ref = db.collection('products')

	        // console.log(jsonProducts.products)

	        let productJson = jsonProducts.products
	        // let productJson =  jsonProducts.products
            // console.log(productJson)
	        //Importeer alle producten van de json in firebase


            // uncomment

	        Object.keys(productJson).forEach(prodkey => {
		        let obj = productJson[prodkey];

		        let name = obj.name
		        let productSlug = slugify(name,{
			        replacement: '',
			        remove: /[$*_+~.()'"!\-:@]/g,
			        lower: true
		        })

		        //Als de product slug gelijk is aan die van één van de producten, dan is dat het product van deze pagina

                let newref = 'products?'+prodkey
                let cRef = db.collection(newref)

                cRef.get().then(snapshot => {
	                snapshot.forEach(doc =>{
	                	console.log('sss')
                    })

                })

                //console.log(cRef)

		        ref.doc(prodkey).get().then(doc => {

		        	// console.log(doc)

		        	// console.log(doc.data())

                    // Uncomment dit om nieuwe producten toe te voegen
			        if (doc.exists) {

			        } else {
				        db.collection('products').doc(prodkey).set({
					        sku: obj.sku,
                            slug: productSlug,
					        name: obj.name,
					        price: obj.price,
					        special_price: obj.special_price || null,
					        brand: obj.brand,
					        description: obj.description,
					        images: obj.images,
					        color: obj.color || null,
					        related: obj.related || null,
					        type: obj.type || null,
					        status: obj.status || null,
					        meta_description: obj.meta_description,
					        meta_title: obj.meta_title,
				        }).then()(
					        console.log('nieuw product toegevoegd!')
				        ).catch(err => {
					        console.error(err)
				        })
			        }
		        })
	        })

            //Pak de pagina die dezelfde slug heeft...
	        ref.where('related','==','').get().then(snapshot => {

            })


	        ref.where('slug','==',this.$route.params.id).get().then(snapshot => {
		        snapshot.forEach(doc => {
			        this.product = doc.data()

                    if (this.product.related){
	                    this.product.related.forEach(relatedID => {
		                    ref.doc(relatedID).get().then(doc => {
			                    this.related.push(doc.data())
		                    })
	                    })
                    }

			        // console.log(doc.data())

                })
            })


        }



			// axios.get('https://m2.experiusdemo.nl/products.json')
			// .then(response => {
			// 	let products = response.data.products
            //
			// 	Object.values(products).forEach(product => {
			// 		let productSlug = slugify(product.name,{
			// 			replacement: '',
			// 			remove: /[$*_+~.()'"!\-:@]/g,
			// 			lower: true
			// 		})
            //         if (productSlug == this.$route.params.id){
	        //             this.product = product
            //         }
            //
            //     })
            //
            //
			// })


	}
</script>

<style lang="scss" scoped>

</style>