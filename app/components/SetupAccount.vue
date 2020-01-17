<template>
  <StackLayout>
    <StackLayout id="setup" v-if="step == 0">
      <Label
        textWrap="true"
        :text="message"
        class="h1 align-center extra-bold"
      />
      <Button width="30" height="5" class="hr" />
      <Label
        textWrap="true"
        text="Configuration du compte"
        class="h2 align-center bold"
      />
      <Label
        textWrap="true"
        :text="config"
        class="h3 description-label align-center semi-bold"
      />
      <AbsoluteLayout width="80" height="80" class="next-btn" @tap="nextStep()">
        <Image
          src="~/assets/icons/right-arrow.png"
          left="28"
          top="25"
          width="25"
          height="25"
          class="icon"
        />
        <Button
          class="background"
          left="0"
          top="0"
          width="100%"
          height="100%"
          @tap="nextStep()"
        />
      </AbsoluteLayout>
    </StackLayout>
    <transition v-if="step == 1">
      <StackLayout class="step" v-if="step == 1">
        <Label
          textWrap="true"
          text="Configuration"
          class="h1 align-center extra-bold"
        />
        <Button width="30" height="5" class="hr" />
        <Label
          textWrap="true"
          text="Quand es-tu né ?"
          class="h2 align-center bold"
        />
        <DatePickerField
          padding="16"
          borderRadius="16"
          backgroundColor="#ffffff"
          borderWidth="3px"
          borderColor="#504848"
          width="300"
          class="input extra-bold input-container"
          hint="Choisir une date"
          locale="fr_FR"
          pickerCancelText="Annuler"
          pickerTitle="Date de naissance"
          ref="datepicker"
          @dateChange="onDateChange"
        ></DatePickerField>
        <AbsoluteLayout
          width="80"
          height="80"
          class="next-btn"
          @tap="nextStep()"
        >
          <Image
            src="~/assets/icons/right-arrow.png"
            left="28"
            top="25"
            width="25"
            height="25"
            class="icon"
          />
          <Button
            class="background"
            left="0"
            top="0"
            width="100%"
            height="100%"
            @tap="nextStep()"
          />
        </AbsoluteLayout>
      </StackLayout>
    </transition>
    <transition v-if="step == 2">
      <StackLayout class="step" v-if="step == 2">
        <Label
          textWrap="true"
          text="Configuration"
          class="h1 align-center extra-bold"
        />
        <Button width="30" height="5" class="hr" />
        <Label
          textWrap="true"
          text="D'où viens-tu ?"
          class="h2 align-center bold"
        />
        <TextView
          padding="16"
          borderRadius="16"
          backgroundColor="#ffffff"
          borderWidth="3px"
          borderColor="#504848"
          width="300"
          class="input extra-bold input-container"
          hint="Ex : Paris, France"
          ref="location"
        ></TextView>
        <AbsoluteLayout
          width="80"
          height="80"
          class="next-btn"
          @tap="nextStep()"
        >
          <Image
            src="~/assets/icons/right-arrow.png"
            left="28"
            top="25"
            width="25"
            height="25"
            class="icon"
          />
          <Button
            class="background"
            left="0"
            top="0"
            width="100%"
            height="100%"
            @tap="nextStep()"
          />
        </AbsoluteLayout>
      </StackLayout>
    </transition>
  </StackLayout>
</template>

<script>
import { getString } from "tns-core-modules/application-settings";
export default {
  data() {
    return {
      message: "Bienvenue, " + JSON.parse(getString("user")).firstname,
      config:
        "Pour terminer la création du compte, \nnous avons besoin de quelques informations \npour votre profil Squad.",
      step: 0,
      steps: 2,
      date: "",
      location: ""
    };
  },

  methods: {
    onDateChange(args) {
      this.date = this.getFormattedDate(args.value);
    },
    getFormattedDate(date) {
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();
      return y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
    },
    nextStep() {
      if (this.step == 1) {
        if (this.date == "") {
          this.$refs.datepicker.nativeView.borderColor = "red";
          return;
        }
      } else if (this.step == 2) {
        if (this.location == "") {
          this.$refs.location.nativeView.borderColor = "red";
          return;
        }
      }

      console.log("STEP : " + this.step);
      if (this.step < this.steps) this.step++;
      console.log("STEP : " + this.step);
    },

    prevStep() {
      if (this.step > 1) this.step--;
    }
  }
};
</script>

<style scoped>
.step .input-container {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}
.step .input {
  height: 60;
  text-decoration: none;
  font-size: 30;
  text-align: left;
  flex-grow: 2;
}

.step.ios .input {
  padding-top: 10;
}

.step .input.empty {
  font-size: 16;
  padding-top: 19;
}

#background {
  width: 100;
  height: 100;
  border-radius: 100%;
}

#setup .hr {
  background: linear-gradient(-45deg, #ff067f, #ff0154);
  border-radius: 16px;
  margin-bottom: 25;
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

.step .hr {
  background: linear-gradient(-45deg, #ff067f, #ff0154);
  border-radius: 16px;
  margin-bottom: 25;
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

.step .h1 {
  font-size: 40;
  margin-bottom: 25;
  opacity: 0;
  animation-name: fadeInDown;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

.step .h2 {
  font-size: 18;
  margin-bottom: 25;
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

.step.h1,
.step .h2 {
  color: #545454;
}

.step .h3 {
  color: #6b96f3;
}

.step .next-btn {
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  margin-bottom: 25;
  margin-top: 25;
}

.step .next-btn .icon {
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 1.05s;
  z-index: 100000;
}

.step .next-btn .background {
  width: 100;
  height: 100;
  border-radius: 16;
  background: linear-gradient(-45deg, #ff067f, #ff0154);
}

#setup .h1 {
  font-size: 40;
  margin-bottom: 25;
  opacity: 0;
  animation-name: fadeInDown;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

#setup .h2 {
  font-size: 18;
  margin-bottom: 25;
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}

#setup.h1,
#setup .h2 {
  color: #545454;
}

#setup .h3 {
  color: #6b96f3;
}

#setup .next-btn {
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  margin-bottom: 25;
  margin-top: 25;
}

#setup .next-btn .icon {
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 2.05s;
  z-index: 100000;
}

#setup .next-btn .background {
  width: 100;
  height: 100;
  border-radius: 16;
  background: linear-gradient(-45deg, #ff067f, #ff0154);
}

#setup .description-label {
  opacity: 0;
  animation-name: bounceIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  margin-bottom: 15;
  font-size: 16;
}
</style>
