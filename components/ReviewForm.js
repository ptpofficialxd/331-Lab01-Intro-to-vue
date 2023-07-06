// 11
const reviewForm = {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>
            <label for="name">Name:</label>
            <input id="name" v-model="form.name">

            <label for="review">Review:</label>
            <textarea id="review" v-model="form.review"></textarea>

            <div class="row">
                <input class="input-checkbox" type="checkbox" id="recommend" v-model="form.recommend" />
                <label class="checkbox-label" for="recommend">Would you like to recommend this product</label>
            </div>
            
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="form.rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <input class="button" type="submit" value="Submit" />
        </form>
    `,
    setup(props, { emit }) {
        const form = reactive({
            name: '',
            review: '',
            rating: null,
            recommend: true 
        });
        console.log(form)

        function onSubmit() {
            // if (!form.name || !form.review || !form.rating) {
            //     alert('Review is incomplete, Please fill every field.');
            //     return;
            // }
            const productReview = {
                name: form.name,
                review: form.review,
                rating: form.rating,
                recommend: form.recommend
            }
            emit('review-submitted', productReview)
            form.name = ''
            form.review = ''
            form.rating = null
        }

        
        return { form, onSubmit }
    }
}