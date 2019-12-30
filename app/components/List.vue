<template>
    <StackLayout id="home">
        <Label textWrap="true" text="Liste des professionnels" class="h1 align-center extra-bold" />
    </StackLayout>
</template>

<script>
    
    export default {
        data() {
            return {
                
            };
        },

        methods: {
            
        }
    };
</script>

<style scoped>
    #home .hr {
        background: linear-gradient(-45deg, #ff067F, #ff0154);
        border-radius: 16px;
        margin-bottom: 25;
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

    #home .h1 {
        font-size: 40;
        margin-bottom: 25;
        opacity: 0;
        animation-name: fadeInDown;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

    #home .h2 {

        font-size: 18;
        margin-bottom: 25;
        opacity: 0;
        animation-name: fadeInUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        ;
        animation-delay: 0.5s;
    }

    #home.h1,
    #home .h2 {
        color: #545454;
    }

    #home .h3 {
        color: #DADADA;
    }

    #home .search-btn {
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 1s;
        margin-bottom: 25;
        margin-top: 25;
    }

    #home .search-btn .icon {
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 1.25s;
        z-index: 100000;
    }

    #home .search-btn .background {
        width: 100;
        height: 100;
        border-radius: 16;
        background: linear-gradient(-45deg, #ff067F, #ff0154);
    }

    #home .description-label {
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 1.5s;
        margin-bottom: 15;
    }
</style>