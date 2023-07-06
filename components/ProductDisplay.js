// 9.7
const productDisplay = {
    template:
        /* html */
        `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :class="{ outOfStockImg: !inStock}"/>
            </div>
        </div>
    </div>

      
    <div class="product-info">
        <h1><a :href="toCAMT">{{title}}</a></h1>
        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock</p>
        <p v-else style="color: grey;">Out of stock</p>
        <p>Shipping: {{shipping}}</p>        
        <product-details :details="['50% cotton', '30% wool', '20% polyester']"></product-details>

        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
            {{variant.color}}
        </div>
        <div v-for="size in sizes" :key="size.id">
            {{size.name}}
        </div>
    </div>

    <div>
    <button class="button" @click="updateStock">
        Update stock
    </button>

    <button class="button" :disabled='!inStock' @click="addToCart" :class="{ disabledButton: !inStock}" >add to cart</button>
    <button class="button" :disabled='!inStock' @click="removeFromCart" :class="{ disabledButton: !inStock}" >remove from cart</button>
    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>

    `,
    props: {
        premium: Boolean
    },
    setup(props, { emit }) {
        const product = ref("Boots");
        const brand = ref("SE331");
        const isOnSale = ref(true);
        const inStock = ref(true);
        const premium = ref(true);
        const toCAMT = ref('https://www.camt.cmu.ac.th');
        const reviews = ref([])
        const variants = ref([
            {
                id: 2234,
                color: "green",
                image: "./assets/images/socks_green.jpg",
                quantity: 50,
            },
            {
                id: 2235,
                color: "blue",
                image: "./assets/images/socks_blue.jpg",
                quantity: 0,
            },
        ]);
        const sizes = ref([
            { id: 0, name: "S" },
            { id: 1, name: "M" },
            { id: 2, name: "L" }
        ])
        const selectedVariant = ref(0);
        
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id);
        }

        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id);
        }

        function updateImage(variantImage) {
            image.value = variantImage;
        }

        function updateVariant(index) {
            selectedVariant.value = index;
        }

        const image = computed(() => {
            return variants.value[selectedVariant.value].image;
        });
        const inventory = computed(() => {
            const qty = variants.value[selectedVariant.value].quantity;
            if (qty > 0) {
                inStock.value = true;
            } else {
                inStock.value = false;
            }
            return qty;
        });

        const title = computed(() => {
            if (isOnSale.value) {
                return brand.value + "  " + product.value + " is on sale";
            }
            return brand.value + "  " + product.value;
        });

        const shipping = computed(() => {
            if (props.premium) {
                return 'Free';
            }
            return '30';
        });

        const updateStock = () => {
            if (!inStock.value) {
                variants.value[selectedVariant.value].quantity = 50;
                inStock.value = true;
            } else {
                variants.value[selectedVariant.value].quantity = 0;
                inStock.value = false;
            }
        }
        
        function addReview(review){
            console.log(review)
            reviews.value.push(review)
        }

        return {
            title,
            image,
            inventory,
            variants,
            inStock,
            shipping,
            premium,
            toCAMT,
            sizes,
            reviews,
            addToCart,
            updateImage,
            updateVariant,
            updateStock,
            removeFromCart,
            addReview
        };
    },
};