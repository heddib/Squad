<template>
    <StackLayout id="home">
        <Label textWrap="true" :text="message" class="h1 align-center extra-bold" />
        <Button width="30" height="5" class="hr" />
        <Label textWrap="true" text="Quel métier t'intéresse ?"
            class="h2 align-center bold" />
        <AbsoluteLayout width="80" height="80" class="search-btn" @tap="toggleSearch">
            <Image src="~/assets/icons/Search-White.png" left="28" top="25" width="25"
                height="25" class="icon" />
            <Button class="background" left="0" top="0" width="100%" height="100%"
                @tap="toggleSearch" />
        </AbsoluteLayout>

        <Label textWrap="true" text="Fais une recherche" class="h3 description-label align-center semi-bold" />
    </StackLayout>
</template>

<script>
    import { getString } from 'tns-core-modules/application-settings';
    export default {
        data() {
            return {
                message: "Bonjour, " + JSON.parse(getString('user')).firstname
            };
        },

        methods: {
            toggleSearch() {
                this.$emit("togglesearch");
                console.log("CLICK");
            }
        }
    };
</script>

<style scoped>
    #home .hr {
        background: linear-gradient(-45deg, #067aff, #0178ff);
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
        background: linear-gradient(-45deg, #067aff, #0178ff);
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