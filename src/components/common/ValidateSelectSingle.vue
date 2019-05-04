<template>
  <div class="validate-input">
    <label>{{ label }}</label>
    <div class="input-container">
      <select
        :name="label"
        :title="label"
        class="form-control"
        v-validate="validationRules"
        @change="onSelectChange"
      >
        <option
          value=""
          disabled
          selected
        >Select a {{ label }}</option>
        <option
          v-for="option in options"
          :value="option"
        >{{ option }}</option>
      </select>
      <span>{{ errors.first(label) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValidateSelectSingle',
  props: {
    label: {
      type: String,
      required: true,
    },
    validationRules: String,
    options: {
      type: Array,
      required: true,
    },
    onChange: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  methods: {
    onSelectChange(e) {
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

      select {
        color: $dark-gray-default;
        font-size: $h3-font-size;
      }

      span {
        margin-top: 5px;
        color: $red-default;
        font-size: $body2-font-size;
      }
    }
  }
</style>
