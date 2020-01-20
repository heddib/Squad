<template>
  <StackLayout
    id="searching"
    class="align-center"
    :class="platform"
    @tap="clearFocus"
  >
    <Label
      textWrap="true"
      text="Alors, quel genre de métier te plaît ?"
      class="h2 bold"
    />
    <FlexboxLayout
      padding="16"
      borderRadius="16"
      backgroundColor="#ffffff"
      class="input-container"
      width="300"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src="~/assets/icons/Search-Red.png"
        height="20"
        minWidth="20"
        margin="0 12"
      />
      <TextField
        padding="16"
        :width="searchBarWidth"
        v-model="searchQuery"
        hint="ex: Apiculteur, Acousticien..."
        class="input extra-bold"
        :class="{ empty: searchQuery == '' }"
        ref="searchBar"
        maxLength="8"
      >
      </TextField>
      <Image
        src="~/assets/icons/Cross-red.png"
        height="16"
        minWidth="16"
        margin="0 14"
        @tap="searchQuery = ''"
      />
    </FlexboxLayout>
    <ScrollView orientation="horizontal" height="50">
      <FlexboxLayout alignItems="center" justifyContent="center">
        <Label
          :text="job"
          v-for="(job, index) in filteredJobs"
          :key="index"
          padding="12"
          height="100%"
          class="job bold"
          @tap="goToJobOverview(job)"
        />
      </FlexboxLayout>
    </ScrollView>
    <Button @tap="toggleSearch" class="close" />
  </StackLayout>
</template>

<script>
const application = require("tns-core-modules/application");
import JobOverview from "./JobOverview";

import ProfileService from "../services/ProfileService";
const profileService = new ProfileService();

export default {
  methods: {
    toggleSearch() {
      this.$emit("togglesearch");
    },
    goToJobOverview(job) {
      this.$navigateTo(this.jobOverviewPage, {
        props: {
          job: job
        }
      });
    },
    clearFocus() {
      this.$refs.searchBar.nativeView.dismissSoftInput();
    }
  },

  mounted() {
    if (application.ios) {
      this.platform = "ios";
      setTimeout(() => {
        this.searchBarWidth = "100%";
      }, 500);
    } else if (application.android) {
      this.platform = "android";
    }
  },

  async created() {
    let j = "";
    await profileService.getJobs().then(jobs => (j = jobs));

    let jobs = [];

    let job = j.map(function(k) {
      jobs.push(k.job);
    });

    this.jobs = jobs;
  },

  computed: {
    filteredJobs() {
      if (this.searchQuery !== "") {
        return this.jobs.filter(job =>
          job.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  },

  data() {
    return {
      platform: "",
      searchBarWidth: "0%",
      jobOverviewPage: JobOverview,
      searchQuery: "",
      jobs: []
    };
  }
};
</script>

<style scoped>
#searching {
  padding: 0 25;
  /* background:yellow; */
}

#searching .job {
  color: #ffffff;
  font-size: 16;
}

#searching .h2 {
  font-size: 18;
  margin-bottom: 40;
  color: #ffffff;
}

#searching .input-container {
  opajob: 0;
  animation-name: bounceIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 0s;
}

#searching .input {
  background-color: #ffffff;
  height: 60;
  text-decoration: none;
  font-size: 35;
  text-align: left;
  flex-grow: 2;
}

#searching.ios .input {
  padding-top: 10;
}

#searching .input.empty {
  font-size: 16;
  padding-top: 19;
}

#searching .close {
  height: 40;
  width: 40;
  background-image: url("~/assets/icons/Cross.png");
  background-size: contain;
  margin-top: 75;
  margin-bottom: 100;
  opajob: 0;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
}
</style>
