<template>
    <StackLayout id="searching" class="align-center" :class="platform" @tap="clearFocus">
        <Label textWrap="true" text="Alors, quel genre de métier te plaît ?"
            class="h2 bold" />
        <FlexboxLayout padding="16" borderRadius="16" backgroundColor="#ffffff"
            class="input-container" width="300" alignItems="center"
            justifyContent="center">
            <Image src="~/assets/icons/Search-Red.png" height="20" minWidth="20"
                margin="0 12" />
            <TextView :width="searchBarWidth" editable="true" v-model="searchQuery"
                hint="ex: Paris, Tokyo..." class="input extra-bold" :class="{empty: (searchQuery == '')}"
                ref="searchBar" maxLength="8">
            </TextView>
            <Image src="~/assets/icons/Cross-red.png" height="16" minWidth="16"
                margin="0 14" @tap="searchQuery = ''" />
        </FlexboxLayout>
        <ScrollView orientation="horizontal" height="50">
            <FlexboxLayout alignItems="center" justifyContent="center">
                <Label :text="city" v-for="(city,index) in filteredCities"
                    :key="index" padding="12" height="100%" class="city bold"
                    @tap="goToCityOverview(city)" />
            </FlexboxLayout>
        </ScrollView>
        <Button @tap="toggleSearch" class="close" />
    </StackLayout>
</template>

<script>
    const application = require("tns-core-modules/application");
    import CityOverview from "./CityOverview";

    export default {
        methods: {
            toggleSearch() {
                this.$emit("togglesearch");
            },
            goToCityOverview(city) {
                this.$navigateTo(this.cityOverviewPage, {
                    props: {
                        city: city
                    }
                });
            },
            clearFocus() {
                this.$refs.searchBar.nativeView.dismissSoftInput();
            }
        },

        mounted() {
            //this.searchQuery = "";
            //if (application.android) {
            //setTimeout(() => {
            //this.clearFocus();
            // }, 100);
            // } else if (application.ios) {
            //  setTimeout(() => {
            //      this.searchBarWidth = "100%";
            // }, 500);
            // }

            if (application.ios) {
                this.platform = "ios";
                setTimeout(() => {
                    this.searchBarWidth = "100%";
                }, 500);
            } else if (application.android) {
                this.platform = "android";
            }
        },

        computed: {
            filteredCities() {
                if (this.searchQuery !== "") {
                    return this.cities.filter(city =>
                        city.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                }
            }
        },

        data() {
            return {
                platform: "",
                searchBarWidth: "0%",
                cityOverviewPage: CityOverview,
                searchQuery: "",
                cities: [
                    "Johannesburg",
                    "Berlin",
                    "Toronto",
                    "Mumbai",
                    "Munich",
                    "Madrid",
                    "Dublin",
                    "Chennai",
                    "India",
                    "Los Angeles",
                    "Miami",
                    "Prague",
                    "Vienna",
                    "Shanghai",
                    "Rome",
                    "Taipei",
                    "Osaka",
                    "Milan",
                    "Amsterdam",
                    "Barcelona",
                    "Istanbul",
                    "Hong Kong",
                    "Kuala Lumpur",
                    "New York",
                    "Seoul",
                    "Tokyo",
                    "Singapore",
                    "Dubai",
                    "Paris",
                    "London",
                    "Bangkok"
                ]
            };
        }
    };
</script>

<style scoped>
    #searching {
        padding: 0 25;
        /* background:yellow; */
    }

    #searching .city {
        color: #ffffff;
        font-size: 16;
    }

    #searching .h2 {
        font-size: 18;
        margin-bottom: 40;
        color: #ffffff;
    }

    #searching .input-container {
        opacity: 0;
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
        background-image: url('~/assets/icons/Cross.png');
        background-size: contain;
        margin-top: 75;
        margin-bottom: 100;
        opacity: 0;
        animation-name: fadeIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }
</style>