import {create} from "react-test-renderer";
import ProfileStatus from "components/Profile/MyPosts/ProfileInfo/ProfileStatus";

describe("ProfileStatus component", () => {
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra" updateUserStatus={() => {
        }}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.children.length).toBe(1)

    })
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra" updateUserStatus={() => {
        }}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[0]).toBe("it-kamasutra")
    })
    test("input should be displayed in editMode instead span", () => {
        const component = create(<ProfileStatus status="it-kamasutra" updateUserStatus={() => {
        }}/>)
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")

        expect(input.props.value).toBe("it-kamasutra")
    })
    // test("callback should be called", () => {
    //     const mockCallback = jest.fn()
    //     const component = create(<ProfileStatus status="it-kamasutra" updateUserStatus={mockCallback}/>)
    //     const instance = component.getInstance();
    //     instance.deactivateEditMode();
    //     expect(mockCallback.mock.calls.length).toBe(1)
    // })
})