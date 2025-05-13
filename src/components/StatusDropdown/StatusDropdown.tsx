import React from "react";
import { BookStatus } from "../../types";
import "./StatusDropdown.scss";

type Props = {
	status?: BookStatus;
	onChange: (newStatus: BookStatus) => void;
	className?: string;
};

const StatusDropdown: React.FC<Props> = ({ status = "", onChange, className }) => {
	return (
		<select
			className={`status-dropdown ${className || ""}`}
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
