import React from "react";
import '../css/PageFooter.scss';

export default function PageFooter() {
	return (
		<footer className={"pageFooter"}>
			<div className={"pageFooterUpper"}>
				<div className={"pageFooterUpperItem"}>
					<div className={"pageFooterUpperItemTitle"}>
						Exchange
					</div>
					<a className={"pageFooterUpperItemLink"}>
						Acoustic Guitars
					</a>
					<a className={"pageFooterUpperItemLink"}>
						Electric Guitars
					</a>
					<a className={"pageFooterUpperItemLink"}>
						Bass Guitars
					</a>
				</div>
				<div className={"pageFooterUpperItem"}>
					<div className={"pageFooterUpperItemTitle"}>
						Information
					</div>
					<a className={"pageFooterUpperItemLink"}>
						Contact
					</a>
					<a className={"pageFooterUpperItemLink"}>
						About us
					</a>
				</div>
				<div className={"pageFooterUpperItem"}>
					<div className={"pageFooterUpperItemTitle"}>
						Showroom
					</div>
					<div className={"pageFooterUpperItemText"}>
						Carters Vintage Guitars<br/>
						625 8th Ave S,<br/>
						Nashville,<br/>
						TN 37203,<br/>
						USA
					</div>
				</div>
			</div>
		</footer>
	);
}
