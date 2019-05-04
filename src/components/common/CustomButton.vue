<template>
  <button
    :type="type"
    :class="color"
    @change="onChange"
  >{{ text }}</button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    type: String,
    color: {
      type: String,
      validator(value) {
        return [
          'green-fill',
          'red-fill',
        ].indexOf(value) !== -1;
      },
    },
    text: String,
    onChange: {
      type: Function,
      default() {
        return null;
      },
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";

  button {
    height: 35px;
    min-width: 80px;
    padding: 5px 10px;
    border: 1px solid $gray-default;
    font-size: $body1-font-size;
    font-weight: $bold;
    border-radius: $border-radius-default;

    &:focus {
      outline: none;
    }
  }

  .fill-accent {
    color: $white;
    border: none;
  }

  .green-fill {
    @extend .fill-accent;
    background: $green-default;
  }

  .red-fill {
    @extend .fill-accent;
    background: $red-default;
  }
</style>
