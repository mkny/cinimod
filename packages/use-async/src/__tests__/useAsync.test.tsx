import { act, renderHook } from "@testing-library/react-hooks";

import { useAsync } from "../index";

describe("useAsync test suite", () => {
	it("should be able to execute async function", async () => {
		await act(async () => {
			const callback = jest.fn().mockResolvedValueOnce("finished");

			const { result, waitForNextUpdate } = renderHook(() =>
				useAsync(callback, true)
			);

			expect(result.current.status).toStrictEqual("idle");
			expect(result.current.value).toStrictEqual(undefined);

			await waitForNextUpdate();

			expect(callback).toHaveBeenCalledTimes(1);
			expect(result.current.status).toStrictEqual("success");
			expect(result.current.value).toStrictEqual("finished");
		});
	});
	it("should get an error from promise", async () => {
		const callback = jest
			.fn()
			.mockRejectedValueOnce(new Error("async error"));
		const { result, waitForNextUpdate } = renderHook(() =>
			useAsync(callback, true)
		);
		await waitForNextUpdate();

		expect(callback).toHaveBeenCalledTimes(1);
		expect(result.current.error).toBe("async error");
	});
	it("should be able call executor, non-imediate, with empty response", async () => {
		const callback = () => Promise.resolve();
		const { result, waitForNextUpdate } = renderHook(() =>
			useAsync(callback)
		);

		act(() => {
			result.current.execute();
		});
		await waitForNextUpdate();

		expect(result.current.status).toBe("success");
		expect(result.current.value).toBe("");
	});
	it("should be able to get an non-formatted error message", async () => {
		const callback = jest.fn().mockRejectedValueOnce("non-formatted");
		const { result, waitForNextUpdate } = renderHook(() =>
			useAsync(callback, true)
		);

		await waitForNextUpdate();

		expect(result.current.error).toBe("non-formatted");
	});
});
