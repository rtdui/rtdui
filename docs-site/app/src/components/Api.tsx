import type { ComponentDoc } from "react-docgen-typescript";

interface ApiDocProps {
	apiDoc?: ComponentDoc;
}
export default function ApiDoc(props: ApiDocProps) {
	const { apiDoc } = props;

	if (!apiDoc) return "无法读取组件API数据";

	return (
		<div>
			<h1>{apiDoc.displayName}</h1>
			<h4>{apiDoc.description}</h4>
			<table className="table table-sm">
				<thead>
					<tr>
						<th>属性名</th>
						<th>类型</th>
						<th>是否必须</th>
						<th>默认值</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(apiDoc.props).map((d) => (
						<tr key={d[0]}>
							<td>{d[0]}</td>
							<td>{d[1].type.name}</td>
							<td>{d[1].required ? "yes" : "no"}</td>
							<td>{d[1].defaultValue?.value}</td>
							<td>{d[1].description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
