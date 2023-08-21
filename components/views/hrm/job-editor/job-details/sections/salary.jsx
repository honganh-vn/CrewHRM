import React, {useContext} from "react";

import { __ } from "../../../../../utilities/helpers.jsx";
import { ContextJobDetails } from "../job-details.jsx";
import style from '../details.module.scss';
import { DropDown } from "../../../../../materials/dropdown/dropdown.jsx";

const salary_types = {
	hourly  : __( 'Hourly' ),
	daily   : __( 'Daily' ),
	weekly  : __( 'Weekly' ),
	monthly : __( 'Monthly' ),
	yearly  : __( 'Yearly' )
}

export function Salary() {

	const {
		input_class, 
		section_title_class, 
		field_label_class,
		values,
		setVal} = useContext(ContextJobDetails);

	return <>
		{/* Salary details */}
		<div className={'d-flex margin-bottom-30'.classNames()}>
			<div className={'flex-1'.classNames()}>
				<span className={section_title_class}>
					{__( 'Salary' )}
				</span>
			</div>
		</div>

		{/* Salary type */}
		<span className={field_label_class}>
			{__( 'Salary Type' )}
		</span>
		<div className={'d-flex margin-bottom-40'.classNames()}>
			<div className={'flex-1'.classNames()}>
				{/* Employment type */}
				<div className={'d-flex margin-bottom-30'.classNames() + 'type-selection'.classNames(style)}>
					{Object.keys(salary_types).map(type=>{
						const is_selected = values.salary_type===type;
						return <div key={type} className={'flex-1'.classNames()}>
							<button className={`button button-primary ${is_selected ? '' : 'button-outlined'} button-outlined w-full`.classNames()} onClick={()=>setVal('salary_type', type)}>
								{salary_types[type]}
							</button>
						</div>
					})}
				</div>

				{/* Salary and Currency */}
				<div className={'d-flex'.classNames()}>
					<div className={'flex-1 margin-right-10'.classNames()}>
						<span className={field_label_class + 'white-space-nowrap'.classNames()}>
							{__( 'Currency' )}
						</span>
						<DropDown
							value={values.currency}
							options={Intl.supportedValuesOf('currency').map(c=>{return {id: c, label: c}})}
							onChange={v=>setVal('currency', v)}
							className={input_class}/>
					</div>
					<div className={'flex-1 margin-left-10'.classNames()}>
						<span className={field_label_class}>
							{__( 'Salary' )}
						</span>
						<input className={input_class} placeholder={__( 'ex $100' )}/>
					</div>
				</div>
			</div>
			<div className={'right-col'.classNames(style)}>
				<span className={'font-size-13 font-weight-400 text-color-light'.classNames()}>
					{__( 'Adding the salary here will improve performance on some job boards. You can also include the salary in the job description' )}
				</span>
			</div>
		</div>
	</>
}