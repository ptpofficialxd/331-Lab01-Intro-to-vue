const productDetails = {
    template: `
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
    `,
    props: {
        details: Array
    },
    setup(props) {
        const details = ref(props.details)
        return { details }
    }
}