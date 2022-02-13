import { mount } from "@vue/test-utils";
import ActionButton from "@/components/ActionButton.vue";

describe("ActionButton.vue", () => {
  it("renders component", () => {
    const label = "Action";
    const wrapper = mount(ActionButton, {
      props: { label },
    });
    expect(wrapper.classes()).toContain("action-button");
    expect(wrapper.text()).toMatch(label);
  });
});
