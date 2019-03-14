<template>
    <header>
        <div class="wrapper">
            <nav>
                <ul>
                    <li class="logo">
                        <router-link :to="{name: 'Home'}">
                            <img alt="Logo PC Master Store" src="@/assets/images/pc-master-store-logo-w.svg">
                        </router-link>
                        <a href="#"></a>
                    </li>
                    <li class="login-btn">
                        <a href="#">Inloggen</a>
                    </li>

                    <li class="shopping-cart">
                        <ShoppingCart/>
                    </li>
                    <li class="cleared"></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
	import ShoppingCart from "@/components/Shop/ShoppingCart";
	export default {
		name: 'Navbar',
		components: {ShoppingCart},
		data() {
			return {
			}
		}
    }
</script>

<style scoped>

</style>