<template>
    <div class="bind">
        <md-field-group>
        <md-field
            v-model="code"
            icon="phone"
            placeholder="请输入邀请码"
            right-icon="clear-full"
            name="code"
            data-vv-as="邀请码"
            @right-click="clearText"
        />
        <van-button size="large" type="danger" @click="bind">绑定</van-button>
        </md-field-group>
    </div>
</template>

<script>
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import { busiUserBind } from '@/api/api';
import { constants } from 'crypto';
import { Toast } from 'vant';
import { setLocalStorage } from '@/utils/local-storage';
import { setTimeout } from 'timers';
export default {
    name: 'bind',
    components: {
        [field.name]: field,
        [fieldGroup.name]: fieldGroup
    },
    data () {
        return {
            code: ''
        }
    },
    methods: {
        bind(){
            const code = this.code
            busiUserBind(code).then(res => {
                setLocalStorage({
                    inviteCode: code,
                })
                this.$router.push({ path: '/user' });
            }).catch(err => {
                Toast.fail(err.data.errmsg);
            })
        },
        clearText () {
            this.code = ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/mixin';
.bind {
    padding-top: 40px;
}
</style>