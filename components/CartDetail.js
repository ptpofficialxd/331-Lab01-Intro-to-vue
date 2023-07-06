const cartDetail = {
    template:
        `
    <div class="cart">Cart
        <ul>
            <li>Green: {{greenCount}}</li>
            <li>Blue: {{blueCount}}</li>
        </ul>
    </div>
    `,
    props : {
        cart: Array
    },
    setup(props){
        const cart = ref(props.cart);
        const greenCount = computed( () => {
            return cart.value.filter( (id) => id === 2234 ).length
        });
        const blueCount = computed( () => {
            return cart.value.filter( (id) => id === 2235 ).length
        });
        return {
            greenCount, blueCount
        }
    }
}