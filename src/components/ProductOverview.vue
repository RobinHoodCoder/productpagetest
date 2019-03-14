<template>
    <div class="product-overview">
        <isotope ref="isotope" :options='options' :list="prods" v-images-loaded:on.progress="layout" class="row">
            <div v-for="(el,index) in  prods" :key="index" class="col-12 col-md-6 col-lg-4">
                <router-link class="div inherit" :title="el.name" :to="{name: 'ProductDetail', params: {id: el.slug}}">
                    <article class="card">
                        <div>
                            <div v-if="el.images" class="card-img-container">
                                <img class="card-img-top" :src="el.images[0].image" :alt="el.name">
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">{{el.name}}</h3>
                                <span @click.prevent="goToProduct(el.name)" class="btn btn-secondary">
                                    <i class="fas fa-info"></i>
                                </span>
                                <span class="btn btn-primary float-right">In winkelwagen</span>
                            </div>
                        </div>
                    </article>
                </router-link>
            </div>
        </isotope>
    </div>
</template>

<script>
	import isotope from 'vueisotope'
	import imagesLoaded from 'vue-images-loaded'
	import slugify from 'slugify'
	import db from '@/firebase/init'

	// const firebase = require('firebase')
    //
	// const axios = require('axios')


	// const getData = (url) => {
	//     return axios.get(url)
	//     .then((response) => {
	//         return response.data
	//     })
	// }



	// console.log(jsonProducts.products);

	export default {
		name: "ProductOverview",
		directives: {
			imagesLoaded
		},
		components: {
			isotope
		},
		data() {
			return {
				status: 'success',
				prods: [],
				productData :null,
				slug: null,
				loading: false,
				maxImg: 0,
				currentImg: 0,
				options: {
					layoutMode: 'masonry',
					masonry: {
						gutter: 0
					},
					columnWidth: 50,
					getSortData: {
						name: "name"
					}
				}
			}
		},
		methods: {
			goToProduct(id){
				let productSlug = slugify(id,{
					replacement: '',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				})
				this.$router.push({name: 'ProductDetail', params: {id: productSlug} })
            },
            layout (){
		        this.$refs.isotope.layout('masonry')
            }
		},
		mounted() {

			// axios.get('https://m2.experiusdemo.nl/products.json')
            // .then(response => {
            //
			// 	this.prods = Object.values(response.data.products)
			// })
			let ref = db.collection('products')
			ref.get().then((products => {
				console.log(products.docs)
				products.docs.forEach(doc => {
					console.log(doc.data())
                    if(doc.exists){
	                    this.prods.push(doc.data())
                    }

				})
			}))
		},
		created() {

		}




			// getData('https://m2.experiusdemo.nl/products.json').then(data => {
			//     console.log(data)
			//     prods = data
			// });

			// this.list.forEach(listItem => {
			// 	console.log(listItem.name)
			//     listItem.slug = 'ja'
			//
			//     let name = listItem.name
			//
			//     listItem.slug = slugify(name, {
			//         replacement: '-',
			//         remove: /[$*_+~.()'"!\-:@]/g,
			//         lower: true
			//     })
			// });

	}
</script>

<style lang="scss" scoped>



    /*.card-img-top {*/
    /*width: 100%;*/

    /*}*/

</style>