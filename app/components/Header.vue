<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" id="header">
        <FlexboxLayout class="btn menu">
            <Image src="~/assets/icons/arrow.png" class="icon" v-if="canBack == true"
                @tap="$navigateBack" />
            <Image src="~/assets/icons/Menu-Red.png" class="icon" v-else-if="secondary == false" @tap="test" />
            <Image src="~/assets/icons/Menu-White.png" class="icon" v-else />
        </FlexboxLayout>
        <FlexboxLayout class="btn pp">
            <Image src="~/assets/icons/brahiti-heddi.jpg" class="icon" @tap="logout" />
        </FlexboxLayout>
    </FlexboxLayout>
</template>

<script>
    import Login from "./Login";
    import LoginService from '@/services/LoginService';
    
    const loginService = new LoginService();
    export default {
        props: {
            secondary: {
                type: Boolean,
                default: false
            },
            canBack: {
                type: Boolean
            }
        },

        methods: {
            logout() {
                loginService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            test() {
                
            },
        },

        data() {
            return {};
        },
    };
</script>

<style scoped>
    #header {
        padding: 0;
    }

    #header .btn {

        margin: 0;
        padding: 0;
        justify-content: center;
        align-items: center;
    }

    #header .btn .icon {
        padding: 0;
        margin: 0;
    }

    #header .btn.pp {
        height: 100%;
    }

    #header .btn.menu .icon {
        height: 60%;
    }

    #header .btn.pp .icon {
        border: 2px solid #ffffff;
        border-radius: 100%;
    }
</style>