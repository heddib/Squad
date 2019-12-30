<template>
    <Page class="page" actionBarHidden="true">
        <!-- <ActionBar :title="city" class="action-bar">
            <NavigationButton text="Go Back" ios.position="left"
                android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar> -->
        <StackLayout id="overview">
            <!--<AbsoluteLayout width="100%" height="100%">
                <FlexboxLayout width="100%" height="100%" justifyContent="center"
                    alignItems="center">
                    <StackLayout id="background">
                    </StackLayout>
                </FlexboxLayout>-->
            <FlexboxLayout flexDirection="column" height="100%" width="100%">
                <Header class="header" :canBack="canBack" />
                <StackLayout flexGrow="1" id="view">
                    <FlexboxLayout flexDirection="column" maxHeight="100%">
                        <StackLayout orientation="vertical" margin="0 50 0">
                            <Label textWrap="true" :text="city" class="h1 extra-bold" />
                            <Label textWrap="true" text="Places you should visit"
                                class="h3 description-label semi-bold" />
                        </StackLayout>
                        <ScrollView orientation="horizontal" marginTop="24"
                                height="calc(100% - 100)" v-on:scroll="getScroll"
                                ref="list">
                                <WrapLayout orientation="horizontal"
                                    :paddingLeft="((width-244)/2)+8"
                                    :paddingRight="((width-244)/2)-8"
                                    paddingBottom="8">
                                    <Card v-for="(place,index) in places"
                                        :key="index" :place="place" :index="index"
                                        :active="active" width="244" height="315" />
                                </WrapLayout>
                            </ScrollView>
                    </FlexboxLayout>
                </StackLayout>
                <Footer class="footer" />
            </FlexboxLayout>
            <!--</AbsoluteLayout>-->
        </StackLayout>
    </Page>
</template>

<script>
    import Place from "./Place";
    import Card from "./Card";
    import Header from "./Header";
    import Footer from "./Footer";
    const platform = require("tns-core-modules/platform");

    export default {
        props: {
            city: {
                type: String,
                default: "Dublin"
            }
        },

        data() {
            return {
                canBack: true,
                page: Place,
                width: 0,
                active: 0,
                places: [{
                        name: "The Custom House",
                        type: "Architecture",
                        stars: 4,
                        media: "Dublin.jpg"
                    },
                    {
                        name: "Christ Church's",
                        type: "Architecture",
                        stars: 4,
                        media: "Cathedral.jpg"
                    },
                    {
                        name: "Bord Gáis Energ",
                        type: "Architecture",
                        stars: 5,
                        media: "Theater.jpg"
                    }
                ]
            };
        },

        mounted() {
            this.width = platform.screen.mainScreen.widthDIPs;
        },

        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },

            getScroll(e) {
                this.active = Math.round(e.scrollX / 244);
            }
        },

        components: {
            Header,
            Footer,
            Card
        }
    };
</script>

<style scoped>

    .header {
        margin: 25 10 10;
        height: 30;
    }

    .footer {
        margin: 10 50 10;
        height: 30;
    }

    #overview #view {
        opacity: 0;
        animation-name: fadeInRight;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

    #overview .h1 {
        color: #545454;
        font-size: 40;
        margin-bottom: 5;
        opacity: 0;
        animation-name: fadeInDown;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

    #overview .description-label {
        color: #DADADA;
        opacity: 0;
        animation-name: fadeInUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: 0.75s;
    }

    #view {
        vertical-align: center;
    }
</style>