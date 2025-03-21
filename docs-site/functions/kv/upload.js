import { parseFormData } from "@mjackson/form-data-parser";

function createCloudflareKvUploadHandler(options) {
	const { kv, expirationTtl } = options ?? {};
	return async ({ type, name, data }) => {
		// 将类型为AsyncIterable<Uint8Array>的data对象转换为Blob对象
		const chunks = [];
		for await (const chunk of data) {
			chunks.push(chunk);
		}
		const blob = new Blob(chunks, { type });

		const key = `${Date.now()}-${name}`;
		// 保存到cloudflare的kv中
		await kv.put(key, blob.stream(), {
			expirationTtl, // 生存时间(秒)
			metadata: { name, contentType: type },
		}); // 1小时后自动过期
		return key;
	};
}

/**
 * upload to cloudflare kv
 *
 * 注意: 生成分支和预览分支都需要独立的在cloudflare dashborad上配置kv binding
 * @param {*} context
 * @returns
 */
export async function onRequest(context) {
	const { request, params, env } = context;
	const uploadHandler = createCloudflareKvUploadHandler({
		kv: env.RTDUI_KV, // 由cloudflare管理平台上的kv绑定的名称
		expirationTtl: 1 * 60 * 60, // 默认保留1小时
	});
	const formData = await parseFormData(request, uploadHandler);

	const fileName = formData.get("upload");
	return new Response(JSON.stringify({ imageUrl: `/kv/${fileName}` }), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
