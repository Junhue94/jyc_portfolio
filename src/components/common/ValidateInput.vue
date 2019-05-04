<template>
  <div class="validate-input">
    <label>{{ label }}</label>
    <div class="input-container">
      <input
        :name="label"
        :type="inputType"
        :placeholder="label"
        class="form-control"
        v-validate="validationRules"
        @change="onInputChange"
      />
      <span>{{ errors.first(label) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValidateInput',
  props: [
    'label',
    'validationRules',
    'inputType',
    'onChange',
  ],
  methods: {
    onInputChange(e) {
      e.preventDefault();
      this.onChange(this.label, e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";

  .validate-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    label {
      margin: 0;
      font-size: $h3-font-size;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      width: 80%;

      input {
        &::placeholder {
          font-size: $h3-font-size;
        }
      }

      span {
        margin-top: 5px;
        color: $red-default;
        font-size: $body2-font-size;
      }
    }
  }
</style>
