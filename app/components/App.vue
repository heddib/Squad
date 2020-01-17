<template>
  <Page class="page" actionBarHidden="true">
    <ScrollView>
      <AbsoluteLayout width="100%" height="100%">
        <FlexboxLayout
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <StackLayout id="background" :class="{ secondary: isSearching }">
          </StackLayout>
        </FlexboxLayout>
        <Image
          src="~/assets/icons/earth.png"
          opacity="0.25"
          width="350"
          height="350"
          :marginLeft="width - 250"
          :marginTop="height - 400"
          id="earth"
        />
        <FlexboxLayout
          flexDirection="column"
          height="100%"
          width="100%"
          id="app"
        >
          <Header class="header" :secondary="isSearching" v-show="!isFreshAccount()" />
          <StackLayout
            class="home-panel"
            flexGrow="7"
            id="view"
            v-show="selectedTab == 1"
          >
            <SetupAccount v-show="isFreshAccount()" />
            <Home v-on:togglesearch="toggleSearch" v-if="!isSearching" v-show="!isFreshAccount()" />
            <Searching
              v-on:togglesearch="toggleSearch"
              v-else
              class="searching"
            />
          </StackLayout>
          <StackLayout
            class="home-panel"
            flexGrow="7"
            id="view"
            v-show="selectedTab == 2"
          >
            <List />
          </StackLayout>
          <Footer class="footer" v-if="!isSearching" v-show="!isFreshAccount()" />
        </FlexboxLayout>
      </AbsoluteLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import List from "./List";
import Searching from "./Searching";
const platform = require("tns-core-modules/platform");
const application = require("tns-core-modules/application");

import LoginService from "@/services/LoginService";

const loginService = new LoginService();

import SetupAccount from "./SetupAccount";

export default {
  methods: {
    toggleSearch() {
      this.isSearching = !this.isSearching;
    },
    home() {
      this.selectedTab = 1;
    },
    list() {
      this.selectedTab = 2;
    },
    isFreshAccount() {
        return loginService.isFreshAccount();
    }
  },

  data() {
    return {
      platform: "",
      isSearching: false,
      width: 0,
      height: 0,
      selectedTab: 1
    };
  },

  mounted() {
    this.width = platform.screen.mainScreen.widthDIPs;
    this.height = platform.screen.mainScreen.heightDIPs;
    if (application.ios) {
      this.platform = "ios";
    } else if (application.android) {
      this.platform = "android";
    }
  },

  components: {
    Header,
    Footer,
    Home,
    List,
    Searching,
    SetupAccount
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
  background: linear-gradient(-45deg, #ff067f, #ff0154);
  animation-name: circle;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes circle {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(10);
  }
}
</style>
