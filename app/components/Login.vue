<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/assets/images/NativeScript-Vue.png"></Image>
                <Label class="header" text="Squad"></Label>

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField class="input" hint="Nom d'utilisateur" :isEnabled="!processing"
                            keyboardType="text" autocorrect="false"
                            autocapitalizationType="none" v-model="user.username"
                            returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="Mot de passe" secure="true" v-model="user.password"
                            :returnKeyType="isLoggingIn ? 'done' : 'next'"
                            @returnPress="focusConfirmPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
                        <TextField class="input" ref="confirmPassword" :isEnabled="!processing"
                            hint="Confirmation mot de passe" secure="true" v-model="user.confirmPassword"
                            returnKeyType="done"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button :text="isLoggingIn ? 'Se connecter' : 'S\'inscrire'" :isEnabled="!processing"
                    @tap="submit" class="btn btn-primary m-t-20"></Button>
                <Label *v-show="isLoggingIn" text="Mot de passe oublié ?"
                    class="login-label" @tap="forgotPassword()"></Label>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Vous n\'avez pas de compte ? ' : 'Retour à la page de connexion'"></Span>
                    <Span :text="isLoggingIn ? 'S\'inscrire' : ''" class="bold"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    import LoginService from '@/services/LoginService';
    
    const loginService = new LoginService();

    export default {
        data() {
            return {
                isLoggingIn: true,
                processing: false,
                user: {
                    username: "test",
                    password: "test",
                    confirmPassword: "test"
                }
            };
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },

            submit() {
                if (!this.user.username || !this.user.password) {
                    this.alert(
                        "Merci de renseigner une adresse email et un mot de passe."
                    );
                    return;
                }

                this.processing = true;
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            login() {
                loginService
                    .login(this.user)
                    .then(() => {
                        this.processing = false;
                        this.$navigateTo(Home, { clearHistory: true });
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Compte introuvable."
                        );
                    });
            },

            register() {
                if (this.user.password != this.user.confirmPassword) {
                    this.alert("Les mots de passe ne correspondent pas.");
                    this.processing = false;
                    return;
                }

                this.$loginService
                    .register(this.user)
                    .then(() => {
                        this.processing = false;
                        this.alert(
                            "Votre compte a été crée.");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Impossible de créer un compte."
                        );
                    });
            },

            forgotPassword() {
                prompt({
                    title: "Récupération de mot de passe",
                    message: "Merci de renseigner votre email avec laquelle vous vous êtes inscrit.",
                    inputType: "email",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Annuler"
                }).then(data => {
                    if (data.result) {
                        this.$loginService
                            .resetPassword(data.text.trim())
                            .then(() => {
                                this.alert(
                                    "Votre mot de passe a été reset avec succès. Veuillez vérifier votre boîte mail."
                                );
                            })
                            .catch(() => {
                                this.alert(
                                    "Impossible de reset votre mot de passe."
                                );
                            });
                    }
                });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "Squad",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #D51A1A;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input:disabled {
        background-color: white;
        opacity: 0.5;
    }

    .btn-primary {
        margin: 30 5 15 5;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
