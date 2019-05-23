export const mockEvent = value => ({
  preventDefault: () => true,
  target: {
    value,
  },
});
