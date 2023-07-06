const reviewList = {
    template: `
        <div class="review-container">
        <h3>Reviews:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} 
                <b v-if="review.recommend">recommended this product and</b>
                gave this {{ review.rating }} stars
                <br />
                "{{ review.review }}"
            </li>
        </ul>
        </div>
    `,
    props: {
        reviews: {
            type: Array
        }
    },
    setup(props) {
        const reviews = props.reviews
        return { reviews }
    }
}