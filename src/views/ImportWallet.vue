<template>
  <div class="import-wallet login-wrapper">
    <div class="login-header">
      <LogoWallet />
    </div>
    <div class="import-wallet_top">
      <h2>Import wallet</h2>
      <p>Enter the seed phrase, in the same order saved when creating your wallet.</p>
    </div>
    <div class="import-wallet_bottom">
      <div class="btn-group">
         <button
                    :class="{ active: numWords === 12 }"
                    class="btn btn-option"
                    @click="setMnemonicLength(12)"
                  >
                    12 words
                  </button>
          <button
                    :class="{ active: numWords === 24 }"
                    class="btn btn-option"
                    @click="setMnemonicLength(24)"
                  >
                    24 words
                  </button>
      </div>
      <form class="form import-wallet_seed" autocomplete="off">
        <div v-for="(e, n) in numWords" :key="n"><input type="text" class="form-control form-control-sm" v-model="wordList[n]" autocomplete="off" required /></div>
      </form>
    </div>
    <div class="footer-container bg-white">
        <div class="footer-content">
          <button class="btn btn-light btn-outline-primary btn-lg btn-footer btn-icon" @click="$router.go(-1)">Cancel</button>
          <button class="btn btn-primary btn-lg btn-footer" :disabled="disableNext" @click="next">Continue</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogoWallet from '@/assets/icons/logo_wallet.svg'

export default {
  components: {
    LogoWallet
  },
  data: function () {
    return {
      wordList: Array(12).fill(''),
      numWords: 12
    }
  },
  updated: function () {
  },
  watch: {
    wordList: function (newList, oldList) {
      var words = newList[0].split(' ')
      if (words.length === this.numWords) {
        for (var m = 0; m < words.length; m++) {
          this.wordList[m] = words[m]
        }
      }
    }
  },
  computed: {
    ...mapState(['wallets', 'activeWalletId']),
    wallet: function () {
      return this.wallets.find(wallet => wallet.id === this.activeWalletId)
    },
    disableNext: function () {
      return this.wordList.filter(word => word === '' || /\s/.test(word)).length > 0 // TODO: this should actually validate bip39
    }
  },
  methods: {
    next () {
      const passphrase = this.wordList.join(' ')
      this.$router.push({ name: 'OnboardingSetup', params: { passphrase } })
    },
    setMnemonicLength (words) {
      this.numWords = words
      this.wordList = Array(this.numWords).fill('')
    }
  }
}
</script>

<style lang="scss">

.num-words {
  background: $color-text-primary;

}

.import-wallet {
  padding: 50px 0 0 0 !important;
  overflow-y: scroll;

  > div {
    padding: 0 $wrapper-padding;
  }

  .import-wallet_top {
    h2 {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 0 !important;
      font-size: $font-size-sm;
    }

    padding-top: 25px;
    padding-bottom: 20px;
  }

  .import-wallet_bottom {
    background: #FFFFFF;
    color: $color-text-primary;
    padding: $wrapper-padding;

    .btn-group {
      margin-bottom: 20px;
    }

  }

  &_icon {
    width: 40px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  h5 {
    color: $color-text-secondary;
  }

  &_seed.form {
    font-size: 18px;
    padding-left: 0;
    margin-bottom: 10px;
    text-align: left;
    counter-reset: wordIndex;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    div {
      display: block;
      flex: 0 0 94px;
      padding-bottom: 6px;
      text-align: left;

      &::before {
        display: block;
        font-size: $font-size-tiny;
        counter-increment: wordIndex;
        content: counter(wordIndex);
      }

      input {
        color: $color-text-primary;
      }
    }
  }
}
</style>
