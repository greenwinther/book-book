import "./StatusDropdown.scss";
import React from "react";
import { BookStatus } from "../../types";

type Props = {
	status?: BookStatus;
	onChange: (newStatus: BookStatus) => void;
};

const StatusDropdown: React.FC<Props> = ({ status = "", onChange }) => {
	return (
		<select
			className="status-dropdown"
			value={status}
			onChange={(e) => onChange(e.target.value as BookStatus)}
		>
			<option value="">Set status</option>
			<option value="plan">Planning to read</option>
			<option value="reading">Currently reading</option>
			<option value="finished">Finished</option>
		</select>
	);
};

export default StatusDropdown;
