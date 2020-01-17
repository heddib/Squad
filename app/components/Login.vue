<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/NativeScript-Vue.png"></Image>
        <Label class="header" text="Squad"></Label>

        <GridLayout rows="auto, auto, auto" v-show="isLoggingIn">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Nom d'utilisateur"
              :isEnabled="!processing"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.username"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Mot de passe"
              secure="true"
              v-model="user.password"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="2" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <GridLayout rows="auto, auto, auto" v-show="!isLoggingIn && step == 1">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Nom d'utilisateur"
              :isEnabled="!processing"
              keyboardType="text"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.username"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Mot de passe"
              secure="true"
              v-model="user.password"
              returnKeyType="next"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirmation mot de passe"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
        </GridLayout>

        <GridLayout rows="auto, auto, auto" v-show="!isLoggingIn && step == 2">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              ref="firstname"
              :isEnabled="!processing"
              hint="Prénom"
              v-model="user.firstname"
              returnKeyType="next"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="lastname"
              :isEnabled="!processing"
              hint="Nom"
              v-model="user.lastname"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
        </GridLayout>

        <GridLayout rows="auto, auto, auto" v-show="!isLoggingIn && step == 3">
          <StackLayout row="0" class="input-field">
            <Label class="header" text="Votre email ?" />
            <TextField
              class="input"
              ref="email"
              :isEnabled="!processing"
              hint="Email"
              v-model="user.email"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
        </GridLayout>

        <GridLayout rows="auto, auto, auto" v-show="!isLoggingIn && step == 4">
          <StackLayout row="0" class="input-field">
            <Label class="header" text="Vous êtes ?" />
            <ListPicker
              ref="type"
              :isEnabled="!processing"
              v-model="user.type"
              :items="types"
              :selectedIndex="user.type"
              returnKeyType="done"
            ></ListPicker>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <ActivityIndicator rowSpan="1" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          v-show="isLoggingIn"
          text="Se connecter"
          :isEnabled="!processing"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label
          v-show="isLoggingIn"
          text="Mot de passe oublié ?"
          class="login-label"
          @tap="forgotPassword()"
        ></Label>
        <FlexboxLayout v-show="!isLoggingIn" width="100%">
          <Button
            v-show="!isLoggingIn && step > 1"
            text="Retour"
            width="100%"
            :isEnabled="!processing"
            @tap="prevStep"
            class="btn btn-primary m-t-20"
          ></Button>
          <Button
            v-show="!isLoggingIn"
            :text="step == steps ? 'S\'inscrire' : 'Suivant'"
            width="100%"
            :isEnabled="!processing"
            @tap="step == steps ? submit() : nextStep()"
            class="btn btn-primary m-t-20"
          ></Button>
        </FlexboxLayout>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span
            :text="
              isLoggingIn
                ? 'Vous n\'avez pas de compte ? '
                : 'Retour à la page de connexion'
            "
          ></Span>
          <Span :text="isLoggingIn ? 'S\'inscrire' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import App from "./App";
import LoginService from "@/services/LoginService";

const loginService = new LoginService();

export default {
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstname: "",
        lastname: "",
        type: 0,
      },
      step: 1,
      steps: 4,
      types: ["Étudiant", "Professionnel"]
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      this.processing = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    nextStep() {
      if (this.step < this.steps) this.step++;
    },

    prevStep() {
      if (this.step > 1) this.step--;
    },

    login() {
      if (!this.user.username || !this.user.password) {
        this.alert(
          "Merci de renseigner un nom d'utilisateur et un mot de passe."
        );
        this.processing = false;
        return;
      }
      loginService
        .login(this.user)
        .then(() => {
          this.processing = false;
          this.$navigateTo(App, { clearHistory: true });
        })
        .catch(() => {
          this.processing = false;
          this.alert("Compte introuvable.");
        });
    },

    isEmpty(obj) {
      let keys = [];
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) keys.push(key);
      }
      console.log("Total errors : " + keys.length);
      return keys;
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Les mots de passe ne correspondent pas.");
        this.processing = false;
        return;
      }

      if (this.isEmpty(this.user).length > 0) {
        this.alert("Certains champs ne sont pas remplis.");
        this.processing = false;
        return;
      }

      loginService
        .register(this.user)
        .then(() => {
          loginService
            .login(this.user)
            .then(() => {
              this.processing = false;
              this.$navigateTo(App, { clearHistory: true });
            })
            .catch(() => {
              this.processing = false;
              this.alert("Erreur lors de la connexion au compte.");
            });
        })
        .catch(() => {
          this.processing = false;
          this.alert(
            "Impossible de créer un compte. \nVérifiez tous les champs ou changer de pseudo."
          );
        });
    },

    forgotPassword() {
      prompt({
        title: "Récupération de mot de passe",
        message:
          "Merci de renseigner votre email avec laquelle vous vous êtes inscrit.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Annuler"
      }).then(data => {
        if (data.result) {
          loginService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Votre mot de passe a été reset avec succès. Veuillez vérifier votre boîte mail."
              );
            })
            .catch(() => {
              this.alert("Impossible de reset votre mot de passe.");
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
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
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
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}

.picker {
  background-color: blanchedalmond;
  color: red;
  border-color: brown;
  border-radius: 20;
  border-width: 2;
  width: 200;
  height: 100;
  vertical-align: middle;
}
</style>
