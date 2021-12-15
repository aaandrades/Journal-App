import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createSerializer } from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// Fake test on scrollEvent
// const spyScrollTo = jest.fn();
// Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });
