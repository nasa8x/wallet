<template>
  <div class="swap-receive-container">
    <div class="swap-receive-top">
      <div class="swap-receive-top-label">
        Receive
      </div>
      <div class="swap-receive-top-amount">
        <div class="btn btn-option label-append" @click="toogleShowAmountsFiat">
          <span v-if="showAmountsInFiat" :style="getAssetColorStyle(toAsset)">
            {{ `${toAsset} ${receiveAmount}` }}
          </span>
          <span v-else>
            {{ receiveAmountFiat }}
          </span>
        </div>
      </div>
    </div>
    <div class="swap-receive-main">
      <div class="swap-receive-main-input-container">
        <input
          v-if="showAmountsInFiat"
          type="number"
          class="form-control swap-receive-main-input"
          :value="receiveAmountFiat"
          @input="$emit('update:receiveAmountFiat', $event.target.value)"
          placeholder="0.00"
          autocomplete="off"
          :disabled="!hasMarket"
        />
        <input
          v-else
          type="number"
          class="form-control swap-receive-main-input"
          :value="receiveAmount"
          @input="$emit('update:receiveAmount', $event.target.value)"
          placeholder="0.00"
          :style="getAssetColorStyle(toAsset)"
          autocomplete="off"
          :disabled="!hasMarket"
        />
        <div class="swap-receive-main-icon" @click="assetIconClick">
          <img :src="getAssetIcon(toAsset)" class="asset-icon" />
          <span class="asset-name">
            {{ toAsset }}
          </span>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
    <div class="swap-receive-bottom" v-if="!enterSendToAddress">
      <small
          class="form-text d-flex align-items-center justify-content-between"
        >
          <a @click="enterSendToAddress = true">
              + Receive at external wallet
            </a>
        </small>
    </div>
    <div class="swap-receive-bottom" v-if="enterSendToAddress">
      <label
        class="w-100 d-flex align-items-center justify-content-between"
        for="sendTo"
      >
        <div>Receive at</div>
        <div>
          <CloseIcon
            class="float-right icon-sm icon-btn"
            @click="closeReceiveAt"
          />
        </div>
      </label>
      <div class="input-group">
        <input
          type="text"
          :value="sendTo"
          @input="$emit('update:sendTo', $event.target.value)"
          class="form-control form-control-sm"
          id="to"
          placeholder="External Receiving Address"
          autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAssetColorStyle, getAssetIcon } from '@/utils/asset'
import CloseIcon from '@/assets/icons/close.svg'
import ChevronRightIcon from '@/assets/icons/chevron_right_gray.svg'

export default {
  components: {
    CloseIcon,
    ChevronRightIcon
  },
  data () {
    return {
      enterSendToAddress: false,
      showAmountsInFiat: false
    }
  },
  props: [
    'toAsset',
    'sendTo',
    'receiveAmount',
    'receiveAmountFiat',
    'hasMarket'
  ],
  created () {},
  methods: {
    getAssetColorStyle,
    getAssetIcon,
    toogleShowAmountsFiat () {
      this.showAmountsInFiat = !this.showAmountsInFiat
    },
    closeReceiveAt () {
      this.enterSendToAddress = false
      this.$emit('update:sendTo', null)
    },
    assetIconClick () {
      this.$emit('to-asset-click')
    }
  }
}
</script>

<style lang="scss">
.swap-receive-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .swap-receive-top {
    display: flex;
    justify-content: space-between;

    .swap-receive-top-label {
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .swap-receive-main {
    display: flex;
    flex-direction: column;
    .swap-receive-main-input-container {
      display: flex;
    }

    .swap-receive-main-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 10px;

      .asset-name {
        margin-left: 5px;
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
      }

      svg {
        width: 8px;
        margin-left: 10px;
      }
    }
  }

  .swap-receive-bottom {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
