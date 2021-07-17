import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";

import { withStore, Provider, useStore, useStoreContext } from "../index";
import { MISSING_CONTEXT_ERROR } from "../context";

const MockedComponent = (props: any) => <div {...props} />;

describe("useStore test suite", () => {
	it("should init with default values", () => {
		const { result } = renderHook(() => useStore(), {
			wrapper: withStore({
				initialState: {
					label: "value"
				}
			})(MockedComponent)
		});

		expect(result.current.state).toStrictEqual({ label: "value" });
	});
	it("should be able to set a value", () => {
		const { result } = renderHook(() => useStore(), {
			wrapper: withStore({})(MockedComponent)
		});

		act(() => {
			result.current.set("xabl", "au");
		});

		expect(result.current.state).toStrictEqual({ xabl: "au" });
	});
	it("should be able to useStore with initialPlacement", () => {
		const { result } = renderHook(() => useStore("xab"), {
			wrapper: withStore({
				initialState: {
					xab: "lau"
				}
			})(MockedComponent)
		});

		expect(result.current.state).toStrictEqual("lau");
	});
	it("should be able to set a value and get rootState", () => {
		const { result } = renderHook(() => useStore("xab"), {
			wrapper: withStore({
				initialState: {
					label: "value"
				}
			})(MockedComponent)
		});

		act(() => {
			result.current.set("lau");
		});

		expect(result.current.get()).toStrictEqual("lau");
		expect(result.current.rootState).toStrictEqual({
			label: "value",
			xab: "lau"
		});
	});
	it("should be able to set a object", () => {
		const { result } = renderHook(() => useStore(), {
			wrapper: withStore({
				initialState: {
					mykeyDefault: "myValueDefault"
				}
			})(MockedComponent)
		});

		act(() => {
			result.current.set({
				mykey1: "myValue1",
				mykey2: "myValue2"
			});
		});

		expect(result.current.get()).toStrictEqual({
			mykeyDefault: "myValueDefault",
			mykey1: "myValue1",
			mykey2: "myValue2"
		});
		expect(result.current.get("mykey1")).toStrictEqual("myValue1");
	});
	it("should be able to set and get with placement", () => {
		const { result } = renderHook(() => useStore("login"), {
			wrapper: withStore({})(MockedComponent)
		});

		act(() => {
			result.current.set("xab", "lau");
		});

		expect(result.current.get(["xab"])).toStrictEqual("lau");
		expect(result.current.get("xab")).toStrictEqual("lau");
		expect(result.current.get()).toStrictEqual({ xab: "lau" });
	});
	it("should be able to get default values (without provider)", () => {
		const { result } = renderHook(() => useStoreContext());

		expect(() => result.current.dispatch()).toThrow(MISSING_CONTEXT_ERROR);
		expect(() => result.current.get()).toThrow(MISSING_CONTEXT_ERROR);
		expect(() => result.current.set({})).toThrow(MISSING_CONTEXT_ERROR);
	});
	it("should be able to snapshot", () => {
		const MyComponent = () => {
			const { state } = useStoreContext();
			return <h1>{state.label}</h1>;
		};
		const { container } = render(
			<Provider
				initialState={{
					label: "value"
				}}
			>
				<MyComponent />
			</Provider>
		);

		expect(screen.getByText(/value/)).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});
});
