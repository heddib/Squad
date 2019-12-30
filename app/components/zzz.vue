<template>
    <Page>
        <ActionBar title="Squad"></ActionBar>

        <StackLayout>
            <Label class="body m-20" :text="message" textWrap="true"></Label>
            <Label textWrap="true" text="Make a research" class="h3 description-label align-center semi-bold" />
            <Button class="btn btn-primary" text="Déconnexion" @tap="logout"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import Login from "./Login";
    import LoginService from '@/services/LoginService';
    
    const loginService = new LoginService();

    import { getString } from 'tns-core-modules/application-settings';

    export default {
        data() {
            return {
                message: "Connexion réussie. Bienvenue, " + JSON.parse(getString('user')).firstname + " !"
            };
        },
        methods: {
            logout() {
                loginService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            toggleSearch() {
                this.$emit("togglesearch");
                console.log("CLICK");
            }
        }
    };
</script>

<style scoped>
    .searching {
        z-index: 100000;
    }

    .header {
        margin: 25 10 10;
        height: 30;
    }

    .footer {
        padding: 10 50 10;
        height: 50;
    }

    #view {
        vertical-align: center;
    }


    #app {
        z-index: 10;
    }

    #earth {
        z-index: 5;
        animation-name: bounceInOpacity;
        animation-duration: 1s;
        animation-delay: 0.5s;
    }

    #background {
        width: 100;
        height: 100;
        border-radius: 100%;
    }

    #background.secondary {
        background: linear-gradient(-45deg, #ff067F, #ff0154);
        animation-name: circle;
        animation-duration: 1s;
        animation-fill-mode: forwards;

    }

    @keyframes circle {
        from {
            transform: scale(0)
        }

        to {
            transform: scale(10)
        }
    }
</style>