<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" id="footer">
        <FlexboxLayout class="btn" :class="{ active: (index === active) }"
            v-for="(btn,index) in btns" @tap="goTo(btn.link,index)">
            <Image :src=" (index === active) ? '~/assets/icons/' + btn.icon + '-Red.png' : '~/assets/icons/' + btn.icon + '.png'" class="icon " />
            <Label class="circle" v-if="index === active" />
        </FlexboxLayout>
    </FlexboxLayout>
</template>

<script>
    import App from "./App";
    import Home from "./Home";
    import List from "./List";

    export default {
        methods: {
            goTo(link, index) {
                console.log('MMMMM');
                this.active = index;
                this.selectedTab = index;
                console.log('Navigating to : ' + link);
                
                this.$navigateTo(App);
            }
        },

        data() {
            return {
                selectedTab: 1,
                btns: [{
                        icon: "user",
                        link: ""
                    },
                    
                    {
                        icon: "Search",
                        link: App
                    },
                    {
                        icon: "List",
                        link: List
                    }
                ],
                active: 1,
                app: App
            };
        }
    };
</script>

<style scoped>
    #footer {
        background-color:#ffffff;
    }

    #footer .btn {
        height: 100%;
        padding: 0;
        margin: 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #footer .btn.active .icon {
        height: 70%;
    }

    #footer .btn .icon {
        z-index: 100000;
        height: 100%;
        top: 0px;
        left: 0px;
    }

    #footer .btn .circle {
        width: 5;
        height: 5;
        border-radius: 100%;
        background: red;
        margin-top: 5;
    }
</style>