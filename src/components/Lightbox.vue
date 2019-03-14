<template>
    <div class="lightbox">
        <div ref="galleryTop" class="swiper-container gallery-top" itemscope itemtype="http://schema.org/ImageGallery">
            <div class="swiper-wrapper photoswipe-gallery">
                <figure ref="topSlide" class="swiper-slide" v-for="(val, index) in item.images" :key="index">
                    <a title="Klik om te vergroten" itemprop="contentUrl" data-size="1024x768">
                        <img  itemprop="thumbnail" :src="val.image"
                              :alt="item.name">
                    </a>
                </figure>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        <div ref="galleryThumbs" class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
                <div class="swiper-slide" ref="thubSlide" v-for="(val, index) in item.images" :key="index">
                    <img :src="val.thumb" :alt="item.name">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import swiper from 'swiper'
	export default {
		name: 'Lightbox',
		props: {
            item: {}
        },

		data() {
			return {
				// slides: {},
				// virtualData: {
				// 	slides: [],
				// },
			}
		},
		mounted(){

			this.$watch('item', () => {

				console.log(this.item.images)

					const galleryThumbs = new swiper(this.$refs.galleryThumbs, {
						observer:true,

						slidesPerView: 'auto',
						freeMode: false,
						slides: this.$refs.ThumbSlide,
					})
					const galleryTop = new swiper(this.$refs.galleryTop, {
						spaceBetween: 10,
                        observer:true,
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						slides: this.$refs.topSlide,
						thumbs: {
							swiper: galleryThumbs
						},

                })

			});





			// const galleryTop = new swiper(self.$refs.galleryTop, {
			// 	spaceBetween: 10,
			// 	navigation: {
			// 		nextEl: ".swiper-button-next",
			// 		prevEl: ".swiper-button-prev",
			// 	},
			// 	thumbs: {
			// 		swiper: galleryThumbs
			// 	},
			// 	virtual: {
			// 		slides: self.slides,
			// 		renderExternal(data) {
			// 			// assign virtual slides data
			// 			self.virtualData = data;
			// 		},
			// 	},
			// })




			// const galleryTop = new swiper(this.$refs.galleryTop, {
			// 	spaceBetween: 10,
			// 	navigation: {
			// 		nextEl: ".swiper-button-next",
			// 		prevEl: ".swiper-button-prev",
			// 	},
			// 	thumbs: {
			// 		swiper: galleryThumbs
			// 	}
			// });


			// setTimeout(() => {
			// 	const galleryThumbs = new swiper(this.$refs.galleryThumbs, {
			// 		lazyLoad: true,
			// 		spaceBetween: 14,
			// 		slidesPerView: 3,
			// 		freeMode: true,
			// 		watchSlidesVisibility: true,
			// 		watchSlidesProgress: true,
			// 	})
			// 	const galleryTop = new swiper(this.$refs.galleryTop, {
			// 		spaceBetween: 10,
			// 		navigation: {
			// 			nextEl: ".swiper-button-next",
			// 			prevEl: ".swiper-button-prev",
			// 		},
			// 		thumbs: {
			// 			swiper: galleryThumbs
			// 		}
			// 	});
            //
			// },1000)

        }
    }
</script>
<style scoped>

</style>