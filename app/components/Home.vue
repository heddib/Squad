<template>
    <Page>
        <ActionBar title="Squad"></ActionBar>

        <StackLayout>
            <Label class="body m-20" :text="message" textWrap="true"></Label>
            <Button class="btn btn-primary" text="Déconnexion" @tap="logout"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import Login from "./Login";
    import LoginService from '@/services/LoginService';
    
    const loginService = new LoginService();

    export default {
        data() {
            return {
                message: "Connexion réussie."
            };
        },
        methods: {
            logout() {
                loginService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style>
</style>