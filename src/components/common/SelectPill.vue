<template>
  <div class="select-pill">
    <div
      v-for="(option, index) in options"
      class="pill"
      :class="{ isFirst: index === 0, isActive: option === activeItem }"
      @click="onOptionClick(option)"
    >{{ option }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectPill',
  props: {
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
  data() {
    return {
      activeItem: null,
    };
  },
  methods: {
    onOptionClick(item) {
      this.activeItem = item;
      this.onChange(item);
    },
  },
  created() {
    const [firstOption] = this.options;
    this.activeItem = firstOption;
    this.onChange(firstOption);
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";

  .select-pill {
    display: flex;
    justify-content: center;
    align-items: center;

    .pill {
      width: 100px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $dark-gray-default;
      font-size: $body2-font-size;
      border: 1px solid $gray-default;
      border-left: none;
      cursor: pointer;
    }

    .isFirst {
      border-left: 1px solid $gray-default;
    }

    .isActive {
      background: $blue-default;
      color: $white;
    }
  }
</style>
