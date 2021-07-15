import { renderHook } from "@testing-library/react-hooks";

import { useAsync } from "../index";

const wait = (ms: number, error?: boolean) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (error) {
				reject();
			} else {
				resolve(void 0);
			}
		}, ms);
	});

describe("useAsync test suite", () => {
	it("should be able to execute async function", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useAsync(() => wait(500).then(() => "finished"), true)
		);

		expect(result.current.status).toStrictEqual("idle");
		expect(result.current.value).toStrictEqual(undefined);

		await waitForNextUpdate();

		expect(result.current.status).toStrictEqual("success");
		expect(result.current.value).toStrictEqual("finished");
	});
	// it("should get an error from promise", async () => {
	// 	const { result, waitForNextUpdate } = renderHook(() =>
	// 		useAsync(() => wait(500, true), true)
	// 	);

	// 	await waitForNextUpdate();

	// 	expect(result.current.error).not.toBeNull();
	// });
});
