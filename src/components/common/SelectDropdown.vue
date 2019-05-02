<template>
  <div class="select-dropdown">
    <div class="label">{{ label }}</div>
    <label>
      <select
        title="rowOffset"
        @change="handleDropdownChange"
      >
        <option
          v-for="option in options"
          :value="option"
        >{{ option }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectDropdown',
  props: [
    'field',
    'label',
    'options',
    'onChange',
  ],
  methods: {
    handleDropdownChange(e) {
      e.preventDefault();
      this.onChange(e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";
  .select-dropdown {
    display: flex;
  }

  .label {
    height: 45px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    font-size: $h3-font-size;
    font-weight: $bold;
    color: $dark-gray-default;
    border: 1px solid #ced4da;
    border-radius: $border-radius-default 0 0 $border-radius-default;
    background: $light-gray-default;
  }

  label {
    margin: 0;

    select {
      height: 45px;
      min-width: 150px;
      padding: 8px 10px;
      border-radius: 0 $border-radius-default $border-radius-default 0;
      font-size: $h3-font-size;
      color: $dark-gray-default;
      background-color: $background-white;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-left: 0;

      &:focus {
        outline: none;
      }
    }
  }
</style>
